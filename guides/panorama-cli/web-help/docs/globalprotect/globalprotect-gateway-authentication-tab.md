# GlobalProtect Gateway Authentication Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Gateways : GlobalProtect Gateway Authentication Tab*

GlobalProtect Gateway Authentication Tab



| • | **Network** > **GlobalProtect** > **Gateways** > <gateway-config> > **Authentication** |
| --- | --- |




Select the **Authentication** tab to identify the SSL/TLS service profile and to configure the details of client authentication. You can add multiple client authentication configurations.



| GlobalProtect Gateway Authentication Settings |
| --- |
| SSL/TLS Service Profile |
| Client Authentication Area |
| Name |
| OS |
| Authentication Profile |







 Username Label


 Specify a custom username label for GlobalProtect gateway login. For example, **Username (only)** or **Email Address (username@domain)**.




 Password Label


 Specify a custom password label for GlobalProtect gateway login. For example, **Password (Turkish)** or **Passcode** (for two-factor, token-based authentication).




 Authentication Message


 To help end users know what credentials they should use for logging into this gateway, you can enter a message or keep the default message. The message can have a maximum of 256 characters.




 Allow Authentication with User Credentials OR Client Certificate


 If you select **No**, users must authenticate to the gateway using both user credentials and client certificates. If you select **Yes**, users can authenticate to the gateway using either user credentials or client certificates.




 Certificate Profile




 Certificate Profile


 (`Optional`) Select the **Certificate Profile** the gateway uses to match those client certificates that come from user endpoints. With a Certificate Profile, the gateway authenticates the user only if the certificate from the client matches this profile.
 If you set the **Allow Authentication with User Credentials OR Client Certificate** option to **No**, you must select a **Certificate Profile**. If you set the **Allow Authentication with User Credentials OR Client Certificate** option to **Yes**, the **Certificate Profile** is optional.
 The certificate profile is independent of the OS.




 Block login for quarantined devices


 Specify whether to block gateway login for GlobalProtect client devices that are in the quarantine list (**Device** > **Device Quarantine**).



 Parent topic
 [Network > GlobalProtect > Gateways](network-globalprotect-gateways.html#ID0EDRU1)