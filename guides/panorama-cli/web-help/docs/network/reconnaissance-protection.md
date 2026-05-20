# Reconnaissance Protection

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Zone Protection : Reconnaissance Protection*

Reconnaissance Protection



| • | Network > Network Profiles > Zone Protection > Reconnaissance Protection |
| --- | --- |




The following settings define reconnaissance protection:



| Zone Protection Profile Settings—Reconnaissance Protection | Configured In | Description |
| --- | --- | --- |
| TCP Port Scan | **Network** > **Network Profiles** > **Zone Protection** > **Reconnaissance Protection** | **Enable** configures protection against TCP port scans. |
| UDP Port Scan | **Enable** configures protection against UDP port scans. | |
| Host Sweep | **Enable** configures protection against host sweeps. | |
| IP Protocol Scan | **Enable** configures protection against IP protocol scans. | |
| Action | Action that the system will take in response to the corresponding reconnaissance attempt: • | **Allow**—Permits port scan, host sweep, or IP protocol scan reconnaissance. |






| • | (`Default`) **Alert**—Generates an alert for each port scan, host sweep, or IP protocol scan that meets the specified threshold within the specified time interval. |
| --- | --- |






| • | **Block**—Drops all subsequent packets from the source to the destination for the remainder of the specified time interval. |
| --- | --- |






| • | **Block IP**—Drops all subsequent packets for the specified **Duration**, in seconds (range is 1-3,600). **Track By** determines whether to block source or source-and-destination traffic. For example, block attempts above the threshold number per interval that are from a single source (more stringent), or block attempts that have a source and destination pair (less stringent). |
| --- | --- |



 Fastpath:
 Block all reconnaissance scans except your internal vulnerability testing scans.




 Interval (sec)


 Time interval, in seconds, for TCP or UDP port scan and IP protocol scan detection (range is 2-65,535; default is 2).
 Time interval, in seconds, for host sweep detection (range is 2-65,535; default is 10).




 Threshold (events)


 Number of detected port scan, host sweep, or IP protocol scan events within the specified time interval that triggers the specified action (range is 2-65,535; default is 100).
 Note:



| | Use the default event threshold to log a few packets for analysis before blocking reconnaissance attempts. |
| --- | --- |







 Source Address Exclusion


 IP addresses that you want to exclude from reconnaissance protection. The list supports a maximum of 20 IP addresses or Netmask address objects.



| • | **Name**—Enter a descriptive name for the address to exclude. |
| --- | --- |






| • | **Address Type**—Select IPv4 or IPv6 from the drop-down. |
| --- | --- |






| • | **Address**—Select an address or address object from the drop-down or enter one manually. |
| --- | --- |



 Fastpath:
 Exclude only IP addresses for trusted internal groups that perform vulnerability testing.



 Parent topic
 [Network > Network Profiles > Zone Protection](network-network-profiles-zone-protection.html#ID0EFHDW)