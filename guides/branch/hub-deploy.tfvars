# ════════════════════════════════════════════════════════════════════════════
#  VM-Series A/P HA Hub — Customer Configuration
#  Branch NGFW ZTP to HA and SD-WAN AutoVPN — Phase 1B
#
#  INSTRUCTIONS
#  1. Search and replace every UPPERCASE_PLACEHOLDER with your values.
#  2. Run: terraform init && terraform plan -var-file=hub-deploy.tfvars
#  3. Review the plan, then: terraform apply -var-file=hub-deploy.tfvars
#
#  Placeholders in this file:
#    CUSTOMER_ADMIN_IP       — your public IP for management access (e.g. 203.0.113.5/32)
#    CUSTOMER_REGION         — Azure region (e.g. East US 2, West Europe, Australia East)
#    CUSTOMER_RG_NAME        — Azure resource group name (e.g. vmseries-hub-prod)
#    CUSTOMER_PREFIX         — resource name prefix (e.g. acme-, viasat-)
#    CUSTOMER_FW1_HOSTNAME   — hostname for hub firewall 1 (e.g. hub-fw1)
#    CUSTOMER_FW2_HOSTNAME   — hostname for hub firewall 2 (e.g. hub-fw2)
#    CUSTOMER_SCM_LABEL      — SCM device label / tplname (e.g. hub-azure)
#    CUSTOMER_SCM_FOLDER     — SCM folder name / dgname (e.g. hub-azure)
#    CUSTOMER_PIN_ID         — VM-Series auto-registration PIN ID (from CSP > Device Certificates)
#    CUSTOMER_PIN_VALUE      — VM-Series auto-registration PIN value (from CSP > Device Certificates)
#    CUSTOMER_AUTHCODE       — License auth code (BYOL; leave empty string for PAYG)
# ════════════════════════════════════════════════════════════════════════════

# ── General ──────────────────────────────────────────────────────────────────

subscription_id     = null                  # Use ARM_SUBSCRIPTION_ID environment variable instead

region              = "CUSTOMER_REGION"     # Azure region for all resources
resource_group_name = "CUSTOMER_RG_NAME"    # Resource group (will be created)
name_prefix         = "CUSTOMER_PREFIX"     # Prepended to every Azure resource name

tags = {
  "createdBy"   = "Palo Alto Networks"
  "createdWith" = "Terraform"
  "role"        = "sdwan-hub"
}

# ── Network ───────────────────────────────────────────────────────────────────
#
# VNet: 10.0.0.0/23 with 4 subnets:
#   mgmt-snet    10.0.0.0/28  — OOB management (one public IP per VM)
#   untrust-snet 10.0.1.0/28  — WAN / SD-WAN; floating IP 10.0.1.6 + sdwan-hub-pip
#   trust-snet   10.0.1.16/28 — LAN / spoke-facing; floating IP 10.0.1.22 (LAN gateway)
#   ha-snet      10.0.1.32/28 — HA1 control link (eth1/3)

vnets = {
  "transit" = {
    name          = "transit"
    address_space = ["10.0.0.0/23"]

    network_security_groups = {
      "management" = {
        name = "mgmt-nsg"
        rules = {
          mgmt_inbound = {
            name                       = "allow-mgmt-inbound"
            priority                   = 100
            direction                  = "Inbound"
            access                     = "Allow"
            protocol                   = "Tcp"
            source_address_prefixes    = ["CUSTOMER_ADMIN_IP"]   # Your admin public IP(s)
            source_port_range          = "*"
            destination_address_prefix = "10.0.0.0/28"
            destination_port_ranges    = ["22", "443"]
          }
          pan_services_outbound = {
            name                       = "allow-pan-services-outbound"
            priority                   = 100
            direction                  = "Outbound"
            access                     = "Allow"
            protocol                   = "Tcp"
            source_address_prefix      = "10.0.0.0/28"
            source_port_range          = "*"
            destination_address_prefix = "Internet"
            destination_port_ranges    = ["443", "444", "3978"]
          }
        }
      }
      "untrust" = {
        name = "untrust-nsg"
        rules = {
          ike_inbound = {
            name                       = "allow-sdwan-ipsec-inbound"
            priority                   = 100
            direction                  = "Inbound"
            access                     = "Allow"
            protocol                   = "Udp"
            source_address_prefix      = "*"
            source_port_range          = "*"
            destination_address_prefix = "*"
            destination_port_ranges    = ["500", "4500"]
          }
          deny_all_other_inbound = {
            name                       = "deny-all-other-inbound"
            priority                   = 4096
            direction                  = "Inbound"
            access                     = "Deny"
            protocol                   = "*"
            source_address_prefix      = "*"
            source_port_range          = "*"
            destination_address_prefix = "*"
            destination_port_range     = "*"
          }
        }
      }
      "ha" = {
        name = "ha-nsg"
        rules = {
          ha_internal = {
            name                       = "allow-ha-internal"
            priority                   = 100
            direction                  = "Inbound"
            access                     = "Allow"
            protocol                   = "*"
            source_address_prefix      = "10.0.1.32/28"
            source_port_range          = "*"
            destination_address_prefix = "10.0.1.32/28"
            destination_port_range     = "*"
          }
        }
      }
    }

    route_tables = {
      "trust" = {
        name                          = "trust-rt"
        bgp_route_propagation_enabled = false
        routes = {
          default_via_fw = {
            name                = "default-via-active-fw"
            address_prefix      = "0.0.0.0/0"
            next_hop_type       = "VirtualAppliance"
            next_hop_ip_address = "10.0.1.22"   # floating trust IP — always on the active VM
          }
        }
      }
    }

    subnets = {
      "management" = { name = "mgmt-snet";    address_prefixes = ["10.0.0.0/28"];   network_security_group_key = "management" }
      "untrust"    = { name = "untrust-snet"; address_prefixes = ["10.0.1.0/28"];   network_security_group_key = "untrust" }
      "trust"      = { name = "trust-snet";   address_prefixes = ["10.0.1.16/28"];  route_table_key            = "trust" }
      "ha"         = { name = "ha-snet";      address_prefixes = ["10.0.1.32/28"];  network_security_group_key = "ha" }
    }
  }
}

