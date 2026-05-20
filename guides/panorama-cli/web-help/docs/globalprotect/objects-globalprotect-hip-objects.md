# Objects > GlobalProtect > HIP Objects

*GlobalProtect : Objects &gt; GlobalProtect &gt; HIP Objects*

## Objects > GlobalProtect > HIP Objects


Select **Objects** > **GlobalProtect** > **HIP Objects** to define objects for a host information profile (HIP). HIP objects provide the matching criteria for filtering the raw data reported by an app that you want to use to enforce policy. For example, if the raw host data includes information about several antivirus packages on an endpoint, you might be interested in a particular application because your organization requires that package. For this scenario, you create a HIP object to match the specific application you want to enforce.


The best way to determine the HIP objects you need is to determine how you will use the host information to enforce policy. Keep in mind that the HIP objects are merely building blocks that allow you to create the HIP profiles that your security policies can use. Therefore, you may want to keep your objects simple, matching on one thing, such as the presence of a particular type of required software, membership in a specific domain, or the presence of a specific endpoint OS. With this approach, you have the flexibility to create a very granular, HIP-augmented policy.


To create a HIP object, click **Add** to open the HIP Object dialog. For a description of what to enter in a specific field, see the tables that follow.




| • | [HIP Objects General Tab](hip-objects-general-tab.html#ID0EED51) |
| --- | --- |






| • | [HIP Objects Mobile Device Tab](hip-objects-mobile-device-tab.html#ID0EM651) |
| --- | --- |






| • | [HIP Objects Patch Management Tab](hip-objects-patch-management-tab.html#ID0EL261) |
| --- | --- |






| • | [HIP Objects Firewall Tab](hip-objects-firewall-tab.html#ID0EVRA2) |
| --- | --- |






| • | [HIP Objects Anti-Malware Tab](hip-objects-anti-malware-tab.html#ID0EC5A2) |
| --- | --- |






| • | [HIP Objects Disk Backup Tab](hip-objects-disk-backup-tab.html#ID0EGOB2) |
| --- | --- |






| • | [HIP Objects Disk Encryption Tab](hip-objects-disk-encryption-tab.html#ID0ES1B2) |
| --- | --- |






| • | [HIP Objects Data Loss Prevention Tab](hip-objects-data-loss-prevention-tab.html#ID0EEKC2) |
| --- | --- |






| • | [HIP Objects Certificate Tab](hip-objects-certificate-tab.html#ID0EVWC2) |
| --- | --- |






| • | [HIP Objects Custom Checks Tab](hip-objects-custom-checks-tab.html#ID0EIBD2) |
| --- | --- |




For more detailed information on creating HIP-augmented security policies, refer to [Configure HIP-Based Policy Enforcement](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/host-information/configure-hip-based-policy-enforcement.html) in the GlobalProtect Administrator’s Guide.

 Parent topic
 [GlobalProtect](globalprotect.html#ID0EDPF1)