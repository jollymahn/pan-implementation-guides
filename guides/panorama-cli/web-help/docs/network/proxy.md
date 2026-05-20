# Network > Proxy

*Network : Network &gt; Proxy*

## Network > Proxy


The availability of proxy configuration options is based on the proxy type. You must first [configure a DNS proxy object](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/configure-a-dns-proxy-object) to configure a proxy.



| Proxy Fields | Description |
| --- | --- |
| **Proxy Enablement** | |
| **Proxy Type** | Select the type of proxy you want to use. • |





| • | **Explicit**—Configure the proxy so that the request contains the destination IP address of the configured proxy and the client browser sends requests to the proxy directly. |
| --- | --- |





| • | **Transparent**—Configure the proxy so that the request contains the destination IP address of the web server and the client browser is redirected to the proxy. |
| --- | --- |


 Note:**Transparent Proxy requires a specific Destination NAT ([DNAT](https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-networking-admin/nat/configure-nat/configure-destination-nat-using-dynamic-ip-addresses)**) policy rule to successfully configure the web proxy. Refer to the [PAN-OS Networking Administrator’s Guide](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/configure-a-web-proxy) documentation for the complete procedure.



| • | **Palo Alto Networks Service Proxy**—Configure the proxy to forward communications from firewalls in the downstream network to destinations in the upstream network. The firewall can act as a single proxy or as one in a series of proxies. |
| --- | --- |


 Note:**This proxy mode is supported on PA-1400, PA-3400, VM-300, VM-500, and VM-700 firewalls running PAN-OS 11.0.1-h2 or later. To enable a firewall to support this proxy type and display it as an option here, enter the following CLI command and then reboot your firewall: set system setting paloalto-networks-service-proxy on**




 **Proxy Configuration**





 **Connect Timeout**


 Specify (in seconds) how long the proxy waits for a response from the web server. The range is 1–60 seconds and the default is 5 seconds. If there is no response after the specified amount of time has elapsed, the proxy closes the connection.




 **Listening Interface** `Explicit Proxy only`


 Specify the Layer 3 (L3) interface where the firewall checks for traffic to reroute to the proxy.




 **Upstream Interface**


 Select the upstream interface.
 Note:**If you are using a loopback interface, specify that interface as the **Upstream Interface**.




 Proxy IP**


 Specify the IP address of the interface where the firewall should check for traffic to reroute to the proxy (listening interface).




 **DNS Proxy**


 Select the [DNS proxy object](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/dns/dns-proxy-object) you want to use for the proxy connection.




 **Check domain in CONNECT & SNI are the same** `Explicit Proxy only`


 Enable this option to prevent domain fronting attacks caused by specifying different domains between the CONNECT request and the Server Name Indication (SNI) field in the HTTP header.




 **Authentication service type** `Explicit Proxy only`


 Select the type of service you want to use to authenticate users.



| • | **SAML/CAS**—Use a [SAML](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-saml-authentication) 2.0 based authentication service or the authentication service available in the [Cloud Identity Engine](https://docs.paloaltonetworks.com/cloud-identity/cloud-identity-engine-getting-started/authenticate-users-with-the-cloud-identity-engine). |
| --- | --- |


 Note:**This option requires Prisma Access, the Cloud Services 3.2.1 plugin, and the add-on web proxy license.



| • | **Kerberos Single Sign On**—Use the [Kerberos Single Sign-On Service](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-kerberos-single-sign-on)** to authenticate users. |
| --- | --- |


 Note:**This option requires Panorama, a web proxy license, and an authentication profile that uses [Kerberos Single Sign-On Service](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/authentication/configure-kerberos-single-sign-on)** on the firewall.



| • | **No authentication**—Exempt all explicit web proxy traffic from authentication. |
| --- | --- |


 CAUTION:**If you select this option, all proxy connections are unauthenticated and the firewall or Panorama does not create logs for authentication events.




 **Authentication Profile** `Explicit Proxy only`


 Select the authentication profile you want to use for the Authentication service type** you selected for the previous option.



 Parent topic
 [Network](network.html#ID0EFOJS)