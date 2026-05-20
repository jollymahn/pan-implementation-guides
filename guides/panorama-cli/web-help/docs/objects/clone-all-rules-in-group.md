# Clone All Rules in Group

*Objects : Objects &gt; Tags : View Rulebase as Groups : Clone All Rules in Group*

Clone All Rules in Group

Rather than manually recreate existing policy rules in a tag group, **Clone All Rules in Group** to quickly duplicate rules in the selected tag group in the device group and rulebase of your choice. The device group must already exist before (cannot be created while) cloning rules in a tag group to a different device group. Additionally, you can clone the rules in a tag group to a different rulebase within the same device group.


Cloned rules are appended with the rule name and the following format: <Rule Name>-1. If a rule is cloned to the same location as the first cloned rule, and the name is not changed, then the name is appended. For example, <Rule Name>-2, <Rule Name>-3, and so on.


To clone rules, configure the following fields.



| Field | Description |
| --- | --- |
| Destination | The target device group of the cloned policy rules. |
| (`Panorama only`) Destination Type | Select whether to clone the rules to the **Pre-Rulebase** or **Post-Rulebase** of the destination device group. |
| Rule Order | Select where in the rulebase to clone the rules. You can choose: • |






| • | **Move Bottom**—Insert cloned rules at the end of the rulebase of the destination device group. |
| --- | --- |






| • | **Before Rule**—Insert cloned rules before the selected rule in the rulebase of the destination device group. |
| --- | --- |






| • | **After Rule**—Inserted cloned rules after the selected rule in the rulebase of the destination device group. |
| --- | --- |







 Error out on first detected error in validation


 Select this option to determine how errors are displayed if encountered during validation. If enabled, each error is displayed individually. If disabled (cleared), the errors are aggregated and displayed as a single error.
 Errors detected during validation cause the rule clone job to fail, and no rules are cloned to the destination device group.



 Parent topic
 [View Rulebase as Groups](view-rulebase-as-groups.html#ID0ESX4Q)