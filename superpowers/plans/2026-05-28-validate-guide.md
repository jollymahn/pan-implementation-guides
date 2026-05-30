# Validate Guide — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/guides/validate-guide` skill that follows deployment guides step-by-step against live infrastructure, logging findings and producing a structured gap report.

**Architecture:** A command file (`.claude/commands/guides/validate-guide.md`) orchestrates the workflow directly — no separate agent needed since this is a long-running interactive process that requires continuous user interaction (SSH confirmations, manual step approvals, finding decisions). The skill parses guide HTML to extract steps, runs pre-flight checks, then executes each step sequentially with hard-stop-on-finding behavior. State persists to `workspace/<cloud>/VALIDATION-STATE.md`.

**Tech Stack:** Bash (CLI commands, SSH, Terraform), HTML parsing via grep/sed, markdown state files.

**Spec:** `docs/superpowers/specs/2026-05-28-validate-guide-design.md`

---

## File Structure

| File | Responsibility |
|------|---------------|
| `.claude/commands/guides/validate-guide.md` | Skill definition — orchestration logic, parsing rules, execution flow, finding protocol, state management |

Single file. The skill is a command definition that Claude follows directly — no helper scripts, no agent, no external dependencies.

---

### Task 1: Create the validate-guide command file — Header and Invocation

**Files:**
- Create: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Create the command file with header, arguments, and trigger description**

```markdown
# /guides/validate-guide — Live Infrastructure Validation

Follow a deployment guide step-by-step against live infrastructure. The guide is the source of truth. If it's wrong, STOP. Don't improvise.

This skill runs Terraform, configures Panorama via SSH, executes CLI commands, and pauses for manual steps — all exactly as the guide instructs. Findings are logged with categories and the user decides how to proceed.

## Arguments

- `$ARGUMENTS` should contain the path to the guide HTML file, optionally followed by `--resume`.
- Example: `/guides/validate-guide docs/guides/aws/vm-series-deployment.html`
- Example: `/guides/validate-guide docs/guides/azure/vm-series-deployment.html --resume`

If no argument is provided, list HTML files under `docs/guides/` and ask the user which guide to validate.
```

- [ ] **Step 2: Verify the file exists at the correct path**

Run: `test -f .claude/commands/guides/validate-guide.md && echo EXISTS`
Expected: `EXISTS`

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): scaffold validate-guide command file"
```

---

### Task 2: Core Rules section

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Append the Core Rules section**

```markdown
## Core Rules

These rules are non-negotiable. They override any default behavior.

1. **Guide is law.** Follow every step exactly as written. Do not reorder steps, skip steps, or substitute alternative commands. If the guide says `terraform plan -var-file=terraform.tfvars`, run that exact command — not `terraform plan` without the flag.

2. **Hard stop on findings.** If a step produces an unexpected result, an error, or contradicts what the guide says to expect: STOP. Do not proceed to the next step. Log the finding and ask the user how to proceed.

3. **Can edit tfvars, never .tf files.** You may modify `terraform.tfvars` per guide instructions. You must NEVER modify `.tf` module source files unless the user explicitly overrides this rule.

4. **Runs Terraform.** Execute `terraform init`, `plan`, `apply`, and `destroy` as the guide directs. Always confirm with the user before `apply` and `destroy`.

5. **Configures Panorama.** SSH into Panorama and run `set` commands per guide instructions. Run `commit` when the guide says to commit. Verify commit job succeeds.

6. **Pause for manual steps.** For UI-only steps (CSP Portal, AWS/Azure Console, Panorama web UI), print exactly what the user should do — quoting the guide verbatim — and what to report back. Wait for confirmation.

7. **No silent failures.** Every step gets an explicit status: PASS, FAIL, FINDING, or SKIP. Nothing passes without verification.

