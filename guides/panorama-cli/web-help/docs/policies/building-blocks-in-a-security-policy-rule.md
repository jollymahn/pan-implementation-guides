# Building Blocks in a Security Policy Rule

*Policies : Policies &gt; Security : Building Blocks in a Security Policy Rule*

Building Blocks in a Security Policy Rule



| • | Policies > Security |
| --- | --- |




The following section describes each [component in a Security policy rule](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-policy/components-of-a-security-policy-rule.html). When you create a Security policy rule, you can configure the options described here.



| Building Blocks in a Security Rule | Configured In | Description |
| --- | --- | --- |
| Rule number | N/A | The firewall automatically numbers each rule and the order of the rules will change as rules are moved. When you filter rules to match specific filters, each rule displays with its number in the context of the complete set of rules in the rulebase and its place in the evaluation order. Panorama independently numbers pre-rules and post-rules. When Panorama pushes rules to a managed firewall, the rule numbering incorporates hierarchy in pre-rules, firewall rules, and post-rules within a rulebase and reflects the rule sequence and its evaluation order. |
| Name | **General** | Enter a name to identify the rule. The name is case-sensitive and can have up to 63 characters, which can be letters, numbers, spaces, hyphens, and underscores. The name must be unique on a firewall and, on Panorama, unique within its device group and any ancestor or descendant device groups. |
| Rule Type | | Specifies whether the rule applies to traffic within a zone, between zones, or both: • |






| • | **intrazone**—Applies the rule to all matching traffic within the specified source zones (you cannot specify a destination zone for intrazone rules). For example, if you set the source zone to A and B, the rule would apply to all traffic within zone A and all traffic within zone B, but not to traffic between zones A and B. |
| --- | --- |






