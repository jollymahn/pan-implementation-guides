# GlobalProtect Portals Agent Authentication Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Agent Tab : GlobalProtect Portals Agent Authentication Tab*

GlobalProtect Portals Agent Authentication Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Agent** > <agent-config> > **Authentication** |
| --- | --- |




Select the **Authentication** tab to configure the authentication settings that apply to the agent configuration.



| GlobalProtect Portal Client Authentication Configuration Settings | Description |
| --- | --- |
| Authentication Tab | |
| Name | Enter a descriptive name for this configuration for client authentication. |
| Client Certificate | (`Optional`) Select the source that distributes the client certificate to an endpoint, which then presents the certificate to the gateways. A client certificate is required if you are configuring mutual SSL authentication. Note:  |



 If SCEP is configured for pre-logon in the portal client configuration, the portal generates a machine certificate that is stored in the system certificate store for gateway authentication and connections.
 To use a certificate that is **Local** to the firewall instead of a generated certificate from the PKI through **SCEP**, select a certificate that is already uploaded to the firewall.
 If you use an internal CA to distribute certificates to endpoints, select **None** (default). When you select **None**, the portal does not push a certificate to the endpoint.




 Save User Credentials


 Select **Yes** to save the username and password on the app or select **No** to force the users to provide the password—either transparently via the endpoint or by manually entering one—each time they connect. Select **Save Username Only** to save only the username each time a user connects. Select **Only with User Fingerprint** to allow biometric sign-in. When biometric sign-on is enabled on an endpoint, GlobalProtect uses the saved user credentials when a finger-print scan matches a trusted finger-print template on the endpoint.
 Fastpath:
 Don’t save user credentials because it makes it easier for unauthorized users to gain access to sensitive resources and confidential information. Users should manually enter their credentials each time they connect to GlobalProtect.




 Authentication Override




 Generate cookie for authentication override


 Select this option to configure the portal to generate encrypted, endpoint-specific cookies. The portal sends this cookie to the endpoint after the user first authenticates with the portal.




 Accept cookie for authentication override


 Select this option to configure the portal to authenticate endpoints through a valid, encrypted cookie. When the endpoint presents a valid cookie, the portal verifies that the cookie was encrypted by the portal, decrypts the cookie, and then authenticates the user.




 Cookie Lifetime


 Specify the hours, days, or weeks that the cookie is valid. The typical lifetime is 24 hours. The ranges are 1–72 hours, 1–52 weeks, or 1–365 days. After the cookie expires, the user must enter login credentials and the portal subsequently encrypts a new cookie to send to the user endpoint.




 Certificate to Encrypt/Decrypt Cookie


 Select the certificate to use for encrypting and decrypting the cookie.
 Note:



| | Ensure that the portal and gateways use the same certificate to encrypt and decrypt cookies. (Configure the certificate as part of a gateway client configuration. See [Network > GlobalProtect > Gateways](network-globalprotect-gateways.html#ID0EDRU1)). |
| --- | --- |







 Components that Require Dynamic Passwords (Two-Factor Authentication)




 To configure GlobalProtect to support dynamic passwords—such as one-time passwords (OTPs)—specify the portal or gateway types that require users to enter dynamic passwords. Where two-factor authentication is not enabled, GlobalProtect uses regular authentication using login credentials (such as AD) and a certificate.
 When you enable a portal or a gateway type for two-factor authentication, that portal or gateway prompts the user after initial portal authentication to submit credentials and a second OTP (or other dynamic password).
 However, if you also enable authentication override, an encrypted cookie is used to authenticate the user (after the user is first authenticated for a new session) and, thus, preempts the requirement for the user to re-enter credentials (as long as the cookie is valid). Therefore, the user is transparently logged in whenever necessary as long as the cookie is valid. You specify the lifetime of the cookie.




 Portal


 Select this option to use dynamic passwords to connect to the portal.




 Internal gateways - all


 Select this option to use dynamic passwords to connect to internal gateways.




 External gateways - manual only


 Select this option to use dynamic passwords to connect to external gateways that are configured as **Manual** gateways.




 External gateways-auto discovery


 Select this option to use dynamic passwords to connect to any remaining external gateways that the app can automatically discover (gateways which are not configured as **Manual**).



 Parent topic
 [GlobalProtect Portals Agent Tab](globalprotect-portals-agent-configuration-tab.html#ID0E2TI1)