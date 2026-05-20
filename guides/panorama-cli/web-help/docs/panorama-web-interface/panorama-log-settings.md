# Panorama > Log Settings

*Panorama Web Interface : Panorama &gt; Log Settings*

## Panorama > Log Settings


Use the **Log Settings** page to forward the following log types to external services:




| • | System, Configuration, User-ID, and Correlation logs that the Panorama management server (M-Series appliance or Panorama virtual appliance in Panorama mode) generates locally. |
| --- | --- |






| • | Logs of all types that the Panorama virtual appliance in Legacy mode generates locally or collects from firewalls. |
| --- | --- |



 Note:



| | For the logs that firewalls send to Log Collectors, complete the [Log Collector Configuration](log-collector-configuration.html#ID0E4JP3) to enable forwarding to external services. |
| --- | --- |




Before starting, you must define server profiles for the external services (see [Device > Server Profiles > SNMP Trap](device-server-profiles-snmp-trap.html#ID0E3WJZ), [Device > Server Profiles > Syslog](device-server-profiles-syslog.html#ID0E1PKZ), [Device > Server Profiles > Email](device-server-profiles-email.html#ID0EHGLZ), and [Device > Server Profiles > HTTP](device-server-profiles-http.html#ID0E3GMZ)). Then **Add** one or more match list profiles and configure the settings as described in the following table.



| Match List Profile Settings | Description |
| --- | --- |
| Name | Enter a name (up to 31 characters) to identify the match list profile. |
| Filter | By default, Panorama forwards **All Logs** of the type for which you are adding the match list profile. To forward a subset of the logs, open the drop-down and select an existing filter or select **Filter Builder** to add a new filter. For each query in a new filter, specify the following fields and **Add** the query: • |






| • | **Attribute**—Select a log attribute. The options depend on the log type. |
| --- | --- |






| • | **Operator**—Select the criterion to determine whether the attribute applies (such as **equal**). The available options depend on the log type. |
| --- | --- |






| • | **Value**—Specify the attribute value for the query to match. |
| --- | --- |



 To [display or export](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-logs.html) the logs that the filter matches, select **View Filtered Logs**. This tab provides the same options as the **Monitoring** tab pages (such as **Monitoring** > **Logs** > **Traffic**).




 Description


 Enter a description of up to 1,024 characters to explain the purpose of this match list profile.




 SNMP


 **Add** one or more SNMP Trap server profiles to forward logs as SNMP traps (see [Device > Server Profiles > SNMP Trap](device-server-profiles-snmp-trap.html#ID0E3WJZ)).




 Email


 **Add** one or more Email server profiles to forward logs as email notifications (see [Device > Server Profiles > Email](device-server-profiles-email.html#ID0EHGLZ)).




 Syslog


 **Add** one or more Syslog server profiles to forward logs as syslog messages (see [Device > Server Profiles > Syslog](device-server-profiles-syslog.html#ID0E1PKZ)).




 HTTP


 **Add** one or more HTTP server profiles to forward logs as HTTP requests (see [Device > Server Profiles > HTTP](device-server-profiles-http.html#ID0E3GMZ)).




 Built-in Actions


 All log types except System logs and Configuration logs allow you to configure actions.



| • | **Add** an action and enter a name to describe it. |
| --- | --- |






| • | Select the IP address you want to tag—**Source Address** or **Destination Address**. |
| --- | --- |






| • | Select the action—**Add Tag** or **Remove Tag**. |
| --- | --- |






| • | Select whether to distribute the tag to the local User-ID agent on this device, or to a remote User-ID Agent. |
| --- | --- |






| • | To distribute tags to a **Remote device User-ID Agent**, select the HTTP server profile that will enable forwarding. |
| --- | --- |






| • | Configure the IP-Tag **Timeout** to set, in minutes, the amount of time that IP address-to-tag mapping is maintained. Setting the timeout to 0 means that the IP-Tag mapping does not timeout (range is 0 to 43200 (30 days); default is 0). |
| --- | --- |



 Note:



| | You can only configure a timeout with the **Add Tag** action. |
| --- | --- |






| • | Enter or select the **Tags** you want to apply or remove from the target source or destination IP address. You can tag the source IP address only, in Correlation logs and HIP Match logs. |
| --- | --- |






 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)