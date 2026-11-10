# Terraform: AIGW hybrid lab on Azure

Builds the Azure infrastructure, the AI Gateway data plane, and the Keycloak
identity provider described in [`../aigw-hybrid-lab.html`](../aigw-hybrid-lab.html).
Everything that can be automated is here. What remains is the Strata Cloud
Manager work, which has no public API on this integration path.

## What gets built

| Resource | Notes |
|---|---|
| Resource group, VNet, two subnets | `10.0.1.0/24` for AKS, `10.0.2.0/24` for the VM |
| AKS cluster | One node pool, Azure CNI, service CIDR outside the VNet range |
| Role assignment | Network Contributor for the AKS identity on the VNet, so internal load balancers work |
| `airs-gw` Helm release | Chart from `portkey-ai.github.io/airs-gw-helm`, your SCM `values.yaml` plus a generated overlay |
| Keycloak | Deployment, Secret, and a LoadBalancer Service pinned to a static internal address |
| Windows VM | Traffic generator with an NSG allowing RDP |
| Container registry | Only when `deploy_acr = true`, for the Phase 6 demo app |

## What stays manual

Registering the gateway, adding an LLM provider to the Model Catalog, creating
a Workspace API Key, and pasting the JWKS all happen in the SCM browser UI.
The guide covers each one.

## Prerequisites

```bash
terraform version     # 1.5.0 or newer
az version
kubectl version --client
helm version
az login
```

Register the resource providers once per subscription, or `az aks create`
fails with `MissingSubscriptionRegistration`:

```bash
for ns in Microsoft.ContainerService Microsoft.Network Microsoft.Compute Microsoft.Storage; do
  az provider register --namespace "$ns"
done
az provider show --namespace Microsoft.ContainerService --query registrationState -o tsv
```

Wait for `Registered`.

The module creates a role assignment, granting the AKS identity Network Contributor
on the VNet. That needs Owner or User Access Administrator on the subscription;
Contributor alone fails with `AuthorizationFailed` on
`Microsoft.Authorization/roleAssignments/write`, and the Keycloak Service then
never gets an address.

```bash
az role assignment list --assignee "$(az account show --query user.name -o tsv)" \
  --query "[].roleDefinitionName" -o tsv
```

## Run it

```bash
cd terraform

# 1. Drop in the values.yaml downloaded from the SCM Gateway Registration
#    wizard. It carries live credentials and is gitignored.
cp ~/Downloads/values.yaml .

# 2. Optional. The defaults already match the validated free-tier lab.
cp terraform.tfvars.example terraform.tfvars

terraform init
terraform plan
terraform apply
```

Roughly 15 minutes, most of it AKS.

### If the first apply reports an unknown provider configuration

The kubernetes and helm providers read their credentials from the AKS
resource. In a fresh workspace Terraform occasionally cannot resolve that at
plan time. Build the cluster first, then run the full apply:

```bash
terraform apply -target=azurerm_kubernetes_cluster.aks
terraform apply
```

## After the apply

```bash
terraform output                                   # endpoints and next steps
terraform output -raw windows_admin_password       # RDP password
terraform output -raw keycloak_admin_password      # Keycloak admin console
eval "$(terraform output -raw kubectl_credentials_command)"
```

Paste `scm_gateway_url` and `scm_mcp_gateway_url` into SCM under
**Organization Details > General**.

## Quota preconditions

`terraform_data.preflight` fails the plan before anything is created when the
footprint will not fit. The defaults are sized for a `$200` free-credit
subscription: a 4 vCPU Total Regional Cores limit and 3 Standard public IPs.

| Budget item | Default consumption |
|---|---|
| vCPUs | 2 for one AKS node, 2 for the Windows VM |
| Public IPs | 1 AKS outbound, 1 gateway LoadBalancer, 1 Windows VM |

Keycloak takes no public IP because `lab_mode` puts it behind an internal load
balancer. It stays reachable from the Windows VM and from inside the cluster.

