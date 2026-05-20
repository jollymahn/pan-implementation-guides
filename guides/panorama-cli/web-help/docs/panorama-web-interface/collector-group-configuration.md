# Collector Group Configuration

*Panorama Web Interface : Panorama &gt; Collector Groups : Collector Group Configuration*

Collector Group Configuration

To [configure a Collector Group](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-log-collection/manage-collector-groups/configure-a-collector-group.html), click **Add** and complete the following fields.



| Collector Group Settings | Configured In | Description |
| --- | --- | --- |
| Name | **Panorama** > **Collector Groups** > **General** | Enter a name to identify this Collector Group (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Log Storage | | Indicates the total storage quota for firewall logs that the Collector Group receives and the available space. Click the storage quota link to set the storage **Quota(%)** and expiration period (**Max Days**) for the following log types: • |






| • | **Summary Firewall Logs**—Includes all the summary logs included in **Device** > **Setup** > **Logging and Reporting Settings**, such as traffic summary, threat summary, URL summary, and GTP and tunnel summary. |
| --- | --- |






| • | **Infrastructure and Audit Logs**—Includes the config, system, user-ID and authentication logs. |
| --- | --- |






| • | **Palo Alto Networks Platform Logs**—Includes logs from Traps and other Palo Alto Networks products. |
| --- | --- |






| • | **3rd Party External Logs**—Includes logs from other vendor integrations provided by Palo Alto Networks. |
| --- | --- |



 To use the default settings, click **Restore Defaults**.




 Min Retention Period (days)



 Enter the minimum log retention period in days (1–2,000) that Panorama maintains across all Log Collectors in the Collector Group. If the current date minus the date of the oldest log is less than the defined minimum retention period, Panorama generates a System log as an alert violation.




 Collector Group Members



 **Add** the Log Collectors that will be part of this Collector Group (up to 16). You can add any of the Log Collectors that are available in the **Panorama** > **Managed Collectors** page. All the Log Collectors for any particular Collector Group must be the same model: for example, all M-600 appliances or all Panorama virtual appliances.
 Note:



| | After you add Log Collectors to an existing Collector Group, Panorama redistributes its existing logs across all the Log Collectors, which can take hours for each terabyte of logs. During the redistribution process, the maximum logging rate is reduced. In the **Panorama** > **Collector Groups** page, the Log Redistribution State column indicates the completion status of the process as a percentage. |
| --- | --- |







 Enable log redundancy across collectors



 If you select this option, each log in the Collector Group will have two copies and each copy will reside on a different Log Collector. This redundancy ensures that, if any one Log Collector becomes unavailable, no logs are lost: you can see all the logs forwarded to the Collector Group and run reports for all the log data. Log redundancy is available only if the Collector Group has multiple Log Collectors and each Log Collector has the same number of disks. Log redundancy applies only to newly ingested logs after the setting is enabled and not to existing logs.
 In the **Panorama** > **Collector Groups** page, the Log Redistribution State column indicates the completion status of the process as a percentage. All the Log Collectors for any particular Collector Group must be the same model: for example, all M-600 appliances or all Panorama virtual appliances.
 Note:



| | Because enabling redundancy creates more logs, this configuration requires more storage capacity. Enabling redundancy doubles the log processing traffic in a Collector Group, which reduces its maximum logging rate by half, as each Log Collector must distribute a copy of each log it receives. (When a Collector Group runs out of space, it deletes older logs.) |
| --- | --- |







 Forward to all collectors in the preference list



 Select to send logs to every Log Collector in the preference list. Panorama uses round-robin load balancing to select which Log Collector receives the logs at any given moment. This is disabled by default: firewalls send logs only to the first Log Collector in the list unless that Log Collector becomes unavailable (see [Devices / Collectors](collector-group-configuration.html#ID0EQAV3)).




 Enable Secure Inter LC Communication



 Enables the use of custom certificates for mutual SSL authentication between Log Collectors in a Collector Group.




 Location


 **Panorama** > **Collector Groups** > **Monitoring**


 Specify the location of the Collector Group.




 Contact


 Specify an email contact (for example, the email address of the SNMP administrator who will monitor the Log Collectors).




 Version


 Specify the SNMP version for communication with the Panorama management server: **V2c** or **V3**.
 SNMP enables you to collect information about Log Collectors, including connection status, disk drive statistics, software version, average CPU usage, average logs/second, and storage duration per log type. SNMP information is available on a per Collector Group basis.




 SNMP Community String (`V2c only`)


 Enter the **SNMP Community String**, which identifies a community of SNMP managers and monitored devices (Log Collectors, in this case), and serves as a password to authenticate the community members to each other.
 CAUTION:
 Don’t use the default community string public; it is well known and therefore not secure.




 Views (`V3 only`)


 **Add** a group of SNMP views and, in **Views**, enter a name for the group.
 Each view is a paired object identifier (OID) and bitwise mask: the OID specifies a managed information base (MIB) and the mask (in hexadecimal format) specifies which SNMP objects are accessible within (include matching) or outside (exclude matching) that MIB.
 For each view in the group, **Add** the following settings:



| • | **View**—Enter a name for a view. |
| --- | --- |






| • | **OID**—Enter the OID. |
| --- | --- |






| • | **Option** (include or exclude)—Choose whether the view will exclude or include the OID. |
| --- | --- |






| • | **Mask**—Specify a mask value for a filter on the OID (for example, 0xf0). |
| --- | --- |







 Users (`V3 only`)


 **Add** the following settings for each SNMP user:



| • | **Users**—Enter a username for authenticating the user to the SNMP manager. |
| --- | --- |






| • | **View**—Select a group of views for the user. |
| --- | --- |






| • | **Authpwd**—Enter a password for authenticating the user to the SNMP manager (minimum eight characters). Only Secure Hash Algorithm (SHA) is supported for encrypting the password. |
| --- | --- |






| • | **Privpwd**—Enter a privacy password for encrypting SNMP messages to the SNMP manager (minimum eight characters). Only Advanced Encryption Standard (AES) is supported. |
| --- | --- |







 Devices / Collectors


 **Panorama** > **Collector Groups** > **Device Log Forwarding**


 The log forwarding preference list controls which firewalls forward logs to which Log Collectors. For each entry that you **Add** to the list, **Modify** the Devices list to assign one or more firewalls and **Add** one or more Log Collectors in the Collectors list.
 By default, the firewalls you assign in a list entry will send logs only to the primary (first) Log Collector as long as it is available. If the primary Log Collector fails, the firewalls send logs to the secondary Log Collector. If the secondary fails, the firewalls send logs to the tertiary Log Collector, and so on. To change the order, select a Log Collector and click **Move Up** or **Move Down**.
 Note:



| | You can override the default log forwarding behavior for managed firewalls by selecting [Forward to all collectors in the preference list](collector-group-configuration.html#ID0EYMU3) in the **General** tab. |
| --- | --- |







 System


 **Panorama** > **Collector Groups** > **Collector Log Forwarding**


 For each type of firewall log that you want to forward from this Collector Group to external services, **Add** one or more match list profiles. The profiles specify which logs to forward and the destination servers. For each profile, complete the following:



| • | **Name**—Enter a name of up to 31 characters to identify the match list profile. |
| --- | --- |






| • | **Filter**—By default, the firewall forwards **All Logs** of the type this match list profile applies to. To forward a subset of the logs, select an existing filter or select **Filter Builder** to add a new filter. For each query in a new filter, specify the following fields and **Add** the query: |
| --- | --- |






| ◦ | **Connector**—Select the connector logic (and/or). Select **Negate** if you want to apply negation. For example, to avoid forwarding logs from an untrusted zone, select **Negate**, select **Zone** as the Attribute, select **equal** as the Operator, and enter the name of the untrusted Zone in the Value column. |
| --- | --- |






| ◦ | **Attribute**—Select a log attribute. The options vary by log type. |
| --- | --- |






| ◦ | **Operator**—Select the criterion that determines how the attribute applies (such as **equal**). The options vary by log type. |
| --- | --- |






| ◦ | **Value**—Specify the attribute value to match. |
| --- | --- |



 To [display or export](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/view-and-manage-logs.html) the logs that the filter matches, select **View Filtered Logs**. This tab provides the same options as the **Monitoring** tab pages (such as **Monitoring** > **Logs** > **Traffic**).



| • | **Description**—Enter a description of up to 1,023 characters to explain the purpose of this match list profile. |
| --- | --- |






| • | Destination servers—For each server type, **Add** one or more server profiles. To configure server profiles, see [Device > Server Profiles > SNMP Trap](device-server-profiles-snmp-trap.html#ID0E3WJZ), [Device > Server Profiles > Syslog](device-server-profiles-syslog.html#ID0E1PKZ), [Device > Server Profiles > Email](device-server-profiles-email.html#ID0EHGLZ), or [Device > Server Profiles > HTTP](device-server-profiles-http.html#ID0E3GMZ). |
| --- | --- |






| • | Built-in Actions—You can **Add** actions for all log types except System and Configuration logs: |
| --- | --- |






| ◦ | Enter a descriptive name for the **Action**. |
| --- | --- |






| ◦ | Select the IP address you want to tag—**Source Address** or **Destination Address**. You can tag only the source IP address in Correlation logs and HIP Match logs. |
| --- | --- |






| ◦ | Select the action—**Add Tag** or **Remove Tag**. |
| --- | --- |






| ◦ | Select whether to register the tag with the local User-ID agent on this Panorama, or with a remote User-ID Agent. |
| --- | --- |



 To register tags with a **Remote device User-ID Agent**, select the HTTP server profile that will enable forwarding.



| ◦ | Configure the IP-Tag **Timeout** to set, in minutes, the amount of time that IP address-to-tag mapping is maintained. Setting the timeout to 0 means that the IP-Tag mapping does not timeout (range is 0 to 43200 (30 days); default is 0). |
| --- | --- |



 Note:
 You can only configure a timeout with the **Add Tag** action.



| ◦ | Enter or select the **Tags** you want to apply or remove from the target source or destination IP address. |
| --- | --- |







 Configuration




 HIP Match




 Traffic




 Threat




 URL




 Data




 WildFire




 Correlation




 GTP




 SCTP




 Authentication




 User-ID




 Tunnel




 IP-Tag




 Decryption




 GlobalProtect




 Ingestion Profile


 **Panorama** > **Collector Groups** > **Log Ingestion**


 **Add** one or more log ingestion profiles that allow Panorama to receive logs from the Traps ESM server. To configure a new log ingestion profile, see [Panorama > Log Ingestion Profile](panorama-log-ingestion-profile.html#ID0EOM33).




 Log Admin Activity


 **Panorama** > **Collector Groups** > **Audit**


 Configure the Log Collector to generate and forward audit logs of administrator activity to the select syslog server.



| • | **Operational Commands** (disabled by default)—Generate an audit log when an administrator executes an operational or debug command in the CLI. See the [CLI Operational Command Hierarchy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-cli-quick-start/cli-command-hierarchy) for a full list of PAN-OS operational and debug commands. |
| --- | --- |






| • | **Syslog Server**—Select a target syslog server profile to forward audit logs. |
| --- | --- |






 Parent topic
 [Panorama > Collector Groups](panorama-collector-groups.html#ID0EJRT3)