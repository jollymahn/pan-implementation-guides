# Objects > External Dynamic Lists

*Objects : Objects &gt; External Dynamic Lists*

## Objects > External Dynamic Lists


An [external dynamic list](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-an-external-dynamic-list-in-policy.html) is an address object based on an imported list of IP addresses, URLs, domain names, International Mobile Equipment Identities (IMEIs), or International Mobile Subscriber Identities (IMSIs) that you can use in policy rules to block or allow traffic. This list must be a text file saved to a web server that is accessible by the firewall. By default, the firewall uses the management (MGT) interface to retrieve this list.


With an active Threat Prevention license, Palo Alto Networks provides multiple built-in [dynamic IP lists that you can use to block malicious hosts](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-an-external-dynamic-list-in-policy/built-in-edls.html). We update the lists daily based on our latest threat research.


You can use an IP address list as an address object in the source and destination of your policy rules; you can use a URL list in a URL Filtering profile ([Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR)) or as match criteria in Security policy rules; and you can use a domain list ([Objects > Security Profiles > Anti-Spyware Profile](objects-security-profiles-anti-spyware-profile.html#ID0E5GMR)) as a sinkhole for specified domain names.


On each firewall model, you can use up to 30 external dynamic lists with unique sources across all Security policy rules. The maximum number of entries that the firewall supports for each list type varies based on the firewall model (refer to the different firewall limits for each [external dynamic list](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-an-external-dynamic-list-in-policy/external-dynamic-list.html) type). List entries count toward the maximum only if the external dynamic list is used in a policy rule. If you exceed the maximum number of entries the model supports, the firewall generates a System log and skips the entries that exceed the limit. To check the number of IP addresses, domains, URLs, IMEIs, and IMSIs currently used in policy rules and the total number supported on the firewall, select **List Capacities** (`firewall only`).


The external dynamic lists display in the order they are evaluated, from top to bottom. To reorder the lists, use the directional controls at the bottom of the page. You can move the external dynamic lists with the most important entries to the top to ensure they are committed before you reach capacity limits.

 Note:



| | You cannot change the order of your external dynamic lists when **Group By Type** is enabled. |
| --- | --- |




To retrieve the latest version of an external dynamic list from the server that hosts it, select the external dynamic list and click **Import Now**.

 Note:



| | You cannot delete, clone, or edit the settings of the Palo Alto Networks malicious IP address feeds. |
| --- | --- |




**Add** a new external dynamic list and configure the settings described in the table below.



| External Dynamic List Settings | Description |
| --- | --- |
| Name | Enter a name to identify the external dynamic list (up to 32 characters). This name identifies the list for policy rule enforcement. |
| Shared (`Multiple virtual systems (multi-vsys) and Panorama only`) | Enable this option if you want the external dynamic list to be available to: • |



 If you disable (clear) this option, then the external dynamic list is available only to the **Virtual System** selected in the **Objects** tab.



| • | Every device group on Panorama. |
| --- | --- |



 If you disable (clear) this option, the external dynamic list is available only to the **Device Group** selected in the **Objects** tab.




 Disable override (`Panorama only`)


 Enable this option to prevent administrators from overriding the settings of this external dynamic list object in device groups that inherit the object. This option is disabled (cleared) by default, which means administrators can override the settings for any device group that inherits the object.




 Test Source URL (`Firewall only`)


 **Test Source URL** to verify that the firewall can connect to the server that hosts the external dynamic list.
 Note:



| | This test does not check whether the server authenticates successfully. |
| --- | --- |







 **Create List Tab**




 Type
 Note:



| | You cannot mix IP addresses, URLs, and domain names in a single list. Each list must include entries of only one type. |
| --- | --- |





 Select from the following types of external dynamic lists:



| • | **Predefined IP List**—Use a list that Palo Alto Networks identifies as bulletproof IP addresses, known malicious IP addresses, or high risk IP addresses as a source of list entries (requires an active Threat Prevention license). |
| --- | --- |






| • | **Predefined URL List**—Use a list of domains that Palo Alto Networks identifies as trusted to exclude these domains from Authentication policy. |
| --- | --- |






| • | **IP List** (default)—Each list can include IPv4 or IPv6 addresses, address ranges, and subnets. The list must contain only one IP address, range, or subnet per line. For example: |
| --- | --- |



 192.168.80.150/32 **2001:db8:123:1::1 or 2001:db8:123:1::/64 192.168.80.0/24 2001:db8:123:1::1 - 2001:db8:123:1::22
 In the example above, the first line indicates all addresses from 192.168.80.0 through 192.168.80.255. A subnet or an IP address range, such as 92.168.20.0/24 or 192.168.20.40 – 192.168.20.50, counts as one IP address entry and not as multiple IP addresses.



| • | **Domain List**—Each list can contain only one domain name entry per line. For example: |
| --- | --- |



 www.p301srv03.paloalonetworks.com **ftp.example.co.uk test.domain.net
 For the list of domains included in the external dynamic list, the firewall creates a set of custom signatures of the spyware type with medium severity so that you can use the sinkhole action for a custom list of domains.



| • | URL List**—Each list can have only one URL entry per line. For example: |
| --- | --- |



 financialtimes.co.in **www.wallaby.au/joey www.exyang.com/auto-tutorials/How-to-enter-Data-for-Success.aspx *.example.com/*
 The default action for each URL list is Allow**. To edit the default action, see [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR)**.
 Refer to the [External Dynamic List Formatting Guidelines](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-an-external-dynamic-list-in-policy/formatting-guidelines-for-an-external-dynamic-list) when creating an IP, Domain, or URL List entry.




 Type (cont)





| • | **Subscriber Identity List**—Each list contains subscriber IDs for a 3G, 4G, or 5G network. In the Source field, enter a URL for the firewall to access the list. |
| --- | --- |






| • | **Equipment Identity List**—Each list contains equipment IDs for a 3G, 4G, or 5G network. In the Source field, enter a URL for the firewall to access the list. |
| --- | --- |



 Note:



| | Determine which firewall model to purchase based on the total number of 3G, 4G, and 5G network identifiers your external dynamic list and static entries need to support. |
| --- | --- |







 Description


 Enter a description for the external dynamic list (up to 255 characters).




 Source





| • | If the external dynamic list is a Predefined IP List, select **Palo Alto Networks** - **Bulletproof IP addresses**, **Palo Alto Networks** - **High risk IP addresses**, or **Palo Alto Networks** - **Known malicious IP addresses** as the list source. |
| --- | --- |






| • | If the external dynamic list is a Predefined URL List, the default setting is **panw-auth-portal-exclude-list**. |
| --- | --- |






| • | If the external dynamic list is an IP List, a Domain List, or a URL List, enter an HTTP or HTTPS URL path that contains the text file (for example, http://192.0.2.20/myfile.txt). |
| --- | --- |






| • | If the external dynamic list is a Domain List, you can **Automatically expand to include subdomains**. This option enables the PAN-OS® software to evaluate all lower-level components of the domain names listed in the external dynamic list file. This option is disabled by default. |
| --- | --- |






| • | If the external dynamic list is a Subscriber Identity List or Equipment Identity List, enter a URL path that contains the list. |
| --- | --- |



 Note:**If your external dynamic list contains subdomains, these expanded entries count towards your appliance model capacity count. To manually define subdomains, you can disable this feature. However, if you disable this feature, subdomains will not be evaluated by policy rules unless you explicitly define them in the list.




 Certificate Profile
 (`IP List, Domain List, or URL List only**)


 If the external dynamic list has an HTTPS URL, select an existing certificate profile (firewall and Panorama`) or create a new **Certificate Profile** (`firewall only`) for authenticating the web server that hosts the list. For more information on configuring a certificate profile, see [Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ).
 Default: **None (Disable Cert profile)**
 Fastpath:
 To maximize the number of external dynamic lists you can use to enforce policy, use the same certificate profile to authenticate external dynamic lists from the same source URL. These lists count as only one external dynamic list. Otherwise, external dynamic lists from the same source URL that use different certificate profiles count as unique external dynamic lists.




 Client Authentication


 Enable this option (disabled by default) to add a username and password that the firewall will use when accessing an external dynamic list source that requires basic HTTP authentication. This setting is available only when the external dynamic list has an HTTPS URL.



| • | **Username**—Enter a valid username to access the list. |
| --- | --- |






| • | **Password/Confirm Password**—Enter and confirm the password for the username. |
| --- | --- |







 Check for updates


 Specify the frequency at which the firewall retrieves the list from the web server. You can set the interval to **Every Five Minutes** (default), **Hourly**, **Daily**, **Weekly**, or **Monthly**. The interval is relative to the last commit. For example, if you select the five-minute interval, a commit occurs in 5 minutes if the last commit was an hour ago. The commit updates all policy rules that reference the list.
 Note:



| | You do not have to specify a frequency for a predefined IP list because the firewall dynamically receives content updates with an active Threat Prevention license. |
| --- | --- |







 **List Entries and Exceptions Tab**




 List Entries


 Displays the entries in the external dynamic list.



| • | **Add an entry as a list exception**—Select up to 100 entries and **Submit** ( ). |
| --- | --- |






| • | **View an AutoFocus threat intelligence summary for an item**—Hover over an entry and select **AutoFocus** from the drop-down. You must have an AutoFocus™ license and enable AutoFocus threat intelligence to view an item summary (select **Device** > **Setup** > **Management** and edit the **AutoFocus** settings). |
| --- | --- |






| • | **Check if an IP address, domain, or URL is in the external dynamic list**—Enter a value in the filter field and **Apply Filter** ( ). **Clear Filter** ( **[X] ** ) to return to the complete list. |
| --- | --- |







 Manual Exceptions


 Displays exceptions to the external dynamic list.



| • | **Edit an exception**—Select an exception and make your changes. |
| --- | --- |






| • | **Manually enter an exception**—**Add** a new exception manually. |
| --- | --- |






| • | **Remove an exception from the Manual Exceptions list**—Select and **Delete** an exception. |
| --- | --- |






| • | **Check if an IP address, domain, or URL is in the Manual Exceptions list**—Enter a value in the filter field and **Apply Filter** ( ). **Clear Filter** ( **[X]** ) to return to the complete list. If you have duplicate entries in the Manual Exceptions list, you cannot save your changes to the external dynamic list. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)