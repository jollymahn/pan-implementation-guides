# RIP Auth Profiles Tab

*Network : Network &gt; Virtual Routers : RIP : RIP Auth Profiles Tab*

RIP Auth Profiles Tab



| • | Network > Virtual Router > RIP > Auth Profiles |
| --- | --- |




By default, the firewall does not authenticate RIP messages between neighbors. To authenticate RIP messages between neighbors, create an authentication profile and apply it to an interface running RIP on a virtual router. The following table describes the settings for the **Auth Profiles** tab.



| RIP – Auth Profile Settings | Description |
| --- | --- |
| Profile Name | Enter a name for the authentication profile to authenticate RIP messages. |
| Password Type | Select the type of password (simple or MD5). • |






| • | If you select **MD5**, enter one or more password entries, including **Key-ID** (0-255), **Key**, and optional **Preferred** status. Click **Add** for each entry, and then click **OK**. To specify the key to be used to authenticate outgoing message, select the **Preferred** option. |
| --- | --- |






 Parent topic
 [RIP](rip.html#ID0EBHZT)