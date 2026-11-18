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
    date: "2026-11-18",
    title: "MCP Registry and the Add MCP Server wizard, read from a live tenant",
    href: "guides/ai-gateway/mcp/registry.html",
    tags: "The two-step wizard captured from the console, not four steps like the LLM integration wizard because an MCP server exposes tools rather than models, Four authentication options, OAuth 2.1 and OAuth Client Credentials and None and Headers, OAuth 2.1 takes no fields because it is per-user and each user signs in to the upstream service, A shared Service key cannot drive an OAuth 2.1 server so the key type decides whether the option works at all, The API key needs the mcp.invoke permission, Streamable HTTP against SSE, Passthrough headers are forwarded on every request and are a different control from the Headers authentication type, The three Advanced Settings boxes and the nesting mistake that silently falls back to Dynamic Client Registration"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "MCP Gateway troubleshooting, organized by symptom",
    href: "guides/ai-gateway/mcp/troubleshooting.html",
    tags: "Authentication happens in two places and most authorization errors come from the gateway to server hop even when the client shows a generic failure, Status code triage for 401 and 403 and 404 and 500, The API key type that looks like a permissions fault, Servers that reject dynamic client registration including Snowflake and anything behind Okta or Entra, invalid_scope and the protected resource mismatch, Stale cached configuration after a change, Google servers asking for reconnection every hour without access_type offline, The self-hosted port routing fault that answers with an AI Gateway error during client registration"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "Remote MCP, a different feature that shares the name",
    href: "guides/ai-gateway/mcp/remote-mcp.html",
    tags: "Not the MCP Gateway, this is the AI Gateway letting a model provider use MCP tools during inference, Two execution modes, gateway execution with the at portkey-mcp prefix against provider execution with a direct server URL, The choice decides where tools run and whether credentials leave your environment and whether anything is logged, Provider execution has no per-user attribution and no execution logging, A private MCP server cannot be reached by the provider at all so gateway execution is the only option, The Responses API discards header values and the server URL path so both must be resent every request"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "MCP observability: what a tool call leaves behind",
    href: "guides/ai-gateway/mcp/observability.html",
    tags: "Every MCP request is logged automatically with no setup, Each entry holds the tool and the full parameters and the full response and the user and team and latency and status, Tool arguments can carry sensitive values and they are logged, Filter by server and team and user and tool name and time range and status, The metadata fields that make per-user and per-team attribution possible, A debugging flow that starts from the user who reported the problem, Traces span LLM calls and tool use so a tool call can be correlated with the model output that triggered it"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "Identity and client configuration: the half the provider guides do not cover",
    href: "guides/ai-gateway/integrations/identity-and-clients.html",
    tags: "Two credentials cross every request and the provider guides only document one of them, The model provider sees one principal per integration however many people are behind it, Attribution and budgets and revocation all live inside the gateway and stop at its egress, Three attribution levels, a Service workspace key attributes to the workspace and a User key to a named member and a validated JWT to the user, The three values an application changes, base URL and gateway key and the at-slug model reference, The OpenAI SDK wants slash v1 and the Anthropic SDK does not because it adds its own path, One integration credential is one provider-side rate limit bucket and gateway limits divide that ceiling rather than raising it, A personal provider key is a test credential and not a design"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "OpenAI integration, all three authentication paths",
    href: "guides/ai-gateway/integrations/openai.html",
    tags: "API Key and OAuth Client Credentials and Workload Identity Federation, Every form captured from a live tenant, Federation set up against Entra ID and Okta with a tab for each, The Entra subject trap, use the service principal object ID from Enterprise applications and not the app registration object ID, OpenAI rejects the exchange when more than one mapping matches, Streaming returns no usage data without stream_options include_usage so tokens and cost log as zero and budgets never see the spend, Organization ID and Project ID change cost attribution"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "Anthropic integration, and the two settings that silently reject a correct federation",
    href: "guides/ai-gateway/integrations/anthropic.html",
    tags: "Two authentication types only and no OAuth Client Credentials option unlike OpenAI, Federation uses a JWT bearer grant and a federation rule rather than a token exchange and a mapping, Max JWT lifetime must be 5400 or higher for Entra because Entra tokens last up to 90 minutes, JTI replay protection must be disabled for Okta because the gateway reuses its cached token, Both failures return the same unhelpful subject token rejected message, Do not add slash v1 to the base URL because the Anthropic SDK adds its own path, Claude Code sends a bare model name and needs the x-portkey-provider header"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "Azure OpenAI integration, four modes and the deployment naming that decides the first call",
    href: "guides/ai-gateway/integrations/azure-openai.html",
    tags: "Azure Authentication Mode with four options, Default and Managed and Azure Entra and Workload Identity, Default is the API key path, Managed and Workload Identity both require a self-hosted gateway on Azure, Azure Workload Identity is Azure AD workload identity with a client ID and tenant ID and is not the OpenAI style token exchange, The Foundation Model block holds the deployment entries and their API versions on the main form, A deployment name is not a model name and the caller sends the deployment, Grant Cognitive Services OpenAI User and not Contributor or Owner, The streaming zero-token bug applies here too because Azure OpenAI is OpenAI compatible"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "Azure Foundry integration, and why one integration describes one deployment",
    href: "guides/ai-gateway/integrations/azure-foundry.html",
    tags: "Closes an information gap the prerequisites page carried since it was written, Same four mode control as Azure OpenAI with the same credential fields, The endpoint is where they differ, a full Azure Target URI rather than a resource name, One optional deployment name and one API version for the whole integration with no model picker, A customer running several Foundry deployments needs several integrations or callers that name the deployment, Azure Foundry is a different tile from Azure OpenAI and neither is Microsoft Copilot Studio"
  },
  {
    badge: "New",
    date: "2026-11-18",
    title: "Bedrock integration, five authentication types including one that stores nothing",
    href: "guides/ai-gateway/integrations/bedrock.html",
    tags: "AWS Auth Type with five options, AWS Access Key and AWS Assumed Role and AWS Service Role and API Key and OAuth Client Credentials, AWS Service Role takes no credential field at all and uses the role of the compute the gateway runs on so it needs a self-hosted gateway, The hosted gateway principal ARN is published so assumed role is viable on a hosted gateway, The prerequisites page previously advised against it and is corrected, The permission policy and the trust policy and the external ID, STS session tags attribute cost per application while sharing one role and need gateway 2.19.0 or higher, The model reference needs the cross-region prefix"
  },
  {
    badge: "Updated",
    date: "2026-11-16",
    title: "AIRS now holds every pillar in the left rail, AI Gateway included",
    href: "guides/airs/index.html",
    tags: "Navigation reorganization, AI Gateway was a separate top-level group and is now the first AIRS pillar, Five pillars each expand and collapse on their own so the AIRS group is not 31 rows at once, Kubernetes and Microperimeter are electives under Network Intercept rather than peers of it, Cloud Deployment sits under Network Intercept because it is the substrate Phase 4 depends on, The AI Gateway configuration hub reaches the rail for the first time, Integrations split into their own band by which product they drive, API Integrations and Hooks today with AI Gateway Integrations to follow, Child entries carry a parent prefix so a label still reads correctly in search results, Every one of the 91 existing links is preserved"
  },
  {
    badge: "New",
    date: "2026-11-13",
    title: "Observability completes the AI Gateway configuration set, all thirteen chapters",
    href: "guides/ai-gateway/configuration/observability.html",
    tags: "Chapter 13 of the configuration set and the last one, Metadata cannot be backfilled so any breakdown you did not instrument for is gone for all past traffic, Metadata values must be strings of 128 characters or fewer, The _user key is auto-populated from OpenAI's user field and an explicit _user wins, The Logs Status column is where chapter 12's cache retry fallback and loadbalance states get verified per request, Replay is unavailable for non-chat endpoints archived providers and prompt templates inside a config target, x-portkey-debug false is DO NOT TRACK and disables caching as a side effect, Saved filters are org-wide and any member can edit or delete them, The Analytics Users tab tracks your application's end users not your own staff, Feedback takes an integer from -10 to 10 with an optional weight, OpenTelemetry ingest needs a Server key and fails silently with the wrong type, Pricing data is cached 24 hours so reconcile against provider billing for chargeback"
  },
  {
    badge: "New",
    date: "2026-11-13",
    title: "Routing and reliability, and the configs that quietly fall through to default",
    href: "guides/ai-gateway/configuration/routing-reliability.html",
    tags: "Chapter 12 of the configuration set, Everything is one config object with three mutually exclusive strategy modes, A request-level config replaces the client default rather than merging with it, on_status_codes replaces the default retry codes instead of adding to them, Cumulative retry wait is capped at 60 seconds so retries stop helping when a provider is most congested, Retries are one log entry not several so read x-portkey-retry-attempt-count, Canary testing is load balancing with a small weight and not a separate feature, Conditional routing only supports two-segment keys and a nested key never matches silently, An invalid regex evaluates to false rather than erroring, Circuit breakers skip conditional strategies entirely, When every target is open the circuit breaker is bypassed, Semantic cache ignores the system prompt so two use cases can merge, x-portkey-debug false disables caching altogether, Retries multiply against fallback targets"
  },
  {
    badge: "New",
    date: "2026-11-13",
    title: "The agent gateway, and the skill controls that do not exist yet",
    href: "guides/ai-gateway/configuration/agent-gateway.html",
    tags: "Chapter 11 of the configuration set, The agent catalog and the Agent Registry are one surface under two names, Agents are reached at /agent/{slug} not the MCP /m/{slug}/mcp path, The Agent Gateway toggle and the agents.invoke scope are two separate switches and both are needed, Fetching the agent card is the validation step so never save past a failed fetch, Backend 1.16.1 applies SSRF protection rejecting private IPs metadata hosts and URL fragments, An agent on a private network cannot be registered and needs a public endpoint instead, Skill control is organization-wide so two teams needing different skills means registering the agent twice, Per-user access and per-workspace skill control are announced but not shipped, Chapter 10's three access levels have no equivalent here yet"
  },
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
