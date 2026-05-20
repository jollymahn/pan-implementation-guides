# IKE Gateway Advanced Options Tab

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; IKE Gateways : IKE Gateway Advanced Options Tab*

IKE Gateway Advanced Options Tab



| • | Network > Network Profiles > IKE Gateways > Advanced Options |
| --- | --- |




Configure advanced IKE gateway settings such as passive mode and NAT Traversal, IKEv2 post-quantum VPNs, and IKEv1 dead peer detection.



| IKE Gateway Advanced Options | Description |
| --- | --- |
| Enable Passive Mode | Click to have the firewall only respond to IKE connections and never initiate them. |
| Enable NAT Traversal | Click to have UDP encapsulation used on IKE and UDP protocols, enabling them to pass through intermediate NAT devices. Enable NAT Traversal if Network Address Translation (NAT) is configured on a device between the IPSec VPN terminating points. |
| IKEv1 Tab | |
| Exchange Mode | Choose **auto**, **aggressive**, or **main**. In **auto** mode (default), the device can accept both **main** mode and **aggressive** mode negotiation requests; however, whenever possible, it initiates negotiation and allows exchanges in **main** mode. You must configure the peer device with the same exchange mode to allow it to accept negotiation requests initiated from the first device. |
| IKE Crypto Profile | Select an existing profile, keep the default profile, or create a new profile. The profiles selected for IKEv1 and IKEv2 can differ. For information on IKE Crypto profiles, see [Network > Network Profiles > IKE Crypto](network-network-profiles-ike-crypto.html#ID0E1ABW). |
| Enable Fragmentation | Click to allow the local gateway to receive fragmented IKE packets. The maximum fragmented packet size is 576 bytes. |
| Dead Peer Detection | Click to enable and enter an interval (2 - 100 seconds) and retry count (2 - 100). Dead peer detection identifies inactive or unavailable IKE peers and can help restore resources that are lost when a peer is unavailable. |
| IKEv2 Advanced Options General Tab | |
| IKE Crypto Profile | Select an existing profile, keep the default profile, or create a new profile. The profiles selected for IKEv1 and IKEv2 can differ. For information on IKE Crypto profiles, see [Network > Network Profiles > IKE Crypto](network-network-profiles-ike-crypto.html#ID0E1ABW). |
| Strict Cookie Validation | Click to enable **Strict Cookie Validation** on the IKE gateway. • |






| • | When you disable **Strict Cookie Validation** (default), the system will check the number of half-open SAs against the global **Cookie Activation Threshold**, which is a VPN Sessions setting. If the number of half-open SAs exceeds the **Cookie Activation Threshold**, the initiator must send an IKE_SA_INIT containing a cookie. |
| --- | --- |







 IKEv2 Fragmentation


 Enable **IKEv2 Fragmentation** when using PQC KEMs to handle the large key sizes and data payloads. Both VPN termination devices should be set to the same fragmentation values. The default MTU values are IPv4: 576 and IPv6: 1280.




 Liveness Check


 The IKEv2 **Liveness Check** is always on; all IKEv2 packets serve the purpose of a liveness check. Click this box to have the system send empty informational packets after the peer has been idle for a specified number of seconds. Range: 2-100. Default: 5.
 If necessary, the side that is trying to send IKEv2 packets attempts the liveness check up to 10 times (all IKEv2 packets count toward the retransmission setting). If it gets no response, the sender closes and deletes the IKE_SA and CHILD_SA. The sender starts over by sending out another IKE_SA_INIT.




 IKEv2 Advanced Options PQ PPK Tab




 Enable Post-Quantum Pre-Shared Key (PPK)


 **Enable Post-Quantum Pre-Shared Key (PPK)**—To use post-quantum pre-shared keys (PPKs) to create post-quantum VPNs that resist attacks by quantum computers, enable PPKs and configure them in VPNs that support IKEv2. PPKs aren't supported for IKEv1. **Enable Post-Quantum Pre-Shared Key (PPK)** is disabled by default.
 **Negotiation Mode**:



| • | **Preferred**—If the responding peer supports PPKs ([RFC 8784](https://datatracker.ietf.org/doc/html/rfc8784)), it uses PPKs. If the peer doesn't support RFC 8784, the IKEv2 handshake falls back to the classic key exchange (Diffie-Hellman). This is the default Negotiation Mode. |
| --- | --- |






| • | **Mandatory**—The responding peer must support RFC 8784 PPKs. If the responding peer doesn't support RFC 8784, the initiating peer aborts the connection. |
| --- | --- |



 **PPK KeyID**—A name that identifies the associated PPK. The initiating peer PPK transmits the PPK KeyID to the responding peer so the responding peer can look up the associated PPK.
 **Post-Quantum Pre-shared Key (PPK)**—The secret key, which is associated with its KeyID. The PPK is never transmitted between peers, so it isn't natively vulnerable to a Harvest Now, Decrypt Later attack and it isn't vulnerable to [Shor's algorithm](https://en.wikipedia.org/wiki/Shor%27s_algorithm).
 Note:**For IKEv2 peers to negotiate using a PPK, both peers must have the exact same KeyID plus PPK pairs configured in their IKEv2 Gateways. If an initiator attempts to peer with a responder that doesn't have the corresponding KeyID plus PPK pair, the attempt is aborted.
 **Activate**—Shows which PPKs the firewall can use. You must activate at least one PPK. The firewall randomly selects a PPK from the activated PPKs to initiate IKEv2 peering with the responding peer. You activate and deactivate PPKs when you Add** them or when you edit them. In accordance with RFC 8784, once the firewall selects a PPK, the firewall uses that PPK for the duration of the IKEv2 gateway's lifetime, including through IKE rekeys. The firewall excludes deactivated PPKs from selection.
 You can **Add** up to ten PPK KeyID plus PPK pairs. In the **Add Post-Quantum Pre-shared Key** dialog box:



| • | **PPK KeyID**—The name that identifies the PPK Secret (the pre-shared key string). You can use any string value, such as "PPK_ID1" or "Super_Strong_PPK5". |
| --- | --- |






| • | **PPK Secret**—A string that can range from 32-128 characters (16-64 bytes). The longer the string, the stronger the key. The PPK Secret is associated with its PPK KeyID. You can enter a string of your choosing or you can have the firewall automatically **Generate Strong PPK**. |
| --- | --- |



 Fastpath:**Configure a string that is at least 64 characters (32 bytes) in length.
 The firewall never transmits the PPK between peers, so it isn't natively vulnerable to a Harvest Now, Decrypt Later attack, and it isn't vulnerable to Shor's algorithm.



| • | **Confirm PPK Secret**—The PPK Secret string must exactly match the string you entered in the PPK Secret** field. |
| --- | --- |






| • | **Activate**—Check this box to activate the PPK for use for IKEv2 peering. New PPKs are activated by default. Uncheck the box to deactivate a PPK. You can activate and deactivate PPKs when you **Add** them and when you select and edit them. |
| --- | --- |






| • | **PPK length (characters)**—If you choose to have the firewall generate a strong PPK Secret for you instead of typing in a PPK Secret, the field sets the length of the automatically generated PPK sting. The default is 32 characters (the minimum length) but for best security, generate strings that are at least 64 characters (32 bytes) in length. |
| --- | --- |






| • | **Generate Strong PPK**—Click to make the firewall generate a PPK Secret string of the length specified in the **PPK length (characters)** field. |
| --- | --- |



 When you let the firewall generate a strong PPK Secret, the result appears in the **Strong PPK Secret** dialog box. Select and copy the string, then paste the string into the **PPK Secret** and **Confirm PPK Secret** fields, and save the secret in a secure location so that you can communicate it to the peer's administrator to install it on the peer. Copy only the hexadecimal string, don't copy the "PPK:" that precedes it. For example, if the generated PPK displays as:
 PPK: 2b02b6ea61241c29180998458c2e27a6
 only copy and paste the hexadecimal string:
 2b02b6ea61241c29180998458c2e27a6
 Fastpath:**Make sure that you guard the PPK Secret string carefully against exposure. If you need to communicate the string to another administrator, use a secure mechanism such as encrypted email. If bad actors obtain the PPK Secret, they have a better chance of cracking the encryption key with a quantum computer and Shor's algorithm.




 IKEv2 Advanced Options PQ KEM Tab




 Enable Post-Quantum Key Exchange


 **Enable Post-Quantum Key Exchange** to use IKEv2 KEM hybrid keys. To create post-quantum VPNs that resist attacks by quantum computers, enable hybrid keys and configure them in VPNs that support IKEv2. Configure the IKE Crypto profile to select the KEMs to use for the hybrid key. Enable Post-Quantum Key Exchange** is disabled by default.
 Select **Block IKEv2 if vulnerable cipher is used** to block IKE peering when a known vulnerable cipher is the only available cipher. The setting is enabled by default.



 Parent topic
 [Network > Network Profiles > IKE Gateways](network-network-profiles-ike-gateways.html#ID0EF12V)