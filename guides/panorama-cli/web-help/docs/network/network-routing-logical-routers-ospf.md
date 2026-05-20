# Network > Routing > Logical Routers > OSPF

*Network : Network &gt; Routing &gt; Logical Routers : Network &gt; Routing &gt; Logical Routers &gt; OSPF*

Network > Routing > Logical Routers > OSPF

The table describes the settings to [configure OSPFv2](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/configure-ospfv2-on-an-advanced-routing-engine.html) areas for a logical router on an Advanced Routing Engine.



| OSPF Settings | Description |
| --- | --- |
| Enable | Enable OSPF for the logical router. |
| Router ID | Enter a router ID in the format of an IPv4 address. |
| BFD Profile | If you want to apply Bidirectional Forwarding Detection to OSPF, select a BFD profile or create a new one. Default is **None (Disable BFD)**. |
| Global General Timer | Select a Global Timer profile or create a new one to apply to OSPF. |
| Global Interface Timer | Select an OSPF Interface Timer or create a new one to apply to OSPF. |
| Redistribution Profile | Select an OSPF Redistribution profile or create a new one to redistribute IPv4 static routes, connected routes, IPv4 BGP routes, or the IPv4 default route to the OSPF link-state database. |
| **Area** | |
| Area ID | Add an area identified by its Area ID in x.x.x.x format. This is the identifier that each neighbor must accept to be part of the same area. |
| **Type** | |
| Authentication | Select an Authentication profile or create a new one. |
| Type | Select the type of OSPF area: • |





| • | **Stub**—There is no outlet from the area. To reach a destination outside of the area, traffic must go through an Area Border Router (ABR), which connects to other areas. |
| --- | --- |





| • | **NSSA** (Not-So-Stubby-Area)—Traffic can leave the area only by routes other than OSPF routes. |
| --- | --- |






 no-summary


 (`Stub and NSSA areas only`) Select to prevent the area from receiving Type 3 Summary LSAs and thereby reduce traffic in the area.




 Default information originate


 (`NSSA areas only`) Select to cause OSPF to originate a default route.




 Metric


 (`NSSA areas only`) Enter a metric for the default route; range is 1 to 16,777,214; default is 10.




 Metric-type


 (`NSSA areas only`) **Type 1** or **Type 2**




 ABR


 Select if the logical router is an Area Border Router, which allows the next four fields to be configured.




 Import-list


 Select an access list or create a new one to filter network routes coming into the area based on IPv4 source address.




 Export-list


 Select an access list or create a new one to filter network routes that originated in the area, to allow or prevent the routes from being advertised to other areas.




 Inbound Filter-List


 Select a prefix list or create a new one to filter network prefixes coming into the area.




 Outbound Filter-List


 Select a prefix list or create a new one to filter network prefixes that originated in the area, to prevent the routes from being advertised to other areas.




 IPv4 Prefix


 (`NSSA areas only`) If **ABR** is selected and area type is **NSSA**, **Add** an IPv4 prefix to summarize a group of external subnets into a single Type-7 LSA, which is then translated to a Type-5 LSA and advertised to the backbone when you select **Advertise**.




 **Range**




 IP Address/Netmask


 Add an IP Address/Netmask. A Type-3 Summary LSA (link-state advertisement) with routing information matching this range is announced into the backbone area if the area contains at least one intra-area network (that is, described with router or network LSA) from this range).




 Substitute


 Enter a substitute IPaddress/netmask so that a Type-3 Summary LSA with this IP address/netmask is announced into the backbone if the area contains at least one intra-area network from the IP Address/netmask specified.




 Advertise


 Select to send LSAs that match the subnet.




 **Interface**




 Interface


 Add each interface to be included in the area.




 Enable


 Enable the interface.




 MTU Ignore


 Select to ignore maximum transmission unit (MTU) mismatches when trying to establish an adjacency (default is disabled; MTU match checking occurs). RFC 2328 defines the interface MTU as “The size in bytes of the largest IP datagram that can be sent out the associated interface, without fragmentation.”




 Passive


 Select to prevent the interface from sending or receiving OSPF packets; however, the interface is still included in the link-state database. You can make an interface passive, for example, if it connects to a switch, because you don’t want to send Hello packets where there is no router.




 Link Type


 Select the link type:



| • | **Broadcast**—All neighbors that are accessible through the interface are discovered automatically by multicasting OSPF Hello messages, such as an Ethernet interface. |
| --- | --- |





| • | **p2p** (point-to-point)—Automatically discover the neighbor. |
| --- | --- |





| • | **p2mp** (point-to-multipoint)—Neighbors must be defined manually: Add the **Neighbor** IP address for all neighbors that are reachable through this interface and the **Priority** of each neighbor; range is 0 to 255; default is 1. |
| --- | --- |






 Priority


 Enter the priority for the interface; the priority for the router to be elected as a designated router (DR) or backup DR (BDR); range is 0 to 255; default is 1. If zero is configured, the router will not be elected as DR or BDR.




 Timer Profile


 Select a Timer Profile or create a new one to apply to the interface. This profile overrides the Global Interface Timer profile applied to OSPF.




 Authentication


 Select an Authentication Profile or create a new one to apply to the interface. This profile overrides the Authentication profile applied on the Type tab.




 BFD Profile


 Select a BFD Profile or **Inherit-vr-global-setting** (default) or create a new BFD profile or select **None (Disable BFD)**. This profile overrides the profile configured for OSPF.




 Cost


 Specify a cost for the interface; range is 1 to 65,535; default is 10.




 **Virtual Link**




 Name


 Enter a name for the virtual link.




 Enable


 Enable the virtual link.




 Area





 Router ID





 Timer Profile


 Select a Timer Profile or create a new one to apply to the virtual link. This profile overrides the Global Interface Timer profile applied to OSPF.




 Authentication


 Select an Authentication Profile or create a new one to apply to the virtual link. This profile overrides the Authentication profile applied on the Type tab.




 **Advanced**




 rfc-1583 compatibility


 Select to enforce compatibility with RFC 1583, which allows one best route to an autonomous system boundary router (ASBR) in the OSPF routing table. Default is disabled, which means the OSPF routing table can maintain multiple intra-AS paths in the routing table, thereby preventing routing loops.




 Graceful Restart—Enable Graceful Restart


 Enable Graceful Restart for the logical router; default is enabled.




 Enable Helper Mode


 Enable Graceful Restart Helper Mode for the logical router; default is enabled.




 Enable Strict LSA Checking


 Enable Strict LSA Checking to cause the helper router to stop performing helper mode and causes the graceful restart process to stop if a link-state advertisement indicates a network topology change; default is enabled.




 Grace Period (sec)


 Specify the number of seconds within which the logical router will perform a graceful restart if the firewall goes down or becomes unavailable. Range is 5 to 1,800; default is 120.




 Max Neighbor Restart Time (sec)


 Range is 5 to 1,800; default is 140.



 Parent topic
 [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)