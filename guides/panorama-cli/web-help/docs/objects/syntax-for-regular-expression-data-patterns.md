# Syntax for Regular Expression Data Patterns

*Objects : Objects &gt; Custom Objects : Objects &gt; Custom Objects &gt; Data Patterns : Syntax for Regular Expression Data Patterns*

Syntax for Regular Expression Data Patterns

The general pattern requirements and syntax for creating data patterns depends on the pattern-matching engine that you enable: classic or enhanced (default).



| Pattern Requirements | Classic | Enhanced |
| --- | --- | --- |
| Pattern length | Requires 7 literal characters, which cannot include a period (.), an asterisk (*), a plus sign (+), or a range ([a-z]). | Requires two literal characters. |
| Case-insensitivity | Requires you to define patterns for all possible strings to match all variations of a term. Example: To match any documents designated as confidential, you must create a pattern that includes “confidential,” “Confidential,” and “CONFIDENTIAL.” | Allows you to use the i option on a sub-pattern. Example: ((?i)\bconfidential\b) matches ConfiDential |



The regular expression syntax in PAN-OS® is similar to traditional regular expression engines but every engine is unique. The [Classic Syntax](syntax-for-regular-expression-data-patterns.html#ID0EPTER) and [Enhanced Syntax](syntax-for-regular-expression-data-patterns.html#ID0ENDFR) tables describe the syntax supported in the PAN-OS pattern-matching engines.


**Classic Syntax**



| Pattern Syntax | Description |
| --- | --- |
| . | Match any single character. |
| ? | Match the preceding character or expression 0 or one time. You must include the general expression inside parentheses. Example: (abc)? |
| * | Match the preceding character or expression 0 or more times. You must include the general expression inside parentheses. Example: (abc)* |
| + | Match the preceding character or regular expression one or more times. You must include the general expression inside parentheses. Example: (abc)+ |
| | | Specify one “OR” another. Note:  |



 Example: ((bif)|(scr)|(exe)) matches bif, scr, or exe.




 -


 Specify a range.
 Example: [c-z] matches any character between c and z inclusive.




 [ ]


 Match any specified character.
 Example: [abz] matches any of the specified characters—a, b, or z.




 ^


 Match any character except those specified.
 Example: [^abz] matches any character except the specified characters—a, b, or z.




 { }


 Match a string that contains minimum and maximum.
 Example: {10-20} matches any string that is between 10 and 20 bytes inclusive. You must specify this directly in front of a fixed string and you can use only a hyphen (-).




 \


 Perform a literal match on any character. You must precede the specified character with a backslash (\).




 &amp


 The ampersand (& ) is a special character so, to look for & in a string, you must use &amp.




**Enhanced Syntax**


The enhanced pattern-matching engine supports all of the [Classic Syntax](syntax-for-regular-expression-data-patterns.html#ID0EPTER) as well as the following syntax:



| Pattern Syntax | Description |
| --- | --- |
| **Shorthand character classes** Symbols that stand for a character of a specific type, such as a digit or white space. You can negate any of these shorthand character classes by using uppercase characters. | |
| \s | Match any whitespace character. Example: \s matches a space, tab, line break, or form feed. |
| \d | Match a character that is a digit [0-9]. Example: \d matches 0. |
| \w | Matches an ASCII character [A-Za-z0-9_]. Example: \w\w\w matches PAN. |
| \v | Match a vertical white space character, which includes all unicode line break characters. Example: \v matches a vertical white space character. |
| \h | Match horizontal white space, which includes the tab and all of the “space separator” unicode characters. Example: \h matches a horizontal white space character. |
| **Bounded repeat quantifiers** Specify how many times to repeat the previous item. | |
| {n} | Match exactly a number (n) of times. Example: a{2} matches aa. |
| {n,m} | {n,m} matches from n to m times. Example: a{2,4} matches aa, aaa, and aaaa |
| {n, } | {n,} matches at least n times. Example: a{2,} matches aaaaa in aaaaab. |
| **Anchor characters** Specify where to match an expression. | |
| ^ | Match at the beginning of a string. Also matches after every line break when multi-line mode (m) is enabled. Example: Given the string abc, ^a matches a, but ^b doesn’t match anything because b doesn’t occur at the start of the string. |
| $ | Match at the end of a string or before a newline character at the end of a string. Also matches before every line break when multi-line mode (m) is enabled. Example: Given the string abc, c$ matches c, but a$ doesn’t match anything because a doesn’t occur at the end of the string. |
| \A | Match at the beginning of a string. Doesn’t match after line breaks, even when multi-line mode (m) is enabled. |
| \Z | Match at the end of a string and before the final line break. Doesn’t match before other line breaks even when multi-line mode (m) is enabled. |
| \z | Match at the absolute end of a string. Doesn’t match before line breaks. |
| **Option modifiers** Change the behavior of a sub-pattern. Enter (?<option>) to enable or (?-<option>) to disable. | |
| i | Enable case-insensitivity. Example: ((?i)\bconfidential\b) matches ConfiDential. |
| m | Make ^ and $ match at the beginning and end of lines. |
| s | Make . match anything, including line break characters. |
| x | Ignore whitespace between regex tokens. |


 Parent topic
 [Objects > Custom Objects > Data Patterns](objects-custom-objects-data-patterns.html#ID0EGCDR)