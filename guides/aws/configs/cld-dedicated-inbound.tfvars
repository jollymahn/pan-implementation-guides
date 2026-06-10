# #############################################################################
#
#   DEDICATED INBOUND DESIGN — Single Security VPC + Dedicated Inbound VPC
#
#   A dedicated inbound VPC serves as the internet entry point for all inbound
#   traffic. The security VPC handles outbound, east-west, AND inbound
#   inspection through a single GWLB and VM-Series pool. Spoke VPCs have no
#   IGW — all internet connectivity is centralized.
#
#   Traffic flows:
#
#   - INBOUND:   Internet -> Inbound VPC IGW -> GWLBE -> GWLB -> VM-Series
#                (security_vpc) -> GWLBE -> Inbound NLB -> TGW -> Spoke NLB
#                -> Spoke VM
#
#   - OUTBOUND:  Spoke VM -> TGW -> security_vpc -> outbound GWLBE -> GWLB ->
#                VM-Series -> NAT GW -> Internet
#
#   - EAST-WEST: Spoke A -> TGW -> security_vpc -> eastwest GWLBE -> GWLB ->
#                VM-Series -> TGW -> Spoke B
#
#   VPCs: 4 (security + inbound + 2 spokes)
#   GWLBs: 1 | VM-Series groups: 1 | TGW route tables: 3
#
# #############################################################################

### GENERAL
region      = "us-west-2"
name_prefix = "cld-ded-"

global_tags = {
  ManagedBy   = "terraform"
  Application = "Palo Alto Networks VM-Series NGFW"
  Owner       = "PS Team"
}

ssh_key_name = "example-ssh-key"

