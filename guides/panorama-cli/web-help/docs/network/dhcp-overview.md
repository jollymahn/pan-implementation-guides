# DHCP Overview

*Network : Network &gt; DHCP : DHCP Overview*

DHCP Overview



| • | Network > DHCP |
| --- | --- |




DHCP uses a client-server model of communication. This model consists of three roles that the firewall can fulfill: DHCP client, DHCP server, and DHCP relay agent.




| • | A firewall acting as a DHCP client (host) can request an IP address and other configuration settings from a DHCP server. Users on client firewalls save configuration time and effort, and need not know the addressing plan of the network or other network resources and options inherited from the DHCP server. |
| --- | --- |






| • | A firewall acting as a DHCP server can service clients. By using one of the DHCP addressing mechanisms, the administrator saves configuration time and has the benefit of reusing a limited number of IP addresses clients no longer need network connectivity. The server can also deliver IP addressing and DHCP options to multiple clients. |
| --- | --- |






| • | A firewall acting as a DHCP relay agent listens for broadcast and unicast DHCP messages and relays them between DHCP clients and servers. |
| --- | --- |




DHCP uses [User Datagram Protocol (UDP)](http://www.rfc-editor.org/rfc/rfc768.txt), [RFC 768](http://www.rfc-editor.org/rfc/rfc768.txt), as its transport protocol. DHCP messages that a client sends to a server are sent to well-known port 67 (UDP—Bootstrap Protocol and DHCP). DHCP messages that a server sends to a client are sent to port 68.

 Parent topic
 [Network > DHCP](network-dhcp.html#ID0ERRRV)