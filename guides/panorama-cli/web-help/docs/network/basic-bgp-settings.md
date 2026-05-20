# Basic BGP Settings

*Network : Network &gt; Virtual Routers : BGP : Basic BGP Settings*

Basic BGP Settings

To use BGP on a virtual router, you must enable BGP and configure the Router ID and AS Number; enabling BFD is optional.



| BGP Settings | Configure In | Description |
| --- | --- | --- |
| Enable | **BGP** | Select to enable BGP. |
| Router ID | Enter the IP address to assign to the virtual router. | |
| AS Number | Enter the number of the AS to which the virtual router belongs, based on the router ID (range is 1 to 4,294,967,295). | |
| BFD | To enable Bidirectional Forwarding Detection (BFD) for BGP globally for the virtual router on a PA-400 Series, PA-3200 Series, PA-3400 Series, PA-5200 Series, PA-5400 Series, PA-7000 Series, or VM-Series firewall, select one of the following: • | **default** (default BFD settings) |






| • | an existing BFD profile on the firewall |
| --- | --- |






| • | create a **New BFD Profile** |
| --- | --- |



 Select **None (Disable BFD)** to disable BFD for all BGP interfaces on the virtual router; you cannot enable BFD for a single BGP interface.
 CAUTION:
 If you enable or disable BFD globally, all interfaces running BGP are taken down and brought back up with the BFD function, which can disrupt BGP traffic. Therefore, enable BFD on BGP interfaces during an off-peak time when reconvergence does not impact production traffic.



 Parent topic
 [BGP](bgp.html#ID0EG4BU)