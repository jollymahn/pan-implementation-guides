# Managed WildFire Information

*Panorama Web Interface : Panorama &gt; Managed WildFire Clusters : Managed WildFire Information*

Managed WildFire Information

Select **Panorama** > **Managed WildFire Clusters** to display the following information for each managed cluster (you can also select standalone appliances from this page and display their information) or select **Panorama** > **Managed WildFire Appliances** to display the information for standalone appliances.


Unless noted, the information in the following table applies to both WildFire clusters and standalone appliances. The information previously configured for a cluster or appliance is pre-populated.



| Managed WildFire Information | Description |
| --- | --- |
| Appliance | The name of the appliance. The Managed WildFire Clusters view displays appliances grouped by cluster, includes the standalone appliances available to add to a cluster, and includes the serial number (in parentheses) with the appliance name (the serial number is not part of the name). |
| Serial Number (`Managed WildFire Appliances view only`) | The serial number of the appliance. The Managed WildFire Clusters view displays the serial number in the same column as the appliance name (the serial number is not part of the name). |
| Software Version | The software version installed and running on the appliance. |
| IP Address | The IP address of the appliance. |
| Connected | The connection state between the appliance and Panorama—either Connected or Disconnected. |
| Cluster Name | The name of the cluster in which the appliance is included as a node; nothing displays here for a standalone appliance. |
| Analysis Environment | The analysis environment (vm1, vm2, vm3, vm4, or vm5). Each analysis environment represents a set of operating systems and applications: • |






| • | vm-2 supports Windows XP, Adobe Reader 9.4.0, Flash 10n, PE, PDF, and Office 2007 and earlier Office releases. |
| --- | --- |






| • | vm-3 supports Windows XP, Adobe Reader 11, Flash 11, PE, PDF, and Office 2010 and earlier Office releases. |
| --- | --- |






| • | vm-4 supports Windows 7 32-bit, Adobe Reader 11, Flash 11, PE, PDF, and Office 2010 and earlier Office releases. |
| --- | --- |






| • | vm-5 supports Windows 7 64-bit, Adobe Reader 11, Flash 11, PE, PDF, and Office 2010 and earlier Office releases. |
| --- | --- |







 Content


 The version number of the content release version.




 Role


 The appliance role:



| • | **Standalone**—The appliance is not a cluster node. |
| --- | --- |






| • | **Controller**—The appliance is the cluster Controller node. |
| --- | --- |






| • | **Controller Backup**—The appliance is the cluster Controller backup node. |
| --- | --- |






| • | **Worker**—The appliance is a Worker node in the cluster. |
| --- | --- |







 Config Status


 The configuration synchronization status of the appliance. The Panorama appliance checks for WildFire appliance settings and reports configuration differences between the appliance configuration and the configuration saved for that appliance on Panorama.



| • | **In Sync**—The appliance configuration is in sync with its saved configuration on Panorama. |
| --- | --- |






| • | **Out of Sync**—The appliance configuration is not in sync with its saved configuration on Panorama. You can mouse over the eyeglass to display the cause of the sync failure. |
| --- | --- |







 Cluster Status
 (`Managed WildFire Clusters page only`)


 Cluster Status displays three types of information for each cluster node:



| • | Services available (normal operating conditions): |
| --- | --- |






| ◦ | **wfpc** (WildFire Private Cloud)—The malware sample analysis and reporting service. |
| --- | --- |






| ◦ | **signature**—The local signature generation service. |
| --- | --- |






| • | Progress of operations—the operation name followed by a colon (:) and the status: |
| --- | --- |






| ◦ | **Operations**—Status for decommission, suspend, and reboot operations. |
| --- | --- |






| ◦ | **Progress status**—Operation status notifications are the same for each operation: requested, ongoing, denied, success, or fail. |
| --- | --- |



 For example, if you suspend a node and the operation is ongoing, Cluster Status displays suspend:ongoing, or if you reboot a node and the operation has been requested but has not yet begun, Cluster Status displays reboot:requested.



| • | Error conditions: |
| --- | --- |



 Cluster Status displays the following error conditions:



| ◦ | **Cluster**—cluster:offline or cluster:splitbrain. |
| --- | --- |






| ◦ | **Service**—service:suspended or service:none. |
| --- | --- |







 Last Commit State


 Commit succeeded if the most recent commit succeeded or commit failed if the most recent commit failed. View details about the last commit by selecting the state.




 Utilization > View




 View


 **View** cluster or appliance utilization statistics. You can view only individual appliances (**Panorama** > **Managed WildFire Appliances**) or you can view only cluster statistics (**Panorama** > **Managed WildFire Clusters**).



| • | **Appliance**—(`Standalone appliance view only`) The appliance serial number. |
| --- | --- |






