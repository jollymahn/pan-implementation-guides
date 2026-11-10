<#
.SYNOPSIS
    Shared helpers for the AIGW hybrid lab deployment scripts.
#>

Set-StrictMode -Version Latest

$script:StepNumber = 0

function Write-LabStep {
    <#
    .SYNOPSIS
        Prints a numbered progress heading.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Message)

    $script:StepNumber++
    Write-Host ''
    Write-Host ("[{0}] {1}" -f $script:StepNumber, $Message) -ForegroundColor Cyan
}

function Write-LabInfo {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Message)
    Write-Host "    $Message" -ForegroundColor Gray
}

function Write-LabSuccess {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Message)
    Write-Host "    $Message" -ForegroundColor Green
}

function Write-LabWarning {
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Message)
    Write-Host "    $Message" -ForegroundColor Yellow
}

function Get-LabConfig {
    <#
    .SYNOPSIS
        Loads Lab.parameters.psd1 and derives the resource names from Prefix.
    #>
    [CmdletBinding()]
    param([string]$Path)

    if (-not $Path) {
        $Path = Join-Path $PSScriptRoot 'Lab.parameters.psd1'
    }

    if (-not (Test-Path $Path)) {
        throw "Parameter file not found at $Path"
    }

    $config = Import-PowerShellDataFile -Path $Path

    $config['ResourceGroupName'] = "$($config.Prefix)-rg"
    $config['VNetName']          = "$($config.Prefix)-vnet"
    $config['AksClusterName']    = "$($config.Prefix)-aks"
    $config['AksSubnetName']     = 'aks-subnet'
    $config['VmSubnetName']      = 'vm-subnet'
    $config['WindowsVmName']     = "$($config.Prefix)-win"
    $config['NsgName']           = "$($config.Prefix)-win-nsg"
    $config['PublicIpName']      = "$($config.Prefix)-win-pip"
    $config['NicName']           = "$($config.Prefix)-win-nic"
    $config['StateFile']         = Join-Path $PSScriptRoot '.lab-state.json'

    return $config
}

function Get-LabState {
    <#
    .SYNOPSIS
        Reads the generated credentials and discovered addresses written by
        earlier scripts in the sequence.
    #>
    [CmdletBinding()]
    [OutputType([hashtable])]
    param([Parameter(Mandatory)][hashtable]$Config)

    if (Test-Path $Config.StateFile) {
        $raw = Get-Content -Path $Config.StateFile -Raw | ConvertFrom-Json
        $state = @{}
        foreach ($property in $raw.PSObject.Properties) {
            $state[$property.Name] = $property.Value
        }
        return $state
    }

    return @{}
}

function Set-LabState {
    <#
    .SYNOPSIS
        Persists a key into .lab-state.json.

    .DESCRIPTION
        The state file holds generated passwords in clear text, so it is
        written with owner-only permissions on anything that supports them and
        is listed in .gitignore.
    #>
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [Parameter(Mandatory)][hashtable]$Config,
        [Parameter(Mandatory)][string]$Name,
        [Parameter(Mandatory)][AllowEmptyString()][string]$Value
    )

    $state = Get-LabState -Config $Config
    $state[$Name] = $Value

    if ($PSCmdlet.ShouldProcess($Config.StateFile, "Write $Name")) {
        $state | ConvertTo-Json -Depth 5 | Set-Content -Path $Config.StateFile -Encoding utf8

        if ($IsLinux -or $IsMacOS) {
            & chmod 600 $Config.StateFile
        }
    }
}

function New-LabPassword {
    <#
    .SYNOPSIS
        Generates a password that satisfies Azure's Windows VM complexity rules.
    #>
    [Diagnostics.CodeAnalysis.SuppressMessageAttribute(
        'PSUseShouldProcessForStateChangingFunctions', '',
        Justification = 'New- is the approved verb for creating a value, but this function changes no system state. It returns a string and writes nothing.'
    )]
    [CmdletBinding()]
    [OutputType([string])]
    param([int]$Length = 24)

    $upper   = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    $lower   = 'abcdefghijkmnopqrstuvwxyz'
    $digit   = '23456789'
    $special = '!#$%*-_=+'
    $all     = $upper + $lower + $digit + $special

    $chars = @(
        $upper[(Get-Random -Maximum $upper.Length)]
        $upper[(Get-Random -Maximum $upper.Length)]
        $lower[(Get-Random -Maximum $lower.Length)]
        $lower[(Get-Random -Maximum $lower.Length)]
        $digit[(Get-Random -Maximum $digit.Length)]
        $digit[(Get-Random -Maximum $digit.Length)]
        $special[(Get-Random -Maximum $special.Length)]
        $special[(Get-Random -Maximum $special.Length)]
    )

    for ($i = $chars.Count; $i -lt $Length; $i++) {
        $chars += $all[(Get-Random -Maximum $all.Length)]
    }

    return -join ($chars | Sort-Object { Get-Random })
}

