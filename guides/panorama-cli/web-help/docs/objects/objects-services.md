# Objects > Services

*Objects : Objects &gt; Services*

## Objects > Services


When you define Security policies for specific applications, you can select one or more services to limit the port numbers the applications can use. The default service is **any**, which allows all TCP and UDP ports. The HTTP and HTTPS services are predefined, but you can add additional service definitions. Services that are often assigned together can be combined into service groups to simplify the creation of Security policies (refer to [Objects > Service Groups](objects-service-groups.html#ID0EBI3Q)).


Additionally, you can use service objects to specify service-based session timeouts—this means that you can apply different timeouts to different user groups even when those groups are using the same TCP or UDP service, or, if you’re migrating from a port-based Security policy with custom applications to an application-based Security policy, you can easily maintain your custom application timeouts.


The following table describes the service settings:



| Service Settings | Description |
| --- | --- |
| Name | Enter the service name (up to **63** characters). This name appears in the services list when defining Security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Description | Enter a description for the service (up to 1023 characters). |
| Shared | Select this option if you want the service object to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the service object will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this service object in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object.




 Protocol


 Select the protocol used by the service (**TCP** or **UDP**).




 Destination Port


 Enter the destination port number (0 to 65535) or range of port numbers (port1-port2) used by the service. Multiple ports or ranges must be separated by commas. The destination port is required.




 Source Port


 Enter the source port number (0 to 65535) or range of port numbers (port1-port2) used by the service. Multiple ports or ranges must be separated by commas. The source port is optional.




 Session Timeout


 Define the session timeout for the service:



| • | **Inherit from application** (default)—No service-based timeouts are applied; the application timeout is applied. |
| --- | --- |






| • | **Override**—Define a custom session timeout for the service. Continue to populate the TCP Timeout, TCP Half Closed, and TCP Wait Time fields. |
| --- | --- |







 The following settings display only if you choose to override application timeouts and create custom session timeouts for a service:




 TCP Timeout


 Set the maximum length of time in seconds that a TCP session can remain open after data transmission has started. When this time expires, the session closes.
 Range is 1 - 604800. Default value is 3600 seconds.




 TCP Half Closed


 Set the maximum length of time in seconds that a session remains open when only one side of the connection has attempted to close the connection.
 This setting applies to:



| • | The time period after the firewall receives the first FIN packet (indicates that one side of the connection is attempting to close the session) but before it receives the second FIN packet (indicates that the other side of the connection is closing the session). |
| --- | --- |






| • | The time period before receiving an RST packet (indicating an attempt to reset the connection). |
| --- | --- |



 If the timer expires, the session closes.
 Range is 1 - 604800. Default value is 120 seconds.




 TCP Wait Time


 Set the maximum length of time in seconds that a session remains open after receiving the second of the two FIN packets required to terminate a session, or after receiving an RST packet to reset a connection.
 When the timer expires, the session closes.
 Range is 1 - 600. Default value is 15 seconds.



 Parent topic
 [Objects](objects.html#ID0EL3RQ)