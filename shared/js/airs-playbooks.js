/* airs-playbooks.js — delivery playbooks projected from the guides.
 *
 * A playbook is the step-by-step delivery checklist behind one guide: every
 * collapsible step in the guide becomes one row, grouped under its phase, with
 * an owner, an effort estimate, and a milestone closing each phase. The same
 * structure also drives the meeting schedule and the attendee list, because a
 * phase gate is what a meeting exists to clear.
 *
 * Consumed by:
 *   docs/shared/js/playbook-download.js   the download bar on a guide page
 *   docs/guides/airs-planner/index.html   per-pillar playbook download
 *   docs/shared/scripts/check-playbooks.js  validates every row against the guide
 *
 * Effort. Every step carries `hours`, the base estimate for the task itself.
 * The generated workbook shows that figure and the planned figure beside it,
 * so a customer reading the sheet can see the contingency rather than find it
 * baked into a number that looks precise. Base effort rolls up to the pillar
 * duration in airs-engagement-model.js, and check-playbooks.js enforces that.
 *
 * Step headings. `heading` is the collapsible header text as it appears in the
 * guide, which is what lets the checker prove a row still points at a real
 * step. The guides carry no ids on collapsibles, so a row anchors at its
 * phase and names its step; that matches how the POV generator cites guides.
 */
(function (root, factory) {
  const model = (typeof module === 'object' && module.exports)
    ? require('./airs-engagement-model.js')
    : root.AIRSModel;
  const api = factory(model);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.AIRSPlaybooks = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (AIRSModel) {
  'use strict';

/* The contingency applied to every base estimate. One number, stated in the
 * workbook, so nobody has to reverse-engineer why a 4-hour task is planned at
 * 5.4. Changing it changes every playbook and every total. */
const MARGIN = 1.35;

/* A working day. Effort is authored in hours because a step is rarely a whole
 * day, and rolled up to days only for the phase and project totals. */
const HOURS_PER_DAY = 8;

/* Padded effort rounds up to the next half hour. Nobody books 2.7 hours, and
 * a figure that precise claims an accuracy the estimate does not have. Always
 * up, so the contingency is never rounded away. */
const QUANTUM = 0.5;
const ceilHalf = n => Math.ceil((n - 1e-9) / QUANTUM) * QUANTUM;

/* Customer-side personas, named exactly as airs-engagement-model.js names
 * them so the playbook's stakeholder column and the planner's persona sheet
 * are the same roster. check-playbooks.js fails on a name that is not in the
 * pillar's persona list, which is what stops the two drifting apart. */
const P = {
  sponsor: 'Project Sponsor',
  network: 'Network / Infrastructure Engineer',
  security: 'Security Lead',
  cloud: 'Cloud Account Admin',
  app: 'Application / Service Owner',
  k8s: 'K8s / Platform Engineer'
};

const SITE_BASE = 'https://jollymahn.github.io/pan-implementation-guides/';

/* PANW-side roles. The customer-side roster comes from the pillar's personas
 * in airs-engagement-model.js, so the two documents never disagree about who
 * the customer has to bring. */
const DELIVERY_ROLES = [
  { role: 'Professional Services Engineer', side: 'PANW', req: true,
    knowledge: 'AIRS deployment, PAN-OS configuration, cloud networking, Terraform',
    authority: 'Owns the build and signs off technical completion of each phase',
    risk: 'No delivery resource; the engagement cannot start' },
  { role: 'Project Manager', side: 'PANW', req: true,
    knowledge: 'Engagement scope, credit burn, schedule and milestone tracking',
    authority: 'Owns schedule, milestone sign-off, and change control',
    risk: 'Milestones slip without anyone tracking them; scope creep goes unchallenged' },
  { role: 'Solutions Architect', side: 'PANW', req: false,
    knowledge: 'Topology design, deployment model trade-offs, sizing',
    authority: 'Approves the architecture before build starts',
    risk: 'Topology decisions fall to the delivery engineer mid-build' }
];

// ── Network Intercept ────────────────────────────────────────────────────────

/* Phase 4 is the one place a guide step list branches: the Network Intercept
 * guide picks a deployment model and the steps themselves live in the Cloud
 * Deployment Guide. Rows carrying a `variant` are emitted only for the chosen
 * model, and each names the guide it came from so the citation stays honest. */
const CLOUD_GUIDE = 'docs/guides/airs/airs-cloud-deployment.html';

const NETWORK_INTERCEPT = {
  id: 'network-intercept',
  name: 'Network Intercept',
  pillar: 'network-intercept',
  guide: 'docs/guides/airs/airs-network-intercept.html',
  summary: 'Inspect AI traffic at the network layer with AIRS AI Runtime Firewalls, managed from Strata Cloud Manager or Panorama.',

  variants: {
    key: 'deploymentModel',
    label: 'Deployment model',
    note: 'Phase 4 steps come from the AIRS Cloud Deployment Guide and differ by model. Pick the model before downloading.',
    default: 'scm-terraform',
    options: [
      { id: 'scm-terraform', label: 'SCM Terraform Download', anchor: 'scm-terraform' },
      { id: 'auto-execute', label: 'Auto-Execute (AWS and Azure)', anchor: 'auto-execute' },
      { id: 'panorama-managed', label: 'Panorama-Managed', anchor: 'panorama-managed' }
    ]
  },

  /* Collapsibles inside a covered phase that are reference material rather
   * than a task. Listing them keeps check-playbooks.js able to fail on a step
   * that is genuinely new, which it cannot do if unmatched headings are just
   * ignored. A stale entry fails too, so the list cannot rot. */
  excludes: {
    'docs/guides/airs/airs-cloud-deployment.html#scm-terraform': [
      { heading: 'Dynamic Autoscaling Configuration', reason: 'Reference detail for Step 1.5, not a separate task' },
      { heading: 'AWS Egress Traffic Handling Scenarios', reason: 'Reference detail for Step 1.8, not a separate task' }
    ],
    'docs/guides/airs/airs-cloud-deployment.html#auto-execute': [
      { heading: 'Decommissioning Auto-Execute Firewalls', reason: 'Day-2 teardown procedure, outside a deployment playbook' }
    ]
  },

  phases: [
    {
      num: 1, title: 'Prerequisites', anchor: 'prerequisites',
      objective: 'Confirm licensing, access, and network readiness before any build work starts.',
      steps: [
        { heading: 'Step 1.1 — License Requirements', owner: 'CUSTOMER / PANW', hours: 2, who: [P.sponsor, P.cloud],
          task: 'Confirm the AIRS AI Runtime Security subscription, flex credit pool, and authcode in the Customer Support Portal' },
        { heading: 'Step 1.2 — Account Access', owner: 'CUSTOMER', hours: 3, who: [P.cloud],
          task: 'Provide TSG ID, region, and Strata Cloud Manager admin roles for the delivery team' },
        { heading: 'Step 1.3 — Network Requirements', owner: 'CUSTOMER', hours: 4, who: [P.network],
          task: 'Allowlist the required FQDNs and ports for firewall-to-cloud-service communication' },
        { heading: 'Step 1.4 — PAN-OS Version Requirements', owner: 'PANW', hours: 1, who: [P.network],
          task: 'Confirm the target PAN-OS version supports the AI security features in scope' },
        { heading: 'Step 1.5 — Cloud-Specific Prerequisites', owner: 'CUSTOMER', hours: 4, who: [P.cloud],
          task: 'Supply cloud account IDs, IAM roles or app registrations, and confirm instance quotas in the target regions' },
        { heading: 'Step 1.6 — Panorama Prerequisites (if using Panorama management)', owner: 'CUSTOMER / PANW', hours: 2, who: [P.network],
          task: 'Confirm Panorama version, licensing, and admin access, or record that the deployment is SCM-managed' }
      ],
      milestone: {
        name: 'Prerequisites Milestone',
        criteria: [
          'AIRS subscription active and credit pool confirmed in the Customer Support Portal',
          'TSG ID provisioned and delivery team holds SCM admin access',
          'Required FQDNs and ports allowlisted and reachable from the target subnets',
          'Cloud account IDs, IAM roles, and region quotas confirmed in writing',
          'Management platform decided: Strata Cloud Manager or Panorama'
        ]
      },
      meeting: {
        name: 'Kickoff and Prerequisites Review', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: ['Project Sponsor', 'Security Lead', 'Cloud Account Admin', 'Network / Infrastructure Engineer', 'Professional Services Engineer', 'Project Manager'],
        optional: ['Application / Service Owner', 'Solutions Architect'],
        agenda: [
          'Confirm scope, in-scope AI applications, and success criteria',
          'Walk the prerequisites checklist and assign an owner and date to each open item',
          'Confirm licensing state and credit allocation',
          'Agree the management platform: Strata Cloud Manager or Panorama',
          'Agree the change control process and available change windows'
        ]
      }
    },

    {
      num: 2, title: 'License Activation and Foundation', anchor: 'license-foundation',
      objective: 'Activate the license and logging tenant, and create the credentials the firewall needs to register.',
      steps: [
        { heading: 'Step 2.1 — Activate Your AIRS License', owner: 'CUSTOMER / PANW', hours: 2, who: [P.sponsor, P.cloud],
          task: 'Activate the AIRS license against the TSG and confirm it appears as active' },
        { heading: 'Step 2.2 — Activate Strata Logging Service', owner: 'CUSTOMER / PANW', hours: 2, who: [P.cloud, P.security],
          task: 'Activate Strata Logging Service in the correct region and confirm the instance is running' },
        { heading: 'Step 2.3 — Generate a Device Certificate', owner: 'PANW', hours: 1, who: [P.cloud],
          task: 'Generate the device certificate registration PIN and record its expiry' },
        { heading: 'Step 2.4 — Create a Deployment Profile', owner: 'PANW', hours: 1, who: [P.cloud],
          task: 'Create the deployment profile, associate it with the TSG, and apply the authcode' }
      ],
      milestone: {
        name: 'Foundation Milestone',
        criteria: [
          'AIRS license shows active against the correct TSG',
          'Strata Logging Service instance running in the agreed region',
          'Device certificate registration PIN generated and still within its validity window',
          'Deployment profile created and associated with the TSG'
        ]
      },
      meeting: {
        name: 'Activation Working Session', when: 'Start of Phase 2', position: 'before', minutes: 60,
        required: ['Cloud Account Admin', 'Professional Services Engineer'],
        optional: ['Project Sponsor', 'Security Lead'],
        agenda: [
          'Run license and Strata Logging Service activation together, live',
          'Confirm the logging region against the data residency requirement',
          'Record the device certificate PIN expiry and the date the firewall must register by'
        ]
      }
    },

    {
      num: 3, title: 'Cloud Account Onboarding and Discovery', anchor: 'cloud-onboarding',
      objective: 'Onboard the cloud accounts and establish what AI traffic actually exists before designing policy for it.',
      steps: [
        { heading: 'Step 3.1 — Navigate to Cloud Account Manager', owner: 'PANW', hours: 0.5, who: [P.cloud],
          task: 'Open Cloud Account Manager in Strata Cloud Manager and confirm the tenant is ready to onboard accounts' },
        { heading: 'Step 3.2 — Onboard Cloud Account', owner: 'PANW / CUSTOMER', hours: 4, who: [P.cloud],
          task: 'Onboard each AWS account or Azure subscription and confirm it reaches Active state' },
        { heading: 'Step 3.3 — Review Cloud Asset Map', owner: 'PANW / CUSTOMER', hours: 3, who: [P.cloud, P.network],
          task: 'Review the discovered VPCs, subnets, and workloads against the customer inventory and resolve gaps' },
        { heading: 'Step 3.4 — Analyze AI Traffic & Network Risk', owner: 'PANW / CUSTOMER', hours: 10, who: [P.app, P.security, P.network],
          task: 'Analyze discovered AI traffic, identify the models and endpoints in use, and agree which flows are in scope for inspection' },
        { heading: 'Step 3.5 — Configure Agent Discovery (Optional)', owner: 'PANW', hours: 4, who: [P.network],
          task: 'Deploy agent discovery where host-level visibility is needed, or record the decision to skip it' }
      ],
      milestone: {
        name: 'Discovery Milestone',
        criteria: [
          'Every in-scope cloud account shows Active in Cloud Account Manager',
          'Cloud Asset Map reconciled against the customer inventory, with gaps explained',
          'AI traffic inventory agreed: applications, models, and endpoints in scope for inspection',
          'Inspection points chosen for each in-scope flow',
          'Agent discovery deployed or explicitly descoped'
        ]
      },
      meeting: {
        name: 'Discovery Review and Topology Walkthrough', when: 'End of Phase 3', position: 'after', minutes: 90,
        required: ['Network / Infrastructure Engineer', 'Cloud Account Admin', 'Application / Service Owner', 'Professional Services Engineer'],
        optional: ['Security Lead', 'Solutions Architect'],
        agenda: [
          'Walk the Cloud Asset Map and confirm nothing in scope is missing',
          'Review discovered AI traffic: which applications call which models, and at what volume',
          'Agree which flows are inspected in this engagement and which are phase two',
          'Confirm the inspection point and routing change for each in-scope flow',
          'Identify any application owner whose traffic path changes and who has not yet been briefed'
        ]
      }
    },

    {
      num: 4, title: 'Deploy Firewall', anchor: 'deploy-firewall',
      objective: 'Deploy the AI Runtime Firewalls and steer the in-scope AI traffic through them.',
      note: 'The deployment steps themselves live in the AIRS Cloud Deployment Guide. Rows below follow the selected deployment model.',
      steps: [
        { heading: 'Step 4.1 — Select a Deployment Model', owner: 'PANW / CUSTOMER', hours: 4, who: [P.network, P.cloud],
          task: 'Select the deployment model against cloud provider, management platform, and who runs Terraform' },

        // SCM Terraform Download
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW', hours: 0.5, who: [P.cloud],
          heading: 'Step 1.1: Navigate to SCM AI Runtime Firewall',
          task: 'Open the AI Runtime Firewall deployment wizard in Strata Cloud Manager' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW', hours: 1, who: [P.network],
          heading: 'Step 1.2: Select Cloud Provider and Traffic Streams',
          task: 'Select the cloud provider and the traffic streams to inspect' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 1, who: [P.cloud, P.app],
          heading: 'Step 1.3: Select Region, Account, and Applications',
          task: 'Select the region, cloud account, and the applications to bring behind the firewall' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 2, who: [P.app, P.network],
          heading: 'Step 1.4: Configure Traffic Inspection',
          task: 'Configure which traffic directions are inspected and confirm the choice with the application owners' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW', hours: 2, who: [P.network],
          heading: 'Step 1.5: Configure Deployment Parameters',
          task: 'Set instance type, availability zones, and autoscaling parameters against the sizing estimate' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network],
          heading: 'Step 1.6: Configure IP Addressing',
          task: 'Allocate the CIDR ranges for the security VPC and confirm they do not overlap existing networks' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW', hours: 1, who: [P.cloud],
          heading: 'Step 1.7: Configure Licensing',
          task: 'Apply the deployment profile and authcode to the deployment' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW', hours: 1, who: [P.network],
          heading: 'Step 1.8: Configure Management Parameters',
          task: 'Set the management platform, device certificate PIN, and administrative credentials' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network],
          heading: 'Step 1.9: Review Architecture and Create Terraform Template',
          task: 'Review the generated architecture with the network team and download the Terraform template' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'CUSTOMER', hours: 1, who: [P.cloud],
          heading: 'Step 1.10: Accept Marketplace Subscription',
          task: 'Accept the cloud marketplace subscription for the VM-Series image' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 6, who: [P.cloud, P.network],
          heading: 'Step 1.11: Deploy security_project Terraform',
          task: 'Apply the security project Terraform and confirm the firewalls and load balancers come up healthy' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 4, who: [P.network, P.app],
          heading: 'Step 1.12: Deploy application_project Terraform',
          task: 'Apply the application project Terraform to steer the in-scope application traffic through the firewalls' },
        { variant: 'scm-terraform', guide: CLOUD_GUIDE, anchor: 'scm-terraform', owner: 'PANW', hours: 2, who: [P.network],
          heading: 'Step 1.13: Verify Firewall Connectivity',
          task: 'Confirm every firewall has registered with the management platform and reports connected' },

        // Auto-Execute
        { variant: 'auto-execute', guide: CLOUD_GUIDE, anchor: 'auto-execute', owner: 'PANW', hours: 0.5, who: [P.cloud],
          heading: 'Step 2.1: Navigate to SCM and Select Auto-Execute',
          task: 'Open the deployment wizard and select the Auto-Execute path' },
        { variant: 'auto-execute', guide: CLOUD_GUIDE, anchor: 'auto-execute', owner: 'PANW / CUSTOMER', hours: 1, who: [P.app, P.cloud],
          heading: 'Step 2.2: Select Applications',
          task: 'Select the applications from the Cloud Asset Map to bring behind the firewall' },
        { variant: 'auto-execute', guide: CLOUD_GUIDE, anchor: 'auto-execute', owner: 'PANW', hours: 2, who: [P.network],
          heading: 'Step 2.3: Configure Deployment Parameters',
          task: 'Set instance type, availability zones, and autoscaling parameters against the sizing estimate' },
        { variant: 'auto-execute', guide: CLOUD_GUIDE, anchor: 'auto-execute', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network],
          heading: 'Step 2.4: Configure IP Addressing',
          task: 'Allocate the CIDR ranges and confirm they do not overlap existing networks' },
        { variant: 'auto-execute', guide: CLOUD_GUIDE, anchor: 'auto-execute', owner: 'PANW', hours: 1.5, who: [P.cloud],
          heading: 'Step 2.5: Configure Licensing and Management',
          task: 'Apply the deployment profile, authcode, and management platform settings' },
        { variant: 'auto-execute', guide: CLOUD_GUIDE, anchor: 'auto-execute', owner: 'PANW / CUSTOMER', hours: 1, who: [P.network],
          heading: 'Step 2.6: Review and Deploy',
          task: 'Review the generated architecture with the network team and start the deployment' },
        { variant: 'auto-execute', guide: CLOUD_GUIDE, anchor: 'auto-execute', owner: 'PANW', hours: 3, who: [P.network],
          heading: 'Step 2.7: Monitor Deployment Progress',
          task: 'Monitor the orchestrated deployment to completion and resolve any provisioning failures' },
        { variant: 'auto-execute', guide: CLOUD_GUIDE, anchor: 'auto-execute', owner: 'PANW', hours: 2, who: [P.network],
          heading: 'Step 2.8: Verify Firewall Connectivity',
          task: 'Confirm every firewall has registered with the management platform and reports connected' },

        // Panorama-Managed
        { variant: 'panorama-managed', guide: CLOUD_GUIDE, anchor: 'panorama-managed', owner: 'PANW / CUSTOMER', hours: 6, who: [P.network],
          heading: 'Step 3.1: Prepare Panorama Prerequisites',
          task: 'Confirm Panorama version and licensing, and create the templates and device groups the firewalls will join' },
        { variant: 'panorama-managed', guide: CLOUD_GUIDE, anchor: 'panorama-managed', owner: 'PANW', hours: 2, who: [P.network],
          heading: 'Step 3.2: Configure Management as Panorama in SCM Wizard',
          task: 'Set Panorama as the management platform in the deployment wizard and supply the VM auth key' },
        { variant: 'panorama-managed', guide: CLOUD_GUIDE, anchor: 'panorama-managed', owner: 'PANW / CUSTOMER', hours: 6, who: [P.cloud, P.network],
          heading: 'Step 3.3: Run Terraform',
          task: 'Apply the Terraform and confirm the firewalls provision and bootstrap against Panorama' },
        { variant: 'panorama-managed', guide: CLOUD_GUIDE, anchor: 'panorama-managed', owner: 'CUSTOMER', hours: 1, who: [P.network],
          heading: 'Step 3.4: Add Firewall IP to Panorama Security Group (If Applicable)',
          task: 'Allow the firewall management addresses through to Panorama' },
        { variant: 'panorama-managed', guide: CLOUD_GUIDE, anchor: 'panorama-managed', owner: 'PANW', hours: 2, who: [P.network],
          heading: 'Step 3.5: Verify Firewall in Panorama',
          task: 'Confirm every firewall appears connected and in sync in Panorama' },

        { heading: 'Step 4.2 — Verify Firewall Connectivity', owner: 'PANW', hours: 2, who: [P.network],
          task: 'Run the common CLI verification and confirm the firewall is operational and passing the in-scope traffic' }
      ],
      milestone: {
        name: 'Deployment Milestone',
        criteria: [
          'Firewalls deployed in every in-scope region and reporting healthy',
          'Every firewall connected and in sync with the management platform',
          'Routing changed so the in-scope AI traffic traverses the inspection point',
          'Traffic confirmed arriving at the firewall in the session log',
          'Rollback path for the routing change documented and agreed'
        ]
      },
      meeting: {
        name: 'Deployment Change Window Briefing', when: 'Before the routing change', position: 'step',
        // The first irreversible action differs by deployment model.
        beforeStep: {
          'scm-terraform': 'Step 1.11: Deploy security_project Terraform',
          'auto-execute': 'Step 2.6: Review and Deploy',
          'panorama-managed': 'Step 3.3: Run Terraform'
        },
        minutes: 60,
        required: ['Network / Infrastructure Engineer', 'Cloud Account Admin', 'Professional Services Engineer', 'Project Manager'],
        optional: ['Project Sponsor', 'Security Lead', 'Application / Service Owner'],
        agenda: [
          'Confirm the change window and the approved change record',
          'Walk the routing change and the exact rollback steps',
          'Agree the rollback trigger and who is authorized to call it',
          'Confirm who is on the bridge and how they are reached',
          'Confirm whether a preemptive TAC case is needed for the window'
        ]
      }
    },

    {
      num: 5, title: 'Security Configuration', anchor: 'security-config',
      objective: 'Build and push the AI security policy that inspects the in-scope traffic.',
      steps: [
        { heading: 'Step 5.1 — Create an AI Security Profile', owner: 'PANW / CUSTOMER', hours: 4, who: [P.security],
          task: 'Create the AI Security Profile and agree the detection categories and actions with the security lead' },
        { heading: 'Step 5.2 — Configure Model Groups', owner: 'PANW / CUSTOMER', hours: 3, who: [P.security, P.app],
          task: 'Configure model groups covering the models found in discovery, including the handling of unknown models' },
        { heading: 'Step 5.3 — Configure Advanced Profile Settings', owner: 'PANW', hours: 3, who: [P.security],
          task: 'Set the advanced profile settings, including thresholds and any detections being tuned down for pilot' },
        { heading: 'Step 5.4 — Create a Security Profile Group', owner: 'PANW', hours: 1, who: [P.security],
          task: 'Create the security profile group and attach the AI Security Profile' },
        { heading: 'Step 5.5 — Create a Security Policy Rule', owner: 'PANW / CUSTOMER', hours: 3, who: [P.security, P.network],
          task: 'Create the security policy rule matching the in-scope AI traffic and attach the profile group' },
        { heading: 'Step 5.6 — Push Configuration', owner: 'PANW', hours: 1, who: [P.network],
          task: 'Push the configuration and confirm the commit succeeds on every firewall' }
      ],
      milestone: {
        name: 'Security Configuration Milestone',
        criteria: [
          'AI Security Profile created with detection categories and actions signed off by the security lead',
          'Model groups cover every model identified in discovery, and the unknown-model action is agreed',
          'Security policy rule matches the in-scope AI traffic with the profile group attached',
          'Configuration pushed and committed cleanly on every firewall',
          'Initial actions set to alert, with the date for the move to block agreed'
        ]
      },
      meeting: {
        name: 'Security Policy Design Review', when: 'Start of Phase 5', position: 'before', minutes: 90,
        required: ['Security Lead', 'Application / Service Owner', 'Professional Services Engineer'],
        optional: ['Network / Infrastructure Engineer', 'Project Sponsor'],
        agenda: [
          'Agree the detection categories to enable and the action for each',
          'Agree how unknown or unapproved models are handled',
          'Agree whether the pilot runs in alert or block, and the criteria for moving to block',
          'Confirm the latency budget each application owner can accept',
          'Agree the false positive handling path and who triages'
        ]
      }
    },

    {
      num: 6, title: 'Review Checkpoint', anchor: 'review-checkpoint',
      objective: 'Confirm every configuration element is in place before live traffic is tested.',
      steps: [
        { checklist: true, owner: 'PANW / CUSTOMER', hours: 0.5, who: [P.sponsor],
          heading: 'License active', task: 'Confirm the AIRS AI Runtime Firewall subscription shows active in the Customer Support Portal' },
        { checklist: true, owner: 'PANW / CUSTOMER', hours: 0.5, who: [P.cloud],
          heading: 'SLS active', task: 'Confirm the Strata Logging Service instance is running in the TSG in the correct region' },
        { checklist: true, owner: 'PANW', hours: 0.5, who: [P.network],
          heading: 'Device certificate', task: 'Confirm the device certificate status reads Valid on every firewall' },
        { checklist: true, owner: 'PANW', hours: 0.5, who: [P.cloud],
          heading: 'Deployment profile', task: 'Confirm the deployment profile is associated with the TSG and the authcode is consumed' },
        { checklist: true, owner: 'PANW', hours: 0.5, who: [P.cloud],
          heading: 'Cloud account(s) onboarded', task: 'Confirm every in-scope cloud account shows Active in Cloud Account Manager' },
        { checklist: true, owner: 'PANW', hours: 0.5, who: [P.network],
          heading: 'Firewall deployed', task: 'Confirm every firewall shows connected in Strata Cloud Manager or Panorama' },
        { checklist: true, owner: 'PANW', hours: 0.5, who: [P.security],
          heading: 'AI Security Profile', task: 'Confirm the AI Security Profile has model groups and protection settings configured' },
        { checklist: true, owner: 'PANW', hours: 0.5, who: [P.security],
          heading: 'Security Profile Group', task: 'Confirm the security profile group has the AI Security Profile attached' },
        { checklist: true, owner: 'PANW', hours: 0.5, who: [P.security],
          heading: 'Security Policy Rule', task: 'Confirm the security policy rule has the correct zones and the profile group attached' }
      ],
      milestone: {
        name: 'Go / No-Go Milestone',
        criteria: [
          'Every item on the pre-validation checklist confirmed',
          'Test traffic plan agreed and the test accounts or applications identified',
          'Rollback path still valid and agreed',
          'Go decision recorded with a named decision maker'
        ]
      },
      meeting: {
        name: 'Go / No-Go Readiness Call', when: 'End of Phase 6', position: 'after', minutes: 30,
        required: ['Project Sponsor', 'Security Lead', 'Network / Infrastructure Engineer', 'Professional Services Engineer', 'Project Manager'],
        optional: ['Application / Service Owner'],
        agenda: [
          'Walk the pre-validation checklist item by item',
          'Review any item still open and decide whether it blocks',
          'Confirm the validation window and who is available',
          'Record the go or no-go decision and the named decision maker'
        ]
      }
    },

    {
      num: 7, title: 'Validation and Verification', anchor: 'validation',
      objective: 'Prove the inspection works on real traffic, tune it, and hand it over.',
      steps: [
        { heading: 'Step 7.1 — Verify Firewall Health', owner: 'PANW', hours: 2, who: [P.network],
          task: 'Confirm firewall health, resource utilization, and management connectivity under load' },
        { heading: 'Step 7.2 — Generate Test Traffic', owner: 'PANW / CUSTOMER', hours: 4, who: [P.app, P.security],
          task: 'Generate representative AI traffic, including prompts that should trigger each enabled detection category' },
        { heading: 'Step 7.3 — Review AI Security Logs', owner: 'PANW / CUSTOMER', hours: 6, who: [P.security],
          task: 'Review the AI security logs, confirm detections fire as designed, and tune false positives' },
        { heading: 'Step 7.4 — Review SLR Reports', owner: 'PANW / CUSTOMER', hours: 4, who: [P.security, P.sponsor],
          task: 'Generate and walk the security lifecycle report with the security lead' },
        { heading: 'Step 7.5 — Verify Discovery Dashboard Updates', owner: 'PANW', hours: 2, who: [P.security],
          task: 'Confirm the discovery dashboards reflect the inspected traffic and the models in use' }
      ],
      milestone: {
        name: 'Validation and Handover Milestone',
        criteria: [
          'Every enabled detection category confirmed firing on test traffic',
          'False positive rate reviewed and accepted by the security lead',
          'AI security logs reaching Strata Logging Service and any SIEM integration',
          'Discovery dashboards reflecting the inspected traffic',
          'Runbooks delivered: policy tuning, scaling, upgrade, incident response',
          'Operations team signed off on knowledge transfer'
        ]
      },
      meeting: {
        name: 'Validation Review and Handover', when: 'End of Phase 7', position: 'after', minutes: 90,
        required: ['Security Lead', 'Security Operations Team', 'Network / Infrastructure Engineer', 'Project Sponsor', 'Professional Services Engineer', 'Project Manager'],
        optional: ['Application / Service Owner'],
        agenda: [
          'Walk the validation results against the success criteria agreed at kickoff',
          'Review detections fired, false positives found, and the tuning applied',
          'Walk the security lifecycle report',
          'Hand over the runbooks and confirm the operations team can act on an alert',
          'Agree the date for moving any alert-only detections to block',
          'Agree the scope of the next wave'
        ]
      }
    }
  ]
};

// ── AI Gateway, hybrid data plane on Kubernetes ──────────────────────────────

/* Customer-side personas for the AI Gateway pillar. Different list from
 * Network Intercept, because the model profiles each pillar separately. */
const G = {
  sponsor: 'Project Sponsor',
  aiml: 'AI / ML Platform Team',
  security: 'Security Lead',
  cloud: 'Cloud Account Admin',
  k8s: 'K8s / DevOps Lead'
};

const AIGW_GUIDE = 'docs/guides/ai-gateway/kubernetes-deployment.html';

/* The guide branches by platform with tabbed panels rather than by section,
 * so a variant here selects a `plane` and the checker scopes every row to the
 * matching panel. Rows outside the panels are carried under all three. */
