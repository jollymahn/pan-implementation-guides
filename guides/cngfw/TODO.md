# Cloud NGFW Guide — TODO

## Remaining

### Not blocked

- [ ] **Strata Logging Service onboarding troubleshooting** — Add a troubleshooting entry to the onboarding/logging section covering the `lcaas_agent` cert-fetch failure. Points to cover:
  - Log signature: `Failed to fetch LCaaS server cert for validation check after 5 retries`, then `Failed to validate server certificate for endpoint lic.lc.prod.us.cs.paloaltonetworks.com. Error (28, 'Connection timed out after 60000 milliseconds')`
  - The wording says certificate validation, but curl error 28 is a TCP timeout. No connection was made, so it is a reachability problem, not a trust problem. Call this out explicitly, since the message misdirects.
  - `lic.lc.prod.us.cs.paloaltonetworks.com` is **TCP 444**, not 443. Allowing `*.paloaltonetworks.com` on 443 only reproduces this exactly. Source: `pan-docs-reference/docs/strata-logging-service/activation-and-onboarding/ports-and-fqdns.md:456` and `pan-docs-reference/docs/pan-os/11-1/ports-used-for-panorama.md:423`
  - Service route: the agent reads `cfg.net.s0.srcif`. A service route for Palo Alto Networks Services pointing at a dataplane interface needs a route, NAT, and a security rule, or it times out silently.
  - Proxy that only permits `CONNECT` to 443 breaks the 444 endpoint.
  - Region caveat: `lic.lc.prod.**us**.cs...` is the Americas endpoint. Non-US tenants need the region-specific FQDNs.
  - Triage commands: `request certificate fetch`, `request logging-service-forwarding status`, `show system state filter cfg.lcaas*`
  - **Needs from Sean:** the actual root causes from the 2026-09-29 case. It was a combination of factors, not just the port. Get the full list before writing, so the entry reflects what really happened rather than only the textbook cause.
  - Cross-check: `docs/scm-onboarding/index.html:618` already lists the FQDN and port in a table but never links the log signature to it. Consider adding the same troubleshooting entry there.

### Blocked on live deployments

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
