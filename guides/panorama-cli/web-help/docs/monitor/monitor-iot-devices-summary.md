# IoT Devices > Summary

*Monitor : Monitor &gt; IoT Devices : IoT Devices &gt; Summary*

IoT Devices > Summary


| Where Can I Use This? | What Do I Need? |
| --- | --- |
| • | PAN-OS |







| • | (`Firewall`) IoT Security subscription |
| --- | --- |





| • | (`Panorama`) Enable IoT Device Context Cloud Service on **Panorama** > **Setup** |
| --- | --- |






IoT Security uses AI and machine learning to automatically discover and identify network-connected devices and then construct a data-rich, dynamically updating inventory. When a firewall subscribes to [IoT Security](https://docs.paloaltonetworks.com/iot) services, it sends the IoT Security instance that’s in the same tenant service group (TSG) traffic logs for analysis. The firewall also continually retrieves IP address-to-device mappings, which include device profiles and other Device-ID attributes of the devices monitored and protected by IoT Security. The firewall is then able to apply imported rules to devices matching these mappings.


This dashboard contains panels displaying useful high-level information about the top 10 device categories, device profiles, and operating systems that IoT Security has detected on the network.


When you visit this page, PAN-OS generates content from data it's received from IoT Security during its most recent update. It then caches the generated output for the next 30 minutes, so if you navigate away and return within 30 minutes, you'll still see the same information as you did before. However, if you return after 30 minutes, you'll see freshly generated content for that time.

 Parent topic
 [Monitor > IoT Devices](monitor-iot-devices.html#ID0EA5DO)