# Phase 5: End-to-End Verification — Reference Sheet

## CLI Commands (PAN-OS operational mode)

| Command | Purpose | Source |
|---|---|---|
| `show object registered-ip all` | List all IP-tag registrations on the firewall | [PAN-OS Admin Guide: Register IP Addresses and Tags Dynamically](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/register-ip-addresses-and-tags-dynamically); confirmed in [AI Runtime Security: Harvesting IP Tags](https://docs.paloaltonetworks.com/ai-runtime-security/administration/use-case-harvesting-ip-tags-k8s-clusters) |
| `show object registered-ip tag <tag-name>` | Filter registered IPs by a specific tag name (e.g., `aws.tag.env.prod`) | PAN-OS CLI reference |
| `show object dynamic-address-group all` | List all DAGs and their current member counts | PAN-OS CLI reference |
| `show object dynamic-address-group name <dag-name>` | Show members of a specific DAG | PAN-OS CLI reference |
| `test security-policy-match source <src-ip> destination <dst-ip> protocol <proto-num> destination-port <port>` | Simulate traffic and show which security rule matches | [Firewall Web Help: Device > Troubleshooting > Security Policy Match](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-web-interface-help/device/device-troubleshooting#security-policy-match) |
| `show running security-policy` | Show active committed security rules | PAN-OS CLI reference |

## test security-policy-match parameters

From Firewall Web Help (`Device > Troubleshooting > Security Policy Match`):

| Field | Description |
|---|---|
| From | Source zone |
| To | Destination zone |
| Source | Source IP address |
| Destination | Destination IP address |
| Destination Port | Port number |
| Protocol | IP protocol number (0-255; TCP=6, UDP=17, ICMP=1) |
| Application | Application name (optional) |
| Category | URL category (optional) |
| Source User | Source user (optional) |
| Show all potential match rules until first allow rule | When enabled, shows all potential matches, not just the first |

## CIE Dashboard Verification Paths

| Check | Navigation Path | Source |
|---|---|---|
| Tag sync status | `User Context` > `IP-Tag Collection` > `Monitor & Status` tab > click connection name | [Configure an IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection) |
| View IP Tags | `User Context` > `Mappings and Tags` > `IP Tags` | [View Data Collected by Cloud Identity Engine](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/manage-the-cloud-identity-engine/view-data-collected-by-cloud-identity-engine) |
| Tag-to-IP lookup | Monitor & Status > click config name > `Tag To IP` tab | Same as above |
| IP-to-Tag lookup | Monitor & Status > click config name > `IP To Tag` tab | Same as above |
| VPC view (AWS) | Monitor & Status > click config name > `VPC` tab | Same as above |

## Behavioral Facts

1. **Registered-IP output format**: Output shows `registered IP` column and `Tags` column. IPs marked with `*` indicate dynamically registered entries (from CIE or other sources). Source: AI Runtime Security docs, confirmed in PAN-OS CLI.
2. **DAG membership is real-time**: DAG membership updates automatically when IP-tag registrations change. No commit is required for membership changes. Source: [PAN-OS Admin Guide: Use Dynamic Address Groups in Policy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy).
3. **CIE incremental sync**: CIE only transfers new or modified mappings each poll cycle. A `Full Sync` can be triggered manually. Source: [Configure an IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection).
4. **Polling interval range**: 60-1800 seconds, default 60. Source: CIE IP Tag Cloud Connection docs.
5. **Tag format**: Cloud tags use provider prefix dot notation: `aws.tag.<key>.<value>`, `azure.tag.<key>.<value>`, `gcp.label.<key>.<value>`. Source: CIE docs.
6. **Traffic log filter by rule name**: In `Monitor` > `Logs` > `Traffic`, filter by `( rule eq '<rule-name>' )` to show only hits for a specific security rule. Source: PAN-OS Admin Guide.
7. **test security-policy-match requires zone**: The From and To (zone) fields are required for the policy match test. Source: Firewall Web Help.
8. **Protocol numbers**: TCP = 6, UDP = 17, ICMP = 1. Standard IANA protocol numbers.

## Known Gotchas

1. **Tag name case sensitivity**: Tag names in `show object registered-ip tag <name>` and DAG match criteria are case-sensitive. `aws.tag.Env.Prod` is different from `aws.tag.env.prod`.
2. **Empty DAG after tag change**: After adding/changing a cloud tag, the IP does not appear in the DAG until CIE completes its next poll cycle and distributes the mapping to the firewall. The delay is bounded by the polling interval.
3. **test security-policy-match does not generate traffic**: The command simulates a policy lookup; it does not send actual packets. It does not test NAT, routing, or dataplane forwarding.
4. **Panorama CLI for managed firewalls**: On Panorama, prefix commands with `debug device-server execute-command <serial> <command>` to run operational CLI on a managed firewall, or SSH directly to the firewall.
5. **Monitor > Logs > Traffic filter syntax**: Use `( rule eq 'rule-name' )` with parentheses and single quotes around the rule name.
