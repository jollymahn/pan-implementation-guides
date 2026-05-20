# GlobalProtect Portal Satellite Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portal Satellite Tab*

GlobalProtect Portal Satellite Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Satellite** |
| --- | --- |




A satellite is a Palo Alto Networks® firewall—typically at a branch office—that acts as a GlobalProtect app to enable the satellite to establish VPN connectivity to a GlobalProtect gateway. Like a GlobalProtect app, a satellite receives its initial configuration from the portal, which includes the certificates and VPN configuration routing information and enable the satellite to connect to all configured gateways to establish VPN connectivity.


Before configuring the GlobalProtect satellite settings on the branch office firewall, you must configure an interface with WAN connectivity and set up a security zone and policy to allow the branch office LAN to communicate with the Internet. You can then select the **Satellite** tab to configure the GlobalProtect satellite settings on the portal as described in the following table.



| GlobalProtect Portal Satellite Configuration Settings | Description |
| --- | --- |
| General | • |






| • | **Configuration Refresh Interval (hours)**—How often a satellite should check the portal for configuration updates (range is 1-48; default is 24). |
| --- | --- |







 Devices


 **Add** a satellite using the firewall **Serial Number**. The portal can accept a serial number or login credentials to identify who is requesting a connection.
 To [authenticate the satellite to the portal for the first time](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/large-scale-vpn-lsvpn/configure-the-portal-to-authenticate-satellites), the satellite administrator must provide a username and password. After the satellite authenticates successfully, the **Satellite Hostname** is automatically added to the portal.




 Enrollment User/User Group


 The portal can use **Enrollment User/User Group** settings with or without serial numbers to match a satellite to this configuration.
 **Add** the user or group you want to control with this configuration.
 Note:



| | Before you can restrict the configuration to specific groups, you must enable Group Mapping in the firewall (**Device** > **User Identification** > **Group Mapping Settings**). |
| --- | --- |







 Gateways


 Click **Add** to enter the IP address or hostname of the gateway(s) satellites by which this configuration can establish IPSec tunnels. Enter the FQDN or IP address of the interface where the gateway is configured in the **Gateways** field. IP addresses can be specified as **IPv6**, **IPv4**, or both. Select **IPv6 Preferred** to specify preference of IPv6 connections in a dual stack environment.
 (`Optional`) If you are adding two or more gateways to the configuration, the **Routing Priority** helps the satellite pick the preferred gateway (range is 1 to 25). Lower numbers have higher priority (for gateways that are available). The satellite multiplies the routing priority by 10 to determine the routing metric.
 Note:



| | Routes published by the gateway are installed on the satellite as static routes. The metric for the static route is 10 times the routing priority. If you have more than one gateway, be sure to set the routing priority so that routes advertised by backup gateways have higher metrics than the same routes advertised by primary gateways. For example, if you set the routing priority for the primary gateway and backup gateway to 1 and 10 respectively, the satellite will use 10 as the metric for the primary gateway and 100 as the metric for the backup gateway. |
| --- | --- |



 The satellite also shares its network and routing information with the gateways if you **Publish all static and connected routes to Gateway** (**Network** > **IPSec tunnels** > **<tunnel** > **Advanced**—available only when you select **GlobalProtect Satellite on the <tunnel** > **General**).




 Trusted Root CA


 Click **Add** and then select the CA certificate for issuing gateway server certificates. Satellite Trusted Root CA certificates are pushed to endpoints at the same time as the portal agent configuration.
 Fastpath:
 Specify a Trusted Root CA to verify gateway server certificates and establish secure VPN tunnel connections to GlobalProtect gateways. All your gateways should use the same issuer.
 Note:



| | You can **Import** or **Generate** a root CA certificate for issuing your gateway server certificates if one does not already exist on the portal. |
| --- | --- |







 **Client Certificate**




 Local





| • | **Issuing Certificate**—Select the root CA issuing certificate the portal uses to issue certificates to a satellite after it successfully authenticates. If the needed certificate does not already exist on the firewall, you can **Import** or **Generate** it. |
| --- | --- |



 Note:



| | If a certificate does not already reside on the firewall, you can **Import** or **Generate** an issuing certificate. |
| --- | --- |






| • | **OCSP Responder**—Select the OCSP Responder the satellite uses to verify the revocation status of certificates presented by the portal and gateways. Select **None** to specify that OCSP is not used for verifying revocation of a certificate. |
| --- | --- |



 Fastpath:
 Enable a satellite OCSP responder so that if a certificate was revoked, you are notified and can take appropriate action to establish a secure connection to the portal and gateways. To enable a satellite OCSP responder, you must also enable **CRL** and **OCSP** in the Certificate Revocation Checking settings (**Device** > **Setup** > **Session** > **Decryption Settings**).



| • | **Validity Period** (days)—Specify the GlobalProtect satellite certificate lifetime (range is 7 to 365; default is 7). |
| --- | --- |






| • | **Certificate Renewal Period** (days)—Specify the number of days before expiration that certificates can be automatically renewed (range is 3 to 30; default is 3). |
| --- | --- |







 SCEP





| • | **SCEP**—Select a SCEP profile for generating client certificates. If the profile is not in the drop-down, you can create a **New** profile. |
| --- | --- |






| • | **Certificate Renewal Period** (days)—Specify the number of days before expiration that certificates can be automatically renewed (range is 3 to 30; default is 3). |
| --- | --- |






 Parent topic
 [Network > GlobalProtect > Portals](network-globalprotect-portals.html#ID0EJ3F1)