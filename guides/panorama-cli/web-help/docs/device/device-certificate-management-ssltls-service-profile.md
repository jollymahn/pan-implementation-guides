# Device > Certificate Management > SSL/TLS Service Profile

*Device : Device &gt; Certificate Management &gt; SSL/TLS Service Profile*

## Device > Certificate Management > SSL/TLS Service Profile




| • | Device > Certificate Management > SSL/TLS Service Profile |
| --- | --- |






| • | Panorama > Certificate Management > SSL/TLS Service Profile |
| --- | --- |




SSL/TLS service profiles specify a server certificate and a protocol version or range of versions for firewall or Panorama services that use SSL/TLS (such as administrative access to the web interface). By defining the protocol versions, the profiles enable you to restrict the cipher suites that are available for securing communication with the client systems requesting the services.

 CAUTION:
 In the client systems that request firewall or Panorama services, the certificate trust list (CTL) must include the certificate authority (CA) certificate that issued the certificate specified in the SSL/TLS service profile. Otherwise, users will see a certificate error when requesting the services. Most third-party CA certificates are present by default in client browsers. If an enterprise or firewall-generated CA certificate is the issuer, you must deploy that CA certificate to the CTL in client browsers.

To add a profile, click **Add**, complete the fields in the following table.



| SSL/TLS Service Profile Settings | Description |
| --- | --- |
| Name | Enter a name to identify the profile (up to 31 characters). The name is case-sensitive. It must be unique and use only letters, numbers, spaces, hyphens, and underscores. |
| Shared | If the firewall has more than one virtual system (vsys), selecting this option makes the profile available on all virtual systems. By default, this option is cleared and the profile is available only for the vsys selected in the **Device** tab, **Location** drop-down. |
| Certificate | Select, import, or generate a server certificate to associate with the profile (see [Manage Firewall and Panorama Certificates](manage-firewall-and-panorama-certificates.html#ID0E1U5Y)). CAUTION:  Do not use certificate authority (CA) certificates for SSL/TLS services; use only signed certificates. |
| Min Version | Select the earliest (**Min Version**) and latest (**Max Version**) version of TLS that services can use: **TLSv1.0**, **TLSv1.1**, **TLSv1.2**, **TLSv1.3**, or **Max** (the latest available version). Restriction:  On firewalls in FIPS/CC mode running PAN-OS 8.0 or a later release, **TLSv1.1** is the earliest supported TLS version; do not select **TLSv1.0**. Client certificates that are used when requesting firewall services that rely on **TLSv1.2** cannot have SHA512 as a digest algorithm. The client certificates must use a lower digest algorithm (such as SHA384) or you must limit the **Max Version** to **TLSv1.1** for the services. Fastpath:  Use the strongest version of the protocol you can to provide the strongest security for your network. If you can, set the **Min Version** to **TLSv1.2** and set the **Max Version** to **Max**. |
| Max Version | |


 Parent topic
 [Device](device.html#ID0EY2QW)