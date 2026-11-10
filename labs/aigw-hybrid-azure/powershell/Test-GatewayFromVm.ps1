<#
.SYNOPSIS
    Traffic generator. Run this on the Windows VM, not on your workstation.

.DESCRIPTION
    Confirms the VM can reach Keycloak and the gateway over the VNet, then
    sends chat completions through the gateway so traffic shows up in SCM's
    analytics and logs.

    Copy this file to the VM over the RDP session's clipboard or a mapped
    drive. It has no Az module dependency.

.PARAMETER GatewayIp
    Load balancer address of the airs-gw Service.

.PARAMETER KeycloakIp
    Load balancer address of the Keycloak Service. Optional.

.PARAMETER WorkspaceApiKey
    SCM Workspace API Key, from AI Gateway > API Keys.

.PARAMETER Model
    Model reference using the saved integration's slug.

.PARAMETER Count
    Number of completions to send.

.PARAMETER DelaySeconds
    Pause between requests.

.EXAMPLE
    ./Test-GatewayFromVm.ps1 -GatewayIp 203.0.113.10 -WorkspaceApiKey sk-xxx

.EXAMPLE
    ./Test-GatewayFromVm.ps1 -GatewayIp 203.0.113.10 -KeycloakIp 10.0.1.250 -WorkspaceApiKey sk-xxx -Count 20 -DelaySeconds 3
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory)][string]$GatewayIp,
    [string]$KeycloakIp,
    [Parameter(Mandatory)][string]$WorkspaceApiKey,
    [string]$Model = '@openai/gpt-4o-mini',
    [int]$Count = 5,
    [int]$DelaySeconds = 2
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$prompts = @(
    'Summarize the CIA triad in two sentences.'
    'What is the difference between authentication and authorization?'
    'Name three controls that reduce the blast radius of a leaked API key.'
    'Explain mutual TLS to someone who knows HTTPS.'
    'What belongs in an incident response runbook?'
    'Why does least privilege matter for service accounts?'
    'Describe one risk of prompt injection against an LLM gateway.'
    'What does a JWT audience claim protect against?'
)

Write-Host ''
Write-Host 'AIGW lab traffic generator' -ForegroundColor White
Write-Host ''

# ── Connectivity ─────────────────────────────────────────────────────────────
if ($KeycloakIp) {
    Write-Host "Keycloak at $KeycloakIp" -ForegroundColor Cyan
    try {
        $response = Invoke-WebRequest -Uri "http://$KeycloakIp" -UseBasicParsing -TimeoutSec 20
        Write-Host "    Reachable, HTTP $($response.StatusCode)" -ForegroundColor Green
    }
    catch {
        Write-Host "    Unreachable: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host '    The VM and the AKS subnet share one VNet, so this should work. Check the Service address.' -ForegroundColor Yellow
    }
}

Write-Host "Gateway at $GatewayIp" -ForegroundColor Cyan
try {
    $health = Invoke-RestMethod -Uri "http://$GatewayIp/v1/health" -TimeoutSec 20
    Write-Host "    Healthy: $($health | ConvertTo-Json -Compress)" -ForegroundColor Green
}
catch {
    # An unauthenticated GET returning an "Invalid API Key" body is a correct
    # answer from the gateway, not a routing failure.
    Write-Host "    Health endpoint did not answer: $($_.Exception.Message)" -ForegroundColor Yellow
}

# ── Traffic ──────────────────────────────────────────────────────────────────
Write-Host ''
Write-Host "Sending $Count completion(s) through the gateway" -ForegroundColor Cyan

# The slug goes in the model field. Organisations with block_inline_config
# enabled reject an x-portkey-provider header with inline_provider_blocked.
$headers = @{
    'Content-Type'      = 'application/json'
    'x-portkey-api-key' = $WorkspaceApiKey
}

$succeeded = 0
$failed = 0

for ($i = 1; $i -le $Count; $i++) {
    $prompt = $prompts[($i - 1) % $prompts.Count]

    $body = @{
        model    = $Model
        messages = @(@{ role = 'user'; content = $prompt })
    } | ConvertTo-Json -Depth 5

    try {
        $response = Invoke-RestMethod `
            -Uri "http://$GatewayIp/v1/chat/completions" `
            -Method Post `
            -Headers $headers `
            -Body $body `
            -TimeoutSec 60

        $content = $response.choices[0].message.content
        $preview = if ($content.Length -gt 70) { $content.Substring(0, 70) + '...' } else { $content }

        Write-Host ("  [{0}/{1}] ok  {2}" -f $i, $Count, $preview) -ForegroundColor Green
        $succeeded++
    }
    catch {
        $detail = $_.ErrorDetails.Message
        if (-not $detail) { $detail = $_.Exception.Message }
        Write-Host ("  [{0}/{1}] failed  {2}" -f $i, $Count, $detail) -ForegroundColor Red
        $failed++
    }

    if ($i -lt $Count) { Start-Sleep -Seconds $DelaySeconds }
}

Write-Host ''
Write-Host "$succeeded succeeded, $failed failed." -ForegroundColor White
Write-Host 'Check SCM: AI Gateway > Observability > Logs. Entries appear within a minute.' -ForegroundColor Yellow
