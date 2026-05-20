# Objects > Security Profiles > WildFire Analysis

*Objects : Objects &gt; Security Profiles &gt; WildFire Analysis*

## Objects > Security Profiles > WildFire Analysis


Use a WildFire Analysis profile to specify for WildFire file analysis to be performed locally on the WildFire appliance or in the WildFire cloud. You can specify traffic to be forwarded to the public cloud or private cloud based on file type, application, or the transmission direction of the file (upload or download). After creating a [WildFire analysis profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-profiles.html), adding the profile to a policy (**Policies** > **Security**) further allows you apply the profile settings to any traffic matched to that policy (for example, a URL category defined in the policy).

 Fastpath:
 Use the predefined default profile to [forward all unknown files to WildFire](https://docs.paloaltonetworks.com/advanced-wildfire/administration/configure-advanced-wildfire-analysis/forward-files-for-advanced-wildfire-analysis.html) for analysis. In addition, set up [WildFire appliance content updates](https://docs.paloaltonetworks.com/advanced-wildfire/wildfire-appliance/set-up-and-manage-a-wildfire-appliance/enable-wildfire-appliance-analysis-features/set-up-wildfire-appliance-content-updates.html) to download and install every minute so you always have the most recent support.


| WildFire Analysis Profile Settings |
| --- |
| Name |
| Description |
| Shared (`Panorama only`) |






| • | Every device group on Panorama. If you clear this selection, the profile will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this Vulnerability Protection profile in device groups that inherit the profile. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the profile.




 Rules




 Rules


 Define one or more rules to specify traffic to forward to either the WildFire public cloud or the WildFire appliance (private cloud) for analysis.



| • | Enter a descriptive **Name** for any rules you add to the profile (up to 31 characters). |
| --- | --- |






| • | Add an **Application** so that any application traffic will be matched to the rule and forwarded to the specified analysis destination. |
| --- | --- |






| • | Select a **File Type** to be analyzed at the defined analysis destination for the rule. |
| --- | --- |



 Note:



| | A WildFire private cloud (hosted by a WildFire appliance) does not support analysis of APK, Mac OS X, archive, and linux files. |
| --- | --- |






| • | Apply the rule to traffic depending on the transmission **Direction**. You can apply the rule to upload traffic, download traffic, or both. |
| --- | --- |






| • | Select the destination for traffic to be forwarded for **Analysis**: |
| --- | --- |



 Note:



| | In a hybrid cloud deployment, files that match to both private-cloud and public-cloud rules are forwarded only to the private cloud as a cautionary measure. |
| --- | --- |






| ◦ | Select public-cloud so that all traffic matched to the rule is forwarded to the WildFire public cloud for analysis. |
| --- | --- |






| ◦ | Select private-cloud so that all traffic matched to the rule is forwarded to the WildFire appliance for analysis. |
| --- | --- |







 Inline Cloud Analysis




 Enable Inline Cloud Analysis


 Select this option to enable Advanced WildFire Inline Cloud Analysis.




 Rules


 Define one or more rules to specify traffic to forward to Advanced WildFire Inline Cloud Analysis.



| • | Enter a descriptive **Name** for any rules you add to the profile (up to 31 characters). |
| --- | --- |






| • | Add an **Application** so that any application traffic will be matched to the rule and forwarded to the specified analysis destination. |
| --- | --- |






| • | Select a **File Type** to be analyzed at the defined analysis destination for the rule. |
| --- | --- |






| • | Apply the rule to traffic depending on the transmission **Direction**. You can apply the rule to download traffic. |
| --- | --- |



 Note:



| | When downloading multiple files simultaneously from some online services, the files are archived in a format that is not currently supported by PAN-OS. These files are not unarchived and analyzed. |
| --- | --- |






| • | Specify an **Action** to take when Advanced WildFire Inline Cloud Analysis detects malware. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)