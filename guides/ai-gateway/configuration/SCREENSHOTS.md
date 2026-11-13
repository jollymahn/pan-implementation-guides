# AI Gateway Configuration — Screenshot Capture List

Pending captures for the configuration chapter set. Each entry corresponds to a
`<!-- screenshot-pending: ... -->` marker in the HTML. Replace the marker with the
standard inline pattern once the file exists; do not leave a broken `<img>` in a
published page.

```html
<p><em>Your screen should look like this:</em></p>
<img src="../aigw-screenshots/FILENAME.png" alt="DESCRIPTION" loading="lazy">
```

Images live in `docs/guides/ai-gateway/aigw-screenshots/` alongside the existing 67
captures, so the deployment guide and this set share one folder and one prefix.

## Capture rules

- **Mask every real value.** Organisation IDs, email addresses, tenant names, key
  values, hostnames and metadata URLs. The site is public.
- **Generic hostnames only.** Use `example.com` style values in any field you type
  into before capturing.
- **Viewport 1440x900.** Matches the existing AI Gateway captures.
- **Crop to the panel**, not the whole browser, unless the surrounding navigation is
  the point of the shot.
- **Validate filenames before committing.** macOS capture adds stray spaces and
  duplicate extensions: `ls -1 aigw-screenshots/ | sed -n 'l'` reveals them.

## Single-shot states

These exist only on a tenant that has not been configured yet. Capture them before
running the rest of the configuration, or they are gone:

- `aigw-cfg-secret-refs-list.png` in its empty state
- Any first-run or empty-state panel in Admin Settings

## Chapter 1 — Organization registration

| File | What to capture |
|---|---|
| `aigw-cfg-org-general.png` | Admin Settings → Organisation → General, full page. Org name and ID visible, ID value masked. |
| `aigw-cfg-org-id.png` | The Organisation ID field on the General page, cropped, value masked. |
| `aigw-cfg-org-owners.png` | Organization user list filtered to the Owner role, email addresses masked. |
| `aigw-cfg-gateway-urls.png` | The Gateway URLs section with both fields populated, generic hostnames. |

## Chapter 2 — Authentication and identity

| File | What to capture |
|---|---|
| `aigw-cfg-allowed-domains.png` | Admin Settings → Authentication Settings, Allowed Domains section, two generic domains listed. |
| `aigw-cfg-oidc-settings.png` | Admin Settings → Authentication Settings → OIDC, fields populated, client secret masked. |
| `aigw-cfg-saml-sp-values.png` | Admin Settings → Authentication Settings → SAML, showing the consumer service URL and entity ID. |
| `aigw-cfg-saml-settings.png` | Same page with a metadata URL populated. |
| `aigw-cfg-directory-sync.png` | Admin Settings → Authentication → Directory Sync, full page: Connected Directory, User Identity Attribute, Auth Profile, Sync State. |
| `aigw-cfg-scim-provisioning.png` | Admin Settings → Authentication Settings → SCIM Provisioning, SCIM URL visible, token masked. |
| `aigw-cfg-jwt-jwks.png` | Admin Settings → Organisation → Authentication, JWKS URL field populated. |
| `aigw-cfg-admin-api-keys.png` | Organization API keys list with one named key, key values masked. |

## Chapter 3 — Secret references

| File | What to capture |
|---|---|
| `aigw-cfg-secret-refs-list.png` | Secret References list page showing the Create button. Empty state preferred. |

## Chapter 4 — Security and access control

| File | What to capture |
|---|---|
| `aigw-cfg-org-roles.png` | Organization user list showing the role column with a mix of Owner, Admin and Member, email addresses masked. |
| `aigw-cfg-master-key.png` | Organization API key list with the master key row and its permission summary, key value masked. |
| `aigw-cfg-security-logs-mgmt.png` | Admin Settings → Security, Logs Management section, all six toggles visible. |
| `aigw-cfg-security-tab-full.png` | Admin Settings → Security, scrolled to show several permission sections at once. |
| `aigw-cfg-audit-logs.png` | Admin Settings → Audit Logs with recent entries and the filter bar. Mask user emails and client IPs. |

