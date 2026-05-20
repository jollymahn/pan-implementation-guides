# Panorama > Scheduled Config Push

*Panorama Web Interface : Panorama &gt; Scheduled Config Push*

## Panorama > Scheduled Config Push


To simplify the operation overhead of pushing configuration changes to managed firewalls, create a scheduled configuration push to automatically push changes to your managed firewalls on a specified date and time. You can configure a scheduled configuration push to occur either once or on a recurring schedule.


The following topics provide additional information about a scheduled config push.



| What do you want to know? | See: |
| --- | --- |
| Add a scheduled config push. | [Scheduled Config Push Scheduler](config-push-scheduler.html#ID0EHXC3) |
| View the scheduled config push history. | [Scheduled Config Push Execution History](scheduled-config-push-execution-history.html#ID0EHID3) |




| Scheduled Config Push Information | Description |
| --- | --- |
| Name | Name of the configuration push schedule. |
| Admin Scope | Add configuration changes made by other administrators to the scheduled configuration. The ability to push configuration changes for other administrators is defined in the Panorama admin role profile ([Panorama > Admin Roles](panorama-admin-roles.html#ID0ESHA3)). Click the <usernames> link to select the administrators and click **OK** to display and select configuration changes made by other administrators. Even if your role allows pushing the changes of other administrators, the push scope includes only your changes by default. |
| Disable | Displays if the scheduled configuration pushed is enabled (unchecked) or disabled (checked). |
| Date | Date (YYY/MM/DD) the next configuration push is scheduled to occur. |
| Recurrence | Whether the scheduled configuration push is a one time push or a recurring scheduled push (monthly, weekly, or daily). |
| Time | For a recurring schedule, the time (hh:mm) and day the configuration push is scheduled to occur. For a one-time schedule, the time (hh:mm) scheduled configuration push is scheduled to occur. |
| Status | Execution status of the last scheduled configuration push. Click to view the full execution history for all managed firewalls associated with the scheduled configuration push. |
| Devices | Managed firewalls impacted by the with the scheduled configuration push. Displays impacted firewalls based on device group and template changes. |


 Parent topic
 [Panorama Web Interface](panorama-web-interface.html#ID0EEWF2)