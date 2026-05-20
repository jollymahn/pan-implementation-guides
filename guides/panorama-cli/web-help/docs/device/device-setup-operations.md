# Device > Setup > Operations

*Device : Device &gt; Setup &gt; Operations*

## Device > Setup > Operations


You can perform the following tasks to manage the running and candidate configurations of the firewall and Panorama™. If you’re using a Panorama virtual appliance, you can also use the settings on this page to configure [Log Storage Partitions for a Panorama Virtual Appliance in Legacy Mode](log-storage-partitions-for-a-panorama-virtual-appliance-in-legacy-mode.html#ID0EVCP2).

 Note:



| | You must [Commit Changes](commit-changes.html#ID0EMSAK) you make in the candidate configuration to activate those changes at which point they become part of the running configuration. As a best practice, periodically [Save Candidate Configurations](save-candidate-configurations.html#ID0EZHCK). |
| --- | --- |



 You can use [Secure Copy (SCP) commands from the CLI](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-cli-quick-start/use-the-cli/use-secure-copy-to-import-and-export-files.html) to export configuration files, logs, reports, and other files to an SCP server and import the files to another firewall or Panorama M-Series or virtual appliance. However, because the log database is too large for an export or import to be practical, the following models do not support export or import of the entire log database: PA-7000 Series firewalls (all PAN-OS® releases), Panorama virtual appliances running Panorama 6.0 or later releases, and Panorama M-Series appliances (all Panorama releases).


| Function | Description |
| --- | --- |
| Configuration Management | |
| Revert to last saved configuration | Restores the default snapshot (.snapshot.xml) of the candidate configuration (the snapshot that you create or overwrite when you select **Config** > **Save Changes** at the top right of the web interface). (`Panorama only`) **Select Device Groups & Templates** to select specific device groups, templates, or template stacks configurations to revert. Device Group and Template Admins can only select the device groups, templates, or template stacks designated in their assigned access domain. |
| Revert to running config | Restores the current running configuration. This operation undoes all changes that every administrator made to the candidate configuration since the last commit. To revert only the changes of specific administrators, see [Revert Changes](revert-changes.html#ID0E1BEK). (`Panorama only`) **Select Device Groups & Templates** to select specific device groups, templates, or template stacks configurations to revert. Device Group and Template Admins can only select the device groups, templates, or template stacks designated in their assigned access domain. |
| Save named configuration snapshot | Creates a candidate configuration snapshot that does not overwrite the default snapshot (.snapshot.xml). Enter a **Name** for the snapshot or select an existing named snapshot to overwrite. (`Panorama only`) **Select Device Groups & Templates** to select specific device groups, templates, or template stacks configurations to save. Device Group and Template Admins can only select the device groups, templates, or template stacks designated in their assigned access domain. |
| Save candidate config | Creates or overwrites the default snapshot of the candidate configuration (.snapshot.xml) with the current candidate configuration. This is the same action as when you select **Config** > **Save Changes** at the top right of the web interface. To save only the changes of specific administrators, see [Save Candidate Configurations](save-candidate-configurations.html#ID0EZHCK). (`Panorama only`) **Select Device Groups & Templates** to select specific device groups, templates, or template stacks configurations to save. Device Group and Template Admins can only select the device groups, templates, or template stacks designated in their assigned access domain. |
| Load named configuration snapshot (`firewall`) or Load named Panorama configuration snapshot | Overwrites the current candidate configuration with one of the following: • |






| • | Custom-named running configuration that you imported. |
| --- | --- |






| • | Current running configuration. |
| --- | --- |



 The configuration must reside on the firewall or Panorama onto which you are loading it.
 Select the **Name** of the configuration and enter the **Decryption Key**, which is the master key of the firewall or Panorama (see [Device > Master Key and Diagnostics](device-master-key-and-diagnostics.html#ID0ELFYZ)). The master key is required to decrypt all the passwords and private keys within the configuration. If you are loading an imported configuration, you must enter the master key of the firewall or Panorama from which you imported. After the load operation finishes, the master key of the firewall or Panorama onto which you loaded the configuration re-encrypts the passwords and private keys.
 To generate new UUIDs for all rules in the configuration (for example, if you are loading a configuration from another firewall but you want to maintain unique rules when you load that configuration), the superuser must **Regenerate Rule UUIDs for selected named configuration** to generate new UUIDs for all rules.
 (`Panorama only`) Specify object, policy, device group, or template configurations to partially load configurations from the named configuration by selecting from the following:



| • | **Load Shared Objects**—Load only the Shared objects, along with all device group and template configurations. |
| --- | --- |






| • | **Load Shared Policies**—Load only the Shared policies, along with all device group and template configurations. |
| --- | --- |






| • | **Select Device Groups & Templates**—Specify device groups, templates, or template stacks configurations to load. Device Group and Template Admins can only select the device groups, templates, or template stacks designated in their assigned access domain |
| --- | --- |






| • | **Retain Rule UUIDs**—Keep the UUIDs in the current running configuration. |
| --- | --- |







 Load configuration version (`firewall`)
 or
 Load Panorama configuration version


 Overwrites the current candidate configuration with a previous version of the running configuration that is stored on the firewall or Panorama.
 Select the **Name** of the configuration and enter the **Decryption Key**, which is the master key of the firewall or Panorama (see [Device > Master Key and Diagnostics](device-master-key-and-diagnostics.html#ID0ELFYZ)). The master key is required to decrypt all the passwords and private keys within the configuration. After the load operation finishes, the master key re-encrypts the passwords and private keys.
 (`Panorama only`) Specify object, policy, device group or template configurations to partially load configurations from the named configuration by selecting:



| • | **Load Shared Objects**—Load only the Shared objects, along with all device group and template configurations. |
| --- | --- |






| • | **Load Shared Policies**—Load only the Shared policies, along with all device group and template configurations. |
| --- | --- |






| • | **Select Device Groups & Templates**—Specify device groups, templates, or template stacks configurations to load. Device Group and Template Admins can only select the device groups, templates, or template stacks designated in their assigned access domain |
| --- | --- |







 Export named configuration snapshot


 Exports the current running configuration, a candidate configuration snapshot, or a previously imported configuration (candidate or running). The firewall exports the configuration as an XML file with the specified name. You can save the snapshot in any network location.
 (`Panorama only`) **Select Device Groups & Templates** to select specific device groups, templates, or template stacks configurations to export. Device Group and Template Admins can only select the device groups, templates, or template stacks designated in their assigned access domain.




 Export configuration version


 Exports a **Version** of the running configuration as an XML file.
 (`Panorama only`) **Select Device Groups & Templates** to select specific device groups, templates, or template stacks configurations to export. Device Group and Template Admins can only select the device groups, templates, or template stacks designated in their assigned access domain.




 Export Panorama and devices config bundle
 (`Panorama only`)


 Generates and exports the latest versions of the Panorama running configuration backup and of each managed firewall. To automate the process of creating and exporting the configuration bundle daily to an SCP or FTP server, see [Panorama > Scheduled Config Export](panorama-scheduled-config-export.html#ID0EGG53).




 Export or push device config bundle
 (`Panorama only`)


 Prompts you to select a firewall and perform one of the following actions on the firewall configuration stored on Panorama:



| • | **Push & Commit** the configuration to the firewall. This action cleans the firewall (removes any local configuration from it) and pushes the firewall configuration stored on Panorama. After you import a firewall configuration, use this option to clean that firewall so you can manage it using Panorama. |
| --- | --- |






| • | **Export** the configuration to the firewall without loading it. To load the configuration, you must access the firewall CLI and run the configuration mode command **load device-state**. This command cleans the firewall in the same way as the **Push & Commit** option. |
| --- | --- |






| • | **Use FW Master Key** to encrypt the exported device configuration bundle with the master key deployed on the managed firewall. Enter the **FW Master Key** and then **Confirm FW Master Key**. |
| --- | --- |







 Export device state
 (`Firewall only`)


 Exports the firewall state information as a bundle. In addition to the running configuration, the state information includes device group and template settings pushed from Panorama. If the firewall is a GlobalProtect™ portal, the bundle also includes certificate information, a list of satellites that the portal manages, and satellite authentication information. If you replace a firewall or portal, you can restore the exported information on the replacement by importing the state bundle.
 Important:
 You must manually run the firewall state export or create a scheduled XML API script to export the file to a remote server. This should be done on a regular basis because satellite certificates often change.
 To create the firewall state file from the CLI, from configuration mode, run the save device state command. The file will be named device_state_cfg.tgz and is stored in /opt/pancfg/mgmt/device-state. The operational command to export the firewall state file is scp export device-state (you can also use tftp export device-state).
 For information on using the XML or REST API, refer to the [PAN-OS and Panorama API Guide](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-panorama-api.html).




 Import named config snapshot


 Imports a running or candidate configuration from any network location. Click **Browse** and select the configuration file to be imported.




 Import device state
 (`Firewall only`)


 Imports the state information bundle you exported from a firewall when you chose to **Export device state**. Besides the running configuration, the state information includes device group and template settings pushed from Panorama. If the firewall is a GlobalProtect portal, the bundle also includes certificate information, a list of satellites, and satellite authentication information. If you replace a firewall or portal, you can restore the information on the replacement by importing the state bundle.




 Import Device Configuration to Panorama
 (`Panorama only`)


 Imports a firewall configuration into Panorama. Panorama automatically creates a template to contain the network and device configurations. For each virtual system (vsys) on the firewall, Panorama automatically creates a device group to contain the policy and object configurations. The device groups will be one level below the Shared location in the hierarchy, though you can reassign them to a different parent device group after finishing the import (see [Panorama > VMware NSX](panorama-vmware-nsx.html#ID0EFC13)).
 CAUTION:**The content versions on Panorama (for example, Applications and Threats database) must be the same as or higher than the versions on the firewall from which you will import a configuration.
 Configure the following import options:



| • | **Device**—Select the firewall from which Panorama will import the configurations. The drop-down includes only firewalls that are connected to Panorama and are not assigned to any device group or template. You can select only an entire firewall, not an individual vsys. |
| --- | --- |






| • | Use FW Master Key**—Enable this option to decrypt the imported firewall configuration using the master key deployed on the managed firewall. Enter the **FW Master Key** and then **Confirm FW Master Key**. If you are decrypting the imported configuration of multiple firewalls, the firewalls must all use the same master key. |
| --- | --- |






| • | **Template Name**—Enter a name for the template that will contain the imported device and network settings. For a multi-vsys firewall, the field is blank. For other firewalls, the default value is the firewall name. You cannot use the name of an existing template. |
| --- | --- |






| • | **Device Group Name Prefix** (`multi-vsys firewalls only`)—Optionally, add a character string as a prefix for each device group name. |
| --- | --- |






| • | **Device Group Name**—For a multi-vsys firewall, each device group has a vsys name by default. For a other firewalls, the default value is the firewall name. You can edit the default names but cannot use the name of an existing device group. |
| --- | --- |






| • | **Import devices' shared objects into Panorama's shared context** (enabled by default)—Panorama imports objects that belong to Shared in the firewall to Shared in Panorama. |
| --- | --- |



 Note:



| | Panorama regards all objects as shared on a firewall without multiple virtual systems. If you disable this option, Panorama copies shared firewall objects into device groups instead of Shared. This setting has the following exceptions: |
| --- | --- |






| ◦ | If a shared firewall object has the same name and value as an existing shared Panorama object, the import excludes that firewall object. |
| --- | --- |






| ◦ | If the name or value of the shared firewall object differs from the shared Panorama object, Panorama imports the firewall object into each device group. |
| --- | --- |






| ◦ | If a configuration imported into a template references a shared firewall object, Panorama imports that object into Shared regardless of whether you select this option. |
| --- | --- |






| ◦ | If a shared firewall object references a configuration imported into a template, Panorama imports the object into a device group regardless of whether you select this option. |
| --- | --- |






| • | **Rule Import Location**—Select whether Panorama will import policies as pre-rules or post-rules. Regardless of your selection, Panorama imports default security rules (intrazone-default and interzone-default) into the post-rulebase. |
| --- | --- |



 CAUTION:
 If Panorama has a rule with the same name as a firewall rule that you import, Panorama displays both rules. However, rule names must be unique: delete one of the rules before performing a commit on Panorama or the commit will fail.




 Device Operations




 Reboot


 To restart the firewall or Panorama, **Reboot Device**. The firewall or Panorama logs you out, reloads the software (PAN-OS or Panorama) and the active configuration, closes and logs existing sessions, and creates a System log entry that shows the name of the administrator who initiated the shutdown. Any configuration changes that were not saved or committed are lost (see [Device > Setup > Operations](device-setup-operations.html#ID0EE34W)).
 Tip:
 If the web interface is not available, use the following operational CLI command:
 request restart system




 Shutdown


 To perform a graceful shutdown of the firewall or Panorama, **Shutdown Device** or **Shutdown Panorama** and then click **Yes** when prompted. Any configuration changes that are not saved or committed are lost. All administrators will be logged off and the following processes will occur:



| • | All login sessions will be logged off. |
| --- | --- |






| • | Interfaces will be disabled. |
| --- | --- |






| • | All system processes will be stopped. |
| --- | --- |






| • | Existing sessions will be closed and logged. |
| --- | --- |






| • | System Logs will be created that will show the administrator name who initiated the shutdown. If this log entry cannot be written, a warning will appear and the system will not shutdown. |
| --- | --- |






| • | Disk drives will be cleanly unmounted and the firewall or Panorama will power off. |
| --- | --- |



 You must unplug the power source and plug it back in before you can power back on the firewall or Panorama.
 Note:



| | If the web interface is not available, use the following CLI command: |
| --- | --- |



 request shutdown system




 Restart Dataplane


 **Restart Dataplane** to restart the data functions of the firewall without rebooting. This option is not available on Panorama or PA-220, PA-800 Series, or VM-Series firewalls.
 Tip:
 If the web interface is not available, use the following CLI command:
 request restart dataplane
 On a PA-7000 Series firewall, each NPC has a dataplane so you can restart the NPC to perform this operation by running the command
 request chassis restart slot.




 Miscellaneous




 Custom Logos


 Use **Custom Logos** to customize any of the following:



| • | **Login Screen** background image |
| --- | --- |






| • | **Main UI** (web interface) header image |
| --- | --- |






| • | **PDF Report Title Page** image. Refer to [Monitor > PDF Reports > Manage PDF Summary](monitor-pdf-reports-manage-pdf-summary.html#ID0EXSFO). |
| --- | --- |






| • | **PDF Report Footer** image |
| --- | --- |



 Upload ( <image> ) an image file to preview it or delete ( ) a previously-uploaded image.
 To return to the default logo, remove your entry and **Commit**.
 For the **Login Screen** and **Main UI**, you can display ( ) the image as it will appear; if necessary, the firewall crops the image to fit. For PDF reports, the firewall automatically resizes the images to fit without cropping. In all cases, the preview displays the recommended image dimensions.
 The maximum image size for any logo is 128KB. The supported file types are png and jpg. The firewall does not support image files that are interlaced, images that contain alpha channels, and gif file types because such files interfere with PDF report generation. You might need to contact the illustrator who created an image to remove alpha channels or make sure the graphics software you are using does not save files with the alpha channel feature.
 For information on generating PDF reports, see [Monitor > PDF Reports > Manage PDF Summary](monitor-pdf-reports-manage-pdf-summary.html#ID0EXSFO).




 SNMP Setup


 [Enable SNMP Monitoring](enable-snmp-monitoring.html#ID0EEVAX).




 Storage Partition Setup (`Panorama only`)


 [Log Storage Partitions for a Panorama Virtual Appliance in Legacy Mode](log-storage-partitions-for-a-panorama-virtual-appliance-in-legacy-mode.html#ID0EVCP2).



 Parent topic
 [Device](device.html#ID0EY2QW)