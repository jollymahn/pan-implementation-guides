# Building Blocks of a BFD Profile

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; BFD Profile : Building Blocks of a BFD Profile*

Building Blocks of a BFD Profile



| • | Network > Network Profiles > BFD Profile |
| --- | --- |




You can enable BFD for a static route or dynamic routing protocol by applying the default BFD profile or a BFD profile that you create. The default profile uses the default BFD settings and cannot be changed. You can **Add** a new BFD profile and specify the following information.



| BFD Profile Settings | Description |
| --- | --- |
| Name | Name of the BFD profile (up to 31 characters). The name is case-sensitive and must be unique on the firewall. Use only letters, numbers, spaces, hyphens, and underscores. |
| Mode | Mode in which BFD operates: • |






| • | **Passive**—BFD waits for the peer to send control packets and responds as required. |
| --- | --- |







 Desired Minimum Tx Interval (ms)


 Minimum interval (in milliseconds) at which you want the BFD protocol to send BFD control packets. Minimum value on PA-7000 Series, PA-5450, PA-5430, PA-5420, PA-5410, and PA-3400 Series is 50; minimum on PA‑3200 Series is 100; minimum on the PA-400 is 150; minimum on VM-Series is 200 (maximum value is 10,000; default is 1000).
 Fastpath:
 If you have multiple protocols that use different BFD profiles on the same interface, configure the BFD profiles with the same **Desired Minimum Tx Interval**.




 Required Minimum Rx Interval (ms)


 Minimum interval (in milliseconds) at which BFD can receive BFD control packets. Minimum value on PA-7000 Series, PA-5450, PA-5430, PA-5420, PA-5410, and PA-3400 Series is 50; minimum on PA-3200 Series is 100; minimum on the PA-400 is 150; minimum on VM-Series is 200 (maximum value is 10,000; default is 1000).




 Detection Time Multiplier


 The local system calculates the detection time as the **Detection Time Multiplier** received from the remote system multiplied by the agreed transmit interval of the remote system (the greater of the **Required Minimum Rx Interval** and the last received **Desired Minimum Tx Interval**). If BFD does not receive a BFD control packet from its peer before the detection time expires, a failure has occurred (range is 2 to 50; default is 3).




 Hold Time (ms)


 Delay (in milliseconds) after a link comes up before the firewall transmits BFD control packets. **Hold Time** applies to BFD Active mode only. If the firewall receives BFD control packets during the **Hold Time**, it ignores them (range is 0-120000; default is 0). The default setting of 0 means no transmit **Hold Time** is used; the firewall sends and receives BFD control packets immediately after the link is established.




 Enable Multihop


 Enables BFD over multiple hops. Applies to BGP implementation only.




 Minimum Rx TTL


 Minimum Time-to-Live value (number of hops) BFD will accept (receive) when it supports multihop BFD. Applies to BGP implementation only (range is 1-254; there is no default).



 Parent topic
 [Network > Network Profiles > BFD Profile](network-network-profiles-bfd-profile.html#ID0ETMOW)