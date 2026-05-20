# Device > User Identification > Group Mapping Settings

*User Identification : Device &gt; User Identification &gt; Group Mapping Settings*

## Device > User Identification > Group Mapping Settings




| • | **Device** > **User Identification** > **Group Mapping Settings** |
| --- | --- |




To base security policies and reports on users and user groups, the firewall retrieves the list of groups and the corresponding list of members specified and maintained on your directory servers. The firewall supports a variety of LDAP directory servers, including the Microsoft Active Directory (AD), the Novell eDirectory, and the Sun ONE Directory Server.


The number of distinct user groups that each firewall or Panorama can reference across all policies varies by [model](https://docs.paloaltonetworks.com/compatibility-matrix/user-id-agent.html). Regardless of model, though, you must configure an LDAP server profile ([Device > Server Profiles > LDAP](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-web-interface-help/device/device-server-profiles-ldap)) before you can create a group mapping configuration.

 Note:



| | The [complete procedure](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-users-to-groups.html) for mapping usernames to groups requires additional tasks besides creating group mapping configurations. |
| --- | --- |




**Add** and configure the following fields as needed to create a group mapping configuration. To remove a group mapping configuration, select and **Delete** it. If you want to disable a group mapping configuration without deleting it, edit the configuration and clear the **Enabled** option.

 Note:**If you create multiple group mapping configurations that use the same base distinguished name (DN) or LDAP server, the group mapping configurations cannot contain overlapping groups (for example, the Include list for one group mapping configuration cannot contain a group that is also in a different group mapping configuration).


| Group Mapping Settings—Server Profile | Configured In | Description |
| --- | --- | --- |
| Name | **Device** > User Identification** > **Group Mapping Settings** | Enter a name to identify the group mapping configuration (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Server Profile | **Device** > **User Identification** > **Group Mapping Settings** > **Server Profile** | Select the LDAP server profile to use for group mapping on this firewall. |
| Update Interval | Specify the interval in seconds after which the firewall will initiate a connection with the LDAP directory server to obtain any updates that were made to the groups that firewall policies use (range is 60 to 86,400). | |
| User Domain | By default, **User Domain** is blank: the firewall automatically detects the domain names for Active Directory servers. If you enter a value, it overrides any domain names that the firewall retrieves from the LDAP source. Your entry must be the NetBIOS name. Note:  | This field affects only the usernames and group names retrieved from the LDAP source. To override the domain associated with a username for user authentication, configure the **User Domain** and **Username Modifier** for the authentication profile you assign to that user (see [Device > Authentication Profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-web-interface-help/device/device-authentication-profile/configure-an-authentication-profile)). |







 Group Objects





| • | **Search Filter**—Enter an LDAP query that specifies which groups to retrieve and track. |
| --- | --- |






| • | **Object Class**—Enter a group definition. The default is objectClass=group, which specifies that the system retrieves all objects in the directory that match the group **Search Filter** and have objectClass=group. |
| --- | --- |







 User Objects





| • | **Search Filter**—Enter an LDAP query that specifies which users to retrieve and track. |
| --- | --- |






| • | **Object Class**—Enter a user object definition. For example, in Active Directory, the objectClass is user. |
| --- | --- |







 Enabled


 Select this option to enable server profile for group mapping.




 Fetch list of managed devices


 For GlobalProtect deployments, select this option to allow the firewall to retrieve serial numbers from a directory server (such as Active Directory). This enables GlobalProtect to identify the status of connecting endpoints and enforce HIP-based security policies based on the presence of the endpoint serial number.




 User Attributes


 **Device > User Identification > Group Mapping Settings > User and Group Attributes**


 Specify the directory attributes to identify users:



| • | **Primary Username**—Specify the attribute the User-ID source provides for the username (for example, userPrincipalName or sAMAccountName) |
| --- | --- |



 Note:



| | The primary username is how the firewall identifies the user in logs, reports, and policy configurations, even if the firewall receives other formats from the User-ID sources. If you do not specify a format, the firewall uses the sAMAccountName format by default for Active Directory and the uid format for Novell eDirectory and Sun ONE Directory Server. |
| --- | --- |






| • | **E-Mail**—Specify the attribute the User-ID source provides for the email address. The default is mail. |
| --- | --- |






| • | **Alternate Username 1-3**—Specify up to three additional attributes that correspond with the formats your User-ID sources can send. |
| --- | --- |



 Note:**If you configure an Active Directory server, the Alternate Username 1 is userPrincipalName** by default.




 Group Attributes


 Specify the attributes that the User-ID sources use to identify groups:



| • | **Group Name**—Specify the attribute the User-ID source uses for the group name attribute. The default for Active Directory is name and the default for Novell eDirectory or Sun ONE Directory Server is cn. |
| --- | --- |






| • | **Group Member**—Specify the attribute the User-ID source uses for the group member. The default is member. |
| --- | --- |






| • | **E-Mail**—Specify the attribute the User-ID source uses for the email address. The default is mail. |
| --- | --- |







 Available Groups


 **Device** > **User Identification** > **Group Mapping Settings** > **Group Include List**


 Use these fields to limit the number of groups that the firewall displays when you create a security rule. Browse the LDAP tree to find the groups you want to use in rules. To include a group, select and add ( ) it in the Available Groups list. To remove a group from the list, select and delete ( ) it from the Included Groups list.
 Fastpath:
 Include only the groups you need so that the firewall retrieves user group mappings for only the necessary groups and not for the whole tree from the LDAP directory.




 Included Groups




 Name


 **Device** > **User Identification** > **Group Mapping Settings** > **Custom Group**


 Create custom groups based on LDAP filters so that you can base firewall policies on user attributes that don’t match existing user groups in the LDAP directory.
 The User-ID service maps all the LDAP directory users who match the filter to the custom group. If you create a custom group with the same Distinguished Name (DN) as an existing Active Directory group domain name, the firewall uses the custom group in all references to that name (for example, in policies and logs). To create a custom group, **Add** and configure the following fields:



| • | **Name**—Enter a custom group name that is unique in the group mapping configuration for the current firewall or virtual system. |
| --- | --- |






| • | **LDAP Filter**—Enter a filter of up to 2,048 characters. |
| --- | --- |



 Fastpath:
 Use only indexed attributes in the filter to expedite LDAP searches and minimize the performance impact on the LDAP directory server; the firewall does not validate LDAP filters.
 The combined maximum for the **Included Groups** and **Custom Group** lists is 640 entries.
 To delete a custom group, select and **Delete** it. To make a copy of a custom group, select and **Clone** it and then edit the fields as appropriate.
 CAUTION:
 After adding or cloning a custom group, you must **Commit** your changes before your new custom group is available in policies and objects.




 LDAP Filter



 Parent topic
 [User Identification](user-identification.html#ID0EBI2Z)