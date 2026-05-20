# Ethernet SGT Protection

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Ethernet SGT Protection*

Ethernet SGT Protection



| • | Network > Network Profiles > Zone Protection > Ethernet SGT Protection |
| --- | --- |




For a firewall in a Cisco TrustSec network, create a Zone Protection profile with a list of Layer 2 Security Group Tags (SGTs) that you want to exclude. Apply the Zone Protection profile to a Layer 2, virtual wire, or tap interface. If an incoming packet with an 802.1Q (Ethertype 0x8909) header has an SGT that matches an SGT in your list, the firewall drops the packet.



| Zone Protection Profile Settings | Configured In | Description |
| --- | --- | --- |
| Layer 2 SGT Exclude List | **Network** > **Network Profiles** > **Zone Protection** > **Ethernet SGT Protection** | Enter a name for the list of Security Group Tags (SGTs). |
| Tag | Enter the Layer 2 SGTs in headers of packets that you want to exclude (drop) when the SGT matches this list in the Zone Protection profile applied to a zone (range is 0 to 65,535). | |
| Enable | **Enable** (default) this exclude list for Ethernet SGT protection. De-select the **Enable** option to disable the exclude list. | |


 Parent topic
 [Network > Network Profiles > Zone Protection](network-network-profiles-zone-protection.html#ID0EFHDW)