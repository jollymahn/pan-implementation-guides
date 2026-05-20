# Monitor > Manage Custom Reports

*Monitor : Monitor &gt; Manage Custom Reports*

## Monitor > Manage Custom Reports


You can create custom reports to run on demand or on schedule (each night). For predefined reports, select **Monitor** > **Reports**.

 Fastpath:
 After the firewall has generated a scheduled custom report, you risk invalidating the past results of that report if you modify its configuration to change its future output. If you need to modify a scheduled report configuration, the best practice is to create a new report.

**Add** a custom report to create a new one. To base the report on an existing template, **Load Template** and select the template. To generate a report on demand, instead of or in addition to the **Scheduled** time, click **Run Now**. Specify the following settings to define the report.



| Custom Report Settings | Description |
| --- | --- |
| Name | Enter a name to identify the report (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Description | Enter a description for the custom report. |
| Database | Choose the database to use as the data source for the report. |
| Scheduled | Select this option to run the report each night. The report then becomes available by selecting **Monitor** > **Reports**. |
| Time Frame | Choose a fixed time frame or choose **Custom** and specify a date and time range. |
| Sort By | Choose sorting options to organize the report, including the amount of information to include in the report. The available options depend on the choice of database. |
| Group By | Choose grouping options to organize the report, including the amount of information to include in the report. The available options depend on the choice of database. |
| Columns | Select Available Columns to include in the custom report and add ( ) them to Selected Columns. Select **Up**, **Down**, **Top**, and **Bottom** to reorder selected columns. As needed, you can also select and remove ( ) previously selected columns. |
| Query Builder | To build a report query, specify the following and click **Add**. Repeat as needed to construct the full query. • |






| • | **Negate**—Select this option to interpret the query as a negation. In the previous example, the negate option causes a match on entries that are not in the past 24 hours or are not from the untrust zone. |
| --- | --- |






| • | **Attribute**—Choose a data element. The available options depend on the choice of database. |
| --- | --- |






| • | **Operator**—Choose the criterion to determine whether the attribute applies (such as =). The available options depend on the choice of database. |
| --- | --- |






| • | **Value**—Specify the attribute value to match. |
| --- | --- |







For more information, see [Generate Custom Reports](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-reports/generate-custom-reports.html).

 Parent topic
 [Monitor](monitor.html#ID0EVEGM)