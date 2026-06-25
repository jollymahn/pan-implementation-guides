#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DOCS_ROOT = path.resolve(__dirname, '..', '..');
const OUT_FILE = path.join(DOCS_ROOT, 'shared', 'search-index.json');

const SKIP_DIRS = new Set(['shared', 'templates']);

function findHtmlFiles(dir, base) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      results = results.concat(findHtmlFiles(full, base));
    } else if (entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/&#\d+;/g, ' ');
}

function extractTitle(html) {
  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]).trim();
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (title) return stripTags(title[1]).trim();
  return '';
}

function extractHeadings(html) {
  const headings = [];
  const re = /<h[23][^>]*>([\s\S]*?)<\/h[23]>/gi;
  let m;
  while ((m = re.exec(html))) {
    const text = stripTags(m[1]).trim();
    if (text) headings.push(text);
  }
  return headings.join(' ');
}

function extractBody(html) {
  let body = html;
  // Remove script/style blocks
  body = body.replace(/<script[\s\S]*?<\/script>/gi, '');
  body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Remove header, nav, sidebar
  body = body.replace(/<header[\s\S]*?<\/header>/gi, '');
  body = body.replace(/<nav[\s\S]*?<\/nav>/gi, '');
  // Try to isolate .article content if present
  const articleMatch = body.match(/<(?:div|main|article)[^>]*class="[^"]*article[^"]*"[^>]*>([\s\S]*)/i);
  if (articleMatch) body = articleMatch[1];
  return stripTags(body).replace(/\s+/g, ' ').trim().slice(0, 500);
}

function deriveBreadcrumb(relPath) {
  const parts = relPath.replace(/\.html$/, '').split('/');
  return parts
    .filter(p => p !== 'index')
    .map(p => p.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
    .join(' > ');
}

const files = findHtmlFiles(DOCS_ROOT, DOCS_ROOT);
console.log(`Found ${files.length} HTML files`);

const documents = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(DOCS_ROOT, file);
  const title = extractTitle(html);
  if (!title) continue;

  documents.push({
    id: relPath,
    title,
    headings: extractHeadings(html),
    body: extractBody(html),
    breadcrumb: deriveBreadcrumb(relPath),
  });
}

console.log(`Indexed ${documents.length} documents`);

// Build Lunr index
const lunr = require(path.join(DOCS_ROOT, 'shared', 'js', 'lunr.min.js'));

const idx = lunr(function () {
  this.ref('id');
  this.field('title', { boost: 10 });
  this.field('headings', { boost: 5 });
  this.field('body');

  for (const doc of documents) {
    this.add(doc);
  }
});

const store = {};
for (const doc of documents) {
  store[doc.id] = {
    title: doc.title,
    breadcrumb: doc.breadcrumb,
    body: doc.body.slice(0, 300),
  };
}

const output = { index: idx.toJSON(), store };
fs.writeFileSync(OUT_FILE, JSON.stringify(output));

const sizeMB = (fs.statSync(OUT_FILE).size / 1024 / 1024).toFixed(2);
console.log(`Wrote ${OUT_FILE} (${sizeMB} MB)`);
