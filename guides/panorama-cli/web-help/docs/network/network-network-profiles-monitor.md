# Network > Network Profiles > Monitor

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Monitor*

Network > Network Profiles > Monitor

A monitor profile is used to monitor IPSec tunnels and to monitor a next-hop device for policy-based forwarding (PBF) rules. In both cases, the monitor profile is used to specify an action to take when a resource (IPSec tunnel or next-hop device) becomes unavailable. Monitor profiles are optional, but can be very useful for maintaining connectivity between sites and to ensure that PBF rules are maintained. The following settings are used to configure a monitor profile.



| Field | Description |
| --- | --- |
| Name | Enter a name to identify the monitor profile (up to **31** characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Action | Specify an action to take if the tunnel is not available. If the threshold number of heartbeats is lost, the firewall takes the specified action. • |






| • | **fail-over**—Traffic will fail over to a backup path, if one is available. The firewall uses routing table lookup to determine routing for the duration of this session. |
| --- | --- |



 In both cases, the firewall tries to negotiate new IPSec keys to accelerate the recovery.




 Interval


 Specify the time between heartbeats (range is 2 to 10; default is 3).




 Threshold


 Specify the number of heartbeats to be lost before the firewall takes the specified action (range is 2 to 10; default is 5).



 Parent topic
 [Network > Network Profiles](network-network-profiles.html#ID0E631V)