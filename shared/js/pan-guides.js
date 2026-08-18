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

// ── Close mobile sidebar on link click ─────────────────────────────
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const backdrop = document.querySelector('.sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('visible');
  });
});

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

// ── Mobile sidebar backdrop ────────────────────────────────────────
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.querySelector('.sidebar-backdrop');
  if (!sidebar) return;

  sidebar.classList.toggle('open');
  if (backdrop) {
    backdrop.classList.toggle('visible', sidebar.classList.contains('open'));
  }
}

// Close sidebar when backdrop is clicked
document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.querySelector('.sidebar-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.remove('open');
      backdrop.classList.remove('visible');
    });
  }
});

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
const GLOBAL_NAV_GROUPS = [
  { id: 'vm-cloud', label: 'VM-Series Cloud', links: [
    { t: 'AWS', h: 'guides/aws/index.html' },
    { t: 'VM-Series Deploy', h: 'guides/aws/vm-series-deployment.html', sub: true },
    { t: 'Panorama Deploy', h: 'guides/aws/panorama-deployment.html', sub: true },
    { t: 'AWS Plugin Monitor', h: 'guides/aws/aws-plugin-monitoring.html', sub: true },
    { t: 'Azure', h: 'guides/azure/index.html' },
    { t: 'VM-Series Deploy', h: 'guides/azure/vm-series-deployment.html', sub: true },
    { t: 'Panorama Deploy', h: 'guides/azure/panorama-deployment.html', sub: true },
    { t: 'GCP', h: 'guides/gcp/index.html' },
    { t: 'VM-Series Deploy', h: 'guides/gcp/vm-series-deployment.html', sub: true },
    { t: 'Panorama Deploy', h: 'guides/gcp/panorama-deployment.html', sub: true },
    { t: 'OCI', h: 'guides/oci/index.html' },
    { t: 'VM-Series Deploy', h: 'guides/oci/vm-series-deployment.html', sub: true },
    { t: 'Panorama Deploy', h: 'guides/oci/panorama-deployment.html', sub: true },
  ]},
  { id: 'cngfw', label: 'Cloud NGFW', links: [
    { t: 'Overview & Deploy', h: 'guides/cngfw/cloud-ngfw-deployment.html' },
    { t: 'AWS', h: 'guides/cngfw/cloud-ngfw-aws.html', sub: true },
    { t: 'Azure Native', h: 'guides/cngfw/cloud-ngfw-azure-native.html', sub: true },
    { t: 'Azure', h: 'guides/cngfw/cloud-ngfw-azure.html', sub: true },
  ]},
  { id: 'airs', label: 'AI Runtime Security', links: [
    { t: 'Overview', h: 'guides/airs/index.html' },
    { t: 'Network Intercept', h: 'guides/airs/airs-network-intercept.html', sub: true },
    { t: 'Cloud Deploy', h: 'guides/airs/airs-cloud-deployment.html', sub: true },
    { t: 'API Intercept', h: 'guides/airs/airs-api-intercept.html', sub: true },
    { t: 'Kubernetes', h: 'guides/airs/airs-k8s-protection.html', sub: true },
    { t: 'Microperimeter', h: 'guides/airs/airs-microperimeter.html', sub: true },
    { t: 'Model Security', h: 'guides/airs-model/airs-model-security.html', sub: true },
    { t: 'Red Teaming', h: 'guides/airs-red/airs-red-teaming.html', sub: true },
  ]},
  { id: 'ai-integrations', label: 'AI Integrations', links: [
    { t: 'Overview', h: 'guides/airs-integrations/index.html' },
    { t: 'Claude Code', h: 'guides/airs-integrations/claude-code.html', sub: true },
    { t: 'Codex CLI', h: 'guides/airs-integrations/codex-cli.html', sub: true },
    { t: 'GitHub Actions', h: 'guides/airs-integrations/github-actions.html', sub: true },
    { t: 'IDE Assistants', h: 'guides/airs-integrations/ide-assistants.html', sub: true },
    { t: 'Jenkins', h: 'guides/airs-integrations/jenkins.html', sub: true },
    { t: 'Kong', h: 'guides/airs-integrations/kong.html', sub: true },
    { t: 'LiteLLM', h: 'guides/airs-integrations/litellm.html', sub: true },
    { t: 'n8n', h: 'guides/airs-integrations/n8n.html', sub: true },
    { t: 'TrueFoundry', h: 'guides/airs-integrations/truefoundry.html', sub: true },
    { t: 'Apigee', h: 'guides/airs-integrations/apigee.html', sub: true },
    { t: 'Azure APIM', h: 'guides/airs-integrations/azure-apim.html', sub: true },
  ]},
  { id: 'ai-gateway', label: 'AI Gateway', links: [
    { t: 'Overview', h: 'guides/ai-gateway/index.html' },
    { t: 'Deployment Guide', h: 'guides/ai-gateway/ai-gateway-deployment.html', sub: true },
  ]},
  { id: 'globalprotect', label: 'GlobalProtect', links: [
    { t: 'Overview', h: 'globalprotect/index.html' },
    { t: 'Linear Deploy Guide', h: 'globalprotect/linear-guide.html', sub: true },
  ]},
  { id: 'scm', label: 'SCM Onboarding', links: [
    { t: 'Firewall Onboarding', h: 'scm-onboarding/index.html' },
    { t: 'Okta SSO', h: 'scm-onboarding/okta-sso.html', sub: true },
  ]},
  { id: 'branch', label: 'Branch NGFW', links: [
    { t: 'ZTP + HA + SD-WAN', h: 'guides/branch/branch-ngfw-ztp-ha-sdwan.html' },
  ]},
  { id: 'bootstrap', label: 'Bootstrap', links: [
    { t: 'VM-Series Bootstrap', h: 'guides/bootstrap/vm-series-bootstrap.html' },
  ]},
  { id: 'cie', label: 'Cloud Identity Engine', links: [
    { t: 'CIE Implementation', h: 'guides/cloud-identity-engine/cie-implementation.html' },
    { t: 'Cloud Tags', h: 'guides/cloud-identity-engine/cie-cloud-tags.html', sub: true },
  ]},
  { id: 'panorama-cli', label: 'Panorama CLI', links: [
    { t: 'CLI Reference', h: 'guides/panorama-cli/firewall-cli-reference.html' },
    { t: 'FW Configuration', h: 'guides/panorama-cli/firewall-cli-configuration.html', sub: true },
    { t: 'FW Operational', h: 'guides/panorama-cli/firewall-cli-operational.html', sub: true },
    { t: 'Config: Set', h: 'guides/panorama-cli/firewall-cli-config-set.html', sub: true },
    { t: 'Config: Delete', h: 'guides/panorama-cli/firewall-cli-config-delete.html', sub: true },
    { t: 'Config: Copy', h: 'guides/panorama-cli/firewall-cli-config-copy.html', sub: true },
    { t: 'Config: Rename', h: 'guides/panorama-cli/firewall-cli-config-rename.html', sub: true },
    { t: 'Config: Other', h: 'guides/panorama-cli/firewall-cli-config-other.html', sub: true },
    { t: 'Panorama Config', h: 'guides/panorama-cli/panorama-cli-configuration.html', sub: true },
    { t: 'Panorama Ops', h: 'guides/panorama-cli/panorama-cli-operational.html', sub: true },
  ]},
];

