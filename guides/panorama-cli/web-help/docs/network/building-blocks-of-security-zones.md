# Building Blocks of Security Zones

*Network : Network &gt; Zones : Building Blocks of Security Zones*

Building Blocks of Security Zones

To define a security zone, click **Add** and specify the following information.



| Security Zone Settings | Description |
| --- | --- |
| Name | Enter a zone name (up to 31 characters). This name appears in the list of zones when defining security policies and configuring interfaces. The name is case-sensitive and must be unique within the virtual router. Use only letters, numbers, spaces, hyphens, periods, and underscores. |
| Location | This field is present only if the firewall supports multiple virtual systems (vsys) and that capability is enabled. Select the vsys to which this zone applies. |
| Type | Select a zone type (**Tap**, **Virtual Wire**, **Layer2**, **Layer3**, **External**, or **Tunnel**) to view all the **Interfaces** of that type that have not been assigned to a zone. The Layer 2 and Layer 3 zone types list all Ethernet interfaces and subinterfaces of that type. **Add** the interfaces that you want to assign to the zone. The External zone is used to control traffic between multiple virtual systems on a single firewall. It displays only on firewalls that support multiple virtual systems and only if the **Multi Virtual System Capability** is enabled. For information on external zones see [Inter-VSYS Traffic That Remains Within the Firewall](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/virtual-systems/communication-between-virtual-systems/inter-vsys-traffic-that-remains-within-the-firewall). An interface can belong to only one zone in one virtual system. |
| Interfaces | Add one or more interfaces to this zone. |
| Zone Protection Profiles | Select a profile that specifies how the firewall responds to attacks from this zone. To create a new profile, see [Network > Network Profiles > Zone Protection](network-network-profiles-zone-protection.html#ID0EFHDW). The best practice is to defend each zone with Zone Protection profile. |
| Enable Packet Buffer Protection | Configure [Packet Buffer Protection](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/zone-protection-and-dos-protection/configure-zone-protection-to-increase-network-security/configure-packet-buffer-protection.html) ([Device > Setup > Session](device-setup-session.html#ID0EBWRX)) globally and apply it to each zone. The firewall applies Packet Buffer Protection to the ingress zone only. Packet Buffer Protection based on buffer utilization percentage is enabled by default. An alternative is to configure Packet Buffer Protection based on latency. It is a best practice to enable Packet Buffer Protection on each zone to protect the firewall buffers. |
| Enable Net Inspection | Facilitates enablement of [L3 & L4 Header Inspection](l3-l4-header-inspection.html#ID0E1VLW) using custom rules for the security zones associated with the Zone protection profile. The global setting for L3 & L4 header inspection must also be enabled on the firewall ([Device > Setup > Session](device-setup-session.html#ID0EBWRX)). |
| Log Setting | Select a Log Forwarding profile for forwarding zone protection logs to an external system. If you have a Log Forwarding profile named default, that profile will be automatically selected for this drop-down when defining a new security zone. You can override this default setting at any time by continuing to select a different Log Forwarding profile when setting up a new security zone. To define or add a new Log Forwarding profile (and to name a profile default so that this drop-down is populated automatically), click **New** (refer to [Objects > Log Forwarding](objects-log-forwarding.html#ID0EO36R)). Note:  |







 Enable User Identification


 If you configured User-ID™ to perform IP address-to-username mapping (discovery), the best practice is to **Enable User Identification** to apply the mapping information to traffic in this zone. If you disable this option, firewall logs, reports, and policies will exclude user mapping information for traffic within the zone.
 By default, if you select this option, the firewall applies user mapping information to the traffic of all subnetworks in the zone. To limit the information to specific subnetworks within the zone, use the **Include List** and **Exclude List**.
 CAUTION:
 Enable User-ID on trusted zones only. If you enable User-ID and client probing on an external untrusted zone (such as the internet), probes could be sent outside your protected network, resulting in an information disclosure of the User-ID agent service account name, domain name, and encrypted password hash, which could allow an attacker to gain unauthorized access to protected resources.
 Note:



| | User-ID performs discovery for the zone only if it falls within the network range that User-ID monitors. If the zone is outside that range, the firewall does not apply user mapping information to the zone traffic even if you select **Enable User Identification**. For details, see [Include or Exclude Subnetworks for User Mapping](include-or-exclude-subnetworks-for-user-mapping.html#ID0EF1A1). |
| --- | --- |







 User Identification ACL Include List


 By default, if you do not specify subnetworks in this list, the firewall applies the user mapping information it discovers to all the traffic of this zone for use in logs, reports, and policies.
 To limit the application of user mapping information to specific subnetworks within the zone, then for each subnetwork click **Add** and select an address (or address group) object or type the IP address range (for example, 10.1.1.1/24). The exclusion of all other subnetworks is implicit because the **Include List** is an allow list, so you do not need to add them to the **Exclude List**.
 Add entries to the **Exclude List** only to exclude user mapping information for a subset of the subnetworks in the **Include List**. For example, if you add 10.0.0.0/8 to the **Include List** and add 10.2.50.0/22 to the **Exclude List**, the firewall includes user mapping information for all the zone subnetworks of 10.0.0.0/8 except 10.2.50.0/22, and excludes information for all zone subnetworks outside of 10.0.0.0/8.
 Note:



| | You can only include subnetworks that fall within the network range that User-ID monitors. For details, see [Include or Exclude Subnetworks for User Mapping](include-or-exclude-subnetworks-for-user-mapping.html#ID0EF1A1). |
| --- | --- |







 User Identification ACL Exclude List


 To exclude user mapping information for a subset of the subnetworks in the **Include List**, **Add** an address (or address group) object or type the IP address range for each subnetwork to exclude.
 Note:



| | If you add entries to the **Exclude List** but not the **Include List**, the firewall excludes user mapping information for all subnetworks within the zone, not just the subnetworks you added. |
| --- | --- |







 Pre-NAT Identification


 You use [service connections](https://docs.paloaltonetworks.com/prisma-access/administration/prisma-access-service-connections), also known as service connection—corporate access nodes (SC-CANs), in Prisma Access to secure private apps. To limit access to the apps based on User-ID or Device-ID, you can deploy a Next-Generation Firewall (NGFW) in the data center or headquarters location where the private apps are located; then, configure policy rules on the NGFW based on User-ID mapping, Device-ID mapping, or both.
 To use these rules, the NGFW must receive the User- or Device-ID mapping from the SC-CAN; however, if users are connecting to Prisma Access using GlobalProtect and the SC-CAN has **Data Traffic source NAT** enabled, the NGFW can't obtain this mapping. If **Data Traffic source NAT** is enabled on the SC-CAN, it performs NAT on the Mobile User IP address pool and does not advertise those IP addresses in the data center or headquarters location. In this case, the NGFW can't retrieve the GlobalProtect users' User- or Device-ID, which means that you can't enforce policy based on User- or Device-ID.
 To make sure that your network distributes the User- or Device-ID mapping to the headquarters or data center, select one or more of the following parameters on the NGFW, which allows the NGFW to enforce security policy rules based on the User-ID mapping it learns from GlobalProtect.



| • | **User-ID**—Preserves the mobile user User-ID mapping used before the IP addresses were NATted. Enable this if you're using User-IDs in security policy rules. |
| --- | --- |






| • | **Device-ID**—Preserves the mobile user Device-ID mapping used before the IP addresses were NATted. Enable this if you're using Device-ID in security policy rules. |
| --- | --- |






| • | **Source Lookup**—Enables you to match the original Source IP address received from GlobalProtect. If you're using source lookup in QoS or policy-based forwarding (PBF) policies, the source IP comparison is based on the pre-NAT source IP address. For example, if you had a security policy that allowed a source IP address of 1.1.1.1 and a destination IP address of Any, 1.1.1.1 is compared with the pre-NAT source IP address in the packet header. |
| --- | --- |






| • | **Enable Original ID Downstream**—If you have two NGFWs in a row, specify this option to have the first NGFW send the pre-NAT information to the second NGFW after the first NGFW has inspected the traffic and applied policies to it. This is the default configuration on SC-CANs. |
| --- | --- |






 Parent topic
 [Network > Zones](network-zones.html#ID0EC6TT)