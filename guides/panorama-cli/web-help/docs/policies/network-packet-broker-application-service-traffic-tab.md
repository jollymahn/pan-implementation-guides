# Network Packet Broker Application/Service/Traffic Tab

*Policies : Policies &gt; Network Packet Broker : Network Packet Broker Application/Service/Traffic Tab*

Network Packet Broker Application/Service/Traffic Tab

Select the **Application/Service/Traffic** tab to define the type of traffic, the applications, and the services to forward to a Network Packet Broker security chain. You can forward any combination of decrypted TLS, non-decrypted TLS, and non-TLS traffic to a security chain.



| Field | Description |
| --- | --- |
| Traffic Type | Select the traffic type or traffic types to forward to the security chain. You can select one, some, or all of the traffic types in one rule: • |






| • | **Forward TLS(Non-Decrypted) Traffic**—Forwards undecrypted TLS traffic to the security chain specified by the Packet Broker profile attached to the Network Packet Broker policy. |
| --- | --- |






| • | **Forward Non-TLS Traffic**—Forwards cleartext (non-TLS) traffic to the security chain specified by the Packet Broker profile attached to the Network Packet Broker policy. |
| --- | --- |







 Application


 **Add** specific applications for the Network Packet Broker policy rule. If an application has multiple functions, you can select the container application or individual functional applications. If you select the container application, all functional applications are included and the application definition is automatically updated as future functional apps are added to the container app.




 Service


 Select the services that you want to limit to specific TCP or UDP port numbers. Choose one of the following from the drop-down:



| • | **any**—(Default) The selected applications are forwarded on any protocol or port. |
| --- | --- |






| • | **application-default**—The selected applications are forwarded only if they are on their default ports as defined by Palo Alto Networks®. (Applications that run on non-standard ports and protocols, if unintentional, can be a sign of undesired application behavior and usage, and if intentional, can be a sign of malicious behavior. However, internal custom applications may use non-standard ports and require exceptions.) |
| --- | --- |






| • | **Select**—**Add** an existing service or choose **Service** or **Service Group** to specify a new entry. (Or select [Objects > Services](objects-services.html#ID0EIQ2Q) and [Objects > Service Groups](objects-service-groups.html#ID0EBI3Q)). |
| --- | --- |






 Parent topic
 [Policies > Network Packet Broker](policies-network-packet-broker.html#ID0EACCQ)