# HLD-SPEC.md — High-Level Design Specification

**Version:** 0.1 (Draft)
**Last updated:** 2026-09-23
**First product:** Cloud NGFW for AWS & Azure

---

## 1. Purpose

A High-Level Design (HLD) records the architecture and the decisions for a specific customer engagement. It sits between the TRD and the deployment guide: the TRD says what the customer has and needs, the HLD says what will be built and why, the guide says how to build it.

| Document | Purpose | Audience |
|---|---|---|
| **TRD** | Capture what the customer has (environment, applications, constraints) | PS Consultant + Customer |
| **HLD** | Record the target architecture and the decisions that produced it | PS Consultant + Customer architecture/change boards |
| **Deployment Guide** | Step-by-step instructions for how to deploy and configure | PS Consultant executing the work |
| **Playbook** | Internal consultant guidance, field tips, competitive context | PS Consultant only |

The TRD collects; the HLD decides; the guide executes; the playbook advises.

The HLD is the document the customer keeps. Long after the engagement closes, the operations team reads §6 to find out why the estate is shaped the way it is, and reads §19 to run it. Everything else in the document exists to support those two readings.

---

## 2. Design Principles

### 2.1 Decisions, Not Procedure

The HLD records **what was chosen and why**. It never restates build steps.

| Belongs in the HLD | Belongs in the guide |
|---|---|
| "The Combined design is selected because inbound UDP workloads are in scope." | "Step 5.3 — create the GWLB endpoint in each firewall subnet." |
| "Appliance mode is required on the security VPC attachment to preserve flow symmetry." | "Run `aws ec2 modify-transit-gateway-vpc-attachment --options ApplianceModeSupport=enable`." |
| "Logs are sent to Strata Logging Service in `<region>`; the region cannot be changed later." | "Step 2A.4 — bind the log forwarding profile to the device group." |

When a section needs to point at procedure, it references the guide phase (§17.1 carries the phase map) rather than reproducing it. A step that appears in two documents will be wrong in one of them within a release.

### 2.2 Placeholder Discipline

The template is **blank by default**. Nothing engagement-specific is ever invented, including plausible-looking examples.

| Marker | Meaning |
|---|---|
| `<angle-bracket>` | A value the consultant must supply |
| `e.g., …` in a shaded cell | Format hint only — must be replaced, not kept |
| ` / `-separated cell | Decision point — select one, delete the rest |
| `[VERIFY: …]` | Product behavior not yet confirmed for the release in scope |

Sample CIDRs, account numbers, region names and resource names from the deployment guides must never appear in the template. A guide's `10.107.0.0/16` copied into an HLD becomes a real deployment's address plan by accident. Before issue, search the document for `<` and for `e.g.` — anything remaining is an unfilled field.

### 2.3 Parallel Platform Sections, Not Tabs

Multi-platform products (AWS and Azure here) are covered by **parallel numbered subsections** — 10.1 AWS, 10.2 Azure — with platform tags in mixed tables.

Tabbed content was rejected: it needs JavaScript, hides half the document from search and print, and collapses badly in the Word conversion. Parallel subsections cost a little vertical space and work identically in HTML, in `.docx`, and on paper. The consultant deletes the out-of-scope platform's subsections during the first pass.

### 2.4 Traceability in Both Directions

Every decision carries a **TRD Ref** column pointing back at the requirement that drove it. Every Terraform variable in Appendix D carries the section that decided its value. This makes two reviews possible that are otherwise guesswork:

- **Upstream** — does every requirement in the TRD have a decision? An unreferenced requirement is a gap.
- **Downstream** — does every value in the tfvars trace to a decision? An untraceable value is somebody's assumption.

### 2.5 Consultant Notes

The HLD ships in two editions from one source. Consultant notes are amber blocks in the consultant edition and are removed entirely from the customer edition — not hidden, removed, so they cannot be recovered from the file the customer receives.

Notes carry authoring guidance: which option to pick and when, the field-tested failure mode, the thing to get in writing before proceeding. They never carry product training, competitive material, or anything that would embarrass the author if the wrong edition were sent.

