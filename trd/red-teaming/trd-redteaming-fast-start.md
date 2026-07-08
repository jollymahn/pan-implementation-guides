# AI Red Teaming — Deployment Readiness Checklist

**Minimum required information to deploy and configure AIRS AI Red Teaming**

> **How to use this document**
>
> This is the fast-start version of the full AI Red Teaming TRD. It contains only the fields that directly block deployment if missing or wrong. Every item marked `*` must be answered before a deployment call. Items marked `†` are conditional — required only when a prior answer triggers them.
>
> For engagements with custom attack development, SIEM integration, or CI/CD pipeline requirements, use the full [AI Red Teaming TRD](trd-red-teaming.md) alongside this document.
>
> **Full deployment guide:** [AI Red Teaming Deployment Guide](../../guides/airs-red/airs-red-teaming.html)

---

## Prerequisites — Complete Before the Deployment Call

Every item in this section must be resolved before scheduling the deployment call. Missing any of them will stall the session and may require rescheduling. Work through this list with the customer during pre-engagement discovery.

---

### Licensing and Credits

AI Red Teaming is licensed through Software NGFW Credits — not as a standalone SKU. Credits must be allocated in the Customer Support Portal (CSP) before a deployment profile can be created.

**The blocker most teams miss:** The person who allocates credits in the CSP must hold the **credit allocation role** — this is a CSP-level role, separate from SCM admin access. A standard SCM admin cannot see or allocate credits. Identify this person by name before scheduling the call and confirm they will be available.

| Confirm | Item |
|---|---|
| ☐ | Active Palo Alto Networks Customer Support Portal account |
| ☐ | AIRS credits available in the pool (Software/Cloud NGFW Credits) |
| ☐ | CSP admin with credit allocation role identified and available for the call |
| ☐ | Credit amount to allocate for AI Red Teaming confirmed |

---

### Strata Logging Service (SLS)

SLS is a mandatory dependency for AIRS AI Red Teaming. It must be **enabled on the tenant before AIRS activation begins**. If SLS is not active, the activation flow fails partway through and cannot be completed. It cannot be added retroactively.

**Do not schedule the deployment call until SLS is confirmed active.**

| Confirm | Item |
|---|---|
| ☐ | SLS enabled on the target tenant (verify in Common Services) |

> If SLS is not enabled, the customer must activate it first — this may require a separate CSP step and additional provisioning time. Treat it as a prerequisite gate.

---

### Tenant Service Group (TSG) and Region

AIRS is provisioned inside a Tenant Service Group (TSG). The TSG, region, and deployment profile are all set at activation time and **cannot be changed afterward**. Choosing the wrong region requires full re-activation.

**Blockers:**
- Region is permanent. Confirm Americas, EU-Netherlands, or Singapore before the call.
- An existing AIOps for NGFW subscription on the same tenant can conflict with AIRS onboarding. Identify this in advance.
- A new TSG takes 15–20 minutes to provision. For a new TSG, account for this in the call timeline.

| Confirm | Item |
|---|---|
| ☐ | TSG identified (existing TSG ID, or decision to create new) |
| ☐ | Region confirmed: Americas / EU-Netherlands / Singapore |
| ☐ | AIOps subscription status confirmed on this tenant |

---

### Deployment Profile

A deployment profile created in the CSP binds NGFW credits to the AI Red Teaming service and provisions it on the selected TSG. Activation takes up to 2 hours on the backend after the profile is created. Build this into the call schedule — start activation early, then work on IAM and network prereqs while it completes.

| Confirm | Item |
|---|---|
| ☐ | Deployment profile not yet created (to be done during the call), OR existing profile confirmed |

---

### IAM and Permissions

| Confirm | Item |
|---|---|
| ☐ | SCM accounts created for all engagement participants |
| ☐ | Correct role assigned: Superuser OR custom role with **AI Red Teaming** explicitly enabled |
| ☐ | If service account needed: created and Client Secret stored securely |
| ☐ | If SSO in use: new user provisioning completed (can take days via IT — start early) |

**Key gotchas:**
- A standard SCM role does not grant AI Red Teaming access even when the subscription is active. The custom role must have the permission explicitly enabled.
- The Client Secret for a service account is displayed **only once** at creation. If it is not recorded immediately, the account must be recreated.

