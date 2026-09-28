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
    badge: "New",
    date: "Sep 28",
    title: "AI Gateway on EKS, AKS, and GKE",
    href: "guides/ai-gateway/kubernetes-deployment.html",
    tags: "AI Gateway, Hybrid, Kubernetes, Helm, Workload Identity"
  },
  {
    badge: "Updated",
    date: "Sep 28",
    title: "AI Gateway Hybrid Connectivity",
    href: "guides/ai-gateway/hybrid-infrastructure.html#connectivity",
    tags: "Outbound only, Inbound path removed, PrivateLink"
  },
  {
    badge: "Updated",
    date: "Sep 28",
    title: "ECS Fargate Support",
    href: "guides/ai-gateway/serverless-deployment.html#fargate",
    tags: "EC2-backed ECS, Fargate undocumented, Capacity providers"
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
  }
];
