# VPN Session Settings

*Device : Device &gt; Setup &gt; Session : VPN Session Settings*

VPN Session Settings

Select **Session**, and in VPN Session Settings, configure global settings related to the firewall establishing a VPN session. The following table describes the settings.



| VPN Session Settings | Description |
| --- | --- |
| Cookie Activation Threshold | Specify a maximum number of IKEv2 half-open IKE SAs allowed per firewall, above which cookie validation is triggered. When the number of half-open IKE SAs exceeds the Cookie Activation Threshold, the Responder will request a cookie, and the Initiator must respond with an IKE_SA_INIT containing a cookie. If the cookie validation is successful, another SA session can be initiated. A value of 0 means that cookie validation is always on. The Cookie Activation Threshold is a global firewall setting and should be lower than the Maximum Half Opened SA setting, which is also global (range is 0 to 65535; default is 500). |
| Maximum Half Opened SA | Specify the maximum number of IKEv2 half-open IKE SAs that Initiators can send to the firewall without getting a response. Once the maximum is reached, the firewall will not respond to new IKE_SA_INIT packets (range is 1 to 65535; default is 65535). |
| Maximum Cached Certificates | Specify the maximum number of peer certificate authority (CA) certificates retrieved via HTTP that the firewall can cache. This value is used only by the IKEv2 Hash and URL feature (range is 1 to 4000; default is 500). |


 Parent topic
 [Device > Setup > Session](device-setup-session.html#ID0EBWRX)