# OSPFv3 Areas Tab

*Network : Network &gt; Virtual Routers : OSPFv3 : OSPFv3 Areas Tab*

OSPFv3 Areas Tab



| • | Network > Virtual Router > OSPFv3 > Areas |
| --- | --- |




Use the following fields to configure OSPFv3 areas.



| OSPv3 – Areas Settings | Description |
| --- | --- |
| Authentication | Select the name of the Authentication profile that you want to specify for this OSPF area. |
| Type | Select one of the following: • |






| • | **Stub**—There is no outlet from the area. To reach a destination outside of the area, it is necessary to go through the border, which connects to other areas. If you select this option, select **Accept Summary** if you want to accept this type of link state advertisement (LSA) from other areas. Also, specify whether to include a default route LSA in advertisements to the stub area along with the associated metric value (1-255). |
| --- | --- |



 If the **Accept Summary** option on a stub area Area Border Router (ABR) interface is disabled, the OSPF area will behave as a Totally Stubby Area (TSA) and the ABR will not propagate any summary LSAs.



| • | **NSSA** (Not-So-Stubby Area)—It is possible to leave the area directly, but only by routes other than OSPF routes. If you select this option, select **Accept Summary** if you want to accept this type of LSA. Specify whether to include a default route LSA in advertisements to the stub area along with the associated metric value (1-255). Also, select the route type used to advertise the default LSA. Click **Add** in the **External Ranges** section and enter ranges if you want to enable or suppress advertising external routes that are learned through NSSA to other areas |
| --- | --- |







 Range


 Click **Add** to aggregate LSA destination IPv6 addresses in the area by subnet. Enable or suppress advertising LSAs that match the subnet, and click **OK**. Repeat to add additional ranges.




 Interface


 Click **Add** and enter the following information for each interface to be included in the area, and click **OK**.



| • | **Interface**—Choose the interface. |
| --- | --- |






| • | **Enable**—Cause the OSPF interface settings to take effect. |
| --- | --- |






| • | **Instance ID **–Enter an OSPFv3 instance ID number. |
| --- | --- |






| • | **Passive**—Select to if you do not want the OSPF interface to send or receive OSPF packets. Although OSPF packets are not sent or received if you choose this option, the interface is included in the LSA database. |
| --- | --- |






| • | **Link type**—Choose **Broadcast** if you want all neighbors that are accessible through the interface to be discovered automatically by multicasting OSPF hello messages, such as an Ethernet interface. Choose **p2p** (point-to-point) to automatically discover the neighbor. Choose **p2mp** (point-to-multipoint) when neighbors must be defined manually. Defining neighbors manually is allowed only for p2mp mode. |
| --- | --- |






| • | **Metric**—Enter the OSPF metric for this interface (0-65,535). |
| --- | --- |






| • | **Priority**—Enter the OSPF priority for this interface (0-255). It is the priority for the router to be elected as a designated router (DR) or as a backup DR (BDR) according to the OSPF protocol. When the value is zero, the router will not be elected as a DR or BDR. |
| --- | --- |






| • | **Auth Profile**—Select a previously-defined authentication profile. |
| --- | --- |






| • | **BFD**—To enable Bidirectional Forwarding Detection (BFD) for an OSPFv3 peer interface (and thereby override the **BFD** setting for OSPFv3, as long as **BFD** is not disabled for OSPFv3 at the virtual router level), select one of the following: |
| --- | --- |






| ◦ | **default** (default BFD settings) |
| --- | --- |






| ◦ | a BFD profile that you have created on the firewall |
| --- | --- |






| ◦ | **New BFD Profile** to create a new BFD profile |
| --- | --- |



 Select **None (Disable BFD)** to disable BFD for the OSPFv3 peer interface.



| • | **Hello Interval (sec)**—Interval, in seconds, at which the OSPF process sends hello packets to its directly connected neighbors (range is 0-3,600; default is 10). |
| --- | --- |






| • | **Dead Counts**—Number of times the hello interval can occur for a neighbor without OSPF receiving a hello packet from the neighbor, before OSPF considers that neighbor down. The **Hello Interval** multiplied by the **Dead Counts** equals the value of the dead timer (range is 3-20; default is 4). |
| --- | --- |






| • | **Retransmit Interval (sec)**—Length of time, in seconds, that OSPF waits to receive a link-state advertisement (LSA) from a neighbor before OSPF retransmits the LSA (range is 0-3,600; default is 10). |
| --- | --- |






| • | **Transit Delay (sec)**—Length of time, in seconds, that an LSA is delayed before the firewall sends it out of an interface (range is 0-3,600; default is 1). |
| --- | --- |







 Interface (continued)





| • | **Graceful Restart Hello Delay (sec)**—Applies to an OSPF interface when Active/Passive High Availability is configured. **Graceful Restart Hello Delay** is the length of time during which the firewall sends Grace LSA packets at 1-second intervals. During this time, no hello packets are sent from the restarting firewall. During the restart, the dead timer (which is the **Hello Interval** multiplied by the **Dead Counts**) is also counting down. If the dead timer is too short, the adjacency will go down during the graceful restart because of the hello delay. Therefore, it is recommended that the dead timer be at least four times the value of the **Graceful Restart Hello Delay**. For example, a **Hello Interval** of 10 seconds and a **Dead Counts** of 4 yield a dead timer of 40 seconds. If the **Graceful Restart Hello Delay** is set to 10 seconds, that 10-second delay of hello packets is comfortably within the 40-second dead timer, so the adjacency will not time out during a graceful restart (range is 1-10; default is 10). |
| --- | --- |






| • | **Neighbors**—For p2pmp interfaces, enter the neighbor IP address for all neighbors that are reachable through this interface. |
| --- | --- |







 Virtual Links


 Configure the virtual link settings to maintain or enhance backbone area connectivity. The settings must be defined for area border routers, and must be defined within the backbone area (0.0.0.0). Click **Add**, enter the following information for each virtual link to be included in the backbone area, and click **OK**.



| • | **Name**—Enter a name for the virtual link. |
| --- | --- |






| • | **Instance ID**—Enter an OSPFv3 instance ID number. |
| --- | --- |






| • | **Neighbor ID**—Enter the router ID of the router (neighbor) on the other side of the virtual link. |
| --- | --- |






| • | **Transit Area**—Enter the area ID of the transit area that physically contains the virtual link. |
| --- | --- |






| • | **Enable**—Select to enable the virtual link. |
| --- | --- |






| • | **Timing**—It is recommended that you keep the default timing settings. |
| --- | --- |






| • | **Auth Profile**—Select a previously-defined authentication profile. |
| --- | --- |






 Parent topic
 [OSPFv3](ospfv3.html#ID0EWH5T)