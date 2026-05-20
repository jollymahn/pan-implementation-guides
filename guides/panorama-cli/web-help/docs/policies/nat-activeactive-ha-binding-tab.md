# NAT Active/Active HA Binding Tab

*Policies : Policies &gt; NAT : NAT Active/Active HA Binding Tab*

NAT Active/Active HA Binding Tab



| • | Policies > NAT > Active/Active HA Binding |
| --- | --- |




The Active/Active HA Binding tab is available only if the firewall is in a high availability (HA) active/active configuration. In this configuration, you must bind each source NAT rule (whether static or dynamic NAT) to Device ID 0 or Device ID 1; you must bind each destination NAT rule to either Device ID **0**, Device ID **1**, **both** (Device ID 0 and Device ID 1), or to the active-**primary** firewall.


Select an **Active/Active HA Binding** setting to bind the NAT rule to an HA firewall as follows:




| • | **0**—Binds the NAT rule to the firewall that has HA Device ID 0. |
| --- | --- |






| • | **1**—Binds the NAT rule to the firewall that has HA Device ID 1. |
| --- | --- |






| • | **both**—Binds the NAT rule to both the firewall that has HA Device ID 0 and the firewall that has HA Device ID 1. This setting does not support Dynamic IP or Dynamic IP and Port NAT. |
| --- | --- |






| • | **primary**—Binds the NAT rule to the firewall that is in HA active-primary state. This setting does not support Dynamic IP or Dynamic IP and Port NAT. |
| --- | --- |




You typically configure device-specific NAT rules when the two HA peers have unique NAT IP address pools.


When the firewall creates a new session, the HA binding determines which NAT rules the session can match. The binding must include the session owner for the rule to match. The session setup firewall performs the NAT rule matching but the session is compared to NAT rules that are bound to the session owner and translated according to one of the rules. For device-specific rules, the firewall skips all NAT rules that are not bound to the session owner. For example, suppose the firewall with Device ID 1 is the session owner and the session setup firewall. When Device ID 1 attempts to match a session to a NAT rule, it ignores all rules bound to Device ID 0.


If one peer fails, the second peer continues to process traffic for the synchronized sessions from the failed peer, including NAT translations. Palo Alto Networks recommends you create a duplicate NAT rule that is bound to the second Device ID. Therefore, there are two NAT rules with the same source translation addresses and the same destination translation addresses—one rule bound to each Device ID. This configuration allows the HA peer to perform new session setup tasks and perform NAT rule matching for NAT rules that are bound to its Device ID. Without a duplicate NAT rule, the functioning peer will try to perform the NAT policy match but the session won’t match the firewall’s own device-specific rules and the firewall skips all other NAT rules that are not bound to its Device ID.


**Looking for more?**


See [NAT in Active/Active HA Mode](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/ha-concepts/nat-in-activeactive-ha-mode.html)

 Parent topic
 [Policies > NAT](policies-nat.html#ID0E1QXO)