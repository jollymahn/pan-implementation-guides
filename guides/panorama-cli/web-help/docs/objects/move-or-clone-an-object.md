# Move or Clone an Object

*Objects : Move, Clone, Override, or Revert Objects : Move or Clone an Object*

Move or Clone an Object

When moving or cloning objects, you can assign a **Destination** (a virtual system on a firewall or a device group on Panorama™) for which you have access permissions, including the Shared location.


To move an object, select the object in the **Objects** tab, click **Move**, select **Move to other vsys** (`firewall only`) or **Move to other device group** (`Panorama only`), complete the fields in the following table, and then click **OK**.


To clone an object, select the object in the **Objects** tab, click **Clone**, complete the fields in the following table, and then click **OK**.



| Move/Clone Settings | Description |
| --- | --- |
| Selected Objects | Displays the Name and current Location (virtual system or device group) of the policies or objects you selected for the operation. |
| Destination | Select the new location for the policy or object: a virtual system, device group, or Shared. The default value is the **Virtual System** or **Device Group** that you selected in the **Policies** or **Objects** tab. |
| Error out on first detected error in validation | Select this option (selected by default) to make the firewall or Panorama display the first error it finds and stop checking for more errors. For example, an error occurs if the **Destination** doesn’t include an object that is referenced in the policy rule you are moving. If you clear this selection, the firewall or Panorama will find all errors before displaying them. |


 Parent topic
 [Move, Clone, Override, or Revert Objects](move-clone-override-or-revert-objects.html#ID0EAFTQ)