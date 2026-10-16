#!/usr/bin/env node
/* check-playbooks.js — prove every playbook row still points at a real step.
 *
 * A playbook is a projection of a guide, so the two drift the moment a step is
 * renamed, moved, or added. The generated workbook is read away from the site
 * by a project manager who cannot tell a stale row from a current one, which
 * makes drift silent. This checker makes it loud.
 *
 * Checks, per playbook:
 *   1. The guide file exists on disk, for the playbook and for any step that
 *      cites a different guide.
 *   2. Every phase anchor resolves to an id in its guide.
 *   3. Every step heading appears in its guide, under its own anchor section.
 *   4. Every collapsible step inside a covered phase appears in the playbook,
 *      so a step added to a guide cannot quietly fall out of the plan.
 *   5. Every phase closes with a milestone carrying exit criteria, and opens
 *      or closes with a meeting carrying attendees and an agenda.
 *   6. Base effort rolls up to the pillar duration in the engagement model.
 *   7. The contingency is the single declared margin.
 *
 * Usage:
 *   node docs/shared/scripts/check-playbooks.js          exit 1 on any failure
 *   node docs/shared/scripts/check-playbooks.js --list   coverage report
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');
const Playbooks = require(path.join(ROOT, 'docs/shared/js/airs-playbooks.js'));
const Model = require(path.join(ROOT, 'docs/shared/js/airs-engagement-model.js'));

const LIST = process.argv.includes('--list');

const failures = [];
const warnings = [];
const fail = (pb, msg) => failures.push(`${pb}: ${msg}`);
const warn = (pb, msg) => warnings.push(`${pb}: ${msg}`);

// ── Guide parsing ────────────────────────────────────────────────────────────

/* Shared with scaffold-playbook.js. The scaffolder emits headings this checker
 * then matches byte for byte, so both must read a guide identically. */
const { decode, loadGuide } = require(path.join(__dirname, 'lib/playbook-guide-parser.js'));
// ── Checks ───────────────────────────────────────────────────────────────────

if (Playbooks.MARGIN !== 1.35) {
  failures.push(`airs-playbooks.js: MARGIN is ${Playbooks.MARGIN}, expected 1.35`);
}

const report = [];
const overrides = [];

