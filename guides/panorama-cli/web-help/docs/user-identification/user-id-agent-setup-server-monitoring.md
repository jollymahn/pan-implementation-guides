# Server Monitoring

*User Identification : Device &gt; User Identification &gt; User Mapping : Palo Alto Networks User-ID Agent Setup : Server Monitoring*

Server Monitoring



| • | **Device** > **User Identification** > **User Mapping** > **Palo Alto Networks User-ID Agent Setup** > **Server Monitor** |
| --- | --- |




To enable the User-ID agent to map IP addresses to usernames by searching for logon events in the security event logs of servers, configure the settings described in the following table.

 CAUTION:
 If the query load is high for Windows server logs, Windows server sessions, or eDirectory servers, the observed delay between queries might significantly exceed the specified frequency or interval.
 The [complete procedure](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/configure-user-mapping-using-the-pan-os-integrated-user-id-agent.html) to configure the PAN-OS integrated User-ID agent to monitor servers requires additional tasks besides configuring the server monitoring settings.


| Server Monitoring Settings | Description |
| --- | --- |
| Enable Security Log | Select this option to enable security log monitoring on Windows servers. |
| Server Log Monitor Frequency (sec) | Specify the frequency in seconds at which the firewall will query Windows server security logs for user mapping information (range is 1-3600; default is 2). This is the interval between when the firewall finishes processing the last query and when the firewall sends the next query. Fastpath:  If the log monitoring doesn’t happen often enough, the latest IP-address-to-user mapping may not be available. If the firewall monitors logs too frequently, that may impact the domain controller, memory, CPU, and User-ID policy enforcement. Start with a value in a range of 2-30 seconds, then revise the value based on performance impact or how often user mappings are updated. |
| Enable Session | Select this option to enable monitoring of user sessions on the monitored servers. Each time a user connects to a server, a session is created; the firewall can use this information to identify the user IP address. Fastpath:  Do not **Enable Session**. This setting requires that the User-ID agent have an Active Directory account with Server Operator privileges so that it can read all user sessions. Instead, you should use a Syslog or XML API integration to monitor sources that capture login and logout events for all device types and operating systems (instead of only Windows operating systems), such as wireless controllers and NACs. |
| Server Session Read Frequency (sec) | Specify the frequency in seconds at which the firewall will query Windows server user sessions for user mapping information (range is 1-3600; default is 10). This is the interval between when the firewall finishes processing the last query and when it starts the next query. |
| Novell eDirectory Query Interval (sec) | Specify the frequency in seconds at which the firewall will query Novell eDirectory servers for user mapping information (range is 1-3600; default is 30). This is the interval between when the firewall finishes processing the last query and when it starts the next query. |
| Syslog Service Profile | Select an SSL/TLS service profile that specifies the certificate and allowed SSL/TLS versions for communications between the firewall and any syslog senders that the User-ID agent monitors. For details, see [Device > Certificate Management > SSL/TLS Service Profile](device-certificate-management-ssltls-service-profile.html#ID0E3TCZ) and [Syslog Filters](user-id-agent-setup-syslog-filters.html#ID0E5B5Z). If you select **none**, the firewall uses its predefined, self-signed certificate. |


 Parent topic
 [Palo Alto Networks User-ID Agent Setup](user-id-agent-setup.html#ID0EN62Z)