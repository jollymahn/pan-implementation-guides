# Device > Shared Gateways

*Device : Device &gt; Shared Gateways*

## Device > Shared Gateways


[Shared gateways](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/virtual-systems/shared-gateway.html) allow multiple virtual systems to share a single interface for external communication (typically connected to a common upstream network such as an Internet Service Provider). All of the virtual systems communicate with the outside world through the physical interface using a single IP address. A single virtual router is used to route traffic for all of the virtual systems through the shared gateway.


Shared gateways use Layer 3 interfaces, and at least one Layer 3 interface must be configured as a shared gateway. Communications originating in a virtual system and exiting the firewall through a shared gateway require similar policy to communications passing between two virtual systems. You could configure an ‘External vsys’ zone to define security rules in the virtual system.



| Shared Gateway Settings | Description |
| --- | --- |
| ID | Identifier for the gateway (not used by firewall). |
| Name | Enter a name for the shared gateway (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. Only the name is required. |
| DNS Proxy | (`Optional`) If a DNS proxy is configured, select which DNS server(s) to use for domain name queries. |
| Interfaces | Select the interfaces the shared gateway will use. |


 Parent topic
 [Device](device.html#ID0EY2QW)