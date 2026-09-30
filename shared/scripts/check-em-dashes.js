#!/usr/bin/env node
//
// check-em-dashes.js — enforce the project's em dash rule on guide HTML.
//
// CLAUDE.md forbids em dashes inside sentence prose and allows them only in
// list-style labels. The rule kept regressing because nothing checked it, and
// the 2026-09 quality audit found it to be the single largest defect class.
// This script is the automated check that audit recommended.
//
// Usage:
//   node docs/shared/scripts/check-em-dashes.js                  report + exit 1 on regression
//   node docs/shared/scripts/check-em-dashes.js --update-baseline  record current counts
//   node docs/shared/scripts/check-em-dashes.js --all            list every violation, not just new
//   node docs/shared/scripts/check-em-dashes.js --quiet          totals only
//
// Restrict to specific files by passing paths after the flags. The pre-commit
// hook does this so it only checks what is staged.
//
// How the rule is applied
// ----------------------
// Matching "prose" directly is unreliable, so this works by inversion: blank
// out every context CLAUDE.md *permits* an em dash in, plus everything that is
// not prose at all (code, comments, tag attributes), then flag whatever is
// left. That way callout body text, figure captions, and bare text in a <div>
// are all covered without needing a rule for each one, and the checker fails
// closed: a context nobody thought about is treated as prose.
//
// The one attribute that is checked rather than skipped is alt=, which
// CLAUDE.md names explicitly.
//
// The baseline
// ------------
// The repo already contains violations that predate this check. Rather than
// block every commit until they are all fixed, em-dash-baseline.json records
// the count per file and the check fails only when a count goes *up*, or when
// a file not in the baseline gains its first violation. Counts that go down
// are reported as progress, with a nudge to re-run --update-baseline so the
// ratchet tightens and the gain cannot be silently given back.
//
// Because the baseline is per-file counts rather than per-line, fixing one
// violation and adding another in the same file nets to zero and passes. That
// is a deliberate trade: line-anchored baselines churn on every reflow, and
// the goal here is to stop the aggregate from growing.

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const DOCS_ROOT = path.join(REPO_ROOT, 'docs');
const BASELINE_FILE = path.join(__dirname, 'em-dash-baseline.json');

// Mirrored upstream PAN documentation. Not our prose, and not ours to rewrite.
// hooks/pre-commit skips the same path for its content scan.
const SKIP_PATH_RE = /(^|\/)(web-help|node_modules|\.git)(\/|$)/;

// superpowers/ is internal working material and templates/ is scaffolding;
// publish-guides.yml already excludes both from the published site.
const SKIP_DIRS = new Set(['superpowers', 'templates', 'node_modules', '.git']);

const EM_DASH_RE = /—|&mdash;/g;

// ── Blanking ────────────────────────────────────────────────────────────────
// Every replacement preserves length and newlines so byte offsets stay valid
// and line numbers remain correct.

function blank(text) {
  return text.replace(/[^\n]/g, ' ');
}

function blankRegion(src, re) {
  return src.replace(re, (m) => blank(m));
}

// Contexts CLAUDE.md permits an em dash in.
//
// CLAUDE.md names <h3>/<h4> as heading labels. h1, h2, h5 and h6 are included
// here because they carry the identical construct ("Step 1 — Create the Key
// Vault"), and treating the same label pattern as a violation at one heading
// level and not another would be arbitrary. See the note in the PR; if the
// standard is meant to be narrower, drop them here and the affected headings
// become reportable.
// <label> is included for the same reason as <li>: a checkbox row in a
// checklist ("Target validated — status is VALIDATED") is a list item that
// happens to be marked up as a form label.
const ALLOWED_TAGS = ['li', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'td', 'th', 'title', 'button', 'option'];

// Structural chrome rather than body copy. Each of these renders a short label,
// never a sentence.
const ALLOWED_CLASSES = [
  'callout-title',
  'collapsible-header',
  'flow-label',
  'header-section-title',
  'sidebar-section-title',
];

// cmd-sep is the separator glyph between tokens in the generated PAN-OS CLI
// command references. It contains the dash and nothing else (verified: exactly
// one distinct value across all 27,585 occurrences), so it is punctuation in a
// breadcrumb rather than prose.
ALLOWED_CLASSES.push('cmd-sep');

// Elements an allowed class may appear on. Both are non-nesting in practice
// for these classes, which is what makes the non-greedy close below safe.
const CLASS_HOSTS = ['div', 'span'];

// Not prose in the first place.
const NON_PROSE_TAGS = ['script', 'style', 'pre', 'code', 'svg'];

