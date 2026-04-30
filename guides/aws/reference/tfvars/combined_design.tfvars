# Reference tfvars for the SWFW combined_design example, re-CIDR'd to follow
# the customer IP schema in ../aws-ip-schema.tf.
#
# Source: PaloAltoNetworks/terraform-aws-swfw-modules
#         examples/combined_design/example.tfvars
#
# Changes vs upstream:
#   - region: eu-west-1 -> us-east-2
#   - security_vpc CIDR: 10.100.0.0/16 -> 10.51.0.0/22 (8 groups x 4 AZ slots, /28 each)
#   - added natgw subnet group (supports non-overlay routing)
#   - NACL/SG rule CIDRs updated to track new subnets
#   - added natgw_default route (NAT GW -> IGW egress)
#   - spoke VPCs (app1_vpc, app2_vpc) untouched except AZ labels
#
# Routing model: defaults to overlay (firewall has eth1/2 + does NAT). natgw
# subnets are pre-allocated for switching to non-overlay later.

### GENERAL
region      = "us-east-2" # TODO: update here
name_prefix = "example-"  # TODO: update here

global_tags = {
  ManagedBy   = "terraform"
  Application = "Palo Alto Networks VM-Series NGFW"
  Owner       = "PS Team"
}

ssh_key_name = "example-ssh-key" # TODO: update here

