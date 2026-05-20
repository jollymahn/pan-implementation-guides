# Network > Routing > Routing Profiles > BGP

*Network : Network &gt; Routing &gt; Routing Profiles : Network &gt; Routing &gt; Routing Profiles &gt; BGP*

Network > Routing > Routing Profiles > BGP

For a logical router, use [BGP routing profiles](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/create-bgp-routing-profiles.html) to efficiently apply configuration to BGP peer groups, peers, or redistribution rules. For example, you can apply a Timer Profile, Authentication Profile, and BGP Filtering Profiles to a BGP peer group or a peer. You can apply an Address Family (AFI) profile for IPv4 and for IPv6 to a peer group or peer. You can apply a Redistribution profile for IPv4 and for IPv6 to BGP redistribution.



| BGP Routing Profiles | Description |
| --- | --- |
| **BGP Auth Profile** | |
| Name | Enter a name for the Authentication profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), hyphen (-), or dot (.) and contain zero or more alphanumeric characters, underscore (_) hyphen(-) and dot. A space is not allowed. |
| Secret | Enter the Secret and **Confirm Secret**. The Secret is used as a key in MD5 authentication. |
| **BGP Timer Profile** | |
| Name | Enter a name for the Timers profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), hyphen (-), or dot (.) and contain zero or more alphanumeric characters, underscore (_) hyphen(-) and dot. A space is not allowed. |
| Keep Alive Interval (sec) | Enter the interval, in seconds, after which routes from the peer are suppressed according to the Hold Time setting (range is 0 to 1,200; default is 30). |
| Hold Time (sec) | Enter the length of time, in seconds, that may elapse between successive Keepalive or Update messages from the peer before the peer connection is closed (range is 3 to 3,600; default is 90). |
| Reconnect Retry Interval | Enter the number of seconds to wait in Idle state before retrying to connect to the peer (range is 1 to 3,600; default is 15). |
| Open Delay Time (sec) | Enter the number of seconds of delay between opening the TCP connection to the peer and sending the first BGP Open message to establish a BGP connection (range is 0 to 240; default is 0). |
| Minimum Route Advertise Interval (sec) | Enter the minimum about of time, in seconds, that must occur between two successive Update messages (that a BGP speaker [the firewall] sends to a BGP peer) that advertise routes or withdrawal of routes (range is 1 to 600; default is 30). |
| **BGP Address Family Profile** | |
| Name | Enter a name for the Address Family Identifier (AFI) profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), hyphen (-), or dot (.) and contain zero or more alphanumeric characters, underscore (_) hyphen(-) and dot. A space is not allowed. |
| AFI | Select the type of AFI profile (**IPv4** or **IPv6**). |
| unicast / multicast | Select the Subsequent Address Family Identifier (SAFI) type. |
| Enable SAFI | Select for the profile to enable the unicast and/or multicast SAFI. At least one SAFI must be enabled for the BGP profile to be valid; you can enable both SAFIs. |
| Soft reconfiguration of peer with stored routes | Select to cause the firewall to perform a soft reset of itself after settings of any of its BGP peers are updated. (Default is enabled.) |
| Advertise all paths to peers | Advertise all paths to neighbors in order to preserve multipath capabilities inside a network. |
| Advertise the bestpath for each neighboring AS | Enable to ensure that BGP advertises the best path for each neighboring AS, and not a generic path for all autonomous systems. Disable this if you want to advertise the same path to all autonomous systems. |
| Override ASNs in outbound updates if AS-Path equals Remote-AS | You might use the BGP AS override feature if you have multiple sites belonging to the same AS (AS 64512, for example) and there is another AS between them. A router between the two sites receives an Update advertising a route that can access AS 64512. To avoid the second site dropping the Update because it is also in AS 64512, the intermediate router replaces AS 64512 with its own ASN, AS 64522, for example. |
| Route Reflector Client | Enable to make the BGP peers a BGP Route Reflector Client in an iBGP network. |
| Originate Default Route | Select to advertise all default routes. Disable if you want to advertise only routes to specific destination. |
| Default Originate Route-Map | Apply a route map to the Originate Default Route field, which allows you to specify the types of default routes you want to advertise. |
| Allow AS in | Specify whether to allow routes that include the firewall’s own autonomous system (AS) number: • |






