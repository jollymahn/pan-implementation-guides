# TRD-SPEC.md — Technical Requirements Document Specification

**Version:** 0.2 (Draft)
**Last updated:** 2026-06-29
**First product:** AIRS AI Red Teaming

---

## 1. Purpose

A Technical Requirements Document (TRD) collects customer-specific information needed to configure, deploy, and validate a Palo Alto Networks product engagement. It is **not** a deployment guide — it feeds one.

| Document | Purpose | Audience |
|---|---|---|
| **TRD** | Capture what the customer has (environment, applications, constraints) | PS Consultant + Customer |
| **Deployment Guide** | Step-by-step instructions for how to deploy and configure | PS Consultant executing the work |
| **Playbook** | Internal consultant guidance, field tips, competitive context | PS Consultant only |

The TRD collects; the guide executes; the playbook advises. They are separate documents that reference each other.

---

## 2. Design Principles

### 2.1 Separation of Concerns

The existing Red Team TRD mixes three things into one document:

1. **Customer questions** (what we need from them)
2. **Consultant guidance** (internal tips on why each question matters)
3. **Reference material** (attack categories, API specs, competitive landscape)

This spec separates them:

- **TRD** — Customer-facing intake form. Questions, structured data capture, decision trees. Clean, professional, no internal commentary.
- **Consultant Notes** — Inline guidance shown only in the consultant's working copy (rendered differently via CSS — e.g., collapsible "Consultant Notes" blocks that can be hidden for customer-facing export). This replaces the "Consultant Guidance" blockquotes from the existing TRD.
- **Reference appendices** — Attack categories, API specs, competitive landscape. Linked, not inline.

### 2.2 Question-Driven, Not Narrative

Every section in the TRD maps to one of:

| Element | When to use |
|---|---|
| **Question table** | Discrete questions with expected answer formats |
| **Structured data block** | Technical specs (IPs, endpoints, JSON templates) |
| **Decision matrix** | When the answer determines downstream sections |
| **Repeatable section** | Per-target, per-VPC, per-application blocks |

No prose paragraphs explaining concepts. If background is needed, link to the deployment guide or reference docs.

### 2.3 Required vs. Optional

Every field is marked:

| Marker | Meaning |
|---|---|
| `*` (asterisk) | **Required** — engagement cannot proceed without this |
| `†` (dagger) | **Conditional** — required only if a prior answer triggers it |
| _(unmarked)_ | **Optional** — nice-to-have, improves engagement quality |

### 2.4 Answer Format Specification

Each question defines an expected answer format so that:
- Customers know what's expected (not open-ended guessing)
- Data can be validated before the engagement starts
- Future interactive HTML forms can enforce types

| Format | Description | Example |
|---|---|---|
| `text` | Free-form text | "Customer's AI CoE manages model governance" |
| `select` | Pick one from a list | `Yes / No / In Progress` |
| `multi-select` | Pick multiple from a list | `[OWASP, NIST, MITRE ATLAS]` |
| `number` | Numeric value | `15` (minutes), `100` (requests/min) |
| `date` | Date value | `2026-08-01` |
| `email` | Email address | `admin@company.com` |
| `url` | Endpoint URL | `https://api.company.com/v1/chat` |
| `ip-list` | One or more IP addresses/CIDRs | `10.0.0.0/16, 172.16.0.0/12` |
| `json` | JSON structure | `{"role": "user", "content": "{INPUT}"}` |
| `table` | Structured table (per-item rows) | Stakeholder contact list |
| `priority` | Rating scale | `1 (Low) / 2 (Medium) / 3 (High) / N/A` |

### 2.5 Conditional Sections

Some sections only apply based on prior answers. The TRD uses a simple trigger model:

```
Section: REST Wrapper Configuration
Condition: Section 11.1 "API Protocol" ∈ {WebSocket, gRPC, Socket.IO, GraphQL}
```

In HTML, conditional sections are hidden by default and revealed when the triggering answer is selected. In the markdown/print version, they include a "Complete only if..." header.

### 2.6 Relevance Tiers — Every Question Must Justify Its Existence