### VPC
vpcs = {
  security_vpc = {
    name = "security-vpc"
    cidr = "10.51.0.0/22"
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
            cidr_blocks = ["1.1.1.1/32"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          ssh = {
            description = "Permit SSH"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          */
          panorama_ssh = {
            description = "Permit Panorama SSH (Optional)"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["10.0.0.0/8"]
          }
          panorama_https = {
            description = "Permit HTTPS (direct firewall GUI mgmt from internal nets)"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["10.0.0.0/8"]
          }
          panorama_ping = {
            description = "Permit ICMP (reachability checks from internal nets)"
            type        = "ingress", from_port = "-1", to_port = "-1", protocol = "icmp"
            cidr_blocks = ["10.0.0.0/8"]
          }
          panorama_mgmt = {
            # REQUIRED for Panorama to manage the FW. Without this the FW boots
            # and registers but Panorama config push, log forwarding, and software
            # upgrades all fail. Source = your Panorama subnet CIDR.
            description = "Permit Panorama-to-FW management channel (config, log fwd, sw upgrade)"
            type        = "ingress", from_port = "3978", to_port = "3978", protocol = "tcp"
            cidr_blocks = ["10.255.0.0/24"] # TODO: update here (replace with your Panorama subnet CIDR)
          }
          panorama_device_cert = {
            # REQUIRED for PAN-OS 10+ device-certificate-based management.
            description = "Permit Panorama device certificate / context-switch channel (PAN-OS 10+)"
            type        = "ingress", from_port = "28443", to_port = "28443", protocol = "tcp"
            cidr_blocks = ["10.255.0.0/24"] # TODO: update here (replace with your Panorama subnet CIDR)
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
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
        }
      }
    }
    subnets = {
      # Customer IP schema: 10.51.0.0/22 carved into 8 subnet groups x 4 AZ slots, /28 each.
      # Value of `nacl` must match key of objects stored in `nacls`.

      # SUBNET-0-0-TGW-ATTACH
      "10.51.0.0/28" = { az = "us-east-2a", subnet_group = "tgw_attach" }
      "10.51.1.0/28" = { az = "us-east-2b", subnet_group = "tgw_attach" }
      "10.51.2.0/28" = { az = "us-east-2a", subnet_group = "tgw_attach" }
      "10.51.3.0/28" = { az = "us-east-2b", subnet_group = "tgw_attach" }

      # SUBNET-1-16-GWLBE-OUTBOUND
      "10.51.0.16/28" = { az = "us-east-2a", subnet_group = "gwlbe_outbound" }
      "10.51.1.16/28" = { az = "us-east-2b", subnet_group = "gwlbe_outbound" }
      "10.51.2.16/28" = { az = "us-east-2a", subnet_group = "gwlbe_outbound" }
      "10.51.3.16/28" = { az = "us-east-2b", subnet_group = "gwlbe_outbound" }

      # SUBNET-2-32-GWLBE-EASTWEST
      "10.51.0.32/28" = { az = "us-east-2a", subnet_group = "gwlbe_eastwest" }
      "10.51.1.32/28" = { az = "us-east-2b", subnet_group = "gwlbe_eastwest" }
      "10.51.2.32/28" = { az = "us-east-2a", subnet_group = "gwlbe_eastwest" }
      "10.51.3.32/28" = { az = "us-east-2b", subnet_group = "gwlbe_eastwest" }

      # SUBNET-3-48-GWLB ALLOCATE ALL AZ'S IN REGION
      "10.51.0.48/28" = { az = "us-east-2a", subnet_group = "gwlb" }
      "10.51.1.48/28" = { az = "us-east-2b", subnet_group = "gwlb" }
      "10.51.2.48/28" = { az = "us-east-2c", subnet_group = "gwlb" }
      "10.51.3.48/28" = { az = "us-east-2c", subnet_group = "gwlb" }

      # SUBNET-4-64-FW-DATA-PRIVATE
      "10.51.0.64/28" = { az = "us-east-2a", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.51.1.64/28" = { az = "us-east-2b", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.51.2.64/28" = { az = "us-east-2a", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "10.51.3.64/28" = { az = "us-east-2b", subnet_group = "private", nacl = "trusted_path_monitoring" }

      # SUBNET-5-80-FW-DATA-MGMT
      "10.51.0.80/28" = { az = "us-east-2a", subnet_group = "mgmt" }
      "10.51.1.80/28" = { az = "us-east-2b", subnet_group = "mgmt" }
      "10.51.2.80/28" = { az = "us-east-2a", subnet_group = "mgmt" }
      "10.51.3.80/28" = { az = "us-east-2b", subnet_group = "mgmt" }

      # SUBNET-6-96-FW-DATA-PUBLIC
      "10.51.0.96/28" = { az = "us-east-2a", subnet_group = "public" }
      "10.51.1.96/28" = { az = "us-east-2b", subnet_group = "public" }
      "10.51.2.96/28" = { az = "us-east-2a", subnet_group = "public" }
      "10.51.3.96/28" = { az = "us-east-2b", subnet_group = "public" }

      # SUBNET-7-112-NAT-GW
      "10.51.0.112/28" = { az = "us-east-2a", subnet_group = "natgw" }
      "10.51.1.112/28" = { az = "us-east-2b", subnet_group = "natgw" }
      "10.51.2.112/28" = { az = "us-east-2a", subnet_group = "natgw" }
      "10.51.3.112/28" = { az = "us-east-2b", subnet_group = "natgw" }
    }
    routes = {
      # Value of `next_hop_key` must match keys use to create TGW attachment, IGW, GWLB endpoint or other resources
      # Value of `next_hop_type` is internet_gateway, nat_gateway, transit_gateway_attachment or gwlbe_endpoint
      mgmt_default = {
        vpc           = "security_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_natgw"
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
      gwlbe_outbound_rfc1918 = {
        vpc           = "security_vpc"
        subnet_group  = "gwlbe_outbound"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security"
        next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_outbound_default = {
        vpc           = "security_vpc"
        subnet_group  = "gwlbe_outbound"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_natgw"
        next_hop_type = "nat_gateway"
      }
      gwlbe_eastwest_rfc1918 = {
        vpc           = "security_vpc"
        subnet_group  = "gwlbe_eastwest"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security"
        next_hop_type = "transit_gateway_attachment"
      }
      natgw_default = {
        vpc           = "security_vpc"
        subnet_group  = "natgw"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_vpc"
        next_hop_type = "internet_gateway"
      }
      natgw_rfc1918 = {
        vpc           = "security_vpc"
        subnet_group  = "natgw"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_gwlb_outbound"
        next_hop_type = "gwlbe_endpoint"
      }
    }
  }
  app1_vpc = {
    name  = "app1-spoke-vpc"
    cidr  = "10.104.0.0/16"
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
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
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
            cidr_blocks = ["1.1.1.1/32"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
        }
      }
    }
    subnets = {
      "10.104.0.0/24"   = { az = "us-east-2a", subnet_group = "app1_vm" }
      "10.104.128.0/24" = { az = "us-east-2b", subnet_group = "app1_vm" }
      "10.104.2.0/24"   = { az = "us-east-2a", subnet_group = "app1_lb" }
      "10.104.130.0/24" = { az = "us-east-2b", subnet_group = "app1_lb" }
      "10.104.3.0/24"   = { az = "us-east-2a", subnet_group = "app1_gwlbe" }
      "10.104.131.0/24" = { az = "us-east-2b", subnet_group = "app1_gwlbe" }
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
  app2_vpc = {
    name  = "app2-spoke-vpc"
    cidr  = "10.105.0.0/16"
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
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32", "10.104.0.0/16", "10.105.0.0/16"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
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
            cidr_blocks = ["1.1.1.1/32"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["1.1.1.1/32"] # TODO: update here (replace 1.1.1.1/32 with your IP range)
          }
        }
      }
    }
    subnets = {
      "10.105.0.0/24"   = { az = "us-east-2a", subnet_group = "app2_vm" }
      "10.105.128.0/24" = { az = "us-east-2b", subnet_group = "app2_vm" }
      "10.105.2.0/24"   = { az = "us-east-2a", subnet_group = "app2_lb" }
      "10.105.130.0/24" = { az = "us-east-2b", subnet_group = "app2_lb" }
      "10.105.3.0/24"   = { az = "us-east-2a", subnet_group = "app2_gwlbe" }
      "10.105.131.0/24" = { az = "us-east-2b", subnet_group = "app2_gwlbe" }
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

### NAT GATEWAYS
# One NAT GW per AZ in the natgw subnet group. Provides non-overlay egress
# for the firewall mgmt subnet and the gwlbe_outbound return path.
natgws = {
  security_natgw = {
    vpc          = "security_vpc"
    subnet_group = "natgw"
    nat_gateway_names = {
      "us-east-2a" = "natgw-2a"
      "us-east-2b" = "natgw-2b"
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
  security = {
    tgw_key                 = "tgw"
    security_vpc_attachment = true
    name                    = "vmseries"
    vpc                     = "security_vpc"
    subnet_group            = "tgw_attach"
    route_table             = "from_security_vpc"
    propagate_routes_to     = ["from_spoke_vpc"]
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
  app1_inbound = {
    name                     = "app1-gwlb-endpoint"
    gwlb                     = "security_gwlb"
    vpc                      = "app1_vpc"
    subnet_group             = "app1_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "app1_vpc"
    from_igw_to_subnet_group = "app1_lb"
  }
  app2_inbound = {
    name                     = "app2-gwlb-endpoint"
    gwlb                     = "security_gwlb"
    vpc                      = "app2_vpc"
    subnet_group             = "app2_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "app2_vpc"
    from_igw_to_subnet_group = "app2_lb"
  }
}

### VM-SERIES
vmseries = {
  vmseries = {
    instances = {
      "01" = { az = "us-east-2a" }
      "02" = { az = "us-east-2b" }
    }

    # Value of `panorama-server`, `auth-key`, `dgname`, `tplname` can be taken from plugin `sw_fw_license`. Delete map if SCM bootstrap required.
    bootstrap_options = {
      mgmt-interface-swap         = "enable"
      plugin-op-commands          = "panorama-licensing-mode-on,aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable" # TODO: update here
      panorama-server             = ""                                                                                                          # TODO: update here
      auth-key                    = ""                                                                                                          # TODO: update here
      dgname                      = ""                                                                                                          # TODO: update here
      tplname                     = ""                                                                                                          # TODO: update here
      dhcp-send-hostname          = "yes"                                                                                                       # TODO: update here
      dhcp-send-client-id         = "yes"                                                                                                       # TODO: update here
      dhcp-accept-server-hostname = "yes"                                                                                                       # TODO: update here
      dhcp-accept-server-domain   = "yes"                                                                                                       # TODO: update here
    }

    /* Uncomment this section if SCM bootstrap required (PAN-OS version 11.0 or higher)

    bootstrap_options = {
      mgmt-interface-swap                   = "enable"
      panorama-server                       = "cloud"                                                                          # TODO: update here
      dgname                                = "scm_folder_name"                                                                # TODO: update here
      dhcp-send-hostname                    = "yes"                                                                            # TODO: update here
      dhcp-send-client-id                   = "yes"                                                                            # TODO: update here
      dhcp-accept-server-hostname           = "yes"                                                                            # TODO: update here
      dhcp-accept-server-domain             = "yes"                                                                            # TODO: update here
      plugin-op-commands                    = "aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable" # TODO: update here
      vm-series-auto-registration-pin-id    = "1234ab56-1234-12a3-a1bc-a1bc23456de7"                                           # TODO: update here
      vm-series-auto-registration-pin-value = "12ab3c456d78901e2f3abc456d78ef9a"                                               # TODO: update here
      authcodes                             = "D1234567"                                                                       # TODO: update here
    }
    */

    # airs_deployment = true # Uncomment this line for AIRS deployment (PAN-OS version 11.2.4-h1 or higher)
    panos_version = "11.1.4-h7"     # TODO: update here
    ebs_kms_id    = "alias/aws/ebs" # TODO: update here

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
        create_public_ip  = false # mgmt reached via TGW from Panorama; no EIP needed
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
          subinterface  = "ethernet1/1.101"
        }
        app2 = {
          gwlb_endpoint = "app2_inbound"
          subinterface  = "ethernet1/1.102"
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
      dns_primary = "4.2.2.2"      # TODO: update here
      ntp_primary = "pool.ntp.org" # TODO: update here
    }
  }
}


### PANORAMA
# Uncomment the following section to add a route to Panorama TGW attachment on Security VPC attachment
/*
panorama_attachment = {
  tgw_key = "tgw"
  transit_gateway_attachment_id = "tgw-attach-123"  # TODO: update here
  vpc_cidr                      = "10.255.0.0/24"   # TODO: update here
}
*/

### SPOKE VMS
spoke_vms = {
  "app1_vm01" = {
    az             = "us-east-2a"
    vpc            = "app1_vpc"
    subnet_group   = "app1_vm"
    security_group = "app1_vm"
  }
  "app1_vm02" = {
    az             = "us-east-2b"
    vpc            = "app1_vpc"
    subnet_group   = "app1_vm"
    security_group = "app1_vm"
  }
  "app2_vm01" = {
    az             = "us-east-2a"
    vpc            = "app2_vpc"
    subnet_group   = "app2_vm"
    security_group = "app2_vm"
  }
  "app2_vm02" = {
    az             = "us-east-2b"
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
