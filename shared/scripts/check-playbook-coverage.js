#!/usr/bin/env node
/* check-playbook-coverage.js — a deployment guide should ship a delivery plan.
 *
 * check-playbooks.js proves the playbooks that exist still match their guides.
 * It says nothing about the guides that have no playbook at all, which is the
 * larger gap: a consultant scoping an engagement from a guide with no workbook
 * builds the plan by hand, and the estimate is whatever they guessed that day.
 *
 * Usage:
 *   node docs/shared/scripts/check-playbook-coverage.js                  check
 *   node docs/shared/scripts/check-playbook-coverage.js --list           full report
 *   node docs/shared/scripts/check-playbook-coverage.js --update-baseline
 *
 * ── What counts as a deployment guide ───────────────────────────────────────
 * A guide qualifies on shape, not on name: at least MIN_STEPS collapsible steps
 * spread over at least MIN_PHASES anchored h2 sections. Those numbers are not
 * invented. They are the shape of the smallest guide anyone has already judged
 * worth a playbook (airs-integrations/n8n.html, 11 steps over 5 phases), so the
 * rule reads as "shaped like something we already decided deserves one" rather
 * than as a threshold picked to produce a tidy number.
 *
 * Reference pages, hub pages and short companions fall below it and are never
 * asked for a plan. A guide that grows past it is asked, which is the point:
 * coverage should follow the guide getting bigger, not someone remembering.
 *
 * ── The baseline ────────────────────────────────────────────────────────────
 * Nineteen guides qualify today and have no playbook. Failing on all of them
 * would block every commit until a quarter of the site had workbooks written,
 * so playbook-coverage-baseline.json records them and the check fails only on
 * a guide that is newly uncovered: a new deployment guide, or an existing one
 * that has grown past the threshold.
 *
 * Coverage that improves is reported as progress with a nudge to re-run
 * --update-baseline. A baselined entry that no longer qualifies, because the
 * guide was split or retired, is reported as stale so the list cannot rot.
 *
 * Never edit the baseline by hand to make this pass. Either write the playbook
 * with /new-playbook, or add an exemption with a reason below.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { loadGuide, ROOT } = require(path.join(__dirname, 'lib/playbook-guide-parser.js'));

const GUIDES_DIR = path.join(ROOT, 'docs/guides');
const BASELINE_FILE = path.join(__dirname, 'playbook-coverage-baseline.json');

const MIN_STEPS = 11;
const MIN_PHASES = 5;

const LIST = process.argv.includes('--list');
const UPDATE = process.argv.includes('--update-baseline');

/* Directories holding assets or vendored mirrors rather than authored guides. */
const SKIP_DIRS = /^(web-help|diagrams|screenshots|images|configs|assets)$/;

/* Guides that meet the shape test and still should not carry a playbook. Each
 * needs a reason, and a stale entry fails, so this cannot quietly accumulate.
 *
 * "It is not written yet" is not a reason. That is what the baseline is for. */
const EXEMPT = {
  'docs/guides/airs-planner/index.html':
    'Is itself a planning tool that generates the engagement workbook',
  'docs/guides/airs-pov/index.html':
    'Generates POV documents at run time and is unlisted',
};

// ── Survey ───────────────────────────────────────────────────────────────────

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP_DIRS.test(e.name)) walk(full, out);
    } else if (e.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const guides = walk(GUIDES_DIR).map(abs => {
  const rel = path.relative(ROOT, abs).split(path.sep).join('/');
  const html = fs.readFileSync(abs, 'utf8');
  const parsed = loadGuide(rel);

  let steps = 0;
  let phases = 0;
  if (parsed) {
    parsed.sections.forEach(sec => {
      if (sec.heads.length) {
        phases += 1;
        steps += sec.heads.length;
      }
    });
  }

  const m = /data-playbook="([^"]+)"/.exec(html);
  return {
    rel,
    steps,
    phases,
    playbook: m ? m[1] : null,
    qualifies: steps >= MIN_STEPS && phases >= MIN_PHASES,
    exempt: Object.prototype.hasOwnProperty.call(EXEMPT, rel),
  };
}).sort((a, b) => a.rel.localeCompare(b.rel));

const covered = guides.filter(g => g.playbook);
const uncovered = guides.filter(g => g.qualifies && !g.playbook && !g.exempt);
const exempted = guides.filter(g => g.exempt);

// ── Baseline ─────────────────────────────────────────────────────────────────

function readBaseline() {
  if (!fs.existsSync(BASELINE_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(BASELINE_FILE, 'utf8'));
  } catch (err) {
    console.error(`Cannot parse ${path.relative(ROOT, BASELINE_FILE)}: ${err.message}`);
    process.exit(2);
  }
  return null;
}

