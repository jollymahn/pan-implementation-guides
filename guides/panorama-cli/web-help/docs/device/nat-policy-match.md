# NAT Policy Match

*Device : Device &gt; Troubleshooting : NAT Policy Match*

NAT Policy Match


| Field | Description |
| --- | --- |
| Test Configuration | |
| Select Test | Select the policy match test to execute. |
| (`Panorama only`) Select device | **Select device/VSYS** to specify which devices and virtual systems for which to test the policy functionality. Admin and device group & Template users are presented with the devices and virtual systems based on their access domain. Additionally, you can select the Panorama management server as a device. |
| (`Panorama only`) Selected Devices | Lists the devices and virtual systems selected for testing. |
| From | Enter the zone where the traffic originated. |
| To | Select the destination zone of the traffic. |
| Source | Enter the IP address where the traffic originated. |
| Destination | Enter the destination IP address of the traffic. |
| Source Port | Enter the specific port the traffic originated from. |
| Destination Port | Enter the specific destination port for which traffic is intended. |
| Protocol | Enter the IP protocol used for routing. Can be 0 to 255. |
| To Interface | Enter the destination interface on the device for which the traffic is intended. |
| HA Device ID | Enter the ID of the HA device: • |






| • | **1**—Secondary HA peer |
| --- | --- |







 Results


 Select to view the Result Details of the executed test.
 (`Panorama only`) When executing the test for multiple managed devices, the Results display the following information for each device tested:



| • | Device Group—Name of the device group to which the firewall that is processing traffic belongs. |
| --- | --- |






| • | Firewall—Name of the firewall that is processing traffic |
| --- | --- |






| • | Status—Indicates the status of the test: Success or Failure. |
| --- | --- |






| • | Result—Displays the test result. If the test could not be performed, one of the following is displayed: |
| --- | --- |






| ◦ | N/A—Test was not applicable to the device. |
| --- | --- |






| ◦ | Device not connected—Device connection was dropped. |
| --- | --- |






| ◦ | Shared policy disabled on device—The Panorama settings on the device do not allow for the policy to be pushed from Panorama. |
| --- | --- |






 Parent topic
 [Device > Troubleshooting](device-troubleshooting.html#ID0ECAQY)