# Panorama Commit Operations

*Panorama Web Interface : Panorama Commit Operations*

## Panorama Commit Operations


Click **Commit** at the top right of the web interface and select an operation for pending changes to the Panorama configuration and changes that Panorama pushes to firewalls, Log Collectors, and WildFire clusters and appliances:




| • | **Commit** > **Commit to Panorama**—Activates changes you made in the configuration of the Panorama management server. This action also commits device group, template, Collector Group, and WildFire cluster and appliance changes to the Panorama configuration without pushing the changes to firewalls, Log Collectors, or WildFire clusters and appliances. Committing just to the Panorama configuration enables you to save changes that are not ready for activation on the firewalls, Log Collectors, or WildFire clusters and appliances. |
| --- | --- |



 CAUTION:
 When pushing configurations to managed devices, Panorama 8.0 and later releases push the running configuration, which is the configuration that is committed to Panorama. Panorama 7.1 and earlier releases push the candidate configuration, which includes uncommitted changes. Therefore, Panorama 8.0 and later releases do not let you push changes to managed devices until you first commit the changes to Panorama.



| • | **Commit** > **Push to Devices**—Pushes the Panorama running configuration to device groups, templates, Collector Groups, and WildFire clusters and appliances. |
| --- | --- |






| • | **Commit** > **Commit and Push**—Commits all configuration changes to the local Panorama configuration and then pushes the Panorama running configuration to device groups, templates, Collector Groups, and WildFire clusters and appliances. |
| --- | --- |




You can filter pending changes by administrator or location and then commit, push, validate, or preview only those changes. The location can be specific device groups, templates, Collector Groups, Log Collectors, WildFire appliances and clusters, shared settings, or the Panorama management server.


**Auto-Commit**—An automatic commit, referred to as an auto-commit, is a PAN-OS function that reapplies the running configuration contained in the Panorama configuration file to Panorama on reboot. It is a background process, and the time to complete the auto-commit may vary depending on the complexity and size of the configuration. Auto-commit also acts as a form of configuration validation after a Panorama reboot as the validation process is included in every PAN-OS configuration commit.


