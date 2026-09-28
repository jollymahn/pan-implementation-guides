# AI Gateway on EKS, AKS, and GKE

Deploy a Prisma AIRS AI Gateway hybrid data plane on Amazon EKS, Azure AKS, or Google GKE with Helm, from cluster preparation through the cache and log store, workload identity, `values.yaml`, ingress, outbound connectivity to the management plane, and end-to-end verification.

**Related:** [Deployment Guide](ai-gateway-deployment.html) | [Hybrid Infrastructure](hybrid-infrastructure.md) | [ECS and Container Apps](serverless-deployment.md) | [LLM API Key Management](llm-api-key-management.html)

---

## Guide Approach

This is a companion to the [AI Gateway Deployment Guide](ai-gateway-deployment.html) and to the [AI Gateway Hybrid Infrastructure](hybrid-infrastructure.md) guide. It covers the three managed Kubernetes platforms: Amazon EKS, Azure AKS, and Google GKE. All three are delivered by Helm and a `values.yaml` file, so the workflow is the same on each and only the cloud-specific pieces differ.

It does not repeat licensing, activation, or the Strata Cloud Manager (SCM) configuration that follows deployment. Those live in the deployment guide and you need them whichever platform you land on. It also does not repeat the two-plane architecture discussion or the platform comparison, which live in the hybrid infrastructure guide. If you are not on Kubernetes, the Terraform path for Amazon ECS and Azure Container Apps is in [ECS and Container Apps](serverless-deployment.md).

Two terms carry the whole guide. The **data plane** is the gateway you run in your own cluster: the pods, the cache, the log store, and the load balancer in front of them. The **management plane** is the Palo Alto Networks service that holds configuration, policy, and analytics, and that you reach through Strata Cloud Manager.

Prisma AIRS AI Gateway is the Portkey gateway, acquired by Palo Alto Networks. You will see the name Portkey throughout: in chart names, repository URLs, environment variable names, hostnames, and the vendor's own documentation. The rebrand has not reached the code, so treat `portkey` and `AIRS AI Gateway` as the same product wherever they appear below.

> **Warning: Two different Helm charts exist, and this guide follows one of them.**
>
> - **`airs-gw`**, from `https://portkey-ai.github.io/airs-gw-helm`, is what the SCM Gateway Registration wizard generates. It is a shorter, opinionated install driven by the values the wizard hands you. That path is documented in Phase 2 of the [AI Gateway Deployment Guide](ai-gateway-deployment.html).
> - **`portkey-ai/gateway`**, from `https://portkey-ai.github.io/helm`, is the full chart the platform deployment pages use. It exposes the cache, the log store, the Data Service, the MCP gateway, ingress, and workload identity as configuration. This guide follows that chart.
>
> Pick one and stay on it. The two charts use different release names and different value keys, and installing both into one namespace produces two gateway Deployments competing for the same registration.

