# HA Link and Path Monitoring

*Device : Device &gt; High Availability : HA Link and Path Monitoring*

HA Link and Path Monitoring



| • | Device > High Availability > Link and Path Monitoring |
| --- | --- |




To define HA failover conditions, configure HA link and path monitoring; select **Device** > **High Availability** > **Link and Path Monitoring**.

 Note:



| | Link monitoring and path monitoring are not available for the VM-Series firewall on AWS. |
| --- | --- |



 Link monitoring is not supported on the VM-Series firewall on VMware ESXi. Use Path Monitoring to verify connectivity to a target IP address or to the next hop IP address.


| HA Link and Path Monitoring Settings | Description |
| --- | --- |
| Link Monitoring | Specify the following: • |






| • | **Failure Condition**—Select whether a failover occurs when any or all of the monitored link groups fail. |
| --- | --- |



 Fastpath:
 Enable and configure either path monitoring or link monitoring to help trigger a failover if a path or link goes down. Configure at least one **Path Group** for path monitoring and configure at least one **Link Group** for Link Monitoring.




 Link Groups


 Define one or more link groups to monitor specific Ethernet links. To add a link group, specify the following and click **Add**:



| • | **Name**—Enter a link group name. |
| --- | --- |






| • | **Enabled**—Enable the link group. |
| --- | --- |






| • | **Failure Condition**—Select whether a failure occurs when any or all of the selected links fail. |
| --- | --- |






| • | **Interfaces**—Select one or more Ethernet interfaces to be monitored. |
| --- | --- |







 Path Monitoring


 Specify the following:



| • | **Enabled**—Enable path monitoring based on the combined or independent Virtual Wire path monitoring, VLAN path monitoring, and Virtual Router* path monitoring. Path monitoring enables the firewall to monitor specified destination IP addresses by sending ICMP ping messages to make sure that they are responsive. Use path monitoring for virtual wire, Layer 2, or Layer 3 configurations where monitoring of other network devices is required for failover and link monitoring alone is not sufficient. |
| --- | --- |






| • | **Failure Condition**: |
| --- | --- |






| ◦ | **Any**—(default) Firewall triggers an HA failover when path monitoring for a virtual wire or a VLAN or a virtual router* fails. |
| --- | --- |






| ◦ | **All**—Firewall triggers an HA failover when path monitoring for a virtual wire and a VLAN and a virtual router* fails (whichever of the three are enabled). |
| --- | --- |



 Note:



| | * If you have Advanced Routing enabled, Logical Router replaces Virtual Router, and you can enable Logical Router Path Monitoring. |
| --- | --- |



 Fastpath:
 Enable and configure either path monitoring or link monitoring to help trigger a failover if a path or link goes down. Configure at least one **Path Group** for path monitoring and configure at least one **Link Group** for Link Monitoring.




 Path Group


 Define one or more path groups to monitor specific destination addresses for the interface type. **Add Virtual Wire Path**, and **Add VLAN Path**, and **Add Virtual Router Path**. (If you have Advanced Routing enabled, you can **Add Logical Router Path**).
 For each type of path monitoring that you add, specify the following:



| • | **Name**—Select virtual wire, VLAN, or virtual router* to monitor (drop-down choices are based on path monitoring type you are adding). |
| --- | --- |






| • | **Source IP**—For virtual wire and VLAN interfaces, enter the source IP address to use in the pings sent to the next-hop router (Destination IP address). The local router must be able to route the address to the firewall. (The source IP address for path groups associated with virtual routers* will be automatically configured as the interface IP address that is indicated in the route table as the egress interface for the specified destination IP address.) |
| --- | --- |






| • | **Enabled**—Enable monitoring of virtual wire, VLAN, or virtual router*. |
| --- | --- |






| • | **Failure Condition**: |
| --- | --- |






| ◦ | **Any** (default)—Firewall determines virtual wire, VLAN, or virtual router* has failed when a ping failure in any destination IP group occurs. |
| --- | --- |






| ◦ | **All**—Firewall determines the virtual wire, VLAN, or virtual router* has failed when a ping failure in all destination IP groups occurs. |
| --- | --- |



 Note:



| | The actual HA failover is determined by the Failure Condition you set for Path Monitoring, which considers virtual wire, VLAN, and virtual router* path monitoring (whichever you enabled). |
| --- | --- |






| • | **Ping Interval**—Specify the interval between pings that are sent to the destination IP address (range is 200 to 60,000ms; default is 200ms). |
| --- | --- |






| • | **Ping Count**—Specify the number of failed pings before declaring a failure (range is 3 to 10; default is 10). |
| --- | --- |



 Note:



| | * If you have Advanced Routing enabled, Logical Router replaces Virtual Router, and you can enable Logical Router Path Monitoring. |
| --- | --- |







 Destination IP for Path Group





| • | **Destination IP**—**Add** one or more destination IP address groups to monitor for the path group. |
| --- | --- |






| ◦ | **Destination IP Group**—Enter a name for the group. |
| --- | --- |






| ◦ | **Add** one or more **Destination IP** addresses to monitor for the group. |
| --- | --- |






| ◦ | **Enabled**—Select to enable the Destination IP group. |
| --- | --- |






| ◦ | **Failure Condition**: Select **Any** (to specify that if a ping failure occurs for any IP address in the group, the destination group is considered to have failed) or **All** (to specify that if a ping failure occurs for all IP addresses in the group, the destination group is considered to have failed). |
| --- | --- |






 Parent topic
 [Device > High Availability](device-high-availability.html#ID0EOYXX)