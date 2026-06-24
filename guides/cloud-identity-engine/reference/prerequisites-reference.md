# Prerequisites Reference Sheet — CIE Cloud Tags Guide

Phase anchor: `prerequisites`

---

## 1. Product Versions

| Product | Minimum Version | Source |
|---|---|---|
| PAN-OS (firewalls receiving IP-tag redistribution) | 10.1+ | Architecture Overview section of cie-cloud-tags.html: "PAN-OS 10.1+ required" per CIE vs Legacy VM Monitoring table |
| Panorama (if managing firewalls) | 10.1+ | Same requirement applies — Panorama must match or exceed firewall PAN-OS version for template/DG management |
| CIE service | Cloud-hosted (no version pinning) | CIE is a cloud service; always current. Source: cloud-identity-engine-overview.md |
| SCM (if using SCM for management) | Cloud-hosted (no version pinning) | SCM handles CIE connection; no firewall-side PAN-OS version gate for SCM-managed tag collection |

---

## 2. Navigation Paths / URLs

| Path | Purpose | Source |
|---|---|---|
| `https://hub.paloaltonetworks.com` | CIE activation verification | CIE Implementation Guide (cie-implementation.html) |
| Hub > Cloud Identity Engine | Verify CIE tenant is active | CIE Implementation Guide |
| `User Context` > `IP-Tag Collection` | CIE IP Tag Cloud Connection configuration page | configure-an-ip-tag-cloud-connection.md step 2 |
| `User Context` > `Mappings and Tags` > `IP Tags` | View collected IP-tag mappings | configure-an-ip-tag-cloud-connection.md step 16 |
| `status.paloaltonetworks.com` | CIE service status page | cloud-identity-engine-troubleshooting-checklist.md step 2 |

---

## 3. Network Connectivity Requirements

| Direction | Protocol/Port | Endpoint | Purpose | Source |
|---|---|---|---|---|
| CIE → AWS | HTTPS/443 | AWS STS endpoints (`sts.amazonaws.com`, `sts.<region>.amazonaws.com`) | AssumeRole for cross-account access | AWS IAM docs; configure-an-ip-tag-cloud-connection.md AWS section |
| CIE → AWS | HTTPS/443 | EC2 API endpoints (`ec2.<region>.amazonaws.com`) | DescribeInstances, DescribeTags | AWS EC2 API reference |
| CIE → Azure | HTTPS/443 | Azure Resource Manager (`management.azure.com`) | Read resource tags, VM metadata | Azure REST API docs |
| CIE → Azure | HTTPS/443 | Azure AD login (`login.microsoftonline.com`) | OAuth2 token acquisition for service principal | Azure AD authentication docs |
| CIE → GCP | HTTPS/443 | Compute Engine API (`compute.googleapis.com`) | Read instance metadata, labels, network tags | GCP Compute API docs |
| CIE → GCP | HTTPS/443 | Google OAuth (`oauth2.googleapis.com`) | Service account authentication | GCP auth docs |
| Firewalls → CIE | HTTPS/443 | CIE cloud service endpoints | Receive IP-tag redistribution from CIE segment | cloud-identity-engine-topology.md (hub-and-spoke model) |

Note: CIE is a cloud-hosted service — the firewall initiates the connection outbound to CIE. Network/firewall rules must allow HTTPS outbound to CIE service endpoints. The exact CIE service FQDNs are tenant-specific and provisioned during activation.

---

## 4. Cloud Account Permissions (Planning Summary)

### AWS
- **IAM Policy actions**: `ec2:DescribeInstances`, `ec2:DescribeTags`, `ec2:DescribeNetworkInterfaces`, `ec2:DescribeVpcs`, `ec2:DescribeVpcEndpoints`, `ec2:DescribeSubnets`, `ec2:DescribeRegions` (Resource: `*`)
- **IAM Role**: Cross-account trust with Palo Alto Networks CIE AWS account + external ID
- **Alternative**: CloudFormation Template (CFT) provided in CIE console
- Source: Phase 2A of cie-cloud-tags.html (Step 2A.1, 2A.2); configure-an-ip-tag-cloud-connection.md

### Azure
- **App Registration**: In Microsoft Entra ID (formerly Azure AD)
- **Role**: `Reader` role on each target subscription
- **Credentials**: Client ID, Client Secret, Tenant ID, Subscription ID
- Source: Phase 2B of cie-cloud-tags.html (Steps 2B.1–2B.3); configure-an-ip-tag-cloud-connection.md

### GCP
- **Service Account**: `roles/compute.viewer` (Compute Viewer) on target project(s)
- **Credentials**: JSON key file downloaded from the service account
- Source: Phase 2C of cie-cloud-tags.html (Steps 2C.1–2C.2); configure-an-ip-tag-cloud-connection.md

---

## 5. Behavioral Facts

| Fact | Source |
|---|---|
| CIE is a cloud-hosted service; no on-premises installation required | cloud-identity-engine-overview.md |
| CIE uses hub-and-spoke architecture: CIE is the hub, firewalls and directories are spokes | cloud-identity-engine-topology.md |
| IP-tag redistribution uses segments — firewalls subscribe to a segment to receive mappings | configure-an-ip-tag-cloud-connection.md step 1 |
| Segment assignment on monitor configuration is immutable after submission | configure-an-ip-tag-cloud-connection.md step 12.8 |
| Per region, up to 60,000 IP-tag mappings per monitor configuration | configure-an-ip-tag-cloud-connection.md |
| Polling interval range: 60–1800 seconds (default 60) | configure-an-ip-tag-cloud-connection.md step 12.7 |
| Tags longer than 127 characters are not retrieved | Architecture Overview of cie-cloud-tags.html |
| CIE service is free; enforcement points (NGFW, Prisma Access) may require licenses | cloud-identity-engine-overview.md |
| CIE activation is a prerequisite — must be done before IP Tag Cloud Connection can be configured | configure-an-ip-tag-cloud-connection.md step 1 |
| CIE replaces legacy VM Monitoring (per-firewall or per-Panorama-plugin approach) | CIE vs Legacy VM Monitoring section of cie-cloud-tags.html |

---

## 6. Known Gotchas

| Gotcha | Source |
|---|---|
| CIE credential test can succeed but monitor configuration can still fail if regions or VPCs are misconfigured | configure-an-ip-tag-cloud-connection.md |
| CIE allows saving a credential configuration even if Test Connection fails — status shows "Not connected" | Phase 2 of cie-cloud-tags.html (Step 2A.3 warning callout) |
| Azure client secret is displayed only once at creation time | Phase 2B of cie-cloud-tags.html (Step 2B.3 danger callout) |
| Azure client secret expiration causes CIE disconnection if not rotated | Phase 2B of cie-cloud-tags.html (Step 2B.3 warning callout) |
| GCP JSON key file can only be used for one CIE credential configuration | Phase 2C of cie-cloud-tags.html (Step 2C.2 warning callout) |
| Tag naming must avoid non-ASCII special characters (`{`, `"`) and stay under 127 chars | Architecture Overview of cie-cloud-tags.html |
| Azure user-defined tags: limited to first 21 alphabetically sorted tags per resource | Architecture Overview supported tags table |
