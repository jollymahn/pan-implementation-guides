# Cloud Identity Engine Implementation Guide — Outline

## Guide Metadata
- **Location**: `docs/guides/cloud-identity-engine/`
- **Format**: HTML + MD, shared CSS/JS, collapsible steps
- **Branching pattern**: Phase 3 (directory type) and Phase 5 (management plane)
- **Source docs**: 41 files in `pan-docs-reference/docs/identity/`

---

## Phase 1: Prerequisites

### 1.1 Licensing & Platform Requirements
- CIE core service is **free** — no auth code needed
- Enforcement points require PAN-OS 10.1+ (NGFW, Panorama)
- SCM access requires: Prisma Access, AIOps for NGFW Premium, or SCM Essentials/Pro
- CyberArk SAML requires PAN-OS 11.2+

### 1.2 Admin Role Assignment
- Assign CIE app roles in Palo Alto Networks Hub (Common Services)
- Required: tenant management, directory data, secrets configuration roles
- App Administrator role needed for tenant operations

### 1.3 Region Selection
- Choose deployment region (data residency compliance)
- Must align with Prisma Access region if applicable
- Region determines CIE endpoint URLs

### 1.4 Network Configuration
- **Ports**: 443 (CIE communication), 80 (cert verification), 389 (LDAP), 636 (LDAPS)
- **Certificate verification URLs**:
  - `http://crl.godaddy.com:80`
  - `http://ocsp.godaddy.com:80`
  - `https://certs.godaddy.com:443`
- **App-IDs** (if PAN firewall between agent and CIE):
  - `paloalto-cloud-identity`, `ssl`, `web-browsing`, `ldap`
- **SSL Decryption**: MUST exclude agent-to-CIE traffic
- **Proxy**: Requires agent version 1.7.1+
- **DO NOT** use Global Catalog ports (3268/3269)

### 1.5 Directory Domain Preparation
- On-prem AD: create service account with LDAP query permissions
- Azure AD: remove circular group references
- Plan Cloud Identity Agent placement (near domain controllers)
- Configure redundancy (multiple agents, multiple DCs per domain)

---

## Phase 2: Activate CIE

### 2.1 Access Activation Console
- Log in to Palo Alto Networks Hub
- Navigate to Activation Console

### 2.2 Activate (Single CSP Account)
1. Select Activate
2. CSP account auto-populated
3. Allocate product to recipient (rename if needed)
4. Select region
5. Agree to terms → Activate
6. Default tenant created with Superuser role

### 2.3 Activate (Multiple CSP Accounts)
1. Select Activate
2. Choose CSP account from dropdown
3. Allocate to recipient (optionally create subtenant hierarchy)
4. Select region
5. Agree to terms → Activate

### 2.4 Verify Activation
- Confirm tenant created in Hub
- Access CIE app in Strata Cloud Manager

---

## Phase 3: Directory Setup (Branching)

> User picks their directory type. Most deployments use 1-2 of these.

### 3a: Microsoft Entra ID (Azure AD)

#### Method 1: CIE Enterprise App (Recommended)
1. Get Directory (Tenant) ID from Entra admin center
2. CIE → Directories → Add New Directory → Entra ID
3. (Optional) Select additional data: user risk, roles, apps, devices
4. Enter Directory ID → Generate onboarding URL
5. Global Admin opens URL → authenticate → consent
6. Permissions auto-granted: Device.Read.All, Group.Read.All, User.Read.All, User.Read
7. Test Connection
8. (Optional) Custom directory name, group filters
9. Submit

#### Method 2: Client Credential Flow
1. Register app in Azure Portal (App Registrations → New)
2. Grant API permissions (Device.Read.All, GroupMember.Read.All, User.Read.All, User.Read)
3. Grant admin consent
4. Create client secret (copy immediately — shown only once)
5. Copy Application ID + Directory ID
6. CIE → Add Directory → Enter IDs + secret
7. Test Connection → Submit

#### Verification
- Sync Status = "Success" on Directories page
- Users and groups appear in CIE

### 3b: Okta

