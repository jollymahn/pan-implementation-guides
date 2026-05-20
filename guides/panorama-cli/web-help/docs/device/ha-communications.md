# HA Communications

*Device : Device &gt; High Availability : HA Communications*

HA Communications



| • | Device > High Availability > HA Communications |
| --- | --- |




To configure HA links for HA pairs or HA clustering, select **Device** > **High Availability** > **HA Communications**.



| HA Links | Description |
| --- | --- |
| Control Link (HA1)/Control Link (HA1 Backup) | The firewalls in an HA pair use [HA links](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/ha-concepts/ha-links-and-backup-links.html) to synchronize data and maintain state information. Some firewall models have a dedicated Control Link and dedicated backup Control Link; for example, PA-5200 Series firewalls have HA1-A and HA1-B. In this case, you should enable the Heartbeat Backup option in the Elections Settings. If you're using a dedicated HA1 port for the Control Link HA link and a data port for Control Link (HA Backup), it's recommended that you enable the Heartbeat Backup option. For firewalls that don't have a dedicated HA port, such as the PA-220 firewall, you should configure the management port for the Control Link HA connection and a data port interface configured with type HA for the Control Link HA1 Backup connection. Because the management port is used in this case, there is no need to enable the Heartbeat Backup option because the heartbeat backups will already occur through the management interface connection. On the VM-Series firewall in AWS, the management port is used as the HA1 link. Fastpath:  When using a data port for the HA control link, keep in mind that because the control messages have to communicate from the dataplane to the management plane, if a failure occurs in the dataplane, peers cannot communicate HA control link information and a failover will occur. It is best to use the dedicated HA ports, or on firewalls that do not have a dedicated HA port, use the management port. |
| Control Link (HA1)/Control Link (HA1 Backup) | Specify the following settings for the primary and backup HA control links when you [configure Active/Passive HA](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/set-up-activepassive-ha/configure-activepassive-ha) or [configure Active/Active HA](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/set-up-activeactive-ha/configure-activeactive-ha): • |






| • | **IPv4/IPv6 Address**—Enter the IPv4 or IPv6 address of the HA1 interface for the primary and backup HA1 interfaces. The backup setting is optional. |
| --- | --- |



 Note:



| | PA-3200 Series firewalls don’t support an IPv6 address for backup HA1 interfaces; use an IPv4 address. |
| --- | --- |






| • | **Netmask**—Enter the network mask for the IP address (such as 255.255.255.0) for the primary and backup HA1 interfaces. The backup setting is optional. |
| --- | --- |






| • | **Gateway**—Enter the IP address of the default gateway for the primary and backup HA1 interfaces. The backup setting is optional. |
| --- | --- |






| • | **Link Speed**—(`Models with dedicated HA ports only`) Select the speed for the control link between the firewalls for the dedicated HA1 port. |
| --- | --- |






| • | **Link Duplex**—(`Models with dedicated HA ports only`) Select a duplex option for the control link between the firewalls for the dedicated HA1 port. |
| --- | --- |






| • | **Encryption Enabled**—Enable encryption after exporting the HA key from the HA peer and importing it onto this firewall. The HA key on this firewall must also be exported from this firewall and imported on the HA peer. Configure this setting for the primary HA1 interface. Import/export keys on the Certificates page (see [Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ)). |
| --- | --- |



 Fastpath:
 Enable encryption when firewalls aren’t directly connected (HA1 connections go through network devices that can inspect, process, or capture traffic).



| • | **Monitor Hold Time (ms)**—Enter the length of time, in milliseconds, that the firewall will wait before declaring a peer failure due to a control link failure (range is 1,000 to 60,000; default is 3,000). This option monitors the physical link status of HA1 ports. |
| --- | --- |







 Data Link (HA2)
 Note:



| | When an HA2 backup link is configured, failover to the backup link will occur if there is a physical link failure. With the HA2 keep-alive option enabled, the failover will also occur if the HA keep-alive messages fail based on the defined threshold. |
| --- | --- |





 Specify the following settings for the primary and backup data link [configure Active/Passive HA](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/set-up-activepassive-ha/configure-activepassive-ha) or [configure Active/Active HA](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/set-up-activeactive-ha/configure-activeactive-ha):



| • | **Port**—Select the HA port. Configure this setting for the primary and backup HA2 interfaces. The backup setting is optional. |
| --- | --- |






