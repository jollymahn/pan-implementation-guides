# Manage Firewall and Panorama Certificates

*Device : Device &gt; Certificate Management &gt; Certificates : Manage Firewall and Panorama Certificates*

Manage Firewall and Panorama Certificates



| • | Device > Certificate Management > Certificates > Device Certificates |
| --- | --- |






| • | Panorama > Certificate Management > Certificates |
| --- | --- |




Select **Device** > **Certificate Management** > **Certificates** > **Device Certificates** or **Panorama** > **Certificate Management** > **Certificates** > **Device Certificates** to display the certificates that the firewall or Panorama uses for tasks such as securing access to the web interface, SSL decryption, or LSVPN.


The following are some uses for certificates. Define the usage of the certificate after you generate it (see [Manage Default Trusted Certificate Authorities](manage-default-trusted-certificate-authorities.html#ID0E14AZ)).




| • | **Forward Trust**—The firewall uses this certificate to sign a copy of the server certificate that the firewall presents to clients during [SSL Forward Proxy decryption](https://docs.paloaltonetworks.com/network-security/decryption/administration/enabling-decryption/configure-ssl-forward-proxy) when the certificate authority (CA) that signed the server certificate is in the trusted CA list on the firewall. |
| --- | --- |






| • | **Forward Untrust**—The firewall uses this certificate to sign a copy of the server certificate the firewall presents to clients during [SSL Forward Proxy decryption](https://docs.paloaltonetworks.com/network-security/decryption/administration/enabling-decryption/configure-ssl-forward-proxy) when the CA that signed the server certificate is not in the trusted CA list on the firewall. |
| --- | --- |






| • | **Trusted Root CA**—The firewall uses this certificate as a trusted CA for [SSL Forward Proxy decryption](https://docs.paloaltonetworks.com/network-security/decryption/administration/enabling-decryption/configure-ssl-forward-proxy). The firewall has a large list of existing trusted CAs. The trusted root CA certificate is for additional CAs that your organization trusts but that are not part of the pre-installed trusted list. |
| --- | --- |






| • | **Certificate for Secure Syslog**—The firewall uses this certificate to secure the [delivery of logs as syslog messages](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/use-syslog-for-monitoring/configure-syslog-monitoring.html) to a syslog server. |
| --- | --- |




To generate a certificate, click Generate and specify the following fields:

 Note:



| | After a certificate is generated, the page displays [Other Supported Actions to Manage Certificates](other-supported-actions-to-manage-certificates.html#ID0EQCAZ). |
| --- | --- |





| Settings to Generate a Certificate | Description |
| --- | --- |
| Certificate Type | Select the entity that generates the certificate: **Local**—The firewall or Panorama generates the certificate. **SCEP**—A Simple Certificate Enrollment Protocol (SCEP) server generates the certificate and sends it to the firewall or Panorama. |
| Certificate Name | (`Required`) Enter a name (up to 63 characters on the firewall or up to 31 characters on Panorama) to identify the certificate. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| SCEP Profile | (`SCEP certificates only`) Select a **SCEP Profile** to define how the firewall or Panorama communicates with a SCEP server and to define settings for the SCEP certificate. For details, see [Device > Certificate Management > SCEP](device-certificate-management-scep.html#ID0EQEDZ). You can configure a firewall that serves as a GlobalProtect portal to [request SCEP certificates on demand and automatically deploy](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-user-authentication/set-up-client-certificate-authentication.html) the certificates to endpoints. The remaining fields in the Generate Certificate dialog do not apply to SCEP certificates. After specifying the **Certificate Name** and **SCEP Profile**, click **Generate**. |
| Common Name | (`Required`) Enter the IP address or FQDN that will appear on the certificate. |
| Shared | On a firewall that has more than one virtual system (vsys), select **Shared** if you want the certificate to be available to every vsys. |
| Signed By | To sign the certificate, you can use a certificate authority (CA) certificate that you imported into the firewall. The certificate can also be self-signed, in which case the firewall is the CA. If you are using Panorama, you also have the option of generating a self-signed certificate for Panorama. If you imported CA certificates or issued any on the firewall (self-signed), the drop-down includes the CAs available to sign the certificate that you are creating. To generate a certificate signing request (CSR), select **External Authority (CSR)**. After the firewall generates the certificate and the key pair, you can export the CSR and send it to the CA for signing. |
| Certificate Authority | Select this option if you want the firewall to issue the certificate. Marking this certificate as a CA allows you to use this certificate to sign other certificates on the firewall. |
| Block Private Key Export | When you generate a certificate, select this option to block all administrators, including Superusers, from exporting the private key. |
| OCSP Responder | Select an OCSP responder profile from the drop-down (see [Device > Certificate Management > OCSP Responder](device-certificate-management-ocsp-responder.html#ID0E1DCZ)). The corresponding host name appears in the certificate. |
| Algorithm | Select a key generation algorithm for the certificate: **RSA** or **Elliptic Curve DSA** (ECDSA). ECDSA uses smaller key sizes than the RSA algorithm and, therefore, provides a performance enhancement for processing SSL/TLS connections. ECDSA also provides equal or greater security than RSA. ECDSA is recommended for client browsers and operating systems that support it but you may be required to select RSA for compatibility with legacy browsers and operating systems. CAUTION:  Firewalls running PAN-OS 6.1 or earlier releases will delete any ECDSA certificates that you push from Panorama and any RSA certificates signed by an ECDSA certificate authority (CA) will be invalid on those firewalls. You cannot use a [hardware security module (HSM)](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/secure-keys-with-a-hardware-security-module.html) to store private ECDSA keys used for SSL Forward Proxy or Inbound Inspection decryption. |
| Number of Bits | Select the key length for the certificate. If the firewall is in FIPS-CC mode and the key generation **Algorithm** is **RSA**, the RSA keys generated must be **2048** or **3027** bits. If the **Algorithm** is **Elliptic Curve DSA**, both key length options (**256** and **384**) work. |
| Digest | Select the **Digest** algorithm for the certificate. The available options depend on the key generation **Algorithm**: • |






| • | **Elliptic Curve DSA**—**SHA256** or **SHA384** |
| --- | --- |



 If the firewall is in FIPS-CC mode and the key generation **Algorithm** is **RSA**, you must select **SHA256**, **SHA384**, or **SHA512** as the **Digest** algorithm. If the **Algorithm** is **Elliptic Curve DSA**, both **Digest** algorithms (**SHA256** and **SHA384**) work.
 Note:



| | Client certificates that are used when requesting firewall services that rely on TLSv1.2 (such as administrator access to the web interface) cannot have **SHA512** as a digest algorithm. The client certificates must use a lower digest algorithm (such as **SHA384**) or you must limit the **Max Version** to **TLSv1.1** when you configure SSL/TLS service profiles for the firewall services (see [Device > Certificate Management > SSL/TLS Service Profile](device-certificate-management-ssltls-service-profile.html#ID0E3TCZ)). |
| --- | --- |







 Expiration (days)


 Specify the number of days (default is 365) that the certificate will be valid.
 CAUTION:
 If you specify a **Validity Period** in a GlobalProtect satellite configuration, that value will override the value entered in this field.




 Certificate Attributes


 **Add** additional **Certificate Attributes** to identify the entity to which you are issuing the certificate. You can add any of the following attributes: **Country**, **State**, **Locality**, **Organization**, **Department**, and **Email**. In addition, you can specify one of the following Subject Alternative Name fields: **Host Name** (SubjectAltName:DNS), **IP** (SubjectAltName:IP), and **Alt Email** (SubjectAltName:email).
 Note:



| | To add a country as a certificate attribute, select **Country** from the **Type** column and then click into the **Value** column to see the ISO 6366 Country Codes. |
| --- | --- |






 Note:



| | If you configured a hardware security module (HSM), the private keys are stored on the external HSM storage, not on the firewall. |
| --- | --- |



 Parent topic
 [Device > Certificate Management > Certificates](device-certificate-management-certificates.html#ID0EZE5Y)