### VPC
vpcs = {

  # ===========================================================================
  # SECURITY VPC — Centralized inspection (GWLB + VM-Series)
  # ===========================================================================
  security_vpc = {
    name = "security-vpc"
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
        vpc           = "security_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_nat_gw"
        next_hop_type = "nat_gateway"
      }
      mgmt_panorama = {
        vpc           = "security_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "10.255.0.0/16"
        next_hop_key  = "security"
        next_hop_type = "transit_gateway_attachment"
      }
      mgmt_rfc1918 = {
        vpc           = "security_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security"
        next_hop_type = "transit_gateway_attachment"
      }
      tgw_rfc1918 = {
        vpc           = "security_vpc"
        subnet_group  = "tgw_attach"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_gwlb_eastwest"
        next_hop_type = "gwlbe_endpoint"
      }
      tgw_default = {
        vpc           = "security_vpc"
        subnet_group  = "tgw_attach"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_gwlb_outbound"
        next_hop_type = "gwlbe_endpoint"
      }
      public_default = {
        vpc           = "security_vpc"
        subnet_group  = "public"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_vpc"
        next_hop_type = "internet_gateway"
      }
      natgw_default = {
        vpc           = "security_vpc"
        subnet_group  = "nat_gateway"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_vpc"
        next_hop_type = "internet_gateway"
      }
      natgw_rfc1918 = {
        vpc           = "security_vpc"
        subnet_group  = "nat_gateway"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_gwlb_outbound"
        next_hop_type = "gwlbe_endpoint"
      }
      gwlbe_outbound_rfc1918 = {
        vpc           = "security_vpc"
        subnet_group  = "gwlbe_outbound"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security"
        next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_eastwest_rfc1918 = {
        vpc           = "security_vpc"
        subnet_group  = "gwlbe_eastwest"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security"
        next_hop_type = "transit_gateway_attachment"
      }
    }
  }

  # ===========================================================================
  # DEDICATED INBOUND VPC — Internet entry point for all inbound traffic
  # Per-app LB subnets avoid IGW route table conflicts between GWLBE endpoints.
  # ===========================================================================
  inbound_vpc = {
    name  = "inbound-vpc"
    cidr  = "10.50.0.0/23"
    nacls = {}
    security_groups = {
      inbound_lb = {
        name = "inbound_lb"
        rules = {
          all_outbound = {
            description = "Permit All traffic outbound"
            type        = "egress", from_port = "0", to_port = "0", protocol = "-1"
            cidr_blocks = ["0.0.0.0/0"]
          }
          https = {
            description = "Permit HTTPS from internet"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["0.0.0.0/0"]
          }
          http = {
            description = "Permit HTTP from internet"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["0.0.0.0/0"]
          }
        }
      }
    }
    subnets = {
      # Per-app LB subnets — each app's GWLBE maps to its own LB subnet group
      "10.50.0.0/28"  = { az = "us-west-2a", subnet_group = "app1_lb" }
      "10.50.1.0/28"  = { az = "us-west-2b", subnet_group = "app1_lb" }
      "10.50.0.48/28" = { az = "us-west-2a", subnet_group = "app2_lb" }
      "10.50.1.48/28" = { az = "us-west-2b", subnet_group = "app2_lb" }

      # GWLB Endpoint subnets (shared by all inbound endpoints)
      "10.50.0.16/28" = { az = "us-west-2a", subnet_group = "inbound_gwlbe" }
      "10.50.1.16/28" = { az = "us-west-2b", subnet_group = "inbound_gwlbe" }

      # TGW Attach subnets
      "10.50.0.32/28" = { az = "us-west-2a", subnet_group = "tgw_attach" }
      "10.50.1.32/28" = { az = "us-west-2b", subnet_group = "tgw_attach" }
    }
    routes = {
      # App1 LB subnets: default to GWLBE (inbound inspection from internet)
      app1_lb_default = {
        vpc           = "inbound_vpc"
        subnet_group  = "app1_lb"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app1_inbound"
        next_hop_type = "gwlbe_endpoint"
      }
      # App1 LB subnets: spoke traffic via TGW (NLB forwarding to spoke NLBs)
      app1_lb_to_app1 = {
        vpc           = "inbound_vpc"
        subnet_group  = "app1_lb"
        to_cidr       = "10.48.0.0/21"
        next_hop_key  = "inbound"
        next_hop_type = "transit_gateway_attachment"
      }

      # App2 LB subnets: default to GWLBE (inbound inspection from internet)
      app2_lb_default = {
        vpc           = "inbound_vpc"
        subnet_group  = "app2_lb"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app2_inbound"
        next_hop_type = "gwlbe_endpoint"
      }
      # App2 LB subnets: spoke traffic via TGW
      app2_lb_to_app2 = {
        vpc           = "inbound_vpc"
        subnet_group  = "app2_lb"
        to_cidr       = "10.49.0.0/21"
        next_hop_key  = "inbound"
        next_hop_type = "transit_gateway_attachment"
      }

      # GWLBE subnets: return to IGW (response path back to internet after inspection)
      gwlbe_default = {
        vpc           = "inbound_vpc"
        subnet_group  = "inbound_gwlbe"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "inbound_vpc"
        next_hop_type = "internet_gateway"
      }
    }
  }

  # ===========================================================================
  # APP1 SPOKE VPC — VMs + internal NLB (no IGW, no GWLBE)
  # ===========================================================================
  app1_vpc = {
    name                    = "app1-spoke-vpc"
    cidr                    = "10.48.0.0/21"
    create_internet_gateway = false
    nacls                   = {}
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
            cidr_blocks = ["1.1.1.1/32", "10.50.0.0/23", "10.48.0.0/21", "10.49.0.0/21"]
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.50.0.0/23", "10.48.0.0/21", "10.49.0.0/21"]
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.50.0.0/23", "10.48.0.0/21", "10.49.0.0/21"]
          }
        }
      }
    }
    subnets = {
      # App1 VM Subnets
      "10.48.0.0/24" = { az = "us-west-2a", subnet_group = "app1_vm" }
      "10.48.1.0/24" = { az = "us-west-2b", subnet_group = "app1_vm" }
      # App1 LB Subnets (internal spoke NLBs)
      "10.48.2.0/24" = { az = "us-west-2a", subnet_group = "app1_lb" }
      "10.48.3.0/24" = { az = "us-west-2b", subnet_group = "app1_lb" }
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
      lb_default = {
        vpc           = "app1_vpc"
        subnet_group  = "app1_lb"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app1"
        next_hop_type = "transit_gateway_attachment"
      }
    }
  }

  # ===========================================================================
  # APP2 SPOKE VPC — VMs + internal NLB (no IGW, no GWLBE)
  # ===========================================================================
  app2_vpc = {
    name                    = "app2-spoke-vpc"
    cidr                    = "10.49.0.0/21"
    create_internet_gateway = false
    nacls                   = {}
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
            cidr_blocks = ["1.1.1.1/32", "10.50.0.0/23", "10.48.0.0/21", "10.49.0.0/21"]
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.50.0.0/23", "10.48.0.0/21", "10.49.0.0/21"]
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.50.0.0/23", "10.48.0.0/21", "10.49.0.0/21"]
          }
        }
      }
    }
    subnets = {
      # App2 VM Subnets
      "10.49.0.0/24" = { az = "us-west-2a", subnet_group = "app2_vm" }
      "10.49.1.0/24" = { az = "us-west-2b", subnet_group = "app2_vm" }
      # App2 LB Subnets (internal spoke NLBs)
      "10.49.2.0/24" = { az = "us-west-2a", subnet_group = "app2_lb" }
      "10.49.3.0/24" = { az = "us-west-2b", subnet_group = "app2_lb" }
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
      lb_default = {
        vpc           = "app2_vpc"
        subnet_group  = "app2_lb"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app2"
        next_hop_type = "transit_gateway_attachment"
      }
    }
  }
}

