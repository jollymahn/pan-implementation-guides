#!/usr/bin/env node
/* scaffold-playbook.js — turn a finished guide into a playbook skeleton.
 *
 * A playbook is a projection of a guide: every collapsible step becomes a row
 * with an owner, an hours figure, and the roles who do the work. Building that
 * by hand means copying dozens of headings byte for byte, and check-playbooks.js
 * rejects the playbook if a single one differs. This script does the copying.
 *
 * What it will not do is estimate. Hours are judgement with real consequences:
 * they roll up into a customer-facing workbook and into the engagement model's
 * pillar duration, and an understated figure has already had to be corrected
 * once in this repo. Every emitted step carries `hours: null` and an owner of
 * 'TODO', and check-playbooks.js fails until a human has replaced them. The
 * machine does the transcription; the person does the estimate.
 *
 * Usage:
 *   node docs/shared/scripts/scaffold-playbook.js <guide-path> [--id <id>]
 *   node docs/shared/scripts/scaffold-playbook.js <guide-path> --phases 1,2,4
 *   node docs/shared/scripts/scaffold-playbook.js <guide-path> --variants eks,aks
 *
 *   --id        playbook key for the PLAYBOOKS registry. Defaults to the
 *               guide's file name without its extension.
 *   --phases    only scaffold these h2 sections, by position. Default: all
 *               that contain at least one collapsible.
 *   --variants  emit a variants block with these option ids, for a guide that
 *               branches by platform or deployment model.
 *
 * Output goes to stdout. Review it, paste it into docs/shared/js/airs-playbooks.js,
 * register it in PLAYBOOKS, add the download div to the guide, fill the hours,
 * then run check-playbooks.js until it passes.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { decode, loadGuide, ROOT } = require(path.join(__dirname, 'lib/playbook-guide-parser.js'));

// ── Arguments ────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const flag = name => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? null : argv[i + 1];
};
const guideArg = argv.find(a => !a.startsWith('--') && argv[argv.indexOf(a) - 1] !== '--id'
  && argv[argv.indexOf(a) - 1] !== '--phases' && argv[argv.indexOf(a) - 1] !== '--variants');

if (!guideArg) {
  console.error('usage: scaffold-playbook.js <guide-path> [--id <id>] [--phases 1,2,4] [--variants a,b]');
  process.exit(2);
}

const rel = guideArg.replace(/^\.\//, '');
const abs = path.join(ROOT, rel);
if (!fs.existsSync(abs)) {
  console.error(`scaffold-playbook: no such guide: ${rel}`);
  process.exit(2);
}

const id = flag('id') || path.basename(rel, '.html');
const onlyPhases = flag('phases') ? flag('phases').split(',').map(n => Number(n.trim())) : null;
const variantIds = flag('variants') ? flag('variants').split(',').map(s => s.trim()) : null;

// ── Read the guide ───────────────────────────────────────────────────────────

const guide = loadGuide(rel);
if (!guide) {
  console.error(`scaffold-playbook: could not parse ${rel}`);
  process.exit(2);
}

/* h2 ids in document order, which is the order a reader meets them and so the
 * order the phases take. The Map preserves insertion order from the parser. */
const anchors = [...guide.sections.keys()];

/* A section with no collapsible is prose: an overview, a reference appendix, a
 * related-guides list. It carries no tasks, so it is not a phase. */
const phaseAnchors = anchors.filter(a => guide.sections.get(a).heads.length > 0);

if (!phaseAnchors.length) {
  console.error(`scaffold-playbook: ${rel} has no h2 section containing a collapsible step.`);
  console.error('  A playbook is built from collapsible steps. Either the guide is not');
  console.error('  finished, or its steps are not wrapped in .collapsible blocks as the');
  console.error('  house pattern requires.');
  process.exit(1);
}

// ── Title helpers ────────────────────────────────────────────────────────────

const html = fs.readFileSync(abs, 'utf8');

function h2Title(anchorId) {
  const re = new RegExp(`<h2[^>]*\\sid="${anchorId}"[^>]*>([\\s\\S]*?)</h2>`);
  const m = re.exec(html);
  return m ? decode(m[1]).replace(/^\d+[.)]\s*/, '') : anchorId;
}

