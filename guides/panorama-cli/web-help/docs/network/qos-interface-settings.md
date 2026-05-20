# QoS Interface Settings

*Network : Network &gt; QoS : QoS Interface Settings*

QoS Interface Settings

Enable QoS on an interface to set bandwidth limits for the interface and/or to enable the interface to enforce QoS for egress traffic. Enabling a QoS interface includes attaching a QoS profile to the interface. QoS is supported on physical interfaces and, depending on firewall model, QoS is also supported on subinterfaces and Aggregate Ethernet (AE) interfaces. See the Palo Alto Networks [product comparison tool](https://www.paloaltonetworks.com/products/product-selection.html) to view QoS feature support for your firewall model.


To get started, **Add** or modify a QoS Interface, and then configure settings as described in the following table.



| QoS Interface Settings | Configured In | Description |
| --- | --- | --- |
| Interface Name | **QoS Interface** > **Physical Interface** | Select the firewall interface on which to enable QoS. |
| Egress Max (Mbps) | Enter the maximum throughput (in Mbps) for traffic leaving the firewall through this interface. The value is 0 by default. When the value is set to 0, • | the firewall uses the hardware QoS limit and set it to 60,000 Mbps in PAN-OS 7.1.16 and later releases; and 16,000 in PAN-OS 7.1.15 and earlier releases. Or |






| • | the firewall uses the software QoS limit which varies and the QoS behavior is not guaranteed for the [legacy QoS](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/quality-of-service/configure-lockless-qos). |
| --- | --- |



 Fastpath:
 Though this is not a required field, we recommend always defining the **Egress Max** for a QoS interface.




 Turn on QoS feature on this interface


 Select to enable QoS on the selected interface.




 Clear Text
 Tunnel Interface


 **QoS Interface** > **Physical Interface** > **Default Profile**


 Select the default QoS profiles for clear text and for tunneled traffic. You must specify a default profile for each. For clear text traffic, the default profile applies to all clear text traffic as an aggregate. For tunneled traffic, the default profile is applied individually to each tunnel that does not have a specific profile assignment in the detailed configuration section. For instructions on defining QoS profiles, refer to [Network > Network Profiles > QoS](network-network-profiles-qos.html#ID0EY3MW).




 Tunnel Interface




 Egress Guaranteed (Mbps)


 **QoS Interface** > **Clear Text Traffic/ Tunneled Traffic**


 Enter the bandwidth that is guaranteed for clear text or tunneled traffic from this interface.




 Egress Max (Mbps)


 Enter the maximum throughput (in Mbps) for clear text or tunneled traffic leaving the firewall through this interface. The value is 0 by default.

 When the value is set to 0,



| • | the firewall uses the hardware QoS limit and set it to 60,000 Mbps in PAN-OS 7.1.16 and later releases; and 16,000 in PAN-OS 7.1.15 and earlier releases. Or |
| --- | --- |






| • | the firewall uses the software QoS limit which varies and the QoS behavior is not guaranteed for the [legacy QoS](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/quality-of-service/configure-lockless-qos). |
| --- | --- |




 The **Egress Max** for clear text or tunneled traffic must be less than or equal to the **Egress Max** for the physical interface.




 Add





| • | Click **Add** on the **Clear Text Traffic** tab to define additional granularity to the treatment of clear text traffic. Click individual entries to configure the following settings: |
| --- | --- |






| ◦ | **Name**—Enter a name to identify these settings. |
| --- | --- |






| ◦ | **QoS Profile**—Select the QoS profile to apply to the specified interface and subnet. For instructions on defining QoS profiles, refer to [Network > Network Profiles > QoS](network-network-profiles-qos.html#ID0EY3MW). |
| --- | --- |






| ◦ | **Source Interface**—Select the firewall interface. |
| --- | --- |






| ◦ | **Destination interface**—(`PA-3200 Series, PA-5200 Series, PA-5400 Series, PA-7000 Series, and PA-7500 firewall only`) Select the destination interface for which the traffic is intended. |
| --- | --- |






| ◦ | **Source Subnet**—Select a subnet to restrict the settings to traffic coming from that source, or keep the default **any** to apply the settings to any traffic from the specified interface. |
| --- | --- |






| • | Click **Add** from the **Tunneled Traffic** tab to override the default profile assignment for specific tunnels and configure the following settings: |
| --- | --- |






| ◦ | **Tunnel Interface**—Select the tunnel interface on the firewall. |
| --- | --- |






| ◦ | **QoS Profile**—Select the QoS profile to apply to the specified tunnel interface. |
| --- | --- |



 For example, assume a configuration with two sites, one of which has a 45 Mbps connection and the other a T1 connection to the firewall. You can apply restrictive QoS settings to the T1 site so that the connection is not overloaded while also allowing more flexible settings for the site with the 45 Mbps connection.
 To remove a clear text or tunneled traffic entry, clear the entry and click **Delete**.
 If the clear text or tunneled traffic sections are left blank, the values specified in the Physical Interface tab’s Default Profile section are used.



 Parent topic
 [Network > QoS](network-qos.html#ID0EDUXV)