const AIGW_KUBERNETES = {
  id: 'aigw-kubernetes',
  name: 'AI Gateway on Kubernetes',
  pillar: 'ai-gateway',
  guide: AIGW_GUIDE,
  summary: 'Deploy the AI Gateway hybrid data plane into a managed Kubernetes cluster, with the cache, log store, identity, ingress, and the outbound link to the management plane.',

  /* This guide builds the data plane. Application onboarding, provider
   * configuration, workspaces and guardrails are the AI Gateway deployment
   * guide's phases, so effort reconciles against the infrastructure slice of
   * the pillar rather than the whole of it. */
  modelPhases: [1, 3, 5],

  variants: {
    key: 'platform',
    label: 'Platform',
    note: 'The guide branches by platform. Cluster, cache, identity and ingress steps differ; the chart and verification steps do not.',
    default: 'eks',
    options: [
      { id: 'eks', label: 'AWS (EKS)', plane: 'eks' },
      { id: 'aks', label: 'Azure (AKS)', plane: 'aks' },
      { id: 'gke', label: 'Google Cloud (GKE)', plane: 'gke' }
    ]
  },

  excludes: {
    'docs/guides/ai-gateway/kubernetes-deployment.html#licensing': [
      { heading: 'See screenshots — the FORM stage field by field', reason: 'Screenshot group for the licensing steps, not a task' },
      { heading: 'See screenshots', reason: 'Screenshot group for the licensing steps, not a task' }
    ],
    'docs/guides/ai-gateway/kubernetes-deployment.html#start-here': [
      { heading: '0.1 — The vocabulary you need', reason: 'Orientation for first-time readers, not a delivery task' },
      { heading: '0.2 — What this costs, and how to stop paying', reason: 'Cost orientation, covered commercially before the engagement starts' }
    ]
  },

  phases: [
    {
      num: 1, title: 'Requirements and Licensing', anchor: 'requirements',
      objective: 'Size the deployment, license it, and open the gateway in Strata Cloud Manager.',
      steps: [
        { heading: 'Node sizing', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml, G.k8s],
          task: 'Size the cluster nodes against expected token throughput and agree the node pool specification' },
        { heading: 'Tooling', owner: 'CUSTOMER', hours: 1, who: [G.k8s],
          task: 'Confirm kubectl, Helm, and the cloud CLI are installed at supported versions on the build host' },
        { heading: 'What you request from Palo Alto Networks', owner: 'PANW / CUSTOMER', hours: 1, who: [G.sponsor],
          task: 'Raise the requests Palo Alto Networks has to fulfill: chart access, registry credentials, and tenant provisioning' },
        { anchor: 'licensing', heading: 'Licensing step 1: Size your license by monthly token consumption', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml, G.sponsor],
          task: 'Estimate monthly token consumption per application and size the license against it' },
        { anchor: 'licensing', heading: 'Licensing step 2: Create the deployment profile and allocate flex credits', owner: 'CUSTOMER / PANW', hours: 2, who: [G.sponsor],
          task: 'Create the deployment profile in the Customer Support Portal and allocate flex credits to it' },
        { anchor: 'licensing', heading: 'Licensing step 3: Map the deployment profile to a Tenant Service Group', owner: 'CUSTOMER / PANW', hours: 1, who: [G.cloud],
          task: 'Map the deployment profile to the Tenant Service Group and confirm the region' },
        { anchor: 'licensing', heading: 'Licensing step 4: Open the AI Gateway in Strata Cloud Manager', owner: 'PANW', hours: 0.5, who: [G.cloud],
          task: 'Open the AI Gateway in Strata Cloud Manager and confirm the tenant is provisioned' }
      ],
      milestone: {
        name: 'Licensing and Sizing Milestone',
        criteria: [
          'Token consumption estimate agreed and the license sized against it',
          'Deployment profile created with flex credits allocated',
          'Deployment profile mapped to the Tenant Service Group in the agreed region',
          'AI Gateway reachable in Strata Cloud Manager',
          'Node pool specification agreed and the cluster platform chosen'
        ]
      },
      meeting: {
        name: 'Kickoff and Sizing Session', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: [G.sponsor, G.aiml, G.k8s, 'Professional Services Engineer', 'Project Manager'],
        optional: [G.security, G.cloud, 'Solutions Architect'],
        agenda: [
          'Confirm which applications route through the gateway and their token volumes',
          'Agree the platform: EKS, AKS, or GKE, and whether the cluster already exists',
          'Agree node sizing and the cache and log store products to be used',
          'Decide the log store, which is a data residency decision: the default sends prompt and completion bodies to the US-hosted management plane and keeps the SCM log view complete, while a customer log store keeps bodies in region and leaves the SCM view metadata only',
          'Walk the licensing path and confirm who holds Customer Support Portal access',
          'Agree whether the outbound link is over the internet or a private endpoint'
        ]
      }
    },

    {
      num: 2, title: 'Cluster and Platform Prerequisites', anchor: 'start-here',
      objective: 'Stand up or confirm the cluster, and prepare the platform features the gateway depends on.',
      note: 'Steps differ by platform. An existing cluster makes most of section 0 a confirmation rather than a build.',
      steps: [
        // EKS
        { variant: 'eks', heading: '0.3 — Get an AWS account and find your way around the console', owner: 'CUSTOMER', hours: 2, who: [G.cloud],
          task: 'Confirm the AWS account, region, and console access for the build team' },
        { variant: 'eks', heading: '0.4 — Install the command line tools', owner: 'CUSTOMER', hours: 1, who: [G.k8s],
          task: 'Install the AWS CLI, eksctl, kubectl, and Helm on the build host' },
        { variant: 'eks', heading: '0.5 — Sign in from the terminal', owner: 'CUSTOMER', hours: 0.5, who: [G.k8s],
          task: 'Authenticate the CLI against the target account' },
        { variant: 'eks', heading: '0.6 — Confirm you have enough permission', owner: 'CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Confirm the build identity can create EKS clusters, IAM roles, and the supporting services' },
        { variant: 'eks', heading: '0.7 — Create the cluster', owner: 'PANW / CUSTOMER', hours: 4, who: [G.k8s],
          task: 'Create the EKS cluster and node group, or confirm the existing cluster meets the sizing agreed in Phase 1' },
        { variant: 'eks', heading: '0.8 — Point kubectl at the cluster', owner: 'CUSTOMER', hours: 0.5, who: [G.k8s],
          task: 'Write the kubeconfig entry and confirm kubectl reaches the cluster' },
        { variant: 'eks', anchor: 'cluster', heading: '1.1 — Set your environment variables', owner: 'PANW', hours: 0.5, who: [G.k8s],
          task: 'Set the environment variables the remaining commands depend on' },
        { variant: 'eks', anchor: 'cluster', heading: '1.2 — Confirm node count and sizing', owner: 'PANW / CUSTOMER', hours: 1, who: [G.k8s],
          task: 'Confirm the running node count and instance size match the sizing agreed in Phase 1' },
        { variant: 'eks', anchor: 'cluster', heading: '1.3 — Associate an IAM OIDC provider', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Associate the IAM OIDC provider so pods can assume roles' },
        { variant: 'eks', anchor: 'cluster', heading: '1.4 — Install the AWS Load Balancer Controller', owner: 'PANW', hours: 2, who: [G.k8s],
          task: 'Install the AWS Load Balancer Controller and confirm it reconciles' },

        // AKS
        { variant: 'aks', heading: '0.3 — Get an Azure subscription and find your way around the portal', owner: 'CUSTOMER', hours: 2, who: [G.cloud],
          task: 'Confirm the Azure subscription, region, and portal access for the build team' },
        { variant: 'aks', heading: '0.4 — Install the command line tools', owner: 'CUSTOMER', hours: 1, who: [G.k8s],
          task: 'Install the Azure CLI, kubectl, and Helm on the build host' },
        { variant: 'aks', heading: '0.5 — Sign in and select your subscription', owner: 'CUSTOMER', hours: 0.5, who: [G.k8s],
          task: 'Authenticate the CLI and select the target subscription' },
        { variant: 'aks', heading: '0.6 — Confirm you have enough permission', owner: 'CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Confirm the build identity can create AKS clusters, managed identities, and the supporting services' },
        { variant: 'aks', heading: '0.7 — Create the resource group and the cluster', owner: 'PANW / CUSTOMER', hours: 4, who: [G.k8s],
          task: 'Create the resource group and AKS cluster, or confirm the existing cluster meets the sizing agreed in Phase 1' },
        { variant: 'aks', heading: '0.8 — Point kubectl at the cluster', owner: 'CUSTOMER', hours: 0.5, who: [G.k8s],
          task: 'Write the kubeconfig entry and confirm kubectl reaches the cluster' },
        { variant: 'aks', anchor: 'cluster', heading: '1.1 — Set your environment variables', owner: 'PANW', hours: 0.5, who: [G.k8s],
          task: 'Set the environment variables the remaining commands depend on' },
        { variant: 'aks', anchor: 'cluster', heading: '1.2 — Confirm node count and sizing', owner: 'PANW / CUSTOMER', hours: 1, who: [G.k8s],
          task: 'Confirm the running node count and VM size match the sizing agreed in Phase 1' },
        { variant: 'aks', anchor: 'cluster', heading: '1.3 — Enable the OIDC issuer and workload identity', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud],
          task: 'Enable the OIDC issuer and workload identity on the cluster' },
        { variant: 'aks', anchor: 'cluster', heading: '1.4 — Enable the application routing add-on', owner: 'PANW', hours: 1.5, who: [G.k8s],
          task: 'Enable the application routing add-on for ingress' },

        // GKE
        { variant: 'gke', heading: '0.3 — Get a Google Cloud project and find your way around the console', owner: 'CUSTOMER', hours: 2, who: [G.cloud],
          task: 'Confirm the Google Cloud project, region, and console access for the build team' },
        { variant: 'gke', heading: '0.4 — Install the command line tools', owner: 'CUSTOMER', hours: 1, who: [G.k8s],
          task: 'Install the gcloud CLI, kubectl, and Helm on the build host' },
        { variant: 'gke', heading: '0.5 — Sign in and select your project', owner: 'CUSTOMER', hours: 0.5, who: [G.k8s],
          task: 'Authenticate the CLI and select the target project' },
        { variant: 'gke', heading: '0.6 — Enable the APIs and confirm your permission', owner: 'CUSTOMER', hours: 1.5, who: [G.cloud],
          task: 'Enable the required APIs and confirm the build identity can create clusters and service accounts' },
        { variant: 'gke', heading: '0.7 — Create the cluster', owner: 'PANW / CUSTOMER', hours: 4, who: [G.k8s],
          task: 'Create the GKE cluster, or confirm the existing cluster meets the sizing agreed in Phase 1' },
        { variant: 'gke', heading: '0.8 — Point kubectl at the cluster', owner: 'CUSTOMER', hours: 0.5, who: [G.k8s],
          task: 'Write the kubeconfig entry and confirm kubectl reaches the cluster' },
        { variant: 'gke', anchor: 'cluster', heading: '1.1 — Set your environment variables', owner: 'PANW', hours: 0.5, who: [G.k8s],
          task: 'Set the environment variables the remaining commands depend on' },
        { variant: 'gke', anchor: 'cluster', heading: '1.2 — Confirm node count and sizing', owner: 'PANW / CUSTOMER', hours: 1, who: [G.k8s],
          task: 'Confirm the running node count and machine type match the sizing agreed in Phase 1' },
        { variant: 'gke', anchor: 'cluster', heading: '1.3 — Confirm Workload Identity is enabled', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Confirm Workload Identity is enabled on the cluster and the node pool' },
        { variant: 'gke', anchor: 'cluster', heading: '1.4 — Create the regional managed proxy subnet', owner: 'PANW / CUSTOMER', hours: 2, who: [G.cloud],
          task: 'Create the regional managed proxy subnet the load balancer requires' }
      ],
      milestone: {
        name: 'Cluster Readiness Milestone',
        criteria: [
          'Cluster running with the agreed node count and instance size',
          'kubectl reaching the cluster from the build host',
          'Workload identity mechanism enabled: IRSA, Azure workload identity, or GKE Workload Identity',
          'Ingress prerequisite in place for the platform',
          'Build identity holds every permission the remaining phases need'
        ]
      }
    },

    {
      num: 3, title: 'Dependencies and Identity', anchor: 'dependencies',
      objective: 'Provision the cache and log store, and give the gateway an identity that can reach them.',
      steps: [
        // EKS
        { variant: 'eks', heading: '2.1 — Create the S3 log bucket', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Create the S3 bucket for gateway logs and confirm encryption and retention match policy' },
        { variant: 'eks', heading: '2.2 — Provision ElastiCache', owner: 'PANW / CUSTOMER', hours: 4, who: [G.cloud],
          task: 'Provision ElastiCache for Redis in the cluster VPC, attach a parameter group setting maxmemory-policy to noeviction, and confirm the gateway subnets can reach it' },
        { variant: 'eks', anchor: 'identity', heading: '3.1 — Create the IAM role', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud],
          task: 'Create the IAM role with the trust policy for the gateway service account' },
        { variant: 'eks', anchor: 'identity', heading: '3.2 — Attach the S3 policy', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Attach the S3 access policy scoped to the log bucket' },
        { variant: 'eks', anchor: 'identity', heading: '3.3 — Attach the ElastiCache and Bedrock policies', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Attach the ElastiCache and Bedrock policies the gateway needs' },

        // AKS
        { variant: 'aks', heading: '2.1 — Create the storage account and container', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Create the storage account and container for gateway logs, and confirm encryption and retention match policy' },
        { variant: 'aks', heading: '2.2 — Provision Azure Managed Redis', owner: 'PANW / CUSTOMER', hours: 4, who: [G.cloud],
          task: 'Provision Azure Managed Redis and confirm the cluster subnets can reach it' },
        { variant: 'aks', anchor: 'identity', heading: '3.1 — Create a user-assigned managed identity', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud],
          task: 'Create the user-assigned managed identity for the gateway' },
        { variant: 'aks', anchor: 'identity', heading: '3.2 — Federate the Kubernetes service account', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud],
          task: 'Federate the Kubernetes service account against the managed identity' },
        { variant: 'aks', anchor: 'identity', heading: '3.3 — Grant access to the container and the cache', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Grant the identity access to the log container and the cache' },

        // GKE
        { variant: 'gke', heading: '2.1 — Create the GCS log bucket', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Create the GCS bucket for gateway logs and confirm encryption and retention match policy' },
        { variant: 'gke', heading: '2.2 — Provision Memorystore', owner: 'PANW / CUSTOMER', hours: 4, who: [G.cloud],
          task: 'Provision Memorystore for Redis and confirm the cluster can reach it' },
        { variant: 'gke', anchor: 'identity', heading: '3.1 — Create the Google service account', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud],
          task: 'Create the Google service account for the gateway' },
        { variant: 'gke', anchor: 'identity', heading: '3.2 — Bind it to the Kubernetes service account', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud],
          task: 'Bind the Google service account to the Kubernetes service account through Workload Identity' },
        { variant: 'gke', anchor: 'identity', heading: '3.3 — Grant the project roles', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud],
          task: 'Grant the project roles the gateway needs for the bucket and the cache' }
      ],
      milestone: {
        name: 'Dependencies Milestone',
        criteria: [
          'Log store created with encryption and retention matching customer policy',
          'Cache provisioned and reachable from the cluster subnets, with maxmemory-policy set to noeviction',
          'Gateway identity created and federated to the Kubernetes service account',
          'Identity granted least-privilege access to the log store and the cache',
          'No long-lived static credential used anywhere in the deployment'
        ]
      }
    },

    {
      num: 4, title: 'Configure and Install', anchor: 'values',
      objective: 'Build values.yaml and install the chart.',
      steps: [
        { heading: '4.1 — The common block (all platforms)', owner: 'PANW', hours: 2, who: [G.k8s, G.aiml],
          task: 'Build the common values block: tenant, region, image, and service account' },
        { variant: 'eks', heading: '4.2 — The cache block', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Add the cache block pointing at ElastiCache' },
        { variant: 'eks', heading: '4.3 — The log store block', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Add the log store block pointing at the S3 bucket' },
        { variant: 'aks', heading: '4.2 — The cache block', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Add the cache block pointing at Azure Managed Redis' },
        { variant: 'aks', heading: '4.3 — The log store block', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Add the log store block pointing at the storage container' },
        { variant: 'gke', heading: '4.2 — The cache block', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Add the cache block pointing at Memorystore' },
        { variant: 'gke', heading: '4.3 — The log store block', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Add the log store block pointing at the GCS bucket' },
        { heading: '4.4 — Optional components (all platforms)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.aiml],
          task: 'Decide which optional components to enable and record why each is on or off' },
        { heading: '4.5 — Service type and health probes (all platforms)', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Set the service type and health probe configuration' },
        { heading: '4.6 — Availability settings the chart leaves off (all platforms)', owner: 'PANW / CUSTOMER', hours: 3, who: [G.k8s],
          task: 'Set replicas, resource requests, autoscaling, a disruption budget, and the preStop hook and grace period that stop a rolling upgrade dropping requests' },
        { anchor: 'install', heading: '5.1 — Add the repository and install', owner: 'PANW', hours: 2, who: [G.k8s],
          task: 'Add the Helm repository and install the chart with the completed values file' },
        { anchor: 'install', heading: '5.2 — Confirm the pods are running', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Confirm every pod reaches Running and no container is restarting' }
      ],
      milestone: {
        name: 'Installation Milestone',
        criteria: [
          'values.yaml complete and stored in version control',
          'Optional component choices recorded with a reason for each',
          'Chart installed at a pinned version',
          'Replicas above one, resource requests set, and a disruption budget in place',
          'preStop hook and termination grace period present on the running pod, not only in values.yaml',
          'All gateway pods Running with no restart loop',
          'Pod logs clean of cache and log store connection errors'
        ]
      },
      meeting: {
        name: 'Configuration Review', when: 'Before the chart is installed', position: 'step',
        beforeStep: '5.1 — Add the repository and install', minutes: 60,
        required: [G.k8s, G.aiml, 'Professional Services Engineer'],
        optional: [G.security, G.cloud],
        agenda: [
          'Walk values.yaml block by block against the sizing agreed at kickoff',
          'Confirm which optional components are enabled and why',
          'Confirm the chart version being pinned and the upgrade path from it',
          'Agree where values.yaml is stored and who can change it'
        ]
      }
    },

    {
      num: 5, title: 'Expose and Connect', anchor: 'ingress',
      objective: 'Publish the gateway to its callers and establish the outbound link to the management plane.',
      note: 'This phase changes network reachability. Treat it as a change window.',
      steps: [
        { variant: 'eks', heading: '6.1 — Choose ALB with an Ingress, or NLB with a Service', owner: 'PANW / CUSTOMER', hours: 2, who: [G.k8s, G.security],
          task: 'Choose between ALB with an Ingress and NLB with a Service, and apply the chosen manifest' },
        { variant: 'eks', heading: '6.2 — Restrict the source range', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.security],
          task: 'Restrict the load balancer source range to the networks allowed to call the gateway' },
        { variant: 'aks', heading: '6.1 — Create the NGINX ingress controller', owner: 'PANW', hours: 2.5, who: [G.k8s],
          task: 'Create the NGINX ingress controller and confirm it provisions an address' },
        { variant: 'aks', heading: '6.2 — Point the chart at the controller', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Point the chart at the ingress controller and confirm the route resolves' },
        { variant: 'gke', heading: '6.1 — Choose the Ingress or the Service', owner: 'PANW / CUSTOMER', hours: 2, who: [G.k8s, G.security],
          task: 'Choose between the Ingress and the Service, and apply the chosen manifest' },
        { variant: 'gke', heading: '6.2 — Restrict the source range', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.security],
          task: 'Restrict the load balancer source range to the networks allowed to call the gateway' },

        { anchor: 'connectivity', heading: '7.1 — Allow outbound egress (all platforms)', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security, G.k8s],
          task: 'Allow outbound 443 to api.portkey.ai, aigw.portkey.ai, albus.portkey.ai and registry.portkey.ai, and exempt *.portkey.ai from TLS inspection' },
        { anchor: 'connectivity', heading: '7.2 — Reach the management plane over the internet (all platforms)', owner: 'PANW / CUSTOMER', hours: 1, who: [G.security],
          task: 'Confirm the gateway reaches the management plane endpoints over the internet path' },
        { variant: 'eks', anchor: 'connectivity', heading: '7.3 — Private outbound over AWS PrivateLink', owner: 'PANW / CUSTOMER', hours: 6, who: [G.cloud, G.security],
          task: 'Confirm with the product team that the endpoint service accepts an SCM-managed gateway, then build the private outbound path, or record the decision to stay on the internet path. Do not start the build before the confirmation: the procedure is Portkey-sourced and unverified for Strata Cloud Manager' },
        { variant: 'aks', anchor: 'connectivity', heading: '7.3 — Private outbound over Azure Private Link', owner: 'PANW / CUSTOMER', hours: 6, who: [G.cloud, G.security],
          task: 'Confirm with the product team that the endpoint service accepts an SCM-managed gateway, then build the private outbound path, or record the decision to stay on the internet path. Do not start the build before the confirmation: the procedure is Portkey-sourced and unverified for Strata Cloud Manager' },
        { variant: 'gke', anchor: 'connectivity', heading: '7.3 — Private outbound over GCP Private Service Connect', owner: 'PANW / CUSTOMER', hours: 6, who: [G.cloud, G.security],
          task: 'Confirm with the product team that the endpoint service accepts an SCM-managed gateway, then build the private outbound path, or record the decision to stay on the internet path. Do not start the build before the confirmation: the procedure is Portkey-sourced and unverified for Strata Cloud Manager' },
        { anchor: 'connectivity', heading: '7.4 — Inbound is not supported with Strata Cloud Manager (all platforms)', owner: 'PANW / CUSTOMER', hours: 0.5, who: [G.security],
          task: 'Confirm with the security lead that inbound from the management plane is not required, since it is not supported' }
      ],
      milestone: {
        name: 'Connectivity Milestone',
        criteria: [
          'Gateway reachable from its intended callers and from nowhere else',
          'Source range restricted and verified from a denied network',
          'Outbound path to the management plane established and confirmed working',
          'Private endpoint built, or the decision to use the internet path recorded and accepted',
          'Rollback for the network change documented and agreed'
        ]
      },
      meeting: {
        name: 'Network Change Briefing', when: 'Before the ingress and egress changes', position: 'before', minutes: 60,
        required: [G.security, G.k8s, G.cloud, 'Professional Services Engineer', 'Project Manager'],
        optional: [G.sponsor],
        agenda: [
          'Confirm the change window and the approved change record',
          'Walk the ingress exposure and the source range being allowed',
          'Confirm the outbound decision: internet path or private endpoint',
          'Confirm inbound from the management plane is not required',
          'Agree the rollback steps and who can call them'
        ]
      }
    },

    {
      num: 6, title: 'Verify and Handover', anchor: 'verify',
      objective: 'Prove the gateway serves traffic and reaches the management plane, then hand it over.',
      steps: [
        { heading: '8.1 — Test the pod directly', owner: 'PANW', hours: 1, who: [G.k8s],
          task: 'Port-forward to a pod and confirm it answers a request without the load balancer in the path' },
        { heading: '8.2 — Test through the load balancer', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.k8s, G.aiml],
          task: 'Send a request through the load balancer from an allowed network and confirm the response' },
        { heading: '8.3 — Confirm the request reached the management plane', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml, G.security],
          task: 'Confirm the request appears in Strata Cloud Manager, and that body visibility matches the log store decision taken at kickoff' },
        { heading: '8.4 — Upgrade under traffic', owner: 'PANW / CUSTOMER', hours: 3, who: [G.k8s],
          task: 'Run a rolling upgrade under continuous load and confirm zero failed requests, which is what proves the preStop hook and grace period work' }
      ],
      milestone: {
        name: 'Verification and Handover Milestone',
        criteria: [
          'Pod answers a request directly',
          'Request through the load balancer succeeds from an allowed network and fails from a denied one',
          'Traffic visible in Strata Cloud Manager',
          'Log bodies land where the kickoff decision said they would: expanding in the SCM view on the default path, or in the customer bucket with the SCM view metadata only',
          'Rolling upgrade under continuous load completes with zero failed requests',
          'Scaling, upgrade, and teardown runbooks handed over',
          'Operations team signed off on knowledge transfer'
        ]
      },
      meeting: {
        name: 'Verification Review and Handover', when: 'End of Phase 6', position: 'after', minutes: 90,
        required: [G.aiml, G.k8s, G.security, G.sponsor, 'Professional Services Engineer', 'Project Manager'],
        optional: [G.cloud],
        agenda: [
          'Walk the verification results end to end',
          'Confirm logs are landing and are readable by the team that needs them',
          'Hand over the scaling, upgrade, and teardown runbooks',
          'Agree who operates the gateway and how an incident is raised',
          'Agree the scope of application onboarding, which this build does not cover'
        ]
      }
    }
  ]
};

// ── Network Intercept electives ──────────────────────────────────────────────

const AIRS_DIR = 'docs/guides/airs/';

/* K8s protection branches four ways at once: the cloud and management plane
 * pick a firewall configuration panel, and that choice also determines the
 * tag collector, IP-tag and traffic object panels. One variant therefore
 * selects a panel in each of four tab groups. */
const K8S_PROTECTION = {
  id: 'k8s-protection', name: 'Kubernetes and Container Protection',
  pillar: 'network-intercept', component: 'k8s-protection',
  guide: AIRS_DIR + 'airs-k8s-protection.html',
  summary: 'Extend AIRS inspection into Kubernetes with PAN-CNI, IP-tag harvesting, and dynamic address groups.',
  effortRange: [4, 7],
  effortNote: 'The component now estimates 3–5 days, which is the incremental work on top of Network Intercept, because the POV generator counts the parent pillar separately. This playbook is end to end: it also carries the prerequisites and the firewall interface, zone, router and NAT configuration the CNI depends on, which the incremental figure assumes are already done.',

  variants: {
    key: 'platform', label: 'Cloud and management plane',
    note: 'The cloud and management platform together select the firewall configuration, tag collector, IP-tag and traffic object steps. Tag collector applies to AWS and Azure only.',
    default: 'aws-scm',
    options: [
      { id: 'aws-scm', label: 'AWS, managed by SCM', planes: ['aws-scm', 'tc-aws', 'ip-tag-scm', 'to-scm'] },
      { id: 'aws-panorama', label: 'AWS, managed by Panorama', planes: ['aws-panorama', 'tc-aws', 'ip-tag-panorama', 'to-panorama'] },
      { id: 'azure-scm', label: 'Azure, managed by SCM', planes: ['azure-scm', 'tc-azure', 'ip-tag-scm', 'to-scm'] },
      { id: 'azure-panorama', label: 'Azure, managed by Panorama', planes: ['azure-panorama', 'tc-azure', 'ip-tag-panorama', 'to-panorama'] },
      { id: 'gcp-scm', label: 'GCP, managed by SCM', planes: ['gcp-scm', 'ip-tag-scm', 'to-scm'] },
      { id: 'gcp-panorama', label: 'GCP, managed by Panorama', planes: ['gcp-panorama', 'ip-tag-panorama', 'to-panorama'] }
    ]
  },

  phases: [
    { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
      objective: 'Confirm the firewall is in place and gather what the CNI needs.',
      steps: [
        { heading: 'Step 1.1: Verify Firewall Deployment and Connectivity', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network], task: 'Confirm the AIRS firewall is deployed, healthy, and reachable from the cluster network' },
        { heading: 'Step 1.2: Confirm Tooling and Cluster Access', owner: 'CUSTOMER', hours: 1.5, who: [P.k8s], task: 'Confirm kubectl, Helm, and cluster admin access for the delivery team' },
        { heading: 'Step 1.3: Confirm Version Requirements (Panorama Only)', owner: 'PANW / CUSTOMER', hours: 1, who: [P.network], task: 'Confirm Panorama and plugin versions, or record that the deployment is SCM-managed' },
        { heading: 'Step 1.4: Gather Pod and Service Subnet CIDRs', owner: 'CUSTOMER', hours: 1.5, who: [P.k8s, P.network], task: 'Gather the pod and service subnet CIDRs and confirm they do not overlap the firewall networks' }
      ],
      milestone: { name: 'Prerequisites Milestone', criteria: ['AIRS firewall healthy and reachable from the cluster network', 'Cluster admin access and tooling confirmed', 'Management platform confirmed: SCM or Panorama, at a supported version', 'Pod and service CIDRs documented with no overlap against firewall networks'] },
      meeting: {
        name: 'Kubernetes Protection Kickoff', when: 'Before Phase 1 work begins', position: 'before', minutes: 60,
        required: [P.k8s, P.network, P.security, 'Professional Services Engineer'],
        optional: [P.sponsor, P.cloud],
        agenda: [
          'Confirm which clusters and namespaces are in scope',
          'Agree the cloud and management platform combination',
          'Walk the pod and service CIDRs against the firewall networks',
          'Agree whether the tag collector is needed for this cluster',
          'Agree the change window for the pod restarts the CNI requires'
        ] } },

    { num: 2, title: 'Firewall Configuration', anchor: 'fw-configuration',
      objective: 'Configure the interfaces, zones, routing and policy the CNI depends on.',
      steps: [
        { variant: 'aws-scm', heading: 'Step 2.1: Configure Interfaces (AWS / SCM)', owner: 'PANW', hours: 2, who: [P.network], task: 'Configure the firewall data interfaces for the cluster traffic' },
        { variant: 'aws-scm', heading: 'Step 2.2: Create Zones (AWS / SCM)', owner: 'PANW', hours: 1, who: [P.network], task: 'Create the zones the cluster traffic is classified into' },
        { variant: 'aws-scm', heading: 'Step 2.3: Configure Logical Routers (AWS / SCM)', owner: 'PANW', hours: 2, who: [P.network], task: 'Configure the logical routers carrying the cluster subnets' },
        { variant: 'aws-scm', heading: 'Step 2.4: Create NAT Policy (AWS / SCM — Overlay Only)', owner: 'PANW', hours: 1.5, who: [P.network], task: 'Create the NAT policy for overlay networking, or record that it is not needed' },
        { variant: 'aws-scm', heading: 'Step 2.5: Create Security Policy (AWS / SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.security, P.network], task: 'Create the security policy for the cluster traffic' },
        { variant: 'aws-scm', heading: 'Step 2.6: Push Configuration (AWS / SCM)', owner: 'PANW', hours: 1, who: [P.network], task: 'Push the configuration and confirm the commit succeeds' },

        { variant: 'aws-panorama', heading: 'Step 2.1: Configure Interface (AWS / Panorama)', owner: 'PANW', hours: 2, who: [P.network], task: 'Configure the firewall data interface for the cluster traffic through Panorama' },
        { variant: 'aws-panorama', heading: 'Step 2.2: Create Zone (AWS / Panorama)', owner: 'PANW', hours: 1, who: [P.network], task: 'Create the zone the cluster traffic is classified into' },
        { variant: 'aws-panorama', heading: 'Step 2.3: Create Security Policy and Push (AWS / Panorama)', owner: 'PANW / CUSTOMER', hours: 3, who: [P.security, P.network], task: 'Create the security policy and push it from Panorama' },

        { variant: 'azure-scm', heading: 'Step 2.1: Configure Interfaces (Azure / SCM)', owner: 'PANW', hours: 2, who: [P.network], task: 'Configure the firewall data interfaces for the cluster traffic' },
        { variant: 'azure-scm', heading: 'Step 2.2: Configure Dual Logical Routers (Azure / SCM)', owner: 'PANW', hours: 2.5, who: [P.network], task: 'Configure the dual logical routers Azure requires' },
        { variant: 'azure-scm', heading: 'Step 2.3: Create NAT Policies (Azure / SCM)', owner: 'PANW', hours: 2, who: [P.network], task: 'Create the NAT policies for the cluster traffic' },
        { variant: 'azure-scm', heading: 'Step 2.4: Create Security Policy and Push (Azure / SCM)', owner: 'PANW / CUSTOMER', hours: 2.5, who: [P.security, P.network], task: 'Create the security policy and push the configuration' },

        { variant: 'azure-panorama', heading: 'Step 2.1–2.4: Configure Azure (Panorama)', owner: 'PANW / CUSTOMER', hours: 7, who: [P.security, P.network], task: 'Configure the Azure interfaces, routers, NAT and security policy through Panorama, and push' },

        { variant: 'gcp-scm', heading: 'Step 2.1: Configure Interfaces (GCP / SCM)', owner: 'PANW', hours: 2, who: [P.network], task: 'Configure the firewall data interfaces for the cluster traffic' },
        { variant: 'gcp-scm', heading: 'Step 2.2: Create Zones, Router, and Push (GCP / SCM)', owner: 'PANW / CUSTOMER', hours: 3.5, who: [P.security, P.network], task: 'Create the zones and router, add the security policy, and push the configuration' },

        { variant: 'gcp-panorama', heading: 'Step 2.1–2.2: Configure GCP (Panorama)', owner: 'PANW / CUSTOMER', hours: 5, who: [P.security, P.network], task: 'Configure the GCP interfaces, zones, router and security policy through Panorama, and push' }
      ],
      milestone: { name: 'Firewall Configuration Milestone', criteria: ['Data interfaces configured and up', 'Zones and routing carrying the cluster subnets', 'NAT policy in place where the networking model needs it', 'Security policy created and committed', 'Configuration pushed cleanly to every firewall'] } },

    { num: 3, title: 'PAN-CNI Installation', anchor: 'helm-install',
      objective: 'Install the CNI plugin and bring the application pods under it.',
      note: 'Step 3.6 restarts application pods. Treat this phase as a change window.',
      steps: [
        { heading: 'Step 3.1: Extract and Navigate to the Helm Chart', owner: 'PANW', hours: 0.5, who: [P.k8s], task: 'Extract the Helm chart and confirm its version' },
        { heading: 'Step 3.2: Review and Update values.yaml', owner: 'PANW / CUSTOMER', hours: 2, who: [P.k8s, P.network], task: 'Set values.yaml for the cluster, including the firewall address and the CIDRs gathered in Phase 1' },
        { heading: 'Step 3.3: Install the Helm Chart', owner: 'PANW / CUSTOMER', hours: 1.5, who: [P.k8s], task: 'Install the chart and confirm it completes without error' },
        { heading: 'Step 3.4: Verify Helm Installation', owner: 'PANW', hours: 1, who: [P.k8s], task: 'Confirm the PAN-CNI pods are running on every node' },
        { heading: 'Step 3.5: Annotate Namespaces and Pods', owner: 'PANW / CUSTOMER', hours: 2, who: [P.k8s, P.app], task: 'Annotate the namespaces and pods that are in scope for inspection' },
        { heading: 'Step 3.6: Restart Application Pods', owner: 'PANW / CUSTOMER', hours: 2, who: [P.k8s, P.app], task: 'Restart the annotated application pods so the CNI attaches, within the agreed change window' }
      ],
      milestone: { name: 'PAN-CNI Milestone', criteria: ['Chart installed at a pinned version with values committed to source control', 'PAN-CNI pods running on every node', 'Namespaces and pods annotated to match the agreed scope', 'Application pods restarted and healthy', 'Rollback confirmed: the chart can be removed and pods restarted back'] },
      meeting: {
        name: 'Pod Restart Change Briefing', when: 'Before the application pods are restarted', position: 'step',
        beforeStep: 'Step 3.6: Restart Application Pods', minutes: 45,
        required: [P.k8s, P.app, 'Professional Services Engineer', 'Project Manager'],
        optional: [P.network, P.sponsor],
        agenda: [
          'Confirm which namespaces and workloads restart, and in what order',
          'Confirm the change window and the approved change record',
          'Agree the rollback trigger and who calls it',
          'Confirm application owners are watching their own health checks'
        ] } },

    { num: 4, title: 'Tag Collector', anchor: 'tag-collector', skipWhenEmpty: true,
      objective: 'Deploy the tag collector where the cluster is private.',
      note: 'AWS and Azure only. The phase does not appear in a GCP playbook.',
      steps: [
        { variant: 'aws-scm', heading: 'Step 4.1: Create Tag Collector Deployment in SCM (AWS)', owner: 'PANW', hours: 1.5, who: [P.cloud], task: 'Create the tag collector deployment in Strata Cloud Manager' },
        { variant: 'aws-scm', heading: 'Step 4.2: Execute Tag Collector Terraform (AWS)', owner: 'PANW / CUSTOMER', hours: 3, who: [P.cloud, P.k8s], task: 'Apply the tag collector Terraform and confirm the collector comes up' },
        { variant: 'aws-scm', heading: 'Step 4.3: Configure TGW Attachments and Routes (AWS)', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network], task: 'Configure the transit gateway attachments and routes the collector needs' },
        { variant: 'aws-panorama', heading: 'Step 4.1: Create Tag Collector Deployment in SCM (AWS)', owner: 'PANW', hours: 1.5, who: [P.cloud], task: 'Create the tag collector deployment in Strata Cloud Manager' },
        { variant: 'aws-panorama', heading: 'Step 4.2: Execute Tag Collector Terraform (AWS)', owner: 'PANW / CUSTOMER', hours: 3, who: [P.cloud, P.k8s], task: 'Apply the tag collector Terraform and confirm the collector comes up' },
        { variant: 'aws-panorama', heading: 'Step 4.3: Configure TGW Attachments and Routes (AWS)', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network], task: 'Configure the transit gateway attachments and routes the collector needs' },
        { variant: 'azure-scm', heading: 'Step 4.1: Create Tag Collector Deployment in SCM (Azure)', owner: 'PANW', hours: 1.5, who: [P.cloud], task: 'Create the tag collector deployment in Strata Cloud Manager' },
        { variant: 'azure-scm', heading: 'Step 4.2: Configure and Execute Terraform (Azure)', owner: 'PANW / CUSTOMER', hours: 3.5, who: [P.cloud, P.k8s], task: 'Configure and apply the tag collector Terraform, and confirm the collector comes up' },
        { variant: 'azure-panorama', heading: 'Step 4.1: Create Tag Collector Deployment in SCM (Azure)', owner: 'PANW', hours: 1.5, who: [P.cloud], task: 'Create the tag collector deployment in Strata Cloud Manager' },
        { variant: 'azure-panorama', heading: 'Step 4.2: Configure and Execute Terraform (Azure)', owner: 'PANW / CUSTOMER', hours: 3.5, who: [P.cloud, P.k8s], task: 'Configure and apply the tag collector Terraform, and confirm the collector comes up' }
      ],
      milestone: { name: 'Tag Collector Milestone', criteria: ['Tag collector deployed and reporting, or explicitly descoped for this cluster', 'Network path from the collector to the firewall confirmed', 'Collector credentials held in the platform secret store'] } },

    { num: 5, title: 'IP Tag Harvesting', anchor: 'ip-tag-harvesting',
      objective: 'Harvest pod IP tags and turn them into policy that follows the workload.',
      steps: [
        { variant: 'aws-scm', heading: 'Step 5.1: Verify Tag Collector Mode (SCM)', owner: 'PANW', hours: 1, who: [P.network], task: 'Confirm the tag collector mode matches the cluster type' },
        { variant: 'aws-scm', heading: 'Step 5.2: Set SCM Region (SCM)', owner: 'PANW', hours: 0.5, who: [P.cloud], task: 'Set the SCM region for the harvesting configuration' },
        { variant: 'aws-scm', heading: 'Step 5.3: Configure Cluster Credentials (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.k8s, P.security], task: 'Configure the cluster credentials the harvester uses, scoped least-privilege' },
        { variant: 'aws-scm', heading: 'Step 5.4: Create Monitoring Definition and Commit (SCM)', owner: 'PANW', hours: 2, who: [P.network], task: 'Create the monitoring definition and commit it' },
        { variant: 'aws-scm', heading: 'Step 5.5: Configure Redistribution Agent in SCM', owner: 'PANW', hours: 2, who: [P.network], task: 'Configure the redistribution agent so tags reach every firewall that needs them' },
        { variant: 'aws-scm', heading: 'Step 5.6: Create Dynamic Address Groups (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.security], task: 'Create the dynamic address groups matching the harvested tags' },
        { variant: 'aws-scm', heading: 'Step 5.7: Create Security Policy with DAGs (SCM)', owner: 'PANW / CUSTOMER', hours: 2.5, who: [P.security], task: 'Create the security policy using the dynamic address groups' },

        { variant: 'azure-scm', heading: 'Step 5.1: Verify Tag Collector Mode (SCM)', owner: 'PANW', hours: 1, who: [P.network], task: 'Confirm the tag collector mode matches the cluster type' },
        { variant: 'azure-scm', heading: 'Step 5.2: Set SCM Region (SCM)', owner: 'PANW', hours: 0.5, who: [P.cloud], task: 'Set the SCM region for the harvesting configuration' },
        { variant: 'azure-scm', heading: 'Step 5.3: Configure Cluster Credentials (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.k8s, P.security], task: 'Configure the cluster credentials the harvester uses, scoped least-privilege' },
        { variant: 'azure-scm', heading: 'Step 5.4: Create Monitoring Definition and Commit (SCM)', owner: 'PANW', hours: 2, who: [P.network], task: 'Create the monitoring definition and commit it' },
        { variant: 'azure-scm', heading: 'Step 5.5: Configure Redistribution Agent in SCM', owner: 'PANW', hours: 2, who: [P.network], task: 'Configure the redistribution agent so tags reach every firewall that needs them' },
        { variant: 'azure-scm', heading: 'Step 5.6: Create Dynamic Address Groups (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.security], task: 'Create the dynamic address groups matching the harvested tags' },
        { variant: 'azure-scm', heading: 'Step 5.7: Create Security Policy with DAGs (SCM)', owner: 'PANW / CUSTOMER', hours: 2.5, who: [P.security], task: 'Create the security policy using the dynamic address groups' },

        { variant: 'gcp-scm', heading: 'Step 5.1: Verify Tag Collector Mode (SCM)', owner: 'PANW', hours: 1, who: [P.network], task: 'Confirm the tag collector mode matches the cluster type' },
        { variant: 'gcp-scm', heading: 'Step 5.2: Set SCM Region (SCM)', owner: 'PANW', hours: 0.5, who: [P.cloud], task: 'Set the SCM region for the harvesting configuration' },
        { variant: 'gcp-scm', heading: 'Step 5.3: Configure Cluster Credentials (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.k8s, P.security], task: 'Configure the cluster credentials the harvester uses, scoped least-privilege' },
        { variant: 'gcp-scm', heading: 'Step 5.4: Create Monitoring Definition and Commit (SCM)', owner: 'PANW', hours: 2, who: [P.network], task: 'Create the monitoring definition and commit it' },
        { variant: 'gcp-scm', heading: 'Step 5.5: Configure Redistribution Agent in SCM', owner: 'PANW', hours: 2, who: [P.network], task: 'Configure the redistribution agent so tags reach every firewall that needs them' },
        { variant: 'gcp-scm', heading: 'Step 5.6: Create Dynamic Address Groups (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.security], task: 'Create the dynamic address groups matching the harvested tags' },
        { variant: 'gcp-scm', heading: 'Step 5.7: Create Security Policy with DAGs (SCM)', owner: 'PANW / CUSTOMER', hours: 2.5, who: [P.security], task: 'Create the security policy using the dynamic address groups' },

        { variant: 'aws-panorama', heading: 'Step 5.1: Onboard Cluster in Panorama Kubernetes Plugin', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network, P.k8s], task: 'Onboard the cluster in the Panorama Kubernetes plugin' },
        { variant: 'aws-panorama', heading: 'Step 5.2: Add Notify Group and Monitoring Definition (Panorama)', owner: 'PANW', hours: 2.5, who: [P.network], task: 'Add the notify group and monitoring definition so tags reach the firewalls' },
        { variant: 'aws-panorama', heading: 'Step 5.3: Create Dynamic Address Group and Security Policy (Panorama)', owner: 'PANW / CUSTOMER', hours: 3, who: [P.security], task: 'Create the dynamic address groups and the security policy that uses them' },
        { variant: 'azure-panorama', heading: 'Step 5.1: Onboard Cluster in Panorama Kubernetes Plugin', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network, P.k8s], task: 'Onboard the cluster in the Panorama Kubernetes plugin' },
        { variant: 'azure-panorama', heading: 'Step 5.2: Add Notify Group and Monitoring Definition (Panorama)', owner: 'PANW', hours: 2.5, who: [P.network], task: 'Add the notify group and monitoring definition so tags reach the firewalls' },
        { variant: 'azure-panorama', heading: 'Step 5.3: Create Dynamic Address Group and Security Policy (Panorama)', owner: 'PANW / CUSTOMER', hours: 3, who: [P.security], task: 'Create the dynamic address groups and the security policy that uses them' },
        { variant: 'gcp-panorama', heading: 'Step 5.1: Onboard Cluster in Panorama Kubernetes Plugin', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network, P.k8s], task: 'Onboard the cluster in the Panorama Kubernetes plugin' },
        { variant: 'gcp-panorama', heading: 'Step 5.2: Add Notify Group and Monitoring Definition (Panorama)', owner: 'PANW', hours: 2.5, who: [P.network], task: 'Add the notify group and monitoring definition so tags reach the firewalls' },
        { variant: 'gcp-panorama', heading: 'Step 5.3: Create Dynamic Address Group and Security Policy (Panorama)', owner: 'PANW / CUSTOMER', hours: 3, who: [P.security], task: 'Create the dynamic address groups and the security policy that uses them' }
      ],
      milestone: { name: 'IP Tag Harvesting Milestone', criteria: ['Cluster credentials configured least-privilege and stored securely', 'Tags appearing on the firewall for running pods', 'Dynamic address groups populating from the harvested tags', 'Security policy written against the groups rather than against fixed addresses', 'Tag updates confirmed to follow a pod reschedule'] } },

    { num: 6, title: 'Traffic Objects and Validation', anchor: 'traffic-objects',
      objective: 'Create the traffic objects and prove enforcement works.',
      steps: [
        { variant: 'aws-scm', heading: 'Step 6.1: Create Traffic Object (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network, P.security], task: 'Create the traffic object for the cluster traffic, or record that it is not needed' },
        { variant: 'azure-scm', heading: 'Step 6.1: Create Traffic Object (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network, P.security], task: 'Create the traffic object for the cluster traffic, or record that it is not needed' },
        { variant: 'gcp-scm', heading: 'Step 6.1: Create Traffic Object (SCM)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network, P.security], task: 'Create the traffic object for the cluster traffic, or record that it is not needed' },
        { variant: 'aws-panorama', heading: 'Step 6.1: Create Traffic Object (Panorama)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network, P.security], task: 'Create the traffic object for the cluster traffic, or record that it is not needed' },
        { variant: 'azure-panorama', heading: 'Step 6.1: Create Traffic Object (Panorama)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network, P.security], task: 'Create the traffic object for the cluster traffic, or record that it is not needed' },
        { variant: 'gcp-panorama', heading: 'Step 6.1: Create Traffic Object (Panorama)', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network, P.security], task: 'Create the traffic object for the cluster traffic, or record that it is not needed' },

        { anchor: 'validation', heading: 'Validate PAN-CNI Pods', owner: 'PANW', hours: 1, who: [P.k8s], task: 'Confirm the PAN-CNI pods are healthy on every node' },
        { anchor: 'validation', heading: 'Validate IP Tag Harvesting', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network], task: 'Confirm tags appear for running pods and clear when pods go away' },
        { anchor: 'validation', heading: 'Validate Security Policy Enforcement', owner: 'PANW / CUSTOMER', hours: 2.5, who: [P.security, P.app], task: 'Generate pod traffic and confirm the policy enforces as designed' },
        { anchor: 'validation', heading: 'Validate Traffic Objects (If Configured)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [P.network], task: 'Confirm the traffic objects behave as designed, or record that none were configured' }
      ],
      milestone: { name: 'Validation and Handover Milestone', criteria: ['PAN-CNI healthy on every node', 'Tags following pods through a reschedule', 'Policy enforcing on real pod traffic', 'Traffic objects validated or explicitly descoped', 'Troubleshooting runbook handed over, including how to remove the CNI'] },
      meeting: {
        name: 'Validation Review and Handover', when: 'End of Phase 6', position: 'after', minutes: 60,
        required: [P.k8s, P.security, P.network, 'Professional Services Engineer', 'Project Manager'],
        optional: [P.app, P.sponsor],
        agenda: [
          'Walk the validation results, including a pod reschedule',
          'Confirm the operations team can read a tag and trace it to a pod',
          'Hand over the troubleshooting runbook and the CNI removal procedure',
          'Agree the date for moving any alert-only policy to block'
        ] } }
  ]
};

const MICROPERIMETER = {
  id: 'microperimeter', name: 'Microperimeter',
  pillar: 'network-intercept', component: 'microperimeter',
  guide: AIRS_DIR + 'airs-microperimeter.html',
  summary: 'Redirect workload traffic to an AIRS firewall with the Panredirect agent, using the hairpin pattern.',

  phases: [
    { num: 1, title: 'Prerequisites and Firewall Configuration', anchor: 'prerequisites',
      objective: 'Confirm platform support and prepare the firewall to receive redirected traffic.',
      steps: [
        { heading: 'Step 1.1: Verify Linux Distribution Support', owner: 'CUSTOMER', hours: 1, who: [P.app], task: 'Confirm the workload Linux distribution and kernel are supported' },
        { heading: 'Step 1.2: Verify Network Requirements', owner: 'CUSTOMER / PANW', hours: 1.5, who: [P.network], task: 'Confirm the workload can reach the firewall data interface and that the hairpin path is routable' },
        { heading: 'Step 1.3: Verify AIRS Firewall Deployment', owner: 'PANW / CUSTOMER', hours: 1, who: [P.network], task: 'Confirm the AIRS firewall is deployed and healthy' },
        { heading: 'Step 1.4: Download the Panredirect Package', owner: 'PANW', hours: 0.5, who: [P.app], task: 'Download the Panredirect package and confirm its version' },
        { anchor: 'firewall-config', heading: 'Step 2.1: Configure Dedicated L3 Data Interface', owner: 'PANW', hours: 1.5, who: [P.network], task: 'Configure the dedicated layer 3 data interface that receives redirected traffic' },
        { anchor: 'firewall-config', heading: 'Step 2.2: Attach Interface Management Profile', owner: 'PANW', hours: 0.5, who: [P.network], task: 'Attach the interface management profile that permits the health check' },
        { anchor: 'firewall-config', heading: 'Step 2.3: Create Firewall Security Policy for Redirected Traffic', owner: 'PANW / CUSTOMER', hours: 2, who: [P.security], task: 'Create the security policy that inspects the redirected traffic' }
      ],
      milestone: { name: 'Readiness Milestone', criteria: ['Workload distribution and kernel confirmed supported', 'Network path from workload to firewall confirmed routable', 'Dedicated L3 data interface configured with a management profile', 'Security policy created for the redirected traffic', 'Panredirect package downloaded at a known version'] },
      meeting: {
        name: 'Microperimeter Kickoff', when: 'Before Phase 1 work begins', position: 'before', minutes: 60,
        required: [P.app, P.network, P.security, 'Professional Services Engineer'],
        optional: [P.sponsor],
        agenda: [
          'Confirm which workloads are in scope and who owns them',
          'Walk the hairpin traffic pattern and confirm the network supports it',
          'Agree which traffic is redirected and which is excepted',
          'Agree the change window and the rollback path'
        ] } },

    { num: 2, title: 'Deploy the Redirector', anchor: 'deploy-redirector',
      objective: 'Install the agent on the workload and turn redirection on.',
      note: 'Enabling redirection changes the traffic path for the workload. Treat this as a change window.',
      steps: [
        { heading: 'Step 3.1: Install the Panredirect Package', owner: 'PANW / CUSTOMER', hours: 1.5, who: [P.app], task: 'Install the Panredirect package on the target workload' },
        { heading: 'Step 3.2: Configure Firewall Destination IP', owner: 'PANW', hours: 1, who: [P.app, P.network], task: 'Point the agent at the firewall data interface address' },
        { heading: 'Step 3.3: Enable Redirection on Target Interface', owner: 'PANW / CUSTOMER', hours: 1.5, who: [P.app, P.network], task: 'Enable redirection on the target interface, within the agreed change window' },
        { heading: 'Step 3.4: Verify Health Check', owner: 'PANW', hours: 1, who: [P.app], task: 'Confirm the agent health check reports the firewall reachable' },
        { heading: 'Step 3.5: Enable Persistence Across Reboots', owner: 'PANW / CUSTOMER', hours: 1, who: [P.app], task: 'Enable persistence so redirection survives a reboot, and confirm by rebooting once' }
      ],
      milestone: { name: 'Redirection Milestone', criteria: ['Agent installed and reporting healthy', 'Firewall destination configured and reachable', 'Redirection enabled on the target interface', 'Persistence confirmed by an actual reboot', 'Rollback confirmed: redirection can be disabled and traffic returns to its old path'] },
      meeting: {
        name: 'Redirection Change Briefing', when: 'Before redirection is enabled', position: 'step',
        beforeStep: 'Step 3.3: Enable Redirection on Target Interface', minutes: 45,
        required: [P.app, P.network, 'Professional Services Engineer', 'Project Manager'],
        optional: [P.security, P.sponsor],
        agenda: [
          'Confirm the change window and the approved change record',
          'Walk the exact command to disable redirection if the workload misbehaves',
          'Agree the rollback trigger and who calls it',
          'Confirm the application owner is watching their own health checks'
        ] } },

    { num: 3, title: 'Steering Rules and Validation', anchor: 'steering-rules',
      objective: 'Tune what gets redirected, then prove inspection and exceptions both work.',
      steps: [
        { heading: 'Step 4.1: Understand Default Behavior and Rule Structure', owner: 'PANW / CUSTOMER', hours: 0.5, who: [P.app, P.network], task: 'Walk the default redirect behavior and the rule structure' },
        { heading: 'Step 4.2: Add Exception Rules for Management Traffic', owner: 'PANW / CUSTOMER', hours: 1.5, who: [P.network, P.security], task: 'Except management and monitoring traffic so the workload stays reachable' },
        { heading: 'Step 4.3: Add Targeted Redirect Rules', owner: 'PANW / CUSTOMER', hours: 1.5, who: [P.security], task: 'Add the targeted redirect rules for the traffic in scope' },
        { heading: 'Step 4.4: Delete Rules', owner: 'PANW', hours: 0.5, who: [P.app], task: 'Confirm how a rule is removed, so the team can undo a change safely' },
        { anchor: 'validation', heading: 'Step 5.1: Verify Agent Status and Health', owner: 'PANW', hours: 1, who: [P.app], task: 'Confirm the agent status and health output is clean' },
        { anchor: 'validation', heading: 'Step 5.2: Generate Test Traffic', owner: 'PANW / CUSTOMER', hours: 1.5, who: [P.app], task: 'Generate test traffic and confirm it reaches the firewall' },
        { anchor: 'validation', heading: 'Step 5.3: Verify Security Policy Enforcement', owner: 'PANW / CUSTOMER', hours: 2, who: [P.security], task: 'Confirm the security policy enforces on the redirected traffic' },
        { anchor: 'validation', heading: 'Step 5.4: Verify Steering Rules', owner: 'PANW / CUSTOMER', hours: 1.5, who: [P.network], task: 'Confirm excepted traffic bypasses and targeted traffic redirects' }
      ],
      milestone: { name: 'Validation and Handover Milestone', criteria: ['Management traffic excepted and the workload still reachable out of band', 'Targeted traffic redirecting to the firewall', 'Security policy enforcing on redirected traffic', 'Steering rules behaving as written, both the exceptions and the redirects', 'Diagnostic bundle and uninstall procedure handed over'] },
      meeting: {
        name: 'Validation Review and Handover', when: 'End of Phase 3', position: 'after', minutes: 60,
        required: [P.app, P.security, P.network, 'Professional Services Engineer'],
        optional: [P.sponsor],
        agenda: [
          'Walk the validation results, exceptions and redirects separately',
          'Confirm the workload owner can disable redirection without help',
          'Hand over the diagnostic bundle procedure and the uninstall steps',
          'Agree who watches the firewall logs for this workload'
        ] } }
  ]
};

// ── API Intercept ────────────────────────────────────────────────────────────

/* Personas for API Intercept, named as the engagement model names them. */
const I = {
  sponsor: 'Project Sponsor',
  api: 'API Platform / Gateway Team',
  security: 'Security Lead',
  dev: 'Application Developer / Owner',
  devops: 'K8s / DevOps Engineer',
  cloud: 'Cloud Account Admin'
};

const API_INTERCEPT = {
  id: 'api-intercept', name: 'API Intercept', pillar: 'api-intercept',
  guide: AIRS_DIR + 'airs-api-intercept.html',
  summary: 'Inspect AI API calls inline by calling the AIRS scan API from the application or its gateway.',
  effortRange: [10, 14],
  effortNote: 'The pillar estimate of 14–17 days assumes a rollout across a portfolio of applications. This guide takes one integration pattern end to end, so its own step list is shorter. Multiply the Phase 5 rows by the number of applications being onboarded.',

  phases: [
    { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
      objective: 'Confirm licensing, access, and the network path to the scan API.',
      steps: [
        { heading: 'Step 1.1 — License Requirements', owner: 'CUSTOMER / PANW', hours: 2, who: [I.sponsor], task: 'Confirm the AIRS subscription and credit allocation covers the expected scan volume' },
        { heading: 'Step 1.2 — Account Access', owner: 'CUSTOMER', hours: 3, who: [I.cloud], task: 'Provide TSG ID, region, and Strata Cloud Manager admin roles for the delivery team' },
        { heading: 'Step 1.3 — Network Requirements', owner: 'CUSTOMER', hours: 4, who: [I.api, I.security], task: 'Allow outbound access from the calling applications to the regional AIRS scan endpoint' },
        { heading: 'Step 1.4 — Cloud Account Prerequisites (for Discovery)', owner: 'CUSTOMER', hours: 3, who: [I.cloud], task: 'Supply the cloud account details discovery needs, or record that discovery is out of scope' }
      ],
      milestone: { name: 'Prerequisites Milestone', criteria: ['Subscription and credits confirmed against expected scan volume', 'TSG provisioned and delivery team holds admin access', 'Outbound path to the regional scan endpoint open and tested', 'Applications in scope listed with an owner for each', 'Discovery either scoped in with cloud accounts supplied, or scoped out'] },
      meeting: {
        name: 'Kickoff and Integration Planning', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: [I.sponsor, I.api, I.security, 'Professional Services Engineer', 'Project Manager'],
        optional: [I.dev, I.cloud, 'Solutions Architect'],
        agenda: [
          'Confirm which applications are in scope and who owns each',
          'Agree where the scan call is made: in the application, or at a gateway',
          'Agree synchronous or asynchronous scanning per application',
          'Confirm expected scan volume against the credit allocation',
          'Agree the latency budget each application owner will accept'
        ] } },

    { num: 2, title: 'License Activation', anchor: 'license-activation',
      objective: 'Activate the license and logging tenant.',
      steps: [
        { heading: 'Step 2.1 — Activate Your AIRS License', owner: 'CUSTOMER / PANW', hours: 2, who: [I.sponsor, I.cloud], task: 'Activate the AIRS license against the TSG and confirm it shows active' },
        { heading: 'Step 2.2 — Activate Strata Logging Service', owner: 'CUSTOMER / PANW', hours: 2, who: [I.cloud, I.security], task: 'Activate Strata Logging Service in the correct region' },
        { heading: 'Step 2.3 — Generate a Device Certificate', owner: 'PANW', hours: 1, who: [I.cloud], task: 'Generate the device certificate and record its expiry' },
        { heading: 'Step 2.4 — Create a Deployment Profile', owner: 'PANW', hours: 1, who: [I.cloud], task: 'Create the deployment profile and associate it with the TSG' }
      ],
      milestone: { name: 'Activation Milestone', criteria: ['License active against the correct TSG', 'Strata Logging Service running in the agreed region', 'Device certificate valid', 'Deployment profile created and associated'] } },

    { num: 3, title: 'Security Profile and API Key', anchor: 'security-profile',
      objective: 'Onboard API Intercept and issue the credential applications will use.',
      steps: [
        { heading: 'Step 3.1 — Onboard API Intercept in SCM', owner: 'PANW', hours: 2, who: [I.cloud], task: 'Onboard API Intercept in Strata Cloud Manager' },
        { heading: 'Step 3.2 — Create an AI Security Profile', owner: 'PANW / CUSTOMER', hours: 4, who: [I.security], task: 'Create the AI Security Profile and agree the detection categories and actions' },
        { heading: 'Step 3.3 — Generate an API Key', owner: 'PANW / CUSTOMER', hours: 1.5, who: [I.security], task: 'Generate the API key and agree where applications read it from' }
      ],
      milestone: { name: 'Security Profile Milestone', criteria: ['API Intercept onboarded in Strata Cloud Manager', 'Security profile created with detection categories signed off by the security lead', 'API key issued and held in a secret store, not in application source', 'Initial actions set to alert, with the date for the move to block agreed'] } },

    { num: 4, title: 'Cloud Onboarding and Discovery', anchor: 'cloud-onboarding',
      objective: 'Onboard cloud accounts so discovery can show what is actually calling AI.',
      steps: [
        { heading: 'Step 4.1 — Navigate to Cloud Account Manager', owner: 'PANW', hours: 0.5, who: [I.cloud], task: 'Open Cloud Account Manager and confirm the tenant is ready' },
        { heading: 'Step 4.2 — Cloud-Specific Onboarding', owner: 'PANW / CUSTOMER', hours: 5, who: [I.cloud], task: 'Onboard each cloud account using the path for its provider' },
        { heading: 'Step 4.3 — Verify Cloud Account Status', owner: 'PANW', hours: 1.5, who: [I.cloud], task: 'Confirm every onboarded account reaches Active' }
      ],
      milestone: { name: 'Onboarding Milestone', criteria: ['Every in-scope cloud account onboarded and Active', 'Discovery populating with real assets', 'Account list reconciled against the customer inventory'] } },

    { num: 5, title: 'API Integration', anchor: 'api-integration',
      objective: 'Wire the scan call into the applications.',
      note: 'The long pole. Multiply these rows by the number of applications being onboarded.',
      steps: [
        { heading: 'Step 6.1 — Scan API Request Format', owner: 'PANW / CUSTOMER', hours: 3, who: [I.dev, I.api], task: 'Walk the request format with the developers who will build the call' },
        { heading: 'Step 6.2 — Scan API Response Format', owner: 'PANW / CUSTOMER', hours: 3, who: [I.dev, I.api], task: 'Walk the response format and agree how each verdict is handled in the application' },
        { heading: 'Step 6.3 — Integration Pattern: Python', owner: 'PANW / CUSTOMER', hours: 24, who: [I.dev], task: 'Implement the scan call in the application, including error handling and the behavior on an AIRS timeout' },
        { heading: 'Step 6.4 — Integration Pattern: cURL', owner: 'PANW', hours: 4, who: [I.dev], task: 'Provide the cURL equivalent for testing and for non-Python callers' },
        { heading: 'Step 6.5 — Integration Pattern: MCP Tool Events', owner: 'PANW / CUSTOMER', hours: 8, who: [I.dev, I.security], task: 'Implement MCP tool event scanning, or record that it is out of scope' },
        { heading: 'Step 6.6 — Handling DLP Data Masking', owner: 'PANW / CUSTOMER', hours: 6, who: [I.dev, I.security], task: 'Handle masked responses in the application and agree what the user sees' }
      ],
      milestone: { name: 'Integration Milestone', criteria: ['Scan call implemented in every in-scope application', 'Every verdict handled explicitly, including the timeout case', 'Masked responses handled and the user experience agreed', 'MCP tool event scanning implemented or explicitly descoped', 'Integration code reviewed and merged through the normal process'] },
      meeting: {
        name: 'Integration Design Review', when: 'Before the application code is written', position: 'step',
        beforeStep: 'Step 6.3 — Integration Pattern: Python', minutes: 90,
        required: [I.dev, I.api, I.security, 'Professional Services Engineer'],
        optional: [I.sponsor],
        agenda: [
          'Walk the request and response formats with the implementing developers',
          'Agree the behavior for each verdict, including block, mask, and allow',
          'Agree the behavior when AIRS is slow or unreachable: fail open or fail closed',
          'Agree the latency budget and how it is measured',
          'Confirm where the API key is read from at runtime'
        ] } },

    { num: 6, title: 'Discovery and Validation', anchor: 'discovery-validation',
      objective: 'Prove scanning works and see what discovery found.',
      steps: [
        { heading: 'Step 7.1 — Validate API Intercept Scanning', owner: 'PANW / CUSTOMER', hours: 8, who: [I.dev, I.security], task: 'Run benign and malicious traffic through every integrated application and confirm each verdict' },
        { heading: 'Step 7.2 — Review Cloud Asset Discovery', owner: 'PANW / CUSTOMER', hours: 4, who: [I.cloud, I.security], task: 'Review what discovery found and reconcile it against the application inventory' },
        { heading: 'Step 7.3 — Cloud Asset Map', owner: 'PANW / CUSTOMER', hours: 3, who: [I.cloud], task: 'Walk the Cloud Asset Map and resolve anything unexpected' },
        { heading: 'Step 7.4 — Analyze Network Traffic Risks', owner: 'PANW / CUSTOMER', hours: 8, who: [I.security], task: 'Analyze the network traffic risks discovery surfaced and agree which are in scope for remediation' }
      ],
      milestone: { name: 'Validation and Handover Milestone', criteria: ['Benign and malicious traffic verified on every integrated application', 'Latency measured and accepted by each application owner', 'Discovery reconciled against the application inventory, with gaps explained', 'Network traffic risks triaged into in-scope and phase two', 'Runbooks delivered: key rotation, policy tuning, incident response', 'Operations team signed off on knowledge transfer'] },
      meeting: {
        name: 'Validation Review and Handover', when: 'End of Phase 6', position: 'after', minutes: 90,
        required: [I.sponsor, I.security, I.api, I.dev, 'Professional Services Engineer', 'Project Manager'],
        optional: [I.cloud],
        agenda: [
          'Walk the validation results per application',
          'Review what discovery found that nobody expected',
          'Agree the date for moving alert-only detections to block',
          'Hand over the key rotation and policy tuning runbooks',
          'Agree the scope of the next wave of applications'
        ] } }
  ]
};

// ── AI Model Security ────────────────────────────────────────────────────────

const MS = {
  sponsor: 'Project Sponsor',
  owner: 'AI / ML Model Owner',
  security: 'Security Lead',
  cicd: 'CI/CD Pipeline Owner',
  privacy: 'Data / Privacy Lead'
};

const MODEL_SECURITY = {
  id: 'model-security', name: 'AI Model Security', pillar: 'model-security',
  guide: 'docs/guides/airs-model/airs-model-security.html',
  summary: 'Scan models for threats before they reach production, from registries, object storage, or local paths.',
  effortRange: [6, 10],
  effortNote: 'The pillar estimate of 14–17 days assumes scanning across a full model landscape with CI/CD rollout. This guide establishes scanning and validates it; the per-pipeline rollout is covered by the Jenkins and GitHub Actions playbooks, so counting it here would double-count.',

  phases: [
    { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
      objective: 'Confirm licensing, access, scanner requirements, and which registries are in scope.',
      steps: [
        { heading: 'License & Subscription Requirements', owner: 'CUSTOMER / PANW', hours: 2, who: [MS.sponsor], task: 'Confirm the Model Security subscription covers the models and scan volume expected' },
        { heading: 'Account & Access Requirements', owner: 'CUSTOMER', hours: 3, who: [MS.owner], task: 'Provide tenant access and the roles the delivery team needs' },
        { heading: 'Scanner Agent System Requirements', owner: 'CUSTOMER', hours: 3, who: [MS.cicd], task: 'Confirm the scanner host meets the CPU, memory, and disk requirements for the largest model in scope' },
        { heading: 'Network Requirements', owner: 'CUSTOMER', hours: 3, who: [MS.cicd, MS.security], task: 'Open the outbound path from the scanner to the AIRS endpoints and to the model registries' },
        { heading: 'Supported Model Registries', owner: 'PANW / CUSTOMER', hours: 3, who: [MS.owner], task: 'Confirm every registry holding in-scope models is supported, and flag any that is not' }
      ],
      milestone: { name: 'Prerequisites Milestone', criteria: ['Subscription confirmed against the model count and scan volume', 'Tenant access granted to the delivery team', 'Scanner host sized against the largest model in scope', 'Outbound path to AIRS and to every registry open and tested', 'Unsupported registries identified and a plan agreed for each'] },
      meeting: {
        name: 'Kickoff and Model Landscape Review', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: [MS.sponsor, MS.owner, MS.security, MS.cicd, 'Professional Services Engineer', 'Project Manager'],
        optional: [MS.privacy, 'Solutions Architect'],
        agenda: [
          'Inventory the models in scope and where each one lives',
          'Confirm which registries are supported and what to do about any that are not',
          'Agree who triages a finding and who can approve an exception',
          'Agree whether a finding blocks a release now or only warns',
          'Confirm the scanner host and who operates it'
        ] } },

    { num: 2, title: 'Foundation', anchor: 'foundation',
      objective: 'Create the profile, permissions, and service account scanning depends on.',
      steps: [
        { heading: 'Step 3.1: Create a Deployment Profile', owner: 'PANW / CUSTOMER', hours: 2, who: [MS.owner], task: 'Create the deployment profile and associate it with the tenant' },
        { heading: 'Step 3.2: Verify IAM Role Permissions', owner: 'CUSTOMER / PANW', hours: 3, who: [MS.security], task: 'Verify the IAM roles let the scanner read the model artifacts it has to scan' },
        { heading: 'Step 3.3: Create a Service Account for API & SDK Access', owner: 'CUSTOMER / PANW', hours: 2.5, who: [MS.security], task: 'Create the service account the scanner authenticates with, scoped least-privilege' }
      ],
      milestone: { name: 'Foundation Milestone', criteria: ['Deployment profile created and associated with the tenant', 'IAM permissions verified by reading a real model artifact', 'Service account created least-privilege and its secret stored safely', 'Credential rotation owner identified'] } },

    { num: 3, title: 'Policy Configuration', anchor: 'configuration',
      objective: 'Decide what counts as a finding and what a finding does.',
      steps: [
        { heading: 'Step 4.1: Review Default Security Groups', owner: 'PANW / CUSTOMER', hours: 2.5, who: [MS.security], task: 'Review the default security groups against the customer risk appetite' },
        { heading: 'Step 4.2: Understand Security Rules', owner: 'PANW / CUSTOMER', hours: 2, who: [MS.security, MS.owner], task: 'Walk the security rules so the model owners understand what each one detects' },
        { heading: 'Step 4.3: Configure Rule States', owner: 'PANW / CUSTOMER', hours: 3, who: [MS.security], task: 'Set each rule to the agreed state and record why anything is disabled' },
        { heading: 'Step 4.4: Customize Rule Parameters', owner: 'PANW / CUSTOMER', hours: 3, who: [MS.security], task: 'Tune the rule parameters for this environment' },
        { heading: 'Step 4.5: Create Custom Security Groups (Optional)', owner: 'PANW / CUSTOMER', hours: 3, who: [MS.security, MS.owner], task: 'Create custom security groups where teams need different thresholds, or record that the defaults are used' }
      ],
      milestone: { name: 'Policy Milestone', criteria: ['Rule states agreed and signed off by the security lead', 'Every disabled rule carries a recorded reason', 'Rule parameters tuned for this environment', 'Custom groups created where teams differ, or the single-policy decision recorded', 'Model owners understand what each enabled rule detects'] },
      meeting: {
        name: 'Scan Policy Review', when: 'Start of Phase 3', position: 'before', minutes: 90,
        required: [MS.security, MS.owner, 'Professional Services Engineer'],
        optional: [MS.privacy, MS.cicd, MS.sponsor],
        agenda: [
          'Walk the default security groups and agree what changes',
          'Decide the state of each rule and record the reason for any that is off',
          'Agree which findings block a release and which only warn',
          'Agree the exception process and who can approve one'
        ] } },

    { num: 4, title: 'Scanning', anchor: 'scanning',
      objective: 'Install the client and scan models from each source in scope.',
      steps: [
        { heading: 'Step 5.1: Install the Model Security Client', owner: 'PANW / CUSTOMER', hours: 2, who: [MS.cicd], task: 'Install the Model Security client on the scanner host' },
        { heading: 'Step 5.2: Configure Environment Variables', owner: 'PANW / CUSTOMER', hours: 1.5, who: [MS.cicd, MS.security], task: 'Configure the client environment variables from the secret store' },
        { heading: 'Step 5.3: Scan a HuggingFace Model', owner: 'PANW / CUSTOMER', hours: 3, who: [MS.owner], task: 'Scan a model from HuggingFace and confirm the result, or record that this source is out of scope' },
        { heading: 'Step 5.4: Scan from Object Storage (S3 / GCS / Azure)', owner: 'PANW / CUSTOMER', hours: 4, who: [MS.owner, MS.cicd], task: 'Scan a model from object storage and confirm the result' },
        { heading: 'Step 5.5: Scan a Local Model', owner: 'PANW / CUSTOMER', hours: 2, who: [MS.owner], task: 'Scan a model from a local path and confirm the result' },
        { heading: 'Step 5.6: View Scan Results', owner: 'PANW / CUSTOMER', hours: 2.5, who: [MS.owner, MS.security], task: 'Walk the scan results view with the people who will triage findings' },
        { heading: 'Scan Configuration Options', owner: 'PANW / CUSTOMER', hours: 2.5, who: [MS.cicd], task: 'Set the scan configuration options for routine use and record the chosen defaults' }
      ],
      milestone: { name: 'Scanning Milestone', criteria: ['Client installed and authenticating from the scanner host', 'No credential written into a shell profile or a script', 'A model scanned successfully from every source in scope', 'Scan duration measured against the largest model', 'Triage team can read a result and find the offending artifact'] } },

    { num: 5, title: 'Validation and Handover', anchor: 'validation',
      objective: 'Prove the scanner catches what it should and misses nothing it should not.',
      steps: [
        { heading: 'Step 7.1: Validate with a Known-Safe Model', owner: 'PANW / CUSTOMER', hours: 2, who: [MS.owner], task: 'Scan a known-safe model and confirm it passes' },
        { heading: 'Step 7.2: Validate with a Known-Threat Model', owner: 'PANW / CUSTOMER', hours: 3, who: [MS.security], task: 'Scan a known-threat model and confirm it is caught' },
        { heading: 'Step 7.3: Verify Results in SCM Dashboard', owner: 'PANW / CUSTOMER', hours: 2.5, who: [MS.security, MS.owner], task: 'Confirm both results appear in the dashboard where the triage team will look' },
        { heading: 'Step 7.4: Validate Content-Based Fingerprinting', owner: 'PANW / CUSTOMER', hours: 3, who: [MS.security], task: 'Confirm fingerprinting identifies the same model across sources and versions' }
      ],
      milestone: { name: 'Validation and Handover Milestone', criteria: ['Known-safe model passes', 'Known-threat model caught with the expected verdict', 'Both visible in the dashboard the triage team uses', 'Fingerprinting confirmed across sources and versions', 'Triage runbook handed over, including the exception path', 'CI/CD rollout scoped as separate work'] },
      meeting: {
        name: 'Validation Review and Handover', when: 'End of Phase 5', position: 'after', minutes: 90,
        required: [MS.sponsor, MS.security, MS.owner, MS.cicd, 'Professional Services Engineer', 'Project Manager'],
        optional: [MS.privacy],
        agenda: [
          'Walk the safe and threat model results side by side',
          'Confirm the triage team can act on a finding without help',
          'Hand over the triage runbook and the exception process',
          'Agree which pipelines get scanning next, and that this is separate work',
          'Agree when findings start blocking releases'
        ] } }
  ]
};

// ── AI Gateway, serverless and feature guides ────────────────────────────────

const AIGW_DIR = 'docs/guides/ai-gateway/';

const AIGW_SERVERLESS = {
  id: 'aigw-serverless', name: 'AI Gateway on ECS and Container Apps',
  pillar: 'ai-gateway', component: 'aigw-serverless',
  guide: AIGW_DIR + 'serverless-deployment.html',
  summary: 'Deploy the AI Gateway hybrid data plane to ECS Fargate or Azure Container Apps with Terraform.',
  effortRange: [4, 6],
  effortNote: 'The component now estimates 3–4 days, which is the incremental data plane work on top of AI Gateway. This playbook is end to end: it also sizes and activates the license and carries the optional moves to a managed cache and log store, which the incremental figure assumes are already decided.',
  variants: {
    key: 'platform', label: 'Platform',
    note: 'Secrets, Terraform, ingress and private connectivity all differ between ECS and Container Apps.',
    default: 'ecs',
    options: [
      { id: 'ecs', label: 'AWS ECS Fargate', plane: 'ecs' },
      { id: 'aca', label: 'Azure Container Apps', plane: 'aca' }
    ]
  },
  excludes: {
    'docs/guides/ai-gateway/serverless-deployment.html#licensing': [
      { heading: 'See screenshots — the FORM stage field by field', reason: 'Screenshot group for the licensing steps, not a task' },
      { heading: 'See screenshots', reason: 'Screenshot group for the licensing steps, not a task' }
    ]
  },

  phases: [
    { num: 1, title: 'Requirements and Licensing', anchor: 'requirements',
      objective: 'Size the deployment, confirm platform limits, and license it.',
      steps: [
        { heading: 'What Palo Alto Networks provides', owner: 'PANW', hours: 1, who: [G.aiml], task: 'Confirm what Palo Alto Networks supplies: chart, image, and tenant' },
        { heading: 'Requests to Palo Alto Networks', owner: 'PANW / CUSTOMER', hours: 1, who: [G.sponsor], task: 'Raise the requests Palo Alto Networks has to fulfill before the build can start' },
        { heading: 'Tooling, permissions, and sizing', owner: 'CUSTOMER', hours: 2, who: [G.k8s, G.cloud], task: 'Confirm tooling, cloud permissions, and the sizing for the expected token throughput' },
        { heading: 'ECS Fargate — what is and is not supported', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.k8s], task: 'Walk the platform limits and confirm nothing in scope depends on an unsupported feature' },
        { anchor: 'licensing', heading: 'Licensing step 1: Size your license by monthly token consumption', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml, G.sponsor], task: 'Estimate monthly token consumption and size the license against it' },
        { anchor: 'licensing', heading: 'Licensing step 2: Create the deployment profile and allocate flex credits', owner: 'CUSTOMER / PANW', hours: 2, who: [G.sponsor], task: 'Create the deployment profile and allocate flex credits' },
        { anchor: 'licensing', heading: 'Licensing step 3: Map the deployment profile to a Tenant Service Group', owner: 'CUSTOMER / PANW', hours: 1, who: [G.cloud], task: 'Map the deployment profile to the Tenant Service Group' },
        { anchor: 'licensing', heading: 'Licensing step 4: Open the AI Gateway in Strata Cloud Manager', owner: 'PANW', hours: 0.5, who: [G.cloud], task: 'Open the AI Gateway in Strata Cloud Manager and confirm the tenant is provisioned' }
      ],
      milestone: { name: 'Licensing and Sizing Milestone', criteria: ['Token consumption estimated and the license sized against it', 'Platform limits understood and nothing in scope blocked by them', 'Deployment profile created with credits allocated and mapped to the TSG', 'AI Gateway reachable in Strata Cloud Manager', 'Platform chosen: ECS Fargate or Container Apps'] },
      meeting: {
        name: 'Kickoff and Sizing Session', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: [G.sponsor, G.aiml, G.k8s, 'Professional Services Engineer', 'Project Manager'],
        optional: [G.security, G.cloud, 'Solutions Architect'],
        agenda: [
          'Confirm which applications route through the gateway and their token volumes',
          'Agree the platform: ECS Fargate or Azure Container Apps',
          'Walk the platform limits and confirm nothing in scope needs an unsupported feature',
          'Agree whether the outbound link is over the internet or a private endpoint, and if private, raise the availability question with the product team now rather than mid-build',
          'Confirm who holds Customer Support Portal access for licensing'
        ] } },

    { num: 2, title: 'Secrets and Deployment', anchor: 'secrets',
      objective: 'Store the credentials and apply the Terraform.',
      steps: [
        { variant: 'ecs', heading: '1.1 — Create two secrets in AWS Secrets Manager', owner: 'PANW / CUSTOMER', hours: 2, who: [G.cloud, G.security], task: 'Create the gateway secrets in AWS Secrets Manager' },
        { variant: 'ecs', anchor: 'deploy', heading: '2.0 — Decide the load balancer type first', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.k8s, G.security], task: 'Decide the load balancer type before writing Terraform, because it is awkward to change later' },
        { variant: 'ecs', anchor: 'deploy', heading: '2.1 — Set up the working directory and remote state', owner: 'PANW', hours: 2, who: [G.k8s], task: 'Set up the Terraform working directory and remote state backend' },
        { variant: 'ecs', anchor: 'deploy', heading: '2.1b — Create the log bucket', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud], task: 'Create the S3 log bucket with the agreed encryption and retention' },
        { variant: 'ecs', anchor: 'deploy', heading: '2.2 — Write main.tf', owner: 'PANW', hours: 4, who: [G.k8s], task: 'Write main.tf for the ECS service, task definition, and supporting resources' },
        { variant: 'ecs', anchor: 'deploy', heading: '2.3 — Apply', owner: 'PANW / CUSTOMER', hours: 3, who: [G.k8s, G.cloud], task: 'Apply the Terraform and confirm the service reaches a steady state' },

        { variant: 'aca', heading: '1.1 — Create a Key Vault and store four secrets', owner: 'PANW / CUSTOMER', hours: 2.5, who: [G.cloud, G.security], task: 'Create the Key Vault and store the four gateway secrets' },
        { variant: 'aca', anchor: 'deploy', heading: '2.1 — Set up the working directory and remote state', owner: 'PANW', hours: 2, who: [G.k8s], task: 'Set up the Terraform working directory and remote state backend' },
        { variant: 'aca', anchor: 'deploy', heading: '2.2 — Write main.tf', owner: 'PANW', hours: 4, who: [G.k8s], task: 'Write main.tf for the Container App and supporting resources' },
        { variant: 'aca', anchor: 'deploy', heading: '2.3 — Apply', owner: 'PANW / CUSTOMER', hours: 3, who: [G.k8s, G.cloud], task: 'Apply the Terraform and confirm the Container App reaches a healthy revision' }
      ],
      milestone: { name: 'Deployment Milestone', criteria: ['Secrets stored in the platform secret store, never in Terraform variables', 'Remote state configured and locked', 'Terraform applied and the service healthy', 'Load balancer type decided before the apply, not after', 'Terraform committed to source control'] },
      meeting: {
        name: 'Terraform Review', when: 'Before the Terraform is applied', position: 'step',
        beforeStep: { ecs: '2.3 — Apply', aca: '2.3 — Apply' }, minutes: 60,
        required: [G.k8s, G.cloud, 'Professional Services Engineer'],
        optional: [G.security, G.aiml],
        agenda: [
          'Walk main.tf against the sizing agreed at kickoff',
          'Confirm the load balancer type and that it matches the exposure decision',
          'Confirm secrets are read from the secret store, not passed as variables',
          'Agree who runs the apply and what the rollback is'
        ] } },

    { num: 3, title: 'Ingress and Connectivity', anchor: 'ingress',
      objective: 'Publish the gateway and establish the outbound link.',
      note: 'This phase changes network reachability. Treat it as a change window.',
      steps: [
        { variant: 'ecs', heading: '3.1 — Choose ALB or NLB', owner: 'PANW / CUSTOMER', hours: 2, who: [G.k8s, G.security], task: 'Apply the chosen load balancer and restrict who can reach it' },
        { variant: 'ecs', heading: '3.2 — Optional: move the cache store to ElastiCache', owner: 'PANW / CUSTOMER', hours: 4, who: [G.cloud], task: 'Move the cache to ElastiCache, or record the decision to keep the default' },
        { variant: 'aca', heading: '3.1 — Choose built-in ingress or Application Gateway', owner: 'PANW / CUSTOMER', hours: 2, who: [G.k8s, G.security], task: 'Apply the chosen ingress and restrict who can reach it' },
        { variant: 'aca', heading: '3.2 — Optional: Azure Managed Redis and your own storage', owner: 'PANW / CUSTOMER', hours: 4, who: [G.cloud], task: 'Move the cache and log store to managed services, or record the decision to keep the defaults' },

        { variant: 'ecs', anchor: 'connectivity', heading: '4.1 — Outbound: over the internet', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security], task: 'Confirm the gateway reaches the management plane over the internet path' },
        { variant: 'ecs', anchor: 'connectivity', heading: '4.2 — Outbound: over AWS PrivateLink', owner: 'PANW / CUSTOMER', hours: 6, who: [G.cloud, G.security], task: 'Establish the private outbound path over PrivateLink, or record the decision to stay on the internet path' },
        { variant: 'aca', anchor: 'connectivity', heading: '4.1 — Outbound: over the internet', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security], task: 'Confirm the gateway reaches the management plane over the internet path' },
        { variant: 'aca', anchor: 'connectivity', heading: '4.2 — Outbound: over Azure Private Link', owner: 'PANW / CUSTOMER', hours: 6, who: [G.cloud, G.security], task: 'Establish the private outbound path over Private Link, or record the decision to stay on the internet path' },
        { anchor: 'connectivity', heading: '4.3 — Inbound is not supported with Strata Cloud Manager today (both platforms)', owner: 'PANW / CUSTOMER', hours: 0.5, who: [G.security], task: 'Confirm with the security lead that inbound from the management plane is not required, since it is not supported' }
      ],
      milestone: { name: 'Connectivity Milestone', criteria: ['Gateway reachable from its intended callers and from nowhere else', 'Cache and log store decisions recorded, managed service or default', 'Outbound path to the management plane confirmed working', 'Private endpoint built, or the internet path decision recorded and accepted', 'Rollback for the network change documented and agreed'] },
      meeting: {
        name: 'Network Change Briefing', when: 'Before the ingress and egress changes', position: 'before', minutes: 60,
        required: [G.security, G.k8s, G.cloud, 'Professional Services Engineer', 'Project Manager'],
        optional: [G.sponsor],
        agenda: [
          'Confirm the change window and the approved change record',
          'Walk the ingress exposure and the source range being allowed',
          'Confirm the outbound decision: internet path or private endpoint',
          'Confirm inbound from the management plane is not required',
          'Agree the rollback steps and who can call them'
        ] } }
  ]
};

const AIGW_KEY_MANAGEMENT = {
  id: 'aigw-key-management', name: 'LLM API Key Management',
  pillar: 'ai-gateway', component: 'aigw-key-management',
  guide: AIGW_DIR + 'llm-api-key-management.html',
  summary: 'Hold LLM provider credentials in Azure Key Vault and let the AI Gateway read them through a managed identity.',

  phases: [
    { num: 1, title: 'Vault and Secrets', anchor: 'create-key-vault',
      objective: 'Create the vault and load the provider credentials into it.',
      steps: [
        { heading: '1.1 — Set variables', owner: 'PANW', hours: 0.5, who: [G.cloud], task: 'Set the variables the remaining commands depend on' },
        { heading: '1.2 — Create the vault with RBAC access model', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud, G.security], task: 'Create the Key Vault using the RBAC access model rather than access policies' },
        { heading: '1.3 — Grant yourself admin access', owner: 'CUSTOMER', hours: 1, who: [G.cloud], task: 'Grant the delivery identity the admin role needed to load secrets' },
        { anchor: 'store-secrets', heading: '2A — OpenAI', owner: 'PANW / CUSTOMER', hours: 1, who: [G.aiml], task: 'Store the OpenAI credential, or record that this provider is out of scope' },
        { anchor: 'store-secrets', heading: '2B — Azure OpenAI (keyless Entra auth)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.aiml, G.cloud], task: 'Configure keyless Entra authentication for Azure OpenAI, or record that this provider is out of scope' },
        { anchor: 'store-secrets', heading: '2C — AWS Bedrock', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.aiml, G.cloud], task: 'Store the Bedrock credential, or record that this provider is out of scope' },
        { anchor: 'store-secrets', heading: '2D — Anthropic', owner: 'PANW / CUSTOMER', hours: 1, who: [G.aiml], task: 'Store the Anthropic credential, or record that this provider is out of scope' },
        { anchor: 'store-secrets', heading: '2E — Google Vertex AI', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.aiml, G.cloud], task: 'Store the Vertex AI credential, or record that this provider is out of scope' }
      ],
      milestone: { name: 'Vault Milestone', criteria: ['Key Vault created with the RBAC access model', 'A credential stored for every provider in scope', 'Every provider not in scope explicitly recorded as such', 'No provider key left in an application config file or environment file'] },
      meeting: {
        name: 'Key Management Kickoff', when: 'Before Phase 1 work begins', position: 'before', minutes: 60,
        required: [G.aiml, G.cloud, G.security, 'Professional Services Engineer'],
        optional: [G.sponsor],
        agenda: [
          'List every LLM provider in scope and who currently holds its key',
          'Agree which providers move to keyless authentication',
          'Agree who can read a secret and who can rotate one',
          'Agree the rotation schedule and how expiry is alerted'
        ] } },

    { num: 2, title: 'Identity and Access', anchor: 'create-identity',
      objective: 'Give the gateway an identity and grant it only what it needs.',
      steps: [
        { heading: '3A — User-Assigned Managed Identity (Azure-hosted, recommended)', owner: 'PANW / CUSTOMER', hours: 2, who: [G.cloud], task: 'Create the user-assigned managed identity for an Azure-hosted gateway' },
        { heading: '3B — Service Principal (non-Azure or on-premises)', owner: 'PANW / CUSTOMER', hours: 2, who: [G.cloud], task: 'Create the service principal for a gateway hosted outside Azure, or record that the managed identity path is used' },
        { anchor: 'grant-access', heading: '4.1 — Assign Key Vault Secrets User to the AI Gateway identity', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud, G.security], task: 'Grant the gateway identity read access to the secrets, and nothing more' },
        { anchor: 'grant-access', heading: '4.2 — Azure OpenAI: grant Cognitive Services OpenAI User role', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud], task: 'Grant the Azure OpenAI role for keyless access, or record that it is not needed' },
        { anchor: 'grant-access', heading: '4.3 — Grant the ops team rotation access', owner: 'PANW / CUSTOMER', hours: 1, who: [G.security], task: 'Grant the operations team the rotation role, separate from the gateway read role' }
      ],
      milestone: { name: 'Identity Milestone', criteria: ['Gateway identity created, managed identity or service principal as appropriate', 'Gateway granted read access to secrets and nothing more', 'Operations team granted rotation access as a separate role', 'No single identity holding both read and rotate unnecessarily'] } },

    { num: 3, title: 'Retrieval and Rotation', anchor: 'retrieve-secrets',
      objective: 'Make the gateway read the secrets, and make rotation routine.',
      steps: [
        { heading: '5.1 — Python: retrieve all provider keys at startup', owner: 'PANW / CUSTOMER', hours: 2.5, who: [G.aiml], task: 'Retrieve the provider keys at gateway startup and confirm each one works' },
        { heading: '5.2 — Azure OpenAI: keyless authentication', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml, G.cloud], task: 'Confirm keyless authentication works end to end, or record that it is not in use' },
        { heading: '5.3 — Service Principal: set environment variables for DefaultAzureCredential', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud], task: 'Set the service principal environment variables, or record that the managed identity path is used' },
        { anchor: 'rotation', heading: '6.1 — Configure expiry alerts via Azure Monitor', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security], task: 'Configure expiry alerts so a key never expires unnoticed' },
        { anchor: 'rotation', heading: '6.2 — Rotate a key (standard procedure)', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security, G.aiml], task: 'Rotate one key for real, end to end, and time how long the gateway takes to pick it up' }
      ],
      milestone: { name: 'Retrieval and Rotation Milestone', criteria: ['Gateway retrieving every in-scope provider key at startup', 'Keyless authentication working where it is used', 'Expiry alerts configured and tested by triggering one', 'One key rotated for real, with the pickup delay measured', 'Rotation runbook handed over to the operations team'] },
      meeting: {
        name: 'Rotation Handover', when: 'After the first real rotation', position: 'after', minutes: 45,
        required: [G.security, G.aiml, 'Professional Services Engineer'],
        optional: [G.cloud, G.sponsor],
        agenda: [
          'Walk the rotation that was just performed, step by step',
          'Confirm how long the gateway took to pick up the new value',
          'Confirm the expiry alert fired and who receives it',
          'Agree the rotation schedule and who owns it'
        ] } }
  ]
};

