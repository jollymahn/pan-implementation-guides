# Device > Software

*Device : Device &gt; Software*

## Device > Software


Select **Device** > **Software** to view the available software releases, to download or upload a release, to install a release (a support license is required), to delete a software image from the firewall, or to view release notes.


Before you upgrade or downgrading your software version:




| • | Review the current [Release Notes](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-release-notes.html) to view descriptions of new features and changes to default behaviors in a release and to view the migration path to upgrade software. |
| --- | --- |






| • | Review the upgrade and downgrade considerations and upgrade instructions in the [PAN-OS® 11.1 New Features Guide](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-upgrade/upgrade-pan-os/upgradedowngrade-considerations.html). |
| --- | --- |






| • | Ensure that the date and time settings on the firewall are current. PAN-OS software is digitally signed and the firewall checks the signature before installing a new version. If the date and time settings on the firewall are not current and the firewall perceives that the software signature is (erroneously) in the future, it will display the following message: |
| --- | --- |



 Decrypt failed: GnuPG edit non-zero, with code 171072 Failed to load into PAN software manager.

The following table provides help for using the **Software** page.



| Software Options Fields | Description |
| --- | --- |
| Version | Lists the software versions that are currently available on the Palo Alto Networks Update Server. To check if a new software release is available from Palo Alto Networks, click **Check Now**. The firewall uses the service route to connect to the Update Server and checks for new versions and, if there are updates available, and displays them at the top of the list. |
| Size | Indicates the size of the software image. |
| Release Date | Indicates the date and time Palo Alto Networks made the release available. |
| Available | Indicates that the corresponding version of the software image is uploaded or downloaded to the firewall. |
| Currently Installed | Indicates whether the corresponding version of the software image is activated and is currently running on the firewall. |
| Action | Indicates the current action you can take for the corresponding software image as follows: • |






| • | **Install**—The corresponding software version has been downloaded or uploaded to the firewall; click to **Install** the software. A reboot is required to complete the upgrade process. |
| --- | --- |






| • | **Reinstall**—The corresponding software version was installed previously; click to **Reinstall** the same version. |
| --- | --- |







 Release Notes


 Provides a link to the release notes for the corresponding software update. This link is only available for updates that you download from the Palo Alto Networks Update Server: it is not available for uploaded updates.







 Removes the previously downloaded or uploaded software image from the firewall. You would only want to delete the base image for older releases that will not need upgrading. For example, if you are running 10.1, you can remove the base image for 10.0 unless you think you might need to downgrade.




 Check Now


 Checks whether a new software update is available from Palo Alto Networks.
 Tip:
 Having difficulty checking for software updates? Refer to [this article](https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClkuCAC) for solutions to some of the common connectivity issues.




 Upload


 Imports a software update image from a computer that the firewall can access. Typically, you perform this action if the firewall doesn’t have Internet access, which is required when downloading updates from the Palo Alto Networks Update Server. For uploads, use an Internet-connected computer to visit the Palo Alto Networks website, download the software image from the Support site (Software Updates), download the update to your computer, select **Device** > **Software** on the firewall and **Upload** the software image. In a high availability (HA) configuration, you can select **Sync To Peer** to push the imported software image to the HA peer. After the upload, the **Software** page displays the same information (for example, version and size) and **Install**/**Reinstall** options for uploaded and downloaded software. **Release Notes** option is not active for uploaded software.



 Parent topic
 [Device](device.html#ID0EY2QW)