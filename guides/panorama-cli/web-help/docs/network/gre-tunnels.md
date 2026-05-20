# GRE Tunnels

*Network : Network &gt; GRE Tunnels : GRE Tunnels*

GRE Tunnels



| • | Network > GRE Tunnels |
| --- | --- |




First configure a tunnel interface ([Network > Interfaces > Tunnel](network-interfaces-tunnel.html#ID0EBCPT)). Then add a generic routing encapsulation (GRE) Tunnel and provide the following information, referencing the tunnel interface you created:



| GRE Tunnel Fields | Description |
| --- | --- |
| Name | Name of the GRE tunnel. |
| Interface | Select the interface to use as the local GRE tunnel endpoint (source interface), which is an Ethernet interface or subinterface, an Aggregate Ethernet (AE) interface, a loopback interface, or a VLAN interface. |
| Local Address | Select the local IP address of the interface to use as the tunnel interface address. |
| Peer Address | Enter the IP address at the opposite end of the GRE tunnel. |
| Tunnel Interface | Select the Tunnel interface that you configured. (This interface identifies the tunnel when it is the next hop for routing.) |
| TTL | Enter the TTL for the IP packet encapsulated in the GRE packet (range is 1 to 255; default is 64). |
| ERSPAN | Select to enable the firewall to decapsulate Encapsulated Remote Switched Port Analyzer (ERSPAN) data sent through the GRE tunnel. You can configure a network switch to use ERSPAN to send mirrored traffic through a GRE tunnel to the firewall for use by Security services like IoT Security. After decapsulating the data, the firewall inspects it similar to how it inspects traffic received on a TAP port. It then creates enhanced application logs (EALs) and traffic, threat, WildFire, URL, data, GTP (when GTP is enabled), SCTP (when SCTP is enabled), tunnel, auth, and decryption logs. The firewall forwards these logs to the logging service where IoT Security accesses and analyzes the data. |
| Copy ToS Header | Select to copy the Type of Service (ToS) field from the inner IP header to the outer IP header of the encapsulated packets to preserve the original ToS information. |
| Keep Alive | Select to enable the Keep Alive function for the GRE tunnel (disabled by default). If you enable Keep Alive, by default it takes three unreturned keepalive packets (Retries) at 10-second intervals for the GRE tunnel to go down, and it takes five Hold Timer intervals at 10-second intervals for the GRE tunnel to come back up. |
| Interval (sec) | Set the interval between keepalive packets that the local end of the GRE tunnel sends to the tunnel peer, and the interval that each Hold Timer waits after successful keepalive packets before the firewall re-establishes communication with the tunnel peer (range is 1 to 50; default is 10). |
| Retry | Set the number of intervals that keepalive packets are not returned before the firewall considers the tunnel peer to be down (range is 1 to 255; default is 3). |
| Hold Timer | Set the number of intervals that keepalive packets are successful before the firewall re-establishes communication with the tunnel peer (range is 1 to 64; default is 5). |


 Parent topic
 [Network > GRE Tunnels](network-gre-tunnels.html#ID0ERXQV)