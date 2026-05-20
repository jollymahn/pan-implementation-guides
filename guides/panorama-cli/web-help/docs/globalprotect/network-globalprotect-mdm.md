# Network > GlobalProtect > MDM

*GlobalProtect : Network &gt; GlobalProtect &gt; MDM*

## Network > GlobalProtect > MDM


If you are using a Mobile Security Manager to manage end user mobile endpoints and you are using HIP-enabled policy enforcement, you must configure the gateway to communicate with the Mobile Security Manager to retrieve the HIP reports for the managed endpoints.


**Add** MDM information for the Mobile Security Manager to enable the gateway to communicate with the Mobile Security Manager.



| GlobalProtect MDM Settings | Description |
| --- | --- |
| Name | Enter a name for the Mobile Security Manager (up to 31 characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| | If the firewall is in multiple virtual system mode, the MDM settings displays the virtual system (vsys) where the Mobile Security Manager is available. For a firewall that is not in multi-vsys mode, this field does not appear in the MDM dialog. After you save the Mobile Security Manager, you cannot change its location. |
| Connection Settings | |
| Server | Enter the IP address or FQDN of the interface on the Mobile Security Manager where the gateway connects to retrieve HIP reports. Ensure that you have a service route to this interface. |
| Connection Port | The connection port is where the Mobile Security Manager listens for HIP report requests. The default port is 5008, which is the same port on which the GlobalProtect Mobile Security Manager listens. If you are using a third-party Mobile Security Manager, enter the port number on which that server listens for HIP report requests. |
| Client Certificate | Choose the client certificate for the gateway to present to the Mobile Security Manager when it establishes an HTTPS connection. This certificate is required only if the Mobile Security Manager is configured to use mutual authentication. |
| Trusted Root CA | Click **Add** and then select the root CA certificate that was used to issue the certificate for the interface where the gateway connects to retrieve HIP reports. (This server certificate can be different from the certificate issued for the endpoint check-in interface on the Mobile Security Manager).You must import the root CA certificate and add it to this list. |


 Parent topic
 [GlobalProtect](globalprotect.html#ID0EDPF1)