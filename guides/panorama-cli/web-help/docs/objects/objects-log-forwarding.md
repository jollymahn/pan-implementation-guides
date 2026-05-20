# Objects > Log Forwarding

*Objects : Objects &gt; Log Forwarding*

## Objects > Log Forwarding


By default, the logs that the firewall generates reside only in its local storage. However, you can use Panorama™, the Logging Service, or external services (such as a syslog server) to centrally monitor log information by defining a Log Forwarding profile and assigning that profile to Security, Authentication, DoS Protection, and Tunnel Inspection policy rules. Log Forwarding profiles define forwarding destinations for the following [Log Types](log-types.html#ID0EXDHM): Authentication, Data Filtering, GTP, SCTP, Threat, Traffic, Tunnel, URL Filtering, and WildFire® Submissions logs.

 Fastpath:
 You should forward logs to Panorama or to external storage for many reasons, including: compliance, redundancy, running analytics, centralized monitoring, and reviewing threat behaviors and long-term patterns. In addition, the firewall has limited log storage capacity and deletes the oldest logs as when the storage space fills up. Be sure to forward Threat logs and WildFire logs.

To forward other log types, see [Device > Log Settings](device-log-settings.html#ID0ETQGZ).

 Note:



| | To enable a PA-7000 Series firewall to forward logs or forward files to WildFire®, you must first configure a [Log Card Interface](log-card-interface.html#ID0EMRBT) on the PA-7000 Series firewall. As soon as you configure this interface, the firewall will automatically use this port—there is no special configuration required. Just configure a data port on one of the PA-7000 Series Network Processing Cards (NPCs) as a Log Card interface type and ensure that the network that you use can communicate with your log servers. For WildFire forwarding, the network must communicate successfully with the WildFire cloud or WildFire appliance (or both). |
| --- | --- |




The following table describes the Log Forwarding profile settings.



| Log Forwarding Profile Settings | Description |
| --- | --- |
| Name | Enter a name (up to 64 characters) to identify the profile. This name appears in the list of Log Forwarding profiles when defining Security policy rules. The name is case-sensitive, must be unique, and can contain only letters, numbers, spaces, hyphens, and underscores. |
| Shared (`Panorama only`) | Select this option if you want the profile to be available to: • |






| • | **Every device group on Panorama**—If you disable (clear) this option, the profile is available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Enable enhanced application logging to Strata Logging Service (including traffic and url logs) (`Panorama only`)


 [Enhanced Application Logs for Palo Alto Networks Cloud Services](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/subscriptions/enhanced-application-logs.html) is available with a Strata Logging Service subscription. Enhanced application logging allows the firewall to collect data specifically intended to increase visibility into network activity for apps running in the Palo Alto Networks Cloud Services environment.




 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this Log Forwarding profile in device groups that inherit the profile. This selection is disabled (cleared) by default, which means administrators can override the settings for any device group that inherits the profile.




 Description


 Enter a description to explain the purpose of this Log Forwarding profile.




 Match List (unlabeled)


 **Add** one or more match list profiles (up to 64) that specify forwarding destinations, log attribute-based filters to control which logs the firewall forwards, and actions to perform on the logs (such as automatic tagging). Complete the following two fields (Name and Description) for each match list profile.




 Name (match list profile)


 Enter a name (up to 31 characters) to identify the match list profile.




 Description (match list profile)


 Enter a description (up to 1,023 characters) to explain the purpose of this match list profile.




 Log Type


 Select the type of logs to which this match list profile applies: authentication (**auth**), **data**, **gtp**, **sctp**, **threat**, **traffic**, **tunnel**, **URL**, or **WildFire**.




 Filter


 By default, the firewall forwards **All Logs** of the selected **Log Type**. To forward a subset of the logs, select an existing filter from the drop-down or select **Filter Builder** to add a new filter. For each query in a new filter, specify the following fields and **Add** the query:



| • | **Connector**—Select the connector logic (and/or) for the query. Select **Negate** if you want to apply negation to the logic. For example, to avoid forwarding logs from an untrusted zone, select **Negate**, select **Zone** as the Attribute, select **equal** as the Operator, and enter the name of the untrusted Zone in the Value column. |
| --- | --- |






| • | **Attribute**—Select a log attribute. The available attributes depend on the **Log Type**. |
| --- | --- |






| • | **Operator**—Select the criterion to determine whether the attribute applies (such as **equal**). The available criteria depend on the **Log Type**. |
| --- | --- |






| • | **Value**—Specify the attribute value to match. |
| --- | --- |



 To [display or export](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-logs.html) the logs that the filter matches, **View Filtered Logs**, which provides the same options as the **Monitoring** tab pages (such as **Monitoring** > **Logs** > **Traffic**).




 Panorama
 Panorama/Logging Service (`Panorama only`)


 Select **Panorama** if you want to forward logs to Log Collectors or the Panorama management server or to forward logs to the Logging Service.
 If you enable this option, you must [configure log forwarding to Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-log-collection/configure-log-forwarding-to-panorama.html).
 To use the Logging Service, you must also **Enable** the Logging Service in [Device > Setup > Management](device-setup-management.html#ID0E1DTW).




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



| • | **Tagging**—Add or remove a tag to the source or destination IP address in a log entry automatically and register the IP address and tag mapping to a User-ID agent on the firewall or Panorama, or to a remote User-ID agent so that you can respond to an event and dynamically enforce Security policy. The ability to tag an IP address and dynamically enforce policy using dynamic address groups gives you better visibility, context, and control for consistently enforcing Security policy irrespective of where the IP address moves across your network. |
| --- | --- |



 Configure the following settings:



| ◦ | **Add** an action and enter a name to describe it. |
| --- | --- |






| ◦ | Select the target IP address you want to tag—**Source Address** or **Destination Address**. |
| --- | --- |



 You can take an action for all log types that include a source or destination IP address in the log entry. You can tag the source IP address only, in Correlation logs and HIP Match logs; you cannot configure an action for System logs and Configuration logs because the log type does not include an IP address in the log entry.



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






| • | **Integration**—Only available on the VM-Series firewall on Azure. This option allows you to forward the selected logs to the Azure Security Center using the **Azure-Security-Center-Integration** action. |
| --- | --- |



 To add a device to the quarantine list based on the log forwarding profile filter, select **Quarantine**.



 Parent topic
 [Objects](objects.html#ID0EL3RQ)