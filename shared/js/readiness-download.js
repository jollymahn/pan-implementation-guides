/* readiness-download.js — the customer readiness workbook download element.
 *
 * A page carries one line of markup:
 *
 *   <div class="readiness-download" data-readiness="red-teaming"></div>
 *
 * and this script builds the rest. It sits on two kinds of page: the readiness
 * document itself, and the deployment guide for the same pillar, so a customer
 * sent either link can pull the workbook down.
 *
 * The workbook is the fillable form of the page. Every sheet carries the
 * document's own content plus the columns a customer writes back into, and it
 * is generated from the page at build time, so the two cannot disagree.
 *
 * Requires, in this order:
 *   docs/shared/js/ooxml.js
 *   docs/shared/js/airs-readiness-model.js
 *   docs/shared/js/readiness-download.js
 */
(function () {
  'use strict';

  var RD = window.AIRSReadiness;
  var OOXML = window.OOXML;
  if (!RD || !OOXML) return;

  var XLSX_MIME = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function render(host) {
    var id = host.dataset.readiness;
    var d = RD.READINESS[id];
    if (!d) return;
    var n = RD.counts(id);

    var bar = el('div', 'readiness-bar');

    var main = el('div', 'readiness-bar-main');
    main.appendChild(el('span', 'readiness-bar-title', d.name + ' readiness workbook'));
    main.appendChild(el('span', 'readiness-bar-text',
      'Everything the customer needs ready before the first working session, as a workbook they fill in and bring.'));

    var stats = el('span', 'readiness-bar-stats');
    stats.innerHTML =
      '<strong>' + n.people + '</strong> roles &middot; ' +
      '<strong>' + n.items + '</strong> items to supply &middot; ' +
      '<strong>' + n.lead + '</strong> with a lead time &middot; ' +
      '<strong>' + n.checklist + '</strong> checklist rows';
    main.appendChild(stats);
    bar.appendChild(main);

    var controls = el('div', 'readiness-bar-controls');
    var status = el('span', 'readiness-status');
    var btn = el('button', 'readiness-btn');
    btn.type = 'button';
    btn.textContent = 'Download workbook (.xlsx)';
    btn.addEventListener('click', function () {
      try {
        OOXML.triggerDownload(
          OOXML.buildXlsx(RD.sheetsFor(id)),
          RD.fileName(id),
          XLSX_MIME);
        status.textContent = 'Downloaded';
      } catch (err) {
        status.textContent = 'Download failed';
      }
      setTimeout(function () { status.textContent = ''; }, 2600);
    });

    controls.appendChild(status);
    controls.appendChild(btn);
    bar.appendChild(controls);

    host.appendChild(bar);
  }

  function init() {
    var hosts = document.querySelectorAll('.readiness-download');
    for (var i = 0; i < hosts.length; i++) render(hosts[i]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
