# AWS VM-Series Combined Design — Deployment Checklist

Companion artifact to [`vm-series-deployment.html`](../vm-series-deployment.html). Fill this in **before** you edit `terraform.tfvars` so every operator-specific value is sourced from one place. Most deployments fail because one of these values gets pulled from the wrong place (a baseline template, a copy-pasted example, or a lab Panorama). Using this sheet eliminates that whole class of mistake.

> **Why this exists:** during the 2026-04-21 deployment, the `panorama-server` IP was lifted from an existing PAN-OS template (`10.255.247.51`) instead of the customer's actual Panorama (`10.251.2.51`). The firewalls bootstrapped, registered with the **wrong** Panorama, and had to be terminated and re-deployed. A pre-flight checklist would have caught this before `terraform apply`.

---

## Section A — Bootstrap parameters (`bootstrap_options` block)

These end up inside `vmseries.vmseries.bootstrap_options` in `terraform.tfvars` and are injected into the firewalls via user-data. **Get them right before the first `terraform apply`** — fixing them after means terminating the FW EC2 instances and re-applying.

| Parameter | Source | Where used in tfvars | Example | Your value |
|---|---|---|---|---|
| `mgmt-interface-swap` | **Fixed** for this design | `bootstrap_options.mgmt-interface-swap` | `enable` | `enable` |
| `plugin-op-commands` | **Fixed** for combined + non-overlay GWLB | `bootstrap_options.plugin-op-commands` | `panorama-licensing-mode-on,aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable` | _(use example as-is)_ |
| `panorama-server` | **Customer / your network** — IP or FQDN reachable from the FW mgmt subnet. Confirm with customer; **do NOT copy from existing baseline templates** | `bootstrap_options.panorama-server` | `10.251.2.51` | _____________ |
| `panorama-server-2` | **Customer / your network** — secondary Panorama (HA peer). Same rules as above | `bootstrap_options.panorama-server-2` | `10.251.2.52` | _____________ |
| `auth-key` | Panorama → Panorama → Setup → Management → **Device Registration Auth Key** (Phase 1.5) | `bootstrap_options.auth-key` | `_AQ__K9YajjW...` | _____________ |
| `vm-series-auto-registration-pin-id` | CSP Portal → Assets → Software & Subscriptions → **Generate Registration PIN** (Phase 1.6) | `bootstrap_options.vm-series-auto-registration-pin-id` | UUID | _____________ |
| `vm-series-auto-registration-pin-value` | Same step as above | `bootstrap_options.vm-series-auto-registration-pin-value` | hex string | _____________ |
| `dgname` | Customer-prefixed device group name created in Phase 2A.3 | `bootstrap_options.dgname` | `DG-CLD-AWS-COMBINED` | _____________ |
| `tplname` | Customer-prefixed template stack name created in Phase 2A.4 | `bootstrap_options.tplname` | `STK-CLD-AWS-COMBINED-AZ-A` | _____________ |
| `dhcp-send-hostname` | **Fixed** AWS default | `bootstrap_options.dhcp-send-hostname` | `yes` | `yes` |
| `dhcp-send-client-id` | **Fixed** AWS default | `bootstrap_options.dhcp-send-client-id` | `yes` | `yes` |
| `dhcp-accept-server-hostname` | **Fixed** AWS default | `bootstrap_options.dhcp-accept-server-hostname` | `yes` | `yes` |
| `dhcp-accept-server-domain` | **Fixed** AWS default | `bootstrap_options.dhcp-accept-server-domain` | `yes` | `yes` |

### Validation before `terraform apply`

