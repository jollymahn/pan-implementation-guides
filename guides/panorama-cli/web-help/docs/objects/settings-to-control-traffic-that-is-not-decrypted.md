# Settings to Control Traffic that is not Decrypted

*Objects : Objects &gt; Decryption Profile : Settings to Control Traffic that is not Decrypted*

Settings to Control Traffic that is not Decrypted

You can use the **No Decryption** tab to enable settings to block traffic that is matched to a decryption policy configured with the **No Decrypt** action (**Policies** > **Decryption** > **Action**). Use these options to control server certificates for the session, though the firewall does not decrypt and inspect the session traffic.



| No Decryption Tab Settings | Description |
| --- | --- |
| Block sessions with expired certificates | Terminate the SSL connection if the server certificate is expired. This prevents users from accepting expired certificates and continuing with an SSL session. Fastpath:  Block sessions with expired certificates to prevent access to potentially insecure sites. |
| Block sessions with untrusted issuers | Terminate the SSL session if the server certificate issuer is untrusted. Fastpath:  Block sessions with untrusted issuers because an untrusted issuer may indicate a man-in-the-middle attack, a replay attack, or another attack. |


 Parent topic
 [Objects > Decryption Profile](objects-decryption-profile.html#ID0EALCS)