# CIE Guide — Backlog

Tracked items for the Cloud Identity Engine implementation guide. Check off items as they're completed.

## Content

- [ ] **Authentication flow diagrams** — Visual diagrams showing the SAML 2.0 SP-initiated flow for each IdP (Entra ID, Okta, Google). Show the redirect chain: user → firewall → CIE → IdP → CIE → firewall. Include OIDC flow diagram for Prisma Access Browser.
- [ ] **Screenshots** — Capture key screens during live validation (CIE Directories page, Entra consent prompt, Okta OIN install, SAML test result, firewall User-ID output).

## Validation

- [ ] **Live validation: Entra ID** — Walk through Phase 1–8 against a live Entra ID tenant + SCM.
- [ ] **Live validation: Okta** — Walk through Phase 3B + 4B against a live Okta org.
- [ ] **Live validation: Google Workspace** — Walk through Phase 3C + 4C against a live Google tenant.
- [ ] **Live validation: On-prem AD** — Walk through Phase 3D + 4D with Cloud Identity Agent.

## Enhancements

- [ ] **CIE regional endpoint URL table** — The PAN docs reference regional endpoints but never enumerate them. Research and add a concrete table of region → URL mappings.
- [ ] **OIDC setup sections** — Currently noted as Prisma Access Browser only. Add Phase 4 OIDC sections if scope expands.
- [ ] **CyberArk IdP section** — Requires PAN-OS 11.2+. Add Phase 3/4 sections when testable.
- [ ] **PingOne / PingFederate sections** — Add directory and SAML setup for Ping identity providers.
