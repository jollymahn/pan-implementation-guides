# Managed WildFire Cluster and Appliance Administration

*Panorama Web Interface : Panorama &gt; Managed WildFire Clusters : Managed WildFire Cluster and Appliance Administration*

Managed WildFire Cluster and Appliance Administration

Select **Panorama** > **Managed WildFire Clusters** and select a cluster to manage or select a WildFire appliance (**Panorama** > **Managed WildFire Appliances**) to manage a standalone appliance. The **Panorama** > **Managed WildFire Cluster** view lists cluster nodes (WildFire appliances that are members of the cluster) and standalone appliances so that you can add available appliances to a cluster. Because the cluster manages the nodes, selecting a cluster node provides only limited management capability.


Unless noted, the settings and descriptions in the following table apply to both WildFire clusters and WildFire standalone appliances. Information previously configured on a cluster or appliance is prepopulated. You must first commit changes and additions to the information on Panorama and then push the new configuration to the appliances.



| Setting | Description |
| --- | --- |
| General tab | |
| Name | The cluster or appliance **Name** or the appliance serial number. |
| Enable DNS (`WildFire clusters only`) | **Enable DNS** service for the cluster. |
| Register Firewall To | The domain name to which you register firewalls. Format must be wfpc.service.<cluster-name>.<domain>. For example, the default domain name is wfpc.service.mycluster.paloaltonetworks.com. |
| Content Update Server | Enter the **Content Update Server** location or use the default wildfire.paloaltonetworks.com so that the cluster or appliance receives content updates from the closest server in the Content Delivery Network infrastructure. Connecting to the global cloud gives you the benefit of accessing signatures and updates based on threat analysis from all sources connected to the cloud, instead of relying only on the analysis of local threats. |
| Check Server Identity | **Check Server Identity** to confirm the identity of the update server by matching the common name (CN) in the certificate with the IP address or FQDN of the server. |
| WildFire Cloud Server | Enter the global **WildFire Cloud Server** location or use the default wildfire.paloaltonetworks.com so that the cluster or appliance can send information to the closest server. You can choose whether to send information and what types of information to send to the global cloud (**WildFire Cloud Services**). |
| Sample Analysis Image | Select the VM image for the cluster or appliance to use for sample analysis (default is vm-5). You can [Get a Malware Test File (WildFire API)](https://docs.paloaltonetworks.com/wildfire/u-v/wildfire-api/get-wildfire-information-through-the-wildfire-api/get-a-malware-test-file-wildfire-api.html) to see the result of the sample analysis. |
| WildFire Cloud Services | If the cluster or appliance is connected to the global WildFire Cloud Server, you can choose whether to **Send Analysis Data**, **Send Malicious Samples**, **Send Diagnostics** to the global cloud or any combination of the three. You can also choose whether to perform a **Verdict Lookup** in the global cloud. Sending information to the global cloud benefits the entire community of WildFire users because the shared information increases the ability of every appliance to identify malicious traffic and prevent it from traversing the network. |
| Sample Data Retention | The number of days to retain benign or grayware samples and malicious samples: • |






| • | **Malicious** samples—Minimum is 1 and there is no maximum (indefinite); default is indefinite. |
| --- | --- |







 Analysis Environment Services


 **Environment Networking** enables virtual machines to communicate with the internet. You can select **Anonymous Networking** to make network communication anonymous but you must select **Environment Networking** before you can enable **Anonymous Networking**.
 Different network environments produce different types of analysis loads depending on whether more documents need to be analyzed or more executable files need to be analyzed. You can configure your Preferred Analysis Environment to allocate more resources to **Executables** or to **Documents**, depending on the needs of your environment. The **Default** allocation is balanced between **Executables** and **Documents**.
 The amount of available resources depends on how many WildFire nodes are in the cluster.




 Signature Generation


 Select whether you want the cluster or appliance to generate signatures for AV, DNS, URLs, or any combination of the three.




 Appliance tab




 Hostname
 (`Standalone WildFire appliance only`)


 Enter the hostname of the WildFire appliance.




 Panorama Server


 Enter the IP address or FQDN of the appliance or of the primary Panorama managing the cluster.




 Panorama Server 2


 Enter the IP address or FQDN of the appliance or of the backup Panorama managing the cluster.




 Domain


 Enter the domain name of the appliance cluster or appliance.




 Primary DNS Server


 Enter the IP address of the primary DNS Server.




 Secondary DNS Server


 Enter the IP address of the secondary DNS Server.




 Timezone


 Select the time zone to use for the cluster or appliance.




 Latitude
 (`Standalone WildFire appliance only`)


 Enter the latitude of the WildFire appliance.




 Longitude
 (`Standalone WildFire appliance only`)


 Enter the longitude of the WildFire appliance.




 Primary NTP Server


 Enter the IP address of the primary NTP Server and set the Authentication Type to **None** (default), **Symmetric Key**, or **Autokey**.
 Setting the Authentication Type to **Symmetric Key** reveals four more fields:



| • | **Key ID**—Enter the authentication key ID. |
| --- | --- |






| • | **Algorithm**—Set the authentication algorithm to **SHA1** or **MD5**. |
| --- | --- |






| • | **Authentication Key**—Enter the authentication key. |
| --- | --- |






| • | **Confirm Authentication Key**—Enter the authentication key again to confirm it. |
| --- | --- |







 Secondary NTP Server


 Enter the IP address of the secondary NTP Server and set the Authentication Type to **None** (default), **Symmetric Key**, or **Autokey**.
 Setting the Authentication Type to **Symmetric Key** reveals four more fields:



| • | **Key ID**—Enter the authentication key ID. |
| --- | --- |






| • | **Algorithm**—Set the authentication algorithm to **SHA1** or **MD5**. |
| --- | --- |






| • | **Authentication Key**—Enter the authentication key. |
| --- | --- |






| • | **Confirm Authentication Key**—Enter the authentication key again to confirm it. |
| --- | --- |







 Login Banner


 Enter a banner message that displays when users log in to the cluster or appliance.




 Logging tab (Includes System tab and Configuration tab)




 Add


 **Add** log forwarding profiles (**Panorama** > **Managed WildFire Clusters** > <cluster> > **Logging** > **System** or **Panorama** > **Managed WildFire Clusters** > <cluster> > **Logging** > **Configuration**) to forward:



| • | system or configuration logs as SNMP traps to SNMP trap receivers. |
| --- | --- |






| • | syslog messages to syslog servers. |
| --- | --- |






| • | email notifications to email servers. |
| --- | --- |






| • | HTTP requests to HTTP servers. |
| --- | --- |



 No other log types are supported (see [Device > Log Settings](device-log-settings.html#ID0ETQGZ)).
 The Log Forwarding profiles specify which logs to forward and to which destination servers. For each profile, complete the following:



| • | **Name**—A name that identifies the log settings (up to 31 characters) that consists of alphanumeric characters and underscores only—spaces and special characters are not allowed. |
| --- | --- |






| • | **Filter**—By default, the Panorama appliance forwards **All Logs** of the specified profile. To forward a subset of the logs, select a filter (**severity eq critical**, **severity eq high**, **severity eq informational**, **severity eq low**, or **severity eq medium**) or select **Filter Builder** to create a new filter. |
| --- | --- |






| • | **Description**—Enter a description (up to 1,023 characters) to explain the purpose of the profile. |
| --- | --- |







 Add > Filter > Filter Builder


 Use **Filter Builder** to create new log filters. Select **Create Filter** to construct filters and, for each query in a new filter, specify the following settings and then **Add** the query:



| • | **Connector**—Select the connector logic (**and** or **or**). Select **Negate** if you want to apply negation. For example, to avoid forwarding a subset of log descriptions, select **Description** as the Attribute, select **contains** as the Operator, and enter the description string as the Value to identify the description or descriptions that you don’t want to forward. |
| --- | --- |






| • | **Attribute**—Select a log attribute. The options vary by log type. |
| --- | --- |






| • | **Operator**—Select the criterion that determines how the attribute applies (such as **contains**). The options vary by log type. |
| --- | --- |






| • | **Value**—Specify the attribute value to match. |
| --- | --- |






| • | **Add**—Add the new filter. |
| --- | --- |



 To display or export logs that the filter matches, select **View Filtered Logs**.



| • | To find matching log entries, you can add artifacts to the search field, such as an IP address or a time range. |
| --- | --- |






| • | Select the time period for which you want to see logs: **Last 15 Minutes**, **Last Hour**, **Last 6 Hrs**, **Last 12 Hrs**, **Last 24 Hrs**, **Last 7 Days**, **Last 30 Days**, or **All** (default). |
| --- | --- |






| • | Use the options to the right of the time period drop-down to apply, clear, add, save, and load filters: |
| --- | --- |






| ◦ | **Apply filters** ( )—Display log entries that match the terms in the search field. |
| --- | --- |






| ◦ | **Clear filters** ( )—Clear the filter field. |
| --- | --- |






| ◦ | **Add a new filter** ( )—Define new search criteria (takes you to Add Log Filter, which is similar to create filters). |
| --- | --- |






| ◦ | **Save a filter** ( )—Enter a name for the filter and then click **OK**. |
| --- | --- |






| ◦ | **Use a saved filter** ( )—Add a saved filter to the filter field. |
| --- | --- |






| ◦ | **Export to CSV** ( )—Export logs to a CSV-formatted report and then **Download file**. By default, the report contains up to 2,000 lines of logs. To change the line limit for generated CSV reports, select **Device** > **Setup** > **Management** > **Logging and Reporting Settings** > **Log Export and Reporting** and enter a new **Max Rows in CSV Export** value. |
| --- | --- |



 You can change the number and order of entries displayed per page and you can use the paging controls at the bottom left of the page to navigate through the log list. Log entries are retrieved in blocks of 10 pages.



| • | **per page**—Use the drop-down to change the number of log entries per page (**20**, **30**, **40**, **50**, **75**, or **100**). |
| --- | --- |






| • | **ASC** or **DESC**—Select **ASC** to sort results in ascending order (oldest log entry first) or **DESC** to sort in descending order (newest log entry first). The default is **DESC**. |
| --- | --- |






| • | **Resolve Hostname**—Select to resolve external IP addresses to domain names. |
| --- | --- |






| • | **Highlight Policy Actions**—Specify an action and select to highlight log entries that match the action. The filtered logs are highlighted in the following colors: |
| --- | --- |






| ◦ | Green—Allow |
| --- | --- |






| ◦ | Yellow—Continue or override |
| --- | --- |






| ◦ | Red—Deny, drop, drop-icmp, rst-client, reset-server, reset-both, block-continue, block-override, block-url, drop-all, sinkhole |
| --- | --- |







 Delete


 Select and then **Delete** the log forwarding settings you want to remove from the System or Configuration log list.




 Authentication tab




 Authentication Profile


 Select a configured authentication profile to define the authentication service that validates the login credentials of the WildFire appliance or Panorama administrators.




 Failed Attempts


 Enter the number of failed login attempts that the WildFire appliance allows on the CLI before locking out the administrator (range is 0 to 10; default is 10). Limiting login attempts helps protect the WildFire appliance from brute force attacks. A value of 0 specifies unlimited login attempts.
 CAUTION:
 If you set the **Failed Attempts** to a value other than 0 but leave the **Lockout Time** at 0, then the administrator is indefinitely locked out until another administrator manually unlocks the locked-out administrator. If no other administrator has been created, you must reconfigure the **Failed Attempts** and **Lockout Time** settings on Panorama and push the configuration change to the WildFire appliance. To ensure that an administrator is never locked out, use the default (0) value for both **Failed Attempts** and **Lockout Time**.
 Fastpath:
 Set the number of **Failed Attempts** to 5 or fewer to accommodate a reasonable number of retries in case of typing errors, while preventing malicious systems from trying brute force methods to log in to the WildFire appliance.




 Lockout Time (min)


 Enter the number of minutes for which the WildFire appliance locks out an administrator from access to the CLI after reaching the **Failed Attempts** limit (range is 0 to 60; default is 5). A value of 0 means the lockout applies until another administrator manually unlocks the account.
 CAUTION:
 If you set the **Failed Attempts** to a value other than 0 but leave the **Lockout Time** at 0, then the administrator is indefinitely locked out until another administrator manually unlocks the locked-out administrator. If no other administrator has been created, you must reconfigure the **Failed Attempts** and **Lockout Time** settings on Panorama and push the configuration change to the WildFire appliance. To ensure that an administrator is never locked out, use the default (0) value for both **Failed Attempts** and **Lockout Time**.
 Fastpath:
 Set the **Lockout Time** to at least 30 minutes to prevent continuous login attempts from a malicious actor.




 Idle Timeout (min)


 Enter the maximum number of minutes without any activity on the CLI before an administrator is automatically logged out (range is 0 to 1,440; default is None). A value of 0 means that inactivity does not trigger an automatic logout.
 Fastpath:
 Set the **Idle Timeout** to 10 minutes to prevent unauthorized users from accessing the WildFire appliance if an administrator leaves a session open.




 Max Session Count


 Enter the number of active sessions the administrator can have open concurrently, The default is 0, which means that the WildFire appliance can have an unlimited number of concurrently active sessions.




 Max Session time


 Enter the number of minutes the administrator can be logged in before being automatically logged out. The default is 0, which means that the administrator can be logged in indefinitely even if idle.




 Local Administrators


 Add and configure new administrators for the WildFire appliance. These administrators are unique to the WildFire appliance are managed from this page (**Panorama** > **Managed WildFire Appliances** > **Authentication**).




 Panorama Administrators


 Import existing administrators configured on Panorama. These administrators are created on Panorama and imported into the WildFire appliance.




 Clustering tab (`Managed WildFire Clusters only`) and Interfaces tab (`Managed WildFire Appliances only`)
 You must add appliances to Panorama to manage interfaces and add appliances to clusters to manage node interfaces.




 Appliance
 (`Clustering tab only`)


 Select a cluster node to access the Appliance and Interfaces tabs for that node. The Appliance tab node information is prepopulated and not configurable except for the hostname. The Interfaces tab lists the node interfaces. Select an interface to manage it as described in:



| • | [Interface Name Management](managed-wildfire-cluster-and-appliance-administration.html#ID0EUM12) |
| --- | --- |






| • | [Interface Name Analysis Environment Network](managed-wildfire-cluster-and-appliance-administration.html#ID0EKD22) |
| --- | --- |






| • | [Interface Name Ethernet2](managed-wildfire-cluster-and-appliance-administration.html#ID0EGT22) |
| --- | --- |






| • | [Interface Name Ethernet3](managed-wildfire-cluster-and-appliance-administration.html#ID0EMT22) |
| --- | --- |







 Interface Name Management


 The management interface is Ethernet0. Configure or view management interface settings:



| • | **Speed and Duplex**—Select **auto-negotiate** (default), **10Mbps-half-duplex**, **10Mbps-full-duplex**, **100Mbps-half-duplex**, **100Mbps-full-duplex**, **1Gbps-half-duplex**, or **1Gbps-full-duplex**. |
| --- | --- |






| • | **IP Address**—Enter the interface IP address. |
| --- | --- |






| • | **Netmask**—Enter the interface netmask. |
| --- | --- |






| • | **Default Gateway**—Enter the IP address of the default gateway. |
| --- | --- |






| • | **MTU**—Enter the MTU in bytes (range is 576 to 1,500; default is 1,500). |
| --- | --- |






| • | **Management Services**—Enable the management services you want to support. You can support **Ping**, **SSH**, and **SNMP** services. |
| --- | --- |



 Configure proxy settings if you use a proxy server to connect to the Internet:



| • | **Server**—IP address of the proxy server. |
| --- | --- |






| • | **Port**—Port number configured on the proxy server to listen for Panorama device requests. |
| --- | --- |






| • | **User**—Username configured on the proxy server for authentication. |
| --- | --- |






| • | **Password** and **Confirm Password**—Password configured on the proxy server for authentication. |
| --- | --- |






| • | **Clustering Services** (`Clustering tab only`)—Select the HA service: |
| --- | --- |






| ◦ | **HA**—If there are two Controller nodes in the cluster, you can configure the management interface as an HA interface so that management information is available to both Controller nodes. If the cluster node you are configuring is the primary Controller node, mark it as the **HA** interface. |
| --- | --- |



 Depending on how you use the WildFire appliance Ethernet interfaces, you can, alternatively, configure Etherent2 or Ethernet3 as the HA and HA Backup interfaces on the primary and backup Controller nodes respectively. For example, you can use Ethernet 2 as the HA and HA Backup interface. The HA and HA Backup interfaces must be the same interface (management, Ethernet2, or Ethernet3) on the primary and backup Controller nodes. You cannot use Ethernet1 as the HA/HA Backup interface.



| ◦ | **HA Backup**—If the cluster node you are configuring is the backup Controller node, mark it as the **HA Backup** interface. |
| --- | --- |



 Specify IP addresses that are permitted on the interface:



| • | **Search box**—Enter search terms to filter the permitted IP address list. The search box indicates the number of IP addresses (items) in the list so you know how long the list is. After you enter search terms, apply the filter ( ) or clear the filter ( ) and enter a different set of terms. |
| --- | --- |






| • | **Add**—**Add** a permitted IP address. |
| --- | --- |






| • | **Delete**—Select and **Delete** the IP address or addresses you want to remove from management interface access. |
| --- | --- |







 Interface Name Analysis Environment Network


 Configure settings for the WildFire appliance cluster or standalone WildFire appliance analysis environment network interface (Ethernet1, also known as the VM interface):



| • | **Speed and Duplex**—Set to **auto-negotiate** (default), **10Mbps-half-duplex**, **10Mbps-full-duplex**, **100Mbps-half-duplex**, **100Mbps-full-duplex**, **1Gbps-half-duplex**, or **1Gbps-full-duplex**. |
| --- | --- |






| • | **IP Address**—Enter the interface IP address. |
| --- | --- |






| • | **Netmask**—Enter the interface netmask. |
| --- | --- |






| • | **Default Gateway**—Enter the IP address of the default gateway. |
| --- | --- |






| • | **MTU**—Enter the MTU in bytes (range is 576 to 1,500; default is 1,500). |
| --- | --- |






| • | **DNS Server**—Enter the DNS server IP address. |
| --- | --- |






| • | **Link State**—Set the interface link state to **Up** or **Down**. |
| --- | --- |






| • | Management Services—Enable **Ping** if you want the interface to support ping services. |
| --- | --- |



 Specify IP addresses that are permitted on the interface:



| • | **Search box**—Enter search terms to filter the permitted IP address list. The search box indicates the number of IP addresses (items) in the list so you know how long the list is. After you enter search terms, apply the filter ( ) or clear the filter ( ) and enter a different set of terms. |
| --- | --- |






| • | **Add**—**Add** a permitted IP address. |
| --- | --- |






| • | **Delete**—Select the IP address or IP addresses you want to remove from management interface access and then **Delete**. |
| --- | --- |







 Interface Name Ethernet2
 Interface Name Ethernet3


 You can set the same parameters for the Ethernet2 and Ethernet3 interfaces:



| • | **Speed and Duplex**—Set to **auto-negotiate** (default), **10Mbps-half-duplex**, **10Mbps-full-duplex**, **100Mbps-half-duplex**, **100Mbps-full-duplex**, **1Gbps-half-duplex**, or **1Gbps-full-duplex**. |
| --- | --- |






| • | **IP Address**—Enter the interface IP address. |
| --- | --- |






| • | **Netmask**—Enter the interface netmask. |
| --- | --- |






| • | **Default Gateway**—Enter the IP address of the default gateway. |
| --- | --- |






| • | **MTU**—Enter the MTU in bytes (range is 576 to 1,500; default is 1,500). |
| --- | --- |






| • | Management Services—Enable **Ping** if you want the interface to support ping services. |
| --- | --- |






| • | **Clustering Services**—Select cluster services: |
| --- | --- |






| ◦ | **HA**—If there are two Controller nodes in the cluster, you can configure the Ethernet2 or the Ethernet3 interface as an HA interface so that management information is available to both Controller nodes. If the cluster node you are configuring is the primary Controller node, mark it as the **HA** interface. |
| --- | --- |



 Depending on how you use the WildFire appliance Ethernet interfaces, alternatively, you can configure the management interface (Ethernet1) as the HA and HA Backup interfaces on the primary and backup Controller nodes, respectively. The HA and HA Backup interfaces must be the same interface (management, Ethernet2, or Ethernet3) on the primary and backup Controller nodes. You cannot use Ethernet1 as the HA/HA Backup interface.



| ◦ | **HA Backup**—If the cluster node you are configuring is the backup Controller node, mark it as the **HA Backup** interface. |
| --- | --- |






| ◦ | **Cluster Management**—Configure the Ethernet2 or Ethernet3 interface as the interface used for cluster-wide management and communication. |
| --- | --- |







 Role
 (`Clustering tab only`)


 When a cluster has member appliances, the appliance roles can be Controller, Controller Backup, or Worker. Select **Controller** or **Backup Controller** to change the WildFire appliance used for each role from the appliances in the cluster. Changing the Controller results in data loss during the role change.




 Browse
 (`Clustering tab only`)


 The **Clustering** tab lists the WildFire appliance nodes in the cluster. **Browse** to view and add standalone WildFire appliances that the Panorama device already manages:



| • | **Search box**—Enter search terms to filter the node list. The search box indicates the number of appliances (items) in the list so you know how long the list is. After you enter search terms, apply the filter ( ) or clear the filter ( ) and enter a different set of terms. |
| --- | --- |






| • | **Add Nodes**—Add ( ) nodes to the cluster. |
| --- | --- |



 The first WildFire appliance you add to a cluster automatically becomes the Controller node. The second WildFire appliance you add automatically becomes the Controller Backup node.
 You can add up to 20 WildFire appliances to a cluster. After adding the Controller and Controller Backup nodes, all subsequent added nodes are Worker nodes.




 Delete
 (`Clustering tab only`)


 Select one or more appliances from the Appliance list and then **Delete** them from the cluster. You can remove a Controller node only if there are two Controller nodes in the cluster.




 Manage Controller
 (`Clustering tab only`)


 Select **Manage Controller** to specify a **Controller** and a **Controller Backup** from the WildFire appliance nodes that belong to the cluster. The current Controller node and backup Controller node are selected by default. The backup Controller node can’t be the same node as the primary Controller node.




 Communication tab




 Customize Secure Server Communication





| • | **SSL/TLS Service Profile**—Select an SSL/TLS service profile from the drop-down. This profile defines the certificate and supported SSL/TLS versions that connected devices use to communicate with WildFire. |
| --- | --- |






| • | **Certificate Profile**—Select a certificate profile from the drop-down. This certificate profile defines certificate revocation checking behavior and the root CA used to authenticate the certificate chain presented by the client. |
| --- | --- |






| • | **Custom Certificate Only**—When enabled, WildFire only accepts custom certificates for authentication with connecting devices. |
| --- | --- |






| • | **Check Authorization List**—Client devices connecting to WildFire are checked against the authorization list. A device need match only one item on the list to be authorized. If no match is found, the device is not authorized. |
| --- | --- |






| • | **Authorization List**—**Add** an Authorization List and complete the following fields to set criteria for authorizing client devices. The Authorization List supports a maximum of 16 entries. |
| --- | --- |






| ◦ | **Identifier**—Select **Subject** or **Subject Alt. Name** as the authorization identifier. |
| --- | --- |






| ◦ | **Type**—If you selected **Subject Alt. Name** as the Identifier, then select **IP**, **hostname**, or **e-mail** as the type of the identifier. If you selected **Subject**, then common-name is the identifier type. |
| --- | --- |






| ◦ | **Value**—Enter the identifier value. |
| --- | --- |







 Secure Client Communication


 Using **Secure Client Communication** ensures that WildFire uses configured custom certificates (instead of the default predefined certificate) to authenticate SSL connections with another WildFire appliance.



| • | **Predefined**—(default) There is no device certificate configured—WildFire uses the default predefined certificate. |
| --- | --- |






| • | **Local**—WildFire uses a local device certificate and the corresponding private key generated on the firewall or imported from an existing enterprise PKI server. |
| --- | --- |






| ◦ | **Certificate**: Select the local device certificate. |
| --- | --- |






| ◦ | **Certificate Profile**: Select the Certificate Profile from the drop-down. |
| --- | --- |






| • | **SCEP**—WildFire uses a device certificate and private key generated by a Simple Certificate Enrollment Protocol (SCEP) server. |
| --- | --- |






| ◦ | **SCEP Profile**: Select a SCEP Profile from the drop-down. |
| --- | --- |






| ◦ | **Certificate Profile**: Select the Certificate Profile from the drop-down. |
| --- | --- |







 Secure Cluster Communication


 Select **Enable** to encrypt communications between WildFire appliances. The default certificate uses the predefined certificate type. To use a user-defined custom certificate, you must configure **Customize Secure Server Communication** and enable **Custom Certificate Only**.



 Parent topic
 [Panorama > Managed WildFire Clusters](panorama-managed-wildfire-clusters.html#ID0EAGT2)