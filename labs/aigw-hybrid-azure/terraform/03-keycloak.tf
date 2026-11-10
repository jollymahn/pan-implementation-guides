resource "kubernetes_namespace_v1" "keycloak" {
  count = var.deploy_keycloak ? 1 : 0

  metadata {
    name = "keycloak"
  }
}

resource "kubernetes_secret_v1" "keycloak_admin" {
  count = var.deploy_keycloak ? 1 : 0

  metadata {
    name      = "keycloak-admin"
    namespace = kubernetes_namespace_v1.keycloak[0].metadata[0].name
  }

  data = {
    username = var.keycloak_admin_username
    password = local.keycloak_admin_password
  }

  type = "Opaque"
}

# start-dev runs H2 in dev-file mode, writing to /opt/keycloak/data/h2. That
# path lives in the container's own writable layer, so every pod replacement
# starts from an empty database: the realm disappears and, more quietly, the
# realm's RSA signing keys are regenerated. SCM keeps serving the JWKS that was
# pasted in earlier, so token validation fails with no obvious cause. Mounting
# a volume over that path is what makes the realm and the keys outlive the pod.
resource "kubernetes_persistent_volume_claim_v1" "keycloak_data" {
  count = var.deploy_keycloak && var.keycloak_persistence ? 1 : 0

  metadata {
    name      = "keycloak-data"
    namespace = kubernetes_namespace_v1.keycloak[0].metadata[0].name
  }

  spec {
    access_modes       = ["ReadWriteOnce"]
    storage_class_name = var.keycloak_storage_class

    resources {
      requests = {
        storage = var.keycloak_storage_size
      }
    }
  }

  # The default storage class is WaitForFirstConsumer, so the disk is not
  # provisioned until a pod schedules. Binding would block forever here.
  wait_until_bound = false
}

resource "kubernetes_deployment_v1" "keycloak" {
  count = var.deploy_keycloak ? 1 : 0

  metadata {
    name      = "keycloak"
    namespace = kubernetes_namespace_v1.keycloak[0].metadata[0].name
    labels    = { app = "keycloak" }
  }

  spec {
    replicas = 1

    selector {
      match_labels = { app = "keycloak" }
    }

    # Recreate, not RollingUpdate. On a single-node cluster the replacement pod
    # cannot be scheduled alongside the outgoing one and the rollout hangs with
    # "0/1 nodes are available: 1 Insufficient cpu". The data volume needs this
    # too: an Azure managed disk is ReadWriteOnce, so the outgoing pod has to
    # release it before the incoming one can attach.
    strategy {
      type = "Recreate"
    }

    template {
      metadata {
        labels = { app = "keycloak" }
      }

      spec {
        # The image runs as uid 1000, gid 0. A freshly provisioned Azure disk
        # is owned by root, so without fsGroup the H2 file cannot be created
        # and the container exits before the readiness probe ever runs.
        dynamic "security_context" {
          for_each = var.keycloak_persistence ? [1] : []
          content {
            fs_group = 1000
          }
        }

        dynamic "volume" {
          for_each = var.keycloak_persistence ? [1] : []
          content {
            name = "keycloak-data"
            persistent_volume_claim {
              claim_name = kubernetes_persistent_volume_claim_v1.keycloak_data[0].metadata[0].name
            }
          }
        }

        container {
          name  = "keycloak"
          image = var.keycloak_image
          args  = ["start-dev"]

          # Named explicitly rather than left to the start-dev default, so the
          # pairing between this and the mounted volume below is visible.
          env {
            name  = "KC_DB"
            value = "dev-file"
          }

          dynamic "volume_mount" {
            for_each = var.keycloak_persistence ? [1] : []
            content {
              name       = "keycloak-data"
              mount_path = "/opt/keycloak/data"
            }
          }

          env {
            name = "KC_BOOTSTRAP_ADMIN_USERNAME"
            value_from {
              secret_key_ref {
                name = kubernetes_secret_v1.keycloak_admin[0].metadata[0].name
                key  = "username"
              }
            }
          }

          env {
            name = "KC_BOOTSTRAP_ADMIN_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret_v1.keycloak_admin[0].metadata[0].name
                key  = "password"
              }
            }
          }

          env {
            name  = "KC_PROXY_HEADERS"
            value = "xforwarded"
          }

          env {
            name  = "KC_HTTP_ENABLED"
            value = "true"
          }

          env {
            name  = "KC_HOSTNAME_STRICT"
            value = "false"
          }

          # Keycloak builds its OIDC discovery document from the Host header
          # unless KC_HOSTNAME is set. The demo app calls Keycloak over cluster
          # DNS while the user's browser is redirected to the load balancer
          # address, so without a pinned hostname the two disagree on the
          # issuer and the login round trip fails. Pinning the load balancer
          # address up front, rather than reading it back off the Service, is
          # what keeps this to one apply.
          dynamic "env" {
            for_each = local.keycloak_ip != null ? [local.keycloak_ip] : []
            content {
              name  = "KC_HOSTNAME"
              value = "http://${env.value}"
            }
          }

          port {
            name           = "http"
            container_port = 8080
          }

          readiness_probe {
            http_get {
              path = "/realms/master"
              port = 8080
            }
            initial_delay_seconds = 30
            period_seconds        = 10
          }

          resources {
            requests = {
              cpu    = "300m"
              memory = "512Mi"
            }
            limits = {
              cpu    = "1"
              memory = "1Gi"
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

resource "kubernetes_service_v1" "keycloak" {
  count = var.deploy_keycloak ? 1 : 0

  metadata {
    name      = "keycloak"
    namespace = kubernetes_namespace_v1.keycloak[0].metadata[0].name
    labels    = { app = "keycloak" }

    annotations = local.keycloak_internal ? {
      "service.beta.kubernetes.io/azure-load-balancer-internal" = "true"
      "service.beta.kubernetes.io/azure-load-balancer-ipv4"     = local.keycloak_ip
    } : {}
  }

  spec {
    type     = "LoadBalancer"
    selector = { app = "keycloak" }

    port {
      name        = "http"
      port        = 80
      target_port = 8080
      protocol    = "TCP"
    }
  }

  wait_for_load_balancer = true

  depends_on = [azurerm_role_assignment.aks_network_contributor]

  timeouts {
    create = "15m"
  }
}
