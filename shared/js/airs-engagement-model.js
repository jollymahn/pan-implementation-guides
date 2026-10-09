/* airs-engagement-model.js — the shared AIRS engagement data model.
 *
 * One source of truth for what an AIRS engagement contains: the pillars and
 * their phases, the personas, the scope multipliers, the engagement lifecycle,
 * and the success criteria and validation tests that prove each component
 * works.
 *
 * Consumed by:
 *   docs/guides/airs-planner/index.html   scoping and effort estimation
 *   docs/guides/airs-pov/index.html       POV document and deck generation
 *
 * The PILLARS, LIFECYCLE_BANDS, LIFECYCLE and LIFECYCLE_PITFALLS blocks were
 * lifted verbatim from the planner when this module was created, so the
 * planner's behaviour is unchanged. The COMPONENTS universe and the SC/VT
 * register below are new, and exist for the POV generator.
 *
 * Specification: workspace/POV-Generator/POV-SPEC.md
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AIRSModel = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

const PILLARS = {
  'network-intercept': {
    id: 'network-intercept', name: 'Network Intercept', short: 'Network',
    color: '#3b82f6',
    description: 'Inspect AI traffic at the network layer via Cloud NGFW or VM-Series firewalls.',
    trd: '../../trd/network-intercept/trd-network-intercept.html',
    phases: [
      { num: 1, title: 'Pre-Engagement & License Activation', duration: '1 day',
        objectives: 'Align stakeholders, activate AIRS license, provision TSG and credit pool.',
        tasks: ['Confirm flex credit allocation and pillar scope', 'Activate AIRS license via CSP authcode', 'Provision or confirm TSG ID and region', 'Schedule discovery sessions with required stakeholders', 'Distribute prerequisites checklist to customer teams'],
        stakeholders: ['Project Sponsor', 'Cloud Account Admin', 'Security Lead'],
        gate: 'License activated, TSG provisioned, all required stakeholders confirmed' },
      { num: 2, title: 'AI Traffic Discovery & Topology Planning', duration: '3–4 days',
        objectives: 'Inventory AI application traffic flows and design deployment topology.',
        tasks: ['Catalog AI workloads and their cloud accounts/regions', 'Map traffic flows: application to AI API endpoint', 'Select deployment model (Cloud NGFW, VM-Series, or hybrid)', 'Define routing strategy (BGP, ECMP, static) for traffic steering', 'Estimate firewall sizing (throughput, concurrent connections)'],
        stakeholders: ['Network/Infrastructure Engineer', 'Application/Service Owner', 'Cloud Account Admin'],
        gate: 'Topology design approved, deployment model selected, sizing estimates confirmed' },
      { num: 3, title: 'Cloud Account Onboarding & NGFW Deployment', duration: '4–5 days',
        objectives: 'Onboard cloud accounts and deploy Cloud NGFW or VM-Series firewalls.',
        tasks: ['Onboard AWS/Azure cloud account(s) to AIRS tenant', 'Configure IAM roles and trust relationships', 'Deploy Cloud NGFW or VM-Series in target VPC/VNET', 'Configure routing tables to steer AI traffic through firewall', 'Validate traffic is passing through the inspection point'],
        stakeholders: ['Network/Infrastructure Engineer', 'Cloud Account Admin'],
        gate: 'Firewall deployed, AI traffic confirmed flowing through inspection point' },
      { num: 4, title: 'AI Security Profile & Pilot Detection', duration: '4 days',
        objectives: 'Configure AI security profiles and validate detection on pilot traffic.',
        tasks: ['Define AI Security Profile (detection categories, threat sensitivity)', 'Configure security policy to apply profile to AI traffic flows', 'Enable AI App-ID and model identification', 'Run pilot detection on selected applications', 'Review initial alerts and tune false positive thresholds'],
        stakeholders: ['Security Lead', 'Application/Service Owner'],
        gate: 'Pilot detection active, false positive rate acceptable, security policy approved' },
      { num: 5, title: 'Full Deployment, Monitoring & Handover', duration: '2–3 days',
        objectives: 'Expand to all AI traffic, configure observability, complete knowledge transfer.',
        tasks: ['Expand security profile to all AI traffic flows', 'Configure Strata Logging Service dashboards and alerting', 'Set up SIEM/SOC integration', 'Document runbooks: scaling, policy tuning, incident response', 'Complete knowledge transfer with operations team'],
        stakeholders: ['Security Lead', 'Network/Infrastructure Engineer', 'Security Operations Team'],
        gate: 'All AI traffic inspected, alerting active, runbooks delivered, team signed off' }
    ],
    prerequisites: [
      { cat: 'Licensing & Credits', text: 'AIRS flex credits allocated for Network Intercept (authcode from CSP)', req: true },
      { cat: 'Licensing & Credits', text: 'Credit pool name/ID and total credit count confirmed', req: true },
      { cat: 'Tenant & Access', text: 'TSG ID (existing or create new)', req: true },
      { cat: 'Tenant & Access', text: 'Region selected: Americas, EU, or Singapore', req: true },
      { cat: 'Tenant & Access', text: 'Admin access to AIRS tenant (RBAC roles assigned)', req: true },
      { cat: 'Cloud Account', text: 'AWS Account IDs + regions OR Azure Subscription ID(s)', req: true },
      { cat: 'Cloud Account', text: 'IAM role with trust relationship (AWS) or App Registration with Client ID/Secret (Azure)', req: true },
      { cat: 'Network', text: 'Network topology diagrams (VPCs/VNETs, subnets, route tables)', req: true },
      { cat: 'Network', text: 'Existing routing configuration (BGP neighbors, ECMP details)', req: false },
      { cat: 'AI Inventory', text: 'AI application inventory: app names, cloud accounts, AI API endpoints', req: true },
      { cat: 'AI Inventory', text: 'Estimated AI traffic volume (Mbps or requests/hour per app)', req: false },
      { cat: 'Optional', text: 'Panorama admin access (if Panorama-managed deployment model)', req: false }
    ],
    personas: [
      { role: 'Project Sponsor', req: true, knowledge: 'Business case for AI security, budget authority, project timeline approval', authority: 'Final approval on scope, timeline, and security policy decisions', risk: 'Scope creep; delayed decisions on security policy trade-offs' },
      { role: 'Network / Infrastructure Engineer', req: true, knowledge: 'BGP/routing configuration, VPC/VNET architecture, firewall deployment, ECMP, route tables', authority: 'Approve and implement network topology changes', risk: 'Cannot complete traffic steering design or firewall deployment' },
      { role: 'Security Lead', req: true, knowledge: 'Threat categories to inspect, AI risk tolerance, security policy standards, SIEM/alerting requirements', authority: 'Approve AI security profile policy and detection thresholds', risk: 'Cannot configure inspection policy or sign off on detection sensitivity' },
      { role: 'Cloud Account Admin', req: true, knowledge: 'AWS/Azure account structure, IAM roles, cloud networking, trust relationships', authority: 'Grant permissions for cloud account onboarding and IAM role creation', risk: 'Cannot onboard cloud accounts or deploy firewall resources' },
      { role: 'Application / Service Owner', req: false, knowledge: 'Which AI services each app calls, traffic sensitivity, acceptable latency', authority: 'Approve traffic routing changes that affect their application', risk: 'Risk of policy misalignment with application requirements' },
      { role: 'K8s / Platform Engineer', req: false, knowledge: 'Kubernetes networking, CNI plugin, pod/namespace topology', authority: 'Approve K8s network plugin deployment', risk: 'Blocks K8s protection add-on (optional bolt-on only)' }
    ],
    scopeConfig: [
      { key: 'firewallSets', label: 'Firewall Sets', min: 1, step: 1, base: 1,
        calc: (v) => Math.round(Math.max(0, v - 1) * 3.6 * 10) / 10,
        hint: 'Base 1. Each additional firewall set adds 30% to the project (+3.6 days).' },
      { key: 'cloudProviders', label: 'Cloud Providers (AWS / Azure / GCP)', min: 1, step: 1, base: 1, max: 3,
        calc: (v) => Math.max(0, v - 1) * 14,
        hint: 'Base 1. Each additional cloud provider (AWS, Azure, GCP) adds 14 days.' }
    ]
  },

  'api-intercept': {
    id: 'api-intercept', name: 'API Intercept', short: 'API',
    color: '#8b5cf6',
    description: 'Inspect AI API calls inline via SDK, sidecar, or gateway integration.',
    trd: '../../trd/api-intercept/trd-api-intercept.html',
    phases: [
      { num: 1, title: 'Pre-Engagement & License Activation', duration: '1 day',
        objectives: 'Align stakeholders, activate AIRS license, provision TSG.',
        tasks: ['Confirm flex credit allocation and pillar scope', 'Activate AIRS license via CSP authcode', 'Provision or confirm TSG ID and region', 'Schedule discovery sessions', 'Distribute prerequisites checklist'],
        stakeholders: ['Project Sponsor', 'Cloud Account Admin'],
        gate: 'License activated, TSG provisioned' },
      { num: 2, title: 'AI Application Inventory & Integration Planning', duration: '3–4 days',
        objectives: 'Catalog all AI applications and design the integration approach per application.',
        tasks: ['Enumerate all AI applications (internal, SaaS, shadow AI)', 'Map API call flows: application to LLM provider endpoint', 'Identify integration method per app (SDK, sidecar, gateway inline)', 'Document auth methods (API key, OAuth, JWT) per application', 'Onboard cloud AI accounts (AWS Bedrock, Azure AI Foundry) if applicable'],
        stakeholders: ['API Platform / Gateway Team', 'Application Developer / Owner', 'Cloud Account Admin'],
        gate: 'Full AI application inventory complete, integration method selected per app' },
      { num: 3, title: 'Agent Deployment & Configuration', duration: '4–5 days',
        objectives: 'Deploy API intercept agents for pilot applications.',
        tasks: ['Deploy intercept agents to pilot application environments', 'Configure application-specific API integration parameters', 'Set up MCP tool security configuration (if MCP in scope)', 'Validate agent connectivity to AIRS tenant', 'Confirm traffic is being received and logged'],
        stakeholders: ['API Platform / Gateway Team', 'K8s / DevOps Engineer', 'Application Developer / Owner'],
        gate: 'Agents deployed for pilot apps, traffic flowing to AIRS' },
      { num: 4, title: 'Security Profile & Pilot Detection', duration: '4 days',
        objectives: 'Configure AI security profiles and validate detection on pilot traffic.',
        tasks: ['Configure AI Security Profiles (detection services, DLP, topic guardrails)', 'Map profiles to pilot applications', 'Set blocked request handling behavior (block vs. allow + alert)', 'Review OWASP LLM Top 10 risk applicability', 'Tune detection thresholds based on pilot traffic'],
        stakeholders: ['Security Lead', 'Application Developer / Owner'],
        gate: 'Pilot detection active, false positive rate acceptable, security policy approved' },
      { num: 5, title: 'Full Deployment, Policy Tuning & Handover', duration: '2–3 days',
        objectives: 'Expand to all AI applications, tune policy, complete knowledge transfer.',
        tasks: ['Roll out intercept agents to all in-scope applications', 'Finalize security profiles per application category', 'Configure logging, dashboards, and alerting', 'Integrate with SIEM/SOAR if required', 'Complete knowledge transfer: runbooks, escalation path, false positive handling'],
        stakeholders: ['Security Lead', 'API Platform / Gateway Team', 'Security Operations Team'],
        gate: 'All AI apps inspected, alerting active, runbooks delivered' }
    ],
    prerequisites: [
      { cat: 'Licensing & Credits', text: 'AIRS flex credits allocated for API Intercept', req: true },
      { cat: 'Licensing & Credits', text: 'Credit pool name/ID confirmed', req: true },
      { cat: 'Tenant & Access', text: 'TSG ID (existing or create new)', req: true },
      { cat: 'Tenant & Access', text: 'Region selected: Americas, EU, or Singapore', req: true },
      { cat: 'Tenant & Access', text: 'Admin access to AIRS tenant', req: true },
      { cat: 'AI Application Inventory', text: 'List of all AI applications with LLM provider(s) they call', req: true },
      { cat: 'AI Application Inventory', text: 'Integration method preference: SDK / sidecar / gateway inline (per app)', req: true },
      { cat: 'AI Application Inventory', text: 'Authentication methods per app (API key, OAuth, JWT)', req: true },
      { cat: 'AI Application Inventory', text: 'Estimated request volume (requests/hour) per application', req: false },
      { cat: 'Cloud Account', text: 'AWS Account IDs + regions (if using AWS Bedrock)', req: false },
      { cat: 'Cloud Account', text: 'Azure Tenant ID + Subscription ID (if using Azure OpenAI / AI Foundry)', req: false },
      { cat: 'Infrastructure Access', text: 'DevOps/K8s admin access to deploy intercept agents', req: true },
      { cat: 'Infrastructure Access', text: 'API gateway admin access (if intercepting at gateway layer)', req: false },
      { cat: 'Network', text: 'Proxy/egress configuration (if agents need proxy to reach AIRS)', req: false }
    ],
    personas: [
      { role: 'Project Sponsor', req: true, knowledge: 'Business case for AI security, project scope and timeline', authority: 'Approve scope, budget, and security policy trade-offs', risk: 'Scope creep, delayed policy decisions' },
      { role: 'API Platform / Gateway Team', req: true, knowledge: 'Complete AI application inventory, API gateway configuration, traffic volumes, auth methods, integration patterns (SDK/sidecar/inline)', authority: 'Approve and implement agent deployment and gateway configuration changes', risk: 'Cannot complete application inventory or deploy intercept agents' },
      { role: 'Security Lead', req: true, knowledge: 'OWASP LLM Top 10 risk priorities, DLP requirements, detection sensitivity, compliance obligations', authority: 'Approve security profile configuration and detection thresholds', risk: 'Cannot configure inspection policy or validate detection coverage' },
      { role: 'Application Developer / Owner', req: false, knowledge: 'Application-specific AI usage patterns, acceptable latency impact, auth flow details', authority: 'Approve integration changes to their specific application', risk: 'Risk of misaligned detection policy for specific applications' },
      { role: 'K8s / DevOps Engineer', req: false, knowledge: 'Kubernetes cluster configuration, sidecar injection, DaemonSet deployment, namespace policies', authority: 'Approve and execute K8s deployment changes', risk: 'Blocks sidecar and DaemonSet integration methods' },
      { role: 'Cloud Account Admin', req: false, knowledge: 'Cloud account structure, IAM, managed AI service configuration (Bedrock, Azure AI Foundry)', authority: 'Onboard cloud accounts and configure managed AI service integrations', risk: 'Blocks cloud-managed AI service onboarding (conditional)' }
    ],
    scopeConfig: [
      { key: 'points', label: 'Integration Points', min: 2, step: 1, base: 2,
        calc: (v) => Math.max(0, v - 2) * 0.5,
        hint: 'Base 2. Each additional integration point adds 0.5 day.' },
      { key: 'cases', label: 'AI Use Cases', min: 2, step: 1, base: 2,
        calc: (v) => Math.max(0, v - 2) * 0.5,
        hint: 'Base 2. Each additional use case adds 0.5 day.' }
    ]
  },

  'model-security': {
    id: 'model-security', name: 'Model Security', short: 'Model',
    color: '#10b981',
    description: 'Scan AI/ML models in CI/CD pipelines for vulnerabilities and supply chain risks.',
    trd: '../../trd/model-security/trd-model-security.html',
    phases: [
      { num: 1, title: 'Pre-Engagement & License Activation', duration: '1 day',
        objectives: 'Align stakeholders, activate AIRS license, verify network egress for SDK.',
        tasks: ['Confirm flex credit allocation and pillar scope', 'Activate AIRS license via CSP authcode', 'Provision or confirm TSG ID and region', 'Verify outbound network access to PAN scanning endpoints', 'Distribute prerequisites checklist to AI/ML and DevOps teams'],
        stakeholders: ['Project Sponsor', 'AI / ML Model Owner'],
        gate: 'License activated, TSG provisioned, egress path to PAN endpoints confirmed' },
      { num: 2, title: 'Model Landscape Discovery', duration: '3–4 days',
        objectives: 'Inventory all AI/ML models, pipelines, registries, and compliance requirements.',
        tasks: ['Enumerate models by framework (PyTorch, TensorFlow, GGUF, Safetensors, etc.)', 'Map model pipelines: training to registry to inference endpoint', 'Identify model sources (HuggingFace, internal registry, vendor-supplied)', 'Document compliance requirements (NIST AI RMF, SOC 2, ISO 27001)', 'Identify cross-pipeline shared models and their blast radius'],
        stakeholders: ['AI / ML Model Owner', 'Data / Privacy Lead'],
        gate: 'Model inventory complete, pipeline map approved, compliance scope defined' },
      { num: 3, title: 'CI/CD Integration & Scan Configuration', duration: '4–5 days',
        objectives: 'Integrate AIRS SDK into CI/CD pipelines and configure scan parameters.',
        tasks: ['Deploy AIRS Python SDK to target CI/CD platforms (GitHub Actions, Jenkins, GitLab CI, etc.)', 'Configure model source connections (HuggingFace tokens, registry credentials)', 'Set scan parameters: detection categories, vulnerability severity thresholds', 'Configure proxy/egress if SDK runs behind corporate proxy', 'Run initial scan on pilot model set'],
        stakeholders: ['AI / ML Model Owner', 'CI/CD Pipeline Owner'],
        gate: 'SDK deployed in CI/CD, initial scan completing successfully' },
      { num: 4, title: 'Triage & Gate Strategy', duration: '4 days',
        objectives: 'Triage scan findings and configure pipeline gate blocking behavior.',
        tasks: ['Review initial scan findings by severity category', 'Configure verdict behavior (block pipeline / alert only / quarantine)', 'Set HuggingFace governance rules (approved models, blocked models)', 'Define remediation SLAs per severity tier', 'Configure exception handling process'],
        stakeholders: ['Security Lead', 'AI / ML Model Owner'],
        gate: 'Gate policy approved, remediation SLAs agreed, exception process defined' },
      { num: 5, title: 'Full Deployment, Alerting & Handover', duration: '2–3 days',
        objectives: 'Expand to all pipelines, configure ongoing program, complete knowledge transfer.',
        tasks: ['Roll out SDK integration to all in-scope CI/CD pipelines', 'Configure Strata Logging Service dashboards and alerting', 'Set up ongoing vulnerability reporting cadence', 'Document runbooks: scan failure handling, exception process, emergency override', 'Complete knowledge transfer with AI/ML platform and security teams'],
        stakeholders: ['Security Lead', 'AI / ML Model Owner', 'CI/CD Pipeline Owner'],
        gate: 'All pipelines gated, alerting active, ongoing program cadence agreed' }
    ],
    prerequisites: [
      { cat: 'Licensing & Credits', text: 'AIRS flex credits allocated for Model Security', req: true },
      { cat: 'Licensing & Credits', text: 'Credit pool name/ID confirmed', req: true },
      { cat: 'Tenant & Access', text: 'TSG ID (existing or create new)', req: true },
      { cat: 'Tenant & Access', text: 'Region selected: Americas, EU, or Singapore', req: true },
      { cat: 'Network', text: 'Outbound network access to PAN scanning endpoints (SDK must reach PAN)', req: true },
      { cat: 'Network', text: 'Corporate proxy configuration (hostname, port, auth) if SDK runs behind proxy', req: false },
      { cat: 'Model Inventory', text: 'List of AI/ML models with framework, registry location, and pipeline(s) that use each', req: true },
      { cat: 'Model Inventory', text: 'CI/CD platform(s) in use (GitHub Actions, Jenkins, GitLab CI, Azure DevOps, etc.)', req: true },
      { cat: 'Model Inventory', text: 'Model sources: internal registry URL(s), HuggingFace org/username, vendor suppliers', req: true },
      { cat: 'Model Inventory', text: 'HuggingFace API token (if scanning HuggingFace-hosted models)', req: false },
      { cat: 'Compliance', text: 'Applicable compliance frameworks (NIST AI RMF, SOC 2, OWASP ML, etc.)', req: false },
      { cat: 'Cloud Storage', text: 'Cloud storage access for model artifact locations (S3, Azure Blob, GCS)', req: false }
    ],
    personas: [
      { role: 'Project Sponsor', req: true, knowledge: 'Business case for model security, project scope and timeline', authority: 'Approve scope, budget, and remediation SLA commitments', risk: 'No authority to mandate pipeline gating' },
      { role: 'AI / ML Model Owner', req: true, knowledge: 'ML framework expertise (PyTorch, TensorFlow, etc.), model registry access, pipeline architecture, versioning strategy, inference endpoint configuration', authority: 'Approve scan configuration, model inventory completeness, exception decisions', risk: 'Cannot complete model inventory or configure scanning accurately' },
      { role: 'Security Lead', req: true, knowledge: 'Vulnerability categories to prioritize, risk thresholds, compliance obligations, remediation policy', authority: 'Approve gate policy (block vs. alert) and remediation SLAs', risk: 'Cannot set security policy or sign off on gate behavior' },
      { role: 'CI/CD Pipeline Owner', req: true, knowledge: 'CI/CD platform administration, pipeline modification rights, SDK deployment', authority: 'Approve and implement SDK integration into production pipelines', risk: 'Cannot deploy SDK to pipelines — blocks entire pillar' },
      { role: 'Data / Privacy Lead', req: false, knowledge: 'Data residency requirements, PII handling in models, regulatory constraints', authority: 'Approve data handling approach for model scanning', risk: 'Risk of compliance gap if models process PII or regulated data' }
    ],
    scopeConfig: [
      { key: 'pipelines', label: 'CI/CD Pipelines', min: 4, step: 4, base: 4,
        calc: (v) => Math.max(0, Math.floor((v - 4) / 4)),
        hint: 'Base 4. Each additional group of 4 pipelines adds 1 day.' },
      { key: 'runners', label: 'Runner Environments', min: 2, step: 2, base: 2,
        calc: (v) => Math.max(0, ((v - 2) / 2)) * 0.5,
        hint: 'Base 2. Each additional group of 2 runner environments adds 0.5 day.' }
    ]
  },

  'red-teaming': {
    id: 'red-teaming', name: 'Red Teaming', short: 'Red Team',
    color: '#ef4444',
    description: 'Automated adversarial testing of AI applications for vulnerabilities and safety failures.',
    trd: '../../trd/red-teaming/trd-red-teaming.html',
    phases: [
      { num: 1, title: 'Prerequisites Verification & License Activation', duration: '1 day',
        objectives: 'Gate check — verify ALL prerequisites before any configuration begins. Missing items stop the engagement.',
        tasks: ['Verify AIRS Red Teaming flex credits are allocated and accessible', 'Confirm Strata Logging Service is activated', 'Provision or confirm TSG ID and region', 'Verify IAM/RBAC roles are configured', 'Test target endpoint accessibility from AIRS (not blocked by WAF/firewall)', 'Confirm rate limits (RPM, TPM) are known for each target'],
        stakeholders: ['Project Sponsor', 'AI / ML Technical Lead', 'Network / Proxy Lead'],
        gate: 'ALL prerequisites verified — any missing item stops the engagement until resolved' },
      { num: 2, title: 'Target Scoping & Configuration', duration: '2 days',
        objectives: 'Define scan targets, configure authentication, and set compliance scope.',
        tasks: ['Define target application(s): endpoint URL(s), model type, use case', 'Configure authentication (API key, Bearer token, OAuth)', 'Map compliance requirements to scan categories (OWASP LLM Top 10, NIST AI RMF, MITRE ATLAS)', 'Set multi-turn conversation configuration if applicable', 'Configure REST wrapper if target requires non-standard API format', 'Define risk priority matrix per target'],
        stakeholders: ['AI / ML Technical Lead', 'Security Lead', 'Application Owner'],
        gate: 'All targets configured; test probe confirms AIRS can reach each endpoint' },
      { num: 3, title: 'Initial Scan & Baseline', duration: '4–5 days',
        objectives: 'Run baseline Attack Library scan and establish vulnerability baseline.',
        tasks: ['Execute Attack Library scan on all configured targets (~5 hours per target)', 'Review initial findings by category and severity', 'Identify critical findings requiring immediate remediation', 'Document guardrail detection gaps (attacks that bypassed model guardrails)', 'Compare results against compliance framework requirements'],
        stakeholders: ['AI / ML Technical Lead', 'Security Lead'],
        gate: 'Baseline scan complete, critical findings reviewed, remediation priority agreed' },
      { num: 4, title: 'Full Assessment & Custom Scenarios', duration: '5–6 days',
        objectives: 'Run full assessment suite including custom attack scenarios if in scope.',
        tasks: ['Run additional scan packages (Automated Pen Test, Custom Target scenarios)', 'Execute custom jailbreak / prompt injection scenarios if in scope', 'Test MCP tool call security (if MCP in scope)', 'Document all findings with severity ratings', 'Map findings to remediation owner (model guardrail vs. application layer vs. network policy)'],
        stakeholders: ['AI / ML Technical Lead', 'Security Lead', 'SOC'],
        gate: 'Full assessment complete, all findings documented and categorized' },
      { num: 5, title: 'Reporting, Remediation Planning & Handover', duration: '2 days',
        objectives: 'Deliver findings report, define remediation roadmap, bridge to runtime protection.',
        tasks: ['Generate executive summary and detailed findings report', 'Present risk priority matrix with recommended remediation order', 'Define remediation roadmap with owner and SLA per finding category', 'Bridge red team findings to AIRS Runtime (API/Network Intercept) detection rules', 'Schedule re-scan cadence (quarterly recommended)', 'Complete knowledge transfer with security and AI/ML teams'],
        stakeholders: ['Project Sponsor', 'Security Lead', 'AI / ML Technical Lead'],
        gate: 'Report delivered, remediation owners assigned, re-scan cadence agreed' }
    ],
    prerequisites: [
      { cat: 'Licensing & Credits', text: 'AIRS flex credits allocated specifically for Red Teaming (separate from runtime credits)', req: true },
      { cat: 'Licensing & Credits', text: 'Credit pool name/ID and Red Teaming credit allocation confirmed', req: true },
      { cat: 'Licensing & Credits', text: 'Credits shared with other AIRS products? Confirm no over-allocation risk', req: true },
      { cat: 'Logging', text: 'Strata Logging Service (SLS) activated in tenant', req: true },
      { cat: 'Tenant & Access', text: 'TSG ID (existing or create new)', req: true },
      { cat: 'Tenant & Access', text: 'Region selected: Americas, EU, or Singapore', req: true },
      { cat: 'Tenant & Access', text: 'IAM: RBAC roles configured; service account required?', req: true },
      { cat: 'Tenant & Access', text: 'SSO/IdP integration configured if required', req: false },
      { cat: 'Target Endpoints', text: 'Target endpoint URL(s) — publicly reachable or via VPN', req: true },
      { cat: 'Target Endpoints', text: 'Authentication credentials per target (API key, Bearer token, OAuth client ID/secret)', req: true },
      { cat: 'Target Endpoints', text: 'Rate limits per target: requests/minute (RPM), tokens/minute (TPM)', req: true },
      { cat: 'Target Endpoints', text: 'AIRS reachability confirmed: test probe from AIRS to target endpoint succeeds', req: true },
      { cat: 'Network', text: 'WAF in path? May need to allowlist AIRS source IPs', req: false },
      { cat: 'Network', text: 'Corporate proxy or SSL inspection in path to target?', req: false },
      { cat: 'Compliance', text: 'Compliance frameworks in scope: OWASP LLM Top 10, NIST AI RMF, MITRE ATLAS', req: false }
    ],
    personas: [
      { role: 'Project Sponsor', req: true, knowledge: 'Business case for AI security testing, risk tolerance, regulatory obligations', authority: 'Approve scope, authorize access to AI systems for testing, sign off on findings', risk: 'No authority to authorize testing — engagement cannot begin' },
      { role: 'AI / ML Technical Lead', req: true, knowledge: 'Target AI application architecture, LLM provider and model version, endpoint URLs and auth, rate limits, guardrail configuration, conversation context handling', authority: 'Provide all target configuration details, approve test scope', risk: 'Cannot configure targets — engagement cannot begin' },
      { role: 'Security Lead', req: true, knowledge: 'Compliance frameworks (OWASP LLM, NIST AI RMF, MITRE ATLAS), risk priority matrix, acceptable risk thresholds, remediation policy', authority: 'Approve scan categories, risk matrix, and remediation roadmap', risk: 'No security policy ownership — findings have no remediation authority' },
      { role: 'Application Owner', req: false, knowledge: 'Business logic of the AI application, expected input/output patterns, known use case boundaries', authority: 'Approve testing against their specific application', risk: 'Risk of scope misalignment for applications not owned by AI/ML Lead' },
      { role: 'Network / Proxy Lead', req: false, knowledge: 'WAF configuration, proxy settings, SSL inspection rules, IP allowlisting procedures', authority: 'Allowlist AIRS source IPs if needed', risk: 'AIRS cannot reach targets behind WAF or proxy — blocks entire assessment' },
      { role: 'SOC / Security Operations', req: false, knowledge: 'Incident response procedures, SIEM integration, alert triage', authority: 'Coordinate timing to avoid triggering SOC incidents during scans', risk: 'Risk of SOC treating test traffic as a real incident' }
    ],
    scopeConfig: [
      { key: 'targets', label: 'AI Targets', min: 2, step: 1, base: 2,
        calc: (v) => Math.max(0, v - 2) * 0.5,
        hint: 'Base 2. Each additional AI target adds 0.5 day.' },
      { key: 'cycles', label: 'Scan Cycles', min: 2, step: 1, base: 2,
        calc: (v) => Math.max(0, v - 2) * 0.5,
        hint: 'Base 2. Each additional scan cycle adds 0.5 day.' }
    ]
  },

  'ai-gateway': {
    id: 'ai-gateway', name: 'AI Gateway', short: 'Gateway',
    color: '#f59e0b',
    description: 'Deploy a secure LLM proxy with guardrails, token management, and multi-provider routing.',
    trd: '../../trd/ai-gateway/trd-ai-gateway.html',
    phases: [
      { num: 1, title: 'Pre-Engagement & License Activation', duration: '1 day',
        objectives: 'Align stakeholders, activate AIRS license, provision TSG.',
        tasks: ['Confirm flex credit allocation and pillar scope', 'Activate AIRS license via CSP authcode', 'Provision or confirm TSG ID and region', 'Schedule discovery sessions', 'Distribute prerequisites checklist'],
        stakeholders: ['Project Sponsor', 'AI / ML Platform Team'],
        gate: 'License activated, TSG provisioned' },
      { num: 2, title: 'AI Application Inventory & Provider Configuration', duration: '3–4 days',
        objectives: 'Catalog all AI applications and collect LLM provider credentials.',
        tasks: ['Enumerate all AI applications that will route through the gateway', 'Map routing requirements: which app calls which model/provider', 'Collect provider API keys (OpenAI, Azure OpenAI, AWS Bedrock, Anthropic, etc.)', 'Identify token volume and budget requirements per application', 'Assess model allowlist requirements (approved models only)'],
        stakeholders: ['AI / ML Platform Team', 'Cloud Account Admin'],
        gate: 'Full application inventory complete, all provider credentials collected' },
      { num: 3, title: 'Workspace & Integration Configuration', duration: '4–5 days',
        objectives: 'Create gateway workspaces and wire applications to the gateway endpoint.',
        tasks: ['Create AIRS Gateway workspaces per application/team/environment', 'Configure provider credentials and model allowlists per workspace', 'Set token budget limits and rate limits per workspace', 'Configure workspace access controls (RBAC)', 'Update application code/config to point to gateway endpoint'],
        stakeholders: ['AI / ML Platform Team', 'Application Developer'],
        gate: 'All workspaces configured, applications routing through gateway' },
      { num: 4, title: 'Guardrails, Security Keys & Pilot Validation', duration: '4 days',
        objectives: 'Configure guardrail policies and validate security on pilot traffic.',
        tasks: ['Configure guardrail profiles (prompt injection, data leakage, topic restrictions)', 'Enable Security Keys for sensitive operations (if applicable)', 'Configure Kubernetes hybrid deployment (if hybrid deployment model)', 'Run pilot validation: test requests confirm routing and guardrail detection', 'Review initial guardrail alerts and tune sensitivity'],
        stakeholders: ['Security Lead', 'AI / ML Platform Team'],
        gate: 'Guardrails active, pilot traffic validated, false positive rate acceptable' },
      { num: 5, title: 'Logging, Scaling & Handover', duration: '2–3 days',
        objectives: 'Configure observability, credit management, and complete knowledge transfer.',
        tasks: ['Configure Strata Logging Service dashboards and alerting', 'Set up credit usage monitoring and alerts at budget thresholds', 'Configure auto-scaling parameters (if applicable)', 'Document runbooks: key rotation, monitoring/alerting, credit management', 'Complete knowledge transfer with AI/ML platform and security teams'],
        stakeholders: ['Security Lead', 'AI / ML Platform Team', 'Security Operations Team'],
        gate: 'Observability active, credit monitoring configured, runbooks delivered' }
    ],
    prerequisites: [
      { cat: 'Licensing & Credits', text: 'AIRS flex credits allocated for AI Gateway', req: true },
      { cat: 'Licensing & Credits', text: 'Credit pool name/ID confirmed', req: true },
      { cat: 'Tenant & Access', text: 'TSG ID (existing or create new)', req: true },
      { cat: 'Tenant & Access', text: 'Region selected: Americas, EU, or Singapore', req: true },
      { cat: 'Tenant & Access', text: 'Workspace admin access to AIRS tenant', req: true },
      { cat: 'LLM Providers', text: 'OpenAI API key (if using OpenAI)', req: false },
      { cat: 'LLM Providers', text: 'Azure OpenAI endpoint + API key + deployment name (if using Azure OpenAI)', req: false },
      { cat: 'LLM Providers', text: 'AWS Bedrock account credentials + region (if using AWS Bedrock)', req: false },
      { cat: 'LLM Providers', text: 'Anthropic API key (if using Anthropic)', req: false },
      { cat: 'LLM Providers', text: 'Any other LLM provider credentials for providers in scope', req: false },
      { cat: 'AI Application Inventory', text: 'List of all AI applications with: current LLM provider(s), models used, request volume', req: true },
      { cat: 'AI Application Inventory', text: 'Token budget requirements per application/team', req: false },
      { cat: 'AI Application Inventory', text: 'Model allowlist requirements (which models are approved for which use cases)', req: false },
      { cat: 'Infrastructure', text: 'Kubernetes cluster details (if hybrid/K8s deployment model)', req: false }
    ],
    personas: [
      { role: 'Project Sponsor', req: true, knowledge: 'AI cost governance goals, security policy for LLM usage, regulatory requirements', authority: 'Approve scope, budget limits per workspace, token budget policy', risk: 'No authority to enforce token budgets or model restrictions' },
      { role: 'AI / ML Platform Team', req: true, knowledge: 'All LLM provider integrations, application routing requirements, token volumes, model preferences, API key management, application code changes needed for gateway adoption', authority: 'Approve workspace configuration, provide provider credentials, implement application routing changes', risk: 'Cannot configure workspaces or wire applications to gateway — blocks entire pillar' },
      { role: 'Security Lead', req: true, knowledge: 'Guardrail policy requirements, data leakage prevention rules, topic restriction lists, logging/compliance requirements', authority: 'Approve guardrail profile configuration and security key usage', risk: 'Cannot configure security controls — gateway deployed without guardrails' },
      { role: 'Cloud Account Admin', req: false, knowledge: 'AWS/Azure account structure, IAM roles, managed AI service quotas', authority: 'Grant permissions for provider credential integration', risk: 'Blocks cloud-managed provider integration (AWS Bedrock, Azure OpenAI)' },
      { role: 'K8s / DevOps Lead', req: false, knowledge: 'Kubernetes cluster administration, deployment configuration, networking', authority: 'Approve and deploy hybrid K8s gateway component', risk: 'Blocks hybrid/K8s deployment model (required only for that model)' }
    ]
  }
};

// ── Engagement lifecycle data ────────────────────────────────────────────────

const LIFECYCLE_BANDS = [
  { name: 'Sales Cycle', color: '#8b5cf6', who: 'Account team and customer sponsor, before a project exists' },
  { name: 'Mobilization', color: '#E5A300', who: 'Delivery team and customer stakeholders, confirming people and scope before design starts' },
  { name: 'Delivery', color: '#22c55e', who: 'Solutions architect, delivery engineers, platform owners, and application owners' }
];

const LIFECYCLE = [
  { num: 1, band: 0, title: 'Discovery & Qualification', flag: 'added',
    owner: 'Account team, customer executive sponsor',
    when: 'Weeks to months before a project exists',
    summary: 'Establish that the customer has AI workloads worth securing and a named person accountable for securing them. No architecture work happens here, but the answers set every constraint that follows.',
    decisions: [
      'Which business units are building, buying, or embedding AI',
      'Who owns AI risk: the security team, the platform team, or the AI team itself',
      'What is driving the date: an audit finding, an incident, a product launch, or a regulation',
      'Whether AI usage is already in production or still in pilot'
    ],
    exit: 'A named executive sponsor and a written problem statement both sides agree on.' },

  { num: 2, band: 0, title: 'Solution Design & Pillar Scoping', flag: 'added',
    owner: 'Solutions architect, customer security and platform leads',
    when: 'During the sales cycle',
    summary: 'Turn the problem statement into a scoped solution. This is the stage that selects pillars and sizes the commercial deal, which means the deployment model has to be chosen provisionally here rather than at kickoff.',
    decisions: [
      'Which AIRS pillars are in scope, and which are phase two',
      'Provisional deployment model per pillar, because it drives sizing and credit burn',
      'Tenant region: Americas, EU, or Singapore, which is a data residency decision and is painful to change later',
      'Single tenant or multiple tenants, which affects licensing and the TSG layout',
      'Rough application count and which applications are in the first wave'
    ],
    exit: 'Agreed pillar scope, a high-level architecture, and a credit estimate the customer has seen.' },

  { num: 3, band: 0, title: 'Commercial Close & Licensing', flag: 'added',
    owner: 'Account team, customer procurement, customer cloud owner',
    when: 'Deal close to roughly two weeks after',
    summary: 'Convert the agreement into usable tenancy. Delivery cannot start without this, and it routinely takes longer than the project plan assumes because procurement and cloud account access sit with different teams.',
    decisions: [
      'Flex credit pool size and how it is allocated across pillars',
      'Who receives the authorization code and who activates it',
      'Which TSG the deployment profile attaches to',
      'Strata Logging Service retention and whether logs forward to a SIEM',
      'Who in the customer organization gets superuser on the tenant'
    ],
    exit: 'License activated, TSG provisioned, tenant reachable by named administrators.' },

  { num: 4, band: 1, title: 'Internal Kickoff & Deployment Model Confirmation', flag: 'pm',
    owner: 'Delivery lead, solutions architect, project manager',
    when: 'Week 1, before meeting the customer',
    summary: 'The delivery team takes handover from the sales team and confirms, or formally changes, the deployment model chosen in stage 2. Treat a change here as a scope event, because it moves sizing and credits.',
    decisions: [
      'Deployment model confirmed or revised, with the reason recorded',
      'Delivery team staffing and who holds the customer relationship',
      'Which prerequisites go to the customer, and when they are due back',
      'Known risks carried over from the sales cycle'
    ],
    exit: 'Deployment model signed off internally and the prerequisites checklist issued to the customer.' },

  { num: 5, band: 1, title: 'Project Kickoff', flag: 'pm',
    owner: 'Project manager, customer project manager, all stakeholders',
    when: 'Week 1 to 2',
    summary: 'The first full customer-facing session. Its job is to confirm people and process, not to design anything. If the room is missing an application owner or a change approver, the schedule is already at risk.',
    decisions: [
      'Named owner for every role in the team personas table below',
      'Change control windows and who approves a production change',
      'Success criteria: what the customer will measure to call this done',
      'Meeting cadence, escalation path, and where artifacts live'
    ],
    exit: 'A RACI with real names, an agreed schedule, and written success criteria.' },

  { num: 6, band: 2, title: 'TRD: Topology & Control Plane', flag: 'pm',
    owner: 'Solutions architect, customer network and platform engineers',
    when: 'Week 2 to 3',
    summary: 'The technical requirements document captures the design: topology, control plane, identity, and logging. Multi-gateway topology and the control plane decision belong here, but only if stages 2 and 3 settled region, tenancy, and deployment model first.',
    decisions: [
      'Topology, including multi-gateway layout where more than one gateway is in scope',
      'Control plane: which console is authoritative, and how configuration is promoted',
      'Identity, SSO, and the RBAC model for both the tenant and the gateways',
      'Logging destinations, retention, and SIEM forwarding',
      'IP addressing, routing, and certificate strategy'
    ],
    exit: 'TRD reviewed and signed off by the customer architecture owner.' },

  { num: 7, band: 2, title: 'Application Breakdown', flag: 'pm',
    owner: 'Project manager, application owners, AI platform team',
    when: 'Week 3 to 4, overlapping the TRD',
    summary: 'Inventory every AI application, model, and agent in scope and attach a named owner to each. This is the most common place a project stalls, because the security team usually does not know who owns each application.',
    decisions: [
      'The application inventory, with owner, environment, and cloud account for each',
      'Which pillar covers each application, since some need more than one',
      'Onboarding waves and the order applications are brought in',
      'Per-application enforcement posture: monitor first or block from day one',
      'Who signs off that an application is ready to move from monitor to block'
    ],
    exit: 'A signed-off application inventory with an owner and a wave assigned to every entry.' },

  { num: 8, band: 2, title: 'Pillar Integration & Deployment', flag: 'here',
    owner: 'Delivery engineers, application owners, cloud administrators',
    when: 'Week 4 onward, length depends on pillar scope',
    summary: 'The build. Each selected pillar runs its own phase sequence, and the planner below generates that sequence, its prerequisites, and the roles each phase needs.',
    decisions: [
      'Per-phase exit gates, which the generated plan below sets out',
      'Whether pillars run sequentially or in parallel, based on team capacity',
      'Rollback plan for each enforcement change'
    ],
    exit: 'Every in-scope application is onboarded to its pillar and passing traffic through inspection.' },

  { num: 9, band: 2, title: 'Validation & Tuning', flag: 'added',
    owner: 'Delivery engineers, customer security operations',
    when: 'Runs alongside and after stage 8',
    summary: 'Prove detections fire, then tune them until the customer trusts the verdicts. Skipping this is how a deployment ends up permanently in monitor mode.',
    decisions: [
      'Which test cases constitute proof for each detection type',
      'False positive threshold the customer will accept before moving to block',
      'Policy exceptions, and who is allowed to grant one',
      'When each application flips from monitor to enforce'
    ],
    exit: 'Agreed test cases pass and the customer accepts the false positive rate.' },

  { num: 10, band: 2, title: 'Operational Handover & Expansion', flag: 'added',
    owner: 'Project manager, customer security operations, account team',
    when: 'Final week, then ongoing',
    summary: 'Hand the running system to the people who will own it, and record what wave two looks like while the context is still fresh.',
    decisions: [
      'Who runs day-2 operations and against what runbook',
      'Alert routing, on-call ownership, and escalation to support',
      'Credit consumption review cadence',
      'Scope of the next wave: remaining applications, remaining pillars, or both'
    ],
    exit: 'Runbooks handed over, support path tested, and the next wave scoped.' }
];

const LIFECYCLE_PITFALLS = [
  ['Tenant region', 'Stage 2, during solution design', 'Changing region after activation means a new tenant. Data residency makes this a compliance decision, not a technical one.'],
  ['Deployment model', 'Stage 2 provisionally, stage 4 confirmed', 'It drives sizing and credit burn, so it cannot wait for the TRD without putting the commercial numbers at risk.'],
  ['Application ownership', 'Stage 2 identified, stage 7 named', 'The single most common cause of schedule slip. Security teams rarely know who owns each AI application.'],
  ['Credit allocation across pillars', 'Stage 3', 'Discovering a pillar is underfunded mid-delivery forces a procurement cycle the plan has no room for.'],
  ['Change control windows', 'Stage 5', 'Finding out in stage 8 that production changes need a two-week approval adds two weeks per change.'],
  ['Monitor versus block posture', 'Stage 7', 'Treated as a stage 9 decision it becomes a negotiation under time pressure, and the answer defaults to monitor forever.']
];

// ── Pure effort helpers ──────────────────────────────────────────────────────
// Lifted from the planner. They were already pure apart from reading page
// state, which is now passed in.

function parseDuration(str) {
  const m = String(str).match(/(\d+(?:\.\d+)?)(?:[–-](\d+(?:\.\d+)?))?/);
  if (!m) return { min: 0, max: 0 };
  const min = parseFloat(m[1]);
  const max = m[2] ? parseFloat(m[2]) : min;
  return { min, max };
}

function calcBaseDays(pillarId) {
  const phases = PILLARS[pillarId].phases;
  let minDays = 0, maxDays = 0;
  phases.forEach(phase => {
    const { min, max } = parseDuration(phase.duration);
    minDays += min;
    maxDays += max;
  });
  return { min: Math.round(minDays * 10) / 10, max: Math.round(maxDays * 10) / 10 };
}

// values is the page's scopeValues[pillarId] object.
function calcScopeExtra(pillarId, values) {
  const p = PILLARS[pillarId];
  if (!p.scopeConfig || !values) return 0;
  return p.scopeConfig.reduce((sum, cfg) => sum + cfg.calc(values[cfg.key]), 0);
}

function fmtDays(d) {
  if (d === 0) return '+0 days';
  if (d % 1 === 0) return `+${d} day${d !== 1 ? 's' : ''}`;
  return `+${d} days`;
}

/* An absolute effort range. Distinct from fmtDays, which formats a scope
 * increment and carries a leading "+" that would read as "on top of" here.
 * A range that has collapsed to one figure prints as one figure. */
