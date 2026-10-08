#!/usr/bin/env node
/**
 * Validate every local link and asset reference under docs/.
 *
 * The site is a tree of static files that cross-reference each other by
 * relative path. Nothing used to notice when a path went stale, so a guide
 * rename, a screenshot that was planned but never captured, or a copy-pasted
 * `../` too many all shipped to the public mirror as a 404 or a broken-image
 * icon. This notices.
 *
 * Three jobs:
 *
 *   1. Every local href/src resolves to a file on disk. This is the common
 *      case and catches renames, wrong `../` depth, and references to assets
 *      that were never committed.
 *
 *   2. No root-absolute links. `publish-guides.yml` copies the contents of
 *      docs/ to the root of the public repo, which GitHub Pages then serves
 *      under /pan-implementation-guides/. A link written as
 *      `/docs/guides/x.html` is therefore wrong twice: the /docs prefix does
 *      not exist in the published tree, and the repo-name prefix is missing.
 *      It resolves locally against the repo root and 404s in production, so
 *      it is exactly the kind of bug that survives a local check.
 *
 *   3. Every same-repo fragment points at an id that exists. A link to
 *      `guide.html#phase-3` that lands at the top of the page is a quieter
 *      failure than a 404 but just as wrong. Fragments are checked in
 *      authored content only: the panorama-cli/web-help mirror is scraped
 *      from PAN's DITA output and carries ~2000 anchors of the form
 *      `page.html#ID0ENFDM;` that the vendor's own pages do not define.
 *      Those are not ours to fix, and failing on them would mean nobody
 *      ever reads the output.
 *
 * Scope matches the publish workflow: superpowers/, templates/ and
 * shared/snippets/ are skipped because they are never published. Snippets
 * and templates also carry {{var}} and SECTION_LINK placeholders by design.
 *
 * Known limitation: this reads markup, so a URL assembled in JavaScript
 * (the airs-planner pillar table builds hrefs from a PILLARS object) is
 * invisible to it. Those need a browser to verify.
 *
 * Usage:
 *   node docs/shared/scripts/check-links.js           full report
 *   node docs/shared/scripts/check-links.js --check   exit 1 on any failure
 *   node docs/shared/scripts/check-links.js --quiet   errors only
 *
 * Exit 1 on a broken reference, a root-absolute link, or a dead fragment.
 * Mirrored by .github/workflows/link-check.yml.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const DOCS_ROOT = path.join(REPO_ROOT, 'docs');

// Mirrors the `rm -rf` exclusions in .github/workflows/publish-guides.yml.
// Nothing here reaches the public site, so a stale link in it is harmless.
const UNPUBLISHED = ['superpowers', 'templates', path.join('shared', 'snippets')];

// Schemes and forms that are not a local file reference.
const EXTERNAL_RE = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

// A JS template literal or a snippet variable, not a path. These are resolved
// at render time, so there is nothing on disk to check.
const PLACEHOLDER_RE = /\$\{|\{\{/;

// Scraped vendor documentation. File references still have to resolve; its
// DITA-era fragment ids do not.
const MIRROR = path.join('guides', 'panorama-cli', 'web-help');

const args = process.argv.slice(2);
const QUIET = args.includes('--quiet');

const errors = [];

function isUnpublished(relPath) {
  return UNPUBLISHED.some(
    (dir) => relPath === dir || relPath.startsWith(dir + path.sep)
  );
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (isUnpublished(path.relative(DOCS_ROOT, full))) continue;
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

/** Collect every id and name anchor a page offers as a link target. */
function collectAnchors(html) {
  const anchors = new Set();
  const re = /\s(?:id|name)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) anchors.add(m[1]);
  return anchors;
}

const anchorCache = new Map();
function anchorsFor(file) {
  if (!anchorCache.has(file)) {
    anchorCache.set(file, collectAnchors(fs.readFileSync(file, 'utf8')));
  }
  return anchorCache.get(file);
}

function main() {
  const pages = walk(DOCS_ROOT);
  let refs = 0;

  for (const page of pages) {
    const rel = path.relative(REPO_ROOT, page);
    const dir = path.dirname(page);
    const html = fs.readFileSync(page, 'utf8');

    const re = /(?:href|src)="([^"]*)"/g;
    let m;
    while ((m = re.exec(html))) {
      const url = m[1];

      if (!url || url.startsWith('#')) continue;
      if (EXTERNAL_RE.test(url)) continue;
      if (PLACEHOLDER_RE.test(url)) continue;

      if (url.startsWith('/')) {
        errors.push(
          `${rel}: root-absolute link "${url}" breaks on the published site ` +
            `(docs/ becomes the site root under /pan-implementation-guides/). ` +
            `Use a relative path.`
        );
        continue;
      }

      refs++;

      const [rawTarget, fragment] = url.split('#');
      const clean = rawTarget.split('?')[0];
      if (!clean) continue;

      let resolved;
      try {
        resolved = path.resolve(dir, decodeURIComponent(clean));
      } catch {
        errors.push(`${rel}: malformed reference "${url}"`);
        continue;
      }

      if (!fs.existsSync(resolved)) {
        errors.push(`${rel}: "${url}" does not resolve to a file`);
        continue;
      }

      const inMirror = path.relative(DOCS_ROOT, page).startsWith(MIRROR);
      if (fragment && resolved.endsWith('.html') && !inMirror) {
        if (!anchorsFor(resolved).has(fragment)) {
          errors.push(
            `${rel}: "${url}" resolves, but ` +
              `${path.relative(REPO_ROOT, resolved)} has no id="${fragment}"`
          );
        }
      }
    }
  }

  if (errors.length) {
    console.error('Link check failed:\n');
    for (const e of errors) console.error('  ' + e);
    console.error(`\n${errors.length} problem(s) across ${pages.length} page(s).`);
    process.exit(1);
  }

  if (!QUIET) {
    console.log(
      `Link check passed. ${refs} local reference(s) across ${pages.length} published page(s) all resolve.`
    );
  }
}

main();
