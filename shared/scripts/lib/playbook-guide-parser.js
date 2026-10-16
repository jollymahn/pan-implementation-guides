#!/usr/bin/env node
/* playbook-guide-parser.js — turn a guide's HTML into the structure a playbook
 * is checked against, and scaffolded from.
 *
 * Extracted from check-playbooks.js so that the checker and the scaffolder read
 * a guide the same way. They must: the scaffolder emits step headings that the
 * checker then matches byte for byte, so two implementations of this parsing
 * would disagree the first time either was touched, and the failure would land
 * on whoever next ran the scaffold rather than on whoever changed the parser.
 *
 * Exports:
 *   decode(html)      markup and entities reduced to the plain text a heading
 *                     carries, with chevrons and whitespace normalized away
 *   panelRanges(body) byte ranges of each tab panel, so a step repeated once
 *                     per platform can be attributed to the right one
 *   loadGuide(rel)    { sections: Map<anchorId, {heads, text}>, ids: Set }
 *                     keyed by the h2 ids a guide uses to mark a phase
 *   clearCache()      drop memoized guides, for a long-running caller
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../../..');

// ── Guide parsing ────────────────────────────────────────────────────────────

const guideCache = new Map();

function decode(s) {
  return s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/[▶▼►▾]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Which tab panel, if any, a position in the markup sits inside. Guides that
 * branch by platform repeat their step numbering once per panel, so "1.1 —
 * Set your environment variables" exists three times in one section and only
 * one of them belongs to the playbook being checked. Depth tracking over the
 * div tokens is what tells them apart. */
function panelRanges(body) {
  const ranges = [];
  const stack = [];
  const re = /<div\b([^>]*)>|<\/div>/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    if (m[0].charAt(1) === '/') {
      const top = stack.pop();
      if (top && top.plane) ranges.push({ plane: top.plane, start: top.start, end: m.index });
    } else {
      const attrs = m[1] || '';
      const pm = /data-plane="([^"]+)"/.exec(attrs);
      stack.push({ plane: /mgmt-panel/.test(attrs) && pm ? pm[1] : null, start: m.index });
    }
  }
  return ranges;
}

/* A guide parsed into ordered h2 sections, each holding every collapsible
 * header inside it with the tab panel it belongs to. Sections are cut at the
 * next h2 that carries an id, which is how the guides mark a phase boundary. */
function loadGuide(rel) {
  if (guideCache.has(rel)) return guideCache.get(rel);
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    guideCache.set(rel, null);
    return null;
  }
  const html = fs.readFileSync(abs, 'utf8');

  const marks = [];
  const h2 = /<h2[^>]*?\sid="([^"]+)"[^>]*>/g;
  let m;
  while ((m = h2.exec(html)) !== null) marks.push({ id: m[1], start: m.index });

  const sections = new Map();
  marks.forEach((mk, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].start : html.length;
    const body = html.slice(mk.start, end);
    const ranges = panelRanges(body);
    const heads = [];
    const hdr = /<div class="collapsible-header"[^>]*>([\s\S]*?)<\/div>\s*<div class="collapsible-body"/g;
    let h;
    while ((h = hdr.exec(body)) !== null) {
      const t = decode(h[1]);
      if (!t) continue;
      const r = ranges.find(x => h.index > x.start && h.index < x.end);
      heads.push({ text: t, plane: r ? r.plane : null });
    }
    sections.set(mk.id, { heads, text: decode(body) });
  });

  const g = { sections, ids: new Set(marks.map(x => x.id)) };
  guideCache.set(rel, g);
  return g;
}

function clearCache() { guideCache.clear(); }

module.exports = { decode, panelRanges, loadGuide, clearCache, ROOT };
