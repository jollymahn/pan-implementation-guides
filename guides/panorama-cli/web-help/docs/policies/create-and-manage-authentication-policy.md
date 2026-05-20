# Create and Manage Authentication Policy

*Policies : Policies &gt; Authentication : Create and Manage Authentication Policy*

Create and Manage Authentication Policy

Select the **Policies** > **Authentication** page to create and manage Authentication policy rules:



| Task | Description |
| --- | --- |
| Add | Perform the following prerequisites before creating Authentication policy rules: • |






| • | Configure a server profile that specifies how the firewall can access the service that will authenticate users (see [Device > Server Profiles](device-server-profiles.html#ID0EHKJZ)). |
| --- | --- |






| • | Assign the server profile to an authentication profile that specifies authentication settings (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)). |
| --- | --- |






| • | Assign the authentication profile to an authentication enforcement object that specifies the authentication method (see [Objects > Authentication](objects-authentication.html#ID0EQOBS)). |
| --- | --- |



 To create a rule, perform one of the following steps and then complete the fields described in [Building Blocks of an Authentication Policy Rule](building-blocks-of-an-authentication-policy-rule.html#ID0EWTJQ):



| • | Click **Add**. |
| --- | --- |






| • | Select a rule on which to base the new rule and click **Clone Rule**. The firewall inserts the copied rule, named <rulename>#, below the selected rule, where # is the next available integer that makes the rule name unique, and generates a new UUID for the cloned rule. For details, see [Move or Clone a Policy Rule](move-or-clone-a-policy-rule.html#ID0ECHKO). |
| --- | --- |







 Modify


 To modify a rule, click the rule Name and edit the fields described in [Building Blocks of an Authentication Policy Rule](building-blocks-of-an-authentication-policy-rule.html#ID0EWTJQ).
 Note:



| | If the firewall received the rule from Panorama, the rule is read-only; you can edit it only on Panorama. |
| --- | --- |







 Move


 When matching traffic, the firewall evaluates rules from top to bottom in the order that the **Policies** > **Authentication** page lists them. To change the evaluation order, select a rule and **Move Up**, **Move Down**, **Move Top**, or **Move Bottom**. For details, see [Move or Clone a Policy Rule](move-or-clone-a-policy-rule.html#ID0ECHKO).




 Delete


 To remove an existing rule, select and **Delete** it.




 Enable/Disable


 To disable a rule, select and **Disable** it. To re-enable a disabled rule, select and **Enable** it.




 Highlight Unused Rules


 To identify rules that have not matched traffic since the last time the firewall was restarted, **Highlight Unused Rules**. You can then decide whether to disable or delete unused rules. The page highlights unused rules with a dotted yellow background.




 Preview rules (`Panorama only`)


 Click **Preview Rules** to view a list of the rules before you push the rules to the managed firewalls. Within each rulebase, the page visually demarcates the rule hierarchy for each device group (and managed firewall) to facilitate scanning of numerous rules.



 Parent topic
 [Policies > Authentication](policies-authentication.html#ID0EWJJQ)