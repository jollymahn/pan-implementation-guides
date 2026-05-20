# BGP Conditional Adv Tab

*Network : Network &gt; Virtual Routers : BGP : BGP Conditional Adv Tab*

BGP Conditional Adv Tab



| • | Network > Virtual Router > BGP > Conditional Adv |
| --- | --- |




A BGP conditional advertisement allows you to control which route to advertise in the event that a preferred route is not available in the local BGP routing table (LocRIB), indicating a peering or reachability failure. This is useful where you want to try to force routes to one AS over another, such as when you have links to the internet through multiple ISPs and you want traffic to be routed to one provider instead of the other except when there is a loss of connectivity to the preferred provider.


For conditional advertisement, you configure a Non Exist filter that specifies the preferred route(s) (**Address Prefix**) plus any other attributes that identify the preferred route (such as AS Path Regular Expression). If a route matching the Non Exist filter is not found in the local BGP routing table, only then will the firewall allow advertisement of the alternate route (the route to the other, non-preferred provider) as specified in its Advertise filter.


To configure conditional advertisement, select the **Conditional Adv** tab, **Add** a conditional advertisement, and configure the values described in the following table.



| BGP Conditional Advertisement Settings | Configure In | Description |
| --- | --- | --- |
| Policy | **BGP** > **Conditional Adv** | Specify a name for this conditional advertisement policy rule. |
| Enable | Select to enable this conditional advertisement policy rule. | |
| Used By | **Add** the peer groups that will use this conditional advertisement policy rule. | |
| Non Exist Filter | **BGP** > **Conditional Adv** > **Non Exist Filters** | Use this tab to specify the prefix(es) of the preferred route. This specifies the route that you want to advertise, if it is available in the local BGP routing table. (If a prefix is going to be advertised and matches a Non Exist filter, the advertisement will be suppressed.) **Add** a Non Exist Filter and specify a name to identify this filter. |
| Enable | Select to activate the Non Exist filter. | |
| AS Path Regular Expression | Specify a regular expression for filtering AS paths. | |
| Community Regular Expression | Specify a regular expression for filtering community strings. | |
| Extended Community Regular Expression | Specify a regular expression for filtering extended community strings. | |
| MED | Specify a MED value for route filtering (range is 0-4,294,967,295). | |
| Route Table | Specify which route table (**unicast**, **multicast**, or **both**) the firewall will search to see if the matched route is present. If the matched route is not present in that route table, only then will the firewall allow the advertisement of the alternate route. | |
| Address Prefix | **Add** the exact Network Layer Reachability Information (NLRI) prefix for the preferred route(s). | |
| Next Hop | Specify next hop routers or subnets for filtering the route. | |
| From Peer | Specify peer routers for route filtering. | |
| Advertise Filter | **BGP** > **Conditional Adv** > **Advertise Filters** | Use this tab to specify the prefix(es) of the route in the Local-RIB routing table to advertise if the route in the Non Exist filter is not available in the local routing table. If a prefix is to be advertised and does not match a Non Exist filter, the advertisement will occur. **Add** an advertise filter and specify a name to identify this filter. |
| Enable | Select to activate the filter. | |
| AS Path Regular Expression | Specify a regular expression for filtering AS paths. | |
| Community Regular Expression | Specify a regular expression for filtering community strings. | |
| Extended Community Regular Expression | Specify a regular expression for filtering extended community strings. | |
| MED | Specify a MED value for route filtering (range is 0-4,294,967,295). | |
| Route Table | Specify which route table the firewall uses when a matched route is to be conditionally advertised: **unicast**, **multicast**, or **both**. | |
| Address Prefix | **Add** the exact Network Layer Reachability Information (NLRI) prefix for the route to be advertised if the preferred route is not available. | |
| Next Hop | Specify next hop routers or subnets for route filtering. | |
| From Peer | Specify peer routers for route filtering. | |


 Parent topic
 [BGP](bgp.html#ID0EG4BU)