# GlobalProtect Panorama-Managed Deployment Guide

**Step-by-step instructions for deploying GlobalProtect remote access VPN managed by Panorama**

---

## Overview

This guide walks through the complete process of deploying a Panorama-managed GlobalProtect remote access VPN. By the end, you will have:

- Firewall interfaces and zones configured for GlobalProtect
- SSL/TLS certificates deployed to portal and gateway
- User authentication configured (LDAP or SAML)
- A GlobalProtect gateway providing VPN tunnel access
- A GlobalProtect portal delivering app configurations to endpoints
- The GlobalProtect app deployed and tested on endpoints

### Architecture

```
                    Internet
                       |
              ┌────────┴────────┐
              │   Untrust Zone  │
              │  ethernet1/1    │
              │  (Portal + GW)  │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              │  Tunnel Interface│
              │   tunnel.1      │
              │  (VPN Zone)     │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              │   Trust Zone    │
              │  ethernet1/2    │
              │ (Internal LAN)  │
              └────────┴────────┘
                       │
                 Internal Network
```

### Prerequisites

Before starting, ensure you have:

- A Palo Alto Networks next-generation firewall running PAN-OS 10.1+
- Panorama managing the firewall (device group and template stack configured)
- Network connectivity between the firewall's external interface and the internet
- An authentication source (Active Directory/LDAP server or SAML IdP)
- A DNS record pointing your GlobalProtect portal FQDN to the firewall's external IP
- A server certificate for the portal/gateway (from a public CA recommended, or self-signed)

---

## Section 1: Infrastructure and Certificates

Configure the network foundation — interfaces, zones, and SSL certificates — that all GlobalProtect components depend on.

