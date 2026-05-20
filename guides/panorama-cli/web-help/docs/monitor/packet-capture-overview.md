# Packet Capture Overview

*Monitor : Monitor &gt; Packet Capture : Packet Capture Overview*

Packet Capture Overview

You can configure a Palo Alto Networks firewall to perform a custom packet capture or a threat packet capture.




| • | **Custom Packet Capture**—Capture packets for all traffic or traffic based on filters you define. For example, you can configure the firewall to capture only packets to and from a specific source and destination IP address or port. Use these packet captures to troubleshoot network traffic-related issues or to gather application attributes to write custom application signatures (**Monitor** > **Packet Capture**). You define the file name based on the stage (Drop, Firewall, Receive, or Transmit) and, after the PCAP is complete, you download the PCAP in the Captured Files section. |
| --- | --- |






| • | **Threat Packet Capture**—Capture packets when the firewall detects a virus, spyware, or vulnerability. You enable this feature in Antivirus, Anti-Spyware, and Vulnerability Protection security profiles. These packet captures provide context around a threat to help you determine if an attack is successful or to learn more about the methods used by an attacker. The action for the threat must be set to either allow or alert; otherwise, the threat is blocked and packets cannot be captured. You configure this type of packet capture in the **Objects** > **Security Profiles**. To download ( ) pcaps, select **Monitor** > **Threat**. |
| --- | --- |



 Parent topic
 [Monitor > Packet Capture](monitor-packet-capture.html#ID0EJ1LM)