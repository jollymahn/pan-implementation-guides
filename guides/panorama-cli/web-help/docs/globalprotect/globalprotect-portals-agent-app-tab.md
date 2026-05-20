# GlobalProtect Portals Agent App Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Agent Tab : GlobalProtect Portals Agent App Tab*

GlobalProtect Portals Agent App Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Agent** > <agent-config> > **App** |
| --- | --- |




Select the **App** tab to specify how end users interact with the GlobalProtect apps installed on their systems. You can define different app settings for the different GlobalProtect configurations you create. See the [GlobalProtect Administrator’s Guide](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin.html) to learn more about the latest updates on the [GlobalProtect App Customization](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-portals/define-the-globalprotect-client-authentication-configurations/customize-the-globalprotect-app.html) settings.



| GlobalProtect App Configuration Settings | Description |
| --- | --- |
| Welcome Page | Select a welcome page to present to end users after they connect to GlobalProtect. You can select the **factory-default** page or **Import** a custom page. The default is **None**. |
| App Configurations | |
| Connect Method | • |






| • | **User-logon (Always On)**—The GlobalProtect app automatically establishes a connection to the portal after the user logs in to an endpoint. The portal responds by providing the app with the appropriate agent configuration. Subsequently, the app sets up a tunnel to one of the gateways specified in the agent configuration received from the portal. |
| --- | --- |






| • | **Pre-logon**—Pre-logon ensures remote Windows and Mac users are always connected to the corporate network and enables user logon scripts and application of domain policies when the user logs in to the endpoint. Because the endpoint can connect to the corporate network as if it were internal, users can log in with new passwords when their passwords expire or receive help with password recovery if they forget their password. With pre-logon, the GlobalProtect app establishes a VPN tunnel to a GlobalProtect gateway before the user logs in to the endpoint; the endpoint requests authentication by submitting a preinstalled machine certificate to the gateway. Then, on Windows endpoints, the gateway reassigns the VPN tunnel from the pre-logon user to the username that logged in to the endpoint. On Mac endpoints, the app disconnects and creates a new VPN tunnel for the user. |
| --- | --- |



 There are two pre-logon connect methods, either of which enables the same pre-logon functionality that takes place before users log in to the endpoint. However, after users log in to the endpoint, the pre-logon connect method determines when the GlobalProtect app connection is established:



| ◦ | **Pre-logon (Always On)**—The GlobalProtect app automatically attempts to connect and reconnect to GlobalProtect gateways. Mobile devices don't support pre-logon functionality, and therefore will default to the **User-logon (Always On)** connect method if this connect method is specified. |
| --- | --- |






| ◦ | **Pre-logon then On-demand**—Users must launch the GlobalProtect app and then initiate the connection manually. Mobile devices don't support pre-logon functionality, and therefore will default to the **On-demand (Manual user-initiated connection)** connect method if this connect method is specified. |
| --- | --- |







 GlobalProtect App Config Refresh Interval (hours)


 Specify the number of hours the GlobalProtect portal waits before it initiates the next refresh of an app’s configuration (range is from 1 to 168; default is 24).




 Allow User to Disable GlobalProtect App


 Specifies whether users are allowed to disable the GlobalProtect app and, if so, what—if anything—they must do before they can disable the app:



| • | **Allow**—Allow any user to disable the GlobalProtect app as needed. |
| --- | --- |






| • | **Disallow**—Don't allow end users to disable the GlobalProtect app. |
| --- | --- |






| • | **Allow with Comment**—Allow users to disable the GlobalProtect app on their endpoint but require that they submit their reason for disabling the app. |
| --- | --- |



 The GlobalProtect app prompts the user to:



| ◦ | Specify the reason for disconnecting the app. |
| --- | --- |






| ◦ | Choose the reason from the list displayed such as slow internet speed or latency. |
| --- | --- |



 Note:



| | The reasons for disconnecting are displayed only if you configure **Display the following reasons to disconnect GlobalProtect (Always-on mode)**. If you did not configure the GlobalProtect app to display the reasons for disconnecting, end users are prompted to provide a reason for disconnecting from the app. |
| --- | --- |






| • | **Allow with Passcode**—Allow users to enter a passcode to disable the GlobalProtect app. This option requires the user to enter and confirm a Passcode value that, like a password, does not display when typed. Typically, administrators provide a passcode to users before unplanned or unanticipated events prevent users from connecting to the network by using the GlobalProtect VPN. You can provide the passcode through email or as a posting on your organization’s website. |
| --- | --- |






| • | **Allow with Ticket**—This option enables a challenge-response mechanism where, after a user attempts to disable GlobalProtect, the endpoint displays an 8-character hexadecimal ticket request number. The user must contact the firewall administrator or support team (preferably by phone for security purposes) to provide this number. From the firewall (**Network** > **GlobalProtect** > **Portals**), the administrator or support person can then click **Generate Ticket** and enter the ticket **Request** number to obtain the **Ticket** number (also an 8-character hexadecimal number). The administrator or support person provides this ticket number to the user, who then enters it into the challenge field to disable the app. |
| --- | --- |







 Display the following reasons to disconnect GlobalProtect (Always-on mode)


 Specifies reasons for disconnecting from GlobalProtect (Always on mode).
 Configuration criteria:



| • | Configure up to four reasons. |
| --- | --- |






| • | Separate the reasons by commas, with no spaces between the commas (for example, Reason1,Reason2,Reason3,Reason4). |
| --- | --- |






| • | The maximum character count per reason is 30. |
| --- | --- |






| • | By default, there is always an "Other reason" option included at the end of the configured reasons, so users can enter a custom option if needed. |
| --- | --- |







 Allow User to Uninstall GlobalProtect App (Windows Only)


 Specifies whether users are allowed to uninstall the GlobalProtect app and, if so, what—if anything—they must do before they can uninstall the app:



