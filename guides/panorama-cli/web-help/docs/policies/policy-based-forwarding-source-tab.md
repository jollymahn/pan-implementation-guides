# Policy Based Forwarding Source Tab

*Policies : Policies &gt; Policy Based Forwarding : Policy Based Forwarding Source Tab*

Policy Based Forwarding Source Tab

Select the **Source** tab to define the source zone or source address that defines the incoming source traffic to which the forwarding policy will be applied.



| Field | Description |
| --- | --- |
| Source Zone | To choose source zones (default is any), click **Add** and select from the drop-down. To define new zones, refer to [Network > Zones](network-zones.html#ID0EC6TT). Multiple zones can be used to simplify management. For example, if you have three different internal zones (Marketing, Sales, and Public Relations) that are all directed to the untrusted destination zone, you can create one rule that covers all cases. Note:  |







 Source Address


 Click **Add** to add source addresses, address groups, or regions (default is any). Select from the drop-down, or click **Address**, **Address Group**, or **Regions** at the bottom of the drop-down, and specify the settings.




 Source User


 Click **Add** to choose the source users or groups of users subject to the policy. The following source user types are supported:



| • | **any**—Include any traffic regardless of user data. |
| --- | --- |






| • | **pre-logon**—Include remote users that are connected to the network using GlobalProtect™, but are not logged into their system. When the Pre-logon option is configured on the Portal for GlobalProtect apps, any user who is not currently logged into their machine will be identified with the username pre-logon. You can then create policies for pre-logon users and although the user is not logged in directly, their machines are authenticated on the domain as if they were fully logged in. |
| --- | --- |






| • | **known-user**—Includes all authenticated users, which means any IP with user data mapped. This option is equivalent to the “domain users” group on a domain. |
| --- | --- |






| • | **unknown**—Includes all unauthenticated users, which means IP addresses that are not mapped to a user. For example, you could use unknown for guest level access to something because they will have an IP on your network, but will not be authenticated to the domain and will not have IP address-to-user mapping information on the firewall. |
| --- | --- |






| • | **Select**—Includes selected users as determined by the selection in this window. For example, you may want to add one user, a list of individuals, some groups, or manually add users. |
| --- | --- |



 Note:



| | If the firewall collects user information from a RADIUS, TACACS+, or SAML identity provider server and not from the User-ID™ agent, the list of users does not display; you must enter user information manually. |
| --- | --- |






 Parent topic
 [Policies > Policy Based Forwarding](policies-policy-based-forwarding.html#ID0ECQ3O)