# Managed WildFire Appliance Tasks

*Panorama Web Interface : Panorama &gt; Managed WildFire Clusters : Managed WildFire Appliance Tasks*

Managed WildFire Appliance Tasks

You can add, remove, and manage standalone WildFire appliances on a Panorama device. After you add standalone appliances, you can add them to WildFire appliance clusters as cluster nodes or you can manage them as individual standalone appliances.



| Task | Description |
| --- | --- |
| Add Appliance | **Add Appliance** to add one or more WildFire appliances to a Panorama appliance for centralized management. Enter the serial number of each WildFire appliance on a separate row (new line). Panorama can manage up to an aggregate total of 200 WildFire cluster nodes and standalone WildFire appliances. On each WildFire appliance you want to manage on Panorama, configure the IP address or FQDN of the Panorama appliance (Panorama server) and, optionally, the backup Panorama server using the following WildFire appliance CLI commands: set**deviceconfig system panorama-server **<ip-address | FQDN> **set deviceconfig system panorama-server-2 **<ip-address**| FQDN>** |
| Import Config | Select a WildFire appliance and **Import Config** to import (only) the running configuration for that appliance to Panorama. After you import the configuration, **Commit to Panorama** to save the imported candidate configuration in the Panorama running configuration. |
| Remove | If you no longer need to manage a WildFire appliance from Panorama, **Remove** the appliance and select **Yes** to confirm your action. After you remove an appliance from Panorama management, you can manage the appliance locally using its CLI. If needed, you can add the appliance back into the Panorama appliance at any time if you want to again manage the appliance centrally instead of locally. |


 Parent topic
 [Panorama > Managed WildFire Clusters](panorama-managed-wildfire-clusters.html#ID0EAGT2)