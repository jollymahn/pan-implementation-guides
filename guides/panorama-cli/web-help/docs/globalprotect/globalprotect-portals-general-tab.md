# GlobalProtect Portals General Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals General Tab*

GlobalProtect Portals General Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **General** |
| --- | --- |




Select the **General** tab to define the network settings that the GlobalProtect app uses to connect to the GlobalProtect portal. Optionally, you can disable the login page or specify a custom portal login and help pages for GlobalProtect. For information on how to create and import custom pages, refer to [Customize the Portal Login, Welcome, and HelpPages](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-portals/define-the-globalprotect-client-authentication-configurations/customize-the-globalprotect-portal-login-welcome-and-help-pages.html) in the [GlobalProtect Administrator’s Guide](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin.html).



| GlobalProtect Portal Settings | Description |
| --- | --- |
| Name | Type a name for the portal (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Location | For a firewall that is in multiple virtual system mode, the **Location** is the virtual system (vsys) where the GlobalProtect portal is available. For a firewall that is not in multi-vsys mode, **Location** selection is not available. After you save the portal, you cannot change **Location**. |
| Network Settings | |
| Interface | Select the name of the firewall interface that will be the ingress for communications from remote endpoints and firewalls. Warning:  Do not attach an interface management profile that allows Telnet, SSH, HTTP, or HTTPS to an interface where you have configured a GlobalProtect portal or gateway because this will expose the management interface to the internet. Refer to [Adminstrative Access Best Practices](https://docs.paloaltonetworks.com/best-practices/10-1/administrative-access-best-practices/administrative-access-best-practices.html) for more details on how to protect access to your management network. |
| IP Address | Specify the IP address on which to run the GlobalProtect portal web service. Select the **IP Address Type** and then enter the **IP Address**. • |






| • | The IP address must be compatible with the IP address type. For example, 172.16.1.0 for IPv4 or 21DA:D3:0:2F3b for IPv6. |
| --- | --- |






| • | If you choose **IPv4 and IPv6**, enter the appropriate IP address type for each. |
| --- | --- |







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




 Appearance




 Portal Login Page


 (`Optional`) Choose a custom login page for user access to the portal. You can select the **factory-default** page or **Import** a custom page. The default is **None**. To prevent access to this page from a web browser, **Disable** this page.




 Portal Landing Page


 (`Optional`) Choose a custom landing page for the portal. You can select the **factory-default** page or **Import** a custom page. The default is **None**.




 App Help Page


 (`Optional`) Choose a custom help page to assist the user with GlobalProtect. You can select the **factory-default** page or **Import** a custom page. The factory-default help page is provided with the GlobalProtect app software. If you select a custom help page, the GlobalProtect portal provides the help page with the GlobalProtect portal configuration. When you leave the default value of **None**, the GlobalProtect app suppresses the page and removes the option from the menu.



 Parent topic
 [Network > GlobalProtect > Portals](network-globalprotect-portals.html#ID0EJ3F1)