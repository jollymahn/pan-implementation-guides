# Policies > DoS Protection

*Policies : Policies &gt; DoS Protection*

## Policies > DoS Protection


A DoS Protection policy allows you to protect individual critical resources against DoS attacks by specifying whether to deny or allow packets that match a source interface, zone, address or user and/or a destination interface, zone, or user.


Alternatively, you can choose the Protect action and specify a [DoS profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/zone-protection-and-dos-protection/zone-defense/dos-protection-profiles-and-policy-rules/dos-protection-profiles.html) where you set the thresholds (sessions or packets per second) that trigger an alarm, activate a protective action, and indicate the maximum rate above which all new connections are dropped. Thus, you can control the number of sessions between interfaces, zones, addresses, and countries based on aggregate sessions or source and/or destination IP addresses. For example, you can control traffic to and from certain addresses or address groups, or from certain users and for certain services.


The firewall enforces DoS Protection policy rules before Security policy rules to ensure the firewall uses its resources in the most efficient manner. If a DoS Protection policy rule denies a packet, that packet never reaches a Security policy rule.


The following tables describe the DoS Protection policy settings:




| • | [DoS Protection General Tab](dos-protection-general-tab.html#ID0E3UMQ) |
| --- | --- |






| • | [DoS Protection Source Tab](dos-protection-source-tab.html#ID0E1ANQ) |
| --- | --- |






| • | [DoS Protection Destination Tab](dos-protection-destination-tab.html#ID0EPSNQ) |
| --- | --- |






| • | [DoS Protection Option/Protection Tab](dos-protection-optionprotection-tab.html#ID0EI3NQ) |
| --- | --- |






| • | (`Panorama only`) [DoS Protection Target Tab](dos-protection-target-tab.html#ID0EIXOQ) |
| --- | --- |




**Looking for more?**


See [DoS Protection Profiles](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/zone-protection-and-dos-protection/zone-defense/dos-protection-profiles-and-policy-rules.html) and [Objects > Security Profiles > DoS Protection](objects-security-profiles-dos-protection.html#ID0EQAXR).

 Parent topic
 [Policies](policies.html#ID0EK5IO)