---

### Network Readiness

**If all targets are on public endpoints:**
| Confirm | Item |
|---|---|
| ☐ | Endpoint URL reachable from the internet (test with curl before the call) |
| ☐ | WAF/API gateway allowlisting completed, or test strategy agreed (if WAF in path) |

**If any target is on a private network:**

A Network Channel must be deployed. This is a Helm-deployed client in the customer's Kubernetes cluster that tunnels scan traffic to the private endpoint. All connectivity is outbound — no inbound firewall rules are needed.

**If K8s is not available, private targets cannot be scanned. This cannot be resolved during the call.**

| Confirm | Item |
|---|---|
| ☐ | Kubernetes available: managed (EKS/AKS/GKE), self-managed, or lightweight (Minikube/k3s/Kind on a VM or on-prem server) |
| ☐ | Cluster has network access to the private AI endpoint |
| ☐ | Helm 3.x installed |
| ☐ | kubectl configured for the cluster |
| ☐ | Outbound access to `api.sase.paloaltonetworks.com` |
| ☐ | Outbound access to `auth.apps.paloaltonetworks.com` |
| ☐ | Outbound access to `registry.ai-red-teaming.paloaltonetworks.com` |
| ☐ | K8s operator or admin available on the call |

---

### Target Endpoint Readiness

Complete for each AI target before the call:

| Confirm | Item |
|---|---|
| ☐ | Target endpoint URL confirmed and reachable |
| ☐ | Auth credentials confirmed valid and not expiring within 6 hours |
| ☐ | Rate limits: minimum 20 RPM and 20,000 TPM confirmed (dedicated API key recommended) |
| ☐ | Test environment confirmed (not production, or risk accepted if production) |
| ☐ | Guardrail detection: HTTP status code and sample error response captured by sending a known-harmful test prompt |
| ☐ | Request template drafted (JSON with `{{prompt}}` in correct position) |
| ☐ | Response body path confirmed against a real API response |

---

## Section 1: Platform Prerequisites

**Why this matters:** Before any target can be created or scanned, the AIRS AI Red Teaming service must be activated in the customer's Palo Alto Networks tenant. This requires credits allocated from the Customer Support Portal (CSP), a configured tenant region, and Strata Logging Service enabled. Missing any of these items means the deployment call ends before Phase 1 is complete.

**What can block you:**
- The CSP admin role is distinct from a standard SCM admin. A user with only SCM access cannot allocate credits. If the person attending the deployment call does not have CSP credit allocation permissions, activation cannot proceed.
- Region is permanent. Once a deployment profile is activated, the region cannot be changed. Choosing the wrong region forces a full re-activation.
- Strata Logging Service (SLS) is mandatory. If SLS is not enabled before AIRS activation, the activation flow will fail. It cannot be added retroactively to an existing deployment profile.
- An existing AIOps for NGFW subscription on the same tenant can create licensing conflicts during AIRS onboarding. Surface this before the call.
- Deployment profile activation takes up to 2 hours. A new TSG adds 15–20 minutes on top of that. Schedule accordingly.

| Question | `*` Required | Response |
|---|---|---|
| `*` CSP admin email (must have credit allocation role) | Yes | |
| `*` Total AIRS credits in customer's pool | Yes | |
| `*` Credits allocated specifically for AI Red Teaming | Yes | |
| `*` Existing TSG or create new? | Yes | Existing / Create new |
| `†` If existing: TSG ID | If existing | |
| `*` Preferred region | Yes | Americas / EU / Singapore |
| `*` Is Strata Logging Service (SLS) enabled on this tenant? | Yes | Yes / No / Unknown |
| AIOps for NGFW subscription on this tenant? | No | Yes / No / Unknown |

> **If SLS is not enabled:** Stop here. The customer must enable SLS before the deployment call. This typically requires a separate activation step in the CSP and cannot be completed during the Red Teaming deployment session.

---

## Section 2: Access and Identity