Every TRD question belongs to exactly one relevance tier. The tier determines placement and visual treatment.

| Tier | Definition | Placement | Visual Treatment |
|---|---|---|---|
| **Essential** | Directly feeds a guide configuration step. The consultant types this value into SCM or an API call. Without it, deployment cannot proceed. | Main body, required marker (`*`) | Normal question row |
| **Important** | Drives a decision that determines which guide sections apply, or affects result validity. Does not become a config field itself. | Main body, no required marker | Normal question row |
| **Scoping** | Informs engagement sizing, stakeholder planning, or PS commercial decisions. Never becomes a config field. | Part A only, clearly labeled "Scoping" | Lighter styling, grouped under "Engagement Planning" |
| **Day-2** | Affects ongoing operations after initial deployment. Not needed for first scan cycle. | Appendix: "Day-2 Planning" | Separate section, clearly marked optional |

**The test:** If you remove a question and the consultant can still complete every step in the deployment guide, the question is not Essential.

**Consequence for the existing Red Team TRD:** Roughly 40% of its content is Essential, 20% Important, 25% Scoping, and 15% noise (training material, competitive analysis, roadmap items) that does not belong in any tier.

---

## 3. Document Structure

### 3.1 Tiered Architecture

All AIRS TRDs follow a three-tier structure. Each tier has a different scope and repeat pattern.

```
┌──────────────────────────────────────────────────────────┐
│  PART A: ORGANIZATION & BUSINESS CONTEXT                 │
│  Asked once per customer. Establishes who they are,      │
│  what AI systems they have, and what they need.          │
├──────────────────────────────────────────────────────────┤
│  PART B: ENGAGEMENT & PLATFORM CONFIGURATION             │
│  Asked once per engagement. Covers licensing, tenant     │
│  setup, network topology, and engagement sizing.         │
├──────────────────────────────────────────────────────────┤
│  PART C: PER-TARGET CONFIGURATION                        │
│  Repeated for each target (or target group). Captures    │
│  the technical spec needed to configure the product.     │
│  This is where the TRD meets the deployment guide.       │
└──────────────────────────────────────────────────────────┘
```

### 3.2 Section Map — AI Red Teaming

Each section is tagged with its relevance tier (see §2.6) and the deployment guide step it feeds.

#### Part A: Engagement Context (asked once per customer)

| # | Section | Tier | Feeds Guide Step | Key Data |
|---|---|---|---|---|
| 1 | Engagement Overview | Scoping | — | Business driver, success criteria, timeline, contacts |
| 2 | Target Overview | **Essential** | Drives Part C count | App name, type, use case, hosting, priority |
| 3 | Compliance Requirements | Important | Step 6.2 (category selection) | Applicable frameworks (OWASP, NIST, MITRE) |
| 4 | Remediation Expectations | Important | Step 8.3 (remediation review) | RT→Runtime bridge decision, who implements |

**What was cut from the existing TRD's Part A and why:**

| Existing TRD Section | Disposition | Reason |
|---|---|---|
| §1.2 Organizational Context (6 questions) | **Removed** | "Who owns AI security?" and "Is there a CoE?" are stakeholder management — useful for the consultant's prep call but never feed a config step. Consultant should gather this informally, not in the TRD. |
| §2.1 AI Application Inventory (4 questions) | **Merged into §2** | "How many AI apps total?" is answered by the Target Overview table row count. "Shadow AI?" and "Discovery method?" are AIRS Discovery scope, not Red Teaming. |
| §2.3 Cross-Target Summary (8 questions) | **Removed** | Every question here ("auth pattern mix?", "cloud providers?", "protocol mix?") is re-asked per-target in Part C. This section previews Part C answers — redundant. |
| §3.2 Reporting Requirements (6 questions) | **Merged into §3** | Trimmed to 2 questions: "report format needed?" and "compliance-mapped reports needed?" The rest (recipients, executive summary, audit evidence) are delivery logistics, not config. |
| §4.2 Ongoing Program Design (6 questions) | **Moved to Day-2 appendix** | Cadence, CI/CD integration, and re-scan triggers don't affect initial deployment. |

