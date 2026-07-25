# Pedantic Review: Panorama Deployment on OCI

Reviewed: /home/baldman/Documents/Projects/Documentation-improvements/docs/guides/oci/panorama-deployment.html
Date: 2026-07-25
Findings: 17 total (5 BLOCKER, 8 CONFUSION, 4 FRICTION)

## Summary Table

| # | Severity | Location | Problem (one line) |
|---|---|---|---|
| PR-1 | CONFUSION | Subtitle / Phase 1 | Subtitle promises "OCI tenancy setup" but the guide never covers obtaining a tenancy or signing in to the console |
| PR-2 | CONFUSION | Warning callout (intro) | "SWFW" acronym never expanded at first use |
| PR-3 | BLOCKER | Step 1.1 | "Attach a policy to the group" has no console location, and the `PanoramaAdmins` group is never created anywhere |
| PR-4 | CONFUSION | Step 1.2 | Terraform and Git install tabs offer only macOS and Windows; Linux and WSL readers have no install path |
| PR-5 | CONFUSION | Step 1.2 / Step 2.1 | `oci setup config` and `terraform.tfvars` require tenancy OCID and user OCID, but the guide never says where to find them |
| PR-6 | BLOCKER | Step 1.2 Verification | `oci iam region list` is required to succeed before the API key is uploaded in Step 2.1, so it fails by the guide's own sequencing |
| PR-7 | FRICTION | Multiple steps | Links labeled "Step 2.1", "Step 2.7", "Step 1.3", "Step 4.5", "Step 5.5" all point to phase-level anchors, landing the reader on collapsed content |
| PR-8 | BLOCKER | Step 1.2 Option B | Cloud Shell path dead-ends: Phase 2's provider config requires API-key values Cloud Shell users do not have, and the alternative is hand-waved |
| PR-9 | FRICTION | Step 1.4 | Verification only fits Option A key names; Option B readers fail the check, and later SSH commands assume the Option A key path |
| PR-10 | BLOCKER | Step 1.5 / Step 2.6 | `panorama_image_ocid` is a required variable but the guide never shows how to actually retrieve the image OCID |
| PR-11 | BLOCKER | Step 2.4 | The NSG HCL is syntactically invalid (verified with Terraform v1.15.8), so Step 2.8's `terraform validate` success is unreachable |
| PR-12 | CONFUSION | Step 2.7 | "Point the subnet's default route at it instead of the IGW" gives no code and leaves the IGW resource's fate ambiguous |
| PR-13 | CONFUSION | Step 3.4 | Console verification never mentions the compartment picker, and "Open the instance's VNIC" has no click path |
| PR-14 | FRICTION | Steps 4.2, 5.1 | Copyable SSH commands embed the example IP `203.0.113.50` with no "replace with your IP" note |
| PR-15 | CONFUSION | Step 4.5 | "Under the Storage Partition or disk section" is not an exact UI label, and the CLI command's form cannot be verified from the guide |
| PR-16 | CONFUSION | Troubleshooting | Unlock command is shown without entering configuration mode, contradicting the guide's own Step 4.2 pattern; command and "default 30 minutes" cannot be verified from the guide |
| PR-17 | FRICTION | Whole guide | Zero screenshots despite console-driven steps, against the project's screenshots-as-verification standard |

## Findings

### PR-1 [CONFUSION] Subtitle / Phase 1: Tenancy setup is promised but never covered

**Quoted text:** "End-to-end guide: OCI tenancy setup through a fully licensed, accessible Panorama management plane"

**Problem:** The subtitle claims the guide starts at "OCI tenancy setup", but no step covers creating or accessing a tenancy. Step 1.1 opens with "In the OCI Console, open the navigation menu", assuming the reader already has a tenancy, credentials, and a signed-in console session. The step title also says "Verify Tenancy" yet contains no tenancy verification instructions. A day-one reader with no OCI account has no idea whether they can proceed or where to sign in.

