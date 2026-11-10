locals {
  # Keycloak sits behind an internal load balancer whenever the subscription is
  # short of public IPs, which on free tier it always is.
  keycloak_internal = var.keycloak_internal_lb != null ? var.keycloak_internal_lb : var.lab_mode

  # ── Quota budget ───────────────────────────────────────────────────────────
  # Counted here rather than discovered at apply time, because Azure reports
  # InsufficientVCPUQuota and PublicIPCountLimitReached only after several
  # minutes of provisioning.
  cores_requested = (var.aks_node_count * var.aks_node_vcpus) + (var.deploy_windows_vm ? var.windows_vm_vcpus : 0)

  public_ips_requested = sum([
    1,                                                         # AKS outbound load balancer
    1,                                                         # airs-gw public LoadBalancer service
    (var.deploy_keycloak && !local.keycloak_internal) ? 1 : 0, # Keycloak public LoadBalancer service
    var.deploy_windows_vm ? 1 : 0,                             # Windows VM
  ])

  # ── Helm overlay ───────────────────────────────────────────────────────────
  # Merged on top of the SCM-generated values.yaml. Helm deep-merges value
  # files left to right, so the registry credentials, PORTKEY_CLIENT_AUTH, and
  # ORGANISATIONS_TO_SYNC from the wizard survive untouched.
  #
  # LOG_STORE is deliberately absent. On the airs-gw integration path the link
  # to the management plane is outbound only, so SCM's backend cannot read a
  # self-hosted log store back and every log detail view fails with
  # "Resource not found". Prompt and response bodies stay with the SCM backend
  # instead.
  airs_gw_overlay = yamlencode({
    service = {
      type          = "LoadBalancer"
      port          = 80
      containerPort = var.gateway_port
    }
    environment = {
      create = true
      secret = true
      data = merge(
        {
          PORT = tostring(var.gateway_port)
        },
        var.enable_jwt_auth ? {
          JWT_ENABLED                   = "ON"
          JWT_LOCAL_AUTH_DEFAULT_SCOPES = var.jwt_default_scopes
        } : {}
      )
    }
  })

  # Derived from service_cidr so the two can never drift apart.
  dns_service_ip = coalesce(var.dns_service_ip, cidrhost(var.service_cidr, 10))

  # Sixth address from the end of the AKS subnet. Azure CNI hands node and pod
  # addresses out from the front of the subnet, so the tail stays free.
  keycloak_ip = local.keycloak_internal ? coalesce(var.keycloak_internal_ip, cidrhost(var.aks_subnet_prefix, -6)) : null

  keycloak_admin_password = coalesce(var.keycloak_admin_password, random_password.keycloak_admin.result)
  windows_admin_password  = coalesce(var.windows_admin_password, random_password.windows_admin.result)
}

resource "terraform_data" "preflight" {
  input = {
    cores      = local.cores_requested
    public_ips = local.public_ips_requested
  }

  lifecycle {
    precondition {
      condition     = fileexists("${path.module}/${var.scm_values_file}") || fileexists(var.scm_values_file)
      error_message = <<-EOT
        Cannot find the SCM values file at "${var.scm_values_file}".

        Download it from Strata Cloud Manager: AI Gateway > Admin Settings >
        Gateway Registration > Configure Gateway Deployment, then save it as
        terraform/values.yaml. It carries live registry credentials, so it is
        listed in .gitignore and must not be committed.
      EOT
    }

    precondition {
      condition     = !var.lab_mode || local.cores_requested <= var.regional_core_quota
      error_message = <<-EOT
        This footprint needs ${local.cores_requested} vCPUs but the Total Regional
        Cores quota for ${var.location} is ${var.regional_core_quota}.

        ${var.aks_node_count} AKS node(s) at ${var.aks_node_vcpus} vCPU each,
        plus ${var.deploy_windows_vm ? var.windows_vm_vcpus : 0} vCPU for the Windows VM.

        Pick one: drop aks_node_count to 1, set deploy_windows_vm = false, or
        raise regional_core_quota after a support ticket increases it. A
        self-service increase through the Microsoft.Quota API is not offered on
        free-tier subscriptions and fails with ResourceNotAvailableForOffer.
      EOT
    }

    precondition {
      condition     = !var.lab_mode || local.public_ips_requested <= var.public_ip_quota
      error_message = <<-EOT
        This footprint needs ${local.public_ips_requested} Standard public IPs but the
        quota for ${var.location} is ${var.public_ip_quota}.

        Set keycloak_internal_lb = true to move Keycloak behind an internal load
        balancer, which still leaves it reachable from the Windows VM on the
        same VNet.
      EOT
    }

    precondition {
      condition     = var.service_cidr != var.vnet_address_space
      error_message = <<-EOT
        service_cidr and vnet_address_space are both ${var.service_cidr}. AKS
        rejects an overlap with ServiceCidrOverlapExistingSubnetsCidr, which is
        why the default service CIDR here is 172.16.0.0/16 rather than the AKS
        default of 10.0.0.0/16. Keep the service CIDR outside the VNet range.
      EOT
    }
  }
}

resource "random_password" "keycloak_admin" {
  length           = 24
  special          = true
  override_special = "!#$%*-_=+"
}

resource "random_password" "windows_admin" {
  length           = 24
  special          = true
  override_special = "!#$%*-_=+"
  min_upper        = 2
  min_lower        = 2
  min_numeric      = 2
  min_special      = 2
}
