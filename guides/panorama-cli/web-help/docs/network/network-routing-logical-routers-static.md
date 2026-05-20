# Network > Routing > Logical Routers > Static

*Network : Network &gt; Routing &gt; Logical Routers : Network &gt; Routing &gt; Logical Routers &gt; Static*

Network > Routing > Logical Routers > Static

Optionally add one or more [static routes](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/create-a-static-route.html) for a logical router on an Advanced Routing Engine. Select **IPv4** or **IPv6** and **Add** the route using an IPv4 or IPv6 address. It is usually necessary to [configure default routes](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/static-routes/static-route-overview.html) (0.0.0.0/0). Default routes are applied for destinations that are not found in the logical router’s routing table.



| Static Route Settings | Description |
| --- | --- |
| Name | Enter a name to identify the static route (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, hyphens, and underscores. |
| Destination | Enter an IP address and network mask in Classless Inter-domain Routing (CIDR) notation: ip_address/mask (for example, 192.168.2.0/24 for IPv4 or 2001:db8::/32 for IPv6). Alternatively, you can create an address object of type IP Netmask. |
| Interface | Select the outgoing interface to forward packets to the destination, or configure the next hop settings, or both. Specify an interface for stricter control over which interface the firewall uses rather than using the interface in the route table for the next hop of this route. Default is **None**. |
| Next Hop | Select one of the following: • |





| • | **Next LR**—Select for the next logical router to be the Next Hop. |
| --- | --- |





| • | **FQDN**—Enter a Fully Qualified Domain Name to be the Next Hop. |
| --- | --- |





| • | **Discard**—Select if you want to drop traffic that is addressed to this destination. |
| --- | --- |





| • | **None**—(Default) Select if there is no next hop for the route. For example, a point-to-point connect does not require a next hop because there is only one way for packets to go. |
| --- | --- |






 Admin Dist


 Specify the administrative distance for the static route (range is 10 to 240.




 Metric


 Specify a valid metric for the static route (range is 1 to 65,535; default is 10).




 BFD Profile


 Select a BFD profile or create a new one to apply to the static route. Default is **None (Disable BFD)**.




 Path Monitoring


 Select to proceed configuring path monitoring.




 Enable


 **Enable** path monitoring for the static route.




 Failure Condition


 Select the condition under which the firewall considers the monitored path down and thus the static route down:



| • | **Any**—(Default) If any one of the monitored destinations for the static route is unreachable by ICMP, the firewall removes the static route from the RIB and FIB and adds the dynamic or static route that has the next lowest metric going to the same destination to the FIB. |
| --- | --- |





| • | **All**—If all of the monitored destinations for the static route are unreachable by ICMP, the firewall removes the static route from the RIB and FIB and adds the dynamic or static route that has the next lowest metric going to the same destination to the FIB. |
| --- | --- |


 Select **All** to avoid the possibility of a single monitored destination signaling a static route failure when that monitored destination is simply offline for maintenance, for example.




 Preemptive Hold Time (min)


 Enter the number of minutes a downed path monitor must remain in Up state—the path monitor evaluates all of its member monitored destinations and must remain Up before the firewall reinstalls the static route into the RIB. If the timer expires without the link going down or flapping, the link is deemed stable, path monitor can remain Up, and the firewall can add the static route back into the RIB.
 If the link goes down or flaps during the hold time, path monitor fails and the timer restarts when the downed monitor returns to Up state. A **Preemptive Hold Time** of zero causes the firewall to reinstall the static route into the RIB immediately upon the path monitor coming up. Range is 0 to 1,440; default is 2.




 Name


 **Add** a name for the monitored destination (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, hyphens, and underscores.




 Enable


 Select to enable path monitoring of this specific destination for the static route; the firewall sends ICMP pings to this destination.




 Source IP


 Select the IP address that the firewall will use as the source in the ICMP ping to the monitored destination:



| • | If the interface has multiple IP addresses, select one. |
| --- | --- |





| • | If you select an interface, the firewall uses the first IP address assigned to the interface by default. |
| --- | --- |





| • | If you select **DHCP (Use DHCP Client Address)**, the firewall uses the address that DHCP assigned to the interface. To see the DHCP address, select **Network** > **Interfaces** > **Ethernet** and in the row for the Ethernet interface, click on **Dynamic DHCP Client**. The IP Address appears in the Dynamic IP Interface Status window. |
| --- | --- |





| • | **PPPOE (Use PPPoE Client Address)** |
| --- | --- |






 Destination IP


 Enter a robust, stable IP address or address object for which the firewall will monitor the path. The monitored destination and the static route destination must use the same address family (IPv4 or IPv6).




 Ping Interval (sec)


 Specify the ICMP ping interval in seconds to determine how frequently the firewall monitors the path (pings the monitored destination); range is 1 to 60; default is 3.




 Ping Count


 Specify the number of consecutive ICMP ping packets that do not return from the monitored destination before the firewall considers the link down. Based on the **Any** or **All** failure condition, if path monitoring is in failed state, the firewall removes the static route from the RIB (range is 3 to 10; default is 5).
 For example, a Ping Interval of 3 seconds and Ping Count of 5 missed pings (the firewall receives no ping in the last 15 seconds) means path monitoring detects a link failure. If path monitoring is in failed state and the firewall receives a ping after 15 seconds, the link is deemed up; based on the **Any** or **All** failure condition, path monitoring to **Any** or **All** monitored destinations can be deemed up, and the Preemptive Hold Time starts.



 Parent topic
 [Network > Routing > Logical Routers](network-routing-logical-routers.html#ID0E1FWU)