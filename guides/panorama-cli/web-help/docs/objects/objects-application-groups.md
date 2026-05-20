# Objects > Application Groups

*Objects : Objects &gt; Application Groups*

## Objects > Application Groups


To simplify the creation of security policies, applications requiring the same security settings can be combined by [creating](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/app-id/use-application-objects-in-policy/create-an-application-group.html) an application group. (To define a new application, refer to [Defining Applications](defining-applications.html#ID0EULZQ).)



| New Application Group Settings | Description |
| --- | --- |
| Name | Enter a name that describes the application group (up to 31 characters). This name appears in the application list when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Shared | Select this option if you want the application group to be available to: Every virtual system (vsys) on a multi-vsys firewall. If you clear this selection, the application group will be available only to the **Virtual System** selected in the **Objects** tab. Every device group on Panorama. If you clear this selection, the application group will be available only to the **Device Group** selected in the **Objects** tab. |
| Disable override (`Panorama only`) | Select this option to prevent administrators from overriding the settings of this application group object in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object. |
| Applications | Click **Add** and select applications, application filters, and/or other application groups to be included in this group. |


 Parent topic
 [Objects](objects.html#ID0EL3RQ)