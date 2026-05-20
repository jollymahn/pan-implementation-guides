# HA Active/Active Config

*Device : Device &gt; High Availability : HA Active/Active Config*

HA Active/Active Config



| • | Device > High Availability > Active/Active Config |
| --- | --- |




To configure settings for an Active/Active HA pair, select **Device** > **High Availability** > **Active/Active Config**.



| Active/Active Config Settings | Description |
| --- | --- |
| Packet Forwarding | **Enable** peers to forward packets over the HA3 link for session setup and for Layer 7 inspection (App-ID, Content-ID, and threat inspection) of asymmetrically routed sessions. |
| HA3 Interface | Select the data interface you plan to use to forward packets between active/active HA peers. The interface you use must be a dedicated Layer 2 interface set to Interface Type **HA**. Note:  |



 Note:



| | You must enable jumbo frames on all intermediary networking devices when using the HA3 interface. |
| --- | --- |







 VR Sync


 Force synchronization of all virtual routers configured on the HA peers.
 Use this option when the virtual router is not configured for dynamic routing protocols. Both peers must be connected to the same next-hop router through a switched network and must use static routing only.




 QoS Sync


 Synchronize the QoS profile selection on all physical interfaces. Use this option when both peers have similar link speeds and require the same QoS profiles on all physical interfaces. This setting affects the synchronization of QoS settings on the **Network** tab. QoS policy is synchronized regardless of this setting.




 Tentative Hold Time (sec)


 When a firewall in an HA active/active configuration fails, it will go into a tentative state. The transition from tentative state to active-secondary state triggers the Tentative Hold Time, during which the firewall attempts to build routing adjacencies and populate its route table before it will process any packets. Without this timer, the recovering firewall would enter the active-secondary state immediately and would silently discard packets because it would not have the necessary routes (default is 60 seconds).




 Session Owner Selection


 The session owner is responsible for all Layer 7 inspection (App-ID and Content-ID) for the session and for generating all Traffic logs for the session. Select one of the following options to specify how to determine the session owner for a packet:



| • | **First packet**—Select this option to designate the firewall that receives the first packet in a session as the session owner. This is the best practice configuration to minimize traffic across HA3 and distribute the dataplane load across peers. |
| --- | --- |






| • | **Primary Device**—Select this option if you want the active-primary firewall to own all sessions. In this case, if the active-secondary firewall receives the first packet, it will forward all packets requiring Layer 7 inspection to the active-primary firewall over the HA3 link. |
| --- | --- |







 Virtual Address


 Click **Add**, select the **IPv4** or **IPv6** tab and then click **Add** again to enter options to specify the type of HA virtual address to use: Floating or ARP Load Sharing. You can also mix the type of virtual address types in the pair. For example, you could use ARP load sharing on the LAN interface and a Floating IP on the WAN interface.



| • | **Floating**—Enter an IP address that will move between HA peers in the event of a link or system failure. Configure two floating IP addresses on the interface, so that each firewall will own one and then set the priority. If either firewall fails, the floating IP address transitions to the HA peer. |
| --- | --- |






| ◦ | **Device 0 Priority**—Set the priority for the firewall with Device ID 0 to determine which firewall will own the floating IP address. A firewall with the lowest value will have the highest priority. |
| --- | --- |






| ◦ | **Device 1 Priority**—Set the priority for the firewall with Device ID 1 to determine which firewall will own the floating IP address. A firewall with the lowest value will have the highest priority. |
| --- | --- |






| ◦ | **Failover address if link state is down**—Use the failover address when the link state is down on the interface. |
| --- | --- |






| ◦ | **Floating IP bound to the Active-Primary HA device**—Select this option to bind the floating IP address to the active-primary peer. In the event one peer fails, traffic is sent continuously to the active-primary peer even after the failed firewall recovers and becomes the active-secondary peer. |
| --- | --- |







 Virtual Address (cont)





| • | **ARP Load Sharing**—Enter an IP address that will be shared by the HA pair and provide gateway services for hosts. This option is only required if the firewall is on the same broadcast domain as the hosts. Select the **Device Selection Algorithm**: |
| --- | --- |






| ◦ | **IP Modulo**—Select the firewall that will respond to ARP requests based on the parity of the ARP requesters IP address. |
| --- | --- |






| ◦ | **IP Hash**—Select the firewall that will respond to ARP requests based on a hash of the ARP requesters IP address. |
| --- | --- |






 Parent topic
 [Device > High Availability](device-high-availability.html#ID0EOYXX)