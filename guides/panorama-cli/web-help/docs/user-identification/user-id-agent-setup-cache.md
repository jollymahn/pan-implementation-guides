# Cache

*User Identification : Device &gt; User Identification &gt; User Mapping : Palo Alto Networks User-ID Agent Setup : Cache*

Cache



| • | **Device** > **User Identification** > **User Mapping** > **Palo Alto Networks User-ID Agent Setup** > **Cache** |
| --- | --- |




To ensure that the firewall has the most current user mapping information as users roam and obtain new IP addresses, configure timeouts for clearing user mappings from the firewall cache. This timeout applies to user mappings learned through any method except Authentication Portal. For mappings learned through Authentication Portal, set the timeout in the Authentication Portal Settings ([Device > User Identification > Authentication Portal Settings](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-web-interface-help/user-identification/device-user-identification-captive-portal-settings), **Timer** and **Idle Timer** fields).


To match usernames collected from User-ID sources even if a domain is not included, configure the firewall to allow matching usernames without domains. You should only use this option if the usernames in your organization are not duplicated across domains.



| Cache Settings | Description |
| --- | --- |
| Enable User Identification Timeout | Select this option to enable a timeout value for user mapping entries. When the timeout value is reached for an entry, the firewall clears it and collects a new mapping. This ensures that the firewall has the most current information as users roam and obtain new IP addresses. Fastpath:  Enable the timeout to ensure the firewall has the most current user-to-IP-address mapping information. |
| User Identification Timeout (min) | Set the timeout value in minutes for user mapping entries (range is 1 to 3,600; default is 45). Fastpath:  Set the timeout value to the half-life of the DHCP lease or to the Kerberos ticket lifetime. Note:  |







 Allow matching usernames without domains


 Select this option to allow the firewall to match users if the domain is not provided by the User-ID source. To prevent users from being misidentified, only select this option if your usernames are not duplicated across domains.
 Note:



| | Before you enable this option, verify that the firewall has fetched the group mappings from the LDAP server. |
| --- | --- |






 Parent topic
 [Palo Alto Networks User-ID Agent Setup](user-id-agent-setup.html#ID0EN62Z)