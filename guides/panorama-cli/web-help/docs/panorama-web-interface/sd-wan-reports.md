# SD-WAN Reports

*Panorama Web Interface : Panorama &gt; SD-WAN : SD-WAN Reports*

SD-WAN Reports



| • | **Panorama** > **SD-WAN** > **Reports** |
| --- | --- |




Generate a report for application or link performance for the top applications or links that experienced the highest frequency of health degradation in the specified period of time for auditing purposes. After a report is configured, you must **Run Now** in order to view the report. Reports can be exported `Functionality doesn’t currently work. In what formats can reports be exported?`



| Field | Description |
| --- | --- |
| Name | Enter a name that identifies the purpose of the report. |
| Report Type | Select the type of report to run: • |






| • | **Link Performance**—Generate a report detailing the health metrics for traffic across links in the SD-WAN. |
| --- | --- |







 Cluster


 From the drop-down, select the cluster for which to generate a report. By default, **all** is selected.




 Site


 From the drop-down, select the site for which to generate a report. By default, **all** is selected.
 If **all** is selected for the Cluster, then you must generate a report for all sites attributed to the cluster. If a specific cluster is selected, then you may select a specific site for which to generate a report.




 Application (`App Performance Report Type only`)


 From the drop-down, select an application for which to generate a report. By default, **all** is selected.
 If **all** is selected for the Site, then you must generate a report for all applications attributed to the site. If a specific site is selected, then you may select a specific application for which to generate a report.




 Link Tag (`Link Performance Report Type only`)


 From the drop-down, select a link tag for which to generate a report. By default, **all** is selected.
 If **all** is selected for the Site, then you must generate a report for all link tags created under site. If a specific site is selected, then you may select a specific link tag for which to generate a report.




 Link Type (`Link Performance Report Type only`)


 From the drop-down, select a link type for which to generate a report. By default, **all** is selected.
 If **all** is selected for the Link Tag, then you must generate a report for all link types created under the Link Tag. If a specific Link Tag is selected, then you may select a specific link type for which to generate a report.




 Top N


 Specify the number of applications or links to include in the report. You may select that the report include the top 5, 10, 25, 50, 100, 250, 500, or 1000 performing applications or links. By default, **5** is selected.




 Time Period


 Set the time period for which to run the report. **None** is selected by default, which generates a report using all of the app and link performance data.



 Parent topic
 [Panorama > SD-WAN](panorama-sd-wan.html#ID0EZJX3)