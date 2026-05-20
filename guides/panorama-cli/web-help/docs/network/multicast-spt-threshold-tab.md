# Multicast SPT Threshold Tab

*Network : Network &gt; Virtual Routers : IP Multicast : Multicast SPT Threshold Tab*

Multicast SPT Threshold Tab



| • | Network > Virtual Router > Multicast > SPT Threshold |
| --- | --- |




The Shortest Path Tree (SPT) threshold defines the point at which the virtual router switches multicast routing for a multicast group or prefix from shared tree distribution (sourced from the rendezvous point) to source tree (also known as shortest path tree or SPT) distribution. **Add** an SPT threshold for a multicast group or prefix.



| SPT Threshold | Description |
| --- | --- |
| **Multicast Group/Prefix** | Specify the multicast address or prefix for which multicast routing switches to SPT distribution when throughput to the group or prefix reaches the threshold setting. |
| **Threshold (kbps)** | Select a setting to specify the point at which multicast routing switches to SPT distribution for the corresponding multicast group or prefix: • |






| • | **never (do not switch to spt)**—The virtual router continues to forward multicast traffic to this group or prefix down the shared tree. |
| --- | --- |






| • | Enter the total number of kilobits from multicast packets that can arrive for the corresponding multicast group or prefix at any interface and over any time period (range is 1 to 4,294,967,295). When throughput reaches this number, the virtual router switches to SPT distribution. |
| --- | --- |






 Parent topic
 [IP Multicast](ip-multicast.html#ID0EXPJU)