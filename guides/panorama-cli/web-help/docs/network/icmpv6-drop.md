# ICMPv6 Drop

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Packet Based Attack Protection : ICMPv6 Drop*

ICMPv6 Drop

To instruct the firewall what to do with certain ICMPv6 packets it receives in the zone, select the following settings to enable them.



| Zone Protection Profile Settings—Packet Based Attack Protection | Configured In | Description |
| --- | --- | --- |
| ICMPv6 destination unreachable - require explicit security rule match | **Network** > **Network Profiles** > **Zone Protection** > **Packet Based Attack Protection** > **ICMPv6 Drop** | Require an explicit Security policy match for Destination Unreachable ICMPv6 messages, even when the message is associated with an existing session. |
| ICMPv6 packet too big - require explicit security rule match | Require an explicit Security policy match for Packet Too Big ICMPv6 messages, even when the message is associated with an existing session. | |
| ICMPv6 time exceeded - require explicit security rule match | Require an explicit Security policy match for Time Exceeded ICMPv6 messages, even when the message is associated with an existing session. | |
| ICMPv6 parameter problem - require explicit security rule match | Require an explicit Security policy match for Parameter Problem ICMPv6 messages, even when the message is associated with an existing session. | |
| ICMPv6 redirect - require explicit security rule match | Require an explicit Security policy match for Redirect Message ICMPv6 messages, even when the message is associated with an existing session. | |


 Parent topic
 [Packet Based Attack Protection](packet-based-attack-protection.html#ID0EPNHW)