# Manage Panorama Software Updates

*Panorama Web Interface : Panorama &gt; Software : Manage Panorama Software Updates*

Manage Panorama Software Updates

Select **Panorama** > **Software** to perform the tasks described in the following table.

 Note:



| | By default, the Panorama management server saves up to two software updates. To make space for newer updates, the server automatically deletes the oldest update. You can [change the number of software images that Panorama saves](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/troubleshooting/troubleshoot-panorama-system-issues/manage-panorama-storage-for-software-and-content-updates.html) and manually delete images to free up space. |
| --- | --- |



 Refer to [Install Content and Software Updates for Panorama](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-upgrade/upgrade-panorama/install-content-and-software-updates-for-panorama.html) for important information about version compatibility.


| Task | Description |
| --- | --- |
| Check Now | If Panorama has access to the Internet, **Check Now** to display the latest update information (see [Display Panorama Software Update Information](display-panorama-software-update-information.html#ID0ETV63)). If Panorama does not have access to the external network, use a browser to visit the [Software Update](https://support.paloaltonetworks.com/Updates/SoftwareUpdates) site for update information. |
| Upload | To upload a software image when Panorama does not have access to the Internet, use a browser to visit the[Software Update ](https://support.paloaltonetworks.com/Updates/SoftwareUpdates)site, locate the desired release and download the software image to a computer that Panorama can access, select **Panorama** > **Software**, click **Upload**, **Browse** to and select the software image, and click **OK**. When the upload is complete, the Downloaded column displays a check mark and the Action column displays **Install**. |
| Preferred Releases | Select the **Preferred Releases** checkbox to view the list of preferred releases. Preferred releases offer the latest and advanced features. Ensure that you use preferred releases for stability and optimal performance. By default, both preferred and base releases are selected. If Panorama does not have access to the external network, use a browser to visit the [Software Update ](https://support.paloaltonetworks.com/Updates/SoftwareUpdates) site to view the preferred releases. |
| Base Releases | Select the **Base Releases** checkbox to view the list of base releases. A base release is the earliest version of a specific release. By default, both preferred and base releases are selected. If Panorama does not have access to the external network, use a browser to visit the [Software Update ](https://support.paloaltonetworks.com/Updates/SoftwareUpdates) site to view the base releases. |
| Validate | If Panorama has access to the Internet, **Validate** (Action column) the desired release. Select the devices you want to upgrade (Deploy column), select **Panorama** as the upgrade source, and click **Download**. When the download is complete, the Downloaded column displays a check mark. Note:**  The **SCP Server** and the Update Server** are not available as download sources in PAN-OS 10.2.0. |
| Install | **Install** (Action column) the software image. When the installation finishes, Panorama logs you out while it reboots. Note:  |







 Release Notes


 If Panorama has access to the Internet, you can access the **Release Notes** for the desired software release and review the release changes, fixes, known issues, compatibility issues, and changes to default behavior.
 If Panorama does not have access to the Internet, use a browser to visit the [Software Update](https://support.paloaltonetworks.com/Updates/SoftwareUpdates) site and download the appropriate release.







 Deletes a software image when no longer needed or when you want to free up space for more images.



 Parent topic
 [Panorama > Software](panorama-software.html#ID0E2153)