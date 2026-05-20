# Firewall Backups

*Panorama Web Interface : Panorama &gt; Managed Devices &gt; Summary : Firewall Backups*

Firewall Backups



| • | Panorama > Managed Devices |
| --- | --- |




Panorama automatically backs up every configuration change you commit to managed firewalls. To manage the backups for a firewall, select **Panorama** > **Managed Devices**, click **Manage** in the Backups column for the firewall, and perform any of the following tasks.

 Note:



| | To configure the number of firewall configuration backups that Panorama stores, select **Panorama** > **Setup** > **Management**, edit the Logging and Reporting Settings, select **Log Export and Reporting**, and enter the **Number of Versions for Config Backups** (default is 100). |
| --- | --- |





| Task | Description |
| --- | --- |
| Display details about a saved or committed configuration. | In the Version column for the backup, click the saved configuration filename or committed configuration version number to display the contents of the associated XML file. |
| Restore a saved or committed configuration to the candidate configuration. | In the Action column for the backup, click **Load** and **Commit**. Loading a firewall configuration reverts the local device configuration and does not revert the configuration pushed from Panorama. After you **Load** the firewall backup, you must [context switch](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-overview/centralized-firewall-configuration-and-update-management/context-switchfirewall-or-panorama.html) to the firewall web interface or [launch the firewall web interface](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/use-the-web-interface/launch-the-web-interface.html) to **Commit**. |
| Remove a saved configuration. | In the Action column for the saved backup, click Delete ( ). |


 Parent topic
 [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3)