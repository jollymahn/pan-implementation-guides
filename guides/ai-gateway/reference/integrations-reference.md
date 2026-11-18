# Reference sheet: AI Gateway provider integrations

Working artifact for the `docs/guides/ai-gateway/integrations/` set. Pass 1 of the
research-first workflow in `GUIDE-TEMPLATE.md` section 12. Overwrite freely.

Compiled 2026-11-17.

## Source precedence

Per the project's AIRS source precedence rule: SCM tenant screenshots beat
`paloaltonetworks.com`, which beats `portkey.ai`. Where a tenant screenshot and the
Portkey doc disagree, the screenshot wins and the disagreement gets recorded here.

| Rank | Source | What it covered |
|---|---|---|
| 1 | Five SCM tenant screenshots, captured 2026-11-17 | The Add LLM Integration wizard, OpenAI only |
| 2 | `https://portkey.ai/docs/product/model-catalog/workload-identity-federation` (modified 2026-11-02) | The whole WIF path, both providers, both IdPs |
| 3 | `https://portkey.ai/docs/product/model-catalog/connect-bedrock-with-amazon-assumed-role` (modified 2026-11-17) | Bedrock assumed role, trust policy, session tags |
| 4 | `https://portkey.ai/docs/product/model-catalog/integrations` (modified 2026-08-07) | Wizard overview, provisioning, budgets, rate limits |

## Tenant-verified facts (screenshots)

Navigation path: `AI Security / AI Gateway / Integrations / LLM Integrations / Add LLM Integration`.
A workspace selector sits at the top left, showing `Default Workspace`.

The wizard has four numbered steps in a left rail:

1. Select A Provider
2. Integration Details
3. Workspace Provisioning
4. Model Provisioning

Primary buttons are `Next: Set Details` on step 1 and `Next: Choose Workspace` on step 2.

**Provider count is 82.** The page reads `Total Available Providers (82)`. The Portkey
doc says "50+" in one place and "200+" in another, and both are wrong for this tenant.
Use 82, and say it was counted in the tenant on 2026-11-17.

Provider rows visible in the picker, in the order the UI lists them (not alphabetical,
so preserve this order in any table that reproduces it):

| Provider | Description as shown |
|---|---|
| Open AI | The most popular set of models for text chat image and voice. |
| Anthropic | Anthropic offers models for text generation like Claude & more. |
| Google | Making AI helpful for everyone |
| Azure OpenAI | Azure OpenAI provides SOTA models deployed on MS Azure. |
| Azure Foundry | Azure AI exposes API to communicate with diverse set of foundational models |
| Bedrock | Deploy Scalable, Reliable, and Secure Generative AI Applications Using Amazon Web Services |
| Bedrock Mantle | Amazon Bedrock Mantle provides OpenAI-compatible API endpoints for model inference |
| Claude Platform on AWS | Access Claude full platform capabilities through AWS with Anthropic-managed infrastructure |
| Vertex AI | Vertex AI is a machine learning (ML) platform that lets you train and deploy models and AI applications, and customize la… |
| X AI | xAI offers an API interface for developers to programmatically interact with Grok. |
| Meta AI | Meta Model API provides Muse Spark models through Responses, Chat Completions, and Messages APIs |

Note the product spells it `Open AI` with a space in the picker. OpenAI's own field
names use `Organization ID` with the US spelling. Both are verbatim product terms.

### Step 2 field inventory, OpenAI

Fields above the Authentication Type control, in UI order:

| Field | Required | Placeholder |
|---|---|---|
| Name | Yes (marked `*`) | `Enter` |
| Short Description | No (labeled `Optional`) | `Enter` |
| Slug | Not marked required | `Enter` |

`Authentication Type` is a three-way radio group rendered as three side-by-side cards:
`API Key`, `OAuth Client Credentials`, `Workload Identity Federation`. API Key is
selected by default.

Fields below the control change with the selection:

| Auth type | Fields, in UI order | Placeholders seen |
|---|---|---|
| API Key | API Key | `Enter API Key`, with a `Grab API Key` link on the right of the label |
| OAuth Client Credentials | Token Endpoint, Client ID, Client Secret, Scope (optional) | `https://auth.example.com/oauth2/token`, `Enter Client ID`, `Enter Client Secret`, `e.g. api/read api/write` |
| Workload Identity Federation | Token Endpoint, Client ID, Client Secret, Scope (optional), Audience (optional), Identity Provider ID, Service Account ID | as above, plus `e.g. api://<app-id>/.default`, `Enter Audience`, `Enter OpenAI Identity Provider ID`, `Enter OpenAI Service Account ID` |

Below the auth fields, all three paths show the same three collapsed controls:
`Optional Fields`, `Advanced Options`, and a `Pricing Adjustments` toggle, default off.
The contents of Optional Fields and Advanced Options were not expanded in any
screenshot, so they are an open gap.

Note the Scope placeholder differs between the two OAuth-bearing paths: the plain OAuth
path shows a generic `api/read api/write`, the WIF path shows the Entra-shaped
`api://<app-id>/.default`. The last two field labels are provider-prefixed
(`Enter OpenAI Identity Provider ID`), which is the UI telling you these two fields are
provider-specific rather than generic OAuth fields.

