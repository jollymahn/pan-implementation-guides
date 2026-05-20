# Flood Protection

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Flood Protection*

Flood Protection



| • | Network > Network Profiles > Zone Protection > Flood Protection |
| --- | --- |




Configure a profile that provides flood protection against SYN, ICMP, ICMPv6, SCTP INIT, and UDP packets, as well as protection against flooding from other types of IP packets. The rates are in connections per second; for example, an incoming SYN packet that doesn’t match an existing session is considered a new connection.



| Zone Protection Profile Settings—Flood Protection | Configured In | Description |
| --- | --- | --- |
| **SYN** | **Network** > **Network Profiles** > **Zone Protection** > **Flood Protection** | Select to enable protection against SYN floods. |
| Action | Select the action to take in response to a SYN flood attack. • | **Random Early Drop**—Causes SYN packets to be dropped to mitigate a flood attack: |






| ◦ | When the flow exceeds the **Alert** rate threshold, an alarm is generated. |
| --- | --- |






| ◦ | When the flow exceeds the **Activate** rate threshold, the firewall drops individual SYN packets randomly to restrict the flow. |
| --- | --- |






| ◦ | When the flow exceeds the **Maximum** rate threshold, 100% of incoming SYN packets are dropped. |
| --- | --- |






| • | **SYN Cookies**—Causes the firewall to act like a proxy, intercept the SYN, generate a cookie on behalf of the server to which the SYN was directed, and send a SYN-ACK with the cookie to the original source. Only when the source returns an ACK with the cookie to the firewall does the firewall consider the source valid and forward the SYN to the server. This is the preferred Action. |
| --- | --- |



 When **SYN Cookies** is activated, the firewall does not honor the TCP options that the server sends because it does not know these values at the time that it proxies the SYN/ACK. Therefore, values such as the TCP server’s window size and MSS values cannot be negotiated during the TCP handshake and the firewall will use its own default values. In the scenario where the MSS of the path to the server is smaller than the firewall’s default MSS value, the packet will need to be fragmented.
 Note:



| | SYN Cookies treats legitimate traffic fairly but consumes more firewall resources than RED. If SYN Cookies consumes too many resources, switch to RED. If you don’t have a dedicated DDoS prevention device in front of the firewall (at the internet perimeter), always use RED. |
| --- | --- |







 Alarm Rate (connections/sec)


 **Network** > **Network Profiles** > **Zone Protection** > **Flood Protection** (cont)


 Enter the number of SYN packets (not matching an existing session) the zone receives per second that triggers an alarm. You can view alarms on the [Dashboard](dashboard.html#ID0E1MBM) and in the threat log ([Monitor > Packet Capture](monitor-packet-capture.html#ID0EJ1LM)). Range is 0 to 2,000,000; default is 10,000.
 Fastpath:
 Set the threshold to 15-20% above the average zone CPS rate to accommodate normal fluctuations and adjust the threshold if you receive too many alarms.




 Activate (connections/sec)


 Enter the number of SYN packets (not matching an existing session) that the zone receives per second that triggers the Action specified in this Zone Protection profile. The firewall uses an algorithm to progressively drop more packets as the attack rate increases, until the rate reaches the Maximum rate. The firewall stops dropping the SYN packets if the incoming rate drops below the Activate threshold. For RED, the range is 1 to 2,000,000 and default is 10,000. For SYN Cookies, the range is 0 to 2,000,000 and default is 0.
 Fastpath:
 Set the threshold just above the zone’s peak CPS rate to avoid throttling legitimate traffic and adjust the threshold as needed.




 Maximum (connections/sec)


 Enter the maximum number of SYN packets (not matching an existing session) that the zone receives per second before packets exceeding the maximum are dropped. Range is 1 to 2,000,000. Default is 40,000 for RED; default is 1,000,000 for SYN Cookies. Crossing this threshold blocks new connections until the CPS rate falls below the threshold.
 Fastpath:
 Set the threshold to 80-90% of firewall capacity, taking into account other features that consume firewall resources.




 **ICMP**


 **Network** > **Network Profiles** > **Zone Protection** > **Flood Protection** (cont)


 Select to enable protection against ICMP floods.




 Alarm Rate (connections/sec)


 Enter the number of ICMP echo requests (pings not matching an existing session) that the zone receives per second that triggers an attack alarm. Range is 0-2,000,000; default is 10,000.
 Fastpath:
 Set the threshold to 15-20% above the average zone CPS rate to accommodate normal fluctuations and adjust the threshold if you receive too many alarms.




 Activate (connections/sec)


 Enter the number of ICMP packets (not matching an existing session) that the zone receives per second before subsequent ICMP packets are dropped. The firewall uses an algorithm to progressively drop more packets as the attack rate increases, until the rate reaches the Maximum rate. The firewall stops dropping the ICMP packets if the incoming rate drops below the Activate threshold. Range is 1 to 2,000,000; default is 10,000.
 Fastpath:
 Set the threshold just above the zone’s peak CPS rate to avoid throttling legitimate traffic and adjust the threshold as needed.




 Maximum (connections/sec)


 Enter the maximum number of ICMP packets (not matching an existing session) that the zone receives per second before packets exceeding the maximum are dropped. Range is 1 to 2,000,000; default is 40,000.
 Fastpath:
 Set the threshold to 80-90% of firewall capacity, taking into account other features that consume firewall resources.




 **SCTP INIT**


 **Network** > **Network Profiles** > **Zone Protection** > **Flood Protection** (cont)


 Select to enable protection against floods of Stream Control Transmission Protocol ([SCTP](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-init-flood-protection)) packets that contain an Initiation (INIT) chunk. An INIT chunk cannot be bundled with other chunks, so the packet is referred to as an SCTP INIT packet.




 Alarm Rate (connections/sec)


 Enter the number of SCTP INIT packets (not matching an existing session) that the zone receives per second that triggers an attack alarm. Range is 0-2,000,000. Default per firewall model is:



| • | **PA-5280**—10,000 |
| --- | --- |






| • | **PA-5260**—7,000 |
| --- | --- |






| • | **PA-5250**—5,000 |
| --- | --- |






| • | **PA-5220**—3,000 |
| --- | --- |






| • | **VM-700**—1,000 |
| --- | --- |






| • | **VM-500**—500 |
| --- | --- |






| • | **VM-300**—250 |
| --- | --- |






| • | **VM-100**—200 |
| --- | --- |






| • | **VM-50**—100 |
| --- | --- |







 Activate (connections/sec)


 Enter the number of SCTP INIT packets (not matching an existing session) that the zone receives per second before subsequent SCTP INIT packets are dropped. The firewall uses an algorithm to progressively drop more packets as the attack rate increases, until the rate reaches the Maximum rate. The firewall stops dropping SCTP INIT packets if the incoming rate drops below the Activate threshold. Range is 1 to 2,000,000. Default per firewall model is the same as for Alarm Rate.




 Maximum (connections/sec)


 **Network** > **Network Profiles** > **Zone Protection** > **Flood Protection** (cont)


 Enter the maximum number of SCTP INIT packets (not matching an existing session) that the zone receives per second before packets exceeding the maximum are dropped. Range is 1 to 2,000,000. Default per firewall model is:



| • | **PA-5280**—20,000 |
| --- | --- |






| • | **PA-5260**—14,000 |
| --- | --- |






| • | **PA-5250**—10,000 |
| --- | --- |






| • | **PA-5220**—6,000 |
| --- | --- |






| • | **VM-700**—2,000 |
| --- | --- |






| • | **VM-500**—1,000 |
| --- | --- |






| • | **VM-300**—500 |
| --- | --- |






| • | **VM-100**—400 |
| --- | --- |






| • | **VM-50**—200 |
| --- | --- |







 **UDP**


 **Network** > **Network Profiles** > **Zone Protection** > **Flood Protection** (cont)


 Select to enable protection against UDP floods.




 Alarm Rate (connections/sec)


 Enter the number of UDP packets (not matching an existing session) that the zone receives per second that triggers an attack alarm. Range is 0-2,000,000; default is 10,000.
 Fastpath:
 Set the threshold to 15-20% above the average zone CPS rate to accommodate normal fluctuations and adjust the threshold if you receive too many alarms.




 Activate (connections/sec)


 Enter the number of UDP packets (not matching an existing session) that the zone receives per second that triggers random dropping of UDP packets. The firewall uses an algorithm to progressively drop more packets as the attack rate increases, until the rate reaches the Maximum rate. The firewall stops dropping the UDP packets if the incoming rate drops below the Activate threshold. Range is 1 to 2,000,000; default is 10,000.
 Fastpath:
 Set the threshold just above the zone’s peak CPS rate to avoid throttling legitimate traffic and adjust the threshold as needed.




 Maximum (connections/sec)


 Enter the maximum number of UDP packets (not matching an existing session) the zone receives per second before packets exceeding the maximum are dropped. Range is 1 to 2,000,000; default is 40,000.
 Fastpath:
 Set the threshold to 80-90% of firewall capacity, taking into account other features that consume firewall resources.




 **ICMPv6**


 **Network** > **Network Profiles** > **Zone Protection** > **Flood Protection** (cont)


 Select to enable protection against ICMPv6 floods.




 Alarm Rate (connections/sec)


 Enter the number of ICMPv6 echo requests (pings not matching an existing session) that the zone receives per second that triggers an attack alarm. Range is 0-2,000,000; default is 10,000.
 Fastpath:
 Set the threshold to 15-20% above the average zone CPS rate to accommodate normal fluctuations and adjust the threshold if you receive too many alarms.




 Activate (connections/sec)


 Enter the number of ICMPv6 packets (not matching an existing session) that the zone receives per second before subsequent ICMPv6 packets are dropped. The firewall uses an algorithm to progressively drop more packets as the attack rate increases, until the rate reaches the Maximum rate. The firewall stops dropping the ICMPv6 packets if the incoming rate drops below the Activate threshold. Range is 1 to 2,000,000; default is 10,000.
 Fastpath:
 Set the threshold just above the zone’s peak CPS rate to avoid throttling legitimate traffic and adjust the threshold as needed.




 Maximum (connections/sec)


 Enter the maximum number of ICMPv6 packets (not matching an existing session) that the zone receives per second before packets exceeding the maximum are dropped. Range is 1 to 2,000,000; default is 40,000.
 Fastpath:
 Set the threshold to 80-90% of firewall capacity, taking into account other features that consume firewall resources.




 **Other IP**


 **Network** > **Network Profiles** > **Zone Protection** > **Flood Protection** (cont)


 Select to enable protection against other IP (non-TCP, non-ICMP, non-ICMPv6, non-SCTP, and non-UDP) floods.




 Alarm Rate (connections/sec)


 Enter the number of other IP packets (non-TCP, non-ICMP, non-ICMPv6, non-SCTP, and non-UDP packets) (not matching an existing session) the zone receives per second that triggers an attack alarm. Range is 0-2,000,000; default is 10,000.
 Fastpath:
 Set the threshold to 15-20% above the average zone CPS rate to accommodate normal fluctuations and adjust the threshold if you receive too many alarms.




 Activate (connections/sec)


 Enter the number of other IP packets (non-TCP, non-ICMP, non-ICMPv6, and non-UDP packets) (not matching an existing session) the zone receives per second that triggers random dropping of other IP packets. The firewall uses an algorithm to progressively drop more packets as the attack rate increases, until the rate reaches the Maximum rate. The firewall stops dropping the Other IP packets if the incoming rate drops below the Activate threshold. Range is 1 to 2,000,000; default is 10,000.
 Fastpath:
 Set the threshold just above the zone’s peak CPS rate to avoid throttling legitimate traffic and adjust the threshold as needed.




 Maximum (connections/sec)


 Enter the maximum number of other IP packets (non-TCP, non-ICMP, non-ICMPv6, and non-UDP packets) (not matching an existing session) the zone receives per second before packets exceeding the maximum are dropped. Range is 1 to 2,000,000; default is 40,000.
 Fastpath:
 Set the threshold to 80-90% of firewall capacity, taking into account other features that consume firewall resources.



 Parent topic
 [Network > Network Profiles > Zone Protection](network-network-profiles-zone-protection.html#ID0EFHDW)