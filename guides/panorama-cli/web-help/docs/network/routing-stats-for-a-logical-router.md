# Routing Stats for a Logical Router

*Network : Network &gt; Virtual Routers : More Runtime Stats for a Logical Router : Routing Stats for a Logical Router*

Routing Stats for a Logical Router



| • | Network > Routing > Logical Routers > More Runtime Stats |
| --- | --- |




The following table describes the logical router’s runtime stats for the Route Table, Forwarding Table, and Static Route Monitoring table.



| Runtime Stat | Description |
| --- | --- |
| **Route Table** | |
| Display Address Family | Select **IPv4 Only**, **IPv6 Only**, or **IPv4 and IPv6** (default) to control which group of addresses to display in the table. |
| Destination | IPv4 address and netmask or IPv6 address and prefix length of networks the logical router can reach. |
| Next Hop | IP address of the device at the next hop toward the Destination network. A next hop of 0.0.0.0 indicates the default route. |
| Protocol | Indicates the route is a static or connected route or learned through BGP. |
| Metric | Metric for the route. When a routing protocol has more than one route to the same destination network, it prefers the route with the lowest metric value. Each routing protocol uses a different type of metric; for example, RIP uses hop count. |
| Selected | Field is true if enabled; blank if disabled. |
| Age | Age of the route entry in the routing table. |
| Active | Field is true if enabled; blank if disabled. |
| Interface | Egress interface of the logical router that will be used to reach the next hop. |
| Refresh | Click to refresh the runtime states in the table. |
| **Forwarding Table** Note:  | The firewall chooses the best route—from the route table (RIB) toward a destination network—to place in the FIB. |







 Destination


 Best IPv4 address and netmask or IPv6 address and prefix length to a network the logical router can reach, selected from the Route Table.




 Next Hop


 IP address of the device at the next hop toward the Destination network. A next hop of 0.0.0.0 indicates the default route.




 MTU


 Maximum transmission unit (MTU); maximum number of bytes that the firewall will transmit in a single TCP packet to this destination.




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


 Egress interface the logical router will use to reach the next hop.




 **Static Route Monitoring**




 Destination


 IPv4 address and netmask or IPv6 address and prefix length of a network the logical router can reach.




 Next Hop


 IP address of the device at the next hop toward the Destination network. A next hop of 0.0.0.0 indicates the default route.




 Metric


 Metric for the route. When there is more than one static route to the same destination network, the firewall prefers the route with the lowest metric value.




 Interface


 Egress interface of the logical router that will be used to reach the next hop.




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
 [More Runtime Stats for a Logical Router](more-runtime-stats-for-a-logical-router.html#ID0EISTU)