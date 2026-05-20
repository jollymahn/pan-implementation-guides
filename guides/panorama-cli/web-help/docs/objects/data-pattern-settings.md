# Data Pattern Settings

*Objects : Objects &gt; Custom Objects : Objects &gt; Custom Objects &gt; Data Patterns : Data Pattern Settings*

Data Pattern Settings

Select **Objects** > **Custom Objects** > **Data Patterns** to define the categories of sensitive information that you may want to filter. For information on defining data filtering profiles, select [Objects > Security Profiles > Data Filtering](objects-security-profiles-data-filtering.html#ID0EEIWR).


You can create three types of data patterns for the firewall to use when scanning for sensitive information:




| • | **Predefined**—Use the predefined data patterns to scan files for social security and credit card numbers. |
| --- | --- |






| • | **Regular Expression**—Create custom data patterns using regular expressions. |
| --- | --- |






| • | **File Properties**—Scan files for specific file properties and values. |
| --- | --- |





| Data Pattern Settings | Description |
| --- | --- |
| Name | Enter the data pattern name (up to 31 characters). The name case-sensitive and must be unique. Use only letters, numbers, spaces, hyphens, and underscores. |
| Description | Enter a description for the data pattern (up to 255 characters). |
| Shared | Select this option if you want the data pattern to be available to: • |






| • | Every device group on Panorama. If you clear this selection, the data pattern will be available only to the **Device Group** selected in the **Objects** tab. |
| --- | --- |







 Disable override (`Panorama only`)


 Select this option to prevent administrators from overriding the settings of this data pattern object in device groups that inherit the object. This selection is cleared by default, which means administrators can override the settings for any device group that inherits the object.




 Pattern Type


 Select the type of data pattern you want to create:



| • | [Predefined Pattern](data-pattern-settings.html#ID0EC4DR) |
| --- | --- |






| • | [Regular Expression](data-pattern-settings.html#ID0ETAER) |
| --- | --- |






| • | [File Properties](data-pattern-settings.html#ID0EXEER) |
| --- | --- |







 Predefined Pattern


 Palo Alto Networks provides predefined data patterns to scan for certain types of information in files, for example, for credit card numbers or social security numbers. To configure data filtering based on a predefined pattern, **Add** a pattern and select the following:



| • | **Name**—Select a predefined pattern to use to filter for sensitive data. When you pick a predefined pattern, the **Description** populates automatically. |
| --- | --- |






| • | Select the **File Type** in which you want to detect the predefined pattern. |
| --- | --- |







 Regular Expression


 **Add** a custom data pattern. Give the pattern a descriptive **Name**, set the **File Type** you want to scan for the data pattern, and enter the regular expression that defines the **Data Pattern**.
 For regular expression data pattern syntax details and examples, see:



| • | [Syntax for Regular Expression Data Patterns](syntax-for-regular-expression-data-patterns.html#ID0EKMER) |
| --- | --- |






| • | [Regular Expression Data Pattern Examples](regular-expression-data-pattern-examples.html#ID0EDAGR) |
| --- | --- |







 File Properties


 Build a data pattern to scan for file properties and the associated values. For example, **Add** a data pattern to filter for Microsoft Word documents and PDFs where the document title includes the words “sensitive”, “internal”, or “confidential”.



| • | Give the data pattern a descriptive **Name**. |
| --- | --- |






| • | Select the **File Type** that you want to scan. |
| --- | --- |






| • | Select the **File Property** that you want to scan for a specific value. |
| --- | --- |






| • | Enter the **Property Value** for which you want to scan. |
| --- | --- |






 Parent topic
 [Objects > Custom Objects > Data Patterns](objects-custom-objects-data-patterns.html#ID0EGCDR)