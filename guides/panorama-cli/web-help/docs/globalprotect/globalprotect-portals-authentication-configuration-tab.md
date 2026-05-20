# GlobalProtect Portals Authentication Configuration Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Authentication Configuration Tab*

GlobalProtect Portals Authentication Configuration Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Authentication** |
| --- | --- |




Select the **Authentication** tab to configure the various GlobalProtect™ portal settings:




| • | An SSL/TLS service profile that the portal and servers use for authentication. The service profile is independent of the other settings in Authentication. |
| --- | --- |






| • | Unique authentication schemes that are based primarily on the operating system of the user endpoints and secondarily on an optional authentication profile. |
| --- | --- |






| • | (`Optional`) A **Certificate Profile**, which enables GlobalProtect to use a specific certificate profile for authenticating the user. The certificate from the client must match the certificate profile (if client certificates are part of the security scheme). |
| --- | --- |





| GlobalProtect Portal Authentication Settings | Description |
| --- | --- |
| Server Authentication | |
| SSL/TLS Service Profile | Select an existing SSL/TLS Service profile. The profile specifies a certificate and the allowed protocols for securing traffic on the management interface. The Common Name (CN) and, if applicable, the Subject Alternative Name (SAN) fields of the certificate associated with the profile must match the IP address or FQDN of the **Interface** selected in the **General** tab. Fastpath:  In GlobalProtect VPN configurations, use a profile associated with a certificate from a trusted third-party CA or a certificate that your internal enterprise CA generated. |
| Client Authentication | |
| Name | Enter a name to identify the client authentication configuration. (The client authentication configuration is independent of the SSL/TLS service profile.) You can create multiple client authentication configurations and differentiate them by operating system. For example, you can add one unique authentication profile for Windows endpoints and another authentication profile for macOS endpoints. Note:  |



 You can also create configurations that GlobalProtect deploys to apps in **Pre-logon** mode (before the user has logged in to the system) or that it applies to any user. (Pre-logon establishes a VPN tunnel to a GlobalProtect gateway before the user logs in to GlobalProtect.)




 OS


 To deploy a client authentication profile specific to the operating system (OS) on an endpoint, **Add** the OS (**Any**, **Android**, **Chrome**, **iOS**, **Linux**, **Mac**, **Windows**, or **WindowsUWP**). The OS is the primary differentiator between configurations. (See Authentication Profile for further differentiation.)
 The additional options of **Browser** and **Satellite** enable you to specify the authentication profile to use for specific scenarios. Select **Browser** to specify the authentication profile to use to authenticate a user accessing the portal from a web browser with the intent of downloading the GlobalProtect app (Windows and Mac). Select **Satellite** to specify the authentication profile to use to authenticate the satellite (LSVPN).




 Authentication Profile


 In addition to distinguishing a client authentication configuration by an OS, you can further differentiate by specifying an authentication profile. (You can create a **New Authentication Profile** or select an existing one.) To configure multiple authentication options for an OS, you can create multiple client authentication profiles.
 Note:



| | If you are configuring an LSVPN in **Gateways**, you cannot save that configuration unless you select an authentication profile here. Also, if you plan to use serial numbers to authenticate satellites, the portal must have an authentication profile available when it cannot locate or validate a firewall serial number. |
| --- | --- |



 See also [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY).




 Username Label


 Specify a custom username label for GlobalProtect portal login. For example, **Username (only)** or **Email Address (username@domain)**.




 Password Label


 Specify a custom password label for GlobalProtect portal login. For example, **Password (Turkish)** or **Passcode** (for two-factor, token-based authentication).




 Authentication Message


 To help end users know the type of credentials they need for logging in, enter a message or keep the default message. The maximum length of the message is 256 characters.




 Allow Authentication with User Credentials OR Client Certificate


 If you select **No**, users must authenticate to the gateway using both user credentials and client certificates. If you select **Yes**, users can authenticate to the gateway using either user credentials or client certificates.




 Certificate Profile




 Certificate Profile


 (`Optional`) Select the **Certificate Profile** the portal uses to match those client certificates that come from user endpoints. With a Certificate Profile, the portal authenticates the user only if the certificate from the client matches this profile.
 If you set the **Allow Authentication with User Credentials OR Client Certificate** option to **No**, you must select a **Certificate Profile**. If you set the **Allow Authentication with User Credentials OR Client Certificate** option to **Yes**, the **Certificate Profile** is optional.
 The certificate profile is independent of the OS. Also, this profile is active even if you enable [Authentication Override](globalprotect-portals-agent-authentication-tab.html#ID0EPSJ1), which overrides the Authentication Profile to allow authentication using encrypted cookies.



 Parent topic
 [Network > GlobalProtect > Portals](network-globalprotect-portals.html#ID0EJ3F1)