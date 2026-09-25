# AI Gateway — Source Material

Upstream references behind the guides in this directory. Every entry is mirrored locally under
`pan-docs-reference/docs/` so it stays searchable with Grep and Read after the public page changes.

**Add a source:**

```bash
# Portkey / Mintlify doc pages (Python TLS fails on this network; the wrapper uses /usr/bin/curl)
python3 workspace/airs/scrape-curl.py --project ai-gateway --tags portkey,self-hosting URL [URL ...]
```

GitHub repositories are not handled by the scraper. Pull the raw files as described under
[Helm charts](#helm-charts) below and register the repo root in `pan-docs-reference/manifest.json`
by hand.

---

## Two Portkey doc trees, not one

Portkey publishes the hybrid deployment material twice, and the two versions are **not** copies of
each other. Check both before treating either as authoritative.

| Tree | Mirror | What it is |
|---|---|---|
| `docs.portkey.ai/docs/aigw/...` | `pan-docs-reference/docs/portkey/aigw/` | The AIRS/SCM-adapted version. Covers identity and authentication, the request lifecycle (sync vs async paths), ClickHouse split ownership, and a "What SCM deployment changes" section. |
| `portkey.ai/docs/...` | `pan-docs-reference/docs/portkey/` | The generic Portkey Enterprise version. Carries component sizing recommendations, sample log and metric files, IAM role setup, and the deployment walkthroughs in more depth. |

The AIRS tree is closer to what an SCM-managed reader sees; the generic tree is more complete on
infrastructure. The guide should prefer the AIRS tree for anything SCM-facing and fall back to the
generic tree for cluster, storage, and networking detail.

---

## Self-hosting / hybrid deployment

Fetched 2026-09-25, project `ai-gateway`, tags `portkey,self-hosting,hybrid,upstream`.

| Source URL | Local mirror | Notes |
|---|---|---|
| [portkey.ai/docs/self-hosting/hybrid-deployments/architecture](https://portkey.ai/docs/self-hosting/hybrid-deployments/architecture) | `pan-docs-reference/docs/portkey/self-hosting/hybrid-deployments/architecture.md` | Enterprise architecture: data plane vs control plane, data flow between planes, cache behavior, storage and authentication options, infrastructure requirements, sample log (4 KB) and metric (3 KB) files. |
| [portkey.ai/docs/self-hosting/hybrid-deployments/aws/eks](https://portkey.ai/docs/self-hosting/hybrid-deployments/aws/eks) | `.../hybrid-deployments/aws/eks.md` | Components and sizing, image credentials, cache store (built-in Redis and ElastiCache), log store with IRSA and EKS Pod Identity, MCP gateway, data service, **Network Configuration → Set Up External Access**, IAM role creation and permissions, control-plane integration including inbound connectivity. |
| [portkey.ai/docs/self-hosting/hybrid-deployments/azure/aks](https://portkey.ai/docs/self-hosting/hybrid-deployments/azure/aks) | `.../hybrid-deployments/azure/aks.md` | The AKS equivalent: Workload Identity, Blob Storage log store, Azure Managed Redis, external access, and control-plane integration. |
| [portkey.ai/docs/self-hosting/hybrid-deployments/aws/ecs](https://portkey.ai/docs/self-hosting/hybrid-deployments/aws/ecs) | `.../hybrid-deployments/aws/ecs.md` | Terraform, not Helm. Full module walkthrough: Secrets Manager prep (CLI and CloudFormation), remote state, the `terraform/ecs` module call, ALB vs NLB, autoscaling, blue/green and canary, outbound PrivateLink, inbound endpoint service, verification, uninstall. 33 KB. |
| [portkey.ai/docs/self-hosting/hybrid-deployments/azure/aca](https://portkey.ai/docs/self-hosting/hybrid-deployments/azure/aca) | `.../hybrid-deployments/azure/aca.md` | The Container Apps equivalent: Key Vault prep, the `terraform/aca` module call, `network_mode` none/new/existing, ACA ingress vs Application Gateway, Azure Managed Redis, outbound and inbound Private Link. 22 KB. |

Earlier AIRS-tree mirrors of the same five topics already exist at
`pan-docs-reference/docs/portkey/aigw/self-hosting/hybrid-deployments/{architecture,aws/eks,aws/ecs,azure/aks,azure/aca}.md`
(architecture, EKS, and AKS fetched 2026-09-21; ECS and ACA fetched 2026-09-25).

## Terraform modules

Not scraped; read directly from GitHub. These are the authority for what the ECS and Container Apps
deployments actually do, and they contradict the prose in at least one place (see below).

| Source | Notes |
|---|---|
| [github.com/Portkey-AI/portkey-gateway-infrastructure](https://github.com/Portkey-AI/portkey-gateway-infrastructure) | `terraform/ecs` and `terraform/aca`, each with its own `docs/` directory and variables reference. The two carry independent version tags (ECS `v2.0.0`, ACA `v1.1.3` at time of writing), so a `ref` is not portable between them. Also holds `cloudformation/secrets.yaml`, the console alternative to the ECS secret-creation CLI. |

**The Fargate finding.** The ECS docs never mention Fargate, and the module does not deploy to it by
default. With `create_cluster = true`, `terraform/ecs/cluster.tf` registers exactly one capacity
provider, backed by an EC2 Auto Scaling group, and `terraform/ecs/main.tf` resolves
`capacity_provider_name` to it. The task definition in `terraform/ecs/modules/ecs-service/main.tf`
does declare `requires_compatibilities = ["EC2", "FARGATE"]` with `awsvpc` networking, so Fargate is
reachable via `create_cluster = false` plus your own `capacity_provider_name` — but that path is
neither documented nor validated by the vendor. Documented honestly in `serverless-deployment.html`;
raised as an open question in `workspace/airs/aigw-product-questions.md`. Re-verify against the
module before changing that section.

## Helm charts

| Source URL | Local mirror | Notes |
|---|---|---|
| [github.com/Portkey-AI/helm](https://github.com/Portkey-AI/helm) | `pan-docs-reference/docs/portkey-helm/` | Upstream Portkey charts, 28 markdown and values files mirrored from `main`. Two charts: `portkey-gateway` (Hybrid data plane, the one that matters here) and `portkey-app` (Full App, a different product). |
| [github.com/Portkey-AI/airs-gw-helm](https://github.com/Portkey-AI/airs-gw-helm) | *not mirrored* | The AIRS-branded chart the deployment guide actually cites. Not yet pulled; see the open question below. |

Files worth knowing about under `docs/portkey-helm/charts/portkey-gateway/`:

| File | Why it matters |
|---|---|
| `values.yaml` | The full value surface, including the `ingress:` block (see below). |
| `docs/Configuration.md` | Value-by-value reference, 31 KB. |
| `docs/Dataplane Resiliency.md` | Replica counts, autoscaling, pod disruption budgets, topology spread. Backs the guide's "Plan for more than one replica" callout. |
| `docs/Architecture Diagrams.md` | 28 KB of architecture detail. |
| `docs/SecretManager.md` | Vault injection and `existingSecret` patterns. |
| `docs/MinioConfiguration.md` | In-cluster MinIO, used by the guide's on-prem storage tab. |
| `docs/OutboundAPIs.md`, `docs/VectorStore.md`, `docs/DataService.md`, `docs/Bedrock.md` | Referenced from the guide or its optional-extras callout. |

To re-pull the repo mirror:

```bash
DEST=pan-docs-reference/docs/portkey-helm
/usr/bin/curl -sL "https://api.github.com/repos/Portkey-AI/helm/git/trees/main?recursive=1" -o /tmp/helm-tree.json
python3 -c "import json;d=json.load(open('/tmp/helm-tree.json'));print('\n'.join(t['path'] for t in d['tree'] if t['type']=='blob' and (t['path'].endswith('.md') or t['path'].endswith('values.yaml'))))" > /tmp/helm-files.txt
while IFS= read -r p; do
  out="$DEST/$p"; mkdir -p "$(dirname "$out")"
  enc=$(python3 -c "import urllib.parse,sys;print(urllib.parse.quote(sys.argv[1]))" "$p")
  /usr/bin/curl -sfL --max-time 60 "https://raw.githubusercontent.com/Portkey-AI/helm/main/$enc" -o "$out"
done < /tmp/helm-files.txt
```

> **Note:** `while read` drops a final line with no trailing newline. Confirm the file count matches
> the tree listing before assuming the pull was complete.

---

## What this material changes in the guide

### The chart supports TLS ingress and the guide never says so

`ai-gateway-deployment.html:1492` carries a TODO noting that every Hybrid base URL in Step 3.7
(ClusterIP, NodePort, LoadBalancer, port-forward) is plain `http://`, which puts the gateway API key
on the wire in cleartext. Both charts already solve this. `portkey-gateway/values.yaml:201` and the
AIRS chart's `airs-gw/values.yaml:181` expose an identical block:

```yaml
ingress:
  enabled: false
  hostname: ""
  ingressClassName: "nginx"
  annotations: {}
  labels: {}
  tls: []
  hostBased: false        # true = separate hostnames for gateway and MCP; false = path-based
  mcpHostname: ""         # defaults to mcp.{hostname}
```

Enabling ingress with a `tls` entry gives an `https://<hostname>` base URL with no port, which is
what the TODO asks for, and `hostBased`/`mcpHostname` cover the Phase 4 MCP endpoint at the same
time. The EKS and AKS pages both have a **Network Configuration → Set Up External Access** section
covering the same ground per cloud.

### Other gaps this material can close

| Guide gap | Source to use |
|---|---|
| Step 2.4 sizing is qualitative ("scale depends on CPU and memory") | "Components and Sizing Recommendations" in `aws/eks.md` and `azure/aks.md` |
| Step 2.6's "Plan for more than one replica" cites guidance not linked anywhere | `portkey-gateway/docs/Dataplane Resiliency.md` |
| Step 5.3 has no OpenTelemetry endpoint or credential source | Sample metric file in `architecture.md`; check `Configuration.md` for the OTel value names |
| Step 3.1 provider stubs (Bedrock) lack credential fields | `portkey-gateway/docs/Bedrock.md` |
| Phase 2 says nothing about inbound control-plane connectivity | "Inbound Connectivity (Control Plane to Data Plane)" in `aws/eks.md` |

---

## Resolved

**Which chart is authoritative?** Both are, because they are the same thing. Palo Alto Networks
acquired Portkey, and Prisma AIRS AI Gateway is that product rebranded (confirmed by the product
owner, 2026-09-25). `airs-gw-helm` is the rebranded `portkey-gateway` chart, which is why the
`ingress:` blocks are byte-identical and the doc sets overlap.

Practical consequence: **upstream Portkey material is safe to treat as authoritative for AIRS AI
Gateway**, and where the AIRS tree is thinner than the generic tree, the generic tree is not a
different product. The rebrand has not reached the code, so `portkey` persists in module paths,
variable names, hostnames (`aigw.portkey.ai`, `albus.portkey.ai`), secret names
(`PORTKEY_CLIENT_AUTH`), and image names (`portkeyai/gateway_enterprise`). Guides should say this
once, up front, rather than silently renaming things the reader will see in their own terminal.

Still worth mirroring `airs-gw-helm` so the two charts can be diffed when they drift.

## Open questions

1. **Which doc tree do customers land on?** The guide links `docs.paloaltonetworks.com` and the
   `airs-gw-helm` repo. Neither of the two Portkey doc trees is linked from the guide, and the
   generic tree still says "Portkey is now PRISMA AIRS AI Gateway" at the bottom of each page.
   Decide whether these are safe to cite to customers or are internal reference only.
