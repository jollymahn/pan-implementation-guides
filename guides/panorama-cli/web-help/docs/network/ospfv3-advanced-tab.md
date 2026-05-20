# OSPFv3 Advanced Tab

*Network : Network &gt; Virtual Routers : OSPFv3 : OSPFv3 Advanced Tab*

OSPFv3 Advanced Tab



| • | Network > Virtual Router > OSPFv3 > Advanced |
| --- | --- |




Use the following fields to disable transit routing for SPF calculations, configure OSPFv3 timers, and configure graceful restart for OSPFv3.



| OSPFv3 – Advanced Settings | Description |
| --- | --- |
| Disable Transit Routing for SPF Calculation | Select if you want to set the R-bit in router LSAs sent from this firewall to indicate that the firewall is not active. When in this state, the firewall participates in OSPFv3 but other routers do not send transit traffic. In this state, local traffic will still be forwarded to the firewall. This is useful while performing maintenance with a dual-homed network because traffic can be re-routed around the firewall while it can still be reached. |
| Timers | • |






| • | **LSA Interval (sec)**—The option specifies the minimum time between transmissions of two instances of the same LSA (same router, same type, same LSA ID). This is equivalent to MinLSInterval in RFC 2328. Lower values can be used to reduce re-convergence times when topology changes occur. |
| --- | --- |







 Graceful Restart





| • | **Enable Graceful Restart**—Enabled by default, a firewall enabled for this feature will instruct neighboring routers to continue using a route through the firewall while a transition takes place that renders the firewall temporarily down. |
| --- | --- |






| • | **Enable Helper Mode**—Enabled by default, a firewall enabled for this mode continues to forward to an adjacent device when that device is restarting. |
| --- | --- |






| • | **Enable Strict LSA Checking**—Enabled by default, this feature causes an OSPF helper mode enabled firewall to exit helper mode if a topology change occurs. |
| --- | --- |






| • | **Grace Period (sec)**—The period of time, in seconds, that peer devices continue to forward to this firewall while adjacencies are being re-established or while the router is being restarted (range is 5-1,800; default is 120). |
| --- | --- |






| • | **Max Neighbor Restart Time**—The maximum grace period, in seconds, that the firewall will accept as a help-mode router. If the peer devices offers a longer grace period in its grace LSA, the firewall will not enter helper mode (range is 5-800; default is 140). |
| --- | --- |






 Parent topic
 [OSPFv3](ospfv3.html#ID0EWH5T)