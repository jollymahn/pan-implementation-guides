# Objects > Security Profiles > File Blocking

*Objects : Objects &gt; Security Profiles &gt; File Blocking*

## Objects > Security Profiles > File Blocking


You can attach a File Blocking profile to a Security policy rule ([Policies > Security](policies-security.html#ID0ESNMO)) to block users from uploading or downloading specified file types or to generate an alert when a user attempts to upload or download specified file types.

 Fastpath:
 For the best security, apply the predefined **strict** profile. If you need to support critical applications that use a file type which the **strict** profile blocks, clone the **strict** profile and make only the file type exceptions you need. Apply the cloned profile to a Security Policy rule that restricts the exception to only the sources, destinations, and users that need to use the file type. You can also use **Direction** to restrict the exception to uploading or downloading.
 If you don’t block all Windows PE files, send all unknown files to WildFire for analysis. For user accounts, set the Action to **continue** to help prevent drive-by downloads where malicious web sites, emails, or pop-ups cause users to inadvertently download malicious files. Educate users that a Continue prompt for a file transfer they didn’t knowingly initiate may mean they are subject to a malicious download.

The following tables describe the [file blocking profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-profiles/set-up-file-blocking.html) settings.



| File Blocking Profile Settings | Description |
| --- | --- |
| Name | Enter a profile name (up to 31 characters). This name appears in the list of file blocking profiles when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Description | Enter a description for the profile (up to 255 characters). |
| Shared (`Panorama only`) | Select this option if you want the profile to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the profile will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this File Blocking profile in device groups that inherit the profile. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the profile.




 Rules


 Define one or more rules to specify the action taken (if any) for the selected file types. To add a rule, specify the following and click **Add**:



| • | **Name**—Enter a rule name (up to 31 characters). |
| --- | --- |






| • | **Applications**—Select the applications the rule applies to or select **any**. |
| --- | --- |






| • | **File Types**—Click in the file types field and then click **Add** to view a list of supported file types. Click a file type to add it to the profile and continue to add additional file types as needed. If you select **Any**, the defined action is taken on all supported file types. |
| --- | --- |






| • | **Direction**—Select the direction of the file transfer (**Upload**, **Download**, or **Both**). |
| --- | --- |






| • | **Action**—Select the action taken when the selected file types are detected: |
| --- | --- |






| ◦ | **alert**—An entry is added to the threat log. |
| --- | --- |






| ◦ | **continue**—A message to the user indicates that a download has been requested and asks the user to confirm whether to continue. The purpose is to warn the user of a possible unknown download (also known as a drive-by-download) and to give the user the option of continuing or stopping the download. |
| --- | --- |



 When you create a file blocking profile with the action **continue**, you can only choose the application **web-browsing**. If you choose any other application, traffic that matches the Security policy rule will not flow through the firewall due to the fact that the users will not be prompted with a continue page.



| ◦ | **block**—The file is blocked. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)