# Log Card Interface

*Network : Network &gt; Interfaces : Log Card Interface*

Log Card Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




If you configure log forwarding on a PA-7000 Series firewall with a Log Processing Card (LPC), you must configure one data port as type **Log Card**. This is because the traffic and logging capabilities of this firewall model exceed the capabilities of the management (MGT) interface. A log card data port performs log forwarding for syslog, email, Simple Network Management Protocol (SNMP), Panorama log forwarding, and WildFire™ file-forwarding.

 CAUTION:
 You can configure only one port on the firewall as type **Log Card**. If you enable log forwarding but do not configure an interface with the **Log Card** type, you get an error when you attempt to commit your changes.
 Note:



| | This information pertains to configuring a Log Processing Card (LPC). To learn how to configure a Log Forwarding Card (LFC), see [Device > Log Forwarding Card](device-log-forwarding-card.html#ID0EKP5X) |
| --- | --- |




To configure a log card interface, select an Interface that is not configured (ethernet1/16, for example) and configure the settings described in the following table.



| Log Card Interface Settings | Configured In | Description |
| --- | --- | --- |
| Slot | **Ethernet Interface** | Select the slot number (1-12) of the interface. |
| Interface Name | The interface name is predefined and you cannot change it. | |
| Comment | Enter an optional description for the interface. | |
| Interface Type | Select **Log Card**. | |
| IPv4 | **Ethernet Interface** > **Log Card Forwarding** | If your network uses IPv4, define the following: • |






| • | **Netmask**—The network mask for the IPv4 address of the port. |
| --- | --- |






| • | **Default Gateway**—The IPv4 address of the default gateway for the port. |
| --- | --- |







 IPv6


 If your network uses IPv6, define the following:



| • | **IP address**—The IPv6 address of the port. |
| --- | --- |






| • | **Default Gateway**—The IPv6 address of the default gateway for the port. |
| --- | --- |







 Link Speed


 **Ethernet Interface** > **Advanced**


 Select the interface speed in Mbps (**10**, **100**, or **1000**) or select **auto** (default) to have the firewall automatically determine the speed based on the connection. For interfaces that have a non-configurable speed, **auto** is the only option.
 Fastpath:
 The minimum recommended speed for the connection is **1000** (Mbps).




 Link Duplex


 Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically based on the connection (**auto**). The default is **auto**.




 Link State


 Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically based on the connection (**auto**). The default is **auto**.



 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)