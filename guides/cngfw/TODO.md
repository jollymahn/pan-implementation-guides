# Cloud NGFW Guide — TODO

## Content Refinement

- [ ] **SCM path enrichment** — Phase 2B steps are thinner than Panorama. Research SCM-specific Cloud NGFW workflows (rulestack association, policy push, commit behavior) and flesh out the 2B tabs for both AWS and Azure.
- [ ] **Terraform variable validation** — Verify variable names in Steps 4.3-4.4 against actual `cloudngfw_combined_design` (AWS) and `cloudngfw_centralized_vnet` (Azure) SWFW module examples. Current names are inferred from module patterns.
- [ ] **GCP cloud tab** — No source material yet. When available, add a third cloud picker option and corresponding content. Landing page card is already stubbed as `.coming-soon`.

## Diagrams — AWS

- [ ] **AWS traffic flow diagrams** — Add Combined Design traffic flows (inbound, outbound, east-west + return paths) to the AWS architecture overview section, matching Azure's pattern. 12 PNGs available in `diagrams/aws/`.
- [ ] **AWS detailed route tables** — Add `Combined Complete.png` and `Centralized Complete.png` as nested collapsibles ("See detailed routing") for advanced users.
- [ ] **AWS TGW attachments** — Add `Combined TGW Attachments.png` and `Centralized TGW Attachments.png` to the TGW configuration steps.
- [ ] **AWS multi-account concept** — Add `Combined Account Concept.png` to the prerequisites or architecture overview.
- [ ] **AWS AZ placement** — Add `Availability Zone Concept.png` to architecture overview.
- [ ] **AWS Panorama management** — Add `PN Mgmt.png` and `PN Mgmt & CDL.png` to the Phase 2A Panorama tab.

## Diagrams — Azure

- [ ] **Azure vWAN traffic flows** — Add `vwan - inbound.png`, `vwan - outbound.png`, `vwan - east-west.png` to the vWAN section (matching the VNet traffic flow pattern).
- [ ] **Azure vWAN detail diagrams** — Add transit and multi-region diagrams as supplementary content in the vWAN section.
- [ ] **Azure management diagrams** — Add `PN Management.png`, `PN onprem.png`, `PN templates.png` to the Phase 2A Panorama tab.
- [ ] **Azure DAGs** — Add `DAGs.png` to the policy configuration or post-deployment section.

## Screenshots

- [ ] **Live deployment screenshots** — Requires actual Cloud NGFW deployments on AWS and Azure. Capture key verification points (NGFW resource created, rulestack associated, traffic logs flowing).

## Polish

- [ ] **Cross-link from AWS/Azure VM-Series guides** — Add "See also: Cloud NGFW" callouts in the VM-Series guides for users evaluating managed vs. self-managed options.
- [ ] **Troubleshooting validation** — Verify troubleshooting steps against actual error scenarios.
