# Objects > Addresses

*Objects : Objects &gt; Addresses*

## Objects > Addresses


An address object can include either IPv4 or IPv6 addresses (a single IP address, a range of addresses, or a subnet), an FQDN, or a wildcard address (IPv4 address followed by a slash and wildcard mask). An address object allows you to reuse that same address or group of addresses as a source or destination address in policy rules, filters, and other firewall functions without adding each address manually for each instance. You create an address object using the web interface or CLI; changes require a commit operation to make the object a part of the configuration.


First **Add** a new address object and then specify the following values:



| Address Object Settings | Description |
| --- | --- |
| Name | Enter a name (up to 63 characters) that describes the addresses you will include as part of this object. This name appears in the address list when defining security policy rules. The name is case-sensitive, must be unique, and can contain only letters, numbers, spaces, hyphens, and underscores. Note:**While configuring static routes for a [virtual](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/virtual-routers/configure-virtual-routers)** or [logical](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/advanced-routing) router on the firewall, you can enter an IP address for the Next Hop router. Palo Alto Networks firewall treats the **Next Hop** IP address as an address object. Therefore, if you configure the Next Hop IP address (**Network** > **Virtual Router** > **Static Routes**) value same as the configured Address object name (**Objects** > **Addresses**), then any modifications to the address object will reflect in the **Next Hop** IP address value also. That is, renaming the address object (**Objects** > **Addresses**) will also rename the Next Hop IP address. |
| Shared | Select this option if you want to share this address object with: • |






| • | **Every device group on Panorama**—If you do not select this option, the address object will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this address object in device groups that inherit this object. By default, this selection is disabled, which means administrators can override the settings for any device group that inherits the object.




 Description


 Enter a description for the object (up to 1,023 characters).




 Type


 Specify the type of address object and the entry:



| • | **IP Netmask**—Enter the IPv4 or IPv6 address or IP address range using the following notation: ip_address/mask or ip_address where the mask is the number of significant binary digits used for the network portion of the address. Ideally, for IPv6 addresses, you specify only the network portion, not the host portion. For example: |
| --- | --- |






| ◦ | **192.168.80.150/32**—Indicates one address. |
| --- | --- |






| ◦ | **192.168.80.0/24**—Indicates all addresses from 192.168.80.0 through 192.168.80.255. |
| --- | --- |






| ◦ | **2001:db8::/32** |
| --- | --- |






| ◦ | **2001:db8:123:1::/64** |
| --- | --- |






| • | **IP Range**—Enter a range of addresses using the following format: ip_address-ip_address where both ends of the range are IPv4 addresses or both are IPv6 addresses. For example: 2001:db8:123:1::1-2001:db8:123:1::22 |
| --- | --- |






| • | **IP Wildcard Mask**—Enter an IP wildcard address in the format of an IPv4 address followed by a slash and a mask (which must begin with a zero); for example, 10.182.1.1/0.127.248.0. In the wildcard mask, a zero (0) bit indicates that the bit being compared must match the bit in the IP address that is covered by the 0. A one (1) bit in the mask is a wildcard bit, meaning the bit being compared need not match the bit in the IP address that is covered by the 1. Convert the IP address and the wildcard mask to binary. To illustrate the matching: on binary snippet 0011, a wildcard mask of 1010 results in four matches (0001, 0011, 1001, and 1011). |
| --- | --- |



 Note:



| | You can use an address object of type IP Wildcard Mask only in a Security policy rule. |
| --- | --- |






| • | **FQDN**—Enter the domain name. The FQDN initially resolves at commit time. An FQDN entry is subsequently refreshed based on the TTL of the FQDN if the TTL is greater than or equal to the Minimum FQDN Refresh Time; otherwise the FQDN entry is refreshed at the Minimum FQDN Refresh Time. The FQDN is resolved by the system DNS server or a [DNS proxy](network-dns-proxy.html#ID0E5LUV) object if a proxy is configured. |
| --- | --- |







 Resolve


 After selecting the address type and entering an IP address or FQDN, click **Resolve** to see the associated FQDN or IP addresses, respectively (based on the DNS configuration of the firewall or Panorama).
 You can change an address object from an FQDN to an IP Netmask or vice versa. To change from an FQDN to an IP Netmask, click **Resolve** to see the IP addresses that the FQDN resolves to, then select one and **Use this address**. The address object Type dynamically changes to IP Netmask and the IP address you selected appears in the text field.
 Alternatively, to change an address object from an IP Netmask to an FQDN, click **Resolve** to see the DNS name that the IP Netmask resolves to, then select the FQDN and **Use this FQDN**. The Type changes to FQDN and the FQDN appears in the text field.




 Tags


 Select or enter the tags that you want to apply to this address object. You can define a tag here or use the [Objects > Tags](objects-tags.html#ID0EEU3Q) tab to create new tags.



 Parent topic
 [Objects](objects.html#ID0EL3RQ)