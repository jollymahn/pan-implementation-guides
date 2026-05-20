# Panorama > Access Domains

*Panorama Web Interface : Panorama &gt; Access Domains*

## Panorama > Access Domains


[Access domains](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-overview/role-based-access-control.html) control the access that Device Group and Template administrators have to specific device groups (to manage policies and objects), to templates (to manage network and device settings), to the web interface of managed firewalls (through context switching), and to the REST API of managed firewalls. You can define up to 4,000 access domains and manage them locally or by using [RADIUS Vendor-Specific Attributes (VSAs)](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-administrative-access-to-panorama/configure-administrative-accounts-and-authentication/configure-radius-authentication-for-panorama-administrators.html), TACACS+ VSAs, or SAML attributes. To create an access domain, **Add** a domain and configure the settings as described in the following table.



| Access Domain Settings | Description |
| --- | --- |
| Name | Enter a name for the access domain (up to 31 characters). The name is case-sensitive, must be unique, and can contain only letters, numbers, hyphens, and underscores. |
| Shared Objects | Select one of the following access privileges for the objects that device groups in this access domain inherit from the Shared location. Regardless of privilege, administrators can’t override shared or default (predefined) objects. • |






| • | **write**—Administrators can perform all operations on shared objects. This is the default value. |
| --- | --- |






| • | **shared-only**—Administrators can add objects only to Shared. Administrators can also display, edit, and delete shared objects but cannot move or clone them. A consequence of this selection is that administrators cannot perform any operations on non-shared objects other than to display them. |
| --- | --- |







 Device Groups


 Enable or disable read-write access for specific device groups in the access domain. You can also click **Enable All** or **Disable All**. Enabling read-write access for a device group automatically enables the same access for its descendants. If you manually disable a descendant, access for its highest ancestor automatically changes to read-only. By default, access is disabled for all device groups.
 If you want the list to display only specific device groups, select the device group names and **Filter Selected**.
 Note:



| | If you set the access for shared objects to **shared-only**, Panorama applies read-only access to any device groups for which you specify read-write access. |
| --- | --- |







 Templates


 For each template or template stack you want to assign, click **Add** and select it from the drop-down.




 Device Context
 (`Corresponds to the Device/Virtual Systems column in the Access Domain page`)


 Select the firewalls to which the administrator can switch context for performing local configuration. If the list is long, you can filter by **Device State**, **Platforms**, **Device Groups**, **Templates**, **Tags**, and **HA Status**.




 Log Collector Groups


 For each Collector Group you want to assign, **Add** and select it from the drop-down.



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)