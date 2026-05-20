# HA Interface

*Network : Network &gt; Interfaces : HA Interface*

HA Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




Each high availability (HA) interface has a specific function: one interface is for configuration synchronization and heartbeats, and the other interface is for state synchronization. If active/active high availability is enabled, the firewall can use a third HA interface to forward packets.

 Note:



| | Some Palo Alto Networks firewalls include dedicated physical ports for use in HA deployments (one for the control link and one for the data link). For firewalls that do not include dedicated ports, you must specify the data ports that will be used for HA. For additional information on HA, refer to “Device > Virtual Systems”. |
| --- | --- |




To configure an HA interface, click the name of an Interface (ethernet1/1, for example) that is not configured and specify the following information.



| HA Interface Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **Ethernet Interface** | The interface name is predefined and you cannot change it. |
| Comment | Enter an optional description for the interface. | |
| Interface Type | Select **HA**. | |
| Link Speed | **Ethernet Interface** > **Advanced** > **Link Settings** | Select the interface speed in Mbps, or select **auto** to have the firewall automatically determine the speed. |
| Link Duplex | Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**). | |
| Link State | Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically (**auto**). | |
| PoE Rsvd Pwr | **Ethernet Interface** > **Advanced** > **PoE Settings** (`Supported firewalls only`) | Select the amount of allocated power in Watts if PoE is enabled. |
| PoE Enable | Select to enable PoE on this interface. CAUTION:**When using Panorama, non-PoE interfaces display the option to enable or disable PoE. To avoid a commit failure, ensure that **PoE Enable** remains selected on these non-PoE interfaces. | |


 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)**