### NAT GATEWAYS
natgws = {
  security_nat_gw = {
    name         = "natgw"
    vpc          = "security_vpc"
    subnet_group = "nat_gateway"
    nat_gateways = {
      "us-west-2a" = "natgw-2a"
      "us-west-2b" = "natgw-2b"
      "us-west-2c" = "natgw-2c"
      "us-west-2d" = "natgw-2d"
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
      "from_inbound_vpc" = {
        create = true
        name   = "from_inbound"
      }
    }
  }
}

tgw_attachments = {
  # Value of `route_table` and `propagate_routes_to` must match `route_tables` stores under `tgw`
  security = {
    tgw_key                 = "tgw"
    security_vpc_attachment = true
    name                    = "vmseries"
    vpc                     = "security_vpc"
    subnet_group            = "tgw_attach"
    route_table             = "from_security_vpc"
    propagate_routes_to     = ["from_spoke_vpc", "from_inbound_vpc"]
  }
  inbound = {
    tgw_key             = "tgw"
    name                = "inbound-vpc"
    vpc                 = "inbound_vpc"
    subnet_group        = "tgw_attach"
    route_table         = "from_inbound_vpc"
    propagate_routes_to = ["from_spoke_vpc"]
  }
  app1 = {
    tgw_key             = "tgw"
    name                = "app1-spoke-vpc"
    vpc                 = "app1_vpc"
    subnet_group        = "app1_vm"
    route_table         = "from_spoke_vpc"
    propagate_routes_to = ["from_security_vpc", "from_inbound_vpc"]
  }
  app2 = {
    tgw_key             = "tgw"
    name                = "app2-spoke-vpc"
    vpc                 = "app2_vpc"
    subnet_group        = "app2_vm"
    route_table         = "from_spoke_vpc"
    propagate_routes_to = ["from_security_vpc", "from_inbound_vpc"]
  }
}

### GATEWAY LOADBALANCER
gwlbs = {
  security_gwlb = {
    name         = "security-gwlb"
    vpc          = "security_vpc"
    subnet_group = "gwlb"
  }
}

