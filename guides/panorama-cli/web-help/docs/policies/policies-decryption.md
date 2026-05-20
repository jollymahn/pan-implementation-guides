# Policies > Decryption

*Policies : Policies &gt; Decryption*

## Policies > Decryption


You can configure the firewall to decrypt traffic for visibility, control, and granular security. Decryption policies can apply to Secure Sockets Layer (SSL) including SSL encapsulated protocols such as IMAP(S), POP3(S), SMTP(S), and FTP(S), and Secure Shell (SSH) traffic. SSH decryption can be used to decrypt outbound and inbound SSH traffic to assure that secure protocols are not being used to tunnel disallowed applications and content.


[Add a decryption policy rule](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/define-traffic-to-decrypt/create-a-decryption-policy-rule) to define traffic that you want to decrypt (for example, you can decrypt traffic based on URL categorization). Decryption policy rules are compared against the traffic in sequence, so more specific rules must precede the more general ones.


SSL forward proxy decryption requires the configuration of a trusted certificate that is presented to the user if the server to which the user is connecting possesses a certificate signed by a CA trusted by the firewall. Create a certificate on the **Device** > **Certificate Management** > **Certificates** page and then click the name of the certificate and select **Forward Trust Certificate**.

 Note:



| | The firewall doesn’t decrypt applications that break decryption technically, for example because they use pinned certificates or client authentication. |
| --- | --- |



 Refer to the [List of Applications Excluded from SSL Decryption](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClEzCAKArticles/List-of-Applications-Excluded-from-SSL-Decryption/ta-p/62201).

The following tables describe the decryption policy settings:




| • | [Decryption General Tab](decryption-general-tab.html#ID0EDV6O) |
| --- | --- |






| • | [Decryption Source Tab](decryption-source-tab.html#ID0EP66O) |
| --- | --- |






| • | [Decryption Destination Tab](decryption-destination-tab.html#ID0EYOAQ) |
| --- | --- |






| • | [Decryption Service/URL Category Tab](decryption-serviceurl-category-tab.html#ID0ENWAQ) |
| --- | --- |






| • | [Decryption Options Tab](decryption-options-tab.html#ID0EZDBQ) |
| --- | --- |






| • | (`Panorama only`) [Decryption Target Tab](decryption-target-tab.html#ID0EYXBQ) |
| --- | --- |




**Looking for more?**


See [Decryption](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption)

 Parent topic
 [Policies](policies.html#ID0EK5IO)