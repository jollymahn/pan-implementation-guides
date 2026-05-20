# Network > Network Profiles > Zone Protection

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection*

Network > Network Profiles > Zone Protection

A Zone Protection profile applied to a zone offers protection against most common floods, reconnaissance attacks, other packet-based attacks, the use of non-IP protocols, and headers with 802.1Q (Ethertype 0x8909) that have specific Security Group Tags (SGTs). A Zone Protection profile is designed to provide broad-based protection at the ingress zone (the zone where traffic enters the firewall) and is not designed to protect a specific end host or traffic going to a particular destination zone. You can attach one zone protection profile to a zone.

 Fastpath:
 Apply a Zone Protection profile to each zone to layer in extra protection against IP floods, reconnaissance, packet-based attacks, and non-IP protocol attacks. Zone Protection on the firewall should be a second layer of protection after a dedicated DDoS device at the internet perimeter.

To augment zone protection capabilities on the firewall, configure a DoS Protection policy ([Policies > DoS Protection](policies-dos-protection.html#ID0EYHMQ)) to match on a specific zone, interface, IP address, or user.

 Note:



| | Zone protection is enforced only when there is no session match for the packet because zone protection is based on new connections per second (cps), not on packets per second (pps). If the packet matches an existing session, it will bypass the zone protection setting. |
| --- | --- |





| What are you looking for? | See: |
| --- | --- |
| How do I create a Zone Protection profile? | [Building Blocks of Zone Protection Profiles](building-blocks-of-zone-protection-profiles.html#ID0EVWDW) [Flood Protection](flood-protection.html#ID0EDHEW) [Reconnaissance Protection](reconnaissance-protection.html#ID0ENTGW) [Packet Based Attack Protection](packet-based-attack-protection.html#ID0EPNHW) [Protocol Protection](protocol-protection.html#ID0ECZKW) [Ethernet SGT Protection](ethernet-sgt-protection.html#ID0E2LLW) [L3 & L4 Header Inspection](l3-l4-header-inspection.html#ID0E1VLW) |


 Parent topic
 [Network > Network Profiles](network-network-profiles.html#ID0E631V)