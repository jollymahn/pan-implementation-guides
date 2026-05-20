# Commit Changes

*Web Interface Basics : Commit Changes*

## Commit Changes


Click **Commit** at the top right of the web interface and specify an operation for pending changes to the firewall configuration: [commit (activate), validate, or preview](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/use-the-web-interface/commit-validate-and-preview-firewall-configuration-changes.html). You can filter pending changes by administrator or location and then preview, validate, and commit only those changes. The location can be specific virtual systems, shared policies and objects, or shared device and network settings.


The firewall queues commit requests so that you can initiate a new commit while a previous commit is in progress. The firewall performs the commits in the order they are initiated but prioritizes auto-commits that are initiated by the firewall (such as FQDN refreshes). However, if the queue already has the maximum number of administrator-initiated commits, you must wait for the firewall to finish processing a pending commit before initiating a new one.


Use the [Task Manager](task-manager.html#ID0EJQDI) to cancel commits or see details about commits that are pending, in progress, completed, or failed.


The Commit dialog displays the options described in the following table.



| Field/Button | Description |
| --- | --- |
| Commit All Changes | Commits all changes for which you have administrative privileges (default). You cannot manually filter the scope of the configuration changes that the firewall commits when you select this option. Instead, the administrator role assigned to the account you used to log in determines the commit scope: • |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine the commit scope (see [Device > Admin Roles](device-admin-roles.html#ID0EQPDY)). If the profile includes the privilege to **Commit For Other Admins**, the firewall commits changes configured by any and all administrators. If your Admin Role profile does not include the privilege to **Commit For Other Admins**, the firewall commits only your changes and not those of other administrators. |
| --- | --- |



 If you have implemented access domains, the firewall automatically applies those domains to filter the commit scope (see [Device > Access Domain](device-access-domain.html#ID0E2VEY)). Regardless of your administrative role, the firewall commits only the configuration changes in the access domains assigned to your account.




 Commit Changes Made By


 Filters the scope of the configuration changes the firewall commits. The administrative role assigned to the account you used to log in determines your filtering options:



| • | **Superuser role**—You can limit the commit scope to changes that specific administrators made and to changes in specific locations. |
| --- | --- |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine your filtering options (see [Device > Admin Roles](device-admin-roles.html#ID0EQPDY)). If the profile includes the privilege to **Commit For Other Admins**, you can limit the commit scope to changes configured by specific administrators and to changes in specific locations. If your Admin Role profile does not include the privilege to **Commit For Other Admins**, you can limit the commit scope only to the changes you made in specific locations. |
| --- | --- |



 Filter the commit scope as follows:



| • | **Filter by administrator**—Even if your role allows committing the changes of other administrators, the commit scope includes only your changes by default. To add other administrators to the commit scope, click the **<usernames>** link, select the administrators, and click **OK**. |
| --- | --- |






| • | **Filter by location**—Select the specific locations for changes to [Include in Commit](commit-changes.html#ID0E4NBK). |
| --- | --- |



 If you have implemented access domains, the firewall automatically filters the commit scope based on those domains (see [Device > Access Domain](device-access-domain.html#ID0E2VEY)). Regardless of your administrative role and your filtering choices, the commit scope includes only the configuration changes in the access domains assigned to your account.
 Note:



| | After you load a configuration ([Device > Setup > Operations](device-setup-operations.html#ID0EE34W)), you must **Commit All Changes**. |
| --- | --- |



 When you commit changes to a virtual system, you must include the changes of all administrators who added, deleted, or repositioned rules for the same rulebase in that virtual system.




 Commit Scope


 Lists the locations that have changes to commit. Whether the list includes all changes or a subset of the changes depends on several factors, as described for [Commit All Changes](commit-changes.html#ID0EGXAK) and [Commit Changes Made By](commit-changes.html#ID0ES2AK). The locations can be any of the following:



| • | **shared-object**—Settings that are defined in the Shared location. |
| --- | --- |






| • | **policy-and-objects**—Policy rules or objects that are defined on a firewall that does not have multiple virtual systems. |
| --- | --- |






| • | **device-and-network**—Network and device settings that are global (such as Interface Management profiles) and not specific to a virtual system. This also applies to network and device settings on a firewall that does not have multiple virtual systems. |
| --- | --- |






| • | **<virtual-system>**—The name of the virtual system in which policy rules or objects are defined on a firewall that has multiple virtual systems. This also includes network and device settings that are specific to a virtual system (such as zones). |
| --- | --- |







 Location Type


 This column categorizes the locations of pending changes:



| • | **Virtual Systems**—Settings that are defined in a specific virtual system. |
| --- | --- |






| • | **Other Changes**—Settings that are not specific to a virtual system (such as shared objects). |
| --- | --- |







 Include in Commit
 (`Partial commit only`)


 Enables you to select the changes you want to commit. By default, all changes within the **Commit Scope** are selected. This column displays only after you choose to **Commit Changes Made By** specific administrators.
 Note:



| | There might be dependencies that affect the changes you include in a commit. For example, if you add an object and another administrator then edits that object, you cannot commit the change for the other administrator without also committing your own change. |
| --- | --- |







 Group by Location Type


 Groups the list of configuration changes in the **Commit Scope** by **Location Type**.




 Preview Changes


 Enables you to compare the configurations you selected in the **Commit Scope** to the running configuration. The preview window uses color coding to indicate which changes are additions (green), modifications (yellow), or deletions (red).
 To help you match the changes to sections of the web interface, you can configure the preview window to display **Lines of Context** before and after each change. These lines are from the files of the candidate and running configurations that you are comparing.
 Note:



| | Because the preview results display in a new browser window, your browser must allow pop-ups. If the preview window does not open, refer to your browser documentation for the steps to allow pop-ups. |
| --- | --- |







 Change Summary


 Lists the individual settings for which you are committing changes. The **Change Summary** list displays the following information for each setting:



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






| • | **Will Be Committed**—Indicates whether the commit currently includes the setting. |
| --- | --- |






| • | **Previous Owners**—Administrators who made changes to the setting before the last change. |
| --- | --- |



 Optionally, you can **Group By** column name (such as **Type**).
 Select an object in the change list to view the **Object Level Difference**.




 Validate Commit


 Validates whether the firewall configuration has correct syntax and is semantically complete. The output includes the same errors and warnings that a commit would display, including rule shadowing and application dependency warnings. The validation process enables you to find and fix errors before you commit (it makes no changes to the running configuration). This is useful if you have a fixed commit window and want to be sure the commit will succeed without errors.




 Description


 Allows you to enter a description (up to 512 characters) to help other administrators understand what changes you made.
 Note:



| | The System log for a commit event will truncate descriptions longer than 512 characters. |
| --- | --- |







 Commit


 Starts the commit or, if other commits are pending, adds your commit to the commit queue.




 Commit Status


 Provides progress during the commit, then provides results after the commit. Commit results include success or failure, details of commit changes, and commit warnings. Warnings include:



| • | **Commit**—Lists general commit warnings. |
| --- | --- |






| • | **App Dependency**—Lists any app dependencies required for existing rules. |
| --- | --- |






| • | **Rule Shadow**—Lists any shadow rules. |
| --- | --- |






 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)