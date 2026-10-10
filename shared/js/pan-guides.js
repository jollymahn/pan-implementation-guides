/* ══════════════════════════════════════════════════════════════════
   PAN Implementation Guides — Evolved JavaScript
   Copy buttons, scroll spy, back-to-top, mobile sidebar, mgmt tabs,
   download-as-markdown, image lightbox

   Usage: <script src="../../shared/js/pan-guides.js"></script>
   ══════════════════════════════════════════════════════════════════ */

// ── Copy-to-clipboard for code blocks ──────────────────────────────
function copyCode(btn) {
  const code = btn.previousElementSibling.querySelector('code') || btn.previousElementSibling;
  navigator.clipboard.writeText(code.textContent).then(() => {
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// ── Scroll spy for sidebar active section ──────────────────────────
const sections = document.querySelectorAll('h2[id]');
const sidebarLinks = document.querySelectorAll('.sidebar a[data-section]');

function updateActiveSection() {
  let current = '';
  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= 120) {
      current = section.id;
    }
  });
  sidebarLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

// ── Back-to-top button ─────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
function updateBackToTop() {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
}

// ── Download as Markdown button visibility ─────────────────────────
const downloadMdBtn = document.getElementById('downloadMdBtn');
function updateDownloadMdBtn() {
  if (downloadMdBtn) {
    downloadMdBtn.classList.toggle('visible', window.scrollY > 400);
  }
}

// ── Collapsible sections ───────────────────────────────────────────
document.querySelectorAll('.collapsible-header').forEach(header => {
  header.addEventListener('click', () => {
    header.classList.toggle('open');
    const body = header.nextElementSibling;
    if (body) body.classList.toggle('open');
  });
});

// ── Combined scroll handler ────────────────────────────────────────
window.addEventListener('scroll', () => {
  updateActiveSection();
  updateBackToTop();
  updateDownloadMdBtn();
}, { passive: true });

// Initial state
updateActiveSection();

// ── Mobile navigation drawer ───────────────────────────────────────
// Below 900px the global rail is hidden, which used to leave a landing or hub
// page with no navigation at all and a guide page with its own contents and
// nothing else. Both navs now go into one drawer behind one button.
//
// The two are in different parents (.global-nav sits after the header,
// .sidebar inside .layout), so they are moved into a shared wrapper. Moving
// them is safe because both are position:fixed and out of flow: the wrapper
// is display:contents above 900px, so the desktop layout is byte-identical.

function getMobileDrawer() {
  return document.querySelector('.mobile-nav');
}

/**
 * Open or close the drawer. Kept under this name because 58 pages call it
 * from an inline onclick on their hamburger.
 */
function toggleSidebar(force) {
  const drawer = getMobileDrawer();
  if (!drawer) return;

  const open = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
  drawer.classList.toggle('open', open);

  const backdrop = document.querySelector('.sidebar-backdrop');
  if (backdrop) backdrop.classList.toggle('visible', open);

  const btn = document.querySelector('.hamburger');
  if (btn) btn.setAttribute('aria-expanded', String(open));

  // Stop the page behind the drawer scrolling under the reader's finger.
  document.body.classList.toggle('drawer-open', open);
}

function initMobileNav() {
  const header = document.querySelector('.site-header');
  const rail = document.querySelector('.global-nav');
  const sidebar = document.querySelector('.sidebar');
  if (!header || (!rail && !sidebar)) return;

  const drawer = document.createElement('div');
  drawer.className = 'mobile-nav';
  header.parentNode.insertBefore(drawer, header.nextSibling);

  // Page contents first: on a guide that is what the reader came for. The
  // labels only render below 900px, where the two lists sit on top of each
  // other and would otherwise run together.
  if (sidebar) {
    drawer.appendChild(labelFor('On this page'));
    drawer.appendChild(sidebar);
  }
  if (rail) {
    drawer.appendChild(labelFor('All guides'));
    drawer.appendChild(rail);
  }

  function labelFor(text) {
    const el = document.createElement('div');
    el.className = 'mobile-nav-label';
    el.textContent = text;
    return el;
  }

  // 21 pages carrying a rail have no hamburger, because they have no in-page
  // sidebar and nothing used to open. Give every page one rather than editing
  // each file: the button belongs to the drawer, not to the page.
  let btn = header.querySelector('.hamburger');
  if (!btn) {
    btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.type = 'button';
    btn.innerHTML = '&#9776;';
    header.insertBefore(btn, header.firstChild);
  }
  // The inline handlers came in three versions written at different times.
  // Ten of them toggled `.open` on the backdrop, which the stylesheet spells
  // `.visible`, so those pages had a button that did nothing visible at all.
  // The drawer owns the button now, so drop whatever the page had.
  btn.removeAttribute('onclick');
  btn.onclick = null;
  btn.addEventListener('click', () => toggleSidebar());
  btn.setAttribute('aria-label', 'Toggle navigation');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'mobile-nav');
  drawer.id = 'mobile-nav';

  let backdrop = document.querySelector('.sidebar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }
  backdrop.addEventListener('click', () => toggleSidebar(false));

  // Following a link closes the drawer. Without this, an in-page jump on a
  // guide leaves the drawer covering the heading it just scrolled to.
  drawer.addEventListener('click', (e) => {
    if (e.target.closest('a')) toggleSidebar(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') toggleSidebar(false);
  });

  // Coming back above 900px with the drawer open would otherwise leave the
  // backdrop over a desktop layout that has no way to dismiss it.
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) toggleSidebar(false);
  });
}