When you commit changes, they become part of the running configuration. Changes that you haven’t committed are part of the candidate configuration. Panorama queues commit requests so that you can initiate a new commit while a previous commit is in progress. Panorama performs the commits in the order they are initiated but prioritizes auto-commits that are initiated by Panorama (such as FQDN refreshes). However, if the queue already has the maximum number of administrator-initiated commits, you must wait for Panorama to finish processing a pending commit before initiating a new one. You can use the [Task Manager](task-manager.html#ID0EJQDI) ( ) to clear the commit queue or see details about commits. For more information on configuration changes, commit processes, commit validations, and the commit queue, refer to [Panorama Commit and Validation Operations](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-overview/panorama-commit-validation-and-preview-operations.html). You can also [Save Candidate Configurations](save-candidate-configurations.html#ID0EZHCK), [Revert Changes](revert-changes.html#ID0E1BEK), and import, export, or load configurations ([Device > Setup > Operations](device-setup-operations.html#ID0EE34W)).


The following options are available for committing, validating, or previewing configuration changes.



| Field/Button | Description |
| --- | --- |
| The following options apply when you commit to Panorama by selecting **Commit** > **Commit to Panorama** or **Commit** > **Commit and Push**. | |
| Commit All Changes | Commits all changes for which you have administrative privileges (default). You cannot manually filter the scope of the configuration changes that Panorama commits when you select this option. Instead, the administrator role assigned to the account you used to log in determines the commit scope: • |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine the commit scope (see [Panorama > Admin Roles](panorama-admin-roles.html#ID0ESHA3)). If the profile includes the privilege to **Commit For Other Admins**, Panorama commits changes configured by any and all administrators. If your Admin Role profile does not include the privilege to **Commit For Other Admins**, Panorama commits only your changes and not those of other administrators. |
| --- | --- |



 If you have implemented access domains, Panorama automatically applies those domains to filter the commit scope (see [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3)). Regardless of your administrative role, Panorama commits only the configuration changes in the access domains assigned to your account.




 Commit Changes Made By


 Filters the scope of the configuration changes Panorama commits. The administrative role assigned to the account you used to log in determines your filtering options:



| • | **Superuser role**—You can limit the commit scope to changes that specific administrators made and to changes in specific locations. |
| --- | --- |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine your filtering options (see [Panorama > Admin Roles](panorama-admin-roles.html#ID0ESHA3)). If the profile includes the privilege to **Commit For Other Admins**, you can limit the commit scope to changes configured by specific administrators and to changes in specific locations. If your Admin Role profile does not include the privilege to **Commit For Other Admins**, you can limit the commit scope only to the changes you made in specific locations. |
| --- | --- |



 Filter the commit scope as follows:



| • | **Filter by administrator**—Even if your role allows committing the changes of other administrators, the commit scope includes only your changes by default. To add other administrators to the commit scope, click the <usernames> link, select the administrators, and click **OK**. |
| --- | --- |






| • | **Filter by location**—Select the specific locations for changes to [Include in Commit](panorama-commit-operations.html#ID0EX6K2). |
| --- | --- |



 If you have implemented access domains, Panorama automatically filters the commit scope based on those domains (see [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3)). Regardless of your administrative role and your filtering choices, the commit scope includes only the configuration changes in the access domains assigned to your account.
 Note:



| | After you load a configuration ([Device > Setup > Operations](device-setup-operations.html#ID0EE34W)), you must **Commit All Changes**. |
| --- | --- |



 When you commit changes to a device group, you must include the changes of all administrators who added, deleted, or repositioned rules for the same rulebase in that device group.




 Commit Scope


 Lists the locations that have changes to commit. Whether the list includes all changes or a subset of the changes depends on several factors, as described for [Commit All Changes](panorama-commit-operations.html#ID0EF2J2) and [Commit Changes Made By](panorama-commit-operations.html#ID0ER6J2). The locations can be any of the following:



| • | **shared-object**—Settings that are defined in the Shared location. |
| --- | --- |






| • | <device-group>—The name of the device group in which the policy rules or objects are defined. |
| --- | --- |






| • | <template>—The name of the template or template stack in which the settings are defined. |
| --- | --- |






| • | <log-collector-group>—The name of the Collector Group in which the settings are defined. |
| --- | --- |






| • | <log-collector>—The name of the Log Collector in which the settings are defined. |
| --- | --- |






| • | <wildfire-appliances>—The serial number of the WildFire appliance in which the settings are defined. |
| --- | --- |






| • | <wildfire-appliance-clusters>—The name of the WildFire cluster in which the settings are defined. |
| --- | --- |







 Location Type


 This column categorizes the locations of pending changes:



| • | **Panorama**—Settings that are specific to the Panorama management server configuration. |
| --- | --- |






| • | **Device Group**—Settings that are defined in a specific device group. |
| --- | --- |






| • | **Template**—Settings that are defined in a specific template or template stack. |
| --- | --- |






| • | **Log Collector Group**—Settings that are specific to a Collector Group configuration. |
| --- | --- |






| • | **Log Collector**—Settings that are specific to a Log Collector configuration. |
| --- | --- |






| • | **WildFire Appliance Clusters**—Settings that are specific to a WildFire appliance cluster configuration. |
| --- | --- |






| • | **WildFire Appliances**—Settings that are specific to a WildFire appliance. |
| --- | --- |






| • | **Other Changes**—Settings that are not specific to any of the preceding configuration areas (such as shared objects). |
| --- | --- |







 Object Type


 Displays the object type of the configuration change.
 For example, if you configured any network profile (**Network** > **Network Profiles**), profiles is displayed. If you configure an address group (**Objects** > **Address Groups**), address-group is displayed.




 Admins


 Name of the administrator that made the configuration change.




 Include in Commit
 (`Partial commit only`)


 Enables you to select the changes you want to commit. By default, all changes within the **Commit Scope** are selected. This column displays only after you choose to **Commit Changes Made By** specific administrators.
 Tip:
 There might be dependencies that affect the changes you include in a commit. For example, if you add an object and another administrator then edits that object, you cannot commit the change for the other administrator without also committing your own change.




 Group by Type


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






| • | **Location Type**—Indicates whether the setting is defined in **Device Groups**, **Templates**, **Collector Groups**, **WildFire Appliances**, or **Wildfire Appliance Clusters**. |
| --- | --- |






| • | **Location**—The name of the device group, template, Collector Group, WildFire cluster, or WildFire appliance where the setting is defined. The column displays **Shared** for settings that are not defined in these locations. |
| --- | --- |






| • | **Operations**—Indicates every operation (create, edit, or delete) performed on the setting since the last commit. |
| --- | --- |






| • | **Owner**—The administrator who made the last change to the setting. |
| --- | --- |






| • | **Will Be Committed**—Indicates whether the commit will include the setting. |
| --- | --- |






| • | **Previous Owners**—Administrators who made changes to the setting before the last change. |
| --- | --- |



 Optionally, you can **Group By** column name (such as **Type**).




 Validate Commit


 Validates whether the Panorama configuration has correct syntax and is semantically complete. The output includes the same errors and warnings that a commit would display, including rule shadowing and application dependency warnings. The validation process enables you to find and fix errors before you commit (it makes no changes to the running configuration). This is useful if you have a fixed commit window and want to be sure the commit will succeed without errors.




 The following options apply when you push configuration changes to managed devices by selecting **Commit** > **Push to Devices** or **Commit** > **Commit and Push**.




 Push All Changes


 Push all changes for which you have administrative privileges (default). You cannot manually filter the scope of the configuration changes that Panorama pushes when you select this option. Instead, the administrator role assigned to the account you used to log in determines the push scope:



| • | **Superuser role**—Panorama pushes the changes of all administrators. |
| --- | --- |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine the push scope (see [Panorama > Admin Roles](panorama-admin-roles.html#ID0ESHA3)). If the profile includes the privilege to **Commit For Other Admins**, Panorama pushes changes configured by any and all administrators. If your Admin Role profile does not include the privilege to **Push For Other Admins**, Panorama pushes only your changes and not those of other administrators. |
| --- | --- |



 If you have implemented access domains, Panorama automatically applies those domains to filter the push scope (see [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3)). Regardless of your administrative role, Panorama pushes only the configuration changes in the access domains assigned to your account.




 Push Changes Made By


 Filters the scope of the configuration changes Panorama pushes. The administrative role assigned to the account you used to log in determines your filtering options:



| • | **Superuser role**—You can limit the push scope to changes that specific administrators made and to changes in specific locations. |
| --- | --- |






| • | **Custom role**—The privileges of the Admin Role profile assigned to your account determine your filtering options (see [Panorama > Admin Roles](panorama-admin-roles.html#ID0ESHA3)). If the profile includes the privilege to **Push For Other Admins**, you can limit the push scope to changes configured by specific administrators and to changes in specific locations. If your Admin Role profile does not include the privilege to **Push For Other Admins**, you can limit the push scope only to the changes you made in specific locations. |
| --- | --- |



 Filter the push scope as follows:



| • | **Filter by administrator**—Even if your role allows pushing the changes of other administrators, the push scope includes only your changes by default. To add other administrators to the push scope, click the <usernames> link, select the administrators, and click **OK**. |
| --- | --- |






| • | **Filter by location**—Select the specific locations for changes to [Include in Push](panorama-commit-operations.html#ID0ESTM2). |
| --- | --- |



 If you have implemented access domains, Panorama automatically filters the push scope based on those domains (see [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3)). Regardless of your administrative role and your filtering choices, the push scope includes only the configuration changes in the access domains assigned to your account.




 Push Scope


 Lists the locations that have changes to push. The locations that the scope includes by default depend on which of the following options you select:



| • | **Commit** > **Commit and Push**—The scope includes all locations with changes that require a Panorama commit. |
| --- | --- |






| • | **Commit** > **Push to Devices**—The scope includes all locations associated with entities (firewalls, virtual systems, Log Collectors, WildFire clusters, WildFire appliances) that are Out of Sync with the Panorama running configuration (see [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3) and [Panorama > Managed Collectors](panorama-managed-collectors.html#ID0E3IO3) for the synchronization status). |
| --- | --- |



 For both selections, Panorama filters the **Push Scope** by:



| • | **Administrators**—Panorama applies the same filters as for the **Commit Scope** (see [Commit All Changes](panorama-commit-operations.html#ID0EF2J2) or [Commit Changes Made By](panorama-commit-operations.html#ID0ER6J2)). |
| --- | --- |






| • | **Access domains**—If you implemented access domains, Panorama automatically filters the **Push Scope** based on those domains (see [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3)). Regardless of your administrative role and your filtering choices, the scope includes the configuration changes only in access domains assigned to your account. |
| --- | --- |



 You can [Edit Selections](panorama-commit-operations.html#ID0EWUM2) for the **Push Scope** instead of accepting the default locations.
 You can [schedule a configuration push](panorama-scheduled-config-push.html#ID0EZEC3) when you select **Commit** > **Push to Devices**.




 Location Type


 This column categorizes the locations of pending changes:



| • | **Device Groups**—Settings defined in a specific device group. |
| --- | --- |






| • | **Templates**—Settings defined in a specific template or template stack. |
| --- | --- |






| • | **Log Collector Groups**—Settings specific to a Collector Group configuration. |
| --- | --- |






| • | **WildFire Clusters**—Settings specific to a WildFire cluster configuration. |
| --- | --- |






| • | **WildFire Appliances**—Settings specific to a WildFire appliance configuration. |
| --- | --- |







 Object Type


 Displays the object type of the configuration change.
 For example, if you configured any network profile (**Network** > **Network Profiles**), profiles is displayed. If you configured an address group (**Objects** > **Address Groups**), address-group is displayed.




 Entities


 For each device group or template, this column lists the firewalls (by device name or serial number) or virtual systems (by name) included in the push operation. **Edit Selections** to change the list of impacted firewalls or virtual systems to push the configuration changes to.
 Note:



| | If you push changes to a Collector Group, the operation includes all the Log Collectors that are members of the group, even though they are not listed. |
| --- | --- |







 Admins


 Name of the administrator that made the configuration change.




 Include in Push


 Enables you to select the changes you want to push. By default, all changes within the **Push Scope** are selected. This column displays only after you choose to **Push Changes Made By** specific administrators.




 Edit Selections


 Click to select the entities to include in the push operation:



| • | [Device Groups and Templates](panorama-commit-operations.html#ID0EO1M2) |
| --- | --- |






| • | [Log Collector Groups](panorama-commit-operations.html#ID0ERUN2) |
| --- | --- |






| • | [WildFire Appliances and Clusters](panorama-commit-operations.html#ID0EAYN2) |
| --- | --- |



 Note:



| | Panorama won’t let you push changes that you did not yet commit to the Panorama configuration. |
| --- | --- |







 Device Groups and Templates


 **Edit Selections** and select **Device Groups** or **Templates** to display the options in the following rows.




 Filters


 Filter the list of templates, template stacks, or device groups and the associated firewalls and virtual systems.
 You can also filter managed firewalls according to their commit state, device state, tags, and high availability (HA) status.




 Name


 Select the templates, template stacks, device groups, firewalls, or virtual systems to include in the push operation.




 Last Commit State


 Indicates whether the firewall and virtual system configurations are synchronized with the template or device group configurations in Panorama.




 HA Status


 Indicates the high availability (HA) state of the listed firewalls:



| • | **Active**—Normal traffic-handling operational state. |
| --- | --- |






| • | **Passive**—Normal backup state. |
| --- | --- |






| • | **Initiating**—The firewall is in this state for up to 60 seconds after bootup. |
| --- | --- |






| • | **Non-functional**—Error state. |
| --- | --- |






| • | **Suspended**—An administrator disabled the firewall. |
| --- | --- |






| • | **Tentative**—For a link or path monitoring event in an active/active configuration. |
| --- | --- |







 Changes Pending (Panorama) Commit


 Indicates whether a Panorama commit is (yes) or is not (no) required before you push changes to the selected firewalls and virtual systems.




 Preview Changes column


 **Preview Changes** to compare the configurations you selected in the **Push Scope** to the Panorama running configuration. Panorama filters the output to show results only for the firewalls and virtual systems you selected in the **Device Groups** or **Templates** tab. The preview window uses color coding to indicate which changes are additions (green), modifications (yellow), or deletions (red).
 Note:



| | Because the preview results display in a new browser window, your browser must allow pop-ups. If the preview window does not open, refer to your browser documentation for the steps to allow pop-ups. |
| --- | --- |







 Select All


 Selects all entries in the list.




 Deselect All


 Deselects all entries in the list.




 Expand All


 Displays the firewalls and virtual systems assigned to templates, template stacks, or device groups.




 Collapse All


 Displays only the templates, template stacks, or device groups, not the firewalls or virtual systems assigned to them.




 Group HA Peers


 Groups firewalls that are peers in a high availability (HA) configuration. The resulting list displays the active firewall (or active-primary firewall in an active/active configuration) first and the passive firewall (or active-secondary firewall in an active/active configuration) in parentheses. This enables you to easily identify firewalls that are in HA mode. When pushing shared policies, you can push to the grouped pair instead of individual peers.
 Fastpath:
 For HA peers in an active/passive configuration, consider adding both firewalls or their virtual systems to the same device group, template, or template stack so that you can push the configuration to both peers simultaneously.




 Validate


 Click to validate the configurations you are pushing to the selected firewalls and virtual systems. The Task Manager automatically opens to display the validation status.




 Filter Selected


 If you want the list to display only specific firewalls or virtual systems, select them and then select **Filter Selected**.




 Merge with Candidate Config


 (Selected by default) Merges the configuration changes pushed from Panorama with any pending configuration changes that administrators implemented locally on the target firewall. The push operation triggers PAN-OS® to commit the merged changes. If you clear this selection, the commit excludes the candidate configuration on the firewall.
 Fastpath:
 Clear this selection if you allow firewall administrators to commit changes locally on a firewall and you don’t want to include those local changes when committing changes from Panorama.
 Another best practice is to perform a configuration audit on the firewall to review any local changes before pushing changes from Panorama (see [Device > Config Audit](device-config-audit.html#ID0E5T6X)).




 Include Device and Network Templates
 (`Device Groups tab only`)


 (Selected by default) Pushes both the device group changes and the associated template changes to the selected firewalls and virtual systems in a single operation. To push these changes as separate operations, clear this option.




 Force Template Values


 Overrides all local settings with objects defined in the templates or template stacks. This includes locally configured objects as well as objects pushed from Panorama that were locally overwritten. If an object is locally configured on the firewall, but is not configured in a template or template stack, then it remains unchanged on the firewall and is not deleted. The setting is disabled by default and must be enabled (checked) on each push from Panorama to managed firewalls.
 CAUTION:
 If you push a configuration with **Force Template Values** enabled, all overridden values on the firewall are replaced with values from the template. Before you use this option, check for overridden values on the firewalls to ensure your commit does not result in any unexpected network outages or issues caused by replacing those overridden values.




 Log Collector Groups


 **Edit Selections** and select **Log Collector Groups** to include in the push operation. This tab displays the following options:



| • | **Select All**—Selects every Collector Group in the list. |
| --- | --- |






| • | **Deselect All**—Deselects every Collector Group in the list. |
| --- | --- |







 WildFire Appliances and Clusters


 **Edit Selections** and select **WildFire Appliances and Clusters** to display the following options.




 Filters


 Filter the list of WildFire appliances and clusters.




 Name


 Select the WildFire appliances and clusters to which Panorama will push changes.




 Last Commit State


 Indicates whether the WildFire appliance and cluster configurations are synchronized with Panorama.




 No Default Selections


 Enable (check) to remove the devices selected by default to manually select specific devices to push to. The default devices Panorama pushes to are based on the impacted device group and template configuration changes.
 Note:



| | Enabling this setting is persistent across pushes to devices (**Commit** > **Push to Devices** and **Commit** > **Commit and Push**) and is specific to the administrator account that enabled the setting. After you enable this setting for one push, this setting is enabled for all subsequent pushes until disabled. |
| --- | --- |







 Validate Device Group Push


 Validates the configurations you are pushing to the device groups in the Push Scope list. The Task Manager automatically opens to display the validation status.




 Validate Template Push


 Validates the configurations you are pushing to the templates in the Push Scope list. The Task Manager automatically opens to display the validation status.




 Group by Location Type


 Select to use **Location Type** to group the Push Scope list.




 The following options apply when you commit the Panorama configuration or push changes to devices.




 Description


 Enter a description (up to 512 characters) to help other administrators understand what changes you made.
 Note:



| | The System log for a commit event will truncate descriptions longer than 512 characters. |
| --- | --- |







 Commit / Push / Commit and Push


 Starts the commit or, if other commits are pending, adds the commit request to the commit queue.



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)