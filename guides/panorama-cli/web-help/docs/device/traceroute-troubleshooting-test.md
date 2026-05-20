# Trace Route

*Device : Device &gt; Troubleshooting : Trace Route*

Trace Route


| Field | Description |
| --- | --- |
| Select Test | Select the connectivity test to execute. |
| (`Panorama only`) Select device | **Select device/VSYS** to specify which devices and virtual systems for which to test the policy functionality. Admin and device group & Template users are presented with the devices and virtual systems based on their access domain. Additionally, you can select the Panorama management server as a device. |
| (`Panorama only`) Selected Devices | Lists the devices and virtual systems selected for testing. |
| Use IPv4 | Enable to use the IPv4 address of the selected devices. |
| Use IPv6 | Enable to use the IPv6 address of the selected devices. |
| First TTL | Enter the time-to-live used in the first outgoing probe packet (range is 1 to 255). |
| Max TTL | Enter the maximum time-to-live hops (range is 1 to 255). |
| Port | Enter the base port number used in probe. |
| ToS | Enter the IP type-of-service value (range is 1 to 255). |
| Wait | Enter the number of seconds to wait for a response (range is 1 to 99,999). |
| Pause | Enter the time, in milliseconds, to pause between probes (range is 1 to 2,000,000,000). |
| Set the “don’t fragment” bit | Enable this option to not fragment the ICMP packet in to multiple packets if the path cannot support the configured maximum transmission unit (MTU). |
| Enable socket level debugging | Enable this option to allows you to debug on the socket level. |
| Gateway | Specify a maximum of 8 loose source route gateways. |
| Don’t attempt to print addresses symbolically | Enable this option to display IP addresses in test results and not resolve the IP address hostname. Disable (clear) to resolve IP address hostnames. |
| Bypass routing tables and send directly to a host | Enable this option to bypass any configured routing tables and test directly with the host. |
| Source | Enter a source address in outgoing probe packets. |
| Host | Enter the hostname or IP address of the remote host. |
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






 Parent topic
 [Device > Troubleshooting](device-troubleshooting.html#ID0ECAQY)