function stripToProse(src) {
  let s = src;

  // HTML comments. Includes the shared:begin/end markers, whose vars JSON can
  // legitimately carry an em dash destined for an allowed context.
  s = blankRegion(s, /<!--[\s\S]*?-->/g);

  for (const tag of NON_PROSE_TAGS) {
    s = blankRegion(s, new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?</${tag}>`, 'gi'));
  }
  for (const tag of ALLOWED_TAGS) {
    s = blankRegion(s, new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?</${tag}>`, 'gi'));
  }
  for (const cls of ALLOWED_CLASSES) {
    for (const host of CLASS_HOSTS) {
      // Verified across the guide corpus: none of these classes ever nests a
      // same-name element, so a non-greedy close is safe. If that ever changes
      // the check over-reports rather than under-reports, which is the right
      // direction to fail.
      s = blankRegion(s, new RegExp(`<${host}[^>]*class="[^"]*\\b${cls}\\b[^"]*"[^>]*>[\\s\\S]*?</${host}>`, 'gi'));
    }
  }

  return s;
}

// ── Scanning ────────────────────────────────────────────────────────────────

// Offsets of every line start, so lineOf is a binary search rather than a scan
// from zero. The CLI reference pages run past 50,000 lines with thousands of
// matches each, where the naive version is quadratic.
function lineIndex(src) {
  const starts = [0];
  for (let i = src.indexOf('\n'); i !== -1; i = src.indexOf('\n', i + 1)) starts.push(i + 1);
  return starts;
}

function lineOf(starts, index) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (starts[mid] <= index) lo = mid;
    else hi = mid - 1;
  }
  return lo + 1;
}

function excerpt(src, index) {
  let start = src.lastIndexOf('\n', index) + 1;
  let end = src.indexOf('\n', index);
  if (end === -1) end = src.length;
  let text = src.slice(start, end).trim().replace(/\s+/g, ' ');
  if (text.length > 120) {
    const rel = index - start;
    const from = Math.max(0, rel - 55);
    text = (from > 0 ? '…' : '') + text.slice(from, from + 115) + '…';
  }
  return text;
}

// Ranges of generated shared content, so a violation inside one can point the
// author at the snippet instead of the file they cannot usefully edit.
function sharedRanges(src) {
  const ranges = [];
  const re = /<!--\s*shared:begin\b[\s\S]*?id="([^"]+)"[\s\S]*?-->/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const end = src.indexOf('<!-- shared:end -->', m.index);
    ranges.push({ id: m[1], start: m.index, end: end === -1 ? src.length : end });
  }
  return ranges;
}

function scanFile(absPath) {
  const src = fs.readFileSync(absPath, 'utf8');
  if (!EM_DASH_RE.test(src)) return [];
  EM_DASH_RE.lastIndex = 0;

  const prose = stripToProse(src);
  const ranges = sharedRanges(src);
  const starts = lineIndex(src);
  const hits = [];

  const record = (index, context) => {
    const inShared = ranges.find((r) => index >= r.start && index < r.end);
    hits.push({
      line: lineOf(starts, index),
      context,
      snippet: inShared ? inShared.id : null,
      text: excerpt(src, index),
    });
  };

  // Text left after blanking every permitted context.
  //
  // Tags are blanked last and separately, so an em dash in a class name or a
  // href does not count, but the alt= pass below still sees the original.
  const textOnly = blankRegion(prose, /<[^>]*>/g);
  let m;
  EM_DASH_RE.lastIndex = 0;
  while ((m = EM_DASH_RE.exec(textOnly)) !== null) record(m.index, 'prose');

  // alt text, named explicitly in CLAUDE.md. Read from `prose` rather than the
  // raw source so an <img> inside an allowed container is still exempt.
  const altRe = /\balt="([^"]*)"/g;
  while ((m = altRe.exec(prose)) !== null) {
    const valueStart = m.index + m[0].indexOf('"') + 1;
    EM_DASH_RE.lastIndex = 0;
    let d;
    while ((d = EM_DASH_RE.exec(m[1])) !== null) record(valueStart + d.index, 'alt');
  }

  hits.sort((a, b) => a.line - b.line);
  return hits;
}

// ── File discovery ──────────────────────────────────────────────────────────

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

function relative(absPath) {
  return path.relative(REPO_ROOT, absPath).split(path.sep).join('/');
}

function collectFiles(argPaths) {
  let files;
  if (argPaths.length) {
    files = [];
    for (const p of argPaths) {
      const abs = path.resolve(REPO_ROOT, p);
      if (!fs.existsSync(abs)) continue;
      const stat = fs.statSync(abs);
      if (stat.isDirectory()) walk(abs, files);
      else if (abs.endsWith('.html')) files.push(abs);
    }
  } else {
    files = walk(DOCS_ROOT, []);
  }
  return files.filter((f) => !SKIP_PATH_RE.test(relative(f))).sort();
}

