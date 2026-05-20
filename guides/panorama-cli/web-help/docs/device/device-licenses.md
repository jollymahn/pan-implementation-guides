# Device > Licenses

*Device : Device &gt; Licenses*

## Device > Licenses


Select **Device** > **Licenses** to activate licenses on all firewall models. When you purchase a subscription from Palo Alto Networks, you receive an authorization code to activate one or more license keys.


On the VM-Series firewall, this page also allows you to deactivate a virtual machine (VM).


The following actions are available on the Licenses page:




| • | Retrieve license keys from license server: Select to enable purchased subscriptions that require an authorization code and have been activated on the support portal. |
| --- | --- |






| • | Activate feature using authorization code: Select to enable purchased subscriptions that require an authorization code and have not been previously activated on the support portal. Then enter your authorization code, and click **OK**. |
| --- | --- |






| • | Manually upload license key: If the firewall does not have connectivity to the license server and you want to upload license keys manually, download the license key file from [https://support.paloaltonetworks.com](https://support.paloaltonetworks.com), and save it locally. Click Manually upload license key, click Browse, select the file, and then click OK. |
| --- | --- |



 Note:



| | To enable licenses for URL filtering, you must install the license, download the database, and click **Activate**. If you are using PAN-DB for URL Filtering, you will need to **Download** the initial seed database first and then **Activate**. |
| --- | --- |



 You can also run the CLI command request url-filtering download paloaltonetworks region < regionname>.



| • | **Deactivate VM**: This option is available on the VM-Series firewall with the Bring Your Own License model that supports perpetual and term-based licenses; the on-demand license model does not support this functionality. Click **Deactivate VM** when you no longer need an instance of the VM-Series firewall. It allows you to free up all active licenses—subscription licenses, VM-Capacity licenses, and support entitlements— using this option. The licenses are credited back to your account and you can then apply the licenses on a new instance of a VM-Series firewall, when you need it. When the license is deactivated, the VM-Series firewall functionality is disabled and the firewall is in an unlicensed state. However, the configuration remains intact. |
| --- | --- |






| ◦ | Click **Continue Manually** if the VM-Series firewall does not have direct internet access. The firewall generates a token file. Click **Export license token** to save the token file to your local computer and then reboot the firewall. Log in to the [Palo Alto Networks Support portal](https://support.paloaltonetworks.com), select **Assets** > **Devices**, and **Deactivate VM** to use this token file and complete the deactivation process. |
| --- | --- |






| ◦ | Click **Continue** to deactivate the licenses on the VM-Series firewall. Click **Reboot Now** to complete the license deactivation process. |
| --- | --- |






| ◦ | Click **Cancel** if you want to cancel and close the Deactivate VM window. |
| --- | --- |






| • | **Upgrade VM Capacity**: This option allows you to upgrade the capacity of your currently licensed VM-Series firewall. Upon upgrading the capacity, the VM-Series firewall retains all configuration and subscriptions it had prior to the upgrade. |
| --- | --- |






| ◦ | If your firewall has connectivity to the license server—Select **Authorization Code**, enter your authorization code in the Authorization Code field, and click **Continue** to initiate the capacity upgrade. |
| --- | --- |






| ◦ | If your firewall does not have connectivity to the license server—Select **License Key**, click **Complete Manually** to generate a token file, and save the token file to your local computer. Then log in to the [Palo Alto Networks Support portal](https://support.paloaltonetworks.com), select **Assets** > **Devices**, and **Deactivate License(s)** to use the token file. Download the license key for your VM-Series firewall to your local computer, add the license key to the firewall, and click **Continue** to complete the capacity upgrade. |
| --- | --- |






| ◦ | If your firewall has connectivity to the license server but you do not have an Authorization Code—Select **Fetch from license server**, upgrade the firewall’s capacity license on the license server before you attempt to upgrade the capacity, and then after you verify that the license is upgraded on the license server, click **Continue** to initiate the capacity upgrade. |
| --- | --- |



 Parent topic
 [Device](device.html#ID0EY2QW)