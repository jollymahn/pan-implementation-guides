##############################################################################
# Data Sources
##############################################################################

data "aws_caller_identity" "current" {}
data "aws_partition" "current" {}

locals {
  partition  = data.aws_partition.current.partition
  account_id = data.aws_caller_identity.current.account_id
}

##############################################################################
# VPC
##############################################################################

resource "aws_vpc" "security" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = { Name = "${var.name_prefix}security-vpc" }
}

resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.security.id
  tags   = { Name = "${var.name_prefix}igw" }
}

##############################################################################
# Subnets
# Five subnet types per AZ: mgmt, untrust, trust, ha1, ha2
##############################################################################

resource "aws_subnet" "mgmt" {
  for_each = {
    az1 = { cidr = var.subnet_cidrs.mgmt_az1, az = var.az1 }
    az2 = { cidr = var.subnet_cidrs.mgmt_az2, az = var.az2 }
  }
  vpc_id            = aws_vpc.security.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az
  tags              = { Name = "${var.name_prefix}mgmt-${each.key}" }
}

resource "aws_subnet" "untrust" {
  for_each = {
    az1 = { cidr = var.subnet_cidrs.untrust_az1, az = var.az1 }
    az2 = { cidr = var.subnet_cidrs.untrust_az2, az = var.az2 }
  }
  vpc_id            = aws_vpc.security.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az
  tags              = { Name = "${var.name_prefix}untrust-${each.key}" }
}

resource "aws_subnet" "trust" {
  for_each = {
    az1 = { cidr = var.subnet_cidrs.trust_az1, az = var.az1 }
    az2 = { cidr = var.subnet_cidrs.trust_az2, az = var.az2 }
  }
  vpc_id            = aws_vpc.security.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az
  tags              = { Name = "${var.name_prefix}trust-${each.key}" }
}

resource "aws_subnet" "ha1" {
  for_each = {
    az1 = { cidr = var.subnet_cidrs.ha1_az1, az = var.az1 }
    az2 = { cidr = var.subnet_cidrs.ha1_az2, az = var.az2 }
  }
  vpc_id            = aws_vpc.security.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az
  tags              = { Name = "${var.name_prefix}ha1-${each.key}" }
}

resource "aws_subnet" "ha2" {
  for_each = {
    az1 = { cidr = var.subnet_cidrs.ha2_az1, az = var.az1 }
    az2 = { cidr = var.subnet_cidrs.ha2_az2, az = var.az2 }
  }
  vpc_id            = aws_vpc.security.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az
  tags              = { Name = "${var.name_prefix}ha2-${each.key}" }
}

##############################################################################
# Route Tables
##############################################################################

# Management — default route via IGW so admins can reach the firewalls
resource "aws_route_table" "mgmt" {
  vpc_id = aws_vpc.security.id
  tags   = { Name = "${var.name_prefix}rt-mgmt" }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }
}

resource "aws_route_table_association" "mgmt" {
  for_each       = aws_subnet.mgmt
  subnet_id      = each.value.id
  route_table_id = aws_route_table.mgmt.id
}

# Untrust — default route via IGW for inbound/outbound internet traffic
resource "aws_route_table" "untrust" {
  vpc_id = aws_vpc.security.id
  tags   = { Name = "${var.name_prefix}rt-untrust" }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }
}

resource "aws_route_table_association" "untrust" {
  for_each       = aws_subnet.untrust
  subnet_id      = each.value.id
  route_table_id = aws_route_table.untrust.id
}

# Trust — no default internet route; traffic flows inward from spoke VPCs via TGW.
# PAN-OS HA updates this route on failover to point to the newly-active FW's trust ENI.
resource "aws_route_table" "trust" {
  vpc_id = aws_vpc.security.id
  tags   = { Name = "${var.name_prefix}rt-trust" }
}

resource "aws_route_table_association" "trust" {
  for_each       = aws_subnet.trust
  subnet_id      = each.value.id
  route_table_id = aws_route_table.trust.id
}

# HA1 and HA2 — VPC local routing only; no explicit routes needed.
resource "aws_route_table" "ha1" {
  vpc_id = aws_vpc.security.id
  tags   = { Name = "${var.name_prefix}rt-ha1" }
}

