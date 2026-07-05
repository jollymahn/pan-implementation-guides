# ============================================================================
# VM-Series on OCI - Model B: Active/Passive built-in PAN-OS HA
# ----------------------------------------------------------------------------
# A native PAN-OS HA pair. Each firewall has 4 interfaces (management, untrust,
# trust, dedicated HA link). Untrust and trust carry a primary plus a secondary
# (floating) IP. On failover the floating IPs move to the peer via OCI API
# calls, authorized by a dynamic group + IAM policy and executed through
# instance principals.
#
# IMPORTANT: OCI has no first-party VM-Series Terraform module. These variable
# names follow the oracle-quickstart/oci-palo-alto-networks project at the time
# of writing. Reconcile EVERY name against that project's variables.tf (or its
# ORM schema.yaml) before you apply. Values here are placeholders.
# CIDRs match "Reference: IP Schema" in the guide.
# ============================================================================

# ---- Identity / provider ---------------------------------------------------
tenancy_ocid     = "ocid1.tenancy.oc1..REPLACE_ME"
compartment_ocid = "ocid1.compartment.oc1..REPLACE_ME"
user_ocid        = "ocid1.user.oc1..REPLACE_ME"
fingerprint      = "aa:bb:cc:dd:ee:ff:00:11:22:33:44:55:66:77:88:99"
private_key_path = "~/.oci/oci_api_key.pem"
region           = "us-ashburn-1"

# ---- Firewall image / shape ------------------------------------------------
vmseries_image_ocid = "ocid1.image.oc1..REPLACE_ME"
vmseries_shape      = "VM.Standard2.4"
ssh_public_key_path = "~/.ssh/id_rsa.pub"
firewall_count      = 2  # active + passive

# ---- Hub VCN ---------------------------------------------------------------
hub_vcn_cidr = "10.60.0.0/24"

hub_subnets = {
  mgmt    = "10.60.0.0/28"
  untrust = "10.60.0.16/28"
  trust   = "10.60.0.32/28"
  ha      = "10.60.0.64/28"   # dedicated HA1/HA2 link (Model B only)
}

# ---- Floating (secondary) IPs that move on failover ------------------------
floating_ips = {
  untrust = "10.60.0.22"
  trust   = "10.60.0.38"
}

# ---- HA failover authorization (REQUIRED for Model B) ----------------------
# Both HA peers join this dynamic group; the policy lets them reassign the
# floating private IPs. PAN-OS authenticates via instance principals.
create_dynamic_group = true
dynamic_group_name   = "dg-vmseries-ha"

# Matching rule places both firewall instances in the dynamic group, e.g.:
#   ALL {instance.compartment.id = '<compartment_ocid>'}
ha_iam_policy_statements = [
  "Allow dynamic-group dg-vmseries-ha to use private-ips in compartment id <compartment_ocid>",
  "Allow dynamic-group dg-vmseries-ha to use vnics in compartment id <compartment_ocid>",
  "Allow dynamic-group dg-vmseries-ha to read instances in compartment id <compartment_ocid>",
]

# ---- Gateways --------------------------------------------------------------
create_internet_gateway = true
create_nat_gateway      = true
create_service_gateway  = true
create_drg              = true

# ---- Spoke VCNs (attach to the DRG) ----------------------------------------
spoke_vcns = {
  spoke-a = { cidr = "10.61.0.0/24", app_subnet = "10.61.0.0/24" }
  spoke-b = { cidr = "10.62.0.0/24", app_subnet = "10.62.0.0/24" }
}

# ---- Bootstrap (Panorama or SCM onboarding) --------------------------------
bootstrap = {
  panorama_server  = "10.60.0.10"
  vm_auth_key      = "REPLACE_ME"
  tplname          = "STK-OCI-HUB"
  dgname           = "DG-OCI-HUB"
}
