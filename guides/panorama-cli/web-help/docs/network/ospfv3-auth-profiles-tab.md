# OSPFv3 Auth Profiles Tab

*Network : Network &gt; Virtual Routers : OSPFv3 : OSPFv3 Auth Profiles Tab*

OSPFv3 Auth Profiles Tab



| • | Network > Virtual Router > OSPFv3 > Auth Profiles |
| --- | --- |




Use the following fields to configure authentication for OSPFv3.



| OSPFv3 – Auth Profile Settings | Description |
| --- | --- |
| Profile Name | Enter a name for the authentication profile. To authenticate the OSPF messages, first define the authentication profiles and then apply them to interfaces on the **OSPF** tab. |
| SPI | Specify the security parameter index (SPI) for packet traversal from the remote firewall to the peer. |
| Protocol | Specify either of the following protocols: • |






| • | **AH**—Authentication Header protocol |
| --- | --- |







 Crypto Algorithm


 Specify one of the following



| • | **None**—No crypto algorithm will be used. |
| --- | --- |






| • | **SHA1** (default)—Secure Hash Algorithm 1. |
| --- | --- |






| • | **SHA256**—Secure Hash Algorithm 2. A set of four hash functions with a 256 bit digest. |
| --- | --- |






| • | **SHA384**—Secure Hash Algorithm 2. A set of four hash functions with a 384 bit digest. |
| --- | --- |






| • | **SHA512**—Secure Hash Algorithm 2. A set of four hash functions with a 512 bit digest. |
| --- | --- |






| • | **MD5**—The MD5 message-digest algorithm. |
| --- | --- |







 Key/Confirm Key


 Enter and confirm an authentication key.




 Encryption (`ESP protocol only`)


 Specify one of the following:



| • | **3des** (default)—applies Triple Data Encryption Algorithm (3DES) using three cryptographic keys of 56 bits. |
| --- | --- |






| • | **aes-128-cbc**—applies the Advanced Encryption Standard (AES) using cryptographic keys of 128 bits. |
| --- | --- |






| • | **aes-192-cbc**—applies the Advanced Encryption Standard (AES) using cryptographic keys of 192 bits. |
| --- | --- |






| • | **aes-256-cbc**—applies the Advanced Encryption Standard (AES) using cryptographic keys of 256 bits. |
| --- | --- |






| • | **null**—No encryption is used. |
| --- | --- |







 Key/Confirm Key


 Enter and confirm an encryption key.



 Parent topic
 [OSPFv3](ospfv3.html#ID0EWH5T)