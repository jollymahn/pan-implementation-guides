/**
 * News feed for the landing page "News & Updates" panel.
 *
 * ── Adding an entry ────────────────────────────────────────────────────────
 * Any PR that publishes a new guide, or makes a change a returning reader
 * would want to know about, adds an entry to the TOP of NEWS_ITEMS:
 *
 *   {
 *     badge: "New",                                  // "New" or "Updated"
 *     date:  "2026-09-29",                           // ISO 8601, always
 *     title: "What changed, in reader terms",
 *     href:  "guides/airs/airs-cloud-deployment.html#prerequisites",
 *     tags:  "Short, comma, separated, specifics"
 *   }
 *
 * Not every commit is news. Typo fixes, TODO markers, tooling, and internal
 * refactors stay out. If a reader who already finished the guide would not
 * care, it is not an entry.
 *
 * `href` is relative to docs/ (the published site root), and may carry a
 * fragment. `tags` is the editorial line: name the specifics a reader would
 * scan for, not a restatement of the title.
 *
 * ── The cap ────────────────────────────────────────────────────────────────
 * The panel shows the newest NEWS_VISIBLE_COUNT entries. Older ones stay in
 * the array rather than being deleted, so the history survives until there is
 * an archive page to move it to. Trim the tail only when the array gets
 * genuinely unwieldy.
 *
 * ── Enforcement ────────────────────────────────────────────────────────────
 * `docs/shared/scripts/check-news-feed.js` validates every entry and reports
 * guides that changed without an entry. It runs in hooks/pre-commit and
 * .github/workflows/news-feed-check.yml.
 */

var NEWS_VISIBLE_COUNT = 6;

