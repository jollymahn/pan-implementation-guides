<#
.SYNOPSIS
    Creates the Windows traffic generator VM on the lab VNet.

.DESCRIPTION
    NSG with an RDP rule, a Standard static public IP, a NIC in the VM subnet,
    and a Windows Server 2022 VM. The VM shares the regional vCPU quota with
    the AKS pool, so the quota check runs again first.

.PARAMETER ParameterFile
    Path to Lab.parameters.psd1. Defaults to the copy beside this script.

.EXAMPLE
    ./04-New-TrafficGeneratorVm.ps1
#>

[Diagnostics.CodeAnalysis.SuppressMessageAttribute(
    'PSAvoidUsingConvertToSecureStringWithPlainText', '',
    Justification = 'The password is generated locally by New-LabPassword moments earlier and has no encrypted-string origin to read from. Set-AzVMOperatingSystem requires a PSCredential, so the conversion is unavoidable. The clear-text copy in .lab-state.json is a documented tradeoff of this lab.'
)]
[Diagnostics.CodeAnalysis.SuppressMessageAttribute(
    'PSAvoidUsingComputerNameHardcoded', '',
    Justification = 'This assigns a NetBIOS name to the VM being created. It is not a remote target, so nothing about the local system is disclosed.'
)]
[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$ParameterFile
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module (Join-Path $PSScriptRoot 'LabCommon.psm1') -Force

$config = Get-LabConfig -Path $ParameterFile

if (-not $config.DeployWindowsVm) {
    Write-Host 'DeployWindowsVm is false. Nothing to do.' -ForegroundColor Yellow
    return
}

Write-Host ''
Write-Host 'Phase 4: Windows traffic generator' -ForegroundColor White

Test-LabQuota -Config $config

# ── Quota reality check ──────────────────────────────────────────────────────
Write-LabStep 'Checking live quota usage'

$usage = Get-AzVMUsage -Location $config.Location | Where-Object { $_.Name.Value -eq 'cores' }
if ($usage) {
    $headroom = $usage.Limit - $usage.CurrentValue
    Write-LabInfo "Total Regional Cores: $($usage.CurrentValue) used of $($usage.Limit), $headroom free"

    if ($headroom -lt $config.WindowsVmVcpus) {
        throw @"
Only $headroom vCPU(s) free in $($config.Location) and this VM needs $($config.WindowsVmVcpus).

Scale the AKS pool down to free capacity, then re-run this script:
  Update-AzAksNodePool -ResourceGroupName $($config.ResourceGroupName) -ClusterName $($config.AksClusterName) -Name nodepool1 -NodeCount 1

A 2-node cluster and this VM cannot both run on a 4-core quota. Pods
reschedule onto the remaining node within a minute, so the round trip is cheap.
"@
    }
}

# ── Credentials ──────────────────────────────────────────────────────────────
Write-LabStep 'Local administrator credentials'

$state = Get-LabState -Config $config

if ($state.ContainsKey('WindowsAdminPassword')) {
    $secret = $state.WindowsAdminPassword
    Write-LabInfo 'Reusing the password from .lab-state.json'
}
else {
    $secret = New-LabPassword -Length 24
    Set-LabState -Config $config -Name 'WindowsAdminPassword' -Value $secret
    Write-LabSuccess 'Generated and saved to .lab-state.json'
}

# Azure rejects these names for Windows VMs.
$reserved = @('admin', 'administrator', 'root', 'guest', 'user', 'test')
if ($reserved -contains $config.WindowsUsername.ToLower()) {
    throw "Azure reserves the username '$($config.WindowsUsername)'. Change WindowsUsername in Lab.parameters.psd1."
}

$credential = [PSCredential]::new(
    $config.WindowsUsername,
    (ConvertTo-SecureString $secret -AsPlainText -Force)
)

# ── Network security group ───────────────────────────────────────────────────
Write-LabStep "Network security group $($config.NsgName)"

$nsg = Get-AzNetworkSecurityGroup `
    -Name $config.NsgName `
    -ResourceGroupName $config.ResourceGroupName `
    -ErrorAction SilentlyContinue

if ($nsg) {
    Write-LabInfo 'Already exists'
}
elseif ($PSCmdlet.ShouldProcess($config.NsgName, 'Create NSG')) {
    if ($config.RdpSourceAddressPrefix -eq '*') {
        Write-LabWarning 'RdpSourceAddressPrefix is *, which opens 3389 to the internet. Set it to your own address for anything beyond a short-lived lab.'
    }

    $rule = New-AzNetworkSecurityRuleConfig `
        -Name 'AllowRDP' `
        -Protocol Tcp `
        -Direction Inbound `
        -Priority 1000 `
        -SourceAddressPrefix $config.RdpSourceAddressPrefix `
        -SourcePortRange '*' `
        -DestinationAddressPrefix '*' `
        -DestinationPortRange 3389 `
        -Access Allow

    $nsg = New-AzNetworkSecurityGroup `
        -Name $config.NsgName `
        -ResourceGroupName $config.ResourceGroupName `
        -Location $config.Location `
        -SecurityRules $rule `
        -Tag $config.Tags `
        -Force

    Write-LabSuccess "Created, RDP allowed from $($config.RdpSourceAddressPrefix)"
}

# ── Public IP ────────────────────────────────────────────────────────────────
Write-LabStep "Public IP $($config.PublicIpName)"

