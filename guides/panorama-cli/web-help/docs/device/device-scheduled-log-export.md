# Device > Scheduled Log Export

*Device : Device &gt; Scheduled Log Export*

## Device > Scheduled Log Export


You can [schedule exports of logs](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-logs/schedule-log-exports-to-an-scp-or-ftp-server.html) and save them in CSV format to a File Transfer Protocol (FTP) server or use Secure Copy (SCP) to securely transfer data between the firewall and a remote host. Log profiles contain the schedule and FTP server information. For example, a profile may specify that the previous day’s logs are collected each day at 3AM and stored on a particular FTP server.


Click **Add** and fill in the following details:



| Scheduled Log Export Settings | Description |
| --- | --- |
| Name | Enter a name to identify the profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. You cannot change the name after the profile is created. |
| Description | Enter an optional description (up to 255 characters). |
| Enable | Select this option to enable the scheduling of log exports. |
| Log Type | Select the type of log (**traffic**, **threat**, **gtp**, **sctp**, **tunnel**, **userid**, **auth**, **url**, **data**, **hipmatch**, or **wildfire**). Default is traffic. |
| Scheduled Export Start Time (Daily) | Enter the time of day (hh:mm) to start the export using a 24-hour clock (00:00 - 23:59). |
| Protocol | Select the protocol to use to export logs from the firewall to a remote host: • |






| • | **SCP**—This protocol is secure. After completing the remaining fields, you must click **Test SCP server connection** to test connectivity between the firewall and the SCP server and you must verify and accept the host key of the SCP server. |
| --- | --- |







 Hostname


 Enter the host name or IP address of the FTP server that will be used for the export.




 Port


 Enter the port number that the FTP server will use. Default is 21.




 Path


 Specify the path located on the FTP server that will be used to store the exported information.




 Enable FTP Passive Mode


 Select this option to use passive mode for the export. By default, this option is selected.




 Username


 Enter the user name for access to the FTP server. Default is anonymous.




 Password / Confirm Password


 Enter the password for access to the FTP server. A password is not required if the user is anonymous.




 Test SCP server connection
 (`SCP protocol only`)


 If you set the **Protocol** to **SCP**, you must click this button to test connectivity between the firewall and the SCP server. A pop-up window is displayed requiring you to enter the SCP server clear text **Password** and then **Confirm Password**.
 Note:



| | If you use a Panorama template to configure the log export schedule, you must perform this step after committing the template configuration to the firewalls. After the template commit, log in to each firewall, open the log export schedule, and click **Test SCP server connection**. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)