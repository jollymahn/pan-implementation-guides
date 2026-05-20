# Client Settings Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Gateways : GlobalProtect Gateways Agent Tab : Client Settings Tab*

Client Settings Tab



| • | **Network** > **GlobalProtect** > **Gateways** > <gateway-config> > **Agent** > <agent-config> > **Client Settings** |
| --- | --- |




Select the **Client Settings** tab to configure settings for the virtual network adapter on the endpoint when the GlobalProtect app establishes a tunnel with the gateway.

 Note:



| | Some Client Settings options are available only after you enable tunnel mode and define a tunnel interface on the [Tunnel Settings Tab](tunnel-settings-tab.html#ID0EO2W1). |
| --- | --- |





| GlobalProtect Gateway Client Settings and Network Configuration | Description |
| --- | --- |
| `Config Selection Criteria tab` | |
| Name | Enter a name to identify the client settings configuration (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Source User | **Add** the specific users or user groups to which this configuration applies. Note:  |



 To deploy this configuration to all users, select **any** from the **Source User** drop-down. To deploy this configuration only to users with GlobalProtect apps in pre-logon mode, select **pre-logon** from the **Source User** drop-down.
 Note:



| | The client settings configuration is deployed to users only if the user matches the criteria for **Source User**, **OS**, AND **Source Address**. |
| --- | --- |







 OS


 To deploy this configuration based on the operating system of the endpoint, **Add** an OS (**Android**, **Chrome**, **iOS**, **IoT**, **Linux**, **Mac**, **Windows**, **WindowsUWP**). Alternatively, you can set this value to **Any** so that configuration deployment is based only on the user or user group and not on the operating system of the endpoint.
 Note:



| | The client settings configuration is deployed to users only if the user matches the criteria for **Source User**, **OS**, AND **Source Address**. |
| --- | --- |







 Source Address


 To deploy this configuration based on user location, **Add** a source **Region** or local **IP Address** (IPv4 and IPv6). To deploy this configuration to all user locations, do not specify a **Region** or **IP Address**. You must also leave these fields empty if your users are running GlobalProtect app 4.0 and earlier releases, as this feature is not supported on older GlobalProtect app releases.
 Note:



| | The **Source Address** match is successful if the location of a connecting user matches either the **Region** or the **IP Address** that you configure. |
| --- | --- |



 Note:



| | The client settings configuration is deployed to users only if the user matches the criteria for **Source User**, **OS**, AND **Source Address**. |
| --- | --- |







 `Authentication Override tab`




 Authentication Override


 Enable the gateway to use secure, device-specific, encrypted cookies to authenticate the user after the user first authenticates using the authentication scheme specified by the authentication or certificate profile.



| • | **Generate cookie for authentication override**—During the lifetime of the cookie, the agent presents this cookie each time the user authenticates with the gateway. |
| --- | --- |






| • | **Cookie Lifetime**—Specify the hours, days, or weeks that the cookie is valid. The typical lifetime is 24 hours. The ranges are 1–72 hours, 1–52 weeks, or 1–365 days. After the cookie expires, the user must enter login credentials and the gateway subsequently encrypts a new cookie to send to user device. |
| --- | --- |






| • | **Accept cookie for authentication override**—Select this option to configure the gateway to accept authentication using the encrypted cookie. When the agent presents the cookie, the gateway validates that the cookie was encrypted by the gateway before authenticating the user. |
| --- | --- |






| • | **Certificate to Encrypt/Decrypt Cookie**—Select the certificate the gateway uses to use when encrypting and decrypting the cookie. |
| --- | --- |



 Note:



| | Ensure that the gateway and portal both use the same certificate to encrypt and decrypt cookies. |
| --- | --- |







 `IP Pools tab`




 Retrieve Framed-IP-Address attribute from authentication server


 Select this option to enable the GlobalProtect gateway to assign fixed IP addresses by use of an external authentication server. When this option is enabled, the GlobalProtect gateway allocates the IP address for connecting to devices by using the Framed-IP-Address attribute from the authentication server.




 Authentication Server IP Pool


 **Add** a subnet or range of IP addresses to assign to remote users. When the tunnel is established, the GlobalProtect gateway allocates the IP address in this range to connecting devices using the Framed-IP-Address attribute from the authentication server. You can add IPv4 addresses (such as 192.168.74.0/24 and 192.168.75.1-192.168.75.100) or IPv6 addresses (such as 2001:aa::1-2001:aa::10).
 You can enable and configure **Authentication Server IP Pool** only if you enable **Retrieve Framed-IP-Address attribute from authentication server**.
 Note:



| | The authentication server IP pool must be large enough to support all concurrent connections. IP address assignment is fixed and is retained after the user disconnects. Configure multiple ranges from different subnets to allow the system to offer clients an IP address that does not conflict with other interfaces on the client. |
| --- | --- |



 The servers and routers in the networks must route the traffic for this IP pool to the firewall. For example, for the 192.168.0.0/16 network, a remote user can receive the address 192.168.0.10.




 IP Pool


 **Add** a range of IP addresses to assign to remote users. When the tunnel is established, an interface is created on the remote user’s endpoint with an address in this range. You can add IPv4 addresses (such as 192.168.74.0/24 and 192.168.75.1-192.168.75.100) or IPv6 addresses (such as 2001:aa::1-2001:aa::10).
 Note:



| | To avoid conflicts, the IP pool must be large enough to support all concurrent connections. The gateway maintains an index of clients and IP addresses so that the client automatically receives the same IP address the next time it connects. Configuring multiple ranges from different subnets allows the system to offer clients an IP address that does not conflict with other interfaces on the client. |
| --- | --- |



 The servers and routers in the networks must route the traffic for this IP pool to the firewall. For example, for the 192.168.0.0/16 network, a remote user may be assigned the address 192.168.0.10.




 `Split Tunnel tab`




 Access Route tab




 No direct access to local network


 Use this option to enable or disable local network access on Windows, macOS and Linux endpoints (Linux endpoints must be running GlobalProtect app version 6.0.0 or later) when users are connected to GlobalProtect. When this option is enabled users cannot send traffic directly to proxies or local resources such as printers while connected to GlobalProtect. Split tunnel traffic based on access route, destination domain, and application still works as expected.
 This options is supported on Windows, macOS, and Linux endpoints (Linux endpoints must be running GlobalProtect app version 6.0.0 or later).
 Fastpath:**Enable the **No direct access to local network** setting to reduce risks in untrusted networks such as rogue Wi-Fi access points.




 Include


 Add** routes to include in the VPN tunnel. These are the routes the gateway pushes to the remote users’ endpoint to specify what user endpoints can send through the VPN connection.
 You can include IPv6 or IPv4 subnets. On PAN-OS 8.0.2 and later releases, up to 100 access routes can be used to include traffic in a split tunnel gateway configuration. Unless combined with GlobalProtect app 4.1.x or a later release, up to 1,000 access routes can be used.
 Note:



| | To include all destination subnets or address objects, **Include** 0.0.0.0/0 and ::/0 as access routes. |
| --- | --- |







 Exclude


 **Add** routes to exclude from the VPN tunnel. These routes are sent through the physical adapter on endpoints rather than through the virtual adapter (the tunnel).
 You can define the routes you send through the VPN tunnel as routes you include in the tunnel, routes you exclude from the tunnel, or a combination of both. For example, you can set up split tunneling to allow remote users to access the internet without going through the VPN tunnel. Excluded routes should be more specific than the included routes to avoid excluding more traffic than you intend to exclude.
 You can exclude IPv6 or IPv4 subnets. The firewall supports up to 100 exclude access routes in a split tunnel gateway configuration. Unless combined with GlobalProtect app 4.1 and later releases, up to 200 exclude access routes can be used. You cannot exclude access routes for endpoints running Android on Chromebooks. Only IPv4 routes are supported on Chromebooks.
 If you do not enable split tunneling, every request is routed through the tunnel (no split tunneling). In this case, each internet request passes through the firewall and then out to the network. This method can prevent the possibility of an external party accessing user endpoints and gaining access to the internal network (with a user endpoint acting as a bridge).




 Domain and Application tab




 Include Domain


 **Add** the software as a service (SaaS) or public cloud applications that you want to include in the VPN tunnel based on the destination domain and port (optional). These are the applications the gateway pushes to the remote users’ endpoint to specify what user endpoints can send through the VPN connection. ICMP is not included. You can add up to 200 entries to the list.
 For example, add the *.office365.com domain to allow all Office 365 traffic to go through the VPN tunnel.
 Note:



| | You can configure a list of ports for each domain. If no ports are configured, all ports for the specified domain are subject to this policy. |
| --- | --- |







 Exclude Domain


 **Add** the software as a service (SaaS) or public cloud applications that you want to exclude from the VPN tunnel based on the destination domain and port (optional). These applications are sent through the physical adapter on endpoints rather than the virtual adapter (the tunnel). You can add up to 200 entries to the list.
 For example, add the *.ringcentral.com domain to exclude all RingCentral traffic from the VPN tunnel.
 Note:



| | You can configure a list of ports for each domain. If no ports are configured, all ports for the specified domain are subject to this policy. |
| --- | --- |



 If you do not enable split tunneling, every request is routed through the tunnel (no split tunneling). In this case, each Internet request passes through the firewall and out to the network. This method can prevent external parties from accessing user endpoints to gain access to the internal network.




 Include Client Application Process Name


 **Add** the complete path of each application process for which you want to include the traffic in your VPN tunnel. These are the applications the gateway pushes to the endpoints of remote users to specify what those user endpoints can send through the VPN connection. You can add up to 200 entries to the list.
 For example, add /Application/Safari.app/Contents/MacOS/Safari to allow all Safari-based traffic to go through the VPN tunnel on macOS endpoints.




 Exclude Client Application Process Name


 **Add** the complete path of each application process for which you want to exclude the traffic from your VPN tunnel. These applications are sent through the physical adapter on endpoints rather than the virtual adapter (the tunnel). You can add up to 200 entries to the list.
 For example, to exclude traffic from the RingCentral application:



| • | For Windows endpoints, add %AppData%\Local\RingCentral\SoftPhoneApp\Softphone.exe and %AppData%\Local\RingCentral\SoftPhoneApp\SoftphoneMapiBridge.exe |
| --- | --- |






| • | For macOS endpoints, add /Applications/RignCentral for Mac.app/Contents/MacOS/Softphone |
| --- | --- |



 If you do not enable split tunneling, every request is routed through the tunnel (no split tunneling). In this case, each Internet request passes through the firewall and out to the network. This method can prevent external parties from accessing user endpoints to gain access to the internal network.




 `Network Services tab`




 DNS Server


 Specify the IP address of the DNS server to which the GlobalProtect app with this client setting configuration sends DNS queries. You can add multiple DNS servers by separating each IP address with a comma.




 DNS Suffix


 Specify the DNS suffix that the endpoint should use locally when an unqualified hostname is entered that the endpoint cannot resolve. You can enter multiple DNS suffixes (up to 100) by separating each suffix with a comma.



 Parent topic
 [GlobalProtect Gateways Agent Tab](globalprotect-gateways-agent-tab.html#ID0EDKW1)