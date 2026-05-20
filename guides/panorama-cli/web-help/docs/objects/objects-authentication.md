# Objects > Authentication

*Objects : Objects &gt; Authentication*

## Objects > Authentication


An authentication enforcement object specifies the method and service to use for authenticating end users who access your network resources. You assign the object to Authentication policy rules, which invoke the authentication method and service when traffic matches a rule (see [Policies > Authentication](policies-authentication.html#ID0EWJJQ)).


The firewall has the following predefined, read-only authentication enforcement objects:




| • | **default-browser-challenge**—The firewall transparently obtains user authentication credentials. If you select this action, you must enable Kerberos Single Sign-On (SSO) or NT LAN Manager (NTLM) authentication when you [configure Authentication Portal](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/map-ip-addresses-to-usernames-using-captive-portal). If Kerberos SSO authentication fails, the firewall falls back to NTLM authentication. If you did not configure NTLM, or NTLM authentication fails, the firewall falls back to the authentication method specified in the predefined **default-web-form** object. |
| --- | --- |






| • | **default-web-form**—To authenticate users, the firewall uses the certificate profile or authentication profile you specified when [configuring Authentication Portal](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/map-ip-addresses-to-usernames-using-captive-portal). If you specified an authentication profile, the firewall ignores any Kerberos SSO settings in the profile and presents an Authentication Portal page for the user to enter authentication credentials. |
| --- | --- |






| • | **default-no-captive-portal**—The firewall evaluates Security policy without authenticating users. |
| --- | --- |




Before creating a custom authentication enforcement object:




| • | Configure a server profile that specifies how to connect to the authentication service (see [Device > Server Profiles](device-server-profiles.html#ID0EHKJZ)). |
| --- | --- |






| • | Assign the server profile to an authentication profile that specifies authentication settings such as Kerberos single sign-on parameters (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)). |
| --- | --- |




To create a custom authentication enforcement object, click **Add** and complete the following fields:



| Authentication Enforcement Settings | Description |
| --- | --- |
| Name | Enter a descriptive name (up to 31 characters) to help you identify the object when defining Authentication rules. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Shared (`Panorama only`) | Select this option if you want the object to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the object will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this authentication enforcement object in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object.




 Authentication Method


 Select a method:



| • | **browser-challenge**—The firewall transparently obtains user authentication credentials. If you select this action, the **Authentication Profile** you select must have Kerberos SSO enabled. |
| --- | --- |






| • | **web-form**—To authenticate users, the firewall uses the certificate profile you specified when [configuring Authentication Portal](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/map-ip-addresses-to-usernames-using-captive-portal) or the **Authentication Profile** you select in the authentication enforcement object. If you select an **Authentication Profile**, the firewall ignores any Kerberos SSO settings in the profile and presents an Authentication Portal page for the user to enter authentication credentials. |
| --- | --- |






| • | **no-captive-portal**—The firewall evaluates Security policy without authenticating users. |
| --- | --- |







 Authentication Profile


 Select the authentication profile that specifies the service to use for validating the identities of users.




 Message


 Enter instructions that tell users how to respond to the first authentication challenge that they see when their traffic triggers the Authentication rule. The message displays in the **Authentication Portal Comfort Page**. If you don’t enter a message, the default **Authentication Portal Comfort Page** displays (see [Device > Response Pages](device-response-pages.html#ID0EYSFZ)).
 Note:



| | The firewall displays the **Authentication Portal Comfort Page** only for the first authentication challenge (factor), which you define in the **Authentication** tab of the **Authentication Profile** (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)). For multi-factor authentication (MFA) challenges that you define in the **Factors** tab of the profile, the firewall displays the **MFA Login Page**. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)