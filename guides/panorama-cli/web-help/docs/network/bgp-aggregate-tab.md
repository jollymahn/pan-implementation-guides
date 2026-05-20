# BGP Aggregate Tab

*Network : Network &gt; Virtual Routers : BGP : BGP Aggregate Tab*

BGP Aggregate Tab



| • | Network > Virtual Router > BGP > Aggregate |
| --- | --- |




Route aggregation is the act of combining specific routes (those with a longer prefix length) into a single route (with a shorter prefix length) to reduce routing advertisements that the firewall must send and to have fewer routes in the route table.



| BGP Aggregate Settings | Configure In | Description |
| --- | --- | --- |
| Name | **BGP** > **Aggregate** | Enter a name for the aggregation rule. |
| Prefix | Enter a summary prefix (IP address/prefix length) that will be used to aggregate the longer prefixes. | |
| Enable | Select to enable this aggregation of routes. | |
| Summary | Select to summarize routes. | |
| AS Set | Select to cause the firewall, for this aggregation rule, to include the set of AS numbers (AS set) in the AS path of the aggregate route. The AS set is the unordered list of the origin AS numbers from the individual routes that are aggregated. | |
| Name | **BGP** > **Aggregate** > **Suppress Filters** | Define the attributes that will cause the matched routes to be suppressed. **Add** and enter a name for a Suppress Filter. |
| Enable | Select to enable the Suppress Filter. | |
| AS Path Regular Expression | Specify a regular expression for AS_PATH to filter which routes will be aggregated, for example, ^5000 means routes learned from AS 5000. | |
| Community Regular Expression | Specify a regular expression for communities to filter which routes will be aggregated, for example, 500:.* matches communities with 500:x. | |
| Extended Community Regular Expression | Specify a regular expression for extended communities to filter which routes will be aggregated. | |
| MED | Specify the MED that filters which routes will be aggregated. | |
| Route Table | Specify which route table to use for aggregated routes that should be suppressed (not advertised): **unicast**, **multicast**, or **both**. | |
| Address Prefix | Enter the IP address that you want to suppress from advertisement. | |
| Next Hop | Enter the next hop address of the BGP prefix that you want to suppress. | |
| From Peer | Enter the IP address of the peer from which the BGP prefix (that you want to suppress) was received. | |
| Name | **BGP** > **Aggregate** > **Advertise Filters** | Define the attributes for an Advertise Filter that causes the firewall to advertise to peers any route that matches the filter. Click **Add** and enter a name for the Advertise Filter. |
| Enable | Select to enable this Advertise Filter. | |
| AS Path Regular Expression | Specify a regular expression for AS_PATH to filter which routes will be advertised. | |
| Community Regular Expression | Specify a regular expression for Community to filter which routes will be advertised. | |
| Extended Community Regular Expression | Specify a regular expression for Extended Community to filter which routes will be advertised. | |
| MED | Specify a MED value to filter which routes will be advertised. | |
| Route Table | Specify which route table to use for an Advertise Filter of aggregate routes: **unicast**, **multicast**, or **both**. | |
| Address Prefix | Enter an IP address that you want BGP to advertise. | |
| Next Hop | Enter the Next Hop address of the IP address you want BGP to advertise. | |
| From Peer | Enter the IP address of the peer from which the prefix was received, that you want BGP to advertise. | |
| | **BGP** > **Aggregate** > **Aggregate Route Attributes** | Define the attributes for the aggregate route. |
| Local Preference | Local preference in the range 0-4,294,967,295. | |
| MED | Multi Exit Discriminator in the range 0-4,294,967,295. | |
| Weight | Weight in the range 0-65,535. | |
| Next Hop | Next Hop IP address. | |
| Origin | Origin of the route: **igp**, **egp**, or **incomplete**. | |
| AS Path Limit | AS Path Limit in the range 1-255. | |
| AS Path | Select Type: **None** or **Prepend**. | |
| Community | Select Type: **None**, **Remove All**, **Remove Regex**, **Append**, or **Overwrite**. | |
| Extended Community | Select Type: **None**, **Remove All**, **Remove Regex**, **Append**, or **Overwrite**. | |


 Parent topic
 [BGP](bgp.html#ID0EG4BU)