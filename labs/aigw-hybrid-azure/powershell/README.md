# PowerShell: AIGW hybrid lab on Azure

The same lab as [`../terraform/`](../terraform/), built with native Az module
cmdlets instead. Use this path on Windows, in an environment where Terraform is
not approved, or where step-by-step cmdlets are easier to read than HCL.

Azure resources are created with `New-AzResourceGroup`, `New-AzVirtualNetwork`,
`New-AzAksCluster`, `New-AzVM`, and friends. The Kubernetes layer shells out to
`kubectl` and `helm`, which have no Az module equivalent.

## Scripts

| Script | What it does |
|---|---|
| `Lab.parameters.psd1` | Every input. Start here. |
| `LabCommon.psm1` | Shared helpers: config loading, quota arithmetic, state, load balancer waits |
| `00-Test-Prerequisites.ps1` | Modules, tooling, sign-in, provider registration, VM size availability, quota, values.yaml |
| `01-New-LabInfrastructure.ps1` | Resource group, VNet, AKS, kubeconfig, VNet role assignment, optional registry |
| `02-Install-Keycloak.ps1` | Namespace, admin Secret, Deployment, LoadBalancer Service |
| `03-Install-AigwDataPlane.ps1` | Helm repo, values overlay, chart install, health check |
| `04-New-TrafficGeneratorVm.ps1` | NSG, public IP, NIC, Windows VM |
| `05-Test-LabDeployment.ps1` | Verifies everything and prints the endpoints |
| `Deploy-Lab.ps1` | Runs `00` through `05` in order, resumable with `-StartAt` |
| `Test-GatewayFromVm.ps1` | Traffic generator. Runs on the Windows VM. |
| `99-Remove-Lab.ps1` | Deletes the resource group and local state |

Every script is idempotent. Re-running one after a failure picks up where it
left off rather than erroring on an existing resource.

## Install the modules

```powershell
Install-Module Az.Accounts, Az.Resources, Az.Network, Az.Aks, Az.Compute -Scope CurrentUser
Install-Module Az.ContainerRegistry -Scope CurrentUser   # only for the Phase 6 demo

Connect-AzAccount
Set-AzContext -Subscription '<subscription id>'
```

`kubectl` and `helm` also need to be on PATH:

```powershell
az aks install-cli
winget install Helm.Helm        # or: brew install helm
```

Register the resource providers once per subscription, or AKS creation fails
with `MissingSubscriptionRegistration`:

```powershell
'Microsoft.ContainerService', 'Microsoft.Network', 'Microsoft.Compute', 'Microsoft.Storage' |
    ForEach-Object { Register-AzResourceProvider -ProviderNamespace $_ }

(Get-AzResourceProvider -ProviderNamespace Microsoft.ContainerService)[0].RegistrationState
```

Wait for `Registered`.

`01-New-LabInfrastructure.ps1` creates a role assignment, granting the AKS identity
Network Contributor on the VNet. That needs Owner or User Access Administrator on
the subscription; Contributor alone fails with `AuthorizationFailed` on
`Microsoft.Authorization/roleAssignments/write`, and the Keycloak Service then
never gets an address.

```powershell
Get-AzRoleAssignment -SignInName (Get-AzContext).Account.Id |
    Select-Object RoleDefinitionName, Scope
```

## Run it

```powershell
cd powershell

# Drop in the values.yaml downloaded from the SCM Gateway Registration wizard.
Copy-Item ~/Downloads/values.yaml .

# Optional. The defaults already match the validated free-tier lab.
code Lab.parameters.psd1

./Deploy-Lab.ps1
```

Roughly 20 minutes, most of it AKS and the VM.

To resume after a failure:

```powershell
./Deploy-Lab.ps1 -StartAt Gateway
```

Valid values: `Prerequisites`, `Infrastructure`, `Keycloak`, `Gateway`,
`WindowsVm`, `Verify`.

## Generated credentials

`.lab-state.json` holds the Keycloak and Windows passwords in clear text and
is gitignored. Read them with:

