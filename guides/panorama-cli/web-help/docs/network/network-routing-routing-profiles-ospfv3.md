# Network > Routing > Routing Profiles > OSPFv3

*Network : Network &gt; Routing &gt; Routing Profiles : Network &gt; Routing &gt; Routing Profiles &gt; OSPFv3*

Network > Routing > Routing Profiles > OSPFv3

Add [OSPFv3 routing profiles](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/create-ospfv3-routing-profiles.html) to efficiently configure OSPFv3 for a logical router.



| OSPFv3 Routing Profiles | Description |
| --- | --- |
| **OSPFv3 Global Timer Profile** | |
| Name | Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| LSA min-arrival | Enter the smallest interval at which the firewall recalculates the SPF tree; range is 1 to 10; default is 5. The firewall would recalculate at a larger interval (less frequently than the setting). |
| SPF Throttle—Initial delay | Enter the initial delay (in seconds) from when the logical router receives a topology change until it performs the Shortest Path First (SPF) calculation; range is 0 to 600; default is 5. |
| Initial hold time | Enter the initial hold time (in seconds) between the first two consecutive SPF calculations; range is 0 to 600; default is 5. Each subsequent hold time is twice as long as the prior hold time until the hold time reaches the maximum hold time. |
| Maximum hold time | Enter the largest value that the hold time increases to until it remains steady; range is 0 to 600; default is 5. |
| **OSPFv3 Auth Profile** | |
| Name | Enter a name for the Authentication profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| SPI | Enter the Security Policy Index, which must match between both ends of the OSPFv3 adjacency. |
| Protocol | Select the authentication protocol: **ESP** (Encapsulating Security Payload) (recommended) or **AH** (Authentication header). |
| Authentication—Type | Select the type of authentication: • |





| • | **SHA256** |
| --- | --- |





| • | **SHA384** |
| --- | --- |





| • | **SHA512** |
| --- | --- |





| • | **MD5** |
| --- | --- |





| • | **None** |
| --- | --- |






 Key


 Enter the authentication key in hexadecimal format: xxxxxxxx[-xxxxxxxx] ... using a total of 5 sections and **Confirm Key**.




 Encryption—Algorithm


 (`ESP only`) Select the encryption algorithm:



| • | **3des** (default) |
| --- | --- |





| • | **aes-128-cbc** |
| --- | --- |





| • | **aes-192-cbc** |
| --- | --- |





| • | **aes-256-cbc** |
| --- | --- |





| • | **null** |
| --- | --- |






 Key


 (`ESP only`) Enter the encryption key in hexadecimal format; use the correct number of sections based on the type of ESP encryption and **Confirm Key**:



| • | **3des**—Use a total of 6 hexadecimal sections in the key. |
| --- | --- |





| • | **aes-128-cbc**—Use a total of 4 hexadecimal sections in the key. |
| --- | --- |





| • | **aes-192-cbc**—Use a total of 6 hexadecimal sections in the key. |
| --- | --- |





| • | **aes-256-cbc**—Use a total of 8 hexadecimal sections in the key. |
| --- | --- |






 **OSPFv3 Interface Timer Profile**




 Name


 Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 Hello Interval


 Enter the interval (in seconds) at which OSPFv3 sends Hello packets; range is 1 to 3,600; default is 10.




 Dead Count


 Enter the number of times the Hello Interval can occur from a neighbor without OSPFv3 receiving a Hello packet from the neighbor, before OSPFv3 considers that neighbor down; range is 3 to 20; default is 4.




 Retransmit Interval


 Enter the number of seconds that OSPFv3 waits to receive an LSA from a neighbor before OSPFv3 retransmits the LSA: range is 1 to 1,800; default is 5.




 Transmit Delay


 Enter the number of seconds that OSPFv3 delays transmitting an LSA before sending the SLA out an interface; range is 1 to 1,800; default is 1.




 Graceful Restart Hello Delay (sec)


 Enter the Graceful Restart Hello Delay in seconds; range is 1 to 10; default is 10. This setting applies to an OSPFv3 interface when Active/Passive HA is configured. Graceful Restart Hello Delay is the number of seconds during which the firewall sends Grace LSA packets at 1-second intervals. During this time, no Hello packets are sent from the restarting firewall. During the restart, the dead time (which is the **Hello Interval** multiplied by the **Dead Count**) is also counting down. If the dead timer is too short, the adjacency will go down during the graceful restart because of the hello delay. Therefore it is recommended that the dead timer be at least four times the value of the Graceful Restart Hello Delay.




 **OSPFv3 Redistribution Profile**




 Name


 Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed.




 **IPv6 Static**


 Select to allow configuration of this portion of the profile.




 Enable


 Enable the IPv6 static portion of the profile.




 Metric


 Specify the Metric to apply to the static routes being redistributed into OSPFv3 (range is 1 to 65,535).




 Metric-Type


 Select **Type 1** or **Type 2**.




 Redistribute Route-Map


 Select or create a Redistribution Route Map to control which IPv6 static routes are redistributed to OSPFv3 and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. Likewise, the Metric Type in the route map Set configuration takes precedence over the Metric Type configured in this redistribution profile.




 **Connected**


 Select to allow configuration of this portion of the profile.




 Enable


 Enable the Connected portion of the profile.




 Metric


 Specify the Metric to apply to the Connected routes being redistributed into OSPFv3 (range is 1 to 65,535).




 Metric-Type


 Select **Type 1** or **Type 2**.




 Redistribute Route-Map


 Select or create a Redistribution Route Map to control which Connected routes are redistributed to OSPFv3 and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. Likewise, the Metric Type in the route map Set configuration takes precedence over the Metric Type configured in this redistribution profile.




 **BGP AFI IPv6**


 Select to allow configuration of this portion of the profile.




 Enable


 Enable the BGP AFI IPv6 portion of the profile.




 Metric


 Specify the Metric to apply to the BGP IPv6 routes being redistributed into OSPFv3 (range is 0 to 4,294,967,295).




 Metric-Type


 Select **Type 1** or **Type 2**.




 Redistribute Route-Map


 Select or create a Redistribution Route Map to control which BGP IPv6 routes are redistributed to OSPFv3 and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. Likewise, the Metric Type in the route map Set configuration takes precedence over the Metric Type configured in this redistribution profile.




 **IPv6 Default Route**


 Select to allow configuration of this portion of the profile.




 Always


 Select to always create and redistribute the IPv6 default route to OSPFv3, even if there is no default route on the router; default is enabled.




 Enable


 Enable the IPv6 Default Route portion of the profile.




 Metric


 Specify the Metric to apply to the IPv6 default route being redistributed into OSPFv3 (range is 0 to 4,294,967,295).




 Metric-Type


 Select **Type 1** or **Type 2**.



 Parent topic
 [Network > Routing > Routing Profiles](network-routing-routing-profiles.html#ID0ECYBV)