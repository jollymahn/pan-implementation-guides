# Reference sheet: AI Gateway MCP Gateway

Working artifact for `docs/guides/ai-gateway/mcp/`. Pass 1 of the research-first workflow
in `GUIDE-TEMPLATE.md` section 12. Overwrite freely.

Compiled 2026-11-18.

## Source status

| Source | Status |
|---|---|
| Six tenant screenshots, captured 2026-11-18 | Available, and the authority for everything below |
| Five MCP screenshots already in the repo, used by `ai-gateway-deployment.html` | Available |
| `configuration/mcp-gateway.html` (chapter 10) | Available, already published |
| The 15 portkey.ai URLs in `AI-GW-MCP-Sources.txt` | **Not fetched.** The secure_fetch token expired mid-session |

**That last row matters.** Remote MCP, advanced configuration, observability, rate limits,
guardrails and the troubleshooting help-center pages were all listed as sources and none
was read. Anything on those topics must come from chapter 10, which is already published
and itself documentation-derived, or be marked unverified. Do not write them from memory.

## What chapter 10 already covers

`configuration/mcp-gateway.html`: client/gateway/server model, prerequisites, add to
registry, authenticate gateway to server, forward user identity to internal servers,
provision access, decide which tools exist, first tool call, rate limit tool calls,
guardrail tool inputs and outputs, circuit breakers, the three access levels.

The new set is the depth behind that, not a replacement. Chapter 10 stays the short path.

## Tenant-verified: the MCP Registry

Path: `AI Security / AI Gateway / Integrations / MCP Registry`.

The **Integrations** page carries four tabs, and this is a correction to what the provider
integration set assumed:

`LLM Integrations` · `MCP Registry` · `Secret References` · `Agent Integrations`

Page title **Integrations**, subtitle "Configure and manage your AI models and services."

**Secret References is a tab here, not an admin-panel area.** Configuration chapter 3
describes it as living in the admin panel, which is why it was not found while the provider
integration set was written. The provider pages have been corrected.

Registry controls: a `Search...` box, a `Type` dropdown, a `Created in workspace` dropdown,
and a `Reset` link. Then a count reading `Total MCP Servers (n)` with `+ Add MCP Server`
on the right.

Table columns, in order: **MCP Server Name**, **Slug**, **Type**, **Status**, **Creator**,
**Workspaces**, **Last Updated**.

The captured tenant had zero servers, so no populated row was seen in this capture.
`aigw-mcp-registry-row.png`, already in the repo, shows a populated row.

## Tenant-verified: the Add MCP Server wizard

**Two steps, not four.** The left rail reads:

1. MCP Integration Details
2. Workspace Provisioning

Primary button `Next: Choose Workspace`, with `Cancel` on the right. Title **Add MCP
Server**, subtitle "Follow the steps to add a server".

This is a materially different shape from the LLM integration wizard, which has four steps.
There is no model provisioning stage, because an MCP server exposes tools rather than
models, and tool provisioning is a separate surface covered by chapter 10.

### Step 1 fields, in UI order

| Field | Required | Notes |
|---|---|---|
| Name | Yes, marked `*` | `Enter` |
| Short Description | No, labeled `(Optional)` | `Enter` |
| URL | Yes, marked `*` | `Enter`. Sits left of Slug on the same row |
| Slug | Not marked required | `Enter`. Sits right of URL |

### Server Type

A two-option segmented control, **not** radio cards: `Streamable HTTP` and `SSE`.
`Streamable HTTP` is selected by default and shows a check mark when active.

Helper text, verbatim: "Recommended for most integrations. Supports streaming responses
over standard HTTP connections."

The helper text does not change when `SSE` is selected, which makes it read as advice about
Streamable HTTP rather than about whichever option is active. Do not quote it as a
description of SSE.

### Passthrough headers

Section titled **Passthrough headers (Optional)**, described as "Add custom HTTP headers to
forward with every request to the MCP server."

Two columns, `Passthrough Headers` (`Enter Header`) and `Passthrough String`
(`Enter String`), with a bin icon per row and a `+ Add Header` link.

This is distinct from the `Headers` authentication type below, which uses a different pair
of labels. Passthrough headers are forwarded on every request regardless of the
authentication type chosen. Worth calling out, because two header-shaped controls on one
form invite the wrong one being filled in.

### Authentication

Section titled **Authentication**, described as "Select how your MCP client authenticates
with the server." Four radio cards, in UI order:

| Option | Fields it exposes |
|---|---|
| `OAuth 2.1` | **None.** Selecting it adds no fields at all |
| `OAuth Client Credentials` | Token Endpoint (`https://auth.example.com/oauth2/token`), Client ID, Client Secret, Scope (optional, `e.g. mcp.read mcp.write`) |
| `None` | None |
| `Headers` | `Headers` (`Enter Header`) and `String` (`Enter String`) pairs, with `+ Add Header` |

`OAuth 2.1` is the default selection.

**`OAuth 2.1` taking no fields is the most interesting fact on this form.** It implies
discovery-driven registration against the server rather than operator-supplied credentials,
which is what the MCP authorization specification describes. The mechanism was not
observed, and the `OAuth Metadata` box under Advanced Settings is the likely place any
override goes. Say that it takes no fields. Do not explain how it works without a source.

Note the label asymmetry with the LLM tiles: the LLM wizard calls the control
`Authentication Type` and Azure calls it `Azure Authentication Mode`; here it is just
`Authentication`.

### Advanced Settings

Captured separately in `aigw-mcp-advanced-settings.png`, which is a dark-theme capture from
an earlier session. Expanding it reveals three free-text areas, all empty:

1. **OAuth Metadata**
2. **External Auth Configuration**
3. **Advanced Configuration**

No helper text, no placeholders, no indication of the expected format. All three are
plausibly JSON, and none was confirmed. These are the hook for whatever `OAuth 2.1` needs
beyond discovery, but that is inference.

**This does not close the `Advanced Options` gap on the LLM integration tiles.** Different
label, different form, almost certainly different contents.

## Screenshot inventory

Imported this session, all light theme, captured 2026-11-18:

| File | Shows |
|---|---|
| `aigw-mcp-registry-empty.png` | The registry with four tabs, filters, columns, zero servers |
| `aigw-mcp-add-server-oauth21.png` | Step 1 with `OAuth 2.1` selected, the default |
| `aigw-mcp-add-server-oauth-cc.png` | `OAuth Client Credentials` with its four fields |
| `aigw-mcp-add-server-none.png` | `None` selected, no fields |
| `aigw-mcp-add-server-headers.png` | `Headers` with its header and string pairs |
| `aigw-mcp-add-server-sse.png` | `SSE` selected on the Server Type control |

Already in the repo, used by `ai-gateway-deployment.html`, reusable here:

| File | Shows |
|---|---|
| `aigw-mcp-registry-row.png` | A populated registry row |
| `aigw-mcp-add-server-form.png` | The add form |
| `aigw-mcp-workspace-provisioning.png` | Step 2 of the wizard |
| `aigw-mcp-advanced-settings.png` | Advanced Settings expanded, three fields, dark theme |
| `aigw-mcp-observability-logs.png` | MCP logs |

Mixing a dark-theme capture into a page of light-theme captures is visibly inconsistent.
Either note it in the caption or recapture in light theme.

## Sources fetched 2026-11-18, second attempt

The token was refreshed and four pages were read. Everything below is documentation,
second in precedence to the tenant screenshots above.

- `/docs/product/mcp-gateway` (modified 2026-08-12)
- `/docs/product/ai-gateway/remote-mcp` (modified 2026-08-06)
- `/docs/help-center/mcp-gateway-troubleshooting` (modified 2026-10-01)
- `/docs/product/mcp-gateway/observability` (modified 2026-08-06)

Note the real nav differs from the source list: there is no `advanced-configuration`,
`rate-limits` or `mcp-registry` page at the URLs given. The live sections are Quickstart,
MCP Registry, Using MCP Servers, Team Provisioning (at `/access-control`), Tool
Provisioning, Authentication, Authorization, Observability, Integrations, Guardrails,
Reliability.

### RESOLVED: what `OAuth 2.1` does with no fields

It is **per-user OAuth**. Each user gets their own connection to the upstream service, so
there is nothing for an operator to type: the user signs in. The troubleshooting page
states the consequence as a compatibility table, and it is the single most important fact
in this set:

| MCP server auth type | Works with a Service key | Works with a User key |
|---|---|---|
| None, Custom Headers, Client Credentials | Yes | Yes |
| **OAuth 2.1 (per-user)** | **No** | Yes |

A shared Service key cannot drive a per-user OAuth server. This connects directly to the
Service against User distinction on `integrations/identity-and-clients.html`, and it is the
first concrete consequence found for that choice: pick a Service key and OAuth 2.1 servers
simply do not work.

The API key must also carry the **`mcp.invoke`** permission, set under Settings → API Keys.

### RESOLVED: the format of the Advanced Settings boxes