const AIGW_AGENT_IDENTITY = {
  id: 'aigw-agent-identity', name: 'Agent Identity with Entra ID',
  pillar: 'ai-gateway', component: 'aigw-agent-identity',
  guide: AIGW_DIR + 'agent-identity-entra.html',
  summary: 'Attribute AI Gateway traffic to the agent and the person behind it, using Entra ID tokens and Cloud Identity Engine groups.',

  phases: [
    { num: 1, title: 'Prerequisites and Directory', anchor: 'prerequisites',
      objective: 'Decide what attribution is actually needed, then build the directory behind it.',
      steps: [
        { heading: 'P.1 — Tenancy and version floors', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.cloud], task: 'Confirm the tenancy and the version floors for the gateway and Cloud Identity Engine' },
        { heading: 'P.2 — Decide what attribution you actually need', owner: 'PANW / CUSTOMER', hours: 3, who: [G.security, G.aiml], task: 'Decide what attribution the organization actually needs, and write down what will not be attributable' },
        { anchor: 'phase-1', heading: '1.1 — Create a cloud directory in Cloud Identity Engine', owner: 'PANW / CUSTOMER', hours: 2.5, who: [G.cloud], task: 'Create the cloud directory in Cloud Identity Engine' },
        { anchor: 'phase-1', heading: '1.2 — Map each group to one workspace', owner: 'PANW / CUSTOMER', hours: 3, who: [G.security, G.aiml], task: 'Map each directory group to exactly one workspace and record the mapping' }
      ],
      milestone: { name: 'Directory Milestone', criteria: ['Tenancy and version floors confirmed', 'Attribution requirement written down, including what will not be attributable', 'Cloud directory created and syncing', 'Every group mapped to exactly one workspace, with the mapping recorded'] },
      meeting: {
        name: 'Attribution Scoping Session', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: [G.security, G.aiml, G.cloud, 'Professional Services Engineer'],
        optional: [G.sponsor],
        agenda: [
          'Agree what question attribution has to answer, and for whom',
          'Walk the four documented limits and confirm each is acceptable',
          'Agree the group to workspace mapping',
          'Decide whether the issuer is controlled in-house or a stock Entra token is used',
          'Confirm what happens for an unattended agent with no person behind it'
        ] } },

    { num: 2, title: 'Entra Registration and Validation', anchor: 'phase-2',
      objective: 'Register the agent and make the gateway trust its tokens.',
      steps: [
        { heading: '2.1 — Register the agent in Entra', owner: 'PANW / CUSTOMER', hours: 2.5, who: [G.cloud], task: 'Register the agent application in Entra and record its identifiers' },
        { heading: '2.2 — Configure the JWKS in the gateway', owner: 'PANW / CUSTOMER', hours: 2.5, who: [G.cloud, G.security], task: 'Configure the JWKS endpoint so the gateway can validate the agent tokens' },
        { anchor: 'phase-3', heading: '3.1 — AI Gateway Cloud: nothing to do', owner: 'PANW', hours: 0.5, who: [G.cloud], task: 'Confirm no gateway-local validation is needed on AI Gateway Cloud, or move to the hybrid step' },
        { anchor: 'phase-3', heading: '3.2 — Hybrid and air-gapped: enable gateway-local validation', owner: 'PANW / CUSTOMER', hours: 3, who: [G.cloud, G.security], task: 'Enable gateway-local token validation for a hybrid or air-gapped deployment, or record that it is not needed' }
      ],
      milestone: { name: 'Token Validation Milestone', criteria: ['Agent registered in Entra with its identifiers recorded', 'JWKS configured and the gateway validating a real token', 'Gateway-local validation enabled where the deployment needs it', 'Token expiry and refresh behavior understood'] } },

    { num: 3, title: 'Attribution and Verification', anchor: 'phase-4',
      objective: 'Send the token correctly and prove the attribution lands.',
      steps: [
        { heading: '4.1 — Put the token in the right header', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml], task: 'Send the token in the header the gateway reads, and confirm a call succeeds' },
        { heading: '4.2 — Understand the four resolutions behind that call', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml, G.security], task: 'Walk the four resolutions the gateway performs, so a failure can be diagnosed' },
        { anchor: 'phase-5', heading: '5.1 — Know which claim the gateway reads', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.security], task: 'Confirm which claim the gateway reads for attribution' },
        { anchor: 'phase-5', heading: '5.2 — The one comparison', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.security], task: 'Confirm the comparison the gateway makes between the claim and the directory' },
        { anchor: 'phase-5', heading: '5.3 — Attribution for an unattended agent', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security, G.aiml], task: 'Confirm how an unattended agent is attributed and that the security lead accepts it' },
        { anchor: 'phase-6', heading: '6.1 — Give the gateway its own Azure credential', owner: 'PANW / CUSTOMER', hours: 2, who: [G.cloud, G.security], task: 'Give the gateway its own Azure credential for directory lookups' }
      ],
      milestone: { name: 'Attribution Milestone', criteria: ['Agent call succeeding with the token in the right header', 'Traffic attributed to the expected workspace in the logs', 'Unattended agent attribution confirmed and accepted', 'Gateway holding its own Azure credential rather than borrowing one', 'The four documented limits written into the handover notes'] },
      meeting: {
        name: 'Attribution Verification and Handover', when: 'End of Phase 3', position: 'after', minutes: 60,
        required: [G.security, G.aiml, G.cloud, 'Professional Services Engineer'],
        optional: [G.sponsor],
        agenda: [
          'Walk a real agent call and show where it lands in the logs',
          'Confirm the attribution answers the question agreed at kickoff',
          'Restate the four limits and confirm they are written into the operating notes',
          'Agree who maintains the group to workspace mapping as teams change'
        ] } }
  ]
};

