# #############################################################################
#
#   COMBINED DESIGN — Dual Security VPCs with Distributed Inbound
#
#   Extends the single-security-VPC combined design by splitting firewall
#   functions across two dedicated security VPCs:
#
#   - security_obew_vpc: Handles OUTBOUND and EAST-WEST traffic inspection
#   - security_inbound_vpc: Handles INBOUND traffic inspection only
#
#   Inbound traffic still enters each spoke VPC's own IGW (distributed
#   inbound pattern) and is redirected through GWLB endpoints in the spoke
#   VPCs to the inbound security VPC for inspection.
#
#   Traffic flows:
#
#   - INBOUND:   Internet -> Spoke IGW -> GWLBE (spoke) -> GWLB ->
#                VM-Series (security_inbound_vpc) -> GWLBE -> Spoke ALB/NLB
#                -> Spoke VM
#
#   - OUTBOUND:  Spoke VM -> TGW -> security_obew_vpc -> outbound GWLBE ->
#                GWLB -> VM-Series -> NAT GW -> Internet
#
#   - EAST-WEST: Spoke A -> TGW -> security_obew_vpc -> eastwest GWLBE ->
#                GWLB -> VM-Series -> TGW -> Spoke B
#
#   VPCs: 4 (security_obew + security_inbound + 2 spokes)
#   GWLBs: 2 | VM-Series groups: 2 | TGW route tables: 2
#
# #############################################################################

### GENERAL
region      = "us-west-2"
name_prefix = "cld-cmb2t-"

global_tags = {
  ManagedBy   = "terraform"
  Application = "Palo Alto Networks VM-Series NGFW"
  Owner       = "PS Team"
}

ssh_key_name = "example-ssh-key"

