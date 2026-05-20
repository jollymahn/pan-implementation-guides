# Device > Local User Database > Users

*Device : Device &gt; Local User Database &gt; Users*

## Device > Local User Database > Users


You can set up a local database on the firewall to store authentication information for firewall [administrators](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/manage-firewall-administrators/configure-administrative-accounts-and-authentication/configure-a-firewall-administrator-account.html), [Authentication Portal end users](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/map-ip-addresses-to-usernames-using-captive-portal.html), and end users who authenticate to a [GlobalProtect portal](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-portals.html) and [GlobalProtect gateway](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-gateways.html). Local database authentication requires no external authentication service; you perform all account management on the firewall. After creating the local database and (optionally) assigning the users to groups (see [Device > Local User Database > User Groups](device-local-user-database-user-groups.html#ID0E3JUZ)), you can [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY) based on the local database.

 Note:



| | You cannot configure [Device > Password Profiles](device-password-profiles.html#ID0ECFBY) for administrative accounts that use local database authentication. |
| --- | --- |




To **Add** a local user to the database, configure the settings described in the following table.



| Local User Settings | Description |
| --- | --- |
| Name | Enter a name to identify the user (up to 31 characters). The name is not case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the user account is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the user account, you can’t change its **Location**. |
| Mode | Use this field to specify the authentication option: • |






| • | **Password Hash**—Enter a hashed password string. This can be useful if, for example, you want to reuse the credentials for an existing Unix account but don’t know the plaintext password, only the hashed password. The firewall accepts any string of up to 63 characters regardless of the algorithm used to generate the hash value. The operational CLI command request password-hash password uses the SHA256 algorithm in normal and CC/FIPS modes. |
| --- | --- |



 Note:



| | Any [Minimum Password Complexity](device-setup-management.html#ID0ESD3W) parameters you set for the firewall (**Device** > **Setup** > **Management**) do not apply to accounts that use a **Password Hash**. |
| --- | --- |







 Enable


 Select this option to activate the user account.



 Parent topic
 [Device](device.html#ID0EY2QW)