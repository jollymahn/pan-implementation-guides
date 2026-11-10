#!/usr/bin/env bash
#
# Builds the JWT demo app image and pushes it to the lab's container registry.
#
# Usage:
#   ./build-and-push.sh                 # reads ACR name from the root module
#   ./build-and-push.sh myacr v2        # explicit registry name and tag
#
# AKS nodes are AMD64. On Apple Silicon the platform has to be forced, or the
# pod comes up with "exec format error".
#
# az acr build, which builds in the cloud, fails in some corporate-proxy
# environments during source upload with
# "[SSL: CERTIFICATE_VERIFY_FAILED] self-signed certificate in certificate chain".
# Building locally and pushing avoids that path entirely.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_MODULE="${SCRIPT_DIR}/.."

ACR_NAME="${1:-}"
TAG="${2:-v1}"

if [[ -z "${ACR_NAME}" ]]; then
  echo "Reading the registry name from the root module..."
  ACR_NAME="$(terraform -chdir="${ROOT_MODULE}" output -raw acr_name 2>/dev/null || true)"
fi

if [[ -z "${ACR_NAME}" || "${ACR_NAME}" == "null" ]]; then
  cat >&2 <<'EOF'
No container registry found.

Set deploy_acr = true in terraform/terraform.tfvars and run `terraform apply`
in the root module first, or pass the registry name as the first argument.
EOF
  exit 1
fi

IMAGE="${ACR_NAME}.azurecr.io/jwt-demo-app:${TAG}"

echo "Logging in to ${ACR_NAME}..."
az acr login --name "${ACR_NAME}"

echo "Building ${IMAGE} for linux/amd64..."
docker buildx build \
  --platform linux/amd64 \
  --tag "${IMAGE}" \
  --push \
  "${SCRIPT_DIR}/app"

echo
echo "Pushed ${IMAGE}"
echo
echo "Add this to terraform/jwt-demo/terraform.tfvars:"
echo "  app_image = \"${IMAGE}\""
