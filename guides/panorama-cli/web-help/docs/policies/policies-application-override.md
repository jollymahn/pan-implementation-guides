# Policies > Application Override

*Policies : Policies &gt; Application Override*

## Policies > Application Override


To change how the firewall classifies network traffic into applications, you can specify application override policies. For example, if you want to control one of your custom applications, an application override policy can be used to identify traffic for that application according to zone, source and destination address, port, and protocol. If you have network applications that are classified as “unknown,” you can create new application definitions for them (refer to [Defining Applications](defining-applications.html#ID0EULZQ)).

 Fastpath:
 If possible, avoid using application override policies because they prevent the firewall from using App-ID to identify applications and from performing layer 7 inspection for threats. To support internal proprietary applications, it’s better to [create custom applications](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/use-application-objects-in-policy/create-a-custom-application) that include the application signature so the firewall performs layer 7 inspection and scans the application traffic for threats. If a commercial application doesn’t have an App-ID, [submit a request for a new App-ID](https://researchcenter.paloaltonetworks.com/submit-an-application/). If a public application definition (default ports or signature) changes so the firewall no longer identifies the application correctly, create a support ticket so Palo Alto Networks can update the definition. In the meantime, create a custom application so the firewall continues to perform layer 7 inspection of the traffic.

Like security policies, application override policies can be as general or specific as needed. The policy rules are compared against the traffic in sequence, so the more specific rules must precede the more general ones.


Because the App-ID engine in PAN-OS classifies traffic by identifying the application-specific content in network traffic, the custom application definition cannot simply use a port number to identify an application. The application definition must also include traffic (restricted by source zone, source IP address, destination zone, and destination IP address).


To create a custom application with application override:




| • | [Create a custom application ](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/use-application-objects-in-policy/create-a-custom-application)(see [Defining Applications](defining-applications.html#ID0EULZQ)). It is not required to specify signatures for the application if the application is used only for application override rules. |
| --- | --- |






| • | Define an application override policy that specifies when the custom application should be invoked. A policy typically includes the IP address of the server running the custom application and a restricted set of source IP addresses or a source zone. |
| --- | --- |




Use the following tables to configure an application override rule.




| • | [Application Override General Tab](application-override-general-tab.html#ID0EK4HQ) |
| --- | --- |






| • | [Application Override Source Tab](application-override-source-tab.html#ID0EWHIQ) |
| --- | --- |






| • | [Application Override Destination Tab](application-override-destination-tab.html#ID0EWPIQ) |
| --- | --- |






| • | [Application Override Protocol/Application Tab](application-override-protocolapplication-tab.html#ID0EQXIQ) |
| --- | --- |






| • | (`Panorama only`) [Application Override Target Tab](application-override-target-tab.html#ID0EO6IQ) |
| --- | --- |




Looking for more?


See [Use Application Objects in Policy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/use-application-objects-in-policy)

 Parent topic
 [Policies](policies.html#ID0EK5IO)