# Network > Network Profiles > QoS

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; QoS*

Network > Network Profiles > QoS

**Add** a QoS profile to define the bandwidth limits and priority for up to eight classes of service. You can set both guaranteed and maximum bandwidth limits for individual classes and for the collective classes. Priorities determine how traffic is treated in the presence of contention.


To fully enable the firewall to provide QoS, also:




| • | Define the traffic that you want to receive QoS treatment (select Policies > QoS to add or modify a QoS policy). |
| --- | --- |






| • | Enable QoS on an interface (select Network > QoS). |
| --- | --- |




See [Quality of Service](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/quality-of-service.html) for complete QoS workflows, concepts, and use cases.



| QoS Profile Settings |
| --- |
| Profile Name |
| Egress Max |







 Egress Guaranteed


 Enter the bandwidth that is guaranteed for this profile (Mbps). When the egress guaranteed bandwidth is exceeded, the firewall passes traffic on a best-effort basis.
 You can configure the **Egress Guaranteed** and **Egress Max** values in Mbps or percentages. The following considerations should be taken into account when configuring these values in percentages:



| • | The **Egress Guaranteed** (%) per class is calculated using the **Egress Max** value, not the **Egress Guaranteed** value. |
| --- | --- |






| • | Profile **Egress Guaranteed** equals the sum of the **Egress Guaranteed** (%) per class multiplied by the **Egress Max**. |
| --- | --- |



 For example: The **Egress Max** is configured as 100Mbps. The guaranteed percentage configured for Class 1 is 30%, for Class 2 it is 20%, for Class 3 it is 5%, and for Class 4 it is 1%. This configuration results in a total percentage guaranteed as 56%. In this case, profile **Egress Guaranteed** is 56Mbps (56% x **Egress Max**). This also means that Class 1 **Egress Guaranteed** is 30Mbps, Class 2 **Egress Guaranteed** is 20Mbps, and so on.




 Classes


 **Add** and specify how to treat individual QoS classes. You can select one or more classes to configure:



| • | **Class**—If you do not configure a class, you can still include it in a QoS policy. In this case, the traffic is subject to overall QoS limits. Traffic that does not match a QoS policy will be assigned to class 4. |
| --- | --- |






| • | **Priority**—Click and select a priority to assign it to a class: |
| --- | --- |






| ◦ | **real-time** |
| --- | --- |






| ◦ | **high** |
| --- | --- |






| ◦ | **medium** |
| --- | --- |






| ◦ | **low** |
| --- | --- |



 When contention occurs, traffic that is assigned a lower priority is dropped. Real-time priority uses its own separate queue.



| • | **Egress Max**—Click and enter the maximum throughput (in Mbps) for this class. The value is 0 by default, which specifies the firewall limit (60,000 Mbps in PAN-OS 7.1.16 and later releases; 16,000 in PAN-OS 7.1.15 and earlier releases). The **Egress Max** for a QoS class must be less than or equal to the **Egress Max** for the QoS profile. |
| --- | --- |



 Fastpath:
 Though this is not a required field, we recommend you always define the **Egress Max** value for a QoS profile.



| • | **Egress Guaranteed**—Click and enter the guaranteed bandwidth (Mbps) for this class. Guaranteed bandwidth assigned to a class is not reserved for that class—bandwidth that is unused continues to remain available to all traffic. However, when the egress guaranteed bandwidth for a traffic class is exceeded, the firewall passes that traffic on a best-effort basis. |
| --- | --- |






 Parent topic
 [Network > Network Profiles](network-network-profiles.html#ID0E631V)