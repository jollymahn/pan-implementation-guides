<#
.SYNOPSIS
    Checks tooling, Azure sign-in, resource provider registration, and the
    requested footprint before anything is created.

.DESCRIPTION
    Every failure this catches costs ten minutes or more to discover during a
    real deployment: a missing Az module, an unregistered resource provider, a
    VM size the subscription rejects, or a footprint that exceeds the regional
    quota.

.PARAMETER ParameterFile
    Path to Lab.parameters.psd1. Defaults to the copy beside this script.

.EXAMPLE
    ./00-Test-Prerequisites.ps1
#>

[CmdletBinding()]
param(
    [string]$ParameterFile
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module (Join-Path $PSScriptRoot 'LabCommon.psm1') -Force

$config = Get-LabConfig -Path $ParameterFile
$failures = @()

Write-Host ''
Write-Host 'AIGW hybrid lab: prerequisite check' -ForegroundColor White

# ── PowerShell modules ───────────────────────────────────────────────────────
Write-LabStep 'Checking Az modules'

$requiredModules = @(
    'Az.Accounts'
    'Az.Resources'
    'Az.Network'
    'Az.Aks'
    'Az.Compute'
)
if ($config.DeployAcr) { $requiredModules += 'Az.ContainerRegistry' }

foreach ($module in $requiredModules) {
    if (Get-Module -ListAvailable -Name $module) {
        Write-LabSuccess "$module found"
    }
    else {
        Write-LabWarning "$module missing"
        $failures += "Install-Module $module -Scope CurrentUser"
    }
}

# ── External tools ───────────────────────────────────────────────────────────
Write-LabStep 'Checking external tools'

# kubectl and helm have no Az module equivalent, so the Kubernetes layer of
# this lab shells out to them.
if (-not (Test-LabPrerequisite -Command 'kubectl' -InstallHint 'Install with: az aks install-cli')) {
    $failures += 'Install kubectl: az aks install-cli'
}
if (-not (Test-LabPrerequisite -Command 'helm' -InstallHint 'Install from https://helm.sh/docs/intro/install/')) {
    $failures += 'Install helm: https://helm.sh/docs/intro/install/'
}

# ── Azure sign-in ────────────────────────────────────────────────────────────
Write-LabStep 'Checking the Azure context'

$context = Get-AzContext -ErrorAction SilentlyContinue
if (-not $context) {
    Write-LabWarning 'Not signed in'
    $failures += 'Sign in: Connect-AzAccount'
}
else {
    Write-LabSuccess "Subscription: $($context.Subscription.Name) ($($context.Subscription.Id))"
    Write-LabInfo "Account: $($context.Account.Id)"
}

# ── Resource providers ───────────────────────────────────────────────────────
if ($context) {
    Write-LabStep 'Checking resource provider registration'

    # Free-tier and newly created subscriptions often have these unregistered,
    # which surfaces much later as MissingSubscriptionRegistration.
    $providers = @(
        'Microsoft.ContainerService'
        'Microsoft.Network'
        'Microsoft.Compute'
        'Microsoft.Storage'
    )

    foreach ($namespace in $providers) {
        $state = (Get-AzResourceProvider -ProviderNamespace $namespace |
            Select-Object -First 1).RegistrationState

        if ($state -eq 'Registered') {
            Write-LabSuccess "$namespace registered"
        }
        else {
            Write-LabWarning "$namespace is $state"
            $failures += "Register-AzResourceProvider -ProviderNamespace $namespace"
        }
    }
}

# ── VM size availability ─────────────────────────────────────────────────────
if ($context) {
    Write-LabStep "Checking VM sizes in $($config.Location)"

    $sizesToCheck = @($config.NodeVmSize)
    if ($config.DeployWindowsVm -and $config.WindowsVmSize -ne $config.NodeVmSize) {
        $sizesToCheck += $config.WindowsVmSize
    }

    $available = Get-AzVMSize -Location $config.Location |
        Select-Object -ExpandProperty Name

    foreach ($size in $sizesToCheck) {
        if ($available -contains $size) {
            Write-LabSuccess "$size is offered in $($config.Location)"
        }
        else {
            Write-LabWarning "$size is not offered in $($config.Location)"
            $failures += "Pick another size. List them with: Get-AzVMSize -Location $($config.Location)"
        }
    }

    Write-LabInfo 'A size being offered is not the same as having capacity. SkuNotAvailable at create time means a regional capacity restriction, not a quota problem.'
}

# ── Quota ────────────────────────────────────────────────────────────────────
Write-LabStep 'Checking the requested footprint against the quotas'
Test-LabQuota -Config $config

if ($context) {
    $usage = Get-AzVMUsage -Location $config.Location |
        Where-Object { $_.Name.Value -eq 'cores' }

    if ($usage) {
        Write-LabInfo "Azure reports Total Regional Cores: $($usage.CurrentValue) used of $($usage.Limit)"

        if ($usage.Limit -ne $config.RegionalCoreQuota) {
            Write-LabWarning "RegionalCoreQuota in Lab.parameters.psd1 says $($config.RegionalCoreQuota). Azure says $($usage.Limit). Update the parameter file."
        }
    }
}

# ── SCM values file ──────────────────────────────────────────────────────────
Write-LabStep 'Checking for the SCM values file'

$valuesPath = Join-Path $PSScriptRoot $config.ScmValuesFile
if (Test-Path $valuesPath) {
    Write-LabSuccess "Found $($config.ScmValuesFile)"

    $content = Get-Content -Path $valuesPath -Raw
    foreach ($key in @('PORTKEY_CLIENT_AUTH', 'ORGANISATIONS_TO_SYNC', 'imageCredentials')) {
        if ($content -match [regex]::Escape($key)) {
            Write-LabSuccess "  $key present"
        }
        else {
            Write-LabWarning "  $key missing. Re-download the file from the SCM wizard."
            $failures += "values.yaml is missing $key"
        }
    }
}
else {
    Write-LabWarning "Missing $valuesPath"
    $failures += @"
Download values.yaml from Strata Cloud Manager:
  AI Gateway > Admin Settings > Gateway Registration >
  Configure Gateway Deployment > Download values.yaml
Save it to $valuesPath
"@
}

# ── Result ───────────────────────────────────────────────────────────────────
Write-Host ''
if ($failures.Count -eq 0) {
    Write-Host 'All prerequisites satisfied. Run ./Deploy-Lab.ps1 next.' -ForegroundColor Green
    exit 0
}

Write-Host "$($failures.Count) item(s) need attention:" -ForegroundColor Red
$failures | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
exit 1
