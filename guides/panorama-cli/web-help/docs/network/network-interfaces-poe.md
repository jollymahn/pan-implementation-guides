# Network > Interfaces > PoE

*Network : Network &gt; Interfaces &gt; PoE*

## Network > Interfaces > PoE


You can configure power over Ethernet (PoE) on supported interfaces to transfer electrical power from the firewall to a connected powered device (PD). This screen displays a summary of the PoE configuration across all interfaces as well as the power budget, allocation, and use defined by your PoE settings.


The following table outlines each column of the **Interfaces PoE Details** table.



| Column | Description |
| --- | --- |
| Interface | The interface name and its corresponding physical port. |
| PoE Enabled | Indicates **Yes** if PoE is enabled on the interface. |
| Operational Status | Displays the current status of PoE on the interface. Consult the **Legend** table to help determine the values in this column. |
| Connection Check | Displays if a connection is present between the firewall and a powered device. |
| Class | Displays PoE class information based on power output, power supply type, and IEEE standards. |
| Allocated Power (W) | The amount of power in Watts allocated by the interface. |
| Used Power (W) | The amount of power in Watts currently being used by the interface. |
| Consumed Power (W) | The amount of power in Watts that has been consumed by the interface. |
| Rsvd Power/Max Power (W) | The amount of power reserved by the interface over the maximum power potential in Watts. |
| Faults | Displays details if the PoE connection has encountered an error on the given port. |
| Reason for Blacklist | Displays details for ports that have been blacklisted. **None** denotes that a port is not blacklisted. |


Certain columns in the **Interfaces PoE Details** table above make use of abbreviated terms to convey a status, error, or other circumstances. The **Legend** table below describes each abbreviated term.



| Abbreviation | Term |
| --- | --- |
| Alloc | Allocated |
| Apr | Approved |
| Config | Configuration |
| Conn-chk | Connection Check |
| Covc | Class Over Current |
| Den | Power Denied |
| Dis | Disable |
| Disc | Disconnect |
| DS | Dual Signature |
| Ena | Enabled |
| Flt | Fault |
| NOFLT | No Faults |
| Opr | Operational |
| Pcut | Power Cut |
| Prgto | Power Good Timeout |
| Pwr | Power |
| Rsvd | Reserved |
| Short | Short-circuit |
| Shut | Shutdown |
| Sig | Signal Pair |
| Soft | Software |
| Sp | Spare Pair |
| SS | Single Signature |
| TooHigh | Capacitance higher than expected |
| TooLow | PD Resistance too low |
| Tstart | Inrush current higher than max allowed |
| UN | Unknown |
| W | Watts |

 Parent topic
 [Network](network.html#ID0EFOJS)