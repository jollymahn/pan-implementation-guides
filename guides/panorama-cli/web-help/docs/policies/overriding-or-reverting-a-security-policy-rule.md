# Overriding or Reverting a Security Policy Rule

*Policies : Policies &gt; Security : Overriding or Reverting a Security Policy Rule*

Overriding or Reverting a Security Policy Rule

The default security rules—interzone-default and intrazone-default—have predefined settings that you can override on a firewall or on Panorama. If a firewall receives the default rules from a device group, you can also override the device group settings. The firewall or virtual system where you perform the override stores a local version of the rule in its configuration. The settings you can override are a subset of the full set (the following table lists the subset for security rules). For details on the default security rules, see [Policies > Security](policies-security.html#ID0ESNMO).


To override a rule, select **Policies** > **Security** on a firewall or **Policies** > **Security** > **Default Rules** on Panorama. The Name column displays the inheritance icon ( ) for rules you can override. Select the rule, click **Override**, and edit the settings in the following table.


To revert an overridden rule to its predefined settings or to the settings pushed from a Panorama device group, select **Policies** > **Security** on a firewall or **Policies** > **Security** > **Default Rules** on Panorama. The Name column displays the override icon ( ) for rules that have overridden values. Select the rule, click **Revert**, and click **Yes** to confirm the operation.



| Fields to Override a Default Security Rule | Description |
| --- | --- |
| **General Tab** | |
| Name | The **Name** that identifies the rule is read-only; you cannot override it. |
| Rule Type | The **Rule Type** is read-only; you cannot override it. |
| Description | The **Description** is read-only; you cannot override it. |
| Tag | Select **Tags** from the drop-down. A policy tag is a keyword or phrase that enables you to sort or filter policies. This is useful when you have defined many policies and want to view those that are tagged with a particular keyword. For example, you might want to tag certain security policies with Inbound to DMZ, tag specific decryption policies with the words Decrypt or No-decrypt, or use the name of a specific data center for policies associated with that location. |
| **Actions Tab** | |
| Action Setting | Select the appropriate **Action** for traffic that matches the rule. • |






| • | **Deny**—Blocks traffic and enforces the default Deny Action that is defined for the application that the firewall is denying. To view the deny action that is defined by default for an application, view the application details in **Objects** > **Applications**. |
| --- | --- |






| • | **Drop**—Silently drops the application. The firewall does not send a TCP reset message to the host or application. |
| --- | --- |






| • | **Reset client**—Sends a TCP reset message to the client-side device. |
| --- | --- |






| • | **Reset server**—Sends a TCP reset message to the server-side device. |
| --- | --- |






| • | **Reset both**—Sends a TCP reset message to both the client-side and server-side devices. |
| --- | --- |







 Profile Setting


 **Profile Type**—Assign profiles or profile groups to the security rule:



| • | To specify the checking that the default security profiles perform, select **Profiles** and then select one or more of the individual **Antivirus**, **Vulnerability Protection**, **Anti-Spyware**, **URL Filtering**, **File Blocking**, **Data Filtering**, **WildFire Analysis**, **SCTP Protection**, and **Mobile Network Protection** profiles. |
| --- | --- |






| • | To assign a profile group rather than individual profiles, select **Group** and then select a **Group Profile** from the drop-down. |
| --- | --- |






| • | To define new profiles ( [Objects > Security Profiles](objects-security-profiles.html#ID0EBHJR)) or profile groups, click **New** in the drop-down for the corresponding profile or group profile. |
| --- | --- |







 Log Setting


 Specify any combination of the following options:



| • | **Log Forwarding**—To forward the local traffic log and threat log entries to remote destinations, such as Panorama and syslog servers, select a **Log Forwarding** profile from the drop-down. Security profiles determine the generation of Threat log entries. To define a new **Log Forwarding** profile, select **Profile** in the drop-down (see [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R)). |
| --- | --- |






| • | To generate entries in the local traffic log for traffic that matches this rule, select the following options: |
| --- | --- |






| ◦ | **Log at Session Start**—Generates a traffic log entry for the start of a session (selected by default). |
| --- | --- |






| ◦ | **Log at Session End**—Generates a traffic log entry for the end of a session (cleared by default). |
| --- | --- |



 Note:
 If you configure the firewall to include session start or session end entries in the Traffic log, it will also include drop and deny entries.



 Parent topic
 [Policies > Security](policies-security.html#ID0ESNMO)