**Suggested rewrite:** Change the subtitle to "End-to-end guide: compartment and IAM setup through a fully licensed, accessible Panorama management plane". Add a sentence at the top of Phase 1: "This guide assumes you already have an active OCI tenancy and can sign in to the OCI Console at <code>https://cloud.oracle.com</code> with a user that has (or can be granted) administrative access. If you do not have a tenancy, create one before starting." Rename Step 1.1 to "Create a Compartment &amp; Grant IAM Permissions" since the tenancy is never actually verified.

### PR-2 [CONFUSION] Intro warning callout: "SWFW" undefined at first use

**Quoted text:** "On AWS, Azure, and GCP, Palo Alto Networks publishes SWFW Terraform modules with a ready-made <code>panorama_standalone</code> example."

**Problem:** "SWFW" is never expanded anywhere in the document. A first-time reader cannot know it means the Software Firewalls (swfw-modules) Terraform module family, and the sentence's meaning (that other clouds have first-party modules) hinges on it.

**Suggested rewrite:** "On AWS, Azure, and GCP, Palo Alto Networks publishes first-party Software Firewall (SWFW) Terraform modules with a ready-made <code>panorama_standalone</code> example."

### PR-3 [BLOCKER] Step 1.1: No location for policy creation and the group is never created

**Quoted text:** "Attach a policy to the group that the deploying user belongs to."

**Problem:** This is an imperative with no location and no procedure. The reader is never told where policies are created (the verification callout mentions "Identity &amp; Security &gt; Policies" as an outcome, but the instruction itself gives no click path, no "Create Policy" button, no field names). Worse, the policy statements reference a group named <code>PanoramaAdmins</code> that is never created in the guide, and the reader is never told how to create a group or add their user to it. A literal reader pastes the statements and has nowhere to paste them, referencing a group that does not exist in their tenancy.

**Suggested rewrite:** Replace the sentence with a numbered procedure: "1. (If needed) create the group: go to <strong>Identity &amp; Security &gt; Domains &gt; Default domain &gt; Groups</strong>, click <strong>Create group</strong>, name it <code>PanoramaAdmins</code>, and add your deploying user as a member. 2. Go to <strong>Identity &amp; Security &gt; Policies</strong>, select the parent compartment in the compartment picker, and click <strong>Create Policy</strong>. 3. Name the policy (for example <code>panorama-deploy</code>), switch to the manual editor, paste the statements below, and click <strong>Create</strong>." (Verify the exact group-creation path against the current OCI Console before publishing; identity domains changed this navigation.)

### PR-4 [CONFUSION] Step 1.2: Linux readers have no Terraform or Git install path

**Quoted text:** "Select your OS to see the correct Terraform installation steps." (tabs offered: "macOS", "Windows")

**Problem:** The Terraform and Git fork banners offer only macOS and Windows tabs, but the OCI CLI fork offers "macOS / Linux", and the Windows Users callout explicitly tells WSL users to "install Terraform, the OCI CLI, and Git inside WSL", which is a Linux environment with no corresponding instructions anywhere in the guide. A Linux or WSL reader reaches the Terraform install step and finds no applicable tab; `brew` and `winget` both fail for them.

**Suggested rewrite:** Rename the macOS tabs to "macOS / Linux" and add Linux instructions inside them (for Terraform: the apt/dnf repository steps or the manual zip download from developer.hashicorp.com/terraform/install; for Git: `sudo apt install git` / `sudo dnf install git`), matching the pattern already used by the OCI CLI fork.

### PR-5 [CONFUSION] Step 1.2 / Step 2.1: Sources for tenancy OCID, user OCID, and region never given

**Quoted text:** "After installing, run <code>oci setup config</code> to generate an API signing key pair and a <code>~/.oci/config</code> profile."

**Problem:** `oci setup config` interactively prompts for the user OCID, tenancy OCID, and region, none of which the reader has at this point. Step 2.1 later says "Record the five values the provider needs" but likewise never says where in the console to find the tenancy OCID or user OCID. The guide tells the reader to enter values it never tells them how to obtain, in both Phase 1 and the `terraform.tfvars` file in Step 2.6.

