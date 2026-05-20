# Panorama > Admin Roles

*Panorama Web Interface : Panorama &gt; Admin Roles*

## Panorama > Admin Roles


[Admin Role profiles](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-overview/role-based-access-control.html) are custom roles that define the access privileges and responsibilities of administrators. For example, the roles assigned to an administrator control which reports he or she can generate and which device group or template configurations the administrator can view or change.


For a Device Group and Template administrator, you can assign a separate role to each access domain that is assigned to the administrative account (see [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3)). Mapping roles to access domains enables you to achieve very granular control over the information that administrators can access on Panorama. For example, consider a scenario where you configure an access domain that includes all the device groups for firewalls in your data centers and you assign that access domain to an administrator who is allowed to monitor data center traffic but who is not allowed to configure the firewalls. In this case, you would map the access domain to a role that enables all monitoring privileges but disables access to device group settings.


To create an Admin Role profile, **Add** a profile and configure the settings as described in the following table.

 Note:



| | If you use a RADIUS server to authenticate administrators, [map the administrator roles and access domains to RADIUS Vendor Specific Attributes (VSAs)](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-administrative-access-to-panorama/configure-administrative-accounts-and-authentication/configure-radius-authentication-for-panorama-administrators.html). |
| --- | --- |





| Panorama Administrator Role Settings | Description |
| --- | --- |
| Name | Enter a name to identify this administrator role (up to 31 characters). The name is case-sensitive, must be unique and can contain only letters, numbers, spaces, hyphens, and underscores. |
| Description | ( `Optional`) Enter a description of the role. |
| Role | Select the [scope of administrative responsibility](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-overview/role-based-access-control.html): **Panorama** or **Device Group and Template**. |
| Web UI | Select from the following options to set the type of access permitted for [specific features](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/reference-web-interface-administrator-access.html) in the Panorama context ( **Web UI list**) and firewall context ( **Context Switch UI list**): • |






| • | **Read Only** ( )—Read-only access |
| --- | --- |






| • | **Disable** ( )—No access |
| --- | --- |







 XML API
 ( `Panorama role only`)


 Select the type of XML API access ( **Enable** or **Disable**) for Panorama and managed firewalls:



| • | **Report**—Access to Panorama and firewall reports. |
| --- | --- |






| • | **Log**—Access to Panorama and firewall logs. |
| --- | --- |






| • | **Configuration**—Permissions to retrieve or modify Panorama and firewall configurations. |
| --- | --- |






| • | **Operational Requests**—Permissions to run operational commands on Panorama and firewalls. |
| --- | --- |






| • | **Commit**—Permissions to commit Panorama and firewall configurations. |
| --- | --- |






| • | **User-ID Agent**—Access to the User-ID agent. |
| --- | --- |






| • | **Export**—Permissions to export files from Panorama and firewalls (such as configurations, block or response pages, certificates, and keys). |
| --- | --- |






| • | **Import**—Permissions to import files into Panorama and firewalls (such as software updates, content updates, licenses, configurations, certificates, block pages, and custom logs). |
| --- | --- |







 Command Line
 ( `Panorama role only`)


 Select the type of role for CLI access:



| • | **None**—(Default) Access to the Panorama CLI not permitted. |
| --- | --- |






| • | **superuser**—Full access to **Panorama**. |
| --- | --- |






| • | **superreader**—Read-only access to **Panorama**. |
| --- | --- |






| • | **panorama-admin** **—**Full access to **Panorama** except for the following actions: |
| --- | --- |






| ◦ | Create, modify, or delete Panorama administrators and roles. |
| --- | --- |






| ◦ | Export, validate, revert, save, load, or import a configuration. |
| --- | --- |






| ◦ | Schedule configuration exports. |
| --- | --- |







 REST API
 ( `Panorama role only`)


 Select the type of access (**Enable**, **Read Only**, or **Disable**) that applies to each REST API endpoint for Panorama and managed firewalls. You can assign role access to endpoints in the following categories.



| • | Objects |
| --- | --- |






| • | Policies |
| --- | --- |






| • | Network |
| --- | --- |






| • | Device |
| --- | --- |







 Context Switch




 Device Admin Role


 Enter the [device admin role](device-admin-roles.html#ID0EQPDY) name to allow a **Panorama** administrator to context switch between the Panorama and managed firewall web interface.



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)