# RIP Interfaces Tab

*Network : Network &gt; Virtual Routers : RIP : RIP Interfaces Tab*

RIP Interfaces Tab



| • | Network > Virtual Routers > RIP > Interfaces |
| --- | --- |




Use the following fields to configure RIP interfaces:



| RIP – Interface Settings | Description |
| --- | --- |
| Interface | Select the interface that runs the RIP protocol. |
| Enable | Select to enable these settings. |
| Advertise | Select to enable advertisement of a default route to RIP peers with the specified metric value. |
| Metric | Specify a metric value for the router advertisement. This field is visible only if you enable **Advertise**. |
| Auth Profile | Select the profile. |
| Mode | Select **normal**, **passive**, or **send-only**. |
| BFD | To enable BFD for a RIP interface (and thereby override the BFD setting for RIP, as long as BFD is not disabled for RIP at the virtual router level), select one of the following: • |






| • | a BFD profile that you created on the firewall |
| --- | --- |






| • | **New BFD Profile** to create a new BFD profile |
| --- | --- |



 Select **None (Disable BFD)** to disable BFD for the RIP interface.



 Parent topic
 [RIP](rip.html#ID0EBHZT)