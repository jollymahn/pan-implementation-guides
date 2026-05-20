# HTTP Header Insertion

*Objects : Objects &gt; Security Profiles &gt; URL Filtering : HTTP Header Insertion*

HTTP Header Insertion

To enable the firewall to manage web application access by inserting HTTP headers and their values into HTTP requests, select **Objects** > **Security Profiles** > **URL Filtering** > **HTTP Header Insertion**.

 Note:**The firewall supports header insertion for HTTP/1.x traffic only; the firewall does not support header insertion for HTTP/2 traffic.

You can create insertion entries based on a predefined HTTP header insertion type or you can create your own custom type. Header insertion is typically performed for custom HTTP headers but you can also insert standard HTTP headers.


Header insertion occurs when:




| 1. | An HTTP request matches a Security policy rule with one or more configured HTTP header insertion entries. |
| --- | --- |






| 2. | A specified domain matches the domain found in the HTTP Host header. |
| --- | --- |






| 3. | The action is anything other than block**. |
| --- | --- |



 Note:



| | The firewall can perform HTTP header insertion only for the GET, POST, PUT, and HEAD methods. |
| --- | --- |




If you enable HTTP header insertion and the identified header is missing from a request, the firewall inserts the header. If the identified header already exists in the request, then the firewall overwrites the header values with the values that you specify.


**Add** an insertion entry or select an existing insertion entry to modify it. When needed, you can also select an insertion entry and **Delete** it.

 Note:



| | The default block list action for a new HTTP header insertion entry is block. If you want a different action, go to [URL Filtering Categories](url-filtering-categories.html#ID0E6HRR) and select the appropriate action. Alternatively, add the insertion entry to a profile that is configured with the desired action. |
| --- | --- |





| HTTP Header Insertion Settings | Description |
| --- | --- |
| Name | The **Name** for this HTTP header insertion entry. |
| Type | The **Type** of entry you want to create. Entries can be either predefined or custom. The firewall uses content updates to populate and maintain predefined entries. To include the username in the HTTP header, select **Dynamic Fields**. |
| Domains | Header insertion occurs when a domain in this list matches the Host header of the HTTP request. If you are creating a predefined entry, the domain list is predefined in a content update. This is sufficient for most use cases but you can add or delete domains as needed. To create a custom entry, **Add** at least one domain to this list. Each domain name can be up to 256 characters and you can identify a maximum of 50 domains for each entry. You can use an asterisk (*) as a wildcard character, which matches any request to the specified domain (for example, *.etrade.com). |
| Header | When you create a predefined entry, the Header list is pre-populated by a content update. This is sufficient for most use cases but you can add or delete headers as needed. When you create a custom entry, add one or more headers (up to a total of five) to this list. Header names can have up to 100 characters but cannot include spaces. To include the username in the HTTP header, select **X-Authenticated-User** then select the **Value**, or **Add** a new header. |
| Value | Configure the **Value** using a maximum of 16K characters. The header value varies depending on what information you want to include in the HTTP header for the specified domains. For example, [manage user access to SaaS applications](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/http-header-insertion) by selecting [predefined types](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/http-header-insertion/http-header-insertion-create-predefined) or by using [custom entries](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/http-header-insertion/http-header-insertion-create-custom.html). To include the username in the HTTP header, select the domain and username format that the security device requires: • |






| • | WinNT://($domain)/($user) |
| --- | --- |



 Alternatively, enter a custom format using the ($user) and ($domain) dynamic tokens (for example, ($user)@($domain)).
 The firewall populates the user and domain dynamic tokens using the primary username in the group mapping profile.
 Note:**Use each ($user)** and ($domain) dynamic token only once per value.




 Log


 Select **Log** to enable logging of this header insertion entry.



 Parent topic
 [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR)