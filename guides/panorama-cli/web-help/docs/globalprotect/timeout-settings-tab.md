# Connection Settings Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Gateways : GlobalProtect Gateways Agent Tab : Connection Settings Tab*

Connection Settings Tab



| • | **Network** > **GlobalProtect** > **Gateways** > <gateway-config> > **Agent** > <agent-config> > **Connection Settings** |
| --- | --- |




Select the **Connection Settings** tab to define the timeout settings and authentication cookie usage restrictions for the GlobalProtect™ app.



| GlobalProtect Gateway Client Tunnel Mode Connection Settings | Description |
| --- | --- |
| Timeout Configuration | |
| Login Lifetime | Specify the number of days, hours, or minutes allowed for a single gateway login session. |
| Notify Before Login Lifetime Expires | Set the time in minutes (default is 30 minutes) to schedule the display of login lifetime expiry notifications on the GlobalProtect app. The **Notify Before Lifetime Expires** must be lesser than the **Login Lifetime**. |
| Login Lifetime Expiration Message | Allows you to modify the default login lifetime expiration message and create a custom message that you want to display to users when their login lifetime sessions are about to expire. The maximum message length is 127 characters. |
| Inactivity Logout | Specify the amount of time (in minutes) after which an inactive session is automatically logged out (range for tunnel mode is 5 to 43200 and for non-tunnel mode 120 to 43200 minutes; default is 180 minutes). Users are logged out of GlobalProtect if the GlobalProtect app has not routed traffic through the VPN tunnel or if the gateway does not receive a HIP check from the endpoint within the configured time period. |
| Notify Before Inactivity Logout (Minutes) | Set the notify before inactivity logout time in minutes (default is 30 minutes) to schedule the display of inactivity logout notification on the app. The **Notify Before Inactivity Logout **must be lesser than the **Inactivity Logout period**. |
| Inactivity Logout Message | Allows you to modify the default message and create a custom message that you want to display to users when their inactive sessions are about to expire. The maximum message length is 127 characters. |
| Notify Users on Administrator Initiated Logout | Enable this option if you want the app to display notification to users after the administrator initiated logout happens. |
| Administrator Logout Message | Allows you to modify the default message and create a custom message that you want to display to users after the administrator initiated logout happens. The maximum message length is 127 characters. |
| Authentication Cookie Usage Restrictions | |
| Disable Automatic Restoration of SSL VPN | Enable this option to prevent automatic restoration of SSL VPN tunnels. CAUTION:  If you enable this option, GlobalProtect will not support Resilient VPN. |
| Restrict Authentication Cookie Usage (for Automatic Restoration of VPN tunnel or Authentication Override) to | Enable this option to restrict authentication cookie usage based on one of the following conditions: • |






| • | **The original Source IP network range**—Restricts authentication cookie usage to endpoints with public source IP addresses within the designated network IP address range. Enter a **Source IPv4 Netmask** to specify a range of IPv4 addresses or enter a **Source IPv6 Netmask** to specify a range of IPv6 addresses. |
| --- | --- |



 If you set either netmask to 0, this option is disabled for the specified IP address type. For example, you can set a netmask to 0 if your portal or gateway supports only one IP address type (IPv4 or IPv6) or if you want to enable this option for only one IP address type (when your portal or gateway supports both IPv4 and IPv6). You can set only one netmask to 0 in a given gateway configuration; you cannot simultaneously set both netmasks to 0.
 If you accept the default **Source IPv4 Netmask** value of 32, authentication cookie usage is restricted to the same public IPv4 address of the endpoint to which the cookie was originally issued. If you accept the default **Source IPv6 Netmask** value of 128, authentication cookie usage is restricted to the same public IPv6 address of the endpoint to which the cookie was originally issued.



 Parent topic
 [GlobalProtect Gateways Agent Tab](globalprotect-gateways-agent-tab.html#ID0EDKW1)