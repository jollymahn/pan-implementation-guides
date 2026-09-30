<!-- @snippet
  title: AI Gateway licensing and activation
  desc:  Markdown twin. Follows the .md convention of the AI Gateway guides, which carry diagrams but not screenshots, so the screenshot blocks in the .html variant have no counterpart here.
  vars:  stepPrereq, stepSizing, stepProfile, stepTsg, stepOpen, deploymentModelRef, tsgConceptRef, gatewayCardNext
-->
### {{stepSizing}}: Size your license by monthly token consumption

All AI Gateway metering is token-based. Every AI transaction through the gateway (prompts, MCP interactions, and A2A traffic) draws down flex credits by token usage, and you license the instance against your **maximum expected monthly token consumption**.

The token conversion is the industry standard:

```
1 token = 4 characters of text

estimated monthly tokens = total characters sent and received per month / 4

billion tokens per month = estimated monthly tokens / 1,000,000,000

Example: 12,000,000,000 characters per month
  tokens   = 12,000,000,000 / 4 = 3,000,000,000
  billions = 3,000,000,000 / 1,000,000,000 = 3
```

To build the estimate, inventory the applications, agents, and MCP servers that will route through the gateway, and for each one approximate: requests per month, average prompt size (including system prompts and context), and average response size. Sum the character counts, divide by 4, and add headroom for growth.

> **Warning: Both directions count.** Metering covers the full transaction, not just what you send. Long model responses and large context windows (retrieved documents, tool schemas, conversation history) dominate token counts in most real workloads.

> **Verify.** You have a single number in billions of tokens per month (with growth headroom) to type into the **Billion tokens per month** field in the next step. Round up to a whole number of billions; enter `1` for anything under one billion.

<!-- TODO: verify whether the Billion tokens per month field accepts a decimal such as 0.5 -->

### {{stepProfile}}: Create the deployment profile and allocate flex credits

The deployment profile is the licensing object that funds AI Gateway. You create it in the **Customer Support Portal** (not Strata Cloud Manager), from the credit pool that holds your flex credits. Creating it and finishing setup (next step) is what activates the gateway for your tenant.