#### Part B: Platform Configuration (asked once per engagement)

| # | Section | Tier | Feeds Guide Step | Key Data |
|---|---|---|---|---|
| 5 | Licensing & Credits | **Essential** | Step 3.1 (Create Deployment Profile) | CSP admin, credit pool, credit allocation |
| 6 | Tenant & TSG | **Essential** | Step 3.1 (Create Deployment Profile) | TSG ID (or create new), region, SLS status, AIOps conflict |
| 7 | Access & Identity | **Essential** | Step 3.2 (Configure IAM) | RBAC roles, SSO/IdP, service accounts for API |
| 8 | Network & Connectivity | **Essential** | Phase 5 decision (skip or deploy Network Channel) | Public/private mix, K8s availability, WAF in path |
| 9 | Engagement Sizing | Scoping | — | Calculated from above answers: package, sessions, add-ons |

**What was cut from the existing TRD's Part B and why:**

| Existing TRD Section | Disposition | Reason |
|---|---|---|
| §7 Logging & Observability (9 questions) | **Moved to Day-2 appendix** | SIEM, alerting, retention, SOC team — none of these affect initial deployment. The only prerequisite is SLS, which is already checked in §6 (Tenant & TSG). |

#### Part C: Per-Target Configuration (repeated per target or target group)

| # | Section | Tier | Feeds Guide Step | Key Data |
|---|---|---|---|---|
| 10 | Target Architecture | **Essential** | Step 4.2 (Add Target) + Step 4.3 (Configure Details) | Provider, model, framework, tools, RAG, system prompt, protocol |
| 11 | Risk Priority Matrix | Important | Step 6.2 (category selection) | Per-category priority (1-3 / N/A) — drives which categories to scan |
| 12 | Connection & Auth | **Essential** | Step 4.2 (Add Target) | Connection type, endpoint URL, auth method, token expiry |
| 13 | Rate Limits & Capacity | **Essential** | Step 4.3 + scan execution | RPM, TPM, TPD, concurrent — prevents RATE_LIMIT scan errors |
| 14 | Guardrail Detection | **Essential** | Step 4.3 (Configure Details) | HTTP error codes, error JSON — required for meaningful reports |
| 15 | Environment | Important | Result validity | Which env, model parity check, production scanning acceptable? |
| 16 | REST Wrapper | **Essential** `†` | Conditional: only if non-REST protocol | Native protocol, language, streaming aggregation |
| 17 | Scan Strategy | **Essential** | Steps 6.3-6.5 (Start Scans) | Scan types, categories, agent breadth/depth/goals |
| 18 | Target Specification | **Essential** | Step 4.2 API payload (`POST /v1/target`) | Complete structured spec — this IS the API request body |

#### Day-2 Appendix (optional, address after first scan cycle)

| # | Section | Tier | Key Data |
|---|---|---|---|
| D1 | Logging & SIEM Integration | Day-2 | SIEM platform, forwarding, alerting, retention |
| D2 | Ongoing Program Design | Day-2 | Scan cadence, CI/CD integration, re-scan triggers, risk thresholds |
| D3 | Reporting & Distribution | Day-2 | Report recipients, executive summary needs, audit evidence retention |

### 3.3 Repeatable Sections

Part C is the repeatable unit. Each target (or group of targets with shared characteristics) gets its own copy of sections 13-21.

The TRD includes a **Target Index** at the top of Part C that lists all targets and links to their respective section copies:

```
Target Index
──────────────────────────────────────
#  | Name                    | Type        | Priority
1  | Customer Support Bot    | Application | High
2  | Code Gen Assistant      | Agent       | High
3  | Doc Summarizer          | Application | Medium
──────────────────────────────────────
```

---

## 4. Mapping TRD to Deployment Guide

The TRD is not standalone — it feeds the deployment guide. This section shows exactly where each TRD field becomes a configuration value.

### 4.1 Red Teaming: Field-Level Cross-Reference

Each row shows a TRD question, the guide step that consumes it, and the specific API field or SCM UI element it populates.

#### Platform Setup (TRD Part B → Guide Steps 3.1-3.2)

