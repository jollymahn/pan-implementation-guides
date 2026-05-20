# Create Device Variable Definition

*Panorama Web Interface : Panorama &gt; Managed Devices &gt; Summary : Managed Firewall Information : Create Device Variable Definition*

Create Device Variable Definition

When a device is first added to a template stack, you have the option to create device-specific variable definitions copied from devices in the template stack or you can edit the template variable definitions through **Panorama** > **Managed Devices** > **Summary**. By default, all variable definitions are inherited from the template stack and you can only override, and —not delete—the variable definitions for an individual device. You can use variables to replace IP address objects and IP address literals (IP Netmask, IP Range, FQDN) in all areas of the configuration, interfaces in the IKE Gateway configuration (Interface) and HA configuration (Group ID).



| Create Device Variable Definition Information | Description |
| --- | --- |
| Clone device variable definition from another device in the template stack? | |
| No | View the existing variable definitions and edit as needed. See [Panorama > Templates > Template Variables](panorama-templates-template-variable.html#ID0E24L3). |
| Yes | Select a device in the drop-down from which to clone variable definitions and then select the specific variable definitions you want to clone. |