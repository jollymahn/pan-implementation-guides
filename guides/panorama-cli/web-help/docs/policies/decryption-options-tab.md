# Decryption Options Tab

*Policies : Policies &gt; Decryption : Decryption Options Tab*

Decryption Options Tab

Select the **Options** tab to determine if the matched traffic should be decrypted or not. If **Decrypt** is set, specify the decryption type. You can also add additional decryption features by configuring or selecting a Decryption profile.



| Field | Description |
| --- | --- |
| Action | Select **decrypt** or **no-decrypt** for the traffic. |
| Type | Select the type of traffic to decrypt from the drop-down: • |






| • | **SSH Proxy**—Specifies that the policy decrypts SSH traffic. This option allows you to control SSH tunneling in policies by specifying the ssh-tunnel App-ID. |
| --- | --- |






| • | **SSL Inbound Inspection**—Specifies that the policy decrypts inbound SSL traffic. |
| --- | --- |






| ◦ | Certificates—Add the certificates for the internal server to which inbound SSL traffic is destined. |
| --- | --- |



 Fastpath:
 After renewing or replacing an existing server certificate, import the certificate bundle as a single file onto your firewall and add it to your SSL Inbound Inspection decryption policy rule. Updating the policy rule in advance ensures that decryption continues without interruption when you eventually install the new certificate on your web server. [Configure SSL Inbound Inspection](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/decryption/configure-ssl-inbound-inspection.html) explains this best practice in more depth.
 You can also add certificates for domains hosted by your web server. A maximum of 12 certificates is supported per policy rule.




 Decryption Profile


 Attach a Decryption profile to the policy rule in order to block and control certain aspects of the traffic. For details on creating a Decryption profile, select [Objects > Decryption Profile](objects-decryption-profile.html#ID0EALCS).




 Log Settings




 Log Successful SSL Handshake


 (`Optional`) Creates detailed logs of successful SSL Decryption handshakes. Disabled by default.
 Note:



| | Logs consume storage space. Before you log successful SSL handshakes, ensure you have the resources available to store the logs. Edit **Device** > **Setup** > **Management** > **Logging and Reporting Settings** to check the current log memory allocation to and re-allocate log memory among log types. |
| --- | --- |







 Log Unsuccessful SSL Handshake


 Creates detailed logs of unsuccessful SSL Decryption handshakes so you can find the cause of decryption issues. Enabled by default.
 Note:



| | Logs consume storage space. To allocate more (or less) log storage space to Decryption logs, edit the log memory allocation (**Device** > **Setup** > **Management** > **Logging and Reporting Settings**). |
| --- | --- |







 Log Forwarding


 Specify the method and location to forward GlobalProtect SSL handshake (decryption) logs.



 Parent topic
 [Policies > Decryption](policies-decryption.html#ID0ERC6O)