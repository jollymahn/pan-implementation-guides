# Device > Server Profiles > RADIUS

*Device : Device &gt; Server Profiles &gt; RADIUS*

## Device > Server Profiles > RADIUS


Select **Device** > **Server Profiles** > **RADIUS** or **Panorama** > **Server Profiles** > **RADIUS** to [configure settings](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-radius-authentication.html) for the Remote Authentication Dial-In User Service (RADIUS) servers that authentication profiles reference (see [Device > Authentication Profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-web-interface-help/device/device-authentication-profile/configure-an-authentication-profile)). You can use RADIUS to authenticate end users who access your network resources (through GlobalProtect or Authentication Portal), to authenticate administrators defined locally on the firewall or Panorama, and to authenticate and authorize administrators defined externally on the RADIUS server.



| RADIUS Server Settings | Description |
| --- | --- |
| Profile Name | Enter a name to identify the server profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| Administrator Use Only | Select this option to specify that only administrator accounts can use the profile for authentication. For firewalls that have multiple virtual systems, this option appears only if the **Location** is **Shared**. |
| Timeout | Enter an interval in seconds after which an authentication request times out (range is 1–120, default is 3). CAUTION:  If you use the RADIUS server profile to integrate the firewall with an MFA service, enter an interval that gives users enough time to respond to the authentication challenge. For example, if the MFA service prompts for a one-time password (OTP), users need time to see the OTP on their endpoint device and then enter the OTP in the MFA login page. |
| Authentication Protocol | Select the **Authentication Protocol** that the firewall uses to secure a connection to the RADIUS server: • |






| • | **PEAP with GTC**—Select Protected EAP (PEAP) with Generic Token Card (GTC) to use one-time tokens in an encrypted tunnel. |
| --- | --- |






| • | **EAP-TTLS with PAP**—Select EAP with Tunneled Transport Layer Security (TTLS) and PAP to transport plaintext credentials for PAP in an encrypted tunnel. |
| --- | --- |






| • | **CHAP**—Select Challenge-Handshake Authentication Protocol (CHAP) if the RADIUS server does not support EAP or PAP or is not configured for it. |
| --- | --- |






| • | **PAP**—Select Password Authentication Protocol (PAP) if the RADIUS server does not support EAP or CHAP or is not configured for it. |
| --- | --- |







 Allow users to change passwords after expiry


 (PEAP-MSCHAPv2 with GlobalProtect 4.1 or later) Select this option to allow GlobalProtect users to change expired passwords.




 Make Outer Identity Anonymous


 (PEAP-MSCHAPv2, PEAP with GTC, or EAP-TTLS with PAP) This option is enabled by default to anonymize the user’s identity in the outer tunnel that the firewall creates after authenticating with the server.
 Note:



| | Some RADIUS server configurations may not support anonymous outer IDs, and you may need to clear the option. When cleared, usernames are transmitted in cleartext. |
| --- | --- |







 Certificate Profile


 (PEAP-MSCHAPv2, PEAP with GTC, or EAP-TTLS with PAP) Select or configure a Certificate Profile to associate with the RADIUS server profile. The firewall uses the [Certificate Profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/configure-a-certificate-profile) to authenticate with the RADIUS server.




 Retries


 Specify the number of times to retry after a timeout (range is 1–5, default is 3).




 Servers


 Configure information for each server in the preferred order.



| • | **Name**—Enter a name to identify the server. |
| --- | --- |






| • | **RADIUS Server**—Enter the server IP address or FQDN. |
| --- | --- |






| • | **Secret/Confirm Secret**—Enter and confirm a key to verify and encrypt the connection between the firewall and the RADIUS server. |
| --- | --- |






| • | **Port**—Enter the server port (range is 1–65,535, default is 1812) for authentication requests. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)