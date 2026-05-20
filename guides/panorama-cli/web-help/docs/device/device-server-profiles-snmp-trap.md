# Device > Server Profiles > SNMP Trap

*Device : Device &gt; Server Profiles &gt; SNMP Trap*

## Device > Server Profiles > SNMP Trap


Simple Network Management Protocol (SNMP) is a standard protocol for monitoring the devices on your network. To alert you to system events or threats on your network, monitored devices send SNMP traps to SNMP managers (trap servers). Select **Device** > **Server Profiles** > **SNMP Trap** or **Panorama** > **Server Profiles** > **SNMP Trap** to configure the server profile that enables the firewall or Panorama to send traps to the SNMP managers. To enable SNMP GET messages (statistics requests from an SNMP manager), see [Enable SNMP Monitoring](enable-snmp-monitoring.html#ID0EEVAX).


After creating the server profile, you must specify which log types will trigger the firewall to send SNMP traps ([Device > Log Settings](device-log-settings.html#ID0ETQGZ)). For a list of the MIBs that you must load into the SNMP manager so it can interpret traps, see [Supported MIBs](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/snmp-monitoring-and-traps/supported-mibs.html).

 Note:



| | Don’t delete a server profile that any system log setting or logging profile uses. |
| --- | --- |





| SNMP Trap Server Profile Settings | Description |
| --- | --- |
| Name | Enter a name for the SNMP profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | Select the scope in which the profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change its **Location**. |
| Version | Select the SNMP version: **V2c** (default) or **V3**. Your selection controls the remaining fields that the dialog displays. For either version, you can add up to four SNMP managers. Fastpath:  Use SNMPv3, which provides authentication and other features to keep network connections secure. |
| **For SNMP V2c** | |
| Name | Specify a name for the SNMP manager. The name can have up to 31 characters that are alphanumeric, periods, underscores, or hyphens. |
| SNMP Manager | Specify the FQDN or IP address of the SNMP manager. |
| Community | Enter the community string, which identifies an SNMP community of SNMP managers and monitored devices and also serves as a password to authenticate the community members to each other during trap forwarding. The string can have up to 127 characters, accepts all characters, and is case-sensitive. Fastpath:  Don’t use default community strings (don’t set the community string to **public** or **private**). Use unique community strings, which avoids conflicts if you use multiple SNMP services. Because SNMP messages contain community strings in clear text, consider the security requirements of your network when defining community membership (administrator access). |
| **For SNMP V3** | |
| Name | Specify a name for the SNMP manager. The name can have up to 31 characters that are alphanumeric, periods, underscores, or hyphens. |
| SNMP Manager | Specify the FQDN or IP address of the SNMP manager. |
| User | Specify a username to identify the SNMP user account (up to 31 characters). The username you configure on the firewall must match the username configured on the SNMP manager. |
| EngineID | Specify the engine ID of the firewall. When an SNMP manager and the firewall authenticate to each other, trap messages use this value to uniquely identify the firewall. If you leave the field blank, the messages use the firewall serial number as the **EngineID**. If you enter a value, it must be in hexadecimal format, prefixed with 0x, and with another 10-128 characters to represent any number of 5-64 bytes (2 characters per byte). For firewalls in a high availability (HA) configuration, leave the field blank so that the SNMP manager can identify which HA peer sent the traps; otherwise, the value is synchronized and both peers will use the same **EngineID**. |
| Auth Password | Specify the authentication password of the SNMP user. The firewall uses the password to authenticate to the SNMP manager. The password must be 8–256 characters and all characters are allowed. |
| Priv Password | Specify the privacy password of the SNMP user. The password must be 8–256 characters and all characters are allowed. |
| Authentication Protocol | Select the Secured Hash Algorithm (SHA) for the SNMP manager password. You can select **SHA-1**, **SHA-224**, **SHA-256**, **SHA-384**, or **SHA-512**. |
| Privacy Protocol | Select the Advanced Encryption Standard (AES) for SNMP traps and responses to statistics requests. You can select **AES-128**, **AES-192**, or **AES-256**. |


 Parent topic
 [Device](device.html#ID0EY2QW)