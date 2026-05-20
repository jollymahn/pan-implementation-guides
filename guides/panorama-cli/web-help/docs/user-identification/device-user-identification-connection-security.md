# Device > User Identification > Connection Security

*User Identification : Device &gt; User Identification &gt; Connection Security*

## Device > User Identification > Connection Security


Edit ( ) the User-ID Connection Security settings to select the certificate profile used by the firewall to validate the certificate presented by Windows User-ID agents. The firewall uses the selected certificate profile to verify the identity of the User-ID agent by validating the server certificate presented by the agent.



| Task | Description |
| --- | --- |
| User-ID Certificate Profile | From the drop-down, select the certificate profile to use when authenticating Windows User-ID agents or select New Certificate Profile to create a new certificate profile. Select **None** to remove the certificate profile and use default authentication instead. To require server certificate validation with the Windows server when you [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z) using Kerberos for server authentication, make sure you configure NTP in the [Global Services Settings](global-services-settings.html#ID0ESPFX) and select the Root CA as the certificate profile. |
| Remove All (`Template Configuration Only`) | Removes the certificate profile attached to the User-ID Connection Security configuration for the selected template. |


 Parent topic
 [User Identification](user-identification.html#ID0EBI2Z)