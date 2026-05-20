# Device > Device Quarantine

*Device : Device &gt; Device Quarantine*

## Device > Device Quarantine


The **Device** > **Device Quarantine** page displays the devices that are in the quarantine list.


A device appears in the quarantine list as a result of the following actions:




| • | The system administrator added the device to this list manually. |
| --- | --- |



 To manually **Add** a device, enter the **Host ID** and, optionally, the **Serial Number** of the device you need to quarantine.



| • | The system administrator selected the Host ID column from the Traffic, GlobalProtect, Threat log, or Unified logs, selected a device from that column, and then selected **Block Device**. |
| --- | --- |






| • | The device was added to the quarantine list automatically: |
| --- | --- |






| ◦ | Using a log forwarding profile with a security policy rule whose match list had a built-in action set to **Quarantine**. |
| --- | --- |



 Note:
 The Host ID displays in the GlobalProtect logs automatically. For the Host ID to display in the Traffic, Threat, or Unified logs, the firewall must have at least one security policy rule with the **Source Device** set to **Quarantine**. Without this setting in the security policy, Traffic, Threat or Unified logs will not have the Host ID, and the log forwarding profile will not take effect.



| ◦ | Using HIP match log settings with built-in action set to **Quarantine**. |
| --- | --- |



 Note:
 The firewall requires a GlobalProtect subscription license to manually or automatically add GlobalProtect devices to the quarantine list and [block login for quarantined devices](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/host-information/quarantine-devices-using-host-information.html).



| • | The device was added to the quarantine list using an API. |
| --- | --- |






| • | The firewall received the quarantine list as a part of redistributed entry (the quarantine list was redistributed from another Panorama appliance or firewall). |
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



You can export the list of quarantined devices to a pdf or csv file.

 Parent topic
 [Device](device.html#ID0EY2QW)