# Create Service Definitions

*Panorama Web Interface : Panorama &gt; VMware NSX : Create Service Definitions*

Create Service Definitions



| • | Panorama > VMware NSX > Service Definitions |
| --- | --- |




A service definition allows you to register the VM-Series firewall as a partner security service on the NSX Manager. You can define up to 32 service definitions on Panorama and synchronize them on the NSX Manager.


Typically, you will create one service definition for each tenant in an ESXi cluster. Each service definition specifies the OVF (PAN-OS version) used to deploy the firewall and includes the configuration for the VM-Series firewalls installed on the ESXi cluster. To specify the configuration, a service definition must have a unique template, a unique device group and the license auth-codes for the firewalls that will be deployed using the service definition. When the firewall is deployed, it connects to Panorama and receives both its configuration settings—including the zone(s) for each tenant or department that the firewall will secure—and its policy settings from the device group specified in the service definition.


To add a new service definition, configure the settings as described in the following table.



| Field | Description |
| --- | --- |
| Name | Enter the name for the service you want to display on the NSX Manager. |
| Description | (`Optional`) Enter a label to describe the purpose or function of this service definition. |
| Device Group | Select the device group or device group hierarchy to which these VM-Series firewalls will be assigned. For details, see [Panorama > VMware NSX](panorama-vmware-nsx.html#ID0EFC13). |
| Template | Select the template to which the VM-Series firewalls will be assigned. For details, see [Panorama > Templates](panorama-templates.html#ID0E1SK3). Each service definition must be assigned to a unique template or template stack. A template can have multiple zones (NSX Service Profile Zones for NSX) associated with it. For a single-tenant deployment, create one zone (NSX Service Profile Zone) in the template. If you have a multi-tenant deployment, create a zone for each sub-tenant. When you create a new NSX Service Profile Zone, it is automatically attached to a pair of virtual wire subinterfaces. For more information, see [Network > Zones](network-zones.html#ID0EC6TT). |
| VM-Series OVF URL | Enter the URL (IP address or host name and path) where the NSX Manager can access the OVF file to provision new VM-Series firewalls. |
| Notify Groups | Select a notify group from the drop-down. |


 Parent topic
 [Panorama > VMware NSX](panorama-vmware-nsx.html#ID0EFC13)