# Cloud NGFW Guide — TODO

## Remaining (all blocked on live deployments)

- [ ] **SCM DAG nav path** — Verify `Objects > Address Groups` vs `Policies > Objects > Address Groups` in SCM UI
- [ ] **Match criteria format** — Verify `vnet_name` vs `vnet-name` for DAG match expressions in SCM
- [ ] **KQL table names** — Verify `NGFWTrafficLogs`, `NGFWThreatLogs` in Azure Log Analytics
- [ ] **Live deployment screenshots** — Capture key verification points on both AWS and Azure (NGFW resource created, rulestack associated, traffic logs flowing)
- [ ] **Troubleshooting validation** — Verify troubleshooting steps against actual error scenarios

## Completed

### Content
- [x] **SCM path enrichment** — Phase 2B tabs fleshed out for both AWS (7 steps) and Azure (7 steps) with full tables, verification blocks, zone callouts, and SCM-specific warnings.
- [x] **Terraform variable validation** — Variables validated against actual SWFW modules. AzureRM provider fixed to `>= 4.0`, phantom provider removed, NSG corrections applied.
- [x] **Cross-links** — "Managed alternative: Cloud NGFW" callout added to both AWS and Azure VM-Series guides with decision guidance.
- [x] **Verification blocks** — 102 of 107 collapsibles have verification. Remaining 5 are nested diagram viewers (supplementary reference, not procedural steps).

### Diagrams — AWS
- [x] **All 22 AWS PNGs** — traffic flows, route tables, TGW attachments, multi-account concept, AZ placement, Panorama management — all wired into combined guide.

### Diagrams — Azure (combined guide)
- [x] **All 18 Azure PNGs + 6 .drawio** — VNet/vWAN traffic flows, vWAN detail, management, DAGs, distributed model — all wired into combined guide.

### Diagrams — Azure Native Guide
- [x] **All 7 .drawio files exported to .png** — VNet/vWAN overviews, DNS proxy flow, management boundary, traffic flows. draw.io CLI installed, auto-export added to `/guides/verify-guide`.

### Not Applicable
- ~~**GCP tab**~~ — Cloud NGFW is not available on GCP.
