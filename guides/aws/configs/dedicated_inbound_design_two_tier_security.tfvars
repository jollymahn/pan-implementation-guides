# #############################################################################
#
#   DEDICATED INBOUND DESIGN WITH DUAL SECURITY VPCs
#
#   Extends the dedicated inbound design by splitting the single security VPC
#   into two specialized firewall VPCs:
#
#   - security_obew_vpc:    Handles OUTBOUND and EAST-WEST inspection
#   - security_inbound_vpc: Handles INBOUND inspection only
#
#   This separation allows independent scaling, policy isolation, and
#   maintenance windows for inbound vs. outbound/east-west firewall pools.
#   Both security VPCs share a single TGW route table.
#
#   All inbound internet traffic enters through a dedicated inbound VPC
#   containing IGW, GWLB endpoints, and application load balancers. Inbound
#   traffic is inspected by VM-Series in the inbound security VPC before
#   being forwarded to spoke workloads via Transit Gateway.
#
#   Outbound and east-west traffic is inspected by a separate VM-Series pool
#   in the OBEW security VPC.
#
#   Key design decisions:
#
#   - Overlay routing is ENABLED (aws-gwlb-overlay-routing:enable). This can
#     be disabled by removing the flag from plugin-op-commands if your design
#     does not require overlay routing.
#
#   - Advanced routing engine is ENABLED (advance-routing:enable). This can
#     be disabled by removing the flag from plugin-op-commands if static
#     routing is sufficient for your environment.
#
#   - NAT Gateways are deployed in BOTH security VPCs to provide internet
#     egress for firewall management traffic -- required for content updates,
#     AutoFocus, WildFire, and threat intelligence feeds. Firewall mgmt
#     interfaces do not have public IPs; all outbound mgmt traffic flows
#     through the NAT Gateways.
#
#   Traffic flows:
#
#   - INBOUND:  Internet -> Inbound VPC IGW -> GWLB endpoint -> VM-Series
#               (security_inbound_vpc) -> GWLB endpoint -> ALB/NLB
#               (inbound VPC) -> spoke VMs via TGW
#
#   - OUTBOUND: Spoke VMs -> TGW -> security_obew_vpc -> outbound GWLB
#               endpoint -> VM-Series -> NAT GW -> Internet
#
#   - EAST-WEST: Spoke A -> TGW -> security_obew_vpc -> east-west GWLB
#                endpoint -> VM-Series -> TGW -> Spoke B
#
# #############################################################################
#
# Traffic inspection: VM-Series via Gateway Load Balancer (2 pools)
# Bootstrap method:   Strata Cloud Manager (SCM) or Traditional Panorama
# Mgmt egress:        NAT Gateway (no public IP on firewall mgmt interface)
#
# This file is a sanitized, deployment-ready template. All values that must
# be customized are marked with "CHANGE:" comments.
#
# -----------------------------------------------------------------------------
# NETWORK PLACEHOLDERS -- Find-and-replace these before deployment
# -----------------------------------------------------------------------------
#
# The following placeholders represent the first two octets of each VPC's
# network prefix. Replace each with your actual IP plan before deploying.
# Subnet structure (3rd and 4th octets) is preserved -- only change the prefix.
#
#   Placeholder         Example replacement   Scope
#   ─────────────       ───────────────────    ─────────────────────────────────
#   <SEC_OBEW_NET>      10.51                  OBEW Security VPC (/21, /28 subnets)
#   <SEC_INBOUND_NET>   10.52                  Inbound Security VPC (/21, /28 subnets)
#   <INBOUND_NET>       10.50                  Dedicated inbound VPC (/23, /28 subnets)
#   <APP1_NET>          10.104                 App1 spoke VPC (/21, /24 subnets)
#   <APP2_NET>          10.105                 App2 spoke VPC (/21, /24 subnets)
#   <PANORAMA_NET>      10.255                 Panorama VPC route target
#
# Quick replace (sed example):
#   sed -i 's/<SEC_OBEW_NET>/10.51/g; s/<SEC_INBOUND_NET>/10.52/g; s/<INBOUND_NET>/10.50/g; s/<APP1_NET>/10.104/g; s/<APP2_NET>/10.105/g; s/<PANORAMA_NET>/10.255/g' dedicated_inbound_design_dual_security.tfvars
#
# -----------------------------------------------------------------------------
# DEPLOYMENT CHECKLIST -- Update these before running terraform plan
# -----------------------------------------------------------------------------
#
# 1. GENERAL
#    [ ] region              -- Target AWS region
#    [ ] name_prefix         -- Unique prefix for all resource names (avoid collisions)
#    [ ] global_tags         -- Owner, Application, cost-center, environment tags
#    [ ] ssh_key_name        -- EC2 key pair name (must exist in the target region)
#
# 2. NETWORKING -- OBEW Security VPC (outbound + east-west)
#    [ ] security_obew_vpc cidr -- VPC CIDR sized for your deployment (/21 gives 2048 IPs)
#    [ ] subnet CIDRs        -- All /28 subnets must fall within the VPC CIDR
#    [ ] Availability Zones   -- Match AZs to your target region (e.g., us-east-1a/b/c)
#    [ ] NACL cidr_blocks     -- Must match the private (fw data) subnet CIDRs
#    [ ] GWLB subnet CIDRs   -- Referenced in vmseries_private SG for GENEVE + health probes
#    [ ] NAT Gateway AZ names -- Must match the AZs used in natgw subnets
#
# 3. NETWORKING -- Inbound Security VPC
#    [ ] security_inbound_vpc cidr -- VPC CIDR for inbound firewalls (/21 gives 2048 IPs)
#    [ ] subnet CIDRs        -- All /28 subnets must fall within the VPC CIDR
#    [ ] Availability Zones   -- Match AZs to your target region
#    [ ] NACL cidr_blocks     -- Must match the private (fw data) subnet CIDRs
#    [ ] GWLB subnet CIDRs   -- Referenced in vmseries_private SG for GENEVE + health probes
#    [ ] NAT Gateway AZ names -- Must match the AZs used in natgw subnets
#
# 4. NETWORKING -- Dedicated Inbound VPC
#    [ ] inbound_vpc cidr    -- VPC CIDR for inbound traffic (/23 gives 512 IPs)
#    [ ] LB subnet CIDRs     -- Subnets for ALBs/NLBs (internet-facing)
#    [ ] GWLBE subnet CIDRs  -- Subnets for GWLB endpoints
#    [ ] Availability Zones   -- Match AZs to your target region
#
# 5. NETWORKING -- Spoke VPCs
#    [ ] Spoke VPC CIDRs     -- Size per workload needs (/20 = 4096 IPs per spoke)
#    [ ] Spoke subnet CIDRs  -- Must fall within their VPC CIDR
#    [ ] Spoke AZs           -- Must match the target region
#
# 6. SECURITY GROUPS -- Access Control
#    [ ] Admin source IP     -- Replace <ADMIN_SOURCE_IP>/32 with your public IP or CIDR
#    [ ] Panorama mgmt CIDR  -- Replace <PANORAMA_SUBNET>/24 with Panorama's subnet
#    [ ] Inbound LB sources  -- Replace <ADMIN_SOURCE_IP>/32 on LB SGs with allowed ranges
#                               (use 0.0.0.0/0 for public-facing applications)
#
# 7. VM-SERIES -- Bootstrap & Licensing (choose ONE option per VM-Series block)
#
#    Option A -- Traditional Panorama:
#    [ ] panorama-server          -- Panorama IP address (must be reachable from mgmt subnet)
#    [ ] auth-key                 -- Generated via Panorama > Setup > Management > Auth Key
#    [ ] dgname                   -- Panorama device group name
#    [ ] tplname                  -- Panorama template stack name
#    [ ] auto-registration-pin-id -- From Panorama > Setup > Management > Registration PIN
#    [ ] auto-registration-pin-value -- From Panorama > Setup > Management > Registration PIN
#    [ ] authcodes                -- VM-Series license auth code
#
#    Option B -- Strata Cloud Manager (SCM), PAN-OS 11.0+:
#    [ ] panorama-server          -- Set to "cloud"
#    [ ] dgname                   -- SCM folder name
#    [ ] auto-registration-pin-id -- From SCM tenant settings
#    [ ] auto-registration-pin-value -- From SCM tenant settings
#    [ ] authcodes                -- VM-Series license auth code
#
#    Common:
#    [ ] panos_version            -- Desired PAN-OS version (check AWS Marketplace AMI)
#    [ ] ebs_kms_id               -- KMS key alias or ARN for EBS encryption
#
# 8. VM-SERIES -- System Services
#    [ ] dns_primary         -- Internal or external DNS server
#    [ ] ntp_primary         -- NTP server
#
# 9. PANORAMA CONNECTIVITY (optional)
#    [ ] panorama_attachment -- Uncomment and set TGW attachment ID + Panorama VPC CIDR
#                              if Panorama is in a separate VPC connected via TGW
#
# =============================================================================

