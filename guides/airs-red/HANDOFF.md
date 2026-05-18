# AIRS Red Teaming Guide — Handoff

## Status: DRAFT COMPLETE (all phases written, MD companion generated)

## What Was Done

### Research Phase
- Scraped 14 PAN docs pages into `pan-docs-reference/docs/ai-runtime-security/ai-red-teaming/`
- Analyzed 3 OpenAPI specs (management, data-plane, network-broker) from `workspace/scm/pan.dev/openapi-specs/prisma-airs-redteam/`
- Wrote `workspace/airs/airs-red/RESEARCH.md` — 1,019-line synthesis organized by guide phase

### Guide Build
- Scaffolded `docs/guides/airs-red/airs-red-teaming.html`
- Updated `docs/index.html` — Red Teaming card now active (was `coming-soon`), picker pill activated
- Drafted all 12 sections (8 phases + 4 reference):

| Section | Content | Collapsibles |
|---------|---------|-------------|
| Phase 1: Architecture Overview | Product overview, 3-plane components table, arch diagram, attack categories (4 categories, 28 subcategories), scan types, key concepts | 5 |
| Phase 2: Prerequisites | License, account/access, target endpoint requirements, network channel requirements (K8s, Helm, FQDNs), supported regions | 5 |
| Phase 3: Foundation | Deployment profile (CSP), IAM configuration, dashboard access | 3 |
| Phase 4: Configure Targets | Target types, add target (SCM/API tabs, 8 connection types), configure details (multi-turn, metadata, background), validate connection, agentic profiling | 5 |
| Phase 5: Network Channels | When needed (decision callout), create channel, deploy Helm client, verify connectivity | 4 |
| Phase 6: Scanning | Scan types, configure categories, Attack Library scan (STATIC), Dynamic scan (goal-driven), Custom prompt scans, monitor progress | 6 |
| Phase 7: Review Checkpoint | Hard gate checklist with checkboxes | 1 |
| Phase 8: Validation | Review reports (static/dynamic tabs), analyze results, remediation guidance, download reports | 4 |
| Day-2 Operations | Dashboard trends, CI/CD integration, manage targets, custom attack library, quota management | 5 |
| Troubleshooting | Licensing, target connectivity, scan failures (8 error types), API errors | 4 |
| Reference | API endpoints (3 planes consolidated), attack categories/subcategories, regional endpoints, limits/quotas | 4 |
| Deployment Checklist | Full checkbox checklist grouped by phase (7 groups) | 1 |

### Guide Stats
- 2,525 lines HTML
- 45 collapsible sections
- 28 code blocks with copy buttons
- 36 callouts (note, warning, danger, success)
- 12 tab groups (SCM UI / API switching)
- 11 checklist sections
- 0 console errors
- Browser-verified: sidebar, collapsibles, tabs, scroll spy, phase progress bar

## What Still Needs Doing

### Should-Do
1. **SCM screenshots** — `airs-red-screenshots/` directory has verification screenshots only. Key screens needed: dashboard overview, target creation, scan configuration, scan progress, report view, attack detail view.
3. **Live validation** — walk through the guide end-to-end against a real AIRS AI Red Teaming tenant. Follow guide verbatim, stop on any gap.
4. **Cross-links from Model Security and API Intercept guides** — add cloud-links pills pointing to this guide.

### Nice-to-Have
5. **CLARA scan type** — appears in API spec but undocumented. Investigate and add if it becomes documented.
6. **CI/CD integration example** — Day-2 section has a basic scan script; could add a full GitHub Actions/GitLab CI example matching the Model Security pattern.
7. **Custom prompt CSV template** — download and document the actual CSV column format.

### Gaps from Research (22 items in RESEARCH.md section 10)
- CLARA scan type undocumented
- Brand subcategory names not in docs
- MS Copilot Studio configuration flow incomplete
- IP allowlist for public endpoints not published
- Partial report credit costs unspecified

## Key Files
- Guide (HTML): `docs/guides/airs-red/airs-red-teaming.html`
- Guide (MD): `docs/guides/airs-red/airs-red-teaming.md`
- Research: `workspace/airs/airs-red/RESEARCH.md`
- Build prompt: `workspace/airs/airs-red/red-BUILD-PROMPT.md`
- Index: `docs/index.html` (card updated)
- Screenshots dir: `docs/guides/airs-red/airs-red-screenshots/`