// ── Baseline ────────────────────────────────────────────────────────────────

function readBaseline() {
  if (!fs.existsSync(BASELINE_FILE)) return {};
  try {
    const parsed = JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
    return parsed.counts || {};
  } catch (err) {
    console.error(`Cannot parse ${relative(BASELINE_FILE)}: ${err.message}`);
    process.exit(2);
  }
}

function writeBaseline(counts) {
  const ordered = {};
  for (const key of Object.keys(counts).sort()) ordered[key] = counts[key];
  const total = Object.values(ordered).reduce((a, b) => a + b, 0);
  const body = {
    _comment: [
      'Known em dash violations in prose, per file. Generated by check-em-dashes.js.',
      'The check fails when a count rises above its entry here, or when a file not',
      'listed gains its first violation. Lower a number only by fixing the prose and',
      'running --update-baseline; never edit by hand to make a check pass.',
    ],
    total,
    counts: ordered,
  };
  fs.writeFileSync(BASELINE_FILE, JSON.stringify(body, null, 2) + '\n');
  return total;
}

// ── Main ────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const update = args.includes('--update-baseline');
  const showAll = args.includes('--all');
  const quiet = args.includes('--quiet');
  const paths = args.filter((a) => !a.startsWith('--'));

  const files = collectFiles(paths);
  const found = {};
  const details = {};
  for (const abs of files) {
    const hits = scanFile(abs);
    if (hits.length) {
      found[relative(abs)] = hits.length;
      details[relative(abs)] = hits;
    }
  }

  if (update) {
    // A scoped run must not delete entries for files it never looked at.
    const merged = paths.length ? readBaseline() : {};
    if (paths.length) for (const abs of files) delete merged[relative(abs)];
    Object.assign(merged, found);
    const total = writeBaseline(merged);
    console.log(`Baseline updated: ${total} known violation(s) across ${Object.keys(merged).length} file(s).`);
    return 0;
  }

  const baseline = readBaseline();
  const regressions = [];
  const improvements = [];

  for (const [file, count] of Object.entries(found)) {
    const allowed = baseline[file] || 0;
    if (count > allowed) regressions.push({ file, count, allowed });
  }
  for (const [file, allowed] of Object.entries(baseline)) {
    // Only claim an improvement for a file this run actually examined.
    if (paths.length && !files.some((f) => relative(f) === file)) continue;
    const count = found[file] || 0;
    if (count < allowed) improvements.push({ file, count, allowed });
  }

  const total = Object.values(found).reduce((a, b) => a + b, 0);

  if (regressions.length) {
    console.error(`Em dash rule violated in prose (${regressions.length} file(s)):\n`);
    for (const r of regressions) {
      const newly = r.allowed ? ` (was ${r.allowed}, now ${r.count})` : '';
      console.error(`  ${r.file}${newly}`);
      for (const hit of details[r.file]) {
        const where = hit.snippet ? `  [generated from snippet "${hit.snippet}" — fix it there]` : '';
        console.error(`    ${r.file}:${hit.line}  (${hit.context})${where}`);
        console.error(`        ${hit.text}`);
      }
      console.error('');
    }
    console.error('CLAUDE.md allows em dashes only in list-style labels: <li>, step and');
    console.error('collapsible headers, tab labels, table cells, <h3>/<h4>, callout titles,');
    console.error('and <title>. In a sentence, use a colon, comma, semicolon, parentheses,');
    console.error('or reword. If a hit is genuinely in an allowed context, the context is');
    console.error('missing from ALLOWED_TAGS/ALLOWED_CLASSES in this script: add it there.');
    return 1;
  }

  if (!quiet) {
    if (improvements.length) {
      const fixed = improvements.reduce((a, i) => a + (i.allowed - i.count), 0);
      console.log(`${fixed} violation(s) fixed since the baseline was recorded:`);
      for (const i of improvements) console.log(`  ${i.file}: ${i.allowed} -> ${i.count}`);
      console.log('Run with --update-baseline to lock that in.\n');
    }
    if (showAll && total) {
      for (const [file, hits] of Object.entries(details)) {
        console.log(`${file} (${hits.length})`);
        for (const hit of hits) console.log(`  ${file}:${hit.line}  (${hit.context})  ${hit.text}`);
      }
      console.log('');
    }
    console.log(`Em dash check passed. ${total} known violation(s) in ${Object.keys(found).length} file(s), none new.`);
  }
  return 0;
}

process.exit(main());
