# Cluster Config

*Device : Device &gt; High Availability : Cluster Config*

Cluster Config



| • | Device > High Availability > Cluster Config |
| --- | --- |




Add members to an HA cluster by selecting **Device** > **High Availability** > **Cluster Config**.



| Cluster Config | Description |
| --- | --- |
| **Add** | **Add** a cluster member. You must add the local firewall and if you are using HA pairs, you must add both HA peers of the pair as cluster members. • |






| • | (`Panorama`) **Device**—Select a device from the dropdown and enter a **Device Name**. |
| --- | --- |






| • | **HA4 IP Address**—Enter the IP address of the HA4 link for the cluster member. |
| --- | --- |






| • | **HA4 Backup IP Address**—Enter the IP address of the backup HA4 link for the cluster member. |
| --- | --- |






| • | **Session Synchronization**—Select to enable session synchronization with this cluster member. |
| --- | --- |






| • | **Description**—Enter helpful description. |
| --- | --- |







 **Delete**


 Select one or more cluster members and **Delete** them from the cluster.




 **Enable**


 (`Supported firewalls`) You can determine whether or not a cluster member synchronizes sessions with other members. By default, all members are allowed to synchronize sessions. If you disable synchronization for one or more members, select **Enable** to re-enable synchronization for one or more members.




 **Disable**


 (`Supported firewalls`) Select one or more members and **Disable** synchronization with other members.




 **Refresh**


 (`Panorama`) Select **Refresh** to refresh the list of HA devices in the HA cluster.



 Parent topic
 [Device > High Availability](device-high-availability.html#ID0EOYXX)