8. **No improvisation.** If the guide is missing a step, do not fill in the gap from your own knowledge. Log it as a MISSING finding and stop.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): add core rules to validate-guide"
```

---

### Task 3: Intake and Parsing section

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Append the Intake section**

```markdown
## Phase 0: Intake

When invoked (not `--resume`):

1. **Read the guide HTML file** provided in `$ARGUMENTS`. If the file does not exist, report the error and stop.

2. **Detect branching paths.** Search the guide for `<div class="mgmt-tabs"` containers. If found, ask the user which path to follow for each tab group. Common choices:
   - Management plane: Panorama vs SCM
   - Routing model: Overlay vs Non-overlay
   - Deployment model: Common vs Dedicated
   Record the selections — these determine which `mgmt-panel` content to follow and which to skip.

3. **Detect the cloud provider.** Infer from the guide path:
   - `docs/guides/aws/` → AWS
   - `docs/guides/azure/` → Azure
   - `docs/guides/gcp/` → GCP
   - `docs/guides/cngfw/` → Cloud NGFW
   This determines the workspace directory: `workspace/<cloud>/`

4. **Create (or verify) the workspace directory** at `workspace/<cloud>/`. This is where `VALIDATION-STATE.md` and `VALIDATION-REPORT.md` will be written.
```

- [ ] **Step 2: Append the Parsing section**

```markdown
## Phase 1: Parse the Guide

Extract the validation checklist from the guide HTML. Use `grep` and `Read` — do not use external HTML parsers.

### Step extraction

1. **Find all `<h2>` headings** — these are the phases. Extract the `id` attribute and the heading text.
   ```bash
   grep -n '<h2[^>]*id="[^"]*"' <guide-path>
   ```

2. **For each phase, find all `<div class="collapsible">` blocks** — these are the steps. Extract the step title from the `.collapsible-header span` text.

3. **For tab groups (`mgmt-tabs`)**, only parse the panel matching the user's selection from intake. Skip all other panels entirely.

### Step classification

For each step, determine its type by scanning the collapsible body content:

| Signal | Type | Behavior |
|--------|------|----------|
| `<div class="code-block">` containing `terraform` commands | TERRAFORM | Run the terraform command |
| `<div class="code-block">` containing `aws`, `az`, `gcloud` commands | CLI | Run the CLI command |
| `<div class="code-block">` containing `set ` commands (Panorama config) | SSH | SSH to Panorama and run |
| `<div class="code-block">` containing `show ` commands | VERIFICATION | SSH to device and run, compare output |
| Step title mentions "Navigate to", "In the Console", "In the Portal" | MANUAL | Print instructions, wait for user |
| `.callout-success` with verification text | VERIFICATION | Run the check described |
| No code blocks, describes UI actions | MANUAL | Print instructions, wait for user |

If a step has both CLI commands and manual instructions, classify as CLI (run the commands, then prompt for the manual parts).

### Build the checklist

Construct an ordered list of steps with:
- Phase number and name
- Step number and title
- Type (TERRAFORM, CLI, SSH, VERIFICATION, MANUAL)
- Commands to run (extracted from code blocks)
- Verification criteria (extracted from `.callout-success` blocks)
- Status: PENDING (initial)

Print the checklist summary to the user:
```
Parsed guide: <title>
Phases: <count>
Total steps: <count>
  CLI: <count>
  SSH/Panorama: <count>
  Terraform: <count>
  Manual: <count>
  Verification: <count>

Ready to begin pre-flight checks?
```

Wait for user confirmation before proceeding.
```

- [ ] **Step 3: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): add intake and parsing phases to validate-guide"
```

---

### Task 4: Pre-flight section

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Append the Pre-flight section**

