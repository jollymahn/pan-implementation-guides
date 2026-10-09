#!/usr/bin/env node
/* check-engagement-model.js — validate docs/shared/js/airs-engagement-model.js.
 *
 * The POV generator cites a guide section for every validation test. Those
 * citations are built at runtime in JavaScript, so check-links.js never sees
 * them and a guide rename would silently produce a document full of dead
 * references. This checks them against the files on disk.
 *
 * Three things must hold (POV-SPEC §10):
 *   1. Every success criterion has at least one validation test, and every
 *      test is complete.
 *   2. Every cited guide exists and defines the cited anchor.
 *   3. Every cited step heading appears in the cited guide.
 *
 * Usage: node docs/shared/scripts/check-engagement-model.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const DOCS = path.resolve(__dirname, '..', '..');
const M = require(path.join(DOCS, 'shared', 'js', 'airs-engagement-model.js'));

const problems = [];
const cache = new Map();

function guideSource(rel) {
  if (!cache.has(rel)) {
    const p = path.join(DOCS, rel);
    cache.set(rel, fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);
  }
  return cache.get(rel);
}

// Strip tags and collapse whitespace, so a step heading split across markup
// still matches the string in the model.
function plain(html) {
  return html.replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ');
}

// 1. Register integrity.
M.checkRegisterIntegrity().forEach(p => problems.push(`model: ${p}`));

// 2 and 3. Citations resolve.
let citations = 0;
Object.entries(M.COMPONENTS).forEach(([id, c]) => {
  const src = guideSource(c.guide);
  if (src === null) {
    problems.push(`${id}: guide not found: ${c.guide}`);
    return;
  }
  if (!new RegExp(`\\bid=["']${c.anchor}["']`).test(src)) {
    problems.push(`${id}: ${c.guide} does not define #${c.anchor}`);
  }
  const text = plain(src);
  (c.criteria || []).forEach(crit => {
    (crit.tests || []).forEach(t => {
      citations += 1;
      // The step label as the guide writes it, allowing for the en dash,
      // em dash or colon the guides use between number and title.
      const esc = t.step.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      if (!new RegExp(esc.replace(/\s+/g, '\\s+'), 'i').test(text)) {
        problems.push(`${id}: ${c.guide} has no step matching "${t.step}"`);
      }
    });
  });
});

// Report.
const n = Object.keys(M.COMPONENTS).length;
if (problems.length) {
  console.error(`check-engagement-model: ${problems.length} problem(s)\n`);
  problems.forEach(p => console.error('  ' + p));
  console.error('');
  process.exit(1);
}

const gaps = Object.entries(M.COMPONENTS).filter(([, c]) => c.gap).map(([i]) => i);
console.log(`check-engagement-model: ${n} components, ${citations} guide citations, all resolve`);
if (gaps.length) {
  console.log(`  ${gaps.length} component(s) cite the nearest section because the guides ` +
    `carry no procedure of their own: ${gaps.join(', ')}`);
}