### VPC
vpcs = {
  # ===========================================================================
  #   Outbound / East-West Security VPC
  # ===========================================================================
  security_obew_vpc = {
    name = "security-obew-vpc"
    cidr = "10.51.0.0/21"
    nacls = {
      trusted_path_monitoring = {
        name = "trusted-path-monitoring"
        rules = {
          block_outbound_icmp_1 = {
            rule_number = 110
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "10.51.0.64/28"
          }
          block_outbound_icmp_2 = {
            rule_number = 120
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "10.51.1.64/28"
          }
          block_outbound_icmp_3 = {
            rule_number = 130
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "10.51.2.64/28"
          }
          block_outbound_icmp_4 = {
            rule_number = 140
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "10.51.3.64/28"
          }
          allow_other_outbound = {
            rule_number = 200
            egress      = true
            protocol    = "-1"
            rule_action = "allow"
            cidr_block  = "0.0.0.0/0"
          }
          allow_inbound = {
            rule_number = 300
            egress      = false
            protocol    = "-1"
            rule_action = "allow"
            cidr_block  = "0.0.0.0/0"
          }
        }
      }
    }
    security_groups = {
      vmseries_private = {
        name = "vmseries_private"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          geneve = {
            description = "Permit GENEVE to GWLB subnets"
            type        = "ingress", from_port = "6081", to_port = "6081", protocol = "udp"
            cidr_blocks = [
              "10.51.0.48/28", "10.51.1.48/28", "10.51.2.48/28", "10.51.3.48/28"
            ]
          }
          health_probe = {
            description = "Permit Port 80 Health Probe to GWLB subnets"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = [
              "10.51.0.48/28", "10.51.1.48/28", "10.51.2.48/28", "10.51.3.48/28"
            ]
          }
        }
      }
      vmseries_mgmt = {
        name = "vmseries_mgmt"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          /* Uncomment the following section in case of direct firewall mgmt access required
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"]
          }
          ssh = {
            description = "Permit SSH"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"]
          }
          */
          panorama_ssh = {
            description = "Permit Panorama SSH (Optional)"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["10.0.0.0/8"]
          }
        }
      }
      vmseries_public = {
        name = "vmseries_public"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          ssh = {
            description = "Permit SSH"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
        }
      }
    }
    subnets = {
      # TGW Attach Subnets
      "10.51.0.0/28"   = { az = "us-west-2a", subnet_group = "tgw_attach" }
      "10.51.1.0/28"   = { az = "us-west-2b", subnet_group = "tgw_attach" }
      "10.51.2.0/28"   = { az = "us-west-2c", subnet_group = "tgw_attach" }
      "10.51.3.0/28"   = { az = "us-west-2d", subnet_group = "tgw_attach" }
      # GWLBe Outbound Subnets
      "10.51.0.16/28"  = { az = "us-west-2a", subnet_group = "gwlbe_outbound" }
      "10.51.1.16/28"  = { az = "us-west-2b", subnet_group = "gwlbe_outbound" }
      "10.51.2.16/28"  = { az = "us-west-2c", subnet_group = "gwlbe_outbound" }
      "10.51.3.16/28"  = { az = "us-west-2d", subnet_group = "gwlbe_outbound" }
      # GWLBe East-West Subnets
      "10.51.0.32/28"  = { az = "us-west-2a", subnet_group = "gwlbe_eastwest" }
      "10.51.1.32/28"  = { az = "us-west-2b", subnet_group = "gwlbe_eastwest" }
      "10.51.2.32/28"  = { az = "us-west-2c", subnet_group = "gwlbe_eastwest" }
      "10.51.3.32/28"  = { az = "us-west-2d", subnet_group = "gwlbe_eastwest" }
      # GWLB Subnets
      "10.51.0.48/28"  = { az = "us-west-2a", subnet_group = "gwlb" }
      "10.51.1.48/28"  = { az = "us-west-2b", subnet_group = "gwlb" }
      "10.51.2.48/28"  = { az = "us-west-2c", subnet_group = "gwlb" }
      "10.51.3.48/28"  = { az = "us-west-2d", subnet_group = "gwlb" }
      # Private Subnets
      "10.51.0.64/28"  = { az = "us-west-2a", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.51.1.64/28"  = { az = "us-west-2b", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.51.2.64/28"  = { az = "us-west-2c", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.51.3.64/28"  = { az = "us-west-2d", subnet_group = "private", nacl = "trusted_path_monitoring" }
      # Management Subnets
      "10.51.0.80/28"  = { az = "us-west-2a", subnet_group = "mgmt" }
      "10.51.1.80/28"  = { az = "us-west-2b", subnet_group = "mgmt" }
      "10.51.2.80/28"  = { az = "us-west-2c", subnet_group = "mgmt" }
      "10.51.3.80/28"  = { az = "us-west-2d", subnet_group = "mgmt" }
      # Public Subnets
      "10.51.0.96/28"  = { az = "us-west-2a", subnet_group = "public" }
      "10.51.1.96/28"  = { az = "us-west-2b", subnet_group = "public" }
      "10.51.2.96/28"  = { az = "us-west-2c", subnet_group = "public" }
      "10.51.3.96/28"  = { az = "us-west-2d", subnet_group = "public" }
      # NAT Gateway Subnets
      "10.51.0.112/28" = { az = "us-west-2a", subnet_group = "nat_gateway" }
      "10.51.1.112/28" = { az = "us-west-2b", subnet_group = "nat_gateway" }
      "10.51.2.112/28" = { az = "us-west-2c", subnet_group = "nat_gateway" }
      "10.51.3.112/28" = { az = "us-west-2d", subnet_group = "nat_gateway" }
    }
    routes = {
      # Value of `next_hop_key` must match keys use to create TGW attachment, IGW, GWLB endpoint or other resources
      # Value of `next_hop_type` is internet_gateway, nat_gateway, transit_gateway_attachment or gwlbe_endpoint
      mgmt_default = {
        vpc           = "security_obew_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_obew_nat_gw"
        next_hop_type = "nat_gateway"
      }
      mgmt_panorama = {
        vpc           = "security_obew_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "10.255.0.0/16"
        next_hop_key  = "security_obew"
        next_hop_type = "transit_gateway_attachment"
      }
      mgmt_rfc1918 = {
        vpc           = "security_obew_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_obew"
        next_hop_type = "transit_gateway_attachment"
      }
      tgw_rfc1918 = {
        vpc           = "security_obew_vpc"
        subnet_group  = "tgw_attach"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_gwlb_eastwest"
        next_hop_type = "gwlbe_endpoint"
      }
      tgw_default = {
        vpc           = "security_obew_vpc"
        subnet_group  = "tgw_attach"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_gwlb_outbound"
        next_hop_type = "gwlbe_endpoint"
      }
      public_default = {
        vpc           = "security_obew_vpc"
        subnet_group  = "public"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_obew_vpc"
        next_hop_type = "internet_gateway"
      }
      natgw_default = {
        vpc           = "security_obew_vpc"
        subnet_group  = "nat_gateway"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_obew_vpc"
        next_hop_type = "internet_gateway"
      }
      natgw_rfc1918 = {
        vpc           = "security_obew_vpc"
        subnet_group  = "nat_gateway"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_gwlb_outbound"
        next_hop_type = "gwlbe_endpoint"
      }
      gwlbe_outbound_rfc1918 = {
        vpc           = "security_obew_vpc"
        subnet_group  = "gwlbe_outbound"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_obew"
        next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_eastwest_rfc1918 = {
        vpc           = "security_obew_vpc"
        subnet_group  = "gwlbe_eastwest"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_obew"
        next_hop_type = "transit_gateway_attachment"
      }
    }
  }

  # ===========================================================================
  #   Inbound Security VPC
  # ===========================================================================
  security_inbound_vpc = {
    name = "security-inbound-vpc"
    cidr = "10.52.0.0/21"
    nacls = {
      trusted_path_monitoring = {
        name = "trusted-path-monitoring"
        rules = {
          block_outbound_icmp_1 = {
            rule_number = 110
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "10.52.0.64/28"
          }
          block_outbound_icmp_2 = {
            rule_number = 120
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "10.52.1.64/28"
          }
          block_outbound_icmp_3 = {
            rule_number = 130
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "10.52.2.64/28"
          }
          block_outbound_icmp_4 = {
            rule_number = 140
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "10.52.3.64/28"
          }
          allow_other_outbound = {
            rule_number = 200
            egress      = true
            protocol    = "-1"
            rule_action = "allow"
            cidr_block  = "0.0.0.0/0"
          }
          allow_inbound = {
            rule_number = 300
            egress      = false
            protocol    = "-1"
            rule_action = "allow"
            cidr_block  = "0.0.0.0/0"
          }
        }
      }
    }
    security_groups = {
      vmseries_private = {
        name = "vmseries_private"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          geneve = {
            description = "Permit GENEVE to GWLB subnets"
            type        = "ingress", from_port = "6081", to_port = "6081", protocol = "udp"
            cidr_blocks = [
              "10.52.0.48/28", "10.52.1.48/28", "10.52.2.48/28", "10.52.3.48/28"
            ]
          }
          health_probe = {
            description = "Permit Port 80 Health Probe to GWLB subnets"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = [
              "10.52.0.48/28", "10.52.1.48/28", "10.52.2.48/28", "10.52.3.48/28"
            ]
          }
        }
      }
      vmseries_mgmt = {
        name = "vmseries_mgmt"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          /* Uncomment the following section in case of direct firewall mgmt access required
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"]
          }
          ssh = {
            description = "Permit SSH"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"]
          }
          */
          panorama_ssh = {
            description = "Permit Panorama SSH (Optional)"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["10.0.0.0/8"]
          }
        }
      }
      vmseries_public = {
        name = "vmseries_public"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          ssh = {
            description = "Permit SSH"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
        }
      }
    }
    subnets = {
      # TGW Attach Subnets
      "10.52.0.0/28"   = { az = "us-west-2a", subnet_group = "tgw_attach" }
      "10.52.1.0/28"   = { az = "us-west-2b", subnet_group = "tgw_attach" }
      "10.52.2.0/28"   = { az = "us-west-2c", subnet_group = "tgw_attach" }
      "10.52.3.0/28"   = { az = "us-west-2d", subnet_group = "tgw_attach" }
      # GWLB Subnets
      "10.52.0.48/28"  = { az = "us-west-2a", subnet_group = "gwlb" }
      "10.52.1.48/28"  = { az = "us-west-2b", subnet_group = "gwlb" }
      "10.52.2.48/28"  = { az = "us-west-2c", subnet_group = "gwlb" }
      "10.52.3.48/28"  = { az = "us-west-2d", subnet_group = "gwlb" }
      # Private Subnets
      "10.52.0.64/28"  = { az = "us-west-2a", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.52.1.64/28"  = { az = "us-west-2b", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.52.2.64/28"  = { az = "us-west-2c", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.52.3.64/28"  = { az = "us-west-2d", subnet_group = "private", nacl = "trusted_path_monitoring" }
      # Management Subnets
      "10.52.0.80/28"  = { az = "us-west-2a", subnet_group = "mgmt" }
      "10.52.1.80/28"  = { az = "us-west-2b", subnet_group = "mgmt" }
      "10.52.2.80/28"  = { az = "us-west-2c", subnet_group = "mgmt" }
      "10.52.3.80/28"  = { az = "us-west-2d", subnet_group = "mgmt" }
      # Public Subnets
      "10.52.0.96/28"  = { az = "us-west-2a", subnet_group = "public" }
      "10.52.1.96/28"  = { az = "us-west-2b", subnet_group = "public" }
      "10.52.2.96/28"  = { az = "us-west-2c", subnet_group = "public" }
      "10.52.3.96/28"  = { az = "us-west-2d", subnet_group = "public" }
      # NAT Gateway Subnets
      "10.52.0.112/28" = { az = "us-west-2a", subnet_group = "nat_gateway" }
      "10.52.1.112/28" = { az = "us-west-2b", subnet_group = "nat_gateway" }
      "10.52.2.112/28" = { az = "us-west-2c", subnet_group = "nat_gateway" }
      "10.52.3.112/28" = { az = "us-west-2d", subnet_group = "nat_gateway" }
    }
    routes = {
      mgmt_default = {
        vpc           = "security_inbound_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_inbound_nat_gw"
        next_hop_type = "nat_gateway"
      }
      mgmt_panorama = {
        vpc           = "security_inbound_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "10.255.0.0/16"
        next_hop_key  = "security_inbound"
        next_hop_type = "transit_gateway_attachment"
      }
      mgmt_rfc1918 = {
        vpc           = "security_inbound_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_inbound"
        next_hop_type = "transit_gateway_attachment"
      }
      natgw_default = {
        vpc           = "security_inbound_vpc"
        subnet_group  = "nat_gateway"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_inbound_vpc"
        next_hop_type = "internet_gateway"
      }
      public_default = {
        vpc           = "security_inbound_vpc"
        subnet_group  = "public"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_inbound_vpc"
        next_hop_type = "internet_gateway"
      }
    }
  }

  # ===========================================================================
  #   App1 Spoke VPC — Distributed Inbound
  # ===========================================================================
  app1_vpc = {
    name  = "app1-spoke-vpc"
    cidr  = "10.48.0.0/21"
    nacls = {}
    security_groups = {
      app1_vm = {
        name = "app1_vm"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          ssh = {
            description = "Permit SSH"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
        }
      }
      app1_lb = {
        name = "app1_lb"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"]
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"]
          }
        }
      }
    }
    subnets = {
      # App1 VM Subnets
      "10.48.0.0/24" = { az = "us-west-2a", subnet_group = "app1_vm" }
      "10.48.1.0/24" = { az = "us-west-2b", subnet_group = "app1_vm" }
      # App1 LB Subnets
      "10.48.2.0/24" = { az = "us-west-2a", subnet_group = "app1_lb" }
      "10.48.3.0/24" = { az = "us-west-2b", subnet_group = "app1_lb" }
      # App1 GWLBe Subnets
      "10.48.4.0/24" = { az = "us-west-2a", subnet_group = "app1_gwlbe" }
      "10.48.5.0/24" = { az = "us-west-2b", subnet_group = "app1_gwlbe" }
    }
    routes = {
      # Value of `next_hop_key` must match keys use to create TGW attachment, IGW, GWLB endpoint or other resources
      # Value of `next_hop_type` is internet_gateway, nat_gateway, transit_gateway_attachment or gwlbe_endpoint
      vm_default = {
        vpc           = "app1_vpc"
        subnet_group  = "app1_vm"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app1"
        next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_default = {
        vpc           = "app1_vpc"
        subnet_group  = "app1_gwlbe"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app1_vpc"
        next_hop_type = "internet_gateway"
      }
      lb_default = {
        vpc           = "app1_vpc"
        subnet_group  = "app1_lb"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app1_inbound"
        next_hop_type = "gwlbe_endpoint"
      }
    }
  }

  # ===========================================================================
  #   App2 Spoke VPC — Distributed Inbound
  # ===========================================================================
  app2_vpc = {
    name  = "app2-spoke-vpc"
    cidr  = "10.49.0.0/21"
    nacls = {}
    security_groups = {
      app2_vm = {
        name = "app2_vm"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          ssh = {
            description = "Permit SSH"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.48.0.0/21", "10.49.0.0/21"]
          }
        }
      }
      app2_lb = {
        name = "app2_lb"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"]
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"]
          }
        }
      }
    }
    subnets = {
      # App2 VM Subnets
      "10.49.0.0/24" = { az = "us-west-2a", subnet_group = "app2_vm" }
      "10.49.1.0/24" = { az = "us-west-2b", subnet_group = "app2_vm" }
      # App2 LB Subnets
      "10.49.2.0/24" = { az = "us-west-2a", subnet_group = "app2_lb" }
      "10.49.3.0/24" = { az = "us-west-2b", subnet_group = "app2_lb" }
      # App2 GWLBe Subnets
      "10.49.4.0/24" = { az = "us-west-2a", subnet_group = "app2_gwlbe" }
      "10.49.5.0/24" = { az = "us-west-2b", subnet_group = "app2_gwlbe" }
    }
    routes = {
      # Value of `next_hop_key` must match keys use to create TGW attachment, IGW, GWLB endpoint or other resources
      # Value of `next_hop_type` is internet_gateway, nat_gateway, transit_gateway_attachment or gwlbe_endpoint
      vm_default = {
        vpc           = "app2_vpc"
        subnet_group  = "app2_vm"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app2"
        next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_default = {
        vpc           = "app2_vpc"
        subnet_group  = "app2_gwlbe"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app2_vpc"
        next_hop_type = "internet_gateway"
      }
      lb_default = {
        vpc           = "app2_vpc"
        subnet_group  = "app2_lb"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app2_inbound"
        next_hop_type = "gwlbe_endpoint"
      }
    }
  }
}