function Test-LabQuota {
    <#
    .SYNOPSIS
        Checks the requested footprint against the regional quotas before
        anything is created.

    .DESCRIPTION
        Azure reports InsufficientVCPUQuota and PublicIPCountLimitReached only
        after several minutes of provisioning, which on a free-tier
        subscription means a half-built cluster and a manual cleanup.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][hashtable]$Config)

    $cores = ($Config.AksNodeCount * $Config.NodeVcpus)
    if ($Config.DeployWindowsVm) { $cores += $Config.WindowsVmVcpus }

    $publicIps = 2    # AKS outbound load balancer, gateway LoadBalancer Service
    if ($Config.DeployKeycloak -and -not $Config.KeycloakInternalLb) { $publicIps++ }
    if ($Config.DeployWindowsVm) { $publicIps++ }

    Write-LabInfo "Footprint: $cores vCPUs, $publicIps Standard public IPs"

    if (-not $Config.LabMode) {
        Write-LabInfo 'LabMode is off, skipping the quota check.'
        return
    }

    if ($cores -gt $Config.RegionalCoreQuota) {
        throw @"
This footprint needs $cores vCPUs but the Total Regional Cores quota for $($Config.Location) is $($Config.RegionalCoreQuota).

$($Config.AksNodeCount) AKS node(s) at $($Config.NodeVcpus) vCPU each, plus $(if ($Config.DeployWindowsVm) { $Config.WindowsVmVcpus } else { 0 }) vCPU for the Windows VM.

Pick one: drop AksNodeCount to 1, set DeployWindowsVm to `$false, or raise
RegionalCoreQuota after a support ticket increases it. A self-service increase
through the Microsoft.Quota API is not offered on free-tier subscriptions and
fails with ResourceNotAvailableForOffer.
"@
    }

    if ($publicIps -gt $Config.PublicIpQuota) {
        throw @"
This footprint needs $publicIps Standard public IPs but the quota for $($Config.Location) is $($Config.PublicIpQuota).

Set KeycloakInternalLb to `$true to move Keycloak behind an internal load
balancer. It stays reachable from the Windows VM on the same VNet.
"@
    }

    Write-LabSuccess 'Footprint fits the configured quotas.'
}

function Invoke-LabNative {
    <#
    .SYNOPSIS
        Runs kubectl, helm, or another external command and throws on a
        non-zero exit code.

    .DESCRIPTION
        PowerShell does not raise on a failing native command, so without this
        a failed helm install is silently followed by a verification step that
        reports success.
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$FilePath,
        [Parameter(Mandatory)][string[]]$ArgumentList,
        [string]$StdIn,
        [switch]$PassThru
    )

    Write-Verbose "$FilePath $($ArgumentList -join ' ')"

    if ($StdIn) {
        $output = $StdIn | & $FilePath @ArgumentList 2>&1
    }
    else {
        $output = & $FilePath @ArgumentList 2>&1
    }

    if ($LASTEXITCODE -ne 0) {
        throw "$FilePath $($ArgumentList -join ' ') failed with exit code $LASTEXITCODE`n$($output -join [Environment]::NewLine)"
    }

    if ($PassThru) { return ($output -join [Environment]::NewLine) }

    $output | ForEach-Object { Write-LabInfo $_ }
}

function Wait-LabLoadBalancerIp {
    <#
    .SYNOPSIS
        Blocks until a LoadBalancer Service is assigned an address.
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$ServiceName,
        [Parameter(Mandatory)][string]$Namespace,
        [int]$TimeoutSeconds = 600
    )

    $deadline = (Get-Date).AddSeconds($TimeoutSeconds)
    Write-LabInfo "Waiting for an address on service/$ServiceName in $Namespace..."

    while ((Get-Date) -lt $deadline) {
        $ip = & kubectl get svc $ServiceName -n $Namespace `
            -o 'jsonpath={.status.loadBalancer.ingress[0].ip}' 2>$null

        if ($ip) {
            Write-LabSuccess "service/$ServiceName is at $ip"
            return $ip
        }

        Start-Sleep -Seconds 10
    }

    throw @"
service/$ServiceName in $Namespace had no address after $TimeoutSeconds seconds.

Check the Service events:
  kubectl describe svc $ServiceName -n $Namespace

A 403 AuthorizationFailed reading the VNet subnet means the AKS control plane
identity is missing Network Contributor on the VNet. 01-New-LabInfrastructure.ps1
grants it; re-run that script if the cluster was built another way.
"@
}

function Test-LabPrerequisite {
    <#
    .SYNOPSIS
        Confirms an external command is on PATH.
    #>
    [CmdletBinding()]
    [OutputType([bool])]
    param(
        [Parameter(Mandatory)][string]$Command,
        [Parameter(Mandatory)][string]$InstallHint
    )

    if (Get-Command $Command -ErrorAction SilentlyContinue) {
        Write-LabSuccess "$Command found"
        return $true
    }

    Write-LabWarning "$Command missing. $InstallHint"
    return $false
}

Export-ModuleMember -Function @(
    'Write-LabStep'
    'Write-LabInfo'
    'Write-LabSuccess'
    'Write-LabWarning'
    'Get-LabConfig'
    'Get-LabState'
    'Set-LabState'
    'New-LabPassword'
    'Test-LabQuota'
    'Invoke-LabNative'
    'Wait-LabLoadBalancerIp'
    'Test-LabPrerequisite'
)
