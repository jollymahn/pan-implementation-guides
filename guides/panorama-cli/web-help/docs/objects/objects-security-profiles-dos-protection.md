# Objects > Security Profiles > DoS Protection

*Objects : Objects &gt; Security Profiles &gt; DoS Protection*

## Objects > Security Profiles > DoS Protection


DoS Protection profiles are designed for high-precision targeting and they augment Zone Protection profiles. A DoS Protection profile specifies the threshold rates at which new connections per second (CPS) trigger an alarm and an action (specified in the DoS Protection policy). The DoS Protection profile also specifies the maximum CPS rate and how long a blocked IP address remains on the Block IP list. You specify a DoS protection profile in a DoS protection policy rule, where you specify the criteria for packets to match the rule, and the policy rule determines the devices to which the profile applies.

 Fastpath:
 Create DoS Protection profiles and policies to protect critical individual devices or small groups of devices, especially internet-facing devices such as web servers and database servers.

You can configure [Aggregate and Classified DoS Protection profiles](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/zone-protection-and-dos-protection/zone-defense/dos-protection-profiles-and-policy-rules/classified-versus-aggregate-dos-protection). You can apply an Aggregate profile, a Classified profile, or one of each type to a DoS Protection policy rule. If you apply both profile types to a rule, the firewall applies the Aggregate profile first and then applies the Classified profile if needed.




| • | A Classified DoS Protection profile has **Classified** selected as the **Type**. When you apply a Classified DoS Protection profile to a DoS Protection rule whose action is **Protect**, the firewall counts connections toward the profile’s CPS thresholds if the packet meets the specified Address type: source-ip-only, destination-ip-only, or src-dest-ip-both. |
| --- | --- |






| • | An Aggregate DoS Protection profile has **Aggregate** selected as the **Type**. When you apply an Aggregate DoS Protection profile a DoS Protection rule whose action is **Protect**, the firewall counts all connections (the combined number of connections for the group of devices specified in the rule) that meet the criteria for the rule toward the profile’s CPS thresholds. |
| --- | --- |




