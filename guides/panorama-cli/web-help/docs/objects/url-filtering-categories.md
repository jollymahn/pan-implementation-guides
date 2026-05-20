# URL Filtering Categories

*Objects : Objects &gt; Security Profiles &gt; URL Filtering : URL Filtering Categories*

URL Filtering Categories

Select **Objects** > **Security Profiles** > **URL Filtering** > **Categories** to control access to websites based on URL categories.



| Categories Settings | Description |
| --- | --- |
| Category | Displays the URL categories and lists for which you can define web access and usage policy. By default, the **Site Access** and **User Credential Submission** permissions for all categories are set to **Allow**. URL categories and lists are grouped into three drop-downs: • |






| • | **External Dynamic URL Lists**— Select [Objects > External Dynamic Lists](objects-external-dynamic-lists.html#ID0EO4AR) to enable the firewall to import a list of URLs from a web server. |
| --- | --- |






| • | **Pre-defined Categories**—Lists all URL categories defined by PAN-DB, the Palo Alto Networks URL, and the IP cloud database. |
| --- | --- |



 Fastpath:
 **Block** all known dangerous URL categories to protect against exploit infiltration, malware download, command-and-control activity, and data exfiltration: **command-and-control**, **copyright-infringement**, **dynamic-dns**, **extremism**, **malware**, **phishing**, **proxy-avoidance-and-anonymizers**, **unknown**, **newly-registered-domain**, **grayware**, and **parked**.
 To phase in a block policy, set categories to **continue** and [create a custom response page](https://docs.paloaltonetworks.com/advanced-url-filtering/administration/url-filtering-features/url-filtering-response-pages/customize-url-filtering-response-pages.html) to educate users about your use policy and alert them that they are visiting a site that potentially poses a threat. After a suitable period of time, transition to a policy that blocks these potentially malicious sites.




 Site Access


 For each URL category, select the action to take when a user attempts to access a URL in that category:



| • | **alert**—Allows access to the web site but adds an alert to the URL log each time a user accesses the URL. |
| --- | --- |



 Fastpath:
 Set **alert** as the Action for categories of traffic that you don’t block so that it logs the access attempt and provides visibility into the traffic.



| • | **allow**—Allows access to the web site. |
| --- | --- |



 Fastpath:
 Because **allow** doesn’t log unblocked traffic, set **alert** as the Action for categories of traffic you don’t block if you want to log the access attempts and provide visibility into that traffic.



| • | **block**—Blocks access to the website. If the Site Access to a URL category is set to block, then the User Credential Submission permissions are automatically also set to block. |
| --- | --- |






| • | **continue**—Displays a warning page to users to discourage them from accessing the website. The user must then choose to **Continue** to the website if they decide to ignore the warning. |
| --- | --- |



 Note:



| | The continue (warning) pages are not displayed properly on client machines that are configured to use a proxy server. |
| --- | --- |






| • | **override**—Displays a response page that prompts the user to enter a valid password to gain access to the site. Configure URL Admin Override settings (**Device** > **Setup** > **Content ID**) to manage password and other override settings. (See also the Management Settings table in [Device > Setup > Content-ID](device-setup-content-id.html#ID0EYQMX)). |
| --- | --- |



 Note:



| | The override pages are not displayed properly on client machines that are configured to use a proxy server. |
| --- | --- |






| • | **none** (`custom URL category only`)—If you created custom URL categories, set the action to **none** to allow the firewall to inherit the URL filtering category assignment from your URL database vendor. Setting the action to **none** gives you the flexibility to ignore custom categories in a URL filtering profile while allowing you to use the custom URL category as a match criteria in policy rules (Security, Decryption, and QoS) to make exceptions or to enforce different actions. To delete a custom URL category, you must set the action to **none** in any profile where the custom category is used. For information on custom URL categories, see [Objects > Custom Objects > URL Category](objects-custom-objects-url-category.html#ID0EWPIR). |
| --- | --- |







 User Credential Submission


 For each URL category, select **User Credential Submissions** to allow or disallow users from submitting valid corporate credentials to a URL in that category. Before you can control user credential submissions based on URL category, you must enable credential submission detection (select the **User Credential Detection** tab).
 URL categories with the **Site Access** set to block are set to automatically also block user credential submissions.



| • | **alert**—Allows users to submit credentials to the website, but generate a URL Filtering log each time a user submits credentials to sites in this category. |
| --- | --- |






| • | **allow** (default)—Allows users to submit credentials to the website. |
| --- | --- |






| • | **block**—Blocks users from submitting credentials to the website. A default anti-phishing response page blocks user credential submissions. |
| --- | --- |






| • | **continue**—Displays a response page to users that prompts them to select **Continue** to submit credentials to the site. By default, an anti-phishing continue page displays to warn users when they attempt to submit credentials to sites to which credential submissions are discouraged. You can choose to create a custom response page to warn users against phishing attempts or to educate them against reusing valid corporate credentials on other websites. |
| --- | --- |







 Check URL Category


 Click to access the PAN-DB URL Filtering database, where you can enter a URL or IP address to view categorization information.




 Dynamic URL Filtering (disabled by default)
 (`Configurable for BrightCloud only`)


 Select to enable cloud lookup for categorizing the URL. This option is invoked if the local database is unable to categorize the URL.
 If the URL is unresolved after a 5 second timeout, the response is displayed as Not resolved URL.
 Note:



| | With PAN-DB, this option is enabled by default and is not configurable. |
| --- | --- |






 Parent topic
 [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR)