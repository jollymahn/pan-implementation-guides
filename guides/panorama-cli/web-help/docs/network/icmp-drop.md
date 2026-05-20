# ICMP Drop

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Packet Based Attack Protection : ICMP Drop*

ICMP Drop

To instruct the firewall to drop certain ICMP packets it receives in the zone, select the following settings to enable them.



| Zone Protection Profile Settings—Packet Based Attack Protection | Configured In | Description |
| --- | --- | --- |
| ICMP Ping ID 0 | **Network** > **Network Profiles** > **Zone Protection** > **Packet Based Attack Protection** > **ICMP Drop** | Discard packets if the ICMP ping packet has an identifier value of 0. |
| ICMP Fragment | Discard packets that consist of ICMP fragments. | |
| ICMP Large Packet (>1024) | Discard ICMP packets that are larger than 1024 bytes. | |
| Discard ICMP embedded with error message | Discard ICMP packets that are embedded with an error message. | |
| Suppress ICMP TTL Expired Error | Stop sending ICMP TTL expired messages. | |
| Suppress ICMP Frag Needed | Stop sending ICMP fragmentation needed messages in response to packets that exceed the interface MTU and have the do not fragment (DF) bit set. This setting will interfere with the PMTUD process performed by hosts behind the firewall. | |


 Parent topic
 [Packet Based Attack Protection](packet-based-attack-protection.html#ID0EPNHW)