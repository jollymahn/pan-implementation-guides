# Building Blocks in a Tunnel Inspection Policy

*Policies : Policies &gt; Tunnel Inspection : Building Blocks in a Tunnel Inspection Policy*

Building Blocks in a Tunnel Inspection Policy

Select **Policies** > **Tunnel Inspection** to add a Tunnel Inspection policy rule. You can use the firewall to inspect content of cleartext tunnel protocols (GRE, GTP-U, non-encrypted IPSec, and VXLAN) and leverage tunnel content inspection to enforce Security, DoS Protection, and QoS policies on traffic in these types of tunnels. All firewall models support [tunnel content inspection](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-networking-admin/tunnel-content-inspection.html) of GRE and non-encrypted IPSec tunnels, but only firewalls that support GTP support tunnel content inspection of GTP-U tunnels. The following table describes the fields you configure for a Tunnel Inspection policy.



| Building Blocks in a Tunnel Inspection Policy | Configured In | Description |
| --- | --- | --- |
| Name | **General** | Enter a name for the Tunnel Inspection policy beginning with an alphanumeric character and containing zero or more alphanumeric, underscore, hyphen, period, or space characters. |
| Description | (`Optional`) Enter a description for the Tunnel Inspection policy. | |
| Tags | (`Optional`) Enter one or more tags for reporting and logging purposes that identify the packets that are subject to the Tunnel Inspection policy. | |
| Group Rules by Tag | Enter a tag with which to group similar policy rules. The group tag allows you to view your policy rule base based on these tags. You can group rules based on a **Tag**. | |
| Audit Comment | Enter a comment to audit the creation or editing of the policy rule. The audit comment is case-sensitive and can have up to 256 characters, which can be letters, numbers, spaces, hyphens, and underscores. | |
| Audit Comment Archive | View previous **Audit Comments** for the policy rule. You can export the Audit Comment Archive in CSV format. | |
| Source Zone | **Source** | **Add** one or more source zones of packets to which the Tunnel Inspection policy applies (default is **Any**). |
| Source Address | (`Optional`) **Add** source IPv4 or IPv6 addresses, address groups, or Geo Region address objects of packets to which the Tunnel Inspection policy applies (default is **Any**). | |
| Source User | (`Optional`) **Add** source users of packets to which the Tunnel Inspection policy applies (default is **any**). | |
| Negate | (`Optional`) Select **Negate** to choose any addresses except those specified. | |
| Destination Zone | **Destination** | **Add** one or more destination zones of packets to which the Tunnel Inspection policy applies (default is **Any**). |
| Destination Address | (`Optional`) **Add** destination IPv4 or IPv6 addresses, address groups, or Geo Region address objects of packets to which the Tunnel Inspection policy applies (default is **Any**). | |
| Negate | (`Optional`) Select **Negate** to choose any addresses except those specified. | |
| Tunnel Protocol | **Inspection** | **Add** one or more tunnel **Protocols** that you want the firewall to inspect: • |






| • | **GTP-U**—Firewall inspects packets that use the General Packet Radio Service (GPRS) tunneling protocol for user data (GTP-U) in the tunnel. |
| --- | --- |






| • | **Non-encrypted IPSec**—Firewall inspects packets that use non-encrypted IPSec (Null Encrypted IPSec or transport mode AH IPSec) in the tunnel. |
| --- | --- |






| • | **VXLAN**—Firewall inspects a VXLAN payload to find the encapsulated content or applications within the tunnel. |
| --- | --- |



 To remove a protocol from your list, select the protocol and **Delete** it.




 Maximum Tunnel Inspection Levels


 **Inspection** > **Inspect Options**


 Specify whether the firewall will inspect **One Level** (default) or **Two Levels (Tunnel In Tunnel)** of encapsulation. For VXLAN, select **One Level**, as inspection only occurs on the outer layer.




 Drop packet if over maximum tunnel inspection level


 (`Optional`) Drop packets that contain more levels of encapsulation than you specified for Maximum Tunnel Inspection Levels.




 Drop packet if tunnel protocol fails strict header check


 (`Optional`) Drop packets that contain a tunnel protocol that uses a header that is non-compliant with the RFC for that protocol. Non-compliant headers indicate suspicious packets. This option causes the firewall to verify GRE headers against RFC 2890.
 Note:



