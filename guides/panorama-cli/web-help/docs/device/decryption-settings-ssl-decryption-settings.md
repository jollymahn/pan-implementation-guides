# Decryption Settings: SSL Decryption Settings

*Device : Device &gt; Setup &gt; Session : Decryption Settings: SSL Decryption Settings*

Decryption Settings: SSL Decryption Settings

Select **SSL Decryption Settings** to [enable inspection of SSL/TLS handshakes](https://docs.paloaltonetworks.com/advanced-url-filtering/administration/url-filtering-features/inspect-ssl-tls-handshakes.html) when users navigate to websites over a decrypted HTTPS connection. The Content and Threat Detection (CTD) engine on the firewall will evaluate the contents of the handshake against Security policy rules, which enables the firewall to enforce the rules as early in the session as possible. You must have a URL Filtering subscription, configure either [SSL Forward Proxy](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/configure-ssl-forward-proxy.html) or [SSL Inbound Inspection](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/configure-ssl-inbound-inspection.html), and block specific URL categories in your Security policy rules to use this feature.

 Note:



| | URL Filtering response pages do not display for sites that are blocked during SSL/TLS handshake inspection. After detecting traffic from blocked categories, the firewall resets the HTTPS connection, ending the handshake and preventing user notification by response page. Instead, the browser displays a standard connection error message. |
| --- | --- |





| SSL Decryption Settings | Description |
| --- | --- |
| Send handshake messages to CTD for inspection | Select to enable CTD to inspect SSL/TLS handshakes during decrypted web sessions. |


 Parent topic
 [Device > Setup > Session](device-setup-session.html#ID0EBWRX)