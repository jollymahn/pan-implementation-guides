# Security Policy Overview

*Policies : Policies &gt; Security : Security Policy Overview*

Security Policy Overview

Security policies allow you to enforce rules and take action, and can be as general or specific as needed. The policy rules are compared against the incoming traffic in sequence, and because the first rule that matches the traffic is applied, the more specific rules must precede the more general ones. For example, a rule for a single application must precede a rule for all applications if all other traffic-related settings are the same.

 Note:



| | To ensure that end users authenticate when they try to access your network resources, the firewall evaluates Authentication policy before Security policy. For details, see [Policies > Authentication](policies-authentication.html#ID0EWJJQ). |
| --- | --- |




For traffic that doesn’t match any user-defined rules, the default rules apply. The default rules—displayed at the bottom of the security rulebase—are predefined to allow all intrazone traffic (within the zone) and deny all interzone traffic (between zones). Although these rules are part of the predefined configuration and are read-only by default, you can **Override** them and change a limited number of settings, including the tags, action (allow or deny), log settings, and security profiles.


The interface includes the following tabs for defining Security policy rules.




| • | **General**—Select the **General** tab to configure a name and description for the Security policy rule. |
| --- | --- |






| • | **Source**—Select the **Source** tab to define the source zone or source address from which the traffic originates. |
| --- | --- |






| • | **User**—Select the **User** tab to enforce policy for individual users or a group of users. If you are using GlobalProtect™ with host information profile (HIP) enabled, you can also base the policy on information collected by GlobalProtect. For example, the user access level can be determined HIP that notifies the firewall about the user's local configuration. The HIP information can be used for granular access control based on the security programs that are running on the host, registry values, and many other checks such as whether the host has antivirus software installed. |
| --- | --- |






| • | **Destination**—Select the **Destination** tab to define the destination zone or destination address for the traffic. |
| --- | --- |






| • | **Application**—Select the **Application** tab to have the policy action occur based on an application or application group. An administrator can also use an existing App-ID™ signature and customize it to detect proprietary applications or to detect specific attributes of an existing application. Custom applications are defined in **Objects** > **Applications**. |
| --- | --- |






| • | **Service/URL Category**—Select the **Service/URL Category** tab to specify a specific TCP and/or UDP port number or a URL category as match criteria in the policy. |
| --- | --- |






| • | **Actions**—Select the **Actions** tab to determine the action that will be taken based on traffic that matches the defined policy attributes. |
| --- | --- |






| • | **Target**—Select the **Target** tab to specify devices or tags for the security policy rule. |
| --- | --- |






| • | **Usage**—Select the **Usage** tab to view a rule’s usage, including the number of applications seen on a rule, when the last new applications was seen on the rule, hit count data, traffic over the past 30 days, and when the rule was created and last edited. |
| --- | --- |



 Parent topic
 [Policies > Security](policies-security.html#ID0ESNMO)