**Why this matters:** AIRS AI Red Teaming requires specific RBAC roles in SCM. Standard SCM roles do not include AI Red Teaming access by default — it must be explicitly enabled on a custom role. Service accounts are required for any API-based or CI/CD integration, and the Client Secret generated during service account creation is only shown once.

**What can block you:**
- A user with a standard SCM role cannot access the AI Red Teaming module even if the subscription is active. The role must explicitly include the "AI Red Teaming" permission.
- The Client Secret for a service account is displayed only at creation time. If it is not recorded immediately, the service account must be recreated, which can disrupt pipeline configurations.
- If the customer uses SSO (Okta, Entra ID, Ping), adding new user accounts may require an IT ticket and approval process that takes days. Surface this early.

| Question | `*` Required | Response |
|---|---|---|
| `*` Who needs SCM access to AI Red Teaming? | Yes | Name / Email / Role |
| `*` Custom role with "AI Red Teaming" enabled or Superuser? | Yes | Custom role / Superuser |
| `*` Is a service account needed? (API access, CI/CD, automation) | Yes | Yes / No / TBD |
| SSO/IdP in use? | No | Okta / Entra ID / Ping / None / Other |

> **If service account is needed:** The Client Secret is shown only once at creation. Have a secure storage location ready (password manager, Secrets Manager, etc.) before the deployment call. Do not close the browser window without copying it.

---

## Section 3: Endpoint Connectivity

**Why this is the most important section:** Whether the AI target endpoint is publicly accessible or behind a private network is the single decision that determines how long Phase 2 of the deployment takes. A public endpoint can be scanned immediately after target creation. A private endpoint requires deploying the Network Channel — a Kubernetes-based component that adds 1–2 hours to the deployment and has its own prerequisites.

Getting this wrong or discovering it late is the most common cause of incomplete deployment calls.

---

### 3A: Public Endpoints (Internet-Accessible)

A public endpoint is an API that AIRS can reach directly over the internet. No additional network infrastructure is needed between AIRS and the target.

**Examples:** OpenAI API (`api.openai.com`), Azure OpenAI with a public endpoint, Bedrock with public API access, any application deployed on a public cloud with no network restrictions.

**What can block you:**
- If a WAF or API gateway sits in front of the endpoint, it may block AIRS scan traffic because the payloads look like attacks (because they are). You must either allowlist AIRS source IPs or decide to test through the WAF.
- IP allowlisting: if the endpoint restricts by source IP, add the AIRS egress IP ranges to the allowlist before scanning. Scan traffic includes an `x-airs-red-teaming-trace-id` header that WAF rules can key on.
- Azure OpenAI endpoints must include the deployment name in the URL (e.g., `/openai/deployments/my-deployment-name/chat/completions`). The base endpoint URL without the deployment name will fail validation.

| Question | `*` Required | Response |
|---|---|---|
| `*` Is the target endpoint accessible from the public internet? | Yes | Yes / No |
| Is a WAF or API gateway in the request path? | No | Yes / No / Unknown |
| `†` If WAF: testing strategy? | If WAF | Allowlist AIRS IPs / Test through WAF / Bypass WAF |
| `†` If allowlisting needed: AIRS egress IP ranges confirmed with PAN? | If allowlist | Yes / No |

> **If public with no WAF:** Proceed directly to Section 4. No Network Channel needed.

---

### 3B: Private Endpoints (Behind Firewall, VPN, or VPC)

A private endpoint is an API that is not accessible from the internet. This includes applications behind a corporate firewall, deployed in a private VPC with no public load balancer, accessible only via VPN, or restricted to internal IP ranges.

**To reach a private endpoint, AIRS deploys a Network Channel.** The Network Channel is a lightweight client deployed inside the customer's Kubernetes cluster. It initiates an outbound WebSocket connection to the AIRS cloud service — no inbound firewall rules are required. Once the channel is online, AIRS routes all scan traffic through it to reach the private target.

**What blocks most private endpoint deployments:**