resource "aws_route_table_association" "ha1" {
  for_each       = aws_subnet.ha1
  subnet_id      = each.value.id
  route_table_id = aws_route_table.ha1.id
}

resource "aws_route_table" "ha2" {
  vpc_id = aws_vpc.security.id
  tags   = { Name = "${var.name_prefix}rt-ha2" }
}

resource "aws_route_table_association" "ha2" {
  for_each       = aws_subnet.ha2
  subnet_id      = each.value.id
  route_table_id = aws_route_table.ha2.id
}

##############################################################################
# Security Groups
##############################################################################

resource "aws_security_group" "mgmt" {
  name        = "${var.name_prefix}sg-mgmt"
  description = "VM-Series management: SSH and HTTPS from admin CIDRs"
  vpc_id      = aws_vpc.security.id
  tags        = { Name = "${var.name_prefix}sg-mgmt" }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.mgmt_cidrs
  }

  ingress {
    description = "HTTPS (Web UI)"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = var.mgmt_cidrs
  }

  # ICMP for management reachability checks
  ingress {
    description = "ICMP"
    from_port   = -1
    to_port     = -1
    protocol    = "icmp"
    cidr_blocks = var.mgmt_cidrs
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "untrust" {
  name        = "${var.name_prefix}sg-untrust"
  description = "VM-Series untrust: allows all inbound; customize per your security policy"
  vpc_id      = aws_vpc.security.id
  tags        = { Name = "${var.name_prefix}sg-untrust" }

  ingress {
    description = "All inbound (restrict further in PAN-OS policy)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "trust" {
  name        = "${var.name_prefix}sg-trust"
  description = "VM-Series trust: all traffic from VPC RFC-1918 space"
  vpc_id      = aws_vpc.security.id
  tags        = { Name = "${var.name_prefix}sg-trust" }

  ingress {
    description = "RFC-1918 class A"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["10.0.0.0/8"]
  }

  ingress {
    description = "RFC-1918 class B"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["172.16.0.0/12"]
  }

  ingress {
    description = "RFC-1918 class C"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["192.168.0.0/16"]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# HA security group — allows all traffic between the two firewalls.
# HA1 uses TCP 28769 (hello/heartbeat) and HA2 uses TCP 28778 (session sync).
resource "aws_security_group" "ha" {
  name        = "${var.name_prefix}sg-ha"
  description = "VM-Series HA: all traffic between HA peers within VPC"
  vpc_id      = aws_vpc.security.id
  tags        = { Name = "${var.name_prefix}sg-ha" }

  ingress {
    description = "All inbound from VPC (HA traffic)"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [var.vpc_cidr]
  }

  egress {
    description = "All outbound"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

##############################################################################
# Elastic IP Addresses
##############################################################################

# Dedicated management EIPs — one per firewall, stable across failovers.
resource "aws_eip" "mgmt_fw1" {
  domain = "vpc"
  tags   = { Name = "${var.name_prefix}eip-mgmt-fw1" }
}

resource "aws_eip" "mgmt_fw2" {
  domain = "vpc"
  tags   = { Name = "${var.name_prefix}eip-mgmt-fw2" }
}

# Floating EIP — associated with the active firewall's untrust interface.
# Terraform creates the EIP but does NOT associate it; PAN-OS HA moves it
# between firewalls automatically on failover using the IAM role below.
# After deployment, associate it with FW1's untrust ENI manually or via the
# PAN-OS HA AWS settings (use the allocation ID from outputs.floating_eip_id).
resource "aws_eip" "floating_untrust" {
  domain = "vpc"
  tags   = { Name = "${var.name_prefix}eip-floating-untrust" }
}

##############################################################################
# IAM Role — VM-Series Instance Profile
#
# Grants each firewall:
#   1. S3 read access for bootstrap bucket
#   2. EC2 permissions for HA failover (EIP move + route table update)
#   3. CloudWatch permissions for metrics (optional, for monitoring)
##############################################################################

data "aws_iam_policy_document" "vmseries_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "vmseries" {
  name               = "${var.name_prefix}vmseries-role"
  assume_role_policy = data.aws_iam_policy_document.vmseries_assume.json
  tags               = { Name = "${var.name_prefix}vmseries-role" }
}

resource "aws_iam_role_policy" "bootstrap_s3" {
  name = "${var.name_prefix}bootstrap-s3"
  role = aws_iam_role.vmseries.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "S3ListBootstrap"
        Effect = "Allow"
        Action = "s3:ListBucket"
        Resource = [
          aws_s3_bucket.fw1_bootstrap.arn,
          aws_s3_bucket.fw2_bootstrap.arn,
        ]
      },
      {
        Sid    = "S3GetBootstrap"
        Effect = "Allow"
        Action = "s3:GetObject"
        Resource = [
          "${aws_s3_bucket.fw1_bootstrap.arn}/*",
          "${aws_s3_bucket.fw2_bootstrap.arn}/*",
        ]
      },
    ]
  })
}

resource "aws_iam_role_policy" "ha_failover" {
  name = "${var.name_prefix}ha-failover"
  role = aws_iam_role.vmseries.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        # Read-only EC2 describe — needed by PAN-OS HA to discover ENIs and route tables
        Sid    = "EC2Describe"
        Effect = "Allow"
        Action = [
          "ec2:DescribeInstances",
          "ec2:DescribeAddresses",
          "ec2:DescribeNetworkInterfaces",
          "ec2:DescribeRouteTables",
          "ec2:DescribeSubnets",
          "ec2:DescribeVpcs",
        ]
        Resource = "*"
      },
      {
        # EIP failover — moves the floating EIP from the failed FW to the active FW
        Sid    = "EIPFailover"
        Effect = "Allow"
        Action = [
          "ec2:AssociateAddress",
          "ec2:DisassociateAddress",
        ]
        Resource = "*"
      },
      {
        # Route table failover — updates the trust-side default route to point
        # to the newly-active firewall's trust ENI after HA switchover
        Sid    = "RouteTableFailover"
        Effect = "Allow"
        Action = [
          "ec2:ReplaceRoute",
          "ec2:CreateRoute",
          "ec2:DeleteRoute",
        ]
        Resource = "arn:${local.partition}:ec2:${var.region}:${local.account_id}:route-table/*"
      },
    ]
  })
}

