# Server Monitor Account

*User Identification : Device &gt; User Identification &gt; User Mapping : Palo Alto Networks User-ID Agent Setup : Server Monitor Account*

Server Monitor Account



| • | **Device** > **User Identification** > **User Mapping** > **Palo Alto Networks User-ID Agent Setup** > **Server Monitor Account** |
| --- | --- |




To configure the PAN-OS integrated User-ID agent to use [Windows Management Instrumentation (WMI)](https://msdn.microsoft.com/en-us/library/aa394582(v=vs.85).aspx) for probing client systems or Windows Remote Management (WinRM) over HTTP or over HTTPS to monitor servers for user mapping information, complete the following fields.


You can also [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z) by configuring a Kerberos server to authenticate server monitoring using Windows Remote Management (WinRM) over HTTP or over HTTPS.

 CAUTION:
 Because WMI probing trusts data that is reported back from an endpoint, Palo Alto Network recommends that you do not use this method to obtain User-ID mapping information in a high-security network. If you configure the User-ID agent to obtain mapping information by parsing Active Directory (AD) security event logs or syslog messages, or using the XML API, Palo Alto Networks recommends you disable WMI probing.
 If you do use WMI probing, do not enable it on external, untrusted interfaces. Doing so causes the agent to send WMI probes containing sensitive information—such as the username, domain name, and password hash of the User-ID agent service account—outside of your network. An attacker could potentially exploit this information to penetrate and gain further access to your network.


| Active Directory Authentication Settings | Description |
| --- | --- |
| User Name | Enter the domain credentials (**User Name** and **Password**) for the account that the firewall will use to access Windows resources. The account requires permissions to perform WMI queries on client computers and to monitor Microsoft Exchange servers and domain controllers. Use domain\username syntax for the **User Name**. If you [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z) using Kerberos for server authentication, enter the Kerberos User Principal Name (UPN). |
| Domain’s DNS Name | Enter the DNS name of the monitored server. If you [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z) using Kerberos for server authentication, enter the Kerberos Realm domain. You must configure this setting if you are using **WinRM-HTTP** as the transport protocol when you [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z). |
| Password/Confirm Password | Enter and confirm the password for the account that the firewall uses to access Windows resources. |
| Kerberos Server Profile | Select the Kerberos Server Profile for the Kerberos server that controls access to the Realm to retrieve security logs and session information from the monitored server with WinRM over HTTP or over HTTPS. |


 Note:



| | The [complete procedure](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/configure-user-mapping-using-the-pan-os-integrated-user-id-agent.html) to configure the PAN-OS integrated User-ID agent to monitor servers and probe clients requires additional tasks besides defining the Active Directory authentication settings. |
| --- | --- |



 Parent topic
 [Palo Alto Networks User-ID Agent Setup](user-id-agent-setup.html#ID0EN62Z)