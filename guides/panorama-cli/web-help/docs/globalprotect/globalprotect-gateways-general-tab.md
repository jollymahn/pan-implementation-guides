# GlobalProtect Gateways General Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Gateways : GlobalProtect Gateways General Tab*

GlobalProtect Gateways General Tab



| • | **Network** > **GlobalProtect** > **Gateways** > <gateway-config> > **General** |
| --- | --- |




Select the **General** tab to define the gateway interface to which the apps can connect and specify how the gateway authenticates endpoints.



| GlobalProtect Gateway General Settings | Description |
| --- | --- |
| Name | Enter a name for the gateway (up to **31** characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | For a firewall that is in multiple virtual system mode, the **Location** is the virtual system (vsys) where the GlobalProtect gateway is available. For a firewall that is not in multi-vsys mode, the **Location** field does not appear in the GlobalProtect Gateway dialog. Note:  |







 Network Settings Area




 Interface


 Select the name of the firewall interface that will serve as the ingress interface for remote endpoints. (These interfaces must already exist.)
 Warning:
 Do not attach an interface management profile that allows Telnet, SSH, HTTP, or HTTPS to an interface where you have configured a GlobalProtect portal or gateway because this will expose the management interface to the internet. Refer to [Adminstrative Access Best Practices](https://docs.paloaltonetworks.com/best-practices/10-1/administrative-access-best-practices/administrative-access-best-practices.html) for more details on how to protect access to your management network.




 IP Address


 (`Optional`) Specify the IP address for gateway access. Select the **IP Address Type**, then enter the **IP Address**.



| • | The IP address type can be **IPv4** (IPv4 traffic only), **IPv6** (IPv6 traffic only), or **IPv4 and IPv6**. Use **IPv4 and IPv6** if your network supports dual-stack configurations, where IPv4 and IPv6 run at the same time. |
| --- | --- |



 The IP address must be compatible with the IP address type. For example, 172.16.1.0 for IPv4 or 21DA:D3:0:2F3b for IPv6. If you choose **IPv4 and IPv6**, enter the appropriate address type for each.




 Log Settings




 Log Successful SSL Handshake


 (`Optional`) Creates detailed logs of successful SSL Decryption handshakes. Disabled by default.
 Note:



| | Logs consume storage space. Before you log successful SSL handshakes, ensure you have the resources available to store the logs. Edit **Device** > **Setup** > **Management** > **Logging and Reporting Settings** to check the current log memory allocation to and re-allocate log memory among log types. |
| --- | --- |







 Log Unsuccessful SSL Handshake


 Creates detailed logs of unsuccessful SSL Decryption handshakes so you can find the cause of decryption issues. Enabled by default.
 Note:



| | Logs consume storage space. To allocate more (or less) log storage space to Decryption logs, edit the log memory allocation (**Device** > **Setup** > **Management** > **Logging and Reporting Settings**). |
| --- | --- |







 Log Forwarding


 Specify the method and location to forward GlobalProtect SSL handshake (decryption) logs.



 Parent topic
 [Network > GlobalProtect > Gateways](network-globalprotect-gateways.html#ID0EDRU1)