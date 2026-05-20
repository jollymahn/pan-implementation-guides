# SD-WAN Application/Service Tab

*Policies : Policies &gt; SD-WAN : SD-WAN Application/Service Tab*

SD-WAN Application/Service Tab



| • | **Policies** > **SD-WAN** > **Application/Service** |
| --- | --- |




Select the **Application/Service** tab to specify the applications or services to which the SD-WAN policy rule applies and to specify profiles (Path Quality, SaaS Quality, and Error Correction profiles) that apply to the applications or services.



| Field | Description |
| --- | --- |
| Path Quality Profile | Select a path quality profile that determines the maximum jitter, latency and packet loss percentage thresholds you want to apply to the specified applications and services. If a path quality profile has not yet been created, you can create a **New SD-WAN Path Quality Profile**. |
| SaaS Quality Profile | Select a SaaS quality profile to specify the path quality thresholds for latency, jitter, and packet loss for a hub or branch firewall that has Direct Internet Access (DIA) link to a Software-as-a-Service (SaaS) application. If a SaaS quality profile has not yet been created, you can create a **New SaaS Quality Profile**. Default is **None (disabled)**. |
| Error Correction Profile | Select an **Error Correction Profile** or create a new [Error Correction Profile](objects-sd-wan-link-management-error-correction-profile.html#ID0EOOIS), which specifies the parameters to control forward error correction (FEC) or path duplication for the applications or services specified in the rule. This profile can be used by either hub or branch firewall. Default is **None (disabled)**. |
| Applications | **Add** specific applications for the SD-WAN policy rule, or select **Any**. If an application has multiple functions, select the overall application or individual functions. If you select the overall application, all functions are included and the application definition is automatically updated as future functions are added. If you are using application groups, filters, or containers in the SD-WAN policy rule, view details of these objects by hovering over the object in the Application column, opening the drop-down, and selecting **Value**. This allows you to view application members directly from the policy without having to navigate to the **Object** tab. Fastpath:  Add only business-critical applications that are affected by latency, jitter, or packet loss. Avoid adding application categories or sub-categories as these are too broad and do not allow for per-application control. |
| Service | **Add** specific services for the SD-WAN policy rule and select on which ports packets from these services are allowed or denied: • |






| • | **application-default**—The selected services are allowed or denied only on their default **ports defined by Palo Alto Networks**®. This option is recommended for policies that specify the **allow **action because it prevents services from running on unusual ports and protocols which, if unintentional, can be a sign of undesired service behavior and usage. |
| --- | --- |



 Note:



| | When you use this option, only the default port matches the SD-WAN policy and action is enforced. Other services not on the default port may be allowed depending on the Security policy rule, but do not match the SD-WAN policy, and no SD-WAN policy rule action is taken. |
| --- | --- |



 Fastpath:
 For most services, use **application-default** to prevent the service from using non-standard ports or exhibiting other evasive behaviors. If the default port for the service changes, the firewall automatically updates the rule to the correct default port. For services that use non-standard ports, such as internal custom services, either modify the service or create a rule that specifies the non-standard ports and apply the rule only to the traffic that requires the service.



| • | **Select**—**Add** an existing service or choose **Service** or **Service Group** to specify a new entry. (Or select [Objects > Services](objects-services.html#ID0EIQ2Q) and [Objects > Service Groups](objects-service-groups.html#ID0EBI3Q)). |
| --- | --- |






 Parent topic
 [Policies > SD-WAN](policies-sd-wan.html#ID0EQBPQ)