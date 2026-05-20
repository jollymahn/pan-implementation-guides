# Policies > NAT

*Policies : Policies &gt; NAT*

## Policies > NAT


If you define Layer 3 interfaces on the firewall, you can [configure a Network Address Translation (NAT) policy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/nat/configure-nat.html) to specify whether source or destination IP addresses and ports are converted between public and private addresses and ports. For example, private source addresses can be translated to public addresses on traffic sent from an internal (trusted) zone to a public (untrusted) zone. NAT is also supported on virtual wire interfaces.


NAT rules are based on source and destination zones, source and destination addresses, and application service (such as HTTP). Like security policies, NAT policy rules are compared against incoming traffic in sequence, and the first rule that matches the traffic is applied.


As needed, add static routes to the local router so that traffic to all public addresses is routed to the firewall. You may also need to add static routes to the receiving interface on the firewall to route traffic back to the private address.


The following tables describe the NAT and NPTv6 (IPv6-to-IPv6 Network Prefix Translation) settings:




| • | [NAT Policies General Tab](nat-policies-general-tab.html#ID0EV6XO) |
| --- | --- |






| • | [NAT Original Packet Tab](nat-original-packet-tab.html#ID0ENPYO) |
| --- | --- |






| • | [NAT Translated Packet Tab](nat-translated-packet-tab.html#ID0EC2YO) |
| --- | --- |






| • | [NAT Active/Active HA Binding Tab](nat-activeactive-ha-binding-tab.html#ID0EY4ZO) |
| --- | --- |






| • | (`Panorama only`) [NAT Target Tab](nat-target-tab.html#ID0EJI1O) |
| --- | --- |




Looking for more?


See [NAT](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/nat.html)

 Parent topic
 [Policies](policies.html#ID0EK5IO)