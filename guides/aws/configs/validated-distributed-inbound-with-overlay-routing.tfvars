# #############################################################################
#
#   COMBINED DESIGN — OVERLAY ROUTING
#   VM-Series with Distributed Inbound Spoke VPCs + Overlay Routing
#
#   Validated end-to-end: Panorama bootstrap, GWLB inspection, overlay NAT,
#   inbound/outbound/east-west traffic flows confirmed.
#
#   Key design decisions:
#
#   - Overlay routing is ENABLED (aws-gwlb-overlay-routing:enable). Firewalls
#     perform source NAT on egress traffic to their public interface. Each
#     firewall requires a public IP (EIP) on its public interface.
#
#   - Advanced routing engine is ENABLED (advance-routing:enable). Required
#     for overlay routing's per-AZ static routes.
#
#   - Per-AZ VM-Series groups — overlay routing requires a different template
#     stack per AZ (different gateway IPs), so firewalls are split into
#     separate groups (vmseries-az-a, vmseries-az-b) with distinct tplname.
#
#   - NAT Gateways are deployed in the security VPC for firewall management
#     egress only (content updates, WildFire, threat feeds). Spoke egress
#     is handled by the firewall's overlay NAT, not the NAT Gateway.
#
#   - No NAT Gateway route on the gwlbe_outbound subnet — with overlay
#     routing, post-inspection outbound traffic exits via the firewall's
#     public interface and IGW directly. The gwlbe_outbound subnet only
#     needs a return route to spokes via TGW.
#
# #############################################################################
#
# Traffic inspection: VM-Series via Gateway Load Balancer
# Routing model:      Overlay (firewall-side source NAT)
# Bootstrap method:   Traditional Panorama (SCM option documented below)
# Mgmt egress:        NAT Gateway (no public IP on firewall mgmt interface)
# Data egress:        Firewall public interface EIP (overlay NAT)
#
# This file is a sanitized, deployment-ready template derived from a validated
# deployment. All values that must be customized are marked with "CHANGE:"
# comments.
#
# -----------------------------------------------------------------------------
# NETWORK PLACEHOLDERS — Find-and-replace these before deployment
# -----------------------------------------------------------------------------
#
# The following placeholders represent the first two octets of each VPC's
# network prefix. Replace each with your actual IP plan before deploying.
# Subnet structure (3rd and 4th octets) is preserved — only change the prefix.
#
#   Placeholder       Example replacement   Scope
#   ─────────────     ───────────────────    ─────────────────────────────
#   <SEC_NET>         10.51                  Security VPC (/21, /28 subnets)
#   <APP1_NET>        10.104                 App1 spoke VPC (/21, /28 subnets)
#   <APP2_NET>        10.105                 App2 spoke VPC (/21, /28 subnets)
#   <PANORAMA_NET>    10.251                 Panorama subnet (for SG rules)
#
# Quick-start example:
#
#   # 1. Copy the template into your Terraform working directory
#   cp validated-distributed-inbound-with-overlay-routing.tfvars terraform.tfvars
#
#   # 2. Replace network placeholders with your actual IP plan
#   sed -i '' \
#     's/<SEC_NET>/10.51/g;
#      s/<APP1_NET>/10.104/g;
#      s/<APP2_NET>/10.105/g;
#      s/<PANORAMA_NET>/10.251/g;
#      s/<ADMIN_IP>/203.0.113.10/g' terraform.tfvars
#
#   # 3. Replace general settings
#   sed -i '' \
#     's/us-west-2/us-east-1/g;
#      s/my-ssh-key/your-key-pair/g;
#      s/prod-overlay-/acme-fw-/g;
#      s/network-team/your-team/g' terraform.tfvars
#
#   # 4. Replace bootstrap parameters (Panorama example)
#   sed -i '' \
#     's/<PANORAMA_IP>/10.251.2.51/g;
#      s/<DEVICE_GROUP>/DG-AWS-COMBINED/g;
#      s/<TEMPLATE_STACK_AZ_A>/STK-AWS-COMBINED-AZ-A/g;
#      s/<TEMPLATE_STACK_AZ_B>/STK-AWS-COMBINED-AZ-B/g;
#      s/<AUTH_KEY>/YOUR_AUTH_KEY_HERE/g' terraform.tfvars
#
#   # 5. Update AZ names if not us-west-2 (already handled by step 3 region replace)
#   #    If your region has different AZ suffixes, update manually:
#   #    us-east-1a/b/c instead of us-west-2a/b/c
#
#   # 6. Review, init, plan, apply
#   terraform init
#   terraform plan -out=plan.tfplan
#   terraform apply "plan.tfplan"
#
# -----------------------------------------------------------------------------
# DEPLOYMENT CHECKLIST — Update these before running terraform plan
# -----------------------------------------------------------------------------
#
# 1. GENERAL
#    [ ] region              — Target AWS region
#    [ ] name_prefix         — Unique prefix for all resource names
#    [ ] global_tags         — Owner, Application, cost-center, environment tags
#    [ ] ssh_key_name        — EC2 key pair name (must exist in the target region)
#
# 2. NETWORKING — Security VPC
#    [ ] Replace <SEC_NET> placeholder with your security VPC prefix
#    [ ] Availability Zones  — Match AZs to your target region (e.g., us-east-1a/b/c)
#    [ ] GWLB AZs            — Allocate gwlb subnets in every AZ you may use
#    [ ] NAT Gateway AZ names — Must match the AZs used in natgw subnets
#
# 3. NETWORKING — Spoke VPCs
#    [ ] Replace <APP1_NET> and <APP2_NET> placeholders
#    [ ] Spoke AZs           — Must match the target region
#
# 4. SECURITY GROUPS
#    [ ] Replace <ADMIN_IP>/32 with your public IP or office CIDR
#    [ ] Replace <PANORAMA_NET>.2.0/24 with your Panorama subnet CIDR
#
# 5. VM-SERIES — Bootstrap & Licensing
#
#    Option A — Traditional Panorama:
#    [ ] panorama-server     — Panorama IP (must be reachable from mgmt subnet)
#    [ ] auth-key            — From License Manager > Show Bootstrap Parameters
#    [ ] dgname              — Panorama device group name
#    [ ] tplname             — Per-AZ template stack name (overlay requires one per AZ)
#
#    Option B — Strata Cloud Manager (SCM):
#    [ ] panorama-server     — Set to "cloud"
#    [ ] dgname              — SCM folder name (per-AZ)
#    [ ] authcodes           — VM-Series license auth code
#    [ ] vm-series-auto-registration-pin-id    — From SCM tenant settings
#    [ ] vm-series-auto-registration-pin-value — From SCM tenant settings
#
#    Common:
#    [ ] panos_version       — Desired PAN-OS version (check AWS Marketplace AMI)
#    [ ] ebs_kms_id          — KMS key alias or ARN for EBS encryption
#
# 6. SYSTEM SERVICES
#    [ ] dns_primary         — Internal or public DNS (AWS VPC default: 169.254.169.253)
#    [ ] ntp_primary         — NTP server
#
# =============================================================================

