# IPv4 and IPv6 Support for Service Route Configuration

*Device : Device &gt; Setup &gt; Services : IPv4 and IPv6 Support for Service Route Configuration*

IPv4 and IPv6 Support for Service Route Configuration

The following table shows IPv4 and IPv6 support for service route configurations on global and virtual systems.



| Service Route Configuration Settings | Global | | Virtual System | |
| --- | --- | --- | --- | --- |
| | IPv4 | IPv6 | IPv4 | IPv6 |
| **AutoFocus**—AutoFocus™ server. | | — | — | — |
| **CRL Status**—Certificate revocation list (CRL) server. | | | — | — |
| **Data Services—** Send data to Palo Alto Networks cloud services from the firewall dataplane. Optimized for faster data transfer and prevents data loss. Required for IoT security, Enterprise DLP, and SaaS Security. | | | | |
| **DDNS**—Dynamic DNS service. | | | | |
| **Panorama pushed updates**—Content and software updates deployed from Panorama™. | | | — | — |
| **DNS**—Domain Name System server. *For virtual systems, DNS is done in the DNS Server Profile. | | | * | * |
| **External Dynamic Lists**—Updates for external dynamic lists. | | | — | — |
| **Email**—Email server. | | | | |
| **HSM**—Hardware security module server. | | — | — | |
| **HTTP**—HTTP forwarding. | | | | |
| **Kerberos**—Kerberos authentication server. | | — | | |
| **LDAP**—Lightweight Directory Access Protocol server. | | | | |
| **MDM**—Mobile Device Management server. | | | — | — |
| **Multi-Factor Authentication**—Multi-factor authentication (MFA) server. | | | | |
| **NetFlow**—NetFlow collector for collecting network traffic statistics. | | | | |
| **NTP**—Network Time Protocol server. | | | — | — |
| **Palo Alto Networks Services**—Updates from Palo Alto Networks® and the public WildFire® server. This is also the service route for forwarding [pre-10.0 telemetry data](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/device-telemetry/device-telemetry-configure/device-telemetry-historical.html) to Palo Alto Networks. (Current telemetry support forwards its data to Strata Logging Service. This service route is not used in that case.) | | — | — | — |
| **Panorama**—Panorama management server. | | | — | — |
| **Panorama Log Forwarding (**`PA-5200 Series firewalls only`**)**—Log forwarding from the firewall to Log Collectors. | | | — | — |
| **Proxy**—Server that is acting as Proxy to the firewall. | | | — | — |
| **RADIUS**—Remote Authentication Dial-in User Service server. | | | | |
| **SCEP**—Simple Certificate Enrollment Protocol for requesting and distributing client certificates. | | | | — |
| **SNMP Trap**—Simple Network Management Protocol trap server. | | — | | — |
| **Syslog**—Server for system message logging. | | | | |
| **TACACS+**—Terminal Access Controller Access-Control System Plus (TACACS+) server for authentication, authorization, and accounting (AAA) services. | | | | |
| **UID Agent**—User-ID Agent server. | | | — | |
| **URL Updates**—Uniform Resource Locator (URL) updates server. | | | — | — |
| **VM Monitor**—Monitoring Virtual Machine information, when you have enabled [Device > VM Information Sources](device-vm-information-sources.html#ID0EGQMY). Note:  | VM-Series firewalls in public cloud deployments that are monitoring virtual machines, must use the MGT interface. You cannot use a dataplane interface as a service route. | | | |



















 **WildFire Private**—Private Palo Alto Networks WildFire server.





 —


 —


 —




When customizing a **Global** service route, select **Service Route Configuration** and, on the **IPv4** or **IPv6** tab, select a service from the list of available services; you can also select multiple services and **Set Selected Service Routes** to configure multiple service routes at once. To limit the selections in the **Source Address** drop-down, select a **Source Interface** and then a **Source Address** (from that interface). A Source Interface that is set to **Any** allows you to select a Source Address from any of the available interfaces. The Source Address displays the IPv4 or IPv6 address assigned to the selected interface and the selected IP address will be the source for the service traffic. You can **Use default** if you want the firewall to use the management interface for the service route; however, if the packet destination IP address matches the configured Destination IP address, the source IP address will be set to the Source Address configured for the Destination. You do not have to define a destination address because the destination is configured when you configure each service. For example, when you define your DNS servers (**Device** > **Setup** > **Services**), you will set the destination for DNS queries. You can specify both an IPv4 and an IPv6 address for a service.


An alternative way to customize a **Global** service route is to select **Service Route Configuration** and select **Destination**. Specify a **Destination** IP address to which an incoming packet is compared. If the packet destination address matches the configured Destination IP address, the source IP address is set to the Source Address configured for the Destination. To limit the selections in the **Source Address** drop-down, select a **Source Interface** and then select a **Source Address** (from that interface). A Source Interface that is set to **Any** allows you to select a Source Address from any of the interfaces available. The **MGT** Source Interface causes the firewall to use the management interface for the service route.


When you configure service routes for a **Virtual System**, choosing to **Inherit Global Service Route Configuration** means that all services for the virtual system will inherit the global service route settings. You can, instead, choose **Customize**, select **IPv4** or **IPv6**, and select a service; you can also select multiple services and **Set Selected Service Routes**. The **Source Interface** has the following three choices:




| • | **Inherit Global Setting**—The selected services inherit the global settings for those services. |
| --- | --- |






| • | **Any**—Allows you to select a Source Address from any of the interfaces available (interfaces in the specific virtual system). |
| --- | --- |






| • | **An interface from the drop-down**—Limits the drop-down for **Source Address** to the IP addresses for this interface. |
| --- | --- |




For **Source Address**, select an address from the drop-down. For the services selected, server responses are sent to this source address.

 Parent topic
 [Device > Setup > Services](device-setup-services.html#ID0EJYEX)