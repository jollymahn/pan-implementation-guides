# Layer 3 Interface

*Network : Network &gt; Interfaces : Layer 3 Interface*

Layer 3 Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




Configure an Ethernet Layer 3 interface to which you can route traffic.



| Layer 3 Interface Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **Layer3 Interface** | The read-only **Interface Name** field displays the name of the physical interface you selected. |
| Comment | Enter a user-friendly description of the interface. | |
| Interface Type | Select **Layer3**. | |
| NetFlow Profile | If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the NetFlow profile or select **NetFlow Profile** to create a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the interface. | |
| Virtual Router | **Layer3 Interface** > **Config** | Assign a virtual router to the interface, or click **Virtual Router** to define a new one (see [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)). Select **None** to remove the current virtual router assignment from the interface. |
| Logical Router | Assign a logical router to the interface, or click **Logical Router** to define a new one (see [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)). Select **None** to remove the current logical router assignment from the interface. | |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system (vsys) for the interface or select **Virtual System** to define a new vsys. | |
| Security Zone | Select a security zone for the interface or select **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. | |
| Enable SD-WAN | **Layer3 Interface** > **IPv4** | Select **Enable SD-WAN** to enable SD-WAN functionality for the Ethernet interface. |
| Enable Bonjour Reflector | (`PA-220, PA-800, and PA-3200 series only`) When you enable this option, the firewall forwards Bonjour multicast advertisements and queries received on and forwarded to this interface to all other L3 and AE interfaces and subinterfaces where you enable this option. This helps ensure user access and device discoverability in network environments that use segmentation to route traffic for security or administrative purposes. You can enable this option on up to 16 interfaces. | |
| IP | **Layer3 Interface** > **IPv4, Type = Static** | **Add** and perform one of the following steps to specify a static IP address and network mask for the interface or AE interface. • |






| • | Select an existing address object of type **IP netmask**. |
| --- | --- |






| • | Create an **Address** object of type **IP netmask**. |
| --- | --- |



 You can enter multiple IP addresses for the interface. The forwarding information base (FIB) your system uses determines the maximum number of IP addresses.
 **Delete** an IP address when you no longer need it.




 Next Hop Gateway


 If you selected **Enable SD-WAN**, enter the IPv4 address of the SD-WAN gateway.




 Enable


 **Layer3 Interface** > **IPv4** > **General, Type = PPPoE**


 Select **Enable** to activate the interface for Point-to-Point Protocol over Ethernet (PPPoE) termination. The interface is a PPPoE termination point to support connectivity in a Digital Subscriber Line (DSL) environment where there is a DSL modem but no other PPPoE device to terminate the connection.




 Username


 Enter the username your ISP provided for the point-to-point connection.




 Password and Confirm Password


 Enter the password and confirm the password.




 Show PPPoE Client Runtime Info


 Select to view information about the PPPoE interface.




 Authentication


 **Layer3 Interface** > **IPv4** > **Advanced, Type = PPPoE**


 Select an authentication method:



| • | **CHAP**—Firewall uses Challenge Handshake Authentication Protocol—[RFC-1994](https://www.ietf.org/rfc/rfc1994.txt)—on the PPPoE interface. |
| --- | --- |






| • | **PAP**—(default) Firewall uses Password Authentication Protocol (PAP) on the PPPoE interface. PAP is less secure than CHAP; PAP sends usernames and passwords in plain text. |
| --- | --- |






| • | **auto**—Firewall negotiates the authentication method (CHAP or PAP) with the PPPoE server. |
| --- | --- |







 Static Address


 Request from the PPPoE server a desired IPv4 address. PPPoE server may assign that address or another address.




 automatically create default route pointing to peer


 Select this option to automatically create a default route that points to the default gateway that the PPPoE server provides.




 Default Route Metric


 Enter the default route metric (priority level) for the PPPoE connection (default is 10). A route with a lower number has higher priority during route selection. For example, a route with a metric of 10 is used before a route with a metric of 100.




 Access Concentrator


 If your ISP provided the name of an Access Concentrator, enter it. Firewall will connect with this Access Concentrator on the IPS end. This is a string value of 0 to 255 characters.




 Service


 Firewall (PPPoE client) can provide the desired service request to the PPPoE server. It is a string value of 0 to 255 characters.




 Passive


 Firewall (PPPOE client) waits for the PPPoE server to initiate a connection. If this is not enabled, firewall initiates a connection.




 Enable


 **Layer3 Interface** > **IPv4, Type = DHCP Client**


 Enable the interface to act as a Dynamic Host Configuration Protocol (DHCP) client and receive a dynamically assigned IP address.
 Note:



| | Firewalls that are in a high availability (HA) active/active configuration don’t support DHCP Client. |
| --- | --- |







 Automatically create default route pointing to default gateway provided by server


 Select this option to cause the firewall to create a static route to a default gateway. The default gateway is useful when clients are trying to access many destinations that don’t need to have routes maintained in a routing table on the firewall.




 Send Hostname


 Select this option to assign a hostname to the DHCP client interface and send that hostname (Option 12) to a DHCP server, which can register the hostname with the DNS server. The DNS server can then automatically manage hostname-to-dynamic IP address resolutions. External hosts can identify the interface by its hostname. The default value indicates system-hostname, which is the firewall hostname that you set in **Device** > **Setup** > **Management** > **General Settings**. Alternatively, enter a hostname for the interface, which can be a maximum of 64 characters, including uppercase and lowercase letters, numbers, period, hyphen, and underscore.




 Default Route Metric


 **Layer3 Interface** > **IPv4, Type = DHCP Client**


 Enter a default route metric (priority level) for the route between the firewall and the DHCP server (range is 1 to 65,535; there is no default metric). A route with a lower number has higher priority during route selection. For example, a route with a metric of 10 is used before a route with a metric of 100.




 Show DHCP Client Runtime Info


 Select this option to see all of the settings the client has inherited from its DHCP server, including DHCP lease status, dynamic IP address assignment, subnet mask, gateway, and server settings (DNS, NTP, domain, WINS, NIS, POP3, and SMTP).




 Enable IPv6 on the interface


 **Layer3 Interface** > **IPv6**


 Select to enable IPv6 addressing on the interface.




 Enable SD-WAN


 Select **Enable SD-WAN** to enable SD-WAN functionality for the Ethernet interface.




 Interface ID


 Enter the 64-bit extended unique identifier (**EUI-64**) in hexadecimal format (for example, 00:26:08:FF:FE:DE:4E:29). If you leave this field blank, the firewall uses the EUI-64 generated from the MAC address of the physical interface. If you enable the **Use interface ID as host portion** option when adding an address, the firewall uses the interface ID as the host portion of that address.




 Address


 **Layer3 Interface** > **IPv6** > **Address Assignment, Type = Static**


 Add an IPv6 address and prefix length (for example, 2001:400:f00::1/64). Alternatively, select an existing IPv6 address object or create a new IPv6 address object.




 Enable address on interface


 Select to enable the IPv6 address on the interface.




 Use interface ID as host portion


 Select to use the **Interface ID** as the host portion of the IPv6 address.




 Anycast


 Select to include routing through the nearest node.




 Next Hop Gateway


 Select a variable or enter the IPv6 address of the next hop gateway.




 Send Router Advertisement


 **Layer3 Interface** > **IPv6** > **Address Assignment, Type = Static**


 Select to enable router advertisement (RA) for this IP address. (You must also enable the global **Enable Router Advertisement** option on the interface.) For details on RA, see Enable Router Advertisement in this table. The following fields apply only if you Enable Router Advertisement:



| • | **Valid Lifetime**—Length of time, in seconds, that the firewall considers the address valid. The valid lifetime must equal or exceed the **Preferred Lifetime**. The default is 2,592,000. |
| --- | --- |






| • | **Preferred Lifetime**—Length of time, in seconds, that the valid address is preferred, which means the firewall can use it to send and receive traffic. After the preferred lifetime expires, the firewall cannot use the address to establish new connections, but any existing connections are valid until the **Valid Lifetime** expires. The default is 604,800. |
| --- | --- |






| • | **On-link**—Select if systems that have addresses within the prefix are reachable without a router. |
| --- | --- |






| • | **Autonomous**—Select if systems can independently create an IP address by combining the advertised prefix with an interface ID. |
| --- | --- |







 Accept Router Advertised Route


 **Layer3 Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client**


 Select to allow the DHCPv6 Client to accept the RA from the DHCPv6 server.




 Default Route Metric


 Enter a default route metric for the route from the interface to the ISP; range is 1 to 65,535; default is 10.




 Preference


 Select the preference of the DHCPv6 Client interface (**low**, **medium**, or **high**) so that, in the event you have two interfaces (each connected to a different ISP for redundancy), you can assign the interface to one ISP a higher preference than the interface to the other ISP. The ISP connected to the preferred interface will be the ISP that provides the delegated prefix to send to a host-facing interface. If the interfaces have the same preference, both ISPs provide a delegated prefix and the host decides which prefix to use.




 Enable IPv6 Address


 **Layer3 Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client** > **DHCPv6 Options**


 Enable the IPv6 Address received for this DHCPv6 Client.




 Non-Temporary Address


 Request a Non-Temporary Address for the firewall to assign to this DHCPv6 Client interface that faces the delegating router and ISP. (This address type has a longer lifespan than a Temporary Address).
 Fastpath:
 Whether you request a Non-Temporary Address or Temporary Address for the interface is based on your discretion and the capability of the DHCPv6 server; some servers can provide only a temporary address. The best practice is to select both Non-Temporary Address and Temporary Address, in which case the firewall will prefer the Non-Temporary Address.




 Temporary Address


 Request a Temporary Address for the firewall to assign to this DHCPv6 Client interface that faces the delegating router and ISP. Select Temporary Address for a greater level of security because the address is intended to be used for a short period of time.




 Rapid Commit


 Select to use the DHCP process of Solicit and Reply messages, rather than the process of Solicit, Advertise, Request, and Reply messages.




 Enable Prefix Delegation


 **Layer3 Interface** > **IPv6** > **Address Assignment, Type = DHCPv6 Client** > **Prefix Delegation**


 Enable Prefix Delegation to allow the firewall to support prefix delegation functionality. This means that the interface accepts a prefix from the upstream DHCPv6 server and places the prefix into the Prefix Pool you select, from which the firewall delegates a prefix to a host via RA. The ability to enable or disable prefix delegation for an interface allows the firewall to support multiple ISPs (one ISP per interface). Enabling prefix delegation on this interface controls which ISP provides the prefix.




 DHCP Prefix Length Hint


 Select to enable the firewall to send a preferred DHCPv6 prefix length to the DHCPv6 server.




 DHCP Prefix Length (bits)


 Enter the preferred DHCPv6 prefix length in the range from 48 to 64 bits, which is sent as the hint to the DHCPv6 server. The DHCPv6 server has the discretion to send whatever prefix length it chooses.
 Note:



| | Requesting a prefix length of 48, for example, leaves 16 bits remaining for subnets (64-48), which indicates you require many subdivisions of that prefix to delegate. On the other hand requesting a prefix length of 63 leaves 1 bit for delegating only two subnets. Of the 128 bits, there are still 64 more bits for host address. The interface can receive a /48 prefix, but delegate a /64 prefix, for example, which means the firewall is subdividing the prefix it delegates. |
| --- | --- |







 Prefix Pool Name


 Enter a name for the prefix pool where the firewall stores the received prefix. The name must be unique and contain a maximum of 63 alphanumeric characters, hyphens, periods, and underscores.
 Tip:
 Use a prefix pool name that reflects the ISP for easy recognition.




 Enable


 **Layer3 Interface** > **IPv6** > **Type = PPPoEv6 Client** > **General**


 Enable the interface.




 Apply IPv4 Parameters


 If you already have an interface configured for PPPoE client (IPv4), you can optionally apply the IPv4 parameters to the PPPoEv6 client. (The parameters copied are authentication type, username, password, access concentrator name, service, and passive setting.)
 If you subsequently reconfigure a parameter on the PPPoE IPv4 client, the new setting is copied to the PPPoE IPv6 client. If you reconfigure a parameter of either client, the session is reestablished, which causes traffic disruption.
 Even if you configure a PPPoE IPv4 client and a PPPoE IPv6 client independently, you must configure the two clients with the same authentication type, username, password, access concentrator name, service, and passive setting.




 Passive


 If you want the PPPoEv6 client (interface) to wait for the PPPoEv6 server to initiate a connection, select Passive. If Passive isn't selected, the interface is allowed to initiate a connection.




 Authentication


 Select the type of authentication for the interface.



| • | **CHAP**—Interface uses Challenge Handshake Authentication Protocol (CHAP). |
| --- | --- |






| • | **PAP**—(default) Interface uses Password Authentication Protocol (PAP). PAP sends usernames and passwords in plain text, and is less secure than CHAP. |
| --- | --- |






| • | **auto**—Interface negotiates the authentication method (CHAP or PAP) with the PPPoEv6 server. |
| --- | --- |



 If you also configured this interface as a PPPoE IPv4 client, you must configure the two clients with the same authentication type, username, password, access concentrator name, and service.




 Username


 Enter the username for authentication.




 Password and Confirm Password


 Enter the password and confirm the password.




 Access Concentrator


 If your ISP told you the name of the access concentrator to connect to,enter it (a string of 0 to 255 characters).




 Service


 If you want the interface as a PPPoEv6 client to request a specific service from the PPPoEv6 server, enter the service (a string of 0 to 255 characters).




 Accept Router Advertised Route


 **Layer3 Interface** > **IPv6** > **Type = PPPoEv6 Client** > **Address Assignment**


 Select to allow the PPPoEv6 client to accept the Router Advertisement (RA).




 Default Route Metric


 Specify the default route metric for the router from the interface to the ISP; range is 1 to 65,535; default is 10.




 Preference


 Set the preference of the PPPoE client interface: **High** (default), **Medium**, or **Low**. In the event you have two interfaces (each connected to a different ISP for redundancy), you can assign the interface to one ISP a higher preference than the interface to the other ISP. The ISP connected to the preferred interface will be the ISP that provides the delegated prefix to send to a host-facing interface. If the client interfaces have the same preference, both ISPs provide a delegated prefix and the host decides which prefix to use.




 Enable Autoconfig


 **Layer3 Interface** > **IPv6** > **Type = PPPoEv6 Client** > **Address Assignment** > **Autoconfig**


 Select to have the firewall autoconfigure the IPv6 address for the PPPoEv6 client interface using the IPv6 Control Protocol (IPv6CP) Interface Identifier and the prefix from the RA (using SLAAC).




 Enable


 **Layer3 Interface** > **IPv6** > **Type = PPPoEv6 Client** > **Address Assignment** > **DHCPv6**


 Enable the PPPoEv6 client to use DHCPv6.




 Enable IPv6 Address


 **Layer3 Interface** > **IPv6** > **Type = PPPoEv6 Client** > **Address Assignment** > **DHCPv6** > **DHCPv6 Options**


 Enable the PPPoEv6 client to use address assigned by the DHCPv6 server.




 Rapid Commit


 Select to use the DHCPv6 process of Solicit and Reply messages (two messages) rather than the process of Solicit, Advertise, Request, and Reply messages (four messages).




 DUID Type


 Select the DHCPv6 Unique Identifier (DUID) type that the interface uses to identify itself to the DHCPv6 server:



| • | **DUID-LLT**—the Link-Layer address of the interface, concatenated with a timestamp. |
| --- | --- |






| • | **DUID-LL**—the Link-Layer address of the interface. |
| --- | --- |







 Enable Prefix Delegation


 **Layer3 Interface** > **IPv6** > **Type = PPPoEv6 Client** > **Address Assignment** > **DHCPv6** > **Prefix Delegation**


 If you chose DHCPv6 for address assignment, select **Prefix Delegation** and **Enable Prefix Delegation**. This means that the interface accepts a prefix from the upstream DHCPv6 server and places the prefix into the Prefix Pool, from which the firewall delegates a prefix to a host through an RA. The ability to enable or disable prefix delegation for an interface allows the firewall to support multiple ISPs (one ISP per interface). Enabling prefix delegation on this interface controls which ISP provides the prefix. The delegated prefix is used on the host-facing interface, and its IPv6 address is constructed with the MAC address and EUI-64 input.




 DHCP Prefix Length Hint


 Select to enable the firewall to send a preferred DHCPv6 prefix length to the DHCPv6 server.




 DHCP Prefix Length (bits)


 Enter the DHCPv6 prefix length that you prefer the DHCPv6 server to send; range is 0 to 128; default is 48. The DHCPv6 server has the discretion to send whatever prefix length it chooses.
 Tip:**Requesting a prefix length of 48, for example, leaves 16 bits remaining for subnets (64 minus 48), which indicates you require many subdivisions of that prefix to delegate. Requesting a prefix length of 63 leaves 1 bit for delegating only two subnets. Of the 128 bits, there are still 64 more bits for a host address.
 Tip:The interface can receive a /48 prefix, but delegate a /64 prefix, for example, which means the firewall is subdividing the prefix it delegates.




 Prefix Pool Name


 Enter the prefix pool name of the pool where the firewall stores the received prefix. The name must be unique and contain a maximum of 63 alphanumeric characters, hyphens, periods, and underscores.
 Tip:Use a prefix pool name that reflects the ISP for easy recognition.




 Name


 **Layer3 Interface** > IPv6** > **Address Assignment, Type = Inherited**


 **Add** a pool by entering a pool name (a maximum of 63 alphanumeric characters, hyphens, periods, and underscores).




 Address Type


 Select one:



| • | **GUA from Pool**—Global Unicast Address (GUA) that comes from the Prefix Pool chosen. |
| --- | --- |






| • | **ULA**—Unique Local Address is a private address in the address range fc00::/7 for connectivity within a private network. Select ULA if there is no DHCPv6 server. |
| --- | --- |







 Enable on Interface


 Enable the address on the interface.




 Prefix Pool


 Select the Prefix Pool from which to get the GUA.




 Assignment Type


 **Layer3 Interface** > **IPv6** > **Address Assignment, Type = Inherited**


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




 Enable Duplicate Address Detection


 **Layer3 Interface** > **IPv6** > **Address Resolution**


 Select to enable duplicate address detection (DAD), then configure the other fields in this section.




 DAD Attempts


 Specify the number of DAD attempts within the neighbor solicitation interval (**NS Interval**) before the attempt to identify neighbors fails (range is 1 to 10; default is 1).




 Reachable Time (sec)


 Specify the length of time, in seconds, that a neighbor remains reachable after a successful query and response (range is 1 to 36,000; default is 30).




 NS Interval (sec)


 Specify the number of seconds for DAD attempts before failure is indicated (range is 1 to 3,600; default is 1).




 Enable NDP Monitoring


 Select to enable Neighbor Discovery Protocol (NDP) monitoring. When enabled, you can select NDP ( in the Features column) to view information about a neighbor the firewall discovered, such as the IPv6 address, the corresponding MAC address, and the User-ID (on a best-case basis).




 Enable Router Advertisement


 **Layer3 Interface** > **IPv6** > **Router Advertisement, Type = Static or Type = Inherited**


 To provide Neighbor Discovery on IPv6 interfaces, select and configure the other fields in this section. IPv6 DNS clients that receive the router advertisement (RA) messages use this information.
 RA enables the firewall to act as a default gateway for IPv6 hosts that are not statically configured and to provide the host with an IPv6 prefix for address configuration. You can use a separate DHCPv6 server in conjunction with this feature to provide DNS and other settings to clients.
 This is a global setting for the interface. If you want to set RA options for individual IP addresses, **Add** and configure an IPv6 address in the IP address table. If you set RA options for any IPv6 address, you must **Enable Router Advertisement** for the interface.




 Min Interval (sec)


 Specify the minimum interval, in seconds, between RAs that the firewall will send (range is 3 to 1,350; default is 200). The firewall sends RAs at random intervals between the minimum and maximum values you configure.




 Max Interval (sec)


 Specify the maximum interval, in seconds, between RAs that the firewall will send (range is 4 to 1,800; default is 600). The firewall sends RAs at random intervals between the minimum and maximum values you configure.




 Hop Limit


 Specify the hop limit to apply to clients for outgoing packets (range is 1 to 255; default is 64) or select **unspecified**, which maps to a system default.




 Link MTU


 **Layer3 Interface** > **IPv6** > **Router Advertisement, Type = Static or Type = Inherited**


 Specify the link maximum transmission unit (MTU) to apply to clients (range is 1,280 to 1,500) or default to **unspecified**, which maps to a system default.




 Reachable Time (ms)


 Specify the reachable time (in milliseconds) that the client will use to assume a neighbor is reachable after receiving a reachability confirmation message (range is 0 to 3,600,000) or default to **unspecified**, which maps to a system default.




 Retrans Time (ms)


 Specify the retransmission timer that determines how long the client will wait (in milliseconds) before retransmitting neighbor solicitation messages (range is 0 to 4,294,967,295) or default to **unspecified**, which maps to a system default.




 Router Lifetime (sec)


 Specify how long, in seconds, the client will use the firewall as the default gateway (range is 0 to 9,000; default is 1,800). Zero specifies that the firewall is not the default gateway. When the lifetime expires, the client removes the firewall entry from its Default Router List and uses another router as the default gateway.




 Router Preference


 If the network segment has multiple IPv6 routers, the client uses this field to select a preferred router. Select whether the RA advertises the firewall router as having a **High**, **Medium** (default), or **Low** priority relative to other routers on the segment.




 Managed Configuration


 **Layer3 Interface** > **IPv6** > **Router Advertisement, Type = Static or Type = Inherited**


 Select to indicate to the client that addresses are available via DHCPv6.




 Other Configuration


 Select to indicate to the client that other address information (for example, DNS-related settings) is available via DHCPv6.




 Consistency Check


 Select if you want the firewall to verify that RAs sent from other routers are advertising consistent information on the link. The firewall logs any inconsistencies in a system log; the type is **ipv6nd**.




 Include DNS information in Router Advertisement


 **Layer3 Interface** > **IPv6** > **DNS Support, Type = Static**


 DNS Support is available if you **Enable Router Advertisement** on the Router Advertisement tab.
 Select for the firewall to send DNS information in NDP router advertisements from this IPv6 Ethernet interface. The other DNS Support fields (Server, Lifetime, Suffix, and Lifetime) are visible only after you select this option.




 Server


 **Add** one or more recursive DNS (RDNS) server addresses for the firewall to send in NDP router advertisements from this IPv6 Ethernet interface. RDNS servers send a series of DNS look up requests to root DNS and authoritative DNS servers to ultimately provide an IP address to the DNS client.
 You can configure a maximum of eight RDNS Servers that the firewall sends—in order listed from top to bottom—in an NDP router advertisement to the recipient, which then uses them in the same order. Select a server and **Move Up** or **Move Down** to change the order of the servers or **Delete** a server from the list when you no longer need it.




 Lifetime


 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement before the client can use an RDNS server to resolve domain names (range is **Max Interval (sec)** to twice **Max Interval (sec)**; default is 1,200).




 Domain Search List


 **Layer3 Interface** > **IPv6** > **DNS Support, Type = Static**
 **Layer3 Interface** > **IPv6** > **DNS Support**


 **Add** one or more domain names (suffixes) for the DNS search list (DNSSL). Maximum length is 255 bytes.
 A DNS search list is a list of domain suffixes that a DNS client router appends (one at a time) to an unqualified domain name before it enters the name into a DNS query, thereby using a fully qualified domain name in the query. For example, if a DNS client tries to submit a DNS query for the name “quality” without a suffix, the router appends a period and the first DNS suffix from the DNS search list to the name and transmits the DNS query. If the first DNS suffix on the list is “company.com”, the resulting query from the router is for the fully qualified domain name “quality.company.com”.
 If the DNS query fails, the router appends the second DNS suffix from the list to the unqualified name and transmits a new DNS query. The router uses the DNS suffixes until a DNS lookup is successful (ignores the remaining suffixes) or until the router has tried all of suffixes on the list.
 Configure the firewall with the suffixes that you want to provide to the DNS client router in a Neighbor Discovery DNSSL option; the DNS client receiving the DNSSL option uses the suffixes in its unqualified DNS queries.
 You can configure a maximum of 8 domain names (suffixes) for a DNS search list option that the firewall sends—in order listed from top to bottom—in an NDP router advertisement to the recipient, which uses them in the same order. Select a suffix and **Move Up** or **Move Down** to change the order or **Delete** a suffix when you no longer need it.




 Lifetime


 Enter the maximum number of seconds after the IPv6 DNS client receives the router advertisement that it can use a domain name (suffix) on the DNS search list (range is the value of **Max Interval (sec)** to twice **Max Interval (sec)**; default is 1,200).




 DNS Recursive Name Server


 **Layer3 Interface** > **IPv6** > **DNS Support, Type = DHCPv6 Client, PPPoEv6 Client,or Inherited**


 Enable and select:



| • | **DHCPv6**—To have the DHCPv6 Server send the DNS Recursive Name Server information. |
| --- | --- |






| • | **Manual**—To manually configure the DNS Recursive Name Server. |
| --- | --- |



 If you choose **Manual**, **Add** the IPv6 address of a recursive DNS (RDNS) **Server** (for example, 2001:4860:4860:0:0:8888) for the firewall to send in NDP router advertisements from this IPv6 VLAN interface. RDNS servers send a series of DNS lookup requests to root DNS servers and authoritative DNS servers to ultimately provide an IP address to the DNS client.
 You can configure a maximum of eight RDNS servers that the firewall sends— in the order listed from top to bottom—in an NDP router advertisement to the recipient, which then uses them in the same order. Select a server and **Move Up** or **Move Down** to change the order of the servers or **Delete** a server from the list when you no longer need it. Enter a **Lifetime** in seconds, which is the maximum length of time the client can use the specific RDNS server to resolve domain names. Range is 4 to 3,600; default is 1,200.




 Domain Search List


 **Layer3 Interface** > **IPv6** > **DNS Support, Type = DHCPv6 Client, PPPoEv6 Client, or Inherited**


 Enable and select:



| • | **DHCPv6**—To have the DHCPv6 Server send the Domain Search List information. |
| --- | --- |






| • | **Manual**—To manually configure the Domain Search List. |
| --- | --- |



 If you choose **Manual**, **Add** and configure one or more **Domain** names (suffixes) for the DNS search list (DNSSL). The maximum suffix length is 255 bytes.
 A DNS search list is a list of domain suffixes that a DNS client router appends (one at a time) to an unqualified domain name before it enters the name into a DNS query, thereby using a fully qualified domain name in the DNS query. For example, if a DNS client tries to submit a DNS query for the name “quality” without a suffix, the router appends a period and the first DNS suffix from the DNS search list to the name and then transmits the DNS query. If the first DNS suffix on the list is “company.com”, the resulting DNS query from the router is for the fully qualified domain name “quality.company.com”.
 If the DNS query fails, the router appends the second DNS suffix from the list to the unqualified name and transmits a new DNS query. The router tries DNS suffixes until a DNS lookup is successful (ignores the remaining suffixes) or until the router has tried all of suffixes on the list.
 Configure the firewall with the suffixes that you want to provide to the DNS client router in a Neighbor Discovery DNSSL option; the DNS client receiving the DNSSL option uses the suffixes in its unqualified DNS queries.
 Enter a **Lifetime** in seconds, which is the maximum length of time the client can use the specific Domain Search List. Range is 4 to 3,600; default is 1,200.
 You can configure a maximum of eight domain names (suffixes) for a DNS search list that the firewall sends—in order listed from top to bottom—in an NDP router advertisement to the recipient, which uses those addresses in the same order. **Delete** a suffix from the list when you no longer need it.




 SD-WAN Interface Status


 **Layer3 Interface** > **SD-WAN**


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


 **Ethernet Interface** > **Advanced** > **Link Settings**


 Select the interface speed in Mbps, or select **auto** to have the firewall automatically determine the speed.




 Link Duplex


 Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**).




 Link State


 Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically (**auto**).




 PoE Rsvd Pwr


 **Ethernet Interface** > **Advanced** > **PoE Settings**
 (`Supported firewalls only`)


 Select the amount of allocated power in Watts if PoE is enabled.




 PoE Enable


 Select to enable PoE on this interface.
 CAUTION:**When using Panorama, non-PoE interfaces display the option to enable or disable PoE. To avoid a commit failure, ensure that **PoE Enable** remains selected on these non-PoE interfaces.




 Management Profile


 Layer3 Interface** > **Advanced** > **Other Info**


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


 **Layer3 Interface** > **Advanced** > **ARP Entries**


 To add one or more static Address Resolution Protocol (ARP) entries, **Add** an IP address and its associated hardware [media access control (MAC)] address. To delete an entry, select the entry and click **Delete**. Static ARP entries reduce ARP processing.




 IPv6 Address
 MAC Address


 **Layer3 Interface** > **Advanced** > **ND Entries**


 To provide neighbor information for Neighbor Discovery Protocol (NDP), **Add** the IPv6 address and MAC address of the neighbor.




 Enable NDP Proxy


 **Layer3 Interface** > **Advanced** > **NDP Proxy**


 Enable Neighbor Discovery Protocol (NDP) proxy for the interface. The firewall will respond to ND packets requesting MAC addresses for IPv6 addresses in this list. In the ND response, the firewall sends its own MAC address for the interface so that the firewall will receive the packets meant for the addresses in the list.
 It is recommended that you enable NDP proxy if you are using Network Prefix Translation IPv6 (NPTv6).
 If you selected **Enable NDP Proxy**, you can filter numerous **Address** entries by entering a filter and clicking Apply Filter (gray arrow).




 Address


 **Add** one or more IPv6 addresses, IP ranges, IPv6 subnets, or address objects for which the firewall will act as NDP proxy. Ideally, one of these addresses is the same address as that of the source translation in NPTv6. The order of addresses does not matter.
 If the address is a subnetwork, the firewall will send an ND response for all addresses in the subnet, so we recommend you also add the IPv6 neighbors of the firewall and then click **Negate** to instruct the firewall not to respond to these IP addresses.




 Negate


 **Negate** an address to prevent NDP proxy for that address. You can negate a subset of the specified IP address range or IP subnet.




 Enable LLDP


 **Layer3 Interface** > **Advanced** > **LLDP**


 Enable Link Layer Discovery Protocol (LLDP) for the interface. LLDP functions at the link layer to discover neighboring devices and their capabilities by sending and receiving LLDP data units to and from neighbors.




 LLDP Profile


 Select an LLDP Profile or create a new [LLDP Profile](network-network-profiles-lldp-profile.html#ID0ETYNW). The profile is the way in which you configure the LLDP mode, enable syslog and SNMP notifications, and configure the optional Type-Length-Values (TLVs) you want transmitted to LLDP peers.




 Settings


 **Layer3 Interface** > **Advanced** > **DDNS**


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


 **Layer3 Interface** > **Advanced** > **DDNS**


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