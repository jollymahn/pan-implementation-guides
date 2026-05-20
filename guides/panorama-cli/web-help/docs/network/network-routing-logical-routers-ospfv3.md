# Network > Routing > Logical Routers > OSPFv3

*Network : Network &gt; Routing &gt; Logical Routers : Network &gt; Routing &gt; Logical Routers &gt; OSPFv3*

Network > Routing > Logical Routers > OSPFv3

The table describes the settings to [configure OSPFv3](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/configure-ospfv3-on-an-advanced-routing-engine.html) areas for a logical router on an Advanced Routing Engine.



| OSPFv3 Settings | Description |
| --- | --- |
| Enable | Enable OSPFv3 for the logical router. |
| Router ID | Enter a router ID in the format of an IPv4 address. |
| BFD Profile | If you want to apply Bidirectional Forwarding Detection to OSPF, select a BFD profile or create a new one. Default is None (Disable BFD). |
| Global General Timer | Select a Global Timer profile or create a new one to apply to OSPFv3. |
| Global Interface Timer | Select an OSPFv3 Interface Timer or create a new one to apply to OSPFv3. |
| Redistribution Profile | Select an OSPFv3 Redistribution profile or create a new one to redistribute IPv6 static routes, connected routes, IPv6 BGP routes, or the IPv6 default route to the OSPFv3 link-state database. |
| **Area** | |
| Area ID | Add an area identified by its Area ID in IPv4 address format. This is the identifier that each neighbor must accept to be part of the same area. |
| **Type** | |
| Authentication | Select an Authentication profile or create a new one. |
| Type | Select the type of OSPFv3 area: • |





| • | **Stub**—There is no outlet from the area. To reach a destination outside of the area, traffic must go through an Area Border Router (ABR), which connects to other areas. |
| --- | --- |





| • | **NSSA** (Not-So-Stubby-Area)—Traffic can leave the area only by routes other than OSPFv3 routes. |
| --- | --- |






 no-summary


 (`Stub and NSSA only`) Select to prevent the area from receiving Type 3 Summary LSAs and thereby reduce traffic in the area.




 Default information originate


 (`NSSA only`) Select to cause OSPFv3 to originate a default route.




 Metric


 (`NSSA only`) Enter a metric for the default route; range is 1 to 16,777,214; default is 10.




 Metric-Type


 (`NSSA only`) Select **Type 1** or **Type 2**.




 ABR


 Select if the logical router is an Area Border Router (a router with interfaces in multiple areas, including area 0), which allows the next four fields to be configured.




 Import-list


 Select an access list or create a new one to filter Type-3 LSAs; applies to paths announced into the specified area as Type-3 summary LSAs.




 Export-list


 Select an access list or create a new one to filter Type-3 summary LSAs announced to other areas originated from intra-area paths from the specified area.




 Inbound Filter-List


 Select a prefix list or create a new one to filter Type-3 summary LSAs coming into the area.




 Outbound Filter-List


 Select a prefix list or create a new one to filter Type-3 summary LSAs from the area.




 IPv6 Prefix


 (`NSSA only`) If **ABR** is enabled, add an IPv6 prefix to summarize a group of external subnets into a single Type-7 LSA, which is then translated to a Type-5 LSA and advertised to the backbone when you select **Advertise**.




 **Range**




 IPv6 Address/Netmask


 Add an IPv6 Address/Netmask. A Type-3 Summary LSA with routing information matching this range is announced into the backbone area if the area contains at least one intra-area network (that is, described with router or network LSA) from this range).




 Advertise


 Select to advertise matching subnets in LSAs to the backbone area. If **Advertise** is set to No, any matching intra-area prefixes that are present in the area will not be advertised in the backbone area.




 **Interface**




 Interface


 Add an interface to be included in the area.




 Enable


 Enable the interface.




 MTU Ignore


 Select to ignore maximum transmission unit (MTU) mismatches when trying to establish an adjacency (default is disabled; MTU match checking occurs).




 Passive


 Select to prevent sending OSPF Hello packets out this interface and thus prevent the local router from creating an OSPF adjacency with a neighbor; however, the interface is still included in the link-state database. You can make an interface passive, for example, if it connects to a switch, because you don’t want to send Hello packets where there is no router.




 Instance ID


 Keep set to 0 because only one instance of OSPFv3 is allowed; default is 0.




 Link Type


 Select the link type:



