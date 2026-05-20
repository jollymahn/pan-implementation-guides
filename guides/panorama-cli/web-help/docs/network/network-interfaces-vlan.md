# Network > Interfaces > VLAN

*Network : Network &gt; Interfaces &gt; VLAN*

## Network > Interfaces > VLAN


A VLAN interface can provide routing into a Layer 3 network (IPv4 and IPv6). You can add one or more Layer 2 Ethernet ports (see [PA-7000 Series Layer 2 Interface](pa-7000-series-layer-2-interface.html#ID0E5KPS)) to a VLAN interface.



| VLAN Interface Settings | Configure In | Description |
| --- | --- | --- |
| Interface Name | **VLAN Interface** | The read-only **Interface Name** is set to **vlan**. In the adjacent field, enter a numeric suffix (1 to 9,999) to identify the interface. |
| Comment | Enter an optional description for the interface. | |
| Netflow Profile | If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the interface. | |
| VLAN | **VLAN Interface** > **Config** | Select a VLAN or click **VLAN** to define a new one (see [Network > VLANs](network-vlans.html#ID0EEKVT)). Select **None** to remove the current VLAN assignment from the interface. |
| Virtual Router | Assign a virtual router to the interface, or click **Virtual Router** to define a new one (see [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)). Select **None** to remove the current virtual router assignment from the interface. | |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system (vsys) for the interface or click **Virtual System** to define a new vsys. | |
| Security Zone | Select a security zone for the interface, or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. | |
| **IPv4 address** | | |
| Type | **VLAN Interface** > **IPv4** | Select the method for assigning an IPv4 address type to the interface: • |






| • | **DHCP Client**—Enables the interface to act as a Dynamic Host Configuration Protocol (DHCP) client and receive a dynamically assigned IP address. |
| --- | --- |



 Note:



| | Firewalls that are in a high availability (HA) active/active configuration don’t support DHCP Client. |
| --- | --- |



 Based on your IP address method selection, the options displayed in the tab will vary.




 **IPv4 address, Type = Static**




 IP


 **VLAN Interface** > **IPv4**


 Click **Add**, then perform one of the following steps to specify a static IP address and network mask for the interface.



| • | Type the entry in Classless Inter-Domain Routing (CIDR) notation: ip_address/mask (for example, 192.168.2.0/24). |
| --- | --- |






| • | Select an existing address object of type **IP netmask**. |
| --- | --- |






| • | Create an **Address** object of type **IP netmask**. |
| --- | --- |



 You can enter multiple IP addresses for the interface. The forwarding information base (FIB) your system uses determines the maximum number of IP addresses.
 **Delete** an IP address when you no longer need it.




 **IPv4 address, Type = DHCP Client**




 Enable


 **VLAN Interface** > **IPv4**


 Select to activate the DHCP client on the interface.




 Automatically create default route pointing to default gateway provided by server


 Select to automatically create a default route that points to the default gateway that the DHCP server provides.




 Send Hostname


 Select to configure the firewall (as a DHCP client) to send the hostname of the interface (Option 12) to the DHCP server. If you Send Hostname, then by default, the hostname of the firewall is the choice in the hostname field. You can send that name or enter a custom hostname (64 characters maximum including uppercase and lowercase letters, numbers, periods, hyphens, and underscores.




 Default Route Metric


 For the route between the firewall and DHCP server, optionally enter a route metric (priority level) to associate with the default route and to use for path selection (range is 1 to 65,535; there is no default). The priority level increases as the numeric value decreases.




 Show DHCP Client Runtime Info


 Select to display all settings received from the DHCP server, including DHCP lease status, dynamic IP address assignment, subnet mask, gateway, and server settings (DNS, NTP, domain, WINS, NIS, POP3, and SMTP).




 **IPv6 address, Type = Static**




 Enable IPv6 on the interface


 **VLAN Interface** > **IPv6**


 Select to enable IPv6 addressing on this interface.




 Interface ID


 Enter the 64-bit extended unique identifier (EUI-64) in hexadecimal format (for example, 00:26:08:FF:FE:DE:4E:29). If you leave this field blank, the firewall uses the EUI-64 generated from the MAC address of the physical interface. If you enable the **Use interface ID as host portion** option when adding an address, the firewall uses the interface ID as the host portion of that address.




 Address


 **VLAN Interface** > **IPv6** > **Address Assignment**


 Add an IPv6 address and prefix length (for example, 2001:400:f00::1/64). Alternatively, select an existing IPv6 address object or create a new one.




 Enable address on interface


 Enable the IPv6 address on the interface.




 Use interface ID as host portion


 Select to use the **Interface ID** as the host portion of the IPv6 address.




 Anycast


 Select to include routing through the nearest node.




 Send RA


 **VLAN Interface** > **IPv6** > **Address Assignment**


 Select to enable the router advertisement (RA) for this IPv6 address. When you select this option, you must also **Enable Router Advertisement** on the **Router Advertisement** tab.
 The remaining fields apply only if you enable **Send RA**.



| • | **Valid Lifetime**— Length of time, in seconds, that the firewall considers the address as valid. The valid lifetime must equal or exceed the **Preferred Lifetime**. Default is 2,592,000. |
| --- | --- |






| • | **Preferred Lifetime**—Length of time, in seconds, that the valid address is preferred, which means the firewall can use it to send and receive traffic. After the preferred lifetime expires, the firewall cannot use the address to establish new connections, but any existing connections are valid until they exceed the Valid Lifetime. Default is 604,800. |
| --- | --- |






| • | **On-link**—Select if systems with IP addresses within the advertised prefix are reachable without a router. |
| --- | --- |






| • | **Autonomous**—Select if systems can independently create an IP address by combining the advertised prefix with an interface ID. |
| --- | --- |







 **IPv6 address, Type = DHCPv6 Client**




 Accept Router Advertised Route


 **VLAN Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client**


 Select to allow the DHCPv6 Client to accept the RA from the DHCP server.




 Default Route Metric


 Enter a default route metric for the route from the interface to the ISP; range is 1 to 65,535; default is 10.




 Preference


 Select the preference of the DHCPv6 Client interface (**low**, **medium**, or **high**) so that, in the event you have two interfaces (each connected to a different ISP for redundancy), you can assign the interface to one ISP a higher preference than the interface to the other ISP. The ISP connected to the preferred interface will be the ISP that provides the delegated prefix to send to a host-facing interface. If the interfaces have the same preference, both ISPs provide a delegated prefix and the host decides which prefix to use.




 Enable IPv6 Address


 **VLAN Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client** > **DHCPv6 Options**


 Enable the IPv6 Address received for this DHCPv6 Client.




 Non-Temporary Address


 Request a Non-Temporary Address for the firewall to assign to this DHCPv6 Client interface that faces the delegating router and ISP. Select Non-Temporary Address if it is acceptable for the interface to have a lower level of security (because the address has a longer lifespan).
 Fastpath:
 Whether you request a Non-Temporary Address or Temporary Address for the interface is based on your discretion and the capability of the DHCPv6 server; some servers can provide only a temporary address. The best practice is to select both Non-Temporary Address and Temporary Address, in which case the firewall will prefer the Non-Temporary Address.




 Temporary Address


 Request a Temporary Address for the firewall to assign to this DHCPv6 Client interface that faces the delegating router and ISP. Select Temporary Address for a greater level of security because the address is intended to be used for a short period of time.




 Rapid Commit


 Select to use the DHCP process of Solicit and Reply messages, rather than the process of Solicit, Advertise, Request, and Reply messages.




 Enable Prefix Delegation


 **VLAN Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client** > **Prefix Delegation**


 Enable Prefix Delegation to allow the firewall to support prefix delegation functionality. This means that the interface accepts a prefix from the upstream DHCPv6 server and places the prefix into the Prefix Pool you select, from which the firewall delegates a prefix to a host via SLAAC. The ability to enable or disable prefix delegation for an interface allows the firewall to support multiple ISPs (one ISP per interface). Enabling prefix delegation on this interface controls which ISP provides the prefix. The delegated prefix received from the DHCP server cannot be used on the interface that requested it.




 DHCP Prefix Length Hint


 Select to enable the firewall to send a preferred DHCPv6 prefix length to the DHCPv6 server.




 DHCP Prefix Length (bits)


 Enter the preferred DHCPv6 prefix length in the range from 48 to 64 bits, which is sent as the hint to the DHCPv6 server.
 Note:



| | Requesting a prefix length of 48, for example, leaves 16 bits remaining for subnets (64-48), which indicates you require many subdivisions of that prefix to delegate. On the other hand requesting a prefix length of 63 leaves 1 bit for delegating only two subnets. Of the 128 bits, there are still 64 more bits for host address. |
| --- | --- |







 Prefix Pool Name


 Enter a name for the prefix pool where the firewall stores the received prefix. The name must be unique and contain a maximum of 63 alphanumeric characters, hyphens, periods, and underscores.
 Tip:
 Use a prefix pool name that reflects the ISP for easy recognition.




 **IPv6 address, Type = Inherited**




 Name


 **VLAN Interface** > **IPv6** > **Address Assignment, Type = Inherited**


 **Add** a pool by entering a pool Name. The name can be a maximum of 63 alphanumeric characters, hyphens, periods, and underscores.




 Address Type


 Select one:



| • | **GUA from Pool**—Global Unicast Address (GUA) that comes from the Prefix Pool chosen. Getting this GUA is the goal of using prefix delegation. |
| --- | --- |






| • | **ULA**—Unique Local Address is a private address in the address range fc00::/7 for connectivity within a private network. Select ULA if there is no DHCP server. |
| --- | --- |







 Enable on Interface


 Enable the address on the interface.




 Prefix Pool


 Select the Prefix Pool from which to get the GUA.




 Assignment Type


 **VLAN Interface** > **IPv6** > **Address Assignment, Type = Inherited**


 Select the assignment type:



| • | **Dynamic**—The DHCPv6 Client is responsible for choosing an identifier to configure the inherited interface. |
| --- | --- |






| • | **Dynamic with Identifier**—You are responsible for choosing an identifier in the range 0 to 4,000 and maintaining a unique identifier across the DHCPv6 clients. |
| --- | --- |







 Send Router Advertisement


 Select to send router advertisements (RAs) from the interface to the LAN hosts.




 On-Link


 Select if systems that have addresses within the prefix are reachable without a router.




 Autonomous


 Select if systems can independently create an IPv6 address by combining the advertised prefix with an Interface ID.




 Enable Duplication Address Detection


 **VLAN Interface** > **IPv6** > **Address Resolution**


 Select to enable duplicate address detection (DAD), which allows you to specify the number of **DAD** **Attempts**.




 DAD Attempts


 Specify the number of DAD attempts within the neighbor solicitation interval (**NS Interval**) before the attempt to identify neighbors fails (range is 1 to 10; default is 1).




 Reachable Time


 Specify the length of time, in seconds, that a neighbor remains reachable after a successful query and response (range is 1 to 36,000; default is 30).




 NS Interval (sec)


 Specify the number of seconds for DAD attempts before failure is indicated (range is 1 to 10; default is 1).




 Enable NDP Monitoring


 Select to enable Neighbor Discovery Protocol monitoring. When enabled, you can select the NDP ( in Features column) and view information such as the IPv6 address of a neighbor the firewall has discovered, the corresponding MAC address and User-ID (on a best-case basis).




 **IPv6 address, Type = Static or Type = Inherited**




 Enable Router Advertisement


 **VLAN Interface** > **IPv6** > **Router Advertisement, Type = Static or Type - Inherited**


 Select to provide Neighbor Discovery on IPv6 interfaces and configure the other fields in this section. IPv6 DNS clients that receive the router advertisement (RA) messages use this information.
 RA enables the firewall to act as a default gateway for IPv6 hosts that are not statically configured and to provide the host with an IPv6 prefix for address configuration. You can use a separate DHCPv6 server in conjunction with this feature to provide DNS and other settings to clients.
 This is a global setting for the interface. If you want to set RA options for individual IP addresses, **Add** an [Address](network-interfaces-vlan.html#ID0EYMNT) to the IP address table and configure it. If you set RA options for any IP address, you must **Enable Router Advertisement** for the interface.




 Min Interval (sec)


 Specify the minimum interval, in seconds, between RAs that the firewall will send (range is 3 to 1,350; default is 200). The firewall will send RAs at random intervals between the minimum and maximum values you configure.




 Max Interval (sec)


 Specify the maximum interval, in seconds, between RAs that the firewall will send (range is 4 to 1,800; default is 600). The firewall will send RAs at random intervals between the minimum and maximum values you configure.




 Hop Limit


 Specify the hop limit to apply to clients for outgoing packets (range is 1 to 255; default is 64). Enter **0** for no hop limit.




 Link MTU


 **VLAN Interface** > **IPv6** > **Router Advertisement, Type = Static or Type = Inherited**


 Specify the link maximum transmission unit (MTU) to apply to clients (range is 1,280 to 1,500) or default to **unspecified**, which maps to a system default.




 Reachable Time (ms)


 Specify the reachable time (in milliseconds) that the client will use to assume a neighbor is reachable after receiving a reachability confirmation message (range is 0 to 3,600,000) or default to **unspecified**, which maps to a system default.




 Retrans Time (ms)


 Specify the retransmission timer that determines how long the client will wait (in milliseconds) before retransmitting neighbor solicitation messages (range is 0 to 4,294,967,295) or default to **unspecified**, which maps to a system default.




 Router Lifetime (sec)


 Specify how long, in seconds, the client will use the firewall as the default gateway (range is 0 to 9,000; default is 1,800). Zero specifies that the firewall is not the default gateway. When the lifetime expires, the client removes the firewall entry from its Default Router List and uses another router as the default gateway.




 Router Preference


 If the network segment has multiple IPv6 routers, the client uses this field to select a preferred router. Select whether the RA advertises the firewall router as having a **High**, **Medium** (default), or **Low** priority relative to other routers on the segment.




 Reachable Time (ms)


 **VLAN Interface** > **IPv6** > **Router Advertisement, Type = Static or Type = Inherited**


 Specify the reachable time (in milliseconds) that the client will use to assume a neighbor is reachable after receiving a reachability confirmation message (range is 0 to 3,600,000) or default to **unspecified**, which maps to a system default.




 Retrans Time (ms)


 Specify the retransmission timer that determines how long the client will wait (in milliseconds) before retransmitting neighbor solicitation messages (range is 0 to 4,294,967,295) or default to **unspecified**, which maps to a system default.




 Router Lifetime (sec)


 Specify how long, in seconds, the client will use the firewall as the default gateway (range is 0 to 9,000; default is 1,800). Zero specifies that the firewall is not the default gateway. When the lifetime expires, the client removes the firewall entry from its Default Router List and uses another router as the default gateway.




 Router Preference


 If the network segment has multiple IPv6 routers, the client uses this field to select a preferred router. Select whether the RA advertises the firewall router as having a **High**, **Medium** (default), or **Low** priority relative to other routers on the segment.




 Managed Configuration


 Select to indicate to the client that addresses are available via DHCPv6.




 Other Configuration



 Select to indicate to the client that other address information (for example, DNS-related settings) is available via DHCPv6.




 Consistency Check


 Select if you want the firewall to verify that RAs sent from other routers are advertising consistent information on the link. The firewall logs any inconsistencies in a system log; the type is **ipv6nd**.




 **IPv6 address, DNS Support (Type = Static)**




 Include DNS information in Router Advertisement


 **VLAN Interface** > **IPv6** > **DNS Support, Type = Static**


 DNS Support is available if you **Enable Router Advertisement** on the Router Advertisement tab.
 Select for the firewall to send DNS information in NDP router advertisements from this IPv6 Ethernet interface. The other DNS Support fields (Server, Lifetime, Domain Search List, and Lifetime) are visible only after you select this option.




 Server



 **Add** one or more recursive DNS (RDNS) server addresses for the firewall to send in NDP router advertisements from this IPv6 Ethernet interface. RDNS servers send a series of DNS look up requests to root DNS and authoritative DNS servers to ultimately provide an IP address to the DNS client.
 You can configure a maximum of eight RDNS Servers that the firewall sends—in order listed from top to bottom—in an NDP router advertisement to the recipient, which then uses them in the same order. Select a server and **Move Up** or **Move Down** to change the order of the servers or **Delete** a server from the list when you no longer need it.




 Lifetime



 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement before the client can use an RDNS server to resolve domain names (range is **Max Interval (sec)** to twice **Max Interval (sec)**; default is 1,200).




 Domain Search List



 **Add** one or more domain names (suffixes) for the DNS search list (DNSSL). Maximum length is 255 bytes.
 A DNS search list is a list of domain suffixes that a DNS client router appends (one at a time) to an unqualified domain name before it enters the name into a DNS query, thereby using a fully qualified domain name in the query. For example, if a DNS client tries to submit a DNS query for the name “quality” without a suffix, the router appends a period and the first DNS suffix from the DNS search list to the name and transmits the DNS query. If the first DNS suffix on the list is “company.com”, the resulting query from the router is for the fully qualified domain name “quality.company.com”.
 If the DNS query fails, the router appends the second DNS suffix from the list to the unqualified name and transmits a new DNS query. The router uses the DNS suffixes until a DNS lookup is successful (ignores the remaining suffixes) or until the router has tried all of suffixes on the list.
 Configure the firewall with the suffixes that you want to provide to the DNS client router in a Neighbor Discovery DNSSL option; the DNS client receiving the DNSSL option uses the suffixes in its unqualified DNS queries.
 You can configure a maximum of 8 domain names (suffixes) for a DNS search list option that the firewall sends—in order listed from top to bottom—in an NDP router advertisement to the recipient, which uses them in the same order. Select a suffix and **Move Up** or **Move Down** to change the order or **Delete** a suffix when you no longer need it.




 Lifetime



 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement that it can use a domain name (suffix) on the DNS search list (range is the value of **Max Interval (sec)** to twice **Max Interval (sec)**; default is 1,200).




 **IPv6 address, DNS Support (Type = DHCPv6 Client or Type = Inherited)**




 DNS Recursive Name Server


 **VLAN Interface** > **IPv6** > **DNS Support, Type = DHCPv6 Client or Type = Inherited**


 Enable and select:



| • | **DHCPv6**—To have the DHCPv6 Server send the DNS Recursive Name Server information. |
| --- | --- |






| • | **Manual**—To manually configure the DNS Recursive Name Server. |
| --- | --- |



 If you choose **Manual**, **Add** a recursive DNS (RDNS) **Server** address for the firewall to send in NDP router advertisements from this IPv6 VLAN interface. RDNS servers send a series of DNS lookup requests to root DNS servers and authoritative DNS servers to ultimately provide an IP address to the DNS client.
 You can configure a maximum of eight RDNS servers that the firewall sends— in the order listed from top to bottom—in an NDP router advertisement to the recipient, which then uses them in the same order. Select a server and **Move Up** or **Move Down** to change the order of the servers or **Delete** a server from the list when you no longer need it.




 Lifetime


 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement that it can use the RDNS servers to resolve domain names (range is the value of [Max Interval (sec)](network-interfaces-vlan.html#ID0E63LT) to twice the Max Interval; default is 1,200).




 Domain Search List


 **VLAN Interface** > **IPv6** > **DNS Support, Type = DHCPv6 Client or Type = Inherited**


 Enable and select:



| • | **DHCPv6**—To have the DHCPv6 Server send the Domain Search List. |
| --- | --- |






| • | **Manual**—To manually configure the Domain Search List. |
| --- | --- |



 If you choose **Manual**, **Add** and configure one or more **Domain** names (suffixes) for the DNS search list (DNSSL). The maximum suffix length is 255 bytes.
 A DNS search list is a list of domain suffixes that a DNS client router appends (one at a time) to an unqualified domain name before it enters the name into a DNS query, thereby using a fully qualified domain name in the DNS query. For example, if a DNS client tries to submit a DNS query for the name “quality” without a suffix, the router appends a period and the first DNS suffix from the DNS search list to the name and then transmits the DNS query. If the first DNS suffix on the list is “company.com”, the resulting DNS query from the router is for the fully qualified domain name “quality.company.com”.
 If the DNS query fails, the router appends the second DNS suffix from the list to the unqualified name and transmits a new DNS query. The router tries DNS suffixes until a DNS lookup is successful (ignores the remaining suffixes) or until the router has tried all of suffixes on the list.
 Configure the firewall with the suffixes that you want to provide to the DNS client router in a Neighbor Discovery DNSSL option; the DNS client receiving the DNSSL option uses the suffixes in its unqualified DNS queries.
 You can configure a maximum of eight domain names (suffixes) for a DNS search list that the firewall sends—in order listed from top to bottom—in an NDP router advertisement to the recipient, which uses those addresses in the same order. Select a suffix and **Move Up** or **Move Down** to change the order or **Delete** a suffix from the list when you no longer need it.




 Lifetime



 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement that it can use a domain name (suffix) on the DNS search list (range is the value of [Max Interval (sec)](network-interfaces-vlan.html#ID0E63LT) to twice the Max Interval; default is 1,200).




 **Advanced**




 Management Profile


 **VLAN Interface** > **Advanced** > **Other Info**


 **Management Profile**—Select a profile that defines the protocols (for example, SSH, Telnet, and HTTP) you can use to manage the firewall over this interface. Select **None** to remove the current profile assignment from the interface.




 MTU


 Enter the maximum transmission unit (MTU) in bytes for packets sent on this interface (range is 576 to 9,192; default is 1,500). If machines on either side of the firewall perform Path MTU Discovery (PMTUD) and the interface receives a packet exceeding the MTU, the firewall returns an ICMP fragmentation needed message to the source indicating the packet is too large.




 Adjust TCP MSS


 Select to adjust the maximum segment size (MSS) to accommodate bytes for any headers within the interface MTU byte size. The MTU byte size minus the MSS Adjustment Size equals the MSS byte size, which varies by IP protocol:



| • | **IPv4 MSS Adjustment Size**—Range is 40 to 300; default is 40. |
| --- | --- |






| • | **IPv6 MSS Adjustment Size**—Range is 60 to 300; default is 60. |
| --- | --- |



 Use these settings to address the case where a **tunnel** through the network requires a smaller MSS. If a packet has more bytes than the MSS without fragmentation, this setting enables the adjustment.
 Encapsulation adds length to headers, so it helps to configure the MSS adjustment size to allow bytes for such things as an MPLS header or tunneled traffic that has a VLAN tag.




 IP Address
 MAC Address
 Interface


 **VLAN Interface** > **Advanced** > **ARP Entries**


 To add one or more static Address Resolution Protocol (ARP) entries, click **Add** and enter an IP address, enter its associated hardware [media access control (MAC)] address, and select a Layer 3 interface that can access the hardware address. To delete an entry, select the entry and click **Delete**. Static ARP entries reduce ARP processing and preclude man-in-the-middle attacks for the specified addresses.




 IPv6 Address
 MAC Address


 **VLAN Interface** > **Advanced** > **ND Entries**


 To provide neighbor information for Neighbor Discovery Protocol (NDP), click **Add** and enter the IPv6 address and MAC address of the neighbor.




 Enable NDP Proxy


 **VLAN Interface** > **Advanced** > **NDP Proxy**


 Select to enable Neighbor Discovery Protocol (NDP) Proxy for the interface. The firewall will respond to ND packets requesting MAC addresses for IPv6 addresses in this list. In the ND response, the firewall sends its own MAC address for the interface, and is basically saying, “send me the packets meant for these addresses.”
 (**Recommended**) Enable NDP Proxy if you are using Network Prefix Translation IPv6 (NPTv6).
 If you **Enable NDP Proxy**, you can filter numerous **Address** entries: first enter a filter and then apply it (green arrow).




 Address


 **Add** one or more IPv6 addresses, IP ranges, IPv6 subnets, or address objects for which the firewall will act as NDP Proxy. Ideally, one of these addresses is the same address as that of the source translation in NPTv6. The order of addresses does not matter.
 If the address is a subnetwork, the firewall will send an ND response for all addresses in the subnet, so we recommend you also add the firewall’s IPv6 neighbors and then click **Negate** to instruct the firewall not to respond to these IP addresses.




 Negate


 Select **Negate** for an address to prevent NDP proxy for that address. You can negate a subset of the specified IP address range or IP subnet.




 Settings


 **VLAN Interface** > **Advanced** > **DDNS**


 Select Settings to make the DDNS fields available to configure.




 Enable


 Enable DDNS on the interface. You must initially enable DDNS to configure it. (If your DDNS configuration is unfinished, you can save it without enabling it so that you don’t lose your partial configuration.)




 Update Interval (days)


 Enter the interval (in days) between updates that the firewall sends to the DDNS server to update IP addresses mapped to FQDNs (range is 1 to 30; default is 1).
 Note:



| | The firewall also updates DDNS upon receiving a new IP address for the interface from the DHCP server. |
| --- | --- |







 Certificate Profile


 Select a [Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ) that you created (or create a new one) to verify the DDNS service. The DDNS service presents the firewall with a certificate signed by the certificate authority (CA).




 Hostname


 Enter a hostname for the interface, which is registered with the DDNS Server (for example, host123.domain123.com, or host123). The firewall does not validate the hostname except to confirm that the syntax uses valid characters allowed by DNS for a domain name.




 Vendor


 Select the DDNS vendor (and version number) that provides DDNS service to this interface:



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



 Fastpath:
 If you select an older version of a DDNS service that the firewall indicates will be phased out by a certain date, move to the newer version.
 The **Name** and **Value** fields that follow the vendor name are vendor-specific. Some fields are read-only to notify you of the parameters that the firewall uses to connect to the DDNS service. Configure the other fields, such as a password that the DDNS service provides to you and a timeout the firewall uses if it doesn’t receive a response from the DDNS server.




 IPv4 tab - IP


 Add the IPv4 addresses configured on the interface and select them. All selected IP addresses are registered with the DDNS provider (Vendor).




 IPv6 tab - IPv6


 **VLAN Interface** > **Advanced** > **DDNS**(cont)


 Add the IPv6 addresses configured on the interface and select them. All selected IP addresses are registered with the DDNS provider (Vendor).




 Show Runtime Info


 Displays the DDNS registration: DDNS provider, resolved FQDN, and the mapped IP address(es) with an asterisk (*) indicating the primary IP address. Each DDNS provider has its own return codes to indicate the status of the hostname update, and a return date, for troubleshooting purposes.



 Parent topic
 [Network](network.html#ID0EFOJS)