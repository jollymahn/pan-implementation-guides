# Applications and Usage

*Policies : Policies &gt; Security : Applications and Usage*

Applications and Usage



| • | **Policies** > **Security** > **Policy Optimizer** > **New App Viewer** and then click the number in **Apps Seen** or click **Compare**. |
| --- | --- |



 Note:



| | You must have a SaaS Inline Security subscription to see the New App Viewer in the interface. The New App Viewer includes cloud-delivered applications in addition to content-delivered applications and if you don’t have a SaaS Inline Security subscription, you don’t receive cloud-delivered applications. |
| --- | --- |






| • | **Policies** > **Security** > **Policy Optimizer** > **Rules Without App Controls** and then click the number in **Apps Seen** or click **Compare**. |
| --- | --- |






| • | **Policies** > **Security** > **Policy Optimizer** > **Unused Apps** and then click the number in **Apps Seen** or click **Compare**. |
| --- | --- |






| • | **Policies** > **Security** and then click the number in **Apps Seen** |
| --- | --- |




On the Usage tab of the Security policy rule, you can also **Compare Applications & Applications Seen** to access tools that help you to migrate from port-based Security policy rules to application-based Security policy rules and to eliminate unused applications from rules in **Applications & Usage**.



| Field | Description |
| --- | --- |
| Timeframe | The time period for the application information: • |






| • | **Past 7 days**—Displays only applications seen over the last 7 days. |
| --- | --- |






| • | **Past 15 days**—Displays only applications seen over the last 15 days. |
| --- | --- |






| • | **Past 30 days**—Displays only applications seen over the last 30 days. |
| --- | --- |







 Apps on Rule


 The applications configured on the rule or **Any** if no specific applications are configured on the rule. You can **Browse**, **Add**, and **Delete** applications as needed, and applications are configured on a rule, the circled number next to Apps on Rule indicates how many. Adding applications from this location is the same as adding applications on the Security policy rule **Application** tab.




 Apps Seen


 All applications seen and allowed on the firewall that matched the rule. The number next to Apps Seen indicates how many applications were seen on the rule.



| • | **Applications**—The applications seen on the rule. For example, if a rule allows web-browsing traffic (as seen in Apps on Rule), you may see many applications in the Apps Seen list because there are many applications identified as web-browsing. |
| --- | --- |






| • | **Subcategory**—The subcategory of the application. |
| --- | --- |






| • | **Risk**—The risk rating of the application. |
| --- | --- |






| • | **First Seen**—The first day the application was seen on the network. |
| --- | --- |






| • | **Last Seen**—The most recent day the application was seen on the network. |
| --- | --- |



 Note:



| | The granularity of measurement for First Seen and Last Seen is one day, so on the day you define a rule, the First Day and Last Day are the same day. |
| --- | --- |






| • | **Traffic (30 days)**—The amount of traffic in bytes seen during the last 30-day period. |
| --- | --- |



 Note:



| | A longer time period would result in the oldest rules remaining at the top of the list because they are likely to have the most cumulative traffic. This can result in newer rules being listed below older rules even if the newer rules see heavy traffic. |
| --- | --- |







 Apps Seen Actions


 Actions you can perform on **Apps Seen**:



| • | **Create Cloned Rule**—Clones the current rule. When migrating from port-based rules to application-based rules, clone the port-based rule first and then edit the clone to create the application-based rule that allows the traffic. The cloned rule is inserted above the port-based rule in the policy list. Use this migration method to ensure that you don’t inadvertently deny traffic that you want to allow—if the cloned rule doesn’t allow all the applications you need, the port-based rule that follows allows them. Monitor the port-based rule and adjust the (cloned) application-based rule as needed. When you’re sure the application-based rule allows the traffic you want and only unwanted traffic filters through to the port-based rule, you can safely remove the port-based rule. |
| --- | --- |



 Cloning offers similar advantages for applications seen in the **New App Viewer** and enables you to move newly identified cloud applications as well as content-provided applications into Security policy rules that enable you to control the application and access.
 You can select adding applications to a cloned rule individually, in an Application Group, or in an Application Filter.



| • | **Add to This Rule** (Not available for New App Viewer)—Adds applications from Apps Seen to the rule. Adding applications to the rule transforms a rule configured to match **Any** application (a port-based rule) to an application-based rule that allows the applications you specify (the new application-based rule replaces the port-based rule). The rule denies any applications that you don’t add just as with any other application-based rule. Be sure to identify all applications you want to allow and add them to the rule so you don’t accidentally deny an application. |
| --- | --- |






| • | **Add to Existing Rule**—Adds applications from Apps Seen to an existing application-based (App-ID) rule. For example, this enables you to clone an App-ID-based rule from a port-based rule and then add more applications seen on port-based rules to that App-ID rule later. |
| --- | --- |



 For applications seen in the New App Viewer, you can organize newly identified cloud-based and content-based applications into sensible Security policy rules as new apps are discovered.
 You can select adding applications to an existing rule individually, in an Application Group, or in an Application Filter.



