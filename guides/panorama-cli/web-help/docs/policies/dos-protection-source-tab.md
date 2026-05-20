# DoS Protection Source Tab

*Policies : Policies &gt; DoS Protection : DoS Protection Source Tab*

DoS Protection Source Tab

Select the **Source** tab to define the source interface(s) or source zone(s), and optionally the source address(es) and source user(s) that define the incoming traffic to which the DoS policy rule applies.



| Field | Description |
| --- | --- |
| Type | Select the type of source to which the DoS Protection policy rule applies: • |






| • | **Zone**—Apply the rule to traffic coming from any interface in a specified zone. |
| --- | --- |



 Click **Add** to select multiple interfaces or zones.




 Source Address


 Select **Any** or **Add** and specify one or more source addresses to which the DoS Protection policy rule applies.
 (`Optional`) Select **Negate** to specify that the rule applies to any addresses except those specified.




 Source User


 Specify one or more source users to which the DoS Protection policy rule applies:



| • | **any**—Includes packets regardless of the source user. |
| --- | --- |






| • | **pre-logon**—Includes packets from remote users that are connected to the network using GlobalProtect, but are not logged into their system. When **pre-logon** is configured on the Portal for GlobalProtect apps, any user who is not currently logged into their machine will be identified with the username pre-logon. You can then create policies for pre-logon users and although the user is not directly logged in, their machines are authenticated on the domain as if they were fully logged in. |
| --- | --- |






| • | **known-user**—Includes all authenticated users, which means any IP address with user data mapped. This option is equivalent to the “domain users” group on a domain. |
| --- | --- |






| • | **unknown**—Includes all unauthenticated users, which means IP addresses that are not mapped to a user. For example, you could use **unknown** for guest level access to something because they will have an IP address on your network, but will not be authenticated to the domain and will not have IP address-to-username mapping information on the firewall. |
| --- | --- |






| • | **Select**—Includes users specified in this window. For example, you can select one user, a list of individuals, some groups, or manually add users. |
| --- | --- |



 Note:



| | If the firewall collects user information from a RADIUS, TACACS+, or SAML identity provider server and not from the User-ID™ agent, the list of users does not display; you must enter user information manually. |
| --- | --- |






 Parent topic
 [Policies > DoS Protection](policies-dos-protection.html#ID0EYHMQ)