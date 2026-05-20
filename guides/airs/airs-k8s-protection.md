# Prisma AIRS: K8s & Container Protection

**End-to-end guide: PAN-CNI Helm installation through validated Kubernetes traffic inspection with IP tag harvesting**

> **Note: Guide Approach**
>
> This guide is a **bolt-on module** for the [AIRS Network Intercept Core Guide](airs-network-intercept.md). It covers post-deployment Kubernetes and container protection -- configuring the firewall to handle K8s traffic, installing the PAN-CNI Helm chart, and optionally deploying Tag Collector agents for private cluster discovery.
>
> **Prerequisites:** An AIRS AI Runtime Firewall must already be deployed and connected to SCM or Panorama. Security profiles must be configured. Complete the [Core Guide](airs-network-intercept.md) first.
>
> **Management platforms:** Steps are tabbed for **SCM** and **Panorama** where the UI workflow differs. Cloud-specific tabs (AWS / Azure / GCP) appear where routing or NAT configuration diverges.


## Architecture Overview

Prisma AIRS protects Kubernetes workloads by deploying a Container Network Interface (CNI) plugin into each cluster. The PAN-CNI plugin intercepts pod traffic and redirects it through the AIRS AI Runtime Firewall for inspection before forwarding to the destination.

### How PAN-CNI Works

The PAN-CNI plugin installs as a DaemonSet in the `kube-system` namespace. It chains onto the cluster's existing CNI (Calico, Azure CNI, VPC CNI, etc.) without replacing it. When a pod is annotated for protection, PAN-CNI adds routing rules that redirect the pod's egress and ingress traffic through the AIRS firewall.

```
                Kubernetes Cluster
┌─────────────────────────────────────────────────────┐
│                                                     │
│   ┌───────────┐     ┌───────────┐                   │
│   │  App Pod   │     │  App Pod   │                   │
│   │ (annotated)│     │ (annotated)│                   │
│   └─────┬─────┘     └─────┬─────┘                   │
│         │                 │                           │
│         ▼                 ▼                           │
│   ┌─────────────────────────────┐                   │
│   │      PAN-CNI DaemonSet       │                   │
│   │  Redirects annotated pod    │                   │
│   │  traffic to firewall        │                   │
│   └─────────────┬───────────────┘                   │
│                 │                                    │
└─────────────────┼────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│         AIRS AI Runtime Firewall                    │
│   ┌─────────────────────────────────────────────┐   │
│   │  AI Security Profile   +   Cloud-Delivered  │   │
│   │  (Prompt Injection, DLP, Toxic Content)     │   │
│   └─────────────────────────────────────────────┘   │
└──────────────────┬──────────────────────────────────┘
                   │
                   ▼
          AI Models / Internet
     (Bedrock, Vertex AI, Azure OAI)
```

**Two protection levels:**

- **VPC-level protection** -- secures all applications within the VPC. A single Helm chart covers the entire cluster. Annotate namespaces with `paloaltonetworks.com/firewall=pan-fw`.
- **Namespace-level protection** -- provides granular control per application namespace with traffic steering inspection and CIDR-based rules. Separate Helm charts are generated for each protected namespace during deployment.

### Tag Collector Agent for Private Clusters

Private Kubernetes clusters (with no public API server endpoint) cannot be directly monitored by the firewall for IP-to-tag mappings. A **Tag Collector Agent** deploys as a separate firewall instance that connects to private cluster API servers, harvests IP-tag information for pods, services, and namespaces, and redistributes those tags to the AIRS firewall.

```
Private K8s Cluster           Tag Collector Agent           AIRS Firewall
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  Private API      │      │  Polls K8s API    │      │  Receives tags   │
│  Server            │ ◄──── │  Harvests IP-tag  │ ────► │  via CIE/redistr.│
│                    │      │  mappings          │      │  Creates DAGs    │
│  Pods / Services   │      │  (PAN-OS 11.2.10+)│      │  Enforces policy │
└──────────────────┘      └──────────────────┘      └──────────────────┘
          ▲                         │
          │       TGW / VNet        │
          └────── Peering ──────────┘
```

> **Warning: Private Clusters Only (AWS and Azure)**
>
> In PAN-OS 11.2.10-h2 and later, the tag collector only harvests IP tags from AWS and Azure **private** Kubernetes clusters. Public clusters on AWS/Azure and all GCP clusters are not supported for tag collection. Public cluster IPs can be discovered through standard cloud asset discovery instead.

### OpenShift and Rancher (Private Cloud)

For private cloud container platforms (OpenShift, Rancher), the PAN-CNI plugin integrates as a secondary CNI via **Multus CNI chaining**. This path requires Panorama management with PAN-OS `11.2.5` or later and Kubernetes plugin `3.0.4`.

Key differences from public cloud deployments:

