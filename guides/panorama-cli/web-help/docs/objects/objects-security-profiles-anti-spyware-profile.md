# Objects > Security Profiles > Anti-Spyware Profile

*Objects : Objects &gt; Security Profiles &gt; Anti-Spyware Profile*

## Objects > Security Profiles > Anti-Spyware Profile


You can attach an Anti-Spyware profile to a Security policy rule to detect connections initiated by spyware and various types of command-and-control (C2) malware installed on systems on your network. You can choose between two predefined Anti-Spyware profiles to attach to a Security policy rule. Each profile has a set of predefined rules (with threat signatures) organized by the severity of the threat; each threat signature includes a default action that is specified by Palo Alto Networks.




| • | Default—The default profile uses the default action for critical, high, medium, and low severity signatures, as specified by the Palo Alto Networks content package when the signature is created. It does not include a signature policy for events classified as informational. |
| --- | --- |






| • | Strict—The strict profile overrides the action defined in the signature file for critical, high, and medium severity threats, and sets it to the **reset-both** action. The default action is taken with low and informational severity threats. |
| --- | --- |






| • | You can also create custom profiles. You can, for example, reduce the stringency for Anti-Spyware inspection for traffic between trusted security zones, and maximize the inspection of traffic received from the internet, or traffic sent to protected assets such as server farms. |
| --- | --- |




The following tables describe the [Anti-Spyware profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-profiles.html) settings:



| Anti-Spyware Profile Settings | Description |
| --- | --- |
| Name | Enter a profile name (up to 31 characters). This name appears in the list of Anti-Spyware profiles when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, periods, and underscores. |
| Description | Enter a description for the profile (up to 255 characters). |
| Shared (`Panorama only`) | Select this option if you want the profile to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the profile will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this Anti-Spyware profile in device groups that inherit the profile. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the profile.




 **Signature Policies Tab**
 Anti-Spyware rules allow you to define a custom severity and action to take on any threat, a specific threat name that contains the text that you enter, and/or by a threat category, such as adware.
 **Add** a new rule, or you can select an existing rule to and select **Find Matching Signatures** to filter threat signatures based on that rule.




 Rule Name


 Specify the rule name.




 Threat Name


 Enter **any** to match all signatures, or enter text to match any signature containing the entered text as part of the signature name.




 Category


 Choose a category, or choose **any** to match all categories.




 Action


 Choose an action for each threat. For a list of actions, see [Actions in Security Profiles](actions-in-security-profiles.html#ID0EWXJR).
 The **Default** action is based on the pre-defined action that is part of each signature provided by Palo Alto Networks. To view the default action for a signature, select **Objects** > **Security Profiles** > **Anti-Spyware** and **Add** or select an existing profile. Click the **Exceptions** tab and then click **Show all signatures** to see a list of all signatures and the associated **Action**.
 Fastpath:
 For the best security, use the Action settings in the predefined **strict** profile.




 Packet Capture


 Select this option if you want to capture identified packets.
 Note:



| | Threats that are detected using the advanced Inline Cloud Analysis engines do not generate packet capture data. |
| --- | --- |



 Select **single-packet** to capture one packet when a threat is detected, or select the **extended-capture** option to capture from 1 to 50 packets (default is 5 packets). Extended-capture provides more context about the threat when analyzing the threat logs. To view the packet capture, select **Monitor** > **Logs** > **Threat**, locate the log entry you are interested in, and then click the green down arrow in the second column. To define the number of packets to capture, select **Device** > **Setup** > **Content-ID** and then edit the Content-ID™ Settings.
 If the action for a given threat is allow, the firewall does not trigger a Threat log and does not capture packets. If the action is alert, you can set the packet capture to single-packet or extended-capture. All blocking actions (drop, block, and reset actions) capture a single packet. The content package on the device determines the default action.
 Fastpath:
 Enable extended-capture for critical, high, and medium severity events. Use the default extended-capture value of 5 packets, which provides enough information to analyze the threat in most cases. (Too much packet capture traffic may result in dropping packet captures.) Don’t enable extended-capture for informational and low severity events because it’s not very useful compared to capturing information about higher severity events and creates a relatively high volume of low-value traffic.




 Severity


 Choose a severity level (**critical**, **high**, **medium**, **low**, or **informational**).




 **Signature Exceptions Tab**
 Allows you to change the action for a specific signature. For example, you can generate alerts for a specific set of signatures and block all packets that match all other signatures. Threat exceptions are usually configured when false-positives occur. To make management of threat exceptions easier, you can add threat exceptions directly from the **Monitor** > **Logs** > **Threat** list. Ensure that you obtain the latest content updates so that you are protected against new threats and have new signatures for any false-positives.




 Exceptions


 **Enable** each threat for which you want to assign an action or select **All** to respond to all listed threats. The list depends on the selected host, category, and severity. If the list is empty, there are no threats for the current selections.
 Use IP Address Exemptions to add IP address filters to a threat exception. If IP addresses are added to a threat exception, the threat exception action for that signature overrides the action for a rule only when the signature is triggered by a session with a source or destination IP address that matches an IP address in the exception. You can add up to 100 IP addresses per signature. With this option, you do not have to create a new policy rule and new vulnerability profile to create an exception for a specific IP address.
 Fastpath:
 Create an exception only if you are sure that a signature identified as spyware is not a threat (it is a false positive). If you believe you discovered a false positive, open a support case with TAC so Palo Alto Networks can analyze and fix the incorrectly identified signature. As soon as the issue is resolved, remove the exception from the profile.




 **DNS Policies Tab**
 The **DNS Policies** settings provide an additional method of identifying infected hosts on a network. These signatures detect specific DNS lookups for host names that have been associated with DNS-based threats.




 You can configure specific DNS signature sources with separate policy actions, log severity level, and packet capture settings. Hosts that perform DNS queries for malware domains will appear in the botnet report. Additionally, you can specify sinkhole IPs in the **DNS Sinkhole Settings** if you are sinkholing malware DNS queries.




 Signature Source


 Allows you to select the lists for which you want to enforce an action when a DNS query occurs. There are two default DNS signature policy options:



| • | **Palo Alto Networks Content**—A local downloadable signature list that is updated through dynamic content updates. |
| --- | --- |






| • | **DNS Security**—A cloud-based DNS security service that performs pro-active analysis of DNS data and provides real-time access to the complete Palo Alto Networks DNS signature database. |
| --- | --- |



 Note:



| | This service requires the purchase and activation of the DNS Security license in addition to a Threat Prevention license. |
| --- | --- |






| • | **Advanced DNS Security**—The Advanced DNS Security service provides all the features of DNS Security and expands upon that with domain detectors operating in the Advanced DNS Security cloud that inspect changes in DNS responses to detect various types of DNS hijacking in real-time. |
| --- | --- |



 Note:



| | This service requires the purchase and activation of the Advanced DNS Security license in addition to an Advanced Threat Prevention or Threat Prevention license. |
| --- | --- |






| • | **External Dynamic Lists**—EDLs operating as a domain list can be used to enforce a specific action for a selection of domains, for example, as an alert list. By default, policy actions for domain lists are configured to Allow. |
| --- | --- |



 Note:



| | An EDL allow list does not have precedence over the domain policy action specified under DNS Security. As a result, when there is a domain match to an entry in the EDL and a DNS Security domain category, the action specified under DNS Security is still applied, even when the EDL is explicitly configured with an action of allow. If you want to add DNS domain exceptions, either configure an EDL with an Alert action or add them to the **DNS Domain/FQDN Allow List** located in the **DNS Exceptions** tab. |
| --- | --- |



 By default, the locally-accessed Palo Alto Networks Content DNS signatures are sinkholed, while the cloud-based DNS Security is set to allow. If you want to enable sinkholing using DNS Security, you must configure the action on DNS queries to sinkhole. The default address used for sinkholing belongs to Palo Alto Networks (sinkhole.paloaltonetworks.com). This address is not static and can be modified through content updates on the firewall or Panorama.
 **Add** a new list and select the External Dynamic List of type Domain that you created. To create a new list, see [Objects > External Dynamic Lists](objects-external-dynamic-lists.html#ID0EO4AR).




 Log Severity


 Allows you to specify the log severity level that is recorded when the firewall detects a domain matching a DNS signature.




 Policy Action


 Choose an action to take when DNS lookups are made to known malware sites. The options are **alert**, **allow**, **block**, or **sinkhole**. The default action for Palo Alto Networks DNS signatures is **sinkhole**.
 The DNS sinkhole action provides administrators with a method of identifying infected hosts on the network using DNS traffic, even when the firewall is north of a local DNS server (for example, the firewall cannot see the originator of the DNS query). When a threat prevention license is installed and an Anti-Spyware profile is enabled in a Security Profile, the DNS-based signatures trigger on DNS queries directed at malware domains. In a typical deployment where the firewall is north of the local DNS server, the threat log identifies the local DNS resolver as the source of the traffic rather than the actual infected host. Sinkholing malware DNS queries solves this visibility problem by forging responses to the queries directed at malicious domains, so that clients attempting to connect to malicious domains (for command-and-control, for example) instead attempt connections to an IP address specified by the administrator. Infected hosts can then be easily identified in the traffic logs because any host that attempts to connect to the sinkhole IP are most likely infected with malware.
 Fastpath:
 Enable DNS sinkhole when the firewall can’t see the originator of the DNS query (typically when the firewall is north of the local DNS server) so you can identify infected hosts. If you can’t sinkhole the traffic, block it.




 Packet Capture


 Select this option for a given source if you want to capture identified packets.
 Fastpath:
 Enable packet capture on sinkholed traffic so you can analyze it and get information about the infected host.




 DNS Zone Misconfigurations


 For Advanced DNS Security to analyze and monitor for the presence of misconfigured domains, you must provide a list of public-facing parent domains within your network.
 For each domain added to the misconfiguration zone list, provide an optional description to assist you in identifying domain usage or ownership within your organization.
 Entries must have a "." separating the <SLD> and <TLD> used to form the domain name. For example, paloaltonetworks.com, whereby 'paloaltonetworks' indicates the second-level domain and 'com' indicates the top-level domain. Domain names that do not follow this convention get parsed as a hostname, which is considered a private domain, and will not get processed by Advanced DNS Security.
 Note:



| | TLDs (top-level domains) and root level domains cannot be added to the DNS Zone Misconfigurations list. |
| --- | --- |







 DNS Sinkhole Settings


 After sinkhole action is defined for a DNS signature source, specify an IPv4 and/or IPv6 address that will be used for sinkholing. By default, the sinkhole IP address is set to a Palo Alto Networks server. You can then use the traffic logs or build a custom report that filters on the sinkhole IP address and identify infected clients.
 The following is the sequence of events that will occur when an DNS request is sinkholed:
 Malicious software on an infected client computer sends a DNS query to resolve a malicious host on the Internet.
 The client's DNS query is sent to an internal DNS server, which then queries a public DNS server on the other side of the firewall.
 The DNS query matches a DNS entry in the specified DNS signature database source, so the sinkhole action will be performed on the query.
 The infected client then attempts to start a session with the host, but uses the forged IP address instead. The forged IP address is the address defined in the Anti-Spyware profile DNS Signatures tab when the sinkhole action is selected.
 The administrator is alerted of a malicious DNS query in the threat log, and can then search the traffic logs for the sinkhole IP address and can easily locate the client IP address that is trying to start a session with the sinkhole IP address.




 Block DNS Record Types


 Select the DNS resource record type(s) used by encrypted DNS queries that you want to block. This prevents the client from encrypting the client hello during the DNS resolution process, thereby blocking the exchange of any keying information.
 Options include **SVCB** (type 64), **HTTPS** (type 65), and **ANY** (type 255).
 Note:



| | To maintain optimal function of the security services of the firewall, Palo Alto Networks recommends blocking all ECH-supporting record types. |
| --- | --- |







 **DNS Exceptions Tab**
 The DNS signature exceptions allow you to exclude specific threat IDs from policy enforcement as well as specify domain/FQDN allow lists for approved domain sources.
 To add specific threats that you want to exclude from policy, select or search for a **Threat ID** and click **Enable**. Each entry provides the threat **Threat ID**, **Name**, and **FQDN** of the object.
 To **Add** a domain or FQDN allow list, provide the location of the allow list as well as an appropriate description.




 **Inline Cloud Analysis Tab**
 **Inline Cloud Analysis** allows you to enable and configure the settings for real-time analysis of advanced C2 threats on a per detection engine basis.




 **Enable cloud inline analysis**—Enables real-time analysis of advanced C2 threats across all available deep inline cloud analysis engines.




 Available Analysis Engines


 Certain analysis engines can be configured to perform fast, locally-operated, deep learning-based analysis of zero-day and other evasive threats. Specify whether to enable or disable Local Deep Learning for Advanced Threat Prevention.



| • | **Enable**—Local Deep Learning for the specified analysis detection module is enabled. |
| --- | --- |






| • | **Disable**—Local Deep Learning for the specified analysis detection module is disabled. |
| --- | --- |



 Note:



| | Due to the additional system resources necessary to run local Deep Learning detection modules, Local Deep Learning is only available on certain platforms. Refer to the [Advanced Threat Prevention Administration](https://docs.paloaltonetworks.com/advanced-threat-prevention) for more information about supported platforms. |
| --- | --- |



 For each available analysis engine representing a threat category, you can select one of the following actions that you want the firewall to enforce when a corresponding threat is detected:



| • | **Allow**—The website is allowed and no log entry is generated. |
| --- | --- |






| • | **Alert**—The website is allowed and a log entry is generated in the URL filtering log. |
| --- | --- |






| • | **Drop**—Drops the traffic. A reset action is not sent to the host/application. |
| --- | --- |






| • | **Reset-Client**—Resets the client-side connection. |
| --- | --- |






| • | **Reset-Server**—Resets the server-side connection. |
| --- | --- |






| • | **Reset-Both**—Resets the connection on both client and server ends. |
| --- | --- |



 Note:



| | The default action for all analysis engines is alert. |
| --- | --- |







 Exclude from Inline Cloud Analysis


 Allows you to select a URL or IP address exception list that bypasses the inline cloud analysis engines. Exceptions can be specified using URLs and/or IP addresses. URL exceptions include an EDL (external dynamic list) or a custom URL category, while IP address exceptions include an EDL or an Address object. Click **Add** to view and select from the available options. You can select the following list types:



| • | **EDL URL**—External Dynamic Lists containing a series of URLs or a custom URL category. |
| --- | --- |






| • | **IP Address**—IP address lists defined in an External Dynamic List or within an Address object. |
| --- | --- |



 Note:



| | Only create IP address and URL exceptions when the identified threats do not pose a danger, such as in the case of a false-positive. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)