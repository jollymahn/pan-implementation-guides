# Panorama > Administrators

*Panorama Web Interface : Panorama &gt; Administrators*

## Panorama > Administrators


Select **Panorama** > **Administrators** to create and manage accounts for Panorama administrators.


If you log in to Panorama as an administrator with a superuser role, you can unlock the accounts of other administrators by clicking the lock icons in the Locked User column. A locked out administrator cannot access Panorama. Panorama locks out administrators who exceed the allowed number of failed successive attempts to access Panorama as defined in the **Authentication Profile** assigned to their accounts (see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY)).


To create an administrator account, click **Add** and configure the settings as described in the following table.



| Administrator Account Settings | Description |
| --- | --- |
| Name | Enter a login username for the administrator (up to 15 characters). The name is case-sensitive, must be unique, and can contain only letters, numbers, hyphens, and underscores. |
| Authentication Profile | Select an authentication profile or sequence to authenticate this administrator. For details, see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY) or [Device > Authentication Sequence](device-authentication-sequence.html#ID0EO3IY). |
| Use only client certificate authentication (`Web`) | Select to use [client certificate authentication](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-administrative-access-to-panorama/configure-administrative-accounts-and-authentication/configure-a-panorama-administrator-with-certificate-based-authentication-for-the-web-interface.html) for web interface access. If you select this option, a username (**Name**) and **Password** are not required. |
| Password/Confirm Password | Enter and confirm a case-sensitive password for the administrator (up to 16 characters). To ensure security, Palo Alto Networks recommends that administrators change their passwords periodically using a combination of lowercase letters, uppercase letters, and numbers. Be sure to use the [best practices for password strength](https://docs.paloaltonetworks.com/best-practices/10-1/administrative-access-best-practices/administrative-access-best-practices.html) to ensure a strict password. Device Group and Template administrators cannot access **Panorama** > **Administrators**. To change their local password, these administrators click their username (beside **Logout** at the bottom of the web interface). This also applies to administrators with a custom Panorama role in which access to **Panorama** > **Administrators** is disabled. You can use password authentication in conjunction with an **Authentication Profile** (or sequence) or with local database authentication. You can set password expiration parameters by selecting a **Password Profile** (see [Device > Password Profiles](device-password-profiles.html#ID0ECFBY)) and setting Minimum Password Complexity parameters (see [Device > Setup > Management](device-setup-management.html#ID0E1DTW)), but only for administrative accounts that Panorama authenticates locally. |
| Use Public Key Authentication (SSH) | Select to use [SSH public key authentication](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-administrative-access-to-panorama/configure-administrative-accounts-and-authentication/configure-an-administrator-with-ssh-key-based-authentication-for-the-cli.html): click **Import Key**, **Browse** to select the public key file, and click **OK**. The Administrator dialog displays the uploaded key in the read-only text area. Supported key file formats are IETF SECSH and OpenSSH. Supported key algorithms are DSA (1024 bits) and RSA (768 to 4096 bits). Note:  |







 Administrator Type


 The type selection determines the [administrative role](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-overview/role-based-access-control.html) options:



| • | **Dynamic**—Roles that provide access to Panorama and managed firewalls. When new features are added, Panorama automatically updates the definitions of dynamic roles; you never need to manually update them. |
| --- | --- |






| • | **Custom Panorama Admin**—Configurable roles that have read-write access, read-only access, or no access to Panorama features. |
| --- | --- |






| • | **Device Group and Template Admin**—Configurable roles that have read-write access, read-only access, or no access to features for the device groups and templates that are assigned to the access domains you select for this administrator. |
| --- | --- |







 Admin Role
 (`Dynamic administrator type`)


 Select a predefined role:



| • | **Superuser**—Full read-write access to Panorama and all device groups, templates, and managed firewalls. |
| --- | --- |






| • | **Superuser (Read Only)**—Read-only access to Panorama and all device groups, templates, and managed firewalls. |
| --- | --- |






| • | **Panorama administrator**—Full access to Panorama except for the following actions: |
| --- | --- |






| ◦ | Create, modify, or delete Panorama or firewall administrators and roles. |
| --- | --- |






| ◦ | Export, validate, revert, save, load, or import a configuration (**Device** > **Setup** > **Operations**). |
| --- | --- |






| ◦ | Configure a **Scheduled Config Export** in the **Panorama** tab. |
| --- | --- |







 Profile
 (`Custom Panorama Admin administrator type`)


 Select a custom Panorama role (see [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3)).




 Access Domain to Administrator Role
 (`Device Group and Template Admin administrator type`)


 For each access domain (up to 25) you want to assign to the administrator, **Add** an **Access Domain** from the drop-down (see [Panorama > Access Domains](panorama-access-domains.html#ID0E4TB3)) and then click the adjacent Admin Role cell and select a custom Device Group and Template administrator role from the drop-down (see [Panorama > Managed Devices > Summary](panorama-managed-devices-summary.html#ID0ELSD3)). When administrators with access to more than one domain log in to Panorama, an **Access Domain** drop-down appears in the footer of the web interface. Administrators can select any assigned **Access Domain** to filter the monitoring and configuration data that Panorama displays. The **Access Domain** selection also filters the firewalls that the **Context** drop-down displays.
 Note:



| | If you use a RADIUS server to authenticate administrators, you [must map administrator roles and access domainstoRADIUS VSAs](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-radius-authentication.html). Because VSA strings support a limited number of characters, if you configure the maximum number of access domain/role pairs (25) for an administrator, the Name values for each access domain and each role must not exceed an average of 9 characters. |
| --- | --- |







 Password Profile


 Select a **Password Profile** (see [Device > Password Profiles](device-password-profiles.html#ID0ECFBY)).



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)