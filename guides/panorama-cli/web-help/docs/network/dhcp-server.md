# DHCP Server

*Network : Network &gt; DHCP : DHCP Server*

DHCP Server



| • | Network > DHCP > DHCP Server |
| --- | --- |




The following section describes each component of the DHCP server. Before you configure a DHCP server, you should already have configured a Layer 3 Ethernet or Layer 3 VLAN interface that is assigned to a virtual router and a zone. You should also know a valid pool of IP addresses from your network plan that can be designated to be assigned by your DHCP server to clients.


When you add a DHCP server, you configure the settings described in the table below.



| DHCP Server Settings | Configured In | Description |
| --- | --- | --- |
| Interface | **DHCP Server** | Name of the interface that will serve as the DHCP server. |
| Mode | Select **enabled** or **auto** mode. **Auto** mode enables the server and disables it if another DHCP server is detected on the network. The **disabled** setting disables the server. | |
| Ping IP when allocating new IP | **DHCP Server** > **Lease** | If you click **Ping IP when allocating new IP**, the server will ping the IP address before it assigns that address to its client. If the ping receives a response, that means a different firewall already has that address, so it is not available for assignment. The server assigns the next address from the pool instead. If you select this option, the Probe IP column in the display will have a check mark. |
| Lease | Specify a lease type. • | **Unlimited** causes the server to dynamically choose IP addresses from the IP Pools and assign them permanently to clients. |






| • | **Timeout** determines how long the lease will last. Enter the number of **Days** and **Hours**, and optionally, the number of **Minutes**. |
| --- | --- |







 IP Pools


 Specify the stateful pool of IP addresses from which the DHCP server chooses an address and assigns it to a DHCP client.
 You can enter a single address, an address/<mask length>, such as 192.168.1.0/24, or a range of addresses, such as 192.168.1.10-192.168.1.20.




 Reserved Address


 Optionally specify an IP address (format x.x.x.x) from the IP pools that you do not want dynamically assigned by the DHCP server.
 If you also specify a **MAC Address** (format xx:xx:xx:xx:xx:xx), the **Reserved Address** is assigned to the firewall associated with that MAC address when that firewall requests an IP address through DHCP.




 Inheritance Source


 **DHCP Server** > **Options**


 Select **None** (default) or select a source DHCP client interface or PPPoE client interface to propagate various server settings to the DHCP server. If you specify an **Inheritance Source**, select one or more options below that you want **inherited** from this source.
 One benefit of specifying an inheritance source is that DHCP options are quickly transferred from the server that is upstream of the source DHCP client. It also keeps the client’s options updated if an option on the inheritance source is changed. For example, if the inheritance source firewall replaces its NTP server (which had been identified as the **Primary NTP** server), the client will automatically inherit the new address as its **Primary NTP** server.




 Check inheritance source status


 If you selected an **Inheritance Source**, click **Check inheritance source status** to open the Dynamic IP Interface Status window, which displays the options that are inherited from the DHCP client.




 Gateway


 **DHCP Server** > **Options (cont)**


 Specify the IP address of the network gateway (an interface on the firewall) that is used to reach any device not on the same LAN as this DHCP server.




 Subnet Mask


 Specify the network mask that applies to the addresses in the **IP Pools**.




 Options


 For the following fields, click the drop-down and select **None** or **inherited**, or enter the IP address of the remote server that your DHCP server will send to clients for accessing that service. If you select **inherited**, the DHCP server inherits the values from the source DHCP client specified as the **Inheritance Source**.
 The DHCP server sends these settings to its clients.



| • | **Primary DNS**, **Secondary DNS**—IP address of the preferred and alternate Domain Name System (DNS) servers. |
| --- | --- |






| • | **Primary WINS**, **Secondary WINS**—IP address of the preferred and alternate Windows Internet Name Service (WINS) servers. |
| --- | --- |






| • | **Primary NIS**, **Secondary NIS**—IP address of the preferred and alternate Network Information Service (NIS) servers. |
| --- | --- |






| • | **Primary NTP**, **Secondary NTP**—IP address of the available network time protocol (NTP) servers. |
| --- | --- |






| • | **POP3 Server**—IP address of a Post Office Protocol version 3 (POP3) server. |
| --- | --- |






| • | **SMTP Server**—IP address of a Simple Mail Transfer Protocol (SMTP) server. |
| --- | --- |






| • | **DNS Suffix**—Suffix for the client to use locally when an unqualified hostname is entered that the client cannot resolve. |
| --- | --- |







 Custom DHCP options


 Click **Add** and enter the **Name** of the custom option you want the DHCP Server to send to clients.
 Enter an **Option Code** (range is 1-254).
 If **Option Code 43** is entered, the Vendor Class Identifier (VCI) field appears. Enter a match criterion that will be compared to the incoming VCI from the client’s Option 60. The firewall looks at the incoming VCI from the client’s Option 60, finds the matching VCI in its own DHCP server table, and returns the corresponding value to the client in Option 43. The VCI match criterion is a string or hex value. A hex value must have a “0x” prefix.
 Select **Inherited from DCHP server inheritance source** to have the server inherit the value for that option code from the inheritance source instead of you entering an **Option Value**.
 As an alternative to this option, you can proceed with the following:
 **Option Type**: Select **IP Address**, **ASCII**, or **Hexadecimal** to specify the type of data used for the Option Value.
 For **Option Value**, click **Add** and enter the value for the custom option.



 Parent topic
 [Network > DHCP](network-dhcp.html#ID0ERRRV)