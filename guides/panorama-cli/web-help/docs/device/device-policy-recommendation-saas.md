# Device > Policy > Recommendation SaaS

*Device : Device &gt; Policy &gt; Recommendation SaaS*

## Device > Policy > Recommendation SaaS


View information on policy rule recommendations from Prisma SaaS and import policies to the firewall.



| Field | Description |
| --- | --- |
| Source User | The administrator who sent the policy rule recommendation to the firewall. |
| Source Device | The source device for the policy rule recommendation. |
| Location | The device group on Panorama where this policy rule recommendation is available. |
| Security Profiles | The security profile that the policy rule recommendation allows. |
| Applications | The applications or application groups that the policy rule recommendation allows. Click application group names to see the individual applications in that group. |
| Tags | The tags that identify the policy rule for the policy rule recommendation. Note:  |







 Description


 The description that the Prisma SaaS administrator gives to the policy rule recommendation.




 Active Recommendation


 Identifies whether this policy rule recommendation is



| • | active—Currently used in Prisma SaaS security policy. |
| --- | --- |






| • | removed—Removed from policy by the Prisma SaaS administrator. The firewall administrator can no longer import the policy rule and should **Remove Policy Mapping** from the firewall and then remove the Security policy rule from the firewall rulebase. Do not leave removed rules in the firewall rulebase. |
| --- | --- |







 Action


 Identifies the action for this policy rule recommendation, either allow or deny.




 New Update Available


 Identifies that there is a new update for the policy rule recommendation. Check the **Applications** column for the application changes. If you agree with the changes, select the rule and **Import Policy Rule** to update the policy. that you must import from Prisma SaaS. When you import the policy rule recommendation update, the firewall dynamically updates the security policy rule and its associated objects.




 Import Policy Rule


 Imports the selected policy rule recommendations from Prisma SaaS.




 Remove Policy Mapping


 If you no longer need the policy rule recommendation for a device, you can **Remove Policy Mapping** for it.
 Note:**You must also delete the policy rule corresponding to the policy rule recommendation.




 Sync Policy Rules


 If the SaaS administrator removes a policy recommendation and you **Remove Policy Mappings** for it and delete the Security policy rule, the removed rule may remain in the rule recommendation list if the information becomes out-of-sync. Sync Policy Rules** to synchronize it.



 Parent topic
 [Device](device.html#ID0EY2QW)