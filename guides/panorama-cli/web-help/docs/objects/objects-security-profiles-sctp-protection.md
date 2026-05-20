# Objects > Security Profiles > SCTP Protection

*Objects : Objects &gt; Security Profiles &gt; SCTP Protection*

## Objects > Security Profiles > SCTP Protection


Create a [Stream Control Transmission Protocol (SCTP)](https://docs.paloaltonetworks.com/service-providers/11-1/mobile-network-infrastructure-getting-started/sctp/configure-sctp-security) Protection profile to specify the ways in which you want the firewall to validate and filter SCTP chunks. You must first enable SCTP Security (**Device** > **Setup** > **Management** > **General Settings**) in order to see this profile type under Security Profiles. You can also limit the number of IP addresses per SCTP endpoint in a multi-homed environment and you can specify when the firewall logs SCTP events. After you create an SCTP Protection profile, you then need to apply the profile to a Security policy rule for a zone.


Firewall models that support SCTP security have a predefined SCTP Protection profile (default-ss7) available for you to use as is or you can clone the default-ss7 profile as the foundation for a new SCTP Protection profile. Select **Object** > **Security Profiles** > **SCTP Protection** and select **default-ss7** to see the Operation Codes that cause an alert for this predefined profile.



| SCTP Protection Profile Settings |
| --- |
| Name |
| Description |
| **SCTP Inspection** |
| Unknown Chunk |






| • | **alert**—Allow the packet to pass without modification and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). |
| --- | --- |






| • | **block**—Nullify the chunk before passing the packet and generate an SCTP log. |
| --- | --- |







 Chunk Flags


 Select the firewall action when it receives an SCTP packet with a chunk flag inconsistent with [RFC4960](https://www.rfc-editor.org/info/rfc4960):



| • | **allow** (default)—Allow the packet to pass without modification. |
| --- | --- |






| • | **alert**—Allow the packet to pass without modification and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). |
| --- | --- |






| • | **block**—Drop the packet and generate an SCTP log. |
| --- | --- |







 Invalid Length


 Select the firewall action when it receives an SCTP chunk with an invalid length:



| • | **allow** (default)—Allow the packet or chunk to pass without modification. |
| --- | --- |






| • | **block**—Drop the packet and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab. |
| --- | --- |







 IP address limit for multihoming


 Enter the maximum number of IP addresses you can configure for an SCTP endpoint before the firewall generates an alert message (range is 1 to 8; default is 4).
 SCTP multihoming is the ability of an endpoint to support more than one IP address for an association with a peer. If one path to an endpoint fails, SCTP selects one of the other destination IP addresses provided for that association.




 Log Settings


 Select any combination of settings to generate SCTP logs for allowed chunks, association start and end, and state failure events:



| • | **Log at Association Start** |
| --- | --- |






| • | **Log at Association End** |
| --- | --- |






| • | **Log Allowed Association Initialization Chunks** |
| --- | --- |






| • | **Log Allowed Heartbeat Chunks** |
| --- | --- |






| • | **Log Allowed Association Termination Chunks** |
| --- | --- |






| • | **Log All Control Chunks** |
| --- | --- |






| • | **Log State Failure Events** |
| --- | --- |



 For the firewall to store SCTP logs, you need to allocate SCTP log storage (see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)).




 **Filtering Options**




 **SCTP Filtering**




 Name


 Enter a name for the SCTP filter.




 PPID


 Specify a PPID for the SCTP filter:



| • | **any**—causes the firewall to take the Action you specify on all SCTP data chunks containing a PPID. |
| --- | --- |






| • | **3GPP PUA** |
| --- | --- |






| • | **3GPP RNA** |
| --- | --- |






| • | **LCS-AP** |
| --- | --- |






| • | **M2PA** |
| --- | --- |






| • | **M2UA** |
| --- | --- |






| • | **M3UA** |
| --- | --- |






| • | **NBAP** |
| --- | --- |






| • | **RUA** |
| --- | --- |






| • | **S1AP** |
| --- | --- |






| • | **SBc-AP** |
| --- | --- |






| • | **SUA** |
| --- | --- |






| • | **X2AP** |
| --- | --- |






| • | Enter a valid PPID value (one that isn’t present in the drop-down). For example, the PPID value for H.323 is 13. |
| --- | --- |



 Each SCTP filter can specify only one PPID, but you can specify multiple SCTP filters for an SCTP Protection profile.




 Action


 Specify the action the firewall takes on data chunks containing the specified PPID:



| • | **allow** (default)—Allow the chunk to pass without modification. |
| --- | --- |






| • | **alert**—Allow the chunk to pass without modification and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). |
| --- | --- |






| • | **block**—Nullify the chunk before passing the packet and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). |
| --- | --- |







 SCTP packets are matched to filters in the list from top to bottom. If you create more than one SCTP filter for a profile, the order of SCTP filters makes a difference. Select a filter and **Move Up** or **Move Down** to change its relative priority in the SCTP Filtering list.




 **Diameter Filtering**




 Name


 Enter a name for the Diameter filter.




 Action


 Specify the action the firewall takes on Diameter chunks containing the specified Diameter Application IDs, Command Code, and AVPs. If the inspected chunk includes the specified Diameter Application ID and any of the specified Diameter Command Codes and any of the specified Diameter AVPs, then:



