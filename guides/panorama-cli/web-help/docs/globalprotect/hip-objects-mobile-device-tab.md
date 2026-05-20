# HIP Objects Mobile Device Tab

*GlobalProtect : Objects &gt; GlobalProtect &gt; HIP Objects : HIP Objects Mobile Device Tab*

HIP Objects Mobile Device Tab



| • | **Objects** > **GlobalProtect** > **HIP Objects** > <hip-object> > **Mobile Device** |
| --- | --- |




Select the **Mobile Device** tab to enable HIP matching on data collected from mobile devices that run the GlobalProtect app.

 Note:



| | To collect mobile device attributes and utilize them in HIP enforcement policies, GlobalProtect requires an MDM server. GlobalProtect currently supports HIP integration with the AirWatch MDM server. |
| --- | --- |





| HIP Object Mobile Device Settings | Description |
| --- | --- |
| Mobile Device | Select this option to enable filtering on host data collected from mobile devices that are running the GlobalProtect app and to enable the [Device](hip-objects-mobile-device-tab.html#ID0EM651), [Settings](hip-objects-mobile-device-tab.html#ID0EM651), and [Apps](hip-objects-mobile-device-tab.html#ID0EM651) tabs. |
| Device tab | • |






| • | **Tag**—To match on tag value defined on the GlobalProtect Mobile Security Manager, choose an operator from the first drop-down and then select a tag from the second drop-down. |
| --- | --- |






| • | **Phone Number**—To match on all or part of a device phone number, choose an operator from the drop-down and enter a string to match. |
| --- | --- |






| • | **IMEI**—To match on all or part of a device International Mobile Equipment Identity (IMEI) number, choose an operator from the drop-down and enter a string to match. |
| --- | --- |







 Settings tab





| • | **Passcode**—Filter based on whether the device has a passcode set. To match devices that have a passcode set, select **Yes**. To match devices that do not have a passcode set, select no. |
| --- | --- |






| • | **Rooted/Jailbroken**—Filter based on whether the device has been rooted or jailbroken. To match devices that have been rooted or jailbroken, select **Yes**. To match devices that have not been rooted or jailbroken, select **No**. |
| --- | --- |






| • | **Disk Encryption**—Filter based on whether the device data has been encrypted. To match devices that have disk encryption enabled, select yes. To match devices that do not have disk encryption enabled, select no. |
| --- | --- |






| • | **Time Since Last Check-in**—Filter based on when the device last checked in with the MDM. Select an operator from the drop-down and then specify the number of days for the check-in window. For example, you could define the object to match devices that have not checked in within the last 5 days. |
| --- | --- |







 Apps tab





| • | **Apps**—(`Android devices only`) Select this option to enable filtering based on the apps that are installed on the device and whether or not the device has any malware-infected apps installed. |
| --- | --- |






| • | **Criteria** tab |
| --- | --- |






| ◦ | **Has Malware**—Select **Yes** to match devices that have malware-infected apps installed. Select **No** to match devices that do not have malware-infected apps installed. Select **None** to not use **Has Malware** as match criteria. |
| --- | --- |






| • | **Include** tab |
| --- | --- |






| ◦ | **Package**—To match devices that have specific apps installed, **Add** an app and enter the unique app name in reverse DNS format. For example, com.netflix.mediaclient and then enter the corresponding app **Hash**, which the GlobalProtect app calculates and submits with the device HIP report. |
| --- | --- |






 Parent topic
 [Objects > GlobalProtect > HIP Objects](objects-globalprotect-hip-objects.html#ID0EFM41)