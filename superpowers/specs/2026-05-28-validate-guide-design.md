# Validate Guide — Design Spec

> **Date**: 2026-05-28
> **Status**: Draft
> **Skill name**: `/guides/validate-guide`
> **Agent**: `guide-validator`

## Purpose

Follow a deployment guide step-by-step against live infrastructure. The guide is the source of truth. If it's wrong, stop. Don't improvise. Produces a structured gap report and tracks which findings were fixed.

This skill is guide-agnostic — it works against any guide in the `docs/guides/` directory (AWS, Azure, Cloud NGFW, future guides) by parsing the guide HTML to extract phases, steps, and verification criteria.

## Core Rules

1. **Guide is law.** Follow every step exactly as written. No shortcuts, no workarounds, no "I know a better way." If the guide says to run a command, run that exact command.
2. **Hard stop on findings.** If a step is wrong, missing, outdated, or confusing: stop immediately, log the finding, ask the user how to proceed. Never improvise a fix and keep going.
3. **Can edit tfvars, never .tf files.** Terraform module code is read-only. The skill can modify `terraform.tfvars` per guide instructions but must never touch `.tf` module source files unless the user explicitly instructs otherwise.
4. **Runs Terraform.** The skill executes `terraform init`, `plan`, `apply`, and `destroy` as the guide directs.
5. **Configures Panorama/SCM.** The skill SSHes into Panorama and runs `set` commands per guide instructions. For SCM, it follows the guide's UI instructions and pauses for user action.
6. **Pause for manual steps.** UI-only steps (CSP Portal, AWS/Azure Console, Panorama UI) get clear instructions printed for the user. The skill waits for the user to confirm completion before proceeding.
7. **No silent failures.** Every step gets an explicit PASS, FAIL, SKIP, or FINDING status. Nothing passes without verification.

## Invocation

```
/guides/validate-guide <guide-path> [--resume]
```

**Arguments:**
- `guide-path` — path to the guide HTML file (e.g., `docs/guides/aws/vm-series-deployment.html`)
- `--resume` — resume from the last saved position in `VALIDATION-STATE.md`

**Examples:**
```
/guides/validate-guide docs/guides/aws/vm-series-deployment.html
/guides/validate-guide docs/guides/azure/vm-series-deployment.html --resume
```

## Workflow

### Phase 0: Intake

1. Read the guide HTML file.
2. Prompt the user for:
   - **Management plane**: Panorama or SCM (if the guide has tabbed paths)
   - **Routing model**: Overlay or Non-overlay (if applicable)
   - **Tab selections**: Any other branching choices in the guide
3. These selections determine which tab panels to follow and which to skip.

### Phase 1: Parse

