# Templates

*Panorama Web Interface : Panorama &gt; Templates : Templates*

Templates

Panorama supports up to 1,024 templates. You can **Add** a template and configure the settings as described in the following table. After creating a template, you need to also [Configure a Template Stack](https://docs.paloaltonetworks.com/panorama/11-1/panorama-admin/manage-firewalls/manage-templates-and-template-stacks/configure-a-template-stack) and add the templates and firewalls to the template stack before you can manage your firewalls. After you configure a template, you must commit your changes in Panorama (see [Panorama Commit Operations](panorama-commit-operations.html#ID0EOOJ2)).

 CAUTION:
 Deleting a template does not delete the values that Panorama pushed to the firewall.


| Template Settings | Description |
| --- | --- |
| Name | Enter a template name (up to 63 characters). The name is case-sensitive, must be unique, and can contain only letters, numbers, spaces, hyphens, periods, and underscores. In the **Device** and **Network** tabs, this name appears in the **Template** drop-down. The settings you modify in these tabs apply only to the selected **Template**. |
| Description | Enter a description for the template. |


 Parent topic
 [Panorama > Templates](panorama-templates.html#ID0E1SK3)