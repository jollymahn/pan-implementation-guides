<!-- @snippet
  title: AIRS cloud-onboarding
  desc:  Markdown twin of airs-cloud-onboarding.html. Screenshots omitted, per the twins' convention.
  vars:  phaseId, deployRef
-->
Onboard your cloud accounts in Strata Cloud Manager to enable AI asset discovery. This surfaces your AI workloads, models, traffic flows, and protection status before deploying firewalls.

### Step {{phaseId}}.1 -- Navigate to Cloud Account Manager

1. Log in to [Strata Cloud Manager](https://stratacloudmanager.paloaltonetworks.com).
2. Navigate to `AI Security` > `AI Runtime` > `AI Runtime Firewall`.
3. Click the **Cloud Account Manager** (cloud icon).
4. Click `Add Cloud Account`.

> **Success: Verification**
>
> The Cloud Account Manager interface loads and displays the `Add Cloud Account` option.

### Step {{phaseId}}.2 -- Onboard Cloud Account

Follow the onboarding workflow for your cloud provider. Each cloud has specific IAM configuration steps.

#### AWS

1. Select **AWS** as your cloud provider.
2. Enter your **AWS Account ID**.
3. Configure the **IAM role** for SCM access:
   - SCM provides a CloudFormation template or Terraform template to create the required IAM role
   - The role grants read permissions for discovery and optional write permissions for auto-execute deployment
4. Configure **Application Definition** criteria (how SCM identifies applications in your environment).
5. Download and apply the generated **Terraform template** in your AWS account.
6. Return to SCM and click `Validate` to confirm the connection.

For existing VM-Series or AIRS firewalls to be discovered, tag your EC2 instances:

```
paloaltonetworks.com-monitored: enable
serialNumber: <serial-number-or-comma-separated-list>
```

#### Azure

1. Select **Azure** as your cloud provider.
2. Enter your **Azure Subscription ID**.
3. Configure the **service principal** or **managed identity** for SCM access:
   - Requires **Reader role** at minimum for discovery
   - Additional permissions needed for serverless discovery (Azure Functions)
4. Configure **Application Definition** criteria.
5. Apply the provided ARM template or Terraform template in your Azure subscription.
6. Return to SCM and click `Validate`.

For existing firewalls to be discovered, tag your Virtual Machines:

```
paloaltonetworks.com-monitored: enable
serialNumber: <serial-number-or-comma-separated-list>
```

#### GCP

1. Select **GCP** as your cloud provider.
2. Enter your **GCP Project ID**.
3. Configure the **service account** for SCM access.
4. Configure **Application Definition** criteria.
5. Apply the provided Terraform template in your GCP project.
6. Return to SCM and click `Validate`.

For existing firewalls, tag your Compute Engine instances:

```
paloaltonetworks_com-monitored: enable
serialnumber: <serial-number-or-comma-separated-list>
```

> **Note: GCP Tag Format**
>
> GCP uses underscores instead of dots in tag keys (`paloaltonetworks_com`) and lowercase for the serial number key (`serialnumber`).

> **Success: Verification**
>
> In the Cloud Account Manager, your onboarded account shows as **Active**. The sync icon indicates configuration is syncing from SCM to the cloud account.

### Step {{phaseId}}.3 -- Review Cloud Asset Map

The Cloud Asset Map provides a geographical view of your cloud regions, showing resource distribution and protection status.

1. Navigate to `AI Security` > `AI Runtime Firewall` > `Cloud Asset Map`.
2. Review the infrastructure view for your onboarded cloud accounts.
3. Identify regions and VPCs/VNets marked as:
   - **Green** -- Fully protected
   - **Orange** -- Partially protected
   - **Red** -- Unprotected
4. Drill into specific regions to see VPC-level details, applications, and traffic flows.

The topology view shows relationships between components and helps identify unprotected traffic paths that need Network Intercept protection.

> **Note: Initial Discovery Timing**
>
> Initial discovery may take several minutes after onboarding. Deleted cloud assets can continue to appear in the UI for up to 24 hours.

> **Success: Verification**
>
> The Cloud Asset Map displays your cloud regions with VPC/VNet details. Unprotected traffic paths are visible in red/orange, helping inform your firewall placement decisions in {{deployRef}}.

### Step {{phaseId}}.4 -- Analyze AI Traffic & Network Risk

The AI Traffic and Network Risk Analysis views reveal which applications communicate with AI models, which traffic is protected, and where threats are occurring.

1. Navigate to `AI Security` > `AI Runtime Firewall`.
2. Select the **Operational** view for traffic analysis.
3. Review the three risk analysis views:

| View | Traffic Direction | What It Shows |
|---|---|---|
| **Models** | East-west (App > AI Model) | Which apps communicate with AI models; model endpoint protection status |
| **Internet** | Outbound (App > External) | Internet-facing assets; safe vs. unsafe destinations accessed by apps |
| **Users** | Inbound (External > App) | Unprotected traffic flows; threat actors attempting unauthorized access |

4. Select the **Security** view for threat assessment -- threats prioritized by urgency and risk type.
5. Use **Add Protection** icons to identify where firewalls should be deployed between network segments.

> **Success: Verification**
>
> At least one of the three views (Models, Internet, Users) shows discovered traffic flows. Unprotected flows are highlighted, informing firewall placement decisions.

### Step {{phaseId}}.5 -- Configure Agent Discovery (Optional)

Agent Discovery identifies AI agents built through cloud provider platforms (AWS Bedrock Agents, Azure AI Foundry / OpenAI Agents).

- **AWS Bedrock Agents** -- Configuration discovery + runtime interaction monitoring (agent-to-model, agent-to-tool, agent-to-agent). Requires S3 bucket access for invocation log analysis.
- **Azure AI Foundry / OpenAI Agents** -- Configuration discovery (runtime monitoring support is pending).

After enabling agent discovery, discovered agents appear as **Protected** or **Unprotected** with Sankey-style diagrams showing agent interactions, dependencies, knowledge bases, and tool usage.

Reference: [Agent Discovery Documentation](https://docs.paloaltonetworks.com/ai-runtime-security/administration/agent-discovery)

> **Success: Verification**
>
> If agent discovery is enabled, AI agents from your cloud accounts appear in the discovery dashboard with protection status indicators.
