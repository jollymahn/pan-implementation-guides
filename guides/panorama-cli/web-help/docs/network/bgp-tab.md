# BGP Tab

*Network : Network &gt; Virtual Routers : More Runtime Stats for a Virtual Router : BGP Tab*

BGP Tab

The following table describes the virtual router’s Runtime Stats for BGP.



| BGP Runtime Stats | Description |
| --- | --- |
| Summary Tab | |
| Router Id | Router ID assigned to the BGP instance. |
| Reject Default Route | Indicates whether the Reject Default Route option is configured, which causes the VR to ignore any default routes that are advertised by BGP peers. |
| Redistribute Default Route | Indicates whether the Allow Redistribute Default Route option is configured. |
| Install Route | Indicates whether the Install Route option is configured, which causes the VR to install BGP routes in the global routing table. |
| Graceful Restart | Indicates whether or not Graceful Restart is enabled (support). |
| AS Size | Indicates whether the AS Format size selected is 2 Byte or 4 Byte. |
| Local AS | Number of the AS to which the VR belongs. |
| Local Member AS | Local Member AS number (valid only if the VR is in a confederation). The field is 0 if the VR is not in a confederation. |
| Cluster ID | Displays the Reflector Cluster ID configured. |
| Default Local Preference | Displays the Default Local Preference configured for the VR. |
| Always Compare MED | Indicates whether the Always Compare MED option is configured, which enables a comparison to choose between routes from neighbors in different autonomous systems. |
| Aggregate Regardless MED | Indicates whether the Aggregate MED option is configured, which enables route aggregation even when routes have different MED values. |
| Deterministic MED Processing | Indicates whether the Deterministic MED comparison option is configured, which enables a comparison to choose between routes that are advertised by IBGP peers (BGP peers in the same AS). |
| Current RIB Out Entries | Number of entries in the RIB Out table. |
| Peak RIB Out Entries | Peak number of Adj-RIB-Out routes that have been allocated at any one time. |
| Peer Tab | |
| Name | Name of the peer. |
| Group | Name of the peer group to which this peer belongs. |
| Local IP | IP address of the BGP interface on the VR. |
| Peer IP | IP address of the peer. |
| Peer AS | Autonomous system to which the peer belongs. |
| Password Set | Yes or no indicates whether authentication is set. |
| Status | Status of the peer, such as Active, Connect, Established, Idle, OpenConfirm, or OpenSent. |
| Status Duration (secs.) | Duration of the peer’s status. |
| Peer Group Tab | |
| Group Name | Name of a peer group. |
| Type | Type of peer group configured, such as EBGP or IBGP. |
| Aggregate Confed. AS | Yes or no indicates whether the Aggregate Confederation AS option is configured. |
| Soft Reset Support | Yes or no indicates whether the peer group supports soft reset. When routing policies to a BGP peer change, routing table updates might be affected. A soft reset of BGP sessions is preferred over a hard reset because a soft reset allows routing tables to be updated without clearing the BGP sessions. |
| Next Hop Self | Yes or no indicates whether this option is configured. |
| Next Hop Third Party | Yes or no indicates whether this option is configured. |
| Remove Private AS | Indicates whether updates will have private AS numbers removed from the AS_PATH attribute before the update is sent. |
| Local RIB Tab | |
| Prefix | Network prefix and subnet mask in the Local Routing Information Base. |
| Flag | * indicates the route was chosen as the best BGP route. |
| Next Hop | IP address of the next hop toward the Prefix. |
| Peer | Name of peer. |
| Weight | Weight attribute assigned to the Prefix. If the firewall has more than one route to the same Prefix, the route with the highest weight is installed in the IP routing table. |
| Local Pref. | Local preference attribute for the route, which is used to choose the exit point toward the prefix if there are multiple exit points. A higher local preference is preferred over a lower local preference. |
| AS Path | List of autonomous systems in the path to the Prefix network; the list is advertised in BGP updates. |
| Origin | Origin attribute for the Prefix; how BGP learned of the route. |
| MED | Multi-Exit Discriminator (MED) attribute of the route. The MED is a metric attribute for a route, which the AS advertising the route suggests to an external AS. A lower MED is preferred over a higher MED. |
| Flap Count | Number of flaps for the route. |
| RIB Out Tab | |
| Prefix | Network routing entry in the Routing Information Base. |
| Next Hop | IP address of the next hop toward the Prefix. |
| Peer | Peer to which the VR will advertise this route. |
| Local Pref. | Local preference attribute to access the prefix, which is used to choose the exit point toward the prefix if there are multiple exit points. A higher local preference is preferred over a lower local preference. |
| AS Path | List of autonomous systems in the path to the Prefix network. |
| Origin | Origin attribute for the Prefix; how BGP learned of the route. |
| MED | Multi-Exit Discriminator (MED) attribute to the Prefix. The MED is a metric attribute for a route, which the AS that is advertising the route suggests to an external AS. A lower MED is preferred over a higher MED. |
| Adv. Status | Advertised status of the route. |
| Aggr. Status | Indicates whether this route is aggregated with other routes. |


 Parent topic
 [More Runtime Stats for a Virtual Router](more-runtime-stats-for-a-virtual-router.html#ID0E4QNU)