# Objects > Security Profile Groups

*Objects : Objects &gt; Security Profile Groups*

## Objects > Security Profile Groups


The firewall supports the ability to [create Security Profile groups](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-profiles/create-a-security-profile-group.html), which specify sets of Security Profiles that can be treated as a unit and then added to security policies. For example, you can create a threats Security Profile group that includes profiles for Antivirus, Anti-Spyware, and Vulnerability Protection and then create a Security policy rule that includes the threats profile.


Antivirus, Anti-Spyware, Vulnerability Protection, URL filtering, and file blocking profiles that are often assigned together can be combined into profile groups to simplify the creation of security policies.


To define a new Security Profile, select **Objects** > **Security Profiles**.


The following table describes the Security Profile settings:



| Security Profile Group Settings | Description |
| --- | --- |
| Name | Enter the profile group name (up to 31 characters). This name appears in the profiles list when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Shared (`Panorama only`) | Select this option if you want the profile group to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the profile group will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this Security Profile group object in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object.




 Profiles


 Select an Antivirus, Anti-Spyware, Vulnerability Protection, URL filtering, and/or file blocking profile to be included in this group. Data filtering profiles can also be specified in Security Profile groups. Refer to [Objects > Security Profiles > Data Filtering](objects-security-profiles-data-filtering.html#ID0EEIWR).



 Parent topic
 [Objects](objects.html#ID0EL3RQ)