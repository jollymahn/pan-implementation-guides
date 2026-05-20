# Panorama > Setup > Interfaces

*Panorama Web Interface : Panorama &gt; Setup &gt; Interfaces*

## Panorama > Setup > Interfaces




| • | Panorama > Setup > Interfaces |
| --- | --- |




Select **Panorama** > **Setup** > **Interfaces** to configure the interfaces that Panorama uses to manage firewalls and Log Collectors, deploy software and content updates to firewalls and Log Collectors, collect logs from firewalls, and communicate with Collector Groups. By default, Panorama uses the management (MGT) interface for all communication with firewalls and Log Collectors.

 Fastpath:
 To reduce traffic on the MGT interface, configure other interfaces to deploy updates, collect logs, and communicate with Collector Groups. In an environment with heavy log traffic, you can configure several interfaces for log collection. Additionally, to improve the security of management traffic, you can define a separate subnet (IPv4 **Netmask** or IPv6 **Prefix Length**) for the MGT interface that is more private than the subnets for the other interfaces.


| Interface | Maximum Speed | M-700 Appliance | M-600 Appliance | M-300 Appliance | M-200 Appliance | Panorama Virtual Appliance |
| --- | --- | --- | --- | --- | --- | --- |
| Management (MGT) | 1Gbps | | | | | |
| Ethernet1 (Eth1) | 1Gbps | | | | | |
| Ethernet2 (Eth2) | 1Gbps | — | | — | | |
| Ethernet3 (Eth3) | 1Gbps | — | | — | | |
| Ethernet4 (Eth4) | 10Gbps | — | | — | — | |
| Ethernet5 (Eth5) | 10Gbps | — | | — | — | |



Review the logging rates for the all M-Series appliance models. To achieve the logging rates listed below, the M-Series appliance must be a single log collector in a collector group and you must install all the logging disks for your M-Series model. For example, to achieve 50,000 logs/second for the M-600 appliance, you must install all 12 logging disks with 8TB disks.



| Model Capacities and Features | M-700 Appliance | M-600 Appliance | M-300 Appliance | M-200 Appliance |
| --- | --- | --- | --- | --- |
| Maximum Logging Rate for Panorama in Management Only mode | Local log storage is not supported | | | |
| Maximum Logging Rate for Panorama in Panorama Mode | 36,500 logs/second | 25,000 logs/second | 16,500 logs/second | 10,000 logs/second |
| Maximum Logging Rate for Panorama in Log Collector Mode | 73,000 logs/second | 50,000 logs/second | 33,000 logs/second | 28,000 logs/second |
| Maximum Log Storage on Appliance | 48TB (12x8TB RAID disk) | 48TB (12x8TB RAID disk) | 16TB (4x8TB RAID disk) | 16TB (4x8TB RAID disk) |
| Default Log Storage on Appliance | 16TB (4x8TB RAID disks) | 16TB (4x8TB RAID disks) | 16TB (4x8TB RAID disks) | 16TB (4x8TB RAID disks) |
| SSD Storage on Appliance (for logs that M-Series appliances generate) | 240GB | 240GB | 240GB | 240GB |
| NFS Attached Log Storage | Not available | | | |



To configure an interface, click the Interface Name and configure the settings described in the following table.

 Fastpath:
 Always specify the IP address, the netmask (for IPv4) or prefix length (for IPv6), and the default gateway for the MGT interface. If you omit values for some settings (such as the default gateway), you can access Panorama only through the console port for future configuration changes. You cannot commit the configurations for other interfaces unless you specify all three settings. This requirement does not apply to a Panorama virtual appliance on [supported cloud hypervisors](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-overview/panorama-models.html) because only DHCP is support for interfaces.


