# Objects > GlobalProtect > HIP Profiles

*GlobalProtect : Objects &gt; GlobalProtect &gt; HIP Profiles*

## Objects > GlobalProtect > HIP Profiles


Select **Objects** > **GlobalProtect** > **HIP Profiles** to create the HIP profiles—a collection of HIP objects to be evaluated together either for monitoring or for Security policy enforcement—that you use to set up HIP-enabled security policies. When creating HIP profiles, you can combine the HIP objects you previously created (as well as other HIP profiles) by using Boolean logic, so that when a traffic flow is evaluated against the resulting HIP profile, it will either match or not match. Upon a match, the corresponding policy rule is enforced; if there is no match, the flow is evaluated against the next rule (as with any other policy matching criteria).


To create a HIP profile, click **Add**. The following table provides information on what to enter in the fields in the HIP Profile dialog. For more detailed information on setting up GlobalProtect and the workflow for creating HIP-augmented security policies, refer to [Configure HIP-Based Policy Enforcement](https://docs.paloaltonetworks.com/globalprotect/10-1/globalprotect-admin/host-information/configure-hip-based-policy-enforcement.html) in the GlobalProtect Administrator’s Guide.



| HIP Profile Settings | Description |
| --- | --- |
| Name | Enter a name for the profile (up to **31** characters). The name is case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Description | (`Optional`) Enter a description. |
| Shared | Select **Shared** to make the current HIP profile available to: • |






| • | All device groups on Panorama. If you clear this selection, the profile is available only to the device group selected in the **Device Group** drop-down on the **Objects** tab. |
| --- | --- |



 After you save the profile, you cannot change its **Shared** setting. Select **Objects** > **GlobalProtect** > **HIP Profiles** to view the current **Location**.




 Disable override (`Panorama only`)


 Controls override access to the HIP profile in device groups that are descendants of the **Device Group** selected in the **Objects** tab. Select this option if you want to prevent administrators from creating local copies of the profile in descendant device groups by overriding its inherited values. This option is cleared by default (override is enabled).




 Match


 Click **Add Match Criteria** to open the HIP Objects/Profiles Builder.
 Select the first HIP object or profile you want to use as match criteria and then add ( ) it to the **Match** text box on the HIP Objects/Profiles Builder dialog. Keep in mind that if you want the HIP profile to evaluate the object as a match only when the criteria in the object is not true for a flow, select **NOT** before adding the object.
 Continue adding match criteria as appropriate for the profile you are building, and ensure you select the appropriate Boolean operator (**AND** or **OR**) between each addition (and using the **NOT** operator when appropriate).
 To create a complex Boolean expression, you must manually add the parenthesis in the proper places in the **Match** text box to ensure that the HIP profile is evaluated using the intended logic. For example, the following expression indicates that the HIP profile will match traffic from a host that has either FileVault disk encryption (`Mac OS systems`) or TrueCrypt disk encryption (`Windows systems`) and also belongs to the required Domain and has a Symantec antivirus client installed:
 ((“MacOS” and “FileVault”) or (“Windows” and “TrueCrypt”)) and “Domain” and “SymantecAV”
 When you have finished adding the objects and profiles to the new HIP profile, click **OK**.



 Parent topic
 [GlobalProtect](globalprotect.html#ID0EDPF1)