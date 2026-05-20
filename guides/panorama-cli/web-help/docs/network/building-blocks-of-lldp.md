# Building Blocks of LLDP

*Network : Network &gt; LLDP : Building Blocks of LLDP*

Building Blocks of LLDP

To enable LLDP on the firewall, click Edit, click **Enable**, and optionally configure the four settings shown in the following table, if the default settings do not suit your environment. The remaining table entries describe the status and peer statistics.



| LLDP Settings | Configured In | Description |
| --- | --- | --- |
| Transmit Interval (sec) | **LLDP General** | Specify the interval, in seconds, at which LLDPDUs are transmitted (range is 1-3,600; default is 30). |
| Transmit Delay (sec) | Specify the delay time, in seconds, between LLDP transmissions sent after a change is made in a Type-Length-Value (TLV) element. The delay helps to prevent flooding the segment with LLDPDUs if many network changes spike the number of LLDP changes or if the interface flaps. The **Transmit Delay** must be less than the **Transmit Interval** (range is 1-600; default is 2). | |
| Hold Time Multiple | Specify a value that is multiplied by the **Transmit Interval** to determine the total TTL hold time (range is 1-100; default is 4). The TTL hold time is the length of time the firewall will retain the information from the peer as valid. The maximum TTL hold time is 65,535 seconds, regardless of the multiplier value. | |
| Notification Interval | Specify the interval, in seconds, at which syslog and SNMP Trap notifications are transmitted when MIB changes occur (range is 1-3,600; default is 5). | |
| spyglass filter | **LLDP** > **Status** | Optionally enter a data value in the filter row and click the gray arrow, which causes only the rows that include that data value to be displayed. Click the red X to Clear Filter. |
| Interface | Name of the interfaces that have LLDP profiles assigned to them. | |
| Type | Interface types (such as Layer 2, Layer 3, virtual wire, tap, HA, or aggregate Ethernet) that have LLDP profiles assigned to them. | |
| LLDP | LLDP status: enabled or disabled. | |
| HA Pre-negotiation | HA pre-negotiation status: enabled or disabled. LLDP pre-negotiation facilitates faster failovers in HA active/passive scenarios. | |
| Mode | LLDP mode of the interface: Tx/Rx, Tx Only, or Rx Only. | |
| Profile | Name of the profile assigned to the interface. | |
| Total Transmitted | Count of LLDPDUs transmitted out the interface. | |
| Dropped Transmit | Count of LLDPDUs that were not transmitted out the interface because of an error. For example, a length error when the system is constructing an LLDPDU for transmission. | |
| Total Received | Count of LLDP frames received on the interface. | |
| Dropped TLV | Count of LLDP frames discarded upon receipt. | |
| Errors | Count of Time-Length-Value (TLV) elements that were received on the interface and contained errors. Types of TLV errors include: one or more mandatory TLVs missing, out of order, containing out-of-range information, or length error. | |
| Unrecognized | Count of TLVs received on the interface that are not recognized by the LLDP local agent, for example, because the TLV type is in the reserved TLV range. | |
| Aged Out | Count of items deleted from the Receive MIB due to proper TTL expiration. | |
| Clear LLDP Statistics | Select to clear all of the LLDP statistics. | |
| spyglass filter | **LLDP** > **Peers** | Optionally enter a data value in the filter row and click the gray arrow, which causes only the rows that include that data value to be displayed. Click the red X to Clear Filter. |
| Local Interface | Interface on the firewall that detected the neighboring device. | |
| Remote Chassis ID | Chassis ID of the peer; the MAC address is used. | |
| Port ID | **LLDP** > **Peers (cont)** | Port ID of the peer. |
| Name | Name of the peer. | |
| More Info | Click **More Info** to see Remote Peer Details, which are based on the Mandatory and Optional TLVs. | |
| Chassis Type | Chassis Type is MAC address. | |
| MAC Address | MAC address of the peer. | |
| System Name | Name of the peer. | |
| System Description | Description of the peer. | |
| Port Description | Port description of the peer. | |
| Port Type | Interface name. | |
| Port ID | Firewall uses the ifname of the interface. | |
| System Capabilities | Capabilities of the system. O=Other, P=Repeater, B=Bridge, W=Wireless-LAN, R=Router, T=Telephone | |
| Enabled Capabilities | Capabilities enabled on the peer. | |
| Management Address | Management address of the peer. | |


 Parent topic
 [Network > LLDP](network-lldp.html#ID0EKLZV)