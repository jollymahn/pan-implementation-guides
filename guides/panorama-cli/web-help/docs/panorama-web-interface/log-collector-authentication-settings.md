# Log Collector Authentication Settings

*Panorama Web Interface : Panorama &gt; Managed Collectors : Log Collector Configuration : Log Collector Authentication Settings*

Log Collector Authentication Settings



| • | Panorama > Managed Collectors > Authentication |
| --- | --- |




An M-Series appliance or Panorama virtual appliance in Log Collector mode (Dedicated Log Collector) does not have a web interface; only a CLI. You can use the Panorama management server to configure most settings on a Dedicated Log Collector but some settings require CLI access. To configure authentication settings for CLI access, configure the settings as described in the following table.



| Log Collector Authentication Settings | Description |
| --- | --- |
| Authentication Profile | Select a configured authentication profile to define the authentication service that validates the login credentials of the Dedicated Log Collector or Panorama administrators. |
| Failed Attempts | Enter the number of failed login attempts that the Dedicated Log Collector allows on the CLI before locking out the administrator (range is 0 to 10; default is 10). Limiting login attempts helps protect the WildFire appliance from brute force attacks. A value of 0 specifies unlimited login attempts. CAUTION:  If you set the **Failed Attempts** to a value other than 0 but leave the **Lockout Time** at 0, then the administrator is indefinitely locked out until another administrator manually unlocks the locked-out administrator. If no other administrator has been created, you must reconfigure the **Failed Attempts** and **Lockout Time** settings on Panorama and push the configuration change to the Log Collector. To ensure that an administrator is never locked out, use the default (0) value for both **Failed Attempts** and **Lockout Time**. Fastpath:  Set the number of **Failed Attempts** to 5 or fewer to accommodate a reasonable number of retries in case of typing errors, while preventing malicious systems from trying brute force methods to log in to the Dedicated Log Collector. |
| Lockout Time (min) | Enter the number of minutes for which the Dedicated Log Collector locks out an administrator from access to the CLI after reaching the **Failed Attempts** limit (range is 0 to 60; default is 5). A value of 0 means the lockout applies until another administrator manually unlocks the account. CAUTION:  If you set the **Failed Attempts** to a value other than 0 but leave the **Lockout Time** at 0, then the administrator is indefinitely locked out until another administrator manually unlocks the locked-out administrator. If no other administrator has been created, you must reconfigure the **Failed Attempts** and **Lockout Time** settings on Panorama and push the configuration change to the Log Collector. To ensure that an administrator is never locked out, use the default (0) value for both **Failed Attempts** and **Lockout Time**. Fastpath:  Set the **Lockout Time** to at least 30 minutes to prevent continuous login attempts from a malicious actor. |
| Idle Timeout (min) | Enter the maximum number of minutes without any activity on the CLI before an administrator is automatically logged out (range is 0 to 1,440; default is None). A value of 0 means that inactivity does not trigger an automatic logout. Fastpath:  Set the **Idle Timeout** to 10 minutes to prevent unauthorized users from accessing the Dedicated Log Collector if an administrator leaves a session open. |
| Max Session Count | Enter the number of active sessions the administrator can have open concurrently, The default is 0, which means that the Dedicated Log Collector can have an unlimited number of concurrently active sessions. |
| Max Session time | Enter the number of minutes the administrator can be logged in before being automatically logged out. The default is 0, which means that the administrator can be logged in indefinitely even if idle. |
| Local Administrators | Add and configure new administrators for the Dedicated Log Collector. These administrators are unique to the Dedicated Log Collector are managed from this page (**Panorama** > **Managed Collectors** > **Authentication**). |
| Panorama Administrators | Import existing administrators configured on Panorama. These administrators are created on Panorama and imported to the Dedicated Log Collector. |


 Parent topic
 [Log Collector Configuration](log-collector-configuration.html#ID0E4JP3)