| • | **allow** (default)—Allow the chunk to pass without modification. |
| --- | --- |






| • | **alert**—Allow the chunk to pass without modification and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). |
| --- | --- |






| • | **block**—Nullify the chunk before passing the packet and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). |
| --- | --- |







 Diameter Application ID


 Specify the Diameter Application ID for a chunk on which the firewall takes the specified action.



| • | **any** |
| --- | --- |






| • | **3GPP-Rx** |
| --- | --- |






| • | **3GPP-S6a/S6d** |
| --- | --- |






| • | **3GPP-S6c** |
| --- | --- |






| • | **3GPP-S9** |
| --- | --- |






| • | **3GPP-S13/S13** |
| --- | --- |






| • | **3GPP-Sh** |
| --- | --- |






| • | **Diameter Base Accounting** |
| --- | --- |






| • | **Diameter Common Messages** |
| --- | --- |






| • | **Diameter Credit Control** |
| --- | --- |



 Alternatively, you can enter a numerical value of a Diameter Application ID (the range is from 0 to 4,294,967,295). A Diameter filter can have only one Application ID.




 Diameter Command Code


 Specify the Diameter Command Codes for a chunk on which the firewall takes the specified action. Select **any**, select one of the Diameter Command Codes from the drop-down, or enter a specific value (the range is from 0 to 16,777,215). The drop-down includes only those command codes that apply to the Diameter Application ID selected. You can add multiple Diameter Command Codes in a Diameter filter.




 Diameter AVP


 Specify the Diameter Attribute-Value Pair (AVP) codes for a chunk on which the firewall takes the specified action. Enter one or more AVP codes or values (the range is from 1 to 16,777,215).




 If you create more than one Diameter filter for a profile, the order of Diameter filters makes a difference. Select a filter and **Move Up** or **Move Down** to adjust its relative priority in the Diameter Filtering list.




 **SS7 Filtering**




 Name


 Enter a name for the SS7 filter.




 Action


 Specify the action the firewall takes on SS7 chunks containing the specified SS7 filter elements. If the chunk being inspected contains the SCCP Calling Party SSN and any of the specified SCCP Calling Party Global Title (GT) values and any of the specified Operation Codes, then:



| • | **allow** (default)—Allow the chunk to pass without modification. |
| --- | --- |






| • | **alert**—Allow the chunk to pass without modification and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). |
| --- | --- |






| • | **block**—Nullify the chunk before passing the packet and generate an SCTP log (you need to allocate log storage for these logs—see Log Storage tab under Logging and Reporting Settings: [Device > Setup > Management](device-setup-management.html#ID0E1DTW)). |
| --- | --- |







 SCCP Calling Party SSN


 Specify the SCCP Calling Party SSN for a chunk on which the firewall takes the specified action. Select **any-map** or **Add** one of the SCCP Calling Party SSNs from the drop-down:



| • | **HLR(MAP)** |
| --- | --- |






| • | **VLR(MAP)** |
| --- | --- |






| • | **MSC(MAP)** |
| --- | --- |






| • | **EIR(MAP)** |
| --- | --- |






| • | **GMLC(MAP)** |
| --- | --- |






| • | **gsmSCF(MAP)** |
| --- | --- |






| • | **SIWF(MAP)** |
| --- | --- |






| • | **SGSN(MAP)** |
| --- | --- |






| • | **GGSN(MAP)** |
| --- | --- |






| • | **CSS(MAP)** |
| --- | --- |






| • | **CAP** |
| --- | --- |






| • | **INAP** |
| --- | --- |






| • | **SCCP Management** |
| --- | --- |



 An SS7 filter can have only one SCCP Calling Party SSN.




 SCCP Calling Party GT


 Specify the SCCP Calling Party GT value for a chunk on which the firewall takes the specified action. Select **Any** or **Add** a numerical value up to 15 digits. You can also enter a group of SCCP Calling Party GT values using a prefix. For example: 876534*. You can add multiple SCCP Calling Party GT values in an SS7 filter.
 For SCCP Calling Party SSN: **INAP** and **SCCP Management**, this option is disabled.




 Operation Code


 Specify the operation code for a chunk on which the firewall takes the specified action:
 For the following SCCP Calling Party SSNs, select **any**, or an operation code from the drop-down, or enter a specific value (range is 1 to 255):



| • | **HLR(MAP)** |
| --- | --- |






| • | **VLR(MAP)** |
| --- | --- |






| • | **MSC(MAP)** |
| --- | --- |






| • | **EIR(MAP)** |
| --- | --- |






| • | **GMLC(MAP)** |
| --- | --- |






| • | **gsmSCF(MAP)** |
| --- | --- |






| • | **SIWF(MAP)** |
| --- | --- |






| • | **SGSN(MAP)** |
| --- | --- |






| • | **GGSN(MAP)** |
| --- | --- |






| • | **CSS(MAP)** |
| --- | --- |



 For SCCP Calling Party SSN: **CAP**, enter a value (range is 1 to 255).
 For SCCP Calling Party SSN: **INAP** and **SCCP Management**, this option is disabled.
 You can add multiple operation codes in an SS7 filter.




 If you create more than one SS7 filter for a profile, the order of SS7 filters makes a difference. Select a filter and **Move Up** or **Move Down** to adjust its relative priority in the SS7 Filtering list.



 Parent topic
 [Objects](objects.html#ID0EL3RQ)