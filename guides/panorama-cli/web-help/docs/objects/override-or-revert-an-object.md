# Override or Revert an Object

*Objects : Move, Clone, Override, or Revert Objects : Override or Revert an Object*

Override or Revert an Object

In Panorama, you can nest device groups in a tree hierarchy of up to four levels. At the bottom level, a device group can have parent, grandparent, and great-grandparent device groups at successively higher levels—collectively called ancestors—from which the bottom-level device group inherits policies and objects. At the top level, a device group can have child, grandchild, and great-grandchild device groups—collectively called descendants. You can override an object in a descendant so that its values differ from those in an ancestor. This override capability is enabled by default. However, you cannot override shared or default (preconfigured) objects. The web interface displays the icon to indicate an object has inherited values and displays the icon to indicate an inherited object has overridden values.




| • | **Override an object**—Select the **Objects** tab, select the descendant **Device Group** that will have the overridden version, select the object, click **Override**, and edit the settings. You cannot override **Name** or **Shared** settings for an object. |
| --- | --- |






| • | **Revert an overridden object to its inherited values**—Select the **Objects** tab, select the **Device Group** that has the overridden version, select the object, click **Revert**, and click **Yes** to confirm the operation. |
| --- | --- |






| • | **Disable overrides for an object**—Select the **Objects** tab, select the **Device Group** where the object resides, click the object Name to edit it, select **Disable override**, and click **OK**. Overrides for that object are then disabled in all device groups that inherit the object from the selected **Device Group**. |
| --- | --- |






| • | **Replace all object overrides across Panorama with the values inherited from the Shared location or ancestor device groups**—Select **Panorama** > **Setup** > **Management**, edit the Panorama Settings, select **Ancestor Objects Take Precedence**, and click **OK**. You must then commit to Panorama and to the device groups containing overrides to push the inherited values. |
| --- | --- |



 Parent topic
 [Move, Clone, Override, or Revert Objects](move-clone-override-or-revert-objects.html#ID0EAFTQ)