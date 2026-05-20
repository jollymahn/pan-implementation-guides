# Device > High Availability

*Device : Device &gt; High Availability*

## Device > High Availability




| • | Device > High Availability |
| --- | --- |




For redundancy, deploy your Palo Alto Networks next-generation firewalls in a [high availability](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/high-availability.html) configuration of HA pairs or an HA cluster. When two HA firewalls function as an HA pair, there are two HA deployments:




| • | active/passive—In this deployment, the active peer continuously synchronizes its configuration and session information with the passive peer over two dedicated interfaces. In the event of a hardware or software disruption on the active firewall, the passive firewall becomes active automatically without loss of service. Active/passive HA deployments are supported with all interface modes: virtual-wire, Layer 2 or Layer 3. |
| --- | --- |






| • | active/active—In this deployment, both HA peers are active and processing traffic. Such deployments are most suited for scenarios involving asymmetric routing or in cases where you want to allow dynamic routing protocols (OSPF, BGP) to maintain active status across both peers. Active/active HA is supported only in the virtual-wire and Layer 3 interface modes. In addition to the HA1 and HA2 links, active/active deployments require a dedicated HA3 link. HA3 link is used as packet forwarding link for session setup and asymmetric traffic handling. |
| --- | --- |



 Note:



| | In an HA pair, both peers must be of the same model, must be running the same PAN-OS and Content Release version, and must have the same set of licenses. |
| --- | --- |



 In addition, for the VM-Series firewalls, both peers must be on the same hypervisor and must have the same number of CPU cores allocated on each peer.

On supported firewall models, you can create a cluster of HA firewalls for session survivability within and between data centers. If a link goes down, the sessions fail over to a different firewall in the cluster. Such synchronization is helpful in use cases where HA peers are spread across multiple data centers or they are spread between an active data center and a standby data center. Another use case is horizontal scaling, where you add HA cluster members to a single data center to scale security and ensure session survivability. HA pairs can belong to an HA cluster and they count as two firewalls in the cluster. The number of firewalls supported in an HA cluster depends on the firewall model.




| • | [Important Considerations for Configuring HA](important-considerations-for-configuring-ha.html#ID0E6IYX) |
| --- | --- |






| • | [HA General Settings](ha-general-settings.html#ID0ENSYX) |
| --- | --- |






| • | [HA Communications](ha-communications.html#ID0EUJ1X) |
| --- | --- |






| • | [HA Link and Path Monitoring](ha-link-and-path-monitoring.html#ID0EN22X) |
| --- | --- |






| • | [HA Active/Active Config](ha-activeactive-config.html#ID0ETD4X) |
| --- | --- |






| • | [Cluster Config](cluster-config.html#ID0E154X) |
| --- | --- |



 Parent topic
 [Device](device.html#ID0EY2QW)