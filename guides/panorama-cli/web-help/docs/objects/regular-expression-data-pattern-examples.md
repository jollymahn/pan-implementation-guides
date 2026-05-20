# Regular Expression Data Pattern Examples

*Objects : Objects &gt; Custom Objects : Objects &gt; Custom Objects &gt; Data Patterns : Regular Expression Data Pattern Examples*

Regular Expression Data Pattern Examples

The following are examples of valid custom patterns:




| • | .*((Confidential)|(CONFIDENTIAL)) |
| --- | --- |






| ◦ | Looks for the word “Confidential” or “CONFIDENTIAL” anywhere |
| --- | --- |






| ◦ | “.*” at the beginning specifies to look anywhere in the stream |
| --- | --- |






| ◦ | Depending on the case-sensitivity requirements of the decoder, this may not match “confidential” (all lower case) |
| --- | --- |






| • | .*((Proprietary &amp Confidential)|(Proprietary and Confidential)) |
| --- | --- |






| ◦ | Looks for either “Proprietary & Confidential” or “Proprietary and Confidential” |
| --- | --- |






| ◦ | More precise than looking for “Confidential” |
| --- | --- |






| • | .*(Press Release).*((Draft)|(DRAFT)|(draft)) |
| --- | --- |






| ◦ | Looks for “Press Release” followed by various forms of the word draft, which may indicate that the press release isn't ready to be sent outside the company |
| --- | --- |






| • | .*(Trinidad) |
| --- | --- |






| ◦ | Looks for a project code name, such as “Trinidad” |
| --- | --- |



 Parent topic
 [Objects > Custom Objects > Data Patterns](objects-custom-objects-data-patterns.html#ID0EGCDR)