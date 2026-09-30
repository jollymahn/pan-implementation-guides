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
 * Order cards within a section by descending link count. Each section renders
 * as its own grid, and a two-link card sitting beside an eleven-link card
 * stretches to match it, leaving a hole.
 */

/* Section bands, in page order. These mirror the bands in GLOBAL_NAV_GROUPS
 * so the landing page and the left rail present the same shape. */
var CATALOG_SECTIONS = [
  { id: 'network-security',   label: 'Network Security',
    blurb: 'Firewall deployment across the public clouds, the managed Cloud NGFW service, remote access, and branch hardware.' },
  { id: 'ai-security',        label: 'AI Security',
    blurb: 'Prisma AIRS: securing LLM prompts, model artefacts, agent traffic, and the platforms your AI workloads already run on.' },
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
 * Cards are ordered by descending link count within a section, because each
 * section is its own grid and a short card stretches to match a tall
 * neighbour. Putting the tall ones first keeps the ragged edge at the bottom.
 */
var CATALOG = [

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
    id: 'bootstrap', section: 'Network Security', accent: 'card-netsec',
    badge: 'Cross-Cloud',
    title: 'VM-Series Bootstrap',
    blurb: 'The four ways to bootstrap a VM-Series firewall on AWS, Azure, and GCP, compared.',
    links: [
      { t: 'VM-Series bootstrap methods', h: 'guides/bootstrap/vm-series-bootstrap.html', note: 'All four methods, one guide' }
    ]
  },

  /* ── AI Security ───────────────────────────────────────────────────── */

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
      { t: 'All AI Gateway guides', h: 'guides/ai-gateway/index.html', hub: true }
    ]
  },

  /* ── Platform & Identity ───────────────────────────────────────────── */

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
  module.exports = { CATALOG: CATALOG, CATALOG_SECTIONS: CATALOG_SECTIONS, CATALOG_NOT_CARDED: CATALOG_NOT_CARDED };
}