> **Warning: Before you start.** Everything below assumes two things are already done.
>
> - **Licensing and activation** &mdash; Phase 1 of the [AI Gateway Deployment Guide](ai-gateway-deployment.html). The gateway will deploy without it, but it will not serve traffic.
> - **Credentials from Palo Alto Networks** &mdash; you send your Organisation ID and the email address used at signup; they return Docker registry credentials for the gateway images and a Client Auth Key. There is no self-service path to these, and nothing in this guide works without them. Request them early, because this is the step most likely to add days to a deployment.
>
> Raise that request through your Palo Alto Networks account team, or open a case in the [Customer Support Portal](https://support.paloaltonetworks.com/) against Prisma AIRS AI Gateway. Every later step that says "contact the Palo Alto Networks team" means the same channel.
>
> Your Organisation ID is in the SCM browser URL: `https://stratacloudmanager.paloaltonetworks.com/<organisation_id>/`.

> **Note: Connectivity is outbound only.** Palo Alto Networks confirmed on 2026-09-27 that private link is not supported with Strata Cloud Manager and that the only connectivity between a gateway and the cloud is outbound from the gateway. The platform deployment pages still describe an inbound path, because they describe the Portkey product. Read [Connect the Planes](#7-connect-the-planes), step 7.4, before you build against one of those pages.

---

## Architecture

On Kubernetes the gateway is a Helm release in a namespace you own. The chart creates the Deployment, the Service, the ServiceAccount, the image pull secret, and the environment Secret. It can also create an in-cluster Redis and the optional Data Service. Everything outside the cluster, meaning the managed cache, the object store, the load balancer, and the cloud identity that ties them together, you create yourself and reference from `values.yaml`.

The shape of the deployment is the same on all three platforms: stateless gateway pods behind a load balancer, a Redis-compatible cache for synced configuration and counters, an object store for full request and response bodies, and an outbound link to the Palo Alto Networks management plane.

> **Note: Which platform should I pick?**
>
> - **Amazon EKS** &mdash; you are on AWS. Identity comes from IRSA or EKS Pod Identity, and ingress needs the AWS Load Balancer Controller installed before the chart.
> - **Azure AKS** &mdash; you are on Azure. Identity comes from workload identity, a managed identity, or an Entra app registration, and ingress uses the application routing add-on rather than a controller you install yourself.
> - **Google GKE** &mdash; you are on GCP. Identity comes from Workload Identity Federation, and ingress needs a `REGIONAL_MANAGED_PROXY` subnet in the VPC before anything else works.

### A. Amazon EKS

![AI Gateway hybrid data plane on Amazon EKS](diagrams/aigw-hybrid-aws-vpc.svg)

### B. Azure AKS

![AI Gateway hybrid data plane on Azure AKS](diagrams/aigw-hybrid-azure-vnet.svg)

### C. Google GKE

![AI Gateway hybrid data plane on Google GKE](diagrams/aigw-hybrid-gcp-vpc.svg)

---

## Deployment Requirements

### Node sizing

The published sizing is a floor for running the gateway, not a capacity model. No requests-per-second figures are published for any of the three platforms.

| Platform | Suggested node type | Minimum per node | Node count |
|---|---|---|---|
| Amazon EKS | `t4g.medium` | 2 vCPU, 4 GiB | 2, one per Availability Zone |
| Azure AKS | `B2ms` | 2 vCPU, 4 GiB | 2, one per Availability Zone |
| Google GKE | Any machine type meeting the floor | 2 vCPU, 4 GiB | 2, one per zone |

Log documents are roughly 10 KB each uncompressed. Multiply by your expected request rate and your retention window to size the bucket.

### Tooling

| Platform | Required on your workstation |
|---|---|
| Amazon EKS | AWS CLI, `eksctl`, `kubectl`, Helm v3 or above |
| Azure AKS | Azure CLI, `kubectl`, Helm v3 or above |
| Google GKE | gcloud CLI, `kubectl`, Helm v3 or above |

### What you request from Palo Alto Networks

Four of these block a step, so raise the ones you need before you start building.

| Request | Needed for | Blocks |
|---|---|---|
| Docker registry username and password | Pulling the gateway and Data Service images | Step 4.1 |
| Client Auth Key | `PORTKEY_CLIENT_AUTH` in `values.yaml` | Step 4.1 |
| AWS account ARN allow-listing | Outbound PrivateLink from EKS | Step 7.3 on AWS |
| Azure subscription allow-listing, then private endpoint approval | Outbound Private Link from AKS | Step 7.3 on Azure |
| GCP project allow-listing, then the service attachment URI and PSC connection approval | Outbound Private Service Connect from GKE | Step 7.3 on GCP |

Your Organisation ID is self-service. Read it out of the SCM browser URL.

> **Warning: `values.yaml` is a credential file.** It carries the Docker registry password and the Client Auth Key in plain text, and depending on your choices it may also carry a Redis password, an Entra client secret, or HMAC keys. Do not commit it. Add it to `.gitignore` before you write anything into it, and keep it in a secret manager or a password vault rather than in the repository that holds your cluster manifests.

---

## 1. Prepare the Cluster

The chart assumes a cluster that already exists, already has two or more worker nodes spread across zones, and already has the platform features that identity and ingress depend on. Turning those on afterwards usually means recreating something, so do this first.

### A. Amazon EKS

#### 1.1 &mdash; Set your environment variables

Every command below reuses these. Keep the shell open for the rest of the guide, or put them in a file you source.

```bash
cluster_name=<EKS_CLUSTER_NAME>               # The EKS cluster where the gateway will run
namespace=portkeyai                           # Namespace for the gateway
service_account_name=gateway-sa               # Service account the gateway pods will use
region=<AWS_REGION>

kubectl create namespace $namespace --dry-run=client -o yaml | kubectl apply -f -

mkdir -p portkey-gateway && cd portkey-gateway
printf 'values.yaml\n' >> .gitignore
touch values.yaml
```

> **Verify.** `aws eks describe-cluster --name $cluster_name --region $region --query cluster.status --output text` returns `ACTIVE`.

#### 1.2 &mdash; Confirm node count and sizing

```bash
kubectl get nodes -o custom-columns=NAME:.metadata.name,ZONE:.metadata.labels.'topology\.kubernetes\.io/zone',TYPE:.metadata.labels.'node\.kubernetes\.io/instance-type'
```

> **Verify.** at least two nodes appear, in at least two different zones, each `t4g.medium` or larger. If they are all in one zone, a single AZ failure takes the gateway down.

#### 1.3 &mdash; Associate an IAM OIDC provider

IRSA needs the cluster's OIDC issuer registered as an IAM identity provider. Skip this only if you have chosen EKS Pod Identity instead, which is covered in step 3.1.

```bash
oidc_issuer=$(aws eks describe-cluster --name $cluster_name \
  --query "cluster.identity.oidc.issuer" --output text | sed -e "s~https://~~")

# Check whether a provider already exists
aws iam list-open-id-connect-providers | grep $oidc_issuer

# If nothing is returned, create one
eksctl utils associate-iam-oidc-provider --cluster $cluster_name --approve
```

> **Verify.** re-run the `grep` and confirm it now prints a provider ARN ending in your issuer path.

#### 1.4 &mdash; Install the AWS Load Balancer Controller

Both ingress options in step 6 depend on this controller. Install it from the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/lbc-helm.html) if it is not already running, and confirm your VPC and subnets carry the [required tags](https://docs.aws.amazon.com/eks/latest/userguide/network-reqs.html).

```bash
kubectl get deployment -n kube-system aws-load-balancer-controller
```

> **Verify.** the deployment exists and reports its replicas as ready. Without it, an Ingress or a `LoadBalancer` Service will be created in Kubernetes and no AWS load balancer will ever appear.

### B. Azure AKS

#### 1.1 &mdash; Set your environment variables

```bash
CLUSTER_NAME=<AKS_CLUSTER_NAME>
RESOURCE_GROUP=<RESOURCE_GROUP_NAME>
NAMESPACE=portkeyai
SERVICE_ACCOUNT_NAME=gateway-sa

kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

mkdir -p portkey-gateway && cd portkey-gateway
printf 'values.yaml\n' >> .gitignore
touch values.yaml
```

> **Verify.** `az aks show --name $CLUSTER_NAME --resource-group $RESOURCE_GROUP --query provisioningState -o tsv` returns `Succeeded`.

#### 1.2 &mdash; Confirm node count and sizing

```bash
kubectl get nodes -o custom-columns=NAME:.metadata.name,ZONE:.metadata.labels.'topology\.kubernetes\.io/zone',TYPE:.metadata.labels.'node\.kubernetes\.io/instance-type'
```

> **Verify.** at least two nodes, in at least two zones, each `B2ms` or larger.

#### 1.3 &mdash; Enable the OIDC issuer and workload identity

Workload identity is the cleanest of the three Azure authentication modes because no secret ends up in `values.yaml`. It has to be enabled on the cluster before you can federate a credential against it.

```bash
az aks update \
  --resource-group ${RESOURCE_GROUP} \
  --name ${CLUSTER_NAME} \
  --enable-oidc-issuer \
  --enable-workload-identity

OIDC_ISSUER=$(az aks show \
  --name ${CLUSTER_NAME} \
  --resource-group ${RESOURCE_GROUP} \
  --query "oidcIssuerProfile.issuerUrl" -o tsv)
echo ${OIDC_ISSUER}
```

> **Verify.** `${OIDC_ISSUER}` prints an `https://` URL. An empty value means the update did not take, and step 3 will fail when it tries to federate against it.

#### 1.4 &mdash; Enable the application routing add-on

This is what gives you a managed NGINX ingress controller on AKS. Pass `--nginx None` so the add-on installs without creating a default controller, then create the controller you actually want in step 6.

```bash
az aks approuting enable \
  --resource-group ${RESOURCE_GROUP} \
  --name ${CLUSTER_NAME} \
  --nginx None
```

> **Verify.** `kubectl get pods -n app-routing-system` lists running pods. Skip this step if you plan to use the Azure Load Balancer with a Kubernetes Service instead of an Ingress.

### C. Google GKE

#### 1.1 &mdash; Set your environment variables

```bash
CLUSTER_NAME=<GKE_CLUSTER_NAME>
PROJECT_ID_A=<PROJECT_ID>
REGION=<GKE_CLUSTER_REGION>
VPC_NAME=<VPC_NAME>
NAMESPACE=portkeyai
KSA=gateway-sa

kubectl create namespace ${NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

mkdir -p portkey-gateway && cd portkey-gateway
printf 'values.yaml\n' >> .gitignore
touch values.yaml
```

> **Verify.** `gcloud container clusters describe ${CLUSTER_NAME} --region ${REGION} --format="value(status)"` returns `RUNNING`.

#### 1.2 &mdash; Confirm node count and sizing

```bash
kubectl get nodes -o custom-columns=NAME:.metadata.name,ZONE:.metadata.labels.'topology\.kubernetes\.io/zone',TYPE:.metadata.labels.'node\.kubernetes\.io/instance-type'
```

> **Verify.** at least two nodes, in at least two zones, each with 2 vCPU and 4 GiB or more.

#### 1.3 &mdash; Confirm Workload Identity is enabled

```bash
gcloud container clusters describe ${CLUSTER_NAME} \
  --region ${REGION} \
  --format="value(workloadIdentityConfig.workloadPool)"
```

> **Verify.** the command prints `${PROJECT_ID_A}.svc.id.goog`. If it prints nothing, enable it with `gcloud container clusters update ${CLUSTER_NAME} --region ${REGION} --workload-pool=${PROJECT_ID_A}.svc.id.goog` and confirm again before moving on.

#### 1.4 &mdash; Create the regional managed proxy subnet

GCP load balancers need an `ACTIVE` subnet with purpose `REGIONAL_MANAGED_PROXY` in the cluster's VPC. A GKE ingress that never receives an address is usually missing this subnet, and the failure is silent.

```bash
# <SUBNET_CIDR> must fall inside the VPC CIDR, for example 10.0.2.0/23
gcloud compute networks subnets create lb-subnet \
  --purpose=REGIONAL_MANAGED_PROXY \
  --role=ACTIVE \
  --region=${REGION} \
  --network=${VPC_NAME} \
  --range=<SUBNET_CIDR>
```

> **Verify.**
>
> ```bash
> gcloud compute networks subnets list \
>   --filter="purpose=REGIONAL_MANAGED_PROXY AND region:${REGION}" \
>   --format="table(name,ipCidrRange,role)"
> ```
>
> The subnet appears with role `ACTIVE`. Also confirm the HTTP Load Balancing add-on is enabled on the cluster, because the ingress path in step 6 depends on it.

---

## 2. Provision the Cache and the Log Store

The gateway needs a Redis-compatible cache for synced configuration, rate limit counters, and budget counters. It optionally needs an object store for full prompt and completion bodies. Create both now so that step 3 can scope its permissions to real resources.

> **Note: The built-in Redis is the shortcut, not the answer.** The chart ships a single-pod Redis that needs no permissions and no networking. It is fine for a proof of concept. It holds no data across a pod restart, it does not scale with the gateway, and it gives you nothing to monitor, so do not carry it into production.

> **Warning: The log store does not keep prompt content out of the cloud.** In the current AIRS release, prompt and completion bodies reach the Strata Cloud Manager backend regardless of where your log store points. A bucket in your own account is an additional copy, not a residency control. Treat it that way in any data handling conversation.

### A. Amazon EKS

#### 2.1 &mdash; Create the S3 log bucket

```bash
bucket_name=<S3_BUCKET_NAME>
aws s3api create-bucket --bucket $bucket_name --region $region \
  --create-bucket-configuration LocationConstraint=$region
aws s3api put-public-access-block --bucket $bucket_name \
  --public-access-block-configuration "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

> **Verify.** `aws s3api get-public-access-block --bucket $bucket_name` reports all four settings as `true`. Note the bucket name and region for step 4.

#### 2.2 &mdash; Provision ElastiCache

Create an ElastiCache for Redis OSS or Valkey cache in the same VPC as the cluster. Then open the path from the nodes to it.

```bash
# Allow the EKS node security group to reach the cache
aws ec2 authorize-security-group-ingress \
  --group-id <ELASTICACHE_SG_ID> \
  --protocol tcp --port 6379 \
  --source-group <EKS_NODE_SG_ID>
```

> **Verify.** from a pod in the cluster, `nc -vz <ElastiCache_Endpoint> 6379` connects. Record the endpoint: use the **Configuration Endpoint** if cluster mode is enabled, and the **Primary Endpoint** if it is not. Using the wrong one produces a connection that appears to work and then fails on the first keyspace operation.

### B. Azure AKS

#### 2.1 &mdash; Create the storage account and container

```bash
STORAGE_ACCOUNT_NAME=<STORAGE_ACCOUNT_NAME>
CONTAINER_NAME=<CONTAINER_NAME>

az storage account create \
  --name ${STORAGE_ACCOUNT_NAME} \
  --resource-group ${RESOURCE_GROUP} \
  --sku Standard_LRS \
  --allow-blob-public-access false

az storage container create \
  --name ${CONTAINER_NAME} \
  --account-name ${STORAGE_ACCOUNT_NAME} \
  --auth-mode login
```

> **Verify.** `az storage container show --name ${CONTAINER_NAME} --account-name ${STORAGE_ACCOUNT_NAME} --auth-mode login` returns the container. Note both names for step 4.

#### 2.2 &mdash; Provision Azure Managed Redis

Create an Azure Managed Redis instance reachable from the AKS cluster. If you intend to authenticate with workload identity, a managed identity, or Entra ID rather than an access key, [enable Microsoft Entra Authentication](https://learn.microsoft.com/en-us/azure/azure-cache-for-redis/cache-azure-active-directory-for-authentication) on the instance now. It cannot be added later without a restart.

> **Verify.** from a pod in the cluster, `nc -vz <Azure_Redis_Endpoint> <Port>` connects. Record the endpoint and port.

### C. Google GKE

#### 2.1 &mdash; Create the GCS log bucket

```bash
GCS_BUCKET_NAME=<GCS_BUCKET_NAME>
gcloud storage buckets create gs://${GCS_BUCKET_NAME} \
  --project=${PROJECT_ID_A} \
  --location=${REGION} \
  --uniform-bucket-level-access \
  --public-access-prevention
```

> **Verify.** `gcloud storage buckets describe gs://${GCS_BUCKET_NAME} --format="value(name,location)"` returns the bucket. Note the name and region for step 4.

#### 2.2 &mdash; Provision Memorystore

Create a Memorystore for Redis or Valkey instance in the same VPC as the cluster, then confirm the firewall permits the cluster to reach it.

> **Verify.** from a pod in the cluster, `nc -vz <MEMORY_STORE_IP> <Port>` connects.

If TLS is enabled on the instance, download its `server-ca.pem` and load it into the cluster now. The gateway reads it from a mounted volume.

```bash
kubectl create secret generic memorystore-tls-certs \
  --from-file=server-ca.pem -n ${NAMESPACE}
```

> **Verify.** `kubectl get secret memorystore-tls-certs -n ${NAMESPACE}` shows one key. You will mount it in step 4.

---

## 3. Grant the Gateway an Identity

The gateway pods need a cloud identity to write logs to the object store, and, if you chose IAM authentication on the cache, to connect to the cache. Each platform binds a cloud identity to the Kubernetes service account named in `values.yaml`, so the service account name has to match exactly across this section and step 4.

### A. Amazon EKS

#### 3.1 &mdash; Create the IAM role

Two mechanisms are available. IRSA is the older and more widely supported one, and it annotates the service account with a role ARN. EKS Pod Identity is newer, needs the Pod Identity Agent installed on the cluster, and needs no annotation. Choose one.

**IRSA:**

```bash
role_name=<IAM_ROLE_NAME>
aws_account_id=$(aws sts get-caller-identity --query Account --output text)
oidc_issuer=$(aws eks describe-cluster --name $cluster_name \
  --query "cluster.identity.oidc.issuer" --output text | sed -e "s~https://~~")

cat >trust-relationship.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${aws_account_id}:oidc-provider/${oidc_issuer}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "${oidc_issuer}:aud": "sts.amazonaws.com",
          "${oidc_issuer}:sub": "system:serviceaccount:${namespace}:${service_account_name}"
        }
      }
    }
  ]
}
EOF

aws iam create-role --role-name $role_name \
  --assume-role-policy-document file://trust-relationship.json

role_arn=$(aws iam get-role --role-name $role_name --query "Role.Arn" --output text)
echo "$role_arn"
```

**EKS Pod Identity:** install the Pod Identity Agent first, then create a role that trusts the EKS service and associate it.

```bash
role_name=<IAM_ROLE_NAME>
cat >trust-relationship.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowEksAuthToAssumeRoleForPodIdentity",
      "Effect": "Allow",
      "Principal": { "Service": "pods.eks.amazonaws.com" },
      "Action": ["sts:AssumeRole", "sts:TagSession"]
    }
  ]
}
EOF

aws iam create-role --role-name $role_name \
  --assume-role-policy-document file://trust-relationship.json

aws_account_id=$(aws sts get-caller-identity --query Account --output text)
aws eks create-pod-identity-association \
  --cluster-name $cluster_name \
  --role-arn "arn:aws:iam::${aws_account_id}:role/${role_name}" \
  --namespace $namespace \
  --service-account $service_account_name
```

> **Verify.** `echo "$role_arn"` prints the ARN. Record it. IRSA needs it in `values.yaml`; Pod Identity does not.

#### 3.2 &mdash; Attach the S3 policy

```bash
cat >s3-access-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": ["arn:aws:s3:::${bucket_name}/*"]
    }
  ]
}
EOF

aws iam put-role-policy --role-name $role_name \
  --policy-name s3-access-policy --policy-document file://s3-access-policy.json
```

> **Verify.** `aws iam list-role-policies --role-name $role_name` lists `s3-access-policy`.

#### 3.3 &mdash; Attach the ElastiCache and Bedrock policies

Attach the ElastiCache policy only if you chose IAM authentication on the cache in step 4. Attach the Bedrock policy only if the gateway routes to Bedrock models using this role rather than an API key.

```bash
elasticache_cluster_arn=<ELASTICACHE_REPLICATION_GROUP_ARN>
elasticache_user_arn=<ELASTICACHE_USER_ARN>

cat >elasticache-access-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["elasticache:Connect"],
      "Resource": ["${elasticache_cluster_arn}", "${elasticache_user_arn}"]
    }
  ]
}
EOF

aws iam put-role-policy --role-name $role_name \
  --policy-name elasticache-access-policy --policy-document file://elasticache-access-policy.json

cat >bedrock-access-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["bedrock:InvokeModel", "bedrock:InvokeModelWithResponseStream"],
      "Resource": [
        "arn:aws:bedrock:<region>::foundation-model/<model-id>",
        "arn:aws:bedrock:<region>:<account-id>:provisioned-model/<model-id>"
      ]
    }
  ]
}
EOF

aws iam put-role-policy --role-name $role_name \
  --policy-name bedrock-access-policy --policy-document file://bedrock-access-policy.json
```

> **Verify.** `aws iam list-role-policies --role-name $role_name` lists every policy you attached.

### B. Azure AKS

#### 3.1 &mdash; Create a user-assigned managed identity

```bash
MANAGED_IDENTITY_NAME=portkey-gateway-identity

az identity create \
  --name ${MANAGED_IDENTITY_NAME} \
  --resource-group ${RESOURCE_GROUP}

MANAGED_IDENTITY_CLIENT_ID=$(az identity show \
  --name ${MANAGED_IDENTITY_NAME} \
  --resource-group ${RESOURCE_GROUP} \
  --query clientId -o tsv)
echo ${MANAGED_IDENTITY_CLIENT_ID}
```

> **Verify.** a GUID prints. Record it; `values.yaml` needs it as the service account annotation.

#### 3.2 &mdash; Federate the Kubernetes service account

This is what lets the pod exchange its projected service account token for an Azure token. The `--subject` value has to match the namespace and service account name exactly.

```bash
az identity federated-credential create \
  --name portkey-gateway-federated-cred \
  --identity-name ${MANAGED_IDENTITY_NAME} \
  --resource-group ${RESOURCE_GROUP} \
  --issuer ${OIDC_ISSUER} \
  --subject system:serviceaccount:${NAMESPACE}:${SERVICE_ACCOUNT_NAME} \
  --audiences api://AzureADTokenExchange
```

> **Verify.** `az identity federated-credential list --identity-name ${MANAGED_IDENTITY_NAME} --resource-group ${RESOURCE_GROUP} --query "[].subject" -o tsv` prints your namespace and service account. A mismatch here produces an authentication failure at runtime rather than at deploy time.

#### 3.3 &mdash; Grant access to the container and the cache

```bash
STORAGE_ID=$(az storage account show \
  --name ${STORAGE_ACCOUNT_NAME} \
  --resource-group ${RESOURCE_GROUP} --query id -o tsv)

az role assignment create \
  --assignee ${MANAGED_IDENTITY_CLIENT_ID} \
  --role "Storage Blob Data Contributor" \
  --scope "${STORAGE_ID}/blobServices/default/containers/${CONTAINER_NAME}"
```

If you chose workload identity on the cache, also assign a Redis data access policy.

```bash
REDIS_NAME=<REDIS_NAME>
MANAGED_IDENTITY_OBJECT_ID=$(az identity show \
  --name ${MANAGED_IDENTITY_NAME} \
  --resource-group ${RESOURCE_GROUP} \
  --query principalId -o tsv)

az redisenterprise database access-policy-assignment create \
  --access-policy-assignment-name portkeyGatewayRedisAccess \
  --cluster-name ${REDIS_NAME} \
  --database-name default \
  --resource-group ${RESOURCE_GROUP} \
  --access-policy-name default \
  --object-id ${MANAGED_IDENTITY_OBJECT_ID}
```

If the gateway routes to Azure OpenAI or Azure AI Foundry using this identity rather than an API key, also grant `Cognitive Services OpenAI User` on that resource.

> **Verify.** `az role assignment list --assignee ${MANAGED_IDENTITY_CLIENT_ID} --all -o table` lists the role and the container scope.

### C. Google GKE

#### 3.1 &mdash; Create the Google service account

```bash
GSA=<GSA_NAME>

gcloud iam service-accounts create ${GSA} \
  --display-name="Portkey Gateway Service Account"
```

> **Verify.** `gcloud iam service-accounts describe ${GSA}@${PROJECT_ID_A}.iam.gserviceaccount.com` returns the account.

#### 3.2 &mdash; Bind it to the Kubernetes service account

```bash
gcloud iam service-accounts \
  add-iam-policy-binding ${GSA}@${PROJECT_ID_A}.iam.gserviceaccount.com \
  --role roles/iam.workloadIdentityUser \
  --member "serviceAccount:${PROJECT_ID_A}.svc.id.goog[${NAMESPACE}/${KSA}]"
```

> **Verify.** `gcloud iam service-accounts get-iam-policy ${GSA}@${PROJECT_ID_A}.iam.gserviceaccount.com` shows the binding with your namespace and KSA name.

#### 3.3 &mdash; Grant the project roles

Grant `roles/storage.objectAdmin` for the log bucket. Add `roles/redis.dbConnectionUser` only if you chose IAM authentication on Memorystore, and `roles/aiplatform.user` only if the gateway invokes Vertex AI models with this identity.

```bash
for ROLE in roles/storage.objectAdmin roles/redis.dbConnectionUser roles/aiplatform.user; do
  gcloud projects add-iam-policy-binding ${PROJECT_ID_A} \
    --member="serviceAccount:${GSA}@${PROJECT_ID_A}.iam.gserviceaccount.com" \
    --role="${ROLE}"
done
```

If the bucket, the cache, or Vertex AI lives in a different project, run the same binding against that project ID while keeping the member pointed at the service account's own project.

> **Verify.** `gcloud projects get-iam-policy ${PROJECT_ID_A} --flatten="bindings[].members" --filter="bindings.members:${GSA}@${PROJECT_ID_A}.iam.gserviceaccount.com" --format="value(bindings.role)"` lists each role you granted.

---

## 4. Build values.yaml

Everything the chart needs lives in one file. Build it in four passes: the common block, then the cache, then the log store, then the optional components. Keep the file out of version control.

### 4.1 &mdash; The common block (all platforms)

This part is identical on EKS, AKS, and GKE. `SERVICE_NAME` is a label you choose. `PORTKEY_CLIENT_AUTH` and the registry credentials come from Palo Alto Networks. `ORGANISATIONS_TO_SYNC` is your Organisation ID from the SCM URL.

```yaml
imageCredentials:
  - name: portkey-enterprise-registry-credentials
    create: true
    registry: https://index.docker.io/v1/
    username: <PROVIDED BY PALO ALTO NETWORKS>
    password: <PROVIDED BY PALO ALTO NETWORKS>

images:
  gatewayImage:
    repository: "docker.io/portkeyai/gateway_enterprise"
    pullPolicy: Always
    tag: "latest"
  dataserviceImage:
    repository: "docker.io/portkeyai/data-service"
    pullPolicy: Always
    tag: "latest"
  redisImage:
    repository: "docker.io/redis"
    pullPolicy: IfNotPresent
    tag: "7.2-alpine"

environment:
  create: true
  secret: true
  data:
    ANALYTICS_STORE: control_plane
    SERVICE_NAME: <SERVICE_NAME>
    PORTKEY_CLIENT_AUTH: <PROVIDED BY PALO ALTO NETWORKS>
    ORGANISATIONS_TO_SYNC: <ORGANISATION_ID>
```

> **Note: `tag: "latest"` is what the vendor publishes, and it is not what you want in production.** A pod restart can pull a different image than the one you validated, and there is no published compatibility matrix between chart versions and image versions. Pin both to a digest or a fixed tag for any environment you care about, and treat an upgrade as a deliberate change. <!-- TODO: verify whether Palo Alto Networks publishes versioned image tags for the enterprise gateway -->

### A. Amazon EKS

#### 4.2 &mdash; The cache block

Add one of these to `values.yaml`, merging into the `environment.data` map you already have.

Built-in Redis, for a proof of concept only:

```yaml
environment:
  data:
    CACHE_STORE: redis
    REDIS_URL: "redis://redis:6379"
    REDIS_TLS_ENABLED: "false"
```

ElastiCache with IAM authentication, which is the option that keeps a password out of the file:

```yaml
serviceAccount:
  create: true
  automount: true
  name: <SERVICE_ACCOUNT_NAME>
  annotations:
    eks.amazonaws.com/role-arn: <ROLE_ARN>        # IRSA only; omit for Pod Identity

environment:
  data:
    CACHE_STORE: aws-elastic-cache
    REDIS_URL: "redis://<ElastiCache_Endpoint>:<Port>"
    REDIS_TLS_ENABLED: "true"
    REDIS_MODE: cluster                            # Only when cluster mode is enabled
    AWS_REDIS_AUTH_MODE: iam
    AWS_REDIS_CLUSTER_NAME: <ELASTICACHE_CLUSTER_NAME>
    REDIS_USERNAME: <ELASTICACHE_USER_ID>
```

ElastiCache with an auth token instead sets `REDIS_PASSWORD: <Auth_Token>` and drops the three IAM keys. ElastiCache with no auth drops the password as well and sets `REDIS_TLS_ENABLED: "false"`.

#### 4.3 &mdash; The log store block

```yaml
serviceAccount:
  create: true
  automount: true
  name: <SERVICE_ACCOUNT_NAME>
  annotations:
    eks.amazonaws.com/role-arn: <ROLE_ARN>        # IRSA only; omit for Pod Identity

environment:
  data:
    LOG_STORE: s3_assume
    LOG_STORE_REGION: "<AWS_BUCKET_REGION>"
    LOG_STORE_GENERATIONS_BUCKET: "<AWS_BUCKET_NAME>"
```

### B. Azure AKS

#### 4.2 &mdash; The cache block

Add one of these to `values.yaml`, merging into the `environment.data` map you already have.

Azure Managed Redis with workload identity:

```yaml
serviceAccount:
  create: true
  automount: true
  name: <SERVICE_ACCOUNT_NAME>
  annotations:
    azure.workload.identity/client-id: <MANAGED_IDENTITY_CLIENT_ID>

podLabels:
  azure.workload.identity/use: "true"

environment:
  data:
    CACHE_STORE: azure-redis
    REDIS_URL: "redis://<Azure_Redis_Endpoint>:<Port>"
    REDIS_TLS_ENABLED: "true"
    REDIS_MODE: cluster                            # Only when cluster mode is enabled
    AZURE_REDIS_AUTH_MODE: workload
```

The other three modes are `password` (with `rediss://`, `REDIS_PASSWORD`, and no identity), `managed` (with `AZURE_REDIS_MANAGED_CLIENT_ID`), and `entra` (with `AZURE_REDIS_ENTRA_CLIENT_ID`, `AZURE_REDIS_ENTRA_CLIENT_SECRET`, and `AZURE_REDIS_ENTRA_TENANT_ID`). The `podLabels` entry is mandatory for `workload`, and a deployment that omits it fails to authenticate with no obvious cause.

#### 4.3 &mdash; The log store block

```yaml
environment:
  data:
    LOG_STORE: azure
    AZURE_STORAGE_ACCOUNT: <STORAGE_ACCOUNT_NAME>
    AZURE_STORAGE_CONTAINER: <STORAGE_CONTAINER>
    AZURE_AUTH_MODE: workload
```

Set `AZURE_AUTH_MODE: managed` with `AZURE_MANAGED_CLIENT_ID`, or `entra` with the three `AZURE_ENTRA_*` keys, if you chose one of those modes in step 3.

### C. Google GKE

#### 4.2 &mdash; The cache block

Add one of these to `values.yaml`, merging into the `environment.data` map you already have.

Memorystore with Workload Identity Federation:

```yaml
serviceAccount:
  create: true
  automount: true
  name: <KSA>
  annotations:
    iam.gke.io/gcp-service-account: <GSA>@<PROJECT_ID_A>.iam.gserviceaccount.com

environment:
  data:
    CACHE_STORE: gcp-memory-store
    GCP_REDIS_AUTH_MODE: workload
    REDIS_URL: "redis://<MEMORY_STORE_IP>:<Port>"
    REDIS_TLS_ENABLED: "false"
    REDIS_MODE: cluster                            # Only when cluster mode is enabled
```

If TLS is enabled on the instance, add the mount for the secret you created in step 2.2:

```yaml
environment:
  data:
    REDIS_TLS_CERTS: /etc/ssl/certs/server-ca.pem
    REDIS_TLS_ENABLED: "true"

volumes:
  - name: memorystore-tls-certs
    secret:
      secretName: memorystore-tls-certs

volumeMounts:
  - name: memorystore-tls-certs
    mountPath: /etc/ssl/certs/server-ca.pem
    subPath: server-ca.pem
```

An AUTH string instead sets `REDIS_PASSWORD` and drops `GCP_REDIS_AUTH_MODE`.

#### 4.3 &mdash; The log store block

```yaml
environment:
  data:
    LOG_STORE: gcs_assume
    GCP_AUTH_MODE: workload
    LOG_STORE_REGION: <GCS_BUCKET_REGION>
    LOG_STORE_GENERATIONS_BUCKET: <GCS_BUCKET_NAME>
```

HMAC access instead uses `LOG_STORE: gcs` with `LOG_STORE_ACCESS_KEY` and `LOG_STORE_SECRET_KEY`, and needs no service account annotation. It also puts two long-lived keys into the file, so prefer Workload Identity Federation.

### 4.4 &mdash; Optional components (all platforms)

The MCP gateway is off by default. `SERVER_MODE` accepts `""` for the AI gateway alone, `"mcp"` for the MCP gateway alone, and `"all"` for both. Leave `MCP_GATEWAY_BASE_URL` unset on the first install, because the load balancer that it points at does not exist yet. Set it on a second pass after step 6.

```yaml
environment:
  data:
    SERVER_MODE: "all"
    MCP_PORT: "8788"
    MCP_GATEWAY_BASE_URL: "https://<MCP hostname>"   # Second pass only
```

The Data Service handles batch processing, fine-tuning, and log exports. Enable it only if you need one of those.

```yaml
dataservice:
  name: "dataservice"
  enabled: true
  env:
    DEBUG_ENABLED: false
    SERVICE_NAME: "portkeyenterprise-dataservice"
  serviceAccount:
    create: false
    name: <SERVICE_ACCOUNT_NAME>
```

> **Warning: `SERVER_MODE: "all"` forces host-based ingress.** Running both gateways behind one load balancer requires `ingress.hostBased: true`, a hostname for each gateway, and two DNS records. Decide this before step 6, because switching later means rebuilding the ingress and the DNS records.

---

## 5. Install the Chart

### 5.1 &mdash; Add the repository and install

```bash
helm repo add portkey-ai https://portkey-ai.github.io/helm
helm repo update

helm upgrade --install portkey-ai portkey-ai/gateway \
  -f ./values.yaml -n $namespace --create-namespace
```

On AKS and GKE substitute `${NAMESPACE}` for `$namespace`, matching the variable you set in step 1.1.

> **Verify.** `helm status portkey-ai -n $namespace` reports `STATUS: deployed`.

### 5.2 &mdash; Confirm the pods are running

```bash
kubectl get pods -n $namespace
```

> **Verify.** every pod reports `Running` and shows its containers ready. A gateway pod, and a Redis pod if you kept the built-in cache, and a Data Service pod if you enabled it.

If a pod sits in `Pending`, `ImagePullBackOff`, or `CrashLoopBackOff`, read the events and the logs before changing anything:

```bash
kubectl describe pod <POD_NAME> -n $namespace
kubectl logs <POD_NAME> -n $namespace --tail=100
```

`ImagePullBackOff` almost always means the registry credentials in step 4.1 are wrong or were never applied. `CrashLoopBackOff` with an authentication error in the logs points at the cache or log store identity from step 3.

---

## 6. Expose the Gateway

Your applications need a stable address for the gateway. Each platform offers an Ingress path and a Service path, and the choice changes which load balancer the cloud creates. Add the block to `values.yaml` and re-run the `helm upgrade --install` command from step 5.1.

> **Warning: These examples serve plain HTTP.** Every published example listens on port 80 with no certificate, and the gateway carries workspace keys and prompt content. Attach a certificate through the platform's own annotations before any application sends real traffic. The chart does not do this for you. <!-- TODO: verify the recommended TLS annotation set per platform with the product team -->

### A. Amazon EKS

#### 6.1 &mdash; Choose ALB with an Ingress, or NLB with a Service

An ALB gives you layer-7 routing, host-based routing for `SERVER_MODE: all`, and per-path health checks. An NLB gives you layer-4 pass-through and a static IP per zone. Both require the AWS Load Balancer Controller from step 1.4.

ALB with an Ingress:

```yaml
service:
  type: ClusterIP
  port: 8787

ingress:
  enabled: true
  ingressClassName: "alb"
  # hostname: "<AI Gateway Hostname>"
  # hostBased: false
  # mcpHostname: "<MCP Gateway Hostname>"
  annotations:
    alb.ingress.kubernetes.io/load-balancer-name: portkey-gateway
    alb.ingress.kubernetes.io/scheme: internal            # 'internet-facing' to expose publicly
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/healthcheck-path: /v1/health
    alb.ingress.kubernetes.io/inbound-cidrs: <X.X.X.X/Y>  # Your application CIDRs only
    alb.ingress.kubernetes.io/manage-backend-security-group-rules: "true"
```

NLB with a Service:

```yaml
service:
  type: LoadBalancer
  port: 80
  containerPort: 8787
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
    service.beta.kubernetes.io/aws-load-balancer-internal: "true"
    service.beta.kubernetes.io/aws-load-balancer-nlb-target-type: "ip"
    service.beta.kubernetes.io/aws-load-balancer-healthcheck-path: "/v1/health"
    service.beta.kubernetes.io/aws-load-balancer-healthcheck-protocol: "http"
    service.beta.kubernetes.io/aws-load-balancer-healthcheck-port: "8787"
    service.beta.kubernetes.io/aws-load-balancer-manage-backend-security-group-rules: "true"
```

`service.containerPort` must equal `environment.data.PORT`. The chart defaults both to `8787`, so leave them alone unless you have a reason.

> **Verify.**
>
> ```bash
> kubectl get ingress -n $namespace          # ALB path
> kubectl get svc -n $namespace              # NLB path
> ```
>
> An address appears within a few minutes. If the `ADDRESS` column stays empty, check the controller logs with `kubectl logs -n kube-system deployment/aws-load-balancer-controller`.

#### 6.2 &mdash; Restrict the source range

`inbound-cidrs` on the ALB path, or the security group the controller manages on the NLB path, decides who can reach the gateway. Set it to the CIDRs your applications run in. Do not leave it at `0.0.0.0/0`, and do not add any Palo Alto Networks address; see step 7.4.

> **Verify.** from outside the allowed range, a request to the load balancer times out. From inside it, step 8 succeeds.

### B. Azure AKS

#### 6.1 &mdash; Create the NGINX ingress controller

This path uses the application routing add-on you enabled in step 1.4. Create the controller you want, external with a static public IP or internal with a private IP.

External with a static IP:

```bash
STATIC_IP_NAME=portkey-lb-static-ip

az network public-ip create \
  --resource-group ${RESOURCE_GROUP} \
  --name ${STATIC_IP_NAME} \
  --sku Standard \
  --allocation-method static

CLIENT_ID=$(az aks show --name ${CLUSTER_NAME} --resource-group ${RESOURCE_GROUP} --query identity.principalId -o tsv)
RG_SCOPE=$(az group show --name ${RESOURCE_GROUP} --query id -o tsv)
az role assignment create \
  --assignee ${CLIENT_ID} \
  --role "Network Contributor" \
  --scope ${RG_SCOPE}

kubectl apply -f - <<EOF
apiVersion: approuting.kubernetes.azure.com/v1alpha1
kind: NginxIngressController
metadata:
  name: nginx-static
spec:
  ingressClassName: nginx-static
  controllerNamePrefix: nginx-static
  loadBalancerAnnotations:
    service.beta.kubernetes.io/azure-pip-name: "${STATIC_IP_NAME}"
    service.beta.kubernetes.io/azure-load-balancer-resource-group: "${RESOURCE_GROUP}"
EOF
```

Internal with a private IP:

```bash
kubectl apply -f - <<EOF
apiVersion: approuting.kubernetes.azure.com/v1alpha1
kind: NginxIngressController
metadata:
  name: nginx-internal
spec:
  ingressClassName: nginx-internal
  controllerNamePrefix: nginx-internal
  loadBalancerAnnotations:
    service.beta.kubernetes.io/azure-load-balancer-internal: "true"
EOF
```

> **Verify.** `kubectl get nginxingresscontroller` reports the controller as available.

#### 6.2 &mdash; Point the chart at the controller

```yaml
ingress:
  enabled: true
  ingressClassName: "nginx-internal"     # or 'nginx-static'
  # hostname: "<AI Gateway Hostname>"
  # hostBased: true
  # mcpHostname: "<MCP Gateway Hostname>"
  annotations:
    service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: "/v1/health"
```

The alternative, skipping NGINX entirely, is an Azure Load Balancer fronting a Kubernetes Service:

```yaml
service:
  type: LoadBalancer
  port: 80
  containerPort: 8787
  annotations:
    service.beta.kubernetes.io/azure-load-balancer-internal: "true"
    service.beta.kubernetes.io/azure-load-balancer-health-probe-protocol: "http"
    service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: "/v1/health"
    service.beta.kubernetes.io/azure-allowed-ip-ranges: <X.X.X.X/Y>
```

Set `azure-allowed-ip-ranges` to your application CIDRs. The published example uses `0.0.0.0/0`, which exposes the gateway to everything that can route to it.

> **Verify.**
>
> ```bash
> IP=$(kubectl get ingress portkey-ai-gateway -n ${NAMESPACE} -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
> echo ${IP}
> ```
>
> An address prints. Then create a DNS record in your public or private zone pointing at it. With `SERVER_MODE: all` you create two records, one per hostname, both pointing at the same address.

### C. Google GKE

#### 6.1 &mdash; Choose the Ingress or the Service

Both depend on the `REGIONAL_MANAGED_PROXY` subnet from step 1.4 and on the HTTP Load Balancing add-on.

Application Load Balancer with an Ingress:

```yaml
ingress:
  enabled: true
  ingressClassName: gce                  # 'gce-internal' for an internal load balancer
  # hostname: "<AI Gateway Hostname>"
  # hostBased: true
  # mcpHostname: "<MCP Gateway Hostname>"
  annotations:
    kubernetes.io/ingress.class: gce     # 'gce-internal' for an internal load balancer
    ingress.gcp.kubernetes.io/healthcheck-path: /v1/health
```

Load balancer with a Service:

```yaml
service:
  type: LoadBalancer
  port: 80
  containerPort: 8787
  annotations:
    cloud.google.com/l4-rbs: "enabled"                    # External load balancer
    # networking.gke.io/load-balancer-type: "Internal"    # Internal load balancer
    spec.loadBalancerSourceRanges: "<X.X.X.X/Y>"
```

> **Verify.**
>
> ```bash
> kubectl get ingress -n ${NAMESPACE}
> kubectl get svc -n ${NAMESPACE}
> ```
>
> An address appears. A GKE ingress can take several minutes and will stay blank indefinitely if the proxy subnet from step 1.4 is missing or not `ACTIVE`, so re-check that first when nothing happens.

#### 6.2 &mdash; Restrict the source range

Set `spec.loadBalancerSourceRanges` on the Service path, or a Cloud Armor policy on the Ingress path, to your application CIDRs.

> **Verify.** a request from outside the range fails, and step 8 succeeds from inside it.

---

## 7. Connect the Planes

The gateway registers itself, pulls configuration and policy, and reports metrics and usage over an outbound connection to the management plane. Only one direction is required, and it is outbound from the gateway. The platform deployment pages also describe an inbound direction; do not build it, for the reasons in step 7.4.

### 7.1 &mdash; Allow outbound egress (all platforms)

Kubernetes permits all egress by default. If your cluster applies NetworkPolicies that restrict it, the gateway needs an explicit allowance or it will never register.

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-gateway-egress
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

Narrow that CIDR to the destinations the gateway actually needs, which are the management plane endpoints, your cache, your log store, and every model provider you route to. A broad rule is the published example, not a recommendation.

> **Verify.** `kubectl exec -n $namespace <POD_NAME> -- curl -sS -o /dev/null -w '%{http_code}\n' https://albus.portkey.ai` returns an HTTP status rather than hanging.

### 7.2 &mdash; Reach the management plane over the internet (all platforms)

The simplest path is over the internet. The gateway needs outbound access to two endpoints and nothing else changes in `values.yaml`.

- `https://aigw.portkey.ai`
- `https://albus.portkey.ai`

If you need the traffic to stay off the public internet, each cloud has a private outbound path. All three need Palo Alto Networks to allow-list your account first, so raise that request before you start.

### A. Amazon EKS

#### 7.3 &mdash; Private outbound over AWS PrivateLink

1. Send your AWS account ARN to the Palo Alto Networks team and wait for confirmation that it is allow-listed.
2. In the VPC console, in the region where the gateway runs, create an endpoint under **PrivateLink Ready partner services**.
3. For **Service name**, enter `com.amazonaws.vpce.us-east-1.vpce-svc-0c2c1c323d9f56d95`. If the gateway is outside `us-east-1`, select **Enable Cross Region endpoint**, choose `us-east-1`, and click **Verify service**.
4. Under **Network settings**, choose the gateway's VPC and at least two subnets in different Availability Zones. Attach a security group that allows inbound TCP 443 from the gateway pods.
5. Wait for the status to reach `Available`, then choose **Actions > Modify private DNS name** and enable it for the endpoint.
6. Add the basepaths to `values.yaml` and re-run the install.

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

> **Verify.** from a gateway pod, `nslookup aws-cp.portkey.ai` resolves to a private address inside your VPC. A public address means private DNS is not enabled on the endpoint.

### B. Azure AKS

#### 7.3 &mdash; Private outbound over Azure Private Link

1. Send your Azure subscription ID to the Palo Alto Networks team and wait for confirmation.
2. Create the private endpoint in the subnet where the gateway runs. `<SUBNET_ID>` is the full resource ID, not the name.

```bash
az network private-endpoint create \
  --name portkey-cp-pvt-endpoint \
  --resource-group ${RESOURCE_GROUP} \
  --subnet <SUBNET_ID> \
  --private-connection-resource-alias "portkey-privatelink-pls.4c0cb660-8f0d-49ad-beee-b234fa25cb40.eastus2.azure.privatelinkservice" \
  --connection-name portkey-cp-pvt-connection

PE_IP=$(az network nic show --ids $(az network private-endpoint show \
  --name portkey-cp-pvt-endpoint --resource-group ${RESOURCE_GROUP} \
  --query "networkInterfaces[0].id" -o tsv) \
  --query "ipConfigurations[0].privateIPAddress" -o tsv)
echo ${PE_IP}
```

3. Send the endpoint name to the Palo Alto Networks team and wait for the connection to be approved.
4. Create the private DNS zone and link it to the AKS **node group's** VNet. That VNet is in the `MC_*` resource group, not the one holding the cluster object, and `<VNET_ID>` must be the full resource ID. Getting this wrong is the usual cause of a connection that approves cleanly and then never resolves.

```bash
az network private-dns zone create \
  --resource-group ${RESOURCE_GROUP} \
  --name privatelink-az.portkey.ai

az network private-dns link vnet create \
  --resource-group ${RESOURCE_GROUP} \
  --zone-name privatelink-az.portkey.ai \
  --name portkey-gateway-vnet-link \
  --virtual-network "<VNET_ID>" \
  --registration-enabled false

az network private-dns record-set a add-record \
  --resource-group ${RESOURCE_GROUP} \
  --zone-name privatelink-az.portkey.ai \
  --record-set-name azure-cp \
  --ipv4-address ${PE_IP}
```

5. Add the basepaths and re-run the install.

```yaml
environment:
  create: true
  secret: true
  data:
    ALBUS_BASEPATH: "https://private.azure-cp.portkey.ai/albus"
    CONTROL_PLANE_BASEPATH: "https://private.azure-cp.portkey.ai/api/v1"
    SOURCE_SYNC_API_BASEPATH: "https://private.azure-cp.portkey.ai/api/v1/sync"
    CONFIG_READER_PATH: "https://private.azure-cp.portkey.ai/api/model-configs"
```

> **Verify.** from a gateway pod, `nslookup azure-cp.privatelink-az.portkey.ai` returns `${PE_IP}`.

### C. Google GKE

#### 7.3 &mdash; Private outbound over GCP Private Service Connect

1. Create a subnet in `us-east4` if you do not already have one, and an address for the endpoint.

```bash
gcloud compute networks subnets create psc-endpoint-subnet \
  --network=${VPC_NAME} \
  --range=<SUBNET_CIDR> \
  --region=us-east4

gcloud compute addresses create psc-endpoint-ip \
  --region=us-east4 \
  --subnet=psc-endpoint-subnet
```

2. Send your GCP project ID to the Palo Alto Networks team and request private connectivity. They return a `SERVICE_ATTACHMENT_URI`.
3. Create the forwarding rule against that attachment.

```bash
gcloud compute forwarding-rules create portkey-cp-pvt-endpoint-rule \
  --region=us-east4 \
  --network=${VPC_NAME} \
  --address=psc-endpoint-ip \
  --target-service-attachment=<SERVICE_ATTACHMENT_URI>

# If the cluster is outside us-east4
gcloud compute forwarding-rules update portkey-cp-pvt-endpoint-rule \
  --region=us-east4 \
  --allow-psc-global-access
```

4. Send the connection ID for approval, then confirm the status.

```bash
gcloud compute forwarding-rules describe portkey-cp-pvt-endpoint-rule \
  --region=us-east4 --format="value(pscConnectionId)"

gcloud compute forwarding-rules describe portkey-cp-pvt-endpoint-rule \
  --region=us-east4 --format="get(pscConnectionStatus)"
# Should return ACCEPTED
```

5. Create the private zone and the A record.

```bash
PSC_IP=$(gcloud compute addresses describe psc-endpoint-ip \
  --region=us-east4 --format="value(address)")

gcloud dns managed-zones create portkey-control-plane-pdz \
  --dns-name="privatelink-gcp.portkey.ai." \
  --description="DNS resolution for the AI Gateway management plane endpoint" \
  --visibility="private" \
  --networks="${VPC_NAME}"

gcloud dns record-sets create "us-east4-gcp-cp.privatelink-gcp.portkey.ai." \
  --rrdatas="${PSC_IP}" \
  --type="A" \
  --ttl=300 \
  --zone="portkey-control-plane-pdz"
```

6. Add the basepaths and re-run the install.

```yaml
environment:
  create: true
  secret: true
  data:
    ALBUS_BASEPATH: "https://us-east4-gcp-cp.privatelink-gcp.portkey.ai/albus"
    CONTROL_PLANE_BASEPATH: "https://us-east4-gcp-cp.privatelink-gcp.portkey.ai/api/v1"
    SOURCE_SYNC_API_BASEPATH: "https://us-east4-gcp-cp.privatelink-gcp.portkey.ai/api/v1/sync"
    CONFIG_READER_PATH: "https://us-east4-gcp-cp.privatelink-gcp.portkey.ai/api/model-configs"
```

> **Verify.** the gateway pod logs show no DNS resolution or connection timeout errors after the restart.

### 7.4 &mdash; Inbound is not supported with Strata Cloud Manager (all platforms)

All three platform deployment pages describe a second direction, running from the management plane inbound to your gateway over AWS PrivateLink, Azure Private Link, or GCP Private Service Connect, with IP whitelisting as the alternative. Do not build it.

Palo Alto Networks confirmed on 2026-09-27 that private link is not supported with Strata Cloud Manager today, and that the only network connectivity between a gateway and the cloud is outbound from the gateway. Those procedures describe the Portkey product, which shares the charts and the tooling but not this part of the architecture.

In practice that means three things you do not do:

- Do not create a VPC endpoint service, a Private Link Service, or a published Private Service Connect service for the gateway.
- Do not authorise `arn:aws:iam::299329113195:root`, or any Palo Alto Networks principal, into your account.
- Do not add `54.81.226.149`, `34.200.113.35`, or `44.221.117.129` to `inbound-cidrs`, `azure-allowed-ip-ranges`, `spec.loadBalancerSourceRanges`, or any security group rule. Your load balancer admits your own applications and nothing else.

A gateway registers and stays visible in Strata Cloud Manager on outbound connectivity alone. If it does not appear, the cause is in step 7.1, 7.2, or 7.3.

> **Warning: An inbound path built earlier is now an unused hole.** If a deployment predates 2026-09-27 and followed the platform pages, it may have an endpoint service with a Palo Alto Networks principal authorised, or three management plane addresses in a security group. Nothing uses either one. Remove them, and tell your account team you have done so in case they still hold a connection on their side.

> **Note: This is also the likely reason a local log store breaks the SCM log views.** On the Portkey product the Backend retrieves an individual log body from your bucket on demand, over exactly this inbound path, which is what makes a customer-held log store workable there. Without the path, Strata Cloud Manager has no way to fetch a log it does not hold. Treat that as an inference rather than a published explanation. <!-- TODO: verify whether inbound private link returns to AIRS, and whether restoring it is what unblocks SCM log views on a local log store. Tracked as question 5 in workspace/airs/aigw-product-questions.md. -->

---

## 8. Verify

Test the gateway from inside the cluster first, then through the load balancer, then confirm the request reached the management plane. Each step isolates a different failure.

### 8.1 &mdash; Test the pod directly

```bash
kubectl port-forward <POD_NAME> -n $namespace 9000:8787
```

In a second terminal:

```bash
OPENAI_API_KEY=<OPENAI_API_KEY>
PORTKEY_API_KEY=<GATEWAY_API_KEY>       # Created in Strata Cloud Manager

curl 'http://localhost:9000/v1/chat/completions' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "x-portkey-provider: openai" \
  -H "x-portkey-api-key: $PORTKEY_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "What is a fractal?"}]
  }'
```

> **Verify.** a completion returns. A 401 means the gateway API key is wrong or the gateway has not finished syncing with the management plane. A connection error means the pod is not serving on `8787`.

> **Note: The gateway API key is shown once.** Create it in Strata Cloud Manager and copy it immediately. It cannot be retrieved afterwards, only replaced.

### 8.2 &mdash; Test through the load balancer

```bash
curl 'http://<LB_ADDRESS>:<LISTENER_PORT>/v1/chat/completions' \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "x-portkey-provider: openai" \
  -H "x-portkey-api-key: $PORTKEY_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [{"role": "user", "content": "What is a fractal?"}]
  }'
```

> **Verify.** the same completion returns. If step 8.1 worked and this does not, the problem is the load balancer, the health check, or the source range from step 6, and not the gateway.

The listener port is not published for any of the three platforms. Read it from the Ingress or Service you created rather than assuming 80. <!-- TODO: verify -->

### 8.3 &mdash; Confirm the request reached the management plane

Open Strata Cloud Manager and go to **Logs**. Your test request appears there, and selecting the entry shows the full prompt and completion.

> **Verify.** the entry is present and expands. If the gateway serves traffic but nothing appears in SCM, the outbound path in step 7.2 or 7.3 is the place to look. If entries appear but their bodies do not load, and you configured a log store of your own, read the note in step 7.4.

---

## Scaling, Upgrades, and Teardown

### Scale the gateway

The gateway pods are stateless, so scaling is a replica count. Set `replicaCount` in `values.yaml` and re-run the install, or attach a HorizontalPodAutoscaler against CPU. Keep replicas spread across zones with a pod topology spread constraint so that a zone failure does not take every replica.

No requests-per-second figure is published for any platform, so size from your own load test rather than from the documentation.

### Upgrade

```bash
helm repo update
helm upgrade --install portkey-ai portkey-ai/gateway \
  -f ./values.yaml -n $namespace
```

There is no published compatibility matrix between chart versions and gateway image versions, and no tested rollback procedure. Pin your image tag, upgrade in a non-production cluster first, and keep the previous `values.yaml` so that `helm rollback` has something consistent to return to.

### Tear down

```bash
helm uninstall portkey-ai --namespace $namespace
```

`helm uninstall` removes the release. It does not remove the namespace, the cloud identity from step 3, the cache, the log bucket, or a load balancer created outside the chart. Remove those in the reverse order you created them, and delete only what this deployment created.

---

## Reference

### Endpoints, addresses, and identifiers

| Value | What it is | Used in |
|---|---|---|
| `https://portkey-ai.github.io/helm` | Helm repository for the full `gateway` chart | Step 5.1 |
| `https://portkey-ai.github.io/airs-gw-helm` | Helm repository for the SCM wizard's `airs-gw` chart | Not used in this guide |
| `aigw.portkey.ai` | Management plane, outbound over the internet | Egress allow-list |
| `albus.portkey.ai` | Configuration sync, outbound over the internet | Egress allow-list |
| `aws-cp.portkey.ai` | Management plane over AWS PrivateLink | EKS step 7.3 |
| `private.azure-cp.portkey.ai` | Management plane over Azure Private Link | AKS step 7.3 |
| `us-east4-gcp-cp.privatelink-gcp.portkey.ai` | Management plane over GCP Private Service Connect | GKE step 7.3 |
| `com.amazonaws.vpce.us-east-1.vpce-svc-0c2c1c323d9f56d95` | Endpoint service name for outbound PrivateLink | EKS step 7.3 |
| `portkey-privatelink-pls.4c0cb660-8f0d-49ad-beee-b234fa25cb40.eastus2.azure.privatelinkservice` | Private Link Service alias for outbound Private Link | AKS step 7.3 |
| `arn:aws:iam::299329113195:root` | Management plane AWS principal, published for an inbound path AIRS does not support | Do not authorise; see 7.4 |
| `54.81.226.149`, `34.200.113.35`, `44.221.117.129` | Management plane source addresses, published for an inbound path AIRS does not support | Do not allow them; see 7.4 |
| `8787` | Gateway container port and the default `PORT` | All platforms |
| `8788` | MCP gateway container port | `SERVER_MODE: "mcp"` or `"all"` |
| `/v1/health` | Health check path for every load balancer | Step 6 |

### Platform differences

| | Amazon EKS | Azure AKS | Google GKE |
|---|---|---|---|
| Suggested node type | `t4g.medium` | `B2ms` | 2 vCPU, 4 GiB or larger |
| Extra CLI | `eksctl` | None | None |
| Identity mechanism | IRSA or Pod Identity | Workload identity, managed identity, or Entra | Workload Identity Federation |
| Service account annotation | `eks.amazonaws.com/role-arn` | `azure.workload.identity/client-id` | `iam.gke.io/gcp-service-account` |
| Cache value | `aws-elastic-cache` | `azure-redis` | `gcp-memory-store` |
| Log store value | `s3_assume` | `azure` | `gcs_assume` or `gcs` |
| Ingress prerequisite | AWS Load Balancer Controller | Application routing add-on | `REGIONAL_MANAGED_PROXY` subnet |
| Ingress class | `alb` | `nginx-static` or `nginx-internal` | `gce` or `gce-internal` |
| Private outbound region | `us-east-1` | `eastus2` | `us-east4` |

### Undocumented areas

These questions come up in the field and the published material does not currently answer them. Raise them with the product team rather than inferring an answer, and treat anything below as unresolved when writing a customer commitment.

- **Throughput sizing** &mdash; no requests-per-second figures for any of the three platforms. The published CPU and memory numbers are minimums to run, not a capacity model.
- **Image and chart versioning** &mdash; every example pins `tag: "latest"`, no versioned tags are published, and no compatibility matrix exists between chart versions and image versions. <!-- TODO: verify -->
- **Upgrade and rollback** &mdash; no supported upgrade path and no tested rollback procedure.
- **TLS on ingress** &mdash; every published example serves plain HTTP, and no recommended certificate or TLS policy configuration is given for any of the three platforms. <!-- TODO: verify -->
- **Load balancer listener port** &mdash; not published, while your own firewall rules depend on it. Read it from the created Ingress or Service. <!-- TODO: verify -->
- **Region placement and data residency** &mdash; Strata Cloud Manager runs in the Americas only today, with other regions planned, and prompt bodies land there regardless of the log store setting. Retention and custody for that store are still unpublished.
- **Air-gapped deployment** &mdash; no documented configuration for a cluster with no path to `portkey.ai`.
- **TLS inspection** &mdash; behavior of the outbound links through an intercepting proxy is not described, and streaming through one is untested.
- **Private outbound regions** &mdash; the private endpoint for each cloud lives in one fixed region, and no other region is offered. Cross-region access works but adds a hop and a cost. <!-- TODO: verify whether additional regions are planned -->

> **Note: The two documentation paths no longer disagree.** The SCM Gateway Registration wizard produces an outbound-only deployment, and the platform pages this guide follows describe an inbound path as well. Palo Alto Networks confirmed on 2026-09-27 that outbound-only is correct for AIRS, so the wizard's model is the accurate one and the platform pages are describing the Portkey product. Both send prompt content to the Strata Cloud Manager backend on the default log store, so the difference was never about residency.

### Sources

This guide is derived from the published self-hosting documentation for the three Kubernetes platforms.

- **Amazon EKS** &mdash; `self-hosting/hybrid-deployments/aws/eks`
- **Azure AKS** &mdash; `self-hosting/hybrid-deployments/azure/aks`
- **Google GKE** &mdash; `self-hosting/hybrid-deployments/gcp`
- **Architecture** &mdash; `self-hosting/hybrid-deployments/architecture`

The doc pages are published twice, on `docs.portkey.ai/docs/aigw/` and on `portkey.ai/docs/`, and the two versions differ. See [SOURCES.md](SOURCES.md) in this directory for which to prefer and where the local mirrors are.
