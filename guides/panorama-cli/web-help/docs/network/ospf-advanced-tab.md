# OSPF Advanced Tab

*Network : Network &gt; Virtual Routers : OSPF : OSPF Advanced Tab*

OSPF Advanced Tab



| • | Network > Virtual Router > OSPF > Advanced |
| --- | --- |




The following fields describe RFC 1583 compatibility, OSPF timers, and graceful restart:



| OSPF – Advanced Settings | Description |
| --- | --- |
| RFC 1583 Compatibility | Select to ensure compatibility with RFC 1583 (OSPF Version 2). |
| Timers | • |






| • | **LSA Interval (sec)**—Specifies the minimum time between transmissions of two instances of the same LSA (same router, same type, same LSA ID). This is equivalent to MinLSInterval in RFC 2328. Lower values can be used to reduce re-convergence times when topology changes occur. |
| --- | --- |







 Graceful Restart





| • | **Enable Graceful Restart**—Enabled by default, a firewall enabled for this feature will instruct neighboring routers to continue using a route through the firewall while a transition takes place that renders the firewall temporarily down. |
| --- | --- |






| • | **Enable Helper Mode**—Enabled by default, a firewall enabled for this mode continues to forward to an adjacent device when that device is restarting. |
| --- | --- |






| • | **Enable Strict LSA Checking**—Enabled by default, this feature causes an OSPF helper mode enabled firewall to exit helper mode if a topology change occurs. |
| --- | --- |






| • | **Grace Period (sec)**—Period of time, in seconds, that peer devices should continue to forward to this firewall while adjacencies are being re-established or the router is being restarted (range is 5-1,800; default is 120). |
| --- | --- |






| • | **Max Neighbor Restart Time**—Maximum grace period, in seconds, that the firewall will accept as a help-mode router. If the peer devices offers a longer grace period in its grace LSA, the firewall will not enter helper mode (range is 5-1,800; default is 140). |
| --- | --- |






 Parent topic
 [OSPF](ospf.html#ID0EBE2T)