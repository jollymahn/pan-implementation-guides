# Network > VLANs

*Network : Network &gt; VLANs*

## Network > VLANs


The firewall supports VLANs that conform to the IEEE 802.1Q standard. Each Layer 2 interface defined on the firewall can be associated with a VLAN. The same VLAN can be assigned to multiple Layer 2 interfaces but each interface can belong to only one VLAN.



| VLAN Settings | Description |
| --- | --- |
| Name | Enter a VLAN name (up to 31 characters). This name appears in the list of VLANs when configuring interfaces. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| VLAN Interface | Select a [Network > Interfaces > VLAN](network-interfaces-vlan.html#ID0E2OJT) to allow traffic to be routed outside the VLAN. |
| Interfaces | Specify firewall interfaces for the VLAN. |
| Static MAC Configuration | Specify the interface through which a MAC address is reachable. This will override any learned interface-to-MAC mappings. |


 Parent topic
 [Network](network.html#ID0EFOJS)