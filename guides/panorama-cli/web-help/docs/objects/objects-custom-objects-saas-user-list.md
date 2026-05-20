# Objects > Custom Objects > SaaS User List

*Objects : Objects &gt; Custom Objects &gt; SaaS User List*

## Objects > Custom Objects > SaaS User List


A SaaS User List is a custom object that is referenced by certain SaaS policy rules. When session tracking is enabled, SaaS Security Inline administrators can submit policy rule recommendations for individual users on an application tenant. This capability enables you to allow some application traffic for a tenant, while blocking traffic from specific user accounts on that tenant. For example, for a trusted vendor, you might allow traffic only for your organization's Gmail accounts, while blocking traffic for the vendor's Gmail accounts or personal Gmail accounts. These user-level policy recommendations are supported for a subset of applications that also support tenant-level policy rule recommendations.


When you import the policy rule recommendation, PAN-OS creates SaaS Tenant List and SaaS User List custom objects, which represent the tenants and users to which the policy rule will apply. These custom objects are shown on the SaaS Policy Recommendations page (Device > Policy Recommendation > SaaS). You typically do not create a SaaS User List manually.



| Custom SaaS Tenant List Settings | Description |
| --- | --- |
| Name | The name that identifies the SaaS User List. |
| Location | The device group where this SaaS User List is available. |
| Tenants | The tenants included in this SaaS User List. |

 Parent topic
 [Objects](objects.html#ID0EL3RQ)