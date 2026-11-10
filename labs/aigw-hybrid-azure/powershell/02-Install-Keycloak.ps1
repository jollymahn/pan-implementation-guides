<#
.SYNOPSIS
    Deploys Keycloak into the cluster with a LoadBalancer Service.

.DESCRIPTION
    Renders templates/keycloak.yaml, generates an admin password if one is not
    already in .lab-state.json, applies the manifest, and waits for the load
    balancer address.

    On free tier the Service is internal and pinned to KeycloakInternalIp,
    which leaves the third Standard public IP for the Windows VM and makes the
    address known before the Service exists, so KC_HOSTNAME can be set in the
    same pass.

.PARAMETER ParameterFile
    Path to Lab.parameters.psd1. Defaults to the copy beside this script.

.EXAMPLE
    ./02-Install-Keycloak.ps1
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [string]$ParameterFile
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module (Join-Path $PSScriptRoot 'LabCommon.psm1') -Force

$config = Get-LabConfig -Path $ParameterFile

if (-not $config.DeployKeycloak) {
    Write-Host 'DeployKeycloak is false. Nothing to do.' -ForegroundColor Yellow
    return
}

Write-Host ''
Write-Host 'Phase 2: Keycloak' -ForegroundColor White

# ── Namespace ────────────────────────────────────────────────────────────────
Write-LabStep 'Namespace keycloak'

$existing = & kubectl get namespace keycloak -o name 2>$null
if ($existing) {
    Write-LabInfo 'Already exists'
}
elseif ($PSCmdlet.ShouldProcess('keycloak', 'Create namespace')) {
    Invoke-LabNative -FilePath 'kubectl' -ArgumentList @('create', 'namespace', 'keycloak')
}

# ── Admin credentials ────────────────────────────────────────────────────────
Write-LabStep 'Admin credentials'

$state = Get-LabState -Config $config

if ($state.ContainsKey('KeycloakAdminPassword')) {
    $secret = $state.KeycloakAdminPassword
    Write-LabInfo 'Reusing the password from .lab-state.json'
}
else {
    $secret = New-LabPassword -Length 24
    Set-LabState -Config $config -Name 'KeycloakAdminPassword' -Value $secret
    Write-LabSuccess 'Generated and saved to .lab-state.json'
}

if ($PSCmdlet.ShouldProcess('keycloak-admin', 'Create secret')) {
    # --dry-run piped through apply makes this idempotent, where
    # `kubectl create secret` on its own fails the second time.
    $manifest = Invoke-LabNative -FilePath 'kubectl' -PassThru -ArgumentList @(
        'create', 'secret', 'generic', 'keycloak-admin'
        '--namespace', 'keycloak'
        '--from-literal', "username=$($config.KeycloakAdminUsername)"
        '--from-literal', "password=$secret"
        '--dry-run=client', '-o', 'yaml'
    )

    Invoke-LabNative -FilePath 'kubectl' -ArgumentList @('apply', '-f', '-') -StdIn $manifest
}

# ── Manifest ─────────────────────────────────────────────────────────────────
Write-LabStep 'Rendering and applying the Keycloak manifest'

$template = Get-Content -Path (Join-Path $PSScriptRoot 'templates/keycloak.yaml') -Raw

if ($config.KeycloakInternalLb) {
    $annotations = @(
        '  annotations:'
        '    service.beta.kubernetes.io/azure-load-balancer-internal: "true"'
        "    service.beta.kubernetes.io/azure-load-balancer-ipv4: `"$($config.KeycloakInternalIp)`""
    ) -join "`n"

    $hostnameEnv = @(
        '        - name: KC_HOSTNAME'
        "          value: `"http://$($config.KeycloakInternalIp)`""
    ) -join "`n"

    Write-LabInfo "Internal load balancer pinned to $($config.KeycloakInternalIp)"
}
else {
    $annotations = ''
    $hostnameEnv = ''
    Write-LabInfo 'Public load balancer. The address is allocated by Azure, so KC_HOSTNAME is left unset.'
}

$rendered = $template.Replace('__KEYCLOAK_IMAGE__', $config.KeycloakImage)
$rendered = $rendered.Replace('__SERVICE_ANNOTATIONS__', $annotations)
$rendered = $rendered.Replace('__KC_HOSTNAME_ENV__', $hostnameEnv)
$rendered = $rendered.Replace('__STORAGE_CLASS__', $config.KeycloakStorageClass)
$rendered = $rendered.Replace('__STORAGE_SIZE__', $config.KeycloakStorageSize)

Write-LabInfo "Realm data on a $($config.KeycloakStorageSize) $($config.KeycloakStorageClass) volume, so a pod restart keeps the realm and its signing keys."

if ($PSCmdlet.ShouldProcess('keycloak', 'Apply manifest')) {
    Invoke-LabNative -FilePath 'kubectl' -ArgumentList @('apply', '-f', '-') -StdIn $rendered

    Invoke-LabNative -FilePath 'kubectl' -ArgumentList @(
        'rollout', 'status', 'deployment/keycloak', '-n', 'keycloak', '--timeout=600s'
    )
}

# ── Load balancer address ────────────────────────────────────────────────────
Write-LabStep 'Waiting for the load balancer'

$keycloakIp = Wait-LabLoadBalancerIp -ServiceName 'keycloak' -Namespace 'keycloak'
Set-LabState -Config $config -Name 'KeycloakIp' -Value $keycloakIp

Write-Host ''
Write-Host 'Phase 2 complete.' -ForegroundColor Green
Write-LabInfo "Keycloak: http://$keycloakIp  (admin console at /admin)"
Write-LabInfo "Username: $($config.KeycloakAdminUsername)"
Write-LabInfo "Password: see .lab-state.json"

if ($config.KeycloakInternalLb) {
    Write-LabWarning 'This is an internal address. Reach it from the Windows VM, or port-forward from here:'
    Write-LabWarning '  kubectl port-forward -n keycloak svc/keycloak 8081:80'
}

Write-LabInfo 'Next: ./03-Install-AigwDataPlane.ps1'