- **No Kubernetes.** The Network Channel is deployed as a Helm chart and requires Kubernetes. However, it does not require a managed cloud cluster — a lightweight single-node K8s distribution (Minikube, k3s, or Kind) running on any VM or on-premises server is sufficient. If the customer has no existing K8s cluster, they can install Minikube or k3s on any machine that has network access to the private AI endpoint and outbound internet access to the three AIRS FQDNs. Budget 30–60 minutes for this setup if K8s is not already present.
- **Outbound internet blocked from K8s.** The K8s cluster must be able to reach three FQDNs outbound. If the cluster is in an air-gapped or restricted network, these domains must be allowlisted before deployment:
  - `api.sase.paloaltonetworks.com` (API communication)
  - `auth.apps.paloaltonetworks.com` (authentication)
  - `registry.ai-red-teaming.paloaltonetworks.com` (initial container image pull)
- **Helm not installed.** The Network Channel is deployed via Helm 3.x. If Helm is not available in the cluster's deployment environment, installation will stall.
- **Insufficient permissions.** The Kubernetes service account used to deploy the Network Channel must have `airt.network_channels_client` permissions in SCM.
- **Network Channel token not generated before the call.** The Network Channel deployment script requires a token generated in SCM. If the SCM account is not provisioned before the call, this step cannot be completed.

| Question | `*` Required | Response |
|---|---|---|
| `*` Is a Kubernetes cluster available? | Yes (if private) | Yes — managed (EKS/AKS/GKE) / Yes — self-managed / Yes — lightweight (Minikube/k3s on VM) / No |
| `*` Does the K8s cluster have outbound internet access? | Yes (if private) | Yes / No — air-gapped / Restricted (proxy/allowlist) |
| `†` If restricted: are the 3 AIRS FQDNs allowlisted? | If restricted | Yes / No / Unknown |
| `*` Is Helm 3.x installed in the deployment environment? | Yes (if private) | Yes / No |
| `*` Who will run the Helm deployment? | Yes (if private) | Name / Role |
| Does the K8s cluster have network access to the private AI endpoint? | No | Yes / No / Unknown |

> **If no managed K8s cluster is available:** A lightweight distribution (Minikube, k3s, or Kind) can be installed on any VM or on-premises server. The host only needs network access to the private AI endpoint and outbound internet access to the three AIRS FQDNs. If none of these options are viable, reschedule the call — the Network Channel cannot be deployed without some form of Kubernetes.

> **NETWORK_BROKER endpoint type:** When using the Network Channel, set the endpoint type to `NETWORK_BROKER` in the target configuration API call. This value is API-only and does not appear in the SCM UI — set it via the SCM web interface by selecting "Private" and the system maps it correctly.

---

### 3C: Mixed Environments

If some targets are public and others are private, the Network Channel must be deployed for the private targets. Public and private targets can coexist in the same SCM tenant and be scanned independently. Deploy the Network Channel first, then configure all targets.

| Question | `*` Required | Response |
|---|---|---|
| `*` Are all targets the same accessibility type? | Yes | All public / All private / Mix |
| `†` If mix: which targets are private? | If mix | List target names |

---

## Section 4: Per-Target Configuration

Complete this section once for each AI target. If there are multiple targets, copy the entire section.

**Target name:** _______________

---

### 4.1: Connection and Authentication

**Why this matters:** Every field in this section is required to create the target in AIRS. A single wrong value — wrong URL, expired credential, mismatched auth format — causes target validation to fail and prevents scanning from starting.

**What can block you:**
- **Token expiry shorter than scan duration.** An Attack Library scan runs for approximately 5 hours. If the auth token or API key expires before the scan completes, all remaining scan tasks fail with authentication errors. Static API keys are strongly preferred for test environments. If OAuth2 is required, verify that the token lifetime is at least 6 hours or that auto-refresh is configured.
- **Azure OpenAI URL format.** The endpoint URL must include the deployment name: `https://{resource-name}.openai.azure.com/openai/deployments/{deployment-name}/chat/completions`. The base resource URL without the deployment name fails validation.
- **Credentials provided in wrong format.** AIRS expects auth credentials as a JSON object. API keys go into `{"Authorization": "Bearer sk-..."}` under HEADERS auth, not as a plain string.
- **OAuth2 scope mismatch.** If the target uses OAuth2 with Entra ID, use Application permissions, not Delegated permissions. Delegated permissions expire when the user session ends.

