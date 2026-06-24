# Reference Sheet: Phase 2 — Enable Tag Collection

## CIE IP Tag Cloud Connection Model

- Each cloud account/subscription/project gets its own IP Tag Cloud Connection in CIE.
- CIE uses two configuration objects per cloud account: a **Credential Configuration** (authentication) and a **Monitor Configuration** (what to collect and where to send it).
- Source: [Configure an IP Tag Cloud Connection](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/identify-users-and-devices-with-cie/redistribute-identification-information-from-ngfws-to-the-cloud/configure-an-ip-tag-cloud-connection)

## Capacity Limits

- Up to 60,000 IP-tag mappings per region per monitoring configuration at one time.
- CIE syncs only new or modified mappings each time.
- Up to 32,000 IP-tag mappings viewable per page in the CIE UI.
- Source: PAN docs IP Tag Cloud Connection page.

## Polling Interval

- Default: 60 seconds.
- Range: 60–1800 seconds (1 minute to 30 minutes).
- Source: PAN docs IP Tag Cloud Connection page, step 12.7.

## CIE Navigation Path

- **User Context > IP-Tag Collection** — main page for credential and monitor configs.
- **Credential Configuration tab** — where you add cloud provider credentials.
- **Monitor & Status tab** — where you create monitor configs and view sync status.
- Source: PAN docs IP Tag Cloud Connection page, steps 2–4.

## Connection States

- **Connected** — CIE has successfully established connection and can collect IP-tag mappings.
- **Partially connected** — Some regions/aspects connected, others not. Receives mappings only from connected sources.
- **Connection pending** — Connection established but sync not yet completed for one or more regions.
- **Not connected** — CIE could not establish connection with current configuration.
- Source: PAN docs IP Tag Cloud Connection page, step 12.

## AWS-Specific Facts

### IAM Permissions Required
- Minimum IAM policy actions for tag collection (derived from VM Monitoring permissions):
  - `ec2:DescribeInstances`
  - `ec2:DescribeNetworkInterfaces`
  - `ec2:DescribeVpcs`
  - `ec2:DescribeVpcEndpoints`
  - `ec2:DescribeSubnets`
  - `ec2:DescribeTags` (for tag-specific queries)
  - `ec2:DescribeRegions` (for multi-region discovery)
- Resource: `*` (EC2 Describe actions do not support resource-level restrictions).
- Source: [Set Up VM Monitoring on AWS](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-aws/about-aws-vm-monitoring/set-up-vm-monitoring-on-aws)

### Authentication Methods
- **Access Key ID + Secret Access Key** — direct IAM user credentials.
- **Role ARN** — cross-account role assumption. CIE assumes a role in the customer's AWS account.
- CIE provides CloudFormation Templates (CFTs) to automate prerequisite setup:
  - "Open CFT (Application Account Prerequisites)"
  - "Open CFT (Security Account Prerequisites)"
- For cross-account: configure application account prerequisites AND security account prerequisites, plus a Role ARN.
- Source: PAN docs IP Tag Cloud Connection page, step 6.

### Region Selection
- Can select All Regions or specific regions.
- Can select All VPCs or specific VPCs (must select regions first to see VPCs).
- Default region if none selected: `us-west-2`.
- Source: PAN docs IP Tag Cloud Connection page, step 12.5.

## Azure-Specific Facts

### Service Principal Permissions
- Grant read permissions as described in the Azure Monitoring section of the VM-Series documentation.
- Required: Reader role at subscription scope.
- Source: [VM-Series on Azure Service Principal Permissions](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/set-up-the-vm-series-firewall-on-azure/about-the-vm-series-firewall-on-azure/vm-series-on-azure-service-principal-permissions)

### Authentication Fields
- **Client ID** (Application ID from App Registration)
- **Client Secret**
- **Tenant ID**
- **Subscription ID**
- Source: PAN docs IP Tag Cloud Connection page, step 7.
- Azure docs for obtaining these: [Get tenant and app ID values for signing in](https://learn.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-tenant-and-app-id-values-for-signing-in) and [Get subscription and tenant ID](https://learn.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id).

### Azure-Specific Features
- Option to **Fetch Service Tags** — Azure Service Tags represent groups of IP address prefixes for Azure services (e.g., all storage IPs).
- Source: PAN docs IP Tag Cloud Connection page, step 12.6.

### Azure Tag Attribute Format (SCM/Cloud NGFW)
- VM Name: `azure.vm_name`
- VM Size: `azure.vm_size`
- OS Type: `azure.os_type`
- Subnet Name: `azure.subnet_name`
- VNET Name: `azure.vnet_name`
- Azure Region: `azure.region`
- Resource Group: `azure.resource_group`
- User Tags: `azure.tag.<key>.<value>` (up to 10 custom tags)
- Source: [Tag-based Policies in SCM (Cloud NGFW Azure)](https://docs.paloaltonetworks.com/cloud-ngfw-azure/administration/protect-traffic-with-cloud-ngfw-for-azure/cloud-ngfw-for-azure-strata-cloud-manager-policy-management/cloud-ip-tags-for-cloud-ngfw-for-azure-in-strata-cloud-manager)

## GCP-Specific Facts

### Service Account Permissions
- Create a service account in the Google Cloud console.
- Assign **Compute Viewer** (`roles/compute.viewer`) role at the project level (minimum for reading instance metadata and tags).
- Source: [Configure VM Monitoring (GCP)](https://docs.paloaltonetworks.com/vm-series/9-1/vm-series-deployment/set-up-the-vm-series-firewall-on-google-cloud-platform/vm-monitoring-with-the-google-cloud-platform-plugin/configure-vm-monitoring)

### Authentication
- Generate a JSON key file for the service account.
- Upload the JSON key file in CIE.
- A service account can only be used for one credential configuration.
- Source: PAN docs IP Tag Cloud Connection page, step 8.

### GCP Tag Types
- GCP has two distinct tagging mechanisms:
  - **Labels** — key:value metadata on resources (similar to AWS tags and Azure tags).
  - **Network tags** — simple string tags on VM instances that control firewall rules and routing.
- Both are collected by CIE.
- Source: GCP documentation.

### Region Selection
- Can optionally select a region. Default: `us-west-2`.
- One region per instance.
- Source: PAN docs IP Tag Cloud Connection page, step 8.3.

## Viewing Collected Data

- **User Context > Mappings and Tags > IP Tags** — view IP-to-tag mappings by IP address or by Tag.
- **IP-Tag Collection page > Monitor & Status > [config name]** — view connection details, VPC tab (AWS), Tag To IP tab, IP To Tag tab.
- Source: [View Data Collected by CIE](https://docs.paloaltonetworks.com/identity/cloud-identity-engine/manage-the-cloud-identity-engine/view-data-collected-by-cloud-identity-engine)

## Gotchas

1. **Test Connection can fail but config can still be submitted** — CIE allows saving even if Test Connection fails. Status will show "Not connected" until issues are resolved.
2. **Segment cannot be changed after submission** — if you need to change the segment for a monitor configuration, you must delete and recreate it.
3. **Full Sync** — available for manual trigger to force re-sync. Useful for resolving discrepancies.
4. **Deletion removes all mappings** — deleting an IP-Tag Collection configuration removes all IP-tag mappings from CIE and from any firewalls using them.
5. **GCP one-credential-per-service-account** — cannot reuse a single JSON key file for multiple credential configurations.
6. **Region-specific latency** — selecting many regions increases harvesting time. Best practice: select only regions with active workloads.
