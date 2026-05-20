# Device > Log Forwarding Card

*Device : Device &gt; Log Forwarding Card*

## Device > Log Forwarding Card




| • | Device > Log Forwarding Card |
| --- | --- |




The Log Forwarding Card (LFC) is a high-performance log card that forwards all dataplane logs (traffic and threat for example) from the firewall to one or more external logging systems, such as Panorama, Firewall Data Lake, or a syslog server. Because the dataplane logs are no longer available on the local firewall, the ACC tab is removed from the management web interface and **Monitor** > **Logs** contain only management logs (Configuration, System, and Alarms).


You need to configure the ports for the LFC. If you configure LFC 1/1 using a breakout cable, you have access to up to eight 10G breakout ports. This auto-configures ports 1-4 in the first interface and auto-configures ports 5-8 in the second interface. You can use one or both interfaces to provide up to 40G or 80G connectivity respectively. The linked device must be set to use LAG for all ports attached to the LFC.


If you configure LFC 1/9, you have access to up to two 40G ports. This auto-configures port 9 in the first interface and auto-configures port 10 in the second interface. You can use one or both interfaces to provide up to 40G or 80G connectivity respectively. The linked device must be set to use LAG for all ports attached to the LFC.

 Note:



| | The LFC does not currently support LACP. |
| --- | --- |




Configure the ports in **Device Card** > **Log Forwarding**. The firewall uses these ports to forward all dataplane logs to an external system, such as Panorama or a syslog server.


See the [PA-7000 Series Hardware Reference Guide](https://docs.paloaltonetworks.com/hardware/pa-7000-hardware-reference.html) for information about the LFC requirements and components.


For an LFC interface, configure the settings described in the following table.



| LFC Interface Settings | Description |
| --- | --- |
| Name | Enter an interface name. For an LFC, you must select **lfc1/1** or **lfc1/9** from the drop-down menu. |
| Comment | Enter an optional description for the interface. |
| IPv4 | If your network uses IPv4, define the following: • |






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


 Select the interface speed in Mbps (**10000** or **40000**), or select **auto** (default) to have the firewall automatically determine the speed based on the connection. The interface speed available is dependent on the Name used (lfc1/1 or lfc1/9). For interfaces that have a non-configurable speed, **auto** is the only option.




 Link State


 Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically based on the connection (**auto**). The default is **auto**.




 LACP Port Priority


 LACP is currently not supported on the LFC.




Subinterfaces are available if you have multi-vsys enabled. To [configure an LFC subinterface](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/virtual-systems/customize-service-routes-for-a-virtual-system/configure-a-pa-7000-series-firewall-for-logging-per-virtual-system/configure-a-pa-7000-series-lfc-for-logging-per-virtual-system.html), add a subinterface and use the setting described in the following table.

 Note:



| | Log forwarding to an external server is not yet supported on LFC subinterfaces. To forward logs to an external server, you must use the main LFC interface. |
| --- | --- |





| LFC Subinterface Settings | Description |
| --- | --- |
| Interface Name | **Interface Name** (read-only) displays the name of the log card interface you selected. In the adjacent field, enter a numeric suffix (1-9,999) to identify the subinterface. |
| Comment | Enter an optional description for the interface. |
| Tag | Enter the VLAN **Tag** (0-4,094) for the subinterface. Fastpath:  Make the tag the same as the subinterface number for ease of use. |
| Virtual System | Select the virtual system (vsys) to which the Log Forwarding Card (LFC) subinterface is assigned. Alternatively, you can click **Virtual Systems** to add a new vsys. Once an LFC subinterface is assigned to a vsys, that interface is used as the source interface for all services that forward logs (syslog, email, SNMP) from the log card. |
| IPv4 | If your network uses IPv4, define the following: • |






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






 Parent topic
 [Device](device.html#ID0EY2QW)