# CIE + SCM Tag Monitoring Troubleshooting Reference

Quick reference for troubleshooting AWS IP-tag monitoring issues in a **CIE (Cloud Identity Engine) + SCM (Strata Cloud Manager)** deployment.

> **Not for Panorama AWS Plugin deployments.** If the customer uses the Panorama AWS Plugin (Panorama > Plugins > AWS), use `vpc-monitoring-troubleshooting-ref.md` instead.

---

## Architecture Summary

```
AWS EC2 (tagged instances)
        │
        │  HTTPS / ec2.<region>.amazonaws.com:443
        ▼
CIE Service (Palo Alto Cloud)
  - Assumes role in customer AWS account via STS
  - Polls EC2 API for instance metadata and tags
  - Maintains IP-tag mapping database
        │
        │  HTTPS / *.paloaltonetworks.com:443
        ▼
Firewall (managed by SCM)
  - Receives IP-tag registrations from CIE via segment
  - DAGs evaluate registered tags
  - Security policy enforces on DAG members

Configuration managed in SCM → DAGs, security policy pushed to firewalls
```

---

## IAM Structure for CIE (AWS)

This is **different** from the Panorama plugin IAM model.

```
Source Account (IAM user lives here)
  └─ IAM User: cie-iptag-collector
       └─ Policy: sts:AssumeRole → target account role
              │
              │  STS AssumeRole
              ▼
Target Account (EC2 workloads live here)
  └─ IAM Role: CIE-IPTag-AssumeRole
       ├─ Trust: Source account IAM user
       └─ Policy: CIE-IPTag-ReadOnly (EC2 Describe* actions)
```

### Required permissions (target account role)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeTags",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DescribeVpcs",
        "ec2:DescribeVpcEndpoints",
        "ec2:DescribeSubnets",
        "ec2:DescribeRegions"
      ],
      "Resource": "*"
    }
  ]
}
```

**Note:** CIE requires `ec2:DescribeRegions` — the Panorama plugin does NOT need this action.

### Source account user policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Resource": "arn:aws:iam::*:role/CIE-IPTag-AssumeRole"
    }
  ]
}
```

---

## Diagnostic Sequence

### Step 1 — Check CIE Monitor Configuration Status

1. Go to **hub.paloaltonetworks.com** → Cloud Identity Engine
2. Navigate to **User Context > IP-Tag Collection**
3. Select **Monitor & Status** tab
4. Find the AWS monitor configuration — check **Status** column

| Status | Meaning |
|---|---|
| `Connected` | CIE is successfully polling AWS and distributing tags |
| `Connection pending` | Initial sync in progress — wait one poll interval and refresh |
| `Not connected` | CIE cannot authenticate or reach AWS — see IAM troubleshooting below |
| `Paused` | Monitor was manually paused — re-enable and submit |

### Step 2 — Verify Tag Data in CIE Console

Click the monitor configuration name to open details:

- **VPC tab** — confirm VPCs appear with non-zero IP counts
- **Tag To IP tab** — search for a known tag (e.g., `env:prod`) — IPs should appear
- **IP To Tag tab** — search for a known instance private IP — tags should appear
- **Sync Status** — check the last successful sync timestamp

If the VPC tab is empty or IPs are 0, CIE is connecting but not seeing instances — check VPC/region scope and IAM permissions.

### Step 3 — Verify Tags on Firewall

```bash
# On managed firewall CLI:
show object registered-ip all
```
- **Expected:** IPs with `aws.tag.<key>.<value>` tags (CIE uses shorter prefix than Panorama plugin)
- **If empty:** Tags from CIE are not reaching the firewall — check firewall-to-CIE connectivity and segment assignment

```bash
show object dynamic-address-group all
```
- **Expected:** DAG with member IPs
- **`members: (not in use)`:** DAG not referenced in an active security policy rule — push a rule via SCM

---

## IAM Troubleshooting

### Credential test fails in CIE console ("Not connected")

Check in order:

1. **Access Key ID / Secret Access Key** — are they for the `cie-iptag-collector` IAM user in the source account? (Not a Panorama user, not a target-account user)
2. **Access key is active** — verify in IAM Console → Users → cie-iptag-collector → Security credentials
3. **sts:AssumeRole policy** — user must have permission to assume the role in the target account:
   ```bash
   aws iam list-attached-user-policies --user-name cie-iptag-collector
   aws iam list-user-policies --user-name cie-iptag-collector
   ```
4. **Target account role exists** — `CIE-IPTag-AssumeRole` must be present in the target account (not the source account)
5. **Role ARN format** — must be `arn:aws:iam::<TARGET-ACCOUNT-ID>:role/CIE-IPTag-AssumeRole`

### Test the AssumeRole manually

```bash
# From a workstation configured with the source-account IAM user credentials:
aws sts assume-role \
  --role-arn arn:aws:iam::<TARGET-ACCOUNT-ID>:role/CIE-IPTag-AssumeRole \
  --role-session-name CIE-test

# If this returns temporary credentials, the trust is correct.
# Then test EC2 access with those credentials:
AWS_ACCESS_KEY_ID=<temp-key> \
AWS_SECRET_ACCESS_KEY=<temp-secret> \
AWS_SESSION_TOKEN=<session-token> \
aws ec2 describe-instances --region <region> --output text
```

### Trust policy on target account role

The target account role's trust policy must reference the source account. Check it:
```bash
# In target account:
aws iam get-role --role-name CIE-IPTag-AssumeRole \
  --query 'Role.AssumeRolePolicyDocument'
```

