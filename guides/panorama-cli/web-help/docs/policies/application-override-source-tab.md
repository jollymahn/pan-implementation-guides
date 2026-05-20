# Application Override Source Tab

*Policies : Policies &gt; Application Override : Application Override Source Tab*

Application Override Source Tab

Select the **Source** tab to define the source zone or source address that defines the incoming source traffic to which the application override policy will be applied.



| Field | Description |
| --- | --- |
| Source Zone | **Add** source zones (default is **any**). Zones must be of the same type (Layer 2, Layer 3, or virtual wire). To define new zones, refer to [Network > Zones](network-zones.html#ID0EC6TT). Multiple zones can be used to simplify management. For example, if you have three different internal zones (Marketing, Sales, and Public Relations) that are all directed to the untrusted destination zone, you can create one rule that covers all cases. |
| Source Address | **Add** source addresses, address groups, or regions (default is **any**). Select from the drop-down, or click **Address**, **Address Group**, or **Regions** at the bottom of the drop-down, and specify the settings. Select **Negate** to choose any address except the configured ones. |


 Parent topic
 [Policies > Application Override](policies-application-override.html#ID0EXJHQ)