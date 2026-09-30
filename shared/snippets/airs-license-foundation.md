<!-- @snippet
  title: AIRS license-foundation
  desc:  Markdown twin of airs-license-foundation.html. Screenshots omitted, per the twins' convention.
  vars:  phaseId, onboardingRef
-->
Activate your license, Strata Logging Service, and device certificate. These are the foundation everything else builds on.

### Step {{phaseId}}.1 -- Activate Your AIRS License

1. Click the activation link in your **purchase confirmation email**.
2. Log in to the **Hub** with your Palo Alto Networks Customer Support credentials.
3. Select your **Prisma AIRS AI Runtime Firewall** subscription.
4. Associate the subscription with your **Customer Support account**.
5. Confirm the activation. The license provisions the following bundled services:
   - AI App Protection, AI Model Protection, AI Data Protection
   - Cloud Identity Engine & SCM Pro
   - Enterprise DLP
   - Advanced Threat Prevention, Advanced URL Filtering, Advanced WildFire, Advanced DNS Security
   - GlobalProtect

> **Success: Verification**
>
> In the Customer Support Portal, navigate to `Products` > `Software/Cloud NGFW Credits`. An active credit pool for AIRS should appear.

### Step {{phaseId}}.2 -- Activate Strata Logging Service

Strata Logging Service stores AI security logs, threat logs, and provides data for the discovery dashboard and SLR reports.

1. Click the SLS activation link in your confirmation email (or navigate from the Hub).
2. Select your **Strata Logging Service subscription** and click `Activate`.
3. Log in with your Palo Alto Networks Customer Support credentials.
4. Select the **Customer Support account** to associate.
5. Configure your Tenant Service Group (TSG):
   - **New TSG:** Create a new tenant service group and provide a name.
   - **Existing TSG:** Select an existing TSG. A tenant can have only one SLS instance.
6. Select the **region** for your SLS instance.
7. Click `Add Instance` to deploy SLS to the TSG.
8. Verify storage space and region settings.
9. Accept the Terms and Conditions and click `Activate`.

> **Warning: SLS Expiration Grace Period**
>
> When your SLS subscription expires, you have a **30-day grace period** to renew before log data is deleted. Set a calendar reminder for your renewal date.

> **Warning: SLS Must Be Active Before Cloud Onboarding**
>
> The Strata Logging Service license must be active before onboarding cloud accounts in {{onboardingRef}}. Expired logging licenses require renewal before proceeding.

> **Success: Verification**
>
> In the Hub, navigate to your TSG and confirm the SLS instance shows as **Active** with the correct region.

### Step {{phaseId}}.3 -- Generate a Device Certificate

The device certificate enables secure communication between the firewall and Palo Alto Networks licensing servers and Cloud-Delivered Security Services. This is mandatory before deploying a Prisma AIRS AI Runtime Firewall.

1. Log in to the [Customer Support Portal](https://support.paloaltonetworks.com).
2. Navigate to `Products` > `Device Certificates` > `Generate Registration PIN`.
3. Enter a **description** (e.g., "AIRS Network Intercept Production").
4. Select a **PIN expiration period**.
5. Click `Generate Registration PIN`.
6. Immediately save both values:
   - **PIN ID**
   - **PIN Value**

> **Danger: PINs Expire**
>
> Registration PINs have an expiration date. If the PIN is not used before it expires, return to the Customer Support Portal and generate a new one. Plan to use it within the same session as deployment.

> **Success: Verification**
>
> Confirm both the PIN ID and PIN Value are saved securely. These are required during firewall bootstrap.

### Step {{phaseId}}.4 -- Create a Deployment Profile

A deployment profile defines your resource allocation (vCPUs per instance, number of instances) and bundles the required security services.

#### Part 1: Create the Profile

1. In the Customer Support Portal, navigate to `Products` > `Software/Cloud NGFW Credits`.
2. Locate your credit pool and click `Create Deployment Profile`.
3. Select product type: **Prisma AIRS AI Runtime Firewall**.
4. Select PAN-OS version: **PAN-OS 11.2.2 and above**.
5. Configure the profile:
   - **Deployment Profile Name:** A descriptive name (e.g., `AIRS-NetIntercept-Prod`)
   - **Number of instances:** Planned firewall count
   - **vCPUs per instance:** Minimum 4 (impacts transaction limits: 10K AI transactions/day/vCPU)
6. Optionally configure **Panorama management with Log Collector** if using Panorama.
7. Click `Create Deployment Profile`.

#### Part 2: Associate the Profile with a TSG

1. In the credit pool details, locate your new profile and click `Finish Setup`.
2. Select your **Customer Support Account**.
3. Select the **Tenant** (same TSG as your SLS instance -- verify SLS is enabled).
4. Select the **Region**.
5. Select your deployment profile.
6. Enable **Cloud Identity Engine** (recommended).
7. Accept the Terms and Conditions.
8. Click `Activate`.
9. **Record the Auth Code** that appears -- this is required during firewall deployment.

> **Warning: Allow 30 Minutes for TSG Association**
>
> The initial association between the deployment profile and TSG can take **up to 30 minutes** to complete. Wait for the association to finish before proceeding to {{onboardingRef}}.

> **Danger: Do Not Uncheck Existing Profiles**
>
> When modifying deployment profiles, do not uncheck existing profiles. This breaks TSG associations and can disrupt active firewall deployments.

> **Success: Verification**
>
> In the Customer Support Portal, your deployment profile shows as **Active** with the correct TSG association. In the Hub, navigate to `Common Services` > `Tenant Management` to verify. Record the Auth Code.
