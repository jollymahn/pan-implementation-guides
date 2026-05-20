# Objects > Security Profiles > AI Security

*Objects : Objects &gt; Security Profiles &gt; AI Security*

## Objects > Security Profiles > AI Security

 You can attach an AI security profile to a security policy rule if you want to monitor and detect AI specific threats in your cloud resources.
 An AI security profile helps you configure specific security settings for:



| • | AI application protection such as, URL categorization. |
| --- | --- |





| • | AI model protection against threats such as prompt injections. |
| --- | --- |





| • | AI data protection against threats such as, sensitive data leakage to and from AI models. |
| --- | --- |


 The following table describes the [AI Security Profile](https://docs.paloaltonetworks.com/ai-runtime-security/administration/prevent-network-security-threats/create-ai-security-profile) settings:


| Field | Description |
| --- | --- |
| Name | Enter a unique name for the AI security profile. |
| Description | Enter a description for the AI security profile. |
| Model Groups (tab): | Add a model group for customized protections on the AI model, AI application, and AI data. For details on the available protection settings, refer how to [Add a model group](https://docs.paloaltonetworks.com/ai-runtime-security/administration/prevent-network-security-threats/create-model-groups-for-customized-protections). Select Add to add a new model group: • |





| • | Target Models: Click Add. |
| --- | --- |


 Select a cloud provider and the AI models supported by the cloud provider.



| • | Access Control: Set the Access Control as Allow or Block for the model group. |
| --- | --- |





| • | ​​Configure the Protection Settings for the Request and Response traffic. |
| --- | --- |






 Advanced (tab):





| • | Max Inline Latency: Set the maximum allowed latency for inline threat detection. The latency range is between 1-300 seconds. |
| --- | --- |





| • | Inline Timeout Action: Specify the action to take if inline threat detection exceeds the Max Inline Latency: |
| --- | --- |





| ◦ | Allow |
| --- | --- |





| ◦ | Alert (Report threats asynchronously) |
| --- | --- |





| ◦ | Block |
| --- | --- |





 Parent topic
 [Objects](objects.html#ID0EL3RQ)