### 2.6 `[VERIFY: …]` — Never Invent

Product behavior that has not been confirmed for the release in scope is marked `[VERIFY: <question>]` and tracked in §20.3. It is resolved against vendor documentation or a test before the document is issued at 1.0.

A confident wrong statement in an HLD is discovered during the build, at the worst possible moment, by somebody who trusted it.

---

## 3. Document Structure

Twenty-one sections in three parts. The numbering is stable across products so that a reader who knows one HLD knows them all.

### 3.1 Section Map

| # | Section | Purpose | Done when |
|---|---|---|---|
| **Front matter** ||||
| 1 | Document Control | Revision history, distribution, related documents, approval | Signatories named; version below 1.0 until §1.4 is signed |
| 2 | Executive Summary | Business context, one-table solution summary, outcomes | Readable by a non-engineer in two minutes |
| 3 | Objectives and Success Criteria | Design objectives, non-functional requirements, acceptance criteria | Every objective is testable and appears in §18 |
| 4 | Scope, Assumptions and Constraints | In/out of scope, ASM-, CON-, DEP- registers | Every assumption has an owner who could invalidate it |
| **Design** ||||
| 5 | Current State | Existing estate, existing controls, GAP- register | Written from evidence, not from the kick-off deck |
| 6 | Design Decision Register | DD-01…DD-nn: options considered, selection, rationale, TRD ref | Every architecturally significant choice has a row |
| 7 | Target Architecture | Overview diagram, components, region/zone layout, design principles | A reader can draw the estate from this section alone |
| 8 | Deployment Model | Per-platform model comparison and selection, steering configuration | The selected model's constraints are stated, not just its name |
| 9 | Management Plane | Plane comparison, selection, prerequisites, object hierarchy, commit governance | Version prerequisites confirmed against the customer's actual estate |
| 10 | Network Design | Per-platform subnets, endpoints, route tables, hybrid connectivity, DNS | Appendix A is complete and consistent with this section |
| 11 | Traffic Flows | Outbound, inbound, east-west, on-prem, NAT behavior, exceptions | Each flow is a numbered hop table, not a paragraph |
| 12 | Security Policy | Zones, objects, profiles, rulebase structure, rule principles, decryption | The rulebase structure is agreed, not the individual rules |
| 13 | User-ID and Identity | Source comparison and selection, connectivity, identity-based policy | Marked out of scope explicitly if it is out of scope |
| 14 | Logging and Monitoring | Destinations by log type, forwarding configuration, alerting | One-way-door choices (log region) are flagged |
| 15 | HA, Scale and Performance | Availability model, capacity, performance considerations | Stated ceilings are the product's, with a source |
| **Delivery** ||||
| 16 | IaC and Change Management | Tooling, repo and state, pipeline, deployment identities, change classes | Identity separation and least privilege are explicit |
| 17 | Migration and Cutover | Build sequence mapped to guide phases, waves, per-wave steps, rollback | Rollback is a specific action on a specific resource |
| 18 | Validation and Acceptance | VT-01…VT-nn with expected result, evidence and status | Includes a denied-traffic test and a route-table conformance test |
| 19 | Day-2 Handover | Ownership, runbooks, dated scheduled actions, knowledge transfer | Deferred work has a date and a named owner |
| 20 | Risks and Open Items | RSK-, OI-, and `[VERIFY]` registers | No unresolved `[VERIFY]` items at 1.0 |
| 21 | Appendices | A addressing · B naming/tagging · C rule set · D Terraform variables · E glossary · F references | Appendix A carries the AWS AZ name→ID mapping per account |

### 3.2 Register ID Conventions

| Prefix | Register | Section |
|---|---|---|
| `OBJ-` | Design objectives | 3.1 |
| `ASM-` | Assumptions | 4.3 |
| `CON-` | Constraints | 4.4 |
| `DEP-` | Dependencies | 4.5 |
| `GAP-` | Current-state gaps | 5.3 |
| `DD-` | Design decisions | 6 |
| `EXC-` | Inspection exceptions | 11.6 |
| `VT-` | Validation tests | 18 |
| `RSK-` | Risks | 20.1 |
| `OI-` | Open items | 20.2 |