Raising the footprint means raising the quota first. A self-service increase
through the `Microsoft.Quota` API is not offered on free-tier subscriptions and
fails with `ResourceNotAvailableForOffer`, so an Azure Portal support ticket is
the only route. Once granted:

```hcl
lab_mode            = false
regional_core_quota = 8
aks_node_count      = 2
```

## Phase 6: the JWT demo

A separate root module in [`jwt-demo/`](jwt-demo/), because its Keycloak
provider needs a port-forward to an internal service and that dependency has no
business in the main apply.

```bash
# 1. Turn on gateway-side JWT validation and create the registry.
#    In terraform.tfvars:  enable_jwt_auth = true, deploy_acr = true
terraform apply

# 2. Build and push the demo app image.
cd jwt-demo
./build-and-push.sh

# 3. Open a port-forward to Keycloak and leave it running.
kubectl port-forward -n keycloak svc/keycloak 8081:80 &

# 4. Fill in the four required values, then apply.
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform apply

# 5. Paste the JWKS into SCM.
terraform output -raw jwks_json | pbcopy
```

## Teardown

```bash
cd terraform/jwt-demo && terraform destroy    # if Phase 6 was built
cd .. && terraform destroy
```

`terraform destroy` occasionally leaves the AKS-managed node resource group
behind when a LoadBalancer Service was deleted out of band. Deleting the
resource group directly always works:

```bash
az group delete --name aigw-lab-rg --yes --no-wait
kubectl config delete-context aigw-lab-aks
```

## Files

| File | Contents |
|---|---|
| `versions.tf`, `providers.tf` | Provider requirements and the AKS-derived kubernetes and helm credentials |
| `variables.tf` | Every input, with the reason behind each default |
| `locals.tf` | Quota arithmetic, the Helm overlay, and the preflight preconditions |
| `01-network.tf` | Resource group, VNet, subnets |
| `02-aks.tf` | Cluster, VNet role assignment, optional registry |
| `03-keycloak.tf` | Keycloak Deployment, Secret, Service |
| `04-airs-gw.tf` | Helm release and the Service lookup |
| `05-windows-vm.tf` | NSG, public IP, NIC, Windows VM |
| `outputs.tf` | Endpoints, credentials, and the quota budget |

## Design notes

**No `LOG_STORE`.** The chart can write prompt and response bodies to MinIO or
to your own Azure Blob container, and the write path works. SCM's log detail
view then fails with `Error: Resource not found` on every entry, because this
integration path is outbound only and SCM's backend cannot read a store that
lives in your environment. Bodies stay with the SCM backend instead. For a
customer deployment where data residency matters, that trade-off is a decision
to document rather than a default to inherit.

**`Standard_D2als_v7` everywhere.** `Standard_B2s` and `Standard_B2als_v2` are
commonly rejected on free-tier subscriptions with `VMSizeNotSupported`,
`RestrictedVMSize`, or `SkuNotAvailable`. Check a size before switching:

```bash
az vm list-skus --location centralus --size Standard_D2a --output table
```

**No availability zones.** Zone pinning this size in `centralus` failed with
`AvailabilityZoneNotSupported`, and a single-region lab gains nothing from zone
spread.

**`ignore_changes` on the node count.** Scaling the pool by hand to free vCPU
quota is a normal part of running this lab, so the next apply leaves the count
where you put it.

**Keycloak survives a restart, not a teardown.** `start-dev` writes its H2
database to `/opt/keycloak/data`, which is mounted on a 4 GiB managed disk, so
a pod restart keeps the realm and keeps the signing keys behind the JWKS in
SCM. That matters more than it looks: without the volume, SCM goes on serving
the JWKS pasted earlier and rejects every token, and nothing in the gateway
logs points at Keycloak. `terraform destroy` removes the disk, so a full
rebuild still means re-running the `jwt-demo` apply and pasting a fresh JWKS.
Set `keycloak_persistence = false` for the old throwaway behavior; a Postgres
backend is the next step up if the realm has to outlive the cluster.