| • | **Cluster**—(`Cluster view only`) The cluster name. You can also select a different cluster to view. |
| --- | --- |






| • | **Duration**—Displays the time period for which statistics are collected and displayed. You can select different durations: |
| --- | --- |






| ◦ | **15 Min** |
| --- | --- |






| ◦ | **Last Hour** |
| --- | --- |






| ◦ | **Last 24 Hours (default)** |
| --- | --- |






| ◦ | **Last 7 Days** |
| --- | --- |






| ◦ | **All** |
| --- | --- |



 The **Utilization** **View** has four tabs and, on each tab, you determine what is displayed based on your configured **Duration**.




 General Tab


 The **General** tab displays aggregated resource utilization statistics for a cluster or an appliance. The other tabs display more granular information about resource utilization by file type:



| • | **Total Disk Usage**—The total cluster or appliance disk usage. |
| --- | --- |






| • | **Verdict**—The **Total** number of verdicts, the number of each verdict type assigned to files—**Malware**, **Grayware**, and **Benign**; and how many verdicts were **Error** verdicts. |
| --- | --- |






| • | **Sample Statistics**—The total number of samples **Submitted** and **Analyzed** and how many samples are **Pending** analysis. |
| --- | --- |






| • | **Analysis Environment & System Utilization**: |
| --- | --- |






| ◦ | **File Type Analyzed**—The type of file that was analyzed—**Executable**, **Non-Executable**, or **Links**. |
| --- | --- |






| ◦ | **Virtual Machine Usage**—The number of virtual machines used for each file type analyzed and how many virtual machines are available to analyze each file type. For example, for Executable files, VM usage could be 6/10 (six VMs used and ten VMs available). |
| --- | --- |






| ◦ | **Files Analyzed**—The number of files of each type that were analyzed. |
| --- | --- |







 Executable, Non-Executable, and Links Tabs


 The **Executable**, **Non-Executable**, and **Links** display similar information about each type of file:



| • | **Verdict**—Details about verdicts by file type. You can filter the results: |
| --- | --- |






| ◦ | **Search box**—Enter search terms to filter the verdicts. The search box indicates the number of file types (items) in the list. After you enter search terms, apply the filter ( ) or clear the filter ( ) and enter a different set of terms. |
| --- | --- |






| ◦ | **File Type**—List files by type. For example, the **Executable** tab displays .exe and .dll file types; the **Non-Executable** tab displays .pdf, .jar, .doc, .ppt, .xls, .docx, .pptx, .xlsx, .rtf, class, and .swf file types; and the **Links** tab displays elink file type information. |
| --- | --- |






| ◦ | For each **File Type**, the total number of verdicts for **Malware**, **Grayware**, and **Benign** files, the number of **Error** verdicts, and the **Total** number of verdicts are displayed on each tab. |
| --- | --- |






| • | **Sample Statistics**—Details about sample analysis by file type. |
| --- | --- |






| ◦ | **Search box**—Same as the **Verdict** search box. |
| --- | --- |






| ◦ | **File Type**—Same as the **Verdict** **File Type**. |
| --- | --- |






| ◦ | For each **File Type**, the total number of files **Submitted** for analysis, the total number **Analyzed**, and the number **Pending** analysis are displayed on each tab. |
| --- | --- |







 Firewalls Connected > View




 View


 **View** information about the firewalls connected to the cluster or the appliance. You can view only individual appliances (**Panorama** > **Managed WildFire Appliances**) or you can view only cluster statistics (**Panorama** > **Managed WildFire Clusters**).



| • | **Appliance**—(`Standalone appliance view only`) The appliance serial number. |
| --- | --- |






| • | **Cluster**—(`Cluster view only`) The cluster name, you can also select a different cluster to view. |
| --- | --- |






| • | **Refresh**—Refresh the display. |
| --- | --- |







 Registered and Submitting Samples Tabs


 The **Registered** tab displays information about firewalls registered to the cluster or appliance, regardless of whether the firewalls are submitting samples.
 The **Submitting Samples** tab displays information about firewalls that are actively submitting samples to the WildFire cluster or appliance.
 The type of information displayed on these tabs and how to filter the information is similar for both:



| • | **Search box**—Enter search terms to filter the list of firewalls. The search box indicates the number of firewalls (items) in the list. After you enter search terms, apply the filter ( ) or clear the filter ( ) and enter a different set of terms. |
| --- | --- |






| • | **S/N**—The serial number of the firewall. |
| --- | --- |






| • | **IP Address**—The IP address of the firewall. |
| --- | --- |






| • | **Model**—The model number of the firewall. |
| --- | --- |






| • | **Software Version**—The software version installed and running on the firewall. |
| --- | --- |






 Parent topic
 [Panorama > Managed WildFire Clusters](panorama-managed-wildfire-clusters.html#ID0EAGT2)