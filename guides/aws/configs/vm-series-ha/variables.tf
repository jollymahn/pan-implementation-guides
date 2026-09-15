### General

variable "region" {
  description = "AWS region to deploy all resources."
  type        = string
}

variable "name_prefix" {
  description = "Prefix applied to all resource names (e.g. 'pan-ha-')."
  type        = string
  default     = "pan-ha-"
}

variable "global_tags" {
  description = "Map of tags applied to every resource."
  type        = map(string)
  default = {
    Terraform   = "true"
    Environment = "security"
    Project     = "vm-series-ha"
  }
}

variable "ssh_key_name" {
  description = "Name of an existing EC2 key pair to associate with the VM-Series instances."
  type        = string
}

### Networking

variable "vpc_cidr" {
  description = "CIDR block for the Security VPC."
  type        = string
  default     = "10.0.0.0/16"
}

variable "az1" {
  description = "First availability zone (Active firewall)."
  type        = string
}

variable "az2" {
  description = "Second availability zone (Passive firewall)."
  type        = string
}

variable "mgmt_cidrs" {
  description = "CIDR blocks allowed to reach the firewall management interfaces (SSH/HTTPS). Restrict to your admin IP ranges."
  type        = list(string)
  default     = ["0.0.0.0/0"]
}

# Subnet CIDRs — must all fall within vpc_cidr
variable "subnet_cidrs" {
  description = <<-EOF
  CIDR assignments for each subnet type per AZ. Keys are:
    mgmt_az1, mgmt_az2, untrust_az1, untrust_az2,
    trust_az1, trust_az2, ha_az1, ha_az2
  EOF
  type        = map(string)
  default = {
    mgmt_az1    = "10.0.0.0/24"
    mgmt_az2    = "10.0.1.0/24"
    untrust_az1 = "10.0.10.0/24"
    untrust_az2 = "10.0.11.0/24"
    trust_az1   = "10.0.20.0/24"
    trust_az2   = "10.0.21.0/24"
    ha_az1      = "10.0.40.0/24"
    ha_az2      = "10.0.41.0/24"
  }
}

# Static private IPs — keeps HA2 peer addresses predictable.
# Management interface (eth0) uses DHCP; its private IP becomes the HA1 peer address.
variable "fw1_private_ips" {
  description = "Static private IPs for FW1 data-plane and HA2 interfaces (3 interfaces: untrust, trust, ha)."
  type = object({
    untrust = string
    trust   = string
    ha      = string
  })
  default = {
    untrust = "10.0.10.10"
    trust   = "10.0.20.10"
    ha      = "10.0.40.10"
  }
}

variable "fw2_private_ips" {
  description = "Static private IPs for FW2 data-plane and HA2 interfaces (3 interfaces: untrust, trust, ha)."
  type = object({
    untrust = string
    trust   = string
    ha      = string
  })
  default = {
    untrust = "10.0.11.10"
    trust   = "10.0.21.10"
    ha      = "10.0.41.10"
  }
}

### VM-Series

variable "panos_version" {
  description = "PAN-OS version string used to look up the AMI (e.g. '11.1.4-h7')."
  type        = string
  default     = "11.1.4-h7"
}

variable "instance_type" {
  description = "EC2 instance type. m5.xlarge supports exactly 4 ENIs, matching this 4-interface design (mgmt, untrust, trust, ha). Use m5.2xlarge or c5.2xlarge for higher throughput."
  type        = string
  default     = "m5.xlarge"
}

variable "vmseries_product_code" {
  description = <<-EOF
  AWS Marketplace product code that selects the license type.
    BYOL:   6njl1pau431dv1qxipg63mvah
    Bundle1 (VM-300):  6kxdw3bbmdeda3o6i1ggqt4km
    Bundle2 (VM-500):  806j2of0qy5osgjjixq9gqc6g
  EOF
  type        = string
  default     = "6njl1pau431dv1qxipg63mvah" # BYOL
}

variable "ebs_kms_key_alias" {
  description = "KMS key alias for EBS volume encryption. Defaults to the AWS-managed EBS key."
  type        = string
  default     = "alias/aws/ebs"
}

### Bootstrap

variable "bootstrap_options_fw1" {
  description = <<-EOF
  Bootstrap parameters written to config/init-cfg.txt in FW1's S3 bucket.
  Set panorama-server + auth-key for Panorama-managed deployments,
  or vm-series-auto-registration-pin-id + pin-value for SCM.
  Leave both null for standalone (manual configuration).
  EOF
  type = object({
    hostname                              = optional(string, "pan-fw1")
    panorama-server                       = optional(string)
    panorama-server-2                     = optional(string)
    auth-key                              = optional(string)
    vm-auth-key                           = optional(string)
    tplname                               = optional(string)
    dgname                                = optional(string)
    cgname                                = optional(string)
    dns-primary                           = optional(string, "8.8.8.8")
    dns-secondary                         = optional(string, "8.8.4.4")
    op-command-modes                      = optional(string)
    plugin-op-commands                    = optional(string)
    dhcp-send-hostname                    = optional(string, "yes")
    dhcp-send-client-id                   = optional(string, "yes")
    dhcp-accept-server-hostname           = optional(string, "yes")
    dhcp-accept-server-domain             = optional(string, "yes")
    vm-series-auto-registration-pin-id    = optional(string)
    vm-series-auto-registration-pin-value = optional(string)
  })
  default = {}
}

variable "bootstrap_options_fw2" {
  description = "Bootstrap parameters for FW2. Same schema as bootstrap_options_fw1."
  type = object({
    hostname                              = optional(string, "pan-fw2")
    panorama-server                       = optional(string)
    panorama-server-2                     = optional(string)
    auth-key                              = optional(string)
    vm-auth-key                           = optional(string)
    tplname                               = optional(string)
    dgname                                = optional(string)
    cgname                                = optional(string)
    dns-primary                           = optional(string, "8.8.8.8")
    dns-secondary                         = optional(string, "8.8.4.4")
    op-command-modes                      = optional(string)
    plugin-op-commands                    = optional(string)
    dhcp-send-hostname                    = optional(string, "yes")
    dhcp-send-client-id                   = optional(string, "yes")
    dhcp-accept-server-hostname           = optional(string, "yes")
    dhcp-accept-server-domain             = optional(string, "yes")
    vm-series-auto-registration-pin-id    = optional(string)
    vm-series-auto-registration-pin-value = optional(string)
  })
  default = {}
}
