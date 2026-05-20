# Network > Routing > Logical Routers > General

*Network : Network &gt; Routing &gt; Logical Routers : Network &gt; Routing &gt; Logical Routers &gt; General*

Network > Routing > Logical Routers > General

When you enable Advanced Routing (**Device** > **Setup** > **Management**), the firewall uses a [logical router](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/logical-router-overview.html) for static and dynamic routing. A logical router requires that you assign a name and Layer 3 interfaces as described in the following table.


You can optionally configure Equal Cost Multiple Path (ECMP) for the logical router. ECMP processing is a networking feature that enables the firewall to use up to four equal-cost routes to the same destination. Without this feature, if there are multiple equal-cost routes to the same destination, the virtual router chooses one of those routes from the routing table and adds it to its forwarding table; it will not use any of the other routes unless there is an outage in the chosen route. Enabling ECMP functionality on a virtual router allows the firewall have up to four equal-cost paths to a destination in its forwarding table, allowing the firewall to:




| • | Load balance flows (sessions) to the same destination over multiple equal-cost links. |
| --- | --- |





| • | Make use of the available bandwidth on all links to the same destination rather than leave some links unused. |
| --- | --- |





| • | Dynamically shift traffic to another ECMP member to the same destination if a link fails, rather than waiting for the routing protocol or RIB table to elect an alternative path, which can help reduce down time when links fail. |
| --- | --- |


 Note:



| | ECMP load balancing is done at the session level, not at the packet level. This means the firewall chooses an equal-cost path at the start of a new session, not each time the firewall receives a packet. |
| --- | --- |




| Logical Router General Settings | Description |
| --- | --- |
| Name | Specify a name to describe the logical router (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, hyphens, and underscores. |
| **Interface** | |
| Interface | Add the Layer 3 interfaces that you want to include in the logical router. These interfaces can be used as outgoing interfaces in the logical router’s routing table. To specify the interface type, refer to [Network > Interfaces](network-interfaces.html#ID0EUKKS). When you add an interface to a logical router, its connected routes are added to the global RIB automatically. |
| **Administrative Distances** | |
| Static | Range is 1 to 255; default is 10. |
| Static IPv6 | Range is 1 to 255; default is 10. |
| OSPF Intra Area | Range is 1 to 255; default is 110. |
| OSPF Inter Area | Range is 1 to 255; default is 110. |
| OSPF External | Range is 1 to 255; default is 110. |
| OSPFv3 Intra Area | Range is 1 to 255; default is 110. |
| OSPFv3 Inter Area | Range is 1 to 255; default is 110. |
| OSPFv3 External | Range is 1 to 255; default is 110. |
| BGP AS Internal | Range is 1 to 255; default is 200. |
| BGP AS External | Range is 1 to 255; default is 20. |
| BGP Local Route | Range is 1 to 255; default is 20. |
| RIP | Range is 1 to 255; default is 120. |
| **ECMP** | |
| Enable | Enables Equal-Cost Multiple Path (ECMP) for the logical router. |
| Symmetric Return | (`Optional`) Select **Symmetric Return** to cause return packets to egress out the same interface on which the associated ingress packets arrived. That is, the firewall will use the ingress interface on which to send return packets, rather than use the ECMP interface, so the **Symmetric Return** setting overrides load balancing. This behavior occurs only for traffic flows from the server to the client. |
| Strict Source Path | By default, IKE and IPSec traffic originating at the firewall egresses an interface that the ECMP load-balancing method determines. Select **Strict Source Path** to ensure that IKE and IPSec traffic originating at the firewall always egresses the physical interface to which the source IP address of the IPSec tunnel belongs. You would enable Strict Source Path when the firewall has more than one ISP providing equal-cost paths to the same destination. The ISPs typically perform a Reverse Path Forwarding (RPF) check (or a different check to prevent IP address spoofing) to confirm that the traffic is egressing the same interface on which it arrived. Because ECMP by default would choose an egress interface based on the configured ECMP method (instead of choosing the source interface as the egress interface), that would not be what the ISP expects and the ISP could block legitimate return traffic. In this use case, enable Strict Source Path so that the firewall uses the egress interface that is the interface to which the source IP address of the IPSec tunnel belongs. |
| Max Path | Enter the maximum number of equal-cost paths: (2, 3, or 4) to a destination network that can be copied from the RIB to the FIB. Default is 2. |
| Load-Balancing Method | Choose one of the following [ECMP load-balancing algorithms](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/ecmp/ecmp-load-balancing-algorithms.html) to use on the virtual router. ECMP load balancing is done at the session level, not at the packet level. This means that the firewall (ECMP) chooses an equal-cost path at the start of a new session, not each time a packet is received. • |





| • | **IP Hash**—There are two IP hash methods that determine which ECMP route to use: |
| --- | --- |





| ◦ | If you select **IP Hash**, by default the firewall uses a hash of the source and destination IP addresses. |
| --- | --- |





| ◦ | Alternatively, you can select **Use Source Address Only** (available in PAN-OS 8.0.3 and later releases). This IP hash method ensures that all sessions belonging to the same source IP address always take the same path. |
| --- | --- |





| ◦ | Optionally select **Use Source/Destination Ports** to include the ports in either hash calculation. You can also enter a **Hash Seed** value (an integer) to further randomize load balancing. |
| --- | --- |





| • | **Weighted Round Robin**—This algorithm can be used to take into consideration different link capacities and speeds. Upon choosing this algorithm, the Interface window opens. Click **Add** and select an **Interface** to be included in the weighted round robin group. For each interface, enter the **Weight** to be used for that interface. **Weight** defaults to 100; range is 1-255. The higher the weight for a specific equal-cost path, the more often that equal-cost path will be selected for a new session. A higher speed link should be given a higher weight than a slower link, so that more of the ECMP traffic goes over the faster link. Click **Add** again to add another interface and weight. |
| --- | --- |





| • | **Balanced Round Robin**—Distributes incoming ECMP sessions equally across links. |
| --- | --- |






 **RIB Filter**




 IPv4 - BGP Route-Map


 Select a Redistribution route map or create a new one to control the IPv4 BGP routes being added to the global RIB. Default is **None**.




 IPv4 - OSPFv2 Route-Map


 Select a Redistribution route map or create a new one to control the IPv4 OSPFv2 routes being added to the global RIB. Default is **None**.




 IPv4 - Static Route-Map


 Select a Redistribution route map or create a new one to control the IPv4 static routes being added to the global RIB. Default is **None**.




 IPv4 - RIP Route-Map


 Select a Redistribution route map or create a new one to control the RIP routes being added to the global RIB. Default is **None**.




 IPv6 - BGP Route-Map


 Select a Redistribution route map or create a new one to control the IPv6 BGP routes being added to the global RIB. Default is **None**.




 IPv6 - OSPFv3 Route-Map


 Select a Redistribution route map or create a new one to control the IPv6 OSPFv3 routes being added to the global RIB. Default is **None**.




 IPv6 - Static Route-Map


 Select a Redistribution route map or create a new one to control the IPv6 static routes being added to the global RIB. Default is **None**.



 Parent topic
 [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)