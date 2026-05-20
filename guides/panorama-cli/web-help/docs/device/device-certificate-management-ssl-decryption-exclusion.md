# Device > Certificate Management > SSL Decryption Exclusion

*Device : Device &gt; Certificate Management &gt; SSL Decryption Exclusion*

## Device > Certificate Management > SSL Decryption Exclusion


View and manage SSL [decryption exclusions](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/decryption-exclusions). There are two types of decryption exclusions, predefined exclusions and custom exclusions:




| • | Predefined decryption exclusions allow applications and services that might break when the firewall decrypts them to remain encrypted. Palo Alto Networks defines the predefined decryption exclusions and delivers updates and additions to the predefined exclusions list at regular intervals as part of the applications and threats content update. Predefined exclusions are enabled by default, but you can choose to disable the exclusion as needed. |
| --- | --- |






| • | You can create custom decryption exclusions to exclude server traffic from decryption. All traffic originating from or destined to the targeted server remains encrypted. |
| --- | --- |



 Tip:
 You can also [exclude traffic from decryption](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/decryption-exclusions) based on application, source, destination, URL category, and service.

Use the settings on this page to [Modify or Add a Decryption Exclusion](device-certificate-management-ssl-decryption-exclusion.html#ID0E3NEZ) and to [Manage Decryption Exclusions](device-certificate-management-ssl-decryption-exclusion.html#ID0EVZEZ).



| SSL Decryption Exclusions Settings | Description |
| --- | --- |
| Modify or **Add** a Decryption Exclusion | |
| Hostname | Enter a **Hostname** to define a custom decryption exclusion. The firewall compares the hostname to the SNI requested by the client or to the CN presented in the server certificate. The firewall excludes sessions in which the server presents a CN that contains the defined domain from decryption. You can use asterisks (*) as wildcards to create decryption exclusions for multiple hostnames associated with a domain. Asterisks behave the same way that carets (^) behave for [URL category exceptions](https://docs.paloaltonetworks.com/advanced-url-filtering/administration/configuring-url-filtering/url-category-exceptions/guidelines-for-url-category-exceptions)—each asterisk controls one variable subdomain (label) in the hostname. This enables you to create both very specific and very general exclusions. For example: • |






| • | *.company.com matches tools.company.com but does not match eng.tools.company.com |
| --- | --- |






| • | *.*.company.com matches eng.tools.company.com but does not match eng.company.com |
| --- | --- |






| • | *.*.*.company.com matches corp.exec.mail.company.com but does not match corp.mail.company.com |
| --- | --- |






| • | mail.google.* matches mail.google.com but does not match mail.google.uk.com |
| --- | --- |






| • | mail.google.*.* matches mail.google.co.uk but does not match mail.google.com |
| --- | --- |



 To exclude video-stats.video.google.com from decryption but not video.google.com, add *.*.google.com to the SSL Decryption Exclusion list.
 Hostnames should be unique for each entry. If a predefined entry is delivered to the firewall that matches an existing custom entry, the custom entry takes precedence.
 You cannot edit the Hostname for a predefined decryption exclusion.




 Shared


 Select **Shared** to share a decryption exclusion across all virtual systems in a multiple virtual system firewall.
 While predefined decryption exclusions are shared by default, you can enable and disable both predefined and custom entries for a specific virtual system.




 Description


 (`Optional`) Describe the application that you are excluding from decryption, including why the application breaks when decrypted.




 Exclude


 Exclude the application from decryption. Disable this option to start decrypting an application that was previously excluded from decryption.




 Manage Decryption Exclusions




 Enable


 **Enable** one or more entries to exclude them from decryption.




 Disable


 **Disable** one or more predefined decryption exclusions.
 Because decryption exclusions identify applications that break when decrypted, disabling one of these entries will cause the application to be unsupported. The firewall will attempt to decrypt the application and the application will break. You can use this option if you want to ensure certain encrypted applications do not enter your network.




 Show obsoletes


 **Show obsoletes** to view predefined entries that Palo Alto Networks no longer defines as decryption exclusions.
 **More about obsolete entries:**
 Updates to predefined decryption exclusions (including the removal of a predefined entry) are delivered to the firewall as part of Applications and Threats content updates. Predefined entries with **Exclude from decryption** enabled are automatically removed from the list of SSL decryption exclusions when the firewall receives a content update that no longer includes that entry.
 However, predefined entries with **Exclude from decryption** disabled remain on the SSL decryption list even after the firewall receives a content update that no longer includes that entry. When you **Show obsoletes**, you will see these disabled predefined entries that are not currently being enforced; you can remove these entries manually as needed.




 Show Local Exclusion Cache


 **Show Local Exclusion Cache** displays the sites that the firewall automatically excluded from decryption because of technical circumstances that prevent decryption, such as pinned certificates, client authentication, or unsupported ciphers. The Local SSL Decryption Cache differs from the SSL Decryption Exclusion List (**Device** > **Certificate Management** > **SSL Decryption Exclusion**), which contains the sites that prevent decryption that Palo Alto Networks has identified and to which you can add permanent decryption exclusions that you choose to make. The the firewall populates the Local SSL Decryption Cache with locally discovered decryption exceptions, based on the settings of the Decryption profile associated with the Decryption policy rule that controls the traffic.
 Excluded sites remain in the local cache for 12 hours and then age out. Each exclusion entry includes information about the application, the server, the reason why the firewall automatically excluded the site from decryption, the Decryption profile applied to the traffic, and the Vsys.



 Parent topic
 [Device](device.html#ID0EY2QW)