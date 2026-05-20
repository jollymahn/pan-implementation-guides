# Manage Access to Monitored Servers

*User Identification : Device &gt; User Identification &gt; User Mapping : Monitor Servers : Manage Access to Monitored Servers*

Manage Access to Monitored Servers

Perform the following tasks in the Server Monitoring section to manage access to the servers that the User-ID agent monitors for user mapping information.



| Task | Description |
| --- | --- |
| Display server information | For each monitored server, the User Mapping page displays the Status of the connection from the User-ID agent to the server. After you **Add** a server, the firewall tries to connect to it. If the connection attempt is successful, the Server Monitoring section displays Connected in the Status column. If the firewall cannot connect, the Status column displays an error condition, such as Connection refused or Connection timeout. For details on the other fields that the Server Monitoring section displays, see [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z). |
| Add | To [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z), **Add** each server that the User-ID agent will monitor for user mapping information. |
| Delete | To remove a server from the user mapping process (discovery), select the server and **Delete** it. **Tip**: To remove a server from discovery without deleting its configuration, edit the server entry and clear **Enabled**. |
| Discover | You can automatically **Discover** Microsoft Active Directory domain controllers using DNS. The firewall will discover domain controllers based on the domain name entered in the **Device** > **Setup** > **Management** page, **General Settings** section, **Domain** field. After discovering a domain controller, the firewall creates an entry for it in the Server Monitoring list; you can then enable the server for monitoring. Note:  |






 Parent topic
 [Monitor Servers](monitor-servers.html#ID0EOG6Z)