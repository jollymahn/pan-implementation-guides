# Panorama > High Availability

*Panorama Web Interface : Panorama &gt; High Availability*

## Panorama > High Availability


To enable [high availability (HA) on Panorama](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-high-availability.html), configure the settings as described in the following table.



| Panorama HA Settings | Description |
| --- | --- |
| Setup Click Edit ( ) to configure the following settings. | |
| Enable HA | Select to enable HA. |
| Peer HA IP Address | Enter the IP address of the MGT interface on the peer. |
| Enable Encryption | When enabled, the MGT interface encrypts communication between the HA peers. Before enabling encryption, export the HA key from each HA peer and import the key into the other peer. You import and export the HA key on the **Panorama** > **Certificate Management** > **Certificates** page (see [Manage Firewall and Panorama Certificates](manage-firewall-and-panorama-certificates.html#ID0E1U5Y)). Note:  |







 Monitor Hold Time (ms)


 Enter the number of milliseconds that the system will wait before acting on a control link failure (range is 1,000 to 60,000; default is 3,000).




 Election Settings
 Click Edit ( ) to configure the following settings.




 Priority
 (`Required on the Panorama virtual appliance`)


 This setting determines which peer is the primary recipient for firewall logs. Assign one peer as **Primary** and the other as **Secondary** in the HA pair.
 When you configure [Log Storage Partitions for a Panorama Virtual Appliance in Legacy Mode](log-storage-partitions-for-a-panorama-virtual-appliance-in-legacy-mode.html#ID0EVCP2), you can use its internal disk (default) or a Network File System (NFS) for log storage. If you configure an NFS, only the primary recipient receives the firewall logs. If you configure internal disk storage, the firewalls send logs to both the primary and the secondary peer by default but you can change this by enabling **Only Active Primary Logs to Local Disk** in the [Logging and Reporting Settings](device-setup-management.html#ID0EGXYW).




 Preemptive


 Select to enable the primary Panorama to resume active operation after recovering from a failure. When disabled, the secondary Panorama remains active even after the primary Panorama recovers from a failure.




 HA Timer Settings


 Your selection determines the values for the remaining HA election settings, which control the failover speed:



| • | **Recommended**—Select for typical (default) failover timer settings. To see the associated values, select **Advanced** and **Load Recommended**. |
| --- | --- |






| • | **Aggressive**—Select for faster failover timer settings. To see the associated values, select **Advanced** and **Load Aggressive**. |
| --- | --- |






| • | **Advanced**—Select to display the remaining HA election settings and customize their values. |
| --- | --- |



 See the **Recommended** and **Aggressive** values for the following settings.




 Promotion Hold Time (ms)


 Enter the number of milliseconds (range is 0 to 60,000) the secondary Panorama peer waits before taking over after the primary peer goes down. The recommended (default) value is 2,000; the aggressive value is 500.




 Hello Interval (ms)


 Enter the number of milliseconds (range is 8,000 to 60,000) between hello packets that are sent to verify that the other peer is operational. The recommended (default) and aggressive value is 8,000.




 Heartbeat Interval (ms)


 Specify the frequency in milliseconds (range is 1,000 to 60,000) at which Panorama sends ICMP pings to the HA peer. The recommended (default) value is 2,000; the aggressive value is 1,000.




 Preemption Hold Time (min)


 This field applies only if you also select **Preemptive**. Enter the number of minutes (range is 1 to 60) the passive Panorama peer will wait before falling back to active status after it recovers from an event that caused failover. The recommended (default) and aggressive value is 1.




 Monitor Fail Hold Up Time (ms)


 Specify the number of milliseconds (range is 0 to 60,000) Panorama waits after a path monitor failure before attempting to re-enter the passive state. During this period, the passive peer is not available to take over for the active peer in the event of failure. This interval enables Panorama to avoid a failover due to the occasional flapping of neighboring devices. The recommended (default) and aggressive value is 0.




 Additional Master Hold Up Time (ms)


 Specify the number of milliseconds (range is 0 to 60,000) during which the preempting peer remains in the passive state before taking over as the active peer. The recommended (default) value is 7,000; the aggressive value is 5,000.




 Path Monitoring
 Click Edit ( ) to configure [HA path monitoring](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/panorama-high-availability/failover-triggers.html).




 Enabled


 Select to enable path monitoring. Path monitoring enables Panorama to monitor specified destination IP addresses by sending ICMP ping messages to verify that they are responsive.




 Failure Condition


 Select whether a failover occurs when **Any** or **All** of the monitored path groups fail to respond.




 Path Group
 To create a path group for HA path monitoring, click **Add** and complete the following fields.




 Name


 Specify a name for the path group.




 Enabled


 Select to enable the path group.




 Failure Condition


 Select whether a failure occurs when **Any** or **All** of the specified destination addresses fails to respond.




 Ping Interval


 Specify the number of milliseconds between the ICMP echo messages that verify that the path to the destination IP address is up (range is 1,000 to 60,000; default is 5,000).




 Ping Count


 Specify the number of failed pings before declaring a failure (range is 3 to 10; default is 3).




 Destination IPs


 Enter one or more destination IP addresses to monitor. Use commas to separate multiple addresses.



 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)