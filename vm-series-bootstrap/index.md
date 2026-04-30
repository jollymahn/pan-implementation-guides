# VM-Series Firewall Bootstrap Guide

Palo Alto Networks VM-Series firewall bootstrapping documentation, organized by cloud provider. Each guide covers four bootstrap methods in order of preference.

---

## Choose Your Cloud

### [AWS](aws/)

Bootstrap VM-Series firewalls on Amazon Web Services using S3 buckets, IAM instance profiles, EC2 user data, and GWLB integration.

- [Linear Guide](aws/linear-guide.md) — step-by-step walkthrough

### [Azure](azure/)

Bootstrap VM-Series firewalls on Microsoft Azure using Azure File Shares, managed identities, custom data, and NSGs.

- [Linear Guide](azure/linear-guide.md) — step-by-step walkthrough

### [GCP](gcp/)

Bootstrap VM-Series firewalls on Google Cloud Platform using GCS buckets, service accounts, instance metadata, and VPC firewall rules.

- [Linear Guide](gcp/linear-guide.md) — step-by-step walkthrough

---

## Bootstrap Methods (All Clouds)

| Method | Best For | Cloud Storage | Internet Required |
|---|---|---|---|
| **1. Panorama Licensing Plugin** | Auto-scaling, production | Not required | Panorama only |
| **2. Simple Bootstrap (User Data / Custom Data / Metadata)** | Quick one-off deployments | Not required | Yes (firewalls) |
| **3. Storage Basic Bootstrap (init-cfg + authcode)** | Structured bootstrap, version-controlled configs | S3 / File Share / GCS | Yes (firewalls) |
| **4. Storage Full Bootstrap (bootstrap.xml)** | Standalone, air-gapped, zero-touch | S3 / File Share / GCS | Yes (firewalls) |

## Shared Prerequisites

Prerequisites 1-8 are cloud-agnostic and identical across all guides:

1. Software NGFW Credit Pool
2. Deployment Profile
3. Device Group on Panorama
4. Template Stack on Panorama
5. Auth Code for Bootstrap Definitions
6. Auto-Registration PIN ID & PIN Value
7. Backhaul Connectivity to Panorama
8. Security Groups / NSGs / VPC Firewall Rules

Prerequisites 9+ are cloud-specific (marketplace subscriptions, image discovery, etc.) and are covered in each cloud's guide.
