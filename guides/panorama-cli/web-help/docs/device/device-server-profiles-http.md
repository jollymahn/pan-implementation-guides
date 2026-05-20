# Device > Server Profiles > HTTP

*Device : Device &gt; Server Profiles &gt; HTTP*

## Device > Server Profiles > HTTP


Select **Device** > **Server Profiles** > **HTTP** or **Panorama** > **Server Profiles** > **HTTP** to configure a server profile for forwarding logs. You can configure the firewall to forward logs to an HTTP(S) destination, or to integrate with any HTTP-based service that exposes an API, and modify the URL, HTTP header, parameters, and the payload in the HTTP request to meet your needs. You can also use the HTTP server profile to access firewalls running the PAN-OS integrated User-ID agent and register one or more tags to a source or destination IP address on logs that a firewall generated.

 Note:



| | To use the HTTP server profile to forward logs: |
| --- | --- |






| • | See [Device > Log Settings](device-log-settings.html#ID0ETQGZ) for System, Config, User-ID, HIP Match, and Correlation logs. |
| --- | --- |






| • | See [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R) for Traffic, Threat, WildFire, URL Filtering, Data Filtering, Tunnel Inspection, Authentication, and GTP logs. |
| --- | --- |



 You cannot delete an HTTP server profile if it is used to forward logs. To delete a server profile on the firewall or Panorama, you must delete all references to the profile from the **Device** > **Log settings** or **Objects** > **Log Forwarding** profile.

To define an HTTP server profile, **Add** a new profile and configure the settings in the following table.



| HTTP Server Settings | Description |
| --- | --- |
| Name | Enter a name for the server profile (up to 31 characters). The name is case-sensitive and must be unique. A valid name must start with an alphanumeric character and can contain zeros, alphanumeric characters, underscores, hyphens, dots, or spaces. |
| Location | Select the scope in which the server profile is available. In the context of a firewall that has more than one virtual system (vsys), select a vsys or select **Shared** (all virtual systems). In any other context, you can’t select the **Location**; its value is predefined as Shared (`firewalls`) or as Panorama. After you save the profile, you can’t change the **Location**. |
| Tag Registration | Tag registration allows you to add or remove a tag on a source or destination IP address in a log entry and register the IP address and tag mapping to the User-ID agent on a firewall using HTTP(S). You can then define dynamic address groups that use these tags as a filtering criteria to determine its members, and enforce policy rules to an IP address based on tags. **Add** the connection details to enable HTTP(S) access to the User-ID agent on a firewall. To register tags to the User-ID agent on Panorama, you do not need a server profile. Additionally, you cannot use the HTTP server profile to register tags to a User-ID agent running on a Windows server. |
| Servers Tab | |
| Name | **Add** an HTTP(s) server and enter a name (up to 31 characters) or remote User-ID agent. A valid name must be unique and start with an alphanumeric character; the name can contain zeros, alphanumeric characters, underscores, hyphens, dots, or spaces. A server profile can include up to four servers. |
| Address | Enter the IP address of the HTTP(S) server. For tag registration, specify the IP address of the firewall configured as a User-ID agent. |
| Protocol | Select the protocol: HTTP or HTTPS. |
| Port | Enter the port number on which to access the server or firewall. The default port for HTTP is 80 and for HTTPS is 443. For tag registration, the firewall uses HTTP or HTTPS to connect to the web server on the firewalls that are configured as User-ID agents. |
| TLS Version | Select the TLS version supported for SSL on the server. The default is **1.2**. |
| Certificate Profile | Select the certificate profile to use for the TLS connection with the server. The firewall uses the specified certificate profile to validate the server certificate when establishing a secure connection to the server. |
| HTTP Method | Select the HTTP method that the server supports. The options are GET, PUT, POST (default), and DELETE. For the User-ID agent, use the GET method. |
| Username | Enter the username that has access privileges to complete the HTTP method you selected. If you are registering tags to the User-ID agent on a firewall, the username must be that of an administrator with a superuser role. |
| Password | Enter the password to authenticate to the server or the firewall. |
| Test Server Connection | Select a server and **Test Server Connection** to test network connectivity to the server. This test does not test connectivity to a server that is running the User-ID agent. |
| Payload Format Tab | |
| Log Type | The log type available for HTTP forwarding displays. Click the log type to open a dialog box that allows you to specify a custom log format. |
| Format | Displays whether the log type uses the default format, a predefined format, or a custom payload format that you defined. |
| Pre-defined Formats | Select the format for your service or vendor for sending logs. Predefined formats are pushed through content updates and can change each time you install a new content update on the firewall or Panorama. |
| Name | Enter a name for the custom log format. |
| URI Format | Specify the resource to which you want to send logs using HTTP(S). If you create a custom format, the **URI** is the resource endpoint on the HTTP service. The firewall appends the URI to the IP address you defined earlier to construct the URL for the HTTP request. Ensure that the URI and payload format matches the syntax that your third-party vendor requires. You can use any attribute supported on the selected log type within the HTTP Header, Parameter, and Value pairs, and the request payload. |
| HTTP Headers | Add a Header and its corresponding value. |
| Parameters | Include the optional parameters and values. |
| Payload | Select the log attributes you want to include as the payload in the HTTP message to the external web server. |
| Send Test Log | Click this button to validate that the external web server receives the request and in the correct payload format. |


 Parent topic
 [Device](device.html#ID0EY2QW)