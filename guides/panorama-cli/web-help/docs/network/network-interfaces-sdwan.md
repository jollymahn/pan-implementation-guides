# Network > Interfaces > SD-WAN

*Network : Network &gt; Interfaces &gt; SD-WAN*

## Network > Interfaces > SD-WAN


If you use Auto VPN configuration through Panorama, Auto VPN configuration creates the SD-WAN interfaces for you, in which case you don't create and configure a virtual SD-WAN interface.


If you aren't using Auto VPN configuration with Panorama, create a virtual SD-WAN interface and add one or more physical Ethernet interface members that go to the same destination, such as a specific hub or to the internet.

 Note:



| | If Panorama is managing a multi-vsys firewall, all SD-WAN enabled interfaces and configurations must be configured on vsys1. |
| --- | --- |



 SD-WAN does not support an SD-WAN configuration across multiple virtual systems of a multi-VSYS firewall.


| SD-WAN Interface Settings |
| --- |
| Interface Name |
| Comment |
| Link Tag |
| Protocol |






| • | **ipv6** indicates an IPv6 DIA virtual interface. |
| --- | --- |






| • | **none** indicates a VPN tunnel virtual interface. |
| --- | --- |







 **Config Tab**




 Virtual Router


 Assign a virtual router to the interface, or select **Virtual Router** to define a new one (see [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)). Select **None** to remove the current virtual router assignment from the interface.




 Virtual System


 If the firewall supports multiple virtual systems and that capability is enabled, you must select **vsys1** for the interface.




 Security Zone


 Select a security zone for the interface, or select **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. The virtual SD-WAN interface and all of its interface members must be in the same security zone, thus ensuring the same security policy rules apply to all paths from the branch to the same destination.




 **Advanced Tab**




 Interfaces


 Select the Layer 3 Ethernet interfaces (for Direct Internet Access [DIA]) or virtual VPN tunnel interfaces (for hub) that constitute this virtual SD-WAN interface. The firewall virtual router uses this virtual SD-WAN interface to route SD-WAN traffic to a DIA or a hub location. The interfaces can have different tags. If you enter more than one interface, they must all be the same type (either VPN tunnel or DIA).



 Parent topic
 [Network](network.html#ID0EFOJS)