# Device > Authentication Sequence

*Device : Device &gt; Authentication Sequence*

## Device > Authentication Sequence




| • | Device > Authentication Sequence |
| --- | --- |






| • | Panorama > Authentication Sequence |
| --- | --- |




In some environments, user accounts reside in multiple directories (such as LDAP and RADIUS). An authentication sequence is a set of authentication profiles that the firewall tries to use for authenticating users when they log in. The firewall tries the profiles sequentially from the top of the list to the bottom—applying the authentication, Kerberos single sign-on, allow list, and account lockout values for each—until one profile successfully authenticates the user. The firewall only denies access if all profiles in the sequence fail to authenticate. For details on authentication profiles, see [Device > Authentication Profile](device-authentication-profile.html#ID0E1CFY).

 Fastpath:
 Configure an authentication sequence with multiple authentication profiles that use different authentication methods. Configure at least two external authentication methods and one local (internal) method so connectivity issues don’t prevent authentication. Make the local authentication profile the last profile in the sequence so it’s only used if all external authentication methods fail. (External authentication provides dedicated, reliable, centralized authentication services, including logging and troubleshooting features.)


| Authentication Sequence Settings | Description |
| --- | --- |
| Name | Enter a name to identify the sequence. The name is case-sensitive, can have up to 31 characters, and can include only letters, numbers, spaces, hyphens, underscores, and periods. The name must be unique in the current **Location** (firewall or virtual system) relative to other authentication sequences and to authentication profiles. CAUTION:  In a firewall that has multiple virtual systems, if the **Location** of the authentication sequence is a virtual system (vsys), don’t enter the same name as an authentication profile in the Shared location. Similarly, if the sequence **Location** is **Shared**, don’t enter the same name as a profile in a vsys. While you can commit an authentication sequence and profile with the same names in these cases, reference errors might occur. |
| Location | Select the scope in which the sequence is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the sequence, you can’t change its **Location**. |
| Exit the sequence on failed authentication | If the credentials that the user enters during login match any authentication profile in the authentication sequence (either with or without normalization), the firewall discontinues the authentication sequence if the firewall cannot successfully authenticate the user instead of completing the rest of the authentication sequence in top-to-bottom order. |
| Use domain to determine authentication profile | The following option applies for LDAP authentication profiles only and is enabled by default. **Use User-ID domain to determine authentication profile**—Normalizes the domain name that the user enters when logging in before using the domain name to check the authentication profiles in sequence. If you do not select this option, the firewall does not normalize the domain name that the user enters during login before applying the authentication profile sequence. If you disable this option, the firewall does not normalize the domain name and tries to match the domain name with the authentication profiles in the sequence in top-to-bottom order even if authentication is not successful. |
| Authentication Profiles | Click **Add** and select from the drop-down for each authentication profile you want to add to the sequence. To change the list order, select a profile and click **Move Up** or **Move Down**. To remove a profile, select it and click **Delete**. Note:  |






 Parent topic
 [Device](device.html#ID0EY2QW)