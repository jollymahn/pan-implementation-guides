##############################################################################
# Outputs — reference these values during PAN-OS HA configuration
##############################################################################

### Management Access

output "fw1_mgmt_eip" {
  description = "Public IP address for FW1 management (HTTPS/SSH)."
  value       = aws_eip.mgmt_fw1.public_ip
}

output "fw2_mgmt_eip" {
  description = "Public IP address for FW2 management (HTTPS/SSH)."
  value       = aws_eip.mgmt_fw2.public_ip
}

### HA Peer Configuration
# HA1 uses the management interface — no dedicated ENI or static IP.
# The HA1 peer address is the other firewall's management interface private IP.
# Find it in the EC2 console under the management ENI (eth0) after apply.
#
# HA2 uses eth1/3 with a static private IP:
#   FW1: Device > High Availability > HA2: peer IP = fw2_ha_ip
#   FW2: Device > High Availability > HA2: peer IP = fw1_ha_ip

output "fw1_ha_ip" {
  description = "FW1 HA2 (session sync) interface private IP — enter as the HA2 peer address on FW2."
  value       = var.fw1_private_ips.ha
}

output "fw2_ha_ip" {
  description = "FW2 HA2 (session sync) interface private IP — enter as the HA2 peer address on FW1."
  value       = var.fw2_private_ips.ha
}

### Floating EIP
# After Terraform apply, associate this EIP with FW1's untrust ENI in the
# AWS console, then configure PAN-OS HA to manage failover using this allocation ID.

output "floating_eip_id" {
  description = "Allocation ID of the floating untrust EIP — configure in PAN-OS HA > AWS Settings."
  value       = aws_eip.floating_untrust.id
}

output "floating_eip_public_ip" {
  description = "Public IP of the floating EIP (unassociated by Terraform; managed by PAN-OS HA)."
  value       = aws_eip.floating_untrust.public_ip
}

### Route Table IDs
# Configure these in PAN-OS HA > AWS Settings so the active firewall can update
# routes on failover to point trust-side traffic to its own trust ENI.

output "trust_route_table_id" {
  description = "Trust subnet route table ID — configure in PAN-OS HA > AWS Settings > Route Table."
  value       = aws_route_table.trust.id
}

### ENI IDs (needed for PAN-OS HA AWS settings)

output "fw1_untrust_eni_id" {
  description = "FW1 untrust ENI ID — used for EIP association and PAN-OS HA configuration."
  value       = module.fw1.interfaces["untrust"].id
}

output "fw2_untrust_eni_id" {
  description = "FW2 untrust ENI ID — used for PAN-OS HA configuration."
  value       = module.fw2.interfaces["untrust"].id
}

output "fw1_trust_eni_id" {
  description = "FW1 trust ENI ID — specify in the trust route table failover rule on FW1."
  value       = module.fw1.interfaces["trust"].id
}

output "fw2_trust_eni_id" {
  description = "FW2 trust ENI ID — specify in the trust route table failover rule on FW2."
  value       = module.fw2.interfaces["trust"].id
}

### Bootstrap Bucket Names

output "fw1_bootstrap_bucket" {
  description = "S3 bucket name for FW1 bootstrap content."
  value       = aws_s3_bucket.fw1_bootstrap.bucket
}

output "fw2_bootstrap_bucket" {
  description = "S3 bucket name for FW2 bootstrap content."
  value       = aws_s3_bucket.fw2_bootstrap.bucket
}

### IAM

output "vmseries_instance_profile" {
  description = "IAM instance profile name attached to both firewalls."
  value       = aws_iam_instance_profile.vmseries.name
}

### VPC and Subnet IDs

output "vpc_id" {
  description = "Security VPC ID."
  value       = aws_vpc.security.id
}

output "subnet_ids" {
  description = "All subnet IDs keyed by type-az (e.g. mgmt-az1, trust-az2)."
  value = merge(
    { for k, v in aws_subnet.mgmt : "mgmt-${k}" => v.id },
    { for k, v in aws_subnet.untrust : "untrust-${k}" => v.id },
    { for k, v in aws_subnet.trust : "trust-${k}" => v.id },
    { for k, v in aws_subnet.ha : "ha-${k}" => v.id },
  )
}

### PAN-OS HA Configuration Summary
# Printed after apply as a convenience reference for the PAN-OS HA setup steps.

output "ha_config_summary" {
  description = "PAN-OS HA configuration reference values."
  value = {
    "FW1 management URL"               = "https://${aws_eip.mgmt_fw1.public_ip}"
    "FW2 management URL"               = "https://${aws_eip.mgmt_fw2.public_ip}"
    "HA1 peer setup"                   = "HA1 port=management on each FW; peer IP = other FW's mgmt private IP (see EC2 console eth0)"
    "FW1 HA2 IP (set as peer on FW2)"  = var.fw1_private_ips.ha
    "FW2 HA2 IP (set as peer on FW1)"  = var.fw2_private_ips.ha
    "Floating EIP allocation ID"       = aws_eip.floating_untrust.id
    "Floating EIP public IP"           = aws_eip.floating_untrust.public_ip
    "Trust route table ID"             = aws_route_table.trust.id
    "FW1 untrust ENI ID"               = module.fw1.interfaces["untrust"].id
    "FW2 untrust ENI ID"               = module.fw2.interfaces["untrust"].id
    "FW1 trust ENI ID"                 = module.fw1.interfaces["trust"].id
    "FW2 trust ENI ID"                 = module.fw2.interfaces["trust"].id
  }
}
