# Network > Network Profiles > IKE Crypto

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; IKE Crypto*

Network > Network Profiles > IKE Crypto

Use the **IKE Crypto Profiles** page to specify protocols and algorithms for identification, authentication, and encryption (IKEv1 or IKEv2, Phase 1).


To change the order in which an algorithm or group is listed, select the item and then click **Move Up** or **Move Down**. The order determines the first choice when settings are negotiated with a remote peer. The setting at the top of the list is attempted first, continuing down the list until an attempt is successful.



| IKE Crypto Profile Settings | Description |
| --- | --- |
| General Tab | |
| Name | Enter a name for the profile. |
| DH Group | Specify the priority for Diffie-Hellman (DH) groups. Click **Add** and select groups: **group1**, **group2**, **group5**, **group14**,**group15**, **group16**,**group19**, **group20**, or **group21**. For highest security, select an item and then click **Move Up** or **Move Down** to move the groups with higher numeric identifiers to the top of the list. For example, move **group14** above **group2**. |
| Authentication | Specify the priority for hash algorithms. Click **Add** and select algorithms. For highest security, select an item and then click **Move Up** or **Move Down** to change the order (top to bottom) to the following: • |






| • | **sha384** |
| --- | --- |






| • | **sha256** |
| --- | --- |






| • | **sha1** |
| --- | --- |






| • | **md5** |
| --- | --- |






| • | **non-auth** |
| --- | --- |



 Note:



| | If you select an AES-GCM algorithm for encryption, you must select the Authentication setting **non-auth**. The hash is automatically selected based on the DH Group selected. DH Group 19 and below uses **sha256**; DH Group 20 uses **sha384**. |
| --- | --- |







 Encryption


 Select the appropriate Encapsulating Security Payload (ESP) authentication options. Click **Add** and select algorithms. For highest security, select an item and then click **Move Up** or **Move Down** to change the order (top to bottom) to the following:



| • | **aes-256-gcm** (requires IKEv2; DH Group should be set to **group20**) |
| --- | --- |






| • | **aes-128-gcm** (requires IKEv2 and DH Group set to **group19**) |
| --- | --- |






| • | **aes-256-cbc** |
| --- | --- |






| • | **aes-192-cbc** |
| --- | --- |






| • | **aes-128-cbc** |
| --- | --- |






| • | **3des** |
| --- | --- |



 Note:



| | The **aes-256-gcm** and **aes-128-gcm** algorithms have authentication built into them; therefore, in those cases you must select the **Authentication** setting to be **non-auth**. |
| --- | --- |







 Key Lifetime


 Select unit of time and enter the length of time that the negotiated IKE Phase 1 key will be effective (default is 8 hours).



| • | IKEv2—Before the key lifetime expires, the SA must be re-keyed or else, upon expiration, the SA must begin a new Phase 1 key negotiation. |
| --- | --- |






| • | IKEv1—Will not actively do a Phase-1 re-key before expiration. Only when the IKEv1 IPSec SA expires will it trigger IKEv1 Phase 1 re-key. |
| --- | --- |







 IKEv2 Authentication Multiple


 Specify a value (range is 0-50; default is 0) that is multiplied by the Key Lifetime to determine the authentication count. The authentication count is the number of times that the gateway can perform IKEv2 IKE SA re-key before the gateway must start over with IKEv2 re-authentication. A value of 0 disables the re-authentication feature.




 Advanced Options Tab




 Post-Quantum IKEv2 Additional Key Exchange


 Optionally, enable **Post-Quantum IKEv2 Additional Key Exchange** rounds. You can add up to seven additional rounds (Round 1-7) for RFC 9370. At a minimum, you need one PQC KEM to add quantum resistance. Adding additional PQC KEMs further raises quantum resistance, but increases the size of the IKEv2 packets.




 Round 1 - Round 7 tabs


 **Add** PQCs to the individual Round tabs. Order the PQCs in the Additional Key Exchange Round by preference. The PQC listed at the top is preferred and is selected if the VPN termination device on the other side of the tunnel supports it. To negotiate the strongest PQC that both sides can support, place the highest security level PQC at the top of the list in each Additional Key Exchange Round.
 Do not negotiate the same PQC in more than one round as it doesn’t provide additional quantum resistance. RFC 9370 allows additional key exchange rounds to be skipped. Leave skipped rounds blank or set to **None**.



 Parent topic
 [Network > Network Profiles](network-network-profiles.html#ID0E631V)