function fmtRange(min, max) {
  const n = v => (v % 1 === 0 ? String(v) : String(Math.round(v * 10) / 10));
  const unit = max === 1 ? 'day' : 'days';
  return min === max ? `${n(min)} ${unit}` : `${n(min)} to ${n(max)} ${unit}`;
}

// ── Component universe ───────────────────────────────────────────────────────
// Everything a consultant can put in a POV. Pillars carry their phase and
// persona data in PILLARS above; the entries here add what the POV needs on
// top, which is the success criteria and the tests that prove them.
//
// `anchor` is a real section id in the named guide. `step` is the collapsible
// step heading inside that section. Both were read out of the published guides
// rather than invented, so a reader who follows the citation lands on the
// procedure the test describes.

const AIGW_GUIDE = 'guides/ai-gateway/ai-gateway-deployment.html';

const COMPONENTS = {

  // ── Pillars ──
  'network-intercept': {
    name: 'Network Intercept', group: 'pillar', pillar: true,
    guide: 'guides/airs/airs-network-intercept.html', anchor: 'validation',
    summary: 'Inspect AI traffic at the network layer through Cloud NGFW or VM-Series firewalls.',
    driver: 'AI traffic leaves the network to third-party model providers with no inspection point in the path.',
    criteria: [
      {
        text: 'Malicious prompts sent to a production AI endpoint are detected and blocked before they reach the model provider.',
        tests: [
          { step: 'Step 7.2', title: 'Generate test traffic',
            action: 'Send a known prompt-injection payload from a workload behind the firewall to the AI endpoint.',
            expect: 'The request is blocked and a threat log entry is written with the matching threat ID.',
            evidence: 'Screenshot of the threat log entry, filtered to the test source IP, with the timestamp visible.' },
          { step: 'Step 7.1', title: 'Verify firewall health',
            action: 'Confirm the firewall is connected to Strata Cloud Manager and passing traffic.',
            expect: 'Device status is connected, and session counts increase while test traffic runs.',
            evidence: 'Screenshot of the device health view showing connected status.' }
        ]
      },
      {
        text: 'Every AI application and model in use is discovered and reported, including applications the security team did not know about.',
        tests: [
          { step: 'Step 7.5', title: 'Verify discovery dashboard updates',
            action: 'Review the AI application discovery dashboard after the agreed soak period.',
            expect: 'Applications and models observed in test traffic appear, each attributed to a source.',
            evidence: 'Export of the discovery dashboard listing the discovered applications.' },
          { step: 'Step 7.4', title: 'Review the Security Lifecycle Review report',
            action: 'Generate an SLR report over the inspection period.',
            expect: 'The report quantifies AI traffic volume, applications and threats observed.',
            evidence: 'The generated SLR report PDF.' }
        ]
      },
      {
        text: 'Security operations can investigate an AI incident from the log without leaving Strata Cloud Manager.',
        audience: 'consultant',
        tests: [
          { step: 'Step 7.3', title: 'Review AI security logs',
            action: 'Open a blocked event and walk the detail view with the customer SOC analyst.',
            expect: 'The analyst can identify the application, the model, the verdict and the payload category.',
            evidence: 'Screenshot of the log detail view, and the analyst confirming the walkthrough.' }
        ]
      }
    ]
  },

  'api-intercept': {
    name: 'API Intercept', group: 'pillar', pillar: true,
    guide: 'guides/airs/airs-api-intercept.html', anchor: 'discovery-validation',
    summary: 'Scan prompts and responses through a direct API call from the application or gateway.',
    driver: 'Applications need inline AI threat scanning without a network change or a traffic redirect.',
    criteria: [
      {
        text: 'A prompt submitted to the scan API returns a verdict that correctly separates benign content from a threat.',
        tests: [
          { step: 'Step 7.1', title: 'Validate API Intercept scanning',
            action: 'Call the scan API with a benign prompt, then with a known prompt-injection payload.',
            expect: 'The benign prompt returns allow, and the injection payload returns block with a category.',
            evidence: 'Both API response bodies, captured with their request IDs.' }
        ]
      },
      {
        text: 'Cloud AI assets are discovered and mapped, so the customer can see where AI is running across their accounts.',
        tests: [
          { step: 'Step 7.2', title: 'Review cloud asset discovery',
            action: 'Open the discovered asset inventory for the onboarded cloud accounts.',
            expect: 'AI services and endpoints in the onboarded accounts are listed with their account and region.',
            evidence: 'Export of the discovered asset inventory.' },
          { step: 'Step 7.3', title: 'Review the cloud asset map',
            action: 'Open the asset map and trace one application to the model it calls.',
            expect: 'The map shows the relationship between the application, its account and the model endpoint.',
            evidence: 'Screenshot of the asset map with the traced path visible.' }
        ]
      },
      {
        text: 'Network traffic risks associated with AI assets are surfaced and prioritised.',
        audience: 'consultant',
        tests: [
          { step: 'Step 7.4', title: 'Analyse network traffic risks',
            action: 'Review the traffic risk findings for the onboarded accounts.',
            expect: 'Findings are listed with a severity and an affected asset.',
            evidence: 'Export of the risk findings list.' }
        ]
      }
    ]
  },

  'ai-gateway': {
    name: 'AI Gateway', group: 'pillar', pillar: true,
    guide: AIGW_GUIDE, anchor: 'guardrails-logging',
    summary: 'A managed gateway in front of model providers that centralises routing, budgets, guardrails and logging.',
    driver: 'Model access is sprawling across teams with no central control of spend, routing or policy.',
    criteria: [
      {
        text: 'An application reaches an approved model through the gateway, and the call is logged end to end.',
        tests: [
          { step: 'Step 5.5', title: 'Final end-to-end verification',
            action: 'Send a request through the gateway from the nominated test application.',
            expect: 'The model responds, and the request appears in the event log with its model, workspace and token counts.',
            evidence: 'The response body, and a screenshot of the matching event log row.' }
        ]
      }
    ]
  },

  'model-security': {
    name: 'AI Model Security', group: 'pillar', pillar: true,
    guide: 'guides/airs-model/airs-model-security.html', anchor: 'validation',
    summary: 'Scan model artefacts for malicious code, unsafe serialisation and tampering before they are deployed.',
    driver: 'Models are pulled from public registries and deployed without anyone inspecting the artefact.',
    criteria: [
      {
        text: 'A model artefact containing a known threat is detected and reported before deployment.',
        tests: [
          { step: 'Step 7.2', title: 'Validate with a known-threat model',
            action: 'Scan a model artefact that carries a known unsafe payload.',
            expect: 'The scan reports a threat verdict naming the detected technique.',
            evidence: 'The scan result record, including the artefact hash and the verdict.' },
          { step: 'Step 7.1', title: 'Validate with a known-safe model',
            action: 'Scan a model artefact known to be clean.',
            expect: 'The scan completes with a clean verdict and no findings.',
            evidence: 'The scan result record showing the clean verdict.' }
        ]
      },
      {
        text: 'Scan results are visible to the platform team in Strata Cloud Manager without access to the scanning host.',
        tests: [
          { step: 'Step 7.3', title: 'Verify results in the SCM dashboard',
            action: 'Open the model security dashboard after both scans complete.',
            expect: 'Both scans appear with their verdicts, artefact names and timestamps.',
            evidence: 'Screenshot of the dashboard showing both scan results.' }
        ]
      },
      {
        text: 'A renamed or repackaged model is still recognised, so detection does not depend on the file name.',
        audience: 'consultant',
        tests: [
          { step: 'Step 7.4', title: 'Validate content-based fingerprinting',
            action: 'Rename the known-threat artefact and scan it again.',
            expect: 'The threat is detected again, and the fingerprint matches the original scan.',
            evidence: 'Both scan records side by side, showing the matching fingerprint.' }
        ]
      }
    ]
  },

  'red-teaming': {
    name: 'AI Red Teaming', group: 'pillar', pillar: true,
    guide: 'guides/airs-red/airs-red-teaming.html', anchor: 'validation',
    summary: 'Run automated adversarial attacks against an AI application and report what succeeded.',
    driver: 'Nobody has tested whether the customer AI applications can actually be made to misbehave.',
    criteria: [
      {
        text: 'The customer has a measured attack success rate against a nominated AI application, not an assumption.',
        tests: [
          { step: 'Step 8.1', title: 'Review scan reports',
            action: 'Run a scan against the nominated target and open the report.',
            expect: 'The report gives an attack success rate broken down by attack category.',
            evidence: 'The scan report, with the target and the scan date visible.' },
          { step: 'Step 8.2', title: 'Analyse attack results',
            action: 'Open a successful attack and review the full exchange.',
            expect: 'The prompt, the model response and the reason the attack is judged successful are all shown.',
            evidence: 'Screenshot of one successful attack exchange.' }
        ]
      },
      {
        text: 'Each finding carries remediation guidance the application team can act on.',
        tests: [
          { step: 'Step 8.3', title: 'Review remediation guidance',
            action: 'Open the remediation guidance for the highest-severity finding with the application owner.',
            expect: 'The guidance names a specific change, not a general principle.',
            evidence: 'The remediation text, and the application owner confirming it is actionable.' },
          { step: 'Step 8.4', title: 'Download reports',
            action: 'Export the scan report for distribution.',
            expect: 'The export downloads and opens, and matches what the console showed.',
            evidence: 'The downloaded report file.' }
        ]
      }
    ]
  },

  // ── Network Intercept electives ──
  'k8s-protection': {
    name: 'Kubernetes and Container Protection', group: 'elective',
    requires: ['network-intercept'], days: [2, 3],
    guide: 'guides/airs/airs-k8s-protection.html', anchor: 'validation',
    summary: 'Extend network inspection to pod-to-pod and pod-to-model traffic inside a Kubernetes cluster.',
    driver: 'AI workloads run in Kubernetes, where traffic never leaves the cluster and is invisible to the perimeter.',
    criteria: [
      {
        text: 'Traffic between pods and AI endpoints is inspected and matched against security policy.',
        tests: [
          { step: 'Validate PAN-CNI Pods', title: 'Validate the PAN-CNI pods',
            action: 'Confirm the PAN-CNI pods are running on every node in the target cluster.',
            expect: 'All PAN-CNI pods report Running with no restarts.',
            evidence: 'Output of the pod listing for the PAN-CNI namespace.' },
          { step: 'Validate Security Policy Enforcement', title: 'Validate security policy enforcement',
            action: 'Send test traffic from an instrumented pod that should be denied by policy.',
            expect: 'The traffic is denied and a matching log entry is written.',
            evidence: 'The denied-session log entry showing the pod source.' }
        ]
      },
      {
        text: 'Pod identity is available in policy, so rules can be written against workloads rather than IP addresses.',
        audience: 'consultant',
        tests: [
          { step: 'Validate IP Tag Harvesting', title: 'Validate IP tag harvesting',
            action: 'Confirm pod IP addresses are being registered against their workload tags.',
            expect: 'The registered IP and tag list reflects the running pods.',
            evidence: 'Output of the registered IP and tag listing.' }
        ]
      }
    ]
  },

  'microperimeter': {
    name: 'Microperimeter', group: 'elective',
    requires: ['network-intercept'], days: [2, 3],
    guide: 'guides/airs/airs-microperimeter.html', anchor: 'validation',
    summary: 'Steer selected host traffic to the firewall with an agent, without changing the network path.',
    driver: 'Some AI workloads cannot be re-routed at the network layer, so inspection has to happen at the host.',
    criteria: [
      {
        text: 'Traffic from an instrumented host reaches the firewall and is matched against security policy.',
        tests: [
          { step: 'Step 5.2', title: 'Generate test traffic',
            action: 'Send AI traffic from a host running the redirector agent.',
            expect: 'The session appears in the firewall log with the expected policy match.',
            evidence: 'The session log entry showing the host as source.' },
          { step: 'Step 5.1', title: 'Verify agent status and health',
            action: 'Check the redirector agent status on the instrumented host.',
            expect: 'The agent reports healthy and connected.',
            evidence: 'Output of the agent status command.' }
        ]
      },
      {
        text: 'Only the nominated traffic is steered, so unrelated workloads on the host are unaffected.',
        tests: [
          { step: 'Step 5.4', title: 'Verify steering rules',
            action: 'Send traffic that the steering rules should exclude.',
            expect: 'The excluded traffic does not appear in the firewall log and reaches its destination normally.',
            evidence: 'The absence of a matching log entry, plus a successful response from the excluded destination.' }
        ]
      }
    ]
  },

  // ── AI Gateway infrastructure (Hybrid only) ──
  'aigw-kubernetes': {
    name: 'Kubernetes data plane', group: 'gateway-infra',
    requires: ['ai-gateway'], days: [3, 5],
    guide: 'guides/ai-gateway/kubernetes-deployment.html', anchor: 'verify',
    summary: 'Run the gateway data plane in the customer Kubernetes cluster so prompts never leave their network.',
    driver: 'Prompt content cannot leave the customer network for data residency or contractual reasons.',
    criteria: [
      {
        text: 'The in-cluster gateway serves requests and reports to the management plane, with prompt content staying in the cluster.',
        tests: [
          { step: '8.1', title: 'Test the pod directly',
            action: 'Send a request to the gateway pod from inside the cluster.',
            expect: 'The model responds through the in-cluster data plane.',
            evidence: 'The response body, captured from inside the cluster.' },
          { step: '8.3', title: 'Confirm the request reached the management plane',
            action: 'Look for the request in the event log in Strata Cloud Manager.',
            expect: 'The event appears with its metadata, and without prompt content unless prompt logging was enabled.',
            evidence: 'Screenshot of the event log row for the test request.' }
        ]
      }
    ]
  },

  'aigw-serverless': {
    name: 'Serverless data plane', group: 'gateway-infra',
    requires: ['ai-gateway'], days: [2, 4],
    guide: 'guides/ai-gateway/serverless-deployment.html', anchor: 'verify',
    summary: 'Run the gateway data plane on serverless container infrastructure instead of a managed cluster.',
    driver: 'The customer wants a self-hosted data plane without operating Kubernetes.',
    criteria: [
      {
        text: 'The serverless data plane serves requests and reports to the management plane.',
        tests: [
          { step: 'Verify', title: 'Verify the deployment',
            action: 'Send a request to the deployed gateway endpoint.',
            expect: 'The model responds, and the request appears in the event log.',
            evidence: 'The response body and the matching event log row.' }
        ]
      }
    ]
  },

  'aigw-key-management': {
    name: 'LLM API key management', group: 'gateway-infra',
    requires: ['ai-gateway'], days: [1, 2],
    guide: 'guides/ai-gateway/llm-api-key-management.html', anchor: 'rotation',
    summary: 'Hold provider API keys in a managed key vault rather than in gateway configuration.',
    driver: 'Provider API keys are long lived, widely shared, and have no rotation story.',
    criteria: [
      {
        text: 'Provider API keys are held in the key vault and can be rotated without a gateway outage.',
        tests: [
          { step: 'Step 6', title: 'Rotate a provider key',
            action: 'Rotate one provider key in the vault and send a request through the gateway afterwards.',
            expect: 'The request succeeds using the new key, with no gateway restart and no failed requests.',
            evidence: 'The vault version history, plus the successful response after rotation.' }
        ]
      }
    ]
  }
};