```markdown
## Phase 2: Pre-flight Checks

Scan the parsed steps for tool and credential requirements. Run each check and report results. Do not proceed if any check fails.

### Credential detection

Scan the commands extracted during parsing:

| Pattern in commands | Pre-flight check | Pass criteria |
|---|---|---|
| `aws ` | `aws sts get-caller-identity` | Returns account ID without error |
| `az ` | `az account show` | Returns subscription ID without error |
| `gcloud ` | `gcloud auth list` | Shows active account |
| `terraform` | `terraform -v` | Version >= 1.4.0 |
| `ssh` to any IP | `ssh -o ConnectTimeout=10 -o BatchMode=yes <user>@<ip> "echo ok"` | Returns "ok" or a PAN-OS prompt |
| `git` | `git --version` | Version returned |

### Environment checks

1. **Terraform working directory.** If the guide references a Terraform modules repo (e.g., `terraform-aws-swfw-modules`), check if it exists in `workspace/<cloud>/`. If not, note that the guide's clone step will create it.

2. **Referenced files.** If the guide references local files (reference tfvars, set command files, checklists), check if they exist. Report missing files as warnings — they may be created during validation.

3. **Workspace directory.** Verify `workspace/<cloud>/` exists. Create if needed.

### Pre-flight report

Print results as a table:

```
Pre-flight Results:
  [PASS] AWS credentials — account 367521625516
  [PASS] Terraform — v1.9.2
  [PASS] Panorama SSH — claude-pano@10.251.2.51
  [FAIL] Azure CLI — not authenticated

1 check failed. Fix the issue above before proceeding.
```

If all checks pass:
```
All pre-flight checks passed. Ready to begin validation?
```

Wait for user confirmation.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): add pre-flight checks to validate-guide"
```

---

### Task 5: Execution section — step type handlers

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Append the Execution section with all step type handlers**

```markdown
## Phase 3: Execute

Walk each step sequentially in the order they appear in the guide. For each step, announce:

```
━━━ Phase X: <phase-name> ━━━
Step X.Y: <step-title> [TYPE]
```

Then execute according to the step type:

### CLI Steps

1. Print the guide's instructions for this step (prose text before/after code blocks).
2. Run the exact command from the guide's code block.
3. If the guide specifies expected output (in prose or in a callout), compare the actual output.
4. If a `.callout-success` verification exists, check that the criteria are met.
5. If the output matches expectations: mark PASS.
6. If the output differs or errors: trigger the Finding Protocol (see below).

### SSH/Panorama Steps

1. Print the guide's instructions.
2. SSH to the target device and run the exact commands from the guide.
   - For `set` commands: run in configure mode.
   - For `show` commands: run in operational mode.
   - For `commit`: run and wait for the job to complete. Check for errors.
3. If the guide specifies what to verify after the commands: run the verification.
4. Mark PASS or trigger Finding Protocol.

**SSH connection:** Use the credentials established during pre-flight. If SSH fails mid-run (session timeout, connection drop), reconnect and retry the command once before triggering a finding.

### Terraform Steps

1. Print the guide's instructions.
2. For **tfvars edits**: modify `terraform.tfvars` exactly as the guide instructs. Show the user the diff before proceeding.
3. For **`terraform init`**: run and verify the output contains "Successfully initialized."
4. For **`terraform plan`**: run and report the resource count. If the guide specifies an expected count (e.g., "~80-120 resources"), compare. Show the plan summary to the user.
5. For **`terraform apply`**: ask the user for confirmation, then run with `-auto-approve`. Monitor for errors. If the guide specifies an expected duration, note the actual duration.
6. For **`terraform destroy`**: ask the user for confirmation, then run with `-auto-approve`.
7. For **`terraform output`**: run and capture the outputs. Store them — they may be needed for later verification steps.
8. Mark PASS or trigger Finding Protocol.

**Terraform working directory:** The guide will specify where to clone/cd. Track the working directory in VALIDATION-STATE.md.

### Manual Steps

1. Print the step title and the guide's instructions verbatim.
2. Print what the user should look for and report back. Be specific:
   - "After completing, confirm: do you see [X] in the [Y] panel?"
   - "Paste the output of [Z] if available."
3. Wait for the user's response.
4. If the user confirms success: mark PASS.
5. If the user reports a problem: trigger Finding Protocol with the user's description as evidence.

### Verification Steps

1. Run the verification command or check described in the guide.
2. Compare the output to the guide's success criteria.
3. For CLI verification (e.g., `show system info`): run the command and check for expected values.
4. For AWS/Azure verification (e.g., "navigate to VPC > Route Tables"): if a CLI equivalent exists (`aws ec2 describe-route-tables`), run it. Otherwise treat as MANUAL.
5. Mark PASS or trigger Finding Protocol.

### Between Steps

After each step completes (PASS or resolved finding):
- Update the step's status in VALIDATION-STATE.md.
- If this was the last step in a phase, print a phase summary:
  ```
  ━━━ Phase X Complete ━━━
  Steps: Y passed, Z findings, W skipped
  ```
- Proceed to the next step without waiting (unless the next step is in a new phase — then print the phase header).
```

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): add execution handlers to validate-guide"
```

---

### Task 6: Finding Protocol section

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Append the Finding Protocol section**

```markdown
## Finding Protocol

