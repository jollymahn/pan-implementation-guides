# Network > Routing > Routing Profiles > BFD

*Network : Network &gt; Routing &gt; Routing Profiles : Network &gt; Routing &gt; Routing Profiles &gt; BFD*

Network > Routing > Routing Profiles > BFD

Create a [Bidirectional Forwarding Detection profile](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing/create-bfd-profiles.html).



| BFD Routing Profiles | Description |
| --- | --- |
| Name | Enter a name for the BFD profile (maximum of 63 characters). The name must start with an alphanumeric character, underscore (_), or hyphen (-), and contain zero or more alphanumeric characters, underscore (_) or hyphen(-). No dot (.) or space is allowed. |
| Mode | Select mode: • |





| • | **Passive**—BFD waits for peer to send control packets and responds as required. |
| --- | --- |






 Desired Minimum Tx Interval (ms)


 Minimum interval, in milliseconds, at which you want the BFD protocol to send BFD control packets; you are thus negotiating the transmit interval with the peer. Range for PA-7000 Series, PA-5200 Series, PA-5400 Series, and PA-3400 Series is 50 to 10,000; range for PA-3200 Series is 100 to 10,000; range for PA-400 Series is 150 to 10,000; range for VM-Series is 200 to 10,000; default is 1,000.




 Desired Minimum Rx Interval (ms)


 Minimum interval, in milliseconds, at which BFD can receive BFD control packets. Range for PA-7000 Series, PA-5200 Series, PA-5400 Series, and PA-3400 Series is 50 to 10,000; range for PA-3200 Series is 100 to 10,000; range for PA-400 Series is 150 to 10,000; range for VM-Series is 200 to 10,000; default is 1,000.




 Detection Time Multiplier


 Range is 2 to 255; default is 3.
 The local system calculates the detection time as the **Detection Time Multiplier** received from the remote system multiplied by the agreed transmit interval of the remote system (the greater of the **Required Minimum Rx Interval** and the last received **Desired Minimum Tx Interval**). If BFD does not receive a BFD control packet from its peer before the detection time expires, a failure has occurred.




 Hold Time (ms)


 Delay, in milliseconds, after a link comes up before BFD transmits BFD control packets. **Hold Time** applies to BFD **Active** mode only. If BFD receives BFD control packets during the Hold Time, it ignores them. Range is 0 to 120,000; default is 0, which means no transmit Hold Time is used; BFD sends and receives BFD control packets immediately after the link is established.




 Enable Multihop


 Enable BFD over BGP multihop.




 Minimum Rx TTL


 Enter the minimum Time-to-Live (number of hops) BFD will accept (receive) in a BFD control packet when BGP supports multihop BFD. Range is 1 to 254; there is no default.



 Parent topic
 [Network > Routing > Routing Profiles](network-routing-routing-profiles.html#ID0ECYBV)