| • | **Allow**—Allow any user to uninstall the GlobalProtect app as needed. |
| --- | --- |






| • | **Disallow**—Don't allow end users to uninstall the GlobalProtect app. |
| --- | --- |






| • | **Allow with Password**—Enforce a password to uninstall the GlobalProtect app. This option requires the user to enter and confirm a password before they can proceed with uninstallation. You can provide the password through email or as a posting on your organization’s website. |
| --- | --- |



 This option requires release version 8196-5685 and later.




 Allow User to Upgrade GlobalProtect App


 Specifies whether end users can upgrade the GlobalProtect app software and, if they can, whether they can choose when to upgrade:



| • | **Disallow**—Prevent users from upgrading the app software. |
| --- | --- |






| • | **Allow Manually**—Allow users to manually check for and initiate upgrades by selecting **Check Version** in the GlobalProtect app. |
| --- | --- |






| • | **Allow with Prompt** (default)—Prompt users when a new version is activated on the firewall and allow users to upgrade their software when it's convenient. |
| --- | --- |






| • | **Allow Transparently**—Automatically upgrade the app software whenever a new version becomes available on the portal. |
| --- | --- |






| • | **Internal**—Automatically upgrade the app software whenever a new version becomes available on the portal, but wait until the endpoint is connected internally to the corporate network. This prevents delays caused by upgrades over low-bandwidth connections. |
| --- | --- |







 Allow User to Sign Out from GlobalProtect App
 (`Windows, macOS, iOS, Android, and Chrome Only`)


 Specifies whether users are permitted to manually sign out of the GlobalProtect app:



| • | **Yes** (default)—Allow any user to sign out from the GlobalProtect app as needed. |
| --- | --- |






| • | **No**—Don't allow end users to sign out from the GlobalProtect app. |
| --- | --- |



 This option requires release version 8196-5685 and later.




 Use Single Sign-On (`Windows`)


 Select **No** to disable single sign-on (SSO). With SSO enabled (default), the GlobalProtect app automatically uses the Windows login credentials to authenticate and then connect to the GlobalProtect portal and gateway. GlobalProtect can also wrap third-party credentials to ensure that Windows users can authenticate and connect even when a third-party credential provider is used to wrap the Windows login credentials.




 Use Single Sign-On for Smart Card PIN (Windows)
 (`Windows 10 or later`)
 Requires release version 8451-6911 or later and GlobalProtect app version 6.0.0 or later.


 Use this setting to allow end users who authenticate through single sign-on (SSO) using a smart card to connect without having to reenter their smart card Personal Identification Number (PIN) in the GlobalProtect app for a seamless SSO experience. Note that GlobalProtect can only cache the PIN if the smart card provider allows it.
 Set the predeployed setting on the end-user endpoints before you can enable Use SSO for smartcard PIN. Then, to enable this setting select **Yes**.




 Use Single Sign-On (`macOS`)


 Select **No** to disable single sign-on (SSO). With SSO enabled (default), the GlobalProtect app automatically uses the macOS login credentials to authenticate and then connect to the GlobalProtect portal and gateway.
 This option requires release version 8196-5685 and later.




 Clear Single Sign-On Credentials on Logout
 (`Windows Only`)


 Select **No** to keep single sign-on credentials when the user logs out. Select **Yes** (default) to clear them and force the user to enter credentials upon the next login.




 Use Default Authentication on Kerberos Authentication Failure


 Select **No** to use only Kerberos authentication. Select **Yes** (default) to retry authentication by using the default authentication method after a failure to authenticate with Kerberos. This feature is supported for Mac and Windows endpoints only.




 Use Default Browser for SAML Authentication
 (`Requires GlobalProtect app 5.2 or later with release version 8284-6139 or later`)


 If you have configured the GlobalProtect portal to authenticate end users through Security Assertion Markup Language (SAML) authentication, select **Yes** to enable users to leverage the same login for GlobalProtect with their saved user credentials on the [default system browser](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-user-authentication/set-up-external-authentication/set-up-saml-authentication/enable-the-default-browser-for-saml-authenitcation.html) such as Chrome, Firefox, or Safari to connect to SAML-enabled applications. You must enable this setting if you're using SAML with the Cloud Authentication Service.
 If you enable this setting, you must also[change the pre-deployment settings](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-user-authentication/set-up-external-authentication/set-up-saml-authentication/enable-the-default-browser-for-saml-authenitcation.html) to enable the default browser on Windows, macOS, Linux, Android, and iOS endpoints to use the default system browser for SAML authentication.
 Tip:
 To prevent each connection from opening a new tab in the default browser, configure [an authentication override](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-user-authentication/set-up-two-factor-authentication/enable-two-factor-authentication-using-one-time-passwords-otps.html).




 Automatic Restoration of VPN Connection Timeout


 Enter a timeout value, in minutes, from 0 to 180 to specify the action the GlobalProtect app takes when the tunnel is disconnected due to network instability or endpoint state changes by entering; default is 30.



| • | 0—Disable this feature so that GlobalProtect does not attempt to reestablish the tunnel after the tunnel is disconnected. |
| --- | --- |






| • | 1-180—Enable this feature so that GlobalProtect attempts to reestablish the tunnel connection if the tunnel is down for a period of time that does not exceed the timeout value you specify here. For example, with a timeout value of 30 minutes, GlobalProtect does not attempt to reestablish the tunnel if the tunnel is disconnected for 45 minutes. However, if the tunnel is disconnected for 15 minutes, GlobalProtect attempts to reconnect because the number of minutes has not exceeded the timeout value. |
| --- | --- |



 Note:



