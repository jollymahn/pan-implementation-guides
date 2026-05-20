# Monitor > External Logs

*Monitor : Monitor &gt; External Logs*

## Monitor > External Logs


Use this page to view logs ingested from the Traps™ Endpoint Security Manager (ESM) into Log Collectors that are managed by Panorama™. To view Traps ESM logs on Panorama, do the following:




| • | On the [Traps ESM server](https://docs.paloaltonetworks.com/traps/3-4/traps-endpoint-security-manager-admin/reports-and-logging/forward-logs-to-an-external-logging-platform/enable-log-forwarding-to-an-external-logging-platform), configure Panorama as a Syslog server and select the logging events to forward to Panorama. The events can include security events, policy changes, agent and ESM Server status changes, and changes to configuration settings. |
| --- | --- |






| • | On a Panorama that is deployed in Panorama mode with one or more Managed Log Collectors, set up a log ingestion profile ([Panorama > Log Ingestion Profile](panorama-log-ingestion-profile.html#ID0EOM33)) and attach the profile to a Collector Group ([Panorama > Collector Groups](panorama-collector-groups.html#ID0EJRT3)) in which to store the Traps ESM logs. |
| --- | --- |




External logs are not associated with a device group and are visible only when you select **Device Group**: **All** because the logs are not forwarded from firewalls.



| Log Type | Description |
| --- | --- |
| **Monitor** > **External Logs** > **Traps ESM** > **Threat** | These threat events include all prevention, notification, provisional, and post-detection events that are reported by the Traps agents. |
| **Monitor** > **External Logs** > **Traps ESM** > **System** | ESM Server system events include changes related to ESM status, licenses, ESM Tech Support files, and communication with WildFire. |
| **Monitor** > **External Logs** > **Traps ESM** > **Policy** | Policy change events include changes to rules, protection levels, content updates, hash control logs, and verdicts. |
| **Monitor** > **External Logs** > **Traps ESM** > **Agent** | Agent change events occur on the endpoint and include changes to content updates, licenses, software, connection status, one-time action rules, processes and services, and quarantined files. |
| **Monitor** > **External Logs** > **Traps ESM** > **Config** | ESM configuration change events include system-wide changes to licensing, administrative users and roles, processes, restriction settings, and conditions. |



Panorama can correlate discrete security events on the endpoints with events on the network to trace any suspicious or malicious activity between the endpoints and the firewall. To view correlated events that Panorama identifies, see [Monitor > Automated Correlation Engine > Correlated Events](monitor-automated-correlation-engine-correlated-events.html#ID0EIHLM).

 Parent topic
 [Monitor](monitor.html#ID0EVEGM)