$pip = Get-AzPublicIpAddress `
    -Name $config.PublicIpName `
    -ResourceGroupName $config.ResourceGroupName `
    -ErrorAction SilentlyContinue

if ($pip) {
    Write-LabInfo "Already exists: $($pip.IpAddress)"
}
elseif ($PSCmdlet.ShouldProcess($config.PublicIpName, 'Create public IP')) {
    try {
        $pip = New-AzPublicIpAddress `
            -Name $config.PublicIpName `
            -ResourceGroupName $config.ResourceGroupName `
            -Location $config.Location `
            -Sku Standard `
            -AllocationMethod Static `
            -Tag $config.Tags `
            -Force
    }
    catch {
        if ($_.Exception.Message -match 'PublicIPCountLimitReached|QuotaExceeded') {
            throw @"
$($_.Exception.Message)

The subscription is out of Standard public IPs. Move Keycloak behind an
internal load balancer to free one:
  Set KeycloakInternalLb = `$true in Lab.parameters.psd1
  ./02-Install-Keycloak.ps1

Check what is holding them:
  Get-AzPublicIpAddress -ResourceGroupName $($config.ResourceGroupName) | Format-Table Name, IpAddress, Sku
"@
        }
        throw
    }

    Write-LabSuccess "Allocated $($pip.IpAddress)"
}

# ── Network interface ────────────────────────────────────────────────────────
Write-LabStep "Network interface $($config.NicName)"

$nic = Get-AzNetworkInterface `
    -Name $config.NicName `
    -ResourceGroupName $config.ResourceGroupName `
    -ErrorAction SilentlyContinue

if ($nic) {
    Write-LabInfo 'Already exists'
}
elseif ($PSCmdlet.ShouldProcess($config.NicName, 'Create NIC')) {
    $vnet = Get-AzVirtualNetwork `
        -Name $config.VNetName `
        -ResourceGroupName $config.ResourceGroupName

    $subnet = $vnet.Subnets | Where-Object Name -eq $config.VmSubnetName

    $nic = New-AzNetworkInterface `
        -Name $config.NicName `
        -ResourceGroupName $config.ResourceGroupName `
        -Location $config.Location `
        -SubnetId $subnet.Id `
        -PublicIpAddressId $pip.Id `
        -NetworkSecurityGroupId $nsg.Id `
        -Tag $config.Tags `
        -Force

    Write-LabSuccess "Created in $($config.VmSubnetName)"
}

# ── Virtual machine ──────────────────────────────────────────────────────────
Write-LabStep "Virtual machine $($config.WindowsVmName)"

$vm = Get-AzVM `
    -Name $config.WindowsVmName `
    -ResourceGroupName $config.ResourceGroupName `
    -ErrorAction SilentlyContinue

if ($vm) {
    Write-LabInfo 'Already exists'
}
elseif ($PSCmdlet.ShouldProcess($config.WindowsVmName, 'Create VM')) {
    Write-LabInfo "Size $($config.WindowsVmSize). This takes 3 to 5 minutes."

    $vmConfig = New-AzVMConfig `
        -VMName $config.WindowsVmName `
        -VMSize $config.WindowsVmSize

    $vmConfig = Set-AzVMOperatingSystem `
        -VM $vmConfig `
        -Windows `
        -ComputerName 'aigwlabwin' `
        -Credential $credential `
        -ProvisionVMAgent `
        -EnableAutoUpdate

    $vmConfig = Set-AzVMSourceImage `
        -VM $vmConfig `
        -PublisherName 'MicrosoftWindowsServer' `
        -Offer 'WindowsServer' `
        -Skus '2022-datacenter-azure-edition' `
        -Version 'latest'

    $vmConfig = Add-AzVMNetworkInterface -VM $vmConfig -Id $nic.Id

    $vmConfig = Set-AzVMOSDisk `
        -VM $vmConfig `
        -CreateOption FromImage `
        -StorageAccountType 'StandardSSD_LRS' `
        -Caching ReadWrite

    # Boot diagnostics default to a managed storage account, which this lab
    # does not need and which adds a resource to clean up.
    $vmConfig = Set-AzVMBootDiagnostic -VM $vmConfig -Disable

    try {
        New-AzVM `
            -ResourceGroupName $config.ResourceGroupName `
            -Location $config.Location `
            -VM $vmConfig `
            -Tag $config.Tags | Out-Null
    }
    catch {
        $message = $_.Exception.Message

        if ($message -match 'SkuNotAvailable|Capacity Restrictions') {
            throw @"
$message

This is a regional capacity restriction, not a quota problem. Standard_B2s hit
this in centralus while Standard_D2als_v7 succeeded. Check a size before
switching:
  (Get-AzComputeResourceSku -Location $($config.Location) | Where-Object Name -eq '<SIZE>').Restrictions
An empty result means the size is usable.
"@
        }

        if ($message -match 'InsufficientVCPUQuota|QuotaExceeded') {
            throw @"
$message

Scale the AKS pool down and re-run:
  Update-AzAksNodePool -ResourceGroupName $($config.ResourceGroupName) -ClusterName $($config.AksClusterName) -Name nodepool1 -NodeCount 1
"@
        }

        throw
    }

    Write-LabSuccess 'VM created'
}

$pip = Get-AzPublicIpAddress `
    -Name $config.PublicIpName `
    -ResourceGroupName $config.ResourceGroupName

Set-LabState -Config $config -Name 'WindowsVmPublicIp' -Value $pip.IpAddress

Write-Host ''
Write-Host 'Phase 4 complete.' -ForegroundColor Green
Write-LabInfo "RDP to: $($pip.IpAddress)"
Write-LabInfo "Username: $($config.WindowsUsername)"
Write-LabInfo 'Password: see .lab-state.json'
Write-LabInfo 'Next: ./05-Test-LabDeployment.ps1'