// ── Smooth scroll with header offset ───────────────────────────────
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href').slice(1);
  const target = document.getElementById(targetId);
  if (!target) return;

  e.preventDefault();
  const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 56;
  const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
  window.scrollTo({ top, behavior: 'smooth' });
});

// ── Open collapsibles targeted by the URL hash ─────────────────────
// Step links (#step-2a-6) land on a collapsed block; expand it and any
// collapsible ancestors so the reader sees the step, not just its header.
function openCollapsiblesForHash() {
  const id = decodeURIComponent((location.hash || '').slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  let el = target.classList && target.classList.contains('collapsible') ? target : target.closest('.collapsible');
  while (el) {
    const header = el.querySelector(':scope > .collapsible-header');
    const body = el.querySelector(':scope > .collapsible-body');
    if (header && body) {
      header.classList.add('open');
      body.classList.add('open');
    }
    el = el.parentElement ? el.parentElement.closest('.collapsible') : null;
  }
}
window.addEventListener('hashchange', openCollapsiblesForHash);
document.addEventListener('DOMContentLoaded', openCollapsiblesForHash);
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const id = link.getAttribute('href').slice(1);
  if (!document.getElementById(id)) return;
  history.replaceState(null, '', '#' + id);
  openCollapsiblesForHash();
});

// ── Tabbed split-path UI (mgmt plane, routing model, etc.) ─────────
// Each .mgmt-tabs container can declare data-tab-group="<name>" to scope
// its selection state separately. Default group is "mgmt" for backwards
// compatibility with existing Panorama vs SCM tabs.
//
// IMPORTANT: tab groups can be nested (e.g. routing tabs inside the
// Panorama mgmt panel). querySelectorAll walks all descendants, so we
// must filter to elements whose closest .mgmt-tabs ancestor IS this
// group — otherwise the outer init attaches handlers to inner tabs and
// clicks cross-fire between groups.
const MGMT_STORAGE_PREFIX = 'pan-guides-tab-';

function ownTabs(group) {
  return Array.from(group.querySelectorAll('.mgmt-tab'))
    .filter(t => t.closest('.mgmt-tabs') === group);
}
function ownPanels(group) {
  return Array.from(group.querySelectorAll('.mgmt-panel'))
    .filter(p => p.closest('.mgmt-tabs') === group);
}

