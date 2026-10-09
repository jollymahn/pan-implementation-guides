/* pov-build.js — turn an engagement register into a POV document and deck.
 *
 * Loads as a browser global (POVBuild) and as a Node module, so the builders
 * can be validated against python-docx and python-pptx without a browser.
 *
 *   POVBuild.povDoc(ctx)   -> a block list for OOXML.buildDocx
 *   POVBuild.povDeck(ctx)  -> a slide list for OOXML.buildPptx
 *
 * ctx = {
 *   customer, sponsor, consultant, startDate,   // typed in at generation time
 *   audience: 'consultant' | 'customer',
 *   selected: [componentId],                    // before dependency resolution
 *   model: AIRSModel
 * }
 *
 * One source, two audiences. The consultant document is the customer document
 * plus the material a customer should not read: effort in person-days, the
 * delivery pitfalls register, and the places where our own guides do not yet
 * carry the procedure. Nothing is written twice, so the two cannot disagree
 * about what is being proven.
 */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.POVBuild = api;
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ── Shared helpers ──────────────────────────────────────────────────── */

  // Unique, order-preserving. Several components share a business driver, and
  // an executive summary that repeats one reads as padding.
  function uniq(list) {
    const seen = new Set();
    return list.filter(v => (v == null || seen.has(v)) ? false : seen.add(v));
  }

  function sentence(list, conj) {
    const j = conj || 'and';
    if (list.length === 0) return '';
    if (list.length === 1) return list[0];
    return list.slice(0, -1).join(', ') + ' ' + j + ' ' + list[list.length - 1];
  }

  // A start date plus a week count, as a readable range. Dates are typed in by
  // the consultant and never stored, so an empty or unparseable value has to
  // degrade to a placeholder rather than throw.
  function dateRange(startISO, weeks) {
    const start = startISO ? new Date(startISO + 'T00:00:00') : null;
    if (!start || isNaN(start.getTime())) return 'To be agreed';
    const end = new Date(start.getTime());
    end.setDate(end.getDate() + weeks * 7 - 1);
    const f = d => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${f(start)} to ${f(end)}`;
  }

  function weekOf(startISO, n) {
    const start = startISO ? new Date(startISO + 'T00:00:00') : null;
    if (!start || isNaN(start.getTime())) return `Week ${n}`;
    const d = new Date(start.getTime());
    d.setDate(d.getDate() + (n - 1) * 7);
    return `Week ${n} (${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })})`;
  }

  function fallback(value, placeholder) {
    const s = String(value == null ? '' : value).trim();
    return s || placeholder;
  }

  /* resolve(ctx) -> everything both builders need, computed once.
   *
   * Both the document and the deck are projections of the same register, so
   * they are derived here rather than in each builder. A figure that appears
   * on a slide and in the document it accompanies has to be the same figure.
   */
  function resolve(ctx) {
    const M = ctx.model;
    const consultant = ctx.audience !== 'customer';
    const ids = M.resolveDependencies(ctx.selected || []);
    const added = ids.filter(id => (ctx.selected || []).indexOf(id) === -1);
    const register = M.buildRegister(ids, { audience: ctx.audience });

    // Component order follows ORDER, so pillars lead and integrations trail,
    // which is the order a reader expects to meet them in.
    const ordered = register.components.map(id => Object.assign({ id: id }, M.COMPONENTS[id]));

    // Prerequisites come from the pillars actually in scope, de-duplicated by
    // their text: two pillars both needing a TSG is one line on the checklist.
    const pillarIds = uniq(ordered.map(c => c.pillar || (c.group === 'pillar' ? c.id : null)).filter(Boolean));
    const prereqSeen = new Set();
    const prereqs = [];
    pillarIds.forEach(pid => {
      const p = M.PILLARS[pid];
      if (!p) return;
      (p.prerequisites || []).forEach(q => {
        if (prereqSeen.has(q.text)) return;
        prereqSeen.add(q.text);
        prereqs.push({ cat: q.cat, text: q.text, req: q.req });
      });
    });

    // Roles, same treatment. A persona named by two pillars is one person.
    const roleSeen = new Set();
    const roles = [];
    pillarIds.forEach(pid => {
      const p = M.PILLARS[pid];
      if (!p) return;
      (p.personas || []).forEach(r => {
        if (roleSeen.has(r.role)) return;
        roleSeen.add(r.role);
        roles.push(r);
      });
    });

    return {
      M: M,
      consultant: consultant,
      audienceLabel: consultant ? 'Consultant edition' : 'Customer edition',
      ids: ids,
      added: added.map(id => M.COMPONENTS[id]),
      register: register,
      components: ordered,
      pillarIds: pillarIds,
      prereqs: prereqs,
      roles: roles,
      weeks: register.weeks,
      customer: fallback(ctx.customer, '[Customer name]'),
      sponsor: fallback(ctx.sponsor, '[Executive sponsor]'),
      consultantName: fallback(ctx.consultant, '[Palo Alto Networks consultant]'),
      startDate: ctx.startDate || '',
      drivers: uniq(ordered.map(c => c.driver))
    };
  }

  /* ── The document ────────────────────────────────────────────────────── */

  function povDoc(ctx) {
    const r = resolve(ctx);
    const b = [];
    const push = (...xs) => xs.forEach(x => b.push(x));
    const h = (level, text) => push({ t: 'heading', level: level, text: text });
    const p = text => push({ t: 'para', text: text });

    /* Cover. The facts a reader checks before reading anything else: who it is
     * for, who wrote it, how long it runs, and which edition they are holding. */
    push({
      t: 'table',
      head: ['Field', 'Value'],
      rows: [
        ['Customer', r.customer],
        ['Executive sponsor', r.sponsor],
        ['Prepared by', r.consultantName],
        ['Engagement window', dateRange(r.startDate, r.weeks)],
        ['Duration', `${r.weeks} weeks`],
        ['Scope', `${r.components.length} components, ${r.register.criteria.length} success criteria, ${r.register.tests.length} validation tests`],
        ['Edition', r.audienceLabel]
      ],
      widths: [30, 70]
    });

    if (r.consultant) {
      push({
        t: 'callout', kind: 'warn',
        title: 'Consultant edition',
        text: 'This edition carries effort estimates, the delivery pitfalls register, and notes on documentation gaps. Generate the customer edition before sending anything to the customer.'
      });
    }

    push({ t: 'pagebreak' });

    /* 1. Executive summary. Written for the sponsor, who reads this section and
     * the success criteria table and nothing else. */
    h(1, '1. Executive summary');
    p(`${r.customer} is adopting AI faster than the controls around it. This proof of value puts Palo Alto Networks AI Runtime Security in front of real traffic in ${r.customer}'s own environment and tests, against criteria agreed in advance, whether it does what it claims.`);
    p(`The engagement runs for ${r.weeks} weeks (${dateRange(r.startDate, r.weeks)}) and covers ${sentence(r.components.filter(c => c.group === 'pillar' || c.group === 'elective').map(c => c.name))}.`);

    if (r.drivers.length) {
      p('It is scoped against the following business drivers:');
      push({ t: 'bullets', items: r.drivers });
    }

    push({
      t: 'callout', kind: 'note',
      title: 'What success means',
      text: `${r.register.criteria.length} success criteria, each with at least one validation test that produces a named piece of evidence. The proof of value succeeds when every criterion is met and the evidence pack is signed off by ${r.sponsor}. Criteria are agreed before work starts, so the result is not a matter of opinion at the end.`
    });

    p('Nothing in this plan is a demonstration on Palo Alto Networks infrastructure. Every test runs in the customer tenant, against customer traffic or a customer-nominated test application, and produces an artefact the customer keeps.');

    /* 2. Objectives. Each component justified by the driver it serves, so no
     * line item exists only because it was available to select. */
    h(1, '2. Objectives');
    p('Every component in scope is here because it answers a question the business is asking. If a line below does not map to a question worth answering, it should be cut from the scope rather than carried.');
    push({
      t: 'table',
      head: ['Component', 'Question it answers'],
      rows: r.components.map(c => [c.name, c.driver]),
      widths: [30, 70]
    });

    /* 3. Scope. */
    h(1, '3. Scope');
    h(2, '3.1 In scope');
    push({
      t: 'table',
      head: ['Component', 'Category', 'What gets proven'],
      rows: r.components.map(c => [c.name, r.M.GROUP_LABELS[c.group] || c.group, c.summary]),
      widths: [22, 20, 58]
    });

    if (r.added.length) {
      push({
        t: 'callout', kind: 'note',
        title: 'Added as a dependency',
        text: `${sentence(r.added.map(c => c.name))} ${r.added.length === 1 ? 'is' : 'are'} included because the selected scope cannot be proven without ${r.added.length === 1 ? 'it' : 'them'}. ${r.added.length === 1 ? 'It is' : 'They are'} in scope and carried in the plan below.`
      });
    }

    h(2, '3.2 Out of scope');
    p('The following are explicitly excluded. Each is a common source of scope drift, so naming them here is cheaper than arguing about them in week four.');
    push({
      t: 'bullets',
      items: [
        'Production rollout beyond the agreed test application or traffic sample. The proof of value proves the control works; rolling it out is a separate project.',
        'Migration of existing security policy from another vendor.',
        'Custom development against the API beyond the integrations listed in section 3.1.',
        'Performance and load testing at production volume. Latency is measured on the test path, not benchmarked.',
        'Training and enablement beyond the handover session in the final week.',
        'Remediation of findings. The proof of value reports what it finds; fixing it is the customer\'s decision.'
      ]
    });

    h(2, '3.3 Assumptions');
    push({
      t: 'bullets',
      items: [
        `${r.customer} provides the prerequisites in section 7 before week one begins.`,
        'A named customer technical owner is available for the duration, not just at the kick-off.',
        'Change approval for the test path is obtained before the engagement starts, not during it.',
        'Test traffic is representative of production. A proof of value run against synthetic traffic proves only that the product handles synthetic traffic.'
      ]
    });

    push({ t: 'pagebreak' });

    /* 4. Success criteria. The register, and the reason the engagement can be
     * called passed or failed rather than argued about. */
    h(1, '4. Success criteria');
    p(`The ${r.register.criteria.length} criteria below are agreed before work starts. Each is phrased as an observable outcome rather than a task completed, and each is tested by one or more of the validation tests in section 5.`);
    push({
      t: 'table',
      head: ['ID', 'Component', 'Criterion', 'Tests'],
      rows: r.register.criteria.map(c => [
        c.id, c.componentName, c.criterion, c.tests.map(t => t.id).join(', ')
      ]),
      widths: [8, 20, 56, 16]
    });

    push({
      t: 'callout', kind: 'note',
      title: 'Sign-off',
      text: `Each criterion is marked met or not met against its evidence at the close-out review. A criterion with no evidence is not met, regardless of what was observed during the engagement.`
    });

    push({ t: 'pagebreak' });

    /* 5. Validation plan. One block per test, so a test can be handed to an
     * engineer on its own without the rest of the document. */
    h(1, '5. Validation plan');
    p('Each test below states what to do, what to expect, and what to keep. The evidence column is the deliverable: a test that was run but produced no artefact cannot be shown to anyone who was not in the room.');

    r.components.forEach(c => {
      const tests = r.register.tests.filter(t => t.component === c.id);
      if (!tests.length) return;
      h(2, c.name);
      p(c.summary);
      push({
        t: 'table',
        head: ['Test', 'Action', 'Expected result', 'Evidence'],
        rows: tests.map(t => [
          `${t.id}\n(${t.sc})`, t.action, t.expect, t.evidence
        ]),
        widths: [10, 30, 30, 30]
      });
      push({
        t: 'table',
        head: ['Test', 'Procedure'],
        rows: tests.map(t => [t.id, `${t.step} of ${t.href}`]),
        widths: [10, 90]
      });
      if (r.consultant && c.gap) {
        push({
          t: 'callout', kind: 'warn',
          title: 'No published procedure',
          text: `The implementation guides do not yet carry a step-by-step procedure for ${c.name}. The citation above points at the nearest published section. Budget time to work this out in the tenant, and feed the result back into the guide.`
        });
      }
    });

    push({ t: 'pagebreak' });

    /* 6. Schedule. */
    h(1, '6. Schedule');
    p(`The plan runs ${r.weeks} weeks. Build work leads, validation lands in the back half, and each component's tests are grouped into a single week so a failed test can be re-run without disturbing the rest of the plan.`);
    push({
      t: 'table',
      head: ['Week', 'Focus', 'Validation'],
      rows: scheduleRows(r),
      widths: [18, 44, 38]
    });

    /* 7. Prerequisites. */
    h(1, '7. Prerequisites');
    p(`The items below are needed before week one. ${r.customer} owns all of them. The single most common cause of a proof of value slipping is a prerequisite that was agreed in principle and not actually provisioned, so each line is either done or it is not.`);
    const byCat = {};
    r.prereqs.forEach(q => { (byCat[q.cat] = byCat[q.cat] || []).push(q); });
    Object.keys(byCat).forEach(cat => {
      h(2, cat);
      push({
        t: 'table',
        head: ['Required', 'Item', 'Status'],
        rows: byCat[cat].map(q => [q.req ? 'Yes' : 'If applicable', q.text, '']),
        widths: [16, 64, 20]
      });
    });

    /* 8. Roles. */
    h(1, '8. Roles and responsibilities');
    p('Each role below has to be filled by a named person before the engagement starts. The risk column states what happens when it is not, which is the argument for naming someone rather than assigning a team.');
    push({
      t: 'table',
      head: ['Role', 'Needs to know', 'Decides', 'Risk if unfilled'],
      rows: r.roles.map(x => [
        x.role + (x.req ? '' : ' (optional)'), x.knowledge, x.authority, x.risk
      ]),
      widths: [18, 29, 29, 24]
    });

    /* 9. Exit. */
    h(1, '9. Exit criteria and handover');
    p('The engagement closes when all of the following are true:');
    push({
      t: 'bullets',
      items: [
        `All ${r.register.criteria.length} success criteria are marked met or not met, with evidence attached to each.`,
        'The evidence pack is handed over as a single archive, owned by the customer.',
        `A close-out review has been held with ${r.sponsor}, covering the result of each criterion.`,
        'A written recommendation on production rollout has been delivered, including what would need to change.',
        'Any configuration left running in the customer tenant is either documented for retention or removed.'
      ]
    });
    p('A criterion that is not met is a finding, not a failure. The value of the engagement is a decision backed by evidence, and evidence that a control does not fit is worth as much as evidence that it does.');

    push({ t: 'pagebreak' });

    /* Appendix A. The citation list, so a reader can follow any test back to a
     * published procedure without going through section 5 again. */
    h(1, 'Appendix A. Reference guides');
    p('Every validation test in section 5 follows a published procedure. The guides below are the sources.');
    push({
      t: 'table',
      head: ['Component', 'Guide'],
      rows: uniqRows(r.register.tests.map(t => [t.componentName, t.href])),
      widths: [26, 74]
    });

    /* Appendix B is the whole reason there are two editions. */
    if (r.consultant) {
      push({ t: 'pagebreak' });
      h(1, 'Appendix B. Delivery notes');
      p('This appendix is in the consultant edition only.');

      h(2, 'B.1 Effort');
      p(`Estimated delivery effort is ${r.M.fmtRange(r.register.days.min, r.register.days.max)}, which packs into ${r.weeks} weeks at five working days. The estimate is build and validation effort only. It excludes travel, customer-side delay, and the re-run of any test that fails first time.`);
      push({
        t: 'table',
        head: ['Component', 'Effort (days)'],
        rows: r.components.map(c => {
          const d = r.M.componentDays(c.id);
          return [c.name, r.M.fmtRange(d.min, d.max)];
        }),
        widths: [70, 30]
      });

      h(2, 'B.2 Decisions that are expensive to revisit');
      p('Each of the following is cheap to decide early and costly to change once delivery has started. Raise them in the kick-off rather than when they bite.');
      push({
        t: 'table',
        head: ['Decision', 'When it is made', 'Why it is expensive later'],
        rows: r.M.LIFECYCLE_PITFALLS.map(x => [x[0], x[1], x[2]]),
        widths: [20, 26, 54]
      });

      const gaps = r.components.filter(c => c.gap);
      if (gaps.length) {
        h(2, 'B.3 Components with no published procedure');
        p('The implementation guides do not yet carry a step-by-step procedure for the components below. Their citations point at the nearest published section. Allow extra time, and contribute the procedure back once it is worked out.');
        push({ t: 'bullets', items: gaps.map(c => `${c.name}: ${c.gap === true ? 'no published procedure' : c.gap}`) });
      }
    }

    return {
      title: 'AI Runtime Security Proof of Value',
      subtitle: `${r.customer} · ${r.audienceLabel}`,
      blocks: b
    };
  }

  // Rows are built from the tests' own week numbers, so the schedule cannot
  // drift from the register it is supposed to summarise.
  function scheduleRows(r) {
    const rows = [];
    for (let w = 1; w <= r.weeks; w++) {
      const tests = r.register.tests.filter(t => t.week === w);
      const names = uniq(tests.map(t => t.componentName));
      const focus = w === 1
        ? 'Kick-off, prerequisite confirmation, tenant and access setup'
        : (names.length ? `Build and validate: ${sentence(names)}` : 'Build and configuration');
      const val = tests.length
        ? `${tests.length} test${tests.length === 1 ? '' : 's'} (${tests.map(t => t.id).join(', ')})`
        : 'None scheduled';
      rows.push([weekOf(r.startDate, w), w === r.weeks ? 'Close-out review, evidence pack handover, rollout recommendation' : focus, val]);
    }
    return rows;
  }

  function uniqRows(rows) {
    const seen = new Set();
    return rows.filter(row => {
      const k = row.join('\u0000');
      return seen.has(k) ? false : seen.add(k);
    });
  }

  /* ── The deck ────────────────────────────────────────────────────────── */

  /* The deck is not the document compressed. It carries the executive summary,
   * the objectives and the success criteria, which is what a sponsor needs in
   * a room, and leaves the validation detail to the document. */
  function povDeck(ctx) {
    const r = resolve(ctx);
    const slides = [];

    slides.push({
      layout: 'title',
      title: 'AI Runtime Security Proof of Value',
      subtitle: `${r.customer} · ${dateRange(r.startDate, r.weeks)} · ${r.audienceLabel}`,
      notes: `Prepared by ${r.consultantName}. ${r.weeks} weeks, ${r.register.criteria.length} success criteria, ${r.register.tests.length} validation tests. Open by confirming the sponsor agrees with the criteria on slide 4, because everything after that depends on it.`
    });

    slides.push({
      title: 'Why we are here',
      bullets: r.drivers.slice(0, 6),
      notes: 'These are the questions the business is asking, taken from the components in scope. If the sponsor names a question that is not on this slide, the scope is wrong and it is cheaper to find that out now.'
    });

    slides.push({
      title: 'What we will prove',
      subtitle: `${r.components.length} components over ${r.weeks} weeks`,
      bullets: r.components.slice(0, 10).map(c => ({ text: `${c.name}: ${c.summary}`, sub: c.group !== 'pillar' })),
      notes: r.components.length > 10
        ? `${r.components.length - 10} further components are listed in section 3.1 of the plan.`
        : 'Everything in scope is on this slide. Nothing is proven that is not listed here.'
    });

    slides.push({
      title: 'What success looks like',
      subtitle: 'Agreed before work starts, so the result is not a matter of opinion at the end',
      table: {
        head: ['ID', 'Criterion'],
        rows: r.register.criteria.slice(0, 8).map(c => [c.id, c.criterion])
      },
      notes: `${r.register.criteria.length} criteria in total; the first ${Math.min(8, r.register.criteria.length)} are shown. Each is an observable outcome, not a task completed. Ask the sponsor to challenge any of them now.`
    });

    slides.push({
      title: 'How we prove it',
      bullets: [
        `${r.register.tests.length} validation tests, each tied to a success criterion.`,
        'Every test states the action, the expected result, and the evidence it produces.',
        'Every test runs in your tenant, against your traffic or your nominated test application.',
        'Every test follows a published Palo Alto Networks procedure, cited in the plan.',
        'The evidence pack is yours at the end, whatever the result.'
      ],
      notes: 'The point to land: this is not a demonstration on our infrastructure. If a criterion is not met, that is a finding the customer keeps, and it is worth as much as a pass.'
    });

    slides.push({
      title: 'Schedule',
      table: {
        head: ['Week', 'Focus', 'Validation'],
        rows: scheduleRows(r).slice(0, 8)
      },
      notes: `${r.weeks} weeks total. Build leads, validation lands in the back half, and each component's tests sit in one week so a failed test can be re-run without moving anything else.`
    });

    slides.push({
      title: 'What we need from you',
      bullets: [
        `${r.prereqs.filter(q => q.req).length} required prerequisites, listed in section 7 of the plan.`,
        'A named technical owner available for the duration, not just at kick-off.',
        'Change approval for the test path, obtained before week one.',
        'Test traffic that is representative of production.',
        `${r.sponsor} available for the close-out review.`
      ],
      notes: 'The most common cause of a slip is a prerequisite agreed in principle and not provisioned. Get a date against each one before leaving the room.'
    });

    slides.push({
      title: 'What happens next',
      bullets: [
        'Agree the success criteria and sign off this plan.',
        'Confirm prerequisites and set the start date.',
        'Run the engagement, gathering evidence against each criterion.',
        'Close-out review: every criterion marked met or not met, with evidence.',
        'Written recommendation on production rollout.'
      ],
      notes: 'Ask for two things before the meeting ends: sign-off on the criteria, and a date for the prerequisites.'
    });

    if (r.consultant) {
      slides.push({
        title: 'Effort and staffing',
        subtitle: 'Consultant edition only, do not present to the customer',
        table: {
          head: ['Component', 'Effort (days)'],
          rows: r.components.slice(0, 10).map(c => {
            const d = r.M.componentDays(c.id);
            return [c.name, r.M.fmtRange(d.min, d.max)];
          }).concat([['Total', r.M.fmtRange(r.register.days.min, r.register.days.max)]])
        },
        notes: 'Build and validation effort only. Excludes travel, customer-side delay, and re-runs.'
      });

      const gaps = r.components.filter(c => c.gap);
      slides.push({
        title: 'Watch-outs',
        subtitle: 'Consultant edition only, do not present to the customer',
        bullets: r.M.LIFECYCLE_PITFALLS.slice(0, 5).map(x => `${x[0]}: ${x[2]}`)
          .concat(gaps.length ? [`No published procedure yet for ${sentence(gaps.map(c => c.name))}. Allow extra time.`] : []),
        notes: 'Raise these at kick-off rather than when they bite. Each is cheap to decide early and costly to change once delivery has started.'
      });
    }

    return { slides: slides };
  }

  return { povDoc: povDoc, povDeck: povDeck, resolve: resolve, dateRange: dateRange };
}));
