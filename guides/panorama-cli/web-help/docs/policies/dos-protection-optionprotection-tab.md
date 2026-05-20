# DoS Protection Option/Protection Tab

*Policies : Policies &gt; DoS Protection : DoS Protection Option/Protection Tab*

DoS Protection Option/Protection Tab

Select the **Option/Protection** tab to configure options for the DoS Protection policy rule, such as the type of service to which the rule applies, the action to take against packets that match the rule, and whether to trigger log forwarding for matched traffic. You can define a schedule for when the rule is active.


You can also select an aggregate DoS Protection profile and/or a classified DoS Protection profile, which determine the threshold rates that, when exceeded, cause the firewall to take protective actions, such as trigger an alarm, activate an action such as Random Early Drop, and drop packets that exceed the maximum threshold rate.



| Field | Description |
| --- | --- |
| Service | Click **Add** and select one or more services to which the DoS Protection policy applies. The default is **Any** service. For example, if the DoS policy protects web servers, specify HTTP, HTTPS, and any other appropriate service ports for the web applications. Fastpath:  For critical servers, create separate DoS Protection rules to protect the unused service ports to help prevent targeted attacks. |
| Action | Select the action the firewall performs on packets that match the DoS Protection policy rule: • |






| • | **Allow**—Permit all packets that match the rule. |
| --- | --- |






| • | **Protect**—Enforce the protections specified in the specified DoS Protection profile on packets that match the rule. Packets that match the rule are counted toward the threshold rates in the DoS Protection profile, which in turn trigger an alarm, activate another action, and trigger packet drops when the maximum rate is exceeded. |
| --- | --- |



 Fastpath:
 The object of applying DoS Protection is to protect against DoS attacks, so you should use usually **Protect**. **Deny** drops legitimate traffic along with DoS traffic and **Allow** doesn’t stop DoS attacks. Use **Deny** and **Allow** only to make exceptions within a group. For example, you can deny the traffic from most of a group but allow a subset of that traffic, or allow the traffic from most of a group but deny a subset of that traffic.




 Schedule


 Specify the schedule when the DoS Protection policy rule is in effect. The default setting of **None** indicates no schedule; the policy is always in effect.
 Alternatively, select a schedule or create a new schedule to control when the DoS Protection policy rule is in effect. Enter a **Name** for the schedule. Select **Shared** to share this schedule with every virtual system on a multiple virtual system firewall. Select a **Recurrence** of **Daily**, **Weekly**, or **Non-recurring**. Add a **Start Time** and **End Time** in hours:minutes, based on a 24-hour clock.




 Log Forwarding


 If you want to trigger forwarding of threat log entries for matched traffic to an external service, such as to a syslog server or Panorama, select a Log Forwarding profile or click **Profile** to create a new one.
 Note:



| | The firewall logs and forwards only traffic that matches an action in the rule. |
| --- | --- |



 Fastpath:
 For easier management, forward DoS logs separately from other Threat logs, both directly to [administrators via email and to a log server](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/use-external-services-for-monitoring).




 Aggregate


 Aggregate DoS Protection profiles set thresholds that apply to combined group of devices specified in the DoS Protection rule to protect those server groups. For example, an Alarm Rate threshold of 10,000 CPS means that when the total new CPS to the entire group exceeds 10,000 CPS, the firewall triggers an alarm message.
 Select an Aggregate DoS Protection profile that specifies the threshold rates at which the incoming connections per second trigger an alarm, activate an action, and exceed a maximum rate. All incoming connections (the aggregate) count toward the thresholds specified in an Aggregate DoS Protection profile.
 An Aggregate profile setting of **None** means there are no threshold settings in place for the aggregate traffic. See [Objects > Security Profiles > DoS Protection](objects-security-profiles-dos-protection.html#ID0EQAXR).




 Classified


 Classified DoS Protection profiles set thresholds that apply to each individual device specified in the DoS Protection rule to protect individual or small groups of critical servers. For example, an Alarm Rate threshold of 10,000 CPS means that when the total new CPS to any individual server specified in the rule exceeds 10,000 CPS, the firewall triggers an alarm message.
 Select this option and specify the following:



| • | **Profile**—Select a Classified DoS Protection profile to apply to this rule. |
| --- | --- |






| • | **Address**—Select whether incoming connections count toward the thresholds in the profile if they match the **source-ip-only**, **destination-ip-only**, or **src-dest-ip-both**. |
| --- | --- |



 Note:



| | The firewall consumes more resources to track **src-dest-ip-both** counters than to track only the source IP or only the destination IP counters. |
| --- | --- |



 If you specify a Classified DoS Protection profile, only the incoming connections that match a source IP address, destination IP address, or source and destination IP address pair count toward the thresholds specified in the profile. For example, you can specify a Classified DoS Protection profile with a **Max Rate** of 100 cps, and specify an **Address** setting of **source-ip-only** in the rule. The result would be a limit of 100 connections per second for that particular source IP address.
 Fastpath:
 Don’t use **source-ip-only** or **src-dest-ip-both** for internet-facing zones because the firewall can’t store counters for all possible internet IP addresses. Use **destination-ip-only** in perimeter zones.
 Use **destination-ip-only** to protect individual critical devices.
 Use **source-ip-only** and the **Alarm** threshold to monitor suspect hosts in non-internet-facing zones.
 See [Objects > Security Profiles > DoS Protection](objects-security-profiles-dos-protection.html#ID0EQAXR).



 Parent topic
 [Policies > DoS Protection](policies-dos-protection.html#ID0EYHMQ)