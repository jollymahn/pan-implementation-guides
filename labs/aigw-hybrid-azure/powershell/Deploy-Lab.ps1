<#
.SYNOPSIS
    Runs the lab deployment scripts in order.

.DESCRIPTION
    Prerequisites, infrastructure, Keycloak, gateway, Windows VM, verification.
    Each script is idempotent, so a failed run can be fixed and restarted from
    the step that failed with -StartAt.

.PARAMETER ParameterFile
    Path to Lab.parameters.psd1. Defaults to the copy beside this script.

.PARAMETER StartAt
    Step to begin from. Useful after fixing a failure partway through.

.PARAMETER WorkspaceApiKey
    Passed to the verification step to run a real chat completion.

.PARAMETER SkipPrerequisites
    Skip the prerequisite check.

.EXAMPLE
    ./Deploy-Lab.ps1

.EXAMPLE
    ./Deploy-Lab.ps1 -StartAt Gateway -WorkspaceApiKey $env:SCM_WORKSPACE_KEY
#>

[CmdletBinding()]
param(
    [string]$ParameterFile,

    [ValidateSet('Prerequisites', 'Infrastructure', 'Keycloak', 'Gateway', 'WindowsVm', 'Verify')]
    [string]$StartAt = 'Prerequisites',

    [string]$WorkspaceApiKey,

    [switch]$SkipPrerequisites
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module (Join-Path $PSScriptRoot 'LabCommon.psm1') -Force

$steps = @(
    @{ Name = 'Prerequisites';  Script = '00-Test-Prerequisites.ps1' }
    @{ Name = 'Infrastructure'; Script = '01-New-LabInfrastructure.ps1' }
    @{ Name = 'Keycloak';       Script = '02-Install-Keycloak.ps1' }
    @{ Name = 'Gateway';        Script = '03-Install-AigwDataPlane.ps1' }
    @{ Name = 'WindowsVm';      Script = '04-New-TrafficGeneratorVm.ps1' }
    @{ Name = 'Verify';         Script = '05-Test-LabDeployment.ps1' }
)

$startIndex = [array]::IndexOf(($steps | ForEach-Object { $_.Name }), $StartAt)
$started = Get-Date

Write-Host ''
Write-Host '════════════════════════════════════════════' -ForegroundColor White
Write-Host ' AIGW hybrid lab on Azure' -ForegroundColor White
Write-Host '════════════════════════════════════════════' -ForegroundColor White

for ($i = $startIndex; $i -lt $steps.Count; $i++) {
    $step = $steps[$i]

    if ($step.Name -eq 'Prerequisites' -and $SkipPrerequisites) {
        Write-Host ''
        Write-Host "Skipping $($step.Name)" -ForegroundColor Yellow
        continue
    }

    Write-Host ''
    Write-Host "───── $($step.Name) ─────" -ForegroundColor Magenta

    $scriptPath = Join-Path $PSScriptRoot $step.Script
    $arguments = @{}
    if ($ParameterFile) { $arguments['ParameterFile'] = $ParameterFile }
    if ($step.Name -eq 'Verify' -and $WorkspaceApiKey) {
        $arguments['WorkspaceApiKey'] = $WorkspaceApiKey
    }

    try {
        & $scriptPath @arguments
    }
    catch {
        Write-Host ''
        Write-Host "$($step.Name) failed." -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        Write-Host ''
        Write-Host "Fix the problem, then resume with:" -ForegroundColor Yellow
        Write-Host "  ./Deploy-Lab.ps1 -StartAt $($step.Name)" -ForegroundColor Yellow
        exit 1
    }
}

$elapsed = (Get-Date) - $started

Write-Host ''
Write-Host '════════════════════════════════════════════' -ForegroundColor Green
Write-Host (" Deployment finished in {0:mm}m {0:ss}s" -f $elapsed) -ForegroundColor Green
Write-Host '════════════════════════════════════════════' -ForegroundColor Green
Write-Host ''
Write-Host 'Remaining work happens in Strata Cloud Manager:' -ForegroundColor Yellow
Write-Host '  1. Organization Details > General: paste the Gateway URLs printed above.'
Write-Host '  2. AI Gateway > Model Catalog: add an LLM provider and give it a slug.'
Write-Host '  3. AI Gateway > API Keys: create a Workspace API Key.'
Write-Host '  4. Re-run verification with that key:'
Write-Host '     ./05-Test-LabDeployment.ps1 -WorkspaceApiKey <key>'
Write-Host ''