if (UPDATE) {
  const payload = {
    _comment: 'Deployment-shaped guides with no playbook. Generated by '
      + 'check-playbook-coverage.js --update-baseline. Never edit by hand to make a '
      + 'check pass: write the playbook with /new-playbook, or add an exemption with '
      + 'a reason in the script.',
    _thresholds: { minSteps: MIN_STEPS, minPhases: MIN_PHASES },
    uncovered: uncovered.map(g => g.rel),
  };
  fs.writeFileSync(BASELINE_FILE, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${path.relative(ROOT, BASELINE_FILE)} with ${uncovered.length} uncovered guide(s).`);
  process.exit(0);
}

// ── Report ───────────────────────────────────────────────────────────────────

if (LIST) {
  console.log('\nPlaybook coverage\n');
  console.log(`  threshold: a guide qualifies at ${MIN_STEPS}+ steps over ${MIN_PHASES}+ phases\n`);
  const w = Math.max(...guides.map(g => g.rel.length)) - 12;
  const row = g => {
    const name = g.rel.replace('docs/guides/', '').padEnd(w);
    const size = `${String(g.steps).padStart(3)} steps ${String(g.phases).padStart(2)} ph`;
    const state = g.playbook ? `playbook: ${g.playbook}`
      : g.exempt ? `exempt: ${EXEMPT[g.rel]}`
      : g.qualifies ? 'NO PLAYBOOK'
      : 'below threshold';
    return `  ${name}  ${size}  ${state}`;
  };
  console.log(`Covered (${covered.length})`);
  covered.forEach(g => console.log(row(g)));
  console.log(`\nQualifies, no playbook (${uncovered.length})`);
  uncovered.forEach(g => console.log(row(g)));
  console.log(`\nExempt (${exempted.length})`);
  exempted.forEach(g => console.log(row(g)));
  const below = guides.filter(g => !g.qualifies && !g.playbook && !g.exempt);
  console.log(`\nBelow threshold, not asked for one (${below.length})`);
  console.log('');
  process.exit(0);
}

const baseline = readBaseline();
if (!baseline) {
  console.error('check-playbook-coverage: no baseline. Run --update-baseline once to record');
  console.error('the guides that have no playbook today, then commit it.');
  process.exit(2);
}

const known = new Set(baseline.uncovered || []);
const nowUncovered = new Set(uncovered.map(g => g.rel));

const regressions = [...nowUncovered].filter(r => !known.has(r));
const fixed = [...known].filter(r => !nowUncovered.has(r));

const stale = fixed.filter(r => {
  const g = guides.find(x => x.rel === r);
  return !g || (!g.playbook && !g.exempt);
});
const genuinelyFixed = fixed.filter(r => !stale.includes(r));

if (genuinelyFixed.length) {
  console.log(`\ncheck-playbook-coverage: ${genuinelyFixed.length} guide(s) gained a playbook since the baseline:\n`);
  genuinelyFixed.forEach(r => console.log(`  ${r}`));
  console.log('\n  Re-run with --update-baseline to record the progress.');
}

if (stale.length) {
  console.log(`\ncheck-playbook-coverage: ${stale.length} baseline entr(ies) no longer exist or no longer qualify:\n`);
  stale.forEach(r => console.log(`  ${r}`));
  console.log('\n  Re-run with --update-baseline to drop them.');
}

if (regressions.length) {
  console.error(`\ncheck-playbook-coverage: ${regressions.length} deployment guide(s) with no delivery playbook:\n`);
  regressions.forEach(r => {
    const g = guides.find(x => x.rel === r);
    console.error(`  ${r}`);
    console.error(`      ${g.steps} steps over ${g.phases} phases, which is deployment-shaped`);
  });
  console.error('\n  A guide this size is scoped by hand without a playbook, and the estimate');
  console.error('  is whatever the consultant guessed. Build one:\n');
  console.error(`      node docs/shared/scripts/scaffold-playbook.js ${regressions[0]}`);
  console.error('\n  then follow .claude/skills/new-playbook/SKILL.md.');
  console.error('\n  If this guide genuinely should never carry a plan, add it to EXEMPT in');
  console.error('  this script with a reason. Do not edit the baseline to silence it.');
  process.exit(1);
}

const pct = Math.round((covered.length / (covered.length + uncovered.length)) * 100);
console.log(`\ncheck-playbook-coverage: OK (${covered.length} covered, ${uncovered.length} known uncovered, ${pct}% of qualifying guides)`);