## TRANSIT GATEWAY
tgws = {
  tgw = {
    name = "tgw"
    asn  = "64512"
    route_tables = {
      # Do not change keys `from_security_vpc` and `from_spoke_vpc` as they are used in `main.tf` and attachments
      "from_security_vpc" = {
        create = true
        name   = "from_security"
      }
      "from_spoke_vpc" = {
        create = true
        name   = "from_spokes"
      }
    }
  }
}

tgw_attachments = {
  # Value of `route_table` and `propagate_routes_to` must match `route_tables` stores under `tgw`
  security_obew = {
    tgw_key                 = "tgw"
    security_vpc_attachment = true
    name                    = "vmseries-obew"
    vpc                     = "security_obew_vpc"
    subnet_group            = "tgw_attach"
    route_table             = "from_security_vpc"
    propagate_routes_to     = ["from_spoke_vpc"]
  }
  security_inbound = {
    tgw_key             = "tgw"
    name                = "vmseries-inbound"
    vpc                 = "security_inbound_vpc"
    subnet_group        = "tgw_attach"
    route_table         = "from_security_vpc"
    propagate_routes_to = ["from_spoke_vpc"]
  }
  app1 = {
    tgw_key             = "tgw"
    name                = "app1-spoke-vpc"
    vpc                 = "app1_vpc"
    subnet_group        = "app1_vm"
    route_table         = "from_spoke_vpc"
    propagate_routes_to = ["from_security_vpc"]
  }
  app2 = {
    tgw_key             = "tgw"
    name                = "app2-spoke-vpc"
    vpc                 = "app2_vpc"
    subnet_group        = "app2_vm"
    route_table         = "from_spoke_vpc"
    propagate_routes_to = ["from_security_vpc"]
  }
}