// ── AI Gateway elements ──────────────────────────────────────────────────────
// Each is a capability of the gateway rather than a separate deployment, so
// they share the deployment guide and differ only in which phase proves them.
// `gap: true` marks a capability the published guides do not yet cover as its
// own procedure; the test body then comes from the reference POV document and
// the citation points at the nearest real section.

[
  ['deployment-model', 'Deployment model', 'deployment-model', 'Choose Your Deployment Model', [0.5, 1],
    'The chosen deployment model is agreed and recorded, with the data residency consequence understood.',
    'Walk the SaaS and Hybrid options with the sponsor and the data protection owner.',
    'A model is chosen, and the reason is recorded against the data residency requirement.',
    'The decision recorded in the scope section of this document, signed by the sponsor.'],

  ['workspaces', 'Workspaces', 'enable-gateway', 'Step 2.3', [0.5, 1],
    'Teams are separated into workspaces, so one team cannot see or spend against another team budget.',
    'Create the agreed workspaces and attempt to use a model from a workspace it was not provisioned to.',
    'The provisioned workspace succeeds and the unprovisioned one is refused.',
    'Both responses, captured side by side.'],

  ['model-catalog', 'Model catalog', 'llm-integration', 'Step 3.6', [0.5, 1],
    'Only approved models are reachable through the gateway.',
    'Request an approved model, then request a model that was not provisioned.',
    'The approved model responds and the unapproved one is refused.',
    'Both response bodies.'],

  ['api-keys', 'Gateway API keys', 'llm-integration', 'Step 3.8', [0.5, 1],
    'Application access is issued and revoked through gateway API keys, independent of provider credentials.',
    'Issue a key, use it, revoke it, and use it again.',
    'The call succeeds before revocation and is refused afterwards.',
    'Both responses, with the key identifier and the revocation timestamp.'],

  ['routing-simple', 'Simple routing', 'llm-integration', 'Step 3.7', [0.5, 1],
    'A request names a model and the gateway routes it to the correct provider.',
    'Send a request naming the configured model reference.',
    'The response comes from the expected provider and model.',
    'The response body including the model field.'],

  ['routing-load-balance', 'Load-balanced routing', 'llm-integration', 'Step 3.7', [0.5, 1],
    'Requests are distributed across more than one provider target according to the configured weights.',
    'Configure two targets with weights and send a sample of requests large enough to show the split.',
    'The observed distribution across targets approximates the configured weights.',
    'The event log filtered to the test window, grouped by target.', true],

  ['routing-fallback', 'Fallback routing', 'llm-integration', 'Step 3.7', [0.5, 1],
    'When the primary provider fails, the request is served by the fallback rather than returned as an error.',
    'Make the primary target fail, for example with an invalid credential, and send a request.',
    'The response is served by the fallback target and the event log records both attempts.',
    'The response body plus the event log rows for the failed and successful attempts.', true],

  ['routing-conditional', 'Conditional routing', 'llm-integration', 'Step 3.7', [0.5, 1],
    'Requests are routed to different targets based on the conditions the customer cares about.',
    'Send two requests that differ only in the routing condition, for example the workspace or a header.',
    'Each is served by the target the condition selects.',
    'Both event log rows showing the different targets.', true],

  ['budgets-rate-limits', 'Budgets and rate limits', 'llm-integration', 'Step 3.5', [0.5, 1],
    'Spend and request rate are capped per workspace, and the cap is enforced rather than merely reported.',
    'Set a low budget or rate limit on a test workspace and exceed it.',
    'Further requests are refused with a quota error while other workspaces are unaffected.',
    'The refusal response, and the budget view showing consumption against the cap.'],

  ['guardrails', 'AI Runtime guardrails', 'guardrails-logging', 'Step 5.2', [1, 2],
    'Prompts and responses passing through the gateway are scanned, and policy violations are blocked.',
    'Send a benign prompt, then a prompt-injection payload, through a workspace with the guardrail enabled.',
    'The benign prompt is answered and the injection payload is blocked with a guardrail verdict.',
    'Both responses, plus the matching guardrail verdicts in the event log.'],

  ['mcp-gateway', 'MCP gateway', 'mcp-integration', 'Step 4.5', [1, 2],
    'MCP tool calls are brokered through the gateway, so tool use is governed and logged like model use.',
    'Point an MCP client at the gateway server URL and invoke a tool.',
    'The tool call succeeds through the gateway and appears in the event log.',
    'The client output plus the matching event log row.'],

  ['agent-gateway', 'Agent identity', 'llm-integration', 'Step 3.10', [0.5, 1],
    'Agent traffic is distinguishable from human traffic in the logs and in policy.',
    'Send one request as a user and one as an agent, then filter the event log by identity.',
    'The two are attributed separately.',
    'The event log filtered to each identity in turn.'],

  ['coding-agents', 'Coding agents', 'llm-integration', 'Step 3.9', [0.5, 1],
    'Developer coding agents reach models through the gateway, so their usage is governed and visible.',
    'Point a coding agent at the gateway and run a prompt from the developer workstation.',
    'The agent works normally, and its requests appear in the event log attributed to the developer workspace.',
    'The agent session output plus the matching event log rows.'],

  ['observability', 'Observability', 'guardrails-logging', 'Step 5.3', [0.5, 1],
    'Gateway activity is visible in Strata Cloud Manager within the agreed time, and can be exported.',
    'Send a request and time how long it takes to appear in the event log, then export the log.',
    'The event appears within the agreed interval and the export contains it.',
    'The timestamped event log row and the export file.']

].forEach(([id, name, anchor, step, days, criterion, action, expect, evidence, gap]) => {
  COMPONENTS[id] = {
    name, group: 'gateway-element', requires: ['ai-gateway'], days,
    guide: AIGW_GUIDE, anchor, gap: !!gap,
    summary: criterion,
    criteria: [{ text: criterion, tests: [{ step, title: name, action, expect, evidence }] }]
  };
});

