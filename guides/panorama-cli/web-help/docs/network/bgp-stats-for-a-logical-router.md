# BGP Stats for a Logical Router

*Network : Network &gt; Virtual Routers : More Runtime Stats for a Logical Router : BGP Stats for a Logical Router*

BGP Stats for a Logical Router

The following table describes the logical router’s Runtime Stats for BGP.



| BGP Runtime Stats | Description |
| --- | --- |
| **Summary Tab** | |
| Enabled | BGP enabled: yes or no. |
| Router ID | Router ID of the logical router. |
| Local AS | AS to which the logical router belongs. |
| Enforce First AS | Field is true if enabled, blank if not enabled. |
| Fast External Failover | Field is true if enabled, blank if not enabled. |
| Default Local Preference | Default local preference configured. |
| Graceful Restart | Field is true if enabled, blank if not enabled. |
| Max Peer Restart Time (sec) | Number of seconds configured for Graceful Restart max peer restart time. |
| Stale Route Time (sec) | Number of seconds configured for Graceful Restart stale route time. |
| Always Compare MED | Field is true if enabled, blank if not enabled. |
| Deterministic MED Comparison | Field is true if enabled, blank if not enabled. |
| **Peer Tab** | |
| Name | Name of the peer. |
| Peer Group | Name of the peer group to which this peer belongs. |
| Local IP | IP address of the BGP interface on the logical router. |
| Local AS | AS to which the local BGP firewall belongs. |
| Peer IP | IP address of the peer. |
| Remote AS | AS to which the peer belongs. |
| Up/Down | Peer is Up or Down. |
| State | Established |
| **Peer Group Tab** | |
| Name | Name of a peer group. |
| Type | Type of peer group configured, such as ebgp or ibgp. |
| Keep Alive (sec) | Keepalive time in seconds. |
| Hold Time (sec) | Hold time in seconds. |
| IP | Field is true if enabled, blank if not enabled. |
| IPv6 | Field is true if enabled, blank if not enabled. |
| Min. Route Interval (sec) | Minimum route interval in seconds. |
| Unicast | Field is true if enabled, blank if not enabled. |
| **Route** | |
| Name | IPv4 or IPv6 route in the routing table: an IPv4 or IPv6 address and prefix length. |
| AS Path | Next AS in the path. |
| Best Path | Field is true if enabled, blank if not enabled. |
| MED | 0 or blank |
| Metric | 0 or blank |
| Network | |
| Next Hop | IP address of the next hop to reach the network identified as the route (Name). |
| Origin | Origin of the route: IGP or incomplete |
| Path | Next AS in the path. |
| Path From | Indicates external. |
| Peer Name | |
| Prefix | |
| Prefix Length | |
| Valid | Field is true if enabled, blank if not enabled. |
| Weight | Weight for the route. |


 Parent topic
 [More Runtime Stats for a Logical Router](more-runtime-stats-for-a-logical-router.html#ID0EISTU)