const AIGW_STREAMING = {
  id: 'aigw-streaming', name: 'Streaming, Semantic Caching, and A2A',
  pillar: 'ai-gateway', component: 'aigw-streaming',
  guide: AIGW_DIR + 'streaming-caching-a2a.html',
  summary: 'Turn on streaming with guardrails intact, semantic caching, and the Agent Gateway for agent-to-agent traffic.',

  phases: [
    { num: 1, title: 'Streaming', anchor: 'streaming',
      objective: 'Stream responses without losing guardrails or cost accounting.',
      steps: [
        { heading: 'Step 1.1 — Make a streaming call and confirm chunks arrive', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml], task: 'Make a streaming call and confirm chunks arrive at the client' },
        { heading: 'Step 1.2 — Put the enforcing guardrail on the input side', owner: 'PANW / CUSTOMER', hours: 3, who: [G.security, G.aiml], task: 'Move the enforcing guardrail to the input side, where it can still block' },
        { heading: 'Step 1.3 — Expose the guardrail verdicts inside the stream', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml], task: 'Surface the guardrail verdicts inside the stream so the client can act on them' },
        { heading: 'Step 1.4 — Restore cost accounting on streamed calls', owner: 'PANW / CUSTOMER', hours: 2.5, who: [G.aiml, G.sponsor], task: 'Restore token and cost accounting for streamed calls' },
        { heading: 'Step 1.5 — Re-check timeout behaviour', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml], task: 'Re-check timeout behavior, which differs once responses stream' }
      ],
      milestone: { name: 'Streaming Milestone', criteria: ['Streaming calls working end to end', 'Enforcing guardrail on the input side and still able to block', 'Guardrail verdicts visible to the client inside the stream', 'Token and cost accounting correct for streamed calls', 'Timeout behavior understood and accepted for streaming'] },
      meeting: {
        name: 'Feature Scoping Session', when: 'Before Phase 1 work begins', position: 'before', minutes: 60,
        required: [G.aiml, G.security, 'Professional Services Engineer'],
        optional: [G.sponsor, G.k8s],
        agenda: [
          'Agree which of the three features are in scope: streaming, semantic caching, Agent Gateway',
          'Confirm that output-side enforcement cannot block once a response streams',
          'Agree the acceptable staleness for a cached answer, if caching is in scope',
          'Confirm who owns the embedding provider and vector store, if self-hosted'
        ] } },

    { num: 2, title: 'Semantic Caching', anchor: 'semantic-cache',
      objective: 'Decide whether semantic caching pays, then make it work.',
      steps: [
        { heading: 'Step 2.1 — Decide whether semantic mode is worth it', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml, G.sponsor], task: 'Decide whether semantic mode pays for this traffic, and record the decision either way' },
        { heading: 'Step 2.2 — Configure the embedding provider (self-hosted)', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml, G.k8s], task: 'Configure the embedding provider for a self-hosted gateway, or record that it is managed' },
        { heading: 'Step 2.3 — Connect the vector store (self-hosted)', owner: 'PANW / CUSTOMER', hours: 3, who: [G.k8s], task: 'Connect the vector store and confirm the gateway can write to it' },
        { heading: 'Step 2.4 — Turn caching on in the config', owner: 'PANW', hours: 1.5, who: [G.aiml], task: 'Turn caching on and set the matching threshold' },
        { heading: 'Step 2.5 — Prove a semantic hit', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml], task: 'Prove a semantic hit with two differently worded prompts that should match' },
        { heading: 'Step 2.6 — Set lifetime and partitioning', owner: 'PANW / CUSTOMER', hours: 2.5, who: [G.aiml, G.security], task: 'Set the cache lifetime and partitioning so one tenant never reads another tenant answer' },
        { heading: 'Step 2.7 — Force a refresh when the answer is wrong', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml], task: 'Confirm how a wrong cached answer is forced out, and who can do it' }
      ],
      milestone: { name: 'Caching Milestone', criteria: ['Decision recorded on whether semantic mode is worth it for this traffic', 'Embedding provider and vector store connected where self-hosted', 'A semantic hit demonstrated on two differently worded prompts', 'Partitioning confirmed so no tenant can read another tenant answer', 'Cache lifetime agreed against the acceptable staleness', 'Refresh procedure proven and handed to the team that will need it'] },
      meeting: {
        name: 'Cache Partitioning Review', when: 'Before caching is enabled for real traffic', position: 'step',
        beforeStep: 'Step 2.6 — Set lifetime and partitioning', minutes: 60,
        required: [G.security, G.aiml, 'Professional Services Engineer'],
        optional: [G.sponsor],
        agenda: [
          'Walk the partitioning scheme and confirm no cross-tenant read is possible',
          'Agree the cache lifetime against how fast the underlying answers change',
          'Agree who can force a refresh and how it is requested',
          'Confirm what a cached answer looks like in the logs'
        ] } },

    { num: 3, title: 'Agent Gateway', anchor: 'agent-gateway',
      objective: 'Register agents and route agent-to-agent traffic through the gateway.',
      steps: [
        { heading: 'Step 3.1 — Enable the Agent Gateway on an API key', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.aiml, G.security], task: 'Enable the Agent Gateway on the API key the agents will use' },
        { heading: 'Step 3.2 — Register the agent and fetch its card', owner: 'PANW / CUSTOMER', hours: 2.5, who: [G.aiml], task: 'Register the agent and fetch its card' },
        { heading: 'Step 3.3 — Provision workspaces and scope the skills', owner: 'PANW / CUSTOMER', hours: 3, who: [G.security, G.aiml], task: 'Provision the workspaces and scope each agent to only the skills it needs' },
        { heading: 'Step 3.4 — Point the client at the virtual server', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml], task: 'Point the client at the virtual server and confirm a call succeeds' },
        { heading: 'Step 3.5 — Confirm agent traffic is being logged', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security], task: 'Confirm agent traffic appears in the logs with enough detail to investigate' }
      ],
      milestone: { name: 'Agent Gateway Milestone', criteria: ['Agent Gateway enabled on the right API key', 'Every agent registered with its card retrievable', 'Skills scoped per workspace, least-privilege', 'Client calling through the virtual server successfully', 'Agent traffic logged with enough detail to investigate an incident', 'Known limit recorded: A2A calls cannot carry caller identity onward'] },
      meeting: {
        name: 'Feature Handover', when: 'End of Phase 3', position: 'after', minutes: 60,
        required: [G.aiml, G.security, 'Professional Services Engineer', 'Project Manager'],
        optional: [G.sponsor, G.k8s],
        agenda: [
          'Walk each enabled feature and what it changed for callers',
          'Confirm cost accounting is right on streamed and cached calls',
          'Restate the A2A identity limit and confirm it is written into the operating notes',
          'Hand over the cache refresh and agent registration procedures'
        ] } }
  ]
};

