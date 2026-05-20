# Managed WildFire Cluster Tasks

*Panorama Web Interface : Panorama &gt; Managed WildFire Clusters : Managed WildFire Cluster Tasks*

Managed WildFire Cluster Tasks

You can create and remove WildFire appliance clusters from Panorama. Additionally, you can save configuration time when you import configurations from one cluster to another.



| Task | Description |
| --- | --- |
| Create Cluster | As needed, **Create Cluster**, enter a name for the new cluster, and then click **OK**. Existing clusters that you configured locally and added to Panorama by adding the individual WildFire appliance nodes are listed along with their WildFire nodes and node roles (**Panorama** > **Managed WildFire Appliances**). The cluster name must be a valid subdomain name that begins with a lowercase character or number and that can contain hyphens only when they are not the first or last character in the cluster name—no spaces or other characters are allowed. The maximum length of a cluster name is 63 characters. After you create a cluster, you can add managed WildFire appliances to the cluster and manage them on Panorama. When you add a WildFire appliance to Panorama, you automatically register the appliance with Panorama. You can create a maximum of 10 managed WildFire clusters on Panorama and each cluster can have up to 20 WildFire appliance nodes. Panorama can manage up to an aggregate total of 200 standalone appliances and cluster nodes. |
| Import Cluster Config | **Import Cluster Config** to import an existing cluster configuration. If you select a cluster before you **Import Cluster Config**, the **Controller** and **Cluster** are automatically populated with the appropriate information for the selected cluster. If you do not select a cluster before you **Import Cluster Config**, then you must select the **Controller** and the **Cluster** populates automatically based on the Controller node you select. After you import the configuration, **Commit to Panorama** to save the imported candidate configuration in the Panorama running configuration. |
| Remove From Panorama | If you no longer need to manage a WildFire cluster from Panorama, **Remove From Panorama** and select **Yes** to confirm your action. After you remove a cluster from Panorama management, you can manage the cluster locally from a Controller node. You can add the cluster back in to the Panorama appliance at any time if you want to again manage the cluster centrally instead of locally. |
| Encrypt WildFire Cluster Appliance-to-Appliance Communications | To encrypt data communication between WildFire appliances in a cluster, **Enable** encryption under **Secure Cluster Communication**. WildFire uses either a predefined certificate or a custom certificate to communicate between appliances. Custom certificates are only used when you **Customize Secure Server Communication** and enable **Custom Certificate Only**. Encryption is required for WildFire clusters to operate in FIPS-CC mode. Custom certificates used in FIPS-CC mode must meet FIPS-CC requirements. After you enable secure cluster communication, you can add additional managed WildFire appliances to the cluster. Newly added appliances automatically use the secure cluster communication settings. |


 Parent topic
 [Panorama > Managed WildFire Clusters](panorama-managed-wildfire-clusters.html#ID0EAGT2)