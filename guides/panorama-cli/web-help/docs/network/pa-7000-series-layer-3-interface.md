# PA-7000 Series Layer 3 Interface

*Network : Network &gt; Interfaces : PA-7000 Series Layer 3 Interface*

PA-7000 Series Layer 3 Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




To configure a Layer 3 interface, select an interface (ethernet1/1, for example) and specify the following information.



| Layer 3 Interface Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **Ethernet Interface** | The interface name is predefined and you cannot change it. |
| Comment | Enter an optional description for the interface. | |
| Interface Type | Select **Layer3**. | |
| Netflow Profile | If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the interface. | |
| Virtual Router | **Ethernet Interface** > **Config** | Select a virtual router, or click **Virtual Router** to define a new one (see [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)). Select **None** to remove the current virtual router assignment from the interface. |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system (vsys) for the interface or click **Virtual System** to define a new vsys. | |
| Security Zone | Select a security zone for the interface or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. | |
| Enable SD-WAN | **Ethernet Interface** > **IPv4** | Select **Enable SD-WAN** to enable SD-WAN functionality for the Ethernet interface. |
| Type | Select the method for assigning an IPv4 address type to the interface: • | **Static**—You must manually specify the IP address. |






| • | **PPPoE**—The firewall will use the interface for Point-to-Point Protocol over Ethernet (PPPoE). |
| --- | --- |






| • | **DHCP Client**—Enables the interface to act as a Dynamic Host Configuration Protocol (DHCP) client and receive a dynamically assigned IP address. |
| --- | --- |



 Note:



| | Firewalls that are in a high availability (HA) active/active configuration do not support PPPoE or DHCP Client. |
| --- | --- |



 Based on your IP address method selection, the options displayed in the tab will vary.




 IPv4 address **Type** = **Static**




 IP


 **Ethernet Interface** > **IPv4**


 Click **Add**, then perform one of the following steps to specify a static IP address and network mask for the interface.



| • | Type the entry in Classless Inter-domain Routing (CIDR) notation: ip_address/mask (for example, 192.168.2.0/24). |
| --- | --- |






| • | Select an existing address object of type **IP netmask**. |
| --- | --- |






| • | Click **Address** to create an address object of type **IP netmask**. |
| --- | --- |



 You can enter multiple IP addresses for the interface. The forwarding information base (FIB) your firewall uses determines the maximum number of IP addresses.
 To delete an IP address, select the address and click **Delete**.




 IPv4 address **Type** = **PPPoE**




 Enable


 **Ethernet Interface** > **IPv4** > **PPPoE** > **General**


 Select to activate the interface for PPPoE termination.




 Username


 Enter the username for the point-to-point connection.




 Password/Confirm Password


 Enter and then confirm the password for the username.




 Show PPPoE Client Runtime Info


 (`Optional`) Opens a dialog that displays parameters that the firewall negotiated with the Internet service provider (ISP) to establish a connection. The specific information depends on the ISP.




 Authentication


 **Ethernet Interface** > **IPv4** > **PPPoE** > **Advanced**


 Select the authentication protocol for PPPoE communications: **CHAP** (Challenge-Handshake Authentication Protocol), **PAP** (Password Authentication Protocol), or the default **Auto** (the firewall determines the protocol). Select **None** to remove the current protocol assignment from the interface.




 Static Address


 Perform one of the following steps to specify the IP address that the Internet service provider assigned (no default value):



| • | Type the entry in Classless Inter-Domain Routing (CIDR) notation: ip_address/mask (for example, 192.168.2.0/24). |
| --- | --- |






| • | Select an existing address object of type **IP netmask**. |
| --- | --- |






| • | Click **Address** to create an address object of type **IP netmask**. |
| --- | --- |