When any step produces an unexpected result, error, or contradiction with the guide:

### 1. Stop

Do not proceed to the next step. Do not attempt to fix the issue.

### 2. Log

Assign a sequential finding number and log with:

```
╔══ FINDING #<N> ══════════════════════════════════════╗
║ Phase: <phase> | Step: <step>
║ Category: <WRONG | MISSING | OUTDATED | CONFUSING | BLOCKER>
║
║ Guide says:
║   <quote the relevant guide text>
║
║ Actual result:
║   <what actually happened — command output, error, etc.>
║
║ Impact:
║   <can we continue? is the deployment broken?>
╚══════════════════════════════════════════════════════╝
```

### 3. Categorize

| Category | Definition | Example |
|---|---|---|
| WRONG | Guide instruction produces an error or wrong result | Command syntax incorrect, wrong UI path, wrong expected output |
| MISSING | Guide omits a necessary step or assumes unstated knowledge | Parent DG must be set in UI but guide only shows CLI |
| OUTDATED | Feature, command, or UI referenced has changed in newer versions | CLI command removed in PAN-OS 11.2 |
| CONFUSING | Step technically works but wording is ambiguous or contradictory | Says "no EIP" then shows `https://<eip>` as access method |
| BLOCKER | Issue prevents the deployment from continuing entirely | Terraform fails, firewall can't reach Panorama |

### 4. Ask the user

Present three options:

```
How would you like to proceed?
  1. SKIP — mark this step as skipped and move to the next step
  2. FIX — edit the guide to fix this issue, then re-run this step
  3. ABORT — stop the validation run entirely
```

Wait for the user's choice.

- **SKIP**: Mark the step as SKIPPED in VALIDATION-STATE.md. Record the finding. Move to the next step.
- **FIX**: The user (or Claude, if instructed) edits the guide HTML. After the fix, re-run the exact same step from the beginning. If it passes now, mark as PASS and note "fixed during validation" on the finding.
- **ABORT**: Write the current state to VALIDATION-STATE.md and VALIDATION-REPORT.md. Print a summary of progress and findings. Stop.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): add finding protocol to validate-guide"
```

---

### Task 7: State Persistence section

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Append the State Persistence section**

```markdown
## State Persistence

After each phase completion, each finding, and each pause, write `workspace/<cloud>/VALIDATION-STATE.md`.

### State file format

