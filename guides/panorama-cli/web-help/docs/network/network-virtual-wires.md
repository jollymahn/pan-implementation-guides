# Network > Virtual Wires

*Network : Network &gt; Virtual Wires*

## Network > Virtual Wires


Select **Network** > **Virtual Wires** to define virtual wires after you have specified two virtual wire interfaces on the firewall ([Network > Interfaces](network-interfaces.html#ID0EUKKS)).



| Virtual Wire Settings | Description |
| --- | --- |
| Virtual Wire Name | Enter a virtual wire name (up to **31** characters). This name appears in the list of virtual wires when configuring interfaces. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Interfaces | Select two Ethernet interfaces from the displayed list for the virtual wire configuration. Interfaces are listed here only if they have the virtual wire interface type and have not been assigned to another virtual wire. For information on virtual wire interfaces, see [Virtual Wire Interface](virtual-wire-interface.html#ID0EHCOS). |
| Tag Allowed | Enter the tag number (0-4094) or range of tag numbers (tag1-tag2) for the traffic allowed on the virtual wire. A tag value of zero (default) indicates untagged traffic. Multiple tags or ranges must be separated by commas. Traffic that has an excluded tag value is dropped. Note:  |



 When utilizing virtual wire subinterfaces, the **Tag Allowed** list will cause all traffic with the listed tags to be classified to the parent virtual wire. Virtual wire subinterfaces must utilize tags that do not exist in the parent's **Tag Allowed** list.




 Multicast Firewalling


 Select if you want to be able to apply security rules to multicast traffic. If this setting is not enabled, multicast traffic is forwarded across the virtual wire.




 Link State Pass Through


 Select if you want to bring down the other interface in a virtual wire pair when a down link state is detected. If you do not select or you disable this option, link status is not propagated across the virtual wire.



 Parent topic
 [Network](network.html#ID0EFOJS)