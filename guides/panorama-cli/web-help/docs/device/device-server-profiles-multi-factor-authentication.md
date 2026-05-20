# Device > Server Profiles > Multi Factor Authentication

*Device : Device &gt; Server Profiles &gt; Multi Factor Authentication*

## Device > Server Profiles > Multi Factor Authentication


Use this page to configure a multi-factor authentication (MFA) server profile that defines how the firewall connects to an MFA server. MFA can protect your most sensitive resources by ensuring that attackers cannot access your network and move laterally through it by compromising a single authentication factor (for example, stealing login credentials). After configuring the server profile, assign it to authentication profiles for the services that require authentication (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)).


For the following authentication use cases, the firewall integrates with multi-factor authentication (MFA) vendors using RADIUS and SAML:




| • | Remote user authentication through GlobalProtect™ portals and gateways. |
| --- | --- |






| • | Administrator authentication in the PAN-OS and Panorama™ web interface. |
| --- | --- |






| • | Authentication through Authentication policy. |
| --- | --- |




Additionally, the firewall can also integrate with [MFA vendors](https://docs.paloaltonetworks.com/compatibility-matrix/mfa-vendor-support/mfa-vendor-support-table.html) using the API to enforce MFA through Authentication policy for end-user authentication only (not for GlobalProtect authentication or administrator authentication).

 Note:



| | The [complete procedure](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-multi-factor-authentication) to configure MFA requires additional tasks besides creating a server profile. |
| --- | --- |



 Authentication sequences do not support authentication profiles that specify MFA server profiles.
 If the firewall integrates with your MFA vendor through RADIUS, configure a RADIUS server profile (see [Device > Server Profiles > RADIUS](device-server-profiles-radius.html#ID0ETRNZ)). The firewall supports all MFA vendors through RADIUS.


| MFA Server Settings | Description |
| --- | --- |
| Profile Name | Enter a name to identify the server (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | On a firewall that has more than one virtual system (vsys), select a vsys or the **Shared** location. After you save the profile, you cannot change its **Location**. |
| Certificate Profile | Select the **Certificate Profile** that specifies the certificate authority (CA) certificate that the firewall will use to validate the MFA server certificate when setting up a secure connection to the server. For details, see [Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ). |
| MFA Vendor / Value | Select an MFA vendor **MFA Vendor** and enter a **Value** for each vendor attribute. The attributes vary by vendor. Refer to your vendor documentation for the correct values. • |






| ◦ | **API Host**—The hostname of the Duo v2 server. |
| --- | --- |






| ◦ | **Integration Key** and **Secret Key**—The firewall uses these keys to authenticate to the Duo v2 server and to sign authentication requests that it sends to the server. To secure these keys, the master key on the firewall automatically encrypts them so that their plaintext values are not exposed anywhere in the firewall storage. Contact your Duo v2 administrator to obtain the keys. |
| --- | --- |






| ◦ | **Timeout**—Enter the time in seconds after which the firewall times out when attempting to communicate with the **API Host** (range is 5 to 600; default is 30). This interval must be longer than the timeout between the API host and the endpoint device of the user. |
| --- | --- |






| ◦ | **Base URI**—If your organization hosts a local authentication proxy server for the Duo v2 server, enter the proxy server URI (default /auth/v2). |
| --- | --- |






| • | **Okta Adaptive**: |
| --- | --- |






| ◦ | **API Host**—The hostname of the Okta server. |
| --- | --- |






| ◦ | **Base URI**—If your organization hosts a local authentication proxy server for the Okta server, enter the proxy server URI (default /api/v1). |
| --- | --- |






| ◦ | **Token**—The firewall uses this token to authenticate to the Okta server and to sign authentication requests that it sends to the server. To secure the token, the master key on the firewall automatically encrypts it so that its plaintext value is not exposed anywhere in the firewall storage. Contact your Okta administrator to obtain the token. |
| --- | --- |






| ◦ | **Organization**—The subdomain for your organization in the **API Host**. |
| --- | --- |






| ◦ | **Timeout**—Enter the time in seconds after which the firewall times out when attempting to communicate with the **API Host** (range is 5 to 600; default is 30). This interval must be longer than the timeout between the API host and the endpoint device of the user. |
| --- | --- |






| • | **PingID**: |
| --- | --- |






| ◦ | **Base URI**—If your organization hosts a local authentication proxy server for the PingID server, enter the proxy server URI (default /pingid/rest/4). |
| --- | --- |






| ◦ | **Host name**—Enter the host name of the PingID server (default idpxnyl3m.pingidentity.com). |
| --- | --- |






| ◦ | **Use Base64 Key** and **Token**—The firewall uses the key and token to authenticate to the PingID server and to sign authentication requests that it sends to the server. To secure the key and token, the master key on the firewall automatically encrypts them so that their plaintext values are not exposed anywhere in the firewall storage. Contact your PingID administrator to obtain the values. |
| --- | --- |






| ◦ | **PingID Client Organization ID**—The PingID identifier for your organization. |
| --- | --- |






| ◦ | **Timeout**—Enter the time in seconds after which the firewall times out when attempting to communicate with the PingID server specified in the **Host name** field (range is 5 to 600; default is 30). This interval must be longer than the timeout between the PingID server and the endpoint device of the user. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)