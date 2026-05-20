# Session Settings

*Device : Device &gt; Setup &gt; Session : Session Settings*

Session Settings

The following table describes session settings.



| Session Settings | Description |
| --- | --- |
| Rematch Sessions | Click **Edit** and select **Rematch Sessions** to cause the firewall to apply newly configured security policy rules to sessions that are already in progress. This capability is enabled by default. If this setting is disabled, any policy rule change applies to only those sessions initiated after the change was committed. For example, if a Telnet session started while an associated policy rule was configured that allowed Telnet, and you subsequently committed a policy rule change to deny Telnet, the firewall applies the revised policy rule to the current session and blocks it. Fastpath:  Enable **Rematch Sessions** to apply your latest Security policy rules to currently active sessions. |
| ICMPv6 Token Bucket Size | Enter the bucket size for rate limiting of ICMPv6 error messages. The token bucket size is a parameter of the token bucket algorithm that controls how bursty the ICMPv6 error packets can be (range is 10 to 65,535 packets; default is 100). |
| ICMPv6 Error Packet Rate | Enter the average number of ICMPv6 error packets per second allowed globally through the firewall (range is 10 to 65,535; default is 100). This value applies to all interfaces. If the firewall reaches the ICMPv6 error packet rate, the ICMPv6 token bucket is used to enable throttling of ICMPv6 error messages. |
| Enable IPv6 Firewalling | To enable firewall capabilities for IPv6 traffic, **Edit** and select **IPv6 Firewalling**. The firewall ignores all IPv6-based configurations if you do not enable IPv6 firewalling. Even if you enable IPv6 traffic on an interface, you must also enable the **IPv6 Firewalling** option for IPv6 firewalling to function. |
| ERSPAN Support | Enable the firewall to terminate Generic Routing Encapsulation (GRE) tunnels and decapsulate Encapsulated Remote Switched Port Analyzer (ERSPAN) data. This is useful for Security services like IoT Security. Network switches mirror network traffic and use ERSPAN to send it to the firewall through GRE tunnels. After decapsulating the data, the firewall inspects it similar to how it inspects traffic received on a TAP port. It then creates enhanced application logs (EALs) and traffic, threat, WildFire, URL, data, GTP (when GTP is enabled), SCTP (when SCTP is enabled), tunnel, auth, and decryption logs. The firewall forwards these logs to the logging service where IoT Security accesses and analyzes the data. |
| Enable Jumbo Frame Global MTU | Select to enable jumbo frame support on Ethernet interfaces. Jumbo frames have a maximum transmission unit (MTU) of 9,192 bytes and are available only on certain models. • |






| • | If you **Enable Jumbo Frame**, the **Global MTU** defaults to 9,192 bytes (range is 9,192 to 9,216 bytes). |
| --- | --- |



 Note:



| | Jumbo frames can take up to five times more memory compared to normal packets and can reduce the number of available packet buffers by 20%. This reduces the queue sizes dedicated for out-of-order, application identification, and other such packet processing tasks. Beginning with PAN-OS 8.1, if you enable the jumbo frame global MTU configuration and reboot your firewall, packet buffers are redistributed to process jumbo frames more efficiently. |
| --- | --- |



 If you enable jumbo frames and you have interfaces where the MTU is not specifically configured, those interfaces automatically inherit the jumbo frame size. Therefore, before you enable jumbo frames, if you have any interface on which you do not want to allow jumbo frames, you must set the MTU for that interface to 1,500 bytes or another value. To configure the MTU for the interface (**Network** > **Interfaces** > **Ethernet**), see [PA-7000 Series Layer 3 Interface](pa-7000-series-layer-3-interface.html#ID0EBQQS).




 DHCP Broadcast Session


 If your firewall is acting as a DHCP server, select this option to enable session logs for DHCP broadcast packets. The DHCP Broadcast Session option enables generation of Enhanced Application Logs (EAL logs) for DHCP for use by IoT Security and other services. If you do not enable this option, the firewall forwards the packets without creating logs for the DHCP broadcast packets.




 L3 & L4 Header Inspection


 Enables Layer3 and Layer4 header inspection. Select this option to write custom threat signatures based on L3 and L4 header fields through the Zone Protection profile to defend against vulnerabilities that are not typically addressed through standard signature updates, such as those present in certain IoT devices.
 Note:



| | You must reboot the firewall for the configuration change to take effect. |
| --- | --- |







 NAT64 IPv6 Minimum Network MTU


 Enter the global MTU for IPv6 translated traffic. The default of 1,280 bytes is based on the standard minimum MTU for IPv6 traffic (range is 1,280 to 9,216).




 NAT Oversubscription Rate


 Select the DIPP NAT oversubscription rate, which is the number of times that the firewall can use the same translated IP address and port pair concurrently. Reducing the oversubscription rate decreases the number of source device translations but will provide higher NAT rule capacities.



| • | **Platform Default**—Explicit configuration of the oversubscription rate is turned off and the default oversubscription rate for the model applies. (See default rates of firewall models at [https://www.paloaltonetworks.com/products/product-selection.html](https://www.paloaltonetworks.com/products/product-selection.html)). |
| --- | --- |






| • | **1x**—1 time. This means no oversubscription; the firewall cannot use the same translated IP address and port pair more than once concurrently. |
| --- | --- |






| • | **2x**—2 times |
| --- | --- |






| • | **4x**—4 times |
| --- | --- |






| • | **8x**—8 times |
| --- | --- |







 ICMP Unreachable Packet Rate (per sec)


 Define the maximum number of ICMP Unreachable responses that the firewall can send per second. This limit is shared by IPv4 and IPv6 packets.
 Default value is 200 messages per second (range is 1 to 65,535).




 Accelerated Aging


 Enables accelerated age-out of idle sessions.
 Select this option to enable accelerated aging and specify the threshold (%) and scaling factor.
 When the session table reaches the **Accelerated Aging Threshold** (% full), PAN-OS applies the **Accelerated Aging Scaling Factor** to the aging calculations for all sessions. The default scaling factor is 2, meaning that accelerated aging occurs at a rate twice as fast as the configured idle time. The configured idle time divided by 2 results in a faster timeout (one-half the time). To calculate the accelerated aging of a session, PAN-OS divides the configured idle time (for that type of session) by the scaling factor to determine a shorter timeout.
 For example, if the scaling factor is 10, a session that would normally time out after 3,600 seconds will time out 10 times faster (in 1/10 of the time), which is 360 seconds.
 Fastpath:
 Enable an accelerated aging threshold and set an acceptable scaling factor to free up session table space faster when the session table begins to fill up.




 Packet Buffer Protection
 (Buffer Based Activation)


 Packet Buffer Protection is enabled by default globally and on each zone. As a best practice, keep packet buffer protection enabled globally and on each zone to protect the firewall buffers from DoS attacks and aggressive sessions and sources. This option protects the receive buffers on the firewall from attacks or abusive traffic that causes system resources to back up and legitimate traffic to get dropped. Packet buffer protection identifies offending sessions, uses Random Early Detection (RED) as a first line of defense, and discards the session or blocks the offending IP address if abuse continues. If the firewall detects many small sessions or rapid session creation (or both) from a particular IP address, it blocks that IP address.
 Take baseline measurements of firewall packet buffer utilization to understand the firewall capacity and ensure that the firewall is properly configured so that only an attack causes a large spike in buffer usage.
 Note:**As of PAN-OS 11.2.5, both buffer based and latency based packet buffer protection can be enabled simultaneously.



| • | **Alert (%)**—When packet buffer utilization exceeds this threshold for more than 10 seconds, the firewall creates a log event every minute. The firewall generates log events when packet buffer protection is enabled globally (range is 0% to 99%; default is 50%). If the value is 0%, the firewall does not create a log event. Start with the default threshold value and adjust as necessary. |
| --- | --- |






| • | Activate (%)**—When this threshold is reached, the firewall begins to mitigate the most abusive sessions (range is 0% to 99%; default is 80%). If the value is 0%, the firewall does not apply RED. Start with the default threshold value and adjust as necessary. |
| --- | --- |






| • | **Block Countdown Threshold (%)**—The buffer utilization percentage that starts the countdown to discard or block offending traffic. When buffer congestion reaches the **Block Countdown Threshold** threshold, **Block Hold Time** begins to decrement. (When the block hold time runs out, the firewall discards sessions or blocks offending hosts.) (default is 80%) |
| --- | --- |






| • | **Block Hold Time (sec)**—The amount of time, in seconds, that the session is allowed to continue before the session is discarded or the source IP address is blocked (range is 0 to 65,535; default is 60). This timer monitors RED-mitigated sessions to see if they are still pushing buffer utilization or latency above the configured threshold. If the abusive behavior continues past the block hold time, the session is discarded. If the value is 0, the firewall does not discard sessions based on packet buffer protection. Start with the default value, monitor packet buffer utilization or latency, and adjust the time value as necessary. |
| --- | --- |






| • | **Block Duration (sec)**—The amount of time, in seconds, that a discarded session remains discarded or a blocked IP address remains blocked (range is 1 to 15,999,999; default is 3,600). Use the default value unless blocking an IP address for one hour is too severe a penalty for your business conditions, in which case you can reduce the duration. Monitor packet buffer utilization or latency and adjust the duration as necessary. |
| --- | --- |



 Note:



| | Network Address Translation (NAT) can increase packet buffer utilization. If this affects the buffer utilization, reduce the Block Hold Time to block individual sessions faster and reduce the Block Duration so other sessions from the underlying IP address aren’t unduly penalized. |
| --- | --- |







 Packet Buffer Protection
 (Latency Based Activation)


 Packet buffer protection that is based on utilization percentages (described above) can instead trigger packet buffer protection based on CPU processing latency by enabling **Buffering Latency Based** and configuring the following settings:
 Note:**As of PAN-OS 11.2.5, both latency based and buffer based packet buffer protection can be enabled simultaneously.



| • | **Latency Alert (milliseconds)**—When latency exceeds this threshold, the firewall starts generating an Alert log event every minute (range is 1 to 20,000; default is 50). |
| --- | --- |






| • | Latency Activate (milliseconds)**—When latency exceeds this threshold, the firewall activates Random Early Detection (RED) on incoming packets and starts generating an Activate log every 10 seconds (range is 1 to 20,000; default is 200). |
| --- | --- |






| • | **Latency Max Tolerate (milliseconds)**—When latency equals or exceeds this threshold, the firewall uses RED with close to 100% drop probability (range is 1 to 20,000ms; default is 500ms). |
| --- | --- |



 If the current latency is a value between the Latency Activate threshold and the Latency Max Tolerate threshold, the firewall calculates the RED drop probability as follows: (current latency - **Latency Activate** threshold) / (**Latency Max Tolerate** threshold - (**Latency Activate** threshold). For example, if the current latency is 300, Latency Activate is 200, and Latency Max Tolerate is 500, then (300-200)/(500-200) = 1/3, meaning the firewall uses approximately 33% RED drop probability.



| • | **Block Countdown Threshold (ms)**—The latency threshold in milliseconds that starts the countdown to discard or block offending traffic. When latency reaches the **Block Countdown Threshold** threshold, **Block Hold Time** begins to decrement. (When the block hold time runs out, the firewall discards sessions or blocks offending hosts.) (default is 1 ms) |
| --- | --- |






| • | **Block Hold Time (sec)**—The amount of time, in seconds, that the session is allowed to continue before the session is discarded or the source IP address is blocked (range is 0 to 65,535; default is 60). This timer monitors RED-mitigated sessions to see if they are still pushing buffer utilization or latency above the configured threshold. If the abusive behavior continues past the block hold time, the session is discarded. If the value is 0, the firewall does not discard sessions based on packet buffer protection. Start with the default value, monitor packet buffer utilization or latency, and adjust the time value as necessary. |
| --- | --- |






| • | **Block Duration (sec)**—The amount of time, in seconds, that a discarded session remains discarded or a blocked IP address remains blocked (range is 1 to 15,999,999; default is 3,600). Use the default value unless blocking an IP address for one hour is too severe a penalty for your business conditions, in which case you can reduce the duration. Monitor packet buffer utilization or latency and adjust the duration as necessary. |
| --- | --- |







 Multicast Route Setup Buffering


 Select this option (disabled by default) to enable multicast route setup buffering, which allows the firewall to preserve the first packet in a multicast session when the multicast route or forwarding information base (FIB) entry does not yet exist for the corresponding multicast group. By default, the firewall does not buffer the first multicast packet in a new session; instead, it uses the first packet to set up the multicast route. This is expected behavior for multicast traffic. You only need to enable multicast route setup buffering if your content servers are directly connected to the firewall and your custom application cannot withstand the first packet in the session being dropped.




 Multicast Route Setup Buffer Size


 If you enable Multicast Route Setup Buffering, you can tune the buffer size, which specifies the buffer size per flow (range is 1 to 2,000; default is 1,000.) The firewall can buffer a maximum of 5,000 packets.



 Parent topic
 [Device > Setup > Session](device-setup-session.html#ID0EBWRX)