# Application Override Destination Tab

*Policies : Policies &gt; Application Override : Application Override Destination Tab*

Application Override Destination Tab

Select the **Destination** tab to define the destination zone or destination address that defines the destination traffic to which the policy will be applied.



| Field | Description |
| --- | --- |
| Destination Zone | Click **Add** to choose destination zones (default is any). Zones must be of the same type (Layer 2, Layer 3, or virtual wire). To define new zones, refer to [Network > Zones](network-zones.html#ID0EC6TT). Multiple zones can be used to simplify management. For example, if you have three different internal zones (Marketing, Sales, and Public Relations) that are all directed to the untrusted destination zone, you can create one rule that covers all cases. |
| Destination Address | Click **Add** to add destination addresses, address groups, or regions (default is any). Select from the drop-down, or click **Address**, **Address Group**, or **Regions** at the bottom of the drop-down, and specify the settings. Select **Negate** to choose any address except the configured ones. |


 Parent topic
 [Policies > Application Override](policies-application-override.html#ID0EXJHQ)