The three boxes are not interchangeable, and confusing two of them produces a silent
failure that looks like correct configuration. Verbatim from the troubleshooting page:

- **Advanced Configuration** takes a wrapped object whose top-level keys are merged into
  the integration configuration, so OAuth metadata goes in as `{"oauth_metadata": { ... }}`.
- **OAuth Metadata** takes the **inner object only**, starting at `"issuer"`, with no
  wrapper. Its contents are stored as the OAuth metadata directly.

Put the wrapper in the OAuth Metadata field and everything nests one level too deep. The
gateway then finds no `client_id`, **falls back to Dynamic Client Registration without
saying so**, and the original error persists while the UI shows credentials that look
correct. Document this trap prominently.

- **External Auth Configuration** maps to `external_auth_config`, where the gateway brokers
  your identity provider directly. It is **self-hosted and enterprise only** and returns
  403 on managed SaaS. On SaaS use `oauth_metadata` with a pre-registered client instead.

Example for the Advanced Configuration box:

```json
{
  "oauth_metadata": {
    "issuer": "https://<your-idp>/...",
    "client_id": "YOUR_CLIENT_ID",
    "client_secret": "YOUR_CLIENT_SECRET",
    "redirect_uri": "https://aigw.portkey.ai/m/oauth/upstream-callback",
    "authorization_endpoint": "https://<your-idp>/.../authorize",
    "token_endpoint": "https://<your-idp>/.../token",
    "scope": "<the exact scope you need>"
  }
}
```

### DECIDED: the connection host

Resolved 2026-11-18. Three agents independently flagged a conflict between the host in
chapter 10 and the host in the vendor documentation. The decision is to use
**`aigw.portkey.ai/m/{slug}/mcp`** across this set, matching chapter 10 and the rest of the
site.

Reasoning, from a survey of every Portkey host in `docs/guides/ai-gateway`:

| Host and path | Uses | What it serves |
|---|---|---|
| `aigw.portkey.ai` (bare, `/v1`, `/v1/chat/completions`) | 27 | Model calls |
| `aigw.portkey.ai/agent/{slug}` | 4 | Agent gateway |
| `aigw.portkey.ai/m/{slug}/mcp` | 6 | MCP, chapter 10 |

The site uses one host with a path prefix per service, which is the shape the vendor calls
`SERVER_MODE=unified`. The vendor's own documentation splits hosts instead:
`api.portkey.ai/v1` for inference and `mcp.portkey.ai` for MCP. Importing the vendor host
into this site would have left MCP as the only service on a different host.

Every URL below and in the published pages uses the site form. The vendor form is recorded
on `registry.html` as a note, because a reader who opens the Portkey docs will see it and
should not assume one of them is a typo. The operational advice on both is the same: copy
the connection URL from the server's page in the registry rather than typing either.

Note this also applies to the OAuth callback, which becomes
`https://aigw.portkey.ai/m/oauth/upstream-callback`, and that value must match exactly in
any upstream OAuth app.

### Client connection

Endpoint pattern: `https://aigw.portkey.ai/m/{slug}/mcp`, where `{slug}` is the registry slug
and **not** a UUID. Client configuration:

```json
{
  "mcpServers": {
    "portkey": {
      "url": "https://aigw.portkey.ai/m/{server-slug}/mcp",
      "headers": { "Authorization": "Bearer YOUR_API_KEY" }
    }
  }
}
```

The fixed OAuth callback is `https://aigw.portkey.ai/m/oauth/upstream-callback`. Any upstream
OAuth app must use exactly that value.

### Troubleshooting, by status code

| Status | Meaning | First check |
|---|---|---|
| 401 | Missing or expired token, or the server wants a sign-in | Re-authenticate and complete the server sign-in |
| 403 | Authenticated but not allowed | Wrong workspace or server in the URL, or no access to that server |
| 404 | Server not found | Wrong slug, or not registered in this workspace |
| 500 "Unable to verify user access" | Gateway could not confirm access | API key type, see the OAuth 2.1 table above |

Named failure modes worth their own sections:

1. **"Incompatible auth server: does not support dynamic client registration"** — the
   service rejects automatic registration (Snowflake, or anything behind Okta or Entra).
   Pre-register an OAuth client and supply it through Advanced Configuration.
2. **`invalid_scope`** — the scope must exist at the identity provider and be allowed for
   the app. Watch the authorization URL during sign-in and compare `scope=`.
3. **"Protected resource ... does not match expected ..."** — the registered URL is missing
   the path, almost always `/mcp`. Confirm with
   `curl https://<server>/.well-known/oauth-protected-resource` and register the `resource`
   value it returns.
