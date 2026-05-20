# Device > Server Profiles > Kerberos

*Device : Device &gt; Server Profiles &gt; Kerberos*

## Device > Server Profiles > Kerberos


Select **Device** > **Server Profiles** > **Kerberos** or **Panorama** > **Server Profiles** > **Kerberos** to [configure a server profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-kerberos-server-authentication.html) that enables users to natively authenticate to an Active Directory domain controller or a Kerberos V5-compliant authentication server. After configuring a Kerberos server profile you can assign it to an authentication profile (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)). You can use Kerberos to authenticate end users who access your network resources (through GlobalProtect or Authentication Portal) and administrators defined locally on the firewall or Panorama.

 CAUTION:
 To use Kerberos authentication, your back-end Kerberos server must be accessible over an IPv4 address. IPv6 addresses are not supported.


| Kerberos Server Settings | Description |
| --- | --- |
| Profile Name | Enter a name to identify the server (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| Administrator Use Only | Select this option to specify that only administrator accounts can use the profile for authentication. For firewalls that have multiple virtual systems, this option appears only if the **Location** is **Shared**. |
| Servers | For each Kerberos server, click **Add** and specify the following settings: • |






| • | **Kerberos Server**—Enter the server IPv4 address or FQDN. |
| --- | --- |






| • | **Port**—Enter an optional port (range is 1 to 65,535; default is 88) for communication with the server. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)