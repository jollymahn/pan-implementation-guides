# Threat Details

*Web Interface Basics : Threat Details*

## Threat Details




| • | Monitor > Logs > Threat |
| --- | --- |






| • | ACC > Threat Activity |
| --- | --- |






| • | Objects > Security Profiles > Anti-Spyware/Vulnerability Protection |
| --- | --- |




Use the Threat Details dialog to learn more about the threat signatures with which the firewall is equipped and the events that trigger those signatures. Threat details are provided for:




| • | Threat logs that record the threats that the firewall detects (**Monitor** > **Logs** > **Threat**) |
| --- | --- |






| • | The top threats found in your network (**ACC** > **Threat Activity**) |
| --- | --- |






| • | Threat signatures that you want to modify or exclude from enforcement (**Objects** > **Security Profiles** > **Anti-Spyware/Vulnerability Protection**) |
| --- | --- |




When you find a threat signature you want to learn more about, hover over the **Threat Name** or the threat **ID** and click **Exception** to review the threat details. The threat details allow you to easily check whether a threat signature is configured as an exception to your security policy and to find the latest Threat Vault information about a specific threat. The Palo Alto Networks Threat Vault database is integrated with the firewall, allowing you to view expanded details about threat signatures in the firewall context or launch a Threat Vault search in a new browser window for a logged threat.


Depending on the type of threat you’re viewing, the details include all or some of the threat details described in the following table.



| Threat Details | Description |
| --- | --- |
| Name | Threat signature name. |
| ID | Unique threat signature ID. Select **View in Threat Vault** to open a Threat Vault search in a new browser window and look up the latest information that the Palo Alto Networks threat database has for this signature. The Threat Vault entry for the threat signature might include additional details, including the first and last content releases to include updates to the signature and the minimum PAN-OS version required to support the signature. |
| Description | Information about the threat that triggers the signature. |
| Severity | The threat severity level: informational, low, medium, high, or critical. |
| CVE | Publicly known security vulnerabilities associated with the threat. The Common Vulnerabilities and Exposures (CVE) identifier is the most useful identifier for finding information about unique vulnerabilities as vendor-specific IDs commonly encompass multiple vulnerabilities. |
| Bugtraq ID | The Bugtraq ID associated with the threat. |
| Vendor ID | The vendor-specific identifier for a vulnerability. For example, MS16-148 is the vendor ID for one or more Microsoft vulnerabilities and APBSB16-39 is the vendor ID for one or more Adobe vulnerabilities. |
| Reference | Research sources you can use to learn more about the threat. |
| Exempt Profiles | Security profiles that define a different enforcement action for the threat signature than the default signature action. The threat exception is only active when exempt profiles are attached to a security policy rule (check if the exception is [Used in current security rule](threat-details.html#ID0EKIHK)). |
| Used in current security rule | Active threat exceptions—A check mark in this column indicates that the firewall is actively enforcing the threat exception (the [Exempt Profiles](threat-details.html#ID0EDHHK) that define the threat exception are attached to a security policy rule). If this column is clear, the firewall is enforcing the threat based only on the recommended default signature action. |
| Exempt IP Addresses | Exempt IP addresses—You can add an IP address on which to filter the threat exception or view existing **Exempt IP Addresses**. This option enforces a threat exception only when the associated session has either a source or destination IP address that matches the exempt IP address. For all other sessions, the threat is enforced based on the default signature action. |


 Note:



| | If you’re having trouble viewing threat details, check for the following conditions: |
| --- | --- |






| • | The firewall Threat Prevention license is active (**Device** > **Licenses**). |
| --- | --- |






| • | The latest Antivirus and Threats and Applications content updates are installed. |
| --- | --- |






| • | Threat Vault access is enabled (select **Device** > **Setup** > **Management** and edit the **Logging and Reporting** setting to **Enable Threat Vault Access**). |
| --- | --- |






| • | The default (or custom) [Antivirus, Anti-Spyware, and Vulnerability Protection security profiles](https://docs.paloaltonetworks.com/advanced-threat-prevention/administration/configure-threat-prevention/set-up-antivirus-anti-spyware-and-vulnerability-protection.html) are applied to your security policy. |
| --- | --- |



 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)