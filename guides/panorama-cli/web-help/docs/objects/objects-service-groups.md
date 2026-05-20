# Objects > Service Groups

*Objects : Objects &gt; Service Groups*

## Objects > Service Groups


To simplify the creation of security policies, you can combine services that have the same security settings into service groups. To define new services, refer to [Objects > Services](objects-services.html#ID0EIQ2Q).


The following table describes the service group settings:



| Service Group Settings | Description |
| --- | --- |
| Name | Enter the service group name (up to **63** characters). This name appears in the services list when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Shared | Select this option if you want the service group to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the service group will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this service group object in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object.




 Service


 Click **Add** to add services to the group. Select from the drop-down or click **Service** at the bottom of the drop-down and specify the settings. Refer to [Objects > Services](objects-services.html#ID0EIQ2Q) for a description of the settings.



 Parent topic
 [Objects](objects.html#ID0EL3RQ)