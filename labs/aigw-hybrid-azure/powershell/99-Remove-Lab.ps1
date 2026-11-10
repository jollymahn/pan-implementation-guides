<#
.SYNOPSIS
    Removes the lab.

.DESCRIPTION
    Deleting the resource group removes AKS, the VM, the VNet, public IPs, and
    the load balancers in one operation. The kubeconfig context and the local
    state file are cleaned up separately.

.PARAMETER ParameterFile
    Path to Lab.parameters.psd1. Defaults to the copy beside this script.

.PARAMETER Force
    Skip the confirmation prompt.

.PARAMETER KeepState
    Leave .lab-state.json in place, so generated passwords survive a rebuild.

.EXAMPLE
    ./99-Remove-Lab.ps1

.EXAMPLE
    ./99-Remove-Lab.ps1 -Force
#>

[CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'High')]
param(
    [string]$ParameterFile,
    [switch]$Force,
    [switch]$KeepState
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module (Join-Path $PSScriptRoot 'LabCommon.psm1') -Force

$config = Get-LabConfig -Path $ParameterFile

$rg = Get-AzResourceGroup -Name $config.ResourceGroupName -ErrorAction SilentlyContinue
if (-not $rg) {
    Write-Host "Resource group $($config.ResourceGroupName) does not exist." -ForegroundColor Yellow
}
else {
    Write-Host ''
    Write-Host "About to delete the resource group $($config.ResourceGroupName) and everything in it:" -ForegroundColor Yellow
    Write-Host ''

    Get-AzResource -ResourceGroupName $config.ResourceGroupName |
        Select-Object Name, ResourceType |
        Format-Table -AutoSize

    if (-not $Force) {
        $answer = Read-Host "Type the resource group name to confirm"
        if ($answer -ne $config.ResourceGroupName) {
            Write-Host 'Name did not match. Nothing deleted.' -ForegroundColor Red
            return
        }
    }

    if ($PSCmdlet.ShouldProcess($config.ResourceGroupName, 'Delete resource group')) {
        Write-LabStep "Deleting $($config.ResourceGroupName)"
        Remove-AzResourceGroup -Name $config.ResourceGroupName -Force -AsJob | Out-Null
        Write-LabSuccess 'Deletion running in the background. It takes 5 to 10 minutes.'
        Write-LabInfo "Track it with: Get-AzResourceGroup -Name $($config.ResourceGroupName)"
    }
}

# ── kubeconfig ───────────────────────────────────────────────────────────────
Write-LabStep 'Cleaning up the kubeconfig'

foreach ($target in @('context', 'cluster')) {
    & kubectl config "delete-$target" $config.AksClusterName 2>$null | Out-Null
}
& kubectl config unset "users.clusterUser_$($config.ResourceGroupName)_$($config.AksClusterName)" 2>$null | Out-Null
Write-LabSuccess 'Context, cluster, and user entries removed'

# ── Local state ──────────────────────────────────────────────────────────────
if (-not $KeepState) {
    Write-LabStep 'Removing local state'

    foreach ($file in @($config.StateFile, (Join-Path $PSScriptRoot '.values-overlay.yaml'))) {
        if (Test-Path $file) {
            Remove-Item $file -Force
            Write-LabSuccess "Removed $(Split-Path $file -Leaf)"
        }
    }

    Write-LabWarning "values.yaml was left in place. Delete it by hand if you are done with this gateway registration."
}

Write-Host ''
Write-Host 'Cleanup started.' -ForegroundColor Green
