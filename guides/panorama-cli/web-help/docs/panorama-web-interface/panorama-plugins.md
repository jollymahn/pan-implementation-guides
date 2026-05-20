# Panorama > Plugins

*Panorama Web Interface : Panorama &gt; Plugins*

## Panorama > Plugins




| • | **Panorama** > **Plugins** |
| --- | --- |






| • | **Device** > **Plugins** |
| --- | --- |




Select **Panorama** > **Plugins** to install, remove, and manage the plugins that support third-party integrations on Panorama.


`(Only available on the VM-Series firewalls)` Select **Device** > **Plugins** to to install, remove, and manage the plugins for the VM-Series firewalls.



| Plugins | Description |
| --- | --- |
| Upload | Allows you to upload a plug-in installation file from a local directory. This does not install the plugin. After uploading the installation file, the Install link becomes active. |
| File Name | The plug-in file name. When you install the **vm_series** plugin on Panorama, the **Device** > **VM-Series** page becomes available to you for managing and committing template configurations on the VM-Series firewalls deployed on the public cloud environments—AWS, Azure, and Google. |
| Version | The plug-in version number. |
| Platform | The models on which the plugin is supported. |
| Release date | The release date of this version of the plug-in. |
| Size | The plug-in file size. |
| Installed | Provides the current installation status of each plug-in on Panorama. |
| Actions | • |






| • | **Delete**—Deletes the specified plug-in file. |
| --- | --- |






| • | **Remove Config**—Removes all configuration related to the plug-in. To completely remove all configuration related to a plugin, you must also perform and **Uninstall** after using **Remove Config**. |
| --- | --- |



 When removing configuration from the Panorama plugin for VMware NSX, this action deletes service definition(s) and service manager(s) only. It does not remove other related configuration, such as zone, device groups, or templates. Additionally, to complete this action in a Panorama HA deployment, you must remove config on the active first, initiate a failover to make the secondary active, and then remove config on the new active peer.



| • | **Uninstall**—Removes the current installation of the plug-in. This does not remove the plug-in file from Panorama. If you uninstall the plug-in, you lose any configuration related to that plug-in. Only use when completely removing the related configuration. |
| --- | --- |






 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)