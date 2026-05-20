# Prisma AIRS: Cloud Deployment Guide

**Deployment-model-specific steps: from SCM wizard through verified firewall connectivity in AWS, Azure, and GCP**

> **Note: Guide Approach**
>
> This guide covers the **deployment-specific steps** for getting Prisma AIRS AI Runtime Firewall instances running in cloud environments. It assumes the reader has completed [Prerequisites](airs-network-intercept.md#phase-1-prerequisites), [License Activation](airs-network-intercept.md#phase-2-license-activation--foundation), and [Cloud Account Onboarding](airs-network-intercept.md#phase-3-cloud-account-onboarding--discovery) from the [Core Network Intercept Guide](airs-network-intercept.md).
>
> **Six deployment models** are documented as independent phases. Choose the one that matches your cloud, management platform, and operational requirements -- complete that phase, skip the others.
>
> **After deployment:** Return to the Core Guide [Phase 5: Security Configuration](airs-network-intercept.md#phase-5-security-configuration) to create AI Security Profiles, policy rules, and push configuration.

> **Warning: Complete the Core Guide First**
>
> Every deployment model requires a valid license, active Strata Logging Service, device certificate PIN, deployment profile, and onboarded cloud account. Complete [Phases 1-3 of the Core Guide](airs-network-intercept.md) before starting any phase below.


## Architecture Overview

Choose a deployment model based on your cloud provider, management platform, and operational requirements. Each model produces the same outcome -- one or more Prisma AIRS AI Runtime Firewall instances inline in your cloud network path -- but differs in automation level, cloud support, and management options.

### Deployment Model Comparison

| Model | Clouds | Management | FW Type | Who Runs TF? | Cloud Mesh? | AI + K8s? | Best For |
|---|---|---|---|---|---|---|---|
| **SCM Terraform Download** | AWS, Azure, GCP | SCM or Panorama | AIRS or VM-Series | You | No | Yes | Full infrastructure control |
| **Auto-Execute** | AWS, Azure | SCM only | AIRS only | SCM | Yes | Yes | Fastest deployment |
| **Panorama-Managed** | AWS, Azure, GCP | Panorama only | AIRS | You | No | Yes | Existing Panorama environments |
| **VM-Series from SCM** | AWS, Azure, GCP | SCM or Panorama | VM-Series only | You | No | No | Non-AI workloads (traditional NGFW) |
| **Private Cloud** | ESXi, KVM, OpenShift | SCM or Panorama | AIRS | N/A (ISO) | No | Yes | On-premises / private cloud |
| **Manual Bootstrap** | All | SCM or Panorama | AIRS | You | No | Yes | Brownfield environments |

> **Note: Decision Guide**
>
> - **Want the fastest deployment with zero Terraform?** -- [Phase 2: Auto-Execute](#phase-2-auto-execute-deployment) (AWS/Azure, SCM only)
> - **Need full control over infrastructure?** -- [Phase 1: SCM Terraform Download](#phase-1-scm-terraform-download)
> - **Already use Panorama for centralized management?** -- [Phase 3: Panorama-Managed](#phase-3-panorama-managed-deployment)
> - **Protecting non-AI workloads alongside AI traffic?** -- [Phase 4: VM-Series](#phase-4-vm-series-deployment)
> - **Deploying on-premises (ESXi/KVM)?** -- [Phase 5: Private Cloud](#phase-5-private-cloud-deployment)
> - **Existing infrastructure you cannot redeploy?** -- [Phase 6: Manual Bootstrap](#phase-6-manual-bootstrap)

### Traffic Type Support by Firewall Type

The firewall type determines which traffic can be inspected. Only Prisma AIRS AI Runtime Firewall supports AI, K8s, and cluster traffic.

| Traffic Type | Prisma AIRS Runtime FW | VM-Series |
|---|---|---|
| AI Traffic (App > AI Model) | Yes | No |
| Non-AI Traffic + namespaces (e.g., kube-system) | Yes | No |
| Cluster Traffic | Yes | No |
| Non-AI, non-cluster traffic | Yes | Yes |

> **Warning: VM-Series Cannot Inspect AI Traffic**
>
> Selecting any namespace in the SCM wizard disables the VM-Series option. Only Prisma AIRS AI Runtime Firewall can secure AI workloads and Kubernetes namespaces.

> **Success: Verification**
>
> Deployment model selected. Confirm the chosen model supports your target cloud provider, management platform, and traffic types before proceeding.


## Phase 1: SCM Terraform Download

The primary deployment path. Generate a Terraform template from the SCM wizard, download it, and apply it in your cloud environment. Supports AWS, Azure, and GCP with SCM or Panorama management.

### Step 1.1 -- Navigate to SCM AI Runtime Firewall

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com).
2. Navigate to `AI Security` > `AI Runtime Firewall`.
3. Click `Add Protections` (the `+` icon).

> **Success: Verification**
>
> The Firewall Deployment wizard opens with the cloud provider selection screen.

### Step 1.2 -- Select Cloud Provider and Traffic Streams

1. Select your **Cloud Service Provider** (AWS, Azure, or Google Cloud).
2. Click `Next`.
3. In **Firewall Placement**, select the traffic streams to inspect:
   - **AI queries and responses** -- application-to-AI-model traffic
   - **Inbound traffic to cloud applications** -- user-to-application traffic
   - **Outbound traffic from cloud applications** -- application-to-internet traffic
   - **Inter VPC/VNet communication** -- application-to-application traffic
   - **Select All Traffic** -- inspect all streams
4. Select **Download Terraform templates and execute on my own** as the deployment method.
5. Click `Next`.

> **Success: Verification**
>
> The wizard advances to the **Regions & Applications** screen with your selected cloud provider and traffic streams.

### Step 1.3 -- Select Region, Account, and Applications

1. Select your **cloud account** from the onboarded accounts list.
2. Select the **region** where applications will be protected.
3. In **Selected applications**, choose the applications to secure from the discovered list.

> **Note: Application Discovery**
>
> Available applications are determined by the application definition criteria configured during [cloud account onboarding](https://docs.paloaltonetworks.com/ai-runtime-security/activation-and-onboarding/onboard-and-activate-cloud-account-in-scm). If expected applications are missing, review the application definition settings in the Cloud Account Manager.

Cloud-specific configuration for application VPC/VNet connectivity:

#### AWS

4. For each application, configure the **GWLB Endpoint CIDR & Zone Pair**:
   - Select the **zone** for GWLB endpoint creation.
   - Enter the **CIDR IP address** of an available (unused) subnet within your application VPC.

> **Note: Finding Your VPC CIDR**
>
> In the [AWS Management Console](https://aws.amazon.com/console/), navigate to `VPC`, select your application VPC, and record the IPv4 CIDR range. The GWLB endpoint CIDR must fall within this range.

#### Azure

4. To add an undiscovered VNet, select the **Added vNet** tab:
   - Enter the **VNet Name** (from the [Azure portal](https://portal.azure.com/) > `Virtual Networks`).
   - Enter the **VNet CIDR**.
   - Enter the **Resource Group Name**.
   - Enter the **Cluster ID** (if applicable).

#### GCP

4. For each application, set the **Public IP address** on the External Load Balancer (ELB):
   - **Auto generate** -- assigns an ephemeral IP automatically.
   - **Input manually** -- enter a pre-created static IP. See [GCP Static External IP Addresses](https://cloud.google.com/compute/docs/ip-addresses/configure-static-external-ip-address).
5. To add an undiscovered VPC, select the **Undiscovered VPC(s)** tab:
   - Enter **VPC Name**, **VPC CIDRs**, optional **K8s pod CIDRs**, optional **K8s service CIDRs**, and **Cluster ID**.

> **Success: Verification**
>
> At least one application or VPC/VNet is selected with the correct region and zone configuration.

### Step 1.4 -- Configure Traffic Inspection

Traffic steering inspection is available when namespace-level applications are selected. This allows granular control over which CIDRs are inspected or bypassed.

1. Select a **namespace** from the applications list.
2. Configure traffic handling per namespace (limit: 10 CIDRs per cluster):
   - **Inspect certain CIDRs** -- only inspect traffic from specified subnet ranges.
   - **Bypass certain CIDRs** -- exclude traffic from specified subnet ranges.

> **Warning: Namespace vs. VPC Selection**
>
> When protecting traffic from namespaces, select **only the namespace** -- not its parent VPC. The same GWLB endpoint cannot be used for both VPC and namespace-level protection in the same zone. Selecting both causes deployment failure.

> **Note: Default Behavior**
>
> For container applications, all traffic to and from the applications is protected by default. Use traffic inspection options only when granular CIDR-level control is needed.

> **Success: Verification**
>
> Traffic inspection configuration shows the selected namespaces with inspect/bypass CIDRs applied (or left at default for full protection).

### Step 1.5 -- Configure Deployment Parameters

Configure the firewall type, instance count, zones, instance size, and scaling behavior.

1. In **Deployment type**, select `AI Runtime Security`.
   - Select `VM-Series` only if protecting non-AI, non-cluster traffic exclusively. See [Phase 4](#phase-4-vm-series-deployment).
2. Optionally enable **Auto-Deploy Security** (disabled by default).
3. Enter the **number of firewalls to deploy**.
4. **Select zones** from the available list. Firewall zones must cover all application zones selected in Step 1.3.
5. **Choose the instance type** for the security VM (minimum 4 vCPUs).
6. In **Firewall Scaling**, select `Static` or `Dynamic`.

> **Note: Zone Coverage**
>
> Firewall zones must include every availability zone used by your selected applications. For example, if App1 uses `us-west-2a` and `us-west-2c`, and App2 uses `us-west-2b`, the firewall deployment must include all three zones.

#### Dynamic Autoscaling Configuration

When `Dynamic` scaling is selected, configure the following additional parameters:

1. Set the **Number of Firewalls to Deploy** as a range (minimum to maximum).
2. Enter the **CloudWatch Namespace** (AWS) or equivalent metric namespace.
3. Set the **Update Interval** (1-60 minutes).
4. Select one or more **Autoscaling Metrics** and configure thresholds for scale-in and scale-out.
5. Click `Apply`.

| Metric | Description |
|---|---|
| `Dataplane CPU Utilization (%)` | Traffic load on the firewall dataplane |
| `Dataplane Packet Buffer Utilization (%)` | Buffer usage; prevents packet drops during traffic bursts |
| `panSessionConnectionsPerSecond` | New connection establish rate per second |
| `panSessionThroughputKbps` | Throughput in Kbps |
| `panSessionThroughputPps` | Packets per second |
| `Sessions Active` | Total active sessions in the flow lookup table |
| `Session Utilization (%)` | Combined TCP/UDP/ICMP/SSL session utilization |
| `SSLProxyUtilization (%)` | SSL forward proxy session utilization |

After traffic decreases and firewalls deactivate, the system automatically removes instances from inventory and returns licenses to the credit pool.

> **Success: Verification**
>
> Deployment parameters show `AI Runtime Security` as firewall type with the correct instance count, zones, instance type, and scaling configuration.

### Step 1.6 -- Configure IP Addressing

IP addressing differs by cloud provider. Configure the security VPC/VNet CIDR and transit/peering connectivity.

#### AWS

1. Enter the **CIDR for security VPC** -- an unused VPC CIDR range. Locate existing VPC CIDRs in the [AWS Console](https://aws.amazon.com/console/) > `VPC`.
2. In **Create transit gateway**:
   - **No** -- select an existing **TGW ID** from the dropdown (find it in `VPC Dashboard` > `Transit Gateways`).
   - **Yes** -- optionally enter the ASN for the new Transit Gateway. See [Create a Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/create-tgw.html).
3. Optionally enable **Cross-Zone load balancing** to distribute traffic evenly across availability zones.

#### Azure

1. Enter the **CIDR of Security VNet** -- an unused VNet address space. Locate existing VNet CIDRs in the [Azure portal](https://portal.azure.com/) > `Virtual Networks` > `Address space`.

#### GCP

1. Enter the **CIDR for Untrust VPC**.
2. Enter the **CIDR for Trust VPC**.
3. Enter the **CIDR for Management VPC**.

> **Success: Verification**
>
> IP addressing configuration shows non-overlapping CIDRs for the security VPC/VNet and transit/peering configuration appropriate for your cloud.

### Step 1.7 -- Configure Licensing

Enter the licensing parameters generated during [Phase 2 of the Core Guide](airs-network-intercept.md#phase-2-license-activation--foundation).

1. Select the **PAN-OS version** from the available list.
2. Enter the **Flex authentication code** -- the AUTH CODE from the [deployment profile](https://docs.paloaltonetworks.com/ai-runtime-security/activation-and-onboarding/create-an-ai-instance-deployment-profile-in-csp) created in the Customer Support Portal.
3. Enter the **Device Certificate PIN ID** and **PIN Value** generated during [Step 2.3 of the Core Guide](airs-network-intercept.md#step-23----generate-a-device-certificate).

> **Danger: PINs Expire**
>
> Registration PINs have an expiration date. If the PIN expired since generation, return to the Customer Support Portal and generate a new one before proceeding.

> **Success: Verification**
>
> PAN-OS version, auth code, and device certificate PIN fields are populated. No validation errors are shown in the wizard.

### Step 1.8 -- Configure Management Parameters

Choose whether firewalls are managed by Strata Cloud Manager or Panorama.

#### SCM

1. Enter **CIDR ranges** allowed to access the management interface.
2. Enter or paste the **SSH public key** for login.
3. Select **Manage by SCM**.
4. Select the **SCM folder** to group the firewall(s). See [SCM Folder Management](https://docs.paloaltonetworks.com/strata-cloud-manager/getting-started/workflows/workflows-ngfw-setup/folder-management).

#### Panorama

1. Enter **CIDR ranges** allowed to access the management interface.
2. Enter or paste the **SSH public key** for login.
3. Select **Manage by Panorama**.
4. Enter the **Active Panorama IP address**.
5. Optionally enter the **Passive Panorama IP address** (for HA).
6. Enter the **Panorama VM auth key** -- see [Generate the VM Auth Key on Panorama](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/bootstrap-the-vm-series-firewall/generate-the-vm-auth-key-on-panorama).
7. Enter the **Device Group** name.
8. Enter the **Template Stack** name.

> **Note: Panorama-Managed Deployment**
>
> For detailed Panorama-specific steps including security group configuration and connectivity verification, see [Phase 3: Panorama-Managed Deployment](#phase-3-panorama-managed-deployment).

AWS-specific management options (both SCM and Panorama):

- **Deploy NAT Gateway** -- routes egress traffic through a NAT gateway in the security VPC.
- **Overlay Routing** -- enables a dual-arm architecture (eth1/1 + eth1/2) for egress traffic inspection. Requires PAN-OS 11.2.8+.

#### AWS Egress Traffic Handling Scenarios

| | Overlay Routing Enabled | Overlay Routing Disabled |
|---|---|---|
| **NAT Gateway Disabled** | Dual-arm (eth1/1 + eth1/2). eth1/2 has a public IP. Direct egress through eth1/2 to IGW. Eliminates NAT gateway costs. | Single-arm (eth1/1 only). |
| **NAT Gateway Enabled** | Dual-arm (eth1/1 + eth1/2). eth1/2 is private. Egress through eth1/2 to NAT Gateway. Avoids public IP costs. | Single-arm (eth1/1 only). All traffic goes through the NAT gateway. |

> **Success: Verification**
>
> Management parameters show the selected management platform (SCM or Panorama) with allowed management CIDRs and SSH key configured.

### Step 1.9 -- Review Architecture and Create Terraform Template

1. Click `Next` to reach the **Review Architecture** screen.
2. Enter a unique **Terraform template name**.
   - Use only lowercase letters, numbers, and hyphens.
   - Do not start or end with a hyphen.
   - Maximum 19 characters.
3. Review the topology diagram for your AI network architecture.
4. Click `Create terraform template`.
5. Click `Download terraform template`.
6. Close the deployment workflow.

> **Success: Verification**
>
> A `.zip` file is downloaded containing `architecture/` and `modules/` directories. The template appears in the Terraform Templates list under the shield icon in SCM.

### Step 1.10 -- Accept Marketplace Subscription

Before running Terraform, accept the marketplace subscription for the Prisma AIRS image in your cloud provider.

#### AWS

1. Navigate to the [AWS Marketplace listing for Prisma AIRS](https://aws.amazon.com/marketplace/pp?sku=b261y39exndwe1ltro1tqpeog).
2. Click `Continue to Subscribe`.
3. Accept the Terms and Conditions.
4. Click `Continue to Configuration` (no further action needed -- Terraform handles the rest).

> **Warning: [VALIDATION NEEDED] Marketplace Listing**
>
> The marketplace listing may use the Universal Image name (same as VM-Series) starting with PAN-OS 11.2.11. Verify the correct listing SKU before subscribing.

#### Azure

Run the following commands in Azure CLI to accept the subscription terms:

```bash
az vm image accept-terms --urn paloaltonetworks:airs-flex:airs-byol:VERSION
```

Replace `VERSION` with the `vmseries_version` value from `<terraform-path>/architecture/security_project/terraform.tfvars`.

#### GCP

> **Warning: [VALIDATION NEEDED] GCP Marketplace**
>
> The GCP marketplace acceptance process for Prisma AIRS images is not documented in the source material. Accept the image terms through the GCP Marketplace or `gcloud` CLI before running Terraform.

> **Success: Verification**
>
> Marketplace subscription is active for your cloud provider. Terraform `plan` will fail with a subscription error if this step was missed.

### Step 1.11 -- Deploy security_project Terraform

The `security_project` creates the core firewall infrastructure: security VPC/VNet, firewall instances, load balancers, health checks, and the IP-tag collector service.

1. Unzip the downloaded Terraform template.
2. Review the `README.md` in the `architecture/` directory.
3. Navigate to the `security_project` directory and run:

```bash
cd architecture/security_project
terraform init
terraform plan
terraform apply
```

> **Note: Record Output IP Addresses**
>
> After `terraform apply` completes, record the `lbs_external_ips` and `lbs_internal_ips` from the output. These are required for post-deployment configuration (particularly for GCP and Azure).

> **Note: IP-Tag Collector**
>
> The `security_project` Terraform also creates an IP-tag collector service, enabling IP-tag retrieval from Kubernetes clusters for Dynamic Address Groups (DAGs). See [Harvest IP-Tags from Kubernetes Clusters](https://docs.paloaltonetworks.com/ai-runtime-security/administration/deploy-ai-instances-in-public-clouds-as-a-software/use-case-harvesting-ip-tags-k8s-clusters).

> **Success: Verification**
>
> Terraform output shows `Apply complete!` with resources created. No errors in the apply output. Record the load balancer IP addresses from the outputs.

### Step 1.12 -- Deploy application_project Terraform

The `application_project` creates the peering connections between application VPCs/VNets and the security VPC/VNet, and creates GWLB endpoints (AWS) or peering (Azure/GCP).

```bash
cd ../application_project
terraform init
terraform plan
terraform apply
```

> **Warning: Important: Azure Route Table Association**
>
> After running the Azure `application_project` Terraform, manually associate the route table with your application subnet to direct outbound traffic through the firewall:
>
> 1. In the [Azure portal](https://portal.azure.com/), navigate to `Virtual Networks`.
> 2. Select the virtual network containing your application subnet.
> 3. Navigate to `Subnets` and select the application subnet.
> 4. In the **Route table** field, select the route table created by the deployment Terraform.
> 5. Click `Save`.

> **Success: Verification**
>
> Terraform output shows `Apply complete!`. GWLB endpoints (AWS), VNet peering (Azure), or VPC peering (GCP) are created in your cloud console.

### Step 1.13 -- Verify Firewall Connectivity

After both Terraform projects complete, verify the firewall has connected to the management platform.

1. In SCM, navigate to `Workflows` > `NGFW Setup` > `Device Management`.
2. Switch to the **Cloud Managed Devices** tab.
3. Locate the deployed firewall(s).
4. Confirm **Device Status** shows `Connected`.
5. Verify the serial number, PAN-OS version, and deployment profile match your configuration.

> **Note: Connection Timing**
>
> The firewall takes several minutes to bootstrap and connect to the management platform after Terraform apply completes. Allow up to 15 minutes before troubleshooting connectivity.

> **Success: Verification**
>
> Firewall appears in SCM (or Panorama `Managed Devices` > `Summary`) with **Connected** status. Proceed to [Phase 5: Security Configuration](airs-network-intercept.md#phase-5-security-configuration) in the Core Guide.


## Phase 2: Auto-Execute Deployment

Auto-Execute orchestrates the complete lifecycle of firewall infrastructure provisioning and traffic redirection. SCM creates the security VPC/VNet, firewall instances, load balancers, and route tables automatically -- no Terraform required. Available for AWS and Azure only, with SCM management only.

> **Note: Auto-Execute Constraints**
>
> - **Clouds:** AWS and Azure only (GCP not supported)
> - **Management:** Strata Cloud Manager only (Panorama not supported)
> - **Cloud Mesh:** Supported -- enables secure tunnels between firewalls across clouds/regions
> - **TGW:** Requires an existing Transit Gateway (AWS) -- cannot create one during deployment

### Step 2.1 -- Navigate to SCM and Select Auto-Execute

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com).
2. Navigate to `AI Security` > `AI Runtime Firewall`.
3. Click `Add Protections` (the `+` icon).
4. Select your **Cloud Service Provider** (AWS or Azure) and click `Next`.
5. In **Firewall Placement**, select the traffic streams to inspect.
6. Select **Auto-Execute** as the deployment method.
7. Click `Next`.

> **Note: Cloud Asset Map Shortcut**
>
> Auto-Execute can also be initiated from the Cloud Asset Map by clicking an unprotected application and selecting `Add Protection`. The cloud service is pre-selected when entering the wizard this way.

> **Success: Verification**
>
> The wizard shows **Auto-Execute** as the selected deployment method and advances to the applications selection screen.

### Step 2.2 -- Select Applications

1. On the **Applications** tab, use the `Select Application(s)` dropdown to choose discovered applications to protect.
2. For AWS, configure **GWLB Endpoint CIDR & Zone Pair** for each application:
   - Select the zone.
   - Enter the CIDR of an available subnet in the application VPC.
   - Click the `+` icon to add additional zones.
3. Optionally select **VPC(s)** from the discovered list. VPCs associated with selected applications are pre-populated.
4. Click `Next`.

> **Danger: Do Not Pre-Create Subnets**
>
> For Auto-Execute on AWS, do not pre-create the GWLB endpoint subnets. Prisma AIRS creates new subnets using the CIDRs entered here. Pre-existing subnets cause a pre-deployment check failure.

> **Success: Verification**
>
> At least one application is selected with zone and CIDR configuration complete.

### Step 2.3 -- Configure Deployment Parameters

Auto-Execute pre-selects `AI Runtime Security` as the firewall type when AI traffic streams are selected. VM-Series is not supported for Auto-Execute.

1. Specify the **number of firewall instances**.
2. Select **deployment zones** covering all application availability zones.
3. Select the **instance type** for the security VM.
4. Optionally enable **Deploy NAT Gateway** (AWS only).
5. Optionally enable **Overlay Routing** (AWS only, PAN-OS 11.2.8+).
6. Optionally enable **Cloud Mesh** for multi-cloud secure tunneling.

> **Success: Verification**
>
> Deployment parameters show the correct instance count, zones, and instance type. Cloud Mesh toggle is set as desired.

### Step 2.4 -- Configure IP Addressing

#### AWS

1. Enter the **CIDR for security VPC** (unused VPC CIDR range).
2. Configure TGW:
   - From the **TGW Cloud Account** dropdown, select your AWS account.
   - Select the existing **TGW ID** from the dropdown.
3. Select a **Resource Access Manager (RAM)** -- `New` or `Existing`.
4. Optionally enable **Cross-Zone load balancing**.

> **Warning: Existing TGW Required**
>
> Auto-Execute requires an existing Transit Gateway. Unlike the Terraform Download path, Auto-Execute cannot create a new TGW during deployment.

#### Azure

1. Enter the **CIDR for security VNet** (unused VNet address space).

> **Success: Verification**
>
> IP addressing shows valid, non-overlapping CIDRs. For AWS, an existing TGW is selected.

### Step 2.5 -- Configure Licensing and Management

1. Select the **PAN-OS version**.
2. Enter the **Flex authentication code**.
3. Enter the **Device Certificate PIN ID** and **PIN Value**.
4. Enter **allowed management CIDRs**.
5. Enter the **SSH public key**.
6. Select **Manage by SCM** and choose the **SCM folder**.

> **Warning: Cloud Mesh Folder Requirement**
>
> If Cloud Mesh is enabled, select the folder that contains the required Auto-VPN configuration. Cloud Mesh uses Auto-VPN to establish tunnels between firewalls.

> **Success: Verification**
>
> Licensing and management fields are populated. Management is set to SCM (Panorama is not available for Auto-Execute).

### Step 2.6 -- Review and Deploy

1. Click `Next` to reach the **Review Architecture** screen.
2. Review the topology diagram.
3. Click `Deploy` to initiate automatic deployment.

SCM orchestrates the deployment automatically. No Terraform download or manual `apply` is needed.

> **Success: Verification**
>
> Deployment is initiated. The SCM dashboard shows a deployment in progress.

### Step 2.7 -- Monitor Deployment Progress

1. Navigate to `AI Security` > `AI Runtime Firewall`.
2. Click the **shield** icon.
3. Select the **Cloud Task log** tab.
4. Locate your deployment by name to monitor task progress.

> **Note: Deployment Timing**
>
> Auto-Execute deployments can take 15-30 minutes to complete, depending on cloud provider and resource creation times.

> **Success: Verification**
>
> All tasks in the Cloud Task log show as completed. No error entries appear.

### Step 2.8 -- Verify Firewall Connectivity

1. Navigate to `Workflows` > `NGFW Setup` > `Device Management`.
2. Switch to the **Cloud Managed Devices** tab.
3. Locate the deployed firewall(s) and confirm **Device Status** is `Connected`.

> **Success: Verification**
>
> Firewall appears in SCM with **Connected** status and **In Sync** configuration state. Proceed to [Phase 5: Security Configuration](airs-network-intercept.md#phase-5-security-configuration) in the Core Guide.

### Decommissioning Auto-Execute Firewalls

Decommissioning deletes the Terraform template, associated firewalls, and cloud resources deployed by Prisma AIRS. Software NGFW credits are released back to the pool. The cloud account is not modified or deleted.

1. Log in to Strata Cloud Manager.
2. [Disable and re-enable the cloud account](https://docs.paloaltonetworks.com/ai-runtime-security/activation-and-onboarding/manage-onboarded-cloud-accounts).
3. Navigate to `AI Security` > `AI Runtime` > `AI Runtime Firewall`.
4. Click the **shield** icon.
5. Select the **Terraform Templates** tab.
6. Click the **delete** icon next to the template to decommission.

> **Warning: AWS Cloud Mesh IAM Permission**
>
> If mesh-enabled firewalls are deployed in AWS (or AWS account is onboarded for orchestration), ensure the IAM role includes `ec2:RevokeSecurityGroupIngress` before decommissioning. Reapply the Terraform template to sync IAM permissions.

Monitor decommissioning progress on the **Cloud Task log** tab. The `Purge MSF Managed Folders from SCM` task may log an error if other active firewall clusters exist in the same folder -- this error has no functional impact.

> **Success: Verification**
>
> The Terraform template no longer appears in the Terraform Templates list. Cloud resources (VPC/VNet, instances, load balancers) are deleted from the cloud console. Credits are returned to the pool.


## Phase 3: Panorama-Managed Deployment

A variant of the SCM Terraform Download path (Phase 1) that configures the firewall for Panorama management. Follow Phase 1 Steps 1.1-1.6 first, then use this phase for Panorama-specific management configuration.

> **Note: Panorama-Managed Prerequisites**
>
> - Panorama version **11.2.5 or later**
> - CloudConnector Plugin **2.1.0** installed
> - Panorama IP address (active, and optionally passive for HA)
> - VM auth key generated on Panorama
> - Device Group and Template Stack pre-created for AIRS firewalls

### Step 3.1 -- Prepare Panorama Prerequisites

Before running the SCM wizard, prepare the Panorama environment.

1. Confirm Panorama is running PAN-OS **11.2.5+** with **CloudConnector Plugin 2.1.0**.
2. Generate a **VM auth key** on Panorama: `Panorama` > `Setup` > `Management` > `VM Auth Key` > `Generate`. See [Generate the VM Auth Key on Panorama](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/bootstrap-the-vm-series-firewall/generate-the-vm-auth-key-on-panorama).
3. Create a **Device Group** for AIRS firewalls. See [Add a Device Group](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-firewalls/manage-device-groups/add-a-device-group).
4. Create a **Template Stack** for AIRS firewalls. See [Configure a Template Stack](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-firewalls/manage-templates-and-template-stacks/configure-a-template-stack).
5. Record the Panorama **active IP address** and (if HA) **passive IP address**: `Panorama` > `High Availability`.

> **Success: Verification**
>
> Panorama 11.2.5+ is running with CloudConnector Plugin 2.1.0 installed. VM auth key, Device Group, and Template Stack are created and recorded.

### Step 3.2 -- Configure Management as Panorama in SCM Wizard

Follow Phase 1 Steps 1.1-1.6 for your cloud provider. At the management parameters step:

1. Select **Manage by Panorama**.
2. Enter the **Active Panorama IP address**.
3. Optionally enter the **Passive Panorama IP address**.
4. Enter the **Panorama VM auth key**.
5. Enter the **Device Group** name.
6. Enter the **Template Stack** name.

Continue with Steps 1.7-1.9 (licensing, review architecture, download Terraform).

> **Note: Panorama Dashboard Status**
>
> For Panorama-managed deployments, the SCM Terraform Templates list shows **Not Deployed** as the status. This is expected -- verify deployment by checking the **Managed By** column, which shows `panorama:<ip-address>`.

> **Success: Verification**
>
> The Terraform template is downloaded with Panorama management configuration embedded. The **Managed By** column in SCM shows `panorama:<ip-address>`.

### Step 3.3 -- Run Terraform

Follow the same Terraform execution as Phase 1 Steps 1.10-1.12 (marketplace subscription, `security_project`, `application_project`).

> **Note: No IP-Tags Configuration Needed**
>
> Panorama-managed deployments do not require separate IP-tag configuration. Panorama uses the [Panorama Plugin for Kubernetes](https://docs.paloaltonetworks.com/plugins/vm-series-and-panorama-plugins-release-notes/panorama-plugin-for-kubernetes) to pull IP-tags and push them to managed firewalls via Device Groups.

> **Success: Verification**
>
> Both `security_project` and `application_project` Terraform apply successfully.

### Step 3.4 -- Add Firewall IP to Panorama Security Group (If Applicable)

If Panorama has a security group restricting inbound connections, add the firewall public IP to allow communication.

1. In the cloud console (e.g., [AWS Console](https://aws.amazon.com/console/)), navigate to `EC2` > `Instances`.
2. Search for the deployed AIRS firewall instance.
3. Copy the **Public IPv4 address**.
4. Navigate to the **Panorama instance** > `Security` tab > click the **Security group**.
5. Select **Inbound rules** > `Edit inbound rules`.
6. Click `Add rule` > select `All traffic` > enter the firewall public IP.
7. Click `Save rules`.

> **Note: Cloud-Specific Adaptation**
>
> The example above shows AWS. For Azure, add the IP to the Panorama Network Security Group (NSG). For GCP, add it to the Panorama firewall rule.

> **Success: Verification**
>
> The Panorama security group (or NSG/firewall rule) includes the AIRS firewall public IP in its inbound rules.

### Step 3.5 -- Verify Firewall in Panorama

1. Log in to the Panorama web interface.
2. Navigate to `Panorama` > `Managed Devices` > `Summary`.
3. Locate the deployed firewall.
4. Confirm the device status is **Connected**.
5. Verify it is assigned to the correct **Device Group** and **Template Stack**.

View AI security threat logs at `Monitor` > `Logs` > `Threat` with the `ai-security` subtype filter.

> **Success: Verification**
>
> Firewall appears in Panorama Managed Devices with **Connected** status, correct Device Group, and correct Template Stack. Proceed to security configuration via Panorama.


## Phase 4: VM-Series Deployment

Deploy a standard VM-Series firewall through the SCM wizard. VM-Series firewalls protect non-AI, non-cluster traffic only -- they cannot inspect AI model traffic or Kubernetes namespace traffic.

> **Warning: VM-Series Limitations**
>
> VM-Series firewalls deployed through this workflow **cannot inspect AI traffic, K8s namespace traffic, or cluster traffic**. Use this path only for non-AI workload protection (VPCs, EC2s, Lambda functions). For AI traffic protection, deploy Prisma AIRS AI Runtime Firewall via [Phase 1](#phase-1-scm-terraform-download) instead.

### Step 4.1 -- Prerequisites and Constraints

| Requirement | Details |
|---|---|
| **License** | VM-Series license with a separate [VM-Series deployment profile](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/license-the-vm-series-firewall/software-ngfw/create-a-deployment-profile-vm-series) |
| **Panorama** | PAN-OS 11.2.5+ with cloud plugin |
| **Cloud account** | Must include VPC workloads (not namespace-only) |
| **Traffic types** | Non-AI, non-cluster traffic only |

> **Success: Verification**
>
> VM-Series deployment profile is created in the Customer Support Portal with the correct credit allocation.

### Step 4.2 -- Select VM-Series in Deployment Parameters

Follow Phase 1 Steps 1.1-1.4. At the deployment parameters step:

1. In **Deployment type**, select `VM-Series`.
2. Enter the **Service account attached to security VM** (GCP only).
3. Enter the **number of firewalls to deploy**.
4. Select **deployment zones**.
5. Select the **instance type**.

> **Note: No Autoscaling for VM-Series**
>
> The VM-Series deployment through this wizard uses static scaling only. Dynamic autoscaling is available only for Prisma AIRS AI Runtime Firewall deployments.

> **Success: Verification**
>
> Deployment type shows `VM-Series` with the correct instance count and zones.

### Step 4.3 -- Complete Wizard and Download Terraform

Follow Phase 1 Steps 1.6-1.9 for IP addressing, licensing (using VM-Series auth code), management parameters, and Terraform template creation/download.

> **Success: Verification**
>
> Terraform template is downloaded with VM-Series configuration.

### Step 4.4 -- Run Terraform

Follow Phase 1 Steps 1.10-1.12 (marketplace subscription, `security_project`, `application_project`).

> **Success: Verification**
>
> Both Terraform projects apply successfully. Record load balancer IPs from the output.

### Step 4.5 -- Verify in SCM or Panorama

1. Navigate to `Workflows` > `NGFW Setup` > `Device Management`.
2. Switch to the **Cloud Managed Devices** tab.
3. Confirm the VM-Series firewall shows **Device Status** as `Connected`.
4. Verify the **Application Type** column shows `VMSeries`.

> **Success: Verification**
>
> VM-Series firewall appears in SCM (or Panorama) with **Connected** status. Configure security policy for non-AI traffic inspection.


## Phase 5: Private Cloud Deployment

Deploy Prisma AIRS AI Runtime Firewall on ESXi, KVM, or OpenShift for on-premises or private cloud environments. The firewall intercepts traffic between applications in private clouds and AI models on public clouds.

### Step 5.1 -- Download the AIRS Image

1. Log in to the [Customer Support Portal](https://support.paloaltonetworks.com).
2. Navigate to `Updates` > `Software Updates`.
3. In **Content type**, search for:
   - **ESXi:** `PAN-OS for AI Runtime Security ESXi Base Images` -- download the `.ova` file
   - **KVM:** `PAN-OS for AI Runtime Security KVM Base Images` -- download the `.qcow2` file

> **Success: Verification**
>
> The AIRS image file (`.ova` or `.qcow2`) is downloaded to the local machine or accessible storage.

### Step 5.2 -- Create VM with 3 Interfaces

Create a virtual machine using the downloaded image.

1. In ESXi or KVM, create a new VM using the OVA/QCOW2 file.
2. Enter a **name** for the VM.
3. Upload the image file.
4. Configure **three network interfaces**:
   - **Management** -- for firewall management traffic
   - **Client-side** -- for application-facing traffic
   - **Server-side** -- for AI model-facing traffic
5. Configure VM resources: minimum **2 CPUs** and **4.5 GB memory**.
6. Complete the VM creation wizard.

> **Success: Verification**
>
> The VM is created with 3 network interfaces and meets the minimum resource requirements.

### Step 5.3 -- Create Bootstrap Folder Structure

Create the standard bootstrap folder structure on your local machine or storage.

```bash
mkdir -p content software plugins license config
```

> **Success: Verification**
>
> Five directories exist: `content/`, `software/`, `plugins/`, `license/`, `config/`.

### Step 5.4 -- Create Bootstrap Files

Create the auth codes file and init-cfg.txt bootstrap configuration.

#### Part 1: Auth Codes

Create a file named `authcodes` in the `license/` folder with your auth code (no leading or trailing spaces or newlines):

```bash
# Create the authcodes file
echo -n "YOUR_AUTH_CODE_HERE" > license/authcodes
```

#### Part 2: init-cfg.txt

Create `init-cfg.txt` in the `config/` folder. See [Phase 6: Manual Bootstrap](#phase-6-manual-bootstrap) for the full parameter reference.

#### SCM-Managed

```
type=static
ip-address=10.3.254.85
default-gateway=10.3.254.1
netmask=255.255.255.0
hostname=airs-private-01
panorama-server=cloud
plugin-op-commands=advance-routing:enable
dgname=airs-private-dg
dns-primary=8.8.8.8
dns-secondary=8.8.4.4
vm-series-auto-registration-pin-id=YOUR_PIN_ID
vm-series-auto-registration-pin-value=YOUR_PIN_VALUE
```

> **Note: SCM-Managed: panorama-server=cloud**
>
> Setting `panorama-server=cloud` directs the firewall to register with Strata Cloud Manager instead of a Panorama appliance.

#### Panorama-Managed

```
type=static
ip-address=10.3.254.85
default-gateway=10.3.254.1
netmask=255.255.255.0
hostname=airs-private-01
panorama-server=10.1.1.20
panorama-server-2=10.1.1.21
vm-auth-key=0123456789ABCDEF
plugin-op-commands=advance-routing:enable
dgname=airs-panorama-dg
tplname=airs-panorama-tpl
dns-primary=8.8.8.8
dns-secondary=8.8.4.4
vm-series-auto-registration-pin-id=YOUR_PIN_ID
vm-series-auto-registration-pin-value=YOUR_PIN_VALUE
```

> **Success: Verification**
>
> `license/authcodes` contains the auth code. `config/init-cfg.txt` contains all required bootstrap parameters for the selected management platform.

### Step 5.5 -- Create ISO and Boot VM

Package the bootstrap folder structure into an ISO image and attach it to the VM.

1. Create an ISO from the bootstrap folders. See [Bootstrap the VM-Series Firewall](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/bootstrap-the-vm-series-firewall) for platform-specific ISO creation steps.
2. Attach the ISO to the VM as a CD/DVD drive.
3. Power on the VM.

The firewall automatically reads the bootstrap parameters from the ISO during first boot.

> **Success: Verification**
>
> The VM powers on and begins the bootstrap process. The console shows PAN-OS loading.

### Step 5.6 -- Verify Bootstrap Completion

Connect to the firewall console and verify the bootstrap parameters.

```
show system info
```

Confirm the following values in the output:

| Field | Expected Value |
|---|---|
| `model` | `AI-Runtime-Security` |
| `vm-license` | `AI-RUNTIME-SECURITY-2` |
| `cloud-mode` | `non-cloud` (private cloud) |
| `advanced-routing` | `on` |
| `device-certificate-status` | `Valid` |

Check bootstrap status:

```
show system bootstrap status
```

Check for configuration push jobs:

```
show jobs all
```

> **Success: Verification**
>
> `show system info` shows `model: AI-Runtime-Security` and `device-certificate-status: Valid`. Bootstrap status shows all phases complete. Record the serial number for the next step.

### Step 5.7 -- Verify in SCM or Panorama

1. In SCM, navigate to `System Settings` > `Device Management`.
2. Locate the firewall by the serial number recorded in the previous step.
3. Confirm **Device Status** is `Connected` and configuration is **In Sync**.

> **Success: Verification**
>
> The private cloud firewall appears in SCM (or Panorama) with **Connected** and **In Sync** status. Proceed to security configuration.


## Phase 6: Manual Bootstrap

Manually deploy and bootstrap Prisma AIRS AI Runtime Firewall for brownfield environments with existing cloud infrastructure. This path provides maximum flexibility -- use it when the SCM wizard-generated Terraform does not fit your environment.

### Step 6.1 -- Choose a Bootstrap Method

Three bootstrap methods are available. Choose based on your cloud and infrastructure.

| Method | Applicability | Best For |
|---|---|---|
| `init-cfg.txt` | Public and private clouds | Standard bootstrap with file-based configuration |
| **User data** | Public clouds only | Cloud-native bootstrap using instance metadata |
| **AWS Secrets Manager** | AWS only | Secure parameter storage for sensitive bootstrap values |

Reference: [Choose a Bootstrap Method](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/bootstrap-the-vm-series-firewall/choose-a-bootstrap-method)

> **Success: Verification**
>
> Bootstrap method selected based on cloud environment and security requirements.

### Step 6.2 -- Configure init-cfg.txt Parameters

The `init-cfg.txt` file contains all bootstrap parameters. Configuration differs based on the management platform.

#### SCM-Managed

```
type=dhcp-client
dhcp-accept-server-domain=yes
dhcp-accept-server-hostname=yes
dhcp-send-client-id=yes
dhcp-send-hostname=yes
dgname=airs-brownfield-dg
plugin-op-commands=advance-routing:enable
panorama-server=cloud
mgmt-interface-swap=enable
dns-primary=10.5.6.6
dns-secondary=10.5.6.7
vm-series-auto-registration-pin-id=YOUR_PIN_ID
vm-series-auto-registration-pin-value=YOUR_PIN_VALUE
```

| Parameter | Description |
|---|---|
| `type` | `dhcp-client` or `static`. Use `static` for private cloud with fixed IP. |
| `dhcp-*` | Required when `type=dhcp-client`. Enables DHCP hostname and domain acceptance. |
| `panorama-server=cloud` | Directs the firewall to register with SCM instead of a Panorama appliance. |
| `dgname` | SCM folder name where the firewall will be managed. |
| `plugin-op-commands` | Set to `advance-routing:enable` for Logical Router support (required). |
| `mgmt-interface-swap` | Set to `enable` if the firewall is behind a load balancer (public cloud only). |
| `vm-series-auto-registration-pin-id` | Device Certificate PIN ID from the Customer Support Portal. |
| `vm-series-auto-registration-pin-value` | Device Certificate PIN Value. |

#### Panorama-Managed

```
type=static
ip-address=10.1.1.19
default-gateway=10.1.1.1
netmask=255.255.255.0
dgname=airs-panorama-dg
vm-auth-key=0123456789ABCDEF
plugin-op-commands=advance-routing:enable
panorama-server=10.1.1.20
panorama-server-2=10.1.1.21
mgmt-interface-swap=enable
tplname=airs-panorama-tpl
dns-primary=10.5.6.6
dns-secondary=10.5.6.7
vm-series-auto-registration-pin-id=YOUR_PIN_ID
vm-series-auto-registration-pin-value=YOUR_PIN_VALUE
```

| Parameter | Description |
|---|---|
| `type` | `static` for fixed IP assignment. Requires `ip-address`, `default-gateway`, `netmask`. |
| `panorama-server` | IP address of the active Panorama appliance. |
| `panorama-server-2` | IP address of the passive Panorama appliance (for HA). |
| `vm-auth-key` | VM auth key generated on Panorama. |
| `dgname` | Panorama Device Group name. |
| `tplname` | Panorama Template Stack name. |
| `plugin-op-commands` | Set to `advance-routing:enable` for Logical Router support. |

> **Success: Verification**
>
> `init-cfg.txt` contains all required parameters for the selected management platform. No commented-out lines or placeholder values remain.

### Step 6.3 -- Configure Routing

Prisma AIRS AI Runtime Firewall supports different routing configurations based on the management platform.

| Routing Type | SCM Support | Panorama Support | init-cfg.txt Parameter |
|---|---|---|---|
| **Logical Router (LR)** | Yes (only option) | Yes | `plugin-op-commands=advance-routing:enable` |
| **Virtual Router (VR)** | No | Yes | No parameter needed (default) |

> **Note: SCM Requires Logical Router**
>
> SCM supports only Logical Router (LR) configuration. Always include `plugin-op-commands=advance-routing:enable` in the init-cfg.txt for SCM-managed firewalls. Panorama supports both LR and VR.

> **Success: Verification**
>
> The `plugin-op-commands` parameter is set correctly for the chosen management platform and routing type.

### Step 6.4 -- Apply Required Labels for Manual Terraform

When deploying manually (not using the SCM-generated Terraform), add cloud-specific labels to your Terraform template for Prisma AIRS to identify and manage the firewall instances.

Add the following labels under `Tags` in `<terraform-path>/architecture/security_project/terraform.tfvars`:

#### AWS / Azure

```hcl
paloaltonetworks.com-trust  = "unique-value-1"
paloaltonetworks.com-occupied = "unique-value-2"
```

#### GCP

```hcl
paloaltonetworks_com-trust  = "unique-value-1"
paloaltonetworks_com-occupied = "unique-value-2"
```

> **Note: GCP Label Format**
>
> GCP uses underscores (`_`) instead of dots (`.`) in label keys.

Additionally, ensure the network interface name in the `security_project` Terraform is suffixed by `-trust-vpc`.

> **Success: Verification**
>
> Cloud-specific labels are present in the Terraform template with unique values. The trust network interface name ends with `-trust-vpc`.

### Step 6.5 -- Deploy and Verify

1. Download the Terraform module for your cloud architecture from the cloud marketplace or Palo Alto Networks resources.
2. Apply the Terraform with the configured `init-cfg.txt` and labels.
3. Wait for the firewall to bootstrap (allow 10-15 minutes).
4. Verify connectivity in SCM (`Workflows` > `NGFW Setup` > `Device Management`) or Panorama (`Managed Devices` > `Summary`).

> **Success: Verification**
>
> Firewall appears in the management platform with **Connected** status. Proceed to security configuration.


## Post-Deployment

After completing any deployment phase above, return to the Core Guide to configure security profiles and verify protection.

### Next Steps

1. **Security Configuration** -- Create AI Security Profiles, model groups, Security Profile Groups, and policy rules. See [Core Guide Phase 5](airs-network-intercept.md#phase-5-security-configuration).
2. **Push Configuration** -- Push the security configuration to the deployed firewall(s) from SCM or Panorama.
3. **Validation** -- Generate test traffic, review AI Security logs, and confirm threat detection. See [Core Guide Phase 7](airs-network-intercept.md#phase-7-validation--verification).
4. **K8s Protection** (optional) -- For containerized workloads, configure interfaces, zones, NAT, routers, and deploy PAN-CNI. See [Configure SCM to Secure K8s Clusters](https://docs.paloaltonetworks.com/ai-runtime-security/administration/deploy-ai-instances-in-public-clouds-as-a-software/scm-config-protect-vms-k8s).

> **Success: Verification**
>
> Firewall is connected to the management platform, security configuration is pushed, and AI Security logs appear in the Log Viewer.


## Troubleshooting

### Terraform Apply Failures

| Error | Cause | Fix |
|---|---|---|
| Marketplace subscription error | Image terms not accepted | Accept the Prisma AIRS marketplace subscription (Step 1.10) before running `terraform apply`. |
| CIDR overlap | Security VPC/VNet CIDR overlaps with existing VPC/VNet | Use a non-overlapping CIDR range for the security VPC/VNet. |
| IAM / permissions error | Insufficient permissions for resource creation | Verify the IAM role or service account has permissions to create VPCs, EC2 instances, load balancers, and route tables. |
| TGW not found | Transit Gateway ID is incorrect or in a different account | Verify the TGW ID in `VPC Dashboard` > `Transit Gateways` and ensure it is in the same region. |
| Template name invalid | Name exceeds 19 characters or contains invalid characters | Use only lowercase letters, numbers, and hyphens. Do not start or end with a hyphen. |

> **Success: Verification**
>
> Re-run `terraform plan` after fixing the error. The plan completes without errors.

### Firewall Not Connecting to Management Platform

| Symptom | Cause | Fix |
|---|---|---|
| Device Status not showing `Connected` after 15 minutes | Management interface lacks outbound connectivity | Verify the management subnet has outbound HTTPS access to `api.paloaltonetworks.com` and `api.sase.paloaltonetworks.com`. Check security groups / NSGs. |
| Device certificate invalid | Expired or incorrect PIN | Generate a new device certificate PIN in the Customer Support Portal and redeploy. |
| Panorama shows no device | Security group blocks inbound from firewall | Add the firewall public IP to the Panorama security group (see Phase 3, Step 3.4). |
| Auth code mismatch | Auth code does not match deployment profile | Verify the Flex auth code matches the deployment profile created for Prisma AIRS (not VM-Series). |

> **Success: Verification**
>
> After fixing connectivity, the firewall appears in SCM/Panorama with **Connected** status within 5-10 minutes.

### Auto-Execute Deployment Failures

| Error | Cause | Fix |
|---|---|---|
| Pre-deployment check failure | GWLB endpoint subnets already exist | Do not pre-create subnets. Auto-Execute creates them using the CIDRs entered in the wizard. |
| TGW not found | No existing Transit Gateway in the selected region | Auto-Execute requires an existing TGW. Create one in the AWS Console before deploying. |
| Deployment times out | Cloud provider resource limits | Check cloud provider quotas (EC2 instance limits, VPC limits, EIP limits) and request increases. |

> **Success: Verification**
>
> After fixing the error, re-run the Auto-Execute deployment. The Cloud Task log shows all tasks completed.

### Private Cloud Bootstrap Failures

| Symptom | Cause | Fix |
|---|---|---|
| `show system info` shows wrong model | Downloaded VM-Series image instead of AIRS image | Download the correct image from the Customer Support Portal: search for `PAN-OS for AI Runtime Security`. |
| `device-certificate-status: None` | PIN parameters missing or incorrect in init-cfg.txt | Verify `vm-series-auto-registration-pin-id` and `vm-series-auto-registration-pin-value` are correct and not expired. |
| Bootstrap hangs | DNS resolution failure or no internet access from management interface | Verify DNS settings and outbound connectivity from the management interface to Palo Alto Networks endpoints. |

> **Success: Verification**
>
> After fixing the issue, reboot the VM (or redeploy with corrected bootstrap parameters). `show system bootstrap status` shows all phases complete.


## Reference

### Terraform Template Structure

The SCM-generated Terraform template contains two directories:

```
<template-name>/
  architecture/
    security_project/      # Core firewall infrastructure
      terraform.tfvars     # Configuration variables
      main.tf              # Resource definitions
      README.md            # Deployment instructions
    application_project/   # App VPC/VNet peering
      terraform.tfvars
      main.tf
      README.md
  modules/                 # Shared Terraform modules
```

| Project | Creates |
|---|---|
| `security_project` | Security VPC/VNet, firewall instances, load balancers, health checks, IP-tag collector service, NAT gateway (if enabled) |
| `application_project` | VPC/VNet peering, GWLB endpoints (AWS), route table entries |

> **Success: Verification**
>
> Both directories contain `main.tf` and `terraform.tfvars` files. The `README.md` in each directory provides deployment-specific instructions.

### init-cfg.txt Parameter Reference

| Parameter | Required | Description |
|---|---|---|
| `type` | Yes | `static` or `dhcp-client`. Determines IP assignment method. |
| `ip-address` | If static | Management interface IP address. |
| `default-gateway` | If static | Default gateway for management interface. |
| `netmask` | If static | Subnet mask for management interface. |
| `hostname` | No | Firewall hostname. |
| `panorama-server` | Yes | `cloud` for SCM, or Panorama IP address. |
| `panorama-server-2` | No | Secondary Panorama IP (HA only). |
| `vm-auth-key` | Panorama only | VM auth key from Panorama. |
| `dgname` | Yes | Device Group (Panorama) or SCM folder name. |
| `tplname` | Panorama only | Template Stack name. |
| `plugin-op-commands` | Yes | Set to `advance-routing:enable` for Logical Router. |
| `dns-primary` | Yes | Primary DNS server IP. |
| `dns-secondary` | No | Secondary DNS server IP. |
| `mgmt-interface-swap` | No | `enable` if firewall is behind a load balancer (public cloud only). |
| `vm-series-auto-registration-pin-id` | Yes | Device Certificate PIN ID from the Customer Support Portal. |
| `vm-series-auto-registration-pin-value` | Yes | Device Certificate PIN Value. |
| `dhcp-accept-server-domain` | If DHCP | Set to `yes` when `type=dhcp-client`. |
| `dhcp-accept-server-hostname` | If DHCP | Set to `yes` when `type=dhcp-client`. |
| `dhcp-send-client-id` | If DHCP | Set to `yes` when `type=dhcp-client`. |
| `dhcp-send-hostname` | If DHCP | Set to `yes` when `type=dhcp-client`. |

Reference: [Sample init-cfg.txt File](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment/bootstrap-the-vm-series-firewall/create-the-init-cfgtxt-file/sample-init-cfgtxt-file)

> **Success: Verification**
>
> All required parameters for your management platform are present in the init-cfg.txt file.

### Autoscaling Metrics Reference

| Metric | Description | Use Case |
|---|---|---|
| `Dataplane CPU Utilization (%)` | Dataplane CPU usage percentage | General traffic load monitoring |
| `Dataplane Packet Buffer Utilization (%)` | Dataplane buffer usage percentage | Burst traffic protection |
| `GP Gateway Active Tunnels` | Active GlobalProtect tunnels | VPN gateway scaling |
| `GP Gateway Tunnel Utilization (%)` | Tunnel utilization percentage | VPN gateway capacity |
| `panSessionConnectionsPerSecond` | New connections per second | Connection-heavy workloads |
| `panSessionThroughputKbps` | Throughput in Kbps | Bandwidth-intensive workloads |
| `panSessionThroughputPps` | Packets per second | High packet rate workloads |
| `Sessions Active` | Total active sessions | Session table capacity |
| `Session Utilization (%)` | Combined session utilization | Overall capacity monitoring |
| `SSLProxyUtilization (%)` | SSL proxy session percentage | SSL decryption scaling |

> **Success: Verification**
>
> Selected metrics match the workload characteristics of your deployment (e.g., `panSessionThroughputKbps` for bandwidth-heavy AI model traffic).

### Cloud-Specific Tags and Labels

Tags/labels required for firewall discovery and management by SCM.

| Cloud | Tag Key | Tag Value | Purpose |
|---|---|---|---|
| AWS | `paloaltonetworks.com-monitored` | `enable` | Enables SCM discovery |
| AWS | `serialNumber` | Comma-separated serial numbers | Associates firewall with workloads |
| AWS | `paloaltonetworks.com-trust` | Unique value | Identifies trust interface (manual deploy) |
| AWS | `paloaltonetworks.com-occupied` | Unique value | Marks occupied resources (manual deploy) |
| Azure | `paloaltonetworks.com-monitored` | `enable` | Enables SCM discovery |
| Azure | `serialNumber` | Comma-separated serial numbers | Associates firewall with workloads |
| GCP | `paloaltonetworks_com-monitored` | `enable` | Enables SCM discovery (underscore format) |
| GCP | `serialnumber` | Comma-separated serial numbers | Associates firewall (lowercase key) |
| GCP | `paloaltonetworks_com-trust` | Unique value | Identifies trust interface (manual deploy) |

> **Success: Verification**
>
> Cloud resources have the correct tags/labels applied. SCM-generated Terraform applies these automatically; manual deployments require adding them manually.


## Deployment Checklist

Mark each item as complete for your chosen deployment model.

### Prerequisites (All Models)

- [ ] AIRS license activated with credit pool funded
- [ ] Strata Logging Service active
- [ ] Device Certificate PIN generated (not expired)
- [ ] Deployment profile created and associated with TSG
- [ ] Cloud account onboarded in SCM
- [ ] Marketplace subscription accepted

### Phase 1: SCM Terraform Download

- [ ] Cloud provider and traffic streams selected
- [ ] Region, account, and applications configured
- [ ] Traffic inspection configured (if namespace-level)
- [ ] Deployment parameters set (FW type, instances, zones, scaling)
- [ ] IP addressing configured (VPC/VNet CIDR, TGW/peering)
- [ ] Licensing entered (PAN-OS version, auth code, PIN)
- [ ] Management parameters configured (SCM or Panorama)
- [ ] Terraform template created and downloaded
- [ ] security_project Terraform applied successfully
- [ ] application_project Terraform applied successfully
- [ ] Azure route table associated (Azure only)
- [ ] Firewall shows Connected in SCM/Panorama

### Phase 2: Auto-Execute

- [ ] Cloud provider selected (AWS or Azure only)
- [ ] Auto-Execute deployment method selected
- [ ] Applications and zones configured
- [ ] IP addressing configured (existing TGW required for AWS)
- [ ] Licensing and SCM management configured
- [ ] Deployment initiated and completed
- [ ] Firewall shows Connected in SCM

### Phase 3: Panorama-Managed

- [ ] Panorama 11.2.5+ with CloudConnector Plugin 2.1.0
- [ ] VM auth key generated on Panorama
- [ ] Device Group and Template Stack created
- [ ] SCM wizard completed with Panorama management selected
- [ ] Terraform applied (security_project + application_project)
- [ ] Firewall IP added to Panorama security group (if applicable)
- [ ] Firewall shows Connected in Panorama

### Phase 5: Private Cloud

- [ ] AIRS image downloaded (OVA or QCOW2)
- [ ] VM created with 3 interfaces (mgmt, client, server)
- [ ] Bootstrap folder structure created
- [ ] authcodes and init-cfg.txt files populated
- [ ] ISO created and attached to VM
- [ ] Bootstrap completed (show system info confirms AI-Runtime-Security)
- [ ] Firewall shows Connected in SCM/Panorama

### Phase 6: Manual Bootstrap

- [ ] Bootstrap method chosen
- [ ] init-cfg.txt configured for SCM or Panorama
- [ ] Routing configured (LR or VR)
- [ ] Required cloud labels applied to Terraform
- [ ] Terraform deployed and firewall bootstrapped
- [ ] Firewall shows Connected in management platform

### Post-Deployment (All Models)

- [ ] AI Security Profile created (Core Guide Phase 5)
- [ ] Security Policy Rule created with AI Security Profile Group
- [ ] Configuration pushed to firewall(s)
- [ ] AI Security logs appearing in Log Viewer
- [ ] Cloud Asset Map shows updated protection status
