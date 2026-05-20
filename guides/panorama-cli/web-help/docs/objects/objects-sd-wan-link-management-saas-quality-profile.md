# Objects > SD-WAN Link Management > SaaS Quality Profile

*Objects : Objects &gt; SD-WAN Link Management : Objects &gt; SD-WAN Link Management &gt; SaaS Quality Profile*

Objects > SD-WAN Link Management > SaaS Quality Profile

SD-WAN allows you to create Software-as-a-Service (SaaS) quality profile to measure the path health quality between your hub or branch firewall and a server-side SaaS applications in order to accurately monitor SaaS application reliability and swap paths should the path health quality degrade. This allows the firewall to accurately determine when to failover to a different Direct Internet Access (DIA) link.


The SaaS quality profile allows you to specify the SaaS application to monitor using an adaptive learning algorithm that monitors the application activity, or by specifying a SaaS application using the application IP address, FQDN, or URL.



| | SaaS Quality Profile Settings |
| --- | --- |
| Name | Enter a name for the path quality profile using alphanumeric characters, underscore, hyphen, space, and period. |
| Shared (`Panorama only`) | Check (enable) to make the SaaS Quality profile shared across all device groups. |
| Disable Override (`Panorama only`) | Check (enable) to disable the ability to override the SaaS Quality profile settings locally on the managed firewall. |
| SaaS Monitoring Mode | |
| Adaptive | The SaaS application session activity is monitored for send and receive activity and the path health status is derived automatically without any additional health checks on the SD-WAN interface. This option is selected by default. |
| Static IP Address | **IP Address/Object**—Specify the SaaS application to monitor using the application IP address. • |






| • | **Probe Interval (Sec)**—Specify, in seconds, the interval the firewall probes the path quality health between the firewall and the SaaS application. Default is 3 seconds. |
| --- | --- |



 Up to 4 static IP addresses are supported.




 **FQDN**—Specify the SaaS application to monitor using the application Fully Qualified Domain Name (FQDN).



| • | **FQDN**— The FQDN of the SaaS application. You must configure a FQDN [address object](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-address-object-to-represent-ip-addresses/create-an-address-object.html) to specify a FQDN. |
| --- | --- |



 The SaaS application FQDN must be resolvable in order to successfully monitor the SaaS application.



| • | **Probe Interval (sec)**—Specify, in seconds, the interval the firewall probes the path quality health between the branch firewall and the SaaS application. Default is 3 seconds. |
| --- | --- |







 HTTP/HTTPS


 Specify the SaaS application to monitor using the HTTP or HTTPS URL.



| • | **Monitored URL**—The HTTP or HTTPS URL of the SaaS application. |
| --- | --- |






| • | **Probe Interval (sec)**—Specify, in seconds, the interval the firewall probes the path quality health between the firewall and the SaaS application. Default is 3 seconds. |
| --- | --- |






 Parent topic
 [Objects > SD-WAN Link Management](objects-sd-wan-link-management.html#ID0EO1GS)