| Question | `*` Required | Response |
|---|---|---|
| `*` Connection type | Yes | OPENAI / AZURE_OPENAI / BEDROCK / VERTEX / HUGGINGFACE / REST |
| `*` Endpoint URL | Yes | https:// |
| `*` Endpoint accessibility | Yes | PUBLIC / PRIVATE (requires Network Channel — see Section 3) |
| `*` Authentication method | Yes | HEADERS (API key) / BASIC_AUTH / OAUTH2 |
| `*` Auth credentials | Yes | Provide securely |
| `*` Token / credential expiry? | Yes | e.g., No expiry / 1 hour / 24 hours |
| API protocol | No | REST (default) / WebSocket / gRPC / Socket.IO / GraphQL |

> **If protocol is not REST (WebSocket, gRPC, Socket.IO, GraphQL):** A REST wrapper must be developed before scanning can begin. Budget an additional 2–4 hours for wrapper development and validation. Confirm who builds and hosts the wrapper before the deployment call.

---

### 4.2: Rate Limits

**Why this matters:** Rate limits control how fast AIRS can send attack prompts to the target. If the limits are too low, AIRS will exceed them, the target will start returning rate-limit errors, and the scan will fail or produce incomplete results. Rate limits are the number one cause of scan failures.

**What can block you:**
- **Requests per minute too low.** Attack Library scans need 10–20 RPM sustained over ~5 hours. An API key on OpenAI's free tier (Tier 0) is limited to 3 RPM — this will fail. Request a rate limit increase or provision a dedicated higher-tier API key for testing before the call.
- **Tokens per minute too low.** Attack payloads can be verbose. A TPM limit under 10,000 will cause frequent throttling during the scan.
- **Shared API key with production traffic.** If the test API key is also used by the live application, AIRS scan traffic competes with real user traffic for the same rate limit budget. Use a dedicated API key for testing.

| Question | `*` Required | Response |
|---|---|---|
| `*` Requests per minute (RPM) | Yes | |
| `*` Tokens per minute (TPM) | Yes | |
| Tokens per day (TPD) | No | |
| Maximum concurrent requests | No | |

> **Minimum recommended for Attack Library scans:** 20 RPM and 20,000 TPM. Below 10 RPM, scans will frequently error and results will be incomplete.

---

### 4.3: Guardrail Detection

**Why this matters:** Most AI applications have safety guardrails that block harmful inputs. AIRS needs to know what a blocked response looks like so it can distinguish between "the guardrail blocked this attack" and "the model responded but refused." Without this, the scan report cannot accurately score attack effectiveness.

**What can block you:**
- **Unknown guardrail behavior.** If the customer doesn't know what a blocked response looks like, send a known-harmful prompt (e.g., ask for instructions to make a bomb) before the call and capture the exact HTTP status code and response body. This 2-minute test resolves the uncertainty.
- **Status code 200 with error in body.** Azure OpenAI returns HTTP 200 for guardrail blocks, with the block indicated in the `finish_reason` field (`"content_filter"`). If AIRS is configured to look for HTTP 400 instead, it will misclassify every blocked response as a successful attack.
- **Custom guardrail with non-standard response format.** Enterprise applications sometimes route through custom guardrail layers that return application-specific error formats. Capture a real blocked response and provide the JSON structure.

| Question | `*` Required | Response |
|---|---|---|
| `*` Does the target have guardrails? | Yes | Yes / No / Unknown |
| `†` HTTP status code when guardrail blocks | If Yes | e.g., 400, 403, 200 |
| `†` Sample error response JSON | If Yes | Paste below |

**Sample guardrail error response** (paste actual response from the target):
```json
{

}
```

> **Provider-specific defaults:**
> - OpenAI: HTTP `400`, body contains `"content_policy_violation"`
> - Azure OpenAI: HTTP `200`, body contains `"finish_reason": "content_filter"`
> - Custom guardrails: test manually and capture the response

---

### 4.4: Request and Response Templates

**Why this matters:** The request template is how AIRS formats the prompt it sends to the target. The `{{prompt}}` placeholder is where AIRS substitutes each attack string. If this placeholder is missing or malformed, scans run to completion but produce no meaningful results — every attack appears to succeed because the target received a literal `{{prompt}}` string instead of an actual attack payload.

