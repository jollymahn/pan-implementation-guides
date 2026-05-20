# Log Storage Partitions for a Panorama Virtual Appliance in Legacy Mode

*Panorama Web Interface : Log Storage Partitions for a Panorama Virtual Appliance in Legacy Mode*

## Log Storage Partitions for a Panorama Virtual Appliance in Legacy Mode




| • | Panorama > Setup > Operations |
| --- | --- |




By default, a Panorama virtual appliance in Legacy mode has a single disk partition for all data in which 10.89GB is allocated for log storage. Increasing disk size does not increase the log storage capacity; however, you can modify the log storage capacity using the following options:




| • | **Network File System (NFS)**—The option to mount NFS storage is available only for a Panorama virtual appliance that is in Legacy mode and running on a VMware ESXi server. To mount NFS storage, select **Storage Partition Setup** in the Miscellaneous section, set the **Storage Partition** to **NFS V3**, and configure the settings as described in [Table: NFS Storage Settings](log-storage-partitions-for-a-panorama-virtual-appliance-in-legacy-mode.html#ID0E4KP2). |
| --- | --- |






| • | **Default internal storage**—Revert to the default internal storage partition (applicable only to Panorama on an ESXi server or on the vCloud Air platform where you previously configured another virtual logging disk or mounted to an NFS). To revert to the default internal storage partition, select **Storage Partition Setup** in the Miscellaneous section and set the **Storage Partition** to **Internal**. |
| --- | --- |






| • | **Virtual logging disk**—You can [add another virtual disk](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/set-up-panorama/set-up-the-panorama-virtual-appliance/expand-log-storage-capacity-on-the-panorama-virtual-appliance.html) (up to 8TB) for Panorama running on VMware ESXi version 5.5 and later releases or for Panorama running on the VMware vCloud Air platform. However, Panorama stops using the default 10.89GB log storage on the original disk and copies any existing logs to the new disk. (Earlier ESXi versions support only up to 2TB virtual disks.) |
| --- | --- |



 CAUTION:
 You must reboot Panorama after changing the storage partition settings: select **Panorama** > **Setup** > **Operations** and **Reboot Panorama**.
 NFS storage is not available to the Panorama virtual appliance in Panorama mode or to M-Series appliances.


| Panorama Storage Partition Settings—NFS V3 | Description |
| --- | --- |
| Server | Specify the FQDN or IP address of the NFS server. |
| Log Directory | Specify the full path name of the directory where the logs will reside. |
| Protocol | Specify the protocol (UDP or TCP) for communication with the NFS server. |
| Port | Specify the port for communication with the NFS server. |
| Read Size | Specify the maximum size in bytes (range is 256 to 32,768) for NFS read operations. |
| Write Size | Specify the maximum size in bytes (range is 256 to 32,768) for NFS write operations. |
| Copy on Setup | Select to mount the NFS partition and copy any existing logs to the destination directory on the server when Panorama boots. |
| Test Logging Partitions | Select to perform a test that mounts the NFS partition and presents a success or failure message. |


 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)