## Auth path support matrix

This is the single most important fact for the set, and it contradicts the assumption
that three paths apply everywhere.

**All four providers are now tenant-verified**, captured 2026-11-17. Everything in this
section comes from screenshots, not documentation. Where it contradicts portkey.ai, the
screenshots win.

**The vendor documentation's provider list for WIF is wrong.** The WIF page states twice
that federation is for "**OpenAI** and **Anthropic**" only. Azure OpenAI has a
`Workload Identity` mode and Bedrock has `OAuth Client Credentials`. Do not repeat the
doc's limit.

**There is no single control.** Each provider names its own, and the option counts differ:
three, two, four and five.

| Provider | Control label | Options, in UI order | Count |
|---|---|---|---|
| OpenAI | `Authentication Type` | `API Key`, `OAuth Client Credentials`, `Workload Identity Federation` | 3 |
| Anthropic | `Authentication Type` | `API Key`, `Workload Identity Federation` | 2 |
| Azure OpenAI | `Azure Authentication Mode` | `Default`, `Managed`, `Azure Entra`, `Workload Identity` | 4 |
| Bedrock | `AWS Auth Type` | `AWS Access Key`, `AWS Assumed Role`, `AWS Service Role`, `API Key`, `OAuth Client Credentials` | 5 |

There is no parent control above any of these. The control sits directly below `Slug`.

### Field sets, per provider and mode

**OpenAI** (`aigw-int-openai-auth-*.png`), unchanged from the earlier capture.

**Anthropic** (`aigw-int-anthropic-auth-*.png`). Two options only. Anthropic does **not**
offer `OAuth Client Credentials` as a separate path.

| Mode | Fields, in UI order |
|---|---|
| `API Key` | API Key |
| `Workload Identity Federation` | Token Endpoint, Client ID, Client Secret, Scope (optional, placeholder `api://<app-id>/.default`), Audience (optional), Federation Rule ID (`Enter Anthropic Federation Rule ID`), Organization ID (`Enter Anthropic Organization ID`), and below the fold the Service Account ID and Workspace ID the docs describe |

**Azure OpenAI** (`aigw-int-azure-openai-auth-*.png`). `Azure Resource Name` follows the
mode-specific fields in every mode, then the `Foundation Model` block.

| Mode | Fields, in UI order |
|---|---|
| `Default` | **API Key** (`Enter API Key`). `Default` is the API key path, confirmed. |
| `Managed` | Azure Managed ClientID (optional) (`Enter Managed ClientID`) |
| `Azure Entra` | **Use Entra Federated Authentication** (checkbox, unchecked by default), Azure Entra ClientID, Azure Entra Secret (`Enter Entra Client Secret`), Azure Entra Tenant ID |
| `Workload Identity` | Azure Workload ClientID, Azure Workload Tenant ID |

Azure `Workload Identity` is **Azure AD workload identity**, a client ID and a tenant ID.
It is not the OpenAI-style token-exchange federation and has no token endpoint, no
Identity Provider ID and no Service Account ID. It is for a gateway running on Azure
compute, so it is a self-hosted path in practice. The `Azure Entra` mode carries its own
`Use Entra Federated Authentication` checkbox, which is a third federation variant whose
effect on the field set was not captured.

**Bedrock** (`aigw-int-bedrock-auth-*.png`). `AWS Region` is the last field in every mode.

| Mode | Fields, in UI order |
|---|---|
| `AWS Access Key` | AWS Secret Access Key, AWS Access Key Id, AWS Region |
| `AWS Assumed Role` | AWS Role ARN, AWS External Id (optional), AWS Region |
| `AWS Service Role` | AWS Region only. No credential field at all. |
| `API Key` | API Key, AWS Region |
| `OAuth Client Credentials` | Token Endpoint, Client ID, Client Secret, Scope (optional), AWS Region |

`AWS Service Role` takes no credential, so it is the gateway using the role of the compute
it runs on: an EC2 instance profile, an ECS task role or an EKS pod identity. That makes it
self-hosted only, and it is the AWS equivalent of the Azure `Managed` mode.

### Azure Foundry, tenant-verified 2026-11-17

Captured in `aigw-int-azure-foundry-auth-*.png`. This closes the "Information gap" that
`ai-gateway-model-prerequisites.html` section 7 has carried since it was written.

Azure Foundry uses the **same** `Azure Authentication Mode` control as Azure OpenAI, with
the same four options and the same mode-specific field sets:

| Mode | Mode-specific fields |
|---|---|
| `Default` | API Key (`Enter API Key`) |
| `Managed` | Azure Managed ClientID (optional) (`Enter Managed ClientID`) |
| `Azure Entra` | Use Entra Federated Authentication (checkbox), Azure Entra ClientID, Azure Entra Secret, Azure Entra Tenant ID |
| `Workload Identity` | Azure Workload ClientID, Azure Workload Tenant ID |

