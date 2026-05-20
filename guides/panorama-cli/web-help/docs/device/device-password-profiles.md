# Device > Password Profiles

*Device : Device &gt; Password Profiles*

## Device > Password Profiles




| • | Device > Password Profiles |
| --- | --- |






| • | Panorama > Password Profiles |
| --- | --- |




Select **Device** > **Password Profiles** or **Panorama** > **Password Profiles** to set basic password requirements for individual local accounts. Password profiles override any [Minimum Password Complexity](device-setup-management.html#ID0ESD3W) settings you defined for all local accounts (**Device** > **Setup** > **Management**).


To apply a password profile to an account, select **Device** > **Administrators** (`firewalls`) or **Panorama** > **Administrators** (`Panorama`), select an account, and then select the **Password Profile**.

 Note:



| | You cannot assign password profiles to administrative accounts that use local database authentication (see [Device > Local User Database > Users](device-local-user-database-users.html#ID0EMYTZ)). |
| --- | --- |




To create a password profile, **Add** and specify the information in the following table.



| Password Profile Settings | Description |
| --- | --- |
| Name | Enter a name to identify the password profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Required Password Change Period (days) | Require that administrators change their password on a regular basis specified a by a number of days (range is 0 to 365). Example, if the value is set to 90, administrators will be prompted to change their password every 90 days. You can also set an expiration warning from 0 to 30 days and specify a grace period. |
| Expiration Warning Period (days) | If a required password change period is set, this setting can be used to prompt the user to change their password at each log in as the forced password change date approaches (range is 0 to 30). |
| Post Expiration Admin Login Count | Allow the administrator to log in a specified number of times after their account has expired. Example, if the value is set to 3 and their account has expired, they can log in 3 more times before their account is locked out (range is 0 to 3). |
| Post Expiration Grace Period (days) | Allow the administrator to log in the specified number of days after their account has expired (range is 0 to 30). |


 Parent topic
 [Device](device.html#ID0EY2QW)