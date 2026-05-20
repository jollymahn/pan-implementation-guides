# BGP Import and Export Tabs

*Network : Network &gt; Virtual Routers : BGP : BGP Import and Export Tabs*

BGP Import and Export Tabs



| • | Network > Virtual Router > BGP > Import |
| --- | --- |






| • | Network > Virtual Router > BGP > Export |
| --- | --- |




**Add** a new Import or Export rule to import or export BGP routes.



| BGP Import and Export Settings | Configure In | Description |
| --- | --- | --- |
| Rules | **BGP** > **Import or Export** > **General** | Specify a name to identify the rule. Import rule can have a maximum of 63 characters; Export rule can have a maximum of 31 characters. The rule must begin with an alphanumeric character and can contain a combination of alphanumeric characters, underscore (_), hyphen (-), dot (.) and space. |
| Enable | Select to activate the rule. | |
| Used By | Select the peer groups that will use this rule. | |
| AS-Path Regular Expression | **BGP** > **Import or Export** > **Match** | Specify a regular expression for filtering of AS paths. |
| Community Regular Expression | Specify a regular expression for filtering of community strings. | |
| Extended Community Regular Expression | Specify a regular expression for filtering of extended community strings. | |
| MED | Specify a Multi-Exit Discriminator value for route filtering in the range 0-4,294,967,295. | |
| Route Table | For an **Import Rule**, specify which route table the matching routes will be imported into: **unicast**, **multicast**, or **both**. For an **Export Rule**, specify which route table the matching routes will be exported from: **unicast**, **multicast**, or **both**. | |
| Address Prefix | Specify IP addresses or prefixes for route filtering. | |
| Next Hop | Specify next hop routers or subnets for route filtering | |
| From Peer | Specify peer routers for route filtering | |
| Action | **BGP** > **Import or Export** > **Action** | Specify an action (**Allow** or **Deny**) to take when the match conditions are met. |
| Dampening | Specify the dampening parameter, only if the action is **Allow**. | |
| Local Preference | Specify a local preference metric, only if the action is **Allow**. | |
| MED | Specify a MED value, only if the action is **Allow** (0- 65,535). | |
| Weight | Specify a weight value, only if the action is **Allow** (0- 65,535). | |
| Next Hop | Specify a next hop router, only if the action is **Allow**. | |
| Origin | Specify the path type of the originating route: IGP, EGP, or incomplete, only if the action is **Allow**. | |
| AS Path Limit | Specify an AS path limit, only if the action is **Allow**. | |
| AS Path | Specify an AS path: **None**, **Remove**, **Prepend**, **Remove and Prepend**, only if the action is **Allow**. | |
| Community | Specify a community option: **None**, **Remove All**, **Remove Regex**, **Append**, or **Overwrite**, only if the action is **Allow**. | |
| Extended Community | Specify a community option: **None**, **Remove All**, **Remove Regex**, **Append**, or **Overwrite**, only if the action is **Allow**. | |
| | | **Delete** rules when you no longer need them or **Clone** a rule when appropriate. You can also select rules and **Move Up** or **Move Down** to change their order. |


 Parent topic
 [BGP](bgp.html#ID0EG4BU)