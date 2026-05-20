# Network > Network Profiles > SD-WAN Interface Profile

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; SD-WAN Interface Profile*

Network > Network Profiles > SD-WAN Interface Profile

Create an SD-WAN Interface Profile to group physical links by Link Tag and to control the speed of links and how frequently the firewall monitors the link.



| | SD-WAN Interface Profile |
| --- | --- |
| Name | Enter the name of the SD-WAN Interface Profile using a maximum of 31 alphanumeric characters. The name must begin with an alphanumeric character and can contain letters, numbers, underscores (_), hyphens (-), periods (.), and spaces. |
| Location | Select a virtual system for a multi-vsys device. |
| Link Tag | Select the Link Tag that this profile will assign to the interface or add a new tag. A link tag bundles physical links (different ISPs) for the firewall to select from during path selection and failover. |
| Description | It is a best practice to enter a user-friendly description of the profile. |
| Link Type | Select the physical link type from the predefined list (**ADSL/DSL**, **Cable Modem**, **Ethernet**, **Fiber**, **LTE/3G/4G/5G**, **MPLS**, **Microwave/Radio**, **Satellite**, **WiFi**, **Private Link1**, **Private Link2**, **Private Link3**, **Private Link4**, or **Other**). With PAN-OS 11.1.3, SD-WAN plugin 3.2.1 and later releases support the additional point-to-point private link types, **Private Link1**, **Private Link2**, **Private Link3**, and **Private Link4**. The firewall can support any CPE device that terminates and hands off as an Ethernet connection to the firewall; for example, WiFi access points, LTE modems, laser-microwave CPEs all can terminate with an Ethernet hand-off. Note:  |



 1. The SD-WAN interface is configured as a point-to-point private link type (**MPLS**, **Satellite**, **Private Link1**, **Private Link2**, **Private Link3**, **Private Link4**, or **Microwave**) in its Interface Profile.
 2. The **VPN Data Tunnel Support** checkbox is disabled (unchecked) on the SD-WAN Interface Profile. This instructs PAN-OS to forward traffic in clear text outside of the SD-WAN VPN tunnel. Because **Private Link1**, **Private Link2**, **Private Link3**, and **Private Link4** link types don't support plain text traffic from SD-WAN branch firewall to SD-WAN hub firewall, you must leave the **VPN Data Tunnel Support** option enabled when you configure these private link types.
 On the Hub firewall, the zone name is configured as “zone-to-branch” when condition #1 is met. On the Branch firewall, the zone name is configured as “zone-to-hub” when both condition #1 and condition #2 are met. Panorama automates this step to simplify configuration to ensure proper communication between the hub and branch firewalls. If you have preexisting firewall policies that referenced the old zone name, you must update the policies to reflect the new predefined SD-WAN zone name.




 Maximum Download (Mbps)


 Enter the maximum download speed from the ISP in megabits per second; range is 1 to 100,000, there is no default value. Ask your ISP for the link speed or sample the link’s maximum speeds with a tool such as speedtest.net and take an average of the maximums over a good length of time.




 Maximum Upload (Mbps)


 Enter the maximum upload speed from the ISP in megabits per second; range is 1 to 100,000, there is no default value. Ask your ISP for the link speed or sample the link’s maximum speeds with a tool such as speedtest.net and take an average of the maximums over a good length of time.




 Eligible for Error Correction Profile interface selection


 Select this setting to make interfaces (where you apply this profile) eligible for the encoding firewall to select them for Forward Error Correction (FEC) or packet duplication. You can deselect this setting so that expensive FEC or packet duplication is never used on an expensive link (interface) where you apply the profile. The **Link Type** specified for the profile determines whether the default setting of **Eligible for Error Correction Profile interface selection** is selected or not.
 To configure FEC or packet duplication, create an SD-WAN [Error Correction Profile](objects-sd-wan-link-management-error-correction-profile.html#ID0EOOIS).




 VPN Data Tunnel Support


 Determines whether the branch-to-hub traffic and the return traffic flows through a VPN tunnel for added security (enabled by default) or flows outside of the VPN tunnel to avoid encryption overhead.



| • | Leave **VPN Data Tunnel Support** enabled for public link types that have direct internet connections or internet breakout capability, such as cable modem, ADSL, and other internet connections. |
| --- | --- |






| • | You can disable **VPN Data Tunnel Support** for private link types such as MPLS, satellite, or microwave that do not have internet breakout capability except **Private Link1**, **Private Link2**, **Private Link3**, and **Private Link4** link types. However, you must first ensure the traffic cannot be intercepted because it will be sent outside of the VPN tunnel. |
| --- | --- |






| • | (`SD-WAN Plugin 3.2.1 and later releases`) Because **Private Link1**, **Private Link2**, **Private Link3**, and **Private Link4** link types don't support plain text traffic from SD-WAN branch firewall to SD-WAN hub firewall, you must leave **VPN Data Tunnel Support** enabled when you configure these private link types. |
| --- | --- |






| • | The branch many have DIA traffic that needs to fail over to the private MPLS link connecting to the hub, and reach the internet from the hub. The **VPN Data Tunnel Support** setting determines whether the private data flows through the VPN tunnel or flows outside the tunnel, and the failed over traffic uses the other connection (that the private data flow doesn’t use). The firewall uses zones to segment DIA failover traffic from private MPLS traffic. |
| --- | --- |







 VPN Failover Metric


 (`PAN-OS 10.0.3 and later releases`) When you configure DIA AnyPath, you need a way to specify the failover order of individual VPN tunnels bundled in a hub virtual interface or branch virtual interface to which DIA fails over. Specify the VPN Failover Metric for the VPN tunnel (link); range is 1 to 65,535; default is 10. The lower the metric value, the higher the priority of the tunnel (link where you apply this profile) to be chosen during failover.
 For example, set the metric to a low value and apply the profile to a broadband interface; then create a different profile that sets a high metric to apply to an expensive LTE interface to ensure it is used only after broadband has failed over.
 Note:



| | If you have only one link at the hub, that link supports all of the virtual interfaces and DIA traffic. If you want to use the link types in a specific order, you must apply a Traffic Distribution profile to the hub that specifies **Top Down Priority**, and then order the Link Tags to specify the preferred order. (If you apply a Traffic Distribution profile that instead specifies **Best Available Path**, the firewall will use the link, regardless of cost, to choose the best performing path to the branch.) In summary, Link Tags in a Traffic Distribution Profile, the Link Tag applied to a [hub virtual interface](https://docs.paloaltonetworks.com/sd-wan/3-1/sd-wan-admin/configure-sd-wan/configure-dia-anypath.html), and a VPN Failover Metric work only when the Traffic Distribution profile specifies **Top Down Priority**. |
| --- | --- |







 Path Monitoring


 Select the path monitoring mode in which the firewall monitors the interfaces where you apply this SD-WAN Interface Profile.



| • | **Aggressive**—(default for all link types except LTE and Satellite) Firewall sends probe packets to the opposite end of the SD-WAN link at a constant frequency. |
| --- | --- |



 Fastpath:
 Use Aggressive mode if you need fast detection and failover for brownout and blackout conditions.



| • | **Relaxed**—(default for LTE and Satellite link types) Firewall waits for a number of seconds (the **Probe Idle Time**) between sending sets of probe packets, making path monitoring less frequent. When the Probe Idle Time expires, the firewall sends probes for seven seconds at the **Probe Frequency** configured. |
| --- | --- |



 Fastpath:
 Use Relaxed mode when you have low bandwidth links, links that charge by usage (such as LTE), or when fast detection isn’t as important as preserving cost and bandwidth.




 Probe Frequency (per second)


 Enter the probe frequency, which is the number of times per second that the firewall sends a probe packet to the opposite end of the SD-WAN link (range is 1 to 5; default is 5).




 Probe Idle Time (seconds)


 If you select **Relaxed** path monitoring, you can set the probe idle time (in seconds) that the firewall waits between sets of probe packets (range is 1 to 60; default is 60).




 Failback Hold Time (seconds)


 Enter the length of time (in seconds) that the firewall waits for a recovered link to remain qualified before the firewall reinstates that link as the preferred link after it has failed over (range is 20 to 120; default is 120). The failback hold time prevents a recovered link from being reinstated as the preferred link too quickly and having it fail again right away.



 Parent topic
 [Network > Network Profiles](network-network-profiles.html#ID0E631V)