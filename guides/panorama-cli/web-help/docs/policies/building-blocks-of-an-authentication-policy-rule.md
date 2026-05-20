# Building Blocks of an Authentication Policy Rule

*Policies : Policies &gt; Authentication : Building Blocks of an Authentication Policy Rule*

Building Blocks of an Authentication Policy Rule

Whenever a user requests a resource (such as when visiting a web page), the firewall evaluates Authentication policy. Based on the matching policy rule, the firewall then prompts the user to respond to one or more challenges of different factors (types), such as login and password, voice, SMS, push, or one-time password (OTP) authentication. After the user responds to all the factors, the firewall evaluates Security policy (see [Policies > Security](policies-security.html#ID0ESNMO)) to determine whether to allow access to the resource.

 Note:



| | The firewall does not prompt users to authenticate if they access non-web-based resources (such as a printer) through a [GlobalProtect™ gateway](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-overview/about-the-globalprotect-components.html) that is internal or in tunnel mode. Instead, the users will see connection failure messages. To ensure users can access these resources, set up an authentication portal and train users to visit it when they see connection failures. Consult your IT department to set up an authentication portal. |
| --- | --- |




The following table describes each building block or component in an Authentication policy rule. Before you [Add](create-and-manage-authentication-policy.html#ID0EUTLQ) a rule, complete the prerequisites described in [Create and Manage Authentication Policy](create-and-manage-authentication-policy.html#ID0EKQLQ).



| Building Blocks in an Authentication Rule | Configured In | Description |
| --- | --- | --- |
| Rule number | N/A | Each rule is automatically numbered and the order changes as rules are moved. When you filter rules to match specific filters, the **Policies** > **Authentication** page lists each rule with its number in the context of the complete set of rules in the rulebase and its place in the evaluation order. For details, see [rule sequence and its evaluation order](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/enumeration-of-rules-within-a-rulebase.html). |
| Name | **General** | Enter a name to identify the rule. The name is case-sensitive and can have up to 63 characters, which can be letters, numbers, spaces, hyphens, and underscores. The name must be unique on a firewall and, on Panorama, unique within its device group and any ancestor or descendant device groups. |
| Description | Enter a description for the rule (up to 1024 characters). | |
| Tag | Select a tag for sorting and filtering rules (see [Objects > Tags](objects-tags.html#ID0EEU3Q)). | |
| Group Rules by Tag | Enter a tag with which to group similar policy rules. The group tag allows you to view your policy rule base based on these tags. You can group rules based on a **Tag**. | |
| Audit Comment | Enter a comment to audit the creation or editing of the policy rule. The audit comment is case-sensitive and can have up to 256 characters, which can be letters, numbers, spaces, hyphens, and underscores. | |
| Audit Comment Archive | View previous **Audit Comments** for the policy rule. You can export the Audit Comment Archive in CSV format. | |
| Bypass Web Proxy Authentication | Select this option to allow traffic that matches this policy rule to **Bypass Web Proxy Authentication** traffic. Note:**If you select this option, you must select an [address object](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-address-object-to-represent-ip-addresses/create-an-address-object)** that contains the source IP addresses of your trusted devices, a [custom URL category](https://docs.paloaltonetworks.com/advanced-url-filtering/administration/configuring-url-filtering/url-category-exceptions/create-a-custom-url-category) that contains the destination IP addresses of your trusted devices, or both. | |
| Source Zone | **Source** | **Add** zones to apply the rule only to traffic coming from interfaces in the zones that you specify (default is **any**). To define new zones, see [Network > Zones](network-zones.html#ID0EC6TT). |
| Source Address | **Add** addresses or address groups to apply the rule only to traffic originating from the sources that you specify (default is **any**). Select **Negate** to choose any address except the selected ones. To define new address or address groups, see [Objects > Addresses](objects-addresses.html#ID0E16TQ) and [Objects > Address Groups](objects-address-groups.html#ID0E12UQ). | |
| Source User | **User** | Select the source users or user groups to which the rule applies: • |






| • | **pre-logon**—Includes remote users who are not logged into their client systems but whose client systems connect to the network through the [GlobalProtect pre-logon feature](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-quick-configs/remote-access-vpn-with-pre-logon.html). |
| --- | --- |






| • | **known-user**—Includes all users for whom the firewall already has IP address-to-username mappings before the rule evokes authentication. |
| --- | --- |






| • | **unknown**—Includes all users for whom the firewall does not have IP address-to-username mappings. After the rule evokes authentication, the firewall creates user mappings for unknown users based on the usernames they entered. |
| --- | --- |






| • | **Select**—Includes only the users and user groups that you **Add** to the Source User list. |
| --- | --- |



 Note:



| | If the firewall collects user information from a RADIUS, TACACS+, or SAML identity provider server and not from the User-ID™ agent, the list of users does not display; you must enter user information manually. |
| --- | --- |







 Source HIP Profile


 **Add** host information profiles (HIP) to enable you to collect information about the security status of your end hosts, such as whether they have the latest security patches and antivirus definitions. For details and to define new HIPs, see [Objects > GlobalProtect > HIP Profiles](objects-globalprotect-hip-profiles.html#ID0EROD2).




 Destination Zone


 **Destination**


 **Add** zones to apply the rule only to traffic going to interfaces in the zones that you specify (default is **any**). To define new zones, see [Network > Zones](network-zones.html#ID0EC6TT).




 Destination Address


 **Add** addresses or address groups to apply the rule only to the destinations that you specify (default is **any**).
 Select **Negate** to choose any address except the selected ones.
 To define new address or address groups, see [Objects > Addresses](objects-addresses.html#ID0E16TQ) and [Objects > Address Groups](objects-address-groups.html#ID0E12UQ).




 Service


 **Service/URL Category**


 Select from the following options to apply the rule only to services on specific TCP and UDP port numbers:



| • | **any**—Specifies services on any port and using any protocol. |
| --- | --- |






| • | **default**—Specifies services only on the default ports that Palo Alto Networks defines. |
| --- | --- |






| • | **Select**—Enables you to **Add** services or service groups. To create new services and service groups, see [Objects > Services](objects-services.html#ID0EIQ2Q) and [Objects > Service Groups](objects-service-groups.html#ID0EBI3Q). |
| --- | --- |



 Fastpath:
 The default selection is **service-http**. When you use the Authentication policy for Authentication Portal, also enable **service-https** to ensure that the firewall learns user-to-ip-address mapping for all web traffic.




 URL Category


 Select the URL categories to which the rule applies:



| • | Select **any** to specify all traffic regardless of the URL category. |
| --- | --- |






| • | **Add** categories. To define custom categories, see [Objects > Custom Objects > URL Category](objects-custom-objects-url-category.html#ID0EWPIR). |
| --- | --- |







 Authentication Enforcement


 **Actions**


 Select the authentication enforcement object ([Objects > Authentication](objects-authentication.html#ID0EQOBS)) that specifies the method (such as Authentication Portal or browser challenge) and authentication profile that the firewall uses to authenticate users. The authentication profile defines whether users respond to a single challenge or to multi-factor authentication (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)). You can select a predefined or custom authentication enforcement object.
 Note:



| | If you must exclude hosts or servers from a Authentication Portal policy, add them to an Authentication Profile that specifies **no-captive-portal** as the **Authentication Enforcement**. However, Authentication Portal policies help the firewall learn user-to-IP-address mapping and should be used when possible. |
| --- | --- |







 Timeout


 To reduce the frequency of authentication challenges that interrupt the user workflow, you can specify the interval in minutes (default is 60) when the firewall prompts the user to authenticate only once for repeated access to resources.
 If the **Authentication Enforcement** object specifies multi-factor authentication, the user must authenticate once for each factor. The firewall records a timestamp and reissues a challenge only when the timeout for a factor expires. [Redistributing](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/deploy-user-id-in-a-large-scale-network/redistribute-user-mappings-and-authentication-timestamps.html) the timestamps to other firewalls enables you to apply the timeout even if the firewall that initially allows access for a user is not the same firewall that later controls access for that user.
 Note:



| | **Timeout** is a tradeoff between tighter security (less time between authentication prompts) and the user experience (more time between authentication prompts). More frequent authentication is often the right choice for access to critical systems and sensitive areas such as a data center. Less frequent authentication is often the right choice at the network perimeter and for businesses for which the user experience is key. |
| --- | --- |



 For perimeter resources, set the value to 480 minutes (8 hours) and for data center resources and critical systems, set a lower value such as 60 minutes to tighten security. Monitor and adjust the values as necessary.




 Log Authentication Timeouts


 Select this option (disabled by default) if you want the firewall to generate [Authentication](log-types.html#ID0EYLIM) logs whenever the **Timeout** associated with an authentication factor expires. Enabling this option provides more data to troubleshoot access issues. In conjunction with correlation objects, you can also use Authentication logs to identify suspicious activity on your network (such as brute force attacks).
 Note:



| | Enabling this option increases log traffic. |
| --- | --- |







 Log Forwarding


 Select a Log Forwarding profile if you want the firewall to forward [Authentication](log-types.html#ID0EYLIM) logs to Panorama or to external services such as a syslog server (see [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R)).




 Any (target all devices)
 `Panorama only`


 **Target**


 Enable (check) to push the policy rule to all managed firewalls in the device group.




 Devices
 `Panorama only`


 Select one or more managed firewalls associated with the device group to push the policy rule to.




 Tags
 `Panorama only`


 **Add** one or more tags to push the policy rule to managed firewalls in the device group with the specified tag.




 Target to all but these specified devices and tags
 `Panorama only`


 Enable (check) to push the policy rule to all managed firewalls associated with the device group except for the selected device(s) and tag(s).



 Parent topic
 [Policies > Authentication](policies-authentication.html#ID0EWJJQ)