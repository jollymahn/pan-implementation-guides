# Save Candidate Configurations

*Web Interface Basics : Save Candidate Configurations*

## Save Candidate Configurations


Select **Config** > **Save Changes** at the top right of the firewall or Panorama web interface to save a new snapshot file of the candidate configuration or to overwrite an existing configuration file. If the firewall or Panorama reboots before you commit your changes, you can then revert the candidate configuration to the saved snapshot to restore changes you made after the last commit. To revert to the snapshot, select **Device** > **Setup** > **Operations** and **Load named configuration snapshot**. If you don’t revert to the snapshot after a reboot, the candidate configuration will be the same as the last committed configuration (the running configuration).


You can filter which configuration changes to save based on administrator or location. The location can be specific virtual systems, shared policies and objects, or shared device and network settings.

 Fastpath:
 You should periodically save your changes so that you don’t lose them if the firewall or Panorama reboots.
 Note:



| | Saving your changes to the candidate configuration does not activate those changes; you must [Commit Changes](commit-changes.html#ID0EMSAK) to activate them. |
| --- | --- |




The Save Changes dialog displays the options described in the following table:



| Field/Button | Description |
| --- | --- |
| Save All Changes | Saves all changes for which you have administrative privileges (default). You cannot manually filter the scope of the configuration changes that the firewall saves when you select this option. Instead, the administrator role assigned to the account you used to log in determines the save scope: • |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine the save scope (see [Device > Admin Roles](device-admin-roles.html#ID0EQPDY)). If the profile includes the privilege to **Save For Other Admins**, the firewall saves changes configured by any and all administrators. If your Admin Role profile does not include the privilege to **Save For Other Admins**, the firewall saves only your changes and not those of other administrators. |
| --- | --- |



 If you have implemented access domains, the firewall automatically applies those domains to filter the save scope (see [Device > Access Domain](device-access-domain.html#ID0E2VEY)). Regardless of your administrative role, the firewall saves only the configuration changes in the access domains assigned to your account.




 Save Changes Made By


 Filters the scope of the configuration changes the firewall saves. The administrative role assigned to the account you used to log in determines your filtering options:



| • | **Superuser role**—You can limit the save scope to changes that specific administrators made and to changes in specific locations. |
| --- | --- |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine your filtering options (see [Device > Admin Roles](device-admin-roles.html#ID0EQPDY)). If the profile includes the privilege to **Save For Other Admins**, you can limit the save scope to changes configured by specific administrators and to changes in specific locations. If your Admin Role profile does not include the privilege to **Save For Other Admins**, you can limit the save scope only to the changes you made in specific locations. |
| --- | --- |



 Filter the save scope as follows:



| • | **Filter by administrator**—Even if your role allows saving the changes of other administrators, the save scope includes only your changes by default. To add other administrators to the save scope, click the **<usernames>** link, select the administrators, and click **OK**. |
| --- | --- |






| • | **Filter by location**—Select changes in specific locations to [Include in Save](save-candidate-configurations.html#ID0EHMDK). |
| --- | --- |



 If you have implemented access domains, the firewall automatically filters the save scope based on those domains (see [Device > Access Domain](device-access-domain.html#ID0E2VEY)). Regardless of your administrative role and your filtering choices, the save scope includes only the configuration changes in the access domains assigned to your account.




 Save Scope


 Lists the locations that have changes to save. Whether the list includes all changes or a subset of the changes depends on several factors, as described for the [Save All Changes](save-candidate-configurations.html#ID0EMOCK) and [Save Changes Made By](save-candidate-configurations.html#ID0EUSCK) options. The locations can be any of the following:



| • | **shared-object**—Settings that are defined in the Shared location. |
| --- | --- |






| • | **policy-and-objects**—(`Firewall only`) Policy rules or objects that are defined on a firewall that does not have multiple virtual systems. |
| --- | --- |






| • | **device-and-network**—(`Firewall only`) Network and device settings that are global (such as Interface Management profiles) and not specific to a virtual system. |
| --- | --- |






| • | **<virtual-system>**—(`Firewall only`) The name of the virtual system in which policy rules or objects are defined on a firewall that has multiple virtual systems. This also includes network and device settings that are specific to a virtual system (such as zones). |
| --- | --- |






| • | **<device-group>**—(`Panorama only`) The name of the device group in which the policy rules or objects are defined. |
| --- | --- |






| • | **<template>**—(`Panorama only`) The name of the template or template stack in which the settings are defined. |
| --- | --- |






| • | **<log-collector-group>**—(`Panorama only`) The name of the Collector Group in which the settings are defined. |
| --- | --- |






| • | **<log-collector>**—(`Panorama only`) The name of the Log Collector in which the settings are defined. |
| --- | --- |







 Location Type


 This column categorizes the locations where the changes were made:



| • | **Virtual Systems**—(`Firewall only`) Settings that are defined in a specific virtual system. |
| --- | --- |






| • | **Device Groups**—(`Panorama only`) Settings that are defined in a specific device group. |
| --- | --- |






| • | **Templates**—(`Panorama only`) Settings that are defined in a specific template or template stack. |
| --- | --- |






| • | **Collector Groups**—(`Panorama only`) Settings that are specific to a Collector Group configuration. |
| --- | --- |







 Include in Save
 (`Partial save only`**)**


 Enables you to select the changes you want to save. By default, all changes within the **Save Scope** are selected. This column displays only after you choose to **Save Changes Made By** specific administrators.
 Note:



| | There might be dependencies that affect the changes you include in a save. For example, if you add an object and another administrator then edits that object, you cannot save the change for the other administrator without also saving your own change. |
| --- | --- |







 Group by Location Type


 Groups the list of configuration changes in the **Save Scope** by **Location Type**.




 Preview Changes


 Enables you to compare the configurations you selected in the **Save Scope** to the running configuration. The preview window uses color coding to indicate which changes are additions (green), modifications (yellow), or deletions (red).
 To help you match the changes to sections of the web interface, you can configure the preview window to display **Lines of Context** before and after each change. These lines are from the files of the candidate and running configurations that you are comparing.
 Note:



| | Because the preview results display in a new window, your browser must allow pop-up windows. If the preview window does not open, refer to your browser documentation for the steps to unblock pop-up windows. |
| --- | --- |







 Change Summary


 Lists the individual settings for which you are saving changes. The **Change Summary** list displays the following information for each setting:



| • | **Object Name**—The name that identifies the policy, object, network setting, or device setting. |
| --- | --- |






| • | **Type**—The type of setting (such as Address, Security rule, or Zone). |
| --- | --- |






| • | **Location Type**—Indicates whether the setting is defined in **Virtual Systems**. |
| --- | --- |






| • | **Location**—The name of the virtual system where the setting is defined. The column displays **Shared** for settings that are not specific to a virtual system. |
| --- | --- |






| • | **Operations**—Indicates every operation (create, edit, or delete) performed on the setting since the last commit. |
| --- | --- |






| • | **Owner**—The administrator who made the last change to the setting. |
| --- | --- |






| • | **Will Be Saved**—Indicates whether the save operation will include the setting. |
| --- | --- |






| • | **Previous Owners**—Administrators who made changes to the setting before the last change. |
| --- | --- |



 Optionally, you can **Group By** column name (such as **Type**).




 Save


 Saves the selected changes to a configuration snapshot file:



| • | If you selected **Save All Changes**, the firewall overwrites the default configuration snapshot file (.snapshot.xml). |
| --- | --- |






| • | If you selected **Save Changes Made By**, specify the **Name** of a new or existing configuration file, and click **OK**. |
| --- | --- |






 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)