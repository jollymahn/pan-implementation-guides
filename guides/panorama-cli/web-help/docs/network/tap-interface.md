# Tap Interface

*Network : Network &gt; Interfaces : Tap Interface*

Tap Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




You can use a tap interface to monitor traffic on a port.


To configure a tap interface, click the name of an Interface (ethernet1/1, for example) that is not configured and specify the following information.



| Tap Interface Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **Ethernet Interface** | The interface name is predefined and you cannot change it. |
| Comment | Enter an optional description for the interface. | |
| Interface Type | Select **Tap**. | |
| Netflow Profile | If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the interface. | |
| Virtual System | **Ethernet Interface** > **Config** | If the firewall supports multiple virtual systems and that capability is enabled, select a virtual system for the interface or click **Virtual System** to define a new vsys. |
| Security Zone | Select a security zone for the interface or click **Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface. | |
| Link Speed | **Ethernet Interface** > **Advanced** > **Link Settings** | Select the interface speed in Mbps, or select **auto** to have the firewall automatically determine the speed. |
| Link Duplex | Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**). | |
| Link State | Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically (**auto**). | |
| PoE Rsvd Pwr | **Ethernet Interface** > **Advanced** > **PoE Settings** (`Supported firewalls only`) | Select the amount of allocated power in Watts if PoE is enabled. |
| PoE Enable | Select to enable PoE on this interface. CAUTION:**When using Panorama, non-PoE interfaces display the option to enable or disable PoE. To avoid a commit failure, ensure that **PoE Enable** remains selected on these non-PoE interfaces. | |


 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)**