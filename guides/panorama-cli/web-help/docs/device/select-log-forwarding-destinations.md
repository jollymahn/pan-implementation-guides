# Select Log Forwarding Destinations

*Device : Device &gt; Log Settings : Select Log Forwarding Destinations*

Select Log Forwarding Destinations

**Device** > **Log Settings**


The Log Settings page allows you to configure log forwarding to:




| • | **Panorama, SNMP trap receivers, email servers, Syslog servers, and HTTP servers**—You can also add or remove tags from a source or destination IP address in a log entry; all log types except System logs and Configuration logs support tagging. |
| --- | --- |






| • | **Logging Service**—If you have a Logging Service subscription and have enabled the Logging Service ([Device > Setup > Management](device-setup-management.html#ID0E1DTW)), then the firewall will send the logs to the Logging Service when you configure log forwarding to Panorama/Logging Service. Panorama will query the Logging Service to access the logs, to display the logs, and to generate reports. |
| --- | --- |






| • | **Azure Security Center**—The integration with Azure Security Center is available only for VM-Series firewalls on Azure. |
| --- | --- |






| ◦ | If you launched the VM-Series firewall from Azure Security Center, a security policy rule with the log forwarding profiles is automatically enabled for you. |
| --- | --- |






| ◦ | If you launched the VM-Series firewall from the Azure Marketplace or using custom Azure templates, you must manually select **Azure-Security-Center-Integration** to forward System logs, User-ID logs, and HIP Match logs to Azure Security Center and use the Log Forwarding profile for other log types (see [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R)). |
| --- | --- |



 Note:
 The free tier of Security Center is automatically enabled on your Azure subscription.

You can forward the following [log types](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-logs/log-types-and-severity-levels.html): System, Configuration, User-ID, HIP Match, and Correlation logs. To specify destinations for each log type, **Add** one or more match list profiles (up to 64) and complete the fields described in the following table.

 Note:
 To forward Traffic, Threat, WildFire Submissions, URL Filtering, Data Filtering, Tunnel Inspection, GTP, and Authentication logs, you must configure a Log Forwarding profile (see [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R)).


| Match List Profile Settings | Description |
| --- | --- |
| Name | Enter a name (up to 31 characters) to identify the match list profile. A valid name must start with an alphanumeric character and can contain zeros, alphanumeric characters, underscores, hyphens, periods, or spaces. |
| Filter | By default, the firewall forwards **All Logs** of the type for which you add the match list profile. To forward a subset of the logs, open the drop-down and select an existing filter or select **Filter Builder** to add a new filter. For each query in a new filter, specify the following fields and **Add** the query: • |






| • | **Attribute**—Select a log attribute. The available attributes vary by log type. |
| --- | --- |






| • | **Operator**—Select the criterion to determine whether the attribute applies (such as **equal**). The available criteria vary by the log type. |
| --- | --- |






| • | **Value**—Specify the attribute value to match. |
| --- | --- |



 To [display or export](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-logs.html) the logs that the filter matches, select **View Filtered Logs**. This tab provides the same options as the **Monitoring** tab pages (such as **Monitoring** > **Logs** > **Traffic**).
 Fastpath:
 Set the filter to forward logs for all event severity levels (the default filter is **All Logs**). To create separate log forwarding methods for different severity levels, specify one or more severity levels in the **Filter**, configure a **Forward Method**, and then repeat the process for the rest of the severity levels.




 Description


 Enter a description (up to 1,023 characters) to explain the purpose of this match list profile.




 Panorama/Logging Service


 Select **Panorama/Logging Service** if you want to forward logs to the Logging Service, Log Collectors or the Panorama management server. If you enable this option, you must [configure log forwarding to Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-log-collection/configure-log-forwarding-to-panorama.html).
 Note:



| | You cannot forward Correlation logs from firewalls to Panorama. Panorama generates Correlation logs based on the firewall logs it receives. |
| --- | --- |







 SNMP


 **Add** one or more SNMP Trap server profiles to forward logs as SNMP traps (see [Device > Server Profiles > SNMP Trap](device-server-profiles-snmp-trap.html#ID0E3WJZ)).




 Email


 **Add** one or more Email server profiles to forward logs as email notifications (see [Device > Server Profiles > Email](device-server-profiles-email.html#ID0EHGLZ)).




 Syslog


 **Add** one or more Syslog server profiles to forward logs as syslog messages (see [Device > Server Profiles > Syslog](device-server-profiles-syslog.html#ID0E1PKZ)).




 HTTP


 **Add** one or more HTTP server profiles to forward logs as HTTP requests (see [Device > Server Profiles > HTTP](device-server-profiles-http.html#ID0E3GMZ)).




 Built-in Actions


 You can select from two types of built-in actions when you **Add** an action to perform—Tagging and Integration.



| • | **Tagging**—You can add an action for all log types that include a source or destination IP address in the log entry by configuring the following settings as needed. |
| --- | --- |



 Note:



| | You can tag only the source IP address in Correlation logs and HIP Match logs. You cannot configure any action for System logs and Configuration logs because the log type does not include an IP address in the log entry. |
| --- | --- |






| ◦ | **Add** an action and enter a name to describe the action. |
| --- | --- |






| ◦ | Select the IP address you want to automatically tag—**Source Address** or **Destination Address**. |
| --- | --- |






| ◦ | Select the action—**Add Tag** or **Remove Tag**. |
| --- | --- |






| ◦ | Select whether to register the IP address and tag mapping to the **Local User-ID** agent on this firewall or Panorama, or to a **Remote User-ID** agent. |
| --- | --- |






| ◦ | To register the IP address and tag mapping to a **Remote User-ID** agent, select the HTTP server profile ([Device > Server Profiles > HTTP](device-server-profiles-http.html#ID0E3GMZ)) that will enable forwarding. |
| --- | --- |






| ◦ | Configure the IP-Tag **Timeout** to set, in minutes, the amount of time that IP address-to-tag mapping is maintained. Setting the timeout to 0 means that the IP-Tag mapping does not timeout (range is 0 to 43200 (30 days); default is 0). |
| --- | --- |



 Note:
 You can only configure a timeout with the **Add Tag** action.



| ◦ | Enter or select the **Tags** you want to apply or remove from the target source or destination IP address. |
| --- | --- |






| • | **Integration**—Available only on the VM-Series firewall on Azure. **Add** a name and use this action to forward the selected logs to Azure Security Center. If you do not see this option, your Azure subscription may not be enabled for Azure Security Center. |
| --- | --- |



 To add a device to the quarantine list based on the log forwarding profile filter, select **Quarantine**.



 Parent topic
 [Device > Log Settings](device-log-settings.html#ID0ETQGZ)