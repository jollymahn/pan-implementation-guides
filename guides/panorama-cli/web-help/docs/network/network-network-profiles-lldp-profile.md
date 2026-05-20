# Network > Network Profiles > LLDP Profile

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; LLDP Profile*

Network > Network Profiles > LLDP Profile

A Link Layer Discovery Protocol (LLDP) profile is the way in which you configure the LLDP mode of the firewall, enable syslog and SNMP notifications, and configure the optional Type-Length-Values (TLVs) you want transmitted to LLDP peers. After configuring the LLDP profile, you assign the profile to one or more interfaces.


Learn more about [LLDP](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/lldp.html), including how to configure and monitor LLDP.



| LLDP Profile Settings | Description |
| --- | --- |
| Name | Specify a name for the LLDP profile. |
| Mode | Select the mode in which LLDP will function: **transmit-receive**, **transmit-only**, or **receive-only**. |
| SNMP Syslog Notification | Enables SNMP trap and syslog notifications, which will occur at the global **Notification Interval**. If enabled, the firewall will send both an SNMP trap and a syslog event as configured in the **Device** > **Log Settings** > **System** > **SNMP Trap Profile** and **Syslog Profile**. |
| Port Description | Enables the ifAlias object of the firewall to be sent in the Port Description TLV. |
| System Name | Enables the sysName object of the firewall to be sent in the System Name TLV. |
| System Description | Enables the sysDescr object of the firewall to be sent in the System Description TLV. |
| System Capabilities | Enables the deployment mode (L3, L2, or virtual wire) of the interface to be sent, via the following mapping, in the System Capabilities TLV. • |






| • | If L2, the firewall advertises MAC Bridge (bit 3) capability and the Other bit (bit 1). |
| --- | --- |






| • | If virtual wire, the firewall advertises Repeater (bit 2) capability and the Other bit (bit 1). |
| --- | --- |



 SNMP MIB will combine capabilities configured on interfaces into a single entry.




 Management Address


 Enables the **Management Address** to be sent in the Management Address TLV. You can enter up to four management addresses, which are sent in the order they are specified. To change the order, click **Move Up** or **Move Down**.




 Name


 Specify a name for the Management Address.




 Interface


 Select an interface whose IP address will be the Management Address. If you select **None**, you can enter an IP address in the field next to the IPv4 or IPv6 selection.




 IP Choice


 Select **IPv4** or **IPv6**, and in the adjacent field, select or enter the IP address to be transmitted as the Management Address. At least one management address is required if **Management Address** TLV is enabled. If no management IP address is configured, the system uses the MAC address of the transmitting interface as the management address transmitted.



 Parent topic
 [Network > Network Profiles](network-network-profiles.html#ID0E631V)