// Guardrails are delivered through API Intercept, so selecting them pulls that
// pillar in as well.
COMPONENTS['guardrails'].requires = ['ai-gateway', 'api-intercept'];

// ── Integrations ─────────────────────────────────────────────────────────────
// Every integration guide carries a Phase N: Verification section at
// #verification, and every one proves the same two things: approved traffic
// passes, and a threat is stopped at the integration point. The third entry in
// each row is what is specific to that platform.

[
  ['apigee', 'Apigee', 'api-intercept', [2, 3], 'Step 6.2', 'Step 6.4',
   'API proxies fronting AI endpoints call the scan service from a shared flow.'],
  ['azure-apim', 'Azure API Management', 'api-intercept', [2, 3], 'Step 5.2', 'Step 5.5',
   'APIM policy calls the scan service on the request and the response.'],
  ['kong', 'Kong', 'api-intercept', [2, 3], 'Step 5.2', 'Step 5.3',
   'A Kong plugin calls the scan service before the request reaches the model.'],
  ['litellm', 'LiteLLM', 'api-intercept', [1, 2], 'Step 5.1', 'Step 5.3',
   'A LiteLLM callback scans prompts before they are proxied to the provider.'],
  ['truefoundry', 'TrueFoundry', 'api-intercept', [1, 2], 'Step 4.1', 'Step 4.3',
   'The TrueFoundry gateway calls the scan service in line with model requests.'],
  ['n8n', 'n8n', 'api-intercept', [1, 2], 'Step 4.2', 'Step 4.3',
   'An n8n workflow node scans prompts before an AI step runs.'],
  ['jenkins', 'Jenkins', 'api-intercept', [1, 2], 'Step 5.2', 'Step 5.3',
   'A pipeline stage scans AI artefacts and content as part of the build.'],
  ['github-actions', 'GitHub Actions', 'api-intercept', [1, 2], 'Step 5.2', 'Step 5.3',
   'A workflow step scans AI artefacts and content as part of CI.'],
  ['claude-code', 'Claude Code', 'api-intercept', [1, 2], 'Step 4.1', 'Step 4.3',
   'Hooks scan prompts and tool calls on the developer workstation.'],
  ['codex-cli', 'Codex CLI', 'api-intercept', [1, 2], 'Step 4.1', 'Step 4.4',
   'Hooks scan prompts, shell commands and MCP tool calls in the CLI.'],
  ['ide-assistants', 'IDE assistants', 'api-intercept', [1, 2], 'Step 4.1', 'Step 4.2',
   'Cline, Cursor and Windsurf scan prompts and tool calls from inside the IDE.']

].forEach(([id, name, parent, days, blockStep, logStep, summary]) => {
  COMPONENTS[id] = {
    name, group: 'integration', requires: [parent], days,
    guide: `guides/airs-integrations/${id}.html`, anchor: 'verification',
    summary,
    driver: `AI traffic flowing through ${name} is not inspected today.`,
    criteria: [
      {
        text: `A prompt-injection payload sent through ${name} is blocked at the integration point, and a benign prompt is not.`,
        tests: [
          { step: blockStep, title: `Test a blocked prompt through ${name}`,
            action: `Send a known prompt-injection payload through ${name}.`,
            expect: 'The request is refused at the integration point and never reaches the model.',
            evidence: 'The refusal response body, with its request ID.' },
          { step: logStep, title: `Confirm ${name} activity in Strata Cloud Manager`,
            action: 'Open the scan logs and locate both the benign and the blocked request.',
            expect: 'Both appear with their verdicts, attributed to the integration.',
            evidence: 'Screenshot of the scan log filtered to the test window.' }
        ]
      }
    ]
  };
});

