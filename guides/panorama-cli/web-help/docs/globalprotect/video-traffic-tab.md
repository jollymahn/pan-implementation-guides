# Video Traffic Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Gateways : GlobalProtect Gateways Agent Tab : Video Traffic Tab*

Video Traffic Tab



| • | **Network** > **GlobalProtect** > **Gateways** > <gateway-config> > **Agent** > <agent-config> > **Video Traffic** |
| --- | --- |




Select the **Video Traffic** tab to exclude video streaming traffic from the VPN tunnel.



| GlobalProtect Gateway Video Traffic Configuration Settings | Description |
| --- | --- |
| Exclude video applications from the tunnel | Select this option to allow video streaming traffic to be excluded from the VPN tunnel. |
| Applications | **Add** or **Browse** for the video streaming applications that you want to exclude from the VPN tunnel. This video redirect is applicable to any video traffic type from the following applications: • |






| • | Dailymotion |
| --- | --- |






| • | Netflix |
| --- | --- |



 For other video streaming applications, only the following video types can be redirected:



| • | MP4 |
| --- | --- |






| • | WebM |
| --- | --- |






| • | MPEG |
| --- | --- |



 Video streaming traffic can only be excluded from the VPN tunnel. If you do not exclude any video streaming applications, all requests are routed through the tunnel (no split tunneling). In this case, each Internet request passes through the firewall and out to the network. This method can prevent external parties from accessing user endpoints to gain access to the internal network.



 Parent topic
 [GlobalProtect Gateways Agent Tab](globalprotect-gateways-agent-tab.html#ID0EDKW1)