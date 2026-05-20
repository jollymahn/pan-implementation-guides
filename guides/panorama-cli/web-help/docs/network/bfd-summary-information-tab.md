# BFD Summary Information Tab

*Network : Network &gt; Virtual Routers : More Runtime Stats for a Virtual Router : BFD Summary Information Tab*

BFD Summary Information Tab

BFD summary information includes the following data.



| BFD Summary Information Runtime Stats | Description |
| --- | --- |
| Interface | Interface that is running BFD. |
| Protocol | Static route (IP address family of static route) or dynamic routing protocol that is running BFD on the interface. |
| Local IP Address | IP address of the interface where you configured BFD. |
| Neighbor IP Address | IP address of BFD neighbor. |
| State | BFD states of the local and remote BFD peers: **admin down**, **down**, **init**, or **up**. |
| Uptime | Length of time BFD has been up (hours, minutes, seconds, and milliseconds). |
| Discriminator (local) | Discriminator for local BFD peer. A discriminator is a unique, nonzero value the peers use to distinguish multiple BFD sessions between them. |
| Discriminator (remote) | Discriminator for remote BFD peer. |
| Errors | Number of BFD errors. |
| Session Details | Click **Details** to see BFD information for a session such as the IP addresses of the local and remote neighbors, the last received remote diagnostic code, number of transmitted and received control packets, number of errors, information about the last packet causing state change, and more. |


 Parent topic
 [More Runtime Stats for a Virtual Router](more-runtime-stats-for-a-virtual-router.html#ID0E4QNU)