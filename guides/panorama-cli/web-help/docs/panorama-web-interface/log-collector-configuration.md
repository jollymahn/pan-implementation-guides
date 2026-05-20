# Log Collector Configuration

*Panorama Web Interface : Panorama &gt; Managed Collectors : Log Collector Configuration*

Log Collector Configuration

Select **Panorama** > **Managed Collectors** to manage Log Collectors. When you **Add** a new Log Collector as a managed collector, the settings you configure vary based on the location of the Log Collector and whether you deployed Panorama in a high availability (HA) configuration:




| • | **Dedicated Log Collector**—When you add the Log Collector, initially the **Interfaces** tab doesn’t display. You must enter the serial number (**Collector S/N**) of the Log Collector, click **OK**, and then edit the Log Collector to display the interface settings. |
| --- | --- |






| • | **Default Log Collector that is local to the solitary (non-HA) or active (HA) Panorama management server**—After you enter the serial number (**Collector S/N**) of the Panorama management server, the Collector dialog displays only the **Disks**, **Communication** settings, and a subset of the **General** settings. The Log Collector derives its values for all other settings from the configuration of the Panorama management server. |
| --- | --- |






| • | (`HA only`) **Default Log Collector that is local to the passive Panorama management server**—Panorama treats this Log Collector as remote so you must configure it as you would configure a Dedicated Log Collector. |
| --- | --- |



 Note:



| | The complete procedure to [configure a Log Collector](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-log-collection/configure-a-managed-collector.html) requires additional tasks. |
| --- | --- |





| What are you looking for? | See: |
| --- | --- |
| Identify the Log Collector and define its connections to the Panorama management server and to external services. | [General Log Collector Settings](general-log-collector-settings.html#ID0EP5P3) |
| Configure access to the Log Collector CLI. | [Log Collector Authentication Settings](log-collector-authentication-settings.html#ID0EORQ3) |
| Configure the interfaces that the Dedicated Log Collector uses for management traffic, Collector Group communication, and log collection. | [Log Collector Interface Settings](log-collector-interface-settings.html#ID0EFER3) |
| Configure the RAID disks that store logs collected from firewalls. | [Log Collector RAID Disk Settings](log-collector-raid-disk-settings.html#ID0E62R3) |
| Configure the Log Collector to authenticate with Windows User-ID Agents. | [Connection Security](connection-security.html#ID0ERCS3) |
| Configure security settings for communication with Panorama, other Log Collectors, and firewalls. | [Communication Settings](communication-settings.html#ID0EGKS3) |


 Parent topic
 [Panorama > Managed Collectors](panorama-managed-collectors.html#ID0E3IO3)