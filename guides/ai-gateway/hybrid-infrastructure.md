# AI Gateway Hybrid Infrastructure

Plan, size, and prepare the infrastructure for a Prisma AIRS AI Gateway hybrid data plane on EKS, AKS, GKE, ECS, or Azure Container Apps, covering the two-plane architecture, component inventory, published sizing, outbound connectivity to the management plane, and per-platform prerequisites.

> **Guide Approach:** This is a companion to the [AI Gateway Deployment Guide](ai-gateway-deployment.html). It covers only the infrastructure a hybrid data plane needs: what runs in your environment, how big it has to be, what it talks to, and what each platform requires before you deploy. It does not repeat licensing, activation, or Strata Cloud Manager (SCM) configuration. Those live in the deployment guide, and you need them regardless of which platform you land on.

> **Warning &mdash; complete these first:**
>
> - **Path 1 (SCM wizard)** &mdash; finish [Phase 1 (License and Activate)](ai-gateway-deployment.html#license-activate) and [Phase 2 (Enable the Gateway)](ai-gateway-deployment.html#enable-gateway) in the deployment guide. The wizard's `values.yaml` carries your image pull credentials and environment secrets, so you do not request them separately.
> - **Path 2 (platform pages)** &mdash; finish Phase 1 only, and obtain two secrets from your account team, issued against your Organisation ID: Docker registry credentials (pull access to `registry.portkey.ai`) and the Client Auth Key (authenticates this data plane to the management plane sync API for your organisation).
> - **Both paths** &mdash; a workspace API key from SCM, so you can send a test request after install. [Phase 3, Step 3.8](ai-gateway-deployment.html#llm-integration) of the deployment guide covers creating one.
>
> Without those, the install will come up but never pull images or sync. On the Helm paths the two secrets go into `values.yaml` or a Kubernetes Secret (mechanics in the [AWS checklist](#prerequisites-aws-eks)); on Container Apps they go into Key Vault. Store the originals in your secret manager, treat `values.yaml` and the Key Vault entries as credentials, and never commit them. Ask your account team for the rotation procedure when they issue the secrets; this guide does not cover rotation. If a previous install is stuck in `ImagePullBackOff`, confirm with the team that the credentials are still active before you reinstall.

---

## Hybrid Architecture

Prisma AIRS AI Gateway is deployed as a two-plane system. AI traffic is processed inside your own environment. Administration, analytics, and log presentation run in the management plane behind Strata Cloud Manager. The split determines what leaves your network, which is usually the first question a security or privacy review asks.

The diagram below is the reference topology on AWS. Azure and GCP versions appear in their prerequisite sections, and the numbered flows are consistent across all three.

> **Note &mdash; connectivity is outbound only:** Palo Alto Networks confirmed on 2026-09-27 that private link is not supported with Strata Cloud Manager and that the only connectivity between a gateway and the cloud is outbound from the gateway. The platform deployment pages still describe an inbound path, because they describe the Portkey product. The diagrams in this guide no longer draw it. Read [Inbound](#inbound-is-not-supported-with-strata-cloud-manager) before you build against one of those pages.

![AI Gateway hybrid data plane on AWS](diagrams/aigw-hybrid-aws-vpc.svg)

### What runs where

The data plane processes every LLM request. The management plane is where you author configuration and read analytics. The Strata Cloud Manager API Gateway sits at the boundary and is the sole authentication authority for anything entering the management plane.

| Customer environment | Role |
|---|---|
| AI Gateway | LLM reverse proxy. Routes to providers, enforces rate limits and quotas, applies guardrails, produces analytics and raw log data. Stateless containers that scale horizontally. |
| Cache Store | Local Redis holding configuration objects, so requests are served without a round trip to the management plane. |
| Log Storage | Blob store holding the full request and response payload for every LLM call. |
| LLM Providers | The upstream models the gateway routes to, whether public, private, or self-hosted. |

| Management plane | Role |
|---|---|
| SCM API Gateway | Terminates mTLS, authenticates end users, injects identity headers. Sole authentication authority. |
| Backend | Owns all writes to MySQL. Reads ClickHouse for analytics, reads the blob store for log detail views, manages cache invalidation. |
| Dashboard | The SCM web interface for configuration, logs, and analytics. |
| MySQL | Organisations, workspaces, API keys, routing configs, guardrail definitions, entitlements, tenant mappings. The gateway never connects to it directly. |
| ClickHouse | Request metrics and guardrail results written by the gateway; audit logs written by the Backend. |
| Redis | Management plane cache for auth context, configs, rate limit counters, and circuit breaker state. |
| Blob Store | Object storage for full request and response bodies, read by the Backend to serve log detail views. |

> **Note &mdash; where prompt logs are stored:** Both tables list a blob store. By default, prompt and completion bodies go to the Strata Cloud Manager AI Gateway backend and are held in the region Strata Cloud Manager runs in, which today is the Americas only. Setting the log store to local keeps them in your own environment, at the cost of breaking log viewing from the Strata Cloud Manager management plane; Palo Alto Networks has that logged as a bug. Do not tell a customer that prompt content stays in their account unless they have taken that trade deliberately.
>
> The `LOG_STORE` mechanism described below is the Portkey product's, documented on the platform deployment pages this guide follows. Pointed at your own bucket it writes bodies there, and the Backend reads them across the link when an operator opens a log entry; `control_plane` sends them to the management plane instead. Whether any of that takes effect on an AIRS gateway is not confirmed, so treat the snippets below as the published platform-page procedure rather than as a residency control you can rely on.
>
> Until Palo Alto Networks confirms the region, retention period, and custody model for the backend log store, the honest answer to a data residency question is that full prompt content reaches Palo Alto Networks and the details are not yet published. <!-- TODO: verify with Palo Alto Networks: region, retention, and custody for backend-stored prompt logs, the AIRS configuration mechanism for log storage (which may not be LOG_STORE), and whether LOG_STORE has any effect on an airs-gw deployment. Tracked as question 9 in workspace/airs/aigw-product-questions.md. -->

### Identity and authentication

Session cookies are not used on management plane routes. Identity is established through three headers the SCM API Gateway injects into every request it forwards.

| Header | Carries | Used for |
|---|---|---|
| Tenant ID | The Palo Alto Tenant/TSG identifier | Resolved in MySQL to an internal organisation identity. Unrecognised tenants are rejected before any business logic runs. |
| User Subject | Opaque user identity from the Palo Alto JWT | Caller identity for audit entries. Never persisted in a Backend user store, because SCM owns user lifecycle entirely. |
| Scope Access | The workspace scopes the caller may access | Evaluated per request. Workspace membership tables are not consulted, so access is entirely scope based. |

The load balancer in front of the Backend terminates mTLS and forwards the verified client certificate subject. The Backend then re-verifies the certificate CN, so gateway-injected identity headers are trusted only when the caller is genuinely the SCM API Gateway.

### Request lifecycle

Only the synchronous path affects response latency. Everything else runs after the client already has its answer.

**Synchronous:**

1. **Entry** &mdash; the application sends an LLM request to the gateway in your environment.
2. **Auth and config hydration** &mdash; the gateway checks Redis for the API key, organisation context, and routing configuration. A cache miss calls the Backend over the link, which reads MySQL and returns the hydrated object for the gateway to cache.
3. **LLM proxying** &mdash; the gateway forwards the request, with any configured transformations, to the target provider. The response streams back through the gateway.
4. **Response return** &mdash; the client's request ends here.

**Asynchronous, non-blocking:**

1. **Metrics to ClickHouse** &mdash; token counts, cost, latency, model, provider, cache status, and trace identifiers, plus a pointer to the full log body. Batched.
2. **Raw log to blob store** &mdash; the complete request and response payload as a structured document. The file path matches the pointer in the ClickHouse record, which is how the Backend cross-references the two when serving log details.
3. **Usage sync** &mdash; updated usage counters, API key exhaustion events, and quota state.

Because config is cached locally, the gateway keeps serving traffic when the management plane is unreachable. It stops receiving configuration updates, not requests.

### Data residency and encryption

This is the section to bring to a data protection review.

- **Prompt content and LLM responses** &mdash; in the current AIRS release these reach the Strata Cloud Manager backend and are stored there. Treat every prompt that passes through the gateway as data that has left your environment. On the Portkey product, `LOG_STORE` pointed at your own bucket keeps bodies in your account and a single body crosses the boundary each time an operator opens that entry; that is not the AIRS GA behavior.
- **Crossing the boundary by default** &mdash; metrics (tokens, cost, latency, model, provider, trace identifiers), usage counters, configuration sync, and, in the current AIRS release, full prompt and completion bodies.
- **Log storage location** &mdash; not customer-selectable in the current AIRS release, per the note above. Region, retention, and custody for the backend store are unpublished.
- **In transit** &mdash; TLS 1.3 between planes.
- **At rest** &mdash; all management plane data encrypted, with envelope encryption for sensitive fields.
- **Bring Your Own Key (BYOK)** &mdash; optional, with AWS Key Management Service (KMS), for management plane data at rest.
- **Access control** &mdash; network-level controls restrict management plane access to authorised IPs, administrative functions use scope-based access control, all administrative actions are audit logged, and access tokens are short lived with automatic rotation.

> **Warning &mdash; region placement is still an open question:** The published architecture does not state whether the SCM tenant can be placed in the same region as your data plane, or whether hybrid deployments are constrained to a single management plane region. For a deployment with EU data residency obligations, confirm this with your account team before you design around it. See [Open Questions](#open-questions-for-the-product-team).

---

## Data Plane Components

The gateway itself is the only mandatory component. Everything else is a choice between a bundled instance and a managed service, and in most production designs you want the managed service.

### Component inventory

| Component | Required | Options |
|---|---|---|
| AI Gateway | Yes | Stateless containers. Scales horizontally. |
| Cache Store | Yes | Built-in Redis, Amazon ElastiCache for Redis OSS or Valkey, Azure Cache for Redis, GCP Memorystore. Must sit in the same VPC or VNet as the gateway. |
| Log Store | Optional | Amazon S3, Azure Blob Storage, Google Cloud Storage, any S3-compatible store, MongoDB, or Wasabi. |
| Analytics Store | Managed | ClickHouse in the management plane. Exportable to any OpenTelemetry-compatible collector. |
| Semantic Cache Store | Optional | Milvus or Pinecone, only if you want semantic caching. |
| Data Service | Optional | Batch processing, fine-tuning, and log exports. |
| MCP Gateway | Optional | Enabled through `values.yaml`. |

Sizing the log store is straightforward: each log document is roughly 10 kB uncompressed. Multiply by your request volume and retention window.

### Log object path format

Set `LOG_STORE_FILE_PATH_FORMAT` to control how log files are laid out in the bucket.

| Value | Format | Example path |
|---|---|---|
| `v1` (default) | Flat | `30/<organisation-id>/<log-id>.json` |
| `v2` | Time-hierarchical | `30/<organisation-id>/<workspace-slug>/<year>/<month>/<day>/<hour>/<log-id>.json` |

Choose `v2` if you intend to apply lifecycle rules or query by time period, which most retention policies need. Two constraints apply: changing the value affects only newly written logs, since existing objects are not migrated, and `v2` is not supported for air-gapped deployments where `LOG_STORE` is set to `control_plane`.

---

## Platform Support

Five platforms are documented, across two different delivery mechanisms. Which mechanism applies is the first thing to establish, because it changes the whole deployment workflow.

### Supported platforms and delivery method

| Platform | Delivery | Notes |
|---|---|---|
| Amazon EKS | Helm chart | Also available through AWS Marketplace. |
| Azure AKS | Helm chart | Also available through Azure Marketplace. |
| Google GKE | Helm chart | Requires a `REGIONAL_MANAGED_PROXY` subnet. |
| Amazon ECS | Terraform | Container tasks, no Kubernetes involved. |
| Azure Container Apps | Terraform | Container replicas, no Kubernetes involved. |
| Any conformant Kubernetes cluster | Helm chart | Private cloud and on-premises included. No platform-specific page exists, so the cloud pages are the model. |

> **Success &mdash; serverless containers are supported:** ECS and Azure Container Apps are both documented deployment targets with their own Terraform-based instructions. You do not need a Kubernetes cluster to run the gateway. See [ECS and Container Apps](#ecs-and-container-apps) for what changes when you go that route.

> **Note &mdash; three clouds have pages, but the support statement is broader:** EKS, AKS, GKE, ECS, and Container Apps are the only platforms with step-by-step pages. That is a documentation boundary, not a support boundary: Palo Alto Networks states that the data plane runs in any public cloud, private cloud, or on-premises Kubernetes cluster.

### On-premises and private cloud clusters

On-premises Kubernetes is supported. The Palo Alto Networks administration documentation describes hybrid as hosting the data plane in your own environment, naming any public cloud, private cloud, or on-premises Kubernetes cluster. The data plane is an ordinary container workload delivered as a Helm chart, so vSphere with Tanzu, TKG, OpenShift, RKE2, Rancher, k3s, and self-built clusters on bare metal are all valid targets.

> **Warning &mdash; supported, but not separately documented:** No on-premises page exists, so there is no vendor-published procedure to follow and no distribution-specific guidance on storage drivers or ingress controllers. Work from the requirements below and the cloud pages, and confirm the specifics with your account team before committing a customer to a date.

What the cluster has to provide, independent of platform:

| Requirement | Detail |
|---|---|
| Conformant Kubernetes | Any distribution that passes upstream conformance. No minimum managed-service tier and no cloud-specific integration. |
| Helm v3 | With enough RBAC to create the release's resources in the target namespace. |
| Two worker nodes minimum | At least 2 vCPU and 4 GiB each, matching the published cloud minimums. Spread them across failure domains if your platform has them. |
| Egress to the management plane | HTTPS on 443. Which hostnames depends on your integration path: see [Connectivity](#connectivity). |
| Image pull access | `registry.portkey.ai` for the gateway image. Bundled optional components pull from `docker.io` and `quay.io`, so a mirrored cluster needs all three mirrored. |
| An object store | Any S3-compatible endpoint, including in-cluster MinIO. Nothing requires it to be a cloud service. |
| A Redis the pods can reach | The chart can deploy its own, or point it at one you run. |
| A load balancer or ingress | To publish the gateway endpoint to your own workloads. The idle timeout must exceed your longest generation. |

> **Note &mdash; storage is where the environment actually matters:** The Kubernetes platform underneath changes nothing in the chart values. Storage does, because each provider has its own service names, environment variables, and authentication model. Pick the backend you already own rather than the one matching your cluster's location: nothing stops an on-premises cluster from writing to S3, or an EKS cluster from writing to in-cluster MinIO.

### Integration paths

Settle which path you are on before you write any `values.yaml`. The two differ in more than the chart name: they differ in which endpoints you allow, and in whether you need to involve Palo Alto Networks to complete the integration.

| | SCM Gateway Registration | Platform deployment pages |
|---|---|---|
| Chart | `airs-gw` | `portkey-ai/gateway` |
| Source | `Portkey-AI/airs-gw-helm`, `charts/airs-gw` | `https://portkey-ai.github.io/helm` |
| How you get `values.yaml` | Generated by the wizard in SCM | You write it from the platform page |
| Connectivity | Outbound only, to `api.portkey.ai` | Outbound only in practice; the pages also describe an inbound path AIRS does not support |
| Palo Alto Networks involvement | None, self-service | Required for credentials, and for the inbound link the pages describe |
| Documented in | [AI Gateway deployment guide](ai-gateway-deployment.html), Phase 2 | This guide, and `self-hosting/hybrid-deployments/` |

> **Warning &mdash; establish which path you are on before reading any further:** If your tenant offers **Add New Gateway** under Gateway Registration, you are on the first path and the deployment guide is your instructions. Everything in this guide about PrivateLink, IP allow-lists, and the management plane's AWS principal belongs to the second path and does not apply to you. The cluster requirements, sizing, and storage sections apply to both.

```bash
helm repo add portkey-ai https://portkey-ai.github.io/helm

helm upgrade --install portkey-ai portkey-ai/gateway \
  -f ./values.yaml \
  -n portkeyai \
  --create-namespace
```

---

## Sizing

Sizing recommendations are published per platform. They are minimums for a working deployment, not throughput-validated figures, so treat them as the floor and load test against your own traffic before committing to a production shape.

### Published sizing by platform

| Platform | Unit | Minimum |
|---|---|---|
| EKS | Worker node | `t4g.medium`, at least 2 vCPU and 4 GiB |
| AKS | Worker node | `B2ms`, at least 2 vCPU and 4 GiB |
| GKE | Worker node | At least 2 vCPU and 4 GiB |
| ECS | Task | At least 1 vCPU (1024 CPU units) and 2 GiB |
| Azure Container Apps | Replica | At least 1 vCPU and 2 GiB |

Note the difference in unit. On the Kubernetes platforms the figure describes a worker node; on the serverless platforms it describes a single task or replica. They are not directly comparable.

- **Node count** &mdash; at least 2 worker nodes on all three Kubernetes platforms.
- **Availability** &mdash; one node per Availability Zone is the documented best practice, and for ECS and Container Apps the equivalent is tasks or replicas spread across zones with autoscaling enabled.
- **Log volume** &mdash; roughly 10 kB per log document, uncompressed.
- **Cache placement** &mdash; the cache store must sit in the same VPC or VNet as the gateway.

> **Note &mdash; what is not published:** There are no requests-per-second figures tied to these sizes, no guidance on how the numbers scale with concurrency or payload size, and no separate sizing for the optional Data Service or a self-hosted semantic cache. Measure those yourself.

---

## Connectivity

Only one direction is required between the planes, and it is outbound from the gateway to the management plane. The platform deployment pages also describe an inbound direction; do not build it, for the reasons in [Inbound is not supported with Strata Cloud Manager](#inbound-is-not-supported-with-strata-cloud-manager) below.

> **Danger &mdash; this section describes the platform-page path only:** Everything below applies to the `portkey-ai/gateway` chart installed from the EKS, AKS, or GKE pages. If you registered your gateway through the SCM wizard and installed `airs-gw`, the connectivity model is simpler: outbound only, HTTPS on 443 to `api.portkey.ai` for configuration and analytics and to `registry.portkey.ai` for the image. No inbound rule, no public load balancer, and no private link back to Palo Alto Networks is required. That model is also the one that matches the product today, whichever chart you install. Check [Integration paths](#integration-paths) if you are not sure which you are on.

### Outbound: data plane to management plane

Two options, per cloud.

| Cloud | Private option | Internet option |
|---|---|---|
| AWS | AWS PrivateLink | Reach `https://aigw.portkey.ai` and `https://albus.portkey.ai` |
| Azure | Azure Private Link | Reach `https://aigw.portkey.ai` and `https://albus.portkey.ai` |
| GCP | Private Service Connect | Reach `https://aigw.portkey.ai` and `https://albus.portkey.ai` |

On AWS the PrivateLink service name is `com.amazonaws.vpce.us-east-1.vpce-svc-0c2c1c323d9f56d95`. If your gateway runs outside `us-east-1`, enable a cross-region endpoint pointing at `us-east-1`. Your AWS account ARN has to be whitelisted by the Palo Alto Networks team first, and you need private DNS enabled on the endpoint afterwards.

Once the endpoint is available, point the gateway at the PrivateLink base paths:

```yaml
environment:
  create: true
  secret: true
  data:
      ALBUS_BASEPATH: "https://aws-cp.portkey.ai/albus"
      CONTROL_PLANE_BASEPATH: "https://aws-cp.portkey.ai/api/v1"
      SOURCE_SYNC_API_BASEPATH: "https://aws-cp.portkey.ai/api/v1/sync"
      CONFIG_READER_PATH: "https://aws-cp.portkey.ai/api/model-configs"
```

Kubernetes allows full egress by default. If your cluster applies restrictive NetworkPolicies, the gateway needs an egress allowance covering both the management plane and your LLM providers:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-all-egress
  namespace: portkeyai
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to:
    - ipBlock:
        cidr: 0.0.0.0/0
```

Narrow that CIDR to your actual provider and management plane destinations if your security posture requires it. The example is deliberately permissive so the first deployment works.

### Inbound is not supported with Strata Cloud Manager

The platform deployment pages describe a second direction, from the management plane inbound to your gateway, over AWS PrivateLink, Azure Private Link, or GCP Private Service Connect, with IP whitelisting as the alternative. Do not build it.

Palo Alto Networks confirmed on 2026-09-27 that private link is not supported with Strata Cloud Manager today, and that the only network connectivity between a gateway and the cloud is outbound from the gateway. Those procedures describe the Portkey product, which shares the charts and the tooling but not this part of the architecture.

In practice that means you do not create an endpoint service, you do not authorise `arn:aws:iam::299329113195:root` into your account, and you do not add the published management plane addresses (`54.81.226.149`, `34.200.113.35`, `44.221.117.129`) to a load balancer security group. A gateway registers and stays visible in Strata Cloud Manager on outbound connectivity alone.

> **Warning &mdash; an inbound path you built earlier is now an unused hole:** If a deployment predates 2026-09-27 and followed the platform pages, it may have an endpoint service with a Palo Alto Networks principal authorised, or three addresses in a security group. Nothing uses either. Remove them.

> **Note &mdash; this is also the likely reason a local log store breaks the SCM log views:** On the Portkey product the control plane retrieves an individual log from your bucket on demand, over exactly this inbound path. Without it, Strata Cloud Manager has no way to fetch a log it does not hold. Treat that as an inference rather than a published explanation. <!-- TODO: verify whether inbound private link returns to AIRS, and whether restoring it is what unblocks SCM log views on a local log store. Tracked as question 5 in workspace/airs/aigw-product-questions.md. -->

### Verify the integration

Do not rely on pod status. A gateway that starts cleanly and passes health checks can still be failing to reach the management plane.

1. Send a test request to the gateway with `curl`.
2. Open Strata Cloud Manager and go to **Logs**.
3. Confirm the request appears and that you can open it and see full details.

```bash
curl '<GATEWAY_BASE_URL>/v1/chat/completions' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <OPENAI_API_KEY>" \
  -H "x-portkey-provider: openai" \
  -H "x-portkey-api-key: <PORTKEY_API_KEY>" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "What is a fractal?"}]
  }'
```

Wait about a minute; pods report to the management plane roughly every 30 seconds. Replace `portkeyai` in the commands below with your release namespace if you used the SCM wizard's `values.yaml`.

- **The curl fails** &mdash; check `kubectl get pods -n portkeyai` and `kubectl logs -n portkeyai <gateway-pod>` for image pull or startup errors and return to the checklist for your platform. If a pod is stuck in `ImagePullBackOff`, run `kubectl describe pod -n portkeyai <pod>` and check the Docker credentials against the ones issued for your Organisation ID. If a pod is in `CrashLoopBackOff`, check `kubectl logs -n portkeyai <pod>` for a missing environment value and compare against the [Outbound](#outbound-data-plane-to-management-plane) and log store snippets. Re-run `helm upgrade --install` after correcting `values.yaml`.
- **The request succeeds but never appears in Logs** &mdash; the outbound path is working and the log or sync path is not. Check **Connection Status** and **Last Sync** under Gateway Registration, look for sync errors in the gateway pod log, then re-check the base paths in [Outbound](#outbound-data-plane-to-management-plane).
- **The entry exists but the log detail view is empty** &mdash; check the `LOG_STORE` settings in `values.yaml` rather than connectivity.

---

## Prerequisites: AWS (EKS)

The AWS topology is the one drawn in [Hybrid Architecture](#hybrid-architecture). The checklist below is that diagram expressed as things to build before you deploy.

> **Note &mdash; full procedure in a separate guide:** This section is the planning checklist. The step-by-step deployment, with cluster preparation, the cache and log store, workload identity, the `values.yaml` file, the Helm install, ingress, management plane connectivity, and verification, is in [AI Gateway on EKS, AKS, and GKE](kubernetes-deployment.md).

### AWS checklist

- **EKS cluster** &mdash; at least 2 worker nodes, ideally one per Availability Zone.
- **Tooling** &mdash; AWS CLI, kubectl, Helm v3 or above, and eksctl.
- **S3 bucket** &mdash; for LLM access logs, with encryption at rest and a lifecycle policy matching your retention requirement.
- **Bucket access** &mdash; either IAM Roles for Service Accounts (IRSA) or EKS Pod Identity. Both avoid static credentials. Create an IAM role trusted by the cluster's OIDC provider (IRSA) or by `pods.eks.amazonaws.com` (Pod Identity), with `s3:PutObject`, `s3:GetObject`, and `s3:ListBucket` on `arn:aws:s3:::<AWS_BUCKET_NAME>` and `arn:aws:s3:::<AWS_BUCKET_NAME>/*` (confirm the exact action list against the EKS platform page). With IRSA, `eksctl create iamserviceaccount --name <SERVICE_ACCOUNT_NAME> --namespace portkeyai --cluster <CLUSTER> --attach-policy-arn <POLICY_ARN> --approve` creates both the role and the annotated service account. With Pod Identity, `aws eks create-pod-identity-association --cluster-name <CLUSTER> --namespace portkeyai --service-account <SERVICE_ACCOUNT_NAME> --role-arn <ROLE_ARN>` makes the association.
- **Cache store** &mdash; ElastiCache for Redis OSS or Valkey in the same VPC, or the built-in Redis.
- **External access** &mdash; an Application Load Balancer with a Kubernetes Ingress, or a Network Load Balancer. With no inbound path to back, the choice is yours to make on its merits.
- **Connectivity** &mdash; per [Connectivity](#connectivity).
- **Credentials from Palo Alto Networks** &mdash; per the warning at the top of this guide. Create the pull credential as a `kubernetes.io/dockerconfigjson` Secret in `portkeyai` and reference it from `imagePullSecrets` rather than pasting it into `values.yaml`; put the Client Auth Key in a Secret referenced by the chart or delivered by your secrets operator. Anything that does go through `values.yaml` is stored in the Helm release Secret in the namespace, so restrict `get secrets` on `portkeyai` accordingly.

The snippet below is the published platform-page procedure for the Portkey chart. The key AIRS uses for a local log store is not confirmed, so on the SCM wizard path (`airs-gw`) these keys may have no effect; see the log storage note under [Hybrid Architecture](#hybrid-architecture) for the trade a customer-held bucket involves before you plan around one. With IRSA, the service account carries the role ARN annotation and the log store is configured in the same file:

```yaml
serviceAccount:
  create: true
  automount: true
  name: <SERVICE_ACCOUNT_NAME>
  annotations:
    eks.amazonaws.com/role-arn: <ROLE_ARN>

environment:
  data:
    LOG_STORE: s3_assume
    LOG_STORE_REGION: "<AWS_BUCKET_REGION>"
    LOG_STORE_GENERATIONS_BUCKET: "<AWS_BUCKET_NAME>"
```

For EKS Pod Identity the configuration is the same minus the annotation, since the association is made outside the chart. The service account name must match the one you referenced when creating the IAM role.

*Verify before moving on:* `kubectl get pods -n portkeyai` should show every pod `Running`, and a test request should appear in SCM Logs.

---

## Prerequisites: Azure (AKS)

Azure uses the same topology with Azure equivalents substituted. The boundary behaves identically.

> **Note &mdash; full procedure in a separate guide:** This section is the planning checklist. The step-by-step deployment, with cluster preparation, the cache and log store, workload identity, the `values.yaml` file, the Helm install, ingress, management plane connectivity, and verification, is in [AI Gateway on EKS, AKS, and GKE](kubernetes-deployment.md).

![AI Gateway hybrid data plane on Azure](diagrams/aigw-hybrid-azure-vnet.svg)

### Azure checklist

- **AKS cluster** &mdash; at least 2 worker nodes, ideally one per availability zone.
- **Workload Identity** &mdash; recommended. Requires the OpenID Connect (OIDC) issuer and Workload Identity both enabled on the cluster (`az aks update` with `--enable-oidc-issuer --enable-workload-identity`). Without it the gateway authenticates to Blob Storage with a storage account key held in `values.yaml`, which then lives in the Helm release Secret; if you take that route, use a key you can rotate and scope the account's network rules to the AKS subnet.
- **Tooling** &mdash; Azure CLI, kubectl, and Helm v3 or above.
- **Storage account and container** &mdash; for logs, with encryption at rest and a lifecycle rule for retention.
- **Cache store** &mdash; Azure Cache for Redis in the same VNet, or the built-in Redis.
- **External access** &mdash; an internal load balancer in front of the gateway Service or Ingress. No Private Link Service and no dedicated subnet for one is needed.
- **Connectivity** &mdash; Azure Private Link or internet, outbound only. There is no inbound path to build.
- **Credentials from Palo Alto Networks** &mdash; as for AWS.

> **Note &mdash; Azure Marketplace:** The gateway is listed on Azure Marketplace, which lets you deploy from the Azure console and streamlines procurement. Worth checking before you build the cluster by hand, particularly if procurement is the long pole.

---

## Prerequisites: GCP (GKE)

GKE follows the same pattern as EKS and AKS, with one networking requirement that catches people out on the first deployment.

> **Note &mdash; full procedure in a separate guide:** This section is the planning checklist. The step-by-step deployment, with cluster preparation, the cache and log store, workload identity, the `values.yaml` file, the Helm install, ingress, management plane connectivity, and verification, is in [AI Gateway on EKS, AKS, and GKE](kubernetes-deployment.md).

![AI Gateway hybrid data plane on GCP](diagrams/aigw-hybrid-gcp-vpc.svg)

### GCP checklist

- **GKE cluster** &mdash; at least 2 worker nodes, ideally one per zone.
- **Proxy-only subnet** &mdash; the cluster VPC needs an `ACTIVE` subnet with purpose `REGIONAL_MANAGED_PROXY` in the cluster region, or the regional load balancer never provisions and Helm reports nothing. Create it first: `gcloud compute networks subnets create <NAME> --network=<VPC> --region=<REGION> --range=<CIDR> --purpose=REGIONAL_MANAGED_PROXY --role=ACTIVE`. Confirm with `gcloud compute networks subnets list`, filtering on purpose `REGIONAL_MANAGED_PROXY`, that one subnet in your region shows role `ACTIVE`.
- **Workload Identity** &mdash; must be enabled on the cluster and on the node pool before the bucket binding below will work.
- **Tooling** &mdash; gcloud CLI, kubectl, and Helm v3 or above.
- **Cloud Storage bucket** &mdash; for logs. Bind the gateway's Kubernetes service account to a Google service account with `roles/iam.workloadIdentityUser`, then grant that Google service account `roles/storage.objectAdmin` on this bucket only, using bucket-level IAM rather than project-level. `roles/storage.objectAdmin` also permits deletion, so prefer a custom role carrying only `storage.objects.create` and `storage.objects.get` if your policy forbids the gateway deleting its own logs.
- **Cache store** &mdash; Memorystore for Redis or Valkey in the same VPC, or the built-in Redis.
- **External access** &mdash; an internal load balancer in front of the gateway Service or Ingress. You do not publish it as a service attachment.
- **Connectivity** &mdash; Private Service Connect or internet, outbound only. There is no inbound path to build.
- **Credentials from Palo Alto Networks** &mdash; as for AWS.

> **Warning &mdash; create the proxy-only subnet first:** The `REGIONAL_MANAGED_PROXY` subnet is a prerequisite of the VPC, not of the chart, so nothing in the Helm output will tell you it is missing. The symptom is a load balancer that never provisions.

---

## ECS and Container Apps

Both serverless container platforms are deployed with Terraform rather than Helm, so the workflow differs from the Kubernetes platforms in more than just the target. The modules are published in the [portkey-gateway-infrastructure](https://github.com/Portkey-AI/portkey-gateway-infrastructure) repository, at `//terraform/ecs` and `//terraform/aca`. Each carries its own version tags, so do not copy a `ref` between them.

> **Note &mdash; full procedure in a separate guide:** This section is the planning checklist. The step-by-step deployment, with architecture diagrams, the module configuration for each platform, ingress options, management plane connectivity, and verification, is in [AI Gateway on ECS and Container Apps](serverless-deployment.md).

The Terraform minimums genuinely differ between the two: v1.13 for ECS and v1.5 for Container Apps. On the cache store, Azure Managed Redis is the current name for the managed service; where the AKS material says Azure Cache for Redis it means the same product under its former name.

### Amazon ECS

- **Sizing** &mdash; ECS tasks with at least 1 vCPU (1024 CPU units) and 2 GiB per task.
- **Availability** &mdash; run tasks across multiple Availability Zones with autoscaling enabled.
- **AWS permissions** &mdash; to create ECS, EC2, VPC, ELB, IAM, S3, Secrets Manager, and CloudWatch resources. Run Terraform from a role scoped to those services, not from an administrator identity.
- **Tooling** &mdash; AWS CLI with credentials configured, and Terraform v1.13 or later.
- **State and re-runs** &mdash; configure a remote backend before the first apply so a failed run can be resumed; `terraform apply` is safe to re-run against the same state, and `terraform destroy` removes everything the configuration created. If local state was lost after a partial apply, import or delete the orphaned resources before re-applying. State holds resource identifiers and configuration, so keep it in an encrypted, access-controlled backend.
- **Secrets** &mdash; you create the Docker credentials and the Client Auth Key in AWS Secrets Manager yourself, before Terraform runs. The module is given the secret ARNs, not the values, and the task definition resolves each ARN at task start, so raw secret values do not enter Terraform state.
- **Log store** &mdash; Amazon S3 or any S3-compatible store, optional.
- **Cache store** &mdash; built-in Redis, or ElastiCache for Redis OSS or Valkey in the same VPC.
- **Compute model** &mdash; with `create_cluster = true` the module registers one capacity provider backed by an EC2 Auto Scaling group, so tasks run on container instances you own. Fargate is not a documented option; see [ECS Fargate](serverless-deployment.md#fargate) in the ECS and Container Apps guide for what the module actually supports.
- **Connectivity** &mdash; outbound to the management plane endpoints. There is no inbound path to build, so the load balancer type is yours to choose on its merits.

### Azure Container Apps

- **Sizing** &mdash; Container Apps with at least 1 vCPU and 2 GiB per replica.
- **Availability** &mdash; autoscaling across multiple Availability Zones.
- **Azure permissions** &mdash; to create Container Apps, Key Vault, Storage, VNet, and Application Gateway resources.
- **Tooling** &mdash; Azure CLI with credentials configured, and Terraform v1.5 or later.
- **Secrets** &mdash; Docker credentials, the Client Auth Key, and your Organisation ID are stored in Key Vault rather than passed as chart values.
- **Log store** &mdash; Azure Blob Storage or any S3-compatible store, optional.
- **Cache store** &mdash; built-in Redis or Azure Managed Redis.
- **Network** &mdash; a VNet is optional, which is unique among the supported platforms. It becomes mandatory for zone redundancy, Application Gateway, and outbound Private Link.
- **Connectivity** &mdash; outbound to the management plane endpoints. There is no inbound path to build.

The Key Vault entries the Terraform configuration expects are `docker-username`, `docker-password`, `portkey-client-auth`, and `organisations-to-sync`. Create the vault with RBAC authorisation enabled and grant yourself the Key Vault Administrator role before writing them. The module is given the secret names and the vault to resolve them against, not the values, so raw secret values do not enter Terraform state.

---

## Registration and Workspaces

Registration is what connects a self-hosted gateway to the management plane, and workspaces are what decide who may route through it. The two are configured together.

### Gateway registration (SCM wizard path)

If you finished Phase 2 of the deployment guide, your gateway is already registered and this section is background; do not click **Add New Gateway** again, since that creates a second gateway. Registration connects the gateway to the management plane and sets which workspaces may route through it. It is done once, in the SCM wizard under **AI Security → AI Gateway → Admin Settings → Gateway Registration → Add New Gateway**, and is covered click by click in [Phase 2 of the deployment guide](ai-gateway-deployment.html#enable-gateway). The wizard's Workspace Provisioning stage offers Allow All Workspaces or Allow Specific Workspaces; Allow Specific Workspaces is the right choice when you need separate gateways per team, business unit, or compliance boundary.

<!-- TODO: verify whether an existing registration row under Gateway Registration has an edit action for changing Workspace Provisioning (Allow All versus Allow Specific, toggling workspaces on) without a reinstall, or whether the only path is a new registration (WR-20) -->

Two points matter for infrastructure planning. First, the generated `values.yaml` targets the `airs-gw` chart, points at `registry.portkey.ai`, and is not a drop-in for the platform-page `values.yaml` this guide describes. Second, after the wizard closes the gateway appears in the list with a copyable Slug Name (for example `dp-ai-gateway-5aa51a`), its Type, a Connection Status, whether it is the Default, and Last Sync. Connection Status stays **Unknown** with Last Sync showing `--` until running pods check in; after that they check in roughly every 30 seconds. Once pods are Running, the row should update within a couple of minutes. If it still reads Unknown after that, the pods are not reaching `api.portkey.ai`: check `kubectl logs -n <namespace> <gateway-pod>` for authentication or connection errors and confirm egress on 443. The guide cannot confirm whether the file has a validity window; if the pods report an authentication failure, register a new gateway and reinstall from the new file.

<!-- TODO: verify whether the wizard-generated values.yaml expires on a timer or stays valid until used (WR-16) -->

> **Danger &mdash; the generated values.yaml is shown once:** It is not retrievable after you navigate away from that screen. Download it and store it in a secret manager before you go anywhere else. It carries your image pull credentials and environment secrets, so treat it as credentials and never commit it. Helm also stores this file inside the cluster, in the release Secret in the gateway namespace, one copy per revision; restrict `get` and `list` on Secrets in that namespace to the operators who need it. If you lose the file, there is no way to regenerate it for the same gateway: register a new gateway with Add New Gateway (use a new Gateway Name; the guide cannot confirm whether duplicate names are rejected), download the new `values.yaml`, remove the orphaned entry from the list so an unused registration with live credentials does not linger, and install only against the new file.

Total Gateways counts hybrid gateways only. The counter reads zero on a tenant already serving traffic through the SaaS gateway, because the SaaS gateway is a separate row above the list rather than an entry in it, so an empty list does not mean AI Gateway is unlicensed or inactive. The SaaS gateway stays enabled and any client still using the SaaS Gateway URL continues to send prompts to the Palo Alto Networks hosted plane. Once your clients are repointed at the hybrid endpoint and verified, switch the SaaS row's toggle off so no traffic can leave your network by the old path.

> **Note &mdash; this flow installs airs-gw, not portkey-ai/gateway:** The `values.yaml` the wizard generates targets the `airs-gw` chart and points at `registry.portkey.ai`. It is not a drop-in for the `values.yaml` the platform pages in this guide describe. The screen's Configuration Reference and Deployment guide links both resolve into the public [Portkey-AI/airs-gw-helm](https://github.com/Portkey-AI/airs-gw-helm) repository, which stays readable after the wizard closes.

For the full click-by-click walkthrough of this wizard, with screenshots taken from a live tenant, see Phase 2 of the [AI Gateway deployment guide](ai-gateway-deployment.html).

### What a workspace is

Workspaces are sub-organisations that separate data, teams, scope, and visibility inside one organisation. They are the unit of multi-tenancy within a tenant.

- **Team management** &mdash; members are added with a role of manager or member.
- **Dedicated API keys** &mdash; each workspace has its own, either Service Account type for automation or User type for individuals. Both are scoped to the workspace and can only act within it.
- **Completion API scoping** &mdash; completion APIs are always scoped by workspace and reachable only with a workspace API key.
- **Admin control** &mdash; only org admins create workspaces; managers can then add API keys and members.
- **Targeting from the org level** &mdash; admin keys can specify a `workspace_id` to act on a particular workspace.

Access is enforced through the Scope Access header described in [Identity and authentication](#identity-and-authentication), evaluated per request. Membership tables are never consulted at request time.

Deleting a workspace requires removing every resource inside it first, including prompts, prompt partials, providers, configs, and guardrails. The default Shared Team Workspace cannot be deleted, and deletion elsewhere is permanent.

---

## Operations

### Monitoring

Two independent paths, and you want both.

- **Prometheus metrics** &mdash; the gateway serves `GET /metrics` on its own container port, 8787, for infrastructure-level monitoring in your own stack. `ENABLE_PROMETHEUS` defaults to `true`; setting it to `false` makes the path return 404.
- **The metrics endpoint is unauthenticated by default** &mdash; the published behaviour is "Authentication: Typically open". Because it shares the gateway's container port rather than sitting on a separate admin port, any ingress that exposes the gateway also exposes `/metrics` unless you block the path.
- **Analytics export** &mdash; ClickHouse analytics can be exported to any OpenTelemetry-compatible collector, which is how you get gateway telemetry into an existing observability platform.

The SCM dashboard covers request-level analytics. It does not replace infrastructure monitoring of the pods, nodes, cache, and load balancer, which stays your responsibility.

### Cache behavior and FIPS

- **Cache behaviour** &mdash; documented separately at `self-hosting/cache-behavior`, covering what is cached, for how long, and how invalidation propagates from the management plane.
- **FIPS-compliant images** &mdash; available for deployments with FIPS 140 obligations. Confirm availability for your entitlement and platform.
- **Air-gapped** &mdash; setting `LOG_STORE` to `control_plane` appears in the documentation in the context of air-gapped deployments, and the `v2` log path format is explicitly unsupported in that mode. A full air-gapped deployment procedure is not published.

### Upgrades

On the Kubernetes platforms an upgrade is a Helm upgrade against the same release and values file:

```bash
helm repo update

helm upgrade --install portkey-ai portkey-ai/gateway \
  -f ./values.yaml \
  -n portkeyai
```

Cluster upgrades are separate and remain entirely yours. The managed control plane version, the node pool version, and the gateway chart version all move independently, and nothing in the product coordinates them.

> **Warning &mdash; lifecycle policy is not published:** The supported Kubernetes version range, whether a chart compatibility matrix exists, whether a minimum data plane version is required to keep syncing, the deprecation and end-of-life policy, and whether rollback to a previous chart version is safe are all unpublished. Get these from your account team before you build a patching schedule around assumptions.

---

## Reference

### Endpoints and addresses

| Purpose | Value | Path |
|---|---|---|
| Outbound, configuration and analytics | `api.portkey.ai` on 443 | SCM registration |
| Image pull | `registry.portkey.ai` | SCM registration |
| Outbound over the internet | `https://aigw.portkey.ai`, `https://albus.portkey.ai` | Platform pages |
| Outbound over AWS PrivateLink | `https://aws-cp.portkey.ai` | Platform pages |
| AWS PrivateLink service name | `com.amazonaws.vpce.us-east-1.vpce-svc-0c2c1c323d9f56d95` | Platform pages |
| Management plane AWS principal | `arn:aws:iam::299329113195:root` | Platform pages |
| Management plane source addresses | `54.81.226.149`, `34.200.113.35`, `44.221.117.129` | Platform pages |
| Helm repository | `https://portkey-ai.github.io/helm` | Platform pages |
| Default namespace | `portkeyai` | Platform pages |

The two groups are not interchangeable. Allowing the platform-page endpoints on a gateway installed from the SCM wizard does nothing useful, and vice versa.

### Which source wins when they disagree

Prisma AIRS AI Gateway is Portkey, acquired by Palo Alto Networks and integrated with Strata Cloud Manager. Documentation from before and after that integration is still in circulation, and the two disagree on real things: button labels, endpoint names, which chart you install, and whether the management plane ever connects inbound. On that last point the answer is now settled: it does not. Resolve conflicts in this order:

1. **The tenant itself.** A screenshot from a live SCM tenant beats any document. The [AI Gateway deployment guide](ai-gateway-deployment.html) is written this way and is the closest thing to ground truth we hold.
2. **`docs.paloaltonetworks.com`.** The Prisma AIRS administration documentation, for support statements, scale, and availability.
3. **`docs.portkey.ai`.** Detailed and largely current, and the only source for the platform-specific deployment procedures, but it carries pre-acquisition terminology and describes the `portkey-ai/gateway` path rather than the SCM wizard.

Most of this guide is sourced from the third. Where the first two contradict it, they have been applied and the conflict noted in place.

### Open questions for the product team

These are not documented anywhere in the published material. Each one changes a design decision, so get answers before committing a customer to an architecture.

- **Two integration paths** &mdash; are the SCM Gateway Registration path and the platform deployment pages converging, and which should a new customer be put on? The connectivity difference is resolved, since outbound-only is correct for both, but they still differ on chart and endpoints.
- **On-premises procedure** &mdash; support is confirmed for any conformant Kubernetes cluster, but no on-premises page exists. Is one planned, and is there distribution-specific guidance on storage classes and ingress that the cloud pages do not surface?
- **Region and data residency** &mdash; can the SCM tenant be placed in the same region as the data plane, and does hybrid satisfy EU data residency obligations?
- **Upgrade lifecycle** &mdash; supported Kubernetes version range, chart compatibility matrix, minimum data plane version for sync, deprecation policy, and rollback safety.
- **Throughput sizing** &mdash; requests per second at the published node and task sizes, and how that scales with concurrency and payload size.
- **Air-gapped** &mdash; is there a supported fully disconnected mode beyond the `LOG_STORE: control_plane` references? Hybrid is not it: the data plane holds a local cache and keeps serving through a management plane outage, but it still requires the outbound link. The nearest thing that exists upstream is a second chart, `portkey-app`, which deploys the management plane into your own environment as a licensed add-on. Ask whether Palo Alto Networks sells and supports that under Prisma AIRS, because it is a different product from the one this guide covers.
- **Streaming and inspection** &mdash; behaviour of streaming responses through an inspecting proxy, and any published position on TLS inspection of the management plane path.

### Source documentation

This guide is derived from the published Prisma AIRS AI Gateway self-hosting documentation. The local reference copies live in `pan-docs-reference/docs/portkey/aigw/`.

- **Architecture** &mdash; `self-hosting/hybrid-deployments/architecture`
- **Platform guides** &mdash; `self-hosting/hybrid-deployments/` for `aws/eks`, `aws/ecs`, `aws/marketplace`, `azure/aks`, `azure/aca`, and `gcp`
- **Registration** &mdash; `self-hosting/hybrid-deployments/gateway-registration`
- **Components** &mdash; `product/enterprise-offering/components`
- **Workspaces** &mdash; `product/enterprise-offering/org-management/workspaces`
- **Operations** &mdash; `self-hosting/prometheus-metrics`, `self-hosting/cache-behavior`, `self-hosting/fips-compliant-images`

Two Palo Alto Networks sources override the above wherever they conflict, per [Which source wins when they disagree](#which-source-wins-when-they-disagree):

- **Administration documentation** &mdash; `pan-docs-reference/docs/ai-runtime-security/administration/configure-ai-gateway.md`, for the hybrid support statement and the scale and availability attributes.
- **Tenant-verified walkthrough** &mdash; Phase 2 of the [AI Gateway Deployment Guide](ai-gateway-deployment.html), for the registration wizard, the `airs-gw` chart, and the outbound-only connectivity model.
