# HIP Objects Custom Checks Tab

*GlobalProtect : Objects &gt; GlobalProtect &gt; HIP Objects : HIP Objects Custom Checks Tab*

HIP Objects Custom Checks Tab



| • | **Objects** > **GlobalProtect** > **HIP Objects** > <hip-object> > **Custom Checks** |
| --- | --- |




Select the **Custom Checks** tab to enable HIP matching on any custom checks you have defined on the GlobalProtect portal. For details on adding the custom checks to the HIP collection, see [Network > GlobalProtect > Portals](network-globalprotect-portals.html#ID0EJ3F1).



| HIP Object Custom Checks Settings | Description |
| --- | --- |
| Custom Checks | Select **Custom Checks** to enable matching on custom checks you defined on the GlobalProtect portal. |
| Process List | To check the host system for a specific process, click **Add** and then enter the process name. By default, the app checks for running processes; if you want to see if a specific process is not running, clear the **Running** selection. Processes can be operating system level processes or user-space application processes. |
| Registry Key | To check Windows hosts for a specific registry key, click **Add** and enter the **Registry Key** to match. To match only the hosts that lack the specified registry key or the key’s value, mark the **Key does not exist or match the specified value data** box. To match on specific values, click **Add** and then enter the **Registry Value** and **Value Data**. To match hosts that explicitly do not have the specified value or value data, select **Negate**. Click **OK** to save the settings. |
| Plist | To check Mac hosts for a specific entry in the property list (plist), click **Add** and enter the **Plist** name. To match only the hosts that do not have the specified plist, select **Plist does not exist**. To match on specific key-value pair within the plist, click **Add** and then enter the **Key** and the corresponding **Value** to match. To match hosts that explicitly do not have the specified key or value, select **Negate**. Click **OK** to save the settings. |


 Parent topic
 [Objects > GlobalProtect > HIP Objects](objects-globalprotect-hip-objects.html#ID0EFM41)