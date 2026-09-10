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
  },
  {
    badge: "Updated",
    date: "Sep 8",
    title: "VM-Series Deployment on Azure",
    href: "guides/azure/vm-series-deployment.html",
    tags: "FIPS-CC mode, Azure VM image capture, Terraform"
  },
  {
    badge: "New",
    date: "Sep 8",
    title: "Cloud NGFW: vWAN Routing Intent Migration Checklist",
    href: "guides/cngfw/vwan-routing-intent-migration-checklist.html",
    tags: "Cloud NGFW, vWAN, Routing Intent, Azure"
  }
];
