# VPC Monitoring Troubleshooting Quick Reference — Panorama AWS Plugin

Session reference for diagnosing customer issues with the Panorama AWS Plugin for VPC monitoring. Work through the pipeline in order: Retrieval → Processing → Push → Registration → DAG.

---

## Pipeline at a Glance

```
AWS EC2 API ──poll──> [Tag Retrieval Daemon] ──> [Tag Processing Daemon]
                                                          │
                                              Panorama configd (push)
                                                          │
                                              Firewall userid (register)
                                                          │
                                           Dynamic Address Groups (enforce)
```

Log files map to pipeline stages:

| Stage | Log on Panorama | Log on Firewall |
|---|---|---|
| Retrieval (AWS → Panorama) | `plugin_aws_ret.log` | — |
| Processing (filter/diff) | `plugin_aws_proc.log` | — |
| Push (Panorama → firewall) | `configd.log`, `ms.log` | — |
| Registration (IP-tag mapping) | — | `userid.log`, `useridd.log` |
| DAG enforcement | — | `devsrv.log` |

---

## Diagnostic Command Sequence

Run these in order to isolate which stage is failing.

### Stage 1 — Is the plugin polling AWS successfully?

```bash
# On Panorama CLI:
show plugins aws vm-mon-status
```
- **Expected:** `Status: Success`, recent `Last Updated` timestamp
- **Failure:** `Status: Failure` → go to Stage 1 deep-dive below

```bash
show plugins aws counters
```
- **Expected:** non-zero values for retrieval/push counters

### Stage 2 — Are tags reaching Panorama?

```bash
# On Panorama CLI (set context to target device group first):
set system setting target device-group <DG-NAME>
show object dynamic-address-group all
```
- **Expected:** DAG entries with member IPs
- **If empty:** tags are not making it from AWS → check `plugin_aws_ret.log` and `plugin_aws_proc.log`

### Stage 3 — Are tags being pushed to firewalls?

```bash
# On Panorama CLI:
debug dau show job-queue-info
debug dau show stats
```
- **Expected:** non-zero enqueue/dequeue counts, no stuck jobs

### Stage 4 — Did tags arrive on the firewall?

```bash
# On managed firewall CLI:
show object registered-ip all
```
- **Expected:** IP addresses with `aws.ec2.*` tags
- **If empty:** tags not arriving → check push pipeline (configd.log, ms.log, userid.log)

### Stage 5 — Are DAGs populated on the firewall?

```bash
show object dynamic-address-group all
```
- **Expected:** DAG with member IPs listed
- **`members: (not in use)`:** DAG is not referenced in any active security policy rule

---

## Stage 1 Deep-Dive: Monitoring Definition Failure

Check retrieval log for the actual error:
```bash
less plugins-log plugin_aws_ret.log
# Or tail live:
tail follow yes plugins-log plugin_aws_ret.log
```

| Log Message | Root Cause | Fix |
|---|---|---|
| `Access Denied` / `AccessDenied` | IAM permissions missing or wrong credentials | Verify policy in IAM; rotate access key if expired |
| `InvalidClientTokenId` | Wrong Access Key ID | Re-enter credentials in Panorama plugin IAM Role config |
| `RequestExpired` | Clock skew > 5 min | Fix NTP on Panorama: `show system info \| match ntp` |
| `VPC vpc-XXXXX not found` / `InvalidVpcID.NotFound` | Wrong VPC ID or wrong region | Confirm VPC ID in AWS Console; check region matches |
| `NoCredentialProviders` | Instance profile not attached (when using profile auth) | Attach IAM role to Panorama EC2 instance |
| `Could not connect to endpoint URL` | Panorama cannot reach AWS API on port 443 | Check outbound firewall/SG rules; verify DNS resolution of AWS endpoints |
| `An error occurred (AuthFailure)` | Credentials valid but not for this region (e.g., GovCloud) | Set region with `request plugins aws set-aws-region region <region>` |

### Connectivity test (Panorama → AWS API)

AWS EC2 API endpoints follow the pattern: `ec2.<region>.amazonaws.com:443`

```bash
# On Panorama CLI — test outbound HTTPS to AWS EC2 API:
ping host ec2.us-east-1.amazonaws.com
# Or test with curl via op command if available

# Common regional endpoints:
# ec2.us-east-1.amazonaws.com
# ec2.us-west-2.amazonaws.com
# ec2.eu-west-1.amazonaws.com
# ec2.ap-southeast-1.amazonaws.com
# ec2.us-gov-west-1.amazonaws.com   (GovCloud)
```

Panorama must be able to reach these over **port 443 (HTTPS)** outbound. Check:
- Security Group on the Panorama EC2 instance allows outbound 443
- NACL on the Panorama subnet allows outbound 443
- Any intermediate firewall/NAT allows outbound HTTPS
- DNS resolution works for `ec2.<region>.amazonaws.com`

---

## Stage 2 Deep-Dive: Tags Not Appearing on Panorama

```bash
tail follow yes plugins-log plugin_aws_proc.log
```

