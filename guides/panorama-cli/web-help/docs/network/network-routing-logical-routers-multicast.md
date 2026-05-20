# Network > Routing > Logical Routers > Multicast

*Network : Network &gt; Routing &gt; Logical Routers : Network &gt; Routing &gt; Logical Routers &gt; Multicast*

Network > Routing > Logical Routers > Multicast

The table describes the settings to configure IPv4 multicast for a logical router on an Advanced Routing Engine.



| IPv4 Multicast Settings | Description |
| --- | --- |
| enable multicast protocol | Select to enable multicast protocol for the logical router. |
| **Static** | |
| Name | **Add** an mroute by name (maximum of 31 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| Destination | Enter the destination (IPv4 address/mask), which is the multicast source to which you are doing an RPF check. |
| Interface | Select the egress interface for a unicast route to the multicast source. |
| Next Hop | Enter the IPv4 address of the next hop toward the source. |
| Preference | Enter a preference for the mroute; range is 1 to 255. |
| **PIM - General** | |
| Enable | Enable PIM. |
| RPF Lookup Mode | Select the Reverse-Path Forwarding (RPF) lookup mode, which determines where the logical router looks to find the outgoing interface to reach the source address contained in the multicast packet. If the outgoing interface stored in the RIB matches the interface on which the multicast packet arrived, the logical router accepts and forwards the packet; otherwise, it drops the packet. • |





| • | **mrib-only**—Look in the multicast RIB only. |
| --- | --- |





| • | **urib-only**—Look in the unicast RIB only. |
| --- | --- |






 Interface General Timer


 Select an Interface Timer Profile or create a new one.




 Route Age Out Time (sec)


 Specify the number of seconds that a multicast route remains in the mRIB after the session ends between a multicast group and a source; range is 210 to 7,200; default is 210.




 Multicast SSM Range


 To configure Source-Specific Multicast (SSM), select a prefix list that specifies the source addresses allowed to deliver multicast traffic to the receiver; default is **None (no prefix list)**.




 Group Address


 To configure the Shortest-Path Tree (SPT) threshold for a multicast group or prefix, **Add** a group address (multicast group or prefix for which you are specifying the distribution tree) by selecting a prefix list or creating a new one.




 Threshold


 Specify the SPT threshold for the group or prefix:



| • | **0 (switch on first data packet)**—(default) The logical router switches from shared tree to SPT for the group/prefix when the logical router receives the first data packet for the group/prefix. |
| --- | --- |





| • | Enter the total number of kilobits per second that can arrive for the multicast group/prefix at any interface and over any time period, upon which the logical router switches to SPT distribution for that multicast group/prefix; range is 0 to 4,294,967,295. |
| --- | --- |





| • | **never (do not switch to SPT)**—The PIM router continues to use the shared tree to forward packets to the multicast group/prefix. |
| --- | --- |






 **PIM - Group Permissions**




 Source Group List


 To grant permission for multicast packets from certain sources and/or multicast packets to certain destination multicast groups to transit the logical router, select an access list. Default is **None (no access list)**, meaning no specific source or multicast groups are subject to PIM group permissions.




 **PIM - Interfaces**




 Name


 Enter a name for the interface (maximum of 31 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Description


 Enter a description of the interface.




 DR Priority


 Specify the Designated Router priority of the interface to control which router forwards PIM Join message, PIM Register messages, and Prune messages to the Rendezvous Point (RP); range is 1 to 4,294,967,295; default is 1. Of the PIM devices on a LAN, if DR Priority is configured, the device with the highest priority value is elected the DR.




 Send BSM


 Select to allow propagation of Bootstrap Messages (enabled by default).




 Timer Profile


 The Timer Profile for the interface is inherited from the General PIM section unless you override that by selecting a Timer Profile for the interface; default is **None**.




 Neighbor Filter


 Use an access list to specify the prefixes of devices that are allowed to become or denied from becoming PIM neighbors of the logical router. Default is **None (no access list)**.




 **PIM - Rendezvous Point**




 RP Type


 Configure a Static RP and/or a Candidate RP; they are not mutually exclusive.



| • | **Static RP**—Establishes a static mapping of an RP to multicast groups. You must explicitly configure the same RP on other PIM routers in the PIM domain. |
| --- | --- |





| • | **Candidate RP** |
| --- | --- |





| • | **None** |
| --- | --- |






 Interface


 Select the RP interface where the RP receives and sends multicast packets. Valid interface types are Layer3 interfaces (which include Ethernet, loopback, VLAN, Aggregate Ethernet (AE), tunnel, and subinterfaces).




 Address


 Select an address/prefix length of the interface; IP addresses of the RP interface you selected populate the list.




 Override learned RP for the same group


 (`Static RP only`) Select to have this static RP serve as RP (instead of the RP elected for the groups in the Group List).




 Group List


 Select or create an access list to specify the multicast groups for which the static RP acts as the RP. Default is **None (no access list)**.




 Priority


 (`Candidate RP only`) Specify the priority of the candidate RP; range is 0 to 255; default is 192. A lower priority value indicates a higher priority.




 Advertisement Interval


 (`Candidate RP only`) Specify the frequency (in seconds) at which the candidate RP sends advertisements to other routers; range is 1 to 26,214; default is 60.




 IPv4 Address


 **Add** an interface by selecting the **IPv4 Address** of the interface.




 Group List


 To control the groups that the candidate RP accepts, select or create a group list, which is an IPv4 access list. Default is **None (no access list)**. If no access list is applied, the logical router starts advertising itself as the RP for all groups.




 Override


 Select if you want the remote RP you configured statically to serve as RP, instead of an RP that is dynamically learned (elected) for groups in the Group List. Default is disabled.




 **IGMP**




 enable IGMP


 Enable IGMP.




 **Dynamic**




 Interface


 **Add** an interface.




 Version


 Select IGMP version **2** or **3**.




 Robustness


 Select a robustness value; range is 1 to 7; default is 2. Increase the value if the subnet on which this firewall is located is prone to losing packets.
 Note:



| | The (Robustness * QueryInterval) + MaxQueryResponseTime determines how long a Join message is valid on the logical router. If the logical router receives a Leave Group message, Robustness * LastMemberQueryInterval is the length of time that the logical router waits before deleting the Leave Group entry. For Join messages, a Robustness value of 1 is ignored. For Leave Group messages, the logical router uses the Robustness value as the Last Member Query Count also. |
| --- | --- |






 Group Filter


 Select or create an access list to control which prefixes use dynamic IGMP. Default is **None (no access list)**.




 Max Groups


 Enter the maximum number of groups that IGMP can process simultaneously for the interface; range is 1 to 65,525; default is **unlimited**, which means the highest value in the range.




 Max Sources


 Enter the maximum number of sources that IGMP can process simultaneously for the interface; range is 1 to 65,525; default is **unlimited**, which means the highest value in the range.




 Query Profile


 Select an IGMP Interface Query Profile that you created or create a new one to apply to the interface.




 drop IGMP packets without Router Alert option


 Select to require that incoming IGMPv2 or IGMPv3 packets have the IP Router Alert Option, RFC 2113, or they will be dropped. Default is disabled.




 **Static**




 Name


 **Add** a static IGMP interface by name (maximum of 31 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Interface


 Select the interface to be a static IGMP interface.




 Group Address


 Enter the multicast group address of the static IGMP members.




 Source Address


 Enter the source address from which the static IGMP members receive multicasts.




 **MSDP - General**




 Enable


 Enable Multicast Source Discovery Protocol (MSDP) for the logical router.




 Global Timer


 Select a global MSDP Timer profile, or select the **default** profile, or create a new global MSDP Timer profile. If you select the **default** profile, Keep Alive Interval is set to 60, Message Timeout is set to 75, and Connection Retry Interval is set to 30. Default is **None**, which means the default values are applied.




 Global Authentication


 Select a Global Authentication profile or create a new one. Default is **None**.




 Originator ID—Interface


 Select the interface that the logical router uses as the RP interface in Source-Active (SA) messages. If you specify an IP address for the Originator ID, you must configure an Originator IP Interface. If no Interface is configured, the IP Address should be kept empty.




 Originator ID—IP


 Select or enter the IP address (with prefix length) that the logical router uses as the RP address in SA messages. If no Originator IP address is configured, the logical router uses the PIM RP address to encapsulate the SA message.




 **MSDP - Peers**




 Peer


 Add a peer name (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-) and can contain a combination of alphanumeric characters, underscore, or hyphen. No dot (.) or space is allowed.




 Source Interface


 Enter the Source interface used to establish the MSDP connection over TCP with its MSDP peer.




 Source Interface—IP


 Select the IP address of the source interface. Default is **None**.




 Peer Address Type


 Select the type of peer address:



| • | **IP**—(default) and select an address object or enter an IP address. |
| --- | --- |





| • | **FQDN**—Enter the Fully Qualified Domain Name of the peer. The dropdown list displays all FQDN names configured as address objects. |
| --- | --- |






 Remote AS


 Enter the BGP autonomous system number of the Remote AS where the MSDP peer is located.




 Authentication


 Do one of the following:



| • | Select an authentication profile to apply to this peer, which overrides the Global Authentication Profile you applied to MSDP on the General page. |
| --- | --- |





| • | **inherit (inherit from global authentication)**—the global authentication profile (default). |
| --- | --- |





| • | **None**—to disable authentication to this peer, which overrides the Global Authentication Profile. |
| --- | --- |






 Max SA


 Enter the maximum number of Source-Active (SA) entries the SA cache will accept from this MSDP peer. Range is 0 to 1,024; default is 0. After this maximum is reached, new SA messages from this peer are dropped.




 Peer Inbound SA Filter


 Select an access list or create a new access list to filter incoming SA messages (block unwanted groups) from this peer. Default is **None**. The access list can specify source addresses in an (S,G) pair to filter, or destination (group) addresses in an (S,G) pair to filter, or both.




 Peer Outbound SA Filter


 Select an access list or create a new access list to filter outgoing SA messages (block unwanted groups) being propagated to this peer. Default is **None**. The access list can specify source addresses in an (S,G) pair to filter, or destination (group) addresses in an (S,G) pair to filter, or both.



 Parent topic
 [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)