| • | **IP Address**—Specify the IPv4 or IPv6 address of the HA interface for the primary and backup HA2 interfaces. The backup setting is optional. |
| --- | --- |






| • | **Netmask**—Specify the network mask for the HA interface for the primary and backup HA2 interfaces. The backup setting is optional. |
| --- | --- |






| • | **Gateway**—Specify the default gateway for the HA interface for the primary and backup HA2 interfaces. The backup setting is optional. If the HA2 IP addresses of the firewalls are in the same subnet, the Gateway field should be left blank. |
| --- | --- |






| • | **Enable Session Synchronization**—Enable synchronization of the session information with the passive firewall, and choose a transport option. |
| --- | --- |



 Fastpath:
 Enable session synchronization so that the secondary device has the session in its dataplane, which allows the firewall to match packets to the synchronized session and quickly forward packets. If you don’t enable session synchronization, the firewall must create the session again, which introduces latency and could drop connections.








| • | **Transport**—Choose one of the following transport options: |
| --- | --- |






| ◦ | **Ethernet**—Use when the firewalls are connected back-to-back or through a switch (Ethertype 0x7261). |
| --- | --- |






| ◦ | **IP**—Use when Layer 3 transport is required (IP protocol number 99). |
| --- | --- |






| ◦ | **UDP**—Use to take advantage of the fact that the checksum is calculated on the entire packet rather than just the header, as in the IP option (UDP port 29281). The benefit of using UDP mode is the presence of the UDP checksum to verify the integrity of a session sync message. |
| --- | --- |






| • | (`Models with dedicated HA ports only`) **Link Speed**—Select the speed for the control link between peers for the dedicated HA2 port. |
| --- | --- |






| • | (`Models with dedicated HA ports only`) **Link Duplex**—Select a duplex option for the control link between peers for the dedicated HA2 port. |
| --- | --- |






| • | **HA2 Keep-alive**—It is a best practice to select this option to monitor the health of the HA2 data link between HA peers. This option is disabled by default and you can enable it on one or both peers. If enabled, the peers will use keep-alive messages to monitor the HA2 connection to detect a failure based on the **Threshold** you set (default is 10,000 ms). If you enable HA2 keep-alive, the HA2 Keep-alive recovery Action will be taken. Select an **Action**: |
| --- | --- |






| ◦ | **Log Only**—Logs the failure of the HA2 interface in the system log as a critical event. Select this option for active/passive deployments because the active peer is the only firewall forwarding traffic. The passive peer is in a backup state and is not forwarding traffic; therefore a split datapath is not required. If you have not configured any HA2 Backup links, state synchronization will be turned off. If the HA2 path recovers, an informational log will be generated. |
| --- | --- |






| ◦ | **Split Datapath**—Select this option in active/active HA deployments to instruct each peer to take ownership of their local state and session tables when it detects an HA2 interface failure. Without HA2 connectivity, no state and session synchronization can happen; this action allows separate management of the session tables to ensure successful traffic forwarding by each HA peer. To prevent this condition, configure an HA2 Backup link. |
| --- | --- |






| • | **Threshold (ms)**—The duration in which keep-alive messages have failed before one of the above actions is triggered (range is 5,000 to 60,000; default is 10,000. |
| --- | --- |







 Clustering Links


 When you [configure HA clustering](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability/configure-ha-clustering), configure settings for HA4 links, which are dedicated HA cluster links that synchronize session state among all cluster members having the same cluster ID. The HA4 link between cluster members detects connectivity failures between cluster members.



| • | **Port**—Select an HA interface to be the HA4 link (for example, ethernet1/1). |
| --- | --- |






| • | **IPv4/IPv6 Address**—Enter the IP address of the local HA4 interface. |
| --- | --- |






| • | **Netmask**—Enter the netmask. |
| --- | --- |






| • | **HA4 Keep-alive Threshold (ms)**—Length of time within which the firewall must receive keepalives from a cluster member to know that the cluster member is functional (range is 5,000 to 60,000; default is 10,000). |
| --- | --- |



 Configure HA4 Backup settings:



| • | **Port**—Select an HA interface to be the HA4 backup link. |
| --- | --- |






| • | **IPv4/IPv6 Address**—Enter the address of the local HA4 backup link. |
| --- | --- |






| • | **Netmask**—Enter the netmask. |
| --- | --- |






 Parent topic
 [Device > High Availability](device-high-availability.html#ID0EOYXX)