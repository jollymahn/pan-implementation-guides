# Client Probing

*User Identification : Device &gt; User Identification &gt; User Mapping : Palo Alto Networks User-ID Agent Setup : Client Probing*

Client Probing



| • | **Device** > **User Identification** > **User Mapping** > **Palo Alto Networks User-ID Agent Setup** > **Client Probing** |
| --- | --- |



 Warning:
 Do not enable client probing on high-security networks or on external untrusted interfaces because it can pose security risks if not correctly configured. If you enable client probing on an external untrusted zone, it could allow an attacker to send a probe outside of your network which may result in disclosure of the User-ID agent service account name, domain name, and encrypted password hash.
 Instead, Palo Alto Network strongly recommends that you collect user mapping information from isolated and trusted sources, such as domain controllers or integrations with [Syslog](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/user-id-concepts/user-mapping/syslog.html) or the [XML API](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/user-id-concepts/user-mapping/xml-api.html), to safely capture user mapping information from any device type or operating system.

You can configure the PAN-OS integrated User-ID agent to perform Windows Management Instrumentation (WMI) [client probing](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/user-id-concepts.html) for each client system that the user mapping process identifies. The User-ID agent periodically probes each learned IP address to verify that the same user is still logged in. When the firewall encounters an IP address for which it has no user mapping, it sends the address to the User-ID agent for an immediate probe. To configure client probing settings, complete the following fields. The [complete procedure](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/map-ip-addresses-to-users/configure-user-mapping-using-the-pan-os-integrated-user-id-agent.html) to configure the PAN-OS integrated User-ID agent to probe clients requires additional tasks besides configuring the WMI client probing settings.



| Client Probing Settings | Description |
| --- | --- |
| Enable Probing | Select this option to enable WMI probing. |
| Probe Interval (min) | Enter the probe interval in minutes (range is 1-1440; default is 20). This is the interval between when the firewall finishes processing the last request and when it starts the next request. In large deployments, it is important to set the interval properly to allow time to probe each client that the user mapping process identified. Example, if you have 6,000 users and an interval of 10 minutes, it would require 10 WMI requests per second from each client. Note:  |






 Parent topic
 [Palo Alto Networks User-ID Agent Setup](user-id-agent-setup.html#ID0EN62Z)