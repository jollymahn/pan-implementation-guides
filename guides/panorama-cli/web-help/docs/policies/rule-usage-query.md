# Rule Usage Hit Count Query

*Policies : Rule Usage Hit Count Query*

## Rule Usage Hit Count Query




| • | **Policies** > **Rule Usage** |
| --- | --- |




Use the rule usage query to filter the selected rulebase over a specified period of time. The rule usage query allows you to quickly filter your policy rulebase to identify unused rules for removal so that you can reduce open entry points for an attacker. Click **PDF/CSV** to export the filtered rules in PDF or CSV format. To use the Rule Usage Hit Count Query, you must enable the **Policy Rule Hit Count** setting ([Device > Setup > Management](device-setup-management.html#ID0E1DTW)).


By default, the **Name**, **Location**, **Created**, **Modified**, and **Rule Usage** columns are displayed when you query the rule usage in your policy rule base. You can add more columns to view additional information about the policy rules.



| Task | Description |
| --- | --- |
| Hit Count | |
| Timeframe | Indicate the time frame to query the selected rulebase. Select from the predetermined time frames or set a **Custom** time frame. |
| Usage | Select the rule usage to query: **Any**, **Unused**, **Used**, or **Partially Used** (`Panorama only`). |
| Since | (`Custom Timeframe only`) Select the date and time from which to query the policy rulebase. |
| Exclude rules reset during the last _ days | Select this option to exclude any rules that were manually reset by a user within the specified number of days. |
| Actions | |
| Delete | Delete one or more selected policy rules. |
| Enable | Enable one or more selected policy rules when disabled. |
| Disable | Disable one or more selected policy rules. |
| PDF/CSV | Export the filtered policy rules currently displayed in PDF or CSV format. |
| Reset Rule Hit Counter | Reset the rule usage data for the **Selected rules** or for **All rules** that have been filtered and are currently displayed. |
| Tag | Apply one or more group tags to one or more selected policy rules. The group tag must already exist in order to tag the policy rule(s). |
| Untag | Remove one or more group tags from one or more selected policy rules. |


 Parent topic
 [Policies](policies.html#ID0EK5IO)