const AIGW_DEPLOYMENT = {
  id: 'ai-gateway', name: 'AI Gateway', pillar: 'ai-gateway',
  guide: AIGW_DIR + 'ai-gateway-deployment.html',
  summary: 'Stand up the AI Gateway, wire LLM providers and MCP servers to it, and put guardrails and logging in front of the traffic.',
  effortRange: [8, 14],
  effortNote: 'The pillar estimate of 14–17 days assumes onboarding a portfolio of applications. This guide takes the gateway itself end to end for one provider and one MCP server, which is the lower bound. The SaaS path is substantially shorter than hybrid because there is no data plane to install.',

  variants: {
    key: 'deployment', label: 'Deployment model',
    note: 'SaaS runs the data plane for you. Hybrid installs it in your cluster, which adds the registration, storage and exposure steps.',
    default: 'hybrid',
    options: [
      { id: 'hybrid', label: 'Hybrid (self-hosted data plane)', planes: ['hybrid', 'onprem'] },
      { id: 'saas', label: 'SaaS (Palo Alto Networks hosted)', planes: ['saas'] }
    ]
  },

  excludes: {
    'docs/guides/ai-gateway/ai-gateway-deployment.html#license-activate': [
      { heading: 'See screenshots — the FORM stage field by field', reason: 'Screenshot group for the licensing steps, not a task' },
      { heading: 'See screenshots', reason: 'Screenshot group for the licensing steps, not a task' }
    ],
    'docs/guides/ai-gateway/ai-gateway-deployment.html#llm-integration': [
      { heading: 'See screenshots', reason: 'Screenshot group, not a task' },
      { heading: 'Provider variations', reason: 'Per-provider reference, read when configuring the provider in scope' },
      { heading: 'Open AI', reason: 'Provider reference detail' },
      { heading: 'Google', reason: 'Provider reference detail' },
      { heading: 'Azure OpenAI', reason: 'Provider reference detail' },
      { heading: 'Bedrock', reason: 'Provider reference detail' },
      { heading: 'Vertex AI', reason: 'Provider reference detail' },
      { heading: 'More catalog providers', reason: 'Provider reference detail' },
      { heading: 'Client variations', reason: 'Per-client reference, read when wiring the client in scope' },
      { heading: 'OpenAI Codex CLI', reason: 'Client reference detail' },
      { heading: 'Anthropic SDK', reason: 'Client reference detail' },
      { heading: 'OpenAI SDK and OpenAI-compatible tools', reason: 'Client reference detail' },
      { heading: 'Claude Code with a Vertex AI or Bedrock integration', reason: 'Client reference detail' }
    ],
    'docs/guides/ai-gateway/ai-gateway-deployment.html#mcp-integration': [
      { heading: 'OAuth discovery for MCP clients that negotiate their own access', reason: 'Reference detail for Step 4.4' },
      { heading: 'See the generated entry', reason: 'Example output, not a task' }
    ],
    'docs/guides/ai-gateway/ai-gateway-deployment.html#guardrails-logging': [
      { heading: 'See screenshots', reason: 'Screenshot group, not a task' },
      { heading: 'Check parameters', reason: 'Reference detail for Step 5.2' }
    ]
  },

  phases: [
    { num: 1, title: 'License and Activate', anchor: 'license-activate',
      objective: 'Size the license, allocate credits, and open the gateway.',
      steps: [
        { heading: 'Step 1.1: Confirm prerequisites', owner: 'CUSTOMER / PANW', hours: 3, who: [G.cloud, G.aiml], task: 'Confirm the tenancy, access, and network prerequisites' },
        { heading: 'Step 1.2: Size your license by monthly token consumption', owner: 'PANW / CUSTOMER', hours: 4, who: [G.aiml, G.sponsor], task: 'Estimate monthly token consumption per application and size the license against it' },
        { heading: 'Step 1.3: Create the deployment profile and allocate flex credits', owner: 'CUSTOMER / PANW', hours: 2, who: [G.sponsor], task: 'Create the deployment profile and allocate flex credits' },
        { heading: 'Step 1.4: Map the deployment profile to a Tenant Service Group', owner: 'CUSTOMER / PANW', hours: 1, who: [G.cloud], task: 'Map the deployment profile to the Tenant Service Group and confirm the region' },
        { heading: 'Step 1.5: Open the AI Gateway in Strata Cloud Manager', owner: 'PANW', hours: 0.5, who: [G.cloud], task: 'Open the AI Gateway in Strata Cloud Manager and confirm the tenant is provisioned' }
      ],
      milestone: { name: 'Licensing Milestone', criteria: ['Prerequisites confirmed, including tenancy and network access', 'Token consumption estimated per application and the license sized against it', 'Deployment profile created with flex credits allocated', 'Profile mapped to the TSG in the agreed region', 'AI Gateway reachable in Strata Cloud Manager'] },
      meeting: {
        name: 'Kickoff and Sizing Session', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: [G.sponsor, G.aiml, G.security, 'Professional Services Engineer', 'Project Manager'],
        optional: [G.k8s, G.cloud, 'Solutions Architect'],
        agenda: [
          'Confirm which applications and agents route through the gateway',
          'Agree the deployment model: SaaS or hybrid, and why',
          'Estimate token consumption per application against the credit allocation',
          'List the LLM providers and MCP servers in scope',
          'Agree how workspaces map to teams'
        ] } },

    { num: 2, title: 'Enable the Gateway', anchor: 'enable-gateway',
      objective: 'Bring the gateway up, hosted or in your own cluster.',
      note: 'Hybrid installs a data plane. SaaS is a confirmation.',
      steps: [
        { variant: 'saas', heading: 'Step 2.1 (SaaS): Confirm the gateway is enabled', owner: 'PANW', hours: 1, who: [G.cloud], task: 'Confirm the hosted gateway is enabled and reachable' },

        { variant: 'hybrid', heading: 'Step 2.1 (Hybrid): Confirm what the cluster has to provide', owner: 'PANW / CUSTOMER', hours: 3, who: [G.k8s], task: 'Confirm the cluster meets the requirements the data plane depends on' },
        { variant: 'hybrid', heading: 'Step 2.2 (Hybrid): Register the gateway', owner: 'PANW / CUSTOMER', hours: 2, who: [G.cloud], task: 'Register the gateway and record its identifiers' },
        { variant: 'hybrid', heading: 'Step 2.3 (Hybrid): Choose which workspaces can use the gateway', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security, G.aiml], task: 'Choose which workspaces may use the gateway and record the decision' },
        { variant: 'hybrid', heading: 'Step 2.4 (Hybrid): Save the gateway deployment values and finish the wizard', owner: 'PANW', hours: 1.5, who: [G.k8s], task: 'Save the deployment values and complete the wizard' },
        { variant: 'hybrid', heading: 'Step 2.5 (Hybrid): Add your storage backends to values.yaml', owner: 'PANW / CUSTOMER', hours: 3, who: [G.k8s, G.cloud], task: 'Point values.yaml at the storage backends the gateway will use' },
        { variant: 'hybrid', heading: 'Hardening in-cluster MinIO and Redis for production', owner: 'PANW / CUSTOMER', hours: 6, who: [G.k8s, G.security], task: 'Harden in-cluster MinIO and Redis for production, or record that managed services are used instead' },
        { variant: 'hybrid', heading: 'Step 2.6 (Hybrid): Install the chart with Helm', owner: 'PANW / CUSTOMER', hours: 3, who: [G.k8s], task: 'Install the chart and confirm every pod reaches Running' },
        { variant: 'hybrid', heading: 'Step 2.7 (Hybrid): Verify the data plane in SCM', owner: 'PANW', hours: 2, who: [G.k8s, G.cloud], task: 'Confirm the data plane appears connected in Strata Cloud Manager' }
      ],
      milestone: { name: 'Gateway Milestone', criteria: ['Gateway enabled and reachable', 'Workspaces that may use the gateway agreed and recorded', 'Storage backends configured, managed or hardened in-cluster', 'Data plane connected in Strata Cloud Manager, where hybrid', 'No default credential left in place on in-cluster storage'] } },

    { num: 3, title: 'LLM Integration', anchor: 'llm-integration',
      objective: 'Connect a provider, expose the gateway, and route a real client through it.',
      steps: [
        { heading: 'Step 3.1: Select the LLM provider', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml], task: 'Select the LLM provider for this integration' },
        { heading: 'Step 3.2: Enter basic information — name, slug, and API key', owner: 'PANW / CUSTOMER', hours: 2, who: [G.aiml, G.security], task: 'Enter the integration name and slug, and supply the provider key from the secret store' },
        { heading: 'Step 3.3: Optional fields and advanced options — custom hosts and headers', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml], task: 'Set custom hosts and headers where the provider needs them, or record that defaults apply' },
        { heading: 'Step 3.4: Configure Pricing Adjustments (cost multipliers)', owner: 'PANW / CUSTOMER', hours: 2, who: [G.sponsor, G.aiml], task: 'Configure cost multipliers so reported spend matches the real contract' },
        { heading: 'Step 3.5: Set up workspace provisioning, budgets, and rate limits', owner: 'PANW / CUSTOMER', hours: 5, who: [G.aiml, G.sponsor], task: 'Provision workspaces and set budgets and rate limits per workspace' },
        { heading: 'Set a budget or rate limit for a workspace', owner: 'PANW / CUSTOMER', hours: 2, who: [G.sponsor], task: 'Set the budget and rate limit for each workspace and agree what happens when one is hit' },
        { heading: 'Step 3.6: Configure model provisioning and create the integration', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml], task: 'Provision the models and create the integration' },
        { variant: 'hybrid', heading: 'Step 3.7 (Hybrid): Expose the gateway service', owner: 'PANW / CUSTOMER', hours: 4, who: [G.k8s, G.security], task: 'Expose the gateway service to its callers and restrict who can reach it' },
        { variant: 'hybrid', heading: 'Expose the gateway behind TLS', owner: 'PANW / CUSTOMER', hours: 4, who: [G.k8s, G.security], task: 'Put TLS in front of the gateway and confirm the certificate chain validates from a client' },
        { heading: 'Step 3.7: Record the gateway address and model reference', owner: 'PANW', hours: 1, who: [G.aiml], task: 'Record the gateway address and model reference applications will use' },
        { heading: 'Step 3.8: Create a gateway API key', owner: 'PANW / CUSTOMER', hours: 1.5, who: [G.security], task: 'Create the gateway API key and agree where callers read it from' },
        { heading: 'Replace a gateway API key', owner: 'PANW / CUSTOMER', hours: 1, who: [G.security], task: 'Confirm the key replacement procedure, so rotation is routine rather than an incident' },
        { heading: 'Step 3.9: Route Claude Code through the gateway', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml, G.k8s], task: 'Route a real client through the gateway and confirm a call succeeds end to end' },
        { variant: 'hybrid', heading: 'Step 3.9 (Hybrid): Disable the SaaS gateway', owner: 'PANW / CUSTOMER', hours: 1, who: [G.cloud], task: 'Disable the SaaS gateway so traffic cannot silently fall back to it' },
        { heading: 'Step 3.10: Tell users and agents apart', owner: 'PANW / CUSTOMER', hours: 3, who: [G.security, G.aiml], task: 'Configure the gateway to distinguish users from agents, and confirm it in the logs' }
      ],
      milestone: { name: 'LLM Integration Milestone', criteria: ['Provider integration created and a real call succeeding through it', 'Provider key read from a secret store, never typed into a config file', 'Workspaces provisioned with budgets and rate limits, and the behavior at the limit agreed', 'Gateway exposed behind TLS to its intended callers only, where hybrid', 'SaaS gateway disabled on a hybrid deployment so traffic cannot fall back', 'Users and agents distinguishable in the logs', 'Key replacement procedure proven'] },
      meeting: {
        name: 'Workspace and Budget Review', when: 'Before workspaces are provisioned', position: 'step',
        beforeStep: 'Step 3.5: Set up workspace provisioning, budgets, and rate limits', minutes: 90,
        required: [G.sponsor, G.aiml, G.security, 'Professional Services Engineer'],
        optional: [G.k8s, G.cloud],
        agenda: [
          'Agree how workspaces map to teams and applications',
          'Set a budget and a rate limit for each workspace',
          'Agree what happens when a workspace hits its budget: throttle or stop',
          'Agree the cost multipliers so reported spend matches the real contract',
          'Confirm who is told when a limit is hit'
        ] } },

    { num: 4, title: 'MCP Integration', anchor: 'mcp-integration',
      objective: 'Put MCP servers behind the gateway and prove a tool call works.',
      steps: [
        { heading: 'Step 4.1: Find the MCP endpoint', owner: 'PANW', hours: 1, who: [G.aiml], task: 'Find the gateway MCP endpoint' },
        { heading: 'Step 4.2: Register the origin server in the MCP Registry', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml], task: 'Register the origin MCP server in the registry' },
        { heading: 'Step 4.3: Provision the server to workspaces', owner: 'PANW / CUSTOMER', hours: 2, who: [G.security, G.aiml], task: 'Provision the server only to the workspaces that need it' },
        { heading: 'Step 4.4: Build the server URL and understand its authentication', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml, G.security], task: 'Build the server URL and confirm how it authenticates' },
        { heading: 'Step 4.5: Point a client at the gateway and verify a tool call', owner: 'PANW / CUSTOMER', hours: 3, who: [G.aiml], task: 'Point a client at the gateway and confirm a tool call succeeds and is logged' }
      ],
      milestone: { name: 'MCP Milestone', criteria: ['Origin server registered in the MCP Registry', 'Server provisioned only to workspaces that need it', 'Server URL built and its authentication understood', 'A real tool call succeeding through the gateway', 'Tool call visible in the logs'] } },

    { num: 5, title: 'Guardrails and Logging', anchor: 'guardrails-logging',
      objective: 'Put security in front of the traffic and make sure it is recorded.',
      steps: [
        { heading: 'Step 5.1 (optional): Set policy-level budget and rate limits', owner: 'PANW / CUSTOMER', hours: 3, who: [G.sponsor, G.security], task: 'Set policy-level budget and rate limits, or record that workspace limits are enough' },
        { heading: 'Step 5.2: Configure the AI Runtime guardrail', owner: 'PANW / CUSTOMER', hours: 6, who: [G.security], task: 'Configure the AI Runtime guardrail and agree the detection categories and actions' },
        { heading: 'Step 5.3: Confirm event logs are flowing', owner: 'PANW / CUSTOMER', hours: 3, who: [G.security], task: 'Confirm event logs are flowing to where the security team reads them' },
        { heading: 'Step 5.4: Manage prompt logs and compliance export', owner: 'PANW / CUSTOMER', hours: 4, who: [G.security, G.sponsor], task: 'Agree prompt log retention and the compliance export, and confirm it against the data policy' },
        { heading: 'Step 5.5: Final end-to-end verification', owner: 'PANW / CUSTOMER', hours: 4, who: [G.aiml, G.security], task: 'Run the end-to-end verification covering a benign call, a blocked call, and a tool call' }
      ],
      milestone: { name: 'Guardrails and Handover Milestone', criteria: ['Guardrail configured with detection categories signed off by the security lead', 'Event logs reaching the security team', 'Prompt log retention and compliance export agreed against the data policy', 'End-to-end verification passing: benign, blocked, and tool call', 'Budget and rate limit behavior demonstrated at the limit', 'Runbooks delivered: key rotation, workspace provisioning, guardrail tuning'] },
      meeting: {
        name: 'Guardrail Review and Handover', when: 'End of Phase 5', position: 'after', minutes: 90,
        required: [G.sponsor, G.security, G.aiml, 'Professional Services Engineer', 'Project Manager'],
        optional: [G.k8s, G.cloud],
        agenda: [
          'Walk the end-to-end verification: benign, blocked, and tool call',
          'Confirm prompt log retention matches the data policy',
          'Agree the date for moving any alert-only guardrail to block',
          'Hand over the key rotation and workspace provisioning runbooks',
          'Agree the scope of the next wave of applications and MCP servers'
        ] } }
  ]
};

// ── AIRS Cloud Deployment ────────────────────────────────────────────────────

/* Six deployment models, each its own h2 section rather than a tab panel, so
 * the variant selects a section anchor instead of a plane. Phases A, B and C
 * are shared by all six. */
