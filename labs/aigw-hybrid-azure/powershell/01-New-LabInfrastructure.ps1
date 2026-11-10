<#
.SYNOPSIS
    Creates the resource group, VNet, AKS cluster, and the role assignment
    internal load balancers depend on.

.DESCRIPTION
    Native Az cmdlets throughout. The cluster uses Azure CNI on a subnet of
    the lab VNet, a service CIDR outside that VNet's range, and no
    availability zones.

.PARAMETER ParameterFile
    Path to Lab.parameters.psd1. Defaults to the copy beside this script.

.EXAMPLE
    ./01-New-LabInfrastructure.ps1
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$ParameterFile
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module (Join-Path $PSScriptRoot 'LabCommon.psm1') -Force

$config = Get-LabConfig -Path $ParameterFile

Write-Host ''
Write-Host 'Phase 1: Azure infrastructure' -ForegroundColor White

Test-LabQuota -Config $config

# ── Resource group ───────────────────────────────────────────────────────────
Write-LabStep "Resource group $($config.ResourceGroupName)"

$rg = Get-AzResourceGroup -Name $config.ResourceGroupName -ErrorAction SilentlyContinue
if ($rg) {
    Write-LabInfo 'Already exists'
}
elseif ($PSCmdlet.ShouldProcess($config.ResourceGroupName, 'Create resource group')) {
    $rg = New-AzResourceGroup `
        -Name $config.ResourceGroupName `
        -Location $config.Location `
        -Tag $config.Tags
    Write-LabSuccess "Created in $($rg.Location)"
}

# ── Virtual network ──────────────────────────────────────────────────────────
Write-LabStep "Virtual network $($config.VNetName)"

$vnet = Get-AzVirtualNetwork `
    -Name $config.VNetName `
    -ResourceGroupName $config.ResourceGroupName `
    -ErrorAction SilentlyContinue

if ($vnet) {
    Write-LabInfo 'Already exists'
}
elseif ($PSCmdlet.ShouldProcess($config.VNetName, 'Create virtual network')) {
    $aksSubnet = New-AzVirtualNetworkSubnetConfig `
        -Name $config.AksSubnetName `
        -AddressPrefix $config.AksSubnetPrefix

    $vmSubnet = New-AzVirtualNetworkSubnetConfig `
        -Name $config.VmSubnetName `
        -AddressPrefix $config.VmSubnetPrefix

    $vnet = New-AzVirtualNetwork `
        -Name $config.VNetName `
        -ResourceGroupName $config.ResourceGroupName `
        -Location $config.Location `
        -AddressPrefix $config.VNetAddressSpace `
        -Subnet $aksSubnet, $vmSubnet `
        -Tag $config.Tags

    Write-LabSuccess "Created with subnets: $($config.AksSubnetPrefix), $($config.VmSubnetPrefix)"
}

$aksSubnetId = ($vnet.Subnets | Where-Object Name -eq $config.AksSubnetName).Id

# ── AKS cluster ──────────────────────────────────────────────────────────────
Write-LabStep "AKS cluster $($config.AksClusterName)"

$aks = Get-AzAksCluster `
    -Name $config.AksClusterName `
    -ResourceGroupName $config.ResourceGroupName `
    -ErrorAction SilentlyContinue

if ($aks) {
    Write-LabInfo "Already exists with $($aks.AgentPoolProfiles[0].Count) node(s)"
}
elseif ($PSCmdlet.ShouldProcess($config.AksClusterName, 'Create AKS cluster')) {
    Write-LabInfo "Size $($config.NodeVmSize), $($config.AksNodeCount) node(s). This takes 5 to 10 minutes."

    $aksParams = @{
        ResourceGroupName = $config.ResourceGroupName
        Name              = $config.AksClusterName
        Location          = $config.Location
        NodeCount         = $config.AksNodeCount
        NodeVmSize        = $config.NodeVmSize
        NodeVnetSubnetID  = $aksSubnetId
        NetworkPlugin     = 'azure'

        # The AKS default service CIDR is 10.0.0.0/16, which collides with the
        # VNet created above and fails with
        # ServiceCidrOverlapExistingSubnetsCidr.
        ServiceCidr       = $config.ServiceCidr
        DnsServiceIP      = $config.DnsServiceIp

        GenerateSshKey    = $true
        Tag               = $config.Tags
    }

    # Zone pinning this size in centralus failed with
    # AvailabilityZoneNotSupported, so the parameter is only passed when zones
    # are explicitly requested.
    if ($config.AvailabilityZones.Count -gt 0) {
        $aksParams['AvailabilityZone'] = $config.AvailabilityZones
    }

    try {
        $aks = New-AzAksCluster @aksParams
    }
    catch {
        $message = $_.Exception.Message

        if ($message -match 'InsufficientVCPUQuota') {
            throw @"
$message

The subscription is out of regional vCPU quota. Do not add a second node pool
with a different size to work around this: both pools hold their quota
requests at once and make it worse. Delete the cluster and recreate it with a
single pool:
  Remove-AzAksCluster -ResourceGroupName $($config.ResourceGroupName) -Name $($config.AksClusterName) -Force
"@
        }

        if ($message -match 'AvailabilityZoneNotSupported') {
            throw "$message`n`nSet AvailabilityZones to @() in Lab.parameters.psd1."
        }

        if ($message -match 'VMSizeNotSupported|RestrictedVMSize|SkuNotAvailable') {
            throw @"
$message

Standard_B2s and Standard_B2als_v2 are commonly rejected on free-tier
subscriptions. Standard_D2als_v7 is the size validated for this lab. List what
the region offers with:
  Get-AzVMSize -Location $($config.Location) | Where-Object Name -like 'Standard_D2a*'
"@
        }

        throw
    }

    Write-LabSuccess "Cluster provisioned: $($aks.ProvisioningState)"
}

# ── kubeconfig ───────────────────────────────────────────────────────────────
Write-LabStep 'Merging credentials into kubeconfig'

if ($PSCmdlet.ShouldProcess($config.AksClusterName, 'Import AKS credentials')) {
    Import-AzAksCredential `
        -ResourceGroupName $config.ResourceGroupName `
        -Name $config.AksClusterName `
        -Force

    Invoke-LabNative -FilePath 'kubectl' -ArgumentList @('get', 'nodes', '-o', 'wide')
}

