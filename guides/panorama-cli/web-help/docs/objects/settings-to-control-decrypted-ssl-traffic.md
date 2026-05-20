# Settings to Control Decrypted Traffic

*Objects : Objects &gt; Decryption Profile : Settings to Control Decrypted Traffic*

Settings to Control Decrypted Traffic

The following table describes the settings you can use to control traffic that the firewall decrypted using either Forward Proxy decryption or Inbound Inspection (including the SSL Protocol Settings tab). You can use these settings to limit or block TLS sessions based on criteria including the status of the external server certificate, the use of unsupported cipher suites or protocol versions, or the availability of system resources to process decryption.



| SSL Decryption Tab Settings | Description |
| --- | --- |
| **SSL FORWARD PROXY TAB** Select options to limit or block TLS traffic decrypted using Forward Proxy. | |
| **Server Certificate Validation**—Select options to control server certificates for decrypted traffic. | |
| Block sessions with expired certificates | Terminate the TLS connection if the server certificate is expired. This prevents users from accepting expired certificates and continuing with an TLS session. Fastpath:  Block sessions with expired certificates to prevent access to potentially insecure sites. |
| Block sessions with untrusted issuers | Terminate the TLS session if the server certificate issuer is untrusted. Fastpath:  Block sessions with untrusted issuers because an untrusted issuer may indicate a man-in-the-middle attack, a replay attack, or another attack. |
| Block sessions with unknown certificate status | Terminate the TLS session if a server returns a certificate revocation status of “unknown”. Certificate revocation status indicates if trust for the certificate has been or has not been revoked. Note:  Block sessions with unknown certificate status for the tightest security. However, because certificate status may be unknown for a variety of reasons, this may tighten security too much. If blocking unknown certificate status affects sites you need to use for business, don’t block sessions with unknown certificate status. |
| Block sessions on SNI mismatch with Server Certificate (SAN/CN) | Automatically deny any sessions where the Server Name Indication (SNI) does not match the server certificate. Palo Alto Networks recommends enabling this option if you configure an [explicit proxy](https://docs.paloaltonetworks.com/content/techdocs/en_US/pan-os/11-1/pan-os-networking-admin/dns/configure-a-web-proxy/configure-explicit-proxy.html) or [transparent proxy](https://docs.paloaltonetworks.com/content/techdocs/en_US/pan-os/11-1/pan-os-networking-admin/dns/configure-a-web-proxy/configure-transparent-proxy.html). For more information, refer to [Configure a Web Proxy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/configure-a-web-proxy) in the [PAN-OS Networking Administrator's Guide](https://docs.paloaltonetworks.com/content/techdocs/en_US/pan-os/11-1/pan-os-networking-admin.html). |
| Block sessions on the certificate status check timeout | Terminate the TLS session if the certificate status cannot be retrieved within the amount of time that the firewall is configured to stop waiting for a response from a certificate status service. You can configure **Certificate Status Timeout** value when creating or modifying a certificate profile (**Device** > **Certificate Management** > **Certificate Profile**). Blocking sessions when the status check times out is a tradeoff between tighter security and a better user experience. If certificate revocation servers respond slowly, blocking on a timeout may block sites that have valid certificates. You can increase the timeout value for Certificate Revocation Checking (CRL) and Online Certificate Status Protocol (OCSP) if you are concerned about timing out valid certificates. |
| Restrict certificate extensions | Limits the certificate extensions used in the dynamic server certificate to key usage and extended key usage. Fastpath:  Restrict certificate extensions if your deployment requires no other certificate extensions. |
| Append certificate's CN value to SAN extension | Enable the firewall to add a Subject Alternative Name (SAN) extension to the impersonation certificate it presents to clients as part of Forward Proxy decryption. When a server certificate contains only a Common Name (CN), the firewall adds a SAN extension to the impersonation certificate based on the server certificate CN. This option is useful in cases where browsers require server certificates to use a SAN and no longer support certificate matching based on CNs; it ensures that end users can continue to access their requested web resources and that the firewall can continue to decrypt sessions even if a server certificate contains only a CN. Fastpath:  Append the certificate’s CN value to the SAN extension to help ensure access to requested web resources. |
| **Unsupported Mode Checks**—Select options to control unsupported TLS applications. | |
| Block sessions with unsupported versions | Terminate sessions if PAN-OS does not support the “client hello” message. PAN-OS supports SSLv3, TLSv1.0, TLSv1.1, TLSv1.2, and TLSv1.3. Fastpath:  Always block sessions with unsupported versions to prevent access to sites with weak protocols. On the **SSL Protocol Settings** tab, set the minimum Protocol Version to TLSv1.2 to block sites with weak protocol versions. If a site you need to access for business purposes uses a weaker protocol, create a separate Decryption profile that allows the weaker protocol and specify it in a Decryption policy rule that applies only to the sites for which you must allow the weaker protocol. |
| Block sessions with unsupported cipher suites | Terminate the session if the cipher suite specified in the TLS handshake if it is not supported by PAN-OS. Fastpath:  Block sessions that use cipher suites you don’t support. You configure which cipher suites (encryption algorithms) to allow on the **SSL Protocol Settings** tab. Don’t allow users to connect to sites with weak cipher suites. |
| Block sessions with client authentication | Terminate sessions with client authentication for Forward Proxy traffic. Fastpath:  Block sessions with client authentication unless an important application requires it, in which case you should create a separate Decryption profile and apply it only to traffic that requires client authentication. |
| **Failure Checks**—Select the action to take if system resources are not available to process decryption. | |
| Block sessions if resources not available | Terminate sessions if system resources are not available to process decryption. Whether to block sessions when resources aren’t available is a tradeoff between tighter security and a better user experience. If you don’t block sessions when resources aren’t available, the firewall won’t be able to decrypt traffic that you want to decrypt when resources are impacted. However, blocking sessions when resources aren’t available may affect the user experience because sites that are normally reachable may become temporarily unreachable. |
| Block sessions if HSM not available | Terminate sessions if a hardware security module (HSM) is not available to sign certificates. Whether to block sessions if the HSM isn’t available depends on your compliance rules about where private keys must come from and how you want to handle encrypted traffic if the HSM isn’t available. |
| Block downgrade on no resources | Terminate the session if system resources are not available to process the TLSv1.3 handshake (instead of downgrading to TLSv1.2). Whether to block sessions when resources aren’t available is a tradeoff between tighter security and a better user experience. If you block downgrading the handshake to TLSv1.2 when TLSv1.3 resources aren’t available, the firewall drops the session. If you do not block downgrading the handshake, then if resources aren’t available for the TLSv1.3 handshake, the firewall downgrades to TLSv1.2. |
| **Client Extension** | |
| Strip ALPN | The firewall processes and inspects HTTP/2 traffic by default. However, you can disable HTTP/2 inspection by specifying for the firewall to **Strip ALPN**. With this option selected, the firewall removes any value contained in the Application-Layer Protocol Negotiation (ALPN) TLS extension). Because ALPN is used to secure HTTP/2 connections, when there is no value specified for this TLS extension, the firewall either downgrades HTTP/2 traffic to HTTP/1.1 or classifies it as unknown TCP traffic. |
| Note:  | For unsupported modes and failure modes, the session information is cached for 12 hours, so future sessions between the same hosts and server pair are not decrypted. Enable the options to block those sessions instead. |







 **SSL INBOUND INSPECTION TAB**
 Select options to limit or block traffic decrypted using Inbound Inspection.




 **Unsupported Mode Checks**—Select options to control sessions if unsupported modes are detected in TLS traffic.




 Block sessions with unsupported versions


 Terminate sessions if PAN-OS does not support the “client hello” message. PAN-OS supports SSLv3, TLSv1.0, TLSv1.1, TLSv1.2, and TLSv1.3.
 Fastpath:
 Always block sessions with unsupported versions to prevent access to sites with weak protocols. On the **SSL Protocol Settings** tab, set the minimum Protocol Version to TLSv1.2 to block sites with weak protocol versions. If a site you need to access for business purposes uses a weaker protocol, create a separate Decryption profile that allows the weaker protocol and specify it in a Decryption policy rule that applies only to the sites for which you must allow the weaker protocol.




 Block sessions with unsupported cipher suites


 Terminate the session if the cipher suite used is not supported by PAN-OS.
 Fastpath:
 Block sessions that use cipher suites you don’t support. You configure which cipher suites (encryption algorithms) to allow on the **SSL Protocol Settings** tab. Don’t allow users to connect to sites with weak cipher suites.




 **Failure Checks**—Select the action to take if system resources are not available.




 Block sessions if resources not available


 Terminate sessions if system resources are not available to process decryption.
 Whether to block sessions when resources aren’t available is a tradeoff between tighter security and a better user experience. If you don’t block sessions when resources aren’t available, the firewall won’t be able to decrypt traffic that you want to decrypt when resources are impacted. However, blocking sessions when resources aren’t available may affect the user experience because sites that are normally reachable may become temporarily unreachable.




 Block sessions if HSM not available


 Terminate sessions if a hardware security module (HSM) is not available to decrypt the session key.
 Whether to block sessions if the HSM isn’t available depends on your compliance rules about where private keys must come from and how you want to handle encrypted traffic if the HSM isn’t available.




 Block downgrade on no resources


 Terminate the session if system resources are not available to process the TLSv1.3 handshake (instead of downgrading to TLSv1.2).
 Whether to block sessions when resources aren’t available is a tradeoff between tighter security and a better user experience. If you block downgrading the handshake to TLSv1.2 when TLSv1.3 resources aren’t available, the firewall drops the session. If you do not block downgrading the handshake, then if resources aren’t available for the TLSv1.3 handshake, the firewall downgrades to TLSv1.2.




 **SSL PROTOCOL SETTINGS TAB**
 Select the following settings to enforce protocol versions and cipher suites for TLS session traffic.




 Protocol Versions


 Enforce the use of minimum and maximum protocol versions for the TLS session.




 Min Version


 Set the minimum protocol version that can be used to establish the TLS connection.
 Fastpath:
 Set the Min Version to TLSv1.2 to provide the strongest security. Review sites that don’t support TLSv1.2 to see if they really have a legitimate business purpose. For sites you need to access that don’t support TLSv1.2, create a separate Decryption profile that specifies the strongest protocol version they support and apply it to a Decryption policy rule that limits the use of the weak version to only the necessary sites, from only the necessary sources (zones, addresses, users).




 Max Version


 Set the maximum protocol version that can be used to establish the TLS connection. You can choose the option Max so that no maximum version is specified; in this case, protocol versions that are equivalent to or are a later version than the selected minimum version are supported.
 Fastpath:
 Set the Max Version to **Max** so that as protocols improve, the firewall automatically supports them.
 However, if your Decryption policy supports mobile applications, many of which use pinned certificates, set the **Max Version** to **TLSv1.2**. Because TLSv1.3 encrypts certificate information that was not encrypted in previous TLS versions, the firewall can’t automatically add decryption exclusions based on certificate information, which affects some mobile applications. Therefore, if you enable TLSv1.3, the firewall may drop some mobile application traffic unless you create a No Decryption policy for that traffic. If you know the mobile applications you use for business, consider creating a separate Decryption policy and profile for those applications so that you can enable TLSv1.3 for all other traffic.




 Key Exchange Algorithms


 Enforce the use of the selected key exchange algorithms for the TLS session.
 All three algorithms (**RSA**, **DHE**, and **ECDHE**) are enabled by default. The **DHE** (Diffie-Hellman) and **ECDHE** (elliptic curve Diffie-Hellman) enable [Perfect Forward Secrecy (PFS)](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/decryption-concepts/perfect-forward-secrecy-pfs-support-for-ssl-decryption.html) for Forward Proxy or Inbound Inspection decryption.




 Encryption Algorithms


 Enforce the use of the selected encryption algorithms for the TLS session.
 Fastpath:
 Don’t support the weak **3DES** or **RC4** encryption algorithms. (The firewall automatically blocks these two algorithms when you use TLSv1.2 or greater as the minimum protocol version.) If you have to make an exception and support a weaker protocol version, uncheck **3DES** and **RC4** in the Decryption profile. If there are sites you must access for business purposes that use **3DES** or **RC4** encryption algorithms, create a separate Decryption profile and apply it to a Decryption policy rule for just those sites.




 Authentication Algorithms


 Enforce the use of the selected authentication algorithms for the TLS session.
 Fastpath:
 Block the old, weak MD5 algorithm (blocked by default). If no necessary sites use SHA1 authentication, block SHA1. If any sites you require for business purposes use SHA1, create a separate Decryption profile and apply it to a Decryption policy rule for just those sites.



 Parent topic
 [Objects > Decryption Profile](objects-decryption-profile.html#ID0EALCS)