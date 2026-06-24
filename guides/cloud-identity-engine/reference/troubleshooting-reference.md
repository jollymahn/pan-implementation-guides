# Troubleshooting Reference Sheet — CIE Cloud Tags

## Provider / Product Versions

| Product | Version | Source |
|---|---|---|
| PAN-OS (User Context support) | 11.0+ | [Cloud Identity User Context (PAN-OS)](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/cloud-identity-engine-user-context/cloud-identity-user-cointext-pan-os) |
| CIE IP-Tag Collection polling interval | 60–1800 seconds (default 60) | [Configure an IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection) |
| CIE IP-tag mapping limit per region | 60,000 per sync | Same source as above |
| CIE Update Interval on firewall | 5–1440 minutes (default 60) | [Configure CIE as Mapping Source](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-the-cloud-identity-engine-as-a-mapping-source/configure-the-cloud-identity-engine-as-a-mapping-source-on-the-firewall) |

## CIE Connection States

| State | Meaning | Source |
|---|---|---|
| Connected | CIE successfully established connection to CSP and collects IP-tag mappings | configure-an-ip-tag-cloud-connection.md |
| Partially connected | CIE connected to some regions/aspects but not all; receives partial mappings | Same |
| Connection pending | Connection established but sync not yet completed for one or more regions | Same |
| Not connected | CIE could not establish connection with the CSP using current config | Same |

## CLI Commands for Troubleshooting

| Command | Purpose | Source |
|---|---|---|
| `show user cloud-identity-engine status` | Show CIE connection status on the firewall | PAN-OS CLI reference (User-ID) |
| `show object registered-ip all` | List all dynamically registered IP-tag mappings on the firewall | PAN-OS admin guide (DAG) |
| `show object registered-ip tag <name>` | Show IPs registered under a specific tag | PAN-OS admin guide (DAG) |
| `show object dynamic-address-group all` | Show all DAGs and their current member count | PAN-OS admin guide (DAG) |
| `show object dynamic-address-group name <name>` | Show members of a specific DAG | PAN-OS admin guide (DAG) |
| `test security-policy-match` | Test which security rule matches given traffic parameters | PAN-OS admin guide (Security Policy) |
| `debug dataplane show registered-ip-statistics` | Show registered IP statistics on the dataplane | PAN-OS CLI reference (debug) |

## Behavioral Facts

1. **CIE tag format**: CIE registers tags on the firewall using the format `cie.<key>.<value>` (prefixed with `cie.`). DAG match criteria must use the CIE-prefixed format, not the raw cloud tag key-value pair.
   - Source: CIE IP-Tag Cloud Connection docs + DAG docs

2. **DAG match criteria delimiter**: DAG match criteria use the `and`/`or` operators with single-quoted tag names. Example: `'cie.Environment.Production' and 'cie.Team.Engineering'`. Incorrect delimiters (commas, semicolons) cause syntax errors.
   - Source: PAN-OS DAG admin guide

3. **DAG match criteria case sensitivity**: Tag match criteria are case-sensitive. `'cie.environment.production'` does not match `'cie.Environment.Production'`.
   - Source: PAN-OS DAG admin guide

4. **Empty DAG = rule never matches**: If a DAG has zero members, any security rule referencing it as source or destination address will never match traffic. The rule exists but is effectively dormant.
   - Source: PAN-OS security policy behavior

5. **IP Tag Collection zone requirement**: For DAGs populated by dynamically registered IPs, the zone attached to the interface must have IP Tag Collection enabled (under Network > Zones > Zone > User Identification > Enable IP Tag Collection).
   - Source: PAN-OS admin guide — DAG configuration

6. **Segment/redistribution requirement**: Tags sync from CIE to the firewall only when (a) a segment is configured in CIE with IP Tag Mappings enabled, and (b) the firewall is assigned to that segment.
   - Source: cloud-identity-user-cointext-pan-os.md, configure-a-redistribution-profile-in-strata-cloud-manager.md

