# Device > Certificate Management > SSH Service Profile

*Device : Device &gt; Certificate Management &gt; SSH Service Profile*

## Device > Certificate Management > SSH Service Profile


SSH service profiles enable you to restrict the cipher, key exchange, and message authentication code algorithms that encrypt and protect the integrity of your data. Specifically, these profiles strengthen data protection during SSH sessions between your command line interface (CLI) and the management connections and high availability (HA) appliances on your network. You can also generate a new SSH host key and specify the thresholds (data volume, time interval, and packet count) that initiate an SSH rekey.


To [configure an SSH service profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/certificate-management/configure-an-ssh-service-profile), **Add** an HA or Management - Server profile, complete the fields in the following table as appropriate, and then click **OK** and **Commit** your changes.


The process for applying a profile differs between the profile types.




| • | To apply an HA profile, select [Device > High Availability > General](ha-general-settings.html#ID0ENSYX). Under SSH HA Profile Setting, select an existing profile. Click **OK** and **Commit** your changes. |
| --- | --- |






| • | To apply a Management - Server profile, select [Device > Setup > Management](device-setup-management.html#ID0E1DTW). Under SSH Management Profiles Settings, select an existing profile. Click **OK** and **Commit** your changes. |
| --- | --- |



 Note:



| | After applying a profile, you must perform an SSH service restart from your CLI to activate the profile. |
| --- | --- |





| SSH Service Profile Settings | Description |
| --- | --- |
| Name | Enter a name for the profile (up to 31 characters). The name is case-sensitive, must be unique, and can contain only letters, numbers, spaces, hyphens, and underscores. |
| Ciphers | Select the cipher algorithms your server will support for SSH session encryption. |
| KEX | Select the key exchange algorithms your server will support during an SSH session. |
| MAC | Select the message authentication code algorithms your server will support during an SSH session. |
| Hostkey | Select a host key type and key length to generate a new key pair of the specified host key algorithm and key length. Note:  |







 Data


 Set the maximum volume of data (in megabytes) transmitted before an SSH rekey (range is 10 to 4000; default is the value of the cipher you selected).




 Interval


 Set the maximum time interval (in seconds) before an SSH rekey (range is 10 to 3600; default is no time-based rekeying).




 Packets


 Set the maximum number of packets (2n) before an SSH rekey.
 Note:



| | If you do not configure this parameter, the session will rekey after 228 packets. To ensure a more frequent rekey, specify a value in the range 12 to 27. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)