/* playbook-download.js — the playbook download element on a guide page.
 *
 * A guide carries one line of markup:
 *
 *   <div class="playbook-download" data-playbook="network-intercept"></div>
 *
 * and this script builds the rest: the description, the effort figures, the
 * deployment-model selector where a playbook has variants, and the button
 * that writes the workbook. Keeping the markup to one div means the bar can
 * change across 23 guides without editing 23 files.
 *
 * Requires, in this order:
 *   docs/shared/js/airs-engagement-model.js
 *   docs/shared/js/ooxml.js
 *   docs/shared/js/airs-playbooks.js
 *   docs/shared/js/playbook-download.js
 */
(function () {
  'use strict';

  const PB = window.AIRSPlaybooks;
  const OOXML = window.OOXML;
  if (!PB || !OOXML) return;

  const XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function render(host) {
    const id = host.dataset.playbook;
    const def = PB.PLAYBOOKS[id];
    if (!def) return;

    let variant = def.variants ? def.variants.default : null;

    host.classList.add('playbook-bar');
    host.innerHTML = '';

    const main = el('div', 'playbook-bar-main');
    main.appendChild(el('span', 'playbook-bar-title', `${def.name} delivery playbook`));
    main.appendChild(el('span', 'playbook-bar-text',
      'Every step in this guide as a tracked task with an owner, an effort estimate, and a milestone closing each phase. The workbook also carries the meeting schedule and the attendee list for each phase gate.'));
    const stats = el('span', 'playbook-bar-stats');
    main.appendChild(stats);
    host.appendChild(main);

    const controls = el('div', 'playbook-bar-controls');

    let select = null;
    if (def.variants) {
      const wrap = el('label', 'playbook-variant');
      wrap.appendChild(el('span', null, def.variants.label));
      select = document.createElement('select');
      def.variants.options.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o.id;
        opt.textContent = o.label;
        if (o.id === variant) opt.selected = true;
        select.appendChild(opt);
      });
      select.addEventListener('change', () => { variant = select.value; refresh(); });
      wrap.appendChild(select);
      wrap.title = def.variants.note;
      controls.appendChild(wrap);
    }

    const status = el('span', 'playbook-status');
    const btn = el('button', 'playbook-btn');
    btn.type = 'button';
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>';
    btn.appendChild(document.createTextNode('Download playbook (.xlsx)'));
    btn.addEventListener('click', () => {
      OOXML.triggerDownload(
        OOXML.buildXlsx(PB.buildSheets(id, { variant })),
        PB.fileName(id, { variant }),
        XLSX_MIME);
      status.textContent = 'Downloaded';
      setTimeout(() => { status.textContent = ''; }, 2600);
    });

    controls.appendChild(status);
    controls.appendChild(btn);
    host.appendChild(controls);

    function refresh() {
      const plan = PB.buildPlaybook(id, { variant });
      const tasks = plan.phases.reduce((t, p) => t + p.steps.length, 0);
      const pct = Math.round((PB.MARGIN - 1) * 100);
      stats.innerHTML = '';
      const parts = [
        [`${tasks}`, ' tasks'],
        [`${plan.phases.length}`, ' phases'],
        [`${plan.phases.length}`, ' milestones'],
        [`${plan.baseDays}`, ' base days'],
        [`${plan.plannedDays}`, ` planned days, including a ${pct}% contingency`]
      ];
      parts.forEach(([n, rest], i) => {
        if (i) stats.appendChild(document.createTextNode(' · '));
        const b = el('strong', null, n);
        stats.appendChild(b);
        stats.appendChild(document.createTextNode(rest));
      });
    }

    refresh();
  }

  document.querySelectorAll('.playbook-download[data-playbook]').forEach(render);
})();