| Interface Settings | Description |
| --- | --- |
| Eth1 / Eth2 / Eth3 / Eth4 / Eth5 | You must enable an interface to configure it. The exception is the MGT interface, which is enabled by default. |
| Public IP Address | If your firewalls connect to Panorama using a public IP address that is translated to a private IP address (NAT), enter the public IP address to the interface. |
| IP Address (IPv4) | If your network uses IPv4 addresses, assign an IPv4 address to the interface. |
| Netmask (IPv4) | If you assigned an IPv4 address to the interface, you must also enter a network mask (such as 255.255.255.0). |
| Default Gateway (IPv4) | If you assigned an IPv4 address to the interface, you must also assign an IPv4 address to the default gateway (the gateway must be on the same subnet as the interface). |
| IPv6 Address/Prefix Length | If your network uses IPv6 addresses, assign an IPv6 address to the interface. To indicate the netmask, enter an IPv6 prefix length (such as 2001:400:f00::1/64). Note:  |







 Default IPv6 Gateway


 If you assigned an IPv6 address to the interface, you must also assign an IPv6 address to the default gateway (the gateway must be on the same subnet as the interface).
 Note:



| | An IPv6 address is supported for the MGT interface on all M-Series appliances and Panorama virtual appliances deployed in a private cloud environment (ESXi, vCloud Air, KVM, or Hyper-V). An IPv6 address is not supported for the MGT interface on a Panorama virtual appliance deployed in a public cloud environment (Amazon Web Services (AWS), AWS GovCloud, Microsoft Azure, or Google Cloud Platform). |
| --- | --- |







 Speed


 Set the speed for the interface to 10Mbps, 100Mbps, 1Gbps, or 10Gbps (Eth4 and Eth5 only) at full or half duplex. Use the default auto-negotiate setting to have Panorama determine the interface speed.
 CAUTION:
 This setting must match the interface settings on neighboring network equipment. To ensure matching settings, select auto-negotiate if the neighboring equipment supports that option.




 MTU


 Enter the maximum transmission unit (MTU) in bytes for packets sent on this interface (range is 576 to 1,500; default is 1,500).




 Device Management and Device Log Collection


 Enable the interface (enabled by default on the MGT interface) for managing firewalls and Log Collectors and collecting their logs. You can enable multiple interfaces to perform these functions.




 Collector Group Communication


 Enable the interface for Collector Group communication (the default is the MGT interface). Only one interface can perform this function.




 Syslog Forwarding


 Enable the interface for forwarding syslogs (the default is the MGT interface). Only one interface can perform this function.




 Device Deployment


 Enable the interface for deploying software and content updates to firewalls and Log Collectors (the default is the MGT interface). Only one interface can perform this function.




 Administrative Management Services





| • | **HTTP**—Enables access the Panorama web interface. HTTP uses plaintext, which is not as secure as HTTPS. |
| --- | --- |



 Fastpath:
 Enable **HTTPS** instead of HTTP for management traffic on the interface.



| • | **Telnet**—Enables access the Panorama CLI. Telnet uses plaintext, which is not as secure as SSH. |
| --- | --- |






| • | **HTTPS**—Enables secure access to the Panorama web interface. |
| --- | --- |



 Fastpath:
 Enable **SSH** instead of Telnet for management traffic on the interface.



| • | **SSH**—Enables secure access to the Panorama CLI. |
| --- | --- |







 Network Connectivity Services


 The **Ping** service is available on any interface. You can use ping to test connectivity between the Panorama interface and external services. In a high availability (HA) deployment, HA peers use ping to exchange heartbeat backup information.
 The following services are available only on the MGT interface:



| • | **SNMP**—Enables Panorama to process statistics queries from an SNMP manager. For details, see [Enable SNMP Monitoring](enable-snmp-monitoring.html#ID0EEVAX). |
| --- | --- |






| • | **User-ID**—Enables Panorama to redistribute user mapping information received from User-ID agents. |
| --- | --- |







 Permitted IP Addresses


 Enter the IP addresses from which administrators can access Panorama on this interface. An empty list (default) specifies that access is available from any IP address.
 Fastpath:
 Do not leave this list blank; specify the IP addresses of Panorama administrators (only) to prevent unauthorized access.



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)