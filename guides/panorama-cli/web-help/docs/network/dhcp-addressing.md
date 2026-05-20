# DHCP Addressing

*Network : Network &gt; DHCP : DHCP Addressing*

DHCP Addressing

There are three ways that a DHCP server either assigns or sends an IP address to a client:




| • | **Automatic allocation**—The DHCP server assigns a permanent IP address to a client from its **IP Pools**. On the firewall, a **Lease** specified as **Unlimited** means the allocation is permanent. |
| --- | --- |






| • | **Dynamic allocation**—The DHCP server assigns a reusable IP address from **IP Pools** of addresses to a client for a maximum period of time, known as a lease. This method of address allocation is useful when the customer has a limited number of IP addresses; they can be assigned to clients who need only temporary access to the network. |
| --- | --- |






| • | **Static allocation**—The network administrator chooses the IP address to assign to the client and the DHCP server sends it to the client. A static DHCP allocation is permanent; it is done by configuring a DHCP server and choosing a **Reserved Address** to correspond to the **MAC Address** of the client firewall. The DHCP assignment remains in place even if the client disconnects (logs off, reboots, has a power outage, etc.). |
| --- | --- |



 Static allocation of an IP address is useful, for example, if you have a printer on a LAN and you do not want its IP address to keep changing, because it is associated with a printer name through DNS. Another example is if a client firewall is used for something crucial and must keep the same IP address, even if the firewall is turned off, unplugged, rebooted, or a power outage occurs.
 Keep the following points in mind when configuring a **Reserved Address**:



| ◦ | It is an address from the **IP Pools**. You can configure multiple reserved addresses. |
| --- | --- |






| ◦ | If you configure no **Reserved Address**, the clients of the server will receive new DHCP assignments from the pool when their leases expire or if they reboot, etc. (unless you specified that a **Lease** is **Unlimited**). |
| --- | --- |






| ◦ | If you allocate every address in the **IP Pools** as a **Reserved Address**, there are no dynamic addresses free to assign to the next DHCP client requesting an address. |
| --- | --- |






| ◦ | You may configure a **Reserved Address** without configuring a **MAC Address**. In this case, the DHCP server will not assign the **Reserved Address** to any firewall. You might reserve a few addresses from the pool and statically assign them to a fax and printer, for example, without using DHCP. |
| --- | --- |



 Parent topic
 [Network > DHCP](network-dhcp.html#ID0ERRRV)