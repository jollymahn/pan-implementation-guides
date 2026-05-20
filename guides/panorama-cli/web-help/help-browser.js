/* Panorama Web Help browser — topic tree + iframe viewer.
   Operates on local, trusted HTML files only. */

var collapsed = new Set();

function renderTree(filter) {
  filter = filter || '';
  var container = document.getElementById('tree');
  container.textContent = '';
  var lowerFilter = filter.toLowerCase();
  var visibleCount = 0;

  var matchSet = new Set();
  if (lowerFilter) {
    TREE_DATA.forEach(function(item, i) {
      if (item.text.toLowerCase().indexOf(lowerFilter) !== -1) {
        matchSet.add(i);
        for (var j = i - 1; j >= 0; j--) {
          if (TREE_DATA[j].depth < item.depth) {
            matchSet.add(j);
            if (TREE_DATA[j].depth === 0) break;
          }
        }
      }
    });
  }

  TREE_DATA.forEach(function(item, i) {
    var parentCollapsed = false;
    for (var j = i - 1; j >= 0; j--) {
      if (TREE_DATA[j].depth < item.depth && collapsed.has(j)) {
        parentCollapsed = true;
        break;
      }
    }

    var isVisible = (!lowerFilter || matchSet.has(i)) && !parentCollapsed;
    if (isVisible) visibleCount++;

    var div = document.createElement('div');
    div.className = 'tree-item' + (item.depth === 0 ? ' section' : '') + (isVisible ? '' : ' hidden');
    div.style.paddingLeft = (8 + item.depth * 14) + 'px';
    div.setAttribute('data-index', i);

    if (item.hasChildren) {
      var toggle = document.createElement('span');
      toggle.className = 'tree-toggle' + (collapsed.has(i) ? '' : ' expanded');
      toggle.textContent = '▶';
      (function(idx) {
        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          if (collapsed.has(idx)) collapsed.delete(idx);
          else collapsed.add(idx);
          renderTree(filter);
        });
      })(i);
      div.appendChild(toggle);
    } else {
      var spacer = document.createElement('span');
      spacer.style.width = '17px';
      spacer.style.display = 'inline-block';
      spacer.style.flexShrink = '0';
      div.appendChild(spacer);
    }

    var text = document.createElement('span');
    text.className = 'tree-text';
    if (lowerFilter && item.text.toLowerCase().indexOf(lowerFilter) !== -1) {
      var idx = item.text.toLowerCase().indexOf(lowerFilter);
      text.appendChild(document.createTextNode(item.text.slice(0, idx)));
      var mark = document.createElement('span');
      mark.className = 'highlight';
      mark.textContent = item.text.slice(idx, idx + lowerFilter.length);
      text.appendChild(mark);
      text.appendChild(document.createTextNode(item.text.slice(idx + lowerFilter.length)));
    } else {
      text.textContent = item.text;
    }
    div.appendChild(text);

    if (item.href) {
      (function(href, idx) {
        div.addEventListener('click', function() {
          document.getElementById('viewer').src = href;
          document.querySelectorAll('.tree-item.active').forEach(function(el) {
            el.classList.remove('active');
          });
          div.classList.add('active');
        });
      })(item.href, i);
    }

    container.appendChild(div);
  });

  document.getElementById('search-count').textContent =
    lowerFilter ? visibleCount + ' of 624 topics' : '624 topics';
}

document.getElementById('search').addEventListener('input', function(e) {
  var val = e.target.value.trim();
  if (val) collapsed.clear();
  renderTree(val);
});

document.addEventListener('keydown', function(e) {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    document.getElementById('search').focus();
  }
});

renderTree();