// A panel may serve several planes via a space-separated data-plane
// (e.g. data-plane="aws azure gcp local"). Single values still match.
function planeMatches(attr, plane) {
  if (!attr) return false;
  return attr === plane || attr.split(/\s+/).indexOf(plane) !== -1;
}

function initMgmtTabs() {
  const tabGroups = document.querySelectorAll('.mgmt-tabs');
  if (!tabGroups.length) return;

  tabGroups.forEach(group => {
    const groupName = group.dataset.tabGroup || 'mgmt';
    const storageKey = MGMT_STORAGE_PREFIX + groupName;
    const tabs = ownTabs(group);
    const panels = ownPanels(group);

    // Restore saved preference for this group
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      // Tabs are optional: a group may rely on a selector elsewhere on the page.
      if (tabs.length) {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.plane === saved));
      }
      // Restore the active panel even when this group has no tab bar of its own.
      if (panels.some(p => planeMatches(p.dataset.plane, saved))) {
        panels.forEach(p => p.classList.toggle('active', planeMatches(p.dataset.plane, saved)));
      }
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const plane = tab.dataset.plane;
        localStorage.setItem(storageKey, plane);

        // Update only tab containers in the SAME group on the page
        document.querySelectorAll('.mgmt-tabs').forEach(g => {
          if ((g.dataset.tabGroup || 'mgmt') !== groupName) return;
          ownTabs(g).forEach(t => {
            t.classList.toggle('active', t.dataset.plane === plane);
          });
          ownPanels(g).forEach(p => {
            p.classList.toggle('active', planeMatches(p.dataset.plane, plane));
          });
        });

        // Show/hide standalone mgmt-conditional elements outside tab containers
        if (groupName === 'mgmt') {
          document.querySelectorAll('.mgmt-conditional[data-plane]').forEach(el => {
            el.style.display = el.dataset.plane === plane ? '' : 'none';
          });
        }
      });
    });
  });
}