| • | **Occurrence**—Number of times the firewall’s own AS can be in an AS_PATH. |
| --- | --- |






| • | **None**—(default setting) No action taken. |
| --- | --- |







 Number Prefixes


 Enter the maximum number of prefixes to accept from peer; range is 1 to 4,294,967,295; default is 1,000.




 Threshold (%)


 Enter the threshold percentage of the maximum number of prefixes. If the peer advertises more than the threshold, the firewall takes the specified Action (warning or restart). Range is 1 to 100.




 Action


 Specify the action the firewall takes on the BGP connection after the maximum number of prefixes is exceeded: **Warning Only** message in logs or **Restart** the BGP peer connection.




 Next Hop


 Select the next hop:



| • | **None**—Original next hop is preserved. |
| --- | --- |






| • | **Self**—Disable next-hop calculation and advertise routes with local next-hop. |
| --- | --- |






| • | **Self Force**—Force set the next hop to self for the reflected routes. |
| --- | --- |







 Remove Private AS


 To have BGP remove private AS numbers form the AS_PATH attribute in Updates that the firewall sends to a peer in another AS, select one of the following:



| • | **All**—Remove all private AS numbers. |
| --- | --- |






| • | **Replace AS**—Replace all private AS numbers with the firewall’s AS number. |
| --- | --- |






| • | **None**—(default setting) No action taken. |
| --- | --- |







 Send Community


 Select the type of BGP community attribute to send in outbound Update messages:



| • | **All**—Send all communities. |
| --- | --- |






| • | **Both**—Send standard and extended communities. |
| --- | --- |






| • | **Extended**—Send extended communities. |
| --- | --- |






| • | **Large**—Send large communities. |
| --- | --- |






| • | **Standard**—Send standard communities. |
| --- | --- |






| • | **None**—Do not send any communities. |
| --- | --- |







 ORF List


 Advertise the ability of the peer group or peer to send a prefix list and/or receive a prefix list to implement outbound route filtering (ORF) at the source, and thereby minimize sending or receiving unwanted prefixes in Updates. Select one of the following:



| • | **none**—(default setting) The peer group or peer (where this AFI profile is applied) has no ORF capability. |
| --- | --- |






| • | **both**—Advertise that the peer group or peer can **send** and prefix list and **receive** a prefix list to implement ORF. |
| --- | --- |






| • | **receive**—Advertise that the peer group or peer can receive a prefix list to implement ORF. The local peer receives the remote peer’s ORF capability and prefix list, which it implements as an outbound route filter. |
| --- | --- |






| • | **send**—Advertise that the peer group or peer can send a prefix list to implement ORF. The remote peer (with receive capability) receives the ORF capability and implements the prefix list it received as an outbound route filter when advertising routes to the sender. |
| --- | --- |



 Implement ORF by doing the following:



| 1. | Specify ORF capability in the Address Family profile. |
| --- | --- |






| 2. | For a peer group or peer that is a sender, create a prefix list containing the set of prefixes the peer group/peer wants to receive. |
| --- | --- |






| 3. | Create a BGP Filtering profile and in the Inbound Prefix List, select the prefix list you created. |
| --- | --- |