Expected principal: `arn:aws:iam::<SOURCE-ACCOUNT-ID>:user/cie-iptag-collector`
or `arn:aws:iam::<SOURCE-ACCOUNT-ID>:root`

### Connected but seeing fewer instances than expected

- Confirm EC2 instances are in `running` state — stopped instances are not collected
- Confirm the regions selected in the monitor configuration match where the instances run
- Confirm VPC scope is set to **All VPCs** or the specific VPC IDs containing the instances
- Confirm the IAM policy includes `ec2:DescribeRegions` (CIE-specific requirement)
- Check tag character limits — tags > 127 characters are silently dropped
- Check for unsupported characters in tags (`{`, `"`, non-ASCII)

---

## Firewall Connectivity to CIE

CIE redistributes IP-tag mappings to firewalls over outbound HTTPS on port 443. The firewall management interface must reach CIE service endpoints.

```bash
# On firewall CLI — check that the CIE redistribution agent is connected:
show user ip-tag-redistribution statistics
show user ip-tag-redistribution raw

# Check redistribution configuration:
show user ip-tag-redistribution configuration
```

**Expected:** Connected state, non-zero received tag counts.

**If disconnected or no counts:**
- Verify outbound HTTPS (443) from firewall management interface to `*.paloaltonetworks.com`
- Check if a proxy is required for management traffic
- Verify the firewall is enrolled in SCM and the segment is assigned correctly
- Check: **SCM > Firewalls** — confirm the firewall is connected and segment is listed

---

## Segment Issues

**Segment is immutable after monitor configuration creation.** If the wrong segment was selected:
1. Delete the monitor configuration
2. Recreate with the correct segment
3. Tags will be removed from all firewalls in the old segment immediately upon deletion

**Firewall not receiving tags:**
- In SCM, confirm the firewall is assigned to the same segment as the CIE monitor configuration
- SCM → Firewalls → [firewall name] → check segment assignment
- CIE console → Monitor & Status → [config name] → confirm segment name matches

---

## DAG Issues (SCM-specific)

Unlike Panorama, DAG and policy configuration is done in **SCM**, not via CLI.

- **DAG not in SCM:** Navigate to SCM → Objects → Address Groups → create Dynamic type with match criteria
- **DAG match format (AWS):** `'aws.tag.<key>.<value>'` — note: CIE uses `aws.tag.` (not `aws.ec2.tag.`) format
- **DAG pushed but empty on firewall:** DAG must be referenced in an active security policy rule
- **Policy not pushed:** In SCM → Policies → verify the rule is committed and pushed to the device group

### CIE tag format comparison

| Source | Format |
|---|---|
| CIE IP Tag Collection | `aws.tag.Environment.Production` |
| Panorama AWS Plugin | `aws.ec2.tag.Environment.Production` |

**This is a common mismatch.** If the customer has DAG match criteria from a Panorama plugin deployment (using `aws.ec2.tag.*`) and has migrated to CIE, the match criteria need to be updated to `aws.tag.*` format.

---

## 32-Tag Per IP Limit

Still applies even with CIE:

- The firewall enforces a **32 tags/IP** hard limit
- If both CIE and VM Information Sources (VIS) are active, both count toward the limit
- Check: `less mp-log useridd.log` for `total number of tags exceeds the limit 32`
- **Fix:** Disable VM Information Sources on firewalls if CIE is handling tag collection

---

## Pre-Call Checklist (CIE + SCM)

Gather these before the session:

- [ ] CIE tenant status (green at status.paloaltonetworks.com?)
- [ ] Monitor Configuration status in CIE console (Connected / Not connected?)
- [ ] How many AWS accounts? Single account or cross-account?
- [ ] IAM setup method: manual or CloudFormation Template?
- [ ] Source account ID and target account ID(s)
- [ ] Whether using single-account (direct user permissions) or cross-account (AssumeRole) setup
- [ ] PAN-OS version on the firewalls (`show system info | match sw-version`)
- [ ] Whether any VM Information Sources (VIS) are also configured on the firewalls
- [ ] Output of `show object registered-ip all` from a managed firewall
- [ ] DAG match criteria in SCM — confirm format is `aws.tag.*` not `aws.ec2.tag.*`
- [ ] Any recent changes: new AWS accounts, key rotation, region changes, SCM policy pushes

---

## Common Failure Scenarios

| Symptom | Most Likely Cause | First Check |
|---|---|---|
| CIE status "Not connected" | IAM credentials wrong or AssumeRole trust broken | Test AssumeRole manually with AWS CLI |
| CIE connected, VPC tab empty | Regions in monitor config don't match instances; wrong VPC scope | Check region selection and VPC scope in monitor config |
| CIE shows tags, firewall has none | Firewall not connected to CIE / wrong segment | `show user ip-tag-redistribution statistics` on firewall |
| Firewall has tags, DAG empty | DAG not in active security policy rule | Push a policy rule referencing the DAG via SCM |
| Fewer tags than expected | 32-tag limit hit; VIS also active; tag >127 chars | Check `useridd.log` for limit warnings; check VIS config |
| DAG match not working | Tag format mismatch (aws.ec2.tag vs aws.tag) | Compare DAG match criteria with `show object registered-ip all` output |
| Recent migration from Panorama plugin | Old DAG criteria use `aws.ec2.tag.*` prefix | Update DAG match criteria in SCM to `aws.tag.*` |
