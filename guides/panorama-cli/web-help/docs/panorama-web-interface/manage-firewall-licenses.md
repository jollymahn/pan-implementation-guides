# Manage Firewall Licenses

*Panorama Web Interface : Panorama &gt; Device Deployment : Manage Firewall Licenses*

Manage Firewall Licenses



| • | Panorama > Device Deployment > Licenses |
| --- | --- |




Select **Panorama** > **Device Deployment** > **Licenses** to perform the following tasks:




| • | Update licenses of firewalls that don’t have direct internet access—Click Refresh. |
| --- | --- |






| • | Activate a license on firewalls—To activate a license on firewalls, click **Activate**, select the firewalls and, in the Auth Code column, enter the authorization codes that Palo Alto Networks provided for the firewalls. |
| --- | --- |






| • | Deactivate all the licenses and subscriptions/entitlements installed on VM-Series firewalls—Click **Deactivate VMs**, select the firewalls (the list displays only firewalls running PAN-OS 7.0 or later releases), and click: |
| --- | --- |






| ◦ | **Continue**—Deactivates the licenses and automatically registers the changes with the licensing server. The licenses are credited back to your account and are available for reuse. |
| --- | --- |






| ◦ | **Complete Manually**—Generates a token file. Use this if Panorama does not have direct Internet access. To complete the deactivation process, you must log in to the [Support portal](https://support.paloaltonetworks.com/SupportAccount/MyAccounts), select **Assets**, click **Deactivate License(s)**, upload the token file, and click **Submit**. After you complete the deactivation process. |
| --- | --- |




You can also view the current license status for managed firewalls. For firewalls that have direct internet access, Panorama automatically performs a daily check-in with the licensing server, retrieves license updates and renewals, and pushes them to the firewalls. The check-in is hard-coded to occur between 1 and 2 A.M.; you cannot change this schedule.



| Firewall License Information |
| --- |
| Device |
| Virtual System |
| Threat Prevention |
| URL |
| Support |
| GlobalProtect Gateway |
| GlobalProtect Portal |
| WildFire |
| VM-Series Capacity |


 Parent topic
 [Panorama > Device Deployment](panorama-device-deployment.html#ID0E5BA4)