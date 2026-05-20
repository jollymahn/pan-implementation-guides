# Move Rules in Group to Different Rulebase or Device Group

*Objects : Objects &gt; Tags : View Rulebase as Groups : Move Rules in Group to Different Rulebase or Device Group*

Move Rules in Group to Different Rulebase or Device Group

If you need to organize your rulebase, select the tag group containing the rules you want to move and **Move Rules in Group to Different Rulesbase or Device Group** to reassign them to a different rulebase or device group (instead of moving each rule individually). The device group must already exist before (cannot be created while) moving rules in a tag group to a different device group. Additionally, you can move the rules in a tag group to a different rulebase within the same device group.


To move rules to a different rulebase or device group, enter the following:



| Field | Description |
| --- | --- |
| Destination | The target device group to move the policy rules. |
| (`Panorama only`) Destination Type | Select whether to move the rules to the **Pre-Rulebase** or **Post-Rulebase** of the destination device group. |
| Rule Order | Select where in the rulebase to move the rules. You can choose: • |






| • | **Move Bottom**—Move rules to the end of the rulebase of the destination device group. |
| --- | --- |






| • | **Before Rule**—Move rules before the selected rule in the rulebase of the destination device group. |
| --- | --- |






| • | **After Rule**—Move rules after the selected rule in the rulebase of the destination device group. |
| --- | --- |







 Error out on first detected error in validation


 Check this box to determine how errors are displayed if encountered during validation. If checked, each error is displayed individually. If unchecked, the errors are aggregated and displayed as a single error.
 Errors detected during validation cause the rule move job to fail, and no rules are moved to the destination device group.



 Parent topic
 [View Rulebase as Groups](view-rulebase-as-groups.html#ID0ESX4Q)