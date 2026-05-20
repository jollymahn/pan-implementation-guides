# Protocol Protection

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Protocol Protection*

Protocol Protection



| • | Network > Network Profiles > Zone Protection > Protocol Protection |
| --- | --- |




The firewall normally allows non-IP protocols between Layer 2 zones and between virtual wire zones. Protocol protection allows you to control which non-IP protocols are allowed (include) or denied (exclude) between or within security zones on a Layer 2 VLAN or virtual wire. Examples of non-IP protocols include AppleTalk, Banyan VINES, Novell, NetBEUI, and Supervisory Control and Data Acquisition (SCADA) systems such as Generic Object Oriented Substation Event (GOOSE).


After you configure protocol protection in a Zone Protection profile, apply the profile to an ingress security zone on a Layer 2 VLAN or virtual wire.

 Fastpath:
 Enable Protocol Protection on internet-facing zones to prevent layer 2 traffic from protocols you don’t use from getting on your network.


| Zone Protection Profile Settings—Protocol Protection | Configured In | Description |
| --- | --- | --- |
| Rule Type | **Network** > **Network Profiles** > **Zone Protection** > **Protocol Protection** | Specify the type of list you are creating for protocol protection: • |






| • | **Exclude List**—Only the protocols on the list are denied; all other protocols are implicitly allowed. You cannot exclude IPv4 (0x0800), IPv6 (0x86DD), ARP (0x0806), or VLAN tagged frames (0x8100). |
| --- | --- |



 Fastpath:
 Use the Include List to allow only the layer 2 protocols you use and to deny all other protocols. This reduces the attack surface by denying the protocols you don’t use on the network. The firewall denies only the protocols that you add to the Exclude List and allows all other protocols that are not on the list. If you don’t configure Protocol Protection, all layer 2 protocols are allowed.




 Protocol Name


 Enter the protocol name that corresponds to the Ethertype code you are adding to the list. The firewall does not verify that the protocol name matches the Ethertype code but the Ethertype code does determine the protocol filter.




 Enable


 **Enable** the Ethertype code on the list. If you want to disable a protocol for testing purposes but not delete it, disable it, instead.




 Ethertype (hex)


 Enter an Ethertype code (protocol) preceded by 0x to indicate hexadecimal (range is 0x0000 to 0xFFFF). A list can have a maximum of 64 Ethertypes.
 Some sources of Ethertype codes are:



| • | [IEEE hexadecimal Ethertype](http://www.iana.org/assignments/ieee-802-numbers/ieee-802-numbers.xhtml) |
| --- | --- |






| • | [standards.ieee.org/develop/regauth/ethertype/eth.txt](http://standards-oui.ieee.org/ethertype/eth.txt) |
| --- | --- |






| • | [http://www.cavebear.com/archive/cavebear/Ethernet/type.html](http://www.cavebear.com/archive/cavebear/Ethernet/type.html) |
| --- | --- |






 Parent topic
 [Network > Network Profiles > Zone Protection](network-network-profiles-zone-protection.html#ID0EFHDW)