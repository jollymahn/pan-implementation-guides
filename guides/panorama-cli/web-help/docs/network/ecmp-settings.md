# ECMP Settings

*Network : Network &gt; Virtual Routers : ECMP : ECMP Settings*

ECMP Settings



| • | Network > Virtual Routers > Router Settings > ECMP |
| --- | --- |




Use the following fields to configure equal-cost multi-path (ECMP) settings.



| ECMP Settings | Description |
| --- | --- |
| Enable | **Enable** ECMP. Note:  |







 Symmetric Return


 (`Optional`) Select **Symmetric Return** to cause return packets to egress out the same interface on which the associated ingress packets arrived. This configures the firewall to use the ingress interface when sending return packets instead of the ECMP interface, which means that the **Symmetric Return** setting overrides load balancing. This behavior occurs only for traffic flows from the server to the client.




 Strict Source Path


 By default, IKE and IPSec traffic originating at the firewall egresses an interface that the ECMP load-balancing method determines. Select **Strict Source Path** to ensure that IKE and IPSec traffic originating at the firewall always egresses the physical interface to which the source IP address of the IPSec tunnel belongs. Enable Strict Source Path when the firewall has more than one ISP providing equal-cost paths to the same destination. The ISPs typically perform a Reverse Path Forwarding (RPF) check (or a different check to prevent IP address spoofing) to confirm that the traffic is egressing the same interface on which it arrived. Because ECMP by default chooses an egress interface based on the configured ECMP method (instead of choosing the source interface as the egress interface), that will not be what the ISP expects and the ISP can block legitimate return traffic. In this use case, enable **Strict Source Path** so that the firewall uses the egress interface that is the interface to which the source IP address of the IPSec tunnel belongs.




 Max Path


 Select the maximum number of equal-cost paths: (2, 3, or 4) to a destination network that can be copied from the RIB to the FIB (default is 2).




 Method


 Choose one of the following [ECMP load-balancing algorithms](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/ecmp/ecmp-load-balancing-algorithms.html) to use on the virtual router. ECMP load balancing is done at the session level, not at the packet level. This means that the firewall (ECMP) chooses an equal-cost path at the start of a new session, not each time a packet is received.



| • | **IP Modulo** (default)—The virtual router load balances sessions using a hash of the source and destination IP addresses in the packet header to determine which ECMP route to use. |
| --- | --- |






| • | **IP Hash**—There are two IP hash methods that determine which ECMP route to use: |
| --- | --- |






| ◦ | If you select **IP Hash**, by default the firewall uses a hash of the source and destination IP addresses. |
| --- | --- |






| ◦ | If you **Use Source Address Only** (available in PAN-OS 8.0.3 and later releases), the firewall ensure that all sessions belonging to the same source IP address always take the same path. |
| --- | --- |






| ◦ | If you also **Use Source/Destination Ports**, the firewall includes the ports in either hash calculation. You can also enter a **Hash Seed** value (an integer) to further randomize load balancing. |
| --- | --- |






| • | **Weighted Round Robin**—You can use this algorithm to take in to consideration different link capacities and speeds. When choosing this algorithm, the Interface dialog opens. **Add** and select an **Interface** to include in the weighted round robin group. For each interface, enter the **Weight** for that interface (range is 1 to 255; default is 100). The higher the weight for a specific equal-cost path, the more often that the equal-cost path is selected for a new session. A higher speed link should be given a higher weight than a slower link so that more of the ECMP traffic goes over the faster link. You can then **Add** another interface and weight. |
| --- | --- |






| • | **Balanced Round Robin**—Distributes incoming ECMP sessions equally across links. |
| --- | --- |






 Parent topic
 [ECMP](ecmp.html#ID0EZOMU)