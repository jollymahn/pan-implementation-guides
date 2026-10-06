# vWAN Routing Intent Migration Checklist (UDR → Cloud NGFW via Routing Intent)

## Pre-Migration Preparation

- [ ] Document all existing UDRs across every spoke VNet, including next-hops and prefixes
- [ ] Document current effective routes on all spoke NICs/subnets
- [ ] Capture baseline traffic flows (applications, spoke-to-spoke, spoke-to-on-prem, internet egress)
- [ ] Identify all connected branches (ExpressRoute, S2S VPN) and their route advertisements
- [ ] Confirm Cloud NGFW deployment is active in the vWAN hub and health checks are passing
- [ ] Verify NGFW security policies are in place for all expected traffic flows before cutover
- [ ] Identify maintenance window — Routing Intent enablement causes a brief route reprogramming event
- [ ] Notify application and network owners of the maintenance window

## Open Preemptive TAC Case with Palo Alto Networks

- [ ] Open a TAC case flagged as **Proactive/Planned Change** — not a break-fix
- [ ] Include in the case:
  - Subscription ID and vWAN Hub resource ID
  - Cloud NGFW resource ID and region
  - Planned maintenance date/time
  - Description: *Enabling Routing Intent on Azure vWAN hub to route private and/or internet traffic through Cloud NGFW, migrating from spoke UDRs*
- [ ] Request a TAC engineer be available during the maintenance window
- [ ] Confirm escalation path if traffic black-holing occurs post-cutover
- [ ] Save the TAC case number and engineer contact for the runbook

## Sales Team Notification

- [ ] Email the assigned Palo Alto Networks sales team (AE + SE) with:
  - Customer name and account ID
  - Planned cutover date
  - Scope: number of spokes, estimated traffic volume through NGFW
  - Any known risks or concerns
- [ ] Request SE standby availability during the maintenance window (optional but recommended for large environments)
- [ ] Confirm with sales whether a Customer Success Manager (CSM) should be looped in

## Azure Configuration — Routing Intent Enablement

- [ ] Confirm the vWAN hub SKU is **Standard** (Routing Intent requires Standard hub)
- [ ] Verify Cloud NGFW is the designated **Next Hop** resource in Routing Intent configuration
- [ ] Decide routing intent scope:
  - [ ] **Private traffic** (spoke-to-spoke, spoke-to-branch)
  - [ ] **Internet traffic**
  - [ ] Both
- [ ] Enable Routing Intent on the hub via Azure Portal, CLI, or Bicep/Terraform
- [ ] Confirm Azure propagates the 0.0.0.0/0 and/or RFC1918 default routes to all spokes automatically — UDRs for these prefixes on spoke subnets are **no longer needed** and may conflict
- [ ] Remove conflicting UDRs from spoke subnets after Routing Intent is confirmed active
- [ ] Verify effective routes on spoke NICs reflect the new next-hop (Cloud NGFW private IP)

## Validation & Testing

- [ ] Confirm internet-bound traffic from a spoke VM is traversing the NGFW (check NGFW traffic logs)
- [ ] Confirm spoke-to-spoke traffic is traversing the NGFW
- [ ] Confirm spoke-to-branch (VPN/ER) traffic is traversing the NGFW if private intent is enabled
- [ ] Verify BGP route propagation to branches is unaffected
- [ ] Check NGFW traffic logs for any unexpected drops or policy denials
- [ ] Run application smoke tests across all critical workloads
- [ ] Confirm no asymmetric routing conditions exist

## Post-Migration

- [ ] Update internal network diagrams and runbooks to reflect Routing Intent architecture
- [ ] Remove all legacy UDRs that are now redundant
- [ ] Update monitoring/alerting dashboards to reflect new traffic path
- [ ] Close or update the TAC case with outcome
- [ ] Send cutover completion notice to sales team and stakeholders
- [ ] Schedule a 24-hour and 7-day post-change review

---

> **Key gotcha:** Spoke subnet UDRs with more-specific routes (e.g., /32s or custom prefixes) will still override Routing Intent — audit for these and remove or reconcile them explicitly.