const esc = s => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/* A collapsible is not automatically a task. Guides wrap reference material in
 * the same markup: a diagram someone can open, a rationale, a troubleshooting
 * appendix. The real playbooks list those under `excludes` with a reason, which
 * is what lets check-playbooks.js fail on a step that is genuinely new instead
 * of ignoring every unmatched heading.
 *
 * These patterns guess at that split. They are a prompt for the author, not a
 * decision: anything matched is emitted as a commented-out exclude so it has to
 * be looked at, and nothing is dropped silently. */
const REFERENCE_HINTS = [
  [/^see\b/i,                       'Opens reference detail rather than describing work'],
  [/^(why|what|how it works|when)\b/i, 'Explanation rather than a task'],
  [/\b(diagram|topology|reference|appendix|glossary|cheat ?sheet)\b/i, 'Reference material'],
  [/\b(troubleshoot|symptom|if it (fails|does not))\b/i, 'Troubleshooting, not a planned step'],
  [/\b(recommended|option [a-z]|alternative)\b/i, 'Presents a choice rather than an action'],
  [/\b(screenshots?)\b/i,          'Screenshot group'],
];

function referenceReason(heading) {
  for (const [re, reason] of REFERENCE_HINTS) if (re.test(heading)) return reason;
  return null;
}

// ── Emit ─────────────────────────────────────────────────────────────────────

const CONST = id.toUpperCase().replace(/[^A-Z0-9]+/g, '_');
const out = [];
const L = s => out.push(s);

L(`/* ${h2Title(phaseAnchors[0])} … scaffolded from ${rel}`);
L(` * by scaffold-playbook.js on ${new Date().toISOString().slice(0, 10)}.`);
L(' *');
L(' * EVERY hours: null AND owner: \'TODO\' BELOW MUST BE REPLACED BEFORE THIS PASSES.');
L(' * The headings are transcribed byte for byte from the guide and should not be');
L(' * edited: check-playbooks.js matches them literally. If a heading looks wrong,');
L(' * fix it in the guide and re-run the scaffold.');
L(' */');
L(`const ${CONST} = {`);
L(`  id: '${esc(id)}',`);
L(`  name: 'TODO — display name',`);
L(`  pillar: 'TODO — pillar id from airs-engagement-model.js',`);
L(`  guide: '${esc(rel)}',`);
L(`  summary: 'TODO — one sentence a project manager reads before scoping.',`);
L('');

if (variantIds) {
  L('  variants: {');
  L("    key: 'TODO — camelCase key, e.g. deploymentModel',");
  L("    label: 'TODO — label shown above the picker',");
  L("    note: 'TODO — why the choice matters before download',");
  L(`    default: '${esc(variantIds[0])}',`);
  L('    options: [');
  variantIds.forEach((v, i) => {
    const comma = i === variantIds.length - 1 ? '' : ',';
    L(`      { id: '${esc(v)}', label: 'TODO', anchor: 'TODO — h2 id this variant's steps live under' }${comma}`);
  });
  L('    ]');
  L('  },');
  L('');
}

L('  phases: [');

let phaseNum = 0;
const skipped = [];
const suspected = [];

