# Monitor > PDF Reports > SaaS Application Usage

*Monitor : Monitor &gt; PDF Reports : Monitor &gt; PDF Reports &gt; SaaS Application Usage*

Monitor > PDF Reports > SaaS Application Usage

Use this page to generate a SaaS application usage report that summarizes the security risks associated with the SaaS applications traversing your network. This predefined report presents a comparison of the sanctioned versus unsanctioned applications, summarizes the risky SaaS applications with unfavorable hosting characteristics, and highlights the activity, usage, and compliance of the applications by listing the top applications for each category on the detailed pages. You can use this detailed risk information to enforce policy for SaaS applications that you want to allow or block on your network.


For generating an accurate and informative report, you must tag the sanctioned applications on your network (see [Generate the SaaS Application Usage Report](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-reports/generate-the-saas-application-usage-report#idc1243bc9-ac2e-4ebc-84f7-9353114d61b7)). The firewall and Panorama consider any application without this predefined tag as unsanctioned for use on the network. It is important to know about the sanctioned applications and unsanctioned applications that are prevalent on your network because unsanctioned SaaS applications are a potential threat to information security; they are not approved for use on your network and can cause an exposure to threats and loss of private and sensitive data.

 Note:



| | Make sure you tag applications consistently across all firewalls or device groups. If the same application is tagged as sanctioned in one virtual system and is not sanctioned in another—or on Panorama, if an application is unsanctioned in a parent device group but is tagged as sanctioned in a child device group (or vice versa)—the SaaS Application Usage report will produce overlapping results. |
| --- | --- |



 On the [ACC](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/use-the-application-command-center#ide0d84bc6-949a-4636-90b8-6629f796a127), set the **Application View** to **By Sanctioned State** to visually identify applications that have different sanctioned state across virtual systems or device groups. Green indicates sanctioned applications, blue is for unsanctioned applications, and yellow indicates applications that have a different sanctioned state across different virtual systems or device groups.

To configure the report, click **Add** and specify the following information:



| SaaS Application Usage Report Settings | Description |
| --- | --- |
| Name | Enter a name to identify the report (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Time Period | Select the time frame for the report from the drop-down. The report includes data from the current day (the day on which the report is generated). |
| Include logs from | From the drop-down, select whether you want to generate the report on a selected user group, on a selected zone, or for all user groups and zones configured on the firewall or Panorama. • |






| • | **For a selected zone**—Select the **Zone** for which the firewall or Panorama will filter the logs. |
| --- | --- |






| • | **For all user groups and zones**—You can report on all groups or choose up to 25 user groups for which you want visibility. If you have more than 25 groups, the firewall or Panorama will display the top 25 groups in the report and assign all remaining user groups to the Others group. |
| --- | --- |







 Include user group information in the report
 (`Not available if you choose to generate the report on a` **Selected User Group**.)


 This option filters the logs for the user groups you want to include in the report. Select the **manage groups** or the **manage groups for the selected zone** link to choose up to 25 user groups for which you want visibility.
 When you generate a report for specific user groups on a selected zone, users who are not a member of any of the selected groups are assigned to a user group called Others.




 User group


 Select the user group(s) for which you want to generate the report. This option displays only when you choose **Selected User Group** in the **Include logs from** drop-down.




 Zone


 Select the zone for which you want to generate the report. This option displays only when you choose **Selected Zone** in the **Include logs from** drop-down.
 You can then select include user group information in the report.




 Include detailed application category information in report


 The SaaS Application Usage PDF report is a two-part report. By default, both parts of the report are generated. The first part of the report (ten pages) focuses on the SaaS applications used on your network during the reporting period.
 Clear this option if you do not want the second part of the report that includes detailed information for SaaS and non-SaaS applications for each application subcategory listed in the first part of the report. This second part of the report includes the names of the top applications in each subcategory and information about users, user groups, files, bytes transferred, and threats generated from these applications.
 Without the detailed information, the report is ten-pages long.




 Limit max subcategories in the report to


 Select whether you want to use all application subcategories in the SaaS Application Usage report or whether you want to limit the maximum number to 10, 15, 20, or 25 subcategories.
 When you reduce the maximum number of subcategories, the detailed report is shorter because you limit the SaaS and non-SaaS application activity information included in the report.




Click **Run Now** to generate the report on demand.


You can generate this report on demand or you can schedule it to run on a daily, weekly, or monthly cadence. To schedule the report, see [schedule reports for email delivery](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-reports/schedule-reports-for-email-delivery#idbfc2600a-1a38-48c0-8b41-ec4ea025f0f5).


On PA-220 and PA-220R firewalls, the SaaS Application Usage report is not sent as a PDF attachment in the email. Instead, the email includes a link you use to open the report in a web browser.


For more information on the report, see [Manage Reporting](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-reports.html).

 Parent topic
 [Monitor > PDF Reports](monitor-pdf-reports.html#ID0EDJFO)