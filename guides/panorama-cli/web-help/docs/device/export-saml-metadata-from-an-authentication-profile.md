# SAML Metadata Export from an Authentication Profile

*Device : Device &gt; Authentication Profile : SAML Metadata Export from an Authentication Profile*

SAML Metadata Export from an Authentication Profile



| • | Device > Authentication Profile |
| --- | --- |




The firewall and Panorama can use a [SAML identity provider (IdP) to authenticate users](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-saml-authentication.html) who request services. For administrators, the service can be access to the web interface. For end users, the service can be Authentication Portal or GlobalProtect, which enable access to your network resources. To enable SAML authentication for a service, you must register that service by entering specific information about it on the IdP in the form of SAML metadata. The firewall and Panorama simplify registration by automatically generating a SAML metadata file based on the authentication profile that you assigned to the service and you can export this metadata file to the IdP. Exporting the metadata is an easier alternative to typing the values for each metadata field in the IdP.

 Note:



| | Some of the metadata in the exported file derives from the SAML IdP server profile assigned to the authentication profile ([Device > Server Profiles > SAML Identity Provider](device-server-profiles-saml-identity-provider.html#ID0EVDRZ)). However, the exported file always specifies POST as the HTTP binding method, regardless of the method specified in the SAML IdP server profile. The IdP will use the POST method to send SAML messages to the firewall or Panorama. |
| --- | --- |




To export SAML metadata from an authentication profile, click the SAML **Metadata** link in the Authentication column and complete the following fields. To import the metadata file into an IdP, refer to your IdP documentation.



| SAML Metadata Export Settings | Description |
| --- | --- |
| Commands | Select the service for which you want to export SAML metadata: • |






| • | **authentication-portal**—Provides end user access to network resources through Authentication Portal. |
| --- | --- |






| • | **global-protect**—Provides end user access to network resources through GlobalProtect. |
| --- | --- |



 Your selection determines which other fields the dialog displays.




 [Management | Authentication Portal | GlobalProtect] Auth Profile


 Enter the name of the authentication profile from which you are exporting metadata. The default value is the profile from which you opened the dialog by clicking the **Metadata** link.




 Management Choice
 (`Management only`)


 Select an option for specifying an interface that is enabled for management traffic (such as the MGT interface):



| • | **Interface**—Select the interface from the list of interfaces on the firewall. |
| --- | --- |






| • | **IP Hostname**—Enter the IP address or hostname of the interface. If you enter a hostname, the DNS server must have an address (A) record that maps to the IP address. |
| --- | --- |







 [Authentication Portal | GlobalProtect] Virtual System
 (`Authentication Portal or GlobalProtect only`)


 Select the virtual system for which the Authentication Portal settings or GlobalProtect portal are defined.




 IP Hostname
 (`Authentication Portal or GlobalProtect only`)


 Enter the IP address or hostname of the service.



| • | **Authentication Portal**—Enter the **Redirect Host** IP address or hostname (**Device** > **User Identification** > **Authentication Portal Settings**). |
| --- | --- |






| • | **GlobalProtect**—Enter the **Hostname** or **IP Address** of the GlobalProtect portal. |
| --- | --- |



 If you enter a hostname, the DNS server must have an address (A) record that maps to the IP address.



 Parent topic
 [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)