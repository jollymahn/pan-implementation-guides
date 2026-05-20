# Global Services Settings

*Device : Device &gt; Setup &gt; Services : Global Services Settings*

Global Services Settings



| • | Device > Setup > Services |
| --- | --- |




To control and redirect DNS queries between shared and specific virtual systems, you can use a [DNS proxy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/dns-proxy-object.html) and a [DNS Server profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/configure-a-dns-server-profile.html).



| Global Services Settings | Description |
| --- | --- |
| Services | |
| Update Server | Represents the IP address or host name of the server from which to download updates from Palo Alto Networks. The current value is **updates.paloaltonetworks.com**. Do not change this setting unless instructed by technical support. |
| Verify Update Server Identity | If you enable this option, the firewall or Panorama will verify that the server from which the software or content package is download has an SSL certificate signed by a trusted authority. This adds an additional level of security for the communication between firewalls or Panorama servers and the update server. Fastpath:  Verify the update server identity to validate that the server has an SSL certificate signed by a trusted authority. |
| DNS Settings | Choose the type of DNS service—**Servers** or **DNS Proxy Object**—for all DNS queries that the firewall initiates in support of FQDN address objects, logging, and firewall management. Options include: • |






| • | A DNS proxy configured on the firewall as an alternative to configuring DNS servers. If you enable a DNS proxy, you must enable **Cache** and **EDNS Cache Responses** (**Network** > **DNS Proxy** > **Advanced**). |
| --- | --- |







 Primary DNS Server


 Enter the IP address of the primary DNS server for DNS queries from the firewall. For example, to find the update server, to resolve DNS entries in logs, or resolve FDQN-based address objects.




 Secondary DNS Server


 (`Optional`) Enter the IP address of a secondary DNS server to use if the primary server is unavailable.




 Encrypted DNS Connection Type


 (`PAN-OS 11.2.1 and later releases`) If you chose **Servers**, you can enable [encrypted DNS](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/dns-overview) that occurs between the Management interface and the DNS servers by selecting the type of encrypted DNS:



| • | **DoH**—DNS over HTTPS. |
| --- | --- |






| • | **DoT**—DNS over TLS. |
| --- | --- |



 The default is **None**; no encrypted DNS is enabled on the Management interface for connecting to the DNS servers.




 Fallback on Unencrypted DNS


 (`PAN-OS 11.2.1 and later releases`) If you chose **Servers**, you can enable the connection between the Management interface and the DNS servers to fall back to unencrypted DNS (cleartext) if the primary and secondary DNS servers are unable to respond to the DNS request within the TCP Timeout period.




 TCP Timeout (sec)


 (`PAN-OS 11.2.1 and later releases`) If you chose **Servers** and enabled Fallback on Unencrypted DNS, specify the timeout period before the Management interface falls back to unencrypted DNS connections with its DNS servers.




 Minimum FQDN Refresh Time (sec)


 Set a limit on how fast the firewall refreshes FQDNs that it receives from a DNS. The firewall refreshes an FQDN based on the TTL of the FQDN as long as the TTL is greater than or equal to this **Minimum FQDN Refresh Time** (in seconds). If the TTL is less than this Minimum FQDN Refresh Time, the firewall refreshes the FQDN based on this Minimum FQDN Refresh Time (that is, the firewall does not honor TTLs faster than this setting). The timer starts when the firewall receives a DNS response from the DNS server or DNS proxy object resolving the FQDN (range is 0 to 14,400; default is 30). A setting of 0 means the firewall will refresh the FQDN based on the TTL value in the DNS and does not enforce a minimum FQDN refresh time.
 Fastpath:
 If the TTL for the FQDN in the DNS is short, but FQDN resolutions don’t change as frequently as the TTL timeframe so don’t require a faster refresh, you should set a minimum FQDN Refresh Time to avoid unnecessary FQDN refresh attempts.




 FQDN Stale Entry Timeout (min)


 Specify the length of time (in minutes) that the firewall continues to use stale FQDN resolutions in the event of a network failure or unreachable DNS server —when an FQDN is not getting refreshed (range is 0 to 10,080; default is 1,440). A value of 0 means the firewall does not continue to use a stale entry. If the DNS server is still unreachable at the end of the state timeout, the FQDN entry becomes unresolved (stale resolutions are removed).
 Fastpath:
 Make sure the **FQDN Stale Entry Timeout** value is short enough to not allow incorrect traffic forwarding (which poses a security risk), but is long enough to allow traffic continuity without causing an unplanned network outage.




 Proxy Server section




 Server


 If the firewall needs to use a proxy server to reach Palo Alto Networks update services, enter the IP address or host name of the proxy server.
 Note:



| | A single proxy server can be specified and applies to all Palo Alto Networks update services, including all configured inline cloud and logging services. |
| --- | --- |







 Port


 Enter the port for the proxy server.




 User


 Enter the username for the administrator to enter when accessing the proxy server.




 Password/Confirm Password


 Enter and confirm the password for the administrator to enter when accessing the proxy server.
 Note:



| | The password for the proxy server must be at least six characters in length. |
| --- | --- |







 Use proxy to send logs to Strata Logging Service


 Enable the firewall to send logs to Strata Logging Service through the proxy server.




 Enable proxy for Inline Cloud Services


 Enable firewall connectivity to Palo Alto Networks Advanced CDSS cloud servers through the specified proxy server.




 NTP




 NTP Server Address


 Enter the IP address or hostname of an NTP server that you will use to synchronize the clock on the firewall. Optionally, you can enter the IP address or hostname of a second NTP server to synchronize the clock on the firewall if the primary server becomes unavailable.
 Fastpath:
 When an NTP server keeps all network firewall clocks synchronized, scheduled jobs run as expected and timestamps can help identify the root causes of issues that involve multiple devices. Configure a primary and a secondary NTP server in case the primary NTP server becomes unreachable.




 Authentication Type


 You can enable the firewall to authenticate time updates from an NTP server. For each NTP server, select the type of authentication for the firewall to use:



| • | **None** (default)—Select this option to disable NTP Authentication. |
| --- | --- |






| • | **Symmetric Key**—Select this option for the firewall to use symmetric key exchange (shared secrets) to authenticate time updates from the NTP server. If you select Symmetric Key, continue by specifying the following values: |
| --- | --- |






| ◦ | **Key ID**—Enter the Key ID (1–65534). |
| --- | --- |






| ◦ | **Algorithm**—Select the MD5 or SHA1 algorithm to use for NTP authentication. |
| --- | --- |






| ◦ | **Authentication Key/Confirm Authentication Key**—Enter and confirm the authentication key for the authentication algorithm. |
| --- | --- |






| • | **Autokey**—Select this option for the firewall to use autokey (public key cryptography) to authenticate time updates from the NTP server. |
| --- | --- |



 Fastpath:
 Enable NTP server authentication so that the NTP server approves the client and provides synchronized updates.



 Parent topic
 [Device > Setup > Services](device-setup-services.html#ID0EJYEX)