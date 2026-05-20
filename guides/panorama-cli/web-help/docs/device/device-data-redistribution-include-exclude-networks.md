# Device > Data Redistribution > Include/Exclude Networks

*Device : Device &gt; Data Redistribution : Device &gt; Data Redistribution &gt; Include/Exclude Networks*

Device > Data Redistribution > Include/Exclude Networks

Use the Include/Exclude Networks list to define the subnetworks that the redistribution agent includes or excludes when it redistributes the mappings.



| Task | Description |
| --- | --- |
| Add | To limit discovery to a specific subnetwork, **Add** a subnetwork profile and complete the following fields: • |






| • | **Enabled**—Select this option to enable inclusion or exclusion of the subnetwork for server monitoring. |
| --- | --- |






| • | **Discovery**—Select whether the User-ID agent will **Include** or **Exclude** the subnetwork. |
| --- | --- |






| • | **Network Address**—Enter the IP address range of the subnetwork. |
| --- | --- |



 The agent applies an implicit exclude all rule to the list. For example, if you add subnetwork 10.0.0.0/8 with the **Include** option, the agent excludes all other subnetworks even if you don’t add them to the list. Add entries with the **Exclude** option only if you want the agent to exclude a subset of the subnetworks you explicitly included. For example, if you add 10.0.0.0/8 with the **Include** option and add 10.2.50.0/22 with the **Exclude** option, the User-ID agent will perform discovery on all the subnetworks of 10.0.0.0/8 except 10.2.50.0/22, and will exclude all subnetworks outside of 10.0.0.0/8. If you add **Exclude** profiles without adding any **Include** profiles, the agent excludes all subnetworks, not just the ones you added.




 Delete


 To remove a subnetwork from the list, select and **Delete** it.
 **Tip**: To remove a subnetwork from the Include/Exclude Networks list without deleting its configuration, edit the subnetwork profile and clear **Enabled**.




 Custom Include/Exclude Network


 By default, the agent evaluates the subnetworks in the order you add them, from top-first to bottom-last. To change the evaluation order, click **Custom Include/Exclude Network Sequence**. You can then **Add**, **Delete**, **Move Up**, or **Move Down** the subnetworks to create a custom evaluation order.



 Parent topic
 [Device > Data Redistribution](device-data-redistribution.html#ID0EDBKY)