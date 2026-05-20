# Security Policy Match

*Device : Device &gt; Troubleshooting : Security Policy Match*

Security Policy Match


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
| Destination Port | Enter the specific destination port for which traffic is intended. |
| Source User | Enter the user from which the traffic originated. |
| Protocol | Enter the IP protocol used for routing. Can be 0 to 255. |
| Show all potential match rules until first allow rule | Enable this option to show all potential rule matches until the first matched rule result. Disable (clear) to return only the first matched rule in the test results. |
| Application | Select the application traffic you want to test. |
| Category | Select the traffic category you want to test. |
| (`Firewall only`) Check HIP mask | Select to check the security status of the end device that is accessing your network. |
| Results | Select to view the Result Details of the executed test. (`Panorama only`) When executing the test for multiple managed devices, the Results display the following information for each device tested: • |






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