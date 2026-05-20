# Common Building Blocks for Firewall Interfaces

*Network : Network &gt; Interfaces : Common Building Blocks for Firewall Interfaces*

Common Building Blocks for Firewall Interfaces

Select **Network** > **Interfaces** to display and configure the components that are common to most interface types.

 Note:



| | For a description of components that are unique or different when you configure interfaces on a PA-7000 Series firewall, or when you use Panorama™ to configure interfaces on any firewall, see [Common Building Blocks for PA-7000 Series Firewall Interfaces](common-building-blocks-for-pa-7000-series-firewall-interfaces.html#ID0ELSMS). |
| --- | --- |





| Firewall Interface Building Blocks | Description |
| --- | --- |
| Interface (Interface Name) | The interface name is predefined and you cannot change it. However, you can append a numeric suffix for subinterfaces, aggregate interfaces, VLAN interfaces, loopback interfaces, tunnel interfaces, and SD-WAN interfaces. |
| Interface Type | For Ethernet interfaces (**Network** > **Interfaces** > **Ethernet**), you can select the interface type: • |






| • | **HA** |
| --- | --- |






| • | **Decrypt Mirror** (Supported on all firewalls except on the VM-Series NSX, Citrix SDX, AWS, and Azure.) |
| --- | --- |






| • | **Virtual Wire** |
| --- | --- |






| • | **Layer 2** |
| --- | --- |






| • | **Layer 3** |
| --- | --- |






| • | **Log Card** (PA-7000 Series firewall only) |
| --- | --- |






| • | **Aggregate Ethernet** |
| --- | --- |







 Management Profile


 Select a **Management Profile** (**Network** > **Interfaces** > **<if-config** > **Advanced** > **Other Info**) that defines the protocols (such as SSH, Telnet, and HTTP) you can use to manage the firewall over this interface.




 Link State


 For Ethernet interfaces, Link State indicates whether the interface is currently accessible and can receive traffic over the network:



| • | **Green**—Configured and up |
| --- | --- |






| • | **Red**—Configured but down or disabled |
| --- | --- |






| • | **Gray**—Not configured |
| --- | --- |



 Hover over the link state to display a tool tip that indicates the link speed and duplex settings for that interface.




 IP Address


 (`Optional`) Configure the IPv4 or IPv6 address of the Ethernet, VLAN, loopback, or tunnel interface. For an IPv4 address, you can also select the addressing mode (**Type**) for the interface: **Static**, **DHCP Client**, or **PPPoE**.




 Virtual Router


 Assign a virtual router to the interface or click **Virtual Router** to define a new one (see [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)). Select **None** to remove the current virtual router assignment from the interface.




 Tag (`Subinterface only`)


 Enter the VLAN tag (1-4,094) for the subinterface.




 VLAN


 Select **Network** > **Interfaces** > **VLAN** and modify an existing **VLAN** or **Add** a new one (see [Network > VLANs](network-vlans.html#ID0EEKVT)). Select **None** to remove the current VLAN assignment from the interface. To enable switching between Layer 2 interfaces, or to enable routing through a VLAN interface, you must configure a VLAN object.




 Virtual System


 If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system (vsys) for the interface or click **Virtual System** to define a new vsys.




 Security Zone


 Select a **Security Zone** (**Network** > **Interfaces** > **<if-config** > **Config**) for the interface, or select **Zone** to define a new one. Select **None** to remove the current zone assignment from the interface.




 Features


 For Ethernet interfaces, this column indicates whether the following features are enabled:
 DHCP Client
 DNS Proxy
 GlobalProtect™ gateway enabled
 Link Aggregation Control Protocol (LACP)
 Link Layer Discovery Protocol (LLDP)
 NDP Monitor
 NetFlow profile
 Quality of Service (QoS) profile
 SD-WAN




 Comment


 A description of the interface function or purpose.



 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)