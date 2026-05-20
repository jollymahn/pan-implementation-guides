# Objects > Security Profiles > Mobile Network Protection

*Objects : Objects &gt; Security Profiles &gt; Mobile Network Protection*

## Objects > Security Profiles > Mobile Network Protection


The Mobile Network Protection profile enables the firewall to inspect GPRS tunneling protocol (GTP) traffic in 4G networks and Packet Forwarding Control Protocol (PFCP) or HTTP/2 traffic in 5G networks. To view this profile, you must enable GTP Security in [Device > Setup > Management](device-setup-management.html#ID0E1DTW).


Use the options in this profile to enable stateful inspection of:




| • | 5G HTTP/2 |
| --- | --- |






| • | GTP v1-C |
| --- | --- |






| • | GTP v2-C |
| --- | --- |






| • | GTP-U |
| --- | --- |






| • | PFCP |
| --- | --- |




You can also enable protocol validation for GTPv1-C, GTP v2-C, and GTP-U and enable GTP-U content inspection to scan user data within GTP-U tunnels. It also enables you to filter GTP sessions based on (Access Point Name) APN, International Mobile Subscriber Identity (IMSI) or IMSI-Prefix, and RAT, and to prevent end-user IP address spoofing.



| GTP Inspection Profile Settings | |
| --- | --- |
| **GTP Inspection** | |
| GTP-C | • |






| • | Select the **Action**—**Block** or **Alert**—that the firewall takes upon a validity check failure. The alert action allows the traffic but generates a log; the block action denies the traffic and generates a log. |
| --- | --- |






| • | Specify the validity checks that the firewall must perform on a GTP header and the Information Elements (IE) in a payload. The firewall uses the block or alert action you select below for handling the error. You can configure the firewall to validate: |
| --- | --- |






| ◦ | **Reserved IE**—Checks for the GTPv1-C or GTPv2-C messages that use reserved IE values. |
| --- | --- |






| ◦ | **Order of IE** (`GTPv1-C only`)—Checks that the order of IEs in GTPv1-C or GTPv2-C messages is accurate. |
| --- | --- |






| ◦ | **Length of IE**—Checks for the GTPv1-C or GTPv2-C messages with an invalid IE length. |
| --- | --- |






| ◦ | **Spare Flag in Header**—Checks for malformed packets that use invalid values or reserved values in a header. |
| --- | --- |






| ◦ | **Unsupported message type**—Checks for unknown or incorrect message types. |
| --- | --- |







 GTP-U


 Enabling stateful inspection for GTPv1-C, GTPv2-C, or both automatically enables GTP-U stateful inspection.
 You can specify the following validity checks for GTP-U payloads.



| • | **Reserved IE**—Checks for the GTP-U messages that use reserved IE values in the payload. |
| --- | --- |






| • | **Order of IE**—Checks that the order of the IEs in GTP-U messages is correct. |
| --- | --- |






| • | **Length of IE**—Checks for messages with invalid IE length. |
| --- | --- |






| • | **Spare flag in header**—Checks for malformed packets that use invalid values or reserved values in a header. |
| --- | --- |






| • | **Unsupported message type**—Checks for unknown or incorrect message types. |
| --- | --- |



 You can also configure an allow, block, or alert action for:



| • | **End User IP Address Spoofing**—Configure the firewall to block or alert when the source IP address in a GTP-U packet from the subscriber user equipment isn't the same as the IP address in the corresponding GTP-C message exchanged during tunnel setup. |
| --- | --- |



 Note:**If you enable PFCP stateful inspection, this option isn't available.



| • | **GTP-in-GTP**—You can configure the firewall to block or alert when it detects a GTP-in-GTP message. Upon detection, the firewall generates a GTP log with critical severity. |
| --- | --- |






| • | Log at GTP-U session start**—Log the associated IP address and tunnel endpoint ID in the GTP logs at the beginning of a GTP-U session. |
| --- | --- |






| • | **Log at GTP-U session end**—Log the associated IP address and tunnel endpoint ID in the GTP logs at the conclusion of a GTP-U session. |
| --- | --- |






| • | For 5G, 4G, and 3G, enable **GTP-U Content Inspection** to inspect and apply policy to the user data payload within a GTP-U packet. Inspecting GTP-U content allows you to correlate IMSI and IMEI information learned from GTP-C messages with the IP traffic encapsulated in GTP-U packets. |
| --- | --- |







 5G-C


 For 5G, enable **5G-HTTP2** to enable inspection of 5G HTTP/2 control packets, which can contain subscriber IDs, equipment IDs, and network slice information. This allows you to correlate subscriber ID (IMSI), equipment ID (IMEI), and network slice ID information learned from HTTP/2 messages with the IP traffic encapsulated in GTP-U packets.
 Enabling **5G-HTTP2** disables GTP-C for the profile.




 PFCP


 For PFCP, enable **Stateful Inspection** to inspect PFCP traffic. When you enable stateful inspection for PFCP traffic, the firewall inspects the traffic between the MEC and the remote or central site to help prevent attacks such as Denial of Service (DoS) or spoofing.
 Note:**If you enable this option, Actions for GTP-U End User IP Address Spoofing are not available.
 You can specify the following state checks:



| • | **Check Association Messages**—Checks for any PFCP association messages that are out of order or that were rejected. |
| --- | --- |






| • | Check Session Messages**—Checks for any PFCP session messages that are out of order or that were rejected. |
| --- | --- |






| • | **Check Sequence Number**—Confirms that the sequence number in the PFCP matches the sequence number in the PFCP request message. |
| --- | --- |



 You can then specify the **Action** (**Allow**, **Alert**, or **Block**) you want the firewall to take when the check is unsuccessful.
 You can also select if you want the firewall to create a log at the beginning or ending of the PFCP associations or sessions.




 **Correlation**




 UEIP Correlation


 Enables correlation and mapping of subscriber ID and equipment ID to the User Equipment (UE) IP address.




 Mode





| • | **Loose**—(Default) When the firewall detects GTP-U inner traffic, it queries the source or destination address to find the correlated IMEI or IMSI information. If there are no results, the firewall forwards the traffic. |
| --- | --- |






| • | **Strict**—Drops the traffic if the GTP-U query returns no results. |
| --- | --- |







 User Plane GTP-U Encapsulation


 Based on your deployment, select whether you want to use **User Plane GTP-U Encapsulation**:



| • | **Enable** if the firewall will be deployed on the **N3/S1U interface**. |
| --- | --- |






| • | **Disable** If the firewall will be deployed on the **SGi/N6 interface**. |
| --- | --- |







 Source


 Select the source that you want the firewall to use to correlate the control plane and user plane information for enforcement of subscriber-level and equipment-level Security policy. The firewall inspects traffic for the source type you select to process and extracts 5G/4G identity information, such as subscriber ID (SUPI or IMSI), equipment ID (PEI or IMEI), and the IP address of the user equipment (UE), to correlate with 5G/4G subscriber IP traffic.



| • | **PFCP**—Inspect Packet Forwarding Control Protocol (PFCP) traffic. |
| --- | --- |



 Note:**For deployments using control and user plane separation (CUPS), select PFCP.



| • | RADIUS**—Inspect Remote Authentication Dial-In Service (RADIUS) traffic. |
| --- | --- |






| • | **GTP**—Inspect GTP traffic, including GTPv2-C and GTPv1-C. |
| --- | --- |







 Log at UEIP Start


 Log UEIP correlation events when the firewall allocates an IP address to the UE.




 Log at UEIP End


 Log UEIP correlation events when the firewall releases the allocated IP address.




 **Filtering Options**




 RAT Filtering


 All Radio Access Technologies (RAT) are allowed by default. GTP-C Create-PDP-Request and Create-Session-Request messages are filtered or allowed based on the RAT filter. You can specify whether to allow, block, or alert on the following RAT that the user equipment uses to access the mobile core network:



| • | **UTRAN** |
| --- | --- |






| • | **GERAN** |
| --- | --- |






| • | **WLAN** |
| --- | --- |






| • | **GAN** |
| --- | --- |






| • | **HSPA Evolution** |
| --- | --- |






| • | **EUTRAN** |
| --- | --- |






| • | **Virtual** |
| --- | --- |






| • | **EUTRAN-NB-IoT** |
| --- | --- |






| • | **LTE-M** |
| --- | --- |






| • | **NR** |
| --- | --- |



 The following RATs are available when enabling **5G-HTTP2**:



| • | **WLAN** |
| --- | --- |






| • | **EUTRAN** |
| --- | --- |






| • | **Virtual** |
| --- | --- |






| • | **NR** |
| --- | --- |







 IMSI Filtering


 IMSI is a unique identification associated with a subscriber in GSM, UMTS, and LTE networks provisioned in the Subscriber Identity Module (SIM) card.
 An IMSI is presented as a 15-digit number (8 bytes) but can be shorter. IMSI is composed of three parts:



| • | Mobile Country Code (MCC) consisting of three digits. The MCC identifies uniquely the country of domicile of the mobile subscriber. |
| --- | --- |






| • | Mobile Network Code (MNC) consisting of two or three digits; two digits European standard or three digits North American standard. The MNC identifies the home PLMN of the mobile subscriber. |
| --- | --- |






| • | Mobile Subscriber Identification Number (MSIN) identifying the mobile subscriber within a PLMN. |
| --- | --- |



 The **IMSI Prefix** combines the MCC and MNC and allows you to **allow**, **block**, or **alert** GTP traffic from a specific PLMN. By default all IMSI are allowed.
 You can either manually enter or import a CSV file with IMSI or IMSI prefixes into the firewall. The IMSI can include wildcards, for example, 310* or 240011*.
 The firewall supports a maximum of 5,000 IMSI or IMSI prefixes.




 APN Filtering


 The APN is a reference to a GGSN or PGW that user equipment requires to connect to the internet. In 5G, one format of Data Network Name (DNN) is the APN. The APN is composed of one or two identifiers:



| • | APN Network Identifier that defines the external network to which the GGSN or PGW is connected and optionally a requested service by the mobile station. This part of the APN is mandatory. |
| --- | --- |






| • | APN Operator Identifier that defines in which PLMN GPRS/EPS backbone the GGSN/PGW is located. This part of the APN is optional. |
| --- | --- |



 All APNs are allowed by default. The APN filter enables you to allow, block, or alert GTP traffic based on the APN value. GTP-C Create-PDP-Request and Create-Session-Request messages are filtered or allowed based on the rules defined for APN filtering.
 You can manually add or import an APN filtering list into the firewall. The value for the APN must include the network ID or the domain name of the network (for example, example.com) and, optionally, the operator ID.
 For APN filtering, the wildcard '*' allows you to match for all APN. A combination of '*' and other characters is not supported for wildcards. For example, "internet.mnc* " is treated as a regular APN and will not filter all entries that start with internet.mnc.
 The firewall supports a maximum of 1,000 APN filters.




 **GTP Tunnel Limit**




 Max Concurrent Tunnels Allowed per Destination


 Limit the maximum number of GTP-U tunnels to a destination IP address; for example, to the GGSN (range is 0–100,000,000 tunnels)




 Alert at Max Concurrent Tunnels per Destination


 Specify the threshold at which the firewall triggers an alert when the number of maximum GTP-U tunnels to a destination have been established. A GTP log message of high severity is generated when the configured tunnel limit is reached.




 Logging frequency


 Specify the number of events that the firewall counts before it generates a log when the configured GTP tunnel limits are exceeded. This setting allows you to reduce the volume to messages logged (range is 0 to 100,000,000; default is 100).




 Overbilling Protection


 Select the virtual system that serves as the Gi/ SGi firewall on your firewall. The Gi/ SGi firewall inspects the mobile subscriber IP traffic traversing over the Gi/ SGi interface from the PGW or GGSN to the external PDN (packet data network) such as the internet and secures internet access for mobile subscribers.
 Overbilling can occur when a GGSN assigns a previously used IP address from the End User IP address pool to a mobile subscriber. When a malicious server on the internet continues to send packets to this IP address as it did not close the session initiated for the previous subscriber and the session is still open on the Gi firewall. To disallow data from being delivered, whenever a GTP tunnel is deleted (detected by delete-PDP or delete-session message) or timed-out, the firewall enabled for overbilling protection notifies the Gi/ SGi firewall to delete all the sessions that belong to the subscriber from the session table. GTP Security and SGi/ Gi firewall should be configured on the same physical firewall, but can be in different virtual systems. To delete sessions based on GTP-C events, the firewall needs to have all the relevant session information and this is possible only when you manage traffic from the SGi + S11 or S5 interfaces for GTPv2 and Gi + Gn interfaces for GTPv1 in the mobile core network.




 **Other Log Settings**
 By default the firewall does not log allowed GTP or PFCP messages. You can selectively enable logging of allowed GTP and PFCP messages for troubleshooting when needed as it will generate a high volume of logs. In addition to allowed log messages, this tab also allows you to selectively enable logging of user location information.




 GTPv1-C Allowed Messages


 Log allowed GTPv1-C messages if you have enabled stateful inspection for GTPv1-C. These messages help you troubleshoot issues.
 By default, the firewall does not log allowed messages. The logging options for allowed GTPv1-C messages are:



| • | **Tunnel Management**—These GTPv1-C messages are used to manage the GTP-U tunnels, which carry encapsulated IP packets and signaling messages between a given pair of network nodes like SGSN and GGSN. It includes messages such as Create PDP Context Request, Create PDP Context Response, Update PDP Context Request, Update PDP Context Response, Delete PDP Context Request, Delete PDP Context Response. |
| --- | --- |






| • | **Path Management**—These GTPv1-C messages are typically sent by the GSN or Radio Network Controller (RNC) to the other GSN or RNC to find out if the peer is alive. It includes messages such as Echo Request and Echo Response. |
| --- | --- |






| • | **Others**—These messages include location management, mobility management, RAN information management, and Multimedia Broadcast Multicast Service (MBMS) messages. |
| --- | --- |







 Log User Location


 Include the user location information, such as area code and Cell ID, in GTP logs.




 Packet Capture


 Capture GTP events.




 GTPv2-C Allowed Messages


 Selectively enable logging of the allowed GTPv2-C messages if you enabled stateful inspection for GTPv2-C. These messages generate logs to help you troubleshoot issues as needed.
 By default, the firewall does not log allowed messages. The logging options for allowed GTPv2-C messages are:



| • | **Tunnel Management**—These GTPv2-C messages are used to manage the GTP-U tunnels, which carry encapsulated IP packets and signaling messages between a given pair of network nodes such as the SGW and PGW. It includes the following types of messages: Create Session Request, Create Session Response, Create Bearer Request, Create Bearer Response, Modify Bearer Request, Modify Bearer Response, Delete Session Request, and Delete Session Response. |
| --- | --- |






| • | **Path Management**—These GTPv2-C messages are typically sent by network nodes, such as from the SGW or PGW to the other PGW or SGW to find out if the peer is responsive. It includes messages such as Echo Request and Echo Response. |
| --- | --- |






| • | **Others**—These messages include mobility management and Non-3GPP access-related messages. |
| --- | --- |







 GTP-U Allowed Messages


 Selectively enable logging of the allowed GTP-U messages if you enable stateful inspection for GTPv2-C or GTPv1-C. These messages generate logs to help you troubleshoot issues as needed.
 The logging options for allowed GTP-U messages are:



| • | **Tunnel Management**—These are GTP-U signaling messages such as Error Indication. |
| --- | --- |






| • | **Path Management**—These GTP-U messages are sent by a network node (such as eNodeB) to another network node (such as SGW) to find out if the peer is responsive. It includes messages such as Echo Request/Response. |
| --- | --- |






| • | **G-PDU**—G-PDU (GTP-U PDU) is used for carrying user data packets within the network nodes in the mobile core network; it consists of a GTP header plus a T-PDU. |
| --- | --- |







 G-PDU Packets Logged per New GTP-U Tunnel


 Verify that the firewall is inspecting GTP-U PDUs. The firewall generates a log for the specified number of G-PDU packets in each new GTP-U tunnel (range is 1–10; default is 1).




 5G-C Allowed Messages


 Select **N11** to selectively enable logging of allowed N11 messages. N11 messages help you with troubleshooting and provide deeper visibility into the HTTP/2 messages exchanged over an N11 interface for different procedures. This field is available only if you enabled **5G-HTTP2** on the **5G-C** tab in the Mobile Network Protection profile.




 PFCP Allowed Messages


 Selectively enable logging of the allowed PFCP messages if you enable stateful inspection for PFCP. These messages help you troubleshoot issues.
 The logging options for allowed PFCP messages are:



| • | **Session Establishment**—These PFCP messages set up the session, including establishing the GTP-U tunnel. |
| --- | --- |






| • | **Session Modification**—These PFCP messages are sent if the session ID or PDR ID changes (for example, as a result of moving from a 4G to a 5G network. It includes messages such as PFCP Session Modification Request and PFCP Session Modification Response. |
| --- | --- |






| • | **Session Deletion**—These PFCP messages terminate the PFCP session, including releasing associated resources. |
| --- | --- |






 Parent topic
 [Objects](objects.html#ID0EL3RQ)