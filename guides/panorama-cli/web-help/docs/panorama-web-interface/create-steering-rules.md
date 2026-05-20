# Create Steering Rules

*Panorama Web Interface : Panorama &gt; VMware NSX : Create Steering Rules*

Create Steering Rules



| • | Panorama > VMware NSX > Steering Rules |
| --- | --- |




Steering rules determine what traffic from which guests in the cluster is steered to the VM-Series firewall.



| Field | Description |
| --- | --- |
| Auto-Generate Steering Rules | Generates steering rules based on a security rule that is configured as follows: • |






| • | Has the same zone as the source and destination (not any to any). |
| --- | --- |






| • | Has only one zone. |
| --- | --- |






| • | Has no static address group, IP range, or netmask configured for the policy. |
| --- | --- |



 By default, steering rules generated through Panorama have no NSX Services configured and the NSX Traffic Direction is set to inout. After generating steering rules, you can update individual steering rules to change the NSX Traffic Direction or add NSX Services. Panorama automatically populates the following fields (except Description and NSX Services) when you auto-generate steering rules.




 Name


 Enter the name for the steering rule you want to display on the NSX Manager. When auto-generated, Panorama adds the prefix auto_ to each steering rule and replaces any space in the security policy rule name with an underscore ( _ ).




 Description


 (`Optional`) Enter a label to describe the purpose or function of this service definition.




 NSX Traffic Direction


 Specify the direction of the traffic that is redirected to the VM-Series firewall.



| • | **inout**—Creates an INOUT rule on NSX. Traffic of the specified type going between the source and the destination is redirected to the VM-Series firewall. Panorama uses this traffic direction for auto-generated steering rules. |
| --- | --- |






| • | **in**—Creates an IN rule on NSX. Traffic of the specified type going to the source from the destination is redirected to the VM-Series firewall. |
| --- | --- |






| • | **out**—Creates an OUT rule on NSX. Traffic of the specified type going from the source to the destination is redirected to the VM-Series firewall. |
| --- | --- |







 NSX Services


 Select the application (Active Directory Server, HTTP, DNS, etc.) traffic to redirect to the VM-Series firewall.




 Device Group


 Select a device group from the drop-down. The chosen device group determines which security policies are applied to the steering rule. Device groups must be associated with an NSX service definition.




 Security Policy


 The security policy rule that the auto-generated steering rule is based on.



 Parent topic
 [Panorama > VMware NSX](panorama-vmware-nsx.html#ID0EFC13)