Object.keys(Playbooks.PLAYBOOKS).forEach(id => {
  const def = Playbooks.PLAYBOOKS[id];
  const variants = def.variants ? def.variants.options.map(v => v.id) : [null];

  // Check 1 and 2 run once against the declared guide.
  const guide = loadGuide(def.guide);
  if (!guide) {
    fail(id, `guide not found on disk: ${def.guide}`);
    return;
  }

  variants.forEach(variant => {
    const label = variant ? `${id} [${variant}]` : id;

    /* The tab panels this variant selects, when the guide branches by tabs
     * rather than by section. A guide can carry several independent tab
     * groups, so one variant may select a panel in each: the K8s guide picks
     * a cloud, a tag collector, an IP-tag path and a traffic object path, and
     * all four follow from one choice. Empty means the playbook does not use
     * panels and a heading in any panel is fair game. */
    const vo = def.variants ? def.variants.options.find(o => o.id === variant) : null;
    const planes = vo ? (vo.planes || (vo.plane ? [vo.plane] : [])) : [];
    const planed = !!(def.variants && def.variants.options.some(o => o.plane || o.planes));
    let plan;
    try {
      plan = Playbooks.buildPlaybook(id, { variant });
    } catch (e) {
      fail(label, `buildPlaybook threw: ${e.message}`);
      return;
    }

    /* Which headings this variant claims, per guide and anchor. Check 4 reads
     * this back against the guide to find steps the playbook has missed. */
    const claimed = new Map(); // `${guide}#${anchor}` -> Set(headings)

    plan.phases.forEach(p => {
      if (!guide.ids.has(p.anchor)) {
        fail(label, `Phase ${p.num} anchor #${p.anchor} is not an h2 id in ${def.guide}`);
      }

      if (!p.steps.length) fail(label, `Phase ${p.num} (${p.title}) emits no steps`);

      const ms = p.milestone;
      if (!ms || !ms.name) fail(label, `Phase ${p.num} has no milestone`);
      else if (!ms.criteria || !ms.criteria.length) fail(label, `milestone "${ms.name}" has no exit criteria`);

      /* Not every phase earns a meeting. A short infrastructure build does
       * not need six of them, and inventing one per phase produces a schedule
       * nobody keeps. Meetings are optional per phase and checked when
       * present; the playbook as a whole still has to have some. */
      const mt = p.meeting;
      if (mt) {
        if (!mt.name) fail(label, `Phase ${p.num} has a meeting with no name`);
        if (!mt.required || !mt.required.length) fail(label, `meeting "${mt.name}" names no required attendees`);
        if (!mt.agenda || !mt.agenda.length) fail(label, `meeting "${mt.name}" has no agenda`);
        if (!mt.minutes) fail(label, `meeting "${mt.name}" has no length`);

        /* A meeting with no position in the task sequence cannot be placed on
         * a schedule, and a beforeStep that names a step this variant does
         * not emit would silently drop the meeting out of the plan. */
        const pos = mt.position || 'before';
        if (!['before', 'after', 'step'].includes(pos)) {
          fail(label, `meeting "${mt.name}" has position "${pos}", expected before, after or step`);
        }
        if (pos === 'step') {
          if (!mt.beforeStep) fail(label, `meeting "${mt.name}" is positioned at a step but names none`);
          else if (!p.steps.some(s => s.heading === mt.beforeStep)) {
            fail(label, `meeting "${mt.name}" is positioned before "${mt.beforeStep}", which Phase ${p.num} does not emit for this variant`);
          }
        }
        if (!mt.day) fail(label, `meeting "${mt.name}" was not placed in the task sequence`);
      }

      p.steps.forEach(s => {
        if (!s.task) fail(label, `step "${s.heading}" has no task wording`);
        if (!s.owner) fail(label, `step "${s.heading}" has no owner`);
        if (!(s.base > 0)) fail(label, `step "${s.heading}" has no base effort`);

        const expect = Math.ceil((s.base * Playbooks.MARGIN - 1e-9) / 0.5) * 0.5;
        if (Math.abs(s.planned - expect) > 0.001) {
          fail(label, `step "${s.heading}" planned effort is ${s.planned}, expected ${expect} from the margin rounded up to the half hour`);
        }

        /* The stakeholder column is only worth printing if it names the same
         * people the planner's persona sheet does. A free-typed role here
         * produces two rosters that look authoritative and disagree. */
        if (!s.who || !s.who.length) {
          fail(label, `step "${s.heading}" names no customer stakeholder`);
        } else {
          const personas = new Set((Model.PILLARS[def.pillar] || { personas: [] }).personas.map(x => x.role));
          s.who.filter(r => !personas.has(r)).forEach(r => {
            fail(label, `step "${s.heading}" names stakeholder "${r}", which is not a persona of ${def.pillar} in the engagement model`);
          });
          if (new Set(s.who).size !== s.who.length) {
            fail(label, `step "${s.heading}" lists a stakeholder twice`);
          }
        }

        const sg = loadGuide(s.guide);
        if (!sg) { fail(label, `step "${s.heading}" cites a guide not on disk: ${s.guide}`); return; }
        if (!sg.ids.has(s.anchor)) {
          fail(label, `step "${s.heading}" cites #${s.anchor}, not an h2 id in ${s.guide}`);
          return;
        }
        const sec = sg.sections.get(s.anchor);
        const want = decode(s.heading);

        /* A step inherits the planes of the variant that emitted it, so a
         * row carried under every platform has to sit outside the panels and
         * a platform-specific row has to sit inside one the variant selects. */
        const inVariant = s.variant && planes.length;
        const planeOk = h => !planed || (inVariant ? planes.includes(h.plane) : h.plane === null);

        /* A checklist row quotes a line item inside the phase body rather than
         * a collapsible header, so it is matched against the section text. */
        const hit = s.checklist
          ? sec.text.includes(want)
          : sec.heads.some(h => h.text === want && planeOk(h));
        if (!hit) {
          const where = planed ? ` in the ${inVariant ? planes.join('/') : 'all-platform'} panel` : '';
          fail(label, `step heading not found under ${s.guide}#${s.anchor}${where}: "${want}"`);
        }

        if (!s.checklist) {
          const key = `${s.guide}#${s.anchor}`;
          if (!claimed.has(key)) claimed.set(key, new Set());
          claimed.get(key).add(want);
        }
      });
    });

    // Check 4: every collapsible in a covered section is claimed or excluded.
    claimed.forEach((set, key) => {
      const [g, anchor] = key.split('#');
      const sec = loadGuide(g).sections.get(anchor);
      const excluded = ((def.excludes || {})[key] || []).map(e => decode(e.heading));

      /* Only steps this variant is responsible for. A GKE row is not missing
       * from an EKS playbook, so panels belonging to another platform are not
       * the selected variant's problem. */
      const mine = sec.heads.filter(h => !planed || h.plane === null || planes.includes(h.plane));
      const texts = mine.map(h => h.text);

      /* Staleness is judged against the whole section, not just the panels
       * this variant selects: an exclusion for a custom-adapter block is
       * still valid when the REST API variant cannot see it. What makes an
       * exclusion stale is the heading disappearing from the guide. */
      const allTexts = sec.heads.map(h => h.text);
      excluded.filter(h => !allTexts.includes(h)).forEach(h => {
        fail(label, `${key} excludes "${h}", which is no longer a step in that section`);
      });
      excluded.filter(h => set.has(h)).forEach(h => {
        fail(label, `${key} both carries and excludes "${h}"`);
      });

      const missed = [...new Set(texts)].filter(h => !set.has(h) && !excluded.includes(h));
      if (missed.length) {
        fail(label, `${key} has ${missed.length} step(s) the playbook neither carries nor excludes: ${missed.map(x => `"${x}"`).join(', ')}`);
      }
    });

    if (!plan.phases.some(p => p.meeting)) {
      fail(label, 'playbook schedules no meetings at all');
    }

    // Check 6: base effort against the pillar's phase durations.
    const pillar = Model.PILLARS[def.pillar];
    if (!pillar) {
      fail(label, `pillar "${def.pillar}" is not in the engagement model`);
    } else {
      /* Three ways a guide's scope maps onto the model, in order of
       * specificity. A guide that is exactly one component (an integration,
       * an elective) reconciles against that component's estimate. A guide
       * covering part of a pillar names the phases it delivers. Everything
       * else is the whole pillar. Each playbook declares which, so the
       * envelope is a stated decision rather than an accident. */
      let range;
      if (def.effortRange) {
        /* The guide genuinely covers more or less than the model's figure
         * for it. Shaving task estimates to hit a number nobody believes
         * makes the playbook useless, so a playbook may declare its own
         * range instead, on condition it says why. The note is mandatory and
         * every override is listed by --list, so the disagreements stay
         * visible and can be fed back into the engagement model. */
        if (!def.effortNote) {
          fail(label, 'effortRange is declared without an effortNote explaining why it differs from the model');
        }
        range = { min: def.effortRange[0], max: def.effortRange[1] };
        const comp = def.component ? Model.COMPONENTS[def.component] : null;
        overrides.push({
          label, declared: `${range.min}–${range.max}`,
          model: comp && comp.days ? `${comp.days[0]}–${comp.days[1]}` : 'n/a',
          note: def.effortNote
        });
      } else if (def.component) {
        const comp = Model.COMPONENTS[def.component];
        if (!comp) {
          fail(label, `component "${def.component}" is not in the engagement model`);
          range = { min: 0, max: Infinity };
        } else if (!comp.days) {
          fail(label, `component "${def.component}" carries no day estimate`);
          range = { min: 0, max: Infinity };
        } else {
          range = { min: comp.days[0], max: comp.days[1] };
        }
        if (comp && comp.requires && comp.requires.length && !comp.requires.includes(def.pillar)) {
          fail(label, `component "${def.component}" belongs to ${comp.requires.join(' or ')}, but the playbook claims pillar ${def.pillar}`);
        }
      } else {
        const covers = def.modelPhases
          ? pillar.phases.filter(ph => def.modelPhases.includes(ph.num))
          : pillar.phases;
        if (def.modelPhases && covers.length !== def.modelPhases.length) {
          fail(label, `modelPhases names a phase ${pillar.name} does not have`);
        }
        range = covers.reduce((acc, ph) => {
          const nums = (ph.duration.match(/[\d.]+/g) || ['0']).map(Number);
          acc.min += nums[0];
          acc.max += nums[nums.length - 1];
          return acc;
        }, { min: 0, max: 0 });
      }
      /* The model carries one estimate per pillar and knows nothing about
       * deployment models, so a faster variant legitimately costs less than
       * its minimum. The default variant is held to the full range, because
       * that is the one the model's figure describes; the others only have to
       * stay under the ceiling and within reach of the floor. */
      const isDefault = !def.variants || variant === def.variants.default;
      const floor = isDefault ? range.min : Math.round(range.min * 0.8 * 10) / 10;
      if (plan.baseDays < floor || plan.baseDays > range.max) {
        fail(label, `base effort ${plan.baseDays} days falls outside ${floor}–${range.max} days, derived from the engagement model's estimate for ${pillar.name}`);
      }
      report.push({
        label, tasks: plan.phases.reduce((t, p) => t + p.steps.length, 0),
        baseDays: plan.baseDays, plannedDays: plan.plannedDays,
        model: `${range.min}–${range.max}`
      });
    }

    // Roster coverage: a required attendee with no profile is worth flagging.
    Playbooks.buildRoster(plan)
      .filter(r => !r.knowledge)
      .forEach(r => warn(label, `required attendee "${r.role}" has no persona in the engagement model`));
  });
});