// ── Derived helpers ──────────────────────────────────────────────────────────

const ORDER = ['pillar', 'elective', 'gateway-element', 'gateway-infra', 'integration'];

const GROUP_LABELS = {
  'pillar': 'AIRS pillars',
  'elective': 'Network Intercept electives',
  'gateway-element': 'AI Gateway elements',
  'gateway-infra': 'AI Gateway infrastructure',
  'integration': 'Integrations'
};

// Day estimate for any component: pillars come from their phase durations, the
// rest carry an explicit estimate.
function componentDays(id) {
  const c = COMPONENTS[id];
  if (!c) return { min: 0, max: 0 };
  if (c.pillar) return calcBaseDays(id);
  return { min: c.days[0], max: c.days[1] };
}

// Selecting a child selects its parents, transitively.
function resolveDependencies(ids) {
  const out = new Set();
  const visit = id => {
    if (!COMPONENTS[id] || out.has(id)) return;
    out.add(id);
    (COMPONENTS[id].requires || []).forEach(visit);
  };
  ids.forEach(visit);
  return [...out];
}

/* The published site. A generated .docx or .pptx is read away from the site,
 * usually by a customer who has no copy of it, so a citation in a generated
 * artefact has to be an absolute URL. Page-relative paths only work inside the
 * site itself, where the consumer already knows its own depth. */
