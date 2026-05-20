# Device > Config Audit

*Device : Device &gt; Config Audit*

## Device > Config Audit


Select **Device** > **Config Audit** or **Panorama** > **Config Audit** to see the differences between configuration files. You can only compare two committed or saved configuration versions at a time.


On Panorama, you can only perform a config audit for configuration versions on Panorama, but not for managed firewalls. To perform a config audit for managed firewalls, you must access the firewall web interface.



| Config Audit Settings | Description |
| --- | --- |
| Versions | Committed configuration version on the firewall or Panorama. • |






| • | (`HA only`) **Peer-candidate**—The pending, uncommitted configuration on the HA peer of the firewall or Panorama. |
| --- | --- |






| • | (`HA only`) **Peer-running**—The current running configuration on the HA peer of the firewall or Panorama. |
| --- | --- |






| • | (`Firewall only`) **Merged Running config**—The configuration version previously pushed from Panorama. |
| --- | --- |






| • | (`Firewall only`) **Previously Merged Running config**—The currently running config pushed from Panorama. |
| --- | --- |






| • | **Running**—The current running configuration on the firewall or Panorama. The configuration version number of the current running configuration is also displayed. |
| --- | --- |






| • | **Committed Versions**—List of committed configuration version for configuration changes on the firewall or Panorama. The version is assigned to a config commit by default and is sequential. |
| --- | --- |






| • | **Saved Versions**—List of saved configuration versions on the [firewall](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/manage-configuration-backups/save-and-export-firewall-configurations) or [Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/administer-panorama/manage-panorama-and-firewall-configuration-backups/save-and-export-panorama-and-firewall-configurations). |
| --- | --- |







 Committed By


 Administrator that committed the configuration change.




 Commit Date


 The date and time the configuration change was committed. Format is month-day-year hour:minute:second.




 Object Changes


 Lists the number of configuration objects that were added (), deleted (), or modified () in the committed configuration version.




 Description


 The description included in the commit. This field is blank if no description was included in the commit.




 Context


 Use the **Context** drop-down to specify the number of lines to display before and after the highlighted differences in each file. Specifying more lines can help you correlate the audit results to settings in the web interface. If you set the **Context** to **All**, the results include the entire configuration files.




 Compare Versions


 Click **Compare Versions** to start the configuration audit.




 XML Diff


 Displays a side-by-side comparison of the XML file differences and highlights the differences line by line using colors to indicate additions (green), modifications (yellow), or deletions (red) between the two selected config versions.

 The left-hand XML is the older of the selected config versions and the right-hand XML is the newer of the selected config versions.




 Change Summary




 Object Name


 Name of the impacted object.




 Object Type


 Type of configuration object impacted.




 Modified Time


 Time the configuration object addition, deletion, or edit occurred. Format is Monday-Day-Year Hour:Minute:Second.




 Location


 Device group, template stack, or template the impacted object is a part of. Displays shared if the configuration object is **Shared**.




 Location Type


 The configuration container where the configuration change occurred. Can be:



| • | Device Group |
| --- | --- |






| • | Template |
| --- | --- |






| • | Template Stack |
| --- | --- |






| • | Template Stack |
| --- | --- |






| • | Device Config |
| --- | --- |






| • | Mgt Config |
| --- | --- |



 For standalone firewalls, Mgt Config applies to **Device** changes. For Panorama, applies to **Panorama** changes.




 Modified By


 Administrator that modified the configuration object.




 Operation


 Operation performed on the impacted object.



| • | **Set**—New configuration object was added. |
| --- | --- |






| • | **Edit**—Existing configuration object was modified. |
| --- | --- |






| • | **Rename**—Existing configuration object was renamed. |
| --- | --- |






| • | **Move**—Reordering or moving policy rules within a rulebase. |
| --- | --- |






| • | **Delete**—Configuration object was deleted. |
| --- | --- |







 Object Level Changes


 XML snippet displaying the configuration changes between the two config versions for the selected configuration object.



 Parent topic
 [Device](device.html#ID0EY2QW)