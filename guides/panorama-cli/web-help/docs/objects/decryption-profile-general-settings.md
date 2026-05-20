# Decryption Profile General Settings

*Objects : Objects &gt; Decryption Profile : Decryption Profile General Settings*

Decryption Profile General Settings

The following table describes the general settings for decryption profiles.



| Decryption Profile — General Settings | Description |
| --- | --- |
| Name | Enter a profile name (up to **31** characters). This name appears in the list of decryption profiles when defining decryption policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Shared (`Panorama only`) | Select this option if you want the profile to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the profile will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this Decryption profile in device groups that inherit the profile. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the profile.




 Decryption Mirroring Interface
 (Supported on all models except the VM-Series firewall on AWS, Azure, NSX edition, and Citrix SDX.)


 Select an **Interface** to use for decryption port mirroring.
 Note:



| | Before you can enable decryption port mirroring, you must obtain a Decryption Port Mirror license, install the license, and reboot the firewall. |
| --- | --- |







 Forwarded Only
 (Supported on all models except the VM-Series firewall on AWS, Azure, NSX edition, and Citrix SDX.)


 Select **Forwarded Only** if you want to mirror decrypted traffic only after Security policy enforcement. With this option, only traffic that is forwarded through the firewall is mirrored. This option is useful if you are forwarding the decrypted traffic to other threat detection devices, such as a DLP device or another intrusion prevention system (IPS). If you clear this selection (the default setting), the firewall will mirror all decrypted traffic to the interface before security policies lookup, which allows you to replay events and analyze traffic that generates a threat or triggers a drop action.



 Parent topic
 [Objects > Decryption Profile](objects-decryption-profile.html#ID0EALCS)