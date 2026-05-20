# Route Redistribution

*Network : Network &gt; Virtual Routers : Route Redistribution*

Route Redistribution



| • | Network > Virtual Router > Redistribution Profiles |
| --- | --- |




Redistribution profiles direct the firewall to filter, set priority, and perform actions based on desired network behavior. Route redistribution allows static routes and routes that are acquired by other protocols to be advertised through specified routing protocols.


Redistribution profiles must be applied to routing protocols in order to take effect. Without redistribution rules, each protocol runs separately and does not communicate outside its purview. Redistribution profiles can be added or modified after all routing protocols are configured and the resulting network topology is established.


Apply redistribution profiles to the RIP and OSPF protocols by defining export rules. Apply redistribution profiles to BGP in the **Redistribution Rules** tab. Refer to the following table.



| Redistribution Profile Settings | Description |
| --- | --- |
| Name | **Add** a **Redistribution Profile** and enter the profile name. |
| Priority | Enter a priority (range is 1-255) for this profile. Profiles are matched in order (lowest number first). |
| Redistribute | Choose whether to perform route redistribution based on the settings in this window. • |






| • | **No Redist**—Select to not redistribute matching candidate routes. |
| --- | --- |







 General Filter Tab




 Type


 Select the route types of the candidate route.




 Interface


 Select the interfaces to specify the forwarding interfaces of the candidate route.




 Destination


 To specify the destination of the candidate route, enter the destination IP address or subnet (format x.x.x.x or x.x.x.x/n) and click **Add**. To remove an entry, click remove ( ).




 Next Hop


 To specify the gateway of the candidate route, enter the IP address or subnet (format x.x.x.x or x.x.x.x/n) that represents the next hop and click **Add**. To remove an entry, click remove ( ).




 OSPF Filter Tab




 Path Type


 Select the route types of the candidate OSPF route.




 Area


 Specify the area identifier for the candidate OSPF route. Enter the **OSPF area ID** (format x.x.x.x), and click **Add**.
 To remove an entry, click remove (  ).




 Tag


 Specify OSPF tag values. Enter a numeric tag value (1-255), and click Add.
 To remove an entry, click remove ( ).




 BGP Filter Tab




 Community


 Specify a community for BGP routing policy.




 Extended Community


 Specify an extended community for BGP routing policy.



 Parent topic
 [Network > Virtual Routers](network-virtual-routers.html#ID0ER5VT)