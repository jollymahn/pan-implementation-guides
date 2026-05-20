# Settings to Control Decrypted SSH Traffic

*Objects : Objects &gt; Decryption Profile : Settings to Control Decrypted SSH Traffic*

Settings to Control Decrypted SSH Traffic

The following table describes the settings you can use to control decrypted inbound and outbound SSH traffic. These settings allow you to limit or block SSH tunneled traffic based on criteria including the use of unsupported algorithms, the detection of SSH errors, or the availability of resources to process SSH Proxy decryption.



| SSH Proxy Tab Settings | Description |
| --- | --- |
| **Unsupported Mode Checks**—Use these options to control sessions if unsupported modes are detected in SSH traffic. Supported SSH version is SSH version 2. | |
| Block sessions with unsupported versions | Terminate sessions if the “client hello” message is not supported by PAN-OS. Fastpath:  Always block sessions with unsupported versions to prevent access to sites with weak protocols. On the **SSL Protocol Settings** tab, set the minimum Protocol Version to TLSv1.2 to block sites with weak protocol versions. If a site you need to access for business purposes uses a weaker protocol, create a separate Decryption profile that allows the weaker protocol and specify it in a Decryption policy rule that applies only to the sites for which you must allow the weaker protocol. |
| Block sessions with unsupported algorithms | Terminate sessions if the algorithm specified by the client or server is not supported by PAN-OS. Fastpath:  Always block sessions with unsupported algorithms to prevent access to sites that use weak algorithms. |
| **Failure Checks**—Select actions to take if SSH application errors occur and if system resources are not available. | |
| Block sessions on SSH errors | Terminate sessions if SSH errors occur. |
| Block sessions if resources not available | Terminate sessions if system resources are not available to process decryption. Whether to block sessions when resources aren’t available is a tradeoff between tighter security and a better user experience. If you don’t block sessions when resources aren’t available, the firewall won’t be able to decrypt traffic that you want to decrypt when resources are impacted. However, blocking sessions when resources aren’t available may affect the user experience because sites that are normally reachable may become temporarily unreachable. |


 Parent topic
 [Objects > Decryption Profile](objects-decryption-profile.html#ID0EALCS)