IDs are never renumbered once the document is issued. A withdrawn item is marked withdrawn and kept in place — its absence would otherwise look like an oversight.

### 3.3 Required vs. Optional Sections

Every section is present in every HLD. A section that does not apply is retained with a one-line statement that it is out of scope and why. Deleting it loses the evidence that it was considered — the same reasoning that keeps N/A rows in §18.

### 3.4 Adapted Section Titles

The **numbering is fixed; the titles are not.** Sections 1–7 and 16–21 carry the same title in every product. Sections 8–15 describe the parts of a design that differ most between an inline network product and a SaaS one, and those titles are adapted so the section says what it actually contains.

| # | Inline products (Cloud NGFW, Network Intercept) | API Intercept | AI Gateway | Model Security | Red Teaming |
|---|---|---|---|---|---|
| 8 | Deployment Model | Integration Model | Deployment Model | Gate and Integration Model | Scan Strategy |
| 9 | Management Plane | Management Plane | Management Plane | Management Plane | Management Plane |
| 10 | Network Design | Environment and Connectivity | Infrastructure and Network Design | Environment and Connectivity | Target and Connectivity Design |
| 11 | Traffic Flows | Scan Flows | Request Flows | Scan Flows | Attack Flows |
| 12 | Security Policy | Security Profile Design | Routing and Guardrail Policy | Security Group and Rule Design | Attack Coverage and Risk Policy |
| 13 | User-ID and Identity | Identity, Access and Key Management | Identity, Access and Key Management | Identity, Access and Service Accounts | Identity, Access and Credentials |
| 14 | Logging and Monitoring | Logging and Observability | Logging and Observability | Logging and Reporting | Reporting and Remediation |
| 15 | HA, Scale and Performance | Capacity, Latency and Resilience | Availability, Scale and Performance | Capacity, Performance and Resilience | Capacity, Quota and Rate Limits |
| 16 | IaC and Change Management | Configuration and Change Management | IaC and Change Management | Pipeline and Change Management | Automation and Change Management |
| 17 | Migration and Cutover | Migration and Cutover | Migration and Cutover | Rollout and Enforcement | Scan Program Rollout |

The alternative — keeping "Network Design" as a heading over a page explaining that there is no network — was rejected. A reader who knows §10 is "where connectivity is decided" is served by a title that names the connectivity that exists. A reader looking for a specific section still finds it at the same number.

Products whose adapted titles depart from the inline set carry a bullet in the "How to use this document" callout stating that the numbering is unchanged, so the variance is visible rather than looking like an error.

---

## 4. Mapping HLD to TRD and Guide

The HLD is the join between the two. This table is the contract:

| HLD section | Consumes from the TRD | Feeds into the guide |
|---|---|---|
| 4 Scope | Scope and constraints sections | Phase 1 prerequisites |
| 5 Current State | Existing environment, existing security controls | Phase 1 readiness checks |
| 6 DD-01…DD-04 | Platform, connectivity model, management preference | Phase 2 branch selection (2A Panorama / 2B SCM) |
| 8 Deployment Model | Transit topology, inbound requirements | Phase 4 tfvars example selection |
| 9 Management Plane | Existing Panorama/SCM estate and versions | Phase 2 |
| 10 Network Design | IP addressing, regions, availability zones | Phase 4 tfvars, Phase 5 deployment |
| 11 Traffic Flows | Application flows, NAT and source-IP dependencies | Phase 7 verification |
| 12 Security Policy | Existing rulebase, compliance obligations | Phase 2 policy configuration |
| 13 User-ID | Identity source, directory topology | Phase 8 |
| 14 Logging | Log retention, SIEM, compliance | Phase 2 log forwarding, Phase 9 monitoring |
| 16 IaC | Tooling standards, pipeline, identity model | Phase 1 identities, Phase 4 configuration |
| 17 Cutover | Change windows, application owners | Phase 6 spoke onboarding |
| 18 Validation | Acceptance criteria | Phase 7 |

