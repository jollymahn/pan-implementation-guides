# Network > Traffic Objects

*Network : Network &gt; Traffic Objects*

## Network > Traffic Objects

 This page helps you create a traffic object with specific cloud assets and map it to a zone. Attach the zone to a security policy to enforce the policy rules on the AI traffic sourced from this zone.

The following table describes traffic objects settings:



| Field | Description |
| --- | --- |
| Name | Enter a name for the traffic object. |
| Location | Select your [virtual systems](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/virtual-systems/virtual-systems-overview). |
| Description | Enter a description for the traffic object. |
| Type | Select the Type as K8s Cluster ID or VPC Endpoint ID. |
| Traffic Object ID | Enter the K8s Cluster ID or the VPC Endpoint ID. 1. |





| 2. | If the type is VPC Endpoint ID, the Traffic Object ID format is: vpc-xxxxxxxxxxxxxxxxx (17 alpha numeric characters) |
| --- | --- |






 Zone


 Select the internet or local zone, or create a new zone.
 Select the Logical Router from the list or create a new Logical router under Network > Routing > Logical Routers. (You don’t have to configure the Virtual router, as advanced routing is enabled by default).



 Parent topic
 [Network](network.html#ID0EFOJS)