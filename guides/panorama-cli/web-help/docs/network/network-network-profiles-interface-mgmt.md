# Network > Network Profiles > Interface Mgmt

*Network : Network &gt; Network Profiles : Network &gt; Network Profiles &gt; Interface Mgmt*

Network > Network Profiles > Interface Mgmt

An Interface Management profile protects the firewall from unauthorized access by defining the services and IP addresses that a firewall interface permits. You can assign an Interface Management profile to Layer 3 Ethernet interfaces (including subinterfaces) and to logical interfaces (aggregate group, VLAN, loopback, and tunnel interfaces). To assign an Interface Management profile, see [Network > Interfaces](network-interfaces.html#ID0EUKKS).

 Warning:
 Do not attach an interface management profile that allows Telnet, SSH, HTTP, or HTTPS to an interface that allows access from the internet or from other untrusted zones inside your enterprise security boundary. This includes the interface where you have configured a GlobalProtect portal or gateway; GlobalProtect does not require an interface management profile to enable access to the portal or the gateway. Refer to the [Adminstrative Access Best Practices](https://docs.paloaltonetworks.com/best-practices/10-1/administrative-access-best-practices/administrative-access-best-practices.html) for details on how to protect access to your firewalls and Panorama.
 Do not attach an interface management profile that allows Telnet, SSH, HTTP, or HTTPS to an interface where you have configured a GlobalProtect portal or gateway because this will expose the management interface to the internet.


| Field | Description |
| --- | --- |
| Name | Enter a profile name (up to **31** characters). This name appears in the list of Interface Management profiles when configuring interfaces. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Administrative Management Services | • |



 Fastpath:
 Enable SSH instead of Telnet for management traffic on the interface.



| • | **SSH**—Use for secure access to the firewall CLI. |
| --- | --- |






| • | **HTTP**—Use to access the firewall web interface. HTTP uses plaintext, which is not as secure as HTTPS. |
| --- | --- |



 Fastpath:
 Enable **HTTPS** instead of HTTP for management traffic on the interface.



| • | **HTTPS**—Use for secure access to the firewall web interface. |
| --- | --- |







 Network Services





| • | **Ping**—Use to test connectivity with external services. For example, you can ping the interface to verify it can receive PAN-OS software and content updates from the Palo Alto Networks Update Server. |
| --- | --- |






| • | **HTTP OCSP**—Use to configure the firewall as an Online Certificate Status Protocol (OCSP) responder. For details, see [Device > Certificate Management > OCSP Responder](device-certificate-management-ocsp-responder.html#ID0E1DCZ). |
| --- | --- |






| • | **SNMP**—Use to process firewall statistics queries from an SNMP manager. For details, see [Enable SNMP Monitoring](enable-snmp-monitoring.html#ID0EEVAX). |
| --- | --- |






| • | **Response Pages**—Use to enable response pages for: |
| --- | --- |






| ◦ | **Authentication Portal**—The ports used to serve Authentication Portal response pages are left open on Layer 3 interfaces: port 6080 for NTLM, 6081 for Authentication Portal without an SSL/TLS Server Profile, and 6082 for Authentication Portal with an SSL/TLS Server Profile. For details, see [Device > User Identification > Authentication Portal Settings](device-user-identification-captive-portal-settings.html#ID0EW2D1). |
| --- | --- |






| ◦ | **URL Admin Override**—For details, see [Device > Setup > Content-ID](device-setup-content-id.html#ID0EYQMX). |
| --- | --- |






| • | **User-ID**—Use to enable [data redistribution](device-data-redistribution.html#ID0EDBKY) of user mappings among firewalls. |
| --- | --- |






| • | **User-ID Syslog Listener-SSL**—Use to allow the PAN-OS integrated User-ID agent to collect syslog messages over SSL. For details, see [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z). |
| --- | --- |






| • | **User-ID Syslog Listener-UDP**—Use to allow the PAN-OS integrated User-ID agent to collect syslog messages over UDP. For details, see [Configure Access to Monitored Servers](configure-access-to-monitored-servers.html#ID0E2O6Z). |
| --- | --- |







 Permitted IP Addresses


 Enter the list of IPv4 or IPv6 addresses from which the interface allows access.



 Parent topic
 [Network > Network Profiles](network-network-profiles.html#ID0E631V)