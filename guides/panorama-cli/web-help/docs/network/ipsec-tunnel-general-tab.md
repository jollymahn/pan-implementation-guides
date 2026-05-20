# IPSec Tunnel General Tab

*Network : Network &gt; IPSec Tunnels : IPSec Tunnel General Tab*

IPSec Tunnel General Tab



| • | Network > IPSec Tunnels > General |
| --- | --- |




Use the following fields to set up an IPSec tunnel.



| IPSec Tunnel General Settings | Description |
| --- | --- |
| Name | Enter a **Name** to identify the tunnel (up to 63 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. The 63-character limit for this field includes the tunnel name in addition to the Proxy ID, which is separated by a colon character. |
| Tunnel Interface | Select an existing tunnel interface, or click **New Tunnel Interface**. For information on creating a tunnel interface, refer to [Network > Interfaces > Tunnel](network-interfaces-tunnel.html#ID0EBCPT). |
| IPv4 or IPv6 | Select **IPv4** or **IPv6** to configure the tunnel to have endpoints with that IP type of address. |
| Type | Select whether to use an automatically generated or manually entered security key. **Auto key** is recommended. |
| Auto Key | If you choose **Auto Key**, specify the following: • |






| • | **IPSec Crypto Profile**—Select an existing profile or keep the default profile. To define a new profile, click **New** and follow the instructions in [Network > Network Profiles > IPSec Crypto](network-network-profiles-ipsec-crypto.html#ID0EXGAW). |
| --- | --- |






| • | Click **Show Advanced Options** to access the remaining fields. |
| --- | --- |






| • | **Enable Replay Protection**—Select to protect against replay attacks. |
| --- | --- |



 Anti-replay is a sub-protocol of IPSec and is part of the Internet Engineering Task Force (IETF) Request for Comments (RFC) 6479. The anti-replay protocol is used to prevent hackers from injecting or making changes in packets that travel from a source to a destination and uses a unidirectional security association in order to establish a secure connection between two nodes in the network.
 After a secure connection is established, the anti-replay protocol uses packet sequence numbers to defeat replay attacks. When the source sends a message, it adds a sequence number to its packet; the sequence number starts at 0 and is incremented by 1 for each subsequent packet. The destination maintains the sequence of numbers in a sliding window format, maintains a record of the sequence numbers of validated received packets, and rejects all packets that have a sequence number that is lower than the lowest in the sliding window (packets that are too old) or packets that already appear in the sliding window (duplicate or replayed packets). Accepted packets, after they are validated, update the sliding window, displacing the lowest sequence number out of the window if it was already full.
 If you enable replay protection, select the **Anti Replay Window** to use. You can select a anti-replay window size of 64, 128, 256, 512, 1024, 2048, or 4096. The default is 1024.



| • | **Copy TOS Header**—Copy the (Type of Service) TOS field from the inner IP header to the outer IP header of the encapsulated packets in order to preserve the original TOS information. This also copies the Explicit Congestion Notification (ECN) field. |
| --- | --- |






| • | **IPSec Mode**—Specify IPSec mode. Select **Tunnel** mode to encrypt the entire packet including the header. A new IP header is added to the packet after encryption. Select **Transport** mode to encrypt only the payload and retain the original IP header. |
| --- | --- |






| • | **Add GRE Encapsulation**—Select to add a GRE header encapsulated in the IPSec tunnel. The firewall generates a GRE header after the IPSec header for interoperability with other vendor tunnel endpoints, thus sharing a GRE tunnel with the IPSec tunnel. |
| --- | --- |






| • | **Tunnel Monitor**—Select to alert the device administrator of tunnel failures and to provide automatic failover to another interface. |
| --- | --- |



 Note:



| | You need to assign an IP address to the tunnel interface for monitoring. |
| --- | --- |






| ◦ | **Destination IP**—Specify an IP address on the other side of the tunnel that the tunnel monitor will use to determine if the tunnel is working properly. |
| --- | --- |






| ◦ | **Profile**—Select an existing profile that will determine the actions that are taken if the tunnel fails. If the action specified in the monitor profile is wait-recover, the firewall will wait for the tunnel to become functional and will NOT seek an alternate path with the route table. If the fail-over action is used, the firewall will check the route table to see if there is an alternate route that can be used to reach the destination. For more information, see [Network > Network Profiles > Monitor](network-network-profiles-monitor.html#ID0E64BW). |
| --- | --- |







 Manual Key


 If you choose **Manual Key**, specify the following:



| • | **Local SPI**—Specify the local security parameter index (SPI) for packet traversal from the local firewall to the peer. SPI is a hexadecimal index that is added to the header for IPSec tunneling to assist in differentiating between IPSec traffic flows. |
| --- | --- |






| • | **Interface**—Select the interface that is the tunnel endpoint. |
| --- | --- |






| • | **Local Address**—Select the IP address for the local interface that is the endpoint of the tunnel. |
| --- | --- |






| • | **Remote SPI**—Specify the remote security parameter index (SPI) for packet traversal from the remote firewall to the peer. |
| --- | --- |






| • | **Protocol**—Choose the protocol for traffic through the tunnel (**ESP** or **AH**). |
| --- | --- |






| • | **Authentication**—Choose the authentication type for tunnel access (**SHA1**, **SHA256**, **SHA384**, **SHA512**, **MD5**, or **None**). |
| --- | --- |






| • | **Key/Confirm Key**—Enter and confirm an authentication key. |
| --- | --- |






| • | **Encryption**—Select an encryption option for tunnel traffic (**3des**, **aes-128-cbc**, **aes-192-cbc**, **aes-256-cbc**, **des**, or **null** [no encryption]). |
| --- | --- |






| • | **Key/Confirm Key**—Enter and confirm an encryption key. |
| --- | --- |







 GlobalProtect Satellite


 If you choose **GlobalProtect Satellite**, specify the following:



| • | **Name**—Enter a name to identify the tunnel (up to **31** characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| --- | --- |






| • | **Tunnel Interface**—Select an existing tunnel interface, or click New Tunnel Interface. |
| --- | --- |






| • | **Portal Address**—Enter the IP address of the GlobalProtect™ Portal. |
| --- | --- |






| • | **Interface**—Select the interface from the drop-down that is the egress interface to reach the GlobalProtect Portal. |
| --- | --- |






| • | **Local IP Address**—Enter the IP address of the egress interface that connects to the GlobalProtect Portal. |
| --- | --- |






| • | **Advanced Options** |
| --- | --- |






| • | **Publish all static and connected routes to Gateway**—Select to publish all routes from the satellite to the GlobalProtect Gateway in which this satellite is connected. |
| --- | --- |






| • | **Subnet**—Click **Add** to manually add local subnets for the satellite location. If other satellites are using the same subnet information, you must NAT all traffic to the tunnel interface IP. Also, the satellite must not share routes in this case, so all routing will be done through the tunnel IP. |
| --- | --- |






| • | **External Certificate Authority**—Select if you will use an external CA to manage certificates. Once you have your certificates generated, you will need to import them into the satellite and select the **Local Certificate** and the **Certificate Profile**. |
| --- | --- |






 Parent topic
 [Network > IPSec Tunnels](network-ipsec-tunnels.html#ID0E2ONV)