# Objects > Packet Broker Profile

*Objects : Objects &gt; Packet Broker Profile*

## Objects > Packet Broker Profile


The Packet Broker profile defines how the firewall forwards traffic to a security chain, which is a set of inline, third-party security appliances that provides additional security inspection and enforcement. The profile defines the firewall interfaces used to connect to the security chain, the type of security chain (Routed Layer 3 or Layer 1 Transparent Bridge), the first and last appliances in a Layer 3 security chain, session distribution (load balancing) among multiple Layer 3 chains, and health monitoring and actions to take upon a path or HTTP latency failure. You attach a Packet Broker profile to a Packet Broker policy rule. The policy rule defines the traffic to forward to the security chain and the profile defines how to forward that traffic.


Before you can configure a Packet Broker profile, you must dedicate at least two Layer 3 interfaces on the firewall to forward traffic to the security chain.




| 1. | Select **Network** > **Interfaces** > **Ethernet**. |
| --- | --- |






| 2. | Select an interface to use for Packet Broker forwarding. |
| --- | --- |






| 3. | Set the **Interface Type** to **Layer3**. |
| --- | --- |






| 4. | Select **Advanced** > **Other Info**. |
| --- | --- |






| 5. | Select **Network Packet Broker** to enable the interface. |
| --- | --- |






| 6. | Repeat these steps with another Ethernet interface. If you want more than one dedicated connection (for example, to connect to multiple security chains), configure a pair of Ethernet interfaces for each dedicated connection. |
| --- | --- |





| Packet Broker Profile Settings | Description |
| --- | --- |
| Name | Give the profile a descriptive name. |
| Description | Optionally describe the profile settings or purpose. |
| General Tab | |
| Security Chain Type | Select the type of security chain to which the firewall forwards decrypted traffic: • |






| • | **Transparent Bridge**: In a transparent-bridge security-chain network, all security-chain devices have two Transparent Bridge mode interfaces connected to the security-chain network. Transparent Bridge interfaces do not have IP addresses, subnet masks, default gateways, or local routing tables. Security-chain appliances receive traffic on one interface, analyze the traffic and enforce security, and then the traffic egresses the other interface to the next security-chain device. |
| --- | --- |







 Enable IPv6


 (Transparent Bridge mode only) Enable IPv6 traffic forwarding.




 Flow Direction


 Select whether traffic enters the security chain from one firewall interface and exits the security to the other firewall interface, or if traffic can enter and exit the security chain from both firewall interfaces.



| • | **Unidirectional**—The firewall forwards all traffic to the security chain through **Interface #1** and receives the traffic back from the security chain on **Interface #2**. |
| --- | --- |



 Note:



| | Both interfaces must be in the same zone. |
| --- | --- |






| • | **Bidirectional **—The firewall forwards client-to-server traffic to the security chain through **Interface #1** and receives the traffic back from the security chain on **Interface #2**. |
| --- | --- |



 The firewall forwards server-to-client traffic to the security chain through **Interface #2** and receives the traffic back from the security chain on **Interface #1**.
 The flow direction you select depends on the type of appliances in the security chain. For example, if a security chain has stateless devices that can examine both sides of a session, you could choose a unidirectional flow.




 Interface #1


 The Network Packet Broker interfaces that the firewall uses to forward traffic to and receive traffic from a security chain. You must configure each interface as a Network Packet Broker interface, as described at the beginning of this help topic.




 Interface #2




 Security Chains Tab
 Configure one or multiple (for load balancing or redundancy) Layer 3 security chains on one pair of Network Packet Broker firewall interfaces. For the **Routed (Layer 3)** security chain type, you must configure at least one security chain to specify where to forward traffic. For multiple security chains, aswitch or other device must handle the routing between the firewall and the chains.
 Note:



| | The options on this tab are only available for Layer 3 (routed) security chains. |
| --- | --- |







 Enable


 Enable the security chain.




 Name


 Give the security chain a descriptive name.




 First Device


 Enter the IPv4 address of the first and last devices in the security chain or define a new Address Object to easily reference the device.




 Last Device




 Session Distribution Method


 When forwarding to multiple **Routed (Layer 3)** security chains, choose the method that the firewall uses to distribute sessions among multiple security chains:



| • | **IP Modulo**—The firewall assigns sessions based on the IP modulo hash of the source and destination IP addresses. |
| --- | --- |






| • | **IP Hash**—The firewall assigns sessions based on the IP hash of the source and destination IP addresses and port numbers. |
| --- | --- |






| • | **Round Robin**—The firewall allocates sessions evenly among security chains. |
| --- | --- |






| • | **Lowest Latency**—The firewall allocates more sessions to the security chain with the lowest latency. For this method to work as expected, you must also enable Latency Monitoring and HTTP Monitoring on the **Health Monitor** tab. |
| --- | --- |







 Health Monitor Tab




 On Health Check Failure


 When you enable health checks (**Path Monitoring**, **HTTP Monitoring**, or **HTTP Monitoring Latency**), you also decide what happens if a chain (or all chains if there are multiple chains) fails. If there are multiple chains and one or more chains fail a health check but at least one chain is still healthy, the firewall distributes traffic to the remaining chains based on the **Session Distribution Method**. If all of the chains associated with a pair of firewall Network Packet Broker interfaces, you can:



| • | **Bypass Security Chain**—The firewall forwards the traffic to its destination instead of to the failed chain(s). The firewall still applies configured security profiles and protections to the traffic. |
| --- | --- |






| • | **Block Session**—The firewall blocks the session. |
| --- | --- |







 Health Check Failed Condition


 If you configure more than one health check (you can configure all three health checks on a chain), configure how the firewall defines a failure:



| • | **OR Condition**—If any selected health check fails, the **On Health Check Failure** action occurs. |
| --- | --- |






| • | **AND Condition**—If all of the selected health checks fail, the **On Health Check Failure** action occurs. |
| --- | --- |







 Path Monitoring


 Enable path, HTTP latency, or HTTP monitoring, or a combination of the three health checks to identify when security chains experience a failure, and configure the metrics that determine when a failure has occurred:



| • | **Path Monitoring**—Checks device connectivity; set the ping count, ping interval in seconds, and recovery hold time in seconds. |
| --- | --- |






| • | **HTTP Monitoring**—Checks device availability and response time; set the HTTP count and HTTP interval in seconds. |
| --- | --- |






| • | **HTTP Monitoring Latency**—Checks device processing speed and efficiency; set the maximum latency in milliseconds, the latency duration in seconds, and log latency that exceeds the duration. When you select **HTTP Monitoring Latency**, **HTTP Monitoring** is automatically selected. Both must be selected to enable latency monitoring. |
| --- | --- |







 Latency Monitoring




 HTTP Monitoring



 Parent topic
 [Objects](objects.html#ID0EL3RQ)