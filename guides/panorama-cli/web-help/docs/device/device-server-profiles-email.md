# Device > Server Profiles > Email

*Device : Device &gt; Server Profiles &gt; Email*

## Device > Server Profiles > Email


Select **Device** > **Server Profiles** > **Email** or **Panorama** > **Server Profiles** > **Email** to [configure a server profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/configure-email-alerts.html) for forwarding logs as email notifications. To define an Email server profile, **Add** a profile and specify Email Notification Settings.

 Note:



| • | To select the Email Server profile for System, Config, User-ID, HIP Match, and Correlation logs, see [Device > Log Settings](device-log-settings.html#ID0ETQGZ). |
| --- | --- |






| • | To select the Email Server Profile For Traffic, Threat, Wildfire, URL Filtering, Data Filtering, Tunnel Inspection, Authentication, and GTP logs, see [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R). |
| --- | --- |






| • | You can also schedule email reports ([Monitor > PDF Reports > Email Scheduler](monitor-pdf-reports-email-scheduler.html#ID0EYVHO)). |
| --- | --- |






| • | You cannot delete a server profile that the firewall uses in any System or Config log settings or Log Forwarding profile. |
| --- | --- |





| Email Notification Settings | Description |
| --- | --- |
| Name | Enter a name for the server profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location (`Virtual systems only`) | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| **Servers Tab** | |
| Name | Enter a name to identify the server (up to 31 characters). This field is just a label and does not have to be the host name of an existing email server. |
| Email Display Name | Enter the name shown in the **From** field of the email. |
| From | Enter the sender’s email address, such as security_alert@company.com. |
| To | Enter the email address of the recipient. |
| Additional Recipient | Optionally, enter the email address of another recipient. You can only add one additional recipient. To add multiple recipients, add the email address of a distribution list. |
| Email Gateway | Enter the IP address or host name of the server that sends the email. |
| Protocol | Select the protocol you want to use to send the email (**Unauthenticated SMTP** or **SMTP over TLS**). |
| Port | Enter the port number you want to use to send the email if it differs from the default (25 for SMTP or 587 for TLS). |
| TLS Version (`SMTP over TLS only`) | Select the TLS version you want to use (**1.2** or **1.1**). Fastpath:**As a best practice, we strongly recommend using the latest TLS version. |
| Authentication Method (`SMTP over TLS only**) | Select the authentication method you want to use: • |






| • | Login**—Use Base64 encoding for the username and password and transmit them separately. |
| --- | --- |






| • | **Plain**—Use Base64 encoding for the username and password and transmit them together. |
| --- | --- |







 Certificate Profile
 (`SMTP over TLS only`)


 Select the [certificate profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/configure-a-certificate-profile.html) for the firewall to use to authenticate the email server.




 Username
 (`SMTP over TLS only`)


 Enter the username of the account that sends the email.




 Password
 (`SMTP over TLS only`)


 Enter the password of the account that sends the email.




 Confirm Password
 (`SMTP over TLS only`)


 Confirm the password of the account that sends the email.




 Test Connection
 (`SMTP over TLS only`)


 Confirm the connection between the email server and the firewall.




 **Custom Log Format Tab**




 Log Type


 Click the log type to open a dialog box that allows you to specify a custom log format. In the dialog box, click a field to add it to the Log Format area. Click **OK** to save your changes.




 Escaping


 Specify the **Escaped Characters** (all characters to not interpret literally) without spaces and specify the **Escape Character** for the escape sequence.



 Parent topic
 [Device](device.html#ID0EY2QW)