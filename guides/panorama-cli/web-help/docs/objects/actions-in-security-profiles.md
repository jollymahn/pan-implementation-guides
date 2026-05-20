# Actions in Security Profiles

*Objects : Objects &gt; Security Profiles : Actions in Security Profiles*

Actions in Security Profiles

The action specifies how the firewall responds to a threat event. Every threat or virus signature that is defined by Palo Alto Networks includes a default action, which is typically either set to **Alert,** which informs you using the option you have enabled for notification, or to **Reset Both**, which resets both sides of the connection. However, you can define or override the action on the firewall. The following actions are applicable when defining Antivirus profiles, Anti-Spyware profiles, Vulnerability Protection profiles, custom spyware objects, custom vulnerability objects, or DoS Protection profiles.



| Action | Description | Antivirus Profile | Anti-Spyware profile | Vulnerability Protection Profile | Custom Object—Spyware and Vulnerability | DoS Protection Profile |
| --- | --- | --- | --- | --- | --- | --- |
| **Default** | Takes the default action that is specified internally for each threat signature. For antivirus profiles, it takes the default action for the virus signature. | | | | — | Random Early Drop |
| **Allow** | Permits the application traffic. Note:  | The **Allow** action does not generate logs related to the signatures or profiles. | | | | |

















 —




 **Alert**


 Generates an alert for each application traffic flow. The alert is saved in the threat log.















 Generates an alert when attack volume (cps) reaches the Alarm threshold set in the profile.




 **Drop**


 Drops the application traffic.














 —




 **Reset Client**


 For TCP, resets the client-side connection.
 For UDP, the connection is dropped














 —




 **Reset Server**


 For TCP, resets the server-side connection.
 For UDP, the connection is dropped














 —




 **Reset Both**


 For TCP, resets the connection on both client and server ends.
 For UDP, the connection is dropped














 —




 **Block IP**


 Blocks traffic from either a source or a source-destination pair; Configurable for a specified period of time.


 —
















 **Sinkhole**


 This action directs DNS queries for malicious domains to a sinkhole IP address.
 The action is available for Palo Alto Networks DNS- signatures and for custom domains included in [Objects > External Dynamic Lists](objects-external-dynamic-lists.html#ID0EO4AR).


 —


 —


 —


 —


 —




 **Random Early Drop**


 Causes the firewall to randomly drop packets when connections per second reach the Activate Rate threshold in a DoS Protection profile applied to a DoS Protection rule.


 —


 —


 —


 —







 **SYN Cookies**


 Causes the firewall to generate SYN cookies to authenticate a SYN from a client when connections per second reach the Activate Rate Threshold in a DoS Protection profile applied to a DoS Protection rule.


 —


 —


 —


 —






 Note:



| | You cannot delete a profile that is used in a policy rule; you must first remove the profile from the policy rule. |
| --- | --- |



 Parent topic
 [Objects > Security Profiles](objects-security-profiles.html#ID0EBHJR)