# Configure Access to the NSX Manager

*Panorama Web Interface : Panorama &gt; VMware NSX : Configure Access to the NSX Manager*

Configure Access to the NSX Manager



| • | Panorama > VMware NSX > Service Managers |
| --- | --- |




To enable Panorama to communicate with the NSX Manager, **Add** and configure the settings as described in the following table.



| Service Managers | Description |
| --- | --- |
| Service Manager Name | Enter a name to identify the VM-Series firewall as a service. This name displays on the NSX Manager and is used to deploy the VM-Series firewall on-demand. Supports up to 63 characters; use only letters, numbers, hyphens, and underscores. |
| Description | (`Optional`) Enter a label to describe the purpose or function of this service. |
| NSX Manager URL | Specify the URL that Panorama will use to establish a connection with the NSX Manager. |
| NSX Manager Login | Enter the authentication credentials—username and password—configured on the NSX Manager. Panorama uses these credentials to authenticate with the NSX Manager. |
| NSX Manager Password | |
| Confirm NSX Manager Password | |
| Service Definitions | Specify the service definitions associated with this service manager. Each service manager supports up to 32 service definitions. |



After committing the changes to Panorama, the VMware Service Manager window displays the connection status between Panorama and the NSX Manager.



| Sync Status | Description |
| --- | --- |
| Status | Displays the connection status between Panorama and the NSX Manager. A successful connection displays as Registered—Panorama and the NSX Manager are synchronized and the VM-Series firewall is registered as a service on the NSX Manager. For an unsuccessful connection, the status can be: • |






| • | **Not authorized**—The access credentials (username and/or password) are incorrect. |
| --- | --- |






| • | **Unregistered**—The service manager, service definition, or service profile is unavailable or was deleted on the NSX Manager. |
| --- | --- |






| • | **Out of sync**—The configuration settings defined on Panorama are different from what is defined on the NSX Manager. Click **Out of sync** for details on the reasons for failure. For example, NSX Manager may have a service definition with the same name as defined on Panorama. To fix the error, use the service definition name listed in the error message to validate the service definition on the NSX Manager. Until the configuration on Panorama and the NSX Manager is synchronized, you cannot add a new service definition on Panorama. |
| --- | --- |







 Synchronize Dynamic Objects


 Click **Synchronize Dynamic Objects** to refresh the dynamic object information from the NSX Manager. Synchronizing dynamic objects enables you to maintain context on changes in the virtual environment and allows you to safely enable applications by automatically updating the Dynamic Address Groups used in policy rules.
 Note:



| | On Panorama, you can view only the IP addresses that are dynamically registered from the NSX Manager. Panorama does not display the dynamic IP addresses that are registered directly to the firewalls. If you use VM Information Sources (not supported on the VM-Series NSX edition firewalls) or the XML API to register IP addresses dynamically to the firewalls, you must log in to each firewall to view the complete list of dynamic IP addresses (both those that Panorama pushed and those that are locally registered) on the firewall. |
| --- | --- |







 NSX Config-Sync


 Select **NSX Config-Sync** to synchronize the service definitions configured on Panorama with the NSX Manager. If you have any pending commits on Panorama, this option is not available.
 If the synchronization fails, view the details in the error message to know whether the error is on Panorama or on the NSX Manager. For example, when you delete a service definition on Panorama, the synchronization with the NSX Manager fails if the service definition is referenced in a rule on the NSX Manager. Use the information in the error message to determine the reason for failure and where you need to take corrective action (on Panorama or on the NSX Manager).



 Parent topic
 [Panorama > VMware NSX](panorama-vmware-nsx.html#ID0EFC13)