// On load, also apply mgmt-conditional visibility from saved preference
function initMgmtConditional() {
  const saved = localStorage.getItem(MGMT_STORAGE_PREFIX + 'mgmt');
  if (!saved) return;
  document.querySelectorAll('.mgmt-conditional[data-plane]').forEach(el => {
    el.style.display = el.dataset.plane === saved ? '' : 'none';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMgmtTabs();
  initMgmtConditional();
});

// ── HTML to Markdown converter ─────────────────────────────────────
function htmlToMarkdown(el) {
  let md = '';

  function walk(node, listDepth) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    const tag = node.tagName.toLowerCase();

    // Skip non-content elements
    if (['script', 'style', 'button', 'nav', 'aside', 'header', 'footer'].includes(tag)) return '';
    if (node.classList.contains('breadcrumb') || node.classList.contains('cloud-links') ||
        node.classList.contains('copy-btn') || node.classList.contains('download-md-btn') ||
        node.classList.contains('back-to-top') || node.classList.contains('sidebar') ||
        node.classList.contains('site-header') || node.classList.contains('progress-phases') ||
        node.classList.contains('mgmt-tab-bar')) return '';

    // Get children content
    let children = '';
    node.childNodes.forEach(child => { children += walk(child, listDepth); });
    children = children.replace(/\n{3,}/g, '\n\n');

    switch (tag) {
      case 'h1': return '\n# ' + children.trim() + '\n\n';
      case 'h2': return '\n## ' + children.trim() + '\n\n';
      case 'h3': return '\n### ' + children.trim() + '\n\n';
      case 'h4': return '\n#### ' + children.trim() + '\n\n';
      case 'p': return children.trim() + '\n\n';
      case 'br': return '\n';
      case 'hr': return '\n---\n\n';
      case 'strong': case 'b': return '**' + children.trim() + '**';
      case 'em': case 'i': return '*' + children.trim() + '*';
      case 'code':
        if (node.parentElement && node.parentElement.tagName === 'PRE') return children;
        return '`' + children.trim() + '`';
      case 'pre': {
        const code = node.querySelector('code');
        const text = code ? code.textContent : node.textContent;
        return '\n```\n' + text.trim() + '\n```\n\n';
      }
      case 'a': {
        const href = node.getAttribute('href');
        if (!href || href.startsWith('#')) return children;
        return '[' + children.trim() + '](' + href + ')';
      }
      case 'img': {
        const alt = node.getAttribute('alt') || '';
        const src = node.getAttribute('src') || '';
        return '![' + alt + '](' + src + ')\n\n';
      }
      case 'ul': {
        let items = '';
        node.querySelectorAll(':scope > li').forEach(li => {
          const indent = '  '.repeat(listDepth);
          const content = walk(li, listDepth + 1).trim().replace(/\n/g, '\n' + indent + '  ');
          items += indent + '- ' + content + '\n';
        });
        return '\n' + items + '\n';
      }
      case 'ol': {
        let items = '';
        let i = 1;
        node.querySelectorAll(':scope > li').forEach(li => {
          const indent = '  '.repeat(listDepth);
          const content = walk(li, listDepth + 1).trim().replace(/\n/g, '\n' + indent + '   ');
          items += indent + (i++) + '. ' + content + '\n';
        });
        return '\n' + items + '\n';
      }
      case 'li': return children;
      case 'table': {
        const rows = [];
        node.querySelectorAll('tr').forEach(tr => {
          const cells = [];
          tr.querySelectorAll('th, td').forEach(cell => {
            cells.push(walk(cell, 0).trim().replace(/\n/g, ' '));
          });
          rows.push(cells);
        });
        if (rows.length === 0) return '';
        const colCount = Math.max(...rows.map(r => r.length));
        let table = '';
        rows.forEach((row, idx) => {
          table += '| ' + row.join(' | ') + ' |\n';
          if (idx === 0) {
            table += '|' + ' --- |'.repeat(colCount) + '\n';
          }
        });
        return '\n' + table + '\n';
      }
      case 'th': case 'td': case 'tr': case 'thead': case 'tbody':
        return children;
      case 'div': {
        // Handle callout boxes
        if (node.classList.contains('callout')) {
          const title = node.querySelector('.callout-title');
          const titleText = title ? title.textContent.trim() : 'Note';
          const bodyContent = [];
          node.childNodes.forEach(child => {
            if (child !== title) bodyContent.push(walk(child, listDepth));
          });
          return '\n> **' + titleText + ':** ' + bodyContent.join('').trim().replace(/\n/g, '\n> ') + '\n\n';
        }
        // Handle code blocks wrapped in div.code-block
        if (node.classList.contains('code-block')) {
          const pre = node.querySelector('pre');
          if (pre) return walk(pre, listDepth);
        }
        // Handle mgmt panels — export all panels, not just active
        if (node.classList.contains('mgmt-panel')) {
          const plane = node.dataset.plane || '';
          return '\n### ' + plane + '\n\n' + children;
        }
        return children;
      }
      default: return children;
    }
  }

  md = walk(el, 0);
  md = md.replace(/\n{3,}/g, '\n\n').trim();
  return md;
}

// ── Download as Markdown ───────────────────────────────────────────
function downloadAsMarkdown() {
  const article = document.querySelector('.article');
  if (!article) return;

  const md = htmlToMarkdown(article);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  // Derive filename from page title or h1
  const h1 = article.querySelector('h1');
  const title = h1 ? h1.textContent.trim() : document.title;
  const filename = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.md';

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Visual feedback
  const btn = document.getElementById('downloadMdBtn');
  if (btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<span style="font-size:1rem">&#10003;</span> Downloaded!';
    btn.classList.add('downloaded');
    setTimeout(() => {
      btn.innerHTML = original;
      btn.classList.remove('downloaded');
    }, 2500);
  }
}

