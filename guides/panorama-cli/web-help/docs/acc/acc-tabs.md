# ACC Tabs

*ACC : ACC Tabs*

## ACC Tabs




| • | **Network Activity**—Displays an overview of traffic and user activity on your network. This view focuses on the top most-used applications, the top users who generate traffic with a drill down into the bytes, content, threats, and URLs accessed by the user, and the most used Security policy rules against which traffic matches occur. In addition, you can view network activity by source or destination zone, region, or IP address; by ingress or egress interfaces; and by host information, such as the operating systems of the devices most commonly used on the network. |
| --- | --- |






| • | **Threat Activity**—Displays an overview of the threats on the network. It focuses on the top threats—vulnerabilities, spyware, viruses, hosts visiting malicious domains or URLs, top WildFire submissions by file type and application, and applications that use non-standard ports. The Compromised Hosts widget supplements detection with better visualization techniques. It uses the information from the correlated events tab ([Monitor > Automated Correlation Engine > Correlated Events](monitor-automated-correlation-engine-correlated-events.html#ID0EIHLM)) to present an aggregated view of compromised hosts on your network by source users or IP addresses, sorted on severity. |
| --- | --- |






| • | **Blocked Activity**—Focuses on traffic that was prevented from coming into the network. The widgets in this tab allow you to view activity denied by application name, username, threat name, content (files and data), and the top security rules with a deny action that blocked traffic. |
| --- | --- |






| • | **Mobile Network Activity**—Displays a visual representation of mobile traffic on your network using GTP logs generated from your Security policy rule configuration. This view includes interactive and customizable GTP Events, Mobile Subscriber Activity, and GTP Rejection Cause widgets to which you can apply ACC Filters and drill down to isolate the information you need. When you enable [SCTP Security](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp.html), widgets on this tab display a visual representation and details of SCTP events on the firewall, as well as the number of chunks sent and received per SCTP Association ID. |
| --- | --- |






| • | **Tunnel Activity**—Displays the activity of tunnel traffic that the firewall inspected based on your tunnel inspection policies. Information includes tunnel usage based on tunnel ID, monitor tag, user, and tunnel protocols such as Generic Routing Encapsulation (GRE), General Packet Radio Service (GPRS) tunneling protocol for user data (GTP-U), and non-encrypted IPSec. |
| --- | --- |






| • | **GlobalProtect Activity**—Displays an overview of user activity in your GlobalProtect deployment. Information includes the number of users and number of times users connected, the gateways to which users connected, the number of connection failures and the failure reason, a summary of authentication methods and GlobalProtect app versions used, and the number of endpoints that are quarantined. |
| --- | --- |






| • | **SSL Activity**—Displays the activity of decrypted and undecrypted TLS/SSL traffic based on your Decryption policies and profiles. You can see TLS activity compared to non-TLS activity, the amount of decrypted traffic versus the amount of undecrypted traffic, reasons for decryption failures, and successful TLS version and key exchange activity. Use this information to identify traffic that causes decryption issues and then use the Decryption Log and custom Decryption report templates to drill down into details and gain context about that traffic so that you can diagnose and fix issues accurately. |
| --- | --- |



 Note:



| | You can also customize tabs and widgets as described in [Working with Tabs and Widgets](working-with-tabs-and-widgets.html#ID0E3HEM). |
| --- | --- |



 Parent topic
 [ACC](acc.html#ID0EJICM)