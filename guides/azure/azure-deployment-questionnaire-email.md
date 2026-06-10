**Subject:** VM-Series on Azure — Pre-Deployment Information Needed

Hi,

To prepare your customized Terraform deployment package for VM-Series on Azure, I need to collect some information about your environment. I've organized this into sections below — please fill in what you can and flag anything you're unsure about. We'll work through any gaps together.

---

**ABOUT EXISTING INFRASTRUCTURE**

The official Palo Alto Networks Terraform modules are designed to deploy the complete transit VNet — VNet, subnets, NSGs, route tables, load balancers, and VM-Series firewalls — as a single managed unit. This is the preferred approach because the firewall deployment has many tightly coupled moving parts: subnet-to-NSG bindings, blackhole UDRs between zones, load balancer backend pool associations, and availability zone placement all need to be coordinated precisely.

That said, we can modify the Terraform to work with existing infrastructure — for example, peering into a VNet you've already provisioned, reusing existing NSGs or route tables, or attaching to load balancers managed outside of Terraform. This is common in enterprises where networking teams provision VNets independently or where the transit VNet was created through a landing zone accelerator. Just let me know what's already in place and we'll adapt accordingly.

---

**1. AZURE SUBSCRIPTION & IDENTITY**

- Azure Subscription ID:
- Azure Tenant ID:
- Target Azure Region (e.g., East US, West Europe):
- Resource Group Name (for the transit VNet and firewalls):
- Name Prefix (prepended to all resource names, e.g., `prod-`, `customer-`):
- How will Terraform authenticate? (az login / Service Principal / Managed Identity / Cloud Shell):
- Service Principal App ID (if applicable):
- Required resource tags (list key=value pairs, e.g., CostCenter=12345, Environment=Production):

---

**2. EXISTING INFRASTRUCTURE**

Transit VNet:
- [ ] Greenfield — Terraform creates everything from scratch (recommended)
- [ ] VNet exists — but firewall subnets still need to be created
- [ ] VNet + subnets exist — VNet and required subnets (mgmt, public, private) already exist
- [ ] Full brownfield — VNet, subnets, NSGs, route tables, and/or load balancers already exist

If the VNet already exists, provide:
- VNet name:
- VNet resource group:
- Existing subnet names (mgmt, public, private):

Are NSGs managed by this Terraform deployment or by another team/tool?
Are route tables managed by this Terraform deployment or by another team/tool?
Are load balancers managed by this Terraform deployment, or do existing LBs need to be reused?

Spoke VNets — do any existing spoke VNets need peering to the transit VNet? If so, list each with its name, resource group, address space, and purpose.

Panorama in Azure — is Panorama running in an Azure VNet that needs peering to the transit? If yes, provide the Panorama VNet name and resource group. If Panorama is on-prem or accessed via VPN/ExpressRoute, just note that.

Terraform state backend:
- [ ] Need Terraform to create the state backend (Storage Account)
- [ ] Already have a state backend — Storage Account name / container / key path:
- [ ] Using Terraform Cloud
- [ ] Local state only

---

**3. ARCHITECTURE MODEL**

Which deployment model?
- [ ] Common Model — 2 firewalls handle all traffic (inbound, outbound, east-west). Simpler, fewer VMs, good for most deployments.
- [ ] Dedicated Model — Separate firewall pairs for inbound vs. outbound/east-west. Higher throughput ceiling, independent scaling. Typically 4+ firewalls.
- [ ] Not sure — need guidance based on throughput requirements

---

**4. NETWORK & IP PLANNING**

- Transit VNet CIDR (e.g., 10.0.0.0/25):
- Management subnet CIDR:
- Public/Untrust subnet CIDR:
- Private/Trust subnet CIDR:
- AppGW subnet CIDR (Common Model only, if using Application Gateway):
- Private LB frontend IP (must be within the private subnet — this becomes the next-hop for all spoke UDRs):
- Internal CIDR supernet for routing (default: 10.0.0.0/8):

(Leave subnet CIDRs blank if you'd like us to derive them from your VNet CIDR.)

---

**5. MANAGEMENT ACCESS**

List all IP addresses/CIDRs that need to reach the firewall management plane (SSH port 22 and HTTPS port 443). Include admin workstations, jump boxes, VPN ranges, and Panorama IPs:

| IP/CIDR | Description |
|---------|-------------|
|         |             |

---

**6. INBOUND APPLICATIONS (PUBLIC LOAD BALANCER)**

List each application that needs a public IP through the firewalls. Each entry becomes a frontend IP + rule on the public load balancer:

| App Name | Protocol | Port(s) | Backend Destination (Spoke IP) | Existing Public IP? |
|----------|----------|---------|-------------------------------|---------------------|
|          |          |         |                               |                     |

Source IP allowlist for the public LB (or * for any):

Do you need Application Gateway (L7 — SSL offload, WAF, path-based routing) in front of the firewalls? (Common Model only)

---

**7. VM-SERIES CONFIGURATION**

- PAN-OS Version (default: 11.1.607 — SCM requires 11.0+):
- Azure VM Size (default: Standard_DS3_v2 — 4 vCPU, 14 GB RAM):
- Marketplace plan: BYOL / Bundle 1 PAYG / Bundle 2 PAYG

Firewall names and availability zone placement:

*Common Model:*
- FW-1: Name=___, Zone=___
- FW-2: Name=___, Zone=___

*Dedicated Model:*
- FW-IN-1 (Inbound): Name=___, Zone=___
- FW-IN-2 (Inbound): Name=___, Zone=___
- FW-OBEW-1 (Outbound/EW): Name=___, Zone=___
- FW-OBEW-2 (Outbound/EW): Name=___, Zone=___

---

**8. MANAGEMENT PLATFORM & BOOTSTRAP**

Which management platform?
- [ ] Panorama (on-prem or Azure-hosted, with SW Firewall License Plugin)
- [ ] Strata Cloud Manager (SCM) — SaaS management (requires PAN-OS 11.0+)
- [ ] None (standalone — basic bootstrap only)

*If Panorama:*
- Panorama IP address:
- Template Stack name:
- Device Group name:
- Auth Key (from License Manager bootstrap definition):
- Secondary Panorama IP (if HA pair):

For Dedicated Model — if inbound and OBEW tiers use separate Template Stacks / Device Groups, provide both sets.

*If SCM:*
- SCM Folder name (maps to dgname):
- SCM Device Label (maps to tplname):
- Auto-Registration PIN ID:
- Auto-Registration PIN Value:
- License Auth Code (format: D1234567):

---

**9. LICENSING**

- Licensing model: Software NGFW Credits (BYOL) / PAYG / ELA
- Credit pool activated? Yes / No
- Deployment profile auth code:
- Auto-Registration PIN ID:
- Auto-Registration PIN Value:

For Dedicated Model — if inbound and OBEW tiers use different vCPU counts or subscriptions, provide separate auth codes for each tier.

---

**10. ADDITIONAL CONSIDERATIONS**

- On-prem connectivity: ExpressRoute / Site-to-Site VPN / Virtual WAN / None
- On-prem network CIDRs (for routing and policy planning):
- Deployment method: Manual terraform apply / GitHub Actions / Azure DevOps / GitLab CI / Terraform Cloud
- Environment: Production / Pre-production / Dev-Lab-POC
- Target deployment date:
- Change management requirements (CAB approval, maintenance windows):
- Anything else we should know:

---

Take your time filling this out — not every field will apply. Anything you're unsure about, just flag it and we'll discuss. Once I have this back, I'll build your customized `terraform.tfvars` and walk you through the deployment.

Thanks,
