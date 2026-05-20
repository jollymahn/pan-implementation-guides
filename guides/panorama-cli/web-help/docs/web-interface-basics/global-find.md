# Global Find

*Web Interface Basics : Global Find*

## Global Find


Global Find enables you to search the candidate configuration on a firewall or on Panorama for a particular string, such as an IP address, object name, policy name, threat ID, rule UUID, or application name. You can use Global Find to search for IP addresses within external dynamic lists. The search results are grouped by category and provide links to the configuration location in the web interface so that you can easily find all of the places where the string exists or is referenced.


To launch global find, click the **Search** icon on the upper right side of the web interface. Global Find is available from all web interface pages and locations. The following is a list of Global Find features to help you perform successful searches:




| • | If you initiate a search on a firewall that has multiple virtual systems enabled or if administrative roles are defined, Global Find will return results only for areas of the firewall for which you have permission to access. The same applies to Panorama device groups; you will see search results only for device groups to which you have administrative access. |
| --- | --- |






| • | Spaces in search text are handled as AND operations. For example, if you search on corp policy, both **corp** and **policy** must exist in the configuration item for it to be included in the search results. |
| --- | --- |






| • | To find an exact phrase, surround the phrase in quotes. |
| --- | --- |






| • | To re-run a previous search, click Global Find and a list of the last 20 searches are displayed. Click any item in the list to re-run that search. The search history list is unique to each administrative account. |
| --- | --- |




Global Find is available for each field that is searchable. For example, in the case of a Security policy, you can search on the following fields: Name, Tags, Zone, Address, User, HIP Profile, Application, UUID, and Service. To perform a search, click the drop-down next to any of these fields and click **Global Find**. For example, if you click **Global Find** on a zone named l3-vlan-trust, Global Find will search the entire configuration for that zone name and return results for each location where the zone is referenced. The search results are grouped by category and you can hover over any item to view details or you can click an item to navigate to the configuration page for that item.


Global Find does not search dynamic content that the firewall allocates to users (such as logs, address ranges, or individual DHCP addresses). In the case of DHCP, you can search on a DHCP server attribute, such as the DNS entry, but you cannot search for individual addresses issued to users. Another example is usernames that the firewall collects when you enable the User-ID™ feature. In this case, a username or user group that exists in the User-ID database is only searchable if the name or group exists in the configuration, such as when a user group name is defined in a policy. In general, you can only search for content that the firewall writes to the configuration.


**Looking for more?**


Learn more about [using Global Find](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/use-the-web-interface/use-global-find-to-search-the-firewall-or-panorama-management-server.html) to search the firewall or Panorama configuration.

 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)