# ============================================================================
# VM-Series on OCI - Model A: Hub-and-Spoke Active/Active
# ----------------------------------------------------------------------------
# Two Flexible Network Load Balancers (Inbound + Trust) with symmetric hashing
# front a pair of Active/Active firewalls. No IAM IP-move policy is required.
#
# IMPORTANT: OCI has no first-party VM-Series Terraform module. These variable
# names follow the oracle-quickstart/oci-palo-alto-networks project at the time
# of writing. Reconcile EVERY name against that project's variables.tf (or its
# ORM schema.yaml) before you apply. Values here are placeholders and must be
# replaced with your own identity, region, image, and key material.
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
# Marketplace VM-Series image OCID for your region (BYOL or PAYG bundle).
vmseries_image_ocid = "ocid1.image.oc1..REPLACE_ME"
vmseries_shape      = "VM.Standard2.4"
ssh_public_key_path = "~/.ssh/id_rsa.pub"
firewall_count      = 2

# ---- Hub VCN ---------------------------------------------------------------
hub_vcn_cidr = "10.60.0.0/24"

hub_subnets = {
  mgmt    = "10.60.0.0/28"
  untrust = "10.60.0.16/28"
  trust   = "10.60.0.32/28"
  inbound = "10.60.0.48/28"
}

# ---- Flexible Network Load Balancers (symmetric hashing) -------------------
inbound_nlb = {
  subnet             = "inbound"
  is_symmetric_hash  = true
  listener_port      = 443
}

trust_nlb = {
  subnet             = "trust"
  is_symmetric_hash  = true
  listener_port      = 0  # "any" / all-ports listener for east-west + outbound
}

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
