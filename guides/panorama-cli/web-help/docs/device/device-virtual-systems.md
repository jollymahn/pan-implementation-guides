# Device > Virtual Systems

*Device : Device &gt; Virtual Systems*

## Device > Virtual Systems


A virtual system (vsys) is an independent (virtual) firewall instance that you can separately manage within a physical firewall. Each vsys can be an independent firewall with its own Security policy, interfaces, and administrators; a vsys enables you to segment the administration of all policies, reporting, and visibility functions that the firewall provides.


For example, if you want to customize the security features for the traffic that is associated with your Finance department, you can define a Finance vsys and then define security policies that pertain only to that department. To optimize policy administration, you can maintain separate administrator accounts for overall firewall and network functions while creating vsys administrator accounts that allow access to an individual vsys. This allows the vsys administrator in the Finance department to manage the Security policy for only that department.


Networking functions (such as static and dynamic routing, IP addresses of interfaces, and IPSec tunnels) pertain to an entire firewall and all of its virtual systems. A virtual system configuration (**Device** > **Virtual Systems**) doesn’t control firewall-level and network-level functions (such as static and dynamic routing, IP addresses of interfaces, IPSec tunnels, VLANs, virtual wires, virtual routers, GRE tunnels, DHCP, DNS Proxy, QoS, LLDP and network profiles). For each vsys, you can specify a collection of physical and logical firewall interfaces (including VLANs and virtual wires) and security zones. If you require routing segmentation for each vsys, you must create and assign additional virtual routers and assign interfaces, VLANs, and virtual wires as needed.


If you use a Panorama template to define your virtual systems, you can configure one vsys to be the default. The default vsys and Multi Virtual System Capability determine whether a firewall accepts vsys-specific configurations during a template commit:




| • | Firewalls that have Multi Virtual System Capability enabled accept vsys-specific configurations for any vsys that is defined in the template. |
| --- | --- |






| • | Firewalls that don’t have Multi Virtual System Capability enabled accept vsys-specific configurations only for the default vsys. If you do not configure a default vsys, then these firewalls will not accept vsys-specific configurations. |
| --- | --- |



 Note:



| | PA-400 Series, PA-3200 Series, PA-5200 Series, PA-5400 Series, and PA-7000 Series firewalls support multiple virtual systems. However, PA-400 Series and PA-3200 Series firewalls require a license for enabling multiple virtual systems. The PA-220 and PA-800 Series firewalls do not support multiple virtual systems. |
| --- | --- |




Before enabling multiple virtual systems, consider the following:




| • | A vsys administrator creates and manages all items needed for Security policy per assigned virtual system. |
| --- | --- |






| • | Zones are objects within a vsys. Before defining a policy or policy object, select the appropriate **Virtual System** from the drop-down on the **Policies** or **Objects** tab. |
| --- | --- |






| • | You can set remote logging destinations (SNMP, syslog, and email), applications, services, and profiles to be available to all virtual systems (shared) or to a single vsys. |
| --- | --- |






| • | If you have multiple virtual systems, you can select a vsys as a User-ID hub to share the IP address-to-username mapping information between virtual systems. |
| --- | --- |






| • | You can configure globally (to all virtual systems on a firewall) or vsys-specific service routes ([Device > Setup > Services](device-setup-services.html#ID0EJYEX)). |
| --- | --- |






| • | You can rename a vsys only on the local firewall. On Panorama, renaming a vsys is not supported. If you rename a vsys on Panorama, the result is an entirely new vsys or the new vsys name gets mapped to the wrong vsys on the firewall. |
| --- | --- |




Before defining a vsys, you must first enable the multi-vsys functionality on the firewall. Select **Device** > **Setup** > **Management**, edit the **General Settings**, select **Multi Virtual System Capability**, and click **OK**. This adds a **Device** > **Virtual Systems** page. Select the page, **Add** a vsys, and specify the following information.



| Virtual System Settings | Description |
| --- | --- |
| ID | Enter an integer identifier for the vsys. Refer to the [data sheet ](https://www.paloaltonetworks.com/products/product-selection.html)for your firewall model for information on the number of supported virtual systems. Note:  |







 Name


 Enter a name (up to 31 characters) to identify the vsys. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores.
 CAUTION:
 If you use a Panorama template to push vsys configurations, the vsys name in the template must match the vsys name on the firewall.




 Allow Forwarding of Decrypted Content


 Select this option to allow the virtual system to forward decrypted content to an outside service when port mirroring or sending WildFire files for analysis. See also [Decryption Port Mirroring](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/configure-decryption-port-mirroring.html).




 General Tab


 Select a **DNS Proxy** object if you want to apply DNS proxy rules to this vsys. ([Network > DNS Proxy](network-dns-proxy.html#ID0E5LUV)).
 To include objects of a particular type, select that type (interface, VLAN, virtual wire, virtual router, or visible virtual system), **Add** an object, and select the object from the drop-down. You can add one or more objects of any type. To remove an object, select and **Delete** it.




 Resource Tab


 Specify the following resource limits allowed for this vsys. Each field displays the valid range of values, which varies per firewall model. The default setting is 0, which means the limit for the vsys is the limit for the firewall model. However, the limit for a specific setting isn’t replicated for each vsys. For example, if a firewall has four virtual systems, each virtual system can’t have the total number of Decryption Rules allowed per firewall. After the total number of Decryption Rules for all of the virtual systems reaches the firewall limit, you cannot add more.



| • | **Sessions Limit**—Maximum number of sessions. |
| --- | --- |



 Note:



| | If you use the show session meter CLI command, the firewall displays the Maximum number of sessions allowed per dataplane, the Current number of sessions being used by the virtual system, and the Throttled number of sessions per virtual system. On PA-5200 Series and PA-7000 Series firewalls, the Current number of sessions being used can be greater than the Maximum configured for Sessions Limit because there are multiple dataplanes per virtual system. The Sessions Limit you configure on a PA-5200 Series or PA-7000 Series firewall is per dataplane and results in a higher maximum per virtual system. |
| --- | --- |






| • | **Security Rules**—Maximum number of Security rules. |
| --- | --- |






| • | **NAT Rules**—Maximum number of NAT rules. |
| --- | --- |






| • | **Decryption Rules**—Maximum number decryption rules. |
| --- | --- |






| • | **QoS Rules**—Maximum number of QoS rules. |
| --- | --- |






| • | **Application Override Rules**—Maximum number of application override rules. |
| --- | --- |






| • | **Policy Based Forwarding Rules**—Maximum number of policy-based forwarding (PBF) rules. |
| --- | --- |






| • | **Authentication Rules**—Maximum number of authentication rules. |
| --- | --- |






| • | **DoS Protection Rules**—Maximum number of denial-of-service (DoS) rules. |
| --- | --- |






| • | **Site to Site VPN Tunnels**—Maximum number of site-to-site VPN tunnels. |
| --- | --- |






| • | **Concurrent GlobalProtect Tunnels**—Maximum number of concurrent remote GlobalProtect users. |
| --- | --- |






| • | **Inter-Vsys User-ID Data Sharing**— Configuring a User-ID data hub requires superuser or administrator privileges. |
| --- | --- |






| ◦ | **Make this vsys a User-ID data hub**—Allow all other virtual systems on the firewall to access shared mappings. After you enable this option, select the **Mapping Type** you want to share: IP address-to-username mappings (**IP User Mapping**), group mappings (**User Group Mapping**), or both. |
| --- | --- |






| ◦ | **Change hub**—If you want to change which vsys is the User-ID data hub, select a new vsys to reassign that vsys as the User-ID data hub. To stop using the vsys as a User-ID data hub, select **None**. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)