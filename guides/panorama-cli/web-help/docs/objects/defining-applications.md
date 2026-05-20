# Defining Applications

*Objects : Objects &gt; Applications : Defining Applications*

Defining Applications

Select **Objects** > **Applications** to **Add** a new custom application for the firewall to evaluate when applying policies.



| New Application Settings | Description |
| --- | --- |
| Configuration Tab | |
| Name | Enter the application name (up to 31 characters). This name appears in the applications list when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, periods, hyphens, and underscores. The first character must be a letter. |
| Shared | Select this option if you want the application to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the application will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this application object in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object.




 Description


 Enter a description of the application for general reference (up to 255 characters).




 Category


 Select the application category, such as **email** or **database**. The category is used to generate the Top Ten Application Categories chart and is available for filtering (refer to [ACC](acc.html#ID0EJICM)).




 Subcategory


 Select the application subcategory, such as **email** or **database**. The subcategory is used to generate the Top Ten Application Categories chart and is available for filtering (refer to [ACC](acc.html#ID0EJICM)).




 Technology


 Select the technology for the application. By default, the Technology column is not displayed. **Show Technology Column** to select technologies to add to your application filter.




 Parent App


 Specify a parent application for this application. This setting applies when a session matches both the parent and the custom applications; however, the custom application is reported because it is more specific.




 Risk


 Select the risk level associated with this application (1=lowest to 5=highest).




 Characteristics


 Select the application characteristics that may place the application at risk. For a description of each characteristic, refer to [Characteristics](applications-overview.html#ID0EGJXQ).




 Advanced Tab




 Port


 If the protocol used by the application is TCP and/or UDP, select **Port** and enter one or more combinations of the protocol and port number (one entry per line). The general format is:
 <protocol>/<port>
 where the <port> is a single port number, or **dynamic** for dynamic port assignment.
 Examples: TCP/dynamic or UDP/32.
 This setting applies when using **app-default** in the Service column of a Security rule.




 IP Protocol


 To specify an IP protocol other than TCP or UDP, select **IP Protocol**, and enter the protocol number (1 to 255).




 ICMP Type


 To specify an Internet Control Message Protocol version 4 (ICMP) type, select **ICMP Type** and enter the type number (range is 0-255).




 ICMP6 Type


 To specify an Internet Control Message Protocol version 6 (ICMPv6) type, select **ICMP6 Type** and enter the type number (range is 0-255).




 None


 To specify signatures independent of protocol, select **None**.




 Timeout


 Enter the number of seconds before an idle application flow is terminated (range is 0-604800 seconds). A zero indicates that the default timeout of the application will be used. This value is used for protocols other than TCP and UDP in all cases and for TCP and UDP timeouts when the TCP timeout and UDP timeout are not specified.




 TCP Timeout


 Enter the number of seconds before an idle TCP application flow is terminated (range is 0-604800 seconds). A zero indicates that the default timeout of the application will be used.




 UDP Timeout


 Enter the number of seconds before an idle UDP application flow is terminated (range is 0-604800 seconds). A zero indicates that the default timeout of the application will be used.




 TCP Half Closed


 Enter the maximum length of time that a session remains in the session table, between receiving the first FIN and receiving the second FIN or RST. If the timer expires, the session is closed.
 Default: If this timer is not configured at the application level, the global setting is used (range is 1-604800 seconds).
 If this value is configured at the application level, it overrides the global TCP Half Closed setting.




 TCP Time Wait


 Enter the maximum length of time that a session remains in the session table after receiving the second FIN or a RST. If the timer expires, the session is closed.
 Default: If this timer is not configured at the application level, the global setting is used (range is 1-600 seconds).
 If this value is configured at the application level, it overrides the global TCP Time Wait setting.




 Scanning


 Select the scanning types that you want to allow based on Security Profiles (file types, data patterns, and viruses).




 Signatures Tab




 Signatures


 Click **Add** to add a new signature, and specify the following information:



| • | **Signature Name**—Enter a name to identify the signature. |
| --- | --- |






| • | **Comment**—Enter an optional description. |
| --- | --- |






| • | **Ordered Condition Match**—Select if the order in which signature conditions are defined is important. |
| --- | --- |






| • | **Scope**—Select whether to apply this signature only to the current **Transaction** or to the full user **Session**. |
| --- | --- |



 Specify the conditions that identify the signature. These conditions are used to generate the signature that the firewall uses to match the application patterns and control traffic:



| • | To add a condition, select **Add And Condition** or **Add Or Condition**. To add a condition within a group, select the group and then click **Add Condition**. |
| --- | --- |






| • | Select an **Operator** from the drop-down. The options are **Pattern Match**, **Greater Than**, **Less Than**, and **Equal To** and specify the following options: |
| --- | --- |



 (`For Pattern Match only`)



| ◦ | **Context**—Select from the available contexts. These contexts are updated using dynamic content updates. |
| --- | --- |






| ◦ | **Pattern**— Specify a regular expression to specify unique string context values that apply to the custom application. |
| --- | --- |



 Fastpath:
 Perform a packet capture to identify the context. See [Pattern Rules Syntax](syntax-for-regular-expression-data-patterns.html#ID0EQFFR) for pattern rules for regular expressions.
 (`For Greater Than, Less Than`)



| ◦ | **Context**—Select from the available contexts. These contexts are updated using dynamic content updates |
| --- | --- |






| ◦ | **Value**—Specify a value to match on (range is 0-4294967295). |
| --- | --- |






| ◦ | **Qualifier and Value**—(`Optional`) Add qualifier/value pairs. |
| --- | --- |



 (`For Equal To only`)



| ◦ | **Context**—Select from unknown requests and responses for TCP or UDP (for example, unknown-req-tcp) or additional contexts that are available through dynamic content updates (for example, dnp3-req-func-code). |
| --- | --- |



 For unknown requests and responses for TCP or UDP, specify



| ◦ | **Position**—Select between the first four or second four bytes in the payload. |
| --- | --- |






| ◦ | **Mask**—Specify a 4-byte hex value, for example, 0xffffff00. |
| --- | --- |






| ◦ | **Value**—Specify a 4-byte hex value, for example, 0xaabbccdd. |
| --- | --- |



 For all other contexts, specify a **Value** that is pertinent to the application.
 To move a condition within a group, select the condition and **Move Up** or **Move Down**. To move a group, select the group and **Move Up** or **Move Down**. You cannot move conditions from one group to another.



 Note:



| | It is not required to specify signatures for the application if the application is used only for application override rules. |
| --- | --- |



 Parent topic
 [Objects > Applications](objects-applications.html#ID0EOVWQ)