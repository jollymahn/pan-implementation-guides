# GlobalProtect Portals Agent HIP Data Collection Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Agent Tab : GlobalProtect Portals Agent HIP Data Collection Tab*

GlobalProtect Portals Agent HIP Data Collection Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Agent** > <agent-config> > **HIP Data Collection** |
| --- | --- |




Select the **HIP Data Collection** tab to define the data that the app collects from the endpoint in the HIP report:



| GlobalProtect HIP Data Collection Configuration Settings | Description |
| --- | --- |
| Collect HIP Data | Clear this option to prevent the app from collecting and sending HIP data. Fastpath:  Enable GlobalProtect to collect HIP data for HIP-based policy enforcement, so the firewall can match HIP data from endpoints against the HIP objects and/or HIP profiles you define and then apply the appropriate policy. |
| Max Wait Time (sec) | Specify how many seconds the app should search for HIP data before submitting the available data (range is 10-60; default is 20). |
| Certificate Profile | Select the certificate profile that the GlobalProtect portal uses to match the machine certificate sent by the GlobalProtect app. |
| Exclude Categories | Select **Exclude Categories** to specify the host information categories for which you do not want the app to collect HIP data. Select a **Category** (such as data-loss-prevention) to exclude from HIP collection. After selecting a category, you can **Add** a particular Vendor and, then, you can **Add** specific products from the vendor to further refine the exclusion as needed. Click **OK** to save settings in each dialog. (`Requires GlobalProtect app version 6.2.0 or later and content release version 8699-7991`) If you don't want to exclude an entire vendor, but you do want to [exclude specific patches from a vendor](https://docs.paloaltonetworks.com/whats-new/whats-new-in-globalprotect/hip-exceptions-for-patch-management), after adding the vendor you can specify the patch name or number and optionally a date until which you want to exclude the patch updates from the HIP report using the following format: Exclude:[kb-article-id1: MM/DD/YYYY], [kb-article-id2: MM/DD/YYYY] Where kb-article-id is the name or number in the attribute ( for example <kb-article-id>2267602</kb-article-id>) and the MM/DD/YYYY specifies the date up to which the patch is excluded from the HIP report. If you do not set a date, the patch will be excluded from the HIP report indefinitely. If you choose to set a date, the patch will be excluded until the specified date. |
| Custom Checks | Select **Custom Checks** to define custom host information you want the app to collect. For example, if you have any required applications that are not included in the Vendor or Product lists for creating HIP objects, you can create a custom check to determine whether that application is installed (it has a corresponding Windows registry or Mac plist key) or is currently running (has a corresponding running process): • |






| • | **Mac**—**Add** a check for particular plist key or key value. |
| --- | --- |






| • | **Process List**—**Add** the processes you want to check for on user endpoints to see if they are running. For example, to determine whether a software application is running, add the name of the executable file to the process list. You can add a process to the **Windows** tab, the **Mac** tab, or both. |
| --- | --- |






 Parent topic
 [GlobalProtect Portals Agent Tab](globalprotect-portals-agent-configuration-tab.html#ID0E2TI1)