resource "aws_iam_role_policy" "cloudwatch" {
  name = "${var.name_prefix}cloudwatch"
  role = aws_iam_role.vmseries.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "CloudWatchPut"
        Effect = "Allow"
        Action = [
          "cloudwatch:PutMetricData",
          "cloudwatch:GetMetricData",
          "cloudwatch:ListMetrics",
        ]
        Resource = "*"
      },
      {
        Sid    = "CloudWatchAlarms"
        Effect = "Allow"
        Action = [
          "cloudwatch:PutMetricAlarm",
          "cloudwatch:DescribeAlarms",
        ]
        Resource = "arn:${local.partition}:cloudwatch:${var.region}:${local.account_id}:alarm:*"
      },
    ]
  })
}

resource "aws_iam_instance_profile" "vmseries" {
  name = "${var.name_prefix}vmseries-profile"
  role = aws_iam_role.vmseries.name
  tags = { Name = "${var.name_prefix}vmseries-profile" }
}

##############################################################################
# S3 Bootstrap Buckets
##############################################################################

resource "random_id" "bucket_suffix" {
  byte_length = 4
}

locals {
  fw1_bucket_name = "${var.name_prefix}fw1-bootstrap-${random_id.bucket_suffix.hex}"
  fw2_bucket_name = "${var.name_prefix}fw2-bootstrap-${random_id.bucket_suffix.hex}"

  bootstrap_dirs = [
    "config/",
    "content/",
    "software/",
    "license/",
    "plugins/",
  ]

  # init-cfg.txt content built from bootstrap_options variables.
  # Only include lines where the value is non-null and non-empty.
  fw1_init_cfg = join("\n", compact([
    var.bootstrap_options_fw1.hostname != null ? "hostname=${var.bootstrap_options_fw1.hostname}" : null,
    var.bootstrap_options_fw1.panorama-server != null ? "panorama-server=${var.bootstrap_options_fw1.panorama-server}" : null,
    var.bootstrap_options_fw1.panorama-server-2 != null ? "panorama-server-2=${var.bootstrap_options_fw1.panorama-server-2}" : null,
    var.bootstrap_options_fw1.tplname != null ? "tplname=${var.bootstrap_options_fw1.tplname}" : null,
    var.bootstrap_options_fw1.dgname != null ? "dgname=${var.bootstrap_options_fw1.dgname}" : null,
    var.bootstrap_options_fw1.cgname != null ? "cgname=${var.bootstrap_options_fw1.cgname}" : null,
    var.bootstrap_options_fw1.auth-key != null ? "auth-key=${var.bootstrap_options_fw1.auth-key}" : null,
    var.bootstrap_options_fw1.vm-auth-key != null ? "vm-auth-key=${var.bootstrap_options_fw1.vm-auth-key}" : null,
    var.bootstrap_options_fw1.dns-primary != null ? "dns-primary=${var.bootstrap_options_fw1.dns-primary}" : null,
    var.bootstrap_options_fw1.dns-secondary != null ? "dns-secondary=${var.bootstrap_options_fw1.dns-secondary}" : null,
    var.bootstrap_options_fw1.op-command-modes != null ? "op-command-modes=${var.bootstrap_options_fw1.op-command-modes}" : null,
    var.bootstrap_options_fw1.plugin-op-commands != null ? "plugin-op-commands=${var.bootstrap_options_fw1.plugin-op-commands}" : null,
    var.bootstrap_options_fw1.dhcp-send-hostname != null ? "dhcp-send-hostname=${var.bootstrap_options_fw1.dhcp-send-hostname}" : null,
    var.bootstrap_options_fw1.dhcp-send-client-id != null ? "dhcp-send-client-id=${var.bootstrap_options_fw1.dhcp-send-client-id}" : null,
    var.bootstrap_options_fw1.dhcp-accept-server-hostname != null ? "dhcp-accept-server-hostname=${var.bootstrap_options_fw1.dhcp-accept-server-hostname}" : null,
    var.bootstrap_options_fw1.dhcp-accept-server-domain != null ? "dhcp-accept-server-domain=${var.bootstrap_options_fw1.dhcp-accept-server-domain}" : null,
    var.bootstrap_options_fw1.vm-series-auto-registration-pin-id != null ? "vm-series-auto-registration-pin-id=${var.bootstrap_options_fw1.vm-series-auto-registration-pin-id}" : null,
    var.bootstrap_options_fw1.vm-series-auto-registration-pin-value != null ? "vm-series-auto-registration-pin-value=${var.bootstrap_options_fw1.vm-series-auto-registration-pin-value}" : null,
  ]))

  fw2_init_cfg = join("\n", compact([
    var.bootstrap_options_fw2.hostname != null ? "hostname=${var.bootstrap_options_fw2.hostname}" : null,
    var.bootstrap_options_fw2.panorama-server != null ? "panorama-server=${var.bootstrap_options_fw2.panorama-server}" : null,
    var.bootstrap_options_fw2.panorama-server-2 != null ? "panorama-server-2=${var.bootstrap_options_fw2.panorama-server-2}" : null,
    var.bootstrap_options_fw2.tplname != null ? "tplname=${var.bootstrap_options_fw2.tplname}" : null,
    var.bootstrap_options_fw2.dgname != null ? "dgname=${var.bootstrap_options_fw2.dgname}" : null,
    var.bootstrap_options_fw2.cgname != null ? "cgname=${var.bootstrap_options_fw2.cgname}" : null,
    var.bootstrap_options_fw2.auth-key != null ? "auth-key=${var.bootstrap_options_fw2.auth-key}" : null,
    var.bootstrap_options_fw2.vm-auth-key != null ? "vm-auth-key=${var.bootstrap_options_fw2.vm-auth-key}" : null,
    var.bootstrap_options_fw2.dns-primary != null ? "dns-primary=${var.bootstrap_options_fw2.dns-primary}" : null,
    var.bootstrap_options_fw2.dns-secondary != null ? "dns-secondary=${var.bootstrap_options_fw2.dns-secondary}" : null,
    var.bootstrap_options_fw2.op-command-modes != null ? "op-command-modes=${var.bootstrap_options_fw2.op-command-modes}" : null,
    var.bootstrap_options_fw2.plugin-op-commands != null ? "plugin-op-commands=${var.bootstrap_options_fw2.plugin-op-commands}" : null,
    var.bootstrap_options_fw2.dhcp-send-hostname != null ? "dhcp-send-hostname=${var.bootstrap_options_fw2.dhcp-send-hostname}" : null,
    var.bootstrap_options_fw2.dhcp-send-client-id != null ? "dhcp-send-client-id=${var.bootstrap_options_fw2.dhcp-send-client-id}" : null,
    var.bootstrap_options_fw2.dhcp-accept-server-hostname != null ? "dhcp-accept-server-hostname=${var.bootstrap_options_fw2.dhcp-accept-server-hostname}" : null,
    var.bootstrap_options_fw2.dhcp-accept-server-domain != null ? "dhcp-accept-server-domain=${var.bootstrap_options_fw2.dhcp-accept-server-domain}" : null,
    var.bootstrap_options_fw2.vm-series-auto-registration-pin-id != null ? "vm-series-auto-registration-pin-id=${var.bootstrap_options_fw2.vm-series-auto-registration-pin-id}" : null,
    var.bootstrap_options_fw2.vm-series-auto-registration-pin-value != null ? "vm-series-auto-registration-pin-value=${var.bootstrap_options_fw2.vm-series-auto-registration-pin-value}" : null,
  ]))
}

