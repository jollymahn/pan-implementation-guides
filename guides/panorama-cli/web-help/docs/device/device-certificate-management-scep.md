# Device > Certificate Management > SCEP

*Device : Device &gt; Certificate Management &gt; SCEP*

## Device > Certificate Management > SCEP


The simple certificate enrollment protocol (SCEP) provides a mechanism for issuing a unique certificate to endpoints, gateways, and satellite devices. Select **Device** > **Certificate Management** > **SCEP** to create an SCEP configuration.

 Note:**
 For more information on how to create a SCEP profile, refer to [Deploying Certificates Using SCEP](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/obtain-certificates/deploy-certificates-using-scep)**
 .

To start a new SCEP configuration, click **Add** and then complete the following fields.



| SCEP Settings | Description |
| --- | --- |
| Name | Specify a descriptive Name to identify this SCEP configuration, such as SCEP_Example. This name distinguishes a SCEP profile from other instances that you might have among the configuration profiles. |
| Location | Select a Location for the profile if the system has multiple virtual systems. The location identifies where the SCEP configuration is available. |
| One Time Password (Challenge) | |
| SCEP Challenge | (`Optional`) To make SCEP-based certificate generation more secure, you can configure a SCEP challenge-response mechanism (a one-time password (OTP)) between the public key infrastructure (PKI) and the portal for each certificate request. Note:  |



 The challenge mechanism that you select determines the source of the OTP. If you select **Fixed**, copy the enrollment challenge password from the SCEP server for the PKI and enter the string in the portal’s **Password** dialog that displays when configured as **Fixed**. Each time the portal requests a certificate, it uses this password to authenticate with the PKI. If you select **Dynamic**, you enter the username and password of your choice (possibly the credentials of the PKI administrator) and the SCEP **Server URL** where the portal-client submits these credentials. This username and password remains the same while the SCEP server transparently generates an OTP password for the portal upon each certificate request. (You can see this OTP change after a screen refresh in “The enrollment challenge password is” field upon each certificate request.) The PKI transparently passes each new password to the portal, which then uses the password for its certificate request.
 Note:



| | To comply with the U.S. Federal Information Processing Standard (FIPS), select **Dynamic**, specify a **Server URL** that uses HTTPS, and enable **SCEP Server SSL Authentication**. (FIPS-CC operation is indicated on the firewall login page and in the firewall status bar.) |
| --- | --- |







 Configuration




 Server URL


 Enter the URL at which the portal requests and receives client certificates from the SCEP server. Example:
 http://<hostname or IP>/certsrv/mscep/.




 CA-IDENT Name


 Enter a string to identify the SCEP server. Maximum length is 255 characters.




 Subject


 Configure the Subject to include identifying information about the device and optionally user and provide this information in the certificate signing request (CSR) to the SCEP server.
 When used to request client certificates for endpoints, the endpoint sends identifying information about the device that includes its host ID value. The host ID value varies by device type, either GUID (Windows) MAC address of the interface (Mac), Android ID (Android devices), UDID (iOS devices), or a unique name that GlobalProtect assigns (Chrome). When used to request certificates for satellite devices, the host ID value is the device serial number.
 To specify additional information in the CSR, enter the Subject name. The subject must be a distinguished name in the <attribute>=<value> format and must include the common name (CN) key. For example:
 O=acme,CN=acmescep
 There are two ways to specify the CN:



| • | (`Recommended`) **Token-based CN**—Enter one of the supported tokens $USERNAME, $EMAILADDRESS, or $HOSTID. Use the username or email address variable to ensure that the portal requests certificates for a specific user. To request certificates for the device only, specify the hostid variable. When the GlobalProtect portal pushes the SCEP settings to the agent, the CN portion of the subject name is replaced with the actual value (username, hostid, or email address) of the certificate owner. For example: |
| --- | --- |



 O=acme,CN=$HOSTID



| • | **Static CN**—The CN you specify will be used as the subject for all certificates issued by the SCEP server. For example: |
| --- | --- |



 O=acme,CN=acmescep




 Subject Alternative Name Type


 After you select a type other than **None**, a dialog displays for you to enter the appropriate value:



| • | **RFC 822 Name**—Enter the email name in a certificate’s subject or Subject Alternative Name extension. |
| --- | --- |






| • | **DNS Name**—Enter the DNS name used to evaluate certificates. |
| --- | --- |






| • | **Uniform Resource Identifier (URI)**—Enter the name of the URI resource from which the client obtains the certificate. |
| --- | --- |







 Cryptographic Settings





| • | **Number of Bits**—Select the key’s **Number of Bits** for the certificate. If the firewall is in FIPS-CC mode, the generated keys must be at least 2,048 bits. (FIPS-CC operation is indicated on the firewall login page and the firewall status bar.) |
| --- | --- |






| • | **Digest**—Select the **Digest** algorithm for the certificate: **SHA1**, **SHA256**, **SHA384**, or **SHA512**. If the firewall is in FIPS-CC mode, you must select **SHA256**, **SHA384**, or **SHA512** as the **Digest** algorithm. |
| --- | --- |







 Use as digital signature


 Select this option to configure the endpoint to use the private key in the certificate to validate a digital signature.




 Use for key encipherment


 Select this option to configure the client endpoint to use the private key in the certificate to encrypt data exchanged over the HTTPS connection established with the certificates issued by the SCEP server.




 CA Certificate Fingerprint


 (`Optional`) To ensure that the portal connects to the correct SCEP server, enter the **CA Certificate Fingerprint**. Obtain this fingerprint from the SCEP server interface in the **Thumbprint** field.
 Log in to the SCEP server’s administrative user interface (for example, at http://<hostname or IP>/CertSrv/mscep_admin/). Copy the thumbprint and enter it in **CA Certificate Fingerprint**.




 SCEP Server SSL Authentication


 To enable SSL, select the root **CA Certificate** for the SCEP server. Optionally, you can enable mutual SSL authentication between the SCEP server and the GlobalProtect portal by selecting a **Client Certificate**.



 Parent topic
 [Device](device.html#ID0EY2QW)