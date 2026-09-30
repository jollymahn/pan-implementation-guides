#!/usr/bin/env node
/**
 * Validate the landing-page news feed.
 *
 * The feed is hand-written on purpose: the tags line ("Outbound only, Inbound
 * path removed, PrivateLink") is editorial and no generator writes it from a
 * commit subject. The cost of hand-writing it is that people forget, and
 * nothing used to notice. This notices.
 *
 * Two jobs:
 *
 *   1. Validate every entry. Badge, ISO date, non-empty title and tags, and
 *      an href that actually resolves, including its fragment. A guide rename
 *      used to break a feed link silently.
 *
 *   2. Report guides that changed with no entry to show for it. Most of these
 *      are fine, because not every commit is news, so this is advisory and
 *      does not fail on its own. The one case that does fail is a brand new
 *      guide page: that is unambiguously news, and --staged blocks it.
 *
 * Usage:
 *   node docs/shared/scripts/check-news-feed.js            validate + report
 *   node docs/shared/scripts/check-news-feed.js --staged   pre-commit mode
 *   node docs/shared/scripts/check-news-feed.js --quiet    errors only
 *
 * Exit 1 on a validation error, or on a new guide page with no entry.
 * Mirrored by .github/workflows/news-feed-check.yml.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const DOCS_ROOT = path.join(REPO_ROOT, 'docs');
const FEED_PATH = path.join(DOCS_ROOT, 'shared', 'js', 'news-feed.js');
const FEED_REL = path.relative(REPO_ROOT, FEED_PATH);

const VALID_BADGES = new Set(['New', 'Updated']);
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const args = process.argv.slice(2);
const STAGED = args.includes('--staged');
const QUIET = args.includes('--quiet');

const errors = [];
const notes = [];

/**
 * Load NEWS_ITEMS without a browser. The feed guards its DOM work behind a
 * `typeof document` check precisely so it can be read here.
 */
function loadFeed() {
  const src = fs.readFileSync(FEED_PATH, 'utf8');
  const sandbox = { module: { exports: {} } };
  sandbox.exports = sandbox.module.exports;
  vm.createContext(sandbox);
  new vm.Script(src, { filename: FEED_REL }).runInContext(sandbox);
  return sandbox;
}

function isRealDate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