### NAT GATEWAYS
natgws = {
  security_obew_nat_gw = {
    name         = "obew-natgw"
    vpc          = "security_obew_vpc"
    subnet_group = "nat_gateway"
    nat_gateways = {
      "us-west-2a" = "obew-natgw-2a"
      "us-west-2b" = "obew-natgw-2b"
      "us-west-2c" = "obew-natgw-2c"
      "us-west-2d" = "obew-natgw-2d"
    }
  }
  security_inbound_nat_gw = {
    name         = "inbound-natgw"
    vpc          = "security_inbound_vpc"
    subnet_group = "nat_gateway"
    nat_gateways = {
      "us-west-2a" = "inbound-natgw-2a"
      "us-west-2b" = "inbound-natgw-2b"
      "us-west-2c" = "inbound-natgw-2c"
      "us-west-2d" = "inbound-natgw-2d"
    }
  }
}

### GATEWAY LOADBALANCER
gwlbs = {
  security_obew_gwlb = {
    name         = "security-obew-gwlb"
    vpc          = "security_obew_vpc"
    subnet_group = "gwlb"
  }
  security_inbound_gwlb = {
    name         = "security-inbound-gwlb"
    vpc          = "security_inbound_vpc"
    subnet_group = "gwlb"
  }
}
gwlb_endpoints = {
  # Value of `gwlb` must match key of objects stored in `gwlbs`
  # Value of `vpc` must match key of objects stored in `vpcs`
  # Outbound/East-West endpoints — in the OBEW security VPC
  security_gwlb_eastwest = {
    name            = "eastwest-gwlb-endpoint"
    gwlb            = "security_obew_gwlb"
    vpc             = "security_obew_vpc"
    subnet_group    = "gwlbe_eastwest"
    act_as_next_hop = false
  }
  security_gwlb_outbound = {
    name            = "outbound-gwlb-endpoint"
    gwlb            = "security_obew_gwlb"
    vpc             = "security_obew_vpc"
    subnet_group    = "gwlbe_outbound"
    act_as_next_hop = false
  }
  # Inbound endpoints — distributed in spoke VPCs, backed by inbound GWLB
  app1_inbound = {
    name                     = "app1-gwlb-endpoint"
    gwlb                     = "security_inbound_gwlb"
    vpc                      = "app1_vpc"
    subnet_group             = "app1_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "app1_vpc"
    from_igw_to_subnet_group = "app1_lb"
  }
  app2_inbound = {
    name                     = "app2-gwlb-endpoint"
    gwlb                     = "security_inbound_gwlb"
    vpc                      = "app2_vpc"
    subnet_group             = "app2_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "app2_vpc"
    from_igw_to_subnet_group = "app2_lb"
  }
}