**The endpoint fields are where it differs, and the difference is the whole point.** After
the mode-specific fields, every mode shows these three, then `Advanced Options` and
`Pricing Adjustments`:

| Field | Placeholder | Required |
|---|---|---|
| Azure Target URI | `Enter Azure Foundry URL` | Yes |
| Azure API Version | `Enter Azure API Version` | Yes |
| Azure Deployment Name (optional) | `Enter Azure Deployment Name` | No |

| | Azure OpenAI | Azure Foundry |
|---|---|---|
| Endpoint field | `Azure Resource Name`, the first label of the host | `Azure Target URI`, a full URL |
| Deployments | A `Foundation Model` block holding many entries, each with its own API version, one marked default | One optional `Azure Deployment Name`, and one `Azure API Version` for the integration |
| Model dropdown | `Select Azure Foundation Model` | None |

So Azure OpenAI models many deployments inside one integration, and Azure Foundry does
not. A customer with several Foundry deployments therefore needs several integrations, or
has to rely on the caller naming the deployment. That is a real design consequence and it
is worth stating, but the behavior when `Azure Deployment Name` is left empty was not
captured, so do not assert how routing resolves in that case.

Azure Foundry has no `Optional Fields` section, matching Azure OpenAI and Bedrock.

### The Azure Foundation Model block

Captured in `aigw-int-azure-openai-foundation-model.png`. It sits on the main form, not
under `Advanced Options`, which settles where the deployment entries live.

Header controls: `+ Add Model` and `+ From Target URI`, with an info icon.

Each entry has: **Deployment Name** (`Type here...`), **Alias Name** (`Type here...`, info
icon), **API Version** (defaults to `v1`, with an `Edit` affordance), **Foundation Model**
(a dropdown, `Select Azure Foundation Model`), a **Make it default model** checkbox
(checked by default), and `Discard` and `Save` buttons.

`Alias Name` is new and is not in any prior source. It is plausibly what lets a caller use
a friendly name instead of the deployment name, which would soften the
deployment-name-is-not-a-model-name trap, but its behavior was not captured. Do not
assert what it does.

### Section inventory below the credential fields

Azure OpenAI shows `Advanced Options` and `Pricing Adjustments` but **no** `Optional
Fields` section. Bedrock shows `Advanced Options` and `Pricing Adjustments`, also with no
`Optional Fields`. OpenAI shows all three. So `Optional Fields` is not universal, and the
OpenAI Organization ID and Project ID are the likely reason it exists there.

### Step 4, model provisioning, tenant-verified 2026-11-17

Captured in `aigw-int-model-provisioning-pricing.png`. This step is identical for every
provider, so it lives in `docs/shared/snippets/aigw-int-model-provisioning.html` and is
generated into each provider page. Edit the snippet, never the generated block.

Header `Select Models to Provision`, subtitle "Pick the models you want to enable. You can
change this anytime." A `Models (389)` count with a `Search...` box, `Select All` and
`Deselect All` links, then one card per model carrying the model name, a `Set Pricing`
button and an enable toggle. Below the list, a toggle reading **Automatically enable new
models from this provider**, off by default. The primary button is `Create Integration`.

`Set Pricing` opens a right-hand drawer titled **Update Base Model**:

| Control | Detail |
|---|---|
| Add custom pricing for this model? | Toggle, off by default. "Default public model pricing from the base model if not specified. Fine tuned models use public fine tuned model pricing." |
| Input Cost | `Enter` |
| Output Cost | `Enter` |
| Cache Pricing | JSON, prefilled with `cache_write_input_token.price` of `3.75` and `cache_read_input_token.price` of `0.3` |
| Pricing Adjustments | Toggle, off by default, with an info icon |
| Custom Host (Optional) | `https://your-custom-endpoint.com` |
| Custom Headers (Optional) | Header and value pairs, `+ Add Header`, bin icon per row |

Buttons are `Cancel` and `Apply`. Custom host and custom headers are per model, which
matches the documented behavior that model-level headers override integration-level ones.

### Security Keys, tenant-verified 2026-11-18

The downstream half, captured at `AI Security / AI Gateway / Security Keys`. A workspace
selector sits above the breadcrumb, so this page is workspace-scoped.

Page title **Security Keys**, subtitle "Configure your security keys to manage access".
One tab, **Gateway API Keys**, with two sub-tabs: **Service** and **User**. This confirms
in the console what configuration chapter 8 step 4.1 describes, and it is the reason the
three attribution levels on `identity-and-clients.html` are real rather than theoretical.

A search box and a `Reset` link sit above a count reading `Total Gateway API Keys (n)`,
with `+ Create New` on the right. The table columns are: Key Name, Key (masked by the
product, with a copy icon), Status (a colored dot plus `Active`), Created By (avatar plus
display name), Last Updated, and Type (a badge reading `Service` or `User`), followed by
edit, duplicate and delete icons.

The product masks the key value itself in this list, so the only redaction a capture needs
is the Created By column. The published screenshot
`aigw-int-security-keys.png` is the empty state of a workspace with no keys, which carries
the Service and User tabs and the column headings while containing no identity at all.

