# Monitor > Automated Correlation Engine > Correlated Events

*Monitor : Monitor &gt; Automated Correlation Engine : Monitor &gt; Automated Correlation Engine &gt; Correlated Events*

Monitor > Automated Correlation Engine > Correlated Events

Correlated events expand the threat detection capabilities on the firewall and Panorama; the correlated events gather evidence of suspicious or unusual behavior of users or hosts on the network.


The correlation object makes it possible to pivot on certain conditions or behaviors and trace commonalities across multiple log sources. When the set of conditions specified in a correlation object are observed on the network, each match is logged as a correlated event.


The correlated event includes the details listed in the following table.



| Field | Description |
| --- | --- |
| Match Time | The time the correlation object triggered a match. |
| Update Time | The timestamp when the match was last updated. |
| Object Name | The name of the correlation object that triggered the match. |
| Source Address | The IP address of the user from whom the traffic originated |
| Source User | The user and user group information from the directory server, if User-ID™ is enabled. |
| Severity | A rating that classifies the risk based on the extent of damage caused. |
| Summary | A description that summarizes the evidence gathered on the correlated event. |
| Host ID | The Host ID of the device. To add a device to the quarantine list (**Device** > **Device Quarantine**), click the down arrow next to the device’s **Host ID** and select **Block Device** in the pop-up window that displays. |



To view the detailed log view, click Details ( ) for an entry. The detailed log view includes all the evidence for a match:



| Tab | Description |
| --- | --- |
| Match Information | **Object Details**—Presents information on the correlation object that triggered the match. For information on correlation objects, see [Monitor > Automated Correlation Engine > Correlation Objects](monitor-automated-correlation-engine-correlation-objects.html#ID0EW4KM). |
| **Match Details**—A summary of the match details that includes the match time, last update time on the match evidence, severity of the event, and an event summary. | |
| Match Evidence | This tab includes all the evidence that corroborates the correlated event. It lists detailed information on the evidence collected for each session. |



See a graphical display of the information in the **Correlated Events** tab, see the Compromised Hosts widget on the **ACC** > **Threat Activity** tab. In the Compromised Hosts widget, the display is aggregated by source user and IP address and sorted by severity.


To configure notifications when a correlated event is logged, go to the **Device** > **Log Settings** or **Panorama** > **Log Settings** tab.

 Parent topic
 [Monitor > Automated Correlation Engine](monitor-automated-correlation-engine.html#ID0ESMKM)