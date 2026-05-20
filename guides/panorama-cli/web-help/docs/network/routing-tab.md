# Routing Tab

*Network : Network &gt; Virtual Routers : More Runtime Stats for a Virtual Router : Routing Tab*

Routing Tab

The following table describes the virtual router’s runtime stats for the [Route Table](routing-tab.html#ID0EU6NU), [Forwarding Table](routing-tab.html#ID0EHUOU), and the [Static Route Monitoring](routing-tab.html#ID0EHBPU) table.



| Runtime Stat | Description |
| --- | --- |
| Route Table | |
| Route Table | Select **Unicast** or **Multicast** to display either the unicast or multicast route table. |
| Display Address Family | Select **IPv4 Only**, **IPv6 Only**, or **IPv4 and IPv6** (default) to control which group of addresses to display in the table. |
| Destination | IPv4 address and netmask or IPv6 address and prefix length of networks the virtual router can reach. |
| Next Hop | IP address of the device at the next hop toward the Destination network. A next hop of 0.0.0.0 indicates the default route. |
| Metric | Metric for the route. When a routing protocol has more than one route to the same destination network, it prefers the route with the lowest metric value. Each routing protocol uses a different type of metric; for example, RIP uses hop count. |
| Weight | Weight for the route. For example, when BGP has more than one route to the same destination, it will prefer the route with the highest weight. |
| Flags | • |






| • | **A C**—Active and a result of an internal interface (connected) - Destination = network |
| --- | --- |






| • | **A H**—Active and a result of an internal interface (connected) - Destination = Host only |
| --- | --- |






| • | **A R**—Active and learned via RIP |
| --- | --- |






| • | **A S**—Active and static |
| --- | --- |






| • | **S**—Inactive (because this route has a higher metric) and static |
| --- | --- |






| • | **O1**—OSPF external type-1 |
| --- | --- |






| • | **O2**—OSPF external type-2 |
| --- | --- |






| • | **Oi**—OSPF intra-area |
| --- | --- |






| • | **Oo**—OSPF inter-area |
| --- | --- |







 Age


 Age of the route entry in the routing table. Static routes have no age.




 Interface


 Egress interface of the virtual router that will be used to reach the next hop.




 Refresh


 Click to refresh the runtime stats in the table.




 Forwarding Table
 Note:



| | The firewall chooses the best route—from the route table (RIB) toward a destination network—to place in the FIB. |
| --- | --- |







 Display Address Family


 Select **IPv4 Only**, **IPv6 Only**, or **IPv4 and IPv6** (default) to control which route table to display.




 Destination


 Best IPv4 address and netmask or IPv6 address and prefix length to a network the virtual router can reach, selected from the Route Table.




 Next Hop


 IP address of the device at the next hop toward the Destination network. A next hop of 0.0.0.0 indicates the default route.




 Flags





| • | **u**—Route is up. |
| --- | --- |






| • | **h**—Route is to a host. |
| --- | --- |






| • | **g**—Route is to a gateway. |
| --- | --- |






| • | **e**—Firewall selected this route using Equal Cost Multipath (ECMP). |
| --- | --- |






| • | *****—Route is the preferred path to a destination network. |
| --- | --- |







 Interface


 Egress interface the virtual router will use to reach the next hop.




 MTU


 Maximum transmission unit (MTU); maximum number of bytes that the firewall will transmit in a single TCP packet to this destination.




 Refresh


 Click to refresh the runtime stats in the table.




 Static Route Monitoring




 Destination


 IPv4 address and netmask or IPv6 address and prefix length of a network the virtual router can reach.




 Next Hop


 IP address of the device at the next hop toward the Destination network. A next hop of 0.0.0.0 indicates the default route.




 Metric


 Metric for the route. When there is more than one static route to the same destination network, the firewall prefers the route with the lowest metric value.




 Weight


 Weight for the route.




 Flags





| • | **A?B**—Active and learned via BGP |
| --- | --- |






| • | **A C**—Active and a result of an internal interface (connected) - Destination = network |
| --- | --- |






| • | **A H**—Active and a result of an internal interface (connected) - Destination = Host only |
| --- | --- |






| • | **A R**—Active and learned via RIP |
| --- | --- |






| • | **A S**—Active and static |
| --- | --- |






| • | **S**—Inactive (because this route has a higher metric) and static |
| --- | --- |






| • | **O1**—OSPF external type-1 |
| --- | --- |






| • | **O2**—OSPF external type-2 |
| --- | --- |






| • | **Oi**—OSPF intra-area |
| --- | --- |






| • | **Oo**—OSPF inter-area |
| --- | --- |







 Interface


 Egress interface of the virtual router that will be used to reach the next hop.




 Path Monitoring (Fail On)


 If path monitoring is enabled for this static route, Fail On indicates:



| • | **All**—Firewall considers the static route down and will fail over if all of the monitored destinations for the static route are down. |
| --- | --- |






| • | **Any**—Firewall considers the static route down and will fail over if any one of the monitored destinations for the static route is down. |
| --- | --- |



 If static route path monitoring is disabled, Fail On indicates **Disabled**.




 Status


 Status of the static route based on ICMP pings to the monitored destinations: **Up**, **Down**, or path monitoring for the static route is **Disabled**.




 Refresh


 Refreshes the runtime stats in the table.



 Parent topic
 [More Runtime Stats for a Virtual Router](more-runtime-stats-for-a-virtual-router.html#ID0E4QNU)