| • | **interzone**—Applies the rule to all matching traffic between the specified source and destination zones. For example, if you set the source zone to A, B, and C and the destination zone to A and B, the rule would apply to traffic from zone A to zone B, from zone B to zone A, from zone C to zone A, and from zone C to zone B, but not traffic within zones A, B, or C. |
| --- | --- |







 Description



 Enter a description for the policy (up to 1,024 characters).




 Tags



 Specify the tag for the policy.
 A policy tag is a keyword or phrase that allows you to sort or filter policies. This is useful when you have defined many policies and want to view those that are tagged with a particular keyword. For example, you may want to tag certain rules with specific words like Decrypt and No-decrypt, or use the name of a specific data center for policies associated with that location.
 You can also add tags to the default rules.




 Source Zone


 **Source**


 **Add** source zones (default is **Any**). Zones must be of the same type (Layer 2, Layer 3, or virtual wire). To define new zones, refer to [Network > Zones](network-zones.html#ID0EC6TT).
 Multiple zones can be used to simplify management. For example, if you have three different internal zones (Marketing, Sales, and Public Relations) that are all directed to the untrusted destination zone, you can create one rule that covers all cases.




 Source Address


 **Source**


 **Add** source addresses, address groups, or regions (default is **Any**). Select from the drop-down or select **Address** object, **Address Group**, or **Regions** (bottom of the drop-down) to specify the settings. [Objects>Addresses](objects-addresses.html#ID0E16TQ) and [Objects>AddressGroups](objects-address-groups.html#ID0E12UQ) describe the types of address objects and address groups, respectively, that a Security policy rule supports.
 Selecting the **Negate** option will apply the rule to source addresses from the specified zone except for the addresses specified.




 Source User


 **Source**


 **Add** the source users or groups of users subject to the policy:



| • | **any**—Includes any traffic regardless of user data. |
| --- | --- |






| • | **pre-logon**—Includes remote users that are connected to the network using GlobalProtect, but are not logged into their system. When the Pre-logon option is configured on the Portal for GlobalProtect endpoints, any user who is not currently logged into their machine will be identified with the username pre-logon. You can then create policies for pre-logon users and although the user is not logged in directly, their machines are authenticated on the domain as if they were fully logged in. |
| --- | --- |






| • | **known-user**—Includes all authenticated users, which means any IP address with user data mapped. This option is equivalent to the domain users group on a domain. |
| --- | --- |






| • | **unknown**—Includes all unauthenticated users, which means IP addresses that are not mapped to a user. For example, you could use **unknown** for guest level access to something because they will have an IP address on your network but will not be authenticated to the domain and will not have IP address-to-user mapping information on the firewall. |
| --- | --- |






| • | **Select**—Includes selected users as determined by the selection in this window. For example, you may want to add one user, a list of individuals, some groups, or manually add users. |
| --- | --- |



 Note:



| | If the firewall collects user information from a RADIUS, TACACS+, or SAML identity provider server and not from the User-ID™ agent, the list of users does not display; you must enter user information manually. |
| --- | --- |







 Source Device


 **Source**


 **Add** the host devices subject to the policy:



| • | **any**—Includes any device. |
| --- | --- |






| • | **no-hip**—HIP information is not required. This setting enables access from third-party devices that cannot collect or submit HIP information. |
| --- | --- |






| • | **quarantine**—Includes any device that is in the quarantine list (**Device** > **Device Quarantine**). |
| --- | --- |






| • | **select**—Includes selected devices as determined by your configuration. For example, you can add a device object based on model, OS, OS family, or vendor. |
| --- | --- |







 Source HIP Profile


 **Source**


 **Add** host information profiles (HIP) to enable you to collect information about the security status of your end hosts, such as whether they have the latest security patches and antivirus definitions installed. Using host information profiles for policy enforcement enables granular security that ensures that the remote hosts accessing your critical resources are adequately maintained and in adherence with your security standards before they are allowed to access your network resources. The following source HIP profiles are supported:



| • | **any**—Includes any endpoint, regardless of HIP information. |
| --- | --- |






| • | **select**—Includes selected HIP profiles as determined by your configuration. For example, you can add one HIP profile, a list of HIP profiles, or you can add HIP profiles manually. |
| --- | --- |






| • | **no-hip**—HIP information is not required. This setting enables access from third-party clients that cannot collect or submit HIP information. |
| --- | --- |







 Source Subscriber


 **Source**


 **Add** one or more source subscribers in a 5G or 4G network using the following formats:



| • | **Any** |
| --- | --- |






| • | (`5G only`) 5G Subscription Permanent Identifier (SUPI) including IMSI |
| --- | --- |






| • | IMSI (14 or 15 digits) |
| --- | --- |






| • | Range of IMSI values from 11 to 15 digits, separated by a hyphen |
| --- | --- |






| • | IMSI prefix of six digits, with an asterisk (*) as a wildcard after the prefix |
| --- | --- |






| • | EDL that specifies IMSIs |
| --- | --- |







 Source Equipment


 **Add** one or more source equipment IDs in a 5G or 4G network using the following formats:



| • | **Any** |
| --- | --- |






| • | (`5G only`) 5G Permanent Equipment Identifier (PEI) including International Mobile Equipment Identity (IMEI) |
| --- | --- |






| • | IMEI (11 to 16 digits long) |
| --- | --- |






| • | IMEI prefix of eight digits for Type Allocation Code (TAC) |
| --- | --- |






| • | EDL that specifies IMEIs |
| --- | --- |







 Network Slice


 **Source**


 **Add** one or more source network slices based on network slice service type (SST) in a 5G network, as follows:



| • | **Standardized (predefined) SST** |
| --- | --- |






| ◦ | **eMBB** (enhanced Mobile Broadband)—For faster speeds and high data rates, such as video streaming. |
| --- | --- |






| ◦ | **URLLC** (Ultra-Reliable Low-Latency Communications)—For mission-critical applications that are sensitive to latency, such as critical IoT (healthcare, wireless payments, home control, and vehicle communication). |
| --- | --- |






| ◦ | **MIoT** (Massive Internet of Things)—For example, smart metering, smart waste management, anti-theft, asset management, and location tracking. |
| --- | --- |






| • | **Network Slice SST - Operator-Specific**—You name and specify the slice. The format of the slice name is text followed by a comma (,) and a number (range is 128 to 255). For example, Enterprise Oil2,145. |
| --- | --- |







 Destination Zone


 **Destination**


 **Add** destination zones (default is **any**). Zones must be of the same type (Layer 2, Layer 3, or virtual wire). To define new zones, refer to [Network > Zones](network-zones.html#ID0EC6TT).
 Multiple zones can be used to simplify management. For example, if you have three different internal zones (Marketing, Sales, and Public Relations) that are all directed to the untrusted destination zone, you can create one rule that covers all cases.
 Note:



| | On intrazone rules, you cannot define a Destination Zone because these types of rules match only traffic with a source and a destination within the same zone. To specify the zones that match an intrazone rule, you need to specify only the Source Zone. |
| --- | --- |







 Destination Address


 **Add** destination addresses, address groups, or regions (default is **Any**). Select from the drop-down or click **Address** object, **Address Group**, or **Regions** (bottom of the drop-down) to specify address settings. [Objects>Addresses](objects-addresses.html#ID0E16TQ) and [Objects>AddressGroups](objects-address-groups.html#ID0E12UQ) describe the types of address objects and address groups, respectively, that a Security policy rule supports.
 Selecting the **Negate** option will apply the rule to destination addresses in the specified zone except for the addresses specified.




 Destination Device


 **Add** the host devices subject to the policy:



| • | **any**—Includes any device. |
| --- | --- |






| • | **quarantine**—Includes any device that is in the quarantine list (**Device** > **Device Quarantine**). |
| --- | --- |






| • | **select**—Includes selected devices as determined by your configuration. For example, you can add a device object based on model, OS, OS family, or vendor. |
| --- | --- |







 Application


 **Application**


 **Add** specific applications for the Security policy rule. If an application has multiple functions, you can select the overall application or individual functions. If you select the overall application, all functions are included and the application definition is automatically updated as future functions are added.
 If you are using application groups, filters, or containers in the Security policy rule, you can view details of these objects by hovering over the object in the Application column, opening the drop-down, and selecting **Value**. This allows you to view application members directly from the policy without having to navigate to the **Object** tab.
 Fastpath:
 Always specify one or more applications so that only applications you want on your network are allowed, which reduces the attack surface and gives you greater control over network traffic. Don’t set the application to **any**, which allows any application’s traffic and increases the attack surface.




 Service


 **Service/URL Category**


 Select the services that you want to limit to specific TCP or UDP port numbers. Choose one of the following from the drop-down:



| • | **any**—The selected applications are allowed or denied on any protocol or port. |
| --- | --- |






| • | **application-default**—The selected applications are allowed or denied only on their default **ports defined by Palo Alto Networks**®. This option is recommended for allow policies because it prevents applications from running on unusual ports and protocols which, if unintentional, can be a sign of undesired application behavior and usage. |
| --- | --- |



 Note:



| | When you use this option, the firewall still checks for all applications on all ports, but applications are allowed only on their default ports and protocols. |
| --- | --- |



 Fastpath:
 For most applications, use **application-default** to prevent the application from using non-standard ports or exhibiting other evasive behaviors. If the default port for the application changes, the firewall automatically updates the rule to the correct default port. For applications that use non-standard ports, such as internal custom applications, either modify the application or create a rule that specifies the non-standard ports and apply the rule only to the traffic that requires the application.



| • | **Select**—**Add** an existing service or choose **Service** or **Service Group** to specify a new entry. (Or select [Objects > Services](objects-services.html#ID0EIQ2Q) and [Objects > Service Groups](objects-service-groups.html#ID0EBI3Q)). |
| --- | --- |







 URL Category


 Select URL categories for the security rule.



| • | Choose **any** to allow or deny all sessions regardless of the URL category. |
| --- | --- |






| • | To specify a category, **Add** one or more specific categories (including custom categories) from the drop-down. Select [Objects > External Dynamic Lists](objects-external-dynamic-lists.html#ID0EO4AR) to define custom categories. |
| --- | --- |







 Action Setting


 **Actions**


 Select the **Action** the firewall takes on traffic that matches the attributes defined in a rule:



| • | **Allow** (default)—Allows the matched traffic. |
| --- | --- |






| • | **Deny**—Blocks matched traffic and enforces the default Deny Action defined for the application that is denied. To view the deny action defined by default for an application, view the application details (**Objects** > **Applications**). |
| --- | --- |



 Because the default deny action varies by application, the firewall could block the session and send a reset for one application while it silently drops the session for another application.



| • | **Drop**—Silently drops the application. A TCP reset is not sent to the host or application unless you select **Send ICMP Unreachable**. |
| --- | --- |






| • | **Reset client**—Sends a TCP reset to the client-side device. |
| --- | --- |






| • | **Reset server**—Sends a TCP reset to the server-side device. |
| --- | --- |






| • | **Reset both client and server**—Sends a TCP reset to both the client-side and server-side devices. |
| --- | --- |






| • | **Send ICMP Unreachable**—Available only for Layer 3 interfaces. When you configure Security policy rule to drop traffic or to reset the connection, the traffic does not reach the destination host. In such cases, for all UDP traffic and for TCP traffic that is dropped, you can enable the firewall to send an ICMP Unreachable response to the source IP address from where the traffic originated. Enabling this setting allows the source to gracefully close or clear the session and prevents applications from breaking. |
| --- | --- |



 To view the ICMP Unreachable Packet Rate configured on the firewall, view Session Settings (**Device** > **Setup** > **Session**).
 To override the default action defined on the predefined interzone and intrazone rules: see [Overriding or Reverting a Security Policy Rule](overriding-or-reverting-a-security-policy-rule.html#ID0E5PSO).




 Profile Setting


 **Actions**


 To specify the additional checking that the firewall performs on packets that match the Security profile rule, select individual Antivirus, Vulnerability Protection, Anti-Spyware, URL Filtering, File Blocking, Data Filtering, WildFire Analysis, [Mobile Network Protection](objects-security-profiles-mobile-network-protection.html#ID0EJAZR), and [SCTP Protection](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-security) profiles.
 To specify a profile group rather than individual profiles, select the **Profile Type** to be **Group** and then select a **Group Profile**.
 To define new profiles or profile groups, click **New** next to the appropriate profile or select **New Group Profile**.
 You can also attach Security Profiles (or profile groups) to the default rules.




 Log Setting and Other Settings


 **Actions**


 To generate entries in the local traffic log for traffic that matches this rule, select the following options:



| • | **Log At Session Start** (disabled by default)—Generates a traffic log entry for the start of a session. |
| --- | --- |



 Fastpath:
 Don’t enable **Log at Session Start** except for troubleshooting purposes or for tunnel session logs to show active GRE tunnels in the ACC. Logging at the session end consumes fewer resources and identifies the exact application if the application changes after a few packets, for example, from facebook-base to facebook-chat.



| • | **Log At Session End** (enabled by default)—Generates a traffic log entry for the end of a session. |
| --- | --- |



 Note:



| | If the session start or end entries are logged, drop and deny entries are also logged. |
| --- | --- |






| • | **Log Forwarding Profile**—To forward the local traffic log and threat log entries to remote destinations, such as Panorama and syslog servers, select a **Log Forwarding Profile**. |
| --- | --- |



 Note:



| | The generation of threat log entries is determined by the Security Profiles. Define **New** log profiles as needed (refer to [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R)). |
| --- | --- |



 Fastpath:
 Create and enable Log Forwarding profiles to send logs to dedicated external storage devices. This preserves the logs because the firewall has limited log storage space and when the space is consumed, the firewall purges the oldest logs.
 You can also modify the log settings on the default rules. Specify any combination of the following options:



| • | **Schedule**—To limit the days and times when the rule is in effect, select a schedule from the drop-down. Define **New** schedules as needed (refer to [Settings to Control Decrypted SSL Traffic](settings-to-control-decrypted-ssl-traffic.html#ID0EGEDS)). |
| --- | --- |






| • | **QoS Marking**—To change the Quality of Service (QoS) setting on packets matching the rule, select **IP DSCP** or **IP Precedence** and enter the QoS value in binary form or select a predefined value from the drop-down. For more information on QoS, refer to [Quality of Service](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/quality-of-service). |
| --- | --- |






| • | **Disable Server Response Inspection**—Disables packet inspection from the server to the client. The option is disabled by default. |
| --- | --- |



 Fastpath:
 For the best security posture, do not enable **Disable Server Response Inspection**. With this option selected, the firewall only inspects the client-to-server flows. It does not inspect the server-to-client flows and therefore cannot identify if there are any threats in these traffic flows.




 Basics


 **Rule Usage**





| • | **Rule Created**—Creation date and time of the rule. |
| --- | --- |






| • | **Last Edited**—The last date and time the rule was edited. |
| --- | --- |







 Activity


 **Rule Usage**





| • | **Hit Count**—The total number of times traffic matched (hit) the rule. |
| --- | --- |






| • | **First Hit**—Time of the first rule match. |
| --- | --- |






| • | **Last Hit**—Time of the last rule match. |
| --- | --- |







 Applications


 **Rule Usage**





| • | **Applications Seen**—The number of applications the rule allows. |
| --- | --- |






| • | **Last App Seen**—The number of days since the last new application (an application that wasn’t previously seen) was seen on the rule. |
| --- | --- |






| • | **Compare Applications & Applications Seen**—Click to compare the applications configured on the rule against the applications seen on the rule. Use this tool to discover the applications that match the rule and to add applications to the rule. |
| --- | --- |







 Traffic (past 30 days)


 **Rule Usage**





| • | **Bytes**—The amount of traffic on the rule over the past 30 days in bytes. |
| --- | --- |



 Note:



| | A time period longer than 30 days would result in the oldest rules remaining at the top of the list because they are likely to have the most cumulative traffic. This can result in newer rules being listed below older rules even if the newer rules see heavy traffic. |
| --- | --- |







 Any (target all devices)
 `Panorama only`


 **Target**


 Enable (check) to push the policy rule to all managed firewalls in the device group.




 Devices
 `Panorama only`


 Select one or more managed firewalls associated with the device group to push the policy rule to.




 Tags
 `Panorama only`


 **Add** one or more tags to push the policy rule to managed firewalls in the device group with the specified tag.




 Target to all but these specified devices and tags
 `Panorama only`


 Enable (check) to push the policy rule to all managed firewalls associated with the device group except for the selected device(s) and tag(s).



 Parent topic
 [Policies > Security](policies-security.html#ID0ESNMO)