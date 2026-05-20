# OSPF

*Network : Network &gt; Virtual Routers : OSPF*

OSPF



| • | Network > Virtual Router > OSPF |
| --- | --- |




Configuring the Open Shortest Path First (OSPF) protocol requires you to configure the following general settings (except BFD, which is optional):



| OSPF Settings | Description |
| --- | --- |
| Enable | Select to enable the OSPF protocol. |
| Reject Default Route | (`Recommended`) Select if you do not want to learn any default routes through OSPF. |
| Router ID | Specify the router ID associated with the OSPF instance in this virtual router. The OSPF protocol uses the router ID to uniquely identify the OSPF instance. |
| BFD | To enable Bidirectional Forwarding Detection (BFD) for OSPF globally for the virtual router on a PA-400 Series, PA-3200 Series, PA-3400 Series, PA-5200 Series, PA-5400 Series, PA-7000 Series, or VM-Series firewall, select one of the following: • |






| • | a BFD profile that you have created on the firewall |
| --- | --- |






| • | **New BFD Profile** to create a new BFD profile |
| --- | --- |



 Select **None (Disable BFD)** to disable BFD for all OSPF interfaces on the virtual router; you cannot enable BFD for a single OSPF interface.




In addition, you must configure OSPF settings on the following tabs:




| • | **Areas**: See [OSPF Areas Tab](ospf-areas-tab.html#ID0E5W2T). |
| --- | --- |






| • | **Auth Profiles**: See [OSPF Auth Profiles Tab](ospf-auth-profiles-tab.html#ID0EPD4T). |
| --- | --- |






| • | **Export Rules**: See [OSPF Export Rules Tab](ospf-export-rules-tab.html#ID0EBO4T). |
| --- | --- |






| • | **Advanced**: See [OSPF Advanced Tab](ospf-advanced-tab.html#ID0EYX4T). |
| --- | --- |



 Parent topic
 [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)