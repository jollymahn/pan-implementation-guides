# AI Red Teaming — Technical Requirements Document

**Customer intake for AIRS AI Red Teaming engagements**

> **How to use this document**
>
> - `*` **Required** — engagement cannot proceed without this
> - `†` **Conditional** — required only if a prior answer triggers it
> - _Unmarked_ — optional, improves engagement quality
>
> **Part A** is completed once per customer. **Part B** once per engagement. **Part C** is repeated for each target or target group.

> **Cross-reference:** This TRD feeds the [AI Red Teaming Deployment Guide](../../guides/airs-red/airs-red-teaming.html). Each section below notes which guide step consumes its data.
>
> **Fast-start version:** If this is a standard deployment with no custom attack development or SIEM integration, use the [Deployment Readiness Checklist](trd-redteaming-fast-start.md) instead — it contains only the fields that directly block deployment.

---

## Prerequisites

Complete all items in this section before the deployment call begins. Each missing item is a potential session-stopper. Use this as a pre-engagement gate — if items remain unresolved one week before the call, reschedule.

---

### Licensing and Credits

AI Red Teaming is licensed through Software NGFW Credits, not as a standalone SKU. Credits are allocated from the Customer Support Portal (CSP) and consumed as scans run.

**What can block you:** The CSP admin role required to allocate credits is separate from SCM admin access. A standard SCM admin cannot view or allocate credits. If the correct CSP admin is not identified and available for the deployment call, activation cannot proceed. This is the most common day-of blocker.

| Requirement | Status |
|---|---|
| Active Palo Alto Networks Customer Support Portal account | ☐ Confirmed |
| AIRS credits available (Software/Cloud NGFW Credits) | ☐ Confirmed |
| CSP admin with credit allocation role: identified and available for the call | ☐ Confirmed |

---

### Strata Logging Service (SLS)

SLS is a **mandatory prerequisite** for AIRS. It must be enabled on the tenant before AIRS activation begins. If SLS is not enabled, the activation flow fails mid-process and cannot be recovered without starting over. SLS cannot be added after the deployment profile is created.

**Do not schedule the deployment call until SLS is confirmed active on the target tenant.**

| Requirement | Status |
|---|---|
| SLS enabled on the target tenant (verify in Common Services before the call) | ☐ Confirmed |

---

### Tenant Service Group (TSG) and Region

AIRS is provisioned inside a Tenant Service Group (TSG) in the Palo Alto Networks hub. The TSG and region are selected when the deployment profile is created and **cannot be changed after activation**.

**What can block you:**
- Choosing the wrong region requires full re-activation. Confirm Americas, EU-Netherlands, or Singapore based on data residency requirements before the call.
- An existing AIOps for NGFW subscription on the same tenant can cause licensing conflicts during AIRS onboarding. Identify and resolve before the call.
- A new TSG takes 15–20 minutes to provision; a new deployment profile can take up to 2 hours to activate. Build this into the call timeline — start activation early.

| Requirement | Status |
|---|---|
| TSG identified: existing TSG ID confirmed, or decision to create new | ☐ Confirmed |
| Region confirmed: Americas / EU-Netherlands / Singapore | ☐ Confirmed |
| AIOps for NGFW subscription status confirmed on this tenant | ☐ Confirmed |

---

### IAM and Permissions

**What can block you:**
- Standard SCM roles do not include AI Red Teaming access. A custom role must explicitly enable the "AI Red Teaming" permission, or users must be assigned the Superuser role. Users with standard roles will see the SCM dashboard but not the AI Red Teaming module.
- The Client Secret for a service account is displayed only once at creation. If it is not recorded immediately, the account must be deleted and recreated — which can disrupt pipeline configurations if it has already been used.
- SSO provisioning (Okta, Entra ID, Ping) may require an IT ticket with a multi-day lead time. Start provisioning at least one week before the call.

| Requirement | Status |
|---|---|
| SCM accounts created for all engagement participants | ☐ Confirmed |
| Role assigned: Superuser OR custom role with AI Red Teaming explicitly enabled | ☐ Confirmed |
| Service account created and Client Secret stored securely (if API or CI/CD access needed) | ☐ Confirmed |
| SSO/IdP provisioning complete for all users (if SSO in use) | ☐ Confirmed |

---

### Network Readiness

Whether the target AI endpoints are publicly accessible or private determines whether Phase 5 (Network Channel deployment) is required. This is the single most important connectivity question — answer it before scheduling.

**Public endpoints (internet-accessible):** No Network Channel needed. Confirm endpoint reachability and WAF strategy before the call.

**Private endpoints (behind firewall, VPN, or VPC):** A Network Channel must be deployed inside the customer's Kubernetes cluster before scanning can begin. All connectivity is outbound from the cluster — no inbound rules are needed — but the cluster must have outbound internet access to three specific FQDNs.

