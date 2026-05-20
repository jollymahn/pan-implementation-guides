# Destination Service Route

*Device : Device &gt; Setup &gt; Services : Destination Service Route*

Destination Service Route



| • | Device > Setup > Services > Global |
| --- | --- |




On the **Global** tab, when you click on **Service Route Configuration** and then **Customize**, the **Destination** tab appears. Destination service routes are available under the **Global** tab only (not the **Virtual Systems** tab), so that the service route for an individual virtual system cannot override route table entries that are not associated with that virtual system.


You can use a destination service route to add a customized redirection of a service that is not supported on the **Customize** list of services. A destination service route is a way to set up routing to override the forwarding information base (FIB) route table. Any settings in the Destination service routes override the route table entries. They could be related or unrelated to any service.


The **Destination** tab is for the following use cases:




| • | When a service does not have an application service route. |
| --- | --- |






| • | Within a single virtual system, when you want to use multiple virtual routers or a combination of virtual router and management port. |
| --- | --- |





| Destination Service Route Settings | Description |
| --- | --- |
| Destination | Enter the **Destination** IP address. An incoming packet with a destination address that matches this address will use as its source the Source Address you specify for this service route. |
| Source Interface | To limit the drop-down for Source Address, select a **Source Interface**. Selecting **Any** causes all IP addresses on all interfaces to be available in the Source Address drop-down. Selecting **MGT** causes the firewall to use the MGT interface for the service route. |
| Source Address | Select the **Source Address** for the service route; this address will used for packets returning from the destination. You do not need to enter the subnet for the destination address. |


 Parent topic
 [Device > Setup > Services](device-setup-services.html#ID0EJYEX)