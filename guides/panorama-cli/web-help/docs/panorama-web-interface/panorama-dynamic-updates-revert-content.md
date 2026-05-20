# Revert Content Versions from Panorama

*Panorama Web Interface : Panorama &gt; Device Deployment : Revert Content Versions from Panorama*

Revert Content Versions from Panorama



| • | Panorama > Device Deployment > Dynamic Updates |
| --- | --- |




Quickly **Revert Content** version of the Applications, Applications and Threats, Antivirus, WildFire and WildFire content updates of one or more firewalls to the previously installed content version from Panorama. The content version you are reverting to must be an older version than the one currently installed on the firewall. Reverting content is available on Panorama running 8.1. Content on firewalls can be reverted so long as the revert function is available locally on the firewall.



| Field | Description |
| --- | --- |
| Filter | Filter which devices you would like to revert content. You can filter by: • |






| • | Platforms |
| --- | --- |






| • | Device Groups |
| --- | --- |






| • | Templates |
| --- | --- |






| • | Tags |
| --- | --- |






| • | HA Status |
| --- | --- |






| • | Software Version (PAN-OS) |
| --- | --- |






| • | Current Content Version |
| --- | --- |







 Devices


 Select one or more devices to revert. Displays the following devices information:



| • | Device Name—The name of the firewall. |
| --- | --- |






| • | Current version—Current content version installed on the device. Column will show 0 if no content version is installed. |
| --- | --- |






| • | Previous version (content)—The previously installed content version on the firewalls running PAN 8.1 or later. Column will be blank if no content version was previously installed or if the firewall is running a PAN-OS version prior to 8.1 |
| --- | --- |






| • | Software Version—The current PAN-OS version installed on the device. |
| --- | --- |






| • | HA Status—Displays HA status when an in HA pair. Column will be blank if the device is not in an HA pair. |
| --- | --- |







 Group HA pairs


 Check this box to group HA peers.




Once you have selected the devices to revert, click **OK**.

 Parent topic
 [Panorama > Device Deployment](panorama-device-deployment.html#ID0E5BA4)