# Diagram Sources

Maps exported diagram images back to their editable Lucidchart source documents. Always update this file when adding or replacing a diagram.

## How to add a diagram

1. Create or edit the diagram in Lucidchart
2. Export as SVG (preferred) or PNG at 2x resolution
3. Save to the guide's `diagrams/` folder with a descriptive name
4. Add a row to the table below linking the file to its Lucidchart URL

## AWS

| File | Description | Lucidchart URL |
|---|---|---|
| `aws/diagrams/` | *(no diagrams yet)* | |

## Azure

| File | Description | Lucidchart URL |
|---|---|---|
| `azure/diagrams/` | *(no diagrams yet)* | |

## GCP

| File | Description | Lucidchart URL |
|---|---|---|
| `gcp/diagrams/` | *(no diagrams yet)* | |

## AI Gateway

These are draw.io diagrams, not Lucidchart. The editable `.drawio` source sits beside each `.svg` in the same folder, so there is no external URL to chase. Open the source in [diagrams.net](https://app.diagrams.net/), edit, then re-export:

```bash
cd docs/guides/ai-gateway/diagrams
drawio -x -f svg --crop -o NAME.svg NAME.drawio
python3 clean-svg.py NAME.svg
```

`clean-svg.py` is required, not optional. The draw.io CLI embeds a base64 PNG raster fallback for every text block, which pushes each export past 2 MB, and it emits `light-dark()` CSS that makes the diagram unreadable for anyone browsing in dark mode. The script strips both and takes the file back down to 25 to 45 KB.

| File | Description | Source |
|---|---|---|
| `ai-gateway/diagrams/aigw-key-flow.svg` | The two-key model: gateway key in, provider key out | `aigw-key-flow.drawio` |
| `ai-gateway/diagrams/aigw-getting-inline.svg` | Before and after cutover, and the five values required | `aigw-getting-inline.drawio` |
| `ai-gateway/diagrams/aigw-bedrock.svg` | Gateway fronting Amazon Bedrock with an IAM credential | `aigw-bedrock.drawio` |
| `ai-gateway/diagrams/aigw-openai.svg` | Gateway fronting the OpenAI API, and why it cannot front the ChatGPT app | `aigw-openai.drawio` |
| `ai-gateway/diagrams/aigw-azure-foundry.svg` | Gateway fronting Azure AI Foundry, deployments and Entra auth | `aigw-azure-foundry.drawio` |
| `ai-gateway/diagrams/aigw-claude-code.svg` | Routing Claude Code through the gateway with three environment variables | `aigw-claude-code.drawio` |
| `ai-gateway/diagrams/aigw-attribution-billing.svg` | Where cost figures and group breakdowns come from | `aigw-attribution-billing.drawio` |
| `ai-gateway/diagrams/aigw-request-lifecycle.svg` | The six per-request checks and the errors each one returns | `aigw-request-lifecycle.drawio` |
| `ai-gateway/diagrams/aigw-agent-identity.svg` | Agent authentication through CIE Directory Sync and Azure Entra ID, and what the gateway attributes the call to | `aigw-agent-identity.drawio` |
| `ai-gateway/diagrams/aigw-streaming-guardrails.svg` | Where a streamed response can be stopped, and where it cannot | `aigw-streaming-guardrails.drawio` |
| `ai-gateway/diagrams/aigw-semantic-cache.svg` | How a request finds a cached answer, gate by gate | `aigw-semantic-cache.drawio` |
| `ai-gateway/diagrams/aigw-agent-gateway-a2a.svg` | What changes when an A2A call goes through the Agent Gateway | `aigw-agent-gateway-a2a.drawio` |
| `ai-gateway/diagrams/aigw-entra-agent-flow.svg` | The complete Azure Entra ID agent identity flow: control plane, one-off configuration, and eleven per-request steps | `aigw-entra-agent-flow.drawio` |
| `ai-gateway/diagrams/aigw-architecture-overview.svg` | *(pre-existing, hand-authored SVG)* | none |
| `ai-gateway/diagrams/aigw-deployment-models.svg` | *(pre-existing, hand-authored SVG)* | none |

Nine of these, from the two-key model through agent identity, are presented together with commentary and open questions on the review page at `ai-gateway/diagrams/flow-diagrams-review.html`. The three streaming, caching, and A2A diagrams are embedded inline in `ai-gateway/streaming-caching-a2a.html`, one per phase, rather than on the review page. The Entra agent flow diagram is embedded inline in `ai-gateway/agent-identity-entra.html`, where it doubles as the page's structure: its three bands are the guide's six phases.

## AI Red Teaming

Also draw.io, with the same export pipeline as AI Gateway. The editable `.drawio` sits beside each `.svg` in `airs-red/diagrams/`, and a copy of `clean-svg.py` lives in the same folder:

```bash
cd docs/guides/airs-red/diagrams
drawio -x -f svg --crop -o NAME.svg NAME.drawio
python3 clean-svg.py NAME.svg
```

| File | Description | Source |
|---|---|---|
| `airs-red/diagrams/airs-red-architecture.svg` | Console, three API planes, five routes, one target under test | `airs-red-architecture.drawio` |
| `airs-red/diagrams/airs-red-reaching-the-target.svg` | The five routes to a target, with what you deploy and the lead time on each | `airs-red-reaching-the-target.drawio` |
| `airs-red/diagrams/airs-red-target-types.svg` | Application, Agent and Model, and every connection method | `airs-red-target-types.drawio` |
| `airs-red/diagrams/airs-red-rest-target-call.svg` | One attack prompt end to end, the two JSON templates, and what each status code does to the report | `airs-red-rest-target-call.drawio` |
| `airs-red/diagrams/airs-red-multi-turn.svg` | Stateless and stateful multi-turn, and where neither is possible | `airs-red-multi-turn.drawio` |
| `airs-red/diagrams/airs-red-network-channel.svg` | The outbound WebSocket tunnel, the three FQDNs, and the client version floors | `airs-red-network-channel.drawio` |
| `airs-red/diagrams/airs-red-custom-adapter.svg` | Pattern A and Pattern B, the context object, and the runtime limits | `airs-red-custom-adapter.drawio` |
| `airs-red/diagrams/airs-red-coverage-map.svg` | What a connection method reaches, and what needs an adapter or a wrapper | `airs-red-coverage-map.drawio` |
| `airs-red/diagrams/airs-red-wrapper-rest-shim.svg` | Type 1, a REST shim over an SDK-only or gRPC agent | `airs-red-wrapper-rest-shim.drawio` |
| `airs-red/diagrams/airs-red-wrapper-websocket.svg` | Type 2, a REST front holding one WebSocket open across turns | `airs-red-wrapper-websocket.drawio` |
| `airs-red/diagrams/airs-red-wrapper-signing-proxy.svg` | Type 3, the SigV4 signing proxy and the Okta token-refresh proxy | `airs-red-wrapper-signing-proxy.drawio` |
| `airs-red/diagrams/airs-red-bridge-bedrock.svg` | Bridge A, a Lambda function URL reaching `InvokeAgent` | `airs-red-bridge-bedrock.drawio` |
| `airs-red/diagrams/airs-red-bridge-foundry.svg` | Bridge B, an Azure Function App reaching a Foundry agent | `airs-red-bridge-foundry.drawio` |
| `airs-red/diagrams/airs-red-scan-lifecycle.svg` | The three scan types, the status chain, and the report metrics | `airs-red-scan-lifecycle.drawio` |

All fourteen are embedded inline in `airs-red/airs-red-teaming.html` at the step they belong to, and gathered with commentary on the review page at `airs-red/diagrams/flow-diagrams-review.html`. Ten also appear in `airs-red/airs-red-teaming.md`; the adapter and wrapper diagrams have no markdown home because those sections exist only in the HTML. The architecture and network channel diagrams replace earlier versions that lived in `airs-red/airs-red-screenshots/`.

## Connectivity checks

Four diagrams, one per pillar, visualising the command ladder the
[connectivity validator](airs/airs-connectivity-validator.html) generates: where each
check runs from, what it crosses, what it proves, and what a failure at that rung
means. Each lives beside its own pillar's guide and is linked from the validator once
that pillar is selected.

| File | Description | Source |
|---|---|---|
| `airs-red/diagrams/airs-conn-red-teaming.svg` | Tenant checks from a workstation, the registry check from inside the cluster, and the path these checks deliberately do not cover | `airs-conn-red-teaming.drawio` |
| `ai-gateway/diagrams/airs-conn-ai-gateway.svg` | The two directions to test, and why a gateway reporting Healthy can still fail every request | `airs-conn-ai-gateway.drawio` |
| `airs/diagrams/airs-conn-api-intercept.svg` | Where the scan call originates, the region lock on API keys, and the two different credentials | `airs-conn-api-intercept.drawio` |
| `airs-model/diagrams/airs-conn-model-scanning.svg` | The four hops from the scanning host, including the private package index that blocks most first sessions | `airs-conn-model-scanning.drawio` |

A numbered badge on each arrow maps to a row in the table beneath it. A dashed grey
path is conditional, reached only when that pillar's optional case applies, and exists
so no destination box reads as one somebody forgot to wire up.