Empty state text: **No Gateway API Keys Created**, "Create gateway API keys to authenticate
requests and manage secure access to your AI Gateway resources.", with a `Create New`
button.

**This page is not Secret References.** Security Keys issues the credential a client
presents *to* the gateway. Secret References points the gateway *at* a vault for the
provider credential. They are different directions and different chapters, 8 and 3.

### RESOLVED: Secret Ref is absent on this tenant

Checked 2026-11-18. The tenant has no **Secret References** area in the admin panel, which
matches chapter 3's statement that the capability requires gateway **2.2.4 or higher** and
that the area is absent below it. So the missing toggle is a version floor, not a product
defect and not a documentation error.

Guidance updated accordingly: configuration chapter 9 now carries an availability warning
and presents the toggle steps as conditional, the OpenAI page leads with pasting the key
and treats Secret Ref as the conditional branch, and the three pages that listed this as an
open question now record it as answered. The exact gateway version was not captured, so the
pages say "confirm the version on the customer tenant" rather than naming this tenant's.

The detail below is kept because it is the evidence trail.

### The Secret Ref toggle is not visible anywhere

Published configuration chapter 9 instructs the reader to switch the credential field to
**Secret Ref** and select a reference created in chapter 3. **No Secret Ref toggle appears
beside any credential field in any of the sixteen captured forms**, across OpenAI,
Anthropic, Azure OpenAI, Azure Foundry and Bedrock, covering API keys, client secrets, AWS
secret access keys and Entra secrets.

This was observed independently while three separate provider pages were written, and
confirmed against the images. It does not prove the capability is gone: it may be
entitlement-gated, it may require a secret reference to exist first, or it may have moved.
It does mean chapter 9's instruction cannot be followed as written in this tenant.

Resolve this before the set is published, because chapter 3 exists to support it and
several pages tell readers to use it. Check whether any secret reference is configured in
the tenant, then re-open a credential field.

## The two-credential model

The set documented the upstream half and never named the downstream half. This section is
the basis for `integrations/identity-and-clients.html`.

Every request crosses two authentication boundaries with two unrelated credentials:

| | Upstream, gateway to provider | Downstream, client to gateway |
|---|---|---|
| Credential | The integration credential configured in step 2 | A workspace API key, or a JWT |
| Held by | The gateway, encrypted at rest | The calling application |
| Scope | One per integration, shared by every workspace provisioned to it | One workspace |
| Owns | Provider access and provider-side spend | Caller identity, budgets, rate limits, logging |

### What the provider sees

**One principal per integration, regardless of how many people are behind it.** Sourced,
not inferred:

- The OpenAI WIF service account mapping resolves to a single service account, and the
  Anthropic federation rule targets a single service account.
- `agent-identity-entra.html` states it in the flow diagram description: identity resolves
  through claim precedence, then "egress to Azure AI Foundry on a different credential".
- Bedrock STS session tags exist because AWS cannot otherwise distinguish callers sharing
  one role, and the documented purpose is attributing cost "while sharing a single assumed
  role". Even then the tags carry application, team and environment, not individual people.

Consequence: the provider invoice is one line per integration. Per-user chargeback can only
come from gateway data. Per-user access revocation happens at the gateway, never at the
provider.

### A personal provider key is a testing shortcut, not a design

Nothing stops an engineer pasting a personal OpenAI or Anthropic key into an integration,
and it works. Three reasons it fails in production, worth saying to a customer directly:

1. Organization traffic is bound to one individual's account and stops when they leave.
2. The provider's rate and spend limits become that individual's limits.
3. Provider-side cost records attribute the whole organization to one person.

Both providers have service-account constructs, which is what the WIF mappings target. Use
one of those.

### How a caller reaches the gateway

Two mechanisms, with different attribution granularity:

| Mechanism | Attribution granularity | Set up in |
|---|---|---|
| Workspace API key | Per workspace. Every application sharing the key is indistinguishable. | Chapter 8 |
| JWT with validated claims | Per user, by `email_id` then `sub` then `uid` precedence, matched against workspace membership | Chapter 2, `agent-identity-entra.html` |

Chapter 2 records only two key types: an **Admin API key**, organization wide, for
administrative automation, and a **Workspace API key**, one workspace, which is what
application teams receive. Do not hand an admin key to an application.

Per-user attribution through JWT needs gateway 2.21.0 or higher, which carries email-based
attribution of JWT callers to workspace users.

### Client configuration, the three values

From `ai-gateway-model-prerequisites.html` section 1, already published:

| Value | Set to |
|---|---|
| Base URL | The gateway address |
| API key | **The gateway API key**, not the provider key |
| Model reference | `@<slug>/<model-name>` |

A fourth is needed for clients that send a bare model name and cannot put the slug in the
model field: the header `x-portkey-provider: @<slug>`. Claude Code is one such client.
`ai-gateway-client-apps.html` lists which clients need it and which cannot be routed.

SDK path trap already recorded: the OpenAI SDK wants the base URL **with** `/v1`, the
Anthropic SDK wants it **without**, because the Anthropic SDK adds its own path.