| | With Always-On VPN, if a user switches from an external network to an internal network before the timeout value expires, GlobalProtect does not perform network discovery. As a result, GlobalProtect reestablishes the tunnel to the last known external gateway. To trigger internal host detection, the user must select Rediscover Network from the GlobalProtect console. |
| --- | --- |







 Wait Time Between VPN Connection Restore Attempts (min)


 Enter the amount of time, in seconds, the GlobalProtect app waits between attempts to reestablish the connection with the last-connected gateway when you enable **Automatic Restoration of VPN Connection Timeout**. Specify a longer or shorter wait time depending on your network conditions. The range is from 1 to 60 seconds; the default is 5.




 Endpoint Traffic Policy Enforcement
 (`Windows 10 or later and macOS 11 and later only`)
 Requires Content Release version 8450-6909 or later and GlobalProtect app 6.0.0 or later


 Configure endpoint traffic policy enforcement to prevent traffic on the physical adapter when the endpoint is connected to GlobalProtect. This protects against attempts to thwart security, such as malicious inbound connections, applications that bypass the tunnel by binding to the physical adapter, and end users tampering with the routing table to bypass the GlobalProtect tunnel.
 Select one of the following options to configure Endpoint Traffic Policy Enforcement:



| • | **No**—Disables endpoint traffic policy enforcement. This is the default setting. |
| --- | --- |






| • | **TCP/UDP Traffic Based on Tunnel IP Address Type**—Enables endpoint traffic policy enforcement for TCP/UDP traffic. This feature is enabled for traffic based on the tunnel IP address type. If the tunnel is IPv4, this feature applies only to IPv4 traffic. If the tunnel is IPv6, this features applies only to IPv6 traffic. |
| --- | --- |






| • | **All TCP/UDP Traffic**—Enables endpoint traffic policy enforcement for all TCP/UDP traffic regardless of the tunnel IP address type. If the tunnel IP address type is IPv4, endpoint traffic policy enforcement applies to all TCP/UDP (IPv4 or IPv6) traffic. If the tunnel IP address type is IPv6, endpoint traffic policy enforcement applies to all TCP/UDP (IPv4 or IPv6) traffic. |
| --- | --- |






| • | **All Traffic**—Enables endpoint traffic policy enforcement for all TCP, UDP, ICMP, and all other protocols regardless of the tunnel IP address type. |
| --- | --- |







 Enforce GlobalProtect Connection for Network Access


 Select **Yes** to force all network traffic to traverse a GlobalProtect tunnel. Select **No** (default) if GlobalProtect is not required for network access and users can still access the internet even when GlobalProtect is disabled or disconnected.
 To provide instructions to users before traffic is blocked, configure a **Traffic Blocking Notification Message** and optionally specify when to display the message (**Traffic Blocking Notification Delay**).
 To permit traffic required to establish a connection with a captive portal, specify a **Captive Portal Exception Timeout**. The user must authenticate with the portal before the timeout expires. To provide additional instructions, configure a **Captive Portal Detection Message** and optionally specify when to display the message (**Captive Portal Notification Delay**).
 Note:



| | In most cases, use the default selection **No**. Selecting **Yes** blocks all network traffic to and from the endpoint until the app connects to an internal gateway inside the enterprise or to an external gateway outside the enterprise network. |
| --- | --- |







 Allow traffic to specified hosts/networks when Enforce GlobalProtect Connection for Network Access is enabled and GlobalProtect Connection is not established


 If desired, you can configure up to ten IP addresses or network segments for which you want to allow access when you enforce GlobalProtect for network access but the connection is not established. Separate multiple values with commas and do not add a space between entries. Exclusions can improve the user experience by allowing users to access local resources when GlobalProtect is disconnected. For example, when GlobalProtect is not connected, GlobalProtect can exclude link-local addresses to allow access to a local network segment or broadcast domain.




 Allow traffic to specified FQDN when Enforce GlobalProtect Connection for Network Access is enabled and GlobalProtect Connection is not established
 (`Windows and macOS 10.15.4 or later`)
 Requires Content Release version 8284-6139 or later and GlobalProtect app 5.2 or later.


 Specify the fully qualified domain names (FQDNs) for which you allow access when you enforce GlobalProtect connections for network access. You can configure up to 40 fully qualified domain names for which you want to allow access when you enforce GlobalProtect connections for network access and GlobalProtect cannot establish a connection. By configuring FQDN exclusions, you can improve the user experience by allowing end users to access specific resources when GlobalProtect is disconnected. For example, the endpoint can communicate with a cloud-hosted identity provider (ldP) for authentication purposes or a remote device management server even when the Enforce GlobalProtect for Network Access feature is enabled.
 CAUTION:**Due to a recent change in macOS, enforcing GlobalProtect connections with FQDN exclusions for multiple network extensions being loaded at a time does not work in certain situations, such as in environments where DnsClient.Net, GlobalProtect with the **Allow traffic to specified FQDN when Enforce GlobalProtect Connection for Network Access is enabled and GlobalProtect Connection is not established** setting enabled, and Cortex XDR are running.




 Captive Portal Exception Timeout (sec)


 To enforce GlobalProtect for network access but provide a grace period to allow users enough time to connect to a captive portal, specify the timeout in seconds (range is 0 to 3600). For example, a value of 60 means the user must log in to the captive portal within one minute after GlobalProtect detects the captive portal. A value of 0 means GlobalProtect does not allow users to connect to a captive portal and immediately blocks access.




 Automatically Launch Web Page in Default Browser Upon Captive Portal Detection


 To automatically launch your default web browser upon captive portal detection so that users can log in to the captive portal seamlessly, enter the fully qualified domain name or IP address of the website that you want to use for the initial connection attempt that initiates web traffic when the default web browser launches (maximum length is 256 characters). The captive portal then intercepts this website connection attempt and redirects the default web browser to the captive portal login page. If this field is empty (default), GlobalProtect does not launch the default web browser automatically upon captive portal detection.




 Traffic Blocking Notification Delay (sec)


 Specify a value, in seconds, to determine when to display the notification message. GlobalProtect starts the countdown to display the notification after the network is reachable (range is 5 to 120; default is 15).




 Display Traffic Blocking Notification Message


 Specifies whether a message appears when GlobalProtect is required for network access. Select No** to disable the message. Select **Yes** to enable the message (GlobalProtect displays the message when GlobalProtect is disconnected but detects that the network is reachable.)




 Traffic Blocking Notification Message


 Customize a notification message to display to users when GlobalProtect is required for network access. GlobalProtect displays the message when GlobalProtect is disconnected but detects the network is reachable. The message can indicate the reason for blocking the traffic and provide instructions on how to connect. For example:
 To access the network, you much first connect to GlobalProtect.
 The message must be 512 or fewer characters.




 Allow User to Dismiss Traffic Blocking Notifications


 Select **No** to always display traffic blocking notifications. By default the value is set to **Yes** meaning users are permitted to dismiss the notifications.




 Display Captive Portal Detection Message


 Specifies whether a message appears when GlobalProtect detects a captive portal. Select **Yes** to display the message. Select **No** (default) to suppress the message (GlobalProtect does not display a message when GlobalProtect detects a captive portal).
 CAUTION:
 If you enable a Captive Portal Detection Message, the message appears 85 seconds before the Captive Portal Exception Timeout. So if the Capture Portal Exception Timeout is 90 seconds or less, the message appears 5 seconds after a captive portal is detected.




 Captive Portal Detection Message


 Customize a notification message to display to users when GlobalProtect detects the network which provides additional instructions for connecting to a captive portal. For example:
 GlobalProtect has temporarily permitted network access for you to connect to the internet. Follow instructions from your internet provider. If you let the connection time out, open GlobalProtect and click Connect to try again.
 The message must be 512 or fewer characters.




 Captive Portal Notification Delay (sec)


 If you enable a Captive Portal Detection Message, you can specify the delay in seconds after captive portal detection at which GlobalProtect displays the detection message (range is 1 to 120; default is 5).




 Client Certificate Store Lookup


 Select the type of certificate or certificates that an app looks up in its personal certificate store. The GlobalProtect app uses the certificate to authenticate to the portal or a gateway and then establish a VPN tunnel to the GlobalProtect gateway.
 Note:
 It is recommended to use user and machine store for pre-logon user profile if you want to use the user store after login. Pre-logon users will only use the machine store, but setting this parameter to machine only will prevent the user from using the user store until the app gets configuration from the GlobalProtect portal.



