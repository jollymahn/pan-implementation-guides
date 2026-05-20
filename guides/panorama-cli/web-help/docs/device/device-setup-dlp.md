# Device > Setup > DLP

*Device : Device &gt; Setup &gt; DLP*

## Device > Setup > DLP




| • | **Device** > **Setup** > **DLP** |
| --- | --- |




Configure the network settings for files scanned to the Enterprise Data Loss Prevention (DLP) cloud service.



| Field | Description |
| --- | --- |
| Max Latency (sec) | Specify the maximum latency in seconds (between 1 and 240) for a file upload before an action is taken by the firewall. Default is 60. |
| Action on Max Latency | Specify the action the firewall takes when a file upload latency reaches the configured **Max Latency**. • |






| • | **Block**—Firewall blocks a file upload to the DLP cloud service that reaches the configured maximum latency. |
| --- | --- |







 Max File Size (MB)


 Enforce a maximum file size (between 1 and 20) for upload to the DLP cloud service. Default is 20.




 Action on Max File Size


 Specify the action the firewall takes when a file upload reaches the configured **Max File Sized**.



| • | **Allow** (default)— Firewall allows a file upload to continue to the DLP cloud service if the file is the configured maximum file size. |
| --- | --- |






| • | **Block**—Firewall blocks a file upload to the DLP cloud service if the file is the configured maximum file size. |
| --- | --- |







 Log Files Not Scanned


 Check (enable) to generate an alert in the data filtering log when a file could not be uploaded to the DLP cloud service.




 Action on any Error


 Specify the action the firewall takes when an error is encountered during a file upload to the DLP cloud service.



| • | **Allow** (default)— Firewall allows a file upload to continue to the DLP cloud service if an error is encountered during upload. |
| --- | --- |






| • | **Block**—Firewall blocks a file upload to the DLP cloud service if an error is encountered during upload. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)