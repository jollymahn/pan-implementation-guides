# SD-WAN Source Tab

*Policies : Policies &gt; SD-WAN : SD-WAN Source Tab*

SD-WAN Source Tab



| • | **Policies** > **SD-WAN** > **Source** |
| --- | --- |




Select the **Source** tab to define the source zones, source addresses, and source users that define the incoming packets to which the SD-WAN policy applies.



| Field | Description |
| --- | --- |
| Source Zone | To specify a source zone, select **Add** and select one or more zones, or select **Any** zone. Specifying multiple zones can simplify management. For example, if you have three branches in different zones and you want the remaining match criteria and path selection to be the same for the three branches, you can create one SD-WAN rule and specify the three source zones to cover the three branches. Note:  |







 Source Address


 To specify source addresses, **Add** source addresses or external dynamic lists (EDL), select from the drop-down, or select **Address** and create a new address object. Alternatively, select **Any** source address (default).




 Source User


 To specify certain users, select **Add** (the type then indicates **select**) and enter a user, list of users, or groups of users. Alternatively, select a type of user:



| • | **any**—(default) Include any user, regardless of user data. |
| --- | --- |






| • | **pre-logon**—Include remote users who are connected to the network using GlobalProtect™, but are not logged into their system. When the Pre-logon option is configured on the Portal for GlobalProtect apps, any user who is not currently logged into their machine will be identified with the username pre-logon. You can then create policies for pre-logon users and although the user is not logged in directly, their machines are authenticated on the domain as if they were fully logged in. |
| --- | --- |






| • | **known-user**—Includes all authenticated users, which means any IP address with user data mapped. This option is equivalent to the “domain users” group on a domain. |
| --- | --- |






| • | **unknown**—Includes all unauthenticated users, which means IP addresses that are not mapped to a user. For example, you could select **unknown** for guest-level access to something because they will have an IP address on your network, but will not be authenticated to the domain and will not have IP address-to-user mapping information on the firewall. |
| --- | --- |



 Note:



| | If the firewall collects user information from a RADIUS, TACACS+, or SAML identity provider server and not from the User-ID™ agent, the list of users does not display; you must enter user information manually. |
| --- | --- |






 Parent topic
 [Policies > SD-WAN](policies-sd-wan.html#ID0EQBPQ)