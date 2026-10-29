/* airs-readiness-model.js — GENERATED. Do not edit by hand.
 *
 * Written by docs/shared/scripts/build-readiness-model.js from the four
 * customer readiness pages, which are the source. Edit a readiness page, then
 * re-run the script; hooks/pre-commit runs it with --check and blocks drift.
 *
 * Consumed by docs/shared/js/readiness-download.js, which turns a pillar into
 * the workbook a customer fills in before the session.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AIRSReadiness = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var READINESS =
  {
    "red-teaming": {
      "id": "red-teaming",
      "name": "AI Red Teaming",
      "slug": "ai-red-teaming",
      "title": "Customer Readiness — AI Red Teaming",
      "subtitle": "What your application teams need ready before the first AI Red Teaming working session",
      "people": [
        {
          "role": "Application or product owner for the AI system under test",
          "must": "Describe what the application is for, who uses it, what it must never say, and which competitors matter. Approve that adversarial prompts will be sent at it.",
          "stalls": "The target background fields are mandatory for Application and Agent targets. Attacks generated without them are generic rather than aimed at your business."
        },
        {
          "role": "Developer or API owner for the target endpoint",
          "must": "Supply the endpoint URL, supply or create a credential, state the rate limit, and confirm whether the endpoint is reachable from the internet. Must have permission to share or create credentials in the session.",
          "stalls": "No target can be created at all. This is the role most often missing, and the session cannot proceed past it."
        },
        {
          "role": "Network or firewall engineer only if the target is private",
          "must": "Either add one inbound rule for a published source IP, or confirm a Kubernetes cluster is available with outbound access to three hostnames.",
          "stalls": "A private target cannot be validated. Note that a firewall change usually needs a ticket raised days in advance, so this is a pre-session task rather than a session one."
        },
        {
          "role": "Security or AI governance owner",
          "must": "Confirm which frameworks the results must map to, and who receives the report. Agree the scanning window.",
          "stalls": "Scan categories get chosen by default rather than by requirement, and the report lands with no agreed owner."
        },
        {
          "role": "Entra ID administrator only for Microsoft Copilot Studio targets",
          "must": "Complete an interactive login during the session. The app registration must be in the same tenant as the agent.",
          "stalls": "Copilot Studio targets authenticate through a delegated flow that cannot be automated or done in advance. Cross-tenant configurations are not supported at all."
        }
      ],
      "items": [
        {
          "group": "2.1 — What the target is",
          "item": "A name for the target",
          "detail": "Something recognizable later, such as customer-support-chatbot rather than test1."
        },
        {
          "group": "2.1 — What the target is",
          "item": "Whether it is an application, an agent, or a raw model",
          "detail": "This is the first choice in the wizard and it cannot be corrected by editing a field afterwards. An agent is anything that chooses its own tools and sequences its own actions."
        },
        {
          "group": "2.1 — What the target is",
          "item": "Industry, use case, and named competitors",
          "detail": "Mandatory for applications and agents. They are what make generated attacks specific to your business rather than generic."
        },
        {
          "group": "2.1 — What the target is",
          "item": "The base model behind it, and the architecture",
          "detail": "For example GPT-4o behind a retrieval-augmented application. Shapes which attack techniques are worth running."
        },
        {
          "group": "2.1 — What the target is",
          "item": "Languages the system supports",
          "detail": "A system that answers in five languages has five times the surface, and attacks can be generated in each."
        },
        {
          "group": "2.1 — What the target is",
          "item": "Any tools or functions the agent can call",
          "detail": "For an agent, the tool surface is the attack surface. Automated profiling discovers some of this, but anything you supply by hand takes precedence."
        },
        {
          "group": "2.2 — How the target is reached",
          "item": "The endpoint URL",
          "detail": "Must be HTTPS. Plain HTTP endpoints are not accepted."
        },
        {
          "group": "2.2 — How the target is reached",
          "item": "Whether it answers from the internet, or only from inside your network",
          "detail": "This decides whether a Network Channel or a firewall change is needed, and both have a lead time. See section 3."
        },
        {
          "group": "2.2 — How the target is reached",
          "item": "How it authenticates",
          "detail": "An API key in a header, basic authentication, or OAuth 2.0. Have the actual credential, or someone who can mint one during the session."
        },
        {
          "group": "2.2 — How the target is reached",
          "item": "Its protocol",
          "detail": "Plain HTTPS with JSON covers most cases. Server-sent events, WebSocket, gRPC and SDK-only agents each change the plan, and the last two need code written. Flag these now."
        },
        {
          "group": "2.2 — How the target is reached",
          "item": "The rate limit, in requests per minute",
          "detail": "A scan is throttled to roughly 80 percent of this. Guessing it wrong is the most common cause of a failed run."
        },
        {
          "group": "2.2 — How the target is reached",
          "item": "Whether the conversation is stateful",
          "detail": "Does the endpoint return a session identifier you send back, or must the whole conversation history be replayed in every request? Multi-turn attacks need this answered correctly."
        },
        {
          "group": "2.3 — A captured request and response",
          "item": "A captured request and response",
          "detail": "This is the item teams most often arrive without, and the one that takes longest to produce on the day. Capture it in advance, from a real interaction."
        },
        {
          "group": "2.4 — How the target behaves when it refuses",
          "item": "The HTTP status code and body returned when a built-in guardrail blocks a prompt",
          "detail": "Send one obviously harmful prompt by hand and record what comes back. Without this, every refusal your guardrails correctly produce is filed as a scan error rather than as a defense that held, and the report understates how well the system performed."
        },
        {
          "group": "2.4 — How the target behaves when it refuses",
          "item": "The HTTP status code and body returned when the endpoint throttles",
          "detail": "Usually 429, but not always. Supplied, throttling is recognized and the scan backs off. Not supplied, the scan fails."
        }
      ],
      "lead": [
        {
          "task": "Decide how a private target will be reached",
          "time": "1 to 5 business days",
          "detail": "Either a firewall change permitting one published source IP inbound, or a Kubernetes cluster for the outbound tunnel. The firewall route needs a change ticket; the cluster route needs a cluster. Pick one now."
        },
        {
          "task": "Open three hostnames outbound from the cluster tunnel route only",
          "time": "1 to 5 business days",
          "detail": "api.sase.paloaltonetworks.com, auth.apps.paloaltonetworks.com and registry.ai-red-teaming.paloaltonetworks.com, all on TCP 443. Test each with curl from inside the cluster before the session. They cannot be opened on the day."
        },
        {
          "task": "Provide a Kubernetes cluster tunnel route only",
          "time": "Varies",
          "detail": "Any distribution works, including a small one on a single VM. It needs network access to the target and capacity for one very small pod. Confirm kubectl and Helm 3 are installed and pointed at the right cluster."
        },
        {
          "task": "Create or identify a test credential for the target",
          "time": "Varies",
          "detail": "A dedicated credential is better than a shared production one, because it can be revoked the day scanning ends. Whoever creates it must be available in the session if it needs replacing."
        },
        {
          "task": "Check whether the credential outlives the scan",
          "time": "1 to 5 business days",
          "detail": "A full attack library run takes about five hours. A token that expires in one hour will expire four times inside it, and nothing renews it automatically. If your identity provider issues short-lived tokens, ask now for a service account with a long-lived one."
        },
        {
          "task": "Flag any non-HTTP target",
          "time": "One development sprint",
          "detail": "A WebSocket agent needing multi-turn, an SDK-only agent, a gRPC or SOAP agent, an AWS Bedrock Agent or an Azure AI Foundry agent all need code written by your team before they can be scanned. Raising this at the session rather than before it moves the engagement by weeks."
        },
        {
          "task": "Agree a scanning window",
          "time": "Varies",
          "detail": "Adversarial prompts will arrive at the endpoint steadily for several hours. Tell whoever watches your alerting, and decide whether to scan production or a production-shaped copy."
        }
      ],
      "checklist": [
        {
          "group": "People confirmed",
          "item": "Application or product owner is attending"
        },
        {
          "group": "People confirmed",
          "item": "Developer or API owner is attending, with permission to share or create credentials"
        },
        {
          "group": "People confirmed",
          "item": "Network engineer attending or their work already completed, if any target is private"
        },
        {
          "group": "People confirmed",
          "item": "Security or governance owner has agreed the scanning window and the report recipient"
        },
        {
          "group": "People confirmed",
          "item": "Entra ID administrator is attending, if any target is in Copilot Studio"
        },
        {
          "group": "Per target: what it is",
          "item": "Target name agreed"
        },
        {
          "group": "Per target: what it is",
          "item": "Classified as an application, an agent, or a raw model"
        },
        {
          "group": "Per target: what it is",
          "item": "Industry, use case and named competitors written down"
        },
        {
          "group": "Per target: what it is",
          "item": "Base model and architecture recorded"
        },
        {
          "group": "Per target: what it is",
          "item": "Supported languages listed"
        },
        {
          "group": "Per target: what it is",
          "item": "Tools or functions the agent can call listed"
        },
        {
          "group": "Per target: what it is",
          "item": "System prompt supplied, or a decision taken not to supply it"
        },
        {
          "group": "Per target: how it is reached",
          "item": "HTTPS endpoint URL recorded"
        },
        {
          "group": "Per target: how it is reached",
          "item": "Public or private confirmed, and the route for private decided"
        },
        {
          "group": "Per target: how it is reached",
          "item": "Authentication method and a working credential in hand"
        },
        {
          "group": "Per target: how it is reached",
          "item": "Protocol confirmed, and anything other than HTTPS with JSON flagged"
        },
        {
          "group": "Per target: how it is reached",
          "item": "Rate limit in requests per minute recorded"
        },
        {
          "group": "Per target: how it is reached",
          "item": "Stateful or stateless conversation handling confirmed"
        },
        {
          "group": "Per target: captured data",
          "item": "Complete request body JSON captured from DevTools"
        },
        {
          "group": "Per target: captured data",
          "item": "Complete response body JSON captured, not a streamed fragment"
        },
        {
          "group": "Per target: captured data",
          "item": "The field holding the reply text identified"
        },
        {
          "group": "Per target: captured data",
          "item": "Guardrail refusal status code and body captured"
        },
        {
          "group": "Per target: captured data",
          "item": "Rate limit error status code and body captured"
        },
        {
          "group": "Lead-time items started",
          "item": "Firewall change raised, or Kubernetes cluster identified"
        },
        {
          "group": "Lead-time items started",
          "item": "Three outbound hostnames tested from inside the cluster"
        },
        {
          "group": "Lead-time items started",
          "item": "Credential confirmed to outlive a five-hour scan"
        },
        {
          "group": "Lead-time items started",
          "item": "Any target needing custom code identified and resourced"
        },
        {
          "group": "Lead-time items started",
          "item": "Scanning window agreed and alerting owners told"
        }
      ]
    },
    "ai-gateway": {
      "id": "ai-gateway",
      "name": "AI Gateway",
      "slug": "ai-gateway",
      "title": "Customer Readiness — AI Gateway",
      "subtitle": "What your application teams need ready before the first AI Gateway working session",
      "people": [
        {
          "role": "Owner of each application being routed",
          "must": "Change three configuration values in their application and deploy it: the base URL, the credential, and the model reference. Know their release process and whether a change window is needed.",
          "stalls": "No application moves to the gateway. The gateway can be stood up and configured, and still carry zero traffic."
        },
        {
          "role": "Holder of the provider credentials often a central AI platform team",
          "must": "Supply the working provider credential for each model vendor in scope, and later revoke the direct keys that applications currently hold.",
          "stalls": "Integrations cannot be configured, so there is nothing for an application to point at."
        },
        {
          "role": "Platform or Kubernetes engineer hybrid deployment only",
          "must": "Install a Helm chart, or run a container on ECS or Container Apps, and expose it to the applications that will call it.",
          "stalls": "There is no data plane for hybrid, and the engagement defaults to the hosted endpoint whether or not that was the intent."
        },
        {
          "role": "Network or egress owner hybrid deployment only",
          "must": "Confirm the gateway's outbound destinations are permitted, and that TLS inspection is not breaking them.",
          "stalls": "The gateway registers and reports healthy while every inference request fails. This failure looks like a product fault and is not one."
        },
        {
          "role": "Security or data residency owner",
          "must": "Decide hosted or self-hosted, having understood where prompt content travels in each case.",
          "stalls": "A deployment model gets chosen for convenience and then has to be unpicked once someone asks the residency question."
        },
        {
          "role": "FinOps or budget owner optional, but useful",
          "must": "Say how spend should be attributed: per team, per application, per environment. Set budget ceilings.",
          "stalls": "Cost attribution collapses into one bucket, which is usually the reason the gateway was bought."
        }
      ],
      "items": [
        {
          "group": "General",
          "item": "Application name and owning team",
          "detail": "Becomes the unit of cost attribution and the scope of its gateway key."
        },
        {
          "group": "General",
          "item": "Which provider and model it calls today",
          "detail": "Determines which integrations have to exist before that application can be converted."
        },
        {
          "group": "General",
          "item": "Where its provider key lives today",
          "detail": "An environment variable, a secret manager, or hard-coded. This is what gets revoked at cutover, and you cannot revoke what you cannot find."
        },
        {
          "group": "General",
          "item": "Which SDK or client it uses",
          "detail": "Most clients take a base URL and a key. Some, such as Claude Code, send a bare model name and need one extra header to work at all."
        },
        {
          "group": "General",
          "item": "Whether it streams responses",
          "detail": "Streaming changes where a guardrail can stop a response and where it cannot."
        },
        {
          "group": "General",
          "item": "Environment and criticality",
          "detail": "Pick a low-risk application to convert first. Converting the busiest production service first is a bad first day."
        },
        {
          "group": "General",
          "item": "Release process and lead time",
          "detail": "Three configuration values is a small change, but a small change in a regulated release process can still take two weeks."
        },
        {
          "group": "2.1 — Provider credentials to have in hand",
          "item": "OpenAI",
          "detail": "An API key, and the Organization ID if your account uses one."
        },
        {
          "group": "2.1 — Provider credentials to have in hand",
          "item": "Anthropic",
          "detail": "An API key."
        },
        {
          "group": "2.1 — Provider credentials to have in hand",
          "item": "Amazon Bedrock",
          "detail": "Credentials for an identity scoped to model invocation only, plus the region, plus confirmation that the models you want are enabled in that region."
        },
        {
          "group": "2.1 — Provider credentials to have in hand",
          "item": "Azure AI Foundry",
          "detail": "The resource endpoint, the deployment names, the API version, and whichever credential your resource is configured for."
        },
        {
          "group": "2.1 — Provider credentials to have in hand",
          "item": "Anything self-hosted",
          "detail": "The endpoint, the credential, and which API dialect it speaks."
        },
        {
          "group": "2.2 — The deployment model decision",
          "item": "Hosted",
          "detail": "Nothing. Applications call a Palo Alto Networks endpoint directly.  |  Prompts transit a Palo Alto Networks hosted endpoint on their way to the provider."
        },
        {
          "group": "2.2 — The deployment model decision",
          "item": "Self-hosted",
          "detail": "A gateway in your own Kubernetes cluster, or on ECS or Container Apps. You size it, expose it and operate it.  |  Prompt traffic does not transit a Palo Alto Networks endpoint. Prompt and response bodies are still sent to the Strata Cloud Manager backend for logging, so this is not the same as prompts never leaving your environment."
        }
      ],
      "lead": [
        {
          "task": "Build the application inventory",
          "time": "1 to 3 weeks",
          "detail": "The longest item on the list, and the one that cannot be compressed. Egress logs to known provider hostnames are the fastest way to find callers nobody declared."
        },
        {
          "task": "Open outbound egress for the gateway self-hosted only",
          "time": "1 to 5 business days",
          "detail": "The gateway calls its own control plane, its logging endpoint, each provider you integrate, and the Prisma AIRS scan endpoint when a guardrail is attached. Read the authoritative list off a running gateway rather than from any published list, including ours."
        },
        {
          "task": "Exempt the gateway from TLS inspection self-hosted only",
          "time": "1 to 5 business days",
          "detail": "An inspecting proxy breaks several layers independently, and the symptoms do not point at the proxy. If inspection cannot be lifted, the CA bundle has to be mounted instead. Decide which before the session."
        },
        {
          "task": "Obtain provider credentials",
          "time": "Varies",
          "detail": "Often slower than expected, because the person who holds a production provider key is rarely the person attending the session."
        },
        {
          "task": "Size and provision the data plane self-hosted only",
          "time": "1 to 2 weeks",
          "detail": "A cluster, or an ECS or Container Apps environment, plus however it will be exposed to the applications that call it."
        },
        {
          "task": "Book a change window for the first application",
          "time": "Varies",
          "detail": "Pick a low-risk application. The change itself is three configuration values; the approval around it is the part with the lead time."
        },
        {
          "task": "Decide how bypass will be prevented",
          "time": "Discussion",
          "detail": "Once applications are converted, what stops a new one calling a provider directly? The two levers are egress policy to the provider endpoints, and revoking the direct provider keys. Both need an owner."
        }
      ],
      "checklist": [
        {
          "group": "People confirmed",
          "item": "Owner of the first application to convert is attending"
        },
        {
          "group": "People confirmed",
          "item": "Holder of the provider credentials is attending or has handed them over"
        },
        {
          "group": "People confirmed",
          "item": "Platform engineer attending, if self-hosting"
        },
        {
          "group": "People confirmed",
          "item": "Network or egress owner attending, if self-hosting"
        },
        {
          "group": "People confirmed",
          "item": "Security owner has signed off the deployment model"
        },
        {
          "group": "People confirmed",
          "item": "Budget owner has stated how cost should be attributed"
        },
        {
          "group": "Inventory",
          "item": "Every application that calls a model is listed, including unofficial ones"
        },
        {
          "group": "Inventory",
          "item": "Provider and model recorded for each"
        },
        {
          "group": "Inventory",
          "item": "Location of each application's current provider key recorded"
        },
        {
          "group": "Inventory",
          "item": "SDK or client recorded, and native clients needing an extra header flagged"
        },
        {
          "group": "Inventory",
          "item": "Streaming applications flagged"
        },
        {
          "group": "Inventory",
          "item": "A low-risk first application chosen"
        },
        {
          "group": "Inventory",
          "item": "Release process and lead time known for that first application"
        },
        {
          "group": "Credentials and decisions",
          "item": "A working credential in hand for every provider in scope"
        },
        {
          "group": "Credentials and decisions",
          "item": "Bedrock region confirmed and the required models enabled in it"
        },
        {
          "group": "Credentials and decisions",
          "item": "Azure endpoint, deployment names and API version recorded"
        },
        {
          "group": "Credentials and decisions",
          "item": "Hosted or self-hosted decided and signed off"
        },
        {
          "group": "Credentials and decisions",
          "item": "Residency position understood, including that self-hosting does not keep bodies out of the backend"
        },
        {
          "group": "Lead-time items started",
          "item": "Egress rules raised, if self-hosting"
        },
        {
          "group": "Lead-time items started",
          "item": "TLS inspection exemption raised, or a CA bundle plan agreed"
        },
        {
          "group": "Lead-time items started",
          "item": "Cluster or container environment provisioned, if self-hosting"
        },
        {
          "group": "Lead-time items started",
          "item": "Change window booked for the first application"
        },
        {
          "group": "Lead-time items started",
          "item": "An owner named for preventing bypass after cutover"
        }
      ]
    },
    "api-intercept": {
      "id": "api-intercept",
      "name": "API Intercept",
      "slug": "api-intercept",
      "title": "Customer Readiness — API Intercept",
      "subtitle": "What your application teams need ready before the first API Intercept working session",
      "people": [
        {
          "role": "Application developer",
          "must": "Add an HTTP call to the application at two points, handle three possible verdicts, and run it in a test environment during the session.",
          "stalls": "Nothing is integrated. The profile can be configured and the key issued, and no traffic is ever scanned."
        },
        {
          "role": "Application or product owner",
          "must": "Decide what the application does when a prompt is blocked: refuse, mask, warn, or log and continue. Decide what the user sees.",
          "stalls": "The developer has no specification for the most important branch in the code, and usually implements log-and-continue by default, which detects everything and prevents nothing."
        },
        {
          "role": "Data protection or compliance owner",
          "must": "Say which categories of sensitive data matter, which topics are out of bounds, and what the regulatory position is on content being sent to a scanning service.",
          "stalls": "The security profile is configured on guesswork and then rewritten after the first review."
        },
        {
          "role": "Network or egress owner",
          "must": "Confirm the application's environment can reach the regional scan endpoint on TCP 443.",
          "stalls": "Every scan call times out. In a container platform with a restrictive egress policy this is the most common first-day failure."
        },
        {
          "role": "Performance or SRE owner worth including",
          "must": "Agree the latency budget, and what the application does if the scan service is slow or unreachable.",
          "stalls": "A synchronous scan is added to the critical path of every request with nobody having decided whether that is acceptable or what the timeout behavior should be."
        }
      ],
      "items": [
        {
          "group": "2.1 — The application inventory",
          "item": "Application name and owning team",
          "detail": "Each application gets its own API key, and the name appears on every scan record in the logs."
        },
        {
          "group": "2.1 — The application inventory",
          "item": "Language and framework",
          "detail": "Decides whether the integration uses the Python SDK or a plain HTTP call."
        },
        {
          "group": "2.1 — The application inventory",
          "item": "Which model it calls",
          "detail": "Sent as metadata on every scan, so results can be filtered by model later."
        },
        {
          "group": "2.1 — The application inventory",
          "item": "Where in the code the scan calls will go",
          "detail": "Typically immediately before the model call, and immediately after the response returns. Identify the exact functions now."
        },
        {
          "group": "2.1 — The application inventory",
          "item": "Whether it streams responses to the user",
          "detail": "A streamed response reaches the user progressively, which changes when a response scan can usefully intervene."
        },
        {
          "group": "2.1 — The application inventory",
          "item": "Peak requests per minute",
          "detail": "Feeds both the latency conversation and the transaction allowance."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "Prompt injection",
          "detail": "Block or allow-and-log. Most teams block."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "Data loss prevention",
          "detail": "Which categories matter: personal data, credentials, financial records, your own internal identifiers. Whether detected data should be masked rather than blocked."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "Toxic content",
          "detail": "Whether this applies to prompts, responses, or both."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "Malicious code",
          "detail": "Relevant where the application handles code. A developer assistant and a banking chatbot want different answers."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "URL categorization",
          "detail": "Whether links in prompts or responses should be evaluated, and which categories are unacceptable."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "Topic guardrails",
          "detail": "The explicit lists of permitted and forbidden subjects. This needs writing by the business, not by the developer."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "Database security",
          "detail": "Relevant where a response could contain a query. Flags possible data exfiltration."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "Agent threats",
          "detail": "Relevant for agents that call tools. Covers tool misuse and memory manipulation."
        },
        {
          "group": "2.2 — Decisions the security profile needs",
          "item": "Contextual grounding",
          "detail": "Whether responses must be grounded in supplied context, which is how fabricated answers are caught."
        },
        {
          "group": "2.3 — Integration shape",
          "item": "Synchronous or asynchronous",
          "detail": "Synchronous returns a verdict immediately and suits anything where a user is waiting; it caps at 2 MB per call. Asynchronous returns an identifier to poll, accepts 5 MB and up to 25 requests in a batch, and suits background or bulk processing."
        },
        {
          "group": "2.3 — Integration shape",
          "item": "What a block verdict does",
          "detail": "Refuse and show a message, substitute a safe response, mask the detected content, or log and continue. Write the user-facing message now."
        },
        {
          "group": "2.3 — Integration shape",
          "item": "What a scan failure does",
          "detail": "If the scan service is unreachable or slow, does the application fail open or fail closed? This is a security decision with an availability cost and belongs to the product owner, not the developer."
        },
        {
          "group": "2.3 — Integration shape",
          "item": "Your latency budget",
          "detail": "A synchronous scan on both the prompt and the response adds two network round trips to every interaction. Know what the application's current latency is and how much headroom exists."
        },
        {
          "group": "2.3 — Integration shape",
          "item": "Metadata to send",
          "detail": "An application name and model name travel with each scan and are what make the logs filterable later. Agree a naming convention before several teams invent their own."
        },
        {
          "group": "2.4 — Test content",
          "item": "Several ordinary prompts that must pass cleanly. False positives on these are the fastest way to lose a team's confidence.",
          "detail": ""
        },
        {
          "group": "2.4 — Test content",
          "item": "One prompt that should trip each detection you intend to enable, drawn from your own domain where possible.",
          "detail": ""
        },
        {
          "group": "2.4 — Test content",
          "item": "A sample containing the kind of sensitive data you actually hold, so the data loss policy is tested against your formats rather than generic ones.",
          "detail": ""
        },
        {
          "group": "2.4 — Test content",
          "item": "A test environment the developer can deploy to during the session.",
          "detail": ""
        }
      ],
      "lead": [
        {
          "task": "Choose your region, and stay in it",
          "time": "Decision",
          "detail": "The scan service runs in several regions and API keys are locked to the region they were created in. A key made in one region will not authenticate against another region's endpoint. Decide the region first, on data residency grounds, because correcting it later means reissuing every key."
        },
        {
          "task": "Open outbound HTTPS to the regional scan endpoint",
          "time": "1 to 5 business days",
          "detail": "TCP 443 from wherever your applications run, which is often several environments. Also allow the management hostname if keys and profiles will be managed through the API, and certificate validation endpoints on TCP 80."
        },
        {
          "task": "Confirm TLS inspection will not break the call",
          "time": "1 to 5 business days",
          "detail": "An intercepting proxy presents its own certificate. Either exempt the scan endpoint or make sure your runtime trusts the proxy's CA."
        },
        {
          "task": "Allocate developer time",
          "time": "Varies",
          "detail": "Per application, not per engagement. A simple integration is small; agreeing behavior on a block verdict usually takes longer than writing it."
        },
        {
          "task": "Write the topic guardrail lists",
          "time": "1 to 2 weeks",
          "detail": "Permitted and forbidden subjects have to come from the business. This reliably takes longer than anyone expects and blocks nothing else, so start it early."
        },
        {
          "task": "Agree the fail-open or fail-closed position",
          "time": "Discussion",
          "detail": "Needs the product owner and the security owner in the same conversation. Worth settling before the session rather than during it."
        }
      ],
      "checklist": [
        {
          "group": "People confirmed",
          "item": "An application developer is attending, able to write and deploy code"
        },
        {
          "group": "People confirmed",
          "item": "Product owner is attending and has decided the block behavior"
        },
        {
          "group": "People confirmed",
          "item": "Data protection or compliance owner has supplied the detection requirements"
        },
        {
          "group": "People confirmed",
          "item": "Network owner has confirmed egress"
        },
        {
          "group": "People confirmed",
          "item": "Latency budget and failure behavior agreed with whoever owns availability"
        },
        {
          "group": "Inventory and decisions",
          "item": "Applications listed, with language, framework and model"
        },
        {
          "group": "Inventory and decisions",
          "item": "The two integration points identified in the code"
        },
        {
          "group": "Inventory and decisions",
          "item": "Streaming applications flagged"
        },
        {
          "group": "Inventory and decisions",
          "item": "Peak requests per minute recorded"
        },
        {
          "group": "Inventory and decisions",
          "item": "A position taken on each detection service"
        },
        {
          "group": "Inventory and decisions",
          "item": "Topic guardrail lists written"
        },
        {
          "group": "Inventory and decisions",
          "item": "Synchronous or asynchronous chosen"
        },
        {
          "group": "Inventory and decisions",
          "item": "Block behavior and user-facing message written"
        },
        {
          "group": "Inventory and decisions",
          "item": "Fail-open or fail-closed decided"
        },
        {
          "group": "Inventory and decisions",
          "item": "Metadata naming convention agreed"
        },
        {
          "group": "Environment",
          "item": "Region chosen on residency grounds"
        },
        {
          "group": "Environment",
          "item": "Outbound HTTPS to the regional scan endpoint confirmed from the application environment"
        },
        {
          "group": "Environment",
          "item": "TLS inspection exempted, or the proxy CA trusted by the runtime"
        },
        {
          "group": "Environment",
          "item": "A test environment available for the session"
        },
        {
          "group": "Test content",
          "item": "Ordinary prompts that must pass"
        },
        {
          "group": "Test content",
          "item": "One prompt per detection that should trip it"
        },
        {
          "group": "Test content",
          "item": "A sample containing your own sensitive data formats"
        }
      ]
    },
    "model-scanning": {
      "id": "model-scanning",
      "name": "AI Model Scanning",
      "slug": "ai-model-scanning",
      "title": "Customer Readiness — AI Model Scanning",
      "subtitle": "What your ML and platform teams need ready before the first model scanning working session",
      "people": [
        {
          "role": "ML engineer or data scientist",
          "must": "Name the models in use, say where each comes from, and run a scan from their own machine during the session.",
          "stalls": "There is no inventory to scan, and nobody can confirm whether a verdict is a real problem or an expected property of a model the team already trusts."
        },
        {
          "role": "MLOps or platform engineer",
          "must": "Install a Python package on a build runner, hold a service credential, and add a step to a pipeline.",
          "stalls": "Scanning stays a manual activity somebody remembers to do, which is not a control."
        },
        {
          "role": "Owner of the model storage",
          "must": "Grant read access to the buckets, containers or registries the models live in.",
          "stalls": "The agent can authenticate to the scanning service and still not read a single model file."
        },
        {
          "role": "Network or egress owner",
          "must": "Permit outbound access from wherever the agent runs, including to the private package registry it installs from.",
          "stalls": "The install itself fails, before any scanning is attempted. This is the most common first-day blocker."
        },
        {
          "role": "Security or governance owner",
          "must": "Decide which findings block a model from being used, and which are recorded and accepted.",
          "stalls": "Rules are left at defaults and the first scan produces findings nobody has authority to act on."
        }
      ],
      "items": [
        {
          "group": "2.1 — The model inventory",
          "item": "Name and version",
          "detail": "Models are tracked by a fingerprint of their contents rather than by where they are stored, so the same model pulled from two places is recognized as one model."
        },
        {
          "group": "2.1 — The model inventory",
          "item": "Where it comes from",
          "detail": "Public Hugging Face, Amazon S3, Google Cloud Storage, Azure Blob Storage, a local path, Artifactory, or GitLab. This matters more than it sounds: see the note below."
        },
        {
          "group": "2.1 — The model inventory",
          "item": "File format",
          "detail": "Safetensors, ONNX, pickle-based checkpoints, and so on. The format itself is one of the things a rule can accept or reject."
        },
        {
          "group": "2.1 — The model inventory",
          "item": "Approximate size",
          "detail": "Models from object storage are downloaded locally before scanning, so a large model needs disk and time. Hugging Face models are not downloaded by the agent."
        },
        {
          "group": "2.1 — The model inventory",
          "item": "Which application uses it",
          "detail": "So a finding can be traced to something that is actually running."
        },
        {
          "group": "2.1 — The model inventory",
          "item": "Who approved it",
          "detail": "Often nobody, which is usually the finding that lands hardest."
        },
        {
          "group": "2.2 — Where the agent will run",
          "item": "Python",
          "detail": "3.11 minimum, with 3.12 preferred. Confirm what your build images actually carry rather than what the standard says."
        },
        {
          "group": "2.2 — Where the agent will run",
          "item": "CPU and memory",
          "detail": "Two cores and 2 GB will run; four cores and 4 GB is comfortable. Local scans of large models are the memory-hungry case."
        },
        {
          "group": "2.2 — Where the agent will run",
          "item": "Disk",
          "detail": "Enough for the largest model you will scan, with 10 GB or more a sensible floor. Hugging Face scanning needs none, because nothing is downloaded locally."
        },
        {
          "group": "2.2 — Where the agent will run",
          "item": "Operating system",
          "detail": "Ubuntu 20.04 or later, RHEL 8 or later, macOS 11 or later, or Windows 10 and 11 under WSL2."
        },
        {
          "group": "2.2 — Where the agent will run",
          "item": "Ability to install a package",
          "detail": "From a private registry, using an extra index URL. In a locked-down build environment this is frequently the blocker."
        },
        {
          "group": "2.3 — Storage credentials",
          "item": "Amazon S3 — read access to the buckets and prefixes holding models.",
          "detail": ""
        },
        {
          "group": "2.3 — Storage credentials",
          "item": "Google Cloud Storage — a service account with object read access.",
          "detail": ""
        },
        {
          "group": "2.3 — Storage credentials",
          "item": "Azure Blob Storage — a credential with read access to the containers.",
          "detail": ""
        },
        {
          "group": "2.3 — Storage credentials",
          "item": "Artifactory or GitLab — a token that can read the model repositories.",
          "detail": ""
        },
        {
          "group": "2.3 — Storage credentials",
          "item": "Local paths — the files already present on the machine running the agent.",
          "detail": ""
        },
        {
          "group": "2.4 — Where scanning fits the lifecycle",
          "item": "On acquisition",
          "detail": "Scan every model as it is pulled from an external source. Catches the problem earliest, and needs a hook wherever models enter."
        },
        {
          "group": "2.4 — Where scanning fits the lifecycle",
          "item": "On registry promotion",
          "detail": "Scan when a model is promoted to an approved registry. A natural gate if you already have one."
        },
        {
          "group": "2.4 — Where scanning fits the lifecycle",
          "item": "In the build pipeline",
          "detail": "Scan as part of CI. Fits existing habits and existing failure handling."
        },
        {
          "group": "2.4 — Where scanning fits the lifecycle",
          "item": "Before deployment",
          "detail": "The last gate before serving. Latest and most disruptive place to find a problem."
        }
      ],
      "lead": [
        {
          "task": "Confirm the agent can install from a private package registry",
          "time": "1 to 2 weeks",
          "detail": "The client is not on public PyPI. It installs from an authenticated private index, and many organizations route all package installs through an internal mirror that will not pass an extra index URL through. Test this early, because it is the blocker that most reliably stops a session before it starts."
        },
        {
          "task": "Open outbound HTTPS from wherever the agent runs",
          "time": "1 to 5 business days",
          "detail": "The management and data endpoints, the authentication endpoint, the private package registry, Hugging Face if you scan it, and whichever cloud storage endpoints your models live behind."
        },
        {
          "task": "Request a service account with a client identifier and secret",
          "time": "1 to 5 business days",
          "detail": "The agent authenticates as a service account rather than as a person, so scans can run unattended in a pipeline."
        },
        {
          "task": "Grant storage read access",
          "time": "1 to 5 business days",
          "detail": "Usually a separate team from the one attending, and usually the item that arrives last."
        },
        {
          "task": "Provision disk on the scanning host",
          "time": "Varies",
          "detail": "Only matters for object storage and local scans, and only becomes obvious when a multi-gigabyte model fills a build runner."
        },
        {
          "task": "Write the approved format and license lists",
          "time": "1 to 2 weeks",
          "detail": "Which model formats are acceptable, and which licenses your legal team permits. Both come from outside the ML team and neither can be invented on the day."
        },
        {
          "task": "Pick a known-bad model to test with",
          "time": "Minutes",
          "detail": "A model with a published deserialization vulnerability proves the pipeline actually catches something. Scan it only. Never load or execute it."
        }
      ],
      "checklist": [
        {
          "group": "People confirmed",
          "item": "ML engineer or data scientist is attending"
        },
        {
          "group": "People confirmed",
          "item": "MLOps or platform engineer is attending"
        },
        {
          "group": "People confirmed",
          "item": "Storage owner has granted access, or is attending to grant it"
        },
        {
          "group": "People confirmed",
          "item": "Network owner has confirmed egress"
        },
        {
          "group": "People confirmed",
          "item": "Security owner has decided what blocks and what is merely recorded"
        },
        {
          "group": "Inventory",
          "item": "Every model listed, with name and version"
        },
        {
          "group": "Inventory",
          "item": "Source type recorded for each, and the distinct source types counted"
        },
        {
          "group": "Inventory",
          "item": "File formats recorded"
        },
        {
          "group": "Inventory",
          "item": "Approximate sizes recorded"
        },
        {
          "group": "Inventory",
          "item": "Private Hugging Face models identified and the local route planned"
        },
        {
          "group": "Inventory",
          "item": "Consuming application noted for each model"
        },
        {
          "group": "Environment",
          "item": "Scanning host chosen, and its Python version confirmed as 3.11 or later"
        },
        {
          "group": "Environment",
          "item": "CPU, memory and disk confirmed against the largest model in scope"
        },
        {
          "group": "Environment",
          "item": "Install from the private package index proven to work"
        },
        {
          "group": "Environment",
          "item": "Outbound endpoints opened and tested from the scanning host"
        },
        {
          "group": "Environment",
          "item": "Service account with client identifier and secret in hand"
        },
        {
          "group": "Environment",
          "item": "Storage read credentials in hand, one per platform"
        },
        {
          "group": "Policy",
          "item": "Lifecycle gate chosen"
        },
        {
          "group": "Policy",
          "item": "Blocking and recording decided per rule"
        },
        {
          "group": "Policy",
          "item": "Approved file format list written"
        },
        {
          "group": "Policy",
          "item": "Acceptable license list written"
        },
        {
          "group": "Policy",
          "item": "A known-bad test model identified"
        }
      ]
    }
  };

  /* Columns the workbook adds and the page does not have: everywhere a
   * customer writes something back. Headers only, one blank cell per row. */
  function sheetsFor(id) {
    var d = READINESS[id];
    if (!d) return null;

    var intro = [
      ['Field', 'Value'],
      ['Pillar', d.name],
      ['Document', d.title],
      ['Purpose', d.subtitle],
      ['Customer', ''],
      ['Engagement date', ''],
      ['Completed by', ''],
      ['', ''],
      ['How to use this workbook', 'One sheet per section of the readiness document.'],
      ['', 'People: name the person for each role and confirm they are attending.'],
      ['', 'Readiness items: write your answer beside each item.'],
      ['', 'Lead time: these take days. Assign an owner and record the date raised.'],
      ['', 'Checklist: work through it last. Anything unticked is worth raising before the session.'],
      ['', ''],
      ['Source', 'Generated from the published readiness document. If the two disagree, the published page is current.']
    ];

    var people = [['Role', 'What they must be able to do', 'What stalls without them', 'Name', 'Email', 'Attending?']]
      .concat(d.people.map(function (r) { return [r.role, r.must, r.stalls, '', '', '']; }));

    var items = [['Section', 'Have ready', 'Why it is needed', 'Your answer', 'Owner', 'Status']]
      .concat(d.items.map(function (r) { return [r.group, r.item, r.detail, '', '', '']; }));

    var lead = [['Task', 'Typical lead time', 'Detail', 'Owner', 'Date raised', 'Status']]
      .concat(d.lead.map(function (r) { return [r.task, r.time, r.detail, '', '', '']; }));

    var check = [['Group', 'Item', 'Done', 'Owner', 'Notes']]
      .concat(d.checklist.map(function (r) { return [r.group, r.item, '', '', '']; }));

    return [
      { name: 'Start here', cols: [26, 96], rows: intro },
      { name: 'People', cols: [30, 46, 46, 22, 26, 12], rows: people },
      { name: 'Readiness items', cols: [28, 44, 60, 34, 18, 14], rows: items },
      { name: 'Lead time', cols: [34, 18, 62, 18, 14, 14], rows: lead },
      { name: 'Checklist', cols: [26, 70, 8, 18, 34], rows: check }
    ];
  }

  function fileName(id) {
    var d = READINESS[id];
    return d ? 'customer-readiness-' + d.slug + '.xlsx' : 'customer-readiness.xlsx';
  }

  function counts(id) {
    var d = READINESS[id];
    if (!d) return null;
    return { people: d.people.length, items: d.items.length,
             lead: d.lead.length, checklist: d.checklist.length };
  }

  return { READINESS: READINESS, sheetsFor: sheetsFor, fileName: fileName, counts: counts };
}));
