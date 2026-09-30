<!-- @snippet
  title: AIRS prerequisites
  desc:  Markdown twin of airs-prerequisites.html. Screenshots omitted, per the twins' convention.
  vars:  phaseId
-->
Gather these before starting. Missing any one will block a later phase.

### Step {{phaseId}}.1 -- License Requirements

Network Intercept requires an active **Prisma AIRS AI Runtime Firewall** license, funded through Software NGFW credits.

| Item | Details |
|---|---|
| **License type** | BYOL (bring-your-own-license) using a Flex auth code from the Customer Support Portal |
| **Credit model** | Fund a credit pool, then create deployment profiles specifying vCPU count per instance and total instances |
| **Minimum vCPUs** | 4 vCPUs per Prisma AIRS AI Runtime instance |
| **Transaction limit** | 10,000 AI transactions per day per vCPU |
| **Bundled security services** | AI App/Model/Data Protection, Cloud Identity Engine, SCM Pro, Enterprise DLP, ATP, Advanced URL Filtering, Advanced WildFire, Advanced DNS Security, GlobalProtect |

> **Note: Deployment Profiles Are Now A La Carte**
>
> Prisma AIRS deployment profiles are available as individual options. Legacy `AI Runtime Security (Instance)` bundled profiles are deprecated. Select the specific services you need when creating a new deployment profile.

> **Success: Verification**
>
> Confirm you have received your **purchase confirmation email** with an activation link, and that your credit pool has sufficient credits for the planned number of instances and vCPUs.

### Step {{phaseId}}.2 -- Account Access

Confirm credentials for both management platforms:

| Platform | URL | Purpose |
|---|---|---|
| **Customer Support Portal** | [support.paloaltonetworks.com](https://support.paloaltonetworks.com) | License activation, deployment profile creation, device certificate generation, auth codes |
| **Strata Cloud Manager** | [stratacloudmanager.paloaltonetworks.com](https://stratacloudmanager.paloaltonetworks.com) | AI security profile configuration, cloud account onboarding, discovery dashboard, firewall management |
| **Panorama** (if applicable) | Your Panorama management server | AI security profile and policy configuration for Panorama-managed deployments. Requires CloudConnector Plugin 2.1.0. |

> **Warning: SCM Regional Availability**
>
> Strata Cloud Manager and Tenant Service Groups (TSGs) are available in: **US, UK, India, Canada, Singapore**. Your cloud deployment can be in any supported cloud region, but the management plane must be in one of these regions.

> **Success: Verification**
>
> Log in to both the Customer Support Portal and Strata Cloud Manager. If using Panorama, confirm the CloudConnector Plugin 2.1.0 is installed.

### Step {{phaseId}}.3 -- Network Requirements

The firewall management interface and the AI security cloud service require outbound connectivity to these endpoints:

| Destination | Port(s) | Purpose |
|---|---|---|
| `ocsp.paloaltonetworks.com`, `crl.paloaltonetworks.com`, `ocsp.godaddy.com` | TCP 80 | OCSP / CRL certificate validation |
| `api.paloaltonetworks.com` and certificate endpoints | TCP 443 | Licensing, updates, cloud service connectivity |
| `*.gpcloudservice.com` | TCP 443-444 | Cloud-delivered security services |
| `api.sase.paloaltonetworks.com` | TCP 443 | SCM management API |

> **Success: Verification**
>
> From the management subnet where the firewall will be deployed, confirm outbound HTTPS connectivity to `api.paloaltonetworks.com` and `api.sase.paloaltonetworks.com` using `curl -v` or equivalent.

### Step {{phaseId}}.4 -- PAN-OS Version Requirements

| Component | Minimum Version | Notes |
|---|---|---|
| **Prisma AIRS Runtime Firewall** | PAN-OS 11.2.2 | Required for deployment profile compatibility |
| **Panorama** (if managing firewalls) | PAN-OS 11.2.5 | Required for AI Security profile support |
| **CloudConnector Plugin** (Panorama) | 2.1.0 | Required for Panorama to connect to the AI security cloud service |
| **Universal Image** | PAN-OS 11.2.11 or 12.1.5 | Single image for both VM-Series and Prisma AIRS. Supports x86 and ARM. |
| **Custom Error Response** | PAN-OS 11.2.11 or 12.1.8 | Returns HTTP error instead of TCP reset on block action (Panorama only) |
| **Terraform** | > 1.3 and < 2.0 | Required for SCM Terraform Download and Panorama-Managed deployment models |

> **Success: Verification**
>
> Confirm the PAN-OS version of your target deployment is 11.2.2 or later. If using Panorama, confirm version 11.2.5+ and CloudConnector Plugin 2.1.0 installed.

### Step {{phaseId}}.5 -- Cloud-Specific Prerequisites

Prepare the following for your target cloud provider(s). These apply regardless of deployment model.

#### AWS

- AWS account with administrative access to create IAM roles, policies, VPCs, and EC2 instances
- Subscribe to the Prisma AIRS image in AWS Marketplace (same listing as VM-Series due to Universal Image)
- IAM permissions to create CloudFormation stacks or Terraform resources
- IAM permissions to list and describe Lambda functions (for serverless discovery)
- VPC with management, data, and HA subnets planned
- Terraform > 1.3 and < 2.0 (if using SCM Terraform Download or Panorama-Managed)

#### Azure

- Azure subscription with administrative access
- Subscribe to the Prisma AIRS image in Azure Marketplace
- **Reader role** at minimum for the cloud account (required for serverless discovery of Azure Functions)
- Azure region in programmatic name format (e.g., `canadacentral`, `northcentralus`)
- Resource Group and VNet with management, data, and HA subnets planned
- Terraform > 1.3 and < 2.0 (if using SCM Terraform Download)

> **Warning: Azure Route Table Association**
>
> Azure requires manual route table association to steer traffic through the firewall. This is a common miss -- plan your UDR (User-Defined Route) configuration before deployment.

#### GCP

- GCP project with administrative access
- Service account with appropriate permissions for resource creation
- `gcloud` CLI installed for image lookups
- VPC with management, data, and HA subnetworks planned
- Terraform > 1.3 and < 2.0 (if using SCM Terraform Download)

> **Success: Verification**
>
> Confirm cloud account access, marketplace subscription, and VPC/VNet planning is complete for your target cloud.
