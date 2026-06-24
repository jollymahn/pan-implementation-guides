# Reference Sheet: Phase 4 — Build Tag-Based Security Policy

## Provider Versions

| Product | Version | Source |
|---|---|---|
| PAN-OS | 11.1 | https://docs.paloaltonetworks.com/pan-os/11-1 |
| Panorama | 11.1 | https://docs.paloaltonetworks.com/panorama/11-1 |
| Iron Skillet | panos_v11.0 branch | https://github.com/PaloAltoNetworks/iron-skillet/tree/panos_v11.0 |
| Strata Cloud Manager | Current SaaS | https://docs.paloaltonetworks.com/cloud-management |

## UI Navigation Paths

| Platform | Path to Security Policy | Source |
|---|---|---|
| Panorama | Policies > Security > Pre Rules / Post Rules | Panorama-Web-Help/docs/policies/policies-security.md |
| SCM | Manage > Configuration > NGFW and Prisma Access > Security Services > Security Policy | https://docs.paloaltonetworks.com/cloud-management |
| Firewall (Web UI) | Policies > Security | Firewall-Web-Help/docs/policies/policies-security.md |

## Security Rule Building Blocks (UI Tab Order)

From Panorama-Web-Help/docs/policies/building-blocks-in-a-security-policy-rule.md:

1. **General** tab: Name, Rule Type (universal/intrazone/interzone), Description, Tags
2. **Source** tab: Source Zone, Source Address (supports Address Groups including Dynamic), Source User, Source Device
3. **Destination** tab: Destination Zone, Destination Address (supports Address Groups including Dynamic), Destination Device
4. **Application** tab: Application(s)
5. **Service/URL Category** tab: Service (any / application-default / specific), URL Category
6. **Actions** tab: Action (Allow/Deny/Drop/Reset), Profile Setting (individual profiles or Group), Log Setting (Log at Session Start/End, Log Forwarding Profile), Schedule, QoS Marking

## DAG in Security Policy — Behavioral Facts

1. **DAGs as Source/Destination Address**: In the Source or Destination Address field of a security rule, select "Address Group" from the dropdown. DAGs appear alongside static address groups. Source: Panorama-Web-Help building-blocks doc — "Add source addresses, address groups, or regions."
2. **DAG membership is dynamic**: IP-to-tag mappings from CIE update DAG membership automatically. No policy edit or commit required when workload IPs change. Source: https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy
3. **Rule evaluation uses resolved IPs**: The firewall resolves DAGs to their current member IPs at match time. The policy rule itself references the DAG name, not individual IPs.
4. **Panorama Pre-Rules vs Post-Rules**: Pre-rules are evaluated before local firewall rules; post-rules are evaluated after. For centralized policy enforcement, use pre-rules for mandatory security policy and post-rules for catch-all deny rules. Source: Panorama admin guide.
5. **SCM Security Rules**: SCM presents a flat rule list. Rules pushed to firewalls via SCM appear as pre-rules on the managed firewall.

## Magic 'default' Keyword

- When a Log Forwarding profile is named exactly `default` (lowercase, case-sensitive), PAN-OS automatically attaches it to all newly created security rules.
- When a Security Profile Group is named exactly `default` (lowercase, case-sensitive), PAN-OS automatically attaches it to all newly created security rules.
- This behavior is **not retroactive** — existing rules are not modified.
- Source: PAN-OS Admin Guide, Iron Skillet documentation

## Iron Skillet Security Profile Groups

- Repository: https://github.com/PaloAltoNetworks/iron-skillet/tree/panos_v11.0
- Provides day-1 best-practice security profiles: Antivirus, Anti-Spyware, Vulnerability Protection, URL Filtering, File Blocking, WildFire Analysis
- Profiles available in `panorama/snippets/` and `panos/snippets/`
- Can be loaded via XML import or set commands
- Creates a Security Profile Group named `default` that auto-attaches to new rules

## Environment Isolation Pattern

- **Use case**: Prevent production workloads from communicating with development workloads (compliance, blast radius containment)
- **Implementation**: Two rules — dag-prod → dag-dev = Deny, dag-dev → dag-prod = Deny
- **Why**: Cloud environments often share the same VPC/VNet. Tags are the only reliable differentiator between environments when IP ranges overlap or change frequently.

## Application Tier Segmentation Pattern

- **Use case**: Enforce 3-tier architecture (web → app → db) and prevent web tier from directly accessing database tier
- **Implementation**: Three rules:
  - dag-web-tier → dag-app-tier = Allow
  - dag-app-tier → dag-db-tier = Allow
  - dag-web-tier → dag-db-tier = Deny (must be higher priority than any allow-all rule)
- **Why**: Even if all tiers are in the same zone/subnet, tag-based segmentation enforces application-layer boundaries.

## Commit and Push

| Platform | Commit Process | Source |
|---|---|---|
| Panorama | Commit to Panorama, then Commit and Push to device groups | Panorama Admin Guide |
| SCM | Push Configuration from SCM to managed firewalls | SCM Admin Guide |
| Firewall | Commit (local commit only) | PAN-OS Admin Guide |

## CLI Verification Commands

| Command | Purpose | Source |
|---|---|---|
| `show object dynamic-address-group all` | List all DAGs and their resolved member IPs | PAN-OS CLI Reference |
| `test security-policy-match source <ip> destination <ip> protocol 6 destination-port 443` | Test which security rule matches given traffic parameters | PAN-OS CLI Reference |
| `show running security-policy` | Display the active security policy with resolved DAGs | PAN-OS CLI Reference |

## Known Gotchas

1. **Rule ordering matters**: Deny rules for environment isolation must be placed above any broad allow rules. Firewall evaluates rules top-to-bottom, first match wins.
2. **DAG must have members to match**: A security rule referencing an empty DAG (no IPs registered) will never match traffic. Verify DAG membership before testing rules.
3. **Commit required after rule creation**: Unlike DAG membership updates (which are dynamic), adding or modifying security rules requires a commit on the firewall or push from Panorama/SCM.
4. **Application field**: Use `any` for environment isolation deny rules (the goal is to block all communication, not specific apps). Use specific applications for tier segmentation allow rules where possible.
5. **Service field**: Use `application-default` for allow rules to prevent applications from running on non-standard ports. Use `any` for deny rules.
