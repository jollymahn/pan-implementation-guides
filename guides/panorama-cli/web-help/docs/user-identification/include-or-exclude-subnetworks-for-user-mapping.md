# Include or Exclude Subnetworks for User Mapping

*User Identification : Device &gt; User Identification &gt; User Mapping : Include or Exclude Subnetworks for User Mapping*

Include or Exclude Subnetworks for User Mapping



| • | Device > User Identification > User Mapping |
| --- | --- |




Use the Include/Exclude Networks list to define the subnetworks that the User-ID agent will include or exclude when performing IP address-to-username mapping (discovery). By default, if you don’t add any subnetworks to the list, the User-ID agent performs discovery for user identification sources in all subnetworks except when using WMI probing for client systems that have public IPv4 addresses. (Public IPv4 addresses are those outside the scope of [RFC 1918](https://tools.ietf.org/html/rfc1918) and [RFC 3927](https://tools.ietf.org/html/rfc3927)).


To enable WMI probing for public IPv4 addresses, you must add their subnetworks to the list and set their **Discovery** option to **Include**. If you [configure the firewall to redistribute user mappinginformation](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/user-id/deploy-user-id-in-a-large-scale-network/redistribute-user-mappings-and-authentication-timestamps.html) to other firewalls, the discovery limits you specify in the list will apply to the redistributed information.

 Fastpath:
 Use the include and exclude lists to define the subnets in which the firewall performs user mapping.

You can perform the following tasks on the Include/Exclude Networks list:



| Task | Description |
| --- | --- |
| Add | To limit discovery to a specific subnetwork, **Add** a subnetwork profile and complete the following fields: • |






| • | **Enabled**—Select this option to enable inclusion or exclusion of the subnetwork for server monitoring. |
| --- | --- |






| • | **Discovery**—Select whether the User-ID agent will **Include** or **Exclude** the subnetwork. |
| --- | --- |






| • | **Network Address**—Enter the IP address range of the subnetwork. |
| --- | --- |



 The User-ID agent applies an implicit exclude all rule to the list. For example, if you add subnetwork 10.0.0.0/8 with the **Include** option, the User-ID agent excludes all other subnetworks even if you don’t add them to the list. Add entries with the **Exclude** option only if you want the User-ID agent to exclude a subset of the subnetworks you explicitly included. For example, if you add 10.0.0.0/8 with the **Include** option and add 10.2.50.0/22 with the **Exclude** option, the User-ID agent will perform discovery on all the subnetworks of 10.0.0.0/8 except 10.2.50.0/22, and will exclude all subnetworks outside of 10.0.0.0/8. If you add **Exclude** profiles without adding any **Include** profiles, the User-ID agent excludes all subnetworks, not just the ones you added.




 Delete


 To remove a subnetwork from the list, select and **Delete** it.
 **Tip**: To remove a subnetwork from the Include/Exclude Networks list without deleting its configuration, edit the subnetwork profile and clear **Enabled**.




 Custom Include/Exclude Network


 By default, the User-ID agent evaluates the subnetworks in the order you add them, from top-first to bottom-last. To change the evaluation order, click **Custom Include/Exclude Network Sequence**. You can then **Add**, **Delete**, **Move Up**, or **Move Down** the subnetworks to create a custom evaluation order.



 Parent topic
 [Device > User Identification > User Mapping](device-user-identification-user-mapping.html#ID0EGU2Z)