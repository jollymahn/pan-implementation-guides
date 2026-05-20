# Device > Server Profiles > NetFlow

*Device : Device &gt; Server Profiles &gt; NetFlow*

## Device > Server Profiles > NetFlow


Palo Alto Networks firewalls can export statistics about the IP traffic on their interfaces as NetFlow fields to a NetFlow collector. The NetFlow collector is a server you use to analyze network traffic for security, administration, accounting and troubleshooting. All Palo Alto Networks firewalls support NetFlow Version 9. The firewalls support only unidirectional NetFlow, not bidirectional. The firewalls perform NetFlow processing on all IP packets on the interfaces and do not support sampled NetFlow. You can export NetFlow records for Layer 3, Layer 2, virtual wire, tap, VLAN, loopback, and tunnel interfaces. For aggregate Ethernet interfaces, you can export records for the aggregate group but not for individual interfaces within the group. The firewalls support standard and enterprise (PAN-OS specific) NetFlow templates, which NetFlow collectors use to decipher the NetFlow fields. The firewalls select a template based on the type of exported data: IPv4 or IPv6 traffic, with or without NAT, and with standard or enterprise-specific fields.


To [configure NetFlow exports](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/netflow-monitoring.html), **Add** a NetFlow server profile to specify which NetFlow servers will receive the exported data and to specify export parameters. After you assign the profile to an interface (see [Network > Interfaces](network-interfaces.html#ID0EUKKS)), the firewall exports NetFlow data for all traffic on that interface to the specified servers.



| Netflow Settings | Description |
| --- | --- |
| Name | Enter a name for the Netflow server profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Template Refresh Rate | The firewall periodically refreshes NetFlow templates to re-evaluate which one to use (in case the type of exported data changes) and to apply any changes to the fields in the selected template. Specify the rate at which the firewall refreshes NetFlow templates in **Minutes** (range is 1 to 3,600; default is 30) and **Packets** (exported records—range is 1 to 600; default is 20), according to the requirements of your NetFlow collector. The firewall refreshes the template after either threshold is passed. The required refresh rate depends on the NetFlow collector. If you add multiple NetFlow collectors to the server profile, use the value of the collector with the fastest refresh rate. |
| Active Timeout | Specify the frequency (in minutes) at which the firewall exports data records for each session (range is 1 to 60; default is 5). Set the frequency based on how often you want the NetFlow collector to update traffic statistics. |
| PAN-OS Field Types | Export PAN-OS specific fields for App-ID and the User-ID service in Netflow records. |
| Servers | |
| Name | Specify a name to identify the server (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Server | Specify the hostname or IP address of the server. You can add a maximum of two servers per profile. |
| Port | Specify the port number for server access (default is 2055). |


 Parent topic
 [Device](device.html#ID0EY2QW)