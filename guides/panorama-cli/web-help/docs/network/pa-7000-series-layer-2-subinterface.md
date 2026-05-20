# PA-7000 Series Layer 2 Subinterface

*Network : Network &gt; Interfaces : PA-7000 Series Layer 2 Subinterface*

PA-7000 Series Layer 2 Subinterface



| • | Network > Interfaces > Ethernet |
| --- | --- |




For each Ethernet port configured as a physical Layer 2 interface, you can define an additional logical Layer 2 interface (subinterface) for each VLAN tag assigned to the traffic that the port receives. To enable switching between Layer 2 subinterfaces, assign the same VLAN object to the subinterfaces.


To configure a [PA-7000 Series Layer 2 Interface](pa-7000-series-layer-2-interface.html#ID0E5KPS), select the row of that physical Interface, click **Add Subinterface**, and specify the following information.



| Layer 2 Subinterface Settings | Description |
| --- | --- |
| Interface Name | The read-only Interface Name displays the name of the physical interface you selected. In the adjacent field, enter a numeric suffix (1-9,999) to identify the subinterface. |
| Comment | Enter an optional description for the subinterface. |
| Tag | Enter the VLAN tag (1-4,094) for the subinterface. |
| Netflow Profile | If you want to export unidirectional IP traffic that traverses an ingress subinterface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the subinterface. |
| VLAN | To enable switching between Layer 2 interfaces or to enable routing through a VLAN interface, select a VLAN, or click **VLAN** to define a new VLAN (see [Network > VLANs](network-vlans.html#ID0EEKVT)). Select **None** to remove the current VLAN assignment from the subinterface. |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system (vsys) for the subinterface or click **Virtual System** to define a new vsys. |
| Security Zone | Select a security zone for the subinterface or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the subinterface. |


 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)