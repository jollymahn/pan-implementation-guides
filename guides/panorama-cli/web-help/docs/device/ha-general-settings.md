# HA General Settings

*Device : Device &gt; High Availability : HA General Settings*

HA General Settings



| • | Device > High Availability > General |
| --- | --- |




To configure high availability (HA) pairs or HA cluster members, begin by selecting **Device** > **High Availability** > **General** and configuring the general settings.



| HA Settings | Description |
| --- | --- |
| **General Tab** | |
| HA Pair Settings—Setup | **Enable HA Pair** to activate HA pair functionality and to access the following settings: • |






| • | **Description**—(`Optional`) Enter a description for the HA pair. |
| --- | --- |






| • | **Mode**—Set the type of HA deployment: **Active Passive** or **Active Active**. |
| --- | --- |






| • | **Device ID**—In active/active configuration, set the Device ID to determine which peer will be active-primary (set **Device ID** to **0**) and which will be active-secondary (set the **Device ID** to **1**). |
| --- | --- |






| • | **Enable Config Sync**—Select this option to enable synchronization of configuration settings between the peers. |
| --- | --- |



 Fastpath:
 Enable config sync so that both devices always have the same configuration and process traffic the same way.



| • | **Peer HA1 IP Address**—Enter the IP address of the HA1 interface of the peer firewall. |
| --- | --- |






| • | **Backup Peer HA1 IP Address**—Enter the IP address for the peer’s backup control link. |
| --- | --- |



 Fastpath:
 Configure a backup Peer HA1 IP Address so that, if the primary link fails, the backup link keeps the firewalls in sync and up to date.




 Active/Passive Settings





| • | **Passive Link State**—Select one of the following options to specify whether the data links on the passive firewall should remain up. This option is not available in the VM-Series firewall in AWS. |
| --- | --- |






| ◦ | **Shutdown**—Forces the interface link to the down state. This is the default option, which ensures that loops are not created in the network. |
| --- | --- |






| ◦ | **Auto**—The links that have physical connectivity remain physically up but in a disabled state; they do not participate in ARP learning or packet forwarding. This will help in convergence times during the failover as the time to bring up the links is saved. In order to avoid network loops, do not select this option if the firewall has any Layer 2 interfaces configured. |
| --- | --- |



 Fastpath:
 If the firewall has no Layer 2 interfaces configured, set the **Passive Link State** to **auto**.



| • | **Monitor Fail Hold Down Time (min)**—Number of minutes a firewall will be in a non-functional state before becoming passive (range is 1 to 60). This timer is used when there are missed heartbeats or hello messages due to a link or path monitoring failure. |
| --- | --- |







 Election Settings


 Specify or enable the following settings:



| • | **Device Priority**—Enter a priority value to identify the active firewall. The firewall with the lower value (higher priority) becomes the active firewall (range is 0 to 255) when the preemptive capability is enabled on both firewalls in the pair. |
| --- | --- |






| • | **Preemptive**—Enables the higher priority firewall to resume active (active/passive) or active-primary (active/active) operation after recovering from a failure. You must enable the Preemption option on both firewalls for the higher priority firewall to resume active or active-primary operation upon recovery after a failure. If this setting is disabled, then the lower priority firewall remains active or active-primary even after the higher priority firewall recovers from a failure. |
| --- | --- |



 Fastpath:
 Whether to enable the **Preemptive** option depends on your business requirements. If you require the primary device to be the active device, enable **Preemptive** so that—after recovering from a failure—the primary device preempts the secondary device. If you require the fewest failover events, disable the **Preemptive** option so that—after a failover—the HA pair doesn’t failover again to make the higher priority firewall the primary firewall.



| • | **Heartbeat Backup**—Uses the management ports on the HA firewalls to provide a backup path for heartbeat and hello messages. The management port IP address will be shared with the HA peer through the HA1 control link. No additional configuration is required. |
| --- | --- |



 Fastpath:
 Enable **Heartbeat Backup** if you use an in-band port for the HA1 and HA1 Backup links. Don’t enable **Heartbeat Backup** if you use the management port for the HA1 or HA1 Backup links.








| • | **HA Timer Settings**—Select one of the preset profiles: |
| --- | --- |






| ◦ | **Recommended**: Use for typical failover timer settings. Unless you’re sure that you need different settings, the best practice is to use the **Recommended** settings. |
| --- | --- |






