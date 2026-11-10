resource "helm_release" "airs_gw" {
  name             = "airs-gw"
  repository       = "https://portkey-ai.github.io/airs-gw-helm"
  chart            = "airs-gw"
  version          = var.airs_gw_chart_version
  namespace        = var.airs_gw_namespace
  create_namespace = true

  # Order matters. The SCM wizard's file lands first and carries the registry
  # credentials, PORTKEY_CLIENT_AUTH, and ORGANISATIONS_TO_SYNC. The overlay
  # follows and adds the Service block and any JWT settings.
  values = [
    file(fileexists("${path.module}/${var.scm_values_file}") ? "${path.module}/${var.scm_values_file}" : var.scm_values_file),
    local.airs_gw_overlay,
  ]

  wait          = true
  wait_for_jobs = true
  timeout       = 900

  depends_on = [azurerm_kubernetes_cluster.aks]
}

# Read the Service back so its public address can be surfaced as an output and
# pasted into SCM's Organization Details page.
data "kubernetes_service_v1" "airs_gw" {
  metadata {
    name      = "airs-gw"
    namespace = var.airs_gw_namespace
  }

  depends_on = [helm_release.airs_gw]
}
