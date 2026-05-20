# Objects > Custom Objects > URL Category

*Objects : Objects &gt; Custom Objects &gt; URL Category*

## Objects > Custom Objects > URL Category


Use the custom URL category page to create your custom list of URLs and use it in a URL filtering profile or as match criteria in policy rules. In a custom URL category, you can add URL entries individually or you can import a text file that contains a list of URLs.

 Note:



| | URL entries added to custom categories are case insensitive. |
| --- | --- |




The following table describes the custom URL settings.



| Custom URL Category Settings | Description |
| --- | --- |
| Name | Enter a name to identify the custom URL category (up to 31 characters). This name displays in the category list when defining URL filtering policies and in the match criteria for URL categories in policy rules. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Description | Enter a description for the URL category (up to 255 characters). |
| Type | Select the category type: • |






| • | **URL List**—Select **URL List** to add or import a list of URLs for the category. This category type also contains URLs added before PAN-OS 9.0. |
| --- | --- |







 Shared


 Select this option if you want the URL category to be available to:



| • | Every virtual system (vsys) on a multi-vsys firewall. If you disable (clear) this option, the URL category is available only to the **Virtual System** selected in the **Objects** tab. |
| --- | --- |






| • | Every device group on Panorama. If you disable (clear) this option, the URL category is available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this custom URL object in device groups that inherit the object. This selection is disabled by default, which means administrators can override the settings for any device group that inherits the object.




 Sites


 Manage sites for the custom URL category (each URL added or imported can have a maximum of 255 characters).



| • | **Add**—**Add** URLs, only one per row. Each URL can be in the format “www.example.com” or can include wildcards, such as “*.example.com”. For additional information on supported formats, see Block List in [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR). |
| --- | --- |






| • | **Import**—**Import** and browse to select the text file that contains the list of URLs. Enter only one URL per row. Each URL can be in the format “www.example.com” or can include wildcards, such as “*.example.com”. For additional information on supported formats, see Block List in [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR). |
| --- | --- |






| • | **Export**—**Export** custom URL entries included in the list (exported as a text file). |
| --- | --- |






| • | **Delete**—**Delete** an entry to remove the URL from the list. |
| --- | --- |



 Note:



| | To delete a custom category that you used in a URL filtering profile, you must set the action to **None** before you can delete the custom category. See Category actions in [Objects > Security Profiles > URL Filtering](objects-security-profiles-url-filtering.html#ID0EQHQR). |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)