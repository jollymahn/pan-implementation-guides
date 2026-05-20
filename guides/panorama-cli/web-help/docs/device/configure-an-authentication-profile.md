# Authentication Profile

*Device : Device &gt; Authentication Profile : Authentication Profile*

Authentication Profile



| • | Device > Authentication Profile |
| --- | --- |




Select **Device** > **Authentication Profile** or **Panorama** > **Authentication Profile** to manage authentication profiles. To create a new profile, **Add** one and complete the following fields.

 Tip:
 After configuring an authentication profile, use the test authentication CLI command to determine whether the firewall or Panorama management server can communicate with the back-end authentication server and whether the authentication request succeeded. You can perform [authentication tests](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/test-authentication-server-connectivity.html) on the candidate configuration to determine whether the configuration is correct before you commit.


| Authentication Profile Settings | Description |
| --- | --- |
| Name | Enter a name to identify the profile. The name is case-sensitive, can have up to 31 characters, and can include only letters, numbers, spaces, hyphens, underscores, and periods. The name must be unique in the current **Location** (firewall or virtual system) relative to other authentication profiles and to authentication sequences. CAUTION:  In a firewall that is in multiple virtual systems mode, if the **Location** of the authentication profile is a virtual system, don’t enter the same name as an authentication sequence in the Shared location. Similarly, if the profile **Location** is Shared, don’t enter the same name as a sequence in a virtual system. While you can commit an authentication profile and sequence with the same names in these cases, it can result in reference errors. |
| Location | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| Authentication Tab The firewall invokes the authentication service that you configure in this tab before invoking any multi-factor authentication (MFA) services that you add in the [Factors Tab](configure-an-authentication-profile.html#ID0EPUHY). Note:  | If the firewall integrates with an MFA vendor through RADIUS instead of the vendor API, you must configure a RADIUS server profile for that vendor, not an MFA server profile. |







 Type


 Select the type of service that provides the first (and `optionally the only`) authentication challenge that users see. Based on your selection, the dialog displays other settings that you define for the service. The options are:



| • | **None**—Do not use any authentication. |
| --- | --- |






| • | **Cloud Authentication Service**—Use the cloud-based authentication service that the Cloud Identity Engine provides. |
| --- | --- |






| • | **Local Database**—Use the local authentication database on the firewall. This option is not available on Panorama. |
| --- | --- |






| • | **RADIUS**—Use a Remote Authentication Dial-In User Service (RADIUS) server. |
| --- | --- |






| • | **TACACS+**—Use a Terminal Access Controller Access-Control System Plus (TACACS+) server. |
| --- | --- |






| • | **LDAP**—Use a Lightweight Directory Access Protocol (LDAP) server. |
| --- | --- |






| • | **Kerberos**—Use a Kerberos server. |
| --- | --- |






| • | **SAML**—Use a Security Assertion Markup Language 2.0 (SAML 2.0) identity provider (IdP). |
| --- | --- |



 CAUTION:
 Administrators can use SAML to authenticate to the firewall or Panorama web interface but not to the CLI.




 Server Profile
 (`RADIUS, TACACS+, LDAP, or Kerberos only`)


 Select the authentication server profile from the drop-down. See [Device > Server Profiles > RADIUS](device-server-profiles-radius.html#ID0ETRNZ), [Device > Server Profiles > TACACS+](device-server-profiles-tacacs.html#ID0EW6OZ), [Device > Server Profiles > LDAP](device-server-profiles-ldap.html#ID0EMVPZ), or [Device > Server Profiles > Kerberos](device-server-profiles-kerberos.html#ID0EEUQZ).




 IdP Server Profile
 (`SAML only`)


 Select the SAML Identity Provider server profile from the drop-down. See [Device > Server Profiles > SAML Identity Provider](device-server-profiles-saml-identity-provider.html#ID0EVDRZ).




 Retrieve user group from RADIUS
 (`RADIUS only`)


 Select this option to collect user group information from Vendor-Specific Attributes (VSAs) defined on the RADIUS server. The firewall uses the information to match authenticating users against [Allow List](configure-an-authentication-profile.html#ID0EG1HY) entries, not for enforcing policies or generating reports.




 Retrieve user group from TACACS+
 (`TACACS+ only`)


 Select this option to collect user group information from Vendor-Specific Attributes (VSAs) defined on the TACACS+ server. The firewall uses the information to match authenticating users against [Allow List](configure-an-authentication-profile.html#ID0EG1HY) entries, not for enforcing policies or generating reports.




 Login Attribute
 (`LDAP only`)


 Enter an LDAP directory attribute that uniquely identifies the user and functions as the login ID for that user.




 Password Expiry Warning
 (`LDAP only`)


 If the authentication profile is for GlobalProtect users, enter the number of days before password expiration to start displaying notification messages to users to alert them that their passwords are expiring in x number of days. By default, notification messages will display seven days before password expiry (range is 1 to 255). Users will not be able to access the VPN if their passwords expire.
 Fastpath:
 Consider configuring the GlobalProtect agents to use the [pre-logon connection method](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-quick-configs/remote-access-vpn-with-pre-logon.html). This will enable users to connect to the domain to change their passwords even after the password has expired.
 If users allow their passwords to expire, the administrator can assign a temporary LDAP password to enable users to log in to the VPN. In this workflow, we recommend setting the **Authentication Modifier** in the portal configuration to **Cookie authentication for config refresh** (otherwise, the temporary password will be used to authenticate to the portal, but the gateway login will fail, preventing VPN access).




 Certificate for Signing Requests
 (`SAML only`)


 Select the certificate that the firewall will use to sign SAML messages that it sends to the identity provider (IdP). This field is required if you enable the **Sign SAML Message to IdP** option in the **IdP Server Profile** (see [Device > Server Profiles > SAML Identity Provider](device-server-profiles-saml-identity-provider.html#ID0EVDRZ)). Otherwise, selecting a certificate to sign SAML messages is optional.
 When generating or importing a certificate and its associated private key, the key usage attributes specified in the certificate control how you can use the key:



| • | If the certificate explicitly lists key usage attributes, one of the attributes must be Digital Signature, which is not available in certificates that you generate on the firewall. In this case, you must [Import](other-supported-actions-to-manage-certificates.html#ID0E6JAZ) the certificate and key from your enterprise certificate authority (CA) or a third-party CA. |
| --- | --- |






| • | If the certificate doesn’t specify key usage attributes, you can use the key for any purpose, including signing messages. In this case, you can use any method to [obtain the certificate and key](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/obtain-certificates.html) for signing SAML messages. |
| --- | --- |



 Fastpath:
 Palo Alto Networks recommends using a signing certificate to ensure the integrity of SAML messages sent to the IdP.




 Enable Single Logout
 (`SAML only`)


 Select this option to enable users to log out of every authenticated service by logging out of any single service. Single logout (SLO) applies only to services that users accessed through SAML authentication. The services can be external to your organization or internal (such as the firewall web interface). This option applies only if you entered an **Identity Provider SLO URL** in the [IdP Server Profile](configure-an-authentication-profile.html#ID0EFEGY). You cannot enable SLO for Authentication Portal users.
 Note:



| | After logging out users, the firewall automatically removes their [IP address-to-username mappings](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/user-id-concepts.html). |
| --- | --- |







 Certificate Profile
 (`SAML only`)


 Select the Certificate Profile that the firewall will use to validate:



| • | The **Identity Provider Certificate** specified in the [IdP Server Profile](configure-an-authentication-profile.html#ID0EFEGY). The IdP uses this certificate to authenticate to the firewall. The firewall validates the certificate when you **Commit** the authentication profile configuration. |
| --- | --- |






| • | SAML messages that the IdP sends to the firewall for single sign-on (SSO) and single logout (SLO) authentication. The IdP uses the **Identity Provider Certificate** specified in the [IdP Server Profile](configure-an-authentication-profile.html#ID0EFEGY) to sign the messages. |
| --- | --- |



 See [Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ).




 User Domain
 and
 Username Modifier
 (`All authentication types except SAML and Cloud Authentication Service`)


 The firewall uses the **User Domain** for matching authenticating users against [Allow List](configure-an-authentication-profile.html#ID0EG1HY) entries and for User-ID [group mapping](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-users-to-groups.html).
 You can specify a **Username Modifier** to modify the format of the domain and username that a user enters during login. The firewall uses the modified string for authentication. Select from the following options:



| • | To send only the unmodified user input, leave the **User Domain** blank (default) and set the **Username Modifier** to the variable **%USERINPUT%** (default). |
| --- | --- |






| • | To prepend a domain to the user input, enter a **User Domain,** and set the **Username Modifier** to **%USERDOMAIN%\%USERINPUT%**. |
| --- | --- |






| • | To append a domain to the user input, enter a **User Domain** and set the **Username Modifier** to **%USERINPUT%@%USERDOMAIN%**. |
| --- | --- |



 Note:**If the **Username Modifier** includes the %USERDOMAIN% variable, the User Domain** value replaces any domain string that the user enters. If you specify the %USERDOMAIN% variable and leave the **User Domain** blank, the firewall removes any user-entered domain string. The firewall resolves domain names to the appropriate NetBIOS name for User-ID group mapping. This applies to both parent and child domains. **User Domain** modifiers take precedence over automatically derived NetBIOS names.



| • | To allow the firewall to use the server profile type to determine how and when in the authentication sequence to modify the format of the user input, manually enter None as the **Username Modifier**. For more information on this option, refer to [Configure an Authentication Profile and Sequence](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-an-authentication-profile-and-sequence.html) in the PAN-OS Administrator’s Guide. |
| --- | --- |







 Kerberos Realm
 (`All authentication types except SAML and Cloud Authentication Service`)


 If your network supports Kerberos single sign-on (SSO), enter the **Kerberos Realm** (up to 127 characters). This is the hostname portion of the user login name. For example, the user account name user@EXAMPLE.LOCAL has realm EXAMPLE.LOCAL.




 Kerberos Keytab
 (`All authentication types except SAML and Cloud Authentication Service`)


 If your network supports [Kerberos single sign-on (SSO)](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-kerberos-single-sign-on.html), click **Import**, click **Browse** to locate the keytab file, and then click **OK**. A keytab contains Kerberos account information (principal name and hashed password) for the firewall, which is required for SSO authentication. Each authentication profile can have one keytab. During authentication, the firewall first tries to use the keytab to establish SSO. If it succeeds and the user attempting access is in the Allow List, authentication succeeds immediately. Otherwise, the authentication process falls back to manual authentication (username/password) of the specified **Type**, which doesn’t have to be Kerberos.
 CAUTION:
 If the firewall is in FIPS/CC mode, the algorithm must be aes128-cts-hmac-sha1-96 or aes256-cts-hmac-sha1-96. Otherwise, you can also use des3-cbc-sha1 or arcfour-hmac. However, if the algorithm in the keytab does not match the algorithm in the service ticket that the Ticket Granting Service issues to clients to enable SSO, the SSO process fails. Your Kerberos administrator determines which algorithms the service tickets use.




 Username Attribute
 (`SAML only`)


 Enter the SAML attribute that identifies the username of an authenticating user in messages from the IdP (default is **username**). If the **IdP Server Profile** contains metadata that specifies a username attribute, the firewall automatically populates this field with that attribute. The firewall matches usernames retrieved from SAML messages with users and user groups in the **Allow List** of the authentication profile. Because you cannot configure the firewall to modify the domain/username string that a user enters during SAML logins, the login username must exactly match an **Allow List** entry. This is the only SAML attribute that is mandatory.
 Note:



| | SAML messages might display the username in the subject field. The firewall automatically checks the subject field if the username attribute doesn’t display the username. |
| --- | --- |







 User Group Attribute
 (`SAML only`)


 Enter the SAML attribute that identifies the user group of an authenticating user in messages from the IdP (default is **usergroup**). If the **IdP Server Profile** contains metadata that specifies a user group attribute, the field automatically uses that attribute. The firewall uses the group information to match authenticating users against **Allow List** entries, not for policies or reports.




 Admin Role Attribute
 (`SAML only`)


 Enter the SAML attribute that identifies the administrator role of an authenticating user in messages from the IdP (default is **admin-role**). This attribute applies only to firewall administrators, not to end users. If the **IdP Server Profile** contains metadata that specifies an admin-role attribute, the firewall automatically populates this field with that attribute. The firewall matches its predefined (dynamic) roles or Admin Role profiles with the roles retrieved from SAML messages to enforce role-based access control. If a SAML message has multiple admin-role values for an administrator with only one role, matching applies only to the first (left-most) value in the admin-role attribute. For an administrator with more than one role, the matching can apply to multiple values in the attribute.




 Access Domain Attribute
 (`SAML only`)


 Enter the SAML attribute that identifies the access domain of an authenticating user in messages from the IdP (default is **access-domain**). This attribute applies only to firewall administrators, not to end users. If the **IdP Server Profile** contains metadata that specifies an access-domain attribute, the firewall automatically populates this field with that attribute. The firewall matches its locally configured access domains with those retrieved from SAML messages to enforce access control. If a SAML message has multiple access-domain values for an administrator with only one access domain, matching applies only to the first (left-most) value in the access-domain attribute. For an administrator with more than one access domain, the matching can apply to multiple values in the attribute.




 Region
 (`Cloud Authentication Service only`)


 Select the regional endpoint for your Cloud Identity Engine instance.
 Note:**The region you select must match the region you select when you [activate](https://docs.paloaltonetworks.com/cloud-identity/cloud-identity-engine-getting-started/get-started-with-the-cloud-identity-engine/activate-the-cloud-identity-engine.html)** your Cloud Identity Engine instance.




 Instance
 (`Cloud Authentication Service only`)


 If you have more than one instance, select the Cloud Identity Engine instance you want to use.




 Profile
 (`Cloud Authentication Service only`)


 If you have more than one Cloud Identity Engine [identity provider profile](https://docs.paloaltonetworks.com/cloud-identity/cloud-identity-engine-getting-started/authenticate-users-with-the-cloud-identity-engine/configure-an-identity-provider-in-the-cloud-identity-engine.html) (IdP profile), select the Cloud Identity Engine IdP profile you want to use.




 Maximum Clock Skew (seconds)
 (`Cloud Authentication Service only`)


 Enter the maximum acceptable time difference in seconds between the IdP and firewall system times at the moment when the firewall validates a message that it receives from the IdP (range is 1 to 900; default is 60). If the time difference exceeds this value, the validation (and thus authentication) fails.




 force multi-factor authentication in cloud
 (`Cloud Authentication Service only`)


 Enable **force multi-factor authentication in cloud** if your IdP is configured to require users to log in using multi-factor authentication.




 Factors Tab




 Enable Additional Authentication Factors


 Select this option if you want the firewall to invoke additional authentication factors (challenges) after users successfully respond to the first factor (specified in the **Type** field on the **Authentication** tab).
 Note:



| | Additional authentication factors are supported for end-user authentication through Authentication Policy only. Additional factors are not supported for remote user authentication to GlobalProtect portals and gateways or for administrator authentication to the PAN-OS or Panorama web interface. Although you can configure additional factors, they will not be enforced for these use cases. You can, however, integrate with MFA vendors using RADIUS or SAML for all authentication use cases. |
| --- | --- |



 After configuring an authentication profile that uses multi-factor authentication (MFA), you must assign it to an authentication enforcement object ([Objects>Authentication](objects-authentication.html#ID0EQOBS)) and assign the object to the Authentication policy rules ([Policies>Authentication](policies-authentication.html#ID0EWJJQ)) that control access to your network resources.




 Factors


 Add an MFA server profile ([Device>ServerProfiles> Multi Factor Authentication](device-server-profiles-multi-factor-authentication.html#ID0EPUSZ)) for each authentication factor that the firewall will invoke after users successfully respond to the first factor (specified in the **Type** field on the **Authentication** tab). The firewall invokes each factor in the top-to-bottom order that you list the MFA services that provide the factors. To change the order, select a server profile and **Move Up** or **Move Down**. You can specify up to three additional factors. Each MFA service provides one factor. Some MFA services let users choose one factor from a list of several. The firewall integrates with these MFA services through vendor APIs. Additional [MFA vendor API integrations](https://docs.paloaltonetworks.com/compatibility-matrix/mfa-vendor-support/mfa-vendor-support-table.html) are added periodically through Applications or Applications and Threats content updates.




 Advanced Tab




 Allow List


 Click **Add** and select **all** or select the specific users and groups that can authenticate with this profile. When a user authenticates, the firewall matches the associated username or group against the entries in this list. If you don’t add entries, no users can authenticate.
 Fastpath:
 To limit authentication to only the users who have legitimate business access needs and reduce the attack surface, specify users or user groups, don’t use **all**.
 Note:



| | If you entered a **User Domain** value, you don’t need to specify domains in the **Allow List**. For example, if the **User Domain** is **businessinc** and you want to add user **admin1** to the **Allow List**, entering admin1 has the same effect as entering businessinc\admin1. You can specify groups that already exist in your directory service or specify custom groups based on LDAP filters. |
| --- | --- |







 Failed Attempts
 (`All authentication types except SAML`)


 Enter the number of failed successive login attempts (0 to 10) that the firewall allows before locking out the user account. A value of 0 specifies unlimited login attempts. The default value is 0 for firewalls in normal operational mode and 10 for firewalls in FIPS-CC mode.
 Fastpath:
 Set the number of **Failed Attempts** to 5 or fewer to accommodate a reasonable number of retries in case of typing errors, while preventing malicious systems from trying brute force methods to log in to the firewall.
 CAUTION:
 If you set the **Failed Attempts** to a value other than 0 but leave the **Lockout Time** at 0, the **Failed Attempts** is ignored and the user is never locked out.




 Lockout Time
 (`All authentication types except SAML`)


 Enter the number of minutes (range is 0 to 60; default is 0) for which the firewall locks out a user account after the user reaches the number of **Failed Attempts**. A value of 0 means the lockout applies until an administrator manually unlocks the user account.
 Fastpath:
 Set the **Lockout Time** to at least 30 minutes to prevent continuous login attempts from a malicious actor.
 CAUTION:
 If you set the **Lockout Time** to a value other than 0 but leave the **Failed Attempts** at 0, the **Lockout Time** is ignored and the user is never locked out.



 Parent topic
 [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)