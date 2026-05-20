# Virtual Wire Subinterface

*Network : Network &gt; Interfaces : Virtual Wire Subinterface*

Virtual Wire Subinterface



| • | Network > Interfaces > Ethernet |
| --- | --- |




Virtual wire (vwire) subinterfaces allow you to separate traffic by VLAN tags or a VLAN tag and IP classifier combination, assign the tagged traffic to a different zone and virtual system, and then enforce security policies for the traffic that matches the defined criteria.


To add a [Virtual Wire Interface](virtual-wire-interface.html#ID0EHCOS) select the row for that interface, click **Add Subinterface**, and specify the following information.



| Virtual Wire Subinterface Settings | Description |
| --- | --- |
| Interface Name | The read-only **Interface Name** displays the name of the vwire interface you selected. In the adjacent field, enter a numeric suffix (1-9,999) to identify the subinterface. |
| Comment | Enter an optional description for the subinterface. |
| Tag | Enter the VLAN tag (0-4,094) for the subinterface. |
| Netflow Profile | If you want to export unidirectional IP traffic that traverses an ingress subinterface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Selecting **None** removes the current NetFlow server assignment from the subinterface. |
| IP Classifier | Click **Add** and enter an IP address, IP range, or subnet to classify the traffic on this vwire subinterface. |
| Virtual Wire | Select a virtual wire, or click **Virtual Wire** to define a new one (see [Network > Virtual Wires](network-virtual-wires.html#ID0EZSVT)). Select **None** to remove the current virtual wire assignment from the subinterface. |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system (vsys) for the subinterface or click **Virtual System** to define a new vsys. |
| Security Zone | Select a security zone for the subinterface, or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the subinterface. |


 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)