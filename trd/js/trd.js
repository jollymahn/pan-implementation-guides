/* trd.js — TRD-specific interactivity (extends pan-guides.js)
   Handles: consultant notes toggle, conditional sections, view mode persistence */

(function () {
  'use strict';

  var VIEW_KEY = 'trd-view-mode';

  function initViewToggle() {
    var btn = document.querySelector('.trd-view-toggle');
    if (!btn) return;

    var saved = localStorage.getItem(VIEW_KEY);
    if (saved === 'customer') {
      document.body.classList.add('customer-view');
      btn.textContent = 'Customer View';
    } else {
      btn.textContent = 'Consultant View';
    }

    btn.addEventListener('click', function () {
      var isCustomer = document.body.classList.toggle('customer-view');
      btn.textContent = isCustomer ? 'Customer View' : 'Consultant View';
      localStorage.setItem(VIEW_KEY, isCustomer ? 'customer' : 'consultant');
    });
  }

  function initConditionalSections() {
    var sections = document.querySelectorAll('.trd-conditional-section[data-condition]');
    sections.forEach(function (section) {
      section.classList.add('hidden');
    });
  }

  function revealConditional(conditionName, selectedValue) {
    var sections = document.querySelectorAll(
      '.trd-conditional-section[data-condition="' + conditionName + '"]'
    );
    sections.forEach(function (section) {
      var showWhen = (section.getAttribute('data-show-when') || '').split(',').map(function (v) {
        return v.trim().toLowerCase();
      });
      var match = showWhen.indexOf(selectedValue.trim().toLowerCase()) !== -1;
      section.classList.toggle('hidden', !match);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initViewToggle();
    initConditionalSections();
  });

  window.trd = {
    revealConditional: revealConditional
  };
})();
