# Security Policy Optimizer

*Policies : Policies &gt; Security : Security Policy Optimizer*

Security Policy Optimizer



| • | Policies > Security > Policy Optimizer |
| --- | --- |




**Policies** > **Security** > **Policy Optimizer** displays:




| • | **New App Viewer**—New cloud applications downloaded from the Application Control Engine if the firewall has a SaaS Security subscription. |
| --- | --- |






| • | **Rules Without App Controls**—Rules that have the application set to **any**, so you can identify port-based rules to convert to application-based rules. |
| --- | --- |






| • | **Unused Apps**—Rules that include applications that have never matched the rule. |
| --- | --- |






| • | **Log Forwarding for Security Services**—Attach a Log Forwarding profile to multiple rules in bulk and send logs to services such as IoT Security for analysis and Strata Logging Service for storage. |
| --- | --- |



 Note:



| | Before using this feature, you must first configure your [Security policy rules](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy.html) to capture and [forward logs](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/configure-log-forwarding.html) and enable [logging services](https://docs.paloaltonetworks.com/iot/iot-security-admin/get-started-with-iot-security/prepare-your-firewall-for-iot-security.html) with enhanced application logging. |
| --- | --- |






| • | **Rule Usage**—Rule usage information over different periods of time, including rules not used over different periods of time. |
| --- | --- |





| Field | Description |
| --- | --- |
| Name | The name of the Security policy rule. |
| Service | Any services associated with the Security policy rule. |
| Traffic (Bytes, 30 days) | **Traffic (30 days)**—The amount of traffic in bytes seen during the last 30-day period. Note:  |







 Apps Allowed


 The applications that the rule allows. Open the **Application** dialog, from which you can add and delete applications on the rule.




 Application


 (**New App Viewer** only) The applications that the rule allows.




 Apps Seen


 The number of applications seen on the rule. Click the number to open the **Applications & Usage** dialog, which enables you to compare the applications configured on the rule against the applications seen on the rule and to modify the applications.




 Day with No New Apps


 The number of days since the last new application was seen on the rule.




 Compare


 Opens the **Applications & Usage** dialog to compare the applications configured on the rule against the applications seen on the rule and modify the rule.




 (Rule Usage) Last Hit


 The most recent time that traffic matched the rule.




 (Rule Usage) First Hit


 The first time that traffic matched the rule.




 (Rule Usage) Hit Count


 The number of times that traffic matched the rule.




 Modified


 The date and time that the rule was last modified.




 Created


 The date and time that the rule was created.




 Timeframe


 The time period (number of days) for which data is displayed.




 Usage


 Displays:



| • | **Any** (all) rules on the firewall over the specified Timeframe, regardless of whether traffic matched the rules (used rules) or not (unused rules). |
| --- | --- |






| • | **Unused** rules that traffic has not matched over the specified Timeframe. |
| --- | --- |






| • | **Used** rules that traffic has matched over the specified Timeframe. |
| --- | --- |







 Exclude rules reset during the last xx days


 Does not display rules for which you **Reset Rule Hit Counter** within the specified number of days (from 1-5,000 days). For example, this enables you to examine older rules that have not matched traffic over a Timeframe while excluding newer rules that may not have had time to match traffic.




 Reset Date


 The last date on which the rule’s hit counter was reset.




 Log Forwarding Profile (Log Forwarding for Security Services only)


 Displays:



| • | **All** – Rules on the firewall regardless of whether a Log Forwarding profile is attached to them. |
| --- | --- |






| • | **None** – Rules that don’t have a Log Forwarding profile attached to them. |
| --- | --- |






| • | **<profile-name>** – Rules that have a specific Log Forwarding profile attached to them. |
| --- | --- |







 Attach Log Forwarding Profile (Log Forwarding for Security Services only)


 After you select Security policy rules, use this bottom-of-the-screen option to open a dialog box and select a Log Forwarding profile to attach to the selected rules:



| • | **Log Forwarding Profile**—Choose a Log Forwarding profile to attach to the selected rules. |
| --- | --- |






| • | **Enable Enhanced IoT Logging** – Select if the chosen Log Forwarding profile doesn’t already forward enhanced application logs (EALs). This enables EAL forwarding on the chosen Log Forwarding profile. |
| --- | --- |






 Parent topic
 [Policies > Security](policies-security.html#ID0ESNMO)