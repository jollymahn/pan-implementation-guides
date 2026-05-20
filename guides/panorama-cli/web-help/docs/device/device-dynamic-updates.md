# Device > Dynamic Updates

*Device : Device &gt; Dynamic Updates*

## Device > Dynamic Updates




| • | Device > Dynamic Updates |
| --- | --- |






| • | Panorama > Dynamic Updates |
| --- | --- |




Palo Alto Networks regularly posts updates that include new and modified applications, threat protection, device dictionary files for IoT Security, and GlobalProtect data files through dynamic updates. The firewall can retrieve these updates and use them to enforce policy, without requiring configuration changes. Application and some antivirus updates are available without a subscription; other are tied to your subscriptions.


You can view the latest updates, read the release notes for each update, and then select the update you want to download and install. You can also revert to a previously installed version of an update.


Setting a schedule for dynamic updates allows you to define the frequency at which the firewall checks for and downloads or installs new updates. Particularly for Applications and Threats content updates, you might want to set a schedule that staggers new and modified application updates behind threat updates; this gives you more time to assess how new and modified applications impact your security policy, while ensuring that the firewall is always equipped with the latest threat protections.



| Dynamic Updates Options | Description |
| --- | --- |
| Version | Lists the versions that are currently available on the Palo Alto Networks Update Server. To check if a new software release is available from Palo Alto Networks, click **Check Now**. The firewall uses the service route to connect to the Update Server and checks for new content release versions and, if there are updates available, displays them at the top of the list. |
| Last checked | Displays the date and time that the firewall last connected to the update server and checked if an update was available. |
| Schedule | Allows you to schedule the frequency for retrieving updates. You can define how often and when the dynamic content updates occur—the **Recurrence** and time—and whether to **Download Only** or to **Download and Install** scheduled updates For Antivirus and Applications and Threats updates, you have the option to set a minimum Threshold of time that a content update must be available before the firewall installs it. Very rarely, there can be an error in a content update and this threshold ensures that the firewall only downloads content releases that have been available and functioning in customer environments for the specified amount of time. For Applications and Threats content updates, you can also set a threshold that applies specifically to content updates with new and modified applications. An extended application threshold gives you more time to assess and adjust your security policy based on changes that new or modified applications introduce. For WildFire updates, you have the option to retrieve signatures in real-time, allowing you to access the signatures as soon as they are generated. Signatures that are downloaded during a sample check are saved in the firewall cache, and are available for fast (local) look-ups. In addition, to maximize coverage, the firewall also automatically downloads an additional signature package on a regular basis when real-time signatures is enabled. These supplemental signatures are added to the firewall cache and remain available until they become stale and are refreshed or are overwritten by new signatures. Note:  |







 File Name


 List the filename; it includes the content version information.




 Features


 Lists what type of signatures the content version might include.
 For Applications and Threats content release versions, this field might display an option to review **Apps, Threats**. Click this option to view new application signatures made available since the last content release version installed on the firewall. You can also use the **New Applications** dialog to **Enable/Disable** new applications. You might choose to disable a new application included in a content release if you want to avoid any policy impact from an application being uniquely identified (an application might be treated differently before and after a content installation if a previously unknown application is identified and categorized differently).
 For Device Dictionary, this field is **IoT**, short for IoT Security, the cloud Security service that uses the device dictionary as a critical component in the accurate enforcement of Security policy rules based on [Device-ID](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/device-id/device-id-overview).




 Type


 Indicates whether the download includes a full database update or an incremental update.




 Size


 Displays the size of the content update package.




 SHA256


 The checksum used to verify the integrity of the file.




 Release Date


 The date and time Palo Alto Networks made the content release available.




 Downloaded


 A check mark in this column indicates that the corresponding content release version has been downloaded to the firewall.




 Currently Installed


 A check mark in this column indicates that the corresponding content release version is currently running on the firewall.




 Action


 Indicates the current action you can take for the corresponding software image as follows:



| • | **Download**—The corresponding content release version is available on the Palo Alto Networks Update Server; click to **Download** the content release version. If the firewall does not have access to the Internet, use an Internet-connected computer to go to the [Customer Support Portal](https://support.paloaltonetworks.com) and select **Dynamic Updates**. Find the content release version you want and click **Download** to save the update package to your local computer. Then manually **Upload** the software image to the firewall. Additionally, downloading an Application and Threat content release version enables the option to **Review Policies** that are affected by new application signatures included with the release. |
| --- | --- |






| • | **Review Policies** (Application and Threat content only)—Review any policy impact for new applications included in a content release version. Use this option to assess the treatment an application receives both before and after installing a content update. You can also use the Policy Review dialog to add or remove a pending application (an application that is downloaded with a content release version but is not installed on the firewall) to or from an existing Security policy rule; policy changes for pending applications do not take effect until the corresponding content release version is installed. |
| --- | --- |






| • | **Review Apps** (Application and Threat content only)—View new and modified application signatures made available since the last content release version installed on the firewall. In cases where a content update introduces changes that might impact the enforcement of critical applications, those applications are marked as recommended for policy review. Click on Review Policies to see how content updates impact your existing security policy or, you can disable an application until you have time to review the application’s policy impact. |
| --- | --- |






| • | **Install**—The corresponding content release version has been downloaded to the firewall; click to **Install** the update. When installing a new Applications and Threats content release version, you are prompted with the option to **Disable new apps in content update**. This option enables protection against the latest threats, while giving you the flexibility to enable applications after preparing any policy updates, due to the impact of new application signatures (to enable applications you have previously disabled, select **Apps, Threats** on the Dynamic Updates page or select **Objects** > **Applications**). |
| --- | --- |






| • | **Revert**—The corresponding content release version has been downloaded previously To reinstall the same version, click **Revert**. |
| --- | --- |







 Documentation


 Provides a link to the release notes for the corresponding version.







 Remove the previously downloaded content release version from the firewall.




 Upload


 If the firewall does not have access to the Palo Alto Networks Update Server, you can manually download dynamic updates from the Palo Alto Networks Support site in the Dynamic Updates section. After you download an update to your computer, **Upload** the update to the firewall. You then select **Install From File** and select the file you downloaded.




 Install From File


 After you manually upload an update file to the firewall, use this option to install the file. In the **Package Type** drop-down, select the type of update you are installing (**Application and Threats**, **Antivirus**, or **WildFire**), click **OK**, select the file you want to install and then click **OK** again to start the installation.



 Parent topic
 [Device](device.html#ID0EY2QW)