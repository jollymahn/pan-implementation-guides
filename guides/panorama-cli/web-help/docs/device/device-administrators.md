# Device > Administrators

*Device : Device &gt; Administrators*

## Device > Administrators


Administrator accounts control access to firewalls and Panorama. A firewall administrator can have full or read-only access to a single firewall or to a virtual system on a single firewall. Firewalls have a predefined **admin** account that has full access.

 Note:



| | To define Panorama administrators, see [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3). |
| --- | --- |




The following authentication options are supported:




| • | Password authentication—The administrator enters a username and password to log in. This authentication requires no certificates. You can use it in conjunction with authentication profiles, or for local database authentication. |
| --- | --- |






| • | Client certificate authentication (web)—This authentication requires no username or password; the certificate suffices to authenticate access to the firewall. |
| --- | --- |






| • | Public key authentication (SSH)—The administrator generates a public/private key pair on the machine that requires access to the firewall, and then uploads the public key to the firewall to allow secure access without requiring the administrator to enter a username and password. |
| --- | --- |




To add an administrator, click **Add** and fill in the following information:



| Administrator Account Settings | Description |
| --- | --- |
| Name | Enter a login name for the administrator (up to 31 characters). The name is case sensitive and must be unique. Use only letters, numbers, hyphens, periods, and underscores. Login names cannot start with a hyphen (-). |
| Authentication Profile | Select an authentication profile for administrator authentication. You can use this setting for RADIUS, TACACS+, LDAP, Kerberos, SAML, or local database authentication. For details, see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY). |
| Use only client certificate authentication (web) | Select this option to use client certificate authentication for web access. If you select this option, a username and password are not required; the certificate is sufficient to authenticate access to the firewall. |
| New Password Confirm New Password | Enter and confirm a case-sensitive password for the administrator (up to 64 characters). You can also select **Setup** > **Management** to enforce a minimum password length. Note:  |







 Use Public Key Authentication (SSH)


 Select this option to use SSH public key authentication. Click **Import Key** and browse to select the public key file. The uploaded key appears in the read-only text area.
 Supported key file formats are IETF SECSH and OpenSSH. Supported key algorithms are DSA (1,024 bits) and RSA (768 to 4,096 bits).
 Note:



| | If the public key authentication fails, the firewall prompts the administrator for a username and password. |
| --- | --- |







 Administrator Type


 Assign a role to this administrator. The role determines what the administrator can view and modify.
 If you select **Role Based**, select a custom role profile from the drop-down. For details, see [Device > Admin Roles](device-admin-roles.html#ID0EQPDY).
 If you select **Dynamic**, you can select one of the following predefined roles:



| • | **Superuser**—Has full access to the firewall and can define new administrator accounts and virtual systems. You must have superuser privileges to create an administrative user with superuser privileges. |
| --- | --- |






| • | **Superuser** (read-only)—Has read-only access to the firewall. |
| --- | --- |






| • | **Device administrator**—Has full access to all firewall settings except for defining new accounts or virtual systems. |
| --- | --- |






| • | **Device administrator** (read-only)—Has read-only access to all firewall settings except password profiles (no access) and administrator accounts (only the logged in account is visible). |
| --- | --- |






| • | **Virtual system administrator**—Has access to specific virtual systems on the firewall to create and manage specific aspects of virtual systems (if Multi Virtual System Capability is enabled). A virtual system administrator doesn’t have access to network interfaces, virtual routers, IPSec tunnels, VLANs, virtual wires, GRE tunnels, DHCP, DNS Proxy, QoS, LLDP, or network profiles. |
| --- | --- |






| • | **Virtual system administrator** (read-only)—Has read-only access to specific virtual systems on the firewall to view specific aspects of virtual systems (if Multi Virtual System Capability is enabled). A virtual system administrator with read-only access doesn’t have access to network interfaces, virtual routers, IPSec tunnels, VLANs, virtual wires, GRE tunnels, DHCP, DNS Proxy, QoS, LLDP, or network profiles. |
| --- | --- |







 Virtual System
 (`Virtual system administrator role only`)


 Click **Add** to select the virtual systems that the administrator can manage.




 Password Profile


 Select the password profile, if applicable. To create a new password profile, see [Device > Password Profiles](device-password-profiles.html#ID0ECFBY).
 Fastpath:
 Create a password profile for administrators to ensure that admin passwords expire after a configured time period. Changing admin passwords regularly helps prevent attackers from using saved or stolen credentials.



 Parent topic
 [Device](device.html#ID0EY2QW)