| TRD Field | Guide Step | Becomes | Notes |
|---|---|---|---|
| CSP admin email | 3.1: Create Deployment Profile | Login credential for CSP portal | Must have credit allocation permissions |
| Credit allocation for RT | 3.1: Create Deployment Profile | Deployment profile credit pool | Determines scan quota |
| Region | 3.1: Create Deployment Profile | Region dropdown (Americas / EU / Singapore) | Cannot change after activation |
| TSG ID (or "create new") | 3.1: Create Deployment Profile | TSG association in Hub | New TSG adds 15-20 min provisioning |
| SLS status | 3.1: Create Deployment Profile | Pre-check before activation | SLS is mandatory — activate first if not enabled |
| AIOps subscription check | 3.1: Create Deployment Profile | Pre-check for conflicts | Existing AIOps can conflict with AIRS onboarding |
| RBAC roles needed | 3.2: Configure IAM | Role assignment (Superuser or custom) | Custom role must enable "AI Red Teaming" app |
| Service account needed? | 3.2: Configure IAM | Service account creation | Required for API/CI/CD. Record Client Secret immediately. |
| SSO / IdP | 3.2: Configure IAM | IdP integration | Okta, Entra ID, Ping — adds COM-020 sessions |

#### Network Decision (TRD §8 → Guide Phase 5)

| TRD Field | Guide Step | Becomes | Notes |
|---|---|---|---|
| Public vs. private endpoints | Phase 5 decision | Skip Phase 5 (public) or deploy Network Channel (private) | Single most impactful scoping question |
| K8s available? | 5.2-5.3: Deploy Channel Client | Prerequisite check | Any K8s cluster with outbound internet works |
| WAF in request path? | Pre-scan planning | Whitelist AIRS IPs, bypass WAF, or test full stack | WAFs block attack payloads by design — decide intent |

#### Target Configuration (TRD Part C → Guide Steps 4.2-4.3)

| TRD Field | Guide Step | API Field | Notes |
|---|---|---|---|
| Application name | 4.2: Add Target | `name` | Human-readable identifier |
| Target type | 4.2: Add Target | `target_type` (APPLICATION / AGENT / MODEL) | Determines connection methods and agentic profiling |
| Inference provider | 4.2: Add Target | `connection_type` (OPENAI / BEDROCK / REST / etc.) | Pre-built vs custom determines LOE |
| Endpoint URL | 4.2: Add Target | `endpoint_url` | Must be reachable from AIRS (public or via Network Channel) |
| Endpoint accessibility | 4.2: Add Target | `api_endpoint_type` (PUBLIC / PRIVATE / NETWORK_BROKER) | NETWORK_BROKER is API-only, not in SCM UI |
| Auth method | 4.2: Add Target | `auth_type` (HEADERS / BASIC_AUTH / OAUTH2) | Token expiry >1hr critical for 5hr Attack Library scans |
| Auth credentials | 4.2: Add Target | `auth_config` (headers, tokens, OAuth params) | Static API keys preferred for test environments |
| Request JSON template | 4.2: Add Target | `request_template.body` with `{{prompt}}` placeholder | **Most critical field** — bad placeholder = scans run but produce no results |
| Response JSON path | 4.2: Add Target | `response_template.body_path` (e.g., `choices[0].message.content`) | Must extract the actual model response text |
| Industry | 4.3: Configure Details | `target_background.industry` | Mandatory for Applications and Agents |
| Use case | 4.3: Configure Details | `target_background.use_case` | Mandatory for Applications and Agents |
| Competitors | 4.3: Configure Details | `target_background.competitors` | Enables brand reputation attacks with real competitor names |
| Base model | 4.3: Configure Details | `additional_context.base_model` | e.g., GPT-4o, Claude 3.5, Gemini 2.0 |
| System prompt | 4.3: Configure Details | `additional_context.system_prompt` | Enables white-box testing — dramatically improves agent scan results |
| Tools accessible | 4.3: Configure Details | `additional_context.tools_accessible` | Agent targets only — tool schemas for tool-misuse attacks |
| Core architecture | 4.3: Configure Details | `additional_context.core_architecture` | Single LLM / RAG / Tool Calling / Multi-Agent |
| Guardrail HTTP codes | 4.3: Configure Details | Guardrail detection config | Without this, reports can't distinguish "blocked by guardrail" from "model refused" |
| Guardrail error JSON | 4.3: Configure Details | Guardrail detection config | Sample error body for pattern matching |
| Rate limits (RPM/TPM) | 4.3 + scan execution | Scan concurrency settings | #1 cause of scan failures — Attack Library needs 10-20 RPM sustained |

