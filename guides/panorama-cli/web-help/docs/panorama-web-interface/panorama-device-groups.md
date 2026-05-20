# Panorama > Device Groups

*Panorama Web Interface : Panorama &gt; Device Groups*

## Panorama > Device Groups


Device groups comprise firewalls and virtual systems you want to manage as a group, such as the firewalls that manage a group of branch offices or individual departments in a company. Panorama treats these groups as single units when applying policies. Firewalls can belong to only one device group but, because virtual systems are distinct entities in Panorama, you can assign virtual systems within a firewall to different device groups.


You can [nest device groups in a tree hierarchy](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-firewalls/manage-device-groups/create-a-device-group-hierarchy.html) of up to four levels under the Shared location to implement a layered approach for managing policies across your network of firewalls. At the bottom level, a device group can have parent, grandparent, and great-grandparent device groups at successively higher levels—collectively called ancestors—from which the bottom-level device group inherits policies and objects. At the top level, a device group can have child, grandchild, and great-grandchild device groups—collectively called descendants. When you select **Panorama** > **Device Groups**, the Name column displays this device group hierarchy.


After adding, editing, or deleting a device group, perform a Panorama commit and device group commit (see [Panorama Commit Operations](panorama-commit-operations.html#ID0EOOJ2)). Panorama then pushes the configuration changes to the firewalls that are assigned to the device group; Panorama supports up to 1,024 device groups.


To configure a device group, **Add** one and configure the settings as described in the following table.



| Device Group Settings | Description |
| --- | --- |
| Name | Enter a name to identify the group (up to 31 characters). The name is case-sensitive, must be unique across the entire device group hierarchy, and can contain only letters, numbers, spaces, periods, hyphens, and underscores. |
| Description | Enter a description for the device group. |
| Devices | Select each firewall that you want to add to the device group. If the list of firewalls is long, you can filter by **Device State**, **Platforms**, **Templates**, or **Tags**. The Filters section displays (in parentheses) the number of managed firewalls for each of these categories. If the purpose of a device group is purely organizational (that is, to contain other device groups), you don’t need to assign firewalls to it. |
| Select All | Selects every firewall and virtual system in the list. |
| Deselect All | Deselects every firewall and virtual system in the list. |
| Group HA Peers | Select to group firewalls that are peers in a high availability (HA) configuration. The list then displays the active (or active-primary in an active/active configuration) firewall first and the passive (or active-secondary in an active/active configuration) firewall in parentheses. This enables you to easily identify firewalls that are in HA mode. When pushing shared policies, you can push to the grouped pair instead of individual peers. Fastpath:  For HA peers in an active/passive configuration, consider adding both firewalls or their virtual systems to the same device group. This enables you to push the configuration to both peers simultaneously. |
| Filter Selected | If you want the Devices list to display only specific firewalls, select the firewalls and then **Filter Selected**. |
| Parent Device Group | Relative to the device group you are defining, select the device group (or the Shared location) that is just above it in the hierarchy (default is **Shared**). |
| Master Device | To configure policy rules and reports based on usernames and user groups, you must select a **Master Device**. This is the firewall from which Panorama receives usernames, user group names, and username-to-group mapping information. Note:  |







 Store users and groups from Master Device


 This option displays only if you select a **Master Device**. The option enables Panorama to locally store usernames, user group names, and username-to-group mapping information that it receives from the **Master Device**. To enable local storage, you must also select **Panorama** > **Setup** > **Management**, edit the Panorama Settings, and [Enable reporting and filtering on groups](device-setup-management.html#ID0E11XW).




 Dynamically Added Device Properties—When a new device is added to the device group, Panorama dynamically applies the specified authorization code and PAN-OS software version to the new device. This displays only after a device group is associated with an NSX service definition in Panorama.




 Authorization Code


 Enter the authorization code to be applied to devices added to this device group.




 SW Version


 Select the software version to be applied to devices added to this device group.



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)