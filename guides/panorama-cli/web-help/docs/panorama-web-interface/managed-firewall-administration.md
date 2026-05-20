# Managed Firewall Administration

*Panorama Web Interface : Panorama &gt; Managed Devices &gt; Summary : Managed Firewall Administration*

Managed Firewall Administration

You can perform the following administrative tasks on firewalls.



| Task | Description |
| --- | --- |
| Add | **Add** firewalls and enter their serial numbers (one per row) to [add them as managed devices](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-firewalls/add-a-firewall-as-a-managed-device.html). The **Managed Devices** window will then display [Managed Firewall Information](managed-firewall-information.html#ID0EWUE3), including connection status, installed updates, and properties that were set during [initial configuration](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/getting-started/integrate-the-firewall-into-your-management-network/perform-initial-configuration.html). Check the **Associate Devices** box to associate the firewalls with a device group or template stack. **Import** multiple firewalls in CSV format to be managed by the Panorama management server. A sample CSV file is available for download. Next, enter the IP address of the Panorama management server on each firewall (see [Device > Setup > Management](device-setup-management.html#ID0E1DTW)) so that Panorama can manage the firewalls. Note:  |







 Reassociate


 Reassign one or more selected firewalls to a different device group or template stack.




 Delete


 Select one or more firewalls and **Delete** them from the list of firewalls that Panorama manages.




 Tag


 Select one or more firewalls, click **Tag**, and enter a text string of up to 31 characters or select an existing tag. Do not use an empty space. Wherever the web interface displays a long list of firewalls (for example, in the dialog for installing software), tags provide one means to filter the list. For example, you can use a tag called branch office to filter for all branch office firewalls across your network.




 Install


 **Install** [Firewall Software and Content Updates](firewall-software-and-content-updates.html#ID0EHPG3).




 Group HA Peers


 Select **Group HA Peers** if you want the **Managed Devices** page to group firewalls that are peers in a high availability (HA) configuration. You then can only select to perform actions on both peers or neither peer in each HA pair.




 Manage (Backups)


 **Manage** [Firewall Backups](firewall-backups.html#ID0EAJH3).




 PDF/CSV


 Administrative roles with a minimum of read-only access can export the managed firewall table as **PDF/CSV**. You can apply filters to create more specific table configuration outputs for things such as audits. Only visible columns in the web interface will be exported. See [Configuration Table Export](configuration-table-export.html#ID0EMWAM).




 Deploy Master Key


 Deploy a new master key or update an existing master key of one or more devices.




 Request OTP from CSP


 Generate an One Time Password (OTP) for managed firewalls.



| • | **Custom selected devices**—Generate an OTP for the selected managed firewalls to install a device certificate in order to leverage Palo Alto Networks cloud services. |
| --- | --- |






| • | **Select all devices without a certificate**—Generate an OTP for any managed firewall without a device certificate successfully installed in order to leverage Palo Alto Networks cloud services. |
| --- | --- |







 Upload OTP


 Paste the OTP generated from the Customer Support Portal to install a device certificate for all managed firewalls.



 Parent topic
 [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3)