### GENERAL
region      = "us-west-2"              # CHANGE: target AWS region
name_prefix = "prod-dual-sec-inbound-" # CHANGE: unique resource name prefix

global_tags = {
  ManagedBy   = "terraform"
  Application = "vm-series-dual-security-dedicated-inbound"  # CHANGE: application name
  Owner       = "network-team"                               # CHANGE: team or owner
}

ssh_key_name = "my-ssh-key"  # CHANGE: existing EC2 key pair name in this region

### VPC
vpcs = {

  # ===========================================================================
  # OBEW SECURITY VPC -- Outbound and east-west inspection
  # ===========================================================================
  security_obew_vpc = {
    name = "security-obew-vpc"
    cidr = "<SEC_OBEW_NET>.0.0/21"  # CHANGE: OBEW security VPC CIDR
    nacls = {
      trusted_path_monitoring = {
        name = "trusted-path-monitoring"
        rules = {
          block_outbound_icmp_1 = {
            rule_number = 110
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "<SEC_OBEW_NET>.0.64/28"  # CHANGE: must match private subnet AZ-a
          }
          block_outbound_icmp_2 = {
            rule_number = 120
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "<SEC_OBEW_NET>.1.64/28"  # CHANGE: must match private subnet AZ-b
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
              "<SEC_OBEW_NET>.0.48/28", "<SEC_OBEW_NET>.1.48/28", "<SEC_OBEW_NET>.2.48/28"  # CHANGE: must match gwlb subnet CIDRs
            ]
          }
          health_probe = {
            description = "Permit Port 80 Health Probe to GWLB subnets"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = [
              "<SEC_OBEW_NET>.0.48/28", "<SEC_OBEW_NET>.1.48/28", "<SEC_OBEW_NET>.2.48/28"  # CHANGE: must match gwlb subnet CIDRs
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
            description = "Permit Panorama-to-FW management channel (config, log fwd, sw upgrade)"
            type        = "ingress", from_port = "3978", to_port = "3978", protocol = "tcp"
            cidr_blocks = ["<PANORAMA_SUBNET>/24"]  # CHANGE: Panorama subnet CIDR
          }
          panorama_device_cert = {
            description = "Permit Panorama device certificate / context-switch channel (PAN-OS 10+)"
            type        = "ingress", from_port = "28443", to_port = "28443", protocol = "tcp"
            cidr_blocks = ["<PANORAMA_SUBNET>/24"]  # CHANGE: Panorama subnet CIDR
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
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
        }
      }
    }
    subnets = {
      # OBEW Security VPC uses /28 subnets within a /21 CIDR.
      # 2 AZs for most groups; GWLB spans 3 AZs for cross-zone availability.
      # CHANGE: all CIDRs and AZs to match your region and IP plan.

      # TGW Attach
      "<SEC_OBEW_NET>.0.0/28" = { az = "us-west-2a", subnet_group = "tgw_attach" }
      "<SEC_OBEW_NET>.1.0/28" = { az = "us-west-2b", subnet_group = "tgw_attach" }

      # GWLBE Outbound
      "<SEC_OBEW_NET>.0.16/28" = { az = "us-west-2a", subnet_group = "gwlbe_outbound" }
      "<SEC_OBEW_NET>.1.16/28" = { az = "us-west-2b", subnet_group = "gwlbe_outbound" }

      # GWLBE East-West
      "<SEC_OBEW_NET>.0.32/28" = { az = "us-west-2a", subnet_group = "gwlbe_eastwest" }
      "<SEC_OBEW_NET>.1.32/28" = { az = "us-west-2b", subnet_group = "gwlbe_eastwest" }

      # GWLB (3 AZs)
      "<SEC_OBEW_NET>.0.48/28" = { az = "us-west-2a", subnet_group = "gwlb" }
      "<SEC_OBEW_NET>.1.48/28" = { az = "us-west-2b", subnet_group = "gwlb" }
      "<SEC_OBEW_NET>.2.48/28" = { az = "us-west-2c", subnet_group = "gwlb" }

      # Firewall Private (data plane)
      "<SEC_OBEW_NET>.0.64/28" = { az = "us-west-2a", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "<SEC_OBEW_NET>.1.64/28" = { az = "us-west-2b", subnet_group = "private", nacl = "trusted_path_monitoring" }

      # Firewall Mgmt
      "<SEC_OBEW_NET>.0.80/28" = { az = "us-west-2a", subnet_group = "mgmt" }
      "<SEC_OBEW_NET>.1.80/28" = { az = "us-west-2b", subnet_group = "mgmt" }

      # Firewall Public
      "<SEC_OBEW_NET>.0.96/28" = { az = "us-west-2a", subnet_group = "public" }
      "<SEC_OBEW_NET>.1.96/28" = { az = "us-west-2b", subnet_group = "public" }

      # NAT Gateway
      "<SEC_OBEW_NET>.0.112/28" = { az = "us-west-2a", subnet_group = "natgw" }
      "<SEC_OBEW_NET>.1.112/28" = { az = "us-west-2b", subnet_group = "natgw" }
    }
    routes = {
      mgmt_default = {
        vpc           = "security_obew_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_obew_natgw"
        next_hop_type = "nat_gateway"
      }
      mgmt_panorama = {
        vpc           = "security_obew_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "<PANORAMA_NET>.0.0/16"  # CHANGE: Panorama VPC CIDR if different
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
      gwlbe_outbound_rfc1918 = {
        vpc           = "security_obew_vpc"
        subnet_group  = "gwlbe_outbound"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_obew"
        next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_outbound_default = {
        vpc           = "security_obew_vpc"
        subnet_group  = "gwlbe_outbound"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_obew_natgw"
        next_hop_type = "nat_gateway"
      }
      gwlbe_eastwest_rfc1918 = {
        vpc           = "security_obew_vpc"
        subnet_group  = "gwlbe_eastwest"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_obew"
        next_hop_type = "transit_gateway_attachment"
      }
      natgw_default = {
        vpc           = "security_obew_vpc"
        subnet_group  = "natgw"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_obew_vpc"
        next_hop_type = "internet_gateway"
      }
      natgw_rfc1918 = {
        vpc           = "security_obew_vpc"
        subnet_group  = "natgw"
        to_cidr       = "10.0.0.0/8"
        next_hop_key  = "security_gwlb_outbound"
        next_hop_type = "gwlbe_endpoint"
      }
    }
  }

  # ===========================================================================
  # INBOUND SECURITY VPC -- Inbound-only inspection
  # ===========================================================================
  security_inbound_vpc = {
    name = "security-inbound-vpc"
    cidr = "<SEC_INBOUND_NET>.0.0/21"  # CHANGE: inbound security VPC CIDR
    nacls = {
      trusted_path_monitoring = {
        name = "trusted-path-monitoring"
        rules = {
          block_outbound_icmp_1 = {
            rule_number = 110
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "<SEC_INBOUND_NET>.0.64/28"  # CHANGE: must match private subnet AZ-a
          }
          block_outbound_icmp_2 = {
            rule_number = 120
            egress      = true
            protocol    = "icmp"
            rule_action = "deny"
            cidr_block  = "<SEC_INBOUND_NET>.1.64/28"  # CHANGE: must match private subnet AZ-b
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
              "<SEC_INBOUND_NET>.0.48/28", "<SEC_INBOUND_NET>.1.48/28", "<SEC_INBOUND_NET>.2.48/28"  # CHANGE: must match gwlb subnet CIDRs
            ]
          }
          health_probe = {
            description = "Permit Port 80 Health Probe to GWLB subnets"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = [
              "<SEC_INBOUND_NET>.0.48/28", "<SEC_INBOUND_NET>.1.48/28", "<SEC_INBOUND_NET>.2.48/28"  # CHANGE: must match gwlb subnet CIDRs
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
            description = "Permit Panorama-to-FW management channel (config, log fwd, sw upgrade)"
            type        = "ingress", from_port = "3978", to_port = "3978", protocol = "tcp"
            cidr_blocks = ["<PANORAMA_SUBNET>/24"]  # CHANGE: Panorama subnet CIDR
          }
          panorama_device_cert = {
            description = "Permit Panorama device certificate / context-switch channel (PAN-OS 10+)"
            type        = "ingress", from_port = "28443", to_port = "28443", protocol = "tcp"
            cidr_blocks = ["<PANORAMA_SUBNET>/24"]  # CHANGE: Panorama subnet CIDR
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
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
        }
      }
    }
    subnets = {
      # Inbound Security VPC uses /28 subnets within a /21 CIDR.
      # No gwlbe_outbound or gwlbe_eastwest subnets -- those belong in the OBEW VPC.
      # 2 AZs for most groups; GWLB spans 3 AZs for cross-zone availability.
      # CHANGE: all CIDRs and AZs to match your region and IP plan.

      # TGW Attach
      "<SEC_INBOUND_NET>.0.0/28" = { az = "us-west-2a", subnet_group = "tgw_attach" }
      "<SEC_INBOUND_NET>.1.0/28" = { az = "us-west-2b", subnet_group = "tgw_attach" }

      # GWLB (3 AZs)
      "<SEC_INBOUND_NET>.0.48/28" = { az = "us-west-2a", subnet_group = "gwlb" }
      "<SEC_INBOUND_NET>.1.48/28" = { az = "us-west-2b", subnet_group = "gwlb" }
      "<SEC_INBOUND_NET>.2.48/28" = { az = "us-west-2c", subnet_group = "gwlb" }

      # Firewall Private (data plane)
      "<SEC_INBOUND_NET>.0.64/28" = { az = "us-west-2a", subnet_group = "private", nacl = "trusted_path_monitoring" }
      "<SEC_INBOUND_NET>.1.64/28" = { az = "us-west-2b", subnet_group = "private", nacl = "trusted_path_monitoring" }

      # Firewall Mgmt
      "<SEC_INBOUND_NET>.0.80/28" = { az = "us-west-2a", subnet_group = "mgmt" }
      "<SEC_INBOUND_NET>.1.80/28" = { az = "us-west-2b", subnet_group = "mgmt" }

      # Firewall Public
      "<SEC_INBOUND_NET>.0.96/28" = { az = "us-west-2a", subnet_group = "public" }
      "<SEC_INBOUND_NET>.1.96/28" = { az = "us-west-2b", subnet_group = "public" }

      # NAT Gateway
      "<SEC_INBOUND_NET>.0.112/28" = { az = "us-west-2a", subnet_group = "natgw" }
      "<SEC_INBOUND_NET>.1.112/28" = { az = "us-west-2b", subnet_group = "natgw" }
    }
    routes = {
      mgmt_default = {
        vpc           = "security_inbound_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "security_inbound_natgw"
        next_hop_type = "nat_gateway"
      }
      mgmt_panorama = {
        vpc           = "security_inbound_vpc"
        subnet_group  = "mgmt"
        to_cidr       = "<PANORAMA_NET>.0.0/16"  # CHANGE: Panorama VPC CIDR if different
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
        subnet_group  = "natgw"
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
  # DEDICATED INBOUND VPC -- Internet entry point for all inbound traffic
  # ===========================================================================
  inbound_vpc = {
    name = "inbound-vpc"
    cidr = "<INBOUND_NET>.0.0/23"  # CHANGE: inbound VPC CIDR
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
            cidr_blocks = ["0.0.0.0/0"]  # CHANGE: restrict if not public-facing
          }
          http = {
            description = "Permit HTTP from internet"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["0.0.0.0/0"]  # CHANGE: restrict if not public-facing
          }
        }
      }
    }
    subnets = {
      # Inbound VPC uses /28 subnets within a /23 CIDR.
      # CHANGE: all CIDRs and AZs to match your region and IP plan.

      # Load Balancer subnets (internet-facing ALBs/NLBs)
      "<INBOUND_NET>.0.0/28" = { az = "us-west-2a", subnet_group = "inbound_lb" }
      "<INBOUND_NET>.1.0/28" = { az = "us-west-2b", subnet_group = "inbound_lb" }

      # GWLB Endpoint subnets
      "<INBOUND_NET>.0.16/28" = { az = "us-west-2a", subnet_group = "inbound_gwlbe" }
      "<INBOUND_NET>.1.16/28" = { az = "us-west-2b", subnet_group = "inbound_gwlbe" }

      # TGW Attach subnets
      "<INBOUND_NET>.0.32/28" = { az = "us-west-2a", subnet_group = "tgw_attach" }
      "<INBOUND_NET>.1.32/28" = { az = "us-west-2b", subnet_group = "tgw_attach" }
    }
    routes = {
      # LB subnets: default to GWLB endpoint (inbound inspection path)
      lb_default = {
        vpc           = "inbound_vpc"
        subnet_group  = "inbound_lb"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app1_inbound"
        next_hop_type = "gwlbe_endpoint"
      }
      # LB subnets: spoke traffic via TGW (for ALB health checks and responses to spoke VMs)
      lb_to_app1 = {
        vpc           = "inbound_vpc"
        subnet_group  = "inbound_lb"
        to_cidr       = "<APP1_NET>.0.0/21"
        next_hop_key  = "inbound"
        next_hop_type = "transit_gateway_attachment"
      }
      lb_to_app2 = {
        vpc           = "inbound_vpc"
        subnet_group  = "inbound_lb"
        to_cidr       = "<APP2_NET>.0.0/21"
        next_hop_key  = "inbound"
        next_hop_type = "transit_gateway_attachment"
      }
      # GWLBE subnets: return to IGW (response path back to internet)
      gwlbe_default = {
        vpc           = "inbound_vpc"
        subnet_group  = "inbound_gwlbe"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "inbound_vpc"
        next_hop_type = "internet_gateway"
      }
      # GWLBE subnets: spoke traffic via TGW
      gwlbe_to_app1 = {
        vpc           = "inbound_vpc"
        subnet_group  = "inbound_gwlbe"
        to_cidr       = "<APP1_NET>.0.0/21"
        next_hop_key  = "inbound"
        next_hop_type = "transit_gateway_attachment"
      }
      gwlbe_to_app2 = {
        vpc           = "inbound_vpc"
        subnet_group  = "inbound_gwlbe"
        to_cidr       = "<APP2_NET>.0.0/21"
        next_hop_key  = "inbound"
        next_hop_type = "transit_gateway_attachment"
      }
      # TGW attach subnets: default to IGW
      tgw_default = {
        vpc           = "inbound_vpc"
        subnet_group  = "tgw_attach"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "inbound_vpc"
        next_hop_type = "internet_gateway"
      }
    }
  }

  # ===========================================================================
  # APP1 SPOKE VPC -- Application workloads only (no IGW, no GWLB endpoints)
  # Endpoint subnets preserved for future use.
  # ===========================================================================
  app1_vpc = {
    name  = "app1-spoke-vpc"
    cidr  = "<APP1_NET>.0.0/21"  # CHANGE: spoke 1 VPC CIDR
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
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<INBOUND_NET>.0.0/23", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: includes inbound VPC for ALB health checks
          }
        }
      }
    }
    subnets = {
      # CHANGE: CIDRs and AZs to match your region and IP plan
      "<APP1_NET>.0.0/24" = { az = "us-west-2a", subnet_group = "app1_vm" }
      "<APP1_NET>.1.0/24" = { az = "us-west-2b", subnet_group = "app1_vm" }
      # Endpoint subnets preserved for future use (not currently active)
      "<APP1_NET>.4.0/24" = { az = "us-west-2a", subnet_group = "app1_gwlbe" }
      "<APP1_NET>.5.0/24" = { az = "us-west-2b", subnet_group = "app1_gwlbe" }
    }
    routes = {
      # All traffic exits via TGW (outbound, east-west, and return to inbound VPC)
      vm_default = {
        vpc           = "app1_vpc"
        subnet_group  = "app1_vm"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app1"
        next_hop_type = "transit_gateway_attachment"
      }
    }
  }

  # ===========================================================================
  # APP2 SPOKE VPC -- Application workloads only (no IGW, no GWLB endpoints)
  # Endpoint subnets preserved for future use.
  # ===========================================================================
  app2_vpc = {
    name  = "app2-spoke-vpc"
    cidr  = "<APP2_NET>.0.0/21"  # CHANGE: spoke 2 VPC CIDR
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
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
          https = {
            description = "Permit HTTPS"
            type        = "ingress", from_port = "443", to_port = "443", protocol = "tcp"
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: admin IP + spoke CIDRs
          }
          http = {
            description = "Permit HTTP"
            type        = "ingress", from_port = "80", to_port = "80", protocol = "tcp"
            cidr_blocks = ["<ADMIN_SOURCE_IP>/32", "<INBOUND_NET>.0.0/23", "<APP1_NET>.0.0/21", "<APP2_NET>.0.0/21"]  # CHANGE: includes inbound VPC for ALB health checks
          }
        }
      }
    }
    subnets = {
      # CHANGE: CIDRs and AZs to match your region and IP plan
      "<APP2_NET>.0.0/24" = { az = "us-west-2a", subnet_group = "app2_vm" }
      "<APP2_NET>.1.0/24" = { az = "us-west-2b", subnet_group = "app2_vm" }
      # Endpoint subnets preserved for future use (not currently active)
      "<APP2_NET>.4.0/24" = { az = "us-west-2a", subnet_group = "app2_gwlbe" }
      "<APP2_NET>.5.0/24" = { az = "us-west-2b", subnet_group = "app2_gwlbe" }
    }
    routes = {
      # All traffic exits via TGW (outbound, east-west, and return to inbound VPC)
      vm_default = {
        vpc           = "app2_vpc"
        subnet_group  = "app2_vm"
        to_cidr       = "0.0.0.0/0"
        next_hop_key  = "app2"
        next_hop_type = "transit_gateway_attachment"
      }
    }
  }
}

