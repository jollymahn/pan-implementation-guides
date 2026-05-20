# Block IP List Entries

*Monitor : Monitor &gt; Block IP List : Block IP List Entries*

Block IP List Entries



| • | **Monitor** > **BlockIPList** |
| --- | --- |




The following table explains the block list entry for a source IP address that the firewall is blocking.



| Field | Description |
| --- | --- |
| Block Time | Month/day and hours:minutes:seconds when the IP address went on the Block IP List. |
| Type | Type of block action: whether the hardware (hw) or software (sw) blocked the IP address. When you configure a DoS Protection policy or a Security policy that uses a Vulnerability Protection profile to block connections from source IPv4 addresses, the firewall automatically blocks that traffic in hardware before those packets use CPU or packet buffer resources. If attack traffic exceeds the blocking capacity of the hardware, the firewall uses software to block the traffic. |
| Source IP Address | Source IP address of the packet that the firewall blocked. |
| Ingress Zone | Security zone assigned to the interface where the packet entered the firewall. |
| Time Remaining | Number of seconds remaining for the IP address to be on the Block IP List. |
| Block Source | Name of the classified DoS Protection profile or Vulnerability protection object name where you specified the Block IP action. |
| Total Blocked IPs: x out of y (z% used) | Count of blocked IP addresses (x) out of the number of blocked IP addresses the firewall supports (y), and the corresponding percentage of blocked IP addresses used (z). |


 Parent topic
 [Monitor > Block IP List](monitor-block-ip-list.html#ID0EBOBO)