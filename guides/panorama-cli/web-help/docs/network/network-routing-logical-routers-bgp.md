# Network > Routing > Logical Routers > BGP

*Network : Network &gt; Routing &gt; Logical Routers : Network &gt; Routing &gt; Logical Routers &gt; BGP*

Network > Routing > Logical Routers > BGP

The table describes the settings to [configure BGP](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/configure-bgp-on-an-advanced-routing-engine.html), peer groups, peers, networks, redistribution policies, and aggregate routes for a logical router on an Advanced Routing Engine.



| BGP Settings | Description |
| --- | --- |
| **General** | |
| Enable | Enable BGP for the logical router. |
| Router ID | Assign a Router ID to BGP for the logical router, which is typically an IPv4 address to ensure the Router ID is unique. |
| Local AS | Assign the local autonomous system (AS) to which the logical router belongs based on the Router ID (range for a 2-byte or 4-byte AS number is to 1 to 4,294,967,295). |
| Global BFD Profile | Select a BFD profile or create a new BFD profile to apply to BGP globally. Default is **None (Disable BFD)**. |
| Install Route | Select to install learned BGP routes into the global routing table; default is disabled. |
| Fast Failover | Select to have BGP terminate a session with an adjacent peer if the link to that peer goes down, without waiting for the Hold Time to expire. Fast failover of EBGP is enabled by default. Disable EBGP fast failover if it causes the firewall to unnecessarily withdraw BGP routes. |
| Graceful Shutdown | Select to have BGP lower the preference of eBGP peering links during a maintenance operation so that BGP can choose and propagate alternative paths based on RFC 8326; default is disabled. |
| ECMP Multiple AS Support | Enable if you configured ECMP and you want to run ECMP over multiple BGP autonomous systems. |
| Enforce First AS | Select to cause the firewall to drop an incoming Update message from an EBGP peer that does not list the EBGP peer’s own AS number as the first AS number in the AS_PATH attribute. (Enabled by default.) |
| Default Local Preference | Specify the default local preference that can be used to determine preferences among different paths to the same destination; range is 0 to 4,294,967,295; default is 100. |
| Graceful Restart—Enable | Enables graceful restart for BGP so that packet forwarding is not disrupted during a BGP restart (default is enabled). |
| Stale Route Time (sec) | Specify the length of time, in seconds, that a route can stay in the stale state (range is 1 to 3,600; default is 120). |
| Max Peer Restart Time (sec) | Specify the maximum length of time, in seconds, that the local device accepts as a grace period restart time for peer devices (range is 1 to 3,600; default is 120). |
| Local Restart Time | Specify the length of time, in seconds, that the local device waits to restart; range is 1 to 3,600; default is 120. This value is advertised to peers. |
| Path Selection—Always Compare MED | Select to choose paths from neighbors in different autonomous systems; default is disabled. The Multi-Exit Discriminator (MED) is an external metric that lets neighbors know about the preferred path into an AS. A lower value is preferred over a higher value. |
| Deterministic MED Comparison | Select to choose between routes that are advertised by IBGP peers (BGP peers in the same AS). Default is enabled. |
| **Peer Group** | |
| Name | Add a BGP peer group by Name (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), hyphen (-), or dot (.) and contain zero or more alphanumeric characters, underscore (_) hyphen(-) and dot. A space is not allowed. The name must be unique within the logical router and across all logical routers. |
| Enable | Enable the peer group. |
| Type | Select the type of peer group as **IBGP** (Internal BGP, peering within an AS) or **EBGP** (External BGP—peering between two autonomous systems). |
| IPv4 Address Family | Select or create an AFI IPv4 Profile to apply the settings in the profile to the peer group; default is **None**. |
| IPv6 Address Family | Select or create an AFI IPv6 Profile to apply the settings in the profile to the peer group; default is **None**. |
| IPv4 Filtering Profile | Apply the elements of a BGP Filtering Profile (for the IPv4 AFI) to the peer group; default is **None**. |
| IPv6 Filtering Profile | Apply the elements of a BGP Filtering Profile (for the IPv6 AFI) to the peer group; default is **None**. |
| Auth Profile | Select or create an Authentication profile to control MD5 authentication between BGP peers in the peer group; default is **None**. |
| Timer Profile | Select or create a BGP Timer Profile to apply to the peer group; default is **None**. The timers affect keepalive and update messages that advertise routes. |
| Multi Hop | Set the time-to-live (TTL) value in the IP header. Range is 0 to 255; a setting of 0 means use the default value: 1 for EBGP; 255 for IBGP. |
| Dampening Profile | Select or create a Dampening Profile to determine how to penalize a flapping route to suppress it from being used until it stabilizes. Default is **None**. |
| **Peer** | |
| Name | Add a BGP peer by name, which contains a maximum of 63 characters. The name must start with an alphanumeric character, underscore (_), hyphen (-), or dot (.) and contain zero or more alphanumeric characters, underscore (_) hyphen(-) and dot. A space is not allowed. The name must be unique within the logical router and across all logical routers. |
| Enable | Enable the BGP peer. |
| Passive | Select to prevent the peer from initiating a session with its neighbors; default is disabled. |
| Peer AS | Enter the AS to which the peer belongs; range is 1 to 4,294,967,295. |
| **Peer—Addressing** | |
| Inherit | • |