const SITE_BASE = 'https://jollymahn.github.io/pan-implementation-guides/';

/* buildRegister(selectedIds, opts) -> { criteria, tests, weeks, days, gaps }
 *
 * The single structure every generated artefact is a projection of. SC ids are
 * allocated in component order and VT ids run across the whole engagement, so
 * the sign-off table reads as one sequence rather than one per component.
 */
function buildRegister(selectedIds, opts) {
  const options = opts || {};
  const audience = options.audience === 'customer' ? 'customer' : 'consultant';
  const ids = resolveDependencies(selectedIds)
    .sort((a, b) => ORDER.indexOf(COMPONENTS[a].group) - ORDER.indexOf(COMPONENTS[b].group));

  const criteria = [];
  const tests = [];
  let sc = 0, vt = 0;

  ids.forEach(id => {
    const c = COMPONENTS[id];
    (c.criteria || []).forEach(crit => {
      const critAudience = crit.audience || 'customer';
      if (audience === 'customer' && critAudience === 'consultant') return;
      sc += 1;
      const entry = {
        id: `SC-${String(sc).padStart(2, '0')}`,
        component: id, componentName: c.name, group: c.group,
        criterion: crit.text, audience: critAudience, tests: []
      };
      crit.tests.forEach(t => {
        vt += 1;
        const test = {
          id: `VT-${String(vt).padStart(2, '0')}`,
          sc: entry.id, component: id, componentName: c.name,
          title: t.title, action: t.action, expect: t.expect, evidence: t.evidence,
          guide: c.guide, anchor: c.anchor, step: t.step,
          // `path` is docs-relative, for a consumer inside the site that knows
          // its own depth. `href` is absolute, for the generated documents.
          path: `${c.guide}#${c.anchor}`,
          href: `${SITE_BASE}${c.guide}#${c.anchor}`,
          gap: !!c.gap, week: 0
        };
        entry.tests.push(test);
        tests.push(test);
      });
      criteria.push(entry);
    });
  });

  // Effort, then weeks at five working days.
  let min = 0, max = 0;
  ids.forEach(id => {
    const d = componentDays(id);
    min += d.min;
    max += d.max;
  });
  min = Math.round(min * 10) / 10;
  max = Math.round(max * 10) / 10;
  const weekCount = Math.max(2, Math.ceil(max / 5));

  // Validation lands in the back half of the engagement, spread evenly, with
  // every component's tests in the same week so a team is not asked to revisit
  // the same deployment twice.
  const firstValidationWeek = Math.max(2, Math.ceil(weekCount / 2) + 1);
  const validationWeeks = Math.max(1, weekCount - firstValidationWeek + 1);
  const byComponent = [...new Set(tests.map(t => t.component))];
  byComponent.forEach((id, i) => {
    const week = firstValidationWeek + Math.floor(i * validationWeeks / byComponent.length);
    tests.filter(t => t.component === id).forEach(t => { t.week = week; });
  });

  return {
    audience,
    components: ids,
    criteria,
    tests,
    days: { min, max },
    weeks: weekCount,
    gaps: ids.filter(id => COMPONENTS[id].gap)
  };
}


