# NAT Original Packet Tab

*Policies : Policies &gt; NAT : NAT Original Packet Tab*

NAT Original Packet Tab



| • | Policies > NAT > Original Packet |
| --- | --- |




Select the **Original Packet** tab to define the source and destination zones of packets that the firewall will translate and, optionally, specify the destination interface and type of service. You can configure multiple source and destination zones of the same type and you can apply the rule to specific networks or specific IP addresses.



| NAT Rule - Original Packet Settings | Description |
| --- | --- |
| Source Zone / Destination Zone | Select one or more source and destination zones for the original (non-NAT) packet (default is **Any**). Zones must be of the same type (Layer 2, Layer 3, or virtual wire). To define new zones, refer to [Network > Zones](network-zones.html#ID0EC6TT). You can specify multiple zones to simplify management. For example, you can configure settings so that multiple internal NAT addresses are directed to the same external IP address. |
| Destination Interface | Specify the destination interface of packets the firewall translates. You can use the destination interface to translate IP addresses differently in the case where the network is connected to two ISPs with different IP address pools. |
| Service | Specify the service for which the firewall translates the source or destination address. To define a new service group, select [Objects > Service Groups](objects-service-groups.html#ID0EBI3Q). |
| Source Address / Destination Address | Specify a combination of source and destination addresses for the firewall to translate. For NPTv6, the prefixes configured for **Source Address** and **Destination Address** must be in the format xxxx:xxxx::/yy. The address cannot have an interface identifier (host) portion defined. The range of supported prefix lengths is /32 to /112. You must select the Destination Address **Translation Type** (**Policy** > **NAT** > **Translated Packet**) as** Dynamic IP (with session distribution)**, when you configure the pre-NAT address as FQDN object in **Policy** > **NAT** > **Original Packet**. |


 Parent topic
 [Policies > NAT](policies-nat.html#ID0E1QXO)