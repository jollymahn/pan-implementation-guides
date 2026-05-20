# Manage Default Trusted Certificate Authorities

*Device : Device &gt; Certificate Management &gt; Certificates : Manage Default Trusted Certificate Authorities*

Manage Default Trusted Certificate Authorities



| • | Device > Certificate Management > Certificates > Default Trusted Certificate Authorities |
| --- | --- |




Use this page to view, disable, or export, the pre-included certificate authorities (CAs) that the firewall trusts. The pre-installed list of CAs includes the most common and trusted certificate providers responsible for issuing the certificates the firewall requires to secure connections to the internet. For each trusted root CA, the name, subject, issuer, expiration date and validity status are displayed.


The firewall does not trust intermediate CAs by default because intermediate CAs are not a part of the chain of trust between the firewall and the trusted root CA. You must manually add any intermediate CAs that you want the firewall to trust, along with any additional trusted enterprise CAs that your organization requires (**Device** > **Certificate Management** > **Certificates** > **Device Certificates**).



| Trusted Certificate Authorities Settings | Description |
| --- | --- |
| Enable | If you disabled a CA, you can re-**Enable** it. |
| Disable | Select the CA and **Disable** it. You might use this option to trust only specific CAs or to disable all other CAs and trust only your local CA. |
| Export | Select and **Export** the CA certificate. You can import into another system or view the certificate offline. |


 Parent topic
 [Device > Certificate Management > Certificates](device-certificate-management-certificates.html#ID0EZE5Y)