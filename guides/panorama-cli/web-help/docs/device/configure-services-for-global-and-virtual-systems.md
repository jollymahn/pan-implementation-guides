# Configure Services for Global and Virtual Systems

*Device : Device &gt; Setup &gt; Services : Configure Services for Global and Virtual Systems*

Configure Services for Global and Virtual Systems

On a firewall where multiple virtual systems are enabled, select **Services** to display the **Global** and **Virtual Systems** tabs where you set services that the firewall or its virtual systems, respectively, use to operate efficiently. (If the firewall is a single virtual system or if multiple virtual systems are disabled, the **Virtual Systems** tab is not shown.)


Select **Global** to set services for the whole firewall. These settings are also used as the default values for virtual systems that do not have a customized setting for a service.




| • | Edit **Services** to define the destination IP addresses of DNS servers, the Update Server, and the Proxy Server. Use the dedicated **NTP** tab to configure Network Time Protocol settings. [Global Services Settings](global-services-settings.html#ID0ESPFX) describe the available Services options. |
| --- | --- |






| • | In **Service Features**, click **Service Route Configuration** to specify how the firewall will communicate with other servers/devices for services such as DNS, email, LDAP, RADIUS, syslog, and many more. There are two ways to configure global service routes: |
| --- | --- |






| ◦ | The **Use Management Interface for all** option will force all firewall service communications with external servers through the management interface (MGT). If you select this option, you must configure the MGT interface to allow communications between the firewall and the servers/devices that provide services. To configure the MGT interface, select [Device > Setup > Management](device-setup-management.html#ID0E1DTW) and edit the settings. |
| --- | --- |



 Note:**When a service request originates from a firewall that has IPv6 enabled and has both IPv4 and IPv6 configured, the firewall behaves as a dual-stack host. Consequently, if the DNS resolution returns an IPv6 address as the first result, the firewall attempts to use that as the destination address.
 Note:Additionally, in cases where the management interface is configured with only an IPv4 address and lacks a valid IPv6 configuration, if the DNS resolution returns an IPv6 address as the first result, the firewall doesn't **Use Management Interface for all** (which would be an IPv4 address). The firewall instead uses a dataplane IPv6 interface address as the source for the service request. Thus the service route has an IPv6 address at each end of the route.



| ◦ | The Customize** option allows you granular control over service communication by configuring a specific source interface and IP address that the service will use as the destination interface and destination IP address in its response. (For example, you could configure a specific source IP/ interface for all email communication between the firewall and an email server, and use a different source IP/interface for Palo Alto Networks Services.) Select the one or more services you want to customize to have the same settings and click **Set Selected Service Routes**. The services are listed in [IPv4 and IPv6 Support for Service Route Configuration](ipv4-and-ipv6-support-for-service-route-configuration.html#ID0EK1GX), which indicates whether a service can be configured for the **Global** firewall or **Virtual Systems**, and whether the service supports an IPv4 and/or IPv6 source address. |
| --- | --- |




The **Destination** tab is another Global service route feature that you can customize. This tab appears in the Service Route Configuration window and is described in [Destination Service Route](destination-service-route.html#ID0E5ZJX).


Use the **Virtual Systems** tab to specify service routes for a single virtual system. Select a Location (virtual system) and click **Service Route Configuration**. Select **Inherit Global Service Route Configuration** or **Customize** [service routes for a virtual system](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/virtual-systems/customize-service-routes-for-a-virtual-system). If you choose to customize settings, select **IPv4** or **IPv6**. Select the one or more services you want to customize to have the same settings and click **Set Selected Service Routes**. See [IPv4 and IPv6 Support for Service Route Configuration](ipv4-and-ipv6-support-for-service-route-configuration.html#ID0EK1GX) for services that can be customized.


To control and redirect DNS queries between shared and specific virtual systems, you can use a [DNS proxy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/dns-proxy-object.html) and a [DNS Server profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/dns-server-profile.html).

 Parent topic
 [Device > Setup > Services](device-setup-services.html#ID0EJYEX)