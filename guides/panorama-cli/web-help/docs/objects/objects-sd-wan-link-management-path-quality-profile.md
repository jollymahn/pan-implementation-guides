# Objects > SD-WAN Link Management > Path Quality Profile

*Objects : Objects &gt; SD-WAN Link Management : Objects &gt; SD-WAN Link Management &gt; Path Quality Profile*

Objects > SD-WAN Link Management > Path Quality Profile

SD-WAN allows you to create a path quality profile for each set of applications, application filters, application groups, services, service objects, and service group objects that has unique network quality requirements and reference the profile in an SD-WAN policy rule. In the profile you set maximum thresholds for three parameters: latency, jitter, and packet loss. When an SD-WAN link exceeds any one of the thresholds, the firewall selects a new best path for packets matching the SD-WAN rule where you apply this profile.


The sensitivity setting for each path quality parameter allows you to indicate to the firewall which parameter is more important (preferred) for the application(s) to which the profile applies. The firewall places more importance on a parameter with a high setting than a parameter with a medium or low setting. For example, some applications are more sensitive to packet loss than to jitter or latency, so you could set packet loss to high sensitivity, which causes the firewall to examine packet loss first.


If you let the sensitivity settings for latency, jitter, and packet loss remain at the default setting (medium) or if you set all three parameters to the same setting, the order of preference for the profile is packet loss, latency, jitter.


By default, the firewall measures latency and jitter every 200ms and takes an average of the last three measurements to measure path quality in a sliding window. You can modify this behavior by selecting aggressive or relaxed path monitoring when you configure an SD-WAN Interface Profile.



| | Path Quality Profile Settings |
| --- | --- |
| Name | Enter a name for the path quality profile using a maximum of 31 alphanumeric characters, underscore, hyphen, space, and period. |
| Shared (`Panorama only`) | Select to make the Path Quality profile available to all device groups on Panorama and to every virtual system on a multi-vsys hub or branch to which you push the configuration. |
| Disable override (`Panorama only`) | Select to prevent administrators from overriding the settings of this Path Quality Profile in device groups that inherit the profile. (Disable override is unavailable if Shared is selected.) |
| Latency (ms) | **Threshold**—Enter the number of milliseconds allowed for a packet to leave the firewall, arrive at the opposite end of the SD-WAN tunnel, and a response packet to return to the firewall before the threshold is exceeded (range is 10 to 2,000; default is 100). |
| **Sensitivity**—Select **high**, **medium**, or **low** (default is **medium**). | |
| Jitter (ms) | **Threshold**—Enter the number of milliseconds (range is 10 to 1,000; default is 100). |
| **Sensitivity**—Select **high**, **medium**, or **low** (default is **medium**). | |
| Packet Loss (%) | **Threshold**—Enter the percentage of packets lost on the link before the threshold is exceeded (range is 1 to 100.0; default is 1). |
| **Sensitivity**—The Sensitivity setting for Packet Loss has no effect, so leave the default setting (**medium**). | |


 Parent topic
 [Objects > SD-WAN Link Management](objects-sd-wan-link-management.html#ID0EO1GS)