4. **Configuration changes not taking effect** — configuration and connections are cached
   briefly and a stale connection can linger. Wait, then disconnect and reconnect and
   re-run sign-in. A brand new slug always picks up the latest config, which is a
   diagnostic rather than a fix because it changes the client URL.
5. **Frequent reconnects** — access tokens last about 1 hour, refresh tokens about 30 days,
   and the gateway refreshes automatically. Google servers only return a refresh token when
   the authorization request carries `access_type=offline`, so without it the connection
   dies hourly. Add `authorization_params` with `access_type: offline` and
   `prompt: consent`, then have each user reconnect, because existing connections were
   created without a refresh token and Google skips consent for a user who already granted.
6. **OAuth discovery 404** — check `/.well-known/oauth-authorization-server` on the gateway
   host and `/.well-known/oauth-protected-resource` on the server.

### Self-hosted specifics

- Client URL uses your own host: `https://<host>/{slug}/mcp`.
- OAuth callback becomes `https://<host>/oauth/upstream-callback`.
- `MCP_GATEWAY_BASE_URL` must be the public gateway URL, scheme included, no path. It is
  read at startup, so changing it needs a pod restart. Wrong value breaks OAuth and
  discovery.
- Ingress must forward the `Host` header.
- With `SERVER_MODE=unified` (gateway **2.20.0** or later) both gateways share one port and
  the client URL becomes `https://<host>/m/{slug}/mcp`. `/.well-known/*` and `/oauth/*`
  stay at the root, not under `/m`.
- With `SERVER_MODE=all` or `mcp` the MCP Gateway has its own port, **8788**, against the AI
  Gateway's **8787**. Route every path on the MCP host to 8788, not only `/{slug}/mcp`:
  `/.well-known/*` and `/oauth/*` must reach it too. The classic symptom of getting this
  wrong is `Invalid API Key. Error Code: 03` during client registration, which is the AI
  Gateway answering a request meant for the MCP Gateway.

### Observability

Logged automatically, no setup. Per request: Tool, Parameters, Response, User, Team,
Timestamp, Latency, Status, MCP Server. Viewed under **Logs**, filterable by MCP server,
team, user, tool name, time range and status.

Aggregate metrics: requests over time, by server, by team, by user, error rates, latency
percentiles, most used tools.

Metadata on every request, for both API key and OAuth flows: `organisation_id`,
`organisation_name`, `workspace_id`, `workspace_name`, `workspace_slug`, `user_id`,
`api_key_id`, `mcp_server_id`, `mcp.auth.type` (`api_key` or `Bearer`).

Note the British spelling in `organisation_id` and `organisation_name`. Those are literal
field names and must not be Americanized.

### Remote MCP is a different feature

Not the MCP Gateway. It is the AI Gateway letting a model provider use MCP tools during
inference, and there are two modes:

| | Portkey Gateway execution (`@portkey-mcp`) | Provider execution (`server_url`) |
|---|---|---|
| Where tools run | Within your own VPC | On provider servers |
| Data exposure | MCP credentials stay in your environment | Tokens may reach provider training data and audit pipelines |
| User attribution | Attributed via your service or user API key | None |
| Audit and logging | Executions logged and auditable | No execution logging or security controls |

Gateway execution needs the header `x-portkey-beta: server-side-mcp-2026-06-01` and the
`@portkey-mcp/` prefix on `server_label` (Responses API) or `mcp_server_name` (Messages
API). With that prefix `server_description`, `server_url` and `require_approval` are
ignored.

Reaching a registry server from the Responses API: header-based or no-auth servers pass the
Portkey API key as `x-portkey-api-key` inside `headers`; OAuth servers pass the token in the
`authorization` field on the tool.

A private MCP server behind a firewall cannot be reached by the provider at all, which
makes gateway execution the only option.

## Still open

1. Everything behind the 15 unfetched source URLs: remote MCP, advanced configuration,
   observability, rate limits, guardrails, troubleshooting, gateway URLs.
2. What `OAuth 2.1` does without fields, and what the server must support for it to work.
3. The expected format of the three Advanced Settings boxes.
4. What step 2, Workspace Provisioning, asks for on the MCP wizard specifically. The
   existing screenshot shows it but it was not read in this pass.
5. Whether the `Type` column and the `Type` filter refer to Server Type (Streamable HTTP
   against SSE) or to something else such as internal against external.
6. Whether `Status` reflects a reachability check against the server or only a configuration
   state. A registry that shows green for an unreachable server is a very different
   operational story from one that probes.
