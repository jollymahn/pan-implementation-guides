# Log Card Subinterface

*Network : Network &gt; Interfaces : Log Card Subinterface*

Log Card Subinterface



| • | Network > Interfaces > Ethernet |
| --- | --- |




To add a [Log Card Interface](log-card-interface.html#ID0EMRBT), select the row for that interface, **Add Subinterface**, and specify the following information.



| Log Card Subinterface Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **LPC Subinterface** | **Interface Name** (read-only) displays the name of the log card interface you selected. In the adjacent field, enter a numeric suffix (1-9,999) to identify the subinterface. |
| Comment | Enter an optional description for the interface. | |
| Tag | Enter the VLAN **Tag** (0-4,094) for the subinterface. Fastpath:  Make the tag the same as the subinterface number for ease of use. | |
| Virtual System | **LPC Subinterface** > **Config** | Select the virtual system (vsys) to which the Log Processing Card (LPC) subinterface is assigned. Alternatively, you can click **Virtual Systems** to add a new vsys. Once an LPC subinterface is assigned to a vsys, that interface is used as the source interface for all services that forward logs (syslog, email, SNMP) from the log card. |
| IPv4 | **Ethernet Interface** > **Log Card Forwarding** | If your network uses IPv4, define the following: • |






| • | **Netmask**—The network mask for the IPv4 address of the port. |
| --- | --- |






| • | **Default Gateway**—The IPv4 address of the default gateway for the port. |
| --- | --- |







 IPv6


 If your network uses IPv6, define the following:



| • | **IP address**—The IPv6 address of the port. |
| --- | --- |






| • | **Default Gateway**—The IPv6 address of the default gateway for the port. |
| --- | --- |






 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)