# AIRS Guides — Handoff

## Status: Network Intercept suite complete (documentation-first, not yet live-validated)

## What's Done

### AIRS API Intercept Guide (complete, published)
- `airs-api-intercept.html` — 1933-line guide, browser-verified, committed and pushed
- `airs-api-intercept.md` — companion Markdown version

### AIRS Network Intercept — Core Guide (complete, needs validation)
- `airs-network-intercept.html` — 2560-line guide, browser-verified
- `airs-network-intercept.md` — companion Markdown version
- Covers: architecture, prerequisites, license activation, cloud onboarding, security profiles (SCM/Panorama tabbed), validation, day-2 ops, troubleshooting, reference
- 3 `[VALIDATION NEEDED]` markers for steps where source docs were insufficient

### AIRS Cloud Deployment Guide (complete, needs validation)
- `airs-cloud-deployment.html` — deployment-model-specific guide
- Covers: SCM Terraform (AWS/Azure/GCP tabbed), Auto-Execute, Panorama-managed, VM-Series, Private Cloud (ESXi/KVM), Manual Bootstrap
- Companion .md version pending

### AIRS K8s & Container Protection Guide (complete, needs validation)
- `airs-k8s-protection.html` — Kubernetes/container security guide
- Covers: PAN-CNI Helm install, post-deployment FW config (cloud+mgmt tabbed), Tag Collector (AWS/Azure), IP tag harvesting, traffic objects
- Companion .md version pending

### AIRS Microperimeter Guide (complete, needs validation)
- `airs-microperimeter.html` — standalone microperimeter guide
- Covers: GENEVE architecture, panredirect deployment, steering rules, diagnostic bundles, CLI reference
- Companion .md version pending

### Index Page (updated)
- Runtime Firewall card changed from "Coming Soon" to live with links to all 4 guides

### Research
- `workspace/airs/airs-ai-runtime/RESEARCH.md` — full research synthesis with guide architecture rationale, content mapping, gap analysis

## What's Left

### High Priority
- **Live validation** — deploy AIRS in a test environment and walk through all 4 guides to verify steps, fill [VALIDATION NEEDED] gaps
- **Companion .md files** — generate Markdown versions for cloud-deployment, k8s, and microperimeter guides
- **Screenshots** — capture verification screenshots during live validation

### Medium Priority
- **Cross-link audit** — verify all cross-references between the 4 guides resolve correctly
- **Header nav update** — consider adding an AIRS sub-nav or dropdown since there are now 5 AIRS guides

### Low Priority
- **SaaS Agent Security guide** — separate product/license, not part of this guide set
- **Hyperscale Security Fabric guide** — ESXi/Panorama-only, specialized audience

## Guide Architecture

```
Core Guide (airs-network-intercept.html)
├── Prerequisites, licensing, security profiles, validation
├── References Cloud Deployment Guide for firewall deployment
└── References K8s + Microperimeter as bolt-on modules

Cloud Deployment Guide (airs-cloud-deployment.html)
├── 6 deployment models with cloud-tabbed paths
├── References Core Guide for pre/post-deployment steps
└── References K8s Guide for container workloads

K8s Guide (airs-k8s-protection.html)
├── Helm, tag collectors, IP harvesting, traffic objects
└── References Core Guide + Cloud Deployment Guide

Microperimeter Guide (airs-microperimeter.html)
├── Standalone: panredirect agent, steering, troubleshooting
└── References Core Guide for AIRS licensing prerequisites

API Intercept Guide (airs-api-intercept.html)
└── Standalone: API-level security-as-code integration
```
