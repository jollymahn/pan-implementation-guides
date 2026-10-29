#!/usr/bin/env node
/* build-readiness-model.js — turn the four customer readiness pages into the
 * data a downloadable workbook is written from.
 *
 * The readiness pages are the single source. Hand-maintaining a second copy of
 * roughly 120 checklist items across four pillars would drift the first time
 * anyone edited a page, and the drift would surface as a customer filling in a
 * workbook that no longer matches the document they were sent. So the model is
 * generated from the pages and committed, the same arrangement build-catalog.js
 * uses, and --check fails when the committed copy is stale.
 *
 * What the workbook adds that the page does not: the columns a customer fills
 * in. Those are defined here rather than parsed, because they exist only in the
 * workbook.
 *
 * Usage:
 *   node docs/shared/scripts/build-readiness-model.js            write
 *   node docs/shared/scripts/build-readiness-model.js --check    exit 1 if stale
 *   node docs/shared/scripts/build-readiness-model.js --list     what was parsed
 */
'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const OUT_REL = 'docs/shared/js/airs-readiness-model.js';

/* id -> the page it is parsed from, plus the labels the workbook needs. The
 * guide href is relative to the readiness page, which is also where every
 * consumer of this model sits. */
const PILLARS = [
  { id: 'red-teaming', name: 'AI Red Teaming', file: 'docs/guides/airs-red/airs-red-readiness.html',
    slug: 'ai-red-teaming' },
  { id: 'ai-gateway', name: 'AI Gateway', file: 'docs/guides/ai-gateway/ai-gateway-readiness.html',
    slug: 'ai-gateway' },
  { id: 'api-intercept', name: 'API Intercept', file: 'docs/guides/airs/airs-api-intercept-readiness.html',
    slug: 'api-intercept' },
  { id: 'model-scanning', name: 'AI Model Scanning', file: 'docs/guides/airs-model/airs-model-readiness.html',
    slug: 'ai-model-scanning' }
];

/* ── text extraction ─────────────────────────────────────────────────────── */

const ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  mdash: '—', ndash: '–', rarr: '→', hellip: '…',
  times: '×', middot: '·', rsquo: '’', lsquo: '‘',
  ldquo: '“', rdquo: '”', deg: '°', check: '✓'
};

function decode(html) {
  return String(html)
    // A <br> or a block close is a space, not a joined word.
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|li|div|td|th|tr|h[1-6])>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => (ENTITIES[n] !== undefined ? ENTITIES[n] : m))
    .replace(/\s+/g, ' ')
    .trim();
}

/** Byte range of the section a given h2 id opens, up to the next h2 or the end. */
function sectionOf(html, id) {
  const open = new RegExp(`<h2[^>]*id="${id}"[^>]*>`, 'i').exec(html);
  if (!open) return null;
  const from = open.index + open[0].length;
  const next = /<h2[\s>]/i.exec(html.slice(from));
  return html.slice(from, next ? from + next.index : html.length);
}

/** Every <table> in a chunk, as { head: [...], rows: [[...]] }. */
function tables(chunk) {
  const out = [];
  const re = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let m;
  while ((m = re.exec(chunk))) {
    const body = m[1];
    const head = (body.match(/<th[^>]*>[\s\S]*?<\/th>/gi) || []).map(decode);
    const rows = [];
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let r;
    while ((r = rowRe.exec(body))) {
      const cells = (r[1].match(/<td[^>]*>[\s\S]*?<\/td>/gi) || []).map(decode);
      if (cells.length) rows.push(cells);
    }
    out.push({ head, rows });
  }
  return out;
}

/** Headings and loose list items in section 2, which is not all tables. */
function subsections(chunk) {
  /* Split on h3 so each table or list is attributed to the sub-heading above
   * it. Content before the first h3 belongs to the section itself. */
  const parts = [];
  const re = /<h3[^>]*>([\s\S]*?)<\/h3>/gi;
  let m, last = 0, title = '';
  while ((m = re.exec(chunk))) {
    parts.push({ title, html: chunk.slice(last, m.index) });
    title = decode(m[1]);
    last = m.index + m[0].length;
  }
  parts.push({ title, html: chunk.slice(last) });
  return parts.filter(p => p.html.trim());
}

/* An unordered list in this section is an inventory of things to supply, so
 * each entry is a row. An ordered list is a procedure to carry out, and six
 * rows reading "open DevTools and press F12" are noise in a sheet whose next
 * column asks for the customer's answer. Procedures collapse to one row named
 * after their sub-heading instead, so the item is still tracked. */
