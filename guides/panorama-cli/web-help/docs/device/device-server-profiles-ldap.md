# Device > Server Profiles > LDAP

*Device : Device &gt; Server Profiles &gt; LDAP*

## Device > Server Profiles > LDAP




| • | **Device** > **Server Profiles** > **LDAP** |
| --- | --- |






| • | **Panorama** > **Server Profiles** > **LDAP** |
| --- | --- |




**Add** or select an LDAP Server Profile to [configure settings](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-ldap-authentication.html) for the Lightweight Directory Access Protocol (LDAP) servers that authentication profiles reference (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)). You can use LDAP to authenticate end users who access your network resources (through GlobalProtect or Authentication Portal) and administrators defined locally on the firewall or Panorama.



| LDAP Server Settings | Description |
| --- | --- |
| Profile Name | Enter a name to identify the profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| Administrator Use Only | Select this option to specify that only administrator accounts can use the profile for authentication. For firewalls that have multiple virtual systems, this option appears only if the **Location** is **Shared**. |
| Server List | For each LDAP server, **Add** a host **Name**, IP address or FQDN (**LDAP Server**), and **Port** (default is 389). Fastpath:  Configure at least two LDAP servers to provide redundancy. |
| Type | Choose the server type from the drop-down. |
| Base DN | Specify the root context in the directory server to narrow the search for user or group information. |
| Bind DN | Specify the login name (Distinguished Name) for the directory server. Note:**The Bind DN account must have permission to read the LDAP directory. |
| Password/Confirm Password | Specify the bind account password. The agent saves the encrypted password in the configuration file. |
| Bind Timeout | Specify the time limit (in seconds) imposed when connecting to the directory server (range is 1 to 30; default is 30). |
| Search Timeout | Specify the time limit (in seconds) imposed when performing directory searches (range is 1 to 30; default is 30). |
| Retry Interval | Specify the interval (in seconds) after which the system will try to connect to the LDAP server after a previous failed attempt (range is 1 to 3,600; default is 60). |
| Require SSL/TLS secured connection | Select this option if you want the firewall to use SSL or TLS for communications with the directory server. The protocol depends on the server port: • |






| • | 636—SSL |
| --- | --- |






| • | Any other port—The firewall first attempts to use TLS. If the directory server doesn’t support TLS, the firewall falls back to SSL. |
| --- | --- |



 Fastpath:
 This option is a best practice because it increases security and is selected by default.




 Verify Server Certificate for SSL sessions


 Select this option (cleared by default) if you want the firewall to verify the certificate that the directory server presents for SSL/TLS connections. The firewall verifies the certificate in two respects:



| • | The certificate is trusted and valid. For the firewall to trust the certificate, its root certificate authority (CA) and any intermediate certificates must be in the certificate store under **Device** > **Certificate Management** > **Certificates** > **Device Certificates**. |
| --- | --- |






| • | The certificate name must match the host **Name** of the LDAP server. The firewall first checks the certificate attribute Subject AltName for matching, then tries the attribute Subject DN. If the certificate uses the FQDN of the directory server, you must use the FQDN in the **LDAP Server** field for the name matching to succeed. |
| --- | --- |



 If the verification fails, the connection fails. To enable this verification, you must also select **Require SSL/TLS secured connection**.
 Fastpath:
 Enable the firewall to verify the server certificate for SSL sessions to increase security.



 Parent topic
 [Device](device.html#ID0EY2QW)