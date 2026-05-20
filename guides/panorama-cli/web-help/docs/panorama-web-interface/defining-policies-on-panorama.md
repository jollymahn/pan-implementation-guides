# Defining Policies on Panorama

*Panorama Web Interface : Defining Policies on Panorama*

## Defining Policies on Panorama


Device Groups on Panorama™ allow you to centrally manage firewall policies. You create policies on Panorama either as Pre Rules or Post Rules; Pre Rules and Post Rules allow you to create a layered approach for implementing policy.


You can define Pre rules and Post rules in a shared context, as shared policies for all managed firewalls, or in a device group context, to make the rules specific to a device group. Because you define Pre rules and Post Rules on Panorama and then push them from Panorama to the managed firewalls, you are able to view the rules on the managed firewalls but you can edit the Pre Rules and Post Rules only in Panorama.




| • | **Pre Rules**—Rules that are added to the top of the rule order and are evaluated first. You can use pre-rules to enforce the Acceptable Use Policy for an organization. For example, you can block access to specific URL categories or allow DNS traffic for all users. |
| --- | --- |






| • | **Post Rules**—Rules that are added at the bottom of the rule order and are evaluated after the pre-rules and rules that are locally defined on the firewall. Post-rules typically include rules to deny access to traffic based on the App-ID™, User-ID™, or Service. |
| --- | --- |






| • | **Default Rules**—Rules that specify how the firewall handles traffic that does not match any Pre Rules, Post Rules, or local firewall rules. These rules are part of the predefined Panorama configuration. To **Override** and enable editing of select settings in these rules, see [Overriding or Reverting a Security Policy Rule](overriding-or-reverting-a-security-policy-rule.html#ID0E5PSO). |
| --- | --- |




**Preview Rules** to view a list of all rules before you push the rules to the managed firewalls. Within each rulebase, the hierarchy of rules is visually demarcated for each device group (and managed firewall) to make it easier to scan through a large numbers of rules.


When you add a new rule, static operational data for the rule are displayed. The universally unique identifier (UUID) column displays the 36-character UUID for the rule. The firewall generates the UUID on a per-rule basis. However, if you are pushing rules from Panorama, these rules have the same UUID, which is also displayed in the Combined Rules Preview. The **Created** column displays the time and date the rule was added to the rulebase. Additionally, the **Modified** column displays the time and date for the last time the rule was edited. If a policy rule was created before upgrading to PAN-OS 9.0, the **First Hit** data is used to establish the **Created** date. If no **First Hit** data is available for the rule, the time and date the firewall or Panorama management server was upgraded to PAN-OS 9.0 is used to establish the **Created** date.


When you add or edit a rule in Panorama, a **Target** tab displays. You can use this tab to apply the rule to specific firewalls or descendant device groups of the **Device Group** (or Shared location) where the rule is defined. In the **Target** tab, you can select **Any** (default), which means the rule applies to all the firewalls and descendant device groups. To target specific firewalls or device groups, deselect **Any** and select specific firewalls or device groups by name. To exclude specific firewalls or device groups, deselect **Any**, select the specific firewalls and device groups by name, and select **Target to all but these specified devices**. If the list of device groups and firewalls is long, you can apply Filters to search the entries by attributes (such as Platforms) or by a text string for matching names.


After you successfully add and push a rule in Panorama, **Rule Usage** displays whether the rule is Used by all devices in the device group, Partially Used by some devices in the device group, or Unused by devices in the device group. Panorama determines rule usage based on managed firewalls with Policy Rule Hit Count (enabled by default). In the Panorama context, you can view the rule usage for a Shared policy rule across all device groups. Additionally, you can change the context to an individual device group and view the total policy rule usage across all devices in the device group. **Preview Rules** will show the **Hit Count**, **Last Hit**, and **First Hit** for each policy rule for the device group. The total traffic hit count, as well as the first and last hits timestamps, persist through reboot, upgrade, and dataplane restart events. See [Monitor Policy Rule Usage](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-firewalls/device-monitoring-on-panorama/monitor-policy-rule-usage).


**Group Rules by Tag** to apply a tag that allows you to group like policy rules for better visualization of rule functions and provides easier management of policy rules across your rulebase. Rules grouped by tags show the list of tag groups, but maintain the rule priority listing. You can append rules to the end of a tag group, move rules to a different tag group, apply additional tags to rules in a tag group, and filter or search using the group tag.


To track changes to policy rules, add an **Audit Comment** to describe the changes you make to and why a rule was created or modified. After you enter an audit comment is entered and configuration change is committed, the audit comment is preserved in the **Audit Comment Archive** where you can view all previous audit comments for the selected rule. You can search for the audit comment in Global Find. The Audit Comment Archive is read-only.


Administrative users who have access to the Policies tab can export the policy rules that are displayed on the web interface as **PDF/CSV**. See [Export Configuration Table Data](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/use-the-web-interface/export-configuration-table-data#id17BKEF00FH3).


To create policies, see the relevant section for each rulebase:




| • | [Policies > Security](policies-security.html#ID0ESNMO) |
| --- | --- |






| • | [Policies > NAT](policies-nat.html#ID0E1QXO) |
| --- | --- |






| • | [Policies > QoS](policies-qos.html#ID0ERS1O) |
| --- | --- |






| • | [Policies > Policy Based Forwarding](policies-policy-based-forwarding.html#ID0ECQ3O) |
| --- | --- |






| • | [Policies > Decryption](policies-decryption.html#ID0ERC6O) |
| --- | --- |






| • | [Policies > Network Packet Broker](policies-network-packet-broker.html#ID0EACCQ) |
| --- | --- |






| • | [Policies > Tunnel Inspection](policies-tunnel-inspection.html#ID0EWGFQ) |
| --- | --- |






| • | [Policies > Application Override](policies-application-override.html#ID0EXJHQ) |
| --- | --- |






| • | [Policies > Authentication](policies-authentication.html#ID0EWJJQ) |
| --- | --- |






| • | [Policies > DoS Protection](policies-dos-protection.html#ID0EYHMQ) |
| --- | --- |






| • | [Policies > SD-WAN](policies-sd-wan.html#ID0EQBPQ) |
| --- | --- |



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)