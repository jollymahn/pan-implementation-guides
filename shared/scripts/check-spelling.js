#!/usr/bin/env node
//
// check-spelling.js — hold the site to US spelling, without breaking the
// product terms that are legitimately British.
//
// CLAUDE.md asks for US spelling. The rule kept regressing because nothing
// checked it, and because the obvious fix is wrong: roughly half the British
// spellings on this site are verbatim product terms from the upstream Portkey
// documentation. "Organisation ID" is the name of a real field, ORGANISATION_ID
// is a real environment variable, and organisations-to-sync is a real secret.
// A blanket find-and-replace breaks all of them, which is why previous attempts
// at this did not stick.
//
// So this checker works in two directions:
//
//   1. British spelling in prose is a violation. Fix it.
//   2. A product term in ALLOWED_PHRASES keeps its British spelling, and
//      Americanising one is *also* a violation. "Organization ID" is wrong on
//      this site, because the product does not call it that.
//
// Usage:
//   node docs/shared/scripts/check-spelling.js                     report + exit 1 on regression
//   node docs/shared/scripts/check-spelling.js --update-baseline   record current counts
//   node docs/shared/scripts/check-spelling.js --all               list every violation, not just new
//   node docs/shared/scripts/check-spelling.js --quiet             totals only
//
// Restrict to specific files by passing paths after the flags. The pre-commit
// hook does this so it only checks what is staged.
//
// Adding a word: put it in WORDS. Adding a product term that must stay
// British: put it in ALLOWED_PHRASES, and the reverse check follows for free.
// Never edit the baseline by hand to make a check pass.

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '../../..');
const BASELINE_FILE = path.join(__dirname, 'spelling-baseline.json');

/* Vendored and mirrored content is not ours to reword. The doc mirrors are
 * scraped vendor pages and lunr is a third-party library whose own log
 * messages say "serialised". */
const SKIP_DIRS = new Set([
  '.git', 'node_modules', 'pan-docs-reference', 'Panorama-Web-Help',
  'Firewall-Web-Help', 'workspace', 'CustomerWorking', 'write', 'screenshots'
]);
const SKIP_FILES = new Set([
  'docs/shared/js/lunr.min.js',
  'docs/shared/search-index.json',
  // The checker lists both spellings of every product term by definition.
  'docs/shared/scripts/check-spelling.js'
]);

const EXTS = ['.html', '.md', '.js', '.css'];

/* British -> US. Only words where the two dialects genuinely differ: no
 * "analysis", which is correct in both, and no "practice", where the split is
 * noun versus verb rather than dialect. */
const WORDS = {
  analyse: 'analyze', analysed: 'analyzed', analyses: 'analyzes', analysing: 'analyzing',
  utilise: 'utilize', utilised: 'utilized', utilises: 'utilizes', utilising: 'utilizing',
  utilisation: 'utilization',
  organise: 'organize', organised: 'organized', organises: 'organizes', organising: 'organizing',
  organisation: 'organization', organisations: 'organizations', organisational: 'organizational',
  prioritise: 'prioritize', prioritised: 'prioritized', prioritises: 'prioritizes', prioritising: 'prioritizing',
  recognise: 'recognize', recognised: 'recognized', recognises: 'recognizes', recognising: 'recognizing',
  authorise: 'authorize', authorised: 'authorized', authorises: 'authorizes', authorising: 'authorizing',
  authorisation: 'authorization', authorisations: 'authorizations',
  minimise: 'minimize', minimised: 'minimized', minimises: 'minimizes', minimising: 'minimizing',
  maximise: 'maximize', maximised: 'maximized', maximises: 'maximizes', maximising: 'maximizing',
  summarise: 'summarize', summarised: 'summarized', summarises: 'summarizes', summarising: 'summarizing',
  optimise: 'optimize', optimised: 'optimized', optimises: 'optimizes', optimising: 'optimizing',
  customise: 'customize', customised: 'customized', customises: 'customizes', customising: 'customizing',
  normalise: 'normalize', normalised: 'normalized', normalises: 'normalizes', normalising: 'normalizing',
  standardise: 'standardize', standardised: 'standardized', standardising: 'standardizing',
  initialise: 'initialize', initialised: 'initialized', initialising: 'initializing',
  serialise: 'serialize', serialised: 'serialized', serialising: 'serializing',
  synchronise: 'synchronize', synchronised: 'synchronized', synchronising: 'synchronizing',
  realise: 'realize', realised: 'realized', realises: 'realizes', realising: 'realizing',
  parallelise: 'parallelize', parallelised: 'parallelized', parallelising: 'parallelizing',
  artefact: 'artifact', artefacts: 'artifacts',
  behaviour: 'behavior', behaviours: 'behaviors', behavioural: 'behavioral',
  licence: 'license', licences: 'licenses', licenced: 'licensed',
  centre: 'center', centres: 'centers', centred: 'centered',
  catalogue: 'catalog', catalogues: 'catalogs', catalogued: 'cataloged',
  defence: 'defense', defences: 'defenses',
  colour: 'color', colours: 'colors', coloured: 'colored',
  flavour: 'flavor', flavours: 'flavors',
  labelled: 'labeled', labelling: 'labeling',
  modelling: 'modeling', cancelled: 'canceled', cancelling: 'canceling',
  fulfil: 'fulfill', fulfils: 'fulfills',
  enquire: 'inquire', enquiry: 'inquiry', enquiries: 'inquiries',
  programme: 'program', programmes: 'programs',
  whilst: 'while', amongst: 'among', towards: 'toward',
  sceptic: 'skeptic', sceptical: 'skeptical'
};

