# GlobalProtect Portals Agent Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Agent Tab*

GlobalProtect Portals Agent Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Agent** |
| --- | --- |




Select the **Agent** tab to define the agent configuration settings. The GlobalProtect portal deploys the configuration to the device after the connection is first established.


You can also specify that the portal automatically deploy trusted root certificate authority (CA) certificates and intermediate certificates. If the endpoints do not trust the server certificates that the GlobalProtect gateways and GlobalProtect Mobile Security Manager are using, the endpoints need these certificates to establish HTTPS connections to the gateways or Mobile Security Manager. The portal pushes the certificates you specify here to the client along with the client configuration.


To add a trusted root CA certificate, **Add** an existing certificate or **Import** a new one. To install (transparently) the trusted root CA certificates that are required for SSL Forward Proxy decryption in the certificate store on the client, select **Install in Local Root Certificate Store**.

 Fastpath:
 Specify the trusted root CA certificate that the GlobalProtect app uses to verify the identity of the GlobalProtect portal and gateways. If the portal or gateway presents a certificate that has not been signed or issued by the same certificate authority that issued the trusted root CA, the GlobalProtect app cannot establish a connection with the portal or gateway.

If you have different types of users that require different configurations, you can create separate agent configurations to support them. The portal subsequently uses the user or group name and OS of the client to determine the agent configuration to deploy. As with security rule evaluations, the portal looks for a match, starting from the top of the list. When the portal finds a match, it delivers the corresponding configuration to the app. Therefore, if you have multiple agent configurations, it is important to order them so that more specific configurations (configurations for specific users or operating systems) are above the more generic configurations. Use **Move Up** and **Move Down** to reorder the configurations. As needed, **Add** a new agent configuration. For detailed information on configuring the portal and creating agent configurations, refer to [GlobalProtect Portals](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/globalprotect-portals.html) in the [GlobalProtect Administrator’s Guide](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin.html). When you **Add** a new agent configuration or modify an existing one, the **Configs** window opens and displays five tabs, which are described in the following tables:




| • | [GlobalProtect Portals Agent Authentication Tab](globalprotect-portals-agent-authentication-tab.html#ID0E3GJ1) |
| --- | --- |






| • | [GlobalProtect Portals Agent Config Selection Criteria Tab](globalprotect-portals-agent-config-selection-criteria-tab.html#ID0E24J1) |
| --- | --- |






| • | [GlobalProtect Portals Agent Internal Tab](globalprotect-portals-agent-internal-tab.html#ID0EKTK1) |
| --- | --- |






| • | [GlobalProtect Portals Agent External Tab](globalprotect-portals-agent-external-tab.html#ID0EYHL1) |
| --- | --- |






| • | [GlobalProtect Portals Agent App Tab](globalprotect-portals-agent-app-tab.html#ID0EL1L1) |
| --- | --- |






| • | [GlobalProtect Portals Agent HIP Data Collection Tab](globalprotect-portals-agent-data-collection-tab.html#ID0EHSR1) |
| --- | --- |



 Parent topic
 [Network > GlobalProtect > Portals](network-globalprotect-portals.html#ID0EJ3F1)