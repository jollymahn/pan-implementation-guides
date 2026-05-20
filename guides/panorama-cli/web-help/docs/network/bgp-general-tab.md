# BGP General Tab

*Network : Network &gt; Virtual Routers : BGP : BGP General Tab*

BGP General Tab



| • | Network > Virtual Router > BGP > General |
| --- | --- |




Use the following fields to configure general BGP settings.



| BGP General Settings | Configure In | Description |
| --- | --- | --- |
| Reject Default Route | **BGP** > **General** | Select to ignore any default routes that are advertised by BGP peers. |
| Install Route | Select to install BGP routes in the global routing table. | |
| Aggregate MED | Select to enable route aggregation even when routes have different Multi-Exit Discriminator (MED) values. | |
| Default Local Preference | Specifies a value that the firewall can use to determine preferences among different paths. | |
| AS Format | Select the 2-byte (default) or 4-byte format. This setting is configurable for interoperability purposes. | |
| Always Compare MED | Enable MED comparison for paths from neighbors in different autonomous systems. | |
| Deterministic MED Comparison | Enable MED comparison to choose between routes that are advertised by iBGP peers (BGP peers in the same autonomous system). | |
| Auth Profiles | **Add** a new auth profile and configure the following settings: • | **Profile Name**—Enter a name to identify the profile. |






| • | **Secret/Confirm Secret**—Enter and confirm a passphrase for BGP peer communications. |
| --- | --- |



 Delete ( ) profiles when you no longer need them.



 Parent topic
 [BGP](bgp.html#ID0EG4BU)