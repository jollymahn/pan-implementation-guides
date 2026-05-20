# Firewall Interfaces Overview

*Network : Network &gt; Interfaces : Firewall Interfaces Overview*

Firewall Interfaces Overview

The interface configurations of firewall data ports enable traffic to enter and exit the firewall. A Palo Alto Networks® firewall can operate in multiple deployments simultaneously because you can [Configure Interfaces](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/configure-interfaces.html)to support different deployments. For example, you can configure the Ethernet interfaces on a firewall for virtual wire, Layer 2, Layer 3, and tap mode. The interfaces that the firewall supports are:




| • | **Physical Interfaces**—The firewall supports two types of media—copper and fiber optic—that can send and receive traffic at different transmission rates. You can configure Ethernet interfaces as the following types: tap, high availability (HA), log card (interface and subinterface), decrypt mirror, virtual wire (interface and subinterface), Layer 2 (interface and subinterface), Layer 3 (interface and subinterface), and aggregate Ethernet. The available interface types and transmission speeds vary by hardware model. |
| --- | --- |






| • | **Logical Interfaces**—These include virtual local area network (VLAN) interfaces, loopback interfaces, tunnel interfaces, and SD-WAN interfaces. You must set up the physical interface before defining a VLAN, SD-WAN, or tunnel interface. |
| --- | --- |



 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)