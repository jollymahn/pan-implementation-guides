/* Panorama Web Help Browser
   Renders only local, trusted markdown files from the Panorama web help scrape.
   No user-supplied or external content is processed. */

var treeData = [];
var collapsed = new Set();

async function init() {
  var resp = await fetch('tree-data.json');
  treeData = await resp.json();
  renderTree();
}

function renderTree(filter) {
  filter = filter || '';
  var container = document.getElementById('tree');
  container.textContent = '';
  var lowerFilter = filter.toLowerCase();
  var visibleCount = 0;

  var matchSet = new Set();
  if (lowerFilter) {
    treeData.forEach(function(item, i) {
      if (item.text.toLowerCase().indexOf(lowerFilter) !== -1) {
        matchSet.add(i);
        for (var j = i - 1; j >= 0; j--) {
          if (treeData[j].depth < item.depth) {
            matchSet.add(j);
            if (treeData[j].depth === 0) break;
          }
        }
      }
    });
  }

  treeData.forEach(function(item, i) {
    var parentCollapsed = false;
    for (var j = i - 1; j >= 0; j--) {
      if (treeData[j].depth < item.depth && collapsed.has(j)) {
        parentCollapsed = true;
        break;
      }
    }

    var isVisible = (!lowerFilter || matchSet.has(i)) && !parentCollapsed;
    if (isVisible) visibleCount++;

    var div = document.createElement('div');
    div.className = 'tree-item' + (item.depth === 0 ? ' section' : '') + (isVisible ? '' : ' hidden');
    div.style.paddingLeft = (16 + item.depth * 16) + 'px';
    div.setAttribute('data-index', i);

    if (item.hasChildren) {
      var toggle = document.createElement('span');
      toggle.className = 'tree-toggle' + (collapsed.has(i) ? '' : ' expanded');
      toggle.textContent = '▶';
      (function(idx) {
        toggle.addEventListener('click', function(e) {
          e.stopPropagation();
          if (collapsed.has(idx)) {
            collapsed.delete(idx);
          } else {
            collapsed.add(idx);
          }
          renderTree(filter);
        });
      })(i);
      div.appendChild(toggle);
    } else {
      var spacer = document.createElement('span');
      spacer.style.width = '20px';
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

    if (item.path) {
      (function(idx) {
        div.addEventListener('click', function() { loadTopic(idx); });
      })(i);
    }

    container.appendChild(div);
  });

  document.getElementById('search-count').textContent =
    lowerFilter ? visibleCount + ' of 624 topics' : '624 topics';
}

async function loadTopic(index) {
  var item = treeData[index];
  if (!item.path) return;

  document.querySelectorAll('.tree-item.active').forEach(function(el) {
    el.classList.remove('active');
  });
  var el = document.querySelector('.tree-item[data-index="' + index + '"]');
  if (el) el.classList.add('active');

  var crumbs = [item.text];
  var d = item.depth;
  for (var j = index - 1; j >= 0 && d > 0; j--) {
    if (treeData[j].depth < d) {
      crumbs.unshift(treeData[j].text);
      d = treeData[j].depth;
    }
  }
  document.getElementById('breadcrumb').textContent = crumbs.join(' > ');
  document.getElementById('file-path').textContent = item.path;

  var content = document.getElementById('content');
  content.className = 'content-body';
  content.textContent = 'Loading...';

  try {
    var resp = await fetch(item.path);
    var md = await resp.text();
    content.textContent = '';
    var wrapper = document.createElement('div');
    wrapper.className = 'md-content';
    renderMarkdownToDOM(md, wrapper);
    content.appendChild(wrapper);
  } catch (e) {
    content.textContent = 'Failed to load: ' + item.path;
  }
}

function renderMarkdownToDOM(md, container) {
  var lines = md.split('\n');
  var i = 0;

  while (i < lines.length) {
    var line = lines[i];

    if (line.trim() === '') { i++; continue; }

    // Table
    if (i + 1 < lines.length && line.charAt(0) === '|' && /^\|[\s\-:|]+\|$/.test(lines[i + 1])) {
      var table = document.createElement('table');
      var thead = document.createElement('thead');
      var headerRow = document.createElement('tr');
      parsePipeCells(line).forEach(function(cell) {
        var th = document.createElement('th');
        appendInlineFormatted(cell.trim(), th);
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);
      i += 2;

      var tbody = document.createElement('tbody');
      while (i < lines.length && lines[i].charAt(0) === '|') {
        var tr = document.createElement('tr');
        parsePipeCells(lines[i]).forEach(function(cell) {
          var td = document.createElement('td');
          appendInlineFormatted(cell.trim(), td);
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
        i++;
      }
      table.appendChild(tbody);
      container.appendChild(table);
      continue;
    }

    // Code block
    if (line.indexOf('```') === 0) {
      var pre = document.createElement('pre');
      var code = document.createElement('code');
      i++;
      var codeLines = [];
      while (i < lines.length && lines[i].indexOf('```') !== 0) {
        codeLines.push(lines[i]);
        i++;
      }
      code.textContent = codeLines.join('\n');
      pre.appendChild(code);
      container.appendChild(pre);
      i++;
      continue;
    }

    // Headings
    var headingMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      var level = headingMatch[1].length;
      var h = document.createElement('h' + level);
      appendInlineFormatted(headingMatch[2], h);
      container.appendChild(h);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      container.appendChild(document.createElement('hr'));
      i++;
      continue;
    }

    // Blockquote
    if (line.indexOf('> ') === 0) {
      var bq = document.createElement('blockquote');
      var bqLines = [];
      while (i < lines.length && lines[i].indexOf('> ') === 0) {
        bqLines.push(lines[i].slice(2));
        i++;
      }
      var bqP = document.createElement('p');
      appendInlineFormatted(bqLines.join(' '), bqP);
      bq.appendChild(bqP);
      container.appendChild(bq);
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s/.test(line)) {
      var ul = document.createElement('ul');
      while (i < lines.length && /^\s*[-*]\s/.test(lines[i])) {
        var li = document.createElement('li');
        appendInlineFormatted(lines[i].replace(/^\s*[-*]\s+/, ''), li);
        ul.appendChild(li);
        i++;
      }
      container.appendChild(ul);
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s/.test(line)) {
      var ol = document.createElement('ol');
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
        var oli = document.createElement('li');
        appendInlineFormatted(lines[i].replace(/^\s*\d+\.\s+/, ''), oli);
        ol.appendChild(oli);
        i++;
      }
      container.appendChild(ol);
      continue;
    }

    // Paragraph
    var p = document.createElement('p');
    var paraLines = [];
    while (i < lines.length && lines[i].trim() !== '' &&
           lines[i].charAt(0) !== '#' && lines[i].indexOf('```') !== 0 &&
           lines[i].charAt(0) !== '|' && lines[i].indexOf('> ') !== 0 &&
           !/^\s*[-*]\s/.test(lines[i]) && !/^\s*\d+\.\s/.test(lines[i]) &&
           !/^---+$/.test(lines[i].trim())) {
      paraLines.push(lines[i]);
      i++;
    }
    appendInlineFormatted(paraLines.join(' '), p);
    container.appendChild(p);
  }
}

function parsePipeCells(line) {
  return line.split('|').slice(1, -1);
}

function appendInlineFormatted(text, parent) {
  var pattern = /(\*\*(.+?)\*\*|\*(.+?)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  var lastIndex = 0;
  var match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parent.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    if (match[2] !== undefined) {
      var strong = document.createElement('strong');
      strong.textContent = match[2];
      parent.appendChild(strong);
    } else if (match[3] !== undefined) {
      var em = document.createElement('em');
      em.textContent = match[3];
      parent.appendChild(em);
    } else if (match[4] !== undefined) {
      var inlineCode = document.createElement('code');
      inlineCode.textContent = match[4];
      parent.appendChild(inlineCode);
    } else if (match[5] !== undefined) {
      var a = document.createElement('a');
      a.textContent = match[5];
      a.href = match[6];
      a.target = '_blank';
      a.rel = 'noopener';
      parent.appendChild(a);
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parent.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
}

document.getElementById('search').addEventListener('input', function(e) {
  var val = e.target.value.trim();
  if (val) { collapsed.clear(); }
  renderTree(val);
});

document.addEventListener('keydown', function(e) {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    document.getElementById('search').focus();
  }
});

init();
