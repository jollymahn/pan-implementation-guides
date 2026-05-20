# Multicast Tab

*Network : Network &gt; Virtual Routers : More Runtime Stats for a Virtual Router : Multicast Tab*

Multicast Tab

The following table describes the virtual router’s Runtime Stats for IP multicast.



| Multicast Runtime Stats | Description |
| --- | --- |
| **FIB Tab** | |
| Group | Route entry in the forwarding information base (FIB); multicast group address to which the virtual router will forward packets. |
| Source | Source address of multicast packets for the group. |
| Incoming Interfaces | Interfaces where multicast packets for the group arrive. |
| Outgoing Interfaces | Interfaces out which the virtual router forwards multicast packets for the group. |
| **IGMP Interface Tab** | |
| Interface | Interface that has IGMP enabled. |
| Version | Version 1, 2, or 3 of Internet Group Management Protocol (IGMP) running on the virtual router. |
| Querier | IP address of the IGMP querier on the multiaccess segment connected to the interface. |
| Querier Up Time | Number of seconds that the IGMP querier has been up. |
| Querier Expiry Time | Number of seconds remaining before the Other Querier Present timer expires. |
| Robustness | Robustness variable of the IGMP interface. |
| Groups Limit | Maximum number of groups per interface that IGMP can process simultaneously. |
| Sources Limit | Maximum number of sources per interface that IGMP can process simultaneously. |
| Immediate Leave | Yes or no indicates whether Immediate Leave is configured. Immediate leave indicates that the virtual router will remove an interface from the forwarding table entry without sending the interface IGMP group-specific queries. |
| **IGMP Membership Tab** | |
| Interface | Name of the interface that belongs to the group. |
| Group | Address of the multicast group to which the interface belongs. |
| Source | IP address of the source sending multicast packets to the group. |
| Up Time | Number of seconds this membership has been up. |
| Expiry Time | Number of seconds remaining before membership expires. |
| Filter Mode | Include or exclude the source. The virtual router is configured to include all traffic, or only traffic from this source (include), or traffic from any source except this one (exclude). |
| Exclude Expiry | Number of seconds remaining before the interface Exclude state expires. |
| V1 Host Timer | Time remaining until the local router assumes that there are no longer any IGMP Version 1 members on the IP subnet attached to the interface. |
| V2 Host Timer | Time remaining until the local router assumes that there are no longer any IGMP Version 2 members on the IP subnet attached to the interface. |
| **PIM Group Mapping Tab** | |
| Group | IP address of the group mapped to a Rendezvous Point. |
| RP | IP address of Rendezvous Point for the group. |
| Origin | Indicates where the virtual router learned of the RP. |
| PIM Mode | ASM or SSM. |
| Inactive | Indicates whether the mapping of the group to the RP is inactive. |
| **PIM Interface Tab** | |
| Interface | Name of interface participating in PIM. |
| Address | IP address of the interface. |
| DR | IP address of the Designated Router on the multiaccess segment connected to the interface. |
| Hello Interval | Hello interval configured (in seconds). |
| Join/Prune Interval | Interval configured for Join and Prune messages (in seconds). |
| Assert Interval | PIM Assert interval configured (in seconds) for the virtual router to send Assert messages. PIM uses the Assert mechanism to initiate the election of the PIM forwarder for the multiaccess network. |
| DR Priority | Priority configured for the Designated Router on the multiaccess segment connected to the interface. |
| BSR Border | Yes or no indicates whether the interface is on a virtual router that is a bootstrap router (BSR) located at the border of an enterprise LAN. |
| **PIM Neighbor Tab** | |
| Interface | Name of interface in the virtual router. |
| Address | IP address of the PIM neighbor reachable from the interface. |
| Secondary Address | Secondary IP address of the PIM neighbor reachable from the interface. |
| Up Time | Length of time the neighbor has been up. |
| Expiry Time | Length of time remaining before the neighbor expires because the virtual router is not receiving hello packets from the neighbor. |
| Generation ID | Randomly generated 32-bit value that is regenerated every time PIM forwarding is started or restarted on the interface (includes when the router itself restarts). |
| DR Priority | Designated Router priority that the virtual router received in the last PIM hello message from this neighbor. |


 Parent topic
 [More Runtime Stats for a Virtual Router](more-runtime-stats-for-a-virtual-router.html#ID0E4QNU)