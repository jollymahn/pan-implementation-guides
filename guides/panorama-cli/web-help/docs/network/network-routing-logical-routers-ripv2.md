# Network > Routing > Logical Routers > RIPv2

*Network : Network &gt; Routing &gt; Logical Routers : Network &gt; Routing &gt; Logical Routers &gt; RIPv2*

Network > Routing > Logical Routers > RIPv2

The table describes the settings to [configure RIPv2](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/configure-ripv2-on-an-advanced-routing-engine.html) interfaces for a logical router on an Advanced Routing Engine.



| RIPv2 Settings | Description |
| --- | --- |
| Enable | Enable RIPv2 for the logical router. |
| default-information originate | Advertise the default route even if it does not exist in the RIB of the routing engine. |
| BFD Profile | Apply the Bidirectional Forwarding Detection (BFD) profile to RIPv2. Default is **None**. |
| Global General Timer | Select a RIPv2 Global Timer Profile to establish the Update Interval, Expire Interval, and Delete Interval. Default is **None**. |
| Auth Profile | Select a RIPv2 Authentication Profile to apply MD5 or simple password authentication. Default is **None**. |
| Redistribution Profile | Select a RIPv2 Redistribution Profile to redistribute IPv4 static routes, connected routes, BGP AFI IPv4 routes, or OSPFv2 routes to RIPv2. Default is **None**. |
| Global Inbound Distribute List | Select a distribute list to control which incoming routes are accepted. Default is **None**. |
| Global Outbound Distribute List | Select a distribute list to control which routes are advertised to RIP neighbors. Default is **None**. |
| Interface | Add an interface that can participate in RIPv2 routing. |
| Enable | Enable the interface to use RIPv2. |
| Split Horizon | Select one of the following: • |





| • | **no-split-horizon**—Disables split horizon. |
| --- | --- |





| • | **no-split-horizon-with-poison-reverse**—Allows the advertisement back on the same interface where it was received and sets the metric for these routes to the maximum allowed for RIP, which is 16. |
| --- | --- |






 Mode


 Select the mode for the interface:



| • | **active**—The interface will advertise networks and send RIP updates. |
| --- | --- |





| • | **passive**—The interface will advertise networks, but not send RIP updates. (Useful if there are no RIP routers for the network, and therefore no reason to send RIP updates on the interface.) |
| --- | --- |





| • | **send-only**—Can be used if the firewall is an end node and you only want to advertise a prefix to RIP, but use static routes or a default route to reach external prefixes. |
| --- | --- |






 Authentication


 Select an Authentication profile if you want to override the profile you applied at the logical router level.




 BFD Profile


 By default, the interface will inherit the BFD profile you applied to the logical router for RIPv2. Alternatively, select a different BFD profile (as long as BFD is not disabled for RIPv2 on the logical router) or select **None (Disable BFD)** to disable BFD for the interface.




 Interface Inbound Distribute List—Access-List


 Select an access list to control the routes coming to this interface.




 Interface Inbound Distribute List—Metric


 Specify the metric to apply to incoming routes; range is 1 to 16.




 Interface Outbound Distribute List—Access-List


 Select an access list to control the routes advertised out this interface to RIP neighbors.




 Interface Outbound Distribute List—Metric


 Specify the metric to apply to advertised routes; range is 1 to 16.



 Parent topic
 [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)