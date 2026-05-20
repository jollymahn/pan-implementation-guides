# Settings to Enable VM Information Sources for AWS VPC

*Device : Device &gt; VM Information Sources : Settings to Enable VM Information Sources for AWS VPC*

Settings to Enable VM Information Sources for AWS VPC

The following table describes the setting you configure to enable VM information sources for an AWS VPC.



| Settings to Enable VM Information Sources for AWS VPC |
| --- |
| Name |
| Type |
| Description |
| Enabled |






| • | Disconnected |
| --- | --- |






| • | Pending; The connection status also displays as yellow when the monitored source is disabled. |
| --- | --- |



 Clear the **Enabled** option to disable communication between the host and the firewall.




 Source


 Add the URI in which the Virtual Private Cloud resides. For example, ec2.us-west-1.amazonaws.com
 The syntax is: ec2.<your_AWS_region>.amazonaws.com; for AWS China it is: ec2.<AWS_region>.amazonaws.com.cn




 Access Key ID


 Enter the alphanumeric text string that uniquely identifies the user who owns or is authorized to access the AWS account.
 This information is a part of the AWS Security Credentials. The firewall requires the credentials—Access Key ID and the Secret Access Key—to digitally sign API calls made to the AWS services.




 Secret Access Key


 Enter the password and confirm your entry.




 Update Interval


 Specify the interval, in seconds, at which the firewall retrieves information from the source (range is 60 to 1,200; default is 60).




 Timeout


 The interval in hours after which the connection to the monitored source is closed, if the host does not respond (default is 2)
 (`Optional`) **Enable timeout when the source is disconnected**. When the specified limit is reached, if the source is inaccessible, or if the source does not respond, the firewall will close the connection to the source.




 VPC ID


 Enter the ID of the AWS-VPC to monitor, for example, vpc-1a2b3c4d. Only EC2 instances that are deployed within this VPC are monitored.
 If your account is configured to use a default VPC, the default VPC ID will be listed under AWS Account Attributes.



 Parent topic
 [Device > VM Information Sources](device-vm-information-sources.html#ID0EGQMY)