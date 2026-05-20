# Network > Routing > Logical Routers

*Network : Network &gt; Routing &gt; Logical Routers*

## Network > Routing > Logical Routers


The firewall requires a logical router to obtain routes to other subnets either using static routes that you manually define, or through participation in Layer 3 routing protocols (dynamic routes). Each Layer 3 interface, loopback interface, and VLAN interface defined on the firewall must be associated with a logical router. Each interface can belong to only one logical router.


The logical router is available after you enable **Advanced Routing** in the General Settings of **Device** > **Setup** > **Management** and then commit and reboot the firewall.


Defining a logical router requires that you add Layer 3 interfaces to the logical router and configure any combination of static routes and dynamic routing protocols, as required by your network. You can also configure other features, such as ECMP and BFD.



| What are you looking for? | See |
| --- | --- |
| Required elements of a logical router | [Logical Router General settings](network-routing-logical-routers-general.html#ID0E21WU) |
| Configure: | [Static Routes](network-routing-logical-routers-static.html#ID0ECIYU) [Filters](network-routing-routing-profiles-filters.html#ID0EXFJV) [OSPF](network-routing-logical-routers-ospf.html#ID0EFKZU) [OSPF Routing Profiles](network-routing-routing-profiles-ospf.html#ID0EHBFV) [OSPFv3](network-routing-logical-routers-ospfv3.html#ID0ES31U) [OSPFv3 Routing Profiles](network-routing-routing-profiles-ospfv3.html#ID0EGSGV) [BGP](network-routing-logical-routers-bgp.html#ID0ETH4U) [BGP Routing Profiles](network-routing-routing-profiles-bgp.html#ID0EBACV) [Multicast](network-routing-logical-routers-multicast.html#ID0EZR6U) [Multicast Routing Profiles](network-routing-routing-profiles-multicast.html#ID0ER1MV) [RIPv2](network-routing-logical-routers-ripv2.html#ID0EXO3U) [RIPv2 Routing Profiles](network-routing-routing-profiles-ripv2.html#ID0EDGIV) [BFD Routing Profiles](network-routing-routing-profiles-bfd.html#ID0EVSEV) |
| View information about a logical router. | [More Runtime Stats for a Logical Router](more-runtime-stats-for-a-logical-router.html#ID0EISTU) |


 Parent topic
 [Network](network.html#ID0EFOJS)