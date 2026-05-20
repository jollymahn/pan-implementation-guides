# Revert Changes

*Web Interface Basics : Revert Changes*

## Revert Changes


Select **Config** > **Revert Changes** at the top right of the firewall or Panorama web interface to undo changes made to the candidate configuration since the last commit. Reverting changes restores the settings to the values of the running configuration. You can filter which configuration changes to revert based on administrator or location. The location can be specific virtual systems, shared policies and objects, or shared device and network settings.


You cannot revert changes until the firewall or Panorama finishes processing all commits that are pending or in progress. After you initiate the revert process, the firewall or Panorama automatically locks the candidate and running configurations so that other administrators cannot edit settings or commit changes. After completing the revert process, the firewall or Panorama automatically removes the lock.


The Revert Changes dialog displays the options described in the following table:



| Field/Button | Description |
| --- | --- |
| Revert All Changes | Reverts all changes for which you have administrative privileges (default). You cannot manually filter the scope of the configuration changes that the firewall reverts when you select this option. Instead, the administrator role assigned to the account you used to log in determines the revert scope: • |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine the revert scope (see [Device > Admin Roles](device-admin-roles.html#ID0EQPDY)). If the profile includes the privilege to **Commit For Other Admins**, the firewall reverts changes configured by any and all administrators. If your Admin Role profile does not include the privilege to **Commit For Other Admins**, the firewall reverts only your changes and not those of other administrators. |
| --- | --- |



 Note:



| | In Admin Role profiles, the privileges for committing also apply to reverting. |
| --- | --- |



 If you implemented access domains, the firewall automatically applies those domains to filter the revert scope (see [Device > Access Domain](device-access-domain.html#ID0E2VEY)). Regardless of your administrative role, the firewall reverts only the configuration changes in the access domains assigned to your account.




 Revert Changes Made By


 Filters the scope of configuration changes that the firewall reverts. The administrative role assigned to the account you used to log in determines your filtering options:



| • | **Superuser role**—You can limit the revert scope to changes that specific administrators made and to changes in specific locations. |
| --- | --- |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine your filtering options (see [Device > Admin Roles](device-admin-roles.html#ID0EQPDY)). If the profile includes the privilege to **Commit For Other Admins**, you can limit the revert scope to changes configured by specific administrators and to changes in specific locations. If your Admin Role profile does not include the privilege to **Commit For Other Admins**, you can limit the revert scope only to the changes you made in specific locations. |
| --- | --- |



 Filter the revert scope as follows:



| • | **Filter by administrator**—Even if your role allows reverting the changes of other administrators, the revert scope includes only your changes by default. To add other administrators to the revert scope, click the **<usernames>** link, select the administrators, and click **OK**. |
| --- | --- |






| • | **Filter by location**—Select the changes in specific locations to [Include in Revert](revert-changes.html#ID0EBHFK). |
| --- | --- |



 If you have implemented access domains, the firewall automatically filters the revert scope based on those domains (see [Device > Access Domain](device-access-domain.html#ID0E2VEY)). Regardless of your administrative role and your filtering choices, the revert scope includes only the configuration changes in the access domains assigned to your account.




 Revert Scope


 Lists the locations that have changes to revert. Whether the list includes all changes or a subset of the changes depends on several factors, as described for the [Revert All Changes](revert-changes.html#ID0E1FEK) and [Revert Changes Made By](revert-changes.html#ID0EALEK) options. The locations can be any of the following:



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






| • | **Device Group**—(`Panorama only`) Settings that are defined in a specific device group. |
| --- | --- |






| • | **Template**—(`Panorama only`) Settings that are defined in a specific template or template stack. |
| --- | --- |






| • | **Log Collector Group**—(`Panorama only`) Settings that are specific to a Collector Group configuration. |
| --- | --- |






| • | **Log Collector**—(`Panorama only`) Settings that are specific to a Log Collector configuration. |
| --- | --- |






| • | **Other Changes**—Settings that are not specific to any of the preceding configuration areas (such as shared objects). |
| --- | --- |







 Include in Revert
 (`Partial revert only`)


 Enables you to select the changes you want to revert. By default, all changes within the **Revert Scope** are selected. This column displays only after you choose to **Revert Changes Made By** specific administrators.
 Note:



| | There might be dependencies that affect the changes you include in a revert. For example, if you add an object and another administrator then edits that object, you cannot revert your change without also reverting the change for the other administrator. |
| --- | --- |







 Group by Location Type


 Lists the configuration changes in the **Revert Scope** by **Location Type**.




 Preview Changes


 Enables you to compare the configurations you selected in the **Revert Scope** to the running configuration. The preview window uses color coding to indicate which changes are additions (green), modifications (yellow), or deletions (red).
 To help you match the changes to sections of the web interface, you can configure the preview window to display **Lines of Context** before and after each change. These lines are from the files of the candidate and running configurations that you are comparing.
 Note:



| | Because the preview results display in a new window, your browser must allow pop-up windows. If the preview window does not open, refer to your browser documentation for the steps to unblock pop-up windows. |
| --- | --- |







 Change Summary


 Lists the individual settings for which you are reverting changes. The **Change Summary** list displays the following information for each setting:



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






| • | **Will Be Reverted**—Indicates whether the revert operation will include the setting. |
| --- | --- |






| • | **Previous Owners**—Administrators who made changes to the setting before the last change. |
| --- | --- |



 Optionally, you can **Group By** column name (such as **Type**).




 Revert


 Reverts the selected changes.



 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)