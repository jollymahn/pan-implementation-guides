# Ping

*Device : Device &gt; Troubleshooting : Ping*

Ping

The ping troubleshooting test is only supported on firewalls running PAN-OS 9.0 or later releases.



| Field | Description |
| --- | --- |
| Select Test | Select the connectivity test to execute. |
| (`Panorama only`) Select device | **Select device/VSYS** to specify which devices and virtual systems for which to test the policy functionality. Admin and device group & Template users are presented with the devices and virtual systems based on their access domain. Additionally, you can select the Panorama management server as a device. |
| (`Panorama only`) Selected Devices | Lists the devices and virtual systems selected for testing. |
| Bypass routing table, use specified interface | Enable this option to bypass the routing table and use a specified interface. Disable (clear) this option to test the configured routing table. |
| Count | Enter the number of requests to send. The default count is 5. |
| Don’t fragment echo request packets (IPv4) | Enable this option to not fragment the echo request packets for the test. Disable |
| Force to IPv6 destination | Enable to force test to the IPv6 destination. |
| Interval | Specify a delay, in seconds, between requests (range is 1 to 2,000,000,000). |
| Source | Enter the source address of the echo request. |
| Don’t attempt to print addresses symbolically | Enable this option to display IP addresses in test results and not resolve the IP address hostname. Disable (clear) to resolve IP address hostnames. |
| Pattern | Specify the hexadecimal fill pattern. |
| Size | Enter the size, in bytes, of the request packets (range is 0 to 65468). |
| ToS | Enter the IP type-of-service value (range is 1 to 255). |
| TTL | Enter the IP time-to-live value in hops—IPv6 hop-limit value (range is 1 to 255). |
| Display detailed output | Enable to display a detailed output of the test results. |
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