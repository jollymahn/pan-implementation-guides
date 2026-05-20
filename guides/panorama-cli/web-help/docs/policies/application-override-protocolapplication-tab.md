# Application Override Protocol/Application Tab

*Policies : Policies &gt; Application Override : Application Override Protocol/Application Tab*

Application Override Protocol/Application Tab

Select the **Protocol/Application** tab to define the protocol (TCP or UDP), port, and application that further defines the attributes of the application for the policy match.



| Field | Description |
| --- | --- |
| Protocol | Select the protocol (**TCP** or **UDP**) for which to allow an application override. |
| Port | Enter the port number (0 to 65535) or range of port numbers (port1-port2) for the specified destination addresses. Multiple ports or ranges must be separated by commas. |
| Application | Select the override application for traffic flows that match the above rule criteria. When overriding to a custom application, there is no threat inspection that is performed. The exception to this is when you override to a pre-defined application that supports threat inspection. To define new applications, refer to [Objects > Applications](objects-applications.html#ID0EOVWQ)). |


 Parent topic
 [Policies > Application Override](policies-application-override.html#ID0EXJHQ)