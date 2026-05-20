# GlobalProtect Portals Agent Internal Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Agent Tab : GlobalProtect Portals Agent Internal Tab*

GlobalProtect Portals Agent Internal Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Agent** > <agent-config> > **Internal** |
| --- | --- |




Select the **Internal** tab to configure the internal gateway settings for an agent configuration.



| GlobalProtect Portal Internal Settings | Description |
| --- | --- |
| Internal Host Detection | |
| Internal Host Detection | Select this option to allow the GlobalProtect app to determine if it is inside the enterprise network. This applies to endpoints when a tunnel is not required in the enterprise network or when the endpoints are configured to communicate with internal gateways. Choosing the internal host detection feature is a best practice for these endpoints. Configuring internal gateways is however optional. When the user attempts to log in, the app does a reverse DNS lookup of an internal host using the specified **IP Address** to the specified **Hostname**. The host serves as a reference point that does not have to be reachable but reverse DNS lookup should be successful only when the endpoint is inside the enterprise network. If the app finds the host, the endpoint is inside the network and the app connects to an internal gateway, if configured, or the GlobalProtect app shows the connection status as internal. If the app fails to find the internal host, the endpoint is outside the network and the app establishes a tunnel to one of the external gateways. • |






| • | The IP address must be compatible with the IP address type. For example, 172.16.1.0 for IPv4 or 21DA:D3:0:2F3b for IPv6. |
| --- | --- |






| • | If you choose **IPv4** and **IPv6**, enter the appropriate IP address type for each. |
| --- | --- |







 Hostname


 Enter the **Hostname** that resolves to the IP address within the internal network.




 Internal Gateways




 Specify the internal gateways to which an app can request access and also provide HIP reports (if HIP is enabled in the [GlobalProtect Portals Agent Data Collection Tab](globalprotect-portals-agent-data-collection-tab.html#ID0EHSR1)).


 **Add** internal gateways that include the following information for each:



| • | **Name**—A label of up to 31 characters to identify the gateway. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| --- | --- |






| • | **Address**—The IP address or FQDN of the firewall interface for the gateway. This value must match the Common Name (CN) and SAN (if specified) in the gateway server certificate. For example, if you used an FQDN to generate the certificate, you must enter the FQDN here. |
| --- | --- |






| • | **Source Address**—A source address or address pool for endpoints. When users connect, GlobalProtect recognizes the source address of the device. Only the GlobalProtect apps with IP addresses that are included in the source address pool can authenticate with this gateway and send HIP reports. |
| --- | --- |






| • | **DHCP Option 43 Code** (`Windows and Mac only`)—DHCP sub-option codes for gateway selection. Specify one or more sub-option codes (in decimal). The GlobalProtect app reads the gateway address from values defined by the sub-option codes. |
| --- | --- |






 Parent topic
 [GlobalProtect Portals Agent Tab](globalprotect-portals-agent-configuration-tab.html#ID0E2TI1)