A TRD question that feeds no HLD section, and an HLD section with no TRD input, are both defects — in the TRD.

---

## 5. HTML Rendering Specification

### 5.1 Shared Foundation

The HLD reuses the site's existing CSS rather than duplicating it:

| Stylesheet | Provides |
|---|---|
| `/docs/shared/css/pan-guides.css` | Layout, header, sidebar, typography, callouts, collapsibles |
| `/workspace/TRD/css/trd.css` | `.trd-table`, `.trd-fill`, `.trd-options`, `.trd-section-num`, consultant-notes styling |
| `/workspace/HLD/css/hld.css` | HLD-only components (below) |

`hld.css` is deliberately small. Anything that would be useful to a TRD belongs in `trd.css`.

### 5.2 HLD-Specific Components

| Class | Use |
|---|---|
| `.hld-ph` | Inline placeholder chip (dashed blue) for `<value>` text outside tables |
| `.hld-tag` + `.hld-tag-aws` / `-azure` / `-both` | Platform tag in mixed tables |
| `.hld-dr` | Decision, risk and open-item registers; `td.hld-dr-id` styles the ID column |
| `.hld-flow` | Numbered hop tables for traffic flows and sequences; first column is a narrow monospace index |
| `.hld-diagram` + `.hld-diagram-title` + `.hld-diagram-hint` | Diagram placeholder with a caption and a note on what the diagram must show |
| `.hld-signoff` | Approval block in §1.4 |
| `.hld-status` | Pass/fail/status chip |
| `.hld-verify` | `[VERIFY: …]` marker |
| `.hld-parallel` | Two-column grid for side-by-side platform content; collapses below 900 px |
| `.hld-view-toggle` | Fixed customer/consultant view button |
| `.hld-ref` | An unlinked reference (used by the standalone build for unpublished targets) |

### 5.3 Consultant-Notes Block

One pattern, used identically in every section:

```html
<div class="consultant-notes">
  <div class="collapsible">
    <div class="collapsible-header">
      <span class="chevron">&#9654;</span><span>Consultant Notes</span>
    </div>
    <div class="collapsible-body">
      <p>…</p>
    </div>
  </div>
</div>
```

It is suppressed in the browser by `body.customer-view .consultant-notes { display: none; }` and removed from the customer `.docx` by `remove_tag_block(html, 'consultant-notes')`. The nesting must not change: the build script's depth-aware remover keys on the outer `div`, and the view toggle keys on the same class.

One block per section, placed at the end of the section. Multiple scattered blocks make the customer edition's layout unpredictable once they are stripped.

### 5.4 View Toggle

`/workspace/HLD/js/hld.js` toggles `body.customer-view` and persists the choice to `localStorage` under `hld-view-mode`. It also binds `.collapsible-header` as a fallback for a page loaded without `pan-guides.js`. The fallback is skipped when the shared script is present (detected via its `openCollapsiblesForHash` global) and guarded with `dataset.hldBound`, so no header ever receives two handlers; when it does run it toggles the same `open` classes the shared CSS keys on.

The default view is consultant. A customer-facing HTML copy should be produced by the standalone build with the toggle in customer view, or by sending the customer `.docx` — never by asking the customer not to press the button.

### 5.5 Structural Invariants

The build pipeline parses the HTML, so structure is load-bearing:

- Section headings are `<h2 id="section-N"><span class="trd-section-num">N</span> Title</h2>`, numbered 1…21 with no gaps.
- Subsection headings are `<h3>N.M Title</h3>`.
- Every table has an explicit `<thead>` and `<tbody>`; the first row is header cells.
- Placeholder cells are `<span class="trd-fill" contenteditable="true">` containing either `&nbsp;`, an `e.g., …` hint, or `YYYY-MM-DD`.
- Option cells are `<span class="trd-options">` with choices separated by ` / ` (spaces either side — the separator is matched literally).
- Literal slashes inside an option label are written `&#47;` so they are not read as separators.