The response body path tells AIRS where to find the model's text output in the API response. If this path is wrong, AIRS cannot extract the response and all results are empty.

**What can block you:**
- **Missing `{{prompt}}` placeholder.** The most common mistake. Test the template by sending a request with a benign string substituted for `{{prompt}}` and verify the target responds normally. If the target returns an error, the template is malformed.
- **Wrong response body path.** API responses are nested JSON. `choices[0].message.content` is correct for OpenAI-compatible APIs. Bedrock, Vertex, and custom APIs use different paths. Validate the path against a real API response before scanning.
- **System prompt omitted from request template.** If the target requires a system prompt to function correctly, it must be included in the request template. Omitting it may cause the target to respond differently than it would in production, making scan results unrepresentative.

**Request Template** (paste the exact JSON your API expects, with `{{prompt}}` where the attack string goes):

```json
{
  "model": "[model-name]",
  "messages": [
    {
      "role": "system",
      "content": "[system prompt if applicable]"
    },
    {
      "role": "user",
      "content": "{{prompt}}"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

**Response Extraction:**

| Field | `*` Required | Response |
|---|---|---|
| `*` Response body path | Yes | e.g., `choices[0].message.content` |
| HTTP method | No | POST (default) |
| Content-Type | No | application/json (default) |

> **Validation step (do this before the deployment call):** Send a test request with a benign prompt and confirm the response body path extracts readable model text. If it returns `null` or an empty string, the path is wrong.

---

## Section 5: Deployment Readiness Checklist

Use this checklist at the start of the deployment call. Any unchecked item is a potential session-stopper.

### Platform

- [ ] CSP admin with credit allocation permissions is available on the call
- [ ] AIRS credits are allocated and confirmed in the CSP
- [ ] TSG and region are confirmed (or new TSG creation is planned)
- [ ] Strata Logging Service is enabled on the target tenant
- [ ] No conflicting AIOps subscription on the tenant (or conflict resolved)

### Access

- [ ] SCM user accounts created with correct RBAC roles (custom role with AI Red Teaming enabled or Superuser)
- [ ] Service account created and Client Secret recorded (if needed)
- [ ] SSO/IdP provisioning complete (if applicable)

### Connectivity

**If public endpoints:**
- [ ] Endpoint URL is accessible from the internet (test with curl)
- [ ] WAF/API gateway allowlisting completed (if applicable)

**If private endpoints:**
- [ ] Kubernetes available: managed cluster (EKS/AKS/GKE), self-managed cluster, or lightweight K8s (Minikube/k3s/Kind) on a VM or on-prem server — with network access to the private AI endpoint
- [ ] Helm 3.x is installed
- [ ] All three AIRS FQDNs are reachable outbound from the K8s cluster:
  - [ ] `api.sase.paloaltonetworks.com`
  - [ ] `auth.apps.paloaltonetworks.com`
  - [ ] `registry.ai-red-teaming.paloaltonetworks.com`
- [ ] K8s operator/admin is available on the call for the Helm deployment

### Per Target

- [ ] Endpoint URL verified and reachable
- [ ] Auth credentials confirmed valid (not expired, sufficient permissions)
- [ ] Token expiry confirmed greater than 6 hours (or static key confirmed)
- [ ] RPM confirmed at 20 or above
- [ ] Guardrail detection confirmed (HTTP status code + sample error response captured)
- [ ] Request template drafted with `{{prompt}}` placeholder
- [ ] Response body path validated against a live API response
- [ ] Test request sent with benign prompt and response verified

---

## Quick Reference: Public vs. Private Endpoint Summary

| | Public | Private |
|---|---|---|
| Definition | Accessible from the internet | Behind firewall, VPN, or private VPC |
| Network Channel needed? | No | Yes |
| Additional time | None | +1–2 hours for Helm deployment |
| K8s required? | No | Yes |
| Endpoint type value | `PUBLIC` | `PRIVATE` / `NETWORK_BROKER` |
| WAF consideration | Possible | Separate from Network Channel concern |
| Most common blocker | WAF blocking payloads | K8s cluster unavailable or FQDNs blocked |