/* Integrity check from POV-SPEC §10: every SC has at least one VT, and every
 * VT serves an SC. Returns a list of problems, empty when the model is sound.
 */
function checkRegisterIntegrity() {
  const problems = [];
  Object.entries(COMPONENTS).forEach(([id, c]) => {
    if (!c.criteria || !c.criteria.length) {
      problems.push(`${id}: no success criteria`);
      return;
    }
    c.criteria.forEach((crit, i) => {
      if (!crit.text) problems.push(`${id}: criterion ${i} has no text`);
      if (!crit.tests || !crit.tests.length) {
        problems.push(`${id}: criterion ${i} has no validation test`);
        return;
      }
      crit.tests.forEach((t, j) => {
        ['title', 'action', 'expect', 'evidence', 'step'].forEach(f => {
          if (!t[f]) problems.push(`${id}: criterion ${i} test ${j} missing ${f}`);
        });
      });
    });
    (c.requires || []).forEach(r => {
      if (!COMPONENTS[r]) problems.push(`${id}: requires unknown component ${r}`);
    });
    if (!c.guide || !c.anchor) problems.push(`${id}: no guide citation`);
  });
  return problems;
}

return {
  PILLARS, LIFECYCLE, LIFECYCLE_BANDS, LIFECYCLE_PITFALLS,
  COMPONENTS, GROUP_LABELS, ORDER,
  parseDuration, calcBaseDays, calcScopeExtra, fmtDays, fmtRange,
  componentDays, resolveDependencies, buildRegister, checkRegisterIntegrity,
  SITE_BASE
};
});
