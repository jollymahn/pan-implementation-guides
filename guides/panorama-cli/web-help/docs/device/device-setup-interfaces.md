# Device > Setup > Interfaces

*Device : Device &gt; Setup &gt; Interfaces*

## Device > Setup > Interfaces


Use this page to configure connection settings, allowed services, and administrative access for the management (MGT) interface on all firewall models and for the auxiliary interfaces (AUX-1 and AUX-2) on PA-5200 Series firewalls.


Palo Alto Networks recommends that you always specify the IP address and netmask (for IPv4) or prefix length (for IPv6) and the default gateway for every interface. If you omit any of these settings for the MGT interface (such as the default gateway), you can access the firewall only through the console port for future configuration changes.

 Note:



| | To configure the MGT interface on a M-Series appliance or the Panorama virtual appliance, see [Panorama > Setup > Interfaces](panorama-setup-interfaces.html#ID0EOVP2). |
| --- | --- |



 You can use a loopback interface as an alternative to the MGT interface for firewall management ([Network > Interfaces > Loopback](network-interfaces-loopback.html#ID0EA6NT)).


| Item | Description |
| --- | --- |
| IPv4 or IPv6 (`MGT interface only`) | Select **IPv4** or **IPv6**. |
| Type (`MGT interface only`) | For **IPv4**, for **Type**, select one: • |






| • | **DHCP Client**—Configures the MGT interface as a DHCP client so that the firewall can send DHCP Discover or Request messages to find a DHCP server. The server responds by providing an IP address (IPv4), netmask (IPv4), and default gateway for the MGT interface. DHCP on the MGT interface is turned off by default for the VM-Series firewall (except for the VM-Series firewall in AWS and Azure). If you select **DHCP Client**, optionally select either or both of the following Client Options: |
| --- | --- |






| ◦ | **Send Hostname**—Causes the MGT interface to send its hostname to the DHCP server as part of DHCP Option 12. |
| --- | --- |






| ◦ | **Send Client ID**—Causes the MGT interface to send its client identifier as part of DHCP Option 61. |
| --- | --- |



 For **IPv6**, **Enable IPv6**.
 For **Type**, select one:



| • | **Static**—Manually enter the **IPv6 Address/Prefix Length**, which is described further down in this table. |
| --- | --- |






| • | **Dynamic**—The options are described further down in this table. |
| --- | --- |







 Show DHCP Client Runtime Info


 If you select **DHCP Client**, optionally click **Show DHCP Client Runtime Info** to view the dynamic IP interface status:



| • | Interface—Indicates MGT interface. |
| --- | --- |






| • | IP Address—IP address of the MGT interface. |
| --- | --- |






| • | Netmask—Subnet mask for the IP address, which indicates which bits are network or subnetwork and which bits are host. |
| --- | --- |






| • | Gateway—Default gateway for traffic leaving the MGT interface. |
| --- | --- |






| • | Primary/Secondary NTP—IP address of up to two NTP servers serving the MGT interface. If the DHCP Server returns NTP server addresses, the firewall considers them only if you did not manually configure NTP server addresses. If you manually configured NTP server addresses, the firewall does not overwrite them with those from the DHCP server. |
| --- | --- |






| • | Lease Time—Number of days, hours, minutes, and seconds that the DHCP IP address is assigned. |
| --- | --- |






| • | Expiry Time—Year/Month/Day, Hours/Minutes/Seconds, and time zone, indicating when the DHCP lease will expire. |
| --- | --- |






| • | DHCP Server—IP address of the DHCP Server responding to MGT interface DHCP Client. |
| --- | --- |






| • | Domain—Name of domain to which the MGT interface belongs. |
| --- | --- |






| • | DNS Server—IP address of up to two DNS servers serving the MGT interface. If the DHCP Server returns DNS server addresses, the firewall considers them only if you did not manually configure DNS server addresses. If you manually configured DNS server addresses, the firewall does not overwrite them with those from the DHCP server. |
| --- | --- |



 Optionally, you can **Renew** the DHCP lease for the IP address assigned to the MGT interface. Otherwise, **Close** the window.




 Aux 1 / Aux 2
 (`PA-5200 Series firewalls only`)


 Select any of the following options to enable an auxiliary interface. These interfaces provide 10 Gbps (SFP+) throughput for:



| • | Firewall management traffic—You must enable the [Network Services](device-setup-interfaces.html#ID0EQ5LX) (protocols) that administrators will use when accessing the web interface and CLI to manage the firewall. |
| --- | --- |



 Fastpath:
 Enable HTTPS instead of HTTP for the web interface and enable SSH instead of Telnet for the CLI.



| • | High availability (HA) synchronization between firewall peers—After configuring the interface, you must select it as the HA Control Link (**Device** > **High Availability** > **General**). |
| --- | --- |






| • | Log forwarding to Panorama—You must configure a service route with the **Panorama Log Forwarding** service enabled ([Device > Setup > Services](device-setup-services.html#ID0EJYEX)). |
| --- | --- |







 IP Address (IPv4 Static)


 If you chose IPv4 Static, assign an IPv4 address to the interface. Alternatively, you can assign the IP address of a loopback interface for firewall management (see [Network > Interfaces > Loopback](network-interfaces-loopback.html#ID0EA6NT)). By default, the IP address you enter is the source address for log forwarding.




 Netmask (IPv4 Static)


 If you assigned an IPv4 address to the interface, you must also enter a network mask (for example, 255.255.255.0).




 Default Gateway (IPv4)


 If you assigned an IPv4 address to the interface, you must also assign an IPv4 address to the default gateway (the gateway must be on the same subnet as the interface).




 IPv6 Address/Prefix Length (Static)


 If you chose IPv6 Static, assign an IPv6 address to the interface. To indicate the netmask, include the prefix length (for example, 2001:db8:300::1/64).




 IPv6 Address Type (Dynamic)


 If you chose IPv6 Type to be **Dynamic**, the MGT interface is an IPv6 SLAAC/DHCPv6 client. Select any combination of DHCPv6 client options:



| • | **Non Temporary Address**—(default) This address type has a longer lifespan than a Temporary Address. |
| --- | --- |






| • | **Temporary Address**—Select for a greater level of security because the address is intended to be used for a short period of time. |
| --- | --- |






| • | **Rapid Commit**—Select to use the DHCPv6 process of Solicit and Reply messages (two messages) rather than the process of Solicit, Advertise, Request, and Reply messages (four messages). |
| --- | --- |






| • | **DUID Type**—**D**HCPv6 **U**nique** Id**entifier that the management interface uses to identify itself to the DHCPv6 server. |
| --- | --- |






| ◦ | **duid-type-llt**—DUID-LLT; the Link-Layer address of the management interface, concatenated with a timestamp. |
| --- | --- |






| ◦ | **duid-type-ll**—DUID-LL; the Link-Layer address of the management interface. |
| --- | --- |







 Default Gateway Type (IPv6)


 If you assigned an IPv6 address to the interface, you must also assign or receive a **Default IPv6 Gateway Address**. Select the type of address assignment for the default gateway:



| • | **Static**—Enter the **Default IPv6 Gateway Address** (the gateway must be on the same subnet as the interface); for example, 2001:db8:300::5. |
| --- | --- |






| • | **Dynamic**—Firewall learns the IPv6 default gateway address from the Router Advertisement (RA) messages coming from a neighboring router (gateway) in response to a Router Solicitation (RS). If there is only one router attached to the link, the source address of the router's RA messages is configured as the default gateway address. If there are multiple routers attached to the link, the firewall sets its default gateway address to the source address of the RA messages that have the highest router preference value (Low, Medium, or High). |
| --- | --- |



 If you choose Dynamic, you can **Show Gateway Address Info**.




 Speed


 Configure a data rate and duplex option for the interface. The choices include 10 Mbps, 100 Mbps, and 1 Gbps at full or half duplex. Use the default autonegotiate setting to have the firewall determine the interface speed.
 CAUTION:
 This setting must match the port settings on the neighboring network equipment. To ensure matching settings, select auto-negotiate if the neighboring equipment supports that option.




 MTU


 Enter the maximum transmission unit (MTU) in bytes for packets sent on this interface (range is 576 to 1,500; default is 1,500).




 Administrative Management Services





| • | **HTTP**—Use this service to access the firewall web interface. |
| --- | --- |



 Fastpath:
 HTTP uses plaintext, which isn't as secure as HTTPS. Therefore, Palo Alto Networks recommend you enable **HTTPS** instead of HTTP for management traffic on the interface.



| • | **Telnet**—Use this service to access the firewall CLI. |
| --- | --- |



 Fastpath:
 Telnet uses plaintext, which isn't as secure as SSH. Therefore, Palo Alto Networks recommend you enable SSH instead of Telnet for management traffic on the interface.



| • | **HTTPS**—Use this service for secure access to the firewall web interface. |
| --- | --- |






| • | **SSH**—Use this service for secure access to the firewall CLI. |
| --- | --- |







 Network Services


 Select the services you want to enable on the interface:



| • | **HTTP OCSP**—Use this service to configure the firewall as an Online Certificate Status Protocol (OCSP) responder. For details, see [Device > Certificate Management > OCSP Responder](device-certificate-management-ocsp-responder.html#ID0E1DCZ). |
| --- | --- |






| • | **Ping**—Use this service to test connectivity with external services. For example, you can ping the interface to verify it can receive PAN-OS software and content updates from the Palo Alto Networks Update Server. In a high availability (HA) deployment, HA peers use ping to exchange heartbeat backup information. |
| --- | --- |






| • | **SNMP**—Use this service to process firewall statistics queries from an SNMP manager. For details, see [Enable SNMP Monitoring](enable-snmp-monitoring.html#ID0EEVAX). |
| --- | --- |






| • | **User-ID**—Use this service to enable [data redistribution](device-data-redistribution.html#ID0EDBKY) of user mappings among firewalls. |
| --- | --- |






| • | **User-ID Syslog Listener-SSL**—Use this service to enable the PAN-OS integrated User-ID™ agent to collect syslog messages over SSL. For details, see [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z). |
| --- | --- |






| • | **User-ID Syslog Listener-UDP**—Use this service to enable the PAN-OS integrated User-ID agent to collect syslog messages over UDP. For details, see [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z). |
| --- | --- |







 Permitted IP Addresses


 Enter the IP addresses from which administrators can access the firewall through the interface. An empty list (default) specifies that access is available from any IP address.
 Fastpath:
 Don't leave the list blank; specify only the IP addresses of firewall administrators to prevent unauthorized access.



 Parent topic
 [Device](device.html#ID0EY2QW)