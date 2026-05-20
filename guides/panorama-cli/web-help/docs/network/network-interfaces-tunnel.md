# Network > Interfaces > Tunnel

*Network : Network &gt; Interfaces &gt; Tunnel*

## Network > Interfaces > Tunnel


Use the following fields to configure a tunnel interface:



| Tunnel Interface Settings | Configure In | Description |
| --- | --- | --- |
| Interface Name | **Tunnel Interface** | The read-only **Interface Name** is set to **tunnel**. In the adjacent field, enter a numeric suffix (1-9,999) to identify the interface. |
| Comment | Enter an optional description for the interface. | |
| Netflow Profile | If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the interface. | |
| Virtual Router | **Tunnel Interface** > **Config** | Assign a virtual router to the interface, or click **Virtual Router** to define a new one (see [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)). Select **None** to remove the current virtual router assignment from the interface. |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system (vsys) for the interface or click **Virtual System** to define a new vsys. | |
| Security Zone | Select a security zone for the interface, or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. | |
| Management Profile | **Tunnel Interface** > **Advanced** > **Other Info** | **Management Profile**—Select a profile that defines the protocols (for example, SSH, Telnet, and HTTP) you can use to manage the firewall over this interface. Select **None** to remove the current profile assignment from the interface. |
| MTU | Enter the [maximum transmission unit](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/session-settings-and-timeouts/tcp.html) (MTU) in bytes for packets sent on this interface (576-9,192; default is 1,500). If machines on either side of the firewall perform Path MTU Discovery (PMTUD) and the interface receives a packet exceeding the MTU, the firewall returns an ICMP fragmentation needed message to the source indicating the packet is too large. | |
| For an IPv4 address | | |
| IP | **Tunnel Interface** > **IPv4** | Click **Add**, then perform one of the following steps to specify a static IP address and network mask for the interface. • |






| • | Select an existing address object of type **IP netmask**. |
| --- | --- |






| • | Click **Address** to create an address object of type **IP netmask**. |
| --- | --- |



 You can enter multiple IP addresses for the interface. The forwarding information base (FIB) your system uses determines the maximum number of IP addresses.
 To delete an IP address, select the address and click **Delete**.




 For an IPv6 address




 Enable IPv6 on the interface


 **Tunnel Interface** > **IPv6**


 Select to enable IPv6 addressing on this interface.




 Interface ID


 **Tunnel Interface** > **IPv6**


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