**What can block you for private endpoints:**
- Kubernetes is required for the Network Channel, but it does not have to be a managed cloud cluster. A lightweight single-node distribution (Minikube, k3s, or Kind) running on any VM or on-premises server is sufficient. If no K8s exists at all, the customer can install k3s or Minikube on any machine that has access to the private AI endpoint and outbound internet — budget 30–60 minutes. Only if no form of K8s is available or installable should the call be rescheduled.
- Outbound internet blocked from K8s to the AIRS FQDNs. These must be allowlisted before the call — they cannot be opened in real time during deployment.
- Helm not installed. Budget time to install it if missing.

**If public:**
| Requirement | Status |
|---|---|
| Endpoint URL reachable from the internet (test with curl) | ☐ Confirmed |
| WAF/API gateway allowlisting completed, or test-through-WAF strategy agreed | ☐ Confirmed |

**If private:**
| Requirement | Status |
|---|---|
| Kubernetes available: managed (EKS/AKS/GKE), self-managed, or lightweight (Minikube/k3s/Kind on VM or on-prem server) | ☐ Confirmed |
| Cluster has network access to the private AI endpoint | ☐ Confirmed |
| Helm 3.x installed | ☐ Confirmed |
| kubectl configured for the cluster | ☐ Confirmed |
| Outbound access to `api.sase.paloaltonetworks.com` | ☐ Confirmed |
| Outbound access to `auth.apps.paloaltonetworks.com` | ☐ Confirmed |
| Outbound access to `registry.ai-red-teaming.paloaltonetworks.com` | ☐ Confirmed |
| K8s operator or admin confirmed available for the call | ☐ Confirmed |

---

### Target Endpoint Readiness

**What is a target?** A target is the AI system being tested. It falls into one of three types:
- **Raw model API** — a direct connection to a foundation model endpoint with no application layer: GPT-4o at `api.openai.com`, Claude at `api.anthropic.com`, a Bedrock-hosted model, a self-hosted Llama instance.
- **AI-powered application** — a model wrapped with a system prompt, business logic, and safety guardrails: a customer service chatbot, an HR policy assistant, a legal document summarizer, a financial advisor application, a retail shopping assistant. Most enterprise targets fall into this category.
- **AI agent** — an autonomous system with tool access that can take multi-step actions: a code review agent with repository access, a data analysis agent that writes and executes SQL, a research assistant that browses the web, an IT support agent that opens and closes tickets. These carry the highest risk due to tool misuse potential.

**Understanding rate limits:** RPM (Requests Per Minute) is how many API calls AIRS can make to the target per minute. TPM (Tokens Per Minute) is how many total tokens — input plus output combined — the API allows per minute. AIRS sends attack prompts sequentially; rate limits cap how fast those prompts can flow. An Attack Library scan contains hundreds of prompts spread over approximately 5 hours — at 20 RPM that is roughly 6,000 total requests, sufficient for a complete scan. Below 10 RPM the scan cannot complete in a reasonable window. TPM is a separate constraint: attack payloads are often verbose, especially when a full system prompt is included in every request body, and a TPM limit below 10,000 will cause throttling even when RPM is acceptable.

Complete for each AI target before the call. A target that fails validation on the day of the call adds 30–60 minutes of unplanned troubleshooting.

| Requirement | Status |
|---|---|
| Endpoint URL confirmed and reachable | ☐ Confirmed |
| Auth credentials valid and not expiring within 6 hours (or static key confirmed) | ☐ Confirmed |
| Rate limits confirmed: minimum 20 RPM and 20,000 TPM (dedicated test API key recommended) | ☐ Confirmed |
| Guardrail response captured: send a known-harmful prompt and record HTTP status + response body | ☐ Confirmed |
| Request template drafted with `{{prompt}}` placeholder | ☐ Confirmed |
| Response body path confirmed against a real API response | ☐ Confirmed |
| Test environment confirmed (production scanning requires explicit risk acceptance) | ☐ Confirmed |

---

## Part A: Engagement Context

_Asked once per customer. Establishes who they are, what AI systems they have, and what they need._

---

### 1. Engagement Overview `SCOPING`

| Question | Format | Response / Notes |
|---|---|---|
| `*` Customer name | text | |
| `*` Primary business driver for AI red teaming? | select | Pre-deployment security validation / Compliance requirement / Risk assessment / Incident response / Other |
| `*` What does success look like for this engagement? | text | |
| `*` Target start date | date | YYYY-MM-DD |
| Desired completion date | date | YYYY-MM-DD |

**Stakeholder Contacts:**

| Role | Name | Email | Notes |
|---|---|---|---|
| `*` Project sponsor | | | |
| `*` Technical lead (AI/ML) | | | |
| `*` Security lead | | | |
| CSP portal admin | | | |

