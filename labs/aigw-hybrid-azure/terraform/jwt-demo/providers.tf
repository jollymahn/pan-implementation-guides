# Kubernetes credentials come from the kubeconfig context the root module's
# `kubectl_credentials_command` output created. A separate state and a separate
# provider set keep the Keycloak dependency out of the main lab apply.
provider "kubernetes" {
  config_path    = var.kubeconfig_path
  config_context = var.kubeconfig_context
}

# Keycloak's admin API is only reachable over the port-forward described in
# README.md, because the Service is an internal load balancer:
#
#   kubectl port-forward -n keycloak svc/keycloak 8081:80
#
provider "keycloak" {
  client_id                = "admin-cli"
  username                 = var.keycloak_admin_username
  password                 = var.keycloak_admin_password
  url                      = var.keycloak_admin_url
  initial_login            = false
  tls_insecure_skip_verify = true
}
