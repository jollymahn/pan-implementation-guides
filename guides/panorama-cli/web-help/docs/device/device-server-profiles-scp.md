# Device > Server Profiles > SCP

*Device : Device &gt; Server Profiles &gt; SCP*

## Device > Server Profiles > SCP



| Where Can I Use This? | What Do I Need? |
| --- | --- |
| • | NGFW (PAN-OS or Panorama) |





| • | Panorama™ management server. |
| --- | --- |







| • | Support license |
| --- | --- |





| • | (`Panorama`) Device management license |
| --- | --- |






Select **Device** > **Server Profiles** > **SCP** or **Panorama** > **Server Profiles** > **RADIUS** to configure settings for the Secure Copy Protocol (SCP) server to securely copy and transfer files across your network so that you can automatically download and install content updates on NGFW.



| SCP Server Settings | Description |
| --- | --- |
| Profile Name | Enter a name to identify the server profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Server | Enter the server IP address or FQDN. |
| Port | Enter the server port for the file transfer (range is 1-65,535; default is 22. |
| Username | Enter the username used to access the SCP server. |
| Password Confirm Password | Enter and confirm the case-sensitive password for the username used to access the SCP server. |
| Path | Enter the path for the target upload directory on the SCP server. |
| Fingerprint | Enter the SSH host key to identify and authenticate the connection between NGFW and the SCP server. |

 Parent topic
 [Device](device.html#ID0EY2QW)