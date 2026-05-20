# General Log Collector Settings

*Panorama Web Interface : Panorama &gt; Managed Collectors : Log Collector Configuration : General Log Collector Settings*

General Log Collector Settings



| • | Panorama > Managed Collectors > General |
| --- | --- |




Configure the settings as described in the following table to identify a Log Collector and define its connections to the Panorama management server, DNS servers, and NTP servers.



| Log Collector General Settings | Description |
| --- | --- |
| Collector S/N | (`Required`) Enter the serial number of the Panorama appliance that functions as the Log Collector. If the Log Collector is local, enter the serial number of the Panorama management server. |
| Collector Name | Enter a name to identify this Log Collector (up to 31 characters). The name is case-sensitive, must be unique, and can contain only letters, numbers, spaces, hyphens, and underscores. This name displays as the Log Collector hostname. |
| Inbound Certificate for Secure Syslog | Select the certificate that the managed collector must use to securely ingest logs from the Traps™ ESM server. This certificate is called an inbound certificate because the Panorama/ Managed Collector is the server to which the Traps ESM (client) is sending logs; the certificate is required if the **Transport** protocol for the log ingestion profile is **SSL**. |
| Certificate for Secure Syslog | Select a certificate for secure forwarding of syslogs to an external Syslog server. The certificate must have the **Certificate for Secure Syslog** option selected (see [Manage Firewall and Panorama Certificates](manage-firewall-and-panorama-certificates.html#ID0E1U5Y)). When you assign a Syslog server profile to the Collector Group that includes this Log Collector (see [Panorama > Collector Groups](panorama-collector-groups.html#ID0EJRT3), **Panorama** > **Collector Groups** > **Collector Log Forwarding**), the **Transport** protocol of the server profile must be **SSL** (see [Device > Server Profiles > Syslog](device-server-profiles-syslog.html#ID0E1PKZ)). |
| Panorama Server IP | Specify the IP address of the Panorama management server that manages this Log Collector. |
| Panorama Server IP 2 | Specify the IP address of the secondary peer if the Panorama management server is deployed in a high availability (HA) configuration. |
| Domain | Enter the domain name of the Log Collector. |
| Primary DNS Server | Enter the IP address of the primary DNS server. The Log Collector uses this server for DNS queries (for example, to find the Panorama management server). |
| Secondary DNS Server | (`Optional`) Enter the IP address a secondary DNS server to use if the primary server is unavailable. |
| Primary NTP Server | Enter the IP address or host name of the primary NTP server, if any. If you do not use NTP servers, you can set the Log Collector time manually. |
| Secondary NTP Server | (`Optional`) Enter the IP address or host name of secondary NTP servers to use if the primary server is unavailable. |
| Timezone | Select the time zone of the Log Collector. |
| Latitude | Enter the latitude (-90.0 to 90.0) of the Log Collector. Traffic and threat maps use the latitude for App Scope. |
| Longitude | Enter the longitude (-180.0 to 180.0) of the Log Collector. Traffic and threat maps use the longitude for App Scope. |


 Parent topic
 [Log Collector Configuration](log-collector-configuration.html#ID0E4JP3)