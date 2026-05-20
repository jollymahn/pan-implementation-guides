# Network > Interfaces > Loopback

*Network : Network &gt; Interfaces &gt; Loopback*

## Network > Interfaces > Loopback


Use the following fields to configure a loopback interface:



| Loopback Interface Settings | Configure In | Description |
| --- | --- | --- |
| Interface Name | **Loopback Interface** | The read-only **Interface Name** is set to **loopback**. In the adjacent field, enter a numeric suffix (1-9999) to identify the interface. |
| Comment | Enter an optional description for the interface. | |
| Netflow Profile | If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the interface. | |
| Virtual Router | **Loopback Interface** > **Config** | Assign a virtual router to the interface, or click **Virtual Router** to define a new one (see [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)). Select **None** to remove the current virtual router assignment from the interface. |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system (vsys) for the interface or click **Virtual System** to define a new vsys. | |
| Security Zone | Select a security zone for the interface, or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. | |
| Management Profile | **Tunnel Interface** > **Advanced** > **Other Info** | **Management Profile**—Select a profile that defines the protocols (for example, SSH, Telnet, and HTTP) you can use to manage the firewall over this interface. Select **None** to remove the current profile assignment from the interface. |
| MTU | Enter the maximum transmission unit (MTU) in bytes for packets sent on this interface (576-9,192; default is 1,500). If machines on either side of the firewall perform Path MTU Discovery (PMTUD) and the interface receives a packet exceeding the MTU, the firewall returns an ICMP fragmentation needed message to the source indicating the packet is too large. | |
| Adjust TCP MSS | Select to adjust the maximum segment size (MSS) to accommodate bytes for any headers within the interface MTU byte size. The MTU byte size minus the MSS Adjustment Size equals the MSS byte size, which varies by IP protocol: • | **IPv4 MSS Adjustment Size**—Range is 40-300; default is 40. |






| • | **IPv6 MSS Adjustment Size**—Range is 60-300; default is 60. |
| --- | --- |



 Use these settings to address the case where a **tunnel** through the network requires a smaller MSS. If a packet has more bytes than the MSS without fragmentation, this setting enables the adjustment.
 Encapsulation adds length to headers, so it helps to configure the MSS adjustment size to allow bytes for such things as an MPLS header or tunneled traffic that has a VLAN tag.




 **For an IPv4 address**




 IP


 **Loopback Interface** > **IPv4**


 Click **Add**, then perform one of the following steps to specify a static IP address and network mask for the interface.



| • | Enter an IPv4 address with a subnet mask of /32; for example, 192.168.2.1/32. Only a /32 subnet mask is supported. |
| --- | --- |






| • | Select an existing address object of type **IP netmask**. |
| --- | --- |






| • | Click **Address** to create an address object of type **IP netmask**. |
| --- | --- |



 You can enter multiple IP addresses for the interface. The forwarding information base (FIB) your system uses determines the maximum number of IP addresses.
 To delete an IP address, select the address and click **Delete**.




 For an IPv6 address




 Enable IPv6 on the interface


 **Loopback Interface** > **IPv6**


 Select to enable IPv6 addressing on this interface.




 Interface ID


 Enter the 64-bit extended unique identifier (EUI-64) in hexadecimal format (for example, 00:26:08:FF:FE:DE:4E:29). If you leave this field blank, the firewall uses the EUI-64 generated from the MAC address of the physical interface. If you enable the **Use interface ID as host portion** option when adding an address, the firewall uses the interface ID as the host portion of that address.




 Address


 Click **Add** and configure the following parameters for each IPv6 address:



| • | **Address**—Enter an IPv6 address and prefix length (e.g. 2001:400:f00::1/64). You can also select an existing IPv6 address object or click **Address** to create an address object. |
| --- | --- |






| • | **Enable address on interface**—Select to enable the IPv6 address on the interface. |
| --- | --- |






| • | **Use interface ID as host portion**—Select to use the **Interface ID** as the host portion of the IPv6 address. |
| --- | --- |






| • | **Anycast**—Select to include routing through the nearest node. |
| --- | --- |






 Parent topic
 [Network](network.html#ID0EFOJS)