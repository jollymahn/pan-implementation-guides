# Multicast Rendezvous Point Tab

*Network : Network &gt; Virtual Routers : IP Multicast : Multicast Rendezvous Point Tab*

Multicast Rendezvous Point Tab



| • | Network > Virtual Router > Multicast > Rendezvous Point |
| --- | --- |




Use the following fields to configure an IP multicast rendezvous point:



| Multicast Settings – Rendezvous Point | Description |
| --- | --- |
| RP Type | Choose the type of Rendezvous Point (RP) that will run on this virtual router. A static RP must be explicitly configured on other PIM routers whereas a candidate RP is elected automatically. • |






| • | **Static**—Specify a static IP address for the RP and choose options for **RP Interface** and **RP Address** from the drop-down. Select **Override learned RP for the same group** if you want to use the specified RP instead of the RP elected for this group. |
| --- | --- |






| • | **Candidate**—Specify the following information for the candidate RP running on this virtual router: |
| --- | --- |






| ◦ | **RP Interface**—Select an interface for the RP. Valid interface types include loopback, L3, VLAN, aggregate Ethernet, and tunnel. |
| --- | --- |






| ◦ | **RP Address**—Select an IP address for the RP. |
| --- | --- |






| ◦ | **Priority**—Specify a priority for candidate RP messages (default 192). |
| --- | --- |






| ◦ | **Advertisement interval**—Specify an interval between advertisements for candidate RP messages. |
| --- | --- |






| • | **Group list**—If you choose **Static** or **Candidate**, click **Add** to specify a list of groups for which this candidate RP is proposing to be the RP. |
| --- | --- |







 Remote Rendezvous Point


 Click **Add** and specify the following:



| • | **IP address**—Specify the IP address for the RP. |
| --- | --- |






| • | **Override learned RP for the same group**—Select to use the specified RP instead of the RP elected for this group. |
| --- | --- |






| • | **Group**—Specify a list of groups for which the specified address will act as the RP. |
| --- | --- |






 Parent topic
 [IP Multicast](ip-multicast.html#ID0EXPJU)