| 4. | For the BGP peer group, select the Address Family profile you created to apply it to the peer group. In the case of the sender, also select the Filtering Profile you created (which indicates the prefix list). If the peer group or peer is an ORF receiver only, it does not need the Filtering Profile; it needs only the Address Family profile to indicate ORF receive capability. |
| --- | --- |







 **BGP Dampening Profile**




 Name


 Enter a name for the Dampening profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), hyphen (-), or dot (.) and contain zero or more alphanumeric characters, underscore (_) hyphen(-) and dot. A space is not allowed.




 Description


 Enter a description for the Dampening profile.




 Suppress Limit


 Enter the suppress value (cumulative value of the penalties for flapping), at which point all the routes coming from a peer are dampened. Range is 1 to 20,000; default is 2,000.




 Reuse Limit


 Enter value that controls when a route can be reused based on the procedure described for Half Life; range is 1 to 20,000; default is 750.




 Half Life (min)


 Enter the number of minutes for the half-life time to control the stability metric (penalty) applied to a flapping route. Range is 1 to 45; default is 15. The stability metric starts at 1,000. After a penalized route stabilizes, the Half Life timer counts down until it expires, at which point the next stability metric applied to the router is only half of the previous value (500). Successive cuts continue until the stability metric is less than half of the Reuse Limit, and then the stability metric is removed from the router.




 Maximum Suppress Time (min)


 Enter the maximum number of minutes a route can be suppressed, regardless of how unstable it has been. Range is 1 to 255; default is 60.




 **BGP Redistribution Profile**




 Name


 Enter a name for the Redistribution profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), hyphen (-), or dot (.) and contain zero or more alphanumeric characters, underscore (_) hyphen(-) and dot. A space is not allowed.




 IPv4 or IPv6


 Select IPv4 or IPv6 Address Family Identifier (AFI) to specify which type of route is redistributed.




 **Static**


 Select **Static** and **Enable** to redistribute IPv4 or IPv6 static routes (that match the AFI you selected) to BGP.




 Metric


 Enter the metric to apply to the static routes being redistributed into BGP (range is 1 to 65,535).




 Route-Map


 Select a **Route Map** to specify the match criteria that determine which static routes to redistribute. Default is **None**. If the route map Set configuration includes a Metric Action along with a specified Metric Value, that value will be applied to the redistributed route. If no Metric Value is defined within the route map, the firewall will use default metric values. This means that routes redistributed via BGP will retain the same metric value that they had on the originating device. For example, if a static route is configured with a metric value of 10 and then redistributed into BGP, the metric value will remain 10.




 **Connected**


 Select **Connected** and **Enable** to redistribute IPv4 or IPv6 connected routes (that match the AFI you selected) to BGP.




 Metric


 Enter the metric to apply to the connected routes being redistributed into BGP (range is 1 to 65,535).




 Route-Map


 Select a **Route Map** to specify the match criteria that determine which connected routes to redistribute. Default is **None**. If the route map Set configuration includes a Metric Action along with a specified Metric Value, that value will be applied to the redistributed route. If no Metric Value is defined within the route map, the firewall will use default metric values. This means that routes redistributed via BGP will retain the same metric value that they had on the originating device.




 **OSPF**


 (`IPv4 only`) Select **OSPF** and **Enable** to redistribute OSPFv2 routes to BGP.




 Metric


 Enter the metric to apply to the OSPF routes being redistributed into BGP (range is 1 to 65,535).




 Route-Map


 Select a **Route Map** to specify the match criteria that determine which OSPF routes to redistribute. Default is **None**. If the route map Set configuration includes a Metric Action along with a specified Metric Value, that value will be applied to the redistributed route. If no Metric Value is defined within the route map, the firewall will use default metric values. This means that routes redistributed via BGP will retain the same metric value that they had on the originating device. For example, if an OSPF route is configured with a metric value of 2 and then redistributed into BGP, the metric value will remain 2.




 **RIP**


 (`IPv4 only`) Select **RIP** and **Enable** to redistribute RIP routes to BGP.




 Metric


 Enter the metric to apply to the RIP routes being redistributed into BGP (range is 1 to 65,535).




 Route-Map


 Select a **Route Map** to specify the match criteria that determine which RIP routes to redistribute. Default is **None**. If the route map Set configuration includes a Metric Action along with a specified Metric Value, that value will be applied to the redistributed route. If no Metric Value is defined within the route map, the firewall will use default metric values. This means that routes redistributed via BGP will retain the same metric value that they had on the originating device. For example, if a RIPv2 route is configured with a metric value of 10 and then redistributed into BGP, the metric value will remain 10.




 **OSPFv3**


 (`IPv6 only`) Select **OSPFv3** and **Enable** to redistribute OSPFv3 routes to BGP.




 Metric


 Enter the metric to apply to the OSPFv3 routes being redistributed into BGP (range is 1 to 65,535).




 Route-Map


 Select a **Route Map** to specify the match criteria that determine which OSPFv3 routes to redistribute. Default is **None**. If the route map Set configuration includes a Metric Action along with a specified Metric Value, that value will be applied to the redistributed route. If no Metric Value is defined within the route map, the firewall will use default metric values. This means that routes redistributed via BGP will retain the same metric value that they had on the originating device. For example, if an OSPFv3 route is configured with a metric value of 2 and then redistributed into BGP, the metric value will remain 2.




 **BGP Filtering Profile**




 Name


 Enter a name for the BGP Filtering profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), hyphen (-), or dot (.) and contain zero or more alphanumeric characters, underscore (_) hyphen(-) and dot. A space is not allowed.




 Description


 Enter a description for the BGP Filtering profile.




 AFI


 Select **IPv4** or **IPv6** Address Family Identifier to specify which type of route is filtered.




 **Unicast** Inbound Filter List


 Select an AS Path access list or create a new one to specify that, when receiving routes from peer, only routes with the same AS Path are imported from the peer group or peer, meaning added to the local BGP RIB.




 Inbound Distribute List


 Use an access list (Source Address only; not Destination Address) to filter BGP routing information that BGP receives. Mutually exclusive with Inbound Prefix List in a single Filtering Profile.




 Inbound Prefix List


 Use a prefix list to filter BGP routing information that BGP receives, based on a network prefix. Mutually exclusive with Inbound Distribute List in a single Filtering Profile.




 Inbound Route Map


 Use a route map to have even more control over which routes are allowed into the local BGP RIB (Match criteria) and to set attributes for the routes (Set options). For example, you can control route preference by prepending an AS to the AS Path of a route.




 Outbound Filter List


 Select an AS Path access list or create a new AS Path access list to specify that only routes with the same AS Path are advertised to a peer router (peer group or peer where this filter is applied).




 Outbound Distribute List


 Use an access list to filter BGP routing information that BGP advertises, based on the IP address of the destination. Mutually exclusive with Outbound Prefix List in a single Filtering Profile.




 Outbound Prefix List


 Use a prefix list to filter BGP routing information that BGP advertises, based on a network prefix. Mutually exclusive with Outbound Distribute List in a single Filtering Profile.




 Outbound Route Map


 Use a route map to have even more control over which routes BGP advertises (Match criteria) and to set attributes for advertised routes.




 Conditional Advertisement—Exist—Exist Map


 Select or create a route map to specify the match criteria for the conditional advertisement. If these routes exist in the local BGP RIB, the routes specified by the Advertise Map are advertised. Only the Match portion of the route map in this field takes effect; the Set portion is ignored.




 Conditional Advertisement—Exist—Advertise Map


 Select or create a route map to specify the routes to advertise in the event that the condition is met (routes from the Exist Map exist in the local BGP RIB). Only the Match portion of the route map in this field takes effect; the Set portion is ignored.




 Conditional Advertisement—Non-Exist—Non Exist Map


 Select or create a route map to specify the match criteria for the conditional advertisement. If these routes do not exist in the local BGP RIB, the routes specified by the Advertise Map are advertised. Only the Match portion of the route map in this field takes effect; the Set portion is ignored.




 Conditional Advertisement—Non-Exist—Advertise Map


 Select or create a route map to specify the routes to advertise in the event that the condition is met (routes from the Non-Exist Map do not exist in the local BGP RIB). Only the Match portion of the route map in this field takes effect; the Set portion is ignored.




 Unsuppress Map


 Select or create a route map of routes that you want to unsupress from route aggregation or route dampening and thus advertise them.




 **Multicast**—Inherit from Unicast


 (`IPv4 AFI only`) Select to inherit the Unicast settings for filtering Multicast routes. Otherwise, configure multicast filters as described in this table for the Unicast filters.



 Parent topic
 [Network > Routing > Routing Profiles](network-routing-routing-profiles.html#ID0ECYBV)