To apply a DoS Protection profile to a DoS Protection policy, see [Policies > DoS Protection](policies-dos-protection.html#ID0EYHMQ).

 Note:



| | If you have a multiple virtual system (multi-vsys) environment and have configured the following: |
| --- | --- |






| • | External zones to enable inter-virtual system communication and |
| --- | --- |






| • | Shared gateways to allow virtual systems to share a common interface and a single IP address for external communications, then |
| --- | --- |



 The following Zone and DoS protection mechanisms are disabled on the external zone:



| • | SYN cookies |
| --- | --- |






| • | IP fragmentation |
| --- | --- |






| • | ICMPv6 |
| --- | --- |



 To enable IP fragmentation and ICMPv6 protection, create a separate zone protection profile for the shared gateway.
 To protect against SYN floods on a shared gateway, you can apply a SYN Flood protection profile with either Random Early Drop or SYN cookies. On an external zone, only Random Early Drop is available for SYN Flood protection.


| DoS Protection Profile Settings |
| --- |
| Name |
| Description |
| Shared (`Panorama only`) |






| • | Every device group on Panorama. If you clear this selection, the profile will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this DoS Protection profile in device groups that inherit the profile. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the profile.




 Type


 Select one of the following profile types:



| • | **Aggregate**—Apply the DoS thresholds configured in the profile to all connections that match the rule criteria on which this profile is applied. For example, an aggregate rule with a SYN flood **Alarm Rate** threshold of 10,000 CPS counts the combined connections of all the devices that match the DoS rule. When the total CPS for the group exceeds 10,000 CPS that triggers the alarm, regardless of how the CPS are spread across the devices. |
| --- | --- |






| • | **Classified**—Apply the DoS thresholds configured in the profile to each individual connection that matches the classification criteria (source IP address, destination IP address, or source-and-destination IP address pair). For example, a classified rule with a SYN flood **Alarm Rate** threshold of 10,000 CPS allows up to 10,000 CPS per device and triggers an alarm when any individual device specified in the DoS rule exceeds 10,000 CPS. |
| --- | --- |







 **Flood Protection Tab**




 SYN Flood tab
 UDP Flood tab
 ICMP Flood tab
 ICMPv6 Flood tab
 Other IP Flood tab


 Select this option to enable the type of flood protection indicated on the tab and specify the following settings:



| • | **Action**—(**SYN Flood** only) Action that the firewall performs if the DoS Protection policy action is **Protect** and if incoming CPS reach the **Activate Rate**. Choose one of the following: |
| --- | --- |






| ◦ | **Random Early Drop**—Drop packets randomly when connections per second reach the **Activate Rate** threshold. |
| --- | --- |






| ◦ | **SYN cookies**—Use SYN cookies to generate acknowledgments so that it is not necessary to drop connections during a SYN flood attack. |
| --- | --- |



 Fastpath:
 Start with SYN Cookies, which treats legitimate traffic fairly but consumes more firewall resources. Monitor CPU and memory utilization, and if SYN Cookies consumes too many resources, switch to RED. Always use RED if you don’t have a dedicated DDoS prevention device at the network (internet) edge to protect against large volume DoS attacks.



| • | **Alarm Rate**—Specify the threshold rate (CPS) to generate a DoS alarm (range is 0 to 2,000,000 cps; default is 10,000 cps). |
| --- | --- |



 For Classified profiles, the best practice is to set the threshold to 15-20% above the device’s average CPS rate to accommodate normal fluctuations and adjust the threshold if you receive too many alarms. For Aggregate profiles, the best practice is to set the threshold to 15-20% above the group’s average CPS rate. Monitor and adjust the thresholds as needed.



| • | **Activate Rate**—Specify the threshold rate (cps) at which a DoS response is activated. The DoS response is configured in the **Action** field of the DoS Protection profile (Random Early Drop or SYN cookies). The **Activate Rate** range is 0 to 2,000,000 cps; default is 10,000 cps. |
| --- | --- |



 If the profile **Action** is **Random Early Drop** (RED), when incoming connections per second reach the **Activate Rate** threshold, RED occurs. If the CPS rate increases, the RED rate increases according to an algorithm. The firewall continues with RED until the CPS rate reaches the **Max Rate** threshold.
 Classified profiles apply exact CPS limits to individual devices and you base those limits on the capacity of the protected devices, so you don’t need to throttle CPS gradually and can set the **Activate Rate** to the same threshold as the **Max Rate**. Set the **Activate Rate** lower than the **Max Rate** only if you want to begin dropping traffic to an individual server before it reaches the **Max Rate**. For Aggregate profiles, set the threshold just above the peak CPS rate for the group. Monitor and adjust the thresholds as needed.



| • | **Max Rate**—Specify the threshold rate of incoming connections per second the firewall allows. At the **Max Rate** threshold, the firewall drops 100% of new connections (range is 2 to 2,000,000 cps; default is 40,000 cps.) |
| --- | --- |



 For Classified profiles, base the **Max Rate** on the capacity of the devices you’re protecting so they can’t be flooded. For Aggregate profiles, set the **Max Rate** to 80-90% of the group’s capacity. Monitor and adjust the thresholds as needed.



| • | **Block Duration**—Specify the length of time (seconds) during which the offending IP address remains on the Block IP list and connections with the IP address are blocked. The firewall doesn’t count packets that arrive during the block duration toward the Alarm Rate, Activate Rate, or Max Rate thresholds (range is 1 to 21,600 seconds; default is 300 seconds). |
| --- | --- |







 **Resources Protection Tab**




 Sessions


 Select this option to enable resources protection.




 Maximum Concurrent Sessions


 Specify the maximum number of concurrent sessions.



| • | For the **Aggregate** profile type, this limit applies to all traffic hitting the DoS Protection rule on which the DoS Protection profile is applied. |
| --- | --- |






| • | For the **Classified** profile type, this limit applies to the traffic on a classified basis (source IP, destination IP or source-and-destination IP) hitting the DoS Protection rule to which the DoS Protection profile is applied. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)