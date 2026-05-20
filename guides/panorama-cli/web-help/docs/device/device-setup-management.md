# Device > Setup > Management

*Device : Device &gt; Setup &gt; Management*

## Device > Setup > Management




| • | **Device** > **Setup** > **Management** |
| --- | --- |






| • | **Panorama** > **Setup** > **Management** |
| --- | --- |




On a firewall, select **Device** > **Setup** > **Management** to configure management settings.


On Panorama™, select **Device** > **Setup** > **Management** to configure firewalls that you manage with Panorama templates. Select **Panorama** > **Setup** > **Management** to configure management settings for Panorama.


The following management settings apply to both the firewall and Panorama except where noted.




| • | [General Settings](device-setup-management.html#ID0EU2TW) |
| --- | --- |






| • | [Authentication Settings](device-setup-management.html#ID0EQJVW) |
| --- | --- |






| • | [Policy Rulebase Settings](device-setup-management.html#ID0EAEWW) |
| --- | --- |






| • | [Panorama Settings: Device > Setup > Management](device-setup-management.html#ID0EGMWW) (settings configured on the firewall to connect to Panorama) |
| --- | --- |






| • | [Panorama Settings: Panorama > Setup > Management](device-setup-management.html#ID0EISXW) (settings configured on Panorama for connections to firewalls) |
| --- | --- |






| • | [Logging and Reporting Settings](device-setup-management.html#ID0EGXYW) |
| --- | --- |






| • | [Log Interface (PA-5450 only)](device-setup-management.html#ID0EFC2W) |
| --- | --- |






| • | [Banners and Messages](device-setup-management.html#ID0E4N2W) |
| --- | --- |






| • | [Minimum Password Complexity](device-setup-management.html#ID0ESD3W) |
| --- | --- |






| • | [AutoFocus™](device-setup-management.html#ID0E2V3W) |
| --- | --- |






| • | [Strata Logging Service](device-setup-management.html#ID0EA23W) |
| --- | --- |






| • | [SSH Management Profiles Settings](device-setup-management.html#ID0EUP4W) |
| --- | --- |






| • | [PAN-OS Edge Service Settings](device-setup-management.html#ID0EIU4W) |
| --- | --- |





| Item | Description |
| --- | --- |
| **General Settings** | |
| Hostname | Enter a hostname (up to 31 characters). The name is case-sensitive, must be unique, and can contain only letters, numbers, periods, hyphens, and underscores. If you don’t enter a value, PAN-OS® uses the firewall model (for example, PA-5220_2) as the default. Optionally, you can configure the firewall to use a hostname that a DHCP server provides. See [Accept DHCP server-provided Hostname (Firewall only)](device-setup-management.html#ID0EAAUW). Fastpath:  Configure a unique host name to easily identify the device you are managing. |
| Domain | Enter the name of the network domain for the firewall (up to 31 characters). Optionally, you can configure the firewalls and Panorama to use a domain that a DHCP server provides. See [Accept DHCP server-provided Domain (Firewall only)](device-setup-management.html#ID0EHBUW). |
| Accept DHCP server-provided Hostname (`Firewall only`) | (`Applies only when the Management Interface IP Type is DHCP Client`) Select this option to have the management interface accept the hostname it receives from the DHCP server. The hostname from the server (if valid) overwrites any value specified in the Hostname field. |
| Accept DHCP server-provided Domain (`Firewall only`) | (`Applies only when the Management Interface IP Type is DHCP Client`) Select this option to have the management interface accept the domain (DNS suffix) it receives from the DHCP server. The domain from the server overwrites any value specified in the **Domain** field. |
| Login Banner | Enter text (up to 3,200 characters) to display on the web interface login page below the **Name** and **Password** fields. |
| Force Admins to Acknowledge Login Banner | Select this option to display and force administrators to select **I Accept and Acknowledge the Statement Below** (above the login banner on the login page), which forces administrators to acknowledge that they understand and accept the contents of the message before they can **Login**. |
| SSL/TLS Service Profile | Assign an existing SSL/TLS service profile or create a new one to specify a certificate and the SSL/TLS protocol settings allowed on the management interface (see [Device > Certificate Management > SSL/TLS Service Profile](device-certificate-management-ssltls-service-profile.html#ID0E3TCZ)). The firewall or Panorama uses this certificate to authenticate administrators who access the web interface through the management (MGT) interface or any other interface that supports HTTP/HTTPS management traffic (see [Network > Network Profiles > Interface Mgmt](network-network-profiles-interface-mgmt.html#ID0EDJCW)). If you select **none** (default), the firewall or Panorama uses a predefined certificate. Fastpath:  The predefined certificate is provided for convenience. For better security, assign an SSL/TLS Service profile. To ensure trust, the certificate must be signed by a certificate authority (CA) certificate that is in the trusted root certificate store of the client systems. |
| Time Zone | Select the time zone of the firewall. |
| Locale | Select a language for PDF reports from the drop-down. See [Monitor > PDF Reports > Manage PDF Summary](monitor-pdf-reports-manage-pdf-summary.html#ID0EXSFO). Even if you have a specific language preference set for the web interface, PDF reports will use the language specified for **Locale**. |
| Date | Set the date on the firewall; enter the current date (in YYYY/MM/DD format) or select the date from the drop-down. Note:  |







 Time


 Set the time on the firewall; enter the current time) in 24-hour format) or select the time from the drop-down.
 Note:



| | You can also define an NTP server (**Device** > **Setup** > **Services**). |
| --- | --- |







 Serial Number
 (`Panorama virtual appliances only`)


 Enter the serial number for Panorama. You can find the serial number in the order fulfillment email you received from Palo Alto Networks®.




 Latitude


 Enter the latitude (-90.0 to 90.0) of the firewall.




 Longitude


 Enter the longitude (-180.0 to 180.0) of the firewall.




 Automatically acquire commit lock


 Select this option to automatically apply a commit lock when you change the candidate configuration. For more information, see [Lock Configurations](lock-configurations.html#ID0E2ZFK).
 Fastpath:
 Enable **Automatically Acquire Commit Lock** so that other administrators can’t make configuration changes until the first administrator commits her/his changes.




 Certificate Expiration Check


 Instruct the firewall to create warning messages when on-box certificates approach their expiration date.
 Fastpath:
 Enable **Certificate Expiration Check** to generate a warning message when on-box certificates approach their expiration date.




 Multiple Virtual System Capability


 Enables the use of multiple virtual systems on firewalls that support this feature (see [Device > Virtual Systems](device-virtual-systems.html#ID0ELK3Y)).
 CAUTION:
 To enable multiple virtual systems on a firewall, firewall policies must reference no more than 640 distinct user groups. If necessary, reduce the number of referenced user groups. Then, after you enable and add multiple virtual systems, the policies can then reference another 640 user groups for each additional virtual system.




 URL Filtering Database
 (`Panorama only`)


 Select a URL Filtering vendor for use with Panorama: **brightcloud** or **paloaltonetworks** (PAN-DB).




 Use Hypervisor Assigned MAC Addresses
 (`VM-Series firewalls only`)


 Select this option to have the VM-Series firewall use the MAC address that the hypervisor assigned, instead of generating a MAC address using the PAN-OS custom schema.
 If you enable this option and use an IPv6 address for the interface, the interface ID cannot use the EUI-64 format, which derives the IPv6 address from the interface MAC address. In a high availability (HA) active/passive configuration, a commit error occurs if you use the EUI-64 format.




 GTP Security


 Select this option to enable the ability to inspect the control plane and user dataplane messages in the GPRS Tunneling Protocol (GTP) traffic. See [Objects > Security Profiles > Mobile Network Protection](objects-security-profiles-mobile-network-protection.html#ID0EJAZR) to configure a Mobile Network Protection profile so that you can enforce policy on GTP traffic.




 SCTP Security


 Select this option to enable the ability to inspect and filter Stream Control Transmission Protocol (SCTP) packets and chunks, and to apply SCTP initiation (INIT) flood protection. See [Objects > Security Profiles > SCTP Protection](objects-security-profiles-sctp-protection.html#ID0E3Z2R). For SCTP INIT flood protection, see [Configure SCTP INIT Flood Protection](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-init-flood-protection.html).




 Advanced Routing


 Select this option to enable the advanced routing engine, which supports static routes, BGP, OSPFv2, OSPFv3, IPv4 multicast, and RIPv2 on [logical routers](network-routing-logical-routers.html#ID0E1FWU). You must commit and reboot the firewall for the change to the new routing engine to take effect (or to change back to the legacy route engine).




 Tunnel Acceleration


 Select this option to improve performance and throughput for traffic going through GRE tunnels, VXLAN tunnels, and GTP-U tunnels This option is enabled by default.



| • | **GRE and VXLAN tunnel acceleration**—Supported on PA-3200 Series firewalls and PA-7000 Series firewalls with PA-7000-NPC and SMC-B. |
| --- | --- |






| • | **GTP-U tunnel acceleration**—Supported on PA-7000 Series firewalls with PA-7000-NPC and SMC-B. For GTP-U tunnel traffic to have tunnel acceleration, Tunnel Acceleration must be enabled, GTP must be enabled, no tunnel content inspection (TCI) policy rules for GTP-U protocol can be configured, and a Security policy rule with a Mobile Network Protection profile attached must allow the GTP traffic. |
| --- | --- |



 Note:



| | If you disable or re-enable Tunnel Acceleration and commit, you must reboot the firewall. |
| --- | --- |







 **Device Certificate**




 Get certificate


 Click to enter the One Time Password (OTP) generated from the Palo Alto Networks [Customer Support Portal](https://support.paloaltonetworks.com/). The device certificate is required to successfully authenticate Panorama with the CSP and leverage cloud services such as Zero Touch Provisioning (ZTP), IoT, Device Telemetry, and Enterprise Data Loss Prevention (DLP). After you successfully install the device certificate, the following is displayed:



| • | **Current Device Certificate Status**—The current status of device certificate (Valid, Invalid, or Expired) |
| --- | --- |






| • | **Not Valid Before**—Timestamp indicating when the device certificate validity begins. |
| --- | --- |






| • | **Not Valid After**—Timestamp indicating when the device certificate validity expires and the device certificate becomes Invalid or Expired. |
| --- | --- |






| • | **Last Fetched Message**—Message displaying the whether the device certificate is successfully installed or if the device certificate installation failed. |
| --- | --- |






| • | **Last Fetched Status**—The status of fetching the device certificate (success or failed). |
| --- | --- |






| • | **Last Fetched Timestamp**—Timestamp of the last device certificate installation attempt. |
| --- | --- |







 **Authentication Settings**




 Authentication Profile


 Select the authentication profile (or sequence) the firewall uses to authenticate administrative accounts that you define on an external server instead of locally on the firewall (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)). When external administrators log in, the firewall requests authentication and authorization information (such as the administrative role) from the external server.
 Enabling authentication for external administrators requires additional steps based on the server type that the authentication profile specifies, which must be one of the following:



| • | [RADIUS](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-radius-authentication.html) |
| --- | --- |






| • | TACACS+ |
| --- | --- |






| • | SAML |
| --- | --- |



 CAUTION:
 Administrators can use SAML to authenticate to the web interface but not to the CLI.
 Select **None** to disable authentication for external administrators.
 For administrative accounts that you define locally (on the firewall), the firewall authenticates using the authentication profile assigned to those accounts (see [Device > Administrators](device-administrators.html#ID0ELSCY)).




 Certificate Profile


 Select a certificate profile to verify the client certificates of administrators who are configured for certificate-based access to the firewall web interface. For instructions on configuring certificate profiles, see [Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ).
 Fastpath:
 Configure a certificate profile to ensure that the administrator’s host machine has the right certificates to authenticate with the Root CA certificate defined in the certificate profile.




 Idle Timeout


 Enter the maximum time (in minutes) without any activity on the web interface or CLI before an administrator is automatically logged out (range is 0 to 1,440; default is 60). A value of 0 means that inactivity does not trigger an automatic logout.
 CAUTION:
 Both manual and automatic refreshing of web interface pages (such as the **Dashboard** and System Alarms dialog) reset the **Idle Timeout** counter. To enable the firewall to enforce the timeout when you are on a page that supports automatic refreshing, set the refresh interval to **Manual** or to a value higher than the **Idle Timeout**. You can also disable **Auto Refresh** in the **ACC** tab.
 Fastpath:
 Set the **Idle Timeout** to 10 minutes to prevent unauthorized users from accessing the firewall if an administrator leaves a firewall session open.




 API Key Lifetime


 Enter the length of time (in minutes) for which the API key is valid (range is 0 to 525,600; default is 0). A value of 0 means that the API key never expires.
 **Expire All API Keys** to invalidate all previously generated API keys. Use this option with caution because all existing keys are rendered useless and any operation where you are currently using those API keys will stop functioning.
 Fastpath:**Perform this operation during a maintenance window so that you can replace the keys without disrupting current implementations where you referenced the API keys.




 API Keys Last Expired


 Displays the timestamp of when the API key last expired. This field has no value if you have never reset your keys.




 API Key Certificate


 Select a certificate that will utilize the PAN-OS device certificate management function to encrypt the API key.




 Failed Attempts


 Enter the number of failed login attempts (0 to 10) that the firewall allows for the web interface and CLI before locking out the administrator account. A value of 0 specifies unlimited login attempts. The default value is 0 for firewalls in normal operational mode and 10 for firewalls in FIPS-CC mode. Limiting login attempts can help protect the firewall from brute force attacks.
 (`Panorama managed firewalls only**) The minimum value supported is 1` when you manage the failed attempts setting from a template or template stack configuration on Panorama.
 CAUTION:
 If you set the **Failed Attempts** to a value other than 0 but leave the **Lockout Time** at 0, the **Failed Attempts** is ignored and the user is never locked out.
 Fastpath:
 Set the number of **Failed Attempts** to 5 or fewer to accommodate a reasonable number of retries in case of typing errors, while preventing malicious systems from trying brute force methods to log in to the firewall.




 Lockout Time


 Enter the number of minutes (range is 0 to 60) for which the firewall locks out an administrator from access to the web interface and CLI after reaching the **Failed Attempts** limit. A value of 0 (default) means the lockout applies until another administrator manually unlocks the account.
 CAUTION:
 If you set the **Failed Attempts** to a value other than 0 but leave the **Lockout Time** at 0, the user is locked out after the set number of failed login attempts until another administrator manually unlocks the account.
 Fastpath:
 Set the **Lockout Time** to at least 30 minutes to prevent continuous login attempts from a malicious actor.




 Max Session Count


 Enter the number of concurrent sessions allowed for all administrator and user accounts (range is 0 to 4). A value of 0 (default) means that an unlimited amount of concurrent sessions are allowed.
 Note:



| | In FIPS-CC mode, the range is 0 to 4 with a default value of 4. Enter a value of 0 to allow an unlimited amount of concurrent sessions. |
| --- | --- |







 Max Session Time


 Enter the number of minutes (range is 60 to 1,499) that an active, non-idle administrator can remain logged in. Once this max session time is reached, the session is terminated and requires re-authentication to begin another session. The default value is set to 0 (30 days), which cannot be manually entered. If no value is entered, the **Max Session Time** defaults to 0.
 Note:



| | In FIPS-CC mode, the range is 60 to 1,499 and the default value is 720. If no value is entered, the **Max Session Time** defaults to 720. |
| --- | --- |







 **Policy Rulebase Settings**




 Require Tag on Policies


 Requires at least one tag when creating a new policy rule. If a policy rule already exists when you enable this option, you must add at least one tag the next time you edit the rule.




 Require Description on Policies


 Requires that you add a **Description** when you create a new policy rule. If a policy rule already exists when you enable this option, you must add a **Description** the next time you edit the rule.




 Fail Commit if Policies Have No Tags or Descriptions


 Forces your commit to fail if you do not add any tags or a description to the policy rule. If a policy rule already exists when you enable this option, the commit will fail if no tag or description are added the next time you edit the rule.
 To fail the commit, you must **Require tag on policies** or **Require description on policies**.




 Require Audit Comment on Policies


 Requires **Audit Comment** when creating a new policy rule. If a policy rule already exists when you enable this option, you must add **Audit Comment** the next time you edit the rule.




 Audit Comment Regular Expression


 Specify requirements for the comment format parameters in audit comments.




 Wildcard Top Down Match Mode (`Firewall only`)


 (`PAN-OS 10.2.1 and later 10.2 releases`) When Wildcard Top Down Match Mode is enabled, when a packet matches Security policy rules that use a source or destination IP address with wildcard mask and the masks overlap, the firewall chooses the first of those matching rules (in top-down order) that fully matches all address bits based on masking. The default is disabled; in the event of matching overlapping wildcard masks, the firewall chooses the rule with the longest matching prefix in the wildcard mask.




 Policy Rule Hit Count


 Tracks how often traffic matches the policy rules you configured on the firewall. When enabled, you can view the total Hit Count for total traffic matches against each rule along with the date and time when the rule was Created, Modified, was First Hit and Last Hit.




 Policy Application Usage





 **Panorama Settings**: Device > Setup > Management
 Configure the following settings on the firewall or in a template on Panorama. These settings establish a connection from the firewall to Panorama.
 You must also configure connection and object sharing settings on Panorama ([Panorama Settings: Panorama > Setup > Management](device-setup-management.html#ID0EISXW)).
 Note:



| | The firewall uses an SSL connection with AES256 encryption to register with Panorama. By default, Panorama and the firewall authenticate each other using predefined 2,048-bit certificates and they use the SSL connection for configuration management and log collection. To further secure the SSL connections between Panorama, firewalls, and log collectors, see [Secure Client Communication](device-setup-management.html#ID0ER1WW) to configure custom certificates between the firewall and Panorama or a log collector. |
| --- | --- |







 Managed By


 Specify whether the firewall is managed by **Panorama** or by a **Cloud Service**.




 (`Managed By Panorama only`) Panorama Servers


 Enter the IP address or FQDN of the Panorama server. If Panorama is in a high availability (HA) configuration, in the second **Panorama Servers** field, enter the IP address or FQDN of the secondary Panorama server.




 Auth Key
 (`Managed By Panorama only`)


 Enter the [device registration auth key](panorama-device-registration-auth-key.html#ID0EHME4) generated on Panorama.




 Port
 (`Managed By Cloud Service only`)


 Select the port used for firewall and Strata Cloud Manager communication. You can select the **Default** TCP port 3978 or TCP port **443**.




 Enable Compress Config
 (`Managed By Cloud Service only`)


 Check (enable) to compress the size of the configuration file exchanged between the firewall and Strata Cloud Manager, and vice versa, to increase file transfer times. Enabling this setting does not cause load or delay in firewall processing or increase commit operation times.




 Receive Timeout for Connection to Panorama


 Enter the timeout (in seconds) for receiving TCP messages from Panorama (range is 1 to 240; default is 240).




 Send Timeout for Connection to Panorama


 Enter the timeout (in seconds) for sending TCP messages to Panorama (range is 1 to 240; default is 240).




 Retry Count for SSL Send to Panorama


 Enter the number of retry attempts allowed when sending Secure Socket Layer (SSL) messages to Panorama (range is 1 to 64; default is 25).




 Enable Automated Commit Recovery


 Enable to enable the firewall to automatically verify its connection to the Panorama management server when a configuration is committed and pushed to the firewall, and at configured intervals after a configuration is successfully pushed.
 When enabled, and the firewall fails to verify its connection to the Panorama management server, the firewall and Panorama management automatically revert their configuration to the previous running configuration to restore connectivity.




 Number of attempts to check for Panorama connectivity


 When **Enabled Automated Commit Recovery** is enabled, configure the number of times the firewall tests its connection to the Panorama management server.




 Interval between retries (sec)


 When **Enable Automated Commit Recovery** is enabled, configure the time in seconds between the number of attempts the firewall tests its connection to the Panorama management server.




 Secure Client Communication


 Enable **Secure Client Communication** to ensure that the firewall uses configured custom certificates (instead of the default certificate) to authenticate SSL connections with Panorama or log collectors.



| • | **None** (default)—No device certificate is configured and the default predefined certificate is used. |
| --- | --- |






| • | **Local**—The firewall uses a local device certificate and the corresponding private key generated on the firewall or imported from an existing enterprise PKI server. |
| --- | --- |






| ◦ | **Certificate**—Select the local device certificate you generated or imported. This certificate can be unique to the firewall (based on a hash of the serial number of that firewall) or it can be a common device certificate used by all firewalls that connect to Panorama. |
| --- | --- |






| ◦ | **Certificate Profile**—Select the Certificate Profile from the drop-down. The Certificate Profile defines the CA certificate for verifying client certificates and how to verify certificate revocation status. |
| --- | --- |






| • | **SCEP**—The firewall uses a device certificate and private key generated by a Simple Certificate Enrollment Protocol (SCEP) server. |
| --- | --- |






| ◦ | **SCEP Profile**—Select a [Device > Certificate Management > SCEP](device-certificate-management-scep.html#ID0EQEDZ) from the drop-down. The SCEP Profile provides Panorama with the necessary information to authenticate client devices against a SCEP server in your enterprise PKI. |
| --- | --- |






| ◦ | **Certificate Profile**—Select the [Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ) from the drop-down. The Certificate Profile defines the CA certificate for verifying client certificates and how to verify certificate revocation status. |
| --- | --- |











| • | **Customize Communication**—The firewall uses its configured custom certificate to authenticate with the selected devices. |
| --- | --- |






| ◦ | **Panorama Communication**—The firewall uses the configured client certificate for communication with Panorama. |
| --- | --- |






| ◦ | **PAN-DB Communication**—The firewall uses the configured client certificate for communication with a PAN-DB appliance. |
| --- | --- |






| ◦ | **WildFire Communication**—The firewall uses the configured client certificate for communication with a WildFire® appliance. |
| --- | --- |






| ◦ | **Log Collector Communication**—The firewall uses the configured client certificate for communication with a Log Collector. |
| --- | --- |






| ◦ | **Check Server Identity**—(`Panorama and Log Collector Communication only`) The firewall confirms the identify of the server by matching the common name (CN) with the IP address or FQDN of the server. |
| --- | --- |







 Disable/Enable Panorama Policy and Objects


 This option displays only when you edit the **Panorama Settings** on a firewall (not in a template on Panorama).
 **Disable Panorama Policy and Objects** to disable the propagation of device group policies and objects to the firewall. By default, this action also removes those policies and objects from the firewall. To keep a local copy of the device group policies and objects on the firewall, in the dialog that opens when you click this option, select **Import Panorama Policy and Objects before disabling**. After you perform a commit, these policies and objects become part of the firewall configuration and Panorama no longer manages them.
 Note:



| | For multi-vsys firewalls, you must first import the the template configuration and then import the device group configuration to successfully disable the Panorama pushed configuration. |
| --- | --- |



 Under normal operating conditions, disabling Panorama management is unnecessary and could complicate the maintenance and configuration of firewalls. This option generally applies to situations where firewalls require rules and object values that differ from those defined in the device group. An example is when you move a firewall out of production and into a laboratory environment for testing.
 To revert firewall policy and object management to Panorama, click **Enable Panorama Policy and Objects**.




 Disable/Enable Device and Network Template


 This option displays only when you edit the **Panorama Settings** on a firewall (not in a template on Panorama).
 **Disable Device and Network Template** to disable the propagation of template information (device and network configurations) to the firewall. By default, this action also removes the template information from the firewall. To keep a local copy of the template information on the firewall, in the dialog that opens when you select this option, select **Import Device and Network Templates before disabling**. After you perform a commit, the template information becomes part of the firewall configuration and Panorama no longer manages that information.
 Note:



| | For multi-vsys firewalls, you must first import the the template configuration and then import the device group configuration to successfully disable the Panorama pushed configuration. |
| --- | --- |



 CAUTION:
 Under normal operating conditions, disabling Panorama management is unnecessary and could complicate the maintenance and configuration of firewalls. This option generally applies to situations where firewalls require device and network configuration values that differ from those defined in the template. An example is when you move a firewall out of production and into a laboratory environment for testing.
 To configure the firewall to accept templates again, click **Enable Device and Network Templates**.




 **Panorama Settings**: Panorama > Setup > Management
 If you use Panorama to manage firewalls, configure the following settings on Panorama. These settings determine timeouts and SSL message attempts for the connections from Panorama to managed firewalls, as well as object sharing parameters.
 You must also configure Panorama connection settings on the firewall or in a template on Panorama: see [Panorama Settings: Device > Setup > Management](device-setup-management.html#ID0EGMWW).
 Note:



| | The firewall uses an SSL connection with AES256 encryption to register with Panorama. By default, Panorama and the firewall authenticate each other using predefined 2,048-bit certificates and they use the SSL connection for configuration management and log collection. To further secure these SSL connections, see [Customize Secure Server Communication](device-setup-management.html#ID0E53XW) to configure custom certificates between Panorama and its clients. |
| --- | --- |







 Receive Timeout for Connection to Device


 Enter the timeout (in seconds) for receiving TCP messages from all managed firewalls (range is 1 to 240; default is 240).




 Send Timeout for Connection to Device


 Enter the timeout (in seconds) for sending TCP messages to all managed firewalls (range is 1 to 240; default is 240).




 Retry Count for SSL Send to Device


 Enter the number of allowed retry attempts when sending Secure Socket Layer (SSL) messages to managed firewalls (range is 1 to 64; default is 25).




 Share Unused Address and Service Objects with Devices


 Select this option (enabled by default) to share all Panorama shared objects and device-group-specific objects with managed firewalls.
 If you disable this option, the appliance checks Panorama policies for references to address, address group, service, and service group objects, and does not share any unreferenced objects. This option reduces the total object count by ensuring that the appliance sends only necessary objects to managed firewalls.
 If you have a policy rule that targets specific devices in a device group, then the objects used in that policy are considered used in that device group.




 Objects defined in ancestors will take higher precedence


 Select this option (disabled by default) to specify that the object values in ancestor groups take precedence over those in descendant groups when device groups at different levels in the hierarchy have objects of the same type and name but with different values. This means that when you perform a device group commit, the ancestor values replace any override values. Likewise, this option causes the value of a shared object to override the values of objects of the same type and name in device groups.
 Selecting this option displays the [Find Overridden Objects](device-setup-management.html#ID0EPZXW) link.




 Find Overridden Objects


 Select this option (bottom of the Panorama Settings dialog) to list any shadowed objects. A shadowed object is an object in the Shared location that has the same name but a different value in a device group. The link displays only if you specify that [Objects defined in ancestors will take higher precedence](device-setup-management.html#ID0EEYXW).




 Enable reporting and filtering on groups


 Select this option (disabled by default) to enable Panorama to locally store usernames, user group names, and username-to-group mapping information that it receives from firewalls. This option is global to all device groups in Panorama. However, you must also enable local storage at the level of each device group by specifying a [Master Device](panorama-device-groups.html#ID0E6AO3) and configuring the firewall to [Store users and groups from Master Device](panorama-device-groups.html#ID0ECDO3).




 **Secure Communication Settings**: Panorama > Setup > Management




 Customize Secure Server Communication





| • | **Custom Certificate Only**—When enabled, Panorama accepts only custom certificates for authentication with managed firewalls and Log Collectors. |
| --- | --- |






| • | **SSL/TLS Service Profile**—Select an SSL/TLS service profile from the drop-down. This profile defines the certificate and supported SSL/TLS versions that the firewall can use to communicate with Panorama. |
| --- | --- |






| • | **Certificate Profile**—Select a certificate profile from the drop-down. This certificate profile defines certificate revocation-checking behavior and the root CA used to authenticate the certificate chain presented by the client. |
| --- | --- |






| • | **Authorization List**—**Add** and configure a new authorization profile using the following fields to set the criteria for authorizing client devices that can connect to Panorama. The Authorization List supports a maximum of 16 profile entries. |
| --- | --- |






| ◦ | **Identifier**—Select **Subject** or **Subject Alt. Name** as the authorization identifier. |
| --- | --- |






| ◦ | **Type**—If you selected **Subject Alt. Name** as the Identifier, then select **IP**, **hostname**, or **e-mail** as the identifier type. If you selected **Subject**, then you must use **common name** as the identifier type. |
| --- | --- |






| ◦ | **Value**—Enter the identifier value. |
| --- | --- |






| • | **Authorize Clients Based on Serial Number**—Panorama authorizes client devices based on a hash of the device serial number. |
| --- | --- |






| • | **Check Authorization List**—Panorama checks client device identities against the authorization list. A device need match only one criterion on the list to be authorized. If no match is found, the device is not authorized. |
| --- | --- |






| • | **Disconnect Wait Time (min)**—The amount of time (in minutes) that Panorama waits before terminating the current connection with its managed devices. Panorama then reestablishes connections with its managed devices using the configured secure server communications settings. The wait time begins after you commit the secure server communications configuration. |
| --- | --- |







 Secure Client Communications


 Using **Secure Client Communication** ensures that the client Panorama uses configured custom certificates (instead of the default predefined certificate) to authenticate SSL connections with another Panorama appliance in an HA pair or WildFire appliance.



| • | **Predefined** (default)—No device certificate is configured and Panorama uses the default predefined certificate. |
| --- | --- |






| • | **Local**—Panorama uses a local device certificate and the corresponding private key generated on the firewall or imported from an existing enterprise PKI server. |
| --- | --- |






| ◦ | **Certificate**—Select the local device certificate. |
| --- | --- |






| ◦ | **Certificate Profile**—Select the Certificate Profile from the drop-down. |
| --- | --- |






| • | **SCEP**—Panorama uses a device certificate and private key generated by a Simple Certificate Enrollment Protocol (SCEP) server. |
| --- | --- |






| ◦ | **SCEP Profile**—Select a SCEP Profile from the drop-down. |
| --- | --- |






| ◦ | **Certificate Profile**—Select the Certificate Profile from the drop-down. |
| --- | --- |






| • | **Customize Communication** |
| --- | --- |






| ◦ | **HA Communication**—Panorama uses the configured client certificate for HA communication with its HA peer. |
| --- | --- |






| ◦ | **WildFire Communication**—Panorama uses the configured client certificate for communication with a WildFire appliance. |
| --- | --- |







 **Logging and Reporting Settings**
 Use this section to modify:



| • | Expiration periods and storage quotas for reports and for the following log types. The settings are synchronized across high availability pairs. |
| --- | --- |






| ◦ | Logs of all types that the firewall generates and stores locally (**Device** > **Setup** > **Management**). The settings apply to all the virtual systems on the firewall. |
| --- | --- |






| ◦ | Logs that an M-Series appliance or a Panorama virtual appliance in Panorama mode generates and stores locally: System, Config, Application Statistics, and User-ID™ logs (**Panorama** > **Setup** > **Management**). |
| --- | --- |






| ◦ | Logs of all types that the Panorama virtual appliance in Legacy mode generates locally or collects from firewalls (**Panorama** > **Setup** > **Management**). |
| --- | --- |



 Note:
 For the logs that firewalls send to Panorama Log Collectors, you set storage quotas and expiration periods in each Collector Group (see [Panorama > Collector Groups](panorama-collector-groups.html#ID0EJRT3)).



| • | Attributes for calculating and exporting user activity reports. |
| --- | --- |






| • | Predefined reports created on the firewall or Panorama. |
| --- | --- |







 Log Storage tab
 (`Panorama management server and all firewall models except PA-5200 Series and PA‑7000 Series firewalls`)
 Note:



| | Panorama displays this tab if you edit the Logging and Reporting Settings (**Panorama** > **Setup** > **Management**). If you use a Panorama template to configure the settings for firewalls (**Device** > **Setup** > **Management**), see [Single Disk Storage and Multi Disk Storage tabs](device-setup-management.html#ID0E3TZW). |
| --- | --- |





 For each log type, specify:



| • | **Quota**—The **Quota**, as a percentage, allocated on the hard disk for log storage. When you change a **Quota** value, the associated disk allocation changes automatically. If the total of all the values exceeds 100%, a message appears in red and an error message will appear if you try to save the settings. If this happens, adjust the percentages so that the total is within the 100% limit. |
| --- | --- |



 Note:



| | VM-Series firewalls by default have a 0% quota allocated for **SCTP** log storage, **SCTP Summary**, **Hourly SCTP Summary**, **Daily SCTP Summary**, and **Weekly SCTP Summary**, so you must allocate some percentage for these firewalls to log SCTP information. |
| --- | --- |






| • | **Max Days**—The length (in days) of the log expiration period (range is 1 to 2,000). The firewall or Panorama appliance automatically deletes logs that exceed the specified period. By default, there is no expiration period, which means logs never expire. |
| --- | --- |



 The firewall or Panorama appliance evaluates logs during creation of the logs and then deletes logs that exceed the expiration period or quota size.
 CAUTION:
 Weekly summary logs can age beyond the threshold before the next deletion if they reach the expiration threshold between times when the firewall deletes logs. When a log quota reaches the maximum size, new log entries start overwriting the oldest log entries. If you reduce a log quota size, the firewall or Panorama removes the oldest logs when you commit the changes. In an HA active/passive configuration, the passive peer does not receive logs and, therefore, does not delete them unless failover occurs and the passive peer becomes active.








| • | **Core Files**—If your firewall experiences a system process failure, it will generate a core file that contains details about the process and why it failed. If a core file is too large for the default core file storage location (/var/cores partition), you can enable the large-core file option to allocate an alternate and larger storage location (/opt/panlogs/cores). A Palo Alto Networks support engineer can increase the allocated storage if needed. |
| --- | --- |



 To enable or disable the large-core file option, enter the following CLI command from configuration mode and then commit the configuration:
 # set deviceconfig setting management large-core [yes|no]
 CAUTION:
 The core file is deleted when you disable this option.
 You must use SCP from operational mode to export the core file:
 > scp export core-file large-corefile
 Note:



| | Only a Palo Alto Networks support engineer can interpret the contents of the core files. |
| --- | --- |






| • | **Restore Defaults**—Select this option to revert to the default values. |
| --- | --- |







 **Session Log Storage** and **Management Log Storage** tabs
 (`PA-5200 Series and PA‑7000 Series firewalls only`)


 PA-5200 Series and PA-7000 Series firewalls store management logs and session logs on separate disks. Select the tab for each set of logs and configure the settings described in [Log Storage tab](device-setup-management.html#ID0EDBZW):



| • | **Session Log Storage**—Select **Session Log Quota** and set the quotas and expiration periods for Traffic, Threat, URL Filtering, HIP Match, User-ID, GTP/Tunnel, SCTP, and Authentication logs, as well as Extended Threat PCAPs. |
| --- | --- |






| • | **Management Log Storage**—Set quotas and expiration periods for System, Config, and App Stats logs, as well as for HIP Reports, Data Filtering Captures, App PCAPs, and Debug Filter PCAPs. |
| --- | --- |







 **Single Disk Storage** and **Multi Disk Storage** tabs
 (`Panorama template only`)


 If you use a Panorama template to configure log quotas and expiration periods, configure the settings in one or both of the following tabs based on the firewalls assigned to the template:



| • | **PA-5200 Series and PA-7000 Series firewalls**—Select **Multi Disk Storage** and configure the settings in the [Session Log Storage and Management Log Storage tabs](device-setup-management.html#ID0EPPZW). |
| --- | --- |



 Note:



| | PA-5200 Series firewalls by default have a 0% quota allocated for **SCTP** log storage, **SCTP Summary**, **Hourly SCTP Summary**, **Daily SCTP Summary**, and **Weekly SCTP Summary**, so you must allocate some percentage for these firewalls to log SCTP information. |
| --- | --- |






| • | **All other firewall models**—Select **Single Disk Storage**, select **Session Log Quota**, and configure the settings on the [Log Storage tab](device-setup-management.html#ID0EDBZW). |
| --- | --- |







 Log Export and Reporting tab


 Configure the following log export and reporting settings as needed:



| • | **Number of Versions for Config Audit**—Enter the number of configuration versions to save before discarding the oldest ones (default is 100). You can use these saved versions to audit and compare changes in configuration. |
| --- | --- |






| • | **Number of Versions for Config Backups**—(`Panorama only`) Enter the number of configuration backups to save before discarding the oldest ones (default is 100). |
| --- | --- |






| • | **Max Rows in CSV Export**—Enter the maximum number of rows that will appear in the CSV reports generated when you **Export to CSV** from the traffic logs view (range is 1 to 1,048,576; default is 65,535). |
| --- | --- |






| • | **Max Rows in User Activity Report**—Enter the maximum number of rows that is supported for the detailed user activity reports (range is 1 to 1,048,576; default is 5,000). |
| --- | --- |







 Log Export and Reporting tab (cont)





| • | **Average Browse Time (sec)**—Configure this variable to adjust how the browse time is calculated in seconds for the [Monitor > PDF Reports > User Activity Report](monitor-pdf-reports-user-activity-report.html#ID0E34FO) (range is 0 to 300 seconds; default is 60). |
| --- | --- |



 The calculation will ignore sites categorized as web advertisements and content delivery networks. The browse time calculation is based on container pages logged in the URL filtering logs. Container pages are used as the basis for this calculation because many sites load content from external sites that should not be considered. For more information on the container page, see [Container Pages](device-setup-content-id.html#ID0EUVOX). The average browse time setting is the average time that the administrator thinks it should take a user to browse a web page. Any request made after the average browse time has elapsed will be considered a new browsing activity. The calculation will ignore any new web pages that are loaded between the time of the first request (start time) and the average browse time. This behavior was designed to exclude any external sites that are loaded within the web page of interest. Example: If the average browse time setting is 2 minutes and a user opens a web page and views that page for 5 minutes, the browse time for that page will still be 2 minutes. This is done because there is no way to determine how long a user views a given page.



| • | **Page Load Threshold (sec)**—Allows you to adjust the assumed time (in seconds) that it takes for page elements to load on the page (range is 0 to 60; default is 20). Any request that occurs between the first page load and the page load threshold is assumed to be elements of the page. Any requests that occur outside of the page load threshold is assumed to be the user clicking a link within the page. The page load threshold is also used in the calculations for the [Monitor > PDF Reports > User Activity Report](monitor-pdf-reports-user-activity-report.html#ID0E34FO). |
| --- | --- |






| • | **Syslog HOSTNAME Format**—Select whether to use the FQDN, hostname, or IP address (IPv4 or IPv6) in the syslog message header. This header identifies the firewall or Panorama management server where the message originated. |
| --- | --- |






| • | **Report Runtime**—Select the time of day (default is 2 a.m.) when the firewall or Panorama appliance starts generating daily scheduled reports. |
| --- | --- |






| • | **Report Expiration Period**—Set the expiration period (in days) for reports (range is 1 to 2,000). By default, there is no expiration period, which means reports never expire. The firewall or Panorama appliance deletes expired reports nightly at 2 A.M. according to its system time. |
| --- | --- |











| • | **Stop Traffic when LogDb full** (`Firewall only`; disabled by default)—Select this option if you want traffic through the firewall to stop when the log database is full. |
| --- | --- |






| • | **Enable Threat Vault Access** (enabled by default)—Enables the firewall to access [Threat Vault](https://threatvault.paloaltonetworks.com/) to gather the latest information about detected threats. This information is available for threat logs and for top threat activity charted on the ACC. |
| --- | --- |






| • | **Enable Log on High DP Load** (`Firewall only`; disabled by default)—Select this option to specify that a system log entry is generated when the packet processing load on the firewall is at 100% CPU utilization. |
| --- | --- |



 Fastpath:
 **Enable Log on High DP Load** allows administrators to investigate and identify the cause of high CPU utilization.
 A high CPU load can cause operational degradation because the CPU does not have enough cycles to process all packets. The system log alerts you to this issue (a log entry is generated each minute) and allows you to investigate for probable cause.



| • | **Enable High Speed Log Forwarding** (`PA-5200 Series, PA-5450, PA-7000 Series, and PA-7500 firewalls only`; only enabled in the PA-5450 by default)—As a best practice, select this option to forward logs to Panorama at up to a maximum rate of 120,000 logs per second. When disabled, the firewall forwards logs to Panorama at a maximum rate of only 80,000 logs per second. |
| --- | --- |



 Note:**When High Speed Log Forwarding is enabled on a PA-7500, only Management Plane logs are affected. To view and store Data Plane logs, you must [configure log forwarding](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/configure-log-forwarding)** and enable demo mode.
 If you enable this option, the firewall does not store logs locally or display them in the **Dashboard**, **ACC**, or **Monitor** tabs. Additionally, you must [configure log forwarding to Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-log-collection/configure-log-forwarding-to-panorama.html) to use this option.



| • | **Log Collector Status**—Displays status of whether the firewall successfully established a connection to the Distributed Log Collection architecture and is sending logs to it. If the firewall is also configured to send logs to the Logging Service, verify the **Logging Service Status**, in the Logging Service section. |
| --- | --- |







 (`Panorama only`)





| • | **Buffered Log Forwarding from Device** (enabled by default)—Allows the firewall to buffer log entries on its hard disk (local storage) when it loses connectivity to Panorama. When the connection to Panorama is restored, the firewall forwards the log entries to Panorama; the disk space available for buffering depends on the log storage quota for the firewall model and the volume of logs that are pending roll over. If the available space is consumed, the oldest entries are deleted to allow logging of new events. |
| --- | --- |



 Fastpath:
 Enable **Buffered Log Forwarding from Device** to help prevent loss of logs if the connection to Panorama goes down.



| • | **Get Only New Logs on Convert to Primary** (disabled by default)—This option applies only to a Panorama virtual appliance in Legacy mode that writes logs to a Network File System (NFS). With NFS logging, only the primary Panorama is mounted to the NFS. Therefore, the firewalls send logs only to the active primary Panorama. This option enables you to configure firewalls to send newly generated logs only to Panorama when an HA failover occurs and the secondary Panorama resumes logging to the NFS (after it is promoted as primary). This option is typically enabled to prevent firewalls from sending a large volume of buffered logs when connectivity to Panorama is restored after a significant period of time. |
| --- | --- |






| • | **Only Active Primary Logs to Local Disk** (disabled by default)—This option applies only to a Panorama virtual appliance in Legacy mode. This option enables you to configure only the active Panorama to save logs to the local disk. |
| --- | --- |











| • | **Pre-Defined Reports** (enabled by default)—Pre-defined reports for application, traffic, threat, URL Filtering, and Stream Control Transmission Protocol (SCTP) are available on the firewall and on Panorama. Pre-defined reports for SCTP are available on the firewall and Panorama after SCTP Security is enabled in **Device** > **Setup** > **Management** > **General Settings**. |
| --- | --- |



 Because the firewalls consume memory resources in generating the results hourly (and forwarding it to Panorama where it is aggregated and compiled for viewing), to reduce memory usage, you can disable the reports that are not relevant to you. To disable a report, disable this option for the report.
 Click **Select All** or **Deselect All** to entirely enable or disable the generation of pre-defined reports.
 Note:



| | Before disabling a report, verify that there isn’t a Group Report or a PDF Report using it. If you disable a predefined report assigned to a set of reports, the entire set of reports will have no data. |
| --- | --- |






| • | **Log Admin Activity** (disabled by default)—Specify whether to generate an audit log when an administrator executes an operational command in the firewall CLI or navigates through the web interface. You must first successfully configure a syslog server before you can generate and forward an audit log. |
| --- | --- |






| ◦ | **Operational Commands**—Generate an audit log when an administrator executes an operational or debug command in the CLI or an operational command that is triggered from the web interface. See the [CLI Operational Command Hierarchy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-cli-quick-start/cli-command-hierarchy) for a full list of PAN-OS operational and debug commands. |
| --- | --- |






| ◦ | **UI Actions**—Generate an audit log when an administrator navigates throughout the web interface. This includes navigation between configuration tabs, as well as between individual objects within a tab. For example, an audit log is generated when an administrator navigates from the **ACC** to the **Policies** tab. Additionally, an audit log is generated when an administrator navigates from **Objects** > **Addresses** to **Objects** > **Tags**. |
| --- | --- |






| ◦ | **Syslog Server**—Select the target syslog server profile to forward audit logs. |
| --- | --- |







 **Log Interface** (`PA-5450 only`)




 IP Address


 Enter the IP address of the log interface port.
 Note:



| | When the log interfaces are configured with an IP address, all log forwarding automatically switches from being handled by the management interface (default) to the log interface, unless a service route is specified for a particular service. Specific service routes are prioritized by the log interface. |
| --- | --- |







 Netmask


 Specify the network mask for the IP address of the log interface.




 Default Gateway


 Enter the IP address of the default gateway to enable the path for outgoing logs.




 IPv6 Address


 If your network uses IPv6, define the following:



| • | **IPv6 Address**—The IPv6 address of the log interface port. |
| --- | --- |






| • | **IPv6 Default Gateway**—The IPv6 address of the default gateway for the port. |
| --- | --- |







 Link Speed


 Select the interface speed in Mbps or select **auto** (default) to have the firewall automatically determine the speed based on the connection. For interfaces that have a non-configurable speed, **auto** is the only option.




 Link Duplex


 Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**).




 Link State


 Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically based on the connection (**auto**). The default is **auto**.




 Log Interface Statistics


 Select **Show Statistics** to view packet stats and errors.




 **Banners and Messages**
 To view all messages in a Message of the Day dialog, see [Message of the Day](message-of-the-day.html#ID0EJJDI).
 Tip:
 After you configure the Message of the Day and click **OK**, administrators who subsequently log in and active administrators who refresh their browsers will see the new or updated message immediately; a commit is not required. This enables you to warn other administrators of an impending commit before you perform that commit.




 Message of the Day
 (check box)


 Select this option to enable the Message of the Day dialog to display when an administrator logs in to the web interface.




 Message of the Day
 (text-entry field)


 Enter the text (up to 3,200 characters) for the Message of the Day dialog.




 Allow Do Not Display Again


 Select this option (disabled by default) to include a **Do not show again** option in the Message of the Day dialog. This gives administrators the option to avoid seeing the same message in subsequent logins.
 Note:



| | If you modify the **Message of the Day** text, the message displays even to administrators who selected **Do not show again**. Administrators must reselect this option to avoid seeing the modified message in subsequent sessions unless the message is modified again. |
| --- | --- |







 Title


 Enter text for the Message of the Day header (default is Message of the Day).




 Background Color


 Select a background color for the Message of the Day dialog. The default (**None**) is a light gray background.




 Icon


 Select a predefined icon to appear above the text in the Message of the Day dialog:



| • | **None** (default) |
| --- | --- |






| • | **Error** |
| --- | --- |






| • | **Help** |
| --- | --- |






| • | **Information** |
| --- | --- |






| • | **Warning** |
| --- | --- |







 Header Banner


 Enter the text that the header banner displays (up to 3,200 characters).




 Header Color


 Select a color for the header background. The default (**None**) is a transparent background.




 Header Text Color


 Select a color for the header text. The default (**None**) is black.




 Same banner for header and footer


 Select this option (enabled by default) if you want the footer banner to have the same text and colors as the header banner. When enabled, the fields for the footer banner text and colors are grayed out.




 Footer Banner


 Enter the text that the footer banner displays (up to 3,200 characters).




 Footer Color


 Select a color for the footer background. The default (**None**) is a transparent background.




 Footer Text Color


 Select a color for the footer text. The default (**None**) is black.




 **Minimum Password Complexity**




 Enabled


 Enable minimum password requirements for local accounts. With this feature, you can ensure that local administrator accounts on the firewall will adhere to a defined set of password requirements.
 You can also create a password profile with a subset of these options that will override these settings and can be applied to specific accounts. For more information, see [Device > Password Profiles](device-password-profiles.html#ID0ECFBY) and see [Username and Password Requirements](username-and-password-requirements.html#ID0E6TBY) for information on valid characters that can be used for accounts.
 Note:



| | The maximum password length is 64 characters. |
| --- | --- |



 If you have high availability (HA) configured, always use the primary peer when configuring password complexity options and commit soon after making changes.
 Minimum password complexity settings do not apply to local database accounts for which you specified a **Password Hash** (see [Device > Local User Database > Users](device-local-user-database-users.html#ID0EMYTZ)).
 Fastpath:
 Require strong passwords to help prevent brute force network access attacks from succeeding. Require a minimum length and the use of at least one each of uppercase letters, lowercase letters, numerical values, and special characters. In addition, prevent excessive repetition of characters and usernames in passwords, set limits on how often passwords can be reused, and set regular password change periods so passwords don’t stay in use too long. The stronger the password requirements, the more difficult you make it for attackers to hack a password. Be sure to use the [best practices for password strength](https://docs.paloaltonetworks.com/best-practices/10-1/administrative-access-best-practices/administrative-access-best-practices.html) to ensure a strict password.




 Minimum Length


 Require a minimum password length (range is 1 to 16 characters).
 Note:



| | In FIPS-CC mode, the minimum password length has a range of 8 to 16 characters. |
| --- | --- |







 Minimum Uppercase Letters


 Require a minimum number of uppercase letters (ranges is 0 to 16 characters).




 Minimum Lowercase Letters


 Require a minimum number of lowercase letters (range is 0 to 16 characters).




 Minimum Numeric Letters


 Require a minimum number of numeric letters (range is 0 to 16 numbers).




 Minimum Special Characters


 Require a minimum number of special (non-alphanumeric) characters (range is 0 to 16 characters).




 Block Repeated Characters


 Specify the number of sequential duplicate characters permitted in a password (range is 3 to 16).
 If you set the value to 3, the password can contain the same character in sequence three times but if the same character is used four or more times in sequence, the password is not permitted.
 For example, if the value is set to 3, the system will accept the password test111 or 111test111, but not test1111, because the number 1 appears four times in sequence.




 Block Username Inclusion (including reversed)


 Select this option to prevent the account username (or reversed version of the name) from being used in the password.




 New Password Differs By Characters


 When administrators change their passwords, the characters must differ by the specified value.




 Require Password Change on First Login


 Select this option to prompt administrators to change their passwords the first time they log in to the firewall.




 Prevent Password Reuse Limit


 Require that a previous password is not reused based on the specified count. For example, if the value is set to 4, you could not reuse any of your last 4 passwords (range is 0 to 50).




 Block Password Change Period (days)


 User cannot change their passwords until the specified number of days is reached (range is 0 to 365 days).




 Required Password Change Period (days)


 Require that administrators change their password on a regular basis (in days) (range is 0 to 365). For example, if the value is set to 90, administrators are prompted to change their password every 90 days.
 You can also set an expiration warning from 0 to 30 days and specify a grace period.




 Expiration Warning Period (days)


 If a **Required Password Change Period** is set, you can use this **Expiration Warning Period** to prompt users at each log in to change their password when there are less than a specified number of days remaining before the required change date (range is 0 to 30).




 Post Expiration Admin Login Count (count)


 Allow the administrator to log in a specified number of times after the required change date (range is 0 to 3). For example, if you set this value to 3 and their account has expired, they can log in 3 more times without changing their password before their account is locked out.




 Post Expiration Grace Period (days)


 Allow the administrator to log in for a specified number of days after the account has expired (range is 0 to 30).




 **AutoFocus™**




 Enabled


 Enable the firewall to connect to an AutoFocus portal to retrieve threat intelligence data and to enable integrated searches between the firewall and AutoFocus.
 When connected to AutoFocus, the firewall displays AutoFocus data associated with Traffic, Threat, URL Filtering, WildFire Submissions, and Data Filtering log entries (**Monitor** > **Logs**). You can click on an artifact in these types of log entries (such as an IP address or a URL) to display a summary of the AutoFocus findings and statistics for that artifact. You can then open an expanded AutoFocus search for the artifact directly from the firewall.
 Tip:
 Check that your AutoFocus license is active on the firewall (**Device** > **Licenses**). If the AutoFocus license is not displayed, use one of the **License Management** options to activate the license.




 AutoFocus URL


 Enter the AutoFocus URL:
 https://autofocus.paloaltonetworks.com:10443




 Query Timeout (sec)


 Set the duration of time (in seconds) for the firewall to attempt to query AutoFocus for threat intelligence data. If the AutoFocus portal does not respond before the end of the specified period, the firewall closes the connection.




 **Strata Logging Service**
 Use this section to configure VM-Series and hardware-based firewalls to forward logs to Strata Logging Service. Here’s the full workflow to configure the options described below:



| • | [Start Logging to ](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-without-panorama-101-and-later.html)[Strata Logging Service](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-without-panorama-101-and-later.html)[ (without Panorama)](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-without-panorama-101-and-later.html) |
| --- | --- |






| • | [Start Logging to ](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-with-panorama-101-or-later.html)[Strata Logging Service](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-with-panorama-101-or-later.html)[ (for Panorama-managed firewalls)](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-with-panorama-101-or-later.html) |
| --- | --- |







 Enable Cloud Logging


 Pick this option to enable the firewall (or, if you’re using Panorama, firewalls that belong to the selected **Template**) to forward logs to Strata Logging Service (previously called Cortex Data Lake).
 After you configure Log Forwarding ([Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R)), the firewall forwards logs directly to Strata Logging Service—this is true even for Panorama-managed firewalls.




 Enable Duplicate Logging (for Panorama-managed firewalls only)


 **Enable Duplicate Logging** to continue to send logs to Panorama and distributed Log Collectors, in addition to sending logs to Strata Logging Service.
 This is a helpful option if you’re evaluating Strata Logging Service—when enabled, the firewalls that belong to the selected Template will save a copy of the logs to Strata Logging Service and to your Panorama or Distributed Log Collection architecture.




 Enable Enhanced Application logs in Cloud


 **Enable Enhanced Application Logging** if you want the firewall to collect data that increases network visibility for Palo Alto Networks applications. For example, this increased network visibility enables Palo Alto Networks Cortex XDR apps to better categorize and establish a baseline for normal network activity so that the firewall can detect unusual behavior that might indicate an attack.
 Enhanced Application Logging requires a Strata Logging Service license. You cannot view these logs—they are designed to be consumed only by Palo Alto Networks applications.




 Region


 Select the geographic region of the Strata Logging Service instance to which the firewall will forward logs. Log in to the [Cortex hub](https://apps.paloaltonetworks.com/) to confirm the region in which a Strata Logging Service instance is deployed (in the hub, select the settings gear on the top menu bar and **Manage Apps**).




 Connection count to Strata Logging Service for PA-7000 Series and PA-5200 Series Firewalls


 (`PA-7000 Series and PA-5200 Series firewalls only`) Specify the number of connections for sending logs from the firewalls to Strata Logging Service (range is 1 to 20; default is 5). You can use the request logging-service-forwarding status CLI command on the firewall to verify the number of active connections between the firewall and Strata Logging Service.




 Onboard without Panorama
 (for firewalls that are not managed by Panorama)


 You can enable firewalls that are not managed by Panorama to send logs to Strata Logging Service. To do this, you need to first [generate a key in the ](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-without-panorama-101-and-later.html)[Strata Logging Service](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-without-panorama-101-and-later.html)[ app](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/onboard-firewalls/onboard-firewalls-without-panorama-101-and-later.html). This key enables the firewall to authenticate and securely connect to Strata Logging Service. After you generate the key, enter it and [enable the firewall to start forwarding logs](https://docs.paloaltonetworks.com/cortex/cortex-data-lake/cortex-data-lake-getting-started/get-started-with-cortex-data-lake/start-sending-logs-to-cortex-data-lake/start-sending-logs-to-cortex-data-lake-individually-managed.html) to Strata Logging Service.




 Logging Service Status


 View the status of the connection to Strata Logging Service. **Show Status** to view the details for the following checks:



| • | **License**—OK or Error to indicate whether the firewall has a valid license to forward logs to Strata Logging Service. |
| --- | --- |






| • | **Certificate**—OK or Error to indicate whether the firewall successfully fetched the certificate required to authenticate to Strata Logging Service. |
| --- | --- |






| • | **Customer Info**—OK or Error to indicate whether the firewall has the required customer identification number to use Strata Logging Service. When the status is OK, you can see the customer identification number as well. |
| --- | --- |






| • | **Device Connectivity**—Indicates whether the firewall is successfully connected to Strata Logging Service. |
| --- | --- |







 **SSH Management Profiles Settings**




 Server Profile


 A type of SSH service profile that applies to the SSH sessions for the CLI management connections on your network. To apply an existing server profile, select a profile, click **OK**, and **Commit** your change.
 Note:



| | You must perform an SSH service restart from your CLI to activate the profile. |
| --- | --- |



 For more information, see [Device > Certificate Management >SSH Service Profile](device-certificate-management-ssh-service-profile.html#ID0EDBFZ).




 **Accounting Server Settings**




 Accounting Server Profile


 Select the TACACS+ server profile to use to allow the TACACS+ accounting client to connect to the TACACS+ accounting server.




 **PAN-OS Edge Service Settings**




 Enable third party device verdicts


 This option is reserved for a future release. If you enable this option, there is no functionality.




 Connection Status


 Displays the status (connected or disconnected) of the firewall’s connection to the edge service.




 Enable User Context Cloud Service


 Select this option to connect the firewall to the User Context cloud service, which allows you to use the Cloud Identity Engine to view and manage redistribution for information such as mappings and tags among your firewalls and devices.




 Connection Status


 Displays the status (connected or disconnected) of the firewall’s connection to the User Context cloud service.




 **Advanced DNS Security**




 DNS Security Server


 Enter the URL of the Advanced DNS Security server that you want the firewall to use when processing Advanced DNS Security requests. Refer to the [DNS Security Service Domains](https://docs.paloaltonetworks.com/dns-security/administration/about-dns-security/dns-security-service-domains) for a complete list of available servers.
 The default server FQDN connects to adv-dns.service.paloaltonetworks.com and then resolves to the closest available server.
 adv-dns.service.paloaltonetworks.com



 Parent topic
 [Device](device.html#ID0EY2QW)