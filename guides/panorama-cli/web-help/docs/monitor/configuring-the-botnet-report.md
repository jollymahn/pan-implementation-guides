# Botnet Configuration Settings

*Monitor : Monitor &gt; Botnet : Botnet Configuration Settings*

Botnet Configuration Settings



| • | Monitor > Botnet > Configuration |
| --- | --- |




To specify the types of traffic that indicate potential botnet activity, click **Configuration** on the right side of the **Botnet** page and complete the following fields. After configuring the report, you can run it on demand or schedule it to run daily (see [Monitor > PDF Reports > Manage PDF Summary](monitor-pdf-reports-manage-pdf-summary.html#ID0EXSFO)).

 Note:



| | The default Botnet report configuration is optimal. If you believe the default values identify false positives, create a support ticket so Palo Alto Networks can reevaluate the values. |
| --- | --- |





| Botnet Configuration Settings | Description |
| --- | --- |
| HTTP Traffic | **Enable** and define the **Count** for each type of HTTP Traffic that the report will include. The **Count** values you enter are the minimum number of events of each traffic type that must occur for the report to list the associated host with a higher confidence score (higher likelihood of botnet infection). If the number of events is less than the **Count**, the report will display the lower confidence score or (for certain traffic types) won’t display an entry for the host. • |






| • | **Use of dynamic DNS** (range is 2–1000; default is 5)—Looks for dynamic DNS query traffic that might indicate malware, botnet communications, or exploit kits. Generally, using dynamic DNS domains is very risky. Malware often uses dynamic DNS to avoid IP address block lists. Consider blocking such traffic with [URL filtering](https://docs.paloaltonetworks.com/advanced-url-filtering). |
| --- | --- |






| • | **Browsing to IP domains** (range is 2–1000; default is 10)—Identifies users who browse to IP domains instead of URLs. |
| --- | --- |






| • | **Browsing to recently registered domains** (range is 2–1000; default is 5)—Looks for traffic to domains that were registered within the past 30 days. Attackers, malware, and exploit kits often use newly registered domains. |
| --- | --- |






| • | **Executable files from unknown sites** (range is 2–1000; default is 5)—Identifies executable files downloaded from unknown URLs. Executable files are a part of many infections and, when combined with other types of suspicious traffic, can help you prioritize host investigations. |
| --- | --- |







 Unknown Applications


 Define the thresholds that determine whether the report will include traffic associated with suspicious Unknown TCP or Unknown UDP applications.



| • | **Sessions Per Hour** (range is 1–3600; default is 10)—The report includes traffic that involves up to the specified number of application sessions per hour. |
| --- | --- |






| • | **Destinations Per Hour** (range is 1–3600; default is 10)—The report includes traffic that involves up to the specified number of application destinations per hour. |
| --- | --- |






| • | **Minimum Bytes** (range is 1–200; default is 50)—The report includes traffic for which the application payload equals or exceeds the specified size. |
| --- | --- |






| • | **Maximum Bytes** (range is 1–200; default is 100)—The report includes traffic for which the application payload is equal to or less than the specified size. |
| --- | --- |







 IRC


 Select this option to include traffic involving IRC servers.



 Parent topic
 [Monitor > Botnet](monitor-botnet.html#ID0EQRCO)