# Device > Access Domain

*Device : Device &gt; Access Domain*

## Device > Access Domain




| • | Device > Access Domain |
| --- | --- |




Configure access domains to restrict administrator access to specific virtual systems on the firewall. The firewall supports access domains only if you use a RADIUS, TACACS+, or SAML identity server (IdP) server to manage administrator authentication and authorization. To enable access domains, you must define:




| • | A server profile for the external authentication server—See [Device > Server Profiles > RADIUS](device-server-profiles-radius.html#ID0ETRNZ), [Device > Server Profiles > TACACS+](device-server-profiles-tacacs.html#ID0EW6OZ), and [Device > Server Profiles > SAML Identity Provider](device-server-profiles-saml-identity-provider.html#ID0EVDRZ). |
| --- | --- |






| • | [RADIUS Vendor-Specific Attributes (VSAs)](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/authentication-types/radius.html), [TACACS+ VSAs](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/authentication-types/tacacs.html), or [SAML attributes](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/authentication-types/saml.html). |
| --- | --- |




When an administrator attempts to log in to the firewall, the firewall queries the external server for the access domain of the administrator. The external server returns the associated domain and the firewall then restricts the administrator to the virtual systems that you specified in the access domain. If the firewall does not use an external server for authenticating and authorizing administrators, the **Device** > **Access Domain** settings are ignored.

 Note:



| | On Panorama, you can manage access domains locally or by using RADIUS VSAs, TACACS+ VSAs, or SAML attributes (see [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3)). |
| --- | --- |





| Access Domain Settings | Description |
| --- | --- |
| Name | Enter a name for the access domain (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, hyphens, underscores, and periods. |
| Virtual Systems | Select virtual systems in the Available column and **Add** them. Access Domains are only supported on firewalls that support virtual systems. |


 Parent topic
 [Device](device.html#ID0EY2QW)