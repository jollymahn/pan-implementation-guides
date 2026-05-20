# Building Blocks of Zone Protection Profiles

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Building Blocks of Zone Protection Profiles*

Building Blocks of Zone Protection Profiles

To create a Zone Protection profile, **Add** a profile and name it.



| Zone Protection Profile Settings | Configured In | Description |
| --- | --- | --- |
| Name | **Network** > **Network Profiles** > **Zone Protection** | Enter a profile name (up to 31 characters). This name appears in the list of Zone Protection profiles when configuring zones. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, and underscores. |
| Description | Enter an optional description for the Zone Protection profile. | |



Continue to create the Zone Protection profile by configuring any combination of settings based on what types of protection your zone needs:




| • | [Flood Protection](flood-protection.html#ID0EDHEW) |
| --- | --- |






| • | [Reconnaissance Protection](reconnaissance-protection.html#ID0ENTGW) |
| --- | --- |






| • | [Packet Based Attack Protection](packet-based-attack-protection.html#ID0EPNHW) |
| --- | --- |






| • | [Protocol Protection](protocol-protection.html#ID0ECZKW) |
| --- | --- |






| • | [Ethernet SGT Protection](ethernet-sgt-protection.html#ID0E2LLW) |
| --- | --- |



 Note:



| | If you have a multi virtual system environment, and have enabled the following: |
| --- | --- |






| • | External zones to enable inter virtual system communication |
| --- | --- |






| • | Shared gateways to allow virtual systems to share a common interface and a single IP address for external communications |
| --- | --- |



 the following Zone and DoS protection mechanisms will be disabled on the external zone:



| • | SYN cookies |
| --- | --- |






| • | IP fragmentation |
| --- | --- |






| • | ICMPv6 |
| --- | --- |



 To enable IP fragmentation and ICMPv6 protection for the shared gateway, you must create a separate Zone Protection profile for the shared gateway.
 To protect against SYN floods on a shared gateway, you can apply a SYN Flood protection profile with either Random Early Drop or SYN cookies; on an external zone, only Random Early Drop is available for SYN Flood protection.
 Parent topic
 [Network > Network Profiles > Zone Protection](network-network-profiles-zone-protection.html#ID0EFHDW)