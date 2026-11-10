###############################################################################
# Naming and placement
###############################################################################

variable "prefix" {
  description = "Prefix applied to every resource name in the lab."
  type        = string
  default     = "aigw-lab"

  validation {
    condition     = can(regex("^[a-z0-9-]{3,20}$", var.prefix))
    error_message = "prefix must be 3-20 characters of lowercase letters, digits, or hyphens."
  }
}

variable "location" {
  description = "Azure region. centralus is the region this lab was validated in."
  type        = string
  default     = "centralus"
}

variable "tags" {
  description = "Tags applied to every resource."
  type        = map(string)
  default = {
    project = "aigw-hybrid-lab"
    owner   = "lab"
  }
}

###############################################################################
# Lab mode
#
# lab_mode = true encodes the constraints of a $200 free-credit subscription:
# a 4 vCPU Total Regional Cores quota and a 3 Standard public IP quota. It does
# not change any resource directly; it drives the defaults below and arms a
# precondition that fails the plan when the requested footprint cannot fit.
###############################################################################

variable "lab_mode" {
  description = "Enforce free-tier quota limits (4 regional vCPUs, 3 Standard public IPs)."
  type        = bool
  default     = true
}

variable "regional_core_quota" {
  description = "Total Regional Cores available in var.location. Raise this once a support ticket increases the quota."
  type        = number
  default     = 4
}

variable "public_ip_quota" {
  description = "Standard public IP addresses available in var.location."
  type        = number
  default     = 3
}

###############################################################################
# Network
###############################################################################

variable "vnet_address_space" {
  description = "VNet address space."
  type        = string
  default     = "10.0.0.0/16"
}

variable "aks_subnet_prefix" {
  description = "Subnet for AKS nodes and internal load balancers."
  type        = string
  default     = "10.0.1.0/24"
}

variable "vm_subnet_prefix" {
  description = "Subnet for the Windows traffic generator."
  type        = string
  default     = "10.0.2.0/24"
}

variable "service_cidr" {
  description = "Kubernetes service CIDR. Must not overlap vnet_address_space, which is why this is not the AKS default of 10.0.0.0/16."
  type        = string
  default     = "172.16.0.0/16"
}

variable "dns_service_ip" {
  description = "Cluster DNS service address. Leave null to derive the 11th address of service_cidr, which keeps the two from drifting apart."
  type        = string
  default     = null
}

###############################################################################
# AKS
###############################################################################

variable "kubernetes_version" {
  description = "AKS control plane version. null takes the region's default."
  type        = string
  default     = null
}

variable "aks_node_count" {
  description = "Node count for the single system node pool. 1 is the free-tier default; 2 needs an 8 vCPU quota once the Windows VM is also running."
  type        = number
  default     = 1
}

variable "aks_node_vm_size" {
  description = "AKS node size. Standard_B2s and Standard_B2als_v2 are commonly rejected on free-tier subscriptions; Standard_D2als_v7 is the size validated for this lab."
  type        = string
  default     = "Standard_D2als_v7"
}

variable "aks_node_vcpus" {
  description = "vCPU count of aks_node_vm_size. Used only by the quota precondition, so update it alongside aks_node_vm_size."
  type        = number
  default     = 2
}

variable "aks_availability_zones" {
  description = "Zones for the node pool. Leave empty: zone pinning failed with AvailabilityZoneNotSupported for this size in centralus."
  type        = list(string)
  default     = []
}

variable "aks_sku_tier" {
  description = "AKS control plane tier."
  type        = string
  default     = "Free"
}

###############################################################################
# Keycloak
###############################################################################

variable "deploy_keycloak" {
  description = "Deploy the Keycloak identity provider into the cluster."
  type        = bool
  default     = true
}

variable "keycloak_internal_lb" {
  description = "Put Keycloak behind an internal load balancer. true on free tier, where a public IP is needed for the Windows VM instead. null follows lab_mode."
  type        = bool
  default     = null
}

variable "keycloak_internal_ip" {
  description = "Static address for Keycloak's internal load balancer, inside aks_subnet_prefix. Leave null to take the sixth address from the end of that subnet. Pinning it lets KC_HOSTNAME be set in the same apply that creates the Service."
  type        = string
  default     = null
}