**Suggested rewrite:** Before the `oci setup config` sentence, add: "The setup wizard prompts for three values from the OCI Console: your <strong>user OCID</strong> (click the profile icon in the top-right corner, select your username, and copy the OCID from the user details page), your <strong>tenancy OCID</strong> (profile icon &gt; <strong>Tenancy</strong>, copy the OCID), and your <strong>region identifier</strong> (shown in the console's top bar, for example <code>us-phoenix-1</code>). Copy all three before running the command." Reference these same instructions from Step 2.1.

### PR-6 [BLOCKER] Step 1.2 Verification: Authentication check cannot succeed yet

**Quoted text:** "The <code>oci iam region list</code> command returns a table of subscribed regions, which confirms the CLI is authenticated to your tenancy."

**Problem:** By the guide's own sequencing this check fails. The same step says the API public key generated by `oci setup config` "is uploaded to your OCI user in Step 2.1". Until that upload happens, every authenticated CLI call, including `oci iam region list`, returns a 401 NotAuthenticated error. A literal reader runs the verification, sees an authentication failure, and concludes their install is broken, with no troubleshooting entry covering it.

**Suggested rewrite:** Either move the API key upload (currently Step 2.1 item 1) into Step 1.2 immediately after `oci setup config`, or split the verification: "Confirm the tools are installed: <code>terraform -v</code>, <code>oci --version</code>, <code>git --version</code>. The authentication check (<code>oci iam region list</code>) will not succeed until you upload the API public key in Step 2.1; run it there instead."

### PR-7 [FRICTION] Multiple steps: Step-labeled links target phase headings, not steps

**Quoted text:** "Keep the generated public key; it is uploaded to your OCI user in <a href="#terraform-config">Step 2.1</a>."

**Problem:** Links whose text names a specific step all resolve to phase-level anchors: "Step 2.1" and "Step 2.7" go to `#terraform-config`, "Step 4.5" goes to `#post-deploy`, "Step 5.5" goes to `#verification`, "Step 1.3" goes to `#prerequisites`. The reader lands at the top of a phase where every step is a collapsed block with no step numbers visible until expanded, and must hunt for the referenced step. Occurrences: Step 1.2 (twice, including Step 2.1 reference), Step 2.2, Step 2.3 note ("See Step 2.7"), Step 2.5 note, Step 4.4, Step 4.5 verification, Step 5.5.

**Suggested rewrite:** Keep the phase-level-only rule for the sidebar, but either (a) add `id` attributes to the referenced collapsible headers (e.g. `id="step-2-1"`) and point these inline links at them, or (b) reword link text to the phase plus a locator: "in <a href="#terraform-config">Phase 2</a> (Step 2.1, the first collapsible)".

### PR-8 [BLOCKER] Step 1.2 Option B: Cloud Shell path dead-ends in Phase 2

**Quoted text:** "Configure the OCI Terraform provider to use that session by exporting <code>TF_VAR</code> values or by running <code>export OCI_CLI_AUTH=security_token</code> and pointing the provider at the delegated session token. No API signing key is required inside Cloud Shell."

**Problem:** This is the only Cloud Shell provider guidance in the guide, and it is not executable. Phase 2's `provider.tf` hard-requires `user_ocid`, `fingerprint`, and `private_key_path`, values a Cloud Shell user was just told they do not need and do not have. "Exporting TF_VAR values" of what? "Pointing the provider at the delegated session token" how? No attribute name, no config block, no example is given. A reader who chose Option B follows Phase 2 literally and either cannot fill `terraform.tfvars` or fills it with values that do not exist. The Option B path cannot reach Step 2.8.