## Chapter 5 — Organization properties

| File | What to capture |
|---|---|
| `aigw-cfg-request-logging.png` | Admin Settings → Organisation Properties, Request Logging section with the mode selection and the workspace override. |
| `aigw-cfg-metadata-schema.png` | The API Key Metadata Schema editor holding a sample schema. |

## Chapter 6 — Guardrails

| File | What to capture |
|---|---|
| `aigw-cfg-guardrail-create.png` | The Guardrails create page with two or three checks added and the check sidebar visible. |
| `aigw-cfg-org-guardrails.png` | Admin Settings → Organisation Guardrails with an input and an output guardrail selected. |

## Chapter 7 — Plugins

| File | What to capture |
|---|---|
| `aigw-cfg-plugins-list.png` | Settings → Plugins showing the partner list, one enabled and the rest available. |
| `aigw-cfg-airs-check.png` | The PANW Prisma AIRS Guardrail check configuration panel with its parameter fields. |

## Chapter 8 — Workspaces

| File | What to capture |
|---|---|
| `aigw-cfg-workspace-create.png` | The create workspace form with a name and the required metadata fields populated with generic values. |
| `aigw-cfg-group-mapping.png` | The Add Group Mapping dialog with a CIE group and a workspace selected. Mask real group names. |
| `aigw-cfg-workspace-keys.png` | AI Gateway → Security Keys showing the Service and User tabs with one named key, values masked. |

## Chapter 9 — Integrations and the model catalog

| File | What to capture |
|---|---|
| `aigw-cfg-integration-secretref.png` | The integration credential field with the Secret Ref toggle enabled and a reference selected. |

Existing captures in `aigw-screenshots/` already cover the integrations page,
integration creation and the model tab. Check those before taking new ones.

## Chapter 10 — MCP gateway

| File | What to capture |
|---|---|
| `aigw-cfg-mcp-registry-list.png` | MCP Registry list page with the Add MCP Server button, one or two generic servers listed. |
| `aigw-cfg-mcp-add-server.png` | The Add MCP Server form, all fields populated with generic values, Test Connection visible. |
| `aigw-cfg-mcp-access-control.png` | Server detail, Access Control tab, workspace toggles and the auto-provision setting, workspace names generic. |
| `aigw-cfg-mcp-capabilities.png` | Server detail, Capabilities tab, several tools toggled off, Enable All and Disable All visible. |
| `aigw-cfg-mcp-guardrail-mapping.png` | An MCP guardrail mapped to a server, showing the run_on selection for input and output. |

## Chapter 11 — Agent gateway

| File | What to capture |
|---|---|
| `aigw-cfg-agent-registry.png` | Agent Registry list page with the add agent control and one generic agent registered. |
| `aigw-cfg-agent-card-fetch.png` | The agent form after a successful Fetch Agent Card, showing the discovered transport and authentication schemes. |
| `aigw-cfg-agent-skills.png` | A registered agent's skills list with several enabled and several disabled. |

## Chapter 12 — Routing and reliability

| File | What to capture |
|---|---|
| `aigw-cfg-configs-create.png` | The Configs page with the Create button and one saved config listed, generic names. |

Chapter 12 is mostly JSON rather than console work, so it carries one capture
rather than a set. The config editor itself is the only panel worth showing.

## Not yet listed

Chapter 13 is in preparation. Its capture points are added here as the chapter is
drafted.

## Playwright notes

- SSO and MFA block headless login. Use a persisted browser profile authenticated
  once by hand, or a local admin account exempt from SSO.
- The gateway console is a single-page application. Wait on a settled network state
  rather than a fixed delay before capturing.
- Capture on a tenant where configuration changes are acceptable. Several shots
  require a populated field, which means typing a value into a live setting.
