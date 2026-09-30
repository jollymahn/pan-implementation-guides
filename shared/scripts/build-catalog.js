#!/usr/bin/env node
//
// build-catalog.js — render the landing page catalog from docs/shared/js/catalog.js.
//
// The landing page carried 23 hand-written cards and the hub pages 34 more,
// with nothing holding them to each other or to the left rail. The result was
// a card advertising a finished guide as a skeleton, two "Coming Soon" links
// pointing at `#`, six published guides with no card and no nav entry, and the
// same gold accent written two different ways.
//
// So the cards are generated, and the generated HTML is committed: the
// published page stays a complete static file for search indexing, printing,
// and reading with JavaScript off.
//
// Usage:
//   node docs/shared/scripts/build-catalog.js            write changes
//   node docs/shared/scripts/build-catalog.js --check    exit 1 if stale
//   node docs/shared/scripts/build-catalog.js --list     coverage report
//
// Marker syntax in docs/index.html, one per section:
//
//   <!-- catalog:begin section="Network Security" -->
//   ...generated, do not hand-edit...
//   <!-- catalog:end -->
//
// Beyond rendering, --check and the default write both assert coverage: every
// link in GLOBAL_NAV_GROUPS must appear in catalog.js or in CATALOG_NOT_CARDED,
// every catalog link must resolve to a file on disk, and no link may point at
// `#`. Adding a guide to the rail therefore fails the build until it is added
// to the catalog too, which is the whole point.

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const DOCS_ROOT = path.resolve(__dirname, '..', '..');
const REPO_ROOT = path.resolve(DOCS_ROOT, '..');
const LANDING = path.join(DOCS_ROOT, 'index.html');

// Two marker forms. `section="X"` fills one landing page section with
// per-family cards; bare `hub` fills a hub page with per-guide cards.
const BEGIN_RE = /^([ \t]*)<!--\s*catalog:begin(?:\s+section="([^"]+)")?\s*(?:(hub)(?:\s+group="([^"]+)")?)?\s*-->[ \t]*$/;
const END_RE = /^[ \t]*<!--\s*catalog:end\s*-->[ \t]*$/;

// ── Inputs ──────────────────────────────────────────────────────────────

const { CATALOG, CATALOG_SECTIONS, CATALOG_NOT_CARDED, HUBS } =
  require(path.join(DOCS_ROOT, 'shared', 'js', 'catalog.js'));

/**
 * GLOBAL_NAV_GROUPS is a literal inside browser JS with no module wrapper, so
 * slice it out by bracket matching and evaluate it in a sandbox. Parsing the
 * real file rather than keeping a second copy is what makes the coverage
 * check meaningful.
 */
function readNavGroups() {
  const src = fs.readFileSync(path.join(DOCS_ROOT, 'shared', 'js', 'pan-guides.js'), 'utf8');
  const at = src.indexOf('GLOBAL_NAV_GROUPS');
  if (at === -1) throw new Error('GLOBAL_NAV_GROUPS not found in pan-guides.js');
  const open = src.indexOf('[', at);
  let depth = 0, close = -1;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']' && --depth === 0) { close = i; break; }
  }
  if (close === -1) throw new Error('GLOBAL_NAV_GROUPS literal is unterminated');
  const ctx = { out: null };
  vm.createContext(ctx);
  vm.runInContext('this.out = ' + src.slice(open, close + 1), ctx);
  return ctx.out;
}

function navTargets() {
  const out = [];
  let section = '';
  for (const group of readNavGroups()) {
    if (group.section) { section = group.section; continue; }
    for (const link of group.links) {
      if (!link.h) continue;          // a bare `label` entry divides a run
      out.push({ section, group: group.label, label: link.t, href: link.h });
    }
  }
  return out;
}

// ── Rendering ───────────────────────────────────────────────────────────