> **PAN Docs Reference:** [Create Interfaces and Zones](https://docs.paloaltonetworks.com/globalprotect/administration/get-started/create-interfaces-and-zones-for-globalprotect) | [Enable SSL](https://docs.paloaltonetworks.com/globalprotect/administration/get-started/enable-ssl-between-globalprotect-components) | [Deploy Server Certificates](https://docs.paloaltonetworks.com/globalprotect/administration/get-started/enable-ssl-between-globalprotect-components/deploy-server-certificates-to-the-globalprotect-components)

### Step 1.1: Configure the External Interface

The external interface hosts both the GlobalProtect portal and gateway. Users connect to this IP/FQDN.

1. In Panorama, select your **Template** and navigate to **Network > Interfaces > Ethernet**.
2. Select the interface for external access (e.g., `ethernet1/1`).
3. Configure:
   - **Interface Type**: Layer3
   - **Zone**: Select or create an `untrust` zone
   - **IPv4 Address**: Assign the public-facing IP address (or the IP that will be NAT'd)
4. Click **OK**.

> **Note:** Do not enable management services (HTTP, HTTPS, SSH) on this interface. Management access should only be available on the dedicated management interface.

### Step 1.2: Configure the Internal Interface

The internal interface connects to your corporate network.

1. Select the interface for internal access (e.g., `ethernet1/2`).
2. Configure:
   - **Interface Type**: Layer3
   - **Zone**: Select or create a `trust` zone
   - **IPv4 Address**: Assign the internal IP address
3. Click **OK**.

### Step 1.3: Create the Tunnel Interface

The tunnel interface terminates VPN connections from GlobalProtect clients. Each connected client receives an IP from the tunnel's IP pool.

1. Navigate to **Network > Interfaces > Tunnel**.
2. Click **Add** to create a new tunnel interface (e.g., `tunnel.1`).
3. Configure:
   - **Interface Number**: `1` (or your preferred number)
   - **Zone**: Create a new zone named `vpn-zone` (or `corp-vpn`)
   - **IPv4 Address**: Optionally assign an IP (e.g., `10.31.32.1/24`) — this serves as the gateway for VPN clients
4. Click **OK**.

> **Note:** Enable **User Identification** on the VPN zone if you want User-ID-based policies for VPN traffic. Go to **Network > Zones**, select the VPN zone, and check **Enable User Identification**.

### Step 1.4: Create Security Policy Rules

Allow traffic between the VPN zone and your internal zones.

1. In Panorama, select your **Device Group** and navigate to **Policies > Security**.
2. Create a rule:
   - **Name**: `Allow-VPN-to-Trust`
   - **Source Zone**: `vpn-zone`
   - **Destination Zone**: `trust`
   - **Application**: `any` (or restrict to specific applications)
   - **Action**: `Allow`
3. Create a second rule for return traffic if needed (or rely on the default interzone behavior).
4. Position these rules appropriately in your rulebase.

> **Warning:** Review your security policies carefully. Starting with `any/any` for testing is acceptable, but tighten the rules before production deployment.

### Step 1.5: Generate or Import SSL/TLS Certificates

The portal and gateway require server certificates for SSL/TLS. You have two options:

**Option A: Use a Certificate from a Public CA (Recommended for Portal)**

Using a publicly trusted certificate prevents browser/app warnings for end users.

1. Navigate to **Device > Certificate Management > Certificates**.
2. Click **Generate** to create a CSR:
   - **Certificate Name**: `gp-portal-cert`
   - **Common Name**: Your portal FQDN (e.g., `vpn.company.com`)
   - **Country**, **Organization**, etc.: Fill in your organization details
3. Click **Generate** to create the CSR.
4. Export the CSR and submit it to your CA.
5. When you receive the signed certificate, click **Import** and upload:
   - The signed certificate file
   - The private key (if not already on the firewall)
   - The CA certificate chain

**Option B: Use a Self-Signed Root CA**

Suitable for testing or when all endpoints have the CA certificate pre-installed.

1. Navigate to **Device > Certificate Management > Certificates**.
2. Click **Generate** to create a root CA:
   - **Certificate Name**: `GP-Root-CA`
   - **Common Name**: `GlobalProtect Root CA`
   - Check **Certificate Authority**
3. Click **Generate**.
4. Generate a server certificate signed by this CA:
   - **Certificate Name**: `gp-server-cert`
   - **Common Name**: Your portal/gateway FQDN (e.g., `vpn.company.com`)
   - **Signed By**: Select `GP-Root-CA`
   - Add a **Subject Alternative Name (SAN)**: DNS type with the FQDN, and optionally IP type with the interface IP
5. Click **Generate**.

> **Warning:** If using self-signed certificates, you must deploy the root CA certificate to all endpoints. Otherwise, users will see certificate warnings and the GlobalProtect app may fail to connect.

### Step 1.6: Create an SSL/TLS Service Profile

The SSL/TLS service profile binds a certificate to a service (portal or gateway).

1. Navigate to **Device > Certificate Management > SSL/TLS Service Profile**.
2. Click **Add**:
   - **Name**: `GP-SSL-Profile`
   - **Certificate**: Select the server certificate created in Step 1.5
   - **Min Version**: `TLSv1.2`
   - **Max Version**: `TLSv1.3` (if supported)
3. Click **OK**.

### Step 1.7: Commit and Verify Infrastructure

1. **Commit to Panorama**, then **Push to Devices**.
2. Verify on the firewall:
   - **Network > Interfaces** — confirm interfaces are up (green)
   - **Network > Zones** — confirm zones exist with correct interfaces
   - **Device > Certificate Management > Certificates** — confirm certificates are present and valid

> **Success:** You should see green status indicators on all configured interfaces and valid certificates with correct expiration dates.

---

## Section 2: Authentication

Configure how users authenticate to GlobalProtect. This guide covers the two most common methods: LDAP (Active Directory) and SAML.

> **PAN Docs Reference:** [Set Up LDAP Authentication](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-user-authentication/set-up-ldap-authentication) | [Set Up SAML Authentication](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-user-authentication/set-up-saml-authentication)

### Choose Your Authentication Method

| Method | Best For | Requirements |
|--------|----------|-------------|
| **LDAP** | Organizations with Active Directory | AD server reachable from firewall, service account |
| **SAML** | Cloud-first organizations, SSO | SAML 2.0 IdP (Okta, Azure AD, Ping, etc.) |
| **RADIUS** | Existing RADIUS infrastructure | RADIUS server, shared secret |

### Option A: LDAP Authentication (Active Directory)

#### Step 2A.1: Create an LDAP Server Profile

1. In Panorama, select your **Template** and navigate to **Device > Server Profiles > LDAP**.
2. Click **Add**:
   - **Profile Name**: `AD-LDAP-Profile`
   - **Server List**: Click **Add**
     - **Name**: `AD-Server-1`
     - **LDAP Server**: IP or FQDN of your AD server (e.g., `10.0.1.10`)
     - **Port**: `389` (LDAP) or `636` (LDAPS — recommended)
   - **Type**: `active-directory`
   - **Base DN**: Your domain base (e.g., `DC=company,DC=com`)
   - **Bind DN**: Service account (e.g., `CN=svc-globalprotect,OU=Service Accounts,DC=company,DC=com`)
   - **Bind Password**: Service account password
   - **SSL**: Check this if using port 636
3. Click **OK**.

> **Note:** Use LDAPS (port 636) in production. For LDAPS, import the AD server's CA certificate under **Device > Certificate Management > Certificates** and reference it in the LDAP server profile.

#### Step 2A.2: Create an Authentication Profile

1. Navigate to **Device > Authentication Profile**.
2. Click **Add**:
   - **Name**: `GP-Auth-Profile`
   - **Type**: `LDAP`
   - **Server Profile**: Select `AD-LDAP-Profile`
   - **Login Attribute**: `sAMAccountName`
   - **User Domain**: Your domain (e.g., `company`)
3. On the **Advanced** tab:
   - **Allow List**: Add specific user groups or `all` for testing
4. Click **OK**.

#### Step 2A.3: Enable Group Mapping (Optional but Recommended)

Group mapping allows you to create policies based on AD security groups.

1. Navigate to **Device > User Identification > Group Mapping Settings**.
2. Click **Add**:
   - **Name**: `AD-Group-Mapping`
   - **Server Profile**: Select `AD-LDAP-Profile`
   - **Domain**: `company`
3. On the **Group Include List** tab, add the groups you want to use in policies.
4. Click **OK**.

### Option B: SAML Authentication

#### Step 2B.1: Configure Your Identity Provider

On your IdP (Okta, Azure AD, etc.), create a new SAML application:

1. **ACS URL** (Assertion Consumer Service): `https://vpn.company.com:443/SAML20/SP/ACS`
2. **Entity ID**: `https://vpn.company.com:443/SAML20/SP`
3. **Name ID Format**: Email or username
4. Download the **IdP Metadata XML** file.

> **Note:** The ACS URL and Entity ID use the portal's FQDN. Replace `vpn.company.com` with your actual portal FQDN.

#### Step 2B.2: Import IdP Metadata and Create SAML Server Profile

1. In Panorama, navigate to **Device > Server Profiles > SAML Identity Provider**.
2. Click **Import** and upload the IdP metadata XML file.
3. Verify the imported settings:
   - **Identity Provider ID**: Auto-populated from metadata
   - **Identity Provider SSO URL**: Auto-populated
   - **Identity Provider Certificate**: Should be imported automatically
   - **Max Clock Skew**: `60` seconds (default, increase if clock sync issues occur)
4. Click **OK**.

#### Step 2B.3: Create a SAML Authentication Profile

1. Navigate to **Device > Authentication Profile**.
2. Click **Add**:
   - **Name**: `GP-SAML-Auth-Profile`
   - **Type**: `SAML`
   - **IdP Server Profile**: Select the imported profile
   - **Certificate for Signing Requests**: Optionally select a certificate
   - **Username Attribute**: As configured on IdP (typically `username` or `email`)
   - **User Group Attribute**: `groups` (if IdP sends group claims)
3. On the **Advanced** tab:
   - **Allow List**: Add `all` or specific groups
4. Click **OK**.

### Step 2.4: Commit and Verify Authentication

1. **Commit to Panorama**, then **Push to Devices**.
2. Verify the server profile connectivity:
   - For LDAP: Navigate to **Device > Server Profiles > LDAP**, select your profile, and check the connection status
   - For SAML: The IdP metadata should show as imported with valid certificate

> **Success:** The LDAP server profile should show a successful connection, or the SAML IdP metadata should display with all fields populated and a valid certificate.

---

## Section 3: Gateway Configuration

The gateway establishes VPN tunnels with endpoints and enforces security policies on the tunneled traffic.

> **PAN Docs Reference:** [Configure a GlobalProtect Gateway](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-gateways/configure-a-globalprotect-gateway)

### Step 3.1: Add the GlobalProtect Gateway

1. In Panorama, select your **Template** and navigate to **Network > GlobalProtect > Gateways**.
2. Click **Add**.
3. On the **General** tab:
   - **Name**: `GP-External-Gateway`
   - **Interface**: Select the external interface (e.g., `ethernet1/1`)
   - **IPv4 Address**: Select the IP address on that interface
   - **SSL/TLS Service Profile**: Select `GP-SSL-Profile`

### Step 3.2: Configure Gateway Authentication

1. On the **Authentication** tab, click **Add** under Client Authentication:
   - **Name**: `default-auth`
   - **OS**: `Any`
   - **Authentication Profile**: Select your authentication profile (`GP-Auth-Profile` or `GP-SAML-Auth-Profile`)
2. Click **OK**.

### Step 3.3: Configure the Tunnel Settings

1. On the **Agent** tab, select **Tunnel Settings**:
   - Check **Tunnel Mode**
   - **Tunnel Interface**: Select `tunnel.1`
   - **Max Users**: Set based on your license (0 = unlimited)
   - Check **Enable IPSec** (recommended for better performance)
2. Under **Timeout Settings**:
   - **Login Lifetime**: `30` days (or your preferred session duration)
   - **Inactivity Logout**: `3` hours (or as required)

### Step 3.4: Configure the IP Pool

The IP pool defines the addresses assigned to VPN clients.

1. Still on the **Agent** tab, under **Tunnel Settings > Network Settings**:
   - **IP Pool**: Click **Add** and enter a range (e.g., `10.31.32.2-10.31.32.254`)
   - **DNS Server**: Add your internal DNS servers (e.g., `10.0.1.10`, `10.0.1.11`)
   - **DNS Suffix**: Your internal domain (e.g., `company.com`)
   - **Access Route**: Add routes for internal networks (e.g., `10.0.0.0/8`) — or leave empty for full tunnel
2. Click **OK** to save the gateway configuration.

> **Note:** **Split Tunnel vs. Full Tunnel**: If you add specific access routes, only traffic destined for those networks goes through the VPN (split tunnel). If you leave access routes empty, all traffic routes through the VPN (full tunnel). Split tunnel reduces bandwidth usage; full tunnel provides more security.

### Step 3.5: Configure Split Tunnel (Optional)

If you want split tunneling based on application or domain:

1. Navigate back to the gateway's **Agent** tab.
2. Under **Client Settings**, click **Add** to create a configuration:
   - **Name**: `default-config`
3. On the **Split Tunnel** tab:
   - **Include**: Add networks that should go through the VPN
   - **Exclude**: Add networks that should bypass the VPN (e.g., `0.0.0.0/0` for exclude-based split tunnel)
   - **Domain and Application**: Optionally exclude specific domains or applications (e.g., video conferencing)

> **PAN Docs Reference:** [Split Tunnel Traffic](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-gateways/split-tunnel-traffic-on-globalprotect-gateways)

### Step 3.6: Commit and Verify the Gateway

1. **Commit to Panorama**, then **Push to Devices**.
2. Verify on the firewall:
   - Navigate to **Network > GlobalProtect > Gateways**
   - The gateway should show a green status indicator
3. From the firewall CLI, run:

```
show global-protect-gateway name GP-External-Gateway
```

> **Success:** The gateway status should show as `Running` with the correct interface, IP, and tunnel configuration displayed.

---

## Section 4: Portal Configuration

The portal is the entry point for GlobalProtect. It authenticates users and delivers the gateway list and app configuration to endpoints.

> **PAN Docs Reference:** [Set Up Access to the Portal](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-portals/set-up-access-to-the-globalprotect-portal) | [Define Client Auth Configurations](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-portals/define-the-globalprotect-client-authentication-configurations) | [Define App Configurations](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-portals/define-the-globalprotect-app-configurations)

### Step 4.1: Add the GlobalProtect Portal

1. In Panorama, select your **Template** and navigate to **Network > GlobalProtect > Portals**.
2. Click **Add**.
3. On the **General** tab:
   - **Name**: `GP-Portal`
   - **Interface**: Select the same external interface as the gateway (e.g., `ethernet1/1`)
   - **IPv4 Address**: Select the same IP as the gateway
   - **SSL/TLS Service Profile**: Select `GP-SSL-Profile`

> **Note:** The portal and gateway typically share the same interface and IP address. GlobalProtect differentiates between portal and gateway connections automatically.

### Step 4.2: Configure Portal Authentication

1. On the **Authentication** tab, click **Add** under Client Authentication:
   - **Name**: `default-portal-auth`
   - **OS**: `Any`
   - **Authentication Profile**: Select the same profile used for the gateway
   - **Authentication Message**: Optionally customize the login prompt
2. Click **OK**.

### Step 4.3: Configure the Agent (App) Settings

This is where you define what the GlobalProtect app does after connecting to the portal.

1. On the **Agent** tab, click **Add** to create a new agent configuration:
   - **Name**: `default-agent-config`
2. On the **Authentication** tab within the agent config:
   - **Save User Credentials**: Select `Save Username and Password` for user convenience (or `Save Username Only` for higher security)
   - **Authentication Override**: Configure cookie-based authentication to avoid repeated logins
     - Check **Generate cookie for authentication override**
     - Check **Accept cookie for authentication override**
     - **Cookie Lifetime**: `24` hours
3. On the **Config Selection Criteria** tab:
   - **OS**: `Any` (or create OS-specific configurations)
   - **User/User Group**: `Any` (or restrict to specific groups)

### Step 4.4: Configure the Gateway List

1. Still in the agent configuration, go to the **External** tab under **Gateways**:
   - Click **Add**:
     - **Name**: `GP-External-Gateway`
     - **Address**: Your gateway FQDN or IP (e.g., `vpn.company.com`)
     - **Priority**: `Highest` (if this is your only gateway)
2. If you have internal gateways, add them on the **Internal** tab.
3. Click **OK** to close the gateway list.

### Step 4.5: Configure the App (Agent) Behavior

1. On the **App** tab within the agent configuration:
   - **Connect Method**: Select one of:
     - `Pre-logon then On-Demand` — connects before user login, then user can control
     - `User-Logon (Always On)` — connects automatically at user login, always stays connected
     - `On-Demand` — user manually initiates connections
   - **Disable GlobalProtect App**: `No` (do not allow users to disable)
   - **Allow user to change portal address**: `No` (recommended for managed deployments)
2. Click **OK** to close the agent configuration.
3. Click **OK** to save the portal configuration.

> **Note:** For most enterprise deployments, `User-Logon (Always On)` is recommended. It ensures VPN is always active when the user is logged in, providing consistent security policy enforcement.

### Step 4.6: Commit and Verify the Portal

1. **Commit to Panorama**, then **Push to Devices**.
2. Verify on the firewall:
   - Navigate to **Network > GlobalProtect > Portals**
   - The portal should show a green status indicator
3. Test portal access by navigating to `https://vpn.company.com` in a browser:
   - You should see the GlobalProtect portal login page
   - After logging in, the page should offer the GlobalProtect app download

> **Success:** The portal login page loads without certificate errors (if using a public CA) and accepts your AD/SAML credentials. After login, the download page displays the GlobalProtect app for your OS.

---

## Section 5: App Deployment and Testing

Deploy the GlobalProtect app to endpoints and verify end-to-end connectivity.

> **PAN Docs Reference:** [Deploy the GlobalProtect App](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-apps/deploy-the-globalprotect-app-software) | [Download the GlobalProtect App](https://docs.paloaltonetworks.com/globalprotect/administration/globalprotect-apps/deploy-the-globalprotect-app-software/download-the-globalprotect-app)

### Step 5.1: Download the GlobalProtect App

There are multiple ways to obtain the app:

**From the Portal (Simplest)**
1. Navigate to `https://vpn.company.com` in a browser.
2. Log in with your credentials.
3. Download the appropriate installer for your OS.

**From Palo Alto Networks Support Portal**
1. Log in to [support.paloaltonetworks.com](https://support.paloaltonetworks.com).
2. Navigate to **Updates > GlobalProtect App**.
3. Download the installer matching your PAN-OS version.

**Host on the Portal for Automatic Download**
1. In Panorama, navigate to **Device > GlobalProtect Client**.
2. Click **Download** next to the desired version.
3. After download, click **Activate** to make it available on the portal.
4. Users who connect to the portal will automatically be offered the app download.

### Step 5.2: Install the GlobalProtect App

**Windows**
```
msiexec /i GlobalProtect64.msi /quiet PORTAL=vpn.company.com
```

**macOS**
1. Open the `.pkg` installer.
2. Follow the installation wizard.
3. Allow the system extension when prompted (System Preferences > Security & Privacy).

**Linux**
```
# Debian/Ubuntu
sudo dpkg -i GlobalProtect_UI_deb-*.deb

# RHEL/CentOS
sudo rpm -ivh GlobalProtect_UI_rpm-*.rpm
```

> **Note:** On macOS, users must approve the system extension for the VPN tunnel to work. This can be pre-approved via MDM profiles for managed deployments.

### Step 5.3: Connect and Test

1. Open the GlobalProtect app.
2. Enter the portal address: `vpn.company.com`
3. Enter your credentials (or authenticate via SAML redirect).
4. The app should connect and show:
   - **Status**: Connected
   - **Assigned IP**: An IP from your gateway's IP pool
   - **Gateway**: The name of the connected gateway

### Step 5.4: Verify End-to-End Connectivity

1. **From the endpoint**, test access to internal resources:
```
ping 10.0.1.10          # Internal server
nslookup server.company.com   # DNS resolution
```

2. **On the firewall**, verify the tunnel session:
```
show global-protect-gateway current-user gateway GP-External-Gateway
```
This should display:
   - Connected username
   - Assigned virtual IP
   - Client OS and app version
   - Login time and connection duration

3. **Check traffic logs** in Panorama:
   - Navigate to **Monitor > Logs > Traffic**
   - Filter for source zone `vpn-zone`
   - Verify traffic is being logged and policies are being applied

### Step 5.5: Verify Security Policy Enforcement

1. Confirm that traffic from VPN clients matches the expected security policies:
```
show running security-policy
```
2. Test both allowed and denied traffic to verify policy enforcement.
3. Check that User-ID is correctly identifying VPN users in logs.

> **Success:** The GlobalProtect app connects without errors, receives an IP from the configured pool, and can access internal resources. Traffic logs show the correct username, source zone (vpn-zone), and policy matches.

---

## Troubleshooting

### Common Issues

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| App cannot reach portal | DNS or firewall blocking | Verify DNS resolution and that port 443 is open to the portal IP |
| Certificate error on connection | Certificate CN/SAN mismatch | Ensure the certificate CN or SAN matches the portal FQDN exactly |
| Authentication fails | Wrong auth profile or server unreachable | Check LDAP/SAML server profile connectivity; verify credentials |
| Connected but no internal access | Missing routes or security policies | Verify access routes on gateway and security policies allow vpn-zone to trust |
| Slow VPN performance | Full tunnel routing all traffic | Consider split tunnel to route only corporate traffic through VPN |
| Users disconnected frequently | Inactivity or session timeout too short | Increase timeout values in gateway tunnel settings |

### Useful CLI Commands

```
# Show gateway status
show global-protect-gateway name GP-External-Gateway

# Show connected users
show global-protect-gateway current-user gateway GP-External-Gateway

# Show portal status
show global-protect-portal name GP-Portal

# Show tunnel statistics
show global-protect-gateway statistics gateway GP-External-Gateway

# Debug gateway issues
debug global-protect-gateway log-level gateway GP-External-Gateway level debug

# Show certificate details
show certificate name gp-server-cert
```

### Log Collection

If issues persist, collect logs from both sides:

**Firewall Logs:**
- **Monitor > Logs > System** — filter for `globalprotect`
- **Monitor > Logs > Authentication** — check for failed auth attempts

**App Logs:**
- Windows: `C:\Program Files\Palo Alto Networks\GlobalProtect\PanGPS.log`
- macOS: `/Library/Logs/PaloAltoNetworks/GlobalProtect/PanGPS.log`
- Linux: `/opt/paloaltonetworks/globalprotect/PanGPS.log`

---

## Quick Reference

### Key Parameters

| Parameter | Example Value | Where Used |
|-----------|--------------|------------|
| Portal/Gateway FQDN | `vpn.company.com` | DNS, certificate CN/SAN, app config |
| External Interface | `ethernet1/1` | Portal and gateway |
| Tunnel Interface | `tunnel.1` | Gateway tunnel settings |
| VPN Zone | `vpn-zone` | Security policies |
| IP Pool | `10.31.32.2-10.31.32.254` | Gateway tunnel settings |
| DNS Servers | `10.0.1.10, 10.0.1.11` | Gateway network settings |
| SSL/TLS Profile | `GP-SSL-Profile` | Portal and gateway |
| Auth Profile | `GP-Auth-Profile` | Portal and gateway |

### Port Requirements

| Port | Protocol | Direction | Purpose |
|------|----------|-----------|---------|
| 443 | TCP | Inbound | Portal and gateway HTTPS |
| 4443 | TCP | Inbound | Gateway (if using alternate port) |
| 53 | UDP/TCP | Outbound | DNS resolution |
| 389/636 | TCP | Outbound | LDAP/LDAPS to AD |
| 443 | TCP | Outbound | SAML IdP communication |
