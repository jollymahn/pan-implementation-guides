# Aggregate Ethernet (AE) Interface

*Network : Network &gt; Interfaces : Aggregate Ethernet (AE) Interface*

Aggregate Ethernet (AE) Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




To configure an [Aggregate Ethernet (AE) Interface](aggregate-ethernet-ae-interface.html#ID0E1ZFT), first Add an [Aggregate Ethernet (AE) Interface Group](aggregate-ethernet-ae-interface-group.html#ID0EHNDT). Then click the name of the interface you will assign to that group. Among the interfaces that you assign to any particular group, the hardware media can differ (for example, you can mix fiber optic and copper), but the bandwidth and interface type (such as Layer 3) must be the same. Furthermore, the interface type must be the same as that defined for the AE interface group, though you will change the type to **Aggregate Ethernet** when you configure each interface. Specify the following information for each interface that you assign to the group.

 Fastpath:
 If you enabled Link Aggregation Control Protocol (LACP) for the AE interface group, select the same **Link Speed** and **Link Duplex** for every interface in that group. For non-matching values, the commit operation displays a warning and PAN-OS defaults to the higher speed and full duplex.


| Aggregate Interface Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **Aggregate Ethernet Interface** | The interface name is predefined and you cannot change it. Enter a number after ae in the Interface Name. |
| Comment | (`Optional`) Enter a description for the interface. | |
| Interface Type | Select **Aggregate Ethernet**. | |
| Aggregate Group | | Assign the interface to an aggregate group. |
| Link Speed | **Aggregate Ethernet Interface** > **Advanced** > **Link Settings** | Select the interface speed in Mbps, or select **auto** to have the firewall automatically determine the speed. |
| Link Duplex | Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**). | |
| Link State | Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically (**auto**). | |
| PoE Rsvd Pwr | **Aggregate Ethernet Interface** > **Advanced** > **PoE Settings** (`Supported firewalls only`) | Select the amount of allocated power in Watts if PoE is enabled. |
| PoE Enable | Select to enable PoE on this interface. CAUTION:**When using Panorama, non-PoE interfaces display the option to enable or disable PoE. To avoid a commit failure, ensure that **PoE Enable** remains selected on these non-PoE interfaces. | |
| LACP Port Priority | | The firewall only uses this field if you enabled Link Aggregation Control Protocol (LACP) for the aggregate group. If the number of interfaces you assign to the group exceeds the number of active interfaces (the [Max Ports](aggregate-ethernet-ae-interface-group.html#ID0EIQET)** field), the firewall uses the LACP port priorities of the interfaces to determine which are in standby mode. The lower the numeric value, the higher the priority (range is 1-65,535; default is 32,768). |
| Virtual Router | **Aggregate Ethernet Interface** > **Config** | Select the virtual router to which you assign the Aggregate Ethernet interface. |
| Security Zone | Select the security zone to which you assign the Aggregate Ethernet interface. | |
| Enable SD-WAN | **Aggregate Ethernet Interface** > **IPv4** | Select to enable SD-WAN functionality for the interface. |
| Enable Bonjour Reflector | **Aggregate Ethernet Interface** > **IPv4** | (`PA-220, PA-800, and PA-3200 series only`) When you enable this option, the firewall forwards Bonjour multicast advertisements and queries received on and forwarded to this interface to all other L3 and AE interfaces and subinterfaces where you enable this option. This helps ensure user access and device discoverability in network environments that use segmentation to route traffic for security or administrative purposes. You can enable this option on up to 16 interfaces. |
| Enable IPv6 on the interface | **Aggregate Ethernet Interface** > **IPv6** | Select to enable IPv6 on this interface. |
| Interface ID | Enter the 64-bit extended unique identifier (EUI-64) in hexadecimal format (for example, 00:26:08:FF:FE:DE:4E:29). If you leave this field blank, the firewall uses the EUI-64 generated from the MAC address of the physical interface. If you **Use interface ID as host portion** when adding an address, the firewall uses the interface ID as the host portion of that address. | |
| Address | **Aggregate Ethernet Interface** > **IPv6** > **Address Assignment, Type = Static** | Add an IPv6 address and prefix length (for example, 2001:400:f00::1/64). Alternatively, select an existing IPv6 address object or create a new IPv6 address object. |
| Enable address on interface | Select to enable the IPv6 address on the interface. | |
| Use interface ID as host portion | Select to use the **Interface ID** as the host portion of the IPv6 address. | |
| Anycast | Select to include routing through the nearest node. | |
| Send Router Advertisement | **Aggregate Ethernet Interface** > **IPv6** > **Address Assignment, Type = Static** | Select to enable router advertisement (RA) for this IP address. (You must also enable the global **Enable Router Advertisement** option on the interface.) For details on RA, see Enable Router Advertisement in this table. The following fields apply only if you Enable Router Advertisement: • |






| • | **Preferred Lifetime**—Length of time, in seconds, that the valid address is preferred, which means the firewall can use it to send and receive traffic. After the preferred lifetime expires, the firewall cannot use the address to establish new connections, but any existing connections are valid until the **Valid Lifetime** expires. The default is 604,800. |
| --- | --- |






| • | **On-link**—Select if systems that have addresses within the prefix are reachable without a router. |
| --- | --- |






| • | **Autonomous**—Select if systems can independently create an IP address by combining the advertised prefix with an interface ID. |
| --- | --- |







 Accept Router Advertised Route


 **Aggregate Ethernet Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client**


 Select to allow the DHCPv6 Client to accept the RA from the DHCP server.




 Default Route Metric


 Enter a default route metric for the route from the interface to the ISP; range is 1 to 65,535; default is 10.




 Preference


 Select the preference of the DHCPv6 Client interface (**low**, **medium**, or **high**) so that, in the event you have two interfaces (each connected to a different ISP for redundancy), you can assign the interface to one ISP a higher preference than the interface to the other ISP. The ISP connected to the preferred interface will be the ISP that provides the delegated prefix to send to a host-facing interface. If the interfaces have the same preference, both ISPs provide a delegated prefix and the host decides which prefix to use.




 Enable IPv6 Address


 **Aggregate Ethernet Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client** > **DHCPv6 Options**


 Enable the IPv6 Address received for this DHCPv6 Client.




 Non-Temporary Address


 Request a Non-Temporary Address for the firewall to assign to this DHCPv6 Client interface that faces the delegating router and ISP. Select for a longer lifespan than a Temporary Address.
 Fastpath:
 Whether you request a Non-Temporary Address or Temporary Address for the interface is based on your discretion and the capability of the DHCPv6 server; some servers can provide only a temporary address. The best practice is to select both Non-Temporary Address and Temporary Address, in which case the firewall will prefer the Non-Temporary Address.




 Temporary Address


 Request a Temporary Address for the firewall to assign to this DHCPv6 Client interface that faces the delegating router and ISP. Select Temporary Address for a greater level of security because the address is intended to be used for a short period of time.




 Rapid Commit


 Select to use the DHCP process of Solicit and Reply messages, rather than the process of Solicit, Advertise, Request, and Reply messages.




 Enable Prefix Delegation


 **Aggregate Ethernet Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client** > **Prefix Delegation**


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




 Name


 **Aggregate Ethernet Interface** > **IPv6** > **Address Assignment, Type = Inherited**


 **Add** a pool by entering a pool Name. The name can be a maximum of 63 alphanumeric characters, hyphens, periods, and underscores.




 Address Type


 Select one:



| • | **GUA from Pool**—Global Unicast Address (GUA) that comes from the Prefix Pool chosen. |
| --- | --- |






| • | **ULA**—Unique Local Address is a private address in the address range fc00::/7 for connectivity within a private network. Select ULA if there is no DHCP server. The DHCPv6 server has the discretion to send whatever prefix length it chooses. |
| --- | --- |







 Enable on Interface


 (`GUA`) Enable the address on the interface.




 Prefix Pool


 (`GUA`) Select the Prefix Pool from which to get the GUA.




 Assignment Type


 **Aggregate Ethernet Interface** > **IPv6** > **Address Assignment, Type = Inherited**


 (`GUA`) Select the assignment type:



| • | **Dynamic**—The DHCPv6 Client is responsible for choosing an identifier to configure the inherited interface. |
| --- | --- |






| • | **Dynamic with Identifier**—You are responsible for choosing an identifier in the range 0 to 4,000 and maintaining a unique identifier across the DHCPv6 clients. |
| --- | --- |







 Enable Address on Interface


 (`ULA`) Enable the address on the interface.




 Address


 (`ULA`) Enter an address.




 Use interface ID as host portion


 (`ULA`) Select to use the interface ID as the host portion of the IPv6 address.




 Anycast


 (`ULA`) Select to make the IPv6 address an Anycast address, which means multiple locations can advertise the same prefix, and IPv6 sends the Anycast traffic to the node it considers the nearest, based on routing protocol costs and other factors.




 Send Router Advertisement



 Select to send router advertisements (RAs) from the interface to the LAN hosts.




 On-Link



 Select if systems that have addresses within the prefix are reachable without a router.




 Autonomous



 Select if systems can independently create an IPv6 address by combining the advertised prefix with an Interface ID.




 Enable Duplication Address Detection


 **Aggregate Ethernet Interface** > **IPv6** > **Address Resolution**


 Select to enable duplicate address detection (DAD), which then allows you to specify the number of **DAD** **Attempts**.




 DAD Attempts


 Specify the number of DAD attempts within the neighbor solicitation interval (**NS Interval**) before the attempt to identify neighbors fails (range is 1 to 10; default is 1).




 Reachable Time


 Specify the length of time, in seconds, that a neighbor remains reachable after a successful query and response (range is 1 to 36,000; default is 30).




 NS Interval (sec)


 Specify the length of time, in seconds, before a DAD attempt failure is indicated (range is 1 to 3,600; default is 1).




 Enable NDP Monitoring


 Select to enable Neighbor Discovery Protocol monitoring. When enabled, you can select the NDP ( in Features column) and view information such as the IPv6 address of a neighbor the firewall has discovered, the corresponding MAC address and User-ID (on a best-case basis).




 Enable Router Advertisement


 **Aggregated Ethernet Interface** > **IPv6** > **Router Advertisement**


 Select to provide Neighbor Discovery on IPv6 interfaces and configure the other fields in this section. IPv6 DNS clients that receive the router advertisement (RA) messages use this information.
 RA enables the firewall to act as a default gateway for IPv6 hosts that are not statically configured and to provide the host with an IPv6 prefix for address configuration. You can use a separate DHCPv6 server in conjunction with this feature to provide DNS and other settings to clients.
 This is a global setting for the interface. If you want to set RA options for individual IP addresses, **Add** and configure an IPv6 address in the IP address table. If you set RA options for any IP address, you must **Enable Router Advertisement** for the interface.




 Min Interval (sec)


 Specify the minimum interval, in seconds, between RAs that the firewall will send (range is 3 to 1,350; default is 200). The firewall will send RAs at random intervals between the minimum and maximum values you configure.




 Max Interval (sec)


 Specify the maximum interval, in seconds, between RAs that the firewall will send (range is 4 to 1,800; default is 600). The firewall will send RAs at random intervals between the minimum and maximum values you configure.




 Hop Limit


 Specify the hop limit to apply to clients for outgoing packets (range is 1 to 255; default is 64). Enter **0** for no hop limit.




 Link MTU


 Specify the link maximum transmission unit (MTU) to apply to clients. Select **unspecified** for no link MTU (range is 1,280 to 9,192; default is unspecified).




 Reachable Time (ms)


 Specify the reachable time, in milliseconds, that the client will use to assume a neighbor is reachable after receiving a reachability confirmation message. Select **unspecified** for no reachable time value (range is 0 to 3,600,000; default is unspecified).




 Retrans Time (ms)


 Specify the retransmission timer that determines how long the client will wait, in milliseconds, before retransmitting neighbor solicitation messages. Select **unspecified** for no retransmission time (range is 0 to 4,294,967,295; default is unspecified).




 Router Lifetime (sec)


 Specify how long, in seconds, the client will use the firewall as the default gateway (range is 0 to 9,000; default is 1,800). Zero specifies that the firewall is not the default gateway. When the lifetime expires, the client removes the firewall entry from its Default Router List and uses another router as the default gateway.




 Router Preference


 If the network segment has multiple IPv6 routers, the client uses this field to select a preferred router. Select whether the RA advertises the firewall router as having a **High**, **Medium** (default), or **Low** priority relative to other routers on the segment.




 Managed Configuration


 Select to indicate to the client that addresses are available via DHCPv6.




 Other Configuration


 Select to indicate to the client that other address information (such as DNS-related settings) is available via DHCPv6.




 Consistency Check


 **Aggregated Ethernet Interface** > **IPv6** > **Router Advertisement (cont)**


 Select if you want the firewall to verify that RAs sent from other routers are advertising consistent information on the link. The firewall logs any inconsistencies in a system log; the type is **ipv6nd**.




 Include DNS information in Router Advertisement


 **Aggregate Ethernet Interface** > **IPv6** > **DNS Support, Type = Static**


 Select for the firewall to send DNS information in NDP router advertisement (RA) messages from this IPv6 Aggregated Ethernet interface. The other DNS Support fields in this table are visible only after you select this option. (The **DNS Support** tab is available after you **Enable Router Advertisement** on the `Router Advertisement` tab.)




 Server



 **Add** one or more recursive DNS (RDNS) server addresses for the firewall to send in NDP router advertisements from this IPv6 Aggregated Ethernet interface. RDNS servers send a series of DNS lookup requests to root DNS servers and authoritative DNS servers to ultimately provide an IP address to the DNS client.
 You can configure a maximum of eight RDNS Servers that the firewall sends—in the order listed from top to bottom—in an NDP router advertisement to the recipient, which then uses those addresses in the same order. Select a server and **Move Up** or **Move Down** to change the order of the servers or **Delete** a server when you no longer need it.




 Lifetime



 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement that it can use the RDNS Servers to resolve domain names (range is the value of [Max Interval (sec)](aggregate-ethernet-ae-interface.html#ID0ESDIT) to twice the Max Interval; default is 1,200).




 Domain Search List



 **Add** and configure one or more domain names (suffixes) for the DNS search list (DNSSL). The maximum suffix length is 255 bytes.
 A DNS search list is a list of domain suffixes that a DNS client router appends (one at a time) to an unqualified domain name before it enters the name into a DNS query, thereby using a fully qualified domain name in the DNS query. For example, if a DNS client tries to submit a DNS query for the name “quality” without a suffix, the router appends a period and the first DNS suffix from the DNS search list to the name and transmits the DNS query. If the first DNS suffix on the list is “company.com”, the resulting DNS query from the router is for the fully qualified domain name “quality.company.com”.
 If the DNS query fails, the router appends the second DNS suffix from the list to the unqualified name and transmits a new DNS query. The router tries DNS suffixes until a DNS lookup is successful (ignores the remaining suffixes) or until the router has tried all of suffixes on the list.
 Configure the firewall with the suffixes you want to provide to the DNS client router in a Neighbor Discovery DNSSL option; the DNS client receiving the DNSSL option uses the suffixes in its unqualified DNS queries.
 You can configure a maximum of eight domain names (suffixes) for a DNS search list that the firewall sends—in order listed from top to bottom—in an NDP router advertisement to the recipient, which uses them in the same order. Select a suffix and **Move Up** or **Move Down** to change the order of the suffixes or **Delete** a suffix from the list when you no longer need it.




 Lifetime


 **Aggregate Ethernet Interface** > **IPv6** > **DNS Support, Type = Static**


 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement that it can use a domain name (suffix) on the DNS search list (range is the value of [Max Interval (sec)](aggregate-ethernet-ae-interface.html#ID0ESDIT) to twice the Max Interval; default is 1,200).




 DNS Recursive Name Server


 **Aggregate Ethernet Interface** > **IPv6** > **DNS Support, Type = DHCPv6 Client or Inherited**


 Enable and select:



| • | **DHCPv6**—To have the DHCPv6 Server send the DNS Recursive Name Server information. |
| --- | --- |






| • | **Manual**—To manually configure the DNS Recursive Name Server. |
| --- | --- |



 If you choose **Manual**, **Add** a recursive DNS (RDNS) **Server** address for the firewall to send in NDP router advertisements from this IPv6 VLAN interface. RDNS servers send a series of DNS lookup requests to root DNS servers and authoritative DNS servers to ultimately provide an IP address to the DNS client.
 You can configure a maximum of eight RDNS servers that the firewall sends— in the order listed from top to bottom—in an NDP router advertisement to the recipient, which then uses them in the same order. Select a server and **Move Up** or **Move Down** to change the order of the servers or **Delete** a server from the list when you no longer need it.
 Enter a **Lifetime** (in seconds) which is the maximum length of time the client can use the specific RDNS server to resolve domain names. Range is 4 to 3,600; default is 1,200.




 Domain Search List


 **Aggregate Ethernet Interface** > **IPv6** > **DNS Support, Type = DHCPv6 Client or Inherited**


 Enable and select:



| • | **DHCPv6**—To have the DHCPv6 Server send the Domain Search List information. |
| --- | --- |






| • | **Manual**—To manually configure the Domain Search List. |
| --- | --- |



 If you choose **Manual**, **Add** and configure one or more **Domain** names (suffixes) for the DNS search list (DNSSL). The maximum suffix length is 255 bytes.
 A DNS search list is a list of domain suffixes that a DNS client router appends (one at a time) to an unqualified domain name before it enters the name into a DNS query, thereby using a fully qualified domain name in the DNS query. For example, if a DNS client tries to submit a DNS query for the name “quality” without a suffix, the router appends a period and the first DNS suffix from the DNS search list to the name and then transmits the DNS query. If the first DNS suffix on the list is “company.com”, the resulting DNS query from the router is for the fully qualified domain name “quality.company.com”.
 If the DNS query fails, the router appends the second DNS suffix from the list to the unqualified name and transmits a new DNS query. The router tries DNS suffixes until a DNS lookup is successful (ignores the remaining suffixes) or until the router has tried all of suffixes on the list.
 Configure the firewall with the suffixes that you want to provide to the DNS client router in a Neighbor Discovery DNSSL option; the DNS client receiving the DNSSL option uses the suffixes in its unqualified DNS queries.
 You can configure a maximum of eight domain names (suffixes) for a DNS search list that the firewall sends—in order listed from top to bottom—in an NDP router advertisement to the recipient, which uses those addresses in the same order. Select a suffix and **Move Up** or **Move Down** to change the order or **Delete** a suffix from the list when you no longer need it.
 Enter a **Lifetime** in seconds, which is the maximum length of time the client can use the specific Domain Search List. Range is 4 to 3,600; default is 1,200.



 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)