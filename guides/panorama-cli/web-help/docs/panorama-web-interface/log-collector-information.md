# Log Collector Information

*Panorama Web Interface : Panorama &gt; Managed Collectors : Log Collector Information*

Log Collector Information

Select **Panorama** > **Managed Collectors** to display the following information for Log Collectors. Additional parameters are configurable during [Log Collector Configuration](log-collector-configuration.html#ID0E4JP3).



| Log Collector Information | Description |
| --- | --- |
| Collector Name | The name that identifies this Log Collector. This name displays as the Log Collector hostname. |
| Serial Number | The serial number of the Panorama appliance that functions as the Log Collector. If the Log Collector is local, this is the serial number of the Panorama management server. |
| Software Version | The Panorama software release installed on the Log Collector. |
| IP Address | The IP address of the management interface on the Log Collector. |
| Connected | The status of the connection between the Log Collector and Panorama. |
| Configuration Status/Detail | Indicates whether the configuration on the Log Collector is synchronized with Panorama. |
| Run Time Status/Detail | The status of the connection between this and other Log Collectors in the Collector Group. |
| Log Redistribution State | Certain actions (for example, adding disks) will cause the Log Collector to redistribute the logs among its disk pairs. This column indicates the completion status of the redistribution process as a percentage. |
| Last Commit State | Indicates whether the last Collector Group commit performed on the Log Collector failed or succeeded. |
| Health | Indicates the Log Collector health status based on health status of log collection process. Displays when the Log Collector is healthy and if one or more log collection processes are experiencing degraded health. • |






| • | **vldmgr—**Process responsible for managing the vld processes. |
| --- | --- |






| • | **vlds—**Process responsible for managing individual logging disks, writing logs to the logging disks, and ingesting logs into ElasticSearch. |
| --- | --- |






| • | **es—**ElasticSearch process running on the Log Collector. |
| --- | --- |







 Statistics


 After you complete the [Log Collector Configuration](log-collector-configuration.html#ID0E4JP3), click **Statistics** to view disk information, CPU performance, and the average log rate (logs/second). To better understand the log range you are reviewing, you can also view information on the oldest log that the Log Collector received.
 Tip:
 If you use an [SNMP manager](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/administer-panorama/monitor-panorama.html) for centralized monitoring, you can also see loggings statistics in the panLogCollector MIB.



 Parent topic
 [Panorama > Managed Collectors](panorama-managed-collectors.html#ID0E3IO3)