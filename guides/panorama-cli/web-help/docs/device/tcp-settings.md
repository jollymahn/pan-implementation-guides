# TCP Settings

*Device : Device &gt; Setup &gt; Session : TCP Settings*

TCP Settings

The following table describes TCP settings.



| TCP Settings | Description |
| --- | --- |
| Forward segments exceeding TCP out-of-order queue | Select this option if you want the firewall to forward segments that exceed the TCP out-of-order queue limit of 64 per session. If you disable this option, the firewall drops segments that exceed the out-of-order queue limit. To see a count of the number of segments that the firewall dropped as a result of enabling this option, run the following CLI command: ** show counter global tcp_exceed_flow_seg_limit**** Fastpath:  This option is disabled by default and should remain this way for the most secure deployment. Disabling this option may result in increased latency for the specific stream that received over 64 segments out of order. There should be no loss of connectivity because the TCP stack should handle missing segments retransmission. |
| Allow Challenge ACK / Allow arbitrary ACK in response to SYN | Enable this option to allow a response to a challenge ACK (also known as an arbitrary ACK) for cases where the server responds to the client SYN with an ACK instead of a SYN/ACK. For example, challenge ACKs can be sent from the server for attack mitigation purposes, and enabling this setting on the firewall allows communication between the client and server so that the challenge ACK process can be completed even when the handshake is out of state or out of sequence. |
| Drop segments with null timestamp option | The TCP timestamp records when the segment was sent and allows the firewall to verify that the timestamp is valid for that session, preventing TCP sequence number wrapping. The TCP timestamp is also used to calculate round trip time. With this option enabled, the firewall drops packets with null timestamps. To see a count of the number of segments that the firewall dropped as a result of enabling this option, run the following CLI command: show counter global tcp_invalid_ts_option**** Fastpath:  This option is enabled by default and should remain this way for the most secure deployment. Enabling this option should not result in performance degradation. However, if a network stack incorrectly generates segments with a null TCP timestamp option value, enabling this option may result in connectivity issues. |
| Asymmetric Path | Set globally whether to drop or bypass packets that contain out-of-sync ACKs or out-of-window sequence numbers. • |






| • | Bypass**—Bypass scanning on packets that contain an asymmetric path. |
| --- | --- |



 Note:



| | To control the setting for individual Zone Protection Profiles, change the **Asymmetric Path** setting in [TCP Drop](tcp-drop.html#ID0EZPIW). |
| --- | --- |







 Urgent Data Flag


 Use this option to configure whether the firewall allows the urgent pointer (URG bit flag) in the TCP header. The urgent pointer in the TCP header is used to promote a packet for immediate processing—the firewall removes it from the processing queue and expedites it through the TCP/IP stack on the host. This process is called out-of-band processing.
 Because the implementation of the urgent pointer varies by host, setting this option to **Clear** (the default and recommended setting) eliminates any ambiguity by disallowing out-of-band processing so that the out-of-band byte in the payload becomes part of the payload and the packet is not processed urgently. Additionally, the **Clear** setting ensures that the firewall sees the exact stream in the protocol stack as the host for whom the packet is destined. To see a count of the number of segments in which the firewall cleared the URG flag when this option is set to **Clear**, run the following CLI command:
 								show counter global tcp_clear_urg**
 Fastpath:
 By default, this flag is set to **Clear** and should remain this way for the most secure deployment. This should not result in performance degradation; in the rare instance that applications, such as telnet, are using the urgent data feature, TCP may be impacted. If you set this flag to Do Not Modify**, the firewall allows packets with the URG bit flag in the TCP header and enables out-of-band processing ( `not recommended`).




 Drop segments without flag


 Illegal TCP segments without any flags set can be used to evade content inspection. With this option enabled (the default) the firewall drops packets that have no flags set in the TCP header. To see a count of the number of segments that the firewall dropped as a result of this option, run the following CLI command:
 								show counter global tcp_flag_zero**
 Fastpath:
 This option is enabled by default and should remain this way for the most secure deployment. Enabling this option should not result in performance degradation. However, if a network stack incorrectly generates segments with no TCP flags, enabling this option may result in connectivity issues.




 Strip MPTCP option


 Enabled globally by default to convert (Multipath TCP) MPTCP connections to standard TCP connections.
 Note:



| | To allow MCTCP, change the **Multipath TCP (MPTCP) Options** setting in [TCP Drop](tcp-drop.html#ID0EZPIW)**. |
| --- | --- |







 SIP TCP cleartext


 Select one of the following options to set the cleartext proxy behavior for SIP TCP sessions when a segmented SIP header is detected.



| • | **Always Off**—Disables the cleartext proxy. Disable the proxy when the SIP message size is generally smaller than the MSS and when the SIP messages fit within a single segment, or if you need to ensure TCP proxy resources are reserved for SSL forward proxy or HTTP/2. |
| --- | --- |






| • | **Always enabled**—Default. Uses TCP proxy for all SIP over TCP sessions to help with the correct reassembly and ordering of TCP segments for proper ALG operation. |
| --- | --- |






| • | **Automatically enable proxy when needed**—When selected, the cleartext proxy is automatically enabled for sessions where the ALG detects SIP message fragmentation. Helps optimize the proxy when it is also used for SSL forward proxy or HTTP/2. |
| --- | --- |







 TCP Retransmit Scan
 (`PAN-OS 10.0.2 or later`)


 If enabled, the checksum for the original packet is scanned when a retransmitted packet is seen. If the checksum are different between the original and retransmitted packet, the retransmitted packet is assumed to be malicious and dropped.



 Parent topic
 [Device > Setup > Session](device-setup-session.html#ID0EBWRX)