> **Consultant Notes:** The business driver shapes scope. Compliance-driven engagements need compliance-mapped reports (OWASP, NIST). Risk assessment prioritizes breadth across targets. Most customers cite "pre-deployment validation" but actually need compliance evidence for auditors — probe for the real audience of the final report.

---

### 2. Target Overview `ESSENTIAL`

List every AI system to be tested. Each row drives a Part C section.

| # | Application Name | Type | Use Case | Hosting | Priority |
|---|---|---|---|---|---|
| 1 | _______________ | Model / Application / Agent | _______________ | Cloud / On-prem / Hybrid | High / Medium / Low |
| 2 | _______________ | Model / Application / Agent | _______________ | Cloud / On-prem / Hybrid | High / Medium / Low |
| 3 | _______________ | Model / Application / Agent | _______________ | Cloud / On-prem / Hybrid | High / Medium / Low |
| 4 | _______________ | Model / Application / Agent | _______________ | Cloud / On-prem / Hybrid | High / Medium / Low |
| 5 | _______________ | Model / Application / Agent | _______________ | Cloud / On-prem / Hybrid | High / Medium / Low |

> **Consultant Notes:** Row count determines Part C sections, credit consumption, and package. Target types: **Model** = direct endpoint (simplest), **Application** = app with business logic/guardrails (needs industry/use case), **Agent** = autonomous with tool access (needs tool schemas). A single model behind 3 apps = 3 targets (different system prompts, guardrails, use cases).

---

### 3. Compliance Requirements `IMPORTANT`

| Question | Format | Response / Notes |
|---|---|---|
| Which compliance frameworks must scan results map to? | multi-select | OWASP LLM Top 10 / MITRE ATLAS / NIST AI RMF / DASF V2.0 / None specific / Other: ___ |
| Are compliance-mapped reports required for auditors or regulators? | select | Yes — auditor delivery / Yes — internal compliance / No |
| Industry-specific AI regulations that apply? | text | e.g., EU AI Act, FDA AI/ML guidance, FFIEC |

> **Consultant Notes:** Framework selection drives COMPLIANCE subcategories in scan config (Step 6.2). Common: Financial services → NIST + OWASP. Healthcare → NIST. Tech → OWASP + MITRE ATLAS. If they don't know: enable all four — no performance penalty.

---

### 4. Remediation Expectations `IMPORTANT`

| Question | Format | Response / Notes |
|---|---|---|
| Will Red Teaming findings feed into AIRS Runtime for real-time protection? | select | Yes — RT→Runtime bridge planned / Under evaluation / No — manual remediation only |
| Who will implement remediation? | select | Customer AI/ML team / Customer security team / Palo Alto Networks PS / Joint effort |

> **Consultant Notes:** RT→Runtime bridge is a key upsell. If planned, coordinate deployment profiles and ensure Runtime API Intercept is licensed. Customers who say "manual only" often change their mind after the first report.

---

## Part B: Platform Configuration

_Asked once per engagement. Covers licensing, tenant setup, network topology, and engagement sizing._

---

### 5. Licensing & Credits `ESSENTIAL`

_Feeds: Guide Step 3.1 — Create a Deployment Profile_

> **Why this matters:** AIRS AI Red Teaming is activated using credits from the Customer Support Portal (CSP). Without allocated credits, no deployment profile can be created and the engagement cannot start.
>
> **Potential blockers:** The CSP admin role is distinct from a standard SCM admin. A user with only SCM access cannot allocate or verify credits. If the deployment call begins and the right CSP admin is not available, activation will stall. Identify and confirm this person before scheduling the call. Deployment profile activation itself takes up to 2 hours — factor this into the call schedule.

| Question | Format | Response / Notes |
|---|---|---|
| `*` CSP admin email (with credit allocation permissions) | email | |
| `*` Total credits in customer's AIRS pool? | number | |
| `*` Credits allocated specifically for AI Red Teaming? | number | |
| Are credits shared with other AIRS products (Runtime, Model Security)? | select | Yes — shared pool / No — dedicated RT allocation |

> **Consultant Notes:** Credits determine scan quota. CSP admin must have the credit allocation role — standard SCM admins cannot allocate credits. Verify this during the pre-engagement call to avoid day-of delays.

---

### 6. Tenant & TSG `ESSENTIAL`

_Feeds: Guide Step 3.1 — Create a Deployment Profile_

> **Why this matters:** The deployment profile binds AIRS to a specific tenant (TSG) in a specific region. These settings are permanent — they cannot be changed after activation. Getting region wrong means full re-activation.
>
> **Potential blockers:** Strata Logging Service (SLS) is a hard prerequisite for AIRS. If SLS is not enabled before activation begins, the activation flow fails and cannot be completed during the same call. An existing AIOps for NGFW subscription on the same tenant can also create conflicts during AIRS onboarding. Both must be verified — and SLS enabled — before the deployment call. A new TSG takes 15–20 minutes to provision, adding wait time during the call.

