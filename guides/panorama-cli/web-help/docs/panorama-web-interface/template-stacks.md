# Template Stacks

*Panorama Web Interface : Panorama &gt; Templates : Template Stacks*

Template Stacks

You can configure a template stack or assign templates to a template stack. Assigning firewalls to a template stack allows you to push all necessary settings to the firewalls instead of adding every setting to every template individually. Panorama supports up to 1,024 stacks. You can **Add Stack** to create a new template stack and configure the settings as described in the following table. After you configure a template stack, you must commit your changes in Panorama (see [Panorama Commit Operations](panorama-commit-operations.html#ID0EOOJ2)). Additionally, after you configure the network and device settings of firewalls assigned to the stack, you must perform a template commit and push the settings to the firewalls.

 CAUTION:
 Deleting a template stack or removing a firewall from a template stack does not delete the values that Panorama previously pushed to that firewall; however, when you remove a firewall from a template stack, Panorama no longer pushes new updates to that firewall.


| Template Stack Settings | Description |
| --- | --- |
| Name | Enter a stack name (up to 31 characters). The name is case-sensitive, must be unique, must start with a letter, and can contain only letters, numbers, and underscores. In the **Device** and **Network** tabs, the **Template** drop-down displays the stack name and its assigned templates. |
| Description | Enter a description for the stack. |
| Automatically push content when software device registers to Panorama | Enable this option when on-boarding VM-Series, CN-Series, or ZTP firewalls to Panorama to automatically push the latest content updates to the firewalls. |
| Templates | **Add** each template you want to include in the stack (up to 8). If templates have duplicate settings, Panorama pushes only the settings from the template that is higher in the list when pushing settings to the assigned firewalls. For example, if Template_A is above Template_B in the list and both templates define the ethernet1/1 interface, then Panorama pushes the ethernet1/1 definition from Template_A and not from Template_B. To change the order of templates in the list, select a template and **Move Up** or **Move Down**. CAUTION:  Panorama doesn’t validate template combinations in stacks so [plan the order](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-firewalls/manage-templates-and-template-stacks/configure-a-template-stack.html) of your templates to avoid invalid relationships. |
| Devices | Select each firewall that you want to add to the stack. If the list of firewalls is long, you can filter the list by **Platforms**, **Device Groups**, **Tags**, and **HA Status**. Note:  |







 Select All


 Selects every firewall in the list.




 Deselect All


 Deselects every firewall in the list.




 Group HA Peers


 Groups firewalls that are high availability (HA) peers. This enables you to easily identify firewalls that have an HA configuration. When pushing settings from the template stack, you can push to the grouped pair instead of to each firewall individually.




 Filter Selected


 To display only specific firewalls, select them and then **Filter Selected**.




 User-ID Master Device


 Configure Panorama as a User-ID Master Device for mappings.




 Cloud Identity Engine


 **Add** a Cloud Identity Engine instance to authenticate users using the authentication profile that you configure in the Cloud Identity Engine.




 Templates


 **Add** or **Delete** a pre-configured template. **Move Up** or **Move Down** templates to change priority. The template at the top has the highest priority.



 Parent topic
 [Panorama > Templates](panorama-templates.html#ID0E1SK3)