#### Scan Execution (TRD §17 → Guide Steps 6.2-6.5)

| TRD Field | Guide Step | API Field | Notes |
|---|---|---|---|
| Risk priority per category | 6.2: Configure Categories | `categories` array in scan payload | N/A categories excluded from scan |
| Compliance frameworks needed | 6.2: Configure Categories | COMPLIANCE category + subcategories | OWASP, MITRE_ATLAS, NIST, DASF_V2 |
| Scan types selected | 6.3-6.5: Start Scans | `job_type` (STATIC / DYNAMIC / CUSTOM) | Start with STATIC for baseline |
| Agent breadth | 6.4: Dynamic Scan | `stream_breadth` (1-20, default 6) | More agents = more diverse attack approaches |
| Agent depth | 6.4: Dynamic Scan | `stream_depth` (1-20, default 10) | More depth = longer multi-turn attacks |
| Attack goals | 6.4: Dynamic Scan | `attack_goals` array | Natural language goals for Human Augmented mode |

### 4.2 What the Existing TRD Collects That No Guide Step Consumes

These are questions in the current Red Team TRD that never become a configuration value. They may still have value for engagement planning, but they are not technical requirements.

| Existing TRD Question | Why it's not consumed |
|---|---|
| "What triggered this engagement?" | Sales/scoping context. The guide doesn't branch on business motivation. |
| "Which teams own AI systems?" | Stakeholder management. The guide needs credentials, not org charts. |
| "Is there a central AI CoE?" | Organizational maturity assessment. No config field for this. |
| "Existing vulnerability management program?" | AppSec maturity. Doesn't affect Red Teaming setup. |
| "Relationship between security and AI/ML teams?" | Internal politics. Not a technical requirement. |
| "How many distinct AI applications exist?" | The target overview table answers this concretely. The count is noise. |
| "Are there known shadow AI applications?" | AIRS Discovery scope, not Red Teaming scope. |
| "AI governance policy exists?" | Compliance maturity. Doesn't affect scan configuration. |
| "Remediation timeline?" | Scheduling, not configuration. |
| "Testing cadence envisioned?" | Day-2 planning, not initial deployment. |
| "Should red teaming integrate into CI/CD?" | Day-2 planning. |
| "Risk score thresholds for go/no-go?" | Day-2 planning. |
| "SIEM platform?" through "Log retention?" | Day-2. SLS (the only prerequisite) is covered in tenant setup. |
| Competitive landscape (Appendix B) | Sales enablement. Not customer data collection. |
| API Quick Reference (Appendix C) | Already in the deployment guide's reference section. |
| Attack Category Reference (Appendix A) | Product education. Already in the guide. |

### 4.3 Cross-Product Mapping (Future)

Other AIRS products will follow the same tier structure but with different Part C sections:

| Product | Part C Focus |
|---|---|
| AI Red Teaming | Per-target: endpoint, auth, scan strategy |
| AIRS Runtime (API Intercept) | Per-application: inline/sidecar, security profiles |
| AIRS Runtime (Network Intercept) | Per-firewall: decryption, GWLB, traffic flows |
| AIRS Model Security | Per-model: provider, scanning, posture |
| Cloud NGFW | Per-VPC/VNET: topology, routing, policy |
| VM-Series (AWS/Azure) | Per-firewall-set: VPCs, subnets, interfaces, routing |

---

## 5. HTML Rendering Specification

TRDs are built as HTML documents using the same shared CSS/JS as deployment guides, with additional form-specific components.

### 5.1 Shared Foundation

