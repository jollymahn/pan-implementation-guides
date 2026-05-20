# Network > Network Profiles > IPSec Crypto

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; IPSec Crypto*

Network > Network Profiles > IPSec Crypto

Select **Network** > **Network Profiles** > **IPSec Crypto** to configure IPSec Crypto profiles that specify protocols and algorithms for authentication and encryption in VPN tunnels based on IPSec SA negotiation (Phase 2).

 Note:



| | For VPN tunnels between GlobalProtect gateways and clients, see [Network > Network Profiles > GlobalProtect IPSec Crypto](network-network-profiles-globalprotect-ipsec-crypto.html#ID0EBQ2V). |
| --- | --- |





| IPSec Crypto Profile Settings | Description |
| --- | --- |
| General Tab | |
| Name | Enter a **Name** to identify the profile (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| IPSec Protocol | Select a protocol for securing data that traverses the VPN tunnel: • |






| • | **AH**—Authentication Header protocol authenticates the source and verifies data integrity. |
| --- | --- |



 Fastpath:
 Use **ESP** protocol because it provides connection confidentiality (encryption) as well as authentication.




 Encryption (`ESP protocol only`)


 Click **Add** and select the desired encryption algorithms. For highest security, use **Move Up** and **Move Down** to change the order (top to bottom) to the following: **aes-256-gcm**, **aes-256-cbc**, **aes-192-cbc**, **aes-128-gcm**, **aes-128-ccm** (the VM-Series firewall doesn’t support this option), **aes-128-cbc**, and **3des**. You can also select **null** (no encryption).
 Fastpath:
 Use a form of **AES** encryption. (3DES is a weak, vulnerable algorithm.)




 Authentication


 Click **Add** and select the desired authentication algorithms. For highest security, use **Move Up** and **Move Down** to change the order (top to bottom) to the following: **sha512**, **sha384**, **sha256**, **sha1**, **md5**. If the **IPSec Protocol** is **ESP**, you can also select **none** (no authentication).
 Fastpath:
 Use **sha256** or stronger authentication because **md5** and **sha1** are not secure. Use **sha256** for short-lived sessions and **sha384** or higher for traffic that requires the most secure authentication, such as financial transactions.




 DH Group


 Select the Diffie-Hellman (DH) group for Internet Key Exchange (IKE): **group1**, **group2**, **group5**, **group14**, **group15**, **group16**, **group19**, **group20**, or **group21**. For highest security, choose the group with the highest number. If you don’t want to renew the key that the firewall creates during IKE phase 1, select **no-pfs** (no perfect forward secrecy): the firewall reuses the current key for the IPSec security association (SA) negotiations.




 Lifetime


 Select units and enter the length of time (default is one hour) that the negotiated key will stay effective.




 Lifesize


 Select optional units and enter the amount of data that the key can use for encryption.




 Advanced Options Tab




 Post-Quantum IPSec Additional Key Exchange


 Optionally, enable **Post-Quantum IPSec Additional Key Exchange** rounds. You can add up to seven additional rounds (Round 1-7) with only one PQC permitted per round. At a minimum, one PQC is required to add quantum resistance. Adding additional PQCs further raises quantum resistance, but increases the size of the IPSec re-key packets.
 Configure both sides of the IPSec tunnel with the same PQC and security strength level in each Additional Key Exchange Round. If there is a mismatch, the re-key operation fails.
 Use the **Round 1** - **Round 7** drop-downs to display the supported PQCs that can be used for each Additional Key Exchange Round. Select the PQC to be used for the round. The PQC selected must match the other VPN device’s IPSec crypto setting for the same Additional Key Exchange Round. IPSec does not auto negotiate the PQC for each additional round as only one PQC can be configured.
 Do not negotiate the same PQC in more than one round as it doesn’t provide additional quantum resistance. RFC 9370 allows additional key exchange rounds to be skipped. Leave skipped rounds blank or set to **None**.



 Parent topic
 [Network > Network Profiles](network-network-profiles.html#ID0E631V)