```markdown
# Validation State: <Guide Title>

> **Guide**: <path to guide HTML>
> **Started**: <date>
> **Last updated**: <timestamp>
> **Current position**: Phase X, Step Y.Z
> **Status**: IN_PROGRESS | PAUSED | COMPLETED | ABORTED
> **Selections**: <management plane>, <routing model>, <other tab choices>

## Progress

| Phase | Step | Title | Type | Status | Notes |
|-------|------|-------|------|--------|-------|
| 1 | 1.1 | Activate SW NGFW Credits | MANUAL | PASS | |
| 1 | 1.2 | Verify SCM tenant | MANUAL | PASS | |
| 2A | 2A.2 | Set Licensing API Key | SSH | FINDING | #1: command removed in 11.2 |
| 2A | 2A.3 | Create Bootstrap Definition | MANUAL | SKIPPED | |
| 2A | 2A.4 | Create DGs & Template Stacks | SSH | PENDING | |

## Findings

| # | Phase.Step | Category | Description | Resolution |
|---|-----------|----------|-------------|------------|
| 1 | 2A.2 | OUTDATED | `request license api-key set` removed in PAN-OS 11.2 | SKIPPED |

## Infrastructure

| Component | Details | Status |
|-----------|---------|--------|
| Panorama | <ip>, PAN-OS <version> | Connected |
| Cloud Account | <account-id>, <region> | Authenticated |

## Credentials

- [x] AWS — account <id>
- [x] Panorama SSH — <user>@<ip>

## Terraform

- **Working directory**: <path>
- **State**: local | remote (S3/Azure Storage)
- **Last action**: <init | plan | apply | destroy>
- **Resource count**: <N>
```

### When to write state

- After completing each phase (all steps in the phase resolved)
- After logging a finding (before asking the user how to proceed)
- Before any long-running operation (terraform apply, terraform destroy)
- When the user pauses or aborts
- At the end of the validation run

### Also update HANDOFF.md

After writing VALIDATION-STATE.md, also update the project root `HANDOFF.md` with a one-line pointer:

```markdown
## Active Validation
- Guide: <path>
- State: `workspace/<cloud>/VALIDATION-STATE.md`
- Position: Phase X, Step Y.Z
- Findings: <N> logged
```

This ensures any session — even without `--resume` — can find the validation state.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): add state persistence to validate-guide"
```

---

### Task 8: Resume section

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Append the Resume section**

```markdown
## Resume (`--resume`)

When invoked with `--resume`:

1. **Detect the guide.** If `$ARGUMENTS` includes a guide path, use it. If not, check `HANDOFF.md` for an active validation pointer. If neither exists, list available `VALIDATION-STATE.md` files under `workspace/` and ask the user which to resume.

2. **Read VALIDATION-STATE.md.** Parse the state file for:
   - Current position (first PENDING step)
   - All prior findings
   - Tab/path selections
   - Infrastructure state
   - Terraform working directory

3. **Print a summary:**
   ```
   Resuming validation: <Guide Title>
   Last session: <last updated timestamp>
   Progress: X/<total> steps completed
   Findings: Y logged (Z fixed, W open)
   Current position: Phase A, Step B.C

   Re-running pre-flight checks...
   ```

4. **Re-run pre-flight checks.** Credentials expire between sessions. Run all pre-flight checks from Phase 2. If any fail, print the fix instructions and wait.

5. **Check infrastructure state.** If the state file records deployed infrastructure (e.g., Terraform applied N resources), verify it still exists:
   - Run `terraform state list | wc -l` in the working directory
   - If the count doesn't match, warn the user: "State file says N resources but Terraform shows M. Infrastructure may have been modified or destroyed since last session."

6. **Pick up from the first PENDING step.** Resume the execution flow from Phase 3.
```

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): add resume support to validate-guide"
```

---

### Task 9: Final Report section

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Append the Final Report section**

```markdown
## Final Report

When all steps are complete (or the user aborts), produce `workspace/<cloud>/VALIDATION-REPORT.md`.

### Report format

```markdown
# Validation Report: <Guide Title>

> **Guide**: <path>
> **Validated**: <start date> — <end date>
> **Sessions**: <count>
> **Management plane**: Panorama | SCM
> **Routing model**: Overlay | Non-overlay | N/A
> **Cloud**: AWS | Azure | GCP

