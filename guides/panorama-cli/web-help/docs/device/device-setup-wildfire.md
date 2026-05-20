# Device > Setup > WildFire

*Device : Device &gt; Setup &gt; WildFire*

## Device > Setup > WildFire


Select **Device** > **Setup** > **WildFire** to configure [WildFire](https://docs.paloaltonetworks.com/advanced-wildfire/wildfire-appliance/set-up-and-manage-a-wildfire-appliance) settings on the firewall and Panorama. You can enable both the WildFire cloud and a WildFire appliance to be used to perform file analysis. You can also set file size limits and session information that will be reported. After populating WildFire settings, you can specify what files to forward to the WildFire cloud or the WildFire appliance by creating a **WildFire Analysis** profile (**Objects** > **Security Profiles** > **WildFire Analysis**).

 Note:



| | To forward decrypted content to WildFire, refer to [Forward Decrypted SSL Traffic for WildFire Analysis](https://docs.paloaltonetworks.com/advanced-wildfire/administration/configure-advanced-wildfire-analysis/forward-decrypted-ssl-traffic-for-advanced-wildfire-analysis.html). |
| --- | --- |





| WildFire Settings | Description |
| --- | --- |
| General Settings | |
| WildFire Public Cloud | Enter wildfire.paloaltonetworks.com to send files to the WildFire global cloud (U.S.), hosted in the United States, for analysis. Alternatively, you can instead send files to a [WildFire regional cloud](https://docs.paloaltonetworks.com/advanced-wildfire/administration/advanced-wildfire-overview/advanced-wildfire-deployments.html) for analysis. Regional clouds are designed to adhere to the data privacy expectations you might have depending on your location. Fastpath:  Forward samples to a regional WildFire cloud to ensure adherence to the data privacy and compliance standards specific to your region. Regional clouds are: • |






| • | Japan—jp.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Singapore—sg.wildfire.paloaltonetworks.com |
| --- | --- |






| • | United Kingdom—uk.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Canada—ca.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Australia—au.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Germany—de.wildfire.paloaltonetworks.com |
| --- | --- |






| • | India—in.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Switzerland—ch.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Poland—pl.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Indonesia—id.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Taiwan—tw.wildfire.paloaltonetworks.com |
| --- | --- |






| • | France—fr.wildfire.paloaltonetworks.com |
| --- | --- |






| • | Qatar—qatar.wildfire.paloaltonetworks.com |
| --- | --- |







 WildFire Private Cloud


 Specify the IPv4/IPv6 address or FQDN of the WildFire appliance.
 The firewall sends files for analysis to the specified WildFire appliance.
 Panorama collects threat IDs from the WildFire appliance to enable the addition of threat exceptions in Anti-Spyware profiles (for DNS signatures only) and Antivirus profiles that you configure in device groups. Panorama also collects information from the WildFire appliance to populate fields that are missing in the WildFire Submissions logs received from firewalls running software versions earlier than PAN-OS 7.0.




 File Size Limits


 Specify the maximum file size that will be forwarded to the WildFire server. For all best practice recommendations about file size limits, if the limit is too large and prevents the firewall from forwarding multiple large zero-day files at the same time, lower and tune the maximum limit based on the amount of available firewall buffer space. If more buffer space is available, you can increase the file size limit above the best practice recommendation. The best practice recommendations are a good starting place for setting effective limits that don’t overtax firewall resources. Available ranges are:



| • | **pe** (Portable Executable)—Range is 1 to 50MB; default is 16MB. |
| --- | --- |



 Fastpath:
 Set the size for PE files to 16MB.



| • | **apk** (Android Application)—Range is 1 to 50MB; default 10MB. |
| --- | --- |



 Fastpath:
 Set the size for APK files to 10MB.



| • | **pdf** (Portable Document Format)—Range is 100KB to 51,200KB; default is 3,072KB. |
| --- | --- |



 Fastpath:
 Set the size for PDF files to 3,072KB.



| • | **ms-office** (Microsoft Office)—Range is 200KB to 51,200KB; default is 16,384KB. |
| --- | --- |



 Fastpath:
 Set the size for ms-office files to 16,384KB.



| • | **jar** (Packaged Java class file)—Range is 1 to 20MB; default is 5MB. |
| --- | --- |



 Fastpath:
 Set the size for jar files to 5MB.



| • | **flash** (Adobe Flash)—Range is 1 to 10MB; default is 5MB. |
| --- | --- |



 Fastpath:
 Set the size for flash files to 5MB.



| • | **MacOSX** (DMG/MAC-APP/MACH-O PKG files)—Range is 1 to 50MB; default is 10MB. |
| --- | --- |



 Fastpath:
 Set the size for MacOSX files to 1MB.



| • | **archive** (RAR and 7z files)—Range is 1 to 50MB; default is 50MB. |
| --- | --- |



 Fastpath:
 Set the size for archive files to 50MB.



| • | **linux** (ELF files)—Range is 1 to 50MB; default is 50MB. |
| --- | --- |



 Fastpath:
 Set the size for linux files to 50MB.



| • | **script** (JScript, VBScript, PowerShell, and Shell Script files)—Range is 10 to 4096KB; default is 20KB. |
| --- | --- |



 Fastpath:
 Set the size for script files to 20KB.
 Note:



| | The preceding values might differ based on the current version of PAN-OS or the content release. To see valid ranges, click in the **Size Limit** field; a pop-up displays the available range and default value. |
| --- | --- |







 Report Benign Files


 When this option is enabled (disabled by default), files analyzed by WildFire that are determined to be benign will appear in the **Monitor** > **WildFire Submissions** log.
 Even if this option is enabled on the firewall, email links that WildFire deems benign will not be logged because of the potential quantity of links processed.




 Report Grayware Files


 When this option is enabled (disabled by default), files analyzed by WildFire that are determined to be grayware will appear in the **Monitor** > **WildFire Submissions** log.
 Note:



| | Even if this option is enabled on the firewall, email links that WildFire determines to be grayware will not be logged because of the potential quantity of links processed. |
| --- | --- |



 Fastpath:
 Enable reporting grayware files to log session information, network activity, host activity, and other information that helps with analytics.




 Session Information Settings




 Settings


 Specify the information to be forwarded to the WildFire server. By default, all are selected and the best practice is to forward all session information to provide statistics and other metrics that enable you to take actions to prevent threat events:



| • | **Source IP**—Source IP address that sent the suspected file. |
| --- | --- |






| • | **Source Port**—Source port that sent the suspected file. |
| --- | --- |






| • | **Destination IP**—Destination IP address for the suspected file. |
| --- | --- |






| • | **Destination Port**—Destination port for the suspected file. |
| --- | --- |






| • | **Vsys**—Firewall virtual system that identified the possible malware. |
| --- | --- |






| • | **Application**—User application that was used to transmit the file. |
| --- | --- |






| • | **User**—Targeted user. |
| --- | --- |






| • | **URL**—URL associated with the suspected file. |
| --- | --- |






| • | **Filename**—Name of the file that was sent. |
| --- | --- |






| • | **Email sender**—Provides the sender name in WildFire logs and WildFire detailed reports when a malicious email link is detected in SMTP and POP3 traffic. |
| --- | --- |






| • | **Email recipient**—Provides the recipient name in WildFire logs and WildFire detailed reports when a malicious email link is detected in SMTP and POP3 traffic. |
| --- | --- |






| • | **Email subject**—Provides the email subject in WildFire logs and WildFire detailed reports when a malicious email link is detected in SMTP and POP3 traffic. |
| --- | --- |







 Inline Cloud Analysis Settings




 File Size Limits


 View the maximum file sizes that Advanced WildFire Inline Cloud Analysis can submit and analyze for malware. File sizes larger than the limit are not processed by the Advanced WildFire cloud.
 Note:



| | The maximum file size values are determined by Palo Alto Networks and are periodically updated to provide maximum performance and coverage. |
| --- | --- |







 Inline Session Information Settings




 Settings


 Specify the information to be forwarded to the Advanced WildFire cloud when samples are sent for processing through Advanced WildFire Inline Cloud Analysis. By default, all are selected and the best practice is to forward all session information to provide statistics and other metrics that enable you to take actions to prevent threat events:



| • | **Source IP**—Source IP address that sent the suspected file. |
| --- | --- |






| • | **Source Port**—Source port that sent the suspected file. |
| --- | --- |






| • | **Destination IP**—Destination IP address for the suspected file. |
| --- | --- |






| • | **Destination Port**—Destination port for the suspected file. |
| --- | --- |






| • | **Vsys**—Firewall virtual system that identified the possible malware. |
| --- | --- |






| • | **Application**—User application that was used to transmit the file. |
| --- | --- |






| • | **User**—Targeted user. |
| --- | --- |






| • | **URL**—URL associated with the suspected file. |
| --- | --- |






| • | **Filename**—Name of the file that was sent. |
| --- | --- |






| • | **Email sender**—Provides the sender name in WildFire logs and WildFire detailed reports when a malicious email link is detected in SMTP and POP3 traffic. |
| --- | --- |






| • | **Email recipient**—Provides the recipient name in WildFire logs and WildFire detailed reports when a malicious email link is detected in SMTP and POP3 traffic. |
| --- | --- |






| • | **Email subject**—Provides the email subject in WildFire logs and WildFire detailed reports when a malicious email link is detected in SMTP and POP3 traffic. |
| --- | --- |






 Parent topic
 [Device](device.html#ID0EY2QW)