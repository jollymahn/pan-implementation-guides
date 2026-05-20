# Last Login Time and Failed Login Attempts

*Web Interface Basics : Last Login Time and Failed Login Attempts*

## Last Login Time and Failed Login Attempts


To detect misuse and prevent exploitation of a privileged account, such as an administrative account on a Palo Alto Networks firewall or Panorama, the web interface and the command line interface (CLI) displays your last login time and any failed login attempts for your username when you log in. This information allows you to easily identify whether someone is using your administrative credentials to launch an attack.


After you log in to the web interface, the [last login time](https://docs.paloaltonetworks.com/pan-os/11-1/pan-os-admin/firewall-administration/use-the-web-interface/use-the-administrator-login-activity-indicators-to-detect-account-misuse) information appears at the bottom left of the window. If one or more failed logins occurred since the last successful login, a caution icon appears to the right of the last login information. Hover over the caution symbol to view the number of failed login attempts or click to view the **Failed Login Attempts Summary** window, which lists the administrative account name, the source IP address, and the reason for the login failure.


If you see multiple failed login attempts that you do not recognize as your own, you should work with your network administrator to locate the system that is performing the brute-force attack and then investigate the user and host computer to identify and eradicate any malicious activity. If you see that the last login date and time indicates an account compromise, you should immediately change your password and then perform a configuration audit to determine if suspicious configuration changes were committed. Revert the configuration to a known good configuration if you see that logs were cleared or if you have difficulty determining if improper changes were made using your account.

 Parent topic
 [Web Interface Basics](web-interface-basics.html#ID0EKSBI)