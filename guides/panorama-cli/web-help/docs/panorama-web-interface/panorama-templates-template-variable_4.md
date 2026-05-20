# Create or Edit Variable Definition on a Device

*Panorama Web Interface : Panorama &gt; Templates : Panorama &gt; Templates &gt; Template Variables : Create or Edit Variable Definition on a Device*

Create or Edit Variable Definition on a Device

Go to **Panorama** > **Managed Devices** > **Summary** to create variable definitions or override template variables pushed from a Panorama template or template stack. Template variables include:




| • | An IP address (IP Netmask, IP Range, or FQDN) in all areas of the configuration. |
| --- | --- |






| • | Interfaces in an IKE Gateway configuration (Interface) or an HA configuration (Group ID). |
| --- | --- |






| • | Configuration elements in your SD-WAN configuration (AS Number, QoS Profile, Egress Max, Link Tag). |
| --- | --- |




Creating a device variable allows you to copy overridden device-specific variables from a device in the same template stack instead of recreating them individually. By default, all variable definitions are inherited from the template or template stack and can be only overridden—you cannot delete or create new variable definitions for an individual device.


**Create** device variable definitions by copying variable definitions from existing devices in the template stack or **Edit** existing device variable definitions.