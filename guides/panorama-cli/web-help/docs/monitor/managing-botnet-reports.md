# Botnet Report Settings

*Monitor : Monitor &gt; Botnet : Botnet Report Settings*

Botnet Report Settings



| • | Monitor > Botnet > Report Setting |
| --- | --- |




Before generating the botnet report, you must specify the types of traffic that indicate potential botnet activity (see [Configuring the Botnet Report](configuring-the-botnet-report.html#ID0EGJDO)). To schedule a daily report or run it on demand, click **Report Setting** and complete the following fields. To export a report, select it and **Export to PDF**, **Export to CSV**, or **Export to XML**.



| Botnet Report Settings | Description |
| --- | --- |
| Test Run Time Frame | Select the time interval for the report—**Last 24 Hours** (default) or **Last Calendar Day**. |
| Run Now | Click **Run Now** to manually and immediately generate a report. The report displays in a new tab within the Botnet Report dialog. |
| No. of Rows | Specify the number of rows to display in the report (default is 100). |
| Scheduled | Select this option to automatically generate the report daily. By default, this option is enabled. |
| Query Builder | **(**`Optional`**)** **Add** queries to the Query Builder to filter the report output by attributes such as source/destination IP addresses, users, or zones. For example, if you know that traffic initiated from the IP address 192.0.2.0 contains no potential botnet activity, you can add not (addr.src in 192.0.2.0) as a query to exclude that host from the report output. • |






| • | **Attribute**—Select a zone, address, or user that is associated with the hosts that the firewall evaluates for botnet activity. |
| --- | --- |






| • | **Operator**—Select an operator to relate the **Attribute** to a **Value**. |
| --- | --- |






| • | **Value**—Enter a value for the query to match. |
| --- | --- |






 Parent topic
 [Monitor > Botnet](monitor-botnet.html#ID0EQRCO)