# Log Collector RAID Disk Settings

*Panorama Web Interface : Panorama &gt; Managed Collectors : Log Collector Configuration : Log Collector RAID Disk Settings*

Log Collector RAID Disk Settings



| • | Panorama > Managed Collectors > Disks |
| --- | --- |




After you configure logging disks on the [M-Series appliance](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-the-m-series-appliance/increase-storage-on-the-m-series-appliance.html) or [Panorama virtual appliance](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-the-panorama-virtual-appliance/expand-log-storage-capacity-on-the-panorama-virtual-appliance.html), you can **Add** them to the Log Collector configuration.


By default, M-Series appliances are shipped with the first RAID 1 disk pair installed in bays A1 and A2. In the software, the disk pair in bays A1 and A2 is named Disk Pair A. The remaining bays are named sequentially: Disk Pair B, Disk Pair C, and so on. For example, the M-600 appliance supports up to 12 disk pairs. You can [install pairs of 8TB disks](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-the-m-series-appliance/increase-storage-on-the-m-series-appliance.html) within the same appliance.


The Panorama virtual appliance supports up to 12 virtual logging disks for 24TB of storage capacity.


After you add disk pairs, the Log Collector redistributes its existing logs across all the disks, which can take hours for each terabyte of logs. During the redistribution process, the maximum log ingestion rate is reduced. In the **Panorama** > **Managed Collectors** page, the Log Redistribution State column indicates the completion status of the process as a percentage.

 Tip:
 If you use an [SNMP manager](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/administer-panorama/monitor-panorama.html) for centralized monitoring, you can see loggings statistics in the panLogCollector MIB.
 Parent topic
 [Log Collector Configuration](log-collector-configuration.html#ID0E4JP3)