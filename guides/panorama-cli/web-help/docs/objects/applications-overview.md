# Applications Overview

*Objects : Objects &gt; Applications : Applications Overview*

Applications Overview

The Applications page lists various attributes of each application definition, such as the application’s relative security risk (1 to 5). The risk value is based on criteria such as whether the application can share files, is prone to misuse, or tries to evade firewalls. Higher values indicate higher risk.


The top application browser area of the page lists the attributes that you can use to filter the display as follows. The number to the left of each entry represents the total number of applications with that attribute.


 Note:



| | Weekly content releases periodically include new decoders and contexts for which you can develop signatures. |
| --- | --- |




The following table describes application details—custom applications and Palo Alto® Networks applications might display some or all of these fields.



| Application Details | Description |
| --- | --- |
| Name | Name of the application. |
| Description | Description of the application (up to 255 characters). |
| Additional Information | Links to web sources (Wikipedia, Google, and Yahoo!) that contain additional information about the application. |
| Standard Ports | Ports that the application uses to communicate with the network. |
| Depends on | List of other applications that are required for this application to run. When creating a policy rule to allow the selected application, you must also be sure that you are allowing any other applications that the application depends on. |
| Implicitly Uses | Other applications that the selected application depends on but that you do not need to add to your Security policy rules to allow the selected application because those applications are supported implicitly. |
| Previously Identified As | For a new App-ID™, or App-IDs that are changed, this indicates what the application was previously identified as. This helps you assess whether policy changes are required based on changes in the application. If an App-ID is disabled, sessions associated with that application will match policy as the previously identified as application. Similarly, disabled App-IDs will appear in logs as the application they were previous identified as. |
| Deny Action | App-IDs are developed with a default deny action that dictates how the firewall responds when the application is included in a Security policy rule with a deny action. The default deny action can specify either a silent drop or a TCP reset. You can override this default action in Security policy. |
| Characteristics | |
| Evasive | Uses a port or protocol for something other than its originally intended purpose with the hope that it will traverse a firewall. |
| Excessive Bandwidth | Consumes at least 1 Mbps on a regular basis through normal use. |
| Prone to Misuse | Often used for nefarious purposes or is easily set up to expose more than the user intended. |
| SaaS | On the firewall, Software as a Service (SaaS) is characterized as a service where the software and infrastructure are owned and managed by the application service provider but where you retain full control of the data, including who can create, access, share, and transfer the data. Keep in mind that in the context of how an application is characterized, SaaS applications differ from web services. Web services are hosted applications where either the user doesn’t own the data (for example, Pandora) or where the service is primarily comprised of sharing data fed by many subscribers for social purposes (for example, LinkedIn, Twitter, or Facebook). |
| Capable of File Transfer | Has the capability to transfer a file from one system to another over a network. |
| Tunnels Other Applications | Is able to transport other applications inside its protocol. |
| Used by Malware | Malware has been known to use the application for propagation, attack, or data theft, or is distributed with malware. |
| Has Known Vulnerabilities | Has publicly reported vulnerabilities. |
| Pervasive | Likely has more than 1,000,000 users. |
| Continue Scanning for Other Applications | Instructs the firewall to continue to try and match against other application signatures. If you do not select this option, the firewall stops looking for additional application matches after the first matching signature. Note:**If you configure a Vulnerability Protection profile on the Security policy rule that allows the traffic, the firewall continues scanning for other applications regardless of whether you enable or disable this option. |
| SaaS Characteristics | |
| Data Breaches | Applications that may have released secure information to an untrusted source within the past three years. |
| Poor Terms of Service | Applications with unfavorable terms of service that can compromise enterprise data. |
| No Certifications | Applications lacking current compliance to industry programs or certifications such as SOC1, SOC2, SSAE16, PCI, HIPAA, FINRAA, or FEDRAMP. |
| Poor Financial Viability | Applications with the potential to be out of business within the next 18 to 24 months. |
| No IP Restrictions | Applications without IP-based restrictions for user access. |
| Classification | |
| Category | The application category will be one of the following: • |