### GENERAL
region      = "us-west-2"              # CHANGE: target AWS region
name_prefix = "prod-overlay-"          # CHANGE: unique resource name prefix

global_tags = {
  ManagedBy   = "terraform"
  Application = "vm-series-combined"   # CHANGE: application name
  Owner       = "network-team"         # CHANGE: team or owner
}

ssh_key_name = "my-ssh-key"            # CHANGE: existing EC2 key pair name in this region

### VPC
vpcs = {
  security_vpc = {
    name = "security-vpc"
    cidr = "<SEC_NET>.0.0/21"          # CHANGE: security VPC CIDR
    nacls = {
      trusted_path_monitoring = {
        name = "trusted-path-monitoring"
        rules = {
          block_outbound_icmp_1 = {
            rule_number = 110
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "<SEC_NET>.0.64/28"
          }
          block_outbound_icmp_2 = {
            rule_number = 120
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "<SEC_NET>.1.64/28"
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
              "<SEC_NET>.0.48/28", "<SEC_NET>.1.48/28", "<SEC_NET>.2.48/28"
            ]
          }
          health_probe = {
            description = "Permit Port 80 Health Probe to GWLB subnets"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = [
              "<SEC_NET>.0.48/28", "<SEC_NET>.1.48/28", "<SEC_NET>.2.48/28"
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
          ssh = {
            description = "Permit SSH from internal networks"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["10.0.0.0/8"]          # CHANGE: restrict to your internal CIDR
          }
          https = {
            description = "Permit HTTPS (direct firewall GUI mgmt from internal nets)"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["10.0.0.0/8"]          # CHANGE: restrict to your internal CIDR
          }
          icmp = {
            description = "Permit ICMP (reachability checks from internal nets)"
            type        = "ingress", from_port = "-1", to_port = "-1", protocol = "icmp"
            cidr_blocks = ["10.0.0.0/8"]          # CHANGE: restrict to your internal CIDR
          }
          panorama_mgmt = {
            description = "Permit Panorama-to-FW management channel (config, log fwd, sw upgrade)"
            type        = "ingress", from_port = "3978", to_port = "3978", protocol = "tcp"
            cidr_blocks = ["<PANORAMA_NET>.2.0/24"]  # CHANGE: Panorama subnet CIDR
          }
          panorama_device_cert = {
            description = "Permit Panorama device certificate / context-switch channel (PAN-OS 10+)"
            type        = "ingress", from_port = "28443", to_port = "28443", protocol = "tcp"
            cidr_blocks = ["<PANORAMA_NET>.2.0/24"]  # CHANGE: Panorama subnet CIDR
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
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
        }
      }
    }
    subnets = {
      # Security VPC uses a /21 carved into /28 subnets.
      # 2 AZs for compute, 3 AZs for GWLB (cross-AZ coverage).
      # AZ names must match your target region.

      # SUBNET-0: TGW Attachment
      "<SEC_NET>.0.0/28"   = { az = "us-west-2a", subnet_group = "tgw_attach" }      # CHANGE: AZ
      "<SEC_NET>.1.0/28"   = { az = "us-west-2b", subnet_group = "tgw_attach" }      # CHANGE: AZ

      # SUBNET-1: GWLB Endpoints — Outbound
      "<SEC_NET>.0.16/28"  = { az = "us-west-2a", subnet_group = "gwlbe_outbound" }  # CHANGE: AZ
      "<SEC_NET>.1.16/28"  = { az = "us-west-2b", subnet_group = "gwlbe_outbound" }  # CHANGE: AZ

      # SUBNET-2: GWLB Endpoints — East-West
      "<SEC_NET>.0.32/28"  = { az = "us-west-2a", subnet_group = "gwlbe_eastwest" }  # CHANGE: AZ
      "<SEC_NET>.1.32/28"  = { az = "us-west-2b", subnet_group = "gwlbe_eastwest" }  # CHANGE: AZ

      # SUBNET-3: GWLB Nodes (3 AZs — covers cross-AZ endpoint randomization)
      "<SEC_NET>.0.48/28"  = { az = "us-west-2a", subnet_group = "gwlb" }            # CHANGE: AZ
      "<SEC_NET>.1.48/28"  = { az = "us-west-2b", subnet_group = "gwlb" }            # CHANGE: AZ
      "<SEC_NET>.2.48/28"  = { az = "us-west-2c", subnet_group = "gwlb" }            # CHANGE: AZ

      # SUBNET-4: Firewall Data — Private (GWLB-facing)
      "<SEC_NET>.0.64/28"  = { az = "us-west-2a", subnet_group = "private", nacl = "trusted_path_monitoring" }  # CHANGE: AZ
      "<SEC_NET>.1.64/28"  = { az = "us-west-2b", subnet_group = "private", nacl = "trusted_path_monitoring" }  # CHANGE: AZ

      # SUBNET-5: Firewall Management
      "<SEC_NET>.0.80/28"  = { az = "us-west-2a", subnet_group = "mgmt" }            # CHANGE: AZ
      "<SEC_NET>.1.80/28"  = { az = "us-west-2b", subnet_group = "mgmt" }            # CHANGE: AZ

      # SUBNET-6: Firewall Data — Public (overlay NAT egress, EIP attached)
      "<SEC_NET>.0.96/28"  = { az = "us-west-2a", subnet_group = "public" }          # CHANGE: AZ
      "<SEC_NET>.1.96/28"  = { az = "us-west-2b", subnet_group = "public" }          # CHANGE: AZ

      # SUBNET-7: NAT Gateway (mgmt egress only — not used for spoke traffic in overlay)
      "<SEC_NET>.0.112/28" = { az = "us-west-2a", subnet_group = "natgw" }           # CHANGE: AZ
      "<SEC_NET>.1.112/28" = { az = "us-west-2b", subnet_group = "natgw" }           # CHANGE: AZ
    }
    routes = {
      # Mgmt subnet: default via NAT GW (internet), RFC 1918 via TGW (internal)
      mgmt_default = {
        vpc = "security_vpc", subnet_group = "mgmt"
        to_cidr = "0.0.0.0/0", next_hop_key = "security_natgw", next_hop_type = "nat_gateway"
      }
      mgmt_rfc1918 = {
        vpc = "security_vpc", subnet_group = "mgmt"
        to_cidr = "10.0.0.0/8", next_hop_key = "security", next_hop_type = "transit_gateway_attachment"
      }
      # TGW attachment subnet: outbound via GWLB, east-west via GWLB
      tgw_default = {
        vpc = "security_vpc", subnet_group = "tgw_attach"
        to_cidr = "0.0.0.0/0", next_hop_key = "security_gwlb_outbound", next_hop_type = "gwlbe_endpoint"
      }
      tgw_rfc1918 = {
        vpc = "security_vpc", subnet_group = "tgw_attach"
        to_cidr = "10.0.0.0/8", next_hop_key = "security_gwlb_eastwest", next_hop_type = "gwlbe_endpoint"
      }
      # Public subnet: default via IGW (overlay NAT egress path)
      public_default = {
        vpc = "security_vpc", subnet_group = "public"
        to_cidr = "0.0.0.0/0", next_hop_key = "security_vpc", next_hop_type = "internet_gateway"
      }
      # GWLB endpoint subnets: return traffic to spokes via TGW
      # NOTE: No 0.0.0.0/0 route on gwlbe_outbound — overlay routing does not
      # use NAT Gateway for spoke egress. The firewall SNATs to its public
      # interface and exits via the public subnet's IGW route.
      gwlbe_outbound_rfc1918 = {
        vpc = "security_vpc", subnet_group = "gwlbe_outbound"
        to_cidr = "10.0.0.0/8", next_hop_key = "security", next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_eastwest_rfc1918 = {
        vpc = "security_vpc", subnet_group = "gwlbe_eastwest"
        to_cidr = "10.0.0.0/8", next_hop_key = "security", next_hop_type = "transit_gateway_attachment"
      }
      # NAT GW subnet: default via IGW, RFC 1918 hairpins through outbound GWLBE
      natgw_default = {
        vpc = "security_vpc", subnet_group = "natgw"
        to_cidr = "0.0.0.0/0", next_hop_key = "security_vpc", next_hop_type = "internet_gateway"
      }
      natgw_rfc1918 = {
        vpc = "security_vpc", subnet_group = "natgw"
        to_cidr = "10.0.0.0/8", next_hop_key = "security_gwlb_outbound", next_hop_type = "gwlbe_endpoint"
      }
    }
  }

  # ── Spoke VPC 1 ──────────────────────────────────────────────────────────
  app1_vpc = {
    name  = "app1-spoke-vpc"
    cidr  = "<APP1_NET>.0.0/21"        # CHANGE: spoke 1 VPC CIDR
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
            description = "Permit SSH from admin and spoke VPCs"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
          https = {
            description = "Permit HTTPS from admin and spoke VPCs"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
          http = {
            description = "Permit HTTP from admin and spoke VPCs"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
          icmp = {
            description = "Permit ICMP from spoke VPCs"
            type        = "ingress", from_port = "-1", to_port = "-1", protocol = "icmp"
            cidr_blocks = ["<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]
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
            description = "Permit HTTPS from admin"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32"]        # CHANGE: admin IP or 0.0.0.0/0 for public
          }
          http = {
            description = "Permit HTTP from admin"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32"]        # CHANGE: admin IP or 0.0.0.0/0 for public
          }
        }
      }
    }
    subnets = {
      # Spoke VPC uses /28 subnets within a /23 CIDR.
      # AZ-A subnets in .0.x, AZ-B subnets in .1.x
      "<APP1_NET>.0.0/28"   = { az = "us-west-2a", subnet_group = "app1_vm" }      # CHANGE: AZ
      "<APP1_NET>.1.0/28"   = { az = "us-west-2b", subnet_group = "app1_vm" }      # CHANGE: AZ
      "<APP1_NET>.0.16/28"  = { az = "us-west-2a", subnet_group = "app1_lb" }      # CHANGE: AZ
      "<APP1_NET>.1.16/28"  = { az = "us-west-2b", subnet_group = "app1_lb" }      # CHANGE: AZ
      "<APP1_NET>.0.32/28"  = { az = "us-west-2a", subnet_group = "app1_gwlbe" }   # CHANGE: AZ
      "<APP1_NET>.1.32/28"  = { az = "us-west-2b", subnet_group = "app1_gwlbe" }   # CHANGE: AZ
    }
    routes = {
      vm_default = {
        vpc = "app1_vpc", subnet_group = "app1_vm"
        to_cidr = "0.0.0.0/0", next_hop_key = "app1", next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_default = {
        vpc = "app1_vpc", subnet_group = "app1_gwlbe"
        to_cidr = "0.0.0.0/0", next_hop_key = "app1_vpc", next_hop_type = "internet_gateway"
      }
      lb_default = {
        vpc = "app1_vpc", subnet_group = "app1_lb"
        to_cidr = "0.0.0.0/0", next_hop_key = "app1_inbound", next_hop_type = "gwlbe_endpoint"
      }
    }
  }

  # ── Spoke VPC 2 ──────────────────────────────────────────────────────────
  app2_vpc = {
    name  = "app2-spoke-vpc"
    cidr  = "<APP2_NET>.0.0/21"        # CHANGE: spoke 2 VPC CIDR
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
            description = "Permit SSH from admin and spoke VPCs"
            type        = "ingress", from_port = "22", to_port = "22", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
          https = {
            description = "Permit HTTPS from admin and spoke VPCs"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
          http = {
            description = "Permit HTTP from admin and spoke VPCs"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP
          }
          icmp = {
            description = "Permit ICMP from spoke VPCs"
            type        = "ingress", from_port = "-1", to_port = "-1", protocol = "icmp"
            cidr_blocks = ["<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]
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
            description = "Permit HTTPS from admin"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32"]        # CHANGE: admin IP or 0.0.0.0/0 for public
          }
          http = {
            description = "Permit HTTP from admin"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_IP>/32"]        # CHANGE: admin IP or 0.0.0.0/0 for public
          }
        }
      }
    }
    subnets = {
      # Spoke VPC uses /28 subnets within a /23 CIDR.
      # AZ-A subnets in .0.x, AZ-B subnets in .1.x
      "<APP2_NET>.0.0/28"   = { az = "us-west-2a", subnet_group = "app2_vm" }      # CHANGE: AZ
      "<APP2_NET>.1.0/28"   = { az = "us-west-2b", subnet_group = "app2_vm" }      # CHANGE: AZ
      "<APP2_NET>.0.16/28"  = { az = "us-west-2a", subnet_group = "app2_lb" }      # CHANGE: AZ
      "<APP2_NET>.1.16/28"  = { az = "us-west-2b", subnet_group = "app2_lb" }      # CHANGE: AZ
      "<APP2_NET>.0.32/28"  = { az = "us-west-2a", subnet_group = "app2_gwlbe" }   # CHANGE: AZ
      "<APP2_NET>.1.32/28"  = { az = "us-west-2b", subnet_group = "app2_gwlbe" }   # CHANGE: AZ
    }
    routes = {
      vm_default = {
        vpc = "app2_vpc", subnet_group = "app2_vm"
        to_cidr = "0.0.0.0/0", next_hop_key = "app2", next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_default = {
        vpc = "app2_vpc", subnet_group = "app2_gwlbe"
        to_cidr = "0.0.0.0/0", next_hop_key = "app2_vpc", next_hop_type = "internet_gateway"
      }
      lb_default = {
        vpc = "app2_vpc", subnet_group = "app2_lb"
        to_cidr = "0.0.0.0/0", next_hop_key = "app2_inbound", next_hop_type = "gwlbe_endpoint"
      }
    }
  }
}

### NAT GATEWAYS
# Used for firewall management egress only (not spoke traffic in overlay mode)
natgws = {
  security_natgw = {
    vpc          = "security_vpc"
    subnet_group = "natgw"
    nat_gateway_names = {
      "us-west-2a" = "natgw-2a"       # CHANGE: AZ
      "us-west-2b" = "natgw-2b"       # CHANGE: AZ
    }
  }
}

### TRANSIT GATEWAY
tgws = {
  tgw = {
    name = "tgw"
    asn  = "64512"
    route_tables = {
      "from_security_vpc" = { create = true, name = "from_security" }
      "from_spoke_vpc"    = { create = true, name = "from_spokes" }
    }
  }
}

tgw_attachments = {
  security = {
    tgw_key                 = "tgw"
    security_vpc_attachment = true     # Enables appliance mode — do not disable
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

### GATEWAY LOAD BALANCER
gwlbs = {
  security_gwlb = {
    name         = "security-gwlb"
    vpc          = "security_vpc"
    subnet_group = "gwlb"
  }
}

gwlb_endpoints = {
  # East-west traffic (spoke <-> spoke) — in security VPC
  security_gwlb_eastwest = {
    name            = "eastwest-gwlb-endpoint"
    gwlb            = "security_gwlb"
    vpc             = "security_vpc"
    subnet_group    = "gwlbe_eastwest"
    act_as_next_hop = false
  }
  # Outbound traffic (spoke -> internet) — in security VPC
  security_gwlb_outbound = {
    name            = "outbound-gwlb-endpoint"
    gwlb            = "security_gwlb"
    vpc             = "security_vpc"
    subnet_group    = "gwlbe_outbound"
    act_as_next_hop = false
  }
  # Inbound traffic (internet -> app1) — in app1 VPC
  app1_inbound = {
    name                     = "app1-gwlb-endpoint"
    gwlb                     = "security_gwlb"
    vpc                      = "app1_vpc"
    subnet_group             = "app1_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "app1_vpc"
    from_igw_to_subnet_group = "app1_lb"
  }
  # Inbound traffic (internet -> app2) — in app2 VPC
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
# Overlay routing requires per-AZ template stacks (different gateway IPs per AZ).
# Split into separate groups so each instance bootstraps with the correct tplname.

vmseries = {

  # ── AZ-A Firewall ────────────────────────────────────────────────────────
  vmseries-az-a = {
    instances = {
      "01" = { az = "us-west-2a" }     # CHANGE: AZ
    }

    bootstrap_options = {
      mgmt-interface-swap         = "enable"
      plugin-op-commands          = "panorama-licensing-mode-on,aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      panorama-server             = "<PANORAMA_IP>"          # CHANGE: Panorama IP or "cloud" for SCM
      dgname                      = "<DEVICE_GROUP>"         # CHANGE: Panorama DG or SCM folder name
      tplname                     = "<TEMPLATE_STACK_AZ_A>"  # CHANGE: per-AZ template stack name
      auth-key                    = "<AUTH_KEY>"             # CHANGE: from License Manager > Show Bootstrap Params
      dhcp-send-hostname          = "yes"
      dhcp-send-client-id         = "yes"
      dhcp-accept-server-hostname = "yes"
      dhcp-accept-server-domain   = "yes"
    }

    panos_version = "11.1.4-h7"        # CHANGE: desired PAN-OS version
    ebs_kms_id    = "alias/aws/ebs"    # CHANGE: KMS key alias or ARN

    vpc  = "security_vpc"
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
        create_public_ip  = false          # Mgmt egress via NAT Gateway
        source_dest_check = true
      }
      public = {
        device_index      = 2
        security_group    = "vmseries_public"
        vpc               = "security_vpc"
        subnet_group      = "public"
        create_public_ip  = true           # Required for overlay routing egress
        source_dest_check = false
      }
    }

    subinterfaces = {
      inbound = {
        app1 = { gwlb_endpoint = "app1_inbound", subinterface = "ethernet1/1.101" }
        app2 = { gwlb_endpoint = "app2_inbound", subinterface = "ethernet1/1.102" }
      }
      outbound = {
        only_1_outbound = { gwlb_endpoint = "security_gwlb_outbound", subinterface = "ethernet1/1.20" }
      }
      eastwest = {
        only_1_eastwest = { gwlb_endpoint = "security_gwlb_eastwest", subinterface = "ethernet1/1.30" }
      }
    }

    system_services = {
      dns_primary = "4.2.2.2"             # CHANGE: your DNS server
      ntp_primary = "pool.ntp.org"        # CHANGE: your NTP server
    }
  }

  # ── AZ-B Firewall ────────────────────────────────────────────────────────
  vmseries-az-b = {
    instances = {
      "02" = { az = "us-west-2b" }     # CHANGE: AZ
    }

    bootstrap_options = {
      mgmt-interface-swap         = "enable"
      plugin-op-commands          = "panorama-licensing-mode-on,aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      panorama-server             = "<PANORAMA_IP>"          # CHANGE: same as AZ-A
      dgname                      = "<DEVICE_GROUP>"         # CHANGE: same as AZ-A
      tplname                     = "<TEMPLATE_STACK_AZ_B>"  # CHANGE: different template stack for AZ-B
      auth-key                    = "<AUTH_KEY>"             # CHANGE: same as AZ-A
      dhcp-send-hostname          = "yes"
      dhcp-send-client-id         = "yes"
      dhcp-accept-server-hostname = "yes"
      dhcp-accept-server-domain   = "yes"
    }

    panos_version = "11.1.4-h7"        # CHANGE: same as AZ-A
    ebs_kms_id    = "alias/aws/ebs"    # CHANGE: same as AZ-A

    vpc  = "security_vpc"
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
        create_public_ip  = false
        source_dest_check = true
      }
      public = {
        device_index      = 2
        security_group    = "vmseries_public"
        vpc               = "security_vpc"
        subnet_group      = "public"
        create_public_ip  = true           # Required for overlay routing egress
        source_dest_check = false
      }
    }

    subinterfaces = {
      inbound = {
        app1 = { gwlb_endpoint = "app1_inbound", subinterface = "ethernet1/1.101" }
        app2 = { gwlb_endpoint = "app2_inbound", subinterface = "ethernet1/1.102" }
      }
      outbound = {
        only_1_outbound = { gwlb_endpoint = "security_gwlb_outbound", subinterface = "ethernet1/1.20" }
      }
      eastwest = {
        only_1_eastwest = { gwlb_endpoint = "security_gwlb_eastwest", subinterface = "ethernet1/1.30" }
      }
    }

    system_services = {
      dns_primary = "4.2.2.2"             # CHANGE: your DNS server
      ntp_primary = "pool.ntp.org"        # CHANGE: your NTP server
    }
  }
}

### SPOKE VMS (test workloads — remove or replace for production)
spoke_vms = {
  "app1_vm01" = {
    az = "us-west-2a", vpc = "app1_vpc"                    # CHANGE: AZ
    subnet_group = "app1_vm", security_group = "app1_vm"
  }
  "app1_vm02" = {
    az = "us-west-2b", vpc = "app1_vpc"                    # CHANGE: AZ
    subnet_group = "app1_vm", security_group = "app1_vm"
  }
  "app2_vm01" = {
    az = "us-west-2a", vpc = "app2_vpc"                    # CHANGE: AZ
    subnet_group = "app2_vm", security_group = "app2_vm"
  }
  "app2_vm02" = {
    az = "us-west-2b", vpc = "app2_vpc"                    # CHANGE: AZ
    subnet_group = "app2_vm", security_group = "app2_vm"
  }
}

### SPOKE LOAD BALANCERS (test workloads — remove or replace for production)
spoke_nlbs = {
  "app1-nlb" = {
    name = "app1-nlb", vpc = "app1_vpc", subnet_group = "app1_lb"
    vms = ["app1_vm01", "app1_vm02"]
    balance_rules = {
      "SSH" = { port = "22", protocol = "TCP" }
    }
  }
  "app2-nlb" = {
    name = "app2-nlb", vpc = "app2_vpc", subnet_group = "app2_lb"
    vms = ["app2_vm01", "app2_vm02"]
    balance_rules = {
      "SSH" = { port = "22", protocol = "TCP" }
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
          "1" = { target_protocol = "HTTP", target_port = 80, path_pattern = ["/"] }
        }
      }
    }
    vpc = "app1_vpc", subnet_group = "app1_lb", security_groups = "app1_lb"
  }
  "app2-alb" = {
    vms = ["app2_vm01", "app2_vm02"]
    rules = {
      "app2" = {
        health_check_port = "80"
        listener_rules = {
          "1" = { target_protocol = "HTTP", target_port = 80, path_pattern = ["/"] }
        }
      }
    }
    vpc = "app2_vpc", subnet_group = "app2_lb", security_groups = "app2_lb"
  }
}
