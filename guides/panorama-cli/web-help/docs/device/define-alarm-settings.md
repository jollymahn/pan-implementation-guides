# Define Alarm Settings

*Device : Device &gt; Log Settings : Define Alarm Settings*

Define Alarm Settings



| • | Device > Log Settings |
| --- | --- |




Use the Alarm Settings to configure [Alarms](alarms.html#ID0EOOAK) for the CLI and the web interface. You can configure notifications for the following events:




| • | A security rule (or group of rules) has been matched at a specified threshold and within a specified time interval. |
| --- | --- |






| • | Encryption/Decryption failure threshold is met. |
| --- | --- |






| • | The Log database for each log type is nearing full; the quota by default is set to notify when 90% of the available disk space is used. Configuring alarms allows to take action before the disk is full, and logs are purged. |
| --- | --- |




When you enable alarms, you can view the current list by clicking **Alarms** ( ) in the bottom of the web interface.


To add an alarm, edit the Alarm Settings described in the following table.



| Alarm Log Settings | Description |
| --- | --- |
| Enable Alarms | Alarms are visible only if you **Enable Alarms**. CAUTION:  If you disable alarms, the firewall does not alert you to critical events that require action. For example, an alarm tells you when the master key is about to expire; if the key expires before you change it, the firewall reboots into Maintenance mode and then requires a factory reset. |
| Enable CLI Alarm Notifications | Enable CLI alarm notifications whenever alarms occur. |
| Enable Web Alarm Notifications | Open a window to display alarms on user sessions, including when they occur and when they are acknowledged. |
| Enable Audible Alarms | An audible alarm tone will play every 15 seconds on the administrator's computer when the administrator is logged into the web interface and unacknowledged alarms exist. The alarm tone will play until the administrator acknowledges all alarms. To view and acknowledge alarms, click **Alarms**. This feature is only available when the firewall is in FIPS-CC mode. |
| Encryption/Decryption Failure Threshold | Specify the number of encryption/decryption failures after which an alarm is generated. |
| <Log-type> Log DB | Generate an alarm when a log database reaches the indicated percentage of the maximum size. |
| Security Violations Threshold / Security Violations Time Period | An alarm is generated if a particular IP address or port hits a deny rule the specified number of times in the **Security Violations Threshold** setting within the period (seconds) specified in the **Security Violations Time Period** setting. |
| Violations Threshold / Violations Time Period / Security Policy Tags | An alarm is generated if the collection of rules reaches the number of rule limit violations specified in the **Violations Threshold** field during the period specified in the **Violations Time Period** field. Violations are counted when a session matches an explicit deny policy. Use **Security Policy Tags** to specify the tags for which the rule limit thresholds will generate alarms. These tags become available to be specified when defining security policies. |
| Selective Audit | The selective audit options are only available when the firewall is in FIPS-CC mode. Specify the following settings: • |






| • | **Packet Drop Logging**—Logs packets dropped by the firewall. |
| --- | --- |






| • | **Suppress Login Success Logging**—Stops logging of successful administrator logins to the firewall. |
| --- | --- |






| • | **Suppress Login Failure Logging**—Stops logging of failed administrator logins to the firewall. |
| --- | --- |






| • | **TLS Session Logging**—Logs the establishment of TLS sessions. |
| --- | --- |






| • | **CA (OCSP/CRL) Session Establishment Logging**—Logs session establishment between the firewall and a certificate authority when the firewall sends a request to check certificate revocation status using the Online Certificate Status Protocol or a Certificate Revocation List server request. (Disabled by default.) |
| --- | --- |






| • | **IKE Session Establishment Logging**—Logs IPSec IKE session establishment when the VPN gateway on the firewall authenticates with a peer. The peer can be a Palo Alto Networks firewalls or another security device used to initiate and terminate VPN connections. The interface name that is specified in the log is the interface that is bound to the IKE gateway. The IKE gateway name is also displayed if applicable. Disabling this option stops logging of all IKE logging events. (Enabled by default.) |
| --- | --- |






| • | **Suppressed Administrators**—Stops logging of changes that the listed administrators make to the firewall configuration. |
| --- | --- |






 Parent topic
 [Device > Log Settings](device-log-settings.html#ID0ETQGZ)