| Symptom | Root Cause | Fix |
|---|---|---|
| Instance not appearing at all | Instance is not in `running` state | Confirm instance state in AWS Console (must be `running`) |
| Tag appears then disappears | Instance was terminated, or tag was removed in AWS | Expected behavior; DAG membership updates after next poll |
| Tag name truncated or missing | Tag key+value exceeds 128 characters | Shorten the AWS EC2 tag key or value |
| Tag with special chars missing | Tag contains unsupported characters (spaces, `/`, `\`, etc.) | Rename the AWS EC2 tag to use only alphanumeric, `.`, `-`, `_` |
| Monitoring Definition disabled | `Enable` checkbox was unchecked | Re-check `Enable` in Monitoring Definition and commit |
| Tags present but wrong VPC | VPC ID filter is excluding the instance | Verify VPC IDs listed in Monitoring Definition match the instance's VPC |

---

## Stage 3 Deep-Dive: Tags on Panorama But Not on Firewalls

```bash
# On Panorama:
tail follow yes mp-log configd.log
tail follow yes mp-log ms.log
```

| Symptom | Root Cause | Fix |
|---|---|---|
| Firewall not receiving any tags | Firewall's Device Group not in Notify Group | Add the Device Group to the Notify Group configuration |
| Child Device Group firewalls not receiving tags | Device Group recursion disabled | Run `debug dau settings device-group recursive yes` on Panorama |
| Tags stopped after adding second plugin | Another installed plugin (GCP, Azure) is unconfigured — blocks tag push | Run `request plugins dau plugin-name <other-plugin> unblock-device-push yes` |
| Push shows errors in ms.log | Management server cannot connect to firewall | Verify firewall is `Connected` in Panorama → Managed Devices |

---

## Stage 4 Deep-Dive: Tags Arriving But Truncated at 32

```bash
# On firewall:
less mp-log useridd.log
# Search for:
# "total number of tags exceeds the limit 32"
```

The firewall enforces a hard limit of **32 tags per IP address**.

- 14 predefined tags + 18 user-defined tags = 32 max
- If VM Information Source (VIS) is also configured on the firewall, its tags count toward the same limit
- **Fix:** Disable VM Information Source on firewalls if using the Panorama plugin
  - Navigate to: Device → VM Information Sources → delete or disable the VIS configuration
- **Fix (alternative):** Use Custom Tags in the Notify Group to select only the tags needed for policy

---

## Stage 5 Deep-Dive: DAG Empty on Firewall

```bash
show object dynamic-address-group all
```

If output shows `members: (not in use)`:
- The DAG exists but is **not referenced in any active security policy rule**
- The firewall only populates DAG members for DAGs in active rules (memory optimization)
- **Fix:** Push a policy rule that references the DAG

If output shows no member IPs but DAG is in a policy rule:
- Check that tags exist on the firewall: `show object registered-ip all`
- Check the DAG filter matches actual tag names exactly — tag names are case-sensitive
- Run `show object registered-ip all` and look for the specific tag string used in the DAG filter

---

## HA-Specific Issues

### Panorama HA Failover
- Active Panorama does **not** sync IP-tag mappings to the passive peer
- After failover, the newly active Panorama re-polls AWS from scratch (full sync)
- During re-poll, firewalls retain the last-known tags — policy continues to function
- System log message if Monitoring Definition fails after failover:
  ```
  Unable to process accounts after HA switch-over; user-intervention required.
  ```
- **Fix:** Log in to newly active Panorama, re-validate Monitoring Definitions, commit

### Firewall HA Failover
- Panorama pushes tags to **both** active and passive firewall peers
- On failover, the newly active firewall already has current tags — no gap

---

## Enable/Disable Debug Logging

### Enable debug (Panorama)
```bash
request plugins debug level high plugin-name aws
debug management-server on debug
debug management-server set all
```

### Disable debug (Panorama) — always do this after troubleshooting
```bash
debug management-server on info
request plugins debug level off plugin-name aws
```

### Enable debug (firewall)
```bash
debug user-id on debug
debug user-id set all
```

### Disable debug (firewall)
```bash
debug user-id on info
```

---

## Force Re-Sync from AWS

If you need to force an immediate full re-pull from AWS (instead of waiting for the next poll interval):
```bash
request plugins aws sync
```
This triggers a full re-pull for all Monitoring Definitions immediately.

---

## Key Log Locations Summary

| File | Where | What to Look For |
|---|---|---|
| `plugin_aws_ret.log` | Panorama | AWS API errors, auth failures, VPC not found |
| `plugin_aws_proc.log` | Panorama | Tag filtering, character issues, instance state issues |
| `plugin_aws.log` | Panorama | Plugin config, daemon state (debug mode) |
| `configd.log` | Panorama | Push diffs, commit activity |
| `ms.log` | Panorama | XML-API calls to managed firewalls |
| `userid.log` | Firewall | IP-tag registration events |
| `useridd.log` | Firewall | 32-tag limit warnings |
| `devsrv.log` | Firewall | DAG incremental updates to dataplane |

---

## Pre-Call Customer Checklist

Gather these before the session to avoid back-and-forth:

- [ ] Panorama PAN-OS version (`show system info | match version`)
- [ ] AWS Plugin version (`show plugins`)
- [ ] Authentication method in use (IAM credentials / Instance profile / cross-account)
- [ ] Number of monitored VPCs and AWS accounts
- [ ] Which pipeline stage fails (retrieval / push / registration / DAG)
- [ ] Output of `show plugins aws vm-mon-status`
- [ ] Output of `show plugins aws counters`
- [ ] Output of `show object registered-ip all` from a managed firewall
- [ ] Any recent changes (new VPCs, credential rotation, plugin upgrade, Panorama upgrade)
- [ ] Whether VM Information Source (VIS) is also configured on the firewalls