// ── Image lightbox (click article images to enlarge) ───────────────
function openLightbox(img) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';

  const large = document.createElement('img');
  large.src = img.src;
  large.alt = img.alt;
  overlay.appendChild(large);

  function close() {
    overlay.remove();
    document.body.classList.remove('lightbox-open');
    document.removeEventListener('keydown', onKeydown);
  }
  function onKeydown(e) {
    if (e.key === 'Escape') close();
  }

  overlay.addEventListener('click', close);
  document.addEventListener('keydown', onKeydown);

  document.body.appendChild(overlay);
  document.body.classList.add('lightbox-open');
}

document.addEventListener('click', (e) => {
  const img = e.target.closest('.article img');
  if (!img || img.closest('a')) return;
  openLightbox(img);
});

// ── Update banners ───────────────────────────────────────────────
// Usage: <div class="update-banner" data-updated="YYYY-MM-DD">
// Auto-hides after 30 days; dismiss button writes to localStorage.
(function () {
  const DAYS = 30;
  const storageKey = (path) => 'update-banner-dismissed:' + path;

  document.querySelectorAll('.update-banner').forEach((el) => {
    const raw = el.dataset.updated;
    if (!raw) return;

    const updated = new Date(raw);
    const now = new Date();
    const age = (now - updated) / (1000 * 60 * 60 * 24);

    if (age > DAYS) { el.remove(); return; }

    const key = storageKey(location.pathname);
    if (localStorage.getItem(key) === raw) { el.remove(); return; }

    // Build inner markup
    const month = updated.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const what = el.dataset.what ? el.dataset.what : 'this page was recently revised';
    el.innerHTML =
      '<span class="update-banner-dot" aria-hidden="true"></span>' +
      '<span class="update-banner-text"><strong>Updated ' + month + '</strong> &mdash; ' + what + '.</span>' +
      '<button class="update-banner-dismiss" aria-label="Dismiss update notice">&times;</button>';

    el.querySelector('.update-banner-dismiss').addEventListener('click', () => {
      localStorage.setItem(key, raw);
      el.remove();
    });
  });
}());

