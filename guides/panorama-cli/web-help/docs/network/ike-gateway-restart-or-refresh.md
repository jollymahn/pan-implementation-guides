# IKE Gateway Restart or Refresh

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; IKE Gateways : IKE Gateway Restart or Refresh*

IKE Gateway Restart or Refresh



| • | Network > IPSec Tunnels |
| --- | --- |




Select **Network** > **IPSec Tunnels** to display status of tunnels. In the second Status column is a link to the IKE Info. Click the gateway you want to restart or refresh. The IKE Info page opens. Click one of the entries in the list and click:




| • | **Restart**—Restarts the selected gateway. A restart will disrupt traffic going across the tunnel. The restart behaviors for IKEv1 and IKEv2 are different, as follows: |
| --- | --- |






| ◦ | **IKEv1**—You can restart (clear) a Phase 1 SA or Phase 2 SA independently and only that SA is affected. |
| --- | --- |






| ◦ | **IKEv2**—Causes all child SAs (IPSec tunnels) to be cleared when the IKEv2 SA is restarted. |
| --- | --- |



 If you restart the IKEv2 SA, all underlying IPSec tunnels are also cleared.
 If you restart the IPSec Tunnel (child SA) associated with an IKEv2 SA, the restart will not affect the IKEv2 SA.



| • | **Refresh**—Shows the current IKE SA status. |
| --- | --- |



 Parent topic
 [Network > Network Profiles > IKE Gateways](network-network-profiles-ike-gateways.html#ID0EF12V)