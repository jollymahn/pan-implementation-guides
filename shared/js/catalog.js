/**
 * The guide catalog: one record per card on the landing page.
 *
 * ── Why this file exists ───────────────────────────────────────────────────
 * The landing page used to hold 23 hand-written cards, and the section hub
 * pages held 34 more. Nothing kept them honest against each other or against
 * the left rail, so the Azure card still said "Skeleton: phase content
 * pending" over a finished 3,697-line guide, two cards pointed at `#`, and six
 * published guides had no card and no nav entry at all.
 *
 * Cards are now generated from this file by
 * `docs/shared/scripts/build-catalog.js`, which also asserts that every link
 * in GLOBAL_NAV_GROUPS appears here. Add a guide to the rail and the build
 * fails until you add it here too.
 *
 * ── Adding a guide ─────────────────────────────────────────────────────────
 * Most new guides are a `links` entry on an existing card, not a new card. A
 * new card is warranted when the guide starts a product family that does not
 * belong under any existing heading.
 *
 *   {
 *     id:      'aws',                     // unique; matches the nav group id
 *                                         // where one exists
 *     section: 'Network Security',        // must be a SECTIONS entry below
 *     accent:  'card-aws',                // see the accent rules in
 *                                         // pan-guides.css: a cloud brand, or
 *                                         // the section's own colour
 *     badge:   'Amazon Web Services',
 *     title:   'VM-Series on AWS',
 *     blurb:   'One or two sentences...', // what the reader gets, not a slogan
 *     tags:    ['VM-Series', 'GWLB'],
 *     links: [
 *       { t: 'VM-Series Deployment', h: 'guides/aws/vm-series-deployment.html',
 *         note: 'Day 0 to Day 2 with GWLB' },
 *       { t: 'AWS guide index', h: 'guides/aws/index.html', hub: true }
 *     ]
 *   }
 *
 * `h` is relative to docs/. `note` is the one-line descriptor shown beside the
 * link; keep it under about 45 characters so it does not wrap. `hub: true`
 * moves the link to the foot of the card and styles it as the index rather
 * than as a guide. `soon: true` on a card marks it unbuilt and renders it
 * dimmed with no links.
 *
 * Order cards within a section alphabetically by title. The one exception is
 * AI Security, where AIRS Platform leads because it is the product the other
 * two extend, AI Gateway follows, and AIRS Integrations trails because it is a
 * list of third-party hosts rather than a product of ours.
 *
 * Cards used to be ordered by descending link count, because the grid stretched
 * a two-link card to match an eleven-link neighbour and left a hole. That is now
 * handled in CSS: `.guide-catalog` sets `align-items: start`, so each card sizes
 * to its own content and any order reads cleanly.
 */

/* Section bands, alphabetical by label with Labs pinned last. These mirror the
 * bands in GLOBAL_NAV_GROUPS so the landing page and the left rail present the
 * same shape, and the filter chips are built from this order too.
 *
 * Alphabetical rather than curated, because a reader looking for a section
 * scans for its name. The previous order put Network Security first on the
 * grounds that most readers want it, which is true and did not help anyone
 * find Labs. Labs is the exception to the alphabet: it holds training material
 * you run in your own environment, so it follows the four guide sections
 * instead of landing second. build-catalog.js encodes that in
 * SECTION_PINNED_LAST and checks the order here against it.
 *
 * `overview` is the one page that introduces the whole section. It renders as
 * a link directly under the band heading, above the cards, because a section
 * overview is not a peer of the product families it explains and reads wrong
 * as another card among them. Only AI Security has one. */
var CATALOG_SECTIONS = [
  { id: 'ai-security',        label: 'AI Security',
    blurb: 'Prisma AIRS: securing LLM prompts, model artefacts, agent traffic, and the platforms your AI workloads already run on.',
    overview: { t: 'AI Overview', h: 'guides/airs/index.html',
                note: 'How API Intercept, Network Intercept, and Model Security divide the work' } },
  { id: 'network-security',   label: 'Network Security',
    blurb: 'Firewall deployment across the public clouds, the managed Cloud NGFW service, remote access, and branch hardware.' },
  { id: 'platform-identity',  label: 'Platform & Identity',
    blurb: 'Onboarding devices into Strata Cloud Manager, and wiring identity sources into policy.' },
  { id: 'reference',          label: 'Reference',
    blurb: 'Command trees and task-level lookups for administrators who already know the procedure.' },
  { id: 'labs',               label: 'Labs',
    blurb: 'Training material you run in your own environment, separate from the deployment guides.' }
];

/**
 * One entry per card. `section` must match a CATALOG_SECTIONS label, `accent`
 * must be an accent class defined in pan-guides.css, and every `links` entry
 * must resolve to a file on disk: build-catalog.js asserts all three.
 *
 * Sections appear here in the CATALOG_SECTIONS order, and cards within a
 * section alphabetically by title, AI Security excepted. build-catalog.js
 * asserts both.
 */
