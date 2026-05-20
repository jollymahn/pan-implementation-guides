# Network > Routing > Routing Profiles > RIPv2

*Network : Network &gt; Routing &gt; Routing Profiles : Network &gt; Routing &gt; Routing Profiles &gt; RIPv2*

Network > Routing > Routing Profiles > RIPv2

Add [RIPv2 routing profiles](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/create-ripv2-routing-profiles.html) to efficiently configure RIPv2 for a logical router.



| RIPv2 Routing Profiles | Description |
| --- | --- |
| **RIPv2 Global Timer Profile** | |
| Name | Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| Update Interval | Enter number of seconds between regularly scheduled routing Update messages; range is 5 to 2,147,483,647; default is 30. |
| Expire Interval | Enter number of seconds that a route can be in the routing table without being updated; range is 5 to 2,147,483,647; default is 180. After the Expire interval is reached, the route is still included in Update messages until the Delete interval is reached. |
| Delete Interval | Enter number of seconds in Delete interval; range is 5 to 2,147,483,647; default is 120. When an expired route in the routing table reaches the Delete interval, it is deleted from the routing table. |
| **RIPv2 Authentication Profile** | |
| Name | Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| Type | Select the type of authentication: **md5 (use RIP MD5 authentication method)** or **password (Simple password authentication)**. |
| Password | (`Simple password authentication`) Enter the password (a maximum of 16 characters) and **Confirm Password**. |
| MD5 | (`RIP MD5 authentication`) Enter the MD5 Key-ID; range is 0 to 255. |
| Key | (`RIP MD5 authentication`) Enter the MD5 Key (a maximum of 16 characters) and **Confirm Key**. |
| use this key when sending packet | (`RIP MD5 authentication`) Select to make this key the Preferred key. |
| **RIPv2 Redistribution Profile** | |
| Name | Enter a name for the profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| **IPv4 Static** | Select to allow configuration of this portion of the profile. |
| Enable (default) or Disable | Enable the IPv4 Static portion of the profile. |
| Metric | Specify the Metric to apply to the static routes being redistributed into RIPv2 (range is 1 to 65,535). |
| Route-Map | Select or create a Redistribution Route Map to control which IPv4 static routes are redistributed to RIPv2 and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. |
| **Connected** | Select to allow configuration of this portion of the profile. |
| Enable (default) or Disable | Enable the Connected portion of the profile. |
| Metric | Specify the Metric to apply to the connected routes being redistributed into RIPv2 (range is 1 to 65,535). |
| Route-Map | Select or create a Redistribution Route Map to control which connected routes are redistributed to RIPv2 and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. |
| **BGP AFI IPv4** | Select to allow configuration of this portion of the profile. |
| Enable (default) or Disable | Enable the BGP AFI IPv4 portion of the profile. |
| Metric | Specify the Metric to apply to the BGP IPv4 routes being redistributed into RIPv2 (range is 0 to 4,294,967,295). |
| Route-Map | Select or create a Redistribution Route Map to control which BGP IPv4 routes are redistributed to RIPv2 and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. |
| **OSPFv2** | Select to allow configuration of this portion of the profile. |
| Enable (default) or Disable | Enable the OSPFv2 portion of the profile. |
| Metric | Specify the Metric to apply to the OSPFv2 routes being redistributed into RIPv2 (range is 0 to 4,294,967,295). |
| Route-Map | Select or create a Redistribution Route Map to control which OSPFv2 routes are redistributed to RIPv2 and set their attributes. Default is **None**. If the route map Set configuration includes a Metric Action and Metric Value, they are applied to the redistributed route. Otherwise, the Metric configured on this redistribution profile is applied to the redistributed route. |

 Parent topic
 [Network > Routing > Routing Profiles](network-routing-routing-profiles.html#ID0ECYBV)