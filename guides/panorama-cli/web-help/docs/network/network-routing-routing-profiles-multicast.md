# Network > Routing > Routing Profiles > Multicast

*Network : Network &gt; Routing &gt; Routing Profiles : Network &gt; Routing &gt; Routing Profiles &gt; Multicast*

Network > Routing > Routing Profiles > Multicast

Add multicast routing profiles to efficiently configure IPv4 multicast for a logical router.



| Multicast Routing Profiles | Description |
| --- | --- |
| **Multicast IPv4 PIM Interface Timer Profile** | |
| Name | Enter a name for the profile (maximum of 31 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| Assert Interval | Enter the number of seconds between PIM Assert messages that the logical router sends to other PIM routers on the multiaccess network when they are electing a PIM forwarder. Range is 1 to 65,534; default is 177. |
| Hello Interval | Enter the number of seconds between PIM Hello messages that the logical router sends to its PIM neighbors from each interface in the interface group. Range is 1 to 180; default is 30. |
| Join Prune Interval | Enter the number of seconds between PIM Join messages (and between PIM Prune messages) that the logical router sends upstream toward a multicast source. Range is 60 to 600; default is 60. |
| **Multicast IPv4 IGMP Interface Query Profile** | |
| Name | Enter a name for the profile (maximum of 31 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| Max Query Response Time | Enter the maximum number of seconds allowed for a receiver to respond to an IGMP membership Query message before the logical router determines that the receiver no longer wants to receive multicast packets for the group. Range is 1 to 25; default is 10. |
| Query Interval | Enter the number of seconds between IGMP membership Query messages that the logical router sends to a receiver to determine whether the receiver still wants to receive the multicast packets for a group. Range is 1 to 1,800; default is 125. |
| Last Member Query Interval | Enter the number of seconds allowed for a receiver to respond to a Group-Specific Query that the logical router sends after a receiver sends a Leave Group message. Range is 1 to 25; default is 1. |
| leave group immediately when a leave message is received | If you enable this, when there is only one member in a multicast group and the logical router receives an IGMP Leave message for that group, this setting causes the logical router to remove that group and outgoing interface from the multicast routing information base (mRIB) and multicast forwarding information base (mFIB) immediately, rather than waiting for the Last Member Query Interval to expire. Enabling this setting saves network resources. Default is disabled. |
| **Multicast MDSP Authentication Profile** | |
| Name | Add an MSDP Authentication profile by name (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and can contain a combination of alphanumeric characters, underscore, or hyphen. No dot (.) or space is allowed. |
| Secret | Enter the Secret (alphanumeric characters, !, @, #, %, and ^ are allowed). **Confirm Secret**. |
| **Multicast MDSP Timer Profile** | |
| Name | Add an MSDP Timer profile by name (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and can contain a combination of alphanumeric characters, underscore, or hyphen. No dot (.) or space is allowed. |
| Keep Alive Interval | Enter a value in seconds; range is 1 to 60; default is 60. After an MSDP transport connection is established with a peer, each side of the connection sends Keepalive messages to the other side at this interval to keep the MSDP session active. If the timer expires, the peer sends a Keepalive message and resets the timer. If no Keepalive or SA message is received for the Message Timeout interval, the MSDP session is reset. |
| Message Timeout | Enter a value in seconds, which is the interval at which the MSDP peer will wait for Keepalive messages from other peers before declaring them down. Range is 1 to 75; default is 75. |
| Connection Retry Interval | Enter a value in seconds, which is the interval that peers will wait after a peering session is reset before trying to reestablish the peering session. Range is 1 to 60; default is 30. |

 Parent topic
 [Network > Routing > Routing Profiles](network-routing-routing-profiles.html#ID0ECYBV)