function looseItems(html) {
  const out = [];
  const re = /<ul(?![^>]*class="checklist")[^>]*>([\s\S]*?)<\/ul>/gi;
  let m;
  while ((m = re.exec(html))) {
    for (const li of m[1].match(/<li[^>]*>[\s\S]*?<\/li>/gi) || []) {
      const t = decode(li);
      if (t) out.push(t);
    }
  }
  return out;
}

function hasProcedure(html) { return /<ol[^>]*>/i.test(html); }

/** First paragraph of a chunk, used as the detail on a collapsed procedure. */
function firstPara(html) {
  const m = /<p[^>]*>([\s\S]*?)<\/p>/i.exec(html);
  return m ? decode(m[1]) : '';
}

/* ── per-page parse ──────────────────────────────────────────────────────── */

function parsePage(p) {
  const abs = path.join(REPO_ROOT, p.file);
  if (!fs.existsSync(abs)) throw new Error(`${p.file} does not exist`);
  const html = fs.readFileSync(abs, 'utf8');

  const title = decode((/<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html) || [, ''])[1]);
  const subtitle = decode((/<p class="subtitle"[^>]*>([\s\S]*?)<\/p>/i.exec(html) || [, ''])[1]);

  /* 1. People */
  const peopleChunk = sectionOf(html, 'people');
  if (!peopleChunk) throw new Error(`${p.file}: no section with id="people"`);
  const peopleTables = tables(peopleChunk);
  if (!peopleTables.length || !peopleTables[0].rows.length) {
    throw new Error(`${p.file}: the people section has no table rows`);
  }
  const people = peopleTables[0].rows.map(r => ({
    role: r[0] || '', must: r[1] || '', stalls: r[2] || ''
  }));

  /* 2. Readiness items, grouped by sub-heading. Tables carry an item and a
   *    reason; loose lists carry an item only. */
  const haveChunk = sectionOf(html, 'have-ready');
  if (!haveChunk) throw new Error(`${p.file}: no section with id="have-ready"`);
  const items = [];
  for (const sub of subsections(haveChunk)) {
    const group = sub.title || 'General';
    for (const t of tables(sub.html)) {
      for (const r of t.rows) {
        items.push({ group, item: r[0] || '', detail: r.slice(1).filter(Boolean).join('  |  ') });
      }
    }
    const loose = looseItems(sub.html);
    for (const li of loose) items.push({ group, item: li, detail: '' });
    const produced = tables(sub.html).length || loose.length;
    if (!produced && hasProcedure(sub.html) && sub.title) {
      items.push({ group, item: sub.title.replace(/^[\d.]+\s*[—-]\s*/, ''), detail: firstPara(sub.html) });
    }
  }
  if (!items.length) throw new Error(`${p.file}: the have-ready section produced no items`);

  /* 3. Lead time */
  const nowChunk = sectionOf(html, 'start-now');
  if (!nowChunk) throw new Error(`${p.file}: no section with id="start-now"`);
  const leadTables = tables(nowChunk);
  if (!leadTables.length || !leadTables[0].rows.length) {
    throw new Error(`${p.file}: the start-now section has no table rows`);
  }
  const lead = leadTables[0].rows.map(r => ({
    task: r[0] || '', time: r[1] || '', detail: r[2] || ''
  }));

  /* 4. Checklist, grouped by .checklist-section */
  const box = /<div class="checklist-box">([\s\S]*?)<\/div>\s*(?:<div class="callout|<div class="page-footer)/i.exec(html);
  if (!box) throw new Error(`${p.file}: no .checklist-box found`);
  const checklist = [];
  const chunkRe = /<div class="checklist-section">([\s\S]*?)<\/div>\s*<ul class="checklist">([\s\S]*?)<\/ul>/gi;
  let c;
  while ((c = chunkRe.exec(box[1]))) {
    const group = decode(c[1]);
    for (const li of c[2].match(/<li[^>]*>[\s\S]*?<\/li>/gi) || []) {
      const t = decode(li);
      if (t) checklist.push({ group, item: t });
    }
  }
  if (!checklist.length) throw new Error(`${p.file}: the checklist box produced no items`);

  return { id: p.id, name: p.name, slug: p.slug, title, subtitle, people, items, lead, checklist };
}

/* ── emit ────────────────────────────────────────────────────────────────── */