### One credential, one provider-side quota

Mechanism, stated without numbers: every workspace provisioned to an integration shares
that integration's single provider credential, so they share whatever rate limit the
provider applies to it. Gateway rate limits divide that ceiling between workspaces. They
cannot raise it. Funnelling an organization through one credential concentrates all of its
traffic into one provider-side bucket, and the provider returns its own throttling error
when that bucket is exhausted, independently of any gateway limit being reached.

Mitigation that follows from the set: separate integrations per environment or per business
unit, each with its own credential, which is also the slug convention chapter 9 recommends.

**Unverified and must be marked so:** the specific tier numbers, the exact error the gateway
surfaces when the provider throttles rather than the gateway, and whether the gateway
retries or passes a provider 429 straight through. Retries and fallbacks are configurable
per configuration chapter 12, so the answer is likely "it depends on the config object",
but that was not tested.

### Open question worth asking the product team

OpenAI's API accepts a `user` parameter for abuse monitoring, which is the one field that
could carry a per-caller identifier to a provider. Whether the gateway forwards it, drops
it, or overwrites it is not documented anywhere consulted. If it forwards it, it is the
only per-user signal that reaches a provider. Do not assert either way.

### Still open

1. The contents of `Advanced Options`, for every provider. Never expanded.
2. The contents of OpenAI's `Optional Fields`. Never expanded.
3. What `Alias Name` does in the Azure Foundation Model block.
4. What the `Use Entra Federated Authentication` checkbox changes.
5. The fields below the fold on the Anthropic WIF form.
6. What the `Grab API Key` link does.
7. Whether `Endpoint Type` still exists. Not visible on any captured form.

## WIF: how the exchange works

Two hops, not one.

1. The gateway sends a `client_credentials` request to the customer IdP token endpoint.
   The IdP returns a signed JWT for the gateway's client app.
2. The gateway exchanges that JWT with the model provider.

| Provider | Provider token endpoint | Grant |
|---|---|---|
| OpenAI | `https://auth.openai.com/oauth/token` | RFC 8693 token exchange (`subject_token`) |
| Anthropic | `https://api.anthropic.com/v1/oauth/token` | RFC 7523 JWT bearer (`assertion`) |

The provider verifies the JWT signature against the IdP public keys, checks `iss`, `aud`
and `sub` against its configured rules, then issues a short-lived access token for a
service account. Both tokens are cached. **Provider tokens are cached for no more than
15 minutes.** Rotating the client secret invalidates the cache. This 15-minute figure is
also the revocation window: disabling the mapping or rule takes effect within 15 minutes.

The IdP must support the client credentials grant with `client_secret_post`, return a
signed JWT access token rather than an opaque token, and publish OIDC discovery at
`/.well-known/openid-configuration` plus a JWKS on a public HTTPS URL (or allow the
provider to take an uploaded or linked JWKS).

The gateway sends Scope as the `scope` form parameter and Audience as the `audience`
form parameter. Audience is only needed when the IdP requires it, as Auth0 does.

### IdP values, Microsoft Entra ID

Two app registrations: an API app that is the audience, and a client app that is the
gateway's identity.

API app (`portkey-wif-api`): set the Application ID URI to `api://<api-app-client-id>`
under Expose an API. In the manifest set `requestedAccessTokenVersion` to `2` (legacy
manifest: `accessTokenAcceptedVersion`), which makes Entra issue v2 tokens with a stable
issuer.

Client app (`portkey-wif-client`): create a client secret under Certificates & secrets.
Optionally add an app role on the API app with Allowed member types Applications, grant
it to the client app under API permissions, then grant admin consent.

| Gateway field | Entra value |
|---|---|
| Token Endpoint | `https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token` |
| Client ID | Client ID of `portkey-wif-client` |
| Client Secret | The secret value |
| Scope | `api://<api-app-client-id>/.default` |
| Audience | Leave empty |

Resulting token claims:

| Claim | Value |
|---|---|
| `iss` | `https://login.microsoftonline.com/<tenant-id>/v2.0` |
| `aud` | Client ID of `portkey-wif-api`, a GUID |
| `sub` | Object ID of the `portkey-wif-client` **service principal**, found under Enterprise applications, **not** the app registration object ID |

That `sub` distinction is the single most common Entra mistake. Call it out.

Entra access tokens last 60 to 90 minutes, which matters for Anthropic's max JWT lifetime.

### IdP values, Okta

Client credentials with custom scopes require a **custom authorization server**. The Okta
org authorization server does not support them.

Set up: Security → API → Authorization Servers, use `default` or create `portkey-wif`.
Set its Audience, for example `api://portkey-wif`. Add a scope such as `portkey.wif`.
Under Access Policies add a policy assigned to the client app with a rule allowing the
Client Credentials grant and that scope.

Client app: Applications → Create App Integration → API Services, named
`portkey-wif-client`, using client secret authentication (`client_secret_post`).

