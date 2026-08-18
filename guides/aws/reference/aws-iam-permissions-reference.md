# AWS IAM Permissions Reference — Panorama AWS Plugin

Quick reference for verifying, testing, and troubleshooting IAM permissions used by the Panorama AWS Plugin for VPC monitoring.

---

## Required Permission Set

Minimum policy the plugin needs. All actions are **read-only**.

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
        "elasticloadbalancing:DescribeLoadBalancers",
        "elasticloadbalancing:DescribeLoadBalancerAttributes",
        "elasticloadbalancing:DescribeTags"
      ],
      "Resource": "*"
    }
  ]
}
```

### What each action retrieves

| IAM Action | Data Retrieved by Plugin |
|---|---|
| `ec2:DescribeInstances` | Instance ID, state, type, AMI, AZ, tags, security groups, subnet, VPC, key pair, architecture |
| `ec2:DescribeNetworkInterfaces` | Private IP addresses for each network interface (multi-NIC instances) |
| `ec2:DescribeVpcs` | VPC metadata; used to validate monitored VPC IDs |
| `ec2:DescribeVpcEndpoints` | VPC endpoint IDs (for `aws.endpoint-id` tag generation) |
| `ec2:DescribeSubnets` | Subnet IDs (for `aws.ec2.subnet-id` tag generation) |
| `elasticloadbalancing:DescribeLoadBalancers` | Load balancer names (for `aws.lb.lb-name` tag) |
| `elasticloadbalancing:DescribeLoadBalancerAttributes` | LB attributes used in tag generation |
| `elasticloadbalancing:DescribeTags` | User-defined tags on load balancers |

---

## Verifying Permissions (AWS CLI)

Run these from any workstation with AWS CLI configured under the same credentials the plugin uses.

### Test EC2 Describe permission
```bash
aws ec2 describe-instances \
  --region <region> \
  --filters "Name=vpc-id,Values=<vpc-id>" \
  --query 'Reservations[*].Instances[*].{ID:InstanceId,State:State.Name,Tags:Tags}' \
  --output table
```

### Test with explicit profile/role
```bash
aws ec2 describe-instances \
  --profile <iam-user-profile> \
  --region <region> \
  --output text
```

### Test STS AssumeRole (cross-account)
```bash
# Assume the monitored-account role from the Panorama credentials account
aws sts assume-role \
  --role-arn arn:aws:iam::<ACCOUNT-1-ID>:role/PanoramaMonitoringRole \
  --role-session-name PanoramaTest

# If successful, you get temporary credentials (AccessKeyId, SecretAccessKey, SessionToken)
# Use them to test EC2 Describe in the monitored account:
AWS_ACCESS_KEY_ID=<temp-key> \
AWS_SECRET_ACCESS_KEY=<temp-secret> \
AWS_SESSION_TOKEN=<session-token> \
aws ec2 describe-instances --region <region>
```

### Test instance profile (when Panorama is on AWS)
```bash
# Run from Panorama EC2 instance CLI via SSH or console
curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/
# Returns the profile name; then:
curl -s http://169.254.169.254/latest/meta-data/iam/security-credentials/<profile-name>
# Returns temp credentials — confirms profile is attached
```

---

## IAM Policy Simulator (Console)

Use the IAM Policy Simulator to test permissions without making real API calls.

1. Go to: **IAM Console → Policy Simulator** (search "Policy Simulator")
2. Select the IAM user or role used by the plugin
3. Service: **EC2**, Action: **DescribeInstances** → Run simulation
4. Expected result: **allowed**

URL: `https://policysim.aws.amazon.com/`

---

## Common IAM Error Messages and Fixes

### `AccessDenied: User ... is not authorized to perform ec2:DescribeInstances`
- **Cause:** Policy not attached to the IAM user/role, or wrong user/role is being used
- **Fix:** Verify the `PanoramaVMMonitoring` policy is attached; confirm Access Key belongs to the correct user
- **CLI check:** `aws iam list-attached-user-policies --user-name panorama-monitoring`

### `AccessDenied: User ... is not authorized to perform sts:AssumeRole`
- **Cause 1:** IAM user in Account 2 is missing `sts:AssumeRole` policy pointing to Account 1's role ARN
- **Cause 2:** Account 1's role trust policy does not include Account 2 as a trusted principal
- **Fix:** Check both policies — the user's permission policy AND the role's trust policy
- **CLI check (trust policy):** `aws iam get-role --role-name PanoramaMonitoringRole --query 'Role.AssumeRolePolicyDocument'`

### `An error occurred (InvalidClientTokenId): The security token included in the request is invalid`
- **Cause:** Access Key ID or Secret Key is wrong, expired, or the key was deleted and recreated
- **Fix:** Rotate the access key in IAM → Users → Security credentials; update Panorama with the new key

### `An error occurred (ExpiredTokenException): The security token included in the request is expired`
- **Cause (instance profile):** Temporary credentials expired — IMDSv2 or metadata service issue
- **Fix:** Verify Panorama instance can reach `169.254.169.254`; check instance profile is still attached
- **Cause (assume role):** Role session duration exceeded
- **Fix:** Re-trigger role assumption (Panorama handles this automatically on next poll cycle)

### `An error occurred (UnauthorizedOperation): You are not authorized to perform this operation`
- Different from AccessDenied — usually means a **Service Control Policy (SCP)** at the AWS Organization level is blocking the action, not a user/role-level policy
- **Fix:** Contact the AWS account owner/org admin to check SCPs; SCPs override IAM user/role policies

### `RequestExpired: Request has expired`
- **Cause:** Clock skew > 5 minutes between Panorama and AWS API servers
- **Fix:** Verify Panorama NTP configuration — `show system info | match ntp`; sync to a reliable NTP source

---

## Trust Policy Templates

### Instance Profile trust policy (EC2 service as principal)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ec2.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### Cross-account role trust policy (allow Account 2 root to assume)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::<ACCOUNT-2-ID>:root" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### Cross-account role trust policy (scope to specific IAM user, not root)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "AWS": "arn:aws:iam::<ACCOUNT-2-ID>:user/panorama-monitoring" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

---

## Checking Effective Permissions (AWS CLI)

### List policies attached to a user
```bash
aws iam list-attached-user-policies --user-name panorama-monitoring
```

### Get inline policies on a user
```bash
aws iam list-user-policies --user-name panorama-monitoring
aws iam get-user-policy --user-name panorama-monitoring --policy-name <policy-name>
```

### Simulate a specific action against a resource
```bash
aws iam simulate-principal-policy \
  --policy-source-arn arn:aws:iam::<account-id>:user/panorama-monitoring \
  --action-names ec2:DescribeInstances elasticloadbalancing:DescribeLoadBalancers \
  --resource-arns "*"
```

### Check what identity the current credentials represent
```bash
aws sts get-caller-identity
```
Output confirms Account ID, User ID, and ARN — useful to verify you're testing with the right credentials.

---

## GovCloud Notes

- GovCloud uses a separate partition: `arn:aws-us-gov:iam::...` (not `arn:aws:...`)
- IAM API endpoint: `iam.us-gov.amazonaws.com`
- EC2 API endpoint: `ec2.us-gov-west-1.amazonaws.com` or `ec2.us-gov-east-1.amazonaws.com`
- STS endpoint: `sts.us-gov-west-1.amazonaws.com`
- The Panorama plugin requires the GovCloud region to be set before adding the IAM role:
  ```
  request plugins aws set-aws-region region <aws-govcloud-region>
  ```
- Instance profiles **cannot** be used with AWS China regions — use IAM credentials instead