gwlb_endpoints = {
  # Value of `gwlb` must match key of objects stored in `gwlbs`
  # Value of `vpc` must match key of objects stored in `vpcs`

  # Outbound + east-west in security VPC (unchanged)
  security_gwlb_eastwest = {
    name            = "eastwest-gwlb-endpoint"
    gwlb            = "security_gwlb"
    vpc             = "security_vpc"
    subnet_group    = "gwlbe_eastwest"
    act_as_next_hop = false
  }
  security_gwlb_outbound = {
    name            = "outbound-gwlb-endpoint"
    gwlb            = "security_gwlb"
    vpc             = "security_vpc"
    subnet_group    = "gwlbe_outbound"
    act_as_next_hop = false
  }

  # Per-app inbound endpoints in DEDICATED INBOUND VPC
  # Each points to its own LB subnet group — avoids IGW route conflicts
  app1_inbound = {
    name                     = "app1-inbound-gwlb-endpoint"
    gwlb                     = "security_gwlb"
    vpc                      = "inbound_vpc"
    subnet_group             = "inbound_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "inbound_vpc"
    from_igw_to_subnet_group = "app1_lb"
  }
  app2_inbound = {
    name                     = "app2-inbound-gwlb-endpoint"
    gwlb                     = "security_gwlb"
    vpc                      = "inbound_vpc"
    subnet_group             = "inbound_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "inbound_vpc"
    from_igw_to_subnet_group = "app2_lb"
  }
}

### VM-SERIES
# Per-AZ groups for overlay routing (different template stack per AZ)
vmseries = {
  vmseries-az-a = {
    instances = {
      "01" = { az = "us-west-2a" }
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
    vpc = "security_vpc"

    # Value of `gwlb` must match key of objects stored in `gwlbs`
    gwlb = "security_gwlb"

    interfaces = {
      private = {
        device_index      = 0
        security_group    = "vmseries_private"
        vpc               = "security_vpc"
        subnet_group      = "private"
        create_public_ip  = false
        source_dest_check = false
      }
      mgmt = {
        device_index      = 1
        security_group    = "vmseries_mgmt"
        vpc               = "security_vpc"
        subnet_group      = "mgmt"
        create_public_ip  = true
        source_dest_check = true
      }
      public = {
        device_index      = 2
        security_group    = "vmseries_public"
        vpc               = "security_vpc"
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

  vmseries-az-b = {
    instances = {
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
    vpc = "security_vpc"

    # Value of `gwlb` must match key of objects stored in `gwlbs`
    gwlb = "security_gwlb"

    interfaces = {
      private = {
        device_index      = 0
        security_group    = "vmseries_private"
        vpc               = "security_vpc"
        subnet_group      = "private"
        create_public_ip  = false
        source_dest_check = false
      }
      mgmt = {
        device_index      = 1
        security_group    = "vmseries_mgmt"
        vpc               = "security_vpc"
        subnet_group      = "mgmt"
        create_public_ip  = true
        source_dest_check = true
      }
      public = {
        device_index      = 2
        security_group    = "vmseries_public"
        vpc               = "security_vpc"
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

### SPOKE NLBs (internal, in spoke VPCs — fronting VMs)
spoke_nlbs = {
  "app1-nlb" = {
    name         = "app1-nlb"
    vpc          = "app1_vpc"
    subnet_group = "app1_lb"
    internal_lb  = true
    vms          = ["app1_vm01", "app1_vm02"]
    balance_rules = {
      "HTTP" = {
        port     = "80"
        protocol = "TCP"
      }
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
    internal_lb  = true
    vms          = ["app2_vm01", "app2_vm02"]
    balance_rules = {
      "HTTP" = {
        port     = "80"
        protocol = "TCP"
      }
      "SSH" = {
        port     = "22"
        protocol = "TCP"
      }
    }
  }
}

### INBOUND NLBs (internet-facing, in inbound VPC — target spoke NLB IPs)
inbound_nlbs = {
  "app1-inbound-nlb" = {
    name         = "app1-inbound-nlb"
    vpc          = "inbound_vpc"
    subnet_group = "app1_lb"
    spoke_nlb    = "app1-nlb"
    balance_rules = {
      "HTTP" = {
        port     = "80"
        protocol = "TCP"
      }
      "SSH" = {
        port     = "22"
        protocol = "TCP"
      }
    }
  }
  "app2-inbound-nlb" = {
    name         = "app2-inbound-nlb"
    vpc          = "inbound_vpc"
    subnet_group = "app2_lb"
    spoke_nlb    = "app2-nlb"
    balance_rules = {
      "HTTP" = {
        port     = "80"
        protocol = "TCP"
      }
      "SSH" = {
        port     = "22"
        protocol = "TCP"
      }
    }
  }
}

### SPOKE ALBs (not used in dedicated inbound design)
spoke_albs = {}