| Gateway field | Okta value |
|---|---|
| Token Endpoint | `https://<okta-domain>/oauth2/<auth-server-id>/v1/token` |
| Client ID | Client ID of `portkey-wif-client` |
| Client Secret | The client secret |
| Scope | `portkey.wif` |
| Audience | Leave empty |

Resulting token claims:

| Claim | Value |
|---|---|
| `iss` | `https://<okta-domain>/oauth2/<auth-server-id>` |
| `aud` | The authorization server Audience, for example `api://portkey-wif` |
| `sub` | Client ID of `portkey-wif-client` |

### Verifying the token before configuring the provider

The provider side needs the exact `iss`, `aud` and `sub` from a real token, so request one
and decode it locally. The doc is explicit that production tokens must not be pasted into
third-party JWT websites.

```
curl -s -X POST "<token-endpoint>" \
  -d grant_type=client_credentials \
  --data-urlencode client_id="<client-id>" \
  --data-urlencode client_secret="<client-secret>" \
  --data-urlencode scope="<scope>" \
  | jq '.access_token | split(".")[1] | gsub("-"; "+") | gsub("_"; "/") | . + ("=" * ((4 - length % 4) % 4)) | @base64d | fromjson | {iss, aud, sub, iat, exp}'
```

The payload is unpadded base64url, which is why the `jq` filter pads it before decoding.

### Provider side, OpenAI

Needs permission to manage Workload Identity Providers in the OpenAI organization.

Create an OIDC provider at Organization Settings → Security → Workload Identity Provider
(`https://platform.openai.com/settings/organization/security/workload-identity-provider`):

| Field | Entra ID | Okta |
|---|---|---|
| OIDC Issuer URL | `https://login.microsoftonline.com/<tenant-id>/v2.0` | `https://<okta-domain>/oauth2/<auth-server-id>` |
| Audience | Client ID of `portkey-wif-api` | Authorization server Audience |

Leave custom discovery and uploaded JWKS off: OpenAI fetches keys from the issuer
discovery document.

Then add a service account mapping from the provider details page:

| Field | Value |
|---|---|
| Key | `sub` |
| Value | Entra: service principal object ID. Okta: client ID |
| Project | The project the gateway should use |
| Service account | Create one or select an existing one |
| Permissions | Optional. Restrict to what the gateway needs, for example model inference |

Use exact values, not wildcards. **If more than one enabled mapping matches, OpenAI
rejects the exchange.**

Copy out: Identity Provider ID (from the provider) and Service Account ID (from the
mapped service account). Those are the two provider-prefixed fields in the SCM wizard.

Further reading: `https://developers.openai.com/api/docs/guides/workload-identity-federation`
for CEL attribute transformations and JWKS options.

### Provider side, Anthropic

Needs an Anthropic organization admin. Configure in Claude Console → Workload identity,
or through the Admin API (`https://platform.claude.com/docs/en/api/administration-api`).

1. Create a service account, add it to the workspace the gateway should use, copy the
   Service Account ID.
2. Register a federation issuer:

| Field | Entra ID | Okta |
|---|---|---|
| Issuer URL | `https://login.microsoftonline.com/<tenant-id>/v2.0` | `https://<okta-domain>/oauth2/<auth-server-id>` |
| JWKS | OIDC discovery | OIDC discovery |
| Max JWT lifetime | `5400` or higher, because Entra tokens last up to 90 minutes | Default (`3600`) |
| Check JTI (replay protection) | Not applicable, Entra tokens have no `jti` | **Disable** |

The JTI point is subtle and worth a callout: the gateway reuses its cached IdP token while
it is still valid, including when it refreshes the Anthropic token. Okta tokens carry a
`jti`. With JTI checks on, Anthropic rejects the second exchange using that same token.

3. Create a federation rule:

| Field | Value |
|---|---|
| Issuer | The issuer from step 2 |
| Match → subject | Exact `sub`. Entra: service principal object ID. Okta: client ID |
| Match → audience | The token `aud` |
| OAuth scope | `workspace:inference` |
| Target | The service account from step 1 |
| Workspaces | One workspace, or all workspaces |

4. Copy out: Federation Rule ID, Organization ID (Console organization settings),
   Service Account ID, and Workspace ID only when the rule spans more than one workspace.

### WIF troubleshooting

The gateway returns only the standard OAuth error code, such as `invalid_client`. The full
IdP or provider response stays in gateway logs and never reaches the caller. Say this
plainly: a consultant debugging this from the client side is working blind on purpose.

| Error | Cause | Fix |
|---|---|---|
| `OAuth token acquisition failed: invalid client credentials` | IdP rejected the client ID or secret | Check the secret value and expiry. In Okta confirm the app allows `client_secret_post` |
| `OAuth token endpoint returned 400 (invalid_scope)` | Scope not allowed | Entra: use `api://<id>/.default`. Okta: add the scope to the access policy rule |
| `OpenAI WIF token exchange failed: subject token rejected` | OpenAI rejected the JWT, or no mapping matched | Compare `iss` and `aud` with the provider and `sub` with the mapping. Check exactly one mapping is enabled |
| `Anthropic WIF token exchange failed: subject token rejected` | Anthropic rejected the JWT, or no rule matched | Compare issuer URL, rule subject and audience. Check max JWT lifetime for Entra and JTI checks for Okta |
| `WIF config incomplete: ... required` | A provider ID is missing | Fill in every required provider field |
| `Invalid or unsafe URL` | Token endpoint is private or uses HTTP | Use the public HTTPS endpoint, or add the host to the egress allowlist |

