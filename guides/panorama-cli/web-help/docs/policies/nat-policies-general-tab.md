# NAT Policies General Tab

*Policies : Policies &gt; NAT : NAT Policies General Tab*

NAT Policies General Tab



| • | Policies > NAT > General |
| --- | --- |




Select the **General** tab to configure a name and description for the NAT or NPTv6 policy. You can configure a tag to allow you to sort or filter policies when many policies exist. Select the type of NAT policy you are creating, which affects which fields are available on the **Original Packet** and **Translated Packet** tabs.



| NAT Rule - General Settings | Description |
| --- | --- |
| Name | Enter a name to identify the rule. The name is case-sensitive and can have up to 63 characters, which can be letters, numbers, spaces, hyphens, and underscores. The name must be unique on a firewall and, on Panorama, unique within its device group and any ancestor or descendant device groups. |
| Description | Enter a description for the rule (up to 1024 characters). |
| Tag | If you want to tag the policy, **Add** and specify the tag. A policy tag is a keyword or phrase that allows you to sort or filter policies. This is useful when you have defined many policies and want to view those that are tagged with a particular keyword. |
| Group Rules by Tag | Enter a tag with which to group similar policy rules. The group tag allows you to view your policy rule base based on these tags. You can group rules based on a **Tag**. |
| NAT Type | Specify the type of translation: • |






| • | **nat64**—translation between IPv6 and IPv4 addresses. |
| --- | --- |






| • | **nptv6**—translation between IPv6 prefixes. |
| --- | --- |



 You cannot combine IPv4 and IPv6 address ranges in a single NAT rule.




 Audit Comment


 Enter a comment to audit the creation or editing of the policy rule. The audit comment is case-sensitive and can have up to 256 characters, which can be letters, numbers, spaces, hyphens, and underscores.




 Audit Comment Archive


 View previous **Audit Comments** for the policy rule. You can export the Audit Comment Archive CSV format.



 Parent topic
 [Policies > NAT](policies-nat.html#ID0E1QXO)