---

## 6. Content Guidelines

### 6.1 Writing a Decision

A decision row that a reader can act on has four parts:

| Part | Test |
|---|---|
| Options considered | Were the realistic alternatives listed, including the one the customer expected? |
| Selected | One option, named the same way the product names it |
| Rationale | Ties to a requirement or constraint, not to preference |
| TRD Ref | Points at the requirement |

"Selected: Combined design" is a note. "Selected: Combined design — Centralized supports only TCP with IP targets for inbound, and the payments workload publishes UDP (TRD §7.2)" is a decision.

### 6.2 Consultant Notes

Notes should answer:

1. **Which option, and when?** — the heuristic, not the feature list
2. **What is the field-tested failure?** — the thing that goes wrong on real engagements
3. **What must be confirmed before proceeding?** — and from whom, in writing
4. **What does the author get wrong here?** — the trap in this specific section

Notes should not contain: product training, competitive positioning, roadmap, or anything that reads as criticism of the customer.

### 6.3 Diagrams

A figure in an HLD is one of two things, and the distinction decides how it is authored:

| Kind | Markup | Source | Used for |
|---|---|---|---|
| **Embedded** | `<figure class="hld-figure">` with an `<img>` and a `<figcaption>` | An `.svg` copied from the product's deployment guide into `<slug>/diagrams/` | Product-generic architecture: how the product works, what the deployment models are, what the reference topology looks like |
| **Placeholder** | `<div class="hld-diagram">` with a title and a hint | Drawn per engagement by the consultant | Anything carrying the customer's own networks, names and addresses |

Embedded figures are the reason the customer can follow the design without the guide open beside them. Placeholders state what the diagram must show, not just that one is needed. Every HLD has at least one placeholder: the engagement's own topology. A design document with no picture of the design is a list of settings.

Captions do work. The pattern is a bolded figure number and title, then one or two sentences on what the reader should take from it — not a repetition of the title. Where a figure applies to only one platform or deployment model, the caption says so and tells the consultant to delete the others.

Diagrams are copied into the HLD's own `diagrams/` folder rather than referenced across the repository. An HLD is sent to customers as a `.docx` or a standalone HTML file, and a path into `docs/guides/` does not survive either.

**Run `clean-svg.py` over anything copied in.** The draw.io CLI embeds a base64 PNG raster fallback behind every text block, which takes a 25 KB diagram to 1.5 MB and, multiplied across a document, produces a `.docx` nobody can email. `docs/guides/ai-gateway/diagrams/clean-svg.py` strips it and the `light-dark()` CSS that makes diagrams invert on a dark page:

```
python3 -I ../../docs/guides/ai-gateway/diagrams/clean-svg.py <slug>/diagrams/*.svg
```

Stripping the fallback is what makes the Chrome renderer necessary rather than optional (see §8.1) — the fallback was the only thing `rsvg-convert` could read on those files. Keeping the fallback instead is not the answer: it would mean shipping customer documents six times larger to work around a renderer choice.

### 6.4 Tone

The customer edition is read by people who did not attend the workshops. Write full sentences, expand an acronym on first use, and put the constraint next to the choice it constrains. Avoid the passive construction that hides who is responsible — "the customer confirms" is useful; "it is assumed" is not.

---

## 7. File Organization

```
workspace/HLD/
├── HLD-SPEC.md                              ← this file
├── build_hlds.py                            ← HTML → customer + consultant .docx
├── build_standalone.py                      ← HTML → single-file portable HTML
├── .figure-cache/                           ← generated: rasterised SVGs, safe to delete
├── assets/
│   ├── Public_Cloud_NGFW_HLD_Template_v2.2.docx   ← branded source template
│   ├── make_brand_base.py                   ← derives the base from the template
│   └── pan-hld-base.docx                    ← generated, committed: branded python-docx base
├── css/
│   └── hld.css                              ← HLD-specific styles (extends trd.css)
├── js/
│   └── hld.js                               ← view toggle, collapsible fallback
└── <product-slug>/
    ├── hld-<slug>.html                      ← master source (single source of truth)
    ├── diagrams/*.svg                       ← figures copied from the product's guides
    ├── hld-<slug>-standalone.html           ← generated: CSS, JS and images inlined
    ├── hld-<slug>-customer.docx             ← generated: notes removed
    └── hld-<slug>-consultant.docx           ← generated: notes retained
```

