# GlobalProtect Portals Clientless VPN Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Clientless VPN Tab*

GlobalProtect Portals Clientless VPN Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Clientless VPN** |
| --- | --- |




You can now configure the GlobalProtect portal to provide secure remote access to common enterprise web applications that use HTML, HTML5, and JavaScript technologies. Users have the advantage of secure access from SSL-enabled web browsers without installing GlobalProtect software. This is useful when you need to enable partner or contractor access to applications, and to safely enable unmanaged assets, including personal devices. This feature requires you to install a GlobalProtect subscription on the firewall that hosts the Clientless VPN from the GlobalProtect portal. Select the **Clientless VPN** tab to configure the GlobalProtect Clientless VPN settings on the portal as described in the following table.



| GlobalProtect Portal Clientless Configuration Settings | Description |
| --- | --- |
| `General tab` | |
| Clientless VPN | Select **Clientless VPN** to specify general information about the Clientless VPN session: |
| Hostname | The IP address or FQDN for the GlobalProtect portal that hosts the web applications landing page. The GlobalProtect Clientless VPN rewrites application URLs with this hostname. Note:  |







 Security Zone


 The zone for the Clientless VPN configuration. Security rules defined in this zone control which applications users can access.




 DNS Proxy


 The DNS server that resolves application names. Select a **DNS proxy** server or configure a **New DNS Proxy** ([Network > DNS Proxy](network-dns-proxy.html#ID0E5LUV)).




 Login Lifetime


 The number of **Minutes** (range is 60 to 1,440) or **Hours** (range is 1 to 24; default is 3) that a clientless SSL VPN session is valid. After the specified time, users must re-authenticate and start a new clientless VPN session.




 Inactivity Timeout


 The number of **Minutes** (range is 5 to 1,440; default is 30) or **Hours** (range is 1 to 24) that a clientless SSL VPN session can remain idle. If there is no user activity during the specified amount of time, the user must re-authenticate and start a new clientless VPN session.




 Max User


 The maximum numbers of users that can be logged into the portal at the same time (default is 10; range is 1 to no maximum). When the maximum number of users is reached, additional clientless VPN users cannot log in to the portal.




 `Applications tab`




 Applications to User Mapping


 **Add** one or more **Applications to User Mapping** to match users with published applications. This mapping controls which users or user groups can use a clientless VPN to access applications. You must define the applications and application groups before mapping them to users ([Network > GlobalProtect > Clientless Apps](network-globalprotect-clientless-apps.html#ID0EPY31) and [Network > GlobalProtect > Clientless App Groups](network-globalprotect-clientless-app-groups.html#ID0EQD41)).



| • | **Name**—Enter a name for the mapping (up to 31 characters). The name is case-sensitive, must be unique, and can contain only letters, numbers, spaces, hyphens, and underscores. |
| --- | --- |






| • | **Display application URL address bar**—Select this option to display an application URL address bar from which users can launch applications that are not published on the applications landing page. when enabled, users can click the **Application URL** link on the page and specify a URL. |
| --- | --- |







 User/User Group


 You can **Add** individual users or user groups to which the current application configuration applies. These users have permission to launch the configured applications using a GlobalProtect clientless VPN.
 Note:



| | You must configure group mapping (**Device** > **User Identification** > **Group Mapping Settings**) before you can select the groups. |
| --- | --- |



 In addition to users and groups, you can specify when these settings apply to the users or groups:



| • | **any**—The application configuration applies to all users (no need to **Add** users or user groups). |
| --- | --- |






| • | **select**—The application configuration applies only to users and user groups you **Add** to this list. |
| --- | --- |







 Applications


 You can **Add** individual applications or application groups to the mapping. The **Source Users** you included in the configuration can use GlobalProtect clientless VPN to launch the applications you add.




 `Crypto Settings tab`




 Protocol Versions


 Select the required minimum and maximum TLS/SSL versions. The higher the TLS version, the more secure the connection. Choices include **SSLv3**, **TLSv1.0**, **TLSv1.1**, or **TLSv1.2**.




 Key Exchange Algorithms


 Select the supported algorithm types for key exchange. Choices include **RSA**, Diffie-Hellman (**DHE**), or Elliptic Curve Ephemeral Diffie-Hellman (**ECDHE)**.




 Encryption Algorithms


 Select the supported encryption algorithms. **AES128** or higher is recommended.




 Authentication Algorithms


 Select the supported authentication algorithms. Choices are: **MD5**, **SHA1**, **SHA256**, or **SHA384**. **SHA256** or higher is recommended.




 Server Certificate Verification


 Enable which actions to take for the following issues that can occur when an application presents a server certificate:



| • | **Block sessions with expired certificate**—If the server certificate has expired, block access to the application. |
| --- | --- |






| • | **Block sessions with untrusted issuers**—If the server certificate is issued from an untrusted certificate authority, block access to the application. |
| --- | --- |






| • | **Block sessions with unknown certificate status**—If the OCSP or CRL service returns a certificate revocation status of unknown, block access to the application. |
| --- | --- |






| • | **Block sessions on certificate status check timeout**—If the certificate status check times out before receiving a response from any certificate status service, block access to the application. |
| --- | --- |







 `Proxy tab`




 Name


 A label of up to 31 characters to identify the proxy server that the GlobalProtect portal uses to access published applications. The name is case-sensitive, must be unique, and can contain only letters, numbers, spaces, hyphens, and underscores.




 Domains


 Add the domains served by the proxy server.




 Use Proxy


 Select to allow the GlobalProtect portal to use the proxy server to access the published applications.




 Server
 Port


 Specify the hostname (or IP address) and port number of the proxy server.




 User
 Password


 Specify the username and password needed to log in to the proxy server. Enter the password again for verification.




 `Advanced Settings tab`




 Rewrite Exclude Domain List


 (`Optional`) **Add** domain names, host names, or IP addresses to the **Rewrite Exclude Domain List**. The clientless VPN acts as a reverse proxy and modifies pages returned by the published applications. When a remote users accesses the URL, the requests go through the GlobalProtect portal. In some cases, the application may have pages that do not need to be accessed through the portal. Specify domains that should be excluded from rewrite rules and cannot be rewritten.
 Paths are not supported in host and domain names. The wildcard character (*) for host and domain names can only appear at the beginning of the name (for example, *.etrade.com).



 Parent topic
 [Network > GlobalProtect > Portals](network-globalprotect-portals.html#ID0EJ3F1)