### WIF security recommendations

- A dedicated IdP client app and provider service account per integration and environment.
- Match `sub` exactly. No wildcard or prefix matches.
- Restrict provider permissions: mapping Permissions in OpenAI, `workspace:inference` in Anthropic.
- Hold the client secret in a secret reference and rotate it.
- To revoke immediately, disable the OpenAI mapping or the Anthropic rule. Cached tokens
  expire within 15 minutes.

### WIF through the Admin API

`provider_auth_type: "wif"` inside `configurations` on Create Integration. Do not send
`key`: WIF integrations have no provider API key.

| Field | Required | Description |
|---|---|---|
| `provider_auth_type` | Yes | `wif` |
| `wif_identity_source` | No | `configuredIdp`, the default and only supported value |
| `oauth_token_endpoint` | Yes | IdP token endpoint |
| `oauth_client_id` | Yes | IdP client ID |
| `oauth_client_secret` | Yes | IdP client secret |
| `oauth_scope` | No | Scope for the IdP request |
| `oauth_audience` | No | `audience` parameter for the IdP request |
| `openai_identity_provider_id` | OpenAI | OpenAI Workload Identity Provider ID |
| `openai_service_account_id` | OpenAI | OpenAI service account ID |
| `openai_organization`, `openai_project` | No | Sent as `OpenAI-Organization` and `OpenAI-Project` headers |
| `anthropic_federation_rule_id` | Anthropic | Anthropic federation rule ID |
| `anthropic_organization_id` | Anthropic | Anthropic organization ID |
| `anthropic_service_account_id` | Anthropic | Anthropic service account ID |
| `anthropic_workspace_id` | No | Required when the rule spans multiple workspaces |

Example body for OpenAI:

```json
{
  "name": "OpenAI (WIF)",
  "ai_provider_id": "open-ai",
  "configurations": {
    "provider_auth_type": "wif",
    "wif_identity_source": "configuredIdp",
    "oauth_token_endpoint": "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token",
    "oauth_client_id": "<client-id>",
    "oauth_client_secret": "<client-secret>",
    "oauth_scope": "api://<api-app-client-id>/.default",
    "openai_identity_provider_id": "<identity-provider-id>",
    "openai_service_account_id": "<service-account-id>"
  }
}
```

## Bedrock: assumed role

Select Bedrock as the provider and AWS Assumed Role as the authentication method.

Permission policy to create in the customer AWS account:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BedrockConsole",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": "*"
    }
  ]
}
```

The existing model-prerequisites page also lists `bedrock:GetInferenceProfile`, needed only
when calling a model through an inference profile. The assumed-role doc omits it. Keep it,
flagged as conditional.

Create an IAM role with trusted entity type **AWS account**. If an external ID is set,
copy it. Attach the policy above. Then edit the trust policy on the Trust relationships tab.

**Hosted gateway principal ARN:** `arn:aws:iam::299329113195:role/portkey-app`

This ARN works for the hosted app only. For a self-hosted Enterprise deployment the
principal is different and comes from
`https://github.com/Portkey-AI/helm/blob/main/charts/portkey-gateway/docs/Bedrock.md`.
This resolves the caveat on the existing model-prerequisites page, which says the hosted
principal "belongs to Palo Alto Networks and this guide does not have it". It is published,
and it is the Portkey account. Correct that page.

Trust policy without an external ID:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::299329113195:role/portkey-app"
      },
      "Action": "sts:AssumeRole",
      "Condition": {}
    }
  ]
}
```

With an external ID, add the condition:

```json
"Condition": {
  "StringEquals": {
    "sts:ExternalId": "<your external ID>"
  }
}
```

Then paste the role ARN into the integration along with the external ID if set and the
AWS region.

### Bedrock cost attribution with STS session tags

Attributes Bedrock cost and audit trails to individual applications, teams or environments
while sharing one assumed role, so spend separates in Cost Explorer and CloudTrail without
one IAM role per application.

Requires gateway version **2.19.0 or higher** and the environment variable
`AWS_BEDROCK_STS_SESSION_TAGS_ENABLED` set to `true` on the gateway container. That
environment variable means this is self-hosted only in practice: confirm before promising it.

Any metadata on a request is forwarded to AWS as STS session tags. Pass them in the
`metadata` field or the `x-portkey-metadata` header:

```
curl https://api.portkey.ai/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "x-portkey-api-key: $PORTKEY_API_KEY" \
  -H "x-portkey-provider: $PROVIDER_SLUG" \
  -H 'x-portkey-metadata: {"app": "chatbot", "team": "platform", "env": "prod"}' \
  -d '{ "model": "anthropic.claude-sonnet-4-20250514-v1:0", "messages": [{"role": "user", "content": "Hello"}] }'
