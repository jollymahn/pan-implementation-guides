# Device > Setup > Content-ID

*Device : Device &gt; Setup &gt; Content-ID*

## Device > Setup > Content-ID


Use the **Content-ID**™ tab to define settings for URL filtering, data protection, and container pages.



| Content-ID Settings | Description |
| --- | --- |
| URL Filtering | |
| URL Continue Timeout | Specify the interval following a user's **Continue** action before the user must press continue again for URLs in the same category (range is 1 to 86,400 minutes; default is 15). |
| URL Admin Override Timeout | Specify the interval after the user enters the **Admin Override** password before the user must re-enter that password for URLs in the same category (range is 1 to 86,400 minutes; default is 15). |
| Hold Client Request for Category Lookup | Enable this option to specify that when the firewall cannot find category information for a URL in its local cache, it holds the web request as it queries PAN-DB. Fastpath:  This option is disabled by default. Enable it as part of a [best practice URL Filtering profile](https://docs.paloaltonetworks.com/best-practices/internet-gateway-best-practices/best-practice-internet-gateway-security-policy/create-best-practice-security-profiles.html#id17A29C0201H). |
| Append Trailing Slash | Enable the firewall to append a trailing slash (/) to domain entries (for example, paloaltonetworks.com) in custom URL categories and external dynamic lists of URL List type that do not end in a trailing slash or asterisk wildcard (*). The trailing slash limits the URLs that the firewall considers a match to the entry and on which it can enforce URL filtering policy rules. • |






| • | For domain entries with wildcards, the trailing slash limits matches to URLs that conform to the specified pattern. |
| --- | --- |



 [URL Category Exceptions](https://docs.paloaltonetworks.com/advanced-url-filtering/administration/configuring-url-filtering/url-category-exceptions.html) describes the trailing slash in more detail and includes URL list formatting guidelines.
 Note:



| | This option is enabled by default. |
| --- | --- |







 Category Lookup Timeout (sec)


 Specify the amount of time, in seconds, that the firewall will try to look up the category for a URL before determining that the category is not-resolved (range is 1 to 60 seconds; default is 2).




 URL Admin Lockout Timeout


 Specify the period of time that a user is locked out from attempting to use the URL Admin Override password after three unsuccessful attempts (range is 1 to 86,400 minutes; default is 30).




 PAN-DB Server
 (`Required for connecting to a private PAN-DB server`)


 Specify the IPv4 address, IPv6 address, or FQDN for the private PAN-DB servers on your network. You can add up to 20 entries.
 The firewall connects to the public PAN-DB cloud by default. The private PAN-DB solution is for enterprises that do not allow firewalls to directly access the PAN-DB servers in the public cloud. The firewalls access the servers included in this PAN-DB server list for the URL database, URL updates, and URL lookups for categorizing web pages.




 URL Admin Override




 Settings for URL Admin Override


 For each virtual system that you want to configure for URL admin override, **Add** and specify the settings that apply when a URL Filtering profile blocks a page and the **Override** action is specified. For details, see [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR).



| • | **Location**—(`multi-vsys firewalls only`) Select the virtual system from the drop-down. |
| --- | --- |






| • | **Password/Confirm Password**—Enter the password that the user must enter to override the block page. |
| --- | --- |






| • | **SSL/TLS Service Profile**—To specify a certificate and the allowed TLS protocol versions for securing communications when redirecting through the specified server, select an SSL/TLS Service profile. For details, see [Device > Certificate Management > SSL/TLS Service Profile](device-certificate-management-ssltls-service-profile.html#ID0E3TCZ). |
| --- | --- |






| • | **Mode**—Determines whether the block page is delivered transparently (it appears to originate at the blocked website) or redirects the user to the specified server. If you choose **Redirect**, then enter the IP address for redirection. |
| --- | --- |



 You can also **Delete** an entry.




 HTTP/2 Settings




 Connection Logging


 Enables the firewall to log HTTP/2 connection sessions as tunnel inspection log entries.




 Content Cloud Settings




 Service URL


 The Cloud-Delivered Security Services server URL.
 Various Palo Alto Networks cloud-based services operating on the NGFW use the specified FQDN to facilitate service requests. The default FQDN connects to [hawkeye.services-edge.paloaltonetworks.com](http://hawkeye.services-edge.paloaltonetworks.com/) and then resolves to the nearest cloud services server. You can override the automatic server selection by specifying a regional content cloud server that best meets your data residency and performance requirements. Keep in mind, the content cloud FQDN is a globally used resource and affects how other services that rely on this connection sends traffic payloads.
 Refer to the documentation for specific products for more information on available regional cloud content server options.




 URL Inline Cloud Categorization




 Max Latency (sec)


 Specify the maximum acceptable processing time, in seconds, for Inline Cloud Categorization to return a result.




 Allow on Max Latency


 Enables the firewall to take the action of allow, when the maximum latency is reached. De-selecting this option sets the firewall action to block.




 Log Traffic Not Scanned


 Enables the firewall to log URL categorization requests that exhibit the presence of certain advanced webpage threats, but have not been processed by Inline Cloud Categorization.




 WildFire Inline Cloud Analysis




 Max Latency (ms)


 Specify the maximum acceptable processing time, in milliseconds, for Advanced WildFire Inline Cloud Analysis to return a result. The range is 1 to 240,000 ms; the default is 30,000 ms.




 Allow on Max Latency


 Enables the firewall to take the action of allow, when the maximum latency is reached. De-selecting this option sets the firewall action to block.




 Log Traffic Not Scanned


 Enables the firewall to log Advanced WildFire Inline Cloud Analysis requests that exhibit the appearance of malware, but have not yet been processed.




 Content-ID Settings




 Allow Forwarding of Decrypted Content


 Enable this option to configure the firewall to forward decrypted content to an outside service when port mirroring or sending WildFire® files for analysis.
 Fastpath:
 Enable this option and send all unknown files in decrypted traffic to WildFire for analysis.
 For a firewall with multiple virtual system (multi-vsys) capability, you enable this option individually for each virtual system. Select **Device** > **Virtual Systems** and select the virtual system on which you want to enable forwarding of decrypted content. This option is available in the Virtual System dialog.




 Extended Packet Capture Length


 Set the number of packets to capture when the extended-capture option is enabled in Anti-Spyware and Vulnerability Protection profiles (range is 1 to 50; default is 5).




 Forward Segments Exceeding TCP App-ID™ Inspection Queue


 Enable this option to forward segments and classify an application as unknown-tcp when the App-ID queue exceeds the 64-segment limit. Use the following global counter to view the number of segments exceeding the queue limit, regardless of whether you enabled or disabled this option:
 appid_exceed_queue_limit
 Disable this option to prevent the firewall from forwarding TCP segments and skipping App-ID inspection when the App-ID inspection queue is full.
 Fastpath:
 This option is disabled by default and should remain disabled for maximum security.
 Note:



| | When you disable this option, you may notice increased latency on streams where more than 64 segments await App-ID processing. |
| --- | --- |







 Forward Segments Exceeding TCP Content Inspection Queue


 Enable this option to forward TCP segments and skip content inspection when the TCP content inspection queue is full. The firewall can queue up to 64 segments while waiting for the content engine. When the firewall forwards a segment and skips content inspection due to a full content inspection queue, it increments the following global counter:
 ctd_exceed_queue_limit
 Disable this option to prevent the firewall from forwarding TCP segments and skipping content inspection when the content inspection queue is full. When you disable this option, the firewall drops any segments that exceed the queue limit and increments the following global counter:
 ctd_exceed_queue_limit_drop
 This pair of global counters applies to both TCP and UDP packets. If, after viewing the global counters, you decide to change the setting, you can modify it from within your CLI using the following command:
 set**deviceconfig setting ctd tcp-bypass-exceed-queue**
 Fastpath:
 This option is enabled by default, but Palo Alto Networks recommends that you disable this option for maximum security. However, due to TCP retransmissions for dropped traffic, disabling this option can result in performance degradation and loss of functionality for some applications—particularly in high-volume traffic environments.




 Forward Datagrams Exceeding UDP Content Inspection Queue


 Enable this option to forward UDP datagrams and skip content inspection when the UDP content inspection queue is full. The firewall can queue up to 64 datagrams while waiting for a response from the content engine. When the firewall forwards a datagram and skips content inspection due to a UDP content inspection queue overflow, it increments the following global counter:
 ctd_exceed_queue_limit
 Disable this option to prevent the firewall from forwarding datagrams and skipping content inspection when the UDP content inspection queue is full. With this option disabled, the firewall drops any datagrams that exceed the queue limit and increments the following global counter:
 ctd_exceed_queue_limit_drop
 This pair of global counters applies to both TCP and UDP packets. If, after viewing the global counters, you decide to change the setting, you can modify it from within the CLI using the following command:
 set**deviceconfig setting ctd udp-bypass-exceed-queue**
 Fastpath:
 This option is enabled by default, but Palo Alto Networks recommends that you disable this option for maximum security. However, due to dropped packets, disabling this option can result in performance degradation and loss of functionality for some applications—particularly in high-volume traffic environments.




 Allow HTTP partial response


 Enable this HTTP partial response option to enable a client to fetch only part of a file. When a next-generation firewall in the path of a transfer identifies and drops a malicious file, it terminates the TCP session with an RST packet. If the web browser implements the HTTP Range option, it can start a new session to fetch only the remaining part of the file. This prevents the firewall from triggering the same signature again due to the lack of context into the initial session while, at the same time, allows the web browser to reassemble the file and deliver the malicious content; to prevent this, make sure to disable this option.
 Fastpath:
 **Allow HTTP partial response** is enabled on the firewall by default. This provides maximum availability but increases the risk of a successful cyberattack. For maximum security, disable this option to prevent the web browser from starting a new session to fetch the rest of a file after the firewall terminates the original session due to malicious activity. Disabling HTTP partial response affects HTTP-based data transfers which use the RANGE header, which may cause service anomalies for certain applications. After you disable HTTP partial response, validate the operation of your business-critical applications.
 If you experience HTTP data transfer disruption on a business-critical application, you can create an Application Override policy for that specific application. Because Application Override bypasses App-ID (including threat and content inspection), create an Application Override policy for only the specific business-critical application, and specify sources and destinations to limit the rule (principle of least privilege access). Do not create Application Override policy unless you must. For information about Application Override policies, refer to [https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClVLCA0](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClVLCA0).




 Real-Time Signature Lookup




 DNS Signature Lookup Timeout (ms)


 Specify the duration of time, in milliseconds, for the firewall to query the DNS Security service. If the cloud does not respond before the end of the specified period, the firewall releases the associated DNS response to the requesting client (range is 0 to 60,000; default is 100).




 Hold for WildFire Real Time Signature Look Up


 Enables the option to use WildFire real time signature lookup hold mode on a per-antivirus profile basis.
 Note:**This option alone does not enable WildFire real time signature lookup hold mode; you must additionally enable **Hold for WildFire Real Time Signature Look Up** within a specific antivirus security profile.




 WildFire Real Time Signature Lookup Timeout (ms)


 Specify the duration of time, in milliseconds, for the firewall to query the real time signature cloud for real time signature lookups. If the real time signature cloud does not respond before the end of the specified period, the firewall applies the user-specified Action On Real Time WildFire Signature Timeout** to the requesting client (range is 1000 to 5000; default is 1000).




 Action On Real Time WildFire Signature Timeout


 Specify the action to take when the signature lookup exceeds the configured **WildFire Real Time Signature Lookup Timeout** setting:



| • | **Allow**—The packets are released and the file continues transmission to the client. |
| --- | --- |






| • | **Reset Both**—Resets the connection on both client and server ends. |
| --- | --- |







 X-Forwarded-For Headers




 Use X-Forwarded-For Header


 Note:



| | You cannot enable X-Forwarded-For for User-ID and Security Policy at the same time. |
| --- | --- |






| • | **Disabled**—When disabled, the firewall does not read the IP addresses from X-Forwarded-For (XFF) header in client requests. |
| --- | --- |






| • | **Enable for User-ID**—Enable this option to specify that User-ID reads IP addresses from the X-Forwarded-For (XFF) header in client requests for web services when the firewall is deployed between the internet and a proxy server that would otherwise hide client IP addresses. User-ID matches the IP addresses it reads with usernames that your policies reference so that those policies can control and log access for the associated users and groups. If the header has multiple IP addresses, User-ID uses the first entry from the left. |
| --- | --- |



 In some cases, the header value is a character string instead of an IP address. If the string matches a username that User-ID mapped to an IP address, the firewall uses that username for group mapping references in policies. If no IP address-mapping exists for the string, the firewall invokes the policy rules in which the source user is set to **any** or **unknown**.
 URL Filtering logs display the matched usernames in the Source User field. If User-ID cannot perform the matching or is not enabled for the zone associated with the IP address, the Source User field displays the XFF IP address with the prefix x-fwd-for.
 Fastpath:
 Enable using the XFF header in User-ID so that the original client IP address appears in the logs to help you investigate issues.



| • | **Enable for Security Policy**—Enable this option to specify that the firewall reads the IP addresses from the X-Forwarded-For (XFF) header in client requests for web services when an upstream device, such as proxy server or load balancer, is deployed between the client and the firewall. The proxy server or load balancer IP address replaces the client IP address as the request source IP. The firewall can then use the IP addresses in the XFF header to enforce policy. |
| --- | --- |



 Note:



| | The firewall uses the IP address most recently added to the XFF field. If the request passes through multiple upstream devices, the firewall applies policy based on whichever IP address was added last. |
| --- | --- |







 Strip-X-Forwarded-For Header


 Enable this option to remove the X-Forwarded-For (XFF) header, which contains the IP address of a client requesting a web service when the firewall is deployed between the internet and a proxy server. The firewall zeroes out the header value before forwarding the request: the forwarded packets don’t contain internal source IP information.
 Note:



| | Enabling this option does not disable the use of XFF headers for user attribution in policies; the firewall zeroes out the XFF value only after using it for user attribution. |
| --- | --- |



 Fastpath:
 When you enable the use of XFF headers in User-ID, also enable stripping the XFF header before forwarding the packet to protect user privacy without losing the ability to track users. Enabling both options allows you to log and track original user IP addresses while at the same time protecting user privacy by not forwarding their original IP address.




 Content-ID Features




 Manage Data Protection


 Add additional protection for access to logs that may contain sensitive information, such as credit card or social security numbers.
 Click **Manage Data Protection** to perform the following tasks:



| • | **Set Password**—If one is not configured, enter and confirm a new password. |
| --- | --- |






| • | **Change Password**—Enter the old password and enter and confirm the new password. |
| --- | --- |






| • | **Delete Password**—Deletes the password and the data that was protected. |
| --- | --- |







 Container Pages


 Use these settings to specify the types of URLs that the firewall tracks or logs based on content type, such as application/pdf, application/soap+xml, application/xhtml+, text/html, text/plain, and text/xml. Container pages are set per virtual system, which you select from the **Location** drop-down. If a virtual system does not have an explicit container page defined, the firewall uses the default content types.
 **Add** and enter a content type or select an existing content type.
 Adding new content types for a virtual system overrides the default list of content types. If there are no content types associated with a virtual system, the default list of content types is used.




 Threat Prevention Inline Cloud Analysis




 Max Latency (ms)


 Specify the maximum processing time, in milliseconds, for Advanced Threat Prevention Inline Cloud Analysis to return a result.




 Allow on Max Latency


 Enables the firewall to take the action of allow, when the maximum latency is reached. De-selecting this option sets the firewall action to block.




 Log Traffic Not Scanned


 Enables the firewall to log traffic requests that exhibit anomalous traits indicating the presence of advanced and evasive command-and-control (C2) threats, but have not been processed by Threat Prevention Inline Cloud analyzers.




 Advanced DNS Security




 Max Latency (ms)


 Specify the maximum processing time, in milliseconds, for Advanced DNS Security to return a result. The range is 0 to 15,000 ms; the default is 100 ms.
 Note:



| | If the Advanced DNS Security cloud does not respond before the end of the specified period, the firewall releases the associated DNS response to the requesting client. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)