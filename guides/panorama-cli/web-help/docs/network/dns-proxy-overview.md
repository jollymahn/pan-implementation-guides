# DNS Proxy Overview

*Network : Network &gt; DNS Proxy : DNS Proxy Overview*

DNS Proxy Overview

You can configure the firewall to act as a DNS server. First, create a DNS proxy and select the interfaces to which the proxy applies. Then specify the default DNS primary and secondary servers to which the firewall sends the DNS queries when it doesn’t find the domain name in its DNS proxy cache (and when the domain name doesn’t match a proxy rule).


To direct DNS queries to different DNS servers based on domain names, create DNS proxy rules. Specifying multiple DNS servers can ensure localization of DNS queries and increase efficiency. For example, you can forward all corporate DNS queries to a corporate DNS server and forward all other queries to ISP DNS servers.


Use the following tabs to define a DNS proxy (beyond the default DNS primary and secondary servers). The fields on each tab are described in [DNS Proxy Settings](dns-proxy-settings.html#ID0EGAVV).




| • | **Static Entries**—Allows you to configure static FQDN-to-IP address mappings that the firewall caches and sends to hosts in response to DNS queries. |
| --- | --- |






| • | **DNS Proxy Rules**—Allows you to specify domain names and corresponding primary and secondary DNS servers to resolve queries that match the rule. If the domain name isn’t in the DNS proxy cache, the firewall searches for a match in the DNS proxy (on the interface on which the query arrived), and forwards the query to a DNS server based on the match results. If no match results, the firewall sends the query to the default DNS primary and secondary servers. You can enable caching of domains that match the rule. |
| --- | --- |






| • | (`PAN-OS 11.2.1 and later releases`) **Encrypted DNS**—Allows you to have the DNS proxy use encrypted DNS for the management interface and for the communications coming from DNS clients and going to DNS servers. |
| --- | --- |






| • | **Advanced**—You must enable caching (select **Cache**) and **Cache EDNS Responses** if the DNS proxy object will be used to resolve DNS/FQDN queries that the firewall generates. The Advanced tab also allows you to control TCP queries and UDP Query Retries. The firewall sends TCP or UDP DNS queries through the configured interface. UDP queries switch over to TCP when a DNS query response is too long for a single UDP packet. |
| --- | --- |



 Parent topic
 [Network > DNS Proxy](network-dns-proxy.html#ID0E5LUV)