# DHCP Client

*Network : Network &gt; DHCP : DHCP Client*

DHCP Client



| • | Network > Interfaces > Ethernet > IPv4 |
| --- | --- |






| • | Network > Interfaces > VLAN > IPv4 |
| --- | --- |




Before [configuring a firewall interface as a DHCP client](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dhcp/configure-an-interface-as-a-dhcpv4-client.html), make sure you have configured a Layer 3 Ethernet or Layer 3 VLAN interface and that you assigned the interface to a virtual router and a zone. Perform this task if you need to use DHCP to request an IPv4 address for an interface on your firewall.



| DHCP Client Settings | Description |
| --- | --- |
| Type | Select **DHCP Client** and then **Enable** to configure the interface as a DHCP client. |
| Automatically create default route pointing to default gateway provided by server | Causes the firewall to create a static route to a default gateway that will be useful when clients are trying to access many destinations that do not need to have routes maintained in a routing table on the firewall. |
| Default Route Metric | Optionally, enter a **Default Route Metric** (priority level) for the route between the firewall and the DHCP server. A route with a lower number has higher priority during route selection. For example, a route with a metric of 10 is used before a route with a metric of 100 (range is 1-65535; no default). |
| Show DHCP Client Runtime Info | Displays all settings received from the DHCP server, including DHCP lease status, dynamic IP assignment, subnet mask, gateway, and server settings (DNS, NTP, domain, WINS, NIS, POP3, and SMTP). |


 Parent topic
 [Network > DHCP](network-dhcp.html#ID0ERRRV)