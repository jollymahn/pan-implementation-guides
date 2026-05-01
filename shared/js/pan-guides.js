/* ══════════════════════════════════════════════════════════════════
   PAN Implementation Guides — Evolved JavaScript
   Copy buttons, scroll spy, back-to-top, mobile sidebar, mgmt tabs,
   download-as-markdown

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
      const matchingTab = tabs.find(t => t.dataset.plane === saved);
      if (matchingTab) {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        matchingTab.classList.add('active');
        const panel = panels.find(p => p.dataset.plane === saved);
        if (panel) panel.classList.add('active');
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
            p.classList.toggle('active', p.dataset.plane === plane);
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
