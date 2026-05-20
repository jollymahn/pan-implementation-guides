# IP Drop

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Packet Based Attack Protection : IP Drop*

IP Drop

To instruct the firewall what to do with certain IP packets it receives in the zone, specify the following settings.



| Zone Protection Profile Settings—Packet Based Attack Protection | Configured In | Description |
| --- | --- | --- |
| Spoofed IP address | **Network** > **Network Profiles** > **Zone Protection** > **Packet Based Attack Protection** > **IP Drop** | Check that the source IP address of the ingress packet is routable and the routing interface is in the same zone as the ingress interface. If either condition is not true, discard the packet. Note:  |



 Fastpath:
 On internal zones only, drop spoofed IP address packets to ensure that on ingress, the source address matches the firewall routing table.




 Strict IP Address Check


 Check that both conditions are true:



| • | The source IP address is not the subnet broadcast IP address of the ingress interface. |
| --- | --- |






| • | The source IP address is routable over the exact ingress interface. |
| --- | --- |



 If either condition is not true, discard the packet.
 Note:



| | The firewall does not consider Policy Based Forwarding (PBF) rules during this check; it considers only routes listed in the routing table (RIB), that is, routes listed under the CLI output for show routing route. |
| --- | --- |



 For a firewall in Common Criteria (CC) mode, you can enable logging for discarded packets. On the firewall web interface, select **Device** > **Log Settings**. In the Manage Logs section, select **Selective Audit** and enable **Packet Drop Logging**.




 Fragmented traffic


 Discard fragmented IP packets.




 IP Option Drop


 Select the settings in this group to enable the firewall to drop packets containing these IP Options.




 Strict Source Routing


 Discard packets with the Strict Source Routing IP option set. Strict Source Routing is an option whereby a source of a datagram provides routing information through which a gateway or host must send the datagram.
 Fastpath:
 Drop packets with strict source routing because source routing allows adversaries to bypass Security policy rules that use the destination IP address as the matching criteria.




 Loose Source Routing


 Discard packets with the Loose Source Routing IP option set. Loose Source Routing is an option whereby a source of a datagram provides routing information and a gateway or host is allowed to choose any route of a number of intermediate gateways to get the datagram to the next address in the route.
 Fastpath:
 Drop packets with loose source routing because source routing allows adversaries to bypass Security policy rules that use the destination IP address as the matching criteria.




 Timestamp


 Discard packets with the Timestamp IP option set.




 Record Route


 Discard packets with the Record Route IP option set. When a datagram has this option, each router that routes the datagram adds its own IP address to the header, thus providing the path to the recipient.




 Security


 Discard packets if the security option is defined.




 Stream ID


 Discard packets if the Stream ID option is defined.




 Unknown


 Discard packets if the class and number are unknown.
 Fastpath:
 Discard unknown packets.




 Malformed


 Discard packets if they have incorrect combinations of class, number, and length based on RFCs 791, 1108, 1393, and 2113.
 Fastpath:
 Discard malformed packets.



 Parent topic
 [Packet Based Attack Protection](packet-based-attack-protection.html#ID0EPNHW)