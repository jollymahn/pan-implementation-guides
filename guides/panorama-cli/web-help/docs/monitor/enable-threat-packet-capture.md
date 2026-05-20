# Enable Threat Packet Capture

*Monitor : Monitor &gt; Packet Capture : Enable Threat Packet Capture*

Enable Threat Packet Capture



| • | Objects > Security Profiles |
| --- | --- |




To enable the firewall to capture packets when it detects a threat, enable the packet capture option in the security profile.


First select **Objects** > **Security Profiles** and then modify the desired profile as described in the following table:



| Packet Capture Options in Security Profiles | Location |
| --- | --- |
| Antivirus | Select a custom antivirus profile and, in the **Antivirus** tab, select **Packet Capture**. |
| Anti-Spyware | Select a custom Anti-Spyware profile, click the **DNS Signatures** tab and, in the **Packet Capture** drop-down, select **single-packet** or **extended-capture**. |
| Vulnerability Protection | Select a custom Vulnerability Protection profile and, in the **Rules** tab, click **Add** to add a new rule or select an existing rule. Then select the **Packet Capture** drop-down and select **single-packet** or **extended-capture**. |


 Note:



| | In Anti-Spyware and Vulnerability Protection profiles, you can also enable packet capture on exceptions. Click the **Exceptions** tab and in the Packet Capture column for a signature, click the drop-down and select **single-packet** or **extended-capture**. |
| --- | --- |




(`Optional`) To define the length of a threat packet capture based on the number of packets captured (which is based on a global setting), select **Device** > **Setup** > **Content-ID** and, in the Content-ID™ Settings section, modify the **Extended Packet Capture Length (packets)** field (range is 1-50; default is 5).


After you enable packet capture on a security profile, you need to verify that the profile is part of a security rule. For information on how to add a security profile to a security rule, see [Security Policy Overview](security-policy-overview.html#ID0E13MO).


Each time the firewall detects a threat when packet capture is enabled on the security profile, you can download ( ) or export the packet capture.

 Parent topic
 [Monitor > Packet Capture](monitor-packet-capture.html#ID0EJ1LM)