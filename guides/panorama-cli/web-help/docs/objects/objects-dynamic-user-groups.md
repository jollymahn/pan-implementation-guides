# Objects > Dynamic User Groups

*Objects : Objects &gt; Dynamic User Groups*

## Objects > Dynamic User Groups


To create a dynamic user group, select **Objects** > **Dynamic User Groups**, **Add** a new dynamic user group and then configure the following settings:



| Dynamic User Group Settings | Description |
| --- | --- |
| Name | Enter a **Name** that describes the dynamic user group (up to 63 characters). This name appears in the source user list when defining Security policy rules. The name must be unique and use only alphanumeric characters, spaces, hyphens, and underscores. |
| Description | Enter a **Description** for the object (up to 1,023 characters). |
| Shared (`Panorama only`) | Select this option if you want the match criteria of the dynamic user group to be available to every device group on Panorama. Note:**Panorama does not share the members of the group with device groups. If you clear this option, the match criteria of the dynamic user group are available only to the **Device Group** selected in the Objects** tab. |
| Disable override (`Panorama only`) | Select this option to prevent administrators from overriding the settings of this dynamic user group in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object. |
| Match | **Add Match Criteria** to define the members in the dynamic user group using the **AND** or **OR** operators to include multiple tags. Negation is not supported. Note:  |







 Tags


 (`Optional`) Select or enter the static object tags that you want to apply to the dynamic user group object. This tags the dynamic user group object itself, not the members in the group. The tags you select allow you to [group related items](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-tags-to-group-and-visually-distinguish-objects/view-rules-by-tag-group.html) and are not related to the match criteria. For information on tags, see [Objects > Tags](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-web-interface-help/objects/objects-tags.html).




After you add a dynamic user group, you can view the following information for the group:



| Dynamic User Groups Column | Description |
| --- | --- |
| Location (`Panorama only`) | Identifies whether the match criteria for the dynamic user group is available to every device group on Panorama (**Shared**) or to the selected device group. |
| Users | Select **more** to see the list of users in the dynamic user group. • |






| • | (`Optional`) Specify a **Timeout** in minutes (default is 0; range is 0 to 43,200) to remove users from the group when the specified time expires. |
| --- | --- |






| • | (`Optional`) **Add** **Users** to the group or **Delete** users from the group. |
| --- | --- |






| • | To remove tags from users and prevent them from becoming members of the group, select the users, and **Unregister Users**, and then select **Registration Source** and **Tags**. |
| --- | --- |






| • | When done reviewing or modifying the dynamic user group list of users, click **Close**. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)