vnet_peerings = {}

# ── VM-Series ─────────────────────────────────────────────────────────────────

availability_sets = {
  "ha-avset" = {
    name                = "vmseries-ha-avset"
    update_domain_count = 2
    fault_domain_count  = 2
  }
}

vmseries_universal = {
  version = "11.2.3"
  size    = "Standard_DS3_v2"
}

vmseries = {

  # ── Hub Firewall 1 (Active / Preferred) ──────────────────────────────────
  "fw-1" = {
    name     = "vmseries-fw-1"
    vnet_key = "transit"

    virtual_machine = {
      zone          = null
      avset_key     = "ha-avset"
      identity_type = "SystemAssigned"

      bootstrap_options = {
        type               = "dhcp-client"
        plugin-op-commands = "advance-routing:enable"
        hostname           = "CUSTOMER_FW1_HOSTNAME"

        # ── SCM (Strata Cloud Manager) ──────────────────────────────────────
        panorama-server                       = "cloud"                  # Required — do not change
        tplname                               = "CUSTOMER_SCM_LABEL"     # SCM label name
        dgname                                = "CUSTOMER_SCM_FOLDER"    # SCM folder name
        vm-series-auto-registration-pin-id    = "CUSTOMER_PIN_ID"        # CSP > Device Certificates > Generate PIN
        vm-series-auto-registration-pin-value = "CUSTOMER_PIN_VALUE"     # CSP > Device Certificates > Generate PIN
        authcodes                             = "CUSTOMER_AUTHCODE"      # BYOL auth code (leave "" for PAYG)
      }
    }

    interfaces = [
      {
        name       = "fw-1-mgmt"
        subnet_key = "management"
        ip_configurations = {
          primary-ip = { name = "primary-ip"; primary = true; private_ip_address = "10.0.0.4"; create_public_ip = true }
        }
      },
      {
        name       = "fw-1-untrust"
        subnet_key = "untrust"
        ip_configurations = {
          primary-ip  = { name = "primary-ip";  primary = true;  private_ip_address = "10.0.1.4"; create_public_ip = false }
          floating-ip = { name = "floating-ip"; primary = false; private_ip_address = "10.0.1.6"; create_public_ip = true; public_ip_name = "sdwan-hub-pip" }
        }
      },
      {
        name       = "fw-1-trust"
        subnet_key = "trust"
        ip_configurations = {
          primary-ip  = { name = "primary-ip";  primary = true;  private_ip_address = "10.0.1.20"; create_public_ip = false }
          floating-ip = { name = "floating-ip"; primary = false; private_ip_address = "10.0.1.22"; create_public_ip = false }
        }
      },
      {
        name       = "fw-1-ha"
        subnet_key = "ha"
        ip_configurations = {
          primary-ip = { name = "primary-ip"; primary = true; private_ip_address = "10.0.1.36"; create_public_ip = false }
        }
      }
    ]
  }

  # ── Hub Firewall 2 (Passive / Standby) ───────────────────────────────────
  # Floating IPs are NOT provisioned on fw-2 at deploy time.
  # PAN-OS moves them here via Azure API on failover.

  "fw-2" = {
    name     = "vmseries-fw-2"
    vnet_key = "transit"

    virtual_machine = {
      zone          = null
      avset_key     = "ha-avset"
      identity_type = "SystemAssigned"

      bootstrap_options = {
        type               = "dhcp-client"
        plugin-op-commands = "advance-routing:enable"
        hostname           = "CUSTOMER_FW2_HOSTNAME"

        panorama-server                       = "cloud"
        tplname                               = "CUSTOMER_SCM_LABEL"
        dgname                                = "CUSTOMER_SCM_FOLDER"
        vm-series-auto-registration-pin-id    = "CUSTOMER_PIN_ID"
        vm-series-auto-registration-pin-value = "CUSTOMER_PIN_VALUE"
        authcodes                             = "CUSTOMER_AUTHCODE"
      }
    }

    interfaces = [
      {
        name       = "fw-2-mgmt"
        subnet_key = "management"
        ip_configurations = {
          primary-ip = { name = "primary-ip"; primary = true; private_ip_address = "10.0.0.5"; create_public_ip = true }
        }
      },
      {
        name       = "fw-2-untrust"
        subnet_key = "untrust"
        ip_configurations = {
          primary-ip = { name = "primary-ip"; primary = true; private_ip_address = "10.0.1.5"; create_public_ip = false }
        }
      },
      {
        name       = "fw-2-trust"
        subnet_key = "trust"
        ip_configurations = {
          primary-ip = { name = "primary-ip"; primary = true; private_ip_address = "10.0.1.21"; create_public_ip = false }
        }
      },
      {
        name       = "fw-2-ha"
        subnet_key = "ha"
        ip_configurations = {
          primary-ip = { name = "primary-ip"; primary = true; private_ip_address = "10.0.1.37"; create_public_ip = false }
        }
      }
    ]
  }
}

# ── Unused modules (leave as-is) ─────────────────────────────────────────────

public_ips          = { public_ip_addresses = {}; public_ip_prefixes = {} }
load_balancers      = {}
appgws              = {}
natgws              = {}
vnet_peerings       = {}
bootstrap_storages  = {}
ngfw_metrics        = null
test_infrastructure = {}