**Suggested rewrite:** Give the actual working config: 'Inside Cloud Shell, replace the `provider "oci"` block from Step 2.2 with instance-principal-free session auth: <code>provider "oci" { auth = "InstancePrincipal" ... }</code> is for Compute; for Cloud Shell use <code>provider "oci" { region = var.region }</code> with <code>export OCI_CLI_AUTH=instance_obo_user</code>, and remove the `tenancy_ocid`, `user_ocid`, `fingerprint`, and `private_key_path` variables from `variables.tf` and `terraform.tfvars`.' (I could not verify the exact provider auth attribute for Cloud Shell from the guide; whichever mechanism is correct, the guide must show the modified `provider.tf` and the modified `terraform.tfvars` for Option B, or drop Option B.)

### PR-9 [FRICTION] Step 1.4: Verification and later commands only fit Option A

**Quoted text:** "Both key files exist and the private key has permissions <code>400</code>. Confirm with <code>ls -l ~/.ssh/panorama-oci*</code>."

**Problem:** A reader who took Option B (existing key, `~/.ssh/id_ed25519`) runs the verification command and gets "no such file or directory", an apparent failure. The same assumption recurs in Steps 4.1, 4.2, and 5.1, where SSH commands hardcode `-i ~/.ssh/panorama-oci`, and in the troubleshooting table (`chmod 400 ~/.ssh/panorama-oci`). Option B readers must silently translate every occurrence.

**Suggested rewrite:** In the verification callout add: "If you used Option B, substitute your existing key path (for example <code>~/.ssh/id_ed25519</code>) here and in every later <code>ssh -i</code> command in this guide."

### PR-10 [BLOCKER] Step 1.5 / Step 2.6: Image OCID retrieval is never shown

**Quoted text:** "You can now retrieve the image OCID from <strong>Marketplace &gt; All Applications</strong> or with the OCI CLI for use in the Terraform configuration."

**Problem:** `panorama_image_ocid` is a required Terraform variable (Step 2.2) that must be a real value in `terraform.tfvars` (Step 2.6, whose verification demands "no placeholder <code>aaaa...</code> strings remain"), yet the guide never shows how to get it. "From Marketplace &gt; All Applications" gives no click path to an OCID on the listing page, and "with the OCI CLI" names no command. A literal reader cannot produce this value, so `terraform plan` in Phase 3 cannot succeed with a real image.

**Suggested rewrite:** Add a numbered procedure to Step 1.5 (or a new sub-step in 2.6): "1. Open the Panorama listing under <strong>Marketplace &gt; All Applications</strong> and note the exact version you subscribed to. 2. Retrieve the image OCID with the CLI: <code>oci compute pic listing list --output table</code> filtered to the Panorama listing, then <code>oci compute pic version list --listing-id &lt;listing-ocid&gt;</code> to get the image OCID for that version. 3. Paste the image OCID into <code>panorama_image_ocid</code> in <code>terraform.tfvars</code>." (Verify the exact CLI subcommands before publishing; the point is the guide must contain a concrete, copyable retrieval procedure.)

### PR-11 [BLOCKER] Step 2.4: NSG HCL is invalid and fails `terraform validate`

**Quoted text:** "tcp_options { destination_port_range { min = 22, max = 22 } }"

**Problem:** This syntax is invalid HCL, verified by running Terraform v1.15.8 against the exact snippet: "Error: Argument definition required ... A single-line block definition can contain only a single argument." Single-line nested blocks cannot contain a nested block, and comma-separated arguments are not allowed in block bodies. Both the `ssh_in` and `https_in` rules use this form, and Step 2.4's warning callout also tells the reader to "Duplicate the <code>ssh_in</code> block" for port 3978, propagating the error. The reader hits a hard parse failure at Step 2.8, whose success callout promises "Success! The configuration is valid."

**Suggested rewrite:** Expand the blocks to multi-line form in both rules:
```hcl
  tcp_options {
    destination_port_range {
      min = 22
      max = 22
    }
  }
```
(and `min = 443` / `max = 443` for `https_in`).

### PR-12 [CONFUSION] Step 2.7: Route change described in prose with no code and an ambiguous IGW fate

**Quoted text:** "Add a NAT Gateway for outbound licensing and content-update traffic, and point the subnet's default route at it instead of the IGW:"

