# Decryption Settings: Forward Proxy Server Certificate Settings

*Device : Device &gt; Setup &gt; Session : Decryption Settings: Forward Proxy Server Certificate Settings*

Decryption Settings: Forward Proxy Server Certificate Settings

In Decryption Settings (**Session** tab), select **SSL Forward Proxy Settings** to configure the **RSA Key Size** or **ECDSA Key Size** and the hashing algorithm for the certificates that the firewall presents to clients when establishing sessions for SSL/TLS Forward Proxy decryption. The following table describes the parameters.



| Session Features: Forward Proxy Server Certificate Settings |
| --- |
| RSA Key Size |






| ◦ | If the destination server uses an RSA 1,024-bit key, the firewall generates a certificate with that key size and the SHA-1 hashing algorithm. |
| --- | --- |






| ◦ | If the destination server uses a key size larger than 1,024 bits (for example, 2,048 or 4,096 bits), the firewall generates a certificate that uses a 2,048-bit key and the SHA-256 algorithm. |
| --- | --- |






| • | **1024-bit RSA**—Select this option if you want the firewall to generate certificates that use an RSA 1,024-bit key and the SHA-256 hashing algorithm regardless of the key size that the destination server uses. |
| --- | --- |



 Note:**As of December 31, 2013, public certificate authorities (CAs) and popular browsers have limited support for X.509 certificates that use keys of fewer than 2,048 bits. In the future, depending on security settings, the browser might warn the user or block the SSL/TLS session entirely when presented with such keys.



| • | **2048-bit RSA**—Select this option if you want the firewall to generate certificates that use an RSA 2,048-bit key and the SHA-256 hashing algorithm regardless of the key size that the destination server uses. Public CAs and popular browsers support 2,048-bit keys, which provide better security than 1,024-bit keys. |
| --- | --- |






| • | 3072-bit RSA**—Select this option if you want the firewall to generate certificates that use an RSA 3,072-bit key and the SHA-256 hashing algorithm regardless of the key size that the destination server uses. |
| --- | --- |






| • | **4096-bit RSA**—Select this option if you want the firewall to generate certificates that use an RSA 4,096-bit key and the SHA-256 hashing algorithm regardless of the key size that the destination server uses. |
| --- | --- |







 ECDSA Key Size


 Select one of the following:



| • | **Defined by destination host** (default)—Select this option if you want the firewall to generate certificates based on the key that the destination server uses: |
| --- | --- |






| ◦ | If the destination server uses an ECDSA 256-bit or 384-bit key, the firewall generates a certificate with that key size. |
| --- | --- |






| ◦ | If the destination server uses a key size larger than 384 bits, the firewall generates a certificate that uses a 521-bit key. |
| --- | --- |






| • | **256-bit ECDSA**—Select this option if you want the firewall to generate certificates that use an ECDSA 256-bit key regardless of the key size that the destination server uses. |
| --- | --- |






| • | **384-bit ECDSA**—Select this option if you want the firewall to generate certificates that use an ECDSA 384-bit key regardless of the key size that the destination server uses. |
| --- | --- |






 Parent topic
 [Device > Setup > Session](device-setup-session.html#ID0EBWRX)