var NEWS_ITEMS = [
  {
    badge: "New",
    date: "2026-11-13",
    title: "The MCP gateway, and the two authentication layers people conflate",
    href: "guides/ai-gateway/configuration/mcp-gateway.html",
    tags: "Chapter 10 of the configuration set, Gateway auth and upstream auth are independent so a public server still needs a gateway identity, The slug becomes the connection URL and changing it breaks every client config, STDIO servers must be exposed over HTTP before they can be registered, GitHub and others lack dynamic client registration so the OAuth app is created by hand against a fixed callback URL, Unsigned claims headers are a trust assertion not proof and need the server to have no other ingress, Auto-provisioning for new workspaces is a standing decision not a convenience, Disabled tools are hidden from listings not merely refused, A workspace key without MCP Invoke fails on the first tool call rather than at connection, Rate limits need gateway 2.18.0 and backend 1.24.0 or they are accepted and never enforced, api_key conditions never match OAuth flows so those callers pass unlimited, PII detection and content moderation are llm target only and have no MCP equivalent, Circuit breakers are announced but not shipped"
  },
  {
    badge: "New",
    date: "2026-11-12",
    title: "Integrations, the model catalog, and the first call that proves it all",
    href: "guides/ai-gateway/configuration/integrations.html",
    tags: "Chapter 9 of the configuration set, Integration is the org credential and a Provider is what a workspace sees, The model allowlist is set on the integration and nowhere else, Allow All Models includes models the provider has not released yet, All Workspaces includes workspaces that do not exist yet, The slug ends up in application code so pick the convention first, Secret Ref toggle keeps provider keys in your vault, Pricing multipliers need gateway 2.7.0, Step 5 is a failure table where every row points at one earlier chapter, Step 6 clears the deferred checks from chapters 3 5 6 7 and 8"
  },
  {
    badge: "New",
    date: "2026-11-12",
    title: "Workspaces, and why no application can call a model until one exists",
    href: "guides/ai-gateway/configuration/workspaces.html",
    tags: "Chapter 8 of the configuration set, Completion APIs are workspace-scoped so there is no org-level key that calls a model, Closes the group mappings and workspace keys deferred from chapter 2 and the permission test from chapter 4, A directory group maps to exactly one workspace and removing a mapping deprovisions users immediately, Fewer members than the group means a missing allowed domain, User keys are what make per-user data visibility actually separate anything, A workspace rate limit rejects every key at once, Custom reset intervals are Admin API only, The Shared Team Workspace cannot be deleted"
  },
  {
    badge: "New",
    date: "2026-11-12",
    title: "Partner plugins, and tuning Prisma AIRS for agentic clients",
    href: "guides/ai-gateway/configuration/plugins.html",
    tags: "Chapter 7 of the configuration set, Nineteen partners enable then credential then appear as guardrail checks, Credentials live under Plugins or Integrations depending on partner and version, Prisma AIRS scan scope is the exception to the last-message rule and reaches all_messages, Default AI Model and Application User make AIRS reporting useless for attribution, Claude Code and Cursor scaffolding causes false positives that strip_scaffolding fixes, Online search sends prompts out and brings untrusted text back, Webhook Fail on Error decides whether your control fails open or closed, Self-hosted needs TRUSTED_CUSTOM_HOSTS for private webhooks"
  },
  {
    badge: "New",
    date: "2026-11-12",
    title: "Guardrails, and the four constraints that shape every one",
    href: "guides/ai-gateway/configuration/guardrails.html",
    tags: "Chapter 6 of the configuration set, Only the last message is evaluated so an earlier injection is not re-examined, One guardrail covers input or output and never both, Checks return a boolean with no score to threshold on, Async defaults to true so a new guardrail logs rather than blocks, Status 446 denied and 246 failed but allowed replace the provider code, An output guardrail cannot stop a streamed response, Ten endpoints run no guardrails at all, Full BASIC and PRO check catalog with directions"
  },
  {
    badge: "New",
    date: "2026-11-11",
    title: "Organization properties: what every workspace inherits",
    href: "guides/ai-gateway/configuration/organization-properties.html",
    tags: "Chapter 5 of the configuration set, Full Logging against Metrics Only and whether a workspace may override it, Metadata schemas bind new keys and workspaces only and never retrofit the old ones, JSON Schema draft-07 with three mandatory elements, A budget limit cannot be edited once set by anyone including the owner, No periodic reset expires a production key permanently, Weekly and monthly resets land at midnight UTC, Budgets exist at three levels set in three places"
  },
  {
    badge: "New",
    date: "2026-11-11",
    title: "Gateway access control, and the master key nobody chose",
    href: "guides/ai-gateway/configuration/security-access-control.html",
    tags: "Chapter 4 of the configuration set, Organization admins hold admin rights in every workspace with no way to restrict it, Admin differs from Owner only on billing, Workspace managers equal admins until you change it, A new organization arrives with a fully permissioned master API key, Logs against logs metadata is the payload decision, Data visibility scopes whose logs rather than redacting them, Saved-only mode defaults on for organizations created from 19 June 2026, Audit logs need no setup and are owner and admin only"
  },
  {
    badge: "New",
    date: "2026-11-11",
    title: "Secret references keep provider keys in your own vault",
    href: "guides/ai-gateway/configuration/secret-references.html",
    tags: "Chapter 3 of the configuration set, AWS Secrets Manager Azure Key Vault and HashiCorp Vault, Nine authentication variants and which ones store no credential at all, The management plane never sees the secret value, Five minute data plane cache is also the rotation delay and the revocation delay, Saving a reference does not prove the vault can be read, Deletion is refused while an integration still uses it, Restricting a reference to named workspaces has no console path yet, Needs gateway 2.2.4 or higher"
  },
  {
    badge: "New",
    date: "2026-11-11",
    title: "Authentication for the gateway: people, applications and agents",
    href: "guides/ai-gateway/configuration/authentication-identity.html",
    tags: "Chapter 2 of the configuration set, Allowed Domains gate provisioning so a sync run before them provisions nobody and reports nothing, OIDC and SAML with full Okta and Entra ID steps, Cloud Identity Engine directory sync is the SCM path and replaces standalone SCIM, Directory sync cannot map a group until the workspace exists so the mapping waits for chapter 8, Delta sync runs every 15 minutes, JWT needs RS256 and a kid that matches your JWKS, Admin keys reach every workspace and do not belong in an application"
  },
  {
    badge: "New",
    date: "2026-11-11",
    title: "Organization registration, and pointing the console at your gateway",
    href: "guides/ai-gateway/configuration/organization-registration.html",
    tags: "Chapter 1 of the new thirteen chapter configuration set, Separate from the deployment guide which stops at the first model call, Licensing and activation reused from the shared snippet, Why a single Owner account is a single point of failure, Gateway URL and MCP Gateway URL are organization wide and save on blur, A self-hosted management plane ignores both fields and uses an environment variable, Do not split environments across organizations"
  },
  {
    badge: "New",
    date: "2026-11-10",
    title: "AIGW Hybrid Lab on Azure, buildable on free Azure credit",
    href: "labs/aigw-hybrid-azure/index.html",
    tags: "Self-hosted AI Gateway data plane on AKS managed from Strata Cloud Manager, Terraform and native Az PowerShell both build the whole lab, Keycloak identity and an optional JWT demo application, Sized for a 200 dollar free-credit subscription at about 120 dollars a month, Four traffic flow diagrams, Why the 4 vCPU and 3 public IP ceilings shape the footprint, Why LOG_STORE stays unset on an outbound-only integration"
  },
  {
    badge: "Updated",
    date: "2026-11-02",
    title: "Private connectivity to the management plane was withdrawn",
    href: "guides/ai-gateway/connectivity.html#direction",
    tags: "Outbound HTTPS over the internet is the only path, PrivateLink Private Link and Private Service Connect procedures removed, Every endpoint service name and private hostname is gone, aws-cp.portkey.ai is now an ordinary internet endpoint, An endpoint built before 2026-11-02 still bills and points at nothing, How to remove one safely"
  },
  {
    badge: "New",
    date: "2026-11-02",
    title: "Hybrid gateway fault tolerance, and the cache is the weak point",
    href: "guides/ai-gateway/hybrid-fault-tolerance.html",
    tags: "Five failure domains and what each one costs, Traffic survives a Management Plane outage for seven days, The Redis default noeviction makes writes fail at the limit, Losing the cache and the control plane together stops traffic, Private connectivity has gone from the current docs, Fallbacks retries circuit breaker and load balancing, Three alarms that find real problems"
  },
  {
    badge: "New",
    date: "2026-11-02",
    title: "Scaling and upgrading the hybrid gateway",
    href: "guides/ai-gateway/hybrid-scaling-and-upgrade.html",
    tags: "The chart defaults are not production defaults, replicaCount is 1 and strategy is empty, maxUnavailable zero is one uncommented block away, The chart creates no PodDisruptionBudget, Autoscaling silently does nothing without a CPU request, A bad pod serves traffic for three minutes by default, Rollback and recovery and a downgrade warning"
  },
  {
    badge: "New",
    date: "2026-10-30",
    title: "Model provider prerequisites, for eight catalog tiles",
    href: "guides/ai-gateway/ai-gateway-model-prerequisites.html",
    tags: "Three values move an application not five steps, Per provider credential identifiers and permissions, Azure deployment names are not model names, Bedrock assumed role is hard with a hosted gateway, SDK minimum versions and the one hard limit, Where the latency actually goes"
  },
  {
    badge: "New",
    date: "2026-10-30",
    title: "Which client applications can be routed, and which cannot",
    href: "guides/ai-gateway/ai-gateway-client-apps.html",
    tags: "Three groups decided by two questions, Claude Code Cursor and Codex step by step, ChatGPT and both Copilots cannot be routed at all, Say the three No answers at the first meeting, Route by the model call not by the agent, Copilot Studio is an open question"
  },
  {
    badge: "New",
    date: "2026-10-29",
    title: "Connectivity check diagrams, one per pillar",
    href: "guides/airs/airs-connectivity-diagrams.html",
    tags: "Where each check runs from and what it crosses, A numbered badge maps to what that rung proves, What a failure at each point actually means, Red Teaming checks do not cover the path to your target, A gateway can report Healthy while every request fails, The package index is the check to run first for Model Scanning"
  },
  {
    badge: "New",
    date: "2026-10-29",
    title: "Readiness: what an AI Red Teaming customer brings to kickoff",
    href: "guides/airs-red/airs-red-readiness.html",
    tags: "Who must be in the room and what stalls without them, Per target endpoint auth protocol and rate limit, Capture the request and response with DevTools first, Capture what a guardrail returns when it refuses, Private targets need a firewall change or a cluster, Some targets need software your team writes"
  },
  {
    badge: "New",
    date: "2026-10-29",
    title: "Readiness: what an AI Gateway customer brings to kickoff",
    href: "guides/ai-gateway/ai-gateway-readiness.html",
    tags: "Coverage is an inventory problem not a deployment problem, Every application that calls a model including the unofficial ones, Where each provider key lives today, Three values move an application and no code changes, Self-hosted does not keep prompt bodies out of the backend, Name an owner for preventing bypass"
  },
  {
    badge: "New",
    date: "2026-10-29",
    title: "Readiness: what an API Intercept customer brings to kickoff",
    href: "guides/airs/airs-api-intercept-readiness.html",
    tags: "This pillar needs your developers to write code, A position on each of the nine detection services, What a block verdict does to the user, Fail open or fail closed is a product decision, Keys are locked to the region they were made in, Topic guardrail lists come from the business"
  },
  {
    badge: "New",
    date: "2026-10-29",
    title: "Readiness: what a Model Scanning customer brings to kickoff",
    href: "guides/airs-model/airs-model-readiness.html",
    tags: "A security group is bound to one source type permanently, Private Hugging Face repos are not scanned directly, Installing from the private package index is the usual blocker, Python 3.11 and disk for the largest model, Where the gate sits in the lifecycle, Start threat rules blocking and governance rules recording"
  },
  {
    badge: "New",
    date: "2026-10-29",
    title: "Customer readiness documents, and a connectivity validator",
    href: "guides/airs/airs-connectivity-validator.html",
    tags: "What the customer brings to kickoff for four pillars, Who must be in the room and what stalls without them, Lead-time items that slip a date, Pick a pillar and generate a ladder of curl checks, Paste the output back for a verdict, Green pass amber reached-but-rejected red cannot-reach"
  },
  {
    badge: "Updated",
    date: "2026-10-28",
    title: "Fourteen diagrams for how Red Teaming reaches a target",
    href: "guides/airs-red/diagrams/flow-diagrams-review.html",
    tags: "Five routes to a target and the lead time on each, Private splits into IP allowlist and Network Channel, An unconfigured guardrail code files refusals as scan errors, WebSocket does neither multi-turn nor OAuth 2.0, Pattern A and Pattern B of the Custom Target Adapter, Three blockers on a Bedrock Agent, Nothing is installed in front of the application"
  },
  {
    badge: "Updated",
    date: "2026-10-14",
    title: "A Healthy gateway in SCM does not mean inference works",
    href: "guides/ai-gateway/ai-gateway-deployment.html#enable-gateway",
    tags: "Connection Status confirms the management path only, An egress control can permit sync and block providers, The gateway registers and reports Healthy while every request fails, The gateway log records nothing at all, Prove inference separately"
  },
  {
    badge: "New",
    date: "2026-10-14",
    title: "AI Gateway connectivity, with the endpoint list corrected",
    href: "guides/ai-gateway/connectivity.html",
    tags: "Your Strata Cloud Manager URL is not an endpoint, Read the endpoint list off your own running gateway, The image pull bypasses pod NetworkPolicy, Filter by hostname because NetworkPolicy cannot, TLS inspection breaks three layers independently, Healthy in SCM does not mean inference works, Per-cloud identity and storage endpoints, Symptom lookup for a blocked gateway"
  },
  {
    badge: "New",
    date: "2026-10-12",
    title: "Cloud NGFW on AWS when the license lives in another account",
    href: "guides/cngfw/cloud-ngfw-aws-multi-account.html",
    tags: "There is no license to move, License Manager does not apply to SaaS, The tenant belongs to whoever activates it, Programmatic access roles most walkthroughs omit, The module hardcodes the caller account ID, No Panorama-managed support in the module today, Logs do not reach an on-prem Log Collector, Nine questions for your SE"
  },
  {
    badge: "New",
    date: "2026-10-10",
    title: "Agent identity with Azure Entra ID, end to end",
    href: "guides/ai-gateway/agent-identity-entra.html",
    tags: "There is no User-ID in the AI Gateway, Entra does three different jobs, One string decides attribution, A miss is silent, Claim precedence and Mode B tokens, Canonical reference URLs, One new flow diagram"
  },
  {
    badge: "New",
    date: "2026-10-10",
    title: "Streaming, semantic caching, and A2A on the AI Gateway",
    href: "guides/ai-gateway/streaming-caching-a2a.html",
    tags: "An output guardrail cannot stop a stream, Streamed calls record zero cost, Semantic cache gate by gate, Embedding provider and vector store, Agent Registry and virtual servers, Three new diagrams"
  },
  {
    badge: "Updated",
    date: "2026-10-07",
    title: "Red teaming a Bedrock Agent or a Foundry agent now ships with working code",
    href: "guides/airs-red/airs-red-teaming.html#wrappers-appendix",
    tags: "No connector reaches InvokeAgent, Two deployable bridges, Written for a first-timer, Prerequisites and tooling, Line-by-line explanations, Guardrails differ per runtime"
  },
  {
    badge: "Updated",
    date: "2026-10-06",
    title: "The AIRS planner now starts at the sales cycle, and exports to Excel",
    href: "guides/airs-planner/index.html#lifecycle-bands",
    tags: "Ten-stage engagement lifecycle, Decisions that slip too late, Six-sheet workbook, Prerequisites CSV"
  },
  {
    badge: "Updated",
    date: "2026-10-01",
    title: "API Intercept answers the questions a first-time reader actually asks",
    href: "guides/airs/airs-api-intercept.html#api-integration",
    tags: "Where the OAuth token comes from, SCM menu paths, Worked MCP scan, Async batch example, Four corrections"
  },
  {
    badge: "Updated",
    date: "2026-09-30",
    title: "AWS Phase 1.2 has a Panorama path, not just an SCM one",
    href: "guides/aws/vm-series-deployment.html#prerequisites",
    tags: "PAN-OS 10.0 minimum, Device Management license capacity, Both HA management IPs, TCP 3978 reachability"
  },
  {
    badge: "Updated",
    date: "2026-09-30",
    title: "Navigation is alphabetical everywhere you scan for a name",
    href: "index.html",
    tags: "Sections A to Z, Rail links A to Z, Cards A to Z, AI Security first, Labs last"
  },
  {
    badge: "Updated",
    date: "2026-09-30",
    title: "Every numbered step now tells you how to confirm it worked",
    href: "guides/cngfw/cloud-ngfw-azure.html#user-id",
    tags: "28 new checks, Cloud NGFW Phase 8 User-ID, Panorama connectivity, Azure FIPS image definition"
  },
  {
    badge: "Updated",
    date: "2026-09-30",
    title: "Every guide is reachable on a phone",
    href: "index.html",
    tags: "Nav drawer under 900px, Search kept on small screens, No sideways scroll"
  },
  {
    badge: "Updated",
    date: "2026-09-30",
    title: "Home page rebuilt as a generated catalog",
    href: "index.html",
    tags: "Every guide on one page, No cloud tabs, Section filter"
  },
  {
    badge: "Updated",
    date: "2026-09-29",
    title: "Site navigation regrouped into five sections",
    href: "index.html",
    tags: "Collapsed by default, AIRS split into three, Keyboard operable"
  },
  {
    badge: "Updated",
    date: "2026-09-29",
    title: "AIRS guides carry their own Prerequisites",
    href: "guides/airs/airs-cloud-deployment.html",
    tags: "Phases 1-3 now inline, No hop to the intercept guide, Shared content"
  },
  {
    badge: "Updated",
    date: "2026-09-29",
    title: "AI Gateway Kubernetes guide opens with Phase 0",
    href: "guides/ai-gateway/kubernetes-deployment.html",
    tags: "Beginner path, Cluster prerequisites, Tooling setup"
  },
  {
    badge: "Updated",
    date: "2026-09-29",
    title: "AI Gateway Hybrid chart and residency claims corrected",
    href: "guides/ai-gateway/hybrid-infrastructure.html",
    tags: "TLS ingress supported, Versioned tags exist, Prompt-body residency, Service and probe defaults"
  },
  {
    badge: "New",
    date: "2026-09-28",
    title: "AI Gateway on EKS, AKS, and GKE",
    href: "guides/ai-gateway/kubernetes-deployment.html",
    tags: "AI Gateway, Hybrid, Kubernetes, Helm, Workload Identity"
  },
  {
    badge: "Updated",
    date: "2026-09-28",
    title: "AI Gateway Hybrid Connectivity",
    href: "guides/ai-gateway/hybrid-infrastructure.html#connectivity",
    tags: "Outbound only, Inbound path removed, PrivateLink"
  },
  {
    badge: "Updated",
    date: "2026-09-28",
    title: "ECS Fargate Support",
    href: "guides/ai-gateway/serverless-deployment.html#fargate",
    tags: "EC2-backed ECS, Fargate undocumented, Capacity providers"
  },
  {
    badge: "New",
    date: "2026-09-25",
    title: "AI Gateway on ECS and Container Apps",
    href: "guides/ai-gateway/serverless-deployment.html",
    tags: "AI Gateway, Amazon ECS, Azure Container Apps, Terraform"
  },
  {
    badge: "New",
    date: "2026-09-22",
    title: "AI Gateway Hybrid Infrastructure",
    href: "guides/ai-gateway/hybrid-infrastructure.html",
    tags: "AI Gateway, Hybrid, EKS, AKS, GKE, Helm"
  },
  {
    badge: "New",
    date: "2026-09-15",
    title: "VM-Series Active/Passive HA on AWS",
    href: "guides/aws/vm-series-ha-deployment.html",
    tags: "VM-Series, HA, AWS, Cross-AZ, Terraform"
  }
];

