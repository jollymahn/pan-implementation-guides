# Use the Panorama Web Interface

*Panorama Web Interface : Use the Panorama Web Interface*

## Use the Panorama Web Interface


The web interface on both Panorama and the firewall has the same look and feel. However, the Panorama web interface includes additional options and a Panorama-specific tab for managing Panorama and for using Panorama to manage firewalls and Log Collectors.


The following common fields appear in the header or footer of several Panorama web interface pages.



| Common Field | Description |
| --- | --- |
| Context | You can use the **Context** drop-down above the left-side menu to switch between the Panorama web interface and a firewall web interface (see [Context Switch](context-switch.html#ID0EMKJ2)). |
| | In the **Dashboard** and **Monitor** tabs, click refresh ( ) in the tab header to manually refresh data in those tabs. You can also use the unlabeled drop-down on the right side of the tab header to select an automatic refresh interval in minutes (**1 min**, **2 mins**, or **5 mins**); to disable automatic refreshing, select **Manual**. |
| Access Domain | An access domain defines access to specific device groups, templates, and individual firewalls (through the **Context** drop-down). If you log in as an administrator with multiple access domains assigned to your account, the **Dashboard**, **ACC**, and **Monitor** tabs display information (such as log data) only for the **Access Domain** you select in the footer of the web interface. Note:  |







 Device Group


 A device group comprises firewalls and virtual systems that you manage as a group (see [Panorama > Device Groups](panorama-device-groups.html#ID0EXTN3)). The **Dashboard**, **ACC**, and **Monitor** tabs display information (such as log data) only for the **Device Group** you select in the tab header. In the **Policies** and **Objects** tabs, you can configure settings for a specific **Device Group** or for all device groups (select **Shared**).




 Template


 A template is a group of firewalls with common network and device settings, and a template stack is a combination of templates (see [Panorama > Templates](panorama-templates.html#ID0E1SK3)). In the **Network** and **Device** tabs, you configure settings for a specific **Template** or template stack. Because you can edit settings only within individual templates, the settings in these tabs are read-only if you select a template stack.




 View by: Device


 By default, the **Network** and **Device** tabs display the settings and values available to firewalls that are in normal operational mode and that support multiple virtual systems and VPNs. However, you can use the following options to filter the tabs to display only the mode-specific settings you want to edit:



| • | In the **Mode** drop-down, select or clear the **Multi VSYS**, **Operational Mode**, and **VPN Mode** options. |
| --- | --- |






| • | Set all the mode options to reflect the mode configuration of a particular firewall by selecting it in the **View by: Device** drop-down. |
| --- | --- |







 Mode




The **Panorama** tab provides the following pages for managing Panorama and Log Collectors.



| Panorama Pages | Description |
| --- | --- |
| Setup | Select **Panorama** > **Setup** for the following tasks: • |






| • | Back up and restore configurations, reboot Panorama, and shut down Panorama. These operations are similar to those you perform for firewalls: select [Device > Setup > Operations](device-setup-operations.html#ID0EE34W). |
| --- | --- |






| • | Define server connections for DNS, NTP, and Palo Alto Networks updates. These settings are similar to those you configure for firewalls: select [Device > Setup > Services](device-setup-services.html#ID0EJYEX). |
| --- | --- |






| • | Define network settings for Panorama interfaces. Select [Panorama > Setup > Interfaces](panorama-setup-interfaces.html#ID0EOVP2). |
| --- | --- |






| • | Specify settings for the WildFire™ appliance. These settings are similar to those you configure for firewalls: elect [Device > Setup > WildFire](device-setup-wildfire.html#ID0EH5OX). |
| --- | --- |






| • | Manage hardware security module (HSM) settings. These settings are similar to those you configure for firewalls: select [Device > Setup > HSM](device-setup-hsm.html#ID0EWVBX). |
| --- | --- |







 High Availability


 Enables you to configure high availability (HA) for a pair of Panorama management servers. Select [Panorama > High Availability](panorama-high-availability.html#ID0EEES2).




 Config Audit


 Enables you to see the differences between configuration files. Select [Device > Config Audit](device-config-audit.html#ID0E5T6X).




 Password Profiles


 Enables you to define password profiles for Panorama administrators. Select [Device > Password Profiles](device-password-profiles.html#ID0ECFBY).




 Administrators


 Enables you to configure Panorama administrator accounts. Select [Panorama > Administrators](panorama-administrators.html#ID0E2D62).
 Tip:
 If an administrator account is locked out, the **Administrators** page displays a lock in the Locked User column. You can click the lock to unlock the account.




 Admin Roles


 Enables you to define administrative roles, which control the privileges and responsibilities of administrators who access Panorama. Select [Panorama > Admin Roles](panorama-admin-roles.html#ID0ESHA3).




 Access Domain


 Enables you to control administrator access to device groups, templates, template stacks, and the web interface of firewalls. Select [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3).




 Authentication Profile


 Enables you to specify a profile for authenticating access to Panorama. Select [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY).




 Authentication Sequence


 Enables you to specify a series of authentication profiles to use for permitting access to Panorama. Select [Device > Authentication Sequence](device-authentication-sequence.html#ID0EO3IY).




 User Identification


 Enables you to configure a custom certificate profile for mutual authentication with User-ID agents. Select [Device > User Identification > Connection Security](connection-security.html#ID0ERCS3).




 Data Redistribution


 Enables you to selectively redistribute data to other firewalls or Panorama management systems. Select [Device > Data Redistribution](device-data-redistribution.html#ID0EDBKY).




 Managed Devices


 Enables you to manage firewalls, which includes adding firewalls to Panorama as managed devices, displaying firewall connection and license status, tagging firewalls, updating firewall software and content, and loading configuration backups. Select [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3).




 Templates


 Enables you to manage configuration options in the **Device** and **Network** tabs. Templates and template stacks enable you to reduce the administrative effort of deploying multiple firewalls with the same or similar configurations. Select [Panorama > Templates](panorama-templates.html#ID0E1SK3).




 Device Groups


 Enables you to configure device groups, which group firewalls based on function, network segmentation, or geographic location. Device groups can include physical firewalls, virtual firewalls, and virtual systems.
 Typically, firewalls in a device group need similar policy configurations. Using the **Policies** and **Objects** tab on Panorama, device groups provide a way to implement a layered approach for managing policies across a network of managed firewalls. You can nest device groups in a tree hierarchy of up to four levels. Descendant groups automatically inherit the policies and objects of ancestor groups and of the Shared location. Select [Panorama > Device Groups](panorama-device-groups.html#ID0EXTN3).




 Managed Collectors


 Enables you to manage Log Collectors. Because you use Panorama to configure Log Collectors, they are also called managed collectors. A managed collector can be local to the Panorama management server (M-Series appliance or Panorama virtual appliance in Panorama mode) or a Dedicated Log Collector (M-Series appliance in Log Collector mode). Select [Panorama > Managed Collectors](panorama-managed-collectors.html#ID0E3IO3).
 You can also install [Software Updates for Dedicated Log Collectors](software-updates-for-dedicated-log-collectors.html#ID0EJBT3).
 Tip:
 You can [convert a Panorama management server to a DedicatedLogCollector](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-the-m-series-appliance/set-up-the-m-series-appliance-as-a-log-collector.html).




 Collector Groups


 Enables you to manage Collector Groups. A Collector Group logically groups Log Collectors so you can apply the same configuration settings and assign firewalls to them. Panorama uniformly distributes the logs among all the disks in a Log Collector and across all members in the Collector Group. Select [Panorama > Collector Groups](panorama-collector-groups.html#ID0EJRT3).




 Plugins


 Enables you to manage plugins for third-party integration, such as VMware NSX. Select [Panorama > VMware NSX](panorama-vmware-nsx.html#ID0EFC13).




 VMware NSX


 Enables you to automate provisioning of VM-Series firewalls by enabling communication between the NSX Manager and Panorama. Select [Panorama > VMware NSX](panorama-vmware-nsx.html#ID0EFC13).




 Certificate Management


 Enables you to configure and manage certificates, certificate profiles, and keys. Select [Manage Firewall and Panorama Certificates](manage-firewall-and-panorama-certificates.html#ID0E1U5Y).




 Log Settings


 Enables you to forward logs to Simple Network Management Protocol (SNMP) trap receivers, syslog servers, email servers, and HTTP servers. Select [Device > Log Settings](device-log-settings.html#ID0ETQGZ).




 Server Profiles


 Enables you to configure profiles for the different server types that provide services to Panorama. Select any of the following to configure a specific server type:



| • | [Device > Server Profiles > Email](device-server-profiles-email.html#ID0EHGLZ) |
| --- | --- |






| • | [Device > Server Profiles > HTTP](device-server-profiles-http.html#ID0E3GMZ) |
| --- | --- |






| • | [Device > Server Profiles > SNMP Trap](device-server-profiles-snmp-trap.html#ID0E3WJZ) |
| --- | --- |






| • | [Device > Server Profiles > Syslog](device-server-profiles-syslog.html#ID0E1PKZ) |
| --- | --- |






| • | [Device > Server Profiles > RADIUS](device-server-profiles-radius.html#ID0ETRNZ) |
| --- | --- |






| • | [Device > Server Profiles > TACACS+](device-server-profiles-tacacs.html#ID0EW6OZ) |
| --- | --- |






| • | [Device > Server Profiles > LDAP](device-server-profiles-ldap.html#ID0EMVPZ) |
| --- | --- |






| • | [Device > Server Profiles > Kerberos](device-server-profiles-kerberos.html#ID0EEUQZ) |
| --- | --- |






| • | [Device > Server Profiles > SAML Identity Provider](device-server-profiles-saml-identity-provider.html#ID0EVDRZ) |
| --- | --- |







 Scheduled Config Export


 Enables you to export Panorama and firewall configurations to an FTP server or Secure Copy (SCP) server on a daily basis. Select [Panorama > Scheduled Config Export](panorama-scheduled-config-export.html#ID0EGG53).




 Software


 Enables you to update Panorama software. Select [Panorama > Software](panorama-software.html#ID0E2153).




 Dynamic Updates


 Enables you to view the latest application definitions and information for new security threats, such as Antivirus signatures (threat prevention license required) and then update Panorama with the new definitions. Select [Device > Dynamic Updates](device-dynamic-updates.html#ID0EVAWZ).




 Support


 Enables you to access product and security alerts from Palo Alto Networks. Select [Device > Support](device-support.html#ID0ELVXZ).




 Device Deployment


 Enables you to deploy software and content updates to firewalls and Log Collectors. Select [Panorama > Device Deployment](panorama-device-deployment.html#ID0E5BA4).




 Master Key and Diagnostics


 Enables you to specify a master key to encrypt private keys on Panorama. By default, Panorama stores private keys in encrypted form even if you don’t specify a new master key. Select [Device > Master Key and Diagnostics](device-master-key-and-diagnostics.html#ID0ELFYZ).



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)