Extract from the guide HTML:
- All `<h2>` sections (phases) with their `id` attributes
- All `<div class="collapsible">` blocks (steps) within each phase
- Step titles from `.collapsible-header span` text
- CLI commands from `<div class="code-block"><pre><code>` blocks
- Verification criteria from `.callout-success` blocks
- Expected outputs described in prose
- Tab selections from `.mgmt-tabs` containers (follow the user's chosen path)

Build a structured checklist:

```
Phase 1: Prerequisites
  1.1: Activate Software NGFW Credits [MANUAL]
  1.2: Verify SCM tenant [MANUAL]
  ...
  1.8: AWS IAM — programmatic access [CLI: aws sts get-caller-identity]
  1.9: Deployment environment & tooling [CLI: terraform -v, aws --version]
  1.10: Terraform remote state backend [CLI: aws s3api create-bucket...]
Phase 2A: Panorama Configuration
  2A.1: Install SW Firewall License Plugin [MANUAL/PANORAMA-UI]
  2A.2: Set Licensing API Key [SSH: request license api-key set...]
  ...
```

Each step is classified as:
- **CLI** — has a runnable command in a code block
- **SSH** — targets Panorama/firewall via SSH
- **TERRAFORM** — terraform init/plan/apply/destroy
- **MANUAL** — requires UI interaction (Console, Portal, Panorama UI)
- **VERIFICATION** — a check step (show command, API call, console check)

### Phase 2: Pre-flight

Scan the parsed steps for tool/credential requirements and verify each:

| Signal in guide | Pre-flight check | Pass criteria |
|---|---|---|
| `aws` CLI commands | `aws sts get-caller-identity` | Returns account ID |
| `az` CLI commands | `az account show` | Returns subscription |
| `gcloud` CLI commands | `gcloud auth list` | Active account shown |
| `terraform` commands | `terraform -v` | Version >= 1.4.0 |
| SSH to Panorama IP | `ssh -o ConnectTimeout=10 <user>@<ip> "show system info"` | Returns hostname |
| SSH to firewall IPs | Deferred until firewalls exist | N/A at pre-flight |
| `git` commands | `git --version` | Version returned |

**Pre-flight also checks:**
- Terraform working directory exists (or will be created per guide instructions)
- Guide's referenced files exist (reference tfvars, set command files, etc.)
- Workspace directory exists (`workspace/<cloud>/`)

If any pre-flight check fails, print exactly what the user needs to fix and wait. Do not proceed with a failed pre-flight.

### Phase 3: Execute

Walk each step sequentially. For each step:

#### CLI Steps
1. Print the step title and guide instructions.
2. Run the exact command from the guide.
3. Compare output to the guide's expected result (if specified).
4. If verification criteria exist (`.callout-success`), check them.
5. Mark PASS or FINDING.

#### SSH/Panorama Steps
1. Print the step title and guide instructions.
2. SSH to Panorama and run the exact commands from the guide.
3. Verify output matches expectations.
4. If the guide specifies `set` commands, run them exactly as written.
5. For commits: run `commit` and verify job succeeds.
6. Mark PASS or FINDING.

#### Terraform Steps
1. Print the step title and guide instructions.
2. For tfvars edits: modify `terraform.tfvars` per guide instructions. Show the diff.
3. For `terraform init`: run and verify "Successfully initialized."
4. For `terraform plan`: run and report resource count. Compare to guide's expected count.
5. For `terraform apply`: confirm with user, run with `-auto-approve`, monitor output.
6. For `terraform destroy`: confirm with user, run with `-auto-approve`.
7. For `terraform output`: run and capture outputs for later verification steps.
8. Mark PASS or FINDING.

#### Manual Steps
1. Print the step title.
2. Print exactly what the user should do, quoting the guide verbatim.
3. Print what to look for / what to report back.
4. Wait for user confirmation (e.g., "Done — I see X" or "Problem — I see Y instead").
5. If user reports a problem, log as FINDING.
6. Mark PASS, FINDING, or SKIP.

#### Verification Steps
1. Run the verification command or check.
2. Compare to the guide's success criteria.
3. If the guide says "you should see X" and we see X: PASS.
4. If we see something different: FINDING.

### Phase 4: On Finding

When any step produces a finding:

1. **Stop immediately.** Do not proceed to the next step.
2. **Log the finding** with:
   - Finding number (sequential across the entire validation run)
   - Phase and step reference
   - Category: `WRONG`, `MISSING`, `OUTDATED`, `CONFUSING`, or `BLOCKER`
   - Description: what the guide says vs. what actually happened
   - Evidence: command output, error message, or screenshot instruction
3. **Ask the user** how to proceed:
   - **Skip** — mark the step as SKIPPED and move on
   - **Fix guide** — user or Claude edits the guide to fix the issue, then re-run the step
   - **Abort** — stop the entire validation run
4. **Update VALIDATION-STATE.md** with the finding and decision.

#### Finding Categories

| Category | Definition | Example |
|---|---|---|
| WRONG | Guide instruction produces an error or wrong result | Command syntax is incorrect, wrong UI path |
| MISSING | Guide assumes knowledge not provided or skips a necessary action | No mention that parent DG must be set in UI |
| OUTDATED | Guide references a feature/command/UI that has changed | CLI command removed in newer PAN-OS version |
| CONFUSING | Step works but wording is ambiguous or could trip someone up | Contradictory instructions about EIP vs private IP |
| BLOCKER | Issue prevents the deployment from continuing | Terraform plan fails, firewall can't reach Panorama |

### Phase 5: State Persistence

After each phase completes (or on any finding/pause), write `workspace/<cloud>/VALIDATION-STATE.md`:

```markdown
# Validation State: <Guide Title>

> **Guide**: <path to guide HTML>
> **Started**: <date>
> **Last updated**: <timestamp>
> **Current position**: Phase X, Step Y.Z
> **Status**: IN_PROGRESS | PAUSED | COMPLETED
> **Selections**: Panorama path, Overlay routing (or whatever was chosen)

## Progress

| Phase | Step | Title | Type | Status | Notes |
|-------|------|-------|------|--------|-------|
| 1 | 1.1 | Activate SW NGFW Credits | MANUAL | PASS | |
| 1 | 1.2 | Verify SCM tenant | MANUAL | PASS | |
| 2A | 2A.2 | Set Licensing API Key | SSH | FINDING | #1: command does not exist on 11.2.10 |
| 2A | 2A.3 | Create Bootstrap Definition | MANUAL | SKIPPED | user chose to skip |
| 2A | 2A.4 | Create DGs & Template Stacks | SSH | PENDING | |

## Findings

| # | Phase.Step | Category | Description | Resolution |
|---|-----------|----------|-------------|------------|
| 1 | 2A.2 | OUTDATED | `request license api-key set` does not exist on PAN-OS 11.2.10-h3 | SKIPPED — user will update guide later |
| 2 | 5.6 | CONFUSING | Says "no public EIP" then shows https://<management-eip> | Guide edited to clarify |

## Infrastructure

| Component | Details | Status |
|-----------|---------|--------|
| Panorama | 10.251.2.51, PAN-OS 11.2.10-h3 | Connected |
| AWS Account | 367521625516, us-west-2 | Authenticated |
| VM-Series | sj-cld-vmseries-01, sj-cld-vmseries-02 | Running |
| GWLB | sj-cld-security-gwlb | Targets healthy |

## Credentials

- [x] AWS — account 367521625516 (sjolly@paloaltonetworks.com)
- [x] Panorama SSH — claude-pano@10.251.2.51
- [ ] Azure — not needed for this guide

## Terraform

- **Working directory**: workspace/aws/terraform-swfw-modules/examples/combined_design/
- **State**: local (terraform.tfstate)
- **Last action**: apply (227 resources)
```

### Phase 6: Resume

When invoked with `--resume`:

1. Read `workspace/<cloud>/VALIDATION-STATE.md`.
2. Print a summary: X steps passed, Y findings, current position.
3. Re-run pre-flight checks (credentials may have expired).
4. Pick up from the first PENDING step.
5. If infrastructure was destroyed since last run, note this and confirm with user before re-deploying.

### Phase 7: Final Report

When all steps are complete (or user aborts), produce `workspace/<cloud>/VALIDATION-REPORT.md`:

```markdown
# Validation Report: <Guide Title>

> **Guide**: <path>
> **Validated**: <start date> — <end date>
> **Sessions**: <count>
> **Management plane**: Panorama | SCM
> **Routing model**: Overlay | Non-overlay

## Summary

| Metric | Count |
|--------|-------|
| Total steps | 47 |
| Passed | 38 |
| Findings | 7 |
| Skipped | 2 |
| Fixed during validation | 4 |
| Still open | 3 |

## Overall Verdict: PASS WITH FINDINGS | FAIL | PASS

## Findings

| # | Phase.Step | Category | Severity | Description | Status |
|---|-----------|----------|----------|-------------|--------|
| 1 | 2A.2 | OUTDATED | Medium | `request license api-key set` removed in 11.2.10 | Open |
| 2 | 5.6 | CONFUSING | Low | Contradictory EIP instructions | Fixed |
| ... | | | | | |

## Steps Detail

### Phase 1: Prerequisites
| Step | Title | Status | Duration |
|------|-------|--------|----------|
| 1.1 | Activate SW NGFW Credits | PASS | manual |
| 1.2 | Verify SCM tenant | PASS | manual |
| ... | | | |

### Phase 2A: Panorama Configuration
| Step | Title | Status | Duration |
|------|-------|--------|----------|
| ... | | | |

## Infrastructure Final State

[Same as VALIDATION-STATE.md infrastructure section]

## Recommendations

[Auto-generated list of open findings that should be fixed before publishing the guide]
```

## Relationship to Existing Skills

| Skill | Purpose | Overlap |
|---|---|---|
| `/guides/verify-guide` | Static HTML quality audit (structure, screenshots, components) | None — checks the document, not the process |
| `/guides/validate-guide` (this skill) | Live infrastructure validation (does following the guide actually work?) | Complementary — run verify-guide first for HTML quality, then validate-guide for real-world accuracy |
| `guide-author` agent | Writes guide content | None — creates content, doesn't validate it |

**Recommended workflow:**
1. `/guides/verify-guide` — fix HTML quality issues
2. `/guides/validate-guide` — follow the guide against live infra, find process gaps
3. Fix findings from validation
4. Re-run `/guides/verify-guide` to confirm fixes didn't break HTML quality

## Agent Definition

The skill spawns a `guide-validator` agent with:
- **Tools**: Read, Write, Edit, Bash, Grep, Glob, AskUserQuestion
- **No web tools** — the guide is the source of truth, not external docs
- **Long-running** — expects to span multiple sessions via state persistence

## Constraints

- Never modify `.tf` module files. Only `terraform.tfvars` and guide HTML.
- Never run `terraform apply` or `terraform destroy` without user confirmation.
- Never improvise a workaround when the guide is wrong. Stop and log.
- Never skip a step silently. Every step gets an explicit status.
- Always update VALIDATION-STATE.md after each phase or finding.
- Treat the guide HTML as the single source of truth for what to do and in what order.

## Open Questions

None — all design decisions resolved during brainstorming.
