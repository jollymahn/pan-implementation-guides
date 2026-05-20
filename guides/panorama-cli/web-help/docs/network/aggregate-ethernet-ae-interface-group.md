# Aggregate Ethernet (AE) Interface Group

*Network : Network &gt; Interfaces : Aggregate Ethernet (AE) Interface Group*

Aggregate Ethernet (AE) Interface Group



| • | Network > Interfaces > Ethernet > Add Aggregate Group |
| --- | --- |




An Aggregate Ethernet (AE) interface group uses IEEE 802.1AX link aggregation to combine multiple Ethernet interfaces in to a single virtual interface that connects the firewall to another network device or another firewall. An AE interface group increases the bandwidth between peers by load balancing traffic across the combined interfaces. It also provides redundancy; when one interface fails, the remaining interfaces continue to support traffic. SD-WAN supports AE interface groups of Layer 3 interfaces.


Before configuring an AE interface group, you must configure its interfaces. Among the interfaces assigned to any particular aggregate group, the hardware media can differ (for example, you can mix fiber optic and copper), but the bandwidth (1Gbps, 10Gbps, 40Gbps, or 100Gbps) and interface type (HA3, virtual wire, Layer 2, or Layer 3) must be the same.


The number of AE interface groups you can add depends on the firewall model. The [Product Selection tool](https://www.paloaltonetworks.com/products/product-selection) indicates the Maximum aggregate interfaces that each firewall model supports. Each AE interface group can have up to eight interfaces.


On PA-3200 Series, PA-5200 Series, and PA-7000 Series firewalls, QoS is supported on only the first eight AE interface groups.

 Note:



| | All Palo Alto Networks firewalls except the VM-Series models support AE interface groups. |
| --- | --- |



 You can aggregate the HA3 (packet forwarding) interfaces in a high availability (HA) active/active configuration but only on the following firewall models:



| • | PA-220 |
| --- | --- |






| • | PA-800 Series |
| --- | --- |






| • | PA-3200 Series |
| --- | --- |






| • | PA-5200 Series |
| --- | --- |




To configure an AE interface group, **Add Aggregate Group**, configure the settings described in the following table, and then assign interfaces to the group (see [Aggregate Ethernet (AE) Interface](aggregate-ethernet-ae-interface.html#ID0E1ZFT)).



| Aggregate Interface Group Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **Aggregate Ethernet Interface** | The read-only **Interface Name** is set to **ae**. In the adjacent field, enter a numeric suffix to identify the AE interface group. The range of the numeric suffix depends on how many AE groups the firewall model supports. See the Maximum aggregate interfaces supported per firewall model in the [Product Selection tool](https://www.paloaltonetworks.com/products/product-selection). |
| Comment | (`Optional`) Enter a description for the interface. | |
| Interface Type | Select the interface type, which controls the remaining configuration requirements and options: • | **HA**—Select only if the interface is an HA3 link between two firewalls in an active/active deployment. Optionally, select a **NetFlow Profile** and configure the settings on the **LACP** tab (see [Enable LACP](aggregate-ethernet-ae-interface-group.html#ID0EVEET)). |






| • | **Virtual Wire**—(`Optional`) Select a **NetFlow Profile** and configure the settings on the **Config** and **Advanced** tabs as described in [Virtual Wire Settings](network-virtual-wires.html#ID0E2VVT). |
| --- | --- |






| • | **Layer 2**—(`Optional`) Select a **NetFlow Profile**; configure the settings on the **Config** and **Advanced** tabs as described in [Layer 2 Interface Settings](pa-7000-series-layer-2-interface.html#ID0EWOPS); and, optionally, configure the **LACP** tab (see [Enable LACP](aggregate-ethernet-ae-interface-group.html#ID0EVEET)). |
| --- | --- |






| • | **Layer 3**—(`Optional`) Select a **NetFlow Profile**; configure the settings on the **Config** tab, the **IPv4** or **IPv6** tab, and the **Advanced** tab as described in [Layer 3 Interface Settings](pa-7000-series-layer-3-interface.html#ID0EDTQS); and, optionally, configure the **LACP** tab (see [Enable LACP](aggregate-ethernet-ae-interface-group.html#ID0EVEET)). SD-WAN supports AE interface groups of Layer 3 interfaces and subinterfaces. |
| --- | --- |







 Netflow Profile


 If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the server profile or **NetFlow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the AE interface group.




 Enable LACP


 **Aggregate Ethernet Interface** > **LACP**


 Select if you want to enable Link Aggregation Control Protocol (LACP) for the AE interface group. LACP is disabled by default.
 If you enable LACP, interface failure detection is automatic at the physical and data link layers regardless of whether the firewall and its LACP peer are directly connected. (Without LACP, interface failure detection is automatic only at the physical layer between directly connected peers.) LACP also enables automatic failover to standby interfaces if you configure hot spares (see [Max Ports](aggregate-ethernet-ae-interface-group.html#ID0EIQET)).




 Mode


 Select the LACP mode of the firewall. Between any two LACP peers, we recommend that you configure one as active and the other as passive. LACP cannot function if both peers are passive.



| • | **Passive** (default)—The firewall passively responds to LACP status queries from peer devices. |
| --- | --- |






| • | **Active**—The firewall actively queries the LACP status (available or unresponsive) of peer devices. |
| --- | --- |







 Transmission Rate


 Select the rate at which the firewall exchanges queries and responses with peer devices:



| • | **Fast**—Every second |
| --- | --- |






| • | **Slow** (default)—Every 30 seconds |
| --- | --- |







 Fast Failover


 Select if, when an interface goes down, you want the firewall to fail over to an operational interface within one second. Otherwise, failover occurs at the standard IEEE 802.1AX-defined speed (at least three seconds).




 System Priority


 **Aggregate Ethernet Interface** > **LACP (cont)**


 The number that determines whether the firewall or its peer overrides the other with respect to port priorities (see **Max Ports** below).
 Note:



| | The lower the number, the higher the priority (range is 1 to 65,535; default is 32,768). |
| --- | --- |







 Max Interfaces


 The number of interfaces (1 to 8) that can be active at any given time in an LACP aggregate group. This value cannot exceed the number of interfaces you assign to the group. If the number of assigned interfaces exceeds the number of active interfaces, the firewall uses the LACP port priorities of the interfaces to determine which are in standby mode. You set the LACP port priorities when configuring individual interfaces for the group (see [Aggregate Ethernet (AE) Interface](aggregate-ethernet-ae-interface.html#ID0E1ZFT)).




 Enable in HA Passive State


 For firewalls deployed in an HA active/passive configuration, select to allow the passive firewall to pre-negotiate LACP with its active peer before a failover occurs. Pre-negotiation speeds up failover because the passive firewall does not have to negotiate LACP before becoming active.




 Same System MAC Address for Active-Passive HA


 **Aggregate Ethernet Interface** > **LACP (cont)**


 This applies only to firewalls deployed in an [HA active/passive configuration](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/set-up-activepassive-ha.html); firewalls in an [active/active configuration](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/set-up-activeactive-ha.html) require unique MAC addresses.
 HA firewall peers have the same system priority value. However, in an active/passive deployment, the system ID for each can be the same or different depending on whether you assign the same MAC address.
 Fastpath:
 When the LACP peers (also in HA mode) are virtualized (appearing to the network as a single device), using the same system MAC address for the firewalls minimizes latency during failover. When the LACP peers are not virtualized, using the unique MAC address of each firewall minimizes failover latency.
 LACP uses the MAC address to derive a system ID for each LACP peer. If the firewall pair and peer pair have identical system priority values, LACP uses the system ID values to determine which overrides the other with respect to port priorities. If both firewalls have the same MAC address, both will have the same system ID, which will be higher or lower than the system ID of the LACP peers. If the HA firewalls have unique MAC addresses, it is possible for one to have a higher system ID than the LACP peers while the other has a lower system ID. In the latter case, when failover occurs on the firewalls, port prioritization switches between the LACP peers and the firewall that becomes active.




 MAC Address


 **Aggregate Ethernet Interface** > **LACP (cont)**


 If you **Use Same System MAC Address**, select a system-generated MAC address or enter your own MAC address for both firewalls in the active/passive HA pair. You must verify that the address is globally unique.




 SD-WAN Interface Profile


 **Aggregate Ethernet Interface** > **SD-WAN**


 Select an SD-WAN interface Profile to apply to the AE interface group or create a new profile.




 Management Profile


 **Aggregate Ethernet Interface** > **Advanced** > **Other Info**


 Select a Management profile that defines the protocols (for example, SSH, Telnet, and HTTP) you can use to manage the firewall over this interface. Select **None** to remove the current profile assignment from the interface.




 MTU


 Enter the maximum transmission unit (MTU) in bytes for packets sent on this interface (range is 576 to 9,192; default is 1,500). If machines on either side of the firewall perform Path MTU Discovery (PMTUD) and the interface receives a packet exceeding the MTU, the firewall returns an ICMP fragmentation needed message to the source indicating the packet is too large.




 Adjust TCP MSS


 Select to adjust the maximum segment size (MSS) to accommodate bytes for any headers within the interface MTU byte size. The MTU byte size minus the MSS Adjustment Size equals the MSS byte size, which varies by IP protocol:



| • | **IPv4 MSS Adjustment Size**—Range is 40 to 300; default is 40. |
| --- | --- |






| • | **IPv6 MSS Adjustment Size**—Range is 60 to 300; default is 60. |
| --- | --- |



 Use these settings to address the case where a **tunnel** through the network requires a smaller MSS. If a packet has more bytes than the MSS without fragmentation, this setting enables the adjustment.
 Encapsulation adds length to headers so it helps to configure the MSS adjustment size to allow bytes for such things as an MPLS header or tunneled traffic that has a VLAN tag.




 Untagged Subinterface


 Select this option if the corresponding subinterfaces for this interface aren’t tagged.




 IP Address
 MAC Address


 **Aggregate Ethernet Interface** > **Advanced** > **ARP Entries**


 To add one or more static Address Resolution Protocol (ARP) entries, **Add** an IP address and its associated hardware [media access control (MAC)] address. To delete an entry, select the entry and click **Delete**. Static ARP entries reduce ARP processing.




 IPv6 Address
 MAC Address


 **Aggregate Ethernet Interface** > **Advanced** > **ND Entries**


 To provide neighbor information for Neighbor Discovery Protocol (NDP), **Add** the IPv6 address and MAC address of the neighbor.




 Enable NDP Proxy


 **Aggregate Ethernet Interface** > **Advanced** > **NDP Proxy**


 Enable Neighbor Discovery Protocol (NDP) proxy for the interface. The firewall will respond to ND packets requesting MAC addresses for IPv6 addresses in this list. In the ND response, the firewall sends its own MAC address for the interface so that the firewall will receive the packets meant for the addresses in the list.
 It is recommended that you enable NDP proxy if you are using Network Prefix Translation IPv6 (NPTv6).
 If you selected **Enable NDP Proxy**, you can filter numerous **Address** entries by entering a filter and clicking Apply Filter (gray arrow).




 Address


 **Add** one or more IPv6 addresses, IP ranges, IPv6 subnets, or address objects for which the firewall will act as NDP proxy. Ideally, one of these addresses is the same address as that of the source translation in NPTv6. The order of addresses does not matter.
 If the address is a subnetwork, the firewall will send an ND response for all addresses in the subnet, so we recommend you also add the IPv6 neighbors of the firewall and then click **Negate** to instruct the firewall not to respond to these IP addresses.




 Negate


 **Negate** an address to prevent NDP proxy for that address. You can negate a subset of the specified IP address range or IP subnet.




 Enable LLDP


 **Aggregate Ethernet Interface** > **Advanced** > **LLDP**


 Enable Link Layer Discovery Protocol (LLDP) for the interface. LLDP functions at the link layer to discover neighboring devices and their capabilities by sending and receiving LLDP data units to and from neighbors.




 LLDP Profile


 Select an LLDP Profile or create a new [LLDP Profile](network-network-profiles-lldp-profile.html#ID0ETYNW). The profile is the way in which you configure the LLDP mode, enable syslog and SNMP notifications, and configure the optional Type-Length-Values (TLVs) you want transmitted to LLDP peers.




 Settings


 **Aggregate Ethernet Interface** > **Advanced** > **DDNS**


 Select **Settings** to make the DDNS fields available to configure.




 Enable


 Enable DDNS on the interface. You must initially enable DDNS to configure it. (If your DDNS configuration is unfinished, you can save it without enabling it so that you don’t lose your partial configuration.)




 Update Interval (days)


 Enter the interval (in days) between updates that the firewall sends to the DDNS server to update IP addresses mapped to FQDNs (range is 1 to 30; default is 1).
 Note:



| | The firewall also updates DDNS upon receiving a new IP address for the interface from the DHCP server. |
| --- | --- |







 Certificate Profile


 Create a [Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ) to verify the DDNS service. The DDNS service presents the firewall with a certificate signed by the certificate authority (CA).




 Hostname


 Enter a hostname for the interface, which is registered with the DDNS Server (for example, host123.domain123.com, or host123). The firewall does not validate the hostname except to confirm that the syntax uses valid characters allowed by DNS for a domain name.




 Vendor


 **Aggregate Ethernet Interface** > **Advanced** > **DDNS**


 Select the DDNS vendor (and version) that provides DDNS service to this interface:



| • | **DuckDNS v1** |
| --- | --- |






| • | **DynDNS v1** |
| --- | --- |






| • | **FreeDNS Afraid.org Dynamic API v1** |
| --- | --- |






| • | **Free DNS Afraid.org v1** |
| --- | --- |






| • | **No-IP v1** |
| --- | --- |






| • | **Palo Alto Networks DDNS** (applies to SD-WAN Full Mesh with DDNS, SD-WAN AE subinterfaces and SD-WAN Layer 3 subinterfaces) |
| --- | --- |



 Fastpath:**If you select an older version of a DDNS service that the firewall indicates will be phased out by a certain date, move to the newer version.
 The **Name** and Value** fields that follow the vendor name are vendor-specific. The read-only fields notify you of parameters that the firewall uses to connect to the DDNS service. Configure the other fields, such as a password that the DDNS service provides to you and a timeout that the firewall uses if it doesn’t receive a response from the DDNS server.




 IPv4 Tab


 Add the IPv4 addresses configured on the interface and then select them. You can select only as many IPv4 addresses as the DDNS provider allows. All selected IP addresses are registered with the DDNS provider (Vendor).




 IPv6 Tab


 Add the IPv6 addresses configured on the interface and then select them. You can select only as many IPv6 addresses as the DDNS provider allows. All selected IP addresses are registered with the DDNS provider (Vendor).




 Show Runtime Info


 Displays the DDNS registration: DDNS provider, resolved FQDN, and the mapped IP address(es) with an asterisk (*) indicating the primary IP address. Each DDNS provider has its own return codes to indicate the status of the hostname update, and a return date, for troubleshooting purposes.



 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)