variable "keycloak_admin_username" {
  description = "Keycloak bootstrap admin username."
  type        = string
  default     = "admin"
}

variable "keycloak_admin_password" {
  description = "Keycloak bootstrap admin password. Leave null to generate one and read it from the keycloak_admin_password output."
  type        = string
  default     = null
  sensitive   = true
}

variable "keycloak_image" {
  description = "Keycloak container image."
  type        = string
  default     = "quay.io/keycloak/keycloak:26.0"
}

variable "keycloak_persistence" {
  description = <<-EOT
    Back Keycloak's H2 database with a persistent volume so the realm and its
    signing keys survive a pod restart. Set false only to reproduce the
    throwaway behaviour; the JWKS pasted into SCM goes stale every restart
    without it.
  EOT
  type        = bool
  default     = true
}

variable "keycloak_storage_size" {
  description = "Size of the Keycloak data volume. The H2 file for a lab realm is a few megabytes; this is Azure's practical floor for a managed disk."
  type        = string
  default     = "4Gi"
}

variable "keycloak_storage_class" {
  description = "Storage class for the Keycloak data volume. managed-csi is the StandardSSD_LRS class AKS creates by default."
  type        = string
  default     = "managed-csi"
}

###############################################################################
# AI Gateway data plane (airs-gw chart)
###############################################################################

variable "airs_gw_namespace" {
  description = "Namespace for the gateway. The chart defaults to airs-gw."
  type        = string
  default     = "airs-gw"
}

variable "airs_gw_chart_version" {
  description = "airs-gw chart version. null takes the newest version in the repo."
  type        = string
  default     = null
}

variable "scm_values_file" {
  description = "Path to the values.yaml downloaded from the SCM Gateway Registration wizard. It carries the registry credentials, PORTKEY_CLIENT_AUTH, and ORGANISATIONS_TO_SYNC, so it is gitignored."
  type        = string
  default     = "values.yaml"
}

variable "gateway_port" {
  description = "Container port the gateway listens on."
  type        = number
  default     = 8787
}

variable "enable_jwt_auth" {
  description = "Set JWT_ENABLED=ON so the gateway validates Keycloak-issued bearer tokens against the JWKS configured in SCM. Required before the Phase 6 JWT demo works."
  type        = bool
  default     = false
}

variable "jwt_default_scopes" {
  description = "Fallback scopes for tokens with no scope claim."
  type        = string
  default     = "completions.write"
}

###############################################################################
# Windows traffic generator
###############################################################################

variable "deploy_windows_vm" {
  description = "Deploy the Windows traffic generator VM."
  type        = bool
  default     = true
}

variable "windows_vm_size" {
  description = "Windows VM size. Standard_B2s failed with SkuNotAvailable in centralus; Standard_D2als_v7 succeeded."
  type        = string
  default     = "Standard_D2als_v7"
}

variable "windows_vm_vcpus" {
  description = "vCPU count of windows_vm_size. Used only by the quota precondition."
  type        = number
  default     = 2
}

variable "windows_admin_username" {
  description = "Local administrator account. Azure rejects admin, administrator, root, and guest."
  type        = string
  default     = "labadmin"

  validation {
    condition     = !contains(["admin", "administrator", "root", "guest", "user", "test"], lower(var.windows_admin_username))
    error_message = "Azure reserves this username for Windows VMs. Pick another."
  }
}

variable "windows_admin_password" {
  description = "Local administrator password. Leave null to generate one and read it from the windows_admin_password output."
  type        = string
  default     = null
  sensitive   = true
}

variable "rdp_source_address_prefix" {
  description = "Source allowed to reach RDP. Set this to your own public address; * exposes 3389 to the internet."
  type        = string
  default     = "*"
}

###############################################################################
# Container registry (only needed for the Phase 6 JWT demo app)
###############################################################################

variable "deploy_acr" {
  description = "Create an Azure Container Registry and grant the AKS kubelet identity AcrPull. Needed before the jwt-demo root module can deploy its image."
  type        = bool
  default     = false
}
