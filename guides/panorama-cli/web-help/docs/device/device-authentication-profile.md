# Device > Authentication Profile

*Device : Device &gt; Authentication Profile*

## Device > Authentication Profile


Use this page to configure settings for authenticating administrators and end users. The firewall and Panorama support local, RADIUS, TACACS+, LDAP, Kerberos, SAML 2.0, and multi-factor authentication (MFA) services.

 Fastpath:
 Create at least one Authentication profile to provide external authentication, which keeps all authentication requests in one place for easier management and uses a standard authentication process that includes services such as tracking. Best is to create and prioritize (**Device** > **Authentication Sequence**) multiple Authentication profiles using different methods in case of authentication failure, and to create at least one local login account to fall back on if all external methods fail.

You can also use this page to register a firewall or Panorama service (such as administrative access to the web interface) with a SAML identity provider (IdP). Registering the service enables the firewall or Panorama to use the IdP for authenticating users who request the service. You register a service by entering its SAML metadata on the IdP. The firewall and Panorama make registration easy by automatically generating a SAML metadata file based on the authentication profile that you assigned to the service; you can export this metadata file to the IdP.




| • | [Authentication Profile](configure-an-authentication-profile.html#ID0EHLFY) |
| --- | --- |






| • | [SAML Metadata Export from an Authentication Profile](export-saml-metadata-from-an-authentication-profile.html#ID0E2GIY) |
| --- | --- |



 Parent topic
 [Device](device.html#ID0EY2QW)