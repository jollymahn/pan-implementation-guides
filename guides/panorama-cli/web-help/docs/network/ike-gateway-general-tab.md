# IKE Gateway General Tab

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; IKE Gateways : IKE Gateway General Tab*

IKE Gateway General Tab



| • | Network > Network Profiles > IKE Gateways > General |
| --- | --- |




The following table describes the beginning settings to [configure an IKE gateway](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/vpns/set-up-site-to-site-vpn/set-up-an-ike-gateway). IKE is Phase 1 of the IKE/IPSec VPN process. After configuring these settings, see [IKE Gateway Advanced Options Tab](ike-gateway-advanced-options-tab.html#ID0EGU5V).



| IKE Gateway General Settings | Description |
| --- | --- |
| Name | Enter a **Name** to identify the gateway (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Version | Select the IKE version that the gateway supports and must agree to use with the peer gateway: **IKEv1 only mode**, **IKEv2 only mode**, or **IKEv2 preferred mode**. IKEv2 preferred mode causes the gateway to negotiate for IKEv2 and that is what they will use if the peer also supports IKEv2; otherwise, the gateway falls back to IKEv1. Note:**To configure a post-quantum IKE VPN, you must use **IKEv2 only mode** or IKEv2 preferred mode**. Only IKEv2 VPNs support post-quantum capabilities that resist attacks from quantum computers. |
| Address Type | Select the type of IP address the gateway uses: **IPv4** or **IPv6**. |
| Interface | Specify the outgoing firewall interface to the VPN tunnel. |
| Local IP Address | Select or enter the IP address for the local interface that is the endpoint of the tunnel. |
| Peer IP Address Type | Select one of the following settings and enter the corresponding information for the peer: • |






| • | **IP**—Enter **Peer Address** as an IPv4 or IPv6 address or an address object that is an IPv4 or IPv6 address. |
| --- | --- |






| • | **FQDN**—Enter **Peer Address** as an FQDN or an address object that uses an FQDN. |
| --- | --- |



 If you enter an FQDN or FQDN address object that resolves to more than one IP address, the firewall selects the preferred address from the set of addresses that match the Address Type (IPv4 or IPv6) of the IKE gateway as follows:



| ◦ | If no IKE security association (SA) has been negotiated, the preferred address is the IP address with the smallest value. |
| --- | --- |






| ◦ | If an address is used by the IKE gateway and is in the set of returned addresses, it is used (whether or not it is smallest). |
| --- | --- |






| ◦ | If an address is used by the IKE gateway but isn’t in the set of returned addresses, a new address is selected: the smallest address in the set. |
| --- | --- |



 Tip:
 Using an FQDN or FQDN address object reduces issues in environments where the peer is subject to dynamic IP address changes (and would otherwise require you to reconfigure this IKE gateway peer address).




 Authentication


 Select the type of authentication: **Pre-Shared Key** or **Certificate** that will occur with the peer gateway. Depending on the selection, see [Pre-Shared Key Fields](ike-gateway-general-tab.html#ID0ECF4V) or [Certificate Fields](ike-gateway-general-tab.html#ID0EJK4V).




 Pre-Shared Key Fields




 Pre-Shared Key /
 Confirm Pre-Shared Key


 If you select **Pre-Shared Key**, enter a single security key to use for symmetric authentication across the tunnel. The **Pre-Shared Key** value is a string that the administrator creates using a maximum of 255 ASCII or non-ASCII characters. Generate a key that is difficult to crack with dictionary attacks; use a pre-shared key generator, if necessary.




 Local Identification


 Defines the format and identification of the local gateway, which are used with the pre-shared key for both IKEv1 phase 1 SA and IKEv2 SA establishment.
 Choose one of the following types and enter the value: **FQDN** (hostname), **IP address**, **KEYID** (binary format ID string in HEX), or **User FQDN** (email address).
 If you don’t specify a value, the gateway will use the local IP address as the **Local Identification** value.




 Peer Identification


 Defines the type and identification of the peer gateway, which are used with the pre-shared key during IKEv1 phase 1 SA and IKEv2 SA establishment.
 Choose one of the following types and enter the value: **FQDN** (hostname), **IP address**, **KEYID** (binary format ID string in HEX), or **User FQDN** (email address).
 If you don’t specify a value, the gateway will use the IP address of the peer as the **Peer Identification** value.




 Certificate Fields




 Local Certificate


 If **Certificate** is selected as the **Authentication** type, from the drop-down, select a certificate that is already on the firewall.
 Alternatively, you could **Import** a certificate, or **Generate** a new certificate, as follows:
 **Import**:



| • | **Certificate Name**—Enter a name for the certificate you are importing. |
| --- | --- |






| • | **Shared**—Click if this certificate is to be shared among multiple virtual systems. |
| --- | --- |






| • | **Certificate File**—Click **Browse** to navigate to the location where the certificate file is located. Click on the file and select **Open**. |
| --- | --- |






| • | **File Format**—Select one of the following: |
| --- | --- |






| ◦ | **Base64 Encoded Certificate (PEM)**—Contains the certificate, but not the key. Cleartext. |
| --- | --- |






| ◦ | **Encrypted Private Key and Certificate (PKCS12)**—Contains both the certificate and the key. |
| --- | --- |






| • | **Private key resides on Hardware Security Module**—Click if the firewall is a client of an HSM server where the key resides. |
| --- | --- |






| • | **Import Private Key**—Click if a private key is to be imported because it is in a different file from the certificate file. |
| --- | --- |






| ◦ | **Block Private Key Export**—When you select **Import Private Key**, prevents any administrators, including Superusers, from exporting the private key. |
| --- | --- |






| ◦ | **Key File**—Browse and navigate to the key file to import. This entry is if you chose PEM as the File Format. |
| --- | --- |






| ◦ | **Passphrase** and **Confirm Passphrase**—Enter to access the key. |
| --- | --- |







 Local Certificate (cont)


 **Generate**:



| • | **Certificate Name**—Enter a name for the certificate you are creating. |
| --- | --- |






| • | **Common Name**—Enter the common name, which is the IP address or FQDN to appear on the certificate. |
| --- | --- |






| • | **Shared**—Click if this certificate is to be shared among multiple virtual systems. |
| --- | --- |






| • | **Signed By**—Select External Authority (CSR) or enter the firewall IP address. This entry must be a CA. |
| --- | --- |






| • | **Certificate Authority**—Click if the firewall is the root CA. |
| --- | --- |






| • | **Block Private Key Export**—Prevents any administrators, including Superusers, from exporting the private key. |
| --- | --- |






| • | **OCSP Responder**—Enter the OCSP that tracks whether the certificate is valid or revoked. |
| --- | --- |






| • | **Algorithm**—Select RSA or Elliptic Curve DSA to generate the key for the certificate. |
| --- | --- |






| • | **Number of Bits**—Select 512, 1024, 2048, or 3072 as the number of bits in the key. |
| --- | --- |






| • | **Digest**—Select md5, sha1, sha256, sha384, or sha512 as the method to revert the string from the hash. |
| --- | --- |






| • | **Expiration (days)**—Enter the number of days that the certificate is valid. |
| --- | --- |






| • | **Certificate Attributes**: **Type**—Optionally, select additional attribute types from the drop-down to be in the certificate. |
| --- | --- |






| • | **Value**—Enter a value for the attribute. |
| --- | --- |







 HTTP Certificate Exchange


 Click **HTTP Certificate Exchange** and enter the **Certificate URL** to use the Hash-and-URL method to tell the peer where to fetch the certificate. The Certificate URL is the URL of the remote server where you store your certificate.
 If the peer indicates that it also supports Hash and URL, then certificates are exchanged through the SHA1 Hash-and-URL exchange.
 When the peer receives the IKE certificate payload, it sees the HTTP URL and fetches the certificate from that server. Then the peer uses the hash specified in the certificate payload to check the certificates downloaded from the HTTP server.




 Local Identification


 Identifies how the local peer is identified in the certificate. Choose one of the following types and enter the value: **Distinguished Name** (Subject), **FQDN** (hostname), **IP address**, or **User FQDN** (email address).




 Peer Identification


 Identifies how the remote peer is identified in the certificate. Choose one of the following types and enter the value: **Distinguished Name** (Subject), **FQDN** (hostname), **IP address**, or **User FQDN** (email address).




 Peer ID Check


 Select **Exact** or **Wildcard**. This setting applies to the Peer Identification being examined to validate the certificate. For example, if the Peer Identification is a Name equal to domain.com, you select **Exact**, and the name of the certificate in the IKE ID payload is mail.domain2.com, the IKE negotiation will fail. But if you selected **Wildcard**, then only characters in the Name string before the wildcard asterisk (*) must match and any character after the wildcard can be different.




 Permit peer identification and certificate payload identification mismatch


 Select if you want the flexibility of having a successful IKE SA even though the peer identification does not match the certificate payload.




 Certificate Profile


 Select a profile or create a new **Certificate Profile** that configures the certificate options that apply to the certificate that the local gateway sends to the peer gateway. See [Device > Certificate Management > Certificate Profile](device-certificate-management-certificate-profile.html#ID0E5GBZ).




 Enable strict validation of peer’s extended key use


 Select if you want to strictly control how the key is used.



 Parent topic
 [Network > Network Profiles > IKE Gateways](network-network-profiles-ike-gateways.html#ID0EF12V)