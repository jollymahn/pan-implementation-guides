# Virtual Wire Interface

*Network : Network &gt; Interfaces : Virtual Wire Interface*

Virtual Wire Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




A virtual wire logically binds two Ethernet interfaces together, allowing for all traffic to pass between the interfaces, or just traffic with selected VLAN tags (no other switching or routing services are available). You can create virtual wire subinterfaces to classify traffic according to an IP address, IP range, or subnet. A virtual wire requires no changes to adjacent network devices. A virtual wire can bind two Ethernet interfaces of the same medium (both copper or both fiber optic), or bind a copper interface to a fiber optic interface.


To set up a virtual wire, decide which two interfaces to bind (**Network** > **Interfaces** > **Ethernet**) and configure their settings as described in the following table.

 CAUTION:
 If you are using an existing interface for the virtual wire, first remove the interface from any associated security zone.


| Virtual Wire Interface Setting | Configured In | Description |
| --- | --- | --- |
| Interface Name | **Ethernet Interface** | The interface name is predefined and you cannot change it. |
| Comment | Enter an optional description for the interface. | |
| Interface Type | Select **Virtual Wire**. | |
| Virtual Wire | **Ethernet Interface** > **Config** | Select a virtual wire, or click **Virtual Wire** to define a new one ([Network > Virtual Wires](network-virtual-wires.html#ID0EZSVT)). Select **None** to remove the current virtual wire assignment from the interface. |
| Virtual System | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system for the interface or click **Virtual System** to define a new vsys. | |
| Security Zone | Select a security zone for the interface, or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. | |
| Link Speed | **Ethernet Interface** > **Advanced** > **Link Settings** | Select the interface speed in Mbps, or select **auto** to have the firewall automatically determine the speed. |
| Link Duplex | Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**). Both interfaces in the virtual wire must have the same transmission mode. | |
| Link State | Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically (**auto**). | |
| PoE Rsvd Pwr | **Ethernet Interface** > **Advanced** > **PoE Settings** (`Supported firewalls only`) | Select the amount of allocated power in Watts if PoE is enabled. |
| PoE Enable | Select to enable PoE on this interface. CAUTION:**When using Panorama, non-PoE interfaces display the option to enable or disable PoE. To avoid a commit failure, ensure that **PoE Enable** remains selected on these non-PoE interfaces. | |
| Enable LLDP | Ethernet Interface** > **Advanced** > **LLDP** | Select to enable Link Layer Discovery Protocol (LLDP) on the interface. LLDP functions at the link layer to discover neighboring devices and their capabilities. |
| Profile | If LLDP is enabled, select an LLDP profile to assign to the interface or click **LLDP Profile** to create a new profile (see [Network > Network Profiles > LLDP Profile](network-network-profiles-lldp-profile.html#ID0ETYNW)). Select **None** to configure the firewall to use global defaults. | |
| Enable in HA Passive State | If LLDP is enabled, select to configure an HA passive firewall to pre-negotiate LLDP with its peer before the firewall becomes active. If LLDP is not enabled, select to configure an HA passive firewall to simply pass LLDP packets through the firewall. | |


 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)