7. **CIE connectivity FQDNs**: The firewall communicates with CIE via the User Context Cloud Service. This requires outbound connectivity from the firewall to Palo Alto Networks cloud endpoints.
   - Source: cloud-identity-user-cointext-pan-os.md (PAN-OS Edge Service Settings)

8. **CIE service status page**: Check https://status.paloaltonetworks.com/ for CIE service outages.
   - Source: cloud-identity-engine-troubleshooting-checklist.md

## AWS-Specific Facts

1. **IAM permissions required**: `ec2:DescribeTags`, `ec2:DescribeInstances`, `ec2:DescribeRegions`, `ec2:DescribeVpcs` at minimum. CIE uses STS AssumeRole for cross-account access.
   - Source: configure-an-ip-tag-cloud-connection.md (references VM-Series IAM roles docs)

2. **Cross-account role**: Requires trust policy allowing CIE's AWS account to assume the role, plus an External ID matching the CIE configuration.
   - Source: AWS IAM cross-account role docs referenced from CIE docs

3. **Region filtering**: Can filter to specific regions or "All Regions" in the Monitor Configuration. If no regions selected, only default region is polled.
   - Source: configure-an-ip-tag-cloud-connection.md

4. **Access Key + Secret Access Key**: Required for the Credential Configuration. CloudFormation templates available for Application Account and Security Account prerequisites.
   - Source: configure-an-ip-tag-cloud-connection.md

## Azure-Specific Facts

1. **Service principal credentials**: Client ID, Client Secret, Tenant ID, Subscription ID required. Client Secrets have expiration dates.
   - Source: configure-an-ip-tag-cloud-connection.md

2. **Reader role**: The service principal needs Reader role on all target subscriptions. Missing role = no tags from that subscription.
   - Source: configure-an-ip-tag-cloud-connection.md (references VM-Series Azure permissions docs)

3. **Azure Service Tags**: Optional "Fetch Service Tags" feature to include Azure service tags (IP prefix groups for Azure services like Storage, SQL, etc.).
   - Source: configure-an-ip-tag-cloud-connection.md

## GCP-Specific Facts

1. **Service account key**: JSON key file uploaded to CIE. Keys can expire or be deleted from the GCP console.
   - Source: configure-an-ip-tag-cloud-connection.md

2. **Compute Engine API**: Must be enabled in the GCP project for CIE to read instance metadata and labels.
   - Source: configure-an-ip-tag-cloud-connection.md (references VM-Series GCP docs)

3. **Labels vs network tags**: GCP has two distinct tagging systems. "Labels" are key-value pairs on resources. "Network tags" are simple strings used for firewall rules. CIE collects labels, not network tags.
   - Source: GCP documentation + VM-Series GCP monitoring docs

4. **Region selection**: Optional; defaults to us-west-2 if not specified. One region per instance configuration.
   - Source: configure-an-ip-tag-cloud-connection.md

## Known Gotchas

1. **Polling interval vs Update Interval confusion**: CIE polls the CSP at the configured Polling Interval (60–1800s). The firewall pulls from CIE at the Update Interval (5–1440 min). Total delay = Polling Interval + Update Interval.
2. **Segment not assigned**: Even if CIE shows "Connected" and tags are visible in the CIE dashboard, tags do not flow to the firewall unless the firewall is assigned to a segment with IP Tag Mappings enabled.
3. **Commit required**: After configuring CIE as a mapping source on the firewall, a commit is required. Tags do not flow until the commit succeeds.
4. **Full Sync button**: In CIE IP-Tag Collection Monitor & Status, the "Full Sync" button forces re-sync of all mappings. Use when discrepancies exist.
5. **Deletion cascade**: Deleting an IP-Tag Collection configuration removes all associated IP-tag mappings from CIE and from any firewalls that received them.
