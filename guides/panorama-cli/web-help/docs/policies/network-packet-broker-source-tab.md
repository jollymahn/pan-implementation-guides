# Network Packet Broker Source Tab

*Policies : Policies &gt; Network Packet Broker : Network Packet Broker Source Tab*

Network Packet Broker Source Tab

Select the **Source** tab to define the source zones, IP addresses, users, and devices of traffic to forward to a Network Packet Broker security chain.



| Field | Description |
| --- | --- |
| Source Zone | To choose source zones (default is any), click **Add** and select from the drop-down. To define new zones, refer to [Network > Zones](network-zones.html#ID0EC6TT). You can add multiple zones to simplify management. |
| Source Address | **Add** source addresses, address groups, or regions (default is **Any**). Select from the drop-down or select **Address** object, **Address Group**, or **Regions** (bottom of the drop-down) to specify the settings. [Objects > Addresses](objects-addresses.html#ID0E16TQ) and [Objects > Address Groups](objects-address-groups.html#ID0E12UQ) describe the types of address objects and address groups, respectively, that a policy rule supports. Selecting the **Negate** option applies the rule to source addresses from the specified zone except for the addresses specified. |
| Source User | Click **Add** to choose the source users or groups of users subject to the policy. The following source user types are supported: • |






| • | **pre-logon**—Include remote users that are connected to the network using GlobalProtect™, but are not logged into their system. When the Pre-logon option is configured on the Portal for GlobalProtect apps, any user who is not currently logged into their machine is identified with the username pre-logon. You can then create policies for pre-logon users and although the user is not logged in directly, their machines are authenticated on the domain as if they were fully logged in. |
| --- | --- |






| • | **known-user**—Includes all authenticated users, which means any IP with user data mapped. This option is equivalent to the “domain users” group on a domain. |
| --- | --- |






| • | **unknown**—Includes all unauthenticated users, which means IP addresses that are not mapped to a user. For example, you could use unknown for guest level access to something because they will have an IP on your network, but are not authenticated to the domain and do not have IP address-to-user mapping information on the firewall. |
| --- | --- |






| • | **Select**—Includes selected users as determined by the selection in this window. For example, you may want to add one user, a list of individuals, some groups, or manually add users. |
| --- | --- |



 Note:



| | If the firewall collects user information from a RADIUS, TACACS+, or SAML identity provider server and not from the User-ID™ agent, the list of users does not display; you must enter user information manually. |
| --- | --- |







 Source Device


 **Add** the host devices subject to the policy:



| • | **any**—Includes any device. |
| --- | --- |






| • | **no-hip**—HIP information is not required. This setting enables access from third-party devices that cannot collect or submit HIP information. |
| --- | --- |






| • | **select**—Includes selected devices as determined by your configuration. For example, you can add a device object based on model, OS, OS family, or vendor. |
| --- | --- |






 Parent topic
 [Policies > Network Packet Broker](policies-network-packet-broker.html#ID0EACCQ)