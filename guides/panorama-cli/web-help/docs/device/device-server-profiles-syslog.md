# Device > Server Profiles > Syslog

*Device : Device &gt; Server Profiles &gt; Syslog*

## Device > Server Profiles > Syslog


Select **Device** > **Server Profiles** > **Syslog** or **Panorama** > **Server Profiles** > **Syslog** to [configure a server profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/use-syslog-for-monitoring/configure-syslog-monitoring.html) for forwarding firewall, Panorama, and Log Collector logs as syslog messages to a syslog server. To define a syslog server profile, click **Add** and specifying the New Syslog Server fields.

 Note:



| • | To select the Syslog Server profile for System, Config, User-ID, HIP Match, and Correlation logs, see [Device > Log Settings](device-log-settings.html#ID0ETQGZ). |
| --- | --- |






| • | To select the Syslog Server Profile For Traffic, Threat, Wildfire, URL Filtering, Data Filtering, Tunnel Inspection, Authentication, and GTP logs, see [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R). |
| --- | --- |






| • | You cannot delete a server profile that the firewall uses in any System or Config log settings or Log Forwarding profile. |
| --- | --- |





| Syslog Server Settings | Description |
| --- | --- |
| Name | Enter a name for the syslog profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| Servers Tab | |
| Name | Click **Add** and enter a name for the syslog server (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Server | Enter the IP address or FQDN of the syslog server. |
| Transport | Select whether to transport the syslog messages over UDP, TCP, or SSL. Fastpath:  Use **SSL** to encrypt and secure data sent to a syslog server. Data is sent over UDP or TCP in cleartext and is readable in transit. |
| Port | Enter the port number of the syslog server (the standard port for UDP is 514; the standard port for SSL is 6514; for TCP you must specify a port number). |
| Format | Specify the syslog format to use: BSD (the default) or IETF. |
| Facility | Select one of the Syslog standard values. Select the value that maps to how your Syslog server uses the facility field to manage messages. For details on the facility field, see [RFC 3164](https://tools.ietf.org/html/rfc3164) (BSD format) or [RFC 5424](https://tools.ietf.org/html/rfc5424) (IETF format). |
| Custom Log Format Tab | |
| Log Type | Click the log type to open a dialog box that allows you to specify a custom log format. In the dialog box, click a field to add it to the Log Format area. Other text strings can be edited directly in the Log Format area. Click **OK** to save the settings. View a description of each field that can be used for [custom logs](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/use-syslog-for-monitoring/syslog-field-descriptions.html). For details on the fields that can be used for custom logs, see [Device > Server Profiles > Email](device-server-profiles-email.html#ID0EHGLZ). |
| Escaping | Specify escape sequences. **Escaped characters** is a list of all the characters to be escaped without spaces. |


 Parent topic
 [Device](device.html#ID0EY2QW)