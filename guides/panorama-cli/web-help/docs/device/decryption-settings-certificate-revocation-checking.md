# Decryption Settings: Certificate Revocation Checking

*Device : Device &gt; Setup &gt; Session : Decryption Settings: Certificate Revocation Checking*

Decryption Settings: Certificate Revocation Checking

Select **Session**, and in Decryption Settings, select **Certificate Revocation Checking** to set the parameters described in the following table.



| Session Features: Certificate Revocation Checking Settings | Description |
| --- | --- |
| Enable: CRL | Select this option to use the certificate revocation list (CRL) method to verify the revocation status of certificates. If you also enable Online Certificate Status Protocol (OCSP), the firewall first tries OCSP; if the OCSP server is unavailable, the firewall then tries the CRL method. For more information on decryption certificates, see [Keys and Certificates for Decryption](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/decryption-concepts/keys-and-certificates-for-decryption-policies.html). |
| Receive Timeout: CRL | If you enabled the CRL method for verifying certificate revocation status, specify the interval in seconds (1 to 60; default is 5) after which the firewall stops waiting for a response from the CRL service. |
| Enable: OCSP | Select this option to use OCSP to verify the revocation status of certificates. |
| Receive Timeout: OCSP | If you enabled the OCSP method for verifying certificate revocation status, specify the interval in seconds (1 to 60; default is 5) after which the firewall stops waiting for a response from the OCSP responder. |
| Certificate Status Timeout | Specify the interval in seconds (1 to 60; default is 5) after which the firewall stops waiting for a response from any certificate status service and applies any session blocking logic you optionally define. The **Certificate Status Timeout** relates to the OCSP/CRL **Receive Timeout** as follows: • |






| • | If you enable only OCSP—The firewall registers a request timeout after the lesser of two intervals passes: the **Certificate Status Timeout** value or the OCSP **Receive Timeout** value. |
| --- | --- |






| • | If you enable only CRL—The firewall registers a request timeout after the lesser of two intervals passes: the **Certificate Status Timeout** value or the CRL **Receive Timeout** value. |
| --- | --- |






 Parent topic
 [Device > Setup > Session](device-setup-session.html#ID0EBWRX)