1. Log in to the [Palo Alto Networks Customer Support Portal](https://support.paloaltonetworks.com/).
2. In the left navigation, expand **Products** and select **Software NGFW Credits**. (Flex credits for every Software NGFW and Prisma AIRS product, AI Gateway included, come from the same pools, so this is the right page.)
3. Locate the credit pool that will fund the gateway and click its name (or its row) to open the pool page; if several are listed, pick one whose remaining credits cover your {{stepSizing}} estimate. The pool page shows total credits, the allocated and consumed meters, the expiration date, and, at the bottom, the **Current Deployment Profiles** table.
4. Before creating anything, scroll to the **Current Deployment Profiles** table. If a row with product type **AI-GW** already exists from an earlier attempt, do not create another; it already holds a credit allocation. Skip to {{stepTsg}} and use that row's **Finish Setup** link. If you created a profile by mistake, contact your Palo Alto Networks account team or CSP Super User to have it removed and its credits returned.
5. Click **Create New Profile** (above the Current Deployment Profiles table).
6. In the **Create Deployment Profile: STEP 1** dialog, the products are laid out in labeled columns. Find the column headed **Prisma AIRS:** and click **AI Gateway** within it so its option is selected. The dialog calls this the firewall type because the same wizard provisions Software NGFW products; AI Gateway is not a firewall, and selecting it here is correct. Click **Next**.
7. Complete the **FORM** stage:
   - **Deployment** &mdash; select the option matching your deployment model{{deploymentModelRef}}: **Managed Service** if you chose SaaS (Palo Alto Networks hosts the data plane), or **Self Service (DIY)** if you chose Hybrid (you host the data plane). This is recorded for tracking only and is not enforced: it does not affect the credit allocation or the usage limit, so a profile created as Managed Service works unchanged for a Hybrid deployment. If you are still undecided, choose Managed Service.
   - **Profile Name** &mdash; a descriptive name, for example `AI-Gateway-Deployment-Profile`.
   - **Billion tokens per month** &mdash; the billions figure you calculated in {{stepSizing}}.
   - **Bundled** &mdash; no action needed. **Strata Cloud Manager Pro** is bundled with AI Gateway automatically and cannot be deselected. Its cost is included in the credit estimate you see in the next item, so that estimate covers more than AI Gateway alone.
   - **Notes** &mdash; optional.
8. Click **Calculate Estimated Cost**. The dialog shows how many credits this profile will draw and how many remain available in the pool; this is the flex credit allocation.
9. Click **Create Deployment Profile**. The dialog closes and returns you to the **Software NGFW Credits** credit pool page, with your new profile listed in the **Current Deployment Profiles** table at the bottom.

<!-- TODO: verify whether the credit pool page offers a self-service delete for a deployment profile; if it does, name the control in item 4 above -->
<!-- TODO: verify that the Deployment field has no effect on the usage limit shown on the profile row -->

> **Verify.** The new profile appears in the **Current Deployment Profiles** table with product type **AI-GW**, your credit allocation under Credits Consumed / Allocated, a usage limit reflecting your token volume, and an **Auth Code**. Nothing in this guide asks you to enter the Auth Code. Treat it as confidential: do not paste it into tickets, chat, or screenshots you share. The **Finish Setup** link on this row is the entry point for the next step.

### {{stepTsg}}: Map the deployment profile to a Tenant Service Group

Mapping the deployment profile to a **Tenant Service Group (TSG)** is the link that connects Strata Cloud Manager and the Strata Logging Service to your AI Gateway. The TSG you map becomes the AI Gateway *organization*{{tsgConceptRef}}. The activation form labels the TSG as the **Tenant**.

1. On the same **Software NGFW Credits** credit pool page from {{stepProfile}}, scroll to the **Current Deployment Profiles** table and click the **Finish Setup** link on your AI-GW profile row. If you navigated away after the last step, get back via **Products > Software NGFW Credits** and reopen the same pool. The **Activate Subscriptions based on Deployment Profile(s)** page opens.
2. Under **Select Customer Support Account**, choose the support account used to create the deployment profile.
3. Under **Specify the Recipient**, select the **Tenant** that will own the gateway. This is the TSG. To confirm which name is yours, match it against the tenant name Strata Cloud Manager displays for the account you logged into in {{stepPrereq}}. If only one tenant is listed, select it.
4. Under **Select Region**, choose your region (for example, **United States - Americas**). The form will not proceed without it.
5. Under **Select Deployment Profile(s)**, check the AI Gateway profile you created (its services column reads **Strata Cloud Manager Pro, AI Runtime Security Gateway**). Profiles already associated with this tenant are pre-checked; leave them checked, so the selected count will read higher than one. Unchecking a pre-checked profile removes its association when you activate. Click **Done**.
6. Leave **Data Loss Prevention** and **Additional Services** at their pre-populated defaults; AI Gateway requires neither. Pick a **Data Loss Prevention** instance from the dropdown, or check **Cloud Identity Engine** (CIE, the Palo Alto Networks directory integration service) and pick its instance, only if you are deliberately associating that service. A greyed-out DLP field means nothing is needed.
7. Check **Agree to the Terms and Conditions**, then click **Activate**.

<!-- TODO: verify the exact SCM location where the tenant name is shown and name it in item 3 above -->

> **Note: Checking whether activation already ran.** To check whether activation already happened, open **Products > Software NGFW Credits**, open the pool, and look at the AI-GW row: an activated profile shows the tenant it was associated with. If it does, do not run this step again; go to {{stepOpen}} and wait out the delay there. Re-opening the activation form on an already-associated profile shows it pre-checked; clicking **Activate** again with it checked is harmless, but unchecking it removes the association.

<!-- TODO: verify the exact indicator on the AI-GW row after activation (tenant name in a Tenant column, or a status other than Available) -->

> **Verify.** After you click **Activate**, the form submits without an error message. If an error banner appears instead, correct the field it names and click **Activate** again. SCM and SLS are now linked to the gateway, which also enables Threat Log visibility in the SLS dashboard later. The functional check is the AI Gateway card appearing in {{stepOpen}}.

<!-- TODO: verify what the page shows after Activate (a confirmation message, a return to the credit pool page, or a status change on the profile row) and state it here -->

### {{stepOpen}}: Open the AI Gateway in Strata Cloud Manager

With licensing in place, complete setup from inside SCM:

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com/).
2. In the left navigation, select **AI Security > Home**.
3. On the Home page, locate the **AI Gateway** card under **Select a feature to begin onboarding**. On a fresh tenant (status **Not Started**) it offers three actions: **Go to Gateway Registration**, **Launch AI Gateway**, and **Deploy Hybrid**. {{gatewayCardNext}}

> **Verify.** The AI Gateway card appears on the AI Security Home page with its three actions available, confirming the deployment profile and TSG mapping took effect. A **Not Started** status on the card is expected at this point; it reflects onboarding progress, not a licensing problem. If the card or its actions are missing, wait up to 30 minutes (the deployment profile to TSG association can take that long), refresh, then recheck {{stepProfile}} and {{stepTsg}}.
