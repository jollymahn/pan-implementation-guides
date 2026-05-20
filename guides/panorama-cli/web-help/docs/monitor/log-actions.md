# Log Actions

*Monitor : Monitor &gt; Logs : Log Actions*

Log Actions

The following table describes log actions.



| Action | Description |
| --- | --- |
| Filter Logs | Each log page has a filter field at the top of the page. You can add artifacts to the field, such as an IP address or a time range, to find matching log entries. The icons to the right of the field enable you to apply, clear, create, save, and load filters. • |






| ◦ | Click an artifact in a log entry to add that artifact to the filter. |
| --- | --- |






| ◦ | Click **Add** ( ) to define new search criteria. For each criterion, select the **Connector** that defines the search type (**and** or **or**), the **Attribute** on which to base the search, an **Operator** to define the scope of the search, and a **Value** for evaluation against log entries. **Add** each criterion to the filter field and **Close** when you finish. You can then apply ( ) the filter. |
| --- | --- |



 CAUTION:
 If the **Value** string matches an **Operator** (such as **has** or **in**), enclose the string in quotation marks to avoid a syntax error. For example, if you filter by destination country and use IN as a **Value** to specify INDIA, enter the filter as ( dstloc eq "IN" ).
 Tip:
 The log filter **(receive_time in last-60-seconds)** causes the number of log entries (and log pages) displayed to grow or shrink over time.



| • | Apply filters—Click Apply Filter ( ) to display log entries that match the current filter. |
| --- | --- |






| • | Delete filters—Click Clear Filter ( ) to clear the filter field. |
| --- | --- |






| • | Save a filter—Click Save Filter ( ), enter a name for the filter, and click **OK**. |
| --- | --- |






| • | Use a saved filter—Click Load Filter ( ) to add a saved filter to the filter field. |
| --- | --- |







 Export Logs


 Click Export to CSV ( ) to export all logs matched to the current filter to a CSV-formatted report and continue to **Download file**. By default, the report contains up to 2,000 lines of logs. To change the line limit for generated CSV reports, select **Device** > **Setup** > **Management** > **Logging and Reporting Settings** > **Log Export and Reporting** and enter a new **Max Rows in CSV Export** value.




 Highlight Policy Actions


 Select to highlight log entries that match the action. The filtered logs are highlighted in the following colors:



| • | Green—Allow |
| --- | --- |






| • | Yellow—Continue, or override |
| --- | --- |






| • | Red—Deny, drop, drop-icmp, rst-client, reset-server, reset-both, block-continue, block-override, block-url, drop-all, sinkhole |
| --- | --- |







 Change Log Display


 To customize the log display:



| • | Change the automatic refresh interval—Select an interval from the interval drop-down (**60 seconds**, **30 seconds**, **10 seconds**, or **Manual**). |
| --- | --- |






| • | Change the number and order of entries displayed per page—Log entries are retrieved in blocks of 10 pages. |
| --- | --- |






| ◦ | Use the paging controls at the bottom of the page to navigate through the log list. |
| --- | --- |






| ◦ | To change the number of log entries per page, select the number of rows from the per page drop-down (**20**, **30**, **40**, **50**, **75**, or **100**). |
| --- | --- |






| ◦ | To sort the results in ascending or descending order, use the **ASC** or **DESC** drop-down. |
| --- | --- |






| • | Resolve IP addresses to domain names—Select **Resolve Hostname** to begin resolving external IP addresses to domain names. |
| --- | --- |






| • | Change the order in which logs are displayed—Select **DESC** to display logs in descending order beginning with log entries with the most recent Receive Time. Select **ASC** to display logs in ascending order beginning with log entries with the oldest Receive Time. |
| --- | --- |







 View Details for Individual Log Entries


 To view information about individual log entries:



| • | To display additional details, click Details ( ) for an entry. If the source or destination has an IP address to domain or username mapping defined in the **Addresses** page, the name is presented instead of the IP address. To view the associated IP address, move your cursor over the name. |
| --- | --- |






| • | On a firewall with an active AutoFocus license, hover next to an IP address, filename, URL, user agent, threat name, or hash contained in a log entry and click the drop-down ( ) to open the [AutoFocus Intelligence Summary](autofocus-intelligence-summary.html#ID0E1QHK) for the artifact. |
| --- | --- |






 Parent topic
 [Monitor > Logs](monitor-logs.html#ID0ESVGM)