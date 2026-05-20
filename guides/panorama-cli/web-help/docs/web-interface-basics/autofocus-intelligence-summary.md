# AutoFocus Intelligence Summary

*Web Interface Basics : AutoFocus Intelligence Summary*

## AutoFocus Intelligence Summary


You can view a graphical overview of threat intelligence that AutoFocus compiles to help you assess the pervasiveness and risk of the following firewall artifacts:




| • | IP Address |
| --- | --- |






| • | URL |
| --- | --- |






| • | Domain |
| --- | --- |






| • | User agent (found in the User Agent column of Data Filtering logs) |
| --- | --- |






| • | Threat name (only for threats of the subtypes virus and wildfire-virus) |
| --- | --- |






| • | Filename |
| --- | --- |






| • | SHA-256 hash (found in the File Digest column of WildFire Submissions logs) |
| --- | --- |




To view the AutoFocus Intelligence Summary window, you must first have an active AutoFocus subscription and enable AutoFocus threat intelligence (select **Device** > **Setup** > **Management** and edit the AutoFocus settings).


After you’ve enabled AutoFocus intelligence, hover over a log or external dynamic list artifact to open the drop-down ( ) and then click **AutoFocus**:




| • | View Traffic, Threat, URL Filtering, WildFire Submissions, Data Filtering, and Unified logs (**Monitor** > **Logs**). |
| --- | --- |






| • | [View external dynamic list entries](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-an-external-dynamic-list-in-policy/view-external-dynamic-list-entries.html). |
| --- | --- |




You can also launch an AutoFocus search from the firewall, to further investigate interesting or suspicious artifacts that you find.



| Field/Button | Description |
| --- | --- |
| Search AutoFocus for... | Click to launch an AutoFocus search for the artifact. |
| Analysis Information Tab | |
| Sessions | The number of private sessions in which WildFire detected the artifact. Private sessions are sessions running only on firewalls associated with your support account. Hover over a session bar to view the number of sessions per month. |
| Samples | Organization and global samples (files and email links) associated with the artifact and grouped by WildFire verdict (benign, grayware, malware, phishing). Global refers to samples from all WildFire submissions, while organization refers only to samples submitted to WildFire by your organization. Click on a WildFire verdict to launch an AutoFocus search for the artifact filtered by scope (organization or global) and WildFire verdict. |
| Matching Tags | [AutoFocus tags](https://docs.paloaltonetworks.com/autofocus/autofocus-admin/autofocus-tags/tag-concepts.html) matched to the artifact: • |






| • | **Public Tags**—Visible to all AutoFocus users. |
| --- | --- |






| • | **Unit 42 Tags**—Identify threats and campaigns that pose a direct security risk. These tags are created by Unit 42 (the Palo Alto Networks threat intelligence and research team). |
| --- | --- |






| • | **Informational Tags**—Unit 42 tags that identify commodity threats. |
| --- | --- |



 Hover over a tag to view the tag description and other tag details.
 Click a tag to launch an AutoFocus search for that tag.
 To view more matching tags for an artifact, click the ellipsis ( ... ) to launch an AutoFocus search for that artifact. The Tags column in the AutoFocus search results displays more matching tags for the artifact.




 Passive DNS Tab
 The Passive DNS tab displays passive DNS history associated with the artifact. This tab only displays matching information if the artifact is an IP address, domain, or URL.




 Request


 The domain that submitted a DNS request. Click the domain to launch an AutoFocus search for it.




 Type


 The DNS request type (example: A, NS, CNAME).




 Response


 The IP address or domain to which the DNS request resolved. Click the IP address or domain to launch an AutoFocus search.
 Note:



| | The Response column does not display private IP addresses. |
| --- | --- |







 Count


 The number of times the request was made.




 First Seen


 The date and time that the Request, Response, and Type combination was first seen based on passive DNS history.




 Last Seen


 The date and time that the Request, Response, and Type combination was most recently seen based on passive DNS history.




 Matching Hashes Tab
 The Matching Hashes tab displays the five most recent private samples where WildFire detected the artifact. Private samples are samples detected only on firewalls associated with your support account.




 SHA256


 The SHA-256 hash for a sample. Click the hash to launch an AutoFocus search for that hash.




 File Type


 The file type of the sample.




 Create Date


 The date and time that WildFire analyzed a sample and assigned a WildFire verdict to it.




 Update Date


 The date and time that WildFire updated the WildFire verdict for a sample.




 Verdict


 The WildFire verdict for a sample: benign, grayware, malware, or phishing.



 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)