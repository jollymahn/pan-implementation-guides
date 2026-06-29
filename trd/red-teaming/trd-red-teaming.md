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

| Question | Format | Response / Notes |
|---|---|---|
| `*` Are the target endpoints publicly accessible from the internet? | select | All public / All private / Mix of public and private |
| `†` If private: is a Kubernetes cluster available for the Network Channel client? | select | Yes — managed K8s (EKS/AKS/GKE) / Yes — self-managed / No K8s available |
| `†` If K8s: does the cluster have outbound internet access? | select | Yes / No — air-gapped / Restricted (proxy/allowlist) |
| Is there a WAF or API gateway in the request path? | select | Yes / No / Unknown |
| `†` If WAF: desired testing strategy? | select | Whitelist AIRS IPs / Bypass WAF / Test full stack including WAF |

> **Consultant Notes:** Single most impactful scoping question. Public = skip Phase 5. Private = deploy Network Channel (adds 1–2 hours + K8s prereqs). WAFs block attack payloads by design — clarify whether they're testing through it (realistic) or around it (isolates AI vulnerabilities).

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

| Question | Format | Response / Notes |
|---|---|---|
| `*` Requests per minute (RPM) | number | |
| `*` Tokens per minute (TPM) | number | |
| Tokens per day (TPD) | number | |
| Maximum concurrent requests? | number | |
| Maximum input tokens per request? | number | |
| Maximum output tokens per request? | number | |

> **Consultant Notes:** Attack Library needs 10–20 RPM sustained for ~5 hours. Common: OpenAI Tier 1 = 500 RPM (fine), Tier 0 = 3 RPM (will fail). Recommend a dedicated API key with elevated limits for the test environment.

---

### 14. Guardrail Detection `ESSENTIAL`

_Feeds: Guide Step 4.3. Without this, reports can't distinguish "blocked by guardrail" from "model refused."_

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
