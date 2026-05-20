# Actions Supported on Applications

*Objects : Objects &gt; Applications : Actions Supported on Applications*

Actions Supported on Applications

You can perform any of the following actions on this page:



| Actions Supported for Applications | Description |
| --- | --- |
| Filter by application | • |



 The application is listed and the filter columns are updated to show statistics for the applications that matched the search. A search will match partial strings. When you define security policies, you can write rules that apply to all applications that match a saved filter. Such rules are dynamically updated when a new application is added through a content update that matches the filter.



| • | To filter by application attributes displayed on the page, click an item to use as a basis for filtering. For example, to restrict the list to the collaboration category, click **collaboration** and the list will display only applications in this category. |
| --- | --- |







| • | To filter on additional columns, select an entry in the other columns. The filtering is successive: Category filters are applied first, then Subcategory filters, then Technology filters, then Risk filters, and finally Characteristic filters. For example, if you apply a Category, Subcategory, and Risk filter, the Technology column is automatically restricted to the technologies that are consistent with the selected Category and Subcategory even though a Technology filter is not explicitly applied. Each time you apply a filter, the list of applications automatically updates. To [create](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/use-application-objects-in-policy/create-an-application-filter.html) a new application filter, see [Objects > Application Filters](objects-application-filters.html#ID0E4L2Q). |
| --- | --- |







 Add a new application.


 To add a new application, see [Defining Applications](defining-applications.html#ID0EULZQ).




 View and/or customize application details.


 Click the application name link, to view the application description including the standard port and characteristics of the application, risk among other details. For details on the application settings, see [Defining Applications](defining-applications.html#ID0EULZQ).
 If the icon to the left of the application name has a yellow pencil ( ), the application is a custom application.




 Disable an applications


 You can **Disable** an application (or several applications) so that the application signature is not matched against traffic. Security rules defined to block, allow, or enforce a matching application are not applied to the application traffic when the app is disabled. You might choose to disable an application that is included with a new content release version because policy enforcement for the application might change when the application is uniquely identified. For example, an application that is identified as web-browsing traffic is allowed by the firewall prior to a new content version installation; after installing the content update, the uniquely identified application no longer matches the Security rule that allows web-browsing traffic. In this case, you could choose to disable the application so that traffic matched to the application signature continues to be classified as web-browsing traffic and is allowed.




 Enable an application


 Select a disabled application and **Enable** it so that the firewall can manage the application according to your configured security policies.




 Import an application


 To import an application, click **Import**. Browse to select the file, and select the target virtual system from the **Destination** drop-down.




 Export an application


 To export an application, select this option for the application and click **Export**. Follow the prompts to save the file.




 Export an application configuration table


 Export the information on all applications in **PDF/CSV** format. Only visible columns in the web interface are exported. See [Export Configuration Table Data](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/use-the-web-interface/export-configuration-table-data#id17BKEF00FH3).




 Assess policy impact after installing a new content release


 **Review Policies** to assess the policy-based enforcement for applications before and after installing a content release version. Use the Policy Review dialog to review policy impact for new applications included in a downloaded content release version. The Policy Review dialog allows you to add or remove a pending application (an application that is downloaded with a content release version but is not installed on the firewall) to or from an existing Security policy rule; policy changes for pending applications do not take effect until the corresponding content release version is installed. You can also access the Policy Review dialog when downloading and installing content release versions on the **Device** > **Dynamic Updates** page.




 Tag an application


 A predefined tag named **sanctioned** is available for you to tag SaaS applications. While a SaaS application is an application that is identified as **Saas=yes** in the details on application characteristics, you can use the sanctioned tag on any application.
 Fastpath:
 Tag applications as **sanctioned** to help differentiate sanctioned SaaS application traffic from unsanctioned SaaS application traffic, for example, when you examine the SaaS Application Usage Report or when you evaluate the applications on your network.
 Select an application, click **Edit Tags** and from the drop-down, select the predefined **Sanctioned** tag to identify any application that you want to explicitly allow on your network. When you then generate the SaaS Application Usage Report (see [Monitor > PDF Reports > SaaS Application Usage](monitor-pdf-reports-saas-application-usage.html#ID0ESSGO)), you can compare statistics on the application that you have sanctioned versus unsanctioned SaaS applications that are being used on your network.
 When you tag an application as sanctioned, the following restrictions apply:



| • | The sanctioned tag cannot be applied to an application group. |
| --- | --- |






| • | The sanctioned tag cannot be applied at the **Shared** level; you can tag an application only per device group or per virtual system. |
| --- | --- |






| • | The sanctioned tag cannot be used to tag applications included in a container app, such as facebook-mail, which is part of the facebook container app. |
| --- | --- |



 You can also **Remove tag** or **Override tag**. The override option is only available on a firewall that has inherited settings from a device group pushed from Panorama.



 Parent topic
 [Objects > Applications](objects-applications.html#ID0EOVWQ)