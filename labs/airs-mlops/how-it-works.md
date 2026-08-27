# How the Lab Works

This lab is built around **Claude Code** as your AI development partner. You don't copy-paste commands from a PDF: you work interactively with an AI mentor that knows the codebase, paces its teaching, and adapts to your progress.

## Claude Code as Your Mentor

Claude has been configured (via `CLAUDE.md` in the repo root) specifically for this lab. It will:

- **Teach one concept at a time** and check your understanding before moving on
- **Ask questions, not lecture** — Socratic method throughout
- **Run commands for you** and explain what happened — you learn the reasoning, not the syntax
- **Give progressive hints** when you're stuck:
  1. **Concept hint** — what you should be thinking about
  2. **Approach hint** — how to get there
  3. **Specific hint** — exactly what to do
- **Show real code from the project** instead of abstract examples

### Language Support

Claude supports the lab in your native language. If you write in Spanish, Portuguese, or another language, Claude will respond in that language automatically. Technical terms (pipeline, endpoint, scan, AIRS, IAM, etc.) stay in English since they're industry-standard. Quiz answers are evaluated on concepts, not language: answer in whatever you're most comfortable with.

> **Experimental:**
> Multilingual support is built in but not yet extensively tested across all modules. English is the primary language. If you hit rough edges in another language, let your instructor know.


### Commands

Everything runs through Claude Code slash commands:

| Command | Purpose |
|---------|---------|
| `/lab:module N` | Start or resume module N |
| `/lab:verify-N` | Run verification checks for module N |
| `/lab:hint` | Get a progressive hint for your current challenge |
| `/lab:explore TOPIC` | Guided deep-dive into a concept |
| `/lab:quiz` | Test your understanding |
| `/lab:progress` | See your completion dashboard |

---

## Scoring & Leaderboard

Your progress is tracked and scored throughout the lab. Points come from two sources:

### Technical Checks

Each module has concrete verification steps that Claude runs against your actual infrastructure. These check things like: Is your GCP project configured? Did the training job produce output? Is your app deployed and responding? You earn points when real checks pass: not self-reported.

### Understanding Questions

After completing a module's challenges, Claude asks comprehension questions to test your understanding. These are scored 0-3 per question:

| Score | Meaning |
|-------|---------|
| 3 | Complete, accurate answer |
| 2 | Mostly correct, minor gaps |
| 1 | Needed hints to get there |
| 0 | Could not answer |

### Collaboration Bonuses

Instructors can award bonus points during discussion breaks:

| Bonus | Points | How |
|-------|--------|-----|
| Teaching Bonus | +2 | Explained a concept to a classmate |
| Discovery Bonus | +2 | Found an undocumented issue or insight |
| Best Question | +1 | Asked a particularly insightful question |

### Points by Module

| Module | Technical | Understanding | Max |
|--------|-----------|---------------|-----|
| 0: Environment Setup | 14 | 8 | 22 |
| 1: ML Fundamentals | — | 9 | 9 |
| 2: Train Your Model | 2 | 6 | 8 |
| 3: Deploy & Serve | 4 | 6 | 10 |
| 4: AIRS Deep Dive | 8 | 6 | 14 |
| 5: Pipeline Integration | 10 | 3 | 13 |
| 6: The Threat Zoo | 6 | 6 | 12 |
| 7: Gaps & Poisoning | 6 | 6 | 12 |
| **Total** | **50** | **50** | **100** |

> **Workshop students:**
> Workshop scenarios include 2 additional points in Module 0 (upstream remote setup and project naming verification) for a possible 100-point maximum. Self-paced scenarios cap at 98.


### Leaderboard

After each `/lab:verify-N`, your score is automatically posted to the live leaderboard. You can see where you stand relative to other participants in real time.

The leaderboard tracks:
- Total points across all modules
- Number of modules completed
- Individual module scores

---

## Pacing & Hard Stops

### Workshop Pacing

The lab is designed for **~4 hours** of active work, split across two sessions with a presentation break in between.

> **Hard Stops:**
> In workshop scenarios, there are **hard stops** after Module 3 and optionally after Module 4. When you hit a hard stop, Claude will tell you. You cannot proceed to the next module until the instructor resumes the group.
>
> **Why?** The instructor-led AIRS presentation between Acts 1 and 2 builds on what you just experienced. If half the class has already raced ahead, the discussion loses context and everyone suffers.


### If You Finish Early

**Help others.** This is collaborative, not just competitive. The Teaching Bonus (+2 pts) and Discovery Bonus (+2 pts) reward exactly this behavior.

Walk over to someone who's stuck. Explain what you figured out. You'll solidify your own understanding and earn bonus points.

### If You're Falling Behind

The leaderboard updates live. If you notice you're one of the last to complete a module, pick up the pace. It's fine to dig deep into interesting topics with Claude: that's great learning: but be mindful of the group's timing.

> **Time budgets:**
> | Act | Modules | Target Time |
> |-----|---------|-------------|
> | Act 1: Build It | 0, 1, 2, 3 | ~3-4 hours |
> | *Presentation Break* | -- | ~30-45 min |
> | Act 2: Understand Security | 4 | ~1-1.5 hours |
> | Act 3: Secure It | 5, 6, 7 | ~2.5-3.5 hours |


### Hard Blockers

Some setup issues in Module 0 are **hard blockers**: if your GCP project isn't accessible or AIRS credentials aren't configured, later modules will be blocked. `/lab:verify-0` catches these early. Don't skip it.

If you hit a hard blocker, Claude will warn you clearly and add it to your progress file. You can still participate in discussions and concept exploration, but the technical challenges that depend on the blocked resource won't work.

---

## Scenarios

When you first start the lab, Claude asks which scenario you're in:

| Scenario | Hard Stops | Leaderboard | For |
|----------|-----------|-------------|-----|
| **TS Workshop** | Yes | Yes | Instructor-led Technical Services workshop |
| **TS Self-Paced** | No | Yes | Self-paced TS learning |
| **Internal** | No | No | Other internal teams |
| **Public** | No | No | Self-guided learners |

Your scenario determines pacing rules, whether hard stops are enforced, and whether your scores post to the leaderboard. Claude handles all of this automatically based on your selection during onboarding.
