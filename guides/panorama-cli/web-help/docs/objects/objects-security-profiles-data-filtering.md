# Objects > Security Profiles > Data Filtering

*Objects : Objects &gt; Security Profiles &gt; Data Filtering*

## Objects > Security Profiles > Data Filtering


Data filtering enables the firewall to detect sensitive information—such as credit card or social security numbers or internal corporate documents—and prevent this data from leaving a secure network. Before you enable data filtering, select [Objects > Custom Objects > Data Patterns](objects-custom-objects-data-patterns.html#ID0EGCDR) to define the type of data you want to filter (such as social security numbers or document titles that contain the word “confidential”). You can add several data pattern objects to a single Data Filtering profile and, when attached to a Security policy rule, the firewall scans allowed traffic for each data pattern and blocks matching traffic based on the data filtering profile settings.



| Data Filtering Profile Settings | Description |
| --- | --- |
| Name | Enter a profile name (up to 31 characters). This name appears in the list of log forwarding profiles when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Description | Enter a description for the profile (up to 255 characters). |
| Shared (`Panorama only`) | Select this option if you want the profile to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the profile will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this Data Filtering profile in device groups that inherit the profile. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the profile.




 Data Capture


 Select this option to automatically collect the data that is blocked by the filter.
 Note:



| | Specify a password for Manage Data Protection on the Settings page to view your captured data. Refer to [Device > Setup > Management](device-setup-management.html#ID0E1DTW). |
| --- | --- |







 Data Pattern


 Add an existing data pattern to use for filtering or select **New** to configure a new data pattern object ([Objects > Custom Objects > Data Patterns](objects-custom-objects-data-patterns.html#ID0EGCDR)).




 Applications


 Specify the applications to include in the filtering rule:



| • | Choose **any** to apply the filter to all of the listed applications. This selection does not block all possible applications, just the listed ones. |
| --- | --- |






| • | Click **Add** to specify individual applications. |
| --- | --- |







 File Types


 Specify the file types to include in the filtering rule:



| • | Choose **any** to apply the filter to all of the listed file types. This selection does not block all possible file types, just the listed ones. |
| --- | --- |






| • | Click **Add** to specify individual file types. |
| --- | --- |







 Direction


 Specify whether to apply the filter in the upload direction, download direction, or both.




 Alert Threshold


 Specify the number of times the data pattern must be detected in a file to trigger an alert.




 Block Threshold


 Block files that contain at least this many instances of the data pattern.




 Log Severity


 Define the log severity recorded for events that match this data filtering profile rule.



 Parent topic
 [Objects](objects.html#ID0EL3RQ)