```powershell
$state = Get-Content .lab-state.json | ConvertFrom-Json
$state.KeycloakAdminPassword
$state.WindowsAdminPassword
$state.GatewayIp
$state.KeycloakIp
$state.WindowsVmPublicIp
```

Set `KeycloakAdminPassword` or `WindowsAdminPassword` in that file before the
first run to supply your own instead.

## Generating traffic

Copy `Test-GatewayFromVm.ps1` to the Windows VM through the RDP session, then:

```powershell
./Test-GatewayFromVm.ps1 `
    -GatewayIp 203.0.113.10 `
    -KeycloakIp 10.0.1.250 `
    -WorkspaceApiKey '<SCM workspace api key>' `
    -Count 20 -DelaySeconds 3
```

It has no Az module dependency, so nothing extra needs installing on the VM.

## Quota handling

`Test-LabQuota` runs before anything is created and again before the VM. The
defaults are sized for a `$200` free-credit subscription: a 4 vCPU Total
Regional Cores limit and 3 Standard public IPs.

A 2-node AKS cluster and the Windows VM cannot both run on 4 cores. Switching
between the two configurations:

```powershell
# Make room for the VM
Update-AzAksNodePool -ResourceGroupName aigw-lab-rg -ClusterName aigw-lab-aks -Name nodepool1 -NodeCount 1

# Give the cores back to AKS
Stop-AzVM -ResourceGroupName aigw-lab-rg -Name aigw-lab-win -Force   # deallocates
Update-AzAksNodePool -ResourceGroupName aigw-lab-rg -ClusterName aigw-lab-aks -Name nodepool1 -NodeCount 2
```

Pods reschedule within a minute, so the round trip is cheap and non-destructive.

A self-service quota increase through the `Microsoft.Quota` API is not offered
on free-tier subscriptions and fails with `ResourceNotAvailableForOffer`. An
Azure Portal support ticket is the only route. Once granted, raise
`RegionalCoreQuota` in `Lab.parameters.psd1` to match.

## Phase 6: the JWT demo

The PowerShell path stops at the gateway, Keycloak, and the VM. Realm
configuration, the demo app image, and its deployment live in the Terraform
module at [`../terraform/jwt-demo/`](../terraform/jwt-demo/), which drives
Keycloak's admin API through a provider rather than hand-rolled REST calls.

To prepare for it from here, set `EnableJwtAuth = $true` and
`DeployAcr = $true` in `Lab.parameters.psd1`, then:

```powershell
./01-New-LabInfrastructure.ps1     # creates the registry
./03-Install-AigwDataPlane.ps1     # turns on JWT validation
```

## Teardown

```powershell
./99-Remove-Lab.ps1
```

Prompts for the resource group name, then deletes it as a background job and
cleans up the kubeconfig context and the local state file. `-Force` skips the
prompt; `-KeepState` keeps the generated passwords for a rebuild.

## Design notes

**No `LOG_STORE`.** The chart can write prompt and response bodies to your own
Azure Blob container, and the write path works. SCM's log detail view then
fails with `Error: Resource not found` on every entry, because this
integration path is outbound only and SCM's backend cannot read a store inside
your environment. Bodies stay with the SCM backend instead.

**`Standard_D2als_v7` everywhere.** `Standard_B2s` and `Standard_B2als_v2` are
commonly rejected on free-tier subscriptions. `00-Test-Prerequisites.ps1`
checks the configured sizes against `Get-AzVMSize` before anything is created,
though a size being offered is not the same as having capacity.

**Keycloak survives a restart, not a teardown.** `start-dev` writes its H2
database to `/opt/keycloak/data`, which is mounted on a managed disk sized by
`KeycloakStorageSize`, so a pod restart keeps the realm and keeps the signing
keys behind the JWKS in SCM. Without the volume that failure is silent: SCM
serves the JWKS pasted earlier and rejects every token, with nothing in the
gateway logs pointing at Keycloak. The Deployment uses the `Recreate` strategy,
which a rolling update on a single-node cluster would deadlock anyway, and
which the ReadWriteOnce disk needs so the outgoing pod releases it first.
`99-Remove-Lab.ps1` deletes the resource group, and the disk goes with it.
