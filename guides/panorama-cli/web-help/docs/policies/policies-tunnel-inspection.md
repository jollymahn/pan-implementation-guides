# Policies > Tunnel Inspection

*Policies : Policies &gt; Tunnel Inspection*

## Policies > Tunnel Inspection


You can configure the firewall to inspect the traffic content of the following cleartext tunnel protocols:




| • | Generic Routing Encapsulation (GRE) |
| --- | --- |






| • | General Packet Radio Service (GPRS) Tunneling Protocol for User Data (GTP-U); supported only on firewalls that support GTP. |
| --- | --- |






| • | Non-encrypted IPSec traffic (NULL Encryption Algorithm for IPSec and transport mode AH IPSec) |
| --- | --- |






| • | Virtual Extensible LAN ([VXLAN](https://tools.ietf.org/html/rfc7348)) |
| --- | --- |




You can use tunnel content inspection to enforce Security, DoS Protection, and QoS policies on traffic in these types of tunnels and on traffic nested within another cleartext tunnel (for example, Null Encrypted IPSec inside a GRE tunnel).


Create a Tunnel Inspection policy that, when matching an incoming packet, determines which tunnel protocols in the packet the firewall will inspect and that specifies the conditions under which the firewall drops or continues to process the packet. You can view tunnel inspection logs and tunnel activity in the ACC to verify that tunneled traffic complies with your corporate security and usage policies.


The firewall supports tunnel content inspection on Ethernet interfaces and subinterfaces, AE interfaces, VLAN interfaces, and VPN and LSVPN tunnels. The feature is supported in Layer 3, Layer 2, virtual wire, and tap deployments. Tunnel content inspection works on shared gateways and on virtual system-to-virtual system communications.



| What do you want to know? | See: |
| --- | --- |
| What are the fields available to create a Tunnel Inspection policy? | [Building Blocks in a Tunnel Inspection Policy](building-blocks-in-a-tunnel-inspection-policy.html#ID0ENUFQ) |
| How can I view tunnel inspection logs? | [Log Types and Severity Levels](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-logs/log-types-and-severity-levels) |
| **Looking for more?** | [Tunnel Content Inspection](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/tunnel-content-inspection.html) |


 Parent topic
 [Policies](policies.html#ID0EK5IO)