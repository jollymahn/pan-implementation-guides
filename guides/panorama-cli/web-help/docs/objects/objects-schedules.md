# Objects > Schedules

*Objects : Objects &gt; Schedules*

## Objects > Schedules


By default, Security policy rules are always in effect (all dates and times). To limit a Security policy rule to specific times, you can define schedules, and then apply them to the appropriate policies. For each schedule, you can specify a fixed date and time range or a recurring daily or weekly schedule. To apply schedules to security policies, refer to [Policies > Security](policies-security.html#ID0ESNMO).

 Note:



| | When a Security policy rule is invoked by a defined schedule, only new sessions are affected by the applied Security policy rule. Existing sessions are not affected by the scheduled policy. |
| --- | --- |





| Schedule Settings | Description |
| --- | --- |
| Name | Enter a schedule name (up to 31 characters). This name appears in the schedule list when defining security policies. The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Shared (`Panorama only`) | Select this option if you want the schedule to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the schedule will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this schedule in device groups that inherit the schedule. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the schedule.




 Recurrence


 Select the type of schedule (**Daily**, **Weekly**, or **Non-Recurring**).




 Daily


 Click **Add** and specify a **Start Time** and **End Time** in 24-hour format (HH:MM).




 Weekly


 Click **Add**, select a **Day of Week**, and specify the **Start Time** and **End Time** in 24-hour format (HH:MM).




 Non-recurring


 Click **Add** and specify a **Start Date**, **Start Time**, **End Date**, and **End Time**.



 Parent topic
 [Objects](objects.html#ID0EL3RQ)