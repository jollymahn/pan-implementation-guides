# Panorama > Log Ingestion Profile

*Panorama Web Interface : Panorama &gt; Log Ingestion Profile*

## Panorama > Log Ingestion Profile


Use the log ingestion profile to enable Panorama to receive logs from external sources. In PAN-OS 8.0.0, Panorama (in Panorama mode) can serve as a Syslog receiver that can ingest logs from the Traps ESM server using Syslog. Support for new external log sources and the updates for newer Traps ESM versions will be pushed through content updates.


To enable log ingestion, you must configure Panorama as a Syslog receiver on the Traps ESM server, define a log ingestion profile on Panorama and attach the log ingestion profile to a Log Collector group.


To add a new external Syslog ingestion profile, **Add** a profile and configure the settings as described in the following table.



| Field | Description |
| --- | --- |
| Name | Enter the name for the external Syslog ingestion profile. You can add up to 255 profiles. |
| Source Name | Enter the name or IP address of the external sources that will send logs. You can add up to 4 sources within a profile. |
| Port | Enter the port on which Panorama will be accessible over the network and will use to communicate and listen on. For Traps ESM, select a value between the range of 23000-23999. You must configure the same port number on the Traps ESM to enable communication between Panorama and the ESM. |
| Transport | Select TCP, UDP or SSL. If you select SSL, you must configure an inbound certificate for secure syslog communication in [Panorama > Managed Collectors > General](general-log-collector-settings.html#ID0EI6P3). |
| External Log Type | Select the log type from the drop-down. |
| Version | Select the version from the drop-down. |



Use [Monitor > External Logs](monitor-external-logs.html#ID0EE3JM) to view information on the logs ingested from the Traps ESM server in to Panorama.

 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)