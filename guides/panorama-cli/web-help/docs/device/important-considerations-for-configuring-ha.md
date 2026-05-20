# Important Considerations for Configuring HA

*Device : Device &gt; High Availability : Important Considerations for Configuring HA*

Important Considerations for Configuring HA

The following are important considerations for configuring an HA pair.




| • | The subnet that is used for the local and peer IP should not be used anywhere else on the virtual router. |
| --- | --- |






| • | The OS and Content Release versions should be the same on each firewall. A mismatch can prevent peer firewalls from synchronizing. |
| --- | --- |






| • | The LEDs are green on the HA ports for the active firewall and amber on the passive firewall. |
| --- | --- |






| • | To compare the configuration of the local and peer firewalls, using the **Config Audit** tool on the **Device** tab by selecting the desired local configuration in the left selection box and the peer configuration in the right selection box. |
| --- | --- |






| • | Synchronize the firewalls from the web interface by clicking **Push Configuration** in the HA widget on the **Dashboard**. The configuration on the firewall from which you push the configuration overwrites the configuration on the peer firewall. To synchronize the firewalls from the CLI on the active firewall, use the command request high-availability sync-to-remote running-config. |
| --- | --- |



 Note:



| | In a High Availability (HA) active/passive configuration with firewalls that use 10 gigabit SFP+ ports, when a failover occurs and the active firewall changes to a passive state, the 10 gigabit Ethernet port is taken down and then brought back up to refresh the port, but does not enable transmit until the firewall becomes active again. If you have monitoring software on the neighboring device, it will see the port as flapping because it is going down and then up again. This is different behavior than the action with other ports, such as the 1 gigabit Ethernet port, which is disabled and still allows transmit, so flapping is not detected by the neighboring device. |
| --- | --- |



 Parent topic
 [Device > High Availability](device-high-availability.html#ID0EOYXX)