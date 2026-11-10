###############################################################################
# Cluster access
###############################################################################

variable "kubeconfig_path" {
  description = "Path to the kubeconfig written by az aks get-credentials."
  type        = string
  default     = "~/.kube/config"
}

variable "kubeconfig_context" {
  description = "Context name inside the kubeconfig. Defaults to the AKS cluster name."
  type        = string
  default     = "aigw-lab-aks"
}

###############################################################################
# Keycloak
###############################################################################

variable "keycloak_admin_url" {
  description = "Keycloak admin API base URL as seen from the machine running Terraform. With the Service on an internal load balancer this is the port-forward address."
  type        = string
  default     = "http://127.0.0.1:8081"
}

variable "keycloak_browser_url" {
  description = "Keycloak base URL as the browser reaches it. This is the internal load balancer address from the root module's keycloak_url output, and it must match the KC_HOSTNAME pinned on the Keycloak deployment."
  type        = string
}

variable "keycloak_cluster_url" {
  description = "Keycloak base URL as the demo app pod reaches it, over cluster DNS."
  type        = string
  default     = "http://keycloak.keycloak.svc.cluster.local"
}

variable "keycloak_admin_username" {
  description = "Keycloak bootstrap admin username, from the root module's keycloak_admin_username output."
  type        = string
  default     = "admin"
}

variable "keycloak_admin_password" {
  description = "Keycloak bootstrap admin password. Read it with: terraform -chdir=.. output -raw keycloak_admin_password"
  type        = string
  sensitive   = true
}

variable "realm_name" {
  description = "Realm created for the demo."
  type        = string
  default     = "aigw-lab"
}

variable "client_id" {
  description = "OIDC client the demo app authenticates as."
  type        = string
  default     = "jwt-demo-app"
}

variable "client_secret" {
  description = "Client secret. Leave null to generate one."
  type        = string
  default     = null
  sensitive   = true
}

variable "test_username" {
  description = "Test user created in the realm."
  type        = string
  default     = "testuser"
}

variable "test_password" {
  description = "Test user password. Leave null to generate one and read it from the test_user_password output."
  type        = string
  default     = null
  sensitive   = true
}

variable "access_token_lifespan_seconds" {
  description = "Access token lifetime. The default of 3600 is long enough to finish the lab without re-authenticating."
  type        = number
  default     = 3600
}

###############################################################################
# Gateway claims
###############################################################################

variable "portkey_workspace_slug" {
  description = <<-EOT
    Workspace slug from SCM, for example ws-example-a-7c41b9. Found under
    Workspace Control > <workspace> > Settings, shown top right.

    This must be the slug, not the human-readable workspace name. The gateway
    is documented to fall back to the organisation's default workspace when a
    token carries no workspace claim, but that fallback does not resolve
    reliably on this integration path and every chat completion comes back as
    "Following keys are not valid: openai".
  EOT
  type        = string

  validation {
    condition     = can(regex("^ws-", var.portkey_workspace_slug))
    error_message = "Workspace slugs start with ws-. The value given looks like a display name rather than a slug."
  }
}

variable "gateway_scopes" {
  description = "Scopes embedded in the access token. Keycloak's built-in scope claim is a space-separated string, so this goes into a separate scopes array claim."
  type        = list(string)
  default     = ["completions.write"]
}

###############################################################################
# Demo application
###############################################################################

variable "app_namespace" {
  description = "Namespace for the demo app."
  type        = string
  default     = "jwt-demo"
}

variable "app_image" {
  description = "Image reference, for example myacr.azurecr.io/jwt-demo-app:v1. Build and push it first with build-and-push.sh."
  type        = string
}

variable "app_internal_ip" {
  description = "Static internal load balancer address for the demo app. Leave null to take the fifth address from the end of app_subnet_prefix. Pinning it lets the Keycloak redirect URI be set in the same apply."
  type        = string
  default     = null
}

variable "app_subnet_prefix" {
  description = "AKS subnet range, used only to derive app_internal_ip."
  type        = string
  default     = "10.0.1.0/24"
}

variable "app_port" {
  description = "Port the demo app listens on."
  type        = number
  default     = 5000
}

variable "gateway_url" {
  description = "Gateway base URL including /v1, from the root module's scm_gateway_url output."
  type        = string
}

variable "gateway_model" {
  description = "Model reference using the saved integration's slug. Inline provider headers fail when block_inline_config is enabled, so the slug goes in the model field."
  type        = string
  default     = "@openai/gpt-4o-mini"
}
