# HIP Objects Patch Management Tab

*GlobalProtect : Objects &gt; GlobalProtect &gt; HIP Objects : HIP Objects Patch Management Tab*

HIP Objects Patch Management Tab



| • | **Objects** > **GlobalProtect** > **HIP Objects** > <hip-object> > **Patch Management** |
| --- | --- |




Select the **Patch Management** tab to enable HIP matching on the patch status of the GlobalProtect endpoints.



| HIP Object Patch Management Settings | Description |
| --- | --- |
| Patch Management | Select this option to enable matching on the patch management status of the host and enable the [Criteria](hip-objects-patch-management-tab.html#ID0EL261) and [Vendor](hip-objects-patch-management-tab.html#ID0EL261) tabs. |
| Criteria tab | Specify the following settings: • |






| • | **Is Enabled**—Match on whether patch management software is enabled on the host. If the **Is Installed** selection is cleared, this field is automatically set to **none** and is disabled for editing. |
| --- | --- |






| • | **Severity**—Select from the list of logical operators for matching on whether the host has missing patches of the specified severity value. |
| --- | --- |



 Use the following mappings between the GlobalProtect severity values and the OPSWAT severity ratings to understand what each value means:



| ◦ | **0**—Low |
| --- | --- |






| ◦ | **1**—Moderate |
| --- | --- |






| ◦ | **2**—Important |
| --- | --- |






| ◦ | **3**—Critical |
| --- | --- |






| • | **Check**—Match on whether the endpoint has missing patches. |
| --- | --- |






| • | **Patches**—Match on whether the host has specific patches. Click **Add** and enter the KB article IDs for the specific patches to check for. For example, enter 3128031 to check for the Update for Microsoft Office 2010 (KB3128031) 32-Bit Edition. |
| --- | --- |







 Vendor tab


 Define specific vendors of patch management software and products to look for on the endpoint to determine a match. Click **Add** and then choose a **Vendor** from the drop-down. Optionally, click Add to choose a specific **Product**. Click **OK** to save the settings.




The following is an example of a HIP report with both missing reports and a list of products in patch-management:

 <entry name="patch-management">**<list><entry><ProductInfo><Prod vendor="Microsoft Corporation" name="Windows Update Agent" version="10.0.19041.3031"/><is-enabled>yes</is-enabled></ProductInfo></entry></list><missing-patches><entry><title>2023-10 Cumulative Update Preview for Windows 10 Version 22H2 for x64-based Systems (KB5031445)</title><description>Install this update to resolve issues in Windows. For a complete listing of the issues that are included in this update, see the associated Microsoft Knowledge Base article for more information. After you install this item, you may have to restart your computer.</description><product></product><vendor>Microsoft Corporation</vendor><info-url></info-url><kb-article-id>5031445</kb-article-id><security-bulletin-id></security-bulletin-id><severity>2</severity><category>update</category><is-installed>no</is-installed></entry><entry><title>Visual Studio Client Detector Utility</title><description>The Visual Studio Client Detector Utility is a required component that must be installed on client machines in order for Visual Studio administrator updates to be properly recognized and received. It is used to detect the different versions of Visual Studio installed on the client machine, and it then determines if an administrator update is applicable. This utility is included with all updates to Visual Studio 2017, Visual Studio 2019, and Visual Studio 2022 since March 12, 2020, it is included with the Visual Studio administrator updates, and it is also available here as an independently installable package.</description><product></product><vendor>Microsoft Corporation</vendor><info-url></info-url><kb-article-id>5001148</kb-article-id><security-bulletin-id></security-bulletin-id><severity>2</severity><category>critical_update</category><is-installed>no</is-installed></entry>

is-installed** checks if (any/none/all) missing patch is installed and **is-enabled** checks if any hip report has some product detailed in the vendor tab that is enabled

 Parent topic
 [Objects > GlobalProtect > HIP Objects](objects-globalprotect-hip-objects.html#ID0EFM41)