### VM-SERIES
vmseries = {
  # ===========================================================================
  #   VM-Series — Outbound / East-West
  # ===========================================================================
  vmseries_obew = {
    instances = {
      "01" = { az = "us-west-2a" }
      "02" = { az = "us-west-2b" }
    }

    # Value of `panorama-server`, `auth-key`, `dgname`, `tplname` can be taken from plugin `sw_fw_license`. Delete map if SCM bootstrap required.
    bootstrap_options = {
      mgmt-interface-swap         = "enable"
      plugin-op-commands          = "panorama-licensing-mode-on,aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      panorama-server             = ""
      auth-key                    = ""
      dgname                      = ""
      tplname                     = ""
      dhcp-send-hostname          = "yes"
      dhcp-send-client-id         = "yes"
      dhcp-accept-server-hostname = "yes"
      dhcp-accept-server-domain   = "yes"
    }

    /* Uncomment this section if SCM bootstrap required (PAN-OS version 11.0 or higher)

    bootstrap_options = {
      mgmt-interface-swap                   = "enable"
      panorama-server                       = "cloud"
      dgname                                = "scm_folder_name"
      dhcp-send-hostname                    = "yes"
      dhcp-send-client-id                   = "yes"
      dhcp-accept-server-hostname           = "yes"
      dhcp-accept-server-domain             = "yes"
      plugin-op-commands                    = "aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      vm-series-auto-registration-pin-id    = "1234ab56-1234-12a3-a1bc-a1bc23456de7"
      vm-series-auto-registration-pin-value = "12ab3c456d78901e2f3abc456d78ef9a"
      authcodes                             = "D1234567"
    }
    */

    # airs_deployment = true # Uncomment this line for AIRS deployment (PAN-OS version 11.2.4-h1 or higher)
    panos_version = "11.1.4-h7"
    ebs_kms_id    = "alias/aws/ebs"

    # Value of `vpc` must match key of objects stored in `vpcs`
    vpc = "security_obew_vpc"

    # Value of `gwlb` must match key of objects stored in `gwlbs`
    gwlb = "security_obew_gwlb"

    interfaces = {
      private = {
        device_index      = 0
        security_group    = "vmseries_private"
        vpc               = "security_obew_vpc"
        subnet_group      = "private"
        create_public_ip  = false
        source_dest_check = false
      }
      mgmt = {
        device_index      = 1
        security_group    = "vmseries_mgmt"
        vpc               = "security_obew_vpc"
        subnet_group      = "mgmt"
        create_public_ip  = true
        source_dest_check = true
      }
      public = {
        device_index      = 2
        security_group    = "vmseries_public"
        vpc               = "security_obew_vpc"
        subnet_group      = "public"
        create_public_ip  = true
        source_dest_check = false
      }
    }

    # Value of `gwlb_endpoint` must match key of objects stored in `gwlb_endpoints`
    subinterfaces = {
      inbound  = {}
      outbound = {
        only_1_outbound = {
          gwlb_endpoint = "security_gwlb_outbound"
          subinterface  = "ethernet1/1.20"
        }
      }
      eastwest = {
        only_1_eastwest = {
          gwlb_endpoint = "security_gwlb_eastwest"
          subinterface  = "ethernet1/1.30"
        }
      }
    }

    system_services = {
      dns_primary = "4.2.2.2"
      ntp_primary = "pool.ntp.org"
    }
  }

  # ===========================================================================
  #   VM-Series — Inbound
  # ===========================================================================
  vmseries_inbound = {
    instances = {
      "01" = { az = "us-west-2a" }
      "02" = { az = "us-west-2b" }
    }

    # Value of `panorama-server`, `auth-key`, `dgname`, `tplname` can be taken from plugin `sw_fw_license`. Delete map if SCM bootstrap required.
    bootstrap_options = {
      mgmt-interface-swap         = "enable"
      plugin-op-commands          = "panorama-licensing-mode-on,aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      panorama-server             = ""
      auth-key                    = ""
      dgname                      = ""
      tplname                     = ""
      dhcp-send-hostname          = "yes"
      dhcp-send-client-id         = "yes"
      dhcp-accept-server-hostname = "yes"
      dhcp-accept-server-domain   = "yes"
    }

    /* Uncomment this section if SCM bootstrap required (PAN-OS version 11.0 or higher)

    bootstrap_options = {
      mgmt-interface-swap                   = "enable"
      panorama-server                       = "cloud"
      dgname                                = "scm_folder_name"
      dhcp-send-hostname                    = "yes"
      dhcp-send-client-id                   = "yes"
      dhcp-accept-server-hostname           = "yes"
      dhcp-accept-server-domain             = "yes"
      plugin-op-commands                    = "aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      vm-series-auto-registration-pin-id    = "1234ab56-1234-12a3-a1bc-a1bc23456de7"
      vm-series-auto-registration-pin-value = "12ab3c456d78901e2f3abc456d78ef9a"
      authcodes                             = "D1234567"
    }
    */

    # airs_deployment = true # Uncomment this line for AIRS deployment (PAN-OS version 11.2.4-h1 or higher)
    panos_version = "11.1.4-h7"
    ebs_kms_id    = "alias/aws/ebs"

    # Value of `vpc` must match key of objects stored in `vpcs`
    vpc = "security_inbound_vpc"

    # Value of `gwlb` must match key of objects stored in `gwlbs`
    gwlb = "security_inbound_gwlb"

    interfaces = {
      private = {
        device_index      = 0
        security_group    = "vmseries_private"
        vpc               = "security_inbound_vpc"
        subnet_group      = "private"
        create_public_ip  = false
        source_dest_check = false
      }
      mgmt = {
        device_index      = 1
        security_group    = "vmseries_mgmt"
        vpc               = "security_inbound_vpc"
        subnet_group      = "mgmt"
        create_public_ip  = true
        source_dest_check = true
      }
      public = {
        device_index      = 2
        security_group    = "vmseries_public"
        vpc               = "security_inbound_vpc"
        subnet_group      = "public"
        create_public_ip  = true
        source_dest_check = false
      }
    }

    # Value of `gwlb_endpoint` must match key of objects stored in `gwlb_endpoints`
    subinterfaces = {
      inbound = {
        app1 = {
          gwlb_endpoint = "app1_inbound"
          subinterface  = "ethernet1/1.11"
        }
        app2 = {
          gwlb_endpoint = "app2_inbound"
          subinterface  = "ethernet1/1.12"
        }
      }
      outbound = {}
      eastwest = {}
    }

    system_services = {
      dns_primary = "4.2.2.2"
      ntp_primary = "pool.ntp.org"
    }
  }
}


