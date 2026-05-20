# Device > Master Key and Diagnostics

*Device : Device &gt; Master Key and Diagnostics*

## Device > Master Key and Diagnostics




| • | **Device** > **Master Key and Diagnostics** |
| --- | --- |






| • | **Panorama** > **Master Key and Diagnostics** |
| --- | --- |




Edit the master key that encrypts all passwords and private keys on the firewall or Panorama (such as the RSA key for authenticating administrators who access the CLI). Encrypting passwords and keys improves security by ensuring their plaintext values are not exposed anywhere on the firewall or Panorama.

 Note:



| | The only way to restore the default master key is to perform a [factory reset](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/reset-the-firewall-to-factory-default-settings.html). |
| --- | --- |




Palo Alto Networks recommends you configure a new master key instead of using the default key, store the key in a safe location, and periodically change it. For extra privacy, you can use a hardware security module to encrypt the master key (see [Device > Setup > HSM](device-setup-hsm.html#ID0EWVBX)). Configuring a unique master key on each firewall or Panorama management server ensures that an attacker who learns the master key for one appliance cannot access the passwords and private keys on any of your other appliances. However, you must use the same master key across multiple appliances in the following cases:




| • | **High availability (HA) configurations**—If you deploy firewalls or Panorama in an HA configuration, use the same master key on both firewalls or Panorama management servers in the pair. Otherwise, HA synchronization does not work. |
| --- | --- |






| • | **Panorama managing WildFire appliances and Log Collectors**—You must configure the same master key on Panorama, WildFire appliances, and managed collectors. Otherwise, push operations from Panorama will fail. |
| --- | --- |




To configure a master key, edit the Master Key settings and use the following table to determine the appropriate values:



| Master Key and Diagnostics Settings | Description |
| --- | --- |
| Master Key | Enable to configure a unique master key. Disable (clear) to use the default master key. |
| Current Master Key | Specify the key that is currently used to encrypt all of the private keys and passwords on the firewall. |
| New Master Key Confirm Master Key | To change the master key, enter a 16-character string and confirm the new key. |
| Life Time | Specify the number of **Days** and **Hours** after which the master key expires. Range is 1 to 438,000 days (50 years). You must configure a new master key before the current key expires. If the master key expires, the firewall or Panorama automatically reboots in Maintenance mode. You must then perform a [factory reset](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/reset-the-firewall-to-factory-default-settings.html). Fastpath:  Set the **Lifetime** to two years or less, depending on how many encryptions the device performs. The more encryptions a device performs, the short the **Lifetime** you should set. The critical consideration is to not run out of unique encryptions before you change the master key. Each master key can provide up to 2^^32 unique encryptions and then encryptions repeat, which is a security risk. Set a **Time for Reminder** for the master key and when the reminder notification occurs, change the master key. |
| Time for Reminder | Enter the number of **Days** and **Hours** before the master key expires when the firewall generates an expiration alarm. The firewall automatically opens the System Alarms dialog to display the alarm. Fastpath:  Set the reminder so that it gives you plenty of time to configure a new master key before it expires in a scheduled maintenance window. When the **Time for Reminder** expires and the firewall or Panorama sends a notification log, change the master key, don’t wait for the **Lifetime** to expire. For grouped devices, track every device (e.g., firewalls that Panorama manages and firewall HA pairs) and when the reminder value expires for the any device in the group, change the master key. To ensure the expiration alarm displays, select **Device** > **Log Settings**, edit the Alarm Settings, and **Enable Alarms**. |
| Stored on HSM | Enable this option only if the master key is encrypted on a Hardware Security Module (HSM). You cannot use HSM on a dynamic interface such as a DHCP client or PPPoE. The HSM configuration is not synchronized between peer firewalls in HA mode. Therefore, each peer in an HA pair can connect to a different HSM source. If you are using Panorama and need to keep both peer configurations in sync, use Panorama templates to configure the HSM source on the managed firewalls. The PA-220 does not support HSM. |
| Auto Renew Master Key | Enable to automatically renew the master key for a specified number of days and hours. Disable (clear) to allow the master key to expire after the configured key life time. **Auto Renew with Same Master Key** by specifying the number of **Days** and **Hours** by which to extend the master key encryption (range is 1 hour to 730 days). Fastpath:  If you enable **Auto Renew Master Key**, set it so that the total time (lifetime plus the auto renew time) does not cause the device to run out of unique encryptions. For example, if you believe the device will consume the master key’s number of unique encryptions in two and a half years, you could set the **Lifetime** for two years, set the **Time for Reminder** to 60 days, and set the **Auto Renew Master Key** for 60-90 days to provide the extra time to configure a new master key before the **Lifetime** expires. However, the best practice is still to change the master key before the lifetime expires to ensure that no device repeats encryptions. |
| Common Criteria | In Common Criteria mode, additional options are available to run a cryptographic algorithm self-test and software integrity self-test. A scheduler is also included to specify the times at which the two self-tests will run. |


 Parent topic
 [Device](device.html#ID0EY2QW)