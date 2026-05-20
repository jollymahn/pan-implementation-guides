# Device > Setup > ACE

*Device : Device &gt; Setup &gt; ACE*

## Device > Setup > ACE


Enable or disable App-ID Cloud Engine (ACE) settings and settings related to SaaS Security Inline policy recommendations.



| ACE Settings | Description |
| --- | --- |
| ACE Settings | |
| Disable the App-ID Cloud Engine | Deselect this checkbox to enable ACE or select this checkbox to disable ACE. ACE is a service that enables the downloading of App-IDs for unknown SaaS applications from the cloud. ACE converts unknown applications to known applications, vastly increases the number of known App-IDs, speeds up the availability and delivery of new App-IDs, and dramatically increases visibility into applications. App-IDs make it possible to take action (enforce policy) on the SaaS apps you define in SaaS policy rule recommendations. Note:  |







 SaaS Inline Settings
 The SaaS Inline Settings are displayed only if your license includes SaaS Security Inline.
 For certain discovered applications, SaaS Security Inline, using information that PAN-OS writes to Strata Logging Service, can detect the specific application tenants that users are accessing. SaaS Security Inline displays these tenant details, and you can [submit policy rule recommendations at the tenant level](https://docs.paloaltonetworks.com/saas-security/saas-security-admin/saas-security-inline/remediate-risks-saas-security-inline/manage-saas-security-inline-policy/create-saas-policy-rule-recommendations). This tenant-level detection and control is available only for select applications.
 You can enable the following SaaS Security Inline settings to increase the amount of information that PAN-OS logs to Strata Logging Service. By logging this additional information, PAN-OS extends SaaS Security Inline's tenant-level detection and control capabilities.




 (`PAN-OS 11.2.3 and later releases`) Enable Additional HTTP Header Logging


 Select this checkbox to enable additional HTTP header logging. When you have enabled additional HTTP header logging, the firewall logs more information about applications to Strata Logging Service. This additional information enables SaaS Security Inline to detect the individual application tenants for more applications, including Microsoft Outlook, Microsoft OneNote, Dropbox, Microsoft Teams, and Windows Azure. For a full list of the applications that require additional header logging for tenant detection, refer to the [instructions on creating a policy recommendation in SaaS Security Inline](https://docs.paloaltonetworks.com/saas-security/saas-security-admin/saas-security-inline/remediate-risks-saas-security-inline/manage-saas-security-inline-policy/create-saas-policy-rule-recommendations).
 Because SaaS Security Inline is the only consumer of this information, and because you might not require tenant-level policy rules for the additional applications, additional header logging is disabled by default.




 (`PAN-OS 11.2.5 and later releases`) Enable Session Tracking


 Select this checkbox to enable session tracking. When enabled, PAN-OS logs additional user and tenant information to Strata Logging Service. For a subset of the applications that support tenant-level detection, the additional information provides granularity at the user account level. With session tracking enabled, SaaS Security Inline administrators can submit policy rule recommendations for individual user accounts on an application tenant.
 This capability lets you allow some application traffic for a tenant, while blocking traffic from specific user accounts on that tenant. For example, for a trusted vendor, you might allow traffic only for your organization's Gmail accounts, while blocking traffic for the vendor's Gmail accounts or personal Gmail accounts.
 When you import a policy recommendation that specifies tenant user accounts, PAN-OS creates the security policy rule for the recommendation. This security policy rule includes custom SaaS Users and SaaS Tenant objects that are referenced by the security policy rule. These custom objects represent the tenant user accounts. If session tracking is enabled, you can view the SaaS User and SaaS Custom objects under **Objects ** > **Custom Objects**, and on the SaaS tab for the security policy rule.



 Parent topic
 [Device](device.html#ID0EY2QW)