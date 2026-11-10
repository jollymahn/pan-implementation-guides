<#
.SYNOPSIS
    Verifies the deployed lab and prints every endpoint.

.DESCRIPTION
    Checks nodes, pods, services, the gateway health endpoint, and the VM.
    Given a Workspace API key it also sends a real chat completion through the
    gateway, which is the only check that proves the whole path works.

.PARAMETER ParameterFile
    Path to Lab.parameters.psd1. Defaults to the copy beside this script.

.PARAMETER WorkspaceApiKey
    SCM Workspace API Key, from AI Gateway > API Keys. Supplying it enables the
    end-to-end chat completion test.

.PARAMETER Model
    Model reference using the saved integration's slug.

.EXAMPLE
    ./05-Test-LabDeployment.ps1

.EXAMPLE
    ./05-Test-LabDeployment.ps1 -WorkspaceApiKey $env:SCM_WORKSPACE_KEY
#>

[CmdletBinding()]
param(
    [string]$ParameterFile,
    [string]$WorkspaceApiKey,
    [string]$Model = '@openai/gpt-4o-mini'
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

Import-Module (Join-Path $PSScriptRoot 'LabCommon.psm1') -Force

$config = Get-LabConfig -Path $ParameterFile
$state = Get-LabState -Config $config
$problems = @()

Write-Host ''
Write-Host 'Phase 5: Verification' -ForegroundColor White

# ── Nodes ────────────────────────────────────────────────────────────────────
Write-LabStep 'AKS nodes'

& kubectl get nodes -o custom-columns='NAME:.metadata.name,STATUS:.status.conditions[-1].type,TYPE:.metadata.labels.node\.kubernetes\.io/instance-type'

$notReady = & kubectl get nodes `
    -o 'jsonpath={range .items[*]}{.metadata.name}{"\t"}{.status.conditions[-1].type}{"\n"}{end}' |
    Where-Object { $_ -notmatch 'Ready$' }

if ($notReady) { $problems += "Nodes not Ready: $notReady" }

# ── Gateway pods ─────────────────────────────────────────────────────────────
Write-LabStep "Pods in $($config.AirsGwNamespace)"

& kubectl get pods -n $config.AirsGwNamespace -o wide

$badPods = & kubectl get pods -n $config.AirsGwNamespace `
    -o 'jsonpath={range .items[?(@.status.phase!="Running")]}{.metadata.name}{" "}{.status.phase}{"\n"}{end}'

if ($badPods) { $problems += "Gateway pods not Running: $badPods" }

# ── Services ─────────────────────────────────────────────────────────────────
Write-LabStep 'Services'

& kubectl get svc -n $config.AirsGwNamespace
if ($config.DeployKeycloak) { & kubectl get svc -n keycloak }

$gatewayIp = & kubectl get svc airs-gw -n $config.AirsGwNamespace `
    -o 'jsonpath={.status.loadBalancer.ingress[0].ip}' 2>$null

if (-not $gatewayIp) {
    $problems += 'The airs-gw Service has no load balancer address.'
}

# ── Gateway health ───────────────────────────────────────────────────────────
if ($gatewayIp) {
    Write-LabStep 'Gateway health endpoint'

    try {
        $health = Invoke-RestMethod -Uri "http://$gatewayIp/v1/health" -TimeoutSec 30
        Write-LabSuccess ($health | ConvertTo-Json -Compress)
    }
    catch {
        $problems += "Health check failed: $($_.Exception.Message)"
        Write-LabWarning $_.Exception.Message
    }
}

# ── Outbound sync path ───────────────────────────────────────────────────────
Write-LabStep 'Outbound path to api.portkey.ai'

# The gateway reports itself to SCM over an outbound heartbeat. When SCM shows
# Connection Status "Unknown", this is the thing to check.
$gatewayPod = & kubectl get pods -n $config.AirsGwNamespace `
    -l 'app.kubernetes.io/name=airs-gw' `
    -o 'jsonpath={.items[0].metadata.name}' 2>$null

if (-not $gatewayPod) {
    $gatewayPod = (& kubectl get pods -n $config.AirsGwNamespace `
        -o 'jsonpath={range .items[*]}{.metadata.name}{"\n"}{end}' |
        Where-Object { $_ -match '^airs-gw-' -and $_ -notmatch 'redis' } |
        Select-Object -First 1)
}

