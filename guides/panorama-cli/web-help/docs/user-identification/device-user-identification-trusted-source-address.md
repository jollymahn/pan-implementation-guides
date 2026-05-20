# Device > User Identification> Trusted Source Address

*User Identification : Device &gt; User Identification&gt; Trusted Source Address*

## Device > User Identification> Trusted Source Address


[Explicit Proxy](https://docs.paloaltonetworks.com/prisma/prisma-access/prisma-access-insights/insights/first-look/explicit-proxy) allows traffic only from specific IP addresses to authenticate using the X-Authenticated-User (XAU) protocol. Create an [address object](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/policy/use-address-object-to-represent-ip-addresses/address-objects) then **Edit** the Trusted Source Address configuration and add the address object to specify the IP addresses where XAU is allowed for authentication for explicit proxy. For more information, refer to [Secure Mobile Users with an Explicit Proxy](https://docs.paloaltonetworks.com/prisma/prisma-access/prisma-access-panorama-admin/prisma-access-for-users/explicit-proxy-prisma-access/secure-mobile-users-with-an-explicit-proxy).



| Trusted Source Address Fields | Description |
| --- | --- |
| **Enabled** | Select this option to enable the trusted source address configuration. |
| **Trusted Source Address** | **Add** a trusted source address. The X-Authenticated-User (XAU) contained in incoming requests from these source addresses are trusted for the Explicit Proxy. You can also **Search** the list of trusted source addresses or **Delete** a source address if necessary. |

 Parent topic
 [User Identification](user-identification.html#ID0EBI2Z)