function initGlobalNav() {
  var nav = document.querySelector('.global-nav');
  if (!nav) return;

  document.body.classList.add('has-global-nav');
  var basePath = nav.dataset.basePath || '../..';
  var currentHref = window.location.href.split('?')[0].split('#')[0];

  var activeGroupId = null;
  GLOBAL_NAV_GROUPS.forEach(function(group) {
    group.links.forEach(function(link) {
      var resolved = new URL(basePath + '/' + link.h, window.location.href).href.split('?')[0].split('#')[0];
      if (resolved === currentHref) activeGroupId = group.id;
    });
  });

  var html = '<div class="gnav-home"><a href="' + basePath + '/index.html">&#8962; Home</a></div>';

  GLOBAL_NAV_GROUPS.forEach(function(group) {
    var savedState = localStorage.getItem('gnav-' + group.id);
    var isOpen = (group.id === activeGroupId) || (savedState === 'open') || (savedState === null);
    html += '<div class="gnav-group' + (isOpen ? ' open' : '') + '" data-gnav-id="' + group.id + '">';
    html += '<div class="gnav-group-header">';
    html += '<span class="gnav-chevron">&#9658;</span> ' + group.label;
    html += '</div>';
    html += '<div class="gnav-group-body">';
    group.links.forEach(function(link) {
      var href = basePath + '/' + link.h;
      var resolved = new URL(href, window.location.href).href.split('?')[0].split('#')[0];
      var isActive = resolved === currentHref;
      var cls = (link.sub ? 'gnav-sub' : '') + (isActive ? ' active' : '');
      html += '<a href="' + href + '"' + (cls ? ' class="' + cls.trim() + '"' : '') + '>' + link.t + '</a>';
    });
    html += '</div></div>';
  });

  nav.innerHTML = html;

  nav.querySelectorAll('.gnav-group-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var group = header.parentElement;
      var id = group.dataset.gnavId;
      var isOpen = group.classList.toggle('open');
      localStorage.setItem('gnav-' + id, isOpen ? 'open' : 'closed');
    });
  });
}

document.addEventListener('DOMContentLoaded', initGlobalNav);