## Summary

| Metric | Count |
|--------|-------|
| Total steps | <N> |
| Passed | <N> |
| Findings | <N> |
| Skipped | <N> |
| Fixed during validation | <N> |
| Still open | <N> |

## Overall Verdict: <PASS | PASS WITH FINDINGS | FAIL>

- **PASS**: All steps passed, zero open findings.
- **PASS WITH FINDINGS**: All steps completed but some findings remain open. Guide works but has issues to fix.
- **FAIL**: Validation aborted due to a blocker that could not be worked around.

## Findings

| # | Phase.Step | Category | Severity | Description | Status |
|---|-----------|----------|----------|-------------|--------|
| 1 | 2A.2 | OUTDATED | Medium | `request license api-key set` removed in 11.2 | Open |
| 2 | 5.6 | CONFUSING | Low | Contradictory EIP instructions | Fixed |

### Finding Details

#### Finding #1: <title>
- **Phase/Step**: <X.Y>
- **Category**: <category>
- **Guide says**: <quote>
- **Actual result**: <what happened>
- **Resolution**: <Open | Fixed | Skipped>
- **Fix applied**: <description of fix, if any>

(Repeat for each finding)

## Steps Detail

### Phase 1: <name>
| Step | Title | Status | Notes |
|------|-------|--------|-------|
| 1.1 | <title> | PASS | |
| 1.2 | <title> | PASS | |

(Repeat for each phase)

## Infrastructure Final State

| Component | Details | Status |
|-----------|---------|--------|
(Copy from VALIDATION-STATE.md)

## Recommendations

(Auto-generated list of open findings that should be fixed before publishing the guide. Group by category. Prioritize BLOCKERs and WRONG findings over CONFUSING ones.)
```

### Verdict logic

- **PASS**: Every step has status PASS. Zero findings.
- **PASS WITH FINDINGS**: All steps completed (PASS or SKIP). One or more findings exist but none are unresolved BLOCKERs.
- **FAIL**: At least one BLOCKER finding was unresolved and the user chose ABORT.

### After the report

1. Print a one-line summary: "Validation complete: <verdict>. <N> findings (<M> open). Report at `workspace/<cloud>/VALIDATION-REPORT.md`."
2. Update HANDOFF.md to mark the validation as complete.
3. If there are open findings, suggest: "Run `/guides/validate-guide <path> --resume` after fixing the open findings to re-verify those steps."
```

- [ ] **Step 2: Commit**

```bash
git add .claude/commands/guides/validate-guide.md
git commit -m "feat(skill): add final report generation to validate-guide"
```

---

### Task 10: Self-review and final commit

**Files:**
- Modify: `.claude/commands/guides/validate-guide.md`

- [ ] **Step 1: Read the complete command file end-to-end**

Run: `wc -l .claude/commands/guides/validate-guide.md`
Expected: ~300-400 lines

- [ ] **Step 2: Verify internal consistency**

Check:
- All section references point to sections that exist (e.g., "see Finding Protocol" → Finding Protocol section exists)
- Step type names are consistent (TERRAFORM, CLI, SSH, VERIFICATION, MANUAL — same everywhere)
- State file format is identical in the State Persistence and Resume sections
- Finding categories table is identical in Finding Protocol and Final Report

- [ ] **Step 3: Verify the skill appears in the available skills list**

Run: `ls .claude/commands/guides/validate-guide.md`
Expected: file exists

The skill should now appear as `/guides/validate-guide` in the skill list on next session start.

- [ ] **Step 4: Final commit**

```bash
git add .claude/commands/guides/validate-guide.md docs/superpowers/specs/2026-05-28-validate-guide-design.md docs/superpowers/plans/2026-05-28-validate-guide.md
git commit -m "feat(skill): complete /guides/validate-guide — live infrastructure validation"
```
