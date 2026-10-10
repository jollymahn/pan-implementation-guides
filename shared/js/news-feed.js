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
 * labelled one list twice and told the reader nothing.
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