/* Product terms and verbatim citations that keep their British spelling.
 * Matched case-insensitively against the raw source before the word scan, and
 * blanked out so the words inside them are never flagged.
 *
 * Each of these is also checked in reverse: if the US form of the phrase turns
 * up, that is a violation, because the product does not spell it that way. */
/* Product terms and verbatim citations that keep their British spelling.
 * Matched case-insensitively and blanked out before the word scan, so the
 * words inside them are never flagged as prose errors.
 *
 * `scope` limits where a term applies, because a field name belongs to one
 * product: Portkey calls it Organisation ID, Panorama calls it Organization
 * ID, and both are right in their own guides.
 *
 * `reverse: false` marks a verbatim citation rather than a product term. The
 * playbooks quote a guide heading that happens to be British; that heading
 * has to stay as written, but nothing says the word must be British anywhere
 * else, so the reverse check does not apply.
 */
const ALLOWED_PHRASES = [
  /* Reverse check off, deliberately. Portkey calls its field Organisation ID
   * and OpenAI calls its field Organization ID, and the AI Gateway guide
   * refers to both, in the same list. No automated rule can tell which vendor
   * a given mention belongs to, so demanding one spelling would fail on
   * correct text. The forward exemption still stops Portkey's term being
   * reported as a prose error. */
  { british: 'Organisation ID', us: 'Organization ID', reverse: false,
    scope: /^docs\/(guides\/ai-gateway|shared\/snippets)\//,
    why: 'Portkey field name; OpenAI spells its own field Organization ID, so both are correct on this site' },
  { british: 'ORGANISATION_ID', us: 'ORGANIZATION_ID',
    scope: /^docs\/(guides\/ai-gateway|shared\/snippets)\//,
    why: 'Literal environment variable name' },
  { british: 'ORGANISATIONS_TO_SYNC', us: 'ORGANIZATIONS_TO_SYNC',
    scope: /^docs\/(guides\/ai-gateway|shared\/snippets)\//,
    why: 'Literal environment variable name' },
  { british: 'organisations-to-sync', us: 'organizations-to-sync',
    scope: /^docs\/(guides\/ai-gateway|shared\/snippets)\//,
    why: 'Literal secret name' },
  { british: 'organisation_id', us: 'organization_id',
    scope: /^docs\/(guides\/ai-gateway|shared\/snippets)\//,
    why: 'Literal parameter name' },
  { british: 'Admin Settings &rarr; Organisation', us: 'Admin Settings &rarr; Organization',
    scope: /^docs\/guides\/ai-gateway\//,
    why: 'Verbatim UI navigation path in the Portkey console' },
  { british: 'Re-check timeout behaviour', us: 'Re-check timeout behavior', reverse: false,
    why: 'Verbatim guide step heading cited by the playbooks; changing it breaks check-playbooks.js' }
];

// ── Source handling ──────────────────────────────────────────────────────────

const blank = m => ' '.repeat(m.length);

function blankRegion(src, re) {
  return src.replace(re, blank);
}

/* Everything that is not authored prose gets blanked before the scan: code,
 * markup attributes, script and style bodies, comments. A British spelling in
 * a command the reader is told to paste is not a writing error. */