function esc(s) {
  // Entities in catalog.js (&ntilde;, &middot;) are intentional, so escape a
  // bare & only when it does not already open one.
  return String(s)
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderCard(card, indent) {
  const i = indent;
  const guides = card.links.filter(l => !l.hub);
  const hubs = card.links.filter(l => l.hub);
  const out = [];

  out.push(`${i}<div class="catalog-card${card.soon ? ' coming-soon' : ''}" data-catalog-id="${card.id}">`);
  out.push(`${i}  <div class="catalog-card-header ${card.accent}">`);
  out.push(`${i}    <span class="catalog-badge">${esc(card.badge)}</span>`);
  out.push(`${i}    <h3>${esc(card.title)}</h3>`);
  out.push(`${i}  </div>`);
  out.push(`${i}  <div class="catalog-card-body catalog-card-body-list">`);
  out.push(`${i}    <p>${esc(card.blurb)}</p>`);

  // No tag row here. A tag row on a card fronting nine guides can only name
  // the section, which the section heading above it already does, and it costs
  // a line of height on every card in the grid.

  if (card.soon) {
    out.push(`${i}    <p class="catalog-soon">Not published yet.</p>`);
  } else if (guides.length) {
    out.push(`${i}    <ul class="catalog-guide-list">`);
    for (const l of guides) {
      const note = l.note ? `<span class="catalog-guide-note">${esc(l.note)}</span>` : '';
      out.push(`${i}      <li><a href="${l.h}">${esc(l.t)}</a>${note}</li>`);
    }
    out.push(`${i}    </ul>`);
  }

  for (const h of hubs) {
    out.push(`${i}    <a class="catalog-hub-link" href="${h.h}">${esc(h.t)} &rarr;</a>`);
  }

  out.push(`${i}  </div>`);
  out.push(`${i}</div>`);
  return out;
}

/**
 * A hub card. Per-guide rather than per-family: description, tags, and a
 * button, which is the shape these pages already used.
 */
function renderHubCard(card, fromDir, indent) {
  const i = indent;
  const out = [];
  out.push(`${i}<div class="catalog-card${card.soon ? ' coming-soon' : ''}">`);
  out.push(`${i}  <div class="catalog-card-header ${card.accent}">`);
  out.push(`${i}    <span class="catalog-badge">${esc(card.badge)}</span>`);
  out.push(`${i}    <h3>${esc(card.title)}</h3>`);
  out.push(`${i}  </div>`);
  out.push(`${i}  <div class="catalog-card-body">`);
  // `desc` is authored HTML, not text: several carry inline <code> and one
  // carries a second paragraph. Escaping it printed the tags on the page.
  out.push(`${i}    <p>${card.desc}</p>`);
  if (card.tags && card.tags.length) {
    out.push(`${i}    <div class="catalog-tags">`);
    for (const t of card.tags) out.push(`${i}      <span class="tag">${esc(t)}</span>`);
    out.push(`${i}    </div>`);
  }
  if (card.soon) {
    out.push(`${i}    <p class="catalog-soon">Not published yet.</p>`);
  } else {
    // Stored relative to docs/ so it can be cross-checked; written relative to
    // the hub page so the published file still works from any directory depth.
    const rel = path.relative(fromDir, card.h).split(path.sep).join('/');
    out.push(`${i}    <div class="catalog-links">`);
    // `cta` only where the default is wrong: the teardown card says
    // "Open Procedure", because that guide is not a deployment.
    out.push(`${i}      <a href="${rel}" class="catalog-link-primary">${esc(card.cta || 'Open Guide')}</a>`);
    out.push(`${i}    </div>`);
  }
  out.push(`${i}  </div>`);
  out.push(`${i}</div>`);
  return out;
}

/**
 * `group` fills one category block on a hub page that has several, which the
 * AIRS integrations page does: four categories, each with its own intro. A
 * hub without groups takes one marker and renders every card.
 */
function renderHub(file, group, indent) {
  const hub = HUBS.find(h => h.file === file);
  if (!hub) throw new Error(`no HUBS entry for ${file}`);
  const cards = group ? hub.cards.filter(c => c.group === group) : hub.cards;
  if (!cards.length) {
    throw new Error(`no cards in ${file}${group ? ` for group "${group}"` : ''}`);
  }
  const dir = path.dirname(file);
  const lines = [];
  for (const c of cards) lines.push(...renderHubCard(c, dir, indent));
  return lines.join('\n');
}

function renderSection(sectionLabel, indent) {
  const cards = CATALOG.filter(c => c.section === sectionLabel);
  if (!cards.length) throw new Error(`no catalog cards in section "${sectionLabel}"`);
  const lines = [];
  for (const c of cards) lines.push(...renderCard(c, indent));
  return lines.join('\n');
}

// ── Marker rewriting ────────────────────────────────────────────────────

/** `rel` is the file's path relative to docs/, which is how HUBS names it. */
function rewrite(file, rel) {
  const original = fs.readFileSync(file, 'utf8');
  const lines = original.split('\n');
  const out = [];
  const seen = [];
  let i = 0;

  while (i < lines.length) {
    const m = lines[i].match(BEGIN_RE);
    if (!m) { out.push(lines[i++]); continue; }

    const [, indent, section, hub, group] = m;
    const where = `${path.relative(REPO_ROOT, file)}:${i + 1}`;
    if (!section && !hub) throw new Error(`${where}: catalog:begin needs section="..." or hub`);
    if (section && !CATALOG_SECTIONS.some(s => s.label === section)) {
      throw new Error(`${where}: unknown section "${section}"`);
    }
    let j = i + 1;
    while (j < lines.length && !END_RE.test(lines[j])) j++;
    if (j >= lines.length) throw new Error(`${where}: catalog:begin with no catalog:end`);

    out.push(lines[i],
             section ? renderSection(section, indent) : renderHub(rel, group, indent),
             lines[j]);
    seen.push(section || (group ? 'hub:' + group : 'hub'));
    i = j + 1;
  }

  return { text: out.join('\n'), changed: out.join('\n') !== original, seen };
}

// ── Coverage ────────────────────────────────────────────────────────────

function coverage() {
  const problems = [];
  const catalogHrefs = new Map();      // href -> card id

  for (const card of CATALOG) {
    if (!CATALOG_SECTIONS.some(s => s.label === card.section)) {
      problems.push(`card "${card.id}": section "${card.section}" is not in CATALOG_SECTIONS`);
    }
    for (const l of card.links) {
      if (!l.h || l.h === '#') {
        problems.push(`card "${card.id}": link "${l.t}" has no destination`);
        continue;
      }
      const abs = path.join(DOCS_ROOT, l.h.split('#')[0]);
      if (!fs.existsSync(abs)) {
        problems.push(`card "${card.id}": ${l.h} does not exist`);
      }
      // Two cards may share a hub link (both CLI cards point at the combined
      // command tree). Two cards pointing at the same *guide* is a mistake.
      if (!l.hub && catalogHrefs.has(l.h) && catalogHrefs.get(l.h) !== card.id) {
        problems.push(`${l.h} appears on both "${catalogHrefs.get(l.h)}" and "${card.id}"`);
      }
      if (!catalogHrefs.has(l.h)) catalogHrefs.set(l.h, card.id);
    }
  }

  const uncovered = [];
  for (const t of navTargets()) {
    if (catalogHrefs.has(t.href)) continue;
    if (Object.prototype.hasOwnProperty.call(CATALOG_NOT_CARDED, t.href)) continue;
    uncovered.push(t);
  }
  for (const t of uncovered) {
    problems.push(`nav target not in the catalog: ${t.href}  (${t.section} / ${t.group} / ${t.label})`);
  }

  const navHrefs = new Set(navTargets().map(t => t.href));
  const stale = Object.keys(CATALOG_NOT_CARDED).filter(h => !navHrefs.has(h));
  for (const h of stale) {
    problems.push(`CATALOG_NOT_CARDED lists ${h}, which is no longer a nav target`);
  }

  // ── Hub pages ──
  //
  // The third registry. A guide can now be missing from the rail, from the
  // landing page, or from its own hub page, and each of those was a real
  // defect before this script existed. Cross-checking all three is the only
  // reason to generate the cards rather than write them.
  const hubHrefs = new Map();          // href -> hub file
  const hubDirs = new Set(HUBS.map(h => path.dirname(h.file)));

  for (const hub of HUBS) {
    if (!fs.existsSync(path.join(DOCS_ROOT, hub.file))) {
      problems.push(`HUBS names ${hub.file}, which does not exist`);
    }
    for (const c of hub.cards) {
      if (c.soon) {
        if (c.h) problems.push(`${hub.file}: "${c.title}" is marked soon but has a link`);
        continue;
      }
      if (!c.h || c.h === '#') {
        problems.push(`${hub.file}: "${c.title}" has no destination`);
        continue;
      }
      if (!fs.existsSync(path.join(DOCS_ROOT, c.h.split('#')[0]))) {
        problems.push(`${hub.file}: ${c.h} does not exist`);
      }
      if (hubHrefs.has(c.h)) {
        problems.push(`${c.h} has a card on both ${hubHrefs.get(c.h)} and ${hub.file}`);
      }
      hubHrefs.set(c.h, hub.file);
      // A guide on a hub page but not the landing page is unreachable from home.
      if (!catalogHrefs.has(c.h)) {
        problems.push(`${c.h} has a hub card on ${hub.file} but no catalog card`);
      }
    }
  }

  // The reverse, limited to families that actually have a hub page: a guide
  // added to the landing page under guides/aws/ must also reach the AWS hub.
  for (const [href, cardId] of catalogHrefs) {
    const dir = path.dirname(href);
    if (!hubDirs.has(dir)) continue;                 // no hub page for this family
    if (href === path.join(dir, 'index.html')) continue;   // the hub page itself
    if (hubHrefs.has(href)) continue;
    problems.push(`${href} is on catalog card "${cardId}" but has no card on ${dir}/index.html`);
  }

  return { problems, catalogHrefs, navHrefs, hubHrefs };
}

// ── CLI ─────────────────────────────────────────────────────────────────

function main(argv) {
  const flags = new Set(argv.filter(a => a.startsWith('--')));
  const check = flags.has('--check');
  const list = flags.has('--list');

  const cov = coverage();

  if (list) {
    console.log(`${CATALOG.length} card(s) across ${CATALOG_SECTIONS.length} section(s)\n`);
    for (const s of CATALOG_SECTIONS) {
      const cards = CATALOG.filter(c => c.section === s.label);
      const links = cards.reduce((n, c) => n + c.links.length, 0);
      console.log(`${s.label}  —  ${cards.length} card(s), ${links} link(s)`);
      for (const c of cards) {
        console.log(`    ${c.id.padEnd(18)} ${String(c.links.length).padStart(2)} link(s)  ${c.title}`);
      }
      console.log('');
    }
    const onlyNav = [...cov.navHrefs].filter(h => !cov.catalogHrefs.has(h));
    const onlyCat = [...cov.catalogHrefs.keys()].filter(h => !cov.navHrefs.has(h));
    console.log(`nav targets: ${cov.navHrefs.size} | catalog links: ${cov.catalogHrefs.size}`);
    console.log(`in the nav but not the catalog: ${onlyNav.length}`);
    onlyNav.forEach(h => console.log(`    ${h}  ${CATALOG_NOT_CARDED[h] ? '(allowed: ' + CATALOG_NOT_CARDED[h] + ')' : '<-- UNCOVERED'}`));
    console.log(`in the catalog but not the nav: ${onlyCat.length}`);
    onlyCat.forEach(h => console.log(`    ${h}`));
    if (cov.problems.length) {
      console.error('\nproblems:');
      cov.problems.forEach(p => console.error(`    ${p}`));
    }
    return cov.problems.length ? 1 : 0;
  }

  if (cov.problems.length) {
    console.error('Catalog coverage failed:\n');
    cov.problems.forEach(p => console.error(`  ${p}`));
    console.error('\nFix docs/shared/js/catalog.js, or add an argued entry to CATALOG_NOT_CARDED.');
    return 1;
  }

  // The landing page plus every hub page, all from the one registry.
  const targets = [{ rel: 'index.html', required: CATALOG_SECTIONS.map(s => s.label) }]
    .concat(HUBS.map(h => {
      const groups = [...new Set(h.cards.map(c => c.group).filter(Boolean))];
      return { rel: h.file, required: groups.length ? groups.map(g => 'hub:' + g) : ['hub'] };
    }));

  const written = [];
  for (const t of targets) {
    const file = path.join(DOCS_ROOT, t.rel);
    let result;
    try {
      result = rewrite(file, t.rel);
    } catch (err) {
      console.error(err.message);
      return 1;
    }

    const missing = t.required.filter(r => !result.seen.includes(r));
    if (missing.length) {
      console.error(`docs/${t.rel} has no catalog:begin marker for: ${missing.join(', ')}`);
      return 1;
    }

    if (result.changed) {
      if (check) {
        console.error(`docs/${t.rel} is stale. Run: node docs/shared/scripts/build-catalog.js`);
        return 1;
      }
      fs.writeFileSync(file, result.text);
      written.push(t.rel);
    }
  }

  const tally = `${CATALOG.length} landing cards, ${cov.catalogHrefs.size} links, ` +
                `${cov.hubHrefs.size} hub cards across ${HUBS.length} hub pages`;
  if (check) {
    console.log(`Catalog up to date (${tally}).`);
  } else if (written.length) {
    console.log(`Wrote ${written.length} file(s) (${tally}):`);
    written.forEach(w => console.log(`  docs/${w}`));
  } else {
    console.log(`Catalog already current (${tally}).`);
  }
  return 0;
}

if (require.main === module) {
  process.exit(main(process.argv.slice(2)));
}

module.exports = { CATALOG, CATALOG_SECTIONS, HUBS, navTargets, coverage };
