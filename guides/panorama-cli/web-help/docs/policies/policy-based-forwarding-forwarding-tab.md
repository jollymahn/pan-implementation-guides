# Policy Based Forwarding Forwarding Tab

*Policies : Policies &gt; Policy Based Forwarding : Policy Based Forwarding Forwarding Tab*

Policy Based Forwarding Forwarding Tab

Select the **Forwarding** tab to define the action and network information that will be applied to traffic that matches the forwarding policy. Traffic can be forwarded to a next-hop IP address, a virtual system, or the traffic can be dropped.



| Field | Description |
| --- | --- |
| Action | Select one of the following options: • |






| • | **Forward To VSYS**—Choose the virtual system to forward to from the drop-down. |
| --- | --- |






| • | **Discard**—Drop the packet. |
| --- | --- |






| • | **No PBF**—Do not alter the path that the packet will take. This option, excludes the packets that match the criteria for source/destination/application/service defined in the rule. Matching packets use the route table instead of PBF; the firewall uses the route table to exclude the matched traffic from the redirected port. |
| --- | --- |



 Fastpath:
 Use **Forward** or **Forward to VSYS** as the Action so you can apply a Monitor profile to the traffic. (You can’t apply a Monitor profile when the Action doesn’t forward the traffic.) Monitor profiles monitor the IP address. If connectivity to the IP address fails, Monitor profiles specify the action.




 Egress Interface


 Directs the packet to a specific Egress Interface




 Next Hop


 If you direct the packet to a specific interface, specify the Next Hop for the packet in one of the following ways:



| • | **IP Address**—Select IP Address and select an address object (or create a new address object) that uses an IPv4 or IPv6 address. |
| --- | --- |






| • | **FQDN**—Select FQDN and select an address object (or create a new address object) that uses an FQDN. |
| --- | --- |






| • | **None**—There is no next hop; the packet is dropped. |
| --- | --- |







 Monitor


 Enable Monitoring to verify connectivity to a target **IP Address** or to the **Next Hop** IP address. Select **Monitor** and attach a monitoring **Profile** (default or custom, **Network** > **Network Profiles** > **Monitor**) that specifies the action when the IP address is unreachable.
 Fastpath:
 Configure Monitor profiles and enable monitoring so that if the egress interface fails or the route goes down, the firewall takes the action in the profile and minimizes or prevents the service interruption.




 Enforce Symmetric Return


 (`Required for asymmetric routing environments`) Select **Enforce Symmetric Return** and enter one or more IP addresses in the **Next Hop Address** List.
 Enabling symmetric return ensures that return traffic (such as from the Trust zone on the LAN to the Internet) is forwarded out through the same interface through which traffic ingresses from the internet.




 Schedule


 To limit the days and times when the rule is in effect, select a schedule from the drop-down. To define new schedules, refer to [Settings to Control Decrypted SSL Traffic](settings-to-control-decrypted-ssl-traffic.html#ID0EGEDS).



 Parent topic
 [Policies > Policy Based Forwarding](policies-policy-based-forwarding.html#ID0ECQ3O)