The master HTML and the diagrams are the only files edited by hand. The three outputs are regenerated, never patched. `pan-hld-base.docx` is generated but committed, so a normal build needs neither `make_brand_base.py` nor the 5 MB source template.

Future products follow the same pattern, with an entry added to `HLDS` in both build scripts and a row added to the registry in §10.1.

---

## 8. Build Pipeline

### 8.1 Word Output — `build_hlds.py`

```
python3 build_hlds.py
```

Adapted from `workspace/TRD/build_trds.py` and sharing its parser design. For each product it emits a customer and a consultant `.docx` from the same HTML.

| Stage | Behavior |
|---|---|
| Preprocess | Strips scripts, styles, inline SVG, site header, sidebar, breadcrumb, search modal, back-to-top, view toggle, chevrons and copy buttons. Strips `consultant-notes` for the customer edition. |
| Parse | `HLDParser` emits typed nodes: heading, para, code, list, callout, consultant, table, image, diagram, hr. |
| Render | Cover page, "How to use this document" legend (edition-aware), then nodes in order. |

#### Branded base

Each product is registered in `HLDS` with a brand base or `None`. With a base, the script opens `assets/pan-hld-base.docx` instead of an empty document, which brings the Palo Alto Networks template's styles, logo header and confidentiality footer with it; the footer's title field is rewritten per product. With `None` it uses the script's own navy cover and no header or footer.

`cloud-ngfw` predates the branded base and is deliberately left on `None`, so its issued output does not change underneath anyone. Moving it is a one-line change in `HLDS`.

The branded template defines only nine paragraph styles and no table styles, so the script never depends on Word's built-ins: `bullet_para()` uses the `List Bullet` style when it exists and a manual glyph with a hanging indent when it does not, and `grid_table()` applies the `Table Grid` style when it exists and explicit `tblBorders` when it does not. Both bases therefore render the same.

#### Figures

An `<img>` inside a `<figure class="hld-figure">` is resolved relative to the source HTML. SVG is rasterised to PNG at 1800 px wide, cached in `.figure-cache/` under a key of path, mtime, width and renderer, and embedded at the smaller of the page text width and the source's natural size at 150 dpi — so a small diagram is never upscaled into a blurry banner. The `<figcaption>` is rendered beneath it in grey italic.

**The renderer is headless Chrome, not `rsvg-convert`, and the reason matters.** Most of these diagrams are draw.io exports that carry their text in `<foreignObject>` — HTML inside SVG. A browser renders it; `rsvg-convert` silently does not, and the output is a correct-looking diagram with every label missing. That failure is invisible to any check that counts images rather than looking at them.

The build inlines the SVG markup into a blank page and screenshots it, because Chrome does not execute `foreignObject` content in an SVG referenced through `<img src>`. Chrome is located from `CHROME_PATH`, then the standard macOS application paths, then `google-chrome`, `chromium` and `chromium-browser` on the path.

`rsvg-convert` remains as a fallback with a warning that `foreignObject` labels will be lost. If neither renderer is available the build prints a warning and renders a red `[Figure not rendered: …]` line rather than leaving a silent gap.

`.figure-cache/` is disposable; delete it to force a re-render.

A `<div class="hld-diagram">` placeholder renders as a dashed-border box with its title and hint lines. Before this was added, placeholder text sat in bare `div`s that the parser dropped, so the Word editions showed nothing where a figure placeholder should be.

Cell rendering is driven by content, which is why the HTML conventions in §5.5 matter:

| Test | Rendering |
|---|---|
| Header row | Navy background, white bold 9 pt |
| `is_fill()` — empty, `e.g., …`, or `YYYY-MM-DD` | Pale blue fill, hint in grey italic |
| `is_options()` — contains ` / `, under 400 chars | Light background, one `○ option` per line |
| Otherwise | Plain; `[VERIFY` text in red |

Consultant notes render as a single-cell table, background `#FFF7D6`, left border `#FFB81C`, labeled `CONSULTANT NOTE` in 7 pt. Multi-paragraph notes keep their paragraph breaks.

### 8.2 Standalone Output — `build_standalone.py`

```
python3 build_standalone.py
```

Produces a single portable file that opens correctly from an email attachment or a USB stick with no repo checkout and no web server:

- All three stylesheets and both scripts are inlined.
- Every local `<img>` becomes a `data:` URI, so figures survive being sent as a single attachment. SVG is base64-encoded rather than inlined as markup, because the diagrams carry their own `<style>` blocks and inlining those would leak rules into the host document.
- The Google Fonts link is removed and replaced with a local font stack, so the file renders identically offline.
- Site-relative links to published guides are rewritten to absolute URLs on the public site.
- Links to working TRDs are unlinked to `.hld-ref` spans, because `workspace/` is gitignored and never published — a broken link in a customer artifact is worse than plain text.
- Search is hidden, since the site index is not available.

### 8.3 Pre-Issue Checklist

Run before sending anything to a customer:

1. Both build scripts run clean.
2. Customer `.docx` contains zero occurrences of `CONSULTANT NOTE`.
3. Section count is 21 in both editions.
4. No `<` placeholder and no `e.g.` remains in the filled document.
5. No `[VERIFY]` items remain unresolved in §20.3.
6. No guide sample CIDR, account ID or resource name appears outside the §1 consultant note that names them as forbidden.
7. §1.1 version and §1.4 approval block are consistent.
8. **Open the `.docx` and look at every figure.** Count is not evidence: a diagram whose text failed to render still embeds as an image of the right size in the right place. Check that labels are present and legible at print size.

---

## 9. Authoring Workflow

### 9.1 Research First

Per `GUIDE-TEMPLATE.md` §12, authoring is two passes:

- **Pass 1** — read the source guides and TRDs and build a reference sheet of verified facts, each tied to its source.
- **Pass 2** — author only from the reference sheet.

Any product statement that appears in the draft but not in the reference sheet is a red flag: it came from memory, and memory is where the invented facts live.

### 9.2 Sources for an HLD Template

| Source | Supplies |
|---|---|
| Product deployment guides | Deployment models and their constraints, prerequisites, version floors, platform limits, phase structure |
| Product TRDs | The questions whose answers the HLD must consume; the `TRD Ref` targets |
| `TRD-SPEC.md` | Consultant-notes conventions, data boundary, `[VERIFY]` discipline |
| `GUIDE-TEMPLATE.md` | Research-first workflow, callout semantics |

Vendor documentation is cited, not copied. Where a guide and the vendor docs disagree, the disagreement is a `[VERIFY]` item.

### 9.3 Per-Engagement Use

1. Complete the TRD first. An HLD written before the TRD is a proposal.
2. Copy the template and delete the out-of-scope platform's subsections.
3. Fill §6 before §7–§15 — the decisions determine the design, not the reverse.
4. Keep the version below 1.0 until §1.4 is signed.
5. Delete the consultant notes only by building the customer edition, never by hand.

---

## 10. Skill & Agent Reference

### 10.1 Product Registry

