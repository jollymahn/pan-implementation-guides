/* ══════════════════════════════════════════════════════════════════
   PAN Implementation Guides — Site Search (Lunr.js)
   Cmd+K / Ctrl+K modal with keyboard navigation

   Prerequisites: lunr.min.js loaded, search-index.json built
   Usage: <script src="../../shared/js/search.js"></script>
   ══════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var searchIndex = null;
  var searchStore = null;
  var modal = null;
  var input = null;
  var results = null;
  var activeIdx = -1;
  var indexLoading = false;
  var basePath = '';

  function resolveBasePath() {
    var scripts = document.querySelectorAll('script[src*="search.js"]');
    if (scripts.length) {
      var src = scripts[scripts.length - 1].getAttribute('src');
      basePath = src.replace(/js\/search\.js$/, '');
    }
  }

  function loadIndex(cb) {
    if (searchIndex) return cb();
    if (indexLoading) return;
    indexLoading = true;
    var url = basePath + 'search-index.json';
    fetch(url)
      .then(function (r) { return r.json(); })
      .then(function (data) {
        searchIndex = lunr.Index.load(data.index);
        searchStore = data.store;
        indexLoading = false;
        cb();
      })
      .catch(function () {
        indexLoading = false;
      });
  }

  function createModal() {
    if (modal) return;

    modal = document.createElement('div');
    modal.className = 'search-modal-overlay';
    modal.innerHTML =
      '<div class="search-modal">' +
        '<div class="search-input-wrap">' +
          '<svg class="search-icon" viewBox="0 0 20 20" width="18" height="18"><path d="M8.5 3a5.5 5.5 0 014.383 8.823l4.147 4.147a.75.75 0 01-1.06 1.06l-4.147-4.147A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z" fill="currentColor"/></svg>' +
          '<input type="text" class="search-input" placeholder="Search guides..." autocomplete="off" spellcheck="false">' +
          '<kbd class="search-kbd">Esc</kbd>' +
        '</div>' +
        '<div class="search-results"></div>' +
        '<div class="search-footer">' +
          '<span><kbd>&uarr;</kbd><kbd>&darr;</kbd> navigate</span>' +
          '<span><kbd>Enter</kbd> open</span>' +
          '<span><kbd>Esc</kbd> close</span>' +
        '</div>' +
      '</div>';

    document.body.appendChild(modal);

    input = modal.querySelector('.search-input');
    results = modal.querySelector('.search-results');

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeSearch();
    });

    input.addEventListener('input', debounce(onSearch, 150));
    input.addEventListener('keydown', onKeydown);
  }

  function debounce(fn, ms) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, ms);
    };
  }

  function openSearch() {
    createModal();
    modal.classList.add('visible');
    input.value = '';
    results.innerHTML = '<div class="search-empty">Start typing to search across all guides</div>';
    activeIdx = -1;
    document.body.style.overflow = 'hidden';

    loadIndex(function () {
      input.focus();
    });
  }

  function closeSearch() {
    if (!modal) return;
    modal.classList.remove('visible');
    document.body.style.overflow = '';
  }

  function onSearch() {
    var query = input.value.trim();
    if (!query || !searchIndex) {
      results.innerHTML = query
        ? '<div class="search-empty">Loading index...</div>'
        : '<div class="search-empty">Start typing to search across all guides</div>';
      activeIdx = -1;
      return;
    }

    var hits;
    try {
      hits = searchIndex.search(query + '*');
      if (!hits.length) hits = searchIndex.search(query + '~1');
    } catch (e) {
      hits = [];
    }

    if (!hits.length) {
      results.innerHTML = '<div class="search-empty">No results for &ldquo;' + escapeHtml(query) + '&rdquo;</div>';
      activeIdx = -1;
      return;
    }

    var top = hits.slice(0, 20);
    var html = '';
    for (var i = 0; i < top.length; i++) {
      var hit = top[i];
      var doc = searchStore[hit.ref];
      if (!doc) continue;
      var snippet = makeSnippet(doc.body, query);
      html +=
        '<a class="search-result" href="' + resolveHref(hit.ref) + '" data-idx="' + i + '">' +
          '<div class="search-result-title">' + escapeHtml(doc.title) + '</div>' +
          '<div class="search-result-breadcrumb">' + escapeHtml(doc.breadcrumb) + '</div>' +
          (snippet ? '<div class="search-result-snippet">' + snippet + '</div>' : '') +
        '</a>';
    }

    results.innerHTML = html;
    activeIdx = -1;
  }

  function resolveHref(ref) {
    // basePath points to shared/ relative to the current page.
    // Docs root is one level up from shared/.
    return basePath + '../' + ref;
  }

  function makeSnippet(body, query) {
    if (!body) return '';
    var lower = body.toLowerCase();
    var terms = query.toLowerCase().split(/\s+/);
    var best = -1;
    for (var i = 0; i < terms.length; i++) {
      var pos = lower.indexOf(terms[i]);
      if (pos !== -1 && (best === -1 || pos < best)) best = pos;
    }
    if (best === -1) return '';
    var start = Math.max(0, best - 60);
    var end = Math.min(body.length, best + 140);
    var raw = (start > 0 ? '...' : '') + body.slice(start, end) + (end < body.length ? '...' : '');
    var text = escapeHtml(raw);
    for (var j = 0; j < terms.length; j++) {
      if (!terms[j]) continue;
      var re = new RegExp('(' + escapeRegex(escapeHtml(terms[j])) + ')', 'gi');
      text = text.replace(re, '<mark>$1</mark>');
    }
    return text;
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function onKeydown(e) {
    var items = results.querySelectorAll('.search-result');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      updateActive(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, -1);
      updateActive(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && items[activeIdx]) {
        items[activeIdx].click();
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  }

  function updateActive(items) {
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('active', i === activeIdx);
    }
    if (activeIdx >= 0 && items[activeIdx]) {
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    }
  }

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  document.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (modal && modal.classList.contains('visible')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
  });

  // Expose for the header search button
  window.openSearch = openSearch;

  resolveBasePath();
})();
