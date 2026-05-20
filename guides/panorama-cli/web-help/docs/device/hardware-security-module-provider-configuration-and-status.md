# Hardware Security Module Provider Configuration and Status

*Device : Device &gt; Setup &gt; HSM : Hardware Security Module Provider Configuration and Status*

Hardware Security Module Provider Configuration and Status

The Hardware Security Module Details section shows the HSM configuration settings and the connectivity status of the HSM.



| Hardware Security Module Details |
| --- |
| Provider Configured |






| • | **SafeNet Network HSM** |
| --- | --- |






| • | **Thales CipherTrust Manager HSM** |
| --- | --- |






| • | **nCipher nShield Connect** |
| --- | --- |







 High Availability


 (`SafeNet Network only`) HSM high availability is configured if checked.




 High Availability Group Name


 (`SafeNet Network only`) The group name configured on the firewall for HSM high availability.




 Remote Filesystem Address


 (`nShield Connect only`) The address of the remote filesystem.




 Firewall Source Address


 The address of the port used for the HSM service. By default this is the management port address. It can be specified as a different port however through the Services Route Configuration in **Device** > **Setup** > **Services**.




 HSM Client Version on Firewall


 Shows the HSM client version installed.




 Master Key Secured by HSM


 If checked, the master key is secured on the HSM.




 Status


 Shows green if the firewall is connected and authenticated to the HSM and shows red if the firewall is not authenticated or if network connectivity to the HSM is down.
 Review [Hardware Security Module Status](hardware-security-module-status.html#ID0EOFEX) for more details on the HSM connection.



 Parent topic
 [Device > Setup > HSM](device-setup-hsm.html#ID0EWVBX)