| ◦ | **Aggressive**: Use for faster failover timer settings. |
| --- | --- |



 Tip:
 To view the preset value for an individual timer included in a profile, select **Advanced** and **Load Recommended** or **Load Aggressive**. The preset values for your hardware model will be displayed on-screen.



| ◦ | **Advanced**: Allows you to customize the values to suit your network requirement for each of the following timers: |
| --- | --- |






| ◦ | **Promotion Hold Time (ms)**—Number of milliseconds that the passive peer (in active/passive mode) or the active-secondary peer (in active/active mode) will wait before taking over as the active or active-primary peer after communications with the HA peer have been lost. This hold time begins only after the peer failure declaration. |
| --- | --- |






| ◦ | **Hello Interval (ms)**—Number of milliseconds between the hello packets sent to verify that the HA program on the other firewall is operational (range is 8,000 to 60,000; default is 8,000). |
| --- | --- |






| ◦ | **Heartbeat Interval (ms)**—Specify how frequently the HA peers exchange heartbeat messages in the form of an ICMP ping (range is 1,000 to 60,000; there is no default). |
| --- | --- |











| • | **Flap Max**—A flap is counted when the firewall leaves the active state within 15 minutes after it last left the active state. Specify the maximum number of flaps that are permitted before the firewall is determined to be suspended and the passive firewall takes over (range is 0 to 16; default is 3). The value 0 means there is no maximum (an infinite number of flaps is required before the passive firewall takes over). |
| --- | --- |






| • | **Preemption Hold Time (min)**—Number of minutes that a passive or active-secondary peer waits before taking over as the active or active-primary peer (range is 1 to 60; default is 1). |
| --- | --- |






| • | **Monitor Fail Hold Up Time (ms)**—Time interval, in milliseconds, during which the firewall will remain active following a path monitor or link monitor failure. This setting is recommended to avoid an HA failover due to the occasional flapping of neighboring devices (range is 0 to 60,000; default is 0). |
| --- | --- |






| • | **Additional Master Hold Up Time (ms)**—Additional time, in milliseconds, applied to the same event as the Monitor Fail Hold Up Time (range is 0 to 60,000; default is 500). The additional time interval is applied only to the active peer in active/passive mode and to the active-primary peer in active/active mode. This timer is recommended to avoid a failover when both peers experience the same link or path monitor failure simultaneously. |
| --- | --- |







 SSH HA Profile Setting


 A type of SSH service profile that applies to the SSH sessions for the high availability (HA) appliances on your network. To apply an existing HA profile, select a profile, click **OK**, and **Commit** your change.
 Note:



| | You must perform an SSH service restart from your CLI to activate the profile. |
| --- | --- |



 For more information, see [Device > Certificate Management > SSH Service Profile](device-certificate-management-ssh-service-profile.html#ID0EDBFZ).




 Clustering Settings


 **Enable Cluster Participation** to access the clustering settings. Firewalls that support HA clustering allow clusters of member firewalls (individuals or HA pairs where each firewall in a pair counts toward the total). The number of members per cluster that a firewall model supports is as follows:



| • | PA-3200 Series: 6 members |
| --- | --- |






| • | PA-5200 Series: 16 members |
| --- | --- |






| • | PA-5450: 8 members |
| --- | --- |






| • | PA-7080 Series: 4 members |
| --- | --- |






| • | PA-7050 Series: 6 members |
| --- | --- |



 Configure the cluster:



| • | **Cluster ID**—A unique numeric ID for an HA cluster in which all members can share session state (range is 1 to 99; there is no default). |
| --- | --- |






| • | **Cluster Description**—Short helpful description for the cluster. |
| --- | --- |






| • | **Cluster Synchronization Timeout (min)**—Maximum number of minutes that the local firewall waits before going to Active state when another cluster member (for example, in unknown state) is preventing the cluster from fully synchronizing (range is 0 to 30; default is 0). |
| --- | --- |






| • | **Monitor Fail Hold Down Time (min)**—Number of minutes after which a down link is retested to see if it is back up (range is 1 to 60; default is 1). |
| --- | --- |







 **Operational Commands**




 Suspend local device
 (or Make local device functional)


 To place the local HA peer into a suspended state and temporarily disable HA functionality on it, use the following CLI operational command:



| • | request high-availability state suspend |
| --- | --- |



 To place the suspended local HA peer back into a functional state, use the CLI operational command:



| • | request high-availability state functional |
| --- | --- |



 To test failover, you can uncable the active (or active-primary) firewall.



 Parent topic
 [Device > High Availability](device-high-availability.html#ID0EOYXX)