# FW1 bootstrap bucket
resource "aws_s3_bucket" "fw1_bootstrap" {
  bucket        = local.fw1_bucket_name
  force_destroy = true
  tags          = { Name = local.fw1_bucket_name }
}

resource "aws_s3_bucket_versioning" "fw1_bootstrap" {
  bucket = aws_s3_bucket.fw1_bootstrap.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "fw1_bootstrap" {
  bucket = aws_s3_bucket.fw1_bootstrap.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "aws:kms" }
  }
}

resource "aws_s3_bucket_public_access_block" "fw1_bootstrap" {
  bucket                  = aws_s3_bucket.fw1_bootstrap.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_object" "fw1_dirs" {
  for_each = toset(local.bootstrap_dirs)
  bucket   = aws_s3_bucket.fw1_bootstrap.id
  key      = each.value
  content  = ""
}

resource "aws_s3_object" "fw1_init_cfg" {
  bucket  = aws_s3_bucket.fw1_bootstrap.id
  key     = "config/init-cfg.txt"
  content = local.fw1_init_cfg
}

# FW2 bootstrap bucket
resource "aws_s3_bucket" "fw2_bootstrap" {
  bucket        = local.fw2_bucket_name
  force_destroy = true
  tags          = { Name = local.fw2_bucket_name }
}

