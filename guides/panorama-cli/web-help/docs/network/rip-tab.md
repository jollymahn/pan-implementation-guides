# RIP Tab

*Network : Network &gt; Virtual Routers : More Runtime Stats for a Virtual Router : RIP Tab*

RIP Tab

The following table describes the virtual router’s Runtime Stats for RIP.



| RIP Runtime Stats | Description |
| --- | --- |
| Summary Tab | |
| Interval Seconds | Number of seconds in an interval. RIP uses this value (a length of time) to control its Update, Expire, and Delete Intervals. |
| Update Intervals | Number of intervals between RIP route advertisement updates that the virtual router sends to peers. |
| Expire Intervals | Number of intervals since the last update the virtual router received from a peer, after which the virtual router marks the routes from the peer as unusable. |
| Delete Intervals | Number of intervals after a route has been marked as unusable that, if no update is received, the firewall deletes the route from the routing table. |
| Interface Tab | |
| Address | IP address of an interface on the virtual router where RIP is enabled. |
| Auth Type | Type of authentication: simple password, MD5, or none. |
| Send Allowed | Check mark indicates this interface is allowed to send RIP packets. |
| Receive Allowed | Check mark indicates this interface is allowed to receive RIP packets. |
| Advertise Default Route | Check mark indicates that RIP will advertise its default route to its peers. |
| Default Route Metric | Metric (hop count) assigned to the default route. The lower the metric value, the higher priority it has in the route table to be selected as the preferred path. |
| Key Id | Authentication key used with peers. |
| Preferred | Preferred key for authentication. |
| Peer Tab | |
| Peer Address | IP address of a peer to the virtual router’s RIP interface. |
| Last Update | Date and time that the last update was received from this peer. |
| RIP Version | RIP version the peer is running. |
| Invalid Packets | Count of invalid packets received from this peer. Possible causes that the firewall cannot parse the RIP packet: x bytes over a route boundary, too many routes in packet, bad subnet, illegal address, authentication failed, or not enough memory. |
| Invalid Routes | Count of invalid routes received from this peer. Possible causes: route is invalid, import fails, or not enough memory. |


 Parent topic
 [More Runtime Stats for a Virtual Router](more-runtime-stats-for-a-virtual-router.html#ID0E4QNU)