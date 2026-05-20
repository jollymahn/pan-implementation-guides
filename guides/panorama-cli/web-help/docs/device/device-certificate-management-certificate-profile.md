# Device > Certificate Management > Certificate Profile

*Device : Device &gt; Certificate Management &gt; Certificate Profile*

## Device > Certificate Management > Certificate Profile




| • | **Device** > **Certificate Management** > **Certificate Profile** |
| --- | --- |






| • | **Panorama** > **Certificate Management** > **Certificate Profile** |
| --- | --- |




Certificate profiles define which certificate authority (CA) certificates to use for verifying client certificates, how to verify certificate revocation status, and how that status constrains access. You select the profiles when configuring certificate authentication for Authentication Portal, GlobalProtect, site-to-site IPSec VPN, Dynamic DNS (DDNS), and web interface access to firewalls and Panorama. You can configure a separate certificate profile for each of these services.



| Certificate Profile Settings | Description |
| --- | --- |
| Name | (`Required`) Enter a name to identify the profile (up to 63 characters on the firewall or up to 31 characters on Panorama). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| Username Field | If GlobalProtect only uses certificates for portal and gateway authentication, the PAN-OS software uses the certificate field you select in the **Username Field** drop-down as the username and matches it to the IP address for the User-ID service: • |






| • | **Subject Alt**—The Email or Principal Name. |
| --- | --- |






| • | **None**—Typically for GlobalProtect device or pre-login authentication. |
| --- | --- |







 Domain


 Enter the NetBIOS domain so the PAN-OS software can map users through User-ID.




 CA Certificates


 (`Required`) **Add** a **CA Certificate** to assign to the profile.
 Optionally, if the firewall uses Online Certificate Status Protocol (OCSP) to verify certificate revocation status, configure the following fields to override the default behavior. For most deployments, these fields do not apply.



| • | By default, the firewall uses the Authority Information Access (AIA) information from the certificate to extract the OCSP responder information. To override the AIA information, enter a **Default OCSP URL** (starting with http:// or https://). |
| --- | --- |






| • | By default, the firewall uses the certificate selected in the **CA Certificate** field to validate OCSP responses. To use a different certificate for validation, select it in the **OCSP Verify CA Certificate** field. |
| --- | --- |



 In addition, enter a **Template Name** to identify the template that was used to sign the certificate.




 Use CRL


 Select this option to use a certificate revocation list (CRL) to verify the revocation status of certificates.




 Use OCSP


 Select this option to use OCSP to verify the revocation status of certificates.
 Note:



| | If you select both OCSP and CRL, the firewall first tries OCSP and only falls back to the CRL method if the OCSP responder is unavailable. |
| --- | --- |







 CRL Receive Timeout


 Specify the interval (1 to 60 seconds) after which the firewall stops waiting for a response from the CRL service.




 OCSP Receive Timeout


 Specify the interval (1 to 60 seconds) after which the firewall stops waiting for a response from the OCSP responder.




 Certificate Status Timeout


 Specify the interval (1 to 60 seconds) after which the firewall stops waiting for a response from any certificate status service and applies any session blocking logic you define.




 Block session if certificate status is unknown


 Select this option if you want the firewall to block sessions when the OCSP or CRL service returns a certificate revocation status of unknown. Otherwise, the firewall proceeds with the sessions.




 Block sessions if certificate status cannot be retrieved within timeout


 Select this option if you want the firewall to block sessions after it registers an OCSP or CRL request timeout. Otherwise, the firewall proceeds with the sessions.




 Block sessions if the certificate was not issued to the authenticating device


 (`GlobalProtect only`) Select this option if you want the firewall to block sessions when the serial number attribute in the subject of the client certificate does not match the [host ID](https://docs.paloaltonetworks.com/pan-os/11-2/pan-os-web-interface-help/globalprotect/objects-globalprotect-hip-objects/hip-objects-general-tab.html) that the GlobalProtect app reports for the endpoint. Otherwise, the firewall allows the sessions. This option applies only to [GlobalProtect certificate authentication](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-user-authentication/set-up-client-certificate-authentication).




 Block sessions with expired certificates


 Select this option if you want the firewall to block sessions with servers that present expired certificates.



 Parent topic
 [Device](device.html#ID0EY2QW)