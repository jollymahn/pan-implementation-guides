# Modules

The lab is organized into **8 modules across 3 acts**. You build a complete ML pipeline, then systematically secure it.

Each module runs interactively in Claude Code. The descriptions below cover what you'll learn and do: the actual hands-on challenges, hints, and verification happen live with your AI mentor.

---

## Act 1: Build It

You build a real ML pipeline from scratch. By the end of Act 1, you'll have a live cybersecurity advisor chatbot running on Google Cloud: trained, merged, published, and deployed. No security scans are in place yet. That's intentional.

### Module 0: Environment Setup

Set up your working environment: GCP project, GitHub CLI, AIRS credentials, and Claude Code configuration. This is your pre-flight checklist.

**Objectives:**
- Orient yourself to the codebase and 3-gate pipeline structure
- Verify GCP authentication and project configuration
- Configure IAM service accounts and Workload Identity Federation
- Set AIRS scanning credentials as GitHub repository secrets
- Understand how `CLAUDE.md` configures Claude Code as your mentor

**Time:** ~30 minutes | **Start:** `/lab:module 0`

---

### Module 1: ML Fundamentals & HuggingFace

A research and exploration module. No code to write: you'll explore HuggingFace, evaluate models, understand file formats, and build the mental model needed for the rest of the lab.

**Objectives:**
- Navigate HuggingFace and evaluate models for enterprise use
- Understand pickle vs safetensors and why format matters for security
- Learn LoRA fine-tuning concepts (adapters, parameter efficiency, cost)
- Compare ML platforms (Vertex AI vs raw compute)

**Time:** ~45 minutes | **Start:** `/lab:module 1`

---

### Module 2: Train Your Model

Trigger Gate 1 to fine-tune Qwen2.5-3B on NIST cybersecurity data using Vertex AI. While training runs, you'll study the merge process that turns a LoRA adapter into a deployable model.

**Objectives:**
- Understand the Gate 1 training workflow end-to-end
- Customize training parameters and trigger a training job
- Understand LoRA merge mechanics (`merge_adapter.py`)
- Verify training artifacts in GCS

**Time:** ~30 minutes active + training wait time | **Start:** `/lab:module 2`

---

### Module 3: Deploy & Serve

Take your trained model from GCS artifacts to a live application. Run Gate 2 (merge + publish) and Gate 3 (deploy), then test your cybersecurity advisor in a browser.

**Objectives:**
- Understand the decoupled architecture (model on GPU, app on CPU)
- Run the full publish and deploy pipeline
- Test your live application with cybersecurity questions
- Articulate the complete architecture and identify the security gap

**Time:** ~30 minutes active + deployment wait time | **Start:** `/lab:module 3`

> **End of Act 1:**
> You just deployed a model to production **without any security scanning**. Anyone could have tampered with the base model, poisoned the training data, or injected malicious code. The pipeline works, but it is not secure. Acts 2 and 3 fix that.


---

## Presentation Break

Instructor-led session covering the AIRS value proposition, real-world model supply chain attacks, and customer engagement scenarios. This builds on everything you just experienced in Act 1.

> **Workshop Students:**
> This is a **hard stop**. Do not proceed to Module 4 until the instructor resumes the group. If you finish Act 1 early, help your classmates or explore topics deeper with `/lab:explore`.


---

## Act 2: Understand Security

A deep dive into AIRS itself. You'll set up access, run your first scans, explore the HuggingFace partnership, and build custom security policies.

### Module 4: AIRS Deep Dive

Get hands-on with AIRS Model Security. Activate the deployment profile, navigate SCM, run scans through the CLI and SDK, explore the HuggingFace integration, and understand security group policies.

**Objectives:**
- Activate AI Model Security in your Prisma AIRS tenant
- Navigate the SCM console (dashboard, scans, security groups)
- Run scans via CLI and Python SDK
- Understand the HuggingFace partnership and what AIRS adds beyond it
- Configure security group policies (blocking vs alerting)

**Time:** ~1-1.5 hours | **Start:** `/lab:module 4`

---

## Act 3: Secure It

You take everything you've learned and secure the pipeline you built in Act 1. Then you explore what AIRS catches, what it doesn't, and how to talk honestly with customers about both.

### Module 5: Integrate AIRS into Pipeline

Add AIRS scanning to your CI/CD pipeline. Modify Gate 2 to scan after merge, add manifest verification to Gate 3, label your scans for traceability, and enrich scan output in GitHub Actions.

**Objectives:**
- Add AIRS scanning steps to the Gate 2 workflow
- Add manifest verification to the Gate 3 workflow
- Implement scan labeling for pipeline-to-SCM traceability
- Enrich scan results in GitHub Actions summaries

**Time:** ~1-1.5 hours | **Start:** `/lab:module 5`

---

### Module 6: The Threat Zoo

Build malicious models and watch AIRS catch them. Create pickle bombs, Keras traps, and format exploits, then scan them and study the detection results. Research real-world incidents to understand why this matters.

**Objectives:**
- Create and scan a pickle bomb (runtime code execution)
- Create and scan a Keras Lambda exploit (load-time code execution)
- Compare scan results across model formats (pickle vs safetensors)
- Research real-world model supply chain attacks

**Time:** ~1 hour | **Start:** `/lab:module 6`

---

### Module 7: Gaps & Poisoning

Discover what AIRS can't catch. Create a poisoned dataset, train a backdoored model, prove that both clean and poisoned models pass structural scanning, and learn to frame this honestly in customer conversations.

**Objectives:**
- Understand the boundary between structural and behavioral security
- Create a poisoned dataset and train a compromised model
- Demonstrate that poisoned models pass all AIRS scans
- Articulate a defense-in-depth strategy for customer conversations

**Time:** ~45 minutes - 1 hour | **Start:** `/lab:module 7`
