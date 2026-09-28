/**
 * News feed data for the landing page "What's New" section.
 *
 * To add an entry after publishing a new or updated guide:
 *   1. Add a new object to the TOP of the NEWS_ITEMS array.
 *   2. Set badge to "New" or "Updated".
 *   3. Keep the array to 5–6 items max; remove the oldest entry.
 *
 * href paths are relative to docs/ (the site root).
 */
var NEWS_ITEMS = [
  {
    badge: "Updated",
    date: "Sep 27",
    title: "Prisma AIRS AI Gateway Deployment",
    href: "guides/ai-gateway/ai-gateway-deployment.html",
    tags: "Prompt log residency, SaaS Gateway toggle, Data residency"
  },
  {
    badge: "New",
    date: "Sep 25",
    title: "AI Gateway on ECS and Container Apps",
    href: "guides/ai-gateway/serverless-deployment.html",
    tags: "AI Gateway, Amazon ECS, Azure Container Apps, Terraform"
  },
  {
    badge: "New",
    date: "Sep 22",
    title: "AI Gateway Hybrid Infrastructure",
    href: "guides/ai-gateway/hybrid-infrastructure.html",
    tags: "AI Gateway, Hybrid, EKS, AKS, GKE, Helm"
  },
  {
    badge: "New",
    date: "Sep 15",
    title: "VM-Series Active/Passive HA on AWS",
    href: "guides/aws/vm-series-ha-deployment.html",
    tags: "VM-Series, HA, AWS, Cross-AZ, Terraform"
  },
  {
    badge: "New",
    date: "Sep 10",
    title: "AIRS Engagement Planner",
    href: "guides/airs-planner/index.html",
    tags: "AIRS, Project Plan, Prerequisites, Team Personas"
  },
  {
    badge: "New",
    date: "Sep 9",
    title: "VM-Series Active/Passive HA on Azure",
    href: "guides/azure/vm-series-ha.html",
    tags: "SCM, HA, Azure, VM-Series"
  }
];
