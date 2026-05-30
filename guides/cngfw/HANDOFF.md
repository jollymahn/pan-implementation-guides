# Cloud NGFW Guide — Handoff (2026-05-29 — Session 4)

## Status: Authoring complete — blocked on live deployments for final verification

## What Was Done This Session

### 1. Full Fact-Check: Azure Native Guide (`cloud-ngfw-azure-native.html`, 3,746 lines)
Cross-referenced all 9 phases + 2 reference sections against 15+ PAN source docs. Applied ~19 fixes:

**Key fixes:**
- DNS Security routed to local rulestack (was incorrectly pointing to SCM)
- Default traffic behavior after SCM switch: removed "allow-all" claim, replaced with "verify immediately"
- VNet/vWAN resource lists corrected per source docs
- SCM limitations callout added before the irreversible switch (Step 4.1)
- Step 5.1 DAG row updated for PAN-OS 11.2+ IP Tag Collection
- Step 5.2 clarified SCM address objects vs native prefix lists
- Step 5.4 added File Blocking profile
- Step 6.1 added 3 missing tag attributes (os_publisher, os_offer, os_sku)
- Step 8.2 added Cloud NGFW Log Settings path as Option A
- SCM Limitations table expanded with DNS Security, TLS Decryption, behavioral differences rows
- Migration appendix: added terraform import step + SCM role prereq

### 2. Full Fact-Check: Combined Guide (`cloud-ngfw-deployment.html`, 5,390 lines)
Cross-referenced AWS (7 phases) and Azure (7 phases) against source docs.

**Key fixes:**
- Azure Panorama version: 10.2.4 → 11.2 (required since Jan 2026), plugin 5.0 → 5.2.3, PAN-OS 12.0/12.1 not supported
- SCM security rules: zones changed from private/public → any (with explanatory callout)
- Added SCM prerequisite (deploy local rulestack first) + limitations callout
- Panorama zones: "exactly two" → "three: private, public, loopback"
- Added Panorama port requirements (3978, 28443, 28270)

### 3. Terraform Variable Validation (both guides vs real SWFW modules)
Compared guide tfvars against actual `example.tfvars` and `variables.tf` from:
- AWS: `cloudngfw_combined_design`
- Azure: `cloudngfw_centralized_vnet`, `cloudngfw_centralized_single_vwan`, `cloudngfw_distributed`

**Key fixes:**
- Azure provider: `azurerm ~> 3.0` → `>= 4.0` (modules require AzureRM v4)
- Removed phantom `PaloAltoNetworks/paloaltonetworks` provider
- Distributed model (4C): DNAT NSG moved from vms subnet to public subnet; added missing app1/app2 NSGs
- AWS: fixed misleading rulestack name instruction

### 4. Draw.io Diagram Skill Created (`/drawio-diagram`)
New skill at `/Users/sjolly/.claude/skills/drawio-diagram/` with:
- SKILL.md with workflow, diagram types, file conventions, quality checklist
- `references/style-guide.md` — complete XML patterns for every component (Cloud NGFW, VNet, subnets, VMs, route tables, arrows, step badges, swim lanes, etc.)
- PAN brand color palette baked in

### 5. Seven Diagrams Generated for Azure Native Guide
All saved to `docs/guides/cngfw/diagrams/azure-native/`:

| Diagram | File | Guide Location |
|---------|------|---------------|
| VNet hub-and-spoke overview | `vnet-hub-spoke-overview.drawio` | Phase 1, Step 1.5 |
| vWAN architecture overview | `vwan-overview.drawio` | Phase 1, Step 1.5 |
| DNS Proxy + DNS Security flow | `dns-proxy-flow.drawio` | Phase 3, Step 3.4 |
| Management boundary (3 lanes) | `management-boundary.drawio` | Phase 4 intro |
| Outbound traffic flow (SNAT) | `vnet-outbound-flow.drawio` | Phase 9, Step 9.1 |
| Inbound traffic flow (DNAT) | `vnet-inbound-flow.drawio` | Phase 9, Step 9.2 |
| East-west traffic flow | `vnet-east-west-flow.drawio` | Phase 9, Step 9.3 |

All wired into the HTML as `<img src="diagrams/azure-native/*.png">` tags. **PNG export needed** — run:
```bash
brew install --cask drawio
for f in docs/guides/cngfw/diagrams/azure-native/*.drawio; do
  drawio -x -f png -o "${f%.drawio}.png" "$f"
done
```

### Management Boundary (now consistent across both guides)
- **SCM** → security policy, address objects, profile groups, IP Tag Collection, DAGs, URL Filtering
- **Azure portal (local rulestack)** → NAT, DNS Proxy, DNS Security, TLS Decryption, Log Settings
- **Panorama** → advanced DNS Security, XFF, cloud certificates; supports private/public/loopback zones
- **SCM zones** must be `any`; **Panorama zones** support private/public/loopback

### Session 3 Updates
- TODO.md cleaned up — marked all completed diagram/content items, added live verification checklist
- Cross-links added: "Managed alternative: Cloud NGFW" callout in both AWS and Azure VM-Series guides
- Confirmed all AWS and Azure diagrams are already wired into combined guide (prior TODO was stale)

### Session 4 Updates
- **Verification gap fixed** — added 3 verification blocks to Azure architecture model overviews (Centralized VNet, vWAN, Distributed). Combined guide now has 102 verifications for 107 collapsibles; remaining 5 are nested diagram viewers that correctly have no verification.
- **PNG export complete** — installed draw.io CLI (`brew install --cask drawio`), exported all 6 missing PNGs in `diagrams/azure-native/`. All 7 `.drawio` files now have `.png` counterparts.
- **Pipeline fix** — added auto-export capability to `/guides/verify-guide` check 9 (Diagram Completeness). When orphaned `.drawio` files are detected, the check now offers to batch-export PNGs if draw.io CLI is available.

## What's Left (all blocked on live deployments)

1. **SCM DAG nav path** — verify `Objects > Address Groups` vs `Policies > Objects > Address Groups` in SCM UI
2. **Match criteria format** — verify `vnet_name` vs `vnet-name` for DAG match expressions in SCM
3. **KQL table names** — verify `NGFWTrafficLogs`, `NGFWThreatLogs` in Azure Log Analytics
4. **Live screenshots** — capture key verification points on both AWS and Azure
5. **Troubleshooting validation** — verify troubleshooting steps against actual error scenarios

## File Inventory

| File | Lines | Status |
|---|---|---|
| `cloud-ngfw-deployment.html` | 5,390 | Fact-checked + TF validated + all diagrams wired + 102/107 verifications |
| `cloud-ngfw-azure-native.html` | 3,746 | Fact-checked + all diagrams exported + 49/47 verifications |
| `diagrams/azure-native/` | 7 .drawio + 7 .png | All exported |
| `diagrams/aws/` | 22 PNGs | All wired into combined guide |
| `diagrams/azure/` | 18 PNGs + 6 .drawio | All wired into combined guide |
| `HANDOFF.md` | This file |
| `TODO.md` | Remaining work items |
