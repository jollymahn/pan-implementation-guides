# RIP

*Network : Network &gt; Virtual Routers : RIP*

RIP



| • | Network > Virtual Routers > RIP |
| --- | --- |




Configuring the Routing Information Protocol (RIP) includes the following general settings:



| RIP Settings | Description |
| --- | --- |
| Enable | Select to enable RIP. |
| Reject Default Route | (`Recommended`) Select if you do not want to learn any default routes through RIP. |
| BFD | To enable Bidirectional Forwarding Detection (BFD) for RIP globally for the virtual router on a PA-400 Seres, PA-3200 Series, PA-3400 Series, PA-5200 Series, PA-5400 Series, PA-7000 Series, and VM-Series firewall, select one of the following: • |






| • | a BFD profile that you have created on the firewall |
| --- | --- |






| • | **New BFD Profile** to create a new BFD profile |
| --- | --- |



 Select **None (Disable BFD)** to disable BFD for all RIP interfaces on the virtual router; you cannot enable BFD for a single RIP interface.




In addition, RIP settings on the following tabs must be configured:




| • | **Interfaces**: See [RIP Interfaces Tab](rip-interfaces-tab.html#ID0EFZZT). |
| --- | --- |






| • | **Timers**: See [RIP Timers Tab](rip-timers-tab.html#ID0ESI1T). |
| --- | --- |






| • | **Auth Profiles**: See [RIP Auth Profiles Tab](rip-auth-profiles-tab.html#ID0E2R1T). |
| --- | --- |






| • | **Export Rules**: See [RIP Export Rules Tab](rip-export-rules-tab.html#ID0EN31T). |
| --- | --- |



 Parent topic
 [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)