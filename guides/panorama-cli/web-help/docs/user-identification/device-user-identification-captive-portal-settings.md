# Device > User Identification > Authentication Portal Settings

*User Identification : Device &gt; User Identification &gt; Authentication Portal Settings*

## Device > User Identification > Authentication Portal Settings


Edit ( ) the [Authentication Portal](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/map-ip-addresses-to-usernames-using-captive-portal/configure-captive-portal.html) Settings to configure the firewall to authenticate users whose traffic matches an Authentication policy rule.

 Note:



| | If Authentication Portal uses an SSL/TLS Service profile ([Device > Certificate Management > SSL/TLS Service Profile](device-certificate-management-ssltls-service-profile.html#ID0E3TCZ)), authentication profile ([Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)), or Certificate Profile ([Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ)), then configure the profile before you begin. The [complete procedure](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/map-ip-addresses-to-usernames-using-captive-portal) to configure Authentication Portal requires additional tasks in addition to configuring these profiles. |
| --- | --- |



 You must **Enable Authentication Portal** to enforce Authentication policy (see [Policies > Authentication](policies-authentication.html#ID0EWJJQ)).


| Field | Description |
| --- | --- |
| Enable Authentication Portal | Select this option to enable Authentication Portal. |
| Idle Timer (min) | Enter the user time-to-live (TTL) value in minutes for a Authentication Portal session (range is 1 to 1,440; default is 15). This timer resets every time there is activity from an Authentication Portal user. If idle time for a user exceeds the **Idle Timer** value, PAN-OS removes the Authentication Portal user mapping and the user must log in again. |
| Timer (min) | This is the maximum TTL in minutes, which is the maximum time that any Authentication Portal session can remain mapped (range is 1 to 1,440; default is 60). After this duration elapses, PAN-OS removes the mapping and users must re-authenticate even if the session is active. This timer prevents stale mappings and overrides the **Idle Timer** value. Fastpath:  You should always set the expiration **Timer** higher than the **Idle Timer**. |
| SSL/TLS Service Profile | To specify a firewall server certificate and the allowed protocols for securing redirect requests, select an SSL/TLS service profile ([Device > Certificate Management > SSL/TLS Service Profile](device-certificate-management-ssltls-service-profile.html#ID0E3TCZ)). If you select **None**, the firewall uses its local default certificate for SSL/TLS connections. Fastpath:  In the SSL/TLS Service Profile, set the **Min Version** to **TLSv1.2** and set the **Max Version** to **Max** to provide the strongest security against SSL/TLS protocol vulnerabilities. Setting the **Max Version** to **Max** ensures that as stronger protocols become available, the firewall always uses the latest version. To transparently redirect users without displaying certificate errors, assign a profile associated with a certificate that matches the IP address of the interface to which you are redirecting web requests. |
| Authentication Profile | You can select an authentication profile ([Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)) to authenticate users when their traffic matches an Authentication policy rule ([Policies > Authentication](policies-authentication.html#ID0EWJJQ)). However, the authentication profile you select in the Authentication Portal Settings applies only to rules that reference one of the default authentication enforcement objects ([Objects > Authentication](objects-authentication.html#ID0EQOBS)). This is typically the case right after an upgrade to PAN-OS 8.0 because all Authentication rules initially reference the default objects. For rules that reference custom authentication enforcement objects, select the authentication profile when you create the object. |
| GlobalProtect Network Port for Inbound Authentication Prompts (UDP) | Specify the port that GlobalProtect™ uses to receive inbound authentication prompts from multi-factor (MFA) gateways. (range is 1 to 65,536; default is 4,501). To support multi-factor authentication, a GlobalProtect endpoint must receive and acknowledge UDP prompts that are inbound from the MFA gateway. When a GlobalProtect endpoint receives a UDP message on the specified network port and the UDP message comes from a trusted firewall or gateway, GlobalProtect displays the authentication message (see[Customize the GlobalProtect App](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-portals/define-the-globalprotect-client-authentication-configurations/customize-the-globalprotect-app)). |
| Mode | Select how the firewall captures web requests for authentication: • |






| • | **Redirect**—The firewall intercepts web requests according to the Authentication rule and redirects them to the specified [Redirect Host](device-user-identification-captive-portal-settings.html#ID0ECYE1). The firewall uses an HTTP 302 redirect to prompt the user to authenticate. The best practice is to use **Redirect** because it provides a better end-user experience (displays no certificate errors and allows session cookies that make browsing seamless because **Redirect** doesn’t remap when timeouts expire). However, it requires that you enable response pages on the Interface Management profile assigned to the ingress Layer 3 interface (for details, see [Network > Network Profiles > Interface Mgmt](network-network-profiles-interface-mgmt.html#ID0EDJCW) and [PA-7000 Series Layer 3 Interface](pa-7000-series-layer-3-interface.html#ID0EBQQS)). |
| --- | --- |



 Another benefit of the Redirect mode is that it allows for session cookies, which enable the user to continue browsing to authenticated sites without requiring re-mapping each time the timeouts expire. This is especially useful for users who roam from one IP address to another (for example, from the corporate LAN to the wireless network) because they don’t need to re-authenticate when their IP address changes as long as the session stays open.
 CAUTION:
 **Redirect** mode is required if Authentication Portal uses Kerberos SSO because the browser provides credentials only to trusted sites. **Redirect** mode is also required if Authentication Portal uses multi-factor authentication (MFA).




 Session Cookie
 (`Redirect mode only`)





| • | **Enable**—Select this option to enable session cookies. |
| --- | --- |






| • | **Timeout**—If you **Enable** session cookies, this timer specifies the number of minutes for which the cookie is valid (range is 60–10,080; default is 1,440). |
| --- | --- |



 Fastpath:
 Set the timeout value short enough so that it doesn’t lead to stale user mapping entries in cookies but long enough to promote a good user experience by not prompting users to log in multiple times during a session. Start with a value less than or equal to 480 minutes (8 hours) and adjust the value as necessary.



| • | **Roaming**—Select this option to retain the cookie if the IP address changes while the session is active (such as when the endpoint moves from a wired to a wireless network). The user must re-authenticate only if the cookie times out or the user closes the browser. |
| --- | --- |







 Redirect Host
 (`Redirect mode only`)


 Specify the intranet hostname that resolves to the IP address of the Layer 3 interface to which the firewall redirects web requests.
 Note:



| | If users authenticate through Kerberos single sign-on (SSO), the **Redirect Host** must be the same as the hostname specified in the [Kerberos keytab](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/authentication-types/kerberos.html). |
| --- | --- |







 Certificate Profile


 You can select a Certificate Profile ([Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ)) to authenticate users when their traffic matches any Authentication policy rule ([Policies > Authentication](policies-authentication.html#ID0EWJJQ)).
 For this authentication type, Authentication Portal prompts the endpoint browser of the user to present a client certificate. Therefore, you must deploy client certificates to each user system. Furthermore, on the firewall, you must install the certificate authority (CA) certificate that issued the client certificates and assign the CA certificate to the Certificate Profile. This is the only authentication method that enables **Transparent** authentication for macOS and Linux endpoints.



 Parent topic
 [User Identification](user-identification.html#ID0EBI2Z)