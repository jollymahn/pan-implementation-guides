# Decrypt Mirror Interface

*Network : Network &gt; Interfaces : Decrypt Mirror Interface*

Decrypt Mirror Interface



| • | Network > Interfaces > Ethernet |
| --- | --- |




To use the Decryption Port Mirror feature, you must select the **Decrypt Mirror** interface type. This feature enables creating a copy of decrypted traffic from a firewall and sending it to a traffic collection tool that can receive raw packet captures—such as NetWitness or Solera—for archiving and analysis. Organizations that require comprehensive data capture for forensic and historical purposes or data leak prevention (DLP) functionality require this feature. To enable the feature, you must acquire and install the free license.

 Note:



| | Decryption port mirroring is not available on the VM-Series for public cloud platforms (AWS, Azure, Google Cloud Platform), VMware NSX, and Citrix SDX. |
| --- | --- |




To configure a decrypt mirror interface, click the name of an Interface (ethernet1/1, for example) that is not configured and specify the following information.



| Decrypt Mirror Interface Settings | Description |
| --- | --- |
| Interface Name | The interface name is predefined and you cannot change it. |
| Comment | Enter an optional description for the interface. |
| Interface Type | Select **Decrypt Mirror**. |
| Link Speed | Select the interface speed in Mbps (**10**, **100**, or **1000**), or select **auto** to have the firewall automatically determine the speed. |
| Link Duplex | Select whether the interface transmission mode is full-duplex (**full**), half-duplex (**half**), or negotiated automatically (**auto**). |
| Link State | Select whether the interface status is enabled (**up**), disabled (**down**), or determined automatically (**auto**). |


 Parent topic
 [Network > Interfaces](network-interfaces.html#ID0EUKKS)