const CLOUD_DEPLOYMENT = {
  id: 'airs-cloud-deployment', name: 'AIRS Cloud Deployment',
  pillar: 'network-intercept',
  guide: AIRS_DIR + 'airs-cloud-deployment.html',
  summary: 'Deploy AIRS AI Runtime Firewalls by any of six models, from SCM Terraform through to a manual bootstrap.',
  modelPhases: [1, 2, 3],

  excludes: {
    'docs/guides/airs/airs-cloud-deployment.html#scm-terraform': [
      { heading: 'Dynamic Autoscaling Configuration', reason: 'Reference detail for Step 1.5, not a separate task' },
      { heading: 'AWS Egress Traffic Handling Scenarios', reason: 'Reference detail for Step 1.8, not a separate task' }
    ]
  },

  variants: {
    key: 'deploymentModel', label: 'Deployment model',
    note: 'Phases 1 to 3 are the same for every model. Phase 4 is the model you pick.',
    default: 'scm-terraform',
    options: [
      { id: 'scm-terraform', label: 'SCM Terraform Download' },
      { id: 'auto-execute', label: 'Auto-Execute (AWS and Azure)' },
      { id: 'panorama-managed', label: 'Panorama-Managed' },
      { id: 'vm-series', label: 'VM-Series from SCM' },
      { id: 'private-cloud', label: 'Private cloud (ESXi, KVM, OpenShift)' },
      { id: 'manual-bootstrap', label: 'Manual bootstrap (brownfield)' }
    ]
  },

  phases: [
    { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
      objective: 'Confirm licensing, access, and network readiness before any build work starts.',
      steps: [
        { heading: 'Step A.1 — License Requirements', owner: 'CUSTOMER / PANW', hours: 2, who: [P.sponsor, P.cloud], task: 'Confirm the AIRS subscription, flex credit pool, and authcode in the Customer Support Portal' },
        { heading: 'Step A.2 — Account Access', owner: 'CUSTOMER', hours: 3, who: [P.cloud], task: 'Provide TSG ID, region, and Strata Cloud Manager admin roles for the delivery team' },
        { heading: 'Step A.3 — Network Requirements', owner: 'CUSTOMER', hours: 4, who: [P.network], task: 'Allowlist the required FQDNs and ports for firewall-to-cloud-service communication' },
        { heading: 'Step A.4 — PAN-OS Version Requirements', owner: 'PANW', hours: 1, who: [P.network], task: 'Confirm the target PAN-OS version supports the features in scope' },
        { heading: 'Step A.5 — Cloud-Specific Prerequisites', owner: 'CUSTOMER', hours: 4, who: [P.cloud], task: 'Supply cloud account IDs, IAM roles or app registrations, and confirm instance quotas in the target regions' },
        { heading: 'Step A.6 — Panorama Prerequisites (if using Panorama management)', owner: 'CUSTOMER / PANW', hours: 2, who: [P.network], task: 'Confirm Panorama version, licensing, and admin access, or record that the deployment is SCM-managed' }
      ],
      milestone: { name: 'Prerequisites Milestone', criteria: ['AIRS subscription active and credit pool confirmed', 'TSG provisioned and delivery team holds SCM admin access', 'Required FQDNs and ports allowlisted and reachable from the target subnets', 'Cloud account IDs, IAM roles, and region quotas confirmed in writing', 'Deployment model chosen and the management platform agreed'] },
      meeting: {
        name: 'Kickoff and Deployment Model Selection', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: [P.sponsor, P.network, P.cloud, P.security, 'Professional Services Engineer', 'Project Manager'],
        optional: [P.app, 'Solutions Architect'],
        agenda: [
          'Confirm the cloud provider, regions, and accounts in scope',
          'Choose the deployment model against who runs Terraform and which management platform is used',
          'Walk the prerequisites checklist and assign an owner and date to each open item',
          'Confirm licensing state and credit allocation',
          'Agree the change control process and available change windows'
        ] } },

    { num: 2, title: 'License Activation and Foundation', anchor: 'license-foundation',
      objective: 'Activate the license and logging tenant, and create the credentials the firewall needs.',
      steps: [
        { heading: 'Step B.1 — Activate Your AIRS License', owner: 'CUSTOMER / PANW', hours: 2, who: [P.sponsor, P.cloud], task: 'Activate the AIRS license against the TSG and confirm it shows active' },
        { heading: 'Step B.2 — Activate Strata Logging Service', owner: 'CUSTOMER / PANW', hours: 2, who: [P.cloud, P.security], task: 'Activate Strata Logging Service in the correct region' },
        { heading: 'Step B.3 — Generate a Device Certificate', owner: 'PANW', hours: 1, who: [P.cloud], task: 'Generate the device certificate registration PIN and record its expiry' },
        { heading: 'Step B.4 — Create a Deployment Profile', owner: 'PANW', hours: 1, who: [P.cloud], task: 'Create the deployment profile, associate it with the TSG, and apply the authcode' }
      ],
      milestone: { name: 'Foundation Milestone', criteria: ['License active against the correct TSG', 'Strata Logging Service running in the agreed region', 'Device certificate PIN generated and within its validity window', 'Deployment profile created and associated with the TSG'] } },

    { num: 3, title: 'Cloud Account Onboarding and Discovery', anchor: 'cloud-onboarding',
      objective: 'Onboard the cloud accounts and establish what AI traffic exists.',
      steps: [
        { heading: 'Step C.1 — Navigate to Cloud Account Manager', owner: 'PANW', hours: 0.5, who: [P.cloud], task: 'Open Cloud Account Manager and confirm the tenant is ready to onboard accounts' },
        { heading: 'Step C.2 — Onboard Cloud Account', owner: 'PANW / CUSTOMER', hours: 4, who: [P.cloud], task: 'Onboard each AWS account or Azure subscription and confirm it reaches Active state' },
        { heading: 'Step C.3 — Review Cloud Asset Map', owner: 'PANW / CUSTOMER', hours: 3, who: [P.cloud, P.network], task: 'Review the discovered assets against the customer inventory and resolve gaps' },
        { heading: 'Step C.4 — Analyze AI Traffic & Network Risk', owner: 'PANW / CUSTOMER', hours: 8, who: [P.app, P.security, P.network], task: 'Analyze discovered AI traffic and agree which flows are in scope for inspection' },
        { heading: 'Step C.5 — Configure Agent Discovery (Optional)', owner: 'PANW', hours: 4, who: [P.network], task: 'Deploy agent discovery where host-level visibility is needed, or record the decision to skip it' }
      ],
      milestone: { name: 'Discovery Milestone', criteria: ['Every in-scope cloud account Active in Cloud Account Manager', 'Cloud Asset Map reconciled against the customer inventory', 'AI traffic inventory agreed with the applications and models in scope', 'Sizing confirmed against the discovered traffic volume', 'Agent discovery deployed or explicitly descoped'] } },

    { num: 4, title: 'Deploy the Firewalls', anchor: 'scm-terraform',
      objective: 'Build the firewalls using the chosen deployment model and confirm they register.',
      note: 'Steps follow the deployment model chosen at kickoff. This phase changes the traffic path; treat it as a change window.',
      steps: [
        { variant: 'scm-terraform', owner: 'PANW', hours: 0.5, who: [P.cloud], heading: 'Step 1.1: Navigate to SCM AI Runtime Firewall', task: 'Open the AI Runtime Firewall deployment wizard in Strata Cloud Manager' },
        { variant: 'scm-terraform', owner: 'PANW', hours: 1, who: [P.network], heading: 'Step 1.2: Select Cloud Provider and Traffic Streams', task: 'Select the cloud provider and the traffic streams to inspect' },
        { variant: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 1, who: [P.cloud, P.app], heading: 'Step 1.3: Select Region, Account, and Applications', task: 'Select the region, cloud account, and applications to bring behind the firewall' },
        { variant: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 2, who: [P.app, P.network], heading: 'Step 1.4: Configure Traffic Inspection', task: 'Configure which traffic directions are inspected and confirm with the application owners' },
        { variant: 'scm-terraform', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 1.5: Configure Deployment Parameters', task: 'Set instance type, availability zones, and autoscaling against the sizing estimate' },
        { variant: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network], heading: 'Step 1.6: Configure IP Addressing', task: 'Allocate the CIDR ranges and confirm they do not overlap existing networks' },
        { variant: 'scm-terraform', owner: 'PANW', hours: 1, who: [P.cloud], heading: 'Step 1.7: Configure Licensing', task: 'Apply the deployment profile and authcode to the deployment' },
        { variant: 'scm-terraform', owner: 'PANW', hours: 1, who: [P.network], heading: 'Step 1.8: Configure Management Parameters', task: 'Set the management platform, device certificate PIN, and administrative credentials' },
        { variant: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network], heading: 'Step 1.9: Review Architecture and Create Terraform Template', task: 'Review the generated architecture with the network team and download the Terraform template' },
        { variant: 'scm-terraform', owner: 'CUSTOMER', hours: 1, who: [P.cloud], heading: 'Step 1.10: Accept Marketplace Subscription', task: 'Accept the cloud marketplace subscription for the image' },
        { variant: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 6, who: [P.cloud, P.network], heading: 'Step 1.11: Deploy security_project Terraform', task: 'Apply the security project Terraform and confirm the firewalls come up healthy' },
        { variant: 'scm-terraform', owner: 'PANW / CUSTOMER', hours: 4, who: [P.network, P.app], heading: 'Step 1.12: Deploy application_project Terraform', task: 'Apply the application project Terraform to steer the in-scope traffic through the firewalls' },
        { variant: 'scm-terraform', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 1.13: Verify Firewall Connectivity', task: 'Confirm every firewall has registered with the management platform' },

        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW', hours: 0.5, who: [P.cloud], heading: 'Step 2.1: Navigate to SCM and Select Auto-Execute', task: 'Open the deployment wizard and select the Auto-Execute path' },
        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW / CUSTOMER', hours: 1, who: [P.app, P.cloud], heading: 'Step 2.2: Select Applications', task: 'Select the applications from the Cloud Asset Map to bring behind the firewall' },
        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 2.3: Configure Deployment Parameters', task: 'Set instance type, availability zones, and autoscaling against the sizing estimate' },
        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW / CUSTOMER', hours: 2, who: [P.network], heading: 'Step 2.4: Configure IP Addressing', task: 'Allocate the CIDR ranges and confirm they do not overlap existing networks' },
        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW', hours: 1.5, who: [P.cloud], heading: 'Step 2.5: Configure Licensing and Management', task: 'Apply the deployment profile, authcode, and management platform settings' },
        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW / CUSTOMER', hours: 1, who: [P.network], heading: 'Step 2.6: Review and Deploy', task: 'Review the generated architecture with the network team and start the deployment' },
        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW', hours: 3, who: [P.network], heading: 'Step 2.7: Monitor Deployment Progress', task: 'Monitor the orchestrated deployment and resolve any provisioning failures' },
        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 2.8: Verify Firewall Connectivity', task: 'Confirm every firewall has registered with the management platform' },
        { variant: 'auto-execute', anchor: 'auto-execute', owner: 'PANW / CUSTOMER', hours: 2, who: [P.cloud], heading: 'Decommissioning Auto-Execute Firewalls', task: 'Confirm the decommissioning procedure before go-live, so teardown is understood rather than discovered' },

        { variant: 'panorama-managed', anchor: 'panorama-managed', owner: 'PANW / CUSTOMER', hours: 6, who: [P.network], heading: 'Step 3.1: Prepare Panorama Prerequisites', task: 'Confirm Panorama version and licensing, and create the templates and device groups the firewalls join' },
        { variant: 'panorama-managed', anchor: 'panorama-managed', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 3.2: Configure Management as Panorama in SCM Wizard', task: 'Set Panorama as the management platform and supply the VM auth key' },
        { variant: 'panorama-managed', anchor: 'panorama-managed', owner: 'PANW / CUSTOMER', hours: 6, who: [P.cloud, P.network], heading: 'Step 3.3: Run Terraform', task: 'Apply the Terraform and confirm the firewalls bootstrap against Panorama' },
        { variant: 'panorama-managed', anchor: 'panorama-managed', owner: 'CUSTOMER', hours: 1, who: [P.network], heading: 'Step 3.4: Add Firewall IP to Panorama Security Group (If Applicable)', task: 'Allow the firewall management addresses through to Panorama' },
        { variant: 'panorama-managed', anchor: 'panorama-managed', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 3.5: Verify Firewall in Panorama', task: 'Confirm every firewall appears connected and in sync in Panorama' },

        { variant: 'vm-series', anchor: 'vm-series', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network], heading: 'Step 4.1: Prerequisites and Constraints', task: 'Confirm the VM-Series constraints and that nothing in scope depends on an AI-only capability' },
        { variant: 'vm-series', anchor: 'vm-series', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 4.2: Select VM-Series in Deployment Parameters', task: 'Select VM-Series in the deployment parameters' },
        { variant: 'vm-series', anchor: 'vm-series', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network], heading: 'Step 4.3: Complete Wizard and Download Terraform', task: 'Complete the wizard and download the Terraform template' },
        { variant: 'vm-series', anchor: 'vm-series', owner: 'PANW / CUSTOMER', hours: 8, who: [P.cloud, P.network], heading: 'Step 4.4: Run Terraform', task: 'Apply the Terraform and confirm the firewalls come up healthy' },
        { variant: 'vm-series', anchor: 'vm-series', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 4.5: Verify in SCM or Panorama', task: 'Confirm every firewall has registered with the management platform' },

        { variant: 'private-cloud', anchor: 'private-cloud', owner: 'PANW / CUSTOMER', hours: 2, who: [P.cloud], heading: 'Step 5.1: Download the AIRS Image', task: 'Download the AIRS image for the target hypervisor' },
        { variant: 'private-cloud', anchor: 'private-cloud', owner: 'CUSTOMER / PANW', hours: 4, who: [P.network], heading: 'Step 5.2: Create VM with 3 Interfaces', task: 'Create the VM with three interfaces mapped to the right port groups' },
        { variant: 'private-cloud', anchor: 'private-cloud', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 5.3: Create Bootstrap Folder Structure', task: 'Create the bootstrap folder structure' },
        { variant: 'private-cloud', anchor: 'private-cloud', owner: 'PANW', hours: 4, who: [P.network], heading: 'Step 5.4: Create Bootstrap Files', task: 'Write the bootstrap files, including init-cfg.txt and the authcodes' },
        { variant: 'private-cloud', anchor: 'private-cloud', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network], heading: 'Step 5.5: Create ISO and Boot VM', task: 'Build the ISO, attach it, and boot the VM' },
        { variant: 'private-cloud', anchor: 'private-cloud', owner: 'PANW', hours: 3, who: [P.network], heading: 'Step 5.6: Verify Bootstrap Completion', task: 'Confirm the bootstrap completed and the firewall licensed itself' },
        { variant: 'private-cloud', anchor: 'private-cloud', owner: 'PANW', hours: 2, who: [P.network], heading: 'Step 5.7: Verify in SCM or Panorama', task: 'Confirm the firewall has registered with the management platform' },

        { variant: 'manual-bootstrap', anchor: 'manual-bootstrap', owner: 'PANW / CUSTOMER', hours: 3, who: [P.network, P.cloud], heading: 'Step 6.1: Choose a Bootstrap Method', task: 'Choose the bootstrap method that fits the existing brownfield infrastructure' },
        { variant: 'manual-bootstrap', anchor: 'manual-bootstrap', owner: 'PANW', hours: 4, who: [P.network], heading: 'Step 6.2: Configure init-cfg.txt Parameters', task: 'Write init-cfg.txt with the tenant, certificate, and management parameters' },
        { variant: 'manual-bootstrap', anchor: 'manual-bootstrap', owner: 'PANW / CUSTOMER', hours: 5, who: [P.network], heading: 'Step 6.3: Configure Routing', task: 'Configure the routing that steers the in-scope traffic through the firewall' },
        { variant: 'manual-bootstrap', anchor: 'manual-bootstrap', owner: 'PANW', hours: 2, who: [P.cloud], heading: 'Step 6.4: Apply Required Labels for Manual Terraform', task: 'Apply the labels the platform requires to recognize the firewall' },
        { variant: 'manual-bootstrap', anchor: 'manual-bootstrap', owner: 'PANW / CUSTOMER', hours: 6, who: [P.network, P.cloud], heading: 'Step 6.5: Deploy and Verify', task: 'Deploy the firewall and confirm it registers and passes traffic' }
      ],
      milestone: { name: 'Deployment Milestone', criteria: ['Firewalls deployed in every in-scope region and reporting healthy', 'Every firewall connected and in sync with the management platform', 'Routing changed so the in-scope AI traffic traverses the inspection point', 'Traffic confirmed arriving at the firewall in the session log', 'Rollback path for the routing change documented and agreed', 'Teardown procedure understood before go-live'] },
      meeting: {
        name: 'Deployment Change Window Briefing', when: 'Before the irreversible deployment step', position: 'step',
        beforeStep: {
          'scm-terraform': 'Step 1.11: Deploy security_project Terraform',
          'auto-execute': 'Step 2.6: Review and Deploy',
          'panorama-managed': 'Step 3.3: Run Terraform',
          'vm-series': 'Step 4.4: Run Terraform',
          'private-cloud': 'Step 5.5: Create ISO and Boot VM',
          'manual-bootstrap': 'Step 6.5: Deploy and Verify'
        },
        minutes: 60,
        required: [P.network, P.cloud, 'Professional Services Engineer', 'Project Manager'],
        optional: [P.sponsor, P.security, P.app],
        agenda: [
          'Confirm the change window and the approved change record',
          'Walk the deployment and the exact rollback steps',
          'Agree the rollback trigger and who is authorized to call it',
          'Confirm who is on the bridge and how they are reached',
          'Confirm whether a preemptive TAC case is needed for the window'
        ] } },

    { num: 5, title: 'Post-Deployment', anchor: 'post-deployment',
      objective: 'Confirm what happens next and hand over.',
      steps: [
        { heading: 'Next Steps', owner: 'PANW / CUSTOMER', hours: 3, who: [P.security, P.network], task: 'Walk the next steps with the customer: security profile configuration, validation, and which guide carries each' }
      ],
      milestone: { name: 'Handover Milestone', criteria: ['Firewalls deployed, healthy, and passing traffic', 'Next phase agreed: security profile configuration and validation', 'Troubleshooting runbook handed over', 'Teardown and license release procedure understood'] },
      meeting: {
        name: 'Deployment Review and Handover', when: 'End of Phase 5', position: 'after', minutes: 60,
        required: [P.network, P.cloud, P.security, 'Professional Services Engineer', 'Project Manager'],
        optional: [P.sponsor],
        agenda: [
          'Walk the deployed topology and confirm it matches what was designed',
          'Confirm traffic is reaching the firewalls',
          'Hand over the troubleshooting runbook and the teardown procedure',
          'Agree who configures the security profile and when'
        ] } }
  ]
};

// ── AI Red Teaming ───────────────────────────────────────────────────────────

const RT = {
  sponsor: 'Project Sponsor',
  lead: 'AI / ML Technical Lead',
  security: 'Security Lead',
  app: 'Application Owner',
  proxy: 'Network / Proxy Lead',
  soc: 'SOC / Security Operations'
};

const RED_TEAMING = {
  id: 'red-teaming', name: 'AI Red Teaming', pillar: 'red-teaming',
  guide: 'docs/guides/airs-red/airs-red-teaming.html',
  summary: 'Scan AI applications and agents for adversarial weaknesses, then turn the findings into remediation work.',

  variants: {
    key: 'targetType', label: 'Target type',
    note: 'The target wizard differs by endpoint type. Everything before and after it is the same.',
    default: 'rest-api',
    options: [
      { id: 'rest-api', label: 'REST API', plane: 'rest-api' },
      { id: 'streaming', label: 'Streaming endpoint', plane: 'streaming' },
      { id: 'websocket', label: 'WebSocket', plane: 'websocket' },
      { id: 'copilot-studio', label: 'Microsoft Copilot Studio', plane: 'copilot-studio' },
      { id: 'custom-adapter', label: 'Custom adapter', plane: 'custom-adapter' }
    ]
  },

  excludes: {
    'docs/guides/airs-red/airs-red-teaming.html#targets': [
      { heading: 'Troubleshooting', reason: 'Troubleshooting for the custom adapter, not a delivery task' }
    ]
  },

  phases: [
    { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
      objective: 'Confirm licensing, access, and that the targets can actually be reached.',
      steps: [
        { heading: 'License & Subscription', owner: 'CUSTOMER / PANW', hours: 2, who: [RT.sponsor], task: 'Confirm the Red Teaming subscription covers the targets and scan volume in scope' },
        { heading: 'Strata Logging Service (SLS)', owner: 'CUSTOMER / PANW', hours: 2, who: [RT.security], task: 'Confirm Strata Logging Service is active in the right region' },
        { heading: 'Tenant Service Group (TSG) & Region', owner: 'CUSTOMER', hours: 2, who: [RT.lead], task: 'Confirm the TSG and region, and that the region is supported' },
        { heading: 'IAM & Permissions', owner: 'CUSTOMER', hours: 3, who: [RT.security], task: 'Grant the delivery team the roles Red Teaming needs' },
        { heading: 'Target Endpoint Requirements', owner: 'CUSTOMER / PANW', hours: 4, who: [RT.app, RT.lead], task: 'Confirm each target endpoint meets the requirements, including authentication and rate limits' },
        { heading: 'Network Channel Requirements (Private Endpoints Only)', owner: 'CUSTOMER / PANW', hours: 3, who: [RT.proxy], task: 'Confirm the network channel requirements for private endpoints, or record that every target is public' },
        { heading: 'Supported Regions', owner: 'PANW', hours: 1, who: [RT.lead], task: 'Confirm the tenant region is supported for the scans in scope' }
      ],
      milestone: { name: 'Prerequisites Milestone', criteria: ['Subscription confirmed against the target count and scan volume', 'TSG and region confirmed and supported', 'Delivery team holds the roles Red Teaming needs', 'Every target endpoint reachable, with its authentication understood', 'Written authorization to attack each target, from someone who can give it', 'Network channel scoped in for private endpoints, or every target confirmed public'] },
      meeting: {
        name: 'Kickoff and Rules of Engagement', when: 'Before Phase 1 work begins', position: 'before', minutes: 90,
        required: [RT.sponsor, RT.lead, RT.security, RT.app, 'Professional Services Engineer', 'Project Manager'],
        optional: [RT.proxy, RT.soc, 'Solutions Architect'],
        agenda: [
          'Confirm which applications and agents are in scope, and get that authorization in writing',
          'Agree the scan window, so the SOC does not treat it as a live incident',
          'Agree rate limits and what happens if a target falls over under scan',
          'Confirm whether targets are production or a representative copy',
          'Agree who receives the findings and who owns remediation'
        ] } },

    { num: 2, title: 'Foundation', anchor: 'foundation',
      objective: 'Create the profile and permissions, and get into the dashboard.',
      steps: [
        { heading: 'Step 3.1: Create a Deployment Profile', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.lead], task: 'Create the deployment profile and associate it with the tenant' },
        { heading: 'Step 3.2: Configure IAM', owner: 'CUSTOMER / PANW', hours: 3, who: [RT.security], task: 'Configure the IAM roles the scanning service needs' },
        { heading: 'Step 3.3: Access the Dashboard', owner: 'PANW', hours: 1, who: [RT.lead], task: 'Confirm the delivery team can reach the Red Teaming dashboard' }
      ],
      milestone: { name: 'Foundation Milestone', criteria: ['Deployment profile created and associated with the tenant', 'IAM configured least-privilege', 'Dashboard reachable by everyone who needs it'] } },

    { num: 3, title: 'Target Configuration', anchor: 'targets',
      objective: 'Define the targets and prove the platform can actually talk to them.',
      steps: [
        { heading: 'Step 4.1: Understand Target Types', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.lead, RT.app], task: 'Walk the target types and confirm which applies to each application in scope' },
        { heading: 'Step 4.2: Add a Target', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.lead], task: 'Start the target wizard for the first target' },

        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 1, who: [RT.lead], heading: 'Wizard Step 1 — Target Details', task: 'Enter the target details' },
        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.proxy, RT.lead], heading: 'Wizard Step 2 — Endpoint Accessibility: Public vs Private', task: 'Set endpoint accessibility and confirm the path the scanner will take' },
        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.app], heading: 'Wizard Step 3 — Choose Method: cURL Import or Manual Entry', task: 'Choose between cURL import and manual entry' },
        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.app], heading: 'Method A — Browser Developer Tools (recommended for agents with a web UI)', task: 'Capture the request with browser developer tools, where the agent has a web UI' },
        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.app], heading: 'Method B — API Documentation or Postman Collection', task: 'Build the request from the API documentation or a Postman collection, or record that Method A was used' },
        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.app], heading: 'Method C — Platform Console Code Snippet', task: 'Build the request from a platform console snippet, or record that another method was used' },
        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 1.5, who: [RT.lead], heading: 'Wizard Step 4 — Add / Verify Parameters', task: 'Add and verify the request parameters' },
        { variant: 'rest-api', owner: 'PANW', hours: 2, who: [RT.lead], heading: 'Wizard Step 5 — Verify & Edit JSON', task: 'Verify and edit the request JSON' },
        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.lead, RT.app], heading: 'Wizard Step 6 — Advanced Configurations & Target Validation', task: 'Set the advanced configuration and run target validation until it passes' },
        { variant: 'rest-api', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.app, RT.security], heading: 'Wizard Step 7 — Target Background', task: 'Supply the target background that makes the generated attacks relevant' },

        { variant: 'streaming', owner: 'PANW / CUSTOMER', hours: 1, who: [RT.lead], heading: 'Wizard Step 1 — Target Details', task: 'Enter the target details' },
        { variant: 'streaming', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.proxy, RT.lead], heading: 'Wizard Step 2 — Endpoint Accessibility', task: 'Set endpoint accessibility and confirm the path the scanner will take' },
        { variant: 'streaming', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.app], heading: 'Wizard Step 3 — cURL Import', task: 'Import the request as cURL and confirm it reproduces a real call' },
        { variant: 'streaming', owner: 'PANW / CUSTOMER', hours: 1.5, who: [RT.lead], heading: 'Wizard Step 4 — Add / Verify Parameters', task: 'Add and verify the request parameters' },
        { variant: 'streaming', owner: 'PANW', hours: 2, who: [RT.lead], heading: 'Wizard Step 5 — Verify & Edit JSON', task: 'Verify and edit the request JSON, including how streamed chunks are parsed' },
        { variant: 'streaming', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.lead, RT.app], heading: 'Wizard Step 6 — Advanced Configurations & Validate', task: 'Set the advanced configuration and run target validation until it passes' },

        { variant: 'websocket', owner: 'PANW / CUSTOMER', hours: 1, who: [RT.lead], heading: 'Wizard Step 1 — Target Details', task: 'Enter the target details' },
        { variant: 'websocket', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.proxy, RT.lead], heading: 'Wizard Step 2 — Endpoint Accessibility', task: 'Set endpoint accessibility and confirm the path the scanner will take' },
        { variant: 'websocket', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.app], heading: 'Wizard Step 3 — Add / Verify Parameters (Manual Entry)', task: 'Enter and verify the WebSocket parameters by hand' },
        { variant: 'websocket', owner: 'PANW', hours: 2, who: [RT.lead], heading: 'Wizard Step 4 — Verify & Edit JSON', task: 'Verify and edit the message JSON' },
        { variant: 'websocket', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.lead, RT.app], heading: 'Wizard Step 5 — Advanced Configurations & Validate', task: 'Set the advanced configuration and run target validation until it passes' },

        { variant: 'copilot-studio', owner: 'CUSTOMER / PANW', hours: 4, who: [RT.app, RT.security], heading: 'Pre-work — Create the Entra ID App Registration', task: 'Create the Entra ID app registration the connector needs' },
        { variant: 'copilot-studio', owner: 'CUSTOMER / PANW', hours: 3, who: [RT.app], heading: 'Pre-work — Collect the Five Required Field Values', task: 'Collect the five field values the wizard asks for' },
        { variant: 'copilot-studio', owner: 'PANW / CUSTOMER', hours: 5, who: [RT.lead, RT.app], heading: 'Wizard Steps — Full Configuration Flow', task: 'Work through the configuration flow and run target validation until it passes' },

        { variant: 'custom-adapter', owner: 'CUSTOMER / PANW', hours: 5, who: [RT.proxy, RT.lead], heading: 'Step 1 — Set Up Prerequisites: Network Channel v1.4.0+ with Adapter Sidecar', task: 'Stand up the network channel at the required version with the adapter sidecar' },
        { variant: 'custom-adapter', owner: 'PANW / CUSTOMER', hours: 8, who: [RT.lead, RT.app], heading: 'Step 2 — Write the Python Adapter Script', task: 'Write the Python adapter that translates between the platform and the target' },
        { variant: 'custom-adapter', owner: 'PANW / CUSTOMER', hours: 4, who: [RT.lead], heading: 'Step 3 — Test and Validate in the Adapter Editor', task: 'Test the adapter in the editor until it returns clean responses' },
        { variant: 'custom-adapter', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.lead], heading: 'Step 4 — Attach the Adapter to a Target', task: 'Attach the adapter to the target and run validation' },

        { heading: 'Step 4.3: Configure Target Details', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.lead, RT.app], task: 'Complete the target details, including anything the wizard left blank' },
        { heading: 'Step 4.4: Validate Target Connection', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.lead], task: 'Validate the target connection and resolve any failure before scanning' },
        { heading: 'Step 4.5: Agentic Profiling (Agent Targets Only)', owner: 'PANW / CUSTOMER', hours: 4, who: [RT.lead, RT.app], task: 'Run agentic profiling for agent targets, or record that the target is not an agent' }
      ],
      milestone: { name: 'Target Milestone', criteria: ['Every in-scope target defined in the platform', 'Target validation passing for each one', 'Target background supplied so generated attacks are relevant', 'Agentic profiling complete for agent targets, or explicitly not applicable', 'Credentials used by the scanner held securely and scoped to a test identity where possible'] } },

    { num: 4, title: 'Network Channels', anchor: 'network-channels',
      objective: 'Reach private targets without opening them to the internet.',
      steps: [
        { heading: 'Step 5.1: When You Need a Network Channel', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.proxy, RT.lead], task: 'Confirm which targets need a network channel, and record that the rest are public' },
        { heading: 'Step 5.2: Create a Network Channel', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.proxy], task: 'Create the network channel' },
        { heading: 'Step 5.3: Deploy the Channel Client', owner: 'PANW / CUSTOMER', hours: 4, who: [RT.proxy], task: 'Deploy the channel client inside the network that can reach the targets' },
        { heading: 'Step 5.4: Verify Channel Connectivity', owner: 'PANW', hours: 2, who: [RT.proxy], task: 'Confirm the channel is connected and the targets are reachable through it' },
        { heading: 'Step 5.5: Custom SSL & Private Certificates', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.proxy, RT.security], task: 'Load the private certificate chain, or record that public certificates are used' }
      ],
      milestone: { name: 'Network Channel Milestone', criteria: ['Channel created and the client deployed where it can reach the targets', 'Channel connectivity verified against a real target', 'Private certificate chain loaded where needed', 'No target exposed to the internet to make scanning work'] } },

    { num: 5, title: 'Scanning', anchor: 'scanning',
      objective: 'Run the scans the engagement agreed, inside the agreed window.',
      note: 'Scans generate adversarial traffic against real systems. Confirm the SOC is expecting it.',
      steps: [
        { heading: 'Step 6.1: Understand Scan Types', owner: 'PANW / CUSTOMER', hours: 2, who: [RT.lead, RT.security], task: 'Walk the scan types and agree which apply to each target' },
        { heading: 'Step 6.2: Configure Scan Categories', owner: 'PANW / CUSTOMER', hours: 4, who: [RT.security], task: 'Configure the attack categories for each target and record anything deliberately excluded' },
        { heading: 'Step 6.3: Start an Attack Library Scan', owner: 'PANW / CUSTOMER', hours: 3, who: [RT.lead], task: 'Start the attack library scan inside the agreed window' },
        { heading: 'Step 6.4: Start a Dynamic (Agent) Scan', owner: 'PANW / CUSTOMER', hours: 4, who: [RT.lead], task: 'Start the dynamic agent scan, or record that no target warrants one' },
        { heading: 'Step 6.5: Custom Prompt Scans', owner: 'PANW / CUSTOMER', hours: 4, who: [RT.security, RT.app], task: 'Build and run custom prompt scans for risks specific to this application' },
        { heading: 'Step 6.6: Monitor Scan Progress', owner: 'PANW', hours: 3, who: [RT.lead], task: 'Monitor progress and stop the scan if a target degrades' }
      ],
      milestone: { name: 'Scanning Milestone', criteria: ['Scan categories agreed per target, with exclusions recorded', 'SOC notified before the scan window opened', 'Attack library scan completed on every in-scope target', 'Dynamic and custom scans run, or explicitly descoped', 'No target left degraded by the scan'] },
      meeting: {
        name: 'Scan Window Briefing', when: 'Before the first scan starts', position: 'step',
        beforeStep: 'Step 6.3: Start an Attack Library Scan', minutes: 45,
        required: [RT.lead, RT.security, RT.app, RT.soc, 'Professional Services Engineer', 'Project Manager'],
        optional: [RT.sponsor, RT.proxy],
        agenda: [
          'Confirm the scan window and that the SOC will not treat it as an incident',
          'Confirm which targets are being scanned and with which categories',
          'Agree the stop condition if a target degrades, and who can call it',
          'Confirm who is reachable during the window'
        ] } },

    { num: 6, title: 'Reporting and Remediation', anchor: 'validation',
      objective: 'Turn results into findings someone owns.',
      steps: [
        { heading: 'Step 8.1: Review Scan Reports', owner: 'PANW / CUSTOMER', hours: 6, who: [RT.security, RT.lead], task: 'Review the scan reports and separate real findings from noise' },
        { heading: 'Step 8.2: Analyze Attack Results', owner: 'PANW / CUSTOMER', hours: 8, who: [RT.security, RT.app], task: 'Analyze the successful attacks and establish what each one actually proves' },
        { heading: 'Step 8.3: Review Remediation Guidance', owner: 'PANW / CUSTOMER', hours: 6, who: [RT.security, RT.app, RT.lead], task: 'Walk the remediation guidance and agree an owner and a date for each finding' },
        { heading: 'Step 8.4: Download Reports', owner: 'PANW', hours: 2, who: [RT.security], task: 'Download the reports and store them where the customer keeps security findings' }
      ],
      milestone: { name: 'Reporting and Handover Milestone', criteria: ['Every finding triaged into real or noise, with a reason recorded', 'Successful attacks explained in terms of what they let an attacker do', 'Each real finding has a named owner and a date', 'Reports stored in the customer security findings system', 'Re-scan scheduled to confirm the remediation worked'] },
      meeting: {
        name: 'Findings Review and Remediation Planning', when: 'End of Phase 6', position: 'after', minutes: 120,
        required: [RT.sponsor, RT.security, RT.lead, RT.app, 'Professional Services Engineer', 'Project Manager'],
        optional: [RT.soc],
        agenda: [
          'Walk the findings in severity order, with a demonstration for the worst',
          'Separate real findings from noise and record why for each',
          'Assign an owner and a date to every real finding',
          'Agree which findings block a release and which are accepted risk',
          'Schedule the re-scan that proves the remediation worked'
        ] } }
  ]
};

// ── Integrations ─────────────────────────────────────────────────────────────

/* Customer-side personas for API Intercept, which every integration hangs
 * off in the engagement model. */
const A = {
  sponsor: 'Project Sponsor',
  api: 'API Platform / Gateway Team',
  security: 'Security Lead',
  dev: 'Application Developer / Owner',
  devops: 'K8s / DevOps Engineer',
  cloud: 'Cloud Account Admin'
};

const INT = 'docs/guides/airs-integrations/';

/* Jenkins and GitHub Actions scan models in CI rather than intercepting an
 * API call, so they hang off Model Security and use its personas. The two
 * roles that matter are the pipeline owner, who holds the credentials and the
 * build, and the model owner, whose release a finding blocks. */
const C = {
  sponsor: 'Project Sponsor',
  owner: 'AI / ML Model Owner',
  security: 'Security Lead',
  cicd: 'CI/CD Pipeline Owner',
  privacy: 'Data / Privacy Lead'
};

/* Every integration runs the same two conversations: agree the scope and the
 * security profile before touching the gateway, then prove it works and hand
 * it over. A one-to-three day job does not support more ceremony than that,
 * and inventing a meeting per phase produces a schedule nobody keeps. */
const dedupe = a => [...new Set(a)];

function intKickoff(name, owners, extra) {
  return {
    name: `${name} Kickoff and Profile Review`,
    when: 'Before any configuration change', position: 'before', minutes: 60,
    required: dedupe(owners.concat([A.security, 'Professional Services Engineer'])),
    optional: [A.sponsor],
    agenda: [
      'Confirm which applications and routes this integration covers',
      'Agree the AIRS security profile and whether the pilot runs in alert or block',
      'Confirm who holds the AIRS API key and where it is stored',
      'Agree the change window and the rollback path'
    ].concat(extra || [])
  };
}

function intHandover(name, owners, extra) {
  return {
    name: `${name} Verification and Handover`,
    when: 'After the verification tests', position: 'after', minutes: 60,
    required: dedupe(owners.concat([A.security, 'Professional Services Engineer'])),
    optional: [A.sponsor, A.dev],
    agenda: [
      'Walk the verification results: benign traffic passes, malicious traffic is blocked',
      'Review what reached the AIRS logs and agree who watches them',
      'Agree the date for moving any alert-only detection to block',
      'Hand over the rollback and key rotation procedure'
    ].concat(extra || [])
  };
}

