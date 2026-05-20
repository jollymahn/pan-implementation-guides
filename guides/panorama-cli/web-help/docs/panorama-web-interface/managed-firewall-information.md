# Managed Firewall Information

*Panorama Web Interface : Panorama &gt; Managed Devices &gt; Summary : Managed Firewall Information*

Managed Firewall Information

Select **Panorama** > **Managed Devices** > **Summary** to display the following information for each managed firewall.



| Managed Firewall Information | Description |
| --- | --- |
| Device Group | Displays the name of the device group in which the firewall is a member. By default, this column is hidden, though you can display it by selecting the drop-down in any column header and selecting **Columns** > **Device Group**. The page displays firewalls in clusters according to their device group. Each cluster has a header row that displays the device group name, the total number of assigned firewalls, the number of connected firewalls, and the device group path in the hierarchy. For example, **Data center (2/4 Devices Connected): Shared** > **Europe** > **Data center** would indicate that a device group named **Data center** has four member firewalls (two of which are connected) and is a child of a device group named **Europe**. You can collapse or expand any device group to hide or display its firewalls. |
| Device Name | Displays the hostname or serial number of the firewall. For the VM-Series NSX edition firewall, the firewall name appends the hostname of the ESXi host. For example, PA-VM: Host-NY5105 |
| Virtual System | Lists the virtual systems available on a firewall that is in Multiple Virtual Systems mode. |
| Model | Displays the firewall model. |
| Tags | Displays the tags defined for each firewall/virtual system. |
| Serial Number | Displays the serial number of the firewall. |
| Operational Mode | Displays the operational mode of the firewall. Can be FIPS-CC or Normal. |
| IP Address | Displays the IP address of the firewall/virtual system. |
| **IPv4**—IPv4 address of the firewall/virtual system. | |
| **IPv6**—IPv6 address of the firewall/virtual system. | |
| Variables | Create device specific variable definitions by copying them from a device in the template stack, or Edit existing variable definitions to create unique variables for the device. This column will be empty if the device is not associated with a template stack. By default, variables are inherited from the template stack. See [Create or Edit Variable Definition on a Device](panorama-templates-template-variable_4.html#ID0EONN3). |
| Template | Displays the template stack to which the firewall is assigned. |
| Status | **Device State**—Indicates the state of the connection between Panorama and the firewall: Connected or Disconnected. A VM-Series firewall can have two additional states: • |






| • | **Partially deactivated**—Indicates that you have initiated the license deactivation process from Panorama, but the process is not fully complete because the firewall is offline and Panorama cannot communicate with it. |
| --- | --- |







 **HA Status**—Indicates whether the firewall is:



| • | **Active**—Normal traffic-handling operational state |
| --- | --- |






| • | **Passive**—Normal backup state |
| --- | --- |






| • | **Initiating**—The firewall is in this state for up to 60 seconds after bootup |
| --- | --- |






| • | **Non-functional**—Error state |
| --- | --- |






| • | **Suspended**—An administrator disabled the firewall |
| --- | --- |






| • | **Tentative**—For a link or path monitoring event in an active/active configuration |
| --- | --- |







 **Shared Policy**—Indicates whether the policy and object configurations on the firewall are synchronized with Panorama.




 **Template**—Indicates whether the network and device configurations on the firewall are synchronized with Panorama.




 Status (cont)


 **Certificate**—Indicates the managed device’s client certificate status.



| • | **Pre-defined**—The managed device is using a pre-defined certificate to authenticate with Panorama. |
| --- | --- |






| • | **Deployed**—The custom certificate is successfully deployed on the managed device. |
| --- | --- |






| • | **Expires in N days N hours**—The currently installed certificate will expire in less than 30 days. |
| --- | --- |






| • | **Expires in N minutes**—The currently installed certificate will expire in less than one day. |
| --- | --- |






| • | **Client Identity Check Passed**—The certificate common name matches the serial number of the connecting device. |
| --- | --- |






| • | **OCSP Status Unknown**—Panorama cannot get the OCSP status from the OCSP responder. |
| --- | --- |






| • | **OCSP Status Unavailable**—Panorama cannot contact the OCSP responder. |
| --- | --- |






| • | **CRL Status Unknown**—Panorama cannot get the revocation status from the CRL database. |
| --- | --- |






| • | **CRL Status Unavailable**—Panorama cannot contact the CRL database. |
| --- | --- |










| • | **OCSP/CRL Status Unknown**—Panorama cannot get the OCSP or revocation status when both are enabled. |
| --- | --- |






| • | **OCSP/CRL Status Unavailable**—Panorama cannot contact the OCSP or CRL database when both are enabled. |
| --- | --- |






| • | **Untrusted Issuer**—The managed device has a custom certificate but the server is not validating it. |
| --- | --- |



 **Last Commit State**—Indicates whether the last commit failed or succeeded on the firewall.




 Software Version | Apps and Threat | Antivirus | URL Filtering | GlobalProtect™ Client | WildFire


 Displays the software and content versions that are currently installed on the firewall. For details, see [Firewall Software and Content Updates](firewall-software-and-content-updates.html#ID0EHPG3).




 Backups


 On each firewall commit, PAN-OS automatically sends a firewall configuration backup to Panorama. Click **Manage** to view the available configuration backups and optionally load one. For details, see [Firewall Backups](firewall-backups.html#ID0EAJH3).




 Last Master Key Push


 Displays the status of the master key deployment from Panorama to the firewall.





 **Status**—Displays the latest master key push status. Can be Success or Failed. Unknown is displayed if a master key has not been pushed to the firewall from Panorama.




 **Timestamp**—Displays the date and time of the latest master key push from Panorama.




 Containers—If you deployed the CN-Series firewall to secure your containerized application workloads on Kubernetes clusters, use the following columns.




 Container Number of Nodes


 Displays the number of containerized firewall data plane (CN-NGFW) that are connected to the Management plane (CN-Mgmt) registered to Panorama.
 The value can be 0—30 CN-NGFW pods for each pair of CN-Mgmt pods.




 Container Notes


 Future use



 Parent topic
 [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3)