| • | **No**—Select to override peer group settings by creating AFI and Filtering profiles to apply to the peer. |
| --- | --- |






 Local Address—Interface


 Select the Layer 3 interface for which you are configuring BGP. Interfaces configured with a static IP address and interfaces configured as a DHCP client are available to select. If you select an interface where DHCP assigns the address, the **IP** address will indicate **None**. DHCP will later assign an IP address to the interface; you can see the address when you view **More Runtime Stats** for the logical router.




 IP Address


 If the interface has more than one IP address, enter the IP address and netmask you want to use.




 Peer Address - Type


 Select **IP** or **FQDN** and enter the IP address or FQDN of the peer.




 IPv4 Address Family


 (`Available if Inherit No`) Select the **default** profile, or create an AFI IPv4 profile to apply the settings in the profile to the peer, or select **inherit (Inherit from Peer-Group)**. Default is **none (Disable IPv4 AFI)**.




 IPv6 Address Family


 (`Available if Inherit No`) Select or create an AFI IPv6 profile to apply the settings in the profile to the peer or select **inherit (Inherit from Peer-Group)**. Default is **none (Disable IPv6 AFI)**.




 IPv4 Filtering Profile


 (`Available if Inherit No`) Select or create a BGP Filtering Profile that specifies the **IPv4** AFI for **Unicast** or **Multicast** filtering, and apply it to the peer. Alternatively, select **inherit (Inherit from Peer-Group)**. Default is **none (Disable IPv4 Filtering)**.




 IPv6 Filtering Profile


 (`Available if Inherit No`) Select or create a BGP Filtering Profile that specifies the **IPv6** AFI and **Unicast**, and apply it to the peer. Alternatively, select **inherit (Inherit from Peer-Group)**. Default is **none (Disable IPv6 Filtering)**.




 **Peer—Connection Options** These settings override the same option you have set for the peer group to which the peer belongs.




 Auth Profile


 Select or create an Authentication Profile. The default is **inherit (Inherit from Peer-Group)**, which causes the peer to use the Auth profile specified for the peer group.




 Timer Profile


 Select or create a Timer profile. The default setting is **inherit (Inherit from Peer-Group)**, which causes the peer to use the Timer Profile specified for the peer group.




 Multi Hop


 Specify the TTL value in the IP header; range is 0 to 255; default is **inherit (Inherit from Peer-Group)**.




 Dampening Profile


 Select or create a Dampening Profile, which determines how to penalize a flapping route to suppress it from being used until it stabilizes. Default is **inherit (Inherit from Peer-Group)**, which causes the peer to use the Dampening Profile specified for the peer group.




 **Peer—Advanced**




 Enable Sender Side Loop Detection


 Select to cause the firewall to check the AS_PATH attribute of a route in the BGP RIB before it sends the route in an update, to ensure that the peer AS number isn't in the AS_PATH list. The firewall doesn't advertise the route if the peer AS number is in the AS_PATH list. Usually the receiver detects loops, but this optimization feature has the sender perform loop detection. Disable this feature to have the receiver perform loop detection.




 BFD Profile


 Select or create a BFD Profile to apply to the peer or select **None (Disable BFD)** for the peer. Default is **Inherit-vr-global-setting (Inherit Protocol’s Global BFD Profile)**.




 **Network**




 Always Advertise Network Route


 Select to always advertise the configured network routes to BGP peers, regardless of whether they are reachable or not. If this is unchecked, the firewall advertises the network routes only if they are resolved using the local route table. Default is enabled.




 IPv4 or IPv6


 Select **IPv4** or **IPv6** to specify the type of network prefix.




 Network


 **Add** a corresponding IPv4 or IPv6 network address; subnets with matching network addresses are advertised to BGP peers of the logical router.




 Unicast


 Select to install the matching routes into the Unicast routing table of all BGP peers.




 Multicast


 (`IPv4 only`) Select to install the matching routes into the Multicast routing table of all BGP peers.




 Backdoor


 (`IPv4 only`) Select for an eBGP connection that perhaps changes to an IGP connection (such as OSPF), to prevent BGP from advertising the prefix outside of the AS and instead to keep the route within the AS. Internally, the administrative distance for the prefix is increased so that the prefix isn’t preferred, but is still available in case it is needed in the event of a link failure elsewhere.




 **Redistribution**




 IPv4 Redistribution Profile


 Select or create a BGP Redistribution Profile (that specifies the IPv4 AFI) to redistribute any combination of static, connected, or OSPF routes to BGP. Default is **None**.




 IPv6 Redistribution Profile


 Select or create a BGP Redistribution Profile (that specifies the IPv6 AFI) to redistribute any combination of static, connected, or OSPFv3 routes to BGP. Default is **None**.




 **Aggregate Route**




 Name


 Add an aggregate route policy by Name.




 Description


 Enter a helpful description of the aggregate route policy.




 Enable


 Select to enable the aggregate route policy; enabled by default.




 Summary Only


 Select to advertise to neighbors only the **Summary Prefix** and not the routes that were summarized; this reduces traffic and avoids increasing the size of the neighbors’ routing tables unnecessarily (default is disabled). If you want to advertise both the aggregate route and the individual routes that make up the aggregate route, leave unchecked.
 Note:



| | **Summary Only** and **Suppress Map** are mutually exclusive; you cannot specify both. |
| --- | --- |


 Note:



| | If you want to use **Summary Only**, but you also want to advertise an individual route, then you create a BGP Filtering Profile that includes an **Unsuppress Map** route map that matches on the individual route. |
| --- | --- |






 AS Set


 Select to advertise the prefix with the list of AS numbers that make up the aggregate route. (Default is disabled.)




 Aggregate Same MED Only


 Select to aggregate only routes that have the same Multi-Exit Discriminator (MED) values; default is enabled.




 Type


 Select the type of aggregate route: **IPv4** or **IPv6**.




 Summary Prefix


 Calculate the routes you want to summarize and then enter the **Summary Prefix** that spans those routes, by specifying an IP address/netmask or address object.




 Suppress Map


 Select a route map or create a new one to prevent individual routes from being aggregated; default is **None**.
 Note:



| | Remember that the purpose of the Suppress route map is to prevent certain routes from being aggregated in an advertisement. Therefore, in the route map you **permit** the routes that you want to suppress from being aggregated (you don’t **deny** the routes that you want to suppress from being aggregated). |
| --- | --- |


 Note:



| | **Summary Only** and **Suppress Map** are mutually exclusive; you cannot specify both. |
| --- | --- |






 Attribute Map


 To set attribute information for the Summary Prefix, select a BGP route map or create a new one. Does not allow match criteria. Default is **None**, in which case the Summary Prefix will have default attributes.



 Parent topic
 [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)