phaseAnchors.forEach(anchor => {
  phaseNum += 1;
  if (onlyPhases && !onlyPhases.includes(phaseNum)) {
    skipped.push({ num: phaseNum, anchor });
    return;
  }
  const sec = guide.sections.get(anchor);
  const title = h2Title(anchor);

  L('    {');
  L(`      num: ${phaseNum}, title: '${esc(title)}', anchor: '${esc(anchor)}',`);
  L("      objective: 'TODO — what this phase achieves, in one sentence.',");
  L('      steps: [');

  sec.heads.forEach(h => {
    const reason = referenceReason(h.text);
    const planeNote = h.plane ? `  // tab panel: ${h.plane}` : '';
    if (reason) {
      suspected.push({ anchor, heading: h.text, reason });
      L(`        /* LIKELY REFERENCE, NOT A TASK — ${reason}.`);
      L('           Move it to excludes below, or delete this comment and fill it in.');
      L(`        { heading: '${esc(h.text)}',${planeNote}`);
      L("          owner: 'TODO', hours: null, who: [], task: 'TODO' }, */");
      return;
    }
    L(`        { heading: '${esc(h.text)}',${planeNote}`);
    L("          owner: 'TODO',  // CUSTOMER | PANW | CUSTOMER / PANW");
    L('          hours: null,    // TODO');
    L('          who: [],        // TODO — P.* roles from the top of airs-playbooks.js');
    L("          task: 'TODO — what the delivery team actually does, in the imperative.' },");
  });

  L('      ],');
  L('      milestone: {');
  L(`        name: '${esc(title)} Milestone',`);
  L('        criteria: [');
  L("          'TODO — an observable condition, not an activity. Someone must be able");
  L("          //        to look at the system and say yes or no.'");
  L('        ]');
  L('      },');
  L('      meeting: {');
  L(`        name: 'TODO — ${esc(title)} review',`);
  L("        when: 'TODO', position: 'after', minutes: 60,");
  L("        required: [],  // TODO — roles from DELIVERY_ROLES");
  L('        optional: [],');
  L('        agenda: [');
  L("          'TODO — what the meeting decides, not what it covers.'");
  L('        ]');
  L('      }');
  L('    },');
});

L('  ]');
if (suspected.length) {
  L('');
  L('  /* Every heading the scaffolder judged to be reference rather than a task.');
  L('   * check-playbooks.js requires each one to be either a step or an exclude,');
  L('   * so leaving this list as-is is a decision, not a default. Delete any entry');
  L('   * that really is a task and write the step instead. */');
  L('  excludes: {');
  const byAnchor = suspected.reduce((m, s2) => {
    (m[s2.anchor] = m[s2.anchor] || []).push(s2);
    return m;
  }, {});
  Object.keys(byAnchor).forEach(a => {
    L(`    '${esc(rel)}#${esc(a)}': [`);
    byAnchor[a].forEach(s2 => {
      L(`      { heading: '${esc(s2.heading)}', reason: '${esc(s2.reason)}' },`);
    });
    L('    ],');
  });
  L('  },');
}
L('};');
L('');
L(`/* Register it:  '${esc(id)}': ${CONST},   in the PLAYBOOKS object.`);
L(` * Wire the guide: <div class="playbook-download" data-playbook="${esc(id)}"></div>`);
L(' * Then: node docs/shared/scripts/check-playbooks.js');
L(' */');

console.log(out.join('\n'));

// ── Operator summary, on stderr so it does not pollute the paste ─────────────

const taskCount = phaseAnchors
  .filter((_, i) => !onlyPhases || onlyPhases.includes(i + 1))
  .reduce((t, a) => t + guide.sections.get(a).heads.length, 0);

const proseSections = anchors.filter(a => guide.sections.get(a).heads.length === 0);

console.error('');
console.error(`scaffold-playbook: ${rel}`);
console.error(`  ${phaseAnchors.length} phase section(s) with steps, ${taskCount} collapsible(s) found`);
if (suspected.length) {
  console.error(`  ${suspected.length} judged reference rather than task, commented out and listed under excludes`);
}
if (skipped.length) {
  console.error(`  skipped by --phases: ${skipped.map(s => `${s.num} (${s.anchor})`).join(', ')}`);
}
if (proseSections.length) {
  console.error(`  ${proseSections.length} prose section(s) ignored, no collapsibles: ${proseSections.join(', ')}`);
}
const panes = new Set();
phaseAnchors.forEach(a => guide.sections.get(a).heads.forEach(h => h.plane && panes.add(h.plane)));
if (panes.size && !variantIds) {
  console.error('');
  console.error(`  NOTE: this guide branches into tab panels (${[...panes].join(', ')}).`);
  console.error('  Steps from every panel are emitted together, which is almost certainly');
  console.error('  wrong. Re-run with --variants to split them, or delete the rows that');
  console.error('  belong to panels this playbook does not cover.');
}
console.error('');
console.error('  Next: fill every TODO and hours: null, register in PLAYBOOKS, add the');
console.error('  download div, then run check-playbooks.js. It fails until they are done.');
console.error('');