var NEWS_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * "2026-09-29" -> "Sep 29", or "Sep 29, 2025" once the year is not the
 * current one. Parsed from the string parts rather than through Date, because
 * new Date("2026-09-29") is UTC midnight and reads back as the 28th anywhere
 * west of Greenwich.
 */
function formatNewsDate(iso, today) {
  var parts = String(iso).split('-');
  var year = Number(parts[0]);
  var label = NEWS_MONTHS[Number(parts[1]) - 1] + ' ' + Number(parts[2]);
  var currentYear = (today || new Date()).getFullYear();
  return year === currentYear ? label : label + ', ' + year;
}

function escapeNewsText(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render the newest `limit` entries into `el`. Exposed so any page that wants
 * the feed can call it, rather than copying the markup out of index.html.
 */
function renderNewsFeed(el, items, limit) {
  if (!el) return;
  var list = (items || []).slice(0, limit || NEWS_VISIBLE_COUNT);
  el.innerHTML = list.map(function (item) {
    var badgeClass = item.badge.toLowerCase() === 'new' ? 'badge-new' : 'badge-updated';
    return '<li>' +
      '<a href="' + escapeNewsText(item.href) + '">' + escapeNewsText(item.title) + '</a>' +
      '<div class="whats-new-meta">' +
        '<span class="whats-new-badge ' + badgeClass + '">' + escapeNewsText(item.badge) + '</span>' +
        escapeNewsText(formatNewsDate(item.date)) + ' &middot; ' + escapeNewsText(item.tags) +
      '</div>' +
    '</li>';
  }).join('');
}

/**
 * Fill the panel's header bar with the date of the newest entry. The bar used
 * to repeat the "News & Updates" heading sitting directly above it, which
 * labeled one list twice and told the reader nothing.
 */
function renderNewsLatest(el, items) {
  if (!el || !items || !items.length) return;
  el.textContent = 'Latest update · ' + formatNewsDate(items[0].date);
}

if (typeof document !== 'undefined') {
  renderNewsFeed(document.getElementById('news-feed-list'), NEWS_ITEMS, NEWS_VISIBLE_COUNT);
  renderNewsLatest(document.getElementById('news-feed-latest'), NEWS_ITEMS);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NEWS_ITEMS: NEWS_ITEMS, NEWS_VISIBLE_COUNT: NEWS_VISIBLE_COUNT, formatNewsDate: formatNewsDate };
}
