# Settings to Enable VM Information Sources for VMware ESXi and vCenter Servers

*Device : Device &gt; VM Information Sources : Settings to Enable VM Information Sources for VMware ESXi and vCenter Servers*

Settings to Enable VM Information Sources for VMware ESXi and vCenter Servers

The following table describes settings you can configure to enable VM information sources for VMware ESXi and vCenter servers.

 Note:



| | To retrieve the tags for the virtual machines, the firewall requires an account with read-only access on the VMware ESXi and vCenter servers. |
| --- | --- |





| Settings to Enable VM Information Sources for VMware ESXi or vCenter Server |
| --- |
| Name |
| Type |
| Description |
| Port |
| Enabled |






| • | Disconnected |
| --- | --- |






| • | Pending; the connection status also displays as yellow when the monitored source is disabled. |
| --- | --- |



 Clear the **Enabled** option to disable communication between the host and the firewall.




 Timeout


 Enter the interval in hours after which the connection to the monitored source is closed, if the host does not respond (range is 2–10; default is 2).
 (`Optional`) To change the default value, **Enable timeout when the source is disconnected** and specify a value. When the specified limit is reached, if the host is inaccessible, or if the host does not respond, the firewall will close the connection to the source.




 Source


 Enter the FQDN or the IP address of the host/source being monitored.




 Username


 Specify the username required to authenticate to the source.




 Password


 Enter the password and confirm your entry.




 Update Interval


 Specify the interval, in seconds, at which the firewall retrieves information from the source (range is 5–600; default is 5).



 Parent topic
 [Device > VM Information Sources](device-vm-information-sources.html#ID0EGQMY)