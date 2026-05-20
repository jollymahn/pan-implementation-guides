# L3 & L4 Header Inspection

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : L3 &amp; L4 Header Inspection*

L3 & L4 Header Inspection



| • | Network > Network Profiles > Zone Protection > L3 & L4 Header Inspection |
| --- | --- |



When L3 & L4 header inspection is enabled globally, the firewall is able to detect and prevent vulnerabilities within the supported protocols (IP/IPv6, ICMP/ICMPv6, TCP and UDP) and log and/or block packets that match the user-specified custom rules. Additionally, you must [Enable Net Inspection](building-blocks-of-security-zones.html#ID0EBMUT) (**Network** > **Zones**) for each security zone using header inspection custom rules.


You can add, delete, and clone existing rules, as well as define the precedence and operational status of the custom rules as evaluated by the Zone Protection profile.


After you configure L3 & L4 header inspection in a Zone Protection profile, apply the profile to an ingress security zone.

 Fastpath:
 Palo Alto Networks recommends configuring and enabling L3 & L4 Header Inspection only at the security zones that are expected to encounter and process packets that match the custom rules, as there are a limited number of zones that can operate simultaneously when this feature is enabled.


| Zone Protection Profile Settings—L3 & L4 Header Inspection | Configured In | Description |
| --- | --- | --- |
| **Configuration Tab** | | |
| General | | |
| Rule | **Network** > **Network Profiles** > **Zone Protection** > **L3 & L4 Header Inspection** | Enter a name to identify the custom rule (up to 31 characters). |
| Threat ID | Specify a threat ID number for the custom rule configuration (the vulnerability signature range is 41000-45000 and 6800001-6900000). | |
| Comment | Enter an optional comment to describe the custom rule. | |
| Packet Capture | Enables a packet capture upon detection of a vulnerability matching the custom rule. From the drop-down, select **single-packet** or **extended-capture**, or **disable** if you do not want to want the firewall to record packet captures. You can also **send icmp unreachable packets if packet is dropped** to inform the client a session is not allowed. | |
| Exempt IP | Enter the IP address(es) for which you do not want the custom rule to apply to. | |
| Properties | | |
| Log Severity | **Network** > **Network Profiles** > **Zone Protection** > **L3 & L4 Header Inspection** | Specify the log severity level that is recorded when the firewall detects a vulnerability matching the custom rule. |
| Log Interval | Specify the maximum log frequency (in seconds) of a matching event. | |
| Action | Specify the policy action to be taken when a vulnerability matching the custom rule is detected in the header. Options include: • | allow |





| • | alert |
| --- | --- |





| • | drop |
| --- | --- |





| • | reset-client |
| --- | --- |





| • | reset-server |
| --- | --- |





| • | reset-both |
| --- | --- |






 Reference




 CVE


 **Network** > **Network Profiles** > **Zone Protection** > **L3 & L4 Header Inspection**


 Publicly known security vulnerability identifier associated with the threat. The Common Vulnerabilities and Exposures (CVE) identifier is the most useful identifier for finding information about unique vulnerability as vendor specific IDs commonly encompass multiple vulnerabilities.




 Bugtraq


 The bugtraq identifier (similar to CVE) associated with the vulnerability. Can be used as an external reference for additional background and analysis details.




 Vendor


 The vendor-specific identifier for a vulnerability.




 Reference


 Links to additional analysis or background information.




 **Signature Tab**




 Comment


 **Network** > **Network Profiles** > **Zone Protection** > **L3 & L4 Header Inspection**


 Enter an optional comment to describe the custom rule signature details.




 Or Condition


 Specify an **Or condition** value for the custom signature.




 And Condition


 Add an **And Condition** for the custom signature by configuring the following:



| • | **And Condition**—Specify an And condition value for the custom signature. |
| --- | --- |





| • | **Operator**— defines the type of condition that must be true for the custom signature to match to the header contents. Choose from Greater Than, Less Than, Equal To, Range, or Event operators. |
| --- | --- |





| • | **Context**—Select from the available context options. |
| --- | --- |


 Depending upon your selection, you might have other fields related to the context and/or operator that must be specified to enable the condition.
 Note:



| | Add conditions are added as a second level entry under **Or Condition**. |
| --- | --- |





 Parent topic
 [Network > Network Profiles > Zone Protection](network-network-profiles-zone-protection.html#ID0EFHDW)