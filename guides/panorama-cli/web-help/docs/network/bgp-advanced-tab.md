# BGP Advanced Tab

*Network : Network &gt; Virtual Routers : BGP : BGP Advanced Tab*

BGP Advanced Tab



| • | Network > Virtual Router > BGP > Advanced |
| --- | --- |




Advanced BGP settings include a variety of capabilities. You can run ECMP over multiple BGP autonomous systems. You can require eBGP peers to list their own AS as the first AS in an AS_PATH attribute (to prevent spoofed Update packets). You can configure BGP graceful restart, a means by which BGP peers indicate whether they can preserve forwarding state during a BGP restart to minimize the consequences of routes flapping (going up and down). You can configure route reflectors and AS confederations, which are two methods to avoid having a full mesh of BGP peerings in an AS. You can configure route dampening to prevent unnecessary router convergence when a BGP network is unstable and routes are flapping.



| BGP Advanced Settings | Configure In | Description |
| --- | --- | --- |
| ECMP Multiple AS Support | **BGP** > **Advanced** | Select if you enable ECMP for a virtual router and you want to run ECMP over multiple BGP autonomous systems. |
| Enforce First AS for EBGP | Causes the firewall to drop an incoming Update packet from an eBGP peer that doesn’t list the eBGP peer’s own AS number as the first AS number in the AS_PATH attribute. This prevents BGP from further processing a spoofed or erroneous Update packet that arrives from an AS other than a neighboring AS. Default is enabled. | |
| Graceful Restart | Activate the graceful restart option. • | **Stale Route Time**—Specify the length of time, in seconds, that a route can stay in the stale state (range is 1-3,600; default is 120). |






| • | **Local Restart Time**—Specify the length of time, in seconds, that the firewall takes to restart. This value is advertised to peers (range is 1-3,600; default is 120). |
| --- | --- |






| • | **Max Peer Restart Time**—Specify the maximum length of time, in seconds, that the firewall accepts as a grace period restart time for peer devices (range is 1-3,600; default is 120). |
| --- | --- |







 Reflector Cluster ID


 Specify an IPv4 identifier to represent the reflector cluster. A route reflector (router) in an AS performs a role of re-advertising routes it learned to its peers (rather than require full mesh connectivity and all peers send routes to each other). The route reflector simplifies configuration.




 Confederation Member AS


 Specify the autonomous system number identifier that is visible only within the BGP confederation (also called a sub-autonomous system number). Use a BGP confederation to divide autonomous systems into sub-autonomous systems and reduce full mesh peering.




 Dampening Profiles


 **BGP** > **Advanced (cont)**


 Route dampening is a method that determine whether a route is suppressed from being advertised because it is flapping. Route dampening can reduce the number of times routers are forced to reconverge due to routes flapping. Settings include:



| • | **Profile Name**—Enter a name to identify the profile. |
| --- | --- |






| • | **Enable**—Activate the profile. |
| --- | --- |






| • | **Cutoff**—Specify a route withdrawal threshold above which a route advertisement is suppressed (range is 0.0-1,000.0; default is 1.25). |
| --- | --- |






| • | **Reuse**—Specify a route withdrawal threshold below which a suppressed route is used again (range is 0.0-1,000.0; default is 5). |
| --- | --- |






| • | **Max. Hold Time**—Specify the maximum length of time, in seconds, that a route can be suppressed, regardless of how unstable it has been (range is 0-3,600; default is 900). |
| --- | --- |






| • | **Decay Half Life Reachable**—Specify the length of time, in seconds, after which a route’s stability metric is halved if the firewall considers the route is reachable (range is 0-3,600; default is 300). |
| --- | --- |






| • | **Decay Half Life Unreachable**—Specify the length of time, in seconds, after which a route’s stability metric is halved if the firewall considers the route is unreachable (range is 0-3,600; default is 300). |
| --- | --- |



 Delete ( ) profiles when you no longer need them.



 Parent topic
 [BGP](bgp.html#ID0EG4BU)