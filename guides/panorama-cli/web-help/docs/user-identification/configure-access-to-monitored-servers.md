# Configure Access to Monitored Servers

*User Identification : Device &gt; User Identification &gt; User Mapping : Monitor Servers : Configure Access to Monitored Servers*

Configure Access to Monitored Servers

Use the Server Monitoring section to **Add** server profiles that specify the servers the firewall will monitor.

 Fastpath:
 Configure at least two User-ID monitored servers so if a server goes down, the firewall can still learn IP address-to-username mappings.
 Note:



| | The [complete procedure](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/configure-user-mapping-using-the-pan-os-integrated-user-id-agent.html) to configure the PAN-OS integrated User-ID agent to monitor servers requires additional tasks besides creating server profiles. |
| --- | --- |





| Server Monitoring Settings | Description |
| --- | --- |
| Name | Enter a name for the server. |
| Description | Enter a description of the server. |
| Enabled | Select this option to enable log monitoring for this server. |
| Type | Select the server type. Your selection determines which other fields this dialog displays. • |






| • | **Microsoft Exchange** |
| --- | --- |






| • | **Novell eDirectory** |
| --- | --- |






| • | **Syslog Sender** |
| --- | --- |







 Transport Protocol (`Microsoft Active Directory and Microsoft Exchange only`)


 Select the transport protocol:



| • | **WMI**—(default) Use Windows Management Instrumentation (WMI) to probe each learned IP address and verify that the same user is still logged in. |
| --- | --- |






| • | **WinRM-HTTP**—Use Windows Remote Management (WinRM) over HTTP to monitor the security logs and session information on the server. The firewall encrypts the payload with the Kerberos Session Key. |
| --- | --- |






| • | **WinRM-HTTPS**—Use Windows Remote Management (WinRM) over HTTPS to monitor the security logs and session information on the server. To require server certificate validation with the Windows server when using Kerberos authentication, make sure you configure NTP in the [Global Services Settings](global-services-settings.html#ID0ESPFX) and select the Root CA as the certificate profile ([Device > User Identification > Connection Security](device-user-identification-connection-security.html#ID0EYLB1)). |
| --- | --- |







 Network Address


 Enter the server IP address or FQDN for the monitored server. If you use Kerberos for server authentication, you must enter an FQDN. This option is not supported when the **Type** is **Novell eDirectory**.




 Server Profile
 (`Novell eDirectory only`)


 Select an LDAP server profile for connecting to the Novell eDirectory server ([Device > Server Profiles > LDAP](device-server-profiles-ldap.html#ID0EMVPZ)).




 Connection Type
 (`Syslog Sender only`)


 Select whether the User-ID agent listens for syslog messages on the **UDP** port (514) or the **SSL** port (6514). If you select **SSL**, the **Syslog Service Profile** you select when you enable [Server Monitoring](user-id-agent-setup-server-monitoring.html#ID0EW13Z) determines which SSL/TLS versions are allowed and the certificate that the firewall uses to secure a connection to the syslog sender.
 Fastpath:
 As a security best practice, select **SSL** when using the PAN-OS integrated User-ID agent to map IP addresses to usernames. If you select **UDP**, ensure that the syslog sender and client are both on a dedicated, secure network to prevent untrusted hosts from sending UDP traffic to the firewall.




 Filter
 (`Syslog Sender only`)


 If the server **Type** is **Syslog Sender**, then **Add** one or more Syslog Parse profiles to use for extracting usernames and IP addresses from the syslog messages received from this server. You can add a custom profile (see [Syslog Filters](user-id-agent-setup-syslog-filters.html#ID0E5B5Z)) or a predefined profile. For each profile, set the **Event Type**:



| • | **login**—The User-ID agent parses syslog messages for login events to create user mappings. |
| --- | --- |






| • | **logout**—The User-ID agent parses syslog messages for logout events to delete user mappings that are no longer current. In networks where IP address assignment is dynamic, automatic deletion improves the accuracy of user mappings by ensuring that the agent maps each IP address only to the currently associated user. |
| --- | --- |



 CAUTION:
 If you add a predefined Syslog Parse profile, check its name to determine whether it is intended to match login or logout events.




 Default Domain Name
 (`Syslog Sender only`)


 (`Optional`) If the server **Type** is **Syslog Sender**, enter a domain name to override the current domain name in the username of your syslog message or prepend the domain to the username if your syslog message doesn’t contain a domain.



 Parent topic
 [Monitor Servers](monitor-servers.html#ID0EOG6Z)