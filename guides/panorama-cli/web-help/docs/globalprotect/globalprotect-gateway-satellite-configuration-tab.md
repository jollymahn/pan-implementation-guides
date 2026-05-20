# GlobalProtect Gateway Satellite Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Gateways : GlobalProtect Gateway Satellite Tab*

GlobalProtect Gateway Satellite Tab



| • | **Network** > **GlobalProtect** > **Gateways** > <gateway-config> > **Satellite** |
| --- | --- |




A satellite is a Palo Alto Networks firewall—typically at a branch office—that acts as a GlobalProtect app to enable it to establish VPN connectivity to a GlobalProtect gateway. Select the **Satellite** tab to define the gateway tunnel and network settings to enable the satellites to establish VPN connections with it. You can also configure routes advertised by the satellites.




| • | Tunnel Settings tab |
| --- | --- |






| • | Network Settings tab |
| --- | --- |






| • | [Route Filter tab](globalprotect-gateway-satellite-configuration-tab.html#ID0EKK31) |
| --- | --- |





| GlobalProtect Gateway Satellite Configuration Settings | Description |
| --- | --- |
| `Tunnel Settings tab` | |
| Tunnel Configuration | Select **Tunnel Configuration** and select an existing **Tunnel Interface**, or select **New Tunnel Interface** from the drop-down. See [Network > Interfaces > Tunnel](network-interfaces-tunnel.html#ID0EBCPT) for more information. • |



 Fastpath:
 Enable **Replay attack detection** to protect GlobalProtect satellites against replay attacks if you enable satellite tunnel configuration.



| • | **Copy TOS**—Copy the Type of Service (ToS) header from the inner IP header to the outer IP header of the encapsulated packets to preserve the original ToS information. |
| --- | --- |






| • | **Configuration refresh interval (hours)**—Specify how often satellites should check the portal for configuration updates (range is 1-48; default is 2). |
| --- | --- |







 Tunnel Monitoring


 Select **Tunnel Monitoring** to enable the satellites to monitor gateway tunnel connections, allowing them to failover to a backup gateway if the connection fails.



| • | **Destination Address**—Specify an **IPv4** or **IPv6** address for the tunnel monitor will use to determine if there is connectivity to the gateway (for example, an IP address on the network protected by the gateway). Alternatively, if you configured an IP address for the tunnel interface, you can leave this field blank and the tunnel monitor will instead use the tunnel interface to determine if the connection is active. |
| --- | --- |






| • | **Tunnel Monitor Profile**—**Failover** to another gateway is the only type of tunnel monitoring profile supported with LSVPN. |
| --- | --- |



 Fastpath:
 Enable **Tunnel Monitoring** and configure a [Tunnel Monitoring Profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/vpns/set-up-site-to-site-vpn/set-up-tunnel-monitoring/define-a-tunnel-monitoring-profile) to control the failover action if you enable satellite tunnel configuration.




 Crypto Profiles


 Select an **IPSec Crypto Profile** or create a new one. A crypto profile determines the protocols and algorithms for identification, authentication, and encryption for the VPN tunnels. Because both tunnel endpoints in an LSVPN are trusted firewalls within your organization, you typically use the default profile, which uses ESP protocol, DH group2, AES 128 CVC encryption, and SHA-1 authentication. See [Network > Network Profiles > GlobalProtect IPSec Crypto](network-network-profiles-globalprotect-ipsec-crypto.html#ID0EBQ2V) for more details.




 `Network Settings tab`




 Inheritance Source


 Select a source to propagate DNS server and other settings from the selected DHCP client or PPPoE client interface into the GlobalProtect satellite configuration. With this setting, all network configuration, such as DNS servers, are inherited from the configuration of the interface selected in the Inheritance Source.




 Primary DNS
 Secondary DNS


 Enter the IP addresses of the primary and secondary servers that provide DNS to the satellites.




 DNS Suffix


 Click **Add** to enter a suffix that the satellite should use locally when an unqualified hostname is entered that it cannot resolve. You can enter multiple suffixes by separating them with commas.




 Inherit DNS Suffix


 Select this option to send the DNS suffix to the satellites to use locally when an unqualified hostname is entered that it cannot resolve.




 IP Pool


 **Add** a range of IP addresses to assign to the tunnel interface on satellites upon establishment of the VPN tunnel. You can specify IPv6 or IPv4 addresses.
 Note:



| | The IP pool must be large enough to support all concurrent connections. IP address assignment is dynamic and not retained after the satellite disconnects. Configuring multiple ranges from different subnets will allow the system to offer satellites an IP address that does not conflict with other interfaces on the satellites. |
| --- | --- |



 The servers and routers in the networks must route the traffic for this IP pool to the firewall. For example, for the 192.168.0.0/16 network, a satellite can be assigned the address 192.168.0.10.
 If you are using dynamic routing, make sure that the IP address pool you designate for satellites does not overlap with the IP addresses you manually assigned to the tunnel interfaces on your gateways and satellites.




 Access Route


 Click **Add** and then enter routes as follows:



| • | If you want to route all traffic from the satellites through the tunnel, leave this field blank. |
| --- | --- |






| • | To route only some traffic through the gateway (called split tunneling), specify the destination subnets that must be tunneled. In this case, the satellite routes traffic that is not destined for a specified access route by using its own routing table. For example, you can choose to tunnel only the traffic destined for your corporate network and use the local satellite to enable safe Internet access. |
| --- | --- |






| • | If you want to enable routing between satellites, enter the summary route for the network protected by each satellite. |
| --- | --- |







 `Route Filter tab`




 Accept published routes


 Enable **Accept published routes** to accept routes advertised by the satellite into the gateway’s routing table. If you do not select this option, the gateway does not accept any routes advertised by the satellites.




 Permitted Subnets


 If you want to be more restrictive about accepting the routes advertised by the satellites, **Add** Permitted subnets and define the subnets from which the gateway may accept routes; subnets advertised by the satellites that are not part of the list are filtered out. For example, if all the satellites are configured with 192.168.x.0/24 subnet on the LAN side, you can configure a permitted route of 192.168.0.0/16 on the gateway. This configuration causes the gateway to accept the routes from the satellite only if it is in the 192.168.0.0/16 subnet.



 Parent topic
 [Network > GlobalProtect > Gateways](network-globalprotect-gateways.html#ID0EDRU1)