# ── Role assignment for internal load balancers ──────────────────────────────
Write-LabStep 'Granting the cluster identity Network Contributor on the VNet'

# The control plane identity needs to read the subnet before it can place an
# internal load balancer in a VNet outside the AKS-managed node resource
# group. Without it the Keycloak Service stays <pending> and its events show
# SyncLoadBalancerFailed with a 403 AuthorizationFailed.
$aks = Get-AzAksCluster `
    -Name $config.AksClusterName `
    -ResourceGroupName $config.ResourceGroupName

$principalId = $aks.Identity.PrincipalId
$vnet = Get-AzVirtualNetwork -Name $config.VNetName -ResourceGroupName $config.ResourceGroupName

$existing = Get-AzRoleAssignment `
    -ObjectId $principalId `
    -Scope $vnet.Id `
    -RoleDefinitionName 'Network Contributor' `
    -ErrorAction SilentlyContinue

if ($existing) {
    Write-LabInfo 'Already assigned'
}
elseif ($PSCmdlet.ShouldProcess($vnet.Id, 'Assign Network Contributor')) {
    New-AzRoleAssignment `
        -ObjectId $principalId `
        -RoleDefinitionName 'Network Contributor' `
        -Scope $vnet.Id | Out-Null

    Write-LabSuccess 'Assigned. Propagation takes a minute or two.'
}

# ── Container registry ───────────────────────────────────────────────────────
if ($config.DeployAcr) {
    Write-LabStep 'Container registry'

    $state = Get-LabState -Config $config
    $acrName = if ($state.ContainsKey('AcrName')) {
        $state.AcrName
    }
    else {
        '{0}acr{1}' -f ($config.Prefix -replace '-', ''), (Get-Random -Minimum 100000 -Maximum 999999)
    }

    $acr = Get-AzContainerRegistry `
        -ResourceGroupName $config.ResourceGroupName `
        -Name $acrName `
        -ErrorAction SilentlyContinue

    if (-not $acr -and $PSCmdlet.ShouldProcess($acrName, 'Create container registry')) {
        $acr = New-AzContainerRegistry `
            -ResourceGroupName $config.ResourceGroupName `
            -Name $acrName `
            -Sku Basic `
            -Location $config.Location `
            -Tag $config.Tags
    }

    if ($acr) {
        Set-LabState -Config $config -Name 'AcrName' -Value $acr.Name
        Set-LabState -Config $config -Name 'AcrLoginServer' -Value $acr.LoginServer

        # AcrPull on the kubelet identity is what lets nodes pull the image.
        $kubeletObjectId = $aks.IdentityProfile.kubeletidentity.ObjectId
        $acrAssignment = Get-AzRoleAssignment `
            -ObjectId $kubeletObjectId `
            -Scope $acr.Id `
            -RoleDefinitionName 'AcrPull' `
            -ErrorAction SilentlyContinue

        if (-not $acrAssignment -and $PSCmdlet.ShouldProcess($acr.Id, 'Assign AcrPull')) {
            New-AzRoleAssignment `
                -ObjectId $kubeletObjectId `
                -RoleDefinitionName 'AcrPull' `
                -Scope $acr.Id | Out-Null
        }

        Write-LabSuccess "Registry $($acr.LoginServer) ready"
    }
}

Write-Host ''
Write-Host 'Phase 1 complete.' -ForegroundColor Green
Write-LabInfo "Verify with: kubectl get nodes"
Write-LabInfo "Next: ./02-Install-Keycloak.ps1"