var CATALOG = [

  /* ── AI Security ───────────────────────────────────────────────────── */

  {
    id: 'airs', section: 'AI Security', accent: 'card-ai',
    badge: 'Prisma AIRS',
    title: 'AIRS Platform',
    blurb: 'API Intercept, Network Intercept, Model Security, and how they divide the work.',
    links: [
      { t: 'Platform overview', h: 'guides/airs/index.html', note: 'How the pieces fit, with diagrams' },
      { t: 'API Intercept', h: 'guides/airs/airs-api-intercept.html', note: 'Scan API, profiles, and keys' },
      { t: 'Network Intercept', h: 'guides/airs/airs-network-intercept.html', note: 'Inline inspection of AI traffic' },
      { t: 'Cloud deployment', h: 'guides/airs/airs-cloud-deployment.html', note: 'AWS, Azure, and GCP intercept' },
      { t: 'Kubernetes protection', h: 'guides/airs/airs-k8s-protection.html', note: 'Cluster-resident AI workloads' },
      { t: 'Microperimeter', h: 'guides/airs/airs-microperimeter.html', note: 'Per-workload enforcement' },
      { t: 'AI Model Security', h: 'guides/airs-model/airs-model-security.html', note: 'Scanning model artefacts' },
      { t: 'AI Red Teaming', h: 'guides/airs-red/airs-red-teaming.html', note: 'Adversarial testing of targets' },
      { t: 'Engagement Planner', h: 'guides/airs-planner/index.html', note: 'Scoping a customer engagement' }
    ]
  },

  {
    id: 'ai-gateway', section: 'AI Security', accent: 'card-ai',
    badge: 'Prisma AIRS',
    title: 'AI Gateway',
    blurb: 'Security and observability for LLM prompts, MCP interactions, and agent traffic.',
    links: [
      { t: 'Core deployment', h: 'guides/ai-gateway/ai-gateway-deployment.html', note: 'Start here for either model' },
      { t: 'Hybrid infrastructure', h: 'guides/ai-gateway/hybrid-infrastructure.html', note: 'Sizing, egress, prerequisites' },
      { t: 'EKS, AKS, and GKE', h: 'guides/ai-gateway/kubernetes-deployment.html', note: 'Helm install, tab per platform' },
      { t: 'ECS and Container Apps', h: 'guides/ai-gateway/serverless-deployment.html', note: 'Hybrid without Kubernetes' },
      { t: 'LLM API key management', h: 'guides/ai-gateway/llm-api-key-management.html', note: 'Vault, rotation, expiry alerting' },
      { t: 'Flow diagrams', h: 'guides/ai-gateway/diagrams/flow-diagrams-review.html', note: 'Request paths end to end' },
      { t: 'Streaming, caching, and A2A', h: 'guides/ai-gateway/streaming-caching-a2a.html', note: 'SSE guardrails, semantic cache, agents' },
      { t: 'Agent identity with Entra ID', h: 'guides/ai-gateway/agent-identity-entra.html', note: 'CIE sync, JWT claims, attribution' },
      { t: 'All AI Gateway guides', h: 'guides/ai-gateway/index.html', hub: true }
    ]
  },

  {
    id: 'ai-integrations', section: 'AI Security', accent: 'card-ai',
    badge: 'Prisma AIRS',
    title: 'AIRS Integrations',
    blurb: 'AIRS runtime scanning inside the platforms your AI workloads already run on.',
    links: [
      { t: 'Anthropic Claude Code', h: 'guides/airs-integrations/claude-code.html', note: 'Hooks, MCP server, or skill' },
      { t: 'OpenAI Codex CLI', h: 'guides/airs-integrations/codex-cli.html', note: 'Hooks with fail-closed enforcement' },
      { t: 'Cline, Cursor, and Windsurf', h: 'guides/airs-integrations/ide-assistants.html', note: 'IDE-native assistant hooks' },
      { t: 'LiteLLM Proxy', h: 'guides/airs-integrations/litellm.html', note: 'Callback-based prompt scanning' },
      { t: 'TrueFoundry AI Gateway', h: 'guides/airs-integrations/truefoundry.html', note: 'Guardrail plugin' },
      { t: 'Kong Gateway', h: 'guides/airs-integrations/kong.html', note: 'Plugin for v1 and v2 MCP' },
      { t: 'Microsoft Azure API Management', h: 'guides/airs-integrations/azure-apim.html', note: 'Inbound and outbound policy' },
      { t: 'Google Apigee', h: 'guides/airs-integrations/apigee.html', note: 'Shared flow and policy attach' },
      { t: 'GitHub Actions', h: 'guides/airs-integrations/github-actions.html', note: 'Model scanning before deploy' },
      { t: 'Jenkins Pipeline', h: 'guides/airs-integrations/jenkins.html', note: 'Model scanning as a stage gate' },
      { t: 'n8n Workflow Automation', h: 'guides/airs-integrations/n8n.html', note: 'Prompt and response nodes' },
      { t: 'Integration index and coverage matrix', h: 'guides/airs-integrations/index.html', hub: true }
    ]
  },

  /* ── Network Security ──────────────────────────────────────────────── */

  {
    id: 'branch', section: 'Network Security', accent: 'card-netsec',
    badge: 'Branch Hardware',
    title: 'Branch NGFW: ZTP, HA, and SD-WAN',
    blurb: 'Factory-fresh PA-410 hardware to SD-WAN AutoVPN, with no console configuration.',
    links: [
      { t: 'ZTP to HA and SD-WAN AutoVPN', h: 'guides/branch/branch-ngfw-ztp-ha-sdwan.html', note: 'Single firewall and HA pair paths' },
      { t: 'All branch guides', h: 'guides/branch/index.html', hub: true }
    ]
  },

  {
    id: 'cngfw', section: 'Network Security', accent: 'card-netsec',
    badge: 'Managed Service',
    title: 'Cloud NGFW',
    blurb: 'The managed service, driven from Panorama and Terraform or from the Azure portal.',
    links: [
      { t: 'Overview and deployment models', h: 'guides/cngfw/cloud-ngfw-deployment.html', note: 'Which model fits, and why' },
      { t: 'Cloud NGFW on AWS', h: 'guides/cngfw/cloud-ngfw-aws.html', note: 'Combined Design, GWLB, spokes' },
      { t: 'Cloud NGFW on Azure', h: 'guides/cngfw/cloud-ngfw-azure.html', note: 'Centralized VNet, Panorama policy' },
      { t: 'Azure with native rulestack', h: 'guides/cngfw/cloud-ngfw-azure-native.html', note: 'Portal deploy, SCM policy' }
    ]
  },

  {
    id: 'globalprotect', section: 'Network Security', accent: 'card-netsec',
    badge: 'Remote Access',
    title: 'GlobalProtect VPN',
    blurb: 'Panorama-managed remote access: certificates, authentication, gateway, portal, app.',
    links: [
      { t: 'GlobalProtect deployment', h: 'globalprotect/index.html', note: 'Infrastructure, auth, portal, app' },
      { t: 'Linear deployment guide', h: 'globalprotect/linear-guide.html', note: 'Single-pass walkthrough' }
    ]
  },

  {
    id: 'bootstrap', section: 'Network Security', accent: 'card-netsec',
    badge: 'Cross-Cloud',
    title: 'VM-Series Bootstrap',
    blurb: 'The four ways to bootstrap a VM-Series firewall on AWS, Azure, and GCP, compared.',
    links: [
      { t: 'VM-Series bootstrap methods', h: 'guides/bootstrap/vm-series-bootstrap.html', note: 'All four methods, one guide' }
    ]
  },

  {
    id: 'aws', section: 'Network Security', accent: 'card-aws',
    badge: 'Amazon Web Services',
    title: 'VM-Series on AWS',
    blurb: 'VM-Series behind a Gateway Load Balancer, with the Panorama plane that drives them.',
    links: [
      { t: 'VM-Series Deployment', h: 'guides/aws/vm-series-deployment.html', note: 'Network foundation through Day 2' },
      { t: 'Active/Passive HA', h: 'guides/aws/vm-series-ha-deployment.html', note: 'Cross-AZ failover, floating EIP' },
      { t: 'Panorama Deployment', h: 'guides/aws/panorama-deployment.html', note: 'VPC, EC2, EBS logging volumes' },
      { t: 'AWS Plugin for VPC Monitoring', h: 'guides/aws/aws-plugin-monitoring.html', note: 'IP-to-tag, Dynamic Address Groups' },
      { t: 'Gateway Load Balancer Teardown', h: 'guides/aws/gwlb-teardown-procedure.html', note: 'Ordered removal without orphans' },
      { t: 'All AWS guides', h: 'guides/aws/index.html', hub: true }
    ]
  },

  {
    id: 'azure', section: 'Network Security', accent: 'card-azure',
    badge: 'Microsoft Azure',
    title: 'VM-Series on Azure',
    blurb: 'VM-Series in the Common or Dedicated firewall model, sized and verified end to end.',
    links: [
      { t: 'VM-Series Deployment', h: 'guides/azure/vm-series-deployment.html', note: 'Common and Dedicated models' },
      { t: 'Active/Passive HA', h: 'guides/azure/vm-series-ha.html', note: 'Floating IP and route failover' },
      { t: 'Panorama Deployment', h: 'guides/azure/panorama-deployment.html', note: 'VNet, VM, NSG, first access' },
      { t: 'Phase 1: Prerequisites', h: 'guides/azure/azure-phase1-prerequisites.html', note: 'Subscriptions, quota, permissions' },
      { t: 'Pre-Deployment Questionnaire', h: 'guides/azure/azure-deployment-questionnaire.html', note: 'What to ask before you start' },
      { t: 'All Azure guides', h: 'guides/azure/index.html', hub: true }
    ]
  },

  {
    id: 'gcp', section: 'Network Security', accent: 'card-gcp',
    badge: 'Google Cloud',
    title: 'VM-Series on GCP',
    blurb: 'VM-Series in the ILB sandwich, common-firewall and dedicated-inbound topologies.',
    links: [
      { t: 'VM-Series Deployment', h: 'guides/gcp/vm-series-deployment.html', note: 'ILB sandwich, both topologies' },
      { t: 'Panorama Deployment', h: 'guides/gcp/panorama-deployment.html', note: 'VPC, Compute Engine, IAP access' },
      { t: 'All GCP guides', h: 'guides/gcp/index.html', hub: true }
    ]
  },

  {
    id: 'oci', section: 'Network Security', accent: 'card-oci',
    badge: 'Oracle Cloud',
    title: 'VM-Series on OCI',
    blurb: 'Hub-and-spoke Active/Active with a DRG, or Active/Passive with floating secondary IPs.',
    links: [
      { t: 'VM-Series Deployment', h: 'guides/oci/vm-series-deployment.html', note: 'Active/Active and Active/Passive' },
      { t: 'Panorama Deployment', h: 'guides/oci/panorama-deployment.html', note: 'Compartments, VCN, block volumes' },
      { t: 'All OCI guides', h: 'guides/oci/index.html', hub: true }
    ]
  },

  /* ── Platform & Identity ───────────────────────────────────────────── */

  {
    id: 'cie', section: 'Platform & Identity', accent: 'card-platform',
    badge: 'Identity',
    title: 'Cloud Identity Engine',
    blurb: 'Directory sync, SAML authentication, and identity-based policy in Panorama and SCM.',
    links: [
      { t: 'CIE implementation', h: 'guides/cloud-identity-engine/cie-implementation.html', note: 'Activation through MFA' },
      { t: 'Cloud tags', h: 'guides/cloud-identity-engine/cie-cloud-tags.html', note: 'Tag ingestion into policy' }
    ]
  },

  {
    id: 'scm', section: 'Platform & Identity', accent: 'card-platform',
    badge: 'Strata Cloud Manager',
    title: 'SCM Onboarding',
    blurb: 'Devices and administrators into Strata Cloud Manager, hardware through to SSO.',
    links: [
      { t: 'Firewall onboarding', h: 'scm-onboarding/index.html', note: 'Prerequisites through automation' },
      { t: 'Administrator SSO with Okta', h: 'scm-onboarding/okta-sso.html', note: 'SAML 2.0, tenant and role mapping' }
    ]
  },

  /* ── Reference ─────────────────────────────────────────────────────── */

  {
    id: 'firewall-cli', section: 'Reference', accent: 'card-ref',
    badge: 'PAN-OS 11.1',
    title: 'Firewall CLI Reference',
    blurb: 'The firewall command tree from live devices: 26,203 commands with example output.',
    links: [
      { t: 'Firewall CLI reference', h: 'guides/panorama-cli/firewall-cli-reference.html', note: 'Full tree, searchable' },
      { t: 'Configuration mode', h: 'guides/panorama-cli/firewall-cli-configuration.html', note: 'Config commands overview' },
      { t: 'Operational mode', h: 'guides/panorama-cli/firewall-cli-operational.html', note: 'show, request, test, debug' },
      { t: 'Config: set', h: 'guides/panorama-cli/firewall-cli-config-set.html' },
      { t: 'Config: delete', h: 'guides/panorama-cli/firewall-cli-config-delete.html' },
      { t: 'Config: copy', h: 'guides/panorama-cli/firewall-cli-config-copy.html' },
      { t: 'Config: rename', h: 'guides/panorama-cli/firewall-cli-config-rename.html' },
      { t: 'Config: other verbs', h: 'guides/panorama-cli/firewall-cli-config-other.html' },
      { t: 'Both command trees', h: 'guides/panorama-cli/panos-cli-reference.html', hub: true }
    ]
  },

  {
    id: 'panorama-cli', section: 'Reference', accent: 'card-ref',
    badge: 'PAN-OS 11.2',
    title: 'Panorama CLI Reference',
    blurb: 'The Panorama command tree, 510 commands, kept separate from the firewall tree.',
    links: [
      { t: 'Configuration mode', h: 'guides/panorama-cli/panorama-cli-configuration.html', note: 'Device groups, templates, stacks' },
      { t: 'Operational mode', h: 'guides/panorama-cli/panorama-cli-operational.html', note: 'Commit, push, log query' },
      { t: 'Both command trees', h: 'guides/panorama-cli/panos-cli-reference.html', hub: true }
    ]
  },

  {
    id: 'quick-ref', section: 'Reference', accent: 'card-ref',
    badge: 'Reference',
    title: 'Quick Reference Guides',
    blurb: 'Task-level breakouts for administrators who already know the procedure.',
    soon: true,
    links: []
  },

  /* ── Labs ──────────────────────────────────────────────────────────── */

  {
    id: 'labs', section: 'Labs', accent: 'card-lab',
    badge: 'Internal',
    title: 'AIRS MLOps Lab',
    blurb: 'Fine-tune a model on Vertex AI, ship it to Cloud Run, gate it with AIRS scanning.',
    links: [
      { t: 'Lab overview', h: 'labs/airs-mlops/index.html', note: 'What you build, and what it costs' },
      { t: 'How the lab works', h: 'labs/airs-mlops/how-it-works.html', note: 'The mentor model, and grading' },
      { t: 'Student setup', h: 'labs/airs-mlops/student-setup.html', note: 'Accounts, quota, and tooling' },
      { t: 'Modules', h: 'labs/airs-mlops/modules.html', note: 'All eight, with timings' },
      { t: 'Laboratorio en espa&ntilde;ol', h: 'labs/airs-mlops/es/index.html' },
      { t: 'Laborat&oacute;rio em portugu&ecirc;s', h: 'labs/airs-mlops/pt/index.html' }
    ]
  }
];