| • | **User**—Authenticate by using the certificate that is local to the user’s account. |
| --- | --- |






| • | **Machine**—Authenticate by using the certificate that is local to the endpoint. This certificate applies to all the user accounts permitted to use the endpoint. |
| --- | --- |






| • | **User and machine** (default)—Authenticate by using the user certificate and the machine certificate. |
| --- | --- |







 SCEP Certificate Renewal Period (days)


 This mechanism is for renewing a SCEP-generated certificate before the certificate actually expires. You specify the maximum number of days before certificate expiry that the portal can request a new certificate from the SCEP server in your PKI system (range is 0 to 30; default is 7). A value of 0 means that the portal does not automatically renew the client certificate when it refreshes a client configuration.
 For an app to get the new certificate, the user must log in during the renewal period (the portal does not request the new certificate for a user during this renewal period unless the user logs in).
 For example, suppose that a client certificate has a lifespan of 90 days and this certificate renewal period is 7 days. If a user logs in during the final 7 days of the certificate lifespan, the portal generates the certificate and downloads it along with a refreshed client configuration. See [GlobalProtect App Config Refresh Interval (hours)](globalprotect-portals-agent-app-tab.html#ID0E6IM1).




 Extended Key Usage OID for Client Certificate
 (`Windows and macOS only`)


 Use this option to provide an object identifier (OID) that you want GlobalProtect to use to determine which client certificate to select to simplify and improve the certificate selection process when your macOS or Windows endpoints have multiple certificates installed.
 By default, GlobalProtect automatically filters the certificates for those that specify a Client Authentication purpose (OID 1.3.6.1.5.5.7.3.2) so it is not necessary to specify the OID associated with Client Authentication. However, if you want to use a different OID to distinguish the certificate you want GlobalProtect to select, you can specify a different certificate usage when you create the certificate and then set the **Extended Key Usage OID for Client Certificate** to the corresponding OID. Some of the most commonly used OIDs are:



| • | 1.3.6.1.5.5.7.3.1—Server Authentication |
| --- | --- |






| • | 1.3.6.1.5.5.7.3.3—Code Signing |
| --- | --- |






| • | 1.3.6.1.5.5.7.3.4—Email Protection |
| --- | --- |






| • | 1.3.6.1.5.5.7.3.5—IPSec End System |
| --- | --- |






| • | 1.3.6.1.5.5.7.3.6—IPSec Tunnel |
| --- | --- |






| • | 1.3.6.1.5.5.7.3.7—IPSec User |
| --- | --- |






| • | 1.3.6.1.5.5.7.3.8—Time Stamping |
| --- | --- |






| • | 1.3.6.1.5.5.7.3.9—OCSP Signing |
| --- | --- |







 Retain Connection on Smart Card Removal
 (`Windows Only`)


 Select **Yes** to retain the connection when a user removes a smart card containing a client certificate. Select **No** (default) to terminate the connection when a user removes a smart card.




 Enable Advanced View


 Select **No** to restrict the user interface on the app to the basic, minimum view (enabled by default).




 Allow User to Dismiss Welcome Page


 Select **No** to force the Welcome Page to appear each time a user initiates a connection. This restriction prevents a user from dismissing important information, such as terms and conditions that may be required by your organization to maintain compliance.




 Have User Accept Terms of Use before Creating Tunnel


 Select **Yes** to require the end user to accept terms of use to comply with corporate policies and to see a page to review your company’s terms of service before connecting to GlobalProtect.
 Before you set this option to **Yes**, you must configure the [GlobalProtect Welcome page](https://docs.paloaltonetworks.com/globalprotect/9-1/globalprotect-admin/globalprotect-portals/customize-the-globalprotect-portal-login-welcome-and-help-pages) through **Network** > **GlobalProtect** > **Portals** > <portal_config > **General)**.




 Enable Rediscover Network Option


 Select **No** to prevent users from manually initiating a network rediscovery.




 Enable Resubmit Host Profile Option


 Select **No** to prevent users from manually triggering resubmission of the latest HIP.




 Allow User to Change Portal Address


 Select **No** to disable the **Portal** field on the **Home** tab in the GlobalProtect app. However, because the user will then be unable to specify a portal to which to connect, you must supply the default portal address in the Windows registry or Mac plist:



| • | **Windows registry**—HKEY_LOCAL_MACHINE\SOFTWARE\PaloAlto Networks\GlobalProtect\PanSetup with key Portal |
| --- | --- |






| • | **Mac plist**—/Library/Preferences/com.paloaltonetworks.GlobalProtect.pansetup.plist with key Portal |
| --- | --- |



 For more information about pre-deploying the portal address, see [Customizable App Settings](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-portals/define-the-globalprotect-client-authentication-configurations/customize-the-globalprotect-app) in the GlobalProtect Administrator’s Guide.




 Allow User to Continue with Invalid Portal Server Certificate


 Select **No** to prevent the app from establishing a connection with the portal if the portal certificate is not valid.




 Display GlobalProtect Icon


 Select **No** to hide the GlobalProtect icon on the endpoint. If the icon is hidden, users cannot perform certain tasks, such as viewing troubleshooting information, changing passwords, rediscovering the network, or performing an on-demand connection. However, HIP notification messages, login prompts, and certificate dialogs do display when user interaction is necessary.




 User Switch Tunnel Rename Timeout (sec)
 (`Windows only`)


 Specify the number of seconds that a remote user has to be authenticated by a GlobalProtect gateway after logging into an endpoint by using Microsoft’s Remote Desktop Protocol (RDP) (range is 0 to 600; default is 0). Requiring the remote user to authenticate within a limited amount of time maintains security.
 After authenticating the new user and switching the tunnel to the user, the gateway renames the tunnel.
 A value of 0 means that the current user’s tunnel is not renamed but, instead, is immediately terminated. In this case, the remote user gets a new tunnel and has no time limit for authenticating to a gateway (other than the configured TCP timeout).




 Pre-Logon Tunnel Rename Timeout (sec) (`Windows Only`)


 This setting controls how GlobalProtect handles the pre-logon tunnel that connects an endpoint to the gateway.
 A value of -1 means the pre-logon tunnel does not time out after a user logs on to the endpoint; GlobalProtect renames the tunnel to reassign it to the user. However, the tunnel persists even if the renaming fails or if the user does not log in to the GlobalProtect gateway.
 A value of 0 means when the user logs on to the endpoint, GlobalProtect immediately terminates the pre-logon tunnel instead of renaming it. In this case, GlobalProtect initiates a new tunnel for the user instead of allowing the user to connect over the pre-logon tunnel. Typically, this setting is most useful when you set the **Connect Method** to **Pre-logon then On-demand**, which forces the user to manually initiate the connection after the initial logon.
 A value of 1 to 7200 indicates the number of seconds in which the pre-logon tunnel can remain active after a user logs on to the endpoint. During this time, GlobalProtect enforces policies on the pre-logon tunnel. If the user authenticates with the GlobalProtect gateway within the timeout period, GlobalProtect reassigns the tunnel to the user. If the user does not authenticate with the GlobalProtect gateway before the timeout, GlobalProtect terminates the pre-logon tunnel.




 Preserve Tunnel on User Logoff Timeout (sec)


 To enable GlobalProtect to preserve the existing VPN tunnel after users log out of their endpoint, specify a **Preserve Tunnel on User Logoff Timeout** value (range is 0 to 600 seconds; default is 0 seconds). If you accept the default value of 0, GlobalProtect does not preserve the tunnel following user logout.




 Custom Password Expiration Message
 (`LDAP Authentication Only`)


 Create a custom message to display to users when their password is about to expire. The maximum message length is 200 characters.




 Automatically Use SSL When IPSec Is Unreliable (hours)


 Specify the amount of time (in hours) during which you want the GlobalProtect app to **Automatically Use SSL When IPSec Is Unreliable** (range is 0-168 hours). If you configure this option, the GlobalProtect app does not attempt to establish an IPSec tunnel during the specified time period. This timer initiates each time an IPSec tunnel goes down due to a tunnel keepalive timeout.
 If you accept the default value of 0, the app does not fall back to establishing an SSL tunnel if it can establish an IPSec tunnel successfully. It falls back to establishing an SSL tunnel only when the IPSec tunnel cannot be established.




 Display IPSec to SSL Fallback Notification
 Requires content release version 8387-6595 or later and GlobalProtect app version 6.0 or later.


 Select **No** if you do not want users to see a notification message indicating that their connection has changed from IPSec to SSL. By default users will be notified.




 Connect with SSL Only
 Requires GlobalProtect app version 6.0 or later.


 Select **Yes** if you want users to be able to choose to use SSL instead of IPSec.




 GlobalProtect Connection MTU (bytes)


 Enter the GlobalProtect connection maximum transmission unit (MTU) value between 1000 to 1420 bytes that is used by the GlobalProtect app to connect to the gateway. The default value is 1400 bytes. You can optimize the connection experience for end users connecting over networks that require MTU values lower than the standard of 1500 bytes. By reducing the MTU size, you can eliminate performance and connectivity issues that occur due to fragmentation when the VPN tunnel connections go through multiple Internet Service Providers (ISPs) and network paths with MTU lower than 1500 bytes.




 Maximum Internal Gateway Connection Attempts


 Enter the maximum number of times the GlobalProtect app should retry the connection to an internal gateway after the first attempt fails (range is 0 to 100; default is 0, which means the GlobalProtect app does not retry the connection). By increasing the value, you enable the app to automatically connect to an internal gateway that is temporarily down or unreachable during the first connection attempt but comes back up before the specified number of retries are exhausted. Increasing the value also ensures that the internal gateway receives the most up-to-date user and host information.




 Enable Advanced Internal Host Detection


 To add an extra security layer while performing internal host detection by the GlobalProtect app. With the advanced internal host detection, the app validates the server certificate of the internal gateways in addition to performing a reverse DNS lookup of the internal host to determine whether the app is inside the enterprise network.
 Select **Yes** to enable the GlobalProtect app to validate the server certificate of the internal gateways in addition to performing a reverse DNS lookup of the internal host during internal host detection.
 Select **No** (default) for GlobalProtect app to perform internal host detection without validating the server certificate of the internal gateways.




 Portal Connection Timeout (sec)


 The number of seconds (between 1 and 600) before a connection request to the portal times out due to no response from the portal. When your firewall is running Applications and Threats content versions earlier than 777-4484, the default is 30. Starting with Content Release version 777-4484, the default is 5.




 TCP Connection Timeout (sec)


 The number of seconds (between 1 and 600) before a TCP connection request times out due to unresponsiveness from either end of the connection. When your firewall is running Applications and Threats content versions earlier than 777-4484, the default is 60. Starting with Content Release version 777-4484, the default is 5.




 TCP Receive Timeout (sec)


 The number of seconds before a TCP connection times out due to the absence of some partial response of a TCP request (range is 1 to 600; default is 30).




 Allow User to Extend GlobalProtect User Session


 To extend the login lifetime session of the GlobalProtect app before it expires so that users can avoid abrupt app session logout.
 Select **Yes** to allow users to extend the login lifetime session of the GlobalProtect app before it expires to prevent abrupt app session logout.
 Select **No** (default) if you do not want users to be able to extend the login lifetime session of the GlobalProtect app before it expires.




 HIP Remediation Process Timeout (sec)
 Requires Content Release version 8699-7991or later and GlobalProtect app 6.2.0 or later.


 Set the **HIP Remediation Process Timeout (sec)** to configure a timeout period during which the GlobalProtect app can run a [HIP process remediation script](https://docs.paloaltonetworks.com/whats-new/whats-new-in-globalprotect/hip-process-remediation) if it fails a HIP process check.
 By default, this field is set to 0, indicating that the feature is disabled. Enter a value from 1-600 seconds to indicate the amount of time you want to allow for the remediation script to finish.




 Enhanced Split Tunnel Client Certificate Public Key
 Requires Content Release version 8699-7991or later and GlobalProtect app 6.2.0 or later.


 Specify the **Enhanced Split Tunnel Client Certificate Public Key** that the endpoint can use to connect to the web server hosting the [split tunnel configuration file](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-gateways/host-a-split-tunnel-configuration-file-on-a-web-server).




 HIP Process Remediation Retry


 Specify the **HIP Process Remediation Retry** count to enable the HIP process remediation retry feature.
 By default, this field is set to 0, indicating that the feature is disabled. Specify a value from 1-3 to indicate the number of times you want to run the HIP remediation process in case of process check failures.




 HIP Process Remediation Integrity Check


 Specify the checksum generated for the HIP Remediation process.




 Split-Tunnel Option


 Specify whether to enable split-tunnel domain and/or split DNS feature for the traffic based on the exclude or include domains configured on the GlobalProtect gateway under **Network > GlobalProtect > Gateway > Agent > Client Setting > (Client Config) > Split Tunnel > Domain and Application**.
 **Network Traffic Only**—Select this option to enable only split-tunnel domain for the traffic as per include or exclude domains configured on the GlobalProtect gateway under **Network > GlobalProtect > Gateway > Agent > Client Setting > (Client Config) > Split Tunnel > Domain and Application**.
 **Both Network Traffic and DNS**—Select this option to enable both split-tunnel domain and split DNS for the traffic as per include or exclude domains configured on the GlobalProtect gateway under **Network > GlobalProtect > Gateway > Agent > Client Setting > (Client Config) > Split Tunnel > Domain and Application**.
 This option requires a Content Release version of 8284-6139 or later.




 Resolve All FQDNs Using DNS Servers Assigned by the Tunnel (`Windows Only`)


 (`GlobalProtect 4.0.3 and later releases`) Configure the DNS resolution preferences when the GlobalProtect tunnel is connected on Windows endpoints:



| • | Select **Yes** (default) to enable the GlobalProtect app to allow Windows endpoints to resolve all DNS queries with the DNS servers you configure on the gateway instead of allowing the endpoint to send some DNS queries to the DNS servers set on the physical adapter. |
| --- | --- |






| • | Select **No** to allow Windows endpoints to send DNS queries to the DNS server set on the physical adapter if the initial query to the DNS server configured on the gateway is not resolved. This option retains the native Windows behavior to query all DNS servers on all adapters recursively but can result in long wait times to resolve some DNS queries. |
| --- | --- |



 To configure DNS settings for GlobalProtect app 4.0.2 and earlier releases, use the **Update DNS Settings at Connect** option.




 Agent Mode for Prisma Access
 Requires Content Release version 8700-7994 or later and GlobalProtect app 6.2.0 or later. Requires Prisma Access 4.0 Preferred or later.


 By default, the Agent Mode for Prisma Access is set to **Tunnel** mode, which means that the GlobalProtect app establishes a tunnel to GlobalProtect to secure internet and private app access, based on any [split-tunnel rules](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-gateways/split-tunnel-traffic-on-globalprotect-gateways) you have defined. If you want to enable [explicit proxy functionality in the GlobalProtect app to enable always-on security for internet traffic](https://docs.paloaltonetworks.com/whats-new/whats-new-in-globalprotect/explicit-proxy-connectivity-in-globalprotect-for-always-on-internet-security) while providing on-demand access to private apps through GlobalProtect or a third-party VPN, you can configure one of the following agent modes:
 Select **Proxy** to enable the GlobalProtect app to proxy traffic to Prisma Access based on forwarding rules defined in the PAC file. You can then secure access to your private apps using a third-party VPN.
 Select **Tunnel and Proxy** to enable the GlobalProtect app to send the internet traffic to the explicit proxy based on rules you define in the PAC file. For the remaining traffic, the GlobalProtect app uses the split tunneling rules you have defined to determine which traffic to send through the tunnel.




 Update DNS Settings at Connect
 (`Windows Only`) (Deprecated)


 (`GlobalProtect 4.0.2 and earlier releases`) Configure the DNS server preferences for the GlobalProtect tunnel:



| • | Select **No** (default) to allow Windows endpoints to send DNS queries to the DNS server set on the physical adapter if the initial query to the DNS server configured on the gateway is not resolved. This option retains the native Windows behavior to query all DNS servers on all adapters recursively but can result in long wait times to resolve some DNS queries. |
| --- | --- |






| • | Select **Yes** to enable Windows endpoints to resolve all DNS queries with the DNS servers you configure on the gateway instead of the DNS servers set on the physical adapter on the endpoint. When you enable this option, GlobalProtect strictly enforces the gateway DNS settings and overrides the static settings for all physical adapters. |
| --- | --- |



 Note:



| | When this setting is enabled, (set to **Yes**) GlobalProtect can fail to restore the previously saved DNS settings, and as a result, can prevent the endpoint from resolving DNS queries. This feature is deprecated and is replaced with an improved implementation so that this scenario does not occur. If you were previously using this feature we recommend upgrading to GlobalProtect app 4.0.3 or a later release. |
| --- | --- |



 To configure DNS settings for GlobalProtect app 4.0.3 and later releases, use the **Resolve All FQDNs Using DNS Servers Assigned by the Tunnel** option.




 Proxy Auto-Configuration (PAC) File URL


 Select **Yes** to push the URL for your proxy auto-configuration (PAC) files from the GlobalProtect app to your endpoints.
 Specify the Proxy Auto-Configuration (PAC) File URL that you want to push to the endpoint to configure proxy settings. The maximum URL length is 256 characters. The following Proxy Auto-Configuration (PAC) File URL methods are supported:



| • | Proxy Auto-Config (PAC) standard (for example, http://pac.<hostname or IP>/proxy.pac). |
| --- | --- |






| • | Web Proxy Auto-Discovery Protocol (WPAD) standard (for example, http://wpad.<hostname or IP>/wpad.dat). |
| --- | --- |







 Detect Proxy for Each Connection
 (`Windows only`)


 Select **No** to auto-detect the proxy for the portal connection and use that proxy for subsequent connections. Select **Yes** (default) to auto-detect the proxy at every connection.




 Set Up Tunnel Over Proxy (`Windows & Mac Only`)


 Specify whether GlobalProtect must use or bypass proxies. Select **No** to require GlobalProtect to bypass proxies. Select **Yes** to require GlobalProtect to use proxies. Based on the GlobalProtect proxy use, endpoint OS, and tunnel type, [network traffic](https://docs.paloaltonetworks.com/globalprotect/4-1/globalprotect-app-new-features/new-features-released-in-gp-agent-4_1/tunnel-connections-over-proxies) will behave differently.




 Send HIP Report Immediately if Windows Security Center (WSC) State Changes
 (`Windows Only`)


 Select **No** to prevent the GlobalProtect app from sending HIP data when the status of the Windows Security Center (WSC) changes. Select **Yes** (default) to immediately send HIP data when the status of the WSC changes.




 Enable Inbound Authentication Prompts from MFA Gateways


 To support multi-factor authentication (MFA), a GlobalProtect endpoint must receive and acknowledge UDP prompts that are inbound from the gateway. Select **Yes** to enable a GlobalProtect endpoint to receive and acknowledge the prompt. Select **No** (default) for GlobalProtect to block UDP prompts from the gateway.




 Network Port for Inbound Authentication Prompts (UDP)


 Specifies the port number a GlobalProtect endpoint uses to receive inbound authentication prompts from MFA gateways. The default port is 4501. To change the port, specify a number from 1 to 65535.




 Trusted MFA Gateways


 Specifies the list of firewalls or authentication gateways a GlobalProtect endpoint trusts for multi-factor authentication. When a GlobalProtect endpoint receives a UDP message on the specified network port, GlobalProtect displays an authentication message only if the UDP prompt comes from a trusted gateway.




 Inbound Authentication Message


 Customize a notification message to display when users try to access a resource that requires additional authentication. When users try to access a resource that requires additional authentication, GlobalProtect receives a UDP packet containing the inbound authentication prompt and displays this message. The UDP packet also contains the URL for the Authentication Portal page you specify when you [Configure Multi-Factor Authentication](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-multi-factor-authentication.html). GlobalProtect automatically appends the URL to the message. For example:
 You have attempted to access a protected resource that requires additional authentication. Proceed to authenticate at
 The message must be 255 or fewer characters.




 IPv6 Preferred


 Specifies the preferred protocol for GlobalProtect endpoint communications. Select **No** to change the preferred protocol to IPv4.Select Yes (default) to make IPv6 the preferred connection a dual-stack environment.




 Change Password Message


 Customize a message to specify password policies or requirements when users change their active directory (AD) password. For example:
 Passwords must contain at least one number and one uppercase letter.
 The message must be 255 or fewer characters for two byte Unicode languages such as Chinese Simplified. For Japanese, the message must be 128 or fewer characters.




 Log Gateway Selection Criteria


 Select **Yes** to enable the GlobalProtect app to send the gateway selection criteria logs to the firewall. The default is **No**. The app does not send the enhanced logs for the gateway selection criteria to the firewall.




 Enable Autonomous DEM and GlobalProtect App Log Collection for Troubleshooting
 Requires Content Release version 8350-14191 or later; Requires GlobalProtect app 5.2.5 or later.


 Select **Yes** to enable the GlobalProtect app to display the **Report an Issue** option to allow end users to send the troubleshooting and diagnostic logs directly to Strata Logging Service. You must configure the Strata Logging Service certificate that is pushed from the portal as a client certificate to display the **Report an Issue** option. This certificate is used for the client to authenticate to Strata Logging Service when sending the logs. When this setting is set to **No** (default), the GlobalProtect app will not display the **Report an Issue** option and end users cannot send the troubleshooting and diagnostic logs to Strata Logging Service.




 Display Autonomous DEM Updates Notification


 Select **Yes** if you want users to see notifications whenever the ADEM agent is updated.




 Run Diagnostics Tests for These Destination Web Servers
 Requires Content Release version 8350-14191 or later; Requires GlobalProtect app 5.2.5 or later.


 Enter up to ten HTTPS-based destination URLs to initiate performance tests for probing. These diagnostic tests are only run if you chose to **Enable Autonomous DEM and GlobalProtect App Log Collection for Troubleshooting**. The destination URLs you enter can be IP addresses or fully qualified domain names (for example, https://10.10.10.10/resource.html, https://webserver/file.pdf, or https://google.com).




 Autonomous DEM endpoint agent for Prisma Access (Windows & Mac only)
 Runs on Windows 10 and macOS only; Content Release version 8393-6628 or later; Requires GlobalProtect app 5.2.6 or later.


 Specify whether you want to install the Autonomous DEM (ADEM) endpoint agent during the GlobalProtect app installation and allow end users to enable or disable user experience tests from the app.



| • | **Select Install and user can enable/disable agent from GlobalProtect** to install the ADEM endpoint agent during the GlobalProtect app installation, and allow end users to enable or disable user experience tests from the GlobalProtect app. |
| --- | --- |






| • | **Select Install and user cannot enable/disable agent from GlobalProtect** to install the ADEM endpoint agent during the GlobalProtect app installation, and not allow end users to enable or disable user experience tests from the GlobalProtect app. |
| --- | --- |






| • | **Select Do Not Install** (default) to not install the ADEM endpoint agent during the GlobalProtect app installation. |
| --- | --- |







 Device Added to Quarantine Message


 By default, the GlobalProtect displays the following message when an end user’s device is quarantined:
 Access to the network from this device has been restricted as per your organization’s security policy. Please contact your IT administrator.
 You can replace this default message with your own custom message of up to 512 characters.




 Device Removed from Quarantine Message


 By default, the GlobalProtect displays the following message when an end user’s device is removed from quarantine:
 Access to the network from this device has been restored as per your organization’s security policy.
 You can replace this default message with your own custom message of up to 512 characters.




 Display Status Panel at Startup (`Windows Only`)


 Select **Yes** to automatically display the GlobalProtect status panel when users establish a connection for the first time. Select **No** to suppress the GlobalProtect status panel when users establish a connection for the first time.




 Allow GlobalProtect UI to Persist for User Input
 (`Windows 10 or later and macOS`)
 Requires Content Release version 8450-6909 or later and GlobalProtect app 6.0.0 or later.


 Select **Yes** to enable the GlobalProtect app to continue to display the status panel on the screen when end users are entering their credentials.




 Disable GlobalProtect App




 Passcode/Confirm Passcode


 Enter and then confirm a passcode if the setting for **Allow User to Disable GlobalProtect App** is **Allow with Passcode**. Treat this passcode like a password—record it and store it in a secure place. You can distribute the passcode to new GlobalProtect users by email or post it in a support area of your company website.
 If circumstances prevent the endpoint from establishing a VPN connection and this feature is enabled, a user can enter this passcode in the app interface to disable the GlobalProtect app and get Internet access without using the VPN.




 Max Times User Can Disconnect


 Specify the maximum number of times that a user can disconnect GlobalProtect before the user must connect to a firewall. The default value of 0 means users have no limit to the number of times they can disconnect the app.




 Disconnect Timeout (min)


 Specify the maximum number of minutes the GlobalProtect app can be disconnected. After the specified time passes, the app tries to connect to the firewall. The default of 0 indicates that the disconnect period is unlimited.
 Fastpath:
 Set a disconnect timeout value to restrict the amount of time for which users can disconnect the app. This ensures that GlobalProtect resumes and establishes the VPN when the timeout is over to secure the user and the user’s access to resources.




 Mobile Security Manager Settings




 Mobile Security Manager


 If you are using the GlobalProtect Mobile Security Manager for mobile device management (MDM), enter the IP address or FQDN of the device check‑in (enrollment) interface on the GP-100 appliance.




 Enrollment Port


 The port number the mobile endpoint should use when connecting to the GlobalProtect Mobile Security Manager for enrollment. The Mobile Security Manager listens on port 443 by default.
 Fastpath:
 Keep this port number so that mobile endpoint users are not prompted for a client certificate during the enrollment process (other possible values are 443, 7443, and 8443).



 Parent topic
 [GlobalProtect Portals Agent Tab](globalprotect-portals-agent-configuration-tab.html#ID0E2TI1)