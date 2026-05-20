# Panorama > Templates > Template Variables

*Panorama Web Interface : Panorama &gt; Templates : Panorama &gt; Templates &gt; Template Variables*

Panorama > Templates > Template Variables



| • | [New Template Variable Creation](panorama-templates-template-variable_2.html#ID0E5EN3) |
| --- | --- |






| • | [Edit Existing Template Variable](panorama-templates-template-variable_3.html#ID0E6LN3) |
| --- | --- |






| • | [Create or Edit Variable Definition on a Device](panorama-templates-template-variable_4.html#ID0EONN3) |
| --- | --- |




You can define variables (**Panorama** > **Templates**) for templates and template stacks or you can edit existing variables for an individual device (**Panorama** > **Managed Devices** > **Summary**). Variables are configuration components defined on the template or template stack that provide flexibility and re-usability when you use Panorama to manage firewall configurations. You can use variables to replace:




| • | An IP address (includes IP Netmask, IP Range, and FQDN) in all areas of the configuration. |
| --- | --- |






| • | Interfaces in an IKE Gateway configuration (Interface) and in an HA configuration (Group ID). |
| --- | --- |






| • | Configuration elements in your SD-WAN configuration (AS Number, QoS Profile, Egress Max, Link Tag). |
| --- | --- |




When you add firewalls to a template stack, they automatically inherit variables that you create for a template or template stack.



| Template Variable Information | Description |
| --- | --- |
| Name | The name of the variable definition. |
| Template (device and template stack) | Displays the name of the template to which the variable definition belongs. |
| Type | Displays the type of variable definition: • |






| • | **IP Range**—Define an IP range. For example, 192.168.1.10-192.168.1.20. |
| --- | --- |






| • | Hostname—Label or human readable name assigned to a device connected to the network. |
| --- | --- |






| • | IPv4 Subnet—Subnet for IPv4 IP addresses. For example, 1.1.1.0/24. |
| --- | --- |






| • | IPv6 Subnet—Subnet for IPv6 IP addresses. For example, 5555::00/24. |
| --- | --- |






| • | Pre Shared Key—Security key for authentication when configuring a VPN tunnel. Up to 255 ASCII or non-ASCII keys are supported. |
| --- | --- |






| • | **FQDN**—Define a fully qualified Domain Name. |
| --- | --- |






| • | **Group ID**—Define the High Availability Group ID. For more information, see [Configuration Guidelines for Active/Passive HA](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/set-up-activepassive-ha/configuration-guidelines-for-activepassive-ha). |
| --- | --- |






| • | **Device Priority—**Define the device priority to indicate a preference for which firewall should assume the active role in an Active-Passive high availability (HA) configuration. |
| --- | --- |






| • | **Device ID—**Define the Device ID to use to assign a device priority valuer in a Active-Active high availability (HA) configuration. |
| --- | --- |






| • | **Interface**—Define a firewall interface on the firewall. Can only be used for an IKE Gateway configuration. |
| --- | --- |






| • | **AS Number—**Define an autonomous system number to use in your BGP configuration. |
| --- | --- |






| • | **QoS Profile—**Define a Quality of Service (QoS) profile to use in QoS configurations. |
| --- | --- |






| • | **Egress Max—**Define an egress max value to use in QoS profile configuration. |
| --- | --- |






| • | **Link Tag—**Define a link tag to use in your SD-WAN configuration. |
| --- | --- |







 Value


 Displays the configured value for the variable definition.




 Add (template and template stack)


 Add a new template variable definition.




 Delete


 Delete an existing template variable definition.




 Clone


 Clone an existing template variable definition.




 Override (template stack and device)


 Overrides an existing template variable definition inherited from the template stack or device. You cannot change the variable type or name and you cannot override device-specific variables.




 Revert (template stack and device)


 To clear any overridden values on the template stack or device level; reverts the overridden variable to its original template variable definition.




 Get values used on device only (device only)


 Populate the selected variable with the value used on the firewall. Requires that a template or template stack variable be already defined and pushed to the firewall before Panorama can retrieve the value. Values fetched from the firewall will **Override** the template or template stack variable to create a device-specific variable. If no variable definition has been pushed to the firewall, Panorama will return Value not found for that variable.



 Parent topic
 [Panorama > Templates](panorama-templates.html#ID0E1SK3)