# BGP Peer Group Tab

*Network : Network &gt; Virtual Routers : BGP : BGP Peer Group Tab*

BGP Peer Group Tab



| • | Network > Virtual Router > BGP > Peer Group |
| --- | --- |




A BGP peer group is a collection of BGP peers that share settings, such as the type of peer group (EBGP, for example), or the setting to remove private AS numbers from the AS_PATH list that the virtual router sends in Update packets. BGP peer groups save you from having to configure multiple peers with the same settings. You must configure at least one BGP peer group in order to configure the BGP peers that belong to the group.



| BGP Peer Group Settings | Configure In | Description |
| --- | --- | --- |
| Name | **BGP** > **Peer Group** | Enter a name to identify the peer group. |
| Enable | Select to activate the peer group. | |
| Aggregated Confed AS Path | Select to include a path to the configured aggregated confederation AS. | |
| Soft Reset with Stored Info | Select to perform a soft reset of the firewall after updating the peer settings. | |
| Type | Specify the type of peer or group and configure the associated settings (see below in this table for descriptions of **Import Next Hop** and **Export Next Hop**). • | **IBGP**—Specify the following: |






| ◦ | **Export Next Hop** |
| --- | --- |






| • | **EBGP Confed**—Specify the following: |
| --- | --- |






| ◦ | **Export Next Hop** |
| --- | --- |






| • | **IBGP Confed**—Specify the following: |
| --- | --- |






| ◦ | **Export Next Hop** |
| --- | --- |






| • | **EBGP**—Specify the following: |
| --- | --- |






| ◦ | **Import Next Hop** |
| --- | --- |






| ◦ | **Export Next Hop** |
| --- | --- |






| ◦ | **Remove Private AS** (select if you want to force BGP to remove private AS numbers from the AS_PATH attribute). |
| --- | --- |







 Import Next Hop


 Choose an option for next hop import:



| • | **Original**—Use the Next Hop address provided in the original route advertisement. |
| --- | --- |






| • | **Use Peer**—Use the peer's IP address as the Next Hop address. |
| --- | --- |







 Export Next Hop


 Choose an option for next hop export:



| • | **Resolve**—Resolve the Next Hop address using the Forwarding Information Base (FIB). |
| --- | --- |






| • | **Use Self**—Replace the Next Hop address with the virtual router's IP address to ensure that it will be in the forwarding path. |
| --- | --- |







 Remove Private AS


 Select to remove private autonomous systems from the AS_PATH list.




 Name


 **BGP** > **Peer Group** > **Peer**


 Add a **New** BGP peer and enter a name to identify it.




 Enable


 Select to activate the peer.




 Peer AS


 Specify the autonomous system (AS) of the peer.




 Enable MP-BGP Extensions


 **BGP** > **Peer Group** > **Peer** > **Addressing**


 Enables the firewall to support the Multiprotocol BGP Address Family Identifier for IPv4 and IPv6 and Subsequent Address Family Identifier options per RFC 4760.




 Address Family Type


 Select either the **IPv4** or **IPv6** address family that BGP sessions with this peer will support.




 Subsequent Address Family


 Select either the **Unicast** or **Multicast** subsequent address family protocol the BGP sessions with this peer will carry.




 Local Address—Interface


 Choose a firewall interface.




 Local Address—IP


 Choose a local IP address.




 Peer Address—Type and Address


 Select the type of address that identifies the peer:



| • | **IP**—Select IP and select an address object that uses an IP address (or create a new address object that uses an IP address). |
| --- | --- |






| • | **FQDN**—Select FQDN and select an address object that uses an FQDN (or create a new address object that uses an FQDN). |
| --- | --- |







 Auth Profile


 **BGP** > **Peer Group** > **Peer** > **Connection Options**


 Select a profile or select **New Auth Profile** from the drop down. Enter a Profile **Name** and the **Secret**, and **Confirm Secret**.




 Keep Alive Interval


 Specify an interval after which routes from a peer are suppressed according to the hold time setting (range is 0-1,200 seconds; default is 30 seconds).




 Multi Hop


 Set the time-to-live (TTL) value in the IP header (range is 0 to 255; default is 0). The default value of 0 means 1 for eBGP. The default value of 0 means 255 for iBGP.




 Open Delay Time


 Specify the delay time between opening the peer TCP connection and sending the first BGP open message (range is 0-240 seconds; default is 0 seconds).




 Hold Time


 Specify the period of time that may elapse between successive KEEPALIVE or UPDATE messages from a peer before the peer connection is closed (range is 3-3,600 seconds; default is 90 seconds).




 Idle Hold Time


 Specify the time to wait in the idle state before retrying connection to the peer (range is 1-3,600 seconds; default is 15 seconds).




 Incoming Connections—Remote Port


 Specify the incoming port number and **Allow** traffic to this port.




 Outgoing Connections—Local Port


 Specify the outgoing port number and **Allow** traffic from this port




 Reflector Client


 **BGP** > **Peer Group** > **Peer** > **Advanced**


 Select the type of reflector client (**Non-Client**, **Client**, or **Meshed Client**). Routes that are received from reflector clients are shared with all internal and external BGP peers.




 Peering Type


 Specify a Bilateral peer or leave Unspecified.




 Max Prefixes


 Specify the maximum number of IP prefixes to import from the peer (1 to 100,000 or unlimited).




 Enable Sender Side Loop Detection


 Enable to cause the firewall to check the AS_PATH attribute of a route in the BGP RIB before it sends the route in an update, to ensure that the peer AS number isn't in the AS_PATH list. The firewall doesn't advertise the route if the peer AS number is in the AS_PATH list. Usually the receiver detects loops, but this optimization feature has the sender perform the loop detection. Disable this feature to have the receiver perform loop detection.




 BFD


 To enable Bidirectional Forwarding Detection (BFD) for a BGP peer (and thereby override the **BFD** setting for BGP, as long as **BFD** is not disabled for BGP at the virtual router level), select the default profile (default BFD settings), an existing BFD profile, **Inherit-vr-global-setting** (to inherit the global BGP BFD profile), or **New BFD Profile** (to create a new BFD profile). **Disable BFD** disables BFD for the BGP peer.
 CAUTION:
 If you enable or disable BFD globally, all interfaces running BGP will be taken down and brought back up with the BFD function. This can disrupt all BGP traffic. When you enable BFD on the interface, the firewall will stop the BGP connection to the peer to program BFD on the interface. The peer device will see the BGP connection drop, which can result in a reconvergence that impacts production traffic. Therefore, enable BFD on BGP interfaces during an off-peak time when a reconvergence will not impact production traffic.



 Parent topic
 [BGP](bgp.html#ID0EG4BU)