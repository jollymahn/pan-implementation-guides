# AIRS Model Security Guide — Handoff

## Status: DRAFT COMPLETE (all phases written, .md companion generated)

## What Was Done

### Research Phase
- Scraped 14 PAN docs pages into `pan-docs-reference/docs/ai-runtime-security/ai-model-security/`
- Analyzed 2 OpenAPI specs (management + dataplane) from `workspace/scm/pan.dev/openapi-specs/prisma-airs-model-security/`
- Wrote `workspace/airs/airs-model/RESEARCH.md` — comprehensive synthesis organized by guide phase

### Guide Build
- Scaffolded `docs/guides/airs-model/airs-model-security.html` (via /new-guide skill)
- Updated `docs/index.html` — Model Security card is now active (was `coming-soon`)
- Generated companion `docs/guides/airs-model/airs-model-security.md` (60KB)
- Drafted all 11 sections (7 phases + 4 reference):

| Section | Content | Collapsibles |
|---------|---------|-------------|
| Phase 1: Architecture Overview | Product overview, components table, arch-diagram, threat categories, key concepts | 5 |
| Phase 2: Prerequisites | License, account, scanner requirements, network FQDNs, registry support | 5 |
| Phase 3: Foundation | Deployment profile, IAM, service account (SCM + API tabs) | 3 |
| Phase 4: Configuration | Default groups, rules reference, rule states, parameters, custom groups (SCM + API + CLI tabs) | 5 |
| Phase 5: Scanning | Client install, env config, HF/S3/GCS/Azure/local scans, results viewing, config options (CLI + SDK + API tabs) | 7 |
| Phase 6: Review Checkpoint | Hard gate checklist with checkboxes | 1 (checklist) |
| Phase 7: Validation | Safe model, threat model, SCM dashboard, fingerprinting verification | 4 |
| Day-2 Operations | Monitor health, tune policies, manage versions, labels, report threats | 5 |
| Troubleshooting | Licensing, connectivity, results, API error codes | 4 |
| Reference | 47 model formats, API endpoints, regional URLs, limits | 4 |
| Deployment Checklist | Full checkbox checklist grouped by phase | 1 (checklist) |

### Guide Stats
- 2,041 lines HTML
- 42 collapsible sections
- 32 code blocks with copy buttons
- 18 verification callouts
- 8 mgmt-tabs groups (SCM UI / API / CLI / SDK switching)
- 0 placeholder stubs remaining
- User confirmed "looks pretty good" via localhost:8080 visual check

## What Still Needs Doing

### Must-Do
1. **Regional API endpoints** — the endpoints for EU-Germany, India, Singapore in the Reference section are educated guesses (`api.de.sase`, `api.in.sase`, `api.sg.sase`). Verify against actual PAN documentation or API.

### Should-Do
2. **SCM screenshots** — `airs-model-screenshots/` directory is empty. Key screens needed: deployment profile activation, security groups list, rule configuration, scan results dashboard (allowed vs blocked), scan detail view with per-rule evaluations, files tab.
3. **CI/CD integration example** — Day-2 section mentions CI/CD but doesn't include a concrete GitHub Actions / GitLab CI example. Add a collapsible with sample pipeline YAML.
4. **Live validation** — walk through the guide end-to-end against a real AIRS Model Security tenant. Follow guide verbatim, stop on any gap.

### Nice-to-Have
5. **Arch-diagram rendering** — the box-drawing character diagram uses HTML entities. Verify it renders correctly across browsers and font sizes.
6. **Cross-link to AIRS API Intercept** — the cloud-links bar has a link; verify path is correct.

### Pending Validation Tasks (in task list)
- #12: Capture SCM screenshots for AIRS API Intercept guide
- #14: Capture SCM screenshots for AIRS Model Security guide
- #15: Live validation: AIRS API Intercept guide against SCM tenant
- #13: Live validation: AIRS Model Security guide against SCM tenant

## Next Guide: AIRS Red Teaming
- Build prompt ready at `workspace/airs/airs-red/red-BUILD-PROMPT.md`
- 14 source URLs (PAN docs for AI Red Teaming)
- Same workflow: scrape → research → scaffold → draft phases

## Key Files
- Guide (HTML): `docs/guides/airs-model/airs-model-security.html`
- Guide (MD): `docs/guides/airs-model/airs-model-security.md`
- Research: `workspace/airs/airs-model/RESEARCH.md`
- Build prompt: `workspace/airs/airs-model/AIRS-MODEL-SECURITY-PROMPT.md`
- Index: `docs/index.html` (card updated)
- Screenshots dir: `docs/guides/airs-model/airs-model-screenshots/` (empty, .gitkeep)