| Slug | Product | Platforms | Brand base | Figures | Source guides |
|---|---|---|---|---|---|
| `cloud-ngfw` | Cloud NGFW | AWS, Azure | no | 0 + 1 placeholder | `guides/cngfw/cloud-ngfw-aws.html`, `guides/cngfw/cloud-ngfw-azure.html` |
| `ai-gateway` | Prisma AIRS AI Gateway | SaaS, Hybrid on AWS/Azure/GCP/ECS/ACA | yes | 11 + 1 placeholder | `guides/ai-gateway/ai-gateway-deployment.html`, `hybrid-infrastructure`, `kubernetes-deployment`, `serverless-deployment` |
| `api-intercept` | Prisma AIRS API Intercept | Platform-independent | yes | 3 | `guides/airs/airs-api-intercept.html` |
| `network-intercept` | Prisma AIRS Network Intercept | AWS, Azure, GCP, private cloud | yes | 5 + 1 placeholder | `guides/airs/airs-network-intercept.html`, `airs-cloud-deployment`, `airs-k8s-protection`, `airs-microperimeter` |
| `model-security` | Prisma AIRS AI Model Security | Platform-independent | yes | 1 | `guides/airs-model/airs-model-security.html` |
| `red-teaming` | Prisma AIRS AI Red Teaming | Platform-independent | yes | 2 | `guides/airs-red/airs-red-teaming.html` |

Add a row when a product's HLD is built, and add matching entries to `HLDS` in `build_hlds.py` and `build_standalone.py`.

### 10.1.1 Cross-Product Conventions

The five Prisma AIRS HLDs share conventions worth keeping when a sixth is added:

- **§4.2 names the siblings.** Every AIRS HLD lists the other four products in Out of Scope with a one-line statement of what each covers. Customers routinely assume one product does another's job, and that table is where the scope argument at acceptance is prevented.
- **§7 carries a "Where this sits in Prisma AIRS" table.** The same five rows, with the current product marked as this design and the others marked separate engagement or not required.
- **The failure-behavior decision is explicit.** Each product has a decision recording what happens when the service cannot be reached — fail open or fail closed for API Intercept, pipeline behavior on error for Model Security, cached-configuration operation for AI Gateway. It is the decision most likely to cause an incident and the one most often left to each team.
- **A coverage-drop alert appears in §14.** Scan volume, traffic volume or scheduled-scan completion, depending on the product. Every one of these controls can fail silently, and volume against a baseline is the cheapest way to notice.

### 10.2 Agent Input Contract

An `hld-author` agent requires, before it writes anything:

| Input | Why |
|---|---|
| Product slug and platforms in scope | Determines parallel subsections |
| Paths to the source guides | Pass-1 research corpus |
| Paths to the matching TRDs | `TRD Ref` targets and section mapping |
| Template or engagement mode | Template mode forbids all specific values |
| Output directory | `workspace/HLD/<slug>/` |

### 10.3 Data Boundary

- **Never write customer-specific data** (real names, emails, endpoints, credentials) to any committed path. All working HLDs live in `workspace/HLD/<product-slug>/`, which is gitignored.
- Template HLDs containing only placeholders may be promoted to a public path by the user after review.
- Unknown product behavior is marked `[VERIFY: <question>]` — never invented.
- Sample values from deployment guides are never carried into an HLD, in template or engagement mode.

---

## 11. Revision History

| Version | Date | Author | Changes |
|---|---|---|---|
| 0.1 | 2026-09-23 | Sean Jolly | Initial draft — derived from the Cloud NGFW AWS & Azure HLD template. Document chain (§1), design principles (§2), 21-section map and ID conventions (§3), TRD/guide mapping (§4), HTML rendering and structural invariants (§5), content guidelines (§6), file organization (§7), build pipeline and pre-issue checklist (§8), authoring workflow (§9), skill/agent reference and data boundary (§10). |
| 0.2 | 2026-10-06 | Sean Jolly | Five Prisma AIRS HLDs added: AI Gateway, API Intercept, Network Intercept, AI Model Security, AI Red Teaming. Adapted section titles for SaaS products (§3.4). Embedded-figure convention, the embedded/placeholder distinction, and the `clean-svg.py` requirement (§6.3). Branded Word base derived from the PANW template, with style fallbacks (§7, §8.1). Figure embedding in the Word build, rendered through headless Chrome because `rsvg-convert` drops `foreignObject` text; `hld-diagram` placeholders now render instead of being dropped (§8.1). Image inlining in the standalone build (§8.2). Figure legibility added to the pre-issue checklist (§8.3). Product registry expanded and cross-product conventions recorded (§10.1). |