### NAT GATEWAYS
natgws = {
  security_obew_natgw = {
    vpc          = "security_obew_vpc"
    subnet_group = "natgw"
    nat_gateway_names = {
      "us-west-2a" = "obew-natgw-2a"  # CHANGE: AZs to match your region
      "us-west-2b" = "obew-natgw-2b"  # CHANGE: AZs to match your region
    }
  }
  security_inbound_natgw = {
    vpc          = "security_inbound_vpc"
    subnet_group = "natgw"
    nat_gateway_names = {
      "us-west-2a" = "inbound-natgw-2a"  # CHANGE: AZs to match your region
      "us-west-2b" = "inbound-natgw-2b"  # CHANGE: AZs to match your region
    }
  }
}

## TRANSIT GATEWAY
tgws = {
  tgw = {
    name = "tgw"
    asn  = "64512"  # CHANGE: if you need a specific ASN for BGP peering
    route_tables = {
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
  security_obew = {
    tgw_key                 = "tgw"
    security_vpc_attachment  = true
    name                    = "vmseries-obew"
    vpc                     = "security_obew_vpc"
    subnet_group            = "tgw_attach"
    route_table             = "from_security_vpc"
    propagate_routes_to     = ["from_spoke_vpc", "from_inbound_vpc"]
  }
  security_inbound = {
    tgw_key             = "tgw"
    name                = "vmseries-inbound"
    vpc                 = "security_inbound_vpc"
    subnet_group        = "tgw_attach"
    route_table         = "from_security_vpc"
    propagate_routes_to = ["from_spoke_vpc", "from_inbound_vpc"]
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
  # Outbound and east-west endpoints in OBEW security VPC
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
  # Inbound endpoints in DEDICATED INBOUND VPC (backed by inbound security VPC GWLB)
  app1_inbound = {
    name                     = "app1-inbound-gwlb-endpoint"
    gwlb                     = "security_inbound_gwlb"
    vpc                      = "inbound_vpc"
    subnet_group             = "inbound_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "inbound_vpc"
    from_igw_to_subnet_group = "inbound_lb"
  }
  app2_inbound = {
    name                     = "app2-inbound-gwlb-endpoint"
    gwlb                     = "security_inbound_gwlb"
    vpc                      = "inbound_vpc"
    subnet_group             = "inbound_gwlbe"
    act_as_next_hop          = true
    from_igw_to_vpc          = "inbound_vpc"
    from_igw_to_subnet_group = "inbound_lb"
  }
}

### VM-SERIES
vmseries = {

  # ===========================================================================
  # OBEW VM-Series -- Outbound and east-west traffic inspection
  # ===========================================================================
  vmseries_obew = {
    instances = {
      "01" = { az = "us-west-2a" }  # CHANGE: AZs to match your region
      "02" = { az = "us-west-2b" }  # CHANGE: AZs to match your region
    }

    # -------------------------------------------------------------------------
    # BOOTSTRAP OPTIONS -- Choose ONE of the two blocks below.
    # Uncomment the block that matches your management platform and delete
    # or leave the other commented out.
    # -------------------------------------------------------------------------

    # OPTION A: Traditional Panorama bootstrap
    # Use when firewalls are managed by an on-prem or cloud-hosted Panorama appliance.
    # Requires: Panorama IP reachable from the mgmt interface, a pre-generated auth-key,
    # and a device group + template stack configured on Panorama.
    /*
    bootstrap_options = {
      mgmt-interface-swap                   = "enable"
      plugin-op-commands                    = "panorama-licensing-mode-on,aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      panorama-server                       = "<PANORAMA_IP>"          # CHANGE: Panorama IP address
      auth-key                              = "<PANORAMA_AUTH_KEY>"     # CHANGE: generated via Panorama > Setup > Management > Auth Key
      dgname                                = "<DEVICE_GROUP>"         # CHANGE: Panorama device group name
      tplname                               = "<TEMPLATE_STACK>"       # CHANGE: Panorama template stack name
      dhcp-send-hostname                    = "yes"
      dhcp-send-client-id                   = "yes"
      dhcp-accept-server-hostname           = "yes"
      dhcp-accept-server-domain             = "yes"
      vm-series-auto-registration-pin-id    = "<PIN_ID>"               # CHANGE: from Panorama > Setup > Management > Registration PIN
      vm-series-auto-registration-pin-value = "<PIN_VALUE>"            # CHANGE: from Panorama > Setup > Management > Registration PIN
      authcodes                             = "<AUTH_CODE>"            # CHANGE: VM-Series license auth code
    }
    */

    # OPTION B: Strata Cloud Manager (SCM) bootstrap -- PAN-OS 11.0+
    # Use when firewalls are managed via SCM (cloud-managed Panorama).
    # Requires: SCM tenant with auto-registration PIN and a valid auth code.
    bootstrap_options = {
      mgmt-interface-swap                   = "enable"
      plugin-op-commands                    = "aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      panorama-server                       = "cloud"                     # CHANGE: "cloud" for SCM, or Panorama IP
      dgname                                = "<SCM_FOLDER_NAME>"        # CHANGE: SCM folder name
      dhcp-send-hostname                    = "yes"
      dhcp-send-client-id                   = "yes"
      dhcp-accept-server-hostname           = "yes"
      dhcp-accept-server-domain             = "yes"
      vm-series-auto-registration-pin-id    = "<PIN_ID>"                 # CHANGE: from SCM tenant settings
      vm-series-auto-registration-pin-value = "<PIN_VALUE>"              # CHANGE: from SCM tenant settings
      authcodes                             = "<AUTH_CODE>"              # CHANGE: VM-Series license auth code
    }

    panos_version = "11.1.4-h7"     # CHANGE: desired PAN-OS version
    ebs_kms_id    = "alias/aws/ebs" # CHANGE: KMS key alias or ARN

    vpc  = "security_obew_vpc"
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
        create_public_ip  = false
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

    subinterfaces = {
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
      dns_primary = "4.2.2.2"      # CHANGE: your DNS server
      ntp_primary = "pool.ntp.org" # CHANGE: your NTP server
    }
  }

  # ===========================================================================
  # INBOUND VM-Series -- Inbound traffic inspection only
  # ===========================================================================
  vmseries_inbound = {
    instances = {
      "01" = { az = "us-west-2a" }  # CHANGE: AZs to match your region
      "02" = { az = "us-west-2b" }  # CHANGE: AZs to match your region
    }

    # -------------------------------------------------------------------------
    # BOOTSTRAP OPTIONS -- Choose ONE of the two blocks below.
    # Uncomment the block that matches your management platform and delete
    # or leave the other commented out.
    # -------------------------------------------------------------------------

    # OPTION A: Traditional Panorama bootstrap
    # Use when firewalls are managed by an on-prem or cloud-hosted Panorama appliance.
    # Requires: Panorama IP reachable from the mgmt interface, a pre-generated auth-key,
    # and a device group + template stack configured on Panorama.
    /*
    bootstrap_options = {
      mgmt-interface-swap                   = "enable"
      plugin-op-commands                    = "panorama-licensing-mode-on,aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      panorama-server                       = "<PANORAMA_IP>"          # CHANGE: Panorama IP address
      auth-key                              = "<PANORAMA_AUTH_KEY>"     # CHANGE: generated via Panorama > Setup > Management > Auth Key
      dgname                                = "<DEVICE_GROUP>"         # CHANGE: Panorama device group name
      tplname                               = "<TEMPLATE_STACK>"       # CHANGE: Panorama template stack name
      dhcp-send-hostname                    = "yes"
      dhcp-send-client-id                   = "yes"
      dhcp-accept-server-hostname           = "yes"
      dhcp-accept-server-domain             = "yes"
      vm-series-auto-registration-pin-id    = "<PIN_ID>"               # CHANGE: from Panorama > Setup > Management > Registration PIN
      vm-series-auto-registration-pin-value = "<PIN_VALUE>"            # CHANGE: from Panorama > Setup > Management > Registration PIN
      authcodes                             = "<AUTH_CODE>"            # CHANGE: VM-Series license auth code
    }
    */

    # OPTION B: Strata Cloud Manager (SCM) bootstrap -- PAN-OS 11.0+
    # Use when firewalls are managed via SCM (cloud-managed Panorama).
    # Requires: SCM tenant with auto-registration PIN and a valid auth code.
    bootstrap_options = {
      mgmt-interface-swap                   = "enable"
      plugin-op-commands                    = "aws-gwlb-inspect:enable,aws-gwlb-overlay-routing:enable,advance-routing:enable"
      panorama-server                       = "cloud"                     # CHANGE: "cloud" for SCM, or Panorama IP
      dgname                                = "<SCM_FOLDER_NAME>"        # CHANGE: SCM folder name
      dhcp-send-hostname                    = "yes"
      dhcp-send-client-id                   = "yes"
      dhcp-accept-server-hostname           = "yes"
      dhcp-accept-server-domain             = "yes"
      vm-series-auto-registration-pin-id    = "<PIN_ID>"                 # CHANGE: from SCM tenant settings
      vm-series-auto-registration-pin-value = "<PIN_VALUE>"              # CHANGE: from SCM tenant settings
      authcodes                             = "<AUTH_CODE>"              # CHANGE: VM-Series license auth code
    }

    panos_version = "11.1.4-h7"     # CHANGE: desired PAN-OS version
    ebs_kms_id    = "alias/aws/ebs" # CHANGE: KMS key alias or ARN

    vpc  = "security_inbound_vpc"
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
        create_public_ip  = false
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
    }

    system_services = {
      dns_primary = "4.2.2.2"      # CHANGE: your DNS server
      ntp_primary = "pool.ntp.org" # CHANGE: your NTP server
    }
  }
}

### SPOKE VMS
spoke_vms = {
  "app1_vm01" = {
    az             = "us-west-2a"  # CHANGE: AZ
    vpc            = "app1_vpc"
    subnet_group   = "app1_vm"
    security_group = "app1_vm"
  }
  "app1_vm02" = {
    az             = "us-west-2b"  # CHANGE: AZ
    vpc            = "app1_vpc"
    subnet_group   = "app1_vm"
    security_group = "app1_vm"
  }
  "app2_vm01" = {
    az             = "us-west-2a"  # CHANGE: AZ
    vpc            = "app2_vpc"
    subnet_group   = "app2_vm"
    security_group = "app2_vm"
  }
  "app2_vm02" = {
    az             = "us-west-2b"  # CHANGE: AZ
    vpc            = "app2_vpc"
    subnet_group   = "app2_vm"
    security_group = "app2_vm"
  }
}

### INBOUND LOAD BALANCERS
# NOTE: ALBs/NLBs are in the dedicated inbound VPC. They target spoke VMs
# via TGW using IP-based target groups (cross-VPC). The main.tf may need
# modifications to support cross-VPC IP targets instead of instance-ID targets.
spoke_nlbs = {
  "app1-nlb" = {
    name         = "app1-nlb"
    vpc          = "inbound_vpc"
    subnet_group = "inbound_lb"
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
    vpc          = "inbound_vpc"
    subnet_group = "inbound_lb"
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
    vpc             = "inbound_vpc"
    subnet_group    = "inbound_lb"
    security_groups = "inbound_lb"
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
    vpc             = "inbound_vpc"
    subnet_group    = "inbound_lb"
    security_groups = "inbound_lb"
  }
}

### PANORAMA
# Uncomment if Panorama is in a separate VPC connected via TGW.
# This adds a static route on the TGW for Panorama reachability from both security VPCs.
/*
panorama_attachment = {
  tgw_key                      = "tgw"
  transit_gateway_attachment_id = "<PANORAMA_TGW_ATTACH_ID>"  # CHANGE: TGW attachment ID for Panorama VPC
  vpc_cidr                     = "<PANORAMA_VPC_CIDR>"        # CHANGE: Panorama VPC CIDR (e.g., "10.255.0.0/24")
}
*/
