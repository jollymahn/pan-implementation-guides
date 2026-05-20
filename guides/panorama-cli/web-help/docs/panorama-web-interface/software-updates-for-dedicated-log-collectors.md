# Software Updates for Dedicated Log Collectors

*Panorama Web Interface : Panorama &gt; Managed Collectors : Software Updates for Dedicated Log Collectors*

Software Updates for Dedicated Log Collectors



| • | Panorama > Managed Collectors |
| --- | --- |




To install a software image on a Dedicated Log Collector, download or upload the image to Panorama (see [Panorama > Device Deployment](panorama-device-deployment.html#ID0E5BA4)), click **Install** and complete the following fields.

 Note:



| | Because the Panorama management server shares its operating system with the local default Log Collector, you upgrade both when installing a software update on the Panorama management server (see [Panorama > Software](panorama-software.html#ID0E2153)). |
| --- | --- |



 For Dedicated Log Collectors, you can also select **Panorama** > **Device Deployment** > **Software** to install updates (see [Manage Software and Content Updates](manage-software-and-content-updates.html#ID0E4PA4)).
 To reduce traffic on the management (MGT) interface, you can configure Panorama to use a separate interface for deploying updates (see [Panorama > Setup > Interfaces](panorama-setup-interfaces.html#ID0EOVP2)).


| Fields to Install a Software Update on a Log Collector | Description |
| --- | --- |
| File | Select a downloaded or uploaded software image. |
| Devices | Select the Log Collectors on which to install the software. The dialog displays the following information for each Log Collector: • |






| • | **Current Version**—The Panorama software release currently installed on the Log Collector. |
| --- | --- |






| • | **HA Status**—This column does not apply to Log Collectors. Dedicated Log Collectors do not support high availability. |
| --- | --- |







 Filter Selected


 To display only specific Log Collectors, select the Log Collectors and **Filter Selected**.




 Upload only to device (do not Install)


 Select to upload the software to the Log Collector without automatically rebooting it. The image is not installed until you manually reboot by logging into the Log Collector CLI and running the request restart system operational command.




 Reboot device after Install


 Select to upload and automatically install the software. The installation process reboots the Log Collector.



 Parent topic
 [Panorama > Managed Collectors](panorama-managed-collectors.html#ID0E3IO3)