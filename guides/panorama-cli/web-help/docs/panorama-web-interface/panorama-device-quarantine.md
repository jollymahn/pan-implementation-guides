# Panorama > Device Quarantine

*Panorama Web Interface : Panorama &gt; Managed Devices &gt; Summary : Panorama &gt; Device Quarantine*

Panorama > Device Quarantine

The **Panorama** > **Device Quarantine** page displays the devices that are in the quarantine list. Devices appear in this list as a result of the following actions:




| • | The system administrator added the device to this list manually. |
| --- | --- |



 To manually **Add** a device, enter the **Host ID** and, optionally, the **Serial Number** of the device you need to quarantine.



| • | The system administrator selected the Host ID column from the Traffic, GlobalProtect, or Threat log, selected a device from that column, and then selected **Block Device**. |
| --- | --- |






| • | The device matched a Security policy rule that has a log forwarding profile whose match list had a built-in action set to **Quarantine**. |
| --- | --- |



 Note:



| | The Host ID displays in the GlobalProtect logs automatically. For the Host ID to display in the Traffic, Threat, or Unified logs, the Panorama appliance must have at least one security policy rule with the **Source Device** set to **Quarantine**. Without this setting in the security policy, Traffic, Threat or Unified logs will not have the Host ID, and the log forwarding profile will not take effect. |
| --- | --- |






| • | The device was added to the quarantine list using an API. |
| --- | --- |






| • | The Panorama appliance received the quarantine list as a part of redistributed entry (the quarantine list was redistributed from another Panorama appliance or firewall). |
| --- | --- |




The Device Quarantine table includes the following fields.



| Field | Description |
| --- | --- |
| Host ID | The Host-ID of the host that is blocked. |
| Reason | The reason that the device is quarantined. A reason of **Admin Add** means that an administrator manually added the device to the table. |
| Time Stamp | The time that the administrator or Security policy rule added the device to the quarantine list. |
| Source Device/App | The IP address of the Panorama, firewall, or third-party app that added the device to the quarantine list. |
| Serial Number | (`Optional`) The serial number of the quarantined device (if available). |
| User Name | (`Optional`) The username of the GlobalProtect client user who was logged in to the device when it was quarantined. |


 Parent topic
 [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3)