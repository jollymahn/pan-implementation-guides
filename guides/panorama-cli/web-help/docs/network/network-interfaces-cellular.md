# Network > Interfaces > Cellular

*Network : Network &gt; Interfaces &gt; Cellular*

## Network > Interfaces > Cellular


Click **Add** and use the following fields to configure a cellular interface:



| Cellular Interface Settings | Configure In | Description |
| --- | --- | --- |
| Slot | **Cellular Interface** | Select the **Slot** that you want to use for the interface: • |






 Interface Name


 Select the **Interface Name** that you want to use.




 Comment


 Optionally enter a **Comment** about the interface.




 Netflow Profile


 If you want to export unidirectional IP traffic that traverses an ingress interface to a NetFlow server, select the server profile or click **Netflow Profile** to define a new profile (see [Device > Server Profiles > NetFlow](device-server-profiles-netflow.html#ID0EOFNZ)). Select **None** to remove the current NetFlow server assignment from the interface.




 Virtual Router


 **Cellular Interface** > **Config**


 Assign a virtual router to the interface, or click **New Virtual Router** to define a new one (see [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)). Select **None** to remove the current virtual router assignment from the interface.




 Logical Router


 Assign a logical router to the interface, or click **New Logical Router** to define a new one (see [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)). Select **None** to remove the current logical router assignment from the interface.




 Security Zone


 Select a security zone for the interface, or click **New Zone** to define a new zone. Select **None** to remove the current zone assignment from the interface.




 Radio


 Select the **Radio** setting.



| • | **Off**—(Default value) Disables the radio setting and the cellular interface. |
| --- | --- |





| • | **On**—Enables the radio setting and the cellular interface. |
| --- | --- |


 This option allows you to reset the radio settings during troubleshooting.




 GPS


 Select the **GPS** setting.
 Note:**To enable the GPS option, you must select **On** for the Radio** option as well as the **GPS** option.



| • | **Off**—(Default value) Disables the GPS setting. |
| --- | --- |





| • | **On**—Enables the GPS setting. |
| --- | --- |






 Primary SIM Slot


 Select the **Primary SIM Slot** that contains the SIM card you want the firewall or Panorama to use for the interface.




 (`PAN-OS 11.2.3 and later releases, SD-WAN plugin 3.3.1 and later releases`) Enable SD-WAN


 **Cellular Interface** > **IPv4**


 Select this option to enable SD-WAN on the cellular interface. SD-WAN enabled cellular interface support automatic traffic steering based on the collected metrics amongst qualified paths/links for the cellular and wireless WAN connection.




 Automatically create default route pointing to network provided default gateway


 Select whether you want the firewall or Panorama to **Automatically create default route pointing to network provided default gateway**. This option is enabled by default and creates a [default route](https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-advanced-deployments/service-connection-advanced-deployments/use-traffic-forwarding-rules-with-service-connections/default-routes-with-traffic-steering-example) to the default gateway provided by the network.




 Default Route Metric


 Specify the **Default Route Metric** to define the metric for the route. When a routing protocol has more than one route to the same destination network, it prefers the route with the lowest metric value. The default is 10; the range is 1 to 65535.




 (`PAN-OS 11.2.3 and later releases`) Enable IPv6 on the interface


 **Cellular Interface** > **IPv6**


 Select to enable IPv6 addressing on the interface.




 (`PAN-OS 11.2.3 and later releases`) EUI-64


 Enter the Extended Unique Identifier (EUI-64) in hexadecimal format (for example, 00:32:07:FE:4A:12:4C:33). If you leave this field blank, the firewall uses the EUI-64 generated from the MAC address of the physical interface.




 (`PAN-OS 11.2.3 and later releases`) Automatically create default route pointing to network provided default gateway


 This option is enabled by default and creates a default route to the default gateway provided by the network.




 (`PAN-OS 11.2.3 and later releases`) Default Route Metric


 Specify the **Default Route Metric** to define the metric for the route. When a routing protocol has more than one route to the same destination network, it prefers the route with the lowest metric value. The default is 10; the range is 1 to 65535.




 (`PAN-OS 11.2.3 and later releases, SD-WAN plugin 3.3.1 and later releases`) SD-WAN Interface Profile


 **Cellular Interface** > **SD-WAN**


 Select an existing [SD-WAN interface profile](https://docs.paloaltonetworks.com/sd-wan/3-2/sd-wan-admin/configure-sd-wan/configure-sd-wan-interface-profile) or create a new SD-WAN interface profile. SD-WAN interface profile defines the characteristics of ISP connections and specifies the speed of links and how frequently the firewall monitors the link, and specify a Link Tag for the link.




 (`PAN-OS 11.2.3 and later releases, SD-WAN plugin 3.3.1 and later releases`) Upstream NAT


 **Enable**—Select this option if you are adding an SD-WAN hub or branch device that is behind a NAT device.
 **NAT IP Address Type—****Static IP**. Select **IP Address** or **FQDN** and enter a single IP address or FQDN of the public-facing interface on the upstream, NAT-performing device.
 Auto VPN configuration uses this address as the tunnel endpoint of the hub or branch.




 Link Settings


 **Cellular Interface** > **Advanced**


 Select the **Link State** for the interface.



| • | **auto**—The interface is available only if there is a peer connection. |
| --- | --- |





| • | **up**—The interface is available. |
| --- | --- |





| • | **down**—The interface is not available. |
| --- | --- |






 Slot


 **Cellular Interface** > **Advanced** > **SIM Settings** > **Slot**


 Select the **Slot**. Only one SIM slot can be active at a time. By default, SIM1 is the active SIM slot. If the firewall or Panorama can't establish a session within 5 minutes, it attempts to establish the session with the alternate SIM slot.




 Pin


 To require a PIN to prevent unauthorized use of the SIM slots, enter a **Pin** for the slot.




 Confirm Pin


 Enter the PIN again to **Confirm Pin**for the slot.




 APN Profile


 Specify the **APN profile** that you want the SIM card to use by default. The SIM slot uses this APN profile unless you override it with a custom APN profile. If you don't specify an APN profile, the firewall or Panorama uses the default auto APN profile. If you need to specify a custom APN profile, you can do so by selecting **Cellular Interface** > **Advanced** > **APN Profile**.




 APN Profile


 **Cellular Interface** > **Advanced** > **APN Profile**


 **Add** the default **APN Profile**.




 Authentication Type


 Select the **Authentication Type**.



| • | **None**—(Default) The firewall or Panorama does not require authentication for the connection to the APN. |
| --- | --- |





| • | **CHAP**—Use Challenge Handshake Authentication Protocol (CHAP) to connect to the APN. |
| --- | --- |





| • | **PAP**—Use Password Authentication Protocol (PAP) to connect to the APN. |
| --- | --- |





| • | **auto**—Allow the firewall or Panorama to automatically detect the authentication type based on the service provider. If the connection to the initial authentication type isn't successful, the firewall or Panorama attempts the connection with the alternate authentication type. |
| --- | --- |






 APN


 Enter the **APN**.




 (`PAN-OS 11.2.3 and later releases`) PDP Type


 Select the packet data protocol (PDP) type that the APN profile allows: **IPv4** (default); **IPv6**, or **both**.




 Username


 Enter the **Username** for the account.




 Password


 Enter the **Password** for the account.




 Confirm Password


 Enter the password again to **Confirm Password** for the account.




 Management Profile


 **Cellular Interface** > **Advanced** > **Other Info**


 Select the **Management Profile** you want to use for the interface (see [Network > Network Profiles > Interface Mgmt](network-network-profiles-interface-mgmt.html#ID0EDJCW).




 MTU


 Specify the maximum transfer unit (**MTU**) value. The default value is 1428 bytes; the range is 576—1500 bytes.




 Adjust TCP MSS


 To adjust the packet size if you encounter latency issues, you can **Adjust TCP MSS** to configure the [maximum segment size](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/session-settings-and-timeouts/tcp/maximum-segment-size-mss).




 IPv4 MSS Adjustment


 Specify the **IPv4 MSS Adjustment** value. The default is 40; the range is 40—300.



 Parent topic
 [Network](network.html#ID0EFOJS)