function validate(items, visibleCount) {
  if (!Array.isArray(items) || items.length === 0) {
    errors.push(`${FEED_REL}: NEWS_ITEMS is missing or empty.`);
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  let previousDate = null;

  items.forEach((item, i) => {
    const at = `${FEED_REL}: entry ${i + 1} (${item && item.title ? item.title : 'untitled'})`;

    for (const field of ['badge', 'date', 'title', 'href', 'tags']) {
      if (!item || typeof item[field] !== 'string' || item[field].trim() === '') {
        errors.push(`${at}: "${field}" is missing or empty.`);
      }
    }
    if (!item || typeof item.href !== 'string') return;

    if (!VALID_BADGES.has(item.badge)) {
      errors.push(`${at}: badge is "${item.badge}", expected "New" or "Updated".`);
    }

    if (!ISO_DATE_RE.test(item.date)) {
      errors.push(`${at}: date is "${item.date}", expected ISO 8601 like "2026-09-29".`);
    } else if (!isRealDate(item.date)) {
      errors.push(`${at}: date "${item.date}" is not a real calendar date.`);
    } else {
      if (item.date > today) {
        errors.push(`${at}: date "${item.date}" is in the future.`);
      }
      if (previousDate && item.date > previousDate) {
        errors.push(`${at}: out of order. Entries run newest first, but "${item.date}" is newer than the entry above it ("${previousDate}").`);
      }
      previousDate = item.date;
    }

    if (item.href.startsWith('/') || /^[a-z]+:/i.test(item.href)) {
      errors.push(`${at}: href "${item.href}" must be relative to docs/, not absolute or external.`);
      return;
    }

    const [file, fragment] = item.href.split('#');
    const target = path.join(DOCS_ROOT, file);
    if (!fs.existsSync(target)) {
      errors.push(`${at}: href "${item.href}" does not resolve (no docs/${file}).`);
      return;
    }
    if (fragment) {
      const html = fs.readFileSync(target, 'utf8');
      if (!html.includes(`id="${fragment}"`) && !html.includes(`id='${fragment}'`)) {
        errors.push(`${at}: href "${item.href}" points at #${fragment}, which does not exist in docs/${file}.`);
      }
    }
  });

  if (typeof visibleCount !== 'number' || visibleCount < 1) {
    errors.push(`${FEED_REL}: NEWS_VISIBLE_COUNT must be a positive number.`);
  } else if (items.length < visibleCount) {
    notes.push(`The panel shows up to ${visibleCount} entries and the feed only has ${items.length}.`);
  }
}

function git(argv) {
  try {
    return execFileSync('git', argv, { cwd: REPO_ROOT, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

/** Guide pages changed since the newest entry's date, with no entry pointing at them. */
function reportUnannounced(items) {
  const newest = items.length ? items[0].date : null;
  if (!newest) return;

  // The explicit time matters. Git's approxidate reads a bare "2026-09-29" as
  // something other than that day's midnight and returns nothing, which made
  // this report clean while eleven commits sat unannounced.
  const changed = git(['log', `--since=${newest} 00:00`, '--no-merges', '--format=', '--name-only',
                       '--', 'docs/guides'])
    .split('\n').map(s => s.trim()).filter(f => f.endsWith('.html') && !f.endsWith('/index.html'));
  if (!changed.length) return;

  const announced = new Set(items.map(i => 'docs/' + i.href.split('#')[0]));
  const missing = [...new Set(changed)].filter(f => !announced.has(f) && fs.existsSync(path.join(REPO_ROOT, f)));
  if (!missing.length) return;

  notes.push(`${missing.length} guide page(s) changed since the newest entry (${newest}) with no entry pointing at them:`);
  for (const f of missing) notes.push(`    ${f}`);
  notes.push('Add an entry for any of these a returning reader would care about. Tooling and typo fixes are not news.');
}

/** A brand new guide page is unambiguously news. Block the commit that adds one silently. */
function checkStaged(items) {
  const added = git(['diff', '--cached', '--name-only', '--diff-filter=A', '--', 'docs/guides'])
    .split('\n').map(s => s.trim()).filter(f => f.endsWith('.html') && !f.endsWith('/index.html'));
  if (!added.length) return;

  const announced = new Set(items.map(i => 'docs/' + i.href.split('#')[0]));
  const unannounced = added.filter(f => !announced.has(f));
  if (!unannounced.length) return;

  errors.push('New guide page(s) staged with no news feed entry:');
  for (const f of unannounced) errors.push(`    ${f}`);
  errors.push(`Add an entry to the top of ${FEED_REL}, or stage the page as part of a PR that does.`);
}

function main() {
  if (!fs.existsSync(FEED_PATH)) {
    console.error(`Cannot find ${FEED_REL}.`);
    process.exit(1);
  }

  let feed;
  try {
    feed = loadFeed();
  } catch (err) {
    console.error(`${FEED_REL} failed to parse: ${err.message}`);
    process.exit(1);
  }

  const items = feed.NEWS_ITEMS;
  validate(items, feed.NEWS_VISIBLE_COUNT);

  if (Array.isArray(items) && items.length) {
    if (STAGED) checkStaged(items);
    else reportUnannounced(items);
  }

  if (errors.length) {
    console.error('News feed check failed:\n');
    for (const e of errors) console.error('  ' + e);
    process.exit(1);
  }

  if (!QUIET) {
    console.log(`News feed OK. ${items.length} entr${items.length === 1 ? 'y' : 'ies'}, all links resolve.`);
    if (notes.length) {
      console.log('');
      for (const n of notes) console.log('  ' + n);
    }
  }
}

main();
