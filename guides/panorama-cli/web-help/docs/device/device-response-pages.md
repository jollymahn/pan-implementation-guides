# Device > Response Pages

*Device : Device &gt; Response Pages*

## Device > Response Pages


Custom response pages are the web pages that display when a user tries to access a URL. You can provide a custom HTML message that is downloaded and displayed instead of the requested web page or file.


Each virtual system can have its own custom response pages. The following table describes the types of custom response pages that support customer messages.



| Custom Response Page Types | Description |
| --- | --- |
| Antivirus Block Page | Access blocked due to a virus infection. |
| Application Block Page | Access blocked because the application is blocked by a Security policy rule. |
| Authentication Portal Comfort Page | The firewall displays this page so that users can enter login credentials to access services that are subject to Authentication policy rules (see [Policies > Authentication](policies-authentication.html#ID0EWJJQ)). Enter a message that tells users how to respond to this authentication challenge. The firewall authenticates users based on the **Authentication Profile** specified in the authentication enforcement object assigned to an Authentication rule (see [Objects > Authentication](objects-authentication.html#ID0EQOBS)). Tip:  You can display unique authentication instructions for each Authentication rule by entering a **Message** in the associated authentication enforcement object. The message defined in the object overrides the message defined in the Authentication Portal Comfort Page. |
| Data Filtering Block Page | Content was matched against a data filtering profile and blocked because sensitive information was detected. |
| File Blocking Continue Page | Page for users to confirm that downloading should continue. This option is available only if Continue functionality is enabled in the security profile. Select [Objects > Security Profiles > File Blocking](objects-security-profiles-file-blocking.html#ID0EOMUR). |
| File Blocking Block Page | Access blocked because access to the file is blocked. |
| GlobalProtect App Help Page | Custom help page for GlobalProtect users (accessible from the settings menu on the GlobalProtect status panel). |
| GlobalProtect Portal Login Page | Login page for users who attempt to authenticate to the GlobalProtect portal webpage. |
| GlobalProtect Portal Home Page | Home page for users who successfully authenticate to the GlobalProtect portal webpage. |
| GlobalProtect App Welcome Page | Welcome page for users who successfully connect to GlobalProtect. |
| MFA Login Page | The firewall displays this page so that users can respond to multi-factor authentication (MFA) challenges when accessing services that are subject to Authentication policy rules (see [Policies > Authentication](policies-authentication.html#ID0EWJJQ)). Enter a message that tells users how to respond to the MFA challenges. |
| SAML Auth Internal Error Page | Page to inform users that SAML authentication failed. The page includes a link for the user to retry authentication. |
| SSL Certificate Errors Notify Page | Notification that an SSL certificate has been revoked. |
| SSL Decryption Opt-out Page | User warning page indicating that the firewall will decrypt SSL sessions for inspection. |
| URL Filtering and Category Match Block Page | Access blocked by a URL filtering profile or because the URL category is blocked by a Security policy rule. |
| URL Filtering Continue and Override Page | Page with initial block policy that allows users to bypass the block. For example, a user who thinks the page was blocked inappropriately can click **Continue** to proceed to the page. With the override page, a password is required for the user to override the policy that blocks this URL. See the [URL Admin Override](device-setup-content-id.html#ID0ELANX) section for instructions on setting the override password. |
| URL Filtering Safe Search Enforcement Block Page | Access blocked by a Security policy rule with a URL filtering profile that has the **Safe Search Enforcement** option enabled. The user sees this page if a search is performed using Bing, Google, Yahoo, Yandex, or YouTube and their browser or search engine account setting for Safe Search is not set to strict. The block page will instruct the user to set the Safe Search setting to strict. |
| Anti Phishing Block Page | Displays to users when they attempt to enter valid corporate credentials (usernames or passwords) on a web page for which credential submissions are blocked. The user can continue to access the site but remains unable to submit valid corporate credentials to any associated web forms. Select [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR) to enable credential detection and control credential submissions to web pages based on URL category. |
| Anti Phishing Continue Page | This page warns users against submitting corporate credentials (usernames and passwords) to a web site. Warning users against submitting credentials can help to discourage them from reusing corporate credentials and to educate them about possible phishing attempts. Users see this page when they attempt to submit credentials to a site for which the **User Credential Submission** permissions are set to **continue** (see [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR)). They must select **Continue** to enter credentials on the site. |



You can perform any of the following functions for **Response Pages**.




| • | To import a custom HTML response page, click the link of the page type you would like to change and then click import/export. Browse to locate the page. A message is displayed to indicate whether the import succeeded. For the import to be successful, the file must be in HTML format. |
| --- | --- |






| • | To export a custom HTML response page, click **Export** for the type of page. Select whether to open the file or save it to disk and, if appropriate, select **Always use the same option**. |
| --- | --- |






| • | To enable or disable the **Application Block** page or **SSL Decryption Opt-out** pages, click **Enable** for the type of page. Select or deselect **Enable**, as appropriate. |
| --- | --- |






| • | To use the default response page instead of a previously uploaded custom page, delete the custom block page and commit. This will set the default block page as the new active page. |
| --- | --- |



 Parent topic
 [Device](device.html#ID0EY2QW)