# The gateway validates bearer tokens against a JWKS pasted into SCM, so the
# realm's public signing key has to come back out of Keycloak. The gateway's
# validator rejects a document containing the private key parameters Keycloak
# also returns, so this strips the set down to the public ones.
data "http" "realm_jwks" {
  url = "${var.keycloak_admin_url}/realms/${keycloak_realm.lab.realm}/protocol/openid-connect/certs"

  retry {
    attempts     = 5
    min_delay_ms = 2000
  }

  depends_on = [keycloak_realm.lab]
}

locals {
  jwks_all = jsondecode(data.http.realm_jwks.response_body)

  jwks_signing_only = {
    keys = [
      for key in local.jwks_all.keys : {
        for field in ["kty", "n", "e", "use", "alg", "kid"] :
        field => key[field] if can(key[field])
      }
      if try(key.use, "") == "sig" && try(key.kty, "") == "RSA"
    ]
  }
}

resource "local_file" "jwks" {
  filename        = "${path.module}/keycloak-jwks-sig-only.json"
  content         = jsonencode(local.jwks_signing_only)
  file_permission = "0600"
}
