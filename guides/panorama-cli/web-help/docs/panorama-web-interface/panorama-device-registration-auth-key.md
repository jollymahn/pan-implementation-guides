# Panorama > Device Registration Auth Key

*Panorama Web Interface : Panorama &gt; Device Registration Auth Key*

## Panorama > Device Registration Auth Key


To strengthen your Security posture when onboarding new firewalls, Log Collectors, and WildFire appliances to a Panorama™ management server, create a device registration authentication key for mutual authentication between a new device and the Panorama management server on first connection. You can configure an authentication key with specific values: the key lifetime, the count to determine number of times you can use the device registration auth key to onboard new firewalls, a list of one or more serial numbers for which the device registration auth key is valid, and specify which type of devices the authentication key is valid. After you create an authentication key on Panorama, you must add it to the new firewall, Log Collector, or WildFire appliance during onboarding to Panorama management.



| Device Registration Auth Key Fields | Description |
| --- | --- |
| Name | Name of the device registration auth key. The name is case-sensitive, must be unique across the entire device group hierarchy, and can contain only letters, numbers, spaces, hyphens, and underscores. |
| Lifetime | Key lifetime displays the number of days, hours, and minutes the device registration auth key is valid to onboard new firewalls, Log Collectors, and WildFire appliances. |
| Count | Number of times you can use the device registration auth key to onboard new firewalls, Log Collectors, and WildFire appliances. |
| Serial | Serial number of one or more new firewalls, Log Collectors, and WildFire appliances for which the device registration auth key is valid. |
| Type | Type of device for which authentication key is valid (Any, Firewalls, or Log Collectors). |


 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)