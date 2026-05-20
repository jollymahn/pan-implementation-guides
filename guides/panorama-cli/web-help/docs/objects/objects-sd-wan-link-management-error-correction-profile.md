# Objects > SD-WAN Link Management > Error Correction Profile

*Objects : Objects &gt; SD-WAN Link Management : Objects &gt; SD-WAN Link Management &gt; Error Correction Profile*

Objects > SD-WAN Link Management > Error Correction Profile

If your SD-WAN traffic includes an application that is sensitive to packet loss or corruption, such as audio, VoIP, or video conferencing, you can apply either Forward Error Correction (FEC) or packet duplication as a means of error correction. With FEC, the receiving firewall (decoder) can recover lost or corrupted packets by employing parity bits that the encoder embeds in an application flow. Packet duplication is an alternative method of error correction, in which an application session is duplicated from one tunnel to a second tunnel. Both methods require additional bandwidth and CPU overhead; therefore, apply FEC or packet duplication only to applications that can benefit from such a method. To employ one of these methods, create an Error Correction Profile and reference it in an SD-WAN policy rule for specific applications.


(You must also specify which interfaces are available for the firewall to select for error correction by indicating in an [SD-WAN Interface Profile](network-network-profiles-sd-wan-interface-profile.html#ID0EGWPW) that interfaces are **Eligible for Error Correction Profile interface selection**.)



| | Error Correction Profile Settings |
| --- | --- |
| Name | Add a descriptive name for the Error Correction Profile using a maximum of 31 alphanumeric characters. |
| Shared | Select to make the Error Correction Profile available to all device groups on Panorama and to every virtual system on a multi-vsys hub or branch to which you push the configuration. |
| Disable override | Select to prevent administrators from overriding the settings of this Error Correction Profile in device groups that inherit the profile. (**Disable override** is unavailable if **Shared** is selected.) |
| Activation Threshold (Packet Loss %) | When packet loss exceeds this percentage, FEC or packet duplication is activated for the configured applications in the SD-WAN policy rule where the Error Correction Profile is applied. Range is 1 to 99; default is 2. |
| Forward Error Correction / Packet Duplication | Select whether to employ forward error correction (FEC) or packet duplication. Packet duplication requires even more resources than FEC. |
| Packet Loss Correction Ratio | (`Forward Error Correction only`) Ratio of parity bits to data packets. The higher the ratio of parity bits to data packets that the encoder sends to the decoder, the higher the probability that the decoder can repair packet loss. However a higher ratio requires more redundancy and therefore more bandwidth overhead, which is a trade-off for achieving error correction. Select one of the predefined ratios: • |






| • | **20% (20:4)** |
| --- | --- |






| • | **30% (20:6)** |
| --- | --- |






| • | **40% (20:8)** |
| --- | --- |






| • | **50% (20:10)** |
| --- | --- |



 The parity ratio applies to the encoding firewall’s outgoing traffic. For example, if the hub parity ratio is 50% and the branch parity ratio is 20%, the hub will receive a ratio of 20% and the branch will receive a ratio of 50%.




 Recovery Duration (ms)


 Maximum number of milliseconds that the receiving firewall (decoder) can spend performing packet recovery on lost data packets using the parity packets it received; range is 1 to 5,000; default is 1,000.
 The firewall immediately sends data packets it receives to the destination. During the recovery duration for a block of data, the firewall performs packet recovery for any lost data packets. When the recovery duration expires, the associated parity bits for that block are discarded.
 The encoder sends the Recovery Duration value to the decoder; the Recovery Duration setting on the decoder has no impact.



 Parent topic
 [Objects > SD-WAN Link Management](objects-sd-wan-link-management.html#ID0EO1GS)