| | Do not enable this option if your firewall is tunneling GRE with a device that implements a version of GRE older than RFC 2890. |
| --- | --- |







 Drop packet if unknown protocol inside tunnel


 (`Optional`) Drop packets that contain a protocol inside the tunnel that the firewall cannot identify.




 Return Scanned VXLAN Tunnel to Source


 (`Optional`) Enable this option to return the traffic to the originating VXLAN tunnel endpoint (VTEP). For example, use this option to return the encapsulated packet to the source VTEP. Supported only on Layer 3, Layer 3 subinterface, aggregate-interface Layer 3, and VLAN.




 Enable Security Options


 **Inspection** > **Security Options**


 (`Optional`) **Enable Security Options** to assign security zones for separate Security policy treatment of tunnel content. The inner content source will belong to the **Tunnel Source Zone** you specify and the inner content destination will belong to the **Tunnel Destination Zone** you specify.
 If you do not **Enable Security Options**, by default the inner content source belongs to the same zone as the outer tunnel source, and the inner content destination belongs to the same zone as the outer tunnel destination. Therefore, both the inner content source and destination are subject to the same Security policies that apply to the source and destination zones of the outer tunnel.




 Tunnel Source Zone


 If you **Enable Security Options**, select a tunnel zone that you created, and the inner content will use this source zone for the purpose of policy enforcement.
 Otherwise, by default the inner content source belongs to the same zone as the outer tunnel source, and the policies of the outer tunnel source zone apply to the inner content source zone also.




 Tunnel Destination Zone


 If you **Enable Security Options**, select a tunnel zone that you created, and the inner content will use this destination zone for the purpose of policy enforcement.
 Otherwise, by default the inner content destination belongs to the same zone as the outer tunnel destination, and the policies of the outer tunnel destination zone apply to the inner content destination zone also.




 Monitor Name


 **Inspection** > **Monitor Options**


 (`Optional`) Enter a monitor name to group similar traffic together for monitoring the traffic in logs and reports.




 Monitor Tag (number)


 (`Optional`) Enter a monitor tag number that can group similar traffic together for logging and reporting (range is 1 to 16,777,215). The tag number is globally defined.
 Note:



| | This field does not apply to the VXLAN protocol. VXLAN logs automatically use the VXLAN Network Identifier (VNI) from the VXLAN header. |
| --- | --- |







 Log at Session Start


 (`Optional`) Select this option to generate a log at the start of a cleartext tunnel session that matches the Tunnel Inspection policy. This setting overrides the Log at Session Start setting in the Security Policy rule that applies to the session.
 Tunnel logs are stored separately from traffic logs. The information with the outer tunnel session (GRE, non-encrypted IPSec, or GTP-U) is stored in the Tunnel logs and the inner traffic flows are stored in the Traffic logs. This separation allows you to easily report on tunnel activity (as opposed to inner content activity) with the ACC and reporting features.
 Fastpath:
 The best practice for Tunnel logs is to Log at Session Start and Log at Session End because, for logging, tunnels can be very long-lived. For example, GRE tunnels can come up when the router boots and never terminate until the router is rebooted. If you don’t select Log at Session Start, you will never see that there is an active GRE tunnel in the ACC.




 Log at Session End


 (`Optional`) Select this option to capture a log at the end of a cleartext tunnel session that matches the Tunnel Inspection policy. This setting overrides the Log at Session End setting in the Security Policy rule that applies to the session.




 Log Forwarding


 (`Optional`) Select a Log Forwarding profile from the drop-down to specify where to forward tunnel inspection logs. (This setting is separate from the Log Forwarding setting in a Security policy rule, which applies to traffic logs.)




 Name


 **Tunnel ID**
 By default, if you do **not** configure a VXLAN ID, all traffic is inspected.
 If you configure a VXLAN ID you can use it as a matching criteria to restrict traffic inspection to specific VNIs.


 (`Optional`) A name beginning with an alphanumeric character and containing zero or more alphanumeric, underscore, hyphen, period, and space characters. The **Name** describes the VNIs you are grouping. The name is a convenience, and is not a factor in logging, monitoring, or reporting.




 VXLAN ID (VNI)


 (`Optional`) Enter a single VNI, a comma-separated list of VNIs, a range of up to 16 million VNIs (with a hyphen as the separator), or a combination of these. For example:
 1-54,1024,1677011-1677038,94
 The maximum VXLAN IDs per policy is 4,096. To preserve configuration memory, use ranges where possible.




 Any (target all devices)
 `Panorama only`


 **Target**


 Enable (check) to push the policy rule to all managed firewalls in the device group.




 Devices
 `Panorama only`


 Select one or more managed firewalls associated with the device group to push the policy rule to.




 Tags
 `Panorama only`


 **Add** one or more tags to push the policy rule to managed firewalls in the device group with the specified tag.




 Target to all but these specified devices and tags
 `Panorama only`


 Enable (check) to push the policy rule to all managed firewalls associated with the device group except for the selected device(s) and tag(s).



 Parent topic
 [Policies > Tunnel Inspection](policies-tunnel-inspection.html#ID0EWGFQ)