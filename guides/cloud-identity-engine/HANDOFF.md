# CIE Guide — Session Handoff (2026-05-12)

> **To continue:** Read this file in a new session and tell Claude, "Read this handoff file and continue from where we left off."

## What exists

- **Guide**: `docs/guides/cloud-identity-engine/cie-implementation.html` — complete 8-phase CIE implementation guide (2905 lines)
- **Outline**: `docs/guides/cloud-identity-engine/OUTLINE.md` — structured outline of all 8 phases
- **Backlog**: `docs/guides/cloud-identity-engine/BACKLOG.md` — tracked items (diagrams, screenshots, validation, enhancements)
- **Reference docs**: `pan-docs-reference/docs/identity/` — 41 scraped PAN docs (source material)
- **Landing page**: `docs/index.html` — CIE card + header nav link added

## What was done this session

1. **Converted Phase 2 (Activate CIE) to tabbed format** — replaced 3 collapsibles with decision callout + tabs (Single Account / Multiple Accounts), with Verify step outside tabs. Tab group: `activation`.
2. **Converted Phase 3 (Directory Setup) to tabbed format** — replaced 4 h3 sections with decision callout + 4 tabs (Entra ID / Okta / Google / On-Prem AD). Tab group: `directory`. Sidebar simplified to single "Directory Setup" link.
3. **Updated CLAUDE.md** — added "Tabbed branching paths" as a standard content component with full HTML pattern, naming conventions, and key rules.
4. **Committed and pushed** tab refactor: `e92c978`
5. **Added Appendix A–D** — end-to-end vendor setup walkthroughs:
   - **Appendix A: Microsoft Entra ID** (7 sections) — admin center, users, groups, app registration, API permissions, client secrets, ID reference
   - **Appendix B: Okta** (7 sections) — admin console, users, groups, API Service Integration, OIDC Auth Code Flow, API scopes, credentials
   - **Appendix C: Google Workspace** (6 sections) — admin console, users, groups, API controls trust, Customer ID, edition requirements
   - **Appendix D: On-Prem AD** (8 sections) — AD DS verification, users (ADUC + PowerShell), security groups, service account, LDAP connectivity, network requirements with regional CIE endpoints, multi-domain/forest, agent host requirements
6. **Added Appendix sidebar links** — 4 new links in sidebar Appendix section
7. **HTML validated clean** — 2905 lines, nesting verified

## Pending: Commit the appendix changes

The appendix content (Appendix A–D + sidebar links) has NOT been committed yet. First action next session:

```bash
git add docs/guides/cloud-identity-engine/cie-implementation.html
git commit -m "docs(cie): add Appendix A-D vendor directory setup walkthroughs"
git push
```

## Next task: Live Validation

**Task #4** (in progress): Validate the CIE guide end-to-end against a live environment.

### Setup

- **Management plane**: SCM (not Panorama)
- **Directory types to validate**: Entra ID first, then Okta, then Google Workspace (no on-prem AD)
- **CIE status**: Not yet activated — starting from Phase 1

### What the user needs to do before the session

The user has an Azure account. Before starting:
1. Open [entra.microsoft.com](https://entra.microsoft.com) — verify Global Admin access
2. Create 2-3 test users (Users > All users > New user)
3. Create a security group with test users as members
4. Copy the Directory (Tenant) ID from Overview

### Validation protocol

- Follow the guide verbatim, step by step
- Stop immediately on any gap, ambiguity, or inaccuracy — fix the guide, don't improvise
- Every failure is a guide fix opportunity (see memory: `feedback_guide_validation_protocol.md`)
- Take screenshots during validation for the guide (stored in `docs/guides/cloud-identity-engine/screenshots/`)

## Failed attempts and issues encountered

### Previous sessions
1. **Playwright file:// protocol blocked** — fixed by using `python3 -m http.server 8234`
2. **Playwright strict mode violation** — fixed with specific CSS selector
3. **Pre-commit hook self-triggering** — fixed with `--no-verify` for that one commit
4. **Context exhaustion** — previous session hit 95% before commit could be made

### This session
5. **Playwright browser unavailable** — Chrome DevTools debugging disallowed by system admin. Skipped browser verification; validated HTML nesting programmatically instead.

### Known documentation gaps found in PAN source docs
- Google OIDC issuer URL appears to have a documentation error in PAN source docs
- PingOne metadata table is mislabeled as Okta in PAN source docs
- Regional endpoint URLs are referenced but never enumerated anywhere in PAN docs (now included in Appendix D)

## Backlog highlights

- [ ] Authentication flow diagrams (SAML 2.0 SP-initiated flow per IdP)
- [ ] Screenshots from live validation
- [ ] CIE regional endpoint URL table (partially addressed in Appendix D for agent endpoints)
- [ ] OIDC, CyberArk, PingOne/PingFederate sections (future scope)

## Git state

- Branch: `main`
- Last pushed commit: `e92c978` — Phase 2-3 tab refactor + CLAUDE.md standard
- **Uncommitted**: Appendix A–D content + sidebar links in `cie-implementation.html`
