# SD-WAN Devices

*Panorama Web Interface : Panorama &gt; SD-WAN : SD-WAN Devices*

SD-WAN Devices



| • | **Panorama** > **SD-WAN** > **Devices** |
| --- | --- |




SD-WAN devices are branches or hubs that make up your VPN cluster and SD-WAN topology.



| Field | Description |
| --- | --- |
| Name | Enter a name that identifies the SD-WAN device. |
| Type | Select the type of SD-WAN device: • |






| • | **Branch**—A firewall deployed at a physical branch location that connects to the hub using a VPN connection and provides security at the branch level. The branch connects to the hub for access to centralized resources. The branch device processes traffic, enforces policy rules, and manages link swapping at the branch location. |
| --- | --- |







 Router Name


 Select the virtual or logical router to use for routing between the SD-WAN hub and branches. By default, an sdwan-default virtual router is created and enables Panorama to automatically push router configurations.




 Site


 Enter a user-friendly site name that identifies the hub or branch. For example, enter the city name where the branch device is deployed.




 Link Tag


 (`PAN-OS 10.0.3 and later releases`) For a hub, select the Link Tag that you created for a hub virtual interface so the hub can participate in DIA AnyPath. Auto VPN applies this link tag to the whole hub virtual interface, not an individual link. You reference this Link Tag in the Traffic Distribution Profile to indicate the order of failover to this hub virtual interface. On the branch device, Auto VPN uses this tag to populate the Link Tag field on the SD-WAN virtual interface that terminates on the hub device.




 Zone Internet


 **Add** one or more security zones to identify traffic going to and coming from untrusted sources.




 Zone Hub


 **Add** one or more security zones to identify traffic going to and coming from the SD-WAN hub devices.




 Zone Branch


 **Add** one or more security zones to identify traffic going to and coming from the SD-WAN branch devices.




 Zone Internal


 **Add** one or more security zones to identify traffic going to and coming from the trusted devices on the corporate network.




 **BGP Tab**




 BGP


 Enable BGP.




 Router ID


 Specify the BGP router ID. The Border Gateway Protocol (BGP) router ID must be unique between all routers.
 Fastpath:
 Use the Loopback Address as the Router ID.




 Loopback Address


 Specify a static loopback IPv4 address for BGP peering.




 AS Number


 Enter the Autonomous System number to define a commonly defined routing policy to the internet. The AS number must unique for every hub and branch location.
 Fastpath:
 Use a 4-byte private BGP AS number to not interfere with any publicly routable AS number.




 Redistribution Profile Name


 Select or create a redistribution profile to control which local prefixes are communicated to the hub router from the branch. By default, all locally connected internet prefixes are advertised to the hub location.
 Note:



| | Palo Alto Networks does not redistribute the branch office default route(s) learned from the ISP. |
| --- | --- |







 **Upstream NAT Tab**




 Upstream NAT


 Enable Upstream NAT.




 SD-WAN Interface


 Select an interface configured for SD-WAN.




 NAT IP Address Type


 Select one of the following:



| • | **Static IP**—For an SD-WAN hub or branch that is behind a device performing NAT for the hub or branch. You must specify the IP address or FQDN of the public-facing interface on that upstream NAT-performing device, so that Auto VPN Configuration can use that address as the tunnel endpoint of the hub or branch. Select **IP Address** and enter an IPv4 address without a subnet mask, or select **FQDN**. |
| --- | --- |






| • | **DDNS**—For an SD-WAN branch that is behind a device that is performing NAT for the branch. Indicates the IP address for the interface on the NAT device is obtained from the Palo Alto Networks DDNS service. |
| --- | --- |







 **VPN Tunnel Tab**




 Copy ToS Header


 (`PAN-OS 10.2.1 and later 11.1 releases`) Copy the (Type of Service) ToS field (ToS bits or Differentiated Services Code Point [DSCP] markings) from the inner IPv4 header to the VPN header of the encapsulated packets in order to preserve the original ToS information. This also copies the Explicit Congestion Notification (ECN) field.



 Parent topic
 [Panorama > SD-WAN](panorama-sd-wan.html#ID0EZJX3)