- [ ] `panorama-server` and `panorama-server-2` are **reachable from the planned FW mgmt subnet CIDR** via TGW peering, VPC peering, or Direct Connect. If not, the FW will boot but never register.
- [ ] `dgname` and `tplname` **exist** in Panorama (you created them in Phase 2A.3 / 2A.4).
- [ ] `dgname` and `tplname` are **not already in use** by another tenant on a shared Panorama (use customer-prefix convention to avoid collisions).
- [ ] `auth-key` is the active key (it can be rotated — check it hasn't been replaced since you copied it).
- [ ] The `vmseries_mgmt` SG opens **TCP/3978 and TCP/28443** from your Panorama subnet CIDR (see Section B). Without these the FW boots and registers but Panorama config push, log forwarding, and software upgrades silently fail.

---

## Section B — Other deployment values (root `terraform.tfvars`)

Required values outside `bootstrap_options`. These don't break the FW boot if wrong, but they will produce a deployment that doesn't match your environment / naming conventions.

| Parameter | Source | Where used in tfvars | Example | Your value |
|---|---|---|---|---|
| `region` | Customer / target AWS region | `region` | `us-west-2` | _____________ |
| `name_prefix` | Customer / project naming convention | `name_prefix` | `sj-cld-` | _____________ |
| `ssh_key_name` | AWS Console → EC2 → Key Pairs (must already exist in target region) | `ssh_key_name` | `SJOLLY-SME-ACCT` | _____________ |
| Availability Zones | 3+ AZs in your region (combined design uses 2 AZs for FWs, 3 for GWLB) | `vmseries.instances.*.az` and `vpcs.*.subnets.*.az` | `us-west-2a`, `us-west-2b`, `us-west-2c` | _____________ |
| Admin source CIDR | Operator's mgmt network — **never `0.0.0.0/0`** | `vpcs.security_vpc.security_groups.vmseries_mgmt.rules.*.cidr_blocks` | `199.167.52.5/32` | _____________ |
| Customer prefix | 2–4 char code used in `dgname`, `tplname`, template names, license-manager name. Avoids collisions on shared Panoramas | (composed into above) | `CLD` | _____________ |
| Panorama subnet CIDR | The subnet (or supernet) Panorama lives on. Used as the `cidr_blocks` for the TCP/3978 + TCP/28443 SG rules on `vmseries_mgmt` so Panorama can manage the firewall. **Without these rules the FW registers but Panorama config push, log fwd, and sw upgrade silently fail.** | `vpcs.security_vpc.security_groups.vmseries_mgmt.rules.panorama_mgmt.cidr_blocks` and `.panorama_device_cert.cidr_blocks` | `10.251.2.0/24` | _____________ |
| `Owner` tag | Customer/project owner (shows up in AWS billing/cost-allocation) | `global_tags.Owner` | `sjolly` | _____________ |
| `Application` tag | Customer/project application name | `global_tags.Application` | `prod-firewalls` | _____________ |

### Spoke VM instance type (environment-dependent)

| Parameter | Source | Where used in tfvars | Default | Your value |
|---|---|---|---|---|
| `spoke_vms.*.type` | AWS account constraints (SCPs, quotas) | `spoke_vms.<name>.type` | `t3.micro` | _____________ |

> **Note:** Reference tfvars defaults `spoke_vms.type` to `t3.micro`. If your AWS account has Service Control Policies blocking older non-Nitro instance/volume types (look for SCPs denying `ec2:RunInstances` on `volume/*`), override to a Nitro-class instance (e.g., `m5.large`). Symptom: `UnauthorizedOperation` on RunInstances during `terraform apply`.

---

## Section C — Phase 1 prerequisites (Panorama-side)

These aren't tfvars values but they must be in place **before** you run terraform; the bootstrap sequence depends on them.

| Item | Where | Verified? |
|---|---|---|
| Panorama version supports your PAN-OS image | Panorama → Dashboard | ☐ |
| SW Firewall License Plugin installed | Panorama → Plugins | ☐ |
| Panorama licensed for the right device count | Panorama → Licenses | ☐ |
| Device Registration Auth Key generated and copied | Panorama → Setup → Management | ☐ |
| Auto-Registration PIN generated and copied | CSP Portal → Assets | ☐ |
| Customer prefix decided and approved | Internal | ☐ |
| Customer-prefixed Device Group created | Panorama → Device Groups | ☐ |
| Customer-prefixed Template Stack created | Panorama → Templates | ☐ |
| License Manager created and bound to the Device Group | Panorama → Plugins → SW FW License → License Managers | ☐ |
| TGW route from FW mgmt subnet → Panorama subnet exists (or peering / DX) | AWS / customer network team | ☐ |
| **Account default EBS KMS key set in the target region** (the example's `main.tf` reads `data.aws_ebs_default_kms_key.current` and uses it for spoke VM root volumes; without a default key, `terraform apply` fails). Set via AWS Console → EC2 → Settings → Data protection → EBS encryption, or CLI: `aws ec2 enable-ebs-encryption-by-default && aws ec2 modify-ebs-default-kms-key-id --kms-key-id alias/aws/ebs` | AWS account / org admin | ☐ |

---

## How to use this sheet

1. Make a copy per deployment (don't fill in the canonical file in the repo).
2. Walk Phase 1 → Phase 3 of the guide and fill values in as you go.
3. Hand the completed sheet to whoever runs `terraform apply` — they should be able to populate `terraform.tfvars` from this sheet alone, with no need to revisit Panorama.
4. Keep the completed sheet attached to the deployment ticket / runbook for audit and post-mortem.
