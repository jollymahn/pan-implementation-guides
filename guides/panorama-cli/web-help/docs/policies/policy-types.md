# Policy Types

*Policies : Policy Types*

## Policy Types


Policies enable you to control firewall operation by enforcing rules and automating actions. The firewall supports the following policy [types](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/policy-types.html):




| • | Basic [security policies](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/security-policy) to block or allow a network session based on the application, the source and destination zones and addresses, and—optionally—based on the service (port and protocol). Zones identify the physical or logical interfaces that send or receive the traffic. See [Policies > Security](policies-security.html#ID0ESNMO). |
| --- | --- |






| • | Network Address Translation (NAT) policies to translate addresses and ports. See to [Policies > NAT](policies-nat.html#ID0E1QXO). |
| --- | --- |






| • | Quality of Service (QoS) policies to determine how traffic is classified for treatment when it passes through an interface with QoS enabled. See [Policies > QoS](policies-qos.html#ID0ERS1O). |
| --- | --- |






| • | Policy-based forwarding policies to override the routing table and specify an egress interface for traffic. See [Policies > Policy Based Forwarding](policies-policy-based-forwarding.html#ID0ECQ3O). |
| --- | --- |






| • | Decryption policies to specify traffic decryption for security policies. Each policy can specify the categories of URLs for the traffic you want to decrypt. SSH decryption is used to identify and control SSH tunneling in addition to SSH shell access. See [Policies > Decryption](policies-decryption.html#ID0ERC6O). |
| --- | --- |






| • | Tunnel Inspection policies to enforce Security, DoS Protection, and QoS policies on tunneled traffic, and to view tunnel activity. See [Policies > Tunnel Inspection](policies-tunnel-inspection.html#ID0EWGFQ). |
| --- | --- |






| • | Override policies to override the application definitions provided by the firewall. See [Policies > Application Override](policies-application-override.html#ID0EXJHQ). |
| --- | --- |






| • | Authentication policies to define authentication for end users who access network resources. See [Policies > Authentication](policies-authentication.html#ID0EWJJQ). |
| --- | --- |






| • | Denial of service (DoS) policies to protect against DoS attacks and take protective action in response to rule matches. See [Policies > DoS Protection](policies-dos-protection.html#ID0EYHMQ). |
| --- | --- |






| • | SD-WAN policies to determine link path management between the source and destination zones when link path health degrades below the approved, configured health metrics. See [Policies > SD-WAN](policies-sd-wan.html#ID0EQBPQ). |
| --- | --- |




Shared polices pushed from Panorama™ display in orange on the firewall web interface. You can edit these shared policies only on Panorama; you cannot edit them on the firewall.


[View Rulebase as Groups](view-rulebase-as-groups.html#ID0ESX4Q) to view all the tag groups used in a rulebase. In rule bases with many rules, viewing the rulebase as groups simplifies the display by presenting the tags, color code, and the number of rules in each group while preserving the established rule hierarchy.

 Parent topic
 [Policies](policies.html#ID0EK5IO)