# Network > Routing > Routing Profiles > Filters

*Network : Network &gt; Routing &gt; Routing Profiles : Network &gt; Routing &gt; Routing Profiles &gt; Filters*

Network > Routing > Routing Profiles > Filters

[Add filters](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/create-filters-for-the-advanced-routing-engine.html) to apply to profiles, for example, to easily and consistently apply settings that control such things as route acceptance into the RIB, route advertisements to peers, conditional advertisements, setting attributes, route aggregation, and route redistribution.



| Filters | Description |
| --- | --- |
| **Filters Access List** | |
| Name | Enter a name for the access list (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| Description | Enter a description. |
| Type | Select **IPv4** or **IPv6**. |
| Seq | **Add** an entry (rule) and enter the sequence number of the rule in the list of rules for this access list; range is 1 to 65,535. Fastpath:  Leave unused numbers between sequence numbers so you can insert additional rules later. |
| Action | Select **Deny** or **Permit** for the entry. The access list ends with an implicit Deny Any. |
| Source Address | (`IPv4 only`) Select one of the following: • |





| • | **Any** |
| --- | --- |





| • | **None** |
| --- | --- |






 Destination Address


 (`IPv4 only`) Select one of the following:



| • | **Address**—In the subsequent **Address** field, enter an IPv4 address and enter a **Wildcard** mask to indicate a range of addresses. A zero (0) in the mask indicates that bit must match the corresponding bit in the address; a one (1) in the mask indicates a “don’t care” bit. |
| --- | --- |





| • | **Any** |
| --- | --- |





| • | **None** |
| --- | --- |






 Source Address


 (`IPv6 only`) Select one of the following:



| • | **Address**—In the subsequent **Address** field, enter an IPv6 address. |
| --- | --- |





| • | **Any** |
| --- | --- |





| • | **None** |
| --- | --- |






 Exact Match of this address


 (`IPv6 only`) Select to match only the exact match of the IPv6 source address. Not available if the **Source Address** is **Any** or **None**.




 **Filters Prefix List**




 Name


 Enter a name for the prefix list (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Description


 Enter a description.




 Type


 Select **IPv4** or **IPv6**.




 Seq


 **Add** an entry (rule) and enter the sequence number of the rule in the list of rules for this prefix list; range is 1 to 65,535.
 Fastpath:
 Leave unused numbers between sequence numbers so you can insert additional rules later.




 Action


 Select **Deny** or **Permit** for the entry. The prefix list ends with an implicit Deny Any.




 Prefix


 Select one of the following:



| • | **Network any** |
| --- | --- |





| • | **Entry**—Enter an IPv4 or IPv6 **Network** with slash and prefix length. Optionally enter the prefix length that the prefix must be **Greater Than or Equal** to (range is 0 to 32 for IPv4; 0 to 128 for IPv6). Optionally enter the prefix length that the prefix must be **Less Than Or Equal** to (range is 0 to 32 for IPv4; 0 to 128 for IPv6). For example, enter a Network of 192.168.3.0/24 with a prefix length Greater Than Or Equal to 25 and a prefix length Less Than Or Equal to 26. |
| --- | --- |





| • | **None** |
| --- | --- |






 **Filters AS Path Access List**




 Name


 Enter a name for the AS_Path access list (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Description


 Enter a description.




 Seq


 **Add** an entry (rule) and enter the sequence number of the rule in the list of rules for this access list; range is 1 to 65,535.
 Fastpath:
 Leave unused numbers between sequence numbers so you can insert additional rules later.




 Action


 Select **Deny** or **Permit** for the entry.
 Note:



| | AS Path access lists end with an implicit **Permit Any** rule. Use an AS Path access list to deny autonomous systems. |
| --- | --- |






 Aspath regex


 Enter a regular expression for AS_PATH.




 **Filters Community List**




 Name


 Enter a name for the community list (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Description


 Enter a description of the community list.




 Type


 Select **Regular**, **Large**, or **Extended** community.




 Seq


 **Add** an entry (rule) and enter the sequence number of the rule in the list of rules for this list; range is 1 to 65,535.
 Fastpath:
 Leave unused numbers between sequence numbers so you can insert additional rules later.




 Action


 Select **Deny** or **Permit**. The list ends with an implicit Deny Any rule.




 Community


 Select one of the well-known communities from the list or enter a community.




 **Filters Route Maps BGP**




 Name


 Enter a name for the BGP route map (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Description


 Enter a description of the route map.




 **Entry Tab**




 Seq


 **Add** an entry (rule) and enter the sequence number of the rule in the list of rules for this route map; range is 1 to 65,535.
 Fastpath:
 Leave unused numbers between sequence numbers so you can insert additional rules later.




 Description


 Enter a description of the route map entry.




 Action


 Select **Deny** or **Permit**.




 **Match Tab**




 AS Path Access List


 Select an AS Path access list.




 Regular Community


 Select a community list for match criteria.




 Large Community


 Select a community list for match criteria.




 Extended Community


 Select a community list for match criteria.




 Metric


 Enter a metric; range is 0 to 4,294,967,295.




 Interface


 Select an interface.




 Origin


 Select **egp**, **igp**, **incomplete**, or **none**.




 Tag


 Enter a tag; range is 1 to 4,294,967,295.




 Local Preference


 Enter a local preference; range is 0 to 4,294,967,295.




 Peer


 Select **local (Static or Redistributed Routes)** or **none**.




 IPv4 or IPv6


 Select **IPv4** or **IPv6** as the address family on which to match.




 Address—Access List


 Select an access list you created that specifies the addresses to match. Default is **None**.




 Address—Prefix List


 Select a prefix list you created that specifies the prefixes to match. It matches the prefix received from a peer or redistributed from another protocol. Default is **None**.




 Next Hop—Access List


 Select an access list you created that specifies the next hop to match. Default is **None**.




 Next Hop—Prefix List


 Select a prefix list you created that specifies the next hop to match. Default is **None**.




 Route Source—Access List


 (`IPv4 only`) Select an access list you crated that specifies the route source to match. Default is **None**.




 Route Source—Prefix List


 (`IPv4 only`) Select a prefix list you crated that specifies the route source to match. Default is **None**.




 **Set Tab**




 Enable BGP atomic aggregate


 Mark the route as a less specific route because it has been aggregated. ATOMIC_AGGREGATE is a well-known discretionary attribute that alerts BGP speakers along a path that information has been lost due to route aggregation, and therefore the aggregate path might not be the best path to the destination. When some router are aggregated by an aggregator, the aggregator attaches its Router-ID to the aggregated route into the AGGREGATOR-ID attribute and it sets the ATOMIC_AGGREGATE attribute or not, based on whether the AS_PATH information from the aggregated routers was preserved.




 Aggregator—Aggregate AS


 Enter the Aggregator AS. The Aggregator attribute includes the AS number and the IP address of the router that originated the aggregated route.The IP address is the Router ID of the router that performs the route aggregation. Range is 1 to 4,294,967,295.




 Aggregator—Router ID


 Enter the aggregator’s Router ID (usually a loopback address).




 IPv4 or IPv6


 Select the type of address to set.




 IPv6 Nexthop Prefer Global Address


 (`IPv6 only`) IPv6 has four address types: link local address, global unicast address, anycast address, and multicast address. **IPv6 Nexthop Prefer Global Address** causes the firewall to prefer global unicast addresses.




 Source Address


 Select the source address with /prefix length to set.




 IPv4 Next-Hop


 (`IPv4 only`) Select **none**, **peer-address (Use Peer Address)**, or **unchanged**.




 IPv6 Next-Hop


 (`IPv6 only`) Select **none** or **peer-address (Use Peer Address)**.




 Local Preference


 Enter local preference; range is 0 to 4,294,967,295.




 Tag


 Enter tag; range is 1 to 4,294,967,295.




 Metric Action


 Select **None**, **set**, **add**, or **subtract**.




 Metric Value


 Enter metric; range is 0 to 4,294,967,295.




 Weight


 Enter weight; range is 0 to 4,294,967,295.




 Origin


 Select **egp**, **igp**, **incomplete**, or **none**.




 Originator ID


 Set an Originator ID.




 Delete Regular Community


 Enter a Regular Community to delete.




 Delete Large Community


 Enter a Large Community to delete.




 Regular Community—Overwrite Regular Community


 Select to overwrite the Regular Community with what is added in Regular Community field.




 Regular Community


 Add a Regular Community.




 Large Community—Overwrite Regular Community


 Select to overwrite the Large Community with what is added in Large Community field.




 Large Community


 Add a Large Community.




 ASPath Exclude


 Add an AS_PATH to exclude.




 ASPath Prepend


 Add an AS_PATH to prepend.




 **Filters Route Maps Redistribution**




 Name


 Enter a name for the Redistribution route map (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Description


 Enter a description of the route map.




 Source Protocol


 Select the source protocol being redistributed.




 Destination Protocol


 Select the protocol to which routes are being redistributed.




 **Entry**




 Seq


 Enter a sequence number; range is 1 to 65,535.
 Fastpath:
 Leave unused numbers between sequence numbers so you can insert additional rules later.




 Description


 Enter a description of the route map rule.




 Action


 **Deny** or **Permit** the matching routes from being redistributed.




 **Match**




 AS Path Access List


 Select an AS Path access list.




 Regular Community


 Enter a regular community.




 Large Community


 Enter a large community.




 Extended Community


 Enter an extended community




 Metric


 Range is 0 to 4,294,967,295.




 Interface


 Select an interface.




 Origin


 Select **egp**, **igp**, **incomplete**, or **none**.




 Tag


 Enter a tag; range is 1 to 4,294,967,295.




 Local Preference


 Enter a local preference; range is 0 to 4,294,967,295.




 Peer


 Select local **(Static or Redistributed Routes)** or **none**.




 Address—Access List


 Select an access list.




 Address—Prefix List


 Select a prefix list.




 Next Hop—Access List


 Select an access list.




 Next Hop—Prefix List


 Select a prefix list.




 Route Source—Access List


 Select an access list.




 Route Source—Prefix List


 Select a prefix list.




 **Set**




 Metric Action


 Select **None**, **set**, **add**, or **subtract**.




 Metric Value


 Enter the value to **set** the metric to, **add** to the metric, or **subtract** from the metric of matching routes, based on your selection for **Metric Action**. Range is 0 to 4,294,967,295.




 Metric Type


 Select **Type 1** or **Type 2**.




 Tag


 Range is 1 to 4,294,967,295.



 Parent topic
 [Network > Routing > Routing Profiles](network-routing-routing-profiles.html#ID0ECYBV)