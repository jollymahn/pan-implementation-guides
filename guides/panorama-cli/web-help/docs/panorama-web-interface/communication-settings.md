# Communication Settings

*Panorama Web Interface : Panorama &gt; Managed Collectors : Log Collector Configuration : Communication Settings*

Communication Settings



| • | Panorama > Managed Collectors > Communication |
| --- | --- |




To configure custom certificate-based authentication between Log Collectors and Panorama, firewalls, and other Log Collectors, configure the settings as described in the following table.



| Communication Settings | Description |
| --- | --- |
| Secure Server Communication—Enabling **Secure Server Communication** validates the identity of client devices connecting to the Log Collector. | |
| SSL/TLS Service Profile | Select a SSL/TLS service profile from the drop-down. This profile defines the certificate presented by the Log Collector and specifies the range of SSL/TLS versions acceptable for communication with the Log Collector. |
| Certificate Profile | Select a certificate profile from the drop-down. This certificate profile defines certificate revocation checking behavior and root CA used to authenticate the certificate chain presented by the client. |
| Custom Certificate Only | When enabled, the Log Collector only accepts custom certificates for authentication with managed firewalls and Log Collectors. |
| Authorize Clients Based on Serial Number | The Log Collector authorizes client devices based on uses a hash of their serial number. |
| Check Authorization List | Client devices or device groups connecting to this Log Collector are checked against the authorization list. |
| Disconnect Wait Time (min) | The amount of time the Log Collector waits before breaking the current connection with its managed devices. The Log Collector then reestablishes connections with its managed devices using the configured secure server communications settings. The wait time begins after the secure server communications configuration is committed. |
| Authorization List | **Authorization List**—Select Add and complete the following fields to set criteria. • |






| • | **Type**—If Subject Alt. Name is selected as the Identifier, select **IP**, **hostname**, or **e-mail** as the type of the identifier. If Subject is selected, common-name is used as the identifier type. |
| --- | --- |






| • | **Value**—Enter the identifier value. |
| --- | --- |







 **Secure Client Communication**—Enabling **Secure Client Communication** ensures that the specified client certificate is used for authenticating the Log Collector over SSL connections with Panorama, firewalls, or other Log Collectors.




 Certificate Type


 Select the type of device certificate (None, Local, or SCEP) used for securing communication




 None


 If **None** is selected, no device certificate is configured and the secure client communication is not used. This is the default selection.




 Local


 The Log Collector uses a local device certificate and the corresponding private key generated on the Log Collector or imported from an existing enterprise PKI server.




 **Certificate**—Select the local device certificate. This certificate can be a unique to the firewall (based on a hash of the Log Collector’s serial number) or a common device certificate used by all Log Collectors connecting to Panorama.




 **Certificate Profile**—Select the Certificate Profile from the drop-down. This certificate profile is used for defining the server authentication with the Log Collector.




 SCEP


 The Log Collector uses a device certificate and private key generated Simple Certificate Enrollment Protocol (SCEP) server.




 **SCEP Profile**—Select a SCEP Profile from the drop-down.




 **Certificate Profile**— Select the Certificate Profile from the drop-down. This certificate profile is used for defining the server authentication with the Log Collector.




 Check Server Identity


 The client device confirms the server’s identity by matching the common name (CN) with server’s IP address or FQDN.



 Parent topic
 [Log Collector Configuration](log-collector-configuration.html#ID0E4JP3)