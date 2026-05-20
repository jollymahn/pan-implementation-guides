# DNS Proxy Settings

*Network : Network &gt; DNS Proxy : DNS Proxy Settings*

DNS Proxy Settings

Click **Add** and configure the firewall to act as a DNS proxy. You can configure a maximum of 256 DNS proxies on a firewall.



| DNS Proxy Settings | Configured In | Description |
| --- | --- | --- |
| Enable | **DNS Proxy** | Select to enable this DNS proxy. |
| Name | Specify a name to identify the DNS proxy object (up to **31** characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. | |
| Location | Specify the virtual system to which the DNS proxy object applies: • | **Shared**: Proxy applies to all virtual systems. If you choose **Shared**, the **Server Profile** field is not available. Instead, enter the **Primary** and **Secondary** DNS server IP addresses or address objects. |






| • | Select a virtual system to use this DNS proxy; you must configure a virtual system first. Select **Device** > **Virtual Systems**, select a virtual system, and select a **DNS Proxy**. |
| --- | --- |







 Inheritance Source
 (`Shared location only`)


 Select a source from which to inherit default DNS server settings. This is commonly used in branch office deployments where the firewall's WAN interface is addressed by DHCP or PPPoE.




 Check inheritance source status
 (`Shared location only`)


 Select to see the server settings that are currently assigned to the DHCP client and PPPoE client interfaces. These may include DNS, WINS, NTP, POP3, SMTP, or DNS suffix.




 Primary/Secondary
 (`Shared location only`)


 Specify the IP addresses of the default primary and secondary DNS servers to which this firewall (as DNS proxy) sends DNS queries. If the primary DNS server cannot be found, the firewall uses the secondary DNS server.




 Server Profile
 (`Virtual System location only`)


 Select or create a new DNS server profile. This field does not appear if the Location of virtual systems was specified as Shared.




 Interface


 **Add** an interface to function as a DNS proxy. You can add multiple interfaces. To remove the DNS proxy from an interface, select and **Delete** it.
 An interface is not required if the DNS Proxy is used only for service route functionality. Use a destination service route with a DNS proxy with no interface if you want the destination service route to set the source IP address. Otherwise, the DNS proxy selects an interface IP address to use as a source (when no DNS service routes are set).




 Name


 **DNS Proxy** > **DNS Proxy Rules**


 A name is required so that an entry can be referenced and modified via the CLI.




 Turn on caching of domains resolved by this mapping


 Select to enable caching of domains that are resolved by this mapping.




 Domain Name


 **Add** one or more domain names to which the firewall compares incoming FQDNs. If the FQDN matches one of the domains in the rule, the firewall forwards the query to the Primary/Secondary DNS server specified for this proxy. To delete a domain name from the rule, select it and click **Delete**.




 DNS Server Profile
 (`Shared location only`)


 Select or add a DNS server profile to define DNS settings for the virtual system, including the primary and secondary DNS server to which the firewall sends domain name queries.




 Primary/Secondary
 (`Virtual System location only`)


 Enter the hostname or IP address of the primary and secondary DNS servers to which the firewall sends matching domain name queries.




 Name


 **DNS Proxy** > **Static Entries**


 Enter a name for the static entry.




 FQDN


 Enter the Fully Qualified Domain Name (FQDN) to map to the static IP addresses defined in the Address field.




 Address


 **Add** one or more IP addresses that map to this domain. The firewall includes all of these addresses in its DNS response, and the client chooses which IP address to use. To delete an address, select the address and click **Delete**.




 (`PAN-OS 11.2.1 and later releases`) Enable Encrypted DNS


 **DNS Proxy** > **Encrypted DNS**


 Encrypted DNS increases user privacy and security for DNS traffic between a client and server by preventing man-in-the-middle attacks. Enable the DNS proxy to accept one or more types of encrypted DNS queries from DNS clients, and to use a single type of encrypted DNS on the proxy's communications with the DNS server.




 (`PAN-OS 11.2.1 and later releases`) Connection Type


 For Server Settings, select the single type of encrypted DNS connection that the DNS proxy uses when connecting to the DNS server:



| • | **DoH**—DNS over HTTPS (Hypertext Transfer Protocol Secure). DoH uses port 443. No other HTTPS services are allowed on the interface that is acting as a DNS proxy. An SSL decryption policy must be configured from the DNS client to DNS server so that the DNS proxy can decrypt DoH traffic. |
| --- | --- |






| • | **DoT**—DNS over TLS (Transport Layer Security). DoT uses port 853, which is dedicated to DoT traffic. No other TLS services are allowed on the interface that is acting as a DNS proxy. |
| --- | --- |






| • | **Origin**—DNS proxy sends all DNS requests to the primary DNS server using the same DNS type as that originally received from the client. If the DNS proxy receives no DNS response from the primary DNS server within the TCP timeout period, the DNS proxy sends the DNS request to the secondary DNS server. |
| --- | --- |






| • | **Cleartext**—Plain, unencrypted DNS; no encrypted DNS when the DNS proxy connects to the DNS server. |
| --- | --- |



 A primary DNS address is required, regardless of the connection type.




 (`PAN-OS 11.2.1 and later releases`) Fallback on Unencrypted DNS


 For Server Settings, if the DNS server rejects encrypted DNS or times out (the DNS proxy receives no response from the primary server and secondary server within the configured TCP timeout period), the connection falls back to traditional, unencrypted DNS.




 (`PAN-OS 11.2.1 and later releases`) TCP Timeout (sec)


 For Server Settings, the length of time, in seconds, by which the primary DNS server must respond before the DNS query goes to the secondary DNS server, and the length of time by which the secondary DNS server must respond before the DNS query falls back to cleartext DNS communications. Range is 1 to 10; default is 1.




 (`PAN-OS 11.2.1 and later releases`) Allowed DNS Types


 For Client Settings, select one or more allowed DNS types that the DNS proxy will accept from the client:



| • | **DoH**—DNS proxy must decrypt DoH traffic and proxy DNS as specified for Server Settings. |
| --- | --- |






| • | **DoT**—DNS proxy must decrypt DoT traffic and proxy DNS as specified for Server Settings. |
| --- | --- |






| • | **Cleartext**—DNS proxy must proxy DNS as specified for Server Settings. |
| --- | --- |







 (`PAN-OS 11.2.1 and later releases`) SSL/TLS Service Profile


 For Client Settings, select an SSL/TLS service profile or create a new SSL/TLS service profile to use for DNS encryption between the client and DNS proxy, or select **None**.




 TCP Queries


 **DNS Proxy** > **Advanced**


 Select to enable DNS queries using TCP. Specify the maximum number of concurrent pending TCP DNS requests (**Max Pending Requests**) that the firewall will support (range is 64 to 256; default is 64).




 UDP Queries Retries


 **DNS Proxy** > **Advanced**


 Specify settings for UDP query retries:



| • | **Interval**—Time, in seconds, after which the DNS proxy sends another request if it hasn’t received a response (range is 1 to 30; default is 2). |
| --- | --- |






| • | **Attempts**—Maximum number of attempts (excluding the first attempt) after which the DNSP tries the next DNS server (range is 1 to 30; default is 5). |
| --- | --- |







 Cache


 **DNS Proxy** > **Advanced**


 You must have **Cache** enabled (enabled by default) if this DNS proxy object is used for queries that the firewall generates (that is, under **Device** > **Setup** > **Services** > **DNS**, or under **Device** > **Virtual Systems** and you select a virtual system and **General** > **DNS Proxy**). Then specify the following:



| • | **Enable TTL**—Limit the length of time the firewall caches DNS entries for the proxy object. TTL is disabled by default. Then enter **Time to Live (sec)**—the number of seconds after which all cached entries for the proxy object are removed and new DNS requests must be resolved and cached again. Range is 60 to 86,400. There is no default TTL; entries remain until the firewall runs out of cache memory. |
| --- | --- |






| • | **Cache EDNS Responses**—You must enable Cache Extension Mechanisms for DNS (EDNS) Responses if this DNS proxy object is used for queries that the firewall generates. The firewall must be able to cache DNS responses in order for the queries for FQDN address objects to succeed. |
| --- | --- |






 Parent topic
 [Network > DNS Proxy](network-dns-proxy.html#ID0E5LUV)