- Helm chart is sourced from the [Prisma AIRS Helm GitHub repository](https://github.com/PaloAltoNetworks/prisma-airs-helm), not the SCM Terraform download.
- A `NetworkAttachmentDefinition` must be deployed in each application namespace for Multus.
- Annotation uses `k8s.v1.cni.cncf.io/networks=pan-cni` instead of the standard PAN annotation.
- Single-arm deployment (trust interface only) with the firewall trust IP in `values.yaml`.


## Phase 1: Prerequisites

### Step 1.1: Verify Firewall Deployment and Connectivity

The AIRS AI Runtime Firewall must be deployed in the target cloud environment, connected to SCM or Panorama, and operational before configuring K8s protection.

1. Confirm the firewall is deployed by following the [AIRS Network Intercept Core Guide](airs-network-intercept.md) through Phase 4 (Deploy Firewall).
2. Verify the firewall appears as `Connected` in SCM under **Workflows** > **NGFW Setup** > **Device Management**, or in Panorama under **Panorama** > **Managed Devices** > **Summary**.
3. Confirm AI Security Profiles are configured by completing Phase 5 (Security Config) of the Core Guide.

> **Success: Verification**
>
> Firewall status shows `Connected` in the management platform. AI Security Profiles exist in the configuration scope assigned to this firewall.

### Step 1.2: Confirm Tooling and Cluster Access

The Helm chart installation and pod annotation steps require local tooling and cluster administrative access.

1. Install [Helm v3](https://helm.sh/docs/intro/install/) on the workstation.
2. Confirm `kubectl` is installed and configured with credentials for the target cluster(s).
3. Verify cluster admin permissions:

   ```bash
   kubectl auth can-i create daemonset -n kube-system
   ```

   The output must be `yes`.

> **Warning: GKE Autopilot Not Supported**
>
> GKE Autopilot clusters do not support Helm deployments due to restrictions on modifying the `kube-system` namespace. Use GKE Standard clusters instead.

> **Success: Verification**
>
> `helm version` returns v3.x. `kubectl auth can-i create daemonset -n kube-system` returns `yes`.

### Step 1.3: Confirm Version Requirements (Panorama Only)

Panorama-managed deployments require specific software versions for K8s protection features, including the Kubernetes plugin for IP tag harvesting.

1. Confirm Panorama software version is `11.2.5` or later.
2. Install Kubernetes plugin version `3.0.4` or later. Navigate to **Panorama** > **Plugins** and verify the installed version.
3. For IP tag harvesting (Phase 5), Kubernetes plugin version `3.1.0` or later is required.

> **Note: SCM-Managed Firewalls**
>
> SCM-managed deployments do not require a separate Kubernetes plugin. The tag collector functionality is built into the AIRS firewall deployment Terraform.

> **Success: Verification**
>
> Panorama version shows `11.2.5` or later. Kubernetes plugin shows `3.0.4` or later under **Panorama** > **Plugins**.

### Step 1.4: Gather Pod and Service Subnet CIDRs

The firewall needs static routes for pod and service subnets to properly route Kubernetes traffic. Gather these CIDRs from each target cluster before proceeding.

#### AWS (EKS)

1. Open the [Amazon EKS Console](https://console.aws.amazon.com/eks/).
2. Select the target cluster.
3. Navigate to the **Networking** tab.
4. Record the **Service IPv4 range** (e.g., `172.20.0.0/16`).
5. Record the **VPC CIDR** and **Subnet CIDRs** from the VPC configuration.
6. For custom CNI configurations, run:

   ```bash
   kubectl get nodes -o jsonpath='{.items[0].spec.podCIDR}'
   ```

#### Azure (AKS)

1. Open the [Azure Portal](https://portal.azure.com/).
2. Navigate to **Kubernetes services** > select the target cluster.
3. Under **Properties**, record the **Service CIDR** and **Pod CIDR** (if using kubenet; Azure CNI uses the VNet subnet range for pods).
4. Record the **VNet address space** from **Virtual Networks** > select the cluster VNet.

#### GCP (GKE)

1. Open the [GKE Console](https://console.cloud.google.com/kubernetes/).
2. Select the target cluster.
3. Record the **Cluster Pod IPv4 range** (e.g., `10.40.0.0/14`).
4. Record the **IPv4 Service range** (e.g., `172.16.0.0/24`).

> **Success: Verification**
>
> Pod CIDR and Service CIDR values are recorded for each target cluster. These values are required in Phase 2 (static routes) and Phase 3 (Helm `values.yaml`).


## Phase 2: Firewall Interface & Routing Configuration

Configure the AIRS firewall interfaces, zones, logical routers, NAT policies, and security policies to handle Kubernetes cluster traffic. The configuration varies by cloud provider due to differences in load balancer health probes, routing architecture, and overlay handling.

> **Note: Which tab should I pick?**
>
> - **AWS** -- uses GWLB endpoints. Overlay routing requires dual interfaces; non-overlay uses single-arm (trust only).
> - **Azure** -- requires two logical routers (`vr-private` / `vr-public`) because the Azure health probe (`168.63.129.16/32`) fails with a single router. Includes inbound and outbound NAT.
> - **GCP** -- standard dual-interface with a single logical router. Internal Load Balancer health checks via loopback.

### AWS

#### SCM

##### Step 2.1: Configure Interfaces (AWS / SCM)

Configure Layer 3 Ethernet interfaces for the trust and untrust data planes. Overlay routing deployments require both interfaces; non-overlay deployments use trust only.

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com/).
2. Navigate to **Configuration** > **NGFW and Prisma Access** > **Device Settings** > **Interfaces**.
3. Set the **Configuration Scope** to the AI Runtime Security folder.
4. Click **Add Interface**.
5. Configure `ethernet1/1` (trust):

   | Field | Value |
   |---|---|
   | Interface Name | `ethernet1/1` |
   | Interface Type | `Layer3` |
   | Zone | `trust` |
   | IPv4 | Dynamic (DHCP Client) |

6. For **overlay routing**: uncheck **Automatically create default route pointing to default gateway provided by server** on `ethernet1/1`.
7. For **overlay routing**: configure `ethernet1/2` (untrust) with the same settings except Zone = `untrust`. Leave the default route checkbox enabled on `ethernet1/2`.

> **Warning: Non-Overlay Routing (Single-Arm)**
>
> Non-overlay routing deployments require only `ethernet1/1` (trust). Do not configure `ethernet1/2`. The GWLB handles all traffic steering without a separate untrust interface.

> **Success: Verification**
>
> Interface(s) appear under **Device Settings** > **Interfaces** with status `Layer3` and DHCP Client assigned.

##### Step 2.2: Create Zones (AWS / SCM)

1. Navigate to **Configuration** > **NGFW and Prisma Access** > **Device Settings** > **Zones**.
2. Click **Add Zone**.
3. Create a `trust` zone with Interface Type `Layer3` and add `ethernet1/1`.
4. For overlay routing: create an `untrust` zone and add `ethernet1/2`.
5. Click **Save**.

> **Success: Verification**
>
> Zone(s) appear under **Device Settings** > **Zones** with the correct interfaces assigned.

##### Step 2.3: Configure Logical Routers (AWS / SCM)

Create logical routers with static routes for RFC 1918 address space and Kubernetes pod/service subnets.

1. Navigate to **Configuration** > **NGFW and Prisma Access** > **Device Settings** > **Routing**.
2. Create `trust-logical-router` with interface `ethernet1/1`.
3. In **Advanced Settings**, add these IPv4 Static Routes for `trust-logical-router`:

| Name | Destination | Interface | Next Hop |
|---|---|---|---|
| `10.x-route` | `10.0.0.0/8` | `ethernet1/1` | IP Address (eth1/1 gateway) |
| `172.16.x-route` | `172.16.0.0/12` | `ethernet1/1` | IP Address (eth1/1 gateway) |
| `192.168.x-route` | `192.168.0.0/16` | `ethernet1/1` | IP Address (eth1/1 gateway) |
| `default` | `0.0.0.0/0` | None | Next Logical Router: `untrust-lr` |

4. For overlay routing: create `untrust-logical-router` with interface `ethernet1/2` and add reverse static routes:

| Name | Destination | Interface | Next Hop |
|---|---|---|---|
| `10.x-route` | `10.0.0.0/8` | None | Next Logical Router: `trust-lr` |
| `172.16.x-route` | `172.16.0.0/12` | None | Next Logical Router: `trust-lr` |
| `192.168.x-route` | `192.168.0.0/16` | None | Next Logical Router: `trust-lr` |

5. Click **Save**.

> **Success: Verification**
>
> Logical router(s) appear under **Routing** with the static routes listed above. The default route on `trust-logical-router` points to the untrust logical router.

##### Step 2.4: Create NAT Policy (AWS / SCM -- Overlay Only)

Source NAT translates outbound Kubernetes traffic from trust to untrust. This step is required only for overlay routing deployments.

1. Navigate to **Configuration** > **NGFW and Prisma Access** > **Network Policies** > **NAT**.
2. Click **Add**.
3. Configure the NAT rule:

| Section | Field | Value |
|---|---|---|
| General | Name | `trust-to-untrust-zone-nat` |
| Original Packet | Source Zone | `trust` |
| Original Packet | Destination Zone | `untrust` |
| Original Packet | Destination Interface | `ethernet1/2` |
| Translated Packet | Translation | Source Address Only |
| Translated Packet | Source Translation Type | Dynamic IP and Port |
| Translated Packet | Interface | `ethernet1/2` |

4. Click **Save**.

> **Warning: Non-Overlay Routing**
>
> Non-overlay routing deployments do not need a NAT rule. The GWLB handles traffic steering at the VPC level without address translation on the firewall.

> **Success: Verification**
>
> NAT rule `trust-to-untrust-zone-nat` appears in the NAT policy list with Source Zone `trust` and Destination Zone `untrust`.

##### Step 2.5: Create Security Policy (AWS / SCM)

1. Navigate to **Configuration** > **NGFW and Prisma Access** > **Security Services** > **Security Policy**.
2. Click **Add Rule**.
3. Set the action to **Allow**.
4. Attach the AI Security Profile Group configured in the [Core Guide Phase 5](airs-network-intercept.md#security-config).
5. Click **Save**.

> **Success: Verification**
>
> Security policy rule appears with action `Allow` and the AI Security Profile Group attached.

##### Step 2.6: Push Configuration (AWS / SCM)

1. Navigate to **Configuration** > **Push Config**.
2. Select the AI Runtime Security managed folder.
3. Click **Push**.
4. Wait for the push to complete successfully.

> **Success: Verification**
>
> Push status shows `Completed` with no errors. The firewall is now configured to handle Kubernetes traffic.

#### Panorama

##### Step 2.1: Configure Interface (AWS / Panorama)

Panorama-managed AWS deployments use a single-arm architecture with only the trust interface (`ethernet1/1`).

1. [Log in to Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/access-and-navigate-panorama-management-interfaces/log-in-to-the-panorama-web-interface).
2. Navigate to **Network** > **Interfaces**.
3. Set the **Configuration Scope** to the AI Runtime Security template.
4. Click **Add Interface** and configure:

| Field | Value |
|---|---|
| Interface Name | `ethernet1/1` |
| Interface Type | `Layer3` |
| Logical Router | `vr-private` |
| Zone | `trust` |
| IPv4 | DHCP Client |
| Management Profile | HTTPS enabled |

5. Click **Add**.

> **Success: Verification**
>
> `ethernet1/1` appears under **Network** > **Interfaces** as Layer3 with DHCP Client and `trust` zone.

##### Step 2.2: Create Zone (AWS / Panorama)

1. Navigate to **Network** > **Zones**.
2. Click **Add Zone**.
3. Set **Name** to `trust`, **Type** to `Layer3`, and add `ethernet1/1`.
4. Click **Save**.

> **Success: Verification**
>
> `trust` zone appears with `ethernet1/1` listed.

##### Step 2.3: Create Security Policy and Push (AWS / Panorama)

1. Navigate to **Policies** > **Security**.
2. Click **Add** and set the action to **Allow**.
3. Attach the AI Security Profile Group.
4. Navigate to **Commit** > **Commit and Push**.
5. Select the AI Runtime Security device group and push.

> **Success: Verification**
>
> Commit and Push completes successfully. The security policy with the AI profile group is active on the firewall.

### Azure

Azure deployments require **two logical routers** (`vr-private` and `vr-public`) because the Azure health probe (`168.63.129.16/32`) fails with a single virtual router. Both inbound and outbound NAT rules are required.

> **Danger: Azure Health Probe Requires Dual Virtual Routers**
>
> A single virtual router causes health probe failures in Azure. Always create separate `vr-private` (for `ethernet1/1`) and `vr-public` (for `ethernet1/2`) logical routers with health probe routes (`168.63.129.16/32`) on both.

#### SCM

##### Step 2.1: Configure Interfaces (Azure / SCM)

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com/).
2. Navigate to **Configuration** > **NGFW and Prisma Access** > **Device Settings** > **Interfaces**.
3. Set the **Configuration Scope** to the AI Runtime Security folder.
4. Configure `ethernet1/1` (trust):

| Field | Value |
|---|---|
| Interface Type | `Layer3` |
| Logical Router | `vr-private` |
| Zone | `trust` |
| IPv4 | DHCP Client |
| IPv4 Enabled | Yes |

5. Configure `ethernet1/2` (untrust):

| Field | Value |
|---|---|
| Interface Type | `Layer3` |
| Logical Router | `vr-public` |
| Zone | `untrust` |
| IPv4 | DHCP Client |
| Auto Default Route | Enabled (eth1/2 only) |

6. Configure a **Loopback** interface for ILB health checks:
   - Set **Zone** to `trust` for private / `untrust` for public logical router.
   - In **IPv4s**, enter the ILB private IP address (from the `security_project` Terraform output).
   - Under **Advanced Settings** > **Management Profile**, add `allow-health-checks` with HTTPS enabled.
7. Click **Save**.

> **Success: Verification**
>
> Two Ethernet interfaces (`ethernet1/1` / `ethernet1/2`) and a loopback interface appear with the correct zones and logical router assignments.

##### Step 2.2: Configure Dual Logical Routers (Azure / SCM)

Create `vr-private` and `vr-public` with application routes, default routes, pod/service subnet routes, and health probe routes.

1. Navigate to **Configuration** > **NGFW and Prisma Access** > **Device Settings** > **Routing**.
2. Create `vr-private` with interface `ethernet1/1`.
3. Add these static routes to `vr-private`:

| Name | Destination | Next Hop | Interface |
|---|---|---|---|
| `app-vnet` | Application VNet CIDR | IP Address (eth1/1 gateway) | `ethernet1/1` |
| `pod_route` | Pod IPv4 CIDR | IP Address (eth1/1 gateway) | `ethernet1/1` |
| `service_route` | Service IPv4 CIDR | IP Address (eth1/1 gateway) | `ethernet1/1` |
| `health-probe` | `168.63.129.16/32` | IP Address (eth1/1 gateway) | `ethernet1/1` |
| `default` | `0.0.0.0/0` | Next Router: `vr-public` | None |

4. Create `vr-public` with interface `ethernet1/2` and add:

| Name | Destination | Next Hop | Interface |
|---|---|---|---|
| `app-vnet` | Application VNet CIDR | Next Router: `vr-private` | None |
| `pod_route` | Pod IPv4 CIDR | Next Router: `vr-private` | None |
| `service_route` | Service IPv4 CIDR | Next Router: `vr-private` | None |
| `health-probe` | `168.63.129.16/32` | IP Address (eth1/2 gateway) | `ethernet1/2` |
| `default` | `0.0.0.0/0` | IP Address (eth1/2 gateway) | `ethernet1/2` |

5. Click **Save**.

> **Note: Gateway IP Address**
>
> The gateway IP is the first usable IP in the subnet range (e.g., `192.168.1.1` for a `/24` subnet). Find it in the Azure Portal under **Virtual Networks** > **[Your VNet]** > **Subnets**.

> **Success: Verification**
>
> Both `vr-private` and `vr-public` appear under **Routing** with all static routes including the `168.63.129.16/32` health probe route.

##### Step 2.3: Create NAT Policies (Azure / SCM)

Azure requires both inbound DNAT and outbound source NAT rules.

1. Navigate to **Configuration** > **NGFW and Prisma Access** > **Network Policies** > **NAT**.
2. **Inbound NAT** (`inbound-web`):
   - Source Zone: `untrust`
   - Destination Zone: `trust`, Interface: `any`, Address: ELB public IP
   - Translation: `Both` -- Source: Dynamic IP and Port on `ethernet1/1`, Destination: Static IP translation
3. **Outbound NAT** (`outbound-internet`):
   - Source Zone: `trust`, Source Addresses: app-vnet CIDR + K8s pod CIDRs
   - Destination Zone: `untrust`, Interface: `any`
   - Translation: Source Address Only -- Dynamic IP and Port on `ethernet1/2`
4. Click **Save**.

> **Success: Verification**
>
> Two NAT rules appear: `inbound-web` (untrust > trust) and `outbound-internet` (trust > untrust).

##### Step 2.4: Create Security Policy and Push (Azure / SCM)

1. Navigate to **Security Services** > **Security Policy** > **Add Rule**.
2. Set the action to **Allow**. Attach the AI Security Profile Group.
3. Ensure the policy allows health checks from the Azure Load Balancer pool to the ILB IP.
4. Navigate to **Configuration** > **Push Config** and push to the AI Runtime Security folder.

> **Success: Verification**
>
> Push completes successfully. Security policy with `Allow` action and AI profile group is active.

#### Panorama

##### Step 2.1--2.4: Configure Azure (Panorama)

Follow the same configuration as the SCM path above, but in the Panorama UI:

1. [Log in to Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/access-and-navigate-panorama-management-interfaces/log-in-to-the-panorama-web-interface).
2. Configure interfaces under **Network** > **Interfaces**. Use `lr-private` / `lr-public` as logical router names (Panorama convention).
3. Create `trust` and `untrust` zones under **Network** > **Zones**.
4. Configure dual logical routers (`lr-private` and `lr-public`) under **Network** > **Logical Routers** with the same static routes as the SCM path (including `168.63.129.16/32` health probe routes).
5. Create inbound and outbound NAT rules under **Policies** > **NAT**.
6. Create a security policy under **Policies** > **Security** with `Allow` action and AI profile group attached.
7. Navigate to **Commit** > **Commit and Push**. Select the AI Runtime Security device group.

> **Success: Verification**
>
> Commit and Push completes successfully. Verify firewall connectivity in **Panorama** > **Managed Devices**.

### GCP

GCP deployments use a standard dual-interface configuration with a single logical router and ILB health checks via a loopback interface.

#### SCM

##### Step 2.1: Configure Interfaces (GCP / SCM)

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com/).
2. Navigate to **Configuration** > **NGFW and Prisma Access** > **Device Settings** > **Interfaces**.
3. Set the **Configuration Scope** to the AI Runtime Security folder.
4. Configure `ethernet1/1` and `ethernet1/2` as Layer 3 DHCP Client interfaces:
   - `ethernet1/1`: Zone = `trust`
   - `ethernet1/2`: Zone = `untrust`
5. Configure a **Loopback** interface:
   - Enter the ILB private IP in **IPv4s**.
   - Set **Zone** to `trust`.
   - Set **Virtual Router** to `default` (same as `ethernet1/2`).
6. Click **Save**.

> **Success: Verification**
>
> Two Ethernet interfaces and one loopback interface appear with correct zone assignments.

##### Step 2.2: Create Zones, Router, and Push (GCP / SCM)

1. Create `trust` and `untrust` zones under **Device Settings** > **Zones**.
2. Create a [Logical Router](https://docs.paloaltonetworks.com/ngfw/administration/set-up-firewalls/routing-and-interfaces/configure-a-logical-router) with both `ethernet1/1` and `ethernet1/2`.
3. Add a static route for the ILB IP using the trust interface gateway IP as the next hop.
4. Add static routes for pod and service subnets (from Step 1.4) with next hop set to `ethernet1/2` (trust) and the trust subnet gateway IP.
5. Add a source NAT rule: Source Zone `trust`, Destination Zone `untrust`, Interface `ethernet1/1`, Dynamic IP and Port.
6. Create a security policy with `Allow` action and the AI Security Profile Group. Ensure health checks from the GCP Load Balancer to the ILB IP are permitted.
7. Navigate to **Configuration** > **Push Config** and push.

> **Success: Verification**
>
> Push completes successfully. Logical router, NAT rule, and security policy are active on the firewall.

#### Panorama

##### Step 2.1--2.2: Configure GCP (Panorama)

Follow the same dual-interface, single-router configuration as the SCM path, using the Panorama UI:

1. Configure interfaces under **Network** > **Interfaces**.
2. Configure a loopback with the ILB private IP.
3. Create zones under **Network** > **Zones**.
4. Create a logical router under **Network** > **Logical Routers** with static routes for ILB, pod subnets, and service subnets.
5. Create a source NAT rule under **Policies** > **NAT**.
6. Create a security policy under **Policies** > **Security** with `Allow` action.
7. Navigate to **Commit** > **Commit and Push**.

> **Note: Advanced Routing**
>
> Advanced routing is enabled by default on AIRS AI Runtime Firewall. Configure a Logical Router instead of a Virtual Router.

> **Success: Verification**
>
> Commit and Push completes successfully. Firewall shows `Connected` in Panorama.


## Phase 3: Install Helm Chart (PAN-CNI)

The PAN-CNI Helm chart deploys a DaemonSet that intercepts annotated pod traffic and redirects it to the AIRS firewall. The chart is included in the Terraform download from SCM, or cloned from GitHub for private cloud deployments.

### Step 3.1: Extract and Navigate to the Helm Chart

1. Extract the Terraform download:

   ```bash
   tar -xvzf <your-terraform-download.tar.gz>
   ```

2. Navigate to the Helm directory based on protection level:
   - **VPC-level**:

     ```bash
     cd <unzipped-folder>/architecture/helm
     ```

   - **Namespace-level**:

     ```bash
     cd <unzipped-folder>/architecture/helm-<app-name>
     ```

     Namespace-level deployments generate separate Helm charts per protected namespace. Repeat the install process for each.

> **Note: OpenShift / Rancher (Private Cloud)**
>
> For private cloud deployments, clone the Helm chart from [github.com/PaloAltoNetworks/prisma-airs-helm](https://github.com/PaloAltoNetworks/prisma-airs-helm) instead of extracting from the Terraform download.

> **Success: Verification**
>
> The directory contains `Chart.yaml`, `values.yaml`, and a `templates/` subdirectory.

### Step 3.2: Review and Update values.yaml

The `values.yaml` file contains cluster-specific parameters that must be verified before installation.

#### AWS

AWS deployments must update the GWLB endpoint IPs. These are created during the Terraform `application_project` deployment.

1. Navigate to the [AWS VPC Console](https://console.aws.amazon.com/vpc/) > **Endpoints**.
2. Under the **Subnets** tab, copy the IP addresses for each availability zone.
3. Edit `values.yaml`:

   ```yaml
   # GWLB VPC endpoint zone1 IP address.
   endpoints1: "10.0.1.100"
   endpoints1zone: us-east-1a

   # GWLB VPC endpoint zone2 IP address.
   endpoints2: "10.0.2.100"
   endpoints2zone: us-east-1b

   # PAN CNI image.
   cniimage: gcr.io/pan-cn-series/airs/pan-cni:latest

   # Resource namespace name.
   namespace: kube-system

   # Kubernetes ClusterID value range 1-2048.
   clusterid: 1
   ```

4. Set `endpoints1` and `endpoints2` to the GWLB endpoint IPs from the console.
5. Set `clusterid` to a unique value (1--2048) for this cluster.

#### Azure / GCP

Azure and GCP deployments do not require GWLB endpoint configuration. Review and adjust the `clusterid` and `namespace` values.

1. Open `values.yaml`.
2. Set `clusterid` to a unique value (1--2048) for this cluster.
3. Confirm `namespace` is set to `kube-system`.

> **Note: Azure CNI Requirement**
>
> For AKS clusters, enable **Bring your own Azure virtual network** in the Azure Portal under **Kubernetes services** > **[Cluster]** > **Settings** > **Networking** > **Network configuration** > **Azure CNI**. This allows PAN-CNI to discover Kubernetes-related VNets.

#### Private Cloud

Private cloud (OpenShift/Rancher) uses the firewall trust interface IP instead of GWLB endpoints.

```yaml
# Firewall trust interface IP Address for on-prem
endpoints: 10.101.255.253

# PAN CNI image
cniimage: gcr.io/pan-cn-series/airs/pan-cni:latest

# AI firewall trust CIDR (optional, reduces hops for east-west)
fwtrustcidr: ""

# Resource namespace name
namespace: kube-system

# Kubernetes Cluster ID (1-2048)
clusterid: 1
```

Set `endpoints` to the trust interface IP of the standalone firewall. For active/passive HA, use the active-primary trust IP.

> **Success: Verification**
>
> `values.yaml` contains valid endpoint IPs (or firewall trust IP for private cloud), the correct availability zones, and a unique `clusterid`.

### Step 3.3: Install the Helm Chart

1. For **VPC-level** protection:

   ```bash
   helm install ai-runtime-security helm --namespace kube-system --values helm/values.yaml
   ```

2. For **namespace-level** protection:

   ```bash
   helm install ai-runtime-security helm-<app-name> --namespace kube-system --values helm-<app-name>/values.yaml
   ```

   Repeat for each namespace-specific Helm chart.

> **Warning: CNI Installed but Not Yet Active**
>
> Installing the Helm chart deploys the PAN-CNI DaemonSet, but pod traffic is **not redirected** until namespaces or pods are annotated in Step 3.5. The CNI is dormant until annotations trigger protection.

> **Success: Verification**
>
> Helm reports `STATUS: deployed` in the output.

### Step 3.4: Verify Helm Installation

Run these verification commands to confirm all PAN-CNI components are running.

1. List Helm releases:

   ```bash
   helm list -A
   ```

   Expected output:

   ```
   NAME                 NAMESPACE    REVISION  UPDATED                  STATUS    CHART                       APP VERSION
   ai-runtime-security  kube-system  1         2024-08-13 07:00 PDT     deployed  ai-runtime-security-0.1.0  11.2.2
   ```

2. Check pod status:

   ```bash
   kubectl get pods -A | grep pan-cni
   ```

   Pods named `pan-cni-*****` must show `Running`.

3. Check endpoint slices:

   ```bash
   kubectl get endpointslice -n kube-system | grep pan
   ```

4. Check Kubernetes resources:

   ```bash
   kubectl get serviceaccounts -n kube-system | grep pan
   kubectl get secrets -n kube-system | grep pan
   kubectl get svc -n kube-system | grep pan
   ```

> **Success: Verification**
>
> All `pan-cni-*****` pods are `Running`. Resources `pan-cni-sa` (service account), `pan-plugin-user-secret` (secret), and `pan-ngfw-svc` (service) exist in the `kube-system` namespace. Endpoint slices show ILB or firewall trust IP addresses.

### Step 3.5: Annotate Namespaces and Pods

Annotations tell PAN-CNI which pods to redirect through the firewall. Without annotation, pods are not protected.

1. For **VPC-level** protection -- annotate each namespace:

   ```bash
   kubectl annotate namespace <namespace> paloaltonetworks.com/firewall=pan-fw
   ```

2. For **namespace-level** protection -- annotate all pods:

   ```bash
   kubectl annotate pods --all paloaltonetworks.com/subnetfirewall=ns-secure/bypassfirewall
   ```

   > **Warning: Annotation Value Naming**
   >
   > The annotation value `ns-secure/bypassfirewall` is misleading -- it does **not** bypass the firewall. This value instructs PAN-CNI to redirect the pod's traffic through the firewall for namespace-level subnet-based inspection. The name is a legacy artifact from the internal CNI routing logic.

3. For **OpenShift** -- use the Multus CNI annotation instead:

   ```bash
   kubectl annotate namespace <namespace> k8s.v1.cni.cncf.io/networks=pan-cni
   ```

   Also deploy the `NetworkAttachmentDefinition` in each application namespace:

   ```bash
   kubectl apply -f pan-cni-net-attach-def.yaml -n <target-namespace>
   ```

> **Success: Verification**
>
> Run `kubectl describe namespace <namespace>` and confirm the annotation appears (e.g., `paloaltonetworks.com/firewall=pan-fw`).

### Step 3.6: Restart Application Pods

Existing pods must be restarted after annotation for PAN-CNI to inject its routing rules. New pods created after annotation are automatically protected.

1. Restart pods in the annotated namespace:

   ```bash
   kubectl rollout restart deployment -n <namespace>
   ```

2. Wait for pods to reach `Running` state:

   ```bash
   kubectl get pods -n <namespace> -w
   ```

> **Success: Verification**
>
> All restarted pods show `Running` status. Pod traffic now routes through the AIRS firewall for inspection.


## Phase 4: Deploy Tag Collector Agent (Optional)

The Tag Collector Agent enables IP tag harvesting from **private** Kubernetes clusters. This is optional -- skip this phase if all target clusters have public API server endpoints, or if granular DAG-based security policies are not required.

> **Warning: AWS and Azure Private Clusters Only**
>
> In PAN-OS `11.2.10-h2` and later, the tag collector only harvests IP tags from AWS and Azure **private** Kubernetes clusters. Public clusters on AWS/Azure and all GCP clusters are not supported for tag collection.

### AWS

#### Step 4.1: Create Tag Collector Deployment in SCM (AWS)

The SCM wizard generates the Terraform template for the Tag Collector Agent infrastructure.

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com/).
2. Navigate to **AI Security** > **AI Runtime Firewall**.
3. Click the **+** icon and select **Add Agent Deployment**.
4. Select **AWS** and click **Next**.
5. Enter a descriptive **Name**.
6. Select the **Cloud Account** and **Cloud Region**. Click **Next**.
7. Enter the **VPC CIDR** for the tag collector deployment.
8. Enter **Allowed Management Access** CIDR ranges.
9. Select the **Zone**.
10. Configure the Transit Gateway (TGW):
    - **New TGW**: Enter the Autonomous System Number, select the AWS account, and select accounts with private workloads.
    - **Existing TGW**: Select the TGW Cloud Account and TGW ID, then select accounts with private workloads.
11. Configure Management IP, RAM, SSH Key, Device ID/PIN, SCM folder, PAN-OS version, VM size, and Authcode.
12. Click **Next**.
13. Enter a **Terraform Template Name** and download the template.

> **Success: Verification**
>
> The Terraform template ZIP file downloads successfully. It contains `architecture/tgw_project`, `architecture/tc_project`, and `architecture/tc_iam_project` subdirectories.

#### Step 4.2: Execute Tag Collector Terraform (AWS)

Deploy the Terraform templates in order: `tgw_project` > `tc_project` > `tc_iam_project`.

1. Extract the download and navigate to `architecture/`.
2. If creating a **new TGW**, deploy `tgw_project` first:

   ```bash
   cd tgw_project
   terraform init && terraform plan && terraform apply
   ```

3. Copy the TGW ID from the output into `tc_project/terraform.tfvars`:

   ```
   id = "<new-tgw-unique-identifier>"
   ```

4. Deploy `tc_project`:

   ```bash
   cd ../tc_project
   terraform init && terraform plan && terraform apply
   ```

5. Deploy `tc_iam_project`:

   ```bash
   cd ../tc_iam_project
   terraform init && terraform plan && terraform apply
   ```

> **Success: Verification**
>
> All three Terraform applies complete without errors. The tag collector VM is running in the AWS console.

#### Step 4.3: Configure TGW Attachments and Routes (AWS)

After deploying all three Terraform templates, manually configure TGW attachments and route tables to allow the tag collector to communicate with private clusters.

1. Create a TGW attachment for each private cluster VPC. Add routes to the route table for the tag collector CIDR.
2. Create a TGW route table for the tag collector TGW attachment. Add routes for each private cluster CIDR.
3. Update the tag collector security group to allow traffic from the private cluster management CIDR.
4. Update the private cluster security group to allow traffic from the tag collector management CIDR.

> **Success: Verification**
>
> TGW attachments show `Available` in the AWS console. Route tables contain entries for both the tag collector and private cluster CIDRs.

### Azure

#### Step 4.1: Create Tag Collector Deployment in SCM (Azure)

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com/).
2. Navigate to **AI Security** > **AI Runtime Firewall**.
3. Click **+** and select **Add Agent Deployment**.
4. Select **Azure** and click **Next**.
5. Enter Name, Cloud Account, Cloud Region. Click **Next**.
6. Enter VPC CIDR, management access CIDRs.
7. Select accounts with private workloads from **Accounts to pull IP/Tags from**.
8. Configure Management IP, SSH Key, Device ID/PIN, SCM folder, PAN-OS version, VM size, and Authcode.
9. Click **Next**, enter Terraform Template Name, and download.

> **Success: Verification**
>
> The Terraform ZIP downloads with `architecture/tc_project` and `architecture/tc_peer_project` subdirectories.

#### Step 4.2: Configure and Execute Terraform (Azure)

1. Edit `tc_project/terraform.tfvars` with private cluster details. The private cluster ID format:

   ```
   /subscriptions/<sub-id>/resourceGroups/<rg-name>/providers/Microsoft.Network/virtualNetworks/<private-cluster>
   ```

2. Add VNet details for each private cluster in the `vnets` block.
3. Update the `private_cluster_dns_tc_peering` block with each cluster's resource group name and private DNS name.
4. Deploy `tc_project`:

   ```bash
   cd architecture/tc_project
   terraform init && terraform plan && terraform apply
   ```

5. Deploy `tc_peer_project`:

   ```bash
   cd ../tc_peer_project
   terraform init && terraform plan && terraform apply
   ```

> **Success: Verification**
>
> Both Terraform applies complete without errors. VNet peering shows `Connected` in the Azure Portal under the tag collector VNet.


## Phase 5: Configure IP Tag Harvesting

IP tag harvesting collects Kubernetes metadata (namespace, service, pod labels) and maps them to IP addresses. These tags feed into Dynamic Address Groups (DAGs) for granular security policy enforcement. The configuration path differs significantly between SCM-managed and Panorama-managed firewalls.

> **Note: Which path should I pick?**
>
> - **SCM path** -- the tag collector is deployed as part of the AIRS Terraform and sends IP-tags to SCM via the Cloud Identity Engine (CIE). Configure redistribution in SCM.
> - **Panorama path** -- the Kubernetes plugin on Panorama directly connects to cluster API servers. Configure cluster onboarding, monitoring definitions, and notify groups in Panorama.

### SCM

#### Step 5.1: Verify Tag Collector Mode (SCM)

The AIRS deployment Terraform automatically enables tag collector mode on the firewall. Verify this is active.

1. SSH into the tag collector firewall and run:

   ```
   show system info | match tag-collector-mode
   ```

> **Success: Verification**
>
> Output shows `tag-collector-mode: enabled`.

#### Step 5.2: Set SCM Region (SCM)

Configure the tag collector to send IP-tags to the correct SCM region.

1. View available regions:

   ```
   request plugins kubernetes set-tag-collector-config region
   ```

2. Set the region:

   ```
   request plugins kubernetes set-tag-collector-config region <region_name>
   ```

> **Success: Verification**
>
> The command completes without error. The region name matches the SCM tenant region.

#### Step 5.3: Configure Cluster Credentials (SCM)

Provide the tag collector with credentials to access each Kubernetes cluster's API server.

1. Transfer the service account credential file to the tag collector (via SCP or base64 encoding).
2. Configure the cluster:

   ```
   set deviceconfig plugins kubernetes setup \
   cluster-credentials <cluster_name> \
   api-server-address <cluster-external-endpoint-ip> \
   cluster-type [GKE|AKS|EKS] \
   cluster-credential-file \
   [GCP-service-account-json|AWS-credentials-file|Azure-credentials-file] <filename>
   labels no-labels
   ```

> **Note: Cluster Endpoint IP**
>
> Use the cluster's external endpoint IP. For GKE: **Kubernetes Engine** > **Clusters** > **[Cluster]** > **External endpoint**. For EKS: **EKS Console** > **[Cluster]** > **API server endpoint**. For AKS: **Kubernetes services** > **[Cluster]** > **Properties** > **API server address**.

> **Success: Verification**
>
> The command completes without error. Cluster name is registered in the plugin configuration.

#### Step 5.4: Create Monitoring Definition and Commit (SCM)

1. Create a monitoring definition:

   ```
   set deviceconfig plugins kubernetes \
   monitoring-definition <mon_def_name> \
   cluster-credentials <cluster_name> \
   enable yes
   ```

   > **Note: One-to-One Mapping**
   >
   > Each monitoring definition maps to exactly one cluster. One monitoring definition per cluster, one cluster per monitoring definition.

2. Commit:

   ```
   commit
   ```

3. Verify cluster status:

   ```
   show plugins kubernetes status
   ```

> **Success: Verification**
>
> Cluster status shows `Connected`.

#### Step 5.5: Configure Redistribution Agent in SCM

Configure the tag collector as an [Identity Redistribution](https://docs.paloaltonetworks.com/strata-cloud-manager/getting-started/manage-configuration-ngfw-and-prisma-access/identity-services/identity-redistribution) agent so the AIRS firewall receives the harvested IP-to-tag mappings.

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com/).
2. Navigate to **Configuration** > **NGFW and Prisma Access** > **Identity Services** > **Identity Redistribution**.
3. Set the **Configuration Scope**.
4. Click **Add Agent**.
5. Configure:

   | Field | Value |
   |---|---|
   | Name | Descriptive name for the agent |
   | Enabled | Yes |
   | Host | Tag collector IP address |
   | Port | `5007` (default) |
   | Data Type Mapping | Select **IP to Tag** |

6. Click **Save**, then **Commit**, then **Push Config**.
7. If the `userid` service is disabled on the tag collector, enable it:

   ```
   configure
   set deviceconfig system service disable-userid-service no
   commit
   ```

8. Verify redistribution client connectivity:

   ```
   show redistribution service client all
   ```

> **Success: Verification**
>
> Redistribution client output shows the AIRS firewall IP with `Status: idle` and `Redistribution: ITUH` (indicating IP-to-User/Host/Tag mapping is active).

#### Step 5.6: Create Dynamic Address Groups (SCM)

1. Navigate to **Configuration** > **NGFW and Prisma Access** > **Objects** > **Address** > **Address Groups**.
2. Click **Add Address Group**.
3. Enter a **Name** and **Description**.
4. Set **Type** to `Dynamic`.
5. Click **Add Match Criteria**.
6. Switch to the **CIE** tab to view Kubernetes tags sent from the tag collector.
7. Select the required Kubernetes tags (e.g., `k8s.ns_<namespace>`, `k8s.svc_<service>`).
8. Click **Save**.

> **Success: Verification**
>
> The Dynamic Address Group appears under **Address Groups** with `Dynamic` type and CIE-based match criteria showing Kubernetes tags.

#### Step 5.7: Create Security Policy with DAGs (SCM)

1. Navigate to **Security Services** > **Security Policy** > **Add Rule**.
2. Enter a **Name** and **Description**.
3. Under **Source** > **Addresses**, select the Dynamic Address Group created above.
4. Set the action to **Allow** or **Deny**.
5. Attach the AI Security Profile Group.
6. Click **Save**.
7. Select **Push Config** to push to the AIRS firewall.

> **Success: Verification**
>
> After a successful push, verify IP-tags are registered on the firewall:
>
> ```
> show object registered-ip all
> ```
>
> Output should show registered IPs with Kubernetes tags like `k8s.ns_gmp-system` and `k8s.svc_metrics-server`.

### Panorama

#### Step 5.1: Onboard Cluster in Panorama Kubernetes Plugin

The Panorama Kubernetes plugin connects directly to cluster API servers to harvest IP-tag information.

1. [Log in to Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/access-and-navigate-panorama-management-interfaces/log-in-to-the-panorama-web-interface).
2. Navigate to **Panorama** > **Plugins** > **Kubernetes** > **Setup** > **General**.
3. Ensure **Enable Monitoring** is checked.
4. Set the **Monitoring Interval** (30--300 seconds; default is 30).
5. Navigate to **Setup** > **Cluster** and click **Add Cluster**.
6. Enter a **Name** (up to 20 characters, cannot be changed after creation).
7. Enter the **API Server Address** (hostname or IP:port; port 443 is default).
8. Select the environment **Type** (AKS, EKS, GKE, Native Kubernetes, OpenShift, or Other).
9. Upload the service account **Credential** file (`plugin-svc-acct.json`). See [Create Service Accounts for Cluster Authentication](https://docs.paloaltonetworks.com/cn-series/getting-started/cn-series-deployment-prereq/create-service-accounts-for-cluster-authentication-with-cn-series).
10. Click **OK**.

> **Warning: One Cluster per Panorama**
>
> Do not add the same Kubernetes cluster to more than one Panorama appliance (or HA pair). Duplicate registrations cause inconsistencies in IP-to-tag mappings across device groups.

> **Success: Verification**
>
> The cluster appears in the Kubernetes plugin cluster list with connection status showing successful authentication.

#### Step 5.2: Add Notify Group and Monitoring Definition (Panorama)

1. Navigate to **Panorama** > **Plugins** > **Kubernetes**.
2. Add a **Notify Group** specifying the device groups that should receive IP-to-tag mappings.
3. Add a **Monitoring Definition** for each onboarded cluster:
   - Select the cluster credential.
   - Enable monitoring.
   - Associate with the Notify Group.

> **Success: Verification**
>
> Monitoring Definition shows `Enabled` with the correct cluster and Notify Group assigned.

#### Step 5.3: Create Dynamic Address Group and Security Policy (Panorama)

1. Navigate to **Objects** > **Address Groups** > **Add**.
2. Set **Type** to `Dynamic`.
3. Add match criteria using the Kubernetes tags pushed by the plugin.
4. Navigate to **Policies** > **Security** > **Add**.
5. Set the **Destination Address** to the Dynamic Address Group.
6. Set the action and attach the AI Security Profile Group.
7. Navigate to **Commit** > **Commit and Push**.

> **Success: Verification**
>
> After Commit and Push, verify tags on the firewall CLI:
>
> ```
> show object registered-ip all
> ```
>
> Output shows registered IPs with Kubernetes tags (e.g., `k8s.ns_<namespace>`, `k8s.svc_<service>`).


## Phase 6: Configure Traffic Objects (Optional)

Traffic objects map cloud entities (K8s clusters or VPC endpoints) to zones, enabling zone-based security policy rules that target specific clusters or endpoints. This is optional -- basic K8s protection works without traffic objects. Add them when granular per-cluster or per-VPC security policies are required.

### SCM

#### Step 6.1: Create Traffic Object (SCM)

Traffic objects create sub-interfaces mapped to zones, enabling per-cluster security policies.

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com/).
2. Navigate to **Configuration** > **NGFW and Prisma Access** > **Objects** > **Traffic Objects**.
3. Click **Add Traffic Object**.
4. Configure:

   | Field | Value |
   |---|---|
   | Name | Descriptive name |
   | Type | `K8s Cluster ID` or `VPC Endpoint ID` |
   | Traffic Object ID | Cluster ID (1--2048, from `values.yaml`) or VPC Endpoint ID (`vpce-xxxxxxxxxxxxxxxxx`) |
   | Zone | Select existing or create new zone |
   | Router | Select the logical router |

5. Click **Save**.
6. Attach the zone to a security policy rule. Push configuration.

> **Note: ClusterID Source**
>
> The `clusterid` value comes from the `values.yaml` file configured in Phase 3 (Step 3.2). This must match exactly.

> **Success: Verification**
>
> The traffic object appears under **Objects** > **Traffic Objects**. A sub-interface is created and mapped to the selected zone. The zone can be used in security policy rules for per-cluster enforcement.

### Panorama

#### Step 6.1: Create Traffic Object (Panorama)

1. [Log in to Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/access-and-navigate-panorama-management-interfaces/log-in-to-the-panorama-web-interface).
2. Navigate to **Network** > **Traffic Objects**.
3. Click **Add**.
4. Enter a **Name**, select the **Location** (virtual system).
5. Set **Type** to `K8s Cluster ID` or `VPC Endpoint ID`.
6. Enter the **Traffic Object ID** (1--2048 for K8s, or `vpce-xxxxxxxxxxxxxxxxx` for VPC).
7. Select the ingress **Zone** and **Logical Router**.
8. Click **OK**.
9. Attach the zone to a security policy, then **Commit and Push**.

> **Note: Advanced Routing**
>
> Advanced routing is enabled by default on AIRS firewalls. Configure a Logical Router, not a Virtual Router.

> **Success: Verification**
>
> Traffic object appears under **Network** > **Traffic Objects**. The sub-interface is created and attached to the selected zone. After Commit and Push, the firewall shows the traffic object sub-interfaces.


## Validation

### Validate PAN-CNI Pods

1. Confirm all PAN-CNI pods are running:

   ```bash
   kubectl get pods -A | grep pan-cni
   ```

   Each node should have a `pan-cni` pod in `Running` state.

2. Verify namespace annotations:

   ```bash
   kubectl describe namespace <protected-namespace>
   ```

   Annotations should include `paloaltonetworks.com/firewall=pan-fw`.

> **Success: Verification**
>
> PAN-CNI pods are `Running` on all cluster nodes. Protected namespaces show the correct annotation.

### Validate IP Tag Harvesting

1. On the AIRS firewall CLI, check registered IP-to-tag mappings:

   ```
   show object registered-ip all
   ```

   Expected output shows pod IPs with Kubernetes tags:

   ```
   registered IP            Tags
   --------------------------  --------
   10.111.22.108 *           "k8s.ns_gmp-system (never expire)"
                             "k8s.ns_gmp-operator (never expire)"
   10.111.19.125 *           "k8s.svc_metrics-server (never expire)"
   ```

2. Verify the tag collector plugin status (if using SCM path):

   ```
   show plugins kubernetes status
   ```

> **Success: Verification**
>
> Registered IPs appear with `k8s.ns_*`, `k8s.svc_*`, and other Kubernetes tags. Cluster status shows `Connected`.

### Validate Security Policy Enforcement

Generate test traffic between protected pods to confirm the firewall is inspecting K8s traffic.

1. Enter a secured pod:

   ```bash
   kubectl exec -it <pod-name> -n <secured-namespace> -- bash
   ```

2. Send an HTTP request to another secured pod:

   ```bash
   wget http://<target-pod-ip>
   ```

3. On the firewall CLI, verify the session:

   ```
   show session all filter source <source-pod-ip>
   ```

4. Inspect the session detail to confirm the security policy rule is applied:

   ```
   show session id <session-id>
   ```

   The output should show the security policy rule name (e.g., `rule: allow-all-E_W`).

> **Success: Verification**
>
> Sessions appear in the firewall session table with the expected security rule applied. Traffic between secured pods traverses the firewall. AI security inspections are logged in SCM or Panorama monitor views.

### Validate Traffic Objects (If Configured)

1. Verify traffic object sub-interfaces on the firewall:

   ```
   show interface all
   ```

   Sub-interfaces created by traffic objects should appear with the assigned zone.

2. Verify the traffic object zone appears in security policy matches for cluster-specific traffic.

> **Success: Verification**
>
> Traffic object sub-interfaces appear in the interface list. Security policy logs show traffic matching rules that reference the traffic object zone.


## Troubleshooting

### PAN-CNI Pod Not Starting

| Symptom | Cause | Fix |
|---|---|---|
| `pan-cni` pod stuck in `CrashLoopBackOff` | Invalid `values.yaml` parameters (wrong endpoint IPs or cluster ID) | Check `kubectl logs <pan-cni-pod> -n kube-system`. Correct `values.yaml` and run `helm upgrade`. |
| `pan-cni` pod stuck in `Pending` | Insufficient node resources or taints preventing scheduling | Verify node capacity with `kubectl describe node`. Remove taints if applicable. |
| `ImagePullBackOff` | Cannot pull `gcr.io/pan-cn-series/airs/pan-cni:latest` | Verify network connectivity to `gcr.io`. Check if nodes have correct IAM permissions for image pulling. |
| GKE Autopilot cluster | Autopilot restricts `kube-system` namespace modifications | Use GKE Standard cluster instead. Autopilot is not supported. |

> **Success: Verification**
>
> After fixing, all `pan-cni` pods show `Running` status.

### Tags Not Appearing on Firewall

| Symptom | Cause | Fix |
|---|---|---|
| `show object registered-ip all` returns empty | Tag collector not connected to cluster API | Check `show plugins kubernetes status`. Verify cluster credentials and API server endpoint. |
| Tags appear on tag collector but not on AIRS firewall | Redistribution agent misconfigured or `userid` service disabled | Verify redistribution agent config in SCM. Enable `userid`: `set deviceconfig system service disable-userid-service no`. |
| Tags appear but Dynamic Address Group is empty | Match criteria do not match the tag format | Tags use format `k8s.ns_<namespace>`, `k8s.svc_<service>`. Verify DAG match criteria in SCM/Panorama. |
| Public cluster or GCP cluster tags not appearing | Tag collector only supports AWS/Azure private clusters | This is a platform limitation in PAN-OS 11.2.10-h2+. Use standard cloud asset discovery for public clusters. |

> **Success: Verification**
>
> `show object registered-ip all` returns populated IP-to-tag mappings.

### Helm Install Failures

| Symptom | Cause | Fix |
|---|---|---|
| `Error: INSTALLATION FAILED` | Missing cluster admin permissions | Run `kubectl auth can-i create daemonset -n kube-system`. Must return `yes`. |
| `namespace "kube-system" not found` | kubectl context pointing to wrong cluster | Verify with `kubectl config current-context`. Switch context if needed. |
| `Release already exists` | Previous install attempt left a release | Run `helm uninstall ai-runtime-security -n kube-system` then reinstall. |

> **Success: Verification**
>
> `helm list -A` shows `ai-runtime-security` with `STATUS: deployed`.

### Tag Collector Connectivity Issues

| Symptom | Cause | Fix |
|---|---|---|
| Tag collector cannot reach private cluster API | TGW attachment or VNet peering not configured | Verify TGW attachments (AWS) or VNet peering status (Azure). Check route tables for correct CIDR entries. |
| Tag collector shows `Disconnected` | Security group / NSG blocking traffic | Update security groups to allow traffic between tag collector and cluster management CIDRs. |
| Redistribution client shows no connection | Port 5007 blocked between tag collector and AIRS firewall | Verify network connectivity on port `5007`. Check firewall rules in the cloud provider. |

> **Success: Verification**
>
> `show plugins kubernetes status` shows `Connected`. `show redistribution service client all` shows active redistribution clients.


## Reference

### Helm Chart values.yaml Parameters

| Parameter | Description | Default | Required |
|---|---|---|---|
| `endpoints1` | GWLB VPC endpoint zone 1 IP (AWS only) | `""` | AWS: Yes |
| `endpoints1zone` | AWS availability zone for endpoint 1 | `us-east-1a` | AWS: Yes |
| `endpoints2` | GWLB VPC endpoint zone 2 IP (AWS only) | `""` | AWS: Yes |
| `endpoints2zone` | AWS availability zone for endpoint 2 | `us-east-1b` | AWS: Yes |
| `endpoints` | Firewall trust interface IP (private cloud only) | `10.101.255.253` | Private: Yes |
| `cniimage` | PAN-CNI container image | `gcr.io/pan-cn-series/airs/pan-cni:latest` | Yes |
| `namespace` | Kubernetes namespace for PAN-CNI | `kube-system` | Yes |
| `clusterid` | Unique cluster identifier (1--2048) | `1` | Yes |
| `fwtrustcidr` | Firewall trust CIDR for east-west optimization (private cloud) | `""` | No |

> **Success: Verification**
>
> All required parameters are set in `values.yaml` before running `helm install`.

### PAN-CNI Annotations Reference

| Annotation | Protection Level | Apply To |
|---|---|---|
| `paloaltonetworks.com/firewall=pan-fw` | VPC-level | Namespace |
| `paloaltonetworks.com/subnetfirewall=ns-secure/bypassfirewall` | Namespace-level | Individual pods |
| `k8s.v1.cni.cncf.io/networks=pan-cni` | OpenShift (Multus) | Namespace |

> **Success: Verification**
>
> The correct annotation is applied for the deployment type. Run `kubectl describe namespace <ns>` or `kubectl describe pod <pod> -n <ns>` to confirm.

### IP Tag Format Reference

The tag collector creates tags in these formats for Dynamic Address Group match criteria:

| Tag Format | Description | Example |
|---|---|---|
| `k8s.ns_<namespace>` | Kubernetes namespace | `k8s.ns_gmp-system` |
| `k8s.svc_<service>` | Kubernetes service | `k8s.svc_metrics-server` |
| `k8s.ns_<operator>` | Kubernetes operator/controller | `k8s.ns_gmp-operator` |

Tags are registered with `(never expire)` lifetime. They update dynamically as pods are created and destroyed.

> **Success: Verification**
>
> Run `show object registered-ip all` on the firewall to see the current tag mappings and their format.

### Supported Cluster Types

| Cluster Type | PAN-CNI | Tag Harvesting | Notes |
|---|---|---|---|
| EKS (public) | Yes | No | Use cloud asset discovery |
| EKS (private) | Yes | Yes (11.2.10-h2+) | Requires Tag Collector Agent |
| AKS (public) | Yes | No | Use cloud asset discovery |
| AKS (private) | Yes | Yes (11.2.10-h2+) | Requires Tag Collector Agent |
| GKE Standard | Yes | No | GKE tag harvesting not supported |
| GKE Autopilot | No | No | `kube-system` modifications blocked |
| OpenShift | Yes (Multus) | Yes (Panorama plugin) | Requires PAN-OS 11.2.5+, K8s plugin 3.0.4 |
| Rancher | Yes (Multus) | Yes (Panorama plugin) | Requires PAN-OS 11.2.5+, K8s plugin 3.0.4 |

> **Success: Verification**
>
> The target cluster type appears in the supported list above. If not supported for tag harvesting, use standard cloud asset discovery for visibility.


## Deployment Checklist

### Phase 1: Prerequisites

- [ ] AIRS firewall deployed and connected (Core Guide complete)
- [ ] AI Security Profiles configured
- [ ] Helm v3 and kubectl installed
- [ ] Cluster admin access confirmed
- [ ] Pod and Service subnet CIDRs recorded
- [ ] Panorama version 11.2.5+ and K8s plugin 3.0.4+ (Panorama only)

### Phase 2: Firewall Configuration

- [ ] Interfaces configured (trust / untrust as applicable)
- [ ] Loopback configured with ILB IP (Azure / GCP)
- [ ] Zones created and assigned to interfaces
- [ ] Logical router(s) with static routes for RFC 1918 + pod/service subnets
- [ ] Health probe routes configured (Azure: 168.63.129.16/32)
- [ ] NAT policies created (source NAT for overlay; inbound/outbound for Azure)
- [ ] Security policy with Allow action and AI profile group
- [ ] Configuration pushed successfully

### Phase 3: Helm Installation

- [ ] Terraform download extracted
- [ ] values.yaml updated with GWLB endpoints (AWS) or cluster settings
- [ ] Helm chart installed in kube-system namespace
- [ ] pan-cni pods Running on all nodes
- [ ] Endpoint slices, service accounts, secrets, and services verified
- [ ] Namespaces/pods annotated for protection
- [ ] Application pods restarted

### Phase 4: Tag Collector (Optional)

- [ ] Tag collector deployment created in SCM
- [ ] Terraform templates deployed in correct order
- [ ] TGW/VNet peering configured for private cluster connectivity
- [ ] Security groups updated for tag collector communication

### Phase 5: IP Tag Harvesting (Optional)

- [ ] Tag collector mode enabled
- [ ] Cluster credentials configured
- [ ] Monitoring definitions created
- [ ] Redistribution agent configured (SCM) or Notify Group set (Panorama)
- [ ] Dynamic Address Groups created with CIE/K8s tag criteria
- [ ] Security policy rules with DAGs pushed
- [ ] Registered IPs show K8s tags on firewall CLI

### Phase 6: Traffic Objects (Optional)

- [ ] Traffic objects created with correct cluster ID / VPC endpoint ID
- [ ] Zones assigned and attached to security policies
- [ ] Sub-interfaces visible on firewall

### Validation

- [ ] PAN-CNI pods Running on all nodes
- [ ] Namespace annotations confirmed
- [ ] IP-to-tag mappings visible (show object registered-ip all)
- [ ] Test traffic between secured pods creates firewall sessions
- [ ] Security policy rules applied to K8s traffic
- [ ] AI security inspections logged in SCM/Panorama
