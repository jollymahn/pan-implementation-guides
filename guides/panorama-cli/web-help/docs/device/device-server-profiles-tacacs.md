# Device > Server Profiles > TACACS+

*Device : Device &gt; Server Profiles &gt; TACACS+*

## Device > Server Profiles > TACACS+


Select **Device** > **Server Profiles** > **TACACS+** or **Panorama** > **Server Profiles** > **TACACS+** to [configure the settings](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-tacacs-authentication.html) that define how the firewall or Panorama connects to Terminal Access Controller Access-Control System Plus (TACACS+) servers (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)). You can use TACACS+ to authenticate end users who access your network resources (through GlobalProtect or Authentication Portal), to authenticate administrators defined locally on the firewall or Panorama, and to authenticate and authorize administrators defined externally on the TACACS+ server.



| TACACS+ Server Settings | Description |
| --- | --- |
| Profile Name | Enter a name to identify the server profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| Administrator Use Only | Select this option to specify that only administrator accounts can use the profile for authentication. For multi-vsys firewalls, this option appears only if the **Location** is **Shared**. |
| Timeout | Enter an interval in seconds after which an authentication request times out (range is 1–20; default is 3). |
| Authentication Protocol | Select the **Authentication Protocol** that the firewall uses to secure a connection to the TACACS+ server: • |






| • | **PAP**—Select Password Authentication Protocol (PAP) if the TACACS+ server does not support CHAP or is not configured for it. |
| --- | --- |






| • | **Auto**—The firewall first tries to authenticate using CHAP. If the TACACS+ server doesn’t respond, the firewall falls back to PAP. |
| --- | --- |







 Use single connection for all authentication


 Select this option to use the same TCP session for all authentications. This option improves performance by avoiding the processing required to initiate and tear down a separate TCP session for each authentication event.




 Servers


 Click **Add** and specify the following settings for each TACACS+ server:



| • | **Name**—Enter a name to identify the server. |
| --- | --- |






| • | **TACACS+ Server**—Enter the IP address or FQDN of the TACACS+ server. |
| --- | --- |






| • | **Secret/Confirm Secret**—Enter and confirm a key to verify and encrypt the connection between the firewall and the TACACS+ server. |
| --- | --- |






| • | **Port**—Enter the server port (default is 49) for authentication requests. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)