| Question | Format | Response / Notes |
|---|---|---|
| `*` Does a TSG already exist, or will one be created? | select | Existing TSG / Create new TSG |
| `†` If existing: TSG ID | text | |
| `*` Preferred region for the AIRS deployment profile? | select | Americas / EU / Singapore |
| `*` Is Strata Logging Service (SLS) enabled on this tenant? | select | Yes / No / Unknown |
| Does the tenant have an existing AIOps subscription? | select | Yes / No / Unknown |

> **Consultant Notes:** TSG and region are set during deployment profile creation and cannot be changed after activation. SLS is mandatory. Existing AIOps can conflict with AIRS onboarding. New TSG adds 15–20 min provisioning.

---

### 7. Access & Identity `ESSENTIAL`

_Feeds: Guide Step 3.2 — Configure IAM_

> **Why this matters:** Activating the AIRS subscription does not automatically grant users access. RBAC roles must be assigned, and for API or CI/CD access, a service account with credentials must be created.
>
> **Potential blockers:** Standard SCM roles do not include AI Red Teaming access. A custom role must explicitly enable the "AI Red Teaming" permission — without it, users can log into SCM but cannot see the module. The Client Secret for a service account is shown only once at creation. If not recorded immediately, the account must be recreated. If the customer uses SSO, new user accounts may require an IT provisioning process that takes days — surface this in advance.

| Question | Format | Response / Notes |
|---|---|---|
| `*` Which RBAC roles are needed? | multi-select | Superuser / Custom role with "AI Red Teaming" enabled / Read-only for stakeholders |
| `*` Is a service account needed for API or CI/CD access? | select | Yes / No / TBD |
| Does the customer use SSO / IdP for SCM access? | select | Okta / Entra ID / Ping Identity / Google Workspace / No SSO / Other: ___ |
| How many users need SCM access for this engagement? | number | |

> **Consultant Notes:** Custom roles must explicitly enable "AI Red Teaming" app access. Service accounts are required for API scans — record the Client Secret immediately (not retrievable later). IdP integration adds COM-020 sessions.

---

### 8. Network & Connectivity `ESSENTIAL`

_Feeds: Guide Phase 5 — Network Channels (skip or deploy)_

> **Why this matters:** This is the single most impactful question in the entire TRD. Whether the AI target is publicly accessible or behind a private network determines whether Phase 5 is skipped entirely or adds 1–2 hours and a separate infrastructure deployment. Discovering this late — or getting the answer wrong — is the most common cause of incomplete deployment calls.

#### Public vs. Private Endpoints

**Public endpoint** — the target API is accessible from the internet. AIRS can reach it directly. No additional network infrastructure is needed. After creating the target, scanning can begin immediately.

- Common examples: OpenAI API, Azure OpenAI with a public endpoint, Bedrock with public API access, any application deployed on a public cloud URL without IP restrictions.
- Set endpoint type to `PUBLIC` in the target configuration.
- WAF note: if an API gateway or WAF sits in front of the endpoint, it may block AIRS scan payloads. Decide before the call whether to test through the WAF (realistic) or around it (isolates AI behavior).
- IP allowlisting: if the endpoint restricts by source IP, add AIRS egress IPs to the allowlist before scanning begins.

**Private endpoint** — the target API is not accessible from the internet. It sits behind a firewall, VPN, private VPC, or is restricted to internal IP ranges.

- To scan a private endpoint, AIRS deploys a **Network Channel** — a lightweight Kubernetes-based client that runs inside the customer's infrastructure and creates an outbound tunnel to the AIRS cloud service. No inbound firewall rules are required; all connectivity is outbound from the K8s cluster.
- Set endpoint type to `PRIVATE` or `NETWORK_BROKER` in the target configuration. (`NETWORK_BROKER` is the API-only value; the SCM UI shows "Private.")
- Network Channel prerequisites that must be in place before the deployment call:
  - A Kubernetes cluster with network access to the private AI endpoint. Managed cloud (EKS/AKS/GKE), self-managed, or a lightweight distribution (Minikube, k3s, Kind) on any VM or on-prem server are all valid.
  - Helm 3.x installed in the deployment environment
  - Outbound internet access from the K8s cluster to three FQDNs:
    - `api.sase.paloaltonetworks.com`
    - `auth.apps.paloaltonetworks.com`
    - `registry.ai-red-teaming.paloaltonetworks.com`
  - An SCM service account token for the Network Channel deployment script

| | Public | Private |
|---|---|---|
| Network Channel needed? | No | Yes |
| Additional deployment time | None | +1–2 hours |
| K8s required? | No | Yes |
| Endpoint type value | `PUBLIC` | `PRIVATE` / `NETWORK_BROKER` |
| Primary blocker | WAF blocking payloads | K8s unavailable or FQDNs blocked |

