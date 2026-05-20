# GlobalProtect Portals Agent Config Selection Criteria Tab

*GlobalProtect : Network &gt; GlobalProtect &gt; Portals : GlobalProtect Portals Agent Tab : GlobalProtect Portals Agent Config Selection Criteria Tab*

GlobalProtect Portals Agent Config Selection Criteria Tab



| • | **Network** > **GlobalProtect** > **Portals** > <portal-config> > **Agent** > <agent-config> > **Config Selection Criteria** |
| --- | --- |




Select the **Config Selection Criteria** tab to configure the matching criteria used to identify the endpoint type in deployments with both managed and unmanaged endpoints. The portal can push specified configurations to the endpoint based on the endpoint type.



| GlobalProtect Portal Config Selection Criteria Settings | Description |
| --- | --- |
| `User/User Group tab` | |
| OS | **Add** one or more endpoint operating system (OS) to specify which endpoints receive this configuration. The portal automatically learns the OS of the endpoint and incorporates details for that OS in the client configuration. You can select **Any** OS or a specific OS (**Android**, **Chrome**, **iOS**, **IoT**, **Linux**, **Mac**, **Windows**, or **WindowsUWP**). |
| User/User Group | **Add** the specific users or user groups to which this configuration applies. Note:  |



 To deploy this configuration to all users, select **any** from the **User/User Group** drop-down. To deploy this configuration only to users with GlobalProtect apps in pre-logon mode, select **pre-logon** from the **User/User Group** drop-down.




 `Device Checks`




 Machine account exists with device serial number


 Configure matching criteria based on whether the endpoint serial number exists in the Active Directory.




 Certificate Profile


 Select the certificate profile that the GlobalProtect portal uses to match the machine certificate sent by the GlobalProtect app.




 `Custom Checks`




 Custom Checks


 Select this option to define custom host information to match.




 Registry Key


 To check Windows endpoints for a specific registry key, **Add** the **Registry Key** for which to match. To match only the endpoints that lack the specified registry key or key value, enable the **Key does not exist or match the specified value data** option. To match on specific values, **Add** the **Registry Value** and **Value Data**. To match endpoints that do not have the specified registry value, select **Negate**.When you select the **Negate** option, you must leave the **Value Data** field empty.You can select the **Negate** option for a Registry Value in Custom Checks in the GlobalProtect Portal that does not have the specified registry value (matching the absence of registry value).
 Note:



| | If you configure a registry value with the **Negate** option and leave the **Value Data** field empty, the **Negate** works on the registry value.**Negate** option and **Value Data** match are mutually exclusive and you cannot configure **Value Data** and **Negate** option together. |
| --- | --- |







 Plist


 To check macOS endpoints for a specific entry in the property list (plist), **Add** the **Plist** name. To match only the endpoints that do not have the specified plist, enable the **Plist does not exist** option. To match on specific key-value pairs within the plist, **Add** the **Key** and corresponding **Value**. To match endpoints that explicitly do not have the specified key or value, select **Negate**.



 Parent topic
 [GlobalProtect Portals Agent Tab](globalprotect-portals-agent-configuration-tab.html#ID0E2TI1)