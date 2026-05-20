# Routing

*Device : Device &gt; Troubleshooting : Routing*

Routing


| Field | Description |
| --- | --- |
| Select Test | Select the connectivity test to execute. |
| (`Panorama only`) Select device | **Select device/VSYS** to specify which devices and virtual systems for which to test the policy functionality. Admin and device group & Template users are presented with the devices and virtual systems based on their access domain. Additionally, you can select the Panorama management server as a device. |
| (`Panorama only`) Selected Devices | Lists the devices and virtual systems selected for testing. |
| FiB Lookup, Mfib Lookup | Select one of the following for Lookup: • |






| • | **Mfib**—Perform multicast route lookup within active route table |
| --- | --- |







 Destination IP


 Enter the IP address for which the traffic is intended .




 Virtual Router


 Specific virtual router within which the routing test is performed. Select the virtual router from the drop-down.




 ECMP




 Source IP


 Enter the specific IP address from which the traffic originated.




 Source Port


 Enter the specific port from which the traffic originated.




 Destination IP


 Enter the specific IP address for which the traffic is intended.




 Destination Port


 Enter the specific destination port for which the traffic is intended.




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






 Parent topic
 [Device > Troubleshooting](device-troubleshooting.html#ID0ECAQY)