function stripToProse(src, ext) {
  let out = src;

  if (ext === '.html') {
    out = blankRegion(out, /<pre[\s\S]*?<\/pre>/gi);
    out = blankRegion(out, /<code[\s\S]*?<\/code>/gi);
    out = blankRegion(out, /<kbd[\s\S]*?<\/kbd>/gi);
    out = blankRegion(out, /<script[\s\S]*?<\/script>/gi);
    out = blankRegion(out, /<style[\s\S]*?<\/style>/gi);
    out = blankRegion(out, /<!--[\s\S]*?-->/g);
    // Tag attributes, except alt and title, which are read by people.
    out = out.replace(/<[a-zA-Z/][^>]*>/g, tag =>
      tag.replace(/\b((?!alt\b|title\b)[a-zA-Z-]+)\s*=\s*"[^"]*"/g, blank));
  } else if (ext === '.md') {
    out = blankRegion(out, /```[\s\S]*?```/g);
    out = blankRegion(out, /`[^`\n]*`/g);
  } else if (ext === '.css') {
    out = blankRegion(out, /\/\*[\s\S]*?\*\//g);
  }
  // .js is scanned whole: its comments and strings are both authored prose.

  return out;
}

const inScope = (p, rel) => !p.scope || p.scope.test(rel);

function blankAllowedPhrases(src, rel) {
  let out = src;
  for (const p of ALLOWED_PHRASES) {
    if (!inScope(p, rel)) continue;
    out = blankRegion(out, new RegExp(escapeRe(p.british), 'gi'));
  }
  return out;
}

const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const WORD_RE = new RegExp(`\\b(${Object.keys(WORDS).join('|')})\\b`, 'gi');

function lineStarts(src) {
  const starts = [0];
  for (let i = 0; i < src.length; i++) if (src[i] === '\n') starts.push(i + 1);
  return starts;
}

function lineOf(starts, index) {
  let lo = 0, hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= index) lo = mid; else hi = mid - 1;
  }
  return lo + 1;
}

function excerpt(src, index, len) {
  const from = Math.max(0, index - 40);
  const to = Math.min(src.length, index + len + 40);
  return src.slice(from, to).replace(/\s+/g, ' ').trim();
}

function scanFile(absPath) {
  const rel = relative(absPath);
  const raw = fs.readFileSync(absPath, 'utf8');
  const ext = path.extname(absPath);
  const hits = [];

  // Direction 1: British spelling in prose.
  const prose = blankAllowedPhrases(stripToProse(raw, ext), rel);
  const starts = lineStarts(raw);
  let m;
  WORD_RE.lastIndex = 0;
  while ((m = WORD_RE.exec(prose)) !== null) {
    const found = m[0];
    const us = WORDS[found.toLowerCase()];
    hits.push({
      kind: 'british', line: lineOf(starts, m.index), found,
      suggest: matchCase(found, us), text: excerpt(raw, m.index, found.length)
    });
  }

  // Direction 2: a product term that has been Americanised.
  for (const p of ALLOWED_PHRASES) {
    if (p.reverse === false || !inScope(p, rel)) continue;
    const re = new RegExp(escapeRe(p.us), 'gi');
    let n;
    while ((n = re.exec(raw)) !== null) {
      hits.push({
        kind: 'product', line: lineOf(starts, n.index), found: n[0],
        suggest: p.british, why: p.why, text: excerpt(raw, n.index, n[0].length)
      });
    }
  }

  return { rel, hits };
}

/* Keep the shape of what was written: ALL CAPS, Capitalised, or lower. */
function matchCase(found, replacement) {
  if (found === found.toUpperCase()) return replacement.toUpperCase();
  if (found[0] === found[0].toUpperCase()) {
    return replacement[0].toUpperCase() + replacement.slice(1);
  }
  return replacement;
}

// ── Files ────────────────────────────────────────────────────────────────────

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && EXTS.includes(path.extname(entry.name))) {
      const abs = path.join(dir, entry.name);
      if (!SKIP_FILES.has(relative(abs))) out.push(abs);
    }
  }
  return out;
}

function relative(absPath) {
  return path.relative(REPO_ROOT, absPath).split(path.sep).join('/');
}

function collectFiles(argPaths) {
  if (argPaths.length) {
    const files = [];
    for (const p of argPaths) {
      const abs = path.resolve(REPO_ROOT, p);
      if (!fs.existsSync(abs)) continue;
      if (fs.statSync(abs).isDirectory()) walk(abs, files);
      else if (EXTS.includes(path.extname(abs)) && !SKIP_FILES.has(relative(abs))) files.push(abs);
    }
    return files;
  }
  return walk(path.join(REPO_ROOT, 'docs'), []);
}

// ── Baseline ─────────────────────────────────────────────────────────────────

function readBaseline() {
  if (!fs.existsSync(BASELINE_FILE)) return {};
  try {
    const raw = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
    const out = {};
    for (const [k, v] of Object.entries(raw)) if (!k.startsWith('_')) out[k] = v;
    return out;
  } catch (e) {
    console.error(`check-spelling: cannot read ${relative(BASELINE_FILE)}: ${e.message}`);
    process.exit(2);
  }
}

function writeBaseline(counts) {
  const body = {
    _comment: [
      'Known British spellings in prose, per file. Generated by check-spelling.js.',
      'The check fails when a count rises above its entry here, or when a file not',
      'listed gains its first violation. Lower a number only by fixing the prose and',
      'running --update-baseline; never edit by hand to make a check pass.',
      'Product terms that are legitimately British live in ALLOWED_PHRASES in the',
      'checker, not here.'
    ]
  };
  for (const k of Object.keys(counts).sort()) if (counts[k]) body[k] = counts[k];
  fs.writeFileSync(BASELINE_FILE, JSON.stringify(body, null, 2) + '\n');
}

// ── Main ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const update = args.includes('--update-baseline');
  const all = args.includes('--all');
  const quiet = args.includes('--quiet');
  const paths = args.filter(a => !a.startsWith('--'));

  const files = collectFiles(paths);
  const results = files.map(scanFile).filter(r => r.hits.length);

  const counts = {};
  for (const r of results) counts[r.rel] = r.hits.length;

  if (update) {
    // A targeted run must not wipe entries for files it never looked at.
    const merged = paths.length ? Object.assign({}, readBaseline(), counts) : counts;
    if (paths.length) {
      for (const f of files) {
        const rel = relative(f);
        if (!counts[rel]) delete merged[rel];
      }
    }
    writeBaseline(merged);
    const total = Object.values(merged).reduce((a, b) => a + b, 0);
    console.log(`check-spelling: baseline written, ${total} known violation(s) in ${Object.keys(merged).length} file(s).`);
    return 0;
  }

  const baseline = readBaseline();
  const regressions = [];
  const improvements = [];

  for (const r of results) {
    const allowed = baseline[r.rel] || 0;
    if (r.hits.length > allowed) regressions.push({ r, allowed });
  }
  for (const [rel, allowed] of Object.entries(baseline)) {
    const now = counts[rel] || 0;
    if (now < allowed && (!paths.length || files.some(f => relative(f) === rel))) {
      improvements.push({ rel, allowed, now });
    }
  }

  /* Americanised product terms are never baselined. There are none today and
   * there should never be any, so one is a hard failure wherever it appears. */
  const productErrors = [];
  for (const r of results) {
    for (const h of r.hits) if (h.kind === 'product') productErrors.push({ rel: r.rel, h });
  }

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  if (productErrors.length) {
    console.error(`\ncheck-spelling: ${productErrors.length} product term(s) wrongly Americanized:\n`);
    for (const { rel, h } of productErrors) {
      console.error(`  ${rel}:${h.line}  "${h.found}" should be "${h.suggest}"`);
      console.error(`    ${h.why}`);
      console.error(`    … ${h.text} …\n`);
    }
  }

  if (regressions.length) {
    console.error(`\ncheck-spelling: British spelling in prose, above the baseline:\n`);
    for (const { r, allowed } of regressions) {
      console.error(`  ${r.rel}  (${r.hits.length} found, ${allowed} allowed)`);
      for (const h of r.hits.filter(x => x.kind === 'british')) {
        console.error(`    line ${h.line}: "${h.found}" -> "${h.suggest}"`);
        console.error(`      … ${h.text} …`);
      }
      console.error('');
    }
    console.error('Fix the prose. If the word is a product term that is genuinely British,');
    console.error('add it to ALLOWED_PHRASES in check-spelling.js instead.\n');
  }

  if (all && !quiet) {
    console.log('\nEvery known violation:\n');
    for (const r of results) {
      console.log(`  ${r.rel}`);
      for (const h of r.hits) console.log(`    line ${h.line}: ${h.found} -> ${h.suggest}`);
    }
  }

  if (improvements.length && !quiet) {
    console.log(`\n${improvements.length} file(s) improved since the baseline:`);
    for (const i of improvements) console.log(`  ${i.rel}: ${i.allowed} -> ${i.now}`);
    console.log('Run with --update-baseline to lock that in.\n');
  }

  if (productErrors.length || regressions.length) return 1;

  if (!quiet) {
    console.log(`Spelling check passed. ${total} known violation(s) in ${results.length} file(s), none new.`);
  }
  return 0;
}

process.exit(main());
