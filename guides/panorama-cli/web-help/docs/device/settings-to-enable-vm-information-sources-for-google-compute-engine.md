# Settings to Enable VM Information Sources for Google Compute Engine

*Device : Device &gt; VM Information Sources : Settings to Enable VM Information Sources for Google Compute Engine*

Settings to Enable VM Information Sources for Google Compute Engine

**Device** > **VM Information Sources** > **Add**


The following table describes the settings you need to configure to enable VM Information Sources for Google Compute Engine instances on Google Cloud Platform. Enable monitoring of Google Compute Engine (GCE) instances to allow the firewall (physical or virtual on-premise, or running in Google Cloud) to retrieve tag, label, and other metadata about the instances running in a particular Google Cloud zone of the specified project. For information on the VM-Series on Google Cloud Platform, refer to the [VM-Series Deployment Guide](https://docs.paloaltonetworks.com/vm-series/11-1/vm-series-deployment.html).



| Settings to Enable VM Information Sources for Google Compute Engine |
| --- |
| Name |
| Type |
| Description |
| Enabled |






| • | —Disconnected |
| --- | --- |






| • | —Pending or the monitored source is disabled. |
| --- | --- |



 Clear the **Enabled** option to disable communication between the configured source and the firewall.
 When you disable communication, all the registered IP address and tags are removed from the associated dynamic address group. This means that policy rules will not apply to the GCE instances from this Google Cloud Project.




 Service Authentication Type


 Select VM-Series running on GCE or Service Account.



| • | **VM-Series running on GCE**—Select this option if the hardware-based or VM-Series firewall on which you are enabling VM Monitoring is not deployed within the Google Cloud Platform. |
| --- | --- |






| • | **Service Account**—Select this option if you are monitoring Google Cloud Engine instances on a firewall that is not deployed on the Google Cloud Platform. This option allows you to use a special Google account that belongs to the virtual machine or application instead of using an individual end-user account. |
| --- | --- |



 The service account must have the IAM policies (**Compute Engine** > **Compute Viewer** privilege) that authorize access to the Google API and that allow it to query the virtual machines in the Google Cloud Project for virtual machine metadata.




 Service Account Credential


 (`Only for Service Account`) Upload the JSON file with the credentials for the service account. This file allows the firewall to authenticate to the instance and authorizes access to the metadata.
 You can create an account on the Google Cloud console (**IAM & admin** > **Service Accounts**). Refer to the Google documentation for information on how to create an account, add a key to it, and download the JSON file that you need to upload to the firewall.




 Project ID


 Enter the alphanumeric text string that uniquely identifies the Google Cloud Project that you want to monitor.




 Zone Name


 Enter the zone information as a string of up to 63 characters in length. For example: us-west1-a.




 Update Interval


 Specify the interval (in seconds) at which the firewall retrieves information from the source (range is 60 to 1,200; default is 60).




 Timeout


 The interval (in hours) after which the connection to the monitored source is closed if the host does not respond (default is 2).
 (`Optional`) **Enable timeout when the source is disconnected**. When the specified limit is reached, if the source is inaccessible or does not respond, the firewall will close the connection to the source. When the source is disconnected, all the IP addresses and tags that were registered from this project are removed from the dynamic address group.



 Parent topic
 [Device > VM Information Sources](device-vm-information-sources.html#ID0EGQMY)