```

For AWS to accept session tags, `sts:TagSession` must be added to **both** the caller
principal IAM policy **and** the target role trust policy.

## Facts carried over from existing pages

From `ai-gateway-model-prerequisites.html`, already published and not re-derived here:

- OpenAI: Organization ID optional, set when the key owner belongs to more than one
  organization, which sends cost to the right organization. Project ID optional, keeps cost
  records for one project. Model reference `@<slug>/<model-name>`.
- **Streaming hides the token count.** OpenAI sends no usage data when the caller sets
  `stream: true`, so the gateway records zero tokens and zero cost and the budget never
  sees the money. The caller must also send `stream_options: {include_usage: true}`. This
  applies to every OpenAI-compatible provider, Azure OpenAI included. This belongs on both
  the OpenAI and Azure OpenAI pages.
- Anthropic: do **not** add `/v1` to the gateway address, the Anthropic SDK adds its own
  path. A client sending a bare model name needs `x-portkey-provider`; Claude Code is one.
- Azure OpenAI: resource name is the first label of `https://<resource-name>.openai.azure.com`.
  One entry per deployment, each with a deployment name and an API version, one marked
  default. Use the same `api-version` the applications already use. The Entra or managed
  identity principal needs **Cognitive Services OpenAI User** on the resource, not
  Contributor and not Owner. Model reference is `@<slug>/<deployment-name>`: the caller names
  the deployment, not the model.
- **A deployment name is not a model name.** Write down deployment names.
- Bedrock model reference uses the full model ID including the cross-region prefix, for
  example `@default-bedrock/us.anthropic.claude-3-7-sonnet-20250219-v1:0`.

From `configuration/integrations.html` (chapter 9), the provider-agnostic flow that these
pages must not restate at length, only link to:

- The Integrations page has three tabs: All, Connected, Workspace-Created.
- The slug ends up in application code and is effectively a public interface. Convention:
  provider and environment, lowercase, hyphenated (`openai-prod`, `bedrock-prod`).
- The credential field carries a Secret Ref toggle. Provider-specific fields such as an AWS
  secret access key or an Entra client secret can each resolve from a reference.
- Model allowlist is set on the integration and nowhere else.
- Budget minimums: $1 cost, 100 tokens. Budget and rate limits cannot be edited once set.
  Rate limit of 0 disables the provider.
- Pricing adjustments need gateway 2.7.0 or higher; air-gapped needs backend 1.15.0 and
  frontend 1.8.1 or higher.

## Open gaps, to resolve in tenant

Each of these must appear as a `gap` block or a `screenshot-pending` comment rather than
being filled with a guess.

1. Whether the three-card Authentication Type control renders for Anthropic, Azure OpenAI
   and Bedrock, or whether those providers get a different control.
2. The contents of `Optional Fields` for each provider. Expected to hold OpenAI
   Organization ID and Project ID, Azure OpenAI deployment entries, and the Bedrock region,
   but not confirmed.
3. The contents of `Advanced Options` for any provider.
4. Whether `Pricing Adjustments` behaves the same across providers.
5. Whether Anthropic genuinely exposes OAuth Client Credentials as a distinct path from
   WIF, or whether the WIF card is the only OAuth-shaped option.
6. Where the Bedrock region field lives in the current wizard: the Portkey doc shows it in
   an older modal.
7. What the `Grab API Key` link next to the API Key field does. It is on the OpenAI screen;
   whether it deep-links to the provider console or opens a secret picker is unknown.
8. Endpoint Type (Public or Private) appears in the Portkey doc's step 3 but is not visible
   in the tenant screenshots. Confirm whether it still exists and where.

## Screenshot slots

Captured and available at `../aigw-screenshots/`:

| File | Shows |
|---|---|
| `aigw-int-provider-picker.png` | Step 1, 82 providers, nothing selected |
| `aigw-int-openai-provider-selected.png` | Step 1, Open AI selected |
| `aigw-int-openai-auth-apikey.png` | Step 2, API Key path |
| `aigw-int-openai-auth-oauth.png` | Step 2, OAuth Client Credentials path |
| `aigw-int-openai-auth-wif.png` | Step 2, Workload Identity Federation path |
| `aigw-int-azure-openai-auth-managed.png` | Azure Authentication Mode, `Managed` selected, showing all four mode labels |

Still needed, per provider, as `screenshot-pending` comments. Masking requirement for every
one: no tenant ID, no organization ID, no user email, no key or secret value.

| Slot | Shows |
|---|---|
| `aigw-int-<p>-provider-selected.png` | Step 1 with the provider selected |
| `aigw-int-<p>-auth-<type>.png` | Step 2 with each available auth type selected |
| `aigw-int-<p>-optional-fields.png` | Optional Fields expanded |
| `aigw-int-<p>-advanced-options.png` | Advanced Options expanded |
| `aigw-int-workspace-provisioning.png` | Step 3, shared across providers |
| `aigw-int-model-provisioning.png` | Step 4, shared across providers |
