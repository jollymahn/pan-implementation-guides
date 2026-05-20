# PA-7000 Series Layer 2 Interface

*Network : Network &gt; Interfaces : PA-7000 Series Layer 2 Interface*

PA-7000 Series Layer 2 Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




Select **Network** > **Interfaces** > **Ethernet** to configure a Layer 2 interface. Click on the name of an Interface (ethernet1/1, for example) that is not configured and specify the following information.



| Layer 2 Interface Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **Ethernet Interface** | The interface name is predefined and you cannot change it. |
| Comment | Enter an optional description for the interface. | |
| Interface Type | Select **Layer2**. | |
| Netflow Profile | If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the interface. | |
| VLAN | **Ethernet Interface** > **Config** | To enable switching between Layer 2 interfaces or to enable routing through a VLAN interface, select an existing VLAN or click **VLAN** to define a new VLAN (see [Network > VLANs](network-vlans.html#ID0EEKVT)). Select **None** to remove the current VLAN assignment from the interface. |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system for the interface or click **Virtual System** to define a new vsys. | |
| Security Zone | Select a **Security Zone** for the interface or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. | |
| Link Speed | **Ethernet Interface** > **Advanced** | Select the interface speed in Mbps or select **auto** to have the firewall automatically determine the speed. |
| Link Duplex | Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**). | |
| Link State | Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically (**auto**). | |
| Enable LLDP | **Ethernet Interface** > **Advanced** > **LLDP** | Select to enable Link Layer Discovery Protocol (LLDP) on the interface. LLDP functions at the link layer to discover neighboring devices and their capabilities. |
| LLDP Profile | If LLDP is enabled, select an LLDP profile to assign to the interface or click **LLDP Profile** to create a new profile (see [Network > Network Profiles > LLDP Profile](network-network-profiles-lldp-profile.html#ID0ETYNW)). Select **None** to configure the firewall to use global defaults. | |
| Enable in HA Passive State | If LLDP is enabled, select to allow an HA passive firewall to pre-negotiate LLDP with its peer before the firewall becomes active. | |


 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)