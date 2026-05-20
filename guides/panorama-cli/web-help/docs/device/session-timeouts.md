# Session Timeouts

*Device : Device &gt; Setup &gt; Session : Session Timeouts*

Session Timeouts

Some session timeouts define the duration for which PAN-OS maintains a session on the firewall after inactivity in the session. By default, when the session timeout for the protocol expires, PAN-OS closes the session. The Discard session timeouts define the maximum time that a session remains open after PAN-OS denies the session based on Security policy rules.


On the firewall, you can define a number of timeouts for TCP, UDP, ICMP, and SCTP sessions in particular. The **Default** timeout applies to any other type of session. All of these timeouts are global, meaning they apply to all of the sessions of that type on the firewall.


In addition to the global settings, you have the flexibility to define timeouts for an individual application in the **Objects** > **Applications** tab. The timeouts available for that application appear in the Options window. The firewall applies application timeouts to an application that is in Established state. When configured, timeouts for an application override the global TCP, UDP, or SCTP session timeouts.


Use the options in this section to configure global session [timeout settings](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/session-settings-and-timeouts.html)—specifically for TCP, UDP, ICMP, SCTP, and for all other types of sessions.


The defaults are optimal values and the best practice is to use the default values. However, you can modify these according to your network needs. Setting a value too low could cause sensitivity to minor network delays and could result in a failure to establish connections with the firewall. Setting a value too high could delay failure detection.



| Session Timeouts Settings | Description |
| --- | --- |
| Default | Maximum length of time, in seconds, that a non-TCP/UDP, non-SCTP, or non-ICMP session can be open without a response (range is 1 to 15,999,999; default is 30). |
| Discard Default | Maximum length of time (in seconds) that a non-TCP/UDP/SCTP session remains open after PAN-OS denies the session based on Security policy rules configured on the firewall (range is 1 to 15,999,999; default is 60). |
| Discard TCP | Maximum length of time (in seconds) that a TCP session remains open after PAN-OS denies the session based on Security policy rules configured on the firewall (range is 1 to 15,999,999; default is 90). |
| Discard UDP | Maximum length of time (in seconds) that a UDP session remains open after PAN-OS denies the session based on Security policy rules configured on the firewall (range is 1 to 15,999,999; default is 60). |
| ICMP | Maximum length of time that an ICMP session can be open without an ICMP response (range is 1 to 15,999,999; default is 6). |
| Scan | Maximum length of time, in seconds, that a session can be inactive before the firewall clears the session and recovers the buffer resources the session was using. The inactive time is the length of time that has passed since the session was last refreshed by a packet or an event. Range is 5 to 30; default is 10. |
| TCP | Maximum length of time that a TCP session remains open without a response, after a TCP session is in the Established state (after the handshake is complete and/or data transmission has started); (range is 1 to 15,999,999; default is 3,600). |
| TCP handshake | Maximum length of time, in seconds, between receiving the SYN-ACK and the subsequent ACK to fully establish the session (ranges is 1 to 60; default is 10). |
| TCP init | Maximum length of time, in seconds, between receiving the SYN and SYN-ACK before starting the TCP handshake timer (ranges is 1 to 60; default is 5). |
| TCP Half Closed | Maximum length of time, in seconds, between receiving the first FIN and receiving the second FIN or a RST (range is 1 to 604,800; default is 120). |
| TCP Time Wait | Maximum length of time, in seconds, after receiving the second FIN or a RST (range is 1 to 600; default is 15). |
| Unverified RST | Maximum length of time, in seconds, after receiving a RST that cannot be verified (the RST is within the TCP window but has an unexpected sequence number, or the RST is from an asymmetric path); (ranges is 1 to 600; default is 30). |
| UDP | Maximum length of time, in seconds, that a UDP session remains open without a UDP response (range is 1 to 1,599,999; default is 30). |
| Authentication Portal | The authentication session timeout in seconds for the Authentication Portal web form (default is 30, range is 1 to 1,599,999). To access the requested content, the user must enter the authentication credentials in this form and be successfully authenticated. The authentication session timeout in seconds for the Authentication Portal web form (default is 30, range is 1 to 1,599,999). To access the requested content, the user must enter the authentication credentials in this form and be successfully authenticated. |
| SCTP INIT | Maximum length of time, in seconds, from receiving an SCTP INIT chunk that the firewall must receive the INIT ACK chunk before the firewall stops the [SCTP](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-security) association initiation (range is 1 to 60; default is 5). |
| SCTP COOKIE | Maximum length of time, in seconds, from receiving an [SCTP](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-security) INIT ACK chunk with the state COOKIE parameter that the firewall must receive the COOKIE ECHO chunk with the cookie before the firewall stops the SCTP association initiation (range is 1 to 600; default is 60). |
| Discard SCTP | Maximum length of time, in seconds, that an [SCTP](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-security) association remains open after PAN-OS denies the session based on Security policy rules configured on the firewall (range is 1 to 604,800; default is 30). |
| SCTP | Maximum length of time, in seconds, that can elapse without [SCTP](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-security) traffic for an association before all sessions in the association time out (range is 1 to 604,800; default is 3,600). |
| SCTP Shutdown | Maximum length of time, in seconds, that the firewall waits after an [SCTP](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-security) SHUTDOWN chunk to receive a SHUTDOWN ACK chunk before the firewall disregards the SHUTDOWN chunk (range is 1 to 600; default is 30). |


 Parent topic
 [Device > Setup > Session](device-setup-session.html#ID0EBWRX)