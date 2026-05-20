# Manage Software and Content Updates

*Panorama Web Interface : Panorama &gt; Device Deployment : Manage Software and Content Updates*

Manage Software and Content Updates



| • | Panorama > Device Deployment > Software |
| --- | --- |




Panorama provides the following options for deploying software and content updates to firewalls and Log Collectors.

 Tip:
 To reduce traffic on the management (MGT) interface, you can configure Panorama to use a separate interface for deploying updates (see [Panorama > Setup > Interfaces](panorama-setup-interfaces.html#ID0EOVP2)).


| Panorama Device Deployment Options | Description |
| --- | --- |
| Download | To deploy a software or content update when Panorama is connected to the Internet, **Download** the update. When the download finishes, the Available column displays Downloaded. You can then: • |






| • | [Activate](manage-software-and-content-updates.html#ID0EOCB4) the GlobalProtect™ app or SSL VPN Client software update. |
| --- | --- |







 Upgrade


 If a BrightCloud URL Filtering content update is available, click **Upgrade**. After a successful upgrade, you can [Install](manage-software-and-content-updates.html#ID0EYZA4) the update on firewalls.




 Install


 After you [Download](manage-software-and-content-updates.html#ID0EVUA4) or [Upload](manage-software-and-content-updates.html#ID0E6KB4) a PAN-OS software, Panorama software, or content update, click **Install** in the Action column and select:



| • | **Devices**—Select the firewalls or Log Collectors on which to install the update. If the list is long, use the Filters. Select **Group HA Peers** to group firewalls that are high availability (HA) peers. This enables you to easily identify firewalls that have an HA configuration. To display only specific firewalls or Log Collectors, select them and then **Filter Selected**. |
| --- | --- |






| • | **Reboot device after install** (`software only`)—Select to specify that the installation process automatically reboots the firewalls or Log Collectors. The installation cannot finish until a reboot occurs. |
| --- | --- |






| • | **Disable new apps in content update** (`Applications and Threats only`)—Select to disable applications in the update that are new relative to the last installed update. This protects against the latest threats while giving you the flexibility to enable applications after preparing any policy updates. Then, to enable applications, log in to the firewall, select **Device** > **Dynamic Updates**, click **Apps** in the Features column to display the new applications, and click **Enable/Disable** for each application you want to enable. |
| --- | --- |



 Tip:
 You can also select **Panorama** > **Managed Devices** to install [Firewall Software and Content Updates](firewall-software-and-content-updates.html#ID0EHPG3) or **Panorama** > **Managed Collectors** to install [Software Updates for Dedicated Log Collectors](software-updates-for-dedicated-log-collectors.html#ID0EJBT3).




 Activate


 After you [Download](manage-software-and-content-updates.html#ID0EVUA4) or [Upload](manage-software-and-content-updates.html#ID0E6KB4) a GlobalProtect app software update, click **Activate** in the Action column and select the options as follows:



| • | **Devices**—Select the firewalls on which to activate the update. If the list is long, use the Filters. Select **Group HA Peers** to group firewalls that are high availability (HA) peers. This enables you to easily identify firewalls that have an HA configuration. To display only specific firewalls, select them and then **Filter Selected**. |
| --- | --- |






| • | **Upload only to device**—Select if you don’t want PAN-OS to automatically activate the uploaded image. You must log in to the firewall and activate it. |
| --- | --- |







 Release Notes


 Click **Release Notes** to access the release notes for the desired software release and review the release changes, fixes, known issues, compatibility issues, and changes in default behavior.




 Documentation


 Click **Documentation** to access the release notes for the desired content release.







 Deletes software or content updates when no longer needed or when you want to free up space for more downloads or uploads.




 Check Now


 **Check Now** to [Display Software and Content Update Information](display-software-and-content-update-information.html#ID0E6YB4).




 Upload


 To deploy a software or content update when Panorama is not connected to the Internet, download the update to your computer from the [Software Updates](https://support.paloaltonetworks.com/Updates/SoftwareUpdates) or [Dynamic Updates](https://support.paloaltonetworks.com/Updates/DynamicUpdates) site, select the **Panorama** > **Device Deployment** page that corresponds to the update type, click **Upload**, select the update **Type** (`content updates only`), select the uploaded file, and click **OK**. The steps to then install or activate the update depend on the type:



| • | **PAN-OS or Panorama software**—When the upload is complete, the Downloaded column displays check mark and you can the Action column displays **Install**. |
| --- | --- |






| • | **GlobalProtect Client or SSL VPN Client software**—Activate from file. |
| --- | --- |






| • | **Dynamic updates**—Install from file. |
| --- | --- |







 Preferred Releases


 Select the **Preferred Releases** checkbox to view the list of preferred releases. Preferred releases offer the latest and advanced features. Ensure that you use preferred releases for stability and optimal performance.
 By default, both preferred and base releases are selected.
 If Panorama does not have access to the external network, use a browser to visit the [Software Update ](https://support.paloaltonetworks.com/Updates/SoftwareUpdates) site to view the preferred releases.




 Base Releases


 Select the **Base Releases** checkbox to view the list of base releases. A base release is the earliest version of a specific release.
 By default, both preferred and base releases are selected.
 If Panorama does not have access to the external network, use a browser to visit the [Software Update ](https://support.paloaltonetworks.com/Updates/SoftwareUpdates) site to view the base releases.




 Install from File


 After you upload a content update, click **Install from File**, select the content **Type**, select the filename of the update, and select the firewalls or Log Collectors.




 Activate from File


 After you upload a GlobalProtect app software update, click **Activate from File**, select the filename of the update, and select the firewalls.




 Schedules


 Select to [Schedule Dynamic Content Updates](schedule-dynamic-content-updates.html#ID0EBLC4).



 Parent topic
 [Panorama > Device Deployment](panorama-device-deployment.html#ID0E5BA4)