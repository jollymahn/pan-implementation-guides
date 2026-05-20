# Device > Certificate Management > OCSP Responder

*Device : Device &gt; Certificate Management &gt; OCSP Responder*

## Device > Certificate Management > OCSP Responder


Select **Device** > **Certificate Management** > **OCSP Responder** to define an Online Certificate Status Protocol (OCSP) responder (server) to verify the revocation status of certificates.


Besides adding an OCSP responder, enabling OCSP requires the following tasks:




| • | Enable communication between the firewall and the OCSP server: select **Device** > **Setup** > **Management**, select **HTTP OCSP** in Management Interface Settings, and then click **OK**. |
| --- | --- |






| • | If the firewall will decrypt outbound SSL/TLS traffic, optionally configure it to verify the revocation status of destination server certificates: select **Device** > **Setup** > **Sessions**, click **Decryption Certificate Revocation Settings**, select **Enable** in the OCSP settings, enter the **Receive Timeout** (the interval after which the firewall stops waiting for an OCSP response), and then click **OK**. |
| --- | --- |






| • | Optionally, to configure the firewall as an OCSP responder, add an Interface Management profile to the interface used for OCSP services. First, select **Network** > **Network Profiles** > **Interface Mgmt**, click **Add**, select **HTTP OCSP**, and then click **OK**. Second, select **Network** > **Interfaces**, click the name of the interface that the firewall will use for OCSP services, select **Advanced** > **Other info**, select the Interface Management profile you configured, and then click **OK** and **Commit**. |
| --- | --- |



 Fastpath:
 Enable an OCSP responder so that if a certificate was revoked, you are notified and can take appropriate action to establish a secure connection to the portal and gateways.


| OCSP Responder Settings | Description |
| --- | --- |
| Name | Enter a name to identify the responder (up to 31 characters). The name is case-sensitive. It must be unique and use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the responder is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared. After you save the responder, you can’t change its **Location**. |
| Host Name | Enter the host name (recommended) or IP address of the OCSP responder. From this value, PAN-OS automatically derives a URL and adds it to the certificate being verified. If you configure the firewall as an OCSP responder, the host name must resolve to an IP address in the interface that the firewall uses for OCSP services. |


 Parent topic
 [Device](device.html#ID0EY2QW)