resource "aws_s3_bucket_versioning" "fw2_bootstrap" {
  bucket = aws_s3_bucket.fw2_bootstrap.id
  versioning_configuration { status = "Enabled" }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "fw2_bootstrap" {
  bucket = aws_s3_bucket.fw2_bootstrap.id
  rule {
    apply_server_side_encryption_by_default { sse_algorithm = "aws:kms" }
  }
}

resource "aws_s3_bucket_public_access_block" "fw2_bootstrap" {
  bucket                  = aws_s3_bucket.fw2_bootstrap.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_object" "fw2_dirs" {
  for_each = toset(local.bootstrap_dirs)
  bucket   = aws_s3_bucket.fw2_bootstrap.id
  key      = each.value
  content  = ""
}

resource "aws_s3_object" "fw2_init_cfg" {
  bucket  = aws_s3_bucket.fw2_bootstrap.id
  key     = "config/init-cfg.txt"
  content = local.fw2_init_cfg
}

##############################################################################
# VM-Series Firewall 1 — Active (AZ1)
##############################################################################

module "fw1" {
  source  = "PaloAltoNetworks/swfw-modules/aws//modules/vmseries"
  version = "~> 2.2"

  name                 = "${var.name_prefix}fw1"
  vmseries_version     = var.panos_version
  vmseries_product_code = var.vmseries_product_code
  instance_type        = var.instance_type
  ssh_key_name         = var.ssh_key_name
  iam_instance_profile = aws_iam_instance_profile.vmseries.name
  ebs_encrypted        = true
  ebs_kms_key_alias    = var.ebs_kms_key_alias
  ebs_volume_type      = "gp3"
  enable_monitoring    = true

  interfaces = {
    mgmt = {
      device_index       = 0
      subnet_id          = aws_subnet.mgmt["az1"].id
      security_group_ids = [aws_security_group.mgmt.id]
      create_public_ip   = false
      eip_allocation_id  = aws_eip.mgmt_fw1.id
      source_dest_check  = true
      description        = "Management"
    }
    untrust = {
      device_index       = 1
      subnet_id          = aws_subnet.untrust["az1"].id
      security_group_ids = [aws_security_group.untrust.id]
      private_ips        = [var.fw1_private_ips.untrust]
      source_dest_check  = false
      description        = "Untrust (public)"
    }
    trust = {
      device_index       = 2
      subnet_id          = aws_subnet.trust["az1"].id
      security_group_ids = [aws_security_group.trust.id]
      private_ips        = [var.fw1_private_ips.trust]
      source_dest_check  = false
      description        = "Trust (private)"
    }
    ha1 = {
      device_index       = 3
      subnet_id          = aws_subnet.ha1["az1"].id
      security_group_ids = [aws_security_group.ha.id]
      private_ips        = [var.fw1_private_ips.ha1]
      source_dest_check  = false
      description        = "HA1 control link"
    }
    ha2 = {
      device_index       = 4
      subnet_id          = aws_subnet.ha2["az1"].id
      security_group_ids = [aws_security_group.ha.id]
      private_ips        = [var.fw1_private_ips.ha2]
      source_dest_check  = false
      description        = "HA2 session sync"
    }
  }

  # Bootstrap via S3 — PAN-OS reads init-cfg.txt and configures itself on first boot.
  bootstrap_options = "vmseries-bootstrap-aws-s3bucket=${aws_s3_bucket.fw1_bootstrap.bucket}"

  tags = { Role = "active-fw", AZ = var.az1 }

  depends_on = [
    aws_s3_object.fw1_init_cfg,
    aws_iam_instance_profile.vmseries,
  ]
}

##############################################################################
# VM-Series Firewall 2 — Passive (AZ2)
##############################################################################

module "fw2" {
  source  = "PaloAltoNetworks/swfw-modules/aws//modules/vmseries"
  version = "~> 2.2"

  name                 = "${var.name_prefix}fw2"
  vmseries_version     = var.panos_version
  vmseries_product_code = var.vmseries_product_code
  instance_type        = var.instance_type
  ssh_key_name         = var.ssh_key_name
  iam_instance_profile = aws_iam_instance_profile.vmseries.name
  ebs_encrypted        = true
  ebs_kms_key_alias    = var.ebs_kms_key_alias
  ebs_volume_type      = "gp3"
  enable_monitoring    = true

  interfaces = {
    mgmt = {
      device_index       = 0
      subnet_id          = aws_subnet.mgmt["az2"].id
      security_group_ids = [aws_security_group.mgmt.id]
      create_public_ip   = false
      eip_allocation_id  = aws_eip.mgmt_fw2.id
      source_dest_check  = true
      description        = "Management"
    }
    untrust = {
      device_index       = 1
      subnet_id          = aws_subnet.untrust["az2"].id
      security_group_ids = [aws_security_group.untrust.id]
      private_ips        = [var.fw2_private_ips.untrust]
      source_dest_check  = false
      description        = "Untrust (public)"
    }
    trust = {
      device_index       = 2
      subnet_id          = aws_subnet.trust["az2"].id
      security_group_ids = [aws_security_group.trust.id]
      private_ips        = [var.fw2_private_ips.trust]
      source_dest_check  = false
      description        = "Trust (private)"
    }
    ha1 = {
      device_index       = 3
      subnet_id          = aws_subnet.ha1["az2"].id
      security_group_ids = [aws_security_group.ha.id]
      private_ips        = [var.fw2_private_ips.ha1]
      source_dest_check  = false
      description        = "HA1 control link"
    }
    ha2 = {
      device_index       = 4
      subnet_id          = aws_subnet.ha2["az2"].id
      security_group_ids = [aws_security_group.ha.id]
      private_ips        = [var.fw2_private_ips.ha2]
      source_dest_check  = false
      description        = "HA2 session sync"
    }
  }

  bootstrap_options = "vmseries-bootstrap-aws-s3bucket=${aws_s3_bucket.fw2_bootstrap.bucket}"

  tags = { Role = "passive-fw", AZ = var.az2 }

  depends_on = [
    aws_s3_object.fw2_init_cfg,
    aws_iam_instance_profile.vmseries,
  ]
}