// ── Global Navigation ──────────────────────────────────────────
//
// Entries are read in order. An entry with `section` draws a band heading and
// holds no links; everything after it belongs to that band until the next one.
// An entry with `id` is a collapsible group.
//
// Two rules keep the rail readable as it grows:
//
//   1. A group holds one product family. AIRS once held four (AIRS proper, AI
//      Gateway, AI Integrations, Hybrid Data Plane) behind `label` dividers,
//      which put 38% of the rail inside a single group and made those dividers
//      do a job they are not visually strong enough for.
//   2. Inside a group, `label` divides a run of items and `sub` marks items
//      belonging to the link above them. Pick whichever matches the content and
//      do not use one to imitate the other.
//
// Everything here is alphabetical: the sections, the groups inside a section,
// and the links inside a group. build-catalog.js enforces all three, and also
// checks that these sections match the bands in catalog.js so the rail and the
// landing page cannot diverge.
//
// Two things bend the alphabet, both on purpose and both encoded in the
// checker. Labs sorts last rather than second, because it holds training
// material rather than a deployment guide. A group's `Overview` (or, in AIRS,
// `AI Overview`) leads its group.
//
// Links sort within their tier, never across one: a parent is compared against
// the other parents, and a `sub: true` child only against its siblings. Where a
// group is a reading order rather than a list, say so in the markup by making
// the prerequisite the parent, as AI Gateway does with Hybrid Infrastructure.
const GLOBAL_NAV_GROUPS = [
  { section: 'AI Security' },
  { id: 'ai-gateway', label: 'AI Gateway', links: [
    { t: 'Overview', h: 'guides/ai-gateway/index.html' },
    { t: 'Core Deployment', h: 'guides/ai-gateway/ai-gateway-deployment.html' },
    { t: 'Flow Diagrams', h: 'guides/ai-gateway/diagrams/flow-diagrams-review.html' },
    { t: 'LLM API Key Management', h: 'guides/ai-gateway/llm-api-key-management.html' },
    { t: 'Streaming, Caching, and A2A', h: 'guides/ai-gateway/streaming-caching-a2a.html' },
    { label: 'Hybrid Data Plane' },
    // Hybrid Infrastructure carries the sizing and prerequisites both container
    // paths depend on, so it is their parent here rather than a third sibling.
    // That was implicit in the old order and would have been lost to sorting.
    { t: 'Hybrid Infrastructure', h: 'guides/ai-gateway/hybrid-infrastructure.html' },
    { t: 'ECS and Container Apps', h: 'guides/ai-gateway/serverless-deployment.html', sub: true },
    { t: 'EKS, AKS, and GKE', h: 'guides/ai-gateway/kubernetes-deployment.html', sub: true },
  ]},
  // Apigee and Azure APIM arrived last and were appended after TrueFoundry,
  // where nobody scanning the list finds them. Hence the checker.
  { id: 'ai-integrations', label: 'AI Integrations', links: [
    { t: 'Overview', h: 'guides/airs-integrations/index.html' },
    { t: 'Apigee', h: 'guides/airs-integrations/apigee.html' },
    { t: 'Azure APIM', h: 'guides/airs-integrations/azure-apim.html' },
    { t: 'Claude Code', h: 'guides/airs-integrations/claude-code.html' },
    { t: 'Codex CLI', h: 'guides/airs-integrations/codex-cli.html' },
    { t: 'GitHub Actions', h: 'guides/airs-integrations/github-actions.html' },
    { t: 'IDE Assistants', h: 'guides/airs-integrations/ide-assistants.html' },
    { t: 'Jenkins', h: 'guides/airs-integrations/jenkins.html' },
    { t: 'Kong', h: 'guides/airs-integrations/kong.html' },
    { t: 'LiteLLM', h: 'guides/airs-integrations/litellm.html' },
    { t: 'n8n', h: 'guides/airs-integrations/n8n.html' },
    { t: 'TrueFoundry', h: 'guides/airs-integrations/truefoundry.html' },
  ]},
  // "AI Overview", not "Overview": three of the four groups in this section
  // had an entry called Overview, and this is the one that introduces AI
  // Security as a whole. It is also the section overview on the landing page.
  { id: 'airs', label: 'AIRS', links: [
    { t: 'AI Overview', h: 'guides/airs/index.html' },
    { t: 'API Intercept', h: 'guides/airs/airs-api-intercept.html' },
    { t: 'Cloud Deploy', h: 'guides/airs/airs-cloud-deployment.html' },
    { t: 'Engagement Planner', h: 'guides/airs-planner/index.html' },
    { t: 'Kubernetes', h: 'guides/airs/airs-k8s-protection.html' },
    { t: 'Microperimeter', h: 'guides/airs/airs-microperimeter.html' },
    { t: 'Model Security', h: 'guides/airs-model/airs-model-security.html' },
    { t: 'Network Intercept', h: 'guides/airs/airs-network-intercept.html' },
    { t: 'Red Teaming', h: 'guides/airs-red/airs-red-teaming.html' },
  ]},

  { section: 'Network Security' },
  { id: 'branch', label: 'Branch NGFW', links: [
    { t: 'ZTP, HA, and SD-WAN', h: 'guides/branch/branch-ngfw-ztp-ha-sdwan.html' },
  ]},
  { id: 'cngfw', label: 'Cloud NGFW', links: [
    { t: 'Overview & Deploy', h: 'guides/cngfw/cloud-ngfw-deployment.html' },
    { t: 'AWS', h: 'guides/cngfw/cloud-ngfw-aws.html', sub: true },
    { t: 'Azure', h: 'guides/cngfw/cloud-ngfw-azure.html', sub: true },
    { t: 'Azure Native', h: 'guides/cngfw/cloud-ngfw-azure-native.html', sub: true },
  ]},
  { id: 'globalprotect', label: 'GlobalProtect', links: [
    { t: 'Overview', h: 'globalprotect/index.html' },
    { t: 'Linear Deploy Guide', h: 'globalprotect/linear-guide.html', sub: true },
  ]},
  { id: 'vm-series', label: 'VM-Series', links: [
    { t: 'AWS', h: 'guides/aws/index.html' },
    { t: 'Active/Passive HA', h: 'guides/aws/vm-series-ha-deployment.html', sub: true },
    { t: 'Deploy', h: 'guides/aws/vm-series-deployment.html', sub: true },
    { t: 'GWLB Teardown', h: 'guides/aws/gwlb-teardown-procedure.html', sub: true },
    { t: 'Panorama', h: 'guides/aws/panorama-deployment.html', sub: true },
    { t: 'Plugin Monitor', h: 'guides/aws/aws-plugin-monitoring.html', sub: true },
    { t: 'Azure', h: 'guides/azure/index.html' },
    { t: 'Deploy', h: 'guides/azure/vm-series-deployment.html', sub: true },
    { t: 'HA', h: 'guides/azure/vm-series-ha.html', sub: true },
    { t: 'Panorama', h: 'guides/azure/panorama-deployment.html', sub: true },
    { t: 'Prerequisites', h: 'guides/azure/azure-phase1-prerequisites.html', sub: true },
    { t: 'Questionnaire', h: 'guides/azure/azure-deployment-questionnaire.html', sub: true },
    { t: 'Bootstrap', h: 'guides/bootstrap/vm-series-bootstrap.html' },
    { t: 'GCP', h: 'guides/gcp/index.html' },
    { t: 'Deploy', h: 'guides/gcp/vm-series-deployment.html', sub: true },
    { t: 'Panorama', h: 'guides/gcp/panorama-deployment.html', sub: true },
    { t: 'OCI', h: 'guides/oci/index.html' },
    { t: 'Deploy', h: 'guides/oci/vm-series-deployment.html', sub: true },
    { t: 'Panorama', h: 'guides/oci/panorama-deployment.html', sub: true },
  ]},

  { section: 'Platform & Identity' },
  { id: 'cie', label: 'Cloud Identity Engine', links: [
    { t: 'CIE Implementation', h: 'guides/cloud-identity-engine/cie-implementation.html' },
    { t: 'Cloud Tags', h: 'guides/cloud-identity-engine/cie-cloud-tags.html', sub: true },
  ]},
  { id: 'scm', label: 'SCM Onboarding', links: [
    { t: 'Firewall Onboarding', h: 'scm-onboarding/index.html' },
    { t: 'Okta SSO', h: 'scm-onboarding/okta-sso.html', sub: true },
  ]},

  { section: 'Reference' },
  { id: 'panos-cli', label: 'PAN-OS CLI', links: [
    { t: 'Both Command Trees', h: 'guides/panorama-cli/panos-cli-reference.html' },
    { t: 'Firewall CLI', h: 'guides/panorama-cli/firewall-cli-reference.html' },
    { t: 'Config: Copy', h: 'guides/panorama-cli/firewall-cli-config-copy.html', sub: true },
    { t: 'Config: Delete', h: 'guides/panorama-cli/firewall-cli-config-delete.html', sub: true },
    { t: 'Config: Other', h: 'guides/panorama-cli/firewall-cli-config-other.html', sub: true },
    { t: 'Config: Rename', h: 'guides/panorama-cli/firewall-cli-config-rename.html', sub: true },
    { t: 'Config: Set', h: 'guides/panorama-cli/firewall-cli-config-set.html', sub: true },
    { t: 'FW Configuration', h: 'guides/panorama-cli/firewall-cli-configuration.html', sub: true },
    { t: 'FW Operational', h: 'guides/panorama-cli/firewall-cli-operational.html', sub: true },
    { t: 'Panorama Config', h: 'guides/panorama-cli/panorama-cli-configuration.html', sub: true },
    { t: 'Panorama Ops', h: 'guides/panorama-cli/panorama-cli-operational.html', sub: true },
  ]},

  // Last, not second: training material you run in your own environment, not a
  // guide to a deployment. See SECTION_PINNED_LAST in build-catalog.js.
  { section: 'Labs' },
  { id: 'labs', label: 'AIRS MLOps Lab', links: [
    { t: 'Overview', h: 'labs/airs-mlops/index.html' },
    { t: 'How the Lab Works', h: 'labs/airs-mlops/how-it-works.html', sub: true },
    { t: 'Modules', h: 'labs/airs-mlops/modules.html', sub: true },
    { t: 'Student Setup', h: 'labs/airs-mlops/student-setup.html', sub: true },
    { label: 'Español' },
    { t: 'AIRS MLOps Lab (ES)', h: 'labs/airs-mlops/es/index.html', sub: true },
    { label: 'Português' },
    { t: 'AIRS MLOps Lab (PT)', h: 'labs/airs-mlops/pt/index.html', sub: true },
  ]},
];

