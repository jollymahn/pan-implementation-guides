resource "azurerm_kubernetes_cluster" "aks" {
  name                = "${var.prefix}-aks"
  resource_group_name = azurerm_resource_group.lab.name
  location            = azurerm_resource_group.lab.location
  dns_prefix          = var.prefix
  kubernetes_version  = var.kubernetes_version
  sku_tier            = var.aks_sku_tier
  tags                = var.tags

  default_node_pool {
    name           = "nodepool1"
    node_count     = var.aks_node_count
    vm_size        = var.aks_node_vm_size
    vnet_subnet_id = azurerm_subnet.aks.id

    # Empty by design. Adding zones to this size in centralus failed with
    # AvailabilityZoneNotSupported, and zone spread buys a lab nothing.
    zones = length(var.aks_availability_zones) > 0 ? var.aks_availability_zones : null
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin = "azure"
    service_cidr   = var.service_cidr
    dns_service_ip = local.dns_service_ip
    outbound_type  = "loadBalancer"
  }

  lifecycle {
    # Scaling the pool from the CLI or the portal to free vCPU quota is a
    # normal part of running this lab on 4 cores. Ignoring drift here stops the
    # next apply from quietly scaling it back.
    ignore_changes = [default_node_pool[0].node_count]
  }
}

# The cluster's control plane identity needs to read the subnet before it can
# place an internal load balancer in a VNet that lives outside the AKS-managed
# node resource group. Without this, the Keycloak internal LB stays <pending>
# and the service events show SyncLoadBalancerFailed with a 403
# AuthorizationFailed.
resource "azurerm_role_assignment" "aks_network_contributor" {
  scope                = azurerm_virtual_network.lab.id
  role_definition_name = "Network Contributor"
  principal_id         = azurerm_kubernetes_cluster.aks.identity[0].principal_id
}

###############################################################################
# Container registry, only for the Phase 6 JWT demo app
###############################################################################

resource "random_string" "acr_suffix" {
  count   = var.deploy_acr ? 1 : 0
  length  = 6
  upper   = false
  special = false
}

resource "azurerm_container_registry" "lab" {
  count               = var.deploy_acr ? 1 : 0
  name                = "${replace(var.prefix, "-", "")}acr${random_string.acr_suffix[0].result}"
  resource_group_name = azurerm_resource_group.lab.name
  location            = azurerm_resource_group.lab.location
  sku                 = "Basic"
  admin_enabled       = false
  tags                = var.tags
}

resource "azurerm_role_assignment" "kubelet_acr_pull" {
  count                = var.deploy_acr ? 1 : 0
  scope                = azurerm_container_registry.lab[0].id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
}
