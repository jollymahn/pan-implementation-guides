# IoT Devices > Asset Inventory

*Monitor : Monitor &gt; IoT Devices : IoT Devices &gt; Asset Inventory*

IoT Devices > Asset Inventory


| Where Can I Use This? | What Do I Need? |
| --- | --- |
| • | PAN-OS |







| • | (`Firewall`) IoT Security subscription |
| --- | --- |





| • | (`Panorama`) Enable IoT Device Context Cloud Service on **Panorama** > **Setup** |
| --- | --- |






This is a table containing all the devices and associated device attributes that [IoT Security](https://docs.paloaltonetworks.com/iot) dynamically discovered and provided to PAN-OS and any you manually added or imported into your inventory. Here you can view devices, import static IP devices in bulk, add individual static IP devices, edit them, confirm their identities, and add Device-ID objects.


**Import IoT Assets**: If you have a list of the static IP addresses for your devices, you can import them using a comma-separated values (CSV) file. To import static IP devices into your inventory, **Import**, download a sample CSV template to use as a model, and add attributes of the devices you want to import: IP address, MAC address, vendor, model, hostname, category, profile, OS group, and OS version. The IP address is required and all the other attributes are optional. When the CSV file is complete, **Import** again, select the file to import, and then click **OK**.


**Add**: IoT Security can be deployed in networks where DHCP dynamically assigns IP addresses to devices, where network administrators manually configure devices with static IP addresses, and where there’s a combination of both. You can not only import devices with static IP addresses in bulk but you can also add them individually.


To add a static IP device individually, you must know its IP address and, optionally, some additional attributes. Click **Add**, enter the IP address and any other attribute values in Add Static IP Device, and then click **OK**. After you add it, the firewall communicates with IoT Security and Panorama, if it's used for firewall management, to sync the addition with them.

 Note:



| | Adding a static IP device configuration by itself is not enough to add a device to the inventory. IoT Security must also detect network traffic to or from a device with a configured static IP address. Then it's added to the inventory. |
| --- | --- |



**Edit**: If you notice device attributes are missing or misapplied and you know what they are, you can select one or more devices and edit them. Make your selection or selections, **Edit**, enter a different hostname, select a different value for OS group, profile, model, vendor, or OS version, and then click **OK**. Only the values that you choose to change are updated; all other values stay as they are. After you edit it, the firewall communicates with [IoT Security](https://docs.paloaltonetworks.com/iot) and Panorama, if it's used for firewall management, to sync the change with them.


**Confirm Device Identity**: When you confirm the identity of a device, its confidence score immediately becomes 100% and it’s synced back to Panorama and IoT Security.


**Create Device-ID**: When you import policy rule recommendations, the firewall automatically generates the necessary device objects for the Device-ID rules. In this case, you don't have to create the device objects manually. However, if you want to create your own security policy rule rather than import a recommended rule, then you use this option to create a device object.


**Export**: To download the asset inventory, **Export** and save it in CSV format. This downloads all the assets in the inventory. For each entry, you can see its device name, device profile, device category, vendor, model, OS group, OS version, IP address, confidence score, MAC address, and a timestamp showing its last detected network activity.

 Parent topic
 [Monitor > IoT Devices](monitor-iot-devices.html#ID0EA5DO)