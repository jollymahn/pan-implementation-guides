# General Settings of a Virtual Router

*Network : Network &gt; Virtual Routers : General Settings of a Virtual Router*

General Settings of a Virtual Router



| • | Network > Virtual Routers > Router Settings > General |
| --- | --- |




All virtual routers require that you assign Layer 3 interfaces and administrative distance metrics as described in the following table.



| Virtual Router General Settings | Description |
| --- | --- |
| Name | Specify a name to describe the virtual router (up to **31** characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Interfaces | Select the interfaces that you want to include in the virtual router. Thus, they can be used as outgoing interfaces in the virtual router’s routing table. To specify the interface type, refer to [Network > Interfaces](network-interfaces.html#ID0EUKKS). When you add an interface, its connected routes are added automatically. |
| Administrative Distances | Specify the following administrative distances: • |






| • | **OSPF Int**—Range is 10-240; default is 30. |
| --- | --- |






| • | **OSPF Ext**—Range is 10-240; default is 110. |
| --- | --- |






| • | **IBGP**—Range is 10-240; default is 200. |
| --- | --- |






| • | **EBGP**—Range is 10-240; default is 20. |
| --- | --- |






| • | **RIP**—Range is 10-240; default is 120. |
| --- | --- |






 Parent topic
 [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)