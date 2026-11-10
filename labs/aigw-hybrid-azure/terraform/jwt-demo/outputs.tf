output "app_url" {
  description = "Open this from the Windows VM's browser. It is an internal VNet address, not reachable from your workstation."
  value       = local.app_base_url
}

output "keycloak_browser_url" {
  description = "Keycloak address the login redirect uses."
  value       = var.keycloak_browser_url
}

output "realm" {
  description = "Realm created for the demo."
  value       = keycloak_realm.lab.realm
}

output "test_username" {
  description = "Test user to sign in as."
  value       = var.test_username
}

output "test_user_password" {
  description = "Test user password. Read it with: terraform output -raw test_user_password"
  value       = local.test_password
  sensitive   = true
}

output "client_secret" {
  description = "OIDC client secret. Read it with: terraform output -raw client_secret"
  value       = local.client_secret
  sensitive   = true
}

output "jwks_file" {
  description = "Paste the contents of this file into SCM: Admin Settings > Organisation > Authentication > JWT Authentication > JWKS JSON."
  value       = local_file.jwks.filename
}

output "jwks_json" {
  description = "Same document as jwks_file, for piping straight to the clipboard: terraform output -raw jwks_json | pbcopy"
  value       = jsonencode(local.jwks_signing_only)
}

output "next_steps" {
  description = "What is left to do by hand in SCM."
  value       = <<-EOT

    1. Paste the JWKS into SCM.
       terraform output -raw jwks_json | pbcopy
       SCM > Admin Settings > Organisation > Authentication > JWT Authentication
       Choose JWKS JSON and paste.

    2. Confirm the gateway was deployed with enable_jwt_auth = true.
       terraform -chdir=.. apply   # after setting enable_jwt_auth = true

    3. From the Windows VM's browser, open ${local.app_base_url}
       Sign in as ${var.test_username}, then send a prompt.

    The data volume in the root module keeps the signing key across a Keycloak
    pod restart. Destroying and rebuilding the stack does generate a new key,
    so repeat step 1 after any teardown.

  EOT
}
