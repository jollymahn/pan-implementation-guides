# HIP Objects General Tab

*GlobalProtect : Objects &gt; GlobalProtect &gt; HIP Objects : HIP Objects General Tab*

HIP Objects General Tab



| • | **Objects** > **GlobalProtect** > **HIP Objects** > <hip-object> > **General** |
| --- | --- |




Select the **General** tab to specify a name for the new HIP object and configure the object to match against general host information such as domain, operating system, or the type of network connectivity it has.



| HIP Object General Settings | Description |
| --- | --- |
| Name | Enter a name for the HIP object (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Shared | If you select **Shared**, the current HIP objects become available to: Every virtual system (vsys) on the firewall, if you are logged in to a firewall that is in multiple virtual system mode. If you clear this selection, the object will be available to only the vsys selected in the **Virtual System** drop-down of the **Objects** tab. For a firewall that is not in multi-vsys mode, this option is not available in the HIP Object dialog. All device groups on Panorama™. If you clear this selection, the object will be available only to the device group selected in the **Device Group** drop-down of the **Objects** tab. After you save the object, you cannot change its **Shared** setting. Select **Objects** > **GlobalProtect** > **HIP Objects** to see the current **Location**. |
| Description | (`Optional`) Enter a description. |
| Host Info | Select this option to activate the options for configuring the host information. |
| Managed | Filter based on whether the endpoint is managed or not managed. To match endpoints that are managed, select **Yes**. To match endpoints that are not managed, select **No**. |
| Disable override (`Panorama only`) | Controls override access to the HIP object in the device groups that are descendants of the **Device Group** selected in the **Objects** tab. Select this option to prevent administrators from creating local copies of the object in descendant device groups by overriding its inherited values. This option is cleared by default (override is enabled). |
| Domain | To match on a domain name, choose an operator from the drop-down and enter a string to match. |
| OS | To match on a host OS, choose **Contains** from the first drop-down, select a vendor from the second drop-down, and then select an OS version from the third drop-down; or you can select **All** to match on any OS version from the selected vendor. |
| Client Version | To match on a specific version number, select an operator from the drop-down and then enter a string to match (or not match) in the text box. |
| Host Name | To match on a specific host name or part of a host name, select an operator from the drop-down and then enter a string to match (or not match, depending on what operator you selected) in the text box. |
| Host ID | The host ID is a unique ID that GlobalProtect assigns to identify the host. The host ID value varies by device type: • |






| • | **macOS**—MAC address of the first built-in physical network interface |
| --- | --- |






| • | **Android**—Android ID |
| --- | --- |






| • | **iOS**—UDID |
| --- | --- |






| • | **Linux**—Product UUID retrieved from the system DMI table |
| --- | --- |






| • | **Chrome**—GlobalProtect-assigned unique alphanumeric string with length of 32 characters |
| --- | --- |



 To match on a specific host ID, select the operator from the drop-down and then enter a string to match (or not match, depending on what operator you selected) in the text box.




 Serial Number


 To match on all or part of an endpoint serial number, choose an operator from the drop-down and then enter a string to match.




 Network


 Use this field to enable filtering on a specific mobile device network configuration. This match criteria applies to mobile devices only.
 Select an operator from the drop-down and then select the type of network connection to filter on from the second drop-down: **Wifi**, **Mobile**, **Ethernet** (available only for **Is Not** filters), or **Unknown**. After you select a network type, enter any additional strings to match on, if available, such as the Mobile **Carrier** or Wifi **SSID**.



 Parent topic
 [Objects > GlobalProtect > HIP Objects](objects-globalprotect-hip-objects.html#ID0EFM41)