```html
<link rel="stylesheet" href="../../shared/css/pan-guides.css">
<script src="../../shared/js/pan-guides.js"></script>
```

Same header, sidebar, breadcrumbs, and back-to-top as guides. The sidebar lists Part A / Part B / Part C sections.

### 5.2 TRD-Specific Components

#### Question Table

The primary data collection element. Each row is a question with an answer field.

```html
<table class="trd-table">
  <thead>
    <tr>
      <th>Question</th>
      <th>Response / Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <span class="trd-required">*</span>
        What is the primary business goal for AI red teaming?
        <span class="trd-format">select</span>
      </td>
      <td>
        <span class="trd-options">
          Pre-deployment security validation /
          Compliance requirement /
          Risk assessment /
          Incident response
        </span>
      </td>
    </tr>
  </tbody>
</table>
```

#### Structured Data Block

For technical specifications that need precise formatting (JSON templates, CLI commands, endpoint configurations).

```html
<div class="trd-spec-block">
  <h4>Target Specification: <span class="trd-fill">_______________</span></h4>
  <div class="trd-spec-grid">
    <div class="trd-spec-row">
      <span class="trd-spec-label">Name:</span>
      <span class="trd-spec-value trd-fill">[human-readable name]</span>
    </div>
    <div class="trd-spec-row">
      <span class="trd-spec-label">Target Type:</span>
      <span class="trd-spec-value trd-options">MODEL / APPLICATION / AGENT</span>
    </div>
    <!-- ... -->
  </div>
</div>
```

#### Consultant Notes (Collapsible, Hideable)

Internal guidance visible to the consultant but hidden in customer-facing export.

```html
<div class="consultant-notes">
  <div class="collapsible">
    <div class="collapsible-header">
      <span class="chevron">&#9654;</span>
      <span>Consultant Notes</span>
    </div>
    <div class="collapsible-body">
      <p>Internal guidance here...</p>
    </div>
  </div>
</div>
```

CSS class `.consultant-notes` can be toggled off for customer-facing print/export via a body class:
```css
body.customer-view .consultant-notes { display: none; }
```

#### Conditional Section

Sections that appear only when a prior answer triggers them.

```html
<div class="trd-conditional" data-condition="api-protocol" data-show-when="websocket,grpc,socketio,graphql">
  <div class="callout callout-note">
    <div class="callout-title">Conditional Section</div>
    <p>Complete only if the target uses a non-REST protocol.</p>
  </div>
  <!-- Section content -->
</div>
```

#### Decision Matrix

For architecture selection or package sizing. Same table styling as guides but with selectable rows.

```html
<table class="trd-decision-matrix">
  <thead>
    <tr>
      <th>Package</th>
      <th>Sessions</th>
      <th>Includes</th>
      <th>Select</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Standard (1 pre-built target)</td>
      <td>10</td>
      <td>Common (5) + RT-001 + RT-003 + RT-005 + RT-006 + RT-008</td>
      <td><input type="radio" name="package"></td>
    </tr>
  </tbody>
</table>
```

### 5.3 Print / Export

The TRD must produce a clean PDF when printed:

- `@media print` rules hide the sidebar, header nav, and back-to-top button
- `body.customer-view` hides `.consultant-notes` blocks
- Question tables use full width with visible borders
- Structured data blocks preserve monospace formatting
- Page breaks before each Part (A, B, C) and before each target in Part C

### 5.4 Future: Interactive Mode

The HTML structure is designed so that a future JavaScript layer can:

- Convert `trd-options` spans into `<select>` dropdowns or radio buttons
- Show/hide `trd-conditional` sections based on selections
- Validate required fields before export
- Auto-calculate engagement sizing based on target count and connection types
- Export collected data as JSON for programmatic consumption

This is not in scope for v1 but the HTML structure should not prevent it.

---

## 6. Content Guidelines

### 6.1 Question Writing