| Question | Format | Response / Notes |
|---|---|---|
| `*` Are the target endpoints publicly accessible from the internet? | select | All public / All private / Mix of public and private |
| `†` If private: is Kubernetes available for the Network Channel client? | select | Yes — managed (EKS/AKS/GKE) / Yes — self-managed / Yes — lightweight K8s on VM (Minikube/k3s/Kind) / No |
| `†` If K8s: does the cluster have outbound internet access? | select | Yes / No — air-gapped / Restricted (proxy/allowlist) |
| `†` If restricted: are the 3 AIRS FQDNs allowlisted? | select | Yes / No / Unknown |
| `†` If K8s: is Helm 3.x installed? | select | Yes / No |
| Is there a WAF or API gateway in the request path? | select | Yes / No / Unknown |
| `†` If WAF: desired testing strategy? | select | Whitelist AIRS IPs / Bypass WAF / Test full stack including WAF |

> **Potential blockers for private endpoints:** Kubernetes is required for the Network Channel, but a managed cloud cluster is not — Minikube, k3s, or Kind on any VM or on-prem server qualifies. The host just needs access to the private AI endpoint and outbound internet to the three AIRS FQDNs. Only reschedule if no form of K8s can be made available. Second most common: outbound internet blocked from K8s to the three AIRS FQDNs. These must be allowlisted in advance; they cannot be opened during the deployment call. Third: Helm not installed — budget time to install it if missing.
>
> **Consultant Notes:** Single most impactful scoping question. Public = skip Phase 5 entirely. Private = deploy Network Channel (adds 1–2 hours + K8s prereqs). WAFs block attack payloads by design — clarify whether they're testing through it (realistic, surfaces WAF bypass issues) or around it (isolates AI vulnerabilities). For mixed environments, deploy the Network Channel first, then configure all targets.

---

### 9. Engagement Sizing `SCOPING`

_Calculated from §2 (targets), §5 (credits), §8 (network). Completed by consultant._

| Package | Targets | Scan Types | Est. Sessions |
|---|---|---|---|
| **Starter** — 1 target, pre-built | 1 | Attack Library + Dynamic Agent | 5 |
| **Standard** — Up to 3 targets | 1–3 | Attack Library + Dynamic + Custom | 10 |
| **Advanced** — Up to 5, + Network Channel | 1–5 | All + Network Channel | 25 |
| **Enterprise** — 5+, custom | 5+ | All + Network Channel + CI/CD | Custom |

**Add-Ons:**

| Add-On | Description | Include? |
|---|---|---|
| Network Channel deployment | Required for private endpoints. K8s prereqs, 1–2 hours. | Yes / No |
| REST wrapper development | Required for non-REST protocols. Custom development. | Yes / No |
| CI/CD pipeline integration | Scan triggers in CI/CD. Requires service account. | Yes / No |
| Custom attack development | Custom prompt sets beyond built-in library. | Yes / No |

---

## Part C: Per-Target Configuration

_Repeated for each target or target group. Captures the technical spec needed to configure the product._

---

### Target Index

| # | Name | Type | Priority | Connection | Status |
|---|---|---|---|---|---|
| 1 | _______________ | | | | Not started / In progress / Complete |
| 2 | _______________ | | | | Not started / In progress / Complete |
| 3 | _______________ | | | | Not started / In progress / Complete |

---

> **Target 1 Configuration** — Sections 10–18 below apply to Target 1. Duplicate for each additional target.

---

### 10. Target Architecture `ESSENTIAL`

_Feeds: Guide Step 4.2 — Add a Target + Step 4.3 — Configure Target Details_

| Question | Format | Response / Notes |
|---|---|---|
| `*` Application name | text | |
| `*` Target type | select | MODEL / APPLICATION / AGENT |
| `*` Inference provider | select | OPENAI / AZURE_OPENAI / BEDROCK / VERTEX / HUGGINGFACE / REST |
| `*` Base model | text | e.g., GPT-4o, Claude 3.5, Gemini 2.0, Llama 3.1 |
| Core architecture | select | Single LLM / RAG / Tool Calling / Multi-Agent / Other |
| `*` Industry (Application/Agent) | text | e.g., Financial services, Healthcare |
| `*` Use case description | text | e.g., Customer support chatbot for insurance claims |
| Competitor names (for brand attacks) | text | |
| System prompt (white-box testing) | text | Paste or attach full system prompt |
| `†` Tools accessible (Agent only) | json | Tool name, description, parameter schema |

> **Consultant Notes:** Every field populates the target configuration API call. System prompt is the single highest-impact optional field — enables white-box testing. Agent tool schemas enable tool-misuse attacks.

---

### 11. Risk Priority Matrix `IMPORTANT`

_Feeds: Guide Step 6.2 — Configure Scan Categories. N/A excludes the category._

**Security:**