#### Method 1: Client Credential Flow (Recommended)
1. Okta Admin → Applications → API Service Integrations → Add Integration
2. Search "Palo Alto Networks Cloud Identity Engine"
3. Select variant (with or without app data)
4. Install & Authorize → copy client secret (shown once!)
5. Copy Okta Domain (without https://) and Client ID
6. CIE → Add Directory → Okta → Client Credential Flow
7. Enter domain, client ID, client secret
8. Test Connection → Submit

#### Method 2: Auth Code Flow
1. Get CIE redirect URI (`https://directory-sync.<region>.paloaltonetworks.com/authorize`)
2. Create Okta admin account
3. Create OIDC web app in Okta with redirect URI
4. Enable Refresh token + Use persistent token
5. Copy Client ID, Client Secret, Okta domain
6. Assign app to admin user
7. Grant API scopes (groups.read, users.read, logs.read, etc.)
8. CIE → Add Directory → Okta → Auth Code Flow
9. Sign in with Okta → Test Connection → Submit
- **Note**: Must reconnect every 90 days

#### Verification
- Sync Status = "Success"
- Users/groups visible (excluding default "Everyone" group)

### 3c: Google Workspace

1. Grant admin privileges in Google Admin console (OUs, Users, Groups, Devices, Domain Settings)
2. Mark CIE app as "Trusted" in Google Admin → Security → API Controls
3. Get Customer ID from Google Admin → Account Settings
4. CIE → Add Directory → Google → Enter Customer ID
5. Sign in with Google Admin credentials
6. Test Connection → Submit

#### Verification
- Sync Status = "Success"
- Configure sync interval (6h, 12h, or 24h)

### 3d: On-Premises Active Directory

1. Download Cloud Identity Agent installer from CIE
2. Install on Windows server near domain controllers
3. Configure service account with LDAP query permissions
4. Enter domain controller addresses (LDAP:389 or LDAPS:636)
5. Configure mutual certificate authentication
6. (Optional) Set OU/container filters to limit sync scope
7. Verify agent connects to CIE cloud service
8. Configure redundancy: multiple agents, multiple DCs

#### Verification
- Agent status = Connected in CIE
- Users, groups, devices syncing
- Check Cloud Identity Agent Logs for errors

---

## Phase 4: Authentication Setup (SAML 2.0)

> Branching again — matches the directory type from Phase 3.
> OIDC is Prisma Access Browser only (noted but not primary path).

### 4.0 Common: Generate SP Metadata in CIE
1. Authentication → Authentication Types → Add New → SAML 2.0
2. Select metadata type (Single SP or Dynamic SP for DPA)
3. Copy/download: Entity ID, ACS URL, SP Certificate, SP Metadata file

### 4a: Entra ID SAML
**Azure Portal side:**
1. Enterprise Applications → New → "Palo Alto Networks Cloud Identity Engine - Cloud Authentication Service"
2. Assign users/groups
3. Single sign-on → SAML → Upload SP Metadata
4. Set Sign-on URL: `https://<RegionUrl>.paloaltonetworks.com/sp/acs`
5. Copy App Federation Metadata URL

**CIE side:**
1. Profile Name, Vendor = Azure
2. Metadata via Get URL (paste App Federation Metadata URL)
3. (Optional) MFA flag, Force Authentication
4. Configure SAML attributes (Username required)
5. Test SAML Setup → Submit

### 4b: Okta SAML
**Okta side (Gallery App — recommended):**
1. Browse App Catalog → "Palo Alto Networks Cloud Identity Engine" (SSO version)
2. Paste SAML Region from CIE Entity ID
3. Set username format (Email for UPN)
4. Assign users

**CIE side:**
1. Profile Name, Vendor = Okta
2. Enter IdP metadata
3. Configure attributes → Test → Submit

### 4c: Google SAML
**Google Admin side:**
1. Apps → SAML Apps → Add custom SAML app
2. Download IdP Metadata
3. Enter CIE's Entity ID and ACS URL
4. Map attributes, enable for users

**CIE side:**
1. Profile Name, Vendor = Google
2. Upload IdP metadata (Get URL NOT supported)
3. Configure attributes → Test → Submit

### 4d: On-Prem AD (via CIE Agent)
- Authentication handled differently — CIE agent syncs users
- Can use SAML with any IdP that fronts AD (e.g., ADFS via Azure)
- Or use CIE's built-in password authentication for CIE Directory users

---

## Phase 5: Enforcement Point Integration (Branching)

### 5a: Panorama Integration
1. Configure CIE as User-ID mapping source
2. Device → User Identification → Cloud Identity Engine
3. Enter CIE tenant URL
4. Enable User-ID redistribution via CIE segments
5. Commit to Panorama
6. Push to managed firewalls

### 5b: SCM Integration
1. CIE auto-associates with SCM-managed devices
2. Verify CIE appears in SCM → Identity → Cloud Identity Engine
3. Configure user-group mapping in security policy
4. Push configuration to managed firewalls

---

## Phase 6: Security Policy with Identity

### 6.1 Create Authentication Profile
1. Authentication → Authentication Profiles → Add
2. Select mode: Single (one IdP) or Multiple (per-group IdP mapping)
3. Assign directories, groups, authentication types
4. Set default authentication type
5. Submit

### 6.2 Create Cloud Dynamic User Groups (Optional)
1. Directories → Groups → Create New Dynamic User Group
2. Select category: Attribute Based or On Demand Assignment
3. For Attribute Based: define rules (department, location, risk level, etc.)
4. Submit — CIE auto-appends `_cdug` suffix

### 6.3 Configure User/Group-Based Security Policy
1. Create/edit security policy rules
2. Use Source User or Source User Group fields
3. Reference CIE-synced groups or CDUGs
4. Commit and push

---

## Phase 7: MFA Integration

### 7.1 Enable MFA in IdP
- Configure MFA in Entra ID / Okta / Google / PingOne as appropriate

### 7.2 Enable MFA Flag in CIE
- Edit SAML authentication type → enable MFA checkbox
- This tells the firewall the user completed MFA

### 7.3 Force Authentication (Optional)
- Enable in SAML profile for GlobalProtect reconnects
- Forces re-login rather than using cached sessions

### 7.4 MFA in Security Policy
- Use MFA status in authentication policy
- Differentiate access levels based on MFA completion

---

## Phase 8: Validation & Verification

### 8.1 Directory Sync Verification
- CIE → Directories → verify Sync Status = "Success"
- Confirm user count matches expected
- Trigger manual Full Sync if needed (90s cooldown between syncs)

### 8.2 Authentication Test
- Test SAML Setup from CIE for each IdP
- Attempt user login through GlobalProtect or Captive Portal
- Verify correct IdP redirect and authentication flow

### 8.3 User-ID Verification on Firewall
- `show user ip-user-mapping all` — verify IP-to-user mappings
- `show user group list` — verify group sync
- Check User-ID logs for sync activity

### 8.4 Policy Verification
- Generate test traffic from identified user
- Verify security policy matches user/group correctly
- Check Traffic logs for user/group attribution

### 8.5 Dynamic User Group Verification
- Verify CDUG membership updates when user attributes change
- Test policy enforcement based on CDUG membership

---

## Reference Section

### Ports & Protocols Table
| Port | Protocol | Purpose |
|------|----------|---------|
| 443  | HTTPS    | CIE cloud communication |
| 80   | HTTP     | Certificate verification (GoDaddy CRL/OCSP) |
| 389  | LDAP     | On-prem AD queries |
| 636  | LDAPS    | On-prem AD queries (encrypted) |

### App-ID Table
| App-ID | Usage |
|--------|-------|
| `paloalto-cloud-identity` | Agent-to-CIE traffic |
| `ssl` | LDAPS, SSL decryption bypass |
| `web-browsing` | Required with cloud-identity App-ID |
| `ldap` | Agent-to-AD traffic |

### Sync Schedule Summary
| Directory | Incremental | Full | Notes |
|-----------|------------|------|-------|
| Entra ID  | 5 min (filtered), 40 min (SCIM) | Weekly | Device sync daily |
| Okta      | On change | As needed | Apps max 3hr |
| Google    | Not available | 6/12/24hr configurable | Manual CDUG sync |
| On-prem AD | Continuous | As needed | Agent-based, real-time |

### Troubleshooting
- Common errors and resolutions
- Sync failure diagnostics
- Certificate/secret expiration warnings
- Reconnection procedures per directory type
