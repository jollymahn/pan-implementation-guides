# TCP Drop

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Packet Based Attack Protection : TCP Drop*

TCP Drop

To instruct the firewall what to do with certain TCP packets it receives in the zone, specify the following settings.



| Zone Protection Profile Settings—Packet Based Attack Protection | Configured In | Description |
| --- | --- | --- |
| Mismatched overlapping TCP segment | **Network** > **Network Profiles** > **Zone Protection** > **Packet Based Attack Protection** > **TCP Drop** | Attackers can construct connections with overlapping but different data in them to cause misinterpretation of the connection. Attackers can use IP spoofing and sequence number prediction to intercept a user’s connection and inject their own data. Use this setting to report an overlap mismatch and drop the packet when segment data does not match in these scenarios: • |






| • | The segment overlaps with part of another segment. |
| --- | --- |






| • | The segment covers another segment. |
| --- | --- |



 This protection mechanism uses sequence numbers to determine where packets reside within the TCP data stream.
 Fastpath:
 Drop packets with mismatched overlapping TCP segments.




 Split Handshake



 Prevent a TCP session from being established if the session establishment procedure does not use the well-known three-way handshake. A four-way or five-way split handshake or a simultaneous open session establishment procedure are examples of variations that would not be allowed.
 The Palo Alto Networks next-generation firewall correctly handles sessions and all Layer 7 processes for split handshake and simultaneous open session establishment without configuring **Split Handshake**. When this is configured for a zone protection profile and the profile is applied to a zone, TCP sessions for interfaces in that zone must be established using the standard three-way handshake; the variations are not allowed.
 Fastpath:
 Drop packets with split handshakes.




 TCP SYN with Data



 Prevent a TCP session from being established if the TCP SYN packet contains data during a three-way handshake. Enabled by default.




 TCP SYNACK with Data



 Prevent a TCP session from being established if the TCP SYN-ACK packet contains data during a three-way handshake. Enabled by default.




 Reject Non-SYN TCP



 Determine whether to reject the packet if the first packet for the TCP session setup is not a SYN packet:



| • | **global**—Use system-wide setting that is assigned through the CLI. |
| --- | --- |






| • | **yes**—Reject non-SYN TCP. |
| --- | --- |






| • | **no**—Accept non-SYN TCP. |
| --- | --- |



 Note:



| | Allowing non-SYN TCP traffic may prevent file blocking policies from working as expected in cases where the client and/or server connection is not set after the block occurs. |
| --- | --- |



 Note:



| | If you [configure Tunnel Content Inspection](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/tunnel-content-inspection/configure-tunnel-content-inspection.html) on a zone and enable **Rematch Sessions**, then for that zone only, disable **Reject Non-SYN TCP** so that enabling or editing a Tunnel Content Inspection policy doesn’t cause the firewall to drop existing tunnel sessions. |
| --- | --- |







 Asymmetric Path



 Determine whether to drop or bypass packets that contain out-of-sync ACKs or out-of-window sequence numbers:



| • | **global**—Use system-wide setting that is assigned through **TCP Settings** or the CLI. |
| --- | --- |






| • | **drop**—Drop packets that contain an asymmetric path. |
| --- | --- |






| • | **bypass**—Bypass scanning on packets that contain an asymmetric path. |
| --- | --- |







 Strip TCP Options



 Determine whether to strip the TCP Timestamp or TCP Fast Open option from TCP packets.




 TCP Timestamp


 **Network** > **Network Profiles** > **Zone Protection** > **Packet Based Attack Protection** > **TCP Drop**


 Determine whether the packet has a TCP timestamp in the header and, if it does, strip the timestamp from the header.
 Fastpath:
 Strip the TCP timestamp from packets that have it to prevent a timestamp DoS attack.




 TCP Fast Open



 Strip the TCP Fast Open option (and data payload, if any) from the TCP SYN or SYN-ACK packet during a TCP three-way handshake.
 When this is cleared (disabled), the TCP Fast Open option is allowed, which preserves the speed of a connection setup by including data delivery. This functions independently of the TCP SYN with Data and TCP SYN-ACK with Data. Disabled by default.




 Multipath TCP (MPTCP) Options



 MPTCP is an extension of TCP that allows a client to maintain a connection by simultaneously using multiple paths to connect to the destination host. By default, MPTCP support is disabled, based on the global MPTCP setting.
 Review or adjust the MPTCP settings for the security zones associated with this profile:



| • | **no**—Enable MPTCP support (do not strip the MPTCP option). |
| --- | --- |






| • | **yes**—Disable MPTCP support (strip the MPTCP option). With this configured, MPTCP connections are converted to standard TCP connections, as MPTCP is backwards compatible with TCP. |
| --- | --- |






| • | **(Default) global**—Support MPTCP based on the global MPTCP setting. By default, the global MPTCP setting is set to yes so that MPTCP is disabled (the MPTCP option is stripped from the packet). You can review or adjust the [global MPTCP setting](tcp-settings.html#ID0EKLUX) using the **Strip MPTCP option** in **TCP Settings** or through the following CLI command: |
| --- | --- |



 # set**deviceconfig setting tcp strip-mptcp-option <yes|no>**



 Parent topic
 [Packet Based Attack Protection](packet-based-attack-protection.html#ID0EPNHW)