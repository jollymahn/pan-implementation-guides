# SD-WAN Destination Tab

*Policies : Policies &gt; SD-WAN : SD-WAN Destination Tab*

SD-WAN Destination Tab



| • | **Policies** > **SD-WAN** > **Destination** |
| --- | --- |




Select the **Destination** tab to define the destination zone(s) or destination address(es) that define the traffic to which the SD-WAN policy rule applies.



| Field | Description |
| --- | --- |
| Destination Zone | **Add** destination zones (default is any). Zones must be Layer 3. To define new zones, refer to [Network > Zones](network-zones.html#ID0EC6TT). Add Multiple zones to simplify management. For example, if you have three different internal zones (Marketing, Sales, and Public Relations) that are all directed to the untrusted destination zone, you can create one rule that covers all cases. |
| Destination Address | **Add** destination addresses, address groups, External Dynamic Lists (EDL), or regions (default is **Any**). Select from the drop-down, or click **Address** or **Address Group** at the bottom of the drop-down, and specify the settings. Select **Negate** to choose any address except the configured ones. |


 Parent topic
 [Policies > SD-WAN](policies-sd-wan.html#ID0EQBPQ)