# Ignore User List

*User Identification : Device &gt; User Identification &gt; User Mapping : Palo Alto Networks User-ID Agent Setup : Ignore User List*

Ignore User List



| • | **Device** > **User Identification** > **User Mapping** > **Palo Alto Networks User-ID Agent Setup** > **Ignore User List** |
| --- | --- |




The ignore user list defines which user accounts don’t require IP address-to-username mapping (for example, kiosk accounts). To configure the list, click **Add** and enter a username. You can use an asterisk as a wildcard character to match multiple usernames but only as the last character in the entry. For example, **corpdomain\it-admin*** matches all administrators in the **corpdomain** domain whose usernames start with the string **it‑admin**. You can add up to 5,000 entries to exclude from user mapping.

 Note:**Define the ignore user list on the firewall that is the User-ID agent, not the client. If you define the ignore user list on the client firewall, the users in the list are still mapped during redistribution.
 Parent topic
 [Palo Alto Networks User-ID Agent Setup](user-id-agent-setup.html#ID0EN62Z)**