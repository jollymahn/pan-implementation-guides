# NAT Translated Packet Tab

*Policies : Policies &gt; NAT : NAT Translated Packet Tab*

NAT Translated Packet Tab



| • | Policy > NAT > Translated Packet |
| --- | --- |




For Source Address Translation, select the **Translated Packet** tab to determine the [type of translation](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/nat/source-nat-and-destination-nat.html) to perform on the source, the address, and possibly the port to which the source is translated.


You can also enable Destination Address Translation for an internal host to make it accessible by a public IP address. In this case, you define a public source address and destination address in the **Original Packet** tab for an internal host and, on the **Translated Packet** tab, you configure **Static IP** or **Dynamic IP (with session distribution)** and enter the **Translated Address**. Then, when the public address is accessed, it is translated to the internal (destination) address of the internal host.



| NAT Rule - Translated Packet Settings | Description |
| --- | --- |
| Source Address Translation | Select the **Translation Type** (dynamic or static address pool) and enter an IP address or address range (address1—address2) to which the source address is translated (**Translated Address**). The size of the address range is limited by the type of address pool: • |






| • | **Dynamic IP and Port**—Address selection is based on a hash of the source IP address. For a given source IP address, the firewall uses the same translated source address for all sessions. Dynamic IP and Port (DIPP) source NAT supports approximately 64,000 concurrent sessions on each IP address in the NAT pool. Some models support oversubscription, which allows a single IP to host more than 64,000 concurrent sessions. |
| --- | --- |



 Palo Alto Networks® DIPP NAT supports more NAT sessions than are supported by the number of available IP addresses and ports. With oversubscription, the firewall can use IP address and port combinations two times simultaneously on PA-220, PA-400 Series, PA-800 Series, PA-1400 Series, PA-3410, PA-3420, VM-50, VM-300, and VM-1000-HV firewalls, four times simultaneously on PA-3200 Series, PA-3430, and PA-3440 firewalls, and eight times simultaneously on PA-5200 Series, PA-5400 Series, PA-7050, PA-7080, VM-500, and VM-700 firewalls when destination IP addresses are unique.



| • | **Dynamic IP**—Translates to the next available address in the specified range but the port number remains unchanged. Up to 32,000 consecutive IP addresses are supported. A dynamic IP pool can contain multiple subnets, so you can translate your internal network addresses to two or more separate public subnets. |
| --- | --- |






| • | **Advanced (Dynamic IP/Port Fallback)**—Use this option to create a fallback pool that performs IP and port translation and is used if the primary pool runs out of addresses. You can define addresses for the pool by using the **Translated Address** option or the **Interface Address** option; the latter option is for interfaces that receive an IP address dynamically. When creating a fallback pool, make sure addresses do not overlap with addresses in the primary pool. |
| --- | --- |







 Source Address Translation (cont)





| • | **Static IP**—The same address is always used for the translation and the port is unchanged. For example, if the source range is 192.168.0.1—192.168.0.10 and the translation range is 10.0.0.1—10.0.0.10, address 192.168.0.2 is always translated to 10.0.0.2. The address range is virtually unlimited. |
| --- | --- |



 You must use **Static IP** translation for NPTv6 Source Address Translation. For NPTv6, the prefixes configured for **Translated Address** must be in the format xxxx:xxxx::/yy and the address cannot have an interface identifier (host) portion defined. The range of supported prefix lengths is /32 to /112.



| • | **None**—Translation is not performed. |
| --- | --- |







 Bi-directional


 (`Optional`) Enable bidirectional translation for a **Static IP** source address translation if you want the firewall to create a corresponding translation (NAT or NPTv6) in the opposite direction of the translation you configure.
 Note:



| | If you enable bidirectional translation, you must ensure that you have security policies in place to control the traffic in both directions. Without such policies, the bidirectional feature allows packets to be translated automatically in both directions. |
| --- | --- |







 Destination Address Translation


 Configure the following options to have the firewall perform destination NAT. You typically use Destination NAT to allow an internal server, such as an email server, to be accessible from the public network.




 Translation Type and Translated Address


 Select the type of translation the firewall performs on the destination address:



| • | **None** (default) |
| --- | --- |






| • | **Static IP**—Enter a **Translated Address** as an IP address or range of IP addresses and a **Translated Port** number (1 to 65535) to which the original destination address and port number are translated. If the **Translated Port** field is blank, the destination port is not changed. |
| --- | --- |



 For NPTv6, the prefixes configured for the Destination prefix **Translated Address** must be in the format xxxx:xxxx::/yy. The address cannot have an interface identifier (host) portion defined. The range of supported prefix lengths is /32 to /112.
 Note:



| | Translated Port is not supported for NPTv6 because NPTv6 is strictly prefix translation. The Port and Host address section is simply forwarded unchanged. |
| --- | --- |



 Note:



| | Static IP translation for IPv4 also allows you to **Enable DNS Rewrite** (described below). |
| --- | --- |






| • | **Dynamic IP (with session distribution)**—Select or enter a **Translated Address** that is an FQDN, an address object, or an address group from which the firewall selects the translated address. If the DNS server returns more than one address for an FQDN or if the address object or address group translates into more than one IP address, the firewall distributes sessions among those addresses using the specified **Session Distribution Method**. |
| --- | --- |







 Session Distribution Method


 If you select the destination NAT translation to be to **Dynamic IP (with session distribution)**, it’s possible that the destination translated address (to an FQDN, address object, or address group) can resolve to more than one address. You can choose how the firewall distributes (assigns) sessions among those addresses to provide more balanced session distribution:



| • | **Round Robin**—(default) Assigns new sessions to IP addresses in rotating order. Unless your environment dictates that you choose one of the other distribution methods, use this method. |
| --- | --- |






| • | **Source IP Hash**—Assigns new sessions based on a hash of source IP addresses. If you have incoming traffic from a single source IP address, then select a method other than **Source IP Hash**. |
| --- | --- |






| • | **IP Modulo**—The firewall takes into consideration the source and destination IP address from the incoming packet; the firewall performs an XOR operation and a modulo operation; the result determines to which IP address the firewall assigns new sessions. |
| --- | --- |






| • | **IP Hash**—Assigns new sessions using a hash of the source and destination IP addresses. |
| --- | --- |






| • | **Least Sessions**—Assigns new sessions to the IP address that has the fewest concurrent sessions. If you have many short-lived sessions, **Least Sessions** provides you with a more balanced distribution of sessions. |
| --- | --- |







 Enable DNS Rewrite


 If the destination NAT policy rule type is **ipv4** and the destination address translation type is **Static IP**, the **Enable DNS Rewrite** option is available. You can enable DNS rewrite if you use destination NAT and also use DNS services on one side of the firewall to resolve FQDNs for a client on the other side of the firewall. When the DNS response traverses the firewall, the firewall rewrites the IP address in the DNS response, relative to the original destination address or translated destination address that the DNS response matches in the NAT policy rule. A single NAT policy rule has the firewall perform NAT on packets that match the rule and perform NAT on [IP addresses in DNS responses that match the rule](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/nat/source-nat-and-destination-nat/destination-nat-dns-rewrite-use-cases.html). You must specify how the firewall performs NAT on an IP address in a DNS response relative to the NAT rule—reverse or forward:



| • | **reverse**—(default) If the packet is a DNS response that matches the translated destination address in the rule, translate the DNS response using the reverse translation that the rule uses. For example, if the rule translates 1.1.1.10 to 192.168.1.10, the firewall rewrites a DNS response of 192.168.1.10 to 1.1.1.10. |
| --- | --- |






| • | **forward**—If the packet is a DNS response that matches the original destination address in the rule, translate the DNS response using the same translation the rule uses. For example, if the rule translates 1.1.1.10 to 192.168.1.10, the firewall rewrites a DNS response of 1.1.1.10 to 192.168.1.10. |
| --- | --- |






 Parent topic
 [Policies > NAT](policies-nat.html#ID0E1QXO)