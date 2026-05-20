# Tunnel Settings Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Gateways : GlobalProtect Gateways Agent Tab : Tunnel Settings Tab*

Tunnel Settings Tab



| • | **Network** > **GlobalProtect** > **Gateways** > <gateway-config> > **Agent** > <agent-config> > **Tunnel Settings** |
| --- | --- |




Select the **Tunnel Settings** tab to enable tunneling and configure the tunnel parameters.


Tunnel parameters are required if you are setting up an external gateway. If you are configuring an internal gateway, tunnel parameters are optional.



| GlobalProtect Gateway Client Tunnel Mode Configuration Settings | Description |
| --- | --- |
| Tunnel Mode | Select **Tunnel Mode** to enable tunnel mode and then specify the following settings: • |






| • | **Max User**—Specify the maximum number of users that can simultaneously access the gateway for authentication, HIP updates, and GlobalProtect app updates. If the maximum number of users is reached, subsequent users are denied access with a message that indicates the maximum number of users has been reached (range varies by platform and is displayed when the field is empty). |
| --- | --- |






| • | **Enable IPSec**—Select this option to enable IPSec mode for endpoint traffic, making IPSec the primary method and SSL-VPN the fallback method. The remaining options are not available until IPSec is enabled. |
| --- | --- |






| • | **GlobalProtect IPSec Crypto**—Select a GlobalProtect IPSec Crypto profile that specifies authentication and encryption algorithms for the VPN tunnels. The **default** profile uses AES-128-CBC encryption and SHA1 authentication. For details, see [Network > Network Profiles > GlobalProtect IPSec Crypto](network-network-profiles-globalprotect-ipsec-crypto.html#ID0EBQ2V). |
| --- | --- |






| • | **Enable X-Auth Support**—Select this option to enable Extended Authentication (X-Auth) support in the GlobalProtect gateway when IPSec is enabled. With X-Auth support, third party IPSec VPN clients that support X-Auth (such as the IPSec VPN client on Apple iOS and Android devices and the VPNC client on Linux) can establish a VPN tunnel with the GlobalProtect gateway. The X-Auth option provides remote access from the VPN client to a specific GlobalProtect gateway. Because X-Auth access provides limited GlobalProtect functionality, consider using the GlobalProtect App for simplified access to the full security feature set GlobalProtect provides on iOS and Android devices. |
| --- | --- |



 Selecting **X-Auth Support** activates the **Group Name** and **Group Password** options:



| ◦ | If the group name and group password are specified, the first authentication phase requires both parties to use this credential to authenticate. The second phase requires a valid username and password, which is verified through the authentication profile configured in the Authentication section. |
| --- | --- |






| ◦ | If no group name and group password are defined, the first authentication phase is based on a valid certificate presented by the third-party VPN client. This certificate is then validated through the certificate profile configured in the authentication section. |
| --- | --- |






| ◦ | By default, the user is not required to re-authenticate when the key used to establish the IPSec tunnel expires. To require the user to re-authenticate, clear the **Skip Auth on IKE Rekey** option. |
| --- | --- |






 Parent topic
 [GlobalProtect Gateways Agent Tab](globalprotect-gateways-agent-tab.html#ID0EDKW1)