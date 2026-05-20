# Network > Routing > Routing Profiles > OSPF

*Network : Network &gt; Routing &gt; Routing Profiles : Network &gt; Routing &gt; Routing Profiles &gt; OSPF*

Network > Routing > Routing Profiles > OSPF

Add [OSPF routing profiles](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/create-ospf-routing-profiles.html) to efficiently configure OSPFv2 for a logical router.



| OSPF Routing Profiles | Description |
| --- | --- |
| **OSPF Global Timer Profile** | |
| Name | Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| LSA min-arrival | Enter the minimum length of time (in seconds) between transmissions of two instances of the same LSA (same advertising router ID, same LSA type, and same LSA ID). If the same LSA arrives sooner than the configured interval, the LSA is dropped. Range is 1 to 10; default is 5. LSA min-arrival is equivalent to MinLSInterval in RFC 2328. Lower values can be used to reduce re-convergence times when topology changes occur. |
| SPF—Initial delay | Enter the initial delay (in seconds) from when the logical router receives a topology change until it performs the Shortest Path First (SPF) calculation; range is 0 to 600; default is 5. Lower values enable faster OSPF re-convergence. Routers peering with the firewall should use the same delay value to optimize convergence times. |
| Initial hold time | Enter the initial hold time (in seconds) between consecutive SPF calculations; range is 0 to 600; default is 5. |
| Maximum hold time | Enter the maximum hold time (in seconds), which is the largest value that the hold time throttles to until remaining steady; range is 0 to 600; default is 5. |
| **OSPF Interface Auth Profile** | |
| Name | Enter a name for the Authentication profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| Type | Select one type of authentication: • |





| • | **MD5**—**Add** an **MD5** key ID (range is 0 to 255) and a **Key** (a maximum of 16 characters; any character except the space). Select **Preferred** to prefer an MD5 key over other MD5 keys. |
| --- | --- |






 **OSPF Interface Timer Profile**




 Name


 Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Hello Interval


 Enter the interval (in seconds) between Hello packets that the firewall sends out an interface to maintain neighbor relationships; range is 1 to 3600; default is 10.




 Dead Count


 Enter the number of times the Hello Interval can occur for a neighbor without OSPF receiving a hello packet from the neighbor, before OSPF considers that neighbor down; range is 3 to 20; default is 4.




 Retransmit Interval


 Enter the number of seconds between LSA retransmissions to adjacent routers; range is 1 to 1800; default is 5.




 Transmit Delay


 Enter the number of seconds required to transmit a Link State Update Packet over the interface. Link State Advertisements in the update packet have their age incremented by this number before they are transmitted; range is 1 to 1800; default is 1.




 Graceful Restart Hello Delay (sec)


 Enter the Graceful Restart Hello Delay (in seconds), which applies to an OSPF interface when Active/Passive High Availability is configured. Graceful Restart Hello Delay is the length of time during which the firewall sends Grace LSA packets at 1-second intervals. During this time, no hello packets are sent from the restarting firewall. During the restart, the dead timer (which is the Hello Interval multiplied by the Dead Count) is also counting down. If the dead timer is too short, the adjacency will go down during the graceful restart because of the hello delay. Therefore, it is recommended that the dead timer be at least four times the value of the Graceful Restart Hello Delay. For example, a Hello Interval of 10 seconds and a Dead Count of 4 yield a dead timer of 40 seconds. If the Graceful Restart Hello Delay is set to 10 seconds, that 10-second delay of hello packets is comfortably within the 40-second dead timer, so the adjacency will not time out during a graceful restart. Range is 1 to 10; default is 10.




 **OSPF Redistribution Profile**




 Name


 Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 **IPv4 Static**


 Select to be able to configure this portion of the profile.




 Enable


 Enable IPv4 static route redistribution to OSPF.




 Metric


 Specify the Metric to apply to the static routes being redistributed into OSPF (range is 1 to 65,535).




 Metric-Type


 Select:



| • | **Type 1** |
| --- | --- |





| • | **Type 2** (default) |
| --- | --- |






 Redistribute Route-Map


 Select or create a Redistribution Route Map to control which IPv4 static routes are redistributed to OSPF and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. Likewise, the Metric Type in the route map Set configuration takes precedence over the Metric Type configured in this redistribution profile.




 **Connected**


 Select to be able to configure this portion of the profile.




 Enable


 Enable connected route redistribution to OSPF.




 Metric


 Specify the Metric to apply to the connected routes being redistributed into OSPF (range is 1 to 65,535).




 Metric-Type


 Select:



| • | **Type 1** |
| --- | --- |





| • | **Type 2** (default) |
| --- | --- |






 Redistribute Route-Map


 Select or create a Redistribution Route Map to control which connected routes are redistributed to OSPF and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. Likewise, the Metric Type in the route map Set configuration takes precedence over the Metric Type configured in this redistribution profile.




 **RIPv2**


 Select to be able to configure this portion of the profile.




 Enable


 Enable RIPv2 route redistribution to OSPF.




 Metric


 Specify the Metric to apply to the RIPv2 routes being redistributed into OSPF (range is 0 to 4,294,967,295).




 Metric-Type


 Select:



| • | **Type 1** |
| --- | --- |





| • | **Type 2** (default) |
| --- | --- |






 Redistribute Route-Map


 Select or create a Redistribution Route Map to control which RIPv2 routes are redistributed to OSPF and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. Likewise, the Metric Type in the route map Set configuration takes precedence over the Metric Type configured in this redistribution profile.




 **BGP AFI IPv4**


 Select to be able to configure this portion of the profile.




 Enable


 Enable BGP IPv4 route redistribution to OSPF.




 Metric


 Specify the Metric to apply to the BGP IPv4 routes being redistributed into OSPF (range is 0 to 4,294,967,295).




 Metric-Type


 Select:



| • | **Type 1** |
| --- | --- |





| • | **Type 2** (default) |
| --- | --- |






 Redistribute Route-Map


 Select or create a Redistribution Route Map to control which BGP IPv4 routes are redistributed to OSPF and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. Likewise, the Metric Type in the route map Set configuration takes precedence over the Metric Type configured in this redistribution profile.




 **IPv4 Default Route**


 Select to be able to configure this portion of the profile.




 Always


 Select to always create and redistribute the IPv4 default route to OSPF, even if there is no default route on the router; default is enabled.




 Enable


 Enable IPv4 default route redistribution to OSPF.




 Metric


 Specify the Metric to apply to the IPv4 default routes being redistributed into OSPF (range is 0 to 4,294,967,295).




 Metric-Type


 Select:



| • | **Type 1** |
| --- | --- |





| • | **Type 2** (default) |
| --- | --- |





 Parent topic
 [Network > Routing > Routing Profiles](network-routing-routing-profiles.html#ID0ECYBV)