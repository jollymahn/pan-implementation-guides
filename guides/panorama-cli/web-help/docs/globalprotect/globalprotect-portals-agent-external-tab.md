# GlobalProtect Portals Agent External Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Agent Tab : GlobalProtect Portals Agent External Tab*

GlobalProtect Portals Agent External Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Agent** > <agent-config> > **External** |
| --- | --- |




Select the **External** tab to configure the external gateway settings for an agent configuration.



| GlobalProtect Portal External Settings | Description |
| --- | --- |
| Cutoff Time (sec) | Specify the number of seconds that an app waits for all of the available gateways to respond before it selects the best gateway. For subsequent connection requests, the app tries to connect to only those gateways that responded before the cutoff. A value of 0 means the app uses the **TCP Connection Timeout** in **AppConfigurations** in the **App** tab (range is 0 to 10; default is 5). |
| External Gateways | |
| Specify the list of firewalls to which apps can try to connect when establishing a tunnel while not on the corporate network. | **Add** external gateways that include the following information for each: • |






| • | **Address**—The IP address or FQDN of the firewall interface where the gateway is configured. The value must match the CN (and SAN if specified) in the gateway server certificate. For example, if you used a FQDN to generate the certificate, you must also enter the FQDN here. |
| --- | --- |






| • | **Source Region**—Source region for endpoints. When users connect, GlobalProtect recognizes the endpoint region and only allows users to connect to gateways that are configured for that region. For gateway choices, source region is considered first, then gateway priority. |
| --- | --- |






| • | **Priority**—Select a value (**Highest**, **High**, **Medium**, **Low**, **Lowest**, or **Manual only**) to help the app determine which gateway to use. **Manual only** prevents the GlobalProtect app from attempting to connect to this gateway when **Auto Discovery** is enabled on the endpoint. The app will first contact all specified gateways with a **Highest**, **High**, or **Medium** priority and establish a tunnel with the gateway that provides the fastest response. If the higher priority gateways are unreachable, the app next contacts any additional gateways with lower priority values (excludes **Manual only** gateways). |
| --- | --- |






| • | **Manual**—Select this option to let users manually select (or switch to) a gateway. The GlobalProtect app can connect to any external gateway that is configured as **Manual**. When the app pconnects to another gateway, the existing tunnel is disconnected and a new tunnel established. The manual gateways can also have a different authentication mechanism than the primary gateway. If an endpoint is restarted or if a rediscovery is performed, the GlobalProtect app connects to the primary gateway. This feature is useful if a group of users needs to connect temporarily to a specific gateway to access a secure segment of your network. |
| --- | --- |







 Third Party VPN




 Third Party VPN


 To direct the GlobalProtect app to ignore selected, third-party VPN clients so that GlobalProtect does not conflict with them, **Add** the name of the VPN client: Select the name from the list, or enter the name in the field provided. GlobalProtect ignores the route settings for the specified VPN clients if you configure this feature.



 Parent topic
 [GlobalProtect Portals Agent Tab](globalprotect-portals-agent-configuration-tab.html#ID0E2TI1)