# Creating and Managing Policies

*Policies : Policies &gt; Security : Creating and Managing Policies*

Creating and Managing Policies

Select the **Policies** > **Security** page to [add](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-policy/create-a-security-policy-rule.html), modify, and manage security policies:



| Task | Description |
| --- | --- |
| Add | **Add** a new policy rule or select a rule on which to base a new rule and **Clone Rule**. The copied rule, “rulen” is inserted below the selected rule, where n is the next available integer that makes the rule name unique. For details on cloning, see [Move or Clone a Policy Rule](move-or-clone-a-policy-rule.html#ID0ECHKO). |
| Modify | Select a rule to modify its settings. If the rule is pushed from Panorama, the rule is read-only on the firewall and you cannot edit it locally. |
| **Override** and **Revert** actions pertain only to the default rules displayed at the bottom of the Security rulebase. These predefined rules—allow all intrazone traffic and deny all interzone traffic—instruct the firewall about how to handle traffic that does not match any other rule in the rulebase. Because they are part of the predefined configuration, you must **Override** them to edit select policy settings. If you are using Panorama, you can also **Override** the default rules and then push them to firewalls in a Device Group or Shared context. You can also **Revert** the default rules, which restores the predefined settings or the settings pushed from Panorama. For details, see [Overriding or Reverting a Security Policy Rule](overriding-or-reverting-a-security-policy-rule.html#ID0E5PSO). | |
| Move | Rules are evaluated from the top down and as they are enumerated on the **Policies** page. To change the order in which the rules are evaluated against network traffic, select a rule and **Move Up**, **Move Down**, **Move Top**, **Move Bottom**, or **Move to a different rulebase or device group**. For details, see [Move or Clone a Policy Rule](move-or-clone-a-policy-rule.html#ID0ECHKO). |
| Copy UUID | Copy the UUID of the rule to the clipboard for use when searching the configuration or the logs. |
| Delete | Select and **Delete** an existing rule. |
| Enable/Disable | To disable a rule, select and **Disable** it; to enable a rule that is disabled, select and **Enable** it. |
| Monitor Rule Usage | To identify rules that have not been used since the last time the firewall was restarted, **Highlight Unused Rules**. Unused rules have a dotted background. You can then decide whether to **Disable** a rule or **Delete** it. Rules not currently in use are displayed with a dotted yellow background. When policy rule hit count is enabled, the Hit Count data is used to determine whether a rule is unused. Fastpath:  Each firewall maintains a traffic flag for the rules that have a match. Because the flag is reset when a dataplane reset occurs on a reboot or a restart, it is best practice to monitor this list periodically to determine whether the rule had a match since the last check before you delete or disable it. |
| Reset rule Hit count | The **Hit Count** tracks the total traffic hits for the policy rule. The total traffic hit count persists through reboot, upgrade, and data plane restart. Alternatively, **Reset Rule Hit Counter** (bottom menu). To clear the hit count statistics, select **All Rules** or select specific rules and reset hit count statistics only for the **Selected rules**. View the **First Hit** to identify when the Security policy was first hit. The date is formated as date hh:mm:ss year. You cannot reset this value. View the **Last Hit** to identify when the Security policy was last used. The date is formated as date hh:mm:ss year. You cannot reset this value. |
| Show/Hide columns | Show or hide the columns that display under **Policies**. Select the column name to toggle the display. |
| Apply filters | To apply a filter to the list, select from the **Filter Rules** drop-down. To define a filter, choose **Filter** from the item drop-down. Note:  |







 To view the network sessions that were logged as matches against the policy, choose **Log Viewer** from the rule name drop-down.




 To display the current value, choose **Value** from the entry drop-down. You can also edit, filter, or remove items directly from the column menu. For example, to view addresses included in an address group, hover over the object in the **Address** column and select **Value** from the drop-down. This allows you to quickly view the members and the corresponding IP addresses for the address group without having to navigate to the **Object** tab.




 To find objects used within a policy based on their name or IP address, use the filter. After you apply the filter, you will see only the items that match the filter. The filter also works with embedded objects. For example, when you filter on 10.1.4.8, only the policy that contains that address is displayed:





 Preview rules (`Panorama only`)


 **Preview Rules** to view a list of the rules before you push the rules to the managed firewalls. Within each rulebase, the hierarchy of rules is visually demarcated for each device group (and managed firewall) to make it easier to scan through a large numbers of rules.




 Export Configuration Table


 Administrative roles with a minimum of read-only access can export the policy rulebase as **PDF/CSV**. You can apply filters to create more specific table configuration outputs as needed, such as for audits. Only visible columns in the web interface will be exported. See [Configuration Table Export](configuration-table-export.html#ID0EMWAM).




 Highlight Unused Rule


 Highlight any policy rule with no traffic matches in the **Rule Usage** column.




 Group


 Manage tag groups when you have the **View Rulebase as Groups** box checked. You can perform the following actions:



| • | **Move rules in group to different rulebase or device group**—Move the selected tag group to a different device group. |
| --- | --- |






| • | **Change group of all rules**—Move the rules in the selected tag group to a different tag group in the rulebase. |
| --- | --- |






| • | **Delete all rules in group**—Deletes all rules in the selected tag group. |
| --- | --- |






| • | **Clone all rules in group**—Clones the rules in the selected tag group to a device group. |
| --- | --- |







 View Rulebase as Groups


 **View Rulebase as Groups** to view the policy rulebase using the tag used in **Group Rules by Tag** . The visible policy rules are those which belong to the selected tag group.




 Test Policy Match


 Perform a test of the protection policies for the selected policy rulebase to verify that the correct traffic is denied and allowed.



 Parent topic
 [Policies > Security](policies-security.html#ID0ESNMO)