# Create Tags

*Objects : Objects &gt; Tags : Create Tags*

Create Tags



| • | **Objects** > **Tags** |
| --- | --- |




Select **Tags** to create a tag, assign a color or to delete, rename, and clone tags. Each object can have up to 64 tags; when an object has multiple tags, it displays the color of the first tag applied.


On the firewall, the **Tags** tab displays the tags that you define locally on the firewall or push from Panorama to the firewall. On Panorama, the **Tags** tab displays the tags that you define on Panorama. This tab does not display the tags that are dynamically retrieved from the VM Information sources defined on the firewall for forming dynamic address groups nor does it display tags that are defined using the XML or REST API.


When you create a new tag, the tag is automatically created in the Virtual System or Device Group that is currently selected on the firewall or Panorama.



| Tag Settings | Description |
| --- | --- |
| Name | Enter a unique tag name (up to 127 characters). The name is not case-sensitive. |
| Shared | Select this option if you want the tag to be available to: • |






| • | Every device group on Panorama. If you disable (clear) this option, the tag will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this tag in device groups that inherit the tag. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the tag.




 Color


 Select a color from the color palette in the drop-down (default is None).




 Comments


 Add a label or description to describe for what the tag is used.






| • | Add a tag: **Add** a tag and then fill in the following fields: |
| --- | --- |



 You can also create a new tag when you create or edit policy in the **Policies** tab. The tag is automatically created in the Device Group or Virtual System that is currently selected.



| • | Edit a tag: Click a tag to edit, rename, or assign a color to a tag. |
| --- | --- |






| • | Delete a tag: Click **Delete** and select the tag. You cannot delete a predefined tag. |
| --- | --- |






| • | Move or Clone a tag: The options to move or clone a tag allow you to copy a tag or move a tag to a different Device Group or Virtual System on firewalls with multiple virtual systems enabled. |
| --- | --- |



 Move or Clone and select the tag. Select the **Destination** location—Device Group or Virtual System. Disable (clear) this option to **Error out on first detected error in validation** if you want the validation process to discover all errors for the object before displaying the errors. This option is enabled by default and the validation process stops when the first error is detected and only displays the error.



| • | Override or Revert a tag (`Panorama only`): The **Override** option is available only if you did not select the **Disable override** option when you created the tag. The **Override** option allows you to override the color assigned to the tag that was inherited from a shared or ancestor device group. The **Location** is the current device group. You can also **Disable override** to prevent future override attempts. |
| --- | --- |



 **Revert** changes to undo recent modifications of a tag. When you revert a tag, the **Location** field displays the device group or virtual system from where the tag was inherited.
 Parent topic
 [Objects > Tags](objects-tags.html#ID0EEU3Q)