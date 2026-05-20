# Policies > Policy Based Forwarding

*Policies : Policies &gt; Policy Based Forwarding*

## Policies > Policy Based Forwarding


Normally, when traffic enters the firewall, the ingress interface virtual router dictates the route that determines the outgoing interface and destination security zone based on destination IP address. By [creating a policy-based forwarding (PBF) rule](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/policy-based-forwarding/create-a-policy-based-forwarding-rule), you can specify other information to determine the outgoing interface, including source zone, source address, source user, destination address, destination application, and destination service. The initial session on a given destination IP address and port that is associated with an application will not match an application-specific rule and will be forwarded according to subsequent PBF rules (that do not specify an application) or the virtual router’s forwarding table. All subsequent sessions on that destination IP address and port for the same application will match an application-specific rule. To ensure forwarding through PBF rules, application-specific rules are not recommended.


When necessary, PBF rules can be used to force traffic through an additional virtual system using the Forward-to-VSYS forwarding action. In this case, it is necessary to define an additional PBF rule that will forward the packet from the destination virtual system out through a particular [egress interface](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/policy-based-forwarding/pbf.html) on the firewall.


The following tables describe the policy-based forwarding settings:




| • | [Policy Based Forwarding General Tab](policy-based-forwarding-general-tab.html#ID0ER63O) |
| --- | --- |






| • | [Policy Based Forwarding Source Tab](policy-based-forwarding-source-tab.html#ID0E4J4O) |
| --- | --- |






| • | [Policy Based Forwarding Destination/Application/Service Tab](policy-based-forwarding-destinationapplicationservice-tab.html#ID0E2Z4O) |
| --- | --- |






| • | [Policy Based Forwarding Forwarding Tab](policy-based-forwarding-forwarding-tab.html#ID0E5D5O) |
| --- | --- |






| • | (`Panorama only`) [Policy Based Forwarding Target Tab](policy-based-forwarding-target-tab.html#ID0EJY5O) |
| --- | --- |




**Looking for more?**


Refer to [Policy-Based Forwarding](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/policy-based-forwarding)

 Parent topic
 [Policies](policies.html#ID0EK5IO)