function emit(data) {
  const body = JSON.stringify(data, null, 2)
    .split('\n').map(l => (l ? '  ' + l : l)).join('\n');

  return `/* airs-readiness-model.js — GENERATED. Do not edit by hand.
 *
 * Written by docs/shared/scripts/build-readiness-model.js from the four
 * customer readiness pages, which are the source. Edit a readiness page, then
 * re-run the script; hooks/pre-commit runs it with --check and blocks drift.
 *
 * Consumed by docs/shared/js/readiness-download.js, which turns a pillar into
 * the workbook a customer fills in before the session.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AIRSReadiness = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var READINESS =
${body};

  /* Columns the workbook adds and the page does not have: everywhere a
   * customer writes something back. Headers only, one blank cell per row. */
  function sheetsFor(id) {
    var d = READINESS[id];
    if (!d) return null;

    var intro = [
      ['Field', 'Value'],
      ['Pillar', d.name],
      ['Document', d.title],
      ['Purpose', d.subtitle],
      ['Customer', ''],
      ['Engagement date', ''],
      ['Completed by', ''],
      ['', ''],
      ['How to use this workbook', 'One sheet per section of the readiness document.'],
      ['', 'People: name the person for each role and confirm they are attending.'],
      ['', 'Readiness items: write your answer beside each item.'],
      ['', 'Lead time: these take days. Assign an owner and record the date raised.'],
      ['', 'Checklist: work through it last. Anything unticked is worth raising before the session.'],
      ['', ''],
      ['Source', 'Generated from the published readiness document. If the two disagree, the published page is current.']
    ];

    var people = [['Role', 'What they must be able to do', 'What stalls without them', 'Name', 'Email', 'Attending?']]
      .concat(d.people.map(function (r) { return [r.role, r.must, r.stalls, '', '', '']; }));

    var items = [['Section', 'Have ready', 'Why it is needed', 'Your answer', 'Owner', 'Status']]
      .concat(d.items.map(function (r) { return [r.group, r.item, r.detail, '', '', '']; }));

    var lead = [['Task', 'Typical lead time', 'Detail', 'Owner', 'Date raised', 'Status']]
      .concat(d.lead.map(function (r) { return [r.task, r.time, r.detail, '', '', '']; }));

    var check = [['Group', 'Item', 'Done', 'Owner', 'Notes']]
      .concat(d.checklist.map(function (r) { return [r.group, r.item, '', '', '']; }));

    return [
      { name: 'Start here', cols: [26, 96], rows: intro },
      { name: 'People', cols: [30, 46, 46, 22, 26, 12], rows: people },
      { name: 'Readiness items', cols: [28, 44, 60, 34, 18, 14], rows: items },
      { name: 'Lead time', cols: [34, 18, 62, 18, 14, 14], rows: lead },
      { name: 'Checklist', cols: [26, 70, 8, 18, 34], rows: check }
    ];
  }

  function fileName(id) {
    var d = READINESS[id];
    return d ? 'customer-readiness-' + d.slug + '.xlsx' : 'customer-readiness.xlsx';
  }

  function counts(id) {
    var d = READINESS[id];
    if (!d) return null;
    return { people: d.people.length, items: d.items.length,
             lead: d.lead.length, checklist: d.checklist.length };
  }

  return { READINESS: READINESS, sheetsFor: sheetsFor, fileName: fileName, counts: counts };
}));
`;
}

/* ── main ────────────────────────────────────────────────────────────────── */

function main() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const list = args.includes('--list');

  const data = {};
  for (const p of PILLARS) data[p.id] = parsePage(p);

  const next = emit(data);
  const outAbs = path.join(REPO_ROOT, OUT_REL);
  const prev = fs.existsSync(outAbs) ? fs.readFileSync(outAbs, 'utf8') : null;

  if (list) {
    for (const p of PILLARS) {
      const d = data[p.id];
      console.log(`${d.name}`);
      console.log(`  people ${d.people.length}  items ${d.items.length}` +
                  `  lead ${d.lead.length}  checklist ${d.checklist.length}`);
    }
    return;
  }

  if (check) {
    if (prev === next) {
      const t = PILLARS.reduce((n, p) => n + data[p.id].checklist.length, 0);
      console.log(`Readiness model up to date (4 pillars, ${t} checklist items).`);
      return;
    }
    console.error('Readiness model is stale.');
    console.error(`  A readiness page changed and ${OUT_REL} was not regenerated.`);
    console.error('  Run: node docs/shared/scripts/build-readiness-model.js');
    process.exit(1);
  }

  fs.writeFileSync(outAbs, next);
  const t = PILLARS.reduce((n, p) => n + data[p.id].checklist.length, 0);
  console.log(`Wrote ${OUT_REL} (4 pillars, ${t} checklist items)` +
              (prev === next ? ', unchanged.' : '.'));
}

try {
  main();
} catch (err) {
  console.error(`build-readiness-model: ${err.message}`);
  process.exit(1);
}
