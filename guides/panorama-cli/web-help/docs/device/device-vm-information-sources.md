# Device > VM Information Sources

*Device : Device &gt; VM Information Sources*

## Device > VM Information Sources


Use this tab to proactively track changes on the Virtual Machines (VMs) deployed on any of these sources—VMware ESXi server, VMware vCenter server, Amazon Web Services Virtual Private Cloud (AWS-VPC), or Google Compute Engine (GCE).

 Note:



| | When monitoring ESXi hosts that are part of the VM-Series NSX edition solution, use Dynamic Address Groups instead of using VM Information Sources to learn about changes in the virtual environment. For the VM-Series NSX edition solution, the NSX Manager provides Panorama with information on the NSX security group to which an IP address belongs. The information from the NSX Manager provides the full context for defining the match criteria in a Dynamic Address Group because it uses the service profile ID as a distinguishing attribute and allows you to properly enforce policy when you have overlapping IP addresses across different NSX security groups. |
| --- | --- |



 You can register up to a maximum of 32 tags to an IP address.

There are two ways to monitor VM Information Sources:




| • | The firewall can monitor your VMware ESXi server, VMware vCenter server, GCE instances, or AWS-VPCs, and retrieve changes as you provision or modify the guests configured on the monitored sources. You can configure up to 10 sources (cumulative of all the sources on all the virtual systems configured) on a firewall. |
| --- | --- |



 The following conditions apply when your firewalls are configured in a high availability (HA) configuration:



| ◦ | **Active/passive HA configuration**—Only the active firewall monitors the VM information sources. |
| --- | --- |






| ◦ | **Active/active HA configuration**—Only the firewall with the primary priority value monitors the VM information sources. |
| --- | --- |



 For information on how VM Information Sources and Dynamic Address Groups can work synchronously and enable you to monitor changes in the virtual environment, refer to the [VM-Series Deployment Guide](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment.html).



| • | For IP address-to-username mapping, you can configure the VM Information Sources on either the Windows User-ID agent or on the firewall to monitor the VMware ESXi and vCenter server and retrieve changes as you provision or modify the guests configured on the server. The Windows User-ID agent supports up to 100 sources. Support for AWS and Google Compute Engine is not available for the User-ID agent. |
| --- | --- |



 Note:



| | Each VM on a monitored ESXi or vCenter server must have VMware Tools installed and running. VMware Tools provide the ability to IP address and other values assigned to each VM. |
| --- | --- |




To collect the values assigned to the monitored VMs, the firewall monitors the attributes in the following tables.



| Attributes Monitored on a VMware Source |
| --- |
| • |






| • | Name |
| --- | --- |






| • | Guest OS |
| --- | --- |






| • | Annotation |
| --- | --- |






| • | VM State — the power state can be poweredOff, poweredOn, standBy, or unknown. |
| --- | --- |






| • | Version |
| --- | --- |






| • | Network—Virtual Switch Name, Port Group Name, and VLAN ID |
| --- | --- |






| • | Container Name—vCenter Name, Data Center Object Name, Resource Pool Name, Cluster Name, Host, and Host IP address. |
| --- | --- |








| Attributes Monitored on the AWS-VPC |
| --- |
| • |






| • | Guest OS |
| --- | --- |






| • | Image ID |
| --- | --- |






| • | Instance ID |
| --- | --- |






| • | Instance State |
| --- | --- |






| • | Instance Type |
| --- | --- |






| • | Key Name |
| --- | --- |






| • | Placement—Tenancy, Group Name, and Availability Zone |
| --- | --- |






| • | Private DNS Name |
| --- | --- |






| • | Public DNS Name |
| --- | --- |






| • | Subnet ID |
| --- | --- |






| • | Tag (key, value); up to 18 tags supported per instance |
| --- | --- |






| • | VPC ID |
| --- | --- |








| Attributes Monitored for Google Compute Engine (GCE) |
| --- |
| • |






| • | Machine type |
| --- | --- |






| • | Project ID |
| --- | --- |






| • | Source (OS type) |
| --- | --- |






| • | Status |
| --- | --- |






| • | Subnetwork |
| --- | --- |






| • | VPC Network |
| --- | --- |






| • | Zone |
| --- | --- |







**Add**—**Add** a new source for VM Monitoring and fill in the details based on the source you are monitoring:




| • | For VMware ESXi or vCenter Server, see [Settings to Enable VM Information Sources for VMware ESXi and vCenter Servers](settings-to-enable-vm-information-sources-for-vmware-esxi-and-vcenter-servers.html#ID0EHFOY). |
| --- | --- |






| • | For AWS-VPC, see [Settings to Enable VM Information Sources for AWS VPC](settings-to-enable-vm-information-sources-for-aws-vpc.html#ID0EVXOY). |
| --- | --- |






| • | For Google Compute Engine (GCE), see [Settings to Enable VM Information Sources for Google Compute Engine](settings-to-enable-vm-information-sources-for-google-compute-engine.html#ID0EVJPY). |
| --- | --- |




**Refresh Connected**—Refreshes the connection status in the on-screen display; this does not refresh the connection between the firewall and the monitored sources.


**Delete**—Deletes any configured VM Information source that you select.


**PDF/CSV**—Exports the VM Information source configuration table as a PDF or comma-separated values (CSV) file. See [Configuration Table Export](configuration-table-export.html#ID0EMWAM).

 Parent topic
 [Device](device.html#ID0EY2QW)