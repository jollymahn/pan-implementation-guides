# OSPFv3

*Network : Network &gt; Virtual Routers : OSPFv3*

OSPFv3



| • | Network > Virtual Router > OSPFv3 |
| --- | --- |




Configuring the Open Shortest Path First v3 (OSPFv3) protocol requires configuring the first three settings in the following table (BFD is optional):



| OSPFv3 Settings | Description |
| --- | --- |
| Enable | Select to enable the OSPF protocol. |
| Reject Default Route | Select if you do not want to learn any default routes through OSPF. |
| Router ID | Specify the router ID associated with the OSPF instance in this virtual router. The OSPF protocol uses the router ID to uniquely identify the OSPF instance. |
| BFD | To enable Bidirectional Forwarding Detection (BFD) for OSPFv3 globally for the virtual router on a PA-400 Series, PA-3200 Series, PA-3400 Series, PA-5200 Series, PA-5400 Series, PA-7000 Series, and VM-Series firewall, select one of the following: • |






| • | a BFD profile that you have created on the firewall |
| --- | --- |






| • | **New BFD Profile** to create a new BFD profile |
| --- | --- |



 Select **None (Disable BFD)** to disable BFD for all OSPFv3 interfaces on the virtual router; you cannot enable BFD for a single OSPFv3 interface.




In addition, configure OSPFv3 settings on the following tabs:




| • | **Areas**: See [OSPFv3 Areas Tab](ospfv3-areas-tab.html#ID0EN15T). |
| --- | --- |






| • | **Auth Profiles**: See [OSPFv3 Auth Profiles Tab](ospfv3-auth-profiles-tab.html#ID0E2IAU). |
| --- | --- |






| • | **Export Rules**: See [OSPFv3 Export Rules Tab](ospfv3-export-rules-tab.html#ID0ERDBU). |
| --- | --- |






| • | **Advanced**: See [OSPFv3 Advanced Tab](ospfv3-advanced-tab.html#ID0EINBU). |
| --- | --- |



 Parent topic
 [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)