# IPv6 Drop

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Packet Based Attack Protection : IPv6 Drop*

IPv6 Drop

To instruct the firewall to drop certain IPv6 packets it receives in the zone, select the following settings to enable them.



| Zone Protection Profile Settings—Packet Based Attack Protection | Configured In | Description |
| --- | --- | --- |
| Type 0 Routing Heading | **Network** > **Network Profiles** > **Zone Protection** > **Packet Based Attack Protection** > **IPv6 Drop** | Discard IPv6 packets containing a Type 0 routing header. See [RFC 5095](https://www.ietf.org/rfc/rfc5095.txt) for Type 0 routing header information. |
| IPv4 compatible address | Discard IPv6 packets that are defined as an RFC 4291 IPv4-Compatible IPv6 address. | |
| Anycast source address | Discard IPv6 packets that contain an anycast source address. | |
| Needless fragment header | Discard IPv6 packets with the last fragment flag (M=0) and offset of zero. | |
| MTU in ICMP ‘Packet Too Big’ less than 1280 bytes | Discard IPv6 packets that contain a Packet Too Big ICMPv6 message when the maximum transmission unit (MTU) is less than 1,280 bytes. | |
| Hop-by-Hop extension | Discard IPv6 packets that contain the Hop-by-Hop Options extension header. | |
| Routing extension | Discard IPv6 packets that contain the Routing extension header, which directs packets to one or more intermediate nodes on its way to its destination. | |
| Destination extension | Discard IPv6 packets that contain the Destination Options extension, which contains options intended only for the destination of the packet. | |
| Invalid IPv6 options in extension header | Discard IPv6 packets that contain invalid IPv6 options in an extension header. | |
| Non-zero reserved field | Discard IPv6 packets that have a header with a reserved field not set to zero. | |


 Parent topic
 [Packet Based Attack Protection](packet-based-attack-protection.html#ID0EPNHW)