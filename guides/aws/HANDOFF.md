# AWS Guide Phase 2A Restructuring — Handoff

## Status: COMPLETE
Both the Azure and AWS guide restructuring are **done**.

## What was done (AWS guide — 2026-05-22)
File: `docs/guides/aws/vm-series-deployment.html`

1. **Moved Bootstrap Definition** (old 2A.5) → new 2A.3, right after Set the Licensing API Key
2. **Merged Device Groups + Templates** (old 2A.3 + 2A.4) into single **2A.4 TPL- Create Device Groups & Template Stacks** under "Device-Group and Template Configuration"
3. **Added transition paragraph** before 2A.4 explaining what comes next
4. **Moved License Manager** (old 2A.6) → new 2A.13, just before Commit to Panorama
5. **Added TPL- prefix** to template-scoped sections: 2A.4, 2A.5, 2A.6, 2A.7, 2A.12
6. **Added DG- prefix** to device-group-scoped sections: 2A.8, 2A.9, 2A.10, 2A.11
7. **Renumbered all sections** and updated ~20 cross-references throughout the file
8. **Updated Licensing Plugin intro text** to reflect reduced scope (no longer mentions DGs/templates)

### Final AWS structure
```
Licensing Plugin (h3):
  2A.1  Install the SW Firewall License Plugin
  2A.2  Set the Licensing API Key
  2A.3  Create a Bootstrap Definition

Device-Group and Template Configuration (h3):
  [Transition paragraph]
  2A.4  TPL- Create Device Groups & Template Stacks
  2A.5  TPL- Configure Common Baseline Settings
  2A.6  TPL- Configure Interfaces & Routing — Pick a Routing Model
  2A.7  TPL- Configure Security Zones
  2A.8  DG-  Configure Tags
  2A.9  DG-  Configure Address Objects & Security Policy
  2A.10 DG-  Configure NAT Policy
  2A.11 DG-  Configure Logging
  2A.12 TPL- Set Template Variables
  2A.13 Configure a License Manager
  2A.14 Commit to Panorama
```

## Remaining items (not part of this restructure)
- DNAT tags (DNAT-1, DNAT-2, DNAT-3) not yet added to Tags section (2A.8)
- 3 manual Policies-tab screenshots still pending (see `project_aws_screenshot_pending` memory)

## Git state
- Branch: main
- Changes uncommitted
