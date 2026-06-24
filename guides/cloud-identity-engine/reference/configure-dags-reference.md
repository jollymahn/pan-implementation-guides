# Reference Sheet: Phase 3 — Configure Dynamic Address Groups

## Provider Versions
- PAN-OS: 11.1 (current recommended). DAG support available PAN-OS 6.0+. Source: https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy
- CIE: requires PAN-OS 10.1+ for IP-tag redistribution from CIE to firewalls. Source: architecture overview section of cie-cloud-tags.html
- SCM: Strata Cloud Manager. DAG creation at Manage > Configuration > NGFW and Prisma Access > Objects > Address Groups. Source: https://docs.paloaltonetworks.com/cloud-management

## Tag Format (CIE IP Tag Cloud Connection)
Tags registered by CIE use cloud-provider-prefixed dot notation:
- AWS: `aws.tag.<key>.<value>` — e.g., `aws.tag.env.prod`, `aws.tag.tier.web`
- Azure: `azure.tag.<key>.<value>` — e.g., `azure.tag.env.prod`, `azure.tag.tier.db`
- GCP: `gcp.label.<key>.<value>` — e.g., `gcp.label.env.prod`, `gcp.label.tier.app`
- Azure service tags: `azure.svc-tag.<service>` — e.g., `azure.svc-tag.Storage`
- Azure predefined attributes: `azure.<attribute>.<value>` — e.g., `azure.vmname.webserver-01`, `azure.resourcegroup.prod-rg`

Source: Architecture Overview "Supported Tag Types per Cloud" table in cie-cloud-tags.html; confirmed by https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy

## DAG Match Criteria Syntax
- Syntax: single-quoted tag strings connected by boolean operators
- Format: `'<tag>'` — e.g., `'aws.tag.env.prod'`
- Boolean operators: `and`, `or` (lowercase)
- Negation (`not`): **NOT supported** per Panorama/Firewall Web Help and PAN-OS admin guide. The Panorama-Web-Help states: "Define the Match criteria using the AND or OR operators. Negation is not supported."
- Operator precedence: `and` binds tighter than `or` (standard boolean precedence). Use parentheses for explicit grouping in complex expressions.
- Examples:
  - Single tag: `'aws.tag.env.prod'`
  - AND: `'aws.tag.env.prod' and 'aws.tag.tier.web'`
  - OR: `'aws.tag.env.prod' or 'aws.tag.env.staging'`
  - Mixed: `'aws.tag.env.prod' and 'aws.tag.tier.web' or 'aws.tag.tier.app'` — matches `(env.prod AND tier.web) OR tier.app`

Source: Panorama-Web-Help/docs/objects/objects-address-groups.md; https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy

## UI Navigation Paths

### Panorama
- Path: Objects > Address Groups > Add
- Fields: Name (63 chars max, case-sensitive), Description (1023 chars max), Type: Dynamic, Match (Add Match Criteria button)
- Scope: can be per-device-group or Shared
- "Disable Override" option available for Panorama shared objects
- After creation: commit to Panorama, then push to device groups
- View members: Objects > Address Groups > click DAG row > Addresses column > "More..." link
Source: Panorama-Web-Help/docs/objects/objects-address-groups.md

### SCM (Strata Cloud Manager)
- Path: Manage > Configuration > NGFW and Prisma Access > Objects > Address Groups
- Alternative: Manage > Objects > Address Groups (shortcut)
- DAG creation: Add > Type: Dynamic > match criteria with "Tags from CIE" tab
- SCM provides a "Tags from CIE" tab in the match criteria selector that shows CIE-registered tags
- Folder scope applies (DAGs inherit through folder hierarchy)
- Push configuration after creating DAGs
Source: https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection (step 11)

### Firewall Direct (Web UI)
- Path: Objects > Address Groups > Add
- Fields: Name, Description, Type: Dynamic, Match criteria
- Match criteria: Add Match Criteria > select And/Or operator > select tags from list
- Tag list populates from registered-IP table (must have IP-tag mappings already registered)
- Commit required after creation
- View members: Objects > Address Groups > Addresses column > "More..." link
Source: Firewall-Web-Help/docs/objects/objects-address-groups.md; GCP DAG use case doc

## CLI Commands

### View all DAGs and their members
```
show object dynamic-address-group all
```

### View specific DAG membership
```
show object dynamic-address-group name <dag-name>
```

### View all registered IPs
```
show object registered-ip all
```

### View registered IPs for a specific tag
```
show object registered-ip tag <tag-name>
```

### Clear all registered IPs (destructive — removes all dynamic registrations)
```
debug object registered-ip clear all
```
Note: requires firewall reboot after running.

Source: https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy; pan-docs-reference AI runtime security k8s use case doc

## Registered IP Limits (per firewall model)
| Model | Max Registered IPs |
|---|---|
| M-Series, Panorama VA | 500,000 |
| PA-5400 (except PA-5450), PA-5200, VM-7000 SMC-B | 500,000 |
| VM-500, VM-700 | 300,000 |
| PA-3430, PA-3440, PA-3200, VM-300 | 200,000 |
| PA-3410, PA-3420 | 150,000 |
| PA-7000, PA-5450, PA-450, PA-460 | 100,000 |
| PA-440 | 50,000 |
| PA-850, VM-100 | 2,500 |
| PA-820, PA-410, PA-220, VM-50 | 1,000 |

Note: An IP set (range or subnet) counts as a single registered IP.
Source: https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy

## Behavioral Facts
1. DAG membership is dynamic — IPs are added/removed automatically as tags are registered/unregistered.
2. DAGs evaluate match criteria against the registered-IP tag table, not against PAN-OS static tags.
3. Tags from CIE are registered dynamically; they appear in the registered-IP table alongside tags from VM Monitoring, XML API, and other sources.
4. A single IP can carry up to 32 tags.
5. Match criteria tag names are case-sensitive.
6. Static address objects with matching tags can also appear in dynamic address groups.
7. DAG membership updates happen in near-real-time as IP-tag registrations change.
8. Negation (NOT operator) is NOT supported in DAG match criteria per the PAN-OS admin guide and Web Help.

## Known Gotchas
1. **Negation not supported**: The phase_spec mentions `not` operator, but PAN-OS documentation explicitly states negation is not supported in DAG match criteria. The guide must clarify this limitation clearly.
2. **Tag list empty on first DAG creation**: If CIE tag redistribution hasn't completed or segment assignment is wrong, the match criteria tag list appears empty. Verify registered-IP table population before creating DAGs.
3. **Cloud-prefixed tags**: Users unfamiliar with CIE may try `'env.prod'` instead of `'aws.tag.env.prod'`. The cloud provider prefix is mandatory.
4. **Cross-cloud DAGs**: A single DAG can match tags from multiple clouds by using `or` (e.g., `'aws.tag.env.prod' or 'azure.tag.env.prod'`), but this requires deliberate tag naming alignment across clouds.
5. **Commit required**: DAG definition changes require commit (firewall) or push (Panorama/SCM) before taking effect.
6. **Name limit**: 63 characters max for DAG name. Case-sensitive.