/**
 * Hub page cards.
 *
 * A hub page fronts one product family and gives each of its guides a card
 * with a description and an Open Guide button, so its cards are per-guide
 * where the landing page's are per-family. Both are generated from this file.
 *
 * `h` is relative to docs/, not to the hub page, so a card link can be checked
 * against the nav and the landing page without resolving seven different base
 * directories. The renderer converts it for output.
 *
 * `soon: true` marks a guide nobody has written yet. It renders with no link
 * at all. The two cards this replaced used `href="#"`, and one of them had
 * been calling a finished 3,152-line guide "Coming Soon".
 */
var HUBS = [

  {
    file: 'guides/aws/index.html',
    cards: [
      { accent: 'card-aws', badge: 'Panorama',
        title: 'Panorama Deployment',
        desc: 'Deploy Panorama management platform on AWS with Terraform. VPC setup, EC2 provisioning, EBS logging volumes, and initial configuration.',
        tags: ['Panorama', 'EC2', 'Terraform'],
        h: 'guides/aws/panorama-deployment.html' },
      { accent: 'card-aws', badge: 'VM-Series',
        title: 'VM-Series Deployment',
        desc: 'Full Day-0 through Day-2 walkthrough. Deploy, configure, harden, and operationally validate VM-Series firewalls with GWLB-based traffic inspection.',
        tags: ['VM-Series', 'GWLB', 'PAN-OS 11.x'],
        h: 'guides/aws/vm-series-deployment.html' },
      { accent: 'card-aws', badge: 'VM-Series HA',
        title: 'Active/Passive HA Deployment',
        desc: 'Deploy a pair of VM-Series firewalls in Active/Passive HA across two Availability Zones. Covers Security VPC design, S3 bootstrap, 5-interface layout, and IAM-based EIP and route table failover.',
        tags: ['VM-Series', 'Active/Passive HA', 'Cross-AZ', 'Terraform'],
        h: 'guides/aws/vm-series-ha-deployment.html' },
      { accent: 'card-aws', badge: 'Plugin',
        title: 'AWS Plugin for VPC Monitoring',
        desc: 'Configure the Panorama AWS Plugin to monitor EC2 instances, create IP-to-tag mappings, and enforce dynamic security policy through Dynamic Address Groups.',
        tags: ['Panorama Plugin', 'Dynamic Address Groups', 'IAM'],
        h: 'guides/aws/aws-plugin-monitoring.html' },
      { accent: 'card-aws', badge: 'GWLB',
        title: 'Gateway Load Balancer Teardown',
        desc: 'Step-by-step removal of GWLB endpoints, the endpoint service, and load balancer infrastructure. Ordered teardown with verification at each stage to avoid orphaned resources and route table black holes.',
        tags: ['GWLB', 'Teardown', 'VPC Endpoints'],
        cta: 'Open Procedure',
        h: 'guides/aws/gwlb-teardown-procedure.html' },
      { accent: 'card-aws', badge: 'Cloud NGFW',
        title: 'Cloud NGFW',
        desc: 'Deploy Cloud NGFW as a managed firewall service. Resource creation, rulestack configuration, and traffic steering.',
        tags: ['Cloud NGFW', 'Managed Service'],
        h: 'guides/cngfw/cloud-ngfw-aws.html' },
    ]
  },

  {
    file: 'guides/azure/index.html',
    cards: [
      { accent: 'card-azure', badge: 'Panorama',
        title: 'Panorama Deployment',
        desc: 'Deploy Panorama management platform on Azure with Terraform. VNet setup, VM provisioning, NSG configuration, and initial access with auto-generated credentials.',
        tags: ['Panorama', 'Virtual Machine', 'Terraform'],
        h: 'guides/azure/panorama-deployment.html' },
      { accent: 'card-azure', badge: 'VM-Series',
        title: 'VM-Series Deployment',
        desc: 'VM-Series deployment on Azure using Common or Dedicated firewall models. End-to-end guide from Panorama / SCM configuration through Terraform deployment to verified traffic inspection. <em>Skeleton: phase content pending.</em>',
        tags: ['VM-Series', 'Common Model', 'Dedicated Model', 'Terraform'],
        h: 'guides/azure/vm-series-deployment.html' },
      { accent: 'card-azure', badge: 'VM-Series',
        title: 'VM-Series Active/Passive HA',
        desc: 'Configure active/passive HA for VM-Series firewalls on Azure managed by Strata Cloud Manager. Covers Azure Service Principal setup, Secondary IP Move vs UDR failover modes, VM-Series plugin configuration, and SCM HA provisioning.',
        tags: ['VM-Series', 'High Availability', 'SCM', 'Active/Passive'],
        h: 'guides/azure/vm-series-ha.html' },
      { accent: 'card-azure', badge: 'Cloud NGFW',
        title: 'Cloud NGFW: Native Rulestack (SCM Managed)',
        desc: 'Deploy Cloud NGFW with native local rulestack via the Azure portal, then connect to Strata Cloud Manager for centralized security policy. Covers VNet and vWAN topologies, NAT, logging, and advanced security features.',
        tags: ['Cloud NGFW', 'Native Rulestack', 'SCM', 'Azure Portal'],
        h: 'guides/cngfw/cloud-ngfw-azure-native.html' },
      { accent: 'card-azure', badge: 'Prerequisites',
        title: 'Phase 1: Prerequisites',
        desc: 'One-time setup tasks to complete before configuring your management platform. Covers NGFW credit activation, deployment profiles, device certificates, Azure subscription readiness, and Terraform tooling, with a final checklist.',
        tags: ['Licensing', 'Terraform', 'Checklist'],
        cta: 'Open Document',
        h: 'guides/azure/azure-phase1-prerequisites.html' },
      { accent: 'card-azure', badge: 'Questionnaire',
        title: 'Pre-Deployment Questionnaire',
        desc: 'Fill-in questionnaire that collects the information needed to build and customize your Terraform deployment configuration: subscription details, existing infrastructure, network design, and firewall sizing.',
        tags: ['VM-Series', 'Terraform', 'Planning'],
        cta: 'Open Questionnaire',
        h: 'guides/azure/azure-deployment-questionnaire.html' },
    ]
  },

  {
    file: 'guides/gcp/index.html',
    cards: [
      { accent: 'card-gcp', badge: 'Panorama',
        title: 'Panorama Deployment',
        desc: 'Deploy Panorama management platform on Google Cloud with Terraform. VPC setup, Compute Engine provisioning, firewall rules, and access via public IP or IAP tunnel.',
        tags: ['Panorama', 'Compute Engine', 'Terraform'],
        h: 'guides/gcp/panorama-deployment.html' },
      { accent: 'card-gcp', badge: 'VM-Series',
        title: 'VM-Series Deployment',
        desc: 'Full Day-0 through Day-2 walkthrough. Deploy, configure, and verify VM-Series firewalls with ILB-based traffic inspection. Covers both common-firewall and dedicated-inbound topologies.',
        tags: ['VM-Series', 'ILB', 'VPC Peering', 'Terraform'],
        h: 'guides/gcp/vm-series-deployment.html' },
      { accent: 'card-gcp', badge: 'Cloud NGFW',
        title: 'Cloud NGFW',
        desc: 'Deploy Cloud NGFW as a managed firewall service. Resource creation, security profile configuration, and VPC integration.',
        tags: ['Cloud NGFW', 'Managed Service'],
        soon: true },
    ]
  },

  {
    file: 'guides/oci/index.html',
    cards: [
      { accent: 'card-oci', badge: 'Panorama',
        title: 'Panorama Deployment',
        desc: 'Deploy Panorama management platform on Oracle Cloud Infrastructure. Compartment and IAM setup, VCN and subnet provisioning, Compute instance sizing, block-volume logging storage, and access via public IP or bastion.',
        tags: ['Panorama', 'Compute', 'Block Volume', 'Terraform'],
        h: 'guides/oci/panorama-deployment.html' },
      { accent: 'card-oci', badge: 'VM-Series',
        title: 'VM-Series Deployment',
        desc: 'Full Day-0 through Day-2 walkthrough. Deploy, configure, and verify VM-Series firewalls with hub-and-spoke traffic inspection. Covers both the Active/Active Flexible NLB model and the Active/Passive built-in HA model.',
        tags: ['VM-Series', 'Flexible NLB', 'DRG', 'Terraform'],
        h: 'guides/oci/vm-series-deployment.html' },
    ]
  },

  {
    file: 'guides/branch/index.html',
    cards: [
      { accent: 'card-netsec', badge: 'PA-410 &middot; SCM &middot; SD-WAN',
        title: 'ZTP to HA and SD-WAN AutoVPN',
        desc: 'End-to-end guide: factory-fresh PA-410 hardware through Zero Touch Provisioning into Strata Cloud Manager, optionally formed into an Active/Passive HA pair, then joined to an existing SD-WAN AutoVPN cluster with an Azure hub. Zero local console configuration required.',
        tags: ['ZTP', 'Active/Passive HA', 'SD-WAN AutoVPN', 'Azure Hub', 'CG-NAT', 'SCM-Managed'],
        h: 'guides/branch/branch-ngfw-ztp-ha-sdwan.html' },
    ]
  },

  {
    file: 'guides/ai-gateway/index.html',
    cards: [
      { accent: 'card-ai', badge: 'Prisma AIRS',
        title: 'Prisma AIRS AI Gateway Deployment',
        desc: 'End-to-end deployment of the Prisma AIRS AI Gateway: flex credit licensing, SaaS or Hybrid data plane enablement, LLM integrations with workspace provisioning, budgets, rate limits, and model allowlists, plus guardrails and two-tier logging.</p> <p><strong>Start here whichever model you choose.</strong> Licensing, LLM integrations, MCP integrations, guardrails, and logging are identical for SaaS and Hybrid. Only the enablement phase differs, and it covers the SCM Gateway Registration wizard path in full.',
        tags: ['SCM', 'SaaS / Hybrid', 'Flex Credits', 'Guardrails', 'MCP'],
        h: 'guides/ai-gateway/ai-gateway-deployment.html' },
      { accent: 'card-ai', badge: 'Companion',
        title: 'Hybrid Infrastructure',
        desc: 'Infrastructure planning for a Hybrid data plane: what the Helm chart deploys, which platforms are viable, how to size the cluster, what egress the gateway needs, and the prerequisites for EKS, AKS, and on-premises VMware.',
        tags: ['Hybrid', 'Kubernetes', 'EKS / AKS', 'VMware', 'Sizing'],
        h: 'guides/ai-gateway/hybrid-infrastructure.html' },
      { accent: 'card-ai', badge: 'Companion',
        title: 'EKS, AKS, and GKE',
        desc: 'Deploying a Hybrid data plane on managed Kubernetes with Helm. Cluster preparation, the managed cache and log store, workload identity, the <code>values.yaml</code> file, the chart install, ingress, outbound connectivity to the management plane, and verification, with a tab per platform.',
        tags: ['Hybrid', 'Helm', 'EKS', 'AKS', 'GKE'],
        h: 'guides/ai-gateway/kubernetes-deployment.html' },
      { accent: 'card-ai', badge: 'Companion',
        title: 'ECS and Container Apps',
        desc: 'Deploying a Hybrid data plane without Kubernetes. Terraform-driven deployment on Amazon ECS and Azure Container Apps: architecture, secret preparation, the module configuration, ingress and TLS, outbound connectivity to the management plane, and verification.',
        tags: ['Hybrid', 'Terraform', 'ECS', 'Container Apps', 'PrivateLink'],
        h: 'guides/ai-gateway/serverless-deployment.html' },
      { accent: 'card-ai', badge: 'Companion',
        title: 'LLM API Key Management',
        desc: 'Secure key storage for customers who need a key management process in place before configuring the gateway: creating the key vault, storing provider API keys, giving the gateway an identity, granting access, retrieving secrets at runtime, and rotation with expiry alerting.',
        tags: ['Key Vault', 'Rotation', 'RBAC', 'Managed Identity'],
        h: 'guides/ai-gateway/llm-api-key-management.html' },
      { accent: 'card-ai', badge: 'Companion',
        title: 'Streaming, Semantic Caching, and A2A',
        desc: 'Three capabilities that change what the gateway can enforce and what it can see: server-sent event streaming and why an output guardrail can only report on it, semantic caching with its embedding provider and vector store, and the Agent Gateway for agent-to-agent traffic. Includes the support and roadmap position for each.',
        tags: ['Streaming', 'Guardrails', 'Semantic Cache', 'A2A', 'Agent Registry'],
        h: 'guides/ai-gateway/streaming-caching-a2a.html' },
      { accent: 'card-ai', badge: 'Companion',
        title: 'Agent Identity with Azure Entra ID',
        desc: 'How an AI agent\'s identity reaches the gateway and what the gateway does with it: Cloud Identity Engine directory sync into workspaces, the Entra app registration and JWKS configuration, gateway-local JWT validation, the <code>email_id</code> to <code>sub</code> to <code>uid</code> claim precedence, the single comparison that decides attribution, and where identity forwarding stops. Carries a full flow diagram and the canonical reference URLs.',
        tags: ['Entra ID', 'JWT', 'Cloud Identity Engine', 'Attribution', 'Directory Sync'],
        h: 'guides/ai-gateway/agent-identity-entra.html' },
    ]
  },

  {
    file: 'guides/airs-integrations/index.html',
    cards: [
      { accent: 'card-ai', badge: 'Claude Code',
        title: 'Anthropic Claude Code',
        group: 'coding',
        desc: 'Three integration methods for Claude Code: shell hooks for lifecycle interception, an MCP server for bidirectional scanning, and a Claude Code skill for on-demand security checks. Hooks provide the broadest coverage: prompt, pre-tool, and post-tool scanning.',
        tags: ['Hooks', 'MCP', 'Skill', 'Prompt', 'Tool Calls'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/claude-code.html' },
      { accent: 'card-ai', badge: 'Codex CLI',
        title: 'OpenAI Codex CLI',
        group: 'coding',
        desc: 'Hooks-based integration for OpenAI Codex CLI. Scans prompts, bash commands, MCP tool inputs/outputs, and post-stream final responses with fail-closed enforcement.',
        tags: ['Hooks', 'Prompt', 'Bash', 'MCP'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/codex-cli.html' },
      { accent: 'card-ai', badge: 'IDE Assistants',
        title: 'Cline, Cursor &amp; Windsurf',
        group: 'coding',
        desc: 'Hooks-based integrations for VS Code and IDE-native AI coding assistants. Each uses the platform\'s hook system to intercept prompts and tool calls with AIRS scanning. Covers Cline (VS Code extension), Cursor (IDE), and Windsurf (IDE).',
        tags: ['Hooks', 'VS Code', 'Prompt', 'Tool Calls'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/ide-assistants.html' },
      { accent: 'card-ai', badge: 'LiteLLM',
        title: 'LiteLLM Proxy',
        group: 'ai-gateways',
        desc: 'Native guardrails integration for LiteLLM Proxy. AIRS scans prompts pre-call or during-call, responses post-call, and MCP tool inputs pre-execution. Configuration-only: add a guardrail block to your <code>config.yaml</code>.',
        tags: ['Guardrails', 'Prompt', 'Response', 'MCP'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/litellm.html' },
      { accent: 'card-ai', badge: 'TrueFoundry',
        title: 'TrueFoundry AI Gateway',
        group: 'ai-gateways',
        desc: 'Middleware integration for TrueFoundry AI Gateway. AIRS scans prompts and responses with partial streaming support.',
        tags: ['Middleware', 'Prompt', 'Response'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/truefoundry.html' },
      { accent: 'card-ai', badge: 'Kong',
        title: 'Kong Gateway',
        group: 'api-gateways',
        desc: 'Three integration options: a custom Lua plugin (v1) for LLM-only traffic with full AI Gateway multi-provider support, an MCP-aware v2 plugin that also inspects tool calls and buffered SSE streams, and a Kong Konnect SaaS request callout for prompt-only scanning.',
        tags: ['Custom Plugin', 'MCP', 'Streaming', 'Multi-Provider'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/kong.html' },
      { accent: 'card-ai', badge: 'Azure APIM',
        title: 'Microsoft Azure API Management',
        group: 'api-gateways',
        desc: 'Policy fragment for Azure API Management configured as an AI Gateway. Dual-layer security scanning of prompts and responses using APIM\'s <code>send-request</code> policy to call the AIRS API inline.',
        tags: ['Policy Fragment', 'Prompt', 'Response'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/azure-apim.html' },
      { accent: 'card-ai', badge: 'Apigee',
        title: 'Google Apigee',
        group: 'api-gateways',
        desc: 'API proxy and SharedFlow integration for Google Apigee. Scans prompts and responses for Vertex AI and other LLM backends using Apigee\'s service callout policies.',
        tags: ['API Proxy', 'SharedFlow', 'Prompt', 'Response'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/apigee.html' },
      { accent: 'card-ai', badge: 'GitHub Actions',
        title: 'GitHub Actions',
        group: 'cicd',
        desc: 'Pre-deployment model file scanning using Prisma AIRS Model Security in GitHub Actions workflows. Detects malicious models, backdoors, and supply chain risks at the CI layer before models reach production.',
        tags: ['Model Security', 'CI/CD', 'Supply Chain'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/github-actions.html' },
      { accent: 'card-ai', badge: 'Jenkins',
        title: 'Jenkins Pipeline',
        group: 'cicd',
        desc: 'Declarative pipeline integration for Jenkins. Scans AI model files using AIRS Model Security as a pipeline stage, gating deployment on scan results.',
        tags: ['Model Security', 'CI/CD', 'Pipeline'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/jenkins.html' },
      { accent: 'card-ai', badge: 'n8n',
        title: 'n8n Workflow Automation',
        group: 'cicd',
        desc: 'Workflow node integration for n8n. Embed AIRS prompt and response scanning into AI-powered automation workflows using n8n\'s HTTP request nodes.',
        tags: ['Workflow', 'Prompt', 'Response'],
        cta: 'Implementation Guide',
        h: 'guides/airs-integrations/n8n.html' },
    ]
  },

];

/**
 * Nav targets that deliberately have no catalog link of their own, with the
 * reason. The build fails on any other nav target that is missing, so this
 * list is the only way to leave one out, and it has to be argued for.
 */
var CATALOG_NOT_CARDED = {
  // Empty, and worth keeping that way. Every one of the nav's 70 targets is
  // reachable from a card. An entry here is a guide a reader can find in the
  // rail but not on the landing page, so it needs a reason someone will
  // still agree with in six months.
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATALOG: CATALOG, CATALOG_SECTIONS: CATALOG_SECTIONS,
                     CATALOG_NOT_CARDED: CATALOG_NOT_CARDED, HUBS: HUBS };
}
