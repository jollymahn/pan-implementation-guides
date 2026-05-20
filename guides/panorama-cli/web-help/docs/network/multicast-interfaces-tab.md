# Multicast Interfaces Tab

*Network : Network &gt; Virtual Routers : IP Multicast : Multicast Interfaces Tab*

Multicast Interfaces Tab



| • | Network > Virtual Router > Multicast > Interfaces |
| --- | --- |




Use the following fields to configure multicast interfaces that share IGMP, PIM and group permission settings:



| Multicast Settings – Interfaces | Description |
| --- | --- |
| Name | Enter a name to identify an interface group. |
| Description | Enter an optional description. |
| Interface | **Add** one or more firewall interfaces that belong to the interface group and therefore share multicast group permissions, IGMP settings and PIM settings. |
| Group Permissions | Specify multicast groups that participate in PIM Any-Source Multicast (ASM) or PIM Source-Specific Multicast (SSM): • |






| • | **Source Specific**—**Add** a **Name** for a multicast **Group** and **Source** IP address pair for which multicast traffic is allowed on the interfaces in the interface group. By default the Group and Source pair is **Included** in the Source Specific list. Deselect **Included** to easily exclude a Group and Source pair without deleting the configuration. |
| --- | --- |







 IGMP


 Specify settings for IGMP traffic. IGMP must be enabled for multicast receiver-facing interfaces.



| • | **Enable**—Select to enable the IGMP configuration. |
| --- | --- |






| • | **IGMP Version**—Choose version 1, 2, or 3 to run on the interface. |
| --- | --- |






| • | **Enforce Router-Alert IP Option**—Select to require the router-alert IP option when speaking IGMPv2 or IGMPv3. This must be disabled for compatibility with IGMPv1. |
| --- | --- |






| • | **Robustness**—Choose an integer value to account for packet loss on a network (range is 1 to 7; default is 2). If packet loss is common, choose a higher value. |
| --- | --- |






| • | **Max Sources**—Specify the maximum number of source-specific memberships allowed for the interface group (range is 1 to 65,535 or **unlimited**). |
| --- | --- |






| • | **Max Groups**—Specify the maximum number of multicast groups allowed for this interface group (range is 1 to 65,535 or **unlimited**). |
| --- | --- |






| • | **Query Configuration**—Specify the following: |
| --- | --- |






| ◦ | **Query Interval**—Specify the interval at which general queries are sent to all receivers. |
| --- | --- |






| ◦ | **Max Query Response Time**—Specify the maximum time between a general query and a response from a receiver. |
| --- | --- |






| ◦ | **Last Member Query Interval**—Specify the interval between group or source-specific query messages (including those sent in response to leave-group messages). |
| --- | --- |






| ◦ | **Immediate Leave**—Select to leave the group immediately when a leave message is received. |
| --- | --- |







 PIM configuration


 Specify Protocol Independent Multicast (PIM) settings:



| • | **Enable**—Select to allow this interface to receive and/or forward PIM messages. You must enable for an interface to forward multicast traffic. |
| --- | --- |






| • | **Assert Interval**—Specify the interval between PIM assert messages to elect a PIM Forwarder. |
| --- | --- |






| • | **Hello Interval**—Specify the interval between PIM hello messages. |
| --- | --- |






| • | **Join Prune Interval**—Specify the number of seconds between PIM join messages (and between PIM prune messages). Default is 60. |
| --- | --- |






| • | **DR Priority**—Specify the designated router priority for this interface. |
| --- | --- |






| • | **BSR Border**—Select to use the interface as the bootstrap border. |
| --- | --- |






| • | **PIM Neighbors**—**Add** the list of neighbors that will communicate using PIM. |
| --- | --- |






 Parent topic
 [IP Multicast](ip-multicast.html#ID0EXPJU)