resource "random_password" "flask_secret" {
  length  = 48
  special = false
}

resource "kubernetes_namespace_v1" "app" {
  metadata {
    name = var.app_namespace
  }
}

resource "kubernetes_secret_v1" "app" {
  metadata {
    name      = "jwt-demo-secrets"
    namespace = kubernetes_namespace_v1.app.metadata[0].name
  }

  data = {
    FLASK_SECRET_KEY       = random_password.flask_secret.result
    KEYCLOAK_CLIENT_SECRET = local.client_secret
  }

  type = "Opaque"
}

resource "kubernetes_deployment_v1" "app" {
  metadata {
    name      = "jwt-demo-app"
    namespace = kubernetes_namespace_v1.app.metadata[0].name
    labels    = { app = "jwt-demo-app" }
  }

  spec {
    replicas = 1

    selector {
      match_labels = { app = "jwt-demo-app" }
    }

    strategy {
      type = "Recreate"
    }

    template {
      metadata {
        labels = { app = "jwt-demo-app" }
      }

      spec {
        container {
          name  = "jwt-demo-app"
          image = var.app_image

          port {
            container_port = var.app_port
          }

          # Server-side OIDC discovery goes over cluster DNS. The browser is
          # redirected to the load balancer address instead. Both resolve to
          # the same issuer only because the root module pinned KC_HOSTNAME on
          # the Keycloak deployment.
          env {
            name  = "KEYCLOAK_BASE_URL"
            value = var.keycloak_cluster_url
          }

          env {
            name  = "KEYCLOAK_REALM"
            value = keycloak_realm.lab.realm
          }

          env {
            name  = "KEYCLOAK_CLIENT_ID"
            value = keycloak_openid_client.demo.client_id
          }

          env {
            name = "KEYCLOAK_CLIENT_SECRET"
            value_from {
              secret_key_ref {
                name = kubernetes_secret_v1.app.metadata[0].name
                key  = "KEYCLOAK_CLIENT_SECRET"
              }
            }
          }

          env {
            name = "FLASK_SECRET_KEY"
            value_from {
              secret_key_ref {
                name = kubernetes_secret_v1.app.metadata[0].name
                key  = "FLASK_SECRET_KEY"
              }
            }
          }

          env {
            name  = "GATEWAY_URL"
            value = var.gateway_url
          }

          env {
            name  = "GATEWAY_MODEL"
            value = var.gateway_model
          }

          readiness_probe {
            http_get {
              path = "/healthz"
              port = var.app_port
            }
            initial_delay_seconds = 5
            period_seconds        = 10
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "128Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "256Mi"
            }
          }
        }
      }
    }
  }

  timeouts {
    create = "10m"
    update = "10m"
  }
}

resource "kubernetes_service_v1" "app" {
  metadata {
    name      = "jwt-demo-app"
    namespace = kubernetes_namespace_v1.app.metadata[0].name

    annotations = {
      "service.beta.kubernetes.io/azure-load-balancer-internal" = "true"
      "service.beta.kubernetes.io/azure-load-balancer-ipv4"     = local.app_ip
    }
  }

  spec {
    type     = "LoadBalancer"
    selector = { app = "jwt-demo-app" }

    port {
      port        = var.app_port
      target_port = var.app_port
      protocol    = "TCP"
    }
  }

  wait_for_load_balancer = true

  timeouts {
    create = "15m"
  }
}
