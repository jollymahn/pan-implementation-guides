# Log Collector Interface Settings

*Panorama Web Interface : Panorama &gt; Managed Collectors : Log Collector Configuration : Log Collector Interface Settings*

Log Collector Interface Settings



| • | Panorama > Managed Collectors > Interfaces |
| --- | --- |




By default, Dedicated Log Collectors (M-Series appliances in Log Collector mode) use the management (MGT) interface for management traffic, log collection, and Collector Group communication. However, Palo Alto Networks recommends that you assign separate interfaces for log collection and Collector Group communication to reduce traffic on the MGT interface. You can improve security by defining a separate subnet for the MGT interface that is more private than the subnets for the other interfaces. To use separate interfaces, you must first configure them on the Panorama management server (see [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). The interfaces that are available for log collection and Collector Group communication vary based on the Log Collector appliance model.


To configure an interface, select the link and configure the settings as described in the following table.

 Note:



| | To complete the configuration of the MGT interface, you must specify the IP address, the netmask (for IPv4) or prefix length (for IPv6), and the default gateway. If you commit a partial configuration (for example, you might omit the default gateway), you can access the firewall or Panorama only through the console port for future configuration changes. |
| --- | --- |



 Fastpath:
 Always commit a complete MGT interface configuration. You cannot commit the configurations for other interfaces unless you specify the IP address, the netmask (for IPv4) or prefix length (for IPv6), and the default gateway.


| Log Collector Interface Settings | Description |
| --- | --- |
| Eth1 / Eth2 / Eth3 / Eth4 / Eth5 | You must enable an interface to configure it. The exception is the MGT interface, which is enabled by default. |
| Speed and Duplex | Configure a data rate and duplex option for the interface. The choices include 10Mbps, 100Mbps, 1Gbps, and 10Gbps (Eth4 and Eth5 only) at full or half duplex. Use the default **auto-negotiate** setting to have the Log Collector determine the interface speed. CAUTION:  This setting must match the interface settings on the neighboring network equipment. |
| IP Address (IPv4) | If your network uses IPv4 addresses, assign an IPv4 address to the interface. |
| Netmask (IPv4) | If you assigned an IPv4 address to the interface, you must also enter a network mask (such as 255.255.255.0). |
| Default Gateway (IPv4) | If you assigned an IPv4 address to the interface, you must also assign an IPv4 address to the default gateway (the gateway must be on the same subnet as the MGT interface). |
| IPv6 Address/Prefix Length | If your network uses IPv6 addresses, assign an IPv6 address to the interface. To indicate the netmask, enter an IPv6 prefix length (such as 2001:400:f00::1/64). |
| Default IPv6 Gateway | If you assigned an IPv6 address to the interface, you must also assign an IPv6 address to the default gateway (the gateway must be on the same subnet as the interface). |
| MTU | Enter the maximum transmission unit (MTU) in bytes for packets sent on this interface (range is 576 to 1,500; default is 1,500). |
| Device Log Collection | Enable the interface for collecting logs from firewalls. For a deployment with high log traffic, you can enable multiple interfaces to perform this function. This function is enabled by default on the MGT interface. |
| Collector Group Communication | Enable the interface for Collector Group communication (the default is the MGT interface). Only one interface can perform this function. |
| Syslog Forwarding | Enable the interface for forwarding syslogs (the default is the MGT interface). Only one interface can perform this function. |
| Network Connectivity Services | The **Ping** service is available on any interface and enables you to test connectivity between the Log Collector interface and external services. The following services are available only on the MGT interface: • |






| • | **SNMP**—Enables the interface to receive statistics queries from an SNMP manager. For details, see [Enable SNMP Monitoring](enable-snmp-monitoring.html#ID0EEVAX). |
| --- | --- |






| • | **User-ID**—Enables the Log Collector to redistribute user mapping information received from User-ID agents. |
| --- | --- |







 Permitted IP Addresses


 Enter the IP addresses of the client systems that can access the Log Collector through this interface.
 An empty list (default) specifies that access is available to any client system.
 Fastpath:
 Palo Alto Networks recommends that you do not leave this list blank; specify the client systems of Panorama administrators (only) to prevent unauthorized access.



 Parent topic
 [Log Collector Configuration](log-collector-configuration.html#ID0E4JP3)