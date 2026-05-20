# Monitor > Automated Correlation Engine > Correlation Objects

*Monitor : Monitor &gt; Automated Correlation Engine : Monitor &gt; Automated Correlation Engine &gt; Correlation Objects*

Monitor > Automated Correlation Engine > Correlation Objects

To counter the advances in exploits and malware distribution methods, correlation objects extend the signature-based malware detection capabilities on the firewall. They provide the intelligence for identifying suspicious behavior patterns across different sets of logs and they gather the evidence required to investigate and promptly respond to an event.


A correlation object is a definition file that specifies patterns for matching, the data sources to use for performing the lookups, and the time period within which to look for these patterns. A pattern is a boolean structure of conditions that query the data sources, and each pattern is assigned a severity and a threshold, which is number of time the pattern match occurs within a defined time limit. When a pattern match occurs, a correlation event is logged.


The data sources used for performing lookups can include the following logs: application statistics, traffic, traffic summary, threat summary, threat, data filtering, and URL filtering. For example, the definition for a correlation object can include a set of patterns that query the logs for evidence of infected hosts, evidence of malware patterns, or for lateral movement of malware in the traffic, url filtering, and threat logs.


Correlation objects are defined by Palo Alto Networks® and are packaged with content updates. You must have a valid threat prevention license to get content updates.


By default, all correlation objects are enabled. To disable an object, select the object and **Disable** it.



| Correlation Object Fields | Description |
| --- | --- |
| Name and Title | The label indicates the type of activity that the correlation object detects. |
| ID | A unique number identifies the correlation object. This number is in the 6000 series. |
| Category | A summary of the kind of threat or harm posed to the network, user, or host. |
| State | The state indicates whether the correlation object is enabled (active) or disabled (inactive). |
| Description | The description specifies the match conditions for which the firewall or Panorama will analyze logs. It describes the escalation pattern or progression path that will be used to identify malicious activity or suspicious host behavior. |


 Parent topic
 [Monitor > Automated Correlation Engine](monitor-automated-correlation-engine.html#ID0ESMKM)