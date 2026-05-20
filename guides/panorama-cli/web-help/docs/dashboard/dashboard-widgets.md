# Dashboard Widgets

*Dashboard : Dashboard Widgets*

## Dashboard Widgets


By default, the **Dashboard** displays widgets in a **Layout** of **3 Columns** but you can customize the **Dashboard** to display only **2 Columns**, instead.


You can also decide which widgets to display or hide so that you see only those you want to monitor. To display a widget, select a widget category from the **Widgets** drop-down and select a widget to add it to the Dashboard (widget names that appear in faded grayed-out text are already displayed). Hide (stop displaying) a widget by closing the widget ( in the widget header). The firewalls and Panorama save your widget display settings across logins (separately for each administrator).


Refer to the **Last updated** timestamp to determine when the Dashboard data was last refreshed. You can manually refresh the entire **Dashboard** ( in the top right corner of the Dashboard) or you can refresh individual widgets ( within each widget header). Use the unlabeled drop-down next to the manual Dashboard refresh option ( ) to select the automatic refresh interval for the entire **Dashboard** (in minutes): **1** **min**, **2 mins**, or **5 mins**; to disable automatic refresh for the entire **Dashboard**, select **Manual**.



| Dashboard Widgets | Description |
| --- | --- |
| Application Widgets | |
| Top Applications | Displays the applications with the most sessions. The block size indicates the relative number of sessions (mouse over the block to view the number), and the color indicates the security risk—from green (lowest) to red (highest). Click an application to view its application profile. |
| Top High Risk Applications | Similar to Top Applications except that it displays the highest-risk applications with the most sessions. |
| ACC Risk Factor | Displays the average risk factor (1-5) for the network traffic processed over the past week. Higher values indicate higher risk. |
| System Widgets | |
| General Information | Displays the firewall or Panorama name and model, the Panorama CPU and RAM, the Panorama system mode, the PAN-OS® or Panorama software version, the IPv4 and IPv6 management IP information, the serial number, the CPU ID and UUID, the application, threat, and URL filtering definition versions, the current date and time, and the length of time since the last restart. |
| Interfaces (`Firewall only`) | Indicates whether each interface is up (green), down (red), or in an unknown state (gray). Interfaces that support Power over Ethernet (PoE) are marked with a lightning bolt icon. Hovering the mouse cursor over an interface displays link configuration and status information. Additional details such as link speed, link duplex, and PoE information are displayed based on the port type. |
| System Resources | Displays the Management CPU usage, Data Plane usage, and the Session Count (the number of sessions established through the firewall or Panorama). |
| High Availability | Indicates—when high availability (HA) is enabled—the HA status of the local and peer firewall/Panorama—green (active), yellow (passive), or black (other). For more information about HA, refer to [Device > High Availability](device-high-availability.html#ID0EOYXX) or [Panorama > High Availability](panorama-high-availability.html#ID0EEES2). |
| HA Cluster | When HA Cluster is enabled, indicates cluster statistics and also the Keep Alive value for HA4 and HA4_backup links for each member in the cluster. |
| Locks | Shows configuration locks that administrators have set. |
| Logged In Admins | Displays the source IP address, session type (web interface or CLI), and session start time for each administrator who is currently logged in. |
| PoE Power Budget (`Supported firewalls only`) | Displays the Total Power Budget and Total Allocated Power of configured interfaces when using power over Ethernet. The donut chart confirms the available power on the firewall and helps you decide which powered devices (PDs) to connect to the PoE ports. |
| Logs Widgets | |
| Threat Logs | Displays the threat ID, application, and date and time for the last 10 entries in the Threat log. The threat ID is a malware description or URL that violates the URL filtering profile. Displays only entries from the last 60 minutes. |
| URL Filtering Logs | Displays the description and date and time for the last 60 minutes in the URL Filtering log. |
| Data Filtering Logs | Displays the description and date and time for the last 60 minutes in the Data Filtering log. |
| Config Logs | Displays the administrator username, client (web interface or CLI), and date and time for the last 10 entries in the Configuration log. Displays only entries from the last 60 minutes. |
| System Logs | Displays the description and date and time for the last 10 entries in the System log. Note:  |






 Parent topic
 [Dashboard](dashboard.html#ID0E1MBM)