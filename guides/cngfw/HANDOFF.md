# Cloud NGFW Guide — Handoff

## Status: Diagrams wired in, ready for content refinement

## What's Done

### Guide (complete)
- `cloud-ngfw-deployment.html` — single-page guide with AWS/Azure cloud picker
- AWS Combined Design: 44 collapsible sections (prereqs → post-deployment verification)
- Azure Centralized VNet: 43 collapsible sections (same phase structure)
- Panorama/SCM management tabs in Phase 2 for both clouds
- Landing page cards activated for AWS and Azure (`docs/index.html`)
- Browser-verified: cloud picker, sidebar switching, collapsibles, tabs, no console errors

### Diagrams (complete — primary set)
7 architecture/topology diagrams wired into the guide, replacing all `[DIAGRAM]` placeholders:

| Diagram | File | Section |
|---|---|---|
| AWS Combined high-level | `diagrams/aws/Combined Simplified.png` | AWS Architecture Overview |
| AWS Centralized high-level | `diagrams/aws/Centralized Simplified.png` | AWS Architecture Overview |
| Azure VNet hub-and-spoke | `diagrams/azure/vnet.png` | Azure Architecture Overview |
| Azure egress flow | `diagrams/azure/vnet - outbound.png` | Azure Traffic Flows |
| Azure ingress flow | `diagrams/azure/vnet - inbound.png` | Azure Traffic Flows |
| Azure east-west flow | `diagrams/azure/vnet - east-west.png` | Azure Traffic Flows |
| Azure vWAN architecture | `diagrams/azure/vwan.png` | Azure vWAN Overview |

### Source Material
7 PDF→MD conversions in `workspace/cngfw/`:
- `cngfw-aws/`: 3 MDs + 2 PDFs + 1 diagram zip (22 PNGs)
- `cngfw-azure/`: 3 MDs + 3 PDFs + 2 diagram zips (18 unique PNGs)

## What's Left

See `TODO.md` in this directory for the full list. Summary:

1. **Additional diagrams** — 33 bonus diagrams extracted but not yet placed (AWS traffic flows, detailed route tables, vWAN flows, management diagrams). Backlogged in `BACKLOG.md`.
2. **SCM path gaps** — 2B steps are thinner than Panorama due to limited source material on SCM-specific Cloud NGFW workflows.
3. **Terraform variable validation** — variable names in Steps 4.3-4.4 based on SWFW module patterns, not yet verified against actual `cloudngfw_combined_design` and `cloudngfw_centralized_vnet` examples.
4. **No screenshots** — would need live Cloud NGFW deployments.
5. **GCP** — landing page card still `.coming-soon`; no source material yet.

## File Inventory

| File | Status |
|---|---|
| `cloud-ngfw-deployment.html` | Complete (3900+ lines) |
| `diagrams/aws/` | 22 PNGs (2 in use, 20 backlogged) |
| `diagrams/azure/` | 18 PNGs (5 in use, 13 backlogged) |
| `screenshots/` | 2 Playwright verification screenshots |
| `HANDOFF.md` | This file |
| `TODO.md` | Remaining work items |
| `workspace/cngfw/` | Source PDFs, MDs, HTML fragments |
