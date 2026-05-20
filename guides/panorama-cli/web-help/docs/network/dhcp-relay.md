# DHCP Relay

*Network : Network &gt; DHCP : DHCP Relay*

DHCP Relay



| • | Network > DHCP > DHCP Relay |
| --- | --- |




Before [configuring a firewall interface as a DHCP relay agent](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dhcp/configure-an-interface-as-a-dhcp-relay-agent.html), make sure you have configured a Layer 3 Ethernet or Layer 3 VLAN interface and that you assigned the interface to a virtual router and a zone. You want that interface to be able to pass DHCP messages between clients and servers. Each interface can forward messages to a maximum of eight external IPv4 DHCP servers and eight external IPv6 DHCP servers. A client sends a DHCPDISCOVER message to all configured servers, and the firewall relays the DHCPOFFER message of the first server that responds back to the requesting client.



| DHCP Relay Settings | Description |
| --- | --- |
| Interface | Name of the interface that will be the DHCP relay agent. |
| IPv4 / IPv6 | Select the type of DHCP server and IP address you will specify. |
| DHCP Server IP Address | Enter the IP address of the DHCP server to and from which you will relay DHCP messages. |
| Interface | If you selected IPv6 as the IP address protocol for the DHCP server and specified a multicast address, you must also specify an outgoing interface. |


 Parent topic
 [Network > DHCP](network-dhcp.html#ID0ERRRV)