| Subcategory | Priority | Notes |
|---|---|---|
| Adversarial Suffix | 1 / 2 / 3 / N/A | |
| Evasion | 1 / 2 / 3 / N/A | |
| Indirect Prompt Injection | 1 / 2 / 3 / N/A | |
| Jailbreak | 1 / 2 / 3 / N/A | |
| Multi-Turn | 1 / 2 / 3 / N/A | |
| Prompt Injection | 1 / 2 / 3 / N/A | |
| Remote Code Execution | 1 / 2 / 3 / N/A | |
| System Prompt Leak | 1 / 2 / 3 / N/A | |
| Tool Leak | 1 / 2 / 3 / N/A | |

**Safety:**

| Subcategory | Priority | Notes |
|---|---|---|
| Bias | 1 / 2 / 3 / N/A | |
| CBRN | 1 / 2 / 3 / N/A | |
| Cybercrime | 1 / 2 / 3 / N/A | |
| Drugs | 1 / 2 / 3 / N/A | |
| Non-Violent Crimes | 1 / 2 / 3 / N/A | |
| Political | 1 / 2 / 3 / N/A | |
| Self-Harm | 1 / 2 / 3 / N/A | |
| Sexual | 1 / 2 / 3 / N/A | |
| Violent Crimes & Weapons | 1 / 2 / 3 / N/A | |

**Compliance:**

| Framework | Priority | Notes |
|---|---|---|
| OWASP LLM Top 10 | 1 / 2 / 3 / N/A | |
| MITRE ATLAS | 1 / 2 / 3 / N/A | |
| NIST AI RMF | 1 / 2 / 3 / N/A | |
| DASF V2.0 | 1 / 2 / 3 / N/A | |

**Brand:**

| Subcategory | Priority | Notes |
|---|---|---|
| Off-Brand Responses | 1 / 2 / 3 / N/A | |
| Competitor Endorsement | 1 / 2 / 3 / N/A | |
| Product Misinformation | 1 / 2 / 3 / N/A | |
| Tone Inconsistency | 1 / 2 / 3 / N/A | |

> **Consultant Notes:** Default: all Security → High, all Safety → Medium. Compliance per §3. Brand → High for customer-facing, N/A for internal tools. Don't set everything to High — makes reports less actionable.

---

### 12. Connection & Auth `ESSENTIAL`

_Feeds: Guide Step 4.2 — Add a Target_

> **Why this matters:** Every field in this section is required to create the target in AIRS. A single wrong value — wrong URL, expired credential, mismatched auth format — causes target validation to fail and blocks scanning from starting.
>
> **Potential blockers:** Token expiry is the most insidious problem. An Attack Library scan runs approximately 5 hours. If the auth token expires mid-scan, all remaining scan tasks fail with authentication errors. Static API keys are strongly preferred for test environments. For OAuth2, verify the token lifetime exceeds 6 hours or that auto-refresh is configured. Azure OpenAI requires the deployment name in the URL (`/openai/deployments/{deployment-name}/chat/completions`) — the base resource URL without the deployment name fails validation. Non-REST protocols (WebSocket, gRPC, Socket.IO, GraphQL) require a REST wrapper to be developed and deployed before scanning can begin.

| Question | Format | Response / Notes |
|---|---|---|
| `*` Connection type | select | OPENAI / AZURE_OPENAI / BEDROCK / VERTEX / HUGGINGFACE / REST |
| `*` Endpoint URL | url | https:// |
| `*` Endpoint accessibility | select | PUBLIC / PRIVATE / NETWORK_BROKER (API-only) |
| `*` Authentication method | select | HEADERS (API key) / BASIC_AUTH / OAUTH2 |
| `*` Auth credentials | text | Provide securely |
| Token/credential expiry period? | text | e.g., 1 hour, 24 hours, no expiry |
| API protocol | select | REST (default) / WebSocket / gRPC / Socket.IO / GraphQL |

> **Consultant Notes:** Token expiry >1hr critical — Attack Library scans run ~5 hours. Static API keys preferred for test envs. NETWORK_BROKER is API-only (not in SCM UI). Non-REST protocols trigger §16 (REST Wrapper).

---

### 13. Rate Limits & Capacity `ESSENTIAL`

_Feeds: Guide Step 4.3 + scan execution. #1 cause of scan failures._

> **Why this matters:** Rate limits control how fast AIRS can send attack prompts. If the limits are too low, the target starts returning rate-limit errors and the scan fails or produces incomplete results. This is the single most common cause of scan failures across all deployments.
>
> **Potential blockers:** Attack Library scans require 10–20 RPM sustained over approximately 5 hours. An API key on OpenAI's free tier (Tier 0) is limited to 3 RPM — this will fail. Customers should provision a dedicated test API key with elevated limits and confirm the limits before the scan starts. A shared API key used by the production application competes with live traffic for the same rate limit budget and will cause intermittent failures during scans. Tokens per minute below 10,000 will cause frequent throttling with verbose attack payloads.

