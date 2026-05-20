# Other Supported Actions to Manage Certificates

*Device : Device &gt; Certificate Management &gt; Certificates : Manage Firewall and Panorama Certificates : Other Supported Actions to Manage Certificates*

Other Supported Actions to Manage Certificates

After you generate the certificate, its details display on the page and the following actions are available:



| Other Supported Actions to Manage Certificates | Description |
| --- | --- |
| Delete | Select the certificate and **Delete** it. Note:  |







 Revoke


 Select the certificate that you want to revoke, and click **Revoke**. The certificate will be instantly set to revoked status. No commit is required.




 Renew


 In case a certificate expires or is about to expire, select the corresponding certificate and click **Renew**. Set the validity period (in days) for the certificate and click **OK**.
 If the firewall is the CA that issued the certificate, the firewall replaces it with a new certificate that has a different serial number but the same attributes as the old certificate.
 If an external certificate authority (CA) signed the certificate and the firewall uses the Online Certificate Status Protocol (OCSP) to verify certificate revocation status, the firewall uses the OCSP responder information to update the certificate status




 Import


 **Import** a certificate and configure as follows:



| • | Enter Certificate Name to identify the certificate. |
| --- | --- |






| • | Browse to the certificate file. If you import a **PKCS12**certificate and private key, a single file contains both. If you import a **PEM** certificate, the file contains only the certificate. |
| --- | --- |






| • | Select the **File Format** for the certificate. |
| --- | --- |






| • | Select **Private key resides on Hardware Security Module** if an HSM stores the key for this certificate. For HSM details, see [Device > Setup > HSM](device-setup-hsm.html#ID0EWVBX). |
| --- | --- |






| • | **Import Private Key** as needed (`PEM format only`). If you selected **PKCS12**as the certificate **File Format**, the selected **Certificate File** includes the key. If you selected the **PEM** format, browse to the encrypted private key file (generally named *.key). For both formats, enter the **Passphrase** and **Confirm Passphrase**. |
| --- | --- |



 When you import a certificate and select **Import Private Key**, select **Block Private Key Export** to prevent any administrators, including Superusers, from exporting the private key.
 Note:



| | When you import a certificate to a Palo Alto Networks firewall or Panorama server that is in FIPS-CC mode, you must import the certificate as a Base64-Encoded Certificate (PEM) and you must encrypt the private key with AES. Also, you must use SHA1 as the passphrase-based key derivation method. |
| --- | --- |



 To import a PKCS12 certificate, convert the certificate to the PEM format (using a tool such as OpenSSL); ensure that the password phrase you use during conversion is at least six characters.




 Export


 Select the certificate you want to export, click **Export**, and select a **File Format**:



| • | Encrypted Private Key and Certificate (PKCS12)—The exported file will contain both the certificate and private key. |
| --- | --- |






| • | Base64 Encoded Certificate (PEM)—If you want to export the private key also, select Export Private Key and enter a Passphrase and Confirm Passphrase. |
| --- | --- |






| • | Binary Encoded Certificate (DER)—You can export only the certificate, not the key: ignore Export Private Key and passphrase fields. |
| --- | --- |







 Import HA Key


 The HA keys must be swapped across both the firewalls peers; that is the key from firewall 1 must be exported and then imported in to firewall 2 and vice versa.
 To import keys for high availability (HA), click **Import HA Key** and **Browse** to specify the key file for import.
 To export keys for HA, click **Export HA Key** and specify a location to save the file.




 Export HA Key




 Define the usage of the certificate


 In the Name column, select the certificate and then select options appropriate for how you plan to use the certificate.




 PDF/CSV


 Administrative roles with a minimum of read-only access can export the managed certificate configuration table as **PDF/CSV**. You can apply filters to create more specific table configuration outputs for things such as audits. Only visible columns in the web interface will be exported. See [Configuration Table Export](configuration-table-export.html#ID0EMWAM).



 Parent topic
 [Manage Firewall and Panorama Certificates](manage-firewall-and-panorama-certificates.html#ID0E1U5Y)