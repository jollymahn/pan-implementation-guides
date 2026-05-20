# Enable SNMP Monitoring

*Device : Device &gt; Setup &gt; Operations : Enable SNMP Monitoring*

Enable SNMP Monitoring



| • | Device > Setup > Operations |
| --- | --- |




Simple Network Management Protocol (SNMP) is a standard protocol for monitoring the devices on your network. Select **Operations** to configure the firewall to use the SNMP version that your SNMP manager supports (SNMPv2c or SNMPv3). For a list of the MIBs that you must load into the SNMP manager so it can interpret the statistics it collects from the firewall, see [Supported MIBs](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/monitoring/snmp-monitoring-and-traps/supported-mibs.html). To configure the server profile that enables the firewall to communicate with the SNMP trap destinations on your network, see [Device > Server Profiles > SNMP Trap](device-server-profiles-snmp-trap.html#ID0E3WJZ). The SNMP MIBs define all SNMP traps that the firewall generates. An SNMP trap identifies an event with a unique Object ID (OID) and the individual fields are defined as a variable binding (varbind) list. Click **SNMP Setup** and specify the following settings to allow SNMP GET requests from your SNMP manager:



| Field | Description |
| --- | --- |
| Physical Location | Specify the physical location of the firewall. When a log or trap is generated, this information allows you to identify (in an SNMP manager) the firewall that generated the notification. |
| Contact | Enter the name or email address of the person responsible for maintaining the firewall. This setting is reported in the standard system information MIB. |
| Use Specific Trap Definitions | This option is selected by default, which means the firewall uses a unique OID for each SNMP trap based on the event type. If you clear this option, every trap will have the same OID. |
| Version | Select the SNMP version: **V2c** (default) or **V3**. Your selection controls the remaining fields that the dialog displays. |
| **For SNMP V2c** | |
| SNMP Community String | Enter the community string, which identifies an SNMP community of SNMP managers and monitored devices and also serves as a password to authenticate the community members to each other when they exchange SNMP get (statistics request) and trap messages. The string can have up to 127 characters, accepts all characters, and is case-sensitive. Fastpath:  Don’t use the default community string **public**. Because SNMP messages contain community strings in clear text, consider the security requirements of your network when defining community membership (administrator access). |
| **For SNMP V3** | |
| Name / View | You can assign a group of one or more views to the user of an SNMP manager to control which MIB objects (statistics) the user can get from the firewall. Each view is a paired OID and bitwise mask: the OID specifies a MIB and the mask (in hexadecimal format) specifies which objects are accessible within (include matching) or outside (exclude matching) that MIB. For example, if the **OID** is 1.3.6.1, the matching **Option** is set to **include** and the **Mask** is 0xf0, then the objects that the user requests must have OIDs that match the first four nodes (f = 1111) of 1.3.6.1. The objects don’t need to match the remaining nodes. In this example, 1.3.6.1.2 matches the mask and 1.4.6.1.2 doesn’t. For each group of views, click **Add**, enter a **Name** for the group, and then configure the following for each view you **Add** to the group: • |






| • | **OID**—Specify the OID of the MIB. |
| --- | --- |






| • | **Option**—Select the matching logic to apply to the MIB. |
| --- | --- |






| • | **Mask**—Specify the mask in hexadecimal format. |
| --- | --- |



 Tip:
 To provide access to all management information, use the top-level **OID** 1.3.6.1, set the **Mask** to 0xf0, and set the matching **Option** to **include**.




 Users


 SNMP user accounts provide authentication, privacy, and access control when firewalls forward traps and SNMP managers get firewall statistics. For each user, click **Add** and configure the following settings:



| • | **Users**—Specify a username to identify the SNMP user account. The username you configure on the firewall must match the username configured on the SNMP manager. The username can have up to 31 characters. |
| --- | --- |






| • | **View**—Assign a group of views to the user. |
| --- | --- |






| • | **Auth Password**—Specify the authentication password of the user. The firewall uses the password to authenticate to the SNMP manager when forwarding traps and responding to statistics requests. The password must be 8-256 characters and all characters are allowed. |
| --- | --- |






| • | **Priv Password**—Specify the privacy password of the user. The password must be 8-256 characters and all characters are allowed. |
| --- | --- |






| • | **Authentication Protocol—**The firewall uses Secure Hash Algorithm (SHA) to hash the password. |
| --- | --- |






| ◦ | **SHA-1**, **SHA-224**, **SHA-256**, **SHA-384**, **SHA-512** |
| --- | --- |






| • | **Privacy Protocol—**The firewall uses the password and Advanced Encryption Standard (AES) algorithm to encrypt SNMP traps and responses to statistics requests. |
| --- | --- |






| ◦ | **AES-128**, **AES-192**, **AES-256** |
| --- | --- |






 Parent topic
 [Device > Setup > Operations](device-setup-operations.html#ID0EE34W)