const INTEGRATIONS = [
  {
    id: 'apigee', name: 'Apigee', component: 'apigee', guide: INT + 'apigee.html',
    summary: 'Scan Vertex AI traffic through Apigee X with an AIRS shared flow applied to the proxy.',
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm the Apigee organization, Vertex AI access, and AIRS credentials.',
        steps: [
          { heading: 'Step 1.1: Confirm Apigee X Organization and Environment', owner: 'CUSTOMER', hours: 1, who: [A.api], task: 'Confirm the Apigee X organization and target environment, and that the delivery team can deploy to it' },
          { heading: 'Step 1.2: Enable Vertex AI API', owner: 'CUSTOMER', hours: 1, who: [A.cloud], task: 'Enable the Vertex AI API in the target Google Cloud project' },
          { heading: 'Step 1.3: Create Vertex AI Service Account', owner: 'CUSTOMER', hours: 1.5, who: [A.cloud], task: 'Create the Vertex AI service account and grant it the roles the proxy needs' },
          { heading: 'Step 1.4: Obtain Prisma AIRS API Key', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Obtain the AIRS API key and agree where it is stored' },
          { heading: 'Step 1.5: Configure AIRS Security Profile', owner: 'PANW / CUSTOMER', hours: 2, who: [A.security], task: 'Configure the AIRS security profile with the detection categories and actions for this traffic' },
          { heading: 'Step 1.6: Install Required CLI Tools', owner: 'CUSTOMER', hours: 0.5, who: [A.api], task: 'Install apigeecli and the supporting tools on the build host' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['Apigee organization and environment confirmed with deploy access', 'Vertex AI API enabled and service account created', 'AIRS API key issued and storage location agreed', 'AIRS security profile configured and signed off by the security lead', 'CLI tooling installed and authenticated'] },
        meeting: intKickoff('Apigee', [A.api, A.cloud]) },
      { num: 2, title: 'Shared Flow and Proxy', anchor: 'shared-flow',
        objective: 'Deploy the AIRS shared flow and understand how the proxy calls it.',
        steps: [
          { heading: 'Step 2.1: Create the Encrypted KVM', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api, A.security], task: 'Create the encrypted key value map and load the AIRS API key into it' },
          { heading: 'Step 2.2: Understand Shared Flow Policies', owner: 'PANW', hours: 1, who: [A.api], task: 'Walk the shared flow policies so the gateway team can support them' },
          { heading: 'Step 2.3: Import and Deploy the Shared Flow', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api], task: 'Import and deploy the shared flow to the target environment' },
          { anchor: 'proxy-config', heading: 'Step 3.1: Understand the Proxy Structure', owner: 'PANW', hours: 0.5, who: [A.api], task: 'Walk the proxy structure and where the shared flow is attached' },
          { anchor: 'proxy-config', heading: 'Step 3.2: Understand the API Contract', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api, A.dev], task: 'Confirm the API contract the proxy presents and that callers already match it' }
        ],
        milestone: { name: 'Shared Flow Milestone', criteria: ['Encrypted KVM created with the AIRS key loaded', 'Shared flow deployed to the target environment', 'Proxy structure and attachment point understood by the gateway team', 'API contract confirmed against what callers already send'] } },
      { num: 3, title: 'Authentication and Deployment', anchor: 'auth-setup',
        objective: 'Confirm both authentication paths and deploy the proxy.',
        steps: [
          { heading: 'Step 4.1: Confirm Vertex AI Authentication', owner: 'PANW / CUSTOMER', hours: 1, who: [A.cloud], task: 'Confirm the proxy authenticates to Vertex AI with the service account' },
          { heading: 'Step 4.2: Confirm AIRS Authentication', owner: 'PANW', hours: 1, who: [A.security], task: 'Confirm the shared flow authenticates to AIRS with the key from the KVM' },
          { anchor: 'deployment', heading: 'Step 5.1: Configure Environment Variables', owner: 'PANW', hours: 1, who: [A.api], task: 'Set the deployment environment variables for the target organization and environment' },
          { anchor: 'deployment', heading: 'Step 5.2: Run the Deployment Script', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api], task: 'Run the deployment script and confirm it completes without error' },
          { anchor: 'deployment', heading: 'Step 5.3: Confirm Deployment in Apigee Console', owner: 'PANW', hours: 1, who: [A.api], task: 'Confirm the proxy and shared flow show deployed in the Apigee console' }
        ],
        milestone: { name: 'Deployment Milestone', criteria: ['Vertex AI authentication confirmed from the proxy', 'AIRS authentication confirmed from the shared flow', 'Proxy deployed and visible in the Apigee console', 'Rollback path confirmed before traffic is sent'] } },
      { num: 4, title: 'Verification', anchor: 'verification',
        objective: 'Prove benign traffic passes, malicious traffic is blocked, and logs arrive.',
        steps: [
          { heading: 'Step 6.1: Test Benign Prompt', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api, A.dev], task: 'Send a benign prompt and confirm it passes with an acceptable response' },
          { heading: 'Step 6.2: Test Prompt Injection Block', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm it is blocked' },
          { heading: 'Step 6.3: Test Response-Side DLP', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Trigger a response-side DLP detection and confirm the masking or block behaves as designed' },
          { heading: 'Step 6.4: Confirm AIRS Logs', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm every test appears in the AIRS logs with the expected verdict' },
          { heading: 'Step 6.5: Review Performance Baseline', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api, A.dev], task: 'Measure the added latency and confirm it is inside what the application owners accept' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Benign prompt passes end to end', 'Prompt injection blocked', 'Response-side DLP behaving as designed', 'Every test visible in the AIRS logs with the right verdict', 'Added latency measured and accepted by the application owners', 'Rollback and key rotation procedure handed over'] },
        meeting: intHandover('Apigee', [A.api]) }
    ]
  },

  {
    id: 'azure-apim', name: 'Azure API Management', component: 'azure-apim', guide: INT + 'azure-apim.html',
    summary: 'Scan AI traffic through Azure API Management with an AIRS policy fragment on the inbound and outbound policies.',
    variants: { key: 'apiVersion', label: 'AIRS API version', note: 'The policy fragment differs between the v1 and v2 AIRS scan APIs.', default: 'v2',
      options: [{ id: 'v2', label: 'v2 scan API', plane: 'v2' }, { id: 'v1', label: 'v1 scan API', plane: 'v1' }] },
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm the APIM instance, permissions, and AIRS credentials.',
        steps: [
          { heading: 'Step 1.1: Confirm Azure APIM Instance', owner: 'CUSTOMER', hours: 1, who: [A.api], task: 'Confirm the APIM instance, tier, and the APIs in scope' },
          { heading: 'Step 1.2: Confirm Azure IAM Permissions', owner: 'CUSTOMER', hours: 1, who: [A.cloud], task: 'Confirm the delivery team can create named values and edit policies' },
          { heading: 'Step 1.3: Obtain Prisma AIRS API Key', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Obtain the AIRS API key and agree where it is stored' },
          { heading: 'Step 1.4: Configure AIRS Security Profile', owner: 'PANW / CUSTOMER', hours: 2, who: [A.security], task: 'Configure the AIRS security profile with the detection categories and actions for this traffic' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['APIM instance and in-scope APIs confirmed', 'Permissions confirmed for named values and policy edits', 'AIRS API key issued and storage location agreed', 'Security profile configured and signed off', 'AIRS scan API version chosen: v1 or v2'] },
        meeting: intKickoff('Azure APIM', [A.api, A.cloud], ['Agree which AIRS scan API version the policy fragment targets']) },
      { num: 2, title: 'Named Values and Policy Fragment', anchor: 'named-values',
        objective: 'Store the key safely and build the reusable policy fragment.',
        steps: [
          { heading: 'Step 2.1: Create the AIRS API Named Value', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api, A.security], task: 'Create the named value holding the AIRS API key, backed by Key Vault where policy requires it' },
          { variant: 'v2', anchor: 'policy-config', heading: 'Step 3.1: Create Policy Fragment (v2)', owner: 'PANW', hours: 2.5, who: [A.api], task: 'Create the v2 policy fragment that calls the AIRS scan API' },
          { variant: 'v2', anchor: 'policy-config', heading: 'Step 3.2: Understand Configuration Variables (v2)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api], task: 'Walk the v2 configuration variables so the gateway team can tune them' },
          { variant: 'v1', anchor: 'policy-config', heading: 'Step 3.1: Create Policy Fragment (v1)', owner: 'PANW', hours: 2.5, who: [A.api], task: 'Create the v1 policy fragment that calls the AIRS scan API' },
          { variant: 'v1', anchor: 'policy-config', heading: 'Step 3.2: Understand Configuration Variables (v1)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api], task: 'Walk the v1 configuration variables so the gateway team can tune them' }
        ],
        milestone: { name: 'Policy Fragment Milestone', criteria: ['Named value created and the key not visible in any policy body', 'Policy fragment created for the chosen API version', 'Configuration variables understood by the gateway team', 'Fragment stored in source control alongside the rest of the APIM configuration'] } },
      { num: 3, title: 'API Setup', anchor: 'api-setup',
        objective: 'Attach the fragment to the inbound and outbound policies of the in-scope APIs.',
        steps: [
          { variant: 'v2', heading: 'Step 4.1: Configure Inbound Policy (v2)', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api], task: 'Attach the fragment to the inbound policy so prompts are scanned before they reach the model' },
          { variant: 'v2', heading: 'Step 4.2: Configure Outbound Policy (v2)', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api], task: 'Attach the fragment to the outbound policy so responses are scanned before they reach the caller' },
          { variant: 'v1', heading: 'Step 4.1: Configure Inbound Policy (v1)', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api], task: 'Attach the fragment to the inbound policy so prompts are scanned before they reach the model' },
          { variant: 'v1', heading: 'Step 4.2: Configure Outbound Policy (v1)', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api], task: 'Attach the fragment to the outbound policy so responses are scanned before they reach the caller' }
        ],
        milestone: { name: 'Policy Attachment Milestone', criteria: ['Inbound policy scanning prompts on every in-scope API', 'Outbound policy scanning responses on every in-scope API', 'Policy change applied through the normal APIM release process', 'Rollback confirmed by reverting the policy on a test API'] } },
      { num: 4, title: 'Verification', anchor: 'verification',
        objective: 'Prove the policy blocks what it should and logs what it sees.',
        steps: [
          { heading: 'Step 5.1: Test Benign Prompt', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api, A.dev], task: 'Send a benign prompt and confirm it passes with an acceptable response' },
          { heading: 'Step 5.2: Test Prompt Injection Block', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm it is blocked' },
          { heading: 'Step 5.3: Test PII Masking on Response', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Trigger PII in a response and confirm the masking behaves as designed' },
          { heading: 'Step 5.4: Test Tool Event Scanning', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security, A.dev], task: 'Send a tool event and confirm it is scanned' },
          { heading: 'Step 5.5: Confirm AIRS Logs', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm every test appears in the AIRS logs with the expected verdict' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Benign prompt passes end to end', 'Prompt injection blocked', 'PII masking on responses behaving as designed', 'Tool events scanned', 'Every test visible in the AIRS logs', 'Rollback and key rotation procedure handed over'] },
        meeting: intHandover('Azure APIM', [A.api]) }
    ]
  },

  {
    id: 'kong', name: 'Kong Gateway', component: 'kong', guide: INT + 'kong.html',
    summary: 'Scan AI traffic through Kong Gateway with the AIRS plugin or a request-callout configuration.',
    variants: { key: 'method', label: 'Integration method', note: 'Three ways to wire AIRS into Kong. The v2 plugin adds MCP awareness; request callout needs no custom plugin.', default: 'v2',
      options: [
        { id: 'v2', label: 'AIRS plugin v2 (MCP-aware)', plane: 'v2' },
        { id: 'v1', label: 'AIRS plugin v1', plane: 'v1' },
        { id: 'callout', label: 'Request callout (no custom plugin)', plane: 'callout' }
      ] },
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm the Kong version, the route in scope, and AIRS credentials.',
        steps: [
          { heading: 'Step 1.1: Confirm Kong Gateway Version', owner: 'CUSTOMER', hours: 1, who: [A.api], task: 'Confirm the Kong Gateway version supports the chosen integration method' },
          { heading: 'Step 1.2: Obtain Prisma AIRS API Key', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Obtain the AIRS API key and agree where it is stored' },
          { heading: 'Step 1.3: Configure AIRS Security Profile', owner: 'PANW / CUSTOMER', hours: 2, who: [A.security], task: 'Configure the AIRS security profile with the detection categories and actions for this traffic' },
          { heading: 'Step 1.4: Confirm Kong Service and Route', owner: 'CUSTOMER', hours: 1, who: [A.api], task: 'Confirm the Kong service and route that carries the AI traffic' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['Kong version confirmed against the chosen method', 'AIRS API key issued and storage location agreed', 'Security profile configured and signed off', 'Target service and route identified', 'Integration method chosen: plugin v1, plugin v2, or request callout'] },
        meeting: intKickoff('Kong', [A.api], ['Choose the integration method: plugin v1, plugin v2 with MCP awareness, or request callout']) },
      { num: 2, title: 'Plugin Setup', anchor: 'plugin-setup',
        objective: 'Put the AIRS plugin or callout configuration in place.',
        steps: [
          { variant: 'v2', heading: 'Step 2.1: Deploy Plugin Files (v2 MCP-aware)', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api, A.devops], task: 'Deploy the v2 plugin files to every Kong node' },
          { variant: 'v2', heading: 'Step 2.2: Register Plugin in Kong Configuration (v2)', owner: 'PANW', hours: 1.5, who: [A.api], task: 'Register the v2 plugin in the Kong configuration' },
          { variant: 'v1', heading: 'Step 2.1: Deploy Plugin Files (v1)', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api, A.devops], task: 'Deploy the v1 plugin files to every Kong node' },
          { variant: 'v1', heading: 'Step 2.2: Register Plugin in Kong Configuration (v1)', owner: 'PANW', hours: 1.5, who: [A.api], task: 'Register the v1 plugin in the Kong configuration' },
          { variant: 'callout', heading: 'Step 2.1: Store AIRS API Key in Kong Vault (Request Callout)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api, A.security], task: 'Store the AIRS API key in Kong Vault so it is not written into the plugin configuration' },
          { variant: 'callout', heading: 'Step 2.2: Confirm Service and Route (Request Callout)', owner: 'PANW', hours: 1, who: [A.api], task: 'Confirm the service and route the callout will attach to' }
        ],
        milestone: { name: 'Plugin Setup Milestone', criteria: ['Plugin files present on every Kong node, or the key stored in Kong Vault for the callout method', 'Plugin registered in the Kong configuration', 'Configuration change made through the normal Kong release process', 'No AIRS key written into a configuration file in plain text'] } },
      { num: 3, title: 'Gateway Configuration', anchor: 'gateway-config',
        objective: 'Enable AIRS on the service and set its behavior.',
        steps: [
          { variant: 'v2', heading: 'Step 3.1: Enable Plugin on Service (v2)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api], task: 'Enable the v2 plugin on the target service' },
          { variant: 'v2', heading: 'Step 3.2: Understand MCP Detection Behavior (v2)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api, A.security], task: 'Walk how the plugin distinguishes MCP control messages from tool calls, and confirm the behavior is wanted' },
          { variant: 'v2', heading: 'Step 3.3: Dynamic Profile Selection (v2, Optional)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security], task: 'Configure dynamic profile selection, or record the decision to use a single profile' },
          { variant: 'v1', heading: 'Step 3.1: Enable Plugin on Service (v1)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api], task: 'Enable the v1 plugin on the target service' },
          { variant: 'v1', heading: 'Step 3.2: Configure Multi-Provider Support with AI Gateway (v1)', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api], task: 'Configure multi-provider support, or record that a single provider is in scope' },
          { variant: 'callout', heading: 'Step 3.1: Apply Request-Callout Plugin Configuration', owner: 'PANW / CUSTOMER', hours: 2.5, who: [A.api], task: 'Apply the request-callout configuration that calls the AIRS scan API' }
        ],
        milestone: { name: 'Gateway Configuration Milestone', criteria: ['AIRS enabled on the target service', 'Scanning behavior agreed and configured, including MCP handling where the method supports it', 'Profile selection strategy recorded', 'Configuration committed to source control'] } },
      { num: 4, title: 'Deployment', anchor: 'deployment',
        objective: 'Apply the configuration to the running gateway.',
        steps: [
          { variant: 'v2', heading: 'Step 4.1: Restart Kong Gateway (v2)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api, A.devops], task: 'Restart Kong node by node so the plugin loads without dropping traffic' },
          { variant: 'v2', heading: 'Step 4.2: Confirm Plugin Is Loaded (v2)', owner: 'PANW', hours: 1, who: [A.api], task: 'Confirm the plugin is loaded on every node' },
          { variant: 'v1', heading: 'Step 4.1: Restart Kong Gateway (v1)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api, A.devops], task: 'Restart Kong node by node so the plugin loads without dropping traffic' },
          { variant: 'v1', heading: 'Step 4.2: Confirm Plugin Is Loaded (v1)', owner: 'PANW', hours: 1, who: [A.api], task: 'Confirm the plugin is loaded on every node' },
          { variant: 'callout', heading: 'Step 4.1: Confirm Plugin Is Active (Request Callout)', owner: 'PANW', hours: 1, who: [A.api], task: 'Confirm the request-callout plugin is active on the route' }
        ],
        milestone: { name: 'Deployment Milestone', criteria: ['Configuration applied to every Kong node', 'Plugin confirmed loaded and active', 'No traffic dropped during the rollout', 'Rollback confirmed available on a single node before the full rollout'] } },
      { num: 5, title: 'Verification', anchor: 'verification',
        objective: 'Prove scanning works for the traffic types in scope.',
        steps: [
          { variant: 'v2', heading: 'Step 5.1: Test Benign LLM Prompt (v2)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api, A.dev], task: 'Send a benign prompt and confirm it passes' },
          { variant: 'v2', heading: 'Step 5.2: Test Prompt Injection Block (v2)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm it is blocked' },
          { variant: 'v2', heading: 'Step 5.3: Test MCP Control Message Bypass (v2)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send an MCP control message and confirm it bypasses scanning as designed' },
          { variant: 'v2', heading: 'Step 5.4: Test MCP tools/call Scanning (v2)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send an MCP tools/call and confirm it is scanned' },
          { variant: 'v2', heading: 'Step 5.5: Confirm AIRS Logs (v2)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm every test appears in the AIRS logs with the expected verdict' },
          { variant: 'v1', heading: 'Step 5.1: Test Benign Prompt (v1)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api, A.dev], task: 'Send a benign prompt and confirm it passes' },
          { variant: 'v1', heading: 'Step 5.2: Test Prompt Injection (v1)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm it is blocked' },
          { variant: 'v1', heading: 'Step 5.3: Confirm AIRS Logs (v1)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm every test appears in the AIRS logs with the expected verdict' },
          { variant: 'callout', heading: 'Step 5.1: Test Benign Prompt (Request Callout)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api, A.dev], task: 'Send a benign prompt and confirm it passes' },
          { variant: 'callout', heading: 'Step 5.2: Test Prompt Injection Block (Request Callout)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm it is blocked' },
          { variant: 'callout', heading: 'Step 5.3: Confirm AIRS Logs (Request Callout)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm every test appears in the AIRS logs with the expected verdict' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Benign traffic passes', 'Prompt injection blocked', 'MCP handling verified where the chosen method supports it', 'Every test visible in the AIRS logs', 'Added latency measured and accepted', 'Rollback and key rotation procedure handed over'] },
        meeting: intHandover('Kong', [A.api]) }
    ]
  },

  {
    id: 'litellm', name: 'LiteLLM', component: 'litellm', guide: INT + 'litellm.html',
    summary: 'Scan traffic through the LiteLLM Proxy with AIRS configured as a guardrail in config.yaml.',
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm the proxy, the AIRS credentials, and the provider key.',
        steps: [
          { heading: 'Step 1.1: Confirm LiteLLM Proxy is running', owner: 'CUSTOMER', hours: 1, who: [A.api], task: 'Confirm the LiteLLM Proxy is running at a supported version and who operates it' },
          { heading: 'Step 1.2: Confirm Prisma AIRS license and credentials', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Confirm the AIRS license and obtain the API key' },
          { heading: 'Step 1.3: Confirm LLM provider API key', owner: 'CUSTOMER', hours: 1, who: [A.dev], task: 'Confirm the provider API key the proxy already uses' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['LiteLLM Proxy running at a supported version', 'AIRS license active and API key issued', 'Provider key confirmed and its storage location known', 'Owner of config.yaml identified'] },
        meeting: intKickoff('LiteLLM', [A.api, A.dev]) },
      { num: 2, title: 'Gateway and Guardrail Configuration', anchor: 'gateway-config',
        objective: 'Declare the models and attach the AIRS guardrail.',
        steps: [
          { heading: 'Step 2.1: Define the model list in config.yaml', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api], task: 'Define the model list in config.yaml and confirm it matches what applications call' },
          { anchor: 'guardrail-setup', heading: 'Step 3.1: Add the guardrails section to config.yaml', owner: 'PANW', hours: 1.5, who: [A.api], task: 'Add the AIRS guardrails section to config.yaml' },
          { anchor: 'guardrail-setup', heading: 'Step 3.2: Select the scanning mode', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security], task: 'Select the scanning mode and agree whether the pilot runs in alert or block' },
          { anchor: 'guardrail-setup', heading: 'Step 3.3: Set the regional API endpoint', owner: 'PANW', hours: 1, who: [A.security], task: 'Set the regional AIRS endpoint matching the tenant region' },
          { anchor: 'guardrail-setup', heading: 'Step 3.4: Review the complete config.yaml', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api], task: 'Review the complete config.yaml and commit it to source control' }
        ],
        milestone: { name: 'Configuration Milestone', criteria: ['Model list matches what applications actually call', 'AIRS guardrail declared with the agreed scanning mode', 'Regional endpoint matching the tenant region', 'config.yaml committed to source control with no key in plain text'] } },
      { num: 3, title: 'Launch and Verification', anchor: 'environment-launch',
        objective: 'Start the proxy with the guardrail and prove it works.',
        steps: [
          { heading: 'Step 4.1: Export environment variables', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api, A.security], task: 'Export the AIRS and provider keys as environment variables from the secret store' },
          { heading: 'Step 4.2: Start the LiteLLM Proxy', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api], task: 'Start the proxy and confirm it loads the guardrail without error' },
          { anchor: 'verification', heading: 'Step 5.1: Test with a malicious prompt', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a malicious prompt and confirm it is blocked' },
          { anchor: 'verification', heading: 'Step 5.2: Test with a benign prompt', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Send a benign prompt and confirm it passes' },
          { anchor: 'verification', heading: 'Step 5.3: Verify in Strata Cloud Manager', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm both tests appear in Strata Cloud Manager with the expected verdict' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Proxy starts cleanly with the guardrail loaded', 'Malicious prompt blocked', 'Benign prompt passes', 'Both visible in Strata Cloud Manager', 'Restart and key rotation procedure handed over'] },
        meeting: intHandover('LiteLLM', [A.api]) }
    ]
  },

  {
    id: 'truefoundry', name: 'TrueFoundry', component: 'truefoundry', guide: INT + 'truefoundry.html',
    summary: 'Scan traffic through TrueFoundry with Prisma AIRS configured as a guardrails provider.',
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm platform access and AIRS credentials.',
        steps: [
          { heading: 'Step 1.1: Confirm TrueFoundry platform access', owner: 'CUSTOMER', hours: 1, who: [A.api], task: 'Confirm TrueFoundry access and who can edit guardrails configuration' },
          { heading: 'Step 1.2: Confirm Prisma AIRS license and credentials', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Confirm the AIRS license and obtain the API key' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['TrueFoundry access confirmed with guardrails edit rights', 'AIRS license active and API key issued', 'Applications in scope agreed'] },
        meeting: intKickoff('TrueFoundry', [A.api]) },
      { num: 2, title: 'Guardrails Configuration', anchor: 'gateway-config',
        objective: 'Create the guardrails group and wire AIRS into it.',
        steps: [
          { heading: 'Step 2.1: Create a Guardrails Group', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api], task: 'Create the guardrails group that the in-scope applications will use' },
          { heading: 'Step 2.2: Configure the Prisma AIRS provider', owner: 'PANW', hours: 1.5, who: [A.api, A.security], task: 'Configure the Prisma AIRS provider with the profile and regional endpoint' },
          { heading: 'Step 2.3: Add the AIRS API key', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Add the AIRS API key through the platform secret store' },
          { heading: 'Step 2.4: Save the Guardrails Group', owner: 'PANW', hours: 0.5, who: [A.api], task: 'Save the guardrails group and confirm it is attached to the in-scope applications' },
          { anchor: 'airs-integration', heading: 'Step 3.1: Confirm enforcement behavior', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security], task: 'Confirm what happens on a block and on an AIRS timeout, and agree it is what the security lead wants' }
        ],
        milestone: { name: 'Configuration Milestone', criteria: ['Guardrails group created and attached to the in-scope applications', 'AIRS provider configured with the agreed profile and region', 'API key held in the platform secret store, not typed into a field', 'Enforcement and timeout behavior agreed with the security lead'] } },
      { num: 3, title: 'Verification', anchor: 'verification',
        objective: 'Prove scanning works and reaches the logs.',
        steps: [
          { heading: 'Step 4.1: Test with a malicious prompt', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a malicious prompt and confirm it is blocked' },
          { heading: 'Step 4.2: Test with a benign prompt', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Send a benign prompt and confirm it passes' },
          { heading: 'Step 4.3: Verify in Strata Cloud Manager', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm both tests appear in Strata Cloud Manager with the expected verdict' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Malicious prompt blocked', 'Benign prompt passes', 'Both visible in Strata Cloud Manager', 'Key rotation procedure handed over'] },
        meeting: intHandover('TrueFoundry', [A.api]) }
    ]
  },

  {
    id: 'n8n', name: 'n8n', component: 'n8n', guide: INT + 'n8n.html',
    summary: 'Scan workflow traffic in n8n with the Prisma AIRS community node or HTTP request nodes.',
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm the n8n instance, AIRS credentials, and the community node.',
        steps: [
          { heading: 'Step 1.1: Confirm n8n Instance Access', owner: 'CUSTOMER', hours: 1, who: [A.api], task: 'Confirm the n8n instance, version, and who can install community nodes' },
          { heading: 'Step 1.2: Confirm Prisma AIRS License and API Key', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Confirm the AIRS license and obtain the API key' },
          { heading: 'Step 1.3: Install the Prisma AIRS Community Node', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api], task: 'Install the Prisma AIRS community node, or record the decision to use HTTP request nodes instead' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['n8n instance confirmed and community node installation permitted', 'AIRS license active and API key issued', 'Community node installed, or the HTTP request approach chosen', 'Workflows in scope agreed'] },
        meeting: intKickoff('n8n', [A.api], ['Decide between the community node and HTTP request nodes']) },
      { num: 2, title: 'Credentials and Workflow', anchor: 'credentials',
        objective: 'Store the key and build scanning into the workflow.',
        steps: [
          { heading: 'Step 2.1: Create Prisma AIRS API Credentials in n8n', owner: 'PANW / CUSTOMER', hours: 1, who: [A.api, A.security], task: 'Create the AIRS credential in n8n so the key is not pasted into a node' },
          { anchor: 'workflow-config', heading: 'Step 3.1: Build a Prompt Scan Workflow (Community Node)', owner: 'PANW / CUSTOMER', hours: 2, who: [A.api, A.dev], task: 'Add prompt scanning to the workflow ahead of the model call' },
          { anchor: 'workflow-config', heading: 'Step 3.2: Add Response Scanning', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.api], task: 'Add response scanning after the model call' },
          { anchor: 'workflow-config', heading: 'Step 3.3: Alternative — Use HTTP Request Nodes', owner: 'PANW', hours: 1.5, who: [A.api], task: 'Build the HTTP request node equivalent where the community node is not permitted, or record that it is not needed' }
        ],
        milestone: { name: 'Workflow Milestone', criteria: ['AIRS credential stored in n8n rather than in a node body', 'Prompt scanning in place ahead of the model call', 'Response scanning in place after the model call', 'Workflow exported and stored outside n8n as a rollback'] } },
      { num: 3, title: 'Verification', anchor: 'verification',
        objective: 'Prove the workflow blocks what it should.',
        steps: [
          { heading: 'Step 4.1: Test with a Safe Prompt', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Run the workflow with a safe prompt and confirm it completes' },
          { heading: 'Step 4.2: Test with a Blocked Prompt', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Run the workflow with a malicious prompt and confirm it stops at the scan' },
          { heading: 'Step 4.3: Verify in Strata Cloud Manager', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm both runs appear in Strata Cloud Manager with the expected verdict' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Safe prompt completes the workflow', 'Malicious prompt stops at the scan node', 'Both visible in Strata Cloud Manager', 'Workflow owner knows how to read a block and what to do about it'] },
        meeting: intHandover('n8n', [A.api]) }
    ]
  },

  {
    id: 'jenkins', name: 'Jenkins', component: 'jenkins', guide: INT + 'jenkins.html',
    summary: 'Scan models in a Jenkins pipeline with Prisma AIRS Model Security.',
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm the Jenkins server, the Model Security license, and the scanning profile.',
        steps: [
          { heading: 'Step 1.1: Confirm Jenkins Server Requirements', owner: 'CUSTOMER', hours: 1, who: [C.cicd], task: 'Confirm the Jenkins version, agent platform, and Python availability on the agents' },
          { heading: 'Step 1.2: Confirm Prisma AIRS Model Security License', owner: 'CUSTOMER / PANW', hours: 1, who: [C.security], task: 'Confirm the Model Security license covers the models in scope' },
          { heading: 'Step 1.3: Create a Prisma Cloud Service Account', owner: 'CUSTOMER / PANW', hours: 1, who: [C.security], task: 'Create the service account the pipeline authenticates with' },
          { heading: 'Step 1.4: Configure a Model Security Profile', owner: 'PANW / CUSTOMER', hours: 2, who: [C.security], task: 'Configure the Model Security profile and agree which findings fail a build' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['Jenkins agents confirmed with a working Python runtime', 'Model Security license confirmed against the models in scope', 'Service account created and its credentials held securely', 'Scanning profile agreed, including which findings fail a build'] },
        meeting: intKickoff('Jenkins', [C.cicd], ['Agree which scan findings fail a build and which only warn']) },
      { num: 2, title: 'Credentials and Pipeline', anchor: 'credentials',
        objective: 'Store the credentials and build the pipeline.',
        steps: [
          { heading: 'Step 2.1: Create Jenkins Credentials for Model Security', owner: 'PANW / CUSTOMER', hours: 1, who: [C.cicd, C.security], task: 'Create the Jenkins credential holding the service account secret' },
          { anchor: 'pipeline-setup', heading: 'Step 3.1: Understand the Repository Structure', owner: 'PANW / CUSTOMER', hours: 0.5, who: [C.cicd], task: 'Agree where the scan scripts and configuration live in the repository' },
          { anchor: 'pipeline-setup', heading: 'Step 3.2: Create the Supporting Scripts', owner: 'PANW', hours: 2, who: [C.cicd], task: 'Add the supporting scripts the pipeline calls' },
          { anchor: 'pipeline-setup', heading: 'Step 3.3: Create the Jenkinsfile', owner: 'PANW / CUSTOMER', hours: 2, who: [C.cicd], task: 'Add the scan stage to the Jenkinsfile' }
        ],
        milestone: { name: 'Pipeline Milestone', criteria: ['Credential created and never echoed in build output', 'Scripts and configuration committed in the agreed repository layout', 'Scan stage present in the Jenkinsfile', 'Pipeline changes reviewed through the normal process'] } },
      { num: 3, title: 'Scan Configuration', anchor: 'scan-config',
        objective: 'Tell the scanner what to scan and when to run.',
        steps: [
          { heading: 'Step 4.1: Create the Model Configuration File', owner: 'PANW / CUSTOMER', hours: 1, who: [C.cicd], task: 'Create the model configuration file listing the models and registries to scan' },
          { heading: 'Step 4.2: Create the Python Dependencies File', owner: 'PANW', hours: 1, who: [C.cicd], task: 'Pin the Python dependencies the scan needs' },
          { heading: 'Step 4.3: Configure SCM Polling', owner: 'PANW / CUSTOMER', hours: 0.5, who: [C.cicd], task: 'Configure the trigger so scans run when models change' }
        ],
        milestone: { name: 'Scan Configuration Milestone', criteria: ['Every model in scope listed in the configuration file', 'Python dependencies pinned to specific versions', 'Trigger configured so a model change causes a scan', 'Expected scan duration understood against the build budget'] } },
      { num: 4, title: 'Verification', anchor: 'verification',
        objective: 'Run the pipeline and confirm the results land where people look.',
        steps: [
          { heading: 'Step 5.1: Trigger the Pipeline', owner: 'PANW / CUSTOMER', hours: 1, who: [C.cicd], task: 'Trigger the pipeline and confirm the scan stage runs to completion' },
          { heading: 'Step 5.2: Verify Scan Results in Jenkins Console', owner: 'PANW / CUSTOMER', hours: 1, who: [C.cicd], task: 'Confirm the scan results are readable in the Jenkins console output' },
          { heading: 'Step 5.3: Verify Results in Strata Cloud Manager', owner: 'PANW / CUSTOMER', hours: 1, who: [C.security], task: 'Confirm the scan results appear in Strata Cloud Manager' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Pipeline runs the scan stage to completion', 'Results readable in the Jenkins console', 'Results visible in Strata Cloud Manager', 'A failing model confirmed to fail the build as agreed', 'Pipeline owner knows how to triage a finding'] },
        meeting: intHandover('Jenkins', [C.cicd]) }
    ]
  },

  {
    id: 'github-actions', name: 'GitHub Actions', component: 'github-actions', guide: INT + 'github-actions.html',
    summary: 'Scan models in a GitHub Actions workflow with Prisma AIRS Model Security.',
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm repository access, the Model Security license, and the scanning profile.',
        steps: [
          { heading: 'Step 1.1: Confirm GitHub Repository Access', owner: 'CUSTOMER', hours: 0.5, who: [C.cicd], task: 'Confirm the repository, runner type, and who can add workflows and secrets' },
          { heading: 'Step 1.2: Confirm Prisma AIRS Model Security License', owner: 'CUSTOMER / PANW', hours: 1, who: [C.security], task: 'Confirm the Model Security license covers the models in scope' },
          { heading: 'Step 1.3: Create a Prisma Cloud Service Account', owner: 'CUSTOMER / PANW', hours: 1, who: [C.security], task: 'Create the service account the workflow authenticates with' },
          { heading: 'Step 1.4: Configure a Model Security Profile', owner: 'PANW / CUSTOMER', hours: 2, who: [C.security], task: 'Configure the Model Security profile and agree which findings fail a run' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['Repository and runner type confirmed with permission to add workflows and secrets', 'Model Security license confirmed against the models in scope', 'Service account created and its credentials held securely', 'Scanning profile agreed, including which findings fail a run'] },
        meeting: intKickoff('GitHub Actions', [C.cicd], ['Agree which scan findings fail a run and which only warn']) },
      { num: 2, title: 'Secrets and Workflow', anchor: 'credentials',
        objective: 'Store the secrets and build the workflow.',
        steps: [
          { heading: 'Step 2.1: Create GitHub Actions Secrets for Model Security', owner: 'PANW / CUSTOMER', hours: 1, who: [C.cicd, C.security], task: 'Create the repository or organization secrets holding the service account credentials' },
          { anchor: 'workflow-setup', heading: 'Step 3.1: Understand the Repository Structure', owner: 'PANW / CUSTOMER', hours: 0.5, who: [C.cicd], task: 'Agree where the scan scripts and configuration live in the repository' },
          { anchor: 'workflow-setup', heading: 'Step 3.2: Create the PyPI Authentication Script', owner: 'PANW', hours: 1, who: [C.cicd], task: 'Add the PyPI authentication script the scan tooling needs' },
          { anchor: 'workflow-setup', heading: 'Step 3.3: Create the Model Scan Script', owner: 'PANW', hours: 2, who: [C.cicd], task: 'Add the model scan script the workflow calls' },
          { anchor: 'workflow-setup', heading: 'Step 3.4: Create the GitHub Actions Workflow', owner: 'PANW / CUSTOMER', hours: 1.5, who: [C.cicd], task: 'Add the workflow file with the scan job' }
        ],
        milestone: { name: 'Workflow Milestone', criteria: ['Secrets created at the right scope and never echoed in logs', 'Scripts and configuration committed in the agreed repository layout', 'Workflow file present with the scan job', 'Workflow changes reviewed through the normal pull request process'] } },
      { num: 3, title: 'Scan Configuration', anchor: 'scan-config',
        objective: 'Tell the scanner what to scan and how to label results.',
        steps: [
          { heading: 'Step 4.1: Create the Model Configuration File', owner: 'PANW / CUSTOMER', hours: 1, who: [C.cicd], task: 'Create the model configuration file listing the models and registries to scan' },
          { heading: 'Step 4.2: Create the Python Dependencies File', owner: 'PANW', hours: 1, who: [C.cicd], task: 'Pin the Python dependencies the scan needs' },
          { heading: 'Step 4.3: Configure Scan Labels for Tracking', owner: 'PANW / CUSTOMER', hours: 0.5, who: [C.cicd, C.security], task: 'Configure scan labels so results can be traced back to a repository and a run' }
        ],
        milestone: { name: 'Scan Configuration Milestone', criteria: ['Every model in scope listed in the configuration file', 'Python dependencies pinned to specific versions', 'Scan labels agreed so a finding can be traced to a run', 'Expected scan duration understood against the runner budget'] } },
      { num: 4, title: 'Verification', anchor: 'verification',
        objective: 'Run the workflow and confirm the results land where people look.',
        steps: [
          { heading: 'Step 5.1: Trigger the Pipeline', owner: 'PANW / CUSTOMER', hours: 1, who: [C.cicd], task: 'Trigger the workflow and confirm the scan job runs to completion' },
          { heading: 'Step 5.2: Verify Scan Results in GitHub Actions', owner: 'PANW / CUSTOMER', hours: 1, who: [C.cicd], task: 'Confirm the scan results are readable in the run output' },
          { heading: 'Step 5.3: Verify Results in Strata Cloud Manager', owner: 'PANW / CUSTOMER', hours: 1, who: [C.security], task: 'Confirm the scan results appear in Strata Cloud Manager' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Workflow runs the scan job to completion', 'Results readable in the GitHub Actions run output', 'Results visible in Strata Cloud Manager', 'A failing model confirmed to fail the run as agreed', 'Repository owner knows how to triage a finding'] },
        meeting: intHandover('GitHub Actions', [C.cicd]) }
    ]
  },

  {
    id: 'claude-code', name: 'Claude Code', component: 'claude-code', guide: INT + 'claude-code.html',
    summary: 'Scan Claude Code sessions with AIRS, wired in through hooks, an MCP server, or a skill.',
    variants: { key: 'method', label: 'Integration method', note: 'Hooks enforce inline and can block. MCP and the skill scan on demand.', default: 'hooks',
      options: [
        { id: 'hooks', label: 'Hooks (inline enforcement)', plane: 'hooks' },
        { id: 'mcp', label: 'MCP server (on demand)', plane: 'mcp' },
        { id: 'skill', label: 'Skill (on demand)', plane: 'skill' }
      ] },
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm AIRS access, the Claude Code install, and system dependencies.',
        steps: [
          { heading: 'Step 1.1: Confirm AIRS API Intercept Access', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Confirm API Intercept access and obtain the AIRS API key' },
          { heading: 'Step 1.2: Confirm Claude Code Installation', owner: 'CUSTOMER', hours: 1, who: [A.dev], task: 'Confirm Claude Code is installed at a supported version on the target machines' },
          { heading: 'Step 1.3: Install System Dependencies', owner: 'CUSTOMER', hours: 1, who: [A.dev], task: 'Install the system dependencies the scan scripts need' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['API Intercept access confirmed and key issued', 'Claude Code installed at a supported version on every target machine', 'System dependencies installed', 'Integration method chosen: hooks, MCP, or skill', 'Scope agreed: which developers and which machines'] },
        meeting: intKickoff('Claude Code', [A.dev], ['Choose the method: hooks for inline enforcement, MCP or skill for on-demand scanning', 'Agree whether a scan failure blocks the developer or only warns']) },
      { num: 2, title: 'Installation', anchor: 'installation',
        objective: 'Put the integration in place on the target machines.',
        steps: [
          { variant: 'hooks', heading: 'Step 2.1: Copy Hook Scripts', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev], task: 'Copy the hook scripts onto the target machines' },
          { variant: 'hooks', heading: 'Step 2.2: Merge Hooks Configuration into Settings', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Merge the hooks configuration into the Claude Code settings without disturbing existing hooks' },
          { variant: 'mcp', heading: 'Step 2.1: Add MCP Server Configuration', owner: 'PANW / CUSTOMER', hours: 2, who: [A.dev], task: 'Add the AIRS MCP server to the Claude Code configuration' },
          { variant: 'skill', heading: 'Step 2.1: Copy Skill Files', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev], task: 'Copy the skill files into the Claude Code skills directory' }
        ],
        milestone: { name: 'Installation Milestone', criteria: ['Integration files present on every target machine', 'Existing Claude Code configuration preserved', 'Install method repeatable, by script or by managed configuration', 'Uninstall path confirmed'] } },
      { num: 3, title: 'Configuration', anchor: 'configuration',
        objective: 'Point the integration at AIRS and set its behavior.',
        steps: [
          { heading: 'Step 3.1: Set Environment Variables (All Methods)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev, A.security], task: 'Set the AIRS environment variables from the secret store rather than a shell profile' },
          { variant: 'hooks', heading: 'Step 3.2: Configure Hook Behavior (Hooks Method)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Configure which hooks fire and what happens on a block' },
          { variant: 'mcp', heading: 'Step 3.2: Review Available MCP Tools (MCP Method)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Walk the available MCP tools so developers know what to call' },
          { variant: 'skill', heading: 'Step 3.2: Review Scan Types (Skill Method)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Walk the scan types the skill offers so developers know what to invoke' }
        ],
        milestone: { name: 'Configuration Milestone', criteria: ['AIRS key supplied from a secret store, not committed to a dotfile', 'Scanning behavior configured and agreed with the security lead', 'Developers know what the integration does and when it fires', 'Behavior on an AIRS timeout agreed'] } },
      { num: 4, title: 'Verification', anchor: 'verification',
        objective: 'Prove scanning fires and behaves as agreed.',
        steps: [
          { variant: 'hooks', heading: 'Step 4.1: Test Prompt Injection Detection (Hooks)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm the hook blocks it' },
          { variant: 'hooks', heading: 'Step 4.2: Test DLP Detection (Hooks)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Trigger a DLP detection and confirm the hook behaves as designed' },
          { variant: 'hooks', heading: 'Step 4.3: Test Live in Claude Code (Hooks)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Run a real session and confirm the hooks do not get in the way of normal work' },
          { variant: 'mcp', heading: 'Step 4.1: Verify MCP Server Connection', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Confirm the MCP server connects and its tools are listed' },
          { variant: 'mcp', heading: 'Step 4.2: Test On-Demand Scanning (MCP)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security], task: 'Run an on-demand scan through MCP and confirm the verdict' },
          { variant: 'skill', heading: 'Step 4.1: Test Skill Invocation', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Invoke the skill directly and confirm it runs' },
          { variant: 'skill', heading: 'Step 4.2: Test Skill in Claude Code', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev], task: 'Invoke the skill from a real session and confirm the verdict' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Prompt injection detected by the chosen method', 'Normal development work not obstructed', 'Results visible in the AIRS logs', 'Developers know what a block looks like and who to ask'] } },
      { num: 5, title: 'Production Hardening', anchor: 'production-hardening',
        objective: 'Make the integration safe to leave running.',
        steps: [
          { heading: 'Step 5.1: Configure Session Tracking', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Configure session tracking so findings can be traced to a session' },
          { heading: 'Step 5.2: Enforce Fail-Closed Policy', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security], task: 'Decide and configure whether an AIRS outage blocks or allows, and record the decision' },
          { heading: 'Step 5.3: Configure Log Monitoring', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Route the integration logs somewhere monitored' },
          { heading: 'Step 5.4: Rotate API Keys', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Document and test the key rotation procedure' }
        ],
        milestone: { name: 'Hardening Milestone', criteria: ['Session tracking in place so a finding traces to a session', 'Fail-open or fail-closed behavior decided, configured, and recorded', 'Logs routed somewhere a person actually watches', 'Key rotation documented and tested once'] },
        meeting: intHandover('Claude Code', [A.dev], ['Confirm the fail-open or fail-closed decision and who owns it']) }
    ]
  },

  {
    id: 'codex-cli', name: 'Codex CLI', component: 'codex-cli', guide: INT + 'codex-cli.html',
    summary: 'Scan Codex CLI sessions with AIRS security hooks.',
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm AIRS access, the Codex CLI install, and system dependencies.',
        steps: [
          { heading: 'Step 1.1: Confirm AIRS API Intercept Access', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Confirm API Intercept access and obtain the AIRS API key' },
          { heading: 'Step 1.2: Confirm Codex CLI Installation', owner: 'CUSTOMER', hours: 1, who: [A.dev], task: 'Confirm Codex CLI is installed at a supported version on the target machines' },
          { heading: 'Step 1.3: Install System Dependencies', owner: 'CUSTOMER', hours: 1, who: [A.dev], task: 'Install the system dependencies the hook scripts need' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['API Intercept access confirmed and key issued', 'Codex CLI installed at a supported version on every target machine', 'System dependencies installed', 'Scope agreed: which developers and which machines'] },
        meeting: intKickoff('Codex CLI', [A.dev], ['Agree whether a scan failure blocks the developer or only warns']) },
      { num: 2, title: 'Installation and Configuration', anchor: 'installation',
        objective: 'Install the hooks and point them at AIRS.',
        steps: [
          { heading: 'Step 2.1: Copy Hook Scripts', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev], task: 'Copy the hook scripts onto the target machines' },
          { heading: 'Step 2.2: Review hooks.json', owner: 'PANW / CUSTOMER', hours: 0.5, who: [A.dev], task: 'Walk hooks.json so the team knows which events are intercepted' },
          { anchor: 'configuration', heading: 'Step 3.1: Set Environment Variables', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev, A.security], task: 'Set the AIRS environment variables from the secret store rather than a shell profile' },
          { anchor: 'configuration', heading: 'Step 3.2: Review Fail-Closed Behavior', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm what happens when AIRS is unreachable and agree it is what the security lead wants' }
        ],
        milestone: { name: 'Installation Milestone', criteria: ['Hook scripts present on every target machine', 'Intercepted events understood by the team', 'AIRS key supplied from a secret store, not committed to a dotfile', 'Behavior on an AIRS outage agreed and recorded'] } },
      { num: 3, title: 'Verification', anchor: 'verification',
        objective: 'Prove each hook fires on the traffic it covers.',
        steps: [
          { heading: 'Step 4.1: Test Prompt Injection Detection', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm the hook blocks it' },
          { heading: 'Step 4.2: Test Bash Command Scanning', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Trigger a bash command scan and confirm the verdict' },
          { heading: 'Step 4.3: Test MCP Tool Scanning', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Trigger an MCP tool scan and confirm the verdict' },
          { heading: 'Step 4.4: Test Live in Codex CLI', owner: 'PANW / CUSTOMER', hours: 1, who: [A.dev], task: 'Run a real session and confirm the hooks do not get in the way of normal work' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Prompt injection blocked', 'Bash command scanning firing', 'MCP tool scanning firing', 'Normal development work not obstructed', 'Results visible in the AIRS logs'] } },
      { num: 4, title: 'Production Hardening', anchor: 'production-hardening',
        objective: 'Make the integration safe to leave running.',
        steps: [
          { heading: 'Step 5.1: Configure AIRS Session Correlation', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Configure session correlation so findings can be traced to a session' },
          { heading: 'Step 5.2: Review Content Truncation Limits', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Confirm the truncation limits and what they mean for detection coverage' },
          { heading: 'Step 5.3: Configure Log Monitoring', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Route the hook logs somewhere monitored' },
          { heading: 'Step 5.4: Rotate API Keys', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Document and test the key rotation procedure' }
        ],
        milestone: { name: 'Hardening Milestone', criteria: ['Session correlation in place', 'Truncation limits understood, with their detection impact accepted', 'Logs routed somewhere a person actually watches', 'Key rotation documented and tested once'] },
        meeting: intHandover('Codex CLI', [A.dev]) }
    ]
  },

  {
    id: 'ide-assistants', name: 'IDE Assistants', component: 'ide-assistants', guide: INT + 'ide-assistants.html',
    summary: 'Scan Cline, Cursor, or Windsurf sessions with AIRS security hooks.',
    variants: { key: 'ide', label: 'IDE', note: 'Hook coverage differs by IDE. Cline has no response hook; Windsurf post-hooks alert but cannot block.', default: 'cursor',
      options: [
        { id: 'cursor', label: 'Cursor', plane: 'cursor' },
        { id: 'cline', label: 'Cline', plane: 'cline' },
        { id: 'windsurf', label: 'Windsurf', plane: 'windsurf' }
      ] },
    phases: [
      { num: 1, title: 'Prerequisites', anchor: 'prerequisites',
        objective: 'Confirm AIRS access, the IDE install, and system dependencies.',
        steps: [
          { heading: 'Step 1.1: Confirm AIRS API Intercept Access', owner: 'CUSTOMER / PANW', hours: 1, who: [A.security], task: 'Confirm API Intercept access and obtain the AIRS API key' },
          { heading: 'Step 1.2: Confirm IDE Installation', owner: 'CUSTOMER', hours: 1, who: [A.dev], task: 'Confirm the IDE is installed at a supported version on the target machines' },
          { heading: 'Step 1.3: Install System Dependencies', owner: 'CUSTOMER', hours: 1, who: [A.dev], task: 'Install the system dependencies the hook scripts need' }
        ],
        milestone: { name: 'Prerequisites Milestone', criteria: ['API Intercept access confirmed and key issued', 'IDE installed at a supported version on every target machine', 'System dependencies installed', 'IDE chosen and its hook coverage limits understood', 'Scope agreed: which developers and which machines'] },
        meeting: intKickoff('IDE Assistants', [A.dev], ['Confirm which IDE is in scope and what its hooks cannot cover']) },
      { num: 2, title: 'Installation', anchor: 'installation',
        objective: 'Install the hooks for the chosen IDE.',
        steps: [
          { variant: 'cursor', heading: 'Step 2.1: Copy Cursor Hook Scripts', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev], task: 'Copy the Cursor hook scripts onto the target machines' },
          { variant: 'cursor', heading: 'Step 2.2: Configure Cursor Environment', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev, A.security], task: 'Configure the Cursor environment with the AIRS settings from the secret store' },
          { variant: 'cline', heading: 'Step 2.1: Copy Cline Hook Scripts', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev], task: 'Copy the Cline hook scripts onto the target machines' },
          { variant: 'cline', heading: 'Step 2.2: Configure Cline Environment', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev, A.security], task: 'Configure the Cline environment with the AIRS settings from the secret store' },
          { variant: 'windsurf', heading: 'Step 2.1: Copy Windsurf Hook Scripts', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev], task: 'Copy the Windsurf hook scripts onto the target machines' },
          { variant: 'windsurf', heading: 'Step 2.2: Configure Windsurf Environment', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev, A.security], task: 'Configure the Windsurf environment with the AIRS settings from the secret store' }
        ],
        milestone: { name: 'Installation Milestone', criteria: ['Hook scripts present on every target machine', 'AIRS key supplied from a secret store, not committed to a dotfile', 'Install method repeatable across the developer fleet', 'Uninstall path confirmed'] } },
      { num: 3, title: 'Configuration', anchor: 'configuration',
        objective: 'Agree the behavior the hooks enforce.',
        steps: [
          { heading: 'Step 3.1: Review Environment Variables (All IDEs)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.dev], task: 'Walk the environment variables and confirm each is set correctly on a target machine' },
          { heading: 'Step 3.2: Review Fail-Closed and Truncation Behavior', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security], task: 'Confirm what happens on an AIRS outage and what truncation means for detection coverage' }
        ],
        milestone: { name: 'Configuration Milestone', criteria: ['Environment variables verified on a real target machine', 'Behavior on an AIRS outage agreed and recorded', 'Truncation limits understood, with their detection impact accepted', 'Developers told what the hooks do and when they fire'] } },
      { num: 4, title: 'Verification', anchor: 'verification',
        objective: 'Prove the hooks fire within the limits of the chosen IDE.',
        steps: [
          { variant: 'cursor', heading: 'Step 4.1: Test Prompt Injection (Cursor)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm the hook blocks it' },
          { variant: 'cursor', heading: 'Step 4.2: Test MCP Pre-scan (Cursor)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Trigger an MCP pre-scan and confirm the verdict' },
          { variant: 'cursor', heading: 'Step 4.3: Test Response Scanning (Cursor)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Trigger response scanning and confirm the verdict' },
          { variant: 'cline', heading: 'Step 4.1: Test Prompt Injection (Cline)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm the hook blocks it' },
          { variant: 'cline', heading: 'Step 4.2: Test Tool Call Scanning (Cline)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security], task: 'Trigger a tool call scan and confirm the verdict, noting that Cline has no response hook' },
          { variant: 'windsurf', heading: 'Step 4.1: Test Prompt Injection (Windsurf)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Send a prompt injection and confirm the hook blocks it' },
          { variant: 'windsurf', heading: 'Step 4.2: Test Command Scanning (Windsurf)', owner: 'PANW / CUSTOMER', hours: 1, who: [A.security], task: 'Trigger a command scan and confirm the verdict' },
          { variant: 'windsurf', heading: 'Step 4.3: Verify Post-hook Alerting (Windsurf)', owner: 'PANW / CUSTOMER', hours: 1.5, who: [A.security], task: 'Confirm post-hook alerting works, and that the security lead accepts it alerts rather than blocks' }
        ],
        milestone: { name: 'Verification Milestone', criteria: ['Prompt injection blocked in the chosen IDE', 'Every hook the IDE supports confirmed firing', 'Coverage gaps for this IDE written down and accepted by the security lead', 'Normal development work not obstructed', 'Results visible in the AIRS logs'] },
        meeting: intHandover('IDE Assistants', [A.dev], ['Confirm the security lead accepts this IDE’s coverage gaps']) }
    ]
  }
];

/* Integrations all hang off API Intercept in the engagement model, so they
 * share its personas and each reconciles against its own component estimate
 * rather than the pillar's. */
const INTEGRATION_PLAYBOOKS = {};
const CI_SCANNERS = new Set(['jenkins', 'github-actions']);
INTEGRATIONS.forEach(spec => {
  /* Most integrations intercept an API call and belong to API Intercept. The
   * CI scanners do not: they scan models in a build, which is Model Security
   * work, and the engagement model files them there. */
  const pillar = CI_SCANNERS.has(spec.id) ? 'model-security' : 'api-intercept';
  INTEGRATION_PLAYBOOKS[spec.id] = Object.assign({ pillar }, spec);
});

const PLAYBOOKS = Object.assign({
  'ai-gateway': AIGW_DEPLOYMENT,
  'airs-cloud-deployment': CLOUD_DEPLOYMENT,
  'aigw-agent-identity': AIGW_AGENT_IDENTITY,
  'aigw-key-management': AIGW_KEY_MANAGEMENT,
  'aigw-kubernetes': AIGW_KUBERNETES,
  'aigw-serverless': AIGW_SERVERLESS,
  'aigw-streaming': AIGW_STREAMING,
  'api-intercept': API_INTERCEPT,
  'k8s-protection': K8S_PROTECTION,
  'model-security': MODEL_SECURITY,
  'microperimeter': MICROPERIMETER,
  'network-intercept': NETWORK_INTERCEPT,
  'red-teaming': RED_TEAMING
}, INTEGRATION_PLAYBOOKS);

// ── Derived helpers ──────────────────────────────────────────────────────────

const round1 = n => Math.round(n * 10) / 10;

/* Rows for one playbook under one variant selection. A step with no `variant`
 * is always included; a step with one appears only when it matches. */
function resolveSteps(phase, variant) {
  return phase.steps.filter(s => !s.variant || s.variant === variant);
}

/* The whole playbook flattened: every phase with its emitted steps and the
 * effort totals that follow from them. Every projection below reads this, so
 * the sheet, the milestone table and the meeting list can never disagree. */
function buildPlaybook(id, opts) {
  const pb = PLAYBOOKS[id];
  if (!pb) throw new Error(`Unknown playbook: ${id}`);
  const o = opts || {};
  const variant = o.variant || (pb.variants && pb.variants.default) || null;

  /* Phase and project totals are the sum of the rounded step figures, not the
   * rounded sum. The column has to add up when someone checks it by hand, and
   * the few minutes of rounding gained along the way are contingency anyway. */
  let baseTotal = 0;
  let plannedTotal = 0;
  let meetingTotal = 0;
  /* Running schedule position, in hours, across tasks and meetings in the
   * order they happen. This is what lets the Playbook sheet and the Meetings
   * sheet agree about when something falls: both read the same number. */
  let cum = 0;

  /* A phase can be genuinely absent for some variants: GCP has no tag
   * collector, so that phase has nothing to do rather than something to skip.
   * Such a phase declares skipWhenEmpty and drops out of the plan entirely,
   * which is honest in a way an empty gate is not. */
  const phases = pb.phases.filter(phase =>
    !phase.skipWhenEmpty || resolveSteps(phase, variant).length > 0
  ).map(phase => {
    const steps = resolveSteps(phase, variant).map(s => ({
      heading: s.heading,
      task: s.task,
      owner: s.owner,
      who: s.who || [],
      base: s.hours,
      planned: ceilHalf(s.hours * MARGIN),
      guide: s.guide || pb.guide,
      anchor: s.anchor || phase.anchor,
      variant: s.variant || null,
      checklist: !!s.checklist
    }));
    const base = round1(steps.reduce((t, s) => t + s.base, 0));
    const planned = round1(steps.reduce((t, s) => t + s.planned, 0));
    baseTotal += base;
    plannedTotal += planned;

    /* The phase laid out in the order it happens, meetings included. A
     * meeting sits before the phase, after its tasks, or ahead of one named
     * step, which is the case that matters when a review gates a single
     * action rather than the whole phase. */
    const mt = phase.meeting;
    const pos = mt ? (mt.position || 'before') : null;
    const mtHours = mt ? round1(mt.minutes / 60) : 0;
    if (mt) meetingTotal += mtHours;

    /* The step a meeting gates is often variant-specific: the point of no
     * return in an SCM Terraform deployment is a different step from the one
     * in an Auto-Execute deployment. A beforeStep may therefore be a plain
     * heading or a map from variant to heading. */
    const beforeStep = !mt ? null
      : typeof mt.beforeStep === 'string' ? mt.beforeStep
        : (mt.beforeStep || {})[variant] || null;

    const seq = [];
    const pushMeeting = () => seq.push({ kind: 'meeting', meeting: mt, hours: mtHours });
    if (pos === 'before') pushMeeting();
    steps.forEach(s => {
      if (pos === 'step' && s.heading === beforeStep) pushMeeting();
      seq.push({ kind: 'task', step: s, hours: s.planned });
    });
    if (pos === 'after') pushMeeting();
    seq.push({ kind: 'milestone', milestone: phase.milestone, hours: 0 });

    /* Day is elapsed working days if the work runs serially. It is a first
     * cut at a schedule, not a claim that nothing overlaps; the Summary says
     * so. What matters here is that one number drives every sheet. */
    const phaseStart = cum;
    seq.forEach(e => {
      cum = round1(cum + e.hours);
      e.cum = cum;
      e.day = Math.max(1, Math.ceil(cum / HOURS_PER_DAY));
    });

    return {
      num: phase.num, title: phase.title, anchor: phase.anchor,
      objective: phase.objective, note: phase.note,
      steps, base, planned, seq,
      startDay: Math.max(1, Math.ceil((phaseStart + 0.01) / HOURS_PER_DAY)),
      endDay: Math.max(1, Math.ceil(cum / HOURS_PER_DAY)),
      milestone: phase.milestone,
      meeting: mt ? Object.assign({}, mt, {
        hours: mtHours,
        beforeStep,
        day: (seq.find(e => e.kind === 'meeting') || {}).day,
        point: pos === 'before' ? `Before Phase ${phase.num} starts`
          : pos === 'after' ? `After the Phase ${phase.num} tasks, before the gate`
            : `Before "${beforeStep}" in Phase ${phase.num}`
      }) : null
    };
  });

  baseTotal = round1(baseTotal);
  plannedTotal = round1(plannedTotal);
  meetingTotal = round1(meetingTotal);
  const variantLabel = pb.variants
    ? (pb.variants.options.find(v => v.id === variant) || {}).label
    : null;

  return {
    id: pb.id, name: pb.name, pillar: pb.pillar, guide: pb.guide,
    guideUrl: SITE_BASE + pb.guide.replace(/^docs\//, ''),
    summary: pb.summary,
    variant, variantLabel,
    variantKeyLabel: pb.variants ? pb.variants.label : null,
    variantNote: pb.variants ? pb.variants.note : null,
    phases,
    baseHours: baseTotal,
    plannedHours: plannedTotal,
    baseDays: round1(baseTotal / HOURS_PER_DAY),
    plannedDays: round1(plannedTotal / HOURS_PER_DAY),
    /* Meeting time is tracked apart from delivery effort: the engagement
     * model estimates the build, so folding meetings into that figure would
     * break the comparison. The schedule needs both. */
    meetingHours: meetingTotal,
    scheduleHours: round1(plannedTotal + meetingTotal),
    scheduleDays: round1((plannedTotal + meetingTotal) / HOURS_PER_DAY)
  };
}

/* The full roster: customer personas from the engagement model, PANW roles
 * from this file. `req` is true when any phase meeting lists the role as
 * required, so the roster reflects this playbook rather than the pillar in
 * general. */
function buildRoster(plan) {
  const required = new Set();
  plan.phases.forEach(p => ((p.meeting && p.meeting.required) || []).forEach(r => required.add(r)));

  const rows = [];
  const pillar = AIRSModel && AIRSModel.PILLARS ? AIRSModel.PILLARS[plan.pillar] : null;
  if (pillar) {
    pillar.personas.forEach(p => rows.push({
      role: p.role, side: 'CUSTOMER',
      req: required.has(p.role) || p.req,
      knowledge: p.knowledge, authority: p.authority, risk: p.risk
    }));
  }
  DELIVERY_ROLES.forEach(r => rows.push({
    role: r.role, side: r.side, req: required.has(r.role) || r.req,
    knowledge: r.knowledge, authority: r.authority, risk: r.risk
  }));

  /* A meeting can name a role the pillar's persona list does not carry, such
   * as a SOC team that only appears at handover. Those are real attendees and
   * belong on the roster, with the gap visible rather than silently dropped. */
  const known = new Set(rows.map(r => r.role));
  [...required].filter(r => !known.has(r)).forEach(role => rows.push({
    role, side: 'CUSTOMER', req: true,
    knowledge: '', authority: '', risk: 'Named as a required attendee but not profiled in the engagement model'
  }));

  return rows.sort((a, b) => (a.req !== b.req ? (a.req ? -1 : 1) : a.role.localeCompare(b.role)));
}

// ── Workbook projection ──────────────────────────────────────────────────────

function todayStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function summarySheet(plan) {
  const rows = [['Field', 'Value']];
  rows.push(['Playbook', `${plan.name} delivery playbook`]);
  rows.push(['Guide', plan.guideUrl]);
  rows.push(['Scope', plan.summary]);
  if (plan.variantLabel) rows.push([plan.variantKeyLabel || 'Variant', plan.variantLabel]);
  rows.push(['Generated', todayStamp()]);
  rows.push(['', '']);
  rows.push(['Phases', plan.phases.length]);
  rows.push(['Tasks', plan.phases.reduce((t, p) => t + p.steps.length, 0)]);
  rows.push(['Milestones', plan.phases.length]);
  rows.push(['Meetings', plan.phases.filter(p => p.meeting).length]);
  rows.push(['', '']);
  rows.push(['Base effort (hours)', plan.baseHours]);
  rows.push(['Base effort (days)', plan.baseDays]);
  rows.push(['Planned effort (hours)', plan.plannedHours]);
  rows.push(['Planned effort (days)', plan.plannedDays]);
  rows.push(['Meeting time (hours)', plan.meetingHours]);
  rows.push(['Schedule total (hours)', plan.scheduleHours]);
  rows.push(['Schedule total (days)', plan.scheduleDays]);
  rows.push(['Contingency', `${Math.round((MARGIN - 1) * 100)}% added to every base estimate, then rounded up to the next half hour`]);
  /* Rounding up never rounds down, so the effective uplift always exceeds the
   * margin, and most on short tasks: half an hour of base becomes a full hour.
   * Printing only the 35% would understate what the schedule actually holds. */
  rows.push(['Effective contingency', `${Math.round((plan.plannedHours / plan.baseHours - 1) * 100)}% once rounding is applied across ${plan.phases.reduce((t, p) => t + p.steps.length, 0)} tasks`]);
  rows.push(['', '']);
  rows.push(['How to read this', 'Base effort is the task on a day where nothing goes wrong. Planned effort is what to put in the schedule. The gap is the contingency, shown rather than hidden inside the estimate.']);
  rows.push(['Working day', `${HOURS_PER_DAY} hours`]);
  rows.push(['Effort, not elapsed time', 'These are person-hours of work, not calendar duration. Customer-owned tasks often wait on an approval or a change window, which the schedule has to carry separately.']);
  rows.push(['The Day column', `Elapsed working day if the tasks run one after another, counting meeting time. It is a starting schedule, not a claim that nothing overlaps: parallelize the customer-owned tasks and the finish moves left. The Playbook and Meetings sheets derive their Day from the same running total, so a meeting lands at the same point on both.`]);
  return { name: 'Summary', cols: [28, 110], rows };
}

/* Phase, milestone and total rows all repeat effort that the task rows under
 * them already carry, so summing the column without thinking double-counts
 * every hour three times. The Type column is what makes the sheet safe: filter
 * to Task and the totals are right, which the autofilter on row 1 makes a
 * one-click operation. */
/* Meetings appear here as rows in the task sequence, not only on their own
 * sheet. A plan that lists a review somewhere else is a plan where the review
 * gets missed, and the Day column is what ties the two sheets together: both
 * read the same running total. */
function playbookSheet(plan) {
  const rows = [['Type', 'Day', 'Phase', 'Step', 'Task', 'Owner', 'Customer stakeholders', 'Base effort (h)', 'Planned effort (h)', 'Status', 'Comments', 'Guide reference']];

  /* The stakeholders a phase needs are the union of its steps', so the phase
   * row answers "who do I need this week" without reading every row under it. */
  const phaseWho = p => [...new Set(p.steps.flatMap(s => s.who))].join('\n');

  plan.phases.forEach(p => {
    const span = p.startDay === p.endDay ? `${p.startDay}` : `${p.startDay}–${p.endDay}`;
    rows.push(['Phase', span, `Phase ${p.num}: ${p.title}`, '', p.objective, '', phaseWho(p), p.base, p.planned, '', p.note || '', '']);

    p.seq.forEach(e => {
      if (e.kind === 'task') {
        const s = e.step;
        rows.push(['Task', e.day, `Phase ${p.num}`, s.heading, s.task, s.owner, s.who.join('\n'), s.base, s.planned, 'Not started', '',
          `${SITE_BASE}${s.guide.replace(/^docs\//, '')}#${s.anchor}`]);
      } else if (e.kind === 'meeting') {
        const m = e.meeting;
        rows.push(['Meeting', e.day, `Phase ${p.num}`, m.name,
          `${m.point}. ${m.minutes} minutes. Agenda and attendees on the Meetings sheet.`,
          'PANW / CUSTOMER', m.required.join('\n'), '', e.hours, 'Not scheduled', '', '']);
      } else {
        rows.push(['Milestone', e.day, `Phase ${p.num}`, p.milestone.name,
          `Phase gate. ${p.milestone.criteria.length} exit criteria on the Milestones sheet, all of which must be met before the next phase starts.`,
          'PANW / CUSTOMER', phaseWho(p), '', '', 'Not met', '', '']);
      }
    });
  });

  rows.push(['Total', plan.phases[plan.phases.length - 1].endDay, '', '',
    'Base and planned effort are task rows only. The Planned column also carries meeting time on the Meeting rows, so filter by Type before summing.',
    '', '', plan.baseHours, plan.scheduleHours, '',
    `${plan.plannedDays} days of delivery effort plus ${plan.meetingHours} h of meetings`, '']);
  return { name: 'Playbook', cols: [11, 7, 34, 46, 92, 18, 32, 15, 17, 14, 34, 72], rows };
}

function milestonesSheet(plan) {
  const rows = [['Milestone', 'Phase', 'Exit criterion', 'Owner', 'Evidence', 'Status']];
  plan.phases.forEach(p => {
    p.milestone.criteria.forEach((c, i) => {
      rows.push([i === 0 ? p.milestone.name : '', i === 0 ? `Phase ${p.num}: ${p.title}` : '', c, 'PANW / CUSTOMER', '', 'Not met']);
    });
  });
  return { name: 'Milestones', cols: [38, 38, 94, 18, 36, 12], rows };
}

/* Day and Sequence point are derived from the same running total the Playbook
 * sheet uses, so the two cannot disagree about when a meeting happens. When
 * stays hand-written because "before the routing change" tells a reader
 * something the derived position cannot. */
function meetingsSheet(plan) {
  const rows = [['Meeting', 'Day', 'Phase', 'Sequence point', 'When', 'Length (min)', 'Attendee hours', 'Required attendees', 'Optional attendees', 'Agenda', 'Date', 'Status']];
  plan.phases.filter(p => p.meeting).forEach(p => {
    const m = p.meeting;
    const attendees = m.required.length + (m.optional || []).length;
    rows.push([m.name, m.day, `Phase ${p.num}: ${p.title}`, m.point, m.when, m.minutes,
      round1(m.hours * m.required.length), m.required.join('\n'), (m.optional || []).join('\n'),
      m.agenda.map((a, i) => `${i + 1}. ${a}`).join('\n'), '', 'Not scheduled']);
  });
  rows.push(['Total', '', '', '', '', round1(plan.meetingHours * 60), '', '', '', '', '', '']);
  return { name: 'Meetings', cols: [38, 7, 38, 44, 32, 13, 15, 38, 34, 96, 12, 14], rows };
}

/* Two different asks of the same person: sit in a meeting, and do the work.
 * They do not line up, because a phase can have tasks and no meeting. Keeping
 * them in separate columns is what lets someone answer "how much of my week
 * does this take" rather than just "am I invited". */
function rosterSheet(plan) {
  const rows = [['Role', 'Side', 'Requirement', 'Meetings attending', 'Phases with tasks', 'Task hours (planned)', 'Key knowledge required', 'Decision authority', 'Risk if absent', 'Named person', 'Email', 'Confirmed']];
  buildRoster(plan).forEach(r => {
    const meetings = plan.phases
      .filter(p => p.meeting && ((p.meeting.required || []).includes(r.role) || (p.meeting.optional || []).includes(r.role)))
      .map(p => `Phase ${p.num}`).join(', ');
    const taskPhases = plan.phases
      .filter(p => p.steps.some(s => s.who.includes(r.role)))
      .map(p => `Phase ${p.num}`).join(', ');
    const hours = round1(plan.phases.reduce((t, p) =>
      t + p.steps.filter(s => s.who.includes(r.role)).reduce((u, s) => u + s.planned, 0), 0));
    rows.push([r.role, r.side, r.req ? 'Required' : 'Conditional', meetings, taskPhases, hours || '',
      r.knowledge, r.authority, r.risk, '', '', 'No']);
  });
  return { name: 'Roles', cols: [34, 12, 13, 26, 30, 19, 58, 50, 48, 22, 26, 11], rows };
}

function buildSheets(id, opts) {
  const plan = buildPlaybook(id, opts);
  return [summarySheet(plan), playbookSheet(plan), milestonesSheet(plan), meetingsSheet(plan), rosterSheet(plan)];
}

function fileName(id, opts) {
  const plan = buildPlaybook(id, opts);
  const v = plan.variant ? `-${plan.variant}` : '';
  return `airs-playbook-${plan.id}${v}-${todayStamp()}.xlsx`;
}

return {
  MARGIN, HOURS_PER_DAY, SITE_BASE, PLAYBOOKS, DELIVERY_ROLES,
  buildPlaybook, buildRoster, buildSheets, fileName, todayStamp
};

});
