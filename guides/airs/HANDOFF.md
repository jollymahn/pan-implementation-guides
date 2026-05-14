# AIRS Guide — Handoff

## Status: Complete (index page + guide)

## What's Done

### AIRS API Intercept Guide (complete)
- `airs-api-intercept.html` — 1928-line guide, browser-verified, committed and pushed (`95fa899`)
- `airs-api-intercept.md` — companion Markdown version
- `airs-screenshots/` — empty directory with .gitkeep for future screenshots
- Added to site header nav and index page (commit `2ea4322`)

### Index Page Two-Column Layout (complete)
- `docs/index.html` restructured into `<div class="top-split">` two-column grid:
  - **Left column**: Cloud Deployment Guides (AWS/Azure/GCP picker + cards) — unchanged content
  - **Right column**: AIRS Deployment Guides with 4 cards:
    - API Intercept (live) — links to the guide
    - AI Model Security (coming-soon)
    - AI Red Teaming (coming-soon)
    - Runtime Firewall (coming-soon)
- AIRS card removed from Specialized Guides section (no duplicate)
- CSS was already committed; HTML restructuring is done but not yet committed/pushed

### Guide Build Prompt Template (complete)
- `workspace/GUIDE-BUILD-PROMPT.md` — reusable mega-prompt for kickstarting new guide builds

## What's Left
- Commit and push the index page HTML changes
- No other blockers — the AIRS API Intercept guide is complete and published