function initGlobalNav() {
  var nav = document.querySelector('.global-nav');
  if (!nav) return;

  document.body.classList.add('has-global-nav');
  var basePath = nav.dataset.basePath || '../..';
  var currentHref = window.location.href.split('?')[0].split('#')[0];

  function resolve(h) {
    return new URL(basePath + '/' + h, window.location.href).href.split('?')[0].split('#')[0];
  }

  var activeGroupId = null;
  GLOBAL_NAV_GROUPS.forEach(function(group) {
    if (group.section) return;
    group.links.forEach(function(link) {
      if (link.label) return;
      if (resolve(link.h) === currentHref) activeGroupId = group.id;
    });
  });

  var html = '<div class="gnav-home"><a href="' + basePath + '/index.html">&#8962; Home</a></div>';

  GLOBAL_NAV_GROUPS.forEach(function(group) {
    if (group.section) {
      html += '<span class="gnav-section">' + group.section + '</span>';
      return;
    }

    // Collapsed unless this group holds the current page, or the reader opened
    // it before. Opening everything by default put 2,377px of rail behind a
    // ~930px viewport, so the groups below the fold were never seen at all.
    var savedState = localStorage.getItem('gnav-' + group.id);
    var isOpen = group.id === activeGroupId
      ? savedState !== 'closed'
      : savedState === 'open';

    var count = group.links.filter(function(link) { return !link.label; }).length;

    html += '<div class="gnav-group' + (isOpen ? ' open' : '') + '" data-gnav-id="' + group.id + '">';
    html += '<button type="button" class="gnav-group-header" aria-expanded="' + isOpen + '">';
    html += '<span class="gnav-chevron" aria-hidden="true">&#9658;</span> ' + group.label;
    html += '<span class="gnav-count">' + count + '</span>';
    html += '</button>';
    html += '<div class="gnav-group-body">';
    group.links.forEach(function(link) {
      if (link.label) {
        html += '<span class="gnav-label">' + link.label + '</span>';
        return;
      }
      var href = basePath + '/' + link.h;
      var isActive = resolve(link.h) === currentHref;
      var cls = (link.sub ? 'gnav-sub' : '') + (isActive ? ' active' : '');
      html += '<a href="' + href + '"' + (cls ? ' class="' + cls.trim() + '"' : '') + '>' + link.t + '</a>';
    });
    html += '</div></div>';
  });

  nav.innerHTML = html;

  // Headers are buttons, so Enter and Space arrive here as clicks and the
  // focus ring comes for free. They used to be divs, which left every group
  // unopenable without a mouse.
  nav.querySelectorAll('.gnav-group-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var group = header.parentElement;
      var isOpen = group.classList.toggle('open');
      header.setAttribute('aria-expanded', String(isOpen));
      localStorage.setItem('gnav-' + group.dataset.gnavId, isOpen ? 'open' : 'closed');
    });
  });

  // Keep the open group in view when it sits below the fold on a short window.
  var active = nav.querySelector('.gnav-group-body a.active');
  if (active && active.offsetTop > nav.clientHeight) {
    nav.scrollTop = active.offsetTop - nav.clientHeight / 2;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  initGlobalNav();
  // After the rail is built, so the drawer moves a populated nav.
  initMobileNav();
});
