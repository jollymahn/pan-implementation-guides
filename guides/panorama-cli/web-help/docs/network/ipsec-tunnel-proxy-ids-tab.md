# IPSec Tunnel Proxy IDs Tab

*Network : Network &gt; IPSec Tunnels : IPSec Tunnel Proxy IDs Tab*

IPSec Tunnel Proxy IDs Tab



| • | Network > IPSec Tunnels > Proxy IDs |
| --- | --- |




The **IPSec Tunnel Proxy IDs** tab is separated into two tabs: **IPv4** and **IPv6**. The help is similar for both types; the differences between IPv4 and IPv6 are described in the **Local** and **Remote** fields in the following table.


The **IPSec Tunnel Proxy IDs** tab is also used for specifying traffic selectors for IKEv2.



| Proxy IDs IPv4 and IPv6 Settings | Description |
| --- | --- |
| Proxy ID | Click **Add** and enter a name to identify the proxy. For an IKEv2 traffic selector, this field is used as the Name. |
| Local | For IPv4: Enter an IP address or subnet in the format x.x.x.x/mask (for example, 10.1.2.0/24). For IPv6: Enter an IP address and prefix length in the format xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx/prefix-length (or per IPv6 convention, for example, 2001:DB8:0::/48). IPv6 addressing does not require that all zeros be written; leading zeros can be omitted and one grouping of consecutive zeros can be replaced by two adjacent colons (::). For an IKEv2 traffic selector, this field is converted to Source IP Address. |
| Remote | If required by the peer: For IPv4, enter an IP address or subnet in the format x.x.x.x/mask (for example, 10.1.1.0/24). For IPv6, enter an IP address and prefix length in the format xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx:xxxx/prefix-length (or per IPv6 convention, for example, 2001:DB8:55::/48). For an IKEv2 traffic selector, this field is converted to Destination IP Address. |
| Protocol | Specify the protocol and port numbers for the local and remote ports: **Number**—Specify the protocol number (used for interoperability with third-party devices). • |






| • | **TCP**—Specify the local and remote TCP port numbers. |
| --- | --- |






| • | **UDP**—Specify the local and remote UDP port numbers. |
| --- | --- |



 Each configured proxy ID will count towards the IPSec VPN tunnel capacity of the firewall.
 This field is also used as an IKEv2 traffic selector.



 Parent topic
 [Network > IPSec Tunnels](network-ipsec-tunnels.html#ID0E2ONV)