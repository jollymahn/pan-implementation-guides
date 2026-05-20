# Device > User Identification > Terminal Server Agents

*User Identification : Device &gt; User Identification &gt; Terminal Server Agents*

## Device > User Identification > Terminal Server Agents


On a system that supports multiple users who share the same IP address, a Terminal Server (TS) agent identifies individual users by allocating port ranges to each one. The TS agent informs every connected firewall of the allocated port range so that the firewalls can enforce policy based on users and user groups.


All firewall models can collect username-to-port mapping information from up to 5,000 multi-user systems. The number of TS agents from which a firewall can collect the mapping information varies by [firewall model](https://docs.paloaltonetworks.com/compatibility-matrix/terminal-services-ts-agent.html).

 Note:



| | You must install and configure the TS agents before configuring access to them. The [complete procedure](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/configure-user-mapping-for-terminal-server-users.html) to configure user mapping for terminal server users requires additional tasks besides configuring connections to TS agents. |
| --- | --- |




You can perform the following tasks to manage access to TS agents.



| Task | Description |
| --- | --- |
| Display information / Refresh Connected | In the **Terminal Server Agents** page, the Connected column displays the status of the connections from the firewall to the TS agents. A green icon indicates a successful connection, a yellow icon indicates a disabled connection, and a red icon indicates a failed connection. If you think the connection status might have changed since you first opened the page, click **Refresh Connected** to update the status display. |
| Add | To configure access to a TS agent, **Add** an agent and configure the following fields: • |






| • | **Host**—Enter the static IP address or hostname of the terminal server where the TS agent is installed. |
| --- | --- |






| • | **Port**—Enter the port number (default is 5009) that the TS agent service uses to communicate with the firewall. |
| --- | --- |






| • | **Alternative Hosts**—If the terminal server where the TS agent is installed has multiple IP addresses that can appear as the source IP address for the outgoing traffic, **Add** and enter up to eight additional static IP addresses or hostnames. |
| --- | --- |






| • | **Enabled**—Select this option to enable the firewall to communicate with this TS agent. |
| --- | --- |







 Delete


 To remove the configuration that enables access to a TS agent, select the agent and click **Delete**.
 Tip:
 To disable access to a TS agent without deleting its configuration, edit the agent and clear the **Enabled** option.




 PDF/CSV


 Administrative roles with a minimum of read-only access can export the device configuration table as **PDF/CSV**. You can apply filters to create more specific table configuration outputs for things such as audits. Only visible columns in the web interface will be exported. See [Configuration Table Export](configuration-table-export.html#ID0EMWAM).



 Parent topic
 [User Identification](user-identification.html#ID0EBI2Z)