# Objects > Address Groups

*Objects : Objects &gt; Address Groups*

## Objects > Address Groups


To simplify the creation of security policies, addresses that require the same security settings can be combined into address groups. An address group can be static or dynamic.




| • | Dynamic Address Groups: A dynamic address group populates its members dynamically using looks ups for tags and tag-based filters. Dynamic address groups are very useful if you have an extensive virtual infrastructure where changes in virtual machine location/IP address are frequent. For example, you have a sophisticated failover setup or provision new virtual machines frequently and would like to apply policy to traffic from or to the new machine without modifying the configuration/rules on the firewall. |
| --- | --- |



 To [use a dynamic address group in policy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/monitor-changes-in-the-virtual-environment/use-dynamic-address-groups-in-policy) you must complete the following tasks:



| ◦ | Define a dynamic address group and reference it in a policy rule. |
| --- | --- |






| ◦ | Notify the firewall of the IP addresses and the corresponding tags, so that members of the dynamic address group can be formed. You can do this using external scripts that use the XML API on the firewall or, for a VMware-based environment, you can select **Device** > **VM Information Sources** to configure settings on the firewall. |
| --- | --- |



 Dynamic address groups can also include statically defined address objects. If you create an address object and apply the same tags that you have assigned to a dynamic address group, that dynamic address group will include all static and dynamic objects that match the tags. You can, therefore use tags to pull together both dynamic and static objects in the same address group.



| • | Static Address Groups: A static address group can include address objects that are static, dynamic address groups, or it can be a combination of both address objects and dynamic address groups. |
| --- | --- |



 To create an address group, click **Add** and fill in the following fields:


| Address Group Settings | Description |
| --- | --- |
| Name | Enter a name that describes the address group (up to **63** characters). This name appears in the address list when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Shared | Select this option if you want the address group to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the address group will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this address group object in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object.




 Description


 Enter a description for the object (up to 1023 characters).




 Type


 Select **Static** or **Dynamic**.
 To create a dynamic address group, use the match criteria is assemble the members to be included in the group. Define the **Match** criteria using the **AND** or **OR** operators. Negation is not supported.
 Note:



| | To view the list of attributes for the match criteria, you must have configured the firewall to access and retrieve the attributes from the source/host. Each virtual machine on the configured information source(s) is registered with the firewall and the firewall can poll the machine to retrieve changes in IP address or configuration without any modifications on the firewall. |
| --- | --- |



 For a static address group, click **Add** and select one or more **Addresses**. Click **Add** to add an object or an address group to the address group. The group can contain address objects, and both static and dynamic address groups.




 Tags


 Select or enter the tags that you wish to apply to this address group. For information on tags, see [Objects > Tags](objects-tags.html#ID0EEU3Q).




 Members Count and Address


 After you add an address group, the Members Count column on the **Objects** > **Address Groups** page indicates whether the objects in the group are populated dynamically or statically.



| • | For a static address group, you can view the count of the members in the address group. |
| --- | --- |






| • | For an address group that uses tags to dynamically populate members or has both static and dynamic members, to view the members, click the **More...** link in the Address column. You can now view the IP addresses that are registered to the address group. |
| --- | --- |






| ◦ | Type indicates whether the IP address is a static address object or being dynamically registered and displays the IP address. |
| --- | --- |






| ◦ | Action allows you to **Unregister** **Tags** from an IP address. Click the link to **Add** the registration source and specify the tags to unregister. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)