| Question | Format | Response / Notes |
|---|---|---|
| `*` Requests per minute (RPM) | number | Minimum 20 recommended for Attack Library |
| `*` Tokens per minute (TPM) | number | Minimum 20,000 recommended |
| Tokens per day (TPD) | number | |
| Maximum concurrent requests? | number | |
| Maximum input tokens per request? | number | |
| Maximum output tokens per request? | number | |

> **Consultant Notes:** Attack Library needs 10–20 RPM sustained for ~5 hours. Common: OpenAI Tier 1 = 500 RPM (fine), Tier 0 = 3 RPM (will fail). Recommend a dedicated API key with elevated limits for the test environment.

---

### 14. Guardrail Detection `ESSENTIAL`

_Feeds: Guide Step 4.3. Without this, reports can't distinguish "blocked by guardrail" from "model refused."_

> **Why this matters:** Most AI applications have safety guardrails that block harmful inputs. AIRS needs to know what a blocked response looks like so it can correctly score attack effectiveness. Without this configuration, the scan cannot distinguish between "the guardrail blocked this" and "the model responded but declined" — producing inaccurate results.
>
> **Potential blockers:** Azure OpenAI and OpenAI return different HTTP status codes for guardrail blocks: OpenAI returns HTTP 400, Azure OpenAI returns HTTP 200 with `"finish_reason": "content_filter"` in the body. If AIRS is configured for the wrong status code, every blocked response is misclassified. If the customer does not know what a blocked response looks like, the fastest resolution is to send a known-harmful prompt (e.g., a request for instructions to cause harm) before the call and capture the exact HTTP status code and response body. This takes 2 minutes and resolves the uncertainty.

| Question | Format | Response / Notes |
|---|---|---|
| `*` Does the target have guardrails? | select | Yes / No / Unknown |
| `†` HTTP status code when guardrail blocks? | text | e.g., 400, 403, 200 (with error in body) |
| `†` Sample error response JSON | json | See example below |
| Guardrail technology? | text | e.g., Azure Content Safety, OpenAI moderation, custom |

Example guardrail error response:
```json
{
  "error": {
    "message": "Content policy violation",
    "type": "content_filter",
    "code": "content_policy_violation"
  }
}
```

> **Consultant Notes:** OpenAI returns 400 with `content_policy_violation`. Azure OpenAI returns 200 with `content_filter` in finish_reason. If they don't know: send a known-blocked prompt and capture the response.

---

### 15. Environment `IMPORTANT`

| Question | Format | Response / Notes |
|---|---|---|
| `*` Which environment will be tested? | select | Production / Staging / Development / Dedicated test |
| Same model and config as production? | select | Yes — identical / Mostly — same model, different guardrails / No |
| Is scanning production directly acceptable? | select | Yes / No / Only during maintenance windows |
| Maintenance window (if applicable)? | text | e.g., Saturdays 2am–6am UTC |

> **Consultant Notes:** Non-production environments with different guardrails or models may not reflect production risk. Document the delta for stakeholders. Agent targets with tool access can trigger side effects in production — clarify risk tolerance.

---

### 16. REST Wrapper `ESSENTIAL` `†`

_Conditional: complete only if §12 API Protocol ∈ {WebSocket, gRPC, Socket.IO, GraphQL}_

| Question | Format | Response / Notes |
|---|---|---|
| `*` Native protocol | select | WebSocket / gRPC / Socket.IO / GraphQL / Other |
| `*` Preferred wrapper language | select | Python / Node.js / Go / Java / Customer provides |
| Streaming responses? | select | Yes — SSE / Yes — chunked / No |
| `†` If streaming: chunk aggregation? | select | Concatenate all / Use last chunk / Custom |
| Wrapper hosting? | select | Same K8s as Network Channel / Separate VM / Serverless / Customer hosts |

> **Consultant Notes:** Budget 2–4 hours for straightforward WebSocket/gRPC wrappers. GraphQL is typically simpler (mutation call). Validate `{{prompt}}` placeholder substitution in the wrapper.

---

### 17. Scan Strategy `ESSENTIAL`

_Feeds: Guide Steps 6.3–6.5 — Start Scans_

| Question | Format | Response / Notes |
|---|---|---|
| `*` Scan types to execute? | multi-select | Attack Library (STATIC) / Dynamic Agent (DYNAMIC) / Custom Prompt (CUSTOM) |
| Recommended scan order? | select | Attack Library first → Dynamic → Custom / Dynamic first → Attack Library / Custom only |

**Dynamic Agent Configuration:**

| Question | Format | Response / Notes |
|---|---|---|
| Agent breadth (1–20, default 6) | number | More agents = more diverse approaches |
| Agent depth (1–20, default 10) | number | More depth = longer multi-turn attacks |
| Attack goals (Human Augmented) | text | e.g., "Extract the system prompt", "Make the bot recommend a competitor" |

