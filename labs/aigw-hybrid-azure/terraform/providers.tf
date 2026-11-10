provider "azurerm" {
  features {
    resource_group {
      # The lab is disposable. Allow `terraform destroy` to remove the resource
      # group even when AKS has left behind a node resource group or an
      # orphaned public IP.
      prevent_deletion_if_contains_resources = false
    }
  }
}

# Both the kubernetes and helm providers read their credentials straight from
# the AKS resource. Terraform resolves a provider configuration after the
# resources it references, so a single `terraform apply` creates the cluster
# first and then configures these providers against it.
#
# Known caveat: on the very first run in a fresh workspace, a provider whose
# configuration is still unknown at plan time can produce
# "Provider configuration is not yet known". If that happens, build the cluster
# on its own and then run the full apply:
#
#   terraform apply -target=azurerm_kubernetes_cluster.aks
#   terraform apply
#
provider "kubernetes" {
  host                   = azurerm_kubernetes_cluster.aks.kube_config[0].host
  client_certificate     = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].client_certificate)
  client_key             = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].client_key)
  cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].cluster_ca_certificate)
}

provider "helm" {
  kubernetes {
    host                   = azurerm_kubernetes_cluster.aks.kube_config[0].host
    client_certificate     = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].client_certificate)
    client_key             = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].client_key)
    cluster_ca_certificate = base64decode(azurerm_kubernetes_cluster.aks.kube_config[0].cluster_ca_certificate)
  }
}