**Problem:** The code block that follows creates only the NAT Gateway. "Point the subnet's default route at it" is left to the reader: do they edit `network_entity_id` in the existing `oci_core_route_table.mgmt` resource, add a second route rule, or create a new route table? And is the `oci_core_internet_gateway` resource deleted, or left in place unused? Two readers implement this two different ways, and one of them leaves an IGW route that makes the "private" deployment public-routable. Item 3 ("Add a Service Gateway") similarly has no code, and item 4's Bastion instruction ends at "open a port-forwarding session" without saying how the reader then connects through it.

**Suggested rewrite:** After the NAT Gateway block, show the edited route table: "In <code>network.tf</code>, change the route rule's <code>network_entity_id</code> from <code>oci_core_internet_gateway.igw.id</code> to <code>oci_core_nat_gateway.nat.id</code>, and delete the <code>oci_core_internet_gateway</code> resource block entirely." Add a minimal `oci_core_service_gateway` snippet for item 3, and for item 4 add: "then connect with <code>ssh -i ~/.ssh/panorama-oci -p &lt;session-port&gt; admin@localhost</code> using the SSH command shown on the Bastion session details page."

### PR-13 [CONFUSION] Step 3.4: Compartment picker never mentioned; VNIC location unstated

**Quoted text:** "Open <strong>Compute &gt; Instances</strong>. Verify the Panorama instance shows the <code>Running</code> state..."

