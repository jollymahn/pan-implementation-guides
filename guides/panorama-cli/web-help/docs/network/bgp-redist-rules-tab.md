# BGP Redist Rules Tab

*Network : Network &gt; Virtual Routers : BGP : BGP Redist Rules Tab*

BGP Redist Rules Tab



| • | Network > Virtual Router > BGP > Redist Rules |
| --- | --- |




Configure the settings described in the following table to create rules for redistributing BGP routes.



| BGP Redistribution Rules Settings | Configure In | Description |
| --- | --- | --- |
| Allow Redistribute Default Route | **BGP** > **Redist Rules** | Permits the firewall to redistribute its default route to BGP peers. |
| Name | **Add** an IP subnet or create a redistribution rule first. | |
| Enable | Select to enable this redistribution rule. | |
| Route Table | Specify which route table the route will be redistributed into: **unicast**, **multicast**, or **both**. | |
| Metric | Enter a metric in the range 1-65,535. | |
| Set Origin | Select the origin for the redistributed route (**igp**, **egp**, or **incomplete**). The value **incomplete** indicates a connected route. | |
| Set MED | Enter a MED for the redistributed route in the range 0-4,294,967,295. | |
| Set Local Preference | Enter a local preference for the redistributed route in the range 0-4,294,967,295. | |
| Set AS Path Limit | Enter an AS path limit for the redistributed route in the range 1-255. | |
| Set Community | Select or enter a 32-bit value in decimal or hexadecimal or in AS:VAL format; AS and VAL are each in the range 0-65,535. Enter a maximum of 10 communities. | |
| Set Extended Community | Enter a 64-bit value in hexadecimal or in TYPE:AS:VAL or TYPE:IP:VAL format. TYPE is 16 bits; AS or IP is 16 bits; VAL is 32 bits. Enter a maximum of five extended communities. | |


 Parent topic
 [BGP](bgp.html#ID0EG4BU)