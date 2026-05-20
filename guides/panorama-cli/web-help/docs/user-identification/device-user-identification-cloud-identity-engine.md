# Device > User Identification > Cloud Identity Engine

*User Identification : Device &gt; User Identification &gt; Cloud Identity Engine*

## Device > User Identification > Cloud Identity Engine


**Add** a Cloud Identity Engine profile to your firewall to use the Cloud Identity Engine as a source for user identification information. When you create a Cloud Identity Engine profile, you can enforce user- or group-based security policies based on user and group information from the on-premises or cloud-based directories you configure in the Cloud Identity Engine app. You can also **Delete** a profile or export a **PDF/CSV** of the current Cloud Identity Engine profiles.

 Note:**Before you can configure a Cloud Identity Engine profile on the firewall, you must [install](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/obtain-certificates/device-certificate)** a device certificate and [activate](https://docs.paloaltonetworks.com/cloud-identity/cloud-identity-engine-getting-started/get-started-with-the-cloud-identity-engine/activate-the-cloud-identity-engine.html) a Cloud Identity Engine instance on the hub.

To search the profiles, enter a keyword as the filter () and **Apply Filter** ().



| Cloud Identity Engine Settings | Description |
| --- | --- |
| **Name** | Enter a **Name** (up to 31 characters) for the Cloud Identity Engine profile. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| **Instance** | Enter the following information to configure the Cloud Identity Engine profile: • |



 Note:**The region you select must match the region you select when you [activate](https://docs.paloaltonetworks.com/cloud-identity/cloud-identity-engine-getting-started/get-started-with-the-cloud-identity-engine/activate-the-cloud-identity-engine.html)** your Cloud Identity Engine instance.



| • | **Cloud Identity Engine Instance**—If you have more than one instance, select the Cloud Identity Engine instance you want to use. |
| --- | --- |






| • | **Domain**—Select the domain that contains the directories you want to use. |
| --- | --- |






| • | **Update Interval (min)**—Enter the number of minutes that you want the firewall to wait between updates. The default is 60 minutes and the range is 5—1440. |
| --- | --- |



 When you finish configuring the Cloud Identity Engine profile, confirm that the profile is **Enabled**.




 **User Attributes**


 Select a **Directory Attribute** for each user attribute **Name**. You must select a **Primary Username**; all other fields are optional.




 **Group Attributes**


 Select a **Directory Attribute** for each group attribute **Name**. You must select a **Group Name**; the remaining field is optional.




 **Device Attributes**


 (`GlobalProtect only`) If you are using GlobalProtect and you have enabled Serial Number Check, select the **Endpoint Serial Number** to allow the Cloud Identity Engine to collect serial numbers from managed endpoints. This information is used by the GlobalProtect portal to check if the serial number exists in the directory for verification that the endpoint is managed by GlobalProtect.



 Parent topic
 [User Identification](user-identification.html#ID0EBI2Z)