| • | **Match Usage** (Not available for New App Viewer)—Moves all Apps Seen into the rule (they are listed under Apps on Rule after you **Match Usage**). If you are certain that the rule should allow all listed applications, **Match Usage** is very convenient. However, you must be certain that all listed applications are applications you want to allow on your network. If many applications have been seen on the rule (for example, on a rule that allows web-browsing), it’s better to clone the rule and transition to an application-based rule. **Match Usage** works well for simple rules with well-known applications. For example, if a port-based rule for port 22 has only seen SSH traffic (and that’s all it should see), it’s safe to **Match Usage**. |
| --- | --- |



 The **Clone**, **Add to Rule**, and **Add Apps to Existing Rule** dialogs help to ensure that applications don’t break and enable you to future-proof the rule by including relevant individual applications that are related to the applications you’re cloning or adding to a rule.




 Create Cloned Rule > Applications
 Add to This Rule
 Add to Existing Rule > Applications


 Select applications and then clone or add individual applications to a rule:



| • | **Name** (Clone and Add Apps to Existing Rule dialogs only). |
| --- | --- |






| ◦ | Clone: Enter the name of the new cloned rule. |
| --- | --- |






| ◦ | Add Apps to Existing Rule: Select the rule to which to add applications or enter the name of the rule. |
| --- | --- |






| • | **Applications**: |
| --- | --- |






| ◦ | Add container app (default): Selects all apps in the container, apps seen on the rule, and container apps that have not been seen on the rule. Future apps seen for the container will match the rule, thus future-proofing it as the app changes. |
| --- | --- |






| ◦ | Add specific apps seen: Selects only apps that have actually been seen on the rule. (You can also manually select container apps and functional apps.) |
| --- | --- |






| • | **Application**: |
| --- | --- |






| ◦ | The selected applications seen on the rule, highlighted green. |
| --- | --- |






| ◦ | Container apps, highlighted gray, with their functional applications listed below. |
| --- | --- |






| ◦ | Functional applications in a container that have been seen on the rule but were not selected in **Applications & Usage** (not highlighted). |
| --- | --- |






| ◦ | Functional applications in a container that has not been seen on the rule (italicized). |
| --- | --- |






| ◦ | The date applications were **Last Seen** on the rule. |
| --- | --- |






| • | **Dependent Applications**: |
| --- | --- |






| ◦ | Applications required for the selected applications to run. |
| --- | --- |






| ◦ | **Depends On**—The dependent applications that the selected applications require to run. |
| --- | --- |






| ◦ | **Required By**—The application that requires the dependent application. (Sometimes a dependent application has dependent applications.) |
| --- | --- |







 Create Cloned Rule > Application Group
 Add to Existing Rule > Application Group


 Select applications and then clone or add applications to a rule in an Application Group in the **Create Cloned Rule** or **Add Apps to Existing Rule** dialog box:



| • | **Cloned Rule Name** or **Name**: |
| --- | --- |






| ◦ | Cloned Rule Name: Enter the name of the new cloned rule. |
| --- | --- |






| ◦ | Name: Select the rule to which to add the Application Group or enter the name of the rule. |
| --- | --- |






| • | **Policy Action** (Cloned rule only)—Select whether to allow or deny the traffic in the cloned rule. |
| --- | --- |






| • | **Add to Application Group**—Select an existing group or type a new name to create a new Application Group. |
| --- | --- |






| • | **Applications**: |
| --- | --- |






| ◦ | Add container app (default): Selects all apps in the container, apps seen on the rule, and container apps that have not been seen on the rule. Future apps seen for the container will match the rule, thus future-proofing it as the app changes. |
| --- | --- |






| ◦ | Add specific apps seen: Selects only apps that have actually been seen on the rule. (You can also manually select container apps and functional apps.) |
| --- | --- |






| • | **Application**: |
| --- | --- |






| ◦ | The selected applications seen on the rule, highlighted green. |
| --- | --- |






| ◦ | Container apps, highlighted gray, with their functional applications listed below. |
| --- | --- |






| ◦ | Functional applications in a container that have been seen on the rule but were not selected in **Applications & Usage** (not highlighted). |
| --- | --- |






| ◦ | Functional applications in a container that has not been seen on the rule (italicized). |
| --- | --- |






| ◦ | The date applications were **Last Seen** on the rule. |
| --- | --- |






| • | **Dependent Applications**: |
| --- | --- |






| ◦ | Applications required for the selected applications to run. |
| --- | --- |






| ◦ | **Depends On**—The dependent applications that the selected applications require to run. |
| --- | --- |






| ◦ | **Required By**—The application that requires the dependent application. (Sometimes a dependent application has dependent applications.) |
| --- | --- |







 Create Cloned Rule > Application Filter
 Add to Existing Rule > Application Filter


 Select applications and then clone or add applications to a rule in an Application Filter in the **Create Cloned Rule** or **Add Apps to Existing Rule** dialog box:



| • | **Cloned Rule Name** or **Existing Rule Name**: |
| --- | --- |






| ◦ | Cloned Rule Name: Enter the name of the new cloned rule. |
| --- | --- |






| ◦ | Existing Rule Name: Select the rule to which to add the Application Filter or enter the name of the rule. |
| --- | --- |






| • | **Policy Action** (Cloned rule only)—Select whether to allow or deny the traffic in the cloned rule. |
| --- | --- |






| • | **Application Filter Name**—Select an existing filter or type a new name to create a new Application Filter. |
| --- | --- |



 The Application Filter works the same way as **Objects** > **Application Filters** (see [Create an Application Filter](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/use-application-objects-in-policy/create-an-application-filter.html)). You can filter cloud-based (with a SaaS Inline Security subscription) and content-based applications and add them to existing or new filters.



 Parent topic
 [Policies > Security](policies-security.html#ID0ESNMO)