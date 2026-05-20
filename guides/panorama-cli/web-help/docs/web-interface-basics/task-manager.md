# Task Manager

*Web Interface Basics : Task Manager*

## Task Manager


Click **Tasks** at the bottom of the web interface to display the tasks that you, other administrators, or PAN‑OS initiated since the last firewall reboot (for example, manual commits or automatic FQDN refreshes). For each task, the Task Manager provides the information and [actions](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/use-the-web-interface/manage-and-monitor-administrative-tasks) described in the table below.

 Tip:
 Some columns are hidden by default. To display or hide specific columns, open the drop-down in any column header, select **Columns**, and select (display) or clear (hide) the column names.


| Field/Button | Description |
| --- | --- |
| | To filter the tasks, enter a text string based on a value in one of the columns and Apply Filter ( ). For example, entering edl will filter the list to display only EDLFetch (fetch external dynamic lists) tasks. To remove filtering, Remove Filter ( ). |
| Type | The type of task, such as log request, license refresh, or commit. If the information related to the task (such as warnings) is too long to fit in the Messages column, you can click the Type value to see all the details. |
| Status | Indicates whether the task is pending (such as commits with Queued status), in progress (such as log requests with Active status), completed, or failed. For commits in progress, the Status indicates the percentage of completion. |
| Job ID | A number that identifies the task. From the CLI, you can use the Job ID to see additional details about a task. For example, you can see the position of a commit task in the commit queue by entering: > show jobs id <job-id> |
| Start Time | The date and time when the task started. For commit tasks, the Start Time indicates when the commit was added to the commit queue. |
| Messages | Displays details about the task. If the entry indicates that there are too many messages, you can click the task Type to see the messages. For commit tasks, the Messages include the dequeued time to indicate when PAN-OS started performing the commit. To see the description an administrator entered for a commit, click **Commit Description**. For details, see [Commit Changes](commit-changes.html#ID0EMSAK). |
| Action | Click **x** to cancel a pending commit initiated by an administrator or PAN-OS. This button is available only to administrators who have one of the following predefined roles: superuser, device administrator, virtual system administrator, or Panorama administrator. |
| Admin | Displays the administrator that initiated the task. For automatic tasks, such as a License Refresh, the admin is system (`Panorama managed firewalls`) If a task is initiated by a Panorama administrator, the admin name is appended with Panorama. For example, Panorama-<admin>. |
| End Time | The date and time when the task finished. This column is hidden by default. |
| Show | Select the tasks you want to display: • |






| • | **All** tasks of a certain type (**Jobs**, **Reports**, or **Log Requests**) |
| --- | --- |






| • | All **Running** tasks (in progress) |
| --- | --- |






| • | All **Running** tasks of a certain type (**Jobs**, **Reports**, or **Log Requests**) |
| --- | --- |






| • | (`Panorama only`) Use the second drop-down to display the tasks for **Panorama** (default) or a specific managed firewall. |
| --- | --- |







 Clear Commit Queue


 Cancel all pending commits initiated by administrators or PAN-OS. This button is available only to administrators who have one of the following predefined roles: superuser, device administrator, virtual system administrator, or Panorama administrator.



 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)