**Custom Prompt Configuration:**

| Question | Format | Response / Notes |
|---|---|---|
| Custom prompt source | select | Customer-provided / Consultant-developed / Industry template |
| Number of custom prompts? | number | |

> **Consultant Notes:** Start with Attack Library (baseline, ~5 hours). Then Dynamic Agent (adaptive, multi-turn). Custom last (targeted). Default breadth=6, depth=10 is good for most. Human Augmented mode needs specific goals — generic goals produce poor results.

---

### 18. Target Specification `ESSENTIAL`

_Feeds: Guide Step 4.2 — API payload (`POST /v1/target`). This section IS the API request body._

> **Why this matters:** This section is the direct input to the AIRS API call that creates the target. Every value here maps to a specific field in the request body. Errors here — wrong URL, malformed JSON, wrong body path — are the most common cause of target creation failures and scan results that appear to run but produce no meaningful output.
>
> **Potential blockers:** The `{{prompt}}` placeholder in the request template is the most critical single field in the TRD. If it is missing, mistyped, or placed in the wrong location in the JSON, scans run to completion but every attack string is sent as a literal `{{prompt}}` string — the target receives nonsense, produces benign responses, and every attack appears to fail (or succeed, depending on how the target responds to unexpected input). Validate the template with a test request before starting any scan. The response body path must also be validated — if the path does not match the actual API response structure, AIRS cannot extract model text and all results are empty.

**Target Specification:**

| Field | Value |
|---|---|
| `*` Name | _______________ |
| `*` Target Type | MODEL / APPLICATION / AGENT |
| `*` Connection Type | OPENAI / AZURE_OPENAI / BEDROCK / VERTEX / HUGGINGFACE / REST |
| `*` Endpoint URL | https:// |
| `*` Endpoint Type | PUBLIC / PRIVATE / NETWORK_BROKER |
| `*` Auth Type | HEADERS / BASIC_AUTH / OAUTH2 |
| `*` Auth Config | [provide securely] |

**Request Template:**

```json
{
  "model": "[model-name]",
  "messages": [
    {
      "role": "user",
      "content": "{{prompt}}"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

> **Warning:** The request template is the most critical field in the entire TRD. A bad `{{prompt}}` placeholder means scans run but produce no meaningful results. Always validate with a test request before starting scans.

**Response Extraction:**

| Field | Value |
|---|---|
| `*` Body Path | e.g., `choices[0].message.content` |
| HTTP Method | POST (default) / GET |
| Content-Type | application/json (default) / Other |

**Target Background (Application & Agent):**

| Field | Value |
|---|---|
| `*` Industry | [from §10] |
| `*` Use Case | [from §10] |
| Competitors | [from §10] |

**Additional Context:**

| Field | Value |
|---|---|
| Base Model | [from §10] |
| System Prompt | [from §10] |
| Tools Accessible | [Agent only — from §10] |
| Core Architecture | Single LLM / RAG / Tool Calling / Multi-Agent |

> **Consultant Notes:** Validation checklist before scanning: (1) Test request with benign prompt, (2) verify response body path extracts actual model text, (3) test guardrail detection pattern, (4) confirm rate limits not hit. Azure OpenAI: endpoint must include deployment name.

---

## Day-2 Appendix

_Optional. Address after the first scan cycle is complete._

---

### D1. Logging & SIEM Integration `DAY-2`

| Question | Format | Response / Notes |
|---|---|---|
| SIEM platform? | select | Cortex XSIAM / Splunk / Sentinel / QRadar / Elastic / Other |
| Forward AIRS scan events to SIEM? | select | Yes / No / TBD |
| Log forwarding method? | select | Syslog / API webhook / SLS → SIEM connector / Manual export |
| Alert thresholds? | text | e.g., Any Critical finding, Risk score > 7 |
| Log retention requirements? | text | e.g., 90 days, 1 year |

---

### D2. Ongoing Program Design `DAY-2`

| Question | Format | Response / Notes |
|---|---|---|
| Desired scan cadence? | select | Weekly / Monthly / Quarterly / On-demand only / Before each release |
| CI/CD integration? | select | Yes — gating / Yes — advisory / No |
| CI/CD platform? | select | GitHub Actions / GitLab CI / Jenkins / Azure DevOps / Other |
| Re-scan trigger threshold? | number | e.g., re-scan if risk > 5 |
| Go/no-go risk thresholds? | text | e.g., No Critical findings, overall risk ≤ 3 |

---

### D3. Reporting & Distribution `DAY-2`

| Question | Format | Response / Notes |
|---|---|---|
| Report recipients? | table | Name, email, report type |
| Executive summary required? | select | Yes / No |
| Report format? | select | PDF / HTML / JSON / All formats |
| Reports as audit evidence? | select | Yes — regulatory / Yes — internal / No |