| • | Select **None** to remove the current address assignment from the interface. |
| --- | --- |







 Automatically create default route pointing to peer


 Select to automatically create a default route that points to the PPPoE peer when connected.




 Default Route Metric


 (`Optional`) For the route between the firewall and Internet service provider, enter a route metric (priority level) to associate with the default route and to use for path selection (range is 1 to 65,535). The priority level increases as the numeric value decreases.




 Access Concentrator


 (`Optional`) Enter the name of the access concentrator on the Internet service provider end to which the firewall connects (no default).




 Service


 (`Optional`) Enter the service string (no default).




 Passive


 Select to use passive mode. In passive mode, a PPPoE end point waits for the access concentrator to send the first frame.




 IPv4 address **Type** = **DHCP**




 Enable


 **Ethernet Interface** > **IPv4**


 Select to activate the DHCP client on the interface.




 Automatically create default route pointing to default gateway provided by server


 Select to automatically create a default route that points to the default gateway that the DHCP server provides.




 Send Hostname


 Select to have the firewall (as a DHCP client) send the hostname of the interface (Option 12) to the DHCP server. If you Send Hostname, then the hostname of the firewall is the choice in the hostname field by default. You can send that name or enter a custom hostname (64 characters maximum including uppercase and lowercase letters, numbers, periods, hyphens, and underscores.




 Default Route Metric


 For the route between the firewall and DHCP server, optionally enter a route metric (priority level) to associate with the default route and to use for path selection (range is 1 to 65,535, no default). The priority level increases as the numeric value decreases.




 Show DHCP Client Runtime Info


 Select to display all settings received from the DHCP server, including DHCP lease status, dynamic IP address assignment, subnet mask, gateway, and server settings (DNS, NTP, domain, WINS, NIS, POP3, and SMTP).




 Enable IPv6 on the interface


 **Ethernet Interface** > **IPv6**


 Select to enable IPv6 addressing on this interface.




 Interface ID


 Enter the 64-bit extended unique identifier (EUI-64) in hexadecimal format (for example, 00:26:08:FF:FE:DE:4E:29). If you leave this field blank, the firewall uses the EUI-64 generated from the MAC address of the physical interface. If you enable the **Use interface ID as host portion** option when adding an address, the firewall uses the interface ID as the host portion of that address.




 Address


 Click **Add** and configure the following parameters for each IPv6 address:



| • | **Address**—Enter an IPv6 address and prefix length (for example, 2001:400:f00::1/64). You can also select an existing IPv6 address object or click **Address** to create an address object. |
| --- | --- |






| • | **Enable address on interface**—Select to enable the IPv6 address on the interface. |
| --- | --- |






| • | **Use interface ID as host portion**—Select to use the **Interface ID** as the host portion of the IPv6 address. |
| --- | --- |






| • | **Anycast**—Select to include routing through the nearest node. |
| --- | --- |






| • | **Send Router Advertisement**—Select to enable router advertisement (RA) for this IP address. (You must also enable the global **Enable Router Advertisement** option on the interface.) For details on RA, see [Enable Router Advertisement](pa-7000-series-layer-3-interface.html#ID0EQVSS). |
| --- | --- |



 The remaining fields apply only if you enable RA.



| ◦ | **Valid Lifetime**—The length of time, in seconds, that the firewall considers the address as valid. The valid lifetime must equal or exceed the **Preferred Lifetime** (default is 2,592,000). |
| --- | --- |






| ◦ | **Preferred Lifetime**—The length of time, in seconds, that the valid address is preferred, which means the firewall can use it to send and receive traffic. After the preferred lifetime expires, the firewall cannot use the address to establish new connections but any existing connections are valid until the **Valid Lifetime** expires (default is 604,800). |
| --- | --- |






| ◦ | **On-link**—Select if systems that have addresses within the prefix are reachable without a router. |
| --- | --- |






| ◦ | **Autonomous**—Select if systems can independently create an IP address by combining the advertised prefix with an interface ID. |
| --- | --- |







 Enable Duplication Address Detection


 **Ethernet Interface** > **IPv6** > **Address Resolution**


 Select to enable duplicate address detection (DAD), then configure the other fields in this section.




 DAD Attempts


 Specify the number of DAD attempts within the neighbor solicitation interval (**NS Interval**) before the attempt to identify neighbors fails (range is 1 to 10; default is 1).




 Reachable Time


 Specify the length of time, in seconds, that a neighbor remains reachable after a successful query and response (range is 10 to 36,000; default is 30).




 NS Interval (neighbor solicitation interval)


 Specify the number of seconds for DAD attempts before failure is indicated (range is 1 to 10; default is 1).




 Enable NDP Monitoring


 Select to enable Neighbor Discovery Protocol (NDP) monitoring. When enabled, you can select NDP Monitor (   in Features column) and view information about a neighbor that the firewall discovered, such as the IPv6 address, the corresponding MAC address, and the User-ID (on a best-case basis).




 Enable Router Advertisement


 **Ethernet Interface** > **IPv6** > **Router Advertisement**


 To provide stateless address auto-configuration (SLAAC) on IPv6 interfaces, select and configure the other fields in this section. IPv6 DNS clients that receive the router advertisement (RA) messages use this information.
 RA enables the firewall to act as a default gateway for IPv6 hosts that are not statically configured and to provide the host with an IPv6 prefix for address configuration. You can use a separate DHCPv6 server in conjunction with this feature to provide DNS and other settings to clients.
 This is a global setting for the interface. If you want to set RA options for individual IP addresses, click **Add** in the IP address table and configure the [Address](pa-7000-series-layer-3-interface.html#ID0EOCUS). If you set RA options for any IP address, you must select the **Enable Router Advertisement** option for the interface.




 Min Interval (sec)


 Specify the minimum interval, in seconds, between RAs that the firewall will send (range is 3 to 1,350; default is 200). The firewall will send RAs at random intervals between the minimum and maximum values you configure.




 Max Interval (sec)


 Specify the maximum interval, in seconds, between RAs that the firewall will send (range is 4 to 1,800; default is 600). The firewall will send RAs at random intervals between the minimum and maximum values you configure.




 Hop Limit


 Specify the hop limit to apply to clients for outgoing packets (range is 1 to 255; default is 64). Enter 0 for no hop limit.




 Link MTU


 Specify the link maximum transmission unit (MTU) to apply to clients. Select **unspecified** for no link MTU (range is 1,280 to 9,192; default is unspecified).




 Reachable Time (ms)


 Specify the reachable time (in milliseconds) that the client will use to assume a neighbor is reachable after receiving a reachability confirmation message. Select **unspecified** for no reachable time value (range is 0 to 3,600,000; default is unspecified).




 Retrans Time (ms)


 Specify the retransmission timer that determines how long the client will wait (in milliseconds) before retransmitting neighbor solicitation messages. Select **unspecified** for no retransmission time (range is 0 to 4,294,967,295; default is unspecified).




 Router Lifetime (sec)


 Specify how long the client will use the firewall as the default gateway (range is 0 to 9,000; default is 1,800). Zero specifies that the firewall is not the default gateway. When the lifetime expires, the client removes the firewall entry from its Default Router List and uses another router as the default gateway.




 Router Preference


 If the network segment has multiple IPv6 routers, the client uses this field to select a preferred router. Select whether the RA advertises the firewall router as having a **High**, **Medium** (default), or **Low** priority relative to other routers on the segment.




 Managed Configuration


 Select to indicate to the client that addresses are available via DHCPv6.




 Consistency Check


 **Ethernet Interface** > **IPv6** > **Router Advertisement (cont)**


 Select if you want the firewall to verify that RAs sent from other routers are advertising consistent information on the link. The firewall logs any inconsistencies in a system log; the type is **ipv6nd**.




 Other Configuration


 Select to indicate to the client that other address information (for example, DNS-related settings) is available via DHCPv6.




 Include DNS information in Router Advertisement


 **Ethernet Interface** > **IPv6** > **DNS Support**


 Select to enable the firewall to send DNS information in NDP router advertisement (RA) messages from this IPv6 Ethernet interface. The other DNS Support fields in this table are visible only after you select this option.




 Server


 **Add** one or more recursive DNS (RDNS) server addresses for the firewall to send in NDP router advertisements from this IPv6 Ethernet interface. RDNS servers send a series of DNS lookup requests to root DNS and authoritative DNS servers to ultimately provide an IP address to the DNS client.
 You can configure a maximum of eight RDNS servers that the firewall sends—in the order listed from top to bottom—in an NDP router advertisement to the recipient, which then uses those addresses in the same order. Select a server and **Move Up** or **Move Down** to change the order of the servers or **Delete** a server from the list when you no longer need it.




 Lifetime


 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement before the client can use the RDNS servers to resolve domain names (range is [Max Interval (sec)](pa-7000-series-layer-3-interface.html#ID0EZYSS) to twice Max Interval; default is 1,200).




 Suffix


 **Add** and configure one or more domain names (suffixes) for the DNS search list (DNSSL). Maximum length is 255 bytes.
 A DNS search list is a list of domain suffixes that a DNS client router appends (one at a time) to an unqualified domain name before it enters the name into a DNS query, thereby using a fully qualified domain name in the DNS query. For example, if a DNS client tries to submit a DNS query for “quality” without a suffix, the router appends a period and the first DNS suffix from the DNS search list to that name and then transmits the DNS query. If the first DNS suffix on the list is “company.com”, the resulting DNS query from the router is for the FQDN “quality.company.com”.
 If the DNS query fails, the router appends the second DNS suffix from the list to the unqualified name and transmits a new DNS query. The router tries DNS suffixes until a DNS lookup is successful (ignores the remaining suffixes) or until the router has tried all suffixes on the list.
 Configure the firewall with the suffixes you want to provide to the DNS client router in a Neighbor Discovery DNSSL option; the DNS client receiving the DNSSL option uses the suffixes in its unqualified DNS queries.
 You can configure up to eight domain names (suffixes) for a DNS search list that the firewall sends—in order from top to bottom—in an NDP router advertisement to the recipient, which uses those addresses in the same order. Select a suffix and **Move Up** or **Move Down** to change the order or **Delete** a suffix when you no longer need it.




 Lifetime


 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement that it can use a domain name (suffix) on the DNS Search List (range is the value of [Max Interval (sec)](pa-7000-series-layer-3-interface.html#ID0EZYSS) to twice the Max Interval; default is 1,200).




 SD-WAN Interface Status


 **Ethernet Interface** > **SD-WAN**


 If you selected **Enable SD-WAN** on the **IPv4** tab, the firewall indicates SD-WAN Interface Status: Enabled. If you didn’t **Enable SD-WAN**, it indicates Disabled.




 SD-WAN Interface Profile


 Select the SD-WAN Interface Profile to apply to this Ethernet interface or add a new SD-WAN Interface Profile.
 Note:



| | You must **Enable SD-WAN** for the interface before you can apply an SD-WAN Interface Profile. |
| --- | --- |







 Upstream NAT


 If your SD-WAN hub or branch is behind a device that is performing NAT, **Enable** upstream NAT for the hub or branch.




 NAT IP Address Type


 Select the type of IP address assignment and specify the IP address or FQDN of the public-facing interface on that NAT-performing device, or specify that DDNS derives the address. Thus, Auto VPN can use the address as the tunnel endpoint of the hub or branch.



| • | **Static IP**—Select the **Type** to be **IP Address** or **FQDN** and enter the IPv4 address or FQDN. |
| --- | --- |






| • | **DDNS**—Dynamic DNS (DDNS) derives the IP address of the upstream NAT device. |
| --- | --- |







 Link Speed


 **Ethernet Interface** > **Advanced**


 Select the interface speed in Mbps (**10**, **100**, or **1000**) or select **auto**.




 Link Duplex


 Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**).




 Link State


 Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically (**auto**).




 Management Profile


 **Ethernet Interface** > **Advanced** > **Other Info**


 Select a profile that defines the protocols (for example, SSH, Telnet, and HTTP) you can use to manage the firewall over this interface. Select **None** to remove the current profile assignment from the interface.




 MTU


 Enter the maximum transmission unit (MTU) in bytes for packets sent on this interface (576 to 9,192; default is 1,500). If machines on either side of the firewall perform Path MTU Discovery (PMTUD) and the interface receives a packet exceeding the MTU, the firewall returns an ICMP fragmentation needed message to the source indicating the packet is too large.




 Adjust TCP MSS


 Select to adjust the maximum segment size (MSS) to accommodate bytes for any headers within the interface MTU byte size. The MTU byte size minus the MSS Adjustment Size equals the MSS byte size, which varies by IP protocol:



| • | **IPv4 MSS Adjustment Size**—Range is 40 to 300; default is 40. |
| --- | --- |






| • | **IPv6 MSS Adjustment Size**—Range is 60 to 300; default is 60. |
| --- | --- |



 Use these settings to address the case where a **tunnel** through the network requires a smaller MSS. If a packet has more bytes than the MSS without fragmentation, this setting enables the adjustment.
 Encapsulation adds length to headers so it is helpful to configure the MSS adjustment size to allow bytes for such things as an MPLS header or tunneled traffic that has a VLAN tag.




 Untagged Subinterface


 Specifies that all subinterfaces belonging to this Layer 3 interface are untagged. PAN-OS® selects an untagged subinterface as the ingress interface based on the packet destination. If the destination is the IP address of an untagged subinterface, it maps to the subinterface. This also means that packets in the reverse direction must have their source address translated to the IP address of the untagged subinterface. A byproduct of this classification mechanism is that all multicast and broadcast packets are assigned to the base interface, not any subinterfaces. Because Open Shortest Path First (OSPF) uses multicast, the firewall does not support it on untagged subinterfaces.




 IP Address
 MAC Address


 **Ethernet Interface** > **Advanced** > **ARP Entries**


 To add one or more static Address Resolution Protocol (ARP) entries, click **Add** and enter an IP address and its associated hardware (MAC) address. To delete an entry, select the entry and click **Delete**. Static ARP entries reduce ARP processing and preclude man-in-the-middle attacks for the specified addresses.




 IPv6 Address
 MAC Address


 **Ethernet Interface** > **Advanced** > **ND Entries**


 To provide neighbor information for Neighbor Discovery Protocol (NDP), click **Add** and enter the IP address and MAC address of the neighbor.




 Enable NDP Proxy


 **Ethernet Interface** > **Advanced** > **NDP Proxy**


 Select to enable the Neighbor Discovery Protocol (NDP) proxy for the interface. The firewall will respond to ND packets requesting MAC addresses for IPv6 addresses in this list. In the ND response, the firewall sends its own MAC address for the interface to indicate it will act as proxy by responding to packets destined for those addresses.
 It is recommended that you select **Enable NDP Proxy** if you use Network Prefix Translation IPv6 (NPTv6).
 If **Enable NDP Proxy** is selected, you can filter numerous Address entries by entering a search string and clicking Apply Filter ( ).




 Address


 Click **Add** to enter one or more IPv6 addresses, IP ranges, IPv6 subnets, or address objects for which the firewall will act as the NDP proxy. Ideally, one of these addresses is the same address as that of the source translation in NPTv6. The order of addresses does not matter.
 If the address is a subnetwork, the firewall will send an ND response for all addresses in the subnet, so we recommend that you also add the IPv6 neighbors of the firewall and then select **Negate** to instruct the firewall not to respond to these IP addresses.




 Negate


 Select **Negate** for an address to prevent NDP proxy for that address. You can negate a subset of the specified IP address range or IP subnet.




 Enable LLDP


 **Ethernet Interface** > **Advanced** > **LLDP**


 Select to enable Link Layer Discovery Protocol (LLDP) on the interface. LLDP functions at the link layer to discover neighboring devices and their capabilities.




 LLDP Profile


 If LLDP is enabled, select an LLDP profile to assign to the interface or click **LLDP Profile** to create a new profile (see [Network > Network Profiles > LLDP Profile](network-network-profiles-lldp-profile.html#ID0ETYNW)). Select **None** to configure the firewall to use global defaults.




 Enable in HA Passive State


 If LLDP is enabled, select to allow the firewall as an HA passive firewall to pre-negotiate LLDP with its peer before the firewall becomes active.




 Settings


 **Ethernet Interface** > **Advanced** > **DDNS**


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


 Select the DDNS vendor (and version) that provides DDNS service to this interface:



| • | **DuckDNS v1** |
| --- | --- |






| • | **DynDNS v1** |
| --- | --- |






| • | **FreeDNS Afraid.org Dynamic API v1** |
| --- | --- |






| • | **FreeDNS Afraid.org v1** |
| --- | --- |






| • | **No-IP v1** |
| --- | --- |






| • | **Palo Alto Networks DDNS**—You must use this for SD-WAN AE interfaces and SD-WAN Layer 3 subinterfaces. |
| --- | --- |



 Fastpath:
 If you select an older version of a DDNS service that the firewall indicates will be phased out by a certain date, move to the newer version.
 The **Name** and **Value** fields that follow the vendor name are vendor-specific. The read-only fields notify you of parameters that the firewall uses to connect to the DDNS service. Configure the other fields, such as a password that the DDNS service provides to you and a timeout that the firewall uses if it doesn’t receive a response from the DDNS server.




 IPv4 tab - IP


 Add the IPv4 addresses configured on the interface and select them. All selected IP addresses are registered with the DDNS provider (Vendor).




 IPv6 tab - IPv6



 Add the IPv6 addresses configured on the interface and select them. All selected IP addresses are registered with the DDNS provider (Vendor).




 Show Runtime Info


 Displays the DDNS registration: DDNS provider, resolved FQDN, and the mapped IP address(es) with an asterisk (*) indicating the primary IP address. Each DDNS provider has its own return codes to indicate the status of the hostname update, and a return date, for troubleshooting purposes.



 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)