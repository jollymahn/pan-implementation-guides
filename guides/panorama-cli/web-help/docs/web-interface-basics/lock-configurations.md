# Lock Configurations

*Web Interface Basics : Lock Configurations*

## Lock Configurations


To help you coordinate configuration tasks with other firewall administrators during concurrent login sessions, the web interface enables you to [apply a configuration or commit lock](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/use-the-web-interface/manage-locks-for-restricting-configuration-changes) so that other administrators cannot change the configuration or commit changes until the lock is removed.


At the top right of the web interface, a locked padlock ( ) indicates that one or more locks are set (with the number of locks in parentheses); an unlocked padlock ( ) indicates that no locks are set. Clicking either padlock opens the Locks dialog, which provides the following options and fields.

 Note:



| | To configure the firewall to automatically set a commit lock whenever an administrator changes the candidate configuration, select **Device** > **Setup** > **Management**, edit the General Settings, enable **Automatically Acquire Commit Lock**, and then click **OK** and **Commit**. |
| --- | --- |



 When you revert changes (**Config** > **Revert Changes**), the firewall automatically locks the candidate and running configuration so that other administrators cannot edit settings or commit changes. After completing the revert process, the firewall automatically removes the lock.


| Field/Button | Description |
| --- | --- |
| Admin | The username of the administrator who set the lock. |
| Location | On a firewall with more than one virtual system (vsys), the scope of the lock can be a specific vsys or the Shared location. |
| Type | The lock type can be: • |






| • | **Commit Lock**—Blocks other administrators from committing changes made to the candidate configuration. The commit queue does not accept new commits until all locks are released. This lock prevents collisions that can occur when multiple administrators make changes during concurrent login sessions and one administrator finishes and initiates a commit before the other administrators have finished. The firewall automatically removes the lock after completing the commit for which the administrator set the lock. A superuser or the administrator who set the lock can also manually remove it. |
| --- | --- |







 Comment


 Enter up to 256 characters of text. This is useful for other administrators who want to know the reason for the lock.




 Created At


 The date and time when an administrator set the lock.




 Logged In


 Indicates whether the administrator who set the lock is currently logged in.




 Take a Lock


 To set a lock, **Take a Lock**, select the **Type**, select the **Location** (`multiple virtual system firewalls only`), enter optional **Comments**, click **OK**, and then **Close**.




 Remove Lock


 To release a lock, select it, **Remove Lock**, click **OK**, and then **Close**.



 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)