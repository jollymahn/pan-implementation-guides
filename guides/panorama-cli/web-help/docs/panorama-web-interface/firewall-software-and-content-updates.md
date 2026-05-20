# Firewall Software and Content Updates

*Panorama Web Interface : Panorama &gt; Managed Devices &gt; Summary : Firewall Software and Content Updates*

Firewall Software and Content Updates

To install a software or content update on a managed firewall, first use the **Panorama** > **Device Deployment** pages to download or upload the update to Panorama. Then select the **Panorama** > **Managed Devices** page, click **Install**, and complete the following fields.

 Tip:
 To reduce traffic on the management (MGT) interface, you can configure Panorama to use a separate interface for deploying updates (see [Panorama > Setup > Interfaces](panorama-setup-interfaces.html#ID0EOVP2)).


| Firewall Software/Content Update Installation Options | Description |
| --- | --- |
| Type | Select the type of update you want to install: PAN-OS **Software**, **GlobalProtect Client** software, **Apps and Threats** signatures, **Antivirus** signatures, **WildFire**, or **URL Filtering**. |
| File | Select the update image. The drop-down includes only images that you downloaded or uploaded to Panorama using the **Panorama** > **Device Deployment** pages. |
| Filters | Select Filters to filter the Devices list. |
| Devices | Select the firewalls on which you want to install the image. |
| Device Name | The firewall name. |
| Current Version | The update version of the selected **Type** that is currently installed on the firewall. |
| HA Status | Indicates whether the firewall is: • |






| • | **Passive**—Normal backup state |
| --- | --- |






| • | **Initiating**—The firewall is in this state for up to 60 seconds after bootup |
| --- | --- |






| • | **Non-functional**—Error state |
| --- | --- |






| • | **Suspended**—An administrator disabled the firewall |
| --- | --- |






| • | **Tentative**—For a link or path monitoring event in an active/active configuration |
| --- | --- |







 Group HA Peers


 Select to group firewalls that are peers in a high availability (HA) configuration.




 Filter Selected


 If you want the Devices list to display only specific firewalls, select the corresponding device names and **Filter Selected**.




 Upload only to device


 Select to upload the image on the firewall but not automatically reboot the firewall. The image is installed when you manually reboot the firewall.




 Reboot device after Install (`Software only`)


 Select to upload and install the software image. The installation process triggers a reboot.




 Disable new apps in content update (`Apps and Threats only`)


 Select to disable applications in the update that are new relative to the last installed update. This protects against the latest threats while giving you the flexibility to enable applications after preparing any policy updates. Then, to enable applications, log in to the firewall, select **Device** > **Dynamic Updates**, click **Apps** in the Features column to display the new applications, and click **Enable/Disable** for each application you want to enable.



 Parent topic
 [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3)