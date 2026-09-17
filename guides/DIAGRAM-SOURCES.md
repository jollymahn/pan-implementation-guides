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
| `ai-gateway/diagrams/aigw-architecture-overview.svg` | *(pre-existing, hand-authored SVG)* | none |
| `ai-gateway/diagrams/aigw-deployment-models.svg` | *(pre-existing, hand-authored SVG)* | none |

All eight draw.io diagrams are presented together, with commentary and open questions, on the review page at `ai-gateway/diagrams/flow-diagrams-review.html`.
