# Cloud NGFW Guide — TODO

## Remaining

### HIGH PRIORITY — address next session

- [ ] **Cloud NGFW for AWS logging: SLS requirement and Panorama onboarding** — The AWS guide covers the happy path in Step 7.5 but omits the two things customers actually ask about. Research is done and source-verified; this is a writing task, not a research task.

  **Gaps to close in `cloud-ngfw-aws.html`:**
  - Cloud NGFW for AWS has **no Log Collector path to Panorama**. Logs reach the Monitor and ACC tabs only through Strata Logging Service. PAN states it directly: if Panorama is not linked to SLS, logs are not forwarded to the Panorama console and are viewable only in CloudWatch, S3, or Kinesis. The guide never says this, and readers assume the Azure behavior.
  - The **native (no Panorama, no SCM) log destinations** are undocumented in the guide: S3 bucket, CloudWatch Log Group, or Kinesis Data Firehose. Names are baked into the onboarding CFT (CloudWatch and Firehose default to `PaloAltoCloudNGFW`, S3 has no default). The CFT only grants write permission; the service creates nothing, and there is no local log buffer, so a name mismatch loses logs silently.
  - **Panorama-to-SLS onboarding is missing entirely.** SLS states devices are not onboarded automatically on activation. Needs: device certificate, Device Associations (`Add Device` then `Associate Products` → Strata Logging Service), then SLS `Inventory > Panorama Appliances > Manage Panorama Inventory` with `Generate OTP`. Panorama with IoT enabled must go through Device Associations only.
  - **The identifier chain** (CSP account → TSG → SLS instance → Link ID) and its verification. Authoritative check: Cloud NGFW console → `Integrations` → click the **Link ID**; the Link Panorama window shows the SLS ID the tenant inherited. The tenant pulls SLS info from Panorama at link time and does not re-read it, so there is no SLS picker on the Cloud NGFW side.
  - **Tenant constraints:** one SLS instance per tenant, and the data region is pinned by whichever product is enabled first and cannot be edited afterwards. Source: `pan-docs-reference/docs/common-services/subscription-and-tenant-management/add-tenants.md:409-414` and `ai-runtime-security/activation-and-onboarding/activate-strata-logging-service.md:324`.
  - **Troubleshooting entries** to add: both `Failed to get TSG ID for Panorama <id>` variants (no TSG vs TSG without SCM/SLS); an existing subscriber that adds SLS after linking must unlink and relink; AWS Firewall Manager tenants cannot be unlinked without a support case.
  - **Version and plugin pins** (re-verify before publishing, these move each fleet release): Cloud Connector plugin exactly `3.0.1`, `3.0.2`+ unsupported, PAN-OS `11.1.x` ships `2.1.0-c98` which must be downgraded to `2.0.1`; AWS plugin `5.4.2`+, not `5.4.0`; Panorama `11.2.x` or `12.1.5`+, `12.2`+ unsupported.

  **Drafts already written** (outside the repo, in the `write/` workspace at `write/aws-questions/`):
  - `cngfw-aws-sls-panorama-logging.html` — quick reference, self-contained
  - `cngfw-aws-sls-panorama-guide.html` — full guide following `GUIDE-TEMPLATE.md` (7 phases, mgmt-tabs, 38 verification blocks), built standalone with `pan-guides.css` inlined. Pre-assembly source kept alongside as `.cngfw-guide-body.src.html`.
  - `scm-sls-tsg-requirements.md` — earlier TSG research from 2026-10-08, consistent with the above

  **Decision needed:** fold this into `cloud-ngfw-aws.html` as new sections, or publish the standalone guide as its own page. Publishing separately means a `GLOBAL_NAV_GROUPS` entry, a `CATALOG` card, and a `HUBS` card, and swapping the inlined assets back to the shared refs. Folding in keeps the self-contained charter intact and is probably right, since the reader is already in the AWS guide when the question arises.

  All 33 external links in the drafts verified 200 on 2026-10-12. Cloud NGFW for AWS source pages last updated 2026-09-25.

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
