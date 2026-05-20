# Device > Policy Recommendation > IoT

*Device : Device &gt; Policy Recommendation &gt; IoT*

## Device > Policy Recommendation > IoT


View information about policy rule recommendations from [IoT Security](https://www.paloaltonetworks.com/network-security/iot-security). IoT Security uses metadata that the firewall collects from traffic on your network to determine what behavior to allow for device profiles and then generates recommendations for Security policy rules to apply.



| Button/Field | Description |
| --- | --- |
| Profiles | Choose a device profile to view recommended security policy rules for it. This list comes from the Profiles page in the IoT Security portal. Select the rules that you want to import into the PAN-OS rulebase and then **Import Policy Rule**. |
| Policy Import Details | After you import a policy rule, you can view the following details about it by clicking the file-and-magnifying glass icon: • |






| • | **Rule Name**: The name of the rule, which is a hyphenated concatenation of the profile name and application name |
| --- | --- |






| • | **User**: The name of the administrator who imported the policy |
| --- | --- |






| • | **New Updates Applied**: Indication of whether the policy rule had been updated (yes) after it was imported or not (no) |
| --- | --- |






| • | **Imported Time**: The date and time when the policy rule was imported |
| --- | --- |






| • | **Updated Time**: The date and time when the policy rule was last updated |
| --- | --- |







 Imported to


 For next-generation firewalls, this shows the virtual system into which a policy rule recommendation was imported. For Panorama, this shows the device groups into which a policy rule recommendation was imported.




 Policy Rule Name


 The name of a policy rule, which by default is a concatenation of the device profile name and application name.




 Suggested Device Group


 (`Panorama`) The device group that IoT Security suggested for a policy rule if it learned about zones and device groups in the logs it received from next-generation firewalls.




 Source Device Profile


 The device profile from which the policy rule recommendation allows traffic.




 Source Zones


 The source zones from which the policy rule recommendation allows traffic. This is unused and always empty.




 Source User


 The source user for the policy rule recommendation. This is unused and always empty.




 Source Device


 The source device for the policy rule recommendation. This is unused and always empty.




 Source Address


 The source address for the policy rule recommendation. This is unused and always empty.




 Destination Device Profile


 The destination device profiles to which the policy rule recommendation allows traffic.




 Destination Device IP


 The IP address of devices to which the policy rule recommendation allows traffic.




 Destination FQDN


 The fully qualified domain names (FQDN) to which the policy rule recommendation allows traffic.




 Destination Zones


 The destination zones to which the policy rule recommendation allows traffic. This is unused and always empty.




 Destination Security Profiles


 The security profiles that the policy rule recommendation allows.




 Destination URL Category


 The URL filtering categories to which the policy rule recommendation allows traffic.




 Destination Geo Location


 Identifies whether the destination is in a zone that is internal to your network (**private**), in an external zone (**internet**), or **both** (private and internet).




 Services


 The services the policy rule recommendation. This is unused and always empty.




 Applications


 The applications that the policy rule recommendation allows.




 Tags


 The tags that identify the policy rule for the policy rule recommendation.
 Note:



| | Do not change the tags of the policy rule; if you change the tags, the firewall cannot rebuild the policy mappings. |
| --- | --- |







 Action


 Identifies the action for this policy rule recommendation, which is always allow.




 New Updates Available


 This column is not used.




 View only this firewall


 (`Firewall`) IoT Security automatically pushes rules in all activated policy sets to Panorama and all next-generation firewalls. As a result, a firewall might have some rules that don’t apply to it. To display only those rules that apply to the local firewall, **View only this firewall**.




 Import Policy Rule


 After Panorama or firewalls retrieve policy rule recommendations from IoT Security, you can select one or more that you want to import into the policy rulebase and then click **Import Policy Rule**. In the Import Policy Rule dialog box that appears, choose the **Location** into which you want to import it, which is a device group in Panorama and a virtual system in a firewall. Select either **Pre-Rulebase** to add the recommended policy rules before rules defined locally on a firewall or **Post-Rulebase** to add them after rules defined locally. Either choose the name of a policy rule in the rulebase to import the selected policy rules after or choose **No Rule Selection** to import the selected rules to the top.
 If you import a policy rule recommendation into the rulebase again, the imported rule replaces the previously imported rule with the same name and overwrites any edits you might have made after importing it into the rulebase the first time. There’s no need to reimport a rule recommendation into the same rulebase, but you might import a rule recommendation more than once if it’s going into the rulebase for different device groups in Panorama. You can tell which rule recommendations have previously been imported if there's an entry in the Imported To column.



 Parent topic
 [Device](device.html#ID0EY2QW)