# Device > Server Profiles > DNS

*Device : Device &gt; Server Profiles &gt; DNS*

## Device > Server Profiles > DNS


To simplify configuration for a virtual system, a DNS server profile allows you to specify the virtual system that is being configured, an inheritance source or the primary and secondary DNS addresses for DNS servers, and the source interface and source address (service route) that will be used in packets sent to the DNS server. The source interface and source address are used as the destination interface and destination address in the reply from the DNS server.


A DNS server profile is for a virtual system only; it is not for the global Shared location.



| DNS Server Profile Settings | Description |
| --- | --- |
| Name | Name the DNS Server profile. |
| Location | Select the virtual system to which the profile applies. |
| Inheritance Source | Select **None** if the DNS server addresses are not inherited. Otherwise, specify the DNS server from which the profile should inherit settings. |
| Check inheritance source status | Click to see the inheritance source information. |
| Primary DNS | Specify the IP address of the primary DNS server. |
| Secondary DNS | Specify the IP address of the secondary DNS server. |
| Service Route IPv4 | Select this option if you want to specify that packets going to the DNS server are sourced from an IPv4 address. |
| Source Interface | Specify the source interface that packets going to the DNS server will use. |
| Source Address | Specify the IPv4 source address from which packets going to the DNS server are sourced. |
| Service Route IPv6 | Select this option if you want to specify that packets going to the DNS server are sourced from an IPv6 address. |
| Source Interface | Specify the source interface that packets going to the DNS server will use. |
| Source Address | Specify the IPv6 source address from which packets going to the DNS server are sourced. |


 Parent topic
 [Device](device.html#ID0EY2QW)