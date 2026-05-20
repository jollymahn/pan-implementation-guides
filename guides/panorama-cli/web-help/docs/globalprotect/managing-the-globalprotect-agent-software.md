# Managing the GlobalProtect App Software

*GlobalProtect : Device &gt; GlobalProtect Client : Managing the GlobalProtect App Software*

Managing the GlobalProtect App Software

Select **Device** > **GlobalProtect Client** (`firewall only`) to download and activate the GlobalProtect app software on the firewall that hosts the portal. Thereafter, endpoints that connect to the portal download the app software. In the agent configurations you specify on the portal, you define how and when the portal pushes software to endpoints. Your configuration determines whether upgrades occur automatically when the app connects, whether end users are prompted to upgrade, or whether upgrading is prohibited for all or a particular set of users. See [Allow User to Upgrade GlobalProtect App](globalprotect-portals-agent-app-tab.html#ID0EY5M1) for more details. For details on the options for distributing the GlobalProtect app software and for step-by-step instructions for deploying the software, refer to [Deploy the GlobalProtect App Software](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-apps/deploy-the-globalprotect-app-software.html) in the GlobalProtect Administrator’s Guide.

 Note:



| | For the initial download and installation of the GlobalProtect app, the user of the endpoint must be logged in with administrator rights. For subsequent upgrades, administrator rights are not required. |
| --- | --- |





| GlobalProtect Client Settings | Description |
| --- | --- |
| Version | This version number is of the GlobalProtect app software that is available on the Palo Alto Networks Update Server. To see if a new app software release is available from Palo Alto Networks, click **Check Now**. The firewall uses its service route to connect to the Update Server to determine if new versions are available and displays them at the top of the list. |
| Size | The size of the app software bundle. |
| Release Date | The date and time Palo Alto Networks made the release available. |
| Downloaded | A check mark in this column indicates that the corresponding version of the app software package has been downloaded to the firewall. |
| Currently Activated | A check mark in this column indicates that the corresponding version of the app software has package has been activated on the firewall and can be downloaded by connecting apps. Only one version of the software can be activated at a time. |
| Action | Indicates the current action you can take for the corresponding app software package as follows: • |






| • | **Activate**—The corresponding app software version has been downloaded to the firewall, but apps cannot yet download it. Click **Activate** to activate the software and enable app upgrade. To activate a software update you manually uploaded to the firewall, click **Activate From File** and select the version you want to activate from the drop-down (you may need to refresh the screen for it to show as **Currently Activated**). |
| --- | --- |






| • | **Reactivate**—The corresponding app software has been activated and is ready for the endpoint to download. Because only one version of the GlobalProtect app software can be active on the firewall at one time, if your end users require access to a different version than is currently active, you have to **Activate** the other version to make it the **Currently Active** version. |
| --- | --- |







 Release Note


 Provides a link to the GlobalProtect release notes for the corresponding app version.







 Remove the previously downloaded app software image from the firewall.



 Parent topic
 [Device > GlobalProtect Client](device-globalprotect-client.html#ID0ET6D2)