Good questions:
- Have a specific expected answer format
- Don't assume knowledge ("What is your TSG ID?" not "Provide your TSG")
- Include common answers as selectable options
- Are scoped to one thing (don't combine "Do you have SSO and what IdP?" into one question)

Bad questions:
- Open-ended without guidance ("Describe your AI landscape")
- Assume the customer knows PAN terminology without explanation
- Ask for information the consultant should already know from the sales process
- Duplicate information collected elsewhere in the TRD

### 6.2 Consultant Notes

Consultant notes should answer:
1. **Why does this question matter?** — What downstream decisions depend on this answer?
2. **What are the common patterns?** — What do most customers say, and what does each answer imply?
3. **What are the gotchas?** — Field-tested failure modes tied to this question
4. **What if they don't know?** — Default recommendation or how to help them find the answer

Consultant notes should NOT contain:
- Product training material (link to it instead)
- Competitive analysis (separate document)
- Feature roadmap items (they go stale)
- Lengthy case studies (summarize the lesson in one line)

### 6.3 Structured Data Blocks

The target specification (§18) is the most critical section — it directly populates the product configuration. Rules:

- Every field must match the product's actual configuration field names
- Include the exact JSON path for response extraction (e.g., `choices[0].message.content`)
- Provide a complete example filled out for a common case (e.g., OpenAI GPT-4o application)
- Mark which fields are configurable via SCM UI vs. API-only

---

## 7. File Organization

```
docs/trd/
├── TRD-SPEC.md                    ← this file (specification)
├── red-teaming/
│   ├── trd-red-teaming.html       ← the TRD document (HTML)
│   ├── trd-red-teaming.md         ← the TRD document (markdown)
│   └── examples/
│       └── example-openai-target.md   ← filled-out example for reference
├── css/
│   └── trd.css                    ← TRD-specific styles (extends pan-guides.css)
└── js/
    └── trd.js                     ← TRD-specific JS (conditional sections, future interactivity)
```

Future products follow the same pattern:
```
docs/trd/
├── runtime-api/
│   ├── trd-runtime-api.html
│   └── trd-runtime-api.md
├── network-intercept/
│   ├── trd-network-intercept.html
│   └── trd-network-intercept.md
└── vm-series-aws/
    ├── trd-vm-series-aws.html
    └── trd-vm-series-aws.md
```

---

## 8. Relationship to Existing Workbooks

The VM-Series AWS and Azure Delivery Workbooks are the current-generation TRDs for firewall deployments. They combine TRD + playbook + functional testing into a single spreadsheet.

### 8.1 What to Preserve from the Workbooks

| Feature | How it carries forward |
|---|---|
| Template variable system (`project_customer_name`) | Inform field naming conventions in HTML forms |
| Design Criteria matrices | Become decision matrices in the TRD |
| Playbook checklists (CUSTOMER/PANW ownership) | Remain in the deployment guide, linked from TRD |
| Functional Test Checklists | Remain in the deployment guide's validation phase |
| Baseline configuration (set commands) | Remain in the deployment guide |

### 8.2 What Changes

| Old (Workbook) | New (TRD) |
|---|---|
| Single spreadsheet with 10+ tabs | Separate documents: TRD (intake) + Guide (execution) + Playbook (advice) |
| Google Sheets with Apps Script for doc generation | HTML with structured data, exportable as JSON/PDF |
| Mix of customer questions and consultant playbook | Clean separation with toggleable consultant notes |
| Spreadsheet-only format | HTML (interactive) + Markdown (source) + PDF (export) |

### 8.3 Migration Path

When creating TRDs for VM-Series (AWS/Azure), the workbook's "Technical Requirements" tab becomes the TRD. The "Playbook" tabs become deployment guide phases. The "Functional Test Checklist" becomes the guide's validation section. The "Design Criteria" tab becomes a decision matrix in the TRD.

---

## 9. Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-06-29 | Sean Jolly | Initial draft — structure, principles, Red Teaming section map |
| 0.2 | 2026-06-29 | Sean Jolly | Cross-referenced against deployment guide. Added relevance tiers (§2.6). Restructured section map with tier tags and cut/moved dispositions. Replaced shallow mapping table with field-level cross-reference showing exact API fields. Added §4.2 documenting what was cut and why. Moved Logging/Observability and Program Design to Day-2 appendix. Removed redundant Cross-Target Summary and Organizational Context sections. |
