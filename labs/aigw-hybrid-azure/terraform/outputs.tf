output "resource_group" {
  description = "Resource group holding every lab resource."
  value       = azurerm_resource_group.lab.name
}

output "aks_cluster_name" {
  description = "AKS cluster name."
  value       = azurerm_kubernetes_cluster.aks.name
}

output "kubectl_credentials_command" {
  description = "Command that points the local kubectl at this cluster."
  value       = "az aks get-credentials --resource-group ${azurerm_resource_group.lab.name} --name ${azurerm_kubernetes_cluster.aks.name} --overwrite-existing"
}

output "gateway_public_ip" {
  description = "Public address of the airs-gw LoadBalancer Service."
  value       = try(data.kubernetes_service_v1.airs_gw.status[0].load_balancer[0].ingress[0].ip, "pending")
}

output "scm_gateway_url" {
  description = "Paste into SCM: Organization Details > General > Gateway URLs."
  value       = "http://${try(data.kubernetes_service_v1.airs_gw.status[0].load_balancer[0].ingress[0].ip, "PENDING")}/v1"
}

output "scm_mcp_gateway_url" {
  description = "Paste into SCM: Organization Details > General > MCP Gateway URLs."
  value       = "http://${try(data.kubernetes_service_v1.airs_gw.status[0].load_balancer[0].ingress[0].ip, "PENDING")}:8788"
}

output "gateway_health_check" {
  description = "Health probe for the gateway."
  value       = "curl -s http://${try(data.kubernetes_service_v1.airs_gw.status[0].load_balancer[0].ingress[0].ip, "PENDING")}/v1/health"
}

output "keycloak_url" {
  description = "Keycloak base URL. Internal addresses are reachable from the Windows VM and from inside the cluster, not from a browser on your workstation."
  value       = var.deploy_keycloak ? "http://${try(kubernetes_service_v1.keycloak[0].status[0].load_balancer[0].ingress[0].ip, "PENDING")}" : "not deployed"
}

output "keycloak_internal" {
  description = "Whether Keycloak is behind an internal load balancer."
  value       = var.deploy_keycloak ? local.keycloak_internal : null
}

output "keycloak_admin_username" {
  description = "Keycloak bootstrap admin username."
  value       = var.deploy_keycloak ? var.keycloak_admin_username : null
}

output "keycloak_admin_password" {
  description = "Keycloak bootstrap admin password. Read it with: terraform output -raw keycloak_admin_password"
  value       = var.deploy_keycloak ? local.keycloak_admin_password : null
  sensitive   = true
}

output "windows_vm_public_ip" {
  description = "RDP target for the traffic generator."
  value       = var.deploy_windows_vm ? azurerm_public_ip.vm[0].ip_address : null
}

output "windows_admin_username" {
  description = "Windows local administrator account."
  value       = var.deploy_windows_vm ? var.windows_admin_username : null
}

output "windows_admin_password" {
  description = "Windows local administrator password. Read it with: terraform output -raw windows_admin_password"
  value       = var.deploy_windows_vm ? local.windows_admin_password : null
  sensitive   = true
}

output "acr_login_server" {
  description = "Registry the Phase 6 demo image is pushed to."
  value       = var.deploy_acr ? azurerm_container_registry.lab[0].login_server : null
}

output "acr_name" {
  description = "Registry name, for az acr login."
  value       = var.deploy_acr ? azurerm_container_registry.lab[0].name : null
}

output "quota_budget" {
  description = "What this footprint consumes against the regional quotas."
  value = {
    vcpus_requested      = local.cores_requested
    vcpu_quota           = var.regional_core_quota
    public_ips_requested = local.public_ips_requested
    public_ip_quota      = var.public_ip_quota
  }
}
