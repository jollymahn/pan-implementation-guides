# Hardware Security Module Provider Settings

*Device : Device &gt; Setup &gt; HSM : Hardware Security Module Provider Settings*

Hardware Security Module Provider Settings

To configure a Hardware Security Module (HSM) on the firewall, edit the Hardware Security Module Provider settings:



| Hardware Security Module Provider Settings | Description |
| --- | --- |
| Provider Configured | Select the HSM vendor: • |






| • | **SafeNet Network HSM** |
| --- | --- |






| • | **Thales CipherTrust Manager HSM** |
| --- | --- |






| • | **nCipher nShield Connect** |
| --- | --- |



 Important:
 The HSM server version must be compatible with the [HSM client version](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/secure-keys-with-a-hardware-security-module/set-up-connectivity-with-hsm.html) on the firewall.




 Module Name


 Add a module name for the HSM. This can be any ASCII string up to 31 characters long. Add up to 16 module names if you are configuring independent or high availability SafeNet HSM configurations.




 Server Address


 Specify an IPv4 address for any HSM module you are configuring.




 High Availability
 (`SafeNet Network only`)


 (`Optional`) Select this option if you are configuring the SafeNet HSM modules in a high availability configuration. You must configure the module name and server address of each HSM module.




 Auto Recovery Retry
 (`SafeNet Network only`)


 Specify the number of times that the firewall will try to recover its connection to an HSM before failing over to another HSM in an HSM HA configuration (range is 0—500; default is 0).




 High Availability Group Name
 (`SafeNet Network only`)


 Specify a group name to be used for the HSM HA group. This name is used internally by the firewall. It can be any ASCII string up to 31 characters long.




 Remove Filesystem Address
 (`nCipher nShield Connect only`)


 Configure the IPv4 address of the remote file system used in the nShield Connect HSM configuration.



 Parent topic
 [Device > Setup > HSM](device-setup-hsm.html#ID0EWVBX)