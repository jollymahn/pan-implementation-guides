# Objects > SD-WAN Link Management > Traffic Distribution Profile

*Objects : Objects &gt; SD-WAN Link Management : Objects &gt; SD-WAN Link Management &gt; Traffic Distribution Profile*

Objects > SD-WAN Link Management > Traffic Distribution Profile

For this Traffic Distribution profile, select the method the firewall uses to distribute sessions and to fail over to a better path when path quality deteriorates. Add the Link Tags that the firewall considers when determining the link on which it forwards SD-WAN traffic. You apply a Traffic Distribution profile to each SD-WAN policy rule you create.



| | Traffic Distribution Profile |
| --- | --- |
| Name | Enter a name for the Traffic Distribution Profile using a maximum of 31 alphanumeric characters, hyphen, space, underscore, and period. |
| Shared | Select Shared if you want to use this Traffic Distribution profile across all Device Groups (both hubs and branches). |
| Best Available Path | If cost is not a factor and you will allow applications to use any path out of the branch, select Best Available Path. The firewall distributes traffic and fails over to a link from among the links belonging to all the Link Tags in the list based path quality metrics to provide the best application experience to users. |
| Top Down Priority | If you have expensive or low capacity links that you want to use only as a last resort or as a backup link, select the Top Down Priority method and place the tags that include those links last in the list of Link Tags for this profile. The firewall uses the top Link Tag in the list first to determine the links on which to session load traffic and on which to fail over. If none of the links in the top Link Tag are qualified, the firewall selects a link from the second Link Tag in the list. If none of the links in the second Link Tag are qualified, the process continues as necessary until the firewall finds a qualified link in the last Link Tag. If all associated links are overloaded and no link meets quality thresholds, the firewall uses the Best Available Path method to select a link on which to forward traffic. If the application’s jitter, latency, or packet loss exceeds its configured threshold, the firewall starts at the top of the Top Down list of Link Tags to find a link to which it fails over. |
| Weighted Session Distribution | Select Weighted Session Distribution if you want to manually load traffic (that matches the rule) onto your ISP and WAN links and you don’t require failover during brownout conditions. You manually specify the link’s load when you apply a static percentage of new sessions that the interfaces grouped with a single tag will get. You might select this method for applications that aren’t sensitive to latency and that require a lot of the link’s bandwidth capacity, such as large branch backups and large file transfers. Keep in mind that if the link experiences brownout, the firewall doesn’t reflect the matching traffic to a different link. |
| Link Tags | Add the Link Tags you want the firewall to consider during the link selection process you chose for this profile. The order of tags matters if you chose the Top Down Priority method; use Move Up or Move Down to change the order of tags. |
| Weight | If you chose the Weighted Session Distribution method, enter a percentage for each Link Tag you added. The sum of the percentage values must equal 100%. |


 Parent topic
 [Objects > SD-WAN Link Management](objects-sd-wan-link-management.html#ID0EO1GS)