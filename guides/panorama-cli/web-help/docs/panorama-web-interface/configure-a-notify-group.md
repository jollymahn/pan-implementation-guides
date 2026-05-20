# Configure a Notify Group

*Panorama Web Interface : Panorama &gt; VMware NSX : Configure a Notify Group*

Configure a Notify Group



| • | Panorama > Notify Group |
| --- | --- |




The following table describes Panorama notify group settings.



| Notify Group Settings | Description |
| --- | --- |
| Name | Enter a descriptive name for your notify group. |
| Notify Device | Check the boxes of the device groups that must be notified of additions or modifications to the virtual machines deployed on the network. As new virtual machines are provisioned or existing machines are modified, the changes in the virtual network are provided as updates to Panorama. When configured to do so, Panorama populates and updates the dynamic address objects referenced in policy rules so that the firewalls in the specified device groups receive changes to the registered IP addresses in the dynamic address groups. To enable notification, make sure to select every device group to which you want to enable notification. If you are not able to select a device group (no check box available), it means that the device group is automatically included by virtue of the device group hierarchy. This notification process creates context awareness and maintains application security on the network. If, for example, you have a group of hardware-based perimeter firewalls that must be notified when a new application or web server is deployed, this process initiates an automatic refresh of the dynamic address groups for the specified device group. And all policy rules that reference the dynamic address object now automatically include any newly deployed or modified application or web servers and can be securely enabled based on your criteria. |


 Parent topic
 [Panorama > VMware NSX](panorama-vmware-nsx.html#ID0EFC13)