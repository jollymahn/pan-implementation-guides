# GlobalProtect Deployment Guide

**Panorama-managed GlobalProtect remote access VPN deployment. Complete end-to-end setup from infrastructure through app deployment and testing.**

---

## Choose Your Guide Format

### Linear Guide
Single-page, start-to-finish walkthrough. Best for first-time deployments or when following the standard path (LDAP or SAML, single gateway, full tunnel or basic split tunnel).

[Open Linear Guide](linear-guide.md)

---

## Deployment Sections

Both guides cover these five sections in order:

| Section | What You Configure | Key Decisions |
|---------|-------------------|---------------|
| **1. Infrastructure & Certificates** | Interfaces, zones, tunnel interface, SSL/TLS certificates, security policies | Public CA vs. self-signed certificates |
| **2. Authentication** | Server profiles, authentication profiles, group mapping | LDAP vs. SAML vs. RADIUS |
| **3. Gateway** | Gateway interface, tunnel settings, IP pool, DNS, split tunnel | Full tunnel vs. split tunnel |
| **4. Portal** | Portal interface, client auth, agent config, gateway list, app behavior | Always-on vs. on-demand connection |
| **5. App Deployment** | App download, installation, connection testing, verification | Portal download vs. MDM deployment |

## Prerequisites

- **PAN-OS Firewall** — running PAN-OS 10.1 or later
- **Panorama** — managing the firewall (device group + template stack)
- **Network Connectivity** — external interface reachable from the internet
- **Authentication Source** — AD/LDAP server or SAML IdP
- **DNS Record** — FQDN pointing to the firewall's external IP
- **Server Certificate** — public CA recommended, or self-signed

## Advanced Topics (Future)

These features are beyond the core deployment scope but are planned for future guide expansion:

| Feature | Description | Requirements |
|---------|-------------|-------------|
| **IKEv2 Tunnel Support** | Use IKEv2 instead of SSL for tunnel establishment. Improved performance and standards-based IPSec key exchange. | PAN-OS 12.1.5+, GlobalProtect 6.4.1+ |
| **Endpoint Traffic Policy Enforcement** | Block all endpoint traffic when GlobalProtect is disconnected. Ensures security policy is always enforced. | Windows 10+ or macOS 11+ |
| **HIP-Based Policy Enforcement** | Enforce policies based on endpoint health — disk encryption, antivirus, OS patches, firewall state. Non-compliant endpoints can be restricted or quarantined. | GlobalProtect Gateway license, HIP profiles configured |
| **Extend User Session** | Allow users to extend their login session before timeout, preventing abrupt disconnections during active work. | GlobalProtect 6.2+, PAN-OS 11.0.2+ |
| **Multi-Gateway Configuration** | Deploy multiple gateways with priority-based or region-based selection. Users automatically connect to the best available gateway. | Multiple firewall appliances, gateway priority configuration |
| **Clientless VPN** | Browser-based access to internal web applications without the GlobalProtect app. Useful for BYOD and contractor access. | Portal configuration, application publishing |

> **Note:** This guide focuses on **Panorama-managed** deployments using the standard remote access VPN use case. For advanced scenarios listed above, see the [GlobalProtect Administration Guide](https://docs.paloaltonetworks.com/globalprotect/administration).
