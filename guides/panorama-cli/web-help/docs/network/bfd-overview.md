# BFD Overview

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; BFD Profile : BFD Overview*

BFD Overview

BFD is a protocol that recognizes a failure in the bidirectional path between two forwarding engines, such as interfaces, data links, or the actual forwarding engines. In the PAN-OS implementation, one of the forwarding engines is an interface on the firewall and the other is an adjacent configured BFD peer. The BFD failure detection between two engines is extremely fast, providing faster failover than could be achieved by link monitoring or frequent dynamic routing health checks, such as Hello packets or heartbeats.


After BFD detects a failure, it notifies the routing protocol to switch to an alternate path to the peer. If BFD is configured for a static route, the firewall removes the affected routes from the RIB and FIB tables.


BFD is supported on the following interface types: physical Ethernet, AE, VLAN, tunnel (Site-to-Site VPN and LSVPN), and subinterfaces of Layer 3 interfaces. For each static route or dynamic routing protocol, you can enable or disable BFD, select the default BFD profile, or configure a BFD profile.

 Parent topic
 [Network > Network Profiles > BFD Profile](network-network-profiles-bfd-profile.html#ID0ETMOW)