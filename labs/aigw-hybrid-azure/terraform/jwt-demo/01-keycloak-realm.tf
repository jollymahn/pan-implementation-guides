locals {
  client_secret = coalesce(var.client_secret, random_password.client_secret.result)
  test_password = coalesce(var.test_password, random_password.test_user.result)

  # Fifth address from the end of the AKS subnet, one below the address the
  # root module pins for Keycloak.
  app_ip = coalesce(var.app_internal_ip, cidrhost(var.app_subnet_prefix, -5))

  app_base_url = "http://${local.app_ip}:${var.app_port}"
}

resource "random_password" "client_secret" {
  length  = 32
  special = false
}

resource "random_password" "test_user" {
  length           = 20
  special          = true
  override_special = "!#$%*-_"
  min_upper        = 2
  min_lower        = 2
  min_numeric      = 2
  min_special      = 1
}

# With keycloak_persistence left at its default in the root module, the H2
# file sits on a mounted volume and this realm, along with the signing keys
# behind the JWKS, survives a pod restart. Destroying the root module destroys
# the volume with it, so a full teardown still means rebuilding the realm here
# and pasting a fresh JWKS into SCM.
resource "keycloak_realm" "lab" {
  realm                 = var.realm_name
  enabled               = true
  display_name          = "AIGW Lab"
  access_token_lifespan = "${var.access_token_lifespan_seconds}s"
}

resource "keycloak_openid_client" "demo" {
  realm_id  = keycloak_realm.lab.id
  client_id = var.client_id
  name      = "JWT Demo App"
  enabled   = true

  access_type   = "CONFIDENTIAL"
  client_secret = local.client_secret

  standard_flow_enabled        = true
  direct_access_grants_enabled = true
  implicit_flow_enabled        = false

  valid_redirect_uris = ["${local.app_base_url}/callback"]
  web_origins         = [local.app_base_url]
}

# Keycloak's built-in "scope" claim is a space-separated string. Writing the
# gateway's scopes into a separate "scopes" array claim avoids colliding with
# it.
resource "keycloak_openid_hardcoded_claim_protocol_mapper" "scopes" {
  realm_id  = keycloak_realm.lab.id
  client_id = keycloak_openid_client.demo.id
  name      = "aigw-scopes"

  claim_name       = "scopes"
  claim_value      = jsonencode(var.gateway_scopes)
  claim_value_type = "JSON"

  add_to_access_token = true
  add_to_id_token     = false
  add_to_userinfo     = false
}

# The claim that decides whether a chat completion works at all. See the
# portkey_workspace_slug variable for why the documented fallback cannot be
# relied on.
resource "keycloak_openid_hardcoded_claim_protocol_mapper" "workspace" {
  realm_id  = keycloak_realm.lab.id
  client_id = keycloak_openid_client.demo.id
  name      = "aigw-workspace"

  claim_name       = "portkey_workspace"
  claim_value      = var.portkey_workspace_slug
  claim_value_type = "String"

  add_to_access_token = true
  add_to_id_token     = false
  add_to_userinfo     = false
}

resource "keycloak_user" "test" {
  realm_id       = keycloak_realm.lab.id
  username       = var.test_username
  enabled        = true
  email          = "${var.test_username}@aigw-lab.local"
  email_verified = true

  initial_password {
    value     = local.test_password
    temporary = false
  }
}