| • | collaboration |
| --- | --- |






| • | general-internet |
| --- | --- |






| • | media |
| --- | --- |






| • | networking |
| --- | --- |






| • | unknown |
| --- | --- |







 Subcategory


 The subcategory in which the application is classified. Different categories have different subcategories associated with them. For example, subcategories in the collaboration category include email, file-sharing, instant-messaging, Internet-conferencing, social-business, social-networking, voip-video, and web-posting. Whereas, subcategories in the business-systems category include auth-service, database, erp-crm, general-business, management, office-programs, software-update, and storage-backup.




 Technology


 The application technology will be one of the following:



| • | client-server: An application that uses a client-server model where one or more clients communicate with a server in the network. |
| --- | --- |






| • | network-protocol: An application that is generally used for system-to-system communication that facilitates network operation. This includes most of the IP protocols. |
| --- | --- |






| • | peer-to-peer: An application that communicates directly with other clients to transfer information instead of relying on a central server to facilitate the communication. |
| --- | --- |






| • | browser-based: An application that relies on a web browser to function. |
| --- | --- |







 Risk


 Assigned risk of the application.
 To customize this setting, click the **Customize** link, enter a value (1-5), and click OK**.




 Tags


 Tags assigned to an application.
 **Edit Tags** to add or remove tags for an application.




 Options




 Session Timeout


 Period of time, in seconds, required for the application to time out due to inactivity (range is 1-604800 seconds). This timeout is for protocols other than TCP or UDP. For TCP and UDP, refer to the next rows in this table.
 To customize this setting, click the **Customize** link, enter a value, and click **OK**.




 TCP Timeout (seconds)


 Timeout, in seconds, for terminating a TCP application flow (range is 1-604800).
 To customize this setting, click the **Customize** link, enter a value, and click **OK**.
 A value of 0 indicates that the global session timer will be used, which is 3600 seconds for TCP.




 UDP Timeout (seconds):


 Timeout, in seconds, for terminating a UDP application flow (range is 1-604800 seconds).
 To customize this setting, click the **Customize** link, enter a value, and click **OK**.




 TCP Half Closed (seconds)


 Maximum length of time, in seconds, that a session remains in the session table between receiving the first FIN packet and receiving the second FIN packet or RST packet. If the timer expires, the session is closed (range is 1-604800).
 Default: If this timer is not configured at the application level, the global setting is used.
 If this value is configured at the application level, it overrides the global **TCP Half Closed** setting.




 TCP Time Wait (seconds)


 Maximum length of time, in seconds, that a session remains in the session table after receiving the second FIN packet or a RST packet. If the timer expires, the session is closed (range is 1-600).
 Default: If this timer is not configured at the application level, the global setting is used.
 If this value is configured at the application level, it overrides the global **TCP Time Wait** setting.




 App-ID Enabled


 Indicates whether the App-ID is enabled or disabled. If an App-ID is disabled, traffic for that application will be treated as the **Previously Identified As** App-ID in both Security policy and in logs. For applications added after content release version 490, you have the ability to disable them while you review the policy impact of the new app. After reviewing policy, you may choose to **enable** the App-ID. You also have the ability to **disable** an application that you have previously enabled. On a multi-vsys firewall, you can disable App-IDs separately in each virtual system.




When the firewall is not able to identify an application using the App-ID, the traffic is classified as unknown: unknown-tcp or unknown-udp. This behavior applies to all unknown applications except those that fully emulate HTTP. For more information, refer to [Monitor > Botnet](monitor-botnet.html#ID0EQRCO).


You can create new definitions for unknown applications and then define security policies for the new application definitions. In addition, applications that require the same security settings can be combined into application groups to simplify the creation of security policies.

 Parent topic
 [Objects > Applications](objects-applications.html#ID0EOVWQ)