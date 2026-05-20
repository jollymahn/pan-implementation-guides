# Policies > QoS

*Policies : Policies &gt; QoS*

## Policies > QoS


Add [QoS policy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/quality-of-service/qos-concepts/qos-policy.html) rules to define the traffic that receives specific QoS treatment and assign a [QoS class](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/quality-of-service/qos-concepts/qos-classes) for each QoS policy rule to specify that the assigned class of service applies to all traffic matched to the associated rule as it exits a QoS-enabled interface.


QoS policy rules pushed to a firewall from Panorama are shown in orange and cannot be edited at the firewall level.


Additionally, to fully enable the firewall to provide QoS:




| • | Set bandwidth limits for each QoS class of service (select [Network > Network Profiles > QoS](network-network-profiles-qos.html#ID0EY3MW) to add or modify a QoS profile). |
| --- | --- |






| • | Enable QoS on an interface (select [Network > QoS](network-qos.html#ID0EDUXV)). |
| --- | --- |




Refer to [Quality of Service](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/quality-of-service.html) for complete QoS workflows, concepts, and use cases.


**Add** a new rule or clone an existing rule and then define the following fields.



| QoS Policy Rule Settings |
| --- |
| General Tab |
| Name |
| Description |
| Tag |
| Group Rules by Tag |
| Audit Comment |
| Audit Comment Archive |
| Source Tab |
| Source Zone |
| Source Address |






| • | Enter the first few characters of a name in the search field to list all addresses and address groups that start with those characters. Selecting an item in the list enables this option in the Available column. Repeat this process as often as needed, and then click **Add**. |
| --- | --- |






| • | Enter one or more IP addresses (one per line), with or without a network mask. The general format is: <ip_address>/<mask> |
| --- | --- |






| • | To remove addresses, select them (Selected column) and click **Delete** or select **any** to clear all addresses and address groups. |
| --- | --- |



 To add new addresses that can be used in this or other policies, click **New Address**. To define new address groups, select [Objects > Address Groups](objects-address-groups.html#ID0E12UQ).




 Source User


 Specify the source users and groups to which the QoS policy will apply.




 Negate


 Select this option to have the policy apply if the specified information on this tab does NOT match.




 Destination Tab




 Destination Zone


 Select one or more destination zones (default is **any**). Zones must be of the same type (Layer 2, Layer 3, or virtual wire).




 Destination Address


 Specify a combination of source IPv4 or IPv6 addresses for which the identified application can be overridden. To select specific addresses, choose **select** from the drop-down and do any of the following:



| • | Select this option next to the appropriate addresses and/or address groups in the Available column, and **Add** your selections to the Selected column. |
| --- | --- |






| • | Enter the first few characters of a name in the search field to list all addresses and address groups that start with those characters. Selecting an item in the list enables this option in the Available column. Repeat this process as often as needed, and then click **Add**. |
| --- | --- |






| • | Enter one or more IP addresses (one per line), with or without a network mask. The general format is: <ip_address>/<mask>. |
| --- | --- |






| • | To remove addresses, select them (Selected column) and click **Delete** or select **any** to clear all addresses and address groups. |
| --- | --- |



 To add new addresses that can be used in this or other policies, click **New Address**.




 Negate


 Select this option to have the policy apply if the specified information on this tab does not match.




 Application Tab




 Application


 Select specific applications for the QoS rule. To define new applications or application groups, select **Objects** > **Applications**.
 If an application has multiple functions, you can select the overall application or individual functions. If you select the overall application, all functions are included, and the application definition is automatically updated as future functions are added.
 If you are using application groups, filters, or container in the QoS rule, you can view details on these objects by holding your mouse over the object in the Application column, click the down arrow and select **Value**. This enables you to easily view application members directly from the policy without having to go to the **Objects** tab.




 Service/URL Category Tab




 Service


 Select services to limit to specific TCP and/or UDP port numbers. Choose one of the following from the drop-down:



| • | **any**—The selected applications are allowed or denied on any protocol or port. |
| --- | --- |






| • | **application-default**—The selected applications are allowed or denied only on their default **ports defined by Palo Alto Networks**. This option is recommended for allow policies. |
| --- | --- |






| • | **Select**—Click **Add**. Choose an existing service or choose **Service** or **Service Group** to specify a new entry. |
| --- | --- |







 URL Category


 Select URL categories for the QoS rule.



| • | Select **Any** to ensure that a session can match this QoS rule regardless of the URL category. |
| --- | --- |






| • | To specify a category, click **Add** and select a specific category (including a custom category) from the drop-down. You can add multiple categories. Refer to [Objects > External Dynamic Lists](objects-external-dynamic-lists.html#ID0EO4AR) for information on defining custom categories. |
| --- | --- |







 DSCP/TOS Tab




 Any


 Select **Any** (default) to allow the policy to match to traffic regardless of the Differentiated Services Code Point (DSCP) value or the IP Precedence/Type of Service (ToS) defined for the traffic.




 Codepoints


 Select **Codepoints** to enable traffic to receive QoS treatment based on the DSCP or ToS value defined a packet’s IP header. The DSCP and ToS values are used to indicate the level of service requested for traffic, such as high priority or best effort delivery. Using codepoints as matching criteria in a QoS policy allows a session to receive QoS treatment based on the codepoint detected at the beginning of the session.
 Continue to **Add** codepoints to match traffic to the QoS policy:



| • | Give codepoint entries a descriptive **Name**. |
| --- | --- |






| • | Select the **Type** of codepoint you want to use as matching criteria for the QoS policy and then select a specific **Codepoint** value. You can also create a **Custom Codepoint** by entering a **Codepoint Name** and **Binary Value**. |
| --- | --- |







 Other Settings Tab




 Class


 Choose the QoS class to assign to the rule, and click **OK**. Class characteristics are defined in the QoS profile. Refer to [Network > Network Profiles > QoS](network-network-profiles-qos.html#ID0EY3MW) for information on configuring settings for QoS classes.




 Schedule





| • | Select **None** for the policy rule to remain active at all times. |
| --- | --- |






| • | From the drop-down, select **Schedule** (calendar icon) to set a single time range or a recurring time range during which the rule is active. |
| --- | --- |







 Target Tab (`Panorama only`)




 Any (target all devices)


 Enable (check) to push the policy rule to all managed firewalls in the device group.




 Devices


 Select one or more managed firewalls associated with the device group to push the policy rule to.




 Tags


 **Add** one or more tags to push the policy rule to managed firewalls in the device group with the specified tag.




 Target to all but these specified devices and tags


 Enable (check) to push the policy rule to all managed firewalls associated with the device group except for the selected device(s) and tag(s).



 Parent topic
 [Policies](policies.html#ID0EK5IO)