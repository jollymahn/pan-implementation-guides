# ECMP

*Network : Network &gt; Virtual Routers : ECMP*

ECMP



| • | Network > Virtual Routers > Router Settings > ECMP |
| --- | --- |




Equal Cost Multiple Path (ECMP) processing is a networking feature that enables the firewall to use up to four equal-cost routes to the same destination. Without this feature, if there are multiple equal-cost routes to the same destination, the virtual router chooses one of those routes from the routing table and adds it to its forwarding table; it will not use any of the other routes unless there is an outage in the chosen route. Enabling ECMP functionality on a virtual router allows the firewall have up to four equal-cost paths to a destination in its forwarding table, allowing the firewall to:




| • | Load balance flows (sessions) to the same destination over multiple equal-cost links. |
| --- | --- |






| • | Make use of the available bandwidth on all links to the same destination rather than leave some links unused. |
| --- | --- |






| • | Dynamically shift traffic to another ECMP member to the same destination if a link fails, rather than waiting for the routing protocol or RIB table to elect an alternative path, which can help reduce down time when links fail. |
| --- | --- |




ECMP load balancing is done at the session level, not at the packet level. This means the firewall chooses an equal-cost path at the start of a new session, not each time the firewall receives a packet.

 Note:



| | Enabling, disabling, or changing ECMP on an existing virtual router causes the system to restart the virtual router, which might cause existing sessions to be terminated. |
| --- | --- |




To configure ECMP for a virtual router, select a virtual router and, for **Router Settings**, select the **ECMP** tab and configure the [ECMP Settings](ecmp-settings.html#ID0EN3MU) as described.



| What are you looking for? | See: |
| --- | --- |
| What are the fields available to configure ECMP? | [ECMP Settings](ecmp-settings.html#ID0EN3MU) |
| **Looking for more?** | [ECMP](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/ecmp.html) |


 Parent topic
 [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)