// ── Output ───────────────────────────────────────────────────────────────────

if (LIST) {
  console.log('Playbook coverage\n');
  const w = Math.max(...report.map(r => r.label.length), 8);
  console.log(`${'Playbook'.padEnd(w)}  Tasks  Base days  Planned days  Model estimate`);
  report.forEach(r => {
    console.log(`${r.label.padEnd(w)}  ${String(r.tasks).padStart(5)}  ${String(r.baseDays).padStart(9)}  ${String(r.plannedDays).padStart(12)}  ${r.model}`);
  });
  if (overrides.length) {
    console.log('\nPlaybooks that declare their own effort range, and why:');
    overrides.forEach(o => {
      console.log(`  ${o.label}: declared ${o.declared} d, model says ${o.model} d`);
      console.log(`    ${o.note}`);
    });
  }
  console.log(`\nContingency: ${Math.round((Playbooks.MARGIN - 1) * 100)}%`);
  console.log(`Playbooks defined: ${Object.keys(Playbooks.PLAYBOOKS).length}`);
}

/* A playbook nobody can download is not published, and a download bar
 * pointing at a playbook that does not exist renders an empty box. Both
 * directions are checked, the same way build-catalog.js checks that a nav
 * entry has a card. */
const WIRE = /<div class="playbook-download"[^>]*data-playbook="([^"]+)"/g;
const wired = new Map();
(function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    if (!e.name.endsWith('.html')) return;
    const html = fs.readFileSync(full, 'utf8');
    let m;
    WIRE.lastIndex = 0;
    while ((m = WIRE.exec(html)) !== null) {
      wired.set(m[1], path.relative(ROOT, full));
    }
  });
})(path.join(ROOT, 'docs/guides'));

Object.keys(Playbooks.PLAYBOOKS).forEach(id => {
  const def = Playbooks.PLAYBOOKS[id];
  if (!wired.has(id)) {
    failures.push(`${id}: no guide carries <div class="playbook-download" data-playbook="${id}">, so the playbook cannot be downloaded`);
  } else if (wired.get(id) !== def.guide) {
    failures.push(`${id}: the download bar is on ${wired.get(id)} but the playbook documents ${def.guide}`);
  }
});
[...wired.keys()].filter(id => !Playbooks.PLAYBOOKS[id]).forEach(id => {
  failures.push(`${wired.get(id)}: download bar references unknown playbook "${id}"`);
});

warnings.forEach(w => console.warn(`warning  ${w}`));

if (failures.length) {
  console.error(`\ncheck-playbooks: ${failures.length} failure(s)\n`);
  failures.forEach(f => console.error(`  ${f}`));
  process.exit(1);
}

console.log(`\ncheck-playbooks: OK (${report.length} playbook variant(s) checked)`);
