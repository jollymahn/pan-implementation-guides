# URL Filtering Settings

*Objects : Objects &gt; Security Profiles &gt; URL Filtering : URL Filtering Settings*

URL Filtering Settings

Select **Objects** > **Security Profiles** > **URL Filtering** > **URL Filtering Settings** to enforce safe search settings, and to enable logging of HTTP headers.



| URL Filtering Settings | Descriptions |
| --- | --- |
| Log container page only Default: Enabled | Select this option to log only the URLs that match the content type that is specified. The firewall doesn’t log related web links during the session, such as advertisements and content links, which reduces the logging and memory load while still logging relevant URLs. Tip:  If you use proxies that mask the original IP address of the source, enable the [HTTP Header Logging](https://docs.paloaltonetworks.com/advanced-url-filtering/administration/monitoring/http-header-logging.html) **X-Forwarded-For** option to preserve the original IP address of the user who initiate the web page request. |
| Enable Safe Search Enforcement Default: Disabled A URL filtering license is not required to use this feature. | Select this option to enforce strict safe search filtering. Many search engines have a safe search setting that filters out adult images and videos in search query return traffic. When you select the setting to Enable Safe Search Enforcement, the firewall blocks search results if the end user is not using the strictest safe search settings in the search query. The firewall can enforce safe search for the following search providers: Google, Yahoo, Bing, Yandex, and YouTube. This is a best-effort setting and is not guaranteed by the search providers to work with every website. To [use safe search enforcement](https://docs.paloaltonetworks.com/advanced-url-filtering/administration/url-filtering-features/safe-search-enforcement.html) you must enable this setting and then attach the URL filtering profile Security policy rule. The firewall will then block any matching search query return traffic that is not using the strictest safe search settings. Note:  |



 Tip:
 To prevent users from bypassing this feature by using other search providers, configure the URL filtering profile to block the search-engines category and then allow access to Bing, Google, Yahoo, Yandex, and YouTube.




 HTTP Header Logging


 Enabling HTTP Header Logging provides visibility into the attributes included in the HTTP request sent to a server. When enabled one or more of the following attribute-value pairs are recorded in the URL Filtering log:



| • | User-Agent—The web browser that the user used to access the URL. This information is sent in the HTTP request to the server. For example, the User-Agent can be Internet Explorer or Firefox. The User-Agent value in the log supports up to 1024 characters. |
| --- | --- |






| • | Referer—The URL of the web page that linked the user to another web page; it is the source that redirected (referred) the user to the web page that is being requested. The referer value in the log supports up to 256 characters. |
| --- | --- |






| • | X-Forwarded-For—The header field option that preserves the IP address of the user who requested the web page. It allows you to identify the IP address of the user, which is particularly useful if you have a proxy server on your network or you have implemented Source NAT, that is masking the user’s IP address such that all requests seem to originate from the proxy server’s IP address or a common IP address. The x-forwarded-for value in the log supports up to 128 characters. |
| --- | --- |






 Parent topic
 [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR)