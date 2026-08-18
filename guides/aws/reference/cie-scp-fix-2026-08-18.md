# CIE Credential Validation Failure — SCP Fix
**Date:** 2026-08-18  
**Customer environment:** CIE + SCM with 22 AWS target accounts

---

## Error

```
Failed to validate the credential: Failed to describe regions.
An error occurred (UnauthorizedOperation) when calling the DescribeRegions operation:
User: arn:aws:iam::026870877824:user/ogs/Panorama-VMMonitor is not authorized to perform:
ec2:DescribeRegions with an explicit deny in a service control policy:
arn:aws:organizations::993968405777:policy/o-2x57k1jjqt/service_control_policy/p-getsv7jh
```

---

## Root Cause

SCP `p-getsv7jh` in org `993968405777` explicitly denies `ec2:DescribeRegions`. CIE calls this action against the source account credentials during credential validation. SCP explicit denies override all IAM Allow policies — the `PanoramaConnectionTest` IAM statement allowing `ec2:DescribeRegions` has no effect.

Additionally, `ec2:DescribeRegions` is missing from the `PanoramaVMMonitoring` policy on all 22 target account roles, so the same failure will occur when CIE assumes those roles.

---

## Fix 1 — SCP Modification (org admin, account 993968405777)

Edit SCP `p-getsv7jh` to add a condition exempting the CIE user and role from the `ec2:DescribeRegions` deny:

```json
{
  "Effect": "Deny",
  "Action": "ec2:DescribeRegions",
  "Resource": "*",
  "Condition": {
    "StringNotLike": {
      "aws:PrincipalARN": [
        "arn:aws:iam::026870877824:user/ogs/Panorama-VMMonitor",
        "arn:aws:iam::*:role/ogs/PanoramaVMMonitoringRole"
      ]
    }
  }
}
```

This preserves the deny for all other principals and exempts only the CIE user and the monitoring roles across all accounts.

---

## Fix 2 — Target Account Role Policy (all 22 accounts)

Update the `PanoramaVMMonitoring` policy on `PanoramaVMMonitoringRole` in each target account to add `ec2:DescribeRegions`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PanoramaVMMonitoring",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DescribeVpcs",
        "ec2:DescribeVpcEndpoints",
        "ec2:DescribeSubnets",
        "ec2:DescribeTags",
        "ec2:DescribeRegions",
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:DescribeTags"
      ],
      "Resource": "*"
    }
  ]
}
```

Target accounts:
`022029981322`, `026870877824`, `049522812830`, `072072693799`, `092439868781`,
`255325275527`, `302579735228`, `380283541803`, `395310663421`, `407296935354`,
`420653164090`, `423159468835`, `463771485858`, `655707937362`, `671081739107`,
`685226373204`, `734115983025`, `794614376667`, `897347884865`, `933501242187`,
`975305814999`, `981276358637`

---

## Order of Operations

1. Org admin applies SCP fix — nothing else will work until this is done
2. Update `PanoramaVMMonitoring` policy in all 22 target account roles
3. Re-run CIE credential **Test Connection** — should return success
4. Verify monitor configuration status shows `Connected` in CIE console (User Context > IP-Tag Collection > Monitor & Status)

---

## Pending

Awaiting org admin (account `993968405777`) to modify SCP `p-getsv7jh`.
