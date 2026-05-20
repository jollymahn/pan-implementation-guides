# Network Services Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Gateways : GlobalProtect Gateways Agent Tab : Network Services Tab*

Network Services Tab



| • | **Network** > **GlobalProtect** > **Gateways** > <gateway-config> > **Agent** > <agent-config> > **Network Services** |
| --- | --- |




Select the **Network Services** tab to configure DNS settings that will are assigned to the virtual network adapter on the endpoint when the GlobalProtect app establishes a tunnel with the gateway.

 Note:



| | Network Services options are available only if you have enable tunnel mode and define a tunnel interface on the [Tunnel Settings Tab](tunnel-settings-tab.html#ID0EO2W1). |
| --- | --- |





| GlobalProtect Gateway Client Network Services Configuration Settings | Description |
| --- | --- |
| Inheritance Source | Select a source to propagate DNS server and other settings from the selected DHCP client or PPPoE client interface into the GlobalProtect apps’ configuration. With this setting, all client network configurations, such as DNS servers and WINS servers, are inherited from the configuration of the interface selected in the Inheritance Source. |
| Check inheritance source status | Click Inheritance Source to see the server settings that are currently assigned to the client interfaces. |
| Primary DNS Secondary DNS | Enter the IP addresses of the primary and secondary servers that provide DNS to the clients. |
| Primary WINS Secondary WINS | Enter the IP addresses of the primary and secondary servers that provide Windows Internet Naming Service (WINS) to the endpoints. |
| Inherit DNS Suffixes | Select this option to inherit the DNS suffixes from the inheritance source. |
| DNS Suffix | **Add** a suffix that the endpoint should use locally when an unqualified hostname, which it cannot resolve, is entered. You can enter multiple suffixes (up to 100) by separating each suffix with a comma. |


 Parent topic
 [GlobalProtect Gateways Agent Tab](globalprotect-gateways-agent-tab.html#ID0EDKW1)