**Problem:** Every OCI Console list page is scoped to the compartment selected in the left-hand compartment picker. The guide had the reader create a dedicated `panorama-mgmt` compartment in Step 1.1, so a reader whose picker is still on the root compartment opens Compute &gt; Instances and sees an empty list, an apparent deployment failure the guide never explains. Item 4, "Open the instance's VNIC", also gives no path (the VNIC lives under the instance's details page, in the Attached VNICs section), failing the Lost Cursor test.

**Suggested rewrite:** Add as item 0: "In the <strong>Compartment</strong> picker on the left side of the console, select the <code>panorama-mgmt</code> compartment created in Step 1.1. Resources will not appear in any list until the correct compartment is selected." Rewrite item 4 as: "From the instance details page, scroll to <strong>Attached VNICs</strong>, click the primary VNIC, and confirm <code>panorama-mgmt-nsg</code> is listed under Network Security Groups with ingress rules for ports 22 and 443 from your admin IP."

### PR-14 [FRICTION] Steps 4.2 and 5.1: Copyable commands embed the example IP with no replace note

**Quoted text:** "ssh -i ~/.ssh/panorama-oci admin@203.0.113.50"

**Problem:** Step 4.1's code block includes the comment "# Replace with your Panorama public IP", but the copy-button blocks in Step 4.2 and Step 5.1 present the same example address bare. A literal reader clicks Copy, runs it, and SSHes toward a TEST-NET documentation address. The guide established `terraform output panorama_public_ip` in Step 3.3 but does not tie these commands back to it.

**Suggested rewrite:** In both blocks, use the placeholder form with a reminder: `ssh -i ~/.ssh/panorama-oci admin@<PANORAMA_PUBLIC_IP>` preceded by "Replace <code>&lt;PANORAMA_PUBLIC_IP&gt;</code> with the value from <code>terraform output panorama_public_ip</code> (Step 3.3)."

### PR-15 [CONFUSION] Step 4.5: Vague web UI location and unverifiable CLI form

**Quoted text:** "Under the Storage Partition or disk section, add the newly attached virtual disk and follow the prompt to format it."

**Problem:** "The Storage Partition or disk section" is hedged wording, not a UI label; the reader on the Panorama &gt; Setup &gt; Operations page does not know which link or button to click, what it is called, or what dialog to expect. The instruction "add the newly attached virtual disk" names no control. The CLI alternative, <code>request system disk add</code>, is shown with no disk argument even though the UI path implies selecting a specific disk; whether the command requires a disk name (e.g. <code>sdb</code>) cannot be verified from the guide. The reader has two half-specified paths and cannot confidently execute either.

**Suggested rewrite:** Determine the exact UI control name on the target PAN-OS version and rewrite item 2 with it, for example: "In the <strong>Miscellaneous</strong> section, click <strong>Storage Partition Setup</strong>, select the new disk, and confirm the format prompt." For the CLI, verify against a live Panorama whether a disk identifier is required and show the complete command, plus the expected confirmation prompt output so the reader knows the operation started.

### PR-16 [CONFUSION] Troubleshooting, Web UI Not Accessible: Unlock command skips configuration mode and cannot be verified

**Quoted text:** "unlock via CLI: <code>set mgt-config users admin lockout disabled</code> then <code>commit</code>"

**Problem:** The guide's own Step 4.2 establishes that <code>set mgt-config ...</code> commands only work after entering <code>configure</code> mode, but this resolution omits that step; a reader at the operational prompt gets "Unknown command". Additionally, whether <code>set mgt-config users admin lockout disabled</code> is a real PAN-OS configuration path, and whether the lockout default is 30 minutes, cannot be verified from the guide. Also note the reader is locked out of the account they are told to SSH in as, which the row does not address.

**Suggested rewrite:** "SSH in as a different administrator account (the locked account cannot log in), run <code>configure</code>, then the unlock command, then <code>commit</code>." Verify the exact unlock command and the default lockout duration against PAN-OS documentation before publishing, and state the PAN-OS version they apply to.

### PR-17 [FRICTION] Whole guide: No screenshots for any console-driven step

**Quoted text:** "Search for <strong>Palo Alto Networks Panorama</strong> and open the listing." (representative example)

**Problem:** The guide contains zero screenshots. The project standard treats screenshots as inline verification aids ("you should see this") for exactly the kind of console-driven steps this guide contains: compartment creation, policy creation, Marketplace subscription, API key upload, OCI Console resource verification, and Panorama license activation. Success callouts describe expected outcomes in prose, but a first-time reader in the OCI Console or Panorama web UI has no visual confirmation that they are on the right page, especially in Steps 1.1, 1.5, 2.1, 3.4, 4.4, and 4.5.

**Suggested rewrite:** Capture and inline screenshots per the project pattern (stored in <code>docs/guides/oci/&lt;prefix&gt;-screenshots/</code>, each preceded by a caption such as "Your screen should look like this:") for at minimum: the Create Compartment dialog (1.1), the Marketplace listing with the subscribe/launch control (1.5), the Add API Key dialog (2.1), the instance details page showing Running state (3.4), and the Panorama Licenses page after activation (4.4).

## Clean Areas

- **Architecture Overview** (Topology, Network &amp; Security Design): terms defined at first use (VCN, NSG, VNIC, IGW/NAT/Service GW/DRG), the port-3978 warning is clear and actionable, and the Security List vs NSG choice is explained.
- **Step 1.3 (Obtain Panorama License)**: both options have concrete portal paths, a clear "activation happens later" note, and a checkable verification.
- **Steps 2.2, 2.3, 2.5, 2.6, 2.8**: file-by-file structure is clean, each file has a verification, the OCPU-to-vCPU warning is precise, and the tfvars placeholders are clearly marked as placeholders (aside from the image OCID gap in PR-10 and the link-anchor pattern in PR-7).
- **Phase 3 Steps 3.1 to 3.3**: expected plan contents listed, boot-time caveat stated, output capture with a clear private-vs-public IP distinction.
- **Steps 4.1 to 4.4**: ordered, single-action steps with observable outcomes (SSH prompt, commit result, dashboard load, license page), aside from PR-14.
- **Phase 5**: every check has a command or click path plus an expected-values table; Step 5.4 honestly separates infrastructure from HA configuration.
- **Cleanup**: data-loss warning with a config-export escape hatch, correct dependency-order teardown, and verifications for both paths.
- **Link integrity**: all 20 referenced files (cross-guide links, header nav, shared CSS/JS, lunr, search) exist on disk; no broken hrefs to missing files.
