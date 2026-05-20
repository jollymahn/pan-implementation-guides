# Move or Clone a Policy Rule

*Policies : Move or Clone a Policy Rule*

## Move or Clone a Policy Rule


When [moving or cloning policies](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/move-or-clone-a-policy-rule-or-object-to-a-different-virtual-system.html), you can assign a **Destination** (a virtual system on a firewall or a device group on Panorama) for which you have access permissions, including the Shared location.


To move a policy rule, select the rule in the **Policies** tab, click **Move**, select **Move to other vsys** (`firewalls only`) or **Move to different rulebase or device group** (`Panorama only`), specify the fields in the following table, and then click **OK**.


To clone a policy rule, select the rule in the **Policies** tab, click **Clone**, specify the fields in the following table, and then click **OK**.



| Move/Clone Settings | Description |
| --- | --- |
| Selected Rules | Displays the Name and current Location (virtual system or device group) of the policy rules you selected for the operation. |
| Destination | Select the new location for the policy or object: a virtual system, device group, or Shared. The default value is the **Virtual System** or **Device Group** that you selected in the **Policies** or **Objects** tab. |
| Rule order | Select the rule position relative to other rules: • |






| • | **Move bottom**—The rule will follow all other rules. |
| --- | --- |






| • | **Before rule**—In the adjacent drop-down, select the subsequent rule. |
| --- | --- |






| • | **After rule**—In the adjacent drop-down, select the preceding rule. |
| --- | --- |







 Error out on first detected error in validation


 Select this option (selected by default) to make the firewall or Panorama display the first error it finds and stop checking for more errors. For example, an error occurs if the **Destination** doesn’t include an object that is referenced in the policy rule you are moving. If you clear this selection, the firewall or Panorama will find all errors before displaying them.



 Parent topic
 [Policies](policies.html#ID0EK5IO)