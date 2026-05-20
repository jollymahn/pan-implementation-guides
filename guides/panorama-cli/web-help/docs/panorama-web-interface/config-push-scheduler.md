# Scheduled Config Push Scheduler

*Panorama Web Interface : Panorama &gt; Scheduled Config Push : Scheduled Config Push Scheduler*

Scheduled Config Push Scheduler

Create a scheduled push to managed firewalls by setting the schedule parameters for when and how frequently a push occurs, which device groups and template configurations are pushed, and to which managed firewalls to push. Panorama performs the scheduled device group and template configuration push to managed firewalls if the **Device Groups** or **Templates** Last Commit Status is out-of-sync.



| Scheduled Configuration Push Settings | Description |
| --- | --- |
| Name | Name of the configuration push schedule. |
| Disabled | Check to disable the scheduled configuration push. Uncheck to re-enable the scheduled configuration push. |
| Type | Select **One-time schedule** to schedule a configuration push on a specific date and time. Select **Recurring schedule** to schedule a configuration push |
| Date | Date on which the next configuration push is scheduled to occur. |
| Time | Time (hh:mm:ss) at which the configuration push is scheduled to occur on the scheduled configuration push **Date.** |
| Recurrence | Whether the scheduled configuration push is a one time push (**None**) or a recurring scheduled push (**Monthly**, **Weekly**, or **Daily**). Default is **None**. |
| Push Scope Selection | |
| Device Groups | Select managed firewalls associated with one or more device groups. • |






| • | **Include Device and Network Templates** (enabled by default)—Pushes both the device group changes and the associated template changes to the selected firewalls and virtual systems in a single operation. To push these changes as separate operations, disable this option. |
| --- | --- |







 Templates


 Select managed firewalls associated with one or more template stacks.



| • | **Merge with Device Candidate Config** (enabled by default)—Merges the configuration changes pushed from Panorama with any pending configuration changes implemented locally on the target firewall. The push triggers the PAN-OS software to commit the merged changes. If you disable this selection, the commit excludes the candidate configuration on the firewall. |
| --- | --- |






 Parent topic
 [Panorama > Scheduled Config Push](panorama-scheduled-config-push.html#ID0EZEC3)