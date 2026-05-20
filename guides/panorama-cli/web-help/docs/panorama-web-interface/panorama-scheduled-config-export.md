# Panorama > Scheduled Config Export

*Panorama Web Interface : Panorama &gt; Scheduled Config Export*

## Panorama > Scheduled Config Export


To schedule an [export of all the running configurations](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/administer-panorama/manage-panorama-and-firewall-configuration-backups.html) on Panorama and firewalls, **Add** an export task and configure the settings as described in the following table.

 CAUTION:
 If Panorama has a high availability (HA) configuration, you must perform these instructions on each peer to ensure the scheduled exports continue after a failover. Panorama does not synchronize scheduled configuration exports between HA peers.


| Scheduled Configuration Export Settings | Description |
| --- | --- |
| Name | Enter a name to identify the configuration export job (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, hyphens, and underscores. |
| Description | Enter an optional description. |
| Enable | Select to enable the export job. |
| Scheduled export start time (daily) | Specify the time of day to start the export (24 hour clock, format HH:MM). |
| Protocol | Select the protocol to use to export logs from Panorama to a remote host. Secure Copy (**SCP**) is a secure protocol; **FTP** is not. |
| Hostname | Enter the IP address or hostname of the target SCP or FTP server. |
| Port | Enter the port number on the target server. |
| Path | Specify the path to the folder or directory on the target server that will store the exported configuration. For example, if the configuration bundle is stored in a folder called exported_config within a top level folder called Panorama, the syntax for each server type is: • |






| • | FTP server: //Panorama/exported_config |
| --- | --- |



 The following characters: .(period), +, { and }, /, -, _, 0-9, a-z, and A-Z. Spaces are not supported in the file **Path**.




 Enable FTP Passive Mode


 Select to use FTP passive mode.




 Username


 Specify the username required to access the target system.




 Password / Confirm Password


 Specify the password required to access the target system.
 Use a password with maximum length of 15 characters. If the password exceeds 15 characters, the test SCP connection will display an error because the firewall encrypts the password when it tries to connect to the SCP server and the length of the encrypted password can be up to 63 characters only.




 Test SCP server connection


 Select to test communication between Panorama and the SCP host/server.
 A pop-up window is displayed requiring you to enter a clear text **Password**and then to **Confirm Password** in order to test the SCP server connection and enable the secure transfer of data. If Panorama has an HA configuration, perform this step on each HA peer so that each one can successfully connect to the SCP server. If Panorama can successfully connect to the SCP server.



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)