| • | **Broadcast**—All neighbors that are accessible through the interface are discovered automatically by multicasting OSPFv3 Hello messages, such as an Ethernet interface. |
| --- | --- |





| • | **p2p** (point-to-point)—Automatically discover the neighbor. |
| --- | --- |





| • | **p2mp** (point-to-multipoint)—Neighbors must be defined manually: Add the **Neighbor** IPv6 address for all neighbors that are reachable through this interface and the **Priority** of each neighbor; range is 0 to 255; default is 1. |
| --- | --- |






 Priority


 Enter the priority for the interface; the priority for the router to be elected as a designated router (DR) or backup DR (BDR); range is 0 to 255; default is 1. If zero is configured, the router will not be elected as DR or BDR.




 Timer Profile


 Select a Timer Profile or create a new one to apply to the interface. This profile overrides the Global Interface Timer profile applied to OSPFv3.




 Authentication


 Select an Authentication Profile or create a new one to apply to the interface. This profile overrides the Authentication profile applied on the Type tab.




 BFD Profile


 Select a BFD Profile or **Inherit-vr-global-setting** (default) or create a new BFD profile or select **None (Disable BFD)**. This profile overrides the profile configured for OSPFv3.




 Cost


 Specify a cost for the interface; range is 1 to 65,535; default is 10.




 **Virtual Link**




 Name


 If the ABR does not have a physical link to the backbone area, configure a virtual link to a neighbor ABR (within the same area) that has a physical link to the backbone area. Enter a name for the virtual link.




 Enable


 Enable the virtual link.




 Area


 Select the transit area where the neighbor ABR that has the physical link to the backbone area is located.




 Router ID


 Enter the Route ID of the neighbor ABR on the remote end of the virtual link.




 Timer Profile


 Select a Timer Profile or create a new one to apply to the virtual link. This profile overrides the Global Interface Timer profile applied to OSPFv3 and the OSPFv3 Interface Timer profile applied to the interface.




 Authentication


 Select an Authentication Profile or create a new one to apply to the virtual link. This profile overrides the Authentication profile applied on the Type tab and the Authentication profile applied to the interface.




 **Advanced**




 Disable R-Bit and v6-Bit


 Select to clear the R-bit and V6-bit in router LSAs sent from this logical router to indicate that the firewall is not active. When in this state, the firewall participates in OSPFv3 but does not send transit traffic or IPv6 datagrams. In this state, local traffic will still be forwarded to the firewall. This is useful while performing maintenance with a dual-homed network because traffic can be re-routed around the firewall while it can still be reached. See RFC 5340.




 Graceful Restart—Enable Graceful Restart


 Enable Graceful Restart for the logical router; default is enabled.




 Enable Helper Mode


 Enable Graceful Restart Helper Mode for the logical router; default is enabled.




 Enable Strict LSA Checking


 Enable to cause the helper router to stop performing helper mode and to cause the graceful restart process to stop if a link-state advertisement indicates a network topology change; default is enabled.




 Grace Period (sec)


 Enter the number of seconds within which the logical router will perform a graceful restart if the firewall goes down or becomes unavailable. Range is 5 to 1,800; default is 120.




 Max Neighbor Restart Time (sec)


 Enter the number of seconds of Grace Period that the logical router accepts from a neighbor when the logical router is in Helper Mode. Range is 5 to 1,800; default is 140.



 Parent topic
 [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)