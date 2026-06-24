# Reference Sheet: Architecture Overview (cie-cloud-tags.html)

## 1. Product Versions

- **Cloud Identity Engine**: cloud-hosted service, no version number; requires activation via Palo Alto Networks Customer Support Portal. Source: [CIE Overview](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/cloud-identity-engine-overview)
- **PAN-OS**: IP-tag redistribution supported on PAN-OS 10.1+. DAGs available since PAN-OS 6.1 but CIE integration requires 10.1+.
- **Panorama plugins (legacy VM Monitoring)**: Azure plugin v3.0+ for service tags, v3.2.0+ for 500 subscriptions; GCP plugin requires PAN-OS 9.0+. Source: [Azure VM Monitoring](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-azure/vm-monitoring-on-azure), [GCP VM Monitoring](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-google-cloud-platform/deploy-vm-series-on-gcp/enable-vm-monitoring-to-track-changes-in-google)

## 2. CIE IP Tag Cloud Connection — Behavioral Facts

- CIE collects IP address-to-tag information from AWS, Azure, and GCP cloud service providers. Source: [Configure IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection)
- Configuration is two-part: (1) Credential Configuration (cloud account credentials), (2) Monitor Configuration (region/VPC/project selection + segment assignment + polling interval). Source: same.
- Polling interval range: 60–1800 seconds, default 60 seconds. Source: same.
- Per-region limit: up to 60,000 IP-tag mappings from a cloud service per monitor configuration. Source: same.
- CIE syncs only new or modified mappings each time (incremental sync). Full Sync available manually. Source: same.
- Viewable limit: up to 32,000 IP-tag mappings per page in CIE UI. Source: same.
- Connection states: Connected, Partially connected, Connection pending, Not connected. Source: same.
- CIE is free; enforcement points (NGFW, Prisma Access) may require specific licenses. Source: [CIE Overview](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/cloud-identity-engine-overview)
- Segments: IP-tag mappings are shared to firewalls via segments. Select a segment when creating monitor configuration. Source: same.
- Works with NGFW and Prisma Access as consumers. Source: same.

## 3. Per-Cloud Tag Types

### AWS
- Resource tags on EC2 instances (key-value pairs)
- Credentials: Access Key ID + Secret Access Key, optionally Role ARN for cross-account
- Region/VPC filtering supported
- Source: [Configure IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection)

### Azure
- Resource tags on VMs (key-value pairs), also service tags (azure.svc-tag)
- Credentials: Client ID, Client Secret, Tenant ID, Subscription ID
- Option to Fetch Service Tags
- Predefined attributes: VM Name, OS Type, Region, Resource Group, VNET Name, Subnet Name, etc.
- Source: same + [Azure VM Monitoring attributes](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-azure/vm-monitoring-on-azure)

### GCP
- Labels (key-value pairs) and network tags (simple strings) on Compute Engine instances
- Credentials: Service account JSON key file
- Region/Project ID filtering supported
- Source: [Configure IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection) + [GCP VM Monitoring](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-google-cloud-platform/deploy-vm-series-on-gcp/enable-vm-monitoring-to-track-changes-in-google)

## 4. Legacy VM Monitoring — Comparison Facts

### Per-firewall approach
- Each firewall (or Panorama with per-cloud plugin) polls cloud APIs independently. Source: [GCP VM Monitoring](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-google-cloud-platform/deploy-vm-series-on-gcp/enable-vm-monitoring-to-track-changes-in-google)
- GCP: Configure on Device > VM Information Sources, up to 10 sources per firewall. Source: same.
- Azure: Requires Panorama plugin for Azure; polls via Service Principal + Monitoring Definitions + Notify Groups. Source: [Set Up Azure Plugin](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-azure/vm-monitoring-on-azure/set-up-vm-monitoring-on-azure)
- Azure plugin can push up to 8,000 IP-tag mappings per device group. Source: same.
- Azure plugin: max 100 subscriptions (500 with v3.2.0+), processing time scales linearly (100 subs = ~75 min). Source: same.
- Tag length limit: 127 characters; no non-ASCII special characters ({ or "). Source: [Azure VM Monitoring](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-azure/vm-monitoring-on-azure)
- Azure plugin: max 32 tags per VM (11 predefined + 21 user-defined, alphabetically sorted). Source: same.
- Each cloud requires its own Panorama plugin (Azure plugin, GCP plugin, AWS plugin). Source: various VM-Series docs.

### CIE advantages over VM Monitoring
- Single pane: one CIE configuration serves all connected firewalls via segments (hub-and-spoke). Source: [CIE Topology](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/cloud-identity-engine-overview/cloud-identity-engine-topology)
- Multi-cloud: AWS, Azure, GCP from one CIE interface (no per-cloud plugins). Source: [Configure IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection)
- No Panorama plugins required for tag collection. Source: implied by CIE being a cloud service.
- CIE is recommended for PAN-OS 10.1+ deployments. Source: PAN-OS admin guide (DAG/CIE integration docs).

## 5. DAG Flow Chain

1. Cloud resource has tag (e.g., AWS EC2 instance with tag `env=prod`)
2. CIE polls cloud provider API, discovers IP-tag mapping (e.g., `10.0.1.5 -> env.prod`)
3. CIE distributes IP-tag mapping to firewalls via segment
4. Firewall registers IP-tag pair in its registered-IP table
5. DAG match criteria evaluates registered tags (e.g., match criteria `'env.prod'`)
6. Matching IPs become members of the DAG
7. Security policy rule references the DAG as source or destination address
8. Traffic from/to those IPs matches the rule automatically

Source: [Use Dynamic Address Groups in Policy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy) + [Configure IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection)

## 6. Known Gotchas

- Tag format in match criteria uses dot notation, not colon: `azure.tag.env.prod`, not `env:prod`. Source: Azure VM Monitoring attributes table.
- AWS uses different format from Azure/GCP for tag names. Source: implied by per-cloud attribute tables.
- Deleting a CIE monitor configuration removes all IP-tag mappings from connected firewalls. Source: [Configure IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection)
- Segment selection is immutable after submit; must create new config to change segment. Source: same.
- SCM Cloud IP Tag config for CNGFW Azure supports only IP Tag data type currently (not User Tag, IP User, etc.). Source: [Cloud IP Tags for CNGFW Azure](https://docs.paloaltonetworks.com/cloud-ngfw-azure/administration/protect-traffic-with-cloud-ngfw-for-azure/cloud-ngfw-for-azure-strata-cloud-manager-policy-management/cloud-ip-tags-for-cloud-ngfw-for-azure-in-strata-cloud-manager)