### PANORAMA
# Uncomment the following section to add a route to Panorama TGW attachment on Security VPC attachment
/*
panorama_attachment = {
  tgw_key = "tgw"
  transit_gateway_attachment_id = "tgw-attach-123"
  vpc_cidr                      = "10.255.0.0/24"
}
*/

### SPOKE VMS
spoke_vms = {
  "app1_vm01" = {
    az             = "us-west-2a"
    vpc            = "app1_vpc"
    subnet_group   = "app1_vm"
    security_group = "app1_vm"
  }
  "app1_vm02" = {
    az             = "us-west-2b"
    vpc            = "app1_vpc"
    subnet_group   = "app1_vm"
    security_group = "app1_vm"
  }
  "app2_vm01" = {
    az             = "us-west-2a"
    vpc            = "app2_vpc"
    subnet_group   = "app2_vm"
    security_group = "app2_vm"
  }
  "app2_vm02" = {
    az             = "us-west-2b"
    vpc            = "app2_vpc"
    subnet_group   = "app2_vm"
    security_group = "app2_vm"
  }
}

### SPOKE LOADBALANCERS
spoke_nlbs = {
  "app1-nlb" = {
    name         = "app1-nlb"
    vpc          = "app1_vpc"
    subnet_group = "app1_lb"
    vms          = ["app1_vm01", "app1_vm02"]
    balance_rules = {
      "SSH" = {
        port     = "22"
        protocol = "TCP"
      }
    }
  }
  "app2-nlb" = {
    name         = "app2-nlb"
    vpc          = "app2_vpc"
    subnet_group = "app2_lb"
    vms          = ["app2_vm01", "app2_vm02"]
    balance_rules = {
      "SSH" = {
        port     = "22"
        protocol = "TCP"
      }
    }
  }
}

spoke_albs = {
  "app1-alb" = {
    vms = ["app1_vm01", "app1_vm02"]
    rules = {
      "app1" = {
        health_check_port = "80"
        listener_rules = {
          "1" = {
            target_protocol = "HTTP"
            target_port     = 80
            path_pattern    = ["/"]
          }
        }
      }
    }
    vpc             = "app1_vpc"
    subnet_group    = "app1_lb"
    security_groups = "app1_lb"
  }
  "app2-alb" = {
    vms = ["app2_vm01", "app2_vm02"]
    rules = {
      "app2" = {
        health_check_port = "80"
        listener_rules = {
          "1" = {
            target_protocol = "HTTP"
            target_port     = 80
            path_pattern    = ["/"]
          }
        }
      }
    }
    vpc             = "app2_vpc"
    subnet_group    = "app2_lb"
    security_groups = "app2_lb"
  }
}
