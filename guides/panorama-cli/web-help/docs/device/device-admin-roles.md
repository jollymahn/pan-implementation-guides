# Device > Admin Roles

*Device : Device &gt; Admin Roles*

## Device > Admin Roles


Select **Device** > **Admin Roles** to define Admin Role profiles, which are custom roles that determine the access privileges and responsibilities of administrative users. You assign [Admin Role profiles or dynamic roles](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/manage-firewall-administrators/administrative-role-types.html) when you create administrative accounts ([Device>Administrators](device-administrators.html#ID0ELSCY)).

 Note:



| | To define Admin Role profiles for Panorama administrators, see [Panorama > Admin Roles](panorama-admin-roles.html#ID0ESHA3). |
| --- | --- |




The firewall has three predefined roles you can use for common criteria purposes. You first use the superuser role for initial firewall configuration and to create the administrator accounts for the Security Administrator, Audit Administrator, and Cryptographic Administrator. After you create these accounts and apply the proper common criteria Admin Roles, you then log in using those accounts. The default superuser account in Federal Information Processing Standard (FIPS)/Common Criteria (CC) FIPS-CC mode is **admin** and the default password is **paloalto**. In standard operating mode, the default **admin** password is **admin**. The predefined Admin Roles were created where there is no overlap in capabilities, except that all have read-only access to the audit trail (except audit administrator with full read/delete access. These admin roles cannot be modified and are defined as follows:




| • | auditadmin—The Audit Administrator is responsible for the regular review of the firewall’s audit data. |
| --- | --- |






| • | cryptoadmin—The Cryptographic Administrator is responsible for the configuration and maintenance of cryptographic elements related to the establishment of secure connections to the firewall. |
| --- | --- |






| • | securityadmin—The Security Administrator is responsible for all other administrative tasks (such as creating Security policy) not addressed by the other two administrative roles. |
| --- | --- |




To add an Admin Role profile, click **Add** and specify the settings described in the following table.

 Fastpath:
 Create custom roles to limit administrator access to only what each type of administrator needs. For each type of administrator, enable, disable, or set read-only access for **Web UI**, **XML API**, **Command Line**, and **REST API** access.


| Administrator Role Settings |
| --- |
| Name |
| Description |
| Role |






| • | **Virtual System**—The [role](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/manage-firewall-administrators/administrative-role-types.html) applies to specific virtual systems on the firewall and specific aspects of virtual systems (if Multi Virtual System Capability is enabled). An Admin Role Profile based on **Virtual System** doesn’t have access on the **Web UI** tab to Network Interfaces, VLANs, Virtual Wires, IPSec Tunnels, GRE Tunnels, DHCP, DNS Proxy, QoS, LLDP, or Network Profiles. You select the virtual systems when you create administrative accounts ([Device>Administrators](device-administrators.html#ID0ELSCY)). |
| --- | --- |







 WebUI


 Click the icons for [specific web interface features](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/reference-web-interface-administrator-access.html) to set the permitted access privileges:



| • | **Enable**—Read/write access to the selected feature. |
| --- | --- |






| • | **Read Only**—Read-only access to the selected feature. |
| --- | --- |






| • | **Disable**—No access to the selected feature. |
| --- | --- |







 XML API


 Click the icons for specific [XML API](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-panorama-api.html) features to set the permitted access privileges (**Enable** or **Disable**).




 Command Line


 Select the type of role for CLI access. The default is **None**, which means access to the CLI is not permitted. The other options vary by Role scope:



| • | **Device** |
| --- | --- |






| ◦ | **superuser**—Has full access to the firewall and can define new administrator accounts and virtual systems. You must have superuser privileges to create an administrative user with superuser privileges. |
| --- | --- |






| ◦ | **superreader**—Has read-only access to the firewall. |
| --- | --- |






| ◦ | **deviceadmin**—Has full access to all firewall settings except for defining new accounts or virtual systems. |
| --- | --- |






| ◦ | **devicereader**—Has read-only access to all firewall settings except password profiles (no access) and administrator accounts (only the logged in account is visible). |
| --- | --- |






| • | **Virtual System** |
| --- | --- |






| ◦ | **vsysadmin**—Has access to specific virtual systems on the firewall to create and manage specific aspects of virtual systems. The **vsysadmin** setting doesn’t control firewall-level or network-level functions (such as static and dynamic routing, IP addresses of interfaces, IPSec tunnels, VLANs, virtual wires, virtual routers, logical routers, GRE tunnels, DHCP, DNS Proxy, QoS, LLDP, or network profiles). |
| --- | --- |






| ◦ | **vsysreader**—Has read-only access to specific virtual systems on the firewall and specific aspects of a virtual system. The **vsysreader** setting doesn’t have access to firewall-level or network-level functions (such as static and dynamic routing, IP addresses of interfaces, IPSec tunnels, VLANs, virtual wires, virtual routers, logical routers, GRE tunnels, DHCP, DNS Proxy, QoS, LLDP, or network profiles). |
| --- | --- |







 REST API


 Click the icons for specific [REST API](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-panorama-api.html) features to set the permitted access privileges (**Enable**, **Read Only**, or **Disable**).



 Parent topic
 [Device](device.html#ID0EY2QW)