# Network Packet Broker Policy Optimizer Rule Usage

*Policies : Policies &gt; Network Packet Broker : Network Packet Broker Policy Optimizer Rule Usage*

Network Packet Broker Policy Optimizer Rule Usage

For Network Packet Broker policy rules, Policy Optimizer displays **Rule Usage** statistics that you can use to determine whether a policy is in use. You can view rule usage over different time frames and investigate why a rule hasn’t been used as expected and delete unused or outdated rules.



| Field | Description |
| --- | --- |
| Timeframe | The time period (number of days) for which data is displayed. |
| Usage | • |






| • | **Unused** rules that traffic has not matched over the specified **Timeframe**. |
| --- | --- |






| • | **Used** rules that traffic has matched over the specified **Timeframe**. |
| --- | --- |







 Exclude rules reset during the last “n” days


 Omits displaying rules for which you **Reset Rule Hit Counter** within the specified number of days (from 1-5,000 days). For example, this enables you to examine older rules that have not matched traffic over a particular **Timeframe** while excluding newer rules that may not have had time to match traffic.




 Name


 The name of the Network Packet Broker policy rule.




 Packet Broker





| • | **Profile**—The name of the Packet Broker profile associated with the policy rule. |
| --- | --- |






| • | **Traffic Type**—The type or types of traffic the rule controls (one or more of decrypted TLS, non-decrypted TLS, and non-TLS traffic). |
| --- | --- |







 Rule Usage





| • | **Hit Count**—The number of times that traffic matched the rule. |
| --- | --- |






| • | **Last Hit**—The most recent time that traffic matched the rule. |
| --- | --- |






| • | **First Hit**—The first time that traffic matched the rule. |
| --- | --- |






| • | **Reset Date**—The last date on which the rule’s hit counter was reset. |
| --- | --- |







 Modified


 The date and time that the rule was last modified.




 Created


 The date and time that the rule was created.



 Parent topic
 [Policies > Network Packet Broker](policies-network-packet-broker.html#ID0EACCQ)