if ($gatewayPod) {
    $code = & kubectl exec -n $config.AirsGwNamespace $gatewayPod -- `
        curl -sS -o /dev/null -w '%{http_code}' https://api.portkey.ai 2>$null

    if ($code -and $code -ne '000') {
        Write-LabSuccess "api.portkey.ai responded with HTTP $code"
    }
    else {
        $problems += 'The gateway pod cannot reach api.portkey.ai. Config sync and SCM status depend on it.'
        Write-LabWarning 'No response. Check egress and any NetworkPolicy in the namespace.'
    }
}
else {
    Write-LabWarning 'No gateway pod found to test from.'
}

# ── Windows VM ───────────────────────────────────────────────────────────────
if ($config.DeployWindowsVm) {
    Write-LabStep 'Windows VM'

    $vm = Get-AzVM `
        -Name $config.WindowsVmName `
        -ResourceGroupName $config.ResourceGroupName `
        -Status `
        -ErrorAction SilentlyContinue

    if ($vm) {
        $power = ($vm.Statuses | Where-Object Code -like 'PowerState/*').DisplayStatus
        Write-LabInfo "Power state: $power"
        if ($power -ne 'VM running') { $problems += "Windows VM is $power" }
    }
    else {
        $problems += 'Windows VM not found.'
    }
}

# ── End-to-end request ───────────────────────────────────────────────────────
if ($WorkspaceApiKey -and $gatewayIp) {
    Write-LabStep 'Chat completion through the gateway'

    # The slug goes in the model field rather than an x-portkey-provider
    # header. Organisations with block_inline_config enabled, which is the
    # common default, reject the header with inline_provider_blocked.
    $headers = @{
        'Content-Type'      = 'application/json'
        'x-portkey-api-key' = $WorkspaceApiKey
    }
    $body = @{
        model    = $Model
        messages = @(@{ role = 'user'; content = 'Hello from the AIGW lab verification script.' })
    } | ConvertTo-Json -Depth 5

    try {
        $response = Invoke-RestMethod `
            -Uri "http://$gatewayIp/v1/chat/completions" `
            -Method Post `
            -Headers $headers `
            -Body $body `
            -TimeoutSec 60

        Write-LabSuccess "Completion: $($response.choices[0].message.content)"
        Write-LabInfo 'This request should appear in SCM under AI Gateway > Observability > Logs within a minute.'
    }
    catch {
        $detail = $_.ErrorDetails.Message
        if (-not $detail) { $detail = $_.Exception.Message }
        $problems += "Chat completion failed: $detail"

        Write-LabWarning $detail

        if ($detail -match 'inline_provider_blocked') {
            Write-LabWarning 'Reference the integration slug in the model field, as @<slug>/<model>. Do not send x-portkey-provider.'
        }
        if ($detail -match 'expired_secret_key|token_invalidated') {
            Write-LabWarning 'The provider API key in SCM has expired. Replace it in the Model Catalog, then wait a minute for the config heartbeat.'
        }
        if ($detail -match 'ByteString') {
            Write-LabWarning 'A provider credential in SCM contains a character above U+00FF, usually a shell prompt glyph pasted with the key. Retype the key rather than editing the paste.'
        }
    }
}
elseif ($gatewayIp) {
    Write-LabStep 'Chat completion through the gateway'
    Write-LabInfo 'Skipped. Pass -WorkspaceApiKey to run it.'
}

# ── Summary ──────────────────────────────────────────────────────────────────
Write-Host ''
Write-Host 'Endpoints' -ForegroundColor White
Write-Host ''

$rows = @()
if ($gatewayIp) {
    $rows += [PSCustomObject]@{ Component = 'Gateway';        Endpoint = "http://$gatewayIp/v1" }
    $rows += [PSCustomObject]@{ Component = 'MCP Gateway';    Endpoint = "http://${gatewayIp}:8788" }
    $rows += [PSCustomObject]@{ Component = 'Gateway health'; Endpoint = "http://$gatewayIp/v1/health" }
}
if ($state.ContainsKey('KeycloakIp')) {
    $suffix = if ($config.KeycloakInternalLb) { '  (internal, reach it from the VM)' } else { '' }
    $rows += [PSCustomObject]@{ Component = 'Keycloak'; Endpoint = "http://$($state.KeycloakIp)$suffix" }
}
if ($state.ContainsKey('WindowsVmPublicIp')) {
    $rows += [PSCustomObject]@{ Component = 'Windows VM (RDP)'; Endpoint = $state.WindowsVmPublicIp }
}

$rows | Format-Table -AutoSize

Write-Host ''
if ($problems.Count -eq 0) {